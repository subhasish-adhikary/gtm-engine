import { Link, useParams } from 'react-router-dom';
import { ArrowRight, Mail, Linkedin, BookOpen, AlertCircle, Target, Lightbulb, CheckCircle, TrendingUp } from 'lucide-react';
import { siteConfig, aboutContent } from '../data/content';
import { caseStudies, getCaseStudyBySlug } from '../data/caseStudies';
import { Button, SectionHeader, Card, Tag, Breadcrumb } from '../components/UI';

export function AboutPage() {
  return (
    <div className="py-12 sm:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumb items={[{ label: 'Home', path: '/' }, { label: 'About' }]} />
        <div className="max-w-3xl">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-8" style={{ backgroundColor: 'var(--accent)' }} />
            <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--accent)' }}>About</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight" style={{ color: 'var(--text-primary)' }}>{siteConfig.name}</h1>
          <p className="mt-2 text-base" style={{ color: 'var(--text-tertiary)' }}>Growth Marketing · B2B GTM Strategy · Marketing Automation · AI in Marketing</p>
          <p className="mt-6 text-lg leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{aboutContent.introduction}</p>
          <p className="mt-4 text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            I approach marketing as a systems design problem. Every channel, tool, and campaign should serve a coherent growth architecture — connected to business outcomes, measurable in economic terms, and built to compound over time.
          </p>
          <div className="mt-6 flex flex-wrap gap-4">
            <a href={siteConfig.linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm font-medium" style={{ color: 'var(--accent)' }}>
              <Linkedin size={16} /> Connect on LinkedIn
            </a>
            <a href={`mailto:${siteConfig.email}`} className="inline-flex items-center gap-2 text-sm font-medium" style={{ color: 'var(--accent)' }}>
              <Mail size={16} /> {siteConfig.email}
            </a>
          </div>
        </div>

        <section className="mt-16">
          <h3 className="text-xl font-semibold mb-6" style={{ color: 'var(--text-primary)' }}>Marketing Philosophy</h3>
          <div className="space-y-4 max-w-3xl">
            {aboutContent.philosophy.map((point, i) => (
              <div key={i} className="flex gap-4 p-4 rounded-lg" style={{ backgroundColor: 'var(--bg-secondary)' }}>
                <span className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold" style={{ backgroundColor: 'var(--accent)', color: '#fff' }}>{i + 1}</span>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{point}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-16">
          <h3 className="text-xl font-semibold mb-6" style={{ color: 'var(--text-primary)' }}>Areas of Expertise</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl">
            {aboutContent.expertise.map((area) => (
              <div key={area} className="flex items-center gap-3 p-3 rounded-lg border" style={{ borderColor: 'var(--border-color)' }}>
                <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: 'var(--accent)' }} />
                <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>{area}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-16">
          <h3 className="text-xl font-semibold mb-6" style={{ color: 'var(--text-primary)' }}>Approach & Methodology</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl">
            <Card>
              <h4 className="text-sm font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>Diagnose First</h4>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-tertiary)' }}>
                Every engagement starts with understanding the current state — market position, funnel economics, channel performance, and organizational capabilities. No prescriptions without diagnosis.
              </p>
            </Card>
            <Card>
              <h4 className="text-sm font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>Design Systems</h4>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-tertiary)' }}>
                Strategy becomes infrastructure. I design marketing systems — not campaigns — that connect positioning, channels, automation, and measurement into coherent architectures.
              </p>
            </Card>
            <Card>
              <h4 className="text-sm font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>Compound Returns</h4>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-tertiary)' }}>
                Every decision should build on the last. I optimize for systems that improve over time — through data, learning, and structural advantages that compound.
              </p>
            </Card>
          </div>
        </section>

        <section className="mt-16">
          <h3 className="text-xl font-semibold mb-6" style={{ color: 'var(--text-primary)' }}>Research & Thinking</h3>
          <p className="text-sm leading-relaxed mb-6 max-w-3xl" style={{ color: 'var(--text-secondary)' }}>
            I publish research-led analysis on B2B GTM strategy, marketing automation, and AI in marketing. All articles cite primary sources, include original frameworks, and provide practical implementation guidance. No AI-generated summaries — just original analysis grounded in real implementation experience.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button to="/thinking" variant="secondary">Read 15 Research Articles</Button>
            <Button to="/work" variant="secondary">View Case Studies</Button>
            <Button to="/tools" variant="secondary">Explore Interactive Tools</Button>
          </div>
        </section>

        <section className="mt-16">
          <h3 className="text-xl font-semibold mb-6" style={{ color: 'var(--text-primary)' }}>Methodology & Sources</h3>
          <div className="max-w-3xl p-6 rounded-lg border" style={{ borderColor: 'var(--border-color)', backgroundColor: 'var(--bg-secondary)' }}>
            <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--text-secondary)' }}>
              My work is grounded in primary research from leading industry sources:
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs" style={{ color: 'var(--text-tertiary)' }}>
              <span>Gartner</span>
              <span>Forrester</span>
              <span>McKinsey</span>
              <span>BCG</span>
              <span>Bain & Company</span>
              <span>Google</span>
              <span>Salesforce</span>
              <span>HubSpot</span>
              <span>LinkedIn</span>
              <span>Harvard Business Review</span>
              <span>MIT Sloan</span>
              <span>First Round Review</span>
            </div>
            <p className="text-xs mt-4 leading-relaxed" style={{ color: 'var(--text-tertiary)' }}>
              All statistics are verified and attributed. Where data is unavailable or uncertain, I state assumptions explicitly rather than presenting speculation as fact.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}

export function WorkPage() {
  return (
    <div className="py-12 sm:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumb items={[{ label: 'Home', path: '/' }, { label: 'Work' }]} />
        <SectionHeader eyebrow="Work" title="Strategic narratives" description="Each project represents a strategic challenge — diagnosed, designed, and executed." />
        <div className="mt-12 space-y-8">
          {caseStudies.map((work, index) => (
            <Link key={work.id} to={`/work/${work.slug}`}>
              <Card hoverable>
                <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                  <div className="flex-shrink-0">
                    <span className="text-4xl font-light" style={{ color: 'var(--border-color)' }}>{String(index + 1).padStart(2, '0')}</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-3">
                      <Tag>{work.category}</Tag>
                      <span className="text-xs font-medium px-2 py-0.5 rounded" style={{ backgroundColor: 'var(--bg-tertiary)', color: 'var(--text-tertiary)' }}>Confidential</span>
                    </div>
                    <h3 className="text-xl font-semibold" style={{ color: 'var(--text-primary)' }}>{work.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{work.summary}</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {work.tags.map((tag) => <span key={tag} className="text-xs px-2 py-0.5 rounded" style={{ backgroundColor: 'var(--bg-secondary)', color: 'var(--text-tertiary)' }}>{tag}</span>)}
                    </div>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export function CaseStudyPage() {
  const { caseStudyId } = useParams();
  const cs = getCaseStudyBySlug(caseStudyId);
  const detail = cs?.caseStudy;
  if (!cs || !detail) return <div className="py-32 text-center"><h2 className="text-xl font-semibold">Case study not found</h2><Link to="/work" className="mt-4 inline-block text-sm" style={{ color: 'var(--accent)' }}>← Back to Work</Link></div>;
  const icons = { Context: <BookOpen size={16} />, Challenge: <AlertCircle size={16} />, Diagnosis: <Target size={16} />, Strategy: <Lightbulb size={16} />, Execution: <CheckCircle size={16} />, Results: <TrendingUp size={16} /> };
  const coreSections = [
    { label: 'Context', text: detail.context },
    { label: 'Challenge', text: detail.challenge },
    { label: 'Diagnosis', text: detail.diagnosis },
    { label: 'Strategy', text: detail.strategy },
  ].filter((s) => s.text);
  return (
    <div className="py-12 sm:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumb items={[{ label: 'Home', path: '/' }, { label: 'Work', path: '/work' }, { label: cs.title }]} />
        <header className="mb-12">
          <div className="flex items-center gap-2 mb-4">
            <Tag>{cs.category}</Tag>
            <span className="text-xs font-medium px-2 py-0.5 rounded" style={{ backgroundColor: 'var(--bg-tertiary)', color: 'var(--text-tertiary)' }}>Confidential</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight" style={{ color: 'var(--text-primary)' }}>{cs.title}</h1>
          <p className="mt-4 text-lg leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{cs.summary}</p>
          <div className="mt-4 flex flex-wrap gap-2">{cs.tags.map((tag) => <span key={tag} className="text-xs px-2 py-0.5 rounded" style={{ backgroundColor: 'var(--bg-secondary)', color: 'var(--text-tertiary)' }}>{tag}</span>)}</div>
        </header>
        <div className="max-w-3xl">
          {coreSections.map((section) => (
            <section key={section.label} className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'var(--bg-secondary)', color: 'var(--accent)' }}>{icons[section.label as keyof typeof icons]}</div>
                <h2 className="text-xl font-semibold" style={{ color: 'var(--text-primary)' }}>{section.label}</h2>
              </div>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{section.text}</p>
            </section>
          ))}
          {detail.execution && detail.execution.length > 0 && (
            <section className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'var(--bg-secondary)', color: 'var(--accent)' }}>{icons.Execution}</div>
                <h2 className="text-xl font-semibold" style={{ color: 'var(--text-primary)' }}>Execution</h2>
              </div>
              <div className="space-y-4">
                {detail.execution.map((item, i: number) => (
                  <div key={i} className="p-4 rounded-lg border" style={{ borderColor: 'var(--border-color)' }}>
                    <div className="font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>{item.phase}</div>
                    {item.duration && <div className="text-xs mb-1" style={{ color: 'var(--text-tertiary)' }}>{item.duration}</div>}
                    <div className="text-sm" style={{ color: 'var(--text-secondary)' }}>{item.description}</div>
                  </div>
                ))}
              </div>
            </section>
          )}
          {detail.executionSummary && (
            <section className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'var(--bg-secondary)', color: 'var(--accent)' }}>{icons.Execution}</div>
                <h2 className="text-xl font-semibold" style={{ color: 'var(--text-primary)' }}>Execution</h2>
              </div>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{detail.executionSummary}</p>
            </section>
          )}
          {detail.systems && (
            <section className="mb-12">
              <h2 className="text-xl font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>Systems Built</h2>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{detail.systems}</p>
            </section>
          )}
          {detail.channels && detail.channels.length > 0 && (
            <section className="mb-12">
              <h2 className="text-xl font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>Channels</h2>
              <div className="flex flex-wrap gap-2">
                {detail.channels.map((channel) => <span key={channel} className="text-xs px-2 py-1 rounded" style={{ backgroundColor: 'var(--bg-secondary)', color: 'var(--text-secondary)' }}>{channel}</span>)}
              </div>
            </section>
          )}
          {detail.measurement && (
            <section className="mb-12">
              <h2 className="text-xl font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>Measurement</h2>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{detail.measurement}</p>
            </section>
          )}
          {detail.results && detail.results.length > 0 && (
            <section className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'var(--bg-secondary)', color: 'var(--accent)' }}>{icons.Results}</div>
                <h2 className="text-xl font-semibold" style={{ color: 'var(--text-primary)' }}>Results</h2>
              </div>
              <div className="grid grid-cols-3 gap-4">
                {detail.results.map((metric, i: number) => (
                  <div key={i} className="p-4 rounded-lg border text-center" style={{ borderColor: 'var(--border-color)', backgroundColor: 'var(--bg-secondary)' }}>
                    <div className="text-2xl font-semibold" style={{ color: 'var(--accent)' }}>{metric.value}</div>
                    <div className="text-xs font-medium mt-1" style={{ color: 'var(--text-primary)' }}>{metric.label}</div>
                  </div>
                ))}
              </div>
            </section>
          )}
          {detail.outcome && (
            <section className="mb-12">
              <h2 className="text-xl font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>Outcome</h2>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{detail.outcome}</p>
            </section>
          )}
          {detail.whatChanged && (
            <section className="mb-12">
              <h2 className="text-xl font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>What Changed</h2>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{detail.whatChanged}</p>
            </section>
          )}
          {detail.whatLearned && (
            <section className="mb-12">
              <h2 className="text-xl font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>What I Learned</h2>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{detail.whatLearned}</p>
            </section>
          )}
          {detail.whatNext && (
            <section className="mb-12">
              <h2 className="text-xl font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>What's Next</h2>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{detail.whatNext}</p>
            </section>
          )}
          {detail.lessons && detail.lessons.length > 0 && (
            <section className="mb-12">
              <h2 className="text-xl font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>Lessons Learned</h2>
              <ul className="space-y-2">
                {detail.lessons.map((lesson, i: number) => (
                  <li key={i} className="flex gap-2 text-sm" style={{ color: 'var(--text-secondary)' }}><span style={{ color: 'var(--accent)' }}>→</span><span>{lesson}</span></li>
                ))}
              </ul>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}

export function ContactPage() {
  return (
    <div className="py-12 sm:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumb items={[{ label: 'Home', path: '/' }, { label: 'Contact' }]} />
        <SectionHeader eyebrow="Contact" title="Let's connect" description="Whether you're exploring GTM strategy, marketing automation, or AI in marketing." />
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left: Contact Information */}
          <div className="space-y-6">
            <Card>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'var(--bg-secondary)', color: 'var(--accent)' }}><Mail size={18} /></div>
                <div>
                  <p className="text-xs font-medium" style={{ color: 'var(--text-tertiary)' }}>Email</p>
                  <a href={`mailto:${siteConfig.email}`} className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{siteConfig.email}</a>
                </div>
              </div>
            </Card>
            <Card>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'var(--bg-secondary)', color: 'var(--accent)' }}><Linkedin size={18} /></div>
                <div>
                  <p className="text-xs font-medium" style={{ color: 'var(--text-tertiary)' }}>LinkedIn</p>
                  <a href={siteConfig.linkedin} target="_blank" rel="noopener noreferrer" className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>Connect on LinkedIn</a>
                </div>
              </div>
            </Card>
            <Card>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>The fastest way to reach me is via email or LinkedIn. I typically respond within 48 hours. For strategic conversations about GTM, automation, or AI in marketing, I'm happy to schedule a call.</p>
              <div className="mt-6">
                <Button to={siteConfig.linkedin} size="lg">Connect on LinkedIn <ArrowRight size={16} className="ml-2" /></Button>
              </div>
            </Card>
          </div>

          {/* Right: Profile Image */}
          <div className="flex justify-center lg:justify-end">
            <img 
              src="https://i.ibb.co/B2spFn8r/Subhasish-Adhikary-Marketer-1.png" 
              alt="Subhasish Adhikary - Growth Marketing & GTM Strategist"
              className="w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 rounded-full object-cover border-4"
              style={{ borderColor: 'var(--border-color)' }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export function PrivacyPage() {
  return (
    <div className="py-12 sm:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumb items={[{ label: 'Home', path: '/' }, { label: 'Privacy Policy' }]} />
        <SectionHeader eyebrow="Legal" title="Privacy Policy" description="How this website handles your data." />
        <div className="mt-12 prose max-w-3xl">
          <p>This privacy policy describes how {siteConfig.name}'s website collects, uses, and protects information from visitors.</p>
          <h2>Information Collection</h2>
          <p>This website does not collect personal information beyond what is voluntarily provided. Contact form submissions are used solely to respond to inquiries.</p>
          <h2>Cookies</h2>
          <p>This website uses minimal cookies for theme preference storage. No tracking or advertising cookies are used.</p>
          <h2>Contact</h2>
          <p>For privacy-related questions, contact <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>.</p>
        </div>
      </div>
    </div>
  );
}

export function NotFoundPage() {
  return (
    <div className="py-32 text-center">
      <div className="text-6xl font-light mb-4" style={{ color: 'var(--border-color)' }}>404</div>
      <h1 className="text-2xl font-semibold" style={{ color: 'var(--text-primary)' }}>Page not found</h1>
      <p className="mt-3 text-base" style={{ color: 'var(--text-tertiary)' }}>The page you're looking for doesn't exist.</p>
      <div className="mt-8"><Button to="/" variant="secondary">← Back to Home</Button></div>
    </div>
  );
}
