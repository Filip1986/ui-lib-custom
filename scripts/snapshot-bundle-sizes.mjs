/**
 * Scans dist/ui-lib-custom/fesm2022/ for per-entry-point .mjs bundles,
 * computes raw + gzip sizes, and writes docs/reference/bundle-sizes.json.
 *
 * Usage: node scripts/snapshot-bundle-sizes.mjs
 *        (run after `ng build ui-lib-custom`)
 */

import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { gzipSync } from 'node:zlib';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const FESM_DIR = join(ROOT, 'dist', 'ui-lib-custom', 'fesm2022');
const OUTPUT_FILE = join(ROOT, 'docs', 'reference', 'bundle-sizes.json');

const PREFIX = 'ui-lib-custom-';
const SUFFIX = '.mjs';

function measureEntry(filePath) {
  const contents = readFileSync(filePath);
  const gzipped = gzipSync(contents, { level: 6 });
  return { raw: contents.length, gzip: gzipped.length };
}

function run() {
  let entries;
  try {
    entries = readdirSync(FESM_DIR);
  } catch {
    console.error(`ERROR: dist directory not found at ${FESM_DIR}`);
    console.error('Run `ng build ui-lib-custom` first.');
    process.exit(1);
  }

  const measuredAt = new Date().toISOString();
  const sizes = {};

  for (const entry of entries.sort()) {
    if (!entry.startsWith(PREFIX) || !entry.endsWith(SUFFIX)) continue;
    const name = entry.slice(PREFIX.length, -SUFFIX.length);
    const { raw, gzip } = measureEntry(join(FESM_DIR, entry));
    sizes[name] = { raw, gzip, measuredAt };
  }

  const count = Object.keys(sizes).length;
  if (count === 0) {
    console.error('ERROR: No matching bundles found. Is the build output correct?');
    process.exit(1);
  }

  writeFileSync(OUTPUT_FILE, JSON.stringify(sizes, null, 2) + '\n');

  // Summary table
  const rows = Object.entries(sizes)
    .map(([name, { raw, gzip }]) => ({ name, raw, gzip }))
    .sort((a, b) => b.gzip - a.gzip);

  console.log(`\nBundle sizes — ${count} entry points (sorted by gzip)\n`);
  console.log(
    `${'Entry'.padEnd(40)} ${'Raw (B)'.padStart(9)} ${'Gzip (B)'.padStart(9)} ${'Ratio'.padStart(7)}`,
  );
  console.log('-'.repeat(70));
  for (const { name, raw, gzip } of rows) {
    const ratio = ((gzip / raw) * 100).toFixed(1);
    console.log(
      `${name.padEnd(40)} ${String(raw).padStart(9)} ${String(gzip).padStart(9)} ${(ratio + '%').padStart(7)}`,
    );
  }

  const totalRaw = rows.reduce((s, r) => s + r.raw, 0);
  const totalGzip = rows.reduce((s, r) => s + r.gzip, 0);
  console.log('-'.repeat(70));
  console.log(
    `${'TOTAL'.padEnd(40)} ${String(totalRaw).padStart(9)} ${String(totalGzip).padStart(9)}`,
  );
  console.log(`\nSnapshot written to ${OUTPUT_FILE}`);
}

run();
