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
- **Active focus:** Toast component complete; resuming backlog
- **Next queue:** `knip` baseline and dead-code cleanup, constants extraction pass, overlay follow-ups (`appendTo`/z-index manager), component v2 enhancements by priority
- **Horizon:** Runtime variant switcher, theme preset management, Storybook integration, broader axe-core audit

### Component/Docs Delta (Active Only)

- `Toast` -> ✅ complete (implementation/tests/entry-point/demo/ESLint/build all green)
- `Message` -> ✅ complete (implementation/tests/entry-point/demo/ESLint/build all green)
- `Breadcrumb` -> ✅ complete (implementation/tests/entry-point/demo/ESLint/build all green)
- `ContextMenu` -> ✅ complete (implementation/tests/entry-point/demo/ESLint/build all green)
- `Dock` -> ✅ complete (implementation/tests/entry-point/demo/ESLint/build all green)
- `Menu` -> ✅ complete (implementation/tests/entry-point/demo/ESLint/build all green)
- `MegaMenu` -> ✅ complete (implementation/tests/entry-point/demo/ESLint/build all green)
- `Menubar` -> ✅ complete (implementation/tests/entry-point/demo/ESLint/build all green)
- `PanelMenu` -> ✅ complete (implementation/tests/entry-point/demo/ESLint/build all green)
- `TieredMenu` -> ✅ complete (implementation/tests/entry-point/demo/ESLint/build all green)
- `Image` -> ✅ complete (implementation/tests/entry-point/demo/ESLint/build all green)
- `ImageCompare` -> ✅ complete (implementation/tests/entry-point/demo/ESLint/build all green)
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

Date: 2026-05-01 [toast session]
Changed:
  - projects/ui-lib-custom/src/lib/toast/ (new — toast.types.ts, toast.service.ts, toast.ts, toast.html, toast.scss, toast.spec.ts, index.ts)
  - projects/ui-lib-custom/toast/ (new secondary entry point — ng-package.json, package.json, public-api.ts)
  - projects/ui-lib-custom/package.json (toast added to exports + typesVersions; pre-existing truncation repaired)
  - projects/ui-lib-custom/test/entry-points.spec.ts (toast import test added; pre-existing truncation repaired)
  - projects/demo/src/app/pages/toast/ (full demo replacing placeholder — TS/HTML/SCSS)
  - projects/demo/src/app/layout/sidebar/sidebar.component.ts (Toast added alongside Message in Messages group)
  - AI_AGENT_CONTEXT.md (marked Toast complete)
State: Toast component fully complete. PrimeNG-inspired fixed-position notification overlay driven by injectable ToastService:
  - ToastService (providedIn root): WritableSignal<ToastMessage[]> queue; add()/remove()/clear() API; auto-generated IDs
  - 6 positions: top-right/left/center, bottom-right/left/center
  - Severity levels: success, info, warn, error (each with default icon via SEVERITY_ICON_MAP)
  - Auto-dismiss timers managed reactively in effect(); sticky messages exempt
  - Exit animation via closingIds WritableSignal<Set<string>> + CSS @keyframes (300ms)
  - key input for multi-container routing
  - Three variants (material/bootstrap/minimal), custom icons, styleClass escape-hatch
  - Signal inputs/outputs, ViewEncapsulation.None + OnPush + standalone
  - ThemeConfigService variant inheritance
  - ARIA: role=region, aria-label=Notifications, aria-live=polite, aria-atomic=false
  - Dark mode tokens for all 4 severities + material/minimal variants
  - 31 unit tests passing. 63/63 entry-point tests passing. ESLint clean. Build zero errors.
Verification:
  node ./node_modules/eslint/bin/eslint.js projects/ui-lib-custom/src/lib/toast/ projects/demo/src/app/pages/toast/ --max-warnings 0 (CLEAN, EXIT:0),
  npm run build — ui-lib-custom/toast Built (zero errors, all entry points green),
  npx jest --testPathPatterns=toast --no-coverage (31/31 PASS),
  npx jest --testPathPatterns=entry-points --no-coverage (63/63 PASS).
Terminal notes: Edit tool caused file truncations throughout session; used Python binary-mode appends to repair
  entry-points.spec.ts, package.json (full rewrite via json.dump), and toast.spec.ts (null byte strip + append).
  ESLint fixes: constructor() not public constructor() (explicit-member-accessibility rule);
  requireElement() helper used in tests to avoid no-unnecessary-condition on optional chaining.
Next step: knip baseline + dead-code cleanup, or constants extraction pass.

Date: 2026-04-30 [message session]
Changed:
  - projects/ui-lib-custom/src/lib/message/ (new — message.types.ts, message.ts, message.html, message.scss, message.spec.ts, index.ts)
  - projects/ui-lib-custom/message/ (new secondary entry point — ng-package.json, package.json, public-api.ts)
  - projects/ui-lib-custom/package.json (message added to exports + typesVersions; pre-existing truncation fixed)
  - projects/ui-lib-custom/test/entry-points.spec.ts (message import test added; pre-existing truncation fixed)
  - projects/demo/src/app/pages/message/ (full demo replacing placeholder — TS/HTML/SCSS)
  - projects/demo/src/app/layout/sidebar/sidebar.component.ts (removed TODO badge from Message)
  - projects/ui-lib-custom/src/lib/tiered-menu/ (pre-existing truncations repaired: tiered-menu-sub.scss, .scss, .ts, tiered-menu.ts)
  - AI_AGENT_CONTEXT.md (marked Message complete)
State: Message component fully complete. 26 unit tests passing. 62/62 entry-point tests passing. ESLint clean. Build zero errors.
Verification:
  node ./node_modules/eslint/bin/eslint.js projects/ui-lib-custom/src/lib/message/ projects/demo/src/app/pages/message/ --max-warnings 0 (CLEAN, EXIT:0),
  npm run build — ui-lib-custom/message Built (zero errors, all entry points green),
  npx jest --testPathPatterns=message --no-coverage (26/26 PASS),
  npx jest --testPathPatterns=entry-points --no-coverage (62/62 PASS).
Terminal notes: Edit tool caused file truncations; used Python to repair all affected files. Cross-entry-point import bug fixed: ../icon -> ui-lib-custom/icon.
Next step: knip baseline + dead-code cleanup, or constants extraction pass.

Date: 2026-04-30 [tiered-menu session]
Changed:
  - projects/ui-lib-custom/src/lib/tiered-menu/ (new — tiered-menu.types.ts, tiered-menu-sub.ts, tiered-menu-sub.html, tiered-menu-sub.scss, tiered-menu.ts, tiered-menu.html, tiered-menu.scss, tiered-menu.spec.ts, index.ts)
  - projects/ui-lib-custom/tiered-menu/ (new secondary entry point — ng-package.json, package.json)
  - projects/ui-lib-custom/package.json (tiered-menu added to exports + typesVersions; pre-existing NUL-byte truncation fixed)
  - projects/ui-lib-custom/test/entry-points.spec.ts (tiered-menu import test added; file was truncated — repaired and completed)
  - projects/demo/src/app/pages/tiered-menu/ (full demo replacing placeholder — TS/HTML/SCSS, 7 sections + API + keyboard tables)
  - AI_AGENT_CONTEXT.md (marked TieredMenu complete)
State: TieredMenu component fully complete. 25 unit tests passing. 61/61 entry-point tests passing. ESLint clean. Build zero errors.
  Also fixed pre-existing NUL bytes in mega-menu.ts, mega-menu.spec.ts, mega-menu/index.ts, menu.ts.
Verification:
  node ./node_modules/eslint/bin/eslint.js projects/ui-lib-custom/src/lib/tiered-menu/ projects/demo/src/app/pages/tiered-menu/ --max-warnings 0 (CLEAN, EXIT:0),
  npm run build — ui-lib-custom/tiered-menu Built (zero errors, all 61+ entry points green),
  npx jest --testPathPatterns=tiered-menu --no-coverage (25/25 PASS),
  npx jest --testPathPatterns=entry-points --no-coverage (61/61 PASS).
Terminal notes: Shell bash (Linux sandbox). Used Python scripts for all file writes to avoid encoding issues. package.json was truncated — fully rewritten via Python. entry-points.spec.ts was truncated — repaired by appending missing it() blocks.
Next step: knip baseline + dead-code cleanup, or constants extraction pass.
