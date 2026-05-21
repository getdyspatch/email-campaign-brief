// CLI: package the skill into dist/<name>-<version>.skill (a zip archive).
// Requires the system `zip` binary. Usage: npm run package

import { execFileSync } from 'node:child_process';
import {
  readFileSync, mkdtempSync, mkdirSync, cpSync, copyFileSync, rmSync, existsSync, readdirSync,
} from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { ROOT, SKILL_NAME, PACKAGE_FILES, validateSkill } from './skill.mjs';

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

// 2. Don't package a skill that fails validation.
const failed = validateSkill().filter((r) => !r.ok);
if (failed.length) {
  console.error('Refusing to package — validation failed:');
  for (const r of failed) console.error(`  ✗ ${r.name}${r.message ? ' — ' + r.message : ''}`);
  process.exit(1);
}

// 3. Version from package.json.
const { version } = JSON.parse(readFileSync(join(ROOT, 'package.json'), 'utf8'));

// 4. Stage the allowlisted content under a `<name>/` folder so the archive's
//    top-level directory matches the skill name (spec requirement on unpack).
const work = mkdtempSync(join(tmpdir(), 'skillpkg-'));
const stageRoot = join(work, SKILL_NAME);
mkdirSync(stageRoot, { recursive: true });
for (const rel of PACKAGE_FILES) {
  const src = join(ROOT, rel);
  if (existsSync(src)) cpSync(src, join(stageRoot, rel), { recursive: true });
}

// 5. Zip it, then copy into dist/.
const outName = `${SKILL_NAME}-${version}.skill`;
const tmpOut = join(work, outName);
execFileSync('zip', ['-r', '-X', '-q', tmpOut, SKILL_NAME], { cwd: work, stdio: 'inherit' });

const distDir = join(ROOT, 'dist');
mkdirSync(distDir, { recursive: true });
const finalOut = join(distDir, outName);
if (existsSync(finalOut)) rmSync(finalOut);
copyFileSync(tmpOut, finalOut);

const fileCount = countFiles(stageRoot);
rmSync(work, { recursive: true, force: true });

console.log(`Packaged ${fileCount} file(s) → ${finalOut}`);
