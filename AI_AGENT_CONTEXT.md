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
  - projects/demo/src/app/pages/menu/ (full demo replacing placeholder — TS/HTML/SCSS, 9 sections + API tables)
  - projects/demo/src/app/layout/sidebar/sidebar.component.ts (removed TODO badge from Menu)
  - AI_AGENT_CONTEXT.md (marked Menu complete)
State: Menu component fully complete. PrimeNG-inspired menu component supporting both static (inline)
  and popup modes. Static: panel always rendered in the DOM flow. Popup: toggle(event)/show(event)/hide()
  API, anchored to trigger element bounding rect, viewport overflow correction. Items: flat leaf items,
  labelled groups (top-level item with `items` array becomes group header), separators, disabled items,
  url/target anchor items, icon support, styleClass escape hatch, command callbacks + itemClick output.
  Keyboard nav: ArrowUp/Down, Home/End, Enter/Space (activate), Escape (close popup). Three variants
  (material/bootstrap/minimal), three sizes (sm/md/lg). Signal inputs/outputs, ViewEncapsulation.None
  + OnPush + standalone, ThemeConfigService variant inheritance. Dark mode tokens.
  65 unit tests passing (menu spec). 57/57 entry-point tests passing. ESLint clean. Build zero errors.
Verification:
  node ./node_modules/eslint/bin/eslint.js projects/ui-lib-custom/src/lib/menu/ projects/demo/src/app/pages/menu/ --max-warnings 0 (CLEAN, EXIT:0),
  npm run build — ui-lib-custom/menu ✔ Built (zero errors, all entry points green),
  npx jest --testPathPatterns=menu --no-coverage (65 tests PASS — menu.spec + context-menu + sidebar-menu suites),
  npx jest --testPathPatterns=entry-points --no-coverage (57/57 PASS).
Terminal notes: Linux/Windows mount sync lag continued — package.json truncated again (fixed via
  Python json.dump), entry-points.spec.ts truncated (appended missing closing via Python string replace),
  menu.spec.ts truncated multiple times (full file rewritten via Python heredoc). Shell: bash (Linux sandbox).
Next step: knip baseline + dead-code cleanup, or overlay follow-ups (appendTo / z-index manager).

Date: 2026-04-30 [dock icon fix session]
Changed:
  - projects/ui-lib-custom/src/lib/dock/dock.ts (added `Icon` to component imports)
  - projects/ui-lib-custom/src/lib/dock/dock.html (replaced <span class="pi pi-*"> with <ui-lib-icon>)
  - projects/ui-lib-custom/src/lib/dock/dock.scss (.ui-lib-dock__item-icon now sizes SVG via CSS var)
  - projects/ui-lib-custom/src/lib/dock/dock.types.ts (updated `icon` JSDoc for ui-lib-icon names)
  - projects/demo/src/app/pages/dock/dock-demo.component.ts (pi pi-* → bootstrapHouse/bootstrapGear/etc.)
State: Dock icons now render correctly. Root cause: demo used PrimeIcons CSS class strings (pi pi-*)
  but the demo app loads @ng-icons/core via provideUiLibIcons() — PrimeIcons font is not registered.
  Fix: dock template now renders <ui-lib-icon [name]="item.icon"> instead of <span class="{{ item.icon }}">.
  SCSS targets ui-lib-dock .ui-lib-dock__item-icon svg { width/height: var(--uilib-dock-icon-size) }
  to override NgIcon's inline SVG sizing. Demo items updated to use registered bootstrap icon names
  (bootstrapHouse, bootstrapGear, bootstrapTrash, bootstrapEnvelope, bootstrapBell, etc.).
  DockItem.icon JSDoc updated to describe ui-lib-icon name format.
  45/45 unit tests passing. ESLint clean. Library build zero errors.
Verification:
  npx eslint projects/ui-lib-custom/src/lib/dock/ projects/demo/src/app/pages/dock/ --max-warnings 0 (CLEAN),
  npm run build — ui-lib-custom/dock ✔ Built (zero errors, all entry points green),
  npx jest --testPathPatterns=dock (45/45 PASS).
Terminal notes: Linux/Windows mount sync lag continued — galleria.ts had NUL bytes padding (stripped
  with Python rstrip b'\x00'), package.json truncated again (rewritten via Python json.dump),
  dock.scss truncated (rewritten via bash heredoc). All mount corrections applied before build.
  Shell: bash (Linux sandbox).
Next step: knip baseline + dead-code cleanup, or overlay follow-ups (appendTo / z-index manager).


Handoff convention (when terminal commands are run in-session): include a short `Terminal notes:` subsection with failed command(s), successful workaround(s), and shell used.

