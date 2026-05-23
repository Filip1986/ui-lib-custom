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

Date: 2026-05-23 [Full consistency audit — 10 issues fixed + conventions codified]
Changed:
  Critical — native DOM event shadow fixes (output renames):
  - tree-select: `selectionChange` output → `treeChange` (model/output collision with `selection: model<>()`)
  - input-number: `input` → `valueChange`, `focus` → `numberFocus`, `blur` → `numberBlur`
  - autocomplete: `select` → `optionSelect`, `focus` → `autocompleteFocus`, `blur` → `autocompleteBlur`
  - checkbox: `change` → `checkboxChange`, `focus` → `checkboxFocus`, `blur` → `checkboxBlur`
  - date-picker: `select` → `dateSelect`, `focus` → `datePickerFocus`, `blur` → `datePickerBlur`
  - cascade-select: `change` → `cascadeChange`, `focus` → `cascadeSelectFocus`, `blur` → `cascadeSelectBlur`
  Moderate — technical debt:
  - button.scss: added BUTTON_APPEARANCE_COLORS + BUTTON_DARK_MODE_FG constants to design-tokens.ts; added cross-reference comment block in button.scss
  - button-group.ts: fixed cross-entry relative import `'../button'` → `'ui-lib-custom/button'`
  - bottom-sheet.scss: `1px solid #dee2e6` → `1px solid var(--uilib-color-neutral-300, #dee2e6)`
  Docs:
  - LIBRARY_CONVENTIONS.md: added Cross-Entry Import Rule section, Design Token Rule section, expanded anti-patterns table, enhanced Rule 3 with selectionChange real example
  - CLAUDE.md: updated 4-rule Output Naming section; updated anti-patterns table with new entries; clarified raw hex rule
  - All 6 affected component READMEs updated (cascade-select, checkbox, date-picker, input-number, autocomplete, tree-select)
  Specs fixed:
  - cascade-select.spec.ts: `component.change` → `component.cascadeChange`
  - checkbox.spec.ts: `component.change.subscribe` → `component.checkboxChange.subscribe`; test descriptions updated
State: 6040/6040 tests pass (226 suites). ng build ui-lib-custom → zero warnings/errors.
Verification: node_modules/.bin/jest.cmd --no-coverage → 6040/6040 pass; ng build ui-lib-custom → PASS
Terminal notes: Use `node_modules/.bin/jest.cmd` not `npx.cmd jest`; eslint via `npx.cmd eslint`
Next step: Continue with runtime variant switcher + theme preset management; or run broader axe-core audit. All known consistency issues resolved.

Date: 2026-05-23 [Output naming consistency — native DOM event conflicts resolved]
Changed:
  - speed-dial/speed-dial.component.ts: renamed `visibleChange` output → `panelChange` (was shadowing `model<boolean>()` for `visible`'s internal `visibleChange` event, causing two-way binding to receive SpeedDialVisibleChangeEvent instead of boolean); renamed `click` → `buttonClick`, `focus` → `buttonFocus`, `blur` → `buttonBlur` (avoid native DOM event name clashes)
  - speed-dial/speed-dial.component.spec.ts: updated template binding `(onVisibleChange)` → `(panelChange)`, `(click)` → `(buttonClick)`
  - split-button/split-button.component.ts: renamed `click` output → `buttonClick` (was causing native DOM click to bubble and trigger host binding twice — Expected 1, Received 2)
  - split-button/split-button.component.spec.ts: updated template binding `(click)` → `(buttonClick)`; updated test description
  - textarea/textarea.ts: renamed `input` → `valueChange`, `focus` → `textareaFocus`, `blur` → `textareaBlur` (native events from inner <textarea> bubbled and double-fired when outputs shared same name)
  - textarea/textarea.spec.ts: updated 3 template bindings and 3 test descriptions
  - Demo pages updated: split-button (onClick→buttonClick in 4 locations + snippets.generated.ts + basic.example.html), speed-dial (onItemCommand→itemCommand in 7 locations — was already done in component, just demo lagged)
  - READMEs updated: textarea, split-button, speed-dial, cascade-select, color-picker, date-picker, input-number, knob, slider — all now document the actual current output names (no more on* prefix)
State: All 6040 tests pass (226 suites). ng build ui-lib-custom → zero warnings/errors.
Rule documented: Never name Angular signal outputs after native DOM event names (click, change, input, focus, blur, select, keydown, submit, etc.) — Angular may create both an output subscription AND a native DOM listener, causing double-firing when native events bubble from child elements. For model() signals, avoid naming explicit outputs `{signalName}Change` as that conflicts with the model's internal two-way binding event.
Verification: node_modules/.bin/jest.cmd --no-coverage → 6040/6040 pass; ng build ui-lib-custom → PASS
Terminal notes: `npm test` / `npx.cmd jest` fail with "jest not recognized" — use `node_modules/.bin/jest.cmd` directly; eslint via `npx.cmd eslint`
Next step: button.scss framed-appearance raw hex values (#ffc82c, #000000, #ffffff, #ff5f6d, #ffc371, #000) → CSS vars; then broader axe-core audit. Also consider: input-number `input`/`focus`/`blur` outputs may still cause double-events if any parent template binds them — monitor if tests are added.

Date: 2026-05-23 [Design token audit — CSS hex violations eliminated, new token constants]
Changed:
  design-tokens.ts:
  - Added BOOTSTRAP_APPEARANCE_COLORS (primary: '#0d6efd', borderColor: '#dee2e6', borderColorDark: '#495057') — Bootstrap palette is distinct from Material; must not be aliased to COLOR_NEUTRAL/COLOR_PRIMARY
  - Added CONFIRM_BUTTON_COLORS (warningFg: '#1f2937') — Tailwind gray-800 dark text on warning-yellow, no Material equivalent
  - Added CODE_SNIPPET_SYNTAX_COLORS (9 One Dark palette entries) — all syntax colours now tracked as named constants
  - Extended COLORPICKER_TOKENS with selectorBorderColor: always white, must contrast any hue on the canvas
  Rule-body hex violations fixed (color: #hex → color: var(--uilib-*)):
  - confirm-dialog.scss, confirm-popup.scss: white text on btn variants → var(--uilib-color-neutral-50, #fff); warning fg → var(--uilib-confirm-*-btn-warning-fg)
  - table.component.scss: sort badge white, Bootstrap border-color rule body, dark mode border-color corrected to #495057
  - meter-group.scss: swatch white text → var(--uilib-meter-group-swatch-fg)
  - color-picker.scss: selector crosshair border → var(--uilib-colorpicker-selector-border-color)
  - mega-menu.scss, menubar.scss: focus ring outline-color → existing root-link-color-active variable
  - code-snippet.scss: 9 syntax colors → var(--uilib-code-snippet-syntax-*) (consumers can now customise syntax theme at runtime)
  CSS variable definition improvements (--uilib-foo: #hex → --uilib-foo: var(--uilib-color-neutral-NNN, #hex)):
  - drawer, scroll-panel, fieldset, panel, stepper, listbox, table, password, order-list, pick-list
  Docs:
  - LIBRARY_CONVENTIONS.md: added Bootstrap variant colour guidance + new anti-pattern row
  - CHANGELOG.md: full session entry under [Unreleased]
State: All 6040 tests pass (226 suites). ng build ui-lib-custom → zero warnings/errors.
Verification: node_modules/.bin/jest.cmd --no-coverage → 6040/6040 pass; ng build ui-lib-custom → PASS (zero warnings)
Terminal notes: Use `node_modules/.bin/jest.cmd` not `npx.cmd jest`; eslint via `npx.cmd eslint`
Next step: Broader axe-core audit; runtime variant switcher; theme preset management. All known token/output-naming violations resolved.

<!-- older handoffs: see docs/implementation/AI_AGENT_CONTEXT_ARCHIVE.md -->
