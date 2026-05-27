# Proven Patterns — a community-updatable library

This file is a curated library of email techniques that have worked, organized so the skill can pull a relevant, *evidence-backed* idea into the Step 5 research pass and the Step 6 recommendations. It is meant to **grow over time** — anyone maintaining or using this skill can add a pattern they've seen work, and every future brief benefits.

It is **not** part of the brief structure and never gets copied into a brief verbatim. The skill reads it for inspiration, then tailors any pattern to the specific campaign before suggesting it.

## How to use this file (for the skill)

- During **Step 5** and **Step 6**, scan the section matching the campaign's email type and vertical.
- Treat a pattern here as a candidate recommendation — but it still has to clear the Step 6 bar: *specific to this brief, actionable, honest about cost*. Don't suggest a pattern that the user's ESP can't build or that doesn't fit the audience.
- **Prefer a sourced pattern from this file over a freshly-searched claim.** If a pattern is marked `[needs source]`, you may use the *idea* but must not present the stat as fact — phrase it as directional ("teams often see…") or find a real source before citing a number.

## How to contribute (for humans)

Add an entry under the matching email-type and/or vertical heading. Use this format, one line per field:

```
- **Pattern:** <the technique, one sentence>
  **When it applies:** <email type / audience / situation where it helps>
  **Evidence / why it works:** <mechanism, and a measured effect if you have one>
  **Source / contributor:** <link to a study or case study, OR a name + date if it's first-hand experience>
```

Rules of the road:
- **A measurable claim needs a real source.** No invented stats. If you don't have a citation, write `[needs source]` and phrase the effect qualitatively.
- Keep patterns **transferable** — a technique others can apply, not a one-off creative gimmick tied to one brand.
- Note the **cost** (extra build, vendor, QA surface) when it's non-trivial, so the skill can be honest about it.
- Prune patterns that stop being true (e.g., a client-rendering trick that breaks after a mail-client update).

---

## By email type

### Newsletter
- **Pattern:** Segment a recurring newsletter into audience variants (e.g., customers vs. prospects) and lead each with a different top story.
  **When it applies:** Recurring newsletters with a mixed list where the lead story lands differently for each group.
  **Evidence / why it works:** Relevance of the lead item drives the click; a segment-tuned lead beats a one-size-fits-all top story. Measured lift varies by list. `[needs source]`
  **Source / contributor:** Established list-segmentation practice; quantify before citing a number.
- **Pattern:** Stable, scannable module order (lead → secondary items → one clear CTA) repeated every issue.
  **When it applies:** Ongoing newsletters where readers skim.
  **Evidence / why it works:** Predictable structure lowers cognitive load for repeat readers and speeds production. Qualitative.
  **Source / contributor:** Established practice.

### Launch / announcement
- **Pattern:** Break the template — give a launch a distinct visual treatment (kinetic/CSS-animated hero, or a before/after) versus the standard recurring format.
  **When it applies:** High-stakes product/feature launches to an audience used to your routine sends.
  **Evidence / why it works:** Pattern-interrupt signals "this one matters" and earns attention. Costs extra design + dev (~hours, not days) and added QA across clients.
  **Source / contributor:** Established creative practice; verify rendering support before recommending.
- **Pattern:** Show the product moment inline (short looping GIF of the key action) rather than only linking to a video.
  **When it applies:** Visual/demoable products where the "aha" is a single motion.
  **Evidence / why it works:** Inline media for product reveals tends to out-engage a linked video in B2B contexts. `[needs source]`
  **Source / contributor:** Phrase as directional until sourced.

### Welcome / onboarding
- **Pattern:** First email sets one expectation and offers exactly one next action tied to activation.
  **When it applies:** Automated welcome triggered on signup.
  **Evidence / why it works:** A single, activation-linked CTA outperforms a menu of options that splits attention. Qualitative.
  **Source / contributor:** Established lifecycle practice.

### Abandonment (cart / browse / form)
- **Pattern:** Lead with the abandoned item itself (image + name), not a generic "come back" message.
  **When it applies:** Cart/browse abandonment with known product context.
  **Evidence / why it works:** Specific recall of the item beats generic re-engagement copy. `[needs source]`
  **Source / contributor:** Established ecommerce practice.

### Re-engagement / win-back
- **Pattern:** Make the ask small and explicit (one question, or "still want these?") before any discount.
  **When it applies:** Lapsed subscribers; deliverability hygiene.
  **Evidence / why it works:** A low-friction response sorts genuinely-interested users from dead weight, protecting sender reputation. Qualitative.
  **Source / contributor:** Established deliverability practice.

### Nurture
- **Pattern:** One idea per email with a clear exit condition, rather than one long email covering everything.
  **When it applies:** Multi-step educational sequences.
  **Evidence / why it works:** Each send earns one decision; exit-on-conversion avoids the "you haven't done X yet" message to someone who already did X.
  **Source / contributor:** Established lifecycle practice (see `references/email_specifics.md` on exit conditions).

---

## By vertical

### SaaS / B2B
- **Pattern:** Tie the Primary KPI to a downstream activation metric (e.g., integration completed, seat activated), not opens/clicks.
  **When it applies:** Trial and onboarding campaigns where the real outcome is product usage.
  **Evidence / why it works:** Activation correlates with conversion far more than open rate; measuring it aligns the brief with revenue. Qualitative.
  **Source / contributor:** Established product-led-growth practice.

### DTC / ecommerce
- **Pattern:** Suppress recent purchasers from promo sends offering a deeper discount.
  **When it applies:** Discount-driven promos.
  **Evidence / why it works:** Prevents the "I just paid more" support/refund issue and protects margin. Qualitative.
  **Source / contributor:** Established practice (see `references/email_specifics.md` on suppression).

---

## ESP-capability notes

When the user's ESP is known (Step 3 / memory), prefer techniques their platform can actually build. Capabilities to look for and match a pattern against — confirm against the platform's current docs before recommending, since features change:
- **Dynamic / conditional content blocks** — enables segment-tuned variants in one send instead of multiple builds.
- **Send-time optimization** — per-recipient timing instead of one global send time.
- **A/B / multivariate automation** — supports the Measurement Plan's test design.
- **Predictive / behavioral segments** — enables exit conditions and triggered sequences.
- **AMP / interactive email support** — gates kinetic or in-email-action recommendations.

Don't name or pitch a specific ESP unprompted (tool-neutrality); only research the capabilities of the one the *user* told you they use.
