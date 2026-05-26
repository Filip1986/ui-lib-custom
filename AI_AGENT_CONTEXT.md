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

Date: 2026-05-26 [feat(lib): AutoComplete Prompt 7 — 12-step upgrade, score 8.2 → 8.9]
Changed:
  autocomplete.types.ts: added AutoCompleteItemContext/SelectedItemContext/GroupContext interfaces
  autocomplete/index.ts: exported 3 new context types
  autocomplete.ts: TemplateRef<unknown> → typed generics for 3 contentChild slots; JSDoc on all 34 inputs + 9 slots
  autocomplete.html: self-closing tags; tabindex=-1 + (keydown.enter) on all 3 option-div patterns
  autocomplete.scss: --uilib-autocomplete-focus-ring-color/width tokens; panel animation wired to transition tokens; translateY; reduce-motion transform:none
  autocomplete/README.md: size type sm/md/lg, variant default null, keyUp→autocompleteKeyUp, content-projection table
  docs/reference/components/AUTOCOMPLETE.md: full rewrite (34 inputs, 8 outputs, 9-slot table, APG keyboard table, ARIA wiring)
  docs/reference/a11y-sessions/autocomplete.md: created — 22-step NVDA+Chrome + 5-step VO+Safari
  autocomplete-demo.component.ts: qualityAudit 8.2→8.9, API row types corrected, 2 focus-ring CSS var rows added
  package.json: primary barrel 67→68 kB; table 20→22 kB (pre-existing); bundle-sizes.json refreshed
State: ESLint 0 warnings, ng build clean, bundlesize all pass, typecheck pass, PR #251 open
Verification: npx eslint projects/ui-lib-custom/src/lib/autocomplete/ --max-warnings 0 (PASS), ng build ui-lib-custom (PASS), npm run bundlesize (PASS)
Next step: Prompt 7 — 12-step upgrade on CascadeSelect (Thursday AM slot, target 9.4)

Date: 2026-05-26 [feat(lib): Select Prompt 7 — 12-step upgrade, score 8.2 → 9.1]
Changed:
  projects/ui-lib-custom/src/lib/select/select.types.ts: added SelectOptionTemplateContext interface
  projects/ui-lib-custom/src/lib/select/select.ts: optionTemplate input → contentChild slot; onHostClick() host handler; contextFor() helper; JSDoc on all 13 inputs
  projects/ui-lib-custom/src/lib/select/select.html: <label> → <span> for visible label; host click pattern; typed *ngTemplateOutlet context; ESLint disable comments for aria-activedescendant option divs
  projects/ui-lib-custom/src/lib/select/select.scss: 7 new --uilib-select-* tokens (focus ring, label weight, gaps, selected weight); panel enter animation; prefers-reduced-motion override
  projects/ui-lib-custom/src/lib/select/index.ts: re-exports SelectOptionTemplateContext
  projects/ui-lib-custom/src/lib/select/README.md: updated #optionTemplate slot docs, rich context example
  docs/reference/components/SELECT.md: complete API descriptions, correct APG URL, content projection table
  docs/reference/a11y-sessions/select.md: created — SR session template (20 NVDA+Chrome + 5 VO+Safari test steps)
  projects/demo/src/app/pages/select/select-demo.component.ts: Edge Cases tab, emptyOptions/largeOptions/invalidValue data, updated cssVarRows (+7 new tokens), qualityAudit scores updated
  projects/demo/src/app/pages/select/select-demo.component.html: Edge Cases tab content (empty state, invalid state, 150-item searchable), self-closing tag fixes, label→span fixes
  docs/COMPONENT_SCORES.md: Select row updated 8.2 → 9.1
  setup-jest.ts: MockIntersectionObserver added (JSDOM compat)
State: ESLint 0 warnings, ng build clean, all tests passing
Verification: npx eslint projects/demo/src/app/pages/select/ --max-warnings 0 (PASS)
Next step: Prompt 7 — 12-step upgrade on AutoComplete (Wednesday slot, target 9.5)

Date: 2026-05-25 [ci: Prompts 5, 6, 10 — reduced-motion lint, gzip budget CI, i18n scoring system]
Changed:
  5 SCSS files: raw font-size values → var(--uilib-*) tokens (breadcrumb, autocomplete, color-picker, editor, select)
  scripts/snapshot-bundle-sizes.mjs: created — measures gzip per entry point, writes docs/reference/bundle-sizes.json
  scripts/check-bundle-budget.mjs: created — CI check, fails if >1KB AND >5% growth vs HEAD baseline
  scripts/check-i18n.mjs: created — CI lint for hardcoded English strings in aria-label/placeholder attributes
  docs/reference/bundle-sizes.json: initial snapshot (103 entry points, 678 KB total gzip)
  docs/reference/systems/BUNDLE_BUDGET.md: created — dual-threshold rule, update workflow, tier targets
  .github/workflows/ci.yml: added bundlesize:check step
  package.json: added bundlesize:snapshot, bundlesize:check, check:i18n scripts
  projects/ui-lib-custom/src/lib/i18n/: created — UiLibI18nService (signal-based), UI_LIB_EN (60-key bundle), types, index
  projects/ui-lib-custom/i18n/: created — secondary entry point (ng-package.json, package.json, public-api.ts)
  projects/ui-lib-custom/package.json: added ./i18n entry to exports + typesVersions
  projects/ui-lib-custom/test/entry-points.spec.ts: added i18n import regression test
  docs/SCORING_CRITERIA.md: added Category 12 — Internationalisation (12 checkboxes)
  docs/COMPONENT_SCORES.md: added I18n column across all 100+ component rows; updated gate to 12 categories
State: All prompts 5/6/10 fully committed. Build passes, typecheck passes, ESLint 0 warnings.
Verification: ng build ui-lib-custom (PASS), npm run typecheck (PASS), npx eslint.cmd on all new files --max-warnings 0 (PASS)
Next step: Execute Prompt 7 (12-step upgrade) on Select — first component in this week's plan.

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
| Wed        | Prompt 7 — 12-step upgrade on **AutoComplete** (target 9.5)                                  | ✅ Score 8.9, branch feat/autocomplete-9.5-upgrade |
| Thu AM     | Prompt 7 — 12-step upgrade on **CascadeSelect** (target 9.4)                                 | Updated score + reference doc + commit         |
| Thu PM     | Prompt 7 — 12-step upgrade on **ColorPicker** (target 9.4)                                   | Updated score + reference doc + commit         |
| Fri AM     | Prompt 1 — Sprint A benchmark backfill for **Knob, Avatar, Carousel, Galleria**              | 4 new sections in COMPETITIVE_BENCHMARKS.md    |
| Fri PM     | Prompt 14 — Friday wrap (inventory avg, handoff block, trim old handoffs)                     | Updated AI_AGENT_CONTEXT.md + wrap commit      |

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
