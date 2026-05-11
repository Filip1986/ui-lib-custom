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
- **Active focus:** RadioButton (#23) and Password (#29) accessibility hardening COMPLETE; next is Rating (#30)
- **Next queue:** Rating hardening (Tier 3, #30) — role=radiogroup or role=slider, keyboard interaction
- **Horizon:** Runtime variant switcher, theme preset management, broader axe-core audit ✅ (infra in place)

### Component/Docs Delta (Active Only)

- `Accordion` -> ✅ complete + hardened (6-phase, score 9.0/10, 51 tests — 33 unit + 18 a11y)
- `TieredMenu` -> ✅ complete + hardened (6-phase evolution, score 9.0/10, 70 tests — 28 unit + 42 a11y)
- `Menu` -> ✅ complete + hardened (6-phase evolution, score 9.0/10, 89 tests — 44 unit + 45 a11y)
- `Menubar` -> ✅ complete + hardened (6-phase evolution, score 9.0/10, 84 tests — 42 unit + 42 a11y)
- `MegaMenu` -> ✅ complete + hardened (6-phase, score 9.0/10, 95 tests — 51 unit + 44 a11y)
- `RadioButton` -> ✅ complete + hardened (6-phase, 64 tests — 40 unit + 24 a11y)
- `Password` -> ✅ complete + hardened (6-phase, 73 tests — 49 unit + 24 a11y)

---

## Known Blockers / Watch Items

- Non-blocking Jest warning seen during a11y run:
  - `jest-haste-map: Haste module naming collision: ui-lib-custom`
  - between root `package.json` and `projects/ui-lib-custom/package.json`
- Demo build shows pre-existing SCSS budget warnings in `button` and `date-picker` -- not a blocker

---

## Recent Handoffs

Date: 2026-05-11 [RadioButton component — 6-phase Hardening COMPLETE (#23)]
Changed:
  - projects/ui-lib-custom/src/lib/radio-button/radio-button.ts
      • Added `onNativeKeydown(event: KeyboardEvent)`: ArrowDown/Right moves to next
        non-disabled sibling in the group (by name attribute), wrapping; ArrowUp/Left moves
        to previous; both call `.focus()` + `.click()` on the target native input
      • CSS.escape() with jsdom-safe fallback for name attribute selector safety
  - projects/ui-lib-custom/src/lib/radio-button/radio-button.html
      • Added `[attr.aria-disabled]="isDisabled() ? 'true' : null"` to native input
      • Added `[attr.aria-required]="required() ? 'true' : null"` to native input
      • Added `(keydown)="onNativeKeydown($event)"` binding to native input
  - projects/ui-lib-custom/src/lib/radio-button/radio-button.scss
      • Added `@media (prefers-reduced-motion: reduce)` block: `transition: none` on __box and __icon
  - projects/ui-lib-custom/src/lib/radio-button/radio-button.a11y.spec.ts (CREATED — 24 tests)
      • ID/label association: unique IDs, label for/id, aria-labelledby→label element, unique label IDs
      • Group ARIA: role=radiogroup, aria-labelledby→group label, aria-required reflects groupRequired
      • aria-required/aria-disabled on individual native inputs
      • Tabindex: enabled radios have tabindex=0 (browsers implement roving natively), disabled→-1
      • Keyboard navigation: ArrowDown/Right/Up/Left select + move focus; wrap from last→first,
        first→last; disabled radio skipped in navigation
      • axe-core: no selection, one selected, disabled item, group aria-required
  - projects/ui-lib-custom/src/lib/radio-button/README.md
      • Added Keyboard Navigation table (Tab/Shift+Tab/Arrow/Space)
      • Added Accessibility section with two group labeling patterns (fieldset/legend + role=radiogroup)
      • Added ReactiveFormsModule usage example and disabled option example
  - docs/COMPONENT_SCORES.md
      • RadioButton: ⏳ Queued → ✅ Done
State: RadioButton fully hardened. 64 tests pass (40 unit + 24 a11y). Build clean.
Verification:
  npx eslint projects/ui-lib-custom/src/lib/radio-button/ --max-warnings 0 (EXIT 0)
  node_modules/.bin/jest --testPathPatterns=radio-button --no-coverage (64/64 PASS)
  node_modules/.bin/ng build ui-lib-custom (PASS, zero errors)
  node_modules/.bin/jest --testPathPatterns=entry-points --no-coverage (97/97 PASS)
Terminal notes: node_modules/.bin/ prefix required for jest/ng; npx works for eslint after npm install.
Next step: Rating hardening (Tier 3, #30).

Date: 2026-05-11 [Knob component — accessibility hardening COMPLETE (#31)]
Changed:
  - projects/ui-lib-custom/src/lib/knob/knob.component.ts
      • Moved slider semantics to host (`role=slider`, `aria-valuenow/min/max/valuetext`, keyboard + pointer handlers)
      • Added `getValueText()` helper for `aria-valuetext`
      • Added requestAnimationFrame-throttled drag updates and RAF cleanup on pointer-up/destroy
  - projects/ui-lib-custom/src/lib/knob/knob.component.html
      • Marked SVG as decorative (`aria-hidden="true"`, `focusable="false"`)
      • Removed interactive ARIA/event bindings from SVG
  - projects/ui-lib-custom/src/lib/knob/knob.component.scss
      • Added `prefers-reduced-motion: reduce` block (`--uilib-knob-transition-duration: 0ms`)
  - projects/ui-lib-custom/src/lib/knob/knob.component.spec.ts
      • Updated ARIA assertions to target knob host element semantics
  - projects/ui-lib-custom/src/lib/knob/knob.a11y.spec.ts (CREATED — 21 tests)
      • Added role/ARIA assertions, keyboard equivalence coverage, disabled behavior, decorative SVG checks
      • Added axe checks for default, min, max, and disabled states
  - projects/ui-lib-custom/src/lib/knob/README.md
      • Added accessibility behavior and keyboard support table
  - docs/COMPONENT_SCORES.md
      • Knob queue status set to ✅ Done; score row populated (avg 8.2)
State: Knob hardening complete with host-level slider semantics, keyboard parity for drag operations,
  decorative SVG semantics, reduced-motion support, and dedicated a11y test coverage.
Verification:
  node_modules/.bin/eslint projects/ui-lib-custom/src/lib/knob/ --max-warnings 0 (PASS)
  node_modules/.bin/jest --testPathPatterns=knob --no-coverage (56/56 PASS)
  node_modules/.bin/ng build ui-lib-custom (PASS)
  node_modules/.bin/jest --testPathPatterns=entry-points --no-coverage (97/97 PASS)
Terminal notes: Installed dependencies via `npm install` in fresh clone before running validation commands.
Next step: Table (#32) hardening — start Tier 4 Data Display.

Date: 2026-05-11 [MegaMenu component — 6-phase Hardening COMPLETE (#16)]
Changed:
  - projects/ui-lib-custom/src/lib/mega-menu/mega-menu.ts
      • Added module-level `let nextMegaMenuId: number = 0` counter
      • Added `menuId`, `panelId` public readonly strings for ARIA wiring
      • Added `rovingIndex: WritableSignal<number>` for root-level roving tabindex
      • Added `panelOpened: OutputEmitterRef<MegaMenuItem>` and `panelClosed: OutputEmitterRef<void>` outputs
      • Added `getRootTabIndex(item, index): string` for template tabindex binding
      • Added `getRootItemClass(item, index): string` to clean up template class logic
      • Updated `onTopItemClick` to set rovingIndex, emit panelOpened/panelClosed
      • Updated `onTopItemKeyDown`: ArrowRight/Left navigate root items; ArrowDown/Up for vertical;
        Home/End; all paths set rovingIndex; Enter/Space focus first panel item via afterNextRender
      • Updated `onSubItemKeyDown`: ArrowUp/Down within column, ArrowLeft/Right between columns, Escape restores focus
      • Updated click-outside handler to call `closePanel(false)` (no focus restore)
      • Updated global Escape handler to call `closePanel(true)` (restore focus)
      • Updated `closePanel(returnFocus=true)`: restores focus to triggering root link on keyboard close
      • Added `focusRootItem(index)`: sets rovingIndex + calls `.focus()` with wrap-around
      • Added `focusPanelItemInDirection(direction, fromEl)`: column-aware panel keyboard nav
  - projects/ui-lib-custom/src/lib/mega-menu/mega-menu.html
      • CRITICAL: `aria-haspopup="true"` → `aria-haspopup="menu"` (correct WAI-ARIA value)
      • CRITICAL: Added `[attr.aria-orientation]="orientation()"` to root `<ul role="menubar">`
      • CRITICAL: Added `[attr.aria-controls]="item.items?.length ? panelId : null"` on root links
      • CRITICAL: Added `[attr.id]="panelId"` on mega panel `<div>`
      • CRITICAL: Added `[attr.aria-label]="item.label ? (item.label + ' submenu') : null"` on panel
      • CRITICAL: Added `[attr.aria-label]="column.header || null"` on column `<ul role="menu">`
      • Changed root link tabindex from `item.disabled ? '-1' : '0'` to `getRootTabIndex(item, $index)`
  - projects/ui-lib-custom/src/lib/mega-menu/mega-menu.scss
      • Added `@media (prefers-reduced-motion: reduce)` block with `--uilib-mega-menu-transition: 0ms`
  - projects/ui-lib-custom/src/lib/mega-menu/mega-menu.a11y.spec.ts (CREATED — 44 tests)
  - docs/COMPONENT_SCORES.md
      • MegaMenu: ⏳ Queued → ✅ Done; score row 9/9/9/9/9/9/9/9/9/9 avg 9.0 🟢
State: MegaMenu fully hardened. 95 tests pass (51 unit + 44 a11y). Build clean.
Verification:
  node_modules/.bin/eslint projects/ui-lib-custom/src/lib/mega-menu/ --max-warnings 0 (EXIT 0)
  node_modules/.bin/jest --testPathPatterns=mega-menu --no-coverage (95/95 PASS)
  node_modules/.bin/ng build ui-lib-custom (PASS, zero errors)
  node_modules/.bin/jest --testPathPatterns=entry-points --no-coverage (97/97 PASS)
Terminal notes: node_modules/.bin/ prefix required for all CLI tools; npm install required first.
Next step: Tabs hardening (Tier 2, #17) — role=tablist/tab/tabpanel, arrow nav, aria-selected.
