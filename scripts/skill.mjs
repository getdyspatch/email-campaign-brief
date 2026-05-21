// Shared helpers for the email-campaign-brief skill tooling.
// Zero dependencies — pure Node ESM. Imported by validate/package/bump and the tests.

import { readFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join, resolve } from 'node:path';

const here = dirname(fileURLToPath(import.meta.url));

/** Repo root (one level up from scripts/). */
export const ROOT = resolve(here, '..');
/** The skill's `name` — also the directory name used inside the .skill package. */
export const SKILL_NAME = 'email-campaign-brief';
/** Path to the skill's SKILL.md. */
export const SKILL_PATH = join(ROOT, 'SKILL.md');
/** Allowlist of paths that ship inside the .skill package. Everything else (tooling) is excluded. */
export const PACKAGE_FILES = ['SKILL.md', 'references', 'assets'];

function unquote(s) {
  s = s.trim();
  if ((s.startsWith('"') && s.endsWith('"')) || (s.startsWith("'") && s.endsWith("'"))) {
    return s.slice(1, -1);
  }
  return s;
}

/**
 * Minimal YAML frontmatter parser for the flat structure this skill uses
 * (top-level `key: value` lines plus a single nested `metadata:` mapping).
 * Not a general YAML parser — intentionally dependency-free.
 */
export function parseFrontmatter(text) {
  const m = text.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);
  if (!m) return { data: {}, body: text };
  const lines = m[1].split(/\r?\n/);
  const body = text.slice(m[0].length);
  const data = {};
  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    if (!line.trim() || line.startsWith(' ')) { i++; continue; }
    const top = line.match(/^([A-Za-z0-9_-]+):\s?(.*)$/);
    if (!top) { i++; continue; }
    const [, key, val] = top;
    if (val === '') {
      // Nested mapping (e.g. `metadata:` followed by indented `  version: ...`).
      const nested = {};
      i++;
      while (i < lines.length && /^\s+\S/.test(lines[i])) {
        const sub = lines[i].match(/^\s+([A-Za-z0-9_-]+):\s?(.*)$/);
        if (sub) nested[sub[1]] = unquote(sub[2]);
        i++;
      }
      data[key] = nested;
    } else {
      data[key] = unquote(val);
      i++;
    }
  }
  return { data, body };
}

/** Read and parse SKILL.md. Returns { text, data, body }. */
export function readSkill() {
  const text = readFileSync(SKILL_PATH, 'utf8');
  const { data, body } = parseFrontmatter(text);
  return { text, data, body };
}

/** Relative paths (references/* and assets/*) referenced from the SKILL.md body. */
export function listReferencedFiles(body) {
  const matches = body.match(/(?:references|assets)\/[\w./-]+\.\w+/g) || [];
  return [...new Set(matches)];
}

/**
 * Validate the skill against the Agent Skills spec (agentskills.io/specification).
 * Returns an array of { name, ok, message } — pure, no I/O side effects beyond reading.
 */
export function validateSkill() {
  const { data, body } = readSkill();
  const results = [];
  const add = (name, ok, message = '') => results.push({ name, ok, message });

  const name = data.name ?? '';
  const description = data.description ?? '';
  const { compatibility } = data;

  // name: 1–64 chars, lowercase a-z/0-9 with single hyphens, no leading/trailing/consecutive hyphens.
  add('name present', name.length > 0, name ? '' : 'name is missing');
  add('name ≤ 64 chars', [...name].length <= 64, `name is ${[...name].length} chars`);
  add(
    'name format (lowercase/hyphens)',
    /^[a-z0-9]+(-[a-z0-9]+)*$/.test(name),
    'must be lowercase a-z/0-9 with single hyphens, no leading/trailing/consecutive hyphens',
  );

  // description: 1–1024 chars (measured in code points, not bytes). The headline rule.
  const descLen = [...description].length;
  add('description present', description.trim().length > 0, description ? '' : 'description is missing');
  add('description ≤ 1024 chars', descLen <= 1024, `description is ${descLen} chars (limit 1024)`);

  // compatibility (optional): ≤ 500 chars if present.
  if (compatibility !== undefined) {
    const compLen = [...compatibility].length;
    add('compatibility ≤ 500 chars', compLen <= 500, `compatibility is ${compLen} chars`);
  }

  // Referenced files must exist on disk.
  for (const rel of listReferencedFiles(body)) {
    add(`referenced file exists: ${rel}`, existsSync(join(ROOT, rel)), `missing ${rel}`);
  }

  // Recommended: keep SKILL.md body under 500 lines (guards future bloat).
  const lineCount = body.split(/\r?\n/).length;
  add('SKILL.md body ≤ 500 lines (recommended)', lineCount <= 500, `body is ${lineCount} lines`);

  return results;
}
