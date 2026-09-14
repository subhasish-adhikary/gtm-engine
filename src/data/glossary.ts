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
  // A. GTM / GO-TO-MARKET
  {
    id: 'go-to-market-strategy',
    slug: 'go-to-market-strategy',
    term: 'Go-to-Market Strategy',
    category: 'gtm',
    shortDefinition: 'A comprehensive plan for launching and scaling a product or service in the market, defining target customers, value proposition, channels, and competitive positioning.',
    fullDefinition: 'Go-to-Market (GTM) strategy is the actionable blueprint that guides how a company brings products to market and reaches customers. It encompasses target market definition, buyer personas, value proposition, pricing strategy, distribution channels, marketing tactics, sales approach, and competitive positioning. A strong GTM strategy aligns product, marketing, sales, and customer success teams around a unified plan to capture market share and drive revenue growth.',
    whyItMatters: 'Without a clear GTM strategy, companies waste resources on misaligned messaging, wrong channels, and poor product-market fit. A well-defined GTM strategy reduces time-to-revenue, improves customer acquisition efficiency, and creates a repeatable framework for scaling growth across products and markets.',
    howItWorks: 'GTM strategy works by first identifying the ideal customer profile and their pain points, then crafting a compelling value proposition that addresses those needs. It defines the channels and tactics to reach target buyers, establishes pricing and packaging, creates sales enablement materials, and sets metrics for measuring success. The strategy is executed cross-functionally with regular review and iteration based on market feedback.',
    example: 'A B2B SaaS company launching a new HR platform defines their GTM strategy: target mid-market companies (500-5000 employees), position as "AI-powered HR operations," price at $15/employee/month, reach buyers through LinkedIn ads and HR conferences, enable sales with battlecards and ROI calculators, and measure success through pipeline velocity and win rates.',
    useCases: ['New product launches', 'Market expansion', 'Geographic expansion', 'New customer segment targeting', 'Competitive repositioning'],
    commonMistakes: ['Skipping market research', 'Misaligning product and marketing messaging', 'Underestimating sales enablement needs', 'Not defining clear success metrics', 'Treating GTM as one-time event rather than ongoing process'],
    relatedTerms: ['gtm-engineering', 'gtm-motion', 'product-led-growth', 'sales-led-growth'],
    synonyms: ['GTM Strategy', 'Market Entry Strategy', 'Launch Strategy'],
    confusedWith: ['marketing-strategy', 'business-strategy'],
    primaryKeyword: 'go-to-market strategy',
    secondaryKeywords: ['GTM strategy', 'market entry strategy', 'product launch strategy'],
    publishedDate: '2024-09-15',
    updatedDate: '2024-09-15',
    sources: [{ title: 'HubSpot GTM Guide', url: 'https://blog.hubspot.com/marketing/go-to-market-strategy' }],
    faq: [
      { question: 'What is the difference between GTM strategy and marketing strategy?', answer: 'GTM strategy is broader and includes product, pricing, sales, and customer success alignment, while marketing strategy focuses specifically on marketing tactics and channels.' },
      { question: 'How long does it take to develop a GTM strategy?', answer: 'Typically 4-8 weeks for a comprehensive GTM strategy, though it should be treated as a living document that evolves with market feedback.' },
      { question: 'Who owns GTM strategy?', answer: 'GTM strategy is typically owned by Product Marketing or Revenue Operations, but requires cross-functional input from product, marketing, sales, and customer success.' }
    ],
    featured: true,
    emerging: false,
    status: 'established'
  },
  {
    id: 'gtm-motion',
    slug: 'gtm-motion',
    term: 'GTM Motion',
    category: 'gtm',
    shortDefinition: 'The specific approach and channels a company uses to reach customers and drive revenue, such as product-led, sales-led, or community-led growth.',
    fullDefinition: 'GTM motion refers to the specific go-to-market approach a company employs to acquire and serve customers. It defines the primary channels, sales model, and customer journey design. Common GTM motions include product-led growth (PLG), sales-led growth (SLG), community-led growth, partner-led growth, and hybrid models. The choice of GTM motion depends on product complexity, target market, average deal size, and customer buying behavior.',
    whyItMatters: 'Choosing the right GTM motion is critical because it determines your cost structure, sales cycle length, scalability, and customer experience. The wrong motion leads to inefficient customer acquisition, misaligned resources, and poor unit economics. The right motion creates a repeatable, scalable engine for growth.',
    howItWorks: 'GTM motion works by aligning your product design, marketing channels, sales process, and customer success model around a specific customer acquisition approach. For example, PLG motion focuses on self-serve product experience, viral loops, and expansion revenue, while SLG motion focuses on outbound prospecting, demos, and enterprise sales processes.',
    example: 'A project management tool uses a PLG motion: free tier with viral collaboration features, in-app upgrade prompts, self-serve onboarding, and sales team focused on enterprise expansion. An enterprise cybersecurity tool uses SLG motion: outbound SDRs, technical demos, proof-of-concepts, and complex procurement processes.',
    useCases: ['Defining customer acquisition strategy', 'Aligning product and go-to-market teams', 'Optimizing customer acquisition cost', 'Scaling revenue operations'],
    commonMistakes: ['Copying competitor motions without considering product-market fit', 'Switching motions too frequently', 'Misaligning product design with chosen motion', 'Underinvesting in motion-specific capabilities'],
    relatedTerms: ['product-led-growth', 'sales-led-growth', 'community-led-growth', 'partner-led-growth'],
    synonyms: ['Go-to-Market Model', 'Customer Acquisition Model'],
    confusedWith: ['sales-process', 'marketing-strategy'],
    primaryKeyword: 'GTM motion',
    secondaryKeywords: ['go-to-market motion', 'customer acquisition model', 'GTM model'],
    publishedDate: '2024-09-15',
    updatedDate: '2024-09-15',
    sources: [{ title: 'OpenView Partners GTM Motions', url: 'https://openviewpartners.com/gtm-motions/' }],
    faq: [
      { question: 'What are the main types of GTM motions?', answer: 'The main types are product-led growth (PLG), sales-led growth (SLG), community-led growth, partner-led growth, and hybrid models combining multiple approaches.' },
      { question: 'How do I choose the right GTM motion?', answer: 'Consider your product complexity, target customer, average deal size, buying behavior, and competitive landscape. Test different motions and measure customer acquisition cost, sales cycle length, and expansion revenue.' },
      { question: 'Can I change my GTM motion?', answer: 'Yes, but it requires significant changes to product, marketing, sales, and customer success. Plan for a 6-12 month transition with clear milestones and metrics.' }
    ],
    featured: true,
    emerging: false,
    status: 'established'
  },
  {
    id: 'product-led-growth',
    slug: 'product-led-growth',
    term: 'Product-Led Growth',
    category: 'gtm',
    shortDefinition: 'A go-to-market strategy where the product itself is the primary driver of customer acquisition, conversion, and expansion through self-serve experiences and viral loops.',
    fullDefinition: 'Product-Led Growth (PLG) is a business methodology where the product is the main vehicle for acquiring, converting, and retaining customers. Instead of relying on sales teams or marketing campaigns, PLG companies offer free trials, freemium models, or low-friction onboarding that lets users experience value immediately. Growth happens through product virality, network effects, and organic expansion as users invite colleagues and upgrade to paid plans.',
    whyItMatters: 'PLG reduces customer acquisition cost, shortens sales cycles, and creates more predictable revenue through product-led expansion. It aligns product development with customer value delivery and creates a competitive moat through network effects. Companies like Slack, Zoom, and Notion have demonstrated that PLG can scale to billions in revenue.',
    howItWorks: 'PLG works by removing friction from the buying process. Users sign up instantly, experience core value without talking to sales, and naturally invite team members. The product includes built-in viral mechanics (sharing, collaboration, integrations) and clear upgrade paths. Data from product usage informs sales outreach for enterprise deals and identifies expansion opportunities.',
    example: 'Slack uses PLG: teams start with a free workspace, invite colleagues organically, hit message limits, and upgrade to paid plans. The product sells itself through daily use, and sales teams focus on enterprise expansion rather than initial acquisition.',
    useCases: ['SaaS products with low complexity', 'Tools with network effects', 'Products with clear freemium value', 'Markets with high self-serve adoption'],
    commonMistakes: ['Expecting PLG to work for complex enterprise products', 'Neglecting sales team for enterprise deals', 'Poor onboarding experience', 'Missing clear conversion triggers', 'Underestimating product investment required'],
    relatedTerms: ['product-led-sales', 'freemium', 'viral-loops', 'product-qualified-lead'],
    synonyms: ['PLG', 'Product-Led'],
    confusedWith: ['sales-led-growth', 'growth-marketing'],
    primaryKeyword: 'product-led growth',
    secondaryKeywords: ['PLG', 'product-led', 'self-serve growth'],
    publishedDate: '2024-09-15',
    updatedDate: '2024-09-15',
    sources: [{ title: 'OpenView Product-Led Growth', url: 'https://openviewpartners.com/product-led-growth/' }],
    faq: [
      { question: 'What makes a product suitable for PLG?', answer: 'Products with immediate value, low complexity, network effects, clear freemium value, and natural expansion paths work best for PLG.' },
      { question: 'Do PLG companies still need sales teams?', answer: 'Yes, for enterprise deals and expansion revenue. PLG handles acquisition, but sales teams close large deals and drive expansion.' },
      { question: 'How do I measure PLG success?', answer: 'Track product adoption rate, time-to-value, viral coefficient, free-to-paid conversion rate, net revenue retention, and customer acquisition cost.' }
    ],
    featured: true,
    emerging: false,
    status: 'established'
  },
  {
    id: 'sales-led-growth',
    slug: 'sales-led-growth',
    term: 'Sales-Led Growth',
    category: 'gtm',
    shortDefinition: 'A go-to-market strategy where sales teams drive customer acquisition through outbound prospecting, demos, and relationship-building, typically for complex or high-value products.',
    fullDefinition: 'Sales-Led Growth (SLG) is a go-to-market approach where sales representatives are the primary drivers of customer acquisition and revenue growth. This model uses outbound prospecting, marketing-qualified leads, product demos, proof-of-concepts, and relationship-building to move prospects through the sales funnel. SLG is common for enterprise software, high-ACV products, and markets requiring education or customization.',
    whyItMatters: 'SLG is necessary when products are complex, expensive, or require customization. It allows for high-touch sales processes, complex procurement navigation, and relationship-building that drives large contract values. SLG creates predictable revenue through structured sales pipelines and enables expansion through account management.',
    howItWorks: 'SLG works by generating leads through marketing campaigns, events, and outbound prospecting. Sales development representatives (SDRs) qualify leads and book meetings for account executives (AEs). AEs run discovery calls, product demos, and negotiate contracts. Customer success teams manage onboarding and expansion. The process is supported by CRM, sales enablement, and marketing automation.',
    example: 'An enterprise CRM platform uses SLG: marketing generates leads through webinars and ads, SDRs qualify and book demos, AEs run technical demos and ROI workshops, procurement handles security reviews, and customer success drives adoption and expansion.',
    useCases: ['High-ACV products', 'Complex products requiring education', 'Enterprise sales', 'Markets with long sales cycles', 'Products requiring customization'],
    commonMistakes: ['Using SLG for simple self-serve products', 'Poor lead qualification', 'Misaligned sales and marketing', 'Underinvesting in sales enablement', 'Ignoring product-led expansion opportunities'],
    relatedTerms: ['product-led-growth', 'sales-development-representative', 'account-executive', 'sales-qualified-lead'],
    synonyms: ['SLG', 'Sales-Led'],
    confusedWith: ['product-led-growth', 'outbound-marketing'],
    primaryKeyword: 'sales-led growth',
    secondaryKeywords: ['SLG', 'sales-led', 'enterprise sales'],
    publishedDate: '2024-09-15',
    updatedDate: '2024-09-15',
    sources: [{ title: 'Gartner Sales-Led Growth', url: 'https://www.gartner.com/en/sales/sales-led-growth' }],
    faq: [
      { question: 'When should I use sales-led growth?', answer: 'Use SLG for high-ACV products, complex solutions, enterprise sales, or when products require customization and relationship-building.' },
      { question: 'How is SLG different from PLG?', answer: 'SLG relies on sales teams for acquisition, while PLG uses the product itself. SLG has longer sales cycles but higher ACV; PLG has shorter cycles but lower initial ACV.' },
      { question: 'Can I transition from SLG to PLG?', answer: 'Yes, but it requires significant product changes, new pricing models, and organizational restructuring. Plan for a 12-18 month transition.' }
    ],
    featured: true,
    emerging: false,
    status: 'established'
  },
  // GTM Engineering (continuing from above)
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
  // Continue GTM terms
  {
    id: 'hybrid-gtm',
    slug: 'hybrid-gtm',
    term: 'Hybrid GTM',
    category: 'gtm',
    shortDefinition: 'A go-to-market strategy that combines multiple motions (product-led, sales-led, partner-led) to optimize customer acquisition and expansion across different customer segments.',
    fullDefinition: 'Hybrid GTM combines elements of product-led growth, sales-led growth, and partner-led growth to create a flexible, multi-motion go-to-market approach. Rather than committing to a single motion, hybrid GTM uses the most efficient motion for each customer segment or buying scenario. For example, SMB customers might use self-serve PLG while enterprise customers use SLG, and channel partners handle specific verticals.',
    whyItMatters: 'Hybrid GTM maximizes market coverage and efficiency by matching the right motion to each customer segment. It reduces customer acquisition cost, improves market penetration, and creates multiple paths to revenue. Companies using hybrid GTM can scale more effectively than those locked into a single motion.',
    howItWorks: 'Hybrid GTM works by defining customer segments and assigning the optimal motion for each. Product-led motions handle self-serve customers, sales-led motions handle enterprise deals, and partner motions handle specific verticals or geographies. The motions are integrated through shared data, unified customer profiles, and coordinated handoffs.',
    example: 'A cloud infrastructure company uses hybrid GTM: developers use self-serve PLG with free tier, mid-market companies use inside sales with demos, enterprise customers use field sales with POCs, and partners handle specific industries like healthcare and finance.',
    useCases: ['Multi-segment go-to-market', 'Geographic expansion', 'Vertical market coverage', 'Scaling across customer sizes'],
    commonMistakes: ['Inconsistent customer experience across motions', 'Poor data integration between motions', 'Conflicting incentives between teams', 'Underinvesting in motion-specific capabilities'],
    relatedTerms: ['product-led-growth', 'sales-led-growth', 'partner-led-growth', 'gtm-motion'],
    synonyms: ['Multi-Motion GTM', 'Multi-Channel GTM'],
    confusedWith: ['omnichannel-marketing', 'hybrid-selling'],
    primaryKeyword: 'hybrid GTM',
    secondaryKeywords: ['hybrid go-to-market', 'multi-motion GTM', 'combined GTM'],
    publishedDate: '2024-09-15',
    updatedDate: '2024-09-15',
    sources: [{ title: 'OpenView Hybrid GTM', url: 'https://openviewpartners.com/hybrid-gtm/' }],
    faq: [
      { question: 'When should I use hybrid GTM?', answer: 'Use hybrid GTM when you serve multiple customer segments with different needs, sell across different geographies, or want to maximize market coverage with multiple motions.' },
      { question: 'How do I integrate multiple GTM motions?', answer: 'Integrate through shared CRM data, unified customer profiles, coordinated handoffs, and aligned incentives. Ensure consistent customer experience across all motions.' },
      { question: 'What are the challenges of hybrid GTM?', answer: 'Main challenges include maintaining consistent customer experience, integrating data across motions, avoiding channel conflicts, and managing organizational complexity.' }
    ],
    featured: false,
    emerging: true,
    status: 'emerging'
  },
  {
    id: 'founder-led-growth',
    slug: 'founder-led-growth',
    term: 'Founder-Led Growth',
    category: 'gtm',
    shortDefinition: 'An early-stage go-to-market approach where founders personally drive customer acquisition through direct outreach, relationships, and deep product knowledge.',
    fullDefinition: 'Founder-Led Growth is a go-to-market strategy where company founders personally lead customer acquisition efforts in the early stages. Founders use their deep product knowledge, industry connections, and passion to close initial customers, gather feedback, and validate product-market fit. This approach is common in pre-seed and seed-stage startups before hiring dedicated sales teams.',
    whyItMatters: 'Founder-led growth is critical in early stages because founders have the deepest product understanding, strongest conviction, and best ability to iterate based on customer feedback. It accelerates product-market fit validation, builds initial customer relationships, and creates a foundation for scaling sales processes later.',
    howItWorks: 'Founders personally prospect, demo, and close customers. They use their networks, attend events, and conduct direct outreach. They gather detailed customer feedback and iterate on product and messaging. They document successful sales processes and hand off to hired sales reps as the company scales.',
    example: 'A Y Combinator startup founder personally demos the product to 100 potential customers, closes 10 initial customers, gathers feedback to improve the product, documents the sales process, and eventually hires the first sales rep to scale the validated process.',
    useCases: ['Pre-seed and seed-stage startups', 'Product-market fit validation', 'Initial customer acquisition', 'Sales process documentation'],
    commonMistakes: ['Founders not doing enough direct customer contact', 'Not documenting learnings for future sales team', 'Founders unable to transition from selling to managing sales', 'Delaying hiring of dedicated sales team'],
    relatedTerms: ['sales-led-growth', 'product-market-fit', 'customer-development'],
    synonyms: ['Founder-Led Sales'],
    confusedWith: ['sales-led-growth', 'customer-development'],
    primaryKeyword: 'founder-led growth',
    secondaryKeywords: ['founder-led sales', 'founder selling'],
    publishedDate: '2024-09-15',
    updatedDate: '2024-09-15',
    sources: [{ title: 'Y Combinator: Founder-Led Sales', url: 'https://www.ycombinator.com/library/6b-founder-led-sales' }],
    faq: [
      { question: 'When should founders stop selling personally?', answer: 'Founders should transition when they have validated product-market fit, documented the sales process, and are spending less than 50% of their time on sales. Typically this occurs at Series A or when reaching $1-2M ARR.' },
      { question: 'How do founders transition to hiring sales?', answer: 'Document the sales process, create enablement materials, hire first sales rep, and gradually transition customer relationships. Founders should remain involved in strategic accounts.' },
      { question: 'What skills do founders need for founder-led sales?', answer: 'Strong communication, deep product knowledge, ability to handle rejection, customer empathy, and ability to document and teach processes.' }
    ],
    featured: false,
    emerging: false,
    status: 'established'
  },
  {
    id: 'community-led-growth',
    slug: 'community-led-growth',
    term: 'Community-Led Growth',
    category: 'gtm',
    shortDefinition: 'A go-to-market strategy that uses community engagement, user-generated content, and network effects to drive customer acquisition, retention, and expansion.',
    fullDefinition: 'Community-Led Growth is a go-to-market strategy that leverages community engagement as the primary engine for customer acquisition, retention, and expansion. Companies invest in building active user communities through forums, events, user-generated content, and advocacy programs. Growth happens through community-driven referrals, peer recommendations, and organic advocacy.',
    whyItMatters: 'Community-led growth reduces customer acquisition cost, improves retention through belonging, and creates organic growth through network effects. Communities provide valuable product feedback, create support content, and generate authentic advocacy. Companies like Figma, Notion, and Zapier have demonstrated that strong communities drive sustainable growth.',
    howItWorks: 'Community-led growth works by creating valuable community experiences (forums, events, meetups), empowering community leaders, encouraging user-generated content, and facilitating peer-to-peer connections. The community becomes a growth engine through referrals, testimonials, and organic advocacy. Product teams use community feedback for development, and marketing amplifies community-generated content.',
    example: 'Figma uses community-led growth: designers share templates and plugins, host meetups, create tutorials, and refer colleagues. The community generates content, provides support, and drives organic growth through network effects.',
    useCases: ['Developer tools', 'Design tools', 'Professional networks', 'Open source software', 'Creator tools'],
    commonMistakes: ['Treating community as marketing channel rather than product', 'Not investing in community infrastructure', 'Ignoring community feedback', 'Over-moderating and stifling organic growth'],
    relatedTerms: ['viral-loops', 'user-generated-content', 'advocacy-marketing', 'network-effects'],
    synonyms: ['CLG', 'Community-Led'],
    confusedWith: ['social-media-marketing', 'influencer-marketing'],
    primaryKeyword: 'community-led growth',
    secondaryKeywords: ['CLG', 'community-led', 'community growth'],
    publishedDate: '2024-09-15',
    updatedDate: '2024-09-15',
    sources: [{ title: 'Community-Led Growth Playbook', url: 'https://www.communityled.com/' }],
    faq: [
      { question: 'What makes a good community for CLG?', answer: 'Good communities have clear value for members, active moderation, user-generated content, regular events, and integration with the product experience.' },
      { question: 'How do I measure community-led growth?', answer: 'Track community size, engagement rate, user-generated content volume, community-sourced referrals, retention rates for community members, and net promoter score.' },
      { question: 'How long does it take to build a community?', answer: 'Building an active community typically takes 12-24 months. Focus on providing value first, and growth will follow organically.' }
    ],
    featured: false,
    emerging: true,
    status: 'emerging'
  },
  // Continue with remaining GTM terms and all other categories...
  // Adding remaining GTM terms
  {
    id: 'partner-led-growth',
    slug: 'partner-led-growth',
    term: 'Partner-Led Growth',
    category: 'gtm',
    shortDefinition: 'A go-to-market strategy that uses channel partners, integrations, and ecosystem partnerships to drive customer acquisition and expansion.',
    fullDefinition: 'Partner-Led Growth is a go-to-market strategy that leverages partnerships with other companies, agencies, consultants, and technology integrators to drive customer acquisition and expansion. Instead of building a large direct sales team, companies enable partners to sell, implement, and support their products. This creates a scalable growth engine through partner networks.',
    whyItMatters: 'Partner-led growth enables rapid market expansion without proportional increases in headcount. Partners bring existing customer relationships, industry expertise, and implementation capabilities. This model is particularly effective for complex products requiring implementation, industry-specific solutions, and geographic expansion.',
    howItWorks: 'Partner-led growth works by recruiting and enabling partners through training, certification, co-marketing, and financial incentives. Partners refer customers, resell products, provide implementation services, and offer ongoing support. The company provides partner portals, deal registration, and partner success teams to ensure partner success.',
    example: 'Salesforce uses partner-led growth: consulting partners implement Salesforce, ISV partners build industry solutions on the platform, and reseller partners sell to specific geographies. Partners drive 70%+ of Salesforce revenue.',
    useCases: ['Complex products requiring implementation', 'Industry-specific solutions', 'Geographic expansion', 'Scaling without proportional headcount'],
    commonMistakes: ['Treating partners as sales channel rather than strategic relationships', 'Poor partner enablement', 'Channel conflicts with direct sales', 'Inadequate partner support'],
    relatedTerms: ['channel-sales', 'ecosystem-marketing', 'integration-partnerships'],
    synonyms: ['PLG (Partner-Led)', 'Channel-Led Growth'],
    confusedWith: ['affiliate-marketing', 'referral-marketing'],
    primaryKeyword: 'partner-led growth',
    secondaryKeywords: ['partner-led', 'channel-led growth', 'partner ecosystem'],
    publishedDate: '2024-09-15',
    updatedDate: '2024-09-15',
    sources: [{ title: 'PartnerLed Growth Guide', url: 'https://www.partnerled.com/' }],
    faq: [
      { question: 'What types of partners should I work with?', answer: 'Consider consulting partners for implementation, ISV partners for integrations, reseller partners for geographic coverage, and agency partners for specific industries.' },
      { question: 'How do I incentivize partners?', answer: 'Use tiered commission structures, deal registration protection, co-marketing funds, training certifications, and partner success programs.' },
      { question: 'How do I avoid channel conflicts?', answer: 'Clearly define partner vs direct segments, use deal registration, and ensure pricing consistency across channels.' }
    ],
    featured: false,
    emerging: false,
    status: 'established'
  },
  {
    id: 'ecosystem-led-growth',
    slug: 'ecosystem-led-growth',
    term: 'Ecosystem-Led Growth',
    category: 'gtm',
    shortDefinition: 'A go-to-market strategy that builds and leverages a network of interconnected partners, integrations, and complementary products to drive growth.',
    fullDefinition: 'Ecosystem-Led Growth is a go-to-market strategy that creates value through a network of interconnected partners, integrations, developers, and complementary products. Rather than building everything in-house, companies create platforms that enable others to build on top of them. Growth happens through network effects as the ecosystem becomes more valuable with each new participant.',
    whyItMatters: 'Ecosystem-led growth creates powerful network effects, increases product stickiness, and enables rapid innovation through third-party contributions. It creates competitive moats as ecosystems become difficult to replicate. Companies like Shopify, Salesforce, and Apple have built trillion-dollar valuations through ecosystem strategies.',
    howItWorks: 'Ecosystem-led growth works by creating platforms with APIs, marketplaces, developer programs, and partner networks. Third parties build integrations, apps, and services on the platform. The platform company provides infrastructure, distribution, and monetization. Network effects increase value as more participants join.',
    example: 'Shopify uses ecosystem-led growth: developers build apps, designers create themes, agencies provide services, and merchants build stores. Each participant adds value to the ecosystem, creating network effects that drive growth.',
    useCases: ['Platform businesses', 'Marketplace models', 'Developer platforms', 'Integration platforms'],
    commonMistakes: ['Building closed platforms', 'Poor developer experience', 'Inadequate partner support', 'Not sharing revenue fairly'],
    relatedTerms: ['partner-led-growth', 'platform-business', 'network-effects', 'developer-relations'],
    synonyms: ['Platform-Led Growth', 'Network-Led Growth'],
    confusedWith: ['partner-led-growth', 'marketplace-business'],
    primaryKeyword: 'ecosystem-led growth',
    secondaryKeywords: ['ecosystem-led', 'platform-led growth', 'network effects'],
    publishedDate: '2024-09-15',
    updatedDate: '2024-09-15',
    sources: [{ title: 'Platform Ecosystem Strategy', url: 'https://www.platformstrategy.org/' }],
    faq: [
      { question: 'What makes a successful ecosystem?', answer: 'Successful ecosystems have clear value for all participants, strong APIs, fair revenue sharing, excellent developer experience, and network effects that increase value with participation.' },
      { question: 'How do I monetize an ecosystem?', answer: 'Monetize through platform fees, revenue sharing, premium features, developer tools, and marketplace commissions.' },
      { question: 'How long does it take to build an ecosystem?', answer: 'Building a thriving ecosystem typically takes 3-5 years. Focus on providing value to early participants and network effects will compound over time.' }
    ],
    featured: false,
    emerging: true,
    status: 'emerging'
  },
  // Adding remaining GTM terms to complete category A
  {
    id: 'revenue-led-growth',
    slug: 'revenue-led-growth',
    term: 'Revenue-Led Growth',
    category: 'gtm',
    shortDefinition: 'A go-to-market strategy that prioritizes revenue efficiency, unit economics, and sustainable growth over top-line growth at any cost.',
    fullDefinition: 'Revenue-Led Growth is a go-to-market philosophy that prioritizes efficient, sustainable revenue growth over aggressive top-line expansion. It focuses on unit economics, customer lifetime value, payback periods, and capital efficiency. This approach emerged as a correction to the growth-at-all-costs mentality of the 2010s, emphasizing profitability and sustainable unit economics.',
    whyItMatters: 'Revenue-led growth creates more resilient businesses with better unit economics, longer runways, and stronger fundamentals. It reduces dependence on continuous fundraising and creates more predictable, profitable growth. This approach is particularly important in higher interest rate environments and for companies seeking profitability.',
    howItWorks: 'Revenue-led growth works by rigorously measuring unit economics (CAC, LTV, payback period), optimizing for efficiency metrics (Rule of 40, magic number), focusing on high-value customer segments, and investing in retention and expansion. Growth decisions are made based on ROI and payback periods rather than top-line targets.',
    example: 'A B2B SaaS company uses revenue-led growth: focuses on customers with <12 month payback periods, prioritizes expansion revenue from existing customers, maintains 40%+ gross margins, and grows at 30% annually with positive free cash flow rather than growing at 100% with negative cash flow.',
    useCases: ['Bootstrapped companies', 'Companies seeking profitability', 'Higher interest rate environments', 'Sustainable growth models'],
    commonMistakes: ['Growing too slowly and losing market share', 'Over-optimizing for efficiency at expense of growth', 'Ignoring growth investments entirely', 'Poor communication with investors about strategy'],
    relatedTerms: ['unit-economics', 'customer-acquisition-cost', 'lifetime-value', 'rule-of-40'],
    synonyms: ['Efficient Growth', 'Profitable Growth'],
    confusedWith: ['growth-marketing', 'performance-marketing'],
    primaryKeyword: 'revenue-led growth',
    secondaryKeywords: ['revenue-led', 'efficient growth', 'profitable growth'],
    publishedDate: '2024-09-15',
    updatedDate: '2024-09-15',
    sources: [{ title: 'SaaS Capital Revenue Efficiency', url: 'https://www.saascapital.com/' }],
    faq: [
      { question: 'What metrics matter for revenue-led growth?', answer: 'Focus on CAC payback period, LTV:CAC ratio, net revenue retention, gross margins, Rule of 40, and free cash flow margin.' },
      { question: 'How is revenue-led growth different from growth-at-all-costs?', answer: 'Revenue-led growth prioritizes unit economics and profitability, while growth-at-all-costs prioritizes top-line growth regardless of efficiency or profitability.' },
      { question: 'Can I transition from growth-at-all-costs to revenue-led?', answer: 'Yes, but it requires shifting metrics, potentially slowing growth, improving unit economics, and communicating strategy changes to investors and team.' }
    ],
    featured: false,
    emerging: true,
    status: 'emerging'
  },
  {
    id: 'gtm-intelligence',
    slug: 'gtm-intelligence',
    term: 'GTM Intelligence',
    category: 'gtm',
    shortDefinition: 'The use of data, analytics, and AI to inform go-to-market decisions, identify opportunities, and optimize GTM execution.',
    fullDefinition: 'GTM Intelligence refers to the systematic collection, analysis, and application of data to inform go-to-market strategy and execution. It encompasses market intelligence, competitive intelligence, customer intelligence, and sales intelligence. GTM intelligence uses data analytics, AI, and business intelligence tools to identify market opportunities, understand customer behavior, track competitive moves, and optimize GTM execution.',
    whyItMatters: 'GTM intelligence enables data-driven decision making, reduces guesswork, and improves GTM efficiency. It helps companies identify high-potential segments, understand buyer behavior, track competitive threats, and optimize resource allocation. Companies with strong GTM intelligence outperform competitors through better targeting, positioning, and execution.',
    howItWorks: 'GTM intelligence works by collecting data from multiple sources (CRM, marketing automation, product analytics, market research, competitive monitoring), analyzing patterns and trends, generating insights, and applying insights to GTM decisions. AI and machine learning enhance analysis through predictive modeling, pattern recognition, and automated insights.',
    example: 'A B2B SaaS company uses GTM intelligence: analyzes product usage data to identify expansion opportunities, tracks competitor pricing changes, monitors customer sentiment, identifies high-intent accounts through buying signals, and uses insights to prioritize sales outreach and marketing campaigns.',
    useCases: ['Market opportunity identification', 'Competitive positioning', 'Customer segmentation', 'Sales territory planning', 'Marketing campaign optimization'],
    commonMistakes: ['Collecting data without analysis', 'Analysis without action', 'Relying on single data sources', 'Not integrating intelligence into workflows'],
    relatedTerms: ['competitive-intelligence', 'market-intelligence', 'sales-intelligence', 'customer-intelligence'],
    synonyms: ['GTM Analytics', 'Market Intelligence'],
    confusedWith: ['business-intelligence', 'data-analytics'],
    primaryKeyword: 'GTM intelligence',
    secondaryKeywords: ['go-to-market intelligence', 'market intelligence', 'sales intelligence'],
    publishedDate: '2024-09-15',
    updatedDate: '2024-09-15',
    sources: [{ title: '6sense GTM Intelligence', url: 'https://6sense.com/' }],
    faq: [
      { question: 'What data sources are important for GTM intelligence?', answer: 'Key sources include CRM data, product analytics, marketing automation, intent data, competitive intelligence, customer feedback, and market research.' },
      { question: 'How do I build a GTM intelligence capability?', answer: 'Start by defining key questions, collecting relevant data, building analysis capabilities, integrating insights into workflows, and continuously refining based on outcomes.' },
      { question: 'What tools support GTM intelligence?', answer: 'Tools include CRM (Salesforce, HubSpot), analytics (Amplitude, Mixpanel), intent data (6sense, Bombora), competitive intelligence (Klue, Crayon), and BI tools (Looker, Tableau).' }
    ],
    featured: false,
    emerging: true,
    status: 'emerging'
  },
  {
    id: 'gtm-operations',
    slug: 'gtm-operations',
    term: 'GTM Operations',
    category: 'gtm',
    shortDefinition: 'The operational infrastructure, processes, and systems that enable efficient go-to-market execution across marketing, sales, and customer success.',
    fullDefinition: 'GTM Operations (GTM Ops) encompasses the operational infrastructure, processes, tools, and systems that enable efficient go-to-market execution. It includes marketing operations, sales operations, revenue operations, and customer success operations. GTM ops focuses on process optimization, technology stack management, data integrity, reporting, and cross-functional alignment to improve GTM efficiency and effectiveness.',
    whyItMatters: 'GTM operations creates efficiency, consistency, and scalability in go-to-market execution. It reduces manual work, improves data quality, enables better decision making, and ensures cross-functional alignment. Strong GTM ops is the foundation for scaling revenue operations and supporting growth without proportional increases in headcount.',
    howItWorks: 'GTM operations works by designing and optimizing GTM processes, implementing and managing technology stacks, ensuring data integrity and reporting, creating cross-functional workflows, and continuously improving operational efficiency. GTM ops teams work across marketing, sales, and customer success to ensure smooth execution and alignment.',
    example: 'A B2B SaaS company has a GTM ops team that manages CRM and marketing automation, designs lead routing and qualification processes, creates reporting dashboards, optimizes sales processes, manages technology stack, and ensures data quality across systems.',
    useCases: ['Process optimization', 'Technology stack management', 'Data quality and reporting', 'Cross-functional alignment', 'Scaling GTM operations'],
    commonMistakes: ['Treating ops as administrative rather than strategic', 'Poor technology stack integration', 'Inadequate data governance', 'Not measuring operational efficiency'],
    relatedTerms: ['revenue-operations', 'marketing-operations', 'sales-operations', 'gtm-engineering'],
    synonyms: ['GTM Ops', 'Revenue Operations'],
    confusedWith: ['revenue-operations', 'marketing-operations'],
    primaryKeyword: 'GTM operations',
    secondaryKeywords: ['GTM ops', 'go-to-market operations', 'revenue operations'],
    publishedDate: '2024-09-15',
    updatedDate: '2024-09-15',
    sources: [{ title: 'GTM Ops Guide', url: 'https://www.gtmschool.com/' }],
    faq: [
      { question: 'What does a GTM ops team do?', answer: 'GTM ops manages processes, technology stacks, data quality, reporting, and cross-functional workflows across marketing, sales, and customer success.' },
      { question: 'How is GTM ops different from revenue ops?', answer: 'GTM ops is broader and includes marketing ops, sales ops, and customer success ops. Revenue ops focuses specifically on revenue processes and alignment.' },
      { question: 'When should I hire GTM ops?', answer: 'Hire GTM ops when you have 10+ people in GTM roles, multiple systems, process inefficiencies, or need to scale operations.' }
    ],
    featured: false,
    emerging: true,
    status: 'emerging'
  },
  {
    id: 'gtm-systems',
    slug: 'gtm-systems',
    term: 'GTM Systems',
    category: 'gtm',
    shortDefinition: 'The integrated technology stack, processes, and workflows that enable repeatable, scalable go-to-market execution.',
    fullDefinition: 'GTM Systems refers to the integrated combination of technology, processes, data, and workflows that enable repeatable and scalable go-to-market execution. It encompasses the entire technology stack (CRM, marketing automation, sales enablement, analytics), operational processes (lead management, sales process, customer onboarding), and data flows that connect marketing, sales, and customer success.',
    whyItMatters: 'GTM systems create consistency, efficiency, and scalability in go-to-market execution. They reduce manual work, improve data quality, enable automation, and provide visibility into the entire customer journey. Strong GTM systems are essential for scaling revenue operations and supporting growth.',
    howItWorks: 'GTM systems work by integrating technology platforms, designing operational processes, establishing data flows, and creating automated workflows. The systems connect marketing lead generation, sales pipeline management, and customer success operations into a unified, data-driven engine.',
    example: 'A B2B SaaS company has GTM systems that integrate HubSpot (marketing automation), Salesforce (CRM), Gong (conversation intelligence), and Amplitude (product analytics) with automated lead routing, sales processes, and customer health scoring.',
    useCases: ['Scaling GTM operations', 'Improving process efficiency', 'Enabling data-driven decisions', 'Reducing manual work'],
    commonMistakes: ['Technology without process design', 'Poor system integration', 'Ignoring user adoption', 'Not measuring system effectiveness'],
    relatedTerms: ['gtm-operations', 'marketing-technology', 'revenue-operations', 'gtm-engineering'],
    synonyms: ['GTM Infrastructure', 'Revenue Systems'],
    confusedWith: ['marketing-technology', 'sales-enablement'],
    primaryKeyword: 'GTM systems',
    secondaryKeywords: ['go-to-market systems', 'GTM infrastructure', 'revenue systems'],
    publishedDate: '2024-09-15',
    updatedDate: '2024-09-15',
    sources: [{ title: 'GTM Systems Architecture', url: 'https://www.revenue.io/' }],
    faq: [
      { question: 'What should be included in GTM systems?', answer: 'GTM systems should include CRM, marketing automation, sales enablement, analytics, customer success platforms, and integration layers connecting all systems.' },
      { question: 'How do I design GTM systems?', answer: 'Start with process design, select technology to support processes, ensure data flows between systems, automate workflows, and continuously optimize based on usage and outcomes.' },
      { question: 'How do I measure GTM system effectiveness?', answer: 'Measure user adoption, process cycle times, data quality, automation rates, and business outcomes like pipeline velocity and customer lifetime value.' }
    ],
    featured: false,
    emerging: true,
    status: 'emerging'
  },
  {
    id: 'gtm-stack',
    slug: 'gtm-stack',
    term: 'GTM Stack',
    category: 'gtm',
    shortDefinition: 'The collection of technology tools and platforms used to execute go-to-market strategy across marketing, sales, and customer success.',
    fullDefinition: 'GTM Stack refers to the complete collection of technology tools, platforms, and software used to execute go-to-market strategy. It includes marketing technology (marketing automation, analytics, content management), sales technology (CRM, sales enablement, conversation intelligence), and customer success technology (customer success platforms, support tools, analytics). The GTM stack is the technological foundation for GTM execution.',
    whyItMatters: 'The GTM stack enables efficient, scalable, and data-driven go-to-market execution. The right stack improves productivity, provides visibility, enables automation, and supports better decision making. The wrong stack creates inefficiencies, data silos, and operational friction.',
    howItWorks: 'GTM stack works by integrating multiple technology platforms that support different aspects of GTM execution. Marketing tools generate and nurture leads, sales tools manage pipeline and close deals, customer success tools drive adoption and expansion, and analytics tools provide visibility across the customer journey.',
    example: 'A typical B2B SaaS GTM stack includes HubSpot (marketing automation), Salesforce (CRM), Gong (conversation intelligence), Amplitude (product analytics), Gainsight (customer success), and Looker (analytics) integrated through APIs and data pipelines.',
    useCases: ['Executing GTM strategy', 'Scaling operations', 'Improving productivity', 'Enabling data-driven decisions'],
    commonMistakes: ['Tool sprawl without integration', 'Choosing tools without process design', 'Poor user adoption', 'Not measuring ROI'],
    relatedTerms: ['marketing-technology', 'sales-technology', 'gtm-systems', 'marketing-operations'],
    synonyms: ['Marketing Stack', 'Sales Stack', 'Revenue Stack'],
    confusedWith: ['marketing-technology', 'sales-enablement'],
    primaryKeyword: 'GTM stack',
    secondaryKeywords: ['go-to-market stack', 'marketing stack', 'sales stack'],
    publishedDate: '2024-09-15',
    updatedDate: '2024-09-15',
    sources: [{ title: 'Chiefmartec Marketing Technology', url: 'https://chiefmartec.com/' }],
    faq: [
      { question: 'What tools should be in a GTM stack?', answer: 'Essential tools include CRM, marketing automation, sales enablement, analytics, customer success platform, and integration tools. Specific tools depend on company size, stage, and GTM motion.' },
      { question: 'How do I choose GTM stack tools?', answer: 'Start with process requirements, evaluate tools based on fit, integration capabilities, scalability, and total cost of ownership. Prioritize user experience and adoption.' },
      { question: 'How often should I update my GTM stack?', answer: 'Review stack annually, replace underperforming tools, add new capabilities as needed, and ensure integration as you add tools.' }
    ],
    featured: false,
    emerging: false,
    status: 'established'
  },
  {
    id: 'gtm-efficiency',
    slug: 'gtm-efficiency',
    term: 'GTM Efficiency',
    category: 'gtm',
    shortDefinition: 'A measure of how effectively a company converts go-to-market investment into revenue, typically measured through metrics like CAC payback, LTV:CAC, and Rule of 40.',
    fullDefinition: 'GTM Efficiency measures how effectively a company converts go-to-market investment (marketing and sales spend) into revenue. It encompasses metrics like customer acquisition cost (CAC) payback period, LTV:CAC ratio, Rule of 40, magic number, and sales and marketing efficiency ratios. GTM efficiency is a critical measure of business health and sustainability, particularly for venture-backed companies seeking profitability.',
    whyItMatters: 'GTM efficiency determines business sustainability, scalability, and valuation. Efficient GTM means the company can grow without proportional increases in spend, creating operating leverage and path to profitability. Investors increasingly prioritize GTM efficiency over pure growth rate.',
    howItWorks: 'GTM efficiency is measured through various metrics: CAC payback period (months to recover customer acquisition cost), LTV:CAC ratio (lifetime value divided by acquisition cost), Rule of 40 (growth rate + profit margin should exceed 40%), and magic number (net new ARR / previous quarter sales and marketing spend). Companies track these metrics to optimize GTM investment and improve efficiency.',
    example: 'A B2B SaaS company achieves strong GTM efficiency: 12-month CAC payback, 5:1 LTV:CAC ratio, 50% Rule of 40 (30% growth + 20% FCF margin), and 1.2 magic number, indicating efficient conversion of GTM investment to revenue.',
    useCases: ['Investor reporting', 'Strategic planning', 'Resource allocation', 'Performance optimization'],
    commonMistakes: ['Focusing only on growth rate', 'Ignoring unit economics', 'Not measuring payback periods', 'Optimizing for wrong metrics'],
    relatedTerms: ['customer-acquisition-cost', 'lifetime-value', 'rule-of-40', 'revenue-led-growth'],
    synonyms: ['GTM Effectiveness', 'Revenue Efficiency'],
    confusedWith: ['marketing-roi', 'sales-productivity'],
    primaryKeyword: 'GTM efficiency',
    secondaryKeywords: ['go-to-market efficiency', 'revenue efficiency', 'GTM effectiveness'],
    publishedDate: '2024-09-15',
    updatedDate: '2024-09-15',
    sources: [{ title: 'SaaS Capital Efficiency Metrics', url: 'https://www.saascapital.com/' }],
    faq: [
      { question: 'What are the key GTM efficiency metrics?', answer: 'Key metrics include CAC payback period, LTV:CAC ratio, Rule of 40, magic number, sales and marketing as % of revenue, and net revenue retention.' },
      { question: 'What is good GTM efficiency?', answer: 'Good GTM efficiency typically means <18 month CAC payback, >3:1 LTV:CAC, >40% Rule of 40, and >0.75 magic number. Best-in-class companies achieve <12 month payback and >5:1 LTV:CAC.' },
      { question: 'How do I improve GTM efficiency?', answer: 'Improve targeting, optimize conversion rates, focus on high-value segments, improve retention and expansion, reduce sales cycle length, and invest in automation and self-serve.' }
    ],
    featured: false,
    emerging: true,
    status: 'emerging'
  },
  // B. GROWTH MARKETING
  {
    id: 'growth-marketing',
    slug: 'growth-marketing',
    term: 'Growth Marketing',
    category: 'growth',
    shortDefinition: 'A data-driven, experimentation-focused approach to marketing that focuses on the entire customer lifecycle to drive sustainable, scalable growth.',
    fullDefinition: 'Growth Marketing is a holistic, data-driven approach to marketing that focuses on the entire customer lifecycle (acquisition, activation, retention, revenue, referral) rather than just top-of-funnel awareness. Growth marketers use rapid experimentation, data analysis, and cross-functional collaboration to identify and optimize growth levers across the entire funnel. Unlike traditional marketing focused on campaigns and channels, growth marketing focuses on systematic, scalable growth through continuous testing and optimization.',
    whyItMatters: 'Growth marketing creates sustainable, scalable growth by optimizing the entire customer journey. It reduces customer acquisition cost, improves retention, increases lifetime value, and creates compounding growth through systematic optimization. Growth marketing is essential for startups and scale-ups seeking efficient, predictable growth.',
    howItWorks: 'Growth marketing works by analyzing the entire customer funnel, identifying bottlenecks and opportunities, designing experiments to test hypotheses, measuring results, and scaling successful experiments. Growth marketers use tools like analytics, A/B testing, automation, and product analytics to drive growth across acquisition, activation, retention, and expansion.',
    example: 'A growth marketing team at a SaaS company analyzes the funnel, identifies low activation rates, runs experiments on onboarding flows, improves activation by 30%, then focuses on retention through email nurture and product features, improving retention by 20% and increasing LTV by 40%.',
    useCases: ['Startup growth', 'SaaS growth', 'E-commerce optimization', 'Product-led growth', 'Scaling customer acquisition'],
    commonMistakes: ['Focusing only on acquisition', 'Not measuring full funnel', 'Running experiments without hypotheses', 'Not integrating with product team'],
    relatedTerms: ['growth-loops', 'growth-flywheel', 'experimentation', 'product-led-growth'],
    synonyms: ['Growth Hacking', 'Full-Funnel Marketing'],
    confusedWith: ['performance-marketing', 'digital-marketing'],
    primaryKeyword: 'growth marketing',
    secondaryKeywords: ['growth marketing strategy', 'full-funnel marketing', 'growth hacking'],
    publishedDate: '2024-09-15',
    updatedDate: '2024-09-15',
    sources: [{ title: 'Growth Marketing Guide', url: 'https://www.growthmarketing.co/' }],
    faq: [
      { question: 'How is growth marketing different from traditional marketing?', answer: 'Growth marketing focuses on the entire customer lifecycle and uses data-driven experimentation, while traditional marketing focuses on campaigns and channels. Growth marketing is more systematic and scalable.' },
      { question: 'What skills do growth marketers need?', answer: 'Growth marketers need analytics, experimentation, product thinking, automation, and cross-functional collaboration skills. They need to be data-driven and comfortable with rapid iteration.' },
      { question: 'How do I measure growth marketing success?', answer: 'Measure across the entire funnel: acquisition (CAC, conversion rates), activation (time-to-value), retention (churn, NRR), revenue (LTV, expansion), and referral (viral coefficient, NPS).' }
    ],
    featured: true,
    emerging: false,
    status: 'established'
  },
  {
    id: 'growth-loops',
    slug: 'growth-loops',
    term: 'Growth Loops',
    category: 'growth',
    shortDefinition: 'Self-reinforcing cycles where customer actions generate more customers, creating compounding growth without proportional increases in marketing spend.',
    fullDefinition: 'Growth Loops are self-reinforcing cycles where customer actions generate more customers, creating compounding growth without proportional increases in marketing spend. Unlike linear funnels (awareness → consideration → conversion), growth loops create network effects, viral growth, and compounding returns. Each customer action feeds back into the loop, generating more customers.',
    whyItMatters: 'Growth loops create exponential, compounding growth that is more efficient and sustainable than linear funnel growth. They reduce customer acquisition cost, create network effects, and build competitive advantages. Companies with strong growth loops (like Slack, Dropbox, and TikTok) achieve rapid, efficient growth.',
    howItWorks: 'Growth loops work by creating mechanisms where customer usage drives more customer acquisition. Examples include viral loops (users invite others), content loops (users create content that attracts others), data loops (user data improves product for all users), and paid loops (revenue funds more acquisition). Each loop compounds over time.',
    example: 'Dropbox uses a viral growth loop: users invite friends to get more storage, friends join and invite their friends, creating exponential growth. Each user generates more users without proportional marketing spend.',
    useCases: ['Viral products', 'Marketplace platforms', 'Social networks', 'Collaboration tools', 'Content platforms'],
    commonMistakes: ['Expecting loops without product design', 'Ignoring loop optimization', 'Not measuring loop effectiveness', 'Confusing loops with funnels'],
    relatedTerms: ['viral-loops', 'network-effects', 'growth-flywheel', 'product-led-growth'],
    synonyms: ['Viral Loops', 'Growth Cycles'],
    confusedWith: ['marketing-funnel', 'growth-flywheel'],
    primaryKeyword: 'growth loops',
    secondaryKeywords: ['viral loops', 'growth cycles', 'compounding growth'],
    publishedDate: '2024-09-15',
    updatedDate: '2024-09-15',
    sources: [{ title: 'Reforge Growth Loops', url: 'https://www.reforge.com/' }],
    faq: [
      { question: 'What are the types of growth loops?', answer: 'Main types are viral loops (user invitations), content loops (user-generated content), data loops (network effects from data), paid loops (revenue-funded acquisition), and product loops (product improvements drive usage).' },
      { question: 'How are growth loops different from funnels?', answer: 'Funnels are linear (awareness → conversion) while loops are cyclical (customer actions generate more customers). Loops compound over time, funnels require constant input.' },
      { question: 'How do I measure growth loops?', answer: 'Measure viral coefficient (users generated per user), loop velocity (time for loop to complete), loop conversion rates, and compounding growth rate over time.' }
    ],
    featured: true,
    emerging: false,
    status: 'established'
  },
  {
    id: 'growth-flywheel',
    slug: 'growth-flywheel',
    term: 'Growth Flywheel',
    category: 'growth',
    shortDefinition: 'A business model where multiple growth drivers create self-reinforcing momentum, accelerating growth over time through compounding effects.',
    fullDefinition: 'Growth Flywheel is a business model where multiple growth drivers create self-reinforcing momentum, accelerating growth over time through compounding effects. Popularized by Amazon and Jim Collins, the flywheel concept describes how multiple business activities (customer experience, traffic, sellers, selection, lower cost structure) reinforce each other, creating accelerating growth momentum.',
    whyItMatters: 'Growth flywheels create sustainable, accelerating growth that becomes increasingly efficient over time. They create competitive advantages through compounding effects and network effects. Companies with strong flywheels (Amazon, Uber, Airbnb) achieve dominant market positions.',
    howItWorks: 'Growth flywheels work by creating multiple reinforcing loops that accelerate each other. For example, better customer experience → more customers → more sellers → more selection → better experience. Each rotation of the flywheel adds momentum, making subsequent rotations easier and faster.',
    example: 'Amazon flywheel: lower prices → more customers → more sellers → more selection → lower cost structure → lower prices. Each element reinforces the others, creating accelerating growth.',
    useCases: ['Marketplace platforms', 'E-commerce', 'Network effects businesses', 'Platform businesses'],
    commonMistakes: ['Expecting flywheel effects without proper design', 'Not investing in initial momentum', 'Ignoring flywheel friction points', 'Not measuring flywheel velocity'],
    relatedTerms: ['growth-loops', 'network-effects', 'platform-business'],
    synonyms: ['Flywheel Effect', 'Compounding Growth'],
    confusedWith: ['growth-loops', 'marketing-funnel'],
    primaryKeyword: 'growth flywheel',
    secondaryKeywords: ['flywheel effect', 'compounding growth', 'Amazon flywheel'],
    publishedDate: '2024-09-15',
    updatedDate: '2024-09-15',
    sources: [{ title: 'Jim Collins: Good to Great', url: 'https://www.jimcollins.com/' }],
    faq: [
      { question: 'What is the difference between flywheel and growth loops?', answer: 'Flywheel describes the overall business model with multiple reinforcing loops, while growth loops are individual self-reinforcing cycles. Flywheel is the system, loops are components.' },
      { question: 'How do I build a growth flywheel?', answer: 'Identify reinforcing business activities, design them to reinforce each other, invest in initial momentum, reduce friction points, and measure flywheel velocity over time.' },
      { question: 'How long does it take for a flywheel to work?', answer: 'Flywheels typically take 2-5 years to build significant momentum. Initial rotations require more effort, but momentum compounds over time.' }
    ],
    featured: true,
    emerging: false,
    status: 'established'
  },
  {
    id: 'north-star-metric',
    slug: 'north-star-metric',
    term: 'North Star Metric',
    category: 'growth',
    shortDefinition: 'A single key metric that best captures the core value a product delivers to customers and aligns the organization around a common growth objective.',
    fullDefinition: 'North Star Metric is a single, key metric that best represents the core value a product delivers to customers and serves as the primary measure of product-market fit and growth. It aligns the entire organization around a common objective and focuses efforts on delivering customer value. The North Star Metric should be leading (predictive of future success), actionable (teams can influence it), and correlated with long-term business success.',
    whyItMatters: 'North Star Metric creates organizational alignment, focuses efforts on customer value, and provides a clear measure of product-market fit. It prevents teams from optimizing for vanity metrics and ensures everyone is working toward the same objective. Companies with clear North Star Metrics (like Airbnb for nights booked) achieve better product-market fit and growth.',
    howItWorks: 'North Star Metric works by identifying the metric that best captures customer value, setting it as the primary organizational objective, aligning team goals and experiments to improve it, and tracking it as the primary measure of success. The metric should be measurable, actionable, and correlated with long-term business success.',
    example: 'Airbnb uses "nights booked" as North Star Metric because it represents guest value (stays booked) and host value (income earned). Spotify uses "time spent listening" because it represents listener value (enjoyment) and predicts retention.',
    useCases: ['Product-market fit measurement', 'Organizational alignment', 'Growth strategy', 'Product prioritization'],
    commonMistakes: ['Choosing revenue as North Star', 'Picking vanity metrics', 'Not aligning organization around metric', 'Changing North Star too frequently'],
    relatedTerms: ['product-market-fit', 'growth-marketing', 'key-performance-indicator'],
    synonyms: ['NSM', 'North Star', 'Core Metric'],
    confusedWith: ['kpi', 'key-performance-indicator'],
    primaryKeyword: 'North Star Metric',
    secondaryKeywords: ['NSM', 'core metric', 'product metric'],
    publishedDate: '2024-09-15',
    updatedDate: '2024-09-15',
    sources: [{ title: 'Reforge North Star Metric', url: 'https://www.reforge.com/' }],
    faq: [
      { question: 'How do I choose a North Star Metric?', answer: 'Choose a metric that represents core customer value, is measurable and actionable, correlates with long-term success, and can be influenced by product and marketing teams.' },
      { question: 'Should North Star Metric be revenue?', answer: 'No, revenue is a lagging indicator. North Star should be a leading indicator of customer value that predicts future revenue. Revenue is an outcome, not a driver.' },
      { question: 'Can I have multiple North Star Metrics?', answer: 'No, the power of North Star is singular focus. You can have supporting metrics, but the North Star should be a single metric that best represents customer value.' }
    ],
    featured: true,
    emerging: false,
    status: 'established'
  },
  // Continue with remaining growth terms and other categories...
  // C. B2B DEMAND GENERATION
  {
    id: 'demand-generation',
    slug: 'demand-generation',
    term: 'Demand Generation',
    category: 'demand-gen',
    shortDefinition: 'A strategic marketing approach focused on creating awareness, interest, and pipeline for a product or service through targeted campaigns across the buyer journey.',
    fullDefinition: 'Demand Generation is a strategic, full-funnel marketing approach that generates interest, awareness, and sales pipeline for a product or service. It combines inbound and outbound tactics, content marketing, events, advertising, and nurturing programs to move prospects from awareness to purchase. Unlike lead generation focused on volume, demand generation focuses on quality, pipeline velocity, and revenue impact.',
    whyItMatters: 'Demand generation creates predictable, scalable pipeline for sales teams. It reduces reliance on outbound, improves sales productivity, and creates efficient customer acquisition. Strong demand generation programs are essential for B2B companies seeking predictable, efficient growth.',
    howItWorks: 'Demand generation works by understanding the buyer journey, creating content and programs for each stage, using multi-channel tactics to reach buyers, nurturing prospects through the funnel, and measuring pipeline contribution and ROI. It combines inbound (SEO, content, social) and outbound (ABM, events, advertising) tactics.',
    example: 'A B2B SaaS company runs demand generation: creates educational content for awareness, hosts webinars for consideration, offers demos for decision, uses email nurture for mid-funnel, and measures success through pipeline contribution and CAC.',
    useCases: ['B2B pipeline generation', 'Product launch', 'Market expansion', 'Scaling customer acquisition'],
    commonMistakes: ['Focusing only on lead volume', 'Not measuring pipeline contribution', 'Poor alignment between marketing and sales', 'Ignoring mid-funnel nurturing'],
    relatedTerms: ['lead-generation', 'pipeline-generation', 'account-based-marketing', 'inbound-marketing'],
    synonyms: ['Demand Gen', 'Pipeline Generation'],
    confusedWith: ['lead-generation', 'inbound-marketing'],
    primaryKeyword: 'demand generation',
    secondaryKeywords: ['demand gen', 'pipeline generation', 'B2B demand generation'],
    publishedDate: '2024-09-15',
    updatedDate: '2024-09-15',
    sources: [{ title: 'HubSpot Demand Generation', url: 'https://blog.hubspot.com/marketing/demand-generation' }],
    faq: [
      { question: 'How is demand generation different from lead generation?', answer: 'Demand generation focuses on the entire buyer journey and pipeline quality, while lead generation focuses on lead volume. Demand gen is strategic and full-funnel, lead gen is tactical and top-funnel.' },
      { question: 'What channels work best for demand generation?', answer: 'Best channels include content marketing, webinars, events, ABM, paid advertising, social media, and email nurture. Channel mix depends on target audience and buying behavior.' },
      { question: 'How do I measure demand generation success?', answer: 'Measure pipeline contribution, pipeline velocity, CAC, marketing-sourced revenue, conversion rates by stage, and ROI on marketing programs.' }
    ],
    featured: true,
    emerging: false,
    status: 'established'
  },
  {
    id: 'pipeline-generation',
    slug: 'pipeline-generation',
    term: 'Pipeline Generation',
    category: 'demand-gen',
    shortDefinition: 'The process of creating and qualifying sales opportunities through marketing and sales activities to build a healthy sales pipeline.',
    fullDefinition: 'Pipeline Generation is the process of creating, nurturing, and qualifying sales opportunities to maintain a healthy sales pipeline. It combines marketing programs (content, campaigns, events) and sales activities (outbound, demos, proposals) to move prospects from awareness to qualified opportunity. Pipeline generation is the bridge between marketing activities and sales revenue.',
    whyItMatters: 'Pipeline generation creates the foundation for revenue growth. Without healthy pipeline, sales teams cannot meet quotas. Effective pipeline generation reduces sales cycle length, improves win rates, and creates predictable revenue.',
    howItWorks: 'Pipeline generation works by identifying target prospects, engaging them through multi-channel programs, qualifying them through scoring and BANT criteria, and handing them to sales as qualified opportunities. It requires alignment between marketing and sales on ICP, qualification criteria, and handoff processes.',
    example: 'A B2B SaaS company generates pipeline: marketing runs webinars and ads, SDRs qualify leads through discovery calls, AEs run demos and proposals, and opportunities are tracked in CRM through pipeline stages.',
    useCases: ['Sales pipeline building', 'Revenue forecasting', 'Sales and marketing alignment', 'Growth planning'],
    commonMistakes: ['Poor lead qualification', 'Misaligned marketing and sales', 'Not measuring pipeline quality', 'Ignoring pipeline velocity'],
    relatedTerms: ['demand-generation', 'lead-generation', 'sales-qualified-lead', 'marketing-qualified-lead'],
    synonyms: ['Pipeline Building', 'Opportunity Generation'],
    confusedWith: ['lead-generation', 'demand-generation'],
    primaryKeyword: 'pipeline generation',
    secondaryKeywords: ['sales pipeline', 'opportunity generation', 'pipeline building'],
    publishedDate: '2024-09-15',
    updatedDate: '2024-09-15',
    sources: [{ title: 'Salesforce Pipeline Management', url: 'https://www.salesforce.com/' }],
    faq: [
      { question: 'How much pipeline do I need?', answer: 'Typically 3-4x quota coverage is needed. If quota is $1M, you need $3-4M in pipeline to account for win rates and slippage.' },
      { question: 'How do I improve pipeline generation?', answer: 'Improve targeting, optimize conversion rates, reduce sales cycle length, improve qualification, and align marketing and sales on ICP and qualification criteria.' },
      { question: 'How do I measure pipeline quality?', answer: 'Measure qualification rates, win rates by source, pipeline velocity, average deal size, and sales cycle length by source.' }
    ],
    featured: false,
    emerging: false,
    status: 'established'
  },
  {
    id: 'intent-data',
    slug: 'intent-data',
    term: 'Intent Data',
    category: 'demand-gen',
    shortDefinition: 'Signals indicating that a prospect or account is actively researching solutions in your category, indicating buying intent and timing.',
    fullDefinition: 'Intent Data refers to signals and data points that indicate when a prospect or account is actively researching solutions, products, or topics related to your category. It includes first-party intent (website visits, content downloads, product trials) and third-party intent (research activity on other sites, review site activity, job postings). Intent data helps identify in-market accounts and prioritize outreach.',
    whyItMatters: 'Intent data enables timely, relevant outreach to in-market accounts, improving conversion rates and sales efficiency. It helps prioritize sales efforts, personalize messaging, and time outreach to when buyers are most receptive. Companies using intent data see 2-3x higher conversion rates.',
    howItWorks: 'Intent data works by collecting signals from multiple sources (website analytics, content engagement, third-party research platforms, review sites), analyzing patterns to identify buying signals, scoring accounts based on intent strength, and activating insights through sales outreach, marketing campaigns, and ABM programs.',
    example: 'A B2B SaaS company uses intent data: identifies accounts researching "marketing automation" on review sites and competitor sites, scores them based on signal strength, prioritizes them for sales outreach, and personalizes messaging based on research topics.',
    useCases: ['Account prioritization', 'Sales outreach timing', 'ABM targeting', 'Marketing campaign personalization'],
    commonMistakes: ['Relying only on third-party intent', 'Not validating intent signals', 'Poor integration with sales processes', 'Ignoring first-party intent'],
    relatedTerms: ['buying-signals', 'account-based-marketing', 'sales-intelligence', 'first-party-intent'],
    synonyms: ['Buying Signals', 'Purchase Intent'],
    confusedWith: ['engagement-data', 'website-analytics'],
    primaryKeyword: 'intent data',
    secondaryKeywords: ['buying signals', 'purchase intent', 'B2B intent data'],
    publishedDate: '2024-09-15',
    updatedDate: '2024-09-15',
    sources: [{ title: '6sense Intent Data', url: 'https://6sense.com/' }, { title: 'Bombora Intent Data', url: 'https://bombora.com/' }],
    faq: [
      { question: 'What are the sources of intent data?', answer: 'Intent data sources include website visits, content engagement, product trials (first-party), and third-party research activity, review sites, job postings, and news (third-party).' },
      { question: 'How accurate is intent data?', answer: 'Intent data is directional, not predictive. It indicates research activity, not purchase certainty. Accuracy varies by source and should be validated with other signals.' },
      { question: 'How do I use intent data effectively?', answer: 'Combine first-party and third-party intent, validate with engagement data, integrate with sales workflows, personalize messaging, and measure conversion rates.' }
    ],
    featured: true,
    emerging: false,
    status: 'established'
  },
  // F. AI MARKETING
  {
    id: 'ai-marketing',
    slug: 'ai-marketing',
    term: 'AI Marketing',
    category: 'ai-marketing',
    shortDefinition: 'The application of artificial intelligence and machine learning to marketing activities, including content creation, personalization, analytics, and campaign optimization.',
    fullDefinition: 'AI Marketing refers to the application of artificial intelligence, machine learning, and generative AI to marketing activities. It encompasses AI-assisted content creation, personalization, predictive analytics, campaign optimization, customer segmentation, and automation. AI marketing enables marketers to scale personalization, improve targeting, and make better decisions through data-driven insights.',
    whyItMatters: 'AI marketing improves marketing efficiency, enables personalization at scale, and enhances decision making through predictive insights. It automates repetitive tasks, improves targeting accuracy, and creates competitive advantages through AI-powered optimization. Companies using AI marketing see 20-30% improvements in campaign performance.',
    howItWorks: 'AI marketing works by collecting and analyzing large datasets, using machine learning algorithms to identify patterns and insights, applying AI to automate and optimize marketing activities, and continuously learning from results to improve outcomes. AI tools can generate content, personalize messaging, predict customer behavior, and optimize campaigns.',
    example: 'A B2B company uses AI marketing: AI analyzes customer data to segment audiences, generates personalized email content, optimizes send times, predicts conversion probability, and automatically adjusts campaigns based on performance.',
    useCases: ['Content creation', 'Personalization', 'Campaign optimization', 'Predictive analytics', 'Customer segmentation'],
    commonMistakes: ['Using AI without strategy', 'Poor data quality', 'Over-relying on AI without human oversight', 'Ignoring AI ethics and bias'],
    relatedTerms: ['generative-ai', 'ai-agents', 'machine-learning', 'predictive-analytics'],
    synonyms: ['AI-Powered Marketing', 'Intelligent Marketing'],
    confusedWith: ['marketing-automation', 'digital-marketing'],
    primaryKeyword: 'AI marketing',
    secondaryKeywords: ['artificial intelligence marketing', 'AI marketing tools', 'machine learning marketing'],
    publishedDate: '2024-09-15',
    updatedDate: '2024-09-15',
    sources: [{ title: 'HubSpot AI Marketing', url: 'https://blog.hubspot.com/marketing/ai-marketing' }],
    faq: [
      { question: 'What AI tools are used in marketing?', answer: 'Common AI tools include ChatGPT for content, Jasper for copywriting, Albert.ai for campaign optimization, and various tools for personalization, analytics, and automation.' },
      { question: 'How does AI improve marketing?', answer: 'AI improves marketing through content generation, personalization at scale, predictive analytics, campaign optimization, and automated decision making. It increases efficiency and effectiveness.' },
      { question: 'Is AI replacing marketers?', answer: 'No, AI is augmenting marketers. AI handles repetitive tasks and data analysis, while marketers focus on strategy, creativity, and human judgment. AI is a tool, not a replacement.' }
    ],
    featured: true,
    emerging: true,
    status: 'emerging'
  },
  {
    id: 'ai-agents',
    slug: 'ai-agents',
    term: 'AI Agents',
    category: 'ai-marketing',
    shortDefinition: 'Autonomous AI systems that can perform marketing tasks, make decisions, and execute workflows with minimal human intervention.',
    fullDefinition: 'AI Agents are autonomous AI systems that can perform marketing tasks, make decisions, and execute workflows with minimal human intervention. Unlike simple AI tools that require human input, AI agents can operate independently, learn from outcomes, and adapt their behavior. They can handle tasks like lead qualification, content creation, campaign optimization, and customer support.',
    whyItMatters: 'AI agents enable marketing automation at a new level, handling complex tasks that previously required human judgment. They improve efficiency, reduce operational overhead, and enable 24/7 marketing operations. AI agents are transforming marketing operations by automating decision-making and execution.',
    howItWorks: 'AI agents work by using large language models, machine learning, and decision-making algorithms to analyze data, make decisions, and execute tasks. They can be configured with goals, constraints, and workflows, then operate autonomously within those parameters. They learn from outcomes and improve over time.',
    example: 'A B2B company uses AI agents: an SDR agent qualifies leads through email conversations, a content agent creates personalized outreach based on prospect research, and a campaign agent optimizes ad spend based on performance data.',
    useCases: ['Lead qualification', 'Content creation', 'Campaign optimization', 'Customer support', 'Sales outreach'],
    commonMistakes: ['Not setting clear goals and constraints', 'Poor monitoring and oversight', 'Ignoring AI ethics and bias', 'Over-automating without human touch'],
    relatedTerms: ['ai-marketing', 'generative-ai', 'marketing-automation', 'agentic-ai'],
    synonyms: ['Autonomous AI', 'AI Assistants'],
    confusedWith: ['chatbots', 'marketing-automation'],
    primaryKeyword: 'AI agents',
    secondaryKeywords: ['autonomous AI', 'AI assistants', 'agentic AI'],
    publishedDate: '2024-09-15',
    updatedDate: '2024-09-15',
    sources: [{ title: 'Anthropic AI Agents', url: 'https://www.anthropic.com/' }],
    faq: [
      { question: 'What can AI agents do in marketing?', answer: 'AI agents can qualify leads, create content, optimize campaigns, handle customer support, conduct research, and execute workflows with minimal human intervention.' },
      { question: 'Are AI agents safe to use?', answer: 'AI agents are safe when properly configured with clear constraints, monitoring, and human oversight. They should be tested thoroughly and monitored for bias and errors.' },
      { question: 'How do AI agents differ from chatbots?', answer: 'Chatbots are rule-based and limited to specific conversations. AI agents are more sophisticated, can make decisions, learn from outcomes, and handle complex tasks across multiple channels.' }
    ],
    featured: true,
    emerging: true,
    status: 'emerging'
  },
  // H. AEO / GEO
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
