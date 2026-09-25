import { chromium } from 'playwright-core';
const browser = await chromium.launch({ executablePath: '/root/.cache/ms-playwright/chromium-1234/chrome-linux64/chrome', args: ['--no-sandbox','--disable-gpu'] });
for (const [name, width] of [['desktop',1440],['tablet',834],['mobile',390]]) {
  const page = await browser.newPage({ viewport: { width, height: 1000 } });
  await page.goto('http://localhost:5199/', { waitUntil: 'networkidle' });
  const sec = page.locator('section', { hasText: 'GTM Operating System' }).nth(0);
  await sec.scrollIntoViewIfNeeded();
  await page.waitForTimeout(400);
  await sec.screenshot({ path: `/tmp/gtm-${name}.png` });
  // hover a node on desktop to check interaction
  if (name === 'desktop') {
    const node = page.locator('button[aria-label^="POSITIONING"]').first();
    await node.hover();
    await page.waitForTimeout(300);
    await sec.screenshot({ path: '/tmp/gtm-desktop-hover.png' });
  }
  await page.close();
}
await browser.close();
console.log('done');
