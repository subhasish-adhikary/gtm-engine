import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Atom, FileCode2, Zap, Palette, Database, Cloud, GitBranch, Tag, Bot, Workflow, X } from 'lucide-react';

/*
 * Section 4 — Explore This Website.
 * An explorable map of how this actual site works. Every node below was
 * verified against the repository (package.json, index.html, vercel.json,
 * scripts/, src/sanity/) — nothing is invented.
 */

interface ArchNode {
  id: string;
  label: string;
  icon: typeof Atom;
  x: number; y: number; // percentage positions on the map
  what: string;
  why: string;
  connects: string;
}

// Positions assume a ~700x420 viewBox, percentage-based.
const NODES: ArchNode[] = [
  {
    id: 'sanity', label: 'Sanity CMS', icon: Database, x: 12, y: 18,
    what: 'Headless content platform. Articles are authored as structured Portable Text in a Sanity Studio (v6), deployed at cms.subhasishadhikary.com.',
    why: 'Content lives apart from code, so publishing never touches a deploy — and the Thinking archive scales without engineering work.',
    connects: 'Feeds the build: a generation script pulls Sanity content into typed article data used by the Thinking pages and the prerender step.'
  },
  {
    id: 'react', label: 'React 19', icon: Atom, x: 40, y: 18,
    what: 'The UI library every page on this site is built with, including this one.',
    why: 'One component system powers the design — cards, sections, tools — so every page behaves consistently.',
    connects: 'TypeScript components in src/ render every route; interactive pieces like this map are React components.'
  },
  {
    id: 'typescript', label: 'TypeScript', icon: FileCode2, x: 40, y: 50,
    what: 'Every component and data structure on the site is typed.',
    why: 'The content model, tool logic and schemas are checked at compile time — errors surface before shipping, not in the browser.',
    connects: 'Types describe articles, glossary terms and tool inputs end-to-end, from CMS data to rendered page.'
  },
  {
    id: 'vite', label: 'Vite', icon: Zap, x: 66, y: 18,
    what: 'The build tool that bundles and optimizes the site for production.',
    why: 'Fast builds and code-splitting — heavy interactive sections (like this Lab page) load only when needed.',
    connects: 'Produces the optimized assets that the prerender step turns into static HTML per route.'
  },
  {
    id: 'tailwind', label: 'Tailwind CSS 4', icon: Palette, x: 66, y: 50,
    what: 'The styling system behind the site\'s typography, spacing and responsive behavior.',
    why: 'This Lab page reuses the site\'s exact visual language — same spacing scale, same colors, same breakpoints.',
    connects: 'Theme variables (—accent, —card-bg, …) drive both light and dark modes across every page.'
  },
  {
    id: 'prerender', label: 'Prerender pipeline', icon: Workflow, x: 12, y: 50,
    what: 'A Node build pass (scripts/prerender.mjs) that emits static HTML per route, with metadata and structured data baked in — plus a self-healing sitemap.',
    why: 'Visitors and crawlers get complete HTML instantly, while the React app hydrates only what needs interactivity.',
    connects: 'Consumes Vite output + generated article data; this is the step that gives /lab its prerendered page.'
  },
  {
    id: 'gtm', label: 'Google Tag Manager', icon: Tag, x: 12, y: 82,
    what: 'Tag management container (GTM-WLNB3S5S) loaded via the site template.',
    why: 'Measurement is configured without code changes — tags are managed in the container, not hardcoded per page.',
    connects: 'The single measurement insertion point for the whole site, wired in index.html.'
  },
  {
    id: 'github', label: 'GitHub', icon: GitBranch, x: 40, y: 82,
    what: 'The repository (gtm-engine) that versions every line of this site.',
    why: 'Every change — including this page — is a reviewed commit with a history you can audit.',
    connects: 'Deploys to Vercel are driven from the repository\'s main branch.'
  },
  {
    id: 'vercel', label: 'Vercel', icon: Cloud, x: 66, y: 82,
    what: 'Hosting and edge delivery, configured in vercel.json: clean URLs, canonical domain redirects, long-cache static assets, and the Sanity Studio at the cms subdomain.',
    why: 'Static-first delivery is fast by default; redirects and caching are enforced at the edge.',
    connects: 'Serves the prerendered HTML and the hydrated React app; points cms.* at the embedded Studio.'
  },
  {
    id: 'ai', label: 'AI coding agents', icon: Bot, x: 88, y: 50,
    what: 'This site is built and maintained with AI coding agents (Claude Code) working from typed specs, under my review on every commit.',
    why: 'Agent-assisted development is part of the methodology this Lab demonstrates — the git history is the evidence.',
    connects: 'Agents draft code, scripts and validations; I direct, review and merge. No change ships unreviewed.'
  },
];

const EDGES: [string, string][] = [
  ['sanity', 'react'],
  ['sanity', 'prerender'],
  ['react', 'typescript'],
  ['react', 'vite'],
  ['react', 'tailwind'],
  ['vite', 'prerender'],
  ['prerender', 'vercel'],
  ['github', 'vercel'],
  ['github', 'ai'],
  ['ai', 'react'],
  ['gtm', 'vercel'],
];

const nodeById = Object.fromEntries(NODES.map(n => [n.id, n]));

export default function SiteArchitecture() {
  const reducedMotion = useReducedMotion();
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div>
      <div
        className="relative rounded-xl border overflow-hidden"
        style={{ borderColor: 'var(--border-color)', backgroundColor: 'var(--bg-secondary)' }}
        role="group"
        aria-label="Website architecture map"
      >
        <div aria-hidden className="absolute inset-0 opacity-60" style={{
          backgroundImage: 'radial-gradient(circle, var(--border-color) 1px, transparent 1px)',
          backgroundSize: '22px 22px'
        }} />
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden>
          {EDGES.map(([a, b], i) => {
            const na = nodeById[a], nb = nodeById[b];
            const active = selected === a || selected === b;
            return (
              <line
                key={i}
                x1={na.x} y1={na.y} x2={nb.x} y2={nb.y}
                stroke={active ? 'var(--accent)' : 'var(--text-tertiary)'}
                strokeWidth={active ? 0.5 : 0.25}
                opacity={selected && !active ? 0.3 : 0.8}
                vectorEffect="non-scaling-stroke"
              />
            );
          })}
        </svg>

        {/* Node markers. Percentage positioned; a 940px-wide min scroll container
            keeps the map usable on phones. */}
        <div className="relative min-w-[560px] h-[30rem] sm:h-[34rem]">
          {NODES.map(node => {
            const NIcon = node.icon;
            const isSel = selected === node.id;
            return (
              <motion.button
                key={node.id}
                onClick={() => setSelected(isSel ? null : node.id)}
                whileHover={reducedMotion ? undefined : { scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                aria-pressed={isSel}
                className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-1 focus-visible:outline-2 focus-visible:outline-offset-4 rounded-lg p-1"
                style={{ left: `${node.x}%`, top: `${node.y}%` }}
                aria-label={`${node.label}. Activate for details.`}
              >
                <span
                  className="inline-flex items-center justify-center w-11 h-11 rounded-xl border shadow-sm"
                  style={{
                    backgroundColor: isSel ? 'var(--accent)' : 'var(--card-bg)',
                    borderColor: isSel ? 'var(--accent)' : 'var(--border-color)',
                    color: isSel ? '#fff' : 'var(--text-secondary)'
                  }}
                >
                  <NIcon size={20} aria-hidden />
                </span>
                <span className="text-[11px] font-medium px-1.5 py-0.5 rounded" style={{ color: 'var(--text-primary)', backgroundColor: 'var(--card-bg)', border: '1px solid var(--border-color)' }}>
                  {node.label}
                </span>
              </motion.button>
            );
          })}
        </div>
        <p className="absolute top-3 left-3 text-[11px] px-2 py-1 rounded" style={{ color: 'var(--text-tertiary)', backgroundColor: 'var(--card-bg)' }}>
          Tap any node to inspect it · verified from this repository
        </p>
      </div>

      {selected && nodeById[selected] && (
        <motion.div
          initial={reducedMotion ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 rounded-xl border p-5 relative"
          style={{ borderColor: 'var(--accent)', backgroundColor: 'var(--card-bg)' }}
          role="region"
          aria-label={`${nodeById[selected].label} details`}
        >
          <button onClick={() => setSelected(null)} className="absolute top-3 right-3 p-1.5 rounded-md border" style={{ borderColor: 'var(--border-color)', color: 'var(--text-secondary)' }} aria-label="Close details">
            <X size={14} aria-hidden />
          </button>
          <h4 className="font-semibold" style={{ color: 'var(--text-primary)' }}>{nodeById[selected].label}</h4>
          <dl className="mt-3 space-y-3 text-sm">
            <div><dt className="font-semibold text-xs uppercase tracking-wider" style={{ color: 'var(--text-tertiary)' }}>What it does</dt><dd style={{ color: 'var(--text-secondary)' }}>{nodeById[selected].what}</dd></div>
            <div><dt className="font-semibold text-xs uppercase tracking-wider" style={{ color: 'var(--text-tertiary)' }}>Why it exists</dt><dd style={{ color: 'var(--text-secondary)' }}>{nodeById[selected].why}</dd></div>
            <div><dt className="font-semibold text-xs uppercase tracking-wider" style={{ color: 'var(--text-tertiary)' }}>How it connects</dt><dd style={{ color: 'var(--text-secondary)' }}>{nodeById[selected].connects}</dd></div>
          </dl>
        </motion.div>
      )}
    </div>
  );
}
