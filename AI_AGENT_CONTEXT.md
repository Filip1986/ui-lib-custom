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
- **Active focus:** ALL components hardened — 76 original queue items + all new components COMPLETE. Library hardening milestone achieved 2026-05-15.
- **Next queue:** No remaining hardening items. Next milestone: runtime variant switcher, theme preset management, broader axe-core audit.
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
- `DataView` -> ✅ complete + hardened (6-phase, score 8.3/10, 64 tests — 43 unit + 21 a11y)
- `Divider` -> ✅ complete + hardened (6-phase, score 8.7/10, 36 tests — 24 unit + 12 a11y)
- `Fieldset` -> ✅ complete + hardened (6-phase, score 9.0/10, 53 tests — 30 unit + 23 a11y)
- `Panel` -> ✅ complete + hardened (6-phase, score 9.0/10, 110 tests — 87 unit + 23 a11y)
- `ScrollPanel` -> ✅ complete + hardened (6-phase, score 8.9/10, 29 tests — 13 unit + 16 a11y)
- `ScrollTop` -> ✅ complete + hardened (6-phase, score 8.4/10, 37 tests — 23 unit + 14 a11y)
- `Carousel` -> ✅ complete + hardened (6-phase, score 8.3/10, 70 tests — 44 unit + 26 a11y)
- `Galleria` -> ✅ complete + hardened (6-phase, score 8.3/10, 55 tests — 39 unit + 16 a11y)
- `Button` -> ✅ complete + hardened (6-phase, score 8.9/10, 72 tests — 48 unit + 24 a11y)
- `ImageCompare` -> ✅ complete + hardened (6-phase, score 8.9/10, 60 tests — 39 unit + 21 a11y)
- `ToggleSwitch` -> ✅ complete + hardened (6-phase, score 8.8/10, 68 tests — 37 unit + 31 a11y)
- `Icon` -> ✅ complete + hardened (6-phase, score 8.7/10, 30 tests — 12 unit + 18 a11y)
- `IconButton` -> ✅ complete + hardened (6-phase, score 8.6/10, 27 tests — 6 unit + 21 a11y)

---

## Known Blockers / Watch Items

- Non-blocking Jest warning seen during a11y run:
  - `jest-haste-map: Haste module naming collision: ui-lib-custom`
  - between root `package.json` and `projects/ui-lib-custom/package.json`
- Demo build shows pre-existing SCSS budget warnings in `button` and `date-picker` -- not a blocker

---

## Recent Handoffs

Date: 2026-05-15 [Full hardening audit — ToggleSwitch, Icon, IconButton confirmed complete]
Changed:
  - docs/COMPONENT_SCORES.md (scored ToggleSwitch 8.8, Icon 8.7, IconButton 8.6; fixed ToggleButton avg 8.7, KeyFilter avg 8.6, DataView avg 8.3; added ⏳ status symbol; reverted premature ✅ Done badges)
  - docs/prompts/HARDENING_PROMPT_INDEX.md (moved Grid/AutoFocus/FloatLabel/Bind/ToggleSwitch/Icon/IconButton to completed; Needs Hardening now empty)
  - docs/prompts/needs-hardening/ → docs/prompts/completed/ (moved all 7 remaining files)
  - AI_AGENT_CONTEXT.md (updated active focus, next queue, component delta)
State: All 76 original queue items + all new components (ToggleSwitch, Icon, IconButton, Grid, AutoFocus, FloatLabel, Bind, and 17 others) fully hardened and scored ≥ 8.0. Library hardening milestone COMPLETE. needs-hardening/ folder is empty.
Verification:
  node_modules/.bin/jest --testPathPatterns="src/lib/toggle-switch/|src/lib/icon/|src/lib/icon-button/" --no-coverage (125/125 PASS)
Terminal notes: Confirmed via source review that all 3 components had already implemented every criterion from their hardening prompts (aria-readonly, forced-colors, prefers-reduced-motion, DEV warnings, live announcer, native disabled, 44px touch targets, compile-time required inputs). Score discrepancy originated from premature ✅ Done badges in the queue table without corresponding score rows.
Next step: Begin next milestone — runtime variant switcher and theme preset management.

Date: 2026-05-15 [FloatLabel component — 6-phase hardening COMPLETE]
Changed:
  - projects/ui-lib-custom/src/lib/float-label/float-label.ts
  - projects/ui-lib-custom/src/lib/float-label/float-label.scss
  - projects/ui-lib-custom/src/lib/float-label/float-label.spec.ts
  - projects/ui-lib-custom/src/lib/float-label/float-label.a11y.spec.ts
  - projects/ui-lib-custom/src/lib/float-label/README.md
  - docs/COMPONENT_SCORES.md
  - AI_AGENT_CONTEXT.md
  - docs/implementation/AI_AGENT_CONTEXT_ARCHIVE.md
State: FloatLabel now auto-wires projected labels to native controls (including nested inputs inside wrapper components), injects the blank placeholder needed for CSS-only `:placeholder-shown` float detection when omitted, preserves CSS-only float state via `:focus-within`, mirrors projected label IDs to host-level controls like Select through `aria-labelledby`, and documents the legacy `uilib-` selector plus FormField/InputGroup composition guidance. Added focused unit + accessibility coverage for generated label/control wiring, placeholder injection, pointer-event safety, and stylesheet token contracts, and formally recorded FloatLabel as scored/complete.
Verification:
  node_modules/.bin/eslint projects/ui-lib-custom/src/lib/float-label/ --max-warnings 0 (PASS)
  node_modules/.bin/jest --testPathPatterns="src/lib/float-label/" --no-coverage (42/42 PASS)
  node_modules/.bin/ng build ui-lib-custom (PASS, zero errors)
  node_modules/.bin/jest --testPathPatterns=entry-points --no-coverage (97/97 PASS)
Terminal notes: Fresh clone required `npm install` before validation tools were available. Recent GitHub Actions runs on the working branch were checked via MCP and were `action_required` rather than failed-job runs. Playwright MCP browser was locked, so Chromium was installed with `npx playwright install chromium` and the float-label demo screenshot was captured via Node Playwright at `/tmp/float-label-hardening.png`.
Next step: Continue with the next unscored new layout/utility component in `docs/prompts/needs-hardening/` using the same score-first hardening flow.

---

Date: 2026-05-14 [Rating component — formal scoring refresh COMPLETE]
Changed:
  - projects/ui-lib-custom/src/lib/rating/rating.ts
  - projects/ui-lib-custom/src/lib/rating/rating.spec.ts
  - projects/ui-lib-custom/src/lib/rating/rating.a11y.spec.ts
  - projects/ui-lib-custom/src/lib/rating/README.md
  - docs/reference/components/RATING.md
  - docs/COMPONENT_SCORES.md
  - AI_AGENT_CONTEXT.md
  - docs/implementation/AI_AGENT_CONTEXT_ARCHIVE.md
State: Rating now keeps `aria-labelledby` precedence over fallback `aria-label`, emits a DEV-mode warning when no accessible name is provided in interactive mode, exposes richer per-star labels (`N star(s) out of M`), and expands dedicated accessibility coverage to 28 focused tests while formally recording the component as scored/complete in the scorecard.
Verification:
  node_modules/.bin/eslint projects/ui-lib-custom/src/lib/rating/ --max-warnings 0 (PASS)
  node_modules/.bin/jest --testPathPatterns="src/lib/rating/" --no-coverage (81/81 PASS)
  node_modules/.bin/ng build ui-lib-custom (PASS, zero errors)
  node_modules/.bin/jest --testPathPatterns=entry-points --no-coverage (97/97 PASS)
Terminal notes: Fresh clone required `npm install` before validation tools were available. Playwright MCP browser was locked, so Chromium was installed with `npx playwright install chromium` and the rating demo screenshot was captured via Playwright CLI at `/tmp/rating-hardening.png`.
Next step: Continue with the next formally unscored component in the hardening queue.

