# Kit (ConvertKit) Newsletter Integration

Implementation and verification record for **The GTM Systems Brief** newsletter
signup on subhasishadhikary.com.

Date: 2026-09-22 · Repo: `gtm-engine` · Status: implemented, verified locally, **not pushed / not deployed**

---

## 1. Architecture

```
NewsletterSignup (React, client)
   │  POST /api/subscribe  { email, firstName?, source, leadMagnet, utm* }
   ▼
api/subscribe.ts  (Vercel Node serverless function)
   │  X-Kit-Api-Key: $KIT_API_KEY      ← server-side only
   ├─ 1. GET  /v4/subscribers?email_address=…      duplicate pre-check (best effort)
   ├─ 2. POST /v4/subscribers                     create/update + custom fields  (201 new / 200 existing)
   ├─ 3. POST /v4/forms/9947751/subscribers       newsletter form membership
   └─ 4. POST /v4/tags/{KIT_TAG_ID}/subscribers   optional, only when configured
   ▼
Kit (formerly ConvertKit)
```

The browser never receives a Kit credential. There is no Kit embed `<script>`
anywhere in the app — the form is a native React component, so it can be mounted
on many pages without loading duplicate scripts.

## 2. Files

### Added

| File | Purpose |
| --- | --- |
| `api/subscribe.ts` | Serverless endpoint; the only place the Kit key is read. Zod-free, dependency-free, self-contained. |
| `src/components/NewsletterSignup.tsx` | Reusable form: `section` / `compact` variants, loading/success/duplicate/error states, client validation, UTM capture, analytics event. |
| `src/data/newsletter.ts` | Single source of truth for positioning copy, labels, state messages and per-placement defaults. |
| `scripts/test-subscribe.mjs` | Endpoint harness: offline guard rails + live Kit checks with `--expect=new` / `--expect=duplicate`. |
| `scripts/verify-newsletter-browser.mjs` | Playwright interaction check; `--dist` mode runs against the built, prerendered output. |
| `.env.example` | Documented, secret-free environment template. |
| `KIT_NEWSLETTER_INTEGRATION.md` | This record. |

### Changed

| File | Change |
| --- | --- |
| `.gitignore` | Ignore `.env`, `.env.*`, `.vercel` (keep `.env.example`). |
| `vite.config.js` | Dev-only plugin mounting the real handler at `POST /api/subscribe` (`apply: "serve"`); mirrors local `.env*` into `process.env` for the handler. |
| `README.md` | "Newsletter (Kit)" section: env vars, endpoint contract, local dev, verification commands. |
| `src/components/Layout.tsx` | Newsletter `compact` strip in the footer (every page). |
| `src/pages/HomePage.tsx` | `section` block above the final CTA. |
| `src/pages/ThinkingPages.tsx` | `section` block on the Thinking hub and on each article page (after the existing contextual tools CTA, which stays primary). |
| `src/pages/GlossaryPage.tsx` | `section` block after "About This Glossary". |
| `src/pages/GlossaryTermPage.tsx` | `section` block after the author bio. |
| `src/pages/ToolsPages.tsx` | `section` block on the Tools hub and on every tool page. |

Diffstat: 9 files changed, 191 insertions(+), 3 deletions(-) plus the 7 added files.

## 3. Kit configuration used (verified, not invented)

| Item | Value |
| --- | --- |
| API base | `https://api.kit.com/v4` (the legacy `api.convertkit.com/v3` host rejects this key with 401) |
| Auth header | `X-Kit-Api-Key` |
| Account | id `2910873`, "Subhasish Adhikary" |
| Newsletter form | **id `9947751`** — "Newsletter site" (`embed_js` `https://subhasish-adhikary.kit.com/b65fbe75b0/index.js`); this embed is the reference the brief points at |
| Custom fields | `source_page`, `lead_magnet`, `utm_source`, `utm_medium`, `utm_campaign` — already provisioned in the account |

Other forms in the account ("Pine form" `9947776`, "Creator Network" `9947767`)
are untouched.

## 4. Endpoint contract

```
POST /api/subscribe
body: { email, firstName?, source, leadMagnet, utmSource, utmMedium, utmCampaign }
200  { ok: true, duplicate: boolean }
400  { ok: false, error: "invalid_email" | "invalid_body" }
405  { ok: false, error: "method_not_allowed" }        (Allow: POST)
429  { ok: false, error: "rate_limited" }              (Retry-After: 600)
500  { ok: false, error: "not_configured" }            (KIT_API_KEY missing)
502  { ok: false, error: "upstream_error" }            (Kit failure — no upstream detail leaked)
```

All responses are `Cache-Control: no-store`. Requests are rate limited to 8 per
10 minutes per client IP (best effort, per serverless instance). Optional fields
are trimmed, control characters stripped, and length-capped.

## 5. Lead-magnet mapping

| Placement | `source` | `lead_magnet` |
| --- | --- | --- |
| Homepage | `homepage` | `gtm-systems-brief` |
| Thinking hub | `thinking-hub` | `thinking-brief` |
| Article page | `article` | `article:<article id>` |
| Glossary hub | `glossary-hub` | `new-age-marketing-glossary` |
| Glossary term | `glossary-term` | `glossary:<slug>` |
| Tools hub | `tools-hub` | `gtm-toolkit` |
| Tool page | `tool-page` | `tool:<toolId>` |
| Footer strip | `footer` | `site-footer` |

## 6. Verification results

### Offline guard rails — `node scripts/test-subscribe.mjs`

PASS (0 failures): GET → 405 with `Allow: POST`; malformed JSON → 400
`invalid_body`; invalid email → 400 `invalid_email`; over-long email → 400;
missing `KIT_API_KEY` → 500 `not_configured`; error bodies contain no key material.

### Live Kit round trip — `scripts/test-subscribe.mjs --live`

| Run | Address | Result |
| --- | --- | --- |
| A | `logicalnerds+autoclaw-final2@aol.com` `--expect=new` | `200 {"ok":true,"duplicate":false}`; subscriber id `4306326259`; in form `9947751`; fields persisted |
| B | same address `--expect=duplicate` | `200 {"ok":true,"duplicate":true}`; same subscriber id |

Fields read back from `GET /v4/subscribers/4306326259`:
`{"lead_magnet":"kit-integration-check","source_page":"verification-harness","utm_campaign":"verification","utm_medium":"cli","utm_source":"harness"}`

### Browser interaction — `scripts/verify-newsletter-browser.mjs`

| Mode | Result |
| --- | --- |
| `--dist` (built output, prerendered pages + hydration) | **PASS — 30 assertions, 0 failures** |
| dev (Vite dev server + dev middleware) | **PASS — 28 assertions, 0 failures** |

Covered: correct positioning copy and non-generic CTA; inline validation with no
network request; real POST reaching the Kit API; success/duplicate state rendered
in page with no navigation; exactly one block on homepage, thinking hub, glossary
hub, glossary term, tools hub and article pages; footer strip on every page; an
intercepted 502 producing an inline error while keeping the form usable; no
hydration or React console errors; no failed requests; and the analytics event:

```
[["event",{"name":"newsletter_signup","data":{"source":"homepage","lead_magnet":"gtm-systems-brief","duplicate":true}}]]
```

### Build and secret-leak checks

- `npm run typecheck` → exit 0.
- `npm run build` → success; prerender generated the unchanged route set
  (9 core, 3 category hubs, 10 tool pages, 222 glossary terms, 19 articles,
  8 case studies, branded 404); 271 HTML files in `dist/`.
- grep for the API key literal over the repo (excluding `node_modules`, `.git`, `dist`) → **0 matches**.
- grep for the API key literal across `dist/` → **0 matches**.
- `api.kit.com` occurrences in `dist/assets/*.js` → **0**.
- `KIT_API_KEY` occurrences in `dist/assets/*.js` → **0**.
- `subhasish-adhikary.kit.com` (Kit embed script) in the client bundle → **0**.
- The key is read only via `process.env` inside `api/subscribe.ts`.

## 7. Platform behaviours discovered (affect future work)

1. **`POST /v4/subscribers` returns `201` for a new subscriber and `200` for an
   address that already exists.** This is the authoritative duplicate signal.
2. **`GET /v4/subscribers?email_address=…` is eventually consistent** — a
   just-created subscriber can stay invisible for well over 20 seconds. Never use
   it as the only duplicate check.
3. **The subscriber *search* endpoint returns `fields: null`**, while
   `GET /v4/subscribers/{id}` returns the real custom-field values.
4. **`GET /v4/forms/{form_id}/subscribers` reflects new memberships
   immediately** — used by the harness to locate a fresh subscriber.
5. The subscriber search query rejects an unencoded `+` in the address
   (`422 invalid email address`); always `encodeURIComponent` it.
6. Re-subscribing an existing address **overwrites** the custom fields with the
   latest values (last-touch attribution).

## 8. Remaining steps (require the repo owner)

1. Set `KIT_API_KEY` on the Vercel project for **Production, Preview and
   Development**, then redeploy. `KIT_FORM_ID` and `KIT_TAG_ID` are optional.
2. Push the branch/commit to trigger the deploy (nothing was committed or pushed
   by this work).
3. For local development, copy `.env.example` to `.env.local` (gitignored).
4. Optionally remove the verification subscribers created during testing:
   `logicalnerds+autoclaw-signup-test@aol.com`, `logicalnerds+autoclaw-dedupe@aol.com`,
   `logicalnerds+autoclaw-final@aol.com`, `logicalnerds+autoclaw-final2@aol.com`,
   `logicalnerds+autoclaw-ui-test@aol.com`, `logicalnerds+autoclaw-devtest@aol.com`,
   `logicalnerds+autoclaw-fieldprobe2@aol.com`, `logicalnerds+autoclaw-dup-probe@aol.com`
   (plus the two pre-existing `+autoclaw-test` / `+autoclaw-fields` probes).

## 9. Known limitations

- The rate limiter is per serverless instance and in-memory; it dampens bursts
  but is not a global guarantee.
- Duplicate detection depends on Kit's `200`-vs-`201` create semantics; if Kit
  changes that contract, `duplicate` degrades to `false` while signup still
  succeeds.
- The Kit tag step is only active when `KIT_TAG_ID` is configured (no tag exists
  in the account yet).


---

## 10. Extension (2026-09-22): lead-magnet system

The verified newsletter implementation was extended into a reusable lead-magnet
system without replacing it: same `/api/subscribe`, same Kit form `9947751`, same
component, native React, credential server-side. Six canonical magnets are now
resolved per page from content category and title. Full detail in
[`LEAD_MAGNET_SYSTEM.md`](./LEAD_MAGNET_SYSTEM.md).

New files: `src/data/leadMagnets.ts`, `scripts/lib/dist-server.mjs`,
`scripts/verify-production.mjs`, `LEAD_MAGNET_SYSTEM.md`.
New events: `lead_magnet_view`, `lead_magnet_submit`, `lead_magnet_download`
(the last is wired but dormant — no downloadable artifact exists yet).

Extension verification: `typecheck` exit 0 · `npm run build` success, prerender
route set unchanged · browser check 47/47 (dev) and 49/49 (built output) ·
`verify-production.mjs --local-dist` 23/23 · live Kit new -> duplicate both PASS ·
zero key material in source, `dist/`, or the client bundle (including
`KIT_FORM_ID` and the form id itself).

### Pre-existing finding: React hydration mismatch

The built output logs React error **#418** on prerendered pages because
`scripts/prerender.mjs` wraps page content in `main.prerendered-content` inside
`#root`, while the client root renders the full `Layout`. React recovers and
client-renders, so the page works. **This predates the newsletter work** —
verified by stashing the change set and re-running the same probe at `HEAD`,
where the identical error appears. Fixing it would mean changing the prerender
strategy, which is out of scope here.


---

## 11. Attribution fix (2026-09-22): source_page is the submit-page pathname

`source_page` previously stored a static placement label (`homepage`, `article`,
`footer`), which does not answer "which page did this visitor submit from?".

- The component now reads `window.location.pathname` inside the submit handler,
  normalises it (drops any query string or fragment, collapses duplicate slashes,
  trims a trailing slash except for the root) and sends it as `sourcePage`.
  `document.referrer` and first-touch values are not used.
- `/api/subscribe` validates `source_page` as a site-relative pathname and no
  longer accepts the placement label as a fallback, so a wrong value cannot be
  stored silently. `lead_magnet` and the single Kit form `9947751` are unchanged.
- New `scripts/verify-source-page.mjs` runs the attribution matrix (six surfaces,
  internal navigation, two forms on one page, duplicate, mobile/desktop) and
  compares the captured payload with the Kit read-back. It waits out the
  endpoint's 8-per-10-minutes rate limit window rather than misreading a 429.

Production results are recorded in the deployment report under `DELIVERY/`.
