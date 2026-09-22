#!/usr/bin/env python3
"""
Generate the five downloadable lead magnets into public/downloads/.

    python3 scripts/generate-lead-magnets.py

Outputs (stable URLs):
    public/downloads/b2b-gtm-audit-checklist.pdf
    public/downloads/gtm-engineering-blueprint.pdf
    public/downloads/marketing-automation-maturity-assessment.pdf
    public/downloads/b2b-demand-generation-playbook.pdf
    public/downloads/gtm-stack-builder-template.xlsx

Content lives in scripts/lead-magnet-content.py so the documents can be revised
without touching layout code. Brand tokens are copied from src/index.css so the
downloads match the site (light paper, blue accent, black-forward typography).

Deps: reportlab (PDF), openpyxl (XLSX).
"""
from __future__ import annotations

import os
import re
import sys

from reportlab.lib import colors
from reportlab.lib.enums import TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.units import mm
from reportlab.platypus import (
    BaseDocTemplate, Frame, KeepTogether, NextPageTemplate, PageBreak, PageTemplate,
    Paragraph, Spacer, Table, TableStyle,
)
from reportlab.graphics.shapes import Drawing, Rect, String, Line, Polygon

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(HERE)
OUT_DIR = os.path.join(ROOT, 'public', 'downloads')
sys.path.insert(0, HERE)

# The content module filename has a dash, so load it explicitly.
import importlib.util
_spec = importlib.util.spec_from_file_location('lm_content', os.path.join(HERE, 'lead-magnet-content.py'))
content = importlib.util.module_from_spec(_spec)
_spec.loader.exec_module(content)

BRAND = content.BRAND
SITE = content.SITE

INK = colors.HexColor(BRAND['ink'])
MUTED = colors.HexColor(BRAND['muted'])
FAINT = colors.HexColor(BRAND['faint'])
RULE = colors.HexColor(BRAND['rule'])
ACCENT = colors.HexColor(BRAND['accent'])
ACCENT_DARK = colors.HexColor(BRAND['accent_dark'])
PAPER = colors.HexColor(BRAND['paper'])
SURFACE = colors.HexColor(BRAND['surface'])

PAGE_W, PAGE_H = A4
MARGIN = 20 * mm
FRAME_W = PAGE_W - 2 * MARGIN

# --------------------------------------------------------------------------- styles
def styles():
    s = {}
    s['kicker'] = ParagraphStyle('kicker', fontName='Helvetica-Bold', fontSize=8.5, leading=11,
                                 textColor=ACCENT, spaceAfter=6)
    s['cover_title'] = ParagraphStyle('cover_title', fontName='Helvetica-Bold', fontSize=30, leading=34,
                                      textColor=INK, spaceAfter=10)
    s['cover_sub'] = ParagraphStyle('cover_sub', fontName='Helvetica', fontSize=12.5, leading=18,
                                    textColor=MUTED, spaceAfter=0)
    s['h1'] = ParagraphStyle('h1', fontName='Helvetica-Bold', fontSize=18, leading=22, textColor=INK,
                             spaceBefore=4, spaceAfter=8)
    s['h2'] = ParagraphStyle('h2', fontName='Helvetica-Bold', fontSize=11.5, leading=15, textColor=INK,
                             spaceBefore=10, spaceAfter=5)
    s['lead'] = ParagraphStyle('lead', fontName='Helvetica', fontSize=11, leading=16.5, textColor=INK,
                               spaceAfter=8)
    s['body'] = ParagraphStyle('body', fontName='Helvetica', fontSize=9.6, leading=14.4, textColor=MUTED,
                               spaceAfter=7, alignment=TA_LEFT)
    s['bullet'] = ParagraphStyle('bullet', parent=s['body'], leftIndent=11, bulletIndent=2, spaceAfter=4)
    s['numbered'] = ParagraphStyle('numbered', parent=s['body'], leftIndent=14, bulletIndent=2, spaceAfter=4)
    s['callout'] = ParagraphStyle('callout', fontName='Helvetica-Oblique', fontSize=9.6, leading=14.4,
                                  textColor=INK)
    s['th'] = ParagraphStyle('th', fontName='Helvetica-Bold', fontSize=8.2, leading=10.6, textColor=colors.white)
    s['td'] = ParagraphStyle('td', fontName='Helvetica', fontSize=8.6, leading=11.8, textColor=MUTED)
    s['td_strong'] = ParagraphStyle('td_strong', parent=s['td'], fontName='Helvetica-Bold', textColor=INK)
    s['caption'] = ParagraphStyle('caption', fontName='Helvetica', fontSize=7.8, leading=10, textColor=FAINT,
                                  spaceAfter=4)
    s['meta_k'] = ParagraphStyle('meta_k', fontName='Helvetica-Bold', fontSize=7.6, leading=10, textColor=FAINT)
    s['meta_v'] = ParagraphStyle('meta_v', fontName='Helvetica', fontSize=9, leading=12, textColor=INK)
    return s

ST = styles()


def esc(text: str) -> str:
    return (str(text).replace('&', '&amp;').replace('<', '&lt;').replace('>', '&gt;'))


def P(text, style='body'):
    return Paragraph(esc(text), ST[style])


def cover(doc, title, kicker, meta):
    """Cover page flowables."""
    flow = [Spacer(1, 62 * mm)]
    flow.append(Paragraph(esc(kicker).upper(), ST['kicker']))
    flow.append(Paragraph(esc(title), ST['cover_title']))
    flow.append(Spacer(1, 3 * mm))
    flow.append(Paragraph(esc(doc['subtitle']), ST['cover_sub']))
    flow.append(Spacer(1, 12 * mm))

    rows = [[P(k, 'meta_k'), P(v, 'meta_v')] for k, v in doc['meta']]
    t = Table(rows, colWidths=[34 * mm, FRAME_W - 34 * mm - 40 * mm])
    t.setStyle(TableStyle([
        ('VALIGN', (0, 0), (-1, -1), 'TOP'),
        ('LINEBELOW', (0, 0), (-1, -2), 0.4, RULE),
        ('TOPPADDING', (0, 0), (-1, -1), 5),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 5),
        ('LEFTPADDING', (0, 0), (-1, -1), 0),
    ]))
    flow.append(t)
    flow.append(Spacer(1, 14 * mm))
    flow.append(P('Subhasish Adhikary · Growth Marketing & GTM Engineer · %s' % SITE, 'caption'))
    flow.append(PageBreak())
    return flow


def diagram(kind):
    """Simple vector diagrams: the architecture stack and the maturity ladder."""
    d = Drawing(FRAME_W, 74 * mm if kind == 'architecture' else 62 * mm)
    if kind == 'architecture':
        layers = [
            ('6  Feedback', 'attribution · reporting · experiments'),
            ('5  Execution', 'outbound · sequences · ads · sales tasks'),
            ('4  Decision', 'scoring · tiering · routing · service levels'),
            ('3  Signal', 'behaviour · intent · funding & hiring'),
            ('2  Identity', 'enrichment · dedupe · firmographics'),
            ('1  Source of record', 'CRM · warehouse'),
        ]
        h = 10.4 * mm
        gap = 2.2 * mm
        y = 74 * mm - h
        for label, detail in layers:
            d.add(Rect(0, y, FRAME_W, h, fillColor=SURFACE, strokeColor=RULE, strokeWidth=0.5))
            d.add(Rect(0, y, 2.2, h, fillColor=ACCENT, strokeColor=None))
            d.add(String(6 * mm, y + h / 2 - 1.2, label, fontName='Helvetica-Bold', fontSize=9, fillColor=INK))
            d.add(String(58 * mm, y + h / 2 - 1.2, detail, fontName='Helvetica', fontSize=8.2, fillColor=MUTED))
            y -= (h + gap)
        d.add(String(0, 74 * mm - 4, 'Data flows up · decisions flow down', fontName='Helvetica-Oblique',
                     fontSize=8, fillColor=FAINT))
    else:
        steps = [
            ('5', 'Leveraged', 'agents on bounded work, measured'),
            ('4', 'Orchestrated', 'one decision layer across channels'),
            ('3', 'Automated', 'rules act on events, ownership enforced'),
            ('2', 'Connected', 'tools integrate, no manual hand-offs'),
            ('1', 'Manual', 'people move data between systems'),
        ]
        h = 9.6 * mm
        gap = 2 * mm
        y = 62 * mm - h
        for i, (num, name, detail) in enumerate(steps):
            width = FRAME_W - i * 18 * mm
            fill = ACCENT if i == 0 else (SURFACE if i % 2 == 0 else colors.white)
            d.add(Rect(0, y, width, h, fillColor=fill, strokeColor=RULE, strokeWidth=0.5))
            d.add(String(4 * mm, y + h / 2 - 1.2, num, fontName='Helvetica-Bold', fontSize=10,
                         fillColor=colors.white if i == 0 else ACCENT))
            d.add(String(11 * mm, y + h / 2 - 1.0, name, fontName='Helvetica-Bold', fontSize=9,
                         fillColor=colors.white if i == 0 else INK))
            d.add(String(38 * mm, y + h / 2 - 1.0, detail, fontName='Helvetica', fontSize=8.2,
                         fillColor=colors.white if i == 0 else MUTED))
            y -= (h + gap)
    return d


def data_table(spec, first_col_bold=True):
    cols = spec['cols']
    widths = spec.get('widths') or [1.0] * len(cols)
    total = sum(widths)
    col_widths = [FRAME_W * (w / total) for w in widths]

    rows = [[Paragraph(esc(c), ST['th']) for c in cols]]
    for r in spec['rows']:
        row = []
        for i, cell in enumerate(r):
            style = 'td_strong' if (i == 0 and first_col_bold) else 'td'
            row.append(Paragraph(esc(cell), ST[style]))
        rows.append(row)

    t = Table(rows, colWidths=col_widths, repeatRows=1, hAlign='LEFT')
    t.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), ACCENT),
        ('TEXTCOLOR', (0, 0), (-1, 0), colors.white),
        ('VALIGN', (0, 0), (-1, -1), 'TOP'),
        ('TOPPADDING', (0, 0), (-1, -1), 4.5),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 4.5),
        ('LEFTPADDING', (0, 0), (-1, -1), 5),
        ('RIGHTPADDING', (0, 0), (-1, -1), 5),
        ('LINEBELOW', (0, 0), (-1, -1), 0.4, RULE),
        ('ROWBACKGROUNDS', (0, 1), (-1, -1), [colors.white, PAPER]),
    ]))
    out = []
    if spec.get('caption'):
        out.append(P(spec['caption'], 'caption'))
    out.append(t)
    out.append(Spacer(1, 5 * mm))
    return out


def callout(text):
    t = Table([[P(text, 'callout')]], colWidths=[FRAME_W])
    t.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, -1), SURFACE),
        ('LINEBEFORE', (0, 0), (0, -1), 2.2, ACCENT),
        ('TOPPADDING', (0, 0), (-1, -1), 7),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 7),
        ('LEFTPADDING', (0, 0), (-1, -1), 9),
        ('RIGHTPADDING', (0, 0), (-1, -1), 9),
    ]))
    return [t, Spacer(1, 5 * mm)]


def blocks(flow, block_list):
    for kind, payload in block_list:
        if kind == 'pagebreak':
            flow.append(PageBreak())
        elif kind == 'h2':
            flow.append(Paragraph(esc(payload), ST['h2']))
        elif kind == 'lead':
            flow.append(Paragraph(esc(payload), ST['lead']))
        elif kind == 'p':
            flow.append(P(payload))
        elif kind == 'bullets':
            for b in payload:
                flow.append(Paragraph(esc(b), ST['bullet'], bulletText='•'))
            flow.append(Spacer(1, 3 * mm))
        elif kind == 'numbered':
            for i, b in enumerate(payload, 1):
                flow.append(Paragraph(esc(b), ST['numbered'], bulletText='%d.' % i))
            flow.append(Spacer(1, 3 * mm))
        elif kind == 'table':
            flow.extend(data_table(payload))
        elif kind == 'callout':
            flow.extend(callout(payload))
        elif kind == 'diagram':
            flow.append(diagram(payload))
            flow.append(Spacer(1, 6 * mm))
        elif kind == 'kv':
            rows = [[P(k, 'meta_k'), P(v, 'td')] for k, v in payload]
            t = Table(rows, colWidths=[45 * mm, FRAME_W - 45 * mm])
            t.setStyle(TableStyle([('VALIGN', (0, 0), (-1, -1), 'TOP'),
                                   ('LINEBELOW', (0, 0), (-1, -1), 0.4, RULE),
                                   ('TOPPADDING', (0, 0), (-1, -1), 4),
                                   ('BOTTOMPADDING', (0, 0), (-1, -1), 4)]))
            flow.append(t)
            flow.append(Spacer(1, 5 * mm))


def audit_area(code, title, questions, good, warning, ref):
    flow = [Paragraph(esc(title), ST['h2'])]
    rows = [[Paragraph(esc(q), ST['td']) for q in questions]]
    t = Table(rows, colWidths=[FRAME_W])
    t.setStyle(TableStyle([
        ('VALIGN', (0, 0), (-1, -1), 'TOP'),
        ('TOPPADDING', (0, 0), (-1, -1), 3),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 3),
        ('LINEBELOW', (0, 0), (-1, -1), 0.4, RULE),
    ]))
    scored = Table(
        [[Paragraph('Score (0-3)', ST['th']), Paragraph('Good looks like', ST['th']),
          Paragraph('Warning signs', ST['th'])],
         [Paragraph('&nbsp;', ST['td']), Paragraph(esc(good), ST['td']), Paragraph(esc(warning), ST['td'])]],
        colWidths=[22 * mm, (FRAME_W - 22 * mm) / 2, (FRAME_W - 22 * mm) / 2],
    )
    scored.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), ACCENT),
        ('VALIGN', (0, 0), (-1, -1), 'TOP'),
        ('BOX', (0, 0), (0, -1), 0.5, RULE),
        ('BACKGROUND', (0, 1), (0, 1), PAPER),
        ('TOPPADDING', (0, 0), (-1, -1), 4.5),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 4.5),
        ('LEFTPADDING', (0, 0), (-1, -1), 5),
        ('RIGHTPADDING', (0, 0), (-1, -1), 5),
    ]))
    flow.extend([t, Spacer(1, 2.5 * mm), scored, Spacer(1, 6 * mm)])
    return flow


def maturity_dimension(name, weighted, rubric):
    title = name + ('  (weight x2 - foundation)' if weighted else '')
    rows = [[Paragraph(esc('Level %d' % i), ST['td_strong']), Paragraph(esc(text), ST['td'])]
            for i, text in enumerate(rubric, 1)]
    t = Table(rows, colWidths=[20 * mm, FRAME_W - 20 * mm])
    t.setStyle(TableStyle([
        ('VALIGN', (0, 0), (-1, -1), 'TOP'),
        ('LINEBELOW', (0, 0), (-1, -1), 0.4, RULE),
        ('BACKGROUND', (0, 0), (0, -1), PAPER if not weighted else SURFACE),
        ('TOPPADDING', (0, 0), (-1, -1), 4),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 4),
        ('LEFTPADDING', (0, 0), (-1, -1), 5),
    ]))
    return [Paragraph(esc(title), ST['h2']), t, Spacer(1, 5 * mm)]


def build_pdf(doc_def):
    path = os.path.join(OUT_DIR, doc_def['filename'])
    title = doc_def['title']

    def on_page(canv, doc):
        canv.saveState()
        if doc.page > 1:
            canv.setStrokeColor(RULE)
            canv.setLineWidth(0.4)
            canv.line(MARGIN, PAGE_H - MARGIN + 6 * mm, PAGE_W - MARGIN, PAGE_H - MARGIN + 6 * mm)
            canv.setFont('Helvetica', 7.4)
            canv.setFillColor(FAINT)
            canv.drawString(MARGIN, PAGE_H - MARGIN + 8 * mm, title)
            canv.drawRightString(PAGE_W - MARGIN, PAGE_H - MARGIN + 8 * mm, 'Subhasish Adhikary · %s' % SITE)
            canv.line(MARGIN, MARGIN - 6 * mm, PAGE_W - MARGIN, MARGIN - 6 * mm)
            canv.drawString(MARGIN, MARGIN - 10 * mm, '%s' % SITE)
            canv.drawRightString(PAGE_W - MARGIN, MARGIN - 10 * mm, 'Page %d' % (doc.page - 1))
        canv.restoreState()

    doc = BaseDocTemplate(path, pagesize=A4, leftMargin=MARGIN, rightMargin=MARGIN,
                          topMargin=MARGIN, bottomMargin=MARGIN + 4 * mm,
                          title=title, author='Subhasish Adhikary', subject=doc_def['subtitle'],
                          keywords='B2B, GTM, growth marketing, marketing automation, demand generation')
    frame = Frame(MARGIN, MARGIN + 4 * mm, FRAME_W, PAGE_H - 2 * MARGIN - 4 * mm, id='body')
    doc.addPageTemplates([PageTemplate(id='main', frames=[frame], onPage=on_page)])

    flow = cover(doc_def, title, doc_def['kicker'], doc_def['meta'])

    # Contents page
    titles = [s['h1'] for s in doc_def['sections'] if isinstance(s, dict)]
    if titles:
        flow.append(Paragraph('Contents', ST['h1']))
        rows = [[Paragraph(esc(t), ST['td'])] for t in titles]
        t = Table(rows, colWidths=[FRAME_W])
        t.setStyle(TableStyle([('LINEBELOW', (0, 0), (-1, -1), 0.4, RULE),
                               ('TOPPADDING', (0, 0), (-1, -1), 4.5),
                               ('BOTTOMPADDING', (0, 0), (-1, -1), 4.5)]))
        flow.append(t)
        flow.append(Spacer(1, 8 * mm))

    for sec in doc_def['sections']:
        if isinstance(sec, dict):
            flow.append(Paragraph(esc(sec['h1']), ST['h1']))
            blocks(flow, sec['blocks'])
            flow.append(Spacer(1, 4 * mm))
        else:
            # (code, title, questions[], good, warning) for the audit;
            # (code, title, weighted, rubric[]) for the maturity assessment.
            if doc_def['key'] == 'audit':
                flow.extend(audit_area(sec[0], sec[1], sec[2], sec[3], sec[4], None))
            else:
                flow.extend(maturity_dimension(sec[1], sec[2], sec[3]))

    doc.build(flow)
    return path


# --------------------------------------------------------------------------- XLSX
STACK_COLUMNS = [
    ('Category', 20), ('Business problem it solves', 34), ('Recommended tool', 22), ('Alternative', 22),
    ('Pricing tier', 16), ('Implementation complexity', 16), ('Integration requirements', 30),
    ('Team requirement', 20), ('Use case', 34), ('Priority', 10), ('Notes', 30),
]

STACK_ROWS = [
    ('CRM', 'One source of truth for accounts, contacts and pipeline', 'HubSpot (Starter/Pro)', 'Pipedrive · Close',
     '$20-100/user/mo', 'Low', 'Website forms, email, ads, enrichment', 'RevOps or founder', 'Pipeline tracking and forecasting',
     'P1', 'Own the fields before you buy anything else.'),
    ('Marketing automation', 'Lifecycle nurture and behaviour-triggered follow-up', 'ActiveCampaign', 'Customer.io · Klaviyo',
     '$50-500/mo', 'Low-Medium', 'CRM bi-directional sync, forms', '1 marketer', 'Lead nurture, onboarding, re-engagement',
     'P1', 'Design the lifecycle stages first; the tool encodes them.'),
    ('Enrichment', 'Complete account data at creation so routing can decide', 'Clay', 'Clearbit · Apollo',
     '$100-800/mo', 'Medium', 'CRM write-back, routing rules', 'RevOps', 'Firmographics, tech stack, contact discovery',
     'P1', 'Enrich the three fields your routing actually consumes.'),
    ('Intent data', 'Prioritise accounts already researching the category', 'Bombora', 'G2 Buyer Intent',
     '$1-3k/mo', 'Medium', 'CRM account match, scored field', 'RevOps + demand gen', 'Prioritisation and outbound timing',
     'P2', 'Noisy without a fit model. Pair with tiering.'),
    ('Outbound / sales engagement', 'Sequenced multi-touch outreach at coverage', 'Instantly / Smartlead', 'Outreach · Salesloft',
     '$50-150/mo', 'Low-Medium', 'CRM sync, mailbox health, enrichment', '1 SDR or founder', 'Cold outreach, follow-up',
     'P1', 'Warm the domain; deliverability is the real constraint.'),
    ('Email infrastructure', 'Deliverability, domain reputation, validation', 'Google Workspace + Instantly', 'Microsoft 365 · Mailreach',
     '$10-100/mo', 'Low', 'DNS (SPF/DKIM/DMARC), sequencing tool', 'RevOps', 'Sending domain, warmup, validation',
     'P1', 'Non-negotiable if you send at any volume.'),
    ('ABM', 'Coordinate a named-account programme across teams', 'Demandbase', '6sense · RollWorks',
     '$2-10k/mo', 'High', 'CRM, ads, intent, orchestration', 'Dedicated owner + sales', 'Named account targeting',
     'P3', 'Never start ABM without one named owner per account.'),
    ('Analytics', 'Understand behaviour and campaign effect', 'Google Analytics 4', 'Mixpanel · PostHog',
     'Free-$$$', 'Low-Medium', 'Tag manager, CRM events', 'Analyst or capable marketer', 'Web/product analytics',
     'P1', 'Define metrics once, with owners.'),
    ('Attribution', 'Decide where to put budget, honestly', 'HockeyStack', 'Dreamdata · Bizible',
     '$500-3k/mo', 'High', 'CRM, ads, web analytics, warehouse', 'RevOps', 'Multi-touch and self-reported models',
     'P3', 'Pair with self-reported attribution on owned forms.'),
    ('Experimentation', 'Test changes instead of guessing', 'PostHog', 'GrowthBook · VWO',
     'Free-$500/mo', 'Medium', 'Front end, analytics, CRM', 'Growth marketer', 'Landing pages, offer and sequence tests',
     'P3', 'One well-instrumented test beats five untracked ones.'),
    ('Content operation', 'Produce and distribute content at a cadence', 'Notion + Webflow', 'WordPress · Framer',
     '$30-200/mo', 'Low', 'CMS, analytics, distribution', '1 writer/marketer', 'Publishing, distribution, CRO',
     'P2', 'Distribution beats volume. Plan three uses per asset.'),
    ('AI', 'Bounded research, drafting and classification', 'OpenAI / Anthropic API', 'Jasper · Copy.ai',
     'Usage-based', 'Medium', 'Data policy, review workflow, logging', 'RevOps + marketing', 'Account research, first lines, classification',
     'P2', 'Measure assisted work against the baseline it replaced.'),
    ('Workflow automation', 'Connect tools without writing code', 'Make', 'Zapier · n8n',
     '$30-200/mo', 'Low-Medium', 'Every tool above', 'RevOps or power user', 'Enrichment, routing, alerting',
     'P1', 'Document each scenario; undocumented glue is a risk.'),
    ('Sales intelligence', 'Find, qualify and prioritise accounts', 'LinkedIn Sales Navigator', 'Apollo · Cognism',
     '$80-150/user/mo', 'Low', 'CRM, enrichment, outbound', 'Sales + RevOps', 'Prospecting, account prioritisation',
     'P2', 'Tie to the tiering model or it becomes list-building.'),
]

SELECTION_FRAMEWORK = [
    ('Company stage', 'Seed / Series A', 'Series A-B', 'Series B+', 'Enterprise'),
    ('GTM motion', 'Founder-led sales', 'Sales-led with marketing support', 'Segmented sales-led + PLG', 'Multi-motion, ABM'),
    ('Monthly budget', 'Under $2k', '$2k-10k', '$10k-50k', '$50k+'),
    ('Team size', '1-3 marketers', '3-8', '8-20', '20+ with dedicated ops'),
    ('Sales cycle', 'Under 30 days', '1-3 months', '3-9 months', '9 months+'),
    ('ACV', 'Under $5k', '$5-25k', '$25-100k', '$100k+'),
    ('Stack consequence', 'One platform (CRM + automation) + one outbound tool',
     'Add enrichment, intent and workflow automation',
     'Add attribution, ABM and experimentation',
     'Add ABM, warehouse and dedicated ops tooling'),
    ('What to ignore for now', 'ABM, attribution suites, intent data',
     'Enterprise ABM platforms',
     'Nothing structural — but refuse tools without an owner',
     'Legacy suites that cannot integrate'),
]

PRESETS = [
    ('Lean B2B SaaS Stack', 'Early-stage B2B SaaS (Seed to Series A) with 1-3 marketers', 'Low', '$500-2,000/month',
     'HubSpot Starter, Mailchimp, Google Analytics 4, LinkedIn Sales Navigator, Loom, Notion',
     'Pipedrive + ActiveCampaign; Close.io + Customer.io'),
    ('Bootstrapped Startup Stack', 'Bootstrapped teams that cannot absorb enterprise costs', 'Low', '$100-2,000/month',
     'HubSpot Starter, Mailchimp, Google Analytics 4, LinkedIn Sales Navigator, Loom, Notion',
     'Self-hosted equivalents; Carrd + Buttondown'),
    ('PLG Starter Stack', 'Product-led growth companies that need a PLG SaaS stack to convert and expand users', 'Medium', '$1,000-10,000/month',
     'HubSpot Starter, Mailchimp, Google Analytics 4, LinkedIn Sales Navigator, Loom, Notion',
     'Amplitude + Intercom; Mixpanel + Customer.io'),
    ('Outbound Engine Stack', 'Teams running outbound as the primary pipeline motion', 'Medium', '$3,000-15,000/month',
     'HubSpot, Clay, Instantly, LinkedIn Sales Navigator, Google Workspace',
     'Apollo + Smartlead; Cognism + Outreach'),
    ('Demand Gen Stack', 'Marketing-led demand generation with a paid and content mix', 'Medium', '$5,000-30,000/month',
     'HubSpot, Google Ads, LinkedIn Ads, Webflow, GA4, Zapier',
     'ActiveCampaign + Unbounce; Marketo + Drift'),
    ('Revenue Operations Stack', 'Companies that need a RevOps system spanning marketing, sales and CS', 'High', '$10,000-100,000/month',
     'Salesforce, HubSpot, Clay, HockeyStack, Make, Gong',
     'HubSpot Enterprise + Dreamdata; Dynamics + LeanData'),
    ('Account-Based Marketing Stack', 'Teams running ABM against a named account list', 'High', '$10,000-50,000/month',
     'Demandbase, Salesforce, LinkedIn Ads, Outreach, Gong',
     '6sense + Salesloft; RollWorks + HubSpot'),
    ('AI-First Marketing Stack', 'Teams applying AI across research, content and routing', 'Medium', '$3,000-20,000/month',
     'HubSpot, Clay, OpenAI API, Make, Notion, GA4',
     'Anthropic API + n8n; Jasper + Zapier'),
    ('Newsletter-Led Growth Stack', 'Audience-first B2B companies growing through email', 'Low', '$200-2,000/month',
     'Beehiiv, ConvertKit, SparkLoop, HubSpot, Canva, GA4',
     'Substack + Mailchimp; Kit + Carrd'),
    ('SEO and AEO Stack', 'Content-led acquisition with search and AI-answer visibility', 'Medium', '$1,000-10,000/month',
     'Ahrefs, Webflow, GA4, Search Console, Surfer',
     'Semrush + WordPress; Clearscope + Framer'),
    ('Enterprise Sales Stack', 'Enterprise pipeline with committee buying and long cycles', 'High', '$15,000-100,000/month',
     'Salesforce, Marketo, Demandbase, Outreach, Gong, Clari',
     'Dynamics + 6sense; HubSpot Enterprise + Salesloft'),
    ('Mid-Market Demand Stack', 'Mid-market B2B with a mixed inbound and outbound motion', 'Medium', '$5,000-25,000/month',
     'HubSpot, LinkedIn Ads, Clay, Gong, GA4, Make',
     'Pipedrive + ActiveCampaign; Salesforce + Outreach'),
]

SCORING_ROWS = [
    ('Pipeline impact', 'How much does this tool unblock pipeline?', '1-5'),
    ('Time to value', 'How quickly will the team get value?', '1-5'),
    ('Integration cost', 'How much work to connect it to the source of record?', '1-5'),
    ('Running cost', 'Annual cost relative to the budget band', '1-5'),
    ('Team load', 'Ongoing effort required per month', '1-5'),
]


def build_xlsx():
    from openpyxl import Workbook
    from openpyxl.styles import Alignment, Border, Font, PatternFill, Side
    from openpyxl.utils import get_column_letter
    from openpyxl.worksheet.datavalidation import DataValidation

    path = os.path.join(OUT_DIR, 'gtm-stack-builder-template.xlsx')
    wb = Workbook()

    head_fill = PatternFill('solid', fgColor='155EEF')
    head_font = Font(bold=True, color='FFFFFF', size=10.5)
    title_font = Font(bold=True, size=14, color='17191C')
    note_font = Font(italic=True, size=9.5, color='62676D')
    body_font = Font(size=10, color='17191C')
    thin = Side(style='thin', color='E1E3E5')
    border = Border(left=thin, right=thin, top=thin, bottom=thin)
    wrap = Alignment(wrap_text=True, vertical='top')
    top = Alignment(vertical='top')

    def sheet_header(ws, title, note, columns):
        ws['A1'] = title
        ws['A1'].font = title_font
        ws['A2'] = note
        ws['A2'].font = note_font
        for i, (name, width) in enumerate(columns, 1):
            c = ws.cell(row=4, column=i, value=name)
            c.fill = head_fill
            c.font = head_font
            c.alignment = wrap
            c.border = border
            ws.column_dimensions[get_column_letter(i)].width = width
        ws.freeze_panes = 'A5'

    # ---- 1. Read me
    ws = wb.active
    ws.title = 'Read me'
    ws.column_dimensions['A'].width = 26
    ws.column_dimensions['B'].width = 96
    ws['A1'] = 'GTM Stack Builder Template'
    ws['A1'].font = title_font
    ws['A2'] = 'Companion to the GTM Stack Builder tool on %s' % SITE
    ws['A2'].font = note_font
    rows = [
        ('Purpose', 'Choose a marketing and go-to-market technology stack against your stage, motion, budget, team and economics — then track what you actually adopted.'),
        ('How to use', '1. Fill the selection framework with your six inputs. 2. Filter the presets to the closest match. 3. Copy the preset rows into the Stack Template. 4. Score each tool. 5. Keep the top priority items and delete the rest.'),
        ('Sheet: Stack Template', 'One row per tool. Category, problem, recommended tool, alternative, pricing, complexity, integrations, team requirement, use case, priority and notes.'),
        ('Sheet: Selection Framework', 'The six inputs that determine which stack profile fits: stage, motion, budget, team size, sales cycle and ACV.'),
        ('Sheet: Stack Presets', 'Twelve stacks drawn from the 79 curated stacks published on the site, with the tools, complexity and budget band for each.'),
        ('Sheet: Priority Scoring', 'Weighted scoring for the tools you are considering. Sort by total, then argue about the top three only.'),
        ('Rules', 'Every tool needs an owner and a documented use case. If two tools solve the same problem, delete one before adding anything new.'),
        ('Version', '2026-09-22 · generated from the site content set; review quarterly.'),
    ]
    r = 4
    for k, v in rows:
        ws.cell(row=r, column=1, value=k).font = Font(bold=True, size=10, color='17191C')
        c = ws.cell(row=r, column=2, value=v)
        c.font = body_font
        c.alignment = wrap
        ws.row_dimensions[r].height = 30
        r += 1

    # ---- 2. Stack template
    ws2 = wb.create_sheet('Stack Template')
    sheet_header(ws2, 'Stack Template', 'One row per tool. Priority: P1 (do now) · P2 (next quarter) · P3 (later) · P4 (defer). Seeded rows are examples from the site\'s stack library — replace them with your choices.', STACK_COLUMNS)
    r = 5
    for row in STACK_ROWS:
        for i, val in enumerate(row, 1):
            c = ws2.cell(row=r, column=i, value=val)
            c.font = body_font
            c.alignment = wrap
            c.border = border
        r += 1
    for _ in range(16):
        for i in range(1, len(STACK_COLUMNS) + 1):
            c = ws2.cell(row=r, column=i, value=None)
            c.border = border
            c.alignment = wrap
        r += 1
    dv_pri = DataValidation(type='list', formula1='"P1,P2,P3,P4"', allow_blank=True)
    dv_cx = DataValidation(type='list', formula1='"Low,Low-Medium,Medium,Medium-High,High"', allow_blank=True)
    ws2.add_data_validation(dv_pri)
    ws2.add_data_validation(dv_cx)
    dv_pri.add('J5:J%d' % (r - 1))
    dv_cx.add('F5:F%d' % (r - 1))
    ws2.auto_filter.ref = 'A4:K%d' % (r - 1)

    # ---- 3. Selection framework
    ws3 = wb.create_sheet('Selection Framework')
    sheet_header(ws3, 'Selection Framework', 'Answer the six inputs, then read the consequence row. Presets on the next sheet are organised to match.', [('Input', 22), ('Profile A', 30), ('Profile B', 30), ('Profile C', 30), ('Profile D', 30)])
    r = 5
    for row in SELECTION_FRAMEWORK:
        for i, val in enumerate(row, 1):
            c = ws3.cell(row=r, column=i, value=val)
            c.font = Font(bold=True, size=10, color='17191C') if i == 1 else body_font
            c.alignment = wrap
            c.border = border
        r += 1

    # ---- 4. Presets
    ws4 = wb.create_sheet('Stack Presets')
    cols = [('Stack', 30), ('Who it is for', 46), ('Complexity', 13), ('Budget band', 22), ('Tools', 62), ('Alternatives', 40)]
    sheet_header(ws4, 'Stack Presets', 'Twelve of the 79 stacks published on the site. Filter by complexity and budget to find your starting point.', cols)
    r = 5
    for row in PRESETS:
        for i, val in enumerate(row, 1):
            c = ws4.cell(row=r, column=i, value=val)
            c.font = body_font
            c.alignment = wrap
            c.border = border
        r += 1
    ws4.auto_filter.ref = 'A4:F%d' % (r - 1)

    # ---- 5. Priority scoring
    ws5 = wb.create_sheet('Priority Scoring')
    cols = [('Criterion', 26), ('What it measures', 52), ('Weight', 10), ('Tool A', 10), ('Tool B', 10), ('Tool C', 10), ('Notes', 34)]
    sheet_header(ws5, 'Priority Scoring', 'Score each candidate 1-5. Weighted total = score x weight. Keep the top three; everything else waits.', cols)
    r = 5
    for name, desc, weight in SCORING_ROWS:
        ws5.cell(row=r, column=1, value=name).font = Font(bold=True, size=10, color='17191C')
        ws5.cell(row=r, column=2, value=desc).font = body_font
        ws5.cell(row=r, column=3, value=weight).font = body_font
        for col in range(1, 8):
            ws5.cell(row=r, column=col).border = border
            ws5.cell(row=r, column=col).alignment = wrap
        r += 1
    ws5.cell(row=r, column=1, value='Weighted total').font = Font(bold=True, size=10, color='17191C')
    for col in (4, 5, 6):
        letter = get_column_letter(col)
        ws5.cell(row=r, column=col, value='=SUMPRODUCT(%s5:%s%d,$C$5:$C$%d)' % (letter, letter, r - 1, r - 1))
        ws5.cell(row=r, column=col).font = Font(bold=True, size=10, color='155EEF')
        ws5.cell(row=r, column=col).border = border

    wb.save(path)
    return path


def main():
    os.makedirs(OUT_DIR, exist_ok=True)
    produced = []
    for doc in (content.AUDIT, content.BLUEPRINT, content.MATURITY, content.PLAYBOOK):
        produced.append(build_pdf(doc))
    produced.append(build_xlsx())
    for path in produced:
        size = os.path.getsize(path)
        print('%-58s %8.1f KB' % (os.path.relpath(path, ROOT), size / 1024.0))
    print('\n%d files written to public/downloads/' % len(produced))


if __name__ == '__main__':
    main()
