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

---
Date: 2026-04-28
Changed:
  - projects/ui-lib-custom/src/lib/knob/ (new — knob.types.ts, knob.component.ts, knob.component.html, knob.component.scss, knob.component.spec.ts, index.ts, public-api.ts)
  - projects/ui-lib-custom/knob/ (new secondary entry point — ng-package.json, package.json)
  - projects/ui-lib-custom/package.json (added knob to exports + typesVersions; repaired on-disk JSON truncation)
  - projects/ui-lib-custom/test/entry-points.spec.ts (added knob import test; repaired truncation of key-filter test)
  - projects/demo/src/app/pages/knob/ (full demo — TS/HTML/SCSS, 9 scenarios)
  - projects/ui-lib-custom/src/lib/key-filter/key-filter.directive.ts (stripped trailing null byte)
  - projects/ui-lib-custom/src/lib/upload/upload.component.ts (stripped null bytes)
  - projects/ui-lib-custom/src/lib/input-otp/input-otp.component.spec.ts (stripped null bytes)
State: Knob component fully complete. SVG-based circular dial with 270° arc, drag (pointer events) and
  keyboard interaction (ArrowUp/Down/Left/Right, PageUp/Down, Home/End), ControlValueAccessor (ngModel +
  reactive forms), value template formatting, per-instance colour overrides via valueColor/textColor inputs,
  three variants (material/bootstrap/minimal), three sizes (sm/md/lg), disabled and readonly states,
  full ARIA (role=slider, aria-valuenow/min/max/valuetext/disabled/readonly). 35/35 unit tests passing.
  41/41 entry-point tests passing. ESLint clean. Library build zero errors (all entry points ✔ Built).
Verification:
  npx eslint projects/ui-lib-custom/src/lib/knob/ projects/demo/src/app/pages/knob/ --max-warnings 0 (CLEAN),
  npx ng build ui-lib-custom — ui-lib-custom/knob ✔ Built, all entry points ✔ Built (zero errors),
  npx jest --testPathPatterns="knob" --no-cache (35/35 PASS),
  npx jest --testPathPatterns="entry-points" --no-cache (41/41 PASS).
Terminal notes: Write tool truncates large files — always verify with wc -l and repair via Python scripts
  in outputs/. Key recurring file corruptions this session: package.json (truncated at line 70, rewrote via
  Python json.dumps), key-filter.directive.ts + upload.component.ts + input-otp.component.spec.ts (null bytes,
  stripped with glob scan). entry-points.spec.ts truncated mid-assertion; repaired via string replace in Python.
  Demo HTML (281 lines) and TS (97 lines) also truncated by Write tool; repaired via Python file write.
Next step: Overlay follow-ups (appendTo / z-index manager), knip baseline + dead-code cleanup, or component v2 enhancements.

---

Date: 2026-04-27
Changed:
  - projects/ui-lib-custom/src/lib/input-otp/ (new — types, component TS/HTML/SCSS, spec, index.ts, public-api.ts)
  - projects/ui-lib-custom/input-otp/ (new secondary entry point — ng-package.json, package.json, public-api.ts)
  - projects/ui-lib-custom/package.json (added input-otp to exports + typesVersions)
  - projects/ui-lib-custom/test/entry-points.spec.ts (added input-otp import test; repaired truncation via Python)
  - projects/demo/src/app/pages/input-otp/ (full demo — TS/HTML/SCSS, 9 scenarios)
  - projects/ui-lib-custom/src/lib/upload/upload.component.ts (repaired: revokeAllObjectUrls + clearAllFiles methods missing)
  - projects/ui-lib-custom/src/lib/order-list/order-list.component.ts (repaired: buildSelectionSet truncated)
  - projects/ui-lib-custom/src/lib/pick-list/pick-list.component.ts (repaired: findIndex callback truncated)
  - projects/ui-lib-custom/src/lib/virtual-scroller/virtual-scroller.component.ts (repaired: getContentOptions truncated)
State: InputOtp component fully complete. N-cell OTP entry, CVA (ngModel + reactive forms), keyboard
  navigation (arrows/backspace/delete), paste distribution, mask mode, integerOnly, three size tokens,
  filled/disabled/invalid/readonly states, three CSS-variable variants. 36/36 unit tests passing.
  39/39 entry-point tests passing. ESLint clean on all lib and demo files. Library build clean.
Verification:
  npx eslint projects/ui-lib-custom/src/lib/input-otp/ projects/demo/src/app/pages/input-otp/ --max-warnings 0 (CLEAN),
  npx ng build ui-lib-custom — all entry points ✔ Built (zero errors),
  npx jest --testPathPatterns="input-otp|entry-points" (75/75 PASS).
Terminal notes: Backtick chars in Python -c strings are eaten by bash (bash tries to execute them as
  command substitution). Mitigation: always write Python scripts to a .py file in outputs/, then run
  with python3 <file>. Four pre-existing truncated files found and repaired during build; see Changed list.
Next step: Overlay follow-ups (appendTo / z-index manager), then knip baseline + dead-code cleanup.

---

Date: 2026-04-27 [carousel session]
Changed:
  - projects/ui-lib-custom/src/lib/carousel/ (new — types, constants, component TS/HTML/SCSS, spec, index.ts)
  - projects/ui-lib-custom/carousel/ (new secondary entry point — ng-package.json, package.json, public-api.ts)
  - projects/ui-lib-custom/package.json (added carousel to exports + typesVersions)
  - projects/ui-lib-custom/test/entry-points.spec.ts (added carousel import test + repaired upload truncation)
  - projects/demo/src/app/pages/carousel/ (new demo — TS/HTML/SCSS, 9 scenarios)
  - projects/ui-lib-custom/src/lib/carousel/carousel.component.ts (refactored activeNumVisible/activeNumScroll
    from WritableSignal to computed(responsiveOverride ?? input), added effect() for reactive circular clones,
    injected ChangeDetectorRef, removed duplicate private methods caused by file truncation repair)
  - projects/ui-lib-custom/src/lib/carousel/carousel.component.spec.ts (rewritten ConfigurableHostComponent
    to use WritableSignal properties so OnPush + zoneless CD picks up changes via .set())
  - upload.component.scss / upload.component.ts / upload.component.spec.ts (repaired pre-existing truncations)
  - virtual-scroller.component.scss / .ts / .spec.ts (repaired pre-existing truncations + null bytes)
State: Carousel component fully complete. Content-slider with numVisible/numScroll pagination, circular
  wrap-around, autoplay, touch/swipe, responsive breakpoints, keyboard-navigable indicator dots,
  three variants (material/bootstrap/minimal), three sizes, five content template slots. 44/44 unit
  tests passing. 38/38 entry-point tests passing. ESLint clean on all lib and demo files. Library build clean.
Verification:
  npx eslint projects/ui-lib-custom/src/lib/carousel/ projects/demo/src/app/pages/carousel/ --max-warnings 0 (CLEAN),
  npx ng build ui-lib-custom — ui-lib-custom/carousel ✔ Built,
  npx jest --testPathPatterns=carousel --no-cache (44/44 PASS),
