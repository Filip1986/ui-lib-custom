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
- **Prompt library status:** All Tier 1 hardening prompts deleted (one-time-use scaffolding — lessons distilled into `docs/prompts/COMPONENT_EVOLUTION_PROMPTS.md`). Active prompt system: `docs/prompts/audit/` (3-phase agentic Tier 2 audit). Score index: `docs/prompts/HARDENING_PROMPT_INDEX.md`.

### Component/Docs Delta (Active Only)

- `CodeSnippet` -> ✅ integrated app-wide (demo build clean; all 36 demo pages migrated from app-code-preview)

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

Date: 2026-05-24 [convention audit completion — keyDown rename, CommonModule → specific imports, inline template extraction]
Changed:
  input-number.component.ts: keyDown → numberKeyDown (output declaration + 2 emit sites) — PR #239
  input-number/README.md: output table updated with numberKeyDown name and shadowing note — PR #239
  LIBRARY_CONVENTIONS.md: added "Keyboard key pressed" row (keydown/keyDown → {component}KeyDown) to canonical output names table — PR #239
  18 library components: CommonModule → specific imports (NgClass, NgStyle, NgTemplateOutlet as needed; removed entirely where unused) — PR #240
  10 library components: inline template: strings extracted to .html templateUrl files — PR #240
  input-mask.component.html: bonus a11y fix — clear <span (click)> → <button type="button" aria-label="Clear"> — PR #240
State: ng build → PASS; typecheck → PASS; eslint → 0 warnings; all affected tests pass
Verification: npm run build (PASS), npx eslint.cmd 28 changed files --max-warnings 0 (PASS), jest input-number (146/146), input-mask (62/62), accordion (51/51), rating (81/81), carousel (70/70), stepper (61/61)
Next step: No remaining audit items. Next milestone candidates: broader axe-core audit pass, new premium component (signals-first data grid is highest-value per VISION.md), or theme preset UI improvements.

Date: 2026-05-24 [docs(standards): JS-STANDARDS.md + standards README created]
Changed:
  docs/standards/JS-STANDARDS.md: Created — JavaScript runtime standard for this component library.
    Key library-specific rules: DestroyRef cleanup (components destroyed frequently), layout thrashing
    under ViewEncapsulation.None, no Worker instantiation in library code.
    References platform/docs/standards/JS-STANDARDS.md for full rationale and examples.
  docs/standards/README.md: Created — index of CSS, HTML, and JS standards with platform reference.
  docs/standards/CSS-STANDARDS.md: Added See also footer linking to JS and HTML standards.
  CLAUDE.md: Added standards reference table to Session Start Protocol.
State: Documentation only — no build required.
Verification: Files created and cross-linked correctly.
Next step: No open tasks. Next milestone candidates: broader component axe-core audit pass, new premium
  component (signals-first data grid is highest-value per VISION.md), or theme preset UI improvements.

Date: 2026-05-24 [naming convention audit — critical output renames + conventions doc hardening]
Changed:
  color-picker.ts: change → colorChange (output + emit)
  color-picker.spec.ts: component.change → component.colorChange (4 references)
  slider.ts: change → sliderChange (output + 3 emits)
  toggle-button.ts: change/focus/blur → toggleButtonChange/toggleButtonFocus/toggleButtonBlur
  toggle-switch.ts: change/focus/blur → switchChange/switchFocus/switchBlur
  autocomplete.ts: keyUp → autocompleteKeyUp (output + emit)
  virtual-scroller.component.ts: scroll → virtualScroll (output + emit)
  galleria.ts: removed duplicate explicit activeIndexChange output (model() already emits it)
  knob.component.ts: change/focus/blur → knobChange/knobFocus/knobBlur
  radio-button.ts: change/focus/blur → radioChange/radioFocus/radioBlur
  rating.ts: change/focus/blur → ratingChange/ratingFocus/ratingBlur
  toggle-button-demo.component.html/ts: bindings + log string updated
  autocomplete-demo.component.ts: API table fixed (select→optionSelect, focus/blur names, keyUp added)
  rating-demo.component.html/ts: bindings + code snippets + API table updated
  radio-button-demo.component.ts: API table updated
  rating/README.md, docs/reference/components/RATING.md: (change)→(ratingChange)
  LIBRARY_CONVENTIONS.md: Rule 1 example fixed; Rule 2 camelCase variant note added; canonical output names table added with all 13 components
State: ng build → PASS (30 368ms); eslint → 0 warnings on all changed files (16 files checked)
Verification: npm run build (PASS), npx eslint 16 changed files --max-warnings 0 (PASS)
Next step: Fix medium issues from audit — add `readonly` to order-list and pick-list model() signals; replace CommonModule with specific directive imports in 18 components

Date: 2026-05-24 [themes refactor — shape-pill token, dark mixin deduplication, themes.css full rewrite]
Changed:
  themes.scss/themes.css: full rewrite — universal tokens, deduplicated dark block, prefers-color-scheme fallback added
State: 6040/6040 tests passing; ng build → PASS; typecheck → PASS
Verification: npm test (6040/6040), npm run build (PASS)
Next step: No open tasks.
Terminal notes: Use node_modules/.bin/jest.cmd not npx jest on Windows
Next step: Delete _theme-mixins.scss (confirmed zero consumers). Then: runtime variant switcher; CSS @layer adoption.


<!-- older handoffs: see docs/implementation/AI_AGENT_CONTEXT_ARCHIVE.md -->
