import { useState, useRef } from 'react';
import { gtmStages, tools, getToolById, type Tool } from '../data/gtmOperatingSystem';
import { X, ArrowRight } from 'lucide-react';

type ViewMode = 'full' | 'lean' | 'enterprise';

export function GTMOperatingSystem() {
  const [hoveredStage, setHoveredStage] = useState<string | null>(null);
  const [selectedStage, setSelectedStage] = useState<string | null>(null);
  const [selectedTool, setSelectedTool] = useState<Tool | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>('full');
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
      return ['hubspot', 'ga4', 'clay', 'ahrefs', 'zapier'];
    }
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
    setSelectedStage(selectedStage === stageId ? null : stageId);
  };

  // Handle tool click
  const handleToolClick = (toolId: string) => {
    const tool = getToolById(toolId);
    if (tool) setSelectedTool(tool);
  };

  // Get stage angle with better distribution
  const getStageAngle = (index: number) => {
    return (index * 360) / gtmStages.length + rotation - 90; // Start from top
  };

  // Get position on circle with proper centering
  const getPositionOnCircle = (angle: number, radius: number, centerX = 400, centerY = 400) => {
    const radian = (angle * Math.PI) / 180;
    return {
      x: centerX + radius * Math.cos(radian),
      y: centerY + radius * Math.sin(radian)
    };
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Controls Header */}
      <div className="mb-12 flex flex-col sm:flex-row gap-6 items-start sm:items-center justify-between">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setViewMode('full')}
            className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all ${
              viewMode === 'full'
                ? 'bg-[var(--accent)] text-white shadow-md'
                : 'border border-[var(--border-color)] text-[var(--text-secondary)] hover:border-[var(--accent)] hover:text-[var(--accent)]'
            }`}
          >
            Full Stack
          </button>
          <button
            onClick={() => setViewMode('lean')}
            className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all ${
              viewMode === 'lean'
                ? 'bg-[var(--accent)] text-white shadow-md'
                : 'border border-[var(--border-color)] text-[var(--text-secondary)] hover:border-[var(--accent)] hover:text-[var(--accent)]'
            }`}
          >
            Lean Stack
          </button>
          <button
            onClick={() => setViewMode('enterprise')}
            className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all ${
              viewMode === 'enterprise'
                ? 'bg-[var(--accent)] text-white shadow-md'
                : 'border border-[var(--border-color)] text-[var(--text-secondary)] hover:border-[var(--accent)] hover:text-[var(--accent)]'
            }`}
          >
            Enterprise
          </button>
        </div>

        {/* System Health */}
        <div className="flex items-center gap-4 px-5 py-3 rounded-lg border" style={{ borderColor: 'var(--border-color)', backgroundColor: 'var(--bg-secondary)' }}>
          <span className="text-sm font-medium" style={{ color: 'var(--text-tertiary)' }}>
            System Health
          </span>
          <div className="flex items-center gap-3">
            <div className="w-32 h-2.5 rounded-full overflow-hidden" style={{ backgroundColor: 'var(--bg-tertiary)' }}>
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{
                  width: `${healthScore}%`,
                  backgroundColor: healthScore > 75 ? '#10b981' : healthScore > 50 ? '#f59e0b' : '#ef4444'
                }}
              />
            </div>
            <span className="text-lg font-bold tabular-nums" style={{ color: 'var(--text-primary)' }}>
              {healthScore}
            </span>
          </div>
        </div>
      </div>

      {/* Main Visualization Container */}
      <div className="relative mb-12">
        <div className="relative w-full aspect-square max-w-3xl mx-auto">
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
            {/* Background Circle */}
            <circle cx="400" cy="400" r="380" fill="none" stroke="var(--border-color)" strokeWidth="1" opacity="0.2" />
            <circle cx="400" cy="400" r="280" fill="none" stroke="var(--border-color)" strokeWidth="1" opacity="0.15" />
            <circle cx="400" cy="400" r="180" fill="none" stroke="var(--border-color)" strokeWidth="1" opacity="0.1" />

            {/* Center Hub */}
            <circle cx="400" cy="400" r="90" fill="var(--card-bg)" stroke="var(--border-color)" strokeWidth="2" />
            <circle cx="400" cy="400" r="85" fill="var(--bg-secondary)" />
            <text x="400" y="385" textAnchor="middle" className="text-xl font-bold" fill="var(--text-primary)" style={{ fontSize: '20px' }}>
              GTM
            </text>
            <text x="400" y="410" textAnchor="middle" className="text-sm font-semibold" fill="var(--text-secondary)" style={{ fontSize: '14px' }}>
              Operating
            </text>
            <text x="400" y="430" textAnchor="middle" className="text-sm font-semibold" fill="var(--text-secondary)" style={{ fontSize: '14px' }}>
              System
            </text>

            {/* Connection Lines */}
            {gtmStages.map((stage, index) => {
              const angle = getStageAngle(index);
              const pos = getPositionOnCircle(angle, 240);
              const nextIndex = (index + 1) % gtmStages.length;
              const nextAngle = getStageAngle(nextIndex);
              const nextPos = getPositionOnCircle(nextAngle, 240);
              
              return (
                <line
                  key={`line-${stage.id}`}
                  x1={pos.x}
                  y1={pos.y}
                  x2={nextPos.x}
                  y2={nextPos.y}
                  stroke="var(--border-color)"
                  strokeWidth="2"
                  opacity="0.3"
                  strokeDasharray="8 4"
                />
              );
            })}

            {/* GTM Stages */}
            {gtmStages.map((stage, index) => {
              const angle = getStageAngle(index);
              const pos = getPositionOnCircle(angle, 240);
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
                  className="transition-opacity duration-200"
                  opacity={isDimmed ? 0.3 : 1}
                >
                  {/* Stage Circle */}
                  <circle
                    cx={pos.x}
                    cy={pos.y}
                    r={isHovered || isSelected ? 55 : 48}
                    fill={isHovered || isSelected ? 'var(--accent)' : 'var(--card-bg)'}
                    stroke={isHovered || isSelected ? 'var(--accent)' : 'var(--border-color)'}
                    strokeWidth="3"
                    className="transition-all duration-200"
                  />
                  
                  {/* Stage Number */}
                  <text
                    x={pos.x}
                    y={pos.y - 10}
                    textAnchor="middle"
                    fill={isHovered || isSelected ? 'white' : 'var(--text-tertiary)'}
                    style={{ fontSize: '12px', fontWeight: 600 }}
                  >
                    {stage.number}
                  </text>
                  
                  {/* Stage Name */}
                  <text
                    x={pos.x}
                    y={pos.y + 10}
                    textAnchor="middle"
                    fill={isHovered || isSelected ? 'white' : 'var(--text-primary)'}
                    style={{ fontSize: '13px', fontWeight: 600 }}
                  >
                    {stage.name}
                  </text>

                  {/* Capabilities Ring (shown on hover) */}
                  {isHovered && stage.capabilities.map((cap, capIndex) => {
                    const capAngle = angle + (capIndex - (stage.capabilities.length - 1) / 2) * 20;
                    const capPos = getPositionOnCircle(capAngle, 320);
                    
                    return (
                      <g key={cap.id} className="animate-fade-in">
                        <circle
                          cx={capPos.x}
                          cy={capPos.y}
                          r="28"
                          fill="var(--bg-secondary)"
                          stroke="var(--border-color)"
                          strokeWidth="2"
                        />
                        <text
                          x={capPos.x}
                          y={capPos.y + 1}
                          textAnchor="middle"
                          dominantBaseline="middle"
                          fill="var(--text-secondary)"
                          style={{ fontSize: '10px', fontWeight: 500 }}
                        >
                          {cap.name.length > 10 ? cap.name.substring(0, 9) + '…' : cap.name}
                        </text>
                      </g>
                    );
                  })}

                  {/* Tools Ring (shown on hover) */}
                  {isHovered && stage.capabilities.flatMap(cap => cap.tools).filter(toolId => visibleToolIds.includes(toolId)).slice(0, 8).map((toolId, toolIndex) => {
                    const tool = getToolById(toolId);
                    if (!tool) return null;
                    
                    const toolAngle = angle + (toolIndex - 3.5) * 12;
                    const toolPos = getPositionOnCircle(toolAngle, 370);
                    
                    return (
                      <g
                        key={toolId}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleToolClick(toolId);
                        }}
                        style={{ cursor: 'pointer' }}
                        className="animate-fade-in"
                      >
                        <circle
                          cx={toolPos.x}
                          cy={toolPos.y}
                          r="20"
                          fill="var(--card-bg)"
                          stroke="var(--accent)"
                          strokeWidth="2"
                          className="transition-transform hover:scale-110"
                        />
                        <text
                          x={toolPos.x}
                          y={toolPos.y + 1}
                          textAnchor="middle"
                          dominantBaseline="middle"
                          fill="var(--text-primary)"
                          style={{ fontSize: '9px', fontWeight: 600 }}
                        >
                          {tool.name.length > 8 ? tool.name.substring(0, 7) + '…' : tool.name}
                        </text>
                      </g>
                    );
                  })}
                </g>
              );
            })}
          </svg>

          {/* Stage Info Panel - Positioned outside SVG */}
          {hoveredStage && (
            <div className="absolute top-0 left-0 right-0 bg-[var(--card-bg)] border-2 border-[var(--accent)] rounded-xl p-6 shadow-xl z-10">
              {(() => {
                const stage = gtmStages.find(s => s.id === hoveredStage);
                if (!stage) return null;
                return (
                  <>
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-sm font-bold px-3 py-1 rounded-lg" style={{ backgroundColor: 'var(--accent)', color: 'white' }}>
                        {stage.number}
                      </span>
                      <h3 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>
                        {stage.name}
                      </h3>
                    </div>
                    <p className="text-sm mb-4 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                      {stage.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {stage.capabilities.map(cap => (
                        <span key={cap.id} className="text-xs px-3 py-1.5 rounded-lg font-medium" style={{ backgroundColor: 'var(--bg-secondary)', color: 'var(--text-secondary)' }}>
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
      </div>

      {/* Tool Detail Drawer */}
      {selectedTool && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={() => setSelectedTool(null)}>
          <div className="bg-[var(--card-bg)] border-2 border-[var(--border-color)] rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="sticky top-0 bg-[var(--card-bg)] border-b-2 border-[var(--border-color)] p-6 flex items-start justify-between">
              <div>
                <h2 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>
                  {selectedTool.name}
                </h2>
                <p className="text-sm mt-1" style={{ color: 'var(--text-tertiary)' }}>
                  {selectedTool.category} {selectedTool.subcategory && `· ${selectedTool.subcategory}`}
                </p>
              </div>
              <button onClick={() => setSelectedTool(null)} className="p-2 hover:bg-[var(--bg-secondary)] rounded-lg transition-colors">
                <X size={24} style={{ color: 'var(--text-secondary)' }} />
              </button>
            </div>
            
            <div className="p-6 space-y-6">
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: 'var(--accent)' }}>Primary Use Case</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{selectedTool.primaryUseCase}</p>
              </div>

              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: 'var(--accent)' }}>Best For</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{selectedTool.bestFor}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-lg" style={{ backgroundColor: 'var(--bg-secondary)' }}>
                  <h3 className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: 'var(--accent)' }}>Budget</h3>
                  <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>{selectedTool.budget}</p>
                </div>
                <div className="p-4 rounded-lg" style={{ backgroundColor: 'var(--bg-secondary)' }}>
                  <h3 className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: 'var(--accent)' }}>Complexity</h3>
                  <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>{selectedTool.complexity}</p>
                </div>
              </div>

              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: 'var(--accent)' }}>Strengths</h3>
                <ul className="space-y-2">
                  {selectedTool.strengths.map((strength, i) => (
                    <li key={i} className="text-sm flex items-start gap-3" style={{ color: 'var(--text-secondary)' }}>
                      <span className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold" style={{ backgroundColor: 'var(--accent)', color: 'white' }}>✓</span>
                      <span className="leading-relaxed">{strength}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: 'var(--accent)' }}>Weaknesses</h3>
                <ul className="space-y-2">
                  {selectedTool.weaknesses.map((weakness, i) => (
                    <li key={i} className="text-sm flex items-start gap-3" style={{ color: 'var(--text-secondary)' }}>
                      <span className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold" style={{ backgroundColor: 'var(--bg-tertiary)', color: 'var(--text-tertiary)' }}>✗</span>
                      <span className="leading-relaxed">{weakness}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-lg border-2" style={{ borderColor: 'var(--accent)' }}>
                  <h3 className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: 'var(--accent)' }}>When to Use</h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{selectedTool.whyUse}</p>
                </div>
                <div className="p-4 rounded-lg border-2" style={{ borderColor: 'var(--border-color)' }}>
                  <h3 className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: 'var(--text-tertiary)' }}>When Not to Use</h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{selectedTool.whyNotUse}</p>
                </div>
              </div>

              {selectedTool.alternatives.length > 0 && (
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: 'var(--accent)' }}>Alternatives</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedTool.alternatives.map((alt, i) => (
                      <span key={i} className="text-sm px-3 py-1.5 rounded-lg font-medium" style={{ backgroundColor: 'var(--bg-secondary)', color: 'var(--text-secondary)' }}>
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
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold transition-all hover:shadow-lg"
                  style={{ backgroundColor: 'var(--accent)', color: 'white' }}
                >
                  Visit Website <ArrowRight size={16} />
                </a>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Mobile View - Enhanced */}
      <div className="md:hidden mt-12">
        <div className="space-y-4">
          {gtmStages.map(stage => (
            <button
              key={stage.id}
              onClick={() => handleStageClick(stage.id)}
              className="w-full p-5 rounded-xl border-2 text-left transition-all hover:shadow-lg"
              style={{ 
                borderColor: selectedStage === stage.id ? 'var(--accent)' : 'var(--border-color)', 
                backgroundColor: 'var(--card-bg)',
                boxShadow: selectedStage === stage.id ? '0 4px 12px rgba(0,0,0,0.1)' : 'none'
              }}
            >
              <div className="flex items-center gap-4">
                <span className="text-sm font-bold px-3 py-1.5 rounded-lg" style={{ backgroundColor: 'var(--accent)', color: 'white' }}>
                  {stage.number}
                </span>
                <span className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>
                  {stage.name}
                </span>
                <ArrowRight 
                  size={20} 
                  className="ml-auto transition-transform"
                  style={{ 
                    color: 'var(--text-tertiary)',
                    transform: selectedStage === stage.id ? 'rotate(90deg)' : 'rotate(0deg)'
                  }} 
                />
              </div>
              {selectedStage === stage.id && (
                <div className="mt-4 pt-4 border-t-2" style={{ borderColor: 'var(--border-color)' }}>
                  <p className="text-sm mb-4 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                    {stage.description}
                  </p>
                  <div className="space-y-3">
                    {stage.capabilities.map(cap => (
                      <div key={cap.id} className="pl-4 border-l-4" style={{ borderColor: 'var(--accent)' }}>
                        <div className="text-sm font-bold mb-1" style={{ color: 'var(--text-primary)' }}>
                          {cap.name}
                        </div>
                        <div className="text-xs mb-2" style={{ color: 'var(--text-tertiary)' }}>
                          {cap.description}
                        </div>
                        {cap.tools.length > 0 && (
                          <div className="flex flex-wrap gap-2">
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
                                  className="text-xs px-3 py-1.5 rounded-lg border-2 font-medium hover:border-[var(--accent)] transition-all"
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
