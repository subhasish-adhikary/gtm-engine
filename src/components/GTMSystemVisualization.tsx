import { useEffect, useRef, useState } from 'react';

const nodes = [
  { id: 'market', label: 'MARKET', x: 400, y: 60 },
  { id: 'icp', label: 'ICP', x: 400, y: 160 },
  { id: 'positioning', label: 'POSITIONING', x: 400, y: 260 },
  { id: 'demand', label: 'DEMAND', x: 400, y: 360 },
  { id: 'signals', label: 'SIGNALS', x: 400, y: 460 },
  { id: 'automation', label: 'AUTOMATION', x: 400, y: 560 },
  { id: 'pipeline', label: 'PIPELINE', x: 400, y: 660 },
  { id: 'revenue', label: 'REVENUE', x: 400, y: 760 },
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
    <div ref={containerRef} className="relative w-full" style={{ minHeight: '500px' }}>
      <svg viewBox="0 0 800 820" className="w-full h-auto" preserveAspectRatio="xMidYMid meet">
        {/* Connection lines */}
        {nodes.map((node, index) => {
          if (index === nodes.length - 1) return null;
          const nextNode = nodes[index + 1];
          const isActive = activeNode === node.id || activeNode === nextNode.id;
          
          return (
            <g key={`line-${node.id}`}>
              <line
                x1={node.x}
                y1={node.y + 35}
                x2={nextNode.x}
                y2={nextNode.y - 35}
                stroke={isActive ? 'var(--accent)' : 'var(--border-color)'}
                strokeWidth={isActive ? 3 : 2}
                strokeDasharray={isActive ? '0' : '6 4'}
                className="transition-all duration-300"
              />
              {/* Arrow */}
              <polygon
                points={`${nextNode.x},${nextNode.y - 40} ${nextNode.x - 8},${nextNode.y - 52} ${nextNode.x + 8},${nextNode.y - 52}`}
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
                r={isActive ? 45 : 40}
                fill={isActive ? 'var(--accent)' : 'var(--card-bg)'}
                stroke={isActive ? 'var(--accent)' : 'var(--border-color)'}
                strokeWidth={3}
                style={{
                  transform: `translate(0, ${-offset}px)`,
                  transition: 'all 0.3s ease-out',
                }}
              />
              
              {/* Node label */}
              <text
                x={node.x}
                y={node.y + 5}
                textAnchor="middle"
                fontSize="14"
                fontWeight="700"
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
        <div className="text-sm font-semibold uppercase tracking-wider mb-2" style={{ color: 'var(--accent)' }}>
          GTM Operating System
        </div>
      </div>
    </div>
  );
}
