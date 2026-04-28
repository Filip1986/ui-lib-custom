# AI Agent Context

> Active session context only.
> Stable architecture, conventions, and workflows live in `AGENTS.md`.
> Historical handoffs live in `docs/implementation/AI_AGENT_CONTEXT_ARCHIVE.md`.

---

## Purpose and Scope

Use this file for:
- Current focus, queue, and blockers
- Quick status deltas for in-flight components/docs
- Recent handoffs (latest 1-3 sessions)

Do not duplicate stable project rules here; link to `AGENTS.md` instead.

---

## Active Session State

- **Current milestone:** Component foundation hardening + documentation completeness
- **Active focus:** constants extraction pass complete; resuming backlog
- **Next queue:** `knip` baseline and dead-code cleanup, constants extraction pass, overlay follow-ups (`appendTo`/z-index manager), component v2 enhancements by priority
- **Horizon:** Runtime variant switcher, theme preset management, Storybook integration, broader axe-core audit

### Component/Docs Delta (Active Only)

- `Listbox` -> ✅ complete (implementation/tests/entry-point/demo/docs/ESLint/build all green)
- `RadioButton` -> ✅ complete (implementation/tests/entry-point/demo/ESLint/build all green)
- `Knob` -> ✅ complete (implementation/tests/entry-point/demo/ESLint/build all green)
- `KeyFilter` -> ✅ complete (implementation/tests/entry-point/demo/ESLint/build all green)
- `InputOtp` -> ✅ complete (implementation/tests/entry-point/demo/final QA complete)
- `Carousel` -> ✅ complete (implementation/tests/entry-point/demo/docs/final QA complete)
- `Upload` -> ✅ complete (implementation/tests/entry-point/demo/docs/final QA complete)
- `VirtualScroller` -> ✅ complete (implementation/tests/entry-point/demo/final QA complete)
- `Tree` -> ✅ complete (implementation/tests/entry-point/demo/docs/final QA complete)
- `TreeTable` -> ✅ complete (implementation/tests/entry-point/demo/docs/final QA complete)
- `Table` -> ✅ complete (implementation/tests/demo/docs/entry-point verification done)
- `Timeline` -> ✅ complete (implementation/tests/entry-point/demo/docs/final QA complete)
- `InputNumber` -> ✅ complete (implementation/tests/entry-point/demo/docs/final QA complete)
- `SplitButton` -> ✅ complete (implementation/tests/entry-point/demo/docs/final QA complete)
- `Chart` -> ✅ complete (implementation/tests/entry-point/demo/docs/final QA complete)
- `DataView` -> ✅ complete (implementation/tests/entry-point/demo/docs/final QA complete)
- `OrderList` -> ✅ complete (implementation/tests/demo/docs/entry-point/final QA complete)
- `OrganizationChart` -> ✅ complete (implementation/tests/demo/docs/entry-point/final QA complete)
- `Paginator` -> ✅ complete (implementation/tests/demo/docs/entry-point/final QA complete)
- `PickList` -> ✅ complete (implementation/tests/demo/docs/entry-point/final QA complete)
- Documentation gaps still tracked for: `Input`, `Select`, `Card`, `Layout`
- Pending secondary entry points: `icon-button`, `alert`
- `VirtualScroller` docs written: `docs/reference/components/VIRTUAL_SCROLLER.md`

---

## Known Blockers / Watch Items

- Non-blocking Jest warning seen during a11y run:
  - `jest-haste-map: Haste module naming collision: ui-lib-custom`
  - between root `package.json` and `projects/ui-lib-custom/package.json`
- Demo build shows pre-existing SCSS budget warnings in `button` and `date-picker` -- not a blocker

---

## Recent Handoffs

Older handoffs are archived in `docs/implementation/AI_AGENT_CONTEXT_ARCHIVE.md`.

Handoff convention (when terminal commands are run in-session): include a short `Terminal notes:` subsection with failed command(s), successful workaround(s), and shell used.

Date: 2026-04-28 [radio-button session]
Changed:
  - projects/ui-lib-custom/src/lib/radio-button/ (new — radio-button.types.ts, radio-button.ts,
    radio-button.html, radio-button.scss, radio-button.spec.ts, index.ts)
  - projects/ui-lib-custom/radio-button/ (new secondary entry point — ng-package.json, package.json, public-api.ts)
  - projects/ui-lib-custom/package.json (added radio-button to exports + typesVersions via Node.js)
  - projects/ui-lib-custom/test/entry-points.spec.ts (added radio-button import test)
  - projects/demo/src/app/pages/radio-button/ (full demo replacing placeholder — TS/HTML/SCSS, 7 scenarios)
State: RadioButton component fully complete. Native-radio CVA with group-value semantics (writeValue
  receives group selection, isChecked = modelValue === value), disabled/readonly states, autofocus,
  three variants (material/bootstrap/minimal), three sizes (sm/md/lg), outlined/filled appearances,
  full ARIA (aria-label, aria-labelledby, required, tabindex), keyboard nav via native type=radio,
  focus/blur outputs, change output with value + originalEvent. 39/39 unit tests passing (including
  ngModel and reactive forms suites). 44/44 entry-point tests passing. ESLint clean. Library build
  zero errors. Demo build clean (pre-existing button/date-picker SCSS budget warnings not new).
Verification:
  npx.cmd eslint projects/ui-lib-custom/src/lib/radio-button/ projects/demo/src/app/pages/radio-button/ --max-warnings 0 (CLEAN),
  npx.cmd ng build ui-lib-custom — ui-lib-custom/radio-button ✔ Built, all entry points ✔ Built (zero errors),
  npx.cmd jest --testPathPatterns="radio-button" --no-cache (39/39 PASS),
  npx.cmd jest --testPathPatterns="entry-points" --no-cache (44/44 PASS),
  npx.cmd ng build demo (Application bundle generation complete, zero new errors).
Terminal notes: [checked]="true" in demo HTML caused NG8002 compile error — fixed by using [(ngModel)]
  with pre-initialised variantMaterialValue/variantBootstrapValue/variantMinimalValue = 'c' properties.
  JSON files written via Node.js fs.writeFileSync (Python not available on PATH). Shell: bash.exe.
Next step: Overlay follow-ups (appendTo / z-index manager), or component v2 enhancements.

---
Date: 2026-04-28 [listbox session]
Changed:
  - projects/ui-lib-custom/src/lib/listbox/ (new — listbox.types.ts, listbox.constants.ts,
    listbox.component.ts, listbox.component.html, listbox.component.scss,
    listbox.component.spec.ts, index.ts, public-api.ts)
  - projects/ui-lib-custom/listbox/ (new secondary entry point — ng-package.json, package.json)
  - projects/ui-lib-custom/package.json (added listbox to exports + typesVersions via Python)
  - projects/ui-lib-custom/test/entry-points.spec.ts (added listbox import test)
  - projects/demo/src/app/pages/listbox/ (full demo — TS/HTML/SCSS, 9 scenarios)
  - docs/reference/components/LISTBOX.md (new — full API + theming + a11y + keyboard docs)
  - projects/ui-lib-custom/src/lib/knob/knob.component.ts (repaired pre-existing truncation:
    missing onModelTouched body and class closing brace)
State: Listbox component fully complete. Scrollable option list with single and multiple
  selection, inline filtering (contains/startsWith/endsWith/equals), option groups, checkbox
  mode, toggle-all, striped rows, ControlValueAccessor (ngModel + reactive forms), disabled /
  readonly states, full ARIA (role=listbox, role=option, aria-multiselectable,
  aria-activedescendant, aria-posinset, aria-setsize), keyboard nav (ArrowUp/Down/Home/End/
  Enter/Space), three variants (material/bootstrap/minimal), three sizes (sm/md/lg),
  custom item/group/empty template slots. 55/55 unit tests passing. 42/42 entry-point tests
  passing. ESLint clean on all lib and demo files. Library build zero errors.
Verification:
  npx eslint projects/ui-lib-custom/src/lib/listbox/ projects/demo/src/app/pages/listbox/ --max-warnings 0 (CLEAN),
  npx ng build ui-lib-custom — ui-lib-custom/listbox ✔ Built, all entry points ✔ Built (zero errors),
  npx jest --testPathPatterns="listbox" --no-cache (55/55 PASS),
  npx jest --testPathPatterns="entry-points" --no-cache (42/42 PASS).
Terminal notes: Write tool truncates large .ts files — listbox.component.ts and
  listbox.constants.ts both needed Python repair after initial Write. Always write large files
  (>300 lines) via Python script with open(dest, 'wb') + .encode('utf-8'). Knob pre-existing
  truncation (onModelTouched + class closing brace) repaired as collateral.
Next step: Overlay follow-ups (appendTo / z-index manager), or component v2 enhancements.

---
Date: 2026-04-28 [knip baseline session]
Changed:
  - knip.json (removed 9 redundant entry/ignore patterns flagged as config hints)
  - knip.json (added with-theme-scope.ts to ignore list — intentional pending file)
  - projects/ui-lib-custom/src/lib/theming/index.ts (removed WithThemeScopeMixin from public
    barrel; commented out with note to restore when first consumer lands)
State: knip baseline complete. Standard `npx knip` reports 0 issues (clean baseline).
  --include-entry-exports surfaces 47 entries that are all intentional public API types/exports;
  documented as false positives for a library. One truly dead export (WithThemeScopeMixin)
  removed from theming barrel and its source file added to knip ignore list (pending first use).
  Build: all entry points Built, zero errors. Entry-point tests: 41/41 PASS.
Verification:
  npx knip --config knip.json (exit 0, zero output),
  npx ng build ui-lib-custom (all entry points ✔ Built, zero errors),
  npx jest --testPathPatterns="entry-points" --no-cache (41/41 PASS).
Terminal notes: Edit tool introduces null bytes into small JSON files on Windows (same corruption
  as Write tool). Mitigation: always rewrite JSON via Python script with open(dest, 'wb') +
  .encode('utf-8'). Cannot delete files from bash sandbox (Operation not permitted) — use
  knip ignore list as equivalent signal.
Next step: Overlay follow-ups (appendTo / z-index manager), or component v2 enhancements.

