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
- **Active focus:** Checkbox hardening COMPLETE (Tier 3, #22)
- **Next queue:** RadioButton hardening (Tier 3, #23) — key a11y: `role=radiogroup`, `aria-required`, keyboard focus between siblings
- **Horizon:** Runtime variant switcher, theme preset management, broader axe-core audit ✅ (infra in place)

### Component/Docs Delta (Active Only)

- `TieredMenu` -> ✅ complete + hardened (6-phase evolution, score 9.0/10, 70 tests — 28 unit + 42 a11y)
- `Menu` -> ✅ complete + hardened (6-phase evolution, score 9.0/10, 89 tests — 44 unit + 45 a11y)
- `Menubar` -> ✅ complete + hardened (6-phase evolution, score 9.0/10, 84 tests — 42 unit + 42 a11y)

---

## Known Blockers / Watch Items

- Non-blocking Jest warning seen during a11y run:
  - `jest-haste-map: Haste module naming collision: ui-lib-custom`
  - between root `package.json` and `projects/ui-lib-custom/package.json`
- Demo build shows pre-existing SCSS budget warnings in `button` and `date-picker` -- not a blocker

---

## Recent Handoffs

Date: 2026-05-10 [Breadcrumb component — 6-phase hardening COMPLETE]
Changed:
  - projects/ui-lib-custom/src/lib/breadcrumb/breadcrumb.ts
      • Added module-level `let nextBreadcrumbId: number = 0` counter
      • Added `breadcrumbId` unique per instance and bound it to host `[attr.id]`
      • Added `model` InputSignal (aliased to public `[items]` binding for compatibility)
      • Added `firstItemTemplate` content child for first-item composability
      • Added `getItemAriaLabel()` + `isHomeItem()` helpers
      • Added `BREADCRUMB_DEFAULT_HOME_ARIA_LABEL` export (`'Home'`)
  - projects/ui-lib-custom/src/lib/breadcrumb/breadcrumb.html
      • Kept semantic `<ol>` structure and last-item `aria-current="page"` behavior
      • Updated `@for` tracking to `track item.label`
      • Added `aria-label` bindings for icon-only item naming
      • Added optional first-item template projection support in all item branches
  - projects/ui-lib-custom/src/lib/breadcrumb/breadcrumb.types.ts
      • Added `iconAriaLabel?: string` to `BreadcrumbItem`
  - projects/ui-lib-custom/src/lib/breadcrumb/breadcrumb.a11y.spec.ts (CREATED — 18 tests)
      • Covers landmark label/default/custom, ordered list semantics, last-item semantics,
        separator aria-hidden behavior, home icon naming, first-item projection, and axe checks
      • axe scenarios: 2-item breadcrumb, 3-item breadcrumb, home-icon-first breadcrumb
  - projects/ui-lib-custom/src/lib/breadcrumb/README.md
      • Documented `iconAriaLabel`, first-item template projection, routerLink vs url guidance,
        and breadcrumb CSS custom properties
  - docs/COMPONENT_SCORES.md
      • Queue item #20 Breadcrumb: ⏳ Queued → ✅ Done
      • Breadcrumb score row: 9/9/9/9/9/9/9/9/9/9 avg 9.0 🟢
State: Breadcrumb is fully hardened through the 6-phase pass with a11y-first changes and dedicated a11y coverage.
Verification:
  node_modules/.bin/eslint projects/ui-lib-custom/src/lib/breadcrumb/ --max-warnings 0 (EXIT 0)
  node_modules/.bin/jest --testPathPatterns=breadcrumb --no-coverage (54/54 PASS)
  node_modules/.bin/ng build ui-lib-custom (PASS)
  node_modules/.bin/jest --testPathPatterns=entry-points --no-coverage (97/97 PASS)
Terminal notes:
  - Captured Breadcrumb demo screenshot: `/tmp/breadcrumb-demo.png`
  - `playwright-browser_*` MCP tools could not be used due browser lock; screenshot captured via
    `npx playwright screenshot` after `npx playwright install chromium`
Next step: Input hardening (#21) — start Tier 3 form controls with label/validation ARIA pass.

Date: 2026-05-10 [Checkbox component — 6-phase hardening COMPLETE]
Changed:
  - projects/ui-lib-custom/src/lib/checkbox/checkbox.ts
      • Renamed module counter to `nextCheckboxId` and exposed per-instance `checkboxId`
      • Added `viewChild` + `afterRenderEffect` sync so native input `.indeterminate` property follows the `indeterminate` signal
      • Kept `ariaChecked` tri-state behavior (`false` / `true` / `mixed`) intact
      • Updated host click handling to avoid double-toggle when clicking associated internal label
  - projects/ui-lib-custom/src/lib/checkbox/checkbox.html
      • Added native input template ref (`#nativeInput`) for indeterminate property sync
      • Added `aria-required` and `aria-disabled` bindings
      • Updated visible label element to `<label>` with `for` mapped to native input `id`
      • Marked checkmark and indeterminate icons as `aria-hidden="true"`
  - projects/ui-lib-custom/src/lib/checkbox/checkbox.scss
      • Added `--uilib-checkbox-transition-duration` token and wired transitions to it
      • Added `@media (prefers-reduced-motion: reduce)` to set transition duration to `0ms`
  - projects/ui-lib-custom/src/lib/checkbox/checkbox.a11y.spec.ts
      • Expanded from 1 test to 20 tests covering id/for linkage, aria-checked tri-state,
        required/disabled aria reflection, icon aria-hidden, unique ids, and 5 axe scenarios
        (unchecked, checked, indeterminate, disabled, required)
  - projects/ui-lib-custom/src/lib/checkbox/README.md
      • Added explicit accessibility behavior notes (`aria-checked`, `aria-required`, `aria-disabled`)
      • Documented group-labeling as consumer responsibility (`fieldset/legend` or `role="group"`)
      • Added CVA/forms note and CSS custom property + reduced-motion note
  - docs/COMPONENT_SCORES.md
      • Tier 3 queue row #22 Checkbox: ⏳ Queued → ✅ Done
      • Checkbox score row: 9/9/9/9/9/9/9/9/9/9 avg 9.0 🟢
State: Checkbox hardening complete with accessibility-critical requirements implemented
  (indeterminate mixed state, unique ids, explicit label association, reduced motion support,
  group-labeling documentation, and expanded a11y test coverage).
Verification:
  node_modules/.bin/eslint projects/ui-lib-custom/src/lib/checkbox/ --max-warnings 0 (CLEAN, EXIT:0)
  node_modules/.bin/jest --testPathPatterns=checkbox --no-coverage (67/67 PASS)
  node_modules/.bin/ng build ui-lib-custom (PASS)
  node_modules/.bin/jest --testPathPatterns=entry-points --no-coverage (97/97 PASS)
  Screenshot: /tmp/checkbox-hardening.png (demo route: /checkbox)
Terminal notes: Playwright browser binaries were installed with `npx playwright install chromium`
  to capture demo screenshot in this environment.
Next step: RadioButton hardening (Tier 3, #23).

Date: 2026-05-10 [axe-core full-page sweep — Playwright e2e infrastructure]
Changed:
  - e2e/a11y-full-sweep.spec.ts (CREATED)
      • Visits all 91 non-redirect demo routes from app.routes.ts
      • Each route: page.goto + waitForLoadState('networkidle') + AxeBuilder
      • Tags: wcag2a, wcag2aa, wcag21a, wcag21aa
      • Globally disabled: color-contrast (theming deferred), aria-required-children
        (false positive for role="menu" + role="none" li wrapper per WAI-ARIA spec)
      • Violations attached as axe-violations.json on failure for easy triage
      • runAxeSweep() helper keeps per-test body one-liner for readability
  - package.json
      • Added "test:a11y:e2e:sweep": "playwright test e2e/a11y-full-sweep.spec.ts"
      • Updated "test:a11y:all" to include sweep after the existing e2e pass
State: Sweep infrastructure complete. Run npm run test:a11y:e2e:sweep (requires demo
  running at localhost:4200) to surface existing violations across all 70+ components.
  The sweep asserts zero violations — pages with pre-existing violations will fail and
  produce an attached JSON report pinpointing exact rule, element, and impact level.
Verification: File created; package.json scripts verified. No demo server available
  to do a live run in this session.
Terminal notes: playwright test picks up all *.spec.ts in e2e/ automatically; the sweep
  is also available as a named script for targeted runs without the full suite.
Next step: ContextMenu hardening (Tier 2, #14) OR run the sweep against a live demo
  to identify the highest-severity violations across unscored components.

Date: 2026-05-10 [TieredMenu component — 6-phase hardening COMPLETE]
Changed:
  - projects/ui-lib-custom/src/lib/tiered-menu/tiered-menu.ts
      • Added module-level `let nextTieredMenuId: number = 0` counter
      • Added `public readonly menuId: string` (unique per instance, e.g. `'ui-lib-tiered-menu-1'`)
      • Added `private previousFocusEl: HTMLElement | null = null` for focus restoration
      • `show()` now captures `documentRef.activeElement` as `previousFocusEl`
      • `hide(restoreFocus: boolean = true)` — public API defaults to restoring focus;
        internal click-outside and toggle-close pass `false` explicitly
      • `clickOutsideHandler` updated to call `hide(false)` (no restore on outside click)
      • `keydownHandler` Escape updated to call `hide(true)` (restore focus)
      • Added `onEscapeMenu()` — receives `escapeMenu` output from root TieredMenuSub;
        calls `hide(true)` in popup mode (closes + restores focus)
  - projects/ui-lib-custom/src/lib/tiered-menu/tiered-menu.html
      • Added `[attr.id]="menuId"` to panel `<div>` for unique ID binding
      • Added `[ariaLabel]="ariaLabel()"` to root `<ui-lib-tiered-menu-sub>`
      • Added `(escapeMenu)="onEscapeMenu()"` binding on root sub
  - projects/ui-lib-custom/src/lib/tiered-menu/tiered-menu-sub.ts
      • Added `ariaLabel: InputSignal<string>` input (default `''`)
      • Added `escapeMenu: OutputEmitterRef<void>` output
      • Split `ArrowLeft` and `Escape` cases in `onItemKeyDown()`:
          - ArrowLeft: `activeIndex.set(-1)` only (no emit, does not close popup)
          - Escape: `activeIndex.set(-1)` + `escapeMenu.emit()` (propagates up to popup close)
      • Added Tab case in `onItemKeyDown()`: emit `escapeMenu` WITHOUT `preventDefault()`
        so Tab key moves focus naturally while popup closes
      • Added `onNestedEscapeMenu(index: number)`: closes child flyout + re-emits `escapeMenu` upward
  - projects/ui-lib-custom/src/lib/tiered-menu/tiered-menu-sub.html
      • CRITICAL FIX: Removed `aria-hidden="true"` from separator `<li role="separator">`
      • Added `[attr.aria-label]="ariaLabel() || null"` to root `<ul role="menu">`
      • Added `[ariaLabel]="item.label ?? ''"` to nested `<ui-lib-tiered-menu-sub>`
        so every `<ul role="menu">` has an accessible name
      • Added `(escapeMenu)="onNestedEscapeMenu($index)"` to nested sub for propagation chain
  - projects/ui-lib-custom/src/lib/tiered-menu/tiered-menu.scss
      • Added `@media (prefers-reduced-motion: reduce)` block — disables popup slide-in animation
  - projects/ui-lib-custom/src/lib/tiered-menu/tiered-menu-sub.scss
      • Added `@media (prefers-reduced-motion: reduce)` block — disables flyout animation + link transitions
  - projects/ui-lib-custom/src/lib/tiered-menu/tiered-menu.a11y.spec.ts
      • Fixed naming conflict in `PopupHostComponent`: template ref `#menu` → `#tieredMenu`,
        class property `menu` → `menuRef` (prevents Angular template variable shadowing)
      • Updated all `fixture.componentInstance.menu()` calls to `menuRef()`
      • Updated `openPopup` helper to use `menuRef()`
  - docs/COMPONENT_SCORES.md
      • TieredMenu queue: ⏳ Queued → ✅ Done (Tier 2 #13)
      • TieredMenu score row: 9/9/9/9/9/9/9/9/9/9 avg 9.0 🟢
  - AI_AGENT_CONTEXT.md (this file — status updated)
State: TieredMenu component fully evolved through all 6 phases. Score 9.0/10.
  Phase 3 (A11y — priority):
    • CRITICAL FIX: Separator `aria-hidden="true"` removed — `role="separator"` conveys
      structural grouping to screen readers; `aria-hidden` was suppressing that info
    • CRITICAL FIX: `ariaLabel` now flows to root `<ul role="menu">` — all menus
      have an accessible name; root gets the component's `ariaLabel` input,
      nested menus get the parent item's label
    • CRITICAL FIX: `menuId` unique per instance — panel gets `[attr.id]="menuId"`;
      trigger can use `[attr.aria-controls]="menu.menuId"` for correct ARIA wiring
    • CRITICAL FIX: Focus restoration — `show()` captures `previousFocusEl`;
      `hide(true)` restores via `afterNextRender`; global Escape + `onEscapeMenu()` both
      call `hide(true)`; click-outside passes `hide(false)`
    • MODERATE FIX: `escapeMenu` propagation chain — each sub emits on Escape/Tab;
      parent subs relay via `onNestedEscapeMenu()`; root TieredMenu closes popup
    • MODERATE FIX: Tab closes popup without `preventDefault` — Tab key navigates
      naturally while popup panel is dismissed
    • MODERATE FIX: ArrowLeft / Escape split — ArrowLeft at any level closes child
      flyout only; Escape propagates all the way up to popup close
    • MODERATE FIX: `@media (prefers-reduced-motion: reduce)` added to both SCSS files
  Phase 1 (Architecture): nextTieredMenuId, menuId, previousFocusEl, hide(restoreFocus),
    onEscapeMenu(), ariaLabel input, escapeMenu output, onNestedEscapeMenu() all added.
  Phase 2 (DX): README (pre-existing) already documents all new APIs accurately.
  Phase 4 (Performance): No structural changes. Existing signal/effect/cleanup patterns intact.
  Phase 5 (Composability): escapeMenu output enables custom wrappers to observe dismiss events.
  Phase 6 (Polish): Reduced-motion blocks added to both SCSS files.
Verification:
  node_modules/.bin/eslint projects/ui-lib-custom/src/lib/tiered-menu/ --max-warnings 0 (CLEAN, EXIT:0)
  node_modules/.bin/jest --testPathPatterns=tiered-menu --no-coverage (70/70 PASS — 28 unit + 42 a11y)
  node_modules/.bin/jest --testPathPatterns=entry-points --no-coverage (97/97 PASS)
  node_modules/.bin/ng build ui-lib-custom — Built, zero errors, zero warnings
Terminal notes: Run ESLint from bash.exe (PowerShell returns exit 1 even on clean runs).
  Template variable shadowing: avoid naming both a class Signal property and a template ref
  variable with the same name — Angular gives precedence to the template variable.
  afterNextRender focus restoration fires on the next detectChanges() in test context.
Next step: ContextMenu hardening (Tier 2, #14) — same as TieredMenu + trigger aria-haspopup=menu.
      • afterEach: fixture.destroy() for DOM cleanup
  - projects/ui-lib-custom/src/lib/menubar/README.md
      • Replaced 1-section stub with full documentation:
        MenubarItem interface table, Public Properties table, Content Projection table,
        ARIA structure table, keyboard navigation table, roving tabindex section,
        multiple navbars guidance, CSS custom properties table (7 tokens)
  - docs/COMPONENT_SCORES.md
      • Menubar queue entry: ⏳ Queued → ✅ Done (Tier 2 #11)
      • Menubar score row: 9/9/9/9/9/9/9/9/9/9 avg 9.0 🟢
  - AI_AGENT_CONTEXT.md (this file — status updated)
  - docs/implementation/AI_AGENT_CONTEXT_ARCHIVE.md (Popover handoff archived)
State: Menubar component fully evolved through all 6 phases. Score 9.0/10.
  Phase 3 (A11y — priority):
    • CRITICAL FIX: ArrowLeft/Right/Home/End navigation on root level — implements full ARIA
      menubar keyboard pattern; previously keyboard users had no way to navigate between root
      items without Tab (which should exit the menubar, not cycle within it)
    • MODERATE FIX: Unique instance ID counter (nextMenubarId) + rootListId — eliminates
      duplicate-ID bug when multiple Menubar instances appear on the same page
    • MODERATE FIX: Roving tabindex on root items — only one root item in the tab sequence;
      Tab now exits the menubar (correct ARIA menubar behavior)
    • MODERATE FIX: Escape/ArrowLeft from level-1 submenu returns focus to the triggering
      root item (via escapePanel output from MenubarSubComponent + onSubMenuEscape)
    • MODERATE FIX: closePanel(returnFocus) — Escape restores focus; click-outside does not
    • MODERATE FIX: Toggle button :focus-visible ring added (was the only interactive element without one)
    • MODERATE FIX: @media (prefers-reduced-motion: reduce) added — sets transition to 0ms
    • Created menubar.a11y.spec.ts with 42 tests (all pass)
    • Pre-existing a11y features verified intact: nav landmark, role=menubar, role=menu,
      role=none on li wrappers, role=menuitem, aria-haspopup, aria-expanded, aria-disabled,
      aria-hidden on icons/carets/toggle-bars, aria-orientation=vertical, role=separator,
      DOCUMENT injection, ngOnDestroy listener cleanup, afterNextRender for focus
  Phase 1 (Architecture): nextMenubarId counter, menubarId, rootListId, rovingIndex all added.
    closePanel(returnFocus) param, focusRootItem(), onSubMenuEscape() all added.
  Phase 2 (DX): README fully updated — MenubarItem interface table, Public Properties,
    Content Projection, ARIA structure, keyboard nav, roving tabindex, multiple navbars, CSS vars.
  Phase 4 (Performance): No structural changes. All patterns verified — effect() for global
    listeners, afterNextRender({ injector }) for focus, computed visibleItems, querySelector at event time.
  Phase 5 (Composability): No API changes. Two slot projection, ariaLabel uniqueness, command +
    itemClick dual pattern, recursive nesting all verified.
  Phase 6 (Polish): Toggle :focus-visible ring added. Reduced motion added. All other styling
    verified intact — caret rotation, panel appear animation, nested right-open, mobile inline,
    dark mode, 3 variants, disabled pointer-events.
Verification:
  node_modules/.bin/eslint projects/ui-lib-custom/src/lib/menubar/ --max-warnings 0 (CLEAN, EXIT:0)
  node_modules/.bin/jest --testPathPatterns=menubar --no-coverage (84/84 PASS — 42 unit + 42 a11y)
  node_modules/.bin/jest --testPathPatterns=entry-points --no-coverage (97/97 PASS)
  node_modules/.bin/ng build ui-lib-custom — Built, zero errors, zero warnings
Terminal notes: Run ESLint from bash.exe (PowerShell returns exit 1 even on clean runs).
  aria-required-children axe rule is a false positive for role="menu" with role="none" li wrappers
  per WAI-ARIA spec — skip it in MENUBAR_AXE_RULES with an explanatory comment.
  (Content archived — see docs/implementation/AI_AGENT_CONTEXT_ARCHIVE.md)


Date: 2026-05-10 [Toast component — 6-phase hardening COMPLETE]
→ Archived to docs/implementation/AI_AGENT_CONTEXT_ARCHIVE.md


Date: 2026-05-10 [Storybook coverage — 11 new story files]
Changed:
  - projects/ui-lib-custom/src/lib/dialog/dialog.stories.ts (CREATED)
  - projects/ui-lib-custom/src/lib/autocomplete/autocomplete.stories.ts (CREATED)
  - projects/ui-lib-custom/src/lib/dynamic-dialog/dynamic-dialog.stories.ts (CREATED)
  - projects/ui-lib-custom/src/lib/drawer/drawer.stories.ts (CREATED)
  - projects/ui-lib-custom/src/lib/confirm-dialog/confirm-dialog.stories.ts (CREATED)
  - projects/ui-lib-custom/src/lib/confirm-popup/confirm-popup.stories.ts (CREATED)
  - projects/ui-lib-custom/src/lib/popover/popover.stories.ts (CREATED)
  - projects/ui-lib-custom/src/lib/tooltip/tooltip.stories.ts (CREATED)
  - projects/ui-lib-custom/src/lib/toast/toast.stories.ts (CREATED)
  - projects/ui-lib-custom/src/lib/menubar/menubar.stories.ts (CREATED)
  - projects/ui-lib-custom/src/lib/menu/menu.stories.ts (CREATED)
State: Storybook coverage raised from ~25% to ~55% of published components. Each file has
  Default/Variants(material+bootstrap+minimal)/States/DarkMode/FullApi stories.
  Service-driven overlays use applicationConfig() for provider injection.
  Tooltip uses directive pattern ([uiLibTooltip]). All 11 files pass ESLint + typecheck.
  PR #36 open at https://github.com/Filip1986/ui-lib-custom/pull/36
Verification:
  npx eslint <all 11 story files> --max-warnings 0 (CLEAN, EXIT:0)
  npm run typecheck (PASS, zero errors)
  git commit ffcf9ed — pre-commit lint-staged CLEAN
Terminal notes: Storybook build-storybook fails due to pre-existing compodoc version mismatch
  (npx pulls deprecated compodoc@0.0.41 instead of @compodoc/compodoc). Not caused by new files.
  Use `npm run storybook` (ng run ui-lib-custom:storybook) to run Storybook in dev mode.
Next step: ContextMenu hardening (Tier 2, #14) — key a11y: trigger aria-haspopup=menu,
  escape/click-outside focus restoration, same as TieredMenu pattern.

---
