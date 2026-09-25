/* ── GTM OPERATING SYSTEM — editorial systems diagram ──────────────────────
   A single connected motion: MARKET → ICP → POSITIONING → DEMAND → SIGNALS →
   AUTOMATION → PIPELINE → REVENUE.

   Design intent (approved mock-up):
   · Off-white surface, very thin light-grey circle borders, charcoal labels,
     blue used ONLY as an accent (connector arrowheads + the final REVENUE node).
   · Hairline connectors that fill the space between nodes evenly — never
     compressed — each ending in a small blue chevron arrowhead.
   · No gradients, no glassmorphism, no glow, no shadows, no cards, no hover
     state changes — the composition carries the section, not decoration.
   · Desktop (lg+): one connected horizontal row spanning the content width.
     Below lg: a calm 2/4-column circle grid without connectors.
   The component is self-contained so it can be dropped into any section. */

const stages = [
  { id: 'market', label: 'MARKET' },
  { id: 'icp', label: 'ICP' },
  { id: 'positioning', label: 'POSITIONING' },
  { id: 'demand', label: 'DEMAND' },
  { id: 'signals', label: 'SIGNALS' },
  { id: 'automation', label: 'AUTOMATION' },
  { id: 'pipeline', label: 'PIPELINE' },
  { id: 'revenue', label: 'REVENUE' },
];

function NodeCircle({ label, isFinal, fixedSize = false }: { label: string; isFinal: boolean; fixedSize?: boolean }) {
  const sizeClass = fixedSize
    ? 'w-20 h-20 sm:w-24 sm:h-24'
    : 'w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 xl:w-[104px] xl:h-[104px]';
  return (
    <span
      className={`${sizeClass} shrink-0 rounded-full flex items-center justify-center text-center px-2`}
      style={{
        backgroundColor: 'var(--card-bg)',
        border: `1px solid ${isFinal ? 'var(--accent)' : 'var(--border-color)'}`,
      }}
    >
      <span
        className="text-[10px] md:text-[11px] font-semibold uppercase tracking-[0.08em] leading-tight"
        style={{ color: isFinal ? 'var(--accent)' : '#17191C' }}
      >
        {label}
      </span>
    </span>
  );
}

function Connector() {
  return (
    <span aria-hidden="true" className="flex-1 flex items-center min-w-[24px]">
      <span className="h-px w-full" style={{ backgroundColor: 'var(--border-color)' }} />
      <svg width="11" height="11" viewBox="0 0 11 11" fill="none" className="shrink-0">
        <path
          d="M3 1.5 L7.5 5.5 L3 9.5"
          stroke="var(--accent)"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

export function GTMOSSystemDiagram() {
  return (
    <div className="w-full">
      {/* Desktop — single connected row filling the content width */}
      <div className="hidden lg:flex items-center">
        {stages.map((stage, i) => (
          <div key={stage.id} className="contents">
            <NodeCircle label={stage.label} isFinal={stage.id === 'revenue'} />
            {i < stages.length - 1 && <Connector />}
          </div>
        ))}
      </div>

      {/* Tablet / mobile — wrapped circle grid, no connectors */}
      <div className="lg:hidden grid grid-cols-2 sm:grid-cols-4 gap-x-6 gap-y-8 justify-items-center">
        {stages.map((stage) => (
          <NodeCircle key={stage.id} label={stage.label} isFinal={stage.id === 'revenue'} fixedSize />
        ))}
      </div>

      {/* Quiet caption beneath the diagram */}
      <p className="mt-8 lg:mt-10 text-center text-sm" style={{ color: 'var(--text-tertiary)' }}>
        One connected motion — from market to revenue.
      </p>
    </div>
  );
}
