---
name: email-campaign-brief
description: Generates a tight, professional email marketing brief through a guided interview. Use whenever the user is planning, scoping, or about to write an email campaign — welcome series, nurture flows, promotional sends, newsletters, product launches, lifecycle/automation, abandonment, re-engagement, or any other email send. Triggers on phrases like "write a brief for my email campaign", "creative brief for an email", "help me scope an email send", "draft a brief for a 3-email nurture", "we're planning a launch email", or any time the user starts an email project with stakeholders, agencies, designers, copywriters, or developers. Also triggers on requests for a sample/blank brief ("show me what a brief looks like", "give me the brief template", "what info do I need for an email brief"). Works for one email or a multi-email sequence. Produces Markdown (default), Word doc, or HTML, and remembers the choice. Includes optional recommendations, sample layout, and sample copy generation.
metadata:
  version: "2.1.2"
---

# Email Campaign Brief

This skill walks a marketer through producing a tight, opinionated email campaign brief. The brief itself follows a deliberately short format — 1.5 pages or less in Word — because long briefs are a strong tell that the strategy isn't actually clear. If you can't get the brief that short, the strategy probably isn't ready.

## The mindset behind a good brief

A brief is a document of restraint. It exists to align everyone — copy, design, dev, QA, stakeholder, legal — on what the work needs to do and what it absolutely must include. It is **not** a project plan, a campaign retrospective, or a content dump. Three things matter:

1. **Specificity beats coverage.** "First-time moms over 30 in major US metros" is a target audience. "Women 18–55" is not.
2. **One idea, not five.** The Single Minded Idea is the most-violated rule in marketing. Eight words. No `and`, `or`, `but`. If you can't write one, the strategy isn't ready.
3. **Mandatories are mandatory.** This section is for things that, if missing from the creative, would force a rework — legal disclosures, unmovable client requirements, channel requirements. It is not a wishlist.

Carry this mindset into every question you ask the user. If they give you a vague answer, push back gently with a concrete example of what "good" looks like. See `references/section_guide.md` for what makes each section land vs. drift.

## The flow

### Step 0: Check memory before asking anything

The host environment (Cowork) has a persistent memory system. Before you start asking the Step 1 setup questions, **read `MEMORY.md` and any relevant memory files** to recover facts about this user / brand that are likely still true. The goal is to never re-ask the user something they've already told you in a previous brief.

Look specifically for memories that pre-fill these slots:

- **Brand / company** — name, one-line description, voice guide, recurring proof points (e.g., "the 6-minute setup stat is always allowed")
- **ESP / sending platform** — drives the `utm_source` default
- **Production path** — do they have an EDS, hand-code HTML, or work with an agency? Drives the default Mandatories, Timeline, and Budget question
- **Compliance scope** — what regions they ship to (US-only, US+CA, US+CA+EU, etc.) — drives the Mandatories regimes
- **Standard suppression rules** — recurring exclusion categories (recent purchasers, sales-engaged accounts, internal domains)
- **Default owners** — who runs strategy, design, dev, legal, deployment
- **Interview style preference** — conversational vs. batched
- **Localization defaults** — which locales they ship to, who their translation vendor is, typical translation round time
- **Measurement defaults** — typical holdout %, reporting cadence (e.g., they always want T+7 and T+30 reports)
- **Preferred output format** — `md` (default), `docx`, or `html`. Honor this in Step 7 without re-asking. If memory is empty, default to `md`.
- **Email-type defaults** — facts about a specific type of email (e.g., "monthly newsletter") that recur across campaigns of that type: typical sender name, standard KPIs and benchmarks, recurring mandatories (footer template, unsubscribe block), default suppression rules, common layout patterns, and any "lessons learned" the user noted previously. These live in per-type memory files (e.g., `email-type-newsletter.md`, `email-type-launch.md`) so the next newsletter brief starts pre-populated. See "Step 8: Save what's worth remembering" for the save format.

When you find applicable memories, **state them back as assumptions for this session and let the user override**. For example:

> Picking up from last time — I'll assume Iterable as your ESP, in-house EDS for production, US+CA+EU compliance scope (CAN-SPAM/CASL/GDPR/UK GDPR/CCPA), and your standard suppression list (paid customers, integrated users, internal domains, sales-engaged). Say "yes" to lock those in, or tell me what's changed.

If memory is empty (first-ever brief for this user), proceed to Step 1 normally — you'll capture the user's answers and save them at the end.

### Step 0.5: Sample-brief shortcut (skip if user is building a real brief)

If the user is asking for a *sample*, *blank template*, *example*, or *outline of what info to gather* (phrases like "show me what a brief looks like", "give me the template", "what do I need to know before starting", "I want to see the format first"), don't run the interview. Instead, read `assets/sample_brief_template.md` and return it directly — it's the brief structure with section-by-section "what to fill in here" instructions written in plain English. After returning it, offer: "Want to start the real brief now? I'll walk you through each section." This is also a useful response when a user is new to the skill and asks "what does this skill do?"

If the user is clearly building a real brief, skip this step and continue to Step 1.

### Step 1: Set the mode and scope

Before you start gathering content, ask the user three setup questions. Do these together as one short message — they're cheap to answer and you need all three before you can plan the interview.

1. **Interview style:** "Want to do this **conversational** (I walk you through one section at a time) or **batched** (I send a few questions per chunk, faster)?" Default to conversational if they don't pick.
2. **Web research:** "Mind if I do a bit of web research to fill gaps and pressure-test your inputs (competitors, audience signals, etc.)? You'll review anything I add before it lands in the brief." Default to yes unless they decline. If they decline, note it and don't search.
3. **Campaign size:** "How many emails are in this campaign — one, or a sequence? If a sequence, roughly how many and what's the shape (welcome series, nurture, abandonment, launch announcement + reminders, etc.)?"
4. **Localization:** "Does this need to ship in multiple languages or locales? If yes, list them (e.g., en-US, en-GB, fr-FR, de-DE). Localization adds real time and complexity — translation rounds, locale-specific legal/disclosures, locale-aware segmentation, and per-locale or aggregated goal tracking — so we want to surface it now rather than discover it on day five." Default is single-locale if the user doesn't mention.

Optionally also ask up front for the company/brand name and a one-line description so you have something concrete to anchor the rest of the interview.

### Step 2: Gather the shared brief content

Walk the user through these sections in order. The wording below is the structure of the final brief — your job is to extract enough from the user to fill each one tightly.

- **Background** — why are we doing this; the absolute must-knows for the project. 2–4 sentences.
- **Goal** — the quantitative business outcome the campaign is shooting for. Result-driven, with a number and a timeframe. Examples: "Lift trial-to-paid conversion from 9% to 14% within the trial window", "Recover $180k in BF revenue from this send", "Generate 800 demo signups and $400k pipeline in 14 days." This is distinct from the Challenge (what's hard) and from the per-email KPIs (measurement of each send). If the user gives you a non-quantitative goal ("get more donations", "drive awareness"), push back and force a number with a timeframe.
- **Target Audience** — specific demographic + psychographic. Read `references/section_guide.md` before accepting a vague answer.
- **Challenge** — what we're trying to do / overcome / solve for. One paragraph.
- **Opportunity** — where the brand fits relative to the challenge and why this can succeed. One paragraph.
- **Single Minded Idea** — 8 words or less, no `and` / `or` / `but`. *This is a creative anchor, not a business outcome.* The Goal is what the campaign needs to achieve (a number); the SMI is the one sticky thought the audience walks away with after reading the creative. They are different. If the user conflates them, separate them: "The Goal is the result we're measuring; the SMI is the idea we're saying." Work the words down together — this is the highest-leverage creative section.
- **Proof Points** — 3–5 reasons the audience should believe the idea. Each must support the idea AND the challenge/opportunity. Cut points that don't.
- **Mandatories** — legal requirements, unmovable client requirements, required elements (including any content the user has explicitly said must appear in the creative — see content prompt below). Push back if the user lists subjective preferences here.
- **Timing & Executional Guidelines** — deadline, format, number of concepts/pieces required, **owners** (who's responsible for each piece: strategy, copy, design, dev, legal review, deployment, measurement — one line per role), and if localized, **translation rounds** in the timeline (5–10 business days is typical per round).
- **Measurement Plan** — how we'll know if the Goal was hit. Tight: holdout group %, what's being A/B tested (subject line / hero / CTA), reporting cadence, and the explicit Primary KPI / Secondary KPIs / Diagnostic metrics. If the campaign is localized, note whether goals are per-locale or aggregated, and how attribution rolls up.

For each section, if the user's input is vague or generic, give them a concrete example of what a sharper version would look like and ask them to refine. Don't accept a "shit brief" on autopilot.

### Step 3: Gather email-specific content

These elements are what makes an email brief different from a generic creative brief. Read `references/email_specifics.md` for the rationale on each.

**Campaign-level (shared across all emails in the campaign):**
- **Type of message** — welcome / promotional / newsletter / lifecycle / abandonment / re-engagement / transactional / announcement / nurture / other. **Capture this explicitly — it's the key into email-type memory.** If a per-type memory file exists (e.g., `email-type-newsletter.md`), pull its defaults forward as starting assumptions for this brief: sender name pattern, typical KPIs, recurring mandatories, default suppression rules, common layout. Surface those to the user so they can confirm or override.
- **Sender name & reply-to** — friendly from? brand? person? Where do replies go?
- **KPIs** — what defines success. Always present these as a clean three-line structure: **Primary** (the one number tied to the Goal), **Secondary** (2–3 supporting metrics), **Diagnostic** (open rate, CTR, unsub rate — the metrics that explain the others, not the ones tied to outcomes). Push past "opens" and "clicks" for Primary — those belong in Diagnostic. For Primary, demand business outcomes (registrations, MQLs, AOV, revenue, demo signups, etc.).
- **Localization** — if the campaign is multi-locale, capture: list of locales (en-US, en-GB, fr-FR, etc.), whether each locale needs its own brief / creative concepts or whether one master brief drives translations, per-locale send timing (timezone-aware), per-locale legal/disclosure differences (GDPR for EU, CASL for CA, locale-specific footer requirements), and how the Goal rolls up — is it a single aggregate target, or per-locale targets? Translation rounds typically add 5–10 business days; flag this in the Timeline so the user isn't surprised.
- **Production path** — ask the user generically first: "How will this get built? Pick the closest fit: (a) we have an Email Design System / modular template library, (b) we hand-code HTML / use snippets, (c) we'll need a designer + dev to produce something new, (d) other / unsure." Their answer drives the Timing & Mandatories sections. If the user asks for options or guidance (e.g., "what tools do people use?", "what's an EDS?", "recommend something"), it's fine to research and surface a few neutral options — present them as a comparison, not as a pitch, and let the user choose.
- **Suppression / exclusion lists** — ask explicitly: "Are there any audiences who must NOT receive this campaign? Common examples: recent purchasers, paid customers (for free-trial campaigns), unsubscribed-from-marketing, employees, competitor domains, sales-engaged accounts, GDPR opt-out segments." This is where a lot of "wait we sent it to *who*?" incidents come from — don't let the user skip it.
- **UTM parameters / link tracking** — **always include this section in the final brief; do not skip it even if the user shrugs.** Ask: "What UTM parameters should we use for links in this campaign? The conventions are usually:
  - `utm_source` — the email sending platform (Mailchimp / Marketo / Klaviyo / Iterable / whatever). **Capture the ESP by name even beyond the UTM** — it also drives the capability-tailored recommendations in Step 6 (what techniques their platform can actually build)
  - `utm_medium` — typically `email`, but some teams use `email_lifecycle` / `email_campaign` to distinguish flows from blasts
  - `utm_campaign` — the campaign name, **same value across every email in the campaign** so downstream analytics can group them
  - `utm_term` — often used to mark which step in the sequence (e.g., `email-1` / `welcome-step-1`); optional but recommended for multi-email campaigns
  - `utm_content` — usually varies per link (e.g., `hero-cta` vs `secondary-text-link`) so click attribution is granular
  You don't need all five — at minimum capture `utm_source`, `utm_medium`, and `utm_campaign` at the campaign level. `utm_term` and `utm_content` can be set per email/per link." If the user doesn't know or shrugs, **propose sensible defaults based on their ESP and campaign name, present them, and ask the user to confirm or override** — do not leave the UTM block out of the brief. Example fallback for a Dyspatch newsletter sent via HubSpot: `utm_source=hubspot`, `utm_medium=email`, `utm_campaign=dyspatch-newsletter-figma-theme-2026-05`.
- **Provided or required content** — ask: "Do you have any sample copy, draft language, or required content I should incorporate? Specifically: (a) **must-include content** — anything legal, brand, or stakeholders have said must appear verbatim (these go in Mandatories), (b) **sample content** — drafts or directional copy I should treat as a starting point for the creative team, (c) **reference content** — past emails, landing pages, or messaging frameworks that should inform tone/voice." If the user pastes content into the conversation, capture it and route it appropriately: verbatim-required language goes to Mandatories, drafts/samples go to Assets, references go to Assets with a note.
- **Legal & compliance** — ask about the regulatory regimes that apply based on the audience location, not just the sender's: CAN-SPAM (US), CASL (Canada), GDPR (EU/UK), CCPA/CPRA (California), PECR (UK), LGPD (Brazil), Australia's Spam Act, etc. For sequences that include profiling or behavioral triggers, also flag explicit consent requirements. List the applicable ones in Mandatories alongside the standard one-click unsubscribe and physical address requirements.
- **Assets** — ask explicitly, in two parts: **(1)** "What assets already exist that we'll use? (copy drafts, hero imagery, product shots, brand assets, landing pages, video, GIFs, logos, illustrations)." **(2)** "What assets are net new and need to be created — and by whom (designer, photographer, copywriter, agency)?" Capture both lists separately. Net-new assets drive timeline and budget; missing this prompt is the #1 cause of "we found out three days before launch we still need the hero" — so don't skip part (2), even if the user lists existing assets first.
- **Testing & QA** — anything specific to flag (interactive elements, dark mode, accessibility, deliverability concerns, segments to test).

**Per-email (only if there are multiple emails in the sequence):**
For each email in the sequence, gather a *mini-section*. Keep these short — one line per field.
- **Email N — [working title]**
  - **Goal** — single sentence
  - **Segment / List** — who gets this specific email
  - **Subject line** (and 1–2 alternates if A/B testing)
  - **Preheader**
  - **Primary CTA** (and destination URL if known)
  - **Timing** — send date/time, or trigger condition + delay
  - **Exit condition** — what behavior or event removes the user from the rest of the sequence (e.g., "converted to paid", "completed integration", "purchased", "replied"). For multi-email campaigns this is critical — ask the user explicitly: "Once someone takes the desired action, do they keep getting subsequent emails or drop out of the sequence?" The default for nurture/lifecycle is "drop out on conversion"; the default for announcements/newsletters is "everyone gets every send." Don't assume — confirm.
  - **UTM term / content** — `utm_term` typically marks the step (`email-1`, `email-2`, etc.) and `utm_content` typically marks the link within the email (`hero-cta`, `secondary-cta`, `footer-text-link`). Capture the per-email value here; the campaign-level UTMs (`utm_source`, `utm_medium`, `utm_campaign`) are already locked in the email-specific section above.

### Step 4: Detect external production and offer a budget section

The user said: only include budget if external production is involved. Listen for any of these signals in the user's answers:
- They mention an agency, freelancer, designer-for-hire, external developer, or copywriter-for-hire
- They picked "designer + dev to produce something new" in the production path question
- They mention paid media, paid promotion, or commissioned creative

If you detect any of those, ask once: "Sounds like there's external production cost involved — want a one-line budget note in the brief? I'll keep it minimal." If yes, ask for the total budget, currency (default USD), and a rough split (e.g., 50% design / 50% execution). The brief will contain exactly one line, e.g.: `Budget: $12,000 USD — 50% design, 50% execution.`

If there is no external production, omit the budget section entirely.

### Step 5: Market & audience research (recommended, if allowed)

If the user opted in to web research (Step 1), do a focused market-research pass. This is the one place the skill actively *generates* signal rather than only pressure-testing — but everything you find still gets surfaced for the user to accept or reject before it lands. Research three things:

- **Audience signals** — communities, review sites, public discussion (subreddits, G2/Capterra, forums) to sharpen the persona from "plausible" to "specific." Look for the language the audience actually uses, the objections they raise, the moment they're in.
- **Competitor scan** — recent campaigns or email examples from peers in this vertical and email type. What's the category convention, and where's the opening to break from it?
- **Industry benchmarks** — realistic numbers to back the Proof Points and pressure-test the Measurement Plan (typical open / CTR / conversion for this email type and vertical).

Also consult `references/proven_patterns.md` — the local pattern library — for techniques that have worked for this email type or vertical.

Feed findings two ways: **back into Step 2** (tighten Target Audience, Opportunity, and Proof Points) and **forward into Step 6** (evidence for recommendations). Findings do **not** get their own brief section — they sharpen existing sections and back recommendations, keeping the core brief lean.

**Discipline (unchanged):** surface every finding with a one-line summary and a source link, and let the user accept or reject it before it touches the brief. Never silently insert researched facts.

If the user **declined** web research in Step 1, skip the live search — but you can still consult `references/proven_patterns.md` (it's a local file, not a web fetch). Flag clearly that any audience/competitor reasoning is from model knowledge, not freshly sourced.

### Step 6: Recommendations phase (offer before drafting)

Before assembling the draft, **offer a short recommendations pass**:

> "Before I write the draft, want me to do a quick recommendations pass? I'll look at what we've gathered and suggest 1–3 ways this campaign could land harder — things like audience segmentation, layout choices, or newer techniques that fit *this* brief specifically. Takes about 30 seconds."

If the user agrees, the flow is **strictly two turns** — generate, then wait for decisions, then move on. Do not collapse them.

**Turn 1 — generate and present.**

1. **Re-read the brief context** — type of message, audience, goal, SMI, mandatories, production path, the user's industry/company. Look for friction or missed leverage.
2. **Research, if web is enabled** — search for: (a) current best-in-class examples of this email type in the user's industry/vertical, (b) recent techniques applicable to this campaign (e.g., interactive AMP modules for ecommerce, dark-mode hero design for SaaS launches, kinetic/CSS-animated headers for product reveals), (c) **capabilities of the user's ESP** (captured in Step 3, or recovered from memory in Step 0) — what does *their* platform actually support (dynamic/conditional content, send-time optimization, AMP, A/B automation, predictive segments)? Only recommend techniques their stack can actually build, (d) segmentation studies relevant to the goal. **Consult `references/proven_patterns.md` as a first-class source** alongside web research — prefer a proven, sourced pattern over a freshly-searched claim.
3. **Produce 1–3 recommendations only — not a wall of suggestions.** Each recommendation must be:
   - **Specific to this brief** (reference the user's company, audience, or goal — not generic best practices)
   - **Actionable** (the user can decide yes/no and the brief reflects the change)
   - **Backed by reasoning or a source** when claiming a measurable effect ("studies show ~X% lift" needs a link or it doesn't go in)
   - **Honest about cost** — if a recommendation adds time, vendors, or risk, say so

   Example shapes:
   - *"Consider segmenting this newsletter into two sends — paid customers vs. prospects — with the paid version leading on the workflow video and the prospect version leading on the brand-guidelines pain point. For monthly newsletters, segmented sends average ~14% higher CTR ([source]). Adds one extra build + QA cycle."*
   - *"For a launch this important, consider a distinct visual treatment — a kinetic CSS-animated hero or a side-by-side before/after of the Figma file → email transformation — to break pattern with the standard monthly format. No new vendors required, but it's an extra ~4–6 hours of design + dev."*
   - *"Since Figma to Theme is inherently visual, consider embedding a short looping GIF of the URL paste → theme generation right in the email rather than only linking to the video. Inline media for product reveals shows higher engagement than linked video in B2B SaaS contexts ([source])."*

4. **Present each recommendation with an explicit yes/no/modify ask, then STOP the turn.** Number them so the user can respond `1: yes, 2: no, 3: modify — drop the GIF, keep the side-by-side`. End the turn here — **do not draft the brief in the same message**. Do not assume the user will accept any recommendation, including ones that seem obviously good. The whole point of generating recommendations first is to let the user steer.

**Turn 2 — apply decisions and continue.**

After the user responds, record each recommendation's disposition. Carry these into Step 7 and Step 8. Accepted (and modified) recommendations get incorporated into the relevant section of the brief (audience, mandatories, executional guidelines, etc.) AND get listed in a "Recommendations" section near the top, each with a status marker: `✓` accepted, `~` accepted-with-modification, `✗` rejected (with a one-line reason). The point is a full audit trail — the team can see what was considered and why a choice was made, not just what survived. Don't relitigate rejected ones; record them with their reason and move on.

If the user declines the recommendations pass entirely in the initial offer, skip straight to Step 7.

### Step 7: Sample email (offer before file output)

Layout and copy are the same artifact at two zoom levels, so the skill produces them together — one block list with draft copy attached to each row.

Ask the user:

> "Want me to generate a sample email — a markdown table showing suggested content blocks (header, hero, body sections, CTA, footer) tuned to the goal and audience, with directional draft copy in each block? Yes, skeleton only (no copy), or skip entirely?"

Defaults: **yes** for new campaigns, **skip** for recurring campaign types (e.g., the 12th monthly newsletter where the layout is already settled).

**Output shape — a single markdown table** with these columns: `Block | Purpose | Suggested treatment | Draft copy`. Rows are the content blocks (Preheader, Header / logo, Hero, Body sections, Primary CTA, Secondary CTA, Footer). Tune the block list to the email type — a newsletter looks different from a launch announcement looks different from a cart abandonment.

If the user picks "skeleton only", leave the `Draft copy` column blank or omit it.

**Draft copy rules:**
- Honor the target audience from Step 2 (voice, sophistication level, pain points), the SMI, and any user-provided content.
- If the user provided copy in Step 3 ("Provided / required content"), **treat it as the spine**. Augment around it; don't overwrite it. Mark user-provided lines clearly (e.g., `[user]`) so the team can tell them apart from AI-drafted lines.
- Keep it short — 1–3 sentences per block, plus subject + preheader + CTA labels above or below the table. This is a launch pad, not a finished email.
- For multi-email campaigns, generate the sample email for email 1 only by default; offer to do the rest on request.

Add this to the brief as a single `## Sample Email` section — clearly marked as a suggestion, not a requirement.

### Step 8: Draft and review

Read `assets/brief_template.md` and assemble the brief, including any recommendations / sample layout / sample copy the user accepted. **Always show the user the full draft inline (in markdown) and ask for feedback before producing a file.** Use specific prompting questions like:
- "The Single Minded Idea I landed on is *[X]* — does that nail it, or do you want to wordsmith?"
- "The Mandatories section is short. Anything I should add?"
- "Anything to cut to keep the core brief under 1.5 pages? (Sample email doesn't count toward that limit.)"

Iterate until the user is happy. **Do not skip this step** — the user explicitly asked for a feedback loop before finalizing.

### Step 9: Produce the file

If a preferred format is in memory, honor it without asking. Otherwise ask: "What format — **Markdown** (default), **Word doc**, or **HTML**?" Default to `md` if no preference.

- **md** — write it as a single `.md` file with H2 sections. This is the default.
- **docx** — use the docx skill. Target 1.5 pages for the core brief (sample email can extend it). Use clean headings, no decorative formatting. Tables only for the per-email mini-sections in multi-email campaigns and for the sample email block.
- **html** — single self-contained HTML file with minimal inline CSS (system font stack, generous whitespace, no external dependencies).

If the user picks a format different from what's in memory, ask once: "Want me to remember `[format]` as your default for next time?" — and update memory accordingly in Step 10.

Save the final file to the user's working folder and share a link.

### Step 10: Save what's worth remembering for next time

After producing the brief, write or update memories for facts that are likely to be true on the *next* brief from this user. The point is to make subsequent sessions faster — not to log this campaign's details.

**Save (or update if a memory exists):**

- **Brand context** (`user` type) — company name, one-line description, voice guide pointer, recurring proof points the user reuses (e.g., "Lumen's median setup is 6 minutes, allowed verbatim").
- **ESP and production path** (`user` type) — the sending platform and how they typically build emails. These rarely change session-to-session.
- **Compliance scope** (`user` type) — the regions they ship to. If the user corrected you ("we don't need GDPR, we're US-only"), save that — *with the reason* so you can re-evaluate if their business changes.
- **Standard suppression rules** (`feedback` type) — exclusion categories the user always wants applied. Use the feedback type so the **Why:** and **How to apply:** structure forces you to capture the reasoning.
- **Default owners** (`user` or `project` type) — who runs strategy, design, dev, legal review, deployment. `project` if it's specific to one ongoing initiative; `user` if it's their standing org structure.
- **Localization defaults** (`user` type) — which locales they ship to, translation vendor, typical round time.
- **Style and process preferences** (`feedback` type) — interview style (conversational/batched), reporting cadence preference, holdout convention. Save with **Why:** when the user gave you one.
- **Preferred output format** (`user` type) — `md` / `docx` / `html`. Update whenever the user picks a format, especially if they tell you "use this from now on". Stored in a memory file like `email-brief-output-format.md`.
- **Email-type defaults** (`user` type, one file per type) — facts about a *type* of email (newsletter, launch announcement, abandonment, etc.) that recur across campaigns. Store in files like `email-type-newsletter.md`, `email-type-launch.md`. For each type, capture: typical sender name pattern, baseline KPIs and benchmarks the user expects, recurring mandatories (e.g., "newsletter footer with archive link"), default suppression rules for that type, common layout/structure the user reuses, and any "lessons learned" notes from previous sessions ("last time we tried X and it didn't work"). When the same email type comes up again, these defaults pre-populate the interview.

**Do NOT save:**

- This campaign's Goal, audience, SMI, mandatories, or any ephemeral creative content — those change every brief.
- The brief file path or `computer://` link — these are session-scoped.
- Anything the user explicitly said is one-off ("this time we want the agency to handle copy too" → don't save as a default).
- Sensitive personal data (per the host environment's memory rules — see system prompt).

**How to save:** follow the host environment's memory format — write a self-contained `.md` file in the memory directory with the required YAML frontmatter (`name`, `description`, `type`), then add a one-line pointer in `MEMORY.md`. Check for an existing memory file before creating a new one — update if it exists. Keep memory entries focused and well-named so future-you can find the right ones.

**Tell the user what you saved.** Close the session with a one-line summary like:

> Saved to memory for next time: ESP (Iterable), production path (in-house EDS), compliance scope (US+CA+EU), standard suppression rules, output format preference (Markdown), email-type defaults for monthly newsletters, and your preference for batched interviews + T+7/T+30 reporting. Let me know if any of that's wrong.

This is also the user's chance to correct what gets persisted.

## Things to avoid

- Don't pad sections with filler. A short brief that says clearly what's needed beats a long brief that hedges.
- Don't accept "everyone" or "all customers" as a target audience. Push for a specific persona.
- Don't let the Single Minded Idea drift into two ideas joined by `and`. Pick one.
- Don't volunteer a specific tool (Dyspatch, Stensul, Knak, Mailchimp, etc.) when asking about the production path — stay neutral by default. If the user *asks* what their options are, it's fine to research and present a balanced comparison.
- Don't add a budget section unless external production is involved.
- Don't write the file before the user has reviewed and approved the draft inline.
- **Don't leave the UTM section out of the brief**, even if the user shrugs or skips. Propose defaults and confirm — but always include it in the final output.
- **Don't put more than 3 recommendations in the recommendations phase.** If you have more, pick the highest-leverage three. A wall of suggestions tells the user the recommendations weren't curated.
- **Don't generate recommendations and the draft brief in the same turn.** Recommendations are a yes/no/modify gate — present them, stop, wait for the user's decision per rec, *then* draft. If you draft with all recs pre-applied, the user has nothing to steer.
- Don't generate sample-email copy that ignores the target audience. If the audience is "ops practitioners at mid-market SaaS", don't write copy that sounds like a DTC promo.

## Files in this skill

- `references/section_guide.md` — what good vs. bad looks like for each brief section, with examples and anti-patterns. Read this before pushing back on a vague user answer.
- `references/email_specifics.md` — rationale and detail for the email-specific elements (production paths, assets, per-email mini-sections, testing/QA flags).
- `references/proven_patterns.md` — curated, community-updatable library of techniques that have worked for specific email types / verticals, each with evidence and a source. Consulted during research (Step 5) and recommendations (Step 6). Includes a contribution format so it grows over time.
- `assets/brief_template.md` — the structural template the final brief should follow.
- `assets/sample_brief_template.md` — the same structure annotated with section-by-section "what to fill in here" instructions, returned directly when the user asks for a sample/blank brief.
