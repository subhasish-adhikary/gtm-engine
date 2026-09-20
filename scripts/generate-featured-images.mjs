/*
 * Featured-image generator for articles that lack a valid image.
 *
 * Renders an editorial publication graphic per article (1200x630, 1.91:1)
 * with a consistent visual system: dark brand base, category eyebrow, large
 * title typography, a topic-specific geometric motif, and an author/domain
 * footer. Output is WebP, encoded via Chromium's canvas so no extra image
 * tooling is required.
 *
 * Usage: node scripts/generate-featured-images.mjs   (only missing articles)
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createJiti } from 'jiti';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.resolve(__dirname, '../public/images/articles');
fs.mkdirSync(outDir, { recursive: true });

const jiti = createJiti(import.meta.url);
const { allArticles } = await jiti.import('../src/data/articles.ts');

// Topic-specific geometric motifs (inline SVG, consistent stroke system).
const MOTIFS = {
  'hybrid-channel-gtm': `
    <g stroke="#4C8DFF" stroke-width="3.5" fill="none" stroke-linecap="round">
      <path d="M20 40 H120 L160 80 H260"/>
      <path d="M20 100 H140 L180 100 H260" opacity="0.85"/>
      <path d="M20 160 H120 L160 120 H260" opacity="0.7"/>
    </g>
    <circle cx="272" cy="100" r="14" fill="#155EEF"/>
    <circle cx="20" cy="40" r="7" fill="#4C8DFF"/>
    <circle cx="20" cy="100" r="7" fill="#4C8DFF"/>
    <circle cx="20" cy="160" r="7" fill="#4C8DFF"/>`,
  'automation-strategy': `
    <g stroke="#4C8DFF" stroke-width="3.5" fill="none">
      <rect x="20" y="60" width="84" height="60" rx="10"/>
      <rect x="160" y="20" width="84" height="60" rx="10" opacity="0.8"/>
      <rect x="160" y="130" width="84" height="60" rx="10" opacity="0.8"/>
      <path d="M104 90 H132 M132 90 L152 55 M132 90 L152 155" stroke-linecap="round"/>
    </g>
    <circle cx="202" cy="50" r="6" fill="#4C8DFF"/>
    <circle cx="202" cy="160" r="6" fill="#4C8DFF"/>`,
  'automation-roi': `
    <g fill="#155EEF">
      <rect x="30" y="140" width="40" height="60" rx="4" opacity="0.55"/>
      <rect x="90" y="110" width="40" height="90" rx="4" opacity="0.7"/>
      <rect x="150" y="80" width="40" height="120" rx="4" opacity="0.85"/>
      <rect x="210" y="40" width="40" height="160" rx="4"/>
    </g>
    <path d="M40 120 L230 30" stroke="#4C8DFF" stroke-width="4" fill="none" stroke-linecap="round"/>
    <path d="M212 28 L232 29 L224 46" fill="none" stroke="#4C8DFF" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>`,
  'ai-content-expertise': `
    <g stroke="#4C8DFF" stroke-width="3.5" fill="none" stroke-linecap="round">
      <rect x="40" y="20" width="110" height="150" rx="10"/>
      <path d="M62 55 H128 M62 80 H128 M62 105 H104"/>
      <circle cx="200" cy="60" r="12"/>
      <circle cx="236" cy="110" r="12" opacity="0.75"/>
      <path d="M150 80 L188 64 M150 120 L224 111"/>
    </g>`,
  'ai-native-advertising': `
    <g stroke="#4C8DFF" stroke-width="3.5" fill="none">
      <rect x="30" y="40" width="120" height="130" rx="12"/>
      <path d="M50 80 H130 M50 105 H110" stroke-linecap="round" opacity="0.85"/>
      <circle cx="210" cy="100" r="46"/>
      <circle cx="210" cy="100" r="20" opacity="0.8"/>
      <path d="M210 40 V56 M210 144 V160 M150 100 H166 M254 100 H270" stroke-linecap="round"/>
    </g>`,
  'ai-marketing-roi': `
    <g stroke="#4C8DFF" stroke-width="3.5" fill="none" stroke-linecap="round">
      <path d="M150 130 A70 70 0 1 1 96 44"/>
      <path d="M150 130 L106 84"/>
      <circle cx="150" cy="130" r="7" fill="#4C8DFF"/>
    </g>
    <g fill="#155EEF">
      <rect x="196" y="100" width="22" height="100" rx="4" opacity="0.6"/>
      <rect x="230" y="70" width="22" height="130" rx="4" opacity="0.8"/>
      <rect x="264" y="40" width="22" height="160" rx="4"/>
    </g>`
};

const CATEGORY_LABEL = {
  gtm: 'B2B GTM Strategy',
  automation: 'Marketing Automation',
  'ai-marketing': 'AI in Marketing'
};

function escapeHtml(str = '') {
  return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function cardHtml(article) {
  const title = escapeHtml(article.title);
  const category = escapeHtml(CATEGORY_LABEL[article.category] || article.category);
  const motif = MOTIFS[article.id] || MOTIFS['automation-strategy'];
  // Adaptive title size: long editorial titles step down but never below 46px.
  const titleSize = article.title.length > 70 ? 46 : article.title.length > 48 ? 54 : 62;
  return `<!doctype html><html><head><meta charset="utf-8"><style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { width: 1200px; height: 630px; overflow: hidden; }
    .card {
      width: 1200px; height: 630px; position: relative; background: #0D0F12;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Inter, Roboto, sans-serif;
      display: flex; align-items: center; padding: 0 72px;
    }
    .grid { position: absolute; inset: 0;
      background-image: linear-gradient(rgba(76,141,255,0.045) 1px, transparent 1px),
        linear-gradient(90deg, rgba(76,141,255,0.045) 1px, transparent 1px);
      background-size: 48px 48px; }
    .glow { position: absolute; top: -260px; right: -180px; width: 680px; height: 680px;
      background: radial-gradient(circle, rgba(21,94,239,0.22) 0%, rgba(21,94,239,0) 68%); }
    .content { position: relative; width: 640px; }
    .eyebrow { display: inline-block; color: #4C8DFF; font-size: 20px; font-weight: 700;
      letter-spacing: 2.5px; text-transform: uppercase; margin-bottom: 22px; }
    .rule { width: 64px; height: 5px; border-radius: 3px; margin-bottom: 26px;
      background: linear-gradient(90deg, #155EEF, #4C8DFF); }
    h1 { color: #F5F7FA; font-size: ${titleSize}px; font-weight: 750; line-height: 1.12;
      letter-spacing: -1px; max-width: 620px; }
    .motif { position: absolute; right: 64px; top: 50%; transform: translateY(-50%);
      width: 300px; height: 200px; }
    .panel { position: absolute; right: 44px; top: 50%; transform: translateY(-50%);
      width: 340px; height: 280px; background: #14171C; border: 1px solid #232830;
      border-radius: 16px; }
    .footer { position: absolute; bottom: 44px; left: 72px; right: 72px;
      display: flex; justify-content: space-between; align-items: center;
      color: #9AA3AF; font-size: 21px; }
    .footer .author { font-weight: 600; color: #C9CED6; }
    .footer .badge { border: 1px solid #2A2E35; border-radius: 999px; padding: 8px 20px; font-size: 19px; }
  </style></head><body>
    <div class="card">
      <div class="grid"></div>
      <div class="glow"></div>
      <div class="content">
        <span class="eyebrow">${category}</span>
        <div class="rule"></div>
        <h1>${title}</h1>
      </div>
      <div class="panel"></div>
      <svg class="motif" viewBox="0 0 300 200">${motif}</svg>
      <div class="footer">
        <span class="author">Subhasish Adhikary</span>
        <span class="badge">subhasishadhikary.com</span>
      </div>
    </div>
  </body></html>`;
}

async function main() {
  const { chromium } = await import('playwright-core');
  const launchers = [
    () => chromium.launch({ channel: 'chrome', headless: true }),
    () => {
      process.env.PLAYWRIGHT_BROWSERS_PATH ??= '0';
      return chromium.launch({ headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox'] });
    }
  ];
  let browser;
  for (const run of launchers) {
    try { browser = await run(); break; } catch { /* next */ }
  }
  if (!browser) { console.error('No browser available for image generation'); process.exit(1); }

  const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
  let created = 0, skipped = 0;

  for (const article of allArticles) {
    const needsImage = !article.featuredImage || (!article.featuredImage.startsWith('http') && !fs.existsSync(path.join(outDir, path.basename(article.featuredImage))));
    const outPath = path.join(outDir, `${article.id}.webp`);
    if (!needsImage) { skipped++; continue; }
    if (fs.existsSync(outPath) && process.argv.includes('--skip-existing')) { skipped++; continue; }

    await page.setContent(cardHtml(article), { waitUntil: 'load' });
    // Playwright screenshots only support png/jpeg, so capture PNG then
    // re-encode to WebP through Chromium's canvas — no external image tooling.
    const pngBuffer = await page.locator('.card').screenshot({ type: 'png' });
    const webpBase64 = await page.evaluate(async ({ b64 }) => {
      const img = new Image();
      await new Promise((res, rej) => { img.onload = res; img.onerror = rej; img.src = 'data:image/png;base64,' + b64; });
      const canvas = document.createElement('canvas');
      canvas.width = img.naturalWidth; canvas.height = img.naturalHeight;
      canvas.getContext('2d').drawImage(img, 0, 0);
      return canvas.toDataURL('image/webp', 0.88).split(',')[1];
    }, { b64: pngBuffer.toString('base64') });

    fs.writeFileSync(outPath, Buffer.from(webpBase64, 'base64'));
    created++;
    console.log(`✓ ${article.id}.webp (${(fs.statSync(outPath).size / 1024).toFixed(0)} KB)`);
  }

  await browser.close();
  console.log(`Done. created=${created} skipped=${skipped}`);
}

main().catch(err => { console.error(err); process.exit(1); });
