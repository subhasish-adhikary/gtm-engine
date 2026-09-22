"""
Content for the five downloadable lead magnets.

Authored against the site's own material so the resources read as an extension of
subhasishadhikary.com rather than generic marketing output:

* glossary terminology (222 terms across 15 categories)
* the 79 curated GTM stacks in src/data/gtmStacks.ts
* the 24 sourced benchmarks in src/data/benchmarks.ts
* the nine interactive tools, and the Thinking article themes

Block schema consumed by generate-lead-magnets.py:
    ('lead', text) ('p', text) ('h2', text) ('bullets', [..]) ('numbered', [..])
    ('callout', text) ('table', {'cols': [...], 'rows': [[...]], 'widths': [..], 'caption': str})
    ('kv', [[k, v], ...]) ('diagram', 'architecture'|'ladder') ('pagebreak', None)
"""

BRAND = {
    'ink': '#17191C',
    'muted': '#62676D',
    'faint': '#8A8F95',
    'rule': '#E1E3E5',
    'accent': '#155EEF',
    'accent_dark': '#1246A0',
    'paper': '#F7F7F5',
    'surface': '#EAF2FF',
    'card': '#FFFFFF',
}

SITE = 'subhasishadhikary.com'

# ---------------------------------------------------------------------------
# 1. B2B GTM Audit Checklist
# ---------------------------------------------------------------------------

AUDIT = {
    'key': 'audit',
    'filename': 'b2b-gtm-audit-checklist.pdf',
    'kicker': 'Lead magnet',
    'title': 'B2B GTM Audit Checklist',
    'subtitle': 'A 16-area audit of the go-to-market system, scored 0-3, with an action framework for the next 30, 60 and 90 days.',
    'meta': [
        ('Author', 'Subhasish Adhikary'),
        ('Format', 'Self-scored audit, 16 areas'),
        ('Scoring', '0-3 per question, 0-48 total'),
        ('Companion', 'tools/gtm-diagnostic'),
    ],
    'sections': [
        {'h1': 'How to run the audit', 'blocks': [
            ('lead', 'This audit scores the system, not the campaign. Work through all 16 areas before acting on any single score: the point is to see which part of the machine is limiting the others, then fix that first.'),
            ('p', 'Score every question 0-3. A 0 is not a judgement about the team; it is a statement that the capability does not exist in a repeatable form yet.'),
            ('table', {
                'cols': ['Score', 'Definition', 'What it implies'],
                'widths': [0.9, 2.4, 3.2],
                'rows': [
                    ['0', 'Absent. Nobody owns it; the process changes with each person.', 'Foundational gap. Fix before optimising downstream.'],
                    ['1', 'Ad hoc. It happens, but undocumented and inconsistent.', 'Fragile. Write the standard down first.'],
                    ['2', 'Documented and followed, with gaps at the edges.', 'Working. Tighten measurement and edge cases.'],
                    ['3', 'Instrumented, owned, reviewed on a cadence.', 'Leverage. Tune, do not rebuild.'],
                ],
            }),
            ('callout', 'Rule of thumb: any area scoring 0 or 1 on more than half its questions is upstream of the numbers you are trying to move. Fix that area first — dashboards will not.'),
        ]},
        {'h1': 'Audit areas', 'blocks': [
            ('p', 'Sixteen areas, four questions each. The "good looks like" and "warning signs" columns are the fastest way to spot where your answer would be optimistic.'),
            ('pagebreak', None),
        ]},

        ('ICP', 'Ideal customer profile', [
            ('Is the ICP written down with firmographics, technographics and buying triggers — or does it live in someone\'s head?'),
            ('Do closed-won accounts from the last four quarters actually match the stated ICP?'),
            ('Is there an explicit disqualification list, not just an inclusion list?'),
            ('Has the ICP been reviewed since the last product, pricing or market change?'),
        ], 'A one-page ICP with firmographic, technographic and trigger criteria; a named list of good-fit and bad-fit accounts; a quarterly review against closed-won data.',
           'ICP drift: the ICP document has not changed while the closed-won mix has. If your best deals come from accounts your ICP labels low-priority, the document is stale, not the deals.'),

        ('Segmentation', 'Segmentation', [
            ('Is the market segmented on how accounts buy (motion, urgency, committee shape) rather than on industry labels alone?'),
            ('Does every segment have a named owner and a coverage promise?'),
            ('Can you size each segment in accounts, not in percentages?'),
            ('Are segments small enough that one team can serve them credibly?'),
        ], 'Two to four segments with distinct buying behaviour; each with an owner, a coverage cadence and a measurable size.',
           'Segments that exist only in slides; three segments that need three different value propositions but share one messaging document.'),

        ('Positioning', 'Positioning', [
            ('Can you state the category you compete in, and the alternative you replace?'),
            ('Is the positioning specific enough that a competitor could not claim the same sentence?'),
            ('Does the positioning survive contact with a pricing page and a sales call?'),
            ('Is there evidence — win/loss, sales-call language — that buyers repeat it back?'),
        ], 'One paragraph any team member can deliver, naming the category, the buyer, the alternative and the differentiated outcome.',
           'Positioning that is a list of adjectives; positioning that sales quietly ignores and replaces with their own pitch.'),

        ('Messaging', 'Messaging architecture', [
            ('Are there distinct messages per persona and per buying stage, or one message repeated?'),
            ('Does each message map to a proof point the buyer can verify?'),
            ('Is the messaging consistent across ads, site, outbound, sales deck and onboarding?'),
            ('Is there a documented process for retiring messages that stop performing?'),
        ], 'A message matrix: persona x stage x proof. Sales and marketing quote the same lines.',
           'Marketing\'s message never reaching the sales call; proof points that are assertions rather than evidence.'),

        ('Buyer journey', 'Buyer journey', [
            ('Have you mapped the real journey — including the 70% of research your forms never see?'),
            ('Is each stage defined by buyer behaviour, not by internal lead status?'),
            ('Do you know the two most common paths from first touch to closed-won?'),
            ('Are there defined hand-off moments with entry and exit criteria?'),
        ], 'A journey map defined by observable buyer behaviour, with entry and exit criteria at each hand-off.',
           'A journey drawn from the CRM\'s stages rather than the buyer\'s actual path; stages nobody can define without arguing.'),

        ('GTM motion', 'GTM motion', [
            ('Is the motion explicit: sales-led, product-led, partner-led, or a deliberate combination?'),
            ('Does the workflow match the motion (islands, assembly line or pods), and is that choice written down?'),
            ('Is the motion affordable at current ACV and sales-cycle length?'),
            ('Do compensation and metrics match the motion you claim to run?'),
        ], 'One named motion per segment, with the team structure and economics to support it.',
           'A pipeline-driven motion funded by a marketing budget; a product-led motion with a quota-carrying team that does not touch the product funnel.'),

        ('Demand generation', 'Demand generation', [
            ('Do you distinguish demand creation from demand capture, with separate budgets and metrics?'),
            ('Is there coverage of buying groups, not just individual leads?'),
            ('Is demand measured in pipeline and revenue, not in leads?'),
            ('Do you know which programmes create demand versus which merely harvest it?'),
        ], 'A funding split between creation and capture, with pipeline attribution that survives scrutiny.',
           'Reporting leads while sales reports pipeline; every programme claiming the same closed-won deal.'),

        ('Acquisition channels', 'Acquisition channels', [
            ('Can you name the two channels that produce most qualified pipeline, with numbers?'),
            ('Is each active channel justified against ACV, sales cycle and team capacity?'),
            ('Have you deliberately stopped the channels that cannot be justified this year?'),
            ('Are channel owners accountable for pipeline, not activity?'),
        ], 'A short channel portfolio with explicit economics per channel and a documented reason for every channel you do not run.',
           'Running eleven channels because competitors do; no channel with enough investment to work.'),

        ('Sales and marketing alignment', 'Sales and marketing alignment', [
            ('Is there a single agreed definition of a qualified opportunity, written down?'),
            ('Do both teams work from the same account and signal data?'),
            ('Is there a service-level agreement in both directions with a measured response time?'),
            ('Do the two teams review pipeline together on a fixed cadence?'),
        ], 'One definition, one data set, two-way service levels, a standing review.',
           'Marketing defends lead volume, sales defends conversion; the argument replaces the diagnosis.'),

        ('Lead lifecycle', 'Lead lifecycle', [
            ('Are lifecycle stages defined by behaviour and exit criteria, not by opinion?'),
            ('Does every stage have an owner and a maximum time-in-stage?'),
            ('Are recycled or disqualified leads reintroduced deliberately?'),
            ('Can you report conversion and velocity between every pair of stages?'),
        ], 'Lifecycle stages with behavioural entry/exit rules, owners, and stage-to-stage conversion reporting.',
           'Leads that stall invisibly between stages; a "nurture" bucket that is really a graveyard.'),

        ('CRM', 'CRM and data hygiene', [
            ('Are required fields enforced at the point of creation rather than cleaned later?'),
            ('Is there one owner per account, with no shared or orphaned records?'),
            ('Are duplicate rates and field completeness measured?'),
            ('Is the CRM the system of record for pipeline, or a reporting afterthought?'),
        ], 'Enforced required fields, exclusive account ownership, measured hygiene, pipeline that reconciles with finance.',
           'Forecast built outside the CRM; ownership split across several owners so nobody is accountable.'),

        ('Marketing automation', 'Marketing automation', [
            ('Does automation encode a strategy, or does it replay a template library?'),
            ('Are triggers based on behaviour and lifecycle state rather than time alone?'),
            ('Is there a documented throttle so no contact receives conflicting messages?'),
            ('Is suppression and consent handling auditable?'),
        ], 'Automation that is event-driven, throttled across teams, with auditable consent and suppression.',
           'Six teams sending independent sequences; a contact receiving three offers in one week.'),

        ('Attribution', 'Attribution', [
            ('Do you know what each model in use actually rewards, and where it misleads?'),
            ('Is attribution used to make budget decisions, or only to report?'),
            ('Are self-reported attribution answers captured on the forms you control?'),
            ('Are the limits of attribution written down for stakeholders?'),
        ], 'Two complementary views: a multi-touch model for trend, self-reported answers for ground truth — plus documented limits.',
           'Single-touch credit to the last click; a channel winning the model while losing the customers.'),

        ('Reporting', 'Reporting and cadence', [
            ('Does one page answer: are we generating enough, of the right kind, at what cost?'),
            ('Is every metric defined once, with a named owner?'),
            ('Does the report distinguish leading indicators from lagging ones?'),
            ('Are reviews on a fixed cadence, with decisions recorded?'),
        ], 'One page, defined metrics, owned numbers, a standing review where decisions are logged.',
           'Metric definitions that change with the audience; reporting that describes rather than decides.'),

        ('GTM stack', 'GTM stack and integrations', [
            ('Does every tool in the stack map to a problem you actually have?'),
            ('Is there a single source of truth for accounts, contacts and events?'),
            ('Can you name which integration failure would stop the business tomorrow?'),
            ('Is the annual cost per tool reviewed against usage?'),
        ], 'A lean stack where each tool has an owner, a documented use case and a monitored integration.',
           'Overlapping tools for the same job; enrichment, routing and reporting each with their own copy of the truth.'),

        ('AI and automation opportunities', 'AI and automation opportunities', [
            ('Is AI applied to repetitive, well-instrumented work rather than to judgement calls?'),
            ('Is there a human-in-the-loop checkpoint wherever an AI output reaches a customer?'),
            ('Are AI-assisted outputs measured against the baseline they replaced?'),
            ('Is there a written policy for data that may and may not be sent to a model?'),
        ], 'AI doing bounded, measurable work with review checkpoints and a data policy.',
           'Agents generating outbound at volume with no review; no measurement of whether quality held.'),
    ],
}

AUDIT['sections'].append({'h1': 'Scoring and priorities', 'blocks': [
    ('p', 'Add the 64 scores (16 areas x 4 questions). The band tells you what class of work you are doing this quarter.'),
    ('table', {
        'cols': ['Total', 'Band', 'What to do next'],
        'widths': [0.8, 1.5, 4.2],
        'rows': [
            ['0-16', 'Fragmented', 'Stop optimising channels. Rebuild the foundations: ICP, one owner per account, CRM hygiene, one qualification definition.'],
            ['17-32', 'Emerging', 'The system runs but is inconsistent. Document the standards, instrument the funnel stages, close the lifecycle gaps.'],
            ['33-48', 'Structured', 'The system is repeatable. Shift from building to measuring: attribution you trust, channel economics, coverage promises.'],
            ['49-64', 'Systemic', 'Use the system as leverage: automate the repeatable, apply AI where the data is clean, re-audit quarterly.'],
        ],
    }),
    ('p', 'Then prioritise the gaps with two questions only: how much does this block pipeline, and how long until it works?'),
    ('table', {
        'cols': ['Priority', 'Profile', 'Typical items', 'Window'],
        'widths': [1.0, 1.6, 3.0, 1.0],
        'rows': [
            ['P1', 'High impact, fast', 'Routing and response time, required fields, stage definitions, one owner per account', '30 days'],
            ['P2', 'High impact, slow', 'Positioning refresh, channel economics, attribution rebuild, enrichment layer', '60 days'],
            ['P3', 'Low impact, fast', 'Report consolidation, naming conventions, suppression rules', '30 days'],
            ['P4', 'Low impact, slow', 'Legacy tool consolidation, historical data migration', '90 days or defer'],
        ],
    }),
    ('callout', 'A useful audit ends with fewer initiatives, not more. If the action list is longer than four items per window, it is a wish list.'),
    ('p', 'Companion resources on the site: the GTM Diagnostic tool for a scored assessment, the Budget Lab for allocation against the gaps you find, the Automation Planner for lifecycle work, and the GTM Stack Builder for the tooling layer.'),
]})

# ---------------------------------------------------------------------------
# 2. GTM Engineering Blueprint
# ---------------------------------------------------------------------------

BLUEPRINT = {
    'key': 'blueprint',
    'filename': 'gtm-engineering-blueprint.pdf',
    'kicker': 'Lead magnet',
    'title': 'The GTM Engineering Blueprint',
    'subtitle': 'How to design the system that carries data, signals and decisions through a go-to-market function — architecture, sequence, maturity and measurement.',
    'meta': [
        ('Author', 'Subhasish Adhikary'),
        ('Format', 'Blueprint with architecture diagrams'),
        ('Scope', 'Data through orchestration'),
        ('Companion', 'tools/stack-builder'),
    ],
    'sections': [
        {'h1': 'What GTM engineering is', 'blocks': [
            ('lead', 'GTM engineering is the discipline of building the data, automation and routing systems that let a go-to-market team act on every buying signal without manual coordination. It sits between marketing operations and revenue operations, and it is judged by response time, coverage and pipeline — not by tools deployed.'),
            ('p', 'It is not "marketing automation with AI added". The distinction that matters: automation executes a sequence somebody designed; GTM engineering decides who should act, on what evidence, within what time limit — and then makes that decision reliable.'),
            ('table', {
                'cols': ['', 'Marketing automation', 'GTM engineering'],
                'widths': [1.3, 2.6, 2.6],
                'rows': [
                    ['Unit of work', 'A campaign', 'A decision about an account'],
                    ['Trigger', 'Time, list membership', 'Behaviour, signal, lifecycle state'],
                    ['Owner of the outcome', 'Marketing', 'Named account owner'],
                    ['Failure mode', 'Low engagement', 'Slow or orphaned response'],
                    ['Metric', 'Sends, opens, MQLs', 'Response time, coverage, pipeline'],
                ],
            }),
            ('callout', 'Test before building: if you cannot describe the decision the system is supposed to make for a named human, you are about to build another sequence.'),
        ]},
        {'h1': 'The operating model', 'blocks': [
            ('p', 'Six layers. Data flows up; decisions flow down. Most broken implementations are missing a layer rather than misconfigured.'),
            ('diagram', 'architecture'),
            ('table', {
                'cols': ['Layer', 'Responsibility', 'Typical components', 'Question it answers'],
                'widths': [1.2, 1.9, 2.6, 1.9],
                'rows': [
                    ['1 Source of record', 'One authoritative account and contact truth', 'CRM, warehouse', 'Who is this and who owns it?'],
                    ['2 Identity and enrichment', 'Complete the record before you act on it', 'Enrichment, dedupe, firmographics', 'Do we know enough to decide?'],
                    ['3 Signal layer', 'Capture behaviour, intent and change events', 'Website events, intent data, product usage, hiring/funding feeds', 'What changed, and when?'],
                    ['4 Decision layer', 'Score, qualify, route, prioritise', 'Scoring model, routing rules, tiering', 'Who should act, and how fast?'],
                    ['5 Execution layer', 'Carry the action into the channel', 'Outbound, sequences, ads, sales tasks', 'What actually happens?'],
                    ['6 Feedback layer', 'Measure, attribute, learn', 'Reporting, attribution, experiment tracking', 'Did it work, and what do we change?'],
                ],
            }),
        ]},
        {'h1': 'Design facts per layer', 'blocks': [
            ('h2', 'Data layer'),
            ('p', 'One record per account, one owner, enforced required fields. Everything downstream inherits data quality; enrichment cannot fix an ownership model that allows shared records. Decide the identity keys before buying anything: domain is usually the account key, email is usually the contact key, and every tool must agree.'),
            ('h2', 'Enrichment'),
            ('p', 'Enrich on create, re-enrich on a schedule, and never enrich blind. The useful output is not more fields; it is the three fields your routing and tiering rules actually consume — firmographic fit, capacity indicators, and coverage tier.'),
            ('h2', 'Intent signals'),
            ('p', 'Signals earn their place by changing an action. Score them by whether they would cause you to contact an account sooner, differently, or not at all. A signal that only changes a dashboard is noise.'),
            ('h2', 'ICP intelligence'),
            ('p', 'Keep the ICP computable: fit criteria as fields, not prose, so the system can tier accounts automatically. Where your qualifying logic and your won-deal pattern disagree, trust the won-deal pattern and update the criteria.'),
            ('h2', 'Workflow automation and orchestration'),
            ('p', 'Orchestration is the layer that stops channels contradicting each other. One place decides, per account and per contact, what is allowed to happen in the next seven days — then each channel honours it. Without this, adding channels adds collisions.'),
            ('h2', 'AI agents'),
            ('p', 'Give agents bounded, observable tasks: research a named account, draft a first line from verified facts, classify an inbound request, summarise a call. Keep judgement, pricing and relationship decisions with humans. Every agent output that reaches a buyer needs a review checkpoint and a measurable baseline.'),
            ('h2', 'Human-in-the-loop'),
            ('p', 'Define the checkpoints explicitly: what an agent may send without review, what needs approval, and what may never be automated. The failure mode is not an agent making a mistake; it is nobody noticing.'),
        ]},
        {'h1': 'Three reference workflows', 'blocks': [
            ('h2', '1. Inbound routing inside five minutes'),
            ('numbered', [
                'Capture: form, chat, or product event creates or updates the account and contact.',
                'Enrich synchronously, so routing has the fields it needs at decision time.',
                'Match by domain to a named owner; if unmatched, route to a stated fallback owner.',
                'Notify the owner with context attached: what they did, what we know, what to say.',
                'Write the response-time clock to the record and report on it weekly.',
            ]),
            ('p', 'Design note: the clock must be visible to the person who owns it. Invisible service levels quietly become forty-two hours.'),
            ('h2', '2. Signal-triggered outbound'),
            ('numbered', [
                'Signal arrives (intent surge, hiring, funding, technology change, content depth).',
                'Fit and timing are evaluated: is this account in tier, and is now the moment?',
                'Compose with verified facts; never reference a signal you cannot substantiate.',
                'Send through the channel that matches the tier; log the signal on the account.',
                'Measure reply and meeting rates by signal type, then keep the signals that move.',
            ]),
            ('h2', '3. Coverage refresh against the territory'),
            ('numbered', [
                'Tier accounts by the coverage they need, not by revenue alone.',
                'Compute real hours available per owner, after delivery and internal load.',
                'Assign the top tier first, then distribute until each ledger sums to real hours.',
                'Publish the promise per territory and route out-of-territory inbound explicitly.',
                'Re-run the capacity maths quarterly, or whenever someone is hired.',
            ]),
        ]},
        {'h1': 'Implementation sequence', 'blocks': [
            ('p', 'Order matters more than speed. Each phase makes the next one cheaper; skipping a phase makes it more expensive.'),
            ('table', {
                'cols': ['Phase', 'Build', 'Exit condition', 'Weeks'],
                'widths': [1.5, 3.1, 2.5, 0.8],
                'rows': [
                    ['1 Ownership', 'One owner per account, routing rules, fallback owner, response standard', 'Every inbound can name an owner in under a minute', '1-2'],
                    ['2 Data hygiene', 'Required fields, dedupe, identity keys agreed across tools', 'Field completeness measured and above target', '2-3'],
                    ['3 Signals', 'Behaviour, intent and change events captured on the account', 'Signals change at least one action', '2-4'],
                    ['4 Decisioning', 'Scoring, tiering, prioritisation, service levels', 'Prioritisation is automatic and agreed by sales', '3-4'],
                    ['5 Orchestration', 'Throttle and coordination layer across channels', 'No contact receives conflicting messages', '3-6'],
                    ['6 Leverage', 'Agents on bounded tasks, with review and measurement', 'Assisted work is measured against its baseline', '6-12'],
                ],
            }),
        ]},
        {'h1': 'Maturity stages', 'blocks': [
            ('diagram', 'ladder'),
            ('table', {
                'cols': ['Stage', 'Signature', 'Typical symptom'],
                'widths': [1.5, 3.0, 3.0],
                'rows': [
                    ['1 Manual', 'Humans move data between systems', 'Work stops when someone is on leave'],
                    ['2 Connected', 'Tools integrate; data flows without a person', 'Integration failures are invisible'],
                    ['3 Automated', 'Rules act on events; ownership enforced', 'Rules nobody can explain or change safely'],
                    ['4 Orchestrated', 'One decision layer coordinates all channels', 'Coordination becomes the bottleneck to change'],
                    ['5 Leveraged', 'Agents do bounded work with review; measurement tight', 'Drift: automation optimising a stale target'],
                ],
            }),
        ]},
        {'h1': 'Common mistakes', 'blocks': [
            ('bullets', [
                'Buying tooling before defining ownership — the tool amplifies the ambiguity.',
                'Treating enrichment as a data project rather than a routing dependency.',
                'Scoring on activity volume instead of buying propensity.',
                'Adding channels without an orchestration layer, then blaming response rates.',
                'Automating the visible step (the send) while leaving the deciding step manual.',
                'Deploying agents against unreviewed output because the demo looked impressive.',
                'Measuring the system by tools deployed rather than by response time and coverage.',
            ]),
            ('callout', 'A useful test at any maturity: remove one person from the process for two weeks. What stops? That is the layer you have not engineered yet.'),
        ]},
        {'h1': 'Measurement framework', 'blocks': [
            ('p', 'Four classes of measure, reviewed on one page. Ranges below are the site\'s benchmark set for B2B SaaS; treat them as the band to be inside, not targets to chase.'),
            ('table', {
                'cols': ['Class', 'Measure', 'Benchmark band'],
                'widths': [1.3, 3.3, 2.4],
                'rows': [
                    ['Speed', 'Inbound first-touch response time', 'Under 5 minutes (best performers)'],
                    ['Coverage', 'Share of tier-1 accounts touched in cadence', 'Set from capacity maths, reviewed quarterly'],
                    ['Conversion', 'Visitor to lead; lead to MQL; MQL to SQL', '2.5% (1.5-3.5); 15% (10-20); 30% (20-40)'],
                    ['Outcome', 'SQL to opportunity; opportunity to close', '40% (30-50); 25% (15-35)'],
                ],
            }),
            ('p', 'Sources for the ranges are listed on the site\'s benchmark page with sample sizes and confidence notes — use them as context, not as commitments.'),
            ('p', 'Companion resources: the Stack Builder for the tooling layer, the Automation Planner for lifecycle workflows, the GTM Diagnostic for a scored view of the operating model, and the Experiment Planner for testing changes to it.'),
        ]},
    ],
}

# ---------------------------------------------------------------------------
# 3. Marketing Automation Maturity Assessment
# ---------------------------------------------------------------------------

MATURITY = {
    'key': 'maturity',
    'filename': 'marketing-automation-maturity-assessment.pdf',
    'kicker': 'Lead magnet',
    'title': 'Marketing Automation Maturity Assessment',
    'subtitle': 'A 15-dimension self-assessment across five maturity levels, with scoring, interpretation and a priority matrix.',
    'meta': [
        ('Author', 'Subhasish Adhikary'),
        ('Format', 'Self-assessment, 15 dimensions'),
        ('Scoring', '1-5 per dimension, weighted'),
        ('Companion', 'tools/automation-planner'),
    ],
    'sections': [
        {'h1': 'How to score', 'blocks': [
            ('lead', 'Fifteen dimensions, each scored 1-5 against a written rubric. Score the capability you can evidence this month, not the one you intend to build. The result is a profile — the pattern of low and high dimensions matters more than the total.'),
            ('table', {
                'cols': ['Level', 'Name', 'Definition'],
                'widths': [0.8, 1.6, 5.0],
                'rows': [
                    ['1', 'Ad hoc', 'Manual, undocumented, inconsistent. Depends on individuals.'],
                    ['2', 'Basic', 'Documented and repeatable for the common cases. Gaps at the edges.'],
                    ['3', 'Structured', 'Standardised across teams, with owners and defined hand-offs.'],
                    ['4', 'Integrated', 'Connected end to end: systems share state, decisions are data-driven.'],
                    ['5', 'Intelligent', 'Adaptive where evidence supports it, measured, with human review where it matters.'],
                ],
            }),
            ('p', 'Weighting: the four foundation dimensions (data, CRM, lifecycle management, lead capture) count double. They gate everything above them. Maximum weighted score: 19 dimensions-equivalent x 5 = 95; divide your total by 95 for a percentage.'),
        ]},
        {'h1': 'The fifteen dimensions', 'blocks': [
            ('p', 'Each rubric is written so that adjacent levels are distinguishable in practice. If you cannot evidence a level with a specific example, score the level below.'),
            ('pagebreak', None),
        ]},

        ('data', 'Data foundation', True, [
            'Fields created ad hoc; completeness unknown.',
            'Required fields defined on key objects; completeness measured sometimes.',
            'Completeness and duplicate rates measured on a cadence, with targets.',
            'Data quality enforced at the point of entry; lineage traceable to source.',
            'Quality monitored automatically, with alerting and documented remediation.',
        ]),
        ('crm', 'CRM as system of record', True, [
            'Used for contacts; pipeline lives elsewhere.',
            'Pipeline tracked in the CRM; ownership sometimes ambiguous.',
            'Exclusive account ownership enforced; stage definitions agreed.',
            'Forecast reconciles with finance; hygiene measured and owned.',
            'CRM drives routing and prioritisation automatically, with audit trail.',
        ]),
        ('lifecycle', 'Lifecycle management', True, [
            'No agreed stages; statuses vary by team.',
            'Stages defined; transitions partly manual.',
            'Behavioural entry and exit criteria per stage, with owners.',
            'Stage-to-stage conversion and velocity reported and acted on.',
            'Lifecycle state drives channel behaviour automatically, with suppression honoured.',
        ]),
        ('capture', 'Lead capture', True, [
            'Forms across the site with no shared standard.',
            'Standard forms and a defined required set.',
            'Capture enriched and routed at create time.',
            'Capture strategy varies by intent and content, with experiment history.',
            'Capture adapts to returning visitors and account context, measured against baseline.',
        ]),
        ('enrichment', 'Enrichment', False, [
            'Manual lookups when someone remembers.',
            'Enrichment runs on create for some sources.',
            'Enrichment standard on all sources, with refresh schedule.',
            'Enrichment fields mapped explicitly to routing and tiering needs.',
            'Enrichment quality scored; bad records flagged and replaced automatically.',
        ]),
        ('scoring', 'Lead scoring', False, [
            'No scoring, or scoring nobody trusts.',
            'Simple demographic and activity scores.',
            'Behavioural and fit scores separated, with thresholds agreed with sales.',
            'Scoring calibrated against closed-won, reviewed quarterly.',
            'Model recalibrated automatically on outcome data, with drift monitoring.',
        ]),
        ('routing', 'Routing and response', False, [
            'Leads land in a shared queue.',
            'Round-robin routing, no response standard.',
            'Account-based routing with a named fallback owner.',
            'Response-time standard measured and reported per owner.',
            'Routing accounts for capacity and presence, with automatic escalation.',
        ]),
        ('nurture', 'Nurturing', False, [
            'Occasional batches to a list.',
            'Static sequences by persona.',
            'Behaviour-triggered nurture with stage awareness.',
            'Content and cadence tested per segment, with suppression rules.',
            'Cadence and content adapt per contact from observed response, within guardrails.',
        ]),
        ('automation', 'Automation architecture', False, [
            'Disconnected workflows built per campaign.',
            'Shared workflows with naming and documentation.',
            'Reusable components with error handling and audit logging.',
            'Workflows versioned, tested in staging, with monitoring.',
            'Workflow selection is data-driven; failures self-heal or escalate.',
        ]),
        ('campaignops', 'Campaign operations', False, [
            'Launch process is informal.',
            'Brief, checklist and QA exist.',
            'Standard launch process with owners and timelines.',
            'Capacity planned against a calendar; post-launch reviews are routine.',
            'Planning automated from pipeline targets; performance feeds next cycle.',
        ]),
        ('reporting', 'Reporting', False, [
            'Reports built on request.',
            'Standard reports exist for common questions.',
            'One page answers volume, quality and cost, with owned definitions.',
            'Leading and lagging indicators separated and reviewed on cadence.',
            'Anomaly detection surfaces issues before the review.',
        ]),
        ('attribution', 'Attribution', False, [
            'No attribution, or last-click only.',
            'Channel reporting with known limitations.',
            'Multi-touch model plus self-reported answers on owned forms.',
            'Attribution informs budget decisions and is documented with its limits.',
            'Models are validated against incrementality tests where feasible.',
        ]),
        ('integrations', 'Integrations', False, [
            'Manual exports and imports.',
            'Point-to-point integrations, undocumented.',
            'Central integration layer with error alerting.',
            'Contracts and schemas versioned; failure modes documented.',
            'Integrations monitored with automatic retry and reconciliation.',
        ]),
        ('ai', 'AI and agents', False, [
            'No AI in production workflows.',
            'Individual use of general tools, ungoverned.',
            'Bounded AI tasks with review checkpoints.',
            'AI output measured against the baseline it replaced.',
            'AI applies where data is clean, with policy, monitoring and rollback.',
        ]),
        ('governance', 'Governance', False, [
            'No documentation; knowledge is personal.',
            'Key processes documented in one place.',
            'Ownership and change control defined for core systems.',
            'Regular review of access, consent, and data policy.',
            'Governance is measured, automated where possible, and audited.',
        ]),
    ],
}

MATURITY['sections'].append({'h1': 'Interpretation', 'blocks': [
    ('p', 'Divide your weighted total by 95 to get a percentage, then read the band. The profile underneath the number decides what to do: two similar totals can require completely different work.'),
    ('table', {
        'cols': ['Score', 'Band', 'Characteristic', 'Next move'],
        'widths': [0.9, 1.4, 2.6, 3.1],
        'rows': [
            ['0-35%', 'Ad hoc', 'Depends on individuals; results vary with who is on leave.', 'Fix the four foundation dimensions before automating anything.'],
            ['36-55%', 'Basic', 'Common cases work; edges fail quietly.', 'Instrument the lifecycle and routing; make response time visible.'],
            ['56-75%', 'Structured', 'Repeatable across teams; measurement exists.', 'Tighten calibration: scoring against outcomes, attribution you trust.'],
            ['76-90%', 'Integrated', 'Systems share state; decisions are data-driven.', 'Orchestrate across channels; test incrementality; plan capacity.'],
            ['91-100%', 'Intelligent', 'Adaptive with governance.', 'Guard against drift: monitor targets, re-baseline, review quarterly.'],
        ],
    }),
    ('h2', 'Profiles that repeat'),
    ('table', {
        'cols': ['Profile', 'Pattern', 'What it usually means'],
        'widths': [1.5, 2.2, 3.3],
        'rows': [
            ['The Automation Museum', 'High automation and campaign ops; low data, CRM, routing', 'Lots of sequences running on an untrusted record.'],
            ['The Reporting Island', 'High reporting and attribution; low routing and response', 'You can see the leak precisely and still not have fixed it.'],
            ['The AI Experiment', 'High AI; low governance, measurement and integrations', 'Impressive output, no baseline, no rollback.'],
            ['The Solid Base', 'High foundations; mid everything else', 'The right place to be. Invest in orchestration next.'],
        ],
    }),
    ('h2', 'Priority matrix'),
    ('p', 'Plot each low-scoring dimension by impact on pipeline and effort to fix. The sequence below is the one that usually holds.'),
    ('table', {
        'cols': ['Priority', 'Dimensions', 'Why first', 'Window'],
        'widths': [1.0, 2.2, 2.8, 1.0],
        'rows': [
            ['P1', 'Data, CRM, routing', 'Everything downstream inherits these; response time converts.', '30 days'],
            ['P2', 'Lifecycle, scoring, enrichment', 'Turns capture into qualified, routed demand.', '60 days'],
            ['P3', 'Automation, integrations, reporting', 'Makes the system reliable and observable.', '60-90 days'],
            ['P4', 'Attribution, AI, governance', 'Worth doing once the inputs are trustworthy.', '90 days+'],
        ],
    }),
    ('callout', 'A maturity score is only useful if it changes what you do next quarter. If your priorities are the same after the assessment as before it, the assessment measured nothing.'),
    ('p', 'Companion resources: the Automation Planner for the lifecycle work, the GTM Diagnostic for a second view on the operating model, and the Budget Lab for funding the sequence.'),
]})

# ---------------------------------------------------------------------------
# 4. B2B Demand Generation Playbook
# ---------------------------------------------------------------------------

PLAYBOOK = {
    'key': 'playbook',
    'filename': 'b2b-demand-generation-playbook.pdf',
    'kicker': 'Lead magnet',
    'title': 'The B2B Demand Generation Playbook',
    'subtitle': 'A channel selection and measurement framework, with economics, a 90-day plan and the failure modes to avoid.',
    'meta': [
        ('Author', 'Subhasish Adhikary'),
        ('Format', 'Playbook with frameworks and benchmarks'),
        ('Scope', 'Creation, capture and measurement'),
        ('Companion', 'tools/channel-planner'),
    ],
    'sections': [
        {'h1': 'Creation and capture are different jobs', 'blocks': [
            ('lead', 'Demand creation changes what a market wants. Demand capture harvests intent that already exists. They need separate budgets, separate metrics and separate channels — and most underperforming programmes fail because they are trying to do both with one budget and one dashboard.'),
            ('table', {
                'cols': ['', 'Demand creation', 'Demand capture'],
                'widths': [1.3, 2.7, 2.7],
                'rows': [
                    ['Job', 'Build awareness and preference before intent exists', 'Convert existing intent into pipeline'],
                    ['Time to effect', 'Quarters', 'Weeks'],
                    ['Typical channels', 'Content, community, events, partnerships, brand, PR', 'SEO, paid search, review sites, retargeting, outbound'],
                    ['Success measure', 'Share of target accounts aware and engaged', 'Cost per qualified opportunity, conversion by stage'],
                    ['Common failure', 'Judged on last-click and defunded early', 'Judged on volume and scaled into poor-fit demand'],
                ],
            }),
        ]},
        {'h1': 'Channel selection framework', 'blocks': [
            ('p', 'Do not run a channel because a competitor does. Run it because your ACV, sales cycle, market maturity, budget and team capacity make it economically sensible. Answer the six questions below in order; the channel set falls out of the answers.'),
            ('table', {
                'cols': ['Factor', 'If low', 'If high'],
                'widths': [1.6, 2.5, 2.6],
                'rows': [
                    ['ACV', 'Under ~$5k: self-serve capture, content, paid search', 'Over ~$50k: outbound, ABM, events, partnerships'],
                    ['Sales cycle', 'Under 30 days: automated nurture, retargeting', 'Over 6 months: multi-persona content, coverage, community'],
                    ['Market maturity', 'New category: education, analyst and PR work', 'Established: comparison, review sites, differentiation'],
                    ['Budget', 'Under $10k/month: two channels done properly', 'Over $50k/month: portfolio with orchestration'],
                    ['Team size', '1-3 marketers: one creation channel, one capture channel', 'Dedicated owners per channel'],
                    ['GTM motion', 'Product-led: in-product loops, self-serve content', 'Sales-led: outbound infrastructure, ABM, events'],
                ],
            }),
            ('callout', 'The most common portfolio error is not choosing too few channels — it is funding eleven of them at a level where none can work.'),
        ]},
        {'h1': 'Channel reference', 'blocks': [
            ('p', 'Grouped by fit, not by popularity. "When it works" assumes the factors above; "economics" is the honest constraint.'),
            ('table', {
                'cols': ['Channel', 'When it works', 'Economics / constraint'],
                'widths': [1.5, 2.8, 2.6],
                'rows': [
                    ['Content and SEO', 'Long cycle, considered purchase, real expertise', 'Slow compounding; content volume without distribution is wasted'],
                    ['AEO / GEO', 'Buyers using AI answers to shortlist', 'Early; measure inclusion in generated answers, not traffic alone'],
                    ['Email (owned)', 'Existing audience and lifecycle stages', 'Cheap to send, expensive to keep; deliverability is the constraint'],
                    ['Outbound', 'Defined ICP, ACV above ~$15k, coverage capacity', 'Cost per meeting rises sharply beyond your addressable tier'],
                    ['Paid search', 'Existing, described demand', 'CPL rises with category competition; great capture, weak creation'],
                    ['Paid social', 'Visual categories, defined job titles', 'Reach cheap, qualification expensive; needs strong routing'],
                    ['Partnerships', 'Complementary products, shared ICP', 'Revenue share and coordination cost; slow to start'],
                    ['Community', 'Practitioner audiences, long cycles', 'Requires sustained contribution; cannot be bought'],
                    ['Events', 'Mid-market and enterprise, committee buying', 'High cost per opportunity; measurable pipeline contribution'],
                    ['PR and analyst', 'Category creation, credibility building', 'Indirect; hard to attribute without care'],
                    ['Intent data', 'Prioritising an existing addressable market', 'Noisy alone; valuable with fit and routing'],
                    ['ABM', 'Named accounts, high ACV, several stakeholders', 'Coordination-heavy; fails without sales ownership'],
                ],
            }),
        ]},
        {'h1': 'Funnel architecture and benchmarks', 'blocks': [
            ('p', 'Use your own numbers, then compare against the site\'s benchmark set for B2B SaaS. A leak is only actionable when you know which conversion is off-band — and remember that a benchmark band is context, not a target.'),
            ('table', {
                'cols': ['Stage', 'Conversion', 'Benchmark band (B2B SaaS)'],
                'widths': [1.9, 2.2, 2.8],
                'rows': [
                    ['Visitor to lead', 'Form or qualified action', '2.5% (1.5-3.5)'],
                    ['Lead to MQL', 'Qualification', '15% (10-20)'],
                    ['MQL to SQL', 'Sales acceptance', '30% (20-40)'],
                    ['SQL to opportunity', 'Discovery', '40% (30-50)'],
                    ['Opportunity to close', 'Win rate', '25% (15-35)'],
                ],
            }),
            ('p', 'Additional reference points from the same benchmark set: cold email response rate, webinar conversion, LinkedIn and Google CPL for B2B, CAC by segment, sales-cycle length by segment, and marketing budget as a share of revenue. Each is published on the site with its source, sample size and confidence note.'),
            ('callout', 'Compounding view: at the mid-point of these bands, a 1,000-visitor day yields roughly 25 leads, 3.75 qualified, about 1.1 opportunities — which is why "just get more traffic" rarely fixes a pipeline problem.'),
        ]},
        {'h1': 'Campaign planning framework', 'blocks': [
            ('p', 'One page per programme. If a campaign cannot be described in these seven fields, it is not planned yet.'),
            ('table', {
                'cols': ['Field', 'What belongs there'],
                'widths': [1.7, 5.2],
                'rows': [
                    ['Audience', 'Segment, roles, account tier — sized in accounts, not percentages'],
                    ['Problem', 'The specific problem this programme addresses, in the buyer\'s words'],
                    ['Motion', 'Creation or capture, and the metric that proves it'],
                    ['Channels', 'The two or three channels with a stated role each'],
                    ['Offer', 'What the buyer gets, and why it is worth their time'],
                    ['Measurement', 'Leading indicator, lagging indicator, and the review date'],
                    ['Owner', 'One named person, not a team'],
                ],
            }),
        ]},
        {'h1': 'A 90-day demand generation plan', 'blocks': [
            ('h2', 'Days 1-30: foundations and honest baseline'),
            ('numbered', [
                'Instrument the funnel: stage definitions, conversions, response times.',
                'Compute unit economics from last quarter: CAC by channel, pipeline per programme.',
                'Choose the two channels the economics justify — one creation, one capture.',
                'Fix routing and response time before spending more; poor follow-up destroys channel ROI.',
            ]),
            ('h2', 'Days 31-60: run the two channels properly'),
            ('numbered', [
                'Build one flagship asset per creation channel; distribute it in at least three ways.',
                'Launch one capture programme against existing intent (search, review sites, retargeting).',
                'Set the offer and the qualification standard with sales in writing.',
                'Review weekly on the leading indicator only; resist early judgement on pipeline.',
            ]),
            ('h2', 'Days 61-90: measure, cut, extend'),
            ('numbered', [
                'Review cost per qualified opportunity by channel and programme.',
                'Cut what cannot clear the bar; raise investment in what can.',
                'Add the next channel only if capacity and economics support it.',
                'Write the next quarter\'s plan from the numbers, and schedule the review.',
            ]),
            ('callout', 'Ninety days is enough to establish economics and enough to stop a channel that will not work. It is not enough to judge brand — do not defund creation on a 30-day read.'),
        ]},
        {'h1': 'Failure modes', 'blocks': [
            ('bullets', [
                'Measuring leads while the business needs pipeline, then defending the leads.',
                'Judging creation channels on last-click and defunding them before they compound.',
                'Funding too many channels to a level where none of them works.',
                'Scaling paid capture before routing and response time are fixed.',
                'Treating every channel as equally appropriate regardless of ACV or cycle.',
                'Buying intent data with no fit model, then blaming the data for the noise.',
                'Running ABM without a named owner per account and a coverage promise.',
                'Reporting activity (sends, impressions) as if it were demand.',
            ]),
            ('p', 'Companion resources: the Channel Planner to select a portfolio from your ICP, ACV and budget; the Budget Lab to allocate across the selected channels; the Experiment Planner to test changes properly; the GTM Intelligence Engine for a full diagnostic.'),
        ]},
    ],
}
