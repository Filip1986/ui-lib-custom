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
- **Prompt library status:** 48 session hardening prompts created (2026-05-11) for all queued components (#14–#76). Index: `docs/prompts/HARDENING_PROMPT_INDEX.md`. Accumulated lessons documented in `docs/prompts/COMPONENT_EVOLUTION_PROMPTS.md`.

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
- `Badge` -> ✅ complete + hardened (6-phase, score 8.4/10, 25 tests — 13 unit + 12 a11y)
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

Date: 2026-05-12 [Paginator component — accessibility hardening COMPLETE (#37)]
Changed:
  - projects/ui-lib-custom/src/lib/paginator/paginator.component.ts
      • Added module-level `nextPaginatorId` and unique `instanceId` host binding (`id`)
      • Added host `role="navigation"` binding
      • Added computed `pageAnnouncement` live-region text and `getPageLinkAriaLabel(...)`
  - projects/ui-lib-custom/src/lib/paginator/paginator.component.html
      • Added hidden polite live region (`.uilib-paginator-live`) for page announcements
      • Updated icon-button aria-labels to explicit “Go to ... page” phrasing
      • Updated page-link aria-labels to include current-page wording
      • Removed list/listitem roles from non-list markup and switched `@for` track to `pageLink`
  - projects/ui-lib-custom/src/lib/paginator/paginator.component.scss
      • Added visually-hidden live-region utility class
      • Switched jump input + rows select focus styles to `:focus-visible`
      • Added `prefers-reduced-motion` transition disable override
  - projects/ui-lib-custom/src/lib/paginator/paginator.component.spec.ts
      • Expanded ARIA assertions for host role/id, nav labels, and live region announcements
  - projects/ui-lib-custom/src/lib/paginator/paginator.a11y.spec.ts (CREATED — 20 tests)
      • Added axe-core checks, ARIA structure checks, keyboard interaction coverage, live-region verification, and unique-ID test
  - projects/ui-lib-custom/src/lib/paginator/README.md
      • Added ARIA attributes table, keyboard interaction table, CSS custom properties table, and accessibility notes
  - docs/COMPONENT_SCORES.md
      • Paginator #37 moved from ⏳ Queued to ✅ Done; score row populated (avg 8.5)
State: Paginator hardening complete with live announcements, stronger ARIA semantics, reduced-motion coverage, focus-visible consistency, and dedicated a11y regression tests.
Verification:
  node_modules/.bin/eslint projects/ui-lib-custom/src/lib/paginator/ --max-warnings 0 (PASS)
  node_modules/.bin/jest --testPathPatterns=paginator --no-coverage (62/62 PASS — unit + a11y)
  node_modules/.bin/ng build ui-lib-custom (PASS, zero errors)
  node_modules/.bin/jest --testPathPatterns=entry-points --no-coverage (PASS)
  npm run typecheck (PASS)
Terminal notes: `playwright-browser_*` tools were blocked by an existing browser lock in this environment; captured UI evidence with `node_modules/.bin/playwright screenshot` after `npx playwright install chromium`.
Next step: TreeTable (#33) hardening — Tier 4 Data Display treegrid semantics pass.
