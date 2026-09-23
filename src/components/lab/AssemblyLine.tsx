import { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Lightbulb, Search, Target, Hammer, ShieldCheck, Rocket, Check, Play, Package, FileText } from 'lucide-react';

/*
 * Section 3 — AI Agent Assembly Line.
 * Pick an example project and watch it move through the same pipeline every
 * Lab build follows: IDEA → RESEARCH → STRATEGY → BUILD → QA → DEPLOY.
 *
 * This is an animation of my methodology, not a live AI run — nothing is
 * executed, no API is called. With prefers-reduced-motion the pipeline
 * completes instantly without stage animation.
 */

const STAGES = [
  { id: 'idea', label: 'Idea', agent: null, icon: Lightbulb },
  { id: 'research', label: 'Research', agent: 'Research Agent', icon: Search },
  { id: 'strategy', label: 'Strategy', agent: 'Strategy Agent', icon: Target },
  { id: 'build', label: 'Build', agent: 'Build Agent', icon: Hammer },
  { id: 'seo', label: 'SEO', agent: 'SEO Agent', icon: FileText },
  { id: 'qa', label: 'QA', agent: 'QA Agent', icon: ShieldCheck },
  { id: 'deploy', label: 'Deploy', agent: null, icon: Rocket },
] as const;

interface Project {
  id: string;
  input: string;
  log: Record<string, string>;
  artifact: { title: string; description: string; route?: string; routeLabel?: string };
}

const PROJECTS: Project[] = [
  {
    id: 'lead-magnet',
    input: 'Create a lead magnet',
    log: {
      research: 'Benchmarked 20+ B2B lead magnets; strongest converters solve a named, urgent problem.',
      strategy: 'Scoped a decision tool over a PDF: interactive value in exchange for contact.',
      build: 'Built the interactive component with the site\'s design system; wired the form to the capture flow.',
      seo: 'Structured the offer page: metadata, schema, internal links from related articles.',
      qa: 'Type check, production build, form round-trip, mobile pass, console clean.',
      deploy: 'Shipped to production behind the existing analytics and tag plan.',
    },
    artifact: {
      title: 'Interactive lead magnet',
      description: 'A self-qualifying tool page: visitors get an answer, the system gets a qualified contact.',
    },
  },
  {
    id: 'landing-page',
    input: 'Build a landing page',
    log: {
      research: 'Audited message hierarchy on high-converting B2B pages in the same category.',
      strategy: 'One audience, one promise, one CTA; proof placed where objections surface.',
      build: 'Composed the page from existing primitives — no new design system, no new dependencies.',
      seo: 'Route metadata, canonical, Open Graph card, breadcrumb schema.',
      qa: 'Verified Lighthouse-class vitals and responsive behavior at three breakpoints.',
      deploy: 'Prerendered HTML on the edge; interactive parts hydrate on demand.',
    },
    artifact: {
      title: 'Converting landing page',
      description: 'A page built to be measured: every section maps to a hypothesis about the visitor.',
    },
  },
  {
    id: 'gtm-tool',
    input: 'Create a GTM tool',
    log: {
      research: 'Mapped the decisions B2B marketers actually get stuck on: readiness, channels, budget split.',
      strategy: 'Encoded a decision framework as a guided questionnaire with scored output.',
      build: 'Built the engine, scoring model and result views from typed data structures.',
      seo: 'SoftwareApplication schema so the tool is legible to search and AI answers.',
      qa: 'Score math verified against hand-calculated cases; keyboard-only run tested.',
      deploy: 'Shipped at /tools — zero backend, runs entirely client-side.',
    },
    artifact: {
      title: 'GTM Intelligence Engine',
      description: 'Answer questions about your business; get a readiness score, channel portfolio and 90-day plan.',
      route: '/tools/gtm-intelligence',
      routeLabel: 'See the real tool',
    },
  },
  {
    id: 'thinking-article',
    input: 'Publish a Thinking article',
    log: {
      research: 'Source scan: primary reports, practitioner posts, named frameworks — links preserved.',
      strategy: 'Thesis sharpened to one arguable claim; outline ordered by tension, not topic.',
      build: 'Authored in the Sanity CMS as structured Portable Text; featured image generated.',
      seo: 'Article schema, FAQ schema where real, canonical URL, category breadcrumb.',
      qa: 'Studio validation clean, prerendered HTML verified, sitemap self-heals the new URL.',
      deploy: 'Published at /thinking/<slug> — content and code decoupled.',
    },
    artifact: {
      title: 'Research-led article',
      description: 'CMS-authored, prerendered, schema-marked-up — the full content pipeline in one URL.',
      route: '/thinking',
      routeLabel: 'Read the latest',
    },
  },
];

const STAGE_MS = 900;

export default function AssemblyLine() {
  const reducedMotion = useReducedMotion();
  const [projectId, setProjectId] = useState<string | null>(null);
  const [current, setCurrent] = useState(-1); // index of last completed stage
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const project = PROJECTS.find(p => p.id === projectId) ?? null;
  const running = project !== null && current < STAGES.length - 1;

  useEffect(() => {
    if (!running) return;
    timer.current = setTimeout(() => setCurrent(c => c + 1), reducedMotion ? 0 : STAGE_MS);
    return () => { if (timer.current) clearTimeout(timer.current); };
  }, [running, current, reducedMotion]);

  const run = (id: string) => {
    if (timer.current) clearTimeout(timer.current);
    setProjectId(id);
    setCurrent(reducedMotion ? STAGES.length - 1 : -1);
  };

  const done = project && current === STAGES.length - 1;

  return (
    <div>
      {/* Project picker */}
      <div className="flex flex-wrap gap-2" role="group" aria-label="Example project inputs">
        {PROJECTS.map(p => (
          <button
            key={p.id}
            onClick={() => run(p.id)}
            aria-pressed={projectId === p.id}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md border transition-colors"
            style={{
              borderColor: projectId === p.id ? 'var(--accent)' : 'var(--border-color)',
              color: projectId === p.id ? 'var(--accent)' : 'var(--text-secondary)',
              backgroundColor: 'var(--card-bg)'
            }}
          >
            <Play size={12} aria-hidden /> “{p.input}”
          </button>
        ))}
      </div>

      {/* Pipeline */}
      <div
        className="mt-6 overflow-x-auto pb-2"
        role="list"
        aria-label="Assembly line stages"
      >
        <ol className="flex items-stretch gap-2 min-w-[40rem]">
          {STAGES.map((stage, i) => {
            const StageIcon = stage.icon;
            const state = current >= i ? 'done' : i === current + 1 && project ? 'active' : 'idle';
            return (
              <motion.li
                key={stage.id}
                role="listitem"
                animate={state === 'active' && !reducedMotion ? { scale: [1, 1.04, 1] } : { scale: 1 }}
                transition={{ duration: 0.5, repeat: state === 'active' && !reducedMotion ? Infinity : 0 }}
                className="flex-1 rounded-lg border p-3 text-center relative"
                style={{
                  backgroundColor: state === 'idle' ? 'var(--bg-secondary)' : 'var(--card-bg)',
                  borderColor: state === 'done' ? 'var(--accent)' : 'var(--border-color)',
                  borderWidth: state === 'done' ? 2 : 1,
                  opacity: state === 'idle' ? 0.55 : 1,
                }}
                aria-label={`${stage.label}: ${state === 'done' ? 'complete' : state === 'active' ? 'in progress' : 'waiting'}`}
              >
                <StageIcon size={18} aria-hidden className="mx-auto" style={{ color: state === 'done' ? 'var(--accent)' : 'var(--text-tertiary)' }} />
                <p className="mt-1.5 text-xs font-semibold uppercase tracking-wide" style={{ color: 'var(--text-primary)' }}>{stage.label}</p>
                {stage.agent && <p className="text-[10px] mt-0.5" style={{ color: 'var(--text-tertiary)' }}>{stage.agent}</p>}
                {state === 'done' && (
                  <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--accent)' }}>
                    <Check size={12} color="#fff" aria-hidden />
                  </span>
                )}
                {i < STAGES.length - 1 && <span aria-hidden className="absolute top-1/2 -right-[9px] w-[9px] h-px" style={{ backgroundColor: 'var(--border-color)' }} />}
              </motion.li>
            );
          })}
        </ol>
      </div>

      {/* Stage log */}
      <div className="mt-4 min-h-[4rem]" aria-live="polite">
        {project && current >= 1 && (
          <motion.div
            initial={reducedMotion ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-xl border p-4 text-sm"
            style={{ borderColor: 'var(--border-color)', backgroundColor: 'var(--bg-secondary)' }}
          >
            <p className="font-semibold" style={{ color: 'var(--text-primary)' }}>
              {STAGES[Math.min(current, STAGES.length - 1)].agent ?? STAGES[Math.min(current, STAGES.length - 1)].label} ✓
            </p>
            <p className="mt-1" style={{ color: 'var(--text-secondary)' }}>
              {project.log[STAGES[Math.min(current, STAGES.length - 1)].id]}
            </p>
          </motion.div>
        )}
      </div>

      {/* Resulting artifact */}
      {done && project && (
        <motion.div
          initial={reducedMotion ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 260, damping: 22 }}
          className="mt-4 rounded-xl border-2 p-5 flex items-start gap-4"
          style={{ borderColor: 'var(--accent)', backgroundColor: 'var(--card-bg)' }}
        >
          <span className="inline-flex items-center justify-center w-10 h-10 rounded-lg shrink-0" style={{ backgroundColor: 'var(--accent)' }}>
            <Package size={20} color="#fff" aria-hidden />
          </span>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--accent)' }}>Resulting artifact</p>
            <h4 className="mt-0.5 font-semibold" style={{ color: 'var(--text-primary)' }}>{project.artifact.title}</h4>
            <p className="mt-1 text-sm" style={{ color: 'var(--text-secondary)' }}>{project.artifact.description}</p>
            {project.artifact.route && (
              <a href={project.artifact.route} className="inline-block mt-2 text-sm font-medium underline underline-offset-2" style={{ color: 'var(--accent)' }}>
                {project.artifact.routeLabel ?? 'View'} →
              </a>
            )}
          </div>
        </motion.div>
      )}

      <p className="mt-4 text-xs" style={{ color: 'var(--text-tertiary)' }}>
        Animated demonstration of the Lab pipeline — no agent is executing here. In real projects these stages are AI-assisted and always reviewed by me before anything ships.
      </p>
    </div>
  );
}
