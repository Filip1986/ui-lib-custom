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
- **Active focus:** Prompt 8 — 8.5-cluster batch COMPLETE ✅ (OrganizationChart, Galleria, DynamicDialog, Drawer, ConfirmDialog, Tree, TreeTable, Table, Listbox, VirtualScroller, Paginator, DatePicker — all 8.5→8.7). Next: Prompt 7 ceiling push (Select, AutoComplete, CascadeSelect, ColorPicker → 9.5).
- **Next queue:** Prompt 7 ceiling push (Select, AutoComplete, CascadeSelect, ColorPicker → 9.5). Then broader Prompt 8 pass on any remaining sub-8.5 components.
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

Date: 2026-05-28 [feat(lib): prompt-8 DatePicker (8.5→8.7) — CSS token, i18n aria labels ✅]
Changed:
  date-picker/date-picker.scss: --uilib-datepicker-panel-min-width: 18rem; added to host token block;
    wired in .ui-lib-datepicker__panel (was a raw value)
  date-picker/date-picker.html: 5 hardcoded English strings replaced with i18n.translate():
    'Open date picker' → datepicker.toggle; 'Date picker' → datepicker.panel.label;
    'Previous/Next month, {month}' → datepicker.prev/next.month.label with { month } param;
    'Toggle AM/PM, current {value}' → datepicker.ampm.toggle with { value } param
  i18n/en,de,fr,es.ts: 4 new datepicker keys across all locales
    (datepicker.panel.label, datepicker.prev.month.label, datepicker.next.month.label, datepicker.ampm.toggle)
  docs/reference/bundle-sizes.json: baseline updated
State: COMPLETE — ESLint ✅; build zero warnings ✅; 138 date-picker + 6123 total tests ✅; commit f100f9ae ✅
Verification: npx eslint date-picker/ (PASS ✅); ng build ui-lib-custom (PASS ✅); npm test (6123 ✅)
Next step: Prompt 7 ceiling push — Select, AutoComplete, CascadeSelect, ColorPicker → 9.5

Date: 2026-05-28 [feat(lib): prompt-8 8.5-cluster batch 2 — Drawer, ConfirmDialog, Tree, TreeTable, Table, Listbox, VirtualScroller, Paginator ✅]
Changed:
  drawer/drawer.scss: --uilib-drawer-close-transition token; uilib-drawer-panel-enter animation (all 4 positions);
    @keyframes; prefers-reduced-motion guard extended
  confirm-dialog/confirm-dialog.scss: --uilib-confirm-dialog-close-btn-radius; material variant 999px via token
  tree/tree.ts+html+scss: resolvedFilterPlaceholder via tree.filter-placeholder; --uilib-tree-node-gap;
    uilib-tree-mount animation
  tree-table/tree-table.component.ts+html+scss: resolvedGlobalFilterPlaceholder; --uilib-tree-table-filter-margin-bottom;
    uilib-tree-table-mount animation
  table/table.component.scss: --uilib-table-sort-transition-duration; uilib-table-mount animation
  listbox/listbox.component.ts+html+scss: 3 resolved signals (filterPlaceholder/emptyMessage/emptyFilterMessage);
    --uilib-listbox-filter-gap; uilib-listbox-mount animation
  virtual-scroller/virtual-scroller.component.scss+ts: --uilib-scroller-spin-duration; 6 i18n fallbacks in
    resolvedAriaLabel/liveRegionMessage/formatTotalItemsMessage
  paginator/paginator.component.ts+scss: resolvedAriaLabel via paginator.nav; uilib-paginator-mount animation
  i18n/en,de,fr,es.ts: 10 new keys (tree-table.filter-placeholder, listbox.*, virtual-scroller.*)
  docs/reference/bundle-sizes.json: baseline updated
State: COMPLETE — ESLint ✅; build zero warnings ✅; 6123/6123 tests ✅; commit 75fe2bbf ✅
Verification: npx eslint (all dirs PASS ✅); ng build ✅; npm test (6123 ✅)
Next step: DatePicker Prompt 8 pass → DONE

Date: 2026-05-28 [feat: Prompt 8 — 8.5-cluster batch: OrganizationChart (8.5→8.7) + Galleria (8.5→8.7) + DynamicDialog (8.5→8.7) ✅]
Changed:
  organization-chart/organization-chart.ts: inject UiLibI18nService; ariaLabel input default '' (was 'Organization');
    resolvedAriaLabel computed signal; onNodeKeydown handler added
  organization-chart/organization-chart.html: ariaLabel() → resolvedAriaLabel()
  organization-chart/organization-chart.scss: --uilib-org-chart-node-transition token; transition wired;
    uilib-org-chart-mount keyframe + animation on host; prefers-reduced-motion expanded
  organization-chart/organization-chart-node.ts: onNodeKeydown(event: Event) method added
  organization-chart/organization-chart-node.html: (keydown.enter)/(keydown.space) → onNodeKeydown;
    [attr.tabindex] → [tabindex] (fixes interactive-supports-focus lint rule)
  galleria/galleria.ts: ariaLabel input default '' (was GALLERIA_ARIA_REGION_LABEL); host binding
    uses resolvedAriaLabel(); added resolvedAriaLabel computed; 4 constant class properties
    (closeAriaLabel/fullscreenAriaLabel/thumbnailPrevAriaLabel/thumbnailNextAriaLabel) → i18n getters;
    updated previousItemAriaLabel/nextItemAriaLabel/lightboxAriaLabel fallbacks to i18n;
    removed GALLERIA_ARIA_* constant imports
  galleria/galleria.html: hardcoded 'Go to image ' interpolation → goToItemAriaLabel($index)
  galleria/galleria.scss: --uilib-galleria-header-footer-padding token; header/footer padding wired;
    uilib-galleria-mount keyframe + animation; prefers-reduced-motion expanded
  dynamic-dialog/dynamic-dialog.ts: 'Dialog' hardcoded fallback → i18n.translate('dynamic-dialog.label')
  dynamic-dialog/dynamic-dialog.scss: token block added (--uilib-dynamic-dialog-close-btn-size 2rem,
    --uilib-dynamic-dialog-header-gap 0.5rem); close-btn width/height wired; header gap wired
  dynamic-dialog/dynamic-dialog.html: backdrop div: role="presentation" aria-hidden="true";
    <ng-container #dynamicContent></ng-container> → self-closing
  i18n/en,de,fr,es.ts: organization-chart.label; galleria.label + 6 new galleria keys (close/fullscreen/
    thumbnail.prev/thumbnail.next/prev/next); dynamic-dialog.label (4 keys × 3 components = 11 new i18n entries)
  docs/COMPONENT_SCORES.md: OrganizationChart/Galleria/DynamicDialog 8.5→8.7
  docs/reference/bundle-sizes.json: baseline updated
State: COMPLETE — ESLint ✅; build zero warnings ✅; 175 tests (org-chart + galleria + dynamic-dialog) ✅
Verification: npx eslint (PASS ✅); ng build ui-lib-custom (PASS ✅); npx jest (175 ✅); bundlesize (PASS ✅)
Next step: Continue 8.5-cluster batch on Drawer, ConfirmDialog, Table, TreeTable, Tree, Listbox, VirtualScroller, Paginator

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
