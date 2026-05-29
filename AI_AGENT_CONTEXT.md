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
- **I18n batch pass (2026-05-29)**: Chip (7→8, 8.5), Button (7→9, 8.9), Breadcrumb/ContextMenu/Menu/MegaMenu/PanelMenu/TieredMenu (7→9, 9.0 each), OrderList (7→9, 8.8), ConfirmPopup (7→9, 8.9), SpeedDial (7→9, 8.8), ImageCompare (7→9, 9.0)

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
- `Badge` -> ✅ complete + hardened + prompt-8 (score **9.0/10** — pulse dot, i18n status-indicator label, styleClass input)
- `Chip` -> ✅ complete + hardened + i18n wired (score 8.5/10 I18n 7→8, 53 unit tests + 18 a11y)
- `ContextMenu` -> ✅ complete + hardened (6-phase, 86 tests — 55 unit + 31 a11y)
- `Chart` -> ✅ complete + hardened (6-phase, score 8.9/10, 96 tests — 75 unit + 21 a11y)
- `BottomSheet` -> ✅ prompt-8 hardened (score **9.0/10** — showCloseButton, closeAriaLabel, null header, [uilib-footer] slot)
- `MeterGroup` -> ✅ prompt-8 hardened (score **9.0/10** — ariaLabel null default + resolved)
- `DataView` -> ✅ prompt-8 hardened (score **9.0/10** — resolvedEmptyMessage, resolvedFilterPlaceholder, null-default labels)
- `Divider` -> ✅ complete + hardened (6-phase, score 8.7/10, 36 tests — 24 unit + 12 a11y)
- `Fieldset` -> ✅ complete + hardened (6-phase, score 9.0/10, 53 tests — 30 unit + 23 a11y)
- `Panel` -> ✅ complete + hardened (6-phase, score 9.0/10, 110 tests — 87 unit + 23 a11y)
- `ScrollPanel` -> ✅ complete + hardened (6-phase, score 8.9/10, 29 tests — 13 unit + 16 a11y)
- `ScrollTop` -> ✅ prompt-8 hardened (score **8.9/10** — null ariaLabel, i18n fallback, [uilib-icon] slot)
- `Carousel` -> ✅ prompt-8 hardened (score **9.0/10** — all 5 aria-label inputs null+resolved, i18n pause/play keys)
- `Galleria` -> ✅ prompt-8 hardened (score **8.9/10** — ariaLabel null default + resolved)
- `Timeline` -> ✅ prompt-8 hardened (score **9.0/10** — ariaLabel null default + resolved)
- `Knob` -> ✅ prompt-8 hardened (score **9.0/10** — ariaLabel null default + resolved, styleClass input)
- `Paginator` -> ✅ prompt-8 hardened (score **8.7/10** — ariaLabel + styleClass null defaults, resolvedAriaLabel i18n)
- `Listbox` -> ✅ prompt-8 hardened (score **8.6/10** — 5 string inputs null defaults, 5 resolved computeds, hardcoded 'Filter options' → i18n)
- `VirtualScroller` -> ✅ prompt-8 hardened (score **8.7/10** — 8 string inputs null defaults, 6 resolved computeds, liveRegionMessage + formatTotalItemsMessage use resolved)
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

Date: 2026-05-29
Changed:
  table/table.component.ts: emptyMessage + globalFilterPlaceholder → string|null null defaults;
    resolvedEmptyMessage + resolvedGlobalFilterPlaceholder computed signals added
  table/table.component.html: {{ emptyMessage() }} → {{ resolvedEmptyMessage() }}
  tree-table/tree-table.component.ts: globalFilterPlaceholder, caption, styleClass, ariaLabel →
    string|null null defaults; resolvedFilterPlaceholder + resolvedAriaLabel computeds;
    hostClasses rewritten null-safe (parts array + if(extra))
  tree-table/tree-table.component.html: resolvedFilterPlaceholder(); resolvedAriaLabel()
  tree/tree.ts: filterPlaceholder, styleClass, ariaLabel → string|null null defaults;
    resolvedFilterPlaceholder computed; hostAriaLabel: Signal<string> (always resolved, not nullable);
    hostClasses rewritten null-safe
  tree/tree.html: resolvedFilterPlaceholder()
  avatar/avatar.ts: imageAlt → string|null null default; resolvedImageAlt uses ?? chain
  avatar/avatar.spec.ts + avatar.a11y.spec.ts: WritableSignal<string> → string|null; fallback test uses null
  i18n/en,de,fr,es.ts: table.empty, table.filter.placeholder, tree-table.label,
    tree-table.filter.placeholder, tree.label keys added (4 locales)
  docs/COMPONENT_SCORES.md: Table/TreeTable/Tree 8.5→8.6; Avatar 8.8→8.9
State: COMPLETE — ESLint 0w ✅; ng build ✅; 309/309 tests ✅
Verification: eslint table/ tree-table/ tree/ avatar/ (0w); ng build (0w); jest (309 pass)
Next step: Commit + push; then continue Prompt 8 on DatePicker and remaining 8.5-cluster components

Date: 2026-05-29 [feat(lib): prompt-8 hardening — ConfirmDialog + Drawer structural improvements + i18n docs batch]
Changed:
  confirm-dialog/confirm-dialog.types.ts: added acceptOnly?: boolean to ConfirmationConfig
  confirm-dialog/confirm-dialog.ts: added acceptOnly input + resolvedAcceptOnly computed
  confirm-dialog/confirm-dialog.html: consolidated two @if(visible()) blocks into one; added [uilib-content] slot; wrapped reject button in @if(!resolvedAcceptOnly())
  confirm-dialog/README.md: documented acceptOnly, [uilib-content] slot, i18n table, ConfirmationConfig.acceptOnly
  drawer/drawer.html: added [uilib-header] and [uilib-footer] canonical slot aliases alongside legacy [drawerHeader]/[drawerFooter]
  drawer/drawer.ts: added closeAriaLabel input + effectiveCloseAriaLabel computed; injected UiLibI18nService
  drawer/README.md: documented closeAriaLabel, canonical slot names, i18n keys section
  (prev session) code-snippet/code-snippet.ts+html: [uilib-header-actions] + [uilib-footer] slots + effectiveTabsAriaLabel
  (prev session) 7x README.md i18n-neutral docs: accordion, checkbox, toggle-switch, radio-button, textarea, select-button, tooltip
  docs/COMPONENT_SCORES.md: ConfirmDialog 8.5→8.8; Drawer 8.5→8.8; CodeSnippet avg 8.6→8.9; 7x I18n 7→8
State: COMPLETE — ESLint ✅; build zero warnings ✅; 124 confirm-dialog+drawer tests ✅
Verification: npx eslint confirm-dialog/ drawer/ (0 warnings); ng build (0 warnings); npx jest confirm-dialog|drawer (124 pass)
Next step: Continue Prompt 8 pass on remaining 8.5-cluster components (BottomSheet, MeterGroup, DataView, Badge, Timeline, Carousel, Galleria, ScrollTop, Knob, Avatar)

Date: 2026-05-29 [feat(lib): prompt-8 hardening — Paginator + Listbox + VirtualScroller null-default + i18n]
Changed:
  paginator/paginator.component.ts: ariaLabel + styleClass → string|null null defaults; resolvedAriaLabel computed
  listbox/listbox.component.ts: ariaLabel, ariaLabelledBy, emptyMessage, emptyFilterMessage, filterPlaceholder → string|null
    null defaults; 5 resolved computeds (resolvedAriaLabel, resolvedEmptyMessage, resolvedEmptyFilterMessage,
    resolvedFilterPlaceholder, resolvedFilterAriaLabel)
  listbox/listbox.component.html: hardcoded 'Filter options' → resolvedFilterAriaLabel(); other template refs updated
  virtual-scroller/virtual-scroller.component.ts: 8 string inputs → string|null null defaults; 6 resolved computeds;
    liveRegionMessage uses resolved*; formatTotalItemsMessage uses resolvedAvailableItemsText(); hostClasses null-safe
  i18n/en,de,fr,es.ts: 11 new keys — listbox.label, listbox.empty, listbox.empty.filter,
    listbox.filter.placeholder, listbox.filter.label; virtual-scroller.list-label, .grid-label,
    .loading, .loading-more, .empty, .available (all 4 locales)
  3 spec files: WritableSignal<string> → string|null where needed
  docs/COMPONENT_SCORES.md: Paginator 8.5→8.7; Listbox 8.5→8.6; VirtualScroller 8.5→8.7
State: COMPLETE — ESLint 0w ✅; ng build ✅; 143 tests ✅
Verification: npx eslint paginator/ listbox/ virtual-scroller/ i18n/ (0w); ng build ✅; jest paginator+listbox+virtual-scroller (143 pass)
Next step: Continue Prompt 8 pass on Avatar + DatePicker + remaining 8.5-cluster; update READMEs for changed components
  docs/COMPONENT_SCORES.md: AutoComplete Theme 9→10 (9.4→9.5); CascadeSelect Perf/Angular/Theme 9→10 (9.2→9.5)
  docs/reference/bundle-sizes.json: baseline updated
State: COMPLETE — ESLint ✅; build zero warnings ✅; 161/161 tests ✅
Verification: npx eslint autocomplete/ cascade-select/ (PASS ✅); ng build ✅; npx jest (161 ✅)
Next step: Broader Prompt 8 pass on sub-8.5 components; ColorPicker → 9.5 if continuing ceiling push

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
