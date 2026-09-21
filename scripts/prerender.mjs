import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createJiti } from 'jiti';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distDir = path.resolve(__dirname, '../dist');
const templatePath = path.join(distDir, 'index.html');
const BASE = 'https://subhasishadhikary.com';

if (!fs.existsSync(templatePath)) {
  console.error('dist/index.html not found. Run "vite build" first.');
  process.exit(1);
}

const template = fs.readFileSync(templatePath, 'utf8');
const jiti = createJiti(import.meta.url);

// Schema generators live in the app's central structured-data system so the
// static HTML and the client-side SEO component emit the same entities. The
// canonical Person (with stable @id) ships once via the index.html template
// on every page, including the homepage.
const {
  generateBreadcrumbSchema,
  generateFAQPageSchema,
  generateSoftwareApplicationSchema,
  generateArticleSchema,
  DEFAULT_OG_IMAGE
} = await jiti.import('../src/utils/structuredData.ts');

function escapeHtml(str = '') {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

const generatedRoutes = new Set(['/']);

function writePage(route, html) {
  const cleanRoute = route.replace(/^\/+|\/+$/g, '');
  if (cleanRoute === '') {
    fs.writeFileSync(path.join(distDir, 'index.html'), html, 'utf8');
    return;
  }

  // Write dist/route.html only. With "cleanUrls": true + "trailingSlash": false
  // in vercel.json, this is the single unambiguous file Vercel should resolve
  // /route to. Also emitting dist/route/index.html for the same route created
  // two physical files for one clean URL, which is very likely why Vercel's
  // static routing fell back to the SPA shell instead of serving this file.
  const targetDir = path.dirname(path.join(distDir, `${cleanRoute}.html`));
  fs.mkdirSync(targetDir, { recursive: true });
  fs.writeFileSync(path.join(distDir, `${cleanRoute}.html`), html, 'utf8');
}

function generateHtml({
  route, title, description, canonical, h1, bodyHtml,
  schemas = [],           // array of JSON-LD objects (Person/WebSite come from the template)
  crumbs = [],            // visible breadcrumb: [{ label, path? }]
  image, imageAlt,        // per-page social image; defaults stay from the template
  ogType,                 // 'article' for article pages
  noindex = false
}) {
  let html = template;

  html = html.replace(/<title>.*?<\/title>/s, `<title>${escapeHtml(title)}</title>`);
  html = html.replace(
    /<meta name="description" content=".*?"\s*\/?>/s,
    `<meta name="description" content="${escapeHtml(description)}" />`
  );
  html = html.replace(
    /<link rel="canonical" href=".*?"\s*\/?>/s,
    `<link rel="canonical" href="${canonical}" />`
  );
  html = html.replace(
    /<meta property="og:title" content=".*?"\s*\/?>/s,
    `<meta property="og:title" content="${escapeHtml(title)}" />`
  );
  html = html.replace(
    /<meta property="og:description" content=".*?"\s*\/?>/s,
    `<meta property="og:description" content="${escapeHtml(description)}" />`
  );
  html = html.replace(
    /<meta property="og:url" content=".*?"\s*\/?>/s,
    `<meta property="og:url" content="${canonical}" />`
  );
  html = html.replace(
    /<meta name="twitter:title" content=".*?"\s*\/?>/s,
    `<meta name="twitter:title" content="${escapeHtml(title)}" />`
  );
  html = html.replace(
    /<meta name="twitter:description" content=".*?"\s*\/?>/s,
    `<meta name="twitter:description" content="${escapeHtml(description)}" />`
  );

  if (image) {
    html = html.replace(
      /<meta property="og:image" content=".*?"\s*\/?>/s,
      `<meta property="og:image" content="${image}" />`
    );
    html = html.replace(
      /<meta name="twitter:image" content=".*?"\s*\/?>/s,
      `<meta name="twitter:image" content="${image}" />`
    );
    if (imageAlt) {
      html = html.replace(
        /<meta property="og:image:alt" content=".*?"\s*\/?>/s,
        `<meta property="og:image:alt" content="${escapeHtml(imageAlt)}" />`
      );
    }
  }
  if (ogType) {
    html = html.replace(
      /<meta property="og:type" content=".*?"\s*\/?>/s,
      `<meta property="og:type" content="${ogType}" />`
    );
  }
  if (noindex) {
    html = html.replace(
      /<title>/,
      `<meta name="robots" content="noindex" />\n    <title>`
    );
  }

  if (schemas.length) {
    const schemaTags = schemas
      .map(s => `<script type="application/ld+json">\n${JSON.stringify(s, null, 2)}\n</script>`)
      .join('\n    ');
    html = html.replace('</head>', `    ${schemaTags}\n  </head>`);
  }

  const crumbNav = ['<a href="/" style="color: #155EEF; text-decoration: none;">Home</a>']
    .concat(crumbs.map(c => c.path
      ? `<a href="${c.path}" style="color: #155EEF; text-decoration: none;">${escapeHtml(c.label)}</a>`
      : escapeHtml(c.label)))
    .join(' / ');

  const renderedContent = `
    <div id="root">
      <main class="prerendered-content" style="max-width: 900px; margin: 40px auto; padding: 0 20px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.7; color: #17191C;">
        <nav style="margin-bottom: 24px; font-size: 14px; color: #62676D;">${crumbNav}</nav>
        <h1 style="font-size: 38px; font-weight: 700; margin-bottom: 16px; color: #17191C;">${escapeHtml(h1 || title)}</h1>
        <p style="font-size: 18px; line-height: 1.6; color: #62676D; margin-bottom: 28px;">${escapeHtml(description)}</p>
        <article style="line-height: 1.8; color: #17191C;">
          ${bodyHtml}
        </article>
      </main>
    </div>
  `;

  html = html.replace(/<div id="root">[\s\S]*?<\/div>/, renderedContent);
  writePage(route, html);
  generatedRoutes.add(route === '404' ? route : route.replace(/\/$/, '') || '/');
}

function linkList(items, { ordered = false } = {}) {
  const tag = ordered ? 'ol' : 'ul';
  return `<${tag} style="padding-left: 20px; margin: 8px 0 0;">${items.join('')}</${tag}>`;
}

function relatedSection(heading, itemsHtml) {
  if (!itemsHtml) return '';
  return `
    <section style="margin-top: 36px; padding-top: 20px; border-top: 1px solid #E1E3E5;">
      <h2 style="font-size: 20px; font-weight: 600; color: #17191C;">${escapeHtml(heading)}</h2>
      ${itemsHtml}
    </section>
  `;
}

function acronymOf(termName) {
  const m = String(termName).match(/\(([A-Z]{2,6})\)/);
  return m ? m[1] : null;
}

function textMentionsTerm(haystack, term) {
  const h = haystack.toLowerCase();
  if (h.includes(String(term.term).toLowerCase())) return true;
  const acr = acronymOf(term.term);
  return acr ? new RegExp(`\\b${acr}\\b`).test(haystack) : false;
}

async function run() {
  console.log('🚀 Pre-rendering static HTML for all pages...');

  const { glossaryTerms } = await jiti.import('../src/data/glossary.ts');
  const { allArticles } = await jiti.import('../src/data/articles.ts');
  const { caseStudies } = await jiti.import('../src/data/caseStudies.ts');
  const { tools, thinkingCategories } = await jiti.import('../src/data/content.ts');

  const categoryLabel = (id) => thinkingCategories.find(c => c.id === id)?.title || id;

  // tools[] excludes the flagship tool, which has its own page component.
  const allTools = [
    { id: 'gtm-intelligence', title: 'GTM Intelligence Engine', description: 'Answer 8 questions about your B2B business and get a data-driven GTM strategy: readiness score, recommended channel portfolio, budget allocation scenarios, and a 90-day plan.', category: 'Strategy' },
    ...tools.map(t => ({ id: t.id, title: t.title, description: t.description, category: t.category }))
  ];

  const articleBySlug = (id) => allArticles.find(a => a.id === id);
  const termById = (id) => glossaryTerms.find(t => t.id === id);
  const toolById = (id) => allTools.find(t => t.id === id);

  // ---------- Contextual link builders (real data + genuine text matches) ----------

  function termsMentionedIn(text, limit) {
    return glossaryTerms
      .filter(t => textMentionsTerm(text, t))
      .slice(0, limit)
      .map(t => `<li style="margin-bottom: 6px;"><a href="/glossary/${t.slug}" style="color: #155EEF;">${escapeHtml(t.term)}</a></li>`);
  }

  function articlesMentioningTerm(term, limit) {
    return allArticles
      .filter(a => textMentionsTerm(`${a.title} ${a.thesis}`, term))
      .slice(0, limit)
      .map(a => `<li style="margin-bottom: 6px;"><a href="/thinking/${a.category}/${a.id}" style="color: #155EEF;">${escapeHtml(a.title)}</a></li>`);
  }

  function toolsMentioningTerm(term, limit) {
    return allTools
      .filter(t => textMentionsTerm(`${t.title} ${t.description}`, term))
      .slice(0, limit)
      .map(t => `<li style="margin-bottom: 6px;"><a href="/tools/${t.id}" style="color: #155EEF;">${escapeHtml(t.title)}</a></li>`);
  }

  function caseStudiesMentioningTerm(term, limit) {
    return caseStudies
      .filter(cs => textMentionsTerm(`${cs.title} ${cs.summary}`, term))
      .slice(0, limit)
      .map(cs => `<li style="margin-bottom: 6px;"><a href="/work/${cs.slug}" style="color: #155EEF;">${escapeHtml(cs.title)}</a></li>`);
  }

  // ---------- Core Static Pages ----------

  const workList = linkList(caseStudies.map(cs =>
    `<li style="margin-bottom: 10px;"><a href="/work/${cs.slug}" style="color: #155EEF;">${escapeHtml(cs.title)}</a><br/><span style="color: #62676D; font-size: 15px;">${escapeHtml(cs.summary)}</span></li>`));

  const thinkingList = linkList(
    thinkingCategories.map(c => `<li style="margin-bottom: 10px;"><a href="/thinking/${c.id}" style="color: #155EEF;">${escapeHtml(c.title)}</a> — ${escapeHtml(c.description)}</li>`)
      .concat(allArticles.map(a =>
        `<li style="margin-bottom: 8px;"><a href="/thinking/${a.category}/${a.id}" style="color: #155EEF;">${escapeHtml(a.title)}</a></li>`))
  );

  const toolsList = linkList(allTools.map(t =>
    `<li style="margin-bottom: 10px;"><a href="/tools/${t.id}" style="color: #155EEF;">${escapeHtml(t.title)}</a> — ${escapeHtml(t.description)}</li>`));

  const corePages = [
    {
      route: '/about',
      title: 'About Subhasish Adhikary | Growth Marketing & GTM Engineer',
      description: '6+ years building B2B growth systems across demand generation, marketing automation, outbound, ABM and AI-enabled RevOps.',
      canonical: `${BASE}/about`,
      crumbs: [{ label: 'About' }],
      h1: 'About Subhasish Adhikary',
      bodyHtml: `
        <h2>Professional Background</h2>
        <p>Subhasish Adhikary is a Growth and GTM professional with 6+ years of experience building demand-generation, revenue and marketing-operations systems across B2B SaaS, staffing, HR technology, MarTech and digital businesses.</p>
        <h2>Core Specializations</h2>
        <ul>
          <li><strong>B2B Go-to-Market Strategy (GTM):</strong> ICP definition, positioning, messaging, and sales enablement.</li>
          <li><strong>Marketing Automation & RevOps:</strong> HubSpot, Salesforce, Clay, Make, and automated data workflows.</li>
          <li><strong>Outbound & ABM:</strong> Multi-channel outbound, lead enrichment, and account-based marketing.</li>
          <li><strong>AI in Marketing:</strong> AI-powered RevOps workflows, agentic automation, and pipeline operations.</li>
        </ul>
        ${relatedSection('Explore the Work', linkList([
          `<li style="margin-bottom: 6px;"><a href="/work" style="color: #155EEF;">Case studies</a> — GTM redesigns, outbound engines and automation overhauls.</li>`,
          `<li style="margin-bottom: 6px;"><a href="/thinking" style="color: #155EEF;">Research-led articles</a> — GTM strategy, automation and AI in marketing.</li>`,
          `<li style="margin-bottom: 6px;"><a href="/credentials" style="color: #155EEF;">Education & credentials</a></li>`
        ]))}
      `
    },
    {
      route: '/work',
      title: 'Work & Case Studies | Subhasish Adhikary',
      description: 'Strategic case studies covering GTM redesign, outbound demand generation, and AI-powered RevOps workflows.',
      canonical: `${BASE}/work`,
      crumbs: [{ label: 'Work' }],
      h1: 'Strategic Work & Case Studies',
      bodyHtml: `
        <h2>B2B GTM Systems and Case Studies</h2>
        <p>Explore real-world case studies detailing outbound engines, marketing automation overhauls, and pipeline acceleration systems.</p>
        ${workList}
      `
    },
    {
      route: '/thinking',
      title: 'Thinking — Research-Led Marketing Intelligence | Subhasish Adhikary',
      description: '15 research-backed articles on B2B GTM strategy, signal-based selling, marketing automation, and AI in marketing.',
      canonical: `${BASE}/thinking`,
      crumbs: [{ label: 'Thinking' }],
      h1: 'Research-Led Marketing Intelligence',
      bodyHtml: `
        <h2>B2B Strategy & Industry Frameworks</h2>
        <p>Original research and deep analysis on B2B Go-to-Market Strategy, Marketing Automation, and AI-enabled marketing systems.</p>
        ${thinkingList}
      `
    },
    {
      route: '/glossary',
      title: 'New-Age Marketing Glossary | Subhasish Adhikary',
      description: '150+ authoritative B2B marketing definitions covering GTM, ABM, marketing automation, RevOps, and AI search.',
      canonical: `${BASE}/glossary`,
      crumbs: [{ label: 'Glossary' }],
      h1: 'New-Age Marketing Glossary',
      bodyHtml: `
        <h2>Modern Marketing Terminology</h2>
        <p>A comprehensive, practitioner-written glossary for the concepts shaping modern growth, GTM engineering, marketing automation, and AI operations.</p>
        ${relatedSection('Related Resources', linkList([
          `<li style="margin-bottom: 6px;"><a href="/thinking" style="color: #155EEF;">Research-led articles</a> applying these concepts to B2B GTM, automation and AI marketing.</li>`,
          `<li style="margin-bottom: 6px;"><a href="/tools" style="color: #155EEF;">Interactive strategy tools</a> built on this terminology.</li>`
        ]))}
      `
    },
    {
      route: '/tools',
      title: 'Interactive Marketing Tools | Subhasish Adhikary',
      description: 'Decision-focused B2B marketing tools: GTM Intelligence Engine, Budget Lab, Channel Planner, and Automation Planner.',
      canonical: `${BASE}/tools`,
      crumbs: [{ label: 'Tools' }],
      h1: 'Interactive Marketing Strategy Tools',
      bodyHtml: `
        <h2>Strategic Decision Tools</h2>
        <p>Interactive diagnostics, budget planners, and stack builders designed for B2B marketers and founders.</p>
        ${toolsList}
      `
    },
    {
      route: '/gtm-stack',
      title: '79+ B2B Marketing Tool Stacks | Subhasish Adhikary',
      description: '79+ curated B2B marketing technology stacks organized by company stage, budget, and GTM motion.',
      canonical: `${BASE}/gtm-stack`,
      crumbs: [{ label: 'GTM Stack' }],
      h1: '79+ B2B Marketing Tool Stacks',
      bodyHtml: `
        <h2>Curated Marketing Technology Stacks</h2>
        <p>Explore battle-tested marketing technology stacks organized by company stage, budget, and GTM motion.</p>
      `
    },
    {
      route: '/credentials',
      title: 'Education & Credentials | Subhasish Adhikary',
      description: 'MBA in Marketing, McKinsey.org Forward Program, Clay Outbound Automation, and Pendo Product-led certifications.',
      canonical: `${BASE}/credentials`,
      crumbs: [{ label: 'Credentials' }],
      h1: 'Education & Professional Credentials',
      bodyHtml: `
        <h2>Education & Continuous Learning</h2>
        <p>MBA in Marketing from Manipal Institute of Management, MAHE, alongside verified certifications in GTM automation, outbound systems, and product-led growth.</p>
      `
    },
    {
      route: '/contact',
      title: 'Contact Subhasish Adhikary | GTM Strategy & Growth Marketing',
      description: "Get in touch with Subhasish Adhikary about GTM strategy, marketing automation, or AI in marketing. Reach out via email or LinkedIn.",
      canonical: `${BASE}/contact`,
      crumbs: [{ label: 'Contact' }],
      h1: "Let's Connect",
      bodyHtml: `
        <p>Whether you're exploring GTM strategy, marketing automation, or AI in marketing, the fastest way to reach Subhasish Adhikary is via email or LinkedIn. Responses typically arrive within 48 hours, and strategic conversations about GTM, automation, or AI in marketing can be scheduled as a call.</p>
        <h2>Email</h2>
        <p><a href="mailto:subhasishadhikary@proton.me">subhasishadhikary@proton.me</a></p>
        <h2>LinkedIn</h2>
        <p><a href="https://www.linkedin.com/in/subhasish-adhikary/" target="_blank" rel="noopener noreferrer">Connect on LinkedIn</a></p>
      `
    },
    {
      route: '/privacy',
      title: 'Privacy Policy | Subhasish Adhikary',
      description: 'How subhasishadhikary.com handles visitor data: what is collected, why, and how to get in touch.',
      canonical: `${BASE}/privacy`,
      crumbs: [{ label: 'Privacy Policy' }],
      h1: 'Privacy Policy',
      bodyHtml: `
        <h2>Overview</h2>
        <p>This is a personal portfolio and content website. It does not sell products, operate user accounts, or knowingly collect personal information from visitors.</p>
        <h2>Analytics</h2>
        <p>The site uses Google Tag Manager to measure aggregate traffic and content engagement. No personally identifiable profiles are built, and no advertising cookies are set by this site.</p>
        <h2>Contact</h2>
        <p>Questions about this policy can be sent to <a href="mailto:subhasishadhikary@proton.me">subhasishadhikary@proton.me</a>.</p>
      `
    }
  ];

  for (const page of corePages) {
    generateHtml(page);
  }
  console.log(`✓ Generated: ${corePages.length} core pages (incl. /privacy)`);

  // ---------- Thinking category hubs (fixes /thinking/:category 404s) ----------

  for (const cat of thinkingCategories) {
    const arts = allArticles.filter(a => a.category === cat.id);
    generateHtml({
      route: `/thinking/${cat.id}`,
      title: `${cat.title} — Articles & Frameworks | Subhasish Adhikary`,
      description: cat.description,
      canonical: `${BASE}/thinking/${cat.id}`,
      crumbs: [{ label: 'Thinking', path: '/thinking' }, { label: cat.title }],
      h1: cat.title,
      bodyHtml: `
        <p>${escapeHtml(cat.description)}</p>
        ${relatedSection('Articles in this Category', linkList(arts.map(a =>
          `<li style="margin-bottom: 10px;"><a href="/thinking/${a.category}/${a.id}" style="color: #155EEF;">${escapeHtml(a.title)}</a><br/><span style="color: #62676D; font-size: 15px;">${escapeHtml(a.thesis)}</span></li>`)))}
        ${relatedSection('Related Resources', linkList([
          `<li style="margin-bottom: 6px;"><a href="/tools" style="color: #155EEF;">Interactive strategy tools</a></li>`,
          `<li style="margin-bottom: 6px;"><a href="/glossary" style="color: #155EEF;">Marketing glossary</a></li>`,
          `<li style="margin-bottom: 6px;"><a href="/work" style="color: #155EEF;">Case studies</a></li>`
        ]))}
      `,
      schemas: [generateBreadcrumbSchema([
        { label: 'Home', path: '/' },
        { label: 'Thinking', path: '/thinking' },
        { label: cat.title }
      ])]
    });
  }
  console.log(`✓ Generated: ${thinkingCategories.length} thinking category hubs`);

  // ---------- Tool pages (fixes /tools/:id 404s) ----------

  for (const tool of allTools) {
    const termLinks = termsMentionedIn(`${tool.title} ${tool.description}`, 4);
    const otherTools = allTools.filter(t => t.id !== tool.id).slice(0, 5)
      .map(t => `<li style="margin-bottom: 6px;"><a href="/tools/${t.id}" style="color: #155EEF;">${escapeHtml(t.title)}</a></li>`);
    generateHtml({
      route: `/tools/${tool.id}`,
      title: `${tool.title} — Interactive Marketing Tool | Subhasish Adhikary`,
      description: tool.description,
      canonical: `${BASE}/tools/${tool.id}`,
      crumbs: [{ label: 'Tools', path: '/tools' }, { label: tool.title }],
      h1: tool.title,
      bodyHtml: `
        <p>${escapeHtml(tool.description)}</p>
        <p style="margin-top: 20px;"><a href="/tools/${tool.id}" style="display: inline-block; background: #155EEF; color: #fff; padding: 12px 20px; border-radius: 6px; text-decoration: none; font-weight: 600;">Open the interactive tool</a></p>
        ${relatedSection('Related Glossary Concepts', termLinks.length ? linkList(termLinks) : '')}
        ${relatedSection('More Tools', linkList(otherTools))}
      `,
      schemas: [
        generateSoftwareApplicationSchema({ ...tool, title: tool.title, description: tool.description }),
        generateBreadcrumbSchema([
          { label: 'Home', path: '/' },
          { label: 'Tools', path: '/tools' },
          { label: tool.title }
        ])
      ]
    });
  }
  console.log(`✓ Generated: ${allTools.length} tool pages`);

  // ---------- Glossary terms ----------

  for (const term of glossaryTerms) {
    const route = `/glossary/${term.slug}`;
    const title = `What is ${term.term}? — Marketing Glossary | Subhasish Adhikary`;
    const description = term.shortDefinition;
    const canonical = `${BASE}${route}`;

    let bodyHtml = `
      <div style="background-color: #F1F3F5; border-left: 4px solid #155EEF; padding: 20px; border-radius: 6px; margin-bottom: 28px;">
        <h2 style="font-size: 18px; margin-top: 0; color: #17191C;">Quick Definition</h2>
        <p style="font-size: 16px; margin-bottom: 0; color: #17191C;">${escapeHtml(term.fullDefinition || term.shortDefinition)}</p>
      </div>
    `;

    if (term.whyItMatters) {
      bodyHtml += `
        <section style="margin-bottom: 28px;">
          <h2 style="font-size: 22px; font-weight: 600; color: #17191C;">Why It Matters</h2>
          <p>${escapeHtml(term.whyItMatters)}</p>
        </section>
      `;
    }

    if (term.howItWorks) {
      bodyHtml += `
        <section style="margin-bottom: 28px;">
          <h2 style="font-size: 22px; font-weight: 600; color: #17191C;">How It Works</h2>
          <p>${escapeHtml(term.howItWorks)}</p>
        </section>
      `;
    }

    if (term.example) {
      bodyHtml += `
        <section style="margin-bottom: 28px;">
          <h2 style="font-size: 22px; font-weight: 600; color: #17191C;">Real-World B2B Example</h2>
          <div style="background: #F7F7F5; padding: 18px; border-radius: 6px; border: 1px solid #E1E3E5;">
            <p style="margin: 0;">${escapeHtml(term.example)}</p>
          </div>
        </section>
      `;
    }

    if (term.useCases && term.useCases.length > 0) {
      bodyHtml += `
        <section style="margin-bottom: 28px;">
          <h2 style="font-size: 22px; font-weight: 600; color: #17191C;">Common Use Cases</h2>
          <ul>
            ${term.useCases.map(u => `<li>${escapeHtml(u)}</li>`).join('')}
          </ul>
        </section>
      `;
    }

    if (term.commonMistakes && term.commonMistakes.length > 0) {
      bodyHtml += `
        <section style="margin-bottom: 28px;">
          <h2 style="font-size: 22px; font-weight: 600; color: #17191C;">Common Mistakes to Avoid</h2>
          <ul>
            ${term.commonMistakes.map(m => `<li>${escapeHtml(m)}</li>`).join('')}
          </ul>
        </section>
      `;
    }

    if (term.faq && term.faq.length > 0) {
      bodyHtml += `
        <section style="margin-bottom: 28px;">
          <h2 style="font-size: 22px; font-weight: 600; color: #17191C;">Frequently Asked Questions</h2>
          ${term.faq.map(f => `
            <div style="margin-bottom: 16px;">
              <h3 style="font-size: 17px; font-weight: 600; margin-bottom: 6px; color: #17191C;">${escapeHtml(f.question)}</h3>
              <p style="color: #62676D; margin-top: 0;">${escapeHtml(f.answer)}</p>
            </div>
          `).join('')}
        </section>
      `;
    }

    // Contextual internal links: real relatedTerms data plus genuine text matches.
    const relatedTermLinks = (term.relatedTerms || [])
      .map(id => termById(id))
      .filter(Boolean)
      .slice(0, 6)
      .map(t => `<li style="margin-bottom: 6px;"><a href="/glossary/${t.slug}" style="color: #155EEF;">${escapeHtml(t.term)}</a></li>`);
    const articleLinks = articlesMentioningTerm(term, 3);
    const toolLinks = toolsMentioningTerm(term, 3);
    const csLinks = caseStudiesMentioningTerm(term, 2);

    bodyHtml += relatedSection('Related Glossary Concepts', relatedTermLinks.length ? linkList(relatedTermLinks) : '');
    bodyHtml += relatedSection('Further Reading', articleLinks.length ? linkList(articleLinks) : '');
    bodyHtml += relatedSection('Related Tools', toolLinks.length ? linkList(toolLinks) : '');
    bodyHtml += relatedSection('In Practice — Case Studies', csLinks.length ? linkList(csLinks) : '');

    const schemas = [
      {
        "@context": "https://schema.org",
        "@type": "DefinedTerm",
        "name": term.term,
        "description": term.shortDefinition,
        "url": canonical,
        "inDefinedTermSet": {
          "@type": "DefinedTermSet",
          "name": "New-Age Marketing Glossary",
          "url": `${BASE}/glossary`
        }
      },
      generateBreadcrumbSchema([
        { label: 'Home', path: '/' },
        { label: 'Glossary', path: '/glossary' },
        { label: term.term }
      ])
    ];
    if (term.faq && term.faq.length > 0) {
      schemas.push(generateFAQPageSchema(term.faq));
    }

    generateHtml({
      route, title, description, canonical,
      crumbs: [{ label: 'Glossary', path: '/glossary' }, { label: term.term }],
      h1: `What is ${term.term}?`,
      bodyHtml,
      schemas
    });
  }
  console.log(`✓ Pre-rendered ${glossaryTerms.length} glossary terms`);

  // ---------- Research articles ----------

  // Featured-image validation: every article must carry exactly one canonical
  // image that actually exists. A missing file fails the build rather than
  // silently shipping a broken reference or falling back unnoticed.
  for (const article of allArticles) {
    if (!article.featuredImage) {
      console.error(`\nERROR: article "${article.id}" has no featuredImage.`);
      process.exit(1);
    }
    if (!article.featuredImage.startsWith('http') && !fs.existsSync(path.join(__dirname, '../public', article.featuredImage))) {
      console.error(`\nERROR: article "${article.id}" references missing image: ${article.featuredImage}`);
      process.exit(1);
    }
    if (!article.featuredImageAlt) {
      console.error(`\nERROR: article "${article.id}" has no featuredImageAlt.`);
      process.exit(1);
    }
  }

  for (const article of allArticles) {
    const route = `/thinking/${article.category}/${article.id}`;
    const title = `${article.title} | Subhasish Adhikary`;
    const description = article.thesis;
    const canonical = `${BASE}${route}`;

    // Article-specific social image; local paths get the absolute origin.
    const ogImage = article.featuredImage.startsWith('http')
      ? article.featuredImage
      : `${BASE}${article.featuredImage}`;

    // Hero image in the prerendered HTML. It is the article LCP element, so
    // it renders eagerly with intrinsic dimensions (no CLS) and high priority.
    const heroImg = `<img src="${escapeHtml(article.featuredImage)}" alt="${escapeHtml(article.featuredImageAlt)}" width="1200" height="630" fetchpriority="high" style="width: 100%; height: auto; border-radius: 8px; margin-bottom: 28px;" />`;

    let bodyHtml = `
      ${heroImg}
      <div style="background-color: #F1F3F5; border-left: 4px solid #155EEF; padding: 20px; border-radius: 6px; margin-bottom: 28px;">
        <h2 style="font-size: 18px; margin-top: 0; color: #17191C;">Key Thesis</h2>
        <p style="font-size: 16px; margin: 0; color: #17191C;">${escapeHtml(article.thesis)}</p>
      </div>
      <div>
        ${article.content}
      </div>
    `;

    const termLinks = termsMentionedIn(`${article.title} ${article.thesis} ${article.content}`, 6);
    const relToolLinks = (article.relatedTools || [])
      .map(id => toolById(id)).filter(Boolean)
      .map(t => `<li style="margin-bottom: 6px;"><a href="/tools/${t.id}" style="color: #155EEF;">${escapeHtml(t.title)}</a></li>`);
    const relArticleLinks = (article.relatedArticles || [])
      .map(id => articleBySlug(id)).filter(Boolean)
      .map(a => `<li style="margin-bottom: 6px;"><a href="/thinking/${a.category}/${a.id}" style="color: #155EEF;">${escapeHtml(a.title)}</a></li>`);
    const relCsLinks = caseStudies
      .filter(cs => textMentionsTerm(`${cs.title} ${cs.summary}`, { term: article.title.length > 12 ? { term: article.title.split(':')[0] } : { term: article.title } }))
      .slice(0, 2)
      .map(cs => `<li style="margin-bottom: 6px;"><a href="/work/${cs.slug}" style="color: #155EEF;">${escapeHtml(cs.title)}</a></li>`);

    bodyHtml += relatedSection('Key Concepts from the Glossary', termLinks.length ? linkList(termLinks) : '');
    bodyHtml += relatedSection('Related Tools', relToolLinks.length ? linkList(relToolLinks) : '');
    bodyHtml += relatedSection('Related Thinking', relArticleLinks.length ? linkList(relArticleLinks) : '');

    const articleSchema = generateArticleSchema(article);
    articleSchema.image = ogImage; // absolute URL even when featuredImage is a stale local path

    const schemas = [
      articleSchema,
      generateBreadcrumbSchema([
        { label: 'Home', path: '/' },
        { label: 'Thinking', path: '/thinking' },
        { label: categoryLabel(article.category), path: `/thinking/${article.category}` },
        { label: article.title }
      ])
    ];
    if (article.faq && article.faq.length > 0) {
      schemas.push(generateFAQPageSchema(article.faq));
    }

    generateHtml({
      route, title, description, canonical,
      crumbs: [
        { label: 'Thinking', path: '/thinking' },
        { label: categoryLabel(article.category), path: `/thinking/${article.category}` },
        { label: article.title }
      ],
      h1: article.title,
      bodyHtml,
      schemas,
      image: ogImage,
      imageAlt: article.featuredImageAlt,
      ogType: 'article'
    });
  }
  console.log(`✓ Pre-rendered ${allArticles.length} research articles`);

  // ---------- Case studies ----------

  for (const cs of caseStudies) {
    const route = `/work/${cs.slug}`;
    const title = `${cs.title} — Case Study | Subhasish Adhikary`;
    const description = cs.summary;
    const canonical = `${BASE}${route}`;

    let bodyHtml = `
      <h2>Executive Summary</h2>
      <p>${escapeHtml(cs.summary)}</p>
      <h2>Context &amp; Challenge</h2>
      <p>${escapeHtml(cs.caseStudy.context)}</p>
      <p>${escapeHtml(cs.caseStudy.challenge)}</p>
      <h2>Strategy &amp; Architecture</h2>
      <p>${escapeHtml(cs.caseStudy.strategy)}</p>
      <h2>Outcomes &amp; Impact</h2>
      <p>${escapeHtml(cs.caseStudy.outcome || 'Delivered measurable pipeline and efficiency improvements.')}</p>
    `;

    const csText = `${cs.title} ${cs.summary} ${cs.caseStudy.context || ''} ${cs.caseStudy.strategy || ''}`;
    const termLinks = termsMentionedIn(csText, 4);
    const toolLinks = allTools
      .filter(t => textMentionsTerm(csText, { term: t.title.replace(/ — .*$/, '') }))
      .slice(0, 2)
      .map(t => `<li style="margin-bottom: 6px;"><a href="/tools/${t.id}" style="color: #155EEF;">${escapeHtml(t.title)}</a></li>`);
    const otherCs = caseStudies.filter(c => c.slug !== cs.slug).slice(0, 3)
      .map(c => `<li style="margin-bottom: 6px;"><a href="/work/${c.slug}" style="color: #155EEF;">${escapeHtml(c.title)}</a></li>`);

    bodyHtml += relatedSection('Glossary Concepts in This Work', termLinks.length ? linkList(termLinks) : '');
    bodyHtml += relatedSection('Tools Used', toolLinks.length ? linkList(toolLinks) : '');
    bodyHtml += relatedSection('More Case Studies', linkList(otherCs));

    generateHtml({
      route, title, description, canonical,
      crumbs: [{ label: 'Work', path: '/work' }, { label: cs.title }],
      h1: cs.title,
      bodyHtml,
      schemas: [
        generateBreadcrumbSchema([
          { label: 'Home', path: '/' },
          { label: 'Work', path: '/work' },
          { label: cs.title }
        ])
      ]
    });
  }
  console.log(`✓ Pre-rendered ${caseStudies.length} case studies`);

  // ---------- Branded 404 (Vercel serves dist/404.html with a real 404 status) ----------

  generateHtml({
    route: '404',
    title: 'Page Not Found | Subhasish Adhikary',
    description: 'The page you are looking for does not exist.',
    canonical: `${BASE}/404`,
    crumbs: [{ label: 'Page Not Found' }],
    h1: 'Page not found',
    bodyHtml: `
      <p>The page you're looking for doesn't exist. Try one of these instead:</p>
      <ul>
        <li style="margin-bottom: 6px;"><a href="/" style="color: #155EEF;">Home</a></li>
        <li style="margin-bottom: 6px;"><a href="/thinking" style="color: #155EEF;">Research articles</a></li>
        <li style="margin-bottom: 6px;"><a href="/tools" style="color: #155EEF;">Interactive tools</a></li>
        <li style="margin-bottom: 6px;"><a href="/glossary" style="color: #155EEF;">Marketing glossary</a></li>
        <li style="margin-bottom: 6px;"><a href="/work" style="color: #155EEF;">Case studies</a></li>
      </ul>
    `,
    noindex: true
  });
  console.log('✓ Generated: branded 404 page');

  // ---------- Sitemap sync (self-healing) + data-driven lastmod ----------
  // Sanity is now the article source of truth: newly published articles get
  // appended to the sitemap and unpublished ones are dropped automatically.

  const sitemapPath = path.join(distDir, 'sitemap.xml');
  if (fs.existsSync(sitemapPath)) {
    let sitemap = fs.readFileSync(sitemapPath, 'utf8');
    const locs = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1].trim().replace(/\/$/, ''));
    const sitemapSet = new Set(locs.map(l => l.replace(BASE, '') || '/'));

    // lastmod only where real content dates exist — never fabricated.
    const lastmodByRoute = new Map();
    for (const a of allArticles) {
      const d = a.updatedDate || a.publishedDate;
      if (d) lastmodByRoute.set(`/thinking/${a.category}/${a.id}`, new Date(d).toISOString().slice(0, 10));
    }
    for (const t of glossaryTerms) {
      if (t.updatedDate) lastmodByRoute.set(`/glossary/${t.slug}`, new Date(t.updatedDate).toISOString().slice(0, 10));
    }

    let injected = 0;
    sitemap = sitemap.replace(/<url>\s*<loc>([^<]+)<\/loc>/g, (m, loc) => {
      const route = loc.trim().replace(BASE, '').replace(/\/$/, '') || '/';
      const lm = lastmodByRoute.get(route);
      if (!lm) return m;
      injected++;
      return m.replace(/<\/loc>/, `</loc>\n    <lastmod>${lm}</lastmod>`);
    });

    // Append prerendered pages missing from the sitemap (new Sanity articles).
    const missing = [...generatedRoutes].filter(r => r !== '404' && !sitemapSet.has(r));
    for (const route of missing) {
      const lm = lastmodByRoute.get(route);
      const entry = `\n  <url>\n    <loc>${BASE}${route === '/' ? '/' : route}</loc>${
        lm ? `\n    <lastmod>${lm}</lastmod>` : ''
      }\n    <changefreq>monthly</changefreq>\n    <priority>0.8</priority>\n  </url>`;
      sitemap = sitemap.replace(/<\/urlset>/, `${entry}\n</urlset>`);
    }

    // Drop sitemap entries whose pages no longer exist (unpublished articles).
    const stale = [...sitemapSet].filter(r => !generatedRoutes.has(r));
    if (stale.length) {
      for (const route of stale) {
        const re = new RegExp(`\\n\\s*<url>\\s*<loc>${BASE.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}${route.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}<\\/loc>[\\s\\S]*?<\\/url>`, 'g');
        sitemap = sitemap.replace(re, '');
      }
    }

    fs.writeFileSync(sitemapPath, sitemap, 'utf8');
    const total = (sitemap.match(/<loc>/g) || []).length;
    console.log(`✓ Sitemap synced: ${total} URLs (+${missing.length} added, -${stale.length} removed, ${injected} lastmod)`);
    if (missing.length) console.log(`  added: ${missing.join(', ')}`);
    if (stale.length) console.log(`  removed: ${stale.join(', ')}`);
  } else {
    console.warn('⚠ dist/sitemap.xml not found — skipped sync check');
  }

  console.log('✅ ALL static pages pre-rendered successfully!');
}

run().catch(err => {
  console.error('Fatal pre-render error:', err);
  process.exit(1);
});
