import { chromium } from 'playwright-core';

const url = process.argv[2] || 'http://localhost:5199/';
const out = process.argv[3] || '/tmp/fw.png';

const browser = await chromium.launch({ executablePath: '/root/.cache/ms-playwright/chromium-1234/chrome-linux64/chrome', args: ['--no-sandbox','--disable-gpu'] });
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
await page.goto(url, { waitUntil: 'networkidle' });
await page.waitForTimeout(800);

const sec = page.locator('section.featured-work');
await sec.scrollIntoViewIfNeeded();
await page.waitForTimeout(600);
await sec.screenshot({ path: out });

// geometry report
const geo = await page.evaluate(() => {
  const sec = document.querySelector('section.featured-work');
  const grid = sec.querySelector('.grid') || sec.querySelector('div');
  const imgs = [...sec.querySelectorAll('img')];
  const arts = [...sec.querySelectorAll('article')];
  const rects = el => { const r = el.getBoundingClientRect(); return { x:+r.x.toFixed(1), y:+r.y.toFixed(1), w:+r.width.toFixed(1), h:+r.height.toFixed(1) }; };
  return {
    grid: rects(grid),
    gridTemplate: getComputedStyle(grid).gridTemplateColumns,
    gap: getComputedStyle(grid).columnGap,
    imgs: imgs.map(i => ({ src:i.src.split('/').pop(), ...rects(i), naturalW:i.naturalWidth, naturalH:i.naturalHeight, fit:getComputedStyle(i).objectFit })),
    cats: arts.map(a => rects(a.querySelector('span'))),
    titles: arts.map(a => rects(a.querySelector('h3'))),
    descs: arts.map(a => rects(a.querySelector('p'))),
    links: arts.map(a => { const l=[...a.querySelectorAll('a')].pop(); return rects(l); }),
    artWidths: arts.map(a => rects(a).w),
  };
});
console.log(JSON.stringify(geo, null, 1));
await browser.close();
