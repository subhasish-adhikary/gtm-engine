// GTM Operating System Data Structure
// Single source of truth for GTM visualization and stack tools

export interface Tool {
  id: string;
  name: string;
  category: string;
  subcategory?: string;
  primaryUseCase: string;
  bestFor: string;
  companyStage: string[];
  teamSize: string[];
  budget: string;
  complexity: 'Low' | 'Medium' | 'High';
  strengths: string[];
  weaknesses: string[];
  alternatives: string[];
  whyUse: string;
  whyNotUse: string;
  website?: string;
}

export interface Capability {
  id: string;
  name: string;
  description: string;
  tools: string[]; // Tool IDs
}

export interface GTMStage {
  id: string;
  number: string;
  name: string;
  description: string;
  capabilities: Capability[];
}

export const gtmStages: GTMStage[] = [
  {
    id: 'strategy',
    number: '01',
    name: 'Strategy',
    description: 'Define who you serve, how you position, and what you offer.',
    capabilities: [
      {
        id: 'icp',
        name: 'ICP Definition',
        description: 'Ideal Customer Profile research and validation',
        tools: []
      },
      {
        id: 'positioning',
        name: 'Positioning',
        description: 'Market positioning and differentiation',
        tools: []
      },
      {
        id: 'messaging',
        name: 'Messaging',
        description: 'Value proposition and messaging framework',
        tools: []
      },
      {
        id: 'segmentation',
        name: 'Segmentation',
        description: 'Market and customer segmentation',
        tools: []
      }
    ]
  },
  {
    id: 'intelligence',
    number: '02',
    name: 'Intelligence',
    description: 'Identify which accounts matter, why they matter, and why now.',
    capabilities: [
      {
        id: 'intent',
        name: 'Intent Data',
        description: 'Buyer intent signals and research activity',
        tools: ['6sense', 'bombora', 'demandbase-intent']
      },
      {
        id: 'enrichment',
        name: 'Data Enrichment',
        description: 'Firmographic and demographic enrichment',
        tools: ['clay', 'apollo', 'zoominfo', 'clearbit']
      },
      {
        id: 'signals',
        name: 'Buying Signals',
        description: 'Real-time buying signal detection',
        tools: ['clay', '6sense']
      },
      {
        id: 'research',
        name: 'Market Research',
        description: 'Competitive and market intelligence',
        tools: ['klue', 'crayon']
      }
    ]
  },
  {
    id: 'demand',
    number: '03',
    name: 'Demand',
    description: 'Create qualified demand through channels that match your ICP, ACV, and buying cycle.',
    capabilities: [
      {
        id: 'content',
        name: 'Content Marketing',
        description: 'Educational and thought leadership content',
        tools: ['wordpress', 'webflow']
      },
      {
        id: 'seo',
        name: 'SEO',
        description: 'Search engine optimization',
        tools: ['ahrefs', 'semrush', 'surfer-seo']
      },
      {
        id: 'paid',
        name: 'Paid Media',
        description: 'Paid advertising and demand generation',
        tools: ['google-ads', 'linkedin-ads']
      },
      {
        id: 'social',
        name: 'Social Media',
        description: 'Social media marketing and community',
        tools: ['linkedin', 'twitter']
      },
      {
        id: 'pr',
        name: 'PR & Communications',
        description: 'Public relations and media relations',
        tools: ['haro']
      },
      {
        id: 'events',
        name: 'Events',
        description: 'Webinars, conferences, and events',
        tools: ['zoom', 'hopin']
      }
    ]
  },
  {
    id: 'capture',
    number: '04',
    name: 'Capture',
    description: 'Convert interest into measurable engagement and lead data.',
    capabilities: [
      {
        id: 'forms',
        name: 'Forms & Landing Pages',
        description: 'Lead capture forms and landing pages',
        tools: ['hubspot', 'unbounce']
      },
      {
        id: 'conversion',
        name: 'Conversion Optimization',
        description: 'CRO and conversion rate optimization',
        tools: ['optimizely', 'hotjar']
      },
      {
        id: 'chat',
        name: 'Conversational Marketing',
        description: 'Chatbots and live chat',
        tools: ['drift', 'intercom']
      }
    ]
  },
  {
    id: 'conversion',
    number: '05',
    name: 'Conversion',
    description: 'Move prospects through evaluation to purchase decision.',
    capabilities: [
      {
        id: 'crm',
        name: 'CRM',
        description: 'Customer relationship management',
        tools: ['hubspot', 'salesforce', 'pipedrive']
      },
      {
        id: 'sales-engagement',
        name: 'Sales Engagement',
        description: 'Outreach sequences and sales automation',
        tools: ['outreach', 'salesloft', 'apollo']
      },
      {
        id: 'abm',
        name: 'ABM',
        description: 'Account-based marketing orchestration',
        tools: ['6sense', 'demandbase', 'terminus']
      },
      {
        id: 'conversation-intel',
        name: 'Conversation Intelligence',
        description: 'Call recording and sales coaching',
        tools: ['gong', 'chorus', 'clari']
      }
    ]
  },
  {
    id: 'revenue',
    number: '06',
    name: 'Revenue',
    description: 'Manage pipeline, forecast revenue, and optimize deal velocity.',
    capabilities: [
      {
        id: 'pipeline',
        name: 'Pipeline Management',
        description: 'Pipeline tracking and management',
        tools: ['salesforce', 'hubspot']
      },
      {
        id: 'forecasting',
        name: 'Revenue Forecasting',
        description: 'Revenue prediction and forecasting',
        tools: ['clari', 'gong']
      },
      {
        id: 'attribution',
        name: 'Attribution',
        description: 'Marketing attribution and ROI tracking',
        tools: ['bizible', 'dreamdata']
      },
      {
        id: 'revenue-intel',
        name: 'Revenue Intelligence',
        description: 'Revenue analytics and insights',
        tools: ['clari', 'gong']
      }
    ]
  },
  {
    id: 'retention',
    number: '07',
    name: 'Retention',
    description: 'Drive adoption, expansion, and customer advocacy.',
    capabilities: [
      {
        id: 'customer-success',
        name: 'Customer Success',
        description: 'Customer onboarding and success management',
        tools: ['gainsight', 'churnzero', 'intercom']
      },
      {
        id: 'lifecycle',
        name: 'Lifecycle Marketing',
        description: 'Customer lifecycle automation',
        tools: ['customer-io', 'intercom']
      },
      {
        id: 'expansion',
        name: 'Expansion',
        description: 'Upsell and cross-sell identification',
        tools: ['gainsight', 'amplitude']
      },
      {
        id: 'advocacy',
        name: 'Advocacy',
        description: 'Customer advocacy and referral programs',
        tools: ['rewardful', 'g2']
      }
    ]
  },
  {
    id: 'measurement',
    number: '08',
    name: 'Measurement',
    description: 'Track performance, learn from data, and optimize the system.',
    capabilities: [
      {
        id: 'analytics',
        name: 'Analytics',
        description: 'Web and product analytics',
        tools: ['ga4', 'mixpanel', 'amplitude', 'posthog']
      },
      {
        id: 'bi',
        name: 'Business Intelligence',
        description: 'Reporting and dashboards',
        tools: ['looker', 'tableau']
      },
      {
        id: 'experimentation',
        name: 'Experimentation',
        description: 'A/B testing and experimentation',
        tools: ['optimizely', 'vwo']
      },
      {
        id: 'data-ops',
        name: 'Data Operations',
        description: 'Data integration and orchestration',
        tools: ['segment', 'zapier']
      }
    ]
  }
];

export const tools: Tool[] = [
  // Intelligence Tools
  {
    id: '6sense',
    name: '6sense',
    category: 'Intelligence',
    subcategory: 'Intent & ABM',
    primaryUseCase: 'Intent data and account-based marketing orchestration',
    bestFor: 'Mid-market and enterprise B2B companies with ACV >$25k',
    companyStage: ['Series B', 'Series C', 'Enterprise'],
    teamSize: ['5-15', '15+'],
    budget: '$50k-$200k/year',
    complexity: 'High',
    strengths: ['Comprehensive intent data', 'Strong ABM orchestration', 'Predictive analytics', 'Sales and marketing alignment'],
    weaknesses: ['High cost', 'Complex implementation', 'Requires dedicated resources', 'Overkill for small teams'],
    alternatives: ['Demandbase', 'Bombora', 'Terminus'],
    whyUse: 'Best-in-class for enterprise ABM with strong intent data and predictive capabilities.',
    whyNotUse: 'Too expensive and complex for early-stage or small teams.',
    website: 'https://6sense.com'
  },
  {
    id: 'clay',
    name: 'Clay',
    category: 'Intelligence',
    subcategory: 'Data Enrichment',
    primaryUseCase: 'Data enrichment and workflow automation for outbound',
    bestFor: 'Signal-based outbound and data-driven sales teams',
    companyStage: ['Seed', 'Series A', 'Series B'],
    teamSize: ['1-5', '5-15'],
    budget: '$500-$5k/month',
    complexity: 'Medium',
    strengths: ['Flexible data enrichment', 'Powerful workflow automation', 'Great for outbound', 'Active community'],
    weaknesses: ['Learning curve', 'Requires data literacy', 'Can get expensive at scale'],
    alternatives: ['Apollo', 'ZoomInfo', 'Clearbit'],
    whyUse: 'Best tool for building intelligent outbound workflows with rich data enrichment.',
    whyNotUse: 'Requires technical sophistication and data literacy.',
    website: 'https://clay.com'
  },
  {
    id: 'apollo',
    name: 'Apollo.io',
    category: 'Intelligence',
    subcategory: 'Sales Intelligence',
    primaryUseCase: 'All-in-one sales intelligence and engagement platform',
    bestFor: 'B2B sales teams doing outbound prospecting',
    companyStage: ['Seed', 'Series A', 'Series B'],
    teamSize: ['1-5', '5-15'],
    budget: '$50-$500/month',
    complexity: 'Low',
    strengths: ['Large contact database', 'Built-in email sequences', 'Affordable', 'Easy to use'],
    weaknesses: ['Data quality varies', 'Limited advanced features', 'Can feel spammy if misused'],
    alternatives: ['ZoomInfo', 'LinkedIn Sales Navigator', 'Clay'],
    whyUse: 'Great all-in-one platform for outbound prospecting at an affordable price.',
    whyNotUse: 'Data quality not as reliable as premium alternatives.',
    website: 'https://apollo.io'
  },
  {
    id: 'zoominfo',
    name: 'ZoomInfo',
    category: 'Intelligence',
    subcategory: 'Sales Intelligence',
    primaryUseCase: 'B2B contact and company database with intent data',
    bestFor: 'Enterprise sales teams needing comprehensive data',
    companyStage: ['Series B', 'Series C', 'Enterprise'],
    teamSize: ['5-15', '15+'],
    budget: '$15k-$100k/year',
    complexity: 'Medium',
    strengths: ['Largest B2B database', 'High data quality', 'Intent data included', 'Strong integrations'],
    weaknesses: ['Expensive', 'Annual contracts', 'Can be overwhelming'],
    alternatives: ['6sense', 'Apollo', 'LinkedIn Sales Navigator'],
    whyUse: 'Gold standard for B2B sales intelligence with comprehensive data coverage.',
    whyNotUse: 'Too expensive for early-stage companies.',
    website: 'https://zoominfo.com'
  },
  {
    id: 'bombora',
    name: 'Bombora',
    category: 'Intelligence',
    subcategory: 'Intent Data',
    primaryUseCase: 'B2B intent data and buyer intelligence',
    bestFor: 'Companies wanting to identify in-market accounts',
    companyStage: ['Series B', 'Series C', 'Enterprise'],
    teamSize: ['5-15', '15+'],
    budget: '$25k-$75k/year',
    complexity: 'Medium',
    strengths: ['Large intent data network', 'Topic-level intent', 'Good integrations'],
    weaknesses: ['Requires interpretation', 'Not actionable alone', 'Needs sales process integration'],
    alternatives: ['6sense', 'Demandbase', 'G2 Intent'],
    whyUse: 'Strong standalone intent data provider with broad coverage.',
    whyNotUse: 'Intent data alone is not enough - needs to be part of broader strategy.',
    website: 'https://bombora.com'
  },
  {
    id: 'demandbase',
    name: 'Demandbase',
    category: 'Intelligence',
    subcategory: 'ABM Platform',
    primaryUseCase: 'Account-based marketing and B2B advertising',
    bestFor: 'Enterprise companies running ABM programs',
    companyStage: ['Series C', 'Enterprise'],
    teamSize: ['15+'],
    budget: '$100k-$500k/year',
    complexity: 'High',
    strengths: ['Comprehensive ABM platform', 'Strong advertising capabilities', 'Good intent data'],
    weaknesses: ['Very expensive', 'Complex implementation', 'Requires dedicated ABM team'],
    alternatives: ['6sense', 'Terminus', 'Rollworks'],
    whyUse: 'Enterprise-grade ABM platform with strong advertising and orchestration.',
    whyNotUse: 'Overkill and too expensive for most companies.',
    website: 'https://demandbase.com'
  },
  {
    id: 'klue',
    name: 'Klue',
    category: 'Intelligence',
    subcategory: 'Competitive Intelligence',
    primaryUseCase: 'Competitive intelligence and win/loss analysis',
    bestFor: 'Product marketing teams tracking competition',
    companyStage: ['Series A', 'Series B', 'Series C'],
    teamSize: ['5-15', '15+'],
    budget: '$25k-$75k/year',
    complexity: 'Medium',
    strengths: ['Centralized competitive intel', 'Win/loss analysis', 'Sales enablement integration'],
    weaknesses: ['Requires ongoing maintenance', 'Needs organizational buy-in'],
    alternatives: ['Crayon', 'Owler', 'SimilarWeb'],
    whyUse: 'Best platform for systematic competitive intelligence and win/loss programs.',
    whyNotUse: 'Requires dedicated resources to maintain.',
    website: 'https://klue.com'
  },
  {
    id: 'crayon',
    name: 'Crayon',
    category: 'Intelligence',
    subcategory: 'Competitive Intelligence',
    primaryUseCase: 'Competitive intelligence and market tracking',
    bestFor: 'Marketing and product teams monitoring competition',
    companyStage: ['Series A', 'Series B'],
    teamSize: ['5-15'],
    budget: '$15k-$50k/year',
    complexity: 'Medium',
    strengths: ['Automated competitive tracking', 'Easy to use', 'Good alerts'],
    weaknesses: ['Less depth than Klue', 'Limited analysis capabilities'],
    alternatives: ['Klue', 'Owler', 'Craft'],
    whyUse: 'Good entry-level competitive intelligence platform.',
    whyNotUse: 'Less sophisticated than Klue for enterprise needs.',
    website: 'https://crayon.co'
  },
  
  // Demand Tools
  {
    id: 'ahrefs',
    name: 'Ahrefs',
    category: 'Demand',
    subcategory: 'SEO',
    primaryUseCase: 'SEO research, backlink analysis, and content optimization',
    bestFor: 'Content and SEO teams building organic traffic',
    companyStage: ['Seed', 'Series A', 'Series B', 'Series C'],
    teamSize: ['1-5', '5-15'],
    budget: '$100-$1k/month',
    complexity: 'Medium',
    strengths: ['Comprehensive SEO data', 'Great backlink analysis', 'Content explorer', 'Keyword research'],
    weaknesses: ['Expensive at scale', 'Learning curve', 'Can be overwhelming'],
    alternatives: ['Semrush', 'Moz', 'SE Ranking'],
    whyUse: 'Best-in-class SEO tool with comprehensive data and great UX.',
    whyNotUse: 'Expensive for teams that only need basic SEO features.',
    website: 'https://ahrefs.com'
  },
  {
    id: 'semrush',
    name: 'Semrush',
    category: 'Demand',
    subcategory: 'SEO & Marketing',
    primaryUseCase: 'All-in-one SEO, content marketing, and competitive research',
    bestFor: 'Marketing teams needing comprehensive digital marketing tools',
    companyStage: ['Seed', 'Series A', 'Series B'],
    teamSize: ['1-5', '5-15'],
    budget: '$100-$500/month',
    complexity: 'Medium',
    strengths: ['All-in-one platform', 'Good keyword research', 'Content marketing tools', 'Competitive analysis'],
    weaknesses: ['Can feel bloated', 'Some features less deep than specialists'],
    alternatives: ['Ahrefs', 'Moz', 'SE Ranking'],
    whyUse: 'Great all-in-one platform for teams needing SEO, content, and competitive research.',
    whyNotUse: 'Specialists may prefer deeper tools like Ahrefs for SEO.',
    website: 'https://semrush.com'
  },
  {
    id: 'surfer-seo',
    name: 'Surfer SEO',
    category: 'Demand',
    subcategory: 'Content Optimization',
    primaryUseCase: 'Content optimization and on-page SEO',
    bestFor: 'Content teams optimizing for search',
    companyStage: ['Seed', 'Series A', 'Series B'],
    teamSize: ['1-5', '5-15'],
    budget: '$50-$200/month',
    complexity: 'Low',
    strengths: ['Content editor', 'On-page optimization', 'Easy to use', 'Good for writers'],
    weaknesses: ['Limited to on-page SEO', 'Requires Ahrefs/Semrush for full SEO'],
    alternatives: ['Clearscope', 'Frase', 'MarketMuse'],
    whyUse: 'Best tool for optimizing individual content pieces for search.',
    whyNotUse: 'Not a complete SEO solution - pair with Ahrefs or Semrush.',
    website: 'https://surferseo.com'
  },
  
  // Capture Tools
  {
    id: 'hubspot',
    name: 'HubSpot',
    category: 'Capture',
    subcategory: 'CRM & Marketing',
    primaryUseCase: 'All-in-one CRM, marketing, sales, and service platform',
    bestFor: 'B2B companies wanting integrated marketing and sales',
    companyStage: ['Seed', 'Series A', 'Series B', 'Series C'],
    teamSize: ['1-5', '5-15', '15+'],
    budget: '$0-$3k/month',
    complexity: 'Medium',
    strengths: ['All-in-one platform', 'Great UX', 'Strong free tier', 'Good integrations', 'Scales well'],
    weaknesses: ['Gets expensive at scale', 'Can become complex', 'Enterprise features limited vs Salesforce'],
    alternatives: ['Salesforce', 'Pipedrive', 'Close'],
    whyUse: 'Best all-in-one platform for B2B companies wanting marketing, sales, and service integrated.',
    whyNotUse: 'Enterprise companies may outgrow it; complex needs may require Salesforce.',
    website: 'https://hubspot.com'
  },
  {
    id: 'salesforce',
    name: 'Salesforce',
    category: 'Capture',
    subcategory: 'CRM',
    primaryUseCase: 'Enterprise CRM and sales platform',
    bestFor: 'Enterprise companies with complex sales processes',
    companyStage: ['Series C', 'Enterprise'],
    teamSize: ['15+'],
    budget: '$25k-$500k+/year',
    complexity: 'High',
    strengths: ['Highly customizable', 'Enterprise-grade', 'Massive ecosystem', 'Strong analytics'],
    weaknesses: ['Expensive', 'Complex implementation', 'Requires admin resources', 'Can be overwhelming'],
    alternatives: ['HubSpot', 'Microsoft Dynamics', 'Oracle CRM'],
    whyUse: 'Gold standard for enterprise CRM with unlimited customization.',
    whyNotUse: 'Too complex and expensive for most companies.',
    website: 'https://salesforce.com'
  },
  {
    id: 'pipedrive',
    name: 'Pipedrive',
    category: 'Capture',
    subcategory: 'CRM',
    primaryUseCase: 'Sales-focused CRM for small to mid-size teams',
    bestFor: 'Sales teams wanting simple pipeline management',
    companyStage: ['Seed', 'Series A'],
    teamSize: ['1-5', '5-15'],
    budget: '$15-$100/month',
    complexity: 'Low',
    strengths: ['Simple and intuitive', 'Great for sales teams', 'Affordable', 'Easy to use'],
    weaknesses: ['Limited marketing features', 'Less customizable', 'Not for complex processes'],
    alternatives: ['HubSpot', 'Close', 'Freshsales'],
    whyUse: 'Best simple CRM for sales-focused teams.',
    whyNotUse: 'Limited if you need marketing automation or complex workflows.',
    website: 'https://pipedrive.com'
  },
  
  // Conversion Tools
  {
    id: 'outreach',
    name: 'Outreach',
    category: 'Conversion',
    subcategory: 'Sales Engagement',
    primaryUseCase: 'Sales engagement and orchestration platform',
    bestFor: 'Sales teams running complex outbound sequences',
    companyStage: ['Series B', 'Series C', 'Enterprise'],
    teamSize: ['5-15', '15+'],
    budget: '$25k-$100k/year',
    complexity: 'High',
    strengths: ['Powerful sequencing', 'Good analytics', 'Strong integrations', 'Enterprise features'],
    weaknesses: ['Expensive', 'Complex setup', 'Overkill for small teams'],
    alternatives: ['Salesloft', 'Apollo', 'Woodpecker'],
    whyUse: 'Enterprise-grade sales engagement with powerful orchestration.',
    whyNotUse: 'Too expensive and complex for small teams.',
    website: 'https://outreach.io'
  },
  {
    id: 'salesloft',
    name: 'Salesloft',
    category: 'Conversion',
    subcategory: 'Sales Engagement',
    primaryUseCase: 'Sales engagement and relationship intelligence',
    bestFor: 'B2B sales teams doing outbound and account management',
    companyStage: ['Series A', 'Series B', 'Series C'],
    teamSize: ['5-15', '15+'],
    budget: '$20k-$75k/year',
    complexity: 'Medium',
    strengths: ['Good sequencing', 'Relationship intelligence', 'Email tracking', 'Good UX'],
    weaknesses: ['Less powerful than Outreach', 'Can be expensive'],
    alternatives: ['Outreach', 'Apollo', 'Groove'],
    whyUse: 'Strong sales engagement platform with good relationship intelligence.',
    whyNotUse: 'Outreach may be better for very complex enterprise needs.',
    website: 'https://salesloft.com'
  },
  {
    id: 'gong',
    name: 'Gong',
    category: 'Conversion',
    subcategory: 'Conversation Intelligence',
    primaryUseCase: 'Revenue intelligence and conversation analytics',
    bestFor: 'Sales teams wanting to improve deal outcomes',
    companyStage: ['Series B', 'Series C', 'Enterprise'],
    teamSize: ['5-15', '15+'],
    budget: '$25k-$150k/year',
    complexity: 'Medium',
    strengths: ['Conversation intelligence', 'Deal intelligence', 'Forecasting', 'Coaching'],
    weaknesses: ['Expensive', 'Requires adoption', 'Needs cultural buy-in'],
    alternatives: ['Chorus', 'Clari', 'Avoma'],
    whyUse: 'Best-in-class conversation intelligence with strong revenue insights.',
    whyNotUse: 'Expensive and requires sales team adoption.',
    website: 'https://gong.io'
  },
  {
    id: 'clari',
    name: 'Clari',
    category: 'Conversion',
    subcategory: 'Revenue Platform',
    primaryUseCase: 'Revenue platform for forecasting and pipeline management',
    bestFor: 'Sales leadership needing accurate forecasting',
    companyStage: ['Series C', 'Enterprise'],
    teamSize: ['15+'],
    budget: '$50k-$200k/year',
    complexity: 'High',
    strengths: ['Revenue forecasting', 'Pipeline inspection', 'Executive dashboards'],
    weaknesses: ['Expensive', 'Complex implementation', 'Requires data discipline'],
    alternatives: ['Gong', 'Salesforce', 'HubSpot'],
    whyUse: 'Best platform for revenue forecasting and pipeline management.',
    whyNotUse: 'Too expensive for most companies.',
    website: 'https://clari.com'
  },
  
  // Retention Tools
  {
    id: 'gainsight',
    name: 'Gainsight',
    category: 'Retention',
    subcategory: 'Customer Success',
    primaryUseCase: 'Customer success and retention platform',
    bestFor: 'Customer success teams managing enterprise accounts',
    companyStage: ['Series C', 'Enterprise'],
    teamSize: ['15+'],
    budget: '$50k-$300k/year',
    complexity: 'High',
    strengths: ['Comprehensive CS platform', 'Health scoring', 'Playbooks', 'Good analytics'],
    weaknesses: ['Expensive', 'Complex implementation', 'Requires CS ops resources'],
    alternatives: ['ChurnZero', 'Totango', 'Customer.io'],
    whyUse: 'Enterprise-grade customer success platform.',
    whyNotUse: 'Too expensive and complex for most companies.',
    website: 'https://gainsight.com'
  },
  {
    id: 'churnzero',
    name: 'ChurnZero',
    category: 'Retention',
    subcategory: 'Customer Success',
    primaryUseCase: 'Customer success platform for SaaS companies',
    bestFor: 'Customer success teams at growth-stage companies',
    companyStage: ['Series B', 'Series C'],
    teamSize: ['5-15', '15+'],
    budget: '$20k-$100k/year',
    complexity: 'Medium',
    strengths: ['Good health scoring', 'Playbooks', 'Easier than Gainsight', 'Good value'],
    weaknesses: ['Less features than Gainsight', 'Smaller ecosystem'],
    alternatives: ['Gainsight', 'Totango', 'Customer.io'],
    whyUse: 'Great customer success platform for growth-stage companies.',
    whyNotUse: 'Enterprise companies may need Gainsight.',
    website: 'https://churnzero.com'
  },
  {
    id: 'customer-io',
    name: 'Customer.io',
    category: 'Retention',
    subcategory: 'Lifecycle Marketing',
    primaryUseCase: 'Customer lifecycle messaging and automation',
    bestFor: 'Product-led companies automating customer communication',
    companyStage: ['Series A', 'Series B', 'Series C'],
    teamSize: ['1-5', '5-15'],
    budget: '$100-$5k/month',
    complexity: 'Medium',
    strengths: ['Powerful automation', 'Good for product-led', 'Flexible messaging', 'Good API'],
    weaknesses: ['Requires technical setup', 'Less marketing features than HubSpot'],
    alternatives: ['Intercom', 'ActiveCampaign', 'HubSpot'],
    whyUse: 'Best for product-led companies needing sophisticated lifecycle automation.',
    whyNotUse: 'Requires technical resources; less user-friendly than Intercom.',
    website: 'https://customer.io'
  },
  {
    id: 'intercom',
    name: 'Intercom',
    category: 'Retention',
    subcategory: 'Customer Communication',
    primaryUseCase: 'Customer communication, support, and engagement',
    bestFor: 'Companies wanting integrated customer communication',
    companyStage: ['Series A', 'Series B', 'Series C'],
    teamSize: ['5-15', '15+'],
    budget: '$500-$10k/month',
    complexity: 'Medium',
    strengths: ['Great UX', 'Chat and messaging', 'Support features', 'Product tours'],
    weaknesses: ['Expensive at scale', 'Less automation than Customer.io'],
    alternatives: ['Drift', 'Customer.io', 'HubSpot'],
    whyUse: 'Best-in-class customer communication platform.',
    whyNotUse: 'Can get expensive; less automation than alternatives.',
    website: 'https://intercom.com'
  },
  
  // Measurement Tools
  {
    id: 'ga4',
    name: 'Google Analytics 4',
    category: 'Measurement',
    subcategory: 'Web Analytics',
    primaryUseCase: 'Web analytics and user behavior tracking',
    bestFor: 'All companies tracking website performance',
    companyStage: ['Seed', 'Series A', 'Series B', 'Series C', 'Enterprise'],
    teamSize: ['1-5', '5-15', '15+'],
    budget: 'Free',
    complexity: 'Medium',
    strengths: ['Free', 'Comprehensive', 'Good integrations', 'Industry standard'],
    weaknesses: ['Complex UI', 'Learning curve', 'Privacy concerns'],
    alternatives: ['Mixpanel', 'Amplitude', 'PostHog'],
    whyUse: 'Free and comprehensive web analytics.',
    whyNotUse: 'Complex UI; product analytics may need Mixpanel/Amplitude.',
    website: 'https://analytics.google.com'
  },
  {
    id: 'mixpanel',
    name: 'Mixpanel',
    category: 'Measurement',
    subcategory: 'Product Analytics',
    primaryUseCase: 'Product analytics and user behavior analysis',
    bestFor: 'Product teams analyzing user behavior',
    companyStage: ['Series A', 'Series B', 'Series C'],
    teamSize: ['5-15', '15+'],
    budget: '$500-$5k/month',
    complexity: 'Medium',
    strengths: ['Great product analytics', 'Good event tracking', 'Funnels and cohorts', 'Good UX'],
    weaknesses: ['Expensive at scale', 'Less web analytics than GA4'],
    alternatives: ['Amplitude', 'PostHog', 'GA4'],
    whyUse: 'Best product analytics platform with great event tracking.',
    whyNotUse: 'Expensive; GA4 may be sufficient for basic needs.',
    website: 'https://mixpanel.com'
  },
  {
    id: 'amplitude',
    name: 'Amplitude',
    category: 'Measurement',
    subcategory: 'Product Analytics',
    primaryUseCase: 'Product analytics and behavioral data',
    bestFor: 'Product teams needing deep behavioral insights',
    companyStage: ['Series B', 'Series C', 'Enterprise'],
    teamSize: ['5-15', '15+'],
    budget: '$1k-$10k/month',
    complexity: 'Medium',
    strengths: ['Deep product analytics', 'Good experimentation', 'Behavioral data', 'Enterprise features'],
    weaknesses: ['Expensive', 'Complex setup', 'Overkill for simple needs'],
    alternatives: ['Mixpanel', 'PostHog', 'GA4'],
    whyUse: 'Enterprise-grade product analytics with strong experimentation.',
    whyNotUse: 'Too expensive and complex for most companies.',
    website: 'https://amplitude.com'
  },
  {
    id: 'posthog',
    name: 'PostHog',
    category: 'Measurement',
    subcategory: 'Product Analytics',
    primaryUseCase: 'Open-source product analytics and feature flags',
    bestFor: 'Technical teams wanting self-hosted analytics',
    companyStage: ['Seed', 'Series A', 'Series B'],
    teamSize: ['1-5', '5-15'],
    budget: 'Free-$2k/month',
    complexity: 'Medium',
    strengths: ['Open-source', 'Self-hosted option', 'Feature flags', 'Good value'],
    weaknesses: ['Requires technical setup', 'Less polished than commercial tools'],
    alternatives: ['Mixpanel', 'Amplitude', 'GA4'],
    whyUse: 'Great open-source alternative with self-hosting option.',
    whyNotUse: 'Requires technical resources; less polished UX.',
    website: 'https://posthog.com'
  },
  {
    id: 'segment',
    name: 'Segment',
    category: 'Measurement',
    subcategory: 'Customer Data Platform',
    primaryUseCase: 'Customer data platform and data integration',
    bestFor: 'Companies needing to unify customer data across tools',
    companyStage: ['Series B', 'Series C', 'Enterprise'],
    teamSize: ['5-15', '15+'],
    budget: '$500-$10k/month',
    complexity: 'High',
    strengths: ['Data integration', 'CDP capabilities', 'Good integrations', 'Clean data'],
    weaknesses: ['Expensive', 'Requires technical resources', 'Can be complex'],
    alternatives: ['RudderStack', 'mParticle', 'Zapier'],
    whyUse: 'Best CDP for unifying customer data across tools.',
    whyNotUse: 'Expensive and requires technical resources.',
    website: 'https://segment.com'
  },
  {
    id: 'zapier',
    name: 'Zapier',
    category: 'Measurement',
    subcategory: 'Automation',
    primaryUseCase: 'Workflow automation and integration',
    bestFor: 'Teams automating workflows between tools',
    companyStage: ['Seed', 'Series A', 'Series B'],
    teamSize: ['1-5', '5-15'],
    budget: '$20-$500/month',
    complexity: 'Low',
    strengths: ['Easy to use', 'Massive integrations', 'No-code', 'Good for simple automation'],
    weaknesses: ['Not for complex workflows', 'Can get expensive', 'Limited logic'],
    alternatives: ['Make', 'n8n', 'Workato'],
    whyUse: 'Best no-code automation tool for simple workflows.',
    whyNotUse: 'Not suitable for complex enterprise workflows.',
    website: 'https://zapier.com'
  }
];

// Helper functions
export function getToolById(id: string): Tool | undefined {
  return tools.find(t => t.id === id);
}

export function getToolsByCategory(category: string): Tool[] {
  return tools.filter(t => t.category === category);
}

export function getToolsByStage(stageId: string): Tool[] {
  const stage = gtmStages.find(s => s.id === stageId);
  if (!stage) return [];
  
  const toolIds = stage.capabilities.flatMap(cap => cap.tools);
  return toolIds.map(id => getToolById(id)).filter((t): t is Tool => t !== undefined);
}

export function getAllToolIds(): string[] {
  return gtmStages.flatMap(stage => 
    stage.capabilities.flatMap(cap => cap.tools)
  );
}
