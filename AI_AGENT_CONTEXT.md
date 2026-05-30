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
- **Library-wide average:** **9.01 / 10** across 102 components (updated 2026-05-30; 26 components raised to 9.0 across four batches)
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
- `Divider` -> ✅ SCSS+README hardened (score **9.0/10** — border-top→border-block-start, logical margin-block/margin-inline, token-zero reduced-motion)
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
- `Icon` -> ✅ SCSS+README hardened (score **9.0/10** — token-zero reduced-motion, CSS Custom Properties section added to README)
- `IconButton` -> ✅ SCSS hardened (score **9.0/10** — transition + loading-animation tokens, token-zero reduced-motion)
- `AnimateOnScroll` -> ✅ SCSS hardened (score **9.0/10** — fixed non-existent --uilib-transition-duration token, dropped !important from reduced-motion, token-zero duration)
- `StyleClass` -> ✅ README hardened (score **9.0/10** — added CSS Custom Properties section explaining directive-only nature)
- `KeyFilter` -> ✅ README hardened (score **9.0/10** — added CSS Custom Properties section explaining directive-only nature)
- `DynamicDialog` -> ✅ SCSS+README hardened (score **9.0/10** — fixed non-existent --uilib-transition-base token→component tokens, border-bottom→border-block-end, border-radius:50%→token, variant box-shadows tokenized, token-zero reduced-motion, README CSS vars section expanded to 23 entries)
- `Fluid` -> ✅ README hardened (score **9.0/10** — renamed CSS Variables→CSS Custom Properties, added "none — layout utility" explanation, "When to use" guidance)
- `SyntaxHighlighter` -> ✅ README hardened (score **9.0/10** — added Accessibility section, "When to use" guidance)
- `Bind` -> ✅ README hardened (score **9.0/10** — added CSS Custom Properties section noting directive-only nature)
- `SelectButton` -> ✅ SCSS hardened (score **9.0/10** — token-zero reduced-motion via --uilib-button-transition cascade)
- `InputMask` -> ✅ SCSS+README hardened (score **9.0/10** — --uilib-input-mask-transition token, margin-top→margin-block-start, token-zero reduced-motion, README CSS Custom Properties section added)
- `InputOtp` -> ✅ SCSS+README hardened (score **9.0/10** — --uilib-input-otp-transition token, token-zero reduced-motion, README CSS Custom Properties section added)
- `Password` -> ✅ SCSS+README hardened (score **9.0/10** — --uilib-password-transition token, fixed non-existent --uilib-transition-duration, border-top/bottom→block-start/end, margin-top→block-start, removed !important from reduced-motion)
- `Rating` -> ✅ SCSS+README hardened (score **9.0/10** — --uilib-rating-star/cancel-transition tokens, consolidated two duplicate reduced-motion blocks, README CSS Custom Properties section added)
- `Slider` -> ✅ SCSS+README hardened (score **9.0/10** — --uilib-slider-handle-border-radius→var(--uilib-radius-full), --uilib-slider-track-padding token, --uilib-slider-handle-transition and animate-handle-transition tokens, top/bottom→inset-block-start/end on fill, logical padding on vertical track container, token-zero reduced-motion)
- `Textarea` -> ✅ SCSS+README hardened (score **9.0/10** — --uilib-textarea-transition token added, token-zero reduced-motion, README CSS Custom Properties table updated)
- `ToggleButton` -> ✅ SCSS+README hardened (score **9.0/10** — --uilib-toggle-button-checked-shadow token; minimal radius: 9999px→var(--uilib-radius-full); token-zero reduced-motion; README CSS Custom Properties section added)
- `ButtonGroup` -> ✅ SCSS+README hardened (score **9.0/10** — margin-top→margin-block-start in vertical orientation; README Styling Hooks→CSS Custom Properties table)
- `Image` -> ✅ SCSS+README hardened (score **9.0/10** — toolbar-btn-radius/transition and indicator-transition tokens; toolbar-bg-material and indicator-bg-minimal/hover tokens; top:0→inset-block-start:0; token-zero reduced-motion; README expanded with 6 new token entries)

---

## Known Blockers / Watch Items

- Non-blocking Jest warning seen during a11y run:
  - `jest-haste-map: Haste module naming collision: ui-lib-custom`
  - between root `package.json` and `projects/ui-lib-custom/package.json`
- Demo build shows pre-existing SCSS budget warnings in `button` and `date-picker` -- not a blocker

---

## Recent Handoffs

Date: 2026-05-30
Changed (SelectButton, InputMask, InputOtp, Password, Rating, Slider — all 8.8→9.0):
  select-button/select-button.scss: token-zero reduced-motion by cascading --uilib-button-transition:
    none onto child button elements from the host context
  input-mask/input-mask.component.scss: added --uilib-input-mask-transition token; routed input
    transition through it; margin-top→margin-block-start on error element; token-zero reduced-motion
  input-mask/README.md: added CSS Custom Properties section (13 entries)
  input-otp/input-otp.component.scss: added --uilib-input-otp-transition token; routed cell
    transition through it; token-zero reduced-motion
  input-otp/README.md: added CSS Custom Properties section (12 entries)
  password/password.component.scss: added --uilib-password-transition token; replaced non-existent
    --uilib-transition-duration reference; border-top→border-block-start, border-bottom→border-block-end,
    border-bottom-color→border-block-end-color, margin-top→margin-block-start; removed !important from
    reduced-motion; pure token-zero reduced-motion block
  password/README.md: added CSS Custom Properties section (19 entries)
  rating/rating.scss: added --uilib-rating-star-transition and --uilib-rating-cancel-transition tokens;
    routed raw transitions through them; removed non-existent --uilib-rating-transition-duration token;
    consolidated two duplicate reduced-motion blocks into one clean token-zero + transform:none block
  rating/README.md: added CSS Custom Properties section (9 entries)
  slider/slider.scss: --uilib-slider-handle-border-radius: 50%→var(--uilib-radius-full, 9999px);
    added --uilib-slider-track-padding/handle-transition/animate-handle-transition tokens; routed
    raw values through tokens; top:0/bottom:0→inset-block-start/end:0 on fill; top:auto→inset-block-start:auto
    on vertical fill; padding:12px 0/0 12px→token refs; token-zero reduced-motion (3 tokens: none)
  slider/README.md: added 3 new token rows + defaults column to CSS Custom Properties table
  docs/COMPONENT_SCORES.md: all 6 components raised to 9.0
  AI_AGENT_CONTEXT.md: library average updated to 9.01 (26 components at 9.0 across 4 batches)
State: COMPLETE — uncommitted; ESLint + build + commit pending
Verification: npx eslint select-button/ input-mask/ input-otp/ password/ rating/ slider/ (0w expected); ng build
Next step: Commit batch 4; then continue remaining 8.8 — FloatLabel, InputGroup, IconField, FormField, Drawer, ConfirmDialog, SpeedDial, OrderList, PickList, AutoFocus

Date: 2026-05-30
Changed (Textarea, ToggleButton, Icon, ButtonGroup, Divider, Image — all 8.8→9.0):
  textarea/textarea.scss: added --uilib-textarea-transition token; replaced raw
    `border-color 0.15s ease, box-shadow 0.15s ease` in field wrapper with token reference;
    converted element-style reduced-motion to token-zero (--uilib-textarea-transition: none)
  textarea/README.md: added --uilib-textarea-transition row to CSS Custom Properties table
  toggle-button/toggle-button.scss: added --uilib-toggle-button-checked-shadow token to host block;
    material variant box-shadow: raw rgba → var(--uilib-toggle-button-checked-shadow); minimal
    variant radius: 9999px → var(--uilib-radius-full, 9999px); token-zero reduced-motion
  toggle-button/README.md: added full CSS Custom Properties section (10 entries with defaults)
  icon/icon.scss: converted element-level transition:none reduced-motion to token-zero
    (ui-lib-icon { --uilib-icon-transition: none; })
  icon/README.md: added CSS Custom Properties section (2 entries: color, transition)
  button-group/button-group.scss: margin-top → margin-block-start in vertical orientation
    :not(:first-child) rule (logical CSS fix)
  button-group/README.md: renamed "Styling hooks" → "CSS Custom Properties" table format
  divider/divider.scss: horizontal orientation border-top → border-block-start on ::before/::after;
    margin: var(--v) 0 → margin-block: var(--v); margin-inline: 0 (logical CSS)
  image/image.scss: added 6 new tokens (toolbar-btn-radius, toolbar-btn-transition,
    indicator-transition, toolbar-bg-material, indicator-bg-minimal, indicator-bg-minimal-hover);
    top: 0 → inset-block-start: 0 on toolbar; border-radius: 50% → token on toolbar-btn;
    raw transitions → token refs; material/minimal variant raw rgba → token refs;
    collapsed element-list reduced-motion to token-zero (3 transition tokens: none)
  image/README.md: added 6 new token rows to CSS Custom Properties table
  docs/COMPONENT_SCORES.md: all 6 components raised to 9.0; tier queue statuses updated
  AI_AGENT_CONTEXT.md: library average updated to 9.00 (20 components at 9.0 across 3 batches)
State: COMPLETE — uncommitted; ESLint + build + commit pending
Verification: npx eslint textarea/ toggle-button/ icon/ button-group/ divider/ image/ (0w expected); ng build ui-lib-custom (0w)
Next step: Commit batch 3; then continue 8.8 components — SelectButton, InputMask, InputOtp, Password, Rating, Slider, FloatLabel, FormField

Date: 2026-05-30
Changed (Textarea, ToggleButton, Icon, ButtonGroup, Divider, Image — all 8.8→9.0):
  Full details in docs/implementation/AI_AGENT_CONTEXT_ARCHIVE.md
State: COMPLETE — ESLint 0w ✅; ng build 0w ✅; committed

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
