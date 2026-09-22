# Lead Magnet System

The newsletter infrastructure (Kit + `POST /api/subscribe`) doubles as a reusable
lead-magnet system. One component, one endpoint, one Kit form — many magnets.

Added: 2026-09-22 · Repo: `gtm-engine` · Status: implemented, verified locally, **not deployed**

---

## 1. Principle

```
LeadMagnet (data)  →  resolveLeadMagnet()  →  <NewsletterSignup />  →  POST /api/subscribe  →  Kit
```

- **No separate Kit form per lead magnet.** The magnet id is stored in the existing
  `lead_magnet` custom field, alongside `source_page` and the UTM fields.
- **No raw Kit embed.** The component is native React; the credential stays server-side.
- **No fake downloads.** A magnet whose artifact does not exist yet renders no link
  at all. Subscription is the conversion mechanism until the artifact ships.

## 2. Data structure

`src/data/leadMagnets.ts` is a leaf module (no imports) so there is no circular
dependency with `src/data/newsletter.ts`, which derives its generic brief copy
from it.

```ts
interface LeadMagnet {
  id: LeadMagnetId;              // stored in Kit's `lead_magnet` custom field
  title: string;                 // block heading
  description: string;           // block description
  cta: string;                   // submit button label
  resource: LeadMagnetResource | null;  // null = nothing to link yet
  availability?: string;         // honest status line when there is no artifact
}
```

`resource.kind` is `'internal'` for an on-site destination and `'external'` for a
real downloadable artifact. **Only `'external'` emits `lead_magnet_download`.**

## 3. Canonical magnets

| id | Title | Context | Artifact |
| --- | --- | --- | --- |
| `b2b-gtm-audit-checklist` | The B2B GTM Audit Checklist | B2B GTM content | pending |
| `gtm-engineering-blueprint` | The GTM Engineering Blueprint | GTM engineering | pending |
| `marketing-automation-maturity-assessment` | The Marketing Automation Maturity Assessment | Marketing automation | pending |
| `b2b-demand-generation-playbook` | The B2B Demand Generation Playbook | Demand generation | pending |
| `gtm-stack-builder-template` | The GTM Stack Builder | Tools | `/tools/stack-builder` (exists) |
| `gtm-systems-brief` | The GTM Systems Brief | Homepage / fallback | the newsletter itself |

Placements may only use these ids — the browser check asserts it, so segmentation
in Kit cannot drift.

## 4. Resolution rules

`resolveLeadMagnet({ context, category, label, text })`, evaluated in order:

1. **Context override** — `tool` → stack builder; `homepage` / `hub` / `footer` / `other` → the brief.
2. **Label match** — the article title or glossary term name is a stronger statement of
   subject than the category, so a keyword match there wins. This is what routes the
   glossary term *Marketing Automation* to the assessment rather than to a neighbouring magnet.
3. **Category map** — article and glossary categories map to magnets, following the brief's
   mapping table.
4. **Text rescue** — content with an unmapped category can still be routed by its body text.
5. **Fallback** — the GTM Systems Brief, so a placement is never empty.

Current routing across the real content set (verified):

| Content | Result |
| --- | --- |
| 19 articles | 7 automation · 6 GTM checklist · 5 blueprint · 1 demand-gen |
| 222 glossary terms | 114 demand-gen · 67 blueprint · 15 GTM checklist · 14 automation · 12 fallback |
| 10 tool pages | stack builder |
| Homepage, thinking hub, glossary hub, footer | GTM Systems Brief |

Spot checks: *Marketing Automation* → assessment · *GTM Engineering* → blueprint ·
*Demand Generation* → playbook · *RevOps* → blueprint · *Go-to-Market Strategy* → checklist.

## 5. Component API

`<NewsletterSignup />` is driven entirely by props, so a new magnet needs no new
component:

| Prop | Purpose |
| --- | --- |
| `source` | acquisition page (`homepage`, `article`, `glossary-term`, `tool-page`, `footer`, …) |
| `leadMagnet` | canonical magnet id stored in Kit |
| `heading` / `description` / `cta` | contextual copy |
| `eyebrow` | small label above the heading |
| `resource` | real destination, or `null` |
| `availability` | status line for a pending artifact |
| `contextNote` | one line of page-specific positioning |
| `variant` | `section` (full block) or `compact` (footer strip) |
| `showFirstName` / `showTopics` | layout switches |

## 6. Analytics events

| Event | Fires when | Properties |
| --- | --- | --- |
| `newsletter_signup` | any successful submit | `source`, `lead_magnet`, `duplicate` |
| `lead_magnet_view` | a **specific** magnet block mounts (once per mount) | `lead_magnet`, `source` |
| `lead_magnet_submit` | a successful submit on a specific magnet | `lead_magnet`, `source`, `duplicate` |
| `lead_magnet_download` | a click on an `external` resource | `lead_magnet`, `source`, `destination` |

The generic GTM Systems Brief placement deliberately emits only
`newsletter_signup` — it is the site-wide fallback, so counting it as a
lead-magnet impression would inflate the numbers.

**No event ever carries an email address or other PII.** `lead_magnet_download`
is wired but currently dormant, because no downloadable artifact exists yet.

## 7. Adding a magnet

1. Add an entry to `leadMagnets` in `src/data/leadMagnets.ts` (with `resource: null`
   until the artifact exists).
2. Route to it: extend `CATEGORY_MAP` or `KEYWORD_RULES`.
3. If it should own a fixed placement, add it to `newsletterPlacements` in
   `src/data/newsletter.ts`.
4. When the artifact ships, set `resource: { label, url, kind: 'external' }` — the
   component starts rendering the link and emitting `lead_magnet_download` with no
   further changes.
5. Re-run `node scripts/verify-newsletter-browser.mjs --dist`; the magnet ids and
   destinations are asserted automatically.

## 8. Guard rails enforced by the verification suite

- Every block on a page declares a canonical magnet id.
- No page renders two competing magnet blocks (one full block plus the footer strip).
- No block renders a download link for a pending artifact.
- Every internal CTA destination inside a block resolves (HTTP < 400).
- The generic fallback emits no lead-magnet events.
- The submitted payload carries the resolved magnet id and the page source.
