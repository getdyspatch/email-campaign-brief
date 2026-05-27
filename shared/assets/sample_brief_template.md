# [Your Campaign Name Goes Here]

*Email Campaign Brief — annotated sample*
**Brand:** [Your company / brand name]
**Prepared by:** [Your name]
**Date:** [YYYY-MM-DD when this brief is being written]
**Campaign type:** [Welcome / Promo / Newsletter / Lifecycle / Nurture / Launch / Abandonment / Re-engagement / Transactional / Announcement / Other]
**Emails in campaign:** [1, or "3-email sequence", or "ongoing monthly", etc.]

> **About this sample.** This is the structure the email-campaign-brief skill will produce. Each section below explains what goes in it, what "good" looks like, and what to avoid. You can either fill it out and hand it back, or just skim it to know what info to have ready when you start the real interview.

---

## Background
**What it is:** 2–4 sentences answering *why are we doing this campaign now?* Business context only — not goals, not creative, not project plan.
**Good looks like:** "Q4 revenue is tracking 12% below plan. Self-serve trial-to-paid conversion dropped from 14% to 9% after the March pricing change. This campaign targets active trial users in their final 7 days to recover that drop."
**Avoid:** restating the goal, jargon ("synergizing our omnichannel approach"), or project-plan details (owners, dates) that belong elsewhere.

## Goal
**What it is:** the *quantitative* business outcome with a number and a timeframe.
**Good looks like:** "Lift trial-to-paid conversion from 9% to 14% within the 14-day trial window." Or: "Generate $180k in attributable revenue from this single send." Or: "800 demo signups + $400k pipeline in 14 days."
**Avoid:** "drive awareness", "engage our audience", "get more donations" — these are directions, not goals. If you don't have a number, the strategy probably isn't ready.

## Target Audience
**What it is:** *one* specific persona, demographic + psychographic, tight enough that two different copywriters would picture the same person.
**Good looks like:** "First-time SaaS buyers in operations roles at 50–500 person companies. They're evaluating tools without procurement support, usually on a Friday afternoon. They distrust sales calls and want to self-serve, but need to convince a skeptical CFO."
**Avoid:** "Women 18–55", "our customers", or three personas crammed into one paragraph. If you have multiple audiences, write multiple briefs.

## Challenge
**What it is:** one paragraph naming what we're trying to overcome — friction, perception, behavior, competitive dynamic.

## Opportunity
**What it is:** one paragraph on where the brand fits relative to the challenge and why this campaign can succeed now.

## Single Minded Idea
**What it is:** the one sticky thought the audience walks away with — **8 words or fewer**, no `and` / `or` / `but`. This is a creative anchor, not the business outcome.
**Good looks like:** "Brand guidelines that actually enforce themselves." Or: "Your tax refund, three days sooner." Or: "Sleep that costs less than your coffee habit."
**Avoid:** confusing this with the Goal. The Goal is the number we hit; the SMI is the idea we say.

## Proof Points
**What it is:** 3–5 reasons the audience should believe the SMI. Each must support both the SMI *and* the Challenge/Opportunity. Cut points that don't.

## Mandatories
**What it is:** things that, if missing from the creative, force a rework. Legal requirements, unmovable client requirements, channel requirements, and any content stakeholders have said must appear verbatim.
**Avoid:** subjective preferences ("we'd like a bright header"). Those go in design direction, not mandatories.

## Timing & Executional Guidelines
- **Launch date / time:**
- **Internal milestones:** concept review, final assets, QA, legal sign-off
- **Format:** responsive HTML, dark-mode coverage, accessibility level
- **Concepts to develop:** how many directions for review
- **Translation rounds (if localized):** add 5–10 business days per round
- **Owners:** strategy, copy, design, dev, legal review, deployment, measurement — one name per role

## Measurement Plan
- **Primary KPI:** the one number tied to the Goal (e.g., demo signups, revenue, conversion rate). *Not* opens or clicks.
- **Secondary KPIs:** 2–3 supporting metrics.
- **Diagnostic metrics:** open rate, CTR, unsubscribe rate — these explain the others, they don't define success.
- **Holdout:** typically 5–10% no-send control for incrementality measurement.
- **A/B tests:** keep to 1–2 max per campaign (subject line, hero, CTA copy).
- **Reporting cadence:** e.g., T+3, T+7, T+30 post-launch.

---

## Email-Specific Details

**Sender name / Reply-to:** Who shows up in the inbox? Brand only ("Acme"), brand-via-person ("Sarah from Acme"), or a real human? Where do replies go — a monitored inbox, or `noreply@`?

**Production path:** (a) we have an Email Design System / modular templates, (b) we hand-code HTML / use snippets, (c) we'll need a designer + dev to produce something new, (d) other / unsure.

**Localization:** single-locale, or list the locales (en-US, en-GB, fr-FR, de-DE, etc.). Multi-locale adds translation rounds, per-locale legal differences, and goal-rollup decisions.

**Suppression / exclusions:** who must NOT receive this? Recent purchasers, paid customers (for free-trial campaigns), unsubscribed-from-marketing, employees, competitor domains, sales-engaged accounts. *Don't skip this — most "wait we sent it to *who*?" incidents happen here.*

**Legal & compliance:** which regimes apply based on recipient location — CAN-SPAM (US), CASL (Canada), GDPR (EU/UK), CCPA/CPRA (California), PECR (UK), LGPD (Brazil), Australia's Spam Act.

### UTM Parameters (always required)
- `utm_source`: the ESP (e.g., `hubspot`, `klaviyo`, `marketo`, `mailchimp`)
- `utm_medium`: usually `email`; some teams use `email_lifecycle` to distinguish flows from blasts
- `utm_campaign`: a campaign slug — **same value across every email in this campaign** so analytics groups them
- `utm_term` (per-email, optional): which step in the sequence — `email-1`, `email-2`
- `utm_content` (per-link, optional): which link in the email — `hero-cta`, `secondary-cta`, `footer-text-link`

If you don't know yet, the skill will propose defaults based on your ESP and campaign name — you'll confirm before it goes in the brief.

### Provided / required content
- **Must-include verbatim:** anything legal, brand, or stakeholders have said must appear word-for-word.
- **Sample content / drafts:** any directional copy you want the creative team to start from.
- **Reference content:** past emails, landing pages, voice guides to draw tone from.

### Assets
- **Existing (already available):** logos, hero imagery, product shots, brand library, landing pages, video.
- **Net new (needs to be created, and by whom):** "Hero illustration — design team, due [date]", "Customer quote — partnerships team, due [date]".

**Testing & QA notes:** dark-mode coverage, accessibility, interactive elements (AMP, CSS animation), deliverability concerns, segments to test.

---

## Optional outputs the skill can add

The skill will also offer:
- **Recommendations pass** — 1–3 research-backed suggestions for how this specific campaign could land harder (segmentation, layout choice, newer techniques — including ones tuned to your email platform's capabilities). Every suggestion is logged in a "Recommendations" section with its status (`✓` accepted, `~` modified, `✗` rejected with a reason), so you keep a full audit trail of what was considered.
- **Sample email** — a markdown table of suggested content blocks (header, hero, body sections, CTAs, footer) tuned to the goal and audience, with directional draft copy in each block. If you provide copy, it's used as the spine and augmented; not overwritten. You can also ask for a skeleton-only version (blocks without copy).

## For multi-email campaigns

If this is a sequence (welcome series, nurture flow, launch + reminders, etc.), each email gets a mini-section with: Goal, Segment / List, Subject + alts, Preheader, Primary CTA, Timing or trigger, Exit condition (what removes someone from the rest of the sequence), and per-email UTM term / content.

---

*Ready to start the real brief? Just say so and I'll walk you through it section by section.*
