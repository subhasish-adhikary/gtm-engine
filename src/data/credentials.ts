// Credential and education data for the Credentials page.
// Data is kept separate from the UI so new credentials can be added
// without touching the page. Only include information that is known:
// no invented dates, credential IDs, verification URLs or scores.

export interface Education {
  institution: string;
  degree: string;
  specialization: string;
  duration: string;
  description: string;
}

export type CredentialType = 'certification' | 'training' | 'simulation' | 'program';

export interface Credential {
  id: string;
  title: string;
  /** Issuing organization, when known. Omitted when not provided. */
  issuer?: string;
  /** Platform or provider the credential was completed through, when it differs from the issuer. */
  provider?: string;
  credentialType: CredentialType;
  date?: string;
  skills: string[];
  /** Short line shown on list rows. */
  summary: string;
  /** Longer explanation shown in the credential detail view. */
  description: string;
  /** Direct credential verification link. Leave out entirely when unavailable. */
  verificationUrl?: string;
  /** Per-credential LinkedIn link. Leave out entirely when unavailable. */
  linkedinUrl?: string;
  /** Certificate artwork, served from /public/images/certifications/. Omitted when unavailable. */
  image?: string;
  /** Intrinsic pixel dimensions of the artwork, for layout stability. */
  imageWidth?: number;
  imageHeight?: number;
  /** Descriptive alt text for the artwork. */
  imageAlt?: string;
  categories: string[];
}

export const typeLabels: Record<CredentialType, string> = {
  certification: 'Professional Certification',
  training: 'Professional Training',
  simulation: 'Job Simulation',
  program: 'Professional Learning Program',
};

export const education: Education = {
  institution: 'Manipal Institute of Management, MAHE, Manipal',
  degree: 'Master of Business Administration (MBA)',
  specialization: 'Marketing',
  duration: 'Nov 2021 – Nov 2023',
  description: 'My MBA in Marketing provided a formal foundation in marketing strategy, consumer and market analysis, business fundamentals and decision-making. I have since applied that foundation across B2B growth, go-to-market strategy, demand generation, marketing automation and product marketing.',
};

export const featuredCredentials: Credential[] = [
  {
    id: 'mckinsey-forward',
    title: 'McKinsey.org Forward Program',
    issuer: 'McKinsey.org',
    credentialType: 'program',
    date: 'June 23, 2026',
    skills: ['Problem solving', 'Effective communication', 'Future-ready skills', 'Digital toolkit', 'Adaptability', 'Resilience'],
    summary: 'Practical skills for the future of work: problem solving, communication, adaptability, resilience and foundational digital capabilities.',
    description: 'The McKinsey.org Forward Program is an online learning program focused on practical skills for the future of work, including problem-solving, communication, adaptability, resilience and foundational digital capabilities.',
    image: '/images/certifications/mckinsey-forward-program-june-2026.webp',
    imageWidth: 1536,
    imageHeight: 1024,
    imageAlt: 'McKinsey.org Forward Program certification awarded to Subhasish Adhikary in June 2026',
    categories: ['Strategy', 'Business Skills'],
  },
  {
    id: 'clay-outbound',
    title: 'Outbound Automation Certification',
    issuer: 'Clay',
    credentialType: 'certification',
    skills: ['Outbound automation', 'Lead enrichment', 'Prospecting workflows', 'GTM automation', 'Data enrichment', 'Automated outbound processes'],
    summary: 'Outbound automation with Clay: enrichment, prospecting workflows and automated outbound processes.',
    description: 'Covers building outbound automation with Clay, including lead enrichment, prospecting workflows and automated outbound processes that connect data, sequencing and CRM handoffs.',
    image: '/images/certifications/clay-outbound-automation-certification.webp',
    imageWidth: 1380,
    imageHeight: 1140,
    imageAlt: 'Clay Outbound Automation Certification awarded to Subhasish Adhikary',
    categories: ['GTM', 'Marketing Automation'],
  },
  {
    id: 'pendo-product-led',
    title: 'Product-led Certification',
    issuer: 'Pendo.io',
    credentialType: 'certification',
    skills: ['Product-led growth', 'Product experience', 'Product-led strategy', 'User/product engagement'],
    summary: 'Product-led growth, product experience and engagement strategy with Pendo.',
    description: 'Covers product-led growth strategy, product experience and user engagement, and how product usage informs acquisition, expansion and retention motions.',
    image: '/images/certifications/pendo-product-led-certification.webp',
    imageWidth: 1707,
    imageHeight: 797,
    imageAlt: 'Pendo.io Product-led Certification awarded to Subhasish Adhikary',
    categories: ['Product Marketing', 'Growth'],
  },
  {
    id: 'salesforce-marketing-cloud',
    title: 'Salesforce Marketing Cloud Email/Admin/Consultant Training',
    provider: 'Udemy',
    credentialType: 'training',
    date: 'May 27, 2025',
    verificationUrl: 'https://ude.my/UC-c593d94f-df38-45f4-a5e5-bdf84fcbfb09',
    skills: ['Salesforce Marketing Cloud', 'Email marketing', 'Marketing automation', 'CRM-connected marketing', 'Marketing operations'],
    summary: 'Professional training in Salesforce Marketing Cloud across email, administration and consulting practice.',
    description: 'Professional training in Salesforce Marketing Cloud covering email marketing, account administration and consulting practice, including campaign setup, journeys and CRM-connected marketing operations.',
    image: '/images/certifications/salesforce-marketing-cloud-email-admin-consultant-training.webp',
    imageWidth: 1137,
    imageHeight: 842,
    imageAlt: 'Salesforce Marketing Cloud Email, Admin and Consultant training certificate completed by Subhasish Adhikary',
    categories: ['Marketing Automation'],
  },
  {
    id: 'bcg-strategy-simulation',
    title: 'Introduction to Strategy Consulting Job Simulation',
    issuer: 'BCG',
    provider: 'Forage',
    credentialType: 'simulation',
    skills: ['Strategy', 'Problem solving', 'Structured thinking', 'Business analysis', 'Consulting-style problem solving'],
    summary: 'A strategy consulting job simulation completed through Forage, covering structured problem solving and business analysis.',
    description: 'A job simulation completed through Forage. The work mirrors a strategy consulting engagement: structuring an ambiguous business problem, analysing information and building a recommendation.',
    image: '/images/certifications/bcg-strategy-consulting-job-simulation.webp',
    imageWidth: 1047,
    imageHeight: 698,
    imageAlt: 'BCG Introduction to Strategy Consulting job simulation certificate completed by Subhasish Adhikary through Forage',
    categories: ['Strategy'],
  },
];

export const additionalCredentials: Credential[] = [
  {
    id: 'predictive-pm',
    title: 'Fundamentals of Predictive Project Management',
    credentialType: 'certification',
    skills: ['Predictive project management', 'Project management fundamentals'],
    summary: 'Planning, scoping and executing projects using predictive project management methods.',
    description: 'Covers predictive project management fundamentals: planning, scoping, scheduling and executing projects against defined requirements.',
    categories: ['Business Skills'],
  },
  {
    id: 'email-marketing',
    title: 'Email Marketing',
    credentialType: 'certification',
    skills: ['Email marketing', 'Email strategy', 'Lifecycle messaging'],
    summary: 'Email program strategy, list management and lifecycle messaging.',
    description: 'Covers email marketing fundamentals: program strategy, list management, campaign design and lifecycle messaging.',
    categories: ['Digital Marketing', 'Marketing Automation'],
  },
  {
    id: 'linkedin-marketing',
    title: 'LinkedIn Marketing Solutions Fundamentals',
    issuer: 'LinkedIn',
    credentialType: 'certification',
    skills: ['LinkedIn marketing', 'LinkedIn advertising', 'B2B audience targeting'],
    summary: 'LinkedIn campaign structure, audience targeting and B2B advertising fundamentals.',
    description: 'Covers LinkedIn Marketing Solutions fundamentals: campaign structure, audience targeting and advertising formats for B2B marketing.',
    categories: ['Digital Marketing'],
  },
  {
    id: 'brand-management',
    title: 'Brand Management: Aligning Business, Brand and Behaviour',
    credentialType: 'certification',
    skills: ['Brand management', 'Brand strategy', 'Brand alignment'],
    summary: 'Aligning brand identity, business strategy and organizational behaviour.',
    description: 'Covers how brand strategy connects to business strategy and organizational behaviour, and how positioning stays consistent across touchpoints.',
    categories: ['Strategy', 'Product Marketing'],
  },
  {
    id: 'digital-advertising',
    title: 'Digital Advertising',
    credentialType: 'certification',
    skills: ['Digital advertising', 'Paid media', 'Advertising strategy'],
    summary: 'Paid digital advertising across search, display and social formats.',
    description: 'Covers digital advertising fundamentals: paid formats, targeting, bidding and measuring advertising performance.',
    categories: ['Digital Marketing'],
  },
  {
    id: 'seo-uc-davis',
    title: 'Search Engine Optimization (SEO)',
    issuer: 'University of California, Davis',
    credentialType: 'certification',
    skills: ['Search engine optimization', 'SEO strategy', 'Keyword research', 'On-page optimization'],
    summary: 'SEO strategy, keyword research and on-page optimization, from UC Davis.',
    description: 'Covers search engine optimization: how search works, keyword research, on-page optimization and content decisions that affect organic visibility.',
    categories: ['Digital Marketing'],
  },
  {
    id: 'meta-advertising',
    title: 'Advertising with Meta',
    issuer: 'Meta',
    credentialType: 'certification',
    skills: ['Meta advertising', 'Facebook advertising', 'Social media advertising'],
    summary: 'Advertising across Meta platforms: campaign setup, targeting and measurement.',
    description: 'Covers advertising with Meta: campaign setup, audience targeting, creative formats and performance measurement across Meta platforms.',
    categories: ['Digital Marketing'],
  },
  {
    id: 'digital-marketing',
    title: 'Digital Marketing',
    credentialType: 'certification',
    skills: ['Digital marketing', 'Digital marketing strategy'],
    summary: 'Broad digital marketing strategy across channels.',
    description: 'Covers digital marketing strategy across channels: acquisition, conversion and measurement fundamentals.',
    categories: ['Digital Marketing'],
  },
  {
    id: 'sql',
    title: 'The Structured Query Language (SQL)',
    credentialType: 'certification',
    skills: ['SQL', 'Database querying', 'Data analysis'],
    summary: 'Querying relational databases for reporting and analysis.',
    description: 'Covers structured query language: writing queries against relational databases for reporting and analysis.',
    categories: ['Analytics'],
  },
  {
    id: 'google-digital-marketing',
    title: 'Google Digital Marketing and E-commerce Professional Certificate',
    issuer: 'Google',
    credentialType: 'certification',
    skills: ['Digital marketing', 'E-commerce', 'Marketing analytics', 'Customer outreach'],
    summary: 'Google\'s professional certificate covering digital marketing and e-commerce fundamentals.',
    description: 'A professional certificate covering digital marketing and e-commerce: channel strategy, store operations, customer outreach and performance measurement.',
    categories: ['Digital Marketing'],
  },
  {
    id: 'six-sigma',
    title: 'Six Sigma Principles',
    credentialType: 'certification',
    skills: ['Six Sigma', 'Process improvement', 'Quality management'],
    summary: 'Process improvement and quality management using Six Sigma methods.',
    description: 'Covers Six Sigma principles: process improvement, variation reduction and quality management methods.',
    categories: ['Business Skills'],
  },
  {
    id: 'google-tag-manager',
    title: 'Google Tag Manager Fundamentals',
    issuer: 'Google',
    credentialType: 'certification',
    skills: ['Google Tag Manager', 'Tag management', 'Analytics implementation'],
    summary: 'Tag management and analytics implementation with Google Tag Manager.',
    description: 'Covers Google Tag Manager fundamentals: tags, triggers and variables, and how tracking is implemented and managed on a site.',
    categories: ['Analytics'],
  },
  {
    id: 'advanced-google-analytics',
    title: 'Advanced Google Analytics',
    issuer: 'Google',
    credentialType: 'certification',
    skills: ['Google Analytics', 'Advanced analytics', 'Segmentation', 'Conversion tracking'],
    summary: 'Advanced Google Analytics: segmentation, conversion tracking and reporting.',
    description: 'Covers advanced Google Analytics use: data collection, segmentation, conversion tracking and reporting for deeper analysis.',
    categories: ['Analytics'],
  },
  {
    id: 'fundamentals-digital-marketing',
    title: 'Fundamentals of Digital Marketing',
    credentialType: 'certification',
    skills: ['Digital marketing fundamentals', 'Online strategy', 'Analytics basics'],
    summary: 'Core digital marketing concepts across search, social, email and analytics.',
    description: 'Covers core digital marketing concepts: search, social, email and analytics, and how channels fit into an overall online strategy.',
    categories: ['Digital Marketing'],
  },
  {
    id: 'content-marketing',
    title: 'Content Marketing Certification',
    credentialType: 'certification',
    skills: ['Content marketing', 'Content strategy', 'Editorial planning'],
    summary: 'Content strategy, editorial planning and measuring content performance.',
    description: 'Covers content marketing: strategy, editorial planning, production and measuring how content performs against business goals.',
    categories: ['Digital Marketing'],
  },
  {
    id: 'digital-marketing-basics',
    title: 'Digital Marketing Basics',
    credentialType: 'certification',
    skills: ['Digital marketing basics', 'Online channels'],
    summary: 'Introductory coverage of digital marketing channels and tactics.',
    description: 'An introductory credential covering digital marketing basics: channels, tactics and how online marketing fits together.',
    categories: ['Digital Marketing'],
  },
  {
    id: 'it-certificate',
    title: 'Certificate in IT',
    credentialType: 'certification',
    skills: ['Information technology', 'IT fundamentals'],
    summary: 'Foundational information technology concepts.',
    description: 'A foundational certificate covering information technology concepts and fundamentals.',
    categories: ['Business Skills'],
  },
];

export const allCredentials = [...featuredCredentials, ...additionalCredentials];

export function getCredentialById(id: string): Credential | undefined {
  return allCredentials.find((c) => c.id === id);
}

// Only categories that actually have credentials attached. Filters on the
// page are built from this list, so empty filters can never appear.
export const credentialFilters = [
  'Digital Marketing',
  'Marketing Automation',
  'Analytics',
  'Strategy',
  'Business Skills',
  'Product Marketing',
  'GTM',
  'Growth',
];

export interface TimelineEntry {
  year: string;
  label: string;
  description: string;
  /** Credential ids (or 'education') to reveal for this year. */
  items: string[];
}

export const learningTimeline: TimelineEntry[] = [
  {
    year: '2021',
    label: 'MBA begins',
    description: 'Started the MBA in Marketing at Manipal Institute of Management, MAHE, while working in marketing roles.',
    items: ['education'],
  },
  {
    year: '2023',
    label: 'MBA completed',
    description: 'Completed the MBA in Marketing. The formal foundation in strategy, market analysis and decision-making carried directly into subsequent GTM and growth work.',
    items: ['education'],
  },
  {
    year: '2025',
    label: 'Professional certifications and specialized learning',
    description: 'Completed professional certifications and training across outbound automation, marketing automation and product-led growth, alongside earlier digital marketing and analytics credentials.',
    items: ['clay-outbound', 'salesforce-marketing-cloud', 'pendo-product-led'],
  },
  {
    year: '2026',
    label: 'McKinsey.org Forward Program and continued specialization',
    description: 'Completed the McKinsey.org Forward Program and continued GTM and automation specialization across outbound systems, RevOps workflows and AI-enabled marketing.',
    items: ['mckinsey-forward'],
  },
];
