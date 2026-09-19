import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distDir = path.resolve(__dirname, '../dist');
const templatePath = path.join(distDir, 'index.html');

if (!fs.existsSync(templatePath)) {
  console.error('dist/index.html not found. Run "vite build" first.');
  process.exit(1);
}

const template = fs.readFileSync(templatePath, 'utf8');

// Helper to escape HTML strings
function escapeHtml(str = '') {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// Generate static HTML for a route
function generatePage({ route, title, description, canonical, h1, bodyHtml, jsonLd }) {
  let html = template;

  // Replace Title
  html = html.replace(/<title>.*?<\/title>/s, `<title>${escapeHtml(title)}</title>`);

  // Replace Meta Description
  html = html.replace(
    /<meta name="description" content=".*?"\s*\/?>/s,
    `<meta name="description" content="${escapeHtml(description)}" />`
  );

  // Replace Canonical
  html = html.replace(
    /<link rel="canonical" href=".*?"\s*\/?>/s,
    `<link rel="canonical" href="${canonical}" />`
  );

  // Replace OpenGraph tags
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

  // Replace Twitter tags
  html = html.replace(
    /<meta name="twitter:title" content=".*?"\s*\/?>/s,
    `<meta name="twitter:title" content="${escapeHtml(title)}" />`
  );
  html = html.replace(
    /<meta name="twitter:description" content=".*?"\s*\/?>/s,
    `<meta name="twitter:description" content="${escapeHtml(description)}" />`
  );

  // Inject JSON-LD Schema if provided
  if (jsonLd) {
    const schemaTag = `<script type="application/ld+json">\n${JSON.stringify(jsonLd, null, 2)}\n</script>`;
    html = html.replace('</head>', `${schemaTag}\n</head>`);
  }

  // Pre-render content inside <div id="root">
  const renderedContent = `
    <div id="root">
      <main class="prerendered-content" style="max-width: 900px; margin: 40px auto; padding: 0 20px; font-family: system-ui, -apple-system, sans-serif;">
        <nav style="margin-bottom: 24px; font-size: 14px;">
          <a href="/">Home</a> / <a href="/glossary">Glossary</a>
        </nav>
        <h1 style="font-size: 36px; font-weight: 700; margin-bottom: 16px;">${escapeHtml(h1 || title)}</h1>
        <p style="font-size: 18px; line-height: 1.6; color: #4b5563; margin-bottom: 32px;">${escapeHtml(description)}</p>
        <article style="line-height: 1.8; color: #1f2937;">
          ${bodyHtml}
        </article>
      </main>
    </div>
  `;

  html = html.replace(/<div id="root">[\s\S]*?<\/div>/, renderedContent);

  // Write file to dist/[route]/index.html
  const targetDir = route === '/' ? distDir : path.join(distDir, route);
  fs.mkdirSync(targetDir, { recursive: true });
  fs.writeFileSync(path.join(targetDir, 'index.html'), html, 'utf8');
}

console.log('Generating pre-rendered static HTML pages for bots and crawlers...');

// Import glossary data dynamically or read from source
async function run() {
  try {
    // 1. Static Core Pages
    const corePages = [
      {
        route: '/about',
        title: 'About Subhasish Adhikary | Growth Marketing & GTM Engineer',
        description: '6+ years building B2B growth systems across demand generation, marketing automation, outbound, ABM and AI-enabled RevOps.',
        canonical: 'https://subhasishadhikary.com/about',
        h1: 'About Subhasish Adhikary',
        bodyHtml: `
          <section>
            <h2>Growth Marketing & GTM Strategy</h2>
            <p>Subhasish Adhikary is a Growth and GTM professional with 6+ years of experience across B2B SaaS, staffing, HR technology, MarTech and digital growth.</p>
            <h3>Core Competencies</h3>
            <ul>
              <li>B2B Go-to-Market Strategy (GTM)</li>
              <li>Marketing Automation & RevOps Workflows</li>
              <li>Outbound Demand Generation & Cold Email</li>
              <li>Account-Based Marketing (ABM)</li>
              <li>AI-Enabled Marketing Operations</li>
            </ul>
          </section>
        `
      },
      {
        route: '/work',
        title: 'Work & Case Studies | Subhasish Adhikary',
        description: 'Case studies covering go-to-market redesign, outbound demand generation, and AI-powered RevOps workflows.',
        canonical: 'https://subhasishadhikary.com/work',
        h1: 'Strategic Work & Case Studies',
        bodyHtml: `
          <section>
            <h2>Proven B2B GTM Systems</h2>
            <p>Explore case studies detailing outbound engines, marketing automation overhauls, and pipeline acceleration systems.</p>
          </section>
        `
      },
      {
        route: '/thinking',
        title: 'Thinking — Research-Led Marketing Intelligence | Subhasish Adhikary',
        description: '15 research-backed articles on B2B GTM strategy, signal-based selling, marketing automation, and AI in marketing.',
        canonical: 'https://subhasishadhikary.com/thinking',
        h1: 'Research-Led Marketing Intelligence',
        bodyHtml: `
          <section>
            <h2>B2B Strategy & Analysis</h2>
            <p>Original frameworks, data analysis, and implementation guides across Go-to-Market, Marketing Automation, and AI Marketing.</p>
          </section>
        `
      },
      {
        route: '/glossary',
        title: 'New-Age Marketing Glossary | Subhasish Adhikary',
        description: '150+ authoritative B2B marketing definitions covering GTM, ABM, marketing automation, RevOps, and AI search.',
        canonical: 'https://subhasishadhikary.com/glossary',
        h1: 'New-Age Marketing Glossary',
        bodyHtml: `
          <section>
            <h2>Modern Marketing Terminology</h2>
            <p>A practitioner-written reference for terms shaping growth, GTM engineering, RevOps, and AI marketing.</p>
          </section>
        `
      },
      {
        route: '/tools',
        title: 'Interactive Marketing Tools | Subhasish Adhikary',
        description: 'Strategic B2B marketing tools: GTM Intelligence Engine, Budget Lab, Channel Planner, and Automation Planner.',
        canonical: 'https://subhasishadhikary.com/tools',
        h1: 'Interactive Marketing Strategy Tools',
        bodyHtml: `
          <section>
            <h2>Decision-Focused Marketing Tools</h2>
            <p>Interactive calculators, diagnostics, and planners designed to answer strategic GTM questions.</p>
          </section>
        `
      }
    ];

    for (const page of corePages) {
      generatePage(page);
      console.log(`✓ Pre-rendered: ${page.route}`);
    }

    // 2. Parse Glossary terms from src/data/glossary.ts
    const glossarySrc = fs.readFileSync(path.resolve(__dirname, '../src/data/glossary.ts'), 'utf8');
    
    // Extract terms via regex
    const termBlocks = glossarySrc.split(/id:\s*['"]([^'"]+)['"]/g);
    for (let i = 1; i < termBlocks.length; i += 2) {
      const id = termBlocks[i];
      const block = termBlocks[i + 1] || '';
      
      const slugMatch = block.match(/slug:\s*['"]([^'"]+)['"]/);
      const termMatch = block.match(/term:\s*['"]([^'"]+)['"]/);
      const shortDefMatch = block.match(/shortDefinition:\s*['"]([^'"]+)['"]/);
      const fullDefMatch = block.match(/fullDefinition:\s*['"]([^'"]+)['"]/);
      const whyItMattersMatch = block.match(/whyItMatters:\s*['"]([^'"]+)['"]/);
      const howItWorksMatch = block.match(/howItWorks:\s*['"]([^'"]+)['"]/);
      const exampleMatch = block.match(/example:\s*['"]([^'"]+)['"]/);

      if (slugMatch && termMatch && shortDefMatch) {
        const slug = slugMatch[1];
        const termName = termMatch[1];
        const shortDef = shortDefMatch[1];
        const fullDef = fullDefMatch ? fullDefMatch[1] : shortDef;
        const whyItMatters = whyItMattersMatch ? whyItMattersMatch[1] : '';
        const howItWorks = howItWorksMatch ? howItWorksMatch[1] : '';
        const example = exampleMatch ? exampleMatch[1] : '';

        const route = `/glossary/${slug}`;
        const title = `What is ${termName}? — Marketing Glossary | Subhasish Adhikary`;
        const canonical = `https://subhasishadhikary.com${route}`;

        const bodyHtml = `
          <div class="definition-box" style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin-bottom: 24px;">
            <h2 style="font-size: 20px; margin-top: 0;">Quick Definition</h2>
            <p style="font-size: 16px;">${escapeHtml(fullDef)}</p>
          </div>

          ${whyItMatters ? `
            <section style="margin-bottom: 24px;">
              <h2>Why It Matters</h2>
              <p>${escapeHtml(whyItMatters)}</p>
            </section>
          ` : ''}

          ${howItWorks ? `
            <section style="margin-bottom: 24px;">
              <h2>How It Works</h2>
              <p>${escapeHtml(howItWorks)}</p>
            </section>
          ` : ''}

          ${example ? `
            <section style="margin-bottom: 24px;">
              <h2>Real-World B2B Example</h2>
              <p>${escapeHtml(example)}</p>
            </section>
          ` : ''}
        `;

        const jsonLd = {
          "@context": "https://schema.org",
          "@type": "DefinedTerm",
          "name": termName,
          "description": shortDef,
          "url": canonical,
          "inDefinedTermSet": {
            "@type": "DefinedTermSet",
            "name": "New-Age Marketing Glossary",
            "url": "https://subhasishadhikary.com/glossary"
          }
        };

        generatePage({
          route,
          title,
          description: shortDef,
          canonical,
          h1: `What is ${termName}?`,
          bodyHtml,
          jsonLd
        });

        console.log(`✓ Pre-rendered: ${route}`);
      }
    }

    console.log('✅ Pre-rendering complete! All pages generated successfully.');
  } catch (err) {
    console.error('Error during pre-rendering:', err);
    process.exit(1);
  }
}

run();
