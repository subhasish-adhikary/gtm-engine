import { useState } from 'react';
import { ToolEngine, ToolInput, toolInputStyles, toolInputTheme } from '../components/ToolEngine';

// Tool 1: GTM Budget Lab
export function GTMBudgetLab() {
  const [inputs, setInputs] = useState({
    budget: '',
    stage: '',
    model: '',
    acv: '',
    salesCycle: '',
    market: '',
    icp: '',
    teamSize: '',
    channels: [] as string[],
    motion: '',
    objective: '',
  });

  const channelOptions = ['LinkedIn', 'Content/SEO', 'Paid Search', 'Paid Social', 'Outbound', 'Events', 'PR', 'Partnerships', 'Podcasts', 'Webinars'];

  const getAllocation = () => {
    const budget = parseInt(inputs.budget) || 0;
    const acv = parseInt(inputs.acv) || 0;
    
    // Decision framework based on ACV and stage
    if (acv > 100000) {
      return {
        channels: [
          { name: 'LinkedIn', allocation: 30, rationale: 'High ACV justifies relationship-based selling. LinkedIn enables targeted outreach to decision-makers.' },
          { name: 'Content/SEO', allocation: 25, rationale: 'Builds authority and inbound pipeline for complex sales cycles.' },
          { name: 'Events', allocation: 20, rationale: 'High-touch engagement critical for enterprise deals.' },
          { name: 'Outbound', allocation: 15, rationale: 'Proactive outreach to target accounts.' },
          { name: 'Partnerships', allocation: 10, rationale: 'Leverage trusted relationships for introductions.' },
        ],
        testingPeriod: '6 months',
        learningObjectives: ['Validate channel effectiveness for enterprise buyers', 'Measure pipeline quality vs quantity', 'Optimize for deal size, not volume'],
      };
    } else if (acv > 25000) {
      return {
        channels: [
          { name: 'Content/SEO', allocation: 30, rationale: 'Mid-market buyers research extensively. Strong content captures demand.' },
          { name: 'LinkedIn', allocation: 25, rationale: 'Balance of inbound and outbound for mid-market.' },
          { name: 'Paid Search', allocation: 20, rationale: 'Capture high-intent search traffic.' },
          { name: 'Outbound', allocation: 15, rationale: 'Targeted outreach to defined ICP.' },
          { name: 'Webinars', allocation: 10, rationale: 'Educational content drives consideration.' },
        ],
        testingPeriod: '3 months',
        learningObjectives: ['Identify highest-converting channels', 'Optimize content for mid-market ICP', 'Balance inbound vs outbound'],
      };
    } else {
      return {
        channels: [
          { name: 'Content/SEO', allocation: 35, rationale: 'Lower ACV requires scalable, low-cost acquisition.' },
          { name: 'Paid Search', allocation: 25, rationale: 'Capture high-intent traffic efficiently.' },
          { name: 'Paid Social', allocation: 20, rationale: 'Build awareness and drive trial signups.' },
          { name: 'LinkedIn', allocation: 10, rationale: 'Targeted outreach for specific segments.' },
          { name: 'Partnerships', allocation: 10, rationale: 'Leverage existing audiences.' },
        ],
        testingPeriod: '90 days',
        learningObjectives: ['Maximize trial signups', 'Optimize for conversion rate', 'Minimize CAC'],
      };
    }
  };

  const allocation = getAllocation();

  return (
    <ToolEngine
      title="GTM Budget Lab"
      description="Model marketing budget allocation across channels based on your stage, goals, and constraints."
      problem="Most marketers allocate budget based on historical spend or gut feeling. This tool uses an explicit decision framework based on your ACV, sales cycle, and GTM motion to recommend channel allocation."
    >
      <ToolInput label="Monthly Budget" description="Total monthly marketing budget in USD">
        <input type="number" value={inputs.budget} onChange={(e) => setInputs({...inputs, budget: e.target.value})} className={toolInputStyles.input} style={toolInputTheme} placeholder="e.g., 50000" />
      </ToolInput>

      <ToolInput label="Company Stage">
        <select value={inputs.stage} onChange={(e) => setInputs({...inputs, stage: e.target.value})} className={toolInputStyles.select} style={toolInputTheme}>
          <option value="">Select...</option>
          <option value="Seed">Seed</option>
          <option value="Series A">Series A</option>
          <option value="Series B">Series B</option>
          <option value="Series C+">Series C+</option>
          <option value="Enterprise">Enterprise</option>
        </select>
      </ToolInput>

      <ToolInput label="Average Contract Value (ACV)" description="Typical deal size in USD">
        <input type="number" value={inputs.acv} onChange={(e) => setInputs({...inputs, acv: e.target.value})} className={toolInputStyles.input} style={toolInputTheme} placeholder="e.g., 50000" />
      </ToolInput>

      <ToolInput label="Sales Cycle Length">
        <select value={inputs.salesCycle} onChange={(e) => setInputs({...inputs, salesCycle: e.target.value})} className={toolInputStyles.select} style={toolInputTheme}>
          <option value="">Select...</option>
          <option value="< 30 days">&lt; 30 days</option>
          <option value="30-90 days">30-90 days</option>
          <option value="90-180 days">90-180 days</option>
          <option value="> 180 days">&gt; 180 days</option>
        </select>
      </ToolInput>

      <ToolInput label="GTM Motion">
        <select value={inputs.motion} onChange={(e) => setInputs({...inputs, motion: e.target.value})} className={toolInputStyles.select} style={toolInputTheme}>
          <option value="">Select...</option>
          <option value="Product-Led">Product-Led</option>
          <option value="Sales-Led">Sales-Led</option>
          <option value="Hybrid">Hybrid</option>
        </select>
      </ToolInput>

      <ToolInput label="Primary Objective">
        <textarea value={inputs.objective} onChange={(e) => setInputs({...inputs, objective: e.target.value})} className={toolInputStyles.textarea} style={toolInputTheme} rows={3} placeholder="e.g., Generate 50 qualified pipeline opportunities" />
      </ToolInput>

      {/* Results */}
      <div className="mt-8 p-6 rounded-lg border-2" style={{ borderColor: 'var(--accent)', backgroundColor: 'var(--bg-secondary)' }}>
        <h3 className="text-lg font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>Recommended Allocation</h3>
        
        <div className="space-y-4">
          {allocation.channels.map((channel, i) => (
            <div key={i} className="p-4 rounded-lg border" style={{ borderColor: 'var(--border-color)', backgroundColor: 'var(--card-bg)' }}>
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold" style={{ color: 'var(--text-primary)' }}>{channel.name}</span>
                <span className="text-2xl font-bold" style={{ color: 'var(--accent)' }}>{channel.allocation}%</span>
              </div>
              <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{channel.rationale}</p>
              <div className="mt-2 text-xs" style={{ color: 'var(--text-tertiary)' }}>
                ${Math.round((parseInt(inputs.budget) || 0) * channel.allocation / 100).toLocaleString()}/month
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 rounded-lg" style={{ backgroundColor: 'var(--bg-tertiary)' }}>
          <h4 className="text-sm font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>Testing Period</h4>
          <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{allocation.testingPeriod}</p>
          
          <h4 className="text-sm font-semibold mt-4 mb-2" style={{ color: 'var(--text-primary)' }}>Learning Objectives</h4>
          <ul className="space-y-1">
            {allocation.learningObjectives.map((obj, i) => (
              <li key={i} className="text-sm flex gap-2" style={{ color: 'var(--text-secondary)' }}>
                <span style={{ color: 'var(--accent)' }}>→</span>
                <span>{obj}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-6 p-4 rounded-lg border-l-4" style={{ borderColor: 'var(--accent)' }}>
          <h4 className="text-sm font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>Decision Framework</h4>
          <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
            This allocation is based on your ACV of ${parseInt(inputs.acv).toLocaleString()}, which indicates {parseInt(inputs.acv) > 100000 ? 'enterprise' : parseInt(inputs.acv) > 25000 ? 'mid-market' : 'SMB'} buyers. {parseInt(inputs.acv) > 100000 ? 'High ACV justifies high-touch, relationship-based channels.' : parseInt(inputs.acv) > 25000 ? 'Mid-market requires balance of inbound and outbound.' : 'Lower ACV requires scalable, efficient channels.'}
          </p>
        </div>
      </div>
    </ToolEngine>
  );
}

// Tool 2: GTM Diagnostic
export function GTMDiagnostic() {
  const [inputs, setInputs] = useState({
    icp: '',
    positioning: '',
    offer: '',
    distribution: '',
    demandGen: '',
    sales: '',
    content: '',
    channels: '',
    conversion: '',
    retention: '',
    measurement: '',
    operations: '',
    ai: '',
  });

  return (
    <ToolEngine
      title="GTM Diagnostic"
      description="Assess your go-to-market motion across positioning, channels, messaging, and funnel architecture."
      problem="GTM systems break down silently. By the time you notice pipeline problems, the root cause has compounded. This diagnostic identifies structural issues before they impact results."
    >
      <ToolInput label="ICP Clarity" description="How well-defined is your ideal customer profile?">
        <textarea value={inputs.icp} onChange={(e) => setInputs({...inputs, icp: e.target.value})} className={toolInputStyles.textarea} style={toolInputTheme} rows={2} placeholder="Describe your ICP..." />
      </ToolInput>

      <ToolInput label="Positioning" description="How do you differentiate from competitors?">
        <textarea value={inputs.positioning} onChange={(e) => setInputs({...inputs, positioning: e.target.value})} className={toolInputStyles.textarea} style={toolInputTheme} rows={2} placeholder="Your positioning statement..." />
      </ToolInput>

      <ToolInput label="Offer" description="What do you sell and how is it packaged?">
        <textarea value={inputs.offer} onChange={(e) => setInputs({...inputs, offer: e.target.value})} className={toolInputStyles.textarea} style={toolInputTheme} rows={2} placeholder="Your offer..." />
      </ToolInput>

      <ToolInput label="Distribution" description="How do customers buy from you?">
        <textarea value={inputs.distribution} onChange={(e) => setInputs({...inputs, distribution: e.target.value})} className={toolInputStyles.textarea} style={toolInputTheme} rows={2} placeholder="Sales process..." />
      </ToolInput>

      <ToolInput label="Demand Generation" description="How do you generate pipeline?">
        <textarea value={inputs.demandGen} onChange={(e) => setInputs({...inputs, demandGen: e.target.value})} className={toolInputStyles.textarea} style={toolInputTheme} rows={2} placeholder="Your demand gen approach..." />
      </ToolInput>

      <ToolInput label="Sales Process" description="How does your sales team work?">
        <textarea value={inputs.sales} onChange={(e) => setInputs({...inputs, sales: e.target.value})} className={toolInputStyles.textarea} style={toolInputTheme} rows={2} placeholder="Sales process..." />
      </ToolInput>

      <ToolInput label="Content Strategy" description="What content do you create and why?">
        <textarea value={inputs.content} onChange={(e) => setInputs({...inputs, content: e.target.value})} className={toolInputStyles.textarea} style={toolInputTheme} rows={2} placeholder="Content strategy..." />
      </ToolInput>

      <ToolInput label="Channel Strategy" description="Which channels do you use and why?">
        <textarea value={inputs.channels} onChange={(e) => setInputs({...inputs, channels: e.target.value})} className={toolInputStyles.textarea} style={toolInputTheme} rows={2} placeholder="Your channels..." />
      </ToolInput>

      <ToolInput label="Conversion" description="How do you convert prospects to customers?">
        <textarea value={inputs.conversion} onChange={(e) => setInputs({...inputs, conversion: e.target.value})} className={toolInputStyles.textarea} style={toolInputTheme} rows={2} placeholder="Conversion approach..." />
      </ToolInput>

      <ToolInput label="Retention" description="How do you retain and expand customers?">
        <textarea value={inputs.retention} onChange={(e) => setInputs({...inputs, retention: e.target.value})} className={toolInputStyles.textarea} style={toolInputTheme} rows={2} placeholder="Retention strategy..." />
      </ToolInput>

      <ToolInput label="Measurement" description="How do you measure marketing performance?">
        <textarea value={inputs.measurement} onChange={(e) => setInputs({...inputs, measurement: e.target.value})} className={toolInputStyles.textarea} style={toolInputTheme} rows={2} placeholder="Your metrics..." />
      </ToolInput>

      <ToolInput label="Operations" description="How do you execute marketing operations?">
        <textarea value={inputs.operations} onChange={(e) => setInputs({...inputs, operations: e.target.value})} className={toolInputStyles.textarea} style={toolInputTheme} rows={2} placeholder="Your ops..." />
      </ToolInput>

      <ToolInput label="AI/Automation" description="How do you use AI and automation?">
        <textarea value={inputs.ai} onChange={(e) => setInputs({...inputs, ai: e.target.value})} className={toolInputStyles.textarea} style={toolInputTheme} rows={2} placeholder="Your AI usage..." />
      </ToolInput>

      {/* Results */}
      <div className="mt-8 p-6 rounded-lg border-2" style={{ borderColor: 'var(--accent)', backgroundColor: 'var(--bg-secondary)' }}>
        <h3 className="text-lg font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>Diagnostic Results</h3>
        
        <div className="space-y-4">
          <div className="p-4 rounded-lg border" style={{ borderColor: 'var(--border-color)', backgroundColor: 'var(--card-bg)' }}>
            <h4 className="font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>Strengths</h4>
            <ul className="space-y-1">
              {inputs.icp && <li className="text-sm" style={{ color: 'var(--text-secondary)' }}>✓ ICP definition provided</li>}
              {inputs.positioning && <li className="text-sm" style={{ color: 'var(--text-secondary)' }}>✓ Positioning articulated</li>}
              {inputs.channels && <li className="text-sm" style={{ color: 'var(--text-secondary)' }}>✓ Channel strategy defined</li>}
            </ul>
          </div>

          <div className="p-4 rounded-lg border" style={{ borderColor: 'var(--border-color)', backgroundColor: 'var(--card-bg)' }}>
            <h4 className="font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>Gaps Identified</h4>
            <ul className="space-y-1">
              {!inputs.measurement && <li className="text-sm" style={{ color: 'var(--text-secondary)' }}>✗ Measurement framework missing</li>}
              {!inputs.retention && <li className="text-sm" style={{ color: 'var(--text-secondary)' }}>✗ Retention strategy not defined</li>}
              {!inputs.ai && <li className="text-sm" style={{ color: 'var(--text-secondary)' }}>✗ AI/automation not leveraged</li>}
            </ul>
          </div>

          <div className="p-4 rounded-lg" style={{ backgroundColor: 'var(--bg-tertiary)' }}>
            <h4 className="text-sm font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>Priority Actions (90-Day Plan)</h4>
            <ol className="space-y-2">
              <li className="text-sm" style={{ color: 'var(--text-secondary)' }}>1. Define measurement framework with clear KPIs</li>
              <li className="text-sm" style={{ color: 'var(--text-secondary)' }}>2. Build retention strategy to reduce churn</li>
              <li className="text-sm" style={{ color: 'var(--text-secondary)' }}>3. Implement AI for content and workflow automation</li>
              <li className="text-sm" style={{ color: 'var(--text-secondary)' }}>4. Audit channel performance and reallocate budget</li>
            </ol>
          </div>
        </div>
      </div>
    </ToolEngine>
  );
}

// Tool 3: GTM Stack Builder
export function GTMStackBuilder() {
  const [inputs, setInputs] = useState({
    budget: '',
    teamSize: '',
    model: '',
    crm: '',
    channels: [] as string[],
    stage: '',
    acv: '',
    salesCycle: '',
  });

  const getStack = () => {
    const budget = parseInt(inputs.budget) || 0;
    
    if (budget < 5000) {
      return {
        name: 'Lean Startup Stack',
        tools: ['HubSpot Starter', 'Mailchimp', 'Google Analytics', 'LinkedIn Sales Navigator', 'Notion'],
        cost: '$500-2,000/month',
        complexity: 'Low',
        rationale: 'Low budget requires all-in-one platforms with minimal integration complexity.',
        alternatives: ['Pipedrive + ActiveCampaign', 'Close.io + Customer.io'],
      };
    } else if (budget < 20000) {
      return {
        name: 'Growth Stage Stack',
        tools: ['HubSpot Professional', 'Segment', 'Drift', 'ZoomInfo', 'Ahrefs', 'Looker'],
        cost: '$5,000-15,000/month',
        complexity: 'Medium',
        rationale: 'Mid-budget allows for specialized tools with moderate integration requirements.',
        alternatives: ['Marketo + Salesforce + 6sense', 'Pardot + Dynamics + DemandBase'],
      };
    } else {
      return {
        name: 'Enterprise Stack',
        tools: ['Salesforce', 'Marketo', 'Demandbase', '6sense', 'Gong', 'Highspot', 'ZoomInfo', 'Clearbit'],
        cost: '$50,000-200,000/year',
        complexity: 'High',
        rationale: 'High budget enables enterprise-grade tools with full integration capabilities.',
        alternatives: ['HubSpot Enterprise + Terminus', 'Microsoft Dynamics + Engagio'],
      };
    }
  };

  const stack = getStack();

  return (
    <ToolEngine
      title="GTM Stack Builder"
      description="Design your marketing technology stack based on company size, budget, and growth stage."
      problem="Choosing the right marketing stack is critical but confusing. This tool recommends a coherent stack based on your specific context, explaining why each tool fits and what alternatives exist."
    >
      <ToolInput label="Monthly Budget" description="Total monthly marketing technology budget">
        <input type="number" value={inputs.budget} onChange={(e) => setInputs({...inputs, budget: e.target.value})} className={toolInputStyles.input} style={toolInputTheme} placeholder="e.g., 10000" />
      </ToolInput>

      <ToolInput label="Team Size">
        <select value={inputs.teamSize} onChange={(e) => setInputs({...inputs, teamSize: e.target.value})} className={toolInputStyles.select} style={toolInputTheme}>
          <option value="">Select...</option>
          <option value="1-3">1-3 marketers</option>
          <option value="4-10">4-10 marketers</option>
          <option value="11-25">11-25 marketers</option>
          <option value="25+">25+ marketers</option>
        </select>
      </ToolInput>

      <ToolInput label="GTM Model">
        <select value={inputs.model} onChange={(e) => setInputs({...inputs, model: e.target.value})} className={toolInputStyles.select} style={toolInputTheme}>
          <option value="">Select...</option>
          <option value="Product-Led">Product-Led</option>
          <option value="Sales-Led">Sales-Led</option>
          <option value="Hybrid">Hybrid</option>
        </select>
      </ToolInput>

      <ToolInput label="Current CRM">
        <input type="text" value={inputs.crm} onChange={(e) => setInputs({...inputs, crm: e.target.value})} className={toolInputStyles.input} style={toolInputTheme} placeholder="e.g., HubSpot, Salesforce" />
      </ToolInput>

      <ToolInput label="Company Stage">
        <select value={inputs.stage} onChange={(e) => setInputs({...inputs, stage: e.target.value})} className={toolInputStyles.select} style={toolInputTheme}>
          <option value="">Select...</option>
          <option value="Seed">Seed</option>
          <option value="Series A">Series A</option>
          <option value="Series B">Series B</option>
          <option value="Series C+">Series C+</option>
        </select>
      </ToolInput>

      <ToolInput label="Average Contract Value (ACV)">
        <input type="number" value={inputs.acv} onChange={(e) => setInputs({...inputs, acv: e.target.value})} className={toolInputStyles.input} style={toolInputTheme} placeholder="e.g., 25000" />
      </ToolInput>

      {/* Results */}
      <div className="mt-8 p-6 rounded-lg border-2" style={{ borderColor: 'var(--accent)', backgroundColor: 'var(--bg-secondary)' }}>
        <h3 className="text-lg font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>Recommended Stack: {stack.name}</h3>
        
        <div className="space-y-4">
          <div className="p-4 rounded-lg border" style={{ borderColor: 'var(--border-color)', backgroundColor: 'var(--card-bg)' }}>
            <h4 className="font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>Tools</h4>
            <div className="flex flex-wrap gap-2">
              {stack.tools.map((tool, i) => (
                <span key={i} className="text-xs px-2 py-1 rounded border" style={{ borderColor: 'var(--border-color)', color: 'var(--text-secondary)' }}>{tool}</span>
              ))}
            </div>
          </div>

          <div className="p-4 rounded-lg" style={{ backgroundColor: 'var(--bg-tertiary)' }}>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="text-xs font-semibold mb-1" style={{ color: 'var(--text-tertiary)' }}>Cost</h4>
                <p className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{stack.cost}</p>
              </div>
              <div>
                <h4 className="text-xs font-semibold mb-1" style={{ color: 'var(--text-tertiary)' }}>Complexity</h4>
                <p className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{stack.complexity}</p>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-lg border-l-4" style={{ borderColor: 'var(--accent)' }}>
            <h4 className="text-sm font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>Why This Stack</h4>
            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{stack.rationale}</p>
          </div>

          <div className="p-4 rounded-lg border" style={{ borderColor: 'var(--border-color)', backgroundColor: 'var(--card-bg)' }}>
            <h4 className="text-sm font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>Alternatives</h4>
            <ul className="space-y-1">
              {stack.alternatives.map((alt, i) => (
                <li key={i} className="text-sm" style={{ color: 'var(--text-secondary)' }}>• {alt}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </ToolEngine>
  );
}
