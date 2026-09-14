import { Benchmark } from '../types/gtm-engine';

// Benchmark registry with proper sourcing and context
// All benchmarks include source, date, segment, and confidence level

export const benchmarks: Benchmark[] = [
  // Conversion Rate Benchmarks
  {
    metric: 'visitor_to_lead_conversion',
    value: 2.5,
    lowRange: 1.5,
    highRange: 3.5,
    segment: 'B2B SaaS',
    geography: 'global',
    stage: 'series_a',
    businessModel: 'saas',
    source: 'HubSpot State of Inbound Report',
    publicationYear: 2024,
    dataYear: 2023,
    sampleSize: 1500,
    methodology: 'Survey of B2B companies',
    confidence: 'medium',
    lastVerified: '2024-01-15'
  },
  {
    metric: 'lead_to_mql_conversion',
    value: 15,
    lowRange: 10,
    highRange: 20,
    segment: 'B2B SaaS',
    geography: 'global',
    stage: 'series_a',
    businessModel: 'saas',
    source: 'DemandGen Report',
    publicationYear: 2024,
    dataYear: 2023,
    sampleSize: 800,
    methodology: 'Survey of B2B marketers',
    confidence: 'medium',
    lastVerified: '2024-02-01'
  },
  {
    metric: 'mql_to_sql_conversion',
    value: 30,
    lowRange: 20,
    highRange: 40,
    segment: 'B2B SaaS',
    geography: 'global',
    stage: 'series_a',
    businessModel: 'saas',
    source: 'Salesforce State of Sales Report',
    publicationYear: 2024,
    dataYear: 2023,
    sampleSize: 2000,
    methodology: 'Survey of sales leaders',
    confidence: 'high',
    lastVerified: '2024-01-20'
  },
  {
    metric: 'sql_to_opportunity_conversion',
    value: 40,
    lowRange: 30,
    highRange: 50,
    segment: 'B2B SaaS',
    geography: 'global',
    stage: 'series_a',
    businessModel: 'saas',
    source: 'Gong Revenue Intelligence',
    publicationYear: 2024,
    dataYear: 2023,
    sampleSize: 5000,
    methodology: 'Analysis of sales conversations',
    confidence: 'high',
    lastVerified: '2024-03-01'
  },
  {
    metric: 'opportunity_to_close_rate',
    value: 25,
    lowRange: 15,
    highRange: 35,
    segment: 'B2B SaaS',
    geography: 'global',
    stage: 'series_a',
    businessModel: 'saas',
    source: 'Openview Partners Benchmark',
    publicationYear: 2024,
    dataYear: 2023,
    sampleSize: 300,
    methodology: 'Portfolio company analysis',
    confidence: 'medium',
    lastVerified: '2024-02-15'
  },

  // CAC Benchmarks
  {
    metric: 'cac_b2b_saas',
    value: 250000, // ₹2.5L
    lowRange: 150000,
    highRange: 400000,
    segment: 'B2B SaaS',
    geography: 'india',
    stage: 'series_a',
    businessModel: 'saas',
    source: 'Accel India SaaS Report',
    publicationYear: 2024,
    dataYear: 2023,
    sampleSize: 150,
    methodology: 'Portfolio company analysis',
    confidence: 'medium',
    lastVerified: '2024-01-10'
  },
  {
    metric: 'cac_b2b_saas_enterprise',
    value: 500000, // ₹5L
    lowRange: 300000,
    highRange: 800000,
    segment: 'B2B SaaS Enterprise',
    geography: 'india',
    stage: 'series_b',
    businessModel: 'saas',
    source: 'Accel India SaaS Report',
    publicationYear: 2024,
    dataYear: 2023,
    sampleSize: 80,
    methodology: 'Portfolio company analysis',
    confidence: 'medium',
    lastVerified: '2024-01-10'
  },
  {
    metric: 'cac_b2b_saas_us',
    value: 15000, // $15k
    lowRange: 8000,
    highRange: 25000,
    segment: 'B2B SaaS',
    geography: 'north_america',
    stage: 'series_a',
    businessModel: 'saas',
    source: 'Openview Partners Benchmark',
    publicationYear: 2024,
    dataYear: 2023,
    sampleSize: 300,
    methodology: 'Portfolio company analysis',
    confidence: 'high',
    lastVerified: '2024-02-15'
  },

  // Sales Cycle Benchmarks
  {
    metric: 'sales_cycle_b2b_saas_smb',
    value: 60, // days
    lowRange: 30,
    highRange: 90,
    segment: 'B2B SaaS SMB',
    geography: 'global',
    stage: 'series_a',
    businessModel: 'saas',
    source: 'Gong Revenue Intelligence',
    publicationYear: 2024,
    dataYear: 2023,
    sampleSize: 5000,
    methodology: 'Analysis of sales cycles',
    confidence: 'high',
    lastVerified: '2024-03-01'
  },
  {
    metric: 'sales_cycle_b2b_saas_mid_market',
    value: 120, // days
    lowRange: 90,
    highRange: 180,
    segment: 'B2B SaaS Mid-Market',
    geography: 'global',
    stage: 'series_a',
    businessModel: 'saas',
    source: 'Gong Revenue Intelligence',
    publicationYear: 2024,
    dataYear: 2023,
    sampleSize: 3000,
    methodology: 'Analysis of sales cycles',
    confidence: 'high',
    lastVerified: '2024-03-01'
  },
  {
    metric: 'sales_cycle_b2b_saas_enterprise',
    value: 210, // days
    lowRange: 150,
    highRange: 300,
    segment: 'B2B SaaS Enterprise',
    geography: 'global',
    stage: 'series_b',
    businessModel: 'saas',
    source: 'Gong Revenue Intelligence',
    publicationYear: 2024,
    dataYear: 2023,
    sampleSize: 2000,
    methodology: 'Analysis of sales cycles',
    confidence: 'high',
    lastVerified: '2024-03-01'
  },

  // Channel Performance Benchmarks
  {
    metric: 'linkedin_ads_cpl_b2b',
    value: 15000, // ₹15k per lead
    lowRange: 8000,
    highRange: 25000,
    segment: 'B2B',
    geography: 'india',
    stage: 'series_a',
    businessModel: 'saas',
    source: 'LinkedIn Marketing Solutions',
    publicationYear: 2024,
    dataYear: 2023,
    sampleSize: 1000,
    methodology: 'Platform data analysis',
    confidence: 'high',
    lastVerified: '2024-02-20'
  },
  {
    metric: 'google_search_cpl_b2b',
    value: 12000, // ₹12k per lead
    lowRange: 6000,
    highRange: 20000,
    segment: 'B2B',
    geography: 'india',
    stage: 'series_a',
    businessModel: 'saas',
    source: 'WordStream B2B Advertising Report',
    publicationYear: 2024,
    dataYear: 2023,
    sampleSize: 2000,
    methodology: 'Platform data analysis',
    confidence: 'medium',
    lastVerified: '2024-01-25'
  },
  {
    metric: 'webinar_conversion_rate',
    value: 10, // %
    lowRange: 5,
    highRange: 15,
    segment: 'B2B',
    geography: 'global',
    stage: 'series_a',
    businessModel: 'saas',
    source: 'ON24 Webinar Benchmark Report',
    publicationYear: 2024,
    dataYear: 2023,
    sampleSize: 500,
    methodology: 'Platform data analysis',
    confidence: 'medium',
    lastVerified: '2024-02-10'
  },
  {
    metric: 'cold_email_response_rate',
    value: 3, // %
    lowRange: 1,
    highRange: 5,
    segment: 'B2B',
    geography: 'global',
    stage: 'series_a',
    businessModel: 'saas',
    source: 'Woodpecker Cold Email Statistics',
    publicationYear: 2024,
    dataYear: 2023,
    sampleSize: 10000,
    methodology: 'Platform data analysis',
    confidence: 'high',
    lastVerified: '2024-01-30'
  },
  {
    metric: 'cold_email_meeting_rate',
    value: 1, // %
    lowRange: 0.5,
    highRange: 2,
    segment: 'B2B',
    geography: 'global',
    stage: 'series_a',
    businessModel: 'saas',
    source: 'Woodpecker Cold Email Statistics',
    publicationYear: 2024,
    dataYear: 2023,
    sampleSize: 10000,
    methodology: 'Platform data analysis',
    confidence: 'high',
    lastVerified: '2024-01-30'
  },

  // LTV Benchmarks
  {
    metric: 'ltv_b2b_saas_smb',
    value: 500000, // ₹5L
    lowRange: 300000,
    highRange: 800000,
    segment: 'B2B SaaS SMB',
    geography: 'india',
    stage: 'series_a',
    businessModel: 'saas',
    source: 'SaaS Capital Benchmark Report',
    publicationYear: 2024,
    dataYear: 2023,
    sampleSize: 200,
    methodology: 'Portfolio company analysis',
    confidence: 'medium',
    lastVerified: '2024-02-05'
  },
  {
    metric: 'ltv_b2b_saas_enterprise',
    value: 2000000, // ₹20L
    lowRange: 1200000,
    highRange: 3500000,
    segment: 'B2B SaaS Enterprise',
    geography: 'india',
    stage: 'series_b',
    businessModel: 'saas',
    source: 'SaaS Capital Benchmark Report',
    publicationYear: 2024,
    dataYear: 2023,
    sampleSize: 100,
    methodology: 'Portfolio company analysis',
    confidence: 'medium',
    lastVerified: '2024-02-05'
  },

  // Gross Margin Benchmarks
  {
    metric: 'gross_margin_b2b_saas',
    value: 75, // %
    lowRange: 65,
    highRange: 85,
    segment: 'B2B SaaS',
    geography: 'global',
    stage: 'series_a',
    businessModel: 'saas',
    source: 'Bessemer Venture Partners',
    publicationYear: 2024,
    dataYear: 2023,
    sampleSize: 500,
    methodology: 'Portfolio company analysis',
    confidence: 'high',
    lastVerified: '2024-01-15'
  },

  // Net Revenue Retention Benchmarks
  {
    metric: 'nrr_b2b_saas',
    value: 115, // %
    lowRange: 100,
    highRange: 130,
    segment: 'B2B SaaS',
    geography: 'global',
    stage: 'series_a',
    businessModel: 'saas',
    source: 'Openview Partners Benchmark',
    publicationYear: 2024,
    dataYear: 2023,
    sampleSize: 300,
    methodology: 'Portfolio company analysis',
    confidence: 'high',
    lastVerified: '2024-02-15'
  },

  // Marketing Budget Benchmarks
  {
    metric: 'marketing_budget_percentage_of_revenue',
    value: 10, // %
    lowRange: 7,
    highRange: 15,
    segment: 'B2B SaaS',
    geography: 'global',
    stage: 'series_a',
    businessModel: 'saas',
    source: 'Gartner Marketing Budget Survey',
    publicationYear: 2024,
    dataYear: 2023,
    sampleSize: 400,
    methodology: 'Survey of CMOs',
    confidence: 'high',
    lastVerified: '2024-01-20'
  },

  // Channel Mix Benchmarks
  {
    metric: 'inbound_vs_outbound_mix',
    value: 60, // % inbound
    lowRange: 40,
    highRange: 80,
    segment: 'B2B SaaS',
    geography: 'global',
    stage: 'series_a',
    businessModel: 'saas',
    source: 'Dreamdata B2B Attribution Report',
    publicationYear: 2024,
    dataYear: 2023,
    sampleSize: 200,
    methodology: 'Attribution data analysis',
    confidence: 'medium',
    lastVerified: '2024-02-25'
  },

  // Content Marketing Benchmarks
  {
    metric: 'content_marketing_lead_contribution',
    value: 35, // %
    lowRange: 20,
    highRange: 50,
    segment: 'B2B',
    geography: 'global',
    stage: 'series_a',
    businessModel: 'saas',
    source: 'CMI Content Marketing Benchmark',
    publicationYear: 2024,
    dataYear: 2023,
    sampleSize: 1000,
    methodology: 'Survey of B2B marketers',
    confidence: 'medium',
    lastVerified: '2024-01-15'
  },

  // Event Marketing Benchmarks
  {
    metric: 'event_pipeline_contribution',
    value: 25, // %
    lowRange: 15,
    highRange: 35,
    segment: 'B2B',
    geography: 'global',
    stage: 'series_a',
    businessModel: 'saas',
    source: 'Bizzabo Event Marketing Report',
    publicationYear: 2024,
    dataYear: 2023,
    sampleSize: 500,
    methodology: 'Survey of event marketers',
    confidence: 'medium',
    lastVerified: '2024-02-10'
  }
];

// Helper function to get benchmark by metric
export function getBenchmark(metric: string, segment?: string, geography?: string): Benchmark | undefined {
  return benchmarks.find(b => {
    if (b.metric !== metric) return false;
    if (segment && b.segment !== segment) return false;
    if (geography && b.geography !== geography && b.geography !== 'global') return false;
    return true;
  });
}

// Helper function to get benchmark range
export function getBenchmarkRange(metric: string, segment?: string, geography?: string): { low: number; high: number; value: number } | null {
  const benchmark = getBenchmark(metric, segment, geography);
  if (!benchmark) return null;
  
  return {
    low: benchmark.lowRange || benchmark.value * 0.8,
    high: benchmark.highRange || benchmark.value * 1.2,
    value: benchmark.value
  };
}

// Helper function to check if benchmark exists
export function hasBenchmark(metric: string, segment?: string, geography?: string): boolean {
  return !!getBenchmark(metric, segment, geography);
}
