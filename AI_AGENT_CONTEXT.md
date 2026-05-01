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
- `Message` -> ✅ complete (implementation/tests/entry-point/demo/ESLint/build all green)
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

Date: 2026-04-30 [message session]
Changed:
  - projects/ui-lib-custom/src/lib/message/ (new — message.types.ts, message.ts, message.html, message.scss, message.spec.ts, index.ts)
  - projects/ui-lib-custom/message/ (new secondary entry point — ng-package.json, package.json, public-api.ts)
  - projects/ui-lib-custom/package.json (message added to exports + typesVersions; pre-existing truncation fixed)
  - projects/ui-lib-custom/test/entry-points.spec.ts (message import test added; pre-existing truncation fixed)
  - projects/demo/src/app/pages/message/ (full demo replacing placeholder — TS/HTML/SCSS)
  - projects/demo/src/app/layout/sidebar/sidebar.component.ts (removed TODO badge from Message)
  - projects/ui-lib-custom/src/lib/tiered-menu/tiered-menu-sub.scss (pre-existing truncation repaired)
  - projects/ui-lib-custom/src/lib/tiered-menu/tiered-menu.scss (pre-existing truncation repaired)
  - projects/ui-lib-custom/src/lib/tiered-menu/tiered-menu-sub.ts (pre-existing NUL bytes stripped)
  - projects/ui-lib-custom/src/lib/tiered-menu/tiered-menu.ts (pre-existing truncation repaired)
  - AI_AGENT_CONTEXT.md (marked Message complete)
State: Message component fully complete. PrimeNG-inspired inline severity-based message with:
  - Six severity levels (success, info, warn, error, secondary, contrast) each with colour palette + default icon
  - Three design variants (material: elevated/no-border, bootstrap: filled+border, minimal: transparent + left accent border)
  - Three sizes (sm, md, lg)
  - text input for programmatic content; ng-content for rich projection (both usable simultaneously)
  - icon input to override the default severity icon
  - closable input + close output (button with aria-label)
  - styleClass escape-hatch input
  - role="status" + aria-live="polite" on host
  - Dark mode tokens for all six severities
  - Signal inputs/outputs, ViewEncapsulation.None + OnPush + standalone
  - ThemeConfigService variant inheritance
  - Secondary entry point wired (ui-lib-custom/message)
  - 26 unit tests passing. 62/62 entry-point tests passing. ESLint clean. Build zero errors.
Verification:
  node ./node_modules/eslint/bin/eslint.js projects/ui-lib-custom/src/lib/message/ projects/demo/src/app/pages/message/ --max-warnings 0 (CLEAN, EXIT:0),
  npm run build — ui-lib-custom/message Built (zero errors, all entry points green),
  npx jest --testPathPatterns=message --no-coverage (26/26 PASS),
  npx jest --testPathPatterns=entry-points --no-coverage (62/62 PASS).
Terminal notes: Edit tool caused file truncations; used Python to repair all affected files.
  Cross-entry-point import bug fixed: ../icon -> ui-lib-custom/icon.
  Pre-existing truncations in tiered-menu-sub.scss, tiered-menu.scss, tiered-menu-sub.ts,
  tiered-menu.ts also repaired during this session.
Next step: knip baseline + dead-code cleanup, or constants extraction pass.

Date: 2026-04-30 [tiered-menu session]
Changed:
  - projects/ui-lib-custom/src/lib/tiered-menu/ (new — tiered-menu.types.ts, tiered-menu-sub.ts, tiered-menu-sub.html, tiered-menu-sub.scss, tiered-menu.ts, tiered-menu.html, tiered-menu.scss, tiered-menu.spec.ts, index.ts)
  - projects/ui-lib-custom/tiered-menu/ (new secondary entry point — ng-package.json, package.json)
  - projects/ui-lib-custom/package.json (tiered-menu added to exports + typesVersions; pre-existing NUL-byte truncation fixed)
  - projects/ui-lib-custom/test/entry-points.spec.ts (tiered-menu import test added; file was truncated — repaired and completed)
  - projects/demo/src/app/pages/tiered-menu/ (full demo replacing placeholder — TS/HTML/SCSS, 7 sections + API + keyboard tables)
  - AI_AGENT_CONTEXT.md (marked TieredMenu complete)
State: TieredMenu component fully complete. PrimeNG-inspired hierarchical flyout menu with:
  - Arbitrarily deep recursive nesting via internal TieredMenuSubComponent (self-referential imports)
  - Inline mode (always rendered in flow) and popup mode (floating overlay, anchored to trigger element)
  - toggle(event) / show(event) / hide() public API for popup mode
  - Viewport overflow correction for popup positioning
  - Items: leaf items, items-with-children (flyout arrow + sub-panel on hover/keyboard), separators,
    disabled items, url/target anchor items, visible=false, styleClass, command callbacks
  - Three variants (material/bootstrap/minimal), three sizes (sm/md/lg)
  - Signal inputs/outputs, ViewEncapsulation.None + OnPush + standalone
  - ThemeConfigService variant inheritance
  - Keyboard navigation (ArrowDown/Up navigate list, ArrowRight open flyout, ArrowLeft/Escape close flyout,
    Enter/Space activate, Home/End jump to first/last, Escape closes popup)
  - itemClick, menuShow, menuHide outputs
  - Dark mode tokens
  - 25 unit tests passing (all host components use WritableSignal for proper OnPush + zoneless propagation)
  - 61/61 entry-point tests passing. ESLint clean. Build zero errors.
  - Also fixed pre-existing NUL bytes in mega-menu.ts, mega-menu.spec.ts, mega-menu/index.ts, menu.ts
Verification:
  node ./node_modules/eslint/bin/eslint.js projects/ui-lib-custom/src/lib/tiered-menu/ projects/demo/src/app/pages/tiered-menu/ --max-warnings 0 (CLEAN, EXIT:0),
  npm run build — ui-lib-custom/tiered-menu ✔ Built (zero errors, all 61+ entry points green),
  npx jest --testPathPatterns=tiered-menu --no-coverage (25/25 PASS),
  npx jest --testPathPatterns=entry-points --no-coverage (61/61 PASS).
Terminal notes: Shell bash (Linux sandbox). Used Python scripts for all file writes to avoid encoding issues.
  package.json was truncated (pre-existing) — fully rewritten via Python.
  entry-points.spec.ts was truncated — repaired by appending missing it() blocks via Python.
  NUL bytes found in mega-menu.ts, mega-menu.spec.ts, mega-menu/index.ts, menu.ts — stripped with Python.
Next step: knip baseline + dead-code cleanup, or constants extraction pass.


Date: 2026-04-30 [panel-menu session]
Changed:
  - projects/ui-lib-custom/src/lib/panel-menu/ (new — panel-menu.types.ts, panel-menu-context.ts, panel-menu-sub.ts, panel-menu-sub.html, panel-menu.ts, panel-menu.html, panel-menu.scss, panel-menu.spec.ts, index.ts)
  - projects/ui-lib-custom/panel-menu/ (new secondary entry point — ng-package.json, package.json)
  - projects/ui-lib-custom/package.json (panel-menu added to exports + typesVersions)
  - projects/ui-lib-custom/test/entry-points.spec.ts (panel-menu import test added)
  - projects/demo/src/app/pages/panel-menu/ (full demo replacing placeholder — TS/HTML/SCSS, 8 sections + API tables)
  - projects/demo/src/app/layout/sidebar/sidebar.component.ts (removed TODO badge from PanelMenu)
  - AI_AGENT_CONTEXT.md (marked PanelMenu complete)
State: PanelMenu component fully complete. PrimeNG-inspired accordion-style hierarchical navigation menu with:
  - Data-driven model array (PanelMenuItem[]) at root level
  - Root items with children render as collapsible panels with CSS grid height animation
  - Recursive sub-items via internal PanelMenuSubComponent (self-referential imports)
  - Arbitrarily deep nesting with indentation via --pm-depth CSS variable
  - single mode (multiple=false, default) collapses siblings when expanding
  - multiple mode allows arbitrary number of open panels simultaneously
  - item.expanded=true initializes panel as open on first render
  - Leaf items (no children) are directly activatable — emit itemClick + invoke command
  - URL leaf items render as anchor tags with href/target
  - Disabled items and root panels
  - Separator items at root and sub levels
  - visible=false hides items from rendering
  - PanelMenuContext injection token for prop-drilling-free recursive communication
  - Three variants (material/bootstrap/minimal), three sizes (sm/md/lg)
  - Signal inputs/outputs, ViewEncapsulation.None + OnPush + standalone
  - ThemeConfigService variant inheritance
  - Keyboard navigation (Enter/Space toggle/activate, ArrowUp/Down navigate headers, Home/End)
  - panelToggle output for root panel expand/collapse events
  - Dark mode tokens
  - 25 unit tests passing. 60/60 entry-point tests passing. ESLint clean. Build zero errors.
Verification:
  node ./node_modules/eslint/bin/eslint.js projects/ui-lib-custom/src/lib/panel-menu/ projects/demo/src/app/pages/panel-menu/ --max-warnings 0 (CLEAN, EXIT:0),
  npm run build — ui-lib-custom/panel-menu ✔ Built (zero errors, all entry points green),
  npx jest --testPathPatterns=panel-menu --no-coverage (25/25 PASS),
  npx jest --testPathPatterns=entry-points --no-coverage (60/60 PASS).
Terminal notes: Shell bash.exe on Windows. Used Python scripts to write files due to encoding issues.
  panel-menu-context.ts was initially written with wrong encoding, corrected via Python with utf-8.
Next step: knip baseline + dead-code cleanup, or TieredMenu component.

Date: 2026-04-30 [menubar session]
Changed:
  - projects/ui-lib-custom/src/lib/menubar/ (new — menubar.types.ts, menubar-submenu.ts, menubar-submenu.html, menubar-submenu.scss, menubar.ts, menubar.html, menubar.scss, menubar.spec.ts, index.ts)
  - projects/ui-lib-custom/menubar/ (new secondary entry point — ng-package.json, package.json)
  - projects/ui-lib-custom/package.json (menubar added to exports + typesVersions)
  - projects/ui-lib-custom/test/entry-points.spec.ts (menubar import test added)
  - projects/demo/src/app/pages/menubar/ (new demo page — TS/HTML/SCSS, 8 sections + API tables)
  - projects/demo/src/app/layout/sidebar/sidebar.component.ts (removed TODO badge from Menubar)
  - AI_AGENT_CONTEXT.md (marked Menubar complete)
State: Menubar component fully complete. PrimeNG-inspired horizontal navigation bar with:
  - Horizontal root-level items (role="menubar") with click-to-open single-column dropdown panels
  - Recursive nested submenus opening to the right (via internal MenubarSubComponent that imports itself)
  - Start/end content projection ([menubarStart] / [menubarEnd] attribute selectors)
  - Mobile responsive: hamburger toggle button, inline dropdowns on mobile
  - Three variants (material/bootstrap/minimal), three sizes (sm/md/lg)
  - Signal inputs/outputs, ViewEncapsulation.None + OnPush + standalone
  - ThemeConfigService variant inheritance
  - Keyboard navigation (Enter/Space open, ArrowDown focus first item, Escape close, ArrowRight open nested, ArrowLeft/Escape close nested, ArrowUp/Down navigate within submenu)
  - Disabled items, separators, URL/target anchor items, command callbacks, itemClick output
  - Click-outside and global Escape listener
  - Dark mode tokens
  - 42 unit tests passing. 59/59 entry-point tests passing. ESLint clean. Build zero errors.
Verification:
  node ./node_modules/eslint/bin/eslint.js projects/ui-lib-custom/src/lib/menubar/ projects/demo/src/app/pages/menubar/ --max-warnings 0 (CLEAN, EXIT:0),
  npm run build — ui-lib-custom/menubar ✔ Built (zero errors, all entry points green),
  npx jest --testPathPatterns=menubar --no-coverage (42/42 PASS),
  npx jest --testPathPatterns=entry-points --no-coverage (59/59 PASS).
Terminal notes: Shell bash.exe on Windows. Used Python scripts to write files due to bash history expansion
  issues with exclamation marks in inline Python heredocs. All files written via python tmp/create_*.py scripts.
Next step: knip baseline + dead-code cleanup, or overlay follow-ups (appendTo / z-index manager).

Date: 2026-04-30 [mega-menu completion session]
Changed:
  - projects/demo/src/app/pages/mega-menu/mega-menu-demo.component.html (fixed ESLint parse error — replaced {{ '...' }} code-block interpolations with escaped HTML entities &#123;/&#125;/&lt;/&gt;)
State: MegaMenu component fully complete. PrimeNG-inspired mega-menu component with
  horizontal/vertical orientations, multi-column dropdown panels, three variants
  (material/bootstrap/minimal), three sizes (sm/md/lg), signal inputs/outputs,
  ViewEncapsulation.None + OnPush + standalone, ThemeConfigService variant inheritance,
  keyboard navigation (Enter/Space open, Escape/Tab close, ArrowDown focuses first sub-item),
  disabled items, separators, URL/target anchor items, command callbacks, itemClick output,
  click-outside and global Escape listener, dark mode tokens.
  51 unit tests passing. 58/58 entry-point tests passing. ESLint clean. Build zero errors.
Verification:
  npx eslint projects/ui-lib-custom/src/lib/mega-menu/ projects/demo/src/app/pages/mega-menu/ --max-warnings 0 (CLEAN, EXIT:0),
  npm run build — ui-lib-custom/mega-menu ✔ Built (zero errors, all entry points green),
  npx jest --testPathPatterns=mega-menu --no-coverage (51/51 PASS),
  npx jest --testPathPatterns=entry-points --no-coverage (58/58 PASS).
Terminal notes: Shell bash.exe on Windows. The previous agent had left one ESLint parse error
  in mega-menu-demo.component.html (line 22, "Unexpected closing block") caused by `{{ '...' }}`
  interpolation in <pre><code> blocks — the Angular ESLint parser misread `}}` as block-closing
  syntax. Fixed by replacing all five code-display interpolations with escaped HTML entities.
Next step: knip baseline + dead-code cleanup, or overlay follow-ups (appendTo / z-index manager).

Date: 2026-04-30 [menu session]
Changed:
  - projects/ui-lib-custom/src/lib/menu/ (new — menu.types.ts, menu.ts, menu.html, menu.scss, menu.spec.ts, index.ts)
  - projects/ui-lib-custom/menu/ (new secondary entry point — ng-package.json, package.json)
  - projects/ui-lib-custom/package.json (menu added to exports + typesVersions)
  - projects/ui-lib-custom/test/entry-points.spec.ts (menu import test added)
  - projects/demo