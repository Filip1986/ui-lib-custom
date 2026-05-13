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
- **Active focus:** ScrollTop (#75), ScrollPanel (#62), TreeTable (#33), Tree (#34), TreeSelect (#35), Timeline (#71), Upload (#69), and Skeleton (#55) accessibility hardening COMPLETE (6-phase); Tag (#53), ProgressSpinner (#56), Panel (#60), MeterGroup (#57), Ripple (#74), BlockUI (#64), BottomSheet (#76), Card (#51), Chart (#72), Chip (#54), ContextMenu (#14), **Input (#21)** also merged
- **Next queue:** Alert hardening (Tier 5, #42) — next after Button
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
- `DataView` -> ✅ complete + hardened (6-phase, score 8.5/10, 64 tests — 43 unit + 21 a11y)
- `Divider` -> ✅ complete + hardened (6-phase, score 8.7/10, 36 tests — 24 unit + 12 a11y)
- `Fieldset` -> ✅ complete + hardened (6-phase, score 9.0/10, 53 tests — 30 unit + 23 a11y)
- `Panel` -> ✅ complete + hardened (6-phase, score 9.0/10, 110 tests — 87 unit + 23 a11y)
- `ScrollPanel` -> ✅ complete + hardened (6-phase, score 8.9/10, 29 tests — 13 unit + 16 a11y)
- `ScrollTop` -> ✅ complete + hardened (6-phase, score 8.4/10, 37 tests — 23 unit + 14 a11y)
- `Carousel` -> ✅ complete + hardened (6-phase, score 8.3/10, 70 tests — 44 unit + 26 a11y)
- `Galleria` -> ✅ complete + hardened (6-phase, score 8.3/10, 55 tests — 39 unit + 16 a11y)
- `Button` -> ✅ complete + hardened (6-phase, score 8.9/10, 72 tests — 48 unit + 24 a11y)
- `ImageCompare` -> ✅ complete + hardened (6-phase, score 8.9/10, 60 tests — 39 unit + 21 a11y)

---

## Known Blockers / Watch Items

- Non-blocking Jest warning seen during a11y run:
  - `jest-haste-map: Haste module naming collision: ui-lib-custom`
  - between root `package.json` and `projects/ui-lib-custom/package.json`
- Demo build shows pre-existing SCSS budget warnings in `button` and `date-picker` -- not a blocker

---

## Recent Handoffs

Date: 2026-05-13 [Input component — 6-phase hardening COMPLETE (Tier 3, #21)]
Changed:
  - projects/ui-lib-custom/src/lib/input/input.ts (added ariaLabel, ariaLabelledBy inputs)
  - projects/ui-lib-custom/src/lib/input/input.html (bound aria-label, aria-labelledby)
  - projects/ui-lib-custom/src/lib/input/input.a11y.spec.ts (added 4 ariaLabel/ariaLabelledBy tests → 39 total)
  - projects/ui-lib-custom/src/lib/input/README.md (documented ariaLabel, ariaLabelledBy inputs)
  - docs/COMPONENT_SCORES.md (Input: 🔴 → 🟢, score 8.8/10)
  - AI_AGENT_CONTEXT.md
State: Input now supports ariaLabel and ariaLabelledBy signal inputs bound to the native input element, completing the label association story. All pre-existing a11y features (aria-invalid, aria-describedby, aria-required, aria-readonly, disabled, prefers-reduced-motion, label for/id association) were already in place. 69 tests (35 unit + 34 a11y).
Verification:
  node_modules/.bin/eslint projects/ui-lib-custom/src/lib/input/ --max-warnings 0 (PASS)
  node_modules/.bin/jest --testPathPatterns="src/lib/input/" --no-coverage (69/69 PASS)
  node_modules/.bin/ng build ui-lib-custom (PASS, zero errors)
  node_modules/.bin/jest --testPathPatterns=entry-points --no-coverage (97/97 PASS)
Terminal notes: npm install required before validation. Build took ~44s.
Next step: Table hardening (Tier 4, #32) — already marked Done. Continue with RadioButton (#23), Slider (#27), or Password (#29).

Date: 2026-05-13 [Inline layout component — 6-phase hardening COMPLETE]
Changed:
  - projects/ui-lib-custom/src/lib/layout/inline.ts
  - projects/ui-lib-custom/src/lib/layout/inline.html (NEW)
  - projects/ui-lib-custom/src/lib/layout/inline.scss
  - projects/ui-lib-custom/src/lib/layout/inline.types.ts
  - projects/ui-lib-custom/src/lib/layout/inline.spec.ts
  - projects/ui-lib-custom/src/lib/layout/inline.a11y.spec.ts (NEW, 11 tests)
  - projects/ui-lib-custom/src/lib/layout/README.md
  - docs/COMPONENT_SCORES.md
  - AI_AGENT_CONTEXT.md
  - docs/implementation/AI_AGENT_CONTEXT_ARCHIVE.md
State: Inline now supports semantic rendered tags through `as`/`tag` (`div` default with `span`/`ul`/`ol` options), preserves host-first projection without adding landmark roles, documents wrap/read-order constraints, and ships dedicated accessibility coverage for default semantics, tag alias behavior, and DOM-order safety.
Verification:
  node_modules/.bin/eslint projects/ui-lib-custom/src/lib/layout/ --max-warnings 0 (PASS)
  node_modules/.bin/jest --testPathPatterns="src/lib/layout/inline" --no-coverage (27/27 PASS — 16 unit + 11 a11y)
  node_modules/.bin/ng build ui-lib-custom (PASS, zero errors)
Terminal notes: Fresh clone required `npm install` before validation. Playwright MCP browser remained locked, so Chromium was installed with `npx playwright install chromium` and the demo screenshot was captured via Node Playwright at `/tmp/inline-hardening.png`.
Next step: Harden Stack with the same semantic `as`/`tag` and landmark/read-order constraints for layout parity.

Date: 2026-05-13 [AnimateOnScroll directive — 6-phase hardening COMPLETE]
Changed:
  - projects/ui-lib-custom/src/lib/animate-on-scroll/animate-on-scroll.ts
  - projects/ui-lib-custom/src/lib/animate-on-scroll/animate-on-scroll.scss
  - projects/ui-lib-custom/src/lib/animate-on-scroll/animate-on-scroll.spec.ts
  - projects/ui-lib-custom/src/lib/animate-on-scroll/animate-on-scroll.a11y.spec.ts
  - projects/ui-lib-custom/src/lib/animate-on-scroll/README.md
  - docs/COMPONENT_SCORES.md
  - AI_AGENT_CONTEXT.md
State: AnimateOnScroll now enforces `prefers-reduced-motion` by skipping observer/class animation paths and forcing visible static state, adds non-IntersectionObserver visible fallback for progressive enhancement, schedules class mutations via `requestAnimationFrame`, ships reduced-motion preset CSS safeguards, and includes a dedicated accessibility spec for reduced-motion + observer cleanup behavior.
Verification:
  node_modules/.bin/eslint projects/ui-lib-custom/src/lib/animate-on-scroll/ --max-warnings 0 (PASS)
  node_modules/.bin/jest --testPathPatterns="src/lib/animate-on-scroll/" --no-coverage (PASS)
  node_modules/.bin/ng build ui-lib-custom (PASS, zero errors)
  node_modules/.bin/jest --testPathPatterns=entry-points --no-coverage (97/97 PASS)
Terminal notes: Fresh clone required `npm install` before validation tools were available. Screenshot captured at `/tmp/animate-on-scroll-hardening.png`.
Next step: Continue hardening remaining new utility directives in `docs/prompts/needs-hardening/`.
