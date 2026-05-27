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

Date: 2026-05-27 [feat: score ceiling push — Perf 8→9 + I18n 8→9 on Select, AutoComplete, CascadeSelect, ColorPicker]
Changed:
  autocomplete.html, cascade-select.html, color-picker.html: @defer (on immediate) wrapping overlay panels (Perf 8→9)
  cascade-select.ts: getLevelAriaLabel() uses i18n.translate('cascade-select.sublevel-label', { label }) (I18n 8→9)
  color-picker.html: trigger aria-label uses i18n.translate('colorpicker.trigger', { color }) (I18n 8→9)
  autocomplete.html: chip remove button uses i18n.translate('autocomplete.remove-chip', { label }) (I18n 8→9)
  select.html: search placeholder + empty state use i18n translate keys (I18n 8→9)
  i18n/en.ts, de.ts, fr.ts, es.ts: added 'autocomplete.remove-chip', 'cascade-select.sublevel-label', 'colorpicker.trigger', 'select.search.placeholder', 'select.empty'
  autocomplete.spec.ts, cascade-select.spec.ts, color-picker.spec.ts: whenStable() in beforeEach; body panel cleanup afterEach; explicit panel close before destroy in body-mount tests
  cascade-select.a11y.spec.ts: i18n aria-label expectations updated; ariaLabel/ariaLabelledBy converted to WritableSignal
  docs/COMPONENT_SCORES.md: Select I18n 8→9 (avg 9.1), AutoComplete Perf+I18n 8→9 (avg 9.0), CascadeSelect Perf+I18n 8→9 (avg 9.0), ColorPicker Perf+I18n 8→9 (avg 9.0)
State: COMPLETE — 6041/6041 tests green; ng build ui-lib-custom zero warnings
Verification: npx jest --no-coverage (PASS ✅, 6041 tests, 226 suites); ng build ui-lib-custom (PASS ✅, 0 warnings)
Next step: Step 5 — Angular Signals-first Data Grid

Date: 2026-05-27 [fix(lib): RTL fixes complete + RTL enforcement upgraded — commits 65ba40c1 + db096fa2]
Changed:
  52 SCSS files (65ba40c1): all directional CSS replaced with logical equivalents
  10 SCSS files (db096fa2): badge, chip, data-view, inplace, meter-group, radio-button, tag, toggle-switch, tree-select, upload — raw font-size values wrapped in --uilib-* tokens
  stylelint.config.mjs: property-disallowed-list severity warning → error; added border-left/right-color/width/style longhands to banned list
  LIBRARY_CONVENTIONS.md: new "Logical CSS / RTL Rule" section with full mapping table + exceptions
  CSS-STANDARDS.md: new "Logical CSS / RTL layout" section; rule severity table updated
  CLAUDE.md: new convention bullet + 3 new anti-pattern rows
State: COMPLETE — 0 property-disallowed-list violations library-wide; physical directional properties now block commits; all SCSS token errors in scope resolved
Verification: npx stylelint "projects/ui-lib-custom/src/lib/**/*.scss" → 0 property-disallowed-list violations; lint-staged + commitlint passed on both commits
Next step: Step 4 — component score ceiling push (Select, AutoComplete, CascadeSelect, ColorPicker — target 9.5 each)

Date: 2026-05-27 [feat/i18n-params-locales — PR #271 open]
Changed:
  projects/ui-lib-custom/src/lib/i18n/en.ts: 14 new parametrised keys (carousel.slide.status, paginator.empty/page.current/page.go, data-view.go.page, meter-group.segment.*, rating.value/star.singular/star.plural, tree-select.*)
  projects/ui-lib-custom/src/lib/i18n/de.ts: NEW — UI_LIB_DE, full 76-key German bundle
  projects/ui-lib-custom/src/lib/i18n/fr.ts: NEW — UI_LIB_FR, full 76-key French bundle
  projects/ui-lib-custom/src/lib/i18n/es.ts: NEW — UI_LIB_ES, full 76-key Spanish bundle
  projects/ui-lib-custom/src/lib/i18n/index.ts: exports UI_LIB_DE, UI_LIB_FR, UI_LIB_ES
  carousel, data-view, meter-group, paginator, rating, table, tree-select: all dynamic aria-labels wired to translate() with params
  test/entry-points.spec.ts: DE/FR/ES assertions added
  docs/reference/bundle-sizes.json: baseline updated (i18n +40 KB, intentional)
State: COMPLETE — 6041/6041 tests green; ng build zero warnings; pre-push hook passed (typecheck ✅ + budget ✅)
Verification: npx jest --no-coverage (PASS ✅, 6041 tests, 226 suites); ng build ui-lib-custom (PASS ✅, 0 warnings)
Next step: Step 3 — RTL layout pass (replace margin/padding-left/right with inline-* logical CSS properties across SCSS files)

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
