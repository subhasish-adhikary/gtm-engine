import { GTMInput } from '../../../types/gtm-engine';

interface Step1BusinessProps {
  input: Partial<GTMInput>;
  updateInput: (updates: Partial<GTMInput>) => void;
}

export function Step1Business({ input, updateInput }: Step1BusinessProps) {
  const company = input.company || {} as any;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
        Step 1: Business Overview
      </h2>
      <p className="text-sm mb-6" style={{ color: 'var(--text-secondary)' }}>
        Tell us about your company and business model.
      </p>

      <div className="space-y-6">
        {/* Company Name */}
        <div>
          <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
            Company Name *
          </label>
          <input
            type="text"
            value={company.name || ''}
            onChange={(e) => updateInput({ company: { ...company, name: e.target.value } })}
            className="w-full px-4 py-3 rounded-lg border-2 text-base"
            style={{
              backgroundColor: 'var(--bg-primary)',
              borderColor: 'var(--border-color)',
              color: 'var(--text-primary)'
            }}
            placeholder="Acme Corp"
            required
          />
        </div>

        {/* Website */}
        <div>
          <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
            Website
          </label>
          <input
            type="url"
            value={company.website || ''}
            onChange={(e) => updateInput({ company: { ...company, website: e.target.value } })}
            className="w-full px-4 py-3 rounded-lg border-2 text-base"
            style={{
              backgroundColor: 'var(--bg-primary)',
              borderColor: 'var(--border-color)',
              color: 'var(--text-primary)'
            }}
            placeholder="https://acme.com"
          />
        </div>

        {/* Industry */}
        <div>
          <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
            Industry *
          </label>
          <select
            value={company.industry || ''}
            onChange={(e) => updateInput({ company: { ...company, industry: e.target.value } })}
            className="w-full px-4 py-3 rounded-lg border-2 text-base"
            style={{
              backgroundColor: 'var(--bg-primary)',
              borderColor: 'var(--border-color)',
              color: 'var(--text-primary)'
            }}
            required
          >
            <option value="">Select industry</option>
            <option value="saas">SaaS / Software</option>
            <option value="fintech">Fintech</option>
            <option value="healthtech">HealthTech</option>
            <option value="edtech">EdTech</option>
            <option value="martech">MarTech</option>
            <option value="cybersecurity">Cybersecurity</option>
            <option value="devtools">Developer Tools</option>
            <option value="ai">AI / Machine Learning</option>
            <option value="ecommerce">E-commerce</option>
            <option value="consulting">Consulting / Professional Services</option>
            <option value="manufacturing">Manufacturing</option>
            <option value="other">Other</option>
          </select>
        </div>

        {/* Business Model */}
        <div>
          <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
            Business Model *
          </label>
          <select
            value={company.businessModel || ''}
            onChange={(e) => updateInput({ company: { ...company, businessModel: e.target.value as any } })}
            className="w-full px-4 py-3 rounded-lg border-2 text-base"
            style={{
              backgroundColor: 'var(--bg-primary)',
              borderColor: 'var(--border-color)',
              color: 'var(--text-primary)'
            }}
            required
          >
            <option value="">Select business model</option>
            <option value="saas">B2B SaaS</option>
            <option value="services">B2B Services</option>
            <option value="marketplace">Marketplace</option>
            <option value="technology">Technology / Infrastructure</option>
            <option value="agency">Agency</option>
            <option value="consulting">Consulting</option>
            <option value="professional_services">Professional Services</option>
            <option value="other">Other</option>
          </select>
        </div>

        {/* Company Stage */}
        <div>
          <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
            Company Stage *
          </label>
          <select
            value={company.stage || ''}
            onChange={(e) => updateInput({ company: { ...company, stage: e.target.value as any } })}
            className="w-full px-4 py-3 rounded-lg border-2 text-base"
            style={{
              backgroundColor: 'var(--bg-primary)',
              borderColor: 'var(--border-color)',
              color: 'var(--text-primary)'
            }}
            required
          >
            <option value="">Select stage</option>
            <option value="pre_pmf">Pre-Product Market Fit</option>
            <option value="early_revenue">Early Revenue</option>
            <option value="seed">Seed</option>
            <option value="series_a">Series A</option>
            <option value="series_b">Series B</option>
            <option value="growth">Growth Stage</option>
            <option value="mature">Mature</option>
          </select>
        </div>

        {/* Geography */}
        <div>
          <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
            Primary Market *
          </label>
          <select
            value={company.geography || ''}
            onChange={(e) => updateInput({ company: { ...company, geography: e.target.value as any } })}
            className="w-full px-4 py-3 rounded-lg border-2 text-base"
            style={{
              backgroundColor: 'var(--bg-primary)',
              borderColor: 'var(--border-color)',
              color: 'var(--text-primary)'
            }}
            required
          >
            <option value="">Select primary market</option>
            <option value="india">India</option>
            <option value="north_america">North America</option>
            <option value="europe">Europe</option>
            <option value="apac">Asia Pacific</option>
            <option value="middle_east">Middle East</option>
            <option value="global">Global</option>
            <option value="other">Other</option>
          </select>
        </div>
      </div>
    </div>
  );
}
