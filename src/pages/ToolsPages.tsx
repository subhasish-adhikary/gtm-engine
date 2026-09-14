import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Search, X, AlertCircle, Lightbulb } from 'lucide-react';
import { tools, gtmStackCategories } from '../data/content';
import { SectionHeader, Card, Tag, Breadcrumb, Button } from '../components/UI';

export function ToolsPage() {
  return (
    <div className="py-12 sm:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumb items={[{ label: 'Home', path: '/' }, { label: 'Tools' }]} />
        <SectionHeader eyebrow="Interactive Tools" title="Strategy toolkits for marketers" description="Practical tools for GTM planning, budget allocation, and channel selection." />
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool) => (
            <Link key={tool.id} to={`/tools/${tool.id}`}>
              <Card hoverable>
                <div className="flex items-center justify-between mb-3">
                  <Tag>{tool.category}</Tag>
                  <span className={`text-xs font-medium px-2 py-0.5 rounded ${tool.status === 'active' ? '' : 'badge-soon'}`} style={tool.status === 'active' ? { backgroundColor: '#dcfce7', color: '#166534' } : {}}>{tool.status === 'active' ? 'Active' : 'Coming Soon'}</span>
                </div>
                <h3 className="text-base font-semibold" style={{ color: 'var(--text-primary)' }}>{tool.title}</h3>
                <p className="mt-2 text-sm leading-relaxed" style={{ color: 'var(--text-tertiary)' }}>{tool.description}</p>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export function ToolPage() {
  const { toolId } = useParams();
  const tool = tools.find(t => t.id === toolId);
  if (!tool) return <div className="py-32 text-center"><h2 className="text-xl font-semibold">Tool not found</h2><Link to="/tools" className="mt-4 inline-block text-sm" style={{ color: 'var(--accent)' }}>← Back</Link></div>;
  if (tool.status !== 'active') {
    return (
      <div className="py-12 sm:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[{ label: 'Home', path: '/' }, { label: 'Tools', path: '/tools' }, { label: tool.title }]} />
          <h1 className="text-3xl font-semibold" style={{ color: 'var(--text-primary)' }}>{tool.title}</h1>
          <p className="mt-3 text-base" style={{ color: 'var(--text-secondary)' }}>{tool.description}</p>
          <div className="mt-12 p-12 rounded-lg border text-center" style={{ borderColor: 'var(--border-color)', backgroundColor: 'var(--bg-secondary)' }}>
            <h3 className="text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>Coming Soon</h3>
            <p className="mt-2 text-sm" style={{ color: 'var(--text-tertiary)' }}>This tool is being developed. Check back soon.</p>
          </div>
        </div>
      </div>
    );
  }
  return <ChannelPlannerTool tool={tool} />;
}

function ChannelPlannerTool({ tool }: any) {
  const [inputs, setInputs] = useState({ icp: '', acv: '', budget: '', salesCycle: '', channels: [] as string[], goals: '' });
  const [showOutput, setShowOutput] = useState(false);
  const channelOptions = ['LinkedIn', 'Content/SEO', 'Paid Search', 'Paid Social', 'Outbound', 'Events', 'Partnerships'];
  const toggleChannel = (ch: string) => setInputs(p => ({ ...p, channels: p.channels.includes(ch) ? p.channels.filter(c => c !== ch) : [...p.channels, ch] }));
  const getRecommendation = () => {
    const acv = parseInt(inputs.acv) || 0;
    if (acv > 50000) return 'Focus on high-touch channels: LinkedIn, Outbound, and Events. Your ACV justifies relationship-based selling.';
    if (acv > 10000) return 'Balance high-touch and scalable: LinkedIn, Content/SEO, and Paid Search.';
    return 'Prioritize scalable channels: Content/SEO, Paid Search, and Paid Social.';
  };
  return (
    <div className="py-12 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumb items={[{ label: 'Home', path: '/' }, { label: 'Tools', path: '/tools' }, { label: tool.title }]} />
        <h1 className="text-3xl font-semibold" style={{ color: 'var(--text-primary)' }}>{tool.title}</h1>
        <p className="mt-3 text-base" style={{ color: 'var(--text-secondary)' }}>{tool.description}</p>
        <div className="mt-8 p-5 rounded-lg border-l-4" style={{ borderColor: 'var(--accent)', backgroundColor: 'var(--bg-secondary)' }}>
          <div className="flex items-start gap-3">
            <AlertCircle size={18} className="flex-shrink-0 mt-0.5" style={{ color: 'var(--accent)' }} />
            <div>
              <h3 className="text-sm font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>The Problem This Solves</h3>
              <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>Most marketers spread budget across too many channels. This tool helps you focus on channels most likely to drive results.</p>
            </div>
          </div>
        </div>
        <Card className="mt-8">
          {!showOutput ? (
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
          ) : (
            <div>
              <div className="p-6 rounded-lg border-2" style={{ borderColor: 'var(--accent)', backgroundColor: 'var(--bg-secondary)' }}>
                <div className="flex items-start gap-3 mb-4">
                  <Lightbulb size={20} className="flex-shrink-0 mt-0.5" style={{ color: 'var(--accent)' }} />
                  <div>
                    <h3 className="text-sm font-semibold uppercase tracking-wider mb-2" style={{ color: 'var(--accent)' }}>Recommendation</h3>
                    <p className="text-base font-medium" style={{ color: 'var(--text-primary)' }}>{getRecommendation()}</p>
                  </div>
                </div>
                <div className="mb-4">
                  <h4 className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: 'var(--text-tertiary)' }}>Reasoning</h4>
                  <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>Based on your ACV of ${parseInt(inputs.acv).toLocaleString()}, {inputs.salesCycle} sales cycle, this balances relationship-building with scalable awareness.</p>
                </div>
                <div className="flex flex-wrap gap-3 mb-4">
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full" style={{ backgroundColor: '#dcfce7', color: '#166534' }}>Priority: High</span>
                  <span className="text-xs font-medium px-2.5 py-1 rounded-full" style={{ backgroundColor: 'var(--bg-tertiary)', color: 'var(--text-secondary)' }}>Confidence: Medium-High</span>
                </div>
                <div className="mb-4">
                  <h4 className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: 'var(--text-tertiary)' }}>Risks</h4>
                  <ul className="space-y-1">
                    <li className="text-sm" style={{ color: 'var(--text-secondary)' }}>• Assumes ICP is well-defined</li>
                    <li className="text-sm" style={{ color: 'var(--text-secondary)' }}>• Channel performance varies by market</li>
                    <li className="text-sm" style={{ color: 'var(--text-secondary)' }}>• Execution quality matters as much as selection</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: 'var(--text-tertiary)' }}>Next Steps</h4>
                  <ol className="space-y-1">
                    <li className="text-sm" style={{ color: 'var(--text-secondary)' }}>1. Validate with your sales team</li>
                    <li className="text-sm" style={{ color: 'var(--text-secondary)' }}>2. Audit current channel performance</li>
                    <li className="text-sm" style={{ color: 'var(--text-secondary)' }}>3. Reallocate 20% of budget to test</li>
                    <li className="text-sm" style={{ color: 'var(--text-secondary)' }}>4. Set up 90-day measurement</li>
                  </ol>
                </div>
              </div>
              <div className="mt-6"><Button variant="secondary" onClick={() => setShowOutput(false)}>Adjust Inputs</Button></div>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}

export function GTMStackPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({ stage: '', budget: '', complexity: '' });
  const sampleStacks = [
    { id: '1', name: 'Early-Stage GTM Stack', category: 'CRM', stage: 'Seed/Series A', budget: '$5K-15K/mo', complexity: 'Low', tools: ['HubSpot Starter', 'Mailchimp', 'Google Analytics'], useCase: 'Foundation for growth-stage GTM' },
    { id: '2', name: 'Growth-Stage GTM Stack', category: 'Marketing Automation', stage: 'Series B/C', budget: '$25K-75K/mo', complexity: 'Medium', tools: ['HubSpot Enterprise', 'Segment', 'Clearbit', 'Drift'], useCase: 'Scaling predictable pipeline' },
    { id: '3', name: 'Enterprise GTM Stack', category: 'ABM', stage: 'Series D+', budget: '$100K+/mo', complexity: 'High', tools: ['Salesforce', 'Marketo', 'Demandbase', '6sense'], useCase: 'Enterprise account-based marketing' },
  ];
  const filtered = sampleStacks.filter(s => {
    const matchSearch = !searchQuery || s.name.toLowerCase().includes(searchQuery.toLowerCase()) || s.tools.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchFilters = (!filters.stage || s.stage === filters.stage) && (!filters.budget || s.budget === filters.budget) && (!filters.complexity || s.complexity === filters.complexity);
    return matchSearch && matchFilters;
  });
  return (
    <div className="py-12 sm:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumb items={[{ label: 'Home', path: '/' }, { label: 'GTM Stack' }]} />
        <SectionHeader eyebrow="GTM Stack" title="50+ B2B Marketing Tool Stacks" description="Curated marketing technology stacks organized by company stage, budget, and GTM motion." />
        <div className="mt-8 relative">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-tertiary)' }} />
          <input type="text" placeholder="Search stacks..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full pl-10 pr-4 py-2.5 rounded-lg border text-sm" style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--border-color)', color: 'var(--text-primary)' }} />
        </div>
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
          <select value={filters.stage} onChange={(e) => setFilters({ ...filters, stage: e.target.value })} className="px-3 py-2 rounded-lg border text-xs" style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}>
            <option value="">Company Stage</option>
            <option value="Seed/Series A">Seed/Series A</option>
            <option value="Series B/C">Series B/C</option>
            <option value="Series D+">Series D+</option>
          </select>
          <select value={filters.budget} onChange={(e) => setFilters({ ...filters, budget: e.target.value })} className="px-3 py-2 rounded-lg border text-xs" style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}>
            <option value="">Budget</option>
            <option value="$5K-15K/mo">$5K-15K/mo</option>
            <option value="$25K-75K/mo">$25K-75K/mo</option>
            <option value="$100K+/mo">$100K+/mo</option>
          </select>
          <select value={filters.complexity} onChange={(e) => setFilters({ ...filters, complexity: e.target.value })} className="px-3 py-2 rounded-lg border text-xs" style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}>
            <option value="">Complexity</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
          {(searchQuery || filters.stage || filters.budget || filters.complexity) && (
            <button onClick={() => { setSearchQuery(''); setFilters({ stage: '', budget: '', complexity: '' }); }} className="px-3 py-2 rounded-lg border text-xs font-medium flex items-center justify-center gap-1" style={{ borderColor: 'var(--border-color)', color: 'var(--text-secondary)' }}><X size={12} />Clear</button>
          )}
        </div>
        <div className="mt-8 space-y-4">
          {filtered.map((stack) => (
            <Card key={stack.id} hoverable>
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <Tag>{stack.category}</Tag>
                <span className="text-xs font-medium px-2 py-0.5 rounded" style={{ backgroundColor: 'var(--bg-tertiary)', color: 'var(--text-tertiary)' }}>{stack.stage}</span>
                <span className="text-xs font-medium px-2 py-0.5 rounded" style={{ backgroundColor: 'var(--bg-tertiary)', color: 'var(--text-tertiary)' }}>{stack.budget}</span>
              </div>
              <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>{stack.name}</h3>
              <p className="text-sm mb-4" style={{ color: 'var(--text-secondary)' }}>{stack.useCase}</p>
              <div className="flex flex-wrap gap-2">{stack.tools.map(t => <span key={t} className="text-xs px-2 py-1 rounded border" style={{ borderColor: 'var(--border-color)', color: 'var(--text-secondary)' }}>{t}</span>)}</div>
            </Card>
          ))}
        </div>
        <div className="mt-16 pt-12 border-t" style={{ borderColor: 'var(--border-color)' }}>
          <h3 className="text-sm font-semibold uppercase tracking-wider mb-6" style={{ color: 'var(--text-tertiary)' }}>Stack Categories ({gtmStackCategories.length})</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {gtmStackCategories.map(cat => <div key={cat} className="p-3 rounded-lg border text-center text-xs font-medium" style={{ borderColor: 'var(--border-color)', color: 'var(--text-secondary)' }}>{cat}</div>)}
          </div>
        </div>
      </div>
    </div>
  );
}
