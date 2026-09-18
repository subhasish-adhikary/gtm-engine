import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Calendar, Clock, User, Search, BookOpen } from 'lucide-react';
import { thinkingCategories } from '../data/content';
import { allArticles } from '../data/articles';
import { SectionHeader, Card, Breadcrumb } from '../components/UI';
import { AuthorBox } from '../components/AuthorBox';

export function ThinkingPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredArticles = allArticles.filter((article) => {
    const matchCat = selectedCategory === 'all' || article.category === selectedCategory;
    const matchSearch = !searchQuery || article.title.toLowerCase().includes(searchQuery.toLowerCase()) || article.thesis.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  const featuredArticle = filteredArticles[0];
  const regularArticles = filteredArticles.slice(1);

  return (
    <div className="py-12 sm:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumb items={[{ label: 'Home', path: '/' }, { label: 'Thinking' }]} />
        <SectionHeader eyebrow="Thinking" title="Research-led marketing intelligence" description="Deep research on B2B GTM strategy, marketing automation, and AI in marketing. 15 articles with original analysis, frameworks, and practical implications." />

        <div className="mt-8 relative">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-tertiary)' }} />
          <input type="text" placeholder="Search articles..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full pl-10 pr-4 py-2.5 rounded-lg border text-sm" style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--border-color)', color: 'var(--text-primary)' }} />
        </div>

        <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
          <button onClick={() => setSelectedCategory('all')} className={`p-3 rounded-lg border text-left text-sm font-medium ${selectedCategory === 'all' ? 'border-2' : ''}`} style={{ borderColor: selectedCategory === 'all' ? 'var(--accent)' : 'var(--border-color)', backgroundColor: selectedCategory === 'all' ? 'var(--bg-secondary)' : 'var(--card-bg)', color: 'var(--text-primary)' }}>All ({allArticles.length})</button>
          {thinkingCategories.map(cat => {
            const count = allArticles.filter(a => a.category === cat.id).length;
            return (
              <button key={cat.id} onClick={() => setSelectedCategory(cat.id)} className={`p-3 rounded-lg border text-left text-sm font-medium ${selectedCategory === cat.id ? 'border-2' : ''}`} style={{ borderColor: selectedCategory === cat.id ? 'var(--accent)' : 'var(--border-color)', backgroundColor: selectedCategory === cat.id ? 'var(--bg-secondary)' : 'var(--card-bg)', color: 'var(--text-primary)' }}>{cat.title} ({count})</button>
            );
          })}
        </div>

        {featuredArticle && selectedCategory === 'all' && searchQuery === '' && (
          <div className="mt-12">
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4" style={{ color: 'var(--text-tertiary)' }}>Featured</h3>
            <Link to={`/thinking/${featuredArticle.category}/${featuredArticle.id}`} className="block group">
              <Card hoverable>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {featuredArticle.featuredImage && !featuredArticle.featuredImage.startsWith('/images/') && (
                    <div className="aspect-video rounded-lg overflow-hidden">
                      <img src={featuredArticle.featuredImage} alt={featuredArticle.featuredImageAlt} loading="lazy" className="w-full h-full object-cover" />
                    </div>
                  )}
                  <div>
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-full" style={{ backgroundColor: 'var(--bg-secondary)', color: 'var(--accent)' }}>{thinkingCategories.find(c => c.id === featuredArticle.category)?.title}</span>
                    <h2 className="mt-3 text-xl font-semibold group-hover:text-accent transition-colors" style={{ color: 'var(--text-primary)' }}>{featuredArticle.title}</h2>
                    <p className="mt-2 text-sm leading-relaxed" style={{ color: 'var(--text-tertiary)' }}>{featuredArticle.thesis}</p>
                    <div className="mt-4 flex items-center gap-4 text-xs" style={{ color: 'var(--text-tertiary)' }}>
                      <span className="flex items-center gap-1"><Calendar size={11} />{new Date(featuredArticle.publishedDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                      <span className="flex items-center gap-1"><Clock size={11} />{featuredArticle.readingTime}</span>
                    </div>
                  </div>
                </div>
              </Card>
            </Link>
          </div>
        )}

        <div className="mt-12">
          <h3 className="text-sm font-semibold uppercase tracking-wider mb-6" style={{ color: 'var(--text-tertiary)' }}>
            {selectedCategory === 'all' ? 'Latest Thinking' : thinkingCategories.find(c => c.id === selectedCategory)?.title}
          </h3>
          {regularArticles.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {regularArticles.map((article) => (
                <Link key={article.id} to={`/thinking/${article.category}/${article.id}`} className="block group">
                  <Card hoverable className="h-full flex flex-col">
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-full self-start" style={{ backgroundColor: 'var(--bg-secondary)', color: 'var(--accent)' }}>{thinkingCategories.find(c => c.id === article.category)?.title}</span>
                    <h3 className="mt-3 text-lg font-semibold group-hover:text-accent transition-colors" style={{ color: 'var(--text-primary)' }}>{article.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed flex-1" style={{ color: 'var(--text-tertiary)' }}>{article.thesis}</p>
                    <div className="mt-4 pt-3 border-t flex items-center gap-3 text-xs" style={{ borderColor: 'var(--border-color)', color: 'var(--text-tertiary)' }}>
                      <span className="flex items-center gap-1"><Calendar size={11} />{new Date(article.publishedDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                      <span className="flex items-center gap-1"><Clock size={11} />{article.readingTime}</span>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-sm" style={{ color: 'var(--text-tertiary)' }}>No articles found matching your criteria.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export function ThinkingCategoryPage() {
  const { categoryId } = useParams();
  const category = thinkingCategories.find(c => c.id === categoryId);
  const categoryArticles = allArticles.filter(a => a.category === categoryId);

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
                  <div className="mt-3 flex items-center gap-3 text-xs" style={{ color: 'var(--text-tertiary)' }}>
                    <span className="flex items-center gap-1"><Calendar size={11} />{new Date(article.publishedDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                    <span className="flex items-center gap-1"><Clock size={11} />{article.readingTime}</span>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        ) : (
          <div className="mt-12 p-12 rounded-lg border text-center" style={{ borderColor: 'var(--border-color)', backgroundColor: 'var(--bg-secondary)' }}>
            <BookOpen size={24} className="mx-auto mb-3" style={{ color: 'var(--accent)' }} />
            <h3 className="text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>Articles Coming Soon</h3>
          </div>
        )}
      </div>
    </div>
  );
}

export function ArticlePage() {
  const { categoryId, articleId } = useParams();
  const article = allArticles.find(a => a.id === articleId);

  if (!article) return <div className="py-32 text-center"><h2 className="text-xl font-semibold">Article not found</h2><Link to="/thinking" className="mt-4 inline-block text-sm" style={{ color: 'var(--accent)' }}>← Back</Link></div>;

  const relatedArticles = allArticles.filter(a => article.relatedArticles.includes(a.id));
  const relatedTools = allArticles.flatMap(a => a.relatedTools).filter((v, i, a) => a.indexOf(v) === i);

  return (
    <div className="py-12 sm:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumb items={[{ label: 'Home', path: '/' }, { label: 'Thinking', path: '/thinking' }, { label: thinkingCategories.find(c => c.id === article.category)?.title || '', path: `/thinking/${article.category}` }, { label: article.title }]} />

        {/* Article Header */}
        <header className="mb-12 max-w-3xl">
          <span className="text-xs font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full" style={{ backgroundColor: 'var(--bg-secondary)', color: 'var(--accent)' }}>{thinkingCategories.find(c => c.id === article.category)?.title}</span>
          <h1 className="mt-4 text-3xl sm:text-4xl font-semibold tracking-tight leading-tight" style={{ color: 'var(--text-primary)' }}>{article.title}</h1>
          <p className="mt-4 text-lg leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{article.thesis}</p>
          <div className="mt-6 flex flex-wrap items-center gap-4 text-sm" style={{ color: 'var(--text-tertiary)' }}>
            <span className="flex items-center gap-1.5"><User size={14} />{article.author}</span>
            <span className="flex items-center gap-1.5"><Calendar size={14} />{new Date(article.publishedDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
            <span className="flex items-center gap-1.5"><Clock size={14} />{article.readingTime}</span>
          </div>
        </header>

        {/* Feature Image */}
        {article.featuredImage && !article.featuredImage.startsWith('/images/') && (
          <div className="mb-12 aspect-video rounded-lg overflow-hidden max-w-4xl">
            <img src={article.featuredImage} alt={article.featuredImageAlt} className="w-full h-full object-cover" />
          </div>
        )}

        <div className="max-w-3xl">
          {/* At a Glance */}
          <div className="mb-8 p-6 rounded-lg border-l-4" style={{ borderColor: 'var(--accent)', backgroundColor: 'var(--bg-secondary)' }}>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-3" style={{ color: 'var(--accent)' }}>At a Glance</h3>
            <ul className="space-y-2">
              {article.atAGlance.map((point, i) => (
                <li key={i} className="flex gap-2 text-sm" style={{ color: 'var(--text-secondary)' }}>
                  <span style={{ color: 'var(--accent)' }}>→</span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Table of Contents */}
          <nav className="mb-12 p-6 rounded-lg border" style={{ borderColor: 'var(--border-color)', backgroundColor: 'var(--bg-secondary)' }}>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4" style={{ color: 'var(--text-tertiary)' }}>Contents</h3>
            <ol className="space-y-2">
              {article.tableOfContents.map((section, i) => (
                <li key={section.id}>
                  <a href={`#${section.id}`} className="text-sm hover:underline" style={{ color: 'var(--text-secondary)' }}>
                    <span className="font-medium" style={{ color: 'var(--text-tertiary)' }}>{i + 1}.</span> {section.title}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          {/* Article Content */}
          <div className="prose" dangerouslySetInnerHTML={{ __html: article.content }} />

          {/* FAQ */}
          {article.faq.length > 0 && (
            <section className="mt-12 pt-8 border-t" style={{ borderColor: 'var(--border-color)' }}>
              <h2 className="text-xl font-semibold mb-6" style={{ color: 'var(--text-primary)' }}>Frequently Asked Questions</h2>
              <div className="space-y-6">
                {article.faq.map((item, i) => (
                  <div key={i}>
                    <h3 className="text-base font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>{item.question}</h3>
                    <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{item.answer}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Sources */}
          {article.sources.length > 0 && (
            <section className="mt-12 pt-8 border-t" style={{ borderColor: 'var(--border-color)' }}>
              <h2 className="text-sm font-semibold uppercase tracking-wider mb-4" style={{ color: 'var(--text-tertiary)' }}>Sources & References</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {article.sources.map((source, i) => (
                  <a key={i} href={source.url} target="_blank" rel="noopener noreferrer" className="block p-4 rounded-lg border transition-colors hover:border-accent" style={{ borderColor: 'var(--border-color)' }}>
                    <h4 className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>{source.title}</h4>
                    {source.description && <p className="mt-1 text-xs" style={{ color: 'var(--text-tertiary)' }}>{source.description}</p>}
                  </a>
                ))}
              </div>
            </section>
          )}

          {/* Author Bio */}
          <section className="mt-12 pt-8 border-t" style={{ borderColor: 'var(--border-color)' }}>
            <AuthorBox name={article.author} />
          </section>

          {/* Related Articles */}
          {relatedArticles.length > 0 && (
            <section className="mt-12 pt-8 border-t" style={{ borderColor: 'var(--border-color)' }}>
              <h3 className="text-sm font-semibold uppercase tracking-wider mb-6" style={{ color: 'var(--text-tertiary)' }}>Related Thinking</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {relatedArticles.map((related) => (
                  <Link key={related.id} to={`/thinking/${related.category}/${related.id}`}>
                    <Card hoverable>
                      <span className="text-xs font-semibold px-2 py-0.5 rounded-full" style={{ backgroundColor: 'var(--bg-secondary)', color: 'var(--accent)' }}>{thinkingCategories.find(c => c.id === related.category)?.title}</span>
                      <h4 className="mt-2 text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>{related.title}</h4>
                      <p className="mt-1 text-xs" style={{ color: 'var(--text-tertiary)' }}>{related.thesis}</p>
                    </Card>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* Related Tools */}
          {article.relatedTools.length > 0 && (
            <section className="mt-8">
              <h3 className="text-sm font-semibold uppercase tracking-wider mb-4" style={{ color: 'var(--text-tertiary)' }}>Related Tools</h3>
              <div className="flex flex-wrap gap-2">
                {article.relatedTools.map((toolId) => (
                  <Link key={toolId} to={`/tools/${toolId}`} className="text-xs px-3 py-1.5 rounded-full border transition-colors hover:border-accent" style={{ borderColor: 'var(--border-color)', color: 'var(--text-secondary)' }}>
                    {toolId.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* Article CTA */}
          <section className="mt-12 p-6 rounded-lg border" style={{ borderColor: 'var(--border-color)', backgroundColor: 'var(--bg-secondary)' }}>
            <h3 className="text-base font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>Apply these insights to your GTM strategy</h3>
            <p className="text-sm mb-4" style={{ color: 'var(--text-tertiary)' }}>
              Use the interactive tools to diagnose your current approach, plan your budget, or design your marketing stack.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link to="/tools" className="inline-flex items-center px-4 py-2 rounded-md text-sm font-medium" style={{ backgroundColor: 'var(--accent)', color: '#fff' }}>
                Explore Tools <ArrowRight size={14} className="ml-2" />
              </Link>
              <Link to="/contact" className="inline-flex items-center px-4 py-2 rounded-md text-sm font-medium border" style={{ borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}>
                Discuss Your Strategy
              </Link>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
