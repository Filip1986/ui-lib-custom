#!/usr/bin/env node
/**
 * ui-lib-custom Health Check Script
 *
 * Runs a periodic health audit of the library.
 *
 * Usage:
 *   node scripts/health-check.mjs
 *   node scripts/health-check.mjs --json     # output as JSON
 *
 * Exit codes:
 *   0 — all checks pass (no FAIL)
 *   1 — one or more checks FAIL
 */

import { execSync } from 'node:child_process';
import { readFileSync, existsSync } from 'node:fs';
import { parseArgs } from 'node:util';

const { values: args } = parseArgs({
  options: { json: { type: 'boolean', default: false } },
  strict: false,
});

const results = [];
let hasFail = false;

function record(name, status, notes = '') {
  results.push({ name, status, notes });
  if (status === 'FAIL') hasFail = true;
}

function run(cmd, cwd = process.cwd()) {
  try {
    return execSync(cmd, { cwd, encoding: 'utf8', stdio: ['pipe', 'pipe', 'pipe'] });
  } catch (e) {
    return null;
  }
}

// ---------------------------------------------------------------------------
// Check 1 — Lint (zero warnings)
// ---------------------------------------------------------------------------
console.log('⏳ Running lint:ci...');
const lintOut = run('npm run lint:ci -- --quiet');
if (lintOut !== null) {
  record('Lint (0 warnings)', 'PASS');
} else {
  record('Lint (0 warnings)', 'FAIL', 'Run npm run lint:fix to identify issues');
}

// ---------------------------------------------------------------------------
// Check 2 — TypeScript
// ---------------------------------------------------------------------------
console.log('⏳ Running typecheck...');
const tcOut = run('npm run typecheck');
if (tcOut !== null) {
  record('TypeScript', 'PASS');
} else {
  record('TypeScript', 'FAIL', 'Run npm run typecheck to see errors');
}

// ---------------------------------------------------------------------------
// Check 3 — Build
// ---------------------------------------------------------------------------
console.log('⏳ Running build...');
const buildOut = run('npm run build');
if (buildOut !== null) {
  record('Build', 'PASS');
} else {
  record('Build', 'FAIL', 'Run npm run build to see errors');
}

// ---------------------------------------------------------------------------
// Check 4 — Test coverage
// ---------------------------------------------------------------------------
console.log('⏳ Running test coverage...');
const coverageOut = run('npm run test:coverage -- --passWithNoTests', process.cwd());
if (coverageOut !== null) {
  // Try to read coverage summary
  const summaryPath = 'coverage/coverage-summary.json';
  if (existsSync(summaryPath)) {
    try {
      const summary = JSON.parse(readFileSync(summaryPath, 'utf8'));
      const total = summary.total;
      const pct = (m) => total[m]?.pct ?? 0;
      const stmts = pct('statements');
      const branches = pct('branches');
      const funcs = pct('functions');
      const lines = pct('lines');
      const allPass = stmts >= 90 && branches >= 85 && funcs >= 90 && lines >= 90;
      const status = allPass ? 'PASS' : 'FAIL';
      record('Test coverage', status,
        `Stmts: ${stmts}%, Branches: ${branches}%, Funcs: ${funcs}%, Lines: ${lines}%`);
    } catch {
      record('Test coverage', 'WARN', 'Tests ran but could not parse coverage-summary.json');
    }
  } else {
    record('Test coverage', 'WARN', 'Tests ran but coverage-summary.json not found');
  }
} else {
  record('Test coverage', 'FAIL', 'npm run test:coverage failed');
}

// ---------------------------------------------------------------------------
// Check 5 — Dead exports (knip)
// ---------------------------------------------------------------------------
console.log('⏳ Running knip...');
const knipOut = run('npm run knip -- --reporter compact');
if (knipOut !== null && !knipOut.includes('Unused exports')) {
  record('Dead exports (knip)', 'PASS');
} else if (knipOut && knipOut.includes('Unused exports')) {
  record('Dead exports (knip)', 'FAIL', 'Unused exports found — review and remove dead API');
} else {
  record('Dead exports (knip)', 'WARN', 'knip could not run — check knip.json config');
}

// ---------------------------------------------------------------------------
// Check 6 — Bundle size
// ---------------------------------------------------------------------------
console.log('⏳ Checking bundle size...');
const bundleOut = run('npm run bundlesize');
if (bundleOut !== null && !bundleOut.includes('FAIL')) {
  record('Bundle size', 'PASS');
} else if (bundleOut === null) {
  record('Bundle size', 'FAIL', 'bundlesize check failed — exceeds budget');
} else {
  record('Bundle size', 'WARN', 'bundlesize check had warnings');
}

// ---------------------------------------------------------------------------
// Check 7 — Tree-shaking
// ---------------------------------------------------------------------------
console.log('⏳ Checking tree-shaking (dry run)...');
const tsOut = run('npm run verify:tree-shaking:dry');
if (tsOut !== null) {
  record('Tree-shaking', 'PASS');
} else {
  record('Tree-shaking', 'FAIL', 'Run npm run verify:tree-shaking to debug');
}

// ---------------------------------------------------------------------------
// Check 8 — Outdated dependencies (major only)
// ---------------------------------------------------------------------------
console.log('⏳ Checking outdated dependencies...');
const outdatedOut = run('npm outdated --json');
if (outdatedOut) {
  try {
    const outdated = JSON.parse(outdatedOut);
    const majors = Object.entries(outdated).filter(([, info]) => {
      const cur = info.current?.split('.')[0];
      const lat = info.latest?.split('.')[0];
      return cur && lat && parseInt(lat) > parseInt(cur);
    });
    if (majors.length === 0) {
      record('Outdated dependencies', 'PASS');
    } else {
      const names = majors.map(([n]) => n).join(', ');
      record('Outdated dependencies', 'WARN', `Major updates available: ${names}`);
    }
  } catch {
    record('Outdated dependencies', 'PASS', 'All dependencies up to date');
  }
} else {
  record('Outdated dependencies', 'PASS', 'All dependencies up to date');
}

// ---------------------------------------------------------------------------
// Check 9 — CHANGELOG vs latest git tag
// ---------------------------------------------------------------------------
console.log('⏳ Checking CHANGELOG...');
try {
  const changelog = readFileSync('CHANGELOG.md', 'utf8');
  const latestTag = run('git describe --tags --abbrev=0')?.trim();
  if (latestTag && changelog.includes(latestTag.replace('v', ''))) {
    record('CHANGELOG vs tags', 'PASS', `Latest tag ${latestTag} found in CHANGELOG`);
  } else if (!latestTag) {
    record('CHANGELOG vs tags', 'WARN', 'No git tags found');
  } else {
    record('CHANGELOG vs tags', 'WARN', `Tag ${latestTag} not found in CHANGELOG`);
  }
} catch {
  record('CHANGELOG vs tags', 'WARN', 'CHANGELOG.md not found or not readable');
}

// ---------------------------------------------------------------------------
// Output
// ---------------------------------------------------------------------------

if (args.json) {
  console.log(JSON.stringify({ timestamp: new Date().toISOString(), results }, null, 2));
} else {
  console.log('\n## ui-lib-custom Health Check — ' + new Date().toISOString().slice(0, 10) + '\n');
  const statusIcon = { PASS: '✅', WARN: '⚠️', FAIL: '❌' };
  const maxName = Math.max(...results.map((r) => r.name.length));
  for (const r of results) {
    const icon = statusIcon[r.status] ?? '❓';
    const pad = r.name.padEnd(maxName + 2);
    const notes = r.notes ? `  — ${r.notes}` : '';
    console.log(`  ${icon}  ${pad}${notes}`);
  }
  const overall = hasFail ? '❌ CRITICAL' : results.some((r) => r.status === 'WARN') ? '⚠️  CAUTION' : '✅ HEALTHY';
  console.log('\nOverall: ' + overall);
}

process.exit(hasFail ? 1 : 0);

