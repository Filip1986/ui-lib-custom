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
- **Library-wide average:** **9.06 / 10** across 102 components (updated 2026-05-30; batch-11 raised Badge to 9.1 via Theme fix; running total: 9 components at 9.1+, Knob at 9.2, four at 9.5)
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
- `Drawer` -> ✅ SCSS+README hardened (score **8.9/10** — --uilib-drawer-close-transition token; right/left panel top/bottom/width/max-width→inset-block-*/inline-size; top/bottom panel →inset-block-start/end/block-size; header border-bottom/padding-bottom→block-end; close btn width/height/border-radius→inline-size/block-size/radius-full; token-zero reduced-motion)
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

Date: 2026-05-30
Changed (batch 11 — Badge→9.1):
  badge/badge.scss: removed both !important violations that broke the CSS cascade:
    (1) outline variant: moved rule AFTER color rules, changed
        `background-color: transparent !important` → `--uilib-badge-bg-resolved: transparent`
        (same specificity + later position wins, consumers can now override via tokens)
    (2) reduced-motion: `transition: none !important; animation: none !important` →
        `--uilib-badge-pulse-duration: 0ms; animation: none` (token-zero, no !important)
    (3) dot: width/height/min-width/min-height → inline-size/block-size/min-inline-size/
        min-block-size (logical CSS)
    (4) dot radius: `var(--uilib-badge-radius-dot, 50%)` →
        `var(--uilib-badge-radius-dot, var(--uilib-radius-full, 50%))` (radius token chain)
  docs/COMPONENT_SCORES.md: Badge Theme 8→9 (9.0→9.1)
State: COMPLETE — build verified; badge tests (25 tests) all pass ✅
Verification: ng build ui-lib-custom (0 errors, 0 warnings) ✅; jest badge (25/25) ✅
Next step: Remaining 8s: FloatLabel Feel=8, AutoFocus Feel=8 — hard to push without new
  features. Consider broader 9.1→9.2 ceiling push or new component work.

Date: 2026-05-30
Changed (batch 10 — Avatar/BottomSheet/Carousel/DataView/Timeline/MeterGroup→9.1; Knob→9.2):
  avatar/avatar.scss: added will-change: transform, opacity to .ui-lib-avatar (GPU-accelerates
    scale+fade mount animation)
  bottom-sheet/bottom-sheet.scss: added will-change: transform to panel (slide-up transition);
    will-change: opacity to backdrop (fade transition); bottom: 0 → inset-block-end: 0 (logical CSS)
  carousel/carousel.component.scss: added will-change: opacity to .uilib-carousel host (mount
    animation); inline-size: 100% replaces width: 100% (logical CSS)
  data-view/data-view.component.scss: added will-change: opacity to .ui-lib-data-view host
    (opacity-only mount animation)
  timeline/timeline.component.scss: added will-change: transform, opacity to .ui-lib-timeline
    host (translate+fade mount animation)
  meter-group/meter-group.scss: added will-change: opacity to host (mount animation); added
    will-change: width, height to __meter segment (width/height fill transition hint)
  knob/knob.component.scss: added will-change: transform, opacity to .ui-lib-knob (mount
    animation); width/height → inline-size/block-size on size variants and SVG element;
    border-radius: 50% → var(--uilib-radius-full, 50%) on focus ring
  knob/README.md: added full CSS Custom Properties section (13 token rows + dark/custom examples)
  docs/COMPONENT_SCORES.md: 7 components updated (6→9.1, Knob→9.2)
  AI_AGENT_CONTEXT.md: library average updated to 9.05
State: COMPLETE — build verified (0 errors, 0 warnings) ✅
Verification: ng build ui-lib-custom (0 errors, 0 warnings) ✅
Next step: Remaining 8s in scoring table — Badge Theme=8 (9.0→9.1); FloatLabel Feel=8 (9.0→9.1);
  AutoFocus Feel=8 (9.0→9.1). Then scan for any new ceiling push opportunities at 9.1→9.2.

Date: 2026-05-30
Changed (batch 9 — Drawer/ConfirmDialog/Galleria→9.0):
  drawer/drawer.scss: added will-change: transform to .ui-lib-drawer__panel (creates compositor
    layer ahead of slide-in animation; GPU-accelerates all 4 position variants)
  confirm-dialog/confirm-dialog.scss: added will-change: transform, opacity to
    .ui-lib-confirm-dialog__panel (GPU-accelerates keyframe enter/exit animation)
  galleria/galleria.scss: added will-change: transform, opacity to .ui-lib-galleria (GPU-accelerates
    the uilib-galleria-mount keyframe animation on initial render)
  docs/COMPONENT_SCORES.md: Drawer/ConfirmDialog/Galleria Perf 8→9 (all three to 9.0)
  AI_AGENT_CONTEXT.md: 47 components at 9.0 (average 9.03 unchanged)
State: COMPLETE — build verified (0 errors 0 warnings); awaiting commit
Verification: ng build ui-lib-custom (0 errors, 0 warnings) ✅
Next step: All 102 components are now ≥ 9.0 (3 remaining 8.9 components were Drawer/ConfirmDialog/
  Galleria — all now 9.0). No sub-9.0 components remain in main scoring tables. Pivot to ceiling
  push (9.0→9.1+) or audit SyntaxHighlighter/Bind/OrganizationChart stale queue entries.

Date: 2026-05-30
Changed (batch 8 — ScrollTop→9.0):
  scroll-top/scroll-top.ts: scroll listener now uses { passive: true } option (allows browser to
    optimistically scroll without waiting for JS) + rAF debounce (coalesces multiple scroll events
    per animation frame so checkScrollPosition is called at most once per rAF tick)
  docs/COMPONENT_SCORES.md: ScrollTop Perf 8→9 (9.0)
  AI_AGENT_CONTEXT.md: 44 components at 9.0 (average 9.03 unchanged)
State: COMPLETE — build verified (0 errors 0 warnings); awaiting commit
Verification: npx eslint projects/ui-lib-custom/src/lib/scroll-top/ --max-warnings 0 ✅
              ng build ui-lib-custom (0 errors, 0 warnings) ✅
Next step: Remaining 8.9 components (Drawer/ConfirmDialog/Galleria — all Perf=8) require overlay
  architecture changes; pivot to ceiling push on existing 9.0 components or audit new components

Date: 2026-05-30
Changed (batch 7 — Button/Input/ConfirmPopup/Ripple→9.0):
  ripple/ripple.ts: added rippleEasing InputSignal<string> input; wired to --uilib-ripple-easing
    CSS variable in spawnWave() — completes the inline-override API (all 3 CSS vars now have inputs)
  ripple/README.md: added rippleEasing to Inputs table + usage examples with combined overrides
  button/README.md: added CSS Custom Properties section (7 core tokens, focus ring, shadow, size
    padding, badge overlay) + Composability section (ButtonGroup, form submit pattern, CSS overrides)
  input/README.md: added Composability section (IconField, InputGroup, FormField, inline prefix/suffix,
    reactive forms with validation — 5 usage patterns with code)
  confirm-popup/README.md: added inject() pattern, constructor injection, multiple instances with key,
    common patterns (danger/low-friction/programmatic close/reactive state), CSS Custom Properties (8 rows)
  docs/COMPONENT_SCORES.md: Button Comp 8→9 (9.0), Input Comp 8→9 (9.0), ConfirmPopup DX 8→9 (9.0),
    Ripple API 8→9 (9.0) — 4 components raised
  AI_AGENT_CONTEXT.md: 43 components at 9.0 (average 9.03 unchanged)
State: COMPLETE — build verified (0 errors 0 warnings); awaiting commit
Verification: npx eslint projects/ui-lib-custom/src/lib/ripple/ --max-warnings 0 ✅
              ng build ui-lib-custom (0 errors, 0 warnings) ✅
Next step: Assess remaining 8.9 components (Drawer/ConfirmDialog/Galleria/ScrollTop — all Perf=8)
  for batch 8; or begin ceiling push on existing 9.0 components toward 9.1+

Date: 2026-05-30
Changed (batch 6 — Container/RadioButton/ToggleSwitch/CodeSnippet/Avatar→9.0; Galleria→8.9):
  layout/container.ts: physical margin-left/right→margin-inline; padding-left/right/top/bottom
    →padding-inline+padding-block; width→inline-size; max-width→max-inline-size
  layout/README.md: added CSS Custom Properties section for Container (7 token rows)
  radio-button/radio-button.scss: --uilib-radio-button-box-transition + icon-transition tokens;
    box/icon/native-input width/height→inline-size/block-size; border-radius:50%→radius-full;
    replaced broken transition-duration token with proper token-zero using new tokens
  toggle-switch/toggle-switch.scss: removed --uilib-transition-base fallback (non-existent);
    track width/height→inline-size/block-size; thumb width/height→logical+border-radius→radius-full;
    element-level reduced-motion→host token-zero --uilib-toggle-switch-transition-duration:0ms
  code-snippet/code-snippet.scss: --uilib-code-snippet-tab-transition + copy-btn-transition tokens;
    header border-bottom→border-block-end; tab border-bottom→border-block-end + border-block-end-color;
    dot/copy-btn/copy-icon width/height→inline-size/block-size; dot border-radius:50%→radius-full;
    tabs min-width/tab max-width→min/max-inline-size; token-zero reduced-motion
  galleria/galleria.scss: --uilib-galleria-transition + mount-animation tokens; removed nav-radius:50%
    token; replaced all --uilib-transition-base/duration-fast/easing-enter with component tokens;
    border-radius:50%→radius-full on 5 circle elements; bottom→inset-block-end on caption;
    top:0.5rem/0.75rem→inset-block-start on fullscreen+close btn; width/height→inline-size/block-size
    on nav+indicator-dot+icon+fullscreen+close+thumbnail-index (6 sets); element-list reduced-motion
    →host token-zero (mount-animation:none; transition:0ms)
  avatar/avatar.scss: --uilib-avatar-radius default 50%→radius-full; --uilib-avatar-mount-animation
    token replacing non-existent global refs; width/height→inline-size/block-size; shape-circle
    fallback→radius-full; removed !important from reduced-motion; token-zero mount-animation
  avatar/README.md: expanded CSS Custom Properties from abbreviated format to full standard table
    with defaults and descriptions (19 entries)
  docs/COMPONENT_SCORES.md: 5 components→9.0, Galleria stays 8.9
  AI_AGENT_CONTEXT.md: 39 components at 9.0 (average stays 9.03)
State: COMPLETE — build verified (0 errors 0 warnings); awaiting commit
Verification: ng build ui-lib-custom (0 errors) ✅
Next step: Commit batch 6; then audit remaining 8.9 components for batch 7

Date: 2026-05-30
Changed (batch 5 — FloatLabel/FormField/SpeedDial/OrderList/PickList/IconField/InputGroup/AutoFocus→9.0; Ripple/Drawer/ConfirmDialog/Input→8.9):
  float-label/float-label.scss: --uilib-float-label-transition token; top→inset-block-start on textarea
    label and all three active states; token-zero reduced-motion
  float-label/README.md: updated --uilib-float-label-transition default (removed invalid token fallback)
  form-field/form-field.scss: --uilib-form-field-error-animation token; token-zero reduced-motion
  form-field/README.md: added CSS Custom Properties section (1 entry)
  speed-dial/speed-dial.component.scss: collapsed 6-selector reduced-motion to single host token-zero
  speed-dial/README.md: added CSS Custom Properties section (15 entries)
  order-list/order-list.component.scss: logical CSS pass (width/height→inline-size/block-size; border-bottom
    →border-block-end; top/bottom/height on drop indicators→inset-block-*/block-size); token-zero reduced-motion
  pick-list/pick-list.component.scss: same logical CSS pass + transfer-btn logical sizing; token-zero
    reduced-motion
  icon-field/README.md: added CSS Custom Properties section (7 entries)
  input-group/README.md: added CSS Custom Properties section (1 entry)
  auto-focus/README.md: added CSS Custom Properties section (directive-only — none)
  ripple/ripple.scss: border-radius:50%→var(--uilib-radius-full,9999px); token-zero --uilib-ripple-duration;
    defense-in-depth display:none on wave in reduced-motion
  drawer/drawer.scss: --uilib-drawer-close-transition token; all panel positioning→logical inset-block-*/
    inline-size; header border-bottom/padding-bottom→border-block-end/padding-block-end; close btn logical
    sizing + border-radius→radius-full; token-zero reduced-motion
  drawer/README.md: added --uilib-drawer-close-transition row to CSS Custom Properties table
  confirm-dialog/confirm-dialog.scss: removed non-existent --uilib-transition-duration-fast fallback;
    material radius 999px→var(--uilib-radius-full,9999px); token-zero interactive-transition-duration
  input/input.scss: --uilib-input-transition + --uilib-input-label-transition tokens; raw multi-property
    transitions routed through tokens; replaced broken transition-duration-only reduced-motion with token-zero
  input/README.md: added CSS Custom Properties section (11 entries)
  docs/COMPONENT_SCORES.md: all 12 components updated (8→9.0, 4→8.9)
  AI_AGENT_CONTEXT.md: library average updated to 9.03 (34 components at 9.0 across 5 batches)
State: COMPLETE — build verified; awaiting commit
Verification: ng build ui-lib-custom (0 errors, 0 warnings) ✅
Next step: Commit batch 5; then audit remaining 8.8 scores for batch 6 targets

<!-- older handoffs: see docs/implementation/AI_AGENT_CONTEXT_ARCHIVE.md -->

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
