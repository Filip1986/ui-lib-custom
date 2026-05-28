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
- **Active focus:** Prompt 8 — 8.2-cluster batch upgrade (Knob ✅ 8.2→8.7, Avatar ✅ 8.2→8.8). Next targets: Timeline (8.3), DatePicker (8.3), Carousel (8.4). Pattern: typed `ng-template` slot, missing theme token, mount animation, i18n fallback.
- **Next queue:** Continue Prompt 8 cluster batch on remaining low-scorers. Then Prompt 7 ceiling push (Select, AutoComplete, CascadeSelect, ColorPicker → 9.5).
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

Date: 2026-05-28 [feat: Prompt 8 — 8.2-cluster batch: Knob (8.2→8.7) + Avatar (8.2→8.8) ✅]
Changed:
  knob/knob.component.ts: typed #valueLabel slot (KnobValueContext: $implicit, formattedValue, normalized); UiLibI18nService i18n fallback for aria-label; NgTemplateOutlet
  knob/knob.component.html: #valueLabel branch before @else showValue
  knob/knob.component.scss: --uilib-knob-focus-ring-offset token; transition-duration via --uilib-transition-duration-fast; uilib-knob-mount keyframe; animation declaration; prefers-reduced-motion guard
  knob/knob.types.ts: KnobValueContext interface exported
  knob/index.ts: export KnobValueContext
  avatar/avatar.ts: typed #fallback slot (AvatarFallbackContext: size, shape, variant); UiLibI18nService i18n fallback for ariaLabelResolved + resolvedImageAlt; NgTemplateOutlet
  avatar/avatar.html: #fallback branch before plain <ng-content />
  avatar/avatar.scss: --uilib-avatar-font-weight token (600); uilib-avatar-mount keyframe + animation; prefers-reduced-motion guard
  avatar/avatar.types.ts: AvatarFallbackContext interface
  avatar/index.ts: export AvatarFallbackContext
  i18n/en.ts,de.ts,fr.ts,es.ts: knob.dial (Knob) + avatar.label (Avatar) keys in all four locales
  docs/COMPONENT_SCORES.md: Knob 8.2→8.7; Avatar 8.2→8.8
  docs/reference/bundle-sizes.json: knob + avatar baselines updated after intentional NgTemplateOutlet + i18n growth
State: COMPLETE — ESLint ✅; ng build zero warnings ✅; 36/36 avatar tests ✅; pushed 519e7609 + 001a12d9 ✅
Verification: npx eslint avatar/ (PASS ✅); ng build ui-lib-custom (PASS ✅); npx jest avatar --no-coverage (36 ✅); git push (PASS ✅)
Next step: Prompt 8 continues — Timeline (8.3 → target 8.8), then DatePicker (8.3), Carousel (8.4)

Date: 2026-05-28 [feat: Prompt 3 — APG patterns + usage examples + data-grid.md hand-finish ✅]
Changed:
  scripts/fill-apg-patterns.mjs: NEW — maps 100+ components to WAI-ARIA APG pattern URLs
    (or 'decorative'/'no-dedicated-apg'); filled all 96 doc `<!-- TODO: add WAI-ARIA APG -->` markers;
    lowercases filename before map lookup (Windows NTFS case-insensitive FS fix)
  scripts/fill-usage-examples.mjs: NEW — 22 component → accurate compilable usage example blocks;
    filled all remaining `<!-- TODO: add usage examples -->` markers across 96 docs
  scripts/generate-reference-doc.mjs: added demo page link in Related section for all regenerated docs
  docs/reference/components/data-grid.md: hand-finished — Column Inputs table (14 inputs from
    DataGridColumnComponent), Column Template Slots table (5 directives), Key→Action keyboard table,
    ARIA Attributes table, Real-World Usage section (lazy load + cell editing), Edge Cases section
    (empty state / 10k rows / read-only), Migration from PrimeNG Table section
  docs/COMPONENT_SCORES.md: DataGrid Docs 8→9, avg 9.0→9.1
State: COMPLETE — 0 APG TODO markers remaining; 0 usage-example TODO markers remaining; pushed ✅ (b51cdacb)
Verification: node scripts/fill-apg-patterns.mjs (96 files ✅); node scripts/fill-usage-examples.mjs (22 files ✅); git push (PASS ✅)
Next step: Prompt 1 (Sprint A — Competitive Benchmark Backfill); run on 4-8 components per session

Date: 2026-05-28 [feat: Prompt 2 — reference doc generator fix + all 96 docs regenerated ✅]
Changed:
  scripts/generate-reference-doc.mjs: fix parseSignals regex (` = ` → ` =\s*`) so multi-line
    output() declarations are captured; data-grid 3→10 outputs; tree gained nodeCollapse/nodeUnselect
  docs/reference/components/*.md: 96 files regenerated via `npm run docs:reference --all`;
    updated CSS vars, outputs, projection slots from live source; ACCORDION/TREE/BADGE/etc legacy
    uppercase files updated in-place (Windows case-insensitive FS); data-grid.md added (new)
State: COMPLETE — generator idempotent; npm run docs:reference passes clean
Verification: node scripts/generate-reference-doc.mjs data-grid (10 outputs ✅); npm run docs:reference (96 files ✅); git commit clean ✅
Next step: Prompt 5 (Sprint D — reduced-motion stylelint custom rule + library-wide `prefers-reduced-motion` pass)

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
