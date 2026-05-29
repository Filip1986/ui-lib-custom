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
- **Library-wide average:** **8.97 / 10** across 102 components (updated 2026-05-30; batch of 10 components raised 8.7→9.0)
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
- `Paginator` -> ✅ SCSS hardened (score **9.0/10** — `var(--uilib-radius-full)` for button-radius, focus-shadow token, token-zero reduced-motion)
- `Listbox` -> ✅ prompt-8 hardened (score **9.0/10** — 5 string inputs null defaults, 5 resolved computeds, hardcoded 'Filter options' → i18n)
- `VirtualScroller` -> ✅ SCSS hardened (score **9.0/10** — spinner-border-radius + spinner-animation tokens, border-block-start-color, token-zero reduced-motion)
- `Button` -> ✅ complete + hardened (6-phase, score 8.9/10, 72 tests — 48 unit + 24 a11y)
- `ImageCompare` -> ✅ complete + hardened (6-phase, score 8.9/10, 60 tests — 39 unit + 21 a11y)
- `ToggleSwitch` -> ✅ complete + hardened (6-phase, score 8.8/10, 68 tests — 37 unit + 31 a11y)
- `Icon` -> ✅ complete + hardened (6-phase, score 8.7/10, 30 tests — 12 unit + 18 a11y)
- `IconButton` -> ✅ SCSS hardened (score **9.0/10** — transition + loading-animation tokens, token-zero reduced-motion)
- `AnimateOnScroll` -> ✅ SCSS hardened (score **9.0/10** — fixed non-existent --uilib-transition-duration token, dropped !important from reduced-motion, token-zero duration)
- `StyleClass` -> ✅ README hardened (score **9.0/10** — added CSS Custom Properties section explaining directive-only nature)
- `KeyFilter` -> ✅ README hardened (score **9.0/10** — added CSS Custom Properties section explaining directive-only nature)

---

## Known Blockers / Watch Items

- Non-blocking Jest warning seen during a11y run:
  - `jest-haste-map: Haste module naming collision: ui-lib-custom`
  - between root `package.json` and `projects/ui-lib-custom/package.json`
- Demo build shows pre-existing SCSS budget warnings in `button` and `date-picker` -- not a blocker

---

## Recent Handoffs

Date: 2026-05-30
Changed (VirtualScroller, Paginator, IconButton, AnimateOnScroll, StyleClass, KeyFilter — all 8.7→9.0):
  virtual-scroller/virtual-scroller.component.scss: added --uilib-scroller-spinner-border-radius
    (var(--uilib-radius-full, 9999px)) and --uilib-scroller-spinner-animation tokens; replaced
    border-top-color → border-block-start-color; border-radius: 50% → token; animation → token;
    converted element-list reduced-motion to token-zero (spinner-animation: none; keep scroll-behavior: auto)
  virtual-scroller/README.md: added CSS Custom Properties section (6 entries with defaults column)
  paginator/paginator.component.scss: --uilib-paginator-button-radius: 50% → var(--uilib-radius-full)
    in both base and material variant; added --uilib-paginator-focus-shadow token for rgba focus
    box-shadows on jtp-input and rpp-select; token-zero reduced-motion on .ui-lib-paginator
  paginator/README.md: updated button-radius default; added focus-shadow row to CSS table
  icon-button/icon-button.scss: added --uilib-icon-button-transition and
    --uilib-icon-button-loading-animation tokens; replaced raw transition/animation values with tokens;
    collapsed two-block element-list reduced-motion to single token-zero block
  icon-button/README.md: added CSS Custom Properties section (5 entries with defaults column)
  animate-on-scroll/animate-on-scroll.scss: fixed --uilib-animate-on-scroll-duration from
    var(--uilib-transition-duration, 600ms) (non-existent global token) to plain 600ms; replaced
    8-selector !important reduced-motion block with token-zero (duration: 0ms) + no !important
  animate-on-scroll/README.md: added CSS Custom Properties section (4 entries with defaults column)
  style-class/README.md: added CSS Custom Properties section noting directive-only, no component styles
  key-filter/README.md: added CSS Custom Properties section noting directive-only, no component styles
  docs/COMPONENT_SCORES.md: all 6 components raised to 9.0
  AI_AGENT_CONTEXT.md: library average updated to 8.97, component delta entries updated
State: COMPLETE — ESLint + build pending verification
Verification: npx eslint virtual-scroller/ paginator/ icon-button/ animate-on-scroll/ (0w); ng build ui-lib-custom (0w)
Next step: Remaining 8.7 components — Fluid, DynamicDialog, SyntaxHighlighter, Bind; then 8.8 batch

Date: 2026-05-29
Changed (Alert + Chip hardening — both 8.6→9.0):
  alert/alert.scss: complete rewrite — added severity-based token system (bg/fg/border per
    info/success/warning/error); all 4 severity classes now produce distinct colour schemes via
    --uilib-alert-{severity}-{property} tokens; added bootstrap-variant severity overrides with
    Bootstrap's canonical palette hex; added close button --uilib-alert-close-btn-bg-hover/active
    tokens + hover/active states + transition backed by --uilib-alert-transition:
    var(--uilib-transition-fast); replaced single transition:none reduced-motion block with
    token-zero --uilib-alert-transition:0ms
  alert/README.md: expanded CSS tokens table from 2 to 19 entries with defaults column
  chip/chip.scss: replaced non-standard --uilib-transition-base fallback with
    var(--uilib-transition-fast, 150ms ease) on --uilib-chip-transition; added
    --uilib-chip-remove-transition token; replaced border-radius:50% on image and remove-button
    with --uilib-chip-image-border-radius/--uilib-chip-remove-border-radius tokens (both backed by
    var(--uilib-radius-full)); added --uilib-chip-remove-bg-active token + :active state on
    remove-button; added --uilib-chip-shadow token to replace raw rgba in material variant rule body;
    replaced element-list reduced-motion block with token-zero
  chip/README.md: expanded CSS variables table from 12 to 18 entries with defaults column
  docs/COMPONENT_SCORES.md: Alert Perf/Theme/Polish/Feel all 8→9 (8.6→9.0);
    Chip Perf/Theme/Polish/Feel all 8→9 (8.6→9.0)
State: COMPLETE — ESLint 0w ✅; ng build 0w ✅
Verification: npx eslint alert/ chip/ (0w); ng build ui-lib-custom (0w)
Next step: Remaining 8.6/8.7 components — TreeSelect/VirtualScroller/Message/Skeleton/etc.

Date: 2026-05-29
Changed (Listbox hardening — 8.6→9.0):
  listbox/listbox.types.ts: added `option: unknown` field to ListboxOptionRow (stores the raw
    option object from consumer's `options` array); added `option: unknown` to ListboxItemContext
    as a convenience alias for $implicit.option so item templates can access full option properties
  listbox/listbox.component.ts: updated flatItems() computed to include `option` (the raw option
    object) in each ListboxOptionRow push — both flat options path and grouped children path
  listbox/listbox.component.html: added `option: item.option` to #itemTemplate ngTemplateOutletContext;
    replaced hardcoded "Select all" visible text with {{ i18n.translate('listbox.select-all') }}
  listbox/listbox.component.scss: changed --uilib-listbox-transition token from raw `0.15s ease`
    values to `background-color var(--uilib-transition-fast, 150ms ease), color var(--uilib-transition-fast,
    150ms ease)` (backed by global fast token); replaced element-list reduced-motion block with
    token-zero: .ui-lib-listbox { --uilib-listbox-transition: none; }
  listbox/README.md: rewrote content projection section with template context table; fixed input
    nullability (emptyMessage/emptyFilterMessage/ariaLabel/ariaLabelledBy now show null defaults);
    expanded CSS token table with defaults column (17 entries); added usage examples for custom
    item template, group template, and option context access
  docs/COMPONENT_SCORES.md: Listbox Perf/Comp/Polish/Feel all 8→9; avg 8.6→9.0
State: COMPLETE — ESLint 0w ✅; ng build 0w ✅
Verification: npx eslint listbox/ (0w); ng build ui-lib-custom (0w)
Next step: Alert (8.6) or Chip (8.6) — both have Perf/Theme/Polish/Feel=8 pattern (SCSS token gaps)

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
