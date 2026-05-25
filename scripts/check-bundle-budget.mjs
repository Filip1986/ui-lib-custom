/**
 * Compares current dist/ bundle sizes against the committed baseline in
 * docs/reference/bundle-sizes.json and fails if any entry grew beyond
 * the configured thresholds.
 *
 * Thresholds (both must be exceeded to fail):
 *   - Relative: > 5 % growth
 *   - Absolute:  > 1 024 B raw growth
 *
 * Usage: node scripts/check-bundle-budget.mjs
 *        (run after `ng build ui-lib-custom`)
 */

import { readFileSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { gzipSync } from 'node:zlib';
import { execSync } from 'node:child_process';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const FESM_DIR = join(ROOT, 'dist', 'ui-lib-custom', 'fesm2022');
const SNAPSHOT_PATH = 'docs/reference/bundle-sizes.json';

const RELATIVE_THRESHOLD = 0.05; // 5 %
const ABSOLUTE_THRESHOLD = 1024; // 1 KB raw

const PREFIX = 'ui-lib-custom-';
const SUFFIX = '.mjs';

function loadBaseline() {
  try {
    const json = execSync(`git show HEAD:${SNAPSHOT_PATH}`, { encoding: 'utf-8' });
    return JSON.parse(json);
  } catch {
    console.warn(
      `WARN: Could not read baseline from git HEAD (${SNAPSHOT_PATH}). ` +
        'Run `npm run bundlesize:snapshot` to create the initial snapshot.',
    );
    return null;
  }
}

function measureEntry(filePath) {
  const contents = readFileSync(filePath);
  const gzipped = gzipSync(contents, { level: 6 });
  return { raw: contents.length, gzip: gzipped.length };
}

function run() {
  const baseline = loadBaseline();
  if (!baseline) {
    console.log('No baseline found — skipping budget check.');
    process.exit(0);
  }

  let entries;
  try {
    entries = readdirSync(FESM_DIR);
  } catch {
    console.error(`ERROR: dist directory not found at ${FESM_DIR}`);
    process.exit(1);
  }

  const failures = [];
  const warnings = [];
  const rows = [];

  for (const entry of entries.sort()) {
    if (!entry.startsWith(PREFIX) || !entry.endsWith(SUFFIX)) continue;
    const name = entry.slice(PREFIX.length, -SUFFIX.length);
    const current = measureEntry(join(FESM_DIR, entry));
    const base = baseline[name];

    if (!base) {
      warnings.push(`NEW entry: ${name} (${current.raw} B raw / ${current.gzip} B gzip)`);
      rows.push({ name, baseRaw: '—', currentRaw: current.raw, delta: '+NEW', status: '🆕' });
      continue;
    }

    const rawDelta = current.raw - base.raw;
    const relGrowth = rawDelta / base.raw;

    const exceeded = rawDelta > ABSOLUTE_THRESHOLD && relGrowth > RELATIVE_THRESHOLD;
    const status = exceeded ? '❌' : rawDelta > 0 ? '⚠️' : '✅';
    const deltaStr =
      rawDelta === 0
        ? '±0'
        : rawDelta > 0
          ? `+${rawDelta} B (${(relGrowth * 100).toFixed(1)}%)`
          : `${rawDelta} B (${(relGrowth * 100).toFixed(1)}%)`;

    rows.push({ name, baseRaw: base.raw, currentRaw: current.raw, delta: deltaStr, status });

    if (exceeded) {
      failures.push(
        `${name}: raw grew ${rawDelta} B (${(relGrowth * 100).toFixed(1)}%) ` +
          `— exceeds both thresholds (>${ABSOLUTE_THRESHOLD} B AND >${RELATIVE_THRESHOLD * 100}%)`,
      );
    }
  }

  // Print report
  console.log('\nBundle budget check\n');
  console.log(
    `${'Entry'.padEnd(40)} ${'Baseline'.padStart(10)} ${'Current'.padStart(10)} ${'Delta'.padStart(22)} ${''}`,
  );
  console.log('-'.repeat(90));
  for (const r of rows) {
    console.log(
      `${r.name.padEnd(40)} ${String(r.baseRaw).padStart(10)} ${String(r.currentRaw).padStart(10)} ${r.delta.padStart(22)} ${r.status}`,
    );
  }

  if (warnings.length > 0) {
    console.log('\nNew entries (no baseline):');
    warnings.forEach((w) => console.log(`  ${w}`));
  }

  if (failures.length > 0) {
    console.error(`\n❌ Budget exceeded for ${failures.length} entry point(s):`);
    failures.forEach((f) => console.error(`  • ${f}`));
    console.error(
      '\nIf the growth is intentional, run `npm run bundlesize:snapshot` to update the baseline.',
    );
    process.exit(1);
  }

  console.log(`\n✅ All ${rows.length} entry points within budget.`);
}

run();
