// CLI: validate every skill's SKILL.md against the Agent Skills spec.
// Exits non-zero if any check on any skill fails. Usage: npm run validate

import { SKILLS, validateSkill } from './skill.mjs';

let failed = 0;
let total = 0;

for (const skill of SKILLS) {
  console.log(`# ${skill.name}`);
  const results = validateSkill(skill);
  for (const r of results) {
    let line = `  ${r.ok ? '✓' : '✗'} ${r.name}`;
    if (!r.ok && r.message) line += ` — ${r.message}`;
    console.log(line);
    total++;
    if (!r.ok) failed++;
  }
  console.log('');
}

if (failed) {
  console.error(`${failed} of ${total} check(s) failed across ${SKILLS.length} skill(s).`);
  process.exit(1);
}
console.log(`All ${total} checks passed across ${SKILLS.length} skill(s).`);
