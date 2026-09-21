// One-off seed: publishes the territory-based GTM article to Sanity. Deleted after use.
import fs from 'node:fs';
import {createRequire} from 'node:module';
const require = createRequire(import.meta.url);
const {createClient} = require('@sanity/client');

const client = createClient({
  projectId: '0uqx6fxe',
  dataset: 'production',
  apiVersion: '2024-10-01',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});

// --- HTML -> Portable Text (same converter proven in migrate-articles.mjs) ---
function extractHeadingIds(html = '') {
  const map = [];
  const re = /<h2[^>]*id="([^"]*)"[^>]*>([\s\S]*?)<\/h2>/g;
  let m;
  while ((m = re.exec(html))) map.push({id: m[1], text: m[2].replace(/<[^>]*>/g, '').trim()});
  return map;
}
function stripTags(html = '') {
  return html.replace(/<[^>]*>/g, '').replace(/&amp;/g, '&').replace(/&#039;/g, "'").replace(/&quot;/g, '"').trim();
}
function inlineHtmlToSpans(html, keyPrefix) {
  const spans = [];
  const stack = [];
  const re = /<\/?(strong|em|code|u|a)(\s[^>]*)?>|([^<]+)/g;
  let m; let i = 0;
  const decode = (s) => s.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#039;/g, "'").replace(/&nbsp;/g, ' ');
  while ((m = re.exec(html))) {
    if (m[3] !== undefined) {
      const text = decode(m[3]);
      const marks = [...stack].map((s) => s.type);
      const link = [...stack].reverse().find((s) => s.type === 'link');
      if (link) {
        const k = `${keyPrefix}m${i}`;
        spans.push({_type: 'span', _key: k, text, marks: [...marks.filter((x) => x !== 'link'), k]});
        spans.push({markDef: {_key: k, _type: 'link', href: link.href || '#'}});
      } else {
        spans.push({_type: 'span', _key: `${keyPrefix}s${i}`, text, marks});
      }
      i++;
    } else if (m[1] === undefined) continue;
    else {
      const tag = m[1];
      const closing = m[0].startsWith('</');
      if (tag === 'a') {
        if (closing) { const idx = stack.map((s) => s.type).lastIndexOf('link'); if (idx >= 0) stack.splice(idx, 1); }
        else stack.push({type: 'link', href: (m[2] || '').match(/href="([^"]*)"/)?.[1] || '#'});
      } else if (closing) { const idx = stack.map((s) => s.type).lastIndexOf(tag); if (idx >= 0) stack.splice(idx, 1); }
      else stack.push({type: tag === 'u' ? 'underline' : tag});
    }
  }
  const markDefs = spans.filter((s) => s.markDef).map((s) => s.markDef);
  const children = spans.filter((s) => !s.markDef);
  return {children, markDefs};
}
function htmlToPortableText(html = '') {
  const blocks = [];
  const blockRe = /<h2[^>]*id="([^"]*)"[^>]*>([\s\S]*?)<\/h2>|<ul>([\s\S]*?)<\/ul>|<p[^>]*>([\s\S]*?)<\/p>/g;
  let m; let bi = 0;
  const makeBlock = (style, inner, anchorId) => {
    const {children, markDefs} = inlineHtmlToSpans(inner, `b${bi}`);
    const block = {_type: 'block', _key: `b${bi}`, style, children: children.length ? children : [{_type: 'span', _key: `b${bi}e`, text: '', marks: []}]};
    if (markDefs.length) block.markDefs = markDefs;
    if (anchorId) block.anchorId = anchorId;
    blocks.push(block); bi++;
  };
  while ((m = blockRe.exec(html))) {
    if (m[1] !== undefined) makeBlock('h2', m[2], m[1]);
    else if (m[3] !== undefined) {
      const items = m[3].match(/<li[^>]*>([\s\S]*?)<\/li>/g) || [];
      for (const liEl of items) {
        const inner = liEl.replace(/^<li[^>]*>/, '').replace(/<\/li>$/, '');
        const before = blocks.length;
        makeBlock('bullet', inner);
        blocks[before].listItem = 'bullet'; blocks[before].level = 1;
      }
    } else if (m[4] !== undefined) makeBlock('normal', m[4]);
  }
  return blocks;
}

// --- content (the approved draft, as HTML) ---
const contentHtml = fs.readFileSync(new URL('./seed-content.html', import.meta.url), 'utf8');

// --- featured image ---
process.env.PLAYWRIGHT_BROWSERS_PATH = '0';
const {chromium} = await import('playwright-core');
const cardHtml = fs.readFileSync(new URL('./seed-card.html', import.meta.url), 'utf8');
const browser = await chromium.launch({headless: true, channel: 'chrome'});
const page = await browser.newPage({viewport: {width: 1200, height: 630}, deviceScaleFactor: 1});
await page.setContent(cardHtml, {waitUntil: 'load'});
const png = await page.locator('.card').screenshot({type: 'png'});
const b64 = await page.evaluate(async ({b}) => {
  const img = new Image();
  await new Promise((res, rej) => { img.onload = res; img.onerror = rej; img.src = 'data:image/png;base64,' + b; });
  const c = document.createElement('canvas'); c.width = img.naturalWidth; c.height = img.naturalHeight;
  c.getContext('2d').drawImage(img, 0, 0);
  return c.toDataURL('image/webp', 0.88).split(',')[1];
}, {b: png.toString('base64')});
fs.writeFileSync('/tmp/territory.webp', Buffer.from(b64, 'base64'));
await browser.close();
const asset = await client.assets.upload('image', fs.readFileSync('/tmp/territory.webp'), {
  filename: 'territory-based-gtm-model-small-teams.webp', contentType: 'image/webp',
});

const doc = {
  _type: 'article',
  _id: 'article-territory-based-gtm-small-teams',
  title: 'Building a Territory-Based GTM Model for Small B2B Teams',
  slug: {_type: 'slug', current: 'territory-based-gtm-small-teams'},
  category: 'gtm',
  thesis: 'A territory-based GTM model assigns every account to one named owner who is accountable for coverage. For teams under 20 people it works only when built as capacity-honest coverage promises — here is the build sequence, the segmentation choice, and the routing standard.',
  author: 'Subhasish Adhikary',
  authorBio: 'Strategic marketer specializing in B2B go-to-market, demand generation, and marketing automation.',
  publishedDate: '2026-09-22',
  readingTime: '9 min read',
  featuredImage: {_type: 'image', asset: {_type: 'reference', _ref: asset._id}},
  featuredImageAlt: 'Territory-based GTM model diagram showing account territories assigned to owners on a small B2B team',
  atAGlance: [
    'A territory-based GTM model assigns every account to one named owner accountable for coverage — it is a promise-keeping device, not a growth strategy',
    'Island, assembly line, and pod describe how work flows; territory describes who owns which accounts — small teams need both answers, in that order',
    'Do not design territories before you can name your last ten closed-won customers; pre-PMF, a shared target-account list beats any geography',
    'The capacity math comes before the org chart: tier accounts by coverage promise, then check whether the hours exist to keep it',
    'Route by territory to a five-minute first-touch standard — only 23% of B2B companies hit that bar today (Optifai, 2026)',
  ],
  tableOfContents: [
    {id: 'what-is-a-territory-based-gtm-model', title: 'What Is a Territory-Based GTM Model?'},
    {id: 'when-should-a-small-team-use-territories', title: 'When Should a Small Team Use a Territory Model Instead of Something Else?'},
    {id: 'how-to-design-territories-under-20-people', title: 'How Do You Design Territories When You Have Fewer Than 20 People?'},
    {id: 'segmentation-choice', title: 'Geographic, Vertical, or Named-Account Territories?'},
    {id: 'territory-design-and-lead-routing', title: 'How Does Territory Design Connect to Lead Routing?'},
    {id: 'worked-example', title: 'What Does a Territory-Based GTM Model Look Like in Practice?'},
    {id: 'when-to-restructure', title: 'When Should You Restructure or Abandon Territories?'},
    {id: 'common-mistakes', title: 'The Most Common Mistakes Small Teams Make With Territory Design'},
  ],
  content: htmlToPortableText(contentHtml),
  faq: [
    {question: 'What is a territory-based GTM model?', answer: 'A territory-based GTM model assigns every account in your addressable market to one named owner — a rep, pod, or founder — accountable for coverage: research, touches, response time, and outcomes. It answers who owns each account, which is a different question from how work flows through the team (island, assembly line, or pod).'},
    {question: 'When should a small team use a territory model instead of pod or island structures?', answer: 'When accounts are numerous enough that unowned ones slip through, or when a hire is coming within two quarters. Island, pod, and assembly line describe how work flows; territory describes who owns which accounts. Small teams need both answers, and territory should be built as a coverage promise sized against real capacity.'},
    {question: 'How do you avoid over-engineering territory design pre-PMF?', answer: 'Skip formal territories until you can name your last ten closed-won customers. Before product-market fit, use a shared target-account list worked flexibly by whoever has capacity — a rigid design freezes a guess into your org structure and usually gets redrawn within months.'},
    {question: 'How does territory design connect to lead routing tools?', answer: 'Territories define who should own an account; routing rules enforce who does own each inbound signal. Practically: an owner field on every account, a domain-matching routing rule in your CRM or automation layer, a named fallback owner, and a response-time report by territory aimed at a five-minute first-touch standard.'},
    {question: 'What is a healthy routing benchmark for a small team?', answer: 'Aim for five-minute first touch on inbound; industry benchmarks show only about 23% of B2B companies achieve it (Optifai, 2026). For MQL-to-SQL conversion, healthy funnels typically run 30–50%, but a small team\'s honest baseline matters more than the benchmark — measure by territory and improve against yourself.'},
  ],
  sources: [
    {title: 'Field Sales Team Structure: Models, Ratios & Org Charts — Spotio (2026)', url: 'https://spotio.com', description: 'Island, assembly line, and pod sales structures and hiring order.'},
    {title: 'Lead Response Management study (Oldroyd) — covered by Harvard Business Review', url: 'https://hbr.org', description: 'Conversion odds collapse as inbound response time stretches past five minutes.'},
    {title: 'Lead response time benchmarks — Chili Piper (2025)', url: 'https://www.chilipiper.com', description: 'Aggregated average B2B lead response time of roughly 42 hours.'},
    {title: 'The Art of Sales Territory Planning — Gong (2025)', url: 'https://www.gong.io', description: 'Five-step territory planning guidance segmenting on buyer behavior.'},
    {title: 'How to Build a Sales Territory Plan: 2026 Guide — ZoomInfo', url: 'https://pipeline.zoominfo.com', description: 'Territory planning as strategic assignment of accounts to maximize revenue coverage.'},
  ],
  relatedArticles: [
    {_type: 'reference', _ref: 'article-hybrid-channel-gtm'},
    {_type: 'reference', _ref: 'article-signal-based-gtm'},
    {_type: 'reference', _ref: 'article-post-mql-gtm'},
  ],
  relatedTools: ['channel-planner', 'gtm-diagnostic'],
};

await client.createOrReplace(doc);
console.log('published:', doc._id, '| slug:', doc.slug.current, '| category:', doc.category, '| blocks:', doc.content.length);
