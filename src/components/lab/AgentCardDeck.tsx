import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Search, Target, Hammer, FileText, ShieldCheck, BarChart3, X, GripHorizontal } from 'lucide-react';

/*
 * Section 1 — AI Agent ID Cards.
 * A physical-feeling card stack: drag a card, it stretches and tilts with
 * spring physics; pull it past a threshold (or tap/Enter) and it expands into
 * a full spec. Release early and it springs back into the deck.
 *
 * Honesty note: these cards describe the agent ROLES in my workflow — how I
 * brief and supervise AI agents for each function. They are definitions of
 * the methodology, not a claim that autonomous agents run unattended.
 */

interface AgentSpec {
  id: string;
  name: string;
  icon: typeof Search;
  color: string;
  purpose: string;
  inputs: string;
  output: string;
  use: string;
  skips: string;
}

const AGENTS: AgentSpec[] = [
  {
    id: 'strategy',
    name: 'Strategy Agent',
    icon: Target,
    color: '#155EEF',
    purpose: 'Turns objectives and constraints into a positioning and channel plan.',
    inputs: 'Business goal, ICP notes, constraints',
    output: 'Strategy brief: motion, channels, sequence',
    use: 'First pass on every GTM plan on this site — then I edit, challenge and approve it.',
    skips: 'Final positioning calls, budget sign-off, anything customer-facing until I review it.'
  },
  {
    id: 'research',
    name: 'Research Agent',
    icon: Search,
    color: '#0E9384',
    purpose: 'Finds evidence, patterns and market context.',
    inputs: 'Questions + sources',
    output: 'Research brief + evidence',
    use: 'Literature scans and source gathering for Thinking articles; I verify every claim before publishing.',
    skips: 'Publishing anything, trusting an unsourced claim, inventing statistics.'
  },
  {
    id: 'build',
    name: 'Build Agent',
    icon: Hammer,
    color: '#B54708',
    purpose: 'Turns an approved spec into working code and page structure.',
    inputs: 'Spec + design system constraints',
    output: 'Components, scripts, working prototype',
    use: 'Drafted most of this website\'s code — including this Lab page — under my review and merge control.',
    skips: 'Deploying to production, editing Sanity schemas or live content without my direction.'
  },
  {
    id: 'seo',
    name: 'SEO Agent',
    icon: FileText,
    color: '#6938EF',
    purpose: 'Structures content for search and AI-answer engines.',
    inputs: 'Content + target queries',
    output: 'Metadata, schema markup, internal-link plan',
    use: 'Route metadata, structured data and sitemap patterns across the site; I audit the output per page.',
    skips: 'Fabricating rankings claims, keyword stuffing, touching published article URLs.'
  },
  {
    id: 'qa',
    name: 'QA Agent',
    icon: ShieldCheck,
    color: '#D92D20',
    purpose: 'Checks the build before anything ships.',
    inputs: 'Build output + acceptance criteria',
    output: 'Pass/fail report: types, build, routes, performance',
    use: 'Type checks, production builds, link and console sweeps on every change — the same validation list used for this page.',
    skips: 'Waiving a failing check, editing code to make a test pass silently.'
  },
  {
    id: 'analytics',
    name: 'Analytics Agent',
    icon: BarChart3,
    color: '#875BF7',
    purpose: 'Defines what to measure and reads what happened.',
    inputs: 'System design + event data',
    output: 'Measurement plan + performance readout',
    use: 'Designs the measurement model for each marketing system I build; readings inform the next iteration.',
    skips: 'Collecting personal data beyond what the site\'s privacy policy allows.'
  }
];

export default function AgentCardDeck() {
  const reducedMotion = useReducedMotion();
  const [expanded, setExpanded] = useState<string | null>(null);
  const [hintDismissed, setHintDismissed] = useState(false);

  const spring = { type: 'spring' as const, stiffness: 300, damping: 24, mass: 0.9 };

  const expand = (id: string) => setExpanded(id);
  const spec = AGENTS.find(a => a.id === expanded);

  return (
    <div>
      {!hintDismissed && (
        <p className="text-sm mb-4 flex items-center gap-2" style={{ color: 'var(--text-tertiary)' }}>
          <GripHorizontal size={16} aria-hidden />
          Drag a card out of the deck — or tap it — to read the full agent spec.
          <button onClick={() => setHintDismissed(true)} className="ml-auto underline underline-offset-2" aria-label="Dismiss hint">ok</button>
        </p>
      )}

      <div
        className="relative h-[22rem] sm:h-[26rem] select-none"
        style={{ touchAction: 'pan-y' }}
        role="list"
        aria-label="AI agent cards"
      >
        {AGENTS.map((agent, i) => {
          const isExpanded = expanded === agent.id;
          const isTop = expanded === null && i === AGENTS.length - 1;
          const Icon = agent.icon;
          return (
            <motion.div
              key={agent.id}
              role="listitem"
              drag={reducedMotion ? false : !isExpanded}
              dragSnapToOrigin
              onDragEnd={(_, info) => {
                // Pulled far enough out of the deck → expand it.
                if (Math.hypot(info.offset.x, info.offset.y) > 110) expand(agent.id);
              }}
              whileDrag={reducedMotion ? undefined : { scale: 1.06, rotate: 4, cursor: 'grabbing', zIndex: 60 }}
              whileHover={reducedMotion || isExpanded ? undefined : { y: -6 }}
              animate={{ y: isExpanded ? 0 : i * -14, rotate: (i - (AGENTS.length - 1) / 2) * 3, scale: isExpanded ? 1 : 1 - i * 0.015 }}
              transition={spring}
              className="absolute left-1/2 top-6 w-[min(20rem,85vw)] rounded-xl border shadow-lg cursor-grab focus-visible:outline-2 focus-visible:outline-offset-2"
              style={{
                backgroundColor: 'var(--card-bg)',
                borderColor: isTop || isExpanded ? 'var(--border-color)' : 'var(--border-color)',
                zIndex: isExpanded ? 50 : i + 1,
                x: '-50%',
                touchAction: 'none'
              }}
            >
              <button
                type="button"
                onClick={() => expand(agent.id)}
                onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); expand(agent.id); } }}
                className="w-full text-left p-5 pointer-events-auto focus-visible:outline-none"
                aria-label={`${agent.name}: ${agent.purpose}. Activate to expand.`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span className="inline-flex items-center justify-center w-10 h-10 rounded-lg" style={{ backgroundColor: `${agent.color}1A`, color: agent.color }}>
                      <Icon size={20} aria-hidden />
                    </span>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--text-tertiary)' }}>AI AGENT</p>
                      <h3 className="text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>{agent.name}</h3>
                    </div>
                  </div>
                  <span className="mt-1 text-[10px] font-mono px-2 py-0.5 rounded border" style={{ color: 'var(--text-tertiary)', borderColor: 'var(--border-color)' }}>
                    {String(i + 1).padStart(2, '0')}/06
                  </span>
                </div>
                <p className="mt-4 text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{agent.purpose}</p>
                <div className="mt-4 grid grid-cols-2 gap-2 text-[11px]">
                  <div className="rounded p-2 border" style={{ borderColor: 'var(--border-color)' }}>
                    <p className="uppercase tracking-wider font-semibold mb-0.5" style={{ color: 'var(--text-tertiary)' }}>Input</p>
                    <p style={{ color: 'var(--text-secondary)' }}>{agent.inputs}</p>
                  </div>
                  <div className="rounded p-2 border" style={{ borderColor: 'var(--border-color)' }}>
                    <p className="uppercase tracking-wider font-semibold mb-0.5" style={{ color: 'var(--text-tertiary)' }}>Output</p>
                    <p style={{ color: 'var(--text-secondary)' }}>{agent.output}</p>
                  </div>
                </div>
              </button>
            </motion.div>
          );
        })}
      </div>

      {/* Expanded spec sheet */}
      {spec && (
        <motion.div
          initial={reducedMotion ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={spring}
          role="dialog"
          aria-label={`${spec.name} specification`}
          className="mt-6 rounded-xl border p-6 relative"
          style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}
        >
          <button
            onClick={() => setExpanded(null)}
            className="absolute top-4 right-4 p-1.5 rounded-md border"
            style={{ borderColor: 'var(--border-color)', color: 'var(--text-secondary)' }}
            aria-label="Close agent spec"
          >
            <X size={16} aria-hidden />
          </button>
          <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: spec.color }}>{spec.name} — full spec</p>
          <dl className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div><dt className="font-semibold" style={{ color: 'var(--text-primary)' }}>Purpose</dt><dd style={{ color: 'var(--text-secondary)' }}>{spec.purpose}</dd></div>
            <div><dt className="font-semibold" style={{ color: 'var(--text-primary)' }}>Where I use it</dt><dd style={{ color: 'var(--text-secondary)' }}>{spec.use}</dd></div>
            <div><dt className="font-semibold" style={{ color: 'var(--text-primary)' }}>Input</dt><dd style={{ color: 'var(--text-secondary)' }}>{spec.inputs}</dd></div>
            <div><dt className="font-semibold" style={{ color: 'var(--text-primary)' }}>Output</dt><dd style={{ color: 'var(--text-secondary)' }}>{spec.output}</dd></div>
          </dl>
          <div className="mt-4 rounded-lg border p-4" style={{ borderColor: 'var(--border-color)' }}>
            <p className="text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: 'var(--text-tertiary)' }}>What this agent skips</p>
            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{spec.skips}</p>
          </div>
        </motion.div>
      )}

      <p className="mt-4 text-xs" style={{ color: 'var(--text-tertiary)' }}>
        These cards define the agent roles in my workflow: AI agents assist research, drafting and code under my supervision. Nothing on this site is published unreviewed.
      </p>
    </div>
  );
}
