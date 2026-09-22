/**
 * Lead-magnet system.
 *
 * One newsletter infrastructure, many lead magnets. No separate Kit forms are
 * created per lead magnet: every placement reuses the same server-side
 * `/api/subscribe` endpoint and the same `LeadMagnet` id is stored in the Kit
 * custom field `lead_magnet`, which is what makes the list segmentable.
 *
 * IMPORTANT — no fake resources:
 * `resource` is `null` for every artifact that does not exist yet. When it is
 * `null` the newsletter subscription is the conversion mechanism and no
 * download link is rendered anywhere. Only a destination that genuinely exists
 * (today: the on-site GTM Stack Builder tool) is ever linked.
 */

export type LeadMagnetId =
  | 'b2b-gtm-audit-checklist'
  | 'gtm-engineering-blueprint'
  | 'marketing-automation-maturity-assessment'
  | 'b2b-demand-generation-playbook'
  | 'gtm-stack-builder-template'
  | 'gtm-systems-brief';

export interface LeadMagnetResource {
  label: string;
  /** An internal route or absolute URL that really resolves. */
  url: string;
  /** `external` is reserved for a real downloadable artifact. */
  kind: 'internal' | 'external';
}

export interface LeadMagnet {
  id: LeadMagnetId;
  title: string;
  description: string;
  cta: string;
  /** `null` means the artifact does not exist yet — never link a download. */
  resource: LeadMagnetResource | null;
  /** Honest status line shown when there is nothing to download yet. */
  availability?: string;
}

export const GENERIC_LEAD_MAGNET_ID: LeadMagnetId = 'gtm-systems-brief';

export const leadMagnets: Record<LeadMagnetId, LeadMagnet> = {
  'b2b-gtm-audit-checklist': {
    id: 'b2b-gtm-audit-checklist',
    title: 'The B2B GTM Audit Checklist',
    description:
      'A structured audit of a B2B go-to-market system: positioning, ICP fit, channel mix, funnel architecture and pipeline coverage — the gaps that quietly cost a quarter.',
    cta: 'Join the brief',
    resource: null,
    availability: 'In production. Subscribers to The GTM Systems Brief get it the day it ships.',
  },
  'gtm-engineering-blueprint': {
    id: 'gtm-engineering-blueprint',
    title: 'The GTM Engineering Blueprint',
    description:
      'How to wire data, routing, automation and reporting into one go-to-market system — the architecture behind a GTM function that runs without heroics.',
    cta: 'Join the brief',
    resource: null,
    availability: 'Being written now. Brief subscribers receive it first.',
  },
  'marketing-automation-maturity-assessment': {
    id: 'marketing-automation-maturity-assessment',
    title: 'The Marketing Automation Maturity Assessment',
    description:
      'A staged assessment of where your automation actually sits — from manual sends and static nurture to event-driven lifecycle systems.',
    cta: 'Join the brief',
    resource: null,
    availability: 'In production. Delivered to brief subscribers when it is ready.',
  },
  'b2b-demand-generation-playbook': {
    id: 'b2b-demand-generation-playbook',
    title: 'The B2B Demand Generation Playbook',
    description:
      'Channel-by-channel playbook for building demand that turns into pipeline — coverage, sequencing, response standards and the metrics worth keeping.',
    cta: 'Join the brief',
    resource: null,
    availability: 'In production. Brief subscribers get it first.',
  },
  'gtm-stack-builder-template': {
    id: 'gtm-stack-builder-template',
    title: 'The GTM Stack Builder',
    description:
      'Design your marketing technology stack against company size and growth stage, then see where the overlaps and gaps are.',
    cta: 'Join the brief',
    // The only destination that genuinely exists today: the on-site stack builder.
    resource: { label: 'Open the GTM Stack Builder', url: '/tools/stack-builder', kind: 'internal' },
  },
  'gtm-systems-brief': {
    id: 'gtm-systems-brief',
    title: 'The GTM Systems Brief',
    description:
      'Practical insights on B2B growth, GTM engineering, marketing automation, AI marketing, GTM systems, tools and experiments.',
    cta: 'Get the Brief',
    resource: null,
  },
};

export type LeadMagnetContext = 'article' | 'glossary-term' | 'tool' | 'homepage' | 'hub' | 'footer' | 'other';

/** Category → lead magnet. First-pass assignment for content that carries a category. */
const CATEGORY_MAP: Record<string, LeadMagnetId> = {
  // Article categories
  gtm: 'b2b-gtm-audit-checklist',
  automation: 'marketing-automation-maturity-assessment',
  'ai-marketing': 'gtm-engineering-blueprint',
  // Glossary categories
  growth: 'b2b-demand-generation-playbook',
  'demand-gen': 'b2b-demand-generation-playbook',
  abm: 'b2b-demand-generation-playbook',
  outbound: 'b2b-demand-generation-playbook',
  content: 'b2b-demand-generation-playbook',
  seo: 'b2b-demand-generation-playbook',
  'aeo-geo': 'b2b-demand-generation-playbook',
  performance: 'b2b-demand-generation-playbook',
  'paid-media': 'b2b-demand-generation-playbook',
  revops: 'gtm-engineering-blueprint',
  'data-analytics': 'gtm-engineering-blueprint',
  'product-marketing': 'gtm-engineering-blueprint',
};

/**
 * Keyword rules. Ordered: the first match wins, so the more specific patterns
 * come first. `label` is the strongest signal (an article title, a glossary
 * term name); the full text is only consulted as a rescue for content whose
 * category is not mapped below.
 */
const KEYWORD_RULES: Array<{ id: LeadMagnetId; pattern: RegExp }> = [
  { id: 'gtm-engineering-blueprint', pattern: /gtm engineering|revenue operations|revops|go-to-market system|systems architecture|data plumbing|lead routing|orchestration/i },
  { id: 'marketing-automation-maturity-assessment', pattern: /marketing automation|lifecycle|nurture sequence|lead scoring|email automation|workflow/i },
  { id: 'b2b-demand-generation-playbook', pattern: /demand generation|lead generation|pipeline generation|buying signal|outbound|account-based|\babm\b/i },
  { id: 'gtm-stack-builder-template', pattern: /martech|tech stack|technology stack|tool stack|marketing stack|data stack/i },
];

export interface ResolveLeadMagnetInput {
  context: LeadMagnetContext;
  /** Article or glossary category, when the content has one. */
  category?: string;
  /** Primary label: an article title or a glossary term name. Strongest signal. */
  label?: string;
  /** Full text (title + thesis, or term + definition). Used only as a rescue. */
  text?: string;
}

function matchKeywordRules(haystack?: string): LeadMagnet | null {
  if (!haystack) return null;
  for (const rule of KEYWORD_RULES) {
    if (rule.pattern.test(haystack)) return leadMagnets[rule.id];
  }
  return null;
}

/**
 * Deterministic lead-magnet resolution.
 *
 * Tools always point at the stack builder; homepage, hub and footer pages fall
 * back to the newsletter itself; content resolves by category, then by keyword.
 * Every branch returns a real lead magnet, so a placement can never render an
 * empty or broken block.
 */
export function resolveLeadMagnet({ context, category, label, text }: ResolveLeadMagnetInput): LeadMagnet {
  if (context === 'tool') return leadMagnets['gtm-stack-builder-template'];
  if (context === 'homepage' || context === 'hub' || context === 'footer' || context === 'other') {
    return leadMagnets[GENERIC_LEAD_MAGNET_ID];
  }

  // 1. The label (article title / term name) is a stronger statement of subject
  //    than the category, so it wins outright.
  const labelMatch = matchKeywordRules(label);
  if (labelMatch) return labelMatch;

  // 2. Otherwise the category decides, which is how the brief maps its magnet list.
  if (category && CATEGORY_MAP[category]) return leadMagnets[CATEGORY_MAP[category]];

  // 3. Rescue: unmapped content can still be routed by its body text.
  const textMatch = matchKeywordRules(text);
  if (textMatch) return textMatch;

  // 4. Newsletter fallback — content with no better match still converts.
  return leadMagnets[GENERIC_LEAD_MAGNET_ID];
}

/** Convenience wrapper for article pages. */
export function resolveArticleLeadMagnet(article: { category: string; title: string; thesis: string }): LeadMagnet {
  return resolveLeadMagnet({
    context: 'article',
    category: article.category,
    label: article.title,
    text: `${article.title} ${article.thesis}`,
  });
}

/** Convenience wrapper for glossary term pages. */
export function resolveGlossaryLeadMagnet(term: { category: string; term: string; shortDefinition?: string }): LeadMagnet {
  return resolveLeadMagnet({
    context: 'glossary-term',
    category: term.category,
    label: term.term,
    text: `${term.term} ${term.shortDefinition ?? ''}`,
  });
}
