// CLI: bump the skill version in package.json and sync it into SKILL.md frontmatter.
// Usage: npm run bump -- patch | minor | major | <x.y.z>

import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { ROOT, SKILL_PATH } from './skill.mjs';

const spec = process.argv[2];
if (!spec) {
  console.error('Usage: npm run bump -- patch|minor|major|<x.y.z>');
  process.exit(1);
}

function computeNext(current, kind) {
  if (/^\d+\.\d+\.\d+$/.test(kind)) return kind;
  const [maj, min, pat] = current.split('.').map(Number);
  if (kind === 'major') return `${maj + 1}.0.0`;
  if (kind === 'minor') return `${maj}.${min + 1}.0`;
  if (kind === 'patch') return `${maj}.${min}.${pat + 1}`;
  console.error(`Invalid bump spec: ${kind} (use patch|minor|major|x.y.z)`);
  process.exit(1);
}

/** Set metadata.version in SKILL.md frontmatter, adding the block if absent. */
function setSkillVersion(text, version) {
  const m = text.match(/^(---\r?\n)([\s\S]*?)(\r?\n---\r?\n?)/);
  if (!m) {
    console.error('No YAML frontmatter found in SKILL.md');
    process.exit(1);
  }
  let fm = m[2];
  if (/^metadata:\s*$/m.test(fm)) {
    fm = /^\s+version:\s*.*$/m.test(fm)
      ? fm.replace(/^(\s+version:\s*).*$/m, `$1"${version}"`)
      : fm.replace(/^(metadata:\s*)$/m, `$1\n  version: "${version}"`);
  } else {
    fm = `${fm.replace(/\s*$/, '')}\nmetadata:\n  version: "${version}"`;
  }
  return m[1] + fm + m[3] + text.slice(m[0].length);
}

const pkgPath = join(ROOT, 'package.json');
const pkg = JSON.parse(readFileSync(pkgPath, 'utf8'));
const current = pkg.version;
const next = computeNext(current, spec);

pkg.version = next;
writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n');
writeFileSync(SKILL_PATH, setSkillVersion(readFileSync(SKILL_PATH, 'utf8'), next));

console.log(`${current} → ${next}`);
