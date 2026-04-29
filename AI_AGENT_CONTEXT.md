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

- `Rating` -> ✅ complete (implementation/tests/entry-point/demo/docs/ESLint/build all green)
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

Date: 2026-04-29 [slider completion session]
Changed:
  - projects/ui-lib-custom/src/lib/slider/slider.ts (moved ElementRef to import type block)
  - projects/ui-lib-custom/src/lib/slider/slider.spec.ts (removed unused getDebugEl + By imports;
    fixed a11y beforeEach with double detectChanges cycle; fixed CVA test with
    changeDetectorRef.markForCheck() + double detectChanges)
  - docs/reference/components/SLIDER.md (new — full API + usage + theming + a11y + keyboard docs)
  - docs/reference/components/README.md (added Slider section and quick-reference table row)
  - AI_AGENT_CONTEXT.md (marked Slider complete)
State: Slider component fully complete. All 44 unit tests passing. 46/46 entry-point tests passing.
  ESLint clean. Library build zero errors.
Verification:
  npx.cmd eslint projects/ui-lib-custom/src/lib/slider/ projects/demo/src/app/pages/slider/ --max-warnings 0 (CLEAN),
  npx.cmd ng build ui-lib-custom (zero errors),
  npx.cmd jest --testPathPatterns="slider" --no-cache (44/44 PASS),
  npx.cmd jest --testPathPatterns="entry-points" --no-cache (46/46 PASS).
Terminal notes: No issues. Shell: bash.exe.
Next step: Overlay follow-ups (appendTo / z-index manager), or component v2 enhancements.

Date: 2026-04-28 [rating PrimeNG parity session]
Changed:
  - projects/ui-lib-custom/src/lib/rating/rating.ts (added autofocus, iconOnStyle/iconOffStyle inputs;
    rate/cleared/focus/blur outputs; onIconTemplate/offIconTemplate/cancelIconTemplate contentChild
    queries; toggle-deselect behavior; ElementRef inject for autofocus; afterNextRender autofocus impl)
  - projects/ui-lib-custom/src/lib/rating/rating.html (focus/blur handlers, ngStyle on icons,
    custom ng-template conditional rendering for on/off/cancel icons)
  - projects/ui-lib-custom/src/lib/rating/rating.types.ts (added RatingRateEvent interface)
  - projects/ui-lib-custom/src/lib/rating/index.ts (re-exported RatingRateEvent)
  - projects/ui-lib-custom/src/lib/rating/rating.spec.ts (added toggle-deselect, rate/cleared/
    focus/blur output tests, iconOnStyle/iconOffStyle tests; 52/52 total)
  - projects/demo/src/app/pages/rating/rating-demo.component.ts (events section, custom templates,
    inline icon styles)
  - projects/demo/src/app/pages/rating/rating-demo.component.html (3 new demo sections)
  - projects/demo/src/app/pages/rating/rating-demo.component.scss (demo-event-log styles)
  - Multiple files restored from git HEAD after sandbox corruption during session
State: Rating component fully PrimeNG v19 feature-parity. All 7 gaps closed. 52/52 tests.
  45/45 entry-point tests. ESLint clean. Library build zero errors. Demo build clean.
Verification:
  npx eslint projects/ui-lib-custom/src/lib/rating/ projects/demo/src/app/pages/rating/ --max-warnings 0 (CLEAN),
  npx ng build ui-lib-custom (49 entry points, zero errors),
  npx jest --testPathPatterns="rating" --no-cache (52/52 PASS),
  npx jest --testPathPatterns="entry-points" --no-cache (45/45 PASS),
  npx ng build demo --output-path /tmp/demo-build (Application bundle generation complete).
Terminal notes: Write tool corrupts files containing long lines with multi-byte UTF-8 chars
  (box-drawing U+2500). Fix: write such files via Python open(dest,'wb').write(content.encode('utf-8')).
  Several files (package.json, password.scss, sidebar.ts, listbox-demo.ts, radio-button-demo.ts,
  upload-demo.html, radio-button-demo.scss, rating-demo.scss) restored via
  git show HEAD:file > /tmp/x && python3 shutil.copy(). Shell: bash in sandbox.
  dist/demo folder is Windows-owned and cannot be deleted from sandbox — use --output-path /tmp/X
  to verify demo compilation.
Next step: Overlay follow-ups (appendTo / z-index manager), or component v2 enhancements.

---

Date: 2026-04-28 [rating session]
Changed:
  - docs/reference/components/RATING.md (new — full API + usage + theming + a11y + keyboard docs)
  - docs/reference/components/README.md (added Rating entry to component list and quick-reference table)
  - AI_AGENT_CONTEXT.md (marked Rating complete)
State: Rating component fully complete. Signal-based star-rating with hover preview, roving tabindex,
  ControlValueAccessor (ngModel + reactive forms), cancel/clear button, three variants
  (material/bootstrap/minimal), three sizes (sm/md/lg), full ARIA (role=radiogroup, role=radio,
  aria-checked, aria-posinset, aria-setsize), keyboard nav (ArrowRight/Left/Up/Down, Delete,
  digit keys). 40/40 unit tests passing. 45/45 entry-point tests passing. ESLint clean. Library
  build zero errors. Demo build clean (pre-existing button/date-picker SCSS budget warnings).
Verification:
  npx.cmd eslint projects/ui-lib-custom/src/lib/rating/ projects/demo/src/app/pages/rating/ --max-warnings 0 (CLEAN),
  npx.cmd ng build ui-lib-custom — all entry points ✔ Built (zero errors),
  npx.cmd jest --testPathPatterns="rating" --no-cache (40/40 PASS),
  npx.cmd jest --testPathPatterns="entry-points" --no-cache (45/45 PASS),
  npx.cmd ng build demo (Application bundle generation complete, zero new errors).
Terminal notes: No issues. Shell: bash.exe.
Next step: Overlay follow-ups (appendTo / z-index manager), or component v2 enhancements.

---

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



