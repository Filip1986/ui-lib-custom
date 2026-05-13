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

Date: 2026-05-12 [ImageCompare component — 6-phase hardening COMPLETE (#67)]
Changed:
  - projects/ui-lib-custom/src/lib/image-compare/image-compare.ts
      • Added module-level `nextImageCompareId` counter and unique host `instanceId`
      • Bound `[id]` to `instanceId` in host metadata
      • Added `ariaValueText` computed signal (`"N percent"` format)
  - projects/ui-lib-custom/src/lib/image-compare/image-compare.html
      • Added `[attr.aria-valuetext]="ariaValueText()"` to the handle
  - projects/ui-lib-custom/src/lib/image-compare/image-compare.scss
      • Added `@media (prefers-reduced-motion: reduce)` block disabling handle transitions
  - projects/ui-lib-custom/src/lib/image-compare/image-compare.a11y.spec.ts (CREATED — 21 tests)
      • ARIA structure, keyboard nav, image alt, decorative aria-hidden, disabled state, unique ID, and axe-core assertions
  - projects/ui-lib-custom/src/lib/image-compare/README.md
      • Updated `ariaLabel` default, added Keyboard Interaction table, ARIA Attributes table, CSS Custom Properties table, and Accessibility section
  - docs/COMPONENT_SCORES.md
      • ImageCompare #67: ⏳ Queued → ✅ Done (scores: API 9, A11y 9, Perf 9, Comp 8, Theme 9, DX 9, Docs 9, Polish 9, Angular 9, Feel 9 — avg 8.9)
  - docs/implementation/AI_AGENT_CONTEXT_ARCHIVE.md
      • Archived oldest DataView handoff to keep only the newest 3 in this file
State: ImageCompare hardening complete. Component now has aria-valuetext, unique generated IDs per instance, prefers-reduced-motion SCSS guard, and a full 21-test a11y spec (role=slider, ARIA value attrs, image alt, decorative aria-hidden, keyboard nav, disabled state, axe-core).
Verification:
  node_modules/.bin/eslint projects/ui-lib-custom/src/lib/image-compare/ --max-warnings 0 (PASS)
  node_modules/.bin/jest --testPathPatterns=image-compare --no-coverage (60/60 PASS — 39 unit + 21 a11y)
  node_modules/.bin/ng build ui-lib-custom (PASS, zero errors)
  node_modules/.bin/jest --testPathPatterns=entry-points --no-coverage (97/97 PASS)
Terminal notes: No blocking issues. All tests and build green on first attempt after npm install.
Next step: Continue Tier 6 queue with remaining queued components.

Date: 2026-05-13 [Toolbar component — 6-phase hardening COMPLETE (#59)]
Changed:
  - projects/ui-lib-custom/src/lib/toolbar/toolbar.ts
      • Added module-level `nextToolbarId` counter and unique host `toolbarId`
      • Bound `[id]` to host metadata
      • Injected `ElementRef` for DOM-querying keyboard navigation
      • Added `(keydown)` and `(focusin)` host listeners for roving-tabindex navigation
      • Implemented WAI-ARIA Toolbar Pattern: ArrowRight/Left/Up/Down, Home, End with wrap-around
      • Added `afterNextRender` init to set initial roving tabindex on projected items
  - projects/ui-lib-custom/src/lib/toolbar/toolbar.scss
      • Added `:focus-visible` ring (2 px outline, outline-offset 2px) for all interactive elements
      • Added `@media (prefers-reduced-motion: reduce)` block
  - projects/ui-lib-custom/src/lib/toolbar/toolbar.spec.ts
      • Added tests for unique ID, two-instance ID uniqueness, keyboard navigation (ArrowRight/Left, wrap, Home/End, tabindex updates)
  - projects/ui-lib-custom/src/lib/toolbar/toolbar.a11y.spec.ts (CREATED — 20 tests)
      • axe-core: default, no-label, icon-only
      • ARIA: role=toolbar, aria-label, decorative aria-hidden, icon button aria-label
      • Unique IDs: generated id pattern, two-instance uniqueness
      • Roving tabindex: initial state, non-active items, focusin update
      • Keyboard: ArrowRight/Left/Down/Up, wrap, Home, End, tabindex update after nav
  - projects/ui-lib-custom/src/lib/toolbar/README.md
      • Added ARIA Attributes table, Keyboard Interaction table, WAI-ARIA pattern link
      • Expanded Accessibility section with icon-only button guidance and focus/motion notes
  - docs/COMPONENT_SCORES.md
      • Toolbar #59: ⏳ Queued → ✅ Done
      • Layout table row populated (API 9, A11y 9, Perf 9, Comp 8, Theme 9, DX 9, Docs 9, Polish 9, Angular 9, Feel 9 — avg 8.9)
  - docs/implementation/AI_AGENT_CONTEXT_ARCHIVE.md
      • Archived Alert #42 handoff to keep only newest 3 here
State: Toolbar hardening complete. Component now has unique generated IDs, full WAI-ARIA Toolbar keyboard pattern (roving tabindex, arrow-key nav with wrap, Home/End), :focus-visible rings, prefers-reduced-motion guard, updated README with all tables, and 20-test a11y spec + 8 new keyboard nav unit tests (48 total: 27 unit + 20 a11y + 1 two-instance).
Verification:
  node_modules/.bin/eslint projects/ui-lib-custom/src/lib/toolbar/ --max-warnings 0 (PASS)
  node_modules/.bin/jest --testPathPatterns=toolbar --no-coverage (48/48 PASS — 27 unit + 20 a11y + 1 ID uniqueness)
  node_modules/.bin/ng build ui-lib-custom (PASS, zero errors)
  node_modules/.bin/jest --testPathPatterns=entry-points --no-coverage (97/97 PASS)
Terminal notes: No blocking issues. All validations green on first attempt after npm install.
Next step: Continue Tier 6 queue — SpeedDial (#47) or SelectButton (#48) or VirtualScroller (#50).
