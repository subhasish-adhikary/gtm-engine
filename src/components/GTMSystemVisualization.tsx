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
    <div className="flex flex-col items-center w-full">
      {/* Heading */}
      <div className="text-center mb-8">
        <div className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--accent)' }}>
          GTM Operating System
        </div>
      </div>

      {/* Flowchart */}
      <div className="flex flex-col items-center gap-0">
        {nodes.map((node, index) => {
          const isActive = activeNode === node.id;
          const isLast = index === nodes.length - 1;

          return (
            <div key={node.id} className="flex flex-col items-center">
              {/* Node */}
              <div
                onMouseEnter={() => setActiveNode(node.id)}
                onMouseLeave={() => setActiveNode(null)}
                className="relative cursor-pointer transition-all duration-200"
                style={{
                  transform: isActive ? 'scale(1.05)' : 'scale(1)',
                }}
              >
                <div
                  className="w-20 h-20 sm:w-24 sm:h-24 rounded-full flex items-center justify-center border-2 transition-all duration-200"
                  style={{
                    backgroundColor: isActive ? 'var(--accent)' : 'var(--card-bg)',
                    borderColor: isActive ? 'var(--accent)' : 'var(--border-color)',
                    boxShadow: isActive ? '0 0 20px rgba(21, 94, 239, 0.3)' : 'none',
                  }}
                >
                  <span
                    className="text-xs sm:text-sm font-bold tracking-wide"
                    style={{
                      color: isActive ? '#ffffff' : 'var(--text-primary)',
                    }}
                  >
                    {node.label}
                  </span>
                </div>
              </div>

              {/* Arrow connector */}
              {!isLast && (
                <div className="flex flex-col items-center my-2">
                  <div
                    className="w-0.5 h-6 sm:h-8 transition-all duration-200"
                    style={{
                      backgroundColor: activeNode === node.id || activeNode === nodes[index + 1].id
                        ? 'var(--accent)'
                        : 'var(--border-color)',
                    }}
                  />
                  <div
                    className="w-0 h-0 transition-all duration-200"
                    style={{
                      borderLeft: '6px solid transparent',
                      borderRight: '6px solid transparent',
                      borderTop: activeNode === node.id || activeNode === nodes[index + 1].id
                        ? '8px solid var(--accent)'
                        : '8px solid var(--border-color)',
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
