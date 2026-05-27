// Shared helpers for the email-campaign-brief skill tooling.
// Zero dependencies — pure Node ESM. Imported by validate/package/bump and the tests.
//
// This repo builds MORE THAN ONE skill from a single source tree: each skill in
// SKILLS owns a SKILL.md (and may own skill-local references/assets), while the
// bulk of the content is single-sourced under shared/ and composed into every
// package at build time. Skill-local files override/extend the shared ones.

import { readFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join, resolve } from 'node:path';

const here = dirname(fileURLToPath(import.meta.url));

/** Repo root (one level up from scripts/). */
export const ROOT = resolve(here, '..');

/**
 * The skills built from this repo. `name` is the skill's `name` (and the
 * directory name inside its .skill package); `dir` is its source folder.
 */
export const SKILLS = [
  { name: 'email-campaign-brief', dir: 'skills/email-campaign-brief' },
  { name: 'email-campaign-brief-dyspatch', dir: 'skills/email-campaign-brief-dyspatch' },
];

/** Single-sourced content shared by every skill (shared/references, shared/assets). */
export const SHARED_DIR = 'shared';
/** Directories composed into each package: shared first, then skill-local on top. */
export const PACKAGE_DIRS = ['references', 'assets'];

/** Look up a skill by name; throws if unknown. */
export function skillByName(name) {
  const skill = SKILLS.find((s) => s.name === name);
  if (!skill) throw new Error(`Unknown skill: ${name} (known: ${SKILLS.map((s) => s.name).join(', ')})`);
  return skill;
}

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

/** Absolute path to a skill's SKILL.md. */
export function skillPath(skill) {
  return join(ROOT, skill.dir, 'SKILL.md');
}

/** Read and parse a skill's SKILL.md. Returns { text, data, body }. */
export function readSkill(skill) {
  const text = readFileSync(skillPath(skill), 'utf8');
  const { data, body } = parseFrontmatter(text);
  return { text, data, body };
}

/** Relative paths (references/* and assets/*) referenced from the SKILL.md body. */
export function listReferencedFiles(body) {
  const matches = body.match(/(?:references|assets)\/[\w./-]+\.\w+/g) || [];
  return [...new Set(matches)];
}

/**
 * Resolve a referenced `references/…` or `assets/…` path for a skill the way
 * packaging composes it: skill-local first, then the shared pool. Returns the
 * absolute path it was found at, or null if it exists in neither place.
 */
export function resolveReferenced(skill, rel) {
  const local = join(ROOT, skill.dir, rel);
  if (existsSync(local)) return local;
  const shared = join(ROOT, SHARED_DIR, rel);
  if (existsSync(shared)) return shared;
  return null;
}

/**
 * Validate one skill against the Agent Skills spec (agentskills.io/specification).
 * Returns an array of { name, ok, message } — pure, no I/O beyond reading.
 */
export function validateSkill(skill) {
  const { data, body } = readSkill(skill);
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
  // name must match the directory it ships under.
  add('name matches skill folder', name === skill.name, `name "${name}" ≠ folder "${skill.name}"`);

  // description: 1–1024 chars (measured in code points, not bytes). The headline rule.
  const descLen = [...description].length;
  add('description present', description.trim().length > 0, description ? '' : 'description is missing');
  add('description ≤ 1024 chars', descLen <= 1024, `description is ${descLen} chars (limit 1024)`);

  // compatibility (optional): ≤ 500 chars if present.
  if (compatibility !== undefined) {
    const compLen = [...compatibility].length;
    add('compatibility ≤ 500 chars', compLen <= 500, `compatibility is ${compLen} chars`);
  }

  // Referenced files must exist — skill-local or in the shared pool.
  for (const rel of listReferencedFiles(body)) {
    add(`referenced file exists: ${rel}`, resolveReferenced(skill, rel) !== null, `missing ${rel}`);
  }

  // Recommended: keep SKILL.md body under 500 lines (guards future bloat).
  const lineCount = body.split(/\r?\n/).length;
  add('SKILL.md body ≤ 500 lines (recommended)', lineCount <= 500, `body is ${lineCount} lines`);

  return results;
}
