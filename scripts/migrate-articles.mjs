/*
 * One-time migration: legacy TypeScript articles -> Sanity Content Lake.
 *
 * IDEMPOTENT: every document gets a deterministic _id ("article-<legacyId>")
 * and is written with createIfNotExists, so running this twice never creates
 * duplicates. Related-article references are patched in a second pass and
 * only when missing.
 *
 * Usage:
 *   SANITY_API_TOKEN=<token-with-write-access> node scripts/migrate-articles.mjs
 *   SANITY_API_TOKEN=... node scripts/migrate-articles.mjs --dry-run   (no writes)
 *
 * The token is only used here, server-side — never in frontend code.
 * Create one at manage.sanity.io -> project-almond-feather -> API -> Tokens
 * (Editor rights are sufficient).
 */
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {createRequire} from 'node:module';
import {createJiti} from 'jiti';

const require = createRequire(import.meta.url);
const {createClient} = require('@sanity/client');
const jiti = createJiti(import.meta.url);

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const DRY_RUN = process.argv.includes('--dry-run');

const PROJECT_ID = '0uqx6fxe';
const DATASET = 'production';

const token = process.env.SANITY_API_TOKEN;
if (!token && !DRY_RUN) {
  console.error('SANITY_API_TOKEN is required (create an Editor token at manage.sanity.io -> API -> Tokens).');
  process.exit(1);
}

const client = createClient({
  projectId: PROJECT_ID,
  dataset: DATASET,
  apiVersion: '2024-10-01',
  useCdn: false,
  token,
});

/** Extracts H2 anchor ids from the legacy HTML (order-preserving). */
function extractHeadingIds(html = '') {
  const map = [];
  const re = /<h2[^>]*id="([^"]*)"[^>]*>([\s\S]*?)<\/h2>/g;
  let m;
  while ((m = re.exec(html))) {
    map.push({id: m[1], text: m[2].replace(/<[^>]*>/g, '').trim()});
  }
  return map;
}

function stripTags(html = '') {
  return html.replace(/<[^>]*>/g, '').replace(/&amp;/g, '&').replace(/&#039;/g, "'").replace(/&quot;/g, '"').trim();
}

/*
 * Converts the legacy article HTML into Portable Text blocks.
 *
 * The legacy content uses a small, known tag set (p, strong, h2[id], ul, li —
 * plus em/code/a handled for completeness), so a purpose-built converter is
 * simpler and more deterministic than pulling in @sanity/block-tools + a DOM.
 */
function inlineHtmlToSpans(html, keyPrefix) {
  // Walk inline markup, tracking open marks, emitting one span per text run.
  const spans = [];
  const stack = []; // {type, href}
  const re = /<\/?(strong|em|code|u|a)(\s[^>]*)?>|([^<]+)/g;
  let m;
  let i = 0;
  const decode = (s) =>
    s.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#039;/g, "'");

  while ((m = re.exec(html))) {
    if (m[3] !== undefined) {
      const text = decode(m[3]);
      if (!text.trim() && text === '') continue;
      const marks = [...stack].map((s) => s.type);
      const link = [...stack].reverse().find((s) => s.type === 'link');
      if (link) {
        const key = `${keyPrefix}m${i}`;
        spans.push({_type: 'span', _key: key, text, marks: [...marks.filter((x) => x !== 'link'), key]});
        spans.push({markDef: {_key: key, _type: 'link', href: link.href || '#'}});
      } else {
        spans.push({_type: 'span', _key: `${keyPrefix}s${i}`, text, marks});
      }
      i++;
    } else if (m[1] === undefined) {
      continue;
    } else {
      const tag = m[1];
      const closing = m[0].startsWith('</');
      if (tag === 'a') {
        if (closing) {
          const idx = stack.map((s) => s.type).lastIndexOf('link');
          if (idx >= 0) stack.splice(idx, 1);
        } else {
          const href = (m[2] || '').match(/href="([^"]*)"/)?.[1] || '#';
          stack.push({type: 'link', href});
        }
      } else if (closing) {
        const idx = stack.map((s) => s.type).lastIndexOf(tag);
        if (idx >= 0) stack.splice(idx, 1);
      } else {
        stack.push({type: tag === 'u' ? 'underline' : tag});
      }
    }
  }
  // Separate collected link markDefs from spans.
  const markDefs = spans.filter((s) => s.markDef).map((s) => s.markDef);
  const children = spans.filter((s) => !s.markDef);
  return {children, markDefs};
}

function htmlToPortableText(html = '') {
  const blocks = [];
  const blockRe = /<h2[^>]*id="([^"]*)"[^>]*>([\s\S]*?)<\/h2>|<ul>([\s\S]*?)<\/ul>|<p[^>]*>([\s\S]*?)<\/p>/g;
  let m;
  let blockIndex = 0;

  const makeBlock = (style, inner, anchorId) => {
    const {children, markDefs} = inlineHtmlToSpans(inner, `b${blockIndex}`);
    const block = {
      _type: 'block',
      _key: `b${blockIndex}`,
      style,
      children: children.length ? children : [{_type: 'span', _key: `b${blockIndex}e`, text: '', marks: []}],
    };
    if (markDefs.length) block.markDefs = markDefs;
    if (anchorId) block.anchorId = anchorId;
    blocks.push(block);
    blockIndex++;
  };

  while ((m = blockRe.exec(html))) {
    if (m[1] !== undefined) {
      makeBlock('h2', m[2], m[1]);
    } else if (m[3] !== undefined) {
      const items = m[3].match(/<li[^>]*>([\s\S]*?)<\/li>/g) || [];
      for (const li of items) {
        const inner = li.replace(/^<li[^>]*>/, '').replace(/<\/li>$/, '');
        const before = blocks.length;
        makeBlock('bullet', inner);
        blocks[before].listItem = 'bullet';
        blocks[before].level = 1;
      }
    } else if (m[4] !== undefined) {
      makeBlock('normal', m[4]);
    }
  }
  return {blocks, hasAnchorGap: false}; // anchor ids come straight from the h2 tags
}

/** Uploads an image (URL or local file) and returns the asset reference. */
async function uploadImage(article) {
  try {
    if (article.featuredImage.startsWith('http')) {
      const res = await fetch(article.featuredImage, {signal: AbortSignal.timeout(60000)});
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const buffer = Buffer.from(await res.arrayBuffer());
      const asset = await client.assets.upload('image', buffer, {
        filename: `${article.id}.png`,
        contentType: res.headers.get('content-type') || 'image/png',
      });
      return {_type: 'image', asset: {_ref: asset._id}, alt: article.featuredImageAlt};
    }
    const filePath = path.join(root, 'public', article.featuredImage);
    const asset = await client.assets.upload('image', fs.readFileSync(filePath), {
      filename: path.basename(article.featuredImage),
      contentType: article.featuredImage.endsWith('.webp') ? 'image/webp' : 'image/png',
    });
    return {_type: 'image', asset: {_ref: asset._id}, alt: article.featuredImageAlt};
  } catch (err) {
    throw new Error(`image upload failed for ${article.id}: ${String(err).slice(0, 120)}`);
  }
}

async function main() {
  const {allArticles} = await jiti.import('../src/data/articles.ts');
  console.log(`Migrating ${allArticles.length} legacy articles to ${PROJECT_ID}/${DATASET}${DRY_RUN ? ' (DRY RUN)' : ''}\n`);

  // 0. Verify the dataset exists (clear error instead of cryptic write failures).
  if (!DRY_RUN) {
    try {
      const datasets = await client.datasets.list();
      if (!datasets.some((d) => d.name === DATASET)) {
        console.error(`Dataset "${DATASET}" does not exist on project ${PROJECT_ID}. Create it in manage.sanity.io -> Datasets first.`);
        process.exit(1);
      }
    } catch (err) {
      console.error(`Could not list datasets (check token/project): ${String(err).slice(0, 200)}`);
      process.exit(1);
    }
  }

  // 1. Which legacy articles are already migrated?
  const existing = DRY_RUN
    ? new Map()
    : new Map(
        (await client.fetch('*[_type == "article" && defined(legacyId)] { _id, legacyId, "hasRelated": defined(relatedArticles) }')).map(
          (d) => [d.legacyId, d]
        )
      );

  let created = 0;
  let skipped = 0;
  const createdIds = new Map(); // legacyId -> sanity _id

  // 2. Create documents (createIfNotExists keeps this idempotent).
  for (const article of allArticles) {
    const sanityId = `article-${article.id}`;
    createdIds.set(article.id, sanityId);

    if (existing.has(article.id)) {
      skipped++;
      console.log(`  = ${article.id} (already migrated, skipping)`);
      continue;
    }

    const {blocks, hasAnchorGap} = htmlToPortableText(article.content);
    if (hasAnchorGap) {
      console.warn(`  ⚠ ${article.id}: some H2 anchor ids could not be matched — ToC anchors regenerated from headings`);
    }

    // ToC: prefer original entries (ids preserved); regenerate from blocks if absent.
    const derivedToc = blocks
      .filter((b) => b._type === 'block' && b.style === 'h2')
      .map((b) => ({
        id: b.anchorId || (b.children || []).map((c) => c.text || '').join('').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''),
        title: (b.children || []).map((c) => c.text || '').join(''),
      }));

    const doc = {
      _type: 'article',
      _id: sanityId,
      title: article.title,
      slug: {_type: 'slug', current: article.id},
      category: article.category,
      thesis: article.thesis,
      author: article.author,
      authorBio: article.authorBio,
      publishedDate: article.publishedDate,
      updatedDate: article.updatedDate,
      readingTime: article.readingTime,
      featuredImageAlt: article.featuredImageAlt,
      atAGlance: article.atAGlance,
      tableOfContents: article.tableOfContents.length > 0 ? article.tableOfContents : derivedToc,
      content: blocks,
      faq: article.faq,
      sources: article.sources,
      relatedTools: article.relatedTools,
      legacyId: article.id,
    };

    if (DRY_RUN) {
      console.log(`  + ${article.id} (${blocks.length} blocks, ToC: ${doc.tableOfContents.length}) [dry run — not written]`);
      created++;
      continue;
    }

    process.stdout.write(`  + ${article.id} — uploading image... `);
    doc.featuredImage = await uploadImage(article);
    await client.createIfNotExists(doc);
    created++;
    console.log('done');
  }

  // 3. Patch related-article references (second pass, only when missing).
  if (!DRY_RUN) {
    for (const article of allArticles) {
      const sanityId = createdIds.get(article.id);
      const existingDoc = existing.get(article.id);
      if (existingDoc?.hasRelated) continue;
      if (!article.relatedArticles || article.relatedArticles.length === 0) continue;

      const refs = article.relatedArticles
        .map((legacyTarget) => createdIds.get(legacyTarget))
        .filter(Boolean)
        .filter((targetId) => targetId !== sanityId)
        .map((targetId) => ({_type: 'reference', _ref: targetId}));
      if (refs.length === 0) continue;

      if (existingDoc) {
        await client.patch(sanityId).setIfMissing({relatedArticles: refs}).commit();
        console.log(`  ↺ patched related articles for ${article.id}`);
      } else {
        await client.patch(sanityId).setIfMissing({relatedArticles: refs}).commit();
        console.log(`  ↺ related articles set for ${article.id}`);
      }
    }
  }

  console.log(`\nDone. created=${created} skipped=${skipped}${DRY_RUN ? ' (dry run — nothing written)' : ''}`);
  if (!DRY_RUN && created > 0) {
    console.log('Next: redeploy the website so scripts/generate-articles.mjs pulls these into the build.');
  }
}

main().catch((err) => {
  console.error('Migration failed:', err);
  process.exit(1);
});
