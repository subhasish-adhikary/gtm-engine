/**
 * Shared copy and configuration for the newsletter ("The GTM Systems Brief")
 * and the placement-level defaults used across the site.
 *
 * Lead-magnet content lives in `leadMagnets.ts`; this module holds the copy that
 * every placement shares.
 */

import { leadMagnets } from './leadMagnets';

export type NewsletterVariant = 'section' | 'compact';

/**
 * Derived from the lead-magnet registry so the generic brief has exactly one
 * source of truth. `newsletter.ts` depends on `leadMagnets.ts` and never the
 * other way round (avoids a circular import).
 */
const brief = leadMagnets['gtm-systems-brief'];

export const newsletterConfig = {
  /** Newsletter name. Never replace this with generic "Subscribe to my newsletter" copy. */
  name: brief.title,
  eyebrow: 'Newsletter',
  /** Positioning line used under the heading. */
  description: brief.description,
  topics: ['B2B growth', 'GTM engineering', 'Marketing automation', 'AI marketing', 'GTM systems', 'Tools and experiments'],
  cta: brief.cta,
  submitting: 'Adding you…',
  emailLabel: 'Email address',
  emailPlaceholder: 'you@company.com',
  firstNameLabel: 'First name',
  firstNamePlaceholder: 'Optional',
  privacyNote: 'No spam. Unsubscribe any time.',
  successMessage: "You're in. The next GTM Systems Brief lands in your inbox.",
  duplicateMessage: "You're already on the list — nothing else needed.",
  errorMessage: 'Something went wrong on our end. Please try again in a moment.',
  invalidEmailMessage: 'Enter a valid email address.',
  topicSummary: 'Covering B2B growth, GTM engineering, marketing automation and AI marketing.',
} as const;

/**
 * Placements whose lead magnet is fixed rather than content-derived.
 *
 * `leadMagnet` values are limited to the canonical ids in `leadMagnets.ts`, so
 * Kit segmentation stays clean; the page context travels in `source`.
 */
export const newsletterPlacements = {
  homepage: {
    source: 'homepage',
    leadMagnet: leadMagnets['gtm-systems-brief'].id,
    heading: leadMagnets['gtm-systems-brief'].title,
    description: leadMagnets['gtm-systems-brief'].description,
    cta: leadMagnets['gtm-systems-brief'].cta,
  },
  thinkingHub: {
    source: 'thinking-hub',
    leadMagnet: leadMagnets['gtm-systems-brief'].id,
    heading: 'Get the thinking, in your inbox',
    description:
      'The GTM Systems Brief turns the research on this page into a short, practical email for B2B operators.',
    cta: newsletterConfig.cta,
  },
  glossaryHub: {
    source: 'glossary-hub',
    leadMagnet: leadMagnets['gtm-systems-brief'].id,
    heading: 'New terms, explained as they appear',
    description:
      'The GTM Systems Brief tracks the vocabulary behind modern B2B growth, GTM engineering and AI marketing.',
    cta: newsletterConfig.cta,
  },
  toolsHub: {
    source: 'tools-hub',
    leadMagnet: leadMagnets['gtm-stack-builder-template'].id,
    heading: leadMagnets['gtm-stack-builder-template'].title,
    description: leadMagnets['gtm-stack-builder-template'].description,
    cta: leadMagnets['gtm-stack-builder-template'].cta,
  },
  footer: {
    source: 'footer',
    leadMagnet: leadMagnets['gtm-systems-brief'].id,
    heading: leadMagnets['gtm-systems-brief'].title,
    description: newsletterConfig.topicSummary,
    cta: newsletterConfig.cta,
  },
} as const;
