// Core data models for GTM Intelligence Engine

export interface CompanyProfile {
  name: string;
  website?: string;
  industry: string;
  businessModel: 'saas' | 'services' | 'marketplace' | 'technology' | 'agency' | 'consulting' | 'professional_services' | 'infrastructure' | 'other';
  stage: 'pre_pmf' | 'early_revenue' | 'seed' | 'series_a' | 'series_b' | 'growth' | 'mature';
  geography: 'india' | 'north_america' | 'europe' | 'apac' | 'middle_east' | 'global' | 'other';
}

export interface CommercialModel {
  currentARR?: number;
  targetARR?: number;
  growthTarget?: number;
  acv?: number;
  grossMargin?: number;
  currentBudget: number;
  proposedBudget?: number;
  currentSpendTotal?: number;
  currentCustomers?: number;
  targetCustomers?: number;
  currentCAC?: number;
  targetCAC?: number;
  ltv?: number;
  conversionRates?: {
    visitorToLead?: number;
    leadToMQL?: number;
    mqlToSQL?: number;
    sqlToOpportunity?: number;
    opportunityToClose?: number;
  };
}

export interface GTMContext {
  primaryMotion: 'plg' | 'sales_led' | 'marketing_led' | 'founder_led' | 'product_led' | 'partner_led' | 'community_led' | 'hybrid';
  salesMotion: 'self_serve' | 'inside_sales' | 'outbound_sdr' | 'ae_led' | 'enterprise_sales' | 'channel_partner' | 'founder_led';
}

export interface ICPProfile {
  companySize?: string;
  industry?: string;
  geography?: string;
  jobTitles?: string[];
  seniority?: string[];
  potentialAccounts?: number;
  tamEstimate?: number;
  customerConcentration?: 'low' | 'medium' | 'high';
  verticalSpecialization?: boolean;
  technographicRequirements?: string[];
  icpNarrowness: 'very_broad' | 'broad' | 'focused' | 'highly_specific';
}

export interface BuyerJourney {
  salesCycle: 'less_30' | '30_90' | '3_6_months' | '6_12_months' | '12_plus';
  stakeholders: '1' | '2_3' | '4_6' | '7_plus';
  purchaseComplexity: 'low' | 'medium' | 'high' | 'enterprise';
  buyerBehavior: 'search_driven' | 'referral_driven' | 'community_driven' | 'relationship_driven' | 'outreach_driven' | 'content_driven' | 'mixed';
  categoryEstablished: boolean;
  problemUnderstood: boolean;
  buyerSearchesActively: boolean;
  categoryCrowded: boolean;
  trustCritical: boolean;
}

export interface ResourceProfile {
  marketingTeamSize: number;
  salesTeamSize: number;
  founderInvolvement: 'none' | 'low' | 'medium' | 'high';
  availableHoursPerWeek: number;
  contentCapability: 'none' | 'weak' | 'developing' | 'good' | 'strong';
  designCapability: 'none' | 'weak' | 'developing' | 'good' | 'strong';
  videoCapability: 'none' | 'weak' | 'developing' | 'good' | 'strong';
  sdrCapacity: 'none' | 'weak' | 'developing' | 'good' | 'strong';
  technicalCapability: 'none' | 'weak' | 'developing' | 'good' | 'strong';
  budgetFlexibility: 'rigid' | 'somewhat_flexible' | 'very_flexible';
  riskTolerance: 'conservative' | 'balanced' | 'aggressive';
}

export interface GTMFoundation {
  websiteQuality: 'none' | 'weak' | 'developing' | 'good' | 'strong';
  seoMaturity: 'none' | 'weak' | 'developing' | 'good' | 'strong';
  organicTraffic: 'none' | 'weak' | 'developing' | 'good' | 'strong';
  emailList: 'none' | 'weak' | 'developing' | 'good' | 'strong';
  crm: 'none' | 'weak' | 'developing' | 'good' | 'strong';
  contentLibrary: 'none' | 'weak' | 'developing' | 'good' | 'strong';
  socialAudience: 'none' | 'weak' | 'developing' | 'good' | 'strong';
  customerProof: 'none' | 'weak' | 'developing' | 'good' | 'strong';
  caseStudies: 'none' | 'weak' | 'developing' | 'good' | 'strong';
  salesTeam: 'none' | 'weak' | 'developing' | 'good' | 'strong';
  sdrCapacity: 'none' | 'weak' | 'developing' | 'good' | 'strong';
  marketingTeam: 'none' | 'weak' | 'developing' | 'good' | 'strong';
  partnerships: 'none' | 'weak' | 'developing' | 'good' | 'strong';
  community: 'none' | 'weak' | 'developing' | 'good' | 'strong';
  paidMedia: 'none' | 'weak' | 'developing' | 'good' | 'strong';
  attribution: 'none' | 'weak' | 'developing' | 'good' | 'strong';
}

export interface PrimaryObjective {
  goal: 'pipeline' | 'customers' | 'new_market' | 'awareness' | 'reduce_cac' | 'organic' | 'outbound' | 'inbound' | 'launch' | 'validate' | 'scale' | 'expansion' | 'partner_growth' | 'efficiency';
}

export interface Channel {
  id: string;
  name: string;
  funnelStage: string[];
  demandType: 'capture' | 'creation' | 'activation' | 'mixed';
  timeToImpact: 'immediate' | 'short' | 'medium' | 'long';
  resourceRequirement: 'low' | 'medium' | 'high';
  budgetRequirement: 'low' | 'medium' | 'high';
  minimumViableBudget: number;
  scalability: 'low' | 'medium' | 'high';
  audienceSpecificity: 'broad' | 'targeted' | 'narrow';
  intentLevel: 'low' | 'medium' | 'high';
  salesDependency: 'none' | 'low' | 'medium' | 'high';
  contentDependency: 'none' | 'low' | 'medium' | 'high';
  technicalDependency: 'none' | 'low' | 'medium' | 'high';
  measurementDifficulty: 'easy' | 'medium' | 'hard';
  cacPotential: 'low' | 'medium' | 'high';
  brandImpact: 'low' | 'medium' | 'high';
  pipelineImpact: 'low' | 'medium' | 'high';
  suitabilityByACV: {
    low: number; // < 50k
    medium: number; // 50k-200k
    high: number; // > 200k
  };
  suitabilityBySalesCycle: {
    short: number; // < 3 months
    medium: number; // 3-6 months
    long: number; // > 6 months
  };
  suitabilityByMotion: {
    plg: number;
    sales_led: number;
    founder_led: number;
    marketing_led: number;
  };
  suitabilityByStage: {
    pre_pmf: number;
    seed: number;
    series_a: number;
    series_b: number;
    growth: number;
  };
  suitableGeography: string[];
  commonFailureModes: string[];
}

export interface ChannelScore {
  channelId: string;
  overallFit: number;
  icpFit: number;
  buyerFit: number;
  intentFit: number;
  economicsFit: number;
  budgetFit: number;
  motionFit: number;
  cycleFit: number;
  teamFit: number;
  assetFit: number;
  measurementFit: number;
  timeFit: number;
  confidence: 'high' | 'medium' | 'low';
  recommendation: 'core' | 'growth' | 'experiment' | 'avoid';
  rationale: string[];
  penalties: string[];
  minimumViableBudget: number;
  expectedContribution: string;
}

export interface Benchmark {
  metric: string;
  value: number;
  lowRange?: number;
  highRange?: number;
  segment: string;
  geography: string;
  stage: string;
  businessModel: string;
  source: string;
  publicationYear: number;
  dataYear: number;
  sampleSize?: number;
  methodology?: string;
  confidence: 'high' | 'medium' | 'low';
  lastVerified: string;
}

export interface GTMReadinessScore {
  overall: number;
  components: {
    icpClarity: number;
    positioningClarity: number;
    productMarketEvidence: number;
    commercialEconomics: number;
    demandEvidence: number;
    funnelInfrastructure: number;
    measurementReadiness: number;
    salesCapacity: number;
    marketingCapacity: number;
    channelReadiness: number;
  };
  constraints: string[];
}

export interface BudgetScenario {
  name: string;
  monthlyBudget: number;
  quarterlyBudget: number;
  annualBudget: number;
  channels: Array<{
    channelId: string;
    allocation: number;
    role: 'core' | 'growth' | 'experiment';
  }>;
  expectedActivity: string[];
  expectedFunnel: {
    traffic: { low: number; high: number };
    leads: { low: number; high: number };
    qualifiedLeads: { low: number; high: number };
    opportunities: { low: number; high: number };
    customers: { low: number; high: number };
    pipeline: { low: number; high: number };
    revenue: { low: number; high: number };
  };
  risk: string;
  timeToImpact: string;
  requiredCapacity: string[];
}

export interface Experiment {
  hypothesis: string;
  channel: string;
  audience: string;
  budget: number;
  duration: string;
  expectedSignal: string;
  primaryKPI: string;
  secondaryKPIs: string[];
  killCondition: string;
  scaleCondition: string;
}

export interface GTMReport {
  diagnosis: {
    readinessScore: GTMReadinessScore;
    growthAmbition: string;
    primaryConstraint: string;
    recommendedMotion: string;
    confidence: 'high' | 'medium' | 'low';
  };
  executiveRecommendation: string;
  channelPortfolio: ChannelScore[];
  budgetAllocation: BudgetScenario[];
  expectedFunnel: {
    traffic: { low: number; high: number };
    leads: { low: number; high: number };
    qualifiedLeads: { low: number; high: number };
    opportunities: { low: number; high: number };
    customers: { low: number; high: number };
    pipeline: { low: number; high: number };
    revenue: { low: number; high: number };
  };
  whatNotToDo: Array<{
    channel: string;
    reasons: string[];
  }>;
  executionPlan: {
    days1to30: string[];
    days31to60: string[];
    days61to90: string[];
  };
  measurementPlan: {
    primaryKPI: string;
    secondaryKPIs: string[];
    leadingIndicators: string[];
    laggingIndicators: string[];
    killConditions: string[];
    scaleConditions: string[];
  };
  assumptions: string[];
  evidence: Array<{
    claim: string;
    source: string;
    date: string;
    relevance: string;
  }>;
  counterfactuals: Array<{
    condition: string;
    change: string;
  }>;
}

export interface GTMInput {
  company: CompanyProfile;
  commercial: CommercialModel;
  gtm: GTMContext;
  icp: ICPProfile;
  buyer: BuyerJourney;
  foundation: GTMFoundation;
  resources: ResourceProfile;
  objective: PrimaryObjective;
}
