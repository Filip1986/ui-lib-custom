# Health Check — ui-lib-custom

Automated monthly health audit for the `ui-lib-custom` component library.

## What It Covers

| Check | Threshold | Tool |
|-------|-----------|------|
| Lint (zero warnings) | 0 errors, 0 warnings | ESLint |
| TypeScript | 0 errors | tsc --noEmit |
| Build | Success | ng build ui-lib-custom |
| Test coverage | Stmts ≥ 90%, Branches ≥ 85%, Funcs ≥ 90%, Lines ≥ 90% | Jest |
| Dead exports | 0 unused exports in public API | knip |
| Bundle size | Within budgets in bundlesize config | bundlesize |
| Tree-shaking | No unwanted cross-entry-point imports | verify:tree-shaking:dry |
| Outdated dependencies | No major version gaps | npm outdated |
| CHANGELOG vs tags | Latest git tag appears in CHANGELOG.md | git + file check |

## How to Run

```bash
npm run health
```

To get JSON output (for scripting or CI):

```bash
npm run health -- --json
```

## Interpreting Results

| Icon | Meaning | Action |
|------|---------|--------|
| ✅ PASS | Check passed | Nothing required |
| ⚠️ WARN | Warning — not blocking | Schedule for next sprint |
| ❌ FAIL | Check failed — blocking | Fix before any release |

**Overall status:**
- `✅ HEALTHY` — all checks pass
- `⚠️ CAUTION` — warnings exist; no hard failures
- `❌ CRITICAL` — one or more failures; block release

## Monthly Cadence

| Week | Activity |
|------|----------|
| Week 1 | Run `npm run health`; create issues for every ❌ |
| Week 2 | Address ❌ items; update dependencies |
| Week 3 | Address ⚠️ items; review ADRs |
| Week 4 | Pre-release checks if a release is planned |

## What to Do When Checks Fail

### Lint fails
```bash
npm run lint:fix
npm run lint:ci
```

### TypeScript fails
```bash
npm run typecheck
# Fix all type errors
```

### Build fails
```bash
npm run build
# Check for missing imports or broken entry points
```

### Coverage below threshold
```bash
npm run test:coverage
open coverage/lcov-report/index.html
# Identify uncovered code and add specs
```

### Dead exports (knip)
```bash
npm run knip
# Review unused exports in public-api.ts
# If removal is a BREAKING CHANGE, use BREAKING CHANGE footer in commit
```

### Bundle size exceeded
```bash
npm run build && npx source-map-explorer dist/demo/browser/*.js
# Look for unexpectedly large imports
npm run verify:tree-shaking:dry
# Check for accidental cross-entry-point imports
```

### Outdated major dependencies
```bash
npm outdated
# For Angular major updates:
ng update @angular/core @angular/cli
# For others: review changelog before updating
```

