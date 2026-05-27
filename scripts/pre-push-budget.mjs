/**
 * pre-push-budget.mjs
 * -------------------
 * Called by .husky/pre-push.  Rebuilds the library only when the dist/ output
 * is stale (missing or older than any tracked source file), then runs the
 * per-entry-point bundle-size budget check.
 *
 * Why rebuild instead of just checking?
 *   `check-bundle-budget.mjs` compares dist/ against the committed baseline in
 *   git HEAD.  If dist/ is stale the check passes on old artefacts and CI still
 *   fails with the freshly-built sizes.  Rebuilding here mirrors CI exactly.
 *
 * Skipping the rebuild:
 *   Set the env var  SKIP_BUNDLE_BUILD=1  to skip the build step (e.g. when
 *   you know the dist is already fresh):
 *     SKIP_BUNDLE_BUILD=1 git push
 */

import { statSync, existsSync } from 'node:fs';
import { execSync } from 'node:child_process';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');

// The dist package.json is the last file written by `ng build`.
const DIST_MARKER = join(ROOT, 'dist', 'ui-lib-custom', 'package.json');

// Tracked source directories that affect the library bundle.
const WATCHED_DIRS = [
  join(ROOT, 'projects', 'ui-lib-custom', 'src'),
];

function run(cmd, label) {
  console.log(`\n▶ ${label}`);
  try {
    execSync(cmd, { stdio: 'inherit', cwd: ROOT });
  } catch {
    process.exit(1);
  }
}

function distIsStale() {
  if (!existsSync(DIST_MARKER)) {
    console.log('  dist/ not found — will build.');
    return true;
  }

  const distMtime = statSync(DIST_MARKER).mtimeMs;

  // Use git to list all tracked source files and check their mtime.
  // This is the fastest cross-platform way — no recursive fs walk needed.
  try {
    const files = execSync(
      'git ls-files -- ' + WATCHED_DIRS.map((d) => `"${d}"`).join(' '),
      { encoding: 'utf-8', cwd: ROOT },
    )
      .split('\n')
      .filter(Boolean);

    for (const file of files) {
      const absPath = join(ROOT, file);
      if (existsSync(absPath) && statSync(absPath).mtimeMs > distMtime) {
        console.log(`  Stale: ${file} is newer than dist/.`);
        return true;
      }
    }
  } catch {
    // If git ls-files fails (detached HEAD, etc.) assume stale.
    return true;
  }

  return false;
}

// ── Main ─────────────────────────────────────────────────────────────────────

if (process.env['SKIP_BUNDLE_BUILD'] === '1') {
  console.log('SKIP_BUNDLE_BUILD=1 — skipping library build.');
} else if (distIsStale()) {
  run('npm run build', 'Building library (dist is stale)…');
} else {
  console.log('\n✔ dist/ is up-to-date — skipping rebuild.');
}

run('node scripts/check-bundle-budget.mjs', 'Bundle size budget check');
