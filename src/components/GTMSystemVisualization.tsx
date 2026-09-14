import { useState } from 'react';

const nodes = [
  { id: 'market', label: 'MARKET' },
  { id: 'icp', label: 'ICP' },
  { id: 'positioning', label: 'POSITIONING' },
  { id: 'demand', label: 'DEMAND' },
  { id: 'signals', label: 'SIGNALS' },
  { id: 'automation', label: 'AUTOMATION' },
  { id: 'pipeline', label: 'PIPELINE' },
  { id: 'revenue', label: 'REVENUE' },
];

export function GTMSystemVisualization() {
  const [activeNode, setActiveNode] = useState<string | null>(null);

  return (
    <div className="w-full">
      {/* Heading */}
      <div className="text-center mb-8">
        <div className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--accent)' }}>
          GTM Operating System
        </div>
      </div>

      {/* Flowchart - Horizontal */}
      <div className="flex items-center justify-center gap-0 overflow-x-auto pb-4">
        {nodes.map((node, index) => {
          const isActive = activeNode === node.id;
          const isLast = index === nodes.length - 1;

          return (
            <div key={node.id} className="flex items-center flex-shrink-0">
              {/* Node */}
              <div
                onMouseEnter={() => setActiveNode(node.id)}
                onMouseLeave={() => setActiveNode(null)}
                className="relative cursor-pointer transition-all duration-200"
                style={{
                  transform: isActive ? 'scale(1.1)' : 'scale(1)',
                }}
              >
                <div
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center border-2 transition-all duration-200"
                  style={{
                    backgroundColor: isActive ? 'var(--accent)' : 'var(--card-bg)',
                    borderColor: isActive ? 'var(--accent)' : 'var(--border-color)',
                    boxShadow: isActive ? '0 0 20px rgba(21, 94, 239, 0.3)' : 'none',
                  }}
                >
                  <span
                    className="text-[9px] sm:text-[11px] font-bold tracking-wide text-center px-1"
                    style={{
                      color: isActive ? '#ffffff' : 'var(--text-primary)',
                    }}
                  >
                    {node.label}
                  </span>
                </div>
              </div>

              {/* Arrow connector - Horizontal */}
              {!isLast && (
                <div className="flex items-center mx-2 sm:mx-3">
                  <div
                    className="h-0.5 w-6 sm:w-8 transition-all duration-200"
                    style={{
                      backgroundColor: activeNode === node.id || activeNode === nodes[index + 1].id
                        ? 'var(--accent)'
                        : 'var(--border-color)',
                    }}
                  />
                  <div
                    className="w-0 h-0 transition-all duration-200"
                    style={{
                      borderTop: '4px solid transparent',
                      borderBottom: '4px solid transparent',
                      borderLeft: activeNode === node.id || activeNode === nodes[index + 1].id
                        ? '6px solid var(--accent)'
                        : '6px solid var(--border-color)',
                    }}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
