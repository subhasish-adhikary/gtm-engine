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

// Main GTM Intelligence Engine
export class GTMEngine {
  private input: GTMInput;

  constructor(input: GTMInput) {
    this.input = input;
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

  // Validate inputs for impossible combinations
  private validateInputs(): { valid: boolean; issues: string[] } {
    const issues: string[] = [];
    const { commercial, resources, buyer } = this.input;

    // Check budget vs target
    if (commercial.targetARR && commercial.proposedBudget) {
      const requiredBudget = this.estimateRequiredBudget(commercial.targetARR, commercial.acv || 100000);
      if (commercial.proposedBudget < requiredBudget * 0.5) {
        issues.push(`Budget too low for target. Estimated minimum: ₹${(requiredBudget / 100000).toFixed(1)}L/month`);
      }
    }

    // Check sales cycle vs budget
    if (buyer.salesCycle === '12_plus' && commercial.proposedBudget && commercial.proposedBudget < 200000) {
      issues.push('Long sales cycle requires higher budget for sustained nurturing');
    }

    // Check team capacity vs channels
    if (resources.marketingTeamSize === 0 && resources.founderInvolvement === 'none') {
      issues.push('No marketing capacity identified. Founder involvement required.');
    }

    // Check ACV vs sales motion
    if ((commercial.acv || 0) > 500000 && this.input.gtm.salesMotion === 'self_serve') {
      issues.push('High ACV typically requires sales-led motion, not self-serve');
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
    const acv = commercial.acv || 100000;
    const targetARR = commercial.targetARR || (commercial.currentARR ? commercial.currentARR * 2 : 5000000);
    const currentARR = commercial.currentARR || 0;
    const requiredNewARR = targetARR - currentARR;

    // Calculate required customers
    const requiredCustomers = Math.ceil(requiredNewARR / acv);

    // Get conversion benchmarks
    const visitorToLead = getBenchmarkRange('visitor_to_lead_conversion', 'B2B SaaS', this.input.company.geography);
    const leadToMQL = getBenchmarkRange('lead_to_mql_conversion', 'B2B SaaS', this.input.company.geography);
    const mqlToSQL = getBenchmarkRange('mql_to_sql_conversion', 'B2B SaaS', this.input.company.geography);
    const sqlToOpp = getBenchmarkRange('sql_to_opportunity_conversion', 'B2B SaaS', this.input.company.geography);
    const oppToClose = getBenchmarkRange('opportunity_to_close_rate', 'B2B SaaS', this.input.company.geography);

    // Calculate funnel requirements (using ranges)
    const requiredOpps = {
      low: Math.ceil(requiredCustomers / ((oppToClose?.high || 35) / 100)),
      high: Math.ceil(requiredCustomers / ((oppToClose?.low || 15) / 100))
    };

    const requiredSQLs = {
      low: Math.ceil(requiredOpps.low / ((sqlToOpp?.high || 50) / 100)),
      high: Math.ceil(requiredOpps.high / ((sqlToOpp?.low || 30) / 100))
    };

    const requiredMQLs = {
      low: Math.ceil(requiredSQLs.low / ((mqlToSQL?.high || 40) / 100)),
      high: Math.ceil(requiredSQLs.high / ((mqlToSQL?.low || 20) / 100))
    };

    const requiredLeads = {
      low: Math.ceil(requiredMQLs.low / ((leadToMQL?.high || 20) / 100)),
      high: Math.ceil(requiredMQLs.high / ((leadToMQL?.low || 10) / 100))
    };

    const requiredTraffic = {
      low: Math.ceil(requiredLeads.low / ((visitorToLead?.high || 3.5) / 100)),
      high: Math.ceil(requiredLeads.high / ((visitorToLead?.low || 1.5) / 100))
    };

    // Calculate CAC
    const budget = commercial.proposedBudget || commercial.currentBudget;
    const cac = budget > 0 ? (budget * 12) / requiredCustomers : 0;

    // Calculate payback
    const grossMargin = commercial.grossMargin || 75;
    const monthlyGrossProfit = (acv * (grossMargin / 100)) / 12;
    const paybackMonths = monthlyGrossProfit > 0 ? cac / monthlyGrossProfit : 0;

    // Calculate LTV:CAC
    const ltv = commercial.ltv || (acv * 3); // Assume 3x ACV if not provided
    const ltvCacRatio = cac > 0 ? ltv / cac : 0;

    // Calculate pipeline required
    const pipelineRequired = {
      low: requiredOpps.low * acv,
      high: requiredOpps.high * acv
    };

    return {
      requiredCustomers,
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
        opportunities: requiredSQLs,
        customers: { low: requiredCustomers, high: Math.ceil(requiredCustomers * 1.2) },
        pipeline: pipelineRequired,
        revenue: { low: requiredNewARR, high: Math.ceil(requiredNewARR * 1.2) }
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
    const budget = commercial.proposedBudget || commercial.currentBudget;
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
    const budget = commercial.proposedBudget || commercial.currentBudget;

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
    const budget = commercial.proposedBudget || commercial.currentBudget;
    
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
    const budget = commercial.proposedBudget || commercial.currentBudget;
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
    const baseBudget = commercial.proposedBudget || commercial.currentBudget;

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
    return {
      traffic: { low: Math.round(funnel.traffic.low * factor), high: Math.round(funnel.traffic.high * factor) },
      leads: { low: Math.round(funnel.leads.low * factor), high: Math.round(funnel.leads.high * factor) },
      qualifiedLeads: { low: Math.round(funnel.qualifiedLeads.low * factor), high: Math.round(funnel.qualifiedLeads.high * factor) },
      opportunities: { low: Math.round(funnel.opportunities.low * factor), high: Math.round(funnel.opportunities.high * factor) },
      customers: { low: Math.round(funnel.customers.low * factor), high: Math.round(funnel.customers.high * factor) },
      pipeline: { low: Math.round(funnel.pipeline.low * factor), high: Math.round(funnel.pipeline.high * factor) },
      revenue: { low: Math.round(funnel.revenue.low * factor), high: Math.round(funnel.revenue.high * factor) }
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

    return assumptions;
  }

  // Generate evidence
  private generateEvidence(portfolio: ChannelScore[]) {
    const evidence: Array<{ claim: string; source: string; date: string; relevance: string }> = [];

    // Add benchmark evidence
    const cacBenchmark = getBenchmark('cac_b2b_saas', 'B2B SaaS', this.input.company.geography);
    if (cacBenchmark) {
      evidence.push({
        claim: `Average B2B SaaS CAC: ₹${cacBenchmark.value.toLocaleString()}`,
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

    const budget = this.input.commercial.proposedBudget || this.input.commercial.currentBudget;

    if (budget < 200000) {
      counterfactuals.push({
        condition: 'If budget increases to ₹5L/month',
        change: 'Add paid channels and increase experimentation'
      });
    }

    const acv = this.input.commercial.acv || 100000;
    if (acv < 200000) {
      counterfactuals.push({
        condition: 'If ACV increases to ₹5L',
        change: 'Shift to enterprise-focused channels and ABM'
      });
    }

    return counterfactuals;
  }

  // Helper methods
  private estimateRequiredBudget(targetARR: number, acv: number): number {
    const requiredCustomers = targetARR / acv;
    const cac = getBenchmark('cac_b2b_saas', 'B2B SaaS', this.input.company.geography)?.value || 250000;
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
    const avgConfidence = scores.reduce((sum, s) => {
      return sum + (s.confidence === 'high' ? 3 : s.confidence === 'medium' ? 2 : 1);
    }, 0) / scores.length;

    if (avgConfidence >= 2.5) return 'high';
    if (avgConfidence >= 1.5) return 'medium';
    
    return 'low';
  }

  private generateExecutiveRecommendation(
    readinessScore: GTMReadinessScore,
    portfolio: ChannelScore[],
    economics: any
  ): string {
    const channelNames = portfolio.slice(0, 3).map(p => getChannelById(p.channelId)?.name || p.channelId);
    const budget = this.input.commercial.proposedBudget || this.input.commercial.currentBudget;

    let recommendation = `Based on your GTM readiness score of ${readinessScore.overall}/100, `;

    if (readinessScore.overall >= 75) {
      recommendation += `you're well-positioned to scale. `;
    } else if (readinessScore.overall >= 60) {
      recommendation += `you have a solid foundation with some areas to strengthen. `;
    } else {
      recommendation += `you should address key constraints before scaling aggressively. `;
    }

    recommendation += `Recommended approach: Focus on ${channelNames.join(', ')}. `;
    recommendation += `With ₹${(budget / 100000).toFixed(1)}L/month budget, expect to generate `;
    recommendation += `${economics.expectedFunnel.leads.low}-${economics.expectedFunnel.leads.high} leads/month, `;
    recommendation += `resulting in ${economics.expectedFunnel.customers.low}-${economics.expectedFunnel.customers.high} new customers/month.`;

    return recommendation;
  }
}
