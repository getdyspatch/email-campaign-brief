# Dyspatch integration

This reference explains how the Dyspatch variant of the skill grounds a brief in a real Dyspatch
account. It covers the concepts you need, how to connect to Dyspatch (MCP server or REST API), the
exact procedure for the sample layout in Step 7, and what to do when there's no access.

The whole point: when the team's Dyspatch account is reachable, the **sample layout (Step 7)** should
reference **modules the team can actually drop into Dyspatch** — by name and id — instead of generic
"hero / body / CTA" placeholders. Recommendations (Step 6) should likewise prefer reusing or
extending modules that already exist in the account.

## Dyspatch concepts (and how they map to a brief)

Dyspatch is a modular email design/production platform. Its model, top to bottom:

- **Themes** — control styling (fonts, colors, spacing) **and which modules/blocks are available** in
  the editor. A module must belong to a theme to be usable. There is **no API/MCP tool that lists
  themes**, so if the theme matters, ask the user which one this campaign uses.
- **Blocks (a.k.a. "modules")** — the reusable, pre-built content components teams stack to build an
  email: hero, article row, product grid, CTA button, footer, etc. "Module" (marketing term) and
  "block" (API term) mean the same thing. Block ids look like `blo_xxxx`. **These are what you map
  the sample layout's rows to.**
- **Templates** — complete, publishable emails assembled from blocks. Template ids look like
  `tem_xxxx`. Useful as references ("the team's existing newsletter template") and as a source of the
  block ordering they normally use.
- **Localizations** — per-language variants of a block or template. Relevant when the brief is
  multi-locale: you can confirm which locales an existing module already supports.
- **DML (Dyspatch Markup Language)** — the templating language for dynamic/conditional content inside
  blocks. Mention it in recommendations (e.g., "one template with a DML conditional" instead of two
  separate builds), but you don't need to read or write DML to produce a brief.
- **ESP vs. Dyspatch** — Dyspatch *designs and produces* the email; an **ESP** (HubSpot, Iterable,
  Klaviyo, Marketo, …) *sends* it. They are separate. `utm_source` is the ESP, not Dyspatch.

## Connecting to Dyspatch

Two ways to reach an account. The MCP server is preferred (it's tool-native); the REST API is the
fallback if the user can run requests but hasn't installed the server.

### Option A — Dyspatch MCP server (preferred)

Official server, npm package **`dyspatch-mcp`**. Add it to Claude Code with the user's API key:

```bash
claude mcp add dyspatch -e DYSPATCH_API_KEY=YOUR_KEY -- npx dyspatch-mcp
```

Or in an MCP client config:

```json
{
  "mcpServers": {
    "dyspatch": {
      "command": "npx",
      "args": ["dyspatch-mcp"],
      "env": { "DYSPATCH_API_KEY": "YOUR_KEY" }
    }
  }
}
```

Once connected, the read tools this skill uses (all paginate via an optional `cursor`):

| Tool | Use it for |
| --- | --- |
| `list_blocks` | **The key call** — enumerate the account's modules/blocks to ground the sample layout. |
| `get_block` | Fetch one block (`blockId`, e.g. `blo_xxxx`) for detail on a candidate module. |
| `list_templates` | List existing templates (`type: "email"`) to see the team's usual block ordering. |
| `get_template` / `render_template` | Inspect or render a template. Rendered content is base64 — use `render_template` to get readable HTML. |
| `list_workspaces` / `get_folder` | Find the right workspace/folder when the account has several. |
| `list_tags` | Resolve module/template organization if the user references a tag. |

The server also exposes draft/localization/tag **write** tools (submit, approve, upsert, delete,
etc.). This skill is read-only — it produces a brief, it does not modify the Dyspatch account. Do not
call write tools.

### Option B — REST API

Same data over HTTP if the MCP server isn't installed. Base `https://api.dyspatch.io`, Bearer auth:
`Authorization: Bearer YOUR_KEY`. Relevant read endpoints: `GET /blocks`, `GET /blocks/{id}`,
`GET /templates`, `GET /templates/{id}`, `GET /workspaces`, `GET /tags`. Docs:
https://docs.dyspatch.io/api/. Only use this if the user can actually issue the requests in the
session (e.g., via an allowed `curl`); otherwise treat it as "no access" and use the fallback.

## Step 7 procedure — grounding the sample layout

1. **Confirm access.** Is the `dyspatch` MCP server connected (its tools available), or can the user
   run API calls? If neither, go to "Fallback" below.
2. **Scope it.** Use the workspace/theme captured in Step 3 (or recovered from memory in Step 0). If
   the account has multiple workspaces and none is known, call `list_workspaces` and ask which one.
3. **List modules.** Call `list_blocks` (page with `cursor` if needed). Optionally call
   `list_templates` with `type: "email"` to see how the team usually orders blocks for this email
   type.
4. **Map rows to modules.** For each layout row (Preheader, Header, Hero, Body sections, CTAs,
   Footer), pick the best-matching real module and record its **name** and **block id** in the
   `Dyspatch module (id)` column. Tune the row set to the email type.
5. **Flag gaps.** If a row has no matching module, mark it **net-new** (e.g., `— net-new module —`).
   Net-new modules feed the **Assets** (part 2) and **Budget** sections — a new block is design + dev
   work.
6. **Draft copy** per the Step 7 rules in SKILL.md (honor audience, SMI, user-provided content).

## Fallback — no Dyspatch access

If neither the MCP server nor a usable API path is available, do **one** of these and say which:

- **Ask the user** to paste the names of the modules/blocks available in their theme, then map rows to
  those names (you won't have block ids — that's fine, use names only).
- **Use generic block names** (hero, body, CTA, footer) and clearly note the layout isn't grounded in
  their actual account, with a one-line "connect the Dyspatch MCP server to map these to real
  modules" tip and the `claude mcp add` command above.

**Never invent module names or block ids.** A fabricated `blo_…` id is worse than an honest generic
placeholder — the team will try to find it and can't.

## Limitations to keep in mind

- **No theme-listing tool.** You can list blocks, templates, workspaces, and tags, but not themes —
  ask the user which theme if it matters.
- **Rendered content is base64.** Use `render_template` (not `get_template`) when you need readable
  HTML/text.
- **Pagination.** List tools return a `cursor`; page through it if the account has many modules.
- **Read-only for briefs.** This skill never creates or edits drafts/blocks. The server *can* (it has
  no `create_draft`, but it has submit/approve/upsert/delete) — don't use those here.
- **Keys are secrets.** Never print, log, or save the `DYSPATCH_API_KEY`. In Step 10, persist only the
  *fact* that access is configured plus the default workspace/theme.
