// CLI: package every skill into dist/<name>-<version>.skill (a zip archive).
// Each package composes the shared content (shared/references, shared/assets)
// with the skill's own SKILL.md and any skill-local references/assets.
// Requires the system `zip` binary. Usage: npm run package

import { execFileSync } from 'node:child_process';
import {
  readFileSync, mkdtempSync, mkdirSync, cpSync, copyFileSync, rmSync, existsSync, readdirSync,
} from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import {
  ROOT, SKILLS, SHARED_DIR, PACKAGE_DIRS, skillPath, validateSkill,
} from './skill.mjs';

function countFiles(dir) {
  let n = 0;
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    n += e.isDirectory() ? countFiles(join(dir, e.name)) : 1;
  }
  return n;
}

// 1. Preflight: `zip` must be installed.
try {
  execFileSync('zip', ['--version'], { stdio: 'ignore' });
} catch {
  console.error('Error: the `zip` binary is required to package the skill but was not found.');
  console.error('  Debian/Ubuntu: sudo apt install zip');
  console.error('  macOS (Homebrew): brew install zip');
  process.exit(1);
}

// 2. Don't package anything if any skill fails validation.
const failed = SKILLS.flatMap((skill) =>
  validateSkill(skill).filter((r) => !r.ok).map((r) => ({ skill: skill.name, ...r })));
if (failed.length) {
  console.error('Refusing to package — validation failed:');
  for (const r of failed) console.error(`  ✗ [${r.skill}] ${r.name}${r.message ? ' — ' + r.message : ''}`);
  process.exit(1);
}

// 3. Version from package.json (shared across all skills).
const { version } = JSON.parse(readFileSync(join(ROOT, 'package.json'), 'utf8'));

const distDir = join(ROOT, 'dist');
mkdirSync(distDir, { recursive: true });

// 4. Build one archive per skill.
for (const skill of SKILLS) {
  // Stage under a `<name>/` folder so the archive's top-level directory matches
  // the skill name (spec requirement on unpack).
  const work = mkdtempSync(join(tmpdir(), 'skillpkg-'));
  const stageRoot = join(work, skill.name);
  mkdirSync(stageRoot, { recursive: true });

  // SKILL.md, then each composed dir: shared first, skill-local overlaid on top.
  copyFileSync(skillPath(skill), join(stageRoot, 'SKILL.md'));
  for (const dir of PACKAGE_DIRS) {
    const dest = join(stageRoot, dir);
    const sharedSrc = join(ROOT, SHARED_DIR, dir);
    const localSrc = join(ROOT, skill.dir, dir);
    if (existsSync(sharedSrc)) cpSync(sharedSrc, dest, { recursive: true });
    if (existsSync(localSrc)) cpSync(localSrc, dest, { recursive: true });
  }

  // Zip the staged folder, then copy into dist/.
  const outName = `${skill.name}-${version}.skill`;
  const tmpOut = join(work, outName);
  execFileSync('zip', ['-r', '-X', '-q', tmpOut, skill.name], { cwd: work, stdio: 'inherit' });

  const finalOut = join(distDir, outName);
  if (existsSync(finalOut)) rmSync(finalOut);
  copyFileSync(tmpOut, finalOut);

  const fileCount = countFiles(stageRoot);
  rmSync(work, { recursive: true, force: true });
  console.log(`Packaged ${fileCount} file(s) → ${finalOut}`);
}
