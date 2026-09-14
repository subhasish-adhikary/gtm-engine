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

// Interactive Stack Recommender
function StackRecommender() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<{
    stage: string;
    budget: string;
    team: string;
    goal: string;
  }>({
    stage: '',
    budget: '',
    team: '',
    goal: ''
  });
  const [showResults, setShowResults] = useState(false);

  type AnswerKey = 'stage' | 'budget' | 'team' | 'goal';
  
  const questions: Array<{
    key: AnswerKey;
    question: string;
    options: Array<{ value: string; label: string; desc: string }>;
  }> = [
    {
      key: 'stage',
      question: 'What stage is your company?',
      options: [
        { value: 'startup', label: 'Early-stage Startup', desc: 'Pre-seed to Series A' },
        { value: 'growth', label: 'Growth Stage', desc: 'Series B to C' },
        { value: 'enterprise', label: 'Enterprise', desc: 'Series D+ or public' }
      ]
    },
    {
      key: 'budget',
      question: 'What\'s your monthly marketing budget?',
      options: [
        { value: 'low', label: '< $5,000/mo', desc: 'Lean startup budget' },
        { value: 'medium', label: '$5k - $20k/mo', desc: 'Growth budget' },
        { value: 'high', label: '> $20k/mo', desc: 'Enterprise budget' }
      ]
    },
    {
      key: 'team',
      question: 'How large is your marketing team?',
      options: [
        { value: 'solo', label: 'Just me', desc: 'Solo marketer or founder' },
        { value: 'small', label: '2-5 people', desc: 'Small team' },
        { value: 'large', label: '6+ people', desc: 'Dedicated team' }
      ]
    },
    {
      key: 'goal',
      question: 'What\'s your primary GTM goal?',
      options: [
        { value: 'pipeline', label: 'Generate Pipeline', desc: 'Focus on demand gen' },
        { value: 'conversion', label: 'Improve Conversion', desc: 'Optimize existing funnel' },
        { value: 'scale', label: 'Scale Operations', desc: 'Automate and grow' }
      ]
    }
  ];

  const getRecommendations = () => {
    const recommended = gtmStacks.filter(stack => {
      let score = 0;
      
      // Stage matching
      if (answers.stage === 'startup' && (stack.budgetRange.includes('$500') || stack.budgetRange.includes('$1,000'))) score += 2;
      if (answers.stage === 'growth' && (stack.budgetRange.includes('$5,000') || stack.budgetRange.includes('$10,000'))) score += 2;
      if (answers.stage === 'enterprise' && (stack.budgetRange.includes('$50,000') || stack.budgetRange.includes('$100,000'))) score += 2;
      
      // Budget matching
      if (answers.budget === 'low' && stack.complexity === 'Low') score += 1;
      if (answers.budget === 'medium' && stack.complexity === 'Medium') score += 1;
      if (answers.budget === 'high' && stack.complexity === 'High') score += 1;
      
      // Team size matching
      if (answers.team === 'solo' && stack.complexity === 'Low') score += 1;
      if (answers.team === 'small' && stack.complexity !== 'High') score += 1;
      if (answers.team === 'large') score += 1;
      
      return score >= 2;
    });

    return recommended.slice(0, 3);
  };

  if (showResults) {
    const recommendations = getRecommendations();
    return (
      <div className="p-8 rounded-2xl border-2" style={{ borderColor: 'var(--accent)', backgroundColor: 'var(--bg-secondary)' }}>
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
            Your Recommended Stacks
          </h3>
          <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
            Based on your answers, here are the best-fit stacks for your situation
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {recommendations.map((stack, idx) => (
            <div key={stack.id} className="p-6 rounded-xl border-2 bg-white" style={{ borderColor: idx === 0 ? 'var(--accent)' : 'var(--border-color)' }}>
              {idx === 0 && (
                <div className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: 'var(--accent)' }}>
                  Top Pick
                </div>
              )}
              <h4 className="text-lg font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
                {stack.name}
              </h4>
              <p className="text-xs mb-3" style={{ color: 'var(--text-tertiary)' }}>
                {stack.whoItsFor}
              </p>
              <div className="flex flex-wrap gap-2 mb-3">
                <span className="text-xs px-2 py-1 rounded" style={{ backgroundColor: 'var(--bg-secondary)', color: 'var(--text-secondary)' }}>
                  {stack.complexity}
                </span>
                <span className="text-xs px-2 py-1 rounded" style={{ backgroundColor: 'var(--bg-secondary)', color: 'var(--text-secondary)' }}>
                  {stack.budgetRange}
                </span>
              </div>
              <div className="flex flex-wrap gap-1 mb-4">
                {stack.tools.slice(0, 4).map(tool => (
                  <span key={tool} className="text-xs px-2 py-0.5 rounded" style={{ backgroundColor: 'var(--bg-tertiary)', color: 'var(--text-secondary)' }}>
                    {tool}
                  </span>
                ))}
              </div>
              <button className="w-full px-4 py-2 rounded-lg text-sm font-medium" style={{ backgroundColor: 'var(--accent)', color: '#fff' }}>
                View Full Stack
              </button>
            </div>
          ))}
        </div>

        <div className="text-center">
          <button
            onClick={() => {
              setStep(0);
              setAnswers({ stage: '', budget: '', team: '', goal: '' });
              setShowResults(false);
            }}
            className="px-6 py-2 rounded-lg text-sm font-medium border"
            style={{ borderColor: 'var(--border-color)', color: 'var(--text-secondary)' }}
          >
            Start Over
          </button>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[step];

  return (
    <div className="p-8 rounded-2xl border-2" style={{ borderColor: 'var(--accent)', backgroundColor: 'var(--bg-secondary)' }}>
      {/* Progress */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex gap-2">
          {questions.map((_, idx) => (
            <div
              key={idx}
              className="h-1 w-16 rounded-full transition-colors"
              style={{ backgroundColor: idx <= step ? 'var(--accent)' : 'var(--border-color)' }}
            />
          ))}
        </div>
        <span className="text-sm font-medium" style={{ color: 'var(--text-tertiary)' }}>
          {step + 1} of {questions.length}
        </span>
      </div>

      {/* Question */}
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
          {currentQuestion.question}
        </h3>
      </div>

      {/* Options */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {currentQuestion.options.map((option) => (
          <button
            key={option.value}
            onClick={() => {
              setAnswers({ ...answers, [currentQuestion.key]: option.value });
              if (step < questions.length - 1) {
                setStep(step + 1);
              } else {
                setShowResults(true);
              }
            }}
            className="p-6 rounded-xl border-2 text-left transition-all hover:shadow-lg"
            style={{
              borderColor: answers[currentQuestion.key] === option.value ? 'var(--accent)' : 'var(--border-color)',
              backgroundColor: answers[currentQuestion.key] === option.value ? 'var(--card-bg)' : 'var(--card-bg)'
            }}
          >
            <div className="font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>
              {option.label}
            </div>
            <div className="text-xs" style={{ color: 'var(--text-tertiary)' }}>
              {option.desc}
            </div>
          </button>
        ))}
      </div>

      {/* Navigation */}
      <div className="flex justify-between">
        <button
          onClick={() => setStep(Math.max(0, step - 1))}
          disabled={step === 0}
          className="px-6 py-2 rounded-lg text-sm font-medium border disabled:opacity-40"
          style={{ borderColor: 'var(--border-color)', color: 'var(--text-secondary)' }}
        >
          Back
        </button>
        <button
          onClick={() => {
            if (step < questions.length - 1) {
              setStep(step + 1);
            } else {
              setShowResults(true);
            }
          }}
          className="px-6 py-2 rounded-lg text-sm font-medium"
          style={{ backgroundColor: 'var(--accent)', color: '#fff' }}
        >
          {step === questions.length - 1 ? 'Get Recommendations' : 'Next'}
        </button>
      </div>
    </div>
  );
}

// Stack Detail Modal
function StackDetailModal({ stack, onClose }: { stack: typeof gtmStacks[0]; onClose: () => void }) {
  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <div 
        className="bg-[var(--card-bg)] border-2 border-[var(--border-color)] rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-[var(--card-bg)] border-b-2 border-[var(--border-color)] p-6 flex items-start justify-between">
          <div className="flex-1">
            <h2 className="text-2xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
              {stack.name}
            </h2>
            <p className="text-sm" style={{ color: 'var(--text-tertiary)' }}>
              {stack.whoItsFor}
            </p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-[var(--bg-secondary)] rounded-lg transition-colors"
          >
            <X size={24} style={{ color: 'var(--text-secondary)' }} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            <span className="text-sm px-3 py-1.5 rounded-lg font-medium" style={{ backgroundColor: 'var(--bg-secondary)', color: 'var(--text-secondary)' }}>
              {stack.category}
            </span>
            <span className="text-sm px-3 py-1.5 rounded-lg font-medium" style={{ backgroundColor: 'var(--bg-secondary)', color: 'var(--text-secondary)' }}>
              {stack.complexity} Complexity
            </span>
            <span className="text-sm px-3 py-1.5 rounded-lg font-medium" style={{ backgroundColor: 'var(--bg-secondary)', color: 'var(--text-secondary)' }}>
              {stack.budgetRange}
            </span>
          </div>

          {/* Problem */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: 'var(--accent)' }}>
              Problem This Solves
            </h3>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              {stack.problem}
            </p>
          </div>

          {/* Tools */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: 'var(--accent)' }}>
              Tools in This Stack ({stack.tools.length})
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {stack.tools.map((tool) => (
                <div 
                  key={tool}
                  className="p-3 rounded-lg border text-sm font-medium"
                  style={{ borderColor: 'var(--border-color)', color: 'var(--text-primary)', backgroundColor: 'var(--bg-primary)' }}
                >
                  {tool}
                </div>
              ))}
            </div>
          </div>

          {/* Why These Tools */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: 'var(--accent)' }}>
              Why These Tools?
            </h3>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              {stack.whyTheseTools}
            </p>
          </div>

          {/* Alternatives */}
          {stack.alternatives.length > 0 && (
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: 'var(--accent)' }}>
                Alternative Stacks
              </h3>
              <div className="flex flex-wrap gap-2">
                {stack.alternatives.map((alt) => (
                  <span 
                    key={alt}
                    className="text-sm px-3 py-1.5 rounded-lg"
                    style={{ backgroundColor: 'var(--bg-secondary)', color: 'var(--text-secondary)' }}
                  >
                    {alt}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Trade-offs */}
          {stack.tradeOffs.length > 0 && (
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: 'var(--accent)' }}>
                Trade-offs to Consider
              </h3>
              <ul className="space-y-2">
                {stack.tradeOffs.map((tradeoff, idx) => (
                  <li key={idx} className="text-sm flex items-start gap-2" style={{ color: 'var(--text-secondary)' }}>
                    <span style={{ color: 'var(--accent)' }}>•</span>
                    <span>{tradeoff}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Enhanced GTM Stack Directory
export function GTMStackPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedComplexity, setSelectedComplexity] = useState<string>('all');
  const [selectedBudget, setSelectedBudget] = useState<string>('all');
  const [showRecommender, setShowRecommender] = useState(false);
  const [selectedStack, setSelectedStack] = useState<typeof gtmStacks[0] | null>(null);

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
    <div className="min-h-screen" style={{ backgroundColor: 'var(--bg-primary)' }}>
      {/* Hero Section */}
      <div className="relative overflow-hidden border-b" style={{ borderColor: 'var(--border-color)' }}>
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, var(--accent) 0%, transparent 50%),
                           radial-gradient(circle at 75% 75%, var(--accent) 0%, transparent 50%)`
        }} />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="max-w-3xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6" style={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}>
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--accent)' }} />
              <span className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>
                {gtmStacks.length}+ Curated Stacks
              </span>
            </div>

            {/* Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6" style={{ color: 'var(--text-primary)' }}>
              B2B Marketing<br />
              <span style={{ color: 'var(--accent)' }}>Tool Stacks</span>
            </h1>

            {/* Description */}
            <p className="text-lg sm:text-xl leading-relaxed mb-8" style={{ color: 'var(--text-secondary)' }}>
              Stop guessing which tools you need. Explore {gtmStacks.length}+ battle-tested marketing technology stacks, 
              organized by company stage, budget, and GTM motion. Each stack includes rationale, trade-offs, and 
              implementation guidance from real-world experience.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => setShowRecommender(!showRecommender)}
                className="px-6 py-3 rounded-lg text-sm font-semibold transition-all hover:shadow-lg"
                style={{ backgroundColor: 'var(--accent)', color: '#fff' }}
              >
                {showRecommender ? 'Hide Recommender' : 'Find My Stack →'}
              </button>
              <a
                href="#stacks"
                className="px-6 py-3 rounded-lg text-sm font-semibold border transition-all hover:shadow-md"
                style={{ borderColor: 'var(--border-color)', color: 'var(--text-primary)', backgroundColor: 'var(--card-bg)' }}
              >
                Browse All Stacks
              </a>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 mt-12 pt-8 border-t" style={{ borderColor: 'var(--border-color)' }}>
              <div>
                <div className="text-3xl font-bold mb-1" style={{ color: 'var(--text-primary)' }}>
                  {gtmStacks.length}+
                </div>
                <div className="text-sm" style={{ color: 'var(--text-tertiary)' }}>
                  Tool Stacks
                </div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-1" style={{ color: 'var(--text-primary)' }}>
                  {categories.length}
                </div>
                <div className="text-sm" style={{ color: 'var(--text-tertiary)' }}>
                  Categories
                </div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-1" style={{ color: 'var(--text-primary)' }}>
                  {gtmStacks.reduce((sum, s) => sum + s.tools.length, 0)}+
                </div>
                <div className="text-sm" style={{ color: 'var(--text-tertiary)' }}>
                  Tools Covered
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Recommender */}
      {showRecommender && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <StackRecommender />
        </div>
      )}

      {/* Search + Filters Section */}
      <div id="stacks" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative max-w-2xl">
            <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-tertiary)' }} />
            <input
              type="text"
              placeholder="Search stacks by name, audience, or tool..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-12 py-4 rounded-xl border-2 text-base transition-all focus:shadow-lg"
              style={{ 
                backgroundColor: 'var(--card-bg)', 
                borderColor: 'var(--border-color)', 
                color: 'var(--text-primary)' 
              }}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-[var(--bg-secondary)]"
              >
                <X size={16} style={{ color: 'var(--text-tertiary)' }} />
              </button>
            )}
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-3 mb-8">
          {/* Category Filter */}
          <div className="relative">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="appearance-none pl-4 pr-10 py-2.5 rounded-lg border text-sm font-medium cursor-pointer transition-all hover:shadow-md"
              style={{ 
                backgroundColor: selectedCategory !== 'all' ? 'var(--accent)' : 'var(--card-bg)',
                borderColor: 'var(--border-color)',
                color: selectedCategory !== 'all' ? '#fff' : 'var(--text-primary)'
              }}
            >
              <option value="all">All Categories</option>
              {categories.map(({ name, count }) => (
                <option key={name} value={name}>{name} ({count})</option>
              ))}
            </select>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M2 4L6 8L10 4" stroke={selectedCategory !== 'all' ? '#fff' : 'var(--text-tertiary)'} strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
          </div>

          {/* Complexity Filter */}
          <div className="relative">
            <select
              value={selectedComplexity}
              onChange={(e) => setSelectedComplexity(e.target.value)}
              className="appearance-none pl-4 pr-10 py-2.5 rounded-lg border text-sm font-medium cursor-pointer transition-all hover:shadow-md"
              style={{ 
                backgroundColor: selectedComplexity !== 'all' ? 'var(--accent)' : 'var(--card-bg)',
                borderColor: 'var(--border-color)',
                color: selectedComplexity !== 'all' ? '#fff' : 'var(--text-primary)'
              }}
            >
              <option value="all">All Complexity</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M2 4L6 8L10 4" stroke={selectedComplexity !== 'all' ? '#fff' : 'var(--text-tertiary)'} strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
          </div>

          {/* Budget Filter */}
          <div className="relative">
            <select
              value={selectedBudget}
              onChange={(e) => setSelectedBudget(e.target.value)}
              className="appearance-none pl-4 pr-10 py-2.5 rounded-lg border text-sm font-medium cursor-pointer transition-all hover:shadow-md"
              style={{ 
                backgroundColor: selectedBudget !== 'all' ? 'var(--accent)' : 'var(--card-bg)',
                borderColor: 'var(--border-color)',
                color: selectedBudget !== 'all' ? '#fff' : 'var(--text-primary)'
              }}
            >
              <option value="all">All Budgets</option>
              <option value="low">Low (&lt;$5k/mo)</option>
              <option value="medium">Medium ($5k-$20k/mo)</option>
              <option value="high">High (&gt;$20k/mo)</option>
            </select>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M2 4L6 8L10 4" stroke={selectedBudget !== 'all' ? '#fff' : 'var(--text-tertiary)'} strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
          </div>

          {/* Clear Filters */}
          {(selectedCategory !== 'all' || selectedComplexity !== 'all' || selectedBudget !== 'all') && (
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSelectedComplexity('all');
                setSelectedBudget('all');
              }}
              className="px-4 py-2.5 rounded-lg text-sm font-medium border transition-all hover:shadow-md"
              style={{ borderColor: 'var(--border-color)', color: 'var(--text-secondary)' }}
            >
              Clear Filters
            </button>
          )}
        </div>

        {/* Results Count */}
        <div className="mb-6 flex items-center justify-between">
          <p className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>
            Showing <span className="font-bold" style={{ color: 'var(--text-primary)' }}>{filteredStacks.length}</span> of {gtmStacks.length} stacks
          </p>
        </div>

        {/* Tool Cards Grid */}
        {filteredStacks.length === 0 ? (
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4" style={{ backgroundColor: 'var(--bg-secondary)' }}>
              <Search size={24} style={{ color: 'var(--text-tertiary)' }} />
            </div>
            <p className="text-xl font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>No stacks found</p>
            <p className="text-sm" style={{ color: 'var(--text-tertiary)' }}>Try adjusting your search or filters</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredStacks.map((stack) => (
              <div
                key={stack.id}
                className="group p-6 rounded-xl border-2 transition-all hover:shadow-xl hover:-translate-y-1"
                style={{ borderColor: 'var(--border-color)', backgroundColor: 'var(--card-bg)' }}
              >
                {/* Header */}
                <div className="mb-4">
                  <h3 className="text-lg font-bold mb-2 group-hover:text-[var(--accent)] transition-colors" style={{ color: 'var(--text-primary)' }}>
                    {stack.name}
                  </h3>
                  <p className="text-xs leading-relaxed" style={{ color: 'var(--text-tertiary)' }}>
                    {stack.whoItsFor}
                  </p>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="text-xs px-2.5 py-1 rounded-lg font-medium" style={{ backgroundColor: 'var(--bg-secondary)', color: 'var(--text-secondary)' }}>
                    {stack.category}
                  </span>
                  <span className="text-xs px-2.5 py-1 rounded-lg font-medium" style={{ backgroundColor: 'var(--bg-secondary)', color: 'var(--text-secondary)' }}>
                    {stack.complexity}
                  </span>
                  <span className="text-xs px-2.5 py-1 rounded-lg font-medium" style={{ backgroundColor: 'var(--bg-secondary)', color: 'var(--text-secondary)' }}>
                    {stack.budgetRange}
                  </span>
                </div>

                {/* Description */}
                <p className="text-sm mb-4 leading-relaxed line-clamp-3" style={{ color: 'var(--text-secondary)' }}>
                  {stack.problem}
                </p>

                {/* Tools */}
                <div className="mb-4">
                  <p className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: 'var(--text-tertiary)' }}>
                    Tools ({stack.tools.length})
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {stack.tools.slice(0, 5).map((tool) => (
                      <span key={tool} className="text-xs px-2 py-1 rounded border" style={{ borderColor: 'var(--border-color)', color: 'var(--text-secondary)' }}>
                        {tool}
                      </span>
                    ))}
                    {stack.tools.length > 5 && (
                      <span className="text-xs px-2 py-1 font-medium" style={{ color: 'var(--accent)' }}>
                        +{stack.tools.length - 5}
                      </span>
                    )}
                  </div>
                </div>

                {/* Footer */}
                <div className="pt-4 border-t flex items-center justify-between" style={{ borderColor: 'var(--border-color)' }}>
                  <div className="text-xs" style={{ color: 'var(--text-tertiary)' }}>
                    {stack.alternatives.length} alternatives
                  </div>
                  <button 
                    onClick={() => setSelectedStack(stack)}
                    className="text-sm font-semibold flex items-center gap-1 group-hover:gap-2 transition-all" 
                    style={{ color: 'var(--accent)' }}
                  >
                    View Details
                    <ExternalLink size={14} className="transition-transform group-hover:translate-x-0.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Stack Detail Modal */}
      {selectedStack && (
        <StackDetailModal 
          stack={selectedStack} 
          onClose={() => setSelectedStack(null)} 
        />
      )}
    </div>
  );
}
