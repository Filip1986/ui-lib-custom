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
- **Active focus:** ScrollTop (#75), ScrollPanel (#62), TreeTable (#33), Tree (#34), TreeSelect (#35), Timeline (#71), Upload (#69), and Skeleton (#55) accessibility hardening COMPLETE (6-phase); Tag (#53), ProgressSpinner (#56), Panel (#60), MeterGroup (#57), Ripple (#74), BlockUI (#64), BottomSheet (#76), Card (#51), Chart (#72), Chip (#54), ContextMenu (#14) also merged
- **Next queue:** DataView hardening (Tier 4, #38) — sort/filter labels and list/grid toggle announcements
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
- `Ripple` -> ✅ complete + hardened (6-phase, score 8.7/10, 29 tests — 19 unit + 10 a11y)
- `BlockUI` -> ✅ complete + hardened (6-phase, score 9.0/10, 38 tests — 22 unit + 15 a11y + 1 updated)
- `Table` -> ✅ complete + hardened (6-phase, 125 tests — 92 unit + 33 a11y)
- `TreeTable` -> ✅ complete + hardened (6-phase, score 8.5/10, 85 tests — 41 unit + 44 a11y)
- `Tree` -> ✅ complete + hardened (6-phase, score 8.6/10, 93 tests — 38 unit + 55 a11y)
- `Timeline` -> ✅ complete + hardened (6-phase, score 8.3/10, 48 tests — 33 unit + 15 a11y)
- `Upload` -> ✅ complete + hardened (6-phase, score 8.9/10, 66 tests — 36 unit + 30 a11y)
- `Tag` -> ✅ complete + hardened (6-phase, score 8.9/10, 40 tests — 26 unit + 14 a11y)
- `Card` -> ✅ complete + hardened (6-phase, score 9.0/10, 34 tests — 10 unit + 24 a11y)
- `Badge` -> ✅ complete + hardened (6-phase, score 8.4/10, 25 tests — 13 unit + 12 a11y)
- `Chip` -> ✅ complete + hardened (6-phase, score 8.5/10, 48 tests — 30 unit + 18 a11y)
- `ContextMenu` -> ✅ complete + hardened (6-phase, 86 tests — 55 unit + 31 a11y)
- `Chart` -> ✅ complete + hardened (6-phase, score 8.9/10, 96 tests — 75 unit + 21 a11y)
- `BottomSheet` -> ✅ complete + hardened (6-phase, score 8.5/10, 50 tests — 26 unit + 24 a11y)
- `MeterGroup` -> ✅ complete + hardened (6-phase, score 8.3/10, 45 tests — 27 unit + 18 a11y)
- `Panel` -> ✅ complete + hardened (6-phase, score 9.0/10, 110 tests — 87 unit + 23 a11y)
- `ScrollPanel` -> ✅ complete + hardened (6-phase, score 8.9/10, 29 tests — 13 unit + 16 a11y)
- `ScrollTop` -> ✅ complete + hardened (6-phase, score 8.4/10, 37 tests — 23 unit + 14 a11y)
- `DataView` -> ✅ complete + hardened (6-phase, score 8.5/10, 64 tests — 43 unit + 21 a11y)
- `Carousel` -> ✅ complete + hardened (6-phase, score 8.3/10, 70 tests — 44 unit + 26 a11y)
- `Divider` -> ✅ complete + hardened (6-phase, score 8.7/10, 36 tests — 24 unit + 12 a11y)

---

## Known Blockers / Watch Items

- Non-blocking Jest warning seen during a11y run:
  - `jest-haste-map: Haste module naming collision: ui-lib-custom`
  - between root `package.json` and `projects/ui-lib-custom/package.json`
- Demo build shows pre-existing SCSS budget warnings in `button` and `date-picker` -- not a blocker

---

## Recent Handoffs

Date: 2026-05-12 [DataView component — accessibility hardening COMPLETE (#38)]
Changed:
  - projects/ui-lib-custom/src/lib/data-view/data-view.component.ts
  - projects/ui-lib-custom/src/lib/data-view/data-view.component.html
  - projects/ui-lib-custom/src/lib/data-view/data-view.component.scss
  - projects/ui-lib-custom/src/lib/data-view/data-view.a11y.spec.ts
  - projects/ui-lib-custom/src/lib/data-view/README.md
  - docs/reference/components/DATAVIEW.md
  - docs/COMPONENT_SCORES.md
  - AI_AGENT_CONTEXT.md
  - docs/implementation/AI_AGENT_CONTEXT_ARCHIVE.md
State: DataView hardening complete. Added labeled filter/sort controls, list/grid toggle buttons with `aria-pressed`, a polite live region for view-mode announcements, unique host IDs, reduced-motion styles, and focus-visible rings across all interactive controls. Added a dedicated DataView accessibility suite and updated DataView docs/score status.
Verification:
  node_modules/.bin/eslint projects/ui-lib-custom/src/lib/data-view/ --max-warnings 0 (PASS)
  node_modules/.bin/jest --testPathPatterns=data-view --no-coverage (64/64 PASS)
  node_modules/.bin/ng build ui-lib-custom (PASS, zero errors)
  node_modules/.bin/jest --testPathPatterns=entry-points --no-coverage (97/97 PASS)
Terminal notes: Playwright browsers were missing for screenshot capture; installed with `npx playwright install chromium`. Screenshot captured at `/tmp/data-view-hardening.png`.
Next step: Continue Tier 5 queue hardening with Button (#41), Alert (#42), and Carousel (#45).

Date: 2026-05-12 [Divider component — 6-phase hardening COMPLETE (#58)]
Changed:
  - projects/ui-lib-custom/src/lib/divider/divider.ts
      • Added module-level `nextDividerId` counter and unique host `dividerId`
      • Added `ariaLabel` + `decorative` inputs and computed ARIA bindings (`ariaOrientation`, `resolvedAriaLabel`, `ariaHidden`)
      • Bound host `id`, `aria-label`, and `aria-hidden` while keeping separator semantics
  - projects/ui-lib-custom/src/lib/divider/divider.scss
      • Added `prefers-reduced-motion: reduce` override
  - projects/ui-lib-custom/src/lib/divider/divider.spec.ts
      • Added coverage for generated ids, decorative `aria-hidden`, and labeled divider behavior
  - projects/ui-lib-custom/src/lib/divider/divider.a11y.spec.ts (CREATED — 12 tests)
      • Added ARIA structure assertions, keyboard/non-live-region checks, and axe-core checks for default/vertical/decorative/labeled states
  - projects/ui-lib-custom/src/lib/divider/README.md
      • Added `ariaLabel` + `decorative` input docs, ARIA behavior table, keyboard table, and expanded accessibility notes
  - docs/COMPONENT_SCORES.md
      • Divider #58: ⏳ Queued → ✅ Done
      • Layout table row populated (API 9, A11y 9, Perf 9, Comp 8, Theme 9, DX 9, Docs 9, Polish 8, Angular 9, Feel 8 — avg 8.7)
  - docs/implementation/AI_AGENT_CONTEXT_ARCHIVE.md
      • Archived the previous oldest handoff to keep only the newest 3 in this file
State: Divider hardening complete. The host now supports decorative vs. labeled accessibility semantics, generated stable ids per instance, reduced-motion styling fallback, updated DX docs, and dedicated divider a11y regression coverage.
Verification:
  node_modules/.bin/eslint projects/ui-lib-custom/src/lib/divider/ --max-warnings 0 (PASS)
  node_modules/.bin/jest --testPathPatterns=divider --no-coverage (36/36 PASS — 24 unit + 12 a11y)
  node_modules/.bin/ng build ui-lib-custom (PASS, zero errors)
  node_modules/.bin/jest --testPathPatterns=entry-points --no-coverage (97/97 PASS)
Terminal notes: Fresh clone required `npm install` before validation. Divider UI screenshot captured at `/tmp/divider-hardening.png` via `npx playwright screenshot` after `npm run serve:demo`.
Next step: Continue Tier 6 queue with Toolbar (#59) hardening.

Date: 2026-05-12 [Carousel component — accessibility hardening COMPLETE (#45)]
Changed:
  - projects/ui-lib-custom/src/lib/carousel/carousel.constants.ts
      • Added CAROUSEL_ARIA_REGION_LABEL, CAROUSEL_ARIA_PAUSE_LABEL, CAROUSEL_ARIA_PLAY_LABEL
      • Updated CAROUSEL_ARIA_PREV_LABEL to 'Previous slide', CAROUSEL_ARIA_NEXT_LABEL to 'Next slide'
  - projects/ui-lib-custom/src/lib/carousel/carousel.component.ts
      • Added host bindings: aria-label (from ariaLabel input), aria-roledescription="carousel"
      • Added inputs: ariaLabel, pauseLabel, playLabel
      • Added playing writable signal and userPaused flag
      • Added autoplayButtonLabel computed signal
      • Added totalSlides computed signal
      • Disabled autoplay when prefers-reduced-motion: reduce is detected
      • Updated ariaSlideNumber() → "Slide N of M" format
      • Updated ariaPageLabel() → "Go to slide N"
      • Added toggleAutoplay() public method for pause button
      • startAutoplay/stopAutoplay now update playing signal
  - projects/ui-lib-custom/src/lib/carousel/carousel.component.html
      • Added autoplay pause/resume button with dynamic aria-label
      • Added aria-atomic="false" to content area live region
      • Added role="group" to all slide items
      • Changed indicator list from tablist/tab/aria-selected to plain ol/aria-current pattern
  - projects/ui-lib-custom/src/lib/carousel/carousel.component.scss
      • Added autoplay button styles
      • Added @media (prefers-reduced-motion: reduce) block suppressing transitions
  - projects/ui-lib-custom/src/lib/carousel/carousel.component.spec.ts
      • Updated ariaSlideNumber / ariaPageLabel expectations to new format
      • Updated indicator tests to use aria-current instead of aria-selected/tablist
  - projects/ui-lib-custom/src/lib/carousel/carousel.a11y.spec.ts (CREATED — 26 tests)
      • region landmark, slide semantics, prev/next labels, indicator aria-current, autoplay pause, keyboard nav, axe-core
  - projects/ui-lib-custom/src/lib/carousel/README.md
      • Full inputs table with new i18n inputs, autoplay API, keyboard shortcuts table, accessibility notes
  - docs/COMPONENT_SCORES.md
      • Carousel #45: ⏳ Queued → ✅ Done (scores: API 8, A11y 9, Perf 8, Comp 8, Theme 8, DX 8, Docs 9, Polish 8, Angular 9, Feel 8 — avg 8.3)
State: Carousel hardening complete. Region landmark, aria-roledescription, per-slide "Slide N of M" labels, role="group" on slides, aria-current on active indicator, autoplay pause button (WCAG 2.1 SC 2.2.2), prefers-reduced-motion CSS+JS suppression, and 26 a11y regression tests all in place.
Verification:
  node_modules/.bin/eslint projects/ui-lib-custom/src/lib/carousel/ --max-warnings 0 (PASS)
  node_modules/.bin/jest --testPathPatterns=carousel --no-coverage (70 PASS — 44 unit + 26 a11y)
  node_modules/.bin/ng build ui-lib-custom (PASS, zero errors)
Terminal notes: Standard npm install required first. Indicator tablist/tab pattern replaced with plain list + aria-current per carousel ARIA pattern guidance.
Next step: Galleria hardening (Tier 5, #46).
