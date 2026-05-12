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
- **Active focus:** ScrollTop (#75), ScrollPanel (#62), SplitButton (#68), TreeTable (#33), Tree (#34), Timeline (#71) and Upload (#69) accessibility hardening COMPLETE (6-phase); Tag (#53), ProgressSpinner (#56), Panel (#60), MeterGroup (#57), Ripple (#74), BlockUI (#64), BottomSheet (#76), Card (#51), Chart (#72), Chip (#54), ContextMenu (#14) also merged
- **Next queue:** TreeSelect hardening (Tier 4, #35) — combobox + tree popup pattern
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
- `SplitButton` -> ✅ complete + hardened (6-phase, score 8.6/10, 78 tests — 56 unit + 22 a11y)

---

## Known Blockers / Watch Items

- Non-blocking Jest warning seen during a11y run:
  - `jest-haste-map: Haste module naming collision: ui-lib-custom`
  - between root `package.json` and `projects/ui-lib-custom/package.json`
- Demo build shows pre-existing SCSS budget warnings in `button` and `date-picker` -- not a blocker

---

## Recent Handoffs

Date: 2026-05-12 [ScrollTop component — accessibility hardening COMPLETE (#75)]
Changed:
  - projects/ui-lib-custom/src/lib/scroll-top/scroll-top.ts
      • Added module-level `nextScrollTopId` counter and unique host `scrollTopId`
      • Switched window access to `DOCUMENT`/`defaultView` for SSR-safe scroll handling
      • Added non-empty `resolvedButtonAriaLabel` fallback (`'Scroll to top'`)
      • Synced initial visibility on init and kept hidden state reflected through host `aria-hidden`
  - projects/ui-lib-custom/src/lib/scroll-top/scroll-top.html
      • Added hidden-state `aria-hidden` + `tabindex="-1"` handling on the button
      • Bound button aria-label to the resolved non-empty label
  - projects/ui-lib-custom/src/lib/scroll-top/scroll-top.scss
      • Kept the existing focus-visible ring, added reduced-motion overrides, and added dark-mode overrides for material/bootstrap variants
  - projects/ui-lib-custom/src/lib/scroll-top/scroll-top.spec.ts
      • Updated default aria-label expectations and added coverage for fallback labels, hidden focusability, icon aria-hidden, and unique host ids
  - projects/ui-lib-custom/src/lib/scroll-top/scroll-top.a11y.spec.ts (CREATED — 14 tests)
      • Added ARIA structure, hidden/visible keyboard focusability, unique ids, threshold visibility, parent-target visibility, and axe-core coverage
  - projects/ui-lib-custom/src/lib/scroll-top/README.md
      • Expanded CSS custom properties documentation, ARIA table, keyboard table, and accessibility notes
  - projects/demo/src/app/pages/scroll-top/scroll-top-demo.component.html
      • Updated API table docs to reflect the new default button aria-label
  - docs/COMPONENT_SCORES.md
      • ScrollTop #75: ⏳ Queued → ✅ Done
      • Utilities & Directives table populated (API 8, A11y 9, Perf 8, Comp 8, Theme 9, DX 8, Docs 9, Polish 8, Angular 9, Feel 8 — avg 8.4)
State: ScrollTop hardening complete. Hidden instances are now removed from the accessibility tree and tab order, the default label is guaranteed for the icon-only button, unique ids and SSR-safe scroll access are in place, and dedicated a11y regression coverage was added.
Verification:
  node_modules/.bin/eslint projects/ui-lib-custom/src/lib/scroll-top/ --max-warnings 0 (PASS)
  node_modules/.bin/jest --testPathPatterns=scroll-top --no-coverage (37/37 PASS — 23 unit + 14 a11y)
  node_modules/.bin/ng build ui-lib-custom (PASS, zero errors)
  node_modules/.bin/jest --testPathPatterns=entry-points --no-coverage (97/97 PASS)
Terminal notes: Fresh clone required `npm install` before validation tools were available. Screenshot captured at `/tmp/scroll-top-hardening.png`.
Next step: TreeTable (#33) hardening — Tier 4 Data Display treegrid pass.

Date: 2026-05-12 [SplitButton component — accessibility hardening COMPLETE (#68)]
Changed:
  - projects/ui-lib-custom/src/lib/split-button/split-button.component.ts
      • Renamed the module-level instance counter to `nextSplitButtonId`, exposed a public `instanceId`, and bound it to the host `id`
      • Added `resolvedButtonAriaLabel` fallback logic for icon-only primary buttons without projected text
      • Added stable per-item track keys/IDs for menu rendering
      • Switched URL opening to `document.defaultView?.open(...)` for safer browser-only access
  - projects/ui-lib-custom/src/lib/split-button/split-button.component.html
      • Marked default decorative icons as `aria-hidden="true"`
      • Wired primary button accessible-name fallback and stable `@for` tracking
      • Kept menu trigger/menu/item ARIA semantics aligned with the hardened menu-button pattern
  - projects/ui-lib-custom/src/lib/split-button/split-button.component.scss
      • Added `prefers-reduced-motion: reduce` overrides for button/menu transitions and loading/menu animations
  - projects/ui-lib-custom/src/lib/split-button/split-button.a11y.spec.ts (CREATED — 22 tests)
      • Added ARIA structure assertions, keyboard-navigation coverage, unique-ID checks, decorative-icon checks, and axe-core validation
  - projects/ui-lib-custom/src/lib/split-button/README.md
      • Rewrote the README with full inputs/outputs, ARIA table, keyboard table, CSS custom properties table, and accessibility notes
  - docs/reference/components/SPLITBUTTON.md
      • Synced reference docs with icon-only accessible-name fallback, decorative icon handling, unique IDs, and reduced-motion behavior
  - docs/reference/components/README.md
      • Added SplitButton hardening highlights to the component index
  - docs/COMPONENT_SCORES.md
      • SplitButton #68: ⏳ Queued → ✅ Done; populated score row (API 9, A11y 9, Perf 8, Comp 8, Theme 9, DX 9, Docs 9, Polish 8, Angular 9, Feel 8 — avg 8.6)
State: SplitButton hardening complete. Menu-button ARIA behavior remains intact, icon-only primary actions now get a safe accessible-name fallback, decorative icons are hidden from assistive tech, reduced-motion support is explicit, and a dedicated 22-test accessibility suite is in place.
Verification:
  node_modules/.bin/eslint projects/ui-lib-custom/src/lib/split-button/ --max-warnings 0 (PASS)
  node_modules/.bin/jest --testPathPatterns=split-button --no-coverage (78/78 PASS — 56 unit + 22 a11y)
  node_modules/.bin/ng build ui-lib-custom (PASS, zero errors)
  node_modules/.bin/jest --testPathPatterns=entry-points --no-coverage (97/97 PASS)
Terminal notes: Fresh clone required `npm install` before validation tools were available. Screenshot captured at `/tmp/split-button-hardening.png`.
Next step: TreeTable (#33) hardening — Tier 4 Data Display treegrid pass.

Date: 2026-05-12 [ScrollPanel — 6-phase hardening COMPLETE (#62)]
Changed:
  - projects/ui-lib-custom/src/lib/scroll-panel/scroll-panel.ts
      • Added module-level `let nextScrollPanelId: number = 0` counter and unique `componentId`/`contentId`
      • Added `ariaLabel` input (`string | null`, default `null`) wired to `__content` via `[attr.aria-label]`
  - projects/ui-lib-custom/src/lib/scroll-panel/scroll-panel.html
      • Added `role="region"`, `tabindex="0"`, `[id]="contentId"`, `[attr.aria-label]="ariaLabel()"` to `__content` div
  - projects/ui-lib-custom/src/lib/scroll-panel/scroll-panel.scss
      • Added `outline: none` + `:focus-visible` ring on `__content`
  - projects/ui-lib-custom/src/lib/scroll-panel/README.md
      • Added `ariaLabel` input to inputs table
      • Added ARIA attributes table, keyboard interaction table, expanded accessibility section
      • Updated usage examples to show `ariaLabel` in context
  - projects/ui-lib-custom/src/lib/scroll-panel/scroll-panel.a11y.spec.ts (CREATED — 16 tests)
      • axe-core checks (3): labelled, unlabelled, all variants
      • ARIA structure (6): role=region, tabindex=0, aria-label present/absent, id format, unique IDs
      • Dynamic label (2): aria-label updates on signal change, removed on null
      • Keyboard (3): focusable, ArrowDown no error, PageDown no error
      • Multi-variant (1): all 3 variants expose role+tabindex
  - docs/COMPONENT_SCORES.md
      • ScrollPanel #62: ⏳ Queued → ✅ Done
      • Layout table row: 9/9/9/8/9/9/9/9/9/9 avg 8.9
State: ScrollPanel hardening complete. Scrollable region is now keyboard-accessible (tabindex=0, role=region), has an ariaLabel input for screen reader context, unique stable IDs per instance, and :focus-visible ring for visible focus indicator.
Verification:
  node_modules/.bin/eslint projects/ui-lib-custom/src/lib/scroll-panel/ --max-warnings 0 (PASS)
  node_modules/.bin/jest --testPathPatterns=scroll-panel --no-coverage (29/29 PASS — 13 unit + 16 a11y)
  node_modules/.bin/ng build ui-lib-custom (PASS, zero errors)
  node_modules/.bin/jest --testPathPatterns=entry-points --no-coverage (97/97 PASS)
Next step: Continue with Tier 6 queue — Tag (#53), Skeleton (#55), Divider (#58) or Toolbar (#59).
