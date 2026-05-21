// Validates SKILL.md against the Agent Skills spec (agentskills.io/specification).
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { readSkill, validateSkill, listReferencedFiles, ROOT } from '../scripts/skill.mjs';

test('description is at most 1024 characters', () => {
  const { data } = readSkill();
  assert.ok(data.description, 'description field is missing');
  const len = [...data.description].length; // code points, not bytes (em/en-dashes are multi-byte)
  assert.ok(len <= 1024, `description is ${len} chars, exceeds the 1024 limit`);
});

test('description is non-empty', () => {
  const { data } = readSkill();
  assert.ok((data.description ?? '').trim().length > 0);
});

test('name is valid (≤64 chars, lowercase/hyphen format)', () => {
  const { data } = readSkill();
  const name = data.name ?? '';
  assert.ok([...name].length <= 64, 'name exceeds 64 chars');
  assert.match(name, /^[a-z0-9]+(-[a-z0-9]+)*$/);
});

test('compatibility is ≤500 chars when present', () => {
  const { data } = readSkill();
  if (data.compatibility === undefined) return; // optional field, nothing to check
  assert.ok([...data.compatibility].length <= 500);
});

test('all files referenced by SKILL.md exist', () => {
  const { body } = readSkill();
  for (const rel of listReferencedFiles(body)) {
    assert.ok(existsSync(join(ROOT, rel)), `missing referenced file: ${rel}`);
  }
});

test('validateSkill() reports every check passing', () => {
  const failed = validateSkill().filter((r) => !r.ok);
  assert.equal(failed.length, 0, `failing: ${failed.map((r) => r.name).join(', ')}`);
});
