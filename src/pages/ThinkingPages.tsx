import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, User, Search, BookOpen } from 'lucide-react';
import { thinkingCategories } from '../data/content';
import { SectionHeader, Card, Breadcrumb } from '../components/UI';

interface Article {
  title: string;
  thesis: string;
  category: string;
  author: string;
  publishedDate: string;
  readingTime: string;
  content: string;
  takeaways: string[];
}

const articles: Record<string, Article> = {
  'building-integrated-gtm': {
    title: 'Building Integrated GTM Systems: Beyond Channel Optimization',
    thesis: 'Most B2B companies optimize channels in isolation. The real leverage comes from connecting channels into a coherent system.',
    category: 'gtm', author: 'Subhasish Adhikary', publishedDate: '2024-01-15', readingTime: '12 min read',
    content: `<h2>The Problem with Channel Thinking</h2><p>Most marketing organizations think in channels: paid, content, outbound, events. Each channel has its own budget, team, and metrics. This creates optimization silos.</p><h2>Systems Thinking for GTM</h2><p>A GTM system connects positioning → channel strategy → campaign execution → sales handoff → measurement. The key insight: integration beats optimization.</p><h2>Implementation Framework</h2><p>Building an integrated system requires three pillars: unified positioning, connected channels, and shared metrics.</p>`,
    takeaways: ['Channel optimization creates local maxima. System integration creates compound growth.', 'Unified positioning accelerates everything else.', 'Shared metrics create shared accountability.'],
  },
  'automation-architecture': {
    title: 'Lifecycle-Based Automation Architecture',
    thesis: 'How to design marketing automation that scales without becoming unmanageable.',
    category: 'automation', author: 'Subhasish Adhikary', publishedDate: '2024-01-20', readingTime: '10 min read',
    content: `<h2>The Automation Debt Problem</h2><p>Most marketing teams accumulate automation debt — workflows built to solve immediate problems without architectural thinking.</p><h2>Lifecycle as the Organizing Principle</h2><p>When every lead exists in exactly one lifecycle stage, decisions become obvious. Automation rules trigger on stage transitions.</p><h2>Governance</h2><p>No new workflow without architectural review. This prevents the chaos that makes automation unmanageable.</p>`,
    takeaways: ['Architecture before automation.', 'Lifecycle stages simplify everything.', 'Governance is not bureaucracy — it prevents chaos.'],
  },
  'ai-marketing-operations': {
    title: 'AI in Marketing Operations: Beyond Content Generation',
    thesis: 'The real value of AI in marketing isn\'t content creation — it\'s building better decision loops.',
    category: 'ai-marketing', author: 'Subhasish Adhikary', publishedDate: '2024-01-25', readingTime: '8 min read',
    content: `<h2>Beyond Content Generation</h2><p>Most AI applications in marketing focus on content creation. But the real leverage is in decision loops — faster feedback, sharper targeting, better resource allocation.</p><h2>AI as Infrastructure</h2><p>The marketers who will thrive are those who architect AI into their workflows as infrastructure, not novelty.</p><h2>Human + AI</h2><p>AI should amplify human judgment. Strategic thinking, creative direction, and relationship management remain firmly human.</p>`,
    takeaways: ['AI value is in decision loops, not just content.', 'Architect AI as infrastructure, not novelty.', 'Human judgment remains essential.'],
  },
};

export function ThinkingPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const articleList = Object.entries(articles).map(([id, a]) => ({ id, ...a }));
  const filtered = articleList.filter(a => {
    const matchCat = selectedCategory === 'all' || a.category === selectedCategory;
    const matchSearch = !searchQuery || a.title.toLowerCase().includes(searchQuery.toLowerCase()) || a.thesis.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });
  return (
    <div className="py-12 sm:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumb items={[{ label: 'Home', path: '/' }, { label: 'Thinking' }]} />
        <SectionHeader eyebrow="Thinking" title="Ideas, frameworks, and analysis" description="Deep research on B2B GTM strategy, marketing automation, and AI in marketing." />
        <div className="mt-8 relative">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-tertiary)' }} />
          <input type="text" placeholder="Search articles..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full pl-10 pr-4 py-2.5 rounded-lg border text-sm" style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--border-color)', color: 'var(--text-primary)' }} />
        </div>
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
          <button onClick={() => setSelectedCategory('all')} className={`p-3 rounded-lg border text-left text-sm font-medium ${selectedCategory === 'all' ? 'border-2' : ''}`} style={{ borderColor: selectedCategory === 'all' ? 'var(--accent)' : 'var(--border-color)', backgroundColor: selectedCategory === 'all' ? 'var(--bg-secondary)' : 'var(--card-bg)', color: 'var(--text-primary)' }}>All</button>
          {thinkingCategories.map(cat => (
            <button key={cat.id} onClick={() => setSelectedCategory(cat.id)} className={`p-3 rounded-lg border text-left text-sm font-medium ${selectedCategory === cat.id ? 'border-2' : ''}`} style={{ borderColor: selectedCategory === cat.id ? 'var(--accent)' : 'var(--border-color)', backgroundColor: selectedCategory === cat.id ? 'var(--bg-secondary)' : 'var(--card-bg)', color: 'var(--text-primary)' }}>{cat.title}</button>
          ))}
        </div>
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((article) => (
            <Link key={article.id} to={`/thinking/${article.category}/${article.id}`}>
              <Card hoverable className="h-full flex flex-col">
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full self-start" style={{ backgroundColor: 'var(--bg-secondary)', color: 'var(--accent)' }}>{thinkingCategories.find(c => c.id === article.category)?.title}</span>
                <h3 className="mt-3 text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>{article.title}</h3>
                <p className="mt-2 text-sm leading-relaxed flex-1" style={{ color: 'var(--text-tertiary)' }}>{article.thesis}</p>
                <div className="mt-4 pt-3 border-t flex items-center gap-3 text-xs" style={{ borderColor: 'var(--border-color)', color: 'var(--text-tertiary)' }}>
                  <span className="flex items-center gap-1"><Calendar size={11} />{new Date(article.publishedDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                  <span className="flex items-center gap-1"><Clock size={11} />{article.readingTime}</span>
                </div>
              </Card>
            </Link>
          ))}
        </div>
        {filtered.length === 0 && <div className="mt-12 text-center"><p className="text-sm" style={{ color: 'var(--text-tertiary)' }}>No articles found.</p></div>}
      </div>
    </div>
  );
}

export function ThinkingCategoryPage() {
  const { categoryId } = useParams();
  const category = thinkingCategories.find(c => c.id === categoryId);
  const categoryArticles = Object.entries(articles).filter(([_, a]) => a.category === categoryId).map(([id, a]) => ({ id, ...a }));
  if (!category) return <div className="py-32 text-center"><h2 className="text-xl font-semibold">Category not found</h2><Link to="/thinking" className="mt-4 inline-block text-sm" style={{ color: 'var(--accent)' }}>← Back</Link></div>;
  return (
    <div className="py-12 sm:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumb items={[{ label: 'Home', path: '/' }, { label: 'Thinking', path: '/thinking' }, { label: category.title }]} />
        <SectionHeader eyebrow={category.title} title={category.title} description={category.description} />
        {categoryArticles.length > 0 ? (
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categoryArticles.map((article) => (
              <Link key={article.id} to={`/thinking/${article.category}/${article.id}`}>
                <Card hoverable>
                  <h3 className="text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>{article.title}</h3>
                  <p className="mt-2 text-sm" style={{ color: 'var(--text-tertiary)' }}>{article.thesis}</p>
                </Card>
              </Link>
            ))}
          </div>
        ) : (
          <div className="mt-12 p-12 rounded-lg border text-center" style={{ borderColor: 'var(--border-color)', backgroundColor: 'var(--bg-secondary)' }}>
            <BookOpen size={24} className="mx-auto mb-3" style={{ color: 'var(--accent)' }} />
            <h3 className="text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>Articles Coming Soon</h3>
            <p className="mt-2 text-sm" style={{ color: 'var(--text-tertiary)' }}>In-depth articles for this category are being written.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export function ArticlePage() {
  const { categoryId, articleId } = useParams();
  const article = articles[articleId as keyof typeof articles];
  if (!article) return <div className="py-32 text-center"><h2 className="text-xl font-semibold">Article not found</h2><Link to="/thinking" className="mt-4 inline-block text-sm" style={{ color: 'var(--accent)' }}>← Back</Link></div>;
  const relatedArticles = Object.entries(articles).filter(([id, a]) => id !== articleId && a.category === article.category).map(([id, a]) => ({ id, ...a }));
  return (
    <div className="py-12 sm:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumb items={[{ label: 'Home', path: '/' }, { label: 'Thinking', path: '/thinking' }, { label: article.title }]} />
        <header className="mb-12 max-w-3xl">
          <span className="text-xs font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full" style={{ backgroundColor: 'var(--bg-secondary)', color: 'var(--accent)' }}>{thinkingCategories.find(c => c.id === article.category)?.title}</span>
          <h1 className="mt-4 text-3xl sm:text-4xl font-semibold tracking-tight" style={{ color: 'var(--text-primary)' }}>{article.title}</h1>
          <p className="mt-4 text-lg leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{article.thesis}</p>
          <div className="mt-6 flex flex-wrap items-center gap-4 text-sm" style={{ color: 'var(--text-tertiary)' }}>
            <span className="flex items-center gap-1.5"><User size={14} />{article.author}</span>
            <span className="flex items-center gap-1.5"><Calendar size={14} />{new Date(article.publishedDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
            <span className="flex items-center gap-1.5"><Clock size={14} />{article.readingTime}</span>
          </div>
        </header>
        <div className="max-w-3xl">
          <div className="mb-8 p-6 rounded-lg border-l-4" style={{ borderColor: 'var(--accent)', backgroundColor: 'var(--bg-secondary)' }}>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-3" style={{ color: 'var(--accent)' }}>Key Takeaways</h3>
            <ul className="space-y-2">{article.takeaways.map((t: string, i: number) => <li key={i} className="flex gap-2 text-sm" style={{ color: 'var(--text-secondary)' }}><span style={{ color: 'var(--accent)' }}>→</span><span>{t}</span></li>)}</ul>
          </div>
          <div className="prose" dangerouslySetInnerHTML={{ __html: article.content }} />
          {relatedArticles.length > 0 && (
            <section className="mt-12 pt-8 border-t" style={{ borderColor: 'var(--border-color)' }}>
              <h3 className="text-sm font-semibold uppercase tracking-wider mb-6" style={{ color: 'var(--text-tertiary)' }}>Related Thinking</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {relatedArticles.map((related: any) => (
                  <Link key={related.id} to={`/thinking/${related.category}/${related.id}`}>
                    <Card hoverable>
                      <h4 className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>{related.title}</h4>
                      <p className="mt-1 text-xs" style={{ color: 'var(--text-tertiary)' }}>{related.thesis}</p>
                    </Card>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
