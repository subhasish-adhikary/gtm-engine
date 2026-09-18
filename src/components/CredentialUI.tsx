import { useMemo, useState } from 'react';
import { ArrowUpRight, X, Search, Award, GraduationCap, ChevronRight } from 'lucide-react';
import {
  education,
  featuredCredentials,
  additionalCredentials,
  learningTimeline,
  credentialFilters,
  getCredentialById,
  typeLabels,
  type Credential,
} from '../data/credentials';

/*
 * Reusable building blocks for the Credentials page.
 * All styling follows the site token system (CSS variables) so light and
 * dark themes both work. Sections are composed in CredentialsPage.tsx.
 */

function SectionLabel({ index, title }: { index: string; title: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-xs font-semibold tracking-widest" style={{ color: 'var(--accent)' }}>{index}</span>
      <span className="h-px w-8" style={{ backgroundColor: 'var(--border-color)' }} />
      <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: 'var(--text-tertiary)' }}>{title}</span>
    </div>
  );
}

/* ---------------------------------- Education --------------------------------- */

export function EducationSection() {
  return (
    <section aria-labelledby="education-heading" className="py-16 sm:py-20 border-t" style={{ borderColor: 'var(--border-color)' }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionLabel index="01" title="Formal Education" />
        <h2 id="education-heading" className="sr-only">Education</h2>
        <div className="mt-8 grid md:grid-cols-12 gap-8">
          <div className="md:col-span-4">
            <div className="text-sm uppercase tracking-widest" style={{ color: 'var(--text-tertiary)' }}>Master of Business Administration</div>
            <div className="mt-3 inline-flex items-center gap-2 text-sm px-3 py-1.5 rounded-md border" style={{ borderColor: 'var(--border-color)', color: 'var(--text-secondary)' }}>
              <GraduationCap size={15} />
              {education.duration}
            </div>
          </div>
          <div className="md:col-span-8">
            <h3 className="text-2xl sm:text-3xl font-semibold tracking-tight" style={{ color: 'var(--text-primary)' }}>
              MBA, Marketing
            </h3>
            <p className="mt-2 text-lg" style={{ color: 'var(--text-secondary)' }}>{education.institution}</p>
            <p className="mt-6 max-w-2xl leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              {education.description}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ----------------------------- Featured credentials ---------------------------- */

function FeaturedRow({ credential, index, onOpen, onOpenImage }: { credential: Credential; index: number; onOpen: (c: Credential) => void; onOpenImage: (c: Credential) => void }) {
  return (
    <div className="grid md:grid-cols-12 gap-4 md:gap-6 py-8 border-t" style={{ borderColor: 'var(--border-color)' }}>
      <div className="md:col-span-1 text-sm font-semibold pt-1" style={{ color: 'var(--text-tertiary)' }}>
        {String(index + 1).padStart(2, '0')}
      </div>
      <button
        onClick={() => onOpen(credential)}
        className="md:col-span-7 text-left group"
        aria-label={`View details: ${credential.title}`}
      >
        <div className="text-xs font-semibold uppercase tracking-widest" style={{ color: 'var(--accent)' }}>
          {typeLabels[credential.credentialType]}
        </div>
        <h3 className="mt-2 text-xl sm:text-2xl font-semibold tracking-tight transition-colors" style={{ color: 'var(--text-primary)' }}>
          {credential.title}
        </h3>
        <div className="mt-2 text-sm" style={{ color: 'var(--text-tertiary)' }}>
          {credential.issuer && <span>{credential.issuer}</span>}
          {credential.provider && <span>{credential.issuer ? ' · Completed via ' : 'Completed via '}{credential.provider}</span>}
          {credential.date && <span> · {credential.date}</span>}
        </div>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
          {credential.summary}
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {credential.skills.slice(0, 4).map((skill) => (
            <span key={skill} className="text-xs px-2 py-1 rounded" style={{ backgroundColor: 'var(--bg-secondary)', color: 'var(--text-secondary)' }}>
              {skill}
            </span>
          ))}
          {credential.skills.length > 4 && (
            <span className="text-xs px-2 py-1" style={{ color: 'var(--text-tertiary)' }}>+{credential.skills.length - 4} more</span>
          )}
        </div>
        <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium" style={{ color: 'var(--text-tertiary)' }}>
          Details
          <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>
      </button>
      <div className="md:col-span-4 flex md:justify-end items-start">
        {credential.image ? (
          <button
            onClick={() => onOpenImage(credential)}
            className="block rounded-md border overflow-hidden cursor-zoom-in transition-opacity hover:opacity-90"
            style={{ borderColor: 'var(--border-color)', backgroundColor: 'var(--card-bg)' }}
            aria-label={`View certificate: ${credential.title}`}
          >
            <img
              src={credential.image}
              alt={credential.imageAlt || credential.title}
              width={credential.imageWidth}
              height={credential.imageHeight}
              loading={index === 0 ? 'eager' : 'lazy'}
              decoding="async"
              className="w-48 sm:w-56 h-auto object-cover"
            />
          </button>
        ) : (
          <button
            onClick={() => onOpen(credential)}
            className="inline-flex items-center gap-1.5 text-sm font-medium pt-1"
            style={{ color: 'var(--text-tertiary)' }}
          >
            Details
            <ArrowUpRight size={16} />
          </button>
        )}
      </div>
    </div>
  );
}

export function FeaturedCredentialsSection({ onOpen, onOpenImage }: { onOpen: (c: Credential) => void; onOpenImage: (c: Credential) => void }) {
  return (
    <section aria-labelledby="featured-heading" className="py-16 sm:py-20 border-t" style={{ borderColor: 'var(--border-color)' }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionLabel index="02" title="Featured Credentials" />
        <h2 id="featured-heading" className="mt-8 text-2xl sm:text-3xl font-semibold tracking-tight max-w-2xl" style={{ color: 'var(--text-primary)' }}>
          Certifications most relevant to the work I do now
        </h2>
        <p className="mt-4 max-w-2xl leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
          Five programs that map directly to how I build GTM systems today: strategy and problem solving, outbound automation, product-led growth, marketing automation and consulting-style analysis.
        </p>
        <div className="mt-12">
          {featuredCredentials.map((credential, i) => (
            <FeaturedRow key={credential.id} credential={credential} index={i} onOpen={onOpen} onOpenImage={onOpenImage} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------ Timeline + context ----------------------------- */

function TimelineChip({ id, onOpen }: { id: string; onOpen: (c: Credential) => void }) {
  if (id === 'education') {
    return (
      <span className="inline-flex items-center gap-2 text-sm px-3 py-2 rounded-md border" style={{ borderColor: 'var(--border-color)', color: 'var(--text-secondary)', backgroundColor: 'var(--card-bg)' }}>
        <GraduationCap size={14} />
        MBA, Marketing
      </span>
    );
  }
  const credential = getCredentialById(id);
  if (!credential) return null;
  return (
    <button
      onClick={() => onOpen(credential)}
      className="inline-flex items-center gap-2 text-sm px-3 py-2 rounded-md border transition-colors hover:underline"
      style={{ borderColor: 'var(--border-color)', color: 'var(--text-secondary)', backgroundColor: 'var(--card-bg)' }}
    >
      <Award size={14} />
      {credential.title}
      <ChevronRight size={13} style={{ color: 'var(--text-tertiary)' }} />
    </button>
  );
}

export function LearningTimelineSection({ onOpen }: { onOpen: (c: Credential) => void }) {
  const [activeYear, setActiveYear] = useState(learningTimeline[0].year);
  const active = learningTimeline.find((t) => t.year === activeYear) || learningTimeline[0];

  return (
    <section aria-labelledby="timeline-heading" className="py-16 sm:py-20 border-t" style={{ borderColor: 'var(--border-color)' }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionLabel index="03" title="Progression" />
        <div className="mt-8 grid md:grid-cols-12 gap-10">
          <div className="md:col-span-5">
            <h2 id="timeline-heading" className="text-2xl sm:text-3xl font-semibold tracking-tight" style={{ color: 'var(--text-primary)' }}>
              Learning that moved alongside the work
            </h2>
            <p className="mt-5 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              My professional development started with digital marketing and SEO fundamentals, then moved into growth, automation and GTM systems, product marketing and analytics. Each credential answered a problem the work was already asking: how to reach the right accounts, how to automate enrichment and outreach, how to connect product usage to pipeline.
            </p>
            <p className="mt-4 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              The timeline below shows that progression year by year.
            </p>
          </div>
          <div className="md:col-span-7">
            <div role="tablist" aria-label="Learning timeline by year" className="flex overflow-x-auto border-b" style={{ borderColor: 'var(--border-color)' }}>
              {learningTimeline.map((entry) => {
                const isActive = entry.year === active.year;
                return (
                  <button
                    key={entry.year}
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setActiveYear(entry.year)}
                    className="px-5 py-3 text-sm font-semibold whitespace-nowrap border-b-2 -mb-px transition-colors"
                    style={{
                      borderColor: isActive ? 'var(--accent)' : 'transparent',
                      color: isActive ? 'var(--text-primary)' : 'var(--text-tertiary)',
                    }}
                  >
                    {entry.year}
                  </button>
                );
              })}
            </div>
            <div className="pt-6">
              <div className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>{active.label}</div>
              <p className="mt-2 text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{active.description}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {active.items.map((id) => (
                  <TimelineChip key={id} id={id} onOpen={onOpen} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------- Credential archive ----------------------------- */

export function CredentialArchiveSection({ onOpen }: { onOpen: (c: Credential) => void }) {
  const [query, setQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return additionalCredentials.filter((c) => {
      const matchesFilter = !activeFilter || c.categories.includes(activeFilter);
      const matchesQuery =
        !q ||
        c.title.toLowerCase().includes(q) ||
        (c.issuer || '').toLowerCase().includes(q) ||
        c.skills.some((s) => s.toLowerCase().includes(q));
      return matchesFilter && matchesQuery;
    });
  }, [query, activeFilter]);

  return (
    <section aria-labelledby="archive-heading" className="py-16 sm:py-20 border-t" style={{ borderColor: 'var(--border-color)' }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionLabel index="04" title="Additional Learning and Credentials" />
        <h2 id="archive-heading" className="mt-8 text-2xl sm:text-3xl font-semibold tracking-tight max-w-2xl" style={{ color: 'var(--text-primary)' }}>
          The broader learning archive
        </h2>
        <p className="mt-4 max-w-2xl leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
          Earlier certifications and courses across digital marketing, SEO, analytics, advertising and project management. These built the base that the more specialized GTM and automation work now sits on.
        </p>

        <div className="mt-10 space-y-4">
          <div className="relative max-w-md">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-tertiary)' }} />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search credentials, issuers or skills"
              aria-label="Search credentials"
              className="w-full pl-9 pr-3 py-2.5 text-sm rounded-md border bg-transparent"
              style={{ borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}
            />
          </div>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Filter credentials by category">
            <button
              onClick={() => setActiveFilter(null)}
              aria-pressed={activeFilter === null}
              className="text-xs px-3 py-1.5 rounded-full border transition-colors"
              style={
                activeFilter === null
                  ? { borderColor: 'var(--accent)', color: 'var(--accent)', backgroundColor: 'var(--bg-tertiary)' }
                  : { borderColor: 'var(--border-color)', color: 'var(--text-secondary)' }
              }
            >
              All
            </button>
            {credentialFilters.map((filter) => {
              const isActive = activeFilter === filter;
              return (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(isActive ? null : filter)}
                  aria-pressed={isActive}
                  className="text-xs px-3 py-1.5 rounded-full border transition-colors"
                  style={
                    isActive
                      ? { borderColor: 'var(--accent)', color: 'var(--accent)', backgroundColor: 'var(--bg-tertiary)' }
                      : { borderColor: 'var(--border-color)', color: 'var(--text-secondary)' }
                  }
                >
                  {filter}
                </button>
              );
            })}
          </div>
          <p className="text-xs" style={{ color: 'var(--text-tertiary)' }} aria-live="polite">
            {results.length} credential{results.length === 1 ? '' : 's'}
          </p>
        </div>

        <ul className="mt-6 border-t" style={{ borderColor: 'var(--border-color)' }}>
          {results.map((credential) => (
            <li key={credential.id}>
              <button
                onClick={() => onOpen(credential)}
                className="w-full text-left group flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 py-4 border-b transition-colors"
                style={{ borderColor: 'var(--border-color)' }}
              >
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium truncate" style={{ color: 'var(--text-primary)' }}>{credential.title}</div>
                  <div className="text-xs mt-1" style={{ color: 'var(--text-tertiary)' }}>
                    {typeLabels[credential.credentialType]}
                    {credential.issuer ? ` · ${credential.issuer}` : ''}
                    {credential.provider ? ` · via ${credential.provider}` : ''}
                  </div>
                </div>
                <div className="hidden md:flex items-center gap-2">
                  {credential.categories.map((cat) => (
                    <span key={cat} className="text-xs px-2 py-0.5 rounded-full border" style={{ borderColor: 'var(--border-color)', color: 'var(--text-tertiary)' }}>
                      {cat}
                    </span>
                  ))}
                </div>
                <ArrowUpRight size={15} className="hidden sm:block shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" style={{ color: 'var(--text-tertiary)' }} />
              </button>
            </li>
          ))}
          {results.length === 0 && (
            <li className="py-8 text-sm" style={{ color: 'var(--text-tertiary)' }}>
              No credentials match that search.
            </li>
          )}
        </ul>
      </div>
    </section>
  );
}

/* ------------------------------- Credential detail ------------------------------ */

export function CredentialDetailModal({ credential, onClose, onOpenImage }: { credential: Credential | null; onClose: () => void; onOpenImage: (c: Credential) => void }) {
  if (!credential) return null;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center p-0 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label={`${credential.title} details`}
    >
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div
        className="relative w-full sm:max-w-2xl max-h-[90vh] overflow-y-auto rounded-t-2xl sm:rounded-lg border shadow-lg"
        style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--border-color)' }}
      >
        <div className="sticky top-0 flex items-center justify-between px-6 py-4 border-b" style={{ borderColor: 'var(--border-color)', backgroundColor: 'var(--card-bg)' }}>
          <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: 'var(--accent)' }}>
            {typeLabels[credential.credentialType]}
          </span>
          <button onClick={onClose} aria-label="Close details" className="p-1.5 rounded-md" style={{ color: 'var(--text-tertiary)' }}>
            <X size={18} />
          </button>
        </div>
        <div className="px-6 py-6">
          {credential.image && (
            <button
              onClick={() => onOpenImage(credential)}
              className="block w-full rounded-md border overflow-hidden cursor-zoom-in transition-opacity hover:opacity-90 mb-6"
              style={{ borderColor: 'var(--border-color)', backgroundColor: 'var(--card-bg)' }}
              aria-label={`View certificate: ${credential.title}`}
            >
              <img
                src={credential.image}
                alt={credential.imageAlt || credential.title}
                width={credential.imageWidth}
                height={credential.imageHeight}
                loading="eager"
                decoding="async"
                className="w-full h-auto"
              />
            </button>
          )}
          <h3 className="text-xl sm:text-2xl font-semibold tracking-tight" style={{ color: 'var(--text-primary)' }}>
            {credential.title}
          </h3>
          <dl className="mt-4 space-y-2 text-sm">
            {credential.issuer && (
              <div className="flex gap-2">
                <dt className="w-32 shrink-0" style={{ color: 'var(--text-tertiary)' }}>Issued by</dt>
                <dd style={{ color: 'var(--text-secondary)' }}>{credential.issuer}</dd>
              </div>
            )}
            {credential.provider && (
              <div className="flex gap-2">
                <dt className="w-32 shrink-0" style={{ color: 'var(--text-tertiary)' }}>Completed via</dt>
                <dd style={{ color: 'var(--text-secondary)' }}>{credential.provider}</dd>
              </div>
            )}
            {credential.date && (
              <div className="flex gap-2">
                <dt className="w-32 shrink-0" style={{ color: 'var(--text-tertiary)' }}>Date issued</dt>
                <dd style={{ color: 'var(--text-secondary)' }}>{credential.date}</dd>
              </div>
            )}
            <div className="flex gap-2">
              <dt className="w-32 shrink-0" style={{ color: 'var(--text-tertiary)' }}>Credential type</dt>
              <dd style={{ color: 'var(--text-secondary)' }}>{typeLabels[credential.credentialType]}</dd>
            </div>
            <div className="flex gap-2">
              <dt className="w-32 shrink-0" style={{ color: 'var(--text-tertiary)' }}>Recipient</dt>
              <dd style={{ color: 'var(--text-secondary)' }}>Subhasish Adhikary</dd>
            </div>
          </dl>
          <p className="mt-6 text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            {credential.description}
          </p>
          <div className="mt-6">
            <div className="text-xs font-semibold uppercase tracking-widest" style={{ color: 'var(--text-tertiary)' }}>Skills and capabilities</div>
            <div className="mt-3 flex flex-wrap gap-2">
              {credential.skills.map((skill) => (
                <span key={skill} className="text-xs px-2.5 py-1 rounded-md border" style={{ borderColor: 'var(--border-color)', color: 'var(--text-secondary)' }}>
                  {skill}
                </span>
              ))}
            </div>
          </div>
          {(credential.verificationUrl || credential.linkedinUrl || credential.image) && (
            <div className="mt-8 flex flex-wrap gap-3">
              {credential.verificationUrl && (
                <a
                  href={credential.verificationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-md"
                  style={{ backgroundColor: 'var(--accent)', color: '#fff' }}
                >
                  Verify Credential
                  <ArrowUpRight size={15} />
                </a>
              )}
              {credential.linkedinUrl && (
                <a
                  href={credential.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-md border"
                  style={{ borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}
                >
                  View on LinkedIn
                  <ArrowUpRight size={15} />
                </a>
              )}
              {credential.image && (
                <button
                  onClick={() => onOpenImage(credential)}
                  className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-md"
                  style={{ color: 'var(--accent)' }}
                >
                  View Certificate
                  <ArrowUpRight size={15} />
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------ Certificate lightbox ----------------------------- */

export function CertificateLightbox({ credential, onClose }: { credential: Credential | null; onClose: () => void }) {
  if (!credential || !credential.image) return null;

  return (
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center p-4 sm:p-10"
      role="dialog"
      aria-modal="true"
      aria-label={`${credential.title} certificate`}
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/80" />
      <figure className="relative max-w-5xl max-h-full" onClick={(e) => e.stopPropagation()}>
        <img
          src={credential.image}
          alt={credential.imageAlt || credential.title}
          width={credential.imageWidth}
          height={credential.imageHeight}
          decoding="async"
          className="max-w-full max-h-[85vh] w-auto h-auto rounded-md shadow-lg"
        />
        <figcaption className="mt-3 text-xs text-center" style={{ color: 'rgba(255,255,255,0.75)' }}>
          {credential.title} · {credential.issuer || credential.provider}
        </figcaption>
        <button
          onClick={onClose}
          aria-label="Close certificate view"
          className="absolute -top-3 -right-3 p-2 rounded-full shadow-md"
          style={{ backgroundColor: 'var(--card-bg)', color: 'var(--text-primary)' }}
        >
          <X size={16} />
        </button>
      </figure>
    </div>
  );
}
