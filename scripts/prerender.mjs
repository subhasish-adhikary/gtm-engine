import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createJiti } from 'jiti';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distDir = path.resolve(__dirname, '../dist');
const templatePath = path.join(distDir, 'index.html');

if (!fs.existsSync(templatePath)) {
  console.error('dist/index.html not found. Run "vite build" first.');
  process.exit(1);
}

const template = fs.readFileSync(templatePath, 'utf8');
const jiti = createJiti(import.meta.url);

function escapeHtml(str = '') {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

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

function generateHtml({ route, title, description, canonical, h1, bodyHtml, jsonLd }) {
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

  if (jsonLd) {
    const schemaTag = `<script type="application/ld+json">\n${JSON.stringify(jsonLd, null, 2)}\n</script>`;
    html = html.replace('</head>', `${schemaTag}\n</head>`);
  }

  const renderedContent = `
    <div id="root">
      <main class="prerendered-content" style="max-width: 900px; margin: 40px auto; padding: 0 20px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.7; color: #17191C;">
        <nav style="margin-bottom: 24px; font-size: 14px; color: #62676D;">
          <a href="/" style="color: #155EEF; text-decoration: none;">Home</a> / <a href="/glossary" style="color: #155EEF; text-decoration: none;">Glossary</a>
        </nav>
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
}

async function run() {
  console.log('🚀 Pre-rendering static HTML for all pages...');

  const { glossaryTerms } = await jiti.import('../src/data/glossary.ts');
  const { allArticles } = await jiti.import('../src/data/articles.ts');
  const { caseStudies } = await jiti.import('../src/data/caseStudies.ts');
  const { tools } = await jiti.import('../src/data/content.ts');

  // Core Static Pages
  const corePages = [
    {
      route: '/about',
      title: 'About Subhasish Adhikary | Growth Marketing & GTM Engineer',
      description: '6+ years building B2B growth systems across demand generation, marketing automation, outbound, ABM and AI-enabled RevOps.',
      canonical: 'https://subhasishadhikary.com/about',
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
      `
    },
    {
      route: '/work',
      title: 'Work & Case Studies | Subhasish Adhikary',
      description: 'Strategic case studies covering GTM redesign, outbound demand generation, and AI-powered RevOps workflows.',
      canonical: 'https://subhasishadhikary.com/work',
      h1: 'Strategic Work & Case Studies',
      bodyHtml: `
        <h2>B2B GTM Systems and Case Studies</h2>
        <p>Explore real-world case studies detailing outbound engines, marketing automation overhauls, and pipeline acceleration systems.</p>
      `
    },
    {
      route: '/thinking',
      title: 'Thinking — Research-Led Marketing Intelligence | Subhasish Adhikary',
      description: '15 research-backed articles on B2B GTM strategy, signal-based selling, marketing automation, and AI in marketing.',
      canonical: 'https://subhasishadhikary.com/thinking',
      h1: 'Research-Led Marketing Intelligence',
      bodyHtml: `
        <h2>B2B Strategy & Industry Frameworks</h2>
        <p>Original research and deep analysis on B2B Go-to-Market Strategy, Marketing Automation, and AI-enabled marketing systems.</p>
      `
    },
    {
      route: '/glossary',
      title: 'New-Age Marketing Glossary | Subhasish Adhikary',
      description: '150+ authoritative B2B marketing definitions covering GTM, ABM, marketing automation, RevOps, and AI search.',
      canonical: 'https://subhasishadhikary.com/glossary',
      h1: 'New-Age Marketing Glossary',
      bodyHtml: `
        <h2>Modern Marketing Terminology</h2>
        <p>A comprehensive, practitioner-written glossary for the concepts shaping modern growth, GTM engineering, marketing automation, and AI operations.</p>
      `
    },
    {
      route: '/tools',
      title: 'Interactive Marketing Tools | Subhasish Adhikary',
      description: 'Decision-focused B2B marketing tools: GTM Intelligence Engine, Budget Lab, Channel Planner, and Automation Planner.',
      canonical: 'https://subhasishadhikary.com/tools',
      h1: 'Interactive Marketing Strategy Tools',
      bodyHtml: `
        <h2>Strategic Decision Tools</h2>
        <p>Interactive diagnostics, budget planners, and stack builders designed for B2B marketers and founders.</p>
      `
    },
    {
      route: '/gtm-stack',
      title: '79+ B2B Marketing Tool Stacks | Subhasish Adhikary',
      description: '79+ curated B2B marketing technology stacks organized by company stage, budget, and GTM motion.',
      canonical: 'https://subhasishadhikary.com/gtm-stack',
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
      canonical: 'https://subhasishadhikary.com/credentials',
      h1: 'Education & Professional Credentials',
      bodyHtml: `
        <h2>Education & Continuous Learning</h2>
        <p>MBA in Marketing from Manipal Institute of Management, MAHE, alongside verified certifications in GTM automation, outbound systems, and product-led growth.</p>
      `
    }
  ];

  for (const page of corePages) {
    generateHtml(page);
    console.log(`✓ Generated: ${page.route}`);
  }

  // Pre-render Glossary Terms (150+ terms)
  for (const term of glossaryTerms) {
    const route = `/glossary/${term.slug}`;
    const title = `What is ${term.term}? — Marketing Glossary | Subhasish Adhikary`;
    const description = term.shortDefinition;
    const canonical = `https://subhasishadhikary.com${route}`;

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

    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "DefinedTerm",
      "name": term.term,
      "description": term.shortDefinition,
      "url": canonical,
      "inDefinedTermSet": {
        "@type": "DefinedTermSet",
        "name": "New-Age Marketing Glossary",
        "url": "https://subhasishadhikary.com/glossary"
      }
    };

    generateHtml({
      route,
      title,
      description,
      canonical,
      h1: `What is ${term.term}?`,
      bodyHtml,
      jsonLd
    });
  }
  console.log(`✓ Pre-rendered ${glossaryTerms.length} glossary terms`);

  // Pre-render Research Articles
  for (const article of allArticles) {
    const route = `/thinking/${article.category}/${article.id}`;
    const title = `${article.title} | Subhasish Adhikary`;
    const description = article.thesis;
    const canonical = `https://subhasishadhikary.com${route}`;

    const bodyHtml = `
      <div style="background-color: #F1F3F5; border-left: 4px solid #155EEF; padding: 20px; border-radius: 6px; margin-bottom: 28px;">
        <h2 style="font-size: 18px; margin-top: 0; color: #17191C;">Key Thesis</h2>
        <p style="font-size: 16px; margin: 0; color: #17191C;">${escapeHtml(article.thesis)}</p>
      </div>
      <div>
        ${article.content}
      </div>
    `;

    generateHtml({
      route,
      title,
      description,
      canonical,
      h1: article.title,
      bodyHtml
    });
  }
  console.log(`✓ Pre-rendered ${allArticles.length} research articles`);

  // Pre-render Case Studies
  for (const cs of caseStudies) {
    const route = `/work/${cs.slug}`;
    const title = `${cs.title} — Case Study | Subhasish Adhikary`;
    const description = cs.summary;
    const canonical = `https://subhasishadhikary.com${route}`;

    const bodyHtml = `
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

    generateHtml({
      route,
      title,
      description,
      canonical,
      h1: cs.title,
      bodyHtml
    });
  }
  console.log(`✓ Pre-rendered ${caseStudies.length} case studies`);

  console.log('✅ ALL static pages pre-rendered successfully!');
}

run().catch(err => {
  console.error('Fatal pre-render error:', err);
  process.exit(1);
});
