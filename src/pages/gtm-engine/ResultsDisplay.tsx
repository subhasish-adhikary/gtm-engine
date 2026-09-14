import { GTMInput, GTMReport } from '../../types/gtm-engine';
import { getChannelById } from '../../data/channels';

interface ResultsDisplayProps {
  report: GTMReport;
  input: GTMInput;
  onReset: () => void;
}

export function ResultsDisplay({ report, input, onReset }: ResultsDisplayProps) {
  return (
    <div className="min-h-screen py-12" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-2" style={{ color: 'var(--text-primary)' }}>
              Your GTM Intelligence Report
            </h1>
            <p className="text-lg" style={{ color: 'var(--text-secondary)' }}>
              Data-driven recommendations for {input.company?.name || 'your company'}
            </p>
          </div>
          <button
            onClick={onReset}
            className="px-6 py-3 rounded-lg text-sm font-medium border-2 transition-all hover:shadow-md"
            style={{
              borderColor: 'var(--border-color)',
              color: 'var(--text-secondary)',
              backgroundColor: 'var(--card-bg)'
            }}
          >
            ← Start Over
          </button>
        </div>

        {/* Executive Summary */}
        <div className="bg-[var(--card-bg)] border-2 border-[var(--accent)] rounded-2xl p-8 mb-8">
          <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
            Executive Summary
          </h2>
          <p className="text-base leading-relaxed mb-6" style={{ color: 'var(--text-secondary)' }}>
            {report.executiveRecommendation}
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-4 rounded-lg" style={{ backgroundColor: 'var(--bg-secondary)' }}>
              <div className="text-3xl font-bold mb-1" style={{ color: 'var(--accent)' }}>
                {report.diagnosis.readinessScore.overall}/100
              </div>
              <div className="text-sm" style={{ color: 'var(--text-tertiary)' }}>
                GTM Readiness
              </div>
            </div>
            <div className="p-4 rounded-lg" style={{ backgroundColor: 'var(--bg-secondary)' }}>
              <div className="text-3xl font-bold mb-1" style={{ color: 'var(--accent)' }}>
                {report.channelPortfolio.length}
              </div>
              <div className="text-sm" style={{ color: 'var(--text-tertiary)' }}>
                Recommended Channels
              </div>
            </div>
            <div className="p-4 rounded-lg" style={{ backgroundColor: 'var(--bg-secondary)' }}>
              <div className="text-3xl font-bold mb-1" style={{ color: 'var(--accent)' }}>
                {report.diagnosis.confidence}
              </div>
              <div className="text-sm" style={{ color: 'var(--text-tertiary)' }}>
                Confidence Level
              </div>
            </div>
            <div className="p-4 rounded-lg" style={{ backgroundColor: 'var(--bg-secondary)' }}>
              <div className="text-3xl font-bold mb-1" style={{ color: 'var(--accent)' }}>
                {report.diagnosis.recommendedMotion}
              </div>
              <div className="text-sm" style={{ color: 'var(--text-tertiary)' }}>
                GTM Motion
              </div>
            </div>
          </div>
        </div>

        {/* Channel Portfolio */}
        <div className="bg-[var(--card-bg)] border-2 border-[var(--border-color)] rounded-2xl p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6" style={{ color: 'var(--text-primary)' }}>
            Recommended Channel Portfolio
          </h2>
          <div className="space-y-4">
            {report.channelPortfolio.map((channel, idx) => {
              const channelData = getChannelById(channel.channelId);
              return (
                <div key={channel.channelId} className="p-6 rounded-lg border-2" style={{ borderColor: 'var(--border-color)' }}>
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-xs font-bold px-2 py-1 rounded" style={{ backgroundColor: 'var(--accent)', color: '#fff' }}>
                          #{idx + 1}
                        </span>
                        <h3 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>
                          {channelData?.name || channel.channelId}
                        </h3>
                      </div>
                      <p className="text-sm" style={{ color: 'var(--text-tertiary)' }}>
                        {channelData?.suitabilityByMotion ? 'Strategic fit for your GTM motion' : ''}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-bold" style={{ color: 'var(--accent)' }}>
                        {channel.overallFit}/100
                      </div>
                      <div className="text-xs" style={{ color: 'var(--text-tertiary)' }}>
                        Fit Score
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <div className="text-xs font-semibold mb-1" style={{ color: 'var(--text-tertiary)' }}>ROLE</div>
                      <div className="text-sm font-medium capitalize" style={{ color: 'var(--text-primary)' }}>
                        {channel.recommendation}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs font-semibold mb-1" style={{ color: 'var(--text-tertiary)' }}>CONFIDENCE</div>
                      <div className="text-sm font-medium capitalize" style={{ color: 'var(--text-primary)' }}>
                        {channel.confidence}
                      </div>
                    </div>
                  </div>
                  {channel.rationale.length > 0 && (
                    <div>
                      <div className="text-xs font-semibold mb-2" style={{ color: 'var(--text-tertiary)' }}>WHY THIS CHANNEL</div>
                      <ul className="space-y-1">
                        {channel.rationale.map((reason, i) => (
                          <li key={i} className="text-sm flex items-start gap-2" style={{ color: 'var(--text-secondary)' }}>
                            <span style={{ color: 'var(--accent)' }}>✓</span>
                            <span>{reason}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Budget Allocation */}
        <div className="bg-[var(--card-bg)] border-2 border-[var(--border-color)] rounded-2xl p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6" style={{ color: 'var(--text-primary)' }}>
            Budget Allocation Scenarios
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {report.budgetAllocation.map((scenario) => (
              <div key={scenario.name} className="p-6 rounded-lg border-2" style={{ borderColor: 'var(--border-color)' }}>
                <h3 className="text-xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
                  {scenario.name}
                </h3>
                <div className="mb-4">
                  <div className="text-3xl font-bold mb-1" style={{ color: 'var(--accent)' }}>
                    ₹{(scenario.monthlyBudget / 100000).toFixed(1)}L
                  </div>
                  <div className="text-sm" style={{ color: 'var(--text-tertiary)' }}>
                    per month
                  </div>
                </div>
                <div className="space-y-2 mb-4">
                  {scenario.channels.map((channel, idx) => {
                    const channelData = getChannelById(channel.channelId);
                    return (
                      <div key={idx} className="flex items-center justify-between text-sm">
                        <span style={{ color: 'var(--text-secondary)' }}>
                          {channelData?.name || channel.channelId}
                        </span>
                        <span className="font-semibold" style={{ color: 'var(--text-primary)' }}>
                          {channel.allocation}%
                        </span>
                      </div>
                    );
                  })}
                </div>
                <div className="pt-4 border-t" style={{ borderColor: 'var(--border-color)' }}>
                  <div className="text-xs font-semibold mb-2" style={{ color: 'var(--text-tertiary)' }}>
                    RISK PROFILE
                  </div>
                  <div className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                    {scenario.risk}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Expected Funnel */}
        <div className="bg-[var(--card-bg)] border-2 border-[var(--border-color)] rounded-2xl p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6" style={{ color: 'var(--text-primary)' }}>
            Expected Funnel (Monthly)
          </h2>
          <div className="space-y-4">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="p-4 rounded-lg" style={{ backgroundColor: 'var(--bg-secondary)' }}>
                <div className="text-2xl font-bold mb-1" style={{ color: 'var(--text-primary)' }}>
                  {report.expectedFunnel.traffic.low.toLocaleString()}-{report.expectedFunnel.traffic.high.toLocaleString()}
                </div>
                <div className="text-sm" style={{ color: 'var(--text-tertiary)' }}>
                  Traffic
                </div>
              </div>
              <div className="p-4 rounded-lg" style={{ backgroundColor: 'var(--bg-secondary)' }}>
                <div className="text-2xl font-bold mb-1" style={{ color: 'var(--text-primary)' }}>
                  {report.expectedFunnel.leads.low}-{report.expectedFunnel.leads.high}
                </div>
                <div className="text-sm" style={{ color: 'var(--text-tertiary)' }}>
                  Leads
                </div>
              </div>
              <div className="p-4 rounded-lg" style={{ backgroundColor: 'var(--bg-secondary)' }}>
                <div className="text-2xl font-bold mb-1" style={{ color: 'var(--text-primary)' }}>
                  {report.expectedFunnel.opportunities.low}-{report.expectedFunnel.opportunities.high}
                </div>
                <div className="text-sm" style={{ color: 'var(--text-tertiary)' }}>
                  Opportunities
                </div>
              </div>
              <div className="p-4 rounded-lg" style={{ backgroundColor: 'var(--bg-secondary)' }}>
                <div className="text-2xl font-bold mb-1" style={{ color: 'var(--text-primary)' }}>
                  {report.expectedFunnel.customers.low}-{report.expectedFunnel.customers.high}
                </div>
                <div className="text-sm" style={{ color: 'var(--text-tertiary)' }}>
                  Customers
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 90-Day Plan */}
        <div className="bg-[var(--card-bg)] border-2 border-[var(--border-color)] rounded-2xl p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6" style={{ color: 'var(--text-primary)' }}>
            90-Day Execution Plan
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-lg border-2" style={{ borderColor: 'var(--border-color)' }}>
              <h3 className="text-lg font-bold mb-4" style={{ color: 'var(--accent)' }}>
                Days 1-30
              </h3>
              <ul className="space-y-2">
                {report.executionPlan.days1to30.map((task, i) => (
                  <li key={i} className="text-sm flex items-start gap-2" style={{ color: 'var(--text-secondary)' }}>
                    <span style={{ color: 'var(--accent)' }}>•</span>
                    <span>{task}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="p-6 rounded-lg border-2" style={{ borderColor: 'var(--border-color)' }}>
              <h3 className="text-lg font-bold mb-4" style={{ color: 'var(--accent)' }}>
                Days 31-60
              </h3>
              <ul className="space-y-2">
                {report.executionPlan.days31to60.map((task, i) => (
                  <li key={i} className="text-sm flex items-start gap-2" style={{ color: 'var(--text-secondary)' }}>
                    <span style={{ color: 'var(--accent)' }}>•</span>
                    <span>{task}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="p-6 rounded-lg border-2" style={{ borderColor: 'var(--border-color)' }}>
              <h3 className="text-lg font-bold mb-4" style={{ color: 'var(--accent)' }}>
                Days 61-90
              </h3>
              <ul className="space-y-2">
                {report.executionPlan.days61to90.map((task, i) => (
                  <li key={i} className="text-sm flex items-start gap-2" style={{ color: 'var(--text-secondary)' }}>
                    <span style={{ color: 'var(--accent)' }}>•</span>
                    <span>{task}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* What Not To Do */}
        {report.whatNotToDo.length > 0 && (
          <div className="bg-[var(--card-bg)] border-2 border-[var(--border-color)] rounded-2xl p-8 mb-8">
            <h2 className="text-2xl font-bold mb-6" style={{ color: 'var(--text-primary)' }}>
              What NOT to Do
            </h2>
            <div className="space-y-4">
              {report.whatNotToDo.map((item, idx) => (
                <div key={idx} className="p-4 rounded-lg" style={{ backgroundColor: 'var(--bg-secondary)' }}>
                  <h3 className="text-lg font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
                    ❌ {item.channel}
                  </h3>
                  <ul className="space-y-1">
                    {item.reasons.map((reason, i) => (
                      <li key={i} className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                        • {reason}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Assumptions */}
        <div className="bg-[var(--card-bg)] border-2 border-[var(--border-color)] rounded-2xl p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6" style={{ color: 'var(--text-primary)' }}>
            Key Assumptions
          </h2>
          <ul className="space-y-2">
            {report.assumptions.map((assumption, i) => (
              <li key={i} className="text-sm flex items-start gap-2" style={{ color: 'var(--text-secondary)' }}>
                <span style={{ color: 'var(--accent)' }}>•</span>
                <span>{assumption}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Evidence */}
        {report.evidence.length > 0 && (
          <div className="bg-[var(--card-bg)] border-2 border-[var(--border-color)] rounded-2xl p-8 mb-8">
            <h2 className="text-2xl font-bold mb-6" style={{ color: 'var(--text-primary)' }}>
              Evidence & Sources
            </h2>
            <div className="space-y-4">
              {report.evidence.map((item, idx) => (
                <div key={idx} className="p-4 rounded-lg border" style={{ borderColor: 'var(--border-color)' }}>
                  <div className="text-sm font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>
                    {item.claim}
                  </div>
                  <div className="text-xs" style={{ color: 'var(--text-tertiary)' }}>
                    Source: {item.source} ({item.date})
                  </div>
                  <div className="text-xs mt-1" style={{ color: 'var(--text-tertiary)' }}>
                    Relevance: {item.relevance}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Counterfactuals */}
        {report.counterfactuals.length > 0 && (
          <div className="bg-[var(--card-bg)] border-2 border-[var(--border-color)] rounded-2xl p-8 mb-8">
            <h2 className="text-2xl font-bold mb-6" style={{ color: 'var(--text-primary)' }}>
              What Would Change This Recommendation?
            </h2>
            <div className="space-y-3">
              {report.counterfactuals.map((item, idx) => (
                <div key={idx} className="p-4 rounded-lg" style={{ backgroundColor: 'var(--bg-secondary)' }}>
                  <div className="text-sm font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>
                    {item.condition}
                  </div>
                  <div className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                    → {item.change}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
