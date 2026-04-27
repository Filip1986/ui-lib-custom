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
  npx jest --testPathPatterns=entry-points --no-cache (38/38 PASS).
Terminal notes: File corruption (null bytes + mid-file truncation) is a recurring issue when the Write tool
  creates large files. Mitigation: always strip nulls via Python after every write; repair truncations with
  Python append rather than re-writing. The Edit tool sometimes silently fails on truncated files — verify
  with bash `tail` or `wc -l` before proceeding. activeNumVisible/activeNumScroll had to be refactored
  from WritableSignal to computed signals so that numVisible/numScroll input changes propagate reactively
  (WritableSignals set once in ngAfterContentInit don't react to later input changes).
Next step: Overlay follow-ups (appendTo / z-index manager), then component v2 enhancements by priority.

---

Date: 2026-04-27 [key-filter session]
Changed:
  - projects/ui-lib-custom/src/lib/key-filter/ (new — key-filter.types.ts, key-filter.directive.ts, key-filter.directive.spec.ts, index.ts, public-api.ts)
  - projects/ui-lib-custom/key-filter/ (new secondary entry point — ng-package.json, package.json)
  - projects/ui-lib-custom/package.json (added key-filter to exports + typesVersions; also repaired on-disk JSON truncation that was silently corrupting unrs-resolver)
  - projects/ui-lib-custom/test/entry-points.spec.ts (added key-filter import test)
  - projects/demo/src/app/pages/key-filter/ (full demo — TS/HTML/SCSS, 10 scenarios: all presets + custom RegExp + bypass toggle)
  - projects/ui-lib-custom/src/lib/input-otp/input-otp.component.ts (repaired: closing braces truncated)
  - projects/ui-lib-custom/src/lib/pick-list/pick-list.component.ts (repaired: trailing null bytes stripped)
  - jest.config.ts + tsconfig.jest.json (reverted to original state after debugging; root cause was corrupted package.json, not Jest config)
State: KeyFilter directive fully complete. Attribute directive with 9 built-in presets (pint/int/pnum/num/
  hex/alpha/alphanum/money/email), custom RegExp support, paste + drag-and-drop filtering with automatic
  character stripping, modifier-key pass-through, and runtime bypass toggle. 28/28 unit tests passing.
  40/40 entry-point tests passing. ESLint clean on lib and demo. Library build zero errors.
Verification:
  npx eslint projects/ui-lib-custom/src/lib/key-filter/ projects/demo/src/app/pages/key-filter/ --max-warnings 0 (CLEAN),
  npx ng build ui-lib-custom — all entry points ✔ Built (zero errors),
  npx jest --testPathPatterns="key-filter|entry-points" --no-cache (68/68 PASS).
Terminal notes: projects/ui-lib-custom/package.json was truncated on disk (203 lines, cut mid-string)
  — this caused unrs-resolver (Jest 30 Rust resolver) to fail with JSONError on ALL module resolution,
  masking itself as tslib/Angular/relative-import errors. Fix: rewrite the file via Python. Jest config
  was modified during diagnosis but ultimately reverted; original config works once package.json is valid.
  Spec file required eslint-disable on debugEl.nativeElement/.injector (typed as any by Angular) and
  explicit (): void return types on all describe() and it() callbacks.
Next step: Overlay follow-ups (appendTo / z-index manager), then knip baseline + dead-code cleanup.

