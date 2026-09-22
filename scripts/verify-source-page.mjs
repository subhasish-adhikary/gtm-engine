#!/usr/bin/env node
/**
 * `source_page` attribution verification.
 *
 * Proves that the value sent to /api/subscribe and stored in Kit is the exact
 * pathname of the page the visitor submitted from — evaluated at submit time,
 * never the HTTP Referer and never a stored first-touch page.
 *
 * Usage:
 *   KIT_API_KEY=*** node scripts/verify-source-page.mjs --local-dist
 *   KIT_API_KEY=*** node scripts/verify-source-page.mjs --url=https://subhasishadhikary.com \
 *     --email-base=logicalnerds+autoclaw-sp
 *
 * Optional: --out=<file> writes the raw payloads and Kit read-backs as JSON.
 */
import path from 'node:path';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright-core';
import { startDistServer } from './lib/dist-server.mjs';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const args = process.argv.slice(2);
const localDist = args.includes('--local-dist');
const urlArg = args.find((a) => a.startsWith('--url='));
const base = (localDist ? 'http://localhost:4311' : urlArg ? urlArg.slice('--url='.length) : 'http://localhost:3000').replace(/\/$/, '');
const emailBase = (args.find((a) => a.startsWith('--email-base=')) || '--email-base=logicalnerds+autoclaw-sp').split('=')[1];
const outArg = args.find((a) => a.startsWith('--out='));
const outPath = outArg ? outArg.slice('--out='.length) : null;
const casesArg = args.find((a) => a.startsWith('--cases='));
const onlyCases = casesArg ? new Set(casesArg.slice('--cases='.length).split(',').map((x) => x.trim())) : null;
const FORM_ID = process.env.KIT_FORM_ID || '9947751';

const MAILBOX = emailBase.split('+')[0];
const PREFIX = emailBase.includes('+') ? emailBase.split('+')[1] : 'autoclaw-sp';
const emailFor = (slug) => `${MAILBOX}+${PREFIX}-${slug}@aol.com`;

let failures = 0;
const rows = [];

function check(name, passed, detail = '') {
  if (!passed) failures += 1;
  console.log(`  [${passed ? 'PASS' : 'FAIL'}] ${name}${detail ? ` — ${detail}` : ''}`);
}

/** Evidence is persisted as the run progresses, so a stall cannot lose captured payloads. */
function persistEvidence() {
  if (!outPath) return;
  fs.writeFileSync(outPath, JSON.stringify({
    generatedAt: new Date().toISOString(),
    base,
    formId: FORM_ID,
    rows,
    payloads,
    responses,
  }, null, 2));
}

function record(entry) {
  persistEvidence();
  rows.push(entry);
  const verdict = entry.ok ? 'ok' : 'MISMATCH';
  console.log(
    `  ${entry.case.padEnd(34)} from ${entry.page.padEnd(42)} payload.source_page=${String(entry.payloadSourcePage).padEnd(42)} kit.source_page=${String(entry.kitSourcePage).padEnd(42)} kit.lead_magnet=${entry.kitLeadMagnet} ${verdict}`,
  );
}

/**
 * Submit and wait for the endpoint to answer.
 *
 * Settlement is decided by the captured API response, not by re-reading the form:
 * on success the form node is replaced by the confirmation panel, so a locator
 * bound to the form would detach and time out.
 */
async function submit(page, { selector, email, firstName, container }) {
  const block = page.locator(selector);
  await block.waitFor({ state: 'visible', timeout: 25000 });
  await block.locator('input[type="email"]').fill(email);
  if (firstName) {
    const nameInput = block.locator('input[name="firstName"]');
    if (await nameInput.count()) await nameInput.fill(firstName);
  }
  const answeredBefore = responses.length;
  await block.locator('button[type="submit"]').click();
  let settled = false;
  for (let i = 0; i < 50 && !settled; i += 1) {
    settled = responses.length > answeredBefore;
    if (!settled) await page.waitForTimeout(500);
  }
  // Best-effort UI confirmation from a container that survives the swap.
  const uiText = await page.locator(container ?? selector).innerText().catch(() => '');
  return { settled, uiTerminal: /Subscribed|already subscribed/i.test(uiText) };
}

const SECTION = (source) => `section[aria-labelledby="${source}-newsletter-heading"]`;
const FOOTER = 'footer form';

let localServer = null;
if (localDist) {
  localServer = await startDistServer({ repoRoot, port: 4311 });
  console.log('local dist server on 4311 (same handler, same routing rules as production)');
}

console.log(`source_page attribution verification — ${base}\n`);

const RATE_LIMIT_WAIT_MS = 10 * 60 * 1000 + 5000;
let windowWaits = 0;

const browser = await chromium.launch({ channel: 'chrome', headless: true });
const payloads = [];
const responses = [];

/**
 * Submit, and if the endpoint answers 429 wait out its rate-limit window once
 * (bounded) and retry, so a limiter can never be mistaken for an attribution bug.
 */
async function submitWithRetry(page, options) {
  const before = responses.length;
  let result = await submit(page, options);
  let last = responses.slice(before).pop();
  while (last?.status === 429 && windowWaits < 2) {
    windowWaits += 1;
    console.log(`  … endpoint rate limited (8 per 10 min per IP) — waiting ${Math.round(RATE_LIMIT_WAIT_MS / 60000)} min before retrying (wait ${windowWaits}/2)`);
    await page.waitForTimeout(RATE_LIMIT_WAIT_MS);
    const retryBefore = responses.length;
    result = await submit(page, options);
    last = responses.slice(retryBefore).pop();
  }
  if (last?.status === 429) console.log('  … still rate limited after waiting; this case is inconclusive');
  return result;
}

async function newSession(viewport, xff = null) {
  const context = await browser.newContext({
    viewport,
    // Locally every request would come from one simulated IP and hit the
    // endpoint's 8-per-10-minutes limiter, which would mask attribution bugs.
    // Varying the simulated client IP keeps the local dry run meaningful; the
    // production run exercises the real limiter instead.
    extraHTTPHeaders: xff ? { 'x-forwarded-for': xff } : {},
  });
  await context.addInitScript(() => {
    const w = window;
    w.__vaEvents = [];
    w.vaq = w.vaq || [];
    w.va = function (...a) {
      w.__vaEvents.push(a);
      w.vaq.push(a);
    };
  });
  const page = await context.newPage();
  page.on('request', (req) => {
    if (!req.url().includes('/api/subscribe') || req.method() !== 'POST') return;
    try {
      payloads.push(JSON.parse(req.postData() || '{}'));
    } catch {
      payloads.push({ unparsable: true });
    }
  });
  page.on('response', async (res) => {
    if (!res.url().includes('/api/subscribe')) return;
    const text = await res.text().catch(() => '');
    let body = null;
    try {
      body = JSON.parse(text);
    } catch {
      body = null;
    }
    responses.push({ status: res.status(), body });
  });
  return { context, page };
}

async function runCase(page, { name, slug, route, selector, expectedPath, expectDuplicate = false, navigateFrom = null, email: explicitEmail = null }) {
  const email = explicitEmail ?? emailFor(slug);
  if (navigateFrom) {
    await page.goto(`${base}${navigateFrom}`, { waitUntil: 'networkidle' });
    // In-app navigation: the exit page must not leak into source_page.
    await page.click(`a[href="${route}"]`).catch(async () => {
      await page.goto(`${base}${route}`, { waitUntil: 'networkidle' });
    });
    await page.waitForLoadState('networkidle');
  } else {
    await page.goto(`${base}${route}`, { waitUntil: 'networkidle' });
  }
  const submittedFrom = new URL(page.url()).pathname;
  const beforePayloads = payloads.length;
  const beforeResponses = responses.length;
  const { settled, uiTerminal } = await submitWithRetry(page, {
    selector,
    email,
    firstName: 'SP Verify',
    container: selector === FOOTER ? 'footer' : selector,
  });
  const sent = payloads.slice(beforePayloads).filter((p) => p.email === email);
  const payload = sent[sent.length - 1] ?? {};
  const response = responses.slice(beforeResponses).pop() ?? { status: null, body: null };
  return {
    name, slug, email, route, submittedFrom,
    expectedPath: expectedPath ?? submittedFrom,
    settled, uiTerminal, payload, response,
    payloadSourcePage: payload.sourcePage,
    expectDuplicate,
  };
}

/**
 * Kit read-back. The form membership list is immediately consistent, and the
 * single-subscriber endpoint is the only one that returns custom fields.
 */
async function kitLookup(emails) {
  const headers = { 'X-Kit-Api-Key': process.env.KIT_API_KEY, Accept: 'application/json' };
  const form = await fetch(`https://api.kit.com/v4/forms/${FORM_ID}/subscribers`, { headers, signal: AbortSignal.timeout(20000) });
  const formBody = await form.json().catch(() => null);
  const members = Array.isArray(formBody?.subscribers) ? formBody.subscribers : [];
  const byEmail = new Map(members.map((s) => [String(s.email_address).toLowerCase(), s]));
  const out = new Map();
  for (const email of emails) {
    const member = byEmail.get(email.toLowerCase());
    if (!member) {
      out.set(email, { found: false });
      continue;
    }
    const detail = await fetch(`https://api.kit.com/v4/subscribers/${member.id}`, { headers, signal: AbortSignal.timeout(20000) });
    const detailBody = await detail.json().catch(() => null);
    out.set(email, {
      found: true,
      id: member.id,
      addedAt: member.added_at,
      source_page: detailBody?.subscriber?.fields?.source_page ?? null,
      lead_magnet: detailBody?.subscriber?.fields?.lead_magnet ?? null,
      utm_source: detailBody?.subscriber?.fields?.utm_source ?? null,
    });
  }
  return out;
}

const cases = [];
try {
  const wants = (id) => !onlyCases || onlyCases.has(id);
  const desktop = await newSession({ width: 1440, height: 950 }, localDist ? '203.0.113.11' : null);

  // ---- the six required surfaces -------------------------------------------------
  if (wants('1')) cases.push(await runCase(desktop.page, {
    name: '1 homepage (section form)', slug: 'home', route: '/', selector: SECTION('homepage'), expectedPath: '/',
  }));
  if (wants('2')) cases.push(await runCase(desktop.page, {
    name: '2 glossary /glossary/gtm-engineering', slug: 'glossary-gtm-eng',
    route: '/glossary/gtm-engineering', selector: SECTION('glossary-term'), expectedPath: '/glossary/gtm-engineering',
  }));
  if (wants('3')) cases.push(await runCase(desktop.page, {
    name: '3 glossary /glossary/marketing-automation', slug: 'glossary-mkt-auto',
    route: '/glossary/marketing-automation', selector: SECTION('glossary-term'), expectedPath: '/glossary/marketing-automation',
  }));
  if (wants('4')) cases.push(await runCase(desktop.page, {
    name: '4 article /thinking/territory-…', slug: 'article',
    route: '/thinking/territory-based-gtm-small-teams', selector: SECTION('article'),
    expectedPath: '/thinking/territory-based-gtm-small-teams',
  }));
  if (wants('5')) cases.push(await runCase(desktop.page, {
    name: '5 tools hub /tools', slug: 'tools', route: '/tools', selector: SECTION('tools-hub'), expectedPath: '/tools',
  }));
  if (wants('6')) cases.push(await runCase(desktop.page, {
    name: '6 footer form (submitted from /about)', slug: 'footer', route: '/about', selector: FOOTER, expectedPath: '/about',
  }));

  // ---- internal navigation before submit ----------------------------------------
  if (wants('7')) cases.push(await runCase(desktop.page, {
    name: '7 internal nav: land on /, submit on /tools', slug: 'internal-nav',
    route: '/tools', selector: SECTION('tools-hub'), navigateFrom: '/', expectedPath: '/tools',
  }));

  // ---- duplicate subscriber ------------------------------------------------------
  if (wants('8')) cases.push(await runCase(desktop.page, {
    name: '8 duplicate: resubmit case 2 address', slug: 'glossary-gtm-eng',
    route: '/glossary/gtm-engineering', selector: SECTION('glossary-term'),
    expectedPath: '/glossary/gtm-engineering', expectDuplicate: true,
    email: emailFor('glossary-gtm-eng'),
  }));

  // ---- mobile viewport -----------------------------------------------------------
  const mobile = await newSession({ width: 390, height: 844 }, localDist ? '203.0.113.21' : null);
  if (wants('9')) cases.push(await runCase(mobile.page, {
    name: '9 mobile /glossary/marketing-automation', slug: 'mobile-glossary',
    route: '/glossary/marketing-automation', selector: SECTION('glossary-term'),
    expectedPath: '/glossary/marketing-automation',
  }));

  await desktop.context.close();
  await mobile.context.close();

  // ---- multiple forms on one page (section form + footer form) -------------------
  const multi = await newSession({ width: 1440, height: 950 }, localDist ? '203.0.113.31' : null);
  const multiRoute = '/thinking/territory-based-gtm-small-teams';
  let multiSection = null;
  let multiFooter = null;
  if (wants('10a')) {
    multiSection = await runCase(multi.page, {
      name: '10a article section form', slug: 'multi-section',
      route: multiRoute, selector: SECTION('article'), expectedPath: multiRoute,
    });
  }
  if (wants('10b')) {
    multiFooter = await runCase(multi.page, {
      name: '10b same page, footer form', slug: 'multi-footer',
      route: multiRoute, selector: FOOTER, expectedPath: multiRoute,
    });
  }
  await multi.context.close();

  if (multiSection) cases.push(multiSection);
  if (multiFooter) cases.push(multiFooter);
} catch (error) {
  check('matrix completed without crashing', false, String(error?.message || error));
} finally {
  await browser.close();
  if (localServer) await new Promise((resolve) => localServer.close(resolve));
}

// ------------------------------------------------------------------ read back
persistEvidence();
const kit = await kitLookup(cases.map((c) => c.email));
persistEvidence();

console.log('\npayload → Kit comparison');
for (const c of cases) {
  const stored = kit.get(c.email) ?? { found: false };
  const ok = c.settled
    && c.payloadSourcePage === c.expectedPath
    && stored.source_page === c.expectedPath;
  record({
    case: c.name,
    page: c.submittedFrom,
    expected: c.expectedPath,
    payloadSourcePage: c.payloadSourcePage ?? '(missing)',
    kitSourcePage: stored.found ? stored.source_page ?? '(null)' : '(not in Kit)',
    kitLeadMagnet: stored.lead_magnet ?? '—',
    ok,
    email: c.email,
  });
}

console.log('\nassertions');
for (const c of cases) {
  const stored = kit.get(c.email) ?? {};
  check(`${c.name}: submission settled`, c.settled, `email=${c.email}`);
  check(`${c.name}: UI shows the terminal state`, c.uiTerminal, '');
  check(`${c.name}: payload source_page = ${c.expectedPath}`, c.payloadSourcePage === c.expectedPath, `got=${c.payloadSourcePage}`);
  check(`${c.name}: Kit source_page = ${c.expectedPath}`, stored.source_page === c.expectedPath, `got=${stored.source_page}`);
  check(`${c.name}: lead_magnet present`, Boolean(stored.lead_magnet), `got=${stored.lead_magnet}`);
}

const nav = cases.find((c) => c.name.startsWith('7'));
if (nav) {
  check('internal navigation: source_page is the submit page, not the entry page', nav.payloadSourcePage === '/tools' && nav.payloadSourcePage !== '/', `got=${nav.payloadSourcePage}`);
}

const dup = cases.find((c) => c.name.startsWith('8'));
if (dup) {
  check('duplicate resubmission keeps a correct source_page', dup.payloadSourcePage === dup.expectedPath && (kit.get(dup.email)?.source_page === dup.expectedPath), `payload=${dup.payloadSourcePage} kit=${kit.get(dup.email)?.source_page}`);
}

const section = cases.find((c) => c.name.startsWith('10a'));
const footer = cases.find((c) => c.name.startsWith('10b'));
if (section && footer) {
  check('two forms on one page report the same source_page', section.payloadSourcePage === footer.payloadSourcePage, `${section.payloadSourcePage} vs ${footer.payloadSourcePage}`);
  const sectionMagnet = kit.get(section.email)?.lead_magnet;
  const footerMagnet = kit.get(footer.email)?.lead_magnet;
  check('two forms on one page report different lead_magnet values', Boolean(sectionMagnet) && Boolean(footerMagnet) && sectionMagnet !== footerMagnet, `${sectionMagnet} vs ${footerMagnet}`);
}

const mobileCase = cases.find((c) => c.name.startsWith('9'));
const desktopCase = cases.find((c) => c.name.startsWith('3'));
if (mobileCase && desktopCase) {
  check('mobile and desktop report the same source_page for the same route', mobileCase.payloadSourcePage === desktopCase.payloadSourcePage, `${mobileCase.payloadSourcePage} vs ${desktopCase.payloadSourcePage}`);
}

// Attach: this checks the source code, not just behaviour.
// Strip comments first: the code documents that referrer/first-touch are NOT
// used, and those words legitimately appear in prose.
const stripComments = (src) => src.replace(/\/\*[\s\S]*?\*\//g, '').replace(/(^|[^:])\/\/.*$/gm, '$1');
const componentCode = stripComments(fs.readFileSync(path.join(repoRoot, 'src/components/NewsletterSignup.tsx'), 'utf8'));
const handlerCode = stripComments(fs.readFileSync(path.join(repoRoot, 'api/subscribe.ts'), 'utf8'));
check('no document.referrer in the attribution code', !/document\.referrer/.test(componentCode) && !/referrer/i.test(handlerCode), 'code only, comments excluded');
check('no first-touch/first-visit value feeds source_page', !/first.?touch|first.?visit/i.test(componentCode + handlerCode), 'code only, comments excluded');
check('source_page is bound to window.location.pathname', /window\.location\.pathname/.test(componentCode), '');

if (outPath) {
  persistEvidence();
  console.log(`\nraw evidence written to ${outPath}`);
}

console.log(`\nsource_page verification — ${failures === 0 ? 'PASS' : 'FAIL'} (${failures} failure(s), ${cases.length} submissions)`);
process.exit(failures === 0 ? 0 : 1);
