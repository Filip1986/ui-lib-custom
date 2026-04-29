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

- `Image` -> ✅ complete (implementation/tests/entry-point/demo/ESLint/build all green)
- `ToggleButton` -> ✅ complete (implementation/tests/entry-point/demo/ESLint/build all green)
- `Textarea` -> ✅ complete (implementation/tests/entry-point/demo/ESLint/build all green)
- `Galleria` -> ✅ complete (implementation/tests/entry-point/demo/ESLint/build all green)
- `TreeSelect` -> ✅ complete (implementation/tests/entry-point/demo/ESLint/build all green)
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

Date: 2026-04-29 [image session]
Changed:
  - projects/ui-lib-custom/src/lib/image/ (new — types, constants, component, template, SCSS, spec, barrel)
  - projects/ui-lib-custom/image/ (new secondary entry point — ng-package.json, package.json, public-api.ts)
  - projects/ui-lib-custom/package.json (image added to exports + typesVersions)
  - projects/ui-lib-custom/test/entry-points.spec.ts (image import test added)
  - projects/demo/src/app/pages/image/ (full demo — TS/HTML/SCSS, 9 sections + API table)
  - projects/demo/src/app/layout/sidebar/sidebar.component.ts (removed TODO badge from Image)
  - AI_AGENT_CONTEXT.md (marked Image complete)
State: Image component fully complete. PrimeNG-inspired image display component with optional
  preview overlay (lightbox). Hover indicator (eye icon by default) reveals on hover when
  preview=true. Preview overlay features toolbar with zoom-in/zoom-out (clamped 0.1–5),
  rotate-left/rotate-right (90° steps), and close button. Backdrop click and Escape key close
  the overlay. Error state with fallback src (errorSrc) or custom #imageError template.
  Custom #imageIndicator template slot. Two-way [(previewVisible)] binding. Three variants
  (material/bootstrap/minimal), three sizes (sm/md/lg), signal inputs/model outputs throughout,
  ViewEncapsulation.None + OnPush, ThemeConfigService variant inheritance.
  30/30 unit tests passing. 52/52 entry-point tests passing. ESLint clean. Build zero errors.
  Demo build zero errors (only pre-existing budget warnings in button/date-picker).
Verification:
  node ./node_modules/eslint/bin/eslint.js projects/ui-lib-custom/src/lib/image/ projects/demo/src/app/pages/image/ --max-warnings 0 (CLEAN, EXIT:0),
  npm run build — all entry points ✔ Built (including ui-lib-custom/image, zero errors),
  npm run build:demo — DEMO BUILD EXIT:0 (zero errors),
  npm test -- --testPathPatterns=src/lib/image/image.spec --no-coverage (30/30 PASS),
  npm test -- --testPathPatterns=entry-points --no-coverage (52/52 PASS).
Terminal notes: .bin/ shim files fail in bash with SyntaxError — use npm scripts or
  node ./node_modules/eslint/bin/eslint.js directly. Background terminal output
  requires get_terminal_output polling. Shell: bash.exe.
Next step: knip baseline + dead-code cleanup, or overlay follow-ups (appendTo / z-index manager).

Date: 2026-04-29 [galleria session]
Changed:
  - projects/ui-lib-custom/src/lib/galleria/ (new — types, constants, component, template, SCSS, spec, barrel)
  - projects/ui-lib-custom/galleria/ (new secondary entry point — ng-package.json, package.json, public-api.ts)
  - projects/ui-lib-custom/package.json (galleria added to exports + typesVersions; also restored truncated file from prior session)
  - projects/ui-lib-custom/test/entry-points.spec.ts (galleria import test added)
  - projects/demo/src/app/pages/gallery/ (new full demo — TS/HTML/SCSS, 9 sections + API table)
  - projects/demo/src/app/app.routes.ts (converted eager GalleryComponent route to lazy loadComponent)
  - projects/demo/src/app/layout/sidebar/sidebar.component.ts (renamed Gallery → Galleria in Media group)
  - projects/ui-lib-custom/src/lib/textarea/textarea.scss (null-byte corruption from prior session removed)
  - projects/ui-lib-custom/src/lib/textarea/index.ts (truncation from prior session restored from git)
  - projects/ui-lib-custom/src/lib/toggle-button/toggle-button.ts/.spec.ts/.scss (null-byte/truncation fixed)
  - projects/demo/src/app/pages/toggle-switch/* and tree-select/* (zero-byte files restored from git)
State: Galleria component fully complete. PrimeNG-inspired image/media gallery with item template,
  thumbnail strip (bottom/top/left/right positioning), dot indicators (standalone and on-item overlay),
  prev/next navigation arrows (always-on and hover-reveal modes), circular navigation, autoplay via
  NgZone.runOutsideAngular, fullscreen overlay mode (visible ModelSignal), thumbnail strip scroll
  navigation, caption overlay slot, header/footer slots, custom indicator slot, three variants
  (material/bootstrap/minimal), three sizes (sm/md/lg), signal inputs/model outputs throughout,
  ViewEncapsulation.None + OnPush, ThemeConfigService variant inheritance.
  39/39 unit tests passing. 51/51 entry-point tests passing. ESLint clean. Build zero errors.
  Also restored several files corrupted by null-byte/truncation from a prior session.
Verification:
  npx eslint projects/ui-lib-custom/src/lib/galleria/ projects/demo/src/app/pages/gallery/ --max-warnings 0 (CLEAN),
  npx ng build ui-lib-custom — all entry points ✔ Built (zero errors, incl. ui-lib-custom/galleria),
  npx jest --testPathPatterns="galleria" --no-coverage (39/39 PASS),
  npx jest --testPathPatterns="entry-points" --no-coverage (51/51 PASS).
Terminal notes: .git/index.lock stale lock from prior session blocked git status — worked around
  using git show HEAD:<file> directly for each corrupt file. Shell: bash in sandbox.
Next step: knip baseline + dead-code cleanup, or overlay follow-ups (appendTo / z-index manager).

Older handoffs are archived in `docs/implementation/AI_AGENT_CONTEXT_ARCHIVE.md`.

Handoff convention (when terminal commands are run in-session): include a short `Terminal notes:` subsection with failed command(s), successful workaround(s), and shell used.

Date: 2026-04-29 [tree-select session]
Changed:
  - projects/ui-lib-custom/src/lib/tree-select/ (new — types, constants, component, template, SCSS, spec, barrel)
  - projects/ui-lib-custom/tree-select/ (new secondary entry point — ng-package.json, package.json, public-api.ts)
  - projects/ui-lib-custom/package.json (tree-select added to exports + typesVersions)
  - projects/ui-lib-custom/test/entry-points.spec.ts (tree-select import test added)
  - projects/demo/src/app/pages/tree-select/ (full demo — TS/HTML/SCSS, 11 sections)
  - projects/demo/src/app/layout/sidebar/sidebar.component.ts (removed TODO badge from TreeSelect)
  - AI_AGENT_CONTEXT.md (marked TreeSelect complete)
State: TreeSelect component fully complete. Combobox-style overlay wrapping the existing Tree
  component. Supports single, multiple, and checkbox selection modes. CVA (ngModel + reactive
  forms), model() two-way binding for selection + panelVisible, three variants
  (material/bootstrap/minimal), three sizes (sm/md/lg), disabled/loading states, filter input
  passthrough, showClear button, full ARIA (role=combobox, aria-expanded, aria-haspopup="tree",
  aria-controls, aria-label/labelledby, aria-invalid, aria-disabled, aria-required), keyboard
  nav (Enter/Space opens, Escape closes, Tab closes).
  41/41 unit tests passing. 50/50 entry-point tests passing. ESLint clean. Build zero errors.
Verification:
  npx.cmd eslint projects/ui-lib-custom/src/lib/tree-select/ projects/demo/src/app/pages/tree-select/ --max-warnings 0 (CLEAN),
  npm run build — all entry points ✔ Built ui-lib-custom/tree-select (zero errors),
  npx.cmd jest --testPathPatterns="tree-select" --no-coverage (41/41 PASS),
  npx.cmd jest --testPathPatterns="entry-points" --no-coverage (50/50 PASS).
Terminal notes: No issues. Shell: bash.exe.
Next step: knip baseline + dead-code cleanup, or overlay follow-ups (appendTo / z-index manager).

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
  - docs/reference/components/README.md (added Slider section and quick-reference
