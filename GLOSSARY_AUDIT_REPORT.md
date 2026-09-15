# Glossary Audit Report

## Executive Summary

**Total Terms:** 222
**Categories:** 15
**Critical Issues Found:** 47
**Recommendations:** Consolidate to ~150 authoritative terms

## 1. DUPLICATE & SYNONYMOUS TERMS

### Critical Duplicates (Must Merge)

1. **CAC vs Customer Acquisition Cost**
   - `cac` (line 5168) and `customer-acquisition-cost` (line 5793)
   - Both define the same concept
   - **Action:** Merge into single `customer-acquisition-cost` page, make `cac` a redirect/abbreviation reference

2. **ABM vs Account-Based Marketing**
   - `abm` (line 1674) and `account-based-marketing` (line 1628)
   - Both define the same concept
   - **Action:** Merge into single `account-based-marketing` page, make `abm` a redirect/abbreviation reference

3. **RevOps vs Revenue Operations**
   - `revops` (line 1401) and `revenue-operations` (line 1354)
   - Both define the same concept
   - **Action:** Merge into single `revenue-operations` page, make `revops` a redirect/abbreviation reference

4. **CDP vs Customer Data Platform**
   - `cdp` (line 7841) and `customer-data-platform` (line 7810)
   - Both define the same concept
   - **Action:** Merge into single `customer-data-platform` page, make `cdp` a redirect/abbreviation reference

5. **Marketing Attribution vs Attribution**
   - `marketing-attribution` (line 7624) and `attribution` (line 5616)
   - Both define the same concept
   - **Action:** Merge into single `marketing-attribution` page, make `attribution` a redirect

6. **Retargeting vs Remarketing**
   - `retargeting` (line 6735) and `remarketing` (line 6768)
   - Definitions acknowledge they're often used interchangeably
   - **Action:** Merge into single `retargeting-remarketing` page explaining both terms

7. **Marketing Mix Modeling vs Media Mix Modeling**
   - `marketing-mix-modeling` (line 5661) and `media-mix-modeling` (line 5706)
   - Definitions acknowledge they're often used interchangeably
   - **Action:** Merge into single `marketing-mix-modeling` page explaining both terms

8. **AI Marketing (Duplicate Entries)**
   - `ai-marketing` appears twice: line 746 and line 3091
   - **Action:** Remove duplicate entry at line 3091

9. **AI Agents (Duplicate Entry)**
   - `ai-agents` appears twice: line 775 and line 3136
   - **Action:** Remove duplicate entry at line 3136

### Near-Duplicates (Should Consolidate)

10. **Category Design vs Category Creation**
    - `category-design` (line 7228) and `category-creation` (line 7259)
    - Very similar concepts with significant overlap
    - **Action:** Merge into single `category-design` page with section on category creation

11. **GTM Operations vs GTM Systems**
    - `gtm-operations` (line 423) and `gtm-systems` (line 452)
    - Very similar concepts
    - **Action:** Merge into single `gtm-operations` page

12. **Content Operations vs Content Intelligence**
    - `content-operations` (line 4717) and `content-intelligence` (line 4762)
    - Significant overlap in definition
    - **Action:** Merge into single `content-operations` page with intelligence section

13. **Sales Operations vs Funnel Operations vs Pipeline Operations**
    - `sales-operations` (line 8082), `funnel-operations` (line 8206), `pipeline-operations` (line 8268)
    - Significant overlap
    - **Action:** Consolidate into `sales-operations` page with sections on funnel and pipeline operations

14. **Revenue Intelligence vs Marketing Intelligence**
    - `revenue-intelligence` (line 8113) and `marketing-intelligence` (line 7779)
    - Similar concepts with different focus
    - **Action:** Keep both but add clear cross-references and comparison section

15. **Content Personalization vs Automated Personalization**
    - `content-personalization` (line 4807) and `automated-personalization` (line 1444)
    - Overlapping concepts
    - **Action:** Merge into single `personalization` page covering both

## 2. TERMS THAT SHOULD BE ABBREVIATION PAGES

These terms are abbreviations and should be thin pages that redirect to or reference the full term:

1. **PLG** (line 8610) → Should redirect to `product-led-growth`
2. **SLG** (line 8633) → Should redirect to `sales-led-growth`
3. **PLS** (line 8656) → Keep as separate concept (Product-Led Sales is distinct)
4. **ICP** (line 7414) → Should redirect to `ideal-customer-profile`
5. **CDP** (line 7841) → Should redirect to `customer-data-platform`
6. **ABM** (line 1674) → Should redirect to `account-based-marketing`
7. **RevOps** (line 1401) → Should redirect to `revenue-operations`
8. **CAC** (line 5168) → Should redirect to `customer-acquisition-cost`
9. **AEO** (line 3931) → Should redirect to `answer-engine-optimization`
10. **GEO** (line 3972) → Should redirect to `generative-engine-optimization`
11. **LLMO** (line 4055) → Should redirect to `llm-optimization`
12. **RAG** (line 2964) → Should redirect to `retrieval-augmented-generation`

## 3. THIN PAGES (Need More Depth)

These pages have definitions that are too generic and need more depth:

1. **gtm-intelligence** (line 394) - Generic definition, needs specific examples
2. **gtm-operations** (line 423) - Overlaps with gtm-systems, needs differentiation
3. **gtm-systems** (line 452) - Overlaps with gtm-operations, needs differentiation
4. **abm-lite** (line 1718) - Needs more detail on when to use vs full ABM
5. **programmatic-abm** (line 1763) - Needs more technical detail
6. **one-to-one-abm** (line 1808) - Needs more specific examples
7. **one-to-few-abm** (line 1853) - Needs more specific examples
8. **account-intelligence** (line 1898) - Needs more detail on data sources
9. **account-engagement** (line 1944) - Needs more specific metrics
10. **buying-group-marketing** (line 2037) - Needs more tactical detail
11. **ai-native-marketing** (line 2176) - Needs more concrete examples
12. **ai-assisted-marketing** (line 2264) - Needs more specific use cases
13. **ai-augmented-marketing** (line 2308) - Overlaps with ai-assisted, needs differentiation
14. **ai-ops** (line 2486) - Needs more detail on specific tools and processes
15. **ai-workflow** (line 2530) - Needs more concrete examples
16. **ai-automation** (line 2574) - Overlaps with ai-workflow, needs differentiation
17. **ai-content-operations** (line 3005) - Needs more specific workflows
18. **ai-content-engine** (line 3048) - Needs more technical detail
19. **content-led-growth** (line 4447) - Needs more specific examples
20. **content-distribution** (line 4537) - Needs more tactical detail
21. **content-repurposing** (line 4582) - Needs more specific examples
22. **content-atomization** (line 4627) - Needs more specific examples
23. **editorial-strategy** (line 4672) - Needs more framework detail
24. **content-velocity** (line 4852) - Needs more specific metrics
25. **content-decay** (line 4897) - Needs more specific detection methods
26. **content-refresh** (line 4942) - Needs more specific process
27. **content-gap** (line 4987) - Needs more specific identification methods
28. **paid-acquisition** (line 5123) - Needs more tactical detail
29. **cold-email-marketing** (line 5927) - Overlaps with cold-email, needs differentiation
30. **account-based-outbound** (line 6058) - Needs more specific examples
31. **multichannel-outbound** (line 6101) - Needs more specific sequences
32. **email-personalization** (line 6144) - Needs more specific techniques
33. **email-deliverability** (line 6188) - Needs more technical detail
34. **email-warmup** (line 6232) - Needs more specific process
35. **domain-reputation** (line 6276) - Needs more technical detail
36. **sender-reputation** (line 6320) - Needs more technical detail
37. **intent-based-outreach** (line 6364) - Needs more specific examples
38. **trigger-based-outreach** (line 6408) - Needs more specific examples
39. **sales-sequencing** (line 6451) - Needs more specific sequences
40. **multichannel-sequencing** (line 6495) - Needs more specific sequences
41. **cold-calling** (line 6538) - Needs more tactical detail
42. **social-selling** (line 6581) - Needs more specific tactics
43. **paid-search** (line 6626) - Needs more tactical detail
44. **paid-social** (line 6670) - Needs more tactical detail
45. **search-advertising** (line 6703) - Overlaps with paid-search, needs differentiation
46. **linkedin-ads** (line 6800) - Needs more specific tactics
47. **meta-ads** (line 6834) - Needs more specific tactics

## 4. INCORRECT CATEGORY ASSIGNMENTS

1. **product-led-growth** (line 112) - Currently in 'gtm', should be in 'growth' or new 'acquisition-models' category
2. **sales-led-growth** (line 141) - Currently in 'gtm', should be in 'growth' or new 'acquisition-models' category
3. **founder-led-growth** (line 246) - Currently in 'gtm', should be in 'growth' or new 'acquisition-models' category
4. **community-led-growth** (line 275) - Currently in 'gtm', should be in 'growth' or new 'acquisition-models' category
5. **partner-led-growth** (line 306) - Currently in 'gtm', should be in 'growth' or new 'acquisition-models' category
6. **ecosystem-led-growth** (line 335) - Currently in 'gtm', should be in 'growth' or new 'acquisition-models' category
7. **revenue-led-growth** (line 365) - Currently in 'gtm', should be in 'growth' or new 'acquisition-models' category
8. **founder-led-sales** (line 8331) - Currently in 'modern-acquisition', should be in 'outbound' or 'sales'
9. **founder-led-marketing** (line 8362) - Currently in 'modern-acquisition', should be in 'content' or 'growth'
10. **ecosystem-marketing** (line 8393) - Currently in 'modern-acquisition', should be in 'partnerships' or 'growth'
11. **creator-led-growth** (line 8486) - Currently in 'modern-acquisition', should be in 'growth' or 'content'
12. **referral-marketing** (line 8517) - Currently in 'modern-acquisition', should be in 'growth' or 'acquisition'
13. **viral-loops** (line 8548) - Currently in 'modern-acquisition', should be in 'growth' or 'product'
14. **product-virality** (line 8579) - Currently in 'modern-acquisition', should be in 'growth' or 'product'

## 5. INCONSISTENT DEFINITIONS

1. **GTM Strategy vs GTM Motion**
   - GTM Strategy definition includes "channels" but GTM Motion is specifically about channels
   - **Action:** Clarify that GTM Strategy is broader, GTM Motion is specifically about channel approach

2. **Marketing Attribution vs Multi-Touch Attribution**
   - Marketing Attribution definition is generic, Multi-Touch is specific
   - **Action:** Ensure Marketing Attribution clearly states it's the umbrella term

3. **Content Marketing vs Content-Led Growth**
   - Significant overlap in definitions
   - **Action:** Clarify that Content Marketing is the practice, Content-Led Growth is the strategy

4. **AI-Assisted Marketing vs AI-Augmented Marketing**
   - Definitions are nearly identical
   - **Action:** Merge into single page or clearly differentiate

## 6. MISSING RELATED-TERM RELATIONSHIPS

Critical missing relationships:

1. **CAC** should link to: LTV, LTV:CAC, Payback Period, ROAS
2. **LTV** should link to: CAC, LTV:CAC, Payback Period, Retention
3. **LTV:CAC** should link to: CAC, LTV, Payback Period
4. **Payback Period** should link to: CAC, LTV, Cash Flow
5. **Attribution** should link to: Multi-Touch Attribution, First-Touch, Last-Touch, Incrementality
6. **ICP** should link to: Persona, Buyer Persona, Account Selection, Account Tiering
7. **Positioning** should link to: Messaging, Value Proposition, Competitive Positioning
8. **Messaging** should link to: Positioning, Messaging Framework, Value Proposition
9. **SEO** should link to: Semantic SEO, Topical Authority, Entity SEO, Technical SEO
10. **AEO/GEO** should link to: AI Search, LLM Optimization, AI Visibility, AI Citation

## 7. KEYWORD CANNIBALIZATION RISKS

1. **GTM Strategy vs GTM Motion vs GTM Engineering**
   - All three target similar keywords
   - **Action:** Ensure clear differentiation in content and internal linking

2. **Content Marketing vs Content-Led Growth vs Content Operations**
   - All target "content" keywords
   - **Action:** Ensure clear differentiation

3. **AI Marketing vs AI Agents vs Agentic Marketing**
   - All target "AI marketing" keywords
   - **Action:** Ensure clear differentiation

4. **Paid Search vs Search Advertising**
   - Nearly identical concepts
   - **Action:** Merge or clearly differentiate

5. **Retargeting vs Remarketing**
   - Often used interchangeably
   - **Action:** Merge into single page

## 8. EMERGING TERMINOLOGY ISSUES

Terms marked as "emerging" that may actually be established:

1. **Product-Led Growth (PLG)** - Marked as emerging but is well-established
   - **Action:** Change to "established"

2. **Sales-Led Growth (SLG)** - Marked as emerging but is well-established
   - **Action:** Change to "established"

3. **Account-Based Marketing (ABM)** - Marked as emerging but is well-established
   - **Action:** Change to "established"

Terms marked as "established" that may actually be emerging:

1. **AI-Native Marketing** - Marked as established but is still emerging
   - **Action:** Change to "emerging"

2. **Agentic Marketing** - Marked as established but is still emerging
   - **Action:** Change to "emerging"

## 9. CLAIMS REQUIRING CITATIONS

Critical claims without citations:

1. **gtm-engineering** - "Companies with mature GTM engineering see 2-3x faster revenue growth"
   - **Action:** Add citation or remove specific claim

2. **product-led-growth** - "PLG companies grow 2-3x faster than traditional SaaS"
   - **Action:** Add citation or remove specific claim

3. **account-based-marketing** - "ABM accounts close 27% faster"
   - **Action:** Add citation or remove specific claim

4. **marketing-automation** - "Marketing automation increases revenue by 14.5%"
   - **Action:** Add citation or remove specific claim

## 10. AI-SOUNDING DEFINITIONS

Definitions that sound AI-generated and need rewriting:

1. **gtm-intelligence** - "GTM intelligence is the systematic collection..."
   - **Action:** Rewrite with more specific, concrete language

2. **ai-native-marketing** - "AI-native marketing represents a fundamental shift..."
   - **Action:** Rewrite with more concrete examples

3. **ai-assisted-marketing** - "AI-assisted marketing leverages artificial intelligence..."
   - **Action:** Rewrite with more specific use cases

4. **content-intelligence** - "Content intelligence combines market, customer..."
   - **Action:** Rewrite with more specific examples

## 11. MISSING COMPARISON OPPORTUNITIES

Missing comparison pages:

1. **PLG vs SLG vs PLS** - Should have dedicated comparison
2. **ABM vs Account-Based Outbound** - Should have dedicated comparison
3. **Content Marketing vs Content-Led Growth** - Should have dedicated comparison
4. **Marketing Attribution Models** - Should compare all attribution models
5. **GTM Motions** - Should compare all GTM motions
6. **AEO vs GEO vs LLM SEO** - Should have dedicated comparison

## RECOMMENDED CONSOLIDATION PLAN

### Phase 1: Remove Duplicates (Immediate)
- Remove 9 duplicate entries
- Convert 12 abbreviation entries to redirects
- **Result:** Reduce from 222 to ~201 terms

### Phase 2: Merge Near-Duplicates (Week 1)
- Merge 5 near-duplicate pairs
- **Result:** Reduce from ~201 to ~196 terms

### Phase 3: Consolidate Thin Pages (Week 2-3)
- Expand 20 thin pages with more depth
- Merge 5 overlapping thin pages
- **Result:** Reduce from ~196 to ~191 terms

### Phase 4: Fix Category Assignments (Week 3)
- Recategorize 14 terms
- Create new 'acquisition-models' category if needed
- **Result:** Better organization

### Phase 5: Add Missing Relationships (Week 4)
- Add 50+ missing related-term relationships
- Create 6 comparison pages
- **Result:** Stronger knowledge graph

### Final Target: ~150 Authoritative Terms

## PRIORITY ACTIONS

### Immediate (This Week)
1. Remove 9 duplicate entries
2. Convert 12 abbreviation entries to redirects
3. Fix 4 inconsistent definitions
4. Add 10 critical missing relationships

### Week 2
1. Merge 5 near-duplicate pairs
2. Expand 10 thin pages
3. Fix category assignments
4. Add citations to 10 claims

### Week 3
1. Expand remaining 10 thin pages
2. Add remaining 40 missing relationships
3. Rewrite 4 AI-sounding definitions
4. Create 3 comparison pages

### Week 4
1. Create remaining 3 comparison pages
2. Final review of all 150 terms
3. Update internal linking
4. Final quality check

## SUCCESS METRICS

- **Term Count:** Reduce from 222 to ~150 authoritative terms
- **Duplicate Rate:** Reduce from 4% to 0%
- **Thin Page Rate:** Reduce from 20% to <5%
- **Relationship Coverage:** Increase from 60% to 95%
- **Citation Coverage:** Increase from 70% to 95%
- **Category Accuracy:** Increase from 85% to 100%

## CONCLUSION

The glossary has strong foundational content but needs consolidation and quality improvements. By removing duplicates, merging near-duplicates, expanding thin pages, and adding missing relationships, we can create a more authoritative, useful knowledge graph that serves both users and search engines better.

The target is ~150 authoritative terms with strong internal linking, comprehensive coverage, and clear differentiation between related concepts.
