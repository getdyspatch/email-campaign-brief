# Email Campaign Brief

A [Claude Agent Skill](https://agentskills.io) that walks a marketer through producing a tight, opinionated **email campaign brief** in a guided interview — then hands back a clean Markdown, Word, or HTML document.

The brief is deliberately short (1.5 pages or less). A long brief is usually a tell that the strategy isn't clear yet, so the skill pushes back on vague goals, fuzzy audiences, and multi-idea messaging until each section actually lands.

> 📄 **Preview the output** — [`assets/brief_template.md`](assets/brief_template.md) shows the full structure of a generated brief, section by section.

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

## Installation

This is a standard Agent Skill — a directory containing `SKILL.md`. Install it wherever your agent looks for skills.

**Claude Code** (skills live in `~/.claude/skills/`):

```bash
git clone https://github.com/<your-org>/campaign-brief-skill.git
cp -r campaign-brief-skill ~/.claude/skills/email-campaign-brief
```

Or use a packaged release: download the `email-campaign-brief-<version>.skill` file (a zip), then unzip it into your skills directory:

```bash
unzip email-campaign-brief-<version>.skill -d ~/.claude/skills/
```

The unpacked folder must be named `email-campaign-brief` (matching the skill name). Restart your agent if it caches the skill list.

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

The skill is plain Markdown; only `SKILL.md` is always in context, with the rest pulled in on demand.

| Path | Purpose |
| --- | --- |
| `SKILL.md` | Entry point and the step-by-step interview flow. |
| `references/section_guide.md` | What a "good" answer looks like for each section, with examples. |
| `references/email_specifics.md` | Detail on the email-only elements (production, localization, UTMs, compliance, …). |
| `assets/brief_template.md` | The structural template the final brief is assembled from. |
| `assets/sample_brief_template.md` | Annotated blank template returned when you ask for a sample. |

---

## Development

Tooling is plain Node (ESM) with **zero npm dependencies**, driven by `package.json`:

| Command | What it does |
| --- | --- |
| `npm test` | Run the validation suite (`node --test`). Enforces the [Agent Skills spec](https://agentskills.io/specification): `description` ≤ 1024 characters, `name` format/length, optional `compatibility` ≤ 500 characters, and that every referenced `references/`/`assets/` file exists. |
| `npm run validate` | The same checks as a readable ✓/✗ report. |
| `npm run bump -- patch\|minor\|major\|<x.y.z>` | Bump the version in `package.json` (the source of truth) and sync it into `SKILL.md` frontmatter `metadata.version`. |
| `npm run package` | Build `dist/email-campaign-brief-<version>.skill` (a zip). Validates first and refuses to package a failing skill. |
| `npm run build` | `npm test` then `npm run package`. |

Packaging requires the `zip` binary (`apt install zip` / `brew install zip`). The packaged `.skill` ships only `SKILL.md`, `references/`, and `assets/` — the tooling (`package.json`, `scripts/`, `tests/`, `dist/`) is excluded.
