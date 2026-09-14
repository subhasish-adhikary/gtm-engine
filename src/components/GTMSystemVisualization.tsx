import { useEffect, useRef, useState } from 'react';

const nodes = [
  { id: 'market', label: 'MARKET', x: 400, y: 80 },
  { id: 'icp', label: 'ICP', x: 400, y: 160 },
  { id: 'positioning', label: 'POSITIONING', x: 400, y: 240 },
  { id: 'demand', label: 'DEMAND', x: 400, y: 320 },
  { id: 'signals', label: 'SIGNALS', x: 400, y: 400 },
  { id: 'automation', label: 'AUTOMATION', x: 400, y: 480 },
  { id: 'pipeline', label: 'PIPELINE', x: 400, y: 560 },
  { id: 'revenue', label: 'REVENUE', x: 400, y: 640 },
];

export function GTMSystemVisualization() {
  const [activeNode, setActiveNode] = useState<string | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      setMousePosition({
        x: ((e.clientX - rect.left) / rect.width) * 800,
        y: ((e.clientY - rect.top) / rect.height) * 720,
      });
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
      return () => container.removeEventListener('mousemove', handleMouseMove);
    }
  }, []);

  const getNodeOffset = (node: typeof nodes[0]) => {
    const distance = Math.sqrt(
      Math.pow(mousePosition.x - node.x, 2) + Math.pow(mousePosition.y - node.y, 2)
    );
    const maxDistance = 200;
    const offset = Math.max(0, (maxDistance - distance) / maxDistance) * 8;
    return offset;
  };

  return (
    <div ref={containerRef} className="relative w-full aspect-[4/5] max-w-md mx-auto">
      <svg viewBox="0 0 800 720" className="w-full h-full">
        {/* Connection lines */}
        {nodes.map((node, index) => {
          if (index === nodes.length - 1) return null;
          const nextNode = nodes[index + 1];
          const isActive = activeNode === node.id || activeNode === nextNode.id;
          
          return (
            <g key={`line-${node.id}`}>
              <line
                x1={node.x}
                y1={node.y + 20}
                x2={nextNode.x}
                y2={nextNode.y - 20}
                stroke={isActive ? 'var(--accent)' : 'var(--border-color)'}
                strokeWidth={isActive ? 2 : 1}
                strokeDasharray={isActive ? '0' : '4 4'}
                className="transition-all duration-300"
              />
              {/* Arrow */}
              <polygon
                points={`${nextNode.x},${nextNode.y - 25} ${nextNode.x - 5},${nextNode.y - 35} ${nextNode.x + 5},${nextNode.y - 35}`}
                fill={isActive ? 'var(--accent)' : 'var(--border-color)'}
                className="transition-all duration-300"
              />
            </g>
          );
        })}

        {/* Nodes */}
        {nodes.map((node) => {
          const isActive = activeNode === node.id;
          const offset = getNodeOffset(node);
          
          return (
            <g
              key={node.id}
              onMouseEnter={() => setActiveNode(node.id)}
              onMouseLeave={() => setActiveNode(null)}
              className="cursor-pointer"
            >
              {/* Node circle */}
              <circle
                cx={node.x}
                cy={node.y}
                r={isActive ? 32 : 28}
                fill={isActive ? 'var(--accent)' : 'var(--card-bg)'}
                stroke={isActive ? 'var(--accent)' : 'var(--border-color)'}
                strokeWidth={2}
                style={{
                  transform: `translate(0, ${-offset}px)`,
                  transition: 'all 0.3s ease-out',
                }}
              />
              
              {/* Node label */}
              <text
                x={node.x}
                y={node.y + 4}
                textAnchor="middle"
                fontSize="11"
                fontWeight="600"
                fill={isActive ? '#ffffff' : 'var(--text-primary)'}
                style={{
                  transform: `translate(0, ${-offset}px)`,
                  transition: 'all 0.3s ease-out',
                  letterSpacing: '0.5px',
                }}
              >
                {node.label}
              </text>
            </g>
          );
        })}
      </svg>

      {/* Title */}
      <div className="absolute top-0 left-0 right-0 text-center">
        <div className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: 'var(--accent)' }}>
          GTM Operating System
        </div>
      </div>
    </div>
  );
}
