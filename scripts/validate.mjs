// CLI: validate SKILL.md against the Agent Skills spec. Exits non-zero if any check fails.
// Usage: npm run validate

import { validateSkill } from './skill.mjs';

const results = validateSkill();
let failed = 0;
for (const r of results) {
  let line = `${r.ok ? '✓' : '✗'} ${r.name}`;
  if (!r.ok && r.message) line += ` — ${r.message}`;
  console.log(line);
  if (!r.ok) failed++;
}
console.log('');
if (failed) {
  console.error(`${failed} of ${results.length} check(s) failed.`);
  process.exit(1);
}
console.log(`All ${results.length} checks passed.`);
