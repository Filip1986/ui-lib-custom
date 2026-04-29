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

- `ToggleButton` -> ✅ complete (implementation/tests/entry-point/demo/ESLint/build all green)
- `Textarea` -> ✅ complete (implementation/tests/entry-point/demo/ESLint/build all green)
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

Date: 2026-04-29 [toggle-button session]
Changed:
  - projects/ui-lib-custom/src/lib/toggle-button/ (new -- types, component, template, SCSS, spec, barrel)
  - projects/ui-lib-custom/toggle-button/ (new secondary entry point)
  - projects/ui-lib-custom/package.json (toggle-button added to exports + typesVersions)
  - projects/ui-lib-custom/test/entry-points.spec.ts (toggle-button import test added)
  - projects/demo/src/app/pages/toggle-button/ (full demo -- TS/HTML/SCSS, 9 sections)
  - AI_AGENT_CONTEXT.md (marked ToggleButton complete)
State: ToggleButton component fully complete. CVA (ngModel + reactive forms), model() two-way
  binding, onLabel/offLabel, onIcon/offIcon with ui-lib-icon, iconPos (left/right),
  allowEmpty, autofocus, ariaLabel/ariaLabelledBy, three variants (material/bootstrap/minimal),
  three sizes (sm/md/lg), disabled, role=switch + aria-checked, keyboard (Enter/Space),
  live announcements via LiveAnnouncerService, dark mode SCSS.
  36/36 unit tests passing. 48/48 entry-point tests passing. ESLint clean. Build zero errors.
Verification:
  npx eslint projects/ui-lib-custom/src/lib/toggle-button/ projects/demo/src/app/pages/toggle-button/ --max-warnings 0 (CLEAN),
  npx ng build ui-lib-custom (toggle-button Built, zero errors),
  npx jest --testPathPatterns="toggle-button" --no-cache (36/36 PASS),
  npx jest --testPathPatterns="entry-points" --no-cache (48/48 PASS).
Terminal notes: getHost() helper in spec must query querySelector('ui-lib-toggle-button') not
  use fixture.nativeElement directly (which is the wrapper host). ngModel init test needs
  double detectChanges/whenStable cycle in zoneless mode.
Next step: knip baseline + dead-code cleanup, or overlay follow-ups (appendTo / z-index manager).

Date: 2026-04-29 [textarea session]
Changed:
  - projects/ui-lib-custom/src/lib/textarea/ (new -- types, component, template, SCSS, spec, barrel)
  - projects/ui-lib-custom/textarea/ (new secondary entry point)
  - projects/ui-lib-custom/package.json (textarea added to exports + typesVersions)
  - projects/ui-lib-custom/test/entry-points.spec.ts (textarea import test added)
  - projects/demo/src/app/pages/textarea/ (full demo -- TS/HTML/SCSS, 10 sections)
  - AI_AGENT_CONTEXT.md (marked Textarea complete)
State: Textarea component fully complete. CVA (ngModel + reactive forms), auto-resize,
  char counter, maxLength, three variants (material/bootstrap/minimal), three sizes
  (sm/md/lg), disabled/readonly/required, ARIA labels/roles, focus/blur outputs.
  39/39 unit tests passing. 47/47 entry-point tests passing. ESLint clean. Build zero errors.
Verification:
  npx eslint projects/ui-lib-custom/src/lib/textarea/ ... --max-warnings 0 (CLEAN),
  npx ng build ui-lib-custom (all entry points Built, zero errors),
  npx jest --testPathPatterns="textarea" --no-cache (39/39 PASS),
  npx jest --testPathPatterns="entry-points" --no-cache (47/47 PASS).
Terminal notes: Edit/Write tools truncate files -- always use Python open(path,"w") for
  file writes. package.json, entry-points.spec.ts, and rating files restored from git
  via Python subprocess. Shell: bash in sandbox.
Next step: knip baseline + dead-code cleanup, or overlay follow-ups (appendTo/z-index manager).

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


