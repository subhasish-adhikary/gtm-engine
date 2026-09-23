export const siteConfig = {
  name: "Subhasish Adhikary",
  email: "subhasishadhikary@proton.me",
  linkedin: "https://www.linkedin.com/in/subhasish-adhikary/",
  twitter: "https://x.com/crazy_subh",
  location: "Hyderabad, India",
  tagline: "I build the systems behind modern B2B growth.",
  description: "Growth marketing and GTM systems for B2B companies. I work across demand generation, marketing automation, outbound, ABM and AI-enabled RevOps — connecting strategy to pipeline through data, automation and technology.",
  professionalSummary: "6+ years building demand-generation, revenue and marketing-operations systems across B2B SaaS, staffing, HR technology, MarTech and digital businesses. Currently building growth and GTM systems at LanceSoft, connecting marketing execution with pipeline creation, sales productivity and scalable operating infrastructure.",
};

export const navigation = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  { label: "Work", path: "/work" },
  { label: "Thinking", path: "/thinking" },
  { label: "Tools", path: "/tools" },
  { label: "Lab", path: "/lab" },
  { label: "GTM Stack", path: "/gtm-stack" },
  { label: "Glossary", path: "/glossary" },
  { label: "Credentials", path: "/credentials" },
  { label: "Contact", path: "/contact" },
];

export const capabilities = [
  { title: "Growth Marketing", description: "Building scalable B2B acquisition engines through outbound, ABM, demand generation and data-driven experimentation.", icon: "trending-up" },
  { title: "GTM Strategy & Engineering", description: "Designing go-to-market systems that connect ICP, positioning, demand generation and sales enablement into predictable pipeline.", icon: "target" },
  { title: "Marketing Automation", description: "Architecting marketing automation, CRM operations and RevOps workflows using HubSpot, Salesforce, Clay, Apollo and AI agents.", icon: "zap" },
  { title: "Demand Generation", description: "Building outbound and inbound demand systems through cold email, LinkedIn outreach, ABM campaigns and multi-touch engagement.", icon: "bar-chart" },
  { title: "AI-Enabled Marketing", description: "Implementing AI-powered RevOps workflows, agentic automation, lead enrichment and intelligent pipeline operations.", icon: "brain" },
  { title: "Marketing Operations", description: "Connecting marketing strategy to revenue through data flows, attribution, lifecycle workflows and marketing technology architecture.", icon: "package" },
];

// Canonical case-study data lives in src/data/caseStudies.ts.
// This re-export keeps the historical import path working for consumers
// (HomePage, MainPages) with a single source of truth behind it.
export { caseStudies as selectedWork } from './caseStudies';

export const thinkingCategories = [
  { id: "gtm", title: "B2B GTM", description: "Go-to-market strategy, positioning, and revenue architecture.", count: 1 },
  { id: "automation", title: "Marketing Automation", description: "Systems thinking applied to marketing workflows and lifecycle management.", count: 1 },
  { id: "ai-marketing", title: "AI Marketing", description: "How AI is reshaping marketing operations, content, and decision-making.", count: 1 },
];

export const tools = [
  { id: "channel-planner", title: "Marketing Channel Planner", description: "Given your ICP, ACV, budget, and sales cycle — which channels should you prioritize?", category: "Strategy", status: "active" },
  { id: "gtm-diagnostic", title: "GTM Diagnostic", description: "Assess your go-to-market motion across positioning, channels, and funnel architecture.", category: "Strategy", status: "active" },
  { id: "budget-lab", title: "GTM Budget Lab", description: "Model marketing budget allocation across channels based on your stage and goals.", category: "Planning", status: "active" },
  { id: "stack-builder", title: "GTM Stack Builder", description: "Design your marketing technology stack based on company size and growth stage.", category: "Technology", status: "active" },
  { id: "automation-planner", title: "Marketing Automation Planner", description: "Plan automation workflows for lead nurture, onboarding, retention, and reactivation.", category: "Automation", status: "active" },
  { id: "copy-analyzer", title: "Ad Copy Analyzer", description: "Analyze ad and landing page copy for clarity, persuasion, and conversion potential.", category: "Content", status: "active" },
  { id: "content-opportunity", title: "Content Opportunity Analyzer", description: "Identify content gaps and opportunities based on your market, competitors, and audience.", category: "Content", status: "active" },
  { id: "experiment-planner", title: "GTM Experiment Planner", description: "Design, prioritize, and track growth experiments with a structured framework.", category: "Experimentation", status: "active" },
  { id: "geo-diagnostic", title: "AI Visibility / GEO Diagnostic", description: "Assess your brand's visibility in AI-generated answers and generative search.", category: "AI", status: "active" },
];

export const gtmStackCategories = [
  "CRM", "Marketing Automation", "Sales Intelligence", "Intent Data", "ABM",
  "Email Marketing", "Cold Outreach", "Content Marketing", "SEO", "AEO / GEO",
  "Paid Media", "LinkedIn", "Analytics", "Product Analytics", "Customer Data / CDP",
  "RevOps", "Lead Enrichment", "Sales Engagement", "Conversation Intelligence",
  "Customer Success", "Research", "Competitive Intelligence", "PR", "Events",
  "Partnerships", "Attribution", "Experimentation", "AI Marketing", "AI Agents", "Marketing Operations",
];

export const aboutContent = {
  introduction: "I'm a strategic marketer who builds growth systems at the intersection of GTM strategy, product marketing, marketing automation, and AI.",
  philosophy: [
    "Marketing is a system, not a collection of tactics. Every channel should serve a coherent growth architecture.",
    "The best marketing decisions come from understanding economics — CAC, LTV, payback periods, and marginal returns.",
    "Automation should amplify human judgment, not replace it. The goal is leverage, not elimination.",
    "AI in marketing is about building better decision loops — faster feedback, sharper targeting, more relevant content.",
    "Positioning is strategy made visible. If you can't articulate why you're different, no amount of spend will fix it.",
  ],
  expertise: [
    "B2B Go-to-Market Strategy", "Product Marketing & Positioning", "Demand Generation",
    "Marketing Automation & Lifecycle", "AI-Enabled Marketing Operations", "Marketing Economics",
    "Growth Experimentation", "Marketing Technology Architecture", "Content Strategy & SEO", "Marketing Leadership",
  ],
};
