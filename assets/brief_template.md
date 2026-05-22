# [Campaign Name]

*Email Campaign Brief*
**Brand:** [Brand]
**Prepared by:** [Name]
**Date:** [YYYY-MM-DD]
**Campaign type:** [Welcome / Promo / Newsletter / Lifecycle / Nurture / Launch / etc.]
**Emails in campaign:** [1 / 3-email sequence / etc.]

---

[Optional — only if the recommendations phase was run and produced suggestions:]

## Recommendations
*Every suggestion from the recommendations pass with its disposition — `✓` accepted, `~` accepted with modification, `✗` rejected (with a one-line reason). A full audit trail of what was considered.*
1. ✓ [Accepted rec, e.g., "Segment send into paid-customer and prospect variants to lift CTR (~14% per industry data ([source]))"]
2. ~ [Modified rec, e.g., "Inline product GIF — accepted, but drop the side-by-side comparison"]
3. ✗ [Rejected rec, e.g., "Kinetic CSS-animated hero — declined (timeline too tight)"]

---

## Background
[2–4 sentences. Why are we doing this? Business context and must-knows.]

## Goal
[Quantitative, result-driven outcome with a timeframe. Examples: "Lift trial-to-paid from 9% to 14% within trial window", "$180k revenue from this send", "800 demo signups + $400k pipeline in 14 days."]

## Target Audience
[A single specific persona. Demographic + psychographic. 2–4 sentences.]

## Challenge
[One paragraph. What we're trying to overcome.]

## Opportunity
[One paragraph. Where the brand fits and why this can succeed.]

## Single Minded Idea
**[8 words or fewer. No and/or/but.]**

## Proof Points
- [Point 1 — directly supports the idea]
- [Point 2]
- [Point 3]

## Mandatories
- [Legal/required element 1]
- [Required element 2]

## Timing & Executional Guidelines
- Launch: [date / time]
- Internal milestones: [concept review, final assets, QA, legal sign-off — table format if 4+ entries]
- Format: [responsive HTML / dark-mode / accessibility level]
- Concepts to develop: [N directions for review]
- Translation rounds (if localized): [+5–10 business days per round]

**Owners**
- Strategy / brief: [Name]
- Copy: [Name or team]
- Design: [Name or team]
- Dev / build: [Name or team]
- Legal review: [Name or team]
- Deployment & measurement: [Name or team]

## Measurement Plan
- **Primary KPI:** [the one number tied to Goal]
- **Secondary KPIs:** [supporting metrics]
- **Diagnostic metrics:** [open rate, CTR, unsub — diagnostics, not outcomes]
- **Holdout:** [e.g., 10% no-send control for incrementality]
- **A/B tests:** [subject line on email 1, etc. — keep to 1–2 tests max per campaign]
- **Reporting cadence:** [e.g., T+7, T+30 post-launch]
- **Localization rollup (if applicable):** [per-locale targets vs. aggregate]

---

## Email-Specific Details

**Sender name / Reply-to:** [Brand or person] / [reply@domain]
**Production path:** [EDS / hand-coded HTML / designer+dev net new / other]
**Localization:** [Single-locale / list of locales if multi: en-US, en-GB, fr-FR, de-DE, etc. — note per-locale legal differences and translation rounds in Timeline]
**Suppression / exclusions:** [Audiences excluded from this send: recent purchasers, paid customers, sales-engaged accounts, internal domains, etc. — or "None"]
**Legal & compliance:** [Applicable regimes: CAN-SPAM, CASL, GDPR, CCPA, etc. — list those that apply based on recipient locations]

### UTM Parameters (always include — defaults proposed if user didn't specify)
- `utm_source`: [ESP / platform, e.g., `hubspot`, `klaviyo`, `marketo`, `mailchimp`]
- `utm_medium`: [`email` / `email_lifecycle` / `email_campaign`]
- `utm_campaign`: [campaign slug — same across all emails in this campaign]
- `utm_term` (per-email, optional): [`email-1`, `email-2`, etc.]
- `utm_content` (per-link, optional): [`hero-cta`, `secondary-cta`, `footer-text-link`]

### Provided / required content
- **Must-include verbatim** (also listed in Mandatories): [exact copy, quotes, disclaimers]
- **Sample content / drafts:** [user-provided directional copy, if any]
- **Reference content:** [past emails, landing pages, voice guides to draw from]

### Assets
- **Existing (already available):** [list]
- **Net new (needs to be created, and by whom):** [list — e.g., "Hero illustration: design team, due [date]"]

**Testing & QA notes:** [special flags, e.g., dark mode, accessibility, interactive elements]

[Optional, only if external production is involved:]
**Budget:** $[X] [CURRENCY] — [N]% design, [N]% execution

---

[Optional — only if user accepted "sample email" in Step 7:]

## Sample Email
*Suggested content blocks with directional draft copy. Voice tuned to the target audience. A starting point for design + copy, not a spec. User-provided lines marked `[user]`; everything else is an AI-drafted launch pad.*

**Subject:** [draft]
**Preheader:** [draft]

| Block | Purpose | Suggested treatment | Draft copy |
|---|---|---|---|
| Header / logo | Brand recognition | [Logo + nav-light treatment, or minimal] | — |
| Hero | Lead with the SMI visually | [Image / animated GIF / illustration suggestion] | [1–2 sentence hero headline + supporting line] |
| Body 1 | Frame the problem | [What the audience already knows / feels] | [1–2 sentences] |
| Body 2 | Reveal the solution | [The new thing, with one specific moment of magic] | [1–2 sentences] |
| Body 3 | Proof | [Customer quote, stat, or demo screenshot] | [1–2 sentences or quote] |
| Primary CTA | [Try it today / Get a demo / etc.] | [Button + supporting line] | [CTA label + 1 supporting line] |
| Secondary CTA | Backup path | [Text link or smaller button] | [CTA label] |
| Footer | Compliance + brand | [Address, unsubscribe, social, archive link] | — |

[For multi-email campaigns, sample email is drafted for email 1 only by default — request more on demand.]
[If user picked "skeleton only" in Step 7, the `Draft copy` column is omitted or left blank.]

---

[Only for multi-email campaigns — repeat block per email:]

### Email 1 — [Working title]
- **Goal:** [one sentence]
- **Segment / List:** [audience for this specific send]
- **Subject:** [primary] (alt: [variant if A/B testing])
- **Preheader:** [text]
- **Primary CTA:** [label] → [destination URL]
- **Timing:** [send date/time or trigger condition]
- **Exit condition:** [what removes user from rest of sequence, or "None"]
- **UTM term / content:** `utm_term=email-1` / `utm_content=hero-cta` (extend per link as needed)

### Email 2 — [Working title]
- **Goal:**
- **Segment / List:**
- **Subject:**
- **Preheader:**
- **Primary CTA:**
- **Timing:**
- **Exit condition:**
- **UTM term / content:**

[...etc.]
