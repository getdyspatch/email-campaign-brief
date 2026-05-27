# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this repo is

This repo builds **two Claude skills** from one source tree, both prose + templates (no application code):

- **`email-campaign-brief`** (`skills/email-campaign-brief/`) — the generic, tool-neutral skill.
- **`email-campaign-brief-dyspatch`** (`skills/email-campaign-brief-dyspatch/`) — a variant for teams who produce email in Dyspatch.io. It assumes Dyspatch is the production path and can ground its sample layout in the account's real modules via the Dyspatch MCP server / API.

Each skill owns its own `SKILL.md` (and the Dyspatch one also owns `references/dyspatch_integration.md`). The bulk of the content — `references/` and `assets/` — is **single-sourced under `shared/`** and composed into each skill's package at build time (skill-local files overlay the shared ones; inside a built `.skill` everything resolves under `references/`/`assets/`). A thin layer of Node tooling (`package.json` + `scripts/` + `tests/`) versions, validates, and packages both skills — see "Tooling" below. Do not spawn swarms or treat this as a general software project. (The parent `~/projects/CLAUDE.md` describing claude-flow swarm orchestration does **not** apply here.)

The skill runs inside a host environment (Cowork) that provides a persistent memory system. Several steps depend on that memory system existing — see "Memory dependence" below.

## File roles and progressive disclosure

The skill uses progressive disclosure — only `SKILL.md` is always in context; everything else is pulled in on demand by the model as the flow directs. Keep that in mind when deciding where content belongs (frequently-needed → SKILL.md; deep detail → references). Paths below are repo-source paths; inside a built `.skill` the `shared/` prefix is gone and `SKILL.md` refers to everything as `references/…` / `assets/…`.

- `skills/<name>/SKILL.md` — entry point and the 10-step interview flow (Step 0 through Step 10). Always loaded. **There are two** (`email-campaign-brief` and `email-campaign-brief-dyspatch`); they are near-duplicates that must stay in sync — see the maintenance rule below. The YAML frontmatter `description` is **load-bearing**: it controls when the skill auto-triggers (and which of the two triggers — the Dyspatch one is keyed on Dyspatch phrases). It is deliberately stuffed with trigger phrases and a capability summary. Editing it changes triggering behavior — change it intentionally, not for tidiness.
- `shared/references/section_guide.md` — for each brief section: the question to ask, what a "good" answer looks like, failure modes, and a concrete example. The skill reads this before pushing back on a vague user answer. Shared by both skills.
- `shared/references/email_specifics.md` — rationale and detail for the email-only elements (production paths, localization, UTMs, suppression, legal regimes, exit conditions, per-email mini-sections). Shared; **stays tool-neutral** (no Dyspatch specifics — those live in `dyspatch_integration.md`).
- `shared/references/proven_patterns.md` — curated, community-updatable library of techniques that have worked for specific email types / verticals, each with evidence and a source/contributor. Consulted during research (Step 5) and recommendations (Step 6); **not** part of the brief structure. Has a documented contribution format so it grows over time. Measurable claims require a real source — unsourced ones are marked `[needs source]` and stated qualitatively. Shared.
- `shared/assets/brief_template.md` — the structural template the final brief is assembled from. Read and filled in during Step 8. Shared.
- `shared/assets/sample_brief_template.md` — the same structure annotated with "what goes here" instructions, returned **verbatim** when the user asks for a sample/blank/example (Step 0.5). It is user-facing output, not internal guidance. Shared.
- `skills/email-campaign-brief-dyspatch/references/dyspatch_integration.md` — **Dyspatch-only.** Dyspatch concepts (themes / modules-blocks / templates / localizations), how to connect the Dyspatch MCP server (`dyspatch-mcp`) or REST API, the read tools used (`list_blocks`, `list_templates`, …), the Step 7 procedure for grounding the sample layout in real modules, and the fallback when there's no access. Not shared.

## The maintenance rules that matter most

**1. The section list is duplicated across FIVE files.** The brief's section list and structure lives in: the flow in **both** `skills/email-campaign-brief/SKILL.md` and `skills/email-campaign-brief-dyspatch/SKILL.md` (Steps 2–3), plus `shared/assets/brief_template.md`, `shared/assets/sample_brief_template.md`, and `shared/references/section_guide.md`. If you add, remove, rename, or reorder a brief section, update **all five** so they stay in sync. A section that exists in the template but isn't gathered in the flow (or vice versa) is the most likely way to break a skill.

**2. The two `SKILL.md` files are near-duplicates — keep them in sync.** The Dyspatch `SKILL.md` is the generic flow with a bounded set of intentional deltas: the frontmatter (`name` + Dyspatch trigger `description`), the intro paragraph, Step 0 (Dyspatch memory recall), Step 3 (Dyspatch *is* the production path), Steps 5–6 (Dyspatch capabilities), Step 7 (ground the sample layout in real modules via `dyspatch_integration.md`), Step 10 (save Dyspatch defaults), the tool-neutrality bullet under "Things to avoid", and the "Files in this skill" list. **Any change to shared flow behavior (Steps 1, 2, 4, 8, 9, the mindset, the other avoid-bullets) must be made in both files.** When in doubt, diff the two and confirm every difference is one of the documented deltas.

## Design invariants — do not edit these away casually

These are deliberate product decisions baked throughout the files. Preserve them unless explicitly asked to change the product:

- **Brevity is the point.** The core brief targets ≤1.5 pages; a long brief signals unclear strategy. Don't add sections that pad.
- **Single Minded Idea** = 8 words or fewer, no `and`/`or`/`but`, and is distinct from the Goal (SMI = the message; Goal = the measurable outcome). Multiple files reinforce this separation.
- **Goal must be quantitative** (a number + a timeframe). The flow pushes back on fuzzy goals.
- **The UTM section always appears in the final brief**, even if the user shrugs — propose defaults and confirm, never omit.
- **Recommendations phase (Step 6) is a strict two-turn gate**: generate → stop → wait for per-rec yes/no/modify → then draft. Never draft the brief in the same turn as the recommendations. Max 3 recommendations. The final brief's **Recommendations** section tracks *every* suggestion with a status marker (`✓` accepted / `~` modified / `✗` rejected + reason) — a full audit trail, not accepted-only. (Recommendations is a rename of the former "Recommendations Applied"; it's the same section, so the four-file sync still holds.)
- **Budget section only exists if external production is involved** (agency, freelancer, designer+dev, paid media). Otherwise omit it entirely.
- **Tool neutrality** (generic skill): never volunteer a specific ESP/production tool (Mailchimp, Stensul, Knak, etc.) when asking about production path. Only research/compare tools if the user asks. **The Dyspatch variant intentionally relaxes this for Dyspatch only** — Dyspatch is the assumed production tool there, so naming it is expected; it still stays neutral about *other* tools (ESPs, etc.). Don't "fix" the Dyspatch SKILL.md to be tool-neutral about Dyspatch.
- **Inline draft review before file output** (Step 8): always show the full draft and iterate before producing any file.

## Memory dependence (host environment)

- **Step 0** reads `MEMORY.md` and per-fact memory files to pre-fill brand/ESP/compliance/owners/format/etc. so the user is never re-asked what they answered in a previous brief.
- **Step 10** writes back only facts likely true on the *next* brief (brand context, ESP, production path, compliance scope, suppression rules, owners, localization defaults, output-format preference, and per-type defaults in files like `email-type-newsletter.md`). The Dyspatch variant additionally saves a `dyspatch-setup.md` (that access is configured, default workspace/theme, frequently-used modules) — **never the API key/secret**. It explicitly does **not** save this campaign's ephemeral content (Goal, audience, SMI, mandatories) or session-scoped file paths.
- Memory format follows the host: a self-contained `.md` per fact with `name`/`description`/`type` frontmatter, plus a one-line pointer in `MEMORY.md`.

## Tooling

Zero npm dependencies — plain Node ESM scripts driven by `package.json`:

The set of skills built from this repo is declared once, in the `SKILLS` array in `scripts/skill.mjs` (each entry is `{ name, dir }`). Every script and test loops over it, so the commands below operate on **both** skills:

- `npm test` — runs the validation suite (`node --test tests/`) for every skill. Enforces the Agent Skills spec (agentskills.io/specification): **`description` ≤ 1024 chars** (measured in code points, not bytes), `name` format/length (and that `name` matches the skill's folder), optional `compatibility` ≤ 500 chars, and that every `references/`/`assets/` file referenced by a `SKILL.md` exists — resolved skill-local first, then in `shared/` (`resolveReferenced` in `skill.mjs`). Also round-trips packaging: builds each `.skill` and asserts the composed layout (shared files present in both; `dyspatch_integration.md` only in the Dyspatch package; tooling excluded).
- `npm run validate` — same checks as a human-readable ✓/✗ report, grouped per skill.
- `npm run bump -- patch|minor|major|<x.y.z>` — bumps the **single shared version** in `package.json` (the source of truth) and syncs it into **both** `SKILL.md` frontmatters' `metadata.version`. The two skills always release in lockstep.
- `npm run package` — builds one `dist/<name>-<version>.skill` per skill (a zip). Each package **composes** `shared/references` + `shared/assets` with the skill's own `SKILL.md` and any skill-local `references/`/`assets/` (skill-local overlaid on top). **Requires the `zip` binary** (`apt install zip` / `brew install zip`); it validates every skill first and refuses to package if any fails.
- `npm run build` — `npm test` then `npm run package`.

`package.json`, `scripts/`, `tests/`, `dist/`, and the `docs/` marketing site are dev tooling and are **excluded from the packaged `.skill`** (packaging ships only the composed `SKILL.md`, `references/`, and `assets/`, placed under a `<name>/` folder so each package's top-level dir matches its `name`). Don't list this tooling in the "Files in this skill" section of either `SKILL.md`.

The release workflow (`.github/workflows/release.yml`) attaches each versioned `.skill` to a GitHub release plus a stable versionless copy per skill (`email-campaign-brief.skill`, `email-campaign-brief-dyspatch.skill`) for the marketing site to link. The Hugo site under `docs/` currently markets only the generic skill; surfacing the Dyspatch variant there is open follow-up.

## Validating a change

Run `npm test` (and `npm run build` if you touched packaging). Beyond the automated checks, re-read the `SKILL.md` you changed end-to-end and confirm (a) the frontmatter description still covers the intended trigger phrases, (b) any section you touched is consistent across the five files listed above, (c) the step you changed still references the correct `references/`/`assets/` file by path, and (d) if you touched shared flow behavior, you made the matching change in **both** `SKILL.md` files (diff them and confirm every remaining difference is one of the documented Dyspatch deltas).
