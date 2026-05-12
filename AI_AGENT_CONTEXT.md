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

Date: 2026-05-12 [TreeContext contract + TreeSelect tree host id repaired]
Changed:
  - AI_AGENT_CONTEXT.md
  - docs/implementation/AI_AGENT_CONTEXT_ARCHIVE.md
  - projects/ui-lib-custom/src/lib/tree/tree.ts
  - projects/ui-lib-custom/src/lib/tree/tree-node.html
State: Restored the missing `TreeContext` methods on `Tree`, reintroduced optional `hostId` support so `TreeSelect` can wire `aria-controls` to the popup tree, and aligned tree rows with the context API by exposing stable row ids/labels plus decorative icon hiding. The original `TS2420` compile error is fixed and the related tree/tree-select accessibility test slice is green again.
Verification:
  .\node_modules\.bin\ng.cmd build ui-lib-custom (PASS)
  .\node_modules\.bin\jest.cmd --testPathPatterns src/lib/tree/ tree-select --no-coverage (172/172 PASS)
Terminal notes: Initial Jest command using `|` in `--testPathPatterns` was parsed by PowerShell as a pipeline; reran successfully with separate pattern arguments.
Next step: Commit the verified Tree / TreeSelect repair.

Date: 2026-05-12 [Merge conflicts resolved for TreeSelect accessibility PR]
Changed:
  - AI_AGENT_CONTEXT.md
  - docs/COMPONENT_SCORES.md
  - docs/implementation/AI_AGENT_CONTEXT_ARCHIVE.md
  - projects/ui-lib-custom/src/lib/table/table.a11y.spec.ts
  - projects/ui-lib-custom/src/lib/tree/tree.ts
  - projects/ui-lib-custom/src/lib/tree/tree.html
  - projects/ui-lib-custom/src/lib/tree/tree-node.ts
  - projects/ui-lib-custom/src/lib/tree/tree-node.html
  - projects/ui-lib-custom/src/lib/tree/tree.scss
State: Merged the latest `origin/main` into the TreeSelect accessibility branch again, reconciled the repeated Tree/docs conflicts, preserved the already-validated TreeSelect + Tree accessibility behavior, and kept the newer Skeleton bookkeeping from `main`.
Verification:
  node_modules/.bin/eslint projects/ui-lib-custom/src/lib/tree/ projects/ui-lib-custom/src/lib/tree-select/ --max-warnings 0 (PASS)
  node_modules/.bin/jest --testPathPatterns='src/lib/tree/|tree-select' --no-coverage (172/172 PASS)
  node_modules/.bin/ng build ui-lib-custom (PASS, zero errors)
  node_modules/.bin/jest --testPathPatterns=entry-points --no-coverage (97/97 PASS)
Terminal notes: `origin/main` advanced again after the previous merge resolution, so a fourth merge + conflict pass was required.
Next step: Commit the refreshed merge resolution and reply on the PR thread with the new merge commit hash.
Date: 2026-05-12 [FocusTrap utility — accessibility hardening COMPLETE (#73)]
Changed:
  - projects/ui-lib-custom/src/lib/core/a11y/focus-trap.ts
      • Added module-level `nextFocusTrapId` counter and per-instance ids
      • Implemented sentinel-node trapping strategy (start/end sentinels with `tabindex="0"` + `aria-hidden="true"`)
      • Added sentinel lifecycle management and focus routing (start → last, end → first)
      • Kept activation focus behavior (first focusable, fallback to container) and focus restoration on deactivate
  - projects/ui-lib-custom/src/lib/core/a11y/focus-trap.spec.ts
      • Added sentinel creation/attributes, sentinel focus routing, and sentinel cleanup regression tests
  - projects/ui-lib-custom/src/lib/focus-trap/focus-trap.a11y.spec.ts (CREATED — 16 tests)
      • Added ARIA/sentinel structure assertions, keyboard trap behavior, activation/deactivation focus flow, no-focusable fallback, and axe-core checks
  - projects/ui-lib-custom/src/lib/focus-trap/README.md
      • Added ARIA table, CSS custom properties table (none), expanded accessibility notes, and imperative core utility usage
  - docs/COMPONENT_SCORES.md
      • FocusTrap #73: ⏳ Queued → ✅ Done
      • Utilities & Directives table row populated (API 8, A11y 9, Perf 9, Comp 8, Theme 8, DX 8, Docs 9, Polish 8, Angular 9, Feel 8 — avg 8.4)
State: FocusTrap hardening complete. Sentinel nodes now enforce wrap-around focus at both edges while remaining hidden from assistive tech, activation moves focus into the trap, deactivation restores focus to the trigger, and dedicated a11y coverage guards these behaviors.
Verification:
  node_modules/.bin/eslint projects/ui-lib-custom/src/lib/focus-trap/ projects/ui-lib-custom/src/lib/core/a11y/focus-trap.ts projects/ui-lib-custom/src/lib/core/a11y/focus-trap.spec.ts --max-warnings 0 (PASS)
  node_modules/.bin/jest --testPathPatterns=focus-trap --no-coverage (35/35 PASS — core + directive + a11y)
  node_modules/.bin/ng build ui-lib-custom (PASS, zero errors)
  node_modules/.bin/jest --testPathPatterns=entry-points --no-coverage (97/97 PASS)
Terminal notes: Fresh clone required `npm install` before validation tools were available.
Next step: Continue Tier 4 queue with DataView (#38) hardening.
