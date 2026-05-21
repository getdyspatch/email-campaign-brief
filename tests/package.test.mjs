// Round-trips the packaging: build the .skill, then inspect it with `unzip -l`.
// Skips when `zip`/`unzip` are unavailable so the rest of the suite still runs.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { ROOT, SKILL_NAME } from '../scripts/skill.mjs';

function has(cmd) {
  try {
    execFileSync('sh', ['-c', `command -v ${cmd}`], { stdio: 'ignore' });
    return true;
  } catch {
    return false;
  }
}

const skip = !has('zip') || !has('unzip') ? 'requires zip and unzip' : false;

test('packaging produces a .skill with the expected layout', { skip }, () => {
  execFileSync('node', [join(ROOT, 'scripts/package.mjs')], { cwd: ROOT, stdio: 'ignore' });

  const { version } = JSON.parse(readFileSync(join(ROOT, 'package.json'), 'utf8'));
  const out = join(ROOT, 'dist', `${SKILL_NAME}-${version}.skill`);
  const listing = execFileSync('unzip', ['-l', out], { encoding: 'utf8' });

  // Content ships under the <name>/ folder...
  assert.match(listing, new RegExp(`${SKILL_NAME}/SKILL\\.md`));
  assert.match(listing, new RegExp(`${SKILL_NAME}/references/`));
  assert.match(listing, new RegExp(`${SKILL_NAME}/assets/`));

  // ...and dev tooling does not.
  assert.doesNotMatch(listing, /package\.json/);
  assert.doesNotMatch(listing, /\bscripts\//);
  assert.doesNotMatch(listing, /\btests\//);
});
