# B2B GTM Intelligence Engine - Complete Implementation

## Overview

Successfully built a serious B2B GTM Intelligence Engine that provides data-driven, constraint-aware GTM recommendations. This is NOT a generic AI chatbot - it's a sophisticated planning tool that reasons backwards from commercial outcomes to channel recommendations.

## Architecture

### 1. Data Models (`src/types/gtm-engine.ts`)
- **CompanyProfile**: Business context (industry, stage, geography)
- **CommercialModel**: Economics (ARR, ACV, budget, margins)
- **GTMContext**: Sales motion and GTM strategy
- **ICPProfile**: Ideal customer definition
- **BuyerJourney**: Sales cycle, stakeholders, behavior
- **ResourceProfile**: Team capacity and capabilities
- **GTMFoundation**: Current infrastructure maturity
- **Channel**: Comprehensive channel metadata (35+ channels)
- **Benchmark**: Sourced industry benchmarks with confidence levels
- **GTMReport**: Complete output with recommendations

### 2. Channel Database (`src/data/channels.ts`)
35+ B2B channels with detailed metadata:
- **Funnel Stage**: Where in the buyer journey
- **Demand Type**: Capture, creation, activation, or mixed
- **Time to Impact**: Immediate, short, medium, long
- **Resource Requirements**: Team and content needs
- **Budget Requirements**: Minimum viable investment
- **Suitability Scores**: By ACV, sales cycle, GTM motion, company stage
- **Common Failure Modes**: What goes wrong

Channels include:
- SEO, Content Marketing, Organic LinkedIn
- Paid LinkedIn, Google Search, Retargeting
- Cold Email, Founder Outbound, SDR
- Webinars, Events, Conferences
- Partner Marketing, Referral Programs
- PLG, ABM, Communities
- Podcasts, Video, Research-led Marketing

### 3. Benchmark Registry (`src/data/benchmarks.ts`)
Sourced benchmarks with full context:
- **Source**: Original research organization
- **Date**: Publication and data year
- **Segment**: Company size, stage, geography
- **Sample Size**: Statistical validity
- **Confidence**: High, medium, low
- **Ranges**: Low/high bounds, not false precision

Benchmarks include:
- Conversion rates (visitor → lead → MQL → SQL → opportunity → close)
- CAC by segment and geography
- Sales cycles by deal size
- Channel performance (CPL, response rates)
- LTV and gross margins
- Marketing budget percentages
- Channel mix benchmarks

### 4. Calculation Engine (`src/engine/gtm-engine.ts`)
The core intelligence layer with 15+ calculation methods:

#### Validation Layer
- Detects impossible combinations (e.g., $2k budget + $10M target)
- Flags constraint violations
- Generates constraint reports when inputs are unrealistic

#### GTM Readiness Score (0-100)
10 weighted components:
1. ICP Clarity (15%)
2. Positioning Clarity (10%)
3. Product/Market Evidence (15%)
4. Commercial Economics (15%)
5. Demand Evidence (10%)
6. Funnel Infrastructure (10%)
7. Measurement Readiness (5%)
8. Sales Capacity (10%)
9. Marketing Capacity (5%)
10. Channel Readiness (5%)

#### Economic Engine
Bottom-up revenue model:
```
Required Customers = Target Revenue / ACV
Required Opportunities = Customers / Win Rate
Required SQLs = Opportunities / SQL-to-Opp Rate
Required MQLs = SQLs / MQL-to-SQL Rate
Required Leads = MQLs / Lead-to-MQL Rate
Required Traffic = Leads / Visitor-to-Lead Rate
```

Calculates:
- CAC and payback period
- LTV:CAC ratio
- Pipeline requirements
- Funnel forecasts (with ranges, not false precision)

#### Channel Fit Scoring
11 weighted components (0-100):
- ICP Fit (15%)
- Buyer Behavior Fit (15%)
- Intent Fit (10%)
- Economics Fit (15%)
- Budget Fit (10%)
- GTM Motion Fit (10%)
- Sales Cycle Fit (5%)
- Team Capacity Fit (10%)
- Asset Readiness (5%)
- Measurement Readiness (3%)
- Time-to-Impact Fit (2%)

#### Channel Penalties
Automatic deductions for:
- Budget below minimum viable threshold
- Insufficient team capacity
- Poor tracking/attribution
- Sales can't follow up
- Buyer doesn't use the channel
- Sales cycle makes channel uneconomical

#### Portfolio Design
Classifies channels as:
- **CORE**: Primary acquisition motion (60-80% budget)
- **GROWTH**: Secondary channels (15-30% budget)
- **EXPERIMENT**: Testing new channels (5-15% budget)
- **AVOID**: Explicitly not recommended

#### Budget Allocation
Three scenarios:
- **LEAN**: Protect cash, high-confidence channels only
- **BALANCED**: Core + one growth experiment
- **AGGRESSIVE**: Expand coverage, higher experimentation risk

#### Execution Planning
90-day plan with specific actions:
- Days 1-30: Foundation and first channel
- Days 31-60: Optimize and expand
- Days 61-90: Scale winners, cut losers

#### Measurement Hierarchy
7 levels of metrics:
1. Revenue (lagging)
2. Pipeline (lagging)
3. Opportunities (leading)
4. Qualified accounts (leading)
5. Engagement (leading)
6. Traffic (leading)
7. Impressions (vanity)

#### Evidence System
Every recommendation includes:
- Benchmark source and date
- Confidence level
- Relevance to user's situation
- Rationale for why this channel

#### Counterfactual Analysis
"What would change this recommendation?"
- If budget increases from ₹1L to ₹5L
- If ACV increases from ₹20K to ₹2L
- If sales cycle falls below 30 days
- If category search volume is low

### 5. User Interface

#### Multi-Step Questionnaire (8 Steps)
**Step 1: Business**
- Company name, website, industry
- Business model (SaaS, services, marketplace, etc.)
- Company stage (pre-PMF to mature)
- Geography

**Step 2: Commercial Economics**
- Current and target ARR
- ACV and gross margin
- Current and proposed budget
- Customer count

**Step 3: GTM Motion**
- Primary GTM motion (PLG, sales-led, founder-led, etc.)
- Sales motion (self-serve, inside sales, enterprise, etc.)

**Step 4: ICP**
- ICP narrowness (very broad to highly specific)
- Target company size
- Potential account count

**Step 5: Buyer Journey**
- Sales cycle length
- Number of stakeholders
- Purchase complexity
- Buyer behavior (search, referral, content, relationship-driven)

**Step 6: GTM Foundation**
- Website quality, SEO maturity
- Content library, social audience
- CRM, attribution, tracking
- Sales and marketing team strength

**Step 7: Resources**
- Team sizes (marketing, sales)
- Founder involvement
- Content, design, video capabilities
- Risk tolerance

**Step 8: Primary Objective**
- Main goal (pipeline, customers, awareness, efficiency, etc.)

#### Results Display
Professional report with:
- **Executive Summary**: One-paragraph recommendation
- **GTM Readiness Score**: 0-100 with component breakdown
- **Channel Portfolio**: Recommended channels with fit scores
- **Budget Allocation**: Three scenarios (Lean, Balanced, Aggressive)
- **Expected Funnel**: Traffic → Leads → Opportunities → Customers (ranges)
- **90-Day Plan**: Week-by-week execution plan
- **What NOT to Do**: Explicit warnings with reasons
- **Assumptions**: All assumptions listed transparently
- **Evidence & Sources**: Benchmark citations
- **Counterfactuals**: What would change the recommendation

## Key Differentiators

### 1. Constraint-Aware
Doesn't recommend channels you can't afford or operate:
- Budget below minimum viable threshold → "NOT READY"
- No sales team → Penalizes sales-dependent channels
- Poor tracking → Warns against hard-to-measure channels

### 2. Economics-First
Starts with business economics, not channels:
- Required pipeline = Target revenue / Win rate
- Required budget = Pipeline × CAC
- Channel selection based on economics, not popularity

### 3. Benchmark-Backed
Every recommendation cites sources:
- "B2B SaaS CAC: ₹2.5L (Accel India, 2024)"
- "Visitor-to-lead rate: 1.5-3.5% (HubSpot, 2024)"
- Confidence levels: High, medium, low

### 4. No False Precision
Uses ranges, not exact numbers:
- "Expected leads: 50-100/month" (not "73 leads")
- "CAC: ₹1.5L-₹2.5L" (not "₹1.87L")
- Explicit about assumptions

### 5. Explains "Why Not"
Explicitly recommends against channels:
- "Don't run Google Ads yet because budget is below meaningful testing threshold"
- "Don't launch 5 social channels because team capacity is insufficient"

### 6. Counterfactual Mode
Shows what would change the recommendation:
- "If budget increases to ₹5L/month → Add LinkedIn Ads"
- "If ACV increases to ₹2L → Increase outbound + ABM"

### 7. Geography-Aware
Different benchmarks for different regions:
- India-specific CAC benchmarks
- US/Europe benchmarks where available
- Explicit when using global benchmarks for local markets

### 8. Stage-Aware
Different recommendations by company stage:
- Pre-PMF: Founder-led outbound, validation experiments
- Seed: 1-2 channels, focus on learning
- Series A: 2-3 channels, start scaling
- Series B+: Full portfolio, enterprise channels

## User Experience

### Progressive Disclosure
- 8-step questionnaire with progress bar
- Contextual help text for complex fields
- "I don't know" option for unknown metrics
- Back/Next navigation

### Professional Output
- Clean, scannable report format
- Visual hierarchy with cards and sections
- Color-coded confidence levels
- Expandable sections for details

### Actionable Recommendations
- Specific channel recommendations with rationale
- Budget allocation by channel
- 90-day execution plan with tasks
- Measurement plan with KPIs
- Kill/scale conditions for experiments

## Technical Implementation

### File Structure
```
src/
├── types/
│   └── gtm-engine.ts          # Data models
├── data/
│   ├── channels.ts            # Channel database
│   └── benchmarks.ts          # Benchmark registry
├── engine/
│   └── gtm-engine.ts          # Calculation engine
└── pages/
    └── gtm-engine/
        ├── GTMIntelligenceEngine.tsx  # Main component
        ├── ResultsDisplay.tsx         # Results UI
        └── steps/
            ├── Step1Business.tsx
            ├── Step2Commercial.tsx
            └── CombinedSteps.tsx      # Steps 3-8
```

### Performance
- Lazy loading of step components
- Efficient state management
- Memoized calculations
- No external API calls (all client-side)

### Accessibility
- Keyboard navigation
- ARIA labels
- Focus management
- Color contrast compliance

## Testing Scenarios

### Test 1: Pre-Seed SaaS
- ₹1L/month budget
- Founder-led
- ACV ₹50K
- 3-month sales cycle

**Expected Output:**
- 1-2 channels (founder outbound + content)
- Lean scenario only
- Focus on validation, not scaling

### Test 2: Series A Enterprise SaaS
- ₹25L/month budget
- ACV ₹10L
- 9-month sales cycle
- 20-person sales team

**Expected Output:**
- ABM, LinkedIn, Events, Outbound
- Full portfolio (4-5 channels)
- Enterprise-focused recommendations

### Test 3: Low Budget
- ₹25K/month budget

**Expected Output:**
- 1 channel maximum
- "NOT READY" for most paid channels
- Focus on organic/founder-led

### Test 4: Impossible Economics
- ₹2K budget + ₹10M target

**Expected Output:**
- Constraint report
- "Target not achievable with current resources"
- Minimum viable plan

## Build Status

✅ **Build Successful**
- No errors
- 1,385 modules transformed
- Bundle: 581KB JS (147KB gzipped), 33KB CSS (7KB gzipped)
- Production-ready

## Future Enhancements

### Phase 2
1. **Export to PDF**: Professional report generation
2. **Save/Load**: Save multiple scenarios
3. **Sensitivity Analysis**: Interactive sliders for budget/ACV
4. **Channel Comparison**: Side-by-side channel analysis
5. **Integration Maps**: Show tool integrations
6. **Community Benchmarks**: User-submitted data (anonymized)

### Phase 3
1. **API Access**: Programmatic access to engine
2. **White-Label**: For agencies and consultants
3. **Team Collaboration**: Shared workspaces
4. **Historical Tracking**: Track recommendations over time
5. **AI Assistant**: Chat interface for follow-up questions

## Conclusion

The GTM Intelligence Engine successfully delivers:
- ✅ Serious, data-driven recommendations
- ✅ Constraint-aware planning
- ✅ Benchmark-backed evidence
- ✅ No false precision
- ✅ Transparent methodology
- ✅ Professional output quality
- ✅ Actionable 90-day plans
- ✅ Explicit "what not to do" guidance

This is NOT an AI toy. It's a legitimate GTM planning tool that credible enough for:
- Founders planning their next quarter
- Heads of Marketing challenging existing channel mix
- CMOs explaining budget allocation to CFOs
- Growth marketers identifying experiments
- RevOps leaders inspecting assumptions

The engine demonstrates that Subhasish Adhikary understands marketing systems deeply enough to build both **the strategy** and **the system that executes it**.
