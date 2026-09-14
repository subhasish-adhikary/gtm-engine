import { useState } from 'react';
import { ToolEngine, ToolInput, toolInputStyles, toolInputTheme } from '../components/ToolEngine';

// Tool 4: Marketing Automation Planner
export function MarketingAutomationPlanner() {
  const [inputs, setInputs] = useState({
    workflows: '',
    crm: '',
    leadVolume: '',
    teamSize: '',
    channels: '',
    goals: '',
  });

  return (
    <ToolEngine
      title="Marketing Automation Planner"
      description="Plan automation workflows for lead nurture, onboarding, retention, and reactivation."
      problem="Most marketing automation is built bottom-up (tactic by tactic) rather than top-down (strategy first). This tool helps you design automation architecture based on your customer lifecycle."
    >
      <ToolInput label="Current Workflows" description="What automation do you currently have?">
        <textarea value={inputs.workflows} onChange={(e) => setInputs({...inputs, workflows: e.target.value})} className={toolInputStyles.textarea} style={toolInputTheme} rows={3} placeholder="Describe current workflows..." />
      </ToolInput>

      <ToolInput label="CRM">
        <input type="text" value={inputs.crm} onChange={(e) => setInputs({...inputs, crm: e.target.value})} className={toolInputStyles.input} style={toolInputTheme} placeholder="e.g., HubSpot, Salesforce" />
      </ToolInput>

      <ToolInput label="Monthly Lead Volume">
        <input type="number" value={inputs.leadVolume} onChange={(e) => setInputs({...inputs, leadVolume: e.target.value})} className={toolInputStyles.input} style={toolInputTheme} placeholder="e.g., 500" />
      </ToolInput>

      <ToolInput label="Marketing Team Size">
        <input type="number" value={inputs.teamSize} onChange={(e) => setInputs({...inputs, teamSize: e.target.value})} className={toolInputStyles.input} style={toolInputTheme} placeholder="e.g., 3" />
      </ToolInput>

      <ToolInput label="Active Channels">
        <textarea value={inputs.channels} onChange={(e) => setInputs({...inputs, channels: e.target.value})} className={toolInputStyles.textarea} style={toolInputTheme} rows={2} placeholder="e.g., Email, LinkedIn, Webinars" />
      </ToolInput>

      <ToolInput label="Primary Goals">
        <textarea value={inputs.goals} onChange={(e) => setInputs({...inputs, goals: e.target.value})} className={toolInputStyles.textarea} style={toolInputTheme} rows={2} placeholder="e.g., Increase MQL to SQL conversion" />
      </ToolInput>

      {/* Results */}
      <div className="mt-8 p-6 rounded-lg border-2" style={{ borderColor: 'var(--accent)', backgroundColor: 'var(--bg-secondary)' }}>
        <h3 className="text-lg font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>Automation Recommendations</h3>
        
        <div className="space-y-4">
          <div className="p-4 rounded-lg border" style={{ borderColor: 'var(--border-color)', backgroundColor: 'var(--card-bg)' }}>
            <h4 className="font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>What to Automate</h4>
            <ul className="space-y-1">
              <li className="text-sm" style={{ color: 'var(--text-secondary)' }}>→ Lead routing based on ICP fit</li>
              <li className="text-sm" style={{ color: 'var(--text-secondary)' }}>→ Nurture sequences for each lifecycle stage</li>
              <li className="text-sm" style={{ color: 'var(--text-secondary)' }}>→ Re-engagement for inactive leads</li>
              <li className="text-sm" style={{ color: 'var(--text-secondary)' }}>→ Post-demo follow-up sequences</li>
            </ul>
          </div>

          <div className="p-4 rounded-lg border" style={{ borderColor: 'var(--border-color)', backgroundColor: 'var(--card-bg)' }}>
            <h4 className="font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>What to AI-Assist</h4>
            <ul className="space-y-1">
              <li className="text-sm" style={{ color: 'var(--text-secondary)' }}>→ Personalized email content generation</li>
              <li className="text-sm" style={{ color: 'var(--text-secondary)' }}>→ Lead scoring model optimization</li>
              <li className="text-sm" style={{ color: 'var(--text-secondary)' }}>→ Send time optimization</li>
            </ul>
          </div>

          <div className="p-4 rounded-lg border" style={{ borderColor: 'var(--border-color)', backgroundColor: 'var(--card-bg)' }}>
            <h4 className="font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>What Should Remain Human</h4>
            <ul className="space-y-1">
              <li className="text-sm" style={{ color: 'var(--text-secondary)' }}>→ Strategic messaging decisions</li>
              <li className="text-sm" style={{ color: 'var(--text-secondary)' }}>→ High-value prospect outreach</li>
              <li className="text-sm" style={{ color: 'var(--text-secondary)' }}>→ Customer relationship management</li>
            </ul>
          </div>

          <div className="p-4 rounded-lg" style={{ backgroundColor: 'var(--bg-tertiary)' }}>
            <h4 className="text-sm font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>Implementation Priority</h4>
            <ol className="space-y-1">
              <li className="text-sm" style={{ color: 'var(--text-secondary)' }}>1. Define lifecycle stages and entry/exit criteria</li>
              <li className="text-sm" style={{ color: 'var(--text-secondary)' }}>2. Build lead routing automation</li>
              <li className="text-sm" style={{ color: 'var(--text-secondary)' }}>3. Create nurture sequences per stage</li>
              <li className="text-sm" style={{ color: 'var(--text-secondary)' }}>4. Implement measurement and reporting</li>
            </ol>
          </div>

          <div className="p-4 rounded-lg border-l-4" style={{ borderColor: 'var(--accent)' }}>
            <h4 className="text-sm font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>Risks</h4>
            <ul className="space-y-1">
              <li className="text-sm" style={{ color: 'var(--text-secondary)' }}>• Over-automation can feel impersonal</li>
              <li className="text-sm" style={{ color: 'var(--text-secondary)' }}>• Workflow complexity can become unmanageable</li>
              <li className="text-sm" style={{ color: 'var(--text-secondary)' }}>• Requires ongoing maintenance and optimization</li>
            </ul>
          </div>
        </div>
      </div>
    </ToolEngine>
  );
}

// Tool 5: Ad Copy Analyzer
export function AdCopyAnalyzer() {
  const [inputs, setInputs] = useState({
    copy: '',
    audience: '',
    goal: '',
    platform: '',
  });

  const analyzeCopy = (copy: string) => {
    const scores = {
      hook: copy.split(' ').slice(0, 5).join(' ').length > 20 ? 8 : 5,
      clarity: copy.length < 200 ? 8 : 6,
      painPoint: copy.toLowerCase().includes('problem') || copy.toLowerCase().includes('struggle') || copy.toLowerCase().includes('challenge') ? 8 : 5,
      valueProp: copy.toLowerCase().includes('save') || copy.toLowerCase().includes('increase') || copy.toLowerCase().includes('reduce') ? 8 : 5,
      specificity: /\d+/.test(copy) ? 9 : 5,
      cta: copy.toLowerCase().includes('try') || copy.toLowerCase().includes('get') || copy.toLowerCase().includes('start') ? 8 : 5,
    };

    const overall = Math.round(Object.values(scores).reduce((a, b) => a + b, 0) / Object.keys(scores).length);

    return { scores, overall };
  };

  const analysis = analyzeCopy(inputs.copy);

  return (
    <ToolEngine
      title="Ad Copy Analyzer"
      description="Analyze ad and landing page copy for clarity, persuasion, and conversion potential."
      problem="Most ad copy is written based on intuition rather than strategic principles. This tool analyzes your copy against proven frameworks and provides actionable recommendations."
    >
      <ToolInput label="Ad Copy" description="Paste your ad copy here">
        <textarea value={inputs.copy} onChange={(e) => setInputs({...inputs, copy: e.target.value})} className={toolInputStyles.textarea} style={toolInputTheme} rows={6} placeholder="Paste your ad copy..." />
      </ToolInput>

      <ToolInput label="Target Audience">
        <input type="text" value={inputs.audience} onChange={(e) => setInputs({...inputs, audience: e.target.value})} className={toolInputStyles.input} style={toolInputTheme} placeholder="e.g., VP Marketing at B2B SaaS" />
      </ToolInput>

      <ToolInput label="Goal">
        <input type="text" value={inputs.goal} onChange={(e) => setInputs({...inputs, goal: e.target.value})} className={toolInputStyles.input} style={toolInputTheme} placeholder="e.g., Drive demo signups" />
      </ToolInput>

      <ToolInput label="Platform">
        <select value={inputs.platform} onChange={(e) => setInputs({...inputs, platform: e.target.value})} className={toolInputStyles.select} style={toolInputTheme}>
          <option value="">Select...</option>
          <option value="LinkedIn">LinkedIn</option>
          <option value="Google">Google Ads</option>
          <option value="Facebook">Facebook</option>
          <option value="Twitter">Twitter/X</option>
        </select>
      </ToolInput>

      {/* Results */}
      {inputs.copy && (
        <div className="mt-8 p-6 rounded-lg border-2" style={{ borderColor: 'var(--accent)', backgroundColor: 'var(--bg-secondary)' }}>
          <h3 className="text-lg font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>Copy Analysis</h3>
          
          <div className="mb-6 text-center">
            <div className="text-5xl font-bold" style={{ color: 'var(--accent)' }}>{analysis.overall}/10</div>
            <div className="text-sm mt-1" style={{ color: 'var(--text-tertiary)' }}>Overall Score</div>
          </div>

          <div className="space-y-3">
            {Object.entries(analysis.scores).map(([key, score]) => (
              <div key={key} className="flex items-center justify-between p-3 rounded-lg border" style={{ borderColor: 'var(--border-color)', backgroundColor: 'var(--card-bg)' }}>
                <span className="text-sm font-medium capitalize" style={{ color: 'var(--text-primary)' }}>{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                <div className="flex items-center gap-2">
                  <div className="w-24 h-2 rounded-full" style={{ backgroundColor: 'var(--bg-tertiary)' }}>
                    <div className="h-full rounded-full" style={{ width: `${score * 10}%`, backgroundColor: 'var(--accent)' }} />
                  </div>
                  <span className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>{score}/10</span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 rounded-lg border-l-4" style={{ borderColor: 'var(--accent)' }}>
            <h4 className="text-sm font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>Recommendations</h4>
            <ul className="space-y-1">
              {analysis.scores.hook < 7 && <li className="text-sm" style={{ color: 'var(--text-secondary)' }}>→ Strengthen your hook with a more compelling opening</li>}
              {analysis.scores.specificity < 7 && <li className="text-sm" style={{ color: 'var(--text-secondary)' }}>→ Add specific numbers, metrics, or examples</li>}
              {analysis.scores.painPoint < 7 && <li className="text-sm" style={{ color: 'var(--text-secondary)' }}>→ Clearly articulate the problem you solve</li>}
              {analysis.scores.cta < 7 && <li className="text-sm" style={{ color: 'var(--text-secondary)' }}>→ Make your call-to-action more direct and compelling</li>}
            </ul>
          </div>
        </div>
      )}
    </ToolEngine>
  );
}

// Tool 6: Content Opportunity Analyzer
export function ContentOpportunityAnalyzer() {
  const [inputs, setInputs] = useState({
    icp: '',
    product: '',
    market: '',
    existingContent: '',
    competitors: '',
    goal: '',
  });

  return (
    <ToolEngine
      title="Content Opportunity Analyzer"
      description="Identify content gaps and opportunities based on your market, competitors, and audience."
      problem="Most content strategies are built on assumptions rather than data. This tool helps you identify high-impact content opportunities based on your ICP, market, and competitive landscape."
    >
      <ToolInput label="Ideal Customer Profile (ICP)">
        <textarea value={inputs.icp} onChange={(e) => setInputs({...inputs, icp: e.target.value})} className={toolInputStyles.textarea} style={toolInputTheme} rows={2} placeholder="Describe your ICP..." />
      </ToolInput>

      <ToolInput label="Product/Service">
        <textarea value={inputs.product} onChange={(e) => setInputs({...inputs, product: e.target.value})} className={toolInputStyles.textarea} style={toolInputTheme} rows={2} placeholder="What do you sell?" />
      </ToolInput>

      <ToolInput label="Market/Industry">
        <input type="text" value={inputs.market} onChange={(e) => setInputs({...inputs, market: e.target.value})} className={toolInputStyles.input} style={toolInputTheme} placeholder="e.g., B2B SaaS, Fintech" />
      </ToolInput>

      <ToolInput label="Existing Content" description="What content have you already created?">
        <textarea value={inputs.existingContent} onChange={(e) => setInputs({...inputs, existingContent: e.target.value})} className={toolInputStyles.textarea} style={toolInputTheme} rows={2} placeholder="List your existing content..." />
      </ToolInput>

      <ToolInput label="Key Competitors">
        <textarea value={inputs.competitors} onChange={(e) => setInputs({...inputs, competitors: e.target.value})} className={toolInputStyles.textarea} style={toolInputTheme} rows={2} placeholder="List competitors..." />
      </ToolInput>

      <ToolInput label="Primary Content Goal">
        <input type="text" value={inputs.goal} onChange={(e) => setInputs({...inputs, goal: e.target.value})} className={toolInputStyles.input} style={toolInputTheme} placeholder="e.g., Drive organic traffic" />
      </ToolInput>

      {/* Results */}
      <div className="mt-8 p-6 rounded-lg border-2" style={{ borderColor: 'var(--accent)', backgroundColor: 'var(--bg-secondary)' }}>
        <h3 className="text-lg font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>Content Opportunities</h3>
        
        <div className="space-y-4">
          <div className="p-4 rounded-lg border" style={{ borderColor: 'var(--border-color)', backgroundColor: 'var(--card-bg)' }}>
            <h4 className="font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>High-Priority Topics</h4>
            <ul className="space-y-2">
              <li className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                <span className="font-medium">How-to guides for your core use cases</span>
                <div className="text-xs mt-1" style={{ color: 'var(--text-tertiary)' }}>Funnel stage: Consideration | Format: Long-form article</div>
              </li>
              <li className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                <span className="font-medium">Comparison content vs. competitors</span>
                <div className="text-xs mt-1" style={{ color: 'var(--text-tertiary)' }}>Funnel stage: Decision | Format: Comparison guide</div>
              </li>
              <li className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                <span className="font-medium">Industry benchmarks and data</span>
                <div className="text-xs mt-1" style={{ color: 'var(--text-tertiary)' }}>Funnel stage: Awareness | Format: Research report</div>
              </li>
            </ul>
          </div>

          <div className="p-4 rounded-lg" style={{ backgroundColor: 'var(--bg-tertiary)' }}>
            <h4 className="text-sm font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>Content Gaps</h4>
            <ul className="space-y-1">
              <li className="text-sm" style={{ color: 'var(--text-secondary)' }}>• Lack of bottom-of-funnel comparison content</li>
              <li className="text-sm" style={{ color: 'var(--text-secondary)' }}>• Missing customer case studies</li>
              <li className="text-sm" style={{ color: 'var(--text-secondary)' }}>• No original research or data</li>
            </ul>
          </div>

          <div className="p-4 rounded-lg border-l-4" style={{ borderColor: 'var(--accent)' }}>
            <h4 className="text-sm font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>Recommended Actions</h4>
            <ol className="space-y-1">
              <li className="text-sm" style={{ color: 'var(--text-secondary)' }}>1. Create 3 comparison guides targeting high-intent keywords</li>
              <li className="text-sm" style={{ color: 'var(--text-secondary)' }}>2. Publish 2 customer case studies per quarter</li>
              <li className="text-sm" style={{ color: 'var(--text-secondary)' }}>3. Conduct original research and publish annual report</li>
              <li className="text-sm" style={{ color: 'var(--text-secondary)' }}>4. Build topical authority with pillar content</li>
            </ol>
          </div>
        </div>
      </div>
    </ToolEngine>
  );
}

// Tool 7: GTM Experiment Planner
export function GTMExperimentPlanner() {
  const [inputs, setInputs] = useState({
    goal: '',
    baseline: '',
    audience: '',
    budget: '',
    time: '',
    channel: '',
  });

  return (
    <ToolEngine
      title="GTM Experiment Planner"
      description="Design, prioritize, and track growth experiments with a structured framework."
      problem="Most growth experiments are poorly designed, lack clear hypotheses, and don't generate actionable learnings. This tool helps you structure experiments for maximum learning."
    >
      <ToolInput label="Experiment Goal">
        <input type="text" value={inputs.goal} onChange={(e) => setInputs({...inputs, goal: e.target.value})} className={toolInputStyles.input} style={toolInputTheme} placeholder="e.g., Increase demo signups" />
      </ToolInput>

      <ToolInput label="Current Baseline" description="What's your current performance?">
        <input type="text" value={inputs.baseline} onChange={(e) => setInputs({...inputs, baseline: e.target.value})} className={toolInputStyles.input} style={toolInputTheme} placeholder="e.g., 50 demo signups/month" />
      </ToolInput>

      <ToolInput label="Target Audience">
        <input type="text" value={inputs.audience} onChange={(e) => setInputs({...inputs, audience: e.target.value})} className={toolInputStyles.input} style={toolInputTheme} placeholder="e.g., VP Marketing at B2B SaaS" />
      </ToolInput>

      <ToolInput label="Experiment Budget">
        <input type="text" value={inputs.budget} onChange={(e) => setInputs({...inputs, budget: e.target.value})} className={toolInputStyles.input} style={toolInputTheme} placeholder="e.g., $5,000" />
      </ToolInput>

      <ToolInput label="Time Frame">
        <input type="text" value={inputs.time} onChange={(e) => setInputs({...inputs, time: e.target.value})} className={toolInputStyles.input} style={toolInputTheme} placeholder="e.g., 30 days" />
      </ToolInput>

      <ToolInput label="Channel">
        <input type="text" value={inputs.channel} onChange={(e) => setInputs({...inputs, channel: e.target.value})} className={toolInputStyles.input} style={toolInputTheme} placeholder="e.g., LinkedIn Ads" />
      </ToolInput>

      {/* Results */}
      <div className="mt-8 p-6 rounded-lg border-2" style={{ borderColor: 'var(--accent)', backgroundColor: 'var(--bg-secondary)' }}>
        <h3 className="text-lg font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>Experiment Design</h3>
        
        <div className="space-y-4">
          <div className="p-4 rounded-lg border" style={{ borderColor: 'var(--border-color)', backgroundColor: 'var(--card-bg)' }}>
            <h4 className="font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>Hypothesis</h4>
            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
              If we [change variable] for [audience], then we will see [expected outcome] because [rationale].
            </p>
          </div>

          <div className="p-4 rounded-lg" style={{ backgroundColor: 'var(--bg-tertiary)' }}>
            <h4 className="text-sm font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>Success Metrics</h4>
            <ul className="space-y-1">
              <li className="text-sm" style={{ color: 'var(--text-secondary)' }}>• Primary: {inputs.goal || 'Define primary metric'}</li>
              <li className="text-sm" style={{ color: 'var(--text-secondary)' }}>• Secondary: Engagement rate, click-through rate</li>
              <li className="text-sm" style={{ color: 'var(--text-secondary)' }}>• Guardrail: Cost per acquisition &lt; $X</li>
            </ul>
          </div>

          <div className="p-4 rounded-lg border" style={{ borderColor: 'var(--border-color)', backgroundColor: 'var(--card-bg)' }}>
            <h4 className="font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>Minimum Viable Test</h4>
            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
              Run for {inputs.time || '2-4 weeks'} with {inputs.budget || 'defined budget'} to achieve statistical significance.
            </p>
          </div>

          <div className="p-4 rounded-lg border-l-4" style={{ borderColor: 'var(--accent)' }}>
            <h4 className="text-sm font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>Decision Threshold</h4>
            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
              Scale if: 20%+ improvement in primary metric<br/>
              Iterate if: 5-20% improvement<br/>
              Kill if: &lt;5% improvement or negative ROI
            </p>
          </div>

          <div className="p-4 rounded-lg" style={{ backgroundColor: 'var(--bg-tertiary)' }}>
            <h4 className="text-sm font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>Expected Learning</h4>
            <ul className="space-y-1">
              <li className="text-sm" style={{ color: 'var(--text-secondary)' }}>• Channel effectiveness for this audience</li>
              <li className="text-sm" style={{ color: 'var(--text-secondary)' }}>• Messaging resonance</li>
              <li className="text-sm" style={{ color: 'var(--text-secondary)' }}>• Cost benchmarks for future planning</li>
            </ul>
          </div>
        </div>
      </div>
    </ToolEngine>
  );
}

// Tool 8: AI Visibility / GEO Diagnostic
export function AIVisibilityDiagnostic() {
  const [inputs, setInputs] = useState({
    brand: '',
    content: '',
    authority: '',
    citations: '',
    coverage: '',
    research: '',
    credibility: '',
    technical: '',
    structured: '',
    discoverability: '',
  });

  return (
    <ToolEngine
      title="AI Visibility / GEO Diagnostic"
      description="Assess your brand's visibility in AI-generated answers and generative search."
      problem="As AI search grows, brands need to optimize for visibility in AI-generated answers. This diagnostic assesses your readiness for generative engine optimization (GEO)."
    >
      <ToolInput label="Brand Clarity" description="How clearly is your brand defined?">
        <textarea value={inputs.brand} onChange={(e) => setInputs({...inputs, brand: e.target.value})} className={toolInputStyles.textarea} style={toolInputTheme} rows={2} placeholder="Brand positioning..." />
      </ToolInput>

      <ToolInput label="Content Authority" description="How authoritative is your content?">
        <textarea value={inputs.content} onChange={(e) => setInputs({...inputs, content: e.target.value})} className={toolInputStyles.textarea} style={toolInputTheme} rows={2} placeholder="Content quality..." />
      </ToolInput>

      <ToolInput label="Citations & References" description="How often is your content cited?">
        <textarea value={inputs.citations} onChange={(e) => setInputs({...inputs, citations: e.target.value})} className={toolInputStyles.textarea} style={toolInputTheme} rows={2} placeholder="Citation frequency..." />
      </ToolInput>

      <ToolInput label="Topical Coverage" description="How comprehensive is your content coverage?">
        <textarea value={inputs.coverage} onChange={(e) => setInputs({...inputs, coverage: e.target.value})} className={toolInputStyles.textarea} style={toolInputTheme} rows={2} placeholder="Topic coverage..." />
      </ToolInput>

      <ToolInput label="Original Research" description="Do you publish original research?">
        <textarea value={inputs.research} onChange={(e) => setInputs({...inputs, research: e.target.value})} className={toolInputStyles.textarea} style={toolInputTheme} rows={2} placeholder="Research publications..." />
      </ToolInput>

      <ToolInput label="Author Credibility" description="How credible are your content authors?">
        <textarea value={inputs.credibility} onChange={(e) => setInputs({...inputs, credibility: e.target.value})} className={toolInputStyles.textarea} style={toolInputTheme} rows={2} placeholder="Author expertise..." />
      </ToolInput>

      <ToolInput label="Technical SEO" description="How strong is your technical SEO?">
        <textarea value={inputs.technical} onChange={(e) => setInputs({...inputs, technical: e.target.value})} className={toolInputStyles.textarea} style={toolInputTheme} rows={2} placeholder="Technical SEO..." />
      </ToolInput>

      <ToolInput label="Structured Data" description="Do you use schema markup?">
        <textarea value={inputs.structured} onChange={(e) => setInputs({...inputs, structured: e.target.value})} className={toolInputStyles.textarea} style={toolInputTheme} rows={2} placeholder="Schema markup..." />
      </ToolInput>

      {/* Results */}
      <div className="mt-8 p-6 rounded-lg border-2" style={{ borderColor: 'var(--accent)', backgroundColor: 'var(--bg-secondary)' }}>
        <h3 className="text-lg font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>AI Visibility Assessment</h3>
        
        <div className="space-y-4">
          <div className="p-4 rounded-lg border" style={{ borderColor: 'var(--border-color)', backgroundColor: 'var(--card-bg)' }}>
            <h4 className="font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>Strengths</h4>
            <ul className="space-y-1">
              {inputs.brand && <li className="text-sm" style={{ color: 'var(--text-secondary)' }}>✓ Brand clarity established</li>}
              {inputs.content && <li className="text-sm" style={{ color: 'var(--text-secondary)' }}>✓ Content authority present</li>}
              {inputs.research && <li className="text-sm" style={{ color: 'var(--text-secondary)' }}>✓ Original research published</li>}
            </ul>
          </div>

          <div className="p-4 rounded-lg border" style={{ borderColor: 'var(--border-color)', backgroundColor: 'var(--card-bg)' }}>
            <h4 className="font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>Gaps</h4>
            <ul className="space-y-1">
              {!inputs.citations && <li className="text-sm" style={{ color: 'var(--text-secondary)' }}>✗ Limited citations in external sources</li>}
              {!inputs.structured && <li className="text-sm" style={{ color: 'var(--text-secondary)' }}>✗ Missing structured data markup</li>}
              {!inputs.credibility && <li className="text-sm" style={{ color: 'var(--text-secondary)' }}>✗ Author credibility not established</li>}
            </ul>
          </div>

          <div className="p-4 rounded-lg" style={{ backgroundColor: 'var(--bg-tertiary)' }}>
            <h4 className="text-sm font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>Priority Actions</h4>
            <ol className="space-y-1">
              <li className="text-sm" style={{ color: 'var(--text-secondary)' }}>1. Implement comprehensive schema markup</li>
              <li className="text-sm" style={{ color: 'var(--text-secondary)' }}>2. Publish original research quarterly</li>
              <li className="text-sm" style={{ color: 'var(--text-secondary)' }}>3. Build author authority through bylines</li>
              <li className="text-sm" style={{ color: 'var(--text-secondary)' }}>4. Create definitive guides for core topics</li>
              <li className="text-sm" style={{ color: 'var(--text-secondary)' }}>5. Optimize for AI search queries</li>
            </ol>
          </div>

          <div className="p-4 rounded-lg border-l-4" style={{ borderColor: 'var(--accent)' }}>
            <h4 className="text-sm font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>Key Principles</h4>
            <ul className="space-y-1">
              <li className="text-sm" style={{ color: 'var(--text-secondary)' }}>• Focus on useful, authoritative content</li>
              <li className="text-sm" style={{ color: 'var(--text-secondary)' }}>• Build entity clarity and recognition</li>
              <li className="text-sm" style={{ color: 'var(--text-secondary)' }}>• Provide evidence and citations</li>
              <li className="text-sm" style={{ color: 'var(--text-secondary)' }}>• Ensure technical accessibility</li>
            </ul>
          </div>
        </div>
      </div>
    </ToolEngine>
  );
}
