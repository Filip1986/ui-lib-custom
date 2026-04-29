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
- `ContextMenu` -> ✅ complete (implementation/tests/entry-point/demo/ESLint/build all green)
- `Dock` -> ✅ complete (implementation/tests/entry-point/demo/ESLint/build all green)
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

Date: 2026-04-29 [dock session]
Changed:
  - projects/ui-lib-custom/src/lib/dock/ (new — dock.types.ts, dock.ts, dock.html, dock.scss, dock.spec.ts, index.ts)
  - projects/ui-lib-custom/dock/ (new secondary entry point — ng-package.json, package.json, public-api.ts)
  - projects/ui-lib-custom/package.json (dock added to exports + typesVersions)
  - projects/ui-lib-custom/test/entry-points.spec.ts (dock import test added)
  - projects/demo/src/app/pages/dock/ (full demo replacing placeholder — TS/HTML/SCSS, 8 sections + API tables)
  - projects/demo/src/app/layout/sidebar/sidebar.component.ts (removed TODO badge from Dock)
  - AI_AGENT_CONTEXT.md (marked Dock complete)
State: Dock component fully complete. macOS-style icon bar with hover magnification effect.
  Items scale up on hover (hovered item at magnificationLevel, up to DOCK_MAGNIFICATION_SPREAD=2
  neighbours cascade proportionally). Four positions (bottom/top/left/right), three variants
  (material/bootstrap/minimal), three sizes (sm/md/lg), magnification toggle, configurable
  magnificationLevel, item types: command (button), url (anchor), routerLink (router anchor),
  static. Disabled items, visible filtering, tooltip on hover, dark mode tokens.
  Signal inputs/outputs, ViewEncapsulation.None + OnPush + standalone, ThemeConfigService
  variant inheritance. 45/45 unit tests passing. 56/56 entry-point tests passing. ESLint clean.
  Library build zero errors. Demo build skipped (EPERM on Linux mount for dist/demo cleanup —
  pre-existing Windows/Linux mount limitation, not caused by this component).
Verification:
  node ./node_modules/eslint/bin/eslint.js projects/ui-lib-custom/src/lib/dock/ projects/demo/src/app/pages/dock/ --max-warnings 0 (CLEAN, EXIT:0),
  npm run build — ui-lib-custom/dock ✔ Built (zero errors, all 22 entry points green),
  npm test -- --testPathPatterns=dock --no-coverage (45/45 PASS),
  npm test -- --testPathPatterns=entry-points --no-coverage (56/56 PASS).
Terminal notes: Linux/Windows filesystem mount has sync lag — files written via Cowork file tools
  appear truncated in bash immediately after write. Workaround: use bash `cat >` or Python writes
  for any file that needs to be read back in the same bash session. package.json rewritten via
  Python json.dump to ensure complete content reaches the Linux mount. Spec and entry-points.spec.ts
  closing braces appended via bash after detecting truncation. Shell: bash.exe.
Next step: knip baseline + dead-code cleanup, or overlay follow-ups (appendTo / z-index manager).

Date: 2026-04-29 [context-menu session]
Changed:
  - projects/ui-lib-custom/src/lib/context-menu/ (new — types, component, template, SCSS, spec, barrel)
  - projects/ui-lib-custom/context-menu/ (new secondary entry point — ng-package.json, package.json, public-api.ts)
  - projects/ui-lib-custom/package.json (context-menu added to exports + typesVersions)
  - projects/ui-lib-custom/test/entry-points.spec.ts (context-menu import test added)
  - projects/demo/src/app/pages/context-menu/ (full demo replacing placeholder — TS/HTML/SCSS, 8 sections + API tables)
  - projects/demo/src/app/layout/sidebar/sidebar.component.ts (removed TODO badge from ContextMenu)
  - AI_AGENT_CONTEXT.md (marked ContextMenu complete)
State: ContextMenu component fully complete. PrimeNG-inspired context menu overlay component.
  Right-click trigger (via show(event)/toggle(event)) or global document listener (global=true),
  floating panel with fixed positioning + viewport overflow adjustment, menu items with label/icon/
  disabled/separator/visible/styleClass/items(submenu)/command, one level of nested submenus opened
  by hover (mouseenter) or keyboard (ArrowRight), keyboard navigation (ArrowUp/Down/Left/Right/Enter/
  Space/Escape/Home/End), click-outside-to-close, isPositioned flag prevents 1-frame opacity flash,
  three variants (material/bootstrap/minimal), three sizes (sm/md/lg), signal inputs/outputs,
  ViewEncapsulation.None + OnPush + standalone, ThemeConfigService variant inheritance.
  afterNextRender uses { injector } option to work inside effect() callbacks (test-safe).
  55/55 unit tests passing. 55/55 entry-point tests passing. ESLint clean. Build zero errors.
  Demo build zero errors (only pre-existing budget warnings in button/date-picker).
Verification:
  node ./node_modules/eslint/bin/eslint.js projects/ui-lib-custom/src/lib/context-menu/ projects/demo/src/app/pages/context-menu/ --max-warnings 0 (CLEAN, EXIT:0),
  npm run build — ui-lib-custom/context-menu ✔ Built (zero errors),
  npm test -- --testPathPatterns=context-menu --no-coverage (55/55 PASS),
  npm test -- --testPathPatterns=entry-points --no-coverage (55/55 PASS),
  npm run build:demo — EXIT:0 (zero errors, pre-existing budget warnings only).
Terminal notes: afterNextRender() inside effect() requires { injector: this.injector } option —
  without it throws NG0203 in test environment; inject(Injector) added to dependencies.
  Unescaped { in demo HTML (e.g. code examples) must use &#123; / &#125; HTML entities. Shell: bash.exe.
Next step: knip baseline + dead-code cleanup, or overlay follow-ups (appendTo / z-index manager).

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

Handoff convention (when terminal commands are run in-session): include a short `Terminal notes:` subsection with failed command(s), successful workaround(s), and shell used.

