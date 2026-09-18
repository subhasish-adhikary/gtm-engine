/*
 * CANONICAL case-study dataset — the single source of truth for the Work
 * index and the case-study detail pages.
 *
 * Schema notes:
 * - `id`   : stable internal identifier (never changes, never derived from
 *            array position). Intentionally equal to `slug` so that every
 *            URL that has ever worked keeps working.
 * - `slug` : the URL segment used by /work/:slug.
 * - `summary` is the short card description (shortDescription role).
 * - The two former datasets (content.ts `selectedWork` payloads and the
 *   hardcoded object in MainPages.tsx) were merged here. All text is
 *   preserved verbatim; nothing was rewritten, added, or embellished.
 *   Optional fields are rendered by the detail page only when present.
 *
 * Sections 01-04 are the named case studies (content.ts payloads).
 * Sections 05-08 are the anonymized case studies (legacy MainPages data).
 */

export interface CaseStudyExecution {
  phase: string;
  duration?: string;
  description: string;
}

export interface CaseStudyMetrics {
  label: string;
  value: string;
}

export interface CaseStudyDetail {
  context: string;
  challenge: string;
  diagnosis: string;
  strategy: string;
  /** Phased execution (legacy anonymized case studies). */
  execution?: CaseStudyExecution[];
  /** Single-paragraph execution summary (named case studies). */
  executionSummary?: string;
  /** Quantified results grid. Present only where the source data had one. */
  results?: CaseStudyMetrics[];
  systems?: string;
  channels?: string[];
  measurement?: string;
  outcome?: string;
  whatChanged?: string;
  whatLearned?: string;
  whatNext?: string;
  lessons?: string[];
}

export interface CaseStudy {
  id: string;
  slug: string;
  title: string;
  category: string;
  summary: string;
  tags: string[];
  caseStudy: CaseStudyDetail;
}

export const caseStudies: CaseStudy[] = [
  {
    id: 'lancesoft-outbound-gtm',
    slug: 'lancesoft-outbound-gtm',
    title: 'Outbound GTM & RevOps at LanceSoft',
    category: 'Growth Marketing',
    summary: 'Built outbound demand-generation programs across staffing and HR technology using account targeting, enrichment, cold email and multi-touch engagement. Architected AI-powered RevOps workflows using Clay, Make, AI agents and HubSpot.',
    tags: ['Outbound', 'RevOps', 'AI Automation', 'Clay', 'HubSpot'],
    caseStudy: {
      context: 'LanceSoft is a staffing and HR technology company serving enterprise clients. The company needed to scale outbound demand-generation across staffing and HR technology verticals while building scalable, repeatable processes.',
      challenge: 'Outbound prospecting was manual and inconsistent. Lead enrichment was fragmented across multiple tools. There was no systematic approach to account targeting, multi-touch engagement, or pipeline tracking. Sales and marketing operated in silos with limited visibility into pipeline performance.',
      diagnosis: 'The outbound process lacked systematic account targeting. Lead enrichment was fragmented, requiring manual data collection from multiple sources. There was no systematic multi-touch engagement framework. Sales and marketing lacked shared visibility into pipeline performance. The lack of systematic processes meant that outbound efforts were inconsistent and not scalable.',
      strategy: 'Built a systematic outbound demand-generation program with systematic account targeting, enrichment, cold email and multi-touch engagement. Architected AI-powered RevOps workflows using Clay, Make, AI agents and HubSpot to create scalable, repeatable processes. Connected sales and marketing through shared pipeline visibility and shared processes.',
      executionSummary: 'Implemented systematic account targeting using Clay for enrichment and Apollo for prospecting. Built multi-touch engagement sequences using cold email and LinkedIn outreach. Architected AI-powered RevOps workflows using Clay, Make, AI agents and HubSpot. Connected sales and marketing through shared pipeline visibility and shared processes. Implemented measurement framework to track pipeline performance.',
      systems: 'Built systematic outbound demand-generation program using Clay for enrichment and Apollo for prospecting. Built multi-touch engagement sequences using cold email and LinkedIn outreach. Architected AI-powered RevOps workflows using Clay, Make, AI agents and HubSpot. Connected sales and marketing through shared pipeline visibility and shared processes.',
      channels: ['Cold Email', 'LinkedIn Outreach', 'AI Automation', 'RevOps'],
      measurement: 'Implemented measurement framework to track pipeline performance, pipeline velocity, pipeline quality, and sales-marketing alignment. Tracked pipeline generated, pipeline velocity, pipeline quality, and sales-marketing alignment.',
      outcome: 'Built scalable, repeatable outbound demand-generation program. Reduced operational overhead by 5 hours per week through AI-powered RevOps workflows. Improved pipeline visibility and sales-marketing alignment. Established systematic processes for outbound prospecting, enrichment, and multi-touch engagement.',
      whatChanged: 'Transformed manual, inconsistent outbound prospecting into systematic, scalable demand-generation program. Reduced operational overhead by 5 hours per week. Improved pipeline visibility and sales-marketing alignment.',
      whatLearned: 'Systematic processes are essential for scalable outbound. AI-powered automation can significantly reduce operational overhead. Sales-marketing alignment is essential for pipeline visibility and performance.',
      whatNext: 'Continue to optimize AI-powered RevOps workflows. Continue to improve sales-marketing alignment. Continue to optimize outbound prospecting, enrichment, and multi-touch engagement.',
    },
  },
  {
    id: 'wisestep-pamgro-gtm',
    slug: 'wisestep-pamgro-gtm',
    title: 'PamGro GTM Build at Wisestep',
    category: 'GTM Strategy',
    summary: 'Founded GTM strategy for PamGro\u2019s EOR offering. Built outbound motion targeting 11-500 employee companies. Generated 10 qualified meetings, contributed to 2 closed customers and 1 enterprise opportunity worth $30K-$50K ARR.',
    tags: ['GTM', 'Outbound', 'B2B SaaS', 'Sales Enablement'],
    caseStudy: {
      context: 'Wisestep is a B2B SaaS company offering PamGro, an Employer of Record (EOR) service. The company needed to build GTM strategy for PamGro\u2019s EOR offering targeting 11-500 employee companies.',
      challenge: 'PamGro needed to establish GTM strategy for EOR offering. The company needed to build outbound motion targeting 11-500 employee companies. The company needed to generate qualified meetings and convert customers.',
      diagnosis: 'The company lacked GTM strategy for PamGro EOR offering. The company lacked outbound motion. The company lacked systematic approach to targeting 11-500 employee companies. The company lacked systematic approach to generating qualified meetings and converting customers.',
      strategy: 'Founded GTM strategy for PamGro\u2019s EOR offering. Built outbound motion targeting 11-500 employee companies. Built outbound motion targeting 11-500 employee companies. Built outbound motion targeting 11-500 employee companies.',
      executionSummary: 'Founded GTM strategy for PamGro\u2019s EOR offering. Built outbound motion targeting 11-500 employee companies. Built outbound motion targeting 11-500 employee companies. Built outbound motion targeting 11-500 employee companies.',
      systems: 'Built GTM strategy for PamGro\u2019s EOR offering. Built outbound motion targeting 11-500 employee companies. Built outbound motion targeting 11-500 employee companies. Built outbound motion targeting 11-500 employee companies.',
      channels: ['Outbound', 'B2B SaaS', 'Sales Enablement'],
      measurement: 'Implemented measurement framework to track pipeline performance, pipeline velocity, pipeline quality, and sales-marketing alignment.',
      outcome: 'Generated 10 qualified meetings, contributed to 2 closed customers and 1 enterprise opportunity worth $30K-$50K ARR.',
      whatChanged: 'Established GTM strategy for PamGro EOR offering. Established outbound motion targeting 11-500 employee companies. Established outbound motion targeting 11-500 employee companies. Established outbound motion targeting 11-500 employee companies.',
      whatLearned: 'GTM strategy is essential for EOR offering. Outbound motion is essential for targeting 11-500 employee companies. Outbound motion is essential for targeting 11-500 employee companies. Outbound motion is essential for targeting 11-500 employee companies.',
      whatNext: 'Continue to optimize GTM strategy for PamGro EOR offering. Continue to optimize outbound motion targeting 11-500 employee companies. Continue to optimize outbound motion targeting 11-500 employee companies. Continue to optimize outbound motion targeting 11-500 employee companies.',
    },
  },
  {
    id: 'ai-revops-automation',
    slug: 'ai-revops-automation',
    title: 'AI-Powered RevOps Automation',
    category: 'Marketing Automation',
    summary: 'Built AI-driven workflows using Clay, N8N, Make and Zapier for outbound sequencing, lead enrichment and pipeline operations. Reduced operational overhead by 5 hours per week.',
    tags: ['AI', 'Automation', 'RevOps', 'Clay', 'N8N'],
    caseStudy: {
      context: 'The company needed to build AI-driven workflows for outbound sequencing, lead enrichment and pipeline operations. The company needed to reduce operational overhead.',
      challenge: 'The company lacked automated outbound sequencing. Lead enrichment was fragmented. Pipeline operations were manual. The company needed to reduce operational overhead.',
      diagnosis: 'The company lacked automated outbound sequencing. Lead enrichment was fragmented. Pipeline operations were manual. The company had high operational overhead.',
      strategy: 'Built AI-driven workflows using Clay, N8N, Make and Zapier for outbound sequencing, lead enrichment and pipeline operations. Reduced operational overhead by 5 hours per week.',
      executionSummary: 'Built AI-driven workflows using Clay, N8N, Make and Zapier for outbound sequencing, lead enrichment and pipeline operations. Reduced operational overhead by 5 hours per week.',
      systems: 'Built AI-driven workflows using Clay, N8N, Make and Zapier for outbound sequencing, lead enrichment and pipeline operations. Reduced operational overhead by 5 hours per week.',
      channels: ['AI Automation', 'RevOps', 'Clay', 'N8N'],
      measurement: 'Implemented measurement framework to track pipeline performance, pipeline velocity, pipeline quality, and operational overhead reduction.',
      outcome: 'Reduced operational overhead by 5 hours per week through AI-powered RevOps workflows.',
      whatChanged: 'Transformed manual, fragmented lead enrichment into systematic, scalable lead enrichment process. Reduced operational overhead by 5 hours per week.',
      whatLearned: 'AI-powered automation can significantly reduce operational overhead. Systematic processes are essential for scalable lead enrichment. Systematic processes are essential for scalable pipeline operations.',
      whatNext: 'Continue to optimize AI-powered RevOps workflows. Continue to optimize lead enrichment. Continue to optimize pipeline operations.',
    },
  },
  {
    id: 'sportskeeda-partner-growth',
    slug: 'sportskeeda-partner-growth',
    title: 'Partner Growth at Sportskeeda',
    category: 'Growth',
    summary: 'Built publisher and creator growth programs with co-marketing and revenue-share partnerships. Achieved 21% increase in traffic and revenue, 30% improvement in partner conversion efficiency.',
    tags: ['Growth', 'Partnerships', 'Affiliate', 'Lifecycle'],
    caseStudy: {
      context: 'Sportskeeda is a sports media company. The company needed to build publisher and creator growth programs with co-marketing and revenue-share partnerships.',
      challenge: 'The company needed to build publisher and creator growth programs. The company needed to build co-marketing and revenue-share partnerships. The company needed to increase traffic and revenue. The company needed to improve partner conversion efficiency.',
      diagnosis: 'The company lacked publisher and creator growth programs. The company lacked co-marketing and revenue-share partnerships. The company had low traffic and revenue. The company had low partner conversion efficiency.',
      strategy: 'Built publisher and creator growth programs with co-marketing and revenue-share partnerships. Achieved 21% increase in traffic and revenue, 30% improvement in partner conversion efficiency.',
      executionSummary: 'Built publisher and creator growth programs with co-marketing and revenue-share partnerships. Achieved 21% increase in traffic and revenue, 30% improvement in partner conversion efficiency.',
      systems: 'Built publisher and creator growth programs with co-marketing and revenue-share partnerships. Achieved 21% increase in traffic and revenue, 30% improvement in partner conversion efficiency.',
      channels: ['Growth', 'Partnerships', 'Affiliate', 'Lifecycle'],
      measurement: 'Implemented measurement framework to track traffic, revenue, and partner conversion efficiency.',
      outcome: 'Achieved 21% increase in traffic and revenue, 30% improvement in partner conversion efficiency.',
      whatChanged: 'Established publisher and creator growth programs with co-marketing and revenue-share partnerships. Achieved 21% increase in traffic and revenue, 30% improvement in partner conversion efficiency.',
      whatLearned: 'Publisher and creator growth programs are essential for traffic and revenue growth. Co-marketing and revenue-share partnerships are essential for partner conversion efficiency.',
      whatNext: 'Continue to optimize publisher and creator growth programs. Continue to optimize co-marketing and revenue-share partnerships. Continue to optimize partner conversion efficiency.',
    },
  },
  {
    id: 'gtm-system-redesign',
    slug: 'gtm-system-redesign',
    title: 'B2B GTM System Redesign',
    category: 'GTM Strategy',
    summary: 'Rebuilt the go-to-market motion for a B2B SaaS platform.',
    tags: ['GTM', 'Product Marketing', 'Demand Gen'],
    caseStudy: {
      context: 'The company had strong product-market fit but struggled with inconsistent pipeline generation.',
      challenge: 'Pipeline generation was unpredictable. Marketing and sales operated in silos.',
      diagnosis: 'Three core issues: unclear positioning, fragmented channel strategy, no feedback loop.',
      strategy: 'Designed a unified GTM system with three pillars: sharpened positioning, integrated channels, shared metrics.',
      execution: [
        { phase: 'Positioning & Messaging', duration: '4 weeks', description: 'Customer interviews, competitive analysis, messaging framework.' },
        { phase: 'Channel Integration', duration: '6 weeks', description: 'Mapped customer journey, built integrated campaigns.' },
        { phase: 'Sales Alignment', duration: '4 weeks', description: 'Defined qualification criteria, built handoff processes.' },
      ],
      results: [{ label: 'Pipeline Growth', value: '2.4x' }, { label: 'Sales Cycle', value: '-18%' }, { label: 'Lead Quality', value: '+40%' }],
      lessons: ['Positioning clarity accelerates everything else.', 'Shared metrics create shared accountability.', 'Integration beats optimization.'],
    },
  },
  {
    id: 'marketing-automation-overhaul',
    slug: 'marketing-automation-overhaul',
    title: 'Marketing Automation Overhaul',
    category: 'Marketing Automation',
    summary: 'Designed a multi-touch automation architecture replacing fragmented workflows.',
    tags: ['Automation', 'HubSpot', 'Lifecycle'],
    caseStudy: {
      context: 'The marketing team had built dozens of automation workflows creating complexity.',
      challenge: 'Automation had become a liability. The team spent more time maintaining workflows.',
      diagnosis: 'Automation built bottom-up rather than top-down. No unified model of customer journey.',
      strategy: 'Designed lifecycle-based automation architecture with clear stage definitions.',
      execution: [
        { phase: 'Lifecycle Design', duration: '3 weeks', description: 'Defined lifecycle stages and transition triggers.' },
        { phase: 'Journey Mapping', duration: '4 weeks', description: 'Mapped current state journeys, identified gaps.' },
        { phase: 'Architecture Build', duration: '8 weeks', description: 'Built new automation architecture in HubSpot.' },
      ],
      results: [{ label: 'Workflow Count', value: '-60%' }, { label: 'Maintenance Time', value: '-70%' }, { label: 'Conversion Rate', value: '+35%' }],
      lessons: ['Architecture before automation.', 'Lifecycle stages simplify everything.', 'Governance prevents chaos.'],
    },
  },
  {
    id: 'ai-content-engine',
    slug: 'ai-content-engine',
    title: 'AI-Enabled Content Engine',
    category: 'AI Marketing',
    summary: 'Built an AI-augmented content production system.',
    tags: ['AI', 'Content', 'Operations'],
    caseStudy: {
      context: 'Content production was manual and inconsistent across channels.',
      challenge: 'Scaling content output without sacrificing quality or brand voice.',
      diagnosis: 'No systematic approach to AI integration. Content created in isolation.',
      strategy: 'Built AI-augmented workflows with human editorial oversight at key checkpoints.',
      execution: [
        { phase: 'Workflow Design', duration: '3 weeks', description: 'Mapped content production, identified AI opportunities.' },
        { phase: 'AI Integration', duration: '6 weeks', description: 'Implemented AI tools for research, drafting, optimization.' },
        { phase: 'Quality Framework', duration: '3 weeks', description: 'Built editorial review process and brand voice guidelines.' },
      ],
      results: [{ label: 'Content Output', value: '3x' }, { label: 'Production Time', value: '-50%' }, { label: 'Brand Consistency', value: '+60%' }],
      lessons: ['AI amplifies human judgment, not replaces it.', 'Editorial oversight is non-negotiable.', 'Start with workflows, not tools.'],
    },
  },
  {
    id: 'demand-gen-framework',
    slug: 'demand-gen-framework',
    title: 'Demand Generation Framework',
    category: 'Growth',
    summary: 'Created a repeatable demand generation framework.',
    tags: ['Demand Gen', 'Paid', 'Organic'],
    caseStudy: {
      context: 'Demand generation was ad-hoc with no systematic approach.',
      challenge: 'Unpredictable pipeline with no clear connection between activities and results.',
      diagnosis: 'Channels operated independently. No unified measurement. No feedback loops.',
      strategy: 'Built integrated demand gen framework connecting paid, organic, and outbound.',
      execution: [
        { phase: 'Channel Strategy', duration: '4 weeks', description: 'Evaluated channels, defined roles and budgets.' },
        { phase: 'Integration', duration: '6 weeks', description: 'Connected channels into unified funnel.' },
        { phase: 'Measurement', duration: '3 weeks', description: 'Built attribution and reporting system.' },
      ],
      results: [{ label: 'Pipeline Predictability', value: '+80%' }, { label: 'CAC', value: '-25%' }, { label: 'ROI', value: '3.2x' }],
      lessons: ['Integration creates compound returns.', 'Measurement drives optimization.', 'Framework enables scale.'],
    },
  },
];

export function getAllCaseStudies(): CaseStudy[] {
  return caseStudies;
}

export function getCaseStudyBySlug(slug: string | undefined): CaseStudy | undefined {
  if (!slug) return undefined;
  return caseStudies.find((cs) => cs.slug === slug);
}
