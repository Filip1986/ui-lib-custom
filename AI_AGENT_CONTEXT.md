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
- **Active focus:** BlockUI accessibility hardening COMPLETE (6-phase, #64); BottomSheet (#76), Card (#51), Chart (#72), Chip (#54), ContextMenu (#14) also merged
- **Next queue:** TreeTable hardening (Tier 4, #33) — `role=treegrid`, hierarchy semantics, expanded state, keyboard navigation
- **Horizon:** Runtime variant switcher, theme preset management, broader axe-core audit ✅ (infra in place)

### Component/Docs Delta (Active Only)

- `Accordion` -> ✅ complete + hardened (6-phase, score 9.0/10, 51 tests — 33 unit + 18 a11y)
- `TieredMenu` -> ✅ complete + hardened (6-phase evolution, score 9.0/10, 70 tests — 28 unit + 42 a11y)
- `Menu` -> ✅ complete + hardened (6-phase evolution, score 9.0/10, 89 tests — 44 unit + 45 a11y)
- `Menubar` -> ✅ complete + hardened (6-phase evolution, score 9.0/10, 84 tests — 42 unit + 42 a11y)
- `MegaMenu` -> ✅ complete + hardened (6-phase, score 9.0/10, 95 tests — 51 unit + 44 a11y)
- `Tabs` -> ✅ complete + hardened (6-phase, score 9.0/10)
- `Stepper` -> ✅ complete + hardened (6-phase, score 9.0/10, 61 tests — 39 unit + 22 a11y)
- `RadioButton` -> ✅ complete + hardened (6-phase, 64 tests — 40 unit + 24 a11y)
- `Password` -> ✅ complete + hardened (6-phase, 73 tests — 49 unit + 24 a11y)
- `Slider` -> ✅ complete + hardened (6-phase, 75 tests — 47 unit + 28 a11y)
- `Rating` -> ✅ complete + hardened (6-phase, 75 tests — 53 unit + 22 a11y)
- `BlockUI` -> ✅ complete + hardened (6-phase, score 9.0/10, 38 tests — 22 unit + 15 a11y + 1 updated)
- `Table` -> ✅ complete + hardened (6-phase, 125 tests — 92 unit + 33 a11y)
- `Card` -> ✅ complete + hardened (6-phase, score 9.0/10, 34 tests — 10 unit + 24 a11y)
- `Chip` -> ✅ complete + hardened (6-phase, score 8.5/10, 48 tests — 30 unit + 18 a11y)
- `ContextMenu` -> ✅ complete + hardened (6-phase, 86 tests — 55 unit + 31 a11y)
- `Chart` -> ✅ complete + hardened (6-phase, score 8.9/10, 96 tests — 75 unit + 21 a11y)
- `BottomSheet` -> ✅ complete + hardened (6-phase, score 8.5/10, 50 tests — 26 unit + 24 a11y)

---

## Known Blockers / Watch Items

- Non-blocking Jest warning seen during a11y run:
  - `jest-haste-map: Haste module naming collision: ui-lib-custom`
  - between root `package.json` and `projects/ui-lib-custom/package.json`
- Demo build shows pre-existing SCSS budget warnings in `button` and `date-picker` -- not a blocker

---

## Recent Handoffs

Date: 2026-05-11 [BlockUI component — accessibility hardening COMPLETE (#64)]
Changed:
  - projects/ui-lib-custom/src/lib/block-ui/block-ui.ts
      • Added module-level `let nextBlockUiId: number = 0` counter
      • Added `public readonly instanceId: string` (unique per-instance, bound to host `[attr.id]`)
      • Added `[attr.aria-disabled]: 'blocked() ? true : null'` to host bindings
  - projects/ui-lib-custom/src/lib/block-ui/block-ui.html
      • Wrapped default `<ng-content>` in `<div class="ui-lib-block-ui__content">` with `[attr.inert]="blocked() ? '' : null"` to prevent keyboard focus entering blocked content
      • Fixed `[attr.aria-hidden]` on mask: now `null` when blocked (removes attribute), `'true'` when not blocked
  - projects/ui-lib-custom/src/lib/block-ui/block-ui.scss
      • Added `.ui-lib-block-ui__content { display: contents; }` for zero layout side-effects
      • Added `@media (prefers-reduced-motion: reduce)` override to disable mask transition
  - projects/ui-lib-custom/src/lib/block-ui/block-ui.spec.ts
      • Updated `aria-hidden` assertion for blocked state (was 'false', now toBeNull)
      • Added tests for `aria-disabled`, `inert` on content wrapper, and unique host id
  - projects/ui-lib-custom/src/lib/block-ui/block-ui.a11y.spec.ts (CREATED — 15 tests)
      • ARIA structure, focus-trap/inert, reactive unblock, axe-core (unblocked + blocked states)
  - projects/ui-lib-custom/src/lib/block-ui/README.md
      • Added ARIA attributes table, keyboard interaction table, CSS custom properties table, and accessibility notes section
  - docs/COMPONENT_SCORES.md
      • BlockUI: ⏳ Queued → ✅ Done; score 9.0/10 across all 10 categories
State: BlockUI hardening complete. Focus trap via `inert`, aria-busy + aria-disabled, unique instance IDs,
  prefers-reduced-motion support, and dedicated a11y regression coverage are in place.
Verification:
  node_modules/.bin/eslint projects/ui-lib-custom/src/lib/block-ui/ --max-warnings 0 (PASS)
  node_modules/.bin/jest --testPathPatterns=block-ui --no-coverage (38/38 PASS)
  node_modules/.bin/ng build ui-lib-custom (PASS, zero errors)
  node_modules/.bin/jest --testPathPatterns=entry-points --no-coverage (97/97 PASS)
Terminal notes: Fresh clone required `npm install` before validation.
Next step: TreeTable (#33) hardening — start Tier 4 Data Display treegrid pass.

Date: 2026-05-11 [BottomSheet component — accessibility hardening COMPLETE (#76)]
Changed:
  - projects/ui-lib-custom/src/lib/bottom-sheet/bottom-sheet.ts
      • Added module-level `nextBottomSheetId` counter; exposed `instanceId` and `titleId` as unique per-instance strings
      • Imported `isPlatformBrowser` from `@angular/common` and `PLATFORM_ID` for SSR safety
      • Imported `FocusTrap` from `ui-lib-custom/core`; replaced `panel?.focus()` with full focus trap lifecycle (activate on open, deactivate on close with automatic focus restoration)
      • Added `private focusTrap: FocusTrap | null = null` field
      • Added `activateFocusTrap()` and `deactivateFocusTrap()` private methods
      • Wired `deactivateFocusTrap()` into `ngOnDestroy` to prevent memory leaks
  - projects/ui-lib-custom/src/lib/bottom-sheet/bottom-sheet.html
      • Switched `[attr.aria-label]` → `[attr.aria-labelledby]` referencing `titleId`
      • Added `[id]="titleId"` to the title span for the ARIA association
      • Removed redundant `[attr.aria-hidden]` from the panel (host-level `aria-hidden` is sufficient)
      • Replaced `<span class="pi pi-times">` close icon with an inline SVG (`aria-hidden="true"`, `focusable="false"`)
  - projects/ui-lib-custom/src/lib/bottom-sheet/bottom-sheet.scss
      • Added `@media (prefers-reduced-motion: reduce)` block disabling all transitions on panel, backdrop, and close button
      • Added `.ui-lib-bottom-sheet__close-icon` display rule for the SVG
  - projects/ui-lib-custom/src/lib/bottom-sheet/bottom-sheet.a11y.spec.ts (CREATED — 24 tests)
      • axe-core checks (3), ARIA attribute assertions (11), focus management (4), keyboard interaction (2), unique ID (2)
  - projects/ui-lib-custom/src/lib/bottom-sheet/README.md
      • Added ARIA attributes table, keyboard interactions table, expanded CSS custom properties table, and updated accessibility section
  - docs/COMPONENT_SCORES.md
      • BottomSheet #76: ⏳ Queued → ✅ Done; score row populated (API 8, A11y 9, Perf 8, Comp 8, Theme 9, DX 9, Docs 9, Polish 8, Angular 9, Feel 8 — avg 8.5)
State: BottomSheet hardening complete. Full focus trap with restoration, aria-labelledby with unique per-instance IDs, reduced-motion support, SVG close icon, and 24-test a11y regression suite are in place.
Verification:
Verification:
  node_modules/.bin/eslint projects/ui-lib-custom/src/lib/bottom-sheet/ --max-warnings 0 (PASS)
  node_modules/.bin/jest --testPathPatterns=bottom-sheet --no-coverage (50/50 PASS — 26 unit + 24 a11y)
  node_modules/.bin/ng build ui-lib-custom (PASS, zero errors)
  node_modules/.bin/jest --testPathPatterns=entry-points --no-coverage (97/97 PASS)
Terminal notes: Fresh clone required `npm install` before validation. `isPlatformBrowser` must be imported from `@angular/common`, not `@angular/core`, to satisfy @typescript-eslint/no-unsafe-call.
Next step: TreeTable (#33) hardening — Tier 4 Data Display treegrid pass.

Date: 2026-05-11 [Card component — accessibility hardening COMPLETE (#51)]
Changed:
  - projects/ui-lib-custom/src/lib/card/card.ts
      • Added module-scope `let nextCardId: number = 0` for unique instance IDs
      • Added `public readonly titleId: string` initialized in constructor to `ui-lib-card-title-${nextCardId++}`
  - projects/ui-lib-custom/src/lib/card/card.html
      • Added `[attr.aria-labelledby]` — links card container to its title when not hoverable and header is visible
      • Added `[id]="titleId"` on the `.ui-lib-card__title` div for the labelledby target
  - projects/ui-lib-custom/src/lib/card/card.scss
      • Added `:focus-visible` ring on `&--hoverable` (outline + box-shadow glow using `--uilib-color-primary` / `--uilib-focus-ring`)
      • Applied the `card-dark-theme` mixin via `[data-theme='dark']` selectors (both host-scoped and parent-scoped)
      • Added `@media (prefers-reduced-motion: reduce)` — disables `transition` and removes `translateY` transforms
  - projects/ui-lib-custom/src/lib/card/card.a11y.spec.ts (EXPANDED — 24 tests, up from 1)
      • Added ARIA structure (role, tabindex, aria-label, aria-labelledby, title ID format)
      • Added keyboard interaction (Enter/Space trigger click; non-hoverable doesn't)
      • Added closable card accessible label coverage
      • Added unique IDs, multi-instance ID uniqueness, and dynamic label (signal) update
      • Added axe checks for basic, hoverable, closable, and multi-variant states
  - projects/ui-lib-custom/src/lib/card/README.md
      • Added ARIA attributes table, keyboard interaction table, CSS custom properties table
      • Added full Accessibility section with examples, guidelines, and reduced-motion note
  - docs/COMPONENT_SCORES.md
      • Card: ⏳ Queued → ✅ Done; score row added to Layout table (avg 9.0/10)
State: Card hardening complete. Focus ring, dark mode, reduced motion, unique IDs, aria-labelledby, and 24 a11y tests all in place.
Verification:
  node_modules/.bin/eslint projects/ui-lib-custom/src/lib/card/ --max-warnings 0 (PASS)
  node_modules/.bin/jest --testPathPatterns=card --no-coverage (34/34 PASS — 10 unit + 24 a11y)
  node_modules/.bin/ng build ui-lib-custom (PASS, zero errors)
  node_modules/.bin/jest --testPathPatterns=entry-points --no-coverage (97/97 PASS)
Terminal notes: Fresh clone required `npm install` before validation tools were available.
Next step: Badge (#52) hardening — Tier 6, positioning variants, `aria-label` passthrough.

