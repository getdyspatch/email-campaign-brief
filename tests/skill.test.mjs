// Validates every skill's SKILL.md against the Agent Skills spec (agentskills.io/specification).
import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  readSkill, validateSkill, listReferencedFiles, resolveReferenced, SKILLS,
} from '../scripts/skill.mjs';

for (const skill of SKILLS) {
  test(`[${skill.name}] description is at most 1024 characters`, () => {
    const { data } = readSkill(skill);
    assert.ok(data.description, 'description field is missing');
    const len = [...data.description].length; // code points, not bytes (em/en-dashes are multi-byte)
    assert.ok(len <= 1024, `description is ${len} chars, exceeds the 1024 limit`);
  });

  test(`[${skill.name}] description is non-empty`, () => {
    const { data } = readSkill(skill);
    assert.ok((data.description ?? '').trim().length > 0);
  });

  test(`[${skill.name}] name is valid and matches its folder`, () => {
    const { data } = readSkill(skill);
    const name = data.name ?? '';
    assert.ok([...name].length <= 64, 'name exceeds 64 chars');
    assert.match(name, /^[a-z0-9]+(-[a-z0-9]+)*$/);
    assert.equal(name, skill.name, 'name must match the skill folder');
  });

  test(`[${skill.name}] compatibility is ≤500 chars when present`, () => {
    const { data } = readSkill(skill);
    if (data.compatibility === undefined) return; // optional field, nothing to check
    assert.ok([...data.compatibility].length <= 500);
  });

  test(`[${skill.name}] all referenced files resolve (skill-local or shared)`, () => {
    const { body } = readSkill(skill);
    for (const rel of listReferencedFiles(body)) {
      assert.ok(resolveReferenced(skill, rel), `missing referenced file: ${rel}`);
    }
  });

  test(`[${skill.name}] validateSkill() reports every check passing`, () => {
    const failed = validateSkill(skill).filter((r) => !r.ok);
    assert.equal(failed.length, 0, `failing: ${failed.map((r) => r.name).join(', ')}`);
  });
}
