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
