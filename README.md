# GTM Engine

Source for **subhasishadhikary.com** — a personal site and GTM (go-to-market) platform.

## Stack

- **Frontend:** Vite + React 19 + TypeScript + Tailwind CSS 4
- **CMS:** Sanity Studio v6 (`sanity.config.ts`, project `0uqx6fxe` / dataset `production`)
- **Hosting:** Vercel

## Layout

| Path | Contents |
| --- | --- |
| `src/pages` | Routed pages (home, about, work, thinking, tools, glossary, credentials) |
| `src/components` | Shared UI, SEO head management, layout |
| `src/pages/gtm-engine` | GTM Intelligence Engine (multi-step tool) |
| `src/data` | Glossary, articles, case studies, GTM stacks, benchmarks |
| `src/sanity` | Sanity schema types |
| `scripts` | Article generation, prerender, featured-image generation |
| `public` | Static assets, `llms.txt`, `sitemap.xml`, `robots.txt` |

## Commands

```bash
npm run dev        # local dev server
npm run build      # full production build: articles -> Sanity Studio -> Vite -> prerender
npm run typecheck  # tsc --noEmit
```

## Deployment

Vercel builds from `main`. The apex domain serves the site; `cms.subhasishadhikary.com`
serves the Sanity Studio from the same deployment, routed by `middleware.ts`.

## Newsletter (Kit)

Newsletter signup — **The GTM Systems Brief** — is implemented natively: the React
component posts subscriber details to the server-side `POST /api/subscribe`
function, and only that function talks to Kit. The API key is never sent to the
browser, bundled into client JavaScript, or committed to the repository.

Required environment variable — set it on the Vercel project (Production, Preview
and Development) and redeploy:

| Variable | Required | Purpose |
| --- | --- | --- |
| `KIT_API_KEY` | yes | Kit v4 API key (`https://api.kit.com/v4`). Server-side only. |
| `KIT_FORM_ID` | no | Kit form id. Defaults to `9947751` ("Newsletter site"). |
| `KIT_TAG_ID` | no | Optional Kit tag applied to every subscriber. |

`source_page` is the **pathname of the page the visitor was on when they pressed
submit** (e.g. `/glossary/gtm-engineering`), read from `window.location` inside
the submit handler — never `document.referrer` and never a stored first-touch
page. `/api/subscribe` validates it as a site-relative path; the placement label
used for element ids and analytics is deliberately not accepted as a fallback, so
a wrong value cannot be stored silently.

Endpoint contract:

```
POST /api/subscribe
  { email, firstName?, source, leadMagnet, utmSource, utmMedium, utmCampaign }
-> { ok: true, duplicate: boolean }
-> { ok: false, error: "invalid_email" | "invalid_body" | "rate_limited" | "upstream_error" | "not_configured" }
```

Subscribers are stored with the Kit custom fields `source_page`, `lead_magnet`,
`utm_source`, `utm_medium` and `utm_campaign`, so the list can be segmented by
acquisition source and lead magnet.

`vite dev` does not run Vercel functions on its own. `vite.config.js` mounts a
**dev-only** middleware that serves the real handler at `/api/subscribe`; copy
`.env.example` to a gitignored `.env.local` to use it locally.


### Lead magnets

The same infrastructure doubles as a reusable lead-magnet system: one component,
six canonical magnets (`b2b-gtm-audit-checklist`, `gtm-engineering-blueprint`,
`marketing-automation-maturity-assessment`, `b2b-demand-generation-playbook`,
`gtm-stack-builder-template`, `gtm-systems-brief`), resolved per page from the
content's category and title. See `LEAD_MAGNET_SYSTEM.md`.

Analytics events: `newsletter_signup`, plus `lead_magnet_view` /
`lead_magnet_submit` for specific magnets and `lead_magnet_download` for real
downloadable artifacts. No event carries subscriber PII.

Verification:

```bash
node scripts/test-subscribe.mjs                     # offline guard-rail checks, no secret needed
KIT_API_KEY=REPLACE_WITH_KEY node scripts/test-subscribe.mjs --live --email=you@example.com
node scripts/verify-newsletter-browser.mjs          # real browser check (dev server)
node scripts/verify-newsletter-browser.mjs --dist   # same checks against the built, prerendered output
node scripts/verify-production.mjs --local-dist     # post-deploy check, dry run against dist/
node scripts/verify-source-page.mjs --local-dist   # submit-page attribution matrix
```

### Post-deployment verification

After the environment variables are set and the site is redeployed:

```bash
KIT_API_KEY=REPLACE_WITH_KEY node scripts/verify-production.mjs \
  --url https://subhasishadhikary.com --live --email=you@example.com
```

Read-only by default: it checks that `/api/subscribe` exists, validates input,
leaks no credential, that no secret appears in the deployed HTML or JS, and that
the newsletter block renders exactly once per page. `--live` additionally
performs one real signup and verifies Kit form membership plus the persisted
custom fields.
