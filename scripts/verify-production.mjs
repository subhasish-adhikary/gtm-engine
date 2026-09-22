#!/usr/bin/env node
/**
 * Post-deployment verification for the Kit newsletter integration.
 *
 * Run this against the deployed site after setting KIT_API_KEY (and optionally
 * KIT_FORM_ID) in the Vercel project. Until the environment variables exist,
 * every subscribe attempt returns `500 not_configured`.
 *
 * Usage:
 *   node scripts/verify-production.mjs --url https://subhasishadhikary.com
 *   KIT_API_KEY=*** node scripts/verify-production.mjs \
 *     --url https://subhasishadhikary.com --live --email=you@example.com
 *
 * Default (read-only) checks:
 *   1. POST /api/subscribe exists and validates input            (400 invalid_email)
 *   2. non-POST is rejected with 405 + Allow: POST
 *   3. the deployed HTML / JS contains no Kit secret and no Kit API host
 *   4. the newsletter block renders on the homepage, hub, glossary term and an
 *      article page — and never twice on one page
 *   5. client-side validation fires without a network request
 *
 * `--live` additionally performs one real subscribe and verifies Kit state
 * (subscriber exists, custom fields persisted, form 9947751 membership), then
 * repeats it to prove duplicate handling. It creates real subscribers.
 */
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright-core';
import { startDistServer } from './lib/dist-server.mjs';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

const args = process.argv.slice(2);
const urlArg = args.find((a) => a.startsWith('--url='));
const localDist = args.includes('--local-dist');
const url = (localDist ? 'http://localhost:4310' : urlArg ? urlArg.slice('--url='.length) : 'https://subhasishadhikary.com').replace(/\/$/, '');
const live = args.includes('--live');
const emailArg = args.find((a) => a.startsWith('--email='));
const email = emailArg ? emailArg.slice('--email='.length) : null;
const FORM_ID = process.env.KIT_FORM_ID || '9947751';

let failures = 0;
let assertions = 0;

function check(name, passed, detail = '') {
  assertions += 1;
  if (!passed) failures += 1;
  console.log(`  [${passed ? 'PASS' : 'FAIL'}] ${name}${detail ? ` — ${detail}` : ''}`);
}

async function postSubscribe(body) {
  const response = await fetch(`${url}/api/subscribe`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  let json = null;
  try {
    json = await response.json();
  } catch {
    json = null;
  }
  return { status: response.status, json, allow: response.headers.get('allow') };
}

let localServer = null;
if (localDist) {
  localServer = await startDistServer({ repoRoot, port: 4310 });
  console.log('local dist server started on http://localhost:4310 (dry run of the same checks)');
}

console.log(`production verification — ${url}\n`);

// ---------- endpoint shape (read-only, no subscriber created) ----------
const getResult = await fetch(`${url}/api/subscribe`, { method: 'GET' });
check('POST /api/subscribe is deployed (GET rejected)', getResult.status === 405, `status=${getResult.status}`);
check('405 advertises Allow: POST', (getResult.headers.get('allow') || '').includes('POST'), `allow=${getResult.headers.get('allow')}`);

const invalid = await postSubscribe({ email: 'not-an-email' });
check('invalid email is rejected with 400 invalid_email', invalid.status === 400 && invalid.json?.error === 'invalid_email', `status=${invalid.status} error=${invalid.json?.error}`);
check('error response leaks no credentials', !JSON.stringify(invalid.json ?? {}).includes('kit_'), 'no key material');

// The only way to tell "env var missing" from "working" is a POST with a valid
// email, which either returns 500 not_configured or creates a subscriber — so it
// only runs in --live mode, against an address the operator chose.
if (live && email) {
  const configProbe = await postSubscribe({ email, source: 'production-verification', leadMagnet: 'gtm-systems-brief' });
  if (configProbe.json?.error === 'not_configured') {
    check('KIT_API_KEY is configured in this environment', false, 'received 500 not_configured — set the env var and redeploy');
  } else {
    check(
      'KIT_API_KEY is configured in this environment',
      configProbe.status === 200 && configProbe.json?.ok === true,
      `status=${configProbe.status} ${JSON.stringify(configProbe.json)}`,
    );
  }
} else {
  console.log('     note: KIT_API_KEY configuration is only verified in --live mode with --email=<address>');
}

// ---------- client bundle must not carry the secret ----------
const homepage = await fetch(url);
const html = await homepage.text();
const bundlePaths = [...html.matchAll(/src="([^"]+\.js)"/g)].map((m) => m[1]);
let bundleText = '';
for (const path of bundlePaths.slice(0, 6)) {
  const asset = await fetch(path.startsWith('http') ? path : `${url}${path}`);
  bundleText += await asset.text();
}
check('no Kit API key material in deployed HTML', !/kit_[0-9a-f]{16,}/i.test(html), `html bytes=${html.length}`);
check('no Kit API key material in deployed JS', !/kit_[0-9a-f]{16,}/i.test(bundleText), `js bytes=${bundleText.length}`);
check('no Kit API host referenced client-side', !bundleText.includes('api.kit.com'), '');
check('no KIT_API_KEY identifier in the client bundle', !bundleText.includes('KIT_API_KEY'), '');
check('no Kit embed script referenced', !bundleText.includes('kit.com/') || !/kit\.com\/[a-z0-9]+\/index\.js/.test(bundleText), '');

// ---------- rendered behaviour ----------
const browser = await chromium.launch({ channel: 'chrome', headless: true });
try {
  const context = await browser.newContext({ viewport: { width: 1280, height: 900 } });
  const page = await context.newPage();
  const subscribePosts = [];
  page.on('request', (req) => {
    if (req.url().includes('/api/subscribe')) subscribePosts.push(req.method());
  });

  // The page set from the deployment brief, including the two contextual
  // magnets that are easiest to get wrong.
  const pagesToCheck = [
    '/',
    '/thinking',
    '/thinking/territory-based-gtm-small-teams',
    '/glossary/gtm-engineering',
    '/glossary/marketing-automation',
    '/tools',
  ];
  for (const path of pagesToCheck) {
    const response = await page.goto(`${url}${path}`, { waitUntil: 'networkidle' });
    const blocks = page.locator('section[aria-labelledby$="-newsletter-heading"]');
    const count = await blocks.count();
    check(`${path} loads and shows exactly one newsletter block`, Boolean(response) && response.status() < 400 && count === 1, `status=${response ? response.status() : 'none'} blocks=${count}`);
    const magnets = await blocks.evaluateAll((nodes) => nodes.map((n) => n.getAttribute('data-lead-magnet')));
    if (magnets.length) console.log(`        lead magnet: ${magnets.join(', ')}`);
    const footerForm = await page.locator('footer form').count();
    check(`${path} footer strip present`, footerForm >= 1, `count=${footerForm}`);
  }

  await page.goto(`${url}/`, { waitUntil: 'networkidle' });
  const homeBlock = page.locator('section[aria-labelledby="homepage-newsletter-heading"]');
  try {
    await homeBlock.waitFor({ state: 'visible', timeout: 20000 });
  } catch {
    check('homepage newsletter block renders', false, 'block never became visible');
    throw new Error('homepage newsletter block missing — skipping interaction checks');
  }
  const postsBefore = subscribePosts.length;
  await homeBlock.locator('input[type="email"]').fill('nope');
  await homeBlock.locator('button[type="submit"]').click();
  await page.waitForTimeout(700);
  const inline = await homeBlock.locator('[role="status"]').first().innerText();
  check('client-side validation shows an inline error', /valid email/i.test(inline), inline.trim());
  check('invalid email never reaches the API', subscribePosts.length === postsBefore, `posts=${subscribePosts.length - postsBefore}`);

  if (live && email) {
    await homeBlock.locator('input[type="email"]').fill(email);
    await homeBlock.locator('button[type="submit"]').click();
    let done = false;
    for (let i = 0; i < 40 && !done; i += 1) {
      done = /Subscribed|already subscribed/i.test(await homeBlock.innerText());
      if (!done) await page.waitForTimeout(500);
    }
    check('live signup reaches a terminal state in the UI', done, '');
    check('live signup stayed on the page', new URL(page.url()).pathname === '/', page.url());

    if (!process.env.KIT_API_KEY) {
      check('Kit read-back requires KIT_API_KEY in the local environment', false, 'rerun with KIT_API_KEY set');
    } else {
      const headers = { 'X-Kit-Api-Key': process.env.KIT_API_KEY, Accept: 'application/json' };
      const formResponse = await fetch(`https://api.kit.com/v4/forms/${FORM_ID}/subscribers`, { headers });
      const formBody = await formResponse.json().catch(() => null);
      const inForm = Array.isArray(formBody?.subscribers)
        ? formBody.subscribers.find((s) => String(s.email_address).toLowerCase() === email.toLowerCase())
        : null;
      check(`subscriber belongs to form ${FORM_ID}`, Boolean(inForm), `status=${formResponse.status}`);
      if (inForm) {
        const detail = await fetch(`https://api.kit.com/v4/subscribers/${inForm.id}`, { headers });
        const detailBody = await detail.json().catch(() => null);
        const fields = detailBody?.subscriber?.fields ?? null;
        console.log(`        kit fields: ${JSON.stringify(fields)}`);
        check('custom fields persisted (source_page / lead_magnet)', Boolean(fields?.source_page && fields?.lead_magnet), JSON.stringify(fields));
      }
    }
  } else if (live) {
    console.log('     note: --live requires --email=<address>; skipping the live signup');
  }
} catch (error) {
  check('rendered-behaviour checks completed', false, String(error?.message || error));
} finally {
  await browser.close();
  if (localServer) await new Promise((resolve) => localServer.close(resolve));
}

console.log(`\nproduction verification — ${failures === 0 ? 'PASS' : 'FAIL'} (${assertions} assertions, ${failures} failure(s))`);
process.exit(failures === 0 ? 0 : 1);
