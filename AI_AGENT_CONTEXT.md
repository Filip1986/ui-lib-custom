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

- **Current milestone:** Prompt 7 quality upgrade sprint (week of 2026-05-25) — COMPLETE ✅
- **Library-wide average:** **8.73 / 10** across 100 components (computed 2026-05-26)
- **Active focus:** RTL layout pass — **COMPLETE ✅** — 52 SCSS files migrated to logical CSS properties; all `declaration-strict-value` font-size/color errors across 21 files resolved; `property-disallowed-list` severity upgraded to **error** so physical directional properties now block commits; new `LIBRARY_CONVENTIONS.md → Logical CSS / RTL Rule` section added. Commits: `65ba40c1` + `db096fa2` on `feat/i18n-params-locales`.
- **Next queue:** Step 4: component score ceiling push (6-phase on Select, AutoComplete, CascadeSelect, ColorPicker — target 9.5 on each). Then: Angular Signals-first Data Grid (Step 5).
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

Date: 2026-05-28 [feat: Angular Signals-first Data Grid — Prompt 11 DONE ✅]
Changed:
  src/lib/data-grid/data-grid.types.ts: full type definitions (variant/size/sort/selection/filter/resize/edit/frozen; all event + template-context interfaces)
  src/lib/data-grid/data-grid.constants.ts: DATA_GRID_DEFAULTS + DATA_GRID_CLASS
  src/lib/data-grid/data-grid-column.component.ts: render-less column DSL; 5 template directives
  src/lib/data-grid/data-grid.component.ts: full implementation — virtual scroll, column pinning, resizing, cell editing, lazy load, multi-sort, global+column filter, row selection, WAI-ARIA grid keyboard nav; initial lazyLoad emitted in ngAfterViewInit
  src/lib/data-grid/data-grid.component.html + .scss: complete ARIA template; design tokens; cascade layer; logical CSS; 3 variants/sizes
  src/lib/data-grid/data-grid.component.spec.ts: 46 unit tests (all green)
  src/lib/data-grid/data-grid.a11y.spec.ts: 35 a11y tests — WAI-ARIA roles, aria-sort lifecycle, aria-rowcount/rowindex/colindex, keyboard sort/selection, checkbox labels, filter labels, empty state, axe audit (6 scenarios)
  src/lib/data-grid/README.md: full co-located API contract — all inputs/outputs/models, column DSL, template slots, keyboard interactions, 30 CSS tokens, usage examples
  src/lib/data-grid/index.ts: barrel export
  data-grid/ng-package.json + package.json: entry point wiring; library package.json exports + typesVersions updated
  i18n/en.ts,de.ts,fr.ts,es.ts: 11 new data-grid keys
  test/entry-points.spec.ts: data-grid import test added
  docs/reference/bundle-sizes.json: snapshot updated (data-grid: 144664 B raw / 20962 B gzip)
  demo/pages/data-grid/: full demo page (8 sections: interactive config, virtual scroll, frozen cols, cell editing, lazy load, a11y, CSS vars, API ref)
  docs/COMPONENT_SCORES.md: DataGrid added (avg 9.0; Docs 8 — remaining gap is docs/reference/components/data-grid.md and Storybook stories)
State: ALL MANDATORY CHECKLIST ITEMS COMPLETE — 6123/6123 tests green (228 suites); ESLint + stylelint clean; pushed ✅
Verification: npx jest --no-coverage (PASS ✅, 6123 tests, 228 suites); ESLint data-grid/ (PASS ✅); git push (PASS ✅)
Next step: Prompt 2 (Sprint B — reference doc generator script); then Prompt 5 (Sprint D — reduced-motion stylelint); these unblock all remaining Prompt 7 upgrades

Date: 2026-05-28 [feat: i18n=7→9 sweep — 15 components]
Changed:
  input-otp.component.ts: inject UiLibI18nService; ariaLabel default null; digitAriaLabelPrefix/Connector/pasteAnnouncement defaults ''; groupAriaLabel/getCellAriaLabel/announcePasteCompletion use i18n fallback
  toggle-button.ts: hasVisibleLabel checks raw onLabel/offLabel (not activeLabel) to preserve icon-only mode; activeLabel uses i18n fallback for 'Yes'/'No'
  alert.ts + alert.html: inject i18n; dismiss button 'Dismiss alert' → i18n.translate('alert.dismiss')
  progress-bar.ts + progress-bar.html: inject i18n; 'Complete' → i18n.translate('progressbar.complete')
  organization-chart-node.ts + html: inject i18n; expand/collapse labels → i18n.translate('organization-chart.expand/collapse')
  slider.ts + slider.html: inject i18n; 'Minimum/Maximum value' → i18n.translate('slider.min/max')
  split-button.component.ts + html: inject i18n; 'More options'/'Menu' → i18n.translate('split-button.more/menu')
  pick-list.component.ts + html: inject i18n; 'Source/Target list' → i18n.translate('picklist.source/target')
  galleria.ts + galleria.html: inject i18n; image position/navigation labels → i18n computed signals + goToItemAriaLabel()
  input-number.component.ts + html: inject i18n; increment/decrement labels → computed signals using i18n.translate
  scroll-top.ts: inject i18n; buttonAriaLabel default '' → resolvedButtonAriaLabel falls back to i18n.translate('scroll-top.label')
  dock.ts + dock.html: inject i18n; ariaLabel default '' → effectiveAriaLabel computed using i18n.translate('dock.label')
  inplace.ts + inplace.html: inject i18n; displayLabel/closeLabel defaults '' → effectiveDisplayLabel/CloseLabel computed
  chart.component.ts + html: inject i18n; ariaLabel default '' → effectiveAriaLabel computed using i18n.translate('chart.label')
  bar-chart/line-chart/pie-chart/doughnut-chart.component.ts: ariaLabel default '' (was 'Chart')
  rating.html: 'Clear rating' → i18n.translate('rating.clear')
  i18n/en.ts,de.ts,fr.ts,es.ts: 28 new keys (alert.dismiss, galleria.*, organization-chart.*, picklist.*, progressbar.complete, rating.clear, slider.min/max, split-button.*, input-number.*, scroll-top.label, dock.label, inplace.*, toggle-button.on/off, chart.label, input-otp.*)
  docs/COMPONENT_SCORES.md: I18n 7→9 on 13 components + Rating 6→9; all avgs recalculated
State: COMPLETE — 6041/6041 tests green (all 226 suites)
Verification: npx jest --no-coverage (PASS ✅, 6041 tests, 226 suites); ESLint 0 warnings on all changed components
Next step: Commit and push i18n=7→9 sweep; update bundle-size snapshot if needed; then Step 5 — Angular Signals-first Data Grid

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
