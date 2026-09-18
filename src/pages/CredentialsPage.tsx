import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '../components/UI';
import {
  EducationSection,
  FeaturedCredentialsSection,
  LearningTimelineSection,
  CredentialArchiveSection,
  CredentialDetailModal,
  CertificateLightbox,
} from '../components/CredentialUI';
import type { Credential } from '../data/credentials';

export default function CredentialsPage() {
  const [selected, setSelected] = useState<Credential | null>(null);
  const [certificate, setCertificate] = useState<Credential | null>(null);

  // One orchestrator for both overlays: Escape closes the lightbox first,
  // then the modal. Scroll stays locked while either is open.
  useEffect(() => {
    if (!selected && !certificate) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      if (certificate) setCertificate(null);
      else if (selected) setSelected(null);
    };
    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [selected, certificate]);

  return (
    <div>
      {/* HERO */}
      <section className="py-16 sm:py-20 lg:py-24 border-b" style={{ borderColor: 'var(--border-color)' }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav aria-label="Breadcrumb" className="text-xs mb-8" style={{ color: 'var(--text-tertiary)' }}>
            <Link to="/" className="hover:underline">Home</Link>
            <span className="mx-2">/</span>
            <span>Education and Credentials</span>
          </nav>
          <div className="animate-fade-in-up">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-8" style={{ backgroundColor: 'var(--accent)' }} />
              <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: 'var(--accent)' }}>
                Education · Certifications · Continuous Learning
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight leading-[1.1] max-w-3xl" style={{ color: 'var(--text-primary)' }}>
              Education, credentials and the systems behind the work.
            </h1>
            <p className="mt-6 text-lg leading-relaxed max-w-2xl" style={{ color: 'var(--text-secondary)' }}>
              An MBA in Marketing, followed by continuous learning across growth, GTM, marketing automation, product-led growth, analytics and digital marketing.
            </p>
          </div>
        </div>
      </section>

      <EducationSection />
      <FeaturedCredentialsSection onOpen={setSelected} onOpenImage={setCertificate} />
      <LearningTimelineSection onOpen={setSelected} />
      <CredentialArchiveSection onOpen={setSelected} />

      {/* PROFESSIONAL CONTEXT + CTA */}
      <section className="py-16 sm:py-20 border-t" style={{ borderColor: 'var(--border-color)' }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-12 gap-10">
            <div className="md:col-span-7">
              <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight" style={{ color: 'var(--text-primary)' }}>
                From digital marketing foundations to GTM systems
              </h2>
              <p className="mt-5 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                Every credential on this page maps to a problem I was working on at the time. The early digital marketing, SEO and analytics work built the measurement and content foundations. The automation and outbound certifications came from building enrichment and outreach systems. Product-led growth and strategy programs sharpened how I position offerings and structure go-to-market decisions.
              </p>
              <p className="mt-4 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                Together they support the work I do now across growth marketing, B2B go-to-market, demand generation, marketing automation, product marketing, marketing operations and AI-enabled marketing systems.
              </p>
            </div>
            <div className="md:col-span-5 flex flex-col justify-center gap-3">
              <Button to="/work" size="lg">View Work <ArrowRight size={16} className="ml-2" /></Button>
              <Button to="/contact" variant="secondary" size="lg">Work With Me</Button>
            </div>
          </div>
        </div>
      </section>

      <CredentialDetailModal
        credential={selected}
        onClose={() => setSelected(null)}
        onOpenImage={setCertificate}
      />
      <CertificateLightbox credential={certificate} onClose={() => setCertificate(null)} />
    </div>
  );
}
