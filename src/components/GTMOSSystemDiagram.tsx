/* ── GTM OPERATING SYSTEM — editorial systems diagram ──────────────────────
   A single connected motion: MARKET → ICP → POSITIONING → DEMAND → SIGNALS →
   AUTOMATION → PIPELINE → REVENUE.

   Design intent (approved direction):
   · Off-white surface, very thin light-grey circle borders, dark charcoal
     labels. Blue is used ONLY as an accent — connector arrowheads and the
     final REVENUE node.
   · Hairline connectors that fill the space between nodes evenly, each ending
     in a small blue chevron arrowhead. No gradients, no glassmorphism, no
     glow, no shadows, no cards.
   · One restrained interaction: hovering/focusing a node slightly increases
     its border + label contrast and reveals a small contextual caption under
     the row. Nothing else animates.
   · Desktop & tablet (sm+): one connected horizontal row — it scales down via
     clamp() so the horizontal relationship survives until ~640px.
   · Mobile (< sm): the same sequence flows vertically — node, ↓, node, ↓ —
     never a shrunk, unreadable desktop layout. */

import { useState } from 'react';

const stages = [
  { id: 'market',      label: 'MARKET',     detail: 'Category, segments and market context.' },
  { id: 'icp',         label: 'ICP',        detail: 'Who we actually sell to — defined, not assumed.' },
  { id: 'positioning', label: 'POSITIONING',detail: 'A reason to believe, sharp enough to repeat.' },
  { id: 'demand',      label: 'DEMAND',     detail: 'Inbound and outbound working as one motion.' },
  { id: 'signals',     label: 'SIGNALS',    detail: 'Intent and engagement data, read early.' },
  { id: 'automation',  label: 'AUTOMATION', detail: 'Orchestration that removes manual latency.' },
  { id: 'pipeline',    label: 'PIPELINE',   detail: 'Qualified opportunities, cleanly handed over.' },
  { id: 'revenue',     label: 'REVENUE',    detail: 'Closed business — measured, not estimated.' },
];

/* Circular node — fixed hairline geometry; hover/focus only shifts contrast. */
function Node({ stage, active, isFinal, onEnter, onLeave }: {
  stage: { id: string; label: string; detail: string };
  active: boolean;
  isFinal: boolean;
  onEnter: () => void;
  onLeave: () => void;
}) {
  const strong = active || isFinal;
  return (
    <span
      tabIndex={0}
      role="img"
      aria-label={`${stage.label} — ${stage.detail}`}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      onFocus={onEnter}
      onBlur={onLeave}
      className="flex shrink-0 items-center justify-center rounded-full text-center transition-colors duration-150 ease-out focus:outline-none"
      style={{
        width: 'clamp(72px, 8.4vw, 104px)',
        height: 'clamp(72px, 8.4vw, 104px)',
        backgroundColor: 'var(--card-bg)',
        border: `1px solid ${strong ? 'color-mix(in srgb, var(--accent) 55%, var(--border-color))' : 'var(--border-color)'}`,
      }}
    >
      <span
        className="px-1.5 text-[9.5px] font-semibold uppercase leading-tight tracking-[0.08em] transition-colors duration-150 ease-out sm:text-[10px]"
        style={{ color: strong ? 'var(--accent)' : 'var(--text-primary)' }}
      >
        {stage.label}
      </span>
    </span>
  );
}

/* Thin horizontal connector ending in a small blue chevron. */
function HConnector() {
  return (
    <span aria-hidden="true" className="flex min-w-[14px] flex-1 items-center">
      <span className="h-px w-full" style={{ backgroundColor: 'var(--border-color)' }} />
      <svg width="9" height="9" viewBox="0 0 9 9" fill="none" className="shrink-0">
        <path d="M2.5 1 L6.5 4.5 L2.5 8" stroke="var(--accent)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}

export function GTMOSSystemDiagram() {
  const [active, setActive] = useState<string | null>(null);
  const activeStage = stages.find((s) => s.id === active);

  return (
    <div className="w-full">
      {/* Desktop / tablet — one connected horizontal row that scales down gracefully */}
      <div className="hidden items-center sm:flex">
        {stages.map((stage, i) => (
          <div key={stage.id} className="contents">
            <Node
              stage={stage}
              isFinal={stage.id === 'revenue'}
              active={active === stage.id}
              onEnter={() => setActive(stage.id)}
              onLeave={() => setActive(null)}
            />
            {i < stages.length - 1 && <HConnector />}
          </div>
        ))}
      </div>

      {/* Mobile — the same sequence flowing vertically */}
      <div className="flex flex-col items-center sm:hidden">
        {stages.map((stage, i) => (
          <div key={stage.id} className="flex w-full flex-col items-center">
            <Node
              stage={stage}
              isFinal={stage.id === 'revenue'}
              active={false}
              onEnter={() => { /* no hover states on touch */ }}
              onLeave={() => { /* no hover states on touch */ }}
            />
            {i < stages.length - 1 && (
              <span aria-hidden="true" className="relative flex h-7 items-center justify-center">
                <span className="h-full w-px" style={{ backgroundColor: 'var(--border-color)' }} />
                <svg width="9" height="9" viewBox="0 0 9 9" fill="none" className="absolute translate-y-[9px] rotate-90">
                  <path d="M2.5 1 L6.5 4.5 L2.5 8" stroke="var(--accent)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            )}
          </div>
        ))}
      </div>

      {/* Quiet caption beneath the diagram — doubles as the restrained hover detail slot */}
      <p className="mt-8 h-5 text-center text-[13px] lg:mt-10" style={{ color: 'var(--text-tertiary)' }}>
        {activeStage ? activeStage.detail : 'One connected motion — from market to revenue.'}
      </p>
    </div>
  );
}
