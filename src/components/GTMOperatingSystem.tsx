import { useState, useEffect, useRef } from 'react';
import { gtmStages, tools, getToolById, type GTMStage, type Tool } from '../data/gtmOperatingSystem';
import { X } from 'lucide-react';

type ViewMode = 'full' | 'lean' | 'enterprise' | 'budget';
type FilterCategory = 'all' | 'intelligence' | 'demand' | 'sales' | 'retention' | 'measurement';

export function GTMOperatingSystem() {
  const [hoveredStage, setHoveredStage] = useState<string | null>(null);
  const [selectedStage, setSelectedStage] = useState<string | null>(null);
  const [selectedTool, setSelectedTool] = useState<Tool | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>('full');
  const [filter, setFilter] = useState<FilterCategory>('all');
  const [rotation, setRotation] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState(0);
  const svgRef = useRef<SVGSVGElement>(null);

  // Calculate system health based on coverage
  const calculateHealth = () => {
    const stagesWithTools = gtmStages.filter(stage => 
      stage.capabilities.some(cap => cap.tools.length > 0)
    ).length;
    const coverage = (stagesWithTools / gtmStages.length) * 100;
    return Math.round(coverage);
  };

  const healthScore = calculateHealth();

  // Filter tools based on view mode
  const getVisibleTools = () => {
    if (viewMode === 'lean') {
      // Show only essential tools
      return ['hubspot', 'ga4', 'clay', 'ahrefs', 'zapier'];
    }
    if (viewMode === 'enterprise') {
      // Show all tools
      return tools.map(t => t.id);
    }
    // Full view - show all tools
    return tools.map(t => t.id);
  };

  const visibleToolIds = getVisibleTools();

  // Handle rotation
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart(e.clientX - rotation);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      setRotation(e.clientX - dragStart);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Handle stage click
  const handleStageClick = (stageId: string) => {
    if (selectedStage === stageId) {
      setSelectedStage(null);
    } else {
      setSelectedStage(stageId);
    }
  };

  // Handle tool click
  const handleToolClick = (toolId: string) => {
    const tool = getToolById(toolId);
    if (tool) {
      setSelectedTool(tool);
    }
  };

  // Get stage angle
  const getStageAngle = (index: number) => {
    return (index * 360) / gtmStages.length + rotation;
  };

  // Get position on circle
  const getPositionOnCircle = (angle: number, radius: number) => {
    const radian = (angle * Math.PI) / 180;
    return {
      x: 400 + radius * Math.cos(radian),
      y: 400 + radius * Math.sin(radian)
    };
  };

  return (
    <div className="w-full">
      {/* Controls */}
      <div className="mb-8 flex flex-wrap gap-4 items-center justify-between">
        <div className="flex gap-2">
          <button
            onClick={() => setViewMode('full')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              viewMode === 'full'
                ? 'bg-[var(--accent)] text-white'
                : 'border border-[var(--border-color)] text-[var(--text-secondary)]'
            }`}
          >
            Full Stack
          </button>
          <button
            onClick={() => setViewMode('lean')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              viewMode === 'lean'
                ? 'bg-[var(--accent)] text-white'
                : 'border border-[var(--border-color)] text-[var(--text-secondary)]'
            }`}
          >
            Lean Stack
          </button>
          <button
            onClick={() => setViewMode('enterprise')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              viewMode === 'enterprise'
                ? 'bg-[var(--accent)] text-white'
                : 'border border-[var(--border-color)] text-[var(--text-secondary)]'
            }`}
          >
            Enterprise
          </button>
        </div>

        {/* System Health */}
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium" style={{ color: 'var(--text-tertiary)' }}>
            System Health
          </span>
          <div className="flex items-center gap-2">
            <div className="w-24 h-2 rounded-full" style={{ backgroundColor: 'var(--bg-tertiary)' }}>
              <div
                className="h-full rounded-full transition-all"
                style={{
                  width: `${healthScore}%`,
                  backgroundColor: healthScore > 75 ? '#10b981' : healthScore > 50 ? '#f59e0b' : '#ef4444'
                }}
              />
            </div>
            <span className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
              {healthScore}
            </span>
          </div>
        </div>
      </div>

      {/* Main Visualization */}
      <div className="relative w-full aspect-square max-w-4xl mx-auto">
        <svg
          ref={svgRef}
          viewBox="0 0 800 800"
          className="w-full h-full"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
        >
          {/* Center Circle */}
          <circle cx="400" cy="400" r="120" fill="var(--bg-secondary)" stroke="var(--border-color)" strokeWidth="2" />
          <text x="400" y="380" textAnchor="middle" className="text-2xl font-bold" fill="var(--text-primary)">
            GTM
          </text>
          <text x="400" y="410" textAnchor="middle" className="text-2xl font-bold" fill="var(--text-primary)">
            Operating
          </text>
          <text x="400" y="440" textAnchor="middle" className="text-2xl font-bold" fill="var(--text-primary)">
            System
          </text>

          {/* GTM Stages */}
          {gtmStages.map((stage, index) => {
            const angle = getStageAngle(index);
            const pos = getPositionOnCircle(angle, 200);
            const isHovered = hoveredStage === stage.id;
            const isSelected = selectedStage === stage.id;
            const isDimmed = hoveredStage && !isHovered;

            return (
              <g
                key={stage.id}
                onMouseEnter={() => setHoveredStage(stage.id)}
                onMouseLeave={() => setHoveredStage(null)}
                onClick={() => handleStageClick(stage.id)}
                style={{ cursor: 'pointer' }}
              >
                {/* Stage Circle */}
                <circle
                  cx={pos.x}
                  cy={pos.y}
                  r={isSelected ? 50 : 40}
                  fill={isHovered || isSelected ? 'var(--accent)' : 'var(--card-bg)'}
                  stroke="var(--border-color)"
                  strokeWidth="2"
                  opacity={isDimmed ? 0.3 : 1}
                  className="transition-all duration-200"
                />
                
                {/* Stage Number */}
                <text
                  x={pos.x}
                  y={pos.y - 8}
                  textAnchor="middle"
                  className="text-xs font-semibold"
                  fill={isHovered || isSelected ? 'white' : 'var(--text-tertiary)'}
                  opacity={isDimmed ? 0.3 : 1}
                >
                  {stage.number}
                </text>
                
                {/* Stage Name */}
                <text
                  x={pos.x}
                  y={pos.y + 8}
                  textAnchor="middle"
                  className="text-sm font-semibold"
                  fill={isHovered || isSelected ? 'white' : 'var(--text-primary)'}
                  opacity={isDimmed ? 0.3 : 1}
                >
                  {stage.name}
                </text>

                {/* Capabilities (shown on hover) */}
                {isHovered && stage.capabilities.map((cap, capIndex) => {
                  const capAngle = angle + (capIndex - stage.capabilities.length / 2) * 15;
                  const capPos = getPositionOnCircle(capAngle, 280);
                  
                  return (
                    <g key={cap.id}>
                      <circle
                        cx={capPos.x}
                        cy={capPos.y}
                        r="25"
                        fill="var(--bg-secondary)"
                        stroke="var(--border-color)"
                        strokeWidth="1"
                        className="animate-fade-in"
                      />
                      <text
                        x={capPos.x}
                        y={capPos.y}
                        textAnchor="middle"
                        dominantBaseline="middle"
                        className="text-xs"
                        fill="var(--text-secondary)"
                      >
                        {cap.name.split(' ')[0]}
                      </text>
                    </g>
                  );
                })}

                {/* Tools (shown on hover) */}
                {isHovered && stage.capabilities.flatMap(cap => cap.tools).filter(toolId => visibleToolIds.includes(toolId)).map((toolId, toolIndex) => {
                  const tool = getToolById(toolId);
                  if (!tool) return null;
                  
                  const toolAngle = angle + (toolIndex - 2) * 10;
                  const toolPos = getPositionOnCircle(toolAngle, 340);
                  
                  return (
                    <g
                      key={toolId}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleToolClick(toolId);
                      }}
                      style={{ cursor: 'pointer' }}
                    >
                      <circle
                        cx={toolPos.x}
                        cy={toolPos.y}
                        r="18"
                        fill="var(--card-bg)"
                        stroke="var(--accent)"
                        strokeWidth="1.5"
                        className="animate-fade-in hover:scale-110 transition-transform"
                      />
                      <text
                        x={toolPos.x}
                        y={toolPos.y}
                        textAnchor="middle"
                        dominantBaseline="middle"
                        className="text-xs font-medium"
                        fill="var(--text-primary)"
                      >
                        {tool.name.split(' ')[0]}
                      </text>
                    </g>
                  );
                })}
              </g>
            );
          })}

          {/* Connection Lines (subtle) */}
          {gtmStages.map((stage, index) => {
            const angle = getStageAngle(index);
            const pos = getPositionOnCircle(angle, 200);
            const nextIndex = (index + 1) % gtmStages.length;
            const nextAngle = getStageAngle(nextIndex);
            const nextPos = getPositionOnCircle(nextAngle, 200);
            
            return (
              <line
                key={`line-${stage.id}`}
                x1={pos.x}
                y1={pos.y}
                x2={nextPos.x}
                y2={nextPos.y}
                stroke="var(--border-color)"
                strokeWidth="1"
                opacity="0.3"
                strokeDasharray="4 4"
              />
            );
          })}
        </svg>

        {/* Stage Info Panel */}
        {hoveredStage && (
          <div className="absolute top-4 left-4 right-4 bg-[var(--card-bg)] border border-[var(--border-color)] rounded-lg p-4 shadow-lg">
            {(() => {
              const stage = gtmStages.find(s => s.id === hoveredStage);
              if (!stage) return null;
              return (
                <>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-semibold px-2 py-0.5 rounded" style={{ backgroundColor: 'var(--accent)', color: 'white' }}>
                      {stage.number}
                    </span>
                    <h3 className="text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>
                      {stage.name}
                    </h3>
                  </div>
                  <p className="text-sm mb-3" style={{ color: 'var(--text-secondary)' }}>
                    {stage.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {stage.capabilities.map(cap => (
                      <span key={cap.id} className="text-xs px-2 py-1 rounded" style={{ backgroundColor: 'var(--bg-secondary)', color: 'var(--text-secondary)' }}>
                        {cap.name}
                      </span>
                    ))}
                  </div>
                </>
              );
            })()}
          </div>
        )}
      </div>

      {/* Tool Detail Drawer */}
      {selectedTool && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" onClick={() => setSelectedTool(null)}>
          <div className="bg-[var(--card-bg)] border border-[var(--border-color)] rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="sticky top-0 bg-[var(--card-bg)] border-b border-[var(--border-color)] p-6 flex items-start justify-between">
              <div>
                <h2 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>
                  {selectedTool.name}
                </h2>
                <p className="text-sm mt-1" style={{ color: 'var(--text-tertiary)' }}>
                  {selectedTool.category} {selectedTool.subcategory && `· ${selectedTool.subcategory}`}
                </p>
              </div>
              <button onClick={() => setSelectedTool(null)} className="p-2 hover:bg-[var(--bg-secondary)] rounded-md transition-colors">
                <X size={20} style={{ color: 'var(--text-secondary)' }} />
              </button>
            </div>
            
            <div className="p-6 space-y-6">
              <div>
                <h3 className="text-sm font-semibold mb-2" style={{ color: 'var(--text-tertiary)' }}>Primary Use Case</h3>
                <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{selectedTool.primaryUseCase}</p>
              </div>

              <div>
                <h3 className="text-sm font-semibold mb-2" style={{ color: 'var(--text-tertiary)' }}>Best For</h3>
                <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{selectedTool.bestFor}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-semibold mb-2" style={{ color: 'var(--text-tertiary)' }}>Budget</h3>
                  <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{selectedTool.budget}</p>
                </div>
                <div>
                  <h3 className="text-sm font-semibold mb-2" style={{ color: 'var(--text-tertiary)' }}>Complexity</h3>
                  <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{selectedTool.complexity}</p>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-semibold mb-2" style={{ color: 'var(--text-tertiary)' }}>Strengths</h3>
                <ul className="space-y-1">
                  {selectedTool.strengths.map((strength, i) => (
                    <li key={i} className="text-sm flex items-start gap-2" style={{ color: 'var(--text-secondary)' }}>
                      <span style={{ color: 'var(--accent)' }}>✓</span>
                      {strength}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-sm font-semibold mb-2" style={{ color: 'var(--text-tertiary)' }}>Weaknesses</h3>
                <ul className="space-y-1">
                  {selectedTool.weaknesses.map((weakness, i) => (
                    <li key={i} className="text-sm flex items-start gap-2" style={{ color: 'var(--text-secondary)' }}>
                      <span style={{ color: 'var(--text-tertiary)' }}>✗</span>
                      {weakness}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-sm font-semibold mb-2" style={{ color: 'var(--text-tertiary)' }}>When to Use</h3>
                <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{selectedTool.whyUse}</p>
              </div>

              <div>
                <h3 className="text-sm font-semibold mb-2" style={{ color: 'var(--text-tertiary)' }}>When Not to Use</h3>
                <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{selectedTool.whyNotUse}</p>
              </div>

              {selectedTool.alternatives.length > 0 && (
                <div>
                  <h3 className="text-sm font-semibold mb-2" style={{ color: 'var(--text-tertiary)' }}>Alternatives</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedTool.alternatives.map((alt, i) => (
                      <span key={i} className="text-xs px-2 py-1 rounded" style={{ backgroundColor: 'var(--bg-secondary)', color: 'var(--text-secondary)' }}>
                        {alt}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {selectedTool.website && (
                <a
                  href={selectedTool.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-4 py-2 rounded-md text-sm font-medium"
                  style={{ backgroundColor: 'var(--accent)', color: 'white' }}
                >
                  Visit Website →
                </a>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Mobile View */}
      <div className="md:hidden mt-8">
        <div className="space-y-3">
          {gtmStages.map(stage => (
            <button
              key={stage.id}
              onClick={() => handleStageClick(stage.id)}
              className="w-full p-4 rounded-lg border text-left transition-colors hover:border-[var(--accent)]"
              style={{ borderColor: selectedStage === stage.id ? 'var(--accent)' : 'var(--border-color)', backgroundColor: 'var(--card-bg)' }}
            >
              <div className="flex items-center gap-3">
                <span className="text-xs font-semibold px-2 py-0.5 rounded" style={{ backgroundColor: 'var(--accent)', color: 'white' }}>
                  {stage.number}
                </span>
                <span className="font-semibold" style={{ color: 'var(--text-primary)' }}>
                  {stage.name}
                </span>
              </div>
              {selectedStage === stage.id && (
                <div className="mt-3 pt-3 border-t" style={{ borderColor: 'var(--border-color)' }}>
                  <p className="text-sm mb-3" style={{ color: 'var(--text-secondary)' }}>
                    {stage.description}
                  </p>
                  <div className="space-y-2">
                    {stage.capabilities.map(cap => (
                      <div key={cap.id} className="pl-4 border-l-2" style={{ borderColor: 'var(--border-color)' }}>
                        <div className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
                          {cap.name}
                        </div>
                        <div className="text-xs mt-1" style={{ color: 'var(--text-tertiary)' }}>
                          {cap.description}
                        </div>
                        {cap.tools.length > 0 && (
                          <div className="flex flex-wrap gap-1 mt-2">
                            {cap.tools.filter(toolId => visibleToolIds.includes(toolId)).map(toolId => {
                              const tool = getToolById(toolId);
                              if (!tool) return null;
                              return (
                                <button
                                  key={toolId}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleToolClick(toolId);
                                  }}
                                  className="text-xs px-2 py-0.5 rounded border hover:border-[var(--accent)] transition-colors"
                                  style={{ borderColor: 'var(--border-color)', color: 'var(--text-secondary)' }}
                                >
                                  {tool.name}
                                </button>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
