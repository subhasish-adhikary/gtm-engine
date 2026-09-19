import { siteConfig } from '../data/content';

const baseUrl = 'https://subhasishadhikary.com';

export function generateWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteConfig.name,
    url: baseUrl,
    description: siteConfig.description,
    publisher: { '@id': PERSON_ID },
    potentialAction: {
      '@type': 'SearchAction',
      target: `${baseUrl}/thinking?q={search_term_string}`,
      'query-input': 'required name=search_term_string'
    }
  };
}

// Canonical Person entity. Referenced everywhere else via @id so the site has
// exactly one Person node regardless of how many schemas mention the author.
const PERSON_ID = `${baseUrl}/#subhasish-adhikary`;

export const DEFAULT_OG_IMAGE = `${baseUrl}/images/og-default.jpg`;
export const DEFAULT_OG_IMAGE_ALT = 'Subhasish Adhikary GTM Systems That Drive Growth';

export function generatePersonSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': PERSON_ID,
    name: siteConfig.name,
    url: `${baseUrl}/about`,
    image: 'https://i.ibb.co/B2spFn8r/Subhasish-Adhikary-Marketer-1.png',
    jobTitle: 'Growth Marketing & GTM Engineer',
    description: siteConfig.professionalSummary,
    worksFor: {
      '@type': 'Organization',
      name: 'LanceSoft'
    },
    alumniOf: {
      '@type': 'CollegeOrUniversity',
      name: 'Manipal Institute of Management, MAHE, Manipal'
    },
    email: `mailto:${siteConfig.email}`,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Hyderabad',
      addressRegion: 'Telangana',
      addressCountry: 'IN'
    },
    sameAs: [
      'https://x.com/crazy_subh',
      'https://www.linkedin.com/in/subhasish-adhikary/',
      'https://about.me/subhasishadhikary',
      'https://www.facebook.com/SubhasishAdhikaryDigital/',
      'https://www.youtube.com/@subhasishadhikary',
      'https://www.instagram.com/silentkiller_me/'
    ],
    knowsAbout: [
      'B2B Go-to-Market Strategy',
      'Growth Marketing',
      'GTM Engineering',
      'Product Marketing',
      'Marketing Automation',
      'AI in Marketing',
      'Demand Generation',
      'Revenue Operations',
      'Marketing Operations',
      'Marketing Economics'
    ],
    hasCredential: [
      { '@type': 'EducationalOccupationalCredential', name: 'Master of Business Administration (MBA), Marketing', credentialCategory: 'degree', recognizedBy: { '@type': 'CollegeOrUniversity', name: 'Manipal Institute of Management, MAHE, Manipal' } },
      { '@type': 'EducationalOccupationalCredential', name: 'Outbound Automation Certification', recognizedBy: { '@type': 'Organization', name: 'Clay' } },
      { '@type': 'EducationalOccupationalCredential', name: 'Product-led Certification', recognizedBy: { '@type': 'Organization', name: 'Pendo' } },
      { '@type': 'EducationalOccupationalCredential', name: 'Salesforce Marketing Cloud Email/Admin/Consultant Training', recognizedBy: { '@type': 'Organization', name: 'Salesforce' } },
      { '@type': 'EducationalOccupationalCredential', name: 'McKinsey.org Forward Program', recognizedBy: { '@type': 'Organization', name: 'McKinsey & Company' } }
    ]
  };
}

export function generateArticleSchema(article: any) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.thesis,
    image: article.featuredImage,
    datePublished: article.publishedDate,
    dateModified: article.updatedDate || article.publishedDate,
    author: { '@id': PERSON_ID, '@type': 'Person', name: article.author },
    publisher: { '@id': PERSON_ID, '@type': 'Person', name: siteConfig.name },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${baseUrl}/thinking/${article.category}/${article.id}`
    },
    keywords: article.atAGlance?.join(', ') || '',
    articleSection: article.category === 'gtm' ? 'B2B Go-to-Market' : 
                    article.category === 'automation' ? 'Marketing Automation' : 
                    'AI Marketing'
  };
}

export function generateBreadcrumbSchema(items: Array<{ label: string; path?: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.label,
      item: item.path ? `${baseUrl}${item.path}` : undefined
    }))
  };
}

export function generateFAQSchema(faqs: Array<{ question: string; answer: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  };
}

export function generateSoftwareApplicationSchema(tool: any) {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: tool.title,
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    description: tool.description,
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD'
    }
  };
}

export function injectStructuredData(schema: any) {
  if (typeof document === 'undefined') return;
  
  const existingScript = document.getElementById('structured-data');
  if (existingScript) {
    existingScript.remove();
  }
  
  const script = document.createElement('script');
  script.id = 'structured-data';
  script.type = 'application/ld+json';
  script.text = JSON.stringify(schema);
  document.head.appendChild(script);
}

export function generateFAQPageSchema(faqs: Array<{ question: string; answer: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  };
}

export function generateEducationSchema(education: {
  institution: string;
  degree: string;
  specialization: string;
  duration: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: `${education.degree}, ${education.specialization}`,
    provider: {
      '@type': 'CollegeOrUniversity',
      name: education.institution
    },
    description: `Master of Business Administration in Marketing completed at ${education.institution} (${education.duration}).`
  };
}

export function generateCredentialCourseSchema(credential: {
  title: string;
  issuer?: string;
  provider?: string;
  description: string;
  image?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: credential.title,
    description: credential.description,
    ...(credential.image ? { image: `${baseUrl}${credential.image}` } : {}),
    provider: {
      '@type': 'Organization',
      name: credential.provider || credential.issuer
    }
  };
}

export function generateDefinedTermSchema(term: any) {
  return {
    '@context': 'https://schema.org',
    '@type': 'DefinedTerm',
    name: term.term,
    description: term.shortDefinition,
    url: `https://subhasishadhikary.com/glossary/${term.slug}`,
    termCode: term.id,
    inDefinedTermSet: {
      '@type': 'DefinedTermSet',
      name: 'Marketing Glossary',
      url: 'https://subhasishadhikary.com/glossary'
    }
  };
}

export function injectMultipleStructuredData(schemas: any[]) {
  if (typeof document === 'undefined') return;
  
  // Remove existing structured data
  const existingScripts = document.querySelectorAll('script[type="application/ld+json"]');
  existingScripts.forEach(s => s.remove());
  
  // Add new schemas
  schemas.forEach((schema, index) => {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(schema);
    document.head.appendChild(script);
  });
}

export interface SocialMetaOptions {
  /** Absolute URL of the social share image. Falls back to the site default. */
  image?: string;
  /** Alt text describing the share image. */
  imageAlt?: string;
  /** Open Graph type: 'website' (default) or 'article'. */
  type?: string;
}

function setMeta(selector: string, attr: 'name' | 'property', key: string, content: string) {
  let meta = document.querySelector(selector) as HTMLMetaElement | null;
  if (!meta) {
    meta = document.createElement('meta');
    meta.setAttribute(attr, key);
    document.head.appendChild(meta);
  }
  meta.setAttribute('content', content);
}

export function updateMetaTags(
  title: string,
  description: string,
  canonical?: string,
  noindex = false,
  options: SocialMetaOptions = {}
) {
  if (typeof document === 'undefined') return;

  // Update title
  document.title = title;

  // Robots directive: noindex only for not-found states; removed otherwise
  // so valid pages stay indexable.
  let metaRobots = document.querySelector('meta[name="robots"]');
  if (noindex) {
    if (!metaRobots) {
      metaRobots = document.createElement('meta');
      metaRobots.setAttribute('name', 'robots');
      document.head.appendChild(metaRobots);
    }
    metaRobots.setAttribute('content', 'noindex');
  } else if (metaRobots) {
    metaRobots.remove();
  }

  // Update meta description
  let metaDesc = document.querySelector('meta[name="description"]');
  if (!metaDesc) {
    metaDesc = document.createElement('meta');
    metaDesc.setAttribute('name', 'description');
    document.head.appendChild(metaDesc);
  }
  metaDesc.setAttribute('content', description);

  // Update canonical
  if (canonical) {
    let linkCanonical = document.querySelector('link[rel="canonical"]');
    if (!linkCanonical) {
      linkCanonical = document.createElement('link');
      linkCanonical.setAttribute('rel', 'canonical');
      document.head.appendChild(linkCanonical);
    }
    linkCanonical.setAttribute('href', canonical);
  }

  // Social share image: page-specific when provided, site-wide default otherwise.
  const ogImage = options.image || DEFAULT_OG_IMAGE;
  const ogImageAlt = options.imageAlt || DEFAULT_OG_IMAGE_ALT;
  const ogType = options.type || 'website';

  // Open Graph
  setMeta('meta[property="og:title"]', 'property', 'og:title', title);
  setMeta('meta[property="og:description"]', 'property', 'og:description', description);
  setMeta('meta[property="og:url"]', 'property', 'og:url', canonical || `${baseUrl}/`);
  setMeta('meta[property="og:type"]', 'property', 'og:type', ogType);
  setMeta('meta[property="og:image"]', 'property', 'og:image', ogImage);
  setMeta('meta[property="og:image:alt"]', 'property', 'og:image:alt', ogImageAlt);
  setMeta('meta[property="og:image:width"]', 'property', 'og:image:width', '1200');
  setMeta('meta[property="og:image:height"]', 'property', 'og:image:height', '630');

  // Twitter/X card
  setMeta('meta[name="twitter:card"]', 'name', 'twitter:card', 'summary_large_image');
  setMeta('meta[name="twitter:title"]', 'name', 'twitter:title', title);
  setMeta('meta[name="twitter:description"]', 'name', 'twitter:description', description);
  setMeta('meta[name="twitter:image"]', 'name', 'twitter:image', ogImage);
  setMeta('meta[name="twitter:image:alt"]', 'name', 'twitter:image:alt', ogImageAlt);
}
