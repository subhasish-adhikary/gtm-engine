import { useParams, Link } from 'react-router-dom';
import { ArrowRight, Calendar, User, BookOpen } from 'lucide-react';
import { getTermBySlug, glossaryCategories, glossaryTerms } from '../data/glossary';
import { Breadcrumb, Card, Tag } from '../components/UI';
import { NewsletterSignup } from '../components/NewsletterSignup';
import { resolveGlossaryLeadMagnet } from '../data/leadMagnets';

export default function GlossaryTermPage() {
  const { slug } = useParams<{ slug: string }>();
  const term = getTermBySlug(slug || '');

  if (!term) {
    return (
      <div className="py-32 text-center">
        <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
          Term not found
        </h2>
        <p className="text-base mb-6" style={{ color: 'var(--text-tertiary)' }}>
          The glossary term you're looking for doesn't exist.
        </p>
        <Link to="/glossary" className="inline-flex items-center gap-2 font-semibold" style={{ color: 'var(--accent)' }}>
          ← Back to Glossary
        </Link>
      </div>
    );
  }

  const category = glossaryCategories.find(c => c.id === term.category);
  // Relevant lead magnet for this term, with the newsletter as the fallback.
  const leadMagnet = resolveGlossaryLeadMagnet(term);
  const relatedTermsData = (term.relatedTerms || [])
    .map(id => glossaryTerms.find(t => t.id === id))
    .filter(Boolean) as typeof glossaryTerms;

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return 'N/A';
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="py-12 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumb items={[
          { label: 'Home', path: '/' },
          { label: 'Glossary', path: '/glossary' },
          { label: category?.name || '', path: `/glossary?category=${term.category}` },
          { label: term.term }
        ]} />

        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <Tag>{category?.name}</Tag>
            {term.emerging && (
              <span className="text-xs font-medium px-2 py-0.5 rounded" style={{ backgroundColor: 'var(--accent)', color: '#fff' }}>
                Emerging Term
              </span>
            )}
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-6" style={{ color: 'var(--text-primary)' }}>
            What is {term.term}?
          </h1>
          <p className="text-xl leading-relaxed mb-6" style={{ color: 'var(--text-secondary)' }}>
            {term.shortDefinition}
          </p>
          <div className="flex flex-wrap gap-4 text-sm" style={{ color: 'var(--text-tertiary)' }}>
            <div className="flex items-center gap-2">
              <User size={16} />
              <span>Written by Subhasish Adhikary</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar size={16} />
              <span>Last updated: {formatDate(term.updatedDate)}</span>
            </div>
          </div>
        </div>

        {/* Quick Answer Box */}
        <div className="mb-12 p-6 rounded-lg border-2" style={{ borderColor: 'var(--accent)', backgroundColor: 'var(--bg-secondary)' }}>
          <div className="flex items-center gap-2 mb-3">
            <BookOpen size={20} style={{ color: 'var(--accent)' }} />
            <h2 className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>
              Quick Answer
            </h2>
          </div>
          <p className="text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            {term.fullDefinition}
          </p>
        </div>

        {/* Definition */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
            Definition
          </h2>
          <p className="text-base leading-relaxed mb-4" style={{ color: 'var(--text-secondary)' }}>
            {term.fullDefinition}
          </p>
        </section>

        {/* Why It Matters */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
            Why It Matters
          </h2>
          <p className="text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            {term.whyItMatters}
          </p>
        </section>

        {/* How It Works */}
        {term.howItWorks && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
              How It Works
            </h2>
            <p className="text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              {term.howItWorks}
            </p>
          </section>
        )}

        {/* Example */}
        {term.example && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
              Example
            </h2>
            <div className="p-6 rounded-lg" style={{ backgroundColor: 'var(--bg-secondary)' }}>
              <p className="text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                {term.example}
              </p>
            </div>
          </section>
        )}

        {/* Use Cases */}
        {term.useCases && term.useCases.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
              Common Use Cases
            </h2>
            <ul className="space-y-2">
              {term.useCases.map((useCase, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: 'var(--accent)' }} />
                  <span className="text-base" style={{ color: 'var(--text-secondary)' }}>{useCase}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Common Mistakes */}
        {term.commonMistakes && term.commonMistakes.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
              Common Mistakes to Avoid
            </h2>
            <ul className="space-y-2">
              {term.commonMistakes.map((mistake, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: 'var(--text-tertiary)' }} />
                  <span className="text-base" style={{ color: 'var(--text-secondary)' }}>{mistake}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* FAQ */}
        {term.faq && term.faq.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6" style={{ color: 'var(--text-primary)' }}>
              Frequently Asked Questions
            </h2>
            <div className="space-y-6">
              {term.faq.map((item, index) => (
                <div key={index}>
                  <h3 className="text-lg font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
                    {item.question}
                  </h3>
                  <p className="text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                    {item.answer}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Related Terms */}
        {relatedTermsData.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6" style={{ color: 'var(--text-primary)' }}>
              Related Terms
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {relatedTermsData.map(related => (
                <Link key={related.id} to={`/glossary/${related.slug}`}>
                  <Card hoverable>
                    <div className="flex items-start justify-between mb-2">
                      <Tag>{glossaryCategories.find(c => c.id === related.category)?.name}</Tag>
                    </div>
                    <h3 className="text-base font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
                      {related.term}
                    </h3>
                    <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                      {related.shortDefinition}
                    </p>
                  </Card>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Sources */}
        {term.sources && term.sources.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
              Sources & References
            </h2>
            <ul className="space-y-3">
              {term.sources.map((source, index) => (
                <li key={index}>
                  <a
                    href={source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-base font-semibold hover:underline"
                    style={{ color: 'var(--accent)' }}
                  >
                    {source.title}
                  </a>
                  {source.description && (
                    <p className="text-sm mt-1" style={{ color: 'var(--text-tertiary)' }}>
                      {source.description}
                    </p>
                  )}
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Author Bio */}
        <section className="mb-12">
          <Card>
            <div className="flex items-start gap-4">
              <img 
                src="https://i.ibb.co/B2spFn8r/Subhasish-Adhikary-Marketer-1.png" 
                alt="Subhasish Adhikary"
                className="w-16 h-16 rounded-full object-cover border-2 flex-shrink-0"
                style={{ borderColor: 'var(--border-color)' }}
              />
              <div>
                <h3 className="text-lg font-bold mb-1" style={{ color: 'var(--text-primary)' }}>
                  About the Author
                </h3>
                <p className="text-sm font-semibold mb-2" style={{ color: 'var(--accent)' }}>
                  Subhasish Adhikary
                </p>
                <p className="text-sm leading-relaxed mb-3" style={{ color: 'var(--text-secondary)' }}>
                  Growth Marketing & GTM Engineer with 6+ years of experience building B2B growth systems across demand generation, marketing automation, outbound, ABM and AI-enabled RevOps. Currently at LanceSoft, building growth and GTM systems that connect marketing execution with pipeline creation.
                </p>
                <Link to="/about" className="inline-flex items-center gap-2 text-sm font-semibold" style={{ color: 'var(--accent)' }}>
                  Learn more about Subhasish <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </Card>
        </section>

        {/* Newsletter */}
        <div className="mb-12">
          <NewsletterSignup
            source="glossary-term"
            leadMagnet={leadMagnet.id}
            heading={leadMagnet.title}
            description={leadMagnet.description}
            cta={leadMagnet.cta}
            availability={leadMagnet.availability}
            resource={leadMagnet.resource}
            contextNote={category ? `Matched to the ${category.name} area of this glossary.` : undefined}
          />
        </div>

        {/* Back to Glossary */}
        <div className="text-center">
          <Link to="/glossary" className="inline-flex items-center gap-2 font-semibold" style={{ color: 'var(--accent)' }}>
            ← Back to Glossary
          </Link>
        </div>
      </div>
    </div>
  );
}
