import { ReactNode, useState } from 'react';
import { ArrowRight, CheckCircle, AlertCircle, Lightbulb, Target, TrendingUp, Copy, Download } from 'lucide-react';

export interface ToolStep {
  id: string;
  label: string;
  icon: ReactNode;
}

export const toolSteps: ToolStep[] = [
  { id: 'inputs', label: 'Inputs', icon: <Target size={16} /> },
  { id: 'analysis', label: 'Analysis', icon: <TrendingUp size={16} /> },
  { id: 'diagnosis', label: 'Diagnosis', icon: <AlertCircle size={16} /> },
  { id: 'recommendation', label: 'Recommendation', icon: <Lightbulb size={16} /> },
  { id: 'rationale', label: 'Rationale', icon: <CheckCircle size={16} /> },
  { id: 'action', label: 'Action Plan', icon: <ArrowRight size={16} /> },
];

interface ToolEngineProps {
  title: string;
  description: string;
  problem: string;
  children: ReactNode;
}

export function ToolEngine({ title, description, problem, children }: ToolEngineProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [showResults, setShowResults] = useState(false);

  const handleNext = () => {
    if (currentStep < toolSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setShowResults(true);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleCopy = () => {
    const content = document.getElementById('tool-results')?.innerText || '';
    navigator.clipboard.writeText(content);
  };

  const handleDownload = () => {
    const content = document.getElementById('tool-results')?.innerText || '';
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${title.toLowerCase().replace(/\s+/g, '-')}-results.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="py-12 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight" style={{ color: 'var(--text-primary)' }}>
            {title}
          </h1>
          <p className="mt-3 text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            {description}
          </p>
        </div>

        {/* Problem Statement */}
        <div className="mb-8 p-5 rounded-lg border-l-4" style={{ borderColor: 'var(--accent)', backgroundColor: 'var(--bg-secondary)' }}>
          <div className="flex items-start gap-3">
            <AlertCircle size={18} className="flex-shrink-0 mt-0.5" style={{ color: 'var(--accent)' }} />
            <div>
              <h3 className="text-sm font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>
                The Problem This Solves
              </h3>
              <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                {problem}
              </p>
            </div>
          </div>
        </div>

        {/* Progress Steps */}
        {!showResults && (
          <div className="mb-8 flex items-center gap-2 overflow-x-auto pb-2">
            {toolSteps.map((step, i) => (
              <div key={step.id} className="flex items-center">
                <div
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium whitespace-nowrap ${
                    i === currentStep ? 'border-2' : i < currentStep ? 'opacity-60' : 'opacity-40'
                  }`}
                  style={{
                    borderColor: i === currentStep ? 'var(--accent)' : 'var(--border-color)',
                    backgroundColor: i === currentStep ? 'var(--bg-secondary)' : 'transparent',
                    color: 'var(--text-primary)',
                  }}
                >
                  {step.icon}
                  <span>{step.label}</span>
                </div>
                {i < toolSteps.length - 1 && (
                  <div className="w-4 h-px mx-1" style={{ backgroundColor: 'var(--border-color)' }} />
                )}
              </div>
            ))}
          </div>
        )}

        {/* Content */}
        {!showResults ? (
          <div className="p-6 rounded-lg border" style={{ borderColor: 'var(--border-color)', backgroundColor: 'var(--card-bg)' }}>
            {children}

            {/* Navigation */}
            <div className="mt-8 flex items-center justify-between">
              <button
                onClick={handleBack}
                disabled={currentStep === 0}
                className="px-4 py-2 rounded-md text-sm font-medium transition-opacity disabled:opacity-40"
                style={{ color: 'var(--text-secondary)' }}
              >
                ← Back
              </button>
              <button
                onClick={handleNext}
                className="px-6 py-2.5 rounded-md text-sm font-medium"
                style={{ backgroundColor: 'var(--accent)', color: '#fff' }}
              >
                {currentStep === toolSteps.length - 1 ? 'Generate Results' : 'Next →'}
              </button>
            </div>
          </div>
        ) : (
          <div>
            {/* Results */}
            <div id="tool-results" className="p-6 rounded-lg border-2" style={{ borderColor: 'var(--accent)', backgroundColor: 'var(--bg-secondary)' }}>
              {children}
            </div>

            {/* Actions */}
            <div className="mt-6 flex flex-wrap gap-3">
              <button
                onClick={handleCopy}
                className="flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium border transition-colors hover:border-accent"
                style={{ borderColor: 'var(--border-color)', color: 'var(--text-secondary)' }}
              >
                <Copy size={14} />
                Copy Results
              </button>
              <button
                onClick={handleDownload}
                className="flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium border transition-colors hover:border-accent"
                style={{ borderColor: 'var(--border-color)', color: 'var(--text-secondary)' }}
              >
                <Download size={14} />
                Download
              </button>
              <button
                onClick={() => {
                  setShowResults(false);
                  setCurrentStep(0);
                }}
                className="px-4 py-2 rounded-md text-sm font-medium"
                style={{ backgroundColor: 'var(--accent)', color: '#fff' }}
              >
                Start Over
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Tool Input Component
interface ToolInputProps {
  label: string;
  description?: string;
  children: ReactNode;
}

export function ToolInput({ label, description, children }: ToolInputProps) {
  return (
    <div className="mb-6">
      <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--text-primary)' }}>
        {label}
      </label>
      {description && (
        <p className="text-xs mb-2" style={{ color: 'var(--text-tertiary)' }}>
          {description}
        </p>
      )}
      {children}
    </div>
  );
}

// Shared input styles
export const toolInputStyles = {
  input: "w-full px-3 py-2.5 rounded-md border text-sm focus:outline-none focus:ring-2",
  select: "w-full px-3 py-2.5 rounded-md border text-sm focus:outline-none focus:ring-2",
  textarea: "w-full px-3 py-2.5 rounded-md border text-sm focus:outline-none focus:ring-2 resize-none",
};

export const toolInputTheme = {
  backgroundColor: 'var(--bg-primary)',
  borderColor: 'var(--border-color)',
  color: 'var(--text-primary)',
};
