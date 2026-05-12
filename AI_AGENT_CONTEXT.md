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
- `Inplace` -> ✅ complete + hardened (6-phase, score 8.9/10, 47 tests — 27 unit + 20 a11y)

---

## Known Blockers / Watch Items

- Non-blocking Jest warning seen during a11y run:
  - `jest-haste-map: Haste module naming collision: ui-lib-custom`
  - between root `package.json` and `projects/ui-lib-custom/package.json`
- Demo build shows pre-existing SCSS budget warnings in `button` and `date-picker` -- not a blocker

---

## Recent Handoffs

Date: 2026-05-12 [Alert component — accessibility hardening COMPLETE (#42)]
Changed:
  - AI_AGENT_CONTEXT.md
  - docs/COMPONENT_SCORES.md
  - docs/reference/components/ALERT.md
  - projects/ui-lib-custom/src/lib/alert/README.md
  - projects/ui-lib-custom/src/lib/alert/alert.ts
  - projects/ui-lib-custom/src/lib/alert/alert.html
  - projects/ui-lib-custom/src/lib/alert/alert.scss
  - projects/ui-lib-custom/src/lib/alert/alert.spec.ts
  - projects/ui-lib-custom/src/lib/alert/alert.a11y.spec.ts
State: Alert now uses severity-aware live region roles (`alert` for error/warning, `status` for success/info), sets `aria-live` + `aria-atomic="true"`, exposes i18n-friendly `dismissLabel`, uses a native dismiss button with decorative icons, and includes reduced-motion + focus-visible refinements. Added dedicated alert accessibility regression tests and updated score/docs bookkeeping.
Verification:
  node_modules/.bin/eslint projects/ui-lib-custom/src/lib/alert/ --max-warnings 0 (PASS)
  node_modules/.bin/jest --testPathPatterns=src/lib/alert --no-coverage (41/41 PASS — 28 unit + 13 a11y)
  node_modules/.bin/ng build ui-lib-custom (PASS, zero errors)
  node_modules/.bin/jest --testPathPatterns=entry-points --no-coverage (97/97 PASS)
Terminal notes: Demo screenshot captured at `/tmp/alert-hardening.png`. Playwright MCP browser lock prevented direct playwright-browser usage; installed Playwright Chromium and captured the screenshot via a Node Playwright script.
Next step: Message hardening (Tier 5, #43).

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

Date: 2026-05-12 [Inplace component — 6-phase hardening COMPLETE (#63)]
Changed:
  - projects/ui-lib-custom/src/lib/inplace/inplace.ts
      • Added module-level `nextInplaceId` counter; unique `instanceId`, `displayId`, `contentId` per instance
      • Injected `ElementRef` + `Injector` for post-render focus management
      • Converted display trigger: display slot now a native `<button>` with `aria-expanded`, `aria-controls`, `aria-label`
      • Added `displayLabel` + `closeLabel` inputs (i18n-friendly, default to existing strings)
      • `activate()` uses `afterNextRender` to focus first focusable element in content slot
      • `deactivate()` uses `afterNextRender` to restore focus to the display button
      • Added `onContentKeydown()` — Escape deactivates and stops propagation
      • Host binding `[id]`: `instanceId`
  - projects/ui-lib-custom/src/lib/inplace/inplace.html
      • Display: `<div role="button">` → native `<button type="button">` with `[disabled]`, `[attr.aria-expanded]`, `[attr.aria-controls]`, `[attr.aria-label]`
      • Content wrapper: added `[id]="contentId"`, `[attr.aria-hidden]="!active() || null"`, `(keydown)="onContentKeydown($event)"`
      • Close button: `aria-label="Close editor"` → `[attr.aria-label]="closeLabel()"`
  - projects/ui-lib-custom/src/lib/inplace/inplace.scss
      • Added `@media (prefers-reduced-motion: reduce)` overrides for display + close-button transitions
  - projects/ui-lib-custom/src/lib/inplace/inplace.spec.ts
      • Updated 3 disabled/tabindex tests for native `<button>` semantics
      • Added 7 new tests: aria-expanded states, aria-controls, host ID, Escape deactivation, aria-label
  - projects/ui-lib-custom/src/lib/inplace/inplace.a11y.spec.ts (CREATED — 20 tests)
      • axe-core checks for default/active-closable/disabled/multi-variant states
      • ARIA structure: button element, aria-expanded false/true, aria-controls, aria-label, close icon aria-hidden, unique host IDs
      • Disabled state: native disabled attribute, aria-expanded still present
      • Keyboard: Enter/Space activate, Escape deactivates, aria-expanded state transitions
  - projects/ui-lib-custom/src/lib/inplace/README.md
      • Added `displayLabel` + `closeLabel` input rows; full ARIA attributes table; keyboard table; accessibility section
  - docs/COMPONENT_SCORES.md
      • Inplace #63: ⏳ Queued → ✅ Done
      • Utilities table row populated (API 9, A11y 9, Perf 9, Comp 8, Theme 9, DX 9, Docs 9, Polish 9, Angular 9, Feel 9 — avg 8.9)
  - docs/implementation/AI_AGENT_CONTEXT_ARCHIVE.md
      • Archived the DataView handoff to keep only the newest 3 in this file
State: Inplace hardening complete. Display trigger is now a native button with correct aria-expanded/aria-controls semantics. Focus management (activate → content, deactivate → display button) is implemented via afterNextRender. Escape key deactivates. Content is aria-hidden when inactive. i18n-friendly displayLabel/closeLabel inputs added. 47 tests pass (27 unit + 20 a11y).
Verification:
  node_modules/.bin/eslint projects/ui-lib-custom/src/lib/inplace/ --max-warnings 0 (PASS)
  node_modules/.bin/jest --testPathPatterns=inplace --no-coverage (47/47 PASS — 27 unit + 20 a11y)
  node_modules/.bin/ng build ui-lib-custom (PASS, zero errors)
  node_modules/.bin/jest --testPathPatterns=entry-points --no-coverage (97/97 PASS)
Terminal notes: axe flagged unlabeled `<input>` inside hidden content slot when JSDOM doesn't compute CSS; resolved by adding `[attr.aria-hidden]="!active() || null"` to content wrapper (matches fieldset/panel pattern).
Next step: Continue Tier 6 queue — Toolbar (#59) or Image (#66) hardening.
