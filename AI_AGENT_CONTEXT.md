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
- **Active focus:** Timeline accessibility hardening COMPLETE (6-phase, #71); MeterGroup (#57), Panel (#60), Ripple (#74), BlockUI (#64), BottomSheet (#76), Card (#51), Chart (#72), Chip (#54), and ContextMenu (#14) also merged
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
- `MeterGroup` -> ✅ complete + hardened (6-phase, score 8.3/10, 45 tests — 27 unit + 18 a11y)
- `Panel` -> ✅ complete + hardened (6-phase, score 9.0/10, 110 tests — 87 unit + 23 a11y)

---

## Known Blockers / Watch Items

- Non-blocking Jest warning seen during a11y run:
  - `jest-haste-map: Haste module naming collision: ui-lib-custom`
  - between root `package.json` and `projects/ui-lib-custom/package.json`
- Demo build shows pre-existing SCSS budget warnings in `button` and `date-picker` -- not a blocker

---

## Recent Handoffs

Date: 2026-05-12 [Timeline component — accessibility hardening COMPLETE (#71)]
Changed:
  - projects/ui-lib-custom/src/lib/timeline/timeline.component.ts
      • Renamed the module-level counter to `nextTimelineId` and bound a unique host `id` per instance
      • Replaced generic per-item aria labels with `aria-labelledby` wiring based on generated content/opposite ids
      • Added fallback event text generation from common item fields and a stable `trackItem()` helper
  - projects/ui-lib-custom/src/lib/timeline/timeline.component.html
      • Added generated ids for content/opposite regions used by each listitem's accessible name
      • Added default content rendering when no content template is supplied
      • Marked decorative connectors and default marker dots as `aria-hidden="true"`
  - projects/ui-lib-custom/src/lib/timeline/timeline.component.scss
      • Added focus-within ring styling for projected interactive content
      • Added dark-mode token overrides for bootstrap/minimal variants
      • Added `prefers-reduced-motion: reduce` override for marker transitions
  - projects/ui-lib-custom/src/lib/timeline/timeline.component.spec.ts
      • Updated accessibility assertions for generated ids / `aria-labelledby`
      • Added fallback-content and host-id regression coverage
  - projects/ui-lib-custom/src/lib/timeline/timeline.a11y.spec.ts (CREATED — 15 tests)
      • Added ARIA structure, decorative aria-hidden, keyboard/tab-order, unique-id, and axe-core coverage
  - projects/ui-lib-custom/src/lib/timeline/README.md
      • Added ARIA attributes table, keyboard interaction section, accessibility notes, and CSS custom properties table
  - docs/reference/components/TIMELINE.md
      • Synced public docs with the new accessibility behaviour and focus/reduced-motion notes
  - docs/COMPONENT_SCORES.md
      • Timeline #71 queue status: ⏳ Queued → ✅ Done
      • Data Display score row populated (API 8, A11y 9, Perf 8, Comp 8, Theme 8, DX 8, Docs 9, Polish 8, Angular 9, Feel 8 — avg 8.3)
State: Timeline hardening complete. The component now exposes stable host ids, semantic listitem names derived from visible event content, decorative separators are hidden from assistive tech, reduced-motion handling is in place, and dedicated a11y regression coverage was added.
Verification:
  node_modules/.bin/eslint projects/ui-lib-custom/src/lib/timeline/ --max-warnings 0 (PASS)
  node_modules/.bin/jest --testPathPatterns=timeline --no-coverage (48/48 PASS — 33 unit + 15 a11y)
  node_modules/.bin/ng build ui-lib-custom (PASS, zero errors)
  node_modules/.bin/jest --testPathPatterns=entry-points --no-coverage (97/97 PASS)
Terminal notes: Fresh clone required `npm install`; Playwright browser install was needed for the demo screenshot. Screenshot captured at `/tmp/timeline-hardening.png`.
Next step: TreeTable (#33) hardening — Tier 4 Data Display treegrid pass.

Date: 2026-05-12 [MeterGroup component — accessibility hardening COMPLETE (#57)]
Changed:
  - projects/ui-lib-custom/src/lib/meter-group/meter-group.ts
      • Added module-level `nextMeterGroupId` counter and unique host `instanceId`
      • Added `ariaLabel` input and wired group ARIA label to template
      • Fixed segment percentage calculation to respect `min`/`max` range (`(value - min) / (max - min)`)
      • Added computed `totalValue` + `totalAnnouncement` for live total announcements
      • Added stable segment track helper and richer per-segment aria-label formatter
  - projects/ui-lib-custom/src/lib/meter-group/meter-group.html
      • Updated segment `@for` loops to use stable track keys
      • Bound group `aria-label` to `ariaLabel` input
      • Updated segment `aria-label` output to include value-range phrasing
      • Added polite/atomic live region for total announcement text
  - projects/ui-lib-custom/src/lib/meter-group/meter-group.scss
      • Added visually-hidden live-region utility class
      • Added `prefers-reduced-motion: reduce` override to disable meter transitions
  - projects/ui-lib-custom/src/lib/meter-group/meter-group.spec.ts
      • Added tests for custom group aria-label, min/max-relative percentage calculation, and unique host IDs
  - projects/ui-lib-custom/src/lib/meter-group/meter-group.a11y.spec.ts (CREATED — 18 tests)
      • Added ARIA structure, decorative aria-hidden, live region total updates, keyboard non-focusability, unique IDs, and axe checks
  - projects/ui-lib-custom/src/lib/meter-group/README.md
      • Added `ariaLabel` input docs, ARIA attributes table, keyboard interaction table, and expanded accessibility notes
  - docs/COMPONENT_SCORES.md
      • MeterGroup #57 queue status: ⏳ Queued → ✅ Done
      • MeterGroup score row populated (API 8, A11y 9, Perf 8, Comp 8, Theme 8, DX 8, Docs 9, Polish 8, Angular 9, Feel 8 — avg 8.3)
State: MeterGroup hardening complete. Segment ARIA labels now include value context, totals are announced through a live region, unique instance IDs are generated, reduced-motion support is in place, and dedicated a11y regression coverage is added.
Verification:
  node_modules/.bin/eslint projects/ui-lib-custom/src/lib/meter-group/ --max-warnings 0 (PASS)
  node_modules/.bin/jest --testPathPatterns=meter-group --no-coverage (45/45 PASS — 27 unit + 18 a11y)
  node_modules/.bin/ng build ui-lib-custom (PASS, zero errors)
  node_modules/.bin/jest --testPathPatterns=entry-points --no-coverage (97/97 PASS)
Terminal notes: Fresh clone required `npm install`; screenshot captured at `/tmp/meter-group-hardening.png`.
Next step: TreeTable (#33) hardening — Tier 4 Data Display treegrid pass.

Date: 2026-05-12 [Panel component — accessibility hardening COMPLETE (#60)]
Changed:
  - projects/ui-lib-custom/src/lib/panel/panel.a11y.spec.ts (CREATED — 23 tests)
      • axe-core checks (4): basic, toggleable expanded, toggleable collapsed, all variants
      • ARIA structure (5): role=region, aria-labelledby→header id, header id format, unique IDs, content id format
      • Toggle button ARIA (6): absent when non-toggleable, aria-expanded true/false, aria-controls, accessible label, icon aria-hidden
      • Content visibility ARIA (3): aria-hidden when collapsed, null when expanded, null when non-toggleable
      • Keyboard interaction (3): Enter collapses, Space collapses, Enter expands collapsed panel
      • Content projection (2): custom header rendered, aria-expanded present with custom header
  - projects/ui-lib-custom/src/lib/panel/README.md
      • Expanded CSS custom properties table (added font-size, font-weight, toggle-size entries)
      • Added full ARIA attributes table (host, header div, content div, toggle button, toggle icon)
      • Added keyboard interaction table (Tab, Enter, Space)
      • Replaced one-liner accessibility section with detailed accessibility notes
  - docs/COMPONENT_SCORES.md
      • Panel #60: ⏳ Queued → ✅ Done in Tier 6 hardening queue
      • Layout table: Panel row populated — 9/9/9/9/9/9/9/9/9/9 avg 9.0 🟢
State: Panel hardening complete. All ARIA attributes were already in place (role=region, aria-labelledby,
  aria-expanded, aria-controls, aria-hidden, prefers-reduced-motion, unique IDs, :focus-visible ring).
  Deliverable is the new 23-test a11y spec + expanded README documentation.
Verification:
  node_modules/.bin/eslint projects/ui-lib-custom/src/lib/panel/ --max-warnings 0 (PASS)
  node_modules/.bin/jest --testPathPatterns=panel --no-coverage (110/110 PASS — 87 unit + 23 a11y)
  node_modules/.bin/ng build ui-lib-custom (PASS, zero errors)
  node_modules/.bin/jest --testPathPatterns=entry-points --no-coverage (97/97 PASS)
Terminal notes: npm install required. Merged origin/main and resolved conflicts in AI_AGENT_CONTEXT.md and AI_AGENT_CONTEXT_ARCHIVE.md.
Next step: TreeTable (#33) hardening — Tier 4 Data Display treegrid pass.
