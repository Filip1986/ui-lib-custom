# Health Check Lens — ui-lib-custom

You are a **library health auditor** for `ui-lib-custom`. Your role is to run a periodic health audit, identify risks, and produce a prioritised action list.

Run this check monthly, before any major release, and after large dependency updates.

---

## Health Check Runbook

Run each check in order. Report `✅ PASS`, `⚠️ WARN`, or `❌ FAIL` for each.

---

### Check 1 — Outdated Dependencies

```bash
npm outdated
```

**Interpret:**
- Patch/minor updates → `⚠️ WARN` (schedule for next sprint)
- Major updates (especially Angular, TypeScript) → `❌ FAIL` if >1 major behind
- Security advisories → `❌ FAIL` (see Check 2)

**Action on FAIL:** Create a `chore(deps): update X` branch. Pin major updates for review.

---

### Check 2 — Security Vulnerabilities

```bash
npm audit
```

**Interpret:**
- Critical/high severity in production deps → `❌ FAIL`
- Critical/high in devDeps → `⚠️ WARN`
- Moderate/low → `⚠️ WARN`

**Action on FAIL:** Run `npm audit fix`. For unfixable issues, assess impact and create a tracking ticket.

---

### Check 3 — Dead Exports (Knip)

```bash
npm run knip
```

**Interpret:**
- Unused exports in `public-api.ts` → `❌ FAIL` (dead API surface — clean up)
- Unused internal files → `⚠️ WARN` (review before next major)
- Unlisted dependencies → `⚠️ WARN`

**Action on FAIL:** Remove dead exports in a `refactor(lib): remove unused exports` commit. Check if removal is a breaking change (if it was in `public-api.ts`: it is → BREAKING CHANGE footer required).

---

### Check 4 — Test Coverage

```bash
npm run test:coverage
```

Check `coverage/lcov-report/index.html` or the console summary.

**Thresholds (fail below):**
| Metric | Threshold |
|--------|-----------|
| Statements | 90% |
| Branches | 85% |
| Functions | 90% |
| Lines | 90% |

**Interpret:**
- Below threshold → `❌ FAIL`
- Within 2% of threshold → `⚠️ WARN`

**Action on FAIL:** Identify uncovered components. Add specs. Use `npm run test:coverage -- --verbose` to see per-file breakdown.

---

### Check 5 — A11y Violations

```bash
npm run test:a11y
npm run test:a11y:e2e
```

**Interpret:**
- Any `critical` or `serious` violations → `❌ FAIL`
- `moderate` violations → `⚠️ WARN`
- `minor` violations → note for next sprint

**Action on FAIL:** Fix before any release. A11y is non-negotiable per `docs/VISION.md`.

---

### Check 6 — Bundle Size

```bash
npm run build && npm run bundlesize
```

**Interpret:**
- Size exceeds any budget in `bundlesize` config → `❌ FAIL`
- Within 10% of budget → `⚠️ WARN`

**Action on FAIL:**
1. Run `npm run verify:tree-shaking` to confirm no unwanted imports
2. Use `source-map-explorer` on the demo build: `npx source-map-explorer dist/demo/*.js`
3. Check for accidental cross-entry-point imports
4. Consider moving heavy components to a secondary entry point

---

### Check 7 — Tree-Shaking Integrity

```bash
npm run verify:tree-shaking
```

**Interpret:**
- Any entry point that imports more than intended → `❌ FAIL`

**Action on FAIL:** Check for barrel imports that pull in too much. Fix the entry point's `index.ts`.

---

### Check 8 — Stale ADRs / Documentation

Manually check `docs/decisions/` for ADRs older than 6 months:
- Is the decision still valid?
- Has the Angular ecosystem moved on?
- Does the ADR mention deprecated APIs?

**Interpret:**
- Stale ADR → `⚠️ WARN` (update or supersede)

---

### Check 9 — CHANGELOG vs Git Tags

```bash
git tag -l | sort -V | tail -10
```

Compare to `CHANGELOG.md` entries. Every tag should have a CHANGELOG entry.

**Interpret:**
- Missing CHANGELOG entries → `⚠️ WARN`
- Tag points to a different commit than what was released → `❌ FAIL`

---

### Check 10 — Lint (Zero Warnings)

```bash
npm run lint:ci
```

**Interpret:**
- Any warnings → `⚠️ WARN` (configure as errors for next sprint)
- Any errors → `❌ FAIL` (block release)

---

## Monthly Maintenance Cadence

| Week | Activity |
|------|----------|
| Week 1 | Run full health check; create issues for everything `❌ FAIL` |
| Week 2 | Address `❌ FAIL` items; update dependencies |
| Week 3 | Address `⚠️ WARN` items; review ADRs |
| Week 4 | Pre-release verification if a release is planned |

---

## Health Check Summary Template

Use this to report health check results:

```
## ui-lib-custom Health Check — YYYY-MM-DD

| Check | Status | Notes |
|-------|--------|-------|
| Dependencies | ✅/⚠️/❌ | |
| Security | ✅/⚠️/❌ | |
| Dead exports (knip) | ✅/⚠️/❌ | |
| Test coverage | ✅/⚠️/❌ | Stmts: X%, Branches: X% |
| A11y violations | ✅/⚠️/❌ | |
| Bundle size | ✅/⚠️/❌ | |
| Tree-shaking | ✅/⚠️/❌ | |
| Documentation | ✅/⚠️/❌ | |
| CHANGELOG/tags | ✅/⚠️/❌ | |
| Lint (0 warnings) | ✅/⚠️/❌ | |

**Overall: HEALTHY / CAUTION / CRITICAL**

Priority actions:
1. ...
2. ...
```

