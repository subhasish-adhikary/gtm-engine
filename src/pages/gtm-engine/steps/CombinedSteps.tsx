import { GTMInput } from '../../../types/gtm-engine';

interface StepProps {
  input: Partial<GTMInput>;
  updateInput: (updates: Partial<GTMInput>) => void;
}

export function Step3GTM({ input, updateInput }: StepProps) {
  const gtm = input.gtm || {} as any;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>Step 3: GTM Motion</h2>
      <p className="text-sm mb-6" style={{ color: 'var(--text-secondary)' }}>How do you primarily sell?</p>
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>Primary GTM Motion *</label>
          <select value={gtm.primaryMotion || ''} onChange={(e) => updateInput({ gtm: { ...gtm, primaryMotion: e.target.value } })} className="w-full px-4 py-3 rounded-lg border-2 text-base" style={{ backgroundColor: 'var(--bg-primary)', borderColor: 'var(--border-color)', color: 'var(--text-primary)' }} required>
            <option value="">Select motion</option>
            <option value="plg">Product-Led Growth</option>
            <option value="sales_led">Sales-Led</option>
            <option value="marketing_led">Marketing-Led</option>
            <option value="founder_led">Founder-Led</option>
            <option value="hybrid">Hybrid</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>Sales Motion *</label>
          <select value={gtm.salesMotion || ''} onChange={(e) => updateInput({ gtm: { ...gtm, salesMotion: e.target.value } })} className="w-full px-4 py-3 rounded-lg border-2 text-base" style={{ backgroundColor: 'var(--bg-primary)', borderColor: 'var(--border-color)', color: 'var(--text-primary)' }} required>
            <option value="">Select sales motion</option>
            <option value="self_serve">Self-Serve</option>
            <option value="inside_sales">Inside Sales</option>
            <option value="outbound_sdr">Outbound SDR</option>
            <option value="ae_led">AE-Led</option>
            <option value="enterprise_sales">Enterprise Sales</option>
            <option value="founder_led">Founder-Led Sales</option>
          </select>
        </div>
      </div>
    </div>
  );
}

export function Step4ICP({ input, updateInput }: StepProps) {
  const icp = input.icp || {} as any;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>Step 4: Ideal Customer Profile</h2>
      <p className="text-sm mb-6" style={{ color: 'var(--text-secondary)' }}>Who do you sell to?</p>
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>ICP Narrowness *</label>
          <select value={icp.icpNarrowness || ''} onChange={(e) => updateInput({ icp: { ...icp, icpNarrowness: e.target.value } })} className="w-full px-4 py-3 rounded-lg border-2 text-base" style={{ backgroundColor: 'var(--bg-primary)', borderColor: 'var(--border-color)', color: 'var(--text-primary)' }} required>
            <option value="">Select narrowness</option>
            <option value="very_broad">Very Broad</option>
            <option value="broad">Broad</option>
            <option value="focused">Focused</option>
            <option value="highly_specific">Highly Specific</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>Target Company Size</label>
          <input type="text" value={icp.companySize || ''} onChange={(e) => updateInput({ icp: { ...icp, companySize: e.target.value } })} className="w-full px-4 py-3 rounded-lg border-2 text-base" style={{ backgroundColor: 'var(--bg-primary)', borderColor: 'var(--border-color)', color: 'var(--text-primary)' }} placeholder="50-500 employees" />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>Number of Potential Accounts</label>
          <input type="number" value={icp.potentialAccounts || ''} onChange={(e) => updateInput({ icp: { ...icp, potentialAccounts: Number(e.target.value) } })} className="w-full px-4 py-3 rounded-lg border-2 text-base" style={{ backgroundColor: 'var(--bg-primary)', borderColor: 'var(--border-color)', color: 'var(--text-primary)' }} placeholder="1000" />
        </div>
      </div>
    </div>
  );
}

export function Step5Buyer({ input, updateInput }: StepProps) {
  const buyer = input.buyer || {} as any;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>Step 5: Buyer Journey</h2>
      <p className="text-sm mb-6" style={{ color: 'var(--text-secondary)' }}>How do your buyers purchase?</p>
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>Sales Cycle *</label>
          <select value={buyer.salesCycle || ''} onChange={(e) => updateInput({ buyer: { ...buyer, salesCycle: e.target.value } })} className="w-full px-4 py-3 rounded-lg border-2 text-base" style={{ backgroundColor: 'var(--bg-primary)', borderColor: 'var(--border-color)', color: 'var(--text-primary)' }} required>
            <option value="">Select sales cycle</option>
            <option value="less_30">Less than 30 days</option>
            <option value="30_90">30-90 days</option>
            <option value="3_6_months">3-6 months</option>
            <option value="6_12_months">6-12 months</option>
            <option value="12_plus">12+ months</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>Number of Stakeholders *</label>
          <select value={buyer.stakeholders || ''} onChange={(e) => updateInput({ buyer: { ...buyer, stakeholders: e.target.value } })} className="w-full px-4 py-3 rounded-lg border-2 text-base" style={{ backgroundColor: 'var(--bg-primary)', borderColor: 'var(--border-color)', color: 'var(--text-primary)' }} required>
            <option value="">Select</option>
            <option value="1">1 (Solo decision)</option>
            <option value="2_3">2-3</option>
            <option value="4_6">4-6</option>
            <option value="7_plus">7+ (Complex)</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>Buyer Behavior *</label>
          <select value={buyer.buyerBehavior || ''} onChange={(e) => updateInput({ buyer: { ...buyer, buyerBehavior: e.target.value } })} className="w-full px-4 py-3 rounded-lg border-2 text-base" style={{ backgroundColor: 'var(--bg-primary)', borderColor: 'var(--border-color)', color: 'var(--text-primary)' }} required>
            <option value="">Select behavior</option>
            <option value="search_driven">Search-Driven</option>
            <option value="referral_driven">Referral-Driven</option>
            <option value="content_driven">Content/Research-Driven</option>
            <option value="relationship_driven">Relationship-Driven</option>
            <option value="outreach_driven">Sales Outreach-Driven</option>
            <option value="mixed">Mixed</option>
          </select>
        </div>
      </div>
    </div>
  );
}

export function Step6Foundation({ input, updateInput }: StepProps) {
  const foundation = input.foundation || {} as any;

  const fields = [
    { key: 'websiteQuality', label: 'Website Quality' },
    { key: 'seoMaturity', label: 'SEO Maturity' },
    { key: 'contentLibrary', label: 'Content Library' },
    { key: 'crm', label: 'CRM Setup' },
    { key: 'attribution', label: 'Attribution/Tracking' },
    { key: 'salesTeam', label: 'Sales Team' },
    { key: 'marketingTeam', label: 'Marketing Team' }
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>Step 6: GTM Foundation</h2>
      <p className="text-sm mb-6" style={{ color: 'var(--text-secondary)' }}>Rate your current capabilities.</p>
      <div className="space-y-4">
        {fields.map(field => (
          <div key={field.key}>
            <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>{field.label}</label>
            <select value={foundation[field.key] || ''} onChange={(e) => updateInput({ foundation: { ...foundation, [field.key]: e.target.value } })} className="w-full px-4 py-3 rounded-lg border-2 text-base" style={{ backgroundColor: 'var(--bg-primary)', borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}>
              <option value="">Select</option>
              <option value="none">None</option>
              <option value="weak">Weak</option>
              <option value="developing">Developing</option>
              <option value="good">Good</option>
              <option value="strong">Strong</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
}

export function Step7Resources({ input, updateInput }: StepProps) {
  const resources = input.resources || {} as any;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>Step 7: Resources</h2>
      <p className="text-sm mb-6" style={{ color: 'var(--text-secondary)' }}>What resources do you have?</p>
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>Marketing Team Size *</label>
          <input type="number" value={resources.marketingTeamSize || ''} onChange={(e) => updateInput({ resources: { ...resources, marketingTeamSize: Number(e.target.value) } })} className="w-full px-4 py-3 rounded-lg border-2 text-base" style={{ backgroundColor: 'var(--bg-primary)', borderColor: 'var(--border-color)', color: 'var(--text-primary)' }} placeholder="2" required />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>Sales Team Size *</label>
          <input type="number" value={resources.salesTeamSize || ''} onChange={(e) => updateInput({ resources: { ...resources, salesTeamSize: Number(e.target.value) } })} className="w-full px-4 py-3 rounded-lg border-2 text-base" style={{ backgroundColor: 'var(--bg-primary)', borderColor: 'var(--border-color)', color: 'var(--text-primary)' }} placeholder="3" required />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>Founder Involvement *</label>
          <select value={resources.founderInvolvement || ''} onChange={(e) => updateInput({ resources: { ...resources, founderInvolvement: e.target.value } })} className="w-full px-4 py-3 rounded-lg border-2 text-base" style={{ backgroundColor: 'var(--bg-primary)', borderColor: 'var(--border-color)', color: 'var(--text-primary)' }} required>
            <option value="">Select</option>
            <option value="none">None</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>Risk Tolerance *</label>
          <select value={resources.riskTolerance || ''} onChange={(e) => updateInput({ resources: { ...resources, riskTolerance: e.target.value } })} className="w-full px-4 py-3 rounded-lg border-2 text-base" style={{ backgroundColor: 'var(--bg-primary)', borderColor: 'var(--border-color)', color: 'var(--text-primary)' }} required>
            <option value="">Select</option>
            <option value="conservative">Conservative</option>
            <option value="balanced">Balanced</option>
            <option value="aggressive">Aggressive</option>
          </select>
        </div>
      </div>
    </div>
  );
}

export function Step8Objective({ input, updateInput }: StepProps) {
  const objective = input.objective || {} as any;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>Step 8: Primary Objective</h2>
      <p className="text-sm mb-6" style={{ color: 'var(--text-secondary)' }}>What's your main goal?</p>
      <div>
        <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>Primary Objective *</label>
        <select value={objective.goal || ''} onChange={(e) => updateInput({ objective: { ...objective, goal: e.target.value } })} className="w-full px-4 py-3 rounded-lg border-2 text-base" style={{ backgroundColor: 'var(--bg-primary)', borderColor: 'var(--border-color)', color: 'var(--text-primary)' }} required>
          <option value="">Select objective</option>
          <option value="pipeline">Generate Pipeline</option>
          <option value="customers">Acquire Customers</option>
          <option value="new_market">Enter New Market</option>
          <option value="awareness">Build Awareness</option>
          <option value="reduce_cac">Reduce CAC</option>
          <option value="organic">Increase Organic</option>
          <option value="scale">Scale Existing GTM</option>
          <option value="efficiency">Improve Efficiency</option>
        </select>
      </div>
    </div>
  );
}
