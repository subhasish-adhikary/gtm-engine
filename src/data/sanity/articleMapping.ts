/**
 * Mapping layer: Sanity article documents -> the website's `Article` shape.
 *
 * Shared by the build-time generator (scripts/generate-articles.mjs) so the
 * client app and the prerenderer consume identical data. Sanity queries and
 * credentials never reach React components: components see plain Article[]
 * data (src/data/articles.generated.ts).
 */
import type {Article} from '../articles';
import {portableTextToHtml, tableOfContentsFromPortableText} from '../../utils/portableText';

export const SANITY_PROJECT_ID = '0uqx6fxe';
export const SANITY_DATASET = 'production';

interface PtBlock {
  _type: string;
  style?: string;
  anchorId?: string;
  children?: {text?: string}[];
}

export interface SanityArticleDoc {
  _id: string;
  title?: string;
  slug?: {current?: string};
  category?: 'gtm' | 'automation' | 'ai-marketing';
  thesis?: string;
  author?: string;
  authorBio?: string;
  publishedDate?: string;
  updatedDate?: string;
  readingTime?: string;
  featuredImage?: {asset?: {ref?: string; _ref?: string}};
  featuredImageAlt?: string;
  atAGlance?: string[];
  tableOfContents?: {id?: string; title?: string}[];
  content?: PtBlock[];
  faq?: {question?: string; answer?: string}[];
  sources?: {title?: string; url?: string; description?: string}[];
  relatedArticles?: {_ref?: string}[];
  relatedTools?: string[];
  legacyId?: string;
}

/**
 * Builds the CDN URL for a Sanity image asset reference.
 * Ref format: "image-<hash>-<width>x<height>-<ext>"; the canonical URL is
 * /images/<projectId>/<dataset>/<hash>-<width>x<height>.<ext> with query
 * params for resizing/cropping.
 */
export function sanityImageUrl(
  ref: string | undefined,
  {width = 1200, height = 630, quality = 80}: {width?: number; height?: number; quality?: number} = {}
): string {
  if (!ref) return '';
  const parts = ref.split('-');
  // asset hashes are hex (no dashes); the last two segments are dims + ext.
  const extension = parts.pop();
  const dimensions = parts.pop();
  const hash = parts.slice(1).join('-');
  if (!hash || !dimensions || !extension) return '';
  const params = new URLSearchParams({auto: 'format', fit: 'fill', q: String(quality)});
  if (width) params.set('w', String(width));
  if (height) params.set('h', String(height));
  return `https://cdn.sanity.io/images/${SANITY_PROJECT_ID}/${SANITY_DATASET}/${hash}-${dimensions}.${extension}?${params}`;
}

/** Maps a raw Sanity article document into the site's Article interface. */
export function sanityArticleToArticle(doc: SanityArticleDoc): Article {
  const slug = doc.slug?.current || doc.legacyId || doc._id;
  const imageRef = doc.featuredImage?.asset?._ref || doc.featuredImage?.asset?.ref;
  const toc = (doc.tableOfContents || [])
    .filter((t) => t?.id && t?.title)
    .map((t) => ({id: t.id as string, title: t.title as string}));

  return {
    id: slug,
    title: doc.title || 'Untitled',
    // URL pattern: migrated (legacy) articles keep /thinking/<category>/<slug>;
    // Sanity-native articles use /thinking/<slug>. Category stays on the doc.
    legacyId: doc.legacyId || undefined,
    urlPath: doc.legacyId ? `/thinking/${doc.category}/${slug}` : `/thinking/${slug}`,
    thesis: doc.thesis || '',
    category: doc.category || 'gtm',
    author: doc.author || 'Subhasish Adhikary',
    authorBio: doc.authorBio || '',
    publishedDate: doc.publishedDate || '',
    updatedDate: doc.updatedDate || undefined,
    readingTime: doc.readingTime || '',
    featuredImage: sanityImageUrl(imageRef) || '',
    featuredImageAlt: doc.featuredImageAlt || doc.title || '',
    atAGlance: (doc.atAGlance || []).map((v: any) => typeof v === 'object' && v !== null ? v.value : v),
    // Prefer the stored ToC; fall back to deriving it from H2 headings so a
    // new article authored without a ToC still gets anchors.
    tableOfContents: toc.length > 0 ? toc : tableOfContentsFromPortableText(doc.content),
    content: portableTextToHtml(doc.content),
    faq: (doc.faq || []).map((f) => ({question: f.question || '', answer: f.answer || ''})),
    sources: (doc.sources || []).map((s) => ({
      title: s.title || '',
      url: s.url || '',
      ...(s.description ? {description: s.description} : {}),
    })),
    relatedArticles: (doc.relatedArticles || []).map((r) => r._ref || ''),
    relatedTools: doc.relatedTools || [],
  };
}
