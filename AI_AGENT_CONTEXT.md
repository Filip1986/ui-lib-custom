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

- **Current milestone:** Prompt 8 quality hardening sprint (week of 2026-05-28) — in progress
- **Library-wide average:** **8.73 / 10** across 100 components (computed 2026-05-26)
- **Active focus:** Prompt 7 ceiling push — Select (9.1→9.5 ✅), AutoComplete (9.0→9.5 ✅), ColorPicker (9.0→9.5 ✅), CascadeSelect (9.0→9.5 ✅). All four ceiling-push targets complete.
- **Next queue:** Broader Prompt 8 pass on any remaining sub-8.5 components.
- **Horizon:** Runtime variant switcher, theme preset management, broader axe-core audit ✅ (infra in place)
- **Prompt library status:** All Tier 1 hardening prompts deleted (one-time-use scaffolding — lessons distilled into `docs/prompts/COMPONENT_EVOLUTION_PROMPTS.md`). Active prompt system: `docs/prompts/audit/` (3-phase agentic Tier 2 audit). Score index: `docs/prompts/HARDENING_PROMPT_INDEX.md`.

### Component/Docs Delta (Active Only)

- `CodeSnippet` -> ✅ complete + scored + i18n wired (8.6/10 — multi-file tabs, ARIA tablist/tab/tabpanel, syntax highlighting, ariaLabel/ariaLabelledBy inputs, 31 unit tests; ESLint clean)
- `SyntaxHighlighter` -> ✅ complete + scored (8.7/10 — zero-dep TS/HTML/SCSS/CSS tokenizer; highlight/tokenize/escapeForCode exports; full demo page)
- **I18n batch pass (2026-05-29)**: Chip (7→8, 8.5), Button (7→9, 8.9), Breadcrumb/ContextMenu/Menu/MegaMenu/PanelMenu/TieredMenu (7→9, 9.0 each), OrderList (7→9, 8.8)

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
- `Chip` -> ✅ complete + hardened + i18n wired (score 8.5/10 I18n 7→8, 53 unit tests + 18 a11y)
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

Date: 2026-05-17 [CodeSnippet + SyntaxHighlighter — scored and closed out]
Changed:
  docs/COMPONENT_SCORES.md: added CodeSnippet (8.4/10) to Data Display table + New Components queue;
    added SyntaxHighlighter (8.7/10) to Utilities & Directives table + New Components queue
  projects/ui-lib-custom/src/lib/code-snippet/code-snippet.html: self-closing tag fix (ESLint warning)
  AI_AGENT_CONTEXT.md: updated CodeSnippet + SyntaxHighlighter status entries
State: COMPLETE — both components scored; ESLint clean; 25/25 unit tests passing
Verification: npx eslint code-snippet/ syntax-highlighter/ --max-warnings 0 ✅; npx jest code-snippet (25/25 ✅)
Next step: Broader Prompt 8 pass — bring any remaining sub-8.5 components up to gate; then Phase 4 (axe-core audit, Storybook, publish prep)

Date: 2026-05-29 [feat(lib): ColorPicker API 9→10 + I18n 9→10 (9.3→9.5) ✅]
Changed:
  color-picker/color-picker.ts: added ariaLabel + ariaLabelledBy signal inputs; resolvedTriggerAriaLabel computed signal
  color-picker/color-picker.html: wired [attr.aria-label]/[attr.aria-labelledby] to computed; label text → i18n.translate calls
  color-picker/color-picker.scss: left: -2px → inset-inline-start: -2px (logical CSS)
  color-picker/index.ts: added ColorPickerAppendTo to type exports
  color-picker/color-picker.spec.ts: new standalone describe — ariaLabel/ariaLabelledBy + RTL tests (5 tests); fixed extra }); brace
  color-picker/README.md: ariaLabel + ariaLabelledBy inputs; colorpicker.label.hex/h/s/b locale keys
  i18n/en,de,fr,es.ts: 4 new keys: colorpicker.label.hex / .label.h / .label.s / .label.b
  docs/COMPONENT_SCORES.md: ColorPicker API 9→10, I18n 9→10 (avg 9.3→9.5)
State: COMPLETE — ESLint ✅; build zero warnings ✅; 6128/6128 tests ✅
Verification: npx eslint color-picker/ (PASS ✅); ng build (0 warnings ✅); npx jest (6128 ✅)
Next step: Broader Prompt 8 pass on sub-8.5 components

Date: 2026-05-29 [feat(lib): prompt-7 ceiling push — AutoComplete Theme 9→10 + CascadeSelect Perf/Angular/Theme 9→10 (both → 9.5) ✅]
Changed:
  autocomplete/autocomplete.scss: added --uilib-autocomplete-option-min-height + --uilib-autocomplete-btn-min-size tokens;
    replaced raw 44px/36px min-height/min-width in rule bodies; material chip border-radius: 16px → token override
  autocomplete/README.md: Theming table updated with two new tokens
  cascade-select/cascade-select.ts: constructor addEventListener deferred to afterNextRender() with
    DestroyRef.onDestroy cleanup (SSR safety + memory leak → Perf=10 + Angular=10)
  cascade-select/cascade-select.scss: added --uilib-cascade-select-separator-color +
    --uilib-cascade-select-clear-hover-bg tokens; inline color-mix() in rule bodies → tokens;
    minimal variant uses --uilib-cascade-select-option-hover-bg token override
  cascade-select/cascade-select.html: Loading... → {{ i18n.translate('cascade-select.loading') }}
  cascade-select/README.md: Theming + I18n tables updated
  i18n/en,de,fr,es.ts: cascade-select.loading key added (1 key per locale)
  docs/COMPONENT_SCORES.md: AutoComplete Theme 9→10 (9.4→9.5); CascadeSelect Perf/Angular/Theme 9→10 (9.2→9.5)
  docs/reference/bundle-sizes.json: baseline updated
State: COMPLETE — ESLint ✅; build zero warnings ✅; 161/161 tests ✅
Verification: npx eslint autocomplete/ cascade-select/ (PASS ✅); ng build ✅; npx jest (161 ✅)
Next step: Broader Prompt 8 pass on sub-8.5 components; ColorPicker → 9.5 if continuing ceiling push

Date: 2026-05-29 [feat(lib): prompt-7 ceiling push — SSR safety fixes (Select/AutoComplete/ColorPicker Perf+Angular 9→10) ✅]
Changed:
  select/select.ts: document.getElementById → this.document.getElementById (inside requestAnimationFrame)
  autocomplete/autocomplete.ts: window.setTimeout → setTimeout; document.getElementById → this.documentRef.getElementById
  color-picker/color-picker.ts: window.innerHeight → this.documentRef.defaultView?.innerHeight;
    all document.addEventListener/removeEventListener → this.documentRef.*
  docs/COMPONENT_SCORES.md: Select Perf+Angular 9→10 (9.4→9.5); AutoComplete Perf+Angular 9→10 (9.2→9.4);
    ColorPicker Perf+Angular 9→10 (9.1→9.3)
State: COMPLETE — ESLint ✅; build zero warnings ✅; 155/155 tests ✅
Next step: CascadeSelect ceiling push → 9.5; AutoComplete → 9.5

<!-- older handoffs: see docs/implementation/AI_AGENT_CONTEXT_ARCHIVE.md -->

---

## This Week's Plan (week of 2026-05-25)

> Generated by Prompt 13 — Monday Planning.

### Backlog analysis

**§3.1 Top 15 — lowest-avg components (none ≥ 9.5 yet):**

| Rank | Component     | Cur avg | Why first                                          |
|------|---------------|---------|----------------------------------------------------|
| 1    | Select        | 8.2     | Most-clicked form control in enterprise demos       |
| 3    | AutoComplete  | 8.2     | Combobox #2 enterprise form pattern                 |
| 8    | CascadeSelect | 8.2     | Almost nobody else has it; visible differentiator   |
| 9    | ColorPicker   | 8.2     | Common premium ask; visual polish lifts "Feel"      |

Next wave (Friday benchmark prep):

| Rank | Component         | Cur avg |
|------|-------------------|---------|
| 14   | Knob              | 8.2     |
| 15   | Avatar            | 8.2     |
| 10   | Carousel          | 8.3     |
| 11   | Galleria          | 8.3     |

**Sprint A (Comp11):** 0 / ~100 components benchmarked — all show `—`.  
**Category 12 (I18n):** 0 / ~100 components scored — all show `—` (column added this cycle via Prompt 10).

### Week schedule

| Day        | Task                                                                                           | Output                                         |
|------------|------------------------------------------------------------------------------------------------|------------------------------------------------|
| Mon        | Plan (this document). Pick 4 components: Select, AutoComplete, CascadeSelect, ColorPicker.    | This plan committed                            |
| Tue        | Prompt 7 — 12-step upgrade on **Select** (target 9.5)                                        | ✅ Score 9.1, branch feat/select-9.5-upgrade   |
| Wed        | Prompt 7 — 12-step upgrade on **AutoComplete** (target 9.5)                                  | ✅ Score 8.9, PR #251, branch feat/autocomplete-9.5-upgrade |
| Thu AM     | Prompt 7 — 12-step upgrade on **CascadeSelect** (target 9.4)                                 | ✅ Score 8.9, PR #252, branch feat/cascade-select-9.5-upgrade |
| Thu PM     | Prompt 7 — 12-step upgrade on **ColorPicker** (target 9.4)                                   | ✅ Score 8.9, PR #253, branch feat/color-picker-9.4-upgrade |
| Fri AM     | Prompt 1 — Sprint A benchmark backfill for **Knob, Avatar, Carousel, Galleria**              | ✅ 4 sections in COMPETITIVE_BENCHMARKS.md, PR #254, Comp 8→9 for all 4 |
| Fri PM     | Prompt 14 — Friday wrap (inventory avg, handoff block, trim old handoffs)                     | ✅ Library avg 8.73/10 recorded, handoffs trimmed, archive updated       |

### Upgrade criteria (Prompt 7 definition of done per component)

Each component upgrade is complete when all of the following are green:
- [ ] Typed `ng-template` slot for item/option rendering → Comp 8→10, DX 8→9
- [ ] Reference doc is complete (no stub sections) → Docs 8→9
- [ ] `@defer` on off-screen / inactive panel → Perf 8→9
- [ ] Missing theme var(s) added (shadow, focus ring) → Theme 8→9
- [ ] Enter/exit animation with `--uilib-*` token → Polish + Feel 8→9
- [ ] ESLint + stylelint + `ng build ui-lib-custom` zero warnings
- [ ] Score recorded in `docs/COMPONENT_SCORES.md`
- [ ] Handoff appended to `AI_AGENT_CONTEXT.md`
