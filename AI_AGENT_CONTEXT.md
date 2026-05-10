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
- `Active focus:** Stepper compound component complete; resuming backlog
- **Next queue:** AutoComplete hardening COMPLETE → ConfirmDialog hardening is next (Tier 1, #6); then ConfirmPopup, Popover, Tooltip, Toast
- **Horizon:** Runtime variant switcher, theme preset management, Storybook integration, broader axe-core audit

### Component/Docs Delta (Active Only)

- `DynamicDialog` -> ✅ complete (implementation/tests/entry-point/demo/ESLint/build all green)
- `Stepper` -> ✅ complete (implementation/tests/entry-point/demo/ESLint/build all green)
- `ScrollPanel` -> ✅ complete (implementation/tests/entry-point/demo/ESLint/build all green)
- `Panel` -> ✅ complete (implementation/tests/entry-point/demo/ESLint/build all green)
- `Fieldset` -> ✅ complete (implementation/tests/entry-point/demo/ESLint/build all green)
- `Tooltip` -> ✅ complete (implementation/tests/entry-point/demo/ESLint/build all green)
- `Popover` -> ✅ complete (implementation/tests/entry-point/demo/ESLint/build all green)
- `Drawer` -> ✅ complete + hardened (6-phase evolution, score 8.5/10, a11y spec added)
- `Select` -> ✅ complete + hardened (6-phase evolution, score 8.2/10, 49 a11y tests, all axe-core pass)
- `AutoComplete` -> ✅ complete + hardened (6-phase evolution, score 8.2/10, 52 a11y tests, all axe-core pass)

- `Divider` -> ✅ complete (implementation/tests/entry-point/demo/ESLint/build all green)
- `Toolbar` -> ✅ complete (implementation/tests/entry-point/demo/ESLint/build all green)

- `Terminal` -> ✅ complete (implementation/tests/entry-point/demo/ESLint/build all green)

- `Tag` -> ✅ complete (implementation/tests/entry-point/demo/ESLint/build all green)

- `Skeleton` -> ✅ complete (implementation/tests/entry-point/demo/ESLint/build all green)

- `BottomSheet` -> ✅ complete (implementation/tests/entry-point/demo/ESLint/build all green)

- `ConfirmDialog` -> ✅ complete + hardened (6-phase evolution, score 8.3/10, 59 tests — 31 unit + 28 a11y)

- `ConfirmPopup` -> ✅ complete + hardened (6-phase evolution, score 8.9/10, 66 tests — 36 unit + 30 a11y)

- `Ripple` -> ✅ complete (implementation/tests/entry-point/demo/ESLint/build all green)
- `ScrollTop` -> ✅ complete (implementation/tests/entry-point/demo/ESLint/build all green)
- `StyleClass` -> ✅ complete (implementation/tests/entry-point/demo/ESLint/build all green)
- `FocusTrap` -> ✅ complete (implementation/tests/entry-point/demo/ESLint/build all green)
- `Fluid` -> ✅ complete (implementation/tests/entry-point/demo/ESLint/build all green)
- `Inplace` -> ✅ complete (implementation/tests/entry-point/demo/ESLint/build all green)
- `MeterGroup` -> ✅ complete (implementation/tests/entry-point/demo/ESLint/build all green)
- `ProgressSpinner` -> ✅ complete (implementation/tests/entry-point/demo/ESLint/build all green)
- `AnimateOnScroll` -> ✅ complete (implementation/tests/entry-point/demo/ESLint/build all green)
- `Avatar` -> ✅ complete (implementation/tests/entry-point/demo/ESLint/build all green)
- `AutoFocus` -> ✅ complete (implementation/tests/entry-point/demo/ESLint/build all green)
- `Bind` -> ✅ complete (implementation/tests/entry-point/demo/ESLint/build all green)
- `BlockUI` -> ✅ complete (implementation/tests/entry-point/demo/ESLint/build all green)
- `Chip` -> ✅ complete (implementation/tests/entry-point/demo/ESLint/build all green)
- `ClassNames` -> ✅ complete (implementation/tests/entry-point/demo/ESLint/build all green)
- `FocusTrap` -> ✅ complete (directive implementation/tests/entry-point/demo/ESLint/build all green)
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

Date: 2026-05-10 [ConfirmPopup component — 6-phase hardening COMPLETE]
Changed:
  - projects/ui-lib-custom/src/lib/confirm-popup/confirm-popup.ts
      • Removed `private static nextId: number = 0` class field
      • Added module-level `let nextConfirmPopupId: number = 0` counter (consistent with Drawer/DynamicDialog/ConfirmDialog pattern)
      • Updated `generateId()` to use `nextConfirmPopupId` instead of `ConfirmPopup.nextId`
      • Added `import { DOCUMENT } from '@angular/common'`
      • Added `private readonly document: Document = inject(DOCUMENT)`
      • Added `private previousFocusEl: HTMLElement | null = null` field
      • Visibility effect: captures `document.activeElement` (falls back to `targetElement()`) before open;
        restores `previousFocusEl.focus()` on close and clears the field
      • ngOnDestroy: nulls out `previousFocusEl`
      • Added `panelAriaLabel: Signal<string>` computed signal returning `resolvedMessage()` (accessible name for alertdialog)
  - projects/ui-lib-custom/src/lib/confirm-popup/confirm-popup.html
      • Added `[attr.aria-label]="panelAriaLabel()"` to the panel div (WCAG 4.1.2 — alertdialog must have name)
      • Added `aria-hidden="true"` to the overlay div (decorative click-catcher hidden from AT)
  - projects/ui-lib-custom/src/lib/confirm-popup/confirm-popup.a11y.spec.ts (CREATED — 30 a11y tests)
      • 7 describe blocks: closed state (3), open-state ARIA (8), focus management (6),
        keyboard behaviour (3), overlay dismiss (2), service-driven (3), axe-core (4)
      • Covers: aria-label, aria-modal, aria-describedby, aria-hidden overlay/arrow/icon,
        focus btn presence, focus restoration via accept/Escape/service, service-driven aria-label,
        defaultFocus override, 4 axe-core scenarios
  - projects/ui-lib-custom/src/lib/confirm-popup/README.md
      • Replaced bare bullet-list with full ARIA features table + keyboard navigation table
      • Documents: aria-label (from message text), aria-describedby, focus trap, focus restoration,
        arrow/overlay aria-hidden, reduced motion, :focus-visible rings
  - docs/COMPONENT_SCORES.md
      • ConfirmPopup queue entry: ⏳ Queued → ✅ Done (Tier 1 #7)
      • ConfirmPopup score row: 9/9/9/9/9/8/9/9/9/9 avg 8.9 🟢
  - AI_AGENT_CONTEXT.md (this file — status updated to hardened)
State: ConfirmPopup component fully evolved through all 6 phases. Score 8.9/10.
  Phase 3 (A11y — priority):
    • CRITICAL FIX: `aria-label` added to alertdialog panel (message text as accessible name — role=alertdialog requires accessible name per WCAG 4.1.2)
    • CRITICAL FIX: focus restored to trigger element on close (previousFocusEl pattern, captures document.activeElement at open time, falls back to targetElement())
    • MINOR FIX: overlay div has aria-hidden="true"
    • Created confirm-popup.a11y.spec.ts with 30 tests (all pass)
    • Pre-existing a11y features verified intact: role=alertdialog, aria-modal, tabindex=-1, aria-describedby, arrow aria-hidden, icon aria-hidden, FocusTrap, focusDefaultButton, Escape key, reduced motion
  Phase 1 (Architecture): module-level nextConfirmPopupId counter replaces static class field.
  Phase 2 (DX): README Accessibility section now comprehensive — full ARIA table + keyboard nav table.
  Phase 4 (Performance): afterNextRender({ injector }) pattern verified injection-context-safe. lastVisible guard verified. FocusTrap lazy + deactivated on close. computeAndSetPosition in afterNextRender only. positionReady prevents flicker.
  Phase 5 (Composability): Service + callbacks + key targeting is correct for anchored non-modal popup. No changes needed.
  Phase 6 (Polish): SCSS verified — :focus-visible on all buttons ✅, transition on hover ✅, arrow colors match bg ✅, bootstrap border-matching arrow ✅, reduced motion 0ms ✅.
Verification:
  node_modules\.bin\eslint projects/ui-lib-custom/src/lib/confirm-popup/ --max-warnings 0 (CLEAN, EXIT:0)
  node_modules\.bin\jest --testPathPatterns=confirm-popup --no-coverage (66/66 PASS — 36 unit + 30 a11y)
  node_modules\.bin\jest --testPathPatterns=entry-points --no-coverage (95/95 PASS)
  node_modules\.bin\ng build ui-lib-custom — Built, zero errors, zero warnings
Terminal notes: Run ESLint from bash.exe (PowerShell returns exit 1 even on clean runs). DOCUMENT from @angular/common must be imported alongside the Angular core imports — it's not in @angular/core.
Next step: Popover hardening (Tier 1, #8) — key a11y: aria-expanded, aria-controls, dismiss without losing focus context.

Date: 2026-05-10 [ConfirmDialog component — 6-phase hardening COMPLETE]
Changed:
  - projects/ui-lib-custom/src/lib/confirm-dialog/confirm-dialog.ts
      • Removed `private static nextId: number = 0` class field (static lint risk)
      • Added module-level `let nextConfirmDialogId: number = 0` counter (consistent with Drawer/DynamicDialog pattern)
      • Updated `generateId()` to use `nextConfirmDialogId` instead of `ConfirmDialog.nextId`
      • (Previously added in prior session): `private previousFocusEl: HTMLElement | null = null`;
        visibility effect captures `document.activeElement` on open, restores on close; ngOnDestroy clears field
  - projects/ui-lib-custom/src/lib/confirm-dialog/confirm-dialog.scss
      • Added `transition: background-color 120ms ease, color 120ms ease` to close button
      • Added `&:focus-visible { outline: 2px solid var(--uilib-color-primary-400, #818cf8); outline-offset: 2px; }` to close button
      (Previously added in prior session): `aria-hidden="true"` on backdrop div
  - projects/ui-lib-custom/src/lib/confirm-dialog/README.md
      • Replaced bare bullet-list accessibility section with full table + keyboard nav table
      • Documents: role=alertdialog, aria-modal, aria-labelledby, aria-describedby, FocusTrap,
        defaultFocus, focus restoration on close, Escape key, aria-label="Close", backdrop aria-hidden,
        scroll lock, reduced motion, focus rings
  - projects/ui-lib-custom/src/lib/confirm-dialog/confirm-dialog.a11y.spec.ts (created in prior session)
      • 28 a11y tests — closed state, open-state ARIA, focus management (incl. focus restoration),
        keyboard behaviour, backdrop, service-driven, 4 axe-core checks
  - docs/COMPONENT_SCORES.md
      • ConfirmDialog row: 9/9/8/8/8/8/8/8/9/8 avg 8.3 🟢 (Tier 1 #6 → ✅ Done)
  - AI_AGENT_CONTEXT.md (this file)

State: ConfirmDialog component fully evolved through all 6 phases. Score 8.3/10.
  Phase 1 (Architecture): module-level nextConfirmDialogId counter replaces static class field.
  Phase 2 (DX): README.md Accessibility section now comprehensive — full table + keyboard nav table.
  Phase 3 (A11y — priority, done in prior session):
    • CRITICAL FIX: Focus restored to trigger element on accept/reject/Escape/close-button
    • MINOR FIX: Backdrop has aria-hidden="true"
    • 28 a11y tests in confirm-dialog.a11y.spec.ts
    • Pre-existing: role=alertdialog, aria-modal, aria-labelledby, aria-describedby, tabindex=-1,
      aria-label="Close", SVG aria-hidden, FocusTrap, Escape key, scroll lock, reduced-motion
  Phase 4 (Performance): afterNextRender({ injector }) pattern is correct and injection-context-safe.
    FocusTrap created lazily, reused across open/close cycles. lastVisible guard prevents unnecessary work.
  Phase 5 (Composability): Service+callbacks pattern is the correct composability story for a modal
    confirmation dialog. Key-based targeting supports multi-instance on same page. No changes needed.
  Phase 6 (Polish): close button now has transition + :focus-visible ring (matched accept/reject buttons).

Verification:
  node_modules\.bin\eslint projects/ui-lib-custom/src/lib/confirm-dialog/ --max-warnings 0 (CLEAN, EXIT:0)
  node_modules\.bin\jest --testPathPatterns=confirm-dialog --no-coverage (59/59 PASS — 31 unit + 28 a11y)
  node_modules\.bin\ng build ui-lib-custom — Built, zero errors, zero warnings

Terminal notes: Module-level `let` counter requires explicit `: number` type annotation — lint rule
  @typescript-eslint/typedef fires without it. Always annotate module-level variables in this project.

Next step: ConfirmPopup hardening (Tier 1, #7) — key a11y: role=alertdialog anchored, focus restoration, click-away.

Date: 2026-05-10 [AutoComplete component — 6-phase hardening COMPLETE]
Changed:
  - projects/ui-lib-custom/src/lib/autocomplete/autocomplete.ts (targeted listener, listboxLabel, resultsAnnouncement, removed empty constructor)
  - projects/ui-lib-custom/src/lib/autocomplete/autocomplete.html (chip div/role=group, SVG icons, live region, listbox aria-label, CSS ::before groups, aria-setsize/posinset)
  - projects/ui-lib-custom/src/lib/autocomplete/autocomplete.scss (group ::before, sr-live visually-hidden, icon display rule)
  - projects/ui-lib-custom/src/lib/autocomplete/autocomplete.spec.ts (1 test fixed: chip role assertion)
  - projects/ui-lib-custom/src/lib/autocomplete/autocomplete.a11y.spec.ts (NEW — 52 a11y tests, all pass)
  - docs/COMPONENT_SCORES.md (AutoComplete: 8.2 avg ✅ Done, queue #3 → ✅)
  - AI_AGENT_CONTEXT.md (updated)
State: AutoComplete fully hardened. 96/96 tests pass (44 unit + 52 a11y). All 7 axe-core checks pass.
Verification:
  node_modules\.bin\eslint projects/ui-lib-custom/src/lib/autocomplete/ --max-warnings 0 (CLEAN, EXIT:0)
  node_modules\.bin\jest --testPathPatterns=autocomplete --no-coverage (96/96 PASS)
  node_modules\.bin\jest --testPathPatterns=entry-points --no-coverage (95/95 PASS)
  node_modules\.bin\ng build ui-lib-custom (zero errors/warnings)
Terminal notes: aria-input-field-name violation on role="listbox" — fixed by listboxLabel() computed.
  listitem violation — <li> inside <ul role="group"> has implicit listitem role rejected by axe.
  Fix: change <ul>/<li> to <div>/<div>. CSS ::before group headers — cleanest ARIA-compliant approach.
Next step: ConfirmDialog hardening (Tier 1, #6).

---
