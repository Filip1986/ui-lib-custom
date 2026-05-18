# Phase 2 — Fix Pass

> Paste this prompt into Claude Code immediately after reviewing the Phase 1 gap report.
> The gap report from Phase 1 must be visible in the conversation above this prompt.
> Replace `[COMPONENT]` with the kebab-case component name.
>
> **This phase makes code changes.** Run it only after you have reviewed the gap report
> and confirmed which items to fix vs. defer.

---

```
You are running the fix pass for the [COMPONENT] component checkpoint audit.
The Phase 1 gap report is in the conversation above. Read it carefully before making any change.

---

## Your Constraints (non-negotiable)

Follow CLAUDE.md and LIBRARY_CONVENTIONS.md exactly. Specifically:
- ViewEncapsulation.None on every component
- ChangeDetectionStrategy.OnPush
- Standalone components only — no NgModule
- Signal inputs: input(), model(), output() — never @Input() / @Output()
- Explicit return types on every method, getter, computed()
- Angular block syntax: @if / @for (x of y; track z) / @switch — never *ngIf / *ngFor
- No cross-entry-point relative imports — use 'ui-lib-custom/core' package paths
- Public input types are string unions — never enum, never as const objects as public types
- No raw hex or px values — use --uilib-* CSS variables and design tokens
- Separate template files — always templateUrl / styleUrl, never inline template/styles
- No comments unless the WHY is non-obvious

---

## Step 1 — Re-read All Source Files

Before making any change, read:
- projects/ui-lib-custom/src/lib/[COMPONENT]/[COMPONENT].ts
- projects/ui-lib-custom/src/lib/[COMPONENT]/[COMPONENT].html
- projects/ui-lib-custom/src/lib/[COMPONENT]/[COMPONENT].scss
- projects/ui-lib-custom/src/lib/[COMPONENT]/README.md
- projects/ui-lib-custom/src/lib/[COMPONENT]/[COMPONENT].spec.ts
- projects/ui-lib-custom/src/lib/[COMPONENT]/[COMPONENT].a11y.spec.ts  (if it exists)
- docs/reference/components/[COMPONENT].md  (if it exists)
- docs/COMPETITIVE_BENCHMARKS.md  (the [COMPONENT] section)
- projects/demo/src/app/pages/[COMPONENT]/[COMPONENT]-demo.component.ts
- projects/demo/src/app/pages/[COMPONENT]/[COMPONENT]-demo.component.html

---

## Step 2 — Fix in Priority Order

Work through the gap report fix queue in this order:
1. Category 9 (Angular Integration) — foundational architecture gaps block everything else
2. Category 3 (Performance) — SSR safety and memory leaks
3. Category 2 (Accessibility) — ARIA, keyboard, focus management gaps
4. Category 1 (API Clarity) — naming, types, exports
5. Category 5 (Theming) — raw hex/px, missing CSS variables
6. Category 6 (DX) — TypeScript quality, README minimal example
7. Category 7 (Documentation) — README sections, reference doc updates
8. Category 8 (Polish) — state coverage in SCSS, animation correctness
9. Category 4 (Composability) — content projection, CVA, template slots
10. Category 10 (Emotional Quality) — only after all structural fixes are done
11. Category 11 (Competitive Parity) — COMPETITIVE_BENCHMARKS.md entry

### What NOT to fix in this pass
- 🔍 HUMAN items — these require browser/screen reader and cannot be verified from source
- Gaps marked [SKIP] by the reviewer before this session
- Large complexity items (> 2 hours) — park them in the explicit backlog instead

### For each fix you make
State in one sentence what you changed and which gap it closes. Example:
> Fixed: Added `@media (prefers-reduced-motion: reduce)` block to [COMPONENT].scss — closes Category 8 gap #3.

---

## Step 3 — After All Fixes, Run Verification

Run these commands in order. Do not skip any. Report PASS or FAIL with output excerpt on failure.

1. npx eslint projects/ui-lib-custom/src/lib/[COMPONENT]/ --max-warnings 0
2. npx eslint projects/demo/src/app/pages/[COMPONENT]/ --max-warnings 0  (if demo was touched)
3. npx jest --testPathPatterns="src/lib/[COMPONENT]/" --no-coverage
4. ng build ui-lib-custom

If any command fails, fix the issue and re-run before proceeding.

---

## Step 4 — Produce the Fix Report

### Changes Made
| File | What changed | Gap closed |
|------|-------------|------------|
| [file path] | [description] | Cat X — [item] |

### Deferred Items (explicit backlog — not silent gaps)
| Category | Item | Reason deferred | Complexity |
|----------|------|-----------------|------------|

### Human Verification Items Still Pending
Copy the 🔍 list from Phase 1 — these are not resolved by code changes:
- [ ] [item] — how to verify (NVDA+Chrome / VoiceOver+Safari / browser visual / axe Playwright run)

### Updated Score Estimate
Based on fixes applied, estimate the new score per category.
Mark items that depended on 🔍 verification as "pending human check".

| Category | Phase 1 Score | Estimated Score After Fixes | Still at risk? |
|----------|--------------|----------------------------|----------------|
```
