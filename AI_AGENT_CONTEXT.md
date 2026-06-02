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
- **Library-wide average:** **9.03 / 10** across 102 components (updated 2026-05-30; 47 components raised to 9.0 across nine batches)
- **Active focus:** Prompt 7 ceiling push — Select (9.1→9.5 ✅), AutoComplete (9.0→9.5 ✅), ColorPicker (9.0→9.5 ✅), CascadeSelect (9.0→9.5 ✅). All four ceiling-push targets complete.
- **Next queue:** Broader Prompt 8 pass on any remaining sub-8.5 components.
- **Horizon:** Runtime variant switcher, theme preset management, broader axe-core audit ✅ (infra in place)
- **Prompt library status:** All Tier 1 hardening prompts deleted (one-time-use scaffolding — lessons distilled into `docs/prompts/COMPONENT_EVOLUTION_PROMPTS.md`). Active prompt system: `docs/prompts/audit/` (3-phase agentic Tier 2 audit). Score index: `docs/prompts/HARDENING_PROMPT_INDEX.md`.

### Component/Docs Delta (Active Only)

- `CodeSnippet` -> ✅ complete + scored + i18n wired (8.6/10 — multi-file tabs, ARIA tablist/tab/tabpanel, syntax highlighting, ariaLabel/ariaLabelledBy inputs, 31 unit tests; ESLint clean)
- `SyntaxHighlighter` -> ✅ complete + scored (8.7/10 — zero-dep TS/HTML/SCSS/CSS tokenizer; highlight/tokenize/escapeForCode exports; full demo page)
- **I18n batch pass (2026-05-29)**: Chip (7→8, 8.5), Button (7→9 i18n, 9.0 after batch-7 Comp fix), Breadcrumb/ContextMenu/Menu/MegaMenu/PanelMenu/TieredMenu (7→9, 9.0 each), OrderList (7→9, 8.8), ConfirmPopup (7→9 i18n, 9.0 after batch-7 DX fix), SpeedDial (7→9, 8.8), ImageCompare (7→9, 9.0)
- **Batch-7 hardening (2026-05-30)**: Button (Comp 8→9, CSS Custom Properties + composability patterns → 9.0), Input (Comp 8→9, composability patterns → 9.0), ConfirmPopup (DX 8→9, inject()/multiple-instances/CSS tokens → 9.0), Ripple (API 8→9, rippleEasing input added → 9.0)

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
- `Ripple` -> ✅ complete + hardened (6-phase, score 9.0/10, 29 tests — 19 unit + 10 a11y; batch-7: rippleEasing input added, API complete)
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
- `ScrollTop` -> ✅ prompt-8 hardened (score **9.0/10** — null ariaLabel, i18n fallback, [uilib-icon] slot; batch-8: passive:true + rAF debounce on scroll listener)
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
- `FloatLabel` -> ✅ SCSS+README hardened (score **9.0/10** — --uilib-float-label-transition token; removed non-existent --uilib-transition-base fallback; top→inset-block-start on textarea label + all active states; token-zero reduced-motion; README updated)
- `FormField` -> ✅ SCSS+README hardened (score **9.0/10** — --uilib-form-field-error-animation token; token-zero reduced-motion; README CSS Custom Properties section added)
- `SpeedDial` -> ✅ SCSS+README hardened (score **9.0/10** — replaced 6-selector reduced-motion block with single token-zero on host; README CSS Custom Properties section added with 15 entries)
- `OrderList` -> ✅ SCSS+README hardened (score **9.0/10** — control-btn/icon width/height→inline-size/block-size; header/filter/item border-bottom→border-block-end; drop-before/after top/bottom/height→inset-block-start/end/block-size; token-zero reduced-motion)
- `PickList` -> ✅ SCSS+README hardened (score **9.0/10** — same logical CSS pass as OrderList; transfer-btn logical sizing; token-zero reduced-motion)
- `IconField` -> ✅ README hardened (score **9.0/10** — CSS Custom Properties section added with 7 entries)
- `InputGroup` -> ✅ README hardened (score **9.0/10** — CSS Custom Properties section added with 1 entry)
- `AutoFocus` -> ✅ README hardened (score **9.0/10** — CSS Custom Properties section added noting directive-only nature)
- `Ripple` -> ✅ SCSS hardened (score **8.9/10** — border-radius:50%→var(--uilib-radius-full,9999px); token-zero --uilib-ripple-duration + defense-in-depth display:none in reduced-motion)
- `Drawer` -> ✅ SCSS+README hardened (score **8.9/10** — --uilib-drawer-close-transition token; right/left panel top/bottom/width/max-width→inset-block-\*/inline-size; top/bottom panel →inset-block-start/end/block-size; header border-bottom/padding-bottom→block-end; close btn width/height/border-radius→inline-size/block-size/radius-full; token-zero reduced-motion)
- `ConfirmDialog` -> ✅ SCSS hardened (score **8.9/10** — removed non-existent --uilib-transition-duration-fast fallback; material btn-radius/close-btn 999px→var(--uilib-radius-full,9999px); token-zero --uilib-confirm-dialog-interactive-transition-duration)
- `Input` -> ✅ SCSS+README hardened (score **8.9/10** — --uilib-input-transition + --uilib-input-label-transition tokens; routed raw multi-property transitions through them; token-zero reduced-motion; README CSS Custom Properties section added)
- `Container` -> ✅ TS+README hardened (score **9.0/10** — physical margin-left/right→margin-inline, padding-left/right/top/bottom→padding-inline/block in host bindings; width→inline-size/max-inline-size; README CSS Custom Properties section added)
- `RadioButton` -> ✅ SCSS hardened (score **9.0/10** — --uilib-radio-button-box-transition + icon-transition tokens; width/height→inline-size/block-size on box+icon+native-input; border-radius:50%→radius-full; replaced broken reduced-motion with token-zero)
- `ToggleSwitch` -> ✅ SCSS hardened (score **9.0/10** — removed non-existent --uilib-transition-base fallback; track/thumb inline-size/block-size; thumb border-radius:50%→radius-full; element-level reduced-motion→host token-zero)
- `CodeSnippet` -> ✅ SCSS hardened (score **9.0/10** — --uilib-code-snippet-tab-transition + copy-btn-transition tokens; border-bottom→border-block-end on header+tab; width/height→inline-size/block-size on dot/copy-btn/copy-icon; min/max-width→logical; border-radius:50%→radius-full on dots; token-zero reduced-motion)
- `Galleria` -> ✅ SCSS hardened (score **8.9/10** — --uilib-galleria-transition + mount-animation tokens; replaced all --uilib-transition-base refs; nav-radius→radius-full; border-radius:50%→radius-full on 5 elements; top/bottom→inset-block-start/end; width/height→inline-size/block-size on 6 elements; 100vw/100vh→inline-size/block-size; element-list reduced-motion→host token-zero)
- `Avatar` -> ✅ SCSS+README hardened (score **9.0/10** — --uilib-avatar-radius:50%→radius-full; --uilib-avatar-mount-animation token replacing non-existent global token refs; width/height→inline-size/block-size on avatar+image; shape-circle radius fallback→radius-full; removed !important from reduced-motion; README CSS Custom Properties expanded to full standard table)

---

## Known Blockers / Watch Items

- Non-blocking Jest warning seen during a11y run:
  - `jest-haste-map: Haste module naming collision: ui-lib-custom`
  - between root `package.json` and `projects/ui-lib-custom/package.json`
- Demo build shows pre-existing SCSS budget warnings in `button` and `date-picker` -- not a blocker

---

## Recent Handoffs

Date: 2026-06-02
Changed (i18n entry-point hardening — parity test + type-safe keys + consumer guide):
NEW projects/ui-lib-custom/src/lib/i18n/i18n.bundles.spec.ts: runtime parity/integrity guard —
every locale (de/es/fr) must mirror UI_LIB_EN's key set exactly, no empty values, identical
{placeholder} tokens per key, dotted naming. 15 tests. (Complements scripts/check-i18n.mjs,
which lints for hardcoded strings — different concern.)
Type-safe keys: en.ts is now the canonical `as const satisfies Record<string,string>` source.
i18n.types.ts derives `UiLibTranslationKey = keyof typeof UI_LIB_EN`; UiLibTranslationBundle =
Record<UiLibTranslationKey,string> (complete — used to type de/es/fr so a MISSING key is a
compile error); NEW UiLibPartialBundle (Partial + arbitrary keys) types setBundle/extend.
translate(key: UiLibTranslationKey | (string & {})) → autocomplete on known keys, still
accepts custom keys. bundle signal retyped Record<string,string> (accurate: holds extend()'d
keys). All 5 new public types exported from i18n/index.ts.
Corrected my own false alarm: there is NO locale drift — all 4 bundles have an identical 323-key
set. The earlier "fr missing ~23 keys" was a `grep -c "': '"` artifact (it undercounts the 22
fr values that use double quotes for apostrophes, e.g. "l'option"). See DISCOVERIES.
Fixed misleading service JSDoc: documented a non-existent UI_LIB_TRANSLATIONS provider token →
now documents the real setBundle/extend API. Also fixed color-picker/README.md, which referenced
a phantom `provideUiLibI18n({locale})` → now uses the real inject(UiLibI18nService).extend() API + links the guide. (Confirmed no other provideUiLibI18n refs remain.)
NEW docs/guides/I18N_GUIDE.md: full consumer guide + auto-generated key catalogue (grouped, with
per-key placeholders). Generated by NEW scripts/generate-i18n-catalogue.mjs between
AUTO-GENERATED markers; prettier-aware so write/--check agree. npm scripts: docs:i18n,
docs:i18n:check. Linked from docs/README.md.
CI: ci.yml `lint` job gained an "i18n checks" step running `check:i18n` + `docs:i18n:check`.
check:i18n was RED (never gated) — paginator.component.html had a hardcoded placeholder="Page".
Fixed: NEW key `paginator.jump.placeholder` (en Page / de Seite / es Página / fr Page), template
now binds [attr.placeholder]. Bundle is 324 keys. Catalogue regenerated.
State: COMPLETE (including follow-ups: CI wiring, paginator i18n fix, color-picker README).
Verification:
npm run typecheck ✅ (all 5 tsconfigs) ; npm run build (AOT, all entry points) ✅
npx eslint i18n/ + paginator/ --max-warnings 0 ✅
jest i18n.bundles + entry-points + chip + code-snippet + paginator ✅
npm run check:i18n ✅ (now green) ; npm run docs:i18n:check ✅ (idempotent)
Next step: none required — feature complete. (If desired, run the full `npx jest` suite once more
before the PR; targeted suites + typecheck + build all green here.)

Date: 2026-06-02
Changed (a11y full-route sweep remediation — PRs #285/#286/#295, branch `a11y-sweep-completion`):
Took the Playwright `a11y-full-sweep` from 50 failing routes → 0 (111/111) and RE-GATED it:
accessibility.yml now runs the sweep in the gating step (alongside a11y.spec + a11y-interactions);
only overlay-mounting stays non-blocking (headless-layout clipping).
Library a11y fixes: code-snippet (scrollable tabindex — cleared ~27 routes), dock (role=img),
drawer/bottom-sheet/panel-menu (inert when hidden — aria-hidden-focus), progress-bar (determinate
default name), chip (role=option only when selectable; host aria-label gated on role),
input-mask (dropped invalid aria-valuetext, fixed placeholder=undefined), BUTTON (NEW `label`
input — 52 demo buttons rendered EMPTY without it), style-class (adds inert when hiding a panel +
skips targets that wrap their trigger), focus-trap (sentinels no longer aria-hidden), listbox
(disabled list stays keyboard-scrollable, tabindex=0).
Component default accessible names: date-picker/input-number/editor/order-list/autocomplete/
cascade-select/tree-select/input-mask now use `ariaLabel() || (ariaLabelledBy() ? null :
    i18n.translate('<comp>.input.label'))` — 8 new i18n keys × en/de/es/fr.
Demo markup: labelled example inputs/buttons/selects across ~14 routes.
Docs: DISCOVERIES.md +15 entries incl. the dialog NG0203 root-cause correction (1-E) that
supersedes the earlier "zoneless model() CD" misdiagnosis (1-A/5-A now carry correction banners);
CHANGELOG.md [Unreleased] updated; button README + reference doc regenerated for the `label` input.
State: COMPLETE — sweep green + re-gated.
Verification:
npx jest → 233 suites / 6216 tests ✅ ; npm run build (AOT) ✅
a11y-full-sweep 111/111 routes pass locally ✅ ; pre-push typecheck + bundlesize ✅ (pushed)
Next step: CI on PR #295 validates the gated sweep in the CI env (e2e job ~25 min). Remaining
backlog: Step 4 (shared mock-theme consolidation + a11y spec backfill) and the deferred big-ticket
coverage (theme-config 1004 lines, theme-editor, virtual-scroller scroll math).

Date: 2026-06-01
Changed (test-hardening pass — branch `test-hardening-suite`, PR #284):
CRITICAL BUGFIX dialog.component.ts: modal dialogs never opened in real apps. The
focus-trap effect called afterNextRender() WITHOUT an injector → inside an effect
callback there is no injection context → threw NG0203 → aborted the CD pass → the
@if (visible()) panel never rendered. (This is the true root cause of the prior
handoff's dialog test.fixme — it was NOT "zoneless model() CD propagation".) Fix:
pass { injector: this.injector }. Library-wide sweep confirmed dialog was the only
offender; every other overlay already passes the injector.
e2e/a11y-interactions.spec.ts: Dialog test un-fixme'd, rewritten to drive the real
trigger-click flow (verified in a real browser: open, focus trap, axe, Escape, focus return)
CI gating: accessibility.yml now runs the full e2e/ dir (was only a11y.spec.ts); ci.yml unit
job switched to test:coverage; jest.config.ts gained a coverageThreshold ratchet (83/69/86/83)
NEW specs (branch coverage): a11y/announce.directive.spec.ts (0→100% br),
a11y/live-announcer.spec.ts expanded (→85% br), panel-menu/panel-menu-sub.spec.ts (35→87%),
menubar/menubar-submenu.spec.ts (41→94%), theming/theme-scope.directive.spec.ts +
theming/with-theme-scope.spec.ts (both 0→100% st / 96% br)
State: Steps 1-2 done + Step 3 (a11y core + menu cluster + theme-scope) done. Remaining big-ticket
coverage deferred: theme-config.service.ts (1004 lines, 27% br), theme-editor.service.ts,
virtual-scroller (scroll math, hard in jsdom). Steps 4 (mock-theme consolidation + a11y backfill),
5 (de-flake sweep: 14 real-timer + 12 overlay specs), 6 (quality pass on toBeTruthy-only) not started.
Verification:
npx jest → 233 suites / 6211 tests pass ✅ (exit 0)
npx playwright test e2e/a11y-interactions.spec.ts -g Dialog → 1 passed ✅
pre-push typecheck + bundlesize ✅ (branch pushed)
Next step: decide between investing in the large theme-config/theme-editor/virtual-scroller specs
vs. moving to Step 4 (backfill a11y specs for code-snippet/theming) and Step 5 (de-flake sweep,
bounded + likely to surface real bugs like the dialog one).

<!-- older handoffs: see docs/implementation/AI_AGENT_CONTEXT_ARCHIVE.md -->

## This Week's Plan (week of 2026-05-25)

> Generated by Prompt 13 — Monday Planning.

### Backlog analysis

**§3.1 Top 15 — lowest-avg components (none ≥ 9.5 yet):**

| Rank | Component     | Cur avg | Why first                                         |
| ---- | ------------- | ------- | ------------------------------------------------- |
| 1    | Select        | 8.2     | Most-clicked form control in enterprise demos     |
| 3    | AutoComplete  | 8.2     | Combobox #2 enterprise form pattern               |
| 8    | CascadeSelect | 8.2     | Almost nobody else has it; visible differentiator |
| 9    | ColorPicker   | 8.2     | Common premium ask; visual polish lifts "Feel"    |

Next wave (Friday benchmark prep):

| Rank | Component | Cur avg |
| ---- | --------- | ------- |
| 14   | Knob      | 8.2     |
| 15   | Avatar    | 8.2     |
| 10   | Carousel  | 8.3     |
| 11   | Galleria  | 8.3     |

**Sprint A (Comp11):** 0 / ~100 components benchmarked — all show `—`.  
**Category 12 (I18n):** 0 / ~100 components scored — all show `—` (column added this cycle via Prompt 10).

### Week schedule

| Day    | Task                                                                                       | Output                                                                  |
| ------ | ------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------- |
| Mon    | Plan (this document). Pick 4 components: Select, AutoComplete, CascadeSelect, ColorPicker. | This plan committed                                                     |
| Tue    | Prompt 7 — 12-step upgrade on **Select** (target 9.5)                                      | ✅ Score 9.1, branch feat/select-9.5-upgrade                            |
| Wed    | Prompt 7 — 12-step upgrade on **AutoComplete** (target 9.5)                                | ✅ Score 8.9, PR #251, branch feat/autocomplete-9.5-upgrade             |
| Thu AM | Prompt 7 — 12-step upgrade on **CascadeSelect** (target 9.4)                               | ✅ Score 8.9, PR #252, branch feat/cascade-select-9.5-upgrade           |
| Thu PM | Prompt 7 — 12-step upgrade on **ColorPicker** (target 9.4)                                 | ✅ Score 8.9, PR #253, branch feat/color-picker-9.4-upgrade             |
| Fri AM | Prompt 1 — Sprint A benchmark backfill for **Knob, Avatar, Carousel, Galleria**            | ✅ 4 sections in COMPETITIVE_BENCHMARKS.md, PR #254, Comp 8→9 for all 4 |
| Fri PM | Prompt 14 — Friday wrap (inventory avg, handoff block, trim old handoffs)                  | ✅ Library avg 8.73/10 recorded, handoffs trimmed, archive updated      |

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
