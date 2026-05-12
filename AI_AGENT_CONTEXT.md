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
- **Active focus:** Listbox (#36) and Ripple (#74) accessibility hardening COMPLETE (6-phase); BlockUI (#64), BottomSheet (#76), Card (#51), Chart (#72), Chip (#54), ContextMenu (#14) also merged
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
- `Ripple` -> ✅ complete + hardened (6-phase, score 8.7/10, 29 tests — 19 unit + 10 a11y)
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

Date: 2026-05-12 [Listbox component — accessibility hardening COMPLETE (#36)]
Changed:
  - projects/ui-lib-custom/src/lib/listbox/listbox.component.ts
      • Switched to module-level monotonic instance ids with `listboxIdCounter++`
      • Added SSR-safe scroll handling using `isPlatformBrowser` + `PLATFORM_ID`
      • Fixed `aria-activedescendant` mapping to option row ids across grouped/filter states
      • Added stable `trackByFlatItem` keys for mixed group/option rendering
      • Added polite live-region announcement state for filter and selection updates
  - projects/ui-lib-custom/src/lib/listbox/listbox.component.html
      • Added sr-only live region (`aria-live="polite"`, `aria-atomic="true"`)
      • Added decorative icon guards (`aria-hidden="true"`, `focusable="false"`) on SVGs
      • Switched `@for` tracking to stable component track function
  - projects/ui-lib-custom/src/lib/listbox/listbox.component.scss
      • Added `:focus-visible` rings for filter input, list container, and toggle-all checkbox
      • Added sr-only live-region utility class
      • Added `@media (prefers-reduced-motion: reduce)` override for item/checkbox transitions
  - projects/ui-lib-custom/src/lib/listbox/listbox.a11y.spec.ts (CREATED — 33 tests)
      • Added ARIA structure, keyboard + `aria-activedescendant`, live region, unique id, and axe checks
  - projects/ui-lib-custom/src/lib/listbox/README.md
      • Added ARIA attributes table, keyboard interaction table, CSS custom properties table, and accessibility notes
  - docs/COMPONENT_SCORES.md
      • Listbox #36: ⏳ Queued → ✅ Done; score row populated (avg 8.6)
State: Listbox hardening complete. Unique ids, resilient `aria-activedescendant`, reduced-motion support,
  focus-visible treatment, and dedicated a11y regression coverage are in place.
Verification:
  node_modules/.bin/eslint projects/ui-lib-custom/src/lib/listbox/ --max-warnings 0 (PASS)
  node_modules/.bin/jest --testPathPatterns=listbox --no-coverage (88/88 PASS — 55 unit + 33 a11y)
  node_modules/.bin/ng build ui-lib-custom (PASS, zero errors)
  node_modules/.bin/jest --testPathPatterns=entry-points --no-coverage (97/97 PASS)
Terminal notes: Fresh clone required `npm install` before validation. Screenshot captured via Playwright CLI: https://github.com/user-attachments/assets/b1aa76ec-c07a-426d-af62-2a7fdd539e6c
Next step: TreeTable (#33) hardening — Tier 4 Data Display treegrid pass.

Date: 2026-05-12 [Merge conflict resolution for glass-shadow button PR]
Changed:
  - AI_AGENT_CONTEXT.md
      • Resolved merge conflict by preserving the newest three handoffs in active context
      • Added this merge-resolution handoff and kept recent session state concise
  - docs/implementation/AI_AGENT_CONTEXT_ARCHIVE.md
      • Archived the displaced older handoff during the merge resolution
  - tsconfig.json
      • Added `compilerOptions.ignoreDeprecations: "5.0"` so the TypeScript 5.9 pre-push `npm run typecheck` hook passes with the existing `baseUrl` setting
State: Branch is merged with the latest origin/main. Merge conflicts were limited to session-context files, and the pre-push typecheck blocker was resolved without changing application logic.
Verification:
  npm install (PASS)
  npm run typecheck (PASS)
Terminal notes: Repository was a shallow clone, so `git fetch --unshallow origin` and `git fetch origin main:refs/remotes/origin/main` were required before merging. Initial typecheck first failed on the `baseUrl` deprecation gate, and then on missing local packages until `npm install` was rerun.
Next step: Continue with the next queued component hardening item once this PR is mergeable again.

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
