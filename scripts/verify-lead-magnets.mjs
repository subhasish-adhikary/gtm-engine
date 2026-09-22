#!/usr/bin/env node
/**
 * Lead-magnet asset verification.
 *
 * Checks the downloadable resources, the registry that points at them, the CTAs
 * that expose them, and the analytics event that proves a download happened.
 *
 *   node scripts/verify-lead-magnets.mjs --local-dist
 *   node scripts/verify-lead-magnets.mjs --url=https://subhasishadhikary.com
 *
 * Read-only: it never subscribes anyone, never modifies Kit, and writes nothing
 * except the optional --out evidence file. No file is deleted or overwritten.
 */
import path from 'node:path';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
import { createJiti } from 'jiti';
import { chromium } from 'playwright-core';
import { startDistServer } from './lib/dist-server.mjs';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const args = process.argv.slice(2);
const localDist = args.includes('--local-dist');
const urlArg = args.find((a) => a.startsWith('--url='));
const base = (localDist ? 'http://localhost:4312' : urlArg ? urlArg.slice('--url='.length) : 'http://localhost:3000').replace(/\/$/, '');
const outArg = args.find((a) => a.startsWith('--out='));
const outPath = outArg ? outArg.slice('--out='.length) : null;

/** The five magnets that must ship an artifact, and the page each one appears on. */
const EXPECTED = [
  { id: 'b2b-gtm-audit-checklist', route: '/thinking/territory-based-gtm-small-teams', url: '/downloads/b2b-gtm-audit-checklist.pdf', magic: '%PDF-' },
  { id: 'gtm-engineering-blueprint', route: '/glossary/gtm-engineering', url: '/downloads/gtm-engineering-blueprint.pdf', magic: '%PDF-' },
  { id: 'marketing-automation-maturity-assessment', route: '/glossary/marketing-automation', url: '/downloads/marketing-automation-maturity-assessment.pdf', magic: '%PDF-' },
  { id: 'b2b-demand-generation-playbook', route: '/glossary/demand-generation', url: '/downloads/b2b-demand-generation-playbook.pdf', magic: '%PDF-' },
  { id: 'gtm-stack-builder-template', route: '/tools', url: '/downloads/gtm-stack-builder-template.xlsx', magic: 'PK' },
];

const NEWSLETTER_ONLY_ROUTES = ['/', '/about', '/thinking'];

let failures = 0;
let assertions = 0;
const evidence = { base, generatedAt: new Date().toISOString(), registry: [], assets: [], ctas: [], downloads: [] };

function check(name, passed, detail = '') {
  assertions += 1;
  if (!passed) failures += 1;
  console.log(`  [${passed ? 'PASS' : 'FAIL'}] ${name}${detail ? ` — ${detail}` : ''}`);
}

console.log(`lead-magnet verification — ${base}\n`);

let localServer = null;
if (localDist) {
  localServer = await startDistServer({ repoRoot, port: 4312 });
  console.log('local dist server on 4312\n');
}

// ---------------------------------------------------------------- registry
console.log('registry (src/data/leadMagnets.ts)');
const jiti = createJiti(import.meta.url);
const { leadMagnets } = await jiti.import(path.join(repoRoot, 'src', 'data', 'leadMagnets.ts'));
const ids = Object.keys(leadMagnets);
const withResource = ids.filter((id) => leadMagnets[id].resource);
const urls = withResource.map((id) => leadMagnets[id].resource.url);
check('exactly five magnets ship a resource', withResource.length === 5, `found=${withResource.length}: ${withResource.join(', ')}`);
check('the newsletter keeps no downloadable resource', !leadMagnets['gtm-systems-brief'].resource, 'gtm-systems-brief -> null');
check('every magnet id maps to exactly one resource', new Set(urls).size === urls.length, `urls=${urls.length} unique=${new Set(urls).size}`);
for (const exp of EXPECTED) {
  const found = leadMagnets[exp.id]?.resource;
  check(`${exp.id} points at its own asset`, found?.url === exp.url && found?.kind === 'external', `url=${found?.url}`);
  evidence.registry.push({ id: exp.id, url: found?.url, label: found?.label, meta: found?.meta });
}

// ---------------------------------------------------------------- assets
console.log('\nassets over HTTP');
for (const exp of EXPECTED) {
  const res = await fetch(`${base}${exp.url}`);
  const buf = Buffer.from(await res.arrayBuffer());
  const head = buf.subarray(0, 5).toString('latin1');
  const ct = res.headers.get('content-type') || '';
  const ok = res.status === 200 && head.startsWith(exp.magic) && buf.length > 2000;
  check(`${exp.url} serves a real ${exp.magic === '%PDF-' ? 'PDF' : 'XLSX'}`, ok,
    `status=${res.status} type=${ct} bytes=${buf.length} magic=${JSON.stringify(head.slice(0, 4))}`);
  evidence.assets.push({ url: exp.url, status: res.status, bytes: buf.length, contentType: ct });
}
const missing = await fetch(`${base}/downloads/does-not-exist.pdf`);
check('an unknown download path 404s instead of serving something', missing.status === 404, `status=${missing.status}`);

// ---------------------------------------------------------------- endpoint untouched
const getApi = await fetch(`${base}/api/subscribe`, { method: 'GET' });
const postApi = await fetch(`${base}/api/subscribe`, {
  method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email: 'nope' }),
});
check('endpoint still rejects non-POST with 405', getApi.status === 405, `status=${getApi.status}`);
check('endpoint still validates email with 400', postApi.status === 400, `status=${postApi.status}`);

// ---------------------------------------------------------------- pages + CTAs
const browser = await chromium.launch({ channel: 'chrome', headless: true });
const context = await browser.newContext({ viewport: { width: 1280, height: 900 }, acceptDownloads: true });
await context.addInitScript(() => {
  const w = window;
  w.__vaEvents = [];
  w.vaq = w.vaq || [];
  w.__installCollector = function installCollector() {
    const current = w.va;
    if (typeof current === 'function' && current.__collector) return;
    const collector = (...a) => {
      w.__vaEvents.push(a);
      if (typeof current === 'function') current(...a);
    };
    collector.__collector = true;
    w.va = collector;
  };
  w.__installCollector();
  let ticks = 0;
  const t = setInterval(() => {
    w.__installCollector();
    if (++ticks > 400) clearInterval(t);
  }, 20);
});
const page = await context.newPage();

console.log('\nCTAs on the pages that carry each magnet');
for (const exp of EXPECTED) {
  await page.goto(`${base}${exp.route}`, { waitUntil: 'networkidle' });
  const block = page.locator(`section[data-lead-magnet="${exp.id}"]`);
  const count = await block.count();
  const link = block.locator(`a[href="${exp.url}"]`);
  const linkCount = await link.count();
  const allHrefs = await block.locator('a').evaluateAll((nodes) => nodes.map((n) => n.getAttribute('href')));
  const foreign = allHrefs.filter((h) => h && h.startsWith('/downloads/') && h !== exp.url);
  check(`${exp.route} shows the ${exp.id} block`, count === 1, `count=${count}`);
  check(`${exp.id} CTA points at ${exp.url}`, linkCount === 1, `links=${linkCount}`);
  check(`${exp.id} block exposes no other download`, foreign.length === 0, foreign.join(', ') || 'none');
  evidence.ctas.push({ route: exp.route, id: exp.id, blocks: count, links: linkCount, hrefs: allHrefs });
}

console.log('\nnewsletter-only placements stay download-free');
for (const route of NEWSLETTER_ONLY_ROUTES) {
  await page.goto(`${base}${route}`, { waitUntil: 'networkidle' });
  const hrefs = await page.locator('section[aria-labelledby$="-newsletter-heading"] a').evaluateAll((nodes) => nodes.map((n) => n.getAttribute('href')));
  const footerHrefs = await page.locator('footer a').evaluateAll((nodes) => nodes.map((n) => n.getAttribute('href')));
  const downloads = [...hrefs, ...footerHrefs].filter((h) => h && h.startsWith('/downloads/'));
  check(`${route} shows no download in the generic newsletter block`, downloads.length === 0, downloads.join(', ') || 'none');
  const forms = await page.locator('form input[type="email"]').count();
  check(`${route} still renders a working subscribe form`, forms >= 1, `email inputs=${forms}`);
}

// ---------------------------------------------------------------- download interaction
console.log('\ndownload interaction');
{
  const exp = EXPECTED[0];
  await page.goto(`${base}${exp.route}`, { waitUntil: 'networkidle' });
  const link = page.locator(`section[data-lead-magnet="${exp.id}"] a[href="${exp.url}"]`);
  const [download] = await Promise.all([
    page.waitForEvent('download', { timeout: 20000 }).catch(() => null),
    link.click(),
  ]);
  const suggested = download ? download.suggestedFilename() : null;
  // Completion is asserted from the browser's download event plus the HTTP
  // byte and magic-byte checks above; no temporary file is written or removed.
  check('clicking the CTA produces a real browser download', Boolean(download), `file=${suggested}`);
  check('downloaded filename matches the asset', suggested === path.basename(exp.url), `got=${suggested}`);
  const events = await page.evaluate(() => JSON.stringify(window.__vaEvents || []));
  check('lead_magnet_download fires with the magnet and destination',
    events.includes('lead_magnet_download') && events.includes(exp.id) && events.includes(exp.url),
    events.slice(0, 200));
  const after = await page.locator(`section[data-lead-magnet="${exp.id}"]`).count();
  check('the page still renders after the download', after === 1, `blocks=${after}`);
  evidence.downloads.push({ id: exp.id, url: exp.url, suggestedFilename: suggested });
}

await browser.close();
if (localServer) await new Promise((resolve) => localServer.close(resolve));
if (outPath) {
  fs.writeFileSync(outPath, JSON.stringify(evidence, null, 2));
  console.log(`\nevidence written to ${outPath}`);
}
console.log(`\nlead-magnet verification — ${failures === 0 ? 'PASS' : 'FAIL'} (${assertions} assertions, ${failures} failure(s))`);
process.exit(failures === 0 ? 0 : 1);
