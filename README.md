# Email Campaign Brief

A [Claude Agent Skill](https://agentskills.io) that walks a marketer through producing a tight, opinionated **email campaign brief** in a guided interview — then hands back a clean Markdown, Word, or HTML document.

🌐 **[getdyspatch.github.io/email-campaign-brief](https://getdyspatch.github.io/email-campaign-brief/)** — what it does, and a one-click download.

The brief is deliberately short (1.5 pages or less). A long brief is usually a tell that the strategy isn't clear yet, so the skill pushes back on vague goals, fuzzy audiences, and multi-idea messaging until each section actually lands.

> 📄 **Preview the output** — [`shared/assets/brief_template.md`](shared/assets/brief_template.md) shows the full structure of a generated brief, section by section.

> 🟣 **Build email in [Dyspatch](https://www.dyspatch.io)?** There's a [Dyspatch-specific variant](#two-variants) that grounds the sample layout in your account's real modules. You don't need a Dyspatch account to use this skill — the standard version is tool-neutral and works with any ESP; this variant just produces sharper briefs for teams who build in Dyspatch.

---

## What it does

Ask Claude to brief an email campaign and the skill runs a short interview, section by section, producing a brief that aligns copy, design, dev, QA, legal, and stakeholders on what the work must do and must include. It covers the strategy a generic creative brief would (Background, Goal, Audience, Challenge, Opportunity, Single Minded Idea, Proof Points, Mandatories, Timing, Measurement) **plus** the email-specific details that cause most last-minute rework:

- Sender name & reply-to, message type, and KPIs (Primary / Secondary / Diagnostic)
- Production path, assets (existing vs. net-new), and testing/QA flags
- **UTM tracking** — always included, with sensible defaults proposed if you shrug
- **Suppression / exclusion lists** — the "wait, we sent it to *who*?" safeguard
- **Legal & compliance** by recipient region (CAN-SPAM, CASL, GDPR, CCPA, …)
- **Localization** — locales, translation rounds, per-locale legal and goal rollup
- **Per-email mini-sections** for multi-email sequences, including exit conditions

It works for a single send or a multi-email sequence (welcome series, nurture, launch + reminders, abandonment, re-engagement, and more).

## What you get

- A finished brief in **Markdown** (default), **Word (.docx)**, or **HTML** — your choice, remembered for next time.
- Optional extras you can accept or skip:
  - **Recommendations pass** — 1–3 research-backed, brief-specific suggestions for how the campaign could land harder.
  - **Sample email** — a content-block table (header, hero, body, CTAs, footer) with directional draft copy tuned to your audience.

## Two variants

This repo ships **two** skills built from the same brief methodology:

- **`email-campaign-brief`** — the generic, tool-neutral skill. It never assumes which email-design or sending platform you use.
- **`email-campaign-brief-dyspatch`** — a variant for teams who design and produce email in **[Dyspatch.io](https://www.dyspatch.io)**. It assumes Dyspatch is your production path and, when the [Dyspatch MCP server](https://github.com/getdyspatch/dyspatch-mcp) or API is connected, pulls your account's real **modules/blocks** so the sample layout references blocks you can actually drop into Dyspatch.

Everything else — the interview, the brief structure, compliance/localization/UTM handling, recommendations — is identical. Pick the generic skill unless you build in Dyspatch.

## Installation

Each skill is a standard Agent Skill — a directory containing `SKILL.md`. Install whichever you want wherever your agent looks for skills.

**Claude Code** (skills live in `~/.claude/skills/`) — use a packaged release. Download the `.skill` file (a zip) for the variant you want, then unzip it into your skills directory:

```bash
# Generic
unzip email-campaign-brief-<version>.skill -d ~/.claude/skills/
# Dyspatch variant
unzip email-campaign-brief-dyspatch-<version>.skill -d ~/.claude/skills/
```

The unpacked folder is named after the skill (`email-campaign-brief` or `email-campaign-brief-dyspatch`); leave it as-is. Restart your agent if it caches the skill list.

To work from source instead, clone the repo and copy a skill's built folder (run `npm run build` first), or copy `skills/<name>/SKILL.md` together with the `shared/references` and `shared/assets` files into one directory.

**Dyspatch variant — connecting your account (optional but recommended).** Add the Dyspatch MCP server so the skill can read your modules:

```bash
claude mcp add dyspatch -e DYSPATCH_API_KEY=YOUR_KEY -- npx dyspatch-mcp
```

Without it, the Dyspatch skill still works — it just asks you to paste your module names or falls back to a generic block list.

## Usage

Once installed, you don't invoke anything special — just describe what you're doing and the skill triggers itself. For example:

- "Write a brief for my Black Friday email."
- "Help me scope a 3-email welcome series."
- "I need a creative brief for a product launch email."
- "Brief my team on this campaign."

Want to see the format before committing? Ask for a sample and the skill returns an annotated blank template instead of running the interview:

- "Show me what a brief looks like."
- "Give me the brief template."
- "What info do I need to gather for an email brief?"

### How the interview flows

1. **Picks up where you left off.** If you've briefed campaigns before, it reuses what it knows about your brand, ESP, compliance scope, owners, and output format instead of re-asking.
2. **Sets the mode.** Conversational or batched, single email or sequence, single-locale or multi-locale, and whether light web research is allowed.
3. **Gathers the brief**, pushing for specifics — a quantitative Goal with a timeframe, one persona, a Single Minded Idea of ≤8 words.
4. **Offers recommendations and a sample email** (both optional).
5. **Shows you the full draft inline** and iterates until you're happy — *then* produces the file.

## Repository layout

The skills are plain Markdown; only `SKILL.md` is always in context, with the rest pulled in on demand. Each skill owns its `SKILL.md`; the references and assets are single-sourced under `shared/` and composed into each skill's package at build time.

| Path | Purpose |
| --- | --- |
| `skills/email-campaign-brief/SKILL.md` | Generic skill — entry point and interview flow. |
| `skills/email-campaign-brief-dyspatch/SKILL.md` | Dyspatch variant — same flow, Dyspatch as the production path. |
| `skills/email-campaign-brief-dyspatch/references/dyspatch_integration.md` | Dyspatch concepts, MCP/API setup, and how the sample layout is grounded in real modules. |
| `shared/references/section_guide.md` | What a "good" answer looks like for each section, with examples. |
| `shared/references/email_specifics.md` | Detail on the email-only elements (production, localization, UTMs, compliance, …). |
| `shared/references/proven_patterns.md` | Curated library of techniques that have worked, with sources. |
| `shared/assets/brief_template.md` | The structural template the final brief is assembled from. |
| `shared/assets/sample_brief_template.md` | Annotated blank template returned when you ask for a sample. |

---

## Development

Tooling is plain Node (ESM) with **zero npm dependencies**, driven by `package.json`:

| Command | What it does |
| --- | --- |
Both skills are built from one source tree (the set is declared in the `SKILLS` array in `scripts/skill.mjs`), so every command operates on both.

| Command | What it does |
| --- | --- |
| `npm test` | Run the validation suite (`node --test`) for every skill. Enforces the [Agent Skills spec](https://agentskills.io/specification): `description` ≤ 1024 characters, `name` format/length, optional `compatibility` ≤ 500 characters, and that every referenced `references/`/`assets/` file exists (skill-local or shared). Also round-trips packaging. |
| `npm run validate` | The same checks as a readable ✓/✗ report, grouped per skill. |
| `npm run bump -- patch\|minor\|major\|<x.y.z>` | Bump the single shared version in `package.json` (the source of truth) and sync it into both `SKILL.md` frontmatters' `metadata.version`. |
| `npm run package` | Build one `dist/<name>-<version>.skill` per skill (a zip), composing the shared `references/`/`assets/` with each skill's own files. Validates first and refuses to package a failing skill. |
| `npm run build` | `npm test` then `npm run package`. |

Packaging requires the `zip` binary (`apt install zip` / `brew install zip`). Each packaged `.skill` ships only the composed `SKILL.md`, `references/`, and `assets/` — the tooling (`package.json`, `scripts/`, `tests/`, `dist/`) and the `docs/` marketing site are excluded.
