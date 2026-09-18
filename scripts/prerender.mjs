/*
 * Post-build prerenderer.
 *
 * Runs the production build in a headless browser (real app, real SEO
 * effects) and saves each route's fully rendered HTML to
 * dist/<route>/index.html. Hosting platforms serve these static files
 * before the SPA fallback, so crawlers that don't execute JavaScript still
 * receive complete page content (head metadata, JSON-LD, and body).
 *
 * Route list is derived from the same canonical data sources as the sitemap
 * (case studies, articles, glossary terms, tools) so there is a single
 * source of truth and no content drift.
 *
 * Usage: node scripts/prerender.mjs   (after `vite build`)
 */
import { execSync, spawn } from 'node:child_process';
import { mkdirSync, writeFileSync, rmSync } from 'node:fs';
import { createRequire } from 'node:module';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const dist = join(root, 'dist');
const PORT = 4180;
const BASE = `http://localhost:${PORT}`;
const CONCURRENCY = 4;

// 1. Bundle the data sources to CJS so the script imports the exact same
//    modules the app uses.
const tmpEntry = join(root, '.prerender-entry.ts');
const tmpData = join(root, '.prerender-data.cjs');
writeFileSync(tmpEntry, `
  export { allArticles } from './src/data/articles.ts';
  export { glossaryTerms } from './src/data/glossary.ts';
  export { caseStudies } from './src/data/caseStudies.ts';
  export { tools, thinkingCategories } from './src/data/content.ts';
`);
execSync(
  `npx esbuild --bundle --format=cjs --outfile=${JSON.stringify(tmpData)} --log-level=error ${JSON.stringify(tmpEntry)}`,
  { cwd: root, stdio: 'inherit' }
);
rmSync(tmpEntry, { force: true });

const require = createRequire(import.meta.url);
const { allArticles, glossaryTerms, caseStudies, tools, thinkingCategories } = require(tmpData);
if (!caseStudies || !glossaryTerms || !allArticles || !tools || !thinkingCategories) {
  throw new Error('Data bundle incomplete: ' + Object.keys(require(tmpData)).join(', '));
}

// 2. Build the route inventory (mirrors the sitemap generator).
const routes = [];
const add = (p) => { if (!routes.includes(p)) routes.push(p); };
add('/');
for (const p of ['/about', '/credentials', '/work', '/thinking', '/tools', '/gtm-stack', '/glossary', '/contact', '/privacy']) add(p);
caseStudies.forEach((cs) => add(`/work/${cs.slug}`));
thinkingCategories.forEach((c) => add(`/thinking/${c.id}`));
allArticles.forEach((a) => add(`/thinking/${a.category}/${a.id}`));
add('/tools/gtm-intelligence');
tools.forEach((t) => add(`/tools/${t.id}`));
const seenSlugs = new Set();
glossaryTerms.forEach((t) => {
  if (!seenSlugs.has(t.slug)) { seenSlugs.add(t.slug); add(`/glossary/${t.slug}`); }
});

console.log(`Prerendering ${routes.length} routes...`);

// 3. Serve the production build.
const preview = spawn('npx', ['vite', 'preview', '--port', String(PORT), '--strictPort', '--host', '127.0.0.1'], {
  cwd: root,
  stdio: 'ignore',
  detached: true,
});
const wait = (ms) => new Promise((r) => setTimeout(r, ms));
let up = false;
for (let i = 0; i < 40; i++) {
  try {
    const res = await fetch(`${BASE}/`);
    if (res.ok) { up = true; break; }
  } catch { /* retry */ }
  await wait(500);
}
if (!up) {
  preview.kill();
  throw new Error('vite preview did not start');
}

// 4. Capture routes with a real browser.
const { chromium } = await import('playwright-core');
const browser = await chromium.launch({ channel: 'chrome', headless: true });
const context = await browser.newContext();

async function capture(route) {
  const page = await context.newPage();
  try {
    await page.goto(BASE + route, { waitUntil: 'load', timeout: 20000 });
    // Wait until React has mounted (main has children) plus a settle delay
    // for the SEO effect to write head tags.
    await page.waitForFunction(() => document.querySelector('main')?.children.length > 0, { timeout: 15000 }).catch(() => {});
    await wait(350);
    const html = await page.evaluate(() => {
      document.querySelectorAll('script[data-prerender-strip]').forEach((s) => s.remove());
      return '<!DOCTYPE html>\n' + document.documentElement.outerHTML;
    });
    const file = route === '/' ? join(dist, 'index.html') : join(dist, route, 'index.html');
    mkdirSync(dirname(file), { recursive: true });
    writeFileSync(file, html);
    return { route, ok: html.length > 2000 && /<main[^>]*>\s*\S/.test(html) };
  } catch (err) {
    return { route, ok: false, error: String(err).slice(0, 120) };
  } finally {
    await page.close();
  }
}

let done = 0;
const failures = [];
const queue = [...routes];
const workers = Array.from({ length: CONCURRENCY }, async () => {
  while (queue.length) {
    const route = queue.shift();
    const r = await capture(route);
    done++;
    if (!r.ok) failures.push(r);
    if (done % 40 === 0) console.log(`  ${done}/${routes.length}`);
  }
});
await Promise.all(workers);

await browser.close();
try { process.kill(-preview.pid, 'SIGTERM'); } catch { preview.kill(); }
rmSync(tmpData, { force: true });

if (failures.length) {
  console.error(`FAILED (${failures.length}):`);
  failures.forEach((f) => console.error(' ', f.route, f.error || ''));
  process.exit(1);
}
console.log(`Prerendered ${routes.length} routes -> dist/`);
