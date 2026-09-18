import { GTMInput } from '../../../types/gtm-engine';

interface Step2CommercialProps {
  input: Partial<GTMInput>;
  updateInput: (updates: Partial<GTMInput>) => void;
}

export function Step2Commercial({ input, updateInput }: Step2CommercialProps) {
  const commercial = input.commercial || {} as any;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
        Step 2: Commercial Economics
      </h2>
      <p className="text-sm mb-6" style={{ color: 'var(--text-secondary)' }}>
        Help us understand your revenue model and financial targets.
      </p>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
            Current ARR / Annual Revenue (₹)
          </label>
          <input
            min="0" type="number"
            value={commercial.currentARR || ''}
            onChange={(e) => updateInput({ commercial: { ...commercial, currentARR: Number(e.target.value) } })}
            className="w-full px-4 py-3 rounded-lg border-2 text-base"
            style={{ backgroundColor: 'var(--bg-primary)', borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}
            placeholder="5000000"
          />
          <p className="text-xs mt-1" style={{ color: 'var(--text-tertiary)' }}>
            If pre-revenue, enter 0
          </p>
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
            Target ARR / Annual Revenue (₹)
          </label>
          <input
            min="0" type="number"
            value={commercial.targetARR || ''}
            onChange={(e) => updateInput({ commercial: { ...commercial, targetARR: Number(e.target.value) } })}
            className="w-full px-4 py-3 rounded-lg border-2 text-base"
            style={{ backgroundColor: 'var(--bg-primary)', borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}
            placeholder="10000000"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
            Average Contract Value / ACV (₹) *
          </label>
          <input
            min="0" type="number"
            value={commercial.acv || ''}
            onChange={(e) => updateInput({ commercial: { ...commercial, acv: Number(e.target.value) } })}
            className="w-full px-4 py-3 rounded-lg border-2 text-base"
            style={{ backgroundColor: 'var(--bg-primary)', borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}
            placeholder="100000"
            required
          />
          <p className="text-xs mt-1" style={{ color: 'var(--text-tertiary)' }}>
            Average annual value per customer
          </p>
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
            Current Monthly Marketing Budget (₹) *
          </label>
          <input
            min="0" type="number"
            value={commercial.currentBudget || ''}
            onChange={(e) => updateInput({ commercial: { ...commercial, currentBudget: Number(e.target.value) } })}
            className="w-full px-4 py-3 rounded-lg border-2 text-base"
            style={{ backgroundColor: 'var(--bg-primary)', borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}
            placeholder="100000"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
            Proposed Monthly Marketing Budget (₹)
          </label>
          <input
            min="0" type="number"
            value={commercial.proposedBudget || ''}
            onChange={(e) => updateInput({ commercial: { ...commercial, proposedBudget: Number(e.target.value) } })}
            className="w-full px-4 py-3 rounded-lg border-2 text-base"
            style={{ backgroundColor: 'var(--bg-primary)', borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}
            placeholder="200000"
          />
          <p className="text-xs mt-1" style={{ color: 'var(--text-tertiary)' }}>
            Leave blank to use current budget
          </p>
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
            Gross Margin (%)
          </label>
          <input
            min="0" type="number"
            value={commercial.grossMargin || ''}
            onChange={(e) => updateInput({ commercial: { ...commercial, grossMargin: Number(e.target.value) } })}
            className="w-full px-4 py-3 rounded-lg border-2 text-base"
            style={{ backgroundColor: 'var(--bg-primary)', borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}
            placeholder="75"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
            Current Number of Customers
          </label>
          <input
            min="0" type="number"
            value={commercial.currentCustomers || ''}
            onChange={(e) => updateInput({ commercial: { ...commercial, currentCustomers: Number(e.target.value) } })}
            className="w-full px-4 py-3 rounded-lg border-2 text-base"
            style={{ backgroundColor: 'var(--bg-primary)', borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}
            placeholder="50"
          />
        </div>
      </div>
    </div>
  );
}
