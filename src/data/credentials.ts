export interface Education {
  institution: string;
  degree: string;
  specialization: string;
  duration: string;
  description: string;
}

export interface Credential {
  id: string;
  title: string;
  issuer: string;
  credentialType: 'certification' | 'training' | 'simulation';
  date?: string;
  skills: string[];
  description: string;
  verificationUrl?: string;
  category: string[];
}

export const education: Education = {
  institution: 'Manipal Institute of Management, MAHE, Manipal',
  degree: 'Master of Business Administration (MBA)',
  specialization: 'Marketing',
  duration: 'November 2021 – November 2023',
  description: 'My MBA in Marketing provided a formal foundation in marketing strategy, consumer and market analysis, business fundamentals and decision-making, which I have subsequently applied across B2B growth, go-to-market strategy, demand generation, marketing automation and product marketing.'
};

export const featuredCredentials: Credential[] = [
  {
    id: 'mckinsey-forward',
    title: 'McKinsey.org Forward Program',
    issuer: 'McKinsey.org',
    credentialType: 'certification',
    date: 'June 23, 2026',
    skills: ['Problem solving', 'Effective communication', 'Future-ready skills', 'Digital toolkit', 'Adaptability', 'Resilience'],
    description: 'The McKinsey.org Forward Program is an online learning program focused on practical skills for the future of work, including problem-solving, communication, adaptability, resilience and foundational digital capabilities.',
    category: ['Strategy', 'Business Skills']
  },
  {
    id: 'clay-outbound',
    title: 'Outbound Automation Certification',
    issuer: 'Clay',
    credentialType: 'certification',
    skills: ['Outbound automation', 'Lead enrichment', 'Prospecting workflows', 'GTM automation', 'Data enrichment', 'Automated outbound processes'],
    description: 'The credential demonstrates learning and application related to outbound automation using Clay.',
    category: ['GTM', 'Marketing Automation', 'Growth']
  },
  {
    id: 'pendo-product-led',
    title: 'Product-led Certification',
    issuer: 'Pendo.io',
    credentialType: 'certification',
    skills: ['Product-led growth', 'Product experience', 'Product-led strategy', 'User/product engagement'],
    description: 'The credential demonstrates learning and application related to product-led growth and product experience.',
    category: ['Product Marketing', 'Growth']
  },
  {
    id: 'salesforce-marketing-cloud',
    title: 'Salesforce Marketing Cloud Email/Admin/Consultant Training',
    issuer: 'Udemy',
    credentialType: 'training',
    skills: ['Salesforce Marketing Cloud', 'Email marketing', 'Marketing automation', 'CRM-connected marketing', 'Marketing operations'],
    description: 'Professional training in Salesforce Marketing Cloud covering email marketing, marketing automation, CRM-connected marketing and marketing operations.',
    category: ['Marketing Automation', 'Marketing']
  },
  {
    id: 'bcg-strategy-simulation',
    title: 'Introduction to Strategy Consulting Job Simulation',
    issuer: 'Forage',
    credentialType: 'simulation',
    skills: ['Strategy', 'Problem solving', 'Structured thinking', 'Business analysis', 'Consulting-style problem solving'],
    description: 'Job simulation completed through Forage, covering strategy, problem solving, structured thinking, business analysis and consulting-style problem solving.',
    category: ['Strategy', 'Business Skills']
  }
];

export const additionalCredentials: Credential[] = [
  {
    id: 'predictive-pm',
    title: 'Fundamentals of Predictive Project Management',
    issuer: 'Professional Certification',
    credentialType: 'certification',
    skills: ['Predictive project management', 'Project management fundamentals'],
    category: ['Business Skills']
  },
  {
    id: 'email-marketing',
    title: 'Email Marketing',
    issuer: 'Professional Certification',
    credentialType: 'certification',
    skills: ['Email marketing', 'Email marketing strategy'],
    category: ['Marketing Automation', 'Digital Marketing']
  },
  {
    id: 'linkedin-marketing',
    title: 'LinkedIn Marketing Solutions Fundamentals',
    issuer: 'LinkedIn',
    credentialType: 'certification',
    skills: ['LinkedIn marketing', 'LinkedIn advertising', 'Social media marketing'],
    category: ['Digital Marketing', 'Growth']
  },
  {
    id: 'brand-management',
    title: 'Brand Management: Aligning Business, Brand and Behaviour',
    issuer: 'Professional Certification',
    credentialType: 'certification',
    skills: ['Brand management', 'Brand strategy', 'Brand alignment'],
    category: ['Marketing', 'Strategy']
  },
  {
    id: 'digital-advertising',
    title: 'Digital Advertising',
    issuer: 'Professional Certification',
    credentialType: 'certification',
    skills: ['Digital advertising', 'Digital marketing', 'Advertising strategy'],
    category: ['Digital Marketing', 'Growth']
  },
  {
    id: 'seo-uc-davis',
    title: 'Search Engine Optimization (SEO)',
    issuer: 'University of California, Davis',
    credentialType: 'certification',
    skills: ['Search engine optimization', 'SEO strategy', 'SEO fundamentals'],
    category: ['Digital Marketing', 'Growth']
  },
  {
    id: 'meta-advertising',
    title: 'Advertising with Meta',
    issuer: 'Meta',
    credentialType: 'certification',
    skills: ['Meta advertising', 'Facebook advertising', 'Social media advertising'],
    category: ['Digital Marketing', 'Growth']
  },
  {
    id: 'digital-marketing',
    title: 'Digital Marketing',
    issuer: 'Professional Certification',
    credentialType: 'certification',
    skills: ['Digital marketing', 'Digital marketing strategy'],
    category: ['Digital Marketing', 'Growth']
  },
  {
    id: 'sql',
    title: 'The Structured Query Language (SQL)',
    issuer: 'Professional Certification',
    credentialType: 'certification',
    skills: ['SQL', 'Database querying', 'Data analysis'],
    category: ['Analytics', 'Business Skills']
  },
  {
    id: 'google-digital-marketing',
    title: 'Google Digital Marketing and E-commerce Professional Certificate',
    issuer: 'Google',
    credentialType: 'certification',
    skills: ['Digital marketing', 'E-commerce', 'Digital marketing strategy'],
    category: ['Digital Marketing', 'Growth']
  },
  {
    id: 'six-sigma',
    title: 'Six Sigma Principles',
    issuer: 'Professional Certification',
    credentialType: 'certification',
    skills: ['Six Sigma', 'Process improvement', 'Quality management'],
    category: ['Business Skills']
  },
  {
    id: 'google-tag-manager',
    title: 'Google Tag Manager Fundamentals',
    issuer: 'Google',
    credentialType: 'certification',
    skills: ['Google Tag Manager', 'Tag management', 'Analytics implementation'],
    category: ['Analytics', 'Digital Marketing']
  },
  {
    id: 'advanced-google-analytics',
    title: 'Advanced Google Analytics',
    issuer: 'Google',
    credentialType: 'certification',
    skills: ['Google Analytics', 'Advanced analytics', 'Analytics strategy'],
    category: ['Analytics', 'Digital Marketing']
  },
  {
    id: 'digital-marketing-basics',
    title: 'Fundamentals of Digital Marketing',
    issuer: 'Professional Certification',
    credentialType: 'certification',
    skills: ['Digital marketing fundamentals', 'Digital marketing basics'],
    category: ['Digital Marketing', 'Growth']
  },
  {
    id: 'content-marketing',
    title: 'Content Marketing Certification',
    issuer: 'Professional Certification',
    credentialType: 'certification',
    skills: ['Content marketing', 'Content strategy', 'Content strategy'],
    category: ['Marketing', 'Growth']
  },
  {
    id: 'it-certificate',
    title: 'Certificate in IT',
    issuer: 'Professional Certification',
    credentialType: 'certification',
    skills: ['Information technology', 'IT fundamentals'],
    category: ['Business Skills']
  }
];

export const allCredentials = [...featuredCredentials, ...additionalCredentials];

export const credentialCategories = [
  'GTM',
  'Growth',
  'Marketing Automation',
  'Product Marketing',
  'Analytics',
  'Digital Marketing',
  'Strategy',
  'AI / Emerging Technology',
  'Business Skills'
];
