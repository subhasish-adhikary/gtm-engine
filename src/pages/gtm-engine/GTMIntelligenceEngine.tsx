import { useState } from 'react';
import { GTMInput, GTMReport } from '../../types/gtm-engine';
import { GTMEngine } from '../../engine/gtm-engine';
import { Step1Business } from './steps/Step1Business';
import { Step2Commercial } from './steps/Step2Commercial';
import { Step3GTM, Step4ICP, Step5Buyer, Step6Foundation, Step7Resources, Step8Objective } from './steps/CombinedSteps';
import { ResultsDisplay } from './ResultsDisplay';

export function GTMIntelligenceEngine() {
  const [currentStep, setCurrentStep] = useState(1);
  const [input, setInput] = useState<Partial<GTMInput>>({});
  const [report, setReport] = useState<GTMReport | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const totalSteps = 8;

  const updateInput = (updates: Partial<GTMInput>) => {
    setInput(prev => ({ ...prev, ...updates }));
  };

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      generateReport();
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const generateReport = () => {
    setIsGenerating(true);
    
    // Simulate processing time
    setTimeout(() => {
      try {
        const engine = new GTMEngine(input as GTMInput);
        const generatedReport = engine.generateReport();
        setReport(generatedReport);
      } catch (error) {
        console.error('Error generating report:', error);
      } finally {
        setIsGenerating(false);
      }
    }, 1500);
  };

  const handleReset = () => {
    setCurrentStep(1);
    setInput({});
    setReport(null);
  };

  if (report) {
    return <ResultsDisplay report={report} input={input as GTMInput} onReset={handleReset} />;
  }

  return (
    <div className="min-h-screen py-12" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3" style={{ color: 'var(--text-primary)' }}>
            GTM Intelligence Engine
          </h1>
          <p className="text-lg" style={{ color: 'var(--text-secondary)' }}>
            Get a data-driven GTM strategy based on your company's economics, resources, and market context.
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>
              Step {currentStep} of {totalSteps}
            </span>
            <span className="text-sm" style={{ color: 'var(--text-tertiary)' }}>
              {Math.round((currentStep / totalSteps) * 100)}% complete
            </span>
          </div>
          <div className="w-full h-2 rounded-full" style={{ backgroundColor: 'var(--bg-tertiary)' }}>
            <div
              className="h-full rounded-full transition-all duration-300"
              style={{
                width: `${(currentStep / totalSteps) * 100}%`,
                backgroundColor: 'var(--accent)'
              }}
            />
          </div>
        </div>

        {/* Step Content */}
        <div className="bg-[var(--card-bg)] border-2 border-[var(--border-color)] rounded-2xl p-8 mb-6">
          {currentStep === 1 && <Step1Business input={input} updateInput={updateInput} />}
          {currentStep === 2 && <Step2Commercial input={input} updateInput={updateInput} />}
          {currentStep === 3 && <Step3GTM input={input} updateInput={updateInput} />}
          {currentStep === 4 && <Step4ICP input={input} updateInput={updateInput} />}
          {currentStep === 5 && <Step5Buyer input={input} updateInput={updateInput} />}
          {currentStep === 6 && <Step6Foundation input={input} updateInput={updateInput} />}
          {currentStep === 7 && <Step7Resources input={input} updateInput={updateInput} />}
          {currentStep === 8 && <Step8Objective input={input} updateInput={updateInput} />}
        </div>

        {/* Navigation */}
        <div className="flex justify-between">
          <button
            onClick={handleBack}
            disabled={currentStep === 1}
            className="px-6 py-3 rounded-lg text-sm font-medium border-2 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
            style={{
              borderColor: 'var(--border-color)',
              color: 'var(--text-secondary)',
              backgroundColor: 'var(--card-bg)'
            }}
          >
            ← Back
          </button>

          <button
            onClick={handleNext}
            disabled={isGenerating}
            className="px-8 py-3 rounded-lg text-sm font-semibold transition-all hover:shadow-lg disabled:opacity-60"
            style={{
              backgroundColor: 'var(--accent)',
              color: '#fff'
            }}
          >
            {isGenerating ? 'Generating...' : currentStep === totalSteps ? 'Generate GTM Plan' : 'Next →'}
          </button>
        </div>

        {/* Help Text */}
        <div className="mt-8 p-4 rounded-lg border" style={{ borderColor: 'var(--border-color)', backgroundColor: 'var(--bg-secondary)' }}>
          <p className="text-sm" style={{ color: 'var(--text-tertiary)' }}>
            💡 <strong>Tip:</strong> The more accurate information you provide, the better your GTM recommendations will be. 
            If you don't know a metric, use the "I don't know" option and we'll use industry benchmarks.
          </p>
        </div>
      </div>
    </div>
  );
}
