import { Suspense, lazy, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, FlaskConical, ChevronDown, Wrench, Database, Bot, Workflow, LineChart, Megaphone, Hammer } from 'lucide-react';
import { Button, SectionHeader, Tag } from '../components/UI';

/*
 * /lab — an interactive digital laboratory showing how marketing strategy,
 * AI agents, automation, modern development tooling, CMS, APIs and
 * experimentation combine into working marketing systems.
 *
 * Heavy interactive sections are lazy-loaded so the hero and narrative render
 * immediately; each interactive block hydrates as it's scrolled to.
 */

const AgentCardDeck = lazy(() => import('../components/lab/AgentCardDeck'));
const GTMCanvas = lazy(() => import('../components/lab/GTMCanvas'));
const AssemblyLine = lazy(() => import('../components/lab/AssemblyLine'));
const SiteArchitecture = lazy(() => import('../components/lab/SiteArchitecture'));
const MarketingBuildSim = lazy(() => import('../components/lab/MarketingBuildSim'));

function LabFallback({ label }: { label: string }) {
  return (
    <div className="rounded-xl border border-dashed p-10 text-center text-sm" style={{ borderColor: 'var(--border-color)', color: 'var(--text-tertiary)' }} role="status">
      Loading {label}…
    </div>
  );
}

/* ---------- Build Log: only work verifiable from this repository ---------- */

const BUILD_LOG = [
  {
    name: 'Sanity-powered Thinking CMS',
    problem: 'Publishing research articles required code changes and deploys.',
    built: 'Headless CMS on Sanity v6 (Studio hosted at cms.subhasishadhikary.com) with typed Portable Text content, generated into the site at build time.',
    tech: 'Sanity, Portable Text, TypeScript, Node scripts',
    aiRole: 'Schemas and generation scripts drafted with AI coding agents; every article is written and verified by me.'
  },
  {
    name: 'Prerendered static pipeline + self-healing sitemap',
    problem: 'A client-rendered SPA was slow for visitors and opaque to crawlers.',
    built: 'A prerender pass that emits full static HTML per route with metadata and structured data baked in, plus a sitemap that adds new articles and drops unpublished ones automatically.',
    tech: 'Node, Vite output, JSON-LD schema generators',
    aiRole: 'Built and iterated with AI agents under commit-by-commit review; validation gates (types, build, sitemap) run on every change.'
  },
  {
    name: 'GTM Intelligence Engine',
    problem: 'GTM strategy advice is usually generic and unstructured.',
    built: 'An interactive engine: answer questions about your B2B business, get a readiness score, channel portfolio, budget scenarios and a 90-day plan — all client-side.',
    tech: 'React, TypeScript, decision-scoring model',
    aiRole: 'Framework encoded from my own strategy practice; agent-assisted implementation of the scoring and result views.'
  },
  {
    name: 'Interactive marketing tools',
    problem: 'Static content doesn\'t demonstrate systems thinking.',
    built: 'A /tools suite — budget lab, channel planner, GTM diagnostic, stack builder, automation planner and more — each encoding a real decision framework.',
    tech: 'React, TypeScript, zero backend',
    aiRole: 'Each tool\'s logic specified by me, implemented with AI-assisted drafting and reviewed per tool.'
  },
  {
    name: 'Featured-image + OG generation pipeline',
    problem: 'Consistent social cards across dozens of articles, by hand.',
    built: 'Build-time scripts that generate featured and Open Graph images at 1200×630 from article metadata.',
    tech: 'Node, canvas rendering, Vite build hooks',
    aiRole: 'Agent-drafted scripts; output audited per article batch.'
  },
  {
    name: 'This Lab page',
    problem: 'The methodology — strategy through AI agents to measurement — was invisible on the site.',
    built: 'The interactive laboratory you\'re in now: agent cards, GTM canvas, assembly line, architecture map and build simulator.',
    tech: 'React, TypeScript, framer-motion springs, lazy-loaded sections',
    aiRole: 'Designed and specified by me; built with AI coding agents with typed specs, validated with the standard QA list.'
  },
];

/* ---------- Toolbox: only technologies actually in this project ---------- */

const TOOLBOX = [
  {
    group: 'BUILD', icon: Hammer,
    tools: [
      { name: 'React 19', note: 'Every page, including this one.' },
      { name: 'TypeScript', note: 'Content model to components, checked at compile time.' },
      { name: 'Vite', note: 'Bundling and code-splitting; interactive sections lazy-load.' },
      { name: 'Tailwind CSS 4', note: 'The site\'s spacing, type and responsive system.' },
      { name: 'GitHub', note: 'gtm-engine repository — reviewed commits, auditable history.' },
      { name: 'Vercel', note: 'Edge hosting, clean URLs, CMS subdomain, cache policy.' },
    ]
  },
  {
    group: 'CONTENT', icon: Database,
    tools: [
      { name: 'Sanity v6', note: 'Headless CMS; Studio runs at cms.subhasishadhikary.com.' },
      { name: 'Portable Text', note: 'Structured articles — rendered by a typed renderer.' },
      { name: 'Prerender scripts', note: 'Static HTML per route from the Node build pass.' },
    ]
  },
  {
    group: 'AI', icon: Bot,
    tools: [
      { name: 'AI coding agents (Claude Code)', note: 'Build and maintain this site under my review — the git history shows it.' },
      { name: 'Agent workflows', note: 'Research → strategy → build → QA stages, specified and supervised.' },
    ]
  },
  {
    group: 'AUTOMATION', icon: Workflow,
    tools: [
      { name: 'Google Tag Manager', note: 'Container GTM-WLNB3S5S — measurement without code changes.' },
      { name: 'Build-time automation', note: 'Article generation, image generation, sitemap self-healing.' },
    ]
  },
  {
    group: 'ANALYTICS', icon: LineChart,
    tools: [
      { name: 'Tag-managed measurement', note: 'Configured in GTM against the site\'s privacy policy.' },
      { name: 'Build validation', note: 'Type checks, production builds, route and vitals checks on every change.' },
    ]
  },
  {
    group: 'MARKETING', icon: Megaphone,
    tools: [
      { name: 'GTM strategy frameworks', note: 'Encoded as interactive tools, not slide decks.' },
      { name: 'Content engine', note: 'This very site: research → CMS → prerender → measure.' },
    ]
  },
];

export function LabPage() {
  const reducedMotion = useReducedMotion();
  const [openToolbox, setOpenToolbox] = useState<string | null>('BUILD');
  const [openLog, setOpenLog] = useState<number | null>(0);

  const flow = ['Strategy', 'Research', 'AI Agents', 'Build', 'Automation', 'Measurement', 'Iteration'];

  return (
    <div>
      {/* 1 — HERO */}
      <section className="py-16 sm:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-fade-in-up">
            <div className="flex items-center gap-3 mb-6">
              <span className="inline-flex items-center justify-center w-10 h-10 rounded-lg border" style={{ borderColor: 'var(--border-color)', color: 'var(--accent)' }}>
                <FlaskConical size={20} aria-hidden />
              </span>
              <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--accent)' }}>AI-native marketing systems</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.05]" style={{ color: 'var(--text-primary)' }}>
              The Lab
            </h1>
            <p className="mt-4 text-xl sm:text-2xl font-medium" style={{ color: 'var(--text-secondary)' }}>
              Where marketing strategy becomes working systems.
            </p>
            <p className="mt-6 text-base leading-relaxed max-w-2xl" style={{ color: 'var(--text-secondary)' }}>
              I design, orchestrate and ship marketing systems — combining strategy, research, AI agents, automation and modern development tools into things that run. This page is a working demonstration of the method, built with the method.
            </p>

            {/* Pipeline flow */}
            <ol className="mt-8 flex flex-wrap items-center gap-x-2 gap-y-2" aria-label="Lab pipeline">
              {flow.map((step, i) => (
                <li key={step} className="flex items-center gap-2">
                  <span className="text-xs font-semibold px-3 py-1.5 rounded-md border" style={{ borderColor: 'var(--border-color)', color: i === 2 ? 'var(--accent)' : 'var(--text-secondary)', backgroundColor: i === 2 ? 'var(--bg-secondary)' : 'transparent' }}>
                    {step}
                  </span>
                  {i < flow.length - 1 && <span aria-hidden style={{ color: 'var(--text-tertiary)' }}>→</span>}
                </li>
              ))}
            </ol>

            <div className="mt-10 flex flex-wrap gap-3">
              <Button to="/work" size="lg">See the work <ArrowRight size={16} className="ml-2" /></Button>
              <Button to="/tools" variant="secondary" size="lg">Try the tools</Button>
            </div>
          </div>
        </div>
      </section>

      {/* 2 — AGENT ID CARDS */}
      <section className="py-14 border-t" style={{ borderColor: 'var(--border-color)' }} aria-labelledby="lab-agents">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="01 · Agents"
            title="AI agent ID cards"
            description="The six agent roles in my workflow. Each one has a job, defined inputs and outputs — and clear boundaries on what it is not allowed to do."
          />
          <div className="mt-8">
            <Suspense fallback={<LabFallback label="agent cards" />}>
              <AgentCardDeck />
            </Suspense>
          </div>
        </div>
      </section>

      {/* 3 — BUILD YOUR GTM SYSTEM */}
      <section className="py-14 border-t" style={{ borderColor: 'var(--border-color)' }} aria-labelledby="lab-gtm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="02 · Architecture"
            title="Build your GTM system"
            description="Drag marketing components onto the canvas and wire them together. Connect a full chain and the resulting motion reveals itself — with an explanation of why the architecture works."
          />
          <div className="mt-8">
            <Suspense fallback={<LabFallback label="GTM canvas" />}>
              <GTMCanvas />
            </Suspense>
          </div>
        </div>
      </section>

      {/* 4 — ASSEMBLY LINE */}
      <section className="py-14 border-t" style={{ borderColor: 'var(--border-color)' }} aria-labelledby="lab-assembly">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="03 · Pipeline"
            title="AI agent assembly line"
            description="Pick a project and watch it move through the pipeline every Lab build follows: idea to research to strategy to build to QA to deploy."
          />
          <div className="mt-8">
            <Suspense fallback={<LabFallback label="assembly line" />}>
              <AssemblyLine />
            </Suspense>
          </div>
        </div>
      </section>

      {/* 5 — EXPLORE THIS WEBSITE */}
      <section className="py-14 border-t" style={{ borderColor: 'var(--border-color)' }} aria-labelledby="lab-architecture">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="04 · The site itself"
            title="Explore this website"
            description="An explorable map of how this actual site works. Every node was verified from the repository — nothing invented."
          />
          <div className="mt-8">
            <Suspense fallback={<LabFallback label="architecture map" />}>
              <SiteArchitecture />
            </Suspense>
          </div>
        </div>
      </section>

      {/* 6 — RUN A MARKETING BUILD */}
      <section className="py-14 border-t" style={{ borderColor: 'var(--border-color)' }} aria-labelledby="lab-sim">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="05 · Simulator"
            title="Give me a marketing problem."
            description="Choose a goal, an audience and a constraint. Watch a marketing system assemble itself — research, ICP, channel, content, automation and measurement."
          />
          <div className="mt-8">
            <Suspense fallback={<LabFallback label="build simulator" />}>
              <MarketingBuildSim />
            </Suspense>
          </div>
        </div>
      </section>

      {/* 7 — BUILD LOG */}
      <section className="py-14 border-t" style={{ borderColor: 'var(--border-color)' }} aria-labelledby="lab-log">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="06 · Build log"
            title="Things actually built here"
            description="A chronological log of verifiable builds from this repository. Each entry states the problem, the build, the technology and the role of AI agents."
          />
          <div className="mt-8 space-y-3">
            {BUILD_LOG.map((entry, i) => {
              const open = openLog === i;
              return (
                <div key={entry.name} className="rounded-xl border" style={{ borderColor: 'var(--border-color)', backgroundColor: 'var(--card-bg)' }}>
                  <button
                    onClick={() => setOpenLog(open ? null : i)}
                    aria-expanded={open}
                    className="w-full flex items-center justify-between gap-4 p-4 text-left"
                  >
                    <span className="flex items-center gap-3">
                      <span className="text-xs font-mono px-2 py-0.5 rounded border" style={{ color: 'var(--text-tertiary)', borderColor: 'var(--border-color)' }}>{String(BUILD_LOG.length - i).padStart(2, '0')}</span>
                      <span className="font-semibold" style={{ color: 'var(--text-primary)' }}>{entry.name}</span>
                    </span>
                    <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: reducedMotion ? 0 : 0.2 }}>
                      <ChevronDown size={16} style={{ color: 'var(--text-tertiary)' }} aria-hidden />
                    </motion.span>
                  </button>
                  {open && (
                    <motion.div
                      initial={reducedMotion ? false : { opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="px-4 pb-4 text-sm space-y-2"
                    >
                      <p style={{ color: 'var(--text-secondary)' }}><span className="font-semibold" style={{ color: 'var(--text-primary)' }}>Problem:</span> {entry.problem}</p>
                      <p style={{ color: 'var(--text-secondary)' }}><span className="font-semibold" style={{ color: 'var(--text-primary)' }}>What was built:</span> {entry.built}</p>
                      <p style={{ color: 'var(--text-secondary)' }}><span className="font-semibold" style={{ color: 'var(--text-primary)' }}>Technology:</span> {entry.tech}</p>
                      <p style={{ color: 'var(--text-secondary)' }}><span className="font-semibold" style={{ color: 'var(--text-primary)' }}>Role of AI/agents:</span> {entry.aiRole}</p>
                    </motion.div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* TOOLBOX (technology section) */}
      <section className="py-14 border-t" style={{ borderColor: 'var(--border-color)' }} aria-labelledby="lab-toolbox">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="07 · Toolbox"
            title="The actual stack"
            description="No logo wall. The technologies this project really runs on, grouped by function — verified from the repository."
          />
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {TOOLBOX.map(group => {
              const GroupIcon = group.icon;
              const open = openToolbox === group.group;
              return (
                <div key={group.group} className="rounded-xl border" style={{ borderColor: open ? 'var(--accent)' : 'var(--border-color)', backgroundColor: 'var(--card-bg)' }}>
                  <button
                    onClick={() => setOpenToolbox(open ? null : group.group)}
                    aria-expanded={open}
                    className="w-full flex items-center justify-between p-4"
                  >
                    <span className="flex items-center gap-2.5">
                      <GroupIcon size={17} aria-hidden style={{ color: open ? 'var(--accent)' : 'var(--text-tertiary)' }} />
                      <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--text-primary)' }}>{group.group}</span>
                    </span>
                    <ChevronDown size={15} style={{ color: 'var(--text-tertiary)', transform: open ? 'rotate(180deg)' : undefined }} aria-hidden />
                  </button>
                  {open && (
                    <motion.ul
                      initial={reducedMotion ? false : { opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="px-4 pb-4 space-y-2.5"
                    >
                      {group.tools.map(t => (
                        <li key={t.name}>
                          <p className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{t.name}</p>
                          <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>{t.note}</p>
                        </li>
                      ))}
                    </motion.ul>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 8 — CLOSING CTA */}
      <section className="py-16 sm:py-20 border-t" style={{ borderColor: 'var(--border-color)' }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex justify-center gap-2 mb-6">
            <Tag variant="accent">Iteration</Tag>
            <Tag>the loop never closes</Tag>
          </div>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight max-w-2xl mx-auto" style={{ color: 'var(--text-primary)' }}>
            Want a marketing system like this?
          </h2>
          <p className="mt-4 text-base max-w-xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
            Strategy, agents, automation and measurement — designed, orchestrated and shipped. Start a conversation and let's scope the first working system.
          </p>
          <div className="mt-8 flex flex-wrap gap-3 justify-center">
            <Button to="/contact" size="lg">Start a conversation <ArrowRight size={16} className="ml-2" /></Button>
            <Button to="/thinking" variant="secondary" size="lg">Read the research</Button>
          </div>
        </div>
      </section>
    </div>
  );
}
