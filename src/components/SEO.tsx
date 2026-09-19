import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { allArticles } from '../data/articles';
import { tools } from '../data/content';
import { glossaryTerms, getTermBySlug } from '../data/glossary';
import {
  generateWebSiteSchema,
  generatePersonSchema,
  generateArticleSchema,
  generateBreadcrumbSchema,
  generateSoftwareApplicationSchema,
  generateFAQPageSchema,
  generateDefinedTermSchema,
  generateEducationSchema,
  generateCredentialCourseSchema,
  injectMultipleStructuredData,
  updateMetaTags
} from '../utils/structuredData';
import { education, featuredCredentials } from '../data/credentials';
import { getCaseStudyBySlug } from '../data/caseStudies';

const baseUrl = 'https://subhasishadhikary.com';

const routeMetadata: Record<string, { title: string; description: string }> = {
  '/': {
    title: 'Subhasish Adhikary — Growth Marketing, B2B GTM & Marketing Intelligence',
    description: 'Strategic marketer building growth systems where GTM strategy, product marketing, automation and AI meet. 15 research-led articles, interactive strategy tools, and 79+ B2B marketing tool stacks.'
  },
  '/about': {
    title: 'About — Subhasish Adhikary',
    description: 'Strategic marketer specializing in B2B go-to-market, product marketing, demand generation, and marketing automation. Building growth systems that connect strategy to execution.'
  },
  '/work': {
    title: 'Work — Subhasish Adhikary',
    description: 'Strategic narratives of B2B GTM transformations. Case studies covering go-to-market redesign, marketing automation overhaul, and AI-enabled growth systems.'
  },
  '/thinking': {
    title: 'Thinking — Research-led Marketing Intelligence | Subhasish Adhikary',
    description: '15 deeply researched articles on B2B GTM strategy, marketing automation, and AI in marketing. Original analysis, frameworks, and practical implementation guidance.'
  },
  '/thinking/gtm': {
    title: 'B2B GTM Strategy — Articles & Frameworks | Subhasish Adhikary',
    description: 'Research on signal-based GTM, post-MQL strategy, GTM efficiency, hybrid channel motions, and AI-assisted buying. Original frameworks and practical guidance.'
  },
  '/thinking/automation': {
    title: 'Marketing Automation — Articles & Frameworks | Subhasish Adhikary',
    description: 'Research on agentic marketing, AI marketing operating systems, AI lead scoring, lifecycle personalization, and automation strategy.'
  },
  '/thinking/ai-marketing': {
    title: 'AI in Marketing — Articles & Frameworks | Subhasish Adhikary',
    description: 'Research on AI search and GEO, AI content and expertise, marketing agents, AI-native advertising, and AI marketing ROI measurement.'
  },
  '/tools': {
    title: 'Interactive Marketing Tools — Strategy Toolkits | Subhasish Adhikary',
    description: 'Decision-focused marketing tools: GTM Budget Lab, Channel Planner, GTM Diagnostic, Stack Builder, Automation Planner, Ad Copy Analyzer, and more.'
  },
  '/tools/gtm-intelligence': {
    title: 'GTM Intelligence Engine — Interactive GTM Strategy Tool | Subhasish Adhikary',
    description: 'Answer 8 questions about your B2B business and get a data-driven GTM strategy: readiness score, recommended channel portfolio, budget allocation scenarios, and a 90-day plan.'
  },
  '/gtm-stack': {
    title: '79+ B2B Marketing Tool Stacks — Curated by Category | Subhasish Adhikary',
    description: '79+ curated B2B marketing technology stacks organized by company stage, budget, and GTM motion. Each stack includes rationale, trade-offs, and alternatives.'
  },
  '/glossary': {
    title: 'Marketing Glossary — 150+ Modern Marketing Terms | Subhasish Adhikary',
    description: 'Comprehensive marketing glossary covering 150+ modern marketing concepts including GTM, Growth, Demand Generation, Marketing Automation, AI Marketing, AEO, GEO, SEO, and more.'
  },
  '/credentials': {
    title: 'Education & Credentials — Subhasish Adhikary',
    description: 'MBA in Marketing (Manipal Institute of Management, MAHE) plus professional certifications and continuous learning across GTM, growth, marketing automation, product-led growth, analytics and AI-enabled marketing.'
  },
  '/contact': {
    title: 'Contact — Subhasish Adhikary',
    description: 'Get in touch about B2B GTM strategy, marketing automation, or AI in marketing. Available for strategic conversations and consulting engagements.'
  },
  '/privacy': {
    title: 'Privacy Policy — Subhasish Adhikary',
    description: 'Privacy policy for subhasishadhikary.com. How this website handles visitor data.'
  }
};

export function SEO() {
  const location = useLocation();
  const path = location.pathname;

  useEffect(() => {
    const schemas: any[] = [generateWebSiteSchema(), generatePersonSchema()];
    
    // Check for article route
    const articleMatch = path.match(/^\/thinking\/([^/]+)\/([^/]+)$/);
    if (articleMatch) {
      const [, category, articleId] = articleMatch;
      const article = allArticles.find(a => a.id === articleId);
      if (article) {
        schemas.push(generateArticleSchema(article));
        schemas.push(generateBreadcrumbSchema([
          { label: 'Home', path: '/' },
          { label: 'Thinking', path: '/thinking' },
          { label: article.category === 'gtm' ? 'B2B GTM' : article.category === 'automation' ? 'Marketing Automation' : 'AI Marketing', path: `/thinking/${article.category}` },
          { label: article.title }
        ]));
        if (article.faq && article.faq.length > 0) {
          schemas.push(generateFAQPageSchema(article.faq));
        }
          updateMetaTags(
            `${article.title} | Subhasish Adhikary`,
            article.thesis,
            `${baseUrl}/thinking/${category}/${articleId}`,
            false,
            {
              // Articles with a reachable absolute featured image use it for
              // the share card; local paths without a deployed file fall back
              // to the site-wide default.
              image: article.featuredImage && article.featuredImage.startsWith('http')
                ? article.featuredImage
                : undefined,
              imageAlt: article.featuredImageAlt,
              type: 'article'
            }
          );
      } else {
        // Unknown article: self-canonicalize and noindex rather than
        // inheriting the homepage canonical.
        updateMetaTags('Article Not Found | Subhasish Adhikary', 'The article you are looking for does not exist.', `${baseUrl}${path}`, true);
      }
    } else {
      // Check for tool route (gtm-intelligence has its own page component and
      // is handled by the standard-page branch below)
      const toolMatch = path.match(/^\/tools\/([^/]+)$/);
      const toolId = toolMatch && toolMatch[1] !== 'gtm-intelligence' ? toolMatch[1] : null;
      if (toolId) {
        const tool = tools.find(t => t.id === toolId);
        if (tool) {
          schemas.push(generateSoftwareApplicationSchema(tool));
          schemas.push(generateBreadcrumbSchema([
            { label: 'Home', path: '/' },
            { label: 'Tools', path: '/tools' },
            { label: tool.title }
          ]));
          updateMetaTags(
            `${tool.title} — Interactive Marketing Tool | Subhasish Adhikary`,
            tool.description,
            `${baseUrl}/tools/${toolId}`
          );
        } else {
          updateMetaTags('Tool Not Found | Subhasish Adhikary', 'The tool you are looking for does not exist.', `${baseUrl}${path}`, true);
        }
      } else {
        // Check for glossary term route
        const glossaryMatch = path.match(/^\/glossary\/([^/]+)$/);
        if (glossaryMatch) {
          const [, slug] = glossaryMatch;
          const term = getTermBySlug(slug);
          if (term) {
            schemas.push(generateDefinedTermSchema(term));
            schemas.push(generateBreadcrumbSchema([
              { label: 'Home', path: '/' },
              { label: 'Glossary', path: '/glossary' },
              { label: term.term }
            ]));
          updateMetaTags(
            `${term.term} — Marketing Glossary | Subhasish Adhikary`,
            term.shortDefinition,
            `${baseUrl}/glossary/${slug}`
          );
          } else {
            updateMetaTags('Term Not Found | Subhasish Adhikary', 'The glossary term you are looking for does not exist.', `${baseUrl}${path}`, true);
          }
        } else {
          // Case-study route: /work/:slug
          const caseStudyMatch = path.match(/^\/work\/([^/]+)$/);
          const caseStudy = caseStudyMatch ? getCaseStudyBySlug(caseStudyMatch[1]) : undefined;
          if (caseStudy) {
            schemas.push(generateBreadcrumbSchema([
              { label: 'Home', path: '/' },
              { label: 'Work', path: '/work' },
              { label: caseStudy.title }
            ]));
            updateMetaTags(
              `${caseStudy.title} — Case Study | Subhasish Adhikary`,
              caseStudy.summary,
              `${baseUrl}/work/${caseStudy.slug}`
            );
          } else {
            // Standard page route. Known paths get their own metadata; unknown
            // paths (404) self-canonicalize with noindex instead of inheriting
            // the homepage identity.
            const metadata = routeMetadata[path];
            if (metadata) {
              updateMetaTags(metadata.title, metadata.description, `${baseUrl}${path === '/' ? '/' : path}`);
            } else {
              updateMetaTags('Page Not Found | Subhasish Adhikary', 'The page you are looking for does not exist.', `${baseUrl}${path}`, true);
            }
          }
          
          // Add breadcrumb for non-home pages
          if (path !== '/') {
            const label = path.replace(/^\//, '').split('/').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(' ');
            schemas.push(generateBreadcrumbSchema([
              { label: 'Home', path: '/' },
              { label }
            ]));
          }

          // Credentials page: education and featured credential course schemas
          if (path === '/credentials') {
            schemas.push(generateEducationSchema(education));
            featuredCredentials.forEach((credential) => {
              schemas.push(generateCredentialCourseSchema(credential));
            });
          }
        }
      }
    }
    
    injectMultipleStructuredData(schemas);
  }, [path]);

  return null;
}
