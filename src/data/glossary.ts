export interface GlossaryTerm {
  id: string;
  slug: string;
  term: string;
  category: string;
  shortDefinition: string;
  fullDefinition: string;
  whyItMatters: string;
  howItWorks?: string;
  example?: string;
  useCases?: string[];
  commonMistakes?: string[];
  relatedTerms: string[];
  synonyms?: string[];
  confusedWith?: string[];
  primaryKeyword: string;
  secondaryKeywords: string[];
  publishedDate: string;
  updatedDate: string;
  sources?: Array<{ title: string; url: string; description?: string }>;
  faq?: Array<{ question: string; answer: string }>;
  featured: boolean;
  emerging: boolean;
  status: 'established' | 'emerging' | 'experimental';
}

export const glossaryCategories = [
  { id: 'gtm', name: 'GTM / Go-to-Market', slug: 'gtm', termCount: 0 },
  { id: 'growth', name: 'Growth Marketing', slug: 'growth', termCount: 0 },
  { id: 'demand-gen', name: 'Demand Generation', slug: 'demand-gen', termCount: 0 },
  { id: 'abm', name: 'Account-Based Marketing', slug: 'abm', termCount: 0 },
  { id: 'automation', name: 'Marketing Automation', slug: 'automation', termCount: 0 },
  { id: 'ai-marketing', name: 'AI Marketing', slug: 'ai-marketing', termCount: 0 },
  { id: 'seo', name: 'SEO / Search', slug: 'seo', termCount: 0 },
  { id: 'aeo-geo', name: 'AEO / GEO', slug: 'aeo-geo', termCount: 0 },
  { id: 'content', name: 'Content Marketing', slug: 'content', termCount: 0 },
  { id: 'performance', name: 'Performance Marketing', slug: 'performance', termCount: 0 },
  { id: 'paid-media', name: 'Paid Media', slug: 'paid-media', termCount: 0 },
  { id: 'outbound', name: 'Outbound / Cold Outreach', slug: 'outbound', termCount: 0 },
  { id: 'product-marketing', name: 'Product Marketing', slug: 'product-marketing', termCount: 0 },
  { id: 'data-analytics', name: 'Marketing Data / Analytics', slug: 'data-analytics', termCount: 0 },
  { id: 'revops', name: 'RevOps / Marketing Ops', slug: 'revops', termCount: 0 },
];

export const glossaryTerms: GlossaryTerm[] = [
  {
    id: 'gtm-engineering',
    slug: 'gtm-engineering',
    term: 'GTM Engineering',
    category: 'gtm',
    shortDefinition: 'GTM engineering is the use of data, automation, software and AI to build and operate repeatable go-to-market systems that connect strategy to pipeline.',
    fullDefinition: 'GTM engineering combines strategic go-to-market planning with technical implementation using marketing technology, automation workflows, data infrastructure and AI agents. Unlike traditional GTM strategy that focuses on positioning and messaging alone, GTM engineering builds the operational systems that execute GTM strategy at scale — connecting market intelligence, customer signals, enrichment, automation, outreach and measurement into repeatable, measurable workflows.',
    whyItMatters: 'Modern B2B companies cannot rely on manual processes to execute GTM strategy. GTM engineering creates scalable systems that reduce operational overhead, improve pipeline quality, increase sales productivity and enable data-driven decision making. Companies with strong GTM engineering capabilities can execute more efficiently, respond faster to market signals and build compounding advantages through automation and data.',
    howItWorks: 'GTM engineering works by mapping the GTM motion (ICP → positioning → demand → sales → revenue) and building technical systems to execute each stage. This includes: defining target accounts using firmographic and intent data, enriching prospect data automatically, building AI-powered outreach sequences, automating lead routing and qualification, connecting marketing automation to CRM, implementing attribution and measurement, and creating feedback loops that inform strategy.',
    example: 'A B2B SaaS company uses GTM engineering to build an outbound system: Clay enriches prospect data from multiple sources, AI agents analyze buying signals and intent data, automated sequences personalize outreach based on role and company context, HubSpot routes qualified leads to sales with full context, and attribution tracks pipeline contribution. The system reduces manual work by 5 hours per week while improving lead quality by 30%.',
    useCases: [
      'Building scalable outbound demand generation systems',
      'Automating lead enrichment and qualification workflows',
      'Connecting marketing automation to sales operations',
      'Implementing AI-powered account targeting and personalization',
      'Creating data-driven GTM feedback loops',
      'Reducing manual handoffs between marketing and sales'
    ],
    commonMistakes: [
      'Building automation without clear GTM strategy first',
      'Over-automating without human oversight for quality',
      'Ignoring data quality and enrichment',
      'Not measuring pipeline contribution and ROI',
      'Treating GTM engineering as purely technical without strategic input'
    ],
    relatedTerms: ['gtm-strategy', 'marketing-automation', 'revops', 'ai-agents', 'data-enrichment', 'intent-data', 'workflow-automation', 'demand-generation'],
    synonyms: ['GTM Ops', 'GTM Systems', 'Revenue Engineering'],
    confusedWith: ['marketing-automation', 'revops'],
    primaryKeyword: 'GTM engineering',
    secondaryKeywords: ['GTM engineer', 'go-to-market engineering', 'GTM systems', 'GTM operations'],
    publishedDate: '2024-01-15',
    updatedDate: '2024-01-15',
    sources: [
      { title: '6sense: The State of B2B Buying', url: 'https://6sense.com/resources/', description: 'Research on B2B buying behavior and GTM effectiveness' },
      { title: 'Gartner: B2B Go-to-Market Models', url: 'https://www.gartner.com/', description: 'Research on GTM strategy and execution' }
    ],
    faq: [
      { question: 'What is the difference between GTM engineering and marketing automation?', answer: 'Marketing automation focuses on automating marketing tasks like email sequences and lead nurturing. GTM engineering is broader — it builds complete systems connecting strategy, data, automation, sales and measurement across the entire GTM motion.' },
      { question: 'Who does GTM engineering?', answer: 'GTM engineers typically work at the intersection of marketing, sales operations and technology. They may have titles like GTM Engineer, Marketing Operations Engineer, Revenue Operations Specialist or Growth Engineer.' },
      { question: 'What tools are used in GTM engineering?', answer: 'Common tools include Clay (data enrichment), HubSpot/Salesforce (CRM), Apollo (outbound), N8N/Make (workflow automation), AI agents for personalization, and analytics platforms for measurement.' }
    ],
    featured: true,
    emerging: true,
    status: 'emerging'
  },
  {
    id: 'answer-engine-optimization',
    slug: 'answer-engine-optimization',
    term: 'Answer Engine Optimization (AEO)',
    category: 'aeo-geo',
    shortDefinition: 'Answer Engine Optimization (AEO) is the practice of optimizing content to be cited and referenced by AI-powered answer engines like ChatGPT, Perplexity, Google AI Overviews and other LLM-based search systems.',
    fullDefinition: 'Answer Engine Optimization (AEO) focuses on making content discoverable, citable and useful for AI systems that synthesize answers from multiple sources. Unlike traditional SEO which optimizes for search engine rankings, AEO optimizes for AI retrieval and citation — ensuring content appears in AI-generated answers, is properly attributed, and drives referral traffic from AI platforms. AEO requires clear definitions, structured content, entity clarity, authoritative sourcing and machine-readable formatting.',
    whyItMatters: 'AI search is rapidly changing how users find information. Google AI Overviews, ChatGPT, Perplexity and other AI systems are becoming primary discovery channels. Content that is not optimized for AI retrieval risks becoming invisible to a growing segment of search traffic. AEO ensures content remains discoverable in the AI search era and can drive measurable referral traffic from AI platforms.',
    howItWorks: 'AEO works by structuring content so AI systems can easily identify, retrieve and cite it. This includes: providing clear, concise definitions that answer questions directly, using semantic HTML and structured data, establishing entity clarity (who, what, where), citing authoritative sources, creating topical authority through comprehensive coverage, using clear headings and lists, and ensuring content is independently understandable when extracted from context.',
    example: 'A B2B SaaS company writes a comprehensive guide on "What is GTM Engineering?" with a clear 2-sentence definition at the top, structured sections explaining the concept, real-world examples, comparisons with related concepts, and citations from authoritative sources. When a user asks ChatGPT "What is GTM engineering?", the AI retrieves and cites this guide, driving referral traffic and establishing the company as an authority.',
    useCases: [
      'Optimizing blog content for AI search visibility',
      'Creating citation-worthy glossary and reference content',
      'Building topical authority for AI retrieval',
      'Driving referral traffic from AI platforms',
      'Establishing brand authority in AI-generated answers'
    ],
    commonMistakes: [
      'Writing vague, fluffy content that AI cannot easily extract',
      'Ignoring structured data and semantic HTML',
      'Not providing clear, concise definitions',
      'Failing to cite authoritative sources',
      'Treating AEO as separate from SEO rather than complementary'
    ],
    relatedTerms: ['generative-engine-optimization', 'seo', 'ai-search', 'llm-optimization', 'ai-visibility', 'ai-citation'],
    synonyms: ['AEO', 'AI SEO', 'LLM Optimization'],
    confusedWith: ['generative-engine-optimization', 'seo'],
    primaryKeyword: 'Answer Engine Optimization',
    secondaryKeywords: ['AEO', 'AI SEO', 'LLM optimization', 'AI search optimization'],
    publishedDate: '2024-01-20',
    updatedDate: '2024-01-20',
    sources: [
      { title: 'Google Search Central: AI Overviews', url: 'https://developers.google.com/search/docs/fundamentals/ai-overviews', description: 'Official Google documentation on AI Overviews' },
      { title: 'Search Engine Journal: AEO Guide', url: 'https://www.searchenginejournal.com/', description: 'Industry guide to Answer Engine Optimization' }
    ],
    faq: [
      { question: 'What is the difference between AEO and GEO?', answer: 'AEO (Answer Engine Optimization) focuses on optimizing for AI answer engines like ChatGPT and Perplexity. GEO (Generative Engine Optimization) is a broader term that includes AEO but also covers optimization for generative search features like Google AI Overviews. In practice, they overlap significantly.' },
      { question: 'How do I measure AEO success?', answer: 'Track AI referral traffic from ChatGPT, Perplexity and other AI platforms, monitor brand mentions in AI-generated answers, measure citation frequency, and track rankings in AI search results.' },
      { question: 'Is AEO replacing SEO?', answer: 'No, AEO complements SEO. Traditional SEO still matters for direct search traffic, but AEO ensures content is also discoverable through AI systems. The best strategy optimizes for both.' }
    ],
    featured: true,
    emerging: true,
    status: 'emerging'
  },
  {
    id: 'generative-engine-optimization',
    slug: 'generative-engine-optimization',
    term: 'Generative Engine Optimization (GEO)',
    category: 'aeo-geo',
    shortDefinition: 'Generative Engine Optimization (GEO) is the practice of optimizing content for visibility and citation in generative AI search systems including Google AI Overviews, ChatGPT, Perplexity, Gemini and other LLM-powered search experiences.',
    fullDefinition: 'Generative Engine Optimization (GEO) encompasses strategies to make content discoverable, retrievable and citable by generative AI systems that synthesize answers from multiple sources. GEO includes optimizing for AI Overviews in Google search, AI chatbots like ChatGPT and Claude, AI search engines like Perplexity, and other generative search experiences. GEO requires clear entity definitions, authoritative content, structured data, topical authority and machine-readable formatting that AI systems can easily parse and cite.',
    whyItMatters: 'Generative AI search is fundamentally changing search behavior. Users increasingly get answers from AI systems rather than clicking through to websites. Content not optimized for generative search risks losing visibility to competitors who optimize for AI retrieval. GEO ensures content remains visible in the AI search era and can drive measurable traffic from AI platforms.',
    howItWorks: 'GEO works by creating content that AI systems can easily retrieve, understand and cite. This includes: providing clear, authoritative definitions, using structured data markup, establishing topical authority through comprehensive coverage, citing credible sources, using semantic HTML, creating entity clarity, and formatting content for easy extraction. Content should be independently valuable when cited by AI systems.',
    example: 'A marketing technology company publishes a comprehensive guide on "Marketing Automation Best Practices" with clear definitions, structured sections, real examples, data-backed insights and citations from industry research. When a user asks Perplexity "What are marketing automation best practices?", the AI retrieves and synthesizes information from this guide, citing it as a source and driving referral traffic.',
    useCases: [
      'Optimizing content for Google AI Overviews',
      'Increasing citations in ChatGPT and Claude responses',
      'Driving traffic from Perplexity and AI search engines',
      'Building authority in AI-generated answers',
      'Future-proofing content for AI search evolution'
    ],
    commonMistakes: [
      'Writing content that is too vague for AI to extract',
      'Ignoring structured data and semantic markup',
      'Not establishing topical authority',
      'Failing to cite authoritative sources',
      'Treating GEO as a replacement for SEO rather than complementary'
    ],
    relatedTerms: ['answer-engine-optimization', 'seo', 'ai-search', 'ai-overviews', 'llm-optimization'],
    synonyms: ['GEO', 'AI Search Optimization', 'LLM SEO'],
    confusedWith: ['answer-engine-optimization', 'seo'],
    primaryKeyword: 'Generative Engine Optimization',
    secondaryKeywords: ['GEO', 'AI search optimization', 'LLM SEO', 'Google AI Overviews optimization'],
    publishedDate: '2024-01-20',
    updatedDate: '2024-01-20',
    sources: [
      { title: 'Google Search Central: Generative AI', url: 'https://developers.google.com/search/docs/fundamentals/ai-overviews', description: 'Official Google documentation on generative AI in search' },
      { title: 'Search Engine Land: GEO Guide', url: 'https://searchengineland.com/', description: 'Industry guide to Generative Engine Optimization' }
    ],
    faq: [
      { question: 'Is GEO the same as AEO?', answer: 'GEO (Generative Engine Optimization) is a broader term that includes AEO (Answer Engine Optimization). GEO covers all generative AI search including Google AI Overviews, while AEO specifically focuses on answer engines like ChatGPT and Perplexity. In practice, the optimization strategies overlap significantly.' },
      { question: 'How is GEO different from traditional SEO?', answer: 'Traditional SEO optimizes for search engine rankings and click-through. GEO optimizes for AI retrieval and citation. SEO focuses on keywords and backlinks; GEO focuses on entity clarity, topical authority and structured content that AI can easily parse and cite.' },
      { question: 'Will GEO replace SEO?', answer: 'No, GEO complements SEO. Traditional SEO still drives significant traffic, but GEO ensures content is also visible in AI search. The best strategy optimizes for both traditional search and AI search.' }
    ],
    featured: true,
    emerging: true,
    status: 'emerging'
  },
  {
    id: 'marketing-automation',
    slug: 'marketing-automation',
    term: 'Marketing Automation',
    category: 'automation',
    shortDefinition: 'Marketing automation is the use of software and technology to automate repetitive marketing tasks, workflows and processes — including email campaigns, lead nurturing, lead scoring, customer segmentation and cross-channel orchestration.',
    fullDefinition: 'Marketing automation enables marketing teams to execute complex, multi-touch campaigns at scale without manual intervention. Modern marketing automation platforms (like HubSpot, Marketo, Salesforce Marketing Cloud) allow marketers to define workflows triggered by specific events, behaviors or criteria — automatically sending personalized emails, updating lead scores, routing leads to sales, and orchestrating multi-channel campaigns. Marketing automation connects to CRM systems, analytics platforms and other MarTech tools to create integrated marketing operations.',
    whyItMatters: 'Marketing automation increases marketing efficiency, improves lead quality, enables personalization at scale and provides measurable ROI. Companies using marketing automation can nurture more leads, convert more customers and reduce manual overhead. Automation also enables data-driven decision making by tracking campaign performance and customer behavior across the entire journey.',
    howItWorks: 'Marketing automation works by defining workflows triggered by specific events or criteria. For example: when a prospect downloads a whitepaper (trigger), the system adds them to a nurture sequence (action), sends a follow-up email after 3 days (action), updates their lead score based on engagement (action), and routes them to sales if they reach a qualification threshold (action). Workflows can include conditional logic, personalization, multi-channel orchestration and integration with other systems.',
    example: 'A B2B SaaS company uses marketing automation to nurture trial users: when a user signs up (trigger), they receive a welcome email series explaining key features (action). If they don\'t activate within 7 days, they receive a re-engagement email with a personalized video (action). If they activate, they receive advanced feature tutorials (action). If they don\'t convert to paid after 30 days, they receive a special offer (action). The system tracks engagement and routes hot leads to sales.',
    useCases: [
      'Lead nurturing and qualification workflows',
      'Customer onboarding and activation sequences',
      'Re-engagement campaigns for inactive users',
      'Cross-sell and upsell campaigns',
      'Event marketing and webinar follow-up',
      'Account-based marketing orchestration'
    ],
    commonMistakes: [
      'Automating without clear strategy or goals',
      'Over-automating and losing personal touch',
      'Not testing and optimizing workflows',
      'Ignoring data quality and segmentation',
      'Not measuring ROI and campaign performance'
    ],
    relatedTerms: ['lifecycle-automation', 'lead-nurturing', 'lead-scoring', 'workflow-automation', 'marketing-operations', 'revops'],
    synonyms: ['Marketing Automation Platform', 'MAP'],
    confusedWith: ['marketing-operations', 'crm'],
    primaryKeyword: 'marketing automation',
    secondaryKeywords: ['marketing automation platform', 'marketing automation software', 'email automation', 'lead nurturing'],
    publishedDate: '2024-01-10',
    updatedDate: '2024-01-10',
    sources: [
      { title: 'HubSpot: What is Marketing Automation?', url: 'https://blog.hubspot.com/marketing/marketing-automation', description: 'Comprehensive guide to marketing automation' },
      { title: 'Salesforce: Marketing Automation Guide', url: 'https://www.salesforce.com/marketing/automation/', description: 'Salesforce perspective on marketing automation' }
    ],
    faq: [
      { question: 'What is the best marketing automation platform?', answer: 'The best platform depends on company size, budget and needs. HubSpot is popular for SMB and mid-market. Marketo and Salesforce Marketing Cloud are enterprise-grade. ActiveCampaign and Mailchimp work for smaller companies. The best choice aligns with your tech stack and requirements.' },
      { question: 'How much does marketing automation cost?', answer: 'Costs range from $50/month for basic tools to $100,000+/year for enterprise platforms. Pricing depends on contacts, features and scale. Consider total cost including implementation, maintenance and training.' },
      { question: 'Do I need marketing automation?', answer: 'If you\'re sending personalized emails to more than 100 contacts, nurturing leads through multiple stages, or orchestrating multi-channel campaigns, marketing automation can significantly improve efficiency and results.' }
    ],
    featured: true,
    emerging: false,
    status: 'established'
  }
];

export function getTermBySlug(slug: string): GlossaryTerm | undefined {
  return glossaryTerms.find(term => term.slug === slug);
}

export function getTermsByCategory(categoryId: string): GlossaryTerm[] {
  return glossaryTerms.filter(term => term.category === categoryId);
}

export function getFeaturedTerms(): GlossaryTerm[] {
  return glossaryTerms.filter(term => term.featured);
}

export function getEmergingTerms(): GlossaryTerm[] {
  return glossaryTerms.filter(term => term.emerging);
}

export function searchTerms(query: string): GlossaryTerm[] {
  const lowerQuery = query.toLowerCase();
  return glossaryTerms.filter(term => 
    term.term.toLowerCase().includes(lowerQuery) ||
    term.shortDefinition.toLowerCase().includes(lowerQuery) ||
    term.primaryKeyword.toLowerCase().includes(lowerQuery) ||
    term.secondaryKeywords.some(kw => kw.toLowerCase().includes(lowerQuery)) ||
    (term.synonyms && term.synonyms.some(syn => syn.toLowerCase().includes(lowerQuery)))
  );
}
