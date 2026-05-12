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
- **Active focus:** Upload (#69), ProgressSpinner (#56), Panel (#60) accessibility hardening COMPLETE (6-phase); MeterGroup (#57), Ripple (#74), BlockUI (#64), BottomSheet (#76), Card (#51), Chart (#72), Chip (#54), ContextMenu (#14) also merged
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

Date: 2026-05-12 [Upload component — 6-phase hardening COMPLETE (#69)]
Changed:
  - projects/ui-lib-custom/src/lib/upload/upload.component.ts
      • Added module-level `let nextUploadId: number = 0` counter
      • Added `instanceId`, `fileInputId` (stable HTML id per instance)
      • Added `dragStatusMessage: WritableSignal<string>` for polite live-region announcements
      • Updated `onDragEnter` to set drag status message; `onDragLeave`/`onDrop` to clear it
  - projects/ui-lib-custom/src/lib/upload/upload.component.html
      • Added visually-hidden `<label [for]="fileInputId">` for the hidden file input
      • Added `[id]="fileInputId"` to `<input type="file">`
      • Updated drop zone `aria-label` from "File upload drop zone" to "File upload area"
      • Added `aria-live="polite"` / `aria-atomic="true"` drag-status live region
  - projects/ui-lib-custom/src/lib/upload/upload.component.scss
      • Added `.ui-lib-upload__sr-only` visually-hidden utility class
      • Added `@media (prefers-reduced-motion: reduce)` block — disables all transitions
  - projects/ui-lib-custom/src/lib/upload/upload.a11y.spec.ts (CREATED — 25 tests)
      • Toolbar semantics (5): role=toolbar, button text, aria-disabled default, disabled host
      • Drop zone semantics (3): role=region, aria-label, aria-disabled states
      • File input (4): aria-hidden, tabindex, unique id, label association
      • File list semantics (4): role=list, aria-label, listitem, aria-label per remove btn
      • Validation (2): role=alert + aria-live, dismiss button aria-label
      • Drag-over live region (4): presence, default empty, drag-enter, drag-leave
      • Unique IDs (1): two-instance ID uniqueness
      • Keyboard interaction (2): Choose focusable, remove focusable
      • axe-core checks (5): default, with files, with errors, disabled, drag-over
  - projects/ui-lib-custom/src/lib/upload/README.md
      • Added ARIA attributes table (28 rows), keyboard interaction table, CSS custom properties table, accessibility section
  - docs/COMPONENT_SCORES.md
      • Upload #69: ⏳ Queued → ✅ Done; scores API 9, A11y 9, Perf 9, Comp 8, Theme 9, DX 9, Docs 9, Polish 9, Angular 9, Feel 9 — avg 8.9
State: Upload hardening complete. Unique instance IDs, drag-over live region, reduced-motion, file-input label, and 25-test a11y regression suite all in place.
Verification:
  node_modules/.bin/eslint projects/ui-lib-custom/src/lib/upload/ --max-warnings 0 (PASS)
  node_modules/.bin/jest --testPathPatterns=upload --no-coverage (66/66 PASS — 36 unit + 30 a11y)
  node_modules/.bin/ng build ui-lib-custom (PASS, zero errors)
  node_modules/.bin/jest --testPathPatterns=entry-points --no-coverage (97/97 PASS)
Terminal notes: jsdom does not support DragEvent — used `fakeDragEvent()` stub. `children[0]` array access flagged by TypeScript `noUncheckedIndexedAccess`; replaced with `fixture.debugElement.query(By.directive(UploadComponent)).componentInstance`.
Next step: TreeTable (#33) hardening — Tier 4 Data Display treegrid pass.
