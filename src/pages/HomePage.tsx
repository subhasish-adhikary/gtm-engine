import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, TrendingUp, Package, Target, Zap, Brain, BarChart3 } from 'lucide-react';
import { siteConfig, capabilities, selectedWork, thinkingCategories, tools } from '../data/content';
import { Button, SectionHeader, Card, Tag } from '../components/UI';
import { GTMSystemVisualization } from '../components/GTMSystemVisualization';
import { NewsletterSignup } from '../components/NewsletterSignup';
import { newsletterPlacements } from '../data/newsletter';

const iconMap: any = { 'trending-up': <TrendingUp size={20} />, 'package': <Package size={20} />, 'target': <Target size={20} />, 'zap': <Zap size={20} />, 'brain': <Brain size={20} />, 'bar-chart': <BarChart3 size={20} /> };

/* ── FEATURED WORK — editorial four-column composition (intro + 3 project columns).
   The three projects reuse existing case-study slugs from the canonical dataset in
   ../data/caseStudies (GTM Intelligence Engine, Marketing Automation Overhaul,
   AI Content Engine) so "View project" links route to the real detail pages.
   Images are derived from existing site assets (/images/articles/*.webp), cropped
   to one identical 4:3 editorial frame each. */
const featuredWorkItems = [
  {
    slug: 'gtm-system-redesign',
    image: '/images/work/gtm-intelligence.jpg',
    alt: 'GTM Intelligence — market-signal to go-to-market visual',
    category: 'GTM & Strategy',
    title: 'GTM Intelligence',
    description: 'Turning market signals into go-to-market opportunities.',
  },
  {
    slug: 'marketing-automation-overhaul',
    image: '/images/work/automation-systems.jpg',
    alt: 'Automation Systems — marketing automation workflow visual',
    category: 'Marketing Automation',
    title: 'Automation Systems',
    description: 'Systems that scale demand and save time.',
  },
  {
    slug: 'ai-content-engine',
    image: '/images/work/content-engines.jpg',
    alt: 'Content Engines — content and SEO compounding asset visual',
    category: 'Content & SEO',
    title: 'Content Engines',
    description: 'Turning expertise into a compounding asset.',
  },
];

export function HomePage() {
  const [hoveredCapability, setHoveredCapability] = useState<number | null>(null);
  const [hoveredCareer, setHoveredCareer] = useState<number | null>(null);

  return (
    <div>
      {/* HERO SECTION — editorial masthead (light theme). Proportions matched to the
          approved mockup: full-bleed container (page padding = 5.7% per side), three
          columns at ~41% / 35% / 17% with ~3.5% gutters, headline ~60px on desktop. */}
      <section className="pt-14 pb-0 sm:pt-20 lg:pt-[4.5rem]" style={{ backgroundColor: '#F7F6F2' }}>
        <div className="mx-auto w-full px-[6.5vw] lg:px-[5.7vw]">
          {/* MOBILE / TABLET STACK (< lg) — same content, original vertical flow */}
          <div className="lg:hidden">
            <div className="flex items-center gap-3">
              <div className="h-px w-6 shrink-0" style={{ backgroundColor: 'var(--accent)' }} />
              <span className="text-[11px] font-medium uppercase tracking-[0.18em]" style={{ color: '#4A4A4A' }}>
                Growth Marketing · GTM Strategy · Marketing Automation
              </span>
            </div>
            <h1 className="mt-7 font-serif leading-[1.08] tracking-[-0.01em]" style={{ color: '#111111' }}>
              <span className="block text-[2.4rem] sm:text-[3.25rem]">I build the systems</span>
              <span className="block text-[2.4rem] sm:text-[3.25rem]">behind modern</span>
              <span className="block whitespace-normal sm:whitespace-nowrap text-[2.4rem] sm:text-[3.25rem]">B2B&nbsp;<em className="italic" style={{ color: 'var(--accent)' }}>growth.</em></span>
            </h1>
            <p className="mt-8 max-w-md text-[15px] leading-relaxed" style={{ color: '#555555' }}>
              Growth marketing and GTM systems for B2B companies. I work across demand generation, marketing automation, outbound, ABM and AI-enabled RevOps — connecting strategy to pipeline through data, automation and technology.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link
                to="/work"
                className="hero-cta hero-cta-primary group inline-flex items-center gap-2 px-6 py-3 text-[13px] font-semibold uppercase tracking-[0.08em]"
              >
                View selected work
                <span className="hero-cta-arrow inline-block transition-transform duration-200 group-hover:translate-x-1"><ArrowRight size={15} /></span>
              </Link>
              <Link
                to="/thinking"
                className="hero-cta hero-cta-secondary group inline-flex items-center gap-2 px-6 py-3 text-[13px] font-semibold uppercase tracking-[0.08em]"
              >
                Read the thinking
                <span className="hero-cta-arrow inline-block transition-transform duration-200 group-hover:translate-x-1"><ArrowRight size={14} /></span>
              </Link>
            </div>
            <figure className="mt-12 w-[260px] max-w-full sm:w-[300px]">
              <div className="overflow-hidden" style={{ border: '1px solid var(--border-color)', backgroundColor: '#F6E7DA' }}>
                <img
                  src="https://i.ibb.co/B2spFn8r/Subhasish-Adhikary-Marketer-1.png"
                  alt="Subhasish Adhikary - Growth Marketing & GTM Strategist"
                  className="w-full aspect-[4/5] object-cover object-top"
                  style={{ mixBlendMode: 'multiply', filter: 'grayscale(1) contrast(1.08)' }}
                  loading="eager"
                />
              </div>
              <figcaption className="pt-3 text-[10px] uppercase tracking-[0.16em]" style={{ color: '#3d3d3d' }}>
                <div>Subhasish Adhikary</div>
                <div className="mt-1">Kolkata · Est. 2017</div>
              </figcaption>
            </figure>
            <div className="mt-10">
              <p className="font-handwriting text-2xl leading-snug sm:text-3xl" style={{ color: 'var(--accent)' }}>
                Marketing<br />
                systems for<br />
                a more open future.
              </p>
              <svg aria-hidden="true" viewBox="0 0 120 8" preserveAspectRatio="none" className="-mt-1 ml-1 h-[7px] w-[11rem]" style={{ transform: 'rotate(-1deg)' }}>
                <path d="M2 5.2 C 24 2.6, 52 3.4, 74 4.0 S 106 5.6, 118 3.2" fill="none" stroke="var(--accent)" strokeWidth="2.6" strokeLinecap="round" opacity="0.9" />
              </svg>
              <ul className="mt-10 space-y-2 pl-5 text-[11px] font-semibold uppercase tracking-[0.22em]" style={{ borderLeft: '1px solid color-mix(in srgb, var(--accent) 35%, transparent)', color: '#3d3d3d' }}>
                <li>Strategy</li>
                <li>Automation</li>
                <li>Content</li>
                <li>Growth</li>
                <li>Real impact.</li>
              </ul>
              <span aria-hidden="true" className="mt-10 block h-px w-14" style={{ backgroundColor: 'color-mix(in srgb, var(--accent) 80%, transparent)' }} />
              <p className="mt-4 text-xs leading-relaxed" style={{ color: '#555555' }}>
                Based in Kolkata, India.<br />
                Working with global teams<br />
                across time zones.
              </p>
            </div>
          </div>

          {/* DESKTOP (≥ lg): wide three-column grid measured from the approved mockup —
              columns ≈ 41% / 35% / 17% with ~3.5% gutters, spanning nearly the full
              viewport width (container padding matches the header's page padding).
              LEFT = headline/description/buttons · CENTER = large portrait · RIGHT = editorial rail */}
          <div className="hidden lg:block">
            <div className="flex items-start justify-between gap-[3.5vw]">
              <div className="w-[41%] min-w-0 shrink-0">
              {/* Eyebrow — short blue rule + discipline line (no "01" marker in the mockup) */}
              <div className="flex items-center gap-3">
                <div className="h-px w-6 shrink-0" style={{ backgroundColor: 'var(--accent)' }} />
                <span className="text-[11px] font-medium uppercase tracking-[0.18em]" style={{ color: '#4A4A4A' }}>
                  Growth Marketing · GTM Strategy · Marketing Automation
                </span>
              </div>

              <h1 className="mt-7 font-serif leading-[1.08] tracking-[-0.01em]" style={{ color: '#111111' }}>
                <span className="block text-[3.4rem] xl:text-[3.75rem]">I build the systems</span>
                <span className="block text-[3.4rem] xl:text-[3.75rem]">behind modern</span>
                {/* "B2B growth." pinned to one line — the 41% headline column fits it at every desktop size */}
                <span className="block whitespace-nowrap text-[3.4rem] xl:text-[3.75rem]">B2B&nbsp;<em className="italic" style={{ color: 'var(--accent)' }}>growth.</em></span>
              </h1>
              <p className="mt-8 max-w-md text-[15px] leading-relaxed" style={{ color: '#555555' }}>
                Growth marketing and GTM systems for B2B companies. I work across demand generation, marketing automation, outbound, ABM and AI-enabled RevOps — connecting strategy to pipeline through data, automation and technology.
              </p>
              <div className="mt-10 flex flex-wrap items-center gap-4">
                <Link
                  to="/work"
                  className="hero-cta hero-cta-primary group inline-flex items-center gap-2 px-6 py-3 text-[13px] font-semibold uppercase tracking-[0.08em]"
                >
                  View selected work
                  <span className="hero-cta-arrow inline-block transition-transform duration-200 group-hover:translate-x-1"><ArrowRight size={15} /></span>
                </Link>
                <Link
                  to="/thinking"
                  className="hero-cta hero-cta-secondary group inline-flex items-center gap-2 px-6 py-3 text-[13px] font-semibold uppercase tracking-[0.08em]"
                >
                  Read the thinking
                  <span className="hero-cta-arrow inline-block transition-transform duration-200 group-hover:translate-x-1"><ArrowRight size={14} /></span>
                </Link>
              </div>
            </div>

              {/* CENTER COLUMN — the portrait is a genuine major column (~35% of the
                  full-bleed grid, ≈ 4.6:6 aspect like the mockup) */}
              <figure className="shrink-0 w-[35%]">
                <div className="overflow-hidden" style={{ border: '1px solid var(--border-color)', backgroundColor: '#F6E7DA' }}>
                  <img
                    src="https://i.ibb.co/B2spFn8r/Subhasish-Adhikary-Marketer-1.png"
                    alt="Subhasish Adhikary - Growth Marketing & GTM Strategist"
                    className="w-full aspect-[46/60] object-cover object-top"
                    style={{ mixBlendMode: 'multiply', filter: 'grayscale(1) contrast(1.08)' }}
                    loading="eager"
                  />
                </div>

                {/* Image caption / metadata row — directly beneath the portrait */}
                <figcaption className="pt-3 text-[10px] uppercase tracking-[0.16em]" style={{ color: '#3d3d3d' }}>
                  <div>Subhasish Adhikary</div>
                  <div className="mt-1">Kolkata · Est. 2017</div>
                </figcaption>
              </figure>

              {/* RIGHT COLUMN — handwritten statement + strategy list + location note,
                  vertically beside the portrait (never below it on desktop). ~17% wide,
                  matching the mockup's narrow editorial rail. */}
              <div className="w-[17%] min-w-0 shrink-0 pt-1">
                <div>
                  <p className="font-handwriting text-[1.9rem] leading-snug" style={{ color: 'var(--accent)' }}>
                    Marketing<br />
                    systems for<br />
                    a more open future.
                  </p>
                  {/* Blue handwritten underline — slightly tilted brush-stroke feel */}
                  <svg aria-hidden="true" viewBox="0 0 120 8" preserveAspectRatio="none" className="-mt-1 ml-1 h-[7px] w-[7.5rem]" style={{ transform: 'rotate(-1deg)' }}>
                    <path d="M2 5.2 C 24 2.6, 52 3.4, 74 4.0 S 106 5.6, 118 3.2" fill="none" stroke="var(--accent)" strokeWidth="2.6" strokeLinecap="round" opacity="0.9" />
                  </svg>
                </div>

                {/* Editorial list — thin BLUE rule to the LEFT of the list (mockup),
                    compact spacing so the block ends mid-portrait like the reference */}
                <ul className="mt-10 space-y-1 pl-4 text-[11px] font-semibold uppercase tracking-[0.22em]" style={{ borderLeft: '1px solid color-mix(in srgb, var(--accent) 45%, transparent)', color: '#3d3d3d' }}>
                  <li>Strategy</li>
                  <li>Automation</li>
                  <li>Content</li>
                  <li>Growth</li>
                  <li>Real impact.</li>
                </ul>

                {/* Short horizontal blue line */}
                <span aria-hidden="true" className="mt-10 block h-px w-10" style={{ backgroundColor: 'color-mix(in srgb, var(--accent) 80%, transparent)' }} />

                {/* Based-in note */}
                <p className="mt-4 text-xs leading-relaxed" style={{ color: '#555555' }}>
                  Based in Kolkata, India.<br />
                  Working with global teams<br />
                  across time zones.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* METRICS + POSITIONING — compact editorial strip directly below the hero.
          Mockup proportions: full-bleed, top+bottom hairline borders, 5 equal cells
          separated by thin vertical dividers (4 metrics + positioning quote). */}
      <section className="metrics-positioning border-y" style={{ borderColor: 'var(--border-color)', backgroundColor: '#F7F6F2' }}>
        <div className="mx-auto w-full grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 px-[6.5vw] lg:px-[5.7vw]">
          {[
            { value: '7+', label: 'Years in marketing' },
            { value: 'B2B', label: 'My focus' },
            { value: 'Systems', label: 'My approach' },
            { value: 'Impact', label: 'The goal' },
          ].map((metric) => (
            <div key={metric.label} className="py-8 pr-6 lg:border-r lg:last:border-r-0" style={{ borderColor: 'var(--border-color)' }}>
              <div className="font-handwriting text-4xl leading-none sm:text-5xl" style={{ color: 'var(--accent)' }}>
                {metric.value}
              </div>
              <div className="mt-2 text-[10px] font-medium uppercase tracking-[0.18em]" style={{ color: '#6b6b6b' }}>
                {metric.label}
              </div>
            </div>
          ))}

          {/* Positioning statement — handwritten blue, same voice as the hero's
              "Marketing systems for a more open future." line, with the
              handwritten brush-stroke underline from the mockup */}
          <div className="col-span-2 sm:col-span-3 lg:col-span-1 py-8 pl-0 lg:pl-6">
            <p className="font-handwriting text-2xl leading-snug sm:text-3xl lg:text-[1.9rem]">
              A more thoughtful,<br />
              systems-driven approach to marketing.
            </p>
            <svg aria-hidden="true" viewBox="0 0 120 8" preserveAspectRatio="none" className="-mt-0.5 ml-1 h-[7px] w-[11rem] sm:w-[14rem]" style={{ transform: 'rotate(-1deg)' }}>
              <path d="M2 5.2 C 24 2.6, 52 3.4, 74 4.0 S 106 5.6, 118 3.2" fill="none" stroke="var(--accent)" strokeWidth="2.6" strokeLinecap="round" opacity="0.9" />
            </svg>
          </div>
        </div>
      </section>

      {/* FEATURED WORK — single horizontal four-column editorial composition on desktop:
          [ INTRO ~22% ][ PROJECT 1 ][ PROJECT 2 ][ PROJECT 3 ] (three equal columns,
          controlled gutters). Same container padding as the hero/metrics bands so the
          section aligns with the page's editorial grid. Tablet: intro spans the first
          row, projects flow in two columns; mobile: everything stacks. No cards, no
          radii, no shadows — images share one identical 4:3 frame and all content rows
          are baseline-aligned across the three columns via subgrid. */}
      <section className="featured-work py-16 sm:py-20 lg:py-24" style={{ backgroundColor: '#F7F6F2' }}>
        {/* ONE shared parent grid for the whole composition — same main content
            container system used by the hero and metrics bands above (full width +
            the site's standard responsive page padding), so the section's left/right
            boundaries match the rest of the homepage exactly. The intro and the three
            project columns are direct children of this single grid — nothing is
            positioned independently. Desktop: [intro ~22%][3 equal project cols] with
            controlled, consistent gutters. Tablet: intro spans the full first row,
            projects flow in a 2-up grid. Mobile: everything stacks in order. */}
        <div className="mx-auto w-full px-[6.5vw] lg:px-[5.7vw]">
          <div className="grid grid-cols-1 gap-x-[clamp(1.5rem,2.6vw,2.5rem)] gap-y-12 md:grid-cols-2 md:[&>section]:col-span-2 lg:grid-cols-[minmax(0,22fr)_repeat(3,minmax(0,26fr))] lg:gap-y-0 lg:[&>section]:col-span-1">

            {/* LEFT — editorial intro column (~22% of the section on desktop). Fixed
                vertical rhythm: eyebrow → heading → blue divider → description → link. */}
            <section aria-labelledby="featured-work-heading" className="min-w-0">
              <div className="flex items-center gap-3">
                <span aria-hidden="true" className="h-px w-8 shrink-0" style={{ backgroundColor: 'var(--accent)' }} />
                <span id="featured-work-heading" className="text-[11px] font-medium uppercase tracking-[0.22em]" style={{ color: '#4A4A4A' }}>
                  Featured Work
                </span>
              </div>

              <h2 className="mt-8 font-serif text-[2.6rem] leading-[1.06] tracking-[-0.01em] sm:text-[3rem]" style={{ color: '#111111' }}>
                <span className="block">Turning</span>
                <span className="block">ideas into</span>
                <span className="block">growth.</span>
              </h2>

              <span aria-hidden="true" className="mt-9 block h-px w-10" style={{ backgroundColor: 'var(--accent)' }} />

              <p className="mt-5 max-w-xs text-[15px] leading-relaxed" style={{ color: '#555555' }}>
                A few projects where I've worked on growth, demand generation, marketing automation and GTM.
              </p>

              <Link
                to="/work"
                className="group mt-8 inline-flex items-center gap-1.5 text-[13px] font-semibold uppercase tracking-[0.08em] underline underline-offset-4"
                style={{ color: '#111111', textDecorationColor: 'color-mix(in srgb, #111111 40%, transparent)' }}
              >
                View all projects
                <ArrowRight size={14} className="transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
            </section>

            {/* PROJECT COLUMNS — three equal-width editorial columns inside the same
                parent grid. Each card is itself a 5-row sub-grid (image / category /
                title / description / link) whose rows are aligned across all three
                cards via `subgrid`, so every category label, title, description and
                "View project" link sits on exactly the same horizontal baseline no
                matter how long an individual title or description is. Image frames are
                pinned to the tallest image in the row, so the content below starts at
                the same y in all three columns. */}
            {featuredWorkItems.map((project, i) => (
              <article
                key={project.slug}
                className="grid min-w-0 grid-cols-subgrid grid-rows-[auto_auto_auto_1fr_auto] items-start justify-items-start lg:col-span-1 lg:col-start-auto"
                style={{ gridTemplateColumns: 'subgrid', gridRow: 'span 1' }}
              >
                <Link
                  to={`/work/${project.slug}`}
                  aria-label={`${project.title} — view project`}
                  className="row-start-1 col-span-full flex h-full w-full flex-col justify-start"
                >
                  {/* Source assets are 1200×900 (4:3) editorial graphics whose inner
                      headline runs edge-to-edge — a cover crop clipped letters at both
                      side edges ("...EKETING"). The frame matches the asset's native 4:3
                      ratio exactly and renders with object-contain, so the complete
                      composition is always visible with zero letterboxing and identical
                      dimensions for all three images. */}
                  <img
                    src={project.image}
                    alt={project.alt}
                    loading={i === 0 ? 'eager' : 'lazy'}
                    className="w-full grow basis-0 object-contain"
                    style={{ backgroundColor: '#F7F6F2' }}
                  />
                </Link>
                <span className="row-start-2 col-span-full mt-5 block text-[10px] font-medium uppercase tracking-[0.2em]" style={{ color: '#6b6b6b' }}>
                  {project.category}
                </span>
                <h3 className="row-start-3 col-span-full mt-2 font-serif text-[1.65rem] leading-[1.12] tracking-[-0.01em] xl:text-[1.8rem]" style={{ color: '#111111' }}>
                  {project.title}
                </h3>
                <p className="row-start-4 col-span-full mt-3 text-[14px] leading-relaxed" style={{ color: '#555555' }}>
                  {project.description}
                </p>
                <Link
                  to={`/work/${project.slug}`}
                  className="group row-start-5 col-span-full mt-5 inline-flex items-center gap-1.5 self-start text-[12px] font-semibold uppercase tracking-[0.08em] underline underline-offset-4"
                  style={{ color: '#111111', textDecorationColor: 'color-mix(in srgb, #111111 40%, transparent)' }}
                >
                  View project
                  <ArrowRight size={13} className="transition-transform duration-200 group-hover:translate-x-1" />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* LATEST THINKING — three-column editorial composition (intro | article list | featured image).
          Shares the site's main content container (same padding system as hero / Featured Work) and the
          established section-label treatment (blue hairline + uppercase letter-spaced eyebrow). */}
      <section aria-labelledby="latest-thinking-heading" className="py-16 sm:py-20 lg:py-24 border-t" style={{ borderColor: 'var(--border-color)', backgroundColor: '#F7F6F2' }}>
        <div className="mx-auto w-full px-[6.5vw] lg:px-[5.7vw]">
          <div className="grid grid-cols-1 gap-x-[clamp(1.5rem,2.6vw,2.5rem)] gap-y-12 md:grid-cols-2 lg:grid-cols-[minmax(0,22fr)_repeat(2,minmax(0,26fr))] lg:gap-y-0">

            {/* COLUMN 1 — editorial intro */}
            <div className="min-w-0">
              <div className="flex items-center gap-3">
                <div className="h-px w-6 shrink-0" style={{ backgroundColor: 'var(--accent)' }} />
                <span className="text-[11px] font-medium uppercase tracking-[0.18em]" style={{ color: '#4A4A4A' }}>
                  Latest Thinking
                </span>
              </div>
              <h2 id="latest-thinking-heading" className="mt-8 font-serif text-[2.6rem] leading-[1.06] tracking-[-0.01em] sm:text-[3rem]" style={{ color: '#111111' }}>
                Ideas for a
                <br />
                more intelligent
                <br />
                GTM.
              </h2>
              <div className="mt-7 h-px w-10" style={{ backgroundColor: 'var(--accent)' }} />
              <p className="mt-7 max-w-[34ch] text-[15px] leading-[1.7]" style={{ color: '#4A4A4A' }}>
                In-depth articles on growth, AI, automation
                <br className="hidden sm:block" />
                {' '}and the future of marketing.
              </p>
              <Link
                to="/thinking"
                className="group mt-9 inline-flex items-center gap-1.5 text-[12px] font-semibold uppercase tracking-[0.08em] underline underline-offset-4"
                style={{ color: '#111111', textDecorationColor: 'color-mix(in srgb, #111111 40%, transparent)' }}
              >
                View all articles
                <ArrowRight size={13} className="transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
            </div>

            {/* COLUMN 2 — article list (DATE | TITLE | ARROW), thin dividers, whole row clickable */}
            <div className="min-w-0 self-start">
              <ul className="list-none m-0 p-0">
                {[
                  { date: 'Sep 12, 2026', title: 'AI-assisted buying is changing the funnel' },
                  { date: 'Aug 28, 2026', title: 'Why MQLs are losing their relevance' },
                  { date: 'Aug 14, 2026', title: 'Building an AI-native marketing OS' },
                  { date: 'Jul 30, 2026', title: 'Signal-based GTM: a better way to grow' },
                  { date: 'Jul 18, 2026', title: 'The new playbook for marketing efficiency' },
                ].map((post, i) => (
                  <li key={post.title}>
                    <Link
                      to="/thinking"
                      className="group grid grid-cols-[auto_1fr_auto] items-baseline gap-x-5 py-5"
                      style={{ borderTop: i === 0 ? 'none' : '1px solid var(--border-color)' }}
                    >
                      <time className="shrink-0 text-[12px] tabular-nums" style={{ color: '#8A8A8A' }}>{post.date}</time>
                      <span className="font-serif text-[1.15rem] leading-snug transition-transform duration-200 group-hover:translate-x-1" style={{ color: '#111111' }}>
                        {post.title}
                      </span>
                      <ArrowRight size={15} className="translate-y-[3px] shrink-0 transition-transform duration-200 group-hover:translate-x-1.5" style={{ color: '#4A4A4A' }} />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* COLUMN 3 — single large featured editorial image. Asset is 4:3 with all embedded
                typography inset from the edges; object-contain in a matching 4/3 frame renders it
                complete (no crop, no letterbox), top-aligned with the article list. */}
            <a
              href="/images/thinking/ai-gtm-thinking.jpg"
              className="block min-w-0 self-start"
              aria-label="Featured article — Ideas for a more intelligent GTM"
            >
              <div className="aspect-[4/3] w-full flex" style={{ backgroundColor: '#F7F6F2' }}>
                <img
                  src="/images/thinking/ai-gtm-thinking.jpg"
                  alt="Editorial artwork: Ideas for a more intelligent GTM — latest thinking on growth and AI"
                  className="m-0 h-full w-full object-contain"
                  loading="lazy"
                />
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* TOOLS I USE (AND RECOMMEND) — editorial left intro + right tool showcase on the same
          main content container/grid. Notion is intentionally not part of this stack; Clay
          replaces it (same position/hierarchy). Logos are simple inline brand marks. */}
      <section aria-labelledby="tools-heading" className="py-16 sm:py-20 lg:py-24 border-t" style={{ borderColor: 'var(--border-color)', backgroundColor: '#F7F6F2' }}>
        <div className="mx-auto w-full px-[6.5vw] lg:px-[5.7vw]">
          <div className="grid grid-cols-1 gap-x-[clamp(1.5rem,2.6vw,2.5rem)] gap-y-12 md:grid-cols-2 lg:grid-cols-[minmax(0,22fr)_repeat(2,minmax(0,26fr))] lg:gap-y-0">

            {/* LEFT — eyebrow, serif heading, description, text-link CTA */}
            <div className="min-w-0">
              <div className="flex items-center gap-3">
                <div className="h-px w-6 shrink-0" style={{ backgroundColor: 'var(--accent)' }} />
                <span className="text-[11px] font-medium uppercase tracking-[0.18em]" style={{ color: '#4A4A4A' }}>
                  Tools I Use (and Recommend)
                </span>
              </div>
              <h2 id="tools-heading" className="mt-8 font-serif text-[2.1rem] leading-[1.12] tracking-[-0.01em] sm:text-[2.4rem]" style={{ color: '#111111' }}>
                A curated stack for strategy,
                <br className="hidden sm:block" /> content, automation and more.
              </h2>
              <div className="mt-7 h-px w-10" style={{ backgroundColor: 'var(--accent)' }} />
              <Link
                to="/gtm-stack"
                className="group mt-9 inline-flex items-center gap-1.5 text-[12px] font-semibold uppercase tracking-[0.08em] underline underline-offset-4"
                style={{ color: '#111111', textDecorationColor: 'color-mix(in srgb, #111111 40%, transparent)' }}
              >
                Explore my stack
                <ArrowRight size={13} className="transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
            </div>

            {/* RIGHT — tool showcase grid (spans columns 2–3 on desktop), wrapping cleanly at every width */}
            <div className="min-w-0 md:col-span-2 lg:col-span-2">
              <ul className="grid grid-cols-2 gap-x-[clamp(1.5rem,2.6vw,2.5rem)] gap-y-0 p-0 m-0 list-none sm:grid-cols-3 lg:grid-cols-4">
                {[
                  { name: 'Sanity', category: 'Content & CMS', mark: (
                    <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><path d="M12 2l10 10-10 10L2 12 12 2z" fill="#FF8A00" /></svg>
                  )},
                  { name: 'HubSpot', category: 'CRM & Automation', mark: (
                    <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><circle cx="12" cy="12" r="9" fill="none" stroke="#FF7A59" strokeWidth="2.4" /><circle cx="12" cy="12" r="3" fill="#FF7A59" /></svg>
                  )},
                  { name: 'Vercel', category: 'Build & Deploy', mark: (
                    <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><path d="M12 3l10 17H2L12 3z" fill="#111111" /></svg>
                  )},
                  { name: 'OpenAI', category: 'AI & Research', mark: (
                    <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><path d="M12 2c1.8 2.2 2.6 4.4 2.6 6.6L12 12l-2.6-3.4C9.4 6.4 10.2 4.2 12 2zm10 16.6c-2.2 1.2-4.4 1.5-6.4.9L12 12l5.2-1.5c1.9-.6 3.4 0 4.8 1.5zM2 18.6c1.4-1.5 2.9-2.1 4.8-1.5L12 12 9.4 19.5c-2 .6-4.2.3-6.4-.9zm4.4 3.1c1.9.6 3.8.3 5.2-.9L12 18l2 2.8c1.4 1.2 3.3 1.5 5.2.9l-3.6 1.6c-1.9.6-4 .3-5.6-.9-1.6 1.2-3.7 1.5-5.6.9V21.7z" fill="#10A37F" /></svg>
                  )},
                  { name: 'Google Analytics', category: 'Analytics', mark: (
                    <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><rect x="4" y="12" width="4" height="9" rx="1" fill="#F9AB00" /><rect x="10.5" y="7" width="4" height="14" rx="1" fill="#E37400" /><rect x="17" y="3" width="4" height="18" rx="1" fill="#F9AB00" /></svg>
                  )},
                  { name: 'Clay', category: 'Data & Automation', mark: (
                    <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5" fill="#0B0B0B" /><path d="M14.6 9.2c-.7-.9-1.7-1.4-2.8-1.4-2 0-3.6 1.7-3.6 4s1.6 4 3.6 4c1.1 0 2.1-.5 2.8-1.4" fill="none" stroke="#F5C9A6" strokeWidth="2" strokeLinecap="round" /></svg>
                  )},
                  { name: 'Notion', category: 'Design', mark: (
                    <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="3" fill="#FFFFFF" stroke="#111111" strokeWidth="1.6" /><path d="M8 6.6l8 1.3v9.5c0 .6-.4 1-1 1l-4.6-.4c-.4 0-.6-.2-.7-.5L6.6 7.6c-.1-.5.2-1.1.7-1 .2 0 .5.1 .7 .0z" fill="#111111" opacity="0.001" /><path d="M8.1 6.5l7.9 1.2v9.6c0 .7-.5 1.2-1.2 1.1l-4.5-.4c-.5 0-.8-.3-.9-.7L6.9 7.5c-.1-.6.4-1.1 1.2-1zM9.4 8.6v7.1l4.9.4c.3 0 .4-.1.4-.3V9.1c0-.2-.1-.3-.4-.4l-4.9-.1z" fill="#111111" /><path d="M10.3 10.6v4.9c0 .2.1.3.3.3h.6c.2 0 .3-.1.3-.3v-4.9c0-.2-.1-.3-.3-.3h-.6c-.2 0-.3.1-.3.3zm2.2.2v4.7c0 .2.1.3.3.3h.6c.2 0 .3-.1.3-.3v-4.7c0-.2-.1-.3-.3-.3h-.6c-.2 0-.3.1-.3.3z" fill="#FFFFFF" /></svg>
                  )},
                ].map((tool) => (
                  <li key={tool.name} className="border-t py-5" style={{ borderColor: 'var(--border-color)' }}>
                    <div className="flex items-center gap-3">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center" aria-hidden="true">{tool.mark}</span>
                      <span className="text-[15px] font-semibold leading-tight" style={{ color: '#111111' }}>{tool.name}</span>
                    </div>
                    <div className="mt-2 pl-12 text-[12px] uppercase tracking-[0.08em]" style={{ color: '#8A8A8A' }}>
                      {tool.category}
                    </div>
                  </li>
                ))}
              </ul>
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
