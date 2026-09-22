import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, ArrowRight, TrendingUp, Sparkles, Clock } from 'lucide-react';
import { glossaryCategories, glossaryTerms, getFeaturedTerms, getEmergingTerms, searchTerms } from '../data/glossary';
import { Breadcrumb, SectionHeader, Card, Tag } from '../components/UI';
import { NewsletterSignup } from '../components/NewsletterSignup';
import { newsletterPlacements } from '../data/newsletter';

export default function GlossaryPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const featuredTerms = getFeaturedTerms();
  const emergingTerms = getEmergingTerms();
  
  const filteredTerms = searchQuery 
    ? searchTerms(searchQuery)
    : selectedCategory === 'all'
    ? glossaryTerms
    : glossaryTerms.filter(term => term.category === selectedCategory);

  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  const termsByLetter = alphabet.reduce((acc, letter) => {
    acc[letter] = glossaryTerms.filter(term => term.term.toUpperCase().startsWith(letter));
    return acc;
  }, {} as Record<string, typeof glossaryTerms>);

  return (
    <div className="py-12 sm:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumb items={[{ label: 'Home', path: '/' }, { label: 'Glossary' }]} />
        
        {/* Hero Section */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-8" style={{ backgroundColor: 'var(--accent)' }} />
            <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--accent)' }}>
              Reference Library
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6" style={{ color: 'var(--text-primary)' }}>
            New-Age Marketing Glossary
          </h1>
          <p className="text-xl lg:text-2xl leading-relaxed max-w-3xl mb-4" style={{ color: 'var(--text-secondary)' }}>
            Modern marketing has a new vocabulary.
          </p>
          <p className="text-base lg:text-lg leading-relaxed max-w-3xl" style={{ color: 'var(--text-tertiary)' }}>
            An evolving reference for the terminology shaping modern growth, go-to-market, marketing operations, AI and revenue teams. Written by practitioners, for practitioners.
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-12">
          <div className="relative">
            <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-tertiary)' }} />
            <input
              type="text"
              placeholder="Search terms, concepts, or keywords..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-lg border-2 text-base"
              style={{ 
                backgroundColor: 'var(--card-bg)', 
                borderColor: 'var(--border-color)',
                color: 'var(--text-primary)'
              }}
            />
          </div>
          {searchQuery && (
            <p className="mt-3 text-sm" style={{ color: 'var(--text-tertiary)' }}>
              Found {filteredTerms.length} {filteredTerms.length === 1 ? 'term' : 'terms'}
            </p>
          )}
        </div>

        {/* Featured Terms */}
        {!searchQuery && selectedCategory === 'all' && (
          <section className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <Sparkles size={20} style={{ color: 'var(--accent)' }} />
              <h2 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>
                Essential Terms
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredTerms.map(term => (
                <Link key={term.id} to={`/glossary/${term.slug}`}>
                  <Card hoverable>
                    <div className="flex items-start justify-between mb-3">
                      <Tag>{glossaryCategories.find(c => c.id === term.category)?.name}</Tag>
                      {term.emerging && (
                        <span className="text-xs font-medium px-2 py-0.5 rounded" style={{ backgroundColor: 'var(--accent)', color: '#fff' }}>
                          Emerging
                        </span>
                      )}
                    </div>
                    <h3 className="text-lg font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
                      {term.term}
                    </h3>
                    <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--text-secondary)' }}>
                      {term.shortDefinition}
                    </p>
                    <div className="flex items-center gap-2 text-sm font-semibold" style={{ color: 'var(--accent)' }}>
                      Read definition <ArrowRight size={14} />
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Category Filter */}
        {!searchQuery && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6" style={{ color: 'var(--text-primary)' }}>
              Browse by Category
            </h2>
            <div className="flex flex-wrap gap-3 mb-8">
              <button
                onClick={() => setSelectedCategory('all')}
                className="px-4 py-2 rounded-lg text-sm font-semibold transition-all"
                style={{
                  backgroundColor: selectedCategory === 'all' ? 'var(--accent)' : 'var(--card-bg)',
                  color: selectedCategory === 'all' ? '#fff' : 'var(--text-secondary)',
                  border: `1px solid ${selectedCategory === 'all' ? 'var(--accent)' : 'var(--border-color)'}`
                }}
              >
                All Terms ({glossaryTerms.length})
              </button>
              {glossaryCategories.map(category => {
                const count = glossaryTerms.filter(t => t.category === category.id).length;
                if (count === 0) return null;
                return (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className="px-4 py-2 rounded-lg text-sm font-semibold transition-all"
                    style={{
                      backgroundColor: selectedCategory === category.id ? 'var(--accent)' : 'var(--card-bg)',
                      color: selectedCategory === category.id ? '#fff' : 'var(--text-secondary)',
                      border: `1px solid ${selectedCategory === category.id ? 'var(--accent)' : 'var(--border-color)'}`
                    }}
                  >
                    {category.name} ({count})
                  </button>
                );
              })}
            </div>
          </section>
        )}

        {/* Emerging Terms */}
        {!searchQuery && selectedCategory === 'all' && emergingTerms.length > 0 && (
          <section className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <TrendingUp size={20} style={{ color: 'var(--accent)' }} />
              <h2 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>
                Emerging Terms
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {emergingTerms.map(term => (
                <Link key={term.id} to={`/glossary/${term.slug}`}>
                  <Card hoverable>
                    <div className="flex items-start justify-between mb-3">
                      <Tag>{glossaryCategories.find(c => c.id === term.category)?.name}</Tag>
                      <span className="text-xs font-medium px-2 py-0.5 rounded" style={{ backgroundColor: 'var(--accent)', color: '#fff' }}>
                        Emerging
                      </span>
                    </div>
                    <h3 className="text-lg font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
                      {term.term}
                    </h3>
                    <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--text-secondary)' }}>
                      {term.shortDefinition}
                    </p>
                    <div className="flex items-center gap-2 text-sm font-semibold" style={{ color: 'var(--accent)' }}>
                      Read definition <ArrowRight size={14} />
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* All Terms / Filtered Results */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6" style={{ color: 'var(--text-primary)' }}>
            {searchQuery ? 'Search Results' : selectedCategory === 'all' ? 'All Terms' : glossaryCategories.find(c => c.id === selectedCategory)?.name}
          </h2>
          {filteredTerms.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTerms.map(term => (
                <Link key={term.id} to={`/glossary/${term.slug}`}>
                  <Card hoverable>
                    <div className="flex items-start justify-between mb-3">
                      <Tag>{glossaryCategories.find(c => c.id === term.category)?.name}</Tag>
                      {term.emerging && (
                        <span className="text-xs font-medium px-2 py-0.5 rounded" style={{ backgroundColor: 'var(--accent)', color: '#fff' }}>
                          Emerging
                        </span>
                      )}
                    </div>
                    <h3 className="text-lg font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
                      {term.term}
                    </h3>
                    <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--text-secondary)' }}>
                      {term.shortDefinition}
                    </p>
                    <div className="flex items-center gap-2 text-sm font-semibold" style={{ color: 'var(--accent)' }}>
                      Read definition <ArrowRight size={14} />
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-lg" style={{ color: 'var(--text-tertiary)' }}>
                No terms found. Try a different search or browse by category.
              </p>
            </div>
          )}
        </section>

        {/* A-Z Index */}
        {!searchQuery && selectedCategory === 'all' && (
          <section className="mb-16">
            <h2 className="text-2xl font-bold mb-6" style={{ color: 'var(--text-primary)' }}>
              A-Z Index
            </h2>
            <div className="flex flex-wrap gap-2 mb-8">
              {alphabet.map(letter => (
                <a
                  key={letter}
                  href={`#letter-${letter}`}
                  className="w-10 h-10 rounded-lg flex items-center justify-center text-sm font-semibold transition-all hover:scale-110"
                  style={{
                    backgroundColor: termsByLetter[letter].length > 0 ? 'var(--accent)' : 'var(--bg-secondary)',
                    color: termsByLetter[letter].length > 0 ? '#fff' : 'var(--text-tertiary)'
                  }}
                >
                  {letter}
                </a>
              ))}
            </div>
            <div className="space-y-8">
              {alphabet.map(letter => {
                if (termsByLetter[letter].length === 0) return null;
                return (
                  <div key={letter} id={`letter-${letter}`}>
                    <h3 className="text-3xl font-bold mb-4" style={{ color: 'var(--accent)' }}>
                      {letter}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {termsByLetter[letter].map(term => (
                        <Link key={term.id} to={`/glossary/${term.slug}`} className="group">
                          <div className="p-4 rounded-lg border transition-all group-hover:border-[var(--accent)]" style={{ borderColor: 'var(--border-color)' }}>
                            <h4 className="font-semibold mb-1 group-hover:text-[var(--accent)]" style={{ color: 'var(--text-primary)' }}>
                              {term.term}
                            </h4>
                            <p className="text-xs line-clamp-2" style={{ color: 'var(--text-tertiary)' }}>
                              {term.shortDefinition}
                            </p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* About the Glossary */}
        <section className="mb-12">
          <Card>
            <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
              About This Glossary
            </h2>
            <p className="text-base leading-relaxed mb-4" style={{ color: 'var(--text-secondary)' }}>
              This glossary is an evolving reference for modern marketing terminology — covering GTM strategy, growth marketing, marketing automation, AI marketing, SEO, AEO, GEO, demand generation, RevOps and more.
            </p>
            <p className="text-base leading-relaxed mb-4" style={{ color: 'var(--text-secondary)' }}>
              Each definition is written by practitioners for practitioners. We explain not just what terms mean, but why they matter, how they work, and when you should care about them.
            </p>
            <p className="text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              Written and maintained by <Link to="/about" className="font-semibold hover:underline" style={{ color: 'var(--accent)' }}>Subhasish Adhikary</Link> — Growth Marketing & GTM Engineer with 6+ years of experience building B2B growth systems.
            </p>
          </Card>
        </section>

        {/* Newsletter */}
        <div className="mt-12">
          <NewsletterSignup
            source={newsletterPlacements.glossaryHub.source}
            leadMagnet={newsletterPlacements.glossaryHub.leadMagnet}
            heading={newsletterPlacements.glossaryHub.heading}
            description={newsletterPlacements.glossaryHub.description}
            cta={newsletterPlacements.glossaryHub.cta}
          />
        </div>
      </div>
    </div>
  );
}
