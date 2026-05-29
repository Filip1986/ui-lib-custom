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
Changed (batch 6):
  date-picker/date-picker.types.ts: today?: string and clear?: string (now optional)
  date-picker/date-picker.constants.ts: removed today:'Today' and clear:'Clear' from DEFAULT_LOCALE
  date-picker/date-picker.ts: added resolvedTodayLabel + resolvedClearLabel computed signals
    (locale().today ?? i18n.translate('datepicker.today/clear'))
  date-picker/date-picker.html: {{ locale().today }} → {{ resolvedTodayLabel() }};
    {{ locale().clear }} → {{ resolvedClearLabel() }}
  docs/COMPONENT_SCORES.md: DatePicker I18n 8→9, avg 8.5→8.6
State: COMPLETE — ESLint 0w ✅; jest date-picker (138 tests) ✅
Verification: npx eslint date-picker/ (0w); npx jest date-picker (138 pass)
Next step: Commit + push batch-6; Prompt 8 I18n pass is now fully complete (no remaining I18n=8)

Date: 2026-05-29
Changed (batch 5):
  select-button/select-button.ts: UiLibI18nService injected; ariaLabelResolved ?? 'Select options'
    → ?? i18n.translate('select-button.label')
  menubar/menubar.ts: ariaLabel input string→null default; resolvedAriaLabel computed; MENUBAR_DEFAULT_ARIA_LABEL
    now deprecated; i18n 'menubar.label' key as fallback
  menubar/menubar.html: [attr.aria-label]="ariaLabel()" → resolvedAriaLabel()
  icon-button/icon-button.ts: UiLibI18nService + inject added; ICON_BUTTON_LOADING_ARIA_LABEL constant
    removed; ariaLabelResolved uses i18n.translate('icon-button.loading')
  tabs/tabs.ts: scrollPrevLabel()/scrollNextLabel() return i18n.translate('tabs.scroll.prev/next')
  input-mask/input-mask.component.ts: INPUT_MASK_DEFAULT_ERROR_MESSAGES constant removed;
    resolvedErrorMessage uses i18n.translate('input-mask.incomplete/invalid')
  key-filter/key-filter.directive.ts: UiLibI18nService injected; PASTE_FILTER_ANNOUNCEMENT constant
    removed; announce uses i18n.translate('key-filter.paste-filter')
  i18n/en,de,fr,es.ts: 8 new keys per locale — tabs.scroll.prev/next; menubar.label;
    icon-button.loading; select-button.label; input-mask.incomplete/invalid; key-filter.paste-filter
  docs/COMPONENT_SCORES.md: bulk I18n 8→9 pass — SelectButton 8.7→8.8, Menubar 8.9→9.0,
    IconButton 8.6→8.7, Tabs 8.9→9.0, InputMask 8.7→8.8, KeyFilter 8.6→8.7;
    no-op bumps: Input/Textarea/RadioButton/Accordion/Tooltip/ButtonGroup/CodeSnippet + all
    layout (Card/Stack/Inline/Grid/Container/FloatLabel/IconField/InputGroup/FormField/Divider/
    Toolbar/Fluid/Fieldset/Panel/ScrollPanel) + utilities (Icon/BlockUI/ClassNames/Terminal/
    Ripple/StyleClass/AnimateOnScroll/AutoFocus/Bind)
State: COMPLETE — ESLint 0w ✅; jest select-button(76)+menubar(84)+icon-button(27)+
  tabs(41)+input-mask(62)+key-filter(48) = 338 tests ✅
Verification: eslint 6 components + i18n (0w); jest all 338 pass
Next step: Commit + push batch-5; only remaining I18n=8 is DatePicker (complex, rich key set
  already exists — needs ariaLabel null-default verification) and FocusTrap (structural,
  stays 8.5 regardless)

Date: 2026-05-29
Changed:
  password/password.component.ts: promptLabel/weakLabel/mediumLabel/strongLabel → string|null null defaults;
    resolvedPromptLabel/resolvedWeakLabel/resolvedMediumLabel/resolvedStrongLabel computed signals added;
    strengthLabel + strengthDescription use resolved* / i18n.translate(); PASSWORD_DEFAULTS label consts removed
  password/password.component.html: toggle mask button aria-label → i18n.translate('password.show/hide')
  chip/chip.ts: resolvedImageAlt computed (imageAlt() ?? i18n.translate('chip.image-alt')); i18n already injected
  chip/chip.html: [alt]="resolvedImageAlt()" (was inline ?? in template)
  message/message.ts: closeAriaLabel input added (string|null null default); resolvedCloseAriaLabel computed
  message/message.html: [attr.aria-label]="resolvedCloseAriaLabel()"
  i18n/en,de,fr,es.ts: 10 new password keys per locale (show/hide/prompt/weak/medium/strong/strength.none/weak/medium/strong)
  docs/COMPONENT_SCORES.md: Password 8.7→8.8 (I18n 8→9); Chip 8.5→8.6 (I18n 8→9); Message 8.6→8.7 (I18n 8→9)
State: COMPLETE — ESLint 0w ✅; jest password(80)+chip(53)+message(50) ✅
Verification: eslint password/ chip/ message/ i18n/ (0w); jest password|chip|message (183 pass)
Next step: Commit + push batch-4; then continue Prompt 8 on remaining I18n=8 components
  (Input, Textarea, RadioButton, SelectButton, InputMask, KeyFilter, DatePicker, Icon, IconButton,
  ButtonGroup, Menubar, Tabs, Accordion, CodeSnippet — layout/utility components likely no-op)

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
