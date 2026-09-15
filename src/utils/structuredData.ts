import { siteConfig } from '../data/content';

const baseUrl = 'https://subhasishadhikary.com';

export function generateWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteConfig.name,
    url: baseUrl,
    description: siteConfig.description,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${baseUrl}/#/thinking?q={search_term_string}`,
      'query-input': 'required name=search_term_string'
    }
  };
}

export function generatePersonSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: siteConfig.name,
    url: baseUrl,
    jobTitle: 'Growth Marketing & B2B GTM Strategist',
    worksFor: {
      '@type': 'Organization',
      name: 'Independent'
    },
    sameAs: [
      siteConfig.linkedin
    ],
    knowsAbout: [
      'B2B Go-to-Market Strategy',
      'Growth Marketing',
      'Product Marketing',
      'Marketing Automation',
      'AI in Marketing',
      'Demand Generation',
      'Marketing Operations',
      'Marketing Economics'
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
    author: {
      '@type': 'Person',
      name: article.author,
      url: `${baseUrl}/#/about`,
      description: article.authorBio
    },
    publisher: {
      '@type': 'Person',
      name: siteConfig.name,
      url: baseUrl
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${baseUrl}/#/thinking/${article.category}/${article.id}`
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

export function generateDefinedTermSchema(term: any) {
  return {
    '@context': 'https://schema.org',
    '@type': 'DefinedTerm',
    name: term.term,
    description: term.shortDefinition,
    url: `https://subhasishadhikary.com/#/glossary/${term.slug}`,
    termCode: term.id,
    inDefinedTermSet: {
      '@type': 'DefinedTermSet',
      name: 'Marketing Glossary',
      url: 'https://subhasishadhikary.com/#/glossary'
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

export function updateMetaTags(title: string, description: string, canonical?: string) {
  if (typeof document === 'undefined') return;
  
  // Update title
  document.title = title;
  
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
  
  // Update Open Graph
  const ogTitle = document.querySelector('meta[property="og:title"]');
  if (ogTitle) ogTitle.setAttribute('content', title);
  
  const ogDesc = document.querySelector('meta[property="og:description"]');
  if (ogDesc) ogDesc.setAttribute('content', description);
  
  const ogUrl = document.querySelector('meta[property="og:url"]');
  if (ogUrl && canonical) ogUrl.setAttribute('content', canonical);
}
