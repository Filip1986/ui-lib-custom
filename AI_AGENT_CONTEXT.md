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

- `Breadcrumb` -> ✅ complete (implementation/tests/entry-point/demo/ESLint/build all green)
- `Image` -> ✅ complete (implementation/tests/entry-point/demo/ESLint/build all green)
- `ImageCompare` -> ✅ complete (implementation/tests/entry-point/demo/ESLint/build all green)
- `ToggleButton` -> ✅ complete (implementation/tests/entry-point/demo/ESLint/build all green)
- `Textarea` -> ✅ complete (implementation/tests/entry-point/demo/ESLint/build all green)
- `Galleria` -> ✅ complete (implementation/tests/entry-point/demo/ESLint/build all green)
- `TreeSelect` -> ✅ complete (implementation/tests/entry-point/demo/ESLint/build all green)
- `Rating` -> ✅ complete (implementation/tests/entry-point/demo/docs/ESLint/build all green)
- `Listbox` -> ✅ complete (implementation/tests/entry-point/demo/docs/ESLint/build all green)
- `RadioButton` -> ✅ complete (implementation/tests/entry-point/demo/ESLint/build all green)t
- 
- `Knob` -> ✅ complete (implementation/tests/entry-point/demo/ESLint/build all green)
- `KeyFilter` -> ✅ complete (implementation/tests/entry-point/demo/ESLint/build all green)
- `InputOtp` -> ✅ complete (implementation/tests/entry-point/demo/final QA complete)
- `Carousel` -> ✅ complete (implementation/tests/entry-point/demo/docs/final QA complete)
- `Upload` -> ✅ complete (implementation/tests/entry-point/demo/docs/final QA complete)
- `VirtualScroller` -> ✅ complete (implementation/tests/entry-point/demo/final QA complete)
- `Tree` -> ✅ complete (implementation/tests/entry-point/demo/docs/final QA complete)
- `ToggleSwitch` -> ✅ complete (implementation/tests/entry-point/demo/ESLint/build all green)
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

Date: 2026-04-29 [breadcrumb session]
Changed:
  - projects/ui-lib-custom/src/lib/breadcrumb/ (new — types, component, template, SCSS, spec, barrel)
  - projects/ui-lib-custom/breadcrumb/ (new secondary entry point — ng-package.json, package.json, public-api.ts)
  - projects/ui-lib-custom/package.json (breadcrumb added to exports + typesVersions)
  - projects/ui-lib-custom/test/entry-points.spec.ts (breadcrumb import test added)
  - projects/demo/src/app/pages/breadcrumb/ (full demo — TS/HTML/SCSS, 8 sections + API table)
  - projects/demo/src/app/layout/sidebar/sidebar.component.ts (removed TODO badge from Breadcrumb)
  - AI_AGENT_CONTEXT.md (marked Breadcrumb complete)
State: Breadcrumb component fully complete. PrimeNG-inspired breadcrumb navigation component.
  URL-based anchors, Angular RouterLink support, command callbacks (render as <button>),
  disabled items, home item, custom separator template (#separator), three variants
  (material/bootstrap/minimal), three sizes (sm/md/lg), ARIA nav landmark with aria-label,
  aria-current="page" on active (last) item, signal inputs/outputs throughout,
  ViewEncapsulation.None + OnPush, ThemeConfigService variant inheritance.
  37/37 unit tests passing. 54/54 entry-point tests passing. ESLint clean. Build zero errors.
  Demo build zero errors (only pre-existing budget warnings in button/date-picker).
Verification:
  node ./node_modules/eslint/bin/eslint.js projects/ui-lib-custom/src/lib/breadcrumb/ projects/demo/src/app/pages/breadcrumb/ --max-warnings 0 (CLEAN, EXIT:0),
  npm run build — ui-lib-custom/breadcrumb ✔ Built (zero errors),
  npm test -- --testPathPatterns=breadcrumb --no-coverage (37/37 PASS),
  npm test -- --testPathPatterns=entry-points --no-coverage (54/54 PASS),
  npm run build:demo — EXIT:0 (zero errors, pre-existing budget warnings only).
Terminal notes: jest.fn() requires explicit jest.Mock type; jest.spyOn requires jest.SpiedFunction<typeof ...>;
  optional chain on textContent needed (string | null) but linter warned — fixed with (x as string).trim() cast.
  Shell: bash.exe.
Next step: knip baseline + dead-code cleanup, or overlay follow-ups (appendTo / z-index manager).

Date: 2026-04-29 [image-compare session]
Changed:
  - projects/ui-lib-custom/src/lib/image-compare/ (new — types, constants, component, template, SCSS, spec, barrel)
  - projects/ui-lib-custom/image-compare/ (new secondary entry point — ng-package.json, package.json, public-api.ts)
  - projects/ui-lib-custom/package.json (image-compare added to exports + typesVersions)
  - projects/ui-lib-custom/test/entry-points.spec.ts (image-compare import test added)
  - projects/demo/src/app/pages/image-compare/ (full demo — TS/HTML/SCSS, 7 sections + API table)
  - projects/demo/src/app/layout/sidebar/sidebar.component.ts (removed TODO badge from ImageCompare)
  - AI_AGENT_CONTEXT.md (marked ImageCompare complete)
State: ImageCompare component fully complete. PrimeNG-inspired before/after image comparison slider.
  Two images (leftImage/rightImage) overlaid on a container; the right image is clipped via
  clip-path:inset to reveal only the portion past the divider position. Draggable handle (pointer
  capture for smooth tracking), click-anywhere-to-reposition, full keyboard navigation
  (ArrowLeft/Right ±1%, PageUp/Down ±10%, Home=0%, End=100%), two-way [(value)] binding (0–100),
  slideStart/slideEnd outputs, disabled state, three variants (material/bootstrap/minimal),
  three sizes (sm/md/lg), signal inputs/model outputs throughout, ViewEncapsulation.None + OnPush,
  ThemeConfigService variant inheritance.
  37/37 unit tests passing. 53/53 entry-point tests passing. ESLint clean. Build zero errors.
  Demo build zero errors (only pre-existing budget warnings in button/date-picker).
Verification:
  node ./node_modules/eslint/bin/eslint.js projects/ui-lib-custom/src/lib/image-compare/ projects/demo/src/app/pages/image-compare/ --max-warnings 0 (CLEAN, EXIT:0),
  npm run build — ui-lib-custom/image-compare ✔ Built (zero errors),
  npm test -- --testPathPatterns=image-compare --no-coverage (37/37 PASS),
  npm test -- --testPathPatterns=entry-points --no-coverage (53/53 PASS),
  npm run build:demo — EXIT:0 (zero errors, pre-existing budget warnings only).
Terminal notes: PointerEvent not defined in JSDOM — used stub object with setPointerCapture mock
  and called component method directly instead of dispatching DOM event. Shell: bash.exe.
Next step: knip baseline + dead-code cleanup, or overlay follow-ups (appendTo / z-index manager).

Date: 2026-04-29 [image-compare session]

Handoff convention (when terminal commands are run in-session): include a short `Terminal notes:` subsection with failed command(s), successful workaround(s), and shell used.

