import { Link } from 'react-router-dom';
import { ArrowRight, TrendingUp, Package, Target, Zap, Brain, BarChart3 } from 'lucide-react';
import { siteConfig, capabilities, selectedWork, thinkingCategories, tools } from '../data/content';
import { Button, SectionHeader, Card, Tag } from '../components/UI';

const iconMap: any = { 'trending-up': <TrendingUp size={20} />, 'package': <Package size={20} />, 'target': <Target size={20} />, 'zap': <Zap size={20} />, 'brain': <Brain size={20} />, 'bar-chart': <BarChart3 size={20} /> };

export function HomePage() {
  return (
    <div>
      <section className="py-20 sm:py-28 lg:py-36">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="animate-fade-in-up">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-px w-8" style={{ backgroundColor: 'var(--accent)' }} />
                <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--accent)' }}>Growth Marketing · B2B GTM · Marketing Intelligence</span>
              </div>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-[3.25rem] font-semibold tracking-tight leading-[1.15] animate-fade-in-up delay-100" style={{ color: 'var(--text-primary)' }}>{siteConfig.tagline}</h1>
            <p className="mt-6 text-lg leading-relaxed max-w-2xl animate-fade-in-up delay-200" style={{ color: 'var(--text-tertiary)' }}>{siteConfig.description}</p>
            <div className="mt-10 flex flex-wrap gap-3 animate-fade-in-up delay-300">
              <Button to="/work" size="lg">View Work <ArrowRight size={16} className="ml-2" /></Button>
              <Button to="/thinking" variant="secondary" size="lg">Explore Thinking</Button>
              <Button to="/tools" variant="ghost" size="lg">Explore Tools</Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 border-t" style={{ borderColor: 'var(--border-color)' }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-10">
            <SectionHeader eyebrow="Selected Work" title="Strategic narratives, not resume bullets" />
            <Link to="/work" className="hidden sm:inline-flex items-center text-sm font-medium" style={{ color: 'var(--accent)' }}>View all <ArrowRight size={14} className="ml-1" /></Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {selectedWork.map((work) => (
              <Link key={work.id} to={`/work/${work.id}`}>
                <Card hoverable>
                  <div className="flex items-start justify-between">
                    <Tag>{work.category}</Tag>
                    <span className="text-xs font-medium badge-soon px-2 py-0.5 rounded">View Case Study →</span>
                  </div>
                  <h3 className="mt-4 text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>{work.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed" style={{ color: 'var(--text-tertiary)' }}>{work.summary}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {work.tags.map((tag) => <span key={tag} className="text-xs px-2 py-0.5 rounded" style={{ backgroundColor: 'var(--bg-secondary)', color: 'var(--text-tertiary)' }}>{tag}</span>)}
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 border-t" style={{ borderColor: 'var(--border-color)' }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader eyebrow="What I Work On" title="Capabilities" description="The intersection of strategy, execution, and systems thinking in modern marketing." align="center" />
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {capabilities.map((cap) => (
              <Card key={cap.title}>
                <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'var(--bg-secondary)', color: 'var(--accent)' }}>{iconMap[cap.icon]}</div>
                <h3 className="mt-4 text-base font-semibold" style={{ color: 'var(--text-primary)' }}>{cap.title}</h3>
                <p className="mt-2 text-sm leading-relaxed" style={{ color: 'var(--text-tertiary)' }}>{cap.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 border-t" style={{ borderColor: 'var(--border-color)' }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader eyebrow="Thinking" title="Ideas, frameworks, and analysis" />
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6">
            {thinkingCategories.map((cat) => (
              <Link key={cat.id} to={`/thinking/${cat.id}`}>
                <Card hoverable>
                  <h3 className="text-base font-semibold" style={{ color: 'var(--text-primary)' }}>{cat.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed" style={{ color: 'var(--text-tertiary)' }}>{cat.description}</p>
                  <span className="mt-4 inline-flex items-center text-xs font-medium" style={{ color: 'var(--accent)' }}>Explore <ArrowRight size={12} className="ml-1" /></span>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 border-t" style={{ borderColor: 'var(--border-color)' }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader eyebrow="Interactive Tools" title="Strategy toolkits for marketers" description="Practical tools for GTM planning, budget allocation, and channel selection." />
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {tools.slice(0, 6).map((tool) => (
              <Link key={tool.id} to={`/tools/${tool.id}`}>
                <Card hoverable>
                  <div className="flex items-center justify-between">
                    <Tag>{tool.category}</Tag>
                    <span className="text-xs font-medium badge-soon px-2 py-0.5 rounded">{tool.status === 'active' ? 'Try Tool →' : 'Coming Soon'}</span>
                  </div>
                  <h3 className="mt-3 text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>{tool.title}</h3>
                  <p className="mt-1.5 text-xs leading-relaxed" style={{ color: 'var(--text-tertiary)' }}>{tool.description}</p>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 border-t" style={{ borderColor: 'var(--border-color)', backgroundColor: 'var(--bg-secondary)' }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight" style={{ color: 'var(--text-primary)' }}>Let's build something strategic</h2>
          <p className="mt-4 text-base max-w-xl mx-auto" style={{ color: 'var(--text-tertiary)' }}>Whether you're designing a GTM motion, restructuring your marketing stack, or exploring AI in your marketing operations.</p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Button to="/contact" size="lg">Get in Touch <ArrowRight size={16} className="ml-2" /></Button>
          </div>
        </div>
      </section>
    </div>
  );
}
