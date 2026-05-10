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
- **Active focus:** Toast and Tooltip hardening complete; resuming backlog
- **Next queue:** Tier 2 navigation hardening starts with Menubar (#11)
- **Horizon:** Runtime variant switcher, theme preset management, Storybook integration, broader axe-core audit

### Component/Docs Delta (Active Only)

- `Toast` -> ✅ complete + hardened (6-phase evolution, 53 tests — 22 unit + 31 a11y, axe-core pass, app shell wired)
- `DynamicDialog` -> ✅ complete (implementation/tests/entry-point/demo/ESLint/build all green)
- `Stepper` -> ✅ complete (implementation/tests/entry-point/demo/ESLint/build all green)
- `ScrollPanel` -> ✅ complete (implementation/tests/entry-point/demo/ESLint/build all green)
- `Panel` -> ✅ complete (implementation/tests/entry-point/demo/ESLint/build all green)
- `Fieldset` -> ✅ complete (implementation/tests/entry-point/demo/ESLint/build all green)
- `Tooltip` -> ✅ complete (implementation/tests/entry-point/demo/ESLint/build all green)
- `Popover` -> ✅ complete + hardened (6-phase evolution, score 9.0/10, 63 tests — 30 unit + 33 a11y)
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

Date: 2026-05-10 [Toast component — 6-phase hardening COMPLETE]
Changed:
  - projects/ui-lib-custom/src/lib/toast/toast.ts
      • Removed aria-live and aria-atomic from host metadata (was conflicting with item-level roles)
      • Added animationTimers map to track exit-animation cleanup timeouts
      • animationTimers cleared in destroyRef.onDestroy() — fixes memory leak during 300ms animation window
  - projects/ui-lib-custom/src/lib/toast/toast.html
      • Changed item role from static role="alert" to [attr.role]="error ? 'alert' : 'status'"
      • Removed [attr.aria-live] from items (role implies live-region semantics — aria-live on role="alert" is invalid)
      • Changed close button aria-label from static "Dismiss notification" to contextual "Dismiss: {summary}"
  - projects/ui-lib-custom/src/lib/toast/toast.scss
      • Added @media (prefers-reduced-motion: reduce) block setting --uilib-toast-animation-duration: 0ms
  - projects/ui-lib-custom/src/lib/toast/toast.a11y.spec.ts (CREATED — 31 a11y tests)
      • 6 describe blocks: container ARIA (4), item roles per severity (5), close button (5),
        severity icon (1), multiple messages (2), axe-core (5)
      • Covers: role=region, no aria-live on host, role=alert for error, role=status for others,
        no standalone aria-live on items, contextual close labels, aria-hidden icons, 5 axe-core scenarios
  - projects/ui-lib-custom/src/lib/toast/toast.spec.ts
      • Updated 4 stale ARIA assertions to match new correct behavior
        (role="status" for non-error, no aria-live attribute, contextual close label)
  - projects/ui-lib-custom/src/lib/toast/README.md
      • Complete rewrite — ARIA features table, ARIA design rationale section, keyboard nav table,
        consumer responsibilities, CSS custom properties table, public properties table
  - projects/demo/src/app/pages/toast/toast-demo.component.ts
      • Converted selectedPosition and selectedVariant from plain properties to WritableSignal
        (plain properties don't propagate in zoneless OnPush)
      • Fixed showPositioned() to call signal getters
  - projects/demo/src/app/pages/toast/toast-demo.component.html
      • Updated [position] and [variant] bindings to call signal getters selectedPosition()/selectedVariant()
      • Picker button comparisons and (click) handlers updated to use signal API
  - projects/demo/src/app/app.html
      • Added <ui-lib-toast position="top-right" /> to the app shell (outside router outlet)
  - projects/demo/src/app/app.ts
      • Added Toast import and to the imports array
  - docs/COMPONENT_SCORES.md
      • Toast row: 8/9/8/8/8/8/9/8/9/8 avg 8.3 🟢 (Tier 1 #10 → ✅ Done)
  - AI_AGENT_CONTEXT.md (this file — status updated)
State: Toast fully evolved through all 6 phases. Score 8.3/10.
  Phase 1 (Architecture): animationTimers tracking added — fixes exit-animation memory leak.
  Phase 2 (DX): README complete — API tables, ARIA table, keyboard nav, consumer responsibilities.
  Phase 3 (A11y — priority):
    • CRITICAL FIX: item role now conditional (role=alert for error, role=status for non-error)
    • CRITICAL FIX: removed conflicting aria-live from host AND from individual items
    • CRITICAL FIX: close button label is now contextual "Dismiss: {summary}" per WCAG 2.4.6
    • MINOR FIX: prefers-reduced-motion collapses animation to 0ms
    • Created toast.a11y.spec.ts with 31 tests (all pass)
  Phase 4 (Performance): animationTimers cleaned up on destroy. Auto-dismiss timers already tracked.
    Signal-based visibleMessages computed efficiently. No unnecessary re-renders.
  Phase 5 (Composability): Service + key-based multi-container pattern is the correct story for Toast.
    No changes needed — composability is correct.
  Phase 6 (Polish): CSS slide-direction per-position via custom properties ✅, severity palettes ✅,
    dark mode ✅, three design variants ✅, reduced-motion ✅.
Verification:
  eslint projects/ui-lib-custom/src/lib/toast/ --max-warnings 0 (CLEAN, EXIT:0)
  eslint projects/demo/src/app/pages/toast/ projects/demo/src/app/app.ts --max-warnings 0 (CLEAN, EXIT:0)
  jest --testPathPatterns=toast --no-coverage (53/53 PASS — 22 unit + 31 a11y)
  ng build ui-lib-custom — Built, zero errors, zero warnings
Terminal notes: node_modules lives in the main repo root, not the worktree. Run binaries as
  /d/Work/Personal/Github/ui-lib-custom/node_modules/.bin/<tool> from the worktree directory.
  ESLint must run from bash.exe — PowerShell returns exit 1 even on clean runs.
Next step: Tooltip hardening (Tier 1, #9) — key a11y: aria-describedby lifecycle, cleanup on element unmount.

Date: 2026-05-10 [Popover component — 6-phase hardening COMPLETE]
Changed:
  - projects/ui-lib-custom/src/lib/tooltip/tooltip.ts
      • Added `import { DOCUMENT } from '@angular/common'`
      • Added `private readonly document: Document = inject(DOCUMENT)` (SSR-safe)
      • Replaced all `document.*` calls → `this.document.*` (createElement, addEventListener, removeEventListener, body.appendChild)
      • Replaced `window.innerWidth/innerHeight` → `this.document.defaultView?.innerWidth/innerHeight ?? 0`
      • WCAG 1.4.13 FIX: focus/blur listeners now bound for ALL tooltipEvent modes (previously only 'focus'/'both')
        — removed `if (event === 'focus' || event === 'both')` guard; focus listeners always registered
      • Added JSDoc to `setupListeners()` explaining static config and WCAG 1.4.13 rationale
      • Added `this.elementRef.nativeElement.removeAttribute('aria-describedby')` in `ngOnDestroy()`
        — ensures host is clean when directive is destroyed while tooltip is visible
  - projects/ui-lib-custom/src/lib/tooltip/tooltip.a11y.spec.ts (CREATED — 32 a11y tests)
      • 7 describe blocks: host-element ARIA (8), tooltip element ARIA structure (5), tooltipId (2),
        keyboard accessibility WCAG 1.4.13 (4), Escape key dismissal (3), tooltipDisabled (3),
        lifecycle and cleanup (3), axe-core (4)
      • axe checks use TOOLTIP_AXE_RULES (disables color-contrast + region) — region rule skipped
        because overlay element is correctly outside landmark structure
      • afterEach destroys fixture (via currentFixture pattern) to prevent DOM accumulation
  - projects/ui-lib-custom/src/lib/tooltip/README.md
      • Replaced 4-bullet accessibility section with full ARIA features table (12 rows)
      • Added keyboard navigation table
      • Added consumer guidance section (tooltipEvent selection + tooltipId usage example)
      • Updated Inputs table to note that `tooltipEvent="hover"` now also includes focus (WCAG 1.4.13)
  - docs/COMPONENT_SCORES.md
      • Tooltip queue entry: ⏳ Queued → ✅ Done (Tier 1 #9)
      • Tooltip score row: 9/9/9/9/9/9/9/9/9/9 avg 9.0 🟢
  - AI_AGENT_CONTEXT.md (this file)
State: Tooltip directive fully evolved through all 6 phases. Score 9.0/10.
  Phase 3 (A11y — priority):
    • CRITICAL FIX: WCAG 1.4.13 — hover mode now also binds focus/blur; keyboard users see same tooltip as mouse users
    • MINOR FIX: DOCUMENT injected (SSR-safe); replaced all direct document.*/window.* calls
    • MINOR FIX: ngOnDestroy now removes aria-describedby from host element
    • Created tooltip.a11y.spec.ts with 32 tests (all pass)
    • Pre-existing a11y features verified intact: role=tooltip, aria-describedby lifecycle, aria-hidden arrow,
      Escape key, pointer-events:none, reduced motion, lazy DOM, ngZone.runOutsideAngular
  Phase 1 (Architecture): DOCUMENT injection added; module-level counter and TOOLTIP_CLEANUP_DELAY_MS verified.
  Phase 2 (DX): README Accessibility section now comprehensive — ARIA table + keyboard nav + consumer guidance.
  Phase 4 (Performance): runOutsideAngular, rAF for visible class, lazy creation, timer management all verified. No changes.
  Phase 5 (Composability): Directive pattern, tooltipId public, tooltipDisabled, showDelay/hideDelay all verified. No changes.
  Phase 6 (Polish): arrow colors, reduced motion, opacity+transform transition, pointer-events:none, word-break all verified. No changes.
Verification:
  node_modules/.bin/eslint projects/ui-lib-custom/src/lib/tooltip/ --max-warnings 0 (CLEAN, EXIT:0)
  node_modules/.bin/jest --testPathPatterns=tooltip --no-coverage (66/66 PASS — 34 unit + 32 a11y)
  node_modules/.bin/jest --testPathPatterns=entry-points --no-coverage (97/97 PASS)
  node_modules/.bin/ng build ui-lib-custom — Built, zero errors, zero warnings
Terminal notes: Run ESLint from bash.exe (PowerShell returns exit 1 even on clean runs). axe `region` rule fires for overlay content appended to document.body outside landmarks — this is correct behaviour, not a violation; skip `region` in tooltip a11y axe calls.
Next step: Toast hardening (Tier 1, #10) — key a11y: aria-live=assertive live region, dismiss button keyboard access, role=status vs role=alert.


  - projects/ui-lib-custom/src/lib/popover/popover.ts
      • Added `import { DOCUMENT } from '@angular/common'`
      • Added module-level `let nextPopoverId: number = 0` counter
      • Added `private generateId(): string` method (crypto.randomUUID with counter fallback)
      • Added `public readonly panelId: string` (unique stable panel ID)
      • Added `public readonly titleId: string` (panel-id-based title ID for aria-labelledby)
      • Added `private readonly document: Document = inject(DOCUMENT)` (SSR-safe)
      • Added `private previousFocusEl: HTMLElement | null = null` field
      • Updated `show()`: captures `document.activeElement` (falls back to `target`) into `previousFocusEl` before opening
      • Updated visibility effect false branch: restores `previousFocusEl?.focus()` on close, clears field
      • Updated `ngOnDestroy()`: nulls out `previousFocusEl`
  - projects/ui-lib-custom/src/lib/popover/popover.html
      • Added `[id]="panelId"` to the panel div
      • Added `[attr.aria-labelledby]="header() ? titleId : null"` to panel (WCAG 4.1.2 — dialog needs accessible name)
      • Added `[attr.aria-label]="header() ? null : 'Popover'"` to panel (fallback when no header)
      • Added `[id]="titleId"` to the title span
      • Added `aria-hidden="true"` to overlay div (decorative click-catcher hidden from AT)
      • Replaced `<span aria-hidden="true">&times;</span>` with inline SVG close icon (consistent with Dialog/Drawer/ConfirmDialog)
  - projects/ui-lib-custom/src/lib/popover/popover.scss
      • Removed `font-size: 1.125rem; line-height: 1;` from close button (glyph-only properties; SVG uses width/height attributes)
  - projects/ui-lib-custom/src/lib/popover/popover.a11y.spec.ts (CREATED — 33 a11y tests)
      • 7 describe blocks: closed state (3), open-state ARIA (8), close button (3),
        focus management (5), keyboard behaviour (4), panelId (3), axe-core (4)
      • Covers: role=dialog, aria-modal, tabindex, aria-labelledby/label mutual exclusion,
        titleId linkage, overlay/arrow aria-hidden, close btn label/SVG, focus restoration
        via close-btn/Escape/overlay, declarative-close no-throw, keyboard/dismiss guards, panelId, 4 axe scenarios
  - projects/ui-lib-custom/src/lib/popover/README.md
      • Added Public properties table (panelId, titleId)
      • Updated showCloseButton description (SVG ×)
      • Updated shown output: noted it won't fire in Jest (afterNextRender limitation)
      • Replaced bare bullet-list with full ARIA features table + keyboard navigation table
      • Added "Consumer accessibility responsibilities" section with aria-controls/aria-expanded usage example
  - docs/COMPONENT_SCORES.md
      • Popover queue entry: ⏳ Queued → ✅ Done (Tier 1 #8)
      • Popover score row: 9/9/9/9/9/9/9/9/9/9 avg 9.0 🟢
  - AI_AGENT_CONTEXT.md (this file — status updated)
  - docs/implementation/AI_AGENT_CONTEXT_ARCHIVE.md (AutoComplete handoff archived)
State: Popover component fully evolved through all 6 phases. Score 9.0/10.
  Phase 3 (A11y — priority):
    • CRITICAL FIX: aria-labelledby added to panel (header text as accessible name — satisfies WCAG 4.1.2)
    • CRITICAL FIX: aria-label="Popover" fallback when no header
    • CRITICAL FIX: focus restored to trigger element on close (previousFocusEl, captured in show())
    • MINOR FIX: overlay div has aria-hidden="true"
    • POLISH FIX: close button &times; replaced with inline SVG (consistent with Dialog/Drawer/ConfirmDialog)
    • Created popover.a11y.spec.ts with 33 tests (all pass)
    • Pre-existing a11y features verified intact: role=dialog, aria-modal=false, tabindex=-1,
      arrow aria-hidden, aria-label=Close on close btn, FocusTrap, Escape key, reduced motion,
      :focus-visible ring, transition on close button hover
  Phase 1 (Architecture): module-level nextPopoverId counter + generateId() + panelId + titleId added.
  Phase 2 (DX): README fully updated — ARIA table, keyboard nav table, consumer responsibilities section, panelId/titleId documented.
  Phase 4 (Performance): afterNextRender({ injector }) injection-context-safe verified. lastVisible guard verified. FocusTrap lazy. previousFocusEl captured synchronously in show(). shown emitted in afterNextRender — won't fire in Jest (documented in README and code comment). No changes needed.
  Phase 5 (Composability): template-ref + declarative patterns both supported. panelId enables aria-controls wiring. ng-content projection correct. No service layer needed. No changes needed.
  Phase 6 (Polish): SVG close icon applied. font-size/line-height removed from SCSS. :focus-visible ring ✅ transition ✅ arrow colors ✅ bootstrap border arrow ✅ reduced motion ✅.
Verification:
  node_modules/.bin/eslint projects/ui-lib-custom/src/lib/popover/ --max-warnings 0 (CLEAN, EXIT:0)
  node_modules/.bin/jest --testPathPatterns=popover --no-coverage (63/63 PASS — 30 unit + 33 a11y)
  node_modules/.bin/jest --testPathPatterns=entry-points --no-coverage (97/97 PASS)
  node_modules/.bin/ng build ui-lib-custom — Built, zero errors, zero warnings
Terminal notes: Run ESLint from bash.exe only (PowerShell returns exit 1 even on clean runs). DOCUMENT must be imported from @angular/common (not @angular/core). Module-level `let` counter requires explicit `: number` type annotation.
Next step: Tooltip hardening (Tier 1, #9) — key a11y: aria-describedby lifecycle, cleanup on element unmount.

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


---
