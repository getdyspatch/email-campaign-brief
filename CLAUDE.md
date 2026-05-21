# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this repo is

This is a single **Claude skill** named `email-campaign-brief`, distributed as a directory of Markdown. The skill itself is prose and templates (`SKILL.md` + `references/` + `assets/`); there is no application code. A thin layer of Node tooling (`package.json` + `scripts/` + `tests/`) versions, validates, and packages the skill — see "Tooling" below. Do not spawn swarms or treat this as a general software project. (The parent `~/projects/CLAUDE.md` describing claude-flow swarm orchestration does **not** apply here.)

The skill runs inside a host environment (Cowork) that provides a persistent memory system. Several steps depend on that memory system existing — see "Memory dependence" below.

## File roles and progressive disclosure

The skill uses progressive disclosure — only `SKILL.md` is always in context; everything else is pulled in on demand by the model as the flow directs. Keep that in mind when deciding where content belongs (frequently-needed → SKILL.md; deep detail → references).

- `SKILL.md` — entry point and the 10-step interview flow (Step 0 through Step 10). Always loaded. The YAML frontmatter `description` is **load-bearing**: it controls when the skill auto-triggers. It is deliberately stuffed with trigger phrases and capability summary. Editing it changes triggering behavior — change it intentionally, not for tidiness.
- `references/section_guide.md` — for each brief section: the question to ask, what a "good" answer looks like, failure modes, and a concrete example. The skill reads this before pushing back on a vague user answer.
- `references/email_specifics.md` — rationale and detail for the email-only elements (production paths, localization, UTMs, suppression, legal regimes, exit conditions, per-email mini-sections).
- `assets/brief_template.md` — the structural template the final brief is assembled from. Read and filled in during Step 8.
- `assets/sample_brief_template.md` — the same structure annotated with "what goes here" instructions, returned **verbatim** when the user asks for a sample/blank/example (Step 0.5). It is user-facing output, not internal guidance.

## The one maintenance rule that matters most

The brief's section list and structure is duplicated across **four** files: the flow in `SKILL.md` (Steps 2–3), `assets/brief_template.md`, `assets/sample_brief_template.md`, and `references/section_guide.md`. If you add, remove, rename, or reorder a brief section, update **all four** so they stay in sync. A section that exists in the template but isn't gathered in the flow (or vice versa) is the most likely way to break this skill.

## Design invariants — do not edit these away casually

These are deliberate product decisions baked throughout the files. Preserve them unless explicitly asked to change the product:

- **Brevity is the point.** The core brief targets ≤1.5 pages; a long brief signals unclear strategy. Don't add sections that pad.
- **Single Minded Idea** = 8 words or fewer, no `and`/`or`/`but`, and is distinct from the Goal (SMI = the message; Goal = the measurable outcome). Multiple files reinforce this separation.
- **Goal must be quantitative** (a number + a timeframe). The flow pushes back on fuzzy goals.
- **The UTM section always appears in the final brief**, even if the user shrugs — propose defaults and confirm, never omit.
- **Recommendations phase (Step 6) is a strict two-turn gate**: generate → stop → wait for per-rec yes/no/modify → then draft. Never draft the brief in the same turn as the recommendations. Max 3 recommendations.
- **Budget section only exists if external production is involved** (agency, freelancer, designer+dev, paid media). Otherwise omit it entirely.
- **Tool neutrality**: never volunteer a specific ESP/production tool (Mailchimp, Stensul, Knak, etc.) when asking about production path. Only research/compare tools if the user asks.
- **Inline draft review before file output** (Step 8): always show the full draft and iterate before producing any file.

## Memory dependence (host environment)

- **Step 0** reads `MEMORY.md` and per-fact memory files to pre-fill brand/ESP/compliance/owners/format/etc. so the user is never re-asked what they answered in a previous brief.
- **Step 10** writes back only facts likely true on the *next* brief (brand context, ESP, production path, compliance scope, suppression rules, owners, localization defaults, output-format preference, and per-type defaults in files like `email-type-newsletter.md`). It explicitly does **not** save this campaign's ephemeral content (Goal, audience, SMI, mandatories) or session-scoped file paths.
- Memory format follows the host: a self-contained `.md` per fact with `name`/`description`/`type` frontmatter, plus a one-line pointer in `MEMORY.md`.

## Tooling

Zero npm dependencies — plain Node ESM scripts driven by `package.json`:

- `npm test` — runs the validation suite (`node --test tests/`). Enforces the Agent Skills spec (agentskills.io/specification): **`description` ≤ 1024 chars** (measured in code points, not bytes), `name` format/length, optional `compatibility` ≤ 500 chars, and that every `references/`/`assets/` file referenced by `SKILL.md` exists.
- `npm run validate` — same checks as a human-readable ✓/✗ report.
- `npm run bump -- patch|minor|major|<x.y.z>` — bumps the version in `package.json` (the source of truth) and syncs it into `SKILL.md` frontmatter `metadata.version`.
- `npm run package` — builds `dist/email-campaign-brief-<version>.skill` (a zip). **Requires the `zip` binary** (`apt install zip` / `brew install zip`); it validates first and refuses to package a failing skill.
- `npm run build` — `npm test` then `npm run package`.

`package.json`, `scripts/`, `tests/`, and `dist/` are dev tooling and are **excluded from the packaged `.skill`** (the allowlist in `scripts/skill.mjs` ships only `SKILL.md`, `references/`, and `assets/`, placed under an `email-campaign-brief/` folder so the package's top-level dir matches `name`). Don't list this tooling in the "Files in this skill" section of `SKILL.md`.

## Validating a change

Run `npm test` (and `npm run build` if you touched packaging). Beyond the automated checks, re-read `SKILL.md` end-to-end and confirm (a) the frontmatter description still covers the intended trigger phrases, (b) any section you touched is consistent across the four files listed above, and (c) the step you changed still references the correct `references/`/`assets/` file by path.
