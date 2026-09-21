/**
 * Minimal Portable Text -> HTML renderer for article content.
 *
 * Produces markup compatible with the site's `.prose` styles: h2/h3 (with
 * anchor ids matching the table of contents), paragraphs, lists, blockquotes
 * and inline marks. Used by both the article mapping and build tooling so
 * client and prerendered HTML stay identical.
 */

interface PtChild {
  _type?: string;
  _key?: string;
  text?: string;
  marks?: string[];
}

interface PtBlock {
  _type: string;
  _key?: string;
  style?: string;
  listItem?: string;
  level?: number;
  anchorId?: string;
  children?: PtChild[];
  markDefs?: {_key: string; _type: string; href?: string}[];
}

function escapeHtml(str = ''): string {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .replace(/&amp;/g, 'and')
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
}

function renderChildren(block: PtBlock): string {
  const markDefs = new Map((block.markDefs || []).map((d) => [d._key, d]));
  return (block.children || [])
    .map((child) => {
      let text = escapeHtml(child.text ?? '');
      if (!child.marks || child.marks.length === 0) return text;
      for (const markKey of child.marks) {
        if (markKey === 'strong') text = `<strong>${text}</strong>`;
        else if (markKey === 'em') text = `<em>${text}</em>`;
        else if (markKey === 'underline') text = `<u>${text}</u>`;
        else if (markKey === 'code') text = `<code>${text}</code>`;
        else {
          const def = markDefs.get(markKey);
          if (def?._type === 'link' && def.href) {
            const safeHref = /^(https?:\/\/|mailto:|\/|#)/.test(def.href) ? escapeHtml(def.href) : '#';
            text = `<a href="${safeHref}" target="_blank" rel="noopener noreferrer">${text}</a>`;
          }
        }
      }
      return text;
    })
    .join('');
}

function headingText(block: PtBlock): string {
  return (block.children || []).map((c) => c.text ?? '').join('');
}

export function portableTextToHtml(blocks: PtBlock[] | null | undefined): string {
  if (!Array.isArray(blocks)) return '';
  const out: string[] = [];
  let list: { type: string; items: string[] } | null = null;

  const flushList = () => {
    if (!list) return;
    const tag = list.type === 'number' ? 'ol' : 'ul';
    out.push(`<${tag}>${list.items.map((i) => `<li>${i}</li>`).join('')}</${tag}>`);
    list = null;
  };

  for (const block of blocks) {
    if (block._type !== 'block') continue; // images inside content are not used by the legacy articles
    const style = block.style || 'normal';

    const listItem = block.listItem || (style === 'bullet' || style === 'number' ? style : null);
    if (listItem) {
      const type = listItem === 'number' ? 'number' : 'bullet';
      if (!list || list.type !== type) {
        flushList();
        list = { type, items: [] };
      }
      list.items.push(renderChildren(block));
      continue;
    }

    flushList();

    if (style === 'h2') {
      const id = block.anchorId || slugifyHeading(headingText(block));
      out.push(`<h2 id="${escapeHtml(id)}">${renderChildren(block)}</h2>`);
    } else if (style === 'h3') {
      out.push(`<h3>${renderChildren(block)}</h3>`);
    } else if (style === 'h4') {
      out.push(`<h4>${renderChildren(block)}</h4>`);
    } else if (style === 'blockquote') {
      out.push(`<blockquote>${renderChildren(block)}</blockquote>`);
    } else {
      out.push(`<p>${renderChildren(block)}</p>`);
    }
  }
  flushList();
  return out.join('\n');
}

/**
 * Derives the table of contents from Portable Text headings (h2 level).
 */
export function tableOfContentsFromPortableText(blocks: PtBlock[] | null | undefined): { id: string; title: string }[] {
  if (!Array.isArray(blocks)) return [];
  return blocks
    .filter((b) => b._type === 'block' && (b.style || 'normal') === 'h2')
    .map((b) => {
      const title = headingText(b);
      return { id: b.anchorId || slugifyHeading(title), title };
    });
}
