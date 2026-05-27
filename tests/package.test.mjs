// Round-trips the packaging: build the .skill files, then inspect them with `unzip -l`.
// Skips when `zip`/`unzip` are unavailable so the rest of the suite still runs.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { ROOT, SKILLS } from '../scripts/skill.mjs';

function has(cmd) {
  try {
    execFileSync('sh', ['-c', `command -v ${cmd}`], { stdio: 'ignore' });
    return true;
  } catch {
    return false;
  }
}

const skip = !has('zip') || !has('unzip') ? 'requires zip and unzip' : false;

test('packaging produces a composed .skill per skill', { skip }, () => {
  execFileSync('node', [join(ROOT, 'scripts/package.mjs')], { cwd: ROOT, stdio: 'ignore' });

  const { version } = JSON.parse(readFileSync(join(ROOT, 'package.json'), 'utf8'));
  const listings = {};
  for (const skill of SKILLS) {
    const out = join(ROOT, 'dist', `${skill.name}-${version}.skill`);
    listings[skill.name] = execFileSync('unzip', ['-l', out], { encoding: 'utf8' });
  }

  for (const skill of SKILLS) {
    const listing = listings[skill.name];
    // Content ships under the <name>/ folder, with composed references/ and assets/...
    assert.match(listing, new RegExp(`${skill.name}/SKILL\\.md`));
    assert.match(listing, new RegExp(`${skill.name}/references/`));
    assert.match(listing, new RegExp(`${skill.name}/assets/`));
    // ...and dev tooling does not.
    assert.doesNotMatch(listing, /package\.json/);
    assert.doesNotMatch(listing, /\bscripts\//);
    assert.doesNotMatch(listing, /\btests\//);
  }

  // Shared content lands in every skill's package.
  for (const skill of SKILLS) {
    assert.match(listings[skill.name], /references\/section_guide\.md/, `${skill.name} missing shared reference`);
    assert.match(listings[skill.name], /assets\/brief_template\.md/, `${skill.name} missing shared asset`);
  }

  // The Dyspatch-only reference ships only with the Dyspatch skill.
  assert.match(listings['email-campaign-brief-dyspatch'], /references\/dyspatch_integration\.md/);
  assert.doesNotMatch(listings['email-campaign-brief'], /dyspatch_integration\.md/);
});
