import { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Search, Users, Megaphone, FileEdit, Workflow, LineChart, Wrench, RotateCcw } from 'lucide-react';

/*
 * Section 5 — Run a Marketing Build.
 * A simulator: pick a goal, audience and constraint, and watch a marketing
 * system assemble. The component choices follow the same logic I apply in
 * real GTM design — but this is clearly an interactive demonstration,
 * not a production AI recommendation engine.
 */

const GOALS = ['Generate demand', 'Capture leads', 'Build a content engine', 'Launch a GTM motion', 'Automate marketing operations'] as const;
const AUDIENCES = ['SaaS', 'B2B services', 'Startup', 'Enterprise'] as const;
const CONSTRAINTS = ['Low budget', 'Small team', 'Limited data', 'Need results quickly'] as const;

type Goal = typeof GOALS[number];
type Audience = typeof AUDIENCES[number];
type Constraint = typeof CONSTRAINTS[number];

interface SystemComponent { icon: typeof Search; label: string; detail: string; }

function designSystem(goal: Goal, audience: Audience, constraint: Constraint): { components: SystemComponent[]; rationale: string } {
  const channel: SystemComponent =
    goal === 'Build a content engine'
      ? { icon: FileEdit, label: 'Channel · Organic content + SEO', detail: 'An engine goal means compounding channels: research-led articles and tools that rank and get cited.' }
      : goal === 'Generate demand'
        ? { icon: Megaphone, label: audience === 'Enterprise' ? 'Channel · ABM + LinkedIn' : 'Channel · Paid + outbound', detail: `For ${audience}, attention is bought where ${audience === 'Enterprise' ? 'accounts already are — targeted, account-level plays' : 'the buyer already scrolls — fast feedback loops'}.` }
        : goal === 'Automate marketing operations'
          ? { icon: Workflow, label: 'Channel · Lifecycle automation', detail: 'An operations goal treats existing contacts as the channel — segmentation, triggers and nurture logic.' }
          : { icon: Megaphone, label: 'Channel · Landing pages + capture', detail: 'A capture goal concentrates spend on the highest-intent surface: one page, one promise, one form.' };

  const research: SystemComponent = {
    icon: Search, label: 'Research',
    detail: constraint === 'Limited data'
      ? 'Primary research first: customer interviews and win/loss notes substitute for the missing dataset.'
      : 'Market scan: ICP evidence, competitor positioning, existing demand signals.'
  };
  const icp: SystemComponent = {
    icon: Users, label: 'ICP',
    detail: audience === 'Enterprise'
      ? 'Account-based: tiering and named-account selection before any message is written.'
      : `A sharp ${audience} ICP — segment, trigger event and disqualifiers — so the system rejects bad fit early.`
  };
  const content: SystemComponent = {
    icon: FileEdit, label: 'Content',
    detail: goal === 'Launch a GTM motion'
      ? 'Messaging architecture first: positioning, objections, proof — reused across every touchpoint.'
      : 'One flagship asset matched to the channel, plus the reuse slices (posts, emails, snippets).'
  };
  const automation: SystemComponent = {
    icon: Workflow, label: 'Automation',
    detail: constraint === 'Need results quickly'
      ? 'Only the automations that touch revenue in week one: routing, follow-up, and alerts. Everything else waits.'
      : 'Routing, enrichment, nurture and internal alerts — the ops layer that keeps the system running without headcount.'
  };
  const measurement: SystemComponent = {
    icon: LineChart, label: 'Measurement',
    detail: constraint === 'Low budget'
      ? 'Zero-cost instrumentation first: native analytics, form-level conversion tracking, weekly manual readout.'
      : 'Event model per stage, a single scoreboard, and a review cadence that feeds iteration.'
  };

  const rationale =
    constraint === 'Low budget'
      ? `Low budget pushes the ${goal.toLowerCase()} system toward owned and earned channels — effort substitutes for spend, and every component is instrumented so nothing is paid for blindly.`
      : constraint === 'Small team'
        ? `A small team means the ${goal.toLowerCase()} system must run on automation defaults, not headcount: fewer moving parts, aggressive templating, and manual steps only where judgment is genuinely required.`
        : constraint === 'Limited data'
          ? `With limited data, the ${goal.toLowerCase()} system starts as a learning machine: small bets, tight feedback, and research filling the gaps a mature dataset normally would.`
          : `Needing results quickly shapes the ${goal.toLowerCase()} system into a focused wedge: one ${audience === 'Enterprise' ? 'account segment' : 'segment'}, one channel, one offer — proven before anything is scaled.`;

  return { components: [research, icp, channel, content, automation, measurement], rationale };
}

export default function MarketingBuildSim() {
  const reducedMotion = useReducedMotion();
  const [goal, setGoal] = useState<Goal | null>(null);
  const [audience, setAudience] = useState<Audience | null>(null);
  const [constraint, setConstraint] = useState<Constraint | null>(null);
  const [built, setBuilt] = useState(false);

  const ready = goal && audience && constraint;
  const system = ready ? designSystem(goal, audience, constraint) : null;

  const Selector = ({ title, options, value, setValue }: { title: string; options: readonly string[]; value: string | null; setValue: (v: any) => void }) => (
    <div role="group" aria-label={title}>
      <p className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: 'var(--text-tertiary)' }}>{title}</p>
      <div className="flex flex-wrap gap-2">
        {options.map(o => (
          <button
            key={o}
            onClick={() => { setValue(o); setBuilt(false); }}
            aria-pressed={value === o}
            className="px-3 py-1.5 text-xs font-medium rounded-md border transition-colors"
            style={{
              borderColor: value === o ? 'var(--accent)' : 'var(--border-color)',
              color: value === o ? 'var(--accent)' : 'var(--text-secondary)',
              backgroundColor: 'var(--card-bg)'
            }}
          >
            {o}
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <div>
      <div className="grid grid-cols-1 gap-5">
        <Selector title="Goal" options={GOALS} value={goal} setValue={setGoal} />
        <Selector title="Audience" options={AUDIENCES} value={audience} setValue={setAudience} />
        <Selector title="Constraint" options={CONSTRAINTS} value={constraint} setValue={setConstraint} />
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <button
          onClick={() => setBuilt(true)}
          disabled={!ready}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md text-sm font-semibold transition-opacity disabled:opacity-40 disabled:cursor-not-allowed"
          style={{ backgroundColor: 'var(--accent)', color: '#fff' }}
        >
          <Wrench size={16} aria-hidden /> Assemble the system
        </button>
        {(goal || audience || constraint) && (
          <button
            onClick={() => { setGoal(null); setAudience(null); setConstraint(null); setBuilt(false); }}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-md border"
            style={{ borderColor: 'var(--border-color)', color: 'var(--text-tertiary)' }}
          >
            <RotateCcw size={13} aria-hidden /> Reset
          </button>
        )}
        <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-1 rounded" style={{ backgroundColor: 'var(--bg-secondary)', color: 'var(--text-tertiary)', border: '1px solid var(--border-color)' }}>
          Interactive demonstration
        </span>
      </div>

      <div className="mt-6 min-h-[6rem]" aria-live="polite">
        {built && system ? (
          <div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
              {system.components.map((c, i) => {
                const CIcon = c.icon;
                return (
                  <motion.div
                    key={c.label}
                    initial={reducedMotion ? false : { opacity: 0, y: 14, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ delay: reducedMotion ? 0 : i * 0.12, type: 'spring', stiffness: 280, damping: 22 }}
                    className="rounded-lg border p-3"
                    style={{ borderColor: 'var(--border-color)', backgroundColor: 'var(--card-bg)' }}
                  >
                    <CIcon size={16} aria-hidden style={{ color: 'var(--accent)' }} />
                    <p className="mt-1.5 text-xs font-semibold" style={{ color: 'var(--text-primary)' }}>{c.label}</p>
                    <p className="mt-1 text-[11px] leading-snug" style={{ color: 'var(--text-tertiary)' }}>{c.detail}</p>
                  </motion.div>
                );
              })}
            </div>
            <motion.div
              initial={reducedMotion ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: reducedMotion ? 0 : 0.85 }}
              className="mt-4 rounded-xl border-2 border-dashed p-4"
              style={{ borderColor: 'var(--accent)' }}
            >
              <p className="text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: 'var(--accent)' }}>Why this shape</p>
              <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{system.rationale}</p>
            </motion.div>
            <p className="mt-3 text-xs" style={{ color: 'var(--text-tertiary)' }}>
              Interactive demonstration — a simulated assembly, not a production AI recommendation engine. In real engagements, these choices come from research and your actual data.
            </p>
          </div>
        ) : (
          <AnimatePresence>
            <p className="text-sm p-4 rounded-xl border border-dashed" style={{ color: 'var(--text-tertiary)', borderColor: 'var(--border-color)' }}>
              {ready ? 'Choices locked. Hit assemble.' : 'Pick one option from each row — the system shape changes with every combination.'}
            </p>
          </AnimatePresence>
        )}
      </div>
    </div>
  );
}
