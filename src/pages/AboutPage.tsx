import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, TrendingUp, Users, Zap, Brain, Database, Cpu, Target } from 'lucide-react';

export default function AboutPage() {
  const [activeSection, setActiveSection] = useState(0);
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!timelineRef.current) return;
      
      const sections = timelineRef.current.querySelectorAll('[data-timeline-section]');
      const scrollPosition = window.scrollY + window.innerHeight / 2;
      
      sections.forEach((section, index) => {
        const rect = section.getBoundingClientRect();
        const sectionTop = rect.top + window.scrollY;
        const sectionBottom = sectionTop + rect.height;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
          setActiveSection(index);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 lg:px-12">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-12 bg-[var(--accent)]"></div>
              <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--accent)' }}>
                Career Evolution
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6" style={{ color: 'var(--text-primary)' }}>
              From optimizing pages<br />
              to designing GTM systems.
            </h1>
            <p className="text-xl lg:text-2xl leading-relaxed max-w-3xl mb-8" style={{ color: 'var(--text-secondary)' }}>
              Subhasish Adhikary — Product Marketing · GTM Strategy · Growth & AI
            </p>
            <p className="text-base lg:text-lg leading-relaxed max-w-3xl mb-12" style={{ color: 'var(--text-tertiary)' }}>
              I work at the intersection of product marketing, GTM strategy, growth, automation, MarTech, experimentation, and AI-enabled systems. Over 6+ years, I've evolved from executing individual channels to architecting complete B2B SaaS go-to-market systems.
            </p>
            <div className="flex flex-wrap gap-3">
              <span className="px-4 py-2 rounded-full text-sm font-medium border" style={{ borderColor: 'var(--border-color)', color: 'var(--text-secondary)' }}>
                6+ Years Experience
              </span>
              <span className="px-4 py-2 rounded-full text-sm font-medium border" style={{ borderColor: 'var(--border-color)', color: 'var(--text-secondary)' }}>
                B2B SaaS
              </span>
              <span className="px-4 py-2 rounded-full text-sm font-medium border" style={{ borderColor: 'var(--border-color)', color: 'var(--text-secondary)' }}>
                GTM Strategy
              </span>
              <span className="px-4 py-2 rounded-full text-sm font-medium border" style={{ borderColor: 'var(--border-color)', color: 'var(--text-secondary)' }}>
                AI & Automation
              </span>
              <span className="px-4 py-2 rounded-full text-sm font-medium border" style={{ borderColor: 'var(--border-color)', color: 'var(--text-secondary)' }}>
                Product Marketing
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Career Timeline */}
      <section ref={timelineRef} className="py-20 px-6 lg:px-12" style={{ backgroundColor: 'var(--bg-secondary)' }}>
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
              The Career Timeline
            </h2>
            <p className="text-lg max-w-2xl" style={{ color: 'var(--text-tertiary)' }}>
              Scroll through my professional evolution. Each stage represents increasing complexity and scope.
            </p>
          </div>

          {/* Timeline Navigation */}
          <div className="hidden lg:flex items-center justify-between mb-12 sticky top-24 z-10 py-4 px-6 rounded-lg" style={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--border-color)' }}>
            {['2017', '2019', '2022', '2024', 'Now'].map((year, index) => (
              <button
                key={year}
                onClick={() => {
                  const section = document.querySelector(`[data-timeline-section="${index}"]`);
                  section?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }}
                className={`px-6 py-2 rounded-full text-sm font-semibold transition-all ${
                  activeSection === index
                    ? 'scale-110'
                    : 'opacity-60 hover:opacity-100'
                }`}
                style={{
                  backgroundColor: activeSection === index ? 'var(--accent)' : 'transparent',
                  color: activeSection === index ? '#fff' : 'var(--text-secondary)',
                  border: activeSection === index ? 'none' : '1px solid var(--border-color)'
                }}
              >
                {year}
              </button>
            ))}
          </div>

          {/* Timeline Sections */}
          <div className="space-y-32">
            {/* 2017: SEO & Content */}
            <div data-timeline-section="0" className="scroll-mt-32">
              <div className="grid lg:grid-cols-12 gap-8 lg:gap-12">
                <div className="lg:col-span-4">
                  <div className="sticky top-32">
                    <div className="text-6xl lg:text-7xl font-bold mb-4" style={{ color: 'var(--accent)' }}>
                      2017
                    </div>
                    <h3 className="text-2xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
                      SEO & Content
                    </h3>
                    <p className="text-sm font-semibold mb-4" style={{ color: 'var(--text-tertiary)' }}>
                      Velarudh Infotech · SEO Content Strategist
                    </p>
                    <p className="text-sm" style={{ color: 'var(--text-tertiary)' }}>
                      May 2017 – Nov 2017
                    </p>
                  </div>
                </div>
                <div className="lg:col-span-8">
                  <div className="rounded-lg p-8 mb-6" style={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--border-color)' }}>
                    <p className="text-lg leading-relaxed mb-6" style={{ color: 'var(--text-secondary)' }}>
                      This is where the foundation started: understanding how content, search intent, and optimization translate into measurable acquisition.
                    </p>
                    <div className="grid sm:grid-cols-2 gap-6 mb-6">
                      <div className="p-6 rounded-lg" style={{ backgroundColor: 'var(--bg-secondary)' }}>
                        <div className="text-4xl font-bold mb-2" style={{ color: 'var(--accent)' }}>+30%</div>
                        <div className="text-sm font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>Organic Traffic</div>
                        <div className="text-xs" style={{ color: 'var(--text-tertiary)' }}>Through content optimization and strategic SEO alignment</div>
                      </div>
                      <div className="p-6 rounded-lg" style={{ backgroundColor: 'var(--bg-secondary)' }}>
                        <div className="text-4xl font-bold mb-2" style={{ color: 'var(--accent)' }}>+34%</div>
                        <div className="text-sm font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>Content Improvement</div>
                        <div className="text-xs" style={{ color: 'var(--text-tertiary)' }}>Underperforming content through gap analysis</div>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1 rounded-full text-xs font-medium" style={{ backgroundColor: 'var(--bg-secondary)', color: 'var(--text-secondary)' }}>SEO</span>
                      <span className="px-3 py-1 rounded-full text-xs font-medium" style={{ backgroundColor: 'var(--bg-secondary)', color: 'var(--text-secondary)' }}>Content Strategy</span>
                      <span className="px-3 py-1 rounded-full text-xs font-medium" style={{ backgroundColor: 'var(--bg-secondary)', color: 'var(--text-secondary)' }}>Content Optimization</span>
                      <span className="px-3 py-1 rounded-full text-xs font-medium" style={{ backgroundColor: 'var(--bg-secondary)', color: 'var(--text-secondary)' }}>Gap Analysis</span>
                    </div>
                  </div>
                  {/* Visual: Single node */}
                  <div className="flex justify-center">
                    <div className="relative">
                      <div className="w-24 h-24 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--accent)', color: '#fff' }}>
                        <Target size={40} />
                      </div>
                      <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs font-semibold" style={{ color: 'var(--text-tertiary)' }}>
                        Single Focus
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 2019: Digital Marketing */}
            <div data-timeline-section="1" className="scroll-mt-32">
              <div className="grid lg:grid-cols-12 gap-8 lg:gap-12">
                <div className="lg:col-span-4">
                  <div className="sticky top-32">
                    <div className="text-6xl lg:text-7xl font-bold mb-4" style={{ color: 'var(--accent)' }}>
                      2019
                    </div>
                    <h3 className="text-2xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
                      Integrated Marketing
                    </h3>
                    <p className="text-sm font-semibold mb-4" style={{ color: 'var(--text-tertiary)' }}>
                      Xmartech Solutions · Digital Marketing Coordinator
                    </p>
                    <p className="text-sm" style={{ color: 'var(--text-tertiary)' }}>
                      Jul 2019 – Nov 2022
                    </p>
                  </div>
                </div>
                <div className="lg:col-span-8">
                  <div className="rounded-lg p-8 mb-6" style={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--border-color)' }}>
                    <p className="text-lg leading-relaxed mb-6" style={{ color: 'var(--text-secondary)' }}>
                      Transition from individual channel execution toward integrated marketing operations and leadership. Led a 5-member team across multiple channels and built automated workflows.
                    </p>
                    <div className="grid sm:grid-cols-2 gap-6 mb-6">
                      <div className="p-6 rounded-lg" style={{ backgroundColor: 'var(--bg-secondary)' }}>
                        <div className="text-4xl font-bold mb-2" style={{ color: 'var(--accent)' }}>+21%</div>
                        <div className="text-sm font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>Organic Traffic</div>
                        <div className="text-xs" style={{ color: 'var(--text-tertiary)' }}>Sustained growth through integrated campaigns</div>
                      </div>
                      <div className="p-6 rounded-lg" style={{ backgroundColor: 'var(--bg-secondary)' }}>
                        <div className="text-4xl font-bold mb-2" style={{ color: 'var(--accent)' }}>Top 5</div>
                        <div className="text-sm font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>Keyword Rankings</div>
                        <div className="text-xs" style={{ color: 'var(--text-tertiary)' }}>Achieved for target keywords</div>
                      </div>
                    </div>
                    <div className="mb-6">
                      <div className="text-sm font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>Channels Managed:</div>
                      <div className="flex flex-wrap gap-2">
                        <span className="px-3 py-1 rounded-full text-xs font-medium" style={{ backgroundColor: 'var(--bg-secondary)', color: 'var(--text-secondary)' }}>Email</span>
                        <span className="px-3 py-1 rounded-full text-xs font-medium" style={{ backgroundColor: 'var(--bg-secondary)', color: 'var(--text-secondary)' }}>SMS</span>
                        <span className="px-3 py-1 rounded-full text-xs font-medium" style={{ backgroundColor: 'var(--bg-secondary)', color: 'var(--text-secondary)' }}>Push</span>
                        <span className="px-3 py-1 rounded-full text-xs font-medium" style={{ backgroundColor: 'var(--bg-secondary)', color: 'var(--text-secondary)' }}>Content</span>
                        <span className="px-3 py-1 rounded-full text-xs font-medium" style={{ backgroundColor: 'var(--bg-secondary)', color: 'var(--text-secondary)' }}>Paid Media</span>
                        <span className="px-3 py-1 rounded-full text-xs font-medium" style={{ backgroundColor: 'var(--bg-secondary)', color: 'var(--text-secondary)' }}>SEO</span>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1 rounded-full text-xs font-medium" style={{ backgroundColor: 'var(--bg-secondary)', color: 'var(--text-secondary)' }}>Team Leadership</span>
                      <span className="px-3 py-1 rounded-full text-xs font-medium" style={{ backgroundColor: 'var(--bg-secondary)', color: 'var(--text-secondary)' }}>Zapier</span>
                      <span className="px-3 py-1 rounded-full text-xs font-medium" style={{ backgroundColor: 'var(--bg-secondary)', color: 'var(--text-secondary)' }}>Automation</span>
                      <span className="px-3 py-1 rounded-full text-xs font-medium" style={{ backgroundColor: 'var(--bg-secondary)', color: 'var(--text-secondary)' }}>Product Launch</span>
                    </div>
                  </div>
                  {/* Visual: Multiple connected nodes */}
                  <div className="flex justify-center">
                    <div className="relative">
                      <div className="grid grid-cols-3 gap-4">
                        <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--accent)', color: '#fff' }}>
                          <TrendingUp size={24} />
                        </div>
                        <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--accent)', color: '#fff' }}>
                          <Users size={24} />
                        </div>
                        <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--accent)', color: '#fff' }}>
                          <Zap size={24} />
                        </div>
                      </div>
                      <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs font-semibold" style={{ color: 'var(--text-tertiary)' }}>
                        Multi-Channel
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 2022: Growth & Partnerships */}
            <div data-timeline-section="2" className="scroll-mt-32">
              <div className="grid lg:grid-cols-12 gap-8 lg:gap-12">
                <div className="lg:col-span-4">
                  <div className="sticky top-32">
                    <div className="text-6xl lg:text-7xl font-bold mb-4" style={{ color: 'var(--accent)' }}>
                      2022
                    </div>
                    <h3 className="text-2xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
                      Growth & Partnerships
                    </h3>
                    <p className="text-sm font-semibold mb-4" style={{ color: 'var(--text-tertiary)' }}>
                      Sportskeeda · Affiliate & Growth Marketing Manager
                    </p>
                    <p className="text-sm" style={{ color: 'var(--text-tertiary)' }}>
                      Dec 2022 – Feb 2024
                    </p>
                  </div>
                </div>
                <div className="lg:col-span-8">
                  <div className="rounded-lg p-8 mb-6" style={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--border-color)' }}>
                    <p className="text-lg leading-relaxed mb-6" style={{ color: 'var(--text-secondary)' }}>
                      Focus shifted to growth through partnerships, affiliate marketing, lifecycle marketing, and performance optimization. Collaborated with product and engineering teams to integrate marketing technology.
                    </p>
                    <div className="grid sm:grid-cols-2 gap-6 mb-6">
                      <div className="p-6 rounded-lg" style={{ backgroundColor: 'var(--bg-secondary)' }}>
                        <div className="text-4xl font-bold mb-2" style={{ color: 'var(--accent)' }}>+21%</div>
                        <div className="text-sm font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>Traffic & Revenue</div>
                        <div className="text-xs" style={{ color: 'var(--text-tertiary)' }}>Through publisher and creator partnership programs</div>
                      </div>
                      <div className="p-6 rounded-lg" style={{ backgroundColor: 'var(--bg-secondary)' }}>
                        <div className="text-4xl font-bold mb-2" style={{ color: 'var(--accent)' }}>+30%</div>
                        <div className="text-sm font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>Partner Conversion</div>
                        <div className="text-xs" style={{ color: 'var(--text-tertiary)' }}>Through workflow redesign and CRM automation</div>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1 rounded-full text-xs font-medium" style={{ backgroundColor: 'var(--bg-secondary)', color: 'var(--text-secondary)' }}>Growth</span>
                      <span className="px-3 py-1 rounded-full text-xs font-medium" style={{ backgroundColor: 'var(--bg-secondary)', color: 'var(--text-secondary)' }}>Partnerships</span>
                      <span className="px-3 py-1 rounded-full text-xs font-medium" style={{ backgroundColor: 'var(--bg-secondary)', color: 'var(--text-secondary)' }}>Affiliate Marketing</span>
                      <span className="px-3 py-1 rounded-full text-xs font-medium" style={{ backgroundColor: 'var(--bg-secondary)', color: 'var(--text-secondary)' }}>Lifecycle Marketing</span>
                      <span className="px-3 py-1 rounded-full text-xs font-medium" style={{ backgroundColor: 'var(--bg-secondary)', color: 'var(--text-secondary)' }}>Zoho CRM</span>
                    </div>
                  </div>
                  {/* Visual: Network */}
                  <div className="flex justify-center">
                    <div className="relative">
                      <div className="w-20 h-20 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--accent)', color: '#fff' }}>
                        <TrendingUp size={32} />
                      </div>
                      <div className="absolute top-0 left-0 w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--card-bg)', border: '2px solid var(--accent)' }}>
                        <Users size={20} style={{ color: 'var(--accent)' }} />
                      </div>
                      <div className="absolute top-0 right-0 w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--card-bg)', border: '2px solid var(--accent)' }}>
                        <Zap size={20} style={{ color: 'var(--accent)' }} />
                      </div>
                      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--card-bg)', border: '2px solid var(--accent)' }}>
                        <Database size={20} style={{ color: 'var(--accent)' }} />
                      </div>
                      <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs font-semibold" style={{ color: 'var(--text-tertiary)' }}>
                        Growth Network
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 2024: B2B SaaS GTM */}
            <div data-timeline-section="3" className="scroll-mt-32">
              <div className="grid lg:grid-cols-12 gap-8 lg:gap-12">
                <div className="lg:col-span-4">
                  <div className="sticky top-32">
                    <div className="text-6xl lg:text-7xl font-bold mb-4" style={{ color: 'var(--accent)' }}>
                      2024
                    </div>
                    <h3 className="text-2xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
                      B2B SaaS GTM
                    </h3>
                    <p className="text-sm font-semibold mb-4" style={{ color: 'var(--text-tertiary)' }}>
                      Wisestep [Avance Consulting] · Senior Growth Marketing & GTM Strategist
                    </p>
                    <p className="text-sm" style={{ color: 'var(--text-tertiary)' }}>
                      Feb 2024 – Present
                    </p>
                  </div>
                </div>
                <div className="lg:col-span-8">
                  <div className="rounded-lg p-8 mb-6" style={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--border-color)' }}>
                    <p className="text-lg leading-relaxed mb-6" style={{ color: 'var(--text-secondary)' }}>
                      Own GTM strategy and MarTech roadmap for two global B2B SaaS products across EU, North America, and APAC. Founding GTM strategist for Pamgro (global EOR and payroll SaaS). Defined ICP, positioning, competitive differentiation, messaging, and sales enablement.
                    </p>
                    <div className="grid sm:grid-cols-3 gap-4 mb-6">
                      <div className="p-4 rounded-lg" style={{ backgroundColor: 'var(--bg-secondary)' }}>
                        <div className="text-3xl font-bold mb-1" style={{ color: 'var(--accent)' }}>+5%</div>
                        <div className="text-xs font-semibold" style={{ color: 'var(--text-primary)' }}>Lead Conversion</div>
                      </div>
                      <div className="p-4 rounded-lg" style={{ backgroundColor: 'var(--bg-secondary)' }}>
                        <div className="text-3xl font-bold mb-1" style={{ color: 'var(--accent)' }}>+12%</div>
                        <div className="text-xs font-semibold" style={{ color: 'var(--text-primary)' }}>Funnel Uplift</div>
                      </div>
                      <div className="p-4 rounded-lg" style={{ backgroundColor: 'var(--bg-secondary)' }}>
                        <div className="text-3xl font-bold mb-1" style={{ color: 'var(--accent)' }}>5 hrs</div>
                        <div className="text-xs font-semibold" style={{ color: 'var(--text-primary)' }}>Weekly Saved</div>
                      </div>
                    </div>
                    <div className="mb-6">
                      <div className="text-sm font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>GTM Components:</div>
                      <div className="flex flex-wrap gap-2">
                        <span className="px-3 py-1 rounded-full text-xs font-medium" style={{ backgroundColor: 'var(--bg-secondary)', color: 'var(--text-secondary)' }}>ICP Definition</span>
                        <span className="px-3 py-1 rounded-full text-xs font-medium" style={{ backgroundColor: 'var(--bg-secondary)', color: 'var(--text-secondary)' }}>Positioning</span>
                        <span className="px-3 py-1 rounded-full text-xs font-medium" style={{ backgroundColor: 'var(--bg-secondary)', color: 'var(--text-secondary)' }}>Sales Enablement</span>
                        <span className="px-3 py-1 rounded-full text-xs font-medium" style={{ backgroundColor: 'var(--bg-secondary)', color: 'var(--text-secondary)' }}>Competitive Intelligence</span>
                        <span className="px-3 py-1 rounded-full text-xs font-medium" style={{ backgroundColor: 'var(--bg-secondary)', color: 'var(--text-secondary)' }}>Demand Gen</span>
                        <span className="px-3 py-1 rounded-full text-xs font-medium" style={{ backgroundColor: 'var(--bg-secondary)', color: 'var(--text-secondary)' }}>CRO</span>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1 rounded-full text-xs font-medium" style={{ backgroundColor: 'var(--bg-secondary)', color: 'var(--text-secondary)' }}>Clay</span>
                      <span className="px-3 py-1 rounded-full text-xs font-medium" style={{ backgroundColor: 'var(--bg-secondary)', color: 'var(--text-secondary)' }}>Apollo</span>
                      <span className="px-3 py-1 rounded-full text-xs font-medium" style={{ backgroundColor: 'var(--bg-secondary)', color: 'var(--text-secondary)' }}>N8N</span>
                      <span className="px-3 py-1 rounded-full text-xs font-medium" style={{ backgroundColor: 'var(--bg-secondary)', color: 'var(--text-secondary)' }}>Make.com</span>
                      <span className="px-3 py-1 rounded-full text-xs font-medium" style={{ backgroundColor: 'var(--bg-secondary)', color: 'var(--text-secondary)' }}>AI Workflows</span>
                    </div>
                  </div>
                  {/* Visual: GTM Architecture */}
                  <div className="flex justify-center">
                    <div className="relative">
                      <div className="grid grid-cols-3 gap-3">
                        <div className="w-14 h-14 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'var(--accent)', color: '#fff' }}>
                          <Target size={20} />
                        </div>
                        <div className="w-14 h-14 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'var(--accent)', color: '#fff' }}>
                          <TrendingUp size={20} />
                        </div>
                        <div className="w-14 h-14 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'var(--accent)', color: '#fff' }}>
                          <Users size={20} />
                        </div>
                        <div className="w-14 h-14 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'var(--accent)', color: '#fff' }}>
                          <Database size={20} />
                        </div>
                        <div className="w-14 h-14 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'var(--accent)', color: '#fff' }}>
                          <Cpu size={20} />
                        </div>
                        <div className="w-14 h-14 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'var(--accent)', color: '#fff' }}>
                          <Zap size={20} />
                        </div>
                      </div>
                      <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs font-semibold" style={{ color: 'var(--text-tertiary)' }}>
                        GTM System
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Now: AI-Native GTM Systems */}
            <div data-timeline-section="4" className="scroll-mt-32">
              <div className="grid lg:grid-cols-12 gap-8 lg:gap-12">
                <div className="lg:col-span-4">
                  <div className="sticky top-32">
                    <div className="text-6xl lg:text-7xl font-bold mb-4" style={{ color: 'var(--accent)' }}>
                      Now
                    </div>
                    <h3 className="text-2xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
                      AI-Native GTM Systems
                    </h3>
                    <p className="text-sm font-semibold mb-4" style={{ color: 'var(--text-tertiary)' }}>
                      Building toward intelligent, automated GTM systems
                    </p>
                  </div>
                </div>
                <div className="lg:col-span-8">
                  <div className="rounded-lg p-8 mb-6" style={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--border-color)' }}>
                    <p className="text-lg leading-relaxed mb-6" style={{ color: 'var(--text-secondary)' }}>
                      The current work increasingly involves connecting market intelligence, customer signals, data, technology, automation, and human decision-making into repeatable GTM systems. This is the culmination of the career progression — from executing individual channels to architecting complete, AI-enabled go-to-market systems.
                    </p>
                    <div className="mb-6">
                      <div className="text-sm font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>Current Focus:</div>
                      <div className="flex flex-wrap gap-2">
                        <span className="px-3 py-1 rounded-full text-xs font-medium" style={{ backgroundColor: 'var(--accent)', color: '#fff' }}>AI Agents</span>
                        <span className="px-3 py-1 rounded-full text-xs font-medium" style={{ backgroundColor: 'var(--accent)', color: '#fff' }}>Agentic Workflows</span>
                        <span className="px-3 py-1 rounded-full text-xs font-medium" style={{ backgroundColor: 'var(--accent)', color: '#fff' }}>Marketing Automation</span>
                        <span className="px-3 py-1 rounded-full text-xs font-medium" style={{ backgroundColor: 'var(--accent)', color: '#fff' }}>Data Infrastructure</span>
                        <span className="px-3 py-1 rounded-full text-xs font-medium" style={{ backgroundColor: 'var(--accent)', color: '#fff' }}>Systems Thinking</span>
                      </div>
                    </div>
                    <div className="p-4 rounded-lg" style={{ backgroundColor: 'var(--bg-secondary)' }}>
                      <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                        <strong style={{ color: 'var(--text-primary)' }}>The evolution:</strong> Content → Channels → Data → Automation → GTM → AI. Each stage built on the previous, creating a foundation for designing intelligent systems that scale.
                      </p>
                    </div>
                  </div>
                  {/* Visual: AI System */}
                  <div className="flex justify-center">
                    <div className="relative">
                      <div className="w-24 h-24 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--accent)', color: '#fff' }}>
                        <Brain size={40} />
                      </div>
                      <div className="absolute top-0 left-0 w-16 h-16 rounded-full flex items-center justify-center animate-pulse" style={{ backgroundColor: 'var(--card-bg)', border: '2px solid var(--accent)' }}>
                        <Database size={24} style={{ color: 'var(--accent)' }} />
                      </div>
                      <div className="absolute top-0 right-0 w-16 h-16 rounded-full flex items-center justify-center animate-pulse" style={{ backgroundColor: 'var(--card-bg)', border: '2px solid var(--accent)', animationDelay: '0.5s' }}>
                        <Cpu size={24} style={{ color: 'var(--accent)' }} />
                      </div>
                      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-16 h-16 rounded-full flex items-center justify-center animate-pulse" style={{ backgroundColor: 'var(--card-bg)', border: '2px solid var(--accent)', animationDelay: '1s' }}>
                        <Zap size={24} style={{ color: 'var(--accent)' }} />
                      </div>
                      <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs font-semibold" style={{ color: 'var(--text-tertiary)' }}>
                        AI-Native System
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Entrepreneurial Ventures */}
      <section className="py-20 px-6 lg:px-12">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-12" style={{ backgroundColor: 'var(--accent)' }}></div>
              <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--accent)' }}>
                Beyond the 9-to-5
              </span>
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
              Entrepreneurial Ventures
            </h2>
            <p className="text-lg max-w-2xl" style={{ color: 'var(--text-tertiary)' }}>
              Running my own ventures taught me to think like a founder — owning every metric, from content to conversion.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Geeky Gadgets */}
            <div className="rounded-lg p-8" style={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--border-color)' }}>
              <div className="mb-6">
                <h3 className="text-2xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
                  Geeky Gadgets
                </h3>
                <p className="text-sm font-semibold mb-4" style={{ color: 'var(--accent)' }}>
                  Tech Blog · Founder & Content Creator
                </p>
                <p className="text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  Built and scaled a gadget review website from obscurity to 1,000 daily visitors through strategic content marketing and SEO.
                </p>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-16 text-right">
                    <div className="text-3xl font-bold" style={{ color: 'var(--accent)' }}>150+</div>
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>Articles Published</div>
                    <div className="text-xs" style={{ color: 'var(--text-tertiary)' }}>High-quality tech reviews and insights over 3 years</div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-16 text-right">
                    <div className="text-3xl font-bold" style={{ color: 'var(--accent)' }}>30K</div>
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>Monthly Visitors</div>
                    <div className="text-xs" style={{ color: 'var(--text-tertiary)' }}>Average unique visitors per month</div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-16 text-right">
                    <div className="text-3xl font-bold" style={{ color: 'var(--accent)' }}>+50%</div>
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>Organic Traffic Growth</div>
                    <div className="text-xs" style={{ color: 'var(--text-tertiary)' }}>Through strategic SEO implementation</div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-16 text-right">
                    <div className="text-3xl font-bold" style={{ color: 'var(--accent)' }}>1K+</div>
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>Newsletter Subscribers</div>
                    <div className="text-xs" style={{ color: 'var(--text-tertiary)' }}>Monthly newsletter with 25% open rate, 15% CTR</div>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 rounded-full text-xs font-medium" style={{ backgroundColor: 'var(--bg-secondary)', color: 'var(--text-secondary)' }}>Content Marketing</span>
                <span className="px-3 py-1 rounded-full text-xs font-medium" style={{ backgroundColor: 'var(--bg-secondary)', color: 'var(--text-secondary)' }}>SEO</span>
                <span className="px-3 py-1 rounded-full text-xs font-medium" style={{ backgroundColor: 'var(--bg-secondary)', color: 'var(--text-secondary)' }}>Email Marketing</span>
                <span className="px-3 py-1 rounded-full text-xs font-medium" style={{ backgroundColor: 'var(--bg-secondary)', color: 'var(--text-secondary)' }}>Audience Building</span>
              </div>
            </div>

            {/* NextBuye */}
            <div className="rounded-lg p-8" style={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--border-color)' }}>
              <div className="mb-6">
                <h3 className="text-2xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
                  NextBuye
                </h3>
                <p className="text-sm font-semibold mb-4" style={{ color: 'var(--accent)' }}>
                  D2C eCommerce · Founder & Operator
                </p>
                <p className="text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  Ran a direct-to-consumer handmade jewelry store, managing everything from product optimization to marketplace expansion.
                </p>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-16 text-right">
                    <div className="text-3xl font-bold" style={{ color: 'var(--accent)' }}>₹22K+</div>
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>Monthly Sales</div>
                    <div className="text-xs" style={{ color: 'var(--text-tertiary)' }}>Consistent monthly revenue through organic traffic</div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-16 text-right">
                    <div className="text-3xl font-bold" style={{ color: 'var(--accent)' }}>Top 1</div>
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>Keyword Rankings</div>
                    <div className="text-xs" style={{ color: 'var(--text-tertiary)' }}>Secured top positions for valuable keywords</div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-16 text-right">
                    <div className="text-3xl font-bold" style={{ color: 'var(--accent)' }}>3</div>
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>Sales Channels</div>
                    <div className="text-xs" style={{ color: 'var(--text-tertiary)' }}>Own website + Flipkart + Amazon Seller Central</div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-16 text-right">
                    <div className="text-3xl font-bold" style={{ color: 'var(--accent)' }}>100%</div>
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>Operations Ownership</div>
                    <div className="text-xs" style={{ color: 'var(--text-tertiary)' }}>Product listings, pricing, customer service, analytics</div>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 rounded-full text-xs font-medium" style={{ backgroundColor: 'var(--bg-secondary)', color: 'var(--text-secondary)' }}>E-commerce</span>
                <span className="px-3 py-1 rounded-full text-xs font-medium" style={{ backgroundColor: 'var(--bg-secondary)', color: 'var(--text-secondary)' }}>Product Optimization</span>
                <span className="px-3 py-1 rounded-full text-xs font-medium" style={{ backgroundColor: 'var(--bg-secondary)', color: 'var(--text-secondary)' }}>Marketplace Management</span>
                <span className="px-3 py-1 rounded-full text-xs font-medium" style={{ backgroundColor: 'var(--bg-secondary)', color: 'var(--text-secondary)' }}>Pricing Strategy</span>
                <span className="px-3 py-1 rounded-full text-xs font-medium" style={{ backgroundColor: 'var(--bg-secondary)', color: 'var(--text-secondary)' }}>Customer Analytics</span>
              </div>
            </div>
          </div>

          {/* Key Takeaway */}
          <div className="mt-12 p-6 rounded-lg" style={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}>
            <p className="text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              <strong style={{ color: 'var(--text-primary)' }}>What these ventures taught me:</strong> When you're the founder, you own every metric. Content isn't just "content" — it's traffic. SEO isn't just "rankings" — it's revenue. Email isn't just "newsletters" — it's retention. This founder mindset shapes how I approach GTM strategy today: every decision connects to business outcomes.
            </p>
          </div>
        </div>
      </section>

      {/* What I Actually Work On */}
      <section className="py-20 px-6 lg:px-12">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
              What I Actually Work On
            </h2>
            <p className="text-lg max-w-2xl" style={{ color: 'var(--text-tertiary)' }}>
              Current capability stack across product marketing, growth, AI, data, MarTech, and cross-functional collaboration.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Product Marketing */}
            <div className="rounded-lg p-6" style={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--border-color)' }}>
              <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-4" style={{ backgroundColor: 'var(--accent)', color: '#fff' }}>
                <Target size={24} />
              </div>
              <h3 className="text-xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>Product Marketing</h3>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 rounded-full text-xs font-medium" style={{ backgroundColor: 'var(--bg-secondary)', color: 'var(--text-secondary)' }}>ICP</span>
                <span className="px-3 py-1 rounded-full text-xs font-medium" style={{ backgroundColor: 'var(--bg-secondary)', color: 'var(--text-secondary)' }}>Positioning</span>
                <span className="px-3 py-1 rounded-full text-xs font-medium" style={{ backgroundColor: 'var(--bg-secondary)', color: 'var(--text-secondary)' }}>Messaging</span>
                <span className="px-3 py-1 rounded-full text-xs font-medium" style={{ backgroundColor: 'var(--bg-secondary)', color: 'var(--text-secondary)' }}>Competitive Intelligence</span>
                <span className="px-3 py-1 rounded-full text-xs font-medium" style={{ backgroundColor: 'var(--bg-secondary)', color: 'var(--text-secondary)' }}>Sales Enablement</span>
                <span className="px-3 py-1 rounded-full text-xs font-medium" style={{ backgroundColor: 'var(--bg-secondary)', color: 'var(--text-secondary)' }}>GTM Launches</span>
              </div>
            </div>

            {/* Growth */}
            <div className="rounded-lg p-6" style={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--border-color)' }}>
              <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-4" style={{ backgroundColor: 'var(--accent)', color: '#fff' }}>
                <TrendingUp size={24} />
              </div>
              <h3 className="text-xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>Growth</h3>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 rounded-full text-xs font-medium" style={{ backgroundColor: 'var(--bg-secondary)', color: 'var(--text-secondary)' }}>Acquisition</span>
                <span className="px-3 py-1 rounded-full text-xs font-medium" style={{ backgroundColor: 'var(--bg-secondary)', color: 'var(--text-secondary)' }}>Demand Generation</span>
                <span className="px-3 py-1 rounded-full text-xs font-medium" style={{ backgroundColor: 'var(--bg-secondary)', color: 'var(--text-secondary)' }}>CRO</span>
                <span className="px-3 py-1 rounded-full text-xs font-medium" style={{ backgroundColor: 'var(--bg-secondary)', color: 'var(--text-secondary)' }}>A/B Testing</span>
                <span className="px-3 py-1 rounded-full text-xs font-medium" style={{ backgroundColor: 'var(--bg-secondary)', color: 'var(--text-secondary)' }}>Lifecycle</span>
                <span className="px-3 py-1 rounded-full text-xs font-medium" style={{ backgroundColor: 'var(--bg-secondary)', color: 'var(--text-secondary)' }}>ABM</span>
              </div>
            </div>

            {/* AI & Automation */}
            <div className="rounded-lg p-6" style={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--border-color)' }}>
              <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-4" style={{ backgroundColor: 'var(--accent)', color: '#fff' }}>
                <Brain size={24} />
              </div>
              <h3 className="text-xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>AI & Automation</h3>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 rounded-full text-xs font-medium" style={{ backgroundColor: 'var(--bg-secondary)', color: 'var(--text-secondary)' }}>Agentic Workflows</span>
                <span className="px-3 py-1 rounded-full text-xs font-medium" style={{ backgroundColor: 'var(--bg-secondary)', color: 'var(--text-secondary)' }}>AI Agents</span>
                <span className="px-3 py-1 rounded-full text-xs font-medium" style={{ backgroundColor: 'var(--bg-secondary)', color: 'var(--text-secondary)' }}>Clay</span>
                <span className="px-3 py-1 rounded-full text-xs font-medium" style={{ backgroundColor: 'var(--bg-secondary)', color: 'var(--text-secondary)' }}>N8N</span>
                <span className="px-3 py-1 rounded-full text-xs font-medium" style={{ backgroundColor: 'var(--bg-secondary)', color: 'var(--text-secondary)' }}>Make</span>
                <span className="px-3 py-1 rounded-full text-xs font-medium" style={{ backgroundColor: 'var(--bg-secondary)', color: 'var(--text-secondary)' }}>Zapier</span>
              </div>
            </div>

            {/* Data */}
            <div className="rounded-lg p-6" style={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--border-color)' }}>
              <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-4" style={{ backgroundColor: 'var(--accent)', color: '#fff' }}>
                <Database size={24} />
              </div>
              <h3 className="text-xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>Data</h3>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 rounded-full text-xs font-medium" style={{ backgroundColor: 'var(--bg-secondary)', color: 'var(--text-secondary)' }}>SQL</span>
                <span className="px-3 py-1 rounded-full text-xs font-medium" style={{ backgroundColor: 'var(--bg-secondary)', color: 'var(--text-secondary)' }}>Funnel Analytics</span>
                <span className="px-3 py-1 rounded-full text-xs font-medium" style={{ backgroundColor: 'var(--bg-secondary)', color: 'var(--text-secondary)' }}>KPI Tracking</span>
                <span className="px-3 py-1 rounded-full text-xs font-medium" style={{ backgroundColor: 'var(--bg-secondary)', color: 'var(--text-secondary)' }}>Attribution</span>
                <span className="px-3 py-1 rounded-full text-xs font-medium" style={{ backgroundColor: 'var(--bg-secondary)', color: 'var(--text-secondary)' }}>Google Analytics</span>
                <span className="px-3 py-1 rounded-full text-xs font-medium" style={{ backgroundColor: 'var(--bg-secondary)', color: 'var(--text-secondary)' }}>Experimentation</span>
              </div>
            </div>

            {/* MarTech */}
            <div className="rounded-lg p-6" style={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--border-color)' }}>
              <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-4" style={{ backgroundColor: 'var(--accent)', color: '#fff' }}>
                <Cpu size={24} />
              </div>
              <h3 className="text-xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>MarTech</h3>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 rounded-full text-xs font-medium" style={{ backgroundColor: 'var(--bg-secondary)', color: 'var(--text-secondary)' }}>HubSpot</span>
                <span className="px-3 py-1 rounded-full text-xs font-medium" style={{ backgroundColor: 'var(--bg-secondary)', color: 'var(--text-secondary)' }}>Salesforce</span>
                <span className="px-3 py-1 rounded-full text-xs font-medium" style={{ backgroundColor: 'var(--bg-secondary)', color: 'var(--text-secondary)' }}>Marketo</span>
                <span className="px-3 py-1 rounded-full text-xs font-medium" style={{ backgroundColor: 'var(--bg-secondary)', color: 'var(--text-secondary)' }}>Zoho CRM</span>
                <span className="px-3 py-1 rounded-full text-xs font-medium" style={{ backgroundColor: 'var(--bg-secondary)', color: 'var(--text-secondary)' }}>Factors.ai</span>
                <span className="px-3 py-1 rounded-full text-xs font-medium" style={{ backgroundColor: 'var(--bg-secondary)', color: 'var(--text-secondary)' }}>RB2B</span>
              </div>
            </div>

            {/* Cross-Functional */}
            <div className="rounded-lg p-6" style={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--border-color)' }}>
              <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-4" style={{ backgroundColor: 'var(--accent)', color: '#fff' }}>
                <Users size={24} />
              </div>
              <h3 className="text-xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>Cross-Functional</h3>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 rounded-full text-xs font-medium" style={{ backgroundColor: 'var(--bg-secondary)', color: 'var(--text-secondary)' }}>Product</span>
                <span className="px-3 py-1 rounded-full text-xs font-medium" style={{ backgroundColor: 'var(--bg-secondary)', color: 'var(--text-secondary)' }}>Engineering</span>
                <span className="px-3 py-1 rounded-full text-xs font-medium" style={{ backgroundColor: 'var(--bg-secondary)', color: 'var(--text-secondary)' }}>Sales</span>
                <span className="px-3 py-1 rounded-full text-xs font-medium" style={{ backgroundColor: 'var(--bg-secondary)', color: 'var(--text-secondary)' }}>Design</span>
                <span className="px-3 py-1 rounded-full text-xs font-medium" style={{ backgroundColor: 'var(--bg-secondary)', color: 'var(--text-secondary)' }}>Partnerships</span>
                <span className="px-3 py-1 rounded-full text-xs font-medium" style={{ backgroundColor: 'var(--bg-secondary)', color: 'var(--text-secondary)' }}>Leadership</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Common Thread */}
      <section className="py-20 px-6 lg:px-12" style={{ backgroundColor: 'var(--bg-secondary)' }}>
        <div className="max-w-6xl mx-auto">
          <div className="mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
              The Common Thread
            </h2>
            <p className="text-lg max-w-2xl" style={{ color: 'var(--text-tertiary)' }}>
              The channels changed. The technology changed. The problems became more complex. But the underlying approach remained consistent.
            </p>
          </div>

          <div className="rounded-lg p-8 lg:p-12" style={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--border-color)' }}>
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="text-center">
                <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: 'var(--accent)', color: '#fff' }}>
                  <span className="text-2xl font-bold">1</span>
                </div>
                <h3 className="text-lg font-bold mb-2" style={{ color: 'var(--text-primary)' }}>Understand</h3>
                <p className="text-sm" style={{ color: 'var(--text-tertiary)' }}>Understand the problem and the customer</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: 'var(--accent)', color: '#fff' }}>
                  <span className="text-2xl font-bold">2</span>
                </div>
                <h3 className="text-lg font-bold mb-2" style={{ color: 'var(--text-primary)' }}>Build</h3>
                <p className="text-sm" style={{ color: 'var(--text-tertiary)' }}>Find the signal and build the system</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: 'var(--accent)', color: '#fff' }}>
                  <span className="text-2xl font-bold">3</span>
                </div>
                <h3 className="text-lg font-bold mb-2" style={{ color: 'var(--text-primary)' }}>Scale</h3>
                <p className="text-sm" style={{ color: 'var(--text-tertiary)' }}>Launch, measure, learn, automate, scale</p>
              </div>
            </div>

            <div className="p-6 rounded-lg" style={{ backgroundColor: 'var(--bg-secondary)' }}>
              <p className="text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                This operating philosophy has remained constant from 2017 to today. Whether optimizing content for SEO, managing multi-channel campaigns, building partnership programs, or architecting AI-native GTM systems — the approach is the same: understand deeply, build systematically, measure rigorously, and scale intelligently.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Career Metrics */}
      <section className="py-20 px-6 lg:px-12">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
              Numbers from the Journey
            </h2>
            <p className="text-lg max-w-2xl" style={{ color: 'var(--text-tertiary)' }}>
              Verified outcomes from each stage of the career.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="rounded-lg p-6" style={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--border-color)' }}>
              <div className="text-4xl font-bold mb-2" style={{ color: 'var(--accent)' }}>6+</div>
              <div className="text-sm font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>Years of Experience</div>
              <div className="text-xs" style={{ color: 'var(--text-tertiary)' }}>2017 – Present</div>
            </div>
            <div className="rounded-lg p-6" style={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--border-color)' }}>
              <div className="text-4xl font-bold mb-2" style={{ color: 'var(--accent)' }}>5</div>
              <div className="text-sm font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>Member Team Led</div>
              <div className="text-xs" style={{ color: 'var(--text-tertiary)' }}>Xmartech Solutions</div>
            </div>
            <div className="rounded-lg p-6" style={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--border-color)' }}>
              <div className="text-4xl font-bold mb-2" style={{ color: 'var(--accent)' }}>+30%</div>
              <div className="text-sm font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>Organic Traffic</div>
              <div className="text-xs" style={{ color: 'var(--text-tertiary)' }}>Velarudh Infotech</div>
            </div>
            <div className="rounded-lg p-6" style={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--border-color)' }}>
              <div className="text-4xl font-bold mb-2" style={{ color: 'var(--accent)' }}>+34%</div>
              <div className="text-sm font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>Content Improvement</div>
              <div className="text-xs" style={{ color: 'var(--text-tertiary)' }}>Velarudh Infotech</div>
            </div>
            <div className="rounded-lg p-6" style={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--border-color)' }}>
              <div className="text-4xl font-bold mb-2" style={{ color: 'var(--accent)' }}>+21%</div>
              <div className="text-sm font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>Traffic & Revenue</div>
              <div className="text-xs" style={{ color: 'var(--text-tertiary)' }}>Sportskeeda</div>
            </div>
            <div className="rounded-lg p-6" style={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--border-color)' }}>
              <div className="text-4xl font-bold mb-2" style={{ color: 'var(--accent)' }}>+30%</div>
              <div className="text-sm font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>Partner Conversion</div>
              <div className="text-xs" style={{ color: 'var(--text-tertiary)' }}>Sportskeeda</div>
            </div>
            <div className="rounded-lg p-6" style={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--border-color)' }}>
              <div className="text-4xl font-bold mb-2" style={{ color: 'var(--accent)' }}>+5%</div>
              <div className="text-sm font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>Lead Conversion</div>
              <div className="text-xs" style={{ color: 'var(--text-tertiary)' }}>Wisestep</div>
            </div>
            <div className="rounded-lg p-6" style={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--border-color)' }}>
              <div className="text-4xl font-bold mb-2" style={{ color: 'var(--accent)' }}>+12%</div>
              <div className="text-sm font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>Funnel Uplift</div>
              <div className="text-xs" style={{ color: 'var(--text-tertiary)' }}>Wisestep</div>
            </div>
            <div className="rounded-lg p-6" style={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--border-color)' }}>
              <div className="text-4xl font-bold mb-2" style={{ color: 'var(--accent)' }}>5 hrs</div>
              <div className="text-sm font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>Weekly Saved</div>
              <div className="text-xs" style={{ color: 'var(--text-tertiary)' }}>Wisestep · AI Automation</div>
            </div>
          </div>
        </div>
      </section>

      {/* What I Bring to a Team */}
      <section className="py-20 px-6 lg:px-12" style={{ backgroundColor: 'var(--bg-secondary)' }}>
        <div className="max-w-6xl mx-auto">
          <div className="mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
              What I Bring to a Team
            </h2>
            <p className="text-lg max-w-2xl" style={{ color: 'var(--text-tertiary)' }}>
              Capabilities and approach, not personality clichés.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="rounded-lg p-6" style={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--border-color)' }}>
              <h3 className="text-xl font-bold mb-3" style={{ color: 'var(--text-primary)' }}>Strategy</h3>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                I can translate business priorities into GTM strategy, positioning, ICP, messaging, and execution plans.
              </p>
            </div>
            <div className="rounded-lg p-6" style={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--border-color)' }}>
              <h3 className="text-xl font-bold mb-3" style={{ color: 'var(--text-primary)' }}>Execution</h3>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                I can work hands-on across acquisition, lifecycle, campaigns, CRO, events, and sales enablement.
              </p>
            </div>
            <div className="rounded-lg p-6" style={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--border-color)' }}>
              <h3 className="text-xl font-bold mb-3" style={{ color: 'var(--text-primary)' }}>Technology</h3>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                I can design and connect MarTech, CRM, and automation systems.
              </p>
            </div>
            <div className="rounded-lg p-6" style={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--border-color)' }}>
              <h3 className="text-xl font-bold mb-3" style={{ color: 'var(--text-primary)' }}>Data</h3>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                I use funnel data, experimentation, and performance signals to make decisions.
              </p>
            </div>
            <div className="rounded-lg p-6" style={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--border-color)' }}>
              <h3 className="text-xl font-bold mb-3" style={{ color: 'var(--text-primary)' }}>AI</h3>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                I use AI and automation to redesign repetitive marketing workflows and increase operating leverage.
              </p>
            </div>
            <div className="rounded-lg p-6" style={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--border-color)' }}>
              <h3 className="text-xl font-bold mb-3" style={{ color: 'var(--text-primary)' }}>Cross-Functional</h3>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                I work across product, engineering, sales, marketing, and leadership.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Education & Certifications */}
      <section className="py-20 px-6 lg:px-12">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
              Education & Certifications
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-6" style={{ color: 'var(--text-primary)' }}>Education</h3>
              <div className="space-y-4">
                <div className="rounded-lg p-4" style={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--border-color)' }}>
                  <div className="text-sm font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>MBA, Marketing</div>
                  <div className="text-xs" style={{ color: 'var(--text-tertiary)' }}>Manipal University Jaipur · Dec 2023</div>
                </div>
                <div className="rounded-lg p-4" style={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--border-color)' }}>
                  <div className="text-sm font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>BSc, Microbiology</div>
                  <div className="text-xs" style={{ color: 'var(--text-tertiary)' }}>West Bengal State University · Aug 2017</div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-6" style={{ color: 'var(--text-primary)' }}>Certifications</h3>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 rounded-full text-xs font-medium" style={{ backgroundColor: 'var(--bg-secondary)', color: 'var(--text-secondary)' }}>Salesforce Marketing Cloud</span>
                <span className="px-3 py-1 rounded-full text-xs font-medium" style={{ backgroundColor: 'var(--bg-secondary)', color: 'var(--text-secondary)' }}>Google Digital Marketing</span>
                <span className="px-3 py-1 rounded-full text-xs font-medium" style={{ backgroundColor: 'var(--bg-secondary)', color: 'var(--text-secondary)' }}>SQL</span>
                <span className="px-3 py-1 rounded-full text-xs font-medium" style={{ backgroundColor: 'var(--bg-secondary)', color: 'var(--text-secondary)' }}>HubSpot Digital Marketing</span>
                <span className="px-3 py-1 rounded-full text-xs font-medium" style={{ backgroundColor: 'var(--bg-secondary)', color: 'var(--text-secondary)' }}>Google Project Management</span>
                <span className="px-3 py-1 rounded-full text-xs font-medium" style={{ backgroundColor: 'var(--bg-secondary)', color: 'var(--text-secondary)' }}>Predictive PM (PMI)</span>
                <span className="px-3 py-1 rounded-full text-xs font-medium" style={{ backgroundColor: 'var(--bg-secondary)', color: 'var(--text-secondary)' }}>Outbound Automation (Clay)</span>
                <span className="px-3 py-1 rounded-full text-xs font-medium" style={{ backgroundColor: 'var(--bg-secondary)', color: 'var(--text-secondary)' }}>Product-Led Growth (Pendo)</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-6 lg:px-12" style={{ backgroundColor: 'var(--bg-secondary)' }}>
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6" style={{ color: 'var(--text-primary)' }}>
            Building something that needs a GTM system?
          </h2>
          <p className="text-lg mb-8" style={{ color: 'var(--text-tertiary)' }}>
            Let's explore how I can help architect your go-to-market strategy.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/work"
              className="px-6 py-3 rounded-lg font-semibold transition-all hover:shadow-lg"
              style={{ backgroundColor: 'var(--accent)', color: '#fff' }}
            >
              View My Work
            </Link>
            <Link
              to="/gtm-stack"
              className="px-6 py-3 rounded-lg font-semibold border-2 transition-all hover:shadow-lg"
              style={{ borderColor: 'var(--border-color)', color: 'var(--text-primary)', backgroundColor: 'var(--card-bg)' }}
            >
              Explore GTM Lab
            </Link>
            <Link
              to="/contact"
              className="px-6 py-3 rounded-lg font-semibold border-2 transition-all hover:shadow-lg"
              style={{ borderColor: 'var(--border-color)', color: 'var(--text-primary)', backgroundColor: 'var(--card-bg)' }}
            >
              Work With Me
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
