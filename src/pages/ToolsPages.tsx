import { useState, useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Search, X, ExternalLink, Filter } from 'lucide-react';
import { tools } from '../data/content';
import { gtmStacks } from '../data/gtmStacks';
import { SectionHeader, Card, Tag, Breadcrumb } from '../components/UI';
import { GTMBudgetLab, GTMDiagnostic, GTMStackBuilder } from './ToolsAdvanced';
import { MarketingAutomationPlanner, AdCopyAnalyzer, ContentOpportunityAnalyzer, GTMExperimentPlanner, AIVisibilityDiagnostic } from './ToolsAdvanced2';

export function ToolsPage() {
  return (
    <div className="py-12 sm:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumb items={[{ label: 'Home', path: '/' }, { label: 'Tools' }]} />
        <SectionHeader eyebrow="Interactive Tools" title="Strategy toolkits for marketers" description="Decision-focused tools that answer 'What should I do?' — not just 'What does this mean?'" />
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool) => (
            <Link key={tool.id} to={`/tools/${tool.id}`}>
              <Card hoverable>
                <div className="flex items-center justify-between mb-3">
                  <Tag>{tool.category}</Tag>
                  <span className="text-xs font-medium px-2 py-0.5 rounded" style={{ backgroundColor: '#dcfce7', color: '#166534' }}>Active</span>
                </div>
                <h3 className="text-base font-semibold" style={{ color: 'var(--text-primary)' }}>{tool.title}</h3>
                <p className="mt-2 text-sm leading-relaxed" style={{ color: 'var(--text-tertiary)' }}>{tool.description}</p>
              </Card>
            </Link>
          ))}
        </div>

        <div className="mt-16 p-8 rounded-lg border text-center" style={{ borderColor: 'var(--border-color)', backgroundColor: 'var(--bg-secondary)' }}>
          <h3 className="text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>Need help applying these tools to your strategy?</h3>
          <p className="mt-3 text-sm max-w-lg mx-auto" style={{ color: 'var(--text-tertiary)' }}>
            I work with B2B companies on GTM strategy, marketing automation, and AI in marketing. Let's discuss your specific challenges.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <Link to="/contact" className="inline-flex items-center px-5 py-2.5 rounded-md text-sm font-medium" style={{ backgroundColor: 'var(--accent)', color: '#fff' }}>
              Get in Touch
            </Link>
            <Link to="/gtm-stack" className="inline-flex items-center px-5 py-2.5 rounded-md text-sm font-medium border" style={{ borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}>
              Explore 79+ Tool Stacks
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ToolPage() {
  const { toolId } = useParams();
  const tool = tools.find(t => t.id === toolId);
  
  if (!tool) {
    return (
      <div className="py-32 text-center">
        <h2 className="text-xl font-semibold" style={{ color: 'var(--text-primary)' }}>Tool not found</h2>
        <Link to="/tools" className="mt-4 inline-block text-sm" style={{ color: 'var(--accent)' }}>← Back to Tools</Link>
      </div>
    );
  }

  const toolComponents: Record<string, React.ComponentType> = {
    'channel-planner': ChannelPlannerTool,
    'gtm-diagnostic': GTMDiagnostic,
    'budget-lab': GTMBudgetLab,
    'stack-builder': GTMStackBuilder,
    'automation-planner': MarketingAutomationPlanner,
    'copy-analyzer': AdCopyAnalyzer,
    'content-opportunity': ContentOpportunityAnalyzer,
    'experiment-planner': GTMExperimentPlanner,
    'geo-diagnostic': AIVisibilityDiagnostic,
  };

  const ToolComponent = toolComponents[toolId as string];
  
  if (!ToolComponent) {
    return (
      <div className="py-32 text-center">
        <h2 className="text-xl font-semibold" style={{ color: 'var(--text-primary)' }}>Tool coming soon</h2>
        <Link to="/tools" className="mt-4 inline-block text-sm" style={{ color: 'var(--accent)' }}>← Back to Tools</Link>
      </div>
    );
  }

  return <ToolComponent />;
}

function ChannelPlannerTool() {
  const [inputs, setInputs] = useState({
    icp: '', acv: '', budget: '', salesCycle: '', channels: [] as string[], goals: '',
  });
  const [showOutput, setShowOutput] = useState(false);
  const channelOptions = ['LinkedIn', 'Content/SEO', 'Paid Search', 'Paid Social', 'Outbound', 'Events', 'Partnerships'];

  const toggleChannel = (ch: string) => setInputs(p => ({ ...p, channels: p.channels.includes(ch) ? p.channels.filter(c => c !== ch) : [...p.channels, ch] }));

  const getRecommendation = () => {
    const acv = parseInt(inputs.acv) || 0;
    if (acv > 50000) return 'Focus on high-touch channels: LinkedIn, Outbound, and Events. Your ACV justifies relationship-based selling.';
    if (acv > 10000) return 'Balance high-touch and scalable: LinkedIn, Content/SEO, and Paid Search.';
    return 'Prioritize scalable channels: Content/SEO, Paid Search, and Paid Social.';
  };

  if (!showOutput) {
    return (
      <div className="py-12 sm:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[{ label: 'Home', path: '/' }, { label: 'Tools', path: '/tools' }, { label: 'Channel Planner' }]} />
          <h1 className="text-3xl font-semibold" style={{ color: 'var(--text-primary)' }}>Marketing Channel Planner</h1>
          <p className="mt-3 text-base" style={{ color: 'var(--text-secondary)' }}>Given your ICP, ACV, budget, and sales cycle — which channels should you prioritize?</p>
          <Card className="mt-8">
            <form onSubmit={(e) => { e.preventDefault(); setShowOutput(true); }}>
              <div className="mb-6">
                <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--text-primary)' }}>Ideal Customer Profile</label>
                <input type="text" required value={inputs.icp} onChange={(e) => setInputs({ ...inputs, icp: e.target.value })} className="w-full px-3 py-2.5 rounded-md border text-sm" style={{ backgroundColor: 'var(--bg-primary)', borderColor: 'var(--border-color)', color: 'var(--text-primary)' }} placeholder="e.g., VP Marketing at B2B SaaS" />
              </div>
              <div className="mb-6">
                <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--text-primary)' }}>Average Contract Value (ACV)</label>
                <input type="number" required value={inputs.acv} onChange={(e) => setInputs({ ...inputs, acv: e.target.value })} className="w-full px-3 py-2.5 rounded-md border text-sm" style={{ backgroundColor: 'var(--bg-primary)', borderColor: 'var(--border-color)', color: 'var(--text-primary)' }} placeholder="e.g., 25000" />
              </div>
              <div className="mb-6">
                <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--text-primary)' }}>Monthly Budget</label>
                <input type="number" required value={inputs.budget} onChange={(e) => setInputs({ ...inputs, budget: e.target.value })} className="w-full px-3 py-2.5 rounded-md border text-sm" style={{ backgroundColor: 'var(--bg-primary)', borderColor: 'var(--border-color)', color: 'var(--text-primary)' }} placeholder="e.g., 50000" />
              </div>
              <div className="mb-6">
                <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--text-primary)' }}>Sales Cycle</label>
                <select required value={inputs.salesCycle} onChange={(e) => setInputs({ ...inputs, salesCycle: e.target.value })} className="w-full px-3 py-2.5 rounded-md border text-sm" style={{ backgroundColor: 'var(--bg-primary)', borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}>
                  <option value="">Select...</option>
                  <option value="< 30 days">Less than 30 days</option>
                  <option value="30-90 days">30-90 days</option>
                  <option value="90-180 days">90-180 days</option>
                  <option value="> 180 days">More than 180 days</option>
                </select>
              </div>
              <div className="mb-6">
                <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--text-primary)' }}>Current Channels</label>
                <div className="flex flex-wrap gap-2">
                  {channelOptions.map(ch => (
                    <button key={ch} type="button" onClick={() => toggleChannel(ch)} className="px-3 py-1.5 rounded-full text-xs font-medium border transition-colors" style={{ borderColor: inputs.channels.includes(ch) ? 'var(--accent)' : 'var(--border-color)', backgroundColor: inputs.channels.includes(ch) ? 'var(--accent)' : 'transparent', color: inputs.channels.includes(ch) ? '#fff' : 'var(--text-secondary)' }}>{ch}</button>
                  ))}
                </div>
              </div>
              <button type="submit" className="px-6 py-3 rounded-md text-sm font-medium" style={{ backgroundColor: 'var(--accent)', color: '#fff' }}>Generate Recommendation</button>
            </form>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="py-12 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumb items={[{ label: 'Home', path: '/' }, { label: 'Tools', path: '/tools' }, { label: 'Channel Planner' }]} />
        <h1 className="text-3xl font-semibold" style={{ color: 'var(--text-primary)' }}>Channel Recommendation</h1>
        <Card className="mt-8">
          <div className="p-6 rounded-lg border-2" style={{ borderColor: 'var(--accent)', backgroundColor: 'var(--bg-secondary)' }}>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-2" style={{ color: 'var(--accent)' }}>Recommendation</h3>
            <p className="text-base font-medium mb-4" style={{ color: 'var(--text-primary)' }}>{getRecommendation()}</p>
            <h4 className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: 'var(--text-tertiary)' }}>Reasoning</h4>
            <p className="text-sm mb-4" style={{ color: 'var(--text-secondary)' }}>Based on your ACV of ${parseInt(inputs.acv).toLocaleString()}, {inputs.salesCycle} sales cycle, this balances relationship-building with scalable awareness.</p>
            <div className="flex flex-wrap gap-3 mb-4">
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full" style={{ backgroundColor: '#dcfce7', color: '#166534' }}>Priority: High</span>
              <span className="text-xs font-medium px-2.5 py-1 rounded-full" style={{ backgroundColor: 'var(--bg-tertiary)', color: 'var(--text-secondary)' }}>Confidence: Medium-High</span>
            </div>
            <h4 className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: 'var(--text-tertiary)' }}>Risks</h4>
            <ul className="space-y-1 mb-4">
              <li className="text-sm" style={{ color: 'var(--text-secondary)' }}>• Assumes ICP is well-defined</li>
              <li className="text-sm" style={{ color: 'var(--text-secondary)' }}>• Channel performance varies by market</li>
              <li className="text-sm" style={{ color: 'var(--text-secondary)' }}>• Execution quality matters as much as selection</li>
            </ul>
            <h4 className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: 'var(--text-tertiary)' }}>Next Steps</h4>
            <ol className="space-y-1">
              <li className="text-sm" style={{ color: 'var(--text-secondary)' }}>1. Validate with your sales team</li>
              <li className="text-sm" style={{ color: 'var(--text-secondary)' }}>2. Audit current channel performance</li>
              <li className="text-sm" style={{ color: 'var(--text-secondary)' }}>3. Reallocate 20% of budget to test</li>
              <li className="text-sm" style={{ color: 'var(--text-secondary)' }}>4. Set up 90-day measurement</li>
            </ol>
          </div>
          <div className="mt-6">
            <button onClick={() => setShowOutput(false)} className="px-4 py-2 rounded-md text-sm font-medium border" style={{ borderColor: 'var(--border-color)', color: 'var(--text-secondary)' }}>Adjust Inputs</button>
          </div>
        </Card>
      </div>
    </div>
  );
}

// G2/Capterra-style GTM Stack Directory
export function GTMStackPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedComplexity, setSelectedComplexity] = useState<string>('all');
  const [selectedBudget, setSelectedBudget] = useState<string>('all');

  // Get unique categories and counts
  const categories = useMemo(() => {
    const categoryMap = new Map<string, number>();
    gtmStacks.forEach(stack => {
      categoryMap.set(stack.category, (categoryMap.get(stack.category) || 0) + 1);
    });
    return Array.from(categoryMap.entries()).map(([name, count]) => ({ name, count }));
  }, []);

  // Filter stacks
  const filteredStacks = useMemo(() => {
    return gtmStacks.filter(stack => {
      const matchesSearch = !searchQuery || 
        stack.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        stack.whoItsFor.toLowerCase().includes(searchQuery.toLowerCase()) ||
        stack.tools.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesCategory = selectedCategory === 'all' || stack.category === selectedCategory;
      const matchesComplexity = selectedComplexity === 'all' || stack.complexity === selectedComplexity;
      
      let matchesBudget = true;
      if (selectedBudget !== 'all') {
        const budget = stack.budgetRange.toLowerCase();
        if (selectedBudget === 'low') matchesBudget = budget.includes('$500') || budget.includes('$1,000') || budget.includes('$2,000');
        else if (selectedBudget === 'medium') matchesBudget = budget.includes('$5,000') || budget.includes('$10,000') || budget.includes('$15,000');
        else if (selectedBudget === 'high') matchesBudget = budget.includes('$50,000') || budget.includes('$100,000') || budget.includes('$200,000');
      }
      
      return matchesSearch && matchesCategory && matchesComplexity && matchesBudget;
    });
  }, [searchQuery, selectedCategory, selectedComplexity, selectedBudget]);

  return (
    <div className="py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumb items={[{ label: 'Home', path: '/' }, { label: 'GTM Stack' }]} />
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight" style={{ color: 'var(--text-primary)' }}>
            B2B Marketing Tool Stacks
          </h1>
          <p className="mt-3 text-lg" style={{ color: 'var(--text-secondary)' }}>
            {gtmStacks.length}+ curated marketing technology stacks organized by use case, company stage, and budget.
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative">
            <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-tertiary)' }} />
            <input
              type="text"
              placeholder="Search stacks by name, audience, or tool..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-lg border text-base"
              style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-1 rounded hover:bg-[var(--bg-secondary)]"
              >
                <X size={16} style={{ color: 'var(--text-tertiary)' }} />
              </button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left Sidebar - Categories */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <h3 className="text-sm font-semibold uppercase tracking-wider mb-4" style={{ color: 'var(--text-tertiary)' }}>
                Categories
              </h3>
              <div className="space-y-1">
                <button
                  onClick={() => setSelectedCategory('all')}
                  className="w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-colors"
                  style={{
                    backgroundColor: selectedCategory === 'all' ? 'var(--bg-secondary)' : 'transparent',
                    color: selectedCategory === 'all' ? 'var(--accent)' : 'var(--text-secondary)',
                  }}
                >
                  All Stacks
                  <span className="float-right text-xs" style={{ color: 'var(--text-tertiary)' }}>{gtmStacks.length}</span>
                </button>
                {categories.map(({ name, count }) => (
                  <button
                    key={name}
                    onClick={() => setSelectedCategory(name)}
                    className="w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-colors"
                    style={{
                      backgroundColor: selectedCategory === name ? 'var(--bg-secondary)' : 'transparent',
                      color: selectedCategory === name ? 'var(--accent)' : 'var(--text-secondary)',
                    }}
                  >
                    {name}
                    <span className="float-right text-xs" style={{ color: 'var(--text-tertiary)' }}>{count}</span>
                  </button>
                ))}
              </div>

              {/* Filters */}
              <div className="mt-8">
                <h3 className="text-sm font-semibold uppercase tracking-wider mb-4" style={{ color: 'var(--text-tertiary)' }}>
                  Filters
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>Complexity</label>
                    <select
                      value={selectedComplexity}
                      onChange={(e) => setSelectedComplexity(e.target.value)}
                      className="w-full px-3 py-2 rounded-md border text-sm"
                      style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}
                    >
                      <option value="all">All</option>
                      <option value="Low">Low</option>
                      <option value="Medium">Medium</option>
                      <option value="High">High</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>Budget</label>
                    <select
                      value={selectedBudget}
                      onChange={(e) => setSelectedBudget(e.target.value)}
                      className="w-full px-3 py-2 rounded-md border text-sm"
                      style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}
                    >
                      <option value="all">All</option>
                      <option value="low">Low (&lt;$5k/mo)</option>
                      <option value="medium">Medium ($5k-$20k/mo)</option>
                      <option value="high">High (&gt;$20k/mo)</option>
                    </select>
                  </div>

                  {(selectedCategory !== 'all' || selectedComplexity !== 'all' || selectedBudget !== 'all') && (
                    <button
                      onClick={() => {
                        setSelectedCategory('all');
                        setSelectedComplexity('all');
                        setSelectedBudget('all');
                      }}
                      className="w-full px-3 py-2 rounded-md text-sm font-medium border transition-colors hover:border-[var(--accent)]"
                      style={{ borderColor: 'var(--border-color)', color: 'var(--text-secondary)' }}
                    >
                      Clear Filters
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Main Content - Tool Cards */}
          <div className="lg:col-span-3">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-sm" style={{ color: 'var(--text-tertiary)' }}>
                Showing {filteredStacks.length} of {gtmStacks.length} stacks
              </p>
            </div>

            {filteredStacks.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-lg font-medium" style={{ color: 'var(--text-primary)' }}>No stacks found</p>
                <p className="text-sm mt-2" style={{ color: 'var(--text-tertiary)' }}>Try adjusting your search or filters</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredStacks.map((stack) => (
                  <div
                    key={stack.id}
                    className="p-6 rounded-lg border transition-all hover:shadow-lg"
                    style={{ borderColor: 'var(--border-color)', backgroundColor: 'var(--card-bg)' }}
                  >
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>
                          {stack.name}
                        </h3>
                        <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>
                          {stack.whoItsFor}
                        </p>
                      </div>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="text-xs px-2 py-1 rounded" style={{ backgroundColor: 'var(--bg-secondary)', color: 'var(--text-secondary)' }}>
                        {stack.category}
                      </span>
                      <span className="text-xs px-2 py-1 rounded" style={{ backgroundColor: 'var(--bg-secondary)', color: 'var(--text-secondary)' }}>
                        {stack.complexity}
                      </span>
                      <span className="text-xs px-2 py-1 rounded" style={{ backgroundColor: 'var(--bg-secondary)', color: 'var(--text-secondary)' }}>
                        {stack.budgetRange}
                      </span>
                    </div>

                    {/* Description */}
                    <p className="text-sm mb-4 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                      {stack.problem}
                    </p>

                    {/* Tools */}
                    <div className="mb-4">
                      <p className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: 'var(--text-tertiary)' }}>
                        Tools ({stack.tools.length})
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {stack.tools.slice(0, 6).map((tool) => (
                          <span key={tool} className="text-xs px-2 py-1 rounded border" style={{ borderColor: 'var(--border-color)', color: 'var(--text-secondary)' }}>
                            {tool}
                          </span>
                        ))}
                        {stack.tools.length > 6 && (
                          <span className="text-xs px-2 py-1" style={{ color: 'var(--text-tertiary)' }}>
                            +{stack.tools.length - 6} more
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Footer */}
                    <div className="pt-4 border-t" style={{ borderColor: 'var(--border-color)' }}>
                      <div className="flex items-center justify-between">
                        <div className="text-xs" style={{ color: 'var(--text-tertiary)' }}>
                          {stack.alternatives.length} alternatives
                        </div>
                        <button className="text-sm font-medium flex items-center gap-1 hover:gap-2 transition-all" style={{ color: 'var(--accent)' }}>
                          View Details <ExternalLink size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
