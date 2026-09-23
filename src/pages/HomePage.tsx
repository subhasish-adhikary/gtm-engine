import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, TrendingUp, Package, Target, Zap, Brain, BarChart3 } from 'lucide-react';
import { siteConfig, capabilities, selectedWork, thinkingCategories, tools } from '../data/content';
import { Button, SectionHeader, Card, Tag } from '../components/UI';
import { GTMSystemVisualization } from '../components/GTMSystemVisualization';
import { NewsletterSignup } from '../components/NewsletterSignup';
import { LocationClock } from '../components/LocationClock';
import { newsletterPlacements } from '../data/newsletter';

const iconMap: any = { 'trending-up': <TrendingUp size={20} />, 'package': <Package size={20} />, 'target': <Target size={20} />, 'zap': <Zap size={20} />, 'brain': <Brain size={20} />, 'bar-chart': <BarChart3 size={20} /> };

export function HomePage() {
  const [hoveredCapability, setHoveredCapability] = useState<number | null>(null);
  const [hoveredCareer, setHoveredCareer] = useState<number | null>(null);

  return (
    <div>
      {/* HERO SECTION — editorial masthead */}
      <section className="pt-14 pb-0 sm:pt-20 lg:pt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Masthead grid: numbered editorial column (left) · portrait first (right) */}
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-12 items-start">
            <div className="lg:col-span-7">
              {/* Section number */}
              <div className="text-xs font-semibold tracking-[0.22em]" style={{ color: 'var(--accent)' }}>01</div>

              {/* Eyebrow — thin rule + discipline line */}
              <div className="mt-6 flex items-center gap-3">
                <div className="h-px w-8 shrink-0" style={{ backgroundColor: 'var(--accent)' }} />
                <span className="text-[11px] font-medium uppercase tracking-[0.18em]" style={{ color: 'var(--text-secondary)' }}>
                  Growth Marketing · GTM Strategy · Marketing Automation
                </span>
              </div>

              <h1 className="mt-8 font-serif leading-[1.06] tracking-[-0.01em]" style={{ color: 'var(--text-primary)' }}>
                <span className="block text-[2.6rem] sm:text-6xl lg:text-7xl xl:text-[5rem]">I build the systems</span>
                <span className="block text-[2.6rem] sm:text-6xl lg:text-7xl xl:text-[5rem]">behind modern B2B</span>
                <span className="block text-[2.6rem] sm:text-6xl lg:text-7xl xl:text-[5rem]"><em className="italic" style={{ color: 'var(--accent)' }}>growth.</em></span>
              </h1>
              <p className="mt-8 max-w-xl text-base sm:text-lg leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                Growth marketing and GTM systems for B2B companies. I work across demand generation, marketing automation, outbound, ABM and AI-enabled RevOps — connecting strategy to pipeline through data, automation and technology.
              </p>
              <div className="mt-10 flex flex-wrap items-center gap-4">
                <Link
                  to="/work"
                  className="group inline-flex items-center gap-2 px-6 py-3 text-[13px] font-semibold uppercase tracking-[0.08em] transition-colors"
                  style={{ backgroundColor: 'var(--text-primary)', color: 'var(--bg-primary)' }}
                >
                  View selected work
                  <span className="inline-block transition-transform duration-200 group-hover:translate-x-1"><ArrowRight size={15} /></span>
                </Link>
                <Link
                  to="/thinking"
                  className="group inline-flex items-center gap-2 px-6 py-3 text-[13px] font-semibold uppercase tracking-[0.08em] transition-colors"
                  style={{ border: '1px solid var(--text-primary)', color: 'var(--text-primary)', backgroundColor: 'transparent' }}
                >
                  Read the thinking
                  <span className="inline-block transition-transform duration-200 group-hover:translate-x-1" style={{ color: 'var(--accent)' }}><ArrowRight size={14} /></span>
                </Link>
              </div>
            </div>

            {/* RIGHT HERO COLUMN — split so the editorial content sits BESIDE the
                portrait (mockup layout):
                left sub-column : location/time → portrait → image metadata
                right sub-column: handwritten statement → capability list → blue rule → based-in copy
                Both sub-columns live inside the hero's right column. No separate section. */}
            <div className="hero-right lg:col-span-5">
              <div className="flex gap-8 lg:gap-10">
                {/* Portrait sub-column */}
                <figure className="shrink-0 w-[180px] sm:w-[220px] lg:w-[240px]">
                  {/* Location + live clock — top of the right column */}
                  <figcaption className="pb-4">
                    <LocationClock />
                  </figcaption>

                  {/* Portrait */}
                  <div className="overflow-hidden" style={{ border: '1px solid var(--border-color)', backgroundColor: '#F6E7DA' }}>
                    <img
                      src="https://i.ibb.co/B2spFn8r/Subhasish-Adhikary-Marketer-1.png"
                      alt="Subhasish Adhikary - Growth Marketing & GTM Strategist"
                      className="w-full aspect-[4/5] object-cover object-top"
                      style={{ mixBlendMode: 'multiply', filter: 'grayscale(1) contrast(1.08)' }}
                      loading="eager"
                    />
                  </div>

                  {/* Image caption / metadata row */}
                  <div className="pt-3 text-[10px] uppercase tracking-[0.16em]" style={{ color: 'var(--text-tertiary)' }}>
                    <div>Subhasish Adhikary</div>
                    <div className="mt-1">Kolkata · Est. 2017</div>
                  </div>
                </figure>

                {/* Editorial sub-column — beside the portrait */}
                <div className="min-w-0 flex-1 pt-2">
                  {/* Handwritten blue statement with handwritten blue underline (per reference) */}
                  <div>
                    <p className="font-handwriting text-2xl leading-snug sm:text-3xl lg:text-[2rem]" style={{ color: 'var(--accent)' }}>
                      Marketing<br />
                      systems for<br />
                      a more open future.
                    </p>
                    {/* Blue handwritten underline — slightly tilted brush-stroke feel */}
                    <svg aria-hidden="true" viewBox="0 0 120 8" preserveAspectRatio="none" className="-mt-1 ml-1 h-[7px] w-[9.5rem] sm:w-[11rem]" style={{ transform: 'rotate(-1deg)' }}>
                      <path d="M2 5.2 C 24 2.6, 52 3.4, 74 4.0 S 106 5.6, 118 3.2" fill="none" stroke="var(--accent)" strokeWidth="2.6" strokeLinecap="round" opacity="0.9" />
                    </svg>
                  </div>

                  {/* Vertical blue-accent editorial list — thin rule to the LEFT of the list */}
                  <ul className="mt-14 sm:mt-16 space-y-3 pl-5 text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.22em]" style={{ borderLeft: '1px solid color-mix(in srgb, var(--accent) 45%, transparent)', color: 'var(--text-primary)' }}>
                    <li>Strategy</li>
                    <li>Automation</li>
                    <li>Content</li>
                    <li>Growth</li>
                    <li>Real impact.</li>
                  </ul>

                  {/* Short horizontal blue line */}
                  <span aria-hidden="true" className="mt-14 sm:mt-16 block h-px w-16" style={{ backgroundColor: 'var(--accent)' }} />

                  {/* Based-in note */}
                  <p className="mt-8 text-xs sm:text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                    Based in Kolkata, India.<br />
                    Working with global teams<br />
                    across time zones.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* GTM System Visualization - Below Hero */}
      <section className="py-12 sm:py-16 border-t" style={{ borderColor: 'var(--border-color)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-fade-in-up delay-400">
            <GTMSystemVisualization />
          </div>
        </div>
      </section>

      {/* EXPERIENCE & EXPERTISE - Compact Credibility Section */}
      <section className="py-12 border-b" style={{ borderColor: 'var(--border-color)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Experience & Industries */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="h-px w-6" style={{ backgroundColor: 'var(--accent)' }} />
                <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--accent)' }}>Experience</span>
              </div>
              <div className="space-y-3">
                <div>
                  <div className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>6+ Years</div>
                  <div className="text-sm" style={{ color: 'var(--text-tertiary)' }}>B2B Marketing Experience</div>
                </div>
                <div className="pt-3 border-t" style={{ borderColor: 'var(--border-color)' }}>
                  <div className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: 'var(--text-tertiary)' }}>Industries</div>
                  <div className="flex flex-wrap gap-2">
                    {['B2B SaaS', 'Staffing', 'HR Technology', 'MarTech', 'Digital'].map((industry) => (
                      <span key={industry} className="text-xs px-2 py-1 rounded" style={{ backgroundColor: 'var(--bg-secondary)', color: 'var(--text-secondary)' }}>
                        {industry}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Companies & Organizations */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="h-px w-6" style={{ backgroundColor: 'var(--accent)' }} />
                <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--accent)' }}>Organizations</span>
              </div>
              <div className="space-y-3">
                {[
                  { name: 'LanceSoft', role: 'Growth Marketing & GTM' },
                  { name: 'Wisestep (Avance Consulting)', role: 'Senior Growth Marketing & GTM Strategist' },
                  { name: 'Sportskeeda', role: 'Affiliate & Growth Marketing Manager' },
                  { name: 'Velarudh Infotech', role: 'SEO Content Strategist' },
                ].map((org) => (
                  <div key={org.name} className="pb-3 border-b last:border-b-0" style={{ borderColor: 'var(--border-color)' }}>
                    <div className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>{org.name}</div>
                    <div className="text-xs" style={{ color: 'var(--text-tertiary)' }}>{org.role}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Tools & Platforms */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="h-px w-6" style={{ backgroundColor: 'var(--accent)' }} />
                <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--accent)' }}>Tools & Platforms</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {['HubSpot', 'Salesforce', 'Clay', 'Apollo', '6sense', 'Salesforce Marketing Cloud', 'Zoho CRM', 'Marketo', 'Factors.ai', 'RB2B'].map((tool) => (
                  <span key={tool} className="text-xs px-2 py-1 rounded" style={{ backgroundColor: 'var(--bg-secondary)', color: 'var(--text-secondary)' }}>
                    {tool}
                  </span>
                ))}
              </div>
              <div className="mt-4 pt-3 border-t" style={{ borderColor: 'var(--border-color)' }}>
                <div className="text-xs" style={{ color: 'var(--text-tertiary)' }}>
                  <span className="font-semibold">Based on documented project experience</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROOF STRIP - Horizontal Metrics Rail */}
      <section className="py-12 border-y" style={{ borderColor: 'var(--border-color)', backgroundColor: 'var(--bg-secondary)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 mb-6">
            <div className="h-px w-6" style={{ backgroundColor: 'var(--accent)' }} />
            <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--accent)' }}>Verified Impact</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 lg:gap-8">
            {[
              { value: '+30%', label: 'Organic traffic', context: 'Velarudh Infotech' },
              { value: '+21%', label: 'Traffic & revenue', context: 'Sportskeeda' },
              { value: '+30%', label: 'Partner conversion', context: 'Sportskeeda' },
              { value: '+12%', label: 'Funnel performance', context: 'Wisestep' },
              { value: '+5%', label: 'Lead conversion', context: 'Wisestep' },
              { value: '5h', label: 'Saved per week', context: 'Wisestep · AI Automation' },
            ].map((metric, index) => (
              <div key={index}>
                <div className="text-3xl lg:text-4xl font-bold mb-2 whitespace-nowrap" style={{ color: 'var(--accent)' }}>{metric.value}</div>
                <div className="text-sm font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>{metric.label}</div>
                <div className="text-xs" style={{ color: 'var(--text-tertiary)' }}>{metric.context}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SELECTED WORK - Asymmetric Layout */}
      <section className="py-20 sm:py-28 border-t" style={{ borderColor: 'var(--border-color)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-8" style={{ backgroundColor: 'var(--accent)' }} />
              <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--accent)' }}>Selected Work</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight" style={{ color: 'var(--text-primary)' }}>
              Problems I have worked on,<br />systems I have built.
            </h2>
          </div>

          {/* Featured Case Study - Large */}
          <div className="grid lg:grid-cols-12 gap-8 mb-8">
            <Link to={`/work/${selectedWork[0].id}`} className="lg:col-span-7 group">
              <div className="rounded-lg p-8 lg:p-12 h-full transition-all" style={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--border-color)' }}>
                <div className="flex items-center gap-2 mb-6">
                  <Tag>{selectedWork[0].category}</Tag>
                  <span className="text-xs font-medium px-2 py-0.5 rounded" style={{ backgroundColor: 'var(--accent)', color: '#fff' }}>Featured</span>
                </div>
                <h3 className="text-2xl lg:text-3xl font-bold mb-4 group-hover:text-[var(--accent)] transition-colors" style={{ color: 'var(--text-primary)' }}>
                  {selectedWork[0].title}
                </h3>
                <p className="text-base lg:text-lg leading-relaxed mb-8" style={{ color: 'var(--text-secondary)' }}>
                  {selectedWork[0].summary}
                </p>
                
                {/* GTM Flow Diagram */}
                <div className="mb-8 p-6 rounded-lg" style={{ backgroundColor: 'var(--bg-secondary)' }}>
                  <div className="flex items-center justify-between text-xs font-semibold mb-4" style={{ color: 'var(--text-tertiary)' }}>
                    <span>GTM ARCHITECTURE</span>
                  </div>
                  <div className="flex flex-wrap items-center gap-3">
                    {['ICP', 'Positioning', 'Demand', 'Sales Enablement', 'Revenue'].map((step, i) => (
                      <div key={step} className="flex items-center gap-3">
                        <div className="px-4 py-2 rounded text-xs font-semibold" style={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--border-color)', color: 'var(--text-primary)' }}>
                          {step}
                        </div>
                        {i < 4 && <ArrowRight size={14} style={{ color: 'var(--accent)' }} />}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-2 text-sm font-semibold" style={{ color: 'var(--accent)' }}>
                  View case study <ArrowRight size={14} />
                </div>
              </div>
            </Link>

            {/* Two Smaller Case Studies */}
            <div className="lg:col-span-5 grid gap-8">
              {selectedWork.slice(1, 3).map((work) => (
                <Link key={work.id} to={`/work/${work.id}`} className="group">
                  <div className="rounded-lg p-6 h-full transition-all" style={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--border-color)' }}>
                    <Tag>{work.category}</Tag>
                    <h3 className="mt-4 text-xl font-bold mb-3 group-hover:text-[var(--accent)] transition-colors" style={{ color: 'var(--text-primary)' }}>
                      {work.title}
                    </h3>
                    <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--text-secondary)' }}>
                      {work.summary}
                    </p>
                    <div className="flex items-center gap-2 text-xs font-semibold" style={{ color: 'var(--accent)' }}>
                      View case study <ArrowRight size={12} />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <div className="text-right">
            <Link to="/work" className="inline-flex items-center text-sm font-semibold" style={{ color: 'var(--accent)' }}>
              View all case studies <ArrowRight size={14} className="ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* SYSTEMS THINKING - Visual Section */}
      <section className="py-20 sm:py-28 border-t" style={{ borderColor: 'var(--border-color)', backgroundColor: 'var(--bg-secondary)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="h-px w-8" style={{ backgroundColor: 'var(--accent)' }} />
                <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--accent)' }}>Systems Thinking</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-6" style={{ color: 'var(--text-primary)' }}>
                I don't think in channels. I think in systems.
              </h2>
              <p className="text-lg leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                Channels change. The system connecting them is what creates leverage.
              </p>
            </div>

            {/* System Diagram */}
            <div className="relative">
              <div className="rounded-lg p-8 lg:p-10" style={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--border-color)' }}>
                <div className="text-center mb-8">
                  <div className="text-sm font-semibold uppercase tracking-wider mb-2" style={{ color: 'var(--text-tertiary)' }}>MARKET</div>
                  <div className="text-sm" style={{ color: 'var(--text-tertiary)' }}>↓</div>
                </div>
                <div className="text-center mb-8">
                  <div className="text-sm font-semibold uppercase tracking-wider mb-2" style={{ color: 'var(--text-tertiary)' }}>CUSTOMER SIGNALS</div>
                  <div className="text-sm" style={{ color: 'var(--text-tertiary)' }}>↓</div>
                </div>
                <div className="rounded-lg p-6 mb-8" style={{ backgroundColor: 'var(--bg-secondary)', border: '2px solid var(--accent)' }}>
                  <div className="text-sm font-semibold uppercase tracking-wider mb-5 text-center" style={{ color: 'var(--accent)' }}>GTM SYSTEM</div>
                  <div className="space-y-4">
                    <div className="flex items-center justify-center gap-3 text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
                      <span>ICP</span>
                      <span style={{ color: 'var(--accent)' }}>→</span>
                      <span>Positioning</span>
                      <span style={{ color: 'var(--accent)' }}>→</span>
                      <span>Messaging</span>
                    </div>
                    <div className="flex items-center justify-center gap-3 text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
                      <span>Demand</span>
                      <span style={{ color: 'var(--accent)' }}>→</span>
                      <span>Automation</span>
                      <span style={{ color: 'var(--accent)' }}>→</span>
                      <span>Sales</span>
                    </div>
                    <div className="flex items-center justify-center gap-3 text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
                      <span>Data</span>
                      <span style={{ color: 'var(--accent)' }}>→</span>
                      <span>Experimentation</span>
                      <span style={{ color: 'var(--accent)' }}>→</span>
                      <span>CRO</span>
                    </div>
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-sm" style={{ color: 'var(--text-tertiary)' }}>↓</div>
                  <div className="text-sm font-semibold uppercase tracking-wider mt-2" style={{ color: 'var(--text-tertiary)' }}>REVENUE</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CAPABILITIES - Horizontal Matrix */}
      <section className="py-20 sm:py-28 border-t" style={{ borderColor: 'var(--border-color)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-8" style={{ backgroundColor: 'var(--accent)' }} />
              <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--accent)' }}>What I Work On</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight" style={{ color: 'var(--text-primary)' }}>
              Capabilities
            </h2>
          </div>

          <div className="space-y-2">
            {capabilities.map((cap, index) => (
              <div
                key={cap.title}
                onMouseEnter={() => setHoveredCapability(index)}
                onMouseLeave={() => setHoveredCapability(null)}
                className="group cursor-pointer rounded-lg p-6 transition-all"
                style={{
                  backgroundColor: hoveredCapability === index ? 'var(--bg-secondary)' : 'var(--card-bg)',
                  border: '1px solid var(--border-color)',
                }}
              >
                <div className="grid lg:grid-cols-12 gap-6 items-center">
                  <div className="lg:col-span-1">
                    <div className="text-4xl font-bold" style={{ color: hoveredCapability === index ? 'var(--accent)' : 'var(--text-tertiary)' }}>
                      {String(index + 1).padStart(2, '0')}
                    </div>
                  </div>
                  <div className="lg:col-span-4">
                    <h3 className="text-xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
                      {cap.title}
                    </h3>
                  </div>
                  <div className="lg:col-span-7">
                    <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                      {cap.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GTM STACK PREVIEW - Circular Visualization */}
      <section className="py-20 sm:py-28 border-t" style={{ borderColor: 'var(--border-color)', backgroundColor: 'var(--bg-secondary)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="h-px w-8" style={{ backgroundColor: 'var(--accent)' }} />
                <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--accent)' }}>GTM Stack</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-6" style={{ color: 'var(--text-primary)' }}>
                79+ B2B marketing tool stacks
              </h2>
              <p className="text-lg leading-relaxed mb-8" style={{ color: 'var(--text-secondary)' }}>
                Curated technology stacks organized by company stage, budget, and GTM motion. Each with rationale, trade-offs, and alternatives.
              </p>
              <Link to="/gtm-stack" className="inline-flex items-center text-sm font-semibold" style={{ color: 'var(--accent)' }}>
                Explore the full GTM stack <ArrowRight size={14} className="ml-2" />
              </Link>
            </div>

            {/* Circular Stack Visualization */}
            <div className="relative aspect-square max-w-2xl mx-auto w-full">
              <svg viewBox="0 0 500 500" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
                {/* Center */}
                <circle cx="250" cy="250" r="75" fill="var(--accent)" />
                <text x="250" y="240" textAnchor="middle" fontSize="18" fontWeight="bold" fill="#fff">B2B</text>
                <text x="250" y="258" textAnchor="middle" fontSize="18" fontWeight="bold" fill="#fff">GTM</text>
                <text x="250" y="276" textAnchor="middle" fontSize="18" fontWeight="bold" fill="#fff">STACK</text>

                {/* Outer nodes */}
                {['CRM', 'Automation', 'ABM', 'Intent', 'Sales Intel', 'AI', 'Analytics', 'Enrichment', 'Outbound', 'Content'].map((cat, i) => {
                  const angle = (i * 36 - 90) * (Math.PI / 180);
                  const x = 250 + 175 * Math.cos(angle);
                  const y = 250 + 175 * Math.sin(angle);
                  
                  return (
                    <g key={cat}>
                      <line x1="250" y1="250" x2={x} y2={y} stroke="var(--border-color)" strokeWidth="2" />
                      <circle cx={x} cy={y} r="38" fill="var(--card-bg)" stroke="var(--border-color)" strokeWidth="2" />
                      <text x={x} y={y + 5} textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--text-primary)">
                        {cat}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* TOOLS - Question → Input → Decision */}
      <section className="py-20 sm:py-28 border-t" style={{ borderColor: 'var(--border-color)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-8" style={{ backgroundColor: 'var(--accent)' }} />
              <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--accent)' }}>Tools for Better GTM Decisions</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4" style={{ color: 'var(--text-primary)' }}>
              Interactive tools built around decisions marketers actually have to make.
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tools.slice(0, 6).map((tool) => (
              <Link key={tool.id} to={`/tools/${tool.id}`} className="group">
                <div className="rounded-lg p-6 h-full transition-all" style={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--border-color)' }}>
                  <div className="mb-4">
                    <Tag>{tool.category}</Tag>
                  </div>
                  <h3 className="text-lg font-bold mb-4 group-hover:text-[var(--accent)] transition-colors" style={{ color: 'var(--text-primary)' }}>
                    {tool.title}
                  </h3>
                  <div className="space-y-3 text-xs">
                    <div>
                      <div className="font-semibold mb-1" style={{ color: 'var(--text-tertiary)' }}>QUESTION</div>
                      <div style={{ color: 'var(--text-secondary)' }}>{tool.description}</div>
                    </div>
                    <div className="flex items-center gap-2 text-xs font-semibold" style={{ color: 'var(--accent)' }}>
                      Try this tool <ArrowRight size={12} />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-12 text-right">
            <Link to="/tools" className="inline-flex items-center text-sm font-semibold" style={{ color: 'var(--accent)' }}>
              Explore all tools <ArrowRight size={14} className="ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* THINKING - Editorial with Large Typography */}
      <section className="py-20 sm:py-28 border-t" style={{ borderColor: 'var(--border-color)', backgroundColor: 'var(--bg-secondary)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-8" style={{ backgroundColor: 'var(--accent)' }} />
              <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--accent)' }}>Thinking</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-8" style={{ color: 'var(--text-primary)' }}>
              Good GTM strategy is an allocation problem.
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {[
              { number: '01', text: 'Start with the market.\nNot the channel.' },
              { number: '02', text: 'Start with economics.\nNot activity.' },
              { number: '03', text: 'Build the system.\nThen automate it.' },
              { number: '04', text: 'Use AI where it creates leverage.\nNot where it creates noise.' },
            ].map((principle) => (
              <div key={principle.number} className="rounded-lg p-8" style={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--border-color)' }}>
                <div className="text-6xl font-bold mb-4" style={{ color: 'var(--accent)' }}>
                  {principle.number}
                </div>
                <div className="text-xl lg:text-2xl font-bold whitespace-pre-line" style={{ color: 'var(--text-primary)' }}>
                  {principle.text}
                </div>
              </div>
            ))}
          </div>

          <div className="text-right">
            <Link to="/thinking" className="inline-flex items-center text-sm font-semibold" style={{ color: 'var(--accent)' }}>
              Read the thinking <ArrowRight size={14} className="ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* CAREER MICRO-TIMELINE */}
      <section className="py-20 sm:py-28 border-t" style={{ borderColor: 'var(--border-color)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-8" style={{ backgroundColor: 'var(--accent)' }} />
              <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--accent)' }}>Career Evolution</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight" style={{ color: 'var(--text-primary)' }}>
              From execution to systems.
            </h2>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-0 right-0 top-6 h-0.5" style={{ backgroundColor: 'var(--border-color)' }} />
            
            <div className="grid grid-cols-2 md:grid-cols-5 gap-6 lg:gap-8 relative">
              {[
                { year: '2017', label: 'SEO + CONTENT', metric: '+30% organic traffic' },
                { year: '2019', label: 'DIGITAL + AUTOMATION', metric: '+21% organic traffic' },
                { year: '2022', label: 'GROWTH + PARTNERSHIPS', metric: '+30% partner conversion' },
                { year: '2024', label: 'B2B SAAS + GTM', metric: '+12% funnel performance' },
                { year: 'NOW', label: 'AI + GTM SYSTEMS', metric: 'Building the future' },
              ].map((stage, index) => (
                <div
                  key={stage.year}
                  onMouseEnter={() => setHoveredCareer(index)}
                  onMouseLeave={() => setHoveredCareer(null)}
                  className="text-center cursor-pointer"
                >
                  <div className="relative mb-5">
                    <div
                      className="w-5 h-5 rounded-full mx-auto transition-all"
                      style={{
                        backgroundColor: hoveredCareer === index ? 'var(--accent)' : 'var(--card-bg)',
                        border: '3px solid var(--accent)',
                        transform: hoveredCareer === index ? 'scale(1.4)' : 'scale(1)',
                      }}
                    />
                  </div>
                  <div className="text-3xl font-bold mb-2" style={{ color: 'var(--accent)' }}>
                    {stage.year}
                  </div>
                  <div className="text-sm font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>
                    {stage.label}
                  </div>
                  {hoveredCareer === index && (
                    <div className="text-sm mt-2 p-3 rounded-lg font-medium" style={{ backgroundColor: 'var(--bg-secondary)', color: 'var(--text-secondary)' }}>
                      {stage.metric}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-12 text-right">
            <Link to="/about" className="inline-flex items-center text-sm font-semibold" style={{ color: 'var(--accent)' }}>
              See the full journey <ArrowRight size={14} className="ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="py-16 sm:py-20 border-t" style={{ borderColor: 'var(--border-color)' }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <NewsletterSignup
            source={newsletterPlacements.homepage.source}
            leadMagnet={newsletterPlacements.homepage.leadMagnet}
            heading={newsletterPlacements.homepage.heading}
            description={newsletterPlacements.homepage.description}
            cta={newsletterPlacements.homepage.cta}
          />
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-20 sm:py-28 border-t" style={{ borderColor: 'var(--border-color)', backgroundColor: 'var(--bg-secondary)' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-6" style={{ color: 'var(--text-primary)' }}>
            Building something that needs a GTM system?
          </h2>
          <p className="text-lg mb-8" style={{ color: 'var(--text-secondary)' }}>
            Let's explore how I can help architect your go-to-market strategy.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button to="/work" size="lg">View My Work</Button>
            <Button to="/gtm-stack" variant="secondary" size="lg">Explore GTM Lab</Button>
            <Button to="/contact" variant="secondary" size="lg">Work With Me</Button>
          </div>
        </div>
      </section>
    </div>
  );
}
