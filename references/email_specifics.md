# Email-Specific Components — rationale and detail

Generic creative briefs miss the things that make email actually ship. This file expands on the email-specific elements the skill collects.

## Why these elements deserve their own section

An email campaign is not just creative — it's a deliverable that has to render in dozens of clients, hit the inbox, comply with regulation, and trigger off the right user behavior. These elements cause more last-minute rework than the creative concept itself, so they belong in the brief, not in a follow-up Slack thread.

---

## Type of message

Email teams treat different message types with different conventions, templates, and approval flows. Common types:
- **Welcome / onboarding** — first impression, usually automated
- **Promotional** — offer-driven, time-bound
- **Newsletter** — recurring, content-driven, lower-CTA pressure
- **Lifecycle / automated** — triggered by user behavior (signup, milestone, inactivity)
- **Abandonment** — cart, browse, form abandonment
- **Re-engagement / win-back** — for inactive subscribers
- **Transactional** — receipts, confirmations, password resets (different deliverability profile)
- **Announcement / launch** — product, feature, event, brand
- **Nurture** — multi-email series with educational arc

Knowing the type up front tells the team which template, which list, which approval flow, and which deliverability standards apply.

---

## Sender name & reply-to

Inbox display is the first impression. The brief should specify:
- **Sender name** — brand only? brand via person ("Sarah from Acme")? mascot? account rep?
- **Reply-to** — where should replies go? Many transactional templates default to `noreply@`, which kills conversation. Many nurture flows want replies routed to a human.

If the campaign segments by audience, the sender name might also vary by segment (e.g., enterprise prospects see their AE; SMB sees the brand).

---

## KPIs

Push past surface metrics. Opens and clicks are diagnostics, not outcomes. Ask the user:
- What business action does success look like? (signups, MQLs, revenue, retention)
- What's the baseline you're trying to beat?
- Is there a downstream metric (e.g., 30-day activation) that matters more than the immediate response?

A KPI of "increase opens 10%" is fine for an A/B test on subject lines but weak as a campaign-level success criterion.

---

## Production path

The single biggest driver of timeline and cost. Ask generically — do not name a specific tool. Common patterns:

**(a) Email Design System / modular template library**
The team has a maintained library of approved modules (header, hero, product grid, footer, etc.) that get assembled into campaigns. Fastest path; rendering and accessibility are usually pre-solved. Most enterprise teams operate this way.

**(b) Hand-coded HTML / snippets**
The team has reusable HTML snippets and a developer writes/adjusts code per campaign. Mid-speed; high flexibility; rendering testing is per-campaign.

**(c) Designer + dev producing something net new**
A designer mocks up the email, then a developer codes it from scratch (or an agency does both). Slowest; most expensive; required when the campaign demands custom layouts or interactive elements that don't exist in the library.

**(d) Other / unsure**
Worth flagging — this is the user's signal that the production path itself is a decision to be made, which has implications for timing.

The production path drives the realistic minimum lead time and the budget conversation. A path-(c) email may need 3–4 weeks; a path-(a) email may need 3 days.

---

## Assets — existing vs. net new

For each of the following, ask: do we have it, or do we need to make it?
- Copy (subject, preheader, body, CTA)
- Hero imagery or illustration
- Product photography
- Brand assets (logo, color, fonts)
- Landing page(s) for the CTA destination
- Video / animated GIFs
- Legal-approved disclosure copy

"Net new" assets add time and cost. The brief should make these visible up front so they aren't discovered in week two.

---

## Localization

Localization is one of the largest hidden-cost items in email campaigns. A "small" decision to ship in EN + FR + DE can extend the timeline by two weeks, add 20% to the production cost, and triple the QA surface area. The brief must surface this up front, not on day five.

Ask the user explicitly during setup. If the answer is more than one locale, capture:

**Locales** — list them in BCP-47 style (`en-US`, `en-GB`, `fr-FR`, `fr-CA`, `de-DE`, `es-ES`, `es-MX`, `pt-BR`, `ja-JP`). The user often forgets `en-GB` is distinct from `en-US` — spellings, currency, date formats, legal regimes (UK GDPR + PECR), and tone all differ.

**Brief & creative scope** — one master brief that drives translations, or distinct briefs per locale because positioning differs? Default is one master brief + translations for tight launches; per-locale briefs when the market positioning genuinely diverges.

**Translation rounds** — typical: source → translator → in-country reviewer → final. Each round = 2–4 business days. For 4 locales that's 5–10 additional business days minimum. Add this to the Timeline explicitly.

**Per-locale legal differences:**
- EU/UK: GDPR + UK GDPR + PECR — opt-in posture, granular consent
- Canada: CASL (English + French content), Quebec language requirements (French primary in QC)
- Brazil: LGPD
- Germany: stricter consent + impressum-style sender requirements
- France: CNIL guidance, French-language requirement for FR audiences

**Per-locale send timing:** A 9am ET send is 3pm CET, 10pm JST. Either send per-locale at local-morning timing, or pick one global time and accept off-hours delivery for some locales. The brief should call out the choice.

**Goal rollup:** Is the Goal aggregate ("$180k revenue from this send, globally") or per-locale ("$100k US, $40k UK, $40k DACH")? Per-locale targets are more useful for diagnosis but require per-locale tracking.

**Segments per locale:** Lists must be sliced by locale or by user-set language preference. If users haven't declared a preference, you'll default to geolocation or browser language — both imperfect; flag the source-of-truth in the brief.

**Asset handling:** Hero imagery often needs locale-specific variants (cultural references, models, currencies in-image). Account for this in the assets list.

If the user is unsure whether to localize, propose a phased approach: ship the EN master, then add the highest-volume secondary locale 2 weeks later. Don't force the full matrix into a single send.

---

## UTM parameters

UTMs are how email clicks get attributed in downstream analytics (GA4, Heap, Amplitude, Adobe, etc.). If they aren't standardized in the brief, every developer encodes them differently, and the resulting click data is unanalyzable. The brief is where the convention gets set.

The five common parameters:

- **`utm_source`** — Where the click originated. For email, this is almost always the ESP (`klaviyo`, `marketo`, `mailchimp`, `iterable`, `customer-io`, `salesforce-marketing-cloud`, etc.). Locked at the campaign level.
- **`utm_medium`** — The channel category. Most teams use `email`. Some distinguish flow types with `email_lifecycle`, `email_promotional`, `email_transactional`, `email_newsletter`, `email_campaign`. Match the user's existing convention if they have one; if not, propose `email` and ask.
- **`utm_campaign`** — The campaign name as a slug. **Critical: the same value across every email in a multi-email campaign**, so the downstream analytics platform groups them. Use kebab-case (`lumen-trial-activation-q2`, `driftwood-black-friday-2026`, `mosaic-studio-launch`). Locked at the campaign level.
- **`utm_term`** — Optional. Typically used to mark which step in a sequence (`email-1`, `welcome-step-1`, `nurture-day-7`). Useful for multi-email campaigns; less useful for single sends.
- **`utm_content`** — Optional. Typically varies per link within an email (`hero-cta`, `secondary-cta`, `inline-text-link`, `footer-promo`). Granular click attribution depends on this.

At a minimum the brief should lock `utm_source`, `utm_medium`, and `utm_campaign` at the campaign level. `utm_term` and `utm_content` can be specified per email or left to the dev to apply consistently — but the convention must be in the brief, not invented at build time.

If the user doesn't know the answer, propose defaults based on what they've told you (ESP, campaign type, campaign name) and confirm. Don't skip this section — it's small but it's where tracking dies if it isn't captured.

---

## Provided / required content

Sometimes the user pastes copy directly into the conversation, attaches a doc, or tells you "the headline has to be X." Capture this carefully — where it lands in the brief matters.

Three buckets to sort it into:

1. **Must-include verbatim.** Content that, if missing or altered, would force a rework. Legal disclosures, regulator-mandated language, locked tagline, approved testimonial quote, a specific URL or promo code. *This goes in Mandatories, not Assets.* Mandatories is for non-negotiable creative elements; verbatim copy belongs there alongside legal/brand requirements.

2. **Sample / draft content.** The user has a first draft of subject lines, body copy, or a hero headline that they want the creative team to start from and iterate on. *This goes in Assets > Existing.* Tag it clearly as "draft — for adaptation" so the copywriter knows it isn't locked.

3. **Reference content.** Past emails that did well, brand voice guides, landing pages whose tone should be matched. *This goes in Assets > Existing* with a note that it's directional, not material to copy.

Ask the user explicitly: "Is there any copy or content you want included? Anything that must appear verbatim, vs. drafts I should treat as starting points?" If they paste content, route it into the right bucket and surface it back to them before producing the brief — confirm whether each piece is mandatory or directional.

---

## Suppression / exclusion lists

This is the section that prevents the "we sent it to *who*?" incident. Marketing teams develop blind spots for who's *not* on a list — the brief should make exclusions explicit so QA has something to verify against.

Common suppression categories to ask about:
- **Recent purchasers** — should buyers from the last N days be excluded? (Especially relevant for promo sends where a recent buyer seeing a deeper discount creates customer service issues.)
- **Paid customers vs. free users** — free-trial campaigns should suppress paid customers; upgrade campaigns should suppress non-trial users.
- **Unsubscribed-from-marketing** — distinct from list unsubscribe. Some users opt out of marketing but stay subscribed to transactional.
- **Sales-engaged accounts** — accounts in active deal cycles often shouldn't receive marketing automation that crosses into sales messaging. Sync with sales ops before send.
- **Employees / internal domains** — for promotional sends with discount codes, exclude internal email domains to prevent abuse.
- **Competitor domains** — some brands suppress known competitor employees to avoid leaking strategy.
- **GDPR / regional opt-outs** — users in regions with strict consent rules who haven't explicitly opted in for marketing communications of this type.
- **List rental / cold lists** — if any portion of the audience is rented or recently acquired, name it explicitly so deliverability gets the right warm-up plan.

Even if the answer is "none," put "Suppression: none" in the brief — that's a deliberate decision the user is making in writing.

---

## Legal & compliance (regional)

CAN-SPAM is the floor for US senders, not a complete legal framework. The brief should call out the applicable regimes based on **where the recipients live**, not just where the sender is.

Common regimes:
- **CAN-SPAM (US, 2003)** — physical address, clear sender, honest subject, opt-out within 10 business days.
- **CASL (Canada, 2014)** — express or implied consent required; record-keeping requirements; bigger penalties than CAN-SPAM.
- **GDPR (EU, 2018)** — explicit opt-in for most marketing; right to access/erasure; data processing records; transfer restrictions.
- **UK GDPR + PECR** — post-Brexit equivalent; PECR specifically governs marketing communications.
- **CCPA / CPRA (California)** — "Do Not Sell or Share My Personal Information" obligations apply to email if data is shared with third parties.
- **LGPD (Brazil)** — consent-based regime similar to GDPR.
- **Australia Spam Act** — opt-in with limited inferred-consent paths; sender identification.

For B2B campaigns crossing borders, the safest practice is to apply the strictest applicable regime as the default. List the relevant ones in Mandatories so design and dev know what footer language, consent records, and opt-out mechanics must be present.

For triggered or behavior-based sequences, also confirm: do users have explicit consent to receive this specific *type* of email, or just general marketing consent? Some regions treat profiling and behavioral targeting as requiring separate consent.

---

## Exit conditions (multi-email sequences)

When the campaign is more than one email, **always** confirm with the user: does each recipient get every email, or do they drop out of the sequence when they take the desired action?

Defaults by campaign type:
- **Nurture / lifecycle / abandonment / activation** — drop out on conversion. Sending email 3 ("you haven't done X yet") to someone who already did X is embarrassing and erodes trust.
- **Announcement / newsletter** — everyone gets every send.
- **Launch sequence** — usually a mix: save-the-date and launch-day go to everyone; reminders should be conditional on not having converted.

Capture the exit condition per email, not as a campaign-wide rule, because different emails in the same sequence often have different exit rules. The brief should be specific enough that the developer building the automation can encode the logic without follow-up:

```
Email 2 — Activation nudge
- Timing: T+48h post-signup
- Exit condition: integration_count >= 1 OR converted_to_paid == true
```

Vague exit conditions ("if they convert, stop") become bugs at automation-build time. Force specificity in the brief.

---

## Testing & QA

Flag anything that needs special attention during QA:
- **Interactive elements** — AMP for email, kinetic CSS, hover effects (rendering varies wildly)
- **Dark mode** — light logos, transparent PNGs, color-inverted backgrounds
- **Accessibility** — alt text discipline, color contrast, semantic structure (WCAG AA is a common standard)
- **Deliverability concerns** — first send to a cold list, large image-to-text ratio, link shorteners, ALL-CAPS in subject
- **Personalization tokens** — fallback values, conditional content, dynamic blocks
- **Segments to test** — small holdout, geographic split, A/B variant assignment

If the user shrugs on this, default to a minimal note: "Standard QA: inbox preview across Gmail/Outlook/Apple Mail, accessibility check, link verification."

---

## Per-email mini-sections (multi-email campaigns)

When the campaign is a sequence (welcome series, nurture, launch + reminders, abandonment), the shared brief covers strategy. Each email then gets a tight mini-section with execution-level detail.

Keep each mini-section to one line per field — these are quick-reference, not deep-dive.

```
Email 1 — Welcome
- Goal: Acknowledge signup, set expectations
- Segment: All new free-tier signups
- Subject: Welcome to Acme — here's where to start
- Preheader: A 6-minute setup, a 10-minute coffee
- Primary CTA: "Set up your first integration" → /onboarding
- Timing: Sends immediately on signup
- Exit condition: None (welcome always sends)

Email 2 — Activation nudge
- Goal: Move user from signup to integrated
- Segment: Signups who haven't connected a data source after 48h
- Subject: Most teams are integrated by now
- Preheader: Here's the 6-minute path
- Primary CTA: "Connect a data source" → /sources
- Timing: T+48h post-signup, only if integration_count == 0
- Exit condition: integration_count >= 1 OR converted_to_paid == true

Email 3 — Trial cliff
- Goal: Recover trial users in final 7 days
- Segment: Trial users with 7 or fewer days left
- Subject: Your trial ends [DATE] — here's what you'll keep
- Preheader: And a no-strings way to extend
- Primary CTA: "Upgrade your plan" → /upgrade
- Timing: T+23 days post-signup (or 7 days before trial end)
- Exit condition: converted_to_paid == true
```

Pattern: one consistent header for each email, then 6 lines of detail. Anything more belongs in the shared brief or a separate copy doc.
