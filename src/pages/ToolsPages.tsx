import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Search, X } from 'lucide-react';
import { tools, gtmStackCategories } from '../data/content';
import { gtmStacks } from '../data/gtmStacks';
import { SectionHeader, Card, Tag, Breadcrumb, Button } from '../components/UI';
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

        {/* CTA */}
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
  if (!tool) return <div className="py-32 text-center"><h2 className="text-xl font-semibold">Tool not found</h2><Link to="/tools" className="mt-4 inline-block text-sm" style={{ color: 'var(--accent)' }}>← Back</Link></div>;

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
  if (!ToolComponent) return <div className="py-32 text-center"><h2 className="text-xl font-semibold">Tool coming soon</h2><Link to="/tools" className="mt-4 inline-block text-sm" style={{ color: 'var(--accent)' }}>← Back</Link></div>;

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
              <Button type="submit" size="lg">Generate Recommendation</Button>
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
          <div className="mt-6"><Button variant="secondary" onClick={() => setShowOutput(false)}>Adjust Inputs</Button></div>
        </Card>
      </div>
    </div>
  );
}

import { GTMOperatingSystem } from '../components/GTMOperatingSystem';
import { gtmStages } from '../data/gtmOperatingSystem';

export function GTMStackPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({ category: '', complexity: '', budget: '' });

  const filtered = gtmStacks.filter(s => {
    const matchSearch = !searchQuery || s.name.toLowerCase().includes(searchQuery.toLowerCase()) || s.whoItsFor.toLowerCase().includes(searchQuery.toLowerCase()) || s.tools.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchFilters = (!filters.category || s.category === filters.category) && (!filters.complexity || s.complexity === filters.complexity);
    return matchSearch && matchFilters;
  });

  const categories = [...new Set(gtmStacks.map(s => s.category))];

  return (
    <div className="py-12 sm:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumb items={[{ label: 'Home', path: '/' }, { label: 'GTM Stack' }]} />
        
        {/* GTM Operating System Visualization */}
        <section className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4" style={{ color: 'var(--text-primary)' }}>
              The GTM Operating System
            </h2>
            <p className="text-lg max-w-3xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
              Your GTM stack should follow your GTM motion. Most teams build their stack tool-first. Start with the motion, identify the capabilities required to operate it, then choose the minimum technology needed to execute.
            </p>
          </div>
          
          <GTMOperatingSystem />
          
          <div className="mt-12 text-center">
            <p className="text-sm italic max-w-2xl mx-auto" style={{ color: 'var(--text-tertiary)' }}>
              Software is the infrastructure. The GTM model is the system.
            </p>
          </div>
        </section>

        {/* Semantic HTML for SEO */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-8" style={{ color: 'var(--text-primary)' }}>
            The GTM Operating System: A Complete Framework
          </h2>
          <div className="prose max-w-none">
            {gtmStages.map(stage => (
              <div key={stage.id} className="mb-8">
                <h3 className="text-xl font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>
                  {stage.number}. {stage.name}
                </h3>
                <p className="text-sm mb-4" style={{ color: 'var(--text-secondary)' }}>
                  {stage.description}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {stage.capabilities.map(cap => (
                    <div key={cap.id} className="p-3 rounded-lg border" style={{ borderColor: 'var(--border-color)' }}>
                      <h4 className="text-sm font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>
                        {cap.name}
                      </h4>
                      <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>
                        {cap.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <SectionHeader eyebrow="GTM Stack" title={`${gtmStacks.length}+ B2B Marketing Tool Stacks`} description="Each stack solves a specific business problem. Not just tool lists — strategic recommendations with rationale, trade-offs, and alternatives." />
        
        <div className="mt-8 relative">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-tertiary)' }} />
          <input type="text" placeholder="Search stacks by name, audience, or tool..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full pl-10 pr-4 py-2.5 rounded-lg border text-sm" style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--border-color)', color: 'var(--text-primary)' }} />
        </div>

        <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
          <select value={filters.category} onChange={(e) => setFilters({ ...filters, category: e.target.value })} className="px-3 py-2 rounded-lg border text-xs" style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}>
            <option value="">All Categories</option>
            {categories.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
          <select value={filters.complexity} onChange={(e) => setFilters({ ...filters, complexity: e.target.value })} className="px-3 py-2 rounded-lg border text-xs" style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}>
            <option value="">All Complexity</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
          {(searchQuery || filters.category || filters.complexity) && (
            <button onClick={() => { setSearchQuery(''); setFilters({ category: '', complexity: '', budget: '' }); }} className="px-3 py-2 rounded-lg border text-xs font-medium flex items-center justify-center gap-1" style={{ borderColor: 'var(--border-color)', color: 'var(--text-secondary)' }}><X size={12} />Clear</button>
          )}
        </div>

        <div className="mt-4 text-sm" style={{ color: 'var(--text-tertiary)' }}>
          Showing {filtered.length} of {gtmStacks.length} stacks
        </div>

        <div className="mt-6 space-y-4">
          {filtered.slice(0, 20).map((stack) => (
            <Card key={stack.id} hoverable>
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <Tag>{stack.category}</Tag>
                <span className="text-xs font-medium px-2 py-0.5 rounded" style={{ backgroundColor: 'var(--bg-tertiary)', color: 'var(--text-tertiary)' }}>{stack.complexity} complexity</span>
                <span className="text-xs font-medium px-2 py-0.5 rounded" style={{ backgroundColor: 'var(--bg-tertiary)', color: 'var(--text-tertiary)' }}>{stack.budgetRange}</span>
              </div>
              <h3 className="text-lg font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>{stack.name}</h3>
              <p className="text-xs mb-2" style={{ color: 'var(--text-tertiary)' }}>{stack.whoItsFor}</p>
              <p className="text-sm mb-4" style={{ color: 'var(--text-secondary)' }}>{stack.problem}</p>
              <div className="flex flex-wrap gap-2">
                {stack.tools.slice(0, 6).map(t => <span key={t} className="text-xs px-2 py-1 rounded border" style={{ borderColor: 'var(--border-color)', color: 'var(--text-secondary)' }}>{t}</span>)}
                {stack.tools.length > 6 && <span className="text-xs px-2 py-1" style={{ color: 'var(--text-tertiary)' }}>+{stack.tools.length - 6} more</span>}
              </div>
            </Card>
          ))}
        </div>

        {filtered.length > 20 && (
          <div className="mt-6 text-center text-sm" style={{ color: 'var(--text-tertiary)' }}>
            Showing first 20 of {filtered.length} results. Refine filters to see specific stacks.
          </div>
        )}

        {/* CTA */}
        <div className="mt-12 p-6 rounded-lg border" style={{ borderColor: 'var(--border-color)', backgroundColor: 'var(--bg-secondary)' }}>
          <h3 className="text-base font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>Not sure which stack is right for you?</h3>
          <p className="text-sm mb-4" style={{ color: 'var(--text-tertiary)' }}>
            Use the GTM Stack Builder to get a personalized recommendation based on your budget, team size, and GTM model.
          </p>
          <Link to="/tools/stack-builder" className="inline-flex items-center px-4 py-2 rounded-md text-sm font-medium" style={{ backgroundColor: 'var(--accent)', color: '#fff' }}>
            Build Your Stack →
          </Link>
        </div>
      </div>
    </div>
  );
}
