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

Date: 2026-05-12 [Button component — glass-shadow appearance polish]
Changed:
  - projects/ui-lib-custom/src/lib/button/button.scss
      • Exposed remaining glass-shadow style values as CSS custom properties (`active-x/y`, font weight, letter spacing, gradient angle, opacity)
      • Replaced remaining hardcoded glass-shadow active/gradient/opacity values with token usage
  - projects/ui-lib-custom/src/lib/button/button.spec.ts
      • Added `glass-shadow` coverage to the appearance class regression test matrix
  - projects/ui-lib-custom/src/lib/button/button.ts
      • Updated component description to reflect 12 appearances
  - projects/ui-lib-custom/src/lib/button/README.md
      • Updated appearance count math, documented `glass-shadow`, and added a usage example
  - projects/demo/src/app/pages/buttons/buttons.component.html
      • Updated demo copy to 12 appearances
      • Wired the dedicated Glass Shadow demo buttons to the active variant switcher
State: Glass-shadow button appearance is fully wired with tokenized styling values, docs/test coverage, and a variant-aware demo section. No broader button hardening work was started.
Verification:
  npm install (PASS)
  node_modules/.bin/eslint projects/ui-lib-custom/src/lib/button/ projects/demo/src/app/pages/buttons/ --max-warnings 0 (PASS)
  node_modules/.bin/jest --testPathPatterns=projects/ui-lib-custom/src/lib/button --no-coverage (48/48 PASS)
  node_modules/.bin/ng build ui-lib-custom (PASS)
Terminal notes: Fresh clone required `npm install` before validation. An initial ESLint retry using `--ext .ts,.scss,.html` failed by parsing SCSS with the wrong parser; the repository's standard directory-based ESLint command succeeded. Captured the updated demo screenshot after starting `npm run serve:demo` and installing Playwright Chromium locally.
Next step: Resume the queued hardening track with TreeTable (#33) when button appearance follow-up is no longer needed.

Date: 2026-05-12 [ProgressSpinner — 6-phase hardening COMPLETE (#56)]
Changed:
  - projects/ui-lib-custom/src/lib/progress-spinner/progress-spinner.ts
      • Added module-level `let nextProgressSpinnerId: number = 0` counter
      • Added `public readonly spinnerId: string` bound to host `[attr.id]`
  - projects/ui-lib-custom/src/lib/progress-spinner/progress-spinner.html
      • Added `aria-hidden="true"` and `focusable="false"` to the `<svg>` element
  - projects/ui-lib-custom/src/lib/progress-spinner/progress-spinner.scss
      • Added dark mode overrides for bootstrap and minimal variant arc colours
      • Added `@media (prefers-reduced-motion: reduce)` block — disables both rotate and dash animations, holds arc at fixed partial draw
  - projects/ui-lib-custom/src/lib/progress-spinner/progress-spinner.a11y.spec.ts (CREATED — 16 tests)
      • ARIA structure (role, aria-label, aria-busy, SVG aria-hidden, focusable, unique id)
      • ariaLabel reactive updates, two-instance ID uniqueness
      • Visual state (size classes sm/lg)
      • axe-core automated checks (5 states)
  - projects/ui-lib-custom/src/lib/progress-spinner/README.md
      • Full rewrite: ARIA attributes table, keyboard section, reduced-motion note, screen reader UX guidance, dark mode CSS vars
  - docs/COMPONENT_SCORES.md
      • ProgressSpinner #56: ⏳ Queued → ✅ Done; scores API 9, A11y 9, Perf 9, Comp 8, Theme 9, DX 9, Docs 9, Polish 9, Angular 9, Feel 9 — avg 8.9
State: ProgressSpinner hardening complete. SVG aria-hidden, unique instance IDs, prefers-reduced-motion, dark mode, and 16-test a11y regression suite all in place.
Verification:
  node_modules/.bin/eslint projects/ui-lib-custom/src/lib/progress-spinner/ --max-warnings 0 (PASS)
  node_modules/.bin/jest --testPathPatterns=progress-spinner --no-coverage (35/35 PASS — 19 unit + 16 a11y)
  node_modules/.bin/ng build ui-lib-custom (PASS, zero errors)
  node_modules/.bin/jest --testPathPatterns=entry-points --no-coverage (97/97 PASS)
Terminal notes: Dark mode SCSS nesting was invalid — had to write explicit flat selectors instead of `&--variant-*` nesting inside `[data-theme='dark'] .ui-lib-progress-spinner`.
Next step: MeterGroup (#57) hardening — Tier 6 Feedback, segment aria-label values, totals announced.

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
