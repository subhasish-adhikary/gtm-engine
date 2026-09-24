import { chromium } from 'playwright-core';

const browser = await chromium.launch({ executablePath: '/root/.cache/ms-playwright/chromium-1234/chrome-linux64/chrome', args: ['--no-sandbox'] });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

async function inspect(label) {
  const data = await page.evaluate(() => {
    const htmlClass = document.documentElement.className;
    const get = (sel) => {
      const el = document.querySelector(sel);
      if (!el) return null;
      const cs = getComputedStyle(el);
      const r = el.getBoundingClientRect();
      const arrow = el.querySelector('.hero-cta-arrow');
      const acs = arrow ? getComputedStyle(arrow) : null;
      return {
        theme: htmlClass, text: el.textContent.trim(),
        display: cs.display, visibility: cs.visibility, opacity: cs.opacity,
        bg: cs.backgroundColor, color: cs.color, border: cs.borderTopWidth + ' ' + cs.borderTopColor,
        arrowColor: acs ? acs.color : null,
        w: Math.round(r.width), h: Math.round(r.height), inViewport: r.top >= 0 && r.bottom <= window.innerHeight * 5,
        clickable: (() => { const e = document.elementFromPoint(r.left + r.width/2, r.top + r.height/2); return !!e && (el === e || el.contains(e)); })(),
      };
    };
    return { primary: get('a.hero-cta-primary'), secondary: get('a.hero-cta-secondary') };
  });
  console.log(label, JSON.stringify(data, null, 1));
  return data;
}

// TEST 1: default dark theme (fresh context, no localStorage)
await page.goto('http://localhost:5199/', { waitUntil: 'networkidle' });
let d = await inspect('TEST1-default-dark');
console.assert(d.theme === undefined);
const okDark = d.primary && d.secondary &&
  d.primary.visibility === 'visible' && Number(d.primary.opacity) === 1 && d.primary.w > 0 &&
  d.primary.bg === 'rgb(17, 17, 17)' && d.primary.color === 'rgb(247, 246, 242)' &&
  d.secondary.bg === 'rgba(0, 0, 0, 0)' && d.secondary.color === 'rgb(245, 247, 250)' &&
  d.secondary.arrowColor === 'rgb(76, 141, 255)' && d.secondary.clickable && d.primary.clickable;
console.log('TEST1 PASS:', okDark);

// Toggle to light via the navbar theme button
await page.locator('button[aria-label="Toggle theme"]').click();
await page.waitForTimeout(400);
d = await inspect('TEST2-light');
const okLight = d.primary.bg === 'rgb(17, 17, 17)' && d.primary.color === 'rgb(247, 246, 242)' &&
  d.secondary.bg === 'rgba(0, 0, 0, 0)' && d.secondary.color === 'rgb(17, 17, 17)' &&
  d.secondary.arrowColor === 'rgb(21, 94, 239)' && d.secondary.visibility === 'visible' && Number(d.secondary.opacity) === 1 &&
  d.secondary.clickable && d.primary.clickable;
console.log('TEST2 PASS:', okLight);

// TEST 3: DARK -> LIGHT -> DARK -> LIGHT transitions
await page.locator('button[aria-label="Toggle theme"]').click(); await page.waitForTimeout(300);
d = await inspect('TEST3-dark#2');
const t3a = d.primary.bg === 'rgb(17, 17, 17)' && d.secondary.color === 'rgb(245, 247, 250)';
await page.locator('button[aria-label="Toggle theme"]').click(); await page.waitForTimeout(300);
d = await inspect('TEST3-light#2');
const t3b = d.primary.bg === 'rgb(17, 17, 17)' && d.secondary.color === 'rgb(17, 17, 17)' && d.secondary.arrowColor === 'rgb(21, 94, 239)';
console.log('TEST3 PASS:', t3a && t3b);

// Hover state check on secondary in light mode
await page.hover('a.hero-cta-secondary');
await page.waitForTimeout(200);
const hov = await page.evaluate(() => {
  const el = document.querySelector('a.hero-cta-secondary');
  const cs = getComputedStyle(el);
  return { color: cs.color, borderColor: cs.borderTopColor };
});
console.log('HOVER secondary(light):', JSON.stringify(hov));

await page.screenshot({ path: '/tmp/hero-light.png', clip: { x: 0, y: 60, width: 1440, height: 700 } });
// back to dark for screenshot
await page.locator('button[aria-label="Toggle theme"]').click(); await page.waitForTimeout(400);
await page.screenshot({ path: '/tmp/hero-dark.png', clip: { x: 0, y: 60, width: 1440, height: 700 } });

// Reload persistence check (dark saved)
await page.reload({ waitUntil: 'networkidle' });
d = await inspect('AFTER-RELOAD');
console.log('ALL PASS:', okDark && okLight && t3a && t3b);
await browser.close();
