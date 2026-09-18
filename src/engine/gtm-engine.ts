import { 
  GTMInput, 
  GTMReport, 
  GTMReadinessScore, 
  ChannelScore, 
  BudgetScenario,
  Experiment
} from '../types/gtm-engine';
import { channels, getChannelById } from '../data/channels';
import { getBenchmark, getBenchmarkRange } from '../data/benchmarks';

/*
 * Currency handling.
 * The engine does NOT convert currencies (no conversion mechanism exists).
 * Instead, the reporting currency is resolved from the selected geography:
 * India-based benchmarks are denominated in INR, the North America CAC
 * benchmark in USD, and every other geography falls back to USD (the
 * currency used by the rest of the website). All displayed amounts are
 * explicitly prefixed with their currency symbol.
 */
export type EngineCurrency = 'INR' | 'USD';

export function currencyForGeography(geography?: string): EngineCurrency {
  return geography === 'india' ? 'INR' : 'USD';
}

export function formatEngineMoney(amount: number, currency: EngineCurrency): string {
  const safe = Number.isFinite(amount) ? Math.max(0, Math.round(amount)) : 0;
  return currency === 'INR'
    ? `₹${safe.toLocaleString('en-IN')}`
    : `$${safe.toLocaleString('en-US')}`;
}

// Sanitize a numeric input: any non-finite value (NaN, Infinity, undefined,
// malformed strings) falls back to the provided default.
function sanitizeNumber(value: unknown, fallback: number): number {
  return typeof value === 'number' && Number.isFinite(value) ? value : fallback;
}

// Clamp a computed range so that 0 <= low <= high. This is a final safety
// guard after the corrected formulas, not a substitute for them.
function orderRange(low: number, high: number): { low: number; high: number } {
  const l = Number.isFinite(low) ? Math.max(0, Math.ceil(low)) : 0;
  const h = Number.isFinite(high) ? Math.max(0, Math.ceil(high)) : 0;
  return { low: Math.min(l, h), high: Math.max(l, h) };
}

// Main GTM Intelligence Engine
export class GTMEngine {
  private input: GTMInput;

  constructor(input: GTMInput) {
    this.input = input;
  }

  private currency(): EngineCurrency {
    return currencyForGeography(this.input.company.geography);
  }

  private fmt(amount: number): string {
    return formatEngineMoney(amount, this.currency());
  }

  // Single source of truth for the effective budget. Proposed budget wins
  // when present; 0 is a legitimate value and must not fall through to the
  // current budget (the old `proposedBudget || currentBudget` pattern
  // silently replaced an entered zero with the fallback).
  private resolvedBudget(): number {
    const { proposedBudget, currentBudget } = this.input.commercial;
    if (typeof proposedBudget === 'number' && Number.isFinite(proposedBudget)) {
      return Math.max(0, proposedBudget);
    }
    if (typeof currentBudget === 'number' && Number.isFinite(currentBudget)) {
      return Math.max(0, currentBudget);
    }
    return 0;
  }

  // Generate complete GTM report
  generateReport(): GTMReport {
    // Step 1: Validate inputs
    const validation = this.validateInputs();
    if (!validation.valid) {
      return this.generateConstraintReport(validation.issues);
    }

    // Step 2: Calculate GTM Readiness Score
    const readinessScore = this.calculateReadinessScore();

    // Step 3: Calculate economic model
    const economics = this.calculateEconomics();

    // Step 4: Score all channels
    const channelScores = this.scoreAllChannels();

    // Step 5: Generate channel portfolio
    const portfolio = this.generateChannelPortfolio(channelScores);

    // Step 6: Generate budget scenarios
    const budgetScenarios = this.generateBudgetScenarios(portfolio, economics);

    // Step 7: Generate execution plan
    const executionPlan = this.generateExecutionPlan(portfolio);

    // Step 8: Generate measurement plan
    const measurementPlan = this.generateMeasurementPlan(portfolio);

    // Step 9: Generate "what not to do" list
    const whatNotToDo = this.generateWhatNotToDo(channelScores);

    // Step 10: Generate assumptions
    const assumptions = this.generateAssumptions(economics);

    // Step 11: Generate evidence
    const evidence = this.generateEvidence(channelScores);

    // Step 12: Generate counterfactuals
    const counterfactuals = this.generateCounterfactuals(portfolio, economics);

    // Step 13: Generate executive recommendation
    const executiveRecommendation = this.generateExecutiveRecommendation(
      readinessScore,
      portfolio,
      economics
    );

    return {
      diagnosis: {
        readinessScore,
        growthAmbition: this.calculateGrowthAmbition(),
        primaryConstraint: this.identifyPrimaryConstraint(readinessScore),
        recommendedMotion: this.input.gtm.primaryMotion,
        confidence: this.calculateOverallConfidence(channelScores)
      },
      executiveRecommendation,
      channelPortfolio: portfolio,
      budgetAllocation: budgetScenarios,
      expectedFunnel: economics.expectedFunnel,
      whatNotToDo,
      executionPlan,
      measurementPlan,
      assumptions,
      evidence,
      counterfactuals
    };
  }

  // Validate inputs for impossible values and combinations
  private validateInputs(): { valid: boolean; issues: string[] } {
    const issues: string[] = [];
    const { commercial, resources, buyer, icp } = this.input;

    // --- Numeric sanity (hard failures) ---
    const numericChecks: Array<{ label: string; value: unknown; optional: boolean }> = [
      { label: 'Current ARR', value: commercial.currentARR, optional: true },
      { label: 'Target ARR', value: commercial.targetARR, optional: true },
      { label: 'ACV', value: commercial.acv, optional: true },
      { label: 'Current budget', value: commercial.currentBudget, optional: false },
      { label: 'Proposed budget', value: commercial.proposedBudget, optional: true },
      { label: 'Current CAC', value: commercial.currentCAC, optional: true },
      { label: 'LTV', value: commercial.ltv, optional: true },
      { label: 'Gross margin', value: commercial.grossMargin, optional: true },
      { label: 'Current customers', value: commercial.currentCustomers, optional: true },
      { label: 'Potential accounts', value: icp.potentialAccounts, optional: true },
      { label: 'Marketing team size', value: resources.marketingTeamSize, optional: false },
      { label: 'Sales team size', value: resources.salesTeamSize, optional: false },
    ];

    for (const check of numericChecks) {
      if (check.value === undefined || check.value === null) {
        if (!check.optional) issues.push(`${check.label} is required.`);
        continue;
      }
      const v = check.value as number;
      if (!Number.isFinite(v)) {
        issues.push(`${check.label} must be a valid number.`);
        continue;
      }
      if (v < 0) {
        issues.push(`${check.label} cannot be negative.`);
        continue;
      }
      // Percentage fields must stay within 0-100.
      if (check.label === 'Gross margin' && v > 100) {
        issues.push('Gross margin must be between 0 and 100.');
      }
    }

    // Short-circuit: with invalid numerics, further checks are meaningless.
    if (issues.length > 0) {
      return { valid: false, issues };
    }

    const budget = commercial.proposedBudget ?? commercial.currentBudget ?? 0;
    const acv = commercial.acv ?? 0;
    const grossMargin = commercial.grossMargin;

    // Check budget vs target (only meaningful with a positive growth target)
    if (commercial.targetARR && budget > 0) {
      const currentARR = commercial.currentARR ?? 0;
      const requiredBudget = this.estimateRequiredBudget(
        Math.max(0, commercial.targetARR - currentARR),
        acv > 0 ? acv : 100000
      );
      if (requiredBudget > 0 && budget < requiredBudget * 0.5) {
        issues.push(`Budget too low for target. Estimated minimum: ${this.fmt(requiredBudget)}/month`);
      }
    }

    // Check sales cycle vs budget (threshold scales with the reporting currency)
    const longCycleBudgetFloor = this.currency() === 'INR' ? 200000 : 20000;
    if (buyer.salesCycle === '12_plus' && budget > 0 && budget < longCycleBudgetFloor) {
      issues.push('Long sales cycle requires higher budget for sustained nurturing');
    }

    // Check team capacity vs channels
    if (resources.marketingTeamSize === 0 && resources.founderInvolvement === 'none') {
      issues.push('No marketing capacity identified. Founder involvement required.');
    }

    // Check ACV vs sales motion
    if (acv > 500000 && this.input.gtm.salesMotion === 'self_serve') {
      issues.push('High ACV typically requires sales-led motion, not self-serve');
    }

    // Gross margin sanity (redundant with the loop above, kept explicit)
    if (grossMargin !== undefined && (grossMargin < 0 || grossMargin > 100)) {
      issues.push('Gross margin must be between 0 and 100.');
    }

    return {
      valid: issues.length === 0,
      issues
    };
  }

  // Generate constraint report when inputs are impossible
  private generateConstraintReport(issues: string[]): GTMReport {
    return {
      diagnosis: {
        readinessScore: this.calculateReadinessScore(),
        growthAmbition: 'Constrained by operating realities',
        primaryConstraint: issues[0],
        recommendedMotion: this.input.gtm.primaryMotion,
        confidence: 'low'
      },
      executiveRecommendation: `Your current constraints prevent achieving your stated goals. ${issues.join('. ')}. Consider adjusting targets or increasing resources.`,
      channelPortfolio: [],
      budgetAllocation: [],
      expectedFunnel: {
        traffic: { low: 0, high: 0 },
        leads: { low: 0, high: 0 },
        qualifiedLeads: { low: 0, high: 0 },
        opportunities: { low: 0, high: 0 },
        customers: { low: 0, high: 0 },
        pipeline: { low: 0, high: 0 },
        revenue: { low: 0, high: 0 }
      },
      whatNotToDo: [],
      executionPlan: {
        days1to30: ['Address primary constraints before scaling'],
        days31to60: ['Build minimum viable capacity'],
        days61to90: ['Reassess feasibility']
      },
      measurementPlan: {
        primaryKPI: 'Constraint resolution',
        secondaryKPIs: [],
        leadingIndicators: [],
        laggingIndicators: [],
        killConditions: [],
        scaleConditions: []
      },
      assumptions: ['Current constraints are binding'],
      evidence: [],
      counterfactuals: issues.map(issue => ({
        condition: issue,
        change: 'Resolve constraint to unlock growth'
      }))
    };
  }

  // Calculate GTM Readiness Score
  private calculateReadinessScore(): GTMReadinessScore {
    const { icp, commercial, foundation, resources, buyer } = this.input;

    // ICP Clarity (0-100)
    const icpClarity = this.calculateICPClarity();

    // Positioning Clarity (0-100)
    const positioningClarity = this.calculatePositioningClarity();

    // Product/Market Evidence (0-100)
    const productMarketEvidence = this.calculateProductMarketEvidence();

    // Commercial Economics (0-100)
    const commercialEconomics = this.calculateCommercialEconomics();

    // Demand Evidence (0-100)
    const demandEvidence = this.calculateDemandEvidence();

    // Funnel Infrastructure (0-100)
    const funnelInfrastructure = this.calculateFunnelInfrastructure();

    // Measurement Readiness (0-100)
    const measurementReadiness = this.calculateMeasurementReadiness();

    // Sales Capacity (0-100)
    const salesCapacity = this.calculateSalesCapacity();

    // Marketing Capacity (0-100)
    const marketingCapacity = this.calculateMarketingCapacity();

    // Channel Readiness (0-100)
    const channelReadiness = this.calculateChannelReadiness();

    const components = {
      icpClarity,
      positioningClarity,
      productMarketEvidence,
      commercialEconomics,
      demandEvidence,
      funnelInfrastructure,
      measurementReadiness,
      salesCapacity,
      marketingCapacity,
      channelReadiness
    };

    const overall = Math.round(
      (icpClarity * 0.15 +
       positioningClarity * 0.10 +
       productMarketEvidence * 0.15 +
       commercialEconomics * 0.15 +
       demandEvidence * 0.10 +
       funnelInfrastructure * 0.10 +
       measurementReadiness * 0.05 +
       salesCapacity * 0.10 +
       marketingCapacity * 0.05 +
       channelReadiness * 0.05)
    );

    const constraints = this.identifyConstraints(components);

    return { overall, components, constraints };
  }

  private calculateICPClarity(): number {
    const { icp } = this.input;
    let score = 50; // Base score

    if (icp.icpNarrowness === 'highly_specific') score += 30;
    else if (icp.icpNarrowness === 'focused') score += 20;
    else if (icp.icpNarrowness === 'broad') score += 10;

    if (icp.potentialAccounts && icp.potentialAccounts > 1000) score += 10;
    if (icp.verticalSpecialization) score += 10;

    return Math.min(100, score);
  }

  private calculatePositioningClarity(): number {
    // Simplified - in real implementation, would assess positioning clarity
    return 70;
  }

  private calculateProductMarketEvidence(): number {
    const { commercial, company } = this.input;
    let score = 50;

    if (company.stage === 'pre_pmf') score = 30;
    else if (company.stage === 'early_revenue') score = 50;
    else if (company.stage === 'seed') score = 70;
    else score = 85;

    if (commercial.currentCustomers && commercial.currentCustomers > 10) score += 10;
    if (commercial.currentARR && commercial.currentARR > 1000000) score += 10;

    return Math.min(100, score);
  }

  private calculateCommercialEconomics(): number {
    const { commercial } = this.input;
    let score = 50;

    if (commercial.acv && commercial.acv > 100000) score += 20;
    if (commercial.grossMargin && commercial.grossMargin > 70) score += 15;
    if (commercial.ltv && commercial.currentCAC && commercial.ltv > commercial.currentCAC * 3) score += 15;

    return Math.min(100, score);
  }

  private calculateDemandEvidence(): number {
    const { foundation } = this.input;
    let score = 50;

    if (foundation.organicTraffic === 'good' || foundation.organicTraffic === 'strong') score += 20;
    if (foundation.contentLibrary === 'good' || foundation.contentLibrary === 'strong') score += 15;
    if (foundation.socialAudience === 'good' || foundation.socialAudience === 'strong') score += 15;

    return Math.min(100, score);
  }

  private calculateFunnelInfrastructure(): number {
    const { foundation } = this.input;
    let score = 50;

    if (foundation.crm === 'good' || foundation.crm === 'strong') score += 20;
    if (foundation.attribution === 'good' || foundation.attribution === 'strong') score += 20;
    if (foundation.websiteQuality === 'good' || foundation.websiteQuality === 'strong') score += 10;

    return Math.min(100, score);
  }

  private calculateMeasurementReadiness(): number {
    const { foundation } = this.input;
    let score = 50;

    if (foundation.attribution === 'good' || foundation.attribution === 'strong') score += 30;
    if (foundation.crm === 'good' || foundation.crm === 'strong') score += 20;

    return Math.min(100, score);
  }

  private calculateSalesCapacity(): number {
    const { resources } = this.input;
    let score = 50;

    if (resources.salesTeamSize >= 5) score += 30;
    else if (resources.salesTeamSize >= 2) score += 20;
    else if (resources.salesTeamSize >= 1) score += 10;

    if (resources.sdrCapacity === 'good' || resources.sdrCapacity === 'strong') score += 20;

    return Math.min(100, score);
  }

  private calculateMarketingCapacity(): number {
    const { resources } = this.input;
    let score = 50;

    if (resources.marketingTeamSize >= 5) score += 30;
    else if (resources.marketingTeamSize >= 2) score += 20;
    else if (resources.marketingTeamSize >= 1) score += 10;

    if (resources.contentCapability === 'good' || resources.contentCapability === 'strong') score += 20;

    return Math.min(100, score);
  }

  private calculateChannelReadiness(): number {
    const { foundation } = this.input;
    let score = 50;

    if (foundation.paidMedia === 'good' || foundation.paidMedia === 'strong') score += 20;
    if (foundation.seoMaturity === 'good' || foundation.seoMaturity === 'strong') score += 20;
    if (foundation.contentLibrary === 'good' || foundation.contentLibrary === 'strong') score += 10;

    return Math.min(100, score);
  }

  private identifyConstraints(components: GTMReadinessScore['components']): string[] {
    const constraints: string[] = [];
    const threshold = 60;

    if (components.commercialEconomics < threshold) constraints.push('Weak commercial economics');
    if (components.salesCapacity < threshold) constraints.push('Limited sales capacity');
    if (components.measurementReadiness < threshold) constraints.push('Poor measurement infrastructure');
    if (components.demandEvidence < threshold) constraints.push('Weak demand evidence');
    if (components.channelReadiness < threshold) constraints.push('Limited channel readiness');

    return constraints.slice(0, 3); // Top 3 constraints
  }

  // Calculate economic model
  private calculateEconomics() {
    const { commercial, buyer } = this.input;
    const acv = Math.max(1, sanitizeNumber(commercial.acv, 100000));
    const targetARR = sanitizeNumber(commercial.targetARR, commercial.currentARR ? commercial.currentARR * 2 : 5000000);
    const currentARR = sanitizeNumber(commercial.currentARR, 0);

    // Net-new ARR required. A raw subtraction can go negative when the
    // stated target is at or below the current ARR, which previously
    // poisoned the entire funnel with negative values. Net-new acquisition
    // requirements are floored at zero; the zero-growth case is surfaced
    // transparently in the recommendation instead.
    const requiredNewARR = Math.max(0, targetARR - currentARR);
    const targetAtOrBelowCurrent = targetARR > 0 && targetARR <= currentARR;

    // Calculate required customers (annual, to hit the net-new target)
    const requiredCustomersAnnual = Math.ceil(requiredNewARR / acv);

    // Get conversion benchmarks (percent values, e.g. 2.5 = 2.5%)
    const visitorToLead = getBenchmarkRange('visitor_to_lead_conversion', 'B2B SaaS', this.input.company.geography);
    const leadToMQL = getBenchmarkRange('lead_to_mql_conversion', 'B2B SaaS', this.input.company.geography);
    const mqlToSQL = getBenchmarkRange('mql_to_sql_conversion', 'B2B SaaS', this.input.company.geography);
    const sqlToOpp = getBenchmarkRange('sql_to_opportunity_conversion', 'B2B SaaS', this.input.company.geography);
    const oppToClose = getBenchmarkRange('opportunity_to_close_rate', 'B2B SaaS', this.input.company.geography);

    // Structured funnel arithmetic (annual requirements):
    //   Customers = Net-new ARR / ACV
    //   Opportunities = Customers / close rate
    //   SQLs = Opportunities / SQL-to-opp rate   (SQLs >= Opportunities)
    //   MQLs = SQLs / MQL-to-SQL rate            (MQLs >= SQLs)
    //   Leads = MQLs / lead-to-MQL rate          (Leads >= MQLs)
    //   Traffic = Leads / visitor-to-lead rate   (Traffic >= Leads)
    // The "low" bound of each stage uses the HIGH conversion rate (best
    // case: fewer are needed); the "high" bound uses the LOW rate (worst
    // case). Numerators are non-negative, so ordering cannot invert.
    const requiredOppsAnnual = {
      low: Math.ceil(requiredCustomersAnnual / ((oppToClose?.high || 35) / 100)),
      high: Math.ceil(requiredCustomersAnnual / ((oppToClose?.low || 15) / 100))
    };

    const requiredSQLsAnnual = {
      low: Math.ceil(requiredOppsAnnual.low / ((sqlToOpp?.high || 50) / 100)),
      high: Math.ceil(requiredOppsAnnual.high / ((sqlToOpp?.low || 30) / 100))
    };

    const requiredMQLsAnnual = {
      low: Math.ceil(requiredSQLsAnnual.low / ((mqlToSQL?.high || 40) / 100)),
      high: Math.ceil(requiredSQLsAnnual.high / ((mqlToSQL?.low || 20) / 100))
    };

    const requiredLeadsAnnual = {
      low: Math.ceil(requiredMQLsAnnual.low / ((leadToMQL?.high || 20) / 100)),
      high: Math.ceil(requiredMQLsAnnual.high / ((leadToMQL?.low || 10) / 100))
    };

    const requiredTrafficAnnual = {
      low: Math.ceil(requiredLeadsAnnual.low / ((visitorToLead?.high || 3.5) / 100)),
      high: Math.ceil(requiredLeadsAnnual.high / ((visitorToLead?.low || 1.5) / 100))
    };

    // Convert annual requirements to monthly for reporting. The UI labels
    // the funnel as monthly, so the previous annual figures were displayed
    // 12x too large.
    const toMonthly = (r: { low: number; high: number }) =>
      orderRange(r.low / 12, r.high / 12);

    const requiredTraffic = toMonthly(requiredTrafficAnnual);
    const requiredLeads = toMonthly(requiredLeadsAnnual);
    const requiredMQLs = toMonthly(requiredMQLsAnnual);
    const requiredSQLs = toMonthly(requiredSQLsAnnual);
    const requiredOpps = toMonthly(requiredOppsAnnual);
    const requiredCustomers = orderRange(
      requiredCustomersAnnual / 12,
      requiredCustomersAnnual / 12
    );

    // Calculate CAC (blended, from annual spend and annual customer target)
    const budget = this.resolvedBudget();
    const cac = budget > 0 && requiredCustomersAnnual > 0 ? (budget * 12) / requiredCustomersAnnual : 0;

    // Calculate payback
    const grossMargin = Math.max(0, sanitizeNumber(commercial.grossMargin, 75));
    const monthlyGrossProfit = (acv * (grossMargin / 100)) / 12;
    const paybackMonths = monthlyGrossProfit > 0 && cac > 0 ? cac / monthlyGrossProfit : 0;

    // Calculate LTV:CAC
    const ltv = sanitizeNumber(commercial.ltv, acv * 3); // Assume 3x ACV if not provided
    const ltvCacRatio = cac > 0 ? ltv / cac : 0;

    // Calculate pipeline required (annual opportunity value)
    const pipelineRequired = orderRange(
      requiredOppsAnnual.low * acv,
      requiredOppsAnnual.high * acv
    );

    return {
      requiredCustomersAnnual,
      requiredNewARR,
      targetAtOrBelowCurrent,
      requiredTraffic,
      requiredLeads,
      requiredMQLs,
      requiredSQLs,
      requiredOpps,
      cac,
      paybackMonths,
      ltvCacRatio,
      pipelineRequired,
      expectedFunnel: {
        traffic: requiredTraffic,
        leads: requiredLeads,
        qualifiedLeads: requiredMQLs,
        // Fixed mislabeling: this stage previously displayed the SQL count.
        opportunities: requiredOpps,
        customers: requiredCustomers,
        pipeline: pipelineRequired,
        revenue: orderRange(requiredNewARR / 12, requiredNewARR / 12)
      }
    };
  }

  // Score all channels
  private scoreAllChannels(): ChannelScore[] {
    return channels.map(channel => this.scoreChannel(channel));
  }

  private scoreChannel(channel: typeof channels[0]): ChannelScore {
    const { icp, buyer, commercial, gtm, resources, foundation, company } = this.input;

    // Calculate individual fit scores
    const icpFit = this.calculateICPFitness(channel);
    const buyerFit = this.calculateBuyerFitness(channel, buyer);
    const intentFit = this.calculateIntentFitness(channel);
    const economicsFit = this.calculateEconomicsFitness(channel, commercial);
    const budgetFit = this.calculateBudgetFitness(channel, commercial);
    const motionFit = this.calculateMotionFitness(channel, gtm);
    const cycleFit = this.calculateCycleFitness(channel, buyer);
    const teamFit = this.calculateTeamFitness(channel, resources);
    const assetFit = this.calculateAssetFitness(channel, foundation);
    const measurementFit = this.calculateMeasurementFitness(channel, foundation);
    const timeFit = this.calculateTimeFitness(channel, buyer);

    // Calculate overall fit (weighted)
    const overallFit = Math.round(
      icpFit * 0.15 +
      buyerFit * 0.15 +
      intentFit * 0.10 +
      economicsFit * 0.15 +
      budgetFit * 0.10 +
      motionFit * 0.10 +
      cycleFit * 0.05 +
      teamFit * 0.10 +
      assetFit * 0.05 +
      measurementFit * 0.03 +
      timeFit * 0.02
    );

    // Apply penalties
    const penalties = this.calculatePenalties(channel);
    const adjustedFit = Math.max(0, overallFit - penalties.reduce((sum, p) => sum + 10, 0));

    // Determine recommendation
    const recommendation = this.determineRecommendation(adjustedFit, channel, commercial);

    // Calculate confidence
    const confidence = this.calculateConfidence(channel, foundation);

    // Generate rationale
    const rationale = this.generateRationale(channel, adjustedFit);

    return {
      channelId: channel.id,
      overallFit: adjustedFit,
      icpFit,
      buyerFit,
      intentFit,
      economicsFit,
      budgetFit,
      motionFit,
      cycleFit,
      teamFit,
      assetFit,
      measurementFit,
      timeFit,
      confidence,
      recommendation,
      rationale,
      penalties,
      minimumViableBudget: channel.minimumViableBudget,
      expectedContribution: this.estimateContribution(channel, adjustedFit)
    };
  }

  private calculateICPFitness(channel: typeof channels[0]): number {
    const { icp, commercial } = this.input;
    const acv = commercial.acv || 100000;
    const acvCategory = acv < 50000 ? 'low' : acv < 200000 ? 'medium' : 'high';
    
    return channel.suitabilityByACV[acvCategory];
  }

  private calculateBuyerFitness(channel: typeof channels[0], buyer: typeof this.input.buyer): number {
    let score = 70;

    if (buyer.buyerBehavior === 'search_driven' && ['seo', 'google_search'].includes(channel.id)) score += 20;
    if (buyer.buyerBehavior === 'content_driven' && ['content_marketing', 'webinars'].includes(channel.id)) score += 20;
    if (buyer.buyerBehavior === 'relationship_driven' && ['founder_outbound', 'events'].includes(channel.id)) score += 20;

    return Math.min(100, score);
  }

  private calculateIntentFitness(channel: typeof channels[0]): number {
    return channel.intentLevel === 'high' ? 90 : channel.intentLevel === 'medium' ? 70 : 50;
  }

  private calculateEconomicsFitness(channel: typeof channels[0], commercial: typeof this.input.commercial): number {
    const acv = commercial.acv || 100000;
    const cacPotential = channel.cacPotential;
    
    if (acv > 200000 && cacPotential === 'low') return 90;
    if (acv > 100000 && cacPotential === 'medium') return 75;
    if (cacPotential === 'high') return 60;
    
    return 70;
  }

  private calculateBudgetFitness(channel: typeof channels[0], commercial: typeof this.input.commercial): number {
    const budget = this.resolvedBudget();
    const minBudget = channel.minimumViableBudget;
    
    if (budget >= minBudget * 2) return 90;
    if (budget >= minBudget) return 70;
    if (budget >= minBudget * 0.5) return 50;
    
    return 30;
  }

  private calculateMotionFitness(channel: typeof channels[0], gtm: typeof this.input.gtm): number {
    const motionMap: Record<string, keyof typeof channel.suitabilityByMotion> = {
      'plg': 'plg',
      'sales_led': 'sales_led',
      'founder_led': 'founder_led',
      'marketing_led': 'marketing_led',
      'product_led': 'plg',
      'partner_led': 'sales_led',
      'community_led': 'marketing_led',
      'hybrid': 'sales_led'
    };
    
    const mappedMotion = motionMap[gtm.primaryMotion] || 'sales_led';
    return channel.suitabilityByMotion[mappedMotion];
  }

  private calculateCycleFitness(channel: typeof channels[0], buyer: typeof this.input.buyer): number {
    const cycleCategory = buyer.salesCycle === 'less_30' || buyer.salesCycle === '30_90' ? 'short' :
                         buyer.salesCycle === '3_6_months' ? 'medium' : 'long';
    
    return channel.suitabilityBySalesCycle[cycleCategory];
  }

  private calculateTeamFitness(channel: typeof channels[0], resources: typeof this.input.resources): number {
    let score = 70;

    if (channel.salesDependency === 'high' && resources.salesTeamSize < 2) score -= 30;
    if (channel.contentDependency === 'high' && resources.contentCapability === 'weak') score -= 20;
    if (channel.technicalDependency === 'high' && resources.technicalCapability === 'weak') score -= 20;

    return Math.max(0, score);
  }

  private calculateAssetFitness(channel: typeof channels[0], foundation: typeof this.input.foundation): number {
    let score = 60;

    if (channel.id === 'seo' && foundation.seoMaturity === 'strong') score += 30;
    if (channel.id === 'content_marketing' && foundation.contentLibrary === 'strong') score += 30;
    if (channel.id === 'organic_linkedin' && foundation.socialAudience === 'strong') score += 30;

    return Math.min(100, score);
  }

  private calculateMeasurementFitness(channel: typeof channels[0], foundation: typeof this.input.foundation): number {
    if (foundation.attribution === 'strong') return 90;
    if (foundation.attribution === 'good') return 75;
    if (foundation.attribution === 'developing') return 60;
    
    return channel.measurementDifficulty === 'easy' ? 70 : 50;
  }

  private calculateTimeFitness(channel: typeof channels[0], buyer: typeof this.input.buyer): number {
    const urgency = buyer.salesCycle === 'less_30' ? 'immediate' : 'medium';
    
    if (urgency === 'immediate' && channel.timeToImpact === 'immediate') return 95;
    if (urgency === 'immediate' && channel.timeToImpact === 'short') return 80;
    if (urgency === 'immediate' && channel.timeToImpact === 'long') return 40;
    
    return 70;
  }

  private calculatePenalties(channel: typeof channels[0]): string[] {
    const penalties: string[] = [];
    const { commercial, resources, foundation, buyer } = this.input;
    const budget = this.resolvedBudget();

    if (budget < channel.minimumViableBudget) {
      penalties.push('Budget below minimum viable threshold');
    }

    if (channel.salesDependency === 'high' && resources.salesTeamSize === 0) {
      penalties.push('No sales capacity to follow up');
    }

    if (channel.contentDependency === 'high' && resources.contentCapability === 'none') {
      penalties.push('No content creation capacity');
    }

    if (foundation.attribution === 'none' && channel.measurementDifficulty === 'hard') {
      penalties.push('Poor tracking for difficult-to-measure channel');
    }

    if (buyer.salesCycle === '12_plus' && channel.timeToImpact === 'immediate') {
      penalties.push('Channel too tactical for long sales cycle');
    }

    return penalties;
  }

  private determineRecommendation(fit: number, channel: typeof channels[0], commercial: typeof this.input.commercial): ChannelScore['recommendation'] {
    const budget = this.resolvedBudget();
    
    if (fit >= 80 && budget >= channel.minimumViableBudget) return 'core';
    if (fit >= 65 && budget >= channel.minimumViableBudget * 0.7) return 'growth';
    if (fit >= 50 && budget >= channel.minimumViableBudget * 0.5) return 'experiment';
    
    return 'avoid';
  }

  private calculateConfidence(channel: typeof channels[0], foundation: typeof this.input.foundation): ChannelScore['confidence'] {
    if (foundation.attribution === 'strong' && foundation.crm === 'strong') return 'high';
    if (foundation.attribution === 'good' || foundation.crm === 'good') return 'medium';
    
    return 'low';
  }

  private generateRationale(channel: typeof channels[0], fit: number): string[] {
    const rationale: string[] = [];

    if (fit >= 80) {
      rationale.push('Strong strategic fit for your situation');
    }

    if (channel.intentLevel === 'high') {
      rationale.push('High intent audience');
    }

    if (channel.brandImpact === 'high') {
      rationale.push('Strong brand building potential');
    }

    return rationale;
  }

  private estimateContribution(channel: typeof channels[0], fit: number): string {
    if (fit >= 80) return 'High contribution expected';
    if (fit >= 65) return 'Moderate contribution expected';
    if (fit >= 50) return 'Limited contribution expected';
    
    return 'Minimal contribution expected';
  }

  // Generate channel portfolio
  private generateChannelPortfolio(scores: ChannelScore[]): ChannelScore[] {
    // Sort by fit score
    const sorted = [...scores].sort((a, b) => b.overallFit - a.overallFit);

    // Select top channels based on capacity
    const { resources, commercial } = this.input;
    const budget = this.resolvedBudget();
    const teamSize = resources.marketingTeamSize + resources.salesTeamSize;

    // Determine max channels based on capacity
    const maxChannels = teamSize <= 2 ? 2 : teamSize <= 5 ? 3 : 5;

    // Select portfolio
    const portfolio: ChannelScore[] = [];
    let coreCount = 0;
    let growthCount = 0;
    let experimentCount = 0;

    for (const score of sorted) {
      if (portfolio.length >= maxChannels) break;

      if (score.recommendation === 'core' && coreCount < 2) {
        portfolio.push(score);
        coreCount++;
      } else if (score.recommendation === 'growth' && growthCount < 2) {
        portfolio.push(score);
        growthCount++;
      } else if (score.recommendation === 'experiment' && experimentCount < 1) {
        portfolio.push(score);
        experimentCount++;
      }
    }

    return portfolio;
  }

  // Generate budget scenarios
  private generateBudgetScenarios(portfolio: ChannelScore[], economics: any): BudgetScenario[] {
    const { commercial } = this.input;
    const baseBudget = this.resolvedBudget();

    const scenarios: BudgetScenario[] = [
      this.generateLeanScenario(portfolio, baseBudget, economics),
      this.generateBalancedScenario(portfolio, baseBudget, economics),
      this.generateAggressiveScenario(portfolio, baseBudget, economics)
    ];

    return scenarios;
  }

  private generateLeanScenario(portfolio: ChannelScore[], budget: number, economics: any): BudgetScenario {
    const coreChannels = portfolio.filter(p => p.recommendation === 'core').slice(0, 2);
    
    const allocations = coreChannels.map((channel, idx) => ({
      channelId: channel.channelId,
      allocation: idx === 0 ? 70 : 30,
      role: 'core' as const
    }));

    return {
      name: 'Lean',
      monthlyBudget: budget,
      quarterlyBudget: budget * 3,
      annualBudget: budget * 12,
      channels: allocations,
      expectedActivity: ['Focus on highest-confidence channels', 'Minimize experimentation'],
      expectedFunnel: this.scaleFunnel(economics.expectedFunnel, 0.7),
      risk: 'Low risk, limited upside',
      timeToImpact: '3-6 months',
      requiredCapacity: ['Minimal team capacity required']
    };
  }

  private generateBalancedScenario(portfolio: ChannelScore[], budget: number, economics: any): BudgetScenario {
    const coreChannels = portfolio.filter(p => p.recommendation === 'core').slice(0, 2);
    const growthChannels = portfolio.filter(p => p.recommendation === 'growth').slice(0, 1);

    const allocations = [
      ...coreChannels.map((channel, idx) => ({
        channelId: channel.channelId,
        allocation: idx === 0 ? 50 : 30,
        role: 'core' as const
      })),
      ...growthChannels.map(channel => ({
        channelId: channel.channelId,
        allocation: 20,
        role: 'growth' as const
      }))
    ];

    return {
      name: 'Balanced',
      monthlyBudget: budget,
      quarterlyBudget: budget * 3,
      annualBudget: budget * 12,
      channels: allocations,
      expectedActivity: ['Core channels + one growth experiment', 'Moderate risk profile'],
      expectedFunnel: economics.expectedFunnel,
      risk: 'Moderate risk, balanced upside',
      timeToImpact: '2-4 months',
      requiredCapacity: ['Moderate team capacity required']
    };
  }

  private generateAggressiveScenario(portfolio: ChannelScore[], budget: number, economics: any): BudgetScenario {
    const allocations = portfolio.slice(0, 4).map((channel, idx) => ({
      channelId: channel.channelId,
      allocation: idx === 0 ? 40 : idx === 1 ? 30 : idx === 2 ? 20 : 10,
      role: (idx < 2 ? 'core' : idx === 2 ? 'growth' : 'experiment') as 'core' | 'growth' | 'experiment'
    }));

    return {
      name: 'Aggressive',
      monthlyBudget: budget,
      quarterlyBudget: budget * 3,
      annualBudget: budget * 12,
      channels: allocations,
      expectedActivity: ['Multiple channels in parallel', 'Higher experimentation'],
      expectedFunnel: this.scaleFunnel(economics.expectedFunnel, 1.3),
      risk: 'Higher risk, higher potential upside',
      timeToImpact: '1-3 months',
      requiredCapacity: ['Significant team capacity required']
    };
  }

  private scaleFunnel(funnel: any, factor: number) {
    const scale = (r: { low: number; high: number }) =>
      orderRange(r.low * factor, r.high * factor);
    return {
      traffic: scale(funnel.traffic),
      leads: scale(funnel.leads),
      qualifiedLeads: scale(funnel.qualifiedLeads),
      opportunities: scale(funnel.opportunities),
      customers: scale(funnel.customers),
      pipeline: scale(funnel.pipeline),
      revenue: scale(funnel.revenue)
    };
  }

  // Generate execution plan
  private generateExecutionPlan(portfolio: ChannelScore[]) {
    const channelNames = portfolio.map(p => getChannelById(p.channelId)?.name || p.channelId);

    return {
      days1to30: [
        'Set up tracking and attribution',
        'Define ICP and target account list',
        'Create messaging framework',
        `Launch ${channelNames[0]} (primary channel)`,
        'Establish measurement baseline'
      ],
      days31to60: [
        `Optimize ${channelNames[0]} based on initial data`,
        `Launch ${channelNames[1] || 'secondary channel'}`,
        'Create first content assets',
        'Begin outbound prospecting',
        'Review and adjust targeting'
      ],
      days61to90: [
        'Analyze channel performance',
        'Double down on winning channels',
        'Cut underperforming experiments',
        'Scale budget in winning channels',
        'Plan next quarter strategy'
      ]
    };
  }

  // Generate measurement plan
  private generateMeasurementPlan(portfolio: ChannelScore[]) {
    return {
      primaryKPI: 'Pipeline generated',
      secondaryKPIs: ['Qualified leads', 'Opportunities created', 'CAC by channel'],
      leadingIndicators: ['Traffic', 'Lead volume', 'Engagement rate'],
      laggingIndicators: ['Revenue', 'Customer count', 'LTV'],
      killConditions: ['CAC > 2x target', 'Lead quality < 50% of target', 'No pipeline after 60 days'],
      scaleConditions: ['CAC < target', 'Lead quality > target', 'Pipeline coverage > 3x']
    };
  }

  // Generate "what not to do" list
  private generateWhatNotToDo(scores: ChannelScore[]) {
    const avoidChannels = scores.filter(s => s.recommendation === 'avoid').slice(0, 5);

    return avoidChannels.map(score => {
      const channel = getChannelById(score.channelId);
      return {
        channel: channel?.name || score.channelId,
        reasons: score.penalties.length > 0 ? score.penalties : ['Poor fit for current situation']
      };
    });
  }

  // Generate assumptions
  private generateAssumptions(economics: any) {
    const assumptions: string[] = [
      'Conversion rates based on industry benchmarks',
      'Sales cycle duration remains constant',
      'ACV remains stable',
      'Market conditions remain stable'
    ];

    if (!this.input.commercial.currentCAC) {
      assumptions.push('CAC estimated using industry benchmarks');
    }

    if (!this.input.commercial.ltv) {
      assumptions.push('LTV estimated as 3x ACV');
    }

    // Currency proxy disclosure: benchmarks are currency-denominated, and
    // geographies without a matched benchmark use the USD benchmark.
    const geo = this.input.company.geography;
    if (geo !== 'india' && geo !== 'north_america') {
      assumptions.push('CAC benchmark uses the US figure as a proxy for the selected geography; treat absolute CAC values as indicative.');
    }

    if (economics.targetAtOrBelowCurrent) {
      assumptions.push('Stated ARR target is at or below current ARR, so no net-new acquisition is modeled.');
    }

    return assumptions;
  }

  // Generate evidence
  private generateEvidence(portfolio: ChannelScore[]) {
    const evidence: Array<{ claim: string; source: string; date: string; relevance: string }> = [];

    // Add benchmark evidence (currency-matched to the reporting currency)
    const geo = this.input.company.geography;
    const cacBenchmark =
      geo === 'india'
        ? getBenchmark('cac_b2b_saas', 'B2B SaaS', 'india')
        : getBenchmark('cac_b2b_saas_us', 'B2B SaaS', 'north_america');
    if (cacBenchmark) {
      evidence.push({
        claim: `Average ${geo === 'india' ? 'India' : 'US'} B2B SaaS CAC: ${this.fmt(cacBenchmark.value)}`,
        source: cacBenchmark.source,
        date: `${cacBenchmark.publicationYear}`,
        relevance: 'Used to validate CAC assumptions'
      });
    }

    return evidence;
  }

  // Generate counterfactuals
  private generateCounterfactuals(portfolio: ChannelScore[], economics: any) {
    const counterfactuals: Array<{ condition: string; change: string }> = [];

    const budget = this.resolvedBudget();

    // Thresholds scale with the reporting currency so the same heuristic
    // applies to INR- and USD-denominated inputs.
    const inr = this.currency() === 'INR';
    const budgetThreshold = inr ? 200000 : 20000;
    const budgetUpsellTarget = inr ? 500000 : 50000;
    const acvThreshold = inr ? 200000 : 20000;
    const acvUpsellTarget = inr ? 500000 : 50000;

    if (budget > 0 && budget < budgetThreshold) {
      counterfactuals.push({
        condition: `If budget increases to ${this.fmt(budgetUpsellTarget)}/month`,
        change: 'Add paid channels and increase experimentation'
      });
    }

    const acv = this.input.commercial.acv || 0;
    if (acv > 0 && acv < acvThreshold) {
      counterfactuals.push({
        condition: `If ACV increases to ${this.fmt(acvUpsellTarget)}`,
        change: 'Shift to enterprise-focused channels and ABM'
      });
    }

    return counterfactuals;
  }

  // Helper methods
  private estimateRequiredBudget(netNewARR: number, acv: number): number {
    if (netNewARR <= 0 || acv <= 0) return 0;
    const requiredCustomers = netNewARR / acv;
    // Use the CAC benchmark that matches the reporting currency of the
    // selected geography. India has an INR-denominated benchmark; North
    // America a USD-denominated one. Other geographies fall back to the USD
    // benchmark (the website's default currency) and the assumption is
    // surfaced in the report.
    const geo = this.input.company.geography;
    const cacBenchmark =
      geo === 'india'
        ? getBenchmark('cac_b2b_saas', 'B2B SaaS', 'india')
        : getBenchmark('cac_b2b_saas_us', 'B2B SaaS', 'north_america');
    const cacFallback = this.currency() === 'INR' ? 250000 : 15000;
    const cac = sanitizeNumber(cacBenchmark?.value, cacFallback);
    const totalInvestment = requiredCustomers * cac;

    return totalInvestment / 12; // Monthly budget
  }

  private calculateGrowthAmbition(): string {
    const { commercial } = this.input;
    if (!commercial.currentARR || !commercial.targetARR) return 'Unknown';
    
    const growthRate = ((commercial.targetARR - commercial.currentARR) / commercial.currentARR) * 100;
    
    if (growthRate > 200) return 'Aggressive (2x+ growth)';
    if (growthRate > 100) return 'Strong (2x growth)';
    if (growthRate > 50) return 'Moderate (1.5x growth)';
    
    return 'Conservative (<1.5x growth)';
  }

  private identifyPrimaryConstraint(readinessScore: GTMReadinessScore): string {
    return readinessScore.constraints[0] || 'No major constraints identified';
  }

  private calculateOverallConfidence(scores: ChannelScore[]): 'high' | 'medium' | 'low' {
    // Heuristic confidence, NOT a statistically validated measure. It
    // combines three transparent factors:
    //   1. Average per-channel confidence (derived from attribution + CRM
    //      maturity of the inputs).
    //   2. Input completeness: how many of the optional commercial numbers
    //      the user actually provided. A model built on defaults deserves
    //      lower confidence.
    //   3. Benchmark coverage: whether a currency- and geography-matched CAC
    //      benchmark exists.
    const { commercial } = this.input;

    const avgConfidence = scores.length > 0
      ? scores.reduce((sum, s) => {
          return sum + (s.confidence === 'high' ? 3 : s.confidence === 'medium' ? 2 : 1);
        }, 0) / scores.length
      : 1;

    const optionalInputs = [
      commercial.acv,
      commercial.targetARR,
      commercial.currentARR,
      commercial.proposedBudget,
      commercial.grossMargin,
      commercial.ltv,
      commercial.currentCAC,
      commercial.currentCustomers,
    ];
    const provided = optionalInputs.filter(v => typeof v === 'number' && Number.isFinite(v)).length;
    const completeness = provided / optionalInputs.length;

    const geo = this.input.company.geography;
    const hasCurrencyMatchedCAC =
      geo === 'india'
        ? !!getBenchmark('cac_b2b_saas', 'B2B SaaS', 'india')
        : !!getBenchmark('cac_b2b_saas_us', 'B2B SaaS', 'north_america');
    const benchmarkCoverage = hasCurrencyMatchedCAC ? 1 : 0.5;

    // Weighted heuristic score out of 3.
    const score =
      avgConfidence * 0.5 +
      completeness * 3 * 0.3 +
      benchmarkCoverage * 3 * 0.2;

    if (score >= 2.4 && completeness >= 0.5) return 'high';
    if (score >= 1.6 && completeness >= 0.25) return 'medium';

    return 'low';
  }

  private generateExecutiveRecommendation(
    readinessScore: GTMReadinessScore,
    portfolio: ChannelScore[],
    economics: any
  ): string {
    const channelNames = portfolio.slice(0, 3).map(p => getChannelById(p.channelId)?.name || p.channelId);
    const commercial = this.input.commercial;
    const budget = this.resolvedBudget();

    let recommendation = `Based on your GTM readiness score of ${readinessScore.overall}/100, `;

    if (readinessScore.overall >= 75) {
      recommendation += `you're well-positioned to scale. `;
    } else if (readinessScore.overall >= 60) {
      recommendation += `you have a solid foundation with some areas to strengthen. `;
    } else {
      recommendation += `you should address key constraints before scaling aggressively. `;
    }

    recommendation += `Recommended approach: Focus on ${channelNames.join(', ')}. `;

    // Zero-budget state: no paid acquisition can be modeled, so no funnel
    // projection is presented (organic recommendations still stand).
    if (budget <= 0) {
      recommendation += `No acquisition budget was provided, so no paid acquisition projections are modeled. The recommendations above are limited to channels that can run on organic effort alone; add a budget to see volume projections.`;
      return recommendation;
    }

    // Target at or below current ARR: the model requires zero net-new
    // acquisition, which is stated plainly instead of showing zero-funnel.
    if (economics.targetAtOrBelowCurrent) {
      recommendation += `Your stated ARR target is at or below your current ARR, so this plan models no net-new acquisition. Increase your target above ${this.fmt(commercial.currentARR ?? 0)} to see volume requirements.`;
      return recommendation;
    }

    // The funnel figures are REQUIREMENTS to hit the stated target at
    // benchmark conversion rates, expressed per month, not guarantees.
    const funnel = economics.expectedFunnel;
    recommendation += `To reach your target with ${this.fmt(budget)}/month, plan for approximately `;
    recommendation += `${funnel.leads.low.toLocaleString()}-${funnel.leads.high.toLocaleString()} leads/month `;
    recommendation += `and ${funnel.customers.low.toLocaleString()}-${funnel.customers.high.toLocaleString()} net-new customers/month at benchmark conversion rates.`;

    return recommendation;
  }
}
