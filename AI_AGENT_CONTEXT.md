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
- **Active focus:** Toast hardening COMPLETE (Tier 1, #10); next is Menubar
- **Next queue:** Menubar hardening (Tier 2, #11) — key a11y: role=menubar, full arrow-key nav, aria-haspopup, submenu keyboard control
- **Horizon:** Runtime variant switcher, theme preset management, Storybook integration, broader axe-core audit

### Component/Docs Delta (Active Only)

- `Tooltip` -> ✅ complete + hardened (6-phase evolution, score 9.0/10, 66 tests — 34 unit + 32 a11y)
- `Toast` -> ✅ complete + hardened (6-phase evolution, score 9.1/10, 60 tests — 29 unit + 31 a11y)

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
      • CRITICAL FIX: Removed aria-live="polite" and aria-atomic="false" from container host binding
        — role="region" is a structural landmark, not a live region; added explanatory comment
      • Updated dismiss() JSDoc to document animation delay and no-op safety
  - projects/ui-lib-custom/src/lib/toast/toast.html
      • CRITICAL FIX: [attr.role] now conditional — role="alert" for error severity only, role="status" for success/info/warn
      • CRITICAL FIX: Removed [attr.aria-live] binding — redundant/ineffective (role already implies live region urgency)
      • MODERATE FIX: Close button aria-label updated to "Dismiss: {summary}" — falls back to detail then "notification"
  - projects/ui-lib-custom/src/lib/toast/toast.scss
      • MODERATE FIX: Added @media (prefers-reduced-motion: reduce) — sets --uilib-toast-animation-duration: 0ms
  - projects/ui-lib-custom/src/lib/toast/toast.spec.ts
      • Updated 4 ARIA tests to reflect corrected role/aria-live behaviour
        (role="alert" only for error; role="status" for non-error; no aria-live on items;
         close button aria-label now "Dismiss: {summary}")
  - projects/ui-lib-custom/src/lib/toast/toast.a11y.spec.ts (CREATED — 31 a11y tests)
      • 7 describe blocks: container ARIA (4), item ARIA roles (5), icon accessibility (2),
        close button accessibility (6), keyboard accessibility (3), live region correctness (4),
        axe-core automated checks (5) — uses checkA11y(fixture) not axe(document.body);
        region rule NOT skipped (toast has role="region" and items are inside it)
  - projects/ui-lib-custom/src/lib/toast/README.md
      • Added ToastMessage interface table (10 properties)
      • Added Multiple Containers Pattern section with key routing example
      • Added Notification Lifecycle section (enter → auto-dismiss → exit)
      • Added CSS Custom Properties table (8 tokens)
      • Added comprehensive Accessibility section: ARIA features table (7 rows), keyboard nav table, severity/urgency guidance
  - docs/COMPONENT_SCORES.md
      • Toast queue entry: ⏳ Queued → ✅ Done (Tier 1 #10)
      • Toast score row: 9/10/9/9/9/9/9/9/9/9 avg 9.1 🟢
  - AI_AGENT_CONTEXT.md (this file — status updated)
  - docs/implementation/AI_AGENT_CONTEXT_ARCHIVE.md (ConfirmPopup handoff archived)
State: Toast component fully evolved through all 6 phases. Score 9.1/10.
  Phase 3 (A11y — priority):
    • CRITICAL FIX: Removed aria-live="polite" and aria-atomic="false" from container host binding
      — role="region" is a structural landmark, not a live region; child items manage their own
      announcements via role
    • CRITICAL FIX: role="alert" now only for error severity; role="status" for success/info/warn
      — removes incorrectly assertive announcement for non-critical toasts
    • CRITICAL FIX: Removed [attr.aria-live] from item element — redundant/ineffective when set
      on a role="alert" or role="status" element; the role already implies the correct aria-live value
    • MODERATE FIX: Close button aria-label now "Dismiss: {summary}" — specific when multiple
      toasts are visible; falls back to detail then "notification"
    • MODERATE FIX: Added @media (prefers-reduced-motion: reduce) to SCSS
      — sets --uilib-toast-animation-duration: 0ms
    • Created toast.a11y.spec.ts with 31 tests
    • Pre-existing a11y features verified intact: role="region", aria-label="Notifications",
      aria-hidden on icons, type="button" on close button, closable guard, sticky guard,
      key filtering, timer management, DestroyRef cleanup, closingIds animation
  Phase 1 (Architecture): No structural changes. dismiss() JSDoc updated. Architecture verified.
    ANIMATION_DURATION_MS and counter explicitly typed. No DOCUMENT injection needed.
  Phase 2 (DX): README fully updated — ToastMessage interface table, Multiple Containers Pattern,
    Notification Lifecycle, CSS Custom Properties table (8 tokens), full Accessibility section.
  Phase 4 (Performance): No structural changes. All performance patterns verified —
    effect() reactive timers, Map O(1) lookup, DestroyRef cleanup, CSS keyframes, @for track.
  Phase 5 (Composability): No API changes. key routing, sticky, life layering, clear(key),
    closable all verified correct.
  Phase 6 (Polish): No styling changes needed. Close button ring ✅ opacity ✅ transition ✅
    animation direction per position ✅ dark mode ✅ minimal accent ✅ pointer-events ✅
    Reduced motion override added in Phase 3.
Verification:
  node_modules/.bin/eslint projects/ui-lib-custom/src/lib/toast/ --max-warnings 0 (CLEAN, EXIT:0)
  node_modules/.bin/jest --testPathPatterns=toast --no-coverage (60/60 PASS — 29 unit + 31 a11y)
  node_modules/.bin/jest --testPathPatterns=entry-points --no-coverage (97/97 PASS)
  node_modules/.bin/ng build ui-lib-custom — Built, zero errors, zero warnings
Terminal notes: Run ESLint from bash.exe (PowerShell returns exit 1 even on clean runs).
  checkA11y(fixture) is correct for Toast (renders inside fixture, not appended to document.body).
  Do NOT skip the region axe rule for Toast — it has role="region" and its items are inside it.
  fixture.nativeElement must be cast to HTMLElement before calling querySelector (no-unsafe-call).
Next step: Menubar hardening (Tier 2, #11) — key a11y: role=menubar, full arrow-key nav,
  aria-haspopup, submenu keyboard control.


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
→ Archived to docs/implementation/AI_AGENT_CONTEXT_ARCHIVE.md


---


