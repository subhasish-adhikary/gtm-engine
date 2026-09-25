import { useState } from 'react';

/* ── GTM OPERATING SYSTEM — editorial systems diagram ──────────────────────
   A single connected motion: MARKET → ICP → POSITIONING → DEMAND → SIGNALS →
   AUTOMATION → PIPELINE → REVENUE.

   Design intent (approved direction):
   · White/off-white surface, very light grey circles + connectors, charcoal
     labels, blue used ONLY as an accent (hover state + the final REVENUE node).
   · Thin, precise hairline connectors with small chevron arrowheads.
   · No gradients, no glassmorphism, no glow, no shadows, no cards.
   · Restrained interaction: hovering a node slightly increases contrast and
     reveals a small one-line contextual detail beneath the flow.
   · Desktop/tablet: horizontal flow (scales down with viewport via clamp()).
     Mobile (< sm): vertical sequence with downward arrows.
   The component is self-contained so it can be dropped into any section. */

const stages = [
  { id: 'market', label: 'MARKET', detail: 'Who to target' },
  { id: 'icp', label: 'ICP', detail: 'Find the right buyers' },
  { id: 'positioning', label: 'POSITIONING', detail: 'Differentiate' },
  { id: 'demand', label: 'DEMAND', detail: 'Create across channels' },
  { id: 'signals', label: 'SIGNALS', detail: 'Detect buying intent' },
  { id: 'automation', label: 'AUTOMATION', detail: 'Nurture & scale' },
  { id: 'pipeline', label: 'PIPELINE', detail: 'Convert to opportunities' },
  { id: 'revenue', label: 'REVENUE', detail: 'Predictable growth' },
];

/* Circle diameter scales with the viewport; hairlines stay at 1px. */
const NODE_SIZE = 'clamp(64px, 6.9vw, 98px)';

function Chevron({ orientation }: { orientation: 'right' | 'down' }) {
  return (
    <svg
      aria-hidden="true"
      width="7"
      height="10"
      viewBox="0 0 7 10"
      className={orientation === 'right' ? 'shrink-0 -ml-[3px]' : 'shrink-0 -mt-[3px]'}
      style={{ transform: orientation === 'down' ? 'rotate(90deg)' : undefined }}
    >
      <path d="M1 1l5 4-5 4" fill="none" stroke="var(--accent)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function GTMOSSystemDiagram() {
  const [active, setActive] = useState<string | null>(null);

  const nodeCircle = (label: string, isActive: boolean, isFinal: boolean) => (
    <span
      className="flex items-center justify-center rounded-full transition-colors duration-150"
      style={{
        width: NODE_SIZE,
        height: NODE_SIZE,
        backgroundColor: '#FFFFFF',
        border: `1px solid ${isActive || isFinal ? 'var(--accent)' : 'var(--border-color)'}`,
      }}
    >
      <span
        className="text-center font-semibold uppercase leading-tight transition-colors duration-150"
        style={{
          fontSize: 'clamp(7.5px, 0.68vw, 9.5px)',
          letterSpacing: '0.09em',
          padding: '0 6px',
          color: isActive ? 'var(--accent)' : isFinal ? 'var(--accent)' : '#17191C',
        }}
      >
        {label}
      </span>
    </span>
  );

  const bind = (stage: { id: string; label: string; detail: string }) => ({
    onMouseEnter: () => setActive(stage.id),
    onMouseLeave: () => setActive(null),
    onFocus: () => setActive(stage.id),
    onBlur: () => setActive(null),
    tabIndex: 0,
    'aria-label': `${stage.label} — ${stage.detail}`,
  });

  return (
    <div className="w-full">
      {/* DESKTOP / TABLET — horizontal flow */}
      <div className="hidden sm:flex items-center justify-between">
        {stages.map((stage, i) => {
          const isActive = active === stage.id;
          const isFinal = stage.id === 'revenue';
          return (
            <div key={stage.id} className="contents">
              <button
                type="button"
                {...bind(stage)}
                className="cursor-default outline-none rounded-full"
                style={{ WebkitTapHighlightColor: 'transparent' }}
              >
                {nodeCircle(stage.label, isActive, isFinal)}
              </button>
              {i < stages.length - 1 && (
                <span
                  aria-hidden="true"
                  className="flex flex-1 items-center justify-center min-w-[8px]"
                  style={{ maxWidth: 'clamp(14px, 2.1vw, 34px)' }}
                >
                  <span
                    className="h-px w-full transition-colors duration-150"
                    style={{
                      backgroundColor:
                        isActive || active === stages[i + 1].id ? 'color-mix(in srgb, var(--accent) 55%, transparent)' : 'var(--border-color)',
                    }}
                  />
                  <Chevron orientation="right" />
                </span>
              )}
            </div>
          );
        })}
      </div>

      {/* MOBILE — vertical flowing sequence */}
      <div className="sm:hidden flex flex-col items-center">
        {stages.map((stage, i) => {
          const isActive = active === stage.id;
          const isFinal = stage.id === 'revenue';
          return (
            <div key={stage.id} className="flex flex-col items-center">
              <button
                type="button"
                {...bind(stage)}
                className="cursor-default outline-none rounded-full"
                style={{ WebkitTapHighlightColor: 'transparent' }}
              >
                {nodeCircle(stage.label, isActive, isFinal)}
              </button>
              {i < stages.length - 1 && (
                <span aria-hidden="true" className="flex flex-col items-center py-1">
                  <span className="w-px h-4" style={{ backgroundColor: 'var(--border-color)' }} />
                  <Chevron orientation="down" />
                </span>
              )}
            </div>
          );
        })}
      </div>

      {/* Contextual detail line — fixed-height slot, swaps on hover only. */}
      <div className="mt-6 sm:mt-7 flex h-4 items-center justify-center text-center" aria-live="polite">
        <span className="text-[11px] tracking-[0.02em]" style={{ color: 'var(--text-tertiary)' }}>
          {active ? stages.find((s) => s.id === active)?.detail : 'One connected motion — from market to revenue.'}
        </span>
      </div>
    </div>
  );
}
