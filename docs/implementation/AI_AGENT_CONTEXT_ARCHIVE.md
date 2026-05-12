# AI Agent Context Archive

This file stores older `## Last Session` handoff notes migrated out of `AI_AGENT_CONTEXT.md`.

---

Date: 2026-05-11 [BottomSheet component — accessibility hardening COMPLETE (#76)]
Changed:
  - projects/ui-lib-custom/src/lib/bottom-sheet/bottom-sheet.ts
      • Added module-level `nextBottomSheetId` counter; exposed `instanceId` and `titleId` as unique per-instance strings
      • Imported `isPlatformBrowser` from `@angular/common` and `PLATFORM_ID` for SSR safety
      • Imported `FocusTrap` from `ui-lib-custom/core`; replaced `panel?.focus()` with full focus trap lifecycle (activate on open, deactivate on close with automatic focus restoration)
      • Added `private focusTrap: FocusTrap | null = null` field
      • Added `activateFocusTrap()` and `deactivateFocusTrap()` private methods
      • Wired `deactivateFocusTrap()` into `ngOnDestroy` to prevent memory leaks
  - projects/ui-lib-custom/src/lib/bottom-sheet/bottom-sheet.html
      • Switched `[attr.aria-label]` → `[attr.aria-labelledby]` referencing `titleId`
      • Added `[id]="titleId"` to the title span for the ARIA association
      • Removed redundant `[attr.aria-hidden]` from the panel (host-level `aria-hidden` is sufficient)
      • Replaced `<span class="pi pi-times">` close icon with an inline SVG (`aria-hidden="true"`, `focusable="false"`)
  - projects/ui-lib-custom/src/lib/bottom-sheet/bottom-sheet.scss
      • Added `@media (prefers-reduced-motion: reduce)` block disabling all transitions on panel, backdrop, and close button
      • Added `.ui-lib-bottom-sheet__close-icon` display rule for the SVG
  - projects/ui-lib-custom/src/lib/bottom-sheet/bottom-sheet.a11y.spec.ts (CREATED — 24 tests)
      • axe-core checks (3), ARIA attribute assertions (11), focus management (4), keyboard interaction (2), unique ID (2)
  - projects/ui-lib-custom/src/lib/bottom-sheet/README.md
      • Added ARIA attributes table, keyboard interactions table, expanded CSS custom properties table, and updated accessibility section
  - docs/COMPONENT_SCORES.md
      • BottomSheet #76: ⏳ Queued → ✅ Done; score row populated (API 8, A11y 9, Perf 8, Comp 8, Theme 9, DX 9, Docs 9, Polish 8, Angular 9, Feel 8 — avg 8.5)
State: BottomSheet hardening complete. Full focus trap with restoration, aria-labelledby with unique per-instance IDs, reduced-motion support, SVG close icon, and 24-test a11y regression suite are in place.
Verification:
  node_modules/.bin/eslint projects/ui-lib-custom/src/lib/bottom-sheet/ --max-warnings 0 (PASS)
  node_modules/.bin/jest --testPathPatterns=bottom-sheet --no-coverage (50/50 PASS — 26 unit + 24 a11y)
  node_modules/.bin/ng build ui-lib-custom (PASS, zero errors)
  node_modules/.bin/jest --testPathPatterns=entry-points --no-coverage (97/97 PASS)
Terminal notes: Fresh clone required `npm install` before validation. `isPlatformBrowser` must be imported from `@angular/common`, not `@angular/core`, to satisfy @typescript-eslint/no-unsafe-call.
Next step: TreeTable (#33) hardening — Tier 4 Data Display treegrid pass.

---

Date: 2026-05-11 [Card component — accessibility hardening COMPLETE (#51)]
Changed:
  - projects/ui-lib-custom/src/lib/card/card.ts
      • Added module-scope `let nextCardId: number = 0` for unique instance IDs
      • Added `public readonly titleId: string` initialized in constructor to `ui-lib-card-title-${nextCardId++}`
  - projects/ui-lib-custom/src/lib/card/card.html
      • Added `[attr.aria-labelledby]` — links card container to its title when not hoverable and header is visible
      • Added `[id]="titleId"` on the `.ui-lib-card__title` div for the labelledby target
  - projects/ui-lib-custom/src/lib/card/card.scss
      • Added `:focus-visible` ring on `&--hoverable` (outline + box-shadow glow using `--uilib-color-primary` / `--uilib-focus-ring`)
      • Applied the `card-dark-theme` mixin via `[data-theme='dark']` selectors (both host-scoped and parent-scoped)
      • Added `@media (prefers-reduced-motion: reduce)` — disables `transition` and removes `translateY` transforms
  - projects/ui-lib-custom/src/lib/card/card.a11y.spec.ts (EXPANDED — 24 tests, up from 1)
      • Added ARIA structure (role, tabindex, aria-label, aria-labelledby, title ID format)
      • Added keyboard interaction (Enter/Space trigger click; non-hoverable doesn't)
      • Added closable card accessible label coverage
      • Added unique IDs, multi-instance ID uniqueness, and dynamic label (signal) update
      • Added axe checks for basic, hoverable, closable, and multi-variant states
  - projects/ui-lib-custom/src/lib/card/README.md
      • Added ARIA attributes table, keyboard interaction table, CSS custom properties table
      • Added full Accessibility section with examples, guidelines, and reduced-motion note
  - docs/COMPONENT_SCORES.md
      • Card: ⏳ Queued → ✅ Done; score row added to Layout table (avg 9.0/10)
State: Card hardening complete. Focus ring, dark mode, reduced motion, unique IDs, aria-labelledby, and 24 a11y tests all in place.
Verification:
  node_modules/.bin/eslint projects/ui-lib-custom/src/lib/card/ --max-warnings 0 (PASS)
  node_modules/.bin/jest --testPathPatterns=card --no-coverage (34/34 PASS — 10 unit + 24 a11y)
  node_modules/.bin/ng build ui-lib-custom (PASS, zero errors)
  node_modules/.bin/jest --testPathPatterns=entry-points --no-coverage (97/97 PASS)
Terminal notes: Fresh clone required `npm install` before validation tools were available.
Next step: Badge (#52) hardening — Tier 6, positioning variants, `aria-label` passthrough.

---

Date: 2026-05-11 [Chart component — accessibility hardening COMPLETE (#72)]
Changed:
  - projects/ui-lib-custom/src/lib/chart/chart.component.ts
      • Added module-level `nextChartId: number` for unique instance IDs
      • Added `chartId`, `tableId`, `datasetRows`, and `tableLabels` computed properties
      • Added `showDataTable` input (default `true`) to control the visually-hidden data table
      • Added `prefers-reduced-motion` detection → sets `animation: false` in Chart.js options when preferred
      • Added `formatDataValue` helper for multi-type data point normalisation
  - projects/ui-lib-custom/src/lib/chart/chart.component.html
      • Added `aria-describedby` on canvas (links to the data table when `showDataTable` is true)
      • Added visually-hidden `<table>` with `<caption>`, `<thead>` (label columns + "Dataset" header), and `<tbody>` (one row per dataset)
  - projects/ui-lib-custom/src/lib/chart/chart.component.scss
      • Added `.ui-lib-chart__sr-table` visually-hidden class
      • Added `@media (prefers-reduced-motion: reduce)` override for canvas transitions/animations
  - projects/ui-lib-custom/src/lib/chart/chart.types.ts
      • Added `ChartDatasetRow` and `ChartAccessibleDataset` interfaces
  - projects/ui-lib-custom/src/lib/chart/chart.a11y.spec.ts (CREATED — 21 tests)
      • ARIA structure, data table rendering, unique IDs, reduced-motion, and axe-core coverage
  - projects/ui-lib-custom/src/lib/chart/README.md
      • Added ARIA table, keyboard table, CSS custom properties table, and accessibility section
  - docs/COMPONENT_SCORES.md
      • Chart: ⏳ Queued → ✅ Done; score row populated (avg 8.9)
State: Chart hardening complete. Visually-hidden data table, aria-describedby linkage, unique IDs, reduced-motion
  support, and 21 a11y regression tests are in place.
Verification:
  node_modules/.bin/eslint projects/ui-lib-custom/src/lib/chart/ --max-warnings 0 (PASS)
  node_modules/.bin/jest --testPathPatterns=chart --no-coverage (96/96 PASS — 75 unit + 21 a11y)
  node_modules/.bin/ng build ui-lib-custom (PASS, zero errors)
  node_modules/.bin/jest --testPathPatterns=entry-points --no-coverage (97/97 PASS)
Terminal notes: `npm install` required in fresh clone before tools are available.
Next step: TreeTable (#33) hardening — start Tier 4 Data Display treegrid pass.

---

Date: 2026-05-11 [Table component — accessibility hardening COMPLETE (#32)]
Changed:
  - projects/ui-lib-custom/src/lib/table/table.component.ts
      • Replaced the old component-only ID with module-level `nextTableId: number`, `tableId`, and `captionId`
      • Added dynamic `tableRole` (`grid` for sortable/selectable tables, `table` otherwise)
      • Added caption-based `aria-labelledby`, `aria-multiselectable`, paginated `aria-rowcount`, and roving grid focus helpers
      • Added keyboard cell navigation with Arrow/Home/End handling for interactive grid mode
  - projects/ui-lib-custom/src/lib/table/table.component.html
      • Added rowgroup/row/columnheader/gridcell semantics, `aria-rowindex` / `aria-colindex`, row selection state, and empty-state live region
      • Wired roving tabindex attributes/data hooks to auto-generated header and body cells
  - projects/ui-lib-custom/src/lib/table/table.component.scss
      • Added focus-visible styling for focusable cells and a reduced-motion override for row/filter/expander transitions
  - projects/ui-lib-custom/src/lib/table/table.component.spec.ts
      • Updated sortable-header tabindex expectations to match roving tabindex behavior
  - projects/ui-lib-custom/src/lib/table/table.a11y.spec.ts (CREATED — 33 tests)
      • Added ARIA structure, accessible-name, sorting, selection, keyboard navigation, pagination, disabled-state, empty-state, unique-id, and axe coverage
  - projects/ui-lib-custom/src/lib/table/README.md
      • Added column definition shape, selection modes, keyboard navigation, pagination notes, and CSS custom properties documentation
  - docs/COMPONENT_SCORES.md
      • Table: ⏳ Queued → ✅ Done; score row populated (avg 8.6)
State: Table hardening complete. Dynamic grid/table semantics, caption wiring, roving grid keyboard navigation,
  reduced-motion support, and dedicated a11y regression coverage are in place.
Verification:
  node_modules/.bin/eslint projects/ui-lib-custom/src/lib/table/ --max-warnings 0 (PASS)
  node_modules/.bin/jest --testPathPatterns=table --no-coverage (125/125 PASS)
  node_modules/.bin/ng build ui-lib-custom (PASS, zero errors)
  node_modules/.bin/jest --testPathPatterns=entry-points --no-coverage (97/97 PASS)
Terminal notes: Fresh clone required `npm install` before validation; GitHub Actions CI run 25663127263 is green on attempt 2 (lint/build/typecheck/test/storybook).
Next step: TreeTable (#33) hardening — start Tier 4 Data Display treegrid pass.

---

Date: 2026-05-11 [Stepper component — accessibility hardening COMPLETE (#19)]
Changed:
  - projects/ui-lib-custom/src/lib/stepper/stepper.ts
      • Replaced local component id field with module-level `nextStepperId` + public `stepperId`
      • Added `ariaLabel` input (`'Progress'` default), exported `STEPPER_DEFAULT_ARIA_LABEL`
      • Added computed `stepItems` metadata for active/completed/disabled/error state
      • Added `getStepAriaLabel()` for rich screen-reader labels and `isStepDisabled()`
  - projects/ui-lib-custom/src/lib/stepper/stepper.html
      • Kept tablist pattern, added rich `aria-label` on each step tab, `aria-disabled` for locked steps
      • Rendered all tabpanel shells with stable ids so tabs always reference valid panels
      • Replaced DOM separator elements with CSS-only connectors to satisfy axe `aria-required-children`
  - projects/ui-lib-custom/src/lib/stepper/stepper.scss
      • Added error-state tokens/styles, connector pseudo-elements, pointer-events lockout, stronger reduced-motion handling
  - projects/ui-lib-custom/src/lib/stepper/stepper-panel.ts
      • Added `error` input for invalid step state
  - projects/ui-lib-custom/src/lib/stepper/stepper.types.ts
      • Added exported `StepperItem` accessibility metadata interface
  - projects/ui-lib-custom/src/lib/stepper/index.ts
      • Re-exported `StepperItem`
  - projects/ui-lib-custom/src/lib/stepper/stepper.a11y.spec.ts (CREATED — 22 tests)
      • Added role/aria-label/state coverage, linear lockout assertions, vertical semantics, multi-instance ids, axe checks
  - projects/ui-lib-custom/src/lib/stepper/stepper.spec.ts
      • Removed separator DOM assertion after connector moved to CSS pseudo-elements
  - projects/ui-lib-custom/src/lib/stepper/README.md
      • Documented ARIA pattern, `ariaLabel`, `error`, keyboard support, screen-reader label format, CSS vars
  - docs/COMPONENT_SCORES.md
      • Stepper queue entry: ⏳ Queued → ✅ Done
      • Stepper score row: 9/9/9/9/9/9/9/9/9/9 avg 9.0 🟢
State: Stepper hardening complete. Rich step announcements, locked linear mode semantics, error state support, and dedicated a11y coverage are all in place.
Verification:
  node_modules/.bin/eslint projects/ui-lib-custom/src/lib/stepper/ --max-warnings 0 (EXIT 0)
  node_modules/.bin/jest --testPathPatterns=stepper --no-coverage (61/61 PASS)
  node_modules/.bin/ng build ui-lib-custom (PASS)
  node_modules/.bin/jest --testPathPatterns=entry-points --no-coverage (97/97 PASS)
Terminal notes: `aria-required-children` axe failure was resolved by moving connector lines from DOM separator elements to CSS pseudo-elements inside the step wrappers.
Next step: Table (#32) hardening — role=grid, aria-sort, row selection, and pagination announcements.

---

Date: 2026-05-11 [Tabs component — 6-phase Hardening COMPLETE (#17)]
Changed:
  - projects/ui-lib-custom/src/lib/tabs/tabs.ts
      • Switched to module-scoped instance IDs (`tabsId`) and kept public `tabId()` / `panelId()` helpers stable per instance
      • Added `activation` input (`'auto' | 'manual'`) and `ariaLabel` input for tablist labelling
      • Hardened keyboard behavior: wrap-around arrow navigation, Home/End support, manual activation support, disabled-tab skipping, and Tab-to-panel focus handoff
      • Added reduced-motion-aware scroll behavior for focus and scroll buttons
  - projects/ui-lib-custom/src/lib/tabs/tabs.html
      • Bound `aria-label` on the tablist
      • Made `aria-selected` and `aria-disabled` explicit string semantics on tab buttons
  - projects/ui-lib-custom/src/lib/tabs/tabs.scss
      • Removed CSS-driven inactive panel hiding in favor of the existing `[hidden]` behavior
      • Added `prefers-reduced-motion` overrides for transitions and scrolling
  - projects/ui-lib-custom/src/lib/tabs/tabs.types.ts
      • Added `TabsActivation` public type
  - projects/ui-lib-custom/src/lib/tabs/index.ts
      • Re-exported `TabsActivation`
  - projects/ui-lib-custom/src/lib/tabs/tabs.a11y.spec.ts
      • Expanded coverage for ARIA wiring, unique IDs across instances, auto/manual activation, vertical orientation, Home/End, disabled-tab skipping, Tab-to-panel focus flow, and axe-core
  - projects/ui-lib-custom/src/lib/tabs/README.md
      • Documented activation mode, aria-label, keyboard support, disabled handling, and key CSS custom properties
  - docs/COMPONENT_SCORES.md
      • Tabs: ⏳ Queued → ✅ Done
State: Tabs hardening complete. IDs are unique across instances, keyboard interaction supports auto/manual activation, inactive panels rely on `[hidden]`, and dedicated accessibility coverage is in place.
Verification:
  node_modules/.bin/eslint projects/ui-lib-custom/src/lib/tabs/ --max-warnings 0 (PASS)
  node_modules/.bin/jest --testPathPatterns=tabs --no-coverage (41/41 PASS)
  node_modules/.bin/ng build ui-lib-custom (PASS)
  node_modules/.bin/jest --testPathPatterns=entry-points --no-coverage (97/97 PASS)
Terminal notes: Fresh clone required `npm install` before lint/test/build commands were available.
Next step: Accordion (#18).

---

Date: 2026-05-11 [Rating component — accessibility hardening COMPLETE (#30)]
Changed:
  - projects/ui-lib-custom/src/lib/rating/rating.ts
      • Changed host `role: 'radiogroup'` (static) to `'[attr.role]': 'hostRole()'` (dynamic)
      • Added `hostRole` computed signal: returns `'img'` when `readonly()`, `'radiogroup'` otherwise
      • Added `hostAriaLabelValue` computed signal: descriptive "Rating: N out of M stars" in read-only mode, consumer `ariaLabel` otherwise
      • Updated `[attr.aria-label]` and `[attr.aria-labelledby]` host bindings to use new computed values
      • Fixed `getStarAriaLabel` to return "N star" / "N stars" format (was "N of M")
      • Fixed `getStarTabIndex` to return -1 when `readonly()` (was only checking `isDisabled()`)
  - projects/ui-lib-custom/src/lib/rating/rating.html
      • Wrapped entire template in `@if (!readonly()) { ... } @else { ... }`
      • Interactive branch: cancel button + stars with `role="radio"`, ARIA attrs, event handlers
      • Read-only branch: decorative-only stars with `aria-hidden="true"`, no interactive attrs
  - projects/ui-lib-custom/src/lib/rating/rating.scss
      • Added `@media (prefers-reduced-motion: reduce)` block: `transition: none` on star/cancel + `transform: none` on hover
  - projects/ui-lib-custom/src/lib/rating/rating.spec.ts
      • Updated `getStarAriaLabel` test to match new "N star(s)" format (was "N of M")
  - projects/ui-lib-custom/src/lib/rating/rating.a11y.spec.ts (CREATED — 22 tests)
      • Interactive: radiogroup role, aria-label, star role=radio, aria-checked, "N star(s)" aria-labels, star-icon aria-hidden
      • Roving tabindex: first star tab=0 when no value; selected star tab=0, others tab=-1
      • Keyboard: ArrowRight increments, ArrowLeft decrements, clamp at min/max
      • Read-only: host role=img, descriptive aria-label, no interactive stars, all stars aria-hidden, cancel hidden
      • axe-core: default state, value selected, read-only, disabled
  - projects/ui-lib-custom/src/lib/rating/README.md
      • Added ARIA Pattern A documentation, read-only mode behavior, pattern rationale, keyboard nav table, CVA section
  - docs/COMPONENT_SCORES.md
      • Rating: ⏳ Queued → ✅ Done
State: Rating hardening complete. Dynamic role (radiogroup/img), read-only ARIA branch, reduced-motion SCSS, 22 new a11y tests.
Verification:
  node_modules/.bin/eslint projects/ui-lib-custom/src/lib/rating/ --max-warnings 0 (EXIT 0)
  node_modules/.bin/jest --testPathPatterns=rating --no-coverage (75/75 PASS)
  node_modules/.bin/ng build ui-lib-custom (PASS, zero errors)
  node_modules/.bin/jest --testPathPatterns=entry-points --no-coverage (97/97 PASS)
Terminal notes: node_modules/.bin/ prefix required for all CLI tools; npm install required first in fresh clone.
Next step: Table (#32) hardening — start Tier 4 Data Display.

---

Date: 2026-05-11 [RadioButton component — 6-phase Hardening COMPLETE (#23)]
Changed:
  - projects/ui-lib-custom/src/lib/radio-button/radio-button.ts
      • Added `onNativeKeydown(event: KeyboardEvent)`: ArrowDown/Right moves to next
        non-disabled sibling in the group (by name attribute), wrapping; ArrowUp/Left moves
        to previous; both call `.focus()` + `.click()` on the target native input
      • CSS.escape() with jsdom-safe fallback for name attribute selector safety
  - projects/ui-lib-custom/src/lib/radio-button/radio-button.html
      • Added `[attr.aria-disabled]="isDisabled() ? 'true' : null"` to native input
      • Added `[attr.aria-required]="required() ? 'true' : null"` to native input
      • Added `(keydown)="onNativeKeydown($event)"` binding to native input
  - projects/ui-lib-custom/src/lib/radio-button/radio-button.scss
      • Added `@media (prefers-reduced-motion: reduce)` block: `transition: none` on __box and __icon
  - projects/ui-lib-custom/src/lib/radio-button/radio-button.a11y.spec.ts (CREATED — 24 tests)
      • ID/label association: unique IDs, label for/id, aria-labelledby→label element, unique label IDs
      • Group ARIA: role=radiogroup, aria-labelledby→group label, aria-required reflects groupRequired
      • aria-required/aria-disabled on individual native inputs
      • Tabindex: enabled radios have tabindex=0 (browsers implement roving natively), disabled→-1
      • Keyboard navigation: ArrowDown/Right/Up/Left select + move focus; wrap from last→first,
        first→last; disabled radio skipped in navigation
      • axe-core: no selection, one selected, disabled item, group aria-required
  - projects/ui-lib-custom/src/lib/radio-button/README.md
      • Added Keyboard Navigation table (Tab/Shift+Tab/Arrow/Space)
      • Added Accessibility section with two group labeling patterns (fieldset/legend + role=radiogroup)
      • Added ReactiveFormsModule usage example and disabled option example
  - docs/COMPONENT_SCORES.md
      • RadioButton: ⏳ Queued → ✅ Done
State: RadioButton fully hardened. 64 tests pass (40 unit + 24 a11y). Build clean.
Verification:
  npx eslint projects/ui-lib-custom/src/lib/radio-button/ --max-warnings 0 (EXIT 0)
  node_modules/.bin/jest --testPathPatterns=radio-button --no-coverage (64/64 PASS)
  node_modules/.bin/ng build ui-lib-custom (PASS, zero errors)
  node_modules/.bin/jest --testPathPatterns=entry-points --no-coverage (97/97 PASS)
Terminal notes: node_modules/.bin/ prefix required for jest/ng; npx works for eslint after npm install.
Next step: Rating hardening (Tier 3, #30).

---
Date: 2026-05-11 [Knob component — accessibility hardening COMPLETE (#31)]
Changed:
  - projects/ui-lib-custom/src/lib/knob/knob.component.ts
      • Moved slider semantics to host (`role=slider`, `aria-valuenow/min/max/valuetext`, keyboard + pointer handlers)
      • Added `getValueText()` helper for `aria-valuetext`
      • Added requestAnimationFrame-throttled drag updates and RAF cleanup on pointer-up/destroy
  - projects/ui-lib-custom/src/lib/knob/knob.component.html
      • Marked SVG as decorative (`aria-hidden="true"`, `focusable="false"`)
      • Removed interactive ARIA/event bindings from SVG
  - projects/ui-lib-custom/src/lib/knob/knob.component.scss
      • Added `prefers-reduced-motion: reduce` block (`--uilib-knob-transition-duration: 0ms`)
  - projects/ui-lib-custom/src/lib/knob/knob.component.spec.ts
      • Updated ARIA assertions to target knob host element semantics
  - projects/ui-lib-custom/src/lib/knob/knob.a11y.spec.ts (CREATED — 21 tests)
      • Added role/ARIA assertions, keyboard equivalence coverage, disabled behavior, decorative SVG checks
      • Added axe checks for default, min, max, and disabled states
  - projects/ui-lib-custom/src/lib/knob/README.md
      • Added accessibility behavior and keyboard support table
  - docs/COMPONENT_SCORES.md
      • Knob queue status set to ✅ Done; score row populated (avg 8.2)
State: Knob hardening complete with host-level slider semantics, keyboard parity for drag operations,
  decorative SVG semantics, reduced-motion support, and dedicated a11y test coverage.
Verification:
  node_modules/.bin/eslint projects/ui-lib-custom/src/lib/knob/ --max-warnings 0 (PASS)
  node_modules/.bin/jest --testPathPatterns=knob --no-coverage (56/56 PASS)
  node_modules/.bin/ng build ui-lib-custom (PASS)
  node_modules/.bin/jest --testPathPatterns=entry-points --no-coverage (97/97 PASS)
Terminal notes: Installed dependencies via `npm install` in fresh clone before running validation commands.
Next step: Table (#32) hardening — start Tier 4 Data Display.

---

Date: 2026-05-10 [Toast component — 6-phase hardening COMPLETE]
Changed:
  - projects/ui-lib-custom/src/lib/toast/toast.ts
      • CRITICAL FIX: Removed aria-live="polite" and aria-atomic="false" from container host binding
        — role="region" is a structural landmark, not a live region; added explanatory comment
      • Updated dismiss() JSDoc to document animation delay and no-op safety
  - projects/ui-lib-custom/src/lib/toast/toast.html
      • CRITICAL FIX: [attr.role] now conditional — role="alert" for error severity only, role="status" for success/info/warn
      • CRITICAL FIX: Removed [attr.aria-live] binding — redundant/ineffective (role already implies live region urgency)
      • MODERATE FIX: Close button aria-label updated to "Dismiss: {summary}" — falls back to detail then "notification"
  - projects/ui-lib-custom/src/lib/toast/toast.scss
      • MODERATE FIX: Added @media (prefers-reduced-motion: reduce) — sets --uilib-toast-animation-duration: 0ms
  - projects/ui-lib-custom/src/lib/toast/toast.spec.ts
      • Updated 4 ARIA tests to reflect corrected role/aria-live behaviour
  - projects/ui-lib-custom/src/lib/toast/toast.a11y.spec.ts (CREATED — 31 a11y tests)
  - projects/ui-lib-custom/src/lib/toast/README.md
      • Added ToastMessage interface table, Multiple Containers Pattern, Lifecycle, CSS vars, Accessibility section
  - docs/COMPONENT_SCORES.md
      • Toast queue entry: ⏳ Queued → ✅ Done (Tier 1 #10)
      • Toast score row: 9/10/9/9/9/9/9/9/9/9 avg 9.1 🟢
  - AI_AGENT_CONTEXT.md (this file — status updated)
State: Toast component fully evolved through all 6 phases. Score 9.1/10.
Verification:
  node_modules/.bin/eslint projects/ui-lib-custom/src/lib/toast/ --max-warnings 0 (CLEAN, EXIT:0)
  node_modules/.bin/jest --testPathPatterns=toast --no-coverage (60/60 PASS — 29 unit + 31 a11y)
  node_modules/.bin/jest --testPathPatterns=entry-points --no-coverage (97/97 PASS)
  node_modules/.bin/ng build ui-lib-custom — Built, zero errors, zero warnings
Terminal notes: Run ESLint from bash.exe (PowerShell returns exit 1 even on clean runs).
Next step: Menubar hardening (Tier 2, #11).

Date: 2026-05-10 [Popover component — 6-phase hardening COMPLETE]
Changed:
  - projects/ui-lib-custom/src/lib/popover/popover.ts
      • Added module-level `let nextPopoverId: number = 0` counter
      • Added `public readonly panelId: string` and `public readonly titleId: string`
      • Added `private readonly document: Document = inject(DOCUMENT)` (SSR-safe)
      • Added `private previousFocusEl: HTMLElement | null = null` field
      • Updated `show()`: captures `document.activeElement` into `previousFocusEl`
      • Updated visibility effect false branch: restores `previousFocusEl?.focus()` on close
  - projects/ui-lib-custom/src/lib/popover/popover.html
      • Added `[id]="panelId"`, `[attr.aria-labelledby]`, `[attr.aria-label]="'Popover'"` fallback
      • Added `aria-hidden="true"` to overlay div
      • Replaced `&times;` close button with inline SVG
  - projects/ui-lib-custom/src/lib/popover/popover.scss
      • Removed glyph-only CSS from close button
  - projects/ui-lib-custom/src/lib/popover/popover.a11y.spec.ts (CREATED — 33 tests)
  - projects/ui-lib-custom/src/lib/popover/README.md (fully updated)
  - docs/COMPONENT_SCORES.md — Popover: ✅ Done, score 9.0 🟢
State: Complete. Score 9.0/10.
Verification: ESLint clean, 63/63 tests pass, build zero errors.
Next step: Tooltip hardening.

Date: 2026-05-10 [ConfirmPopup component — 6-phase hardening COMPLETE]
Changed:
  - projects/ui-lib-custom/src/lib/confirm-popup/confirm-popup.ts
      • Removed `private static nextId: number = 0` class field
      • Added module-level `let nextConfirmPopupId: number = 0` counter
      • Updated `generateId()` to use `nextConfirmPopupId` instead of `ConfirmPopup.nextId`
      • Added `import { DOCUMENT } from '@angular/common'`
      • Added `private readonly document: Document = inject(DOCUMENT)`
      • Added `private previousFocusEl: HTMLElement | null = null` field
      • Visibility effect: captures `document.activeElement` before open; restores on close
      • Added `panelAriaLabel: Signal<string>` computed signal (accessible name for alertdialog)
  - projects/ui-lib-custom/src/lib/confirm-popup/confirm-popup.html
      • Added `[attr.aria-label]="panelAriaLabel()"` to the panel div
      • Added `aria-hidden="true"` to the overlay div
  - projects/ui-lib-custom/src/lib/confirm-popup/confirm-popup.a11y.spec.ts (CREATED — 30 a11y tests)
  - projects/ui-lib-custom/src/lib/confirm-popup/README.md — full ARIA table + keyboard nav table
  - docs/COMPONENT_SCORES.md — ConfirmPopup row: 9/9/9/9/9/8/9/9/9/9 avg 8.9 🟢 (Tier 1 #7 ✅ Done)
State: ConfirmPopup fully hardened — 6 phases complete. Score 8.9/10.
Verification:
  eslint projects/ui-lib-custom/src/lib/confirm-popup/ --max-warnings 0 (CLEAN)
  jest --testPathPatterns=confirm-popup --no-coverage (66/66 PASS)
  ng build ui-lib-custom — zero errors, zero warnings
Next step: Popover hardening (Tier 1, #8).

---

Changed:
  - projects/ui-lib-custom/src/lib/confirm-dialog/confirm-dialog.ts
      • Removed `private static nextId: number = 0` class field (static lint risk)
      • Added module-level `let nextConfirmDialogId: number = 0` counter (consistent with Drawer/DynamicDialog pattern)
      • Updated `generateId()` to use `nextConfirmDialogId` instead of `ConfirmDialog.nextId`
      • `private previousFocusEl: HTMLElement | null = null`; visibility effect captures document.activeElement on open, restores on close; ngOnDestroy clears field
  - projects/ui-lib-custom/src/lib/confirm-dialog/confirm-dialog.scss
      • Added `transition` and `:focus-visible` ring to close button
      • `aria-hidden="true"` on backdrop div
  - projects/ui-lib-custom/src/lib/confirm-dialog/README.md — full ARIA table + keyboard nav
  - projects/ui-lib-custom/src/lib/confirm-dialog/confirm-dialog.a11y.spec.ts — 28 a11y tests
  - docs/COMPONENT_SCORES.md — ConfirmDialog row: 9/9/8/8/8/8/8/8/9/8 avg 8.3 🟢 (Tier 1 #6 ✅ Done)
State: ConfirmDialog fully hardened — 6 phases complete. Score 8.3/10.
Verification:
  node_modules\.bin\eslint projects/ui-lib-custom/src/lib/confirm-dialog/ --max-warnings 0 (CLEAN)
  node_modules\.bin\jest --testPathPatterns=confirm-dialog --no-coverage (59/59 PASS)
  node_modules\.bin\ng build ui-lib-custom — zero errors, zero warnings
Terminal notes: Module-level `let` counter requires explicit `: number` type annotation.
Next step: ConfirmPopup hardening (Tier 1, #7).

---

Date: 2026-05-10 [AutoComplete component — 6-phase hardening COMPLETE]
Changed:
  - projects/ui-lib-custom/src/lib/autocomplete/autocomplete.ts (targeted listener, listboxLabel, resultsAnnouncement, removed empty constructor)
  - projects/ui-lib-custom/src/lib/autocomplete/autocomplete.html (chip div/role=group, SVG icons, live region, listbox aria-label, CSS ::before groups, aria-setsize/posinset)
  - projects/ui-lib-custom/src/lib/autocomplete/autocomplete.scss (group ::before, sr-live visually-hidden, icon display rule)
  - projects/ui-lib-custom/src/lib/autocomplete/autocomplete.spec.ts (1 test fixed: chip role assertion)
  - projects/ui-lib-custom/src/lib/autocomplete/autocomplete.a11y.spec.ts (NEW — 52 a11y tests, all pass)
  - docs/COMPONENT_SCORES.md (AutoComplete: 8.2 avg ✅ Done, queue #3 → ✅)
  - AI_AGENT_CONTEXT.md (updated)
State: AutoComplete fully hardened. 96/96 tests pass (44 unit + 52 a11y). All 7 axe-core checks pass.
Verification:
  node_modules\.bin\eslint projects/ui-lib-custom/src/lib/autocomplete/ --max-warnings 0 (CLEAN, EXIT:0)
  node_modules\.bin\jest --testPathPatterns=autocomplete --no-coverage (96/96 PASS)
  node_modules\.bin\jest --testPathPatterns=entry-points --no-coverage (95/95 PASS)
  node_modules\.bin\ng build ui-lib-custom (zero errors/warnings)
Terminal notes: aria-input-field-name violation on role="listbox" — fixed by listboxLabel() computed.
  listitem violation — <li> inside <ul role="group"> has implicit listitem role rejected by axe.
  Fix: change <ul>/<li> to <div>/<div>. CSS ::before group headers — cleanest ARIA-compliant approach.
Next step: ConfirmDialog hardening (Tier 1, #6).

---

Date: 2026-04-29 [context-menu session]
Changed:
  - projects/ui-lib-custom/src/lib/context-menu/ (new — types, component, template, SCSS, spec, barrel)
  - projects/ui-lib-custom/context-menu/ (new secondary entry point — ng-package.json, package.json, public-api.ts)
  - projects/ui-lib-custom/package.json (context-menu added to exports + typesVersions)
  - projects/ui-lib-custom/test/entry-points.spec.ts (context-menu import test added)
  - projects/demo/src/app/pages/context-menu/ (full demo replacing placeholder — TS/HTML/SCSS, 8 sections + API tables)
  - projects/demo/src/app/layout/sidebar/sidebar.component.ts (removed TODO badge from ContextMenu)
State: ContextMenu fully complete. Right-click trigger via show(event)/toggle(event) or global=true,
  floating panel + viewport overflow correction, nested submenus, keyboard nav, three variants/sizes.
  55/55 unit tests. 55/55 entry-points. ESLint clean. Build zero errors. Demo build clean.
Next step: knip baseline + dead-code cleanup, or overlay follow-ups (appendTo / z-index manager).

---

Date: 2026-04-28 [knip baseline session]
Changed:
  - knip.json (removed 9 redundant entry/ignore patterns flagged as config hints)
  - knip.json (added with-theme-scope.ts to ignore list — intentional pending file)
  - projects/ui-lib-custom/src/lib/theming/index.ts (removed WithThemeScopeMixin from public
    barrel; commented out with note to restore when first consumer lands)
State: knip baseline complete. Standard `npx knip` reports 0 issues (clean baseline).
  --include-entry-exports surfaces 47 entries that are all intentional public API types/exports;
  documented as false positives for a library. One truly dead export (WithThemeScopeMixin)
  removed from theming barrel and its source file added to knip ignore list (pending first use).
  Build: all entry points Built, zero errors. Entry-point tests: 41/41 PASS.
Verification:
  npx knip --config knip.json (exit 0, zero output),
  npx ng build ui-lib-custom (all entry points ✔ Built, zero errors),
  npx jest --testPathPatterns="entry-points" --no-cache (41/41 PASS).
Terminal notes: Edit tool introduces null bytes into small JSON files on Windows (same corruption
  as Write tool). Mitigation: always rewrite JSON via Python script with open(dest, 'wb') +
  .encode('utf-8'). Cannot delete files from bash sandbox (Operation not permitted) — use
  knip ignore list as equivalent signal.
Next step: Overlay follow-ups (appendTo / z-index manager), or component v2 enhancements.

---
Keep `AI_AGENT_CONTEXT.md` focused on active state and recent handoffs.

```text
Date: 2026-04-22 — OrderList Prompt 5
State: Filter input, filterQuery signal, displayItems computed (filter-aware), matchesFilter(), resolveProperty(), onFilterInput(), isEmptyDueToFilter computed, emptyContext updated, template filter section added.
Build: ng build ui-lib-custom passed.
```

```text
Date: 2026-04-22 — OrderList Prompt 4
State: Core selection (toggle + metaKeySelection + shift-range) + moveUp/moveDown/moveTop/moveBottom (immutable arrays) + full template wired.
Build: ng build ui-lib-custom passed.
```

```text
Date: 2026-04-22 — OrderList Prompt 4
State: Core selection (toggle + metaKeySelection + shift-range) + moveUp/moveDown/moveTop/moveBottom (immutable arrays) + full template wired.
Build: ng build ui-lib-custom passed.
```## Prompt 8 — Styling

**Context**
Full visual implementation for all three variants, three sizes, control buttons, list items, filter input, drag states, selection highlight, and striped rows.

**References — read these first, in order**
1. `AI_AGENT_CONTEXT.md`
2. `LIBRARY_CONVENTIONS.md` ("Design Tokens", CSS variable naming)
3. `docs/architecture/CSS_VARIABLES_AUDIT.md`
4. `projects/ui-lib-custom/src/lib/design-tokens.ts`
5. `projects/ui-lib-custom/src/lib/select/select.scss` (listbox-style item highlighting)
6. `projects/ui-lib-custom/src/lib/button/button.scss` (control button styling reference)
7. `projects/ui-lib-custom/src/lib/cascade-select/cascade-select.scss` (list panel styling)

**Task**

1. CSS variable system — declare all `--uilib-order-list-*` tokens:
   - Layout: `--uilib-order-list-gap`, `--uilib-order-list-min-height`, `--uilib-order-list-max-height`.
   - Surface: `--uilib-order-list-bg`, `--uilib-order-list-border`, `--uilib-order-list-radius`.
   - Item: `--uilib-order-list-item-padding`, `--uilib-order-list-item-bg`, `--uilib-order-list-item-bg-hover`, `--uilib-order-list-item-bg-selected`, `--uilib-order-list-item-color`, `--uilib-order-list-item-color-selected`, `--uilib-order-list-item-border-bottom`.
   - Drag: `--uilib-order-list-item-drag-opacity`, `--uilib-order-list-drop-indicator-color`.
   - Striped: `--uilib-order-list-item-bg-striped`.
   - Filter: `--uilib-order-list-filter-padding`, `--uilib-order-list-filter-border`.
   - Header: `--uilib-order-list-header-bg`, `--uilib-order-list-header-padding`, `--uilib-order-list-header-font-weight`.
   - Controls: `--uilib-order-list-control-size`, `--uilib-order-list-control-bg`, `--uilib-order-list-control-color`, `--uilib-order-list-control-bg-hover`, `--uilib-order-list-control-radius`, `--uilib-order-list-control-gap`.
   - Focus: `--uilib-order-list-focus-ring`.
   - Disabled: `--uilib-order-list-disabled-opacity`.
   - Transition: `--uilib-order-list-transition`.

2. Layout:
   - `:host` with `display: flex;` — controls area + list area side by side (when `controlsPosition = 'left'`).
   - `--controls-top` modifier: `flex-direction: column;` — controls above list.
   - Controls area: vertical button group with gap.
   - List container: scrollable area with `overflow-y: auto; max-height: var(--uilib-order-list-max-height)`.

3. Selection highlight:
   - Selected items get a highlighted bg + contrasting text via `--selected` CSS vars.
   - Focus-visible ring on the focused item.

4. Drag states:
   - `.ui-lib-order-list__item--dragging`: reduced opacity.
   - `.ui-lib-order-list__item--drop-before::before` / `--drop-after::after`: colored horizontal line indicator (pseudo-element).

5. Striped rows:
   - When `--striped` host class is present, odd items get `--uilib-order-list-item-bg-striped`.

6. Variant blocks:
   - Material: elevated border, rounded corners, prominent selection highlight.
   - Bootstrap: border-based, medium radius, Bootstrap-style selection colors.
   - Minimal: flat, no shadow, subtle selection.

7. Size blocks:
   - `--sm` / `--md` / `--lg` set item padding, font size, control button size, header font size.

8. Update CSS variables doc.

9. Verify: `npx ng build ui-lib-custom`, `npx eslint projects/ui-lib-custom/src/lib/order-list/`.

**Constraints**

- No raw hex or px — everything through tokens or CSS var fallbacks.
- All variant differences via CSS variables, not hard-coded per variant.

**Deliverables**

- Fully populated `order-list.component.scss`.
- Token additions to `design-tokens.ts` if needed.
- Handoff note.

---

```text
Date: 2026-04-22
Changed: projects/ui-lib-custom/src/lib/order-list/order-list.types.ts (created), order-list.constants.ts (created), index.ts (created)
State: OrderList Prompt 2 complete. Type surface, constants, and barrel scaffold in place.
Next step: Prompt 3 — scaffold component files.
```

```text
Date: 2026-04-21
Changed: docs/reference/components/DATAVIEW.md, docs/reference/components/README.md, projects/ui-lib-custom/src/lib/data-view/data-view.component.spec.ts, AI_AGENT_CONTEXT.md, docs/implementation/AI_AGENT_CONTEXT_ARCHIVE.md
State: DataView: Prompt 9 complete. Fully implemented, tested, documented, and demoed.
Verification: Library build, tests, lint, entry-point test, demo build all passed.
Next step: Shift to queued backlog items.
```

```text
Date: 2026-04-22
Changed: ORDERLIST_RESEARCH.md (created), AI_AGENT_CONTEXT.md
State: OrderList Prompt 1 complete. Research doc produced. No component code written yet.
Terminal notes: npm pack primeng@19 in /tmp/orderlist-research via bash.exe.
Next step: Prompt 2 — type surface and constants.
```

```text
Date: 2026-04-21
Changed: projects/demo/src/app/pages/data-view/data-view-demo.data.ts, projects/demo/src/app/pages/data-view/data-view-demo.component.ts, projects/demo/src/app/pages/data-view/data-view-demo.component.html, projects/demo/src/app/pages/data-view/data-view-demo.component.scss, projects/demo/src/app/layout/sidebar/sidebar.component.ts, AI_AGENT_CONTEXT.md, docs/implementation/AI_AGENT_CONTEXT_ARCHIVE.md
State: DataView: Prompt 8 complete. Demo page with 14-16 scenarios. Next: Prompt 9 (documentation & final QA).
Verification:
- Replaced placeholder DataView demo page with 16 sections covering list/grid rendering, layout switching, client and server pagination flows, external sorting controls, custom templates, empty/loading states, size variants, grid columns, paginator slots, and themed wrappers.
- Added realistic fictional catalog dataset in `projects/demo/src/app/pages/data-view/data-view-demo.data.ts` (72 products) for meaningful pagination and server-side simulation.
- Removed `badge: 'TODO'` for DataView in sidebar navigation (`projects/demo/src/app/layout/sidebar/sidebar.component.ts`).
- Confirmed `data-view` lazy route already exists in `projects/demo/src/app/app.routes.ts`; no route-path changes were required.
- Demo build passed: `npx.cmd ng build demo`.
- Route probe passed: `curl -I http://localhost:4200/data-view` returned HTTP 200.
Terminal notes:
- Failed: none in-session.
- Worked: verification commands executed from `bash.exe` using `npx.cmd` and `curl`.
Next step: Prompt 9 - update DataView docs and run final QA verification sweep.
```

```text
Date: 2026-04-21
Changed: projects/ui-lib-custom/data-view/ng-package.json, projects/ui-lib-custom/data-view/package.json, projects/ui-lib-custom/data-view/public-api.ts, projects/ui-lib-custom/test/entry-points.spec.ts, projects/ui-lib-custom/package.json, projects/ui-lib-custom/src/lib/data-view/data-view.component.ts, projects/ui-lib-custom/src/lib/data-view/data-view.component.html, AI_AGENT_CONTEXT.md, docs/implementation/AI_AGENT_CONTEXT_ARCHIVE.md
State: DataView: Prompt 7 complete. Secondary entry point `ui-lib-custom/data-view` wired and building. Next: Prompt 8 (demo page).
Verification:
- Added secondary entry-point files under `projects/ui-lib-custom/data-view/` (`ng-package.json`, `package.json`, `public-api.ts`) using the established thin re-export pattern.
- Updated `projects/ui-lib-custom/test/entry-points.spec.ts` to include `ui-lib-custom/data-view` import regression coverage.
- Updated `projects/ui-lib-custom/package.json` export map + `typesVersions` with `./data-view` typing paths.
- Verified `projects/ui-lib-custom/src/public-api.ts` does not re-export DataView symbols.
- Build passed: `npx.cmd ng build ui-lib-custom`.
- Entry-point regression test passed: `npx.cmd jest projects/ui-lib-custom/test/entry-points.spec.ts --runInBand --no-cache`.
Terminal notes:
- Failed: initial build attempt surfaced strict template type errors in `data-view.component.html` for union paginator page items after enabling the secondary entry point build.
- Worked: added `pageNumber(...)` helper in `data-view.component.ts`, updated paginator template bindings, then reran build and entry-point tests successfully from `bash.exe` using `npx.cmd`.
Next step: Prompt 8 - build the DataView demo page and route/sidebar integration.
```

Stable architecture/conventions/workflows are owned by `AGENTS.md`.

## Archive Index

- Range: 2026-03-17 through 2026-04-21
- Coverage: CascadeSelect completion, Checkbox parity phases, DatePicker implementation, InputGroup integration, InputMask research, InputNumber prompts 1-8 rollovers, SpeedDial prompts 1-4 rollovers
- Source: migrated from `AI_AGENT_CONTEXT.md` during context cleanup and retention rollovers on 2026-04-08

## Archived Session Summary (Condensed)

### 2026-03-17 to 2026-03-20
- CascadeSelect prompts 5-8 completed (styling, tests, docs/demo integration, entry-point verification).
- DatePicker prompts 8-9 completed (tokenized styling + expanded unit coverage).
- Checkbox parity phases progressed and stabilized with CVA, outputs, appearance, a11y, demo, and docs updates.

### 2026-03-19 to 2026-04-03
- ColorPicker research and architecture planning completed.
- InputGroup implementation, entry-point coverage, and demo/docs integration completed.

### 2026-04-06
- InputMask research and PrimeNG parity analysis completed.

### 2026-04-08 (Retention rollovers)
- InputNumber Prompt 4 handoff moved from `AI_AGENT_CONTEXT.md`.
- InputNumber Prompt 5 handoff moved from `AI_AGENT_CONTEXT.md`.
- InputNumber Prompt 6 handoff moved from `AI_AGENT_CONTEXT.md`.
- InputNumber Prompt 7 handoff moved from `AI_AGENT_CONTEXT.md`.
- InputNumber Prompt 8 handoff moved from `AI_AGENT_CONTEXT.md`.

### 2026-04-16 (Retention rollovers)
- SpeedDial Prompt 1 handoff moved from `AI_AGENT_CONTEXT.md`.
- SpeedDial Prompt 2 handoff moved from `AI_AGENT_CONTEXT.md`.
- SpeedDial Prompt 3 handoff moved from `AI_AGENT_CONTEXT.md`.
- SpeedDial Prompt 4 handoff moved from `AI_AGENT_CONTEXT.md`.

### 2026-04-20 (Retention rollovers)
- SplitButton Prompt 8 handoff moved from `AI_AGENT_CONTEXT.md`.
- SplitButton Prompt 9 handoff moved from `AI_AGENT_CONTEXT.md`.
- Backlog verification handoff (2026-04-19) moved from `AI_AGENT_CONTEXT.md`.
- Chart Prompt 1 handoff moved from `AI_AGENT_CONTEXT.md`.
- Chart Prompt 2 handoff moved from `AI_AGENT_CONTEXT.md`.
- Chart Prompt 3 handoff moved from `AI_AGENT_CONTEXT.md`.

### 2026-04-21 (Retention rollovers)
- DataView Prompt 6 handoff moved from `AI_AGENT_CONTEXT.md`.

### Archived InputNumber Handoffs (Chronological)

```text
Date: 2026-04-08
Changed: docs/research/INPUTNUMBER_RESEARCH.md, AI_AGENT_CONTEXT.md, docs/implementation/AI_AGENT_CONTEXT_ARCHIVE.md
State: InputNumber: Prompt 1 complete. Research doc at `docs/research/INPUTNUMBER_RESEARCH.md`. Next: Prompt 2 (API design & NumberFormatService).
Verification:
- PrimeNG v19 InputNumber API and implementation reviewed from packed sources (`inputnumber.d.ts`, `inputnumber.interface.d.ts`, `primeng-inputnumber.mjs`).
Next step: Start Prompt 2 and define the `NumberFormatService` API plus `InputNumber` signal-based public types.
```

```text
Date: 2026-04-17
Changed: projects/ui-lib-custom/src/lib/split-button/split-button.component.scss, projects/ui-lib-custom/src/lib/design-tokens.ts, docs/reference/systems/CSS_VARIABLES.md, AI_AGENT_CONTEXT.md, docs/implementation/AI_AGENT_CONTEXT_ARCHIVE.md
State: SplitButton: Prompt 7 complete. Styling now covers joined button geometry, severity palettes, variant modifiers, size scaling, loading animation, and dropdown panel visuals using `--uilib-split-button-*` variables aligned with Button color mappings. Next: Prompt 8 (tests).
Verification:
- Library build passed: `npx.cmd ng build ui-lib-custom`.
- SplitButton lint passed: `npx.cmd eslint projects/ui-lib-custom/src/lib/split-button/`.
Terminal notes:
- Failed: none in-session.
- Worked: ran `npx.cmd ng build ui-lib-custom` and `npx.cmd eslint projects/ui-lib-custom/src/lib/split-button/` from `bash.exe`.
- Warning: ng-packagr still reports conflicting `default` export conditions for `./speed-dial` and `./split-button` while writing package manifest.
Next step: Prompt 8 — add unit tests for style-state host classes, menu rendering states, and keyboard/focus regressions.
```

```text
Date: 2026-04-08
Changed: projects/ui-lib-custom/src/lib/input-number/input-number.types.ts, projects/ui-lib-custom/src/lib/input-number/number-format.service.ts, projects/ui-lib-custom/src/lib/input-number/number-format.service.spec.ts, AI_AGENT_CONTEXT.md, docs/implementation/AI_AGENT_CONTEXT_ARCHIVE.md
State: InputNumber: Prompt 2 complete. Types at `input-number.types.ts`, `NumberFormatService` at `number-format.service.ts` with passing tests. Next: Prompt 3 (component scaffold & CVA).
Verification:
- Targeted formatter/parser diagnostics via `get_errors` report no blocking TypeScript/ESLint errors in new InputNumber files.
- Jest command executed: `npx jest input-number/number-format --coverage --runInBand --no-cache`.
Next step: Scaffold `InputNumberComponent` + secondary entry-point wiring and CVA shell.
```

```text
Date: 2026-04-08
Changed: projects/ui-lib-custom/src/lib/input-number/input-number.component.ts, projects/ui-lib-custom/src/lib/input-number/index.ts, AI_AGENT_CONTEXT.md, docs/implementation/AI_AGENT_CONTEXT_ARCHIVE.md
State: InputNumber: Prompt 3 complete. Component scaffold with CVA, input handling, spinner logic, and clear button. Next: Prompt 4 (styling).
Verification:
- `get_errors` reports no blocking diagnostics in `input-number.component.ts` and `index.ts`.
- Build command executed: `npx ng build ui-lib-custom`.
Next step: Implement Prompt 4 styles for all layouts, sizes, variants, and CSS variables.
```

```text
Date: 2026-04-08
Changed: projects/ui-lib-custom/src/lib/input-number/input-number.component.ts, projects/ui-lib-custom/src/lib/input-number/input-number.component.scss, projects/ui-lib-custom/src/lib/design-tokens.ts, docs/reference/systems/CSS_VARIABLES.md, AI_AGENT_CONTEXT.md, docs/implementation/AI_AGENT_CONTEXT_ARCHIVE.md
State: InputNumber: Prompt 4 complete. Full styling with variant overrides and size tokens. Next: Prompt 5 (tests).
Verification:
- `get_errors` reports no blocking diagnostics in `input-number.component.ts` and `input-number.component.scss`.
- Build/serve commands were executed via PowerShell; `npx` in PowerShell is blocked by execution policy on this machine, so visual verification was not completed in-session.
Next step: Implement Prompt 5 unit tests for rendering, keyboard interactions, spinner behavior, CVA integration, and clear action.
```

```text
Date: 2026-04-08
Changed: projects/ui-lib-custom/src/lib/input-number/input-number.component.spec.ts, AI_AGENT_CONTEXT.md, docs/implementation/AI_AGENT_CONTEXT_ARCHIVE.md
State: InputNumber: Prompt 5 complete. Component tests passing with >90% coverage. Next: Prompt 6 (secondary entry point).
Verification:
- Added comprehensive InputNumber unit test coverage for rendering, formatting, parsing, spinner, keyboard, CVA/forms, clear button, and a11y behavior.
- `get_errors` reports no blocking diagnostics in `input-number.component.spec.ts`.
- Jest command executed and passing: `npx jest input-number --coverage --runInBand --no-cache`.
- Coverage for `projects/ui-lib-custom/src/lib/input-number/input-number.component.ts`: 96.31% statements, 86.9% branches, 100% functions, 96.27% lines.
Next step: Prompt 6 secondary entry-point wiring and export-map verification.
```

```text
Date: 2026-04-08
Changed: projects/ui-lib-custom/input-number/ng-package.json, projects/ui-lib-custom/input-number/package.json, projects/ui-lib-custom/test/entry-points.spec.ts, projects/ui-lib-custom/src/lib/input-number/input-number.component.ts, AI_AGENT_CONTEXT.md, docs/implementation/AI_AGENT_CONTEXT_ARCHIVE.md
State: InputNumber: Prompt 6 complete. Secondary entry point `ui-lib-custom/input-number` wired and building. Next: Prompt 7 (demo page).
Verification:
- Added secondary entry-point metadata files under `projects/ui-lib-custom/input-number/` (`ng-package.json`, `package.json`).
- Updated entry-point import regression test in `projects/ui-lib-custom/test/entry-points.spec.ts` to include `ui-lib-custom/input-number`.
- Verified `projects/ui-lib-custom/src/public-api.ts` does not re-export `input-number`.
- Build command passed: `npx ng build ui-lib-custom` (includes `ui-lib-custom/input-number` entry point).
- Targeted entry-point test passed: `npx jest projects/ui-lib-custom/test/entry-points.spec.ts --runInBand --no-cache`.
Next step: Prompt 7 demo page integration for InputNumber.
```

```text
Date: 2026-04-08
Changed: projects/demo/src/app/pages/input-number/input-number-demo.component.ts, projects/demo/src/app/pages/input-number/input-number-demo.component.html, projects/demo/src/app/pages/input-number/input-number-demo.component.scss, projects/demo/src/app/app.routes.ts, projects/demo/src/app/layout/sidebar/sidebar.component.ts, AI_AGENT_CONTEXT.md, docs/implementation/AI_AGENT_CONTEXT_ARCHIVE.md
State: InputNumber: Prompt 7 complete. Demo page with 17 scenarios. Next: Prompt 8 (documentation & final QA).
Verification:
- Added `InputNumberDemoComponent` page with 17 sections covering numerals, formatting/locale/currency, prefix/suffix, spinner layouts, step/min-max, float-label, clear, sizes, states, filled, fluid, and reactive forms.
- Added lazy route in `projects/demo/src/app/app.routes.ts` for `/input-number`.
- Added sidebar form-navigation item in `projects/demo/src/app/layout/sidebar/sidebar.component.ts`.
- Demo build passed: `npx ng build demo`.
- Demo server route check responded with HTTP 200: `curl -I http://localhost:4200/input-number` (local server was already bound on port 4200).
Next step: Prompt 8 documentation updates and final QA sweep.
```

```text
Date: 2026-04-08
Changed: docs/reference/components/INPUTNUMBER.md, docs/reference/components/README.md, projects/ui-lib-custom/src/lib/input-number/input-number.component.ts, projects/demo/src/app/pages/input-number/input-number-demo.component.ts, projects/demo/src/app/pages/input-number/input-number-demo.component.html, projects/demo/src/app/pages/input-number/input-number-demo.component.scss, projects/demo/src/app/app.routes.ts, projects/demo/src/app/layout/sidebar/sidebar.component.ts, AI_AGENT_CONTEXT.md, docs/implementation/AI_AGENT_CONTEXT_ARCHIVE.md
State: InputNumber: Prompt 8 complete. Fully implemented, tested, documented, and demoed. Next: Backlog follow-ups / v2 hardening only.
Verification:
- Library build passed: `npx ng build ui-lib-custom`.
- Tests passed: `npx jest input-number --coverage --runInBand --no-cache` (InputNumber coverage: 96.55% statements, 87.5% branches, 100% functions, 96.51% lines).
- Lint passed: `npx eslint projects/ui-lib-custom/src/lib/input-number/`.
- Demo serve command executed: `npx ng serve demo --no-open` (dev server compiled; existing local server remains on port 4200).
- Route check passed: `curl -I http://localhost:4200/input-number` returned HTTP 200.
Known issues / v2 considerations:
- Pre-existing non-blocking watch items remain (Jest haste-map naming collision warning; demo SCSS budget warnings for `button` and `date-picker`).
- Runtime/manual visual + SR announcement checks still recommended for full UX sign-off across all 17 InputNumber demo sections.
Next step: Shift focus to queued backlog (`knip`, constants cleanup, overlay follow-ups) unless new InputNumber regressions appear.
```

```text
Date: 2026-04-16
Changed: docs/research/SPEEDDIAL_RESEARCH.md, AI_AGENT_CONTEXT.md
State: SpeedDial: Prompt 1 complete. Research documented with API surface, layout formulas, a11y contract, and divergence plan. Next: Prompt 2 (API design & types).
Verification:
- PrimeNG v19 SpeedDial API reviewed from packed sources (speeddial.d.ts, primeng-speeddial.mjs).
Next step: Prompt 2 — define SpeedDial types, constants, and public input/output signatures.
```

```text
Date: 2026-04-16
Changed: projects/ui-lib-custom/src/lib/speed-dial/speed-dial.types.ts, projects/ui-lib-custom/src/lib/speed-dial/speed-dial.constants.ts, projects/ui-lib-custom/src/lib/speed-dial/index.ts, AI_AGENT_CONTEXT.md
State: SpeedDial: Prompt 2 complete. Types, constants, and barrel defined. Next: Prompt 3 (scaffold + entry point).
Verification:
- ESLint/TS check: no blocking diagnostics on new files (`get_errors` shows warnings only for currently unused symbols).
- Library build passed: `npx.cmd ng build ui-lib-custom`.
Terminal notes:
- Failed: none in-session.
- Worked: `npx.cmd ng build ui-lib-custom` from `bash.exe`.
Next step: Prompt 3 — scaffold component files, template directives, and secondary entry point wiring.
```

```text
Date: 2026-04-16
Changed: projects/ui-lib-custom/src/lib/speed-dial/speed-dial.component.ts, projects/ui-lib-custom/src/lib/speed-dial/speed-dial.component.html, projects/ui-lib-custom/src/lib/speed-dial/speed-dial.component.scss, projects/ui-lib-custom/src/lib/speed-dial/speed-dial-templates.directive.ts, projects/ui-lib-custom/src/lib/speed-dial/index.ts, projects/ui-lib-custom/speed-dial/ng-package.json, projects/ui-lib-custom/speed-dial/package.json, projects/ui-lib-custom/package.json, projects/ui-lib-custom/test/entry-points.spec.ts, AI_AGENT_CONTEXT.md, docs/implementation/AI_AGENT_CONTEXT_ARCHIVE.md
State: SpeedDial: Prompt 3 complete. Component scaffold, template marker directives, and `ui-lib-custom/speed-dial` secondary entry point are wired. Next: Prompt 4 (core behavior implementation).
Verification:
- Build passed: `npx.cmd ng build ui-lib-custom`.
- Entry-point regression test passed: `npx.cmd jest projects/ui-lib-custom/test/entry-points.spec.ts --runInBand --no-cache`.
- Confirmed `projects/ui-lib-custom/src/public-api.ts` has no `speed-dial` re-export.
Terminal notes:
- Failed: none in-session.
- Worked: `npx.cmd ng build ui-lib-custom` and `npx.cmd jest projects/ui-lib-custom/test/entry-points.spec.ts --runInBand --no-cache` from `bash.exe`.
- Warning: ng-packagr reported `Found a conflicting export condition for "./speed-dial". The "default" condition would be overridden by ng-packagr. Please unset it.` during build, but build completed successfully.
Next step: Prompt 4 — implement SpeedDial visibility, interactions, and signal-driven host classes.
```

```text
Date: 2026-04-16
Changed: projects/ui-lib-custom/src/lib/speed-dial/speed-dial.component.ts, projects/ui-lib-custom/src/lib/speed-dial/speed-dial.component.html, AI_AGENT_CONTEXT.md, docs/implementation/AI_AGENT_CONTEXT_ARCHIVE.md
State: SpeedDial: Prompt 4 complete. Core component logic wired for visibility, item iteration, keyboard/focus behavior, ARIA structure, and variant-based host classes (linear-mode layout placeholder only). Next: Prompt 5 (layout math).
Verification:
- Build passed: `npx.cmd ng build ui-lib-custom`.
Terminal notes:
- Failed: none in-session.
- Worked: `npx.cmd ng build ui-lib-custom` from `bash.exe`.
- Warning: ng-packagr reported `Found a conflicting export condition for "./speed-dial". The "default" condition would be overridden by ng-packagr. Please unset it.` while writing package manifest.
Next step: Prompt 5 — implement linear/circle/semi/quarter item layout math and direction-specific transforms.
```

```text
Date: 2026-04-16
Changed: projects/ui-lib-custom/src/lib/speed-dial/speed-dial-layout.ts, projects/ui-lib-custom/src/lib/speed-dial/speed-dial-layout.spec.ts, projects/ui-lib-custom/src/lib/speed-dial/speed-dial.component.ts, AI_AGENT_CONTEXT.md, docs/implementation/AI_AGENT_CONTEXT_ARCHIVE.md
State: SpeedDial: Prompt 5 complete. Layout geometry extracted into pure utility and wired into component transform mapping. Next: Prompt 6 (mask/outside-click behavior).
Verification:
- Build passed: `npx.cmd ng build ui-lib-custom` (captured in `tmp/speed-dial-build.log`, exit code `0` in `tmp/speed-dial-build.exit`).
- Layout tests passed: `npx.cmd jest projects/ui-lib-custom/src/lib/speed-dial/speed-dial-layout.spec.ts --runInBand --no-cache --coverage --collectCoverageFrom="projects/ui-lib-custom/src/lib/speed-dial/speed-dial-layout.ts"` (captured in `tmp/speed-dial-layout-test.log`, exit code `0` in `tmp/speed-dial-layout-test.exit`).
- Coverage (`speed-dial-layout.ts`): 100% statements, 95.83% branches, 100% functions, 100% lines.
Terminal notes:
- Failed: direct terminal streaming intermittently returned empty output in-session.
- Worked: redirecting command output to log files under `tmp/` and validating exit codes.
- Warning: ng-packagr reported `Found a conflicting export condition for "./speed-dial". The "default" condition would be overridden by ng-packagr. Please unset it.` during build.
Next step: Prompt 6 — add mask and outside-click close behavior.
```

```text
Date: 2026-04-16
Changed: projects/ui-lib-custom/src/lib/speed-dial/speed-dial.component.ts, projects/ui-lib-custom/src/lib/speed-dial/speed-dial.component.html, AI_AGENT_CONTEXT.md, docs/implementation/AI_AGENT_CONTEXT_ARCHIVE.md
State: SpeedDial: Prompt 6 complete. Mask layer, outside-click close, document Escape handling, and close-time focus restoration are implemented. Next: Prompt 7 (styling pass).
Verification:
- Build passed: `npx.cmd ng build ui-lib-custom` (captured in `tmp/speed-dial-prompt6-build.log`, exit code `0` in `tmp/speed-dial-prompt6-build.exit`).
Terminal notes:
- Failed: initial build attempt failed due `@HostListener('document:keydown.escape', ['$event'])` typing mismatch (`Event` vs `KeyboardEvent`) with strict TS settings.
- Worked: changed `onDocumentEscape` signature to `event: Event` and narrowed via `instanceof KeyboardEvent`; rebuild passed.
- Warning: ng-packagr still reports `Found a conflicting export condition for "./speed-dial". The "default" condition would be overridden by ng-packagr. Please unset it.` during package manifest write.
Next step: Prompt 7 — implement SpeedDial visual styling for mask, trigger, items, and variant/size states.
```

```text
Date: 2026-04-16
Changed: projects/ui-lib-custom/src/lib/speed-dial/speed-dial.component.scss, projects/ui-lib-custom/src/lib/speed-dial/speed-dial.component.ts, projects/ui-lib-custom/src/lib/design-tokens.ts, docs/reference/systems/CSS_VARIABLES.md, AI_AGENT_CONTEXT.md, docs/implementation/AI_AGENT_CONTEXT_ARCHIVE.md
State: SpeedDial: Prompt 7 complete. Full styling shipped with tokenized CSS variables, variants, sizes, list/mask animations, and rotate modifier class support. Next: Prompt 8 (component tests + behavior verification).
Verification:
- Build passed: `npx.cmd ng build ui-lib-custom` (captured in `tmp/speed-dial-prompt7-build.log`, exit code `0` in `tmp/speed-dial-prompt7-build.exit`).
- ESLint passed: `npx.cmd eslint projects/ui-lib-custom/src/lib/speed-dial/` (captured in `tmp/speed-dial-prompt7-eslint.log`, exit code `0` in `tmp/speed-dial-prompt7-eslint.exit`).
Terminal notes:
- Failed: none in-session.
- Worked: `npx.cmd ng build ui-lib-custom` and `npx.cmd eslint projects/ui-lib-custom/src/lib/speed-dial/` from `bash.exe` with log capture in `tmp/`.
Next step: Prompt 8 — add/expand SpeedDial unit tests for visibility, keyboard, mask/outside-click, focus return, and layout utility integration.
```

```text
Date: 2026-04-17
Changed: projects/demo/src/app/pages/speed-dial/speed-dial-demo.component.ts, projects/demo/src/app/pages/speed-dial/speed-dial-demo.component.html, projects/demo/src/app/pages/speed-dial/speed-dial-demo.component.scss, projects/demo/src/app/layout/sidebar/sidebar.component.ts, AI_AGENT_CONTEXT.md, docs/implementation/AI_AGENT_CONTEXT_ARCHIVE.md
State: SpeedDial: Prompt 9 complete. Demo page is now wired at `/speed-dial` with PrimeNG-aligned sections (Linear, Circle, Semi-Circle, Quarter-Circle, Tooltip, Mask, Template, Accessibility, API Reference), live examples, and code previews. Next: Prompt 10 (docs/reference updates) if queued.
Verification:
- Demo build passed: `npx.cmd ng build demo` (captured in `tmp/speed-dial-prompt9-build.log`, exit code `0` in `tmp/speed-dial-prompt9-build.exit`).
- Route availability confirmed with HTTP 200 using a HEAD probe against a running local server (`node` http request) captured in `tmp/speed-dial-prompt9-curl.log` with exit code `0` in `tmp/speed-dial-prompt9-curl.exit`.
Terminal notes:
- Failed: direct `curl` output in-session returned empty output despite command execution, so status visibility was unreliable.
- Worked: started demo server via `npx.cmd ng serve demo --port 4200 --host 127.0.0.1` (log in `tmp/speed-dial-prompt9-serve.log`) and verified route status with a Node HTTP HEAD request (`status:200`).
Next step: Prompt 10 — update component reference docs and cross-link demo coverage notes.
```

```text
Date: 2026-04-17
Changed: docs/reference/components/SPEEDDIAL.md, docs/reference/components/README.md, AI_AGENT_CONTEXT.md, docs/implementation/AI_AGENT_CONTEXT_ARCHIVE.md
State: SpeedDial: Prompt 10 complete. Fully implemented, tested, documented, and demoed. Next: Backlog.
Verification:
- ng build ui-lib-custom: PASS (`npx.cmd ng build ui-lib-custom`; log `tmp/speed-dial-prompt10-build-lib.log`, exit `tmp/speed-dial-prompt10-build-lib.exit` = `0`).
- speed-dial jest coverage: `speed-dial.component.ts` 91.17% statements, 84.09% branches, 100% functions, 91.04% lines (`npx.cmd jest speed-dial --coverage --runInBand --no-cache`; log `tmp/speed-dial-prompt10-jest.log`, exit `tmp/speed-dial-prompt10-jest.exit` = `0`).
- eslint: clean (`npx.cmd eslint projects/ui-lib-custom/src/lib/speed-dial/`; log `tmp/speed-dial-prompt10-eslint.log`, exit `tmp/speed-dial-prompt10-eslint.exit` = `0`).
- entry-points regression: PASS (`npx.cmd jest projects/ui-lib-custom/test/entry-points.spec.ts --runInBand --no-cache`; log `tmp/speed-dial-prompt10-entrypoints.log`, exit `tmp/speed-dial-prompt10-entrypoints.exit` = `0`).
- demo build: PASS (`npx.cmd ng build demo`; log `tmp/speed-dial-prompt10-build-demo.log`, exit `tmp/speed-dial-prompt10-build-demo.exit` = `0`).
Known issues / v2 considerations:
- Tooltip currently falls back to `title` attribute; replace with `ui-lib-tooltip` when that component ships.
- RTL-specific direction mirroring deferred.
Next step: Resume queued backlog items.
```

```text
Date: 2026-04-17
Changed: docs/research/SPLITBUTTON_RESEARCH.md, AI_AGENT_CONTEXT.md
State: SplitButton: Prompt 1 complete. Research documented with API surface, DOM structure, severity integration, keyboard matrix, a11y contract, and divergence plan. Next: Prompt 2 (API design & types).
Verification:
- PrimeNG v19 SplitButton API reviewed from packed sources (splitbutton.d.ts, primeng-splitbutton.mjs, menuitem.d.ts).
Next step: Prompt 2 — define SplitButton types, shared MenuItem interface, constants, and public input/output signatures.
```

```text
Date: 2026-04-17
Changed: projects/ui-lib-custom/src/lib/split-button/split-button.component.ts, projects/ui-lib-custom/src/lib/split-button/split-button.component.html, projects/ui-lib-custom/src/lib/split-button/split-button.component.scss, projects/ui-lib-custom/src/lib/split-button/split-button-templates.directive.ts, projects/ui-lib-custom/split-button/ng-package.json, projects/ui-lib-custom/split-button/package.json, projects/ui-lib-custom/src/lib/split-button/index.ts, projects/ui-lib-custom/package.json, projects/ui-lib-custom/test/entry-points.spec.ts, AI_AGENT_CONTEXT.md, docs/implementation/AI_AGENT_CONTEXT_ARCHIVE.md
State: SplitButton: Prompt 3 complete. Component scaffold, template marker directives, and `ui-lib-custom/split-button` secondary entry point are wired. Next: Prompt 4 (core behavior implementation).
Verification:
- Library build passed: `npx.cmd ng build ui-lib-custom`.
- Entry-point regression test passed: `npx.cmd jest projects/ui-lib-custom/test/entry-points.spec.ts --runInBand --no-cache`.
- Confirmed `projects/ui-lib-custom/src/public-api.ts` has no `split-button` re-export.
Terminal notes:
- Failed: first build failed due `TemplateRef` imported as type-only and then used as a value in `contentChild(..., { read: TemplateRef })`.
- Worked: imported `TemplateRef` as a value, rebuilt successfully, and reran entry-point regression tests successfully from `bash.exe` using PowerShell + `npx.cmd`.
- Warning: ng-packagr reports conflicting export condition for `./speed-dial` and now `./split-button` because `default` is present in `projects/ui-lib-custom/package.json` exports.
Next step: Prompt 4 — implement SplitButton open/close state, item activation, keyboard navigation, and ARIA wiring.
```

```text
Date: 2026-04-17
Changed: projects/ui-lib-custom/src/lib/split-button/split-button.component.ts, projects/ui-lib-custom/src/lib/split-button/split-button.component.html, AI_AGENT_CONTEXT.md, docs/implementation/AI_AGENT_CONTEXT_ARCHIVE.md
State: SplitButton: Prompt 4 complete. Core state logic is wired for variant/severity class resolution, main action click, and menu open/close toggle with ARIA linkage. Next: Prompt 5 (menu item rendering + panel population).
Verification:
- Library build passed: `npx.cmd ng build ui-lib-custom`.
Terminal notes:
- Failed: initial Prompt 4 diagnostics flagged `NgTemplateOutlet` unused because template still had scaffold markup.
- Worked: updated template to block syntax with `ngTemplateOutlet` slots and reran build successfully from `bash.exe` via PowerShell + `npx.cmd`.
- Warning: ng-packagr continues to warn about conflicting `default` export conditions for `./speed-dial` and `./split-button`.
Next step: Prompt 5 — render menu items into the panel and wire item command events.
```

```text
Date: 2026-04-17
Changed: projects/ui-lib-custom/src/lib/split-button/split-button.component.ts, projects/ui-lib-custom/src/lib/split-button/split-button.component.html, AI_AGENT_CONTEXT.md
State: SplitButton: Prompt 5 complete. Dropdown panel now renders visible model items, handles separators/disabled rows, dispatches item command events, supports URL/router navigation, closes on outside-click/Escape, and focuses the first actionable item on open. Next: Prompt 6 (full keyboard navigation).
Verification:
- Library build passed: `npx.cmd ng build ui-lib-custom`.
Terminal notes:
- Failed: none in-session.
- Worked: built from `bash.exe` using `npx.cmd ng build ui-lib-custom`.
- Warning: ng-packagr still reports conflicting `default` export conditions for `./speed-dial` and `./split-button` while writing package manifest.
Next step: Prompt 6 — implement full menu keyboard navigation (Arrow/Home/End/Enter/Space/Tab) and active-item semantics.
```

```text
Date: 2026-04-17
Changed: projects/ui-lib-custom/src/lib/split-button/split-button.component.ts, projects/ui-lib-custom/src/lib/split-button/split-button.component.html, AI_AGENT_CONTEXT.md, docs/implementation/AI_AGENT_CONTEXT_ARCHIVE.md
State: SplitButton: Prompt 6 complete. Full keyboard handling and ARIA wiring now cover main button passthrough, menu button toggle/open-first/open-last behavior, menu item roving focus keys, and programmatic focus return to the menu trigger on Escape/item activation. Next: Prompt 7 (styling).
Verification:
- Library build passed: `npx.cmd ng build ui-lib-custom`.
Terminal notes:
- Failed: none in-session.
- Worked: built from `bash.exe` using `npx.cmd ng build ui-lib-custom`.
- Warning: ng-packagr still reports conflicting `default` export conditions for `./speed-dial` and `./split-button` while writing package manifest.
Next step: Prompt 7 — implement SplitButton visual styling and tokenized CSS variables for all variants/sizes/states.
```

```text
Date: 2026-04-17
Changed: projects/ui-lib-custom/src/lib/split-button/split-button.component.spec.ts, AI_AGENT_CONTEXT.md, docs/implementation/AI_AGENT_CONTEXT_ARCHIVE.md
State: SplitButton: Prompt 8 complete. Added a zoneless host-based Jest suite covering rendering, inputs/outputs, independent disabled states, outside click, ARIA contracts, keyboard matrix, focus return, and menu item behaviors. Next: Prompt 9 (demo/docs if queued) or backlog.
Verification:
- SplitButton tests passed: `npx.cmd jest split-button --runInBand --no-cache --silent`.
- SplitButton coverage passed: `npx.cmd jest split-button --coverage --runInBand --no-cache --silent`.
- Coverage (`projects/ui-lib-custom/src/lib/split-button/split-button.component.ts`): 98.77% statements, 94.11% branches, 100% functions, 98.73% lines.
Terminal notes:
- Failed: initial Prompt 8 test iteration had multiple expectation/update-flow mismatches; resolved by converting host-bound test inputs to signals and extending branch-path coverage tests.
- Worked: reran `npx.cmd jest split-button --runInBand --no-cache --silent` and `npx.cmd jest split-button --coverage --runInBand --no-cache --silent` from `bash.exe`.
- Warning: `@ng-icons` warns about unresolved icon names in non-silent test output; this is non-blocking for assertions.
Next step: Prompt 9 — if queued, wire SplitButton demo/docs and run targeted regression checks.
```

```text
Date: 2026-04-18
Changed: projects/ui-lib-custom/src/lib/split-button/split-button.component.spec.ts, docs/reference/components/SPLITBUTTON.md, AI_AGENT_CONTEXT.md, docs/implementation/AI_AGENT_CONTEXT_ARCHIVE.md
State: SplitButton: Prompt 9 complete. Demo/docs closeout and QA sweep finalized; SplitButton is fully implemented, tested, documented, and wired in demo navigation. Next: Backlog.
Verification:
- TS diagnostics clean: `get_errors` on `projects/ui-lib-custom/src/lib/split-button/split-button.component.spec.ts`.
- SplitButton spec lint passed: `npx.cmd eslint projects/ui-lib-custom/src/lib/split-button/split-button.component.spec.ts` (exit `0`, log `tmp/split-button-prompt9-spec-eslint.log`).
- SplitButton spec tests passed: `npx.cmd jest projects/ui-lib-custom/src/lib/split-button/split-button.component.spec.ts --runInBand --no-cache --silent` (56/56, exit `0`, log `tmp/split-button-prompt9-spec-jest.log`).
- SplitButton coverage passed: `npx.cmd jest split-button --coverage --runInBand --no-cache --silent` (coverage log `tmp/split-button-prompt9-coverage.log`, exit `0`; `split-button.component.ts`: 98.77% statements, 94.11% branches, 100% functions, 98.73% lines).
- Entry-point regression passed: `npx.cmd jest projects/ui-lib-custom/test/entry-points.spec.ts --runInBand --no-cache` (25/25, exit `0`, log `tmp/split-button-prompt9-entrypoints.log`).
- Library build passed: `npx.cmd ng build ui-lib-custom` (exit `0`, log `tmp/split-button-prompt9-lib-build.log`; non-blocking export-condition warning for `./speed-dial` and `./split-button` remains).
- Demo build passed: `npx.cmd ng build demo` (exit `0`, log `tmp/split-button-prompt9-demo-build.log`; pre-existing SCSS budget warnings for `button` and `date-picker` remain).
Terminal notes:
- Failed: initial strict checks flagged spec typing issues (`DebugElement` import source, dynamic signal access nullability, and `preventDefault` spy return type mismatch).
- Worked: patched `split-button.component.spec.ts`, reran `get_errors`, and executed all verification commands from `bash.exe` using `npx.cmd` with log/exit capture in `tmp/`.
- Warning: Angular build output still includes pre-existing non-blocking warnings noted above.
Next step: Resume queued backlog items (`knip`, constants extraction pass, overlay follow-ups).
```

```text
Date: 2026-04-19
Changed: knip.json, projects/ui-lib-custom/src/lib/core/shared/overlay-utils.ts, AI_AGENT_CONTEXT.md, docs/implementation/AI_AGENT_CONTEXT_ARCHIVE.md
State: Backlog verification split-runs continued. Generated report artifacts were cleaned, overlay append-target typing/lint was hardened, and knip baseline noise was reduced for intentional wrappers/scaffolding. Next: triage remaining knip findings into targeted cleanup patches.
Verification:
- Git state checked before/after runs: `git --no-pager status --short`.
- Generated report artifacts cleaned: restored `playwright-report/index.html` and `test-results/a11y-results.json`.
- Targeted diagnostics clean: `get_errors` on overlay-related backlog files.
- Overlay lint passed after typing fix: `npx.cmd eslint projects/ui-lib-custom/src/lib/core/shared/overlay-utils.ts --max-warnings 0` (exit `0`, log `tmp/backlog-overlay-eslint.log`).
- Knip rerun captured: `npm.cmd run knip` (log `tmp/backlog-knip.log`, exit `tmp/backlog-knip.exit` = `1`) with unused-files count reduced from 45 to 2.
Terminal notes:
- Failed: none in-session.
- Worked: all commands executed from `bash.exe` using `npm.cmd`/`npx.cmd` with log+exit capture in `tmp/`.
- Warning: knip still reports residual backlog items (unused deps/devDeps, unlisted deps/binaries, unresolved imports, and unused exports/types).
Next step: Address remaining knip items in batches (dependency/unresolved config, then export/type cleanup) while preserving entry-point and demo-only intentional files.
```

```text
Date: 2026-04-20
Changed: docs/research/CHART_RESEARCH.md, docs/research/README.md, AI_AGENT_CONTEXT.md, docs/implementation/AI_AGENT_CONTEXT_ARCHIVE.md
State: Chart: Prompt 1 complete. Research doc at `docs/research/CHART_RESEARCH.md`. Next: Prompt 2 (types & ChartThemeService).
Verification:
- PrimeNG v19 Chart API and implementation reviewed from packed sources (`chart.d.ts`, `primeng-chart.mjs`) captured to `tmp/chart-primeng-source.txt`.
- Chart.js v4 API contracts reviewed from packed sources (`dist/index.d.ts`, `dist/types/index.d.ts`) captured to `tmp/chartjs-source.txt`, `tmp/chartjs-api-snippets.txt`, and `tmp/chartjs-key-sections.txt`.
- Research doc presence verified: `sed -n '1,5p' docs/research/CHART_RESEARCH.md`.
Terminal notes:
- Failed: none in-session.
- Worked: all research commands executed from `bash.exe` using `npm.cmd pack` + `tar` extraction and local file inspection.
- Warning: npm pack output is verbose in terminal; focused snippets were redirected into `tmp/` artifacts for easier review.
Next step: Start Prompt 2 by adding Chart.js dependency wiring and implementing pure `ChartThemeService` types/contracts.
```

```text
Date: 2026-04-20
Changed: package.json, package-lock.json, projects/ui-lib-custom/package.json, projects/ui-lib-custom/src/lib/chart/chart.types.ts, projects/ui-lib-custom/src/lib/chart/chart-theme.service.ts, projects/ui-lib-custom/src/lib/chart/chart-theme.service.spec.ts, projects/ui-lib-custom/src/lib/chart/index.ts, AI_AGENT_CONTEXT.md, docs/implementation/AI_AGENT_CONTEXT_ARCHIVE.md
State: Chart: Prompt 2 complete. Types at `chart.types.ts`, `ChartThemeService` at `chart-theme.service.ts` with passing tests. Next: Prompt 3 (generic Chart component scaffold).
Verification:
- Chart.js dependency wired: `npm.cmd install chart.js --save-dev` (updates in root `package.json`/`package-lock.json`) and peer dependency added to `projects/ui-lib-custom/package.json`.
- Targeted diagnostics clean: `get_errors` on new chart files (`chart.types.ts`, `chart-theme.service.ts`, `chart-theme.service.spec.ts`, `index.ts`).
- Chart theme tests passed: `npx.cmd jest chart/chart-theme --coverage --runInBand --no-cache` (5/5 passing; `chart-theme.service.ts` coverage: 96% statements, 64.28% branches, 100% functions, 95.83% lines).
- Library build passed: `npx.cmd ng build ui-lib-custom`.
Terminal notes:
- Failed: none in-session.
- Worked: all commands executed from `bash.exe` using `npm.cmd`/`npx.cmd`.
- Warning: `jest` coverage output remains workspace-wide by default; chart-specific assertions were validated from the `lib/chart` section.
Next step: Prompt 3 — scaffold generic `ui-lib-chart` component and lifecycle integration around Chart.js instance management.
```

```text
Date: 2026-04-20
Changed: projects/ui-lib-custom/src/lib/chart/chart.component.ts, projects/ui-lib-custom/src/lib/chart/chart.component.html, projects/ui-lib-custom/src/lib/chart/chart.component.scss, projects/ui-lib-custom/src/lib/chart/provide-chart-defaults.ts, projects/ui-lib-custom/src/lib/chart/index.ts, AI_AGENT_CONTEXT.md, docs/implementation/AI_AGENT_CONTEXT_ARCHIVE.md
State: Chart: Prompt 3 complete. Generic `ChartComponent` with canvas lifecycle, theme integration, and reactive updates. Next: Prompt 4 (typed convenience components).
Verification:
- Targeted diagnostics clean: `get_errors` on chart scaffold files (`chart.component.ts/.html/.scss`, `provide-chart-defaults.ts`, `index.ts`) with one expected unused-symbol warning for helper exposure before first runtime usage.
- Library build passed: `npx.cmd ng build ui-lib-custom`.
Terminal notes:
- Failed: none in-session.
- Worked: commands executed from `bash.exe` using `npx.cmd`.
- Warning: `provideChartDefaults` currently reports as unused in direct file diagnostics until consumed by demo/component wiring in later prompts.
Next step: Prompt 4 — add typed convenience wrappers (`bar`, `line`, `pie`, `doughnut`) delegating to `ui-lib-chart`.
```

```text
Date: 2026-04-20
Changed: projects/ui-lib-custom/src/lib/chart/bar-chart.component.ts, projects/ui-lib-custom/src/lib/chart/bar-chart.component.html, projects/ui-lib-custom/src/lib/chart/line-chart.component.ts, projects/ui-lib-custom/src/lib/chart/line-chart.component.html, projects/ui-lib-custom/src/lib/chart/pie-chart.component.ts, projects/ui-lib-custom/src/lib/chart/pie-chart.component.html, projects/ui-lib-custom/src/lib/chart/doughnut-chart.component.ts, projects/ui-lib-custom/src/lib/chart/doughnut-chart.component.html, projects/ui-lib-custom/src/lib/chart/index.ts, AI_AGENT_CONTEXT.md, docs/implementation/AI_AGENT_CONTEXT_ARCHIVE.md
State: Chart: Prompt 4 complete. Four typed convenience components (Bar, Line, Pie, Doughnut) wrapping generic ChartComponent. Next: Prompt 5 (styling) and Prompt 6 (ChartThemeService tests) can run in parallel.
Verification:
- Targeted diagnostics clean: `get_errors` on all new wrapper component/template files and `projects/ui-lib-custom/src/lib/chart/index.ts`.
- Library build passed: `npx.cmd ng build ui-lib-custom`.
Terminal notes:
- Failed: none in-session.
- Worked: commands executed from `bash.exe` using `npx.cmd`.
- Warning: none.
Next step: Run Prompt 5 and Prompt 6 in parallel, then proceed to Prompt 7 component tests.
```

```text
Date: 2026-04-20
Changed: projects/ui-lib-custom/src/lib/chart/chart.component.scss, projects/ui-lib-custom/src/lib/design-tokens.ts, docs/reference/systems/CSS_VARIABLES.md, AI_AGENT_CONTEXT.md, docs/implementation/AI_AGENT_CONTEXT_ARCHIVE.md
State: Chart: Prompt 5 complete. Full SCSS styling with CSS variable tokens and variant overrides. Next: Prompt 7 (component tests) — or Prompt 6 if not yet done.
Verification:
- Targeted diagnostics clean: `get_errors` on `projects/ui-lib-custom/src/lib/chart/chart.component.scss` and `docs/reference/systems/CSS_VARIABLES.md` (design token file reports existing repository-level unused-symbol warnings only).
- Library build passed: `npx.cmd ng build ui-lib-custom`.
Terminal notes:
- Failed: none in-session.
- Worked: commands executed from `bash.exe` using `npx.cmd`.
- Warning: `projects/ui-lib-custom/src/lib/design-tokens.ts` still reports pre-existing non-blocking unused export warnings under strict diagnostics.
Next step: Run Prompt 6 (ChartThemeService-focused tests) and then Prompt 7 component tests.
```

```text
Date: 2026-04-20
Changed: projects/ui-lib-custom/src/lib/chart/chart-theme.service.spec.ts, AI_AGENT_CONTEXT.md, docs/implementation/AI_AGENT_CONTEXT_ARCHIVE.md
State: Chart: Prompt 6 complete. ChartThemeService tests passing with >90% coverage. Next: Prompt 7 (component tests).
Verification:
- Expanded pure-class `ChartThemeService` test matrix for token defaults/overrides, whitespace/number parsing, partial fallbacks, options mapping, and palette edge cases.
- Targeted diagnostics clean: `get_errors` on `projects/ui-lib-custom/src/lib/chart/chart-theme.service.spec.ts`.
- Chart theme tests passed: `npx.cmd jest chart/chart-theme --coverage --runInBand --no-cache` (16/16 passing; `chart-theme.service.ts`: 100% statements, 77.77% branches, 100% functions, 100% lines).
Terminal notes:
- Failed: none in-session.
- Worked: commands executed from `bash.exe` using `npx.cmd`.
- Warning: workspace-wide coverage table still includes unrelated files at 0%; `lib/chart/chart-theme.service.ts` remains the scoped success metric for this prompt.
Next step: Prompt 7 — add component tests for generic and convenience chart wrappers.
```

```text
Date: 2026-04-20
Changed: projects/ui-lib-custom/src/lib/chart/chart.component.spec.ts, projects/ui-lib-custom/src/lib/chart/bar-chart.component.spec.ts, projects/ui-lib-custom/src/lib/chart/line-chart.component.spec.ts, projects/ui-lib-custom/src/lib/chart/pie-chart.component.spec.ts, projects/ui-lib-custom/src/lib/chart/doughnut-chart.component.spec.ts, AI_AGENT_CONTEXT.md
State: Chart: Prompt 7 cleanup in progress. Removed direct `Chart` imports in wrapper specs and switched constructor access to `jest.requireMock('chart.js')`; full `jest chart --coverage` run remains red due `chart.component.spec.ts` using real Chart.js at runtime. Next: stabilize `chart.component.spec.ts` mock wiring so the chart suite is fully green.
Verification:
- Removed direct `Chart` imports and updated constructor mock access in wrapper specs (`bar`, `line`, `pie`, `doughnut`) to avoid unused-import lint violations.
- Targeted diagnostics clean: `get_errors` on all four wrapper specs reports no errors.
- Full chart run executed: `npx.cmd jest chart --coverage --runInBand --no-cache --silent` -> FAIL (1 suite failed, 5 passed; failures isolated to `projects/ui-lib-custom/src/lib/chart/chart.component.spec.ts`, wrappers pass).
- Isolated confirmation run: `npx.cmd jest projects/ui-lib-custom/src/lib/chart/chart.component.spec.ts --runInBand --no-cache --silent` -> FAIL (10 failing tests, mock constructor not intercepted; real Chart.js instance created).
Terminal notes:
- Failed: `npx.cmd jest chart --coverage --runInBand --no-cache` and `--silent` variant fail due `chart.component.spec.ts` mock mismatch.
- Worked: `get_errors` validation for wrapper specs succeeded from editor tooling.
- Shell: commands executed from `bash.exe` using `npx.cmd`.
Next step: Rework `chart.component.spec.ts` mock strategy (module load order / constructor interception) and rerun `npx.cmd jest chart --coverage --runInBand --no-cache` until fully green.
```

```text
Date: 2026-04-20
Changed: projects/ui-lib-custom/src/lib/chart/chart.component.spec.ts, projects/ui-lib-custom/src/lib/chart/bar-chart.component.spec.ts, projects/ui-lib-custom/src/lib/chart/line-chart.component.spec.ts, projects/ui-lib-custom/src/lib/chart/pie-chart.component.spec.ts, projects/ui-lib-custom/src/lib/chart/doughnut-chart.component.spec.ts, AI_AGENT_CONTEXT.md, docs/implementation/AI_AGENT_CONTEXT_ARCHIVE.md
State: Chart: Prompt 7 complete. Wrapper spec cleanup finished (no direct `Chart` imports), `chart.component.spec.ts` mock wiring stabilized, and full chart coverage suite is green. Next: Prompt 8 (secondary entry point + entry-point regression) if queued.
Verification:
- Removed direct `Chart` imports from wrapper specs (`bar`, `line`, `pie`, `doughnut`) and switched constructor access to `jest.requireMock('chart.js')` to clear unused-import lint noise.
- Updated `chart.component.spec.ts` to load `ChartComponent` via `jest.requireActual('./chart.component')` after `jest.mock('chart.js')`, preserving constructor interception in this spec.
- Targeted diagnostics clean: `get_errors` reports no errors in all chart spec files.
- Isolated component suite passed: `npx.cmd jest projects/ui-lib-custom/src/lib/chart/chart.component.spec.ts --runInBand --no-cache --silent` (17/17).
- Full chart run passed: `npx.cmd jest chart --coverage --runInBand --no-cache --silent` (6/6 suites, 44/44 tests).
- Coverage (`lib/chart`): `chart.component.ts` 97.33% statements, 91.3% branches, 100% functions, 97.29% lines.
Terminal notes:
- Failed: initial `npx.cmd jest chart --coverage --runInBand --no-cache` attempt exposed `chart.component.spec.ts` mock interception mismatch.
- Worked: restructured `chart.component.spec.ts` module loading and reran isolated + full chart suites from `bash.exe` using `npx.cmd`.
- Warning: coverage table remains workspace-wide by config; chart-specific success should be read from `lib/chart` rows.
Next step: Proceed to Prompt 8 wiring (`ui-lib-custom/chart` secondary entry point and entry-point regression verification) if this prompt chain continues.
```

```text
Date: 2026-04-20
Changed: projects/ui-lib-custom/chart/ng-package.json, projects/ui-lib-custom/chart/package.json, projects/ui-lib-custom/chart/public-api.ts, projects/ui-lib-custom/test/entry-points.spec.ts, AI_AGENT_CONTEXT.md, docs/implementation/AI_AGENT_CONTEXT_ARCHIVE.md
State: Chart: Prompt 8 complete. Secondary entry point `ui-lib-custom/chart` wired. Next: Prompt 9 (demo page).
Verification:
- Added `projects/ui-lib-custom/chart/` secondary entry-point files (`ng-package.json`, `package.json`, `public-api.ts`) following the established thin re-export pattern.
- Updated `projects/ui-lib-custom/test/entry-points.spec.ts` with `ui-lib-custom/chart` import regression coverage.
- Verified `projects/ui-lib-custom/src/public-api.ts` does not re-export chart symbols.
- Entry-point regression passed: `npx.cmd jest projects/ui-lib-custom/test/entry-points.spec.ts --runInBand --no-cache` (26/26 including `ui-lib-custom/chart`).
- Library build attempt: `npx.cmd ng build ui-lib-custom` -> FAIL due pre-existing Chart TypeScript issues in `projects/ui-lib-custom/src/lib/chart/*.ts` (`ViewChildSignal` import and strict index-signature access diagnostics), not from Prompt 8 entry-point file wiring.
Terminal notes:
- Failed: initial `create_file`/`apply_patch` attempts to create `projects/ui-lib-custom/chart/package.json` and `projects/ui-lib-custom/chart/public-api.ts` timed out.
- Worked: created the two timed-out files via `bash.exe` heredoc fallback, then reran diagnostics and verification commands with `npx.cmd`.
- Warning: `get_errors` shows non-blocking schema path warnings for `projects/ui-lib-custom/chart/ng-package.json` (`$schema` path resolution in editor tooling).
Next step: Prompt 9 demo page work, or first fix the pre-existing Chart compile diagnostics if a fully green `ng build ui-lib-custom` gate is required before demo integration.
```

```text
Date: 2026-04-20
Changed: projects/ui-lib-custom/src/lib/chart/chart.component.ts, projects/ui-lib-custom/src/lib/chart/bar-chart.component.ts, projects/ui-lib-custom/src/lib/chart/line-chart.component.ts, projects/ui-lib-custom/src/lib/chart/pie-chart.component.ts, projects/ui-lib-custom/src/lib/chart/doughnut-chart.component.ts, AI_AGENT_CONTEXT.md, docs/implementation/AI_AGENT_CONTEXT_ARCHIVE.md
State: Chart: Prompt 8 follow-up compile fixes complete. `ui-lib-custom/chart` now builds cleanly with strict diagnostics and entry-point regression remains green. Next: Prompt 9 (demo page).
Verification:
- Replaced unsupported `ViewChildSignal` typings with `Signal<... | undefined>` across chart wrapper components and generic chart canvas query.
- Refactored `ChartComponent.mergeOptions` scale merging to strict-safe record access using bracket notation for `x`/`y` scale keys and nested `ticks`/`grid`/`border` merges.
- Switched chart wrapper `chart.js` imports to type-only where runtime values are not used.
- Library build passed: `npx.cmd ng build ui-lib-custom` (includes `ui-lib-custom/chart` entry point).
- Entry-point regression passed: `npx.cmd jest projects/ui-lib-custom/test/entry-points.spec.ts --runInBand --no-cache` (26/26).
Terminal notes:
- Failed: none in-session.
- Worked: all verification commands executed from `bash.exe` using `npx.cmd`.
- Warning: `get_errors` still reports non-blocking "unused method" warnings in some chart wrappers for public helper methods (`getChartInstance`, `refresh`); no build/test impact.
Next step: Prompt 9 — wire chart demo page and route/navigation coverage.
```

```text
Date: 2026-04-20
Changed: projects/demo/src/app/pages/chart/chart-demo.component.ts, projects/demo/src/app/pages/chart/chart-demo.component.html, projects/demo/src/app/pages/chart/chart-demo.component.scss, projects/demo/src/app/layout/sidebar/sidebar.component.ts, AI_AGENT_CONTEXT.md, docs/implementation/AI_AGENT_CONTEXT_ARCHIVE.md
State: Chart: Prompt 9 complete. Demo page with 16-18 scenarios. Next: Prompt 10 (documentation & final QA).
Verification:
- Replaced chart demo placeholder with a full 18-section docs page covering wrappers, generic chart types, multi-dataset/stacked/mixed scenarios, size/dimension variants, dynamic updates, theme token bridge, click events, and custom options.
- Ensured chart runtime registration is routed through `provideChartDefaults()` in the demo component constructor (no direct `Chart.register()` usage in demo code).
- Confirmed route wiring for `path: 'chart'` already exists in `projects/demo/src/app/app.routes.ts` and load path remains correct (`./pages/chart/chart-demo.component`).
- Removed `badge: 'TODO'` from the Chart item in `projects/demo/src/app/layout/sidebar/sidebar.component.ts`.
- Demo build passed: `npx.cmd ng build demo`.
- Route probe passed: `curl -I http://localhost:4200/chart` returned HTTP 200.
Terminal notes:
- Failed: none in-session.
- Worked: build and route probe executed from `bash.exe` using `npx.cmd` and `curl`.
- Warning: demo build still reports pre-existing SCSS budget warnings for `button.scss` and `date-picker.scss`.
Next step: Prompt 10 - documentation updates and final QA sweep for chart component/demo parity.
```

```text
Date: 2026-04-20
Changed: docs/reference/components/CHART.md, docs/reference/components/README.md, projects/ui-lib-custom/src/lib/chart/chart-theme.service.spec.ts, AI_AGENT_CONTEXT.md, docs/implementation/AI_AGENT_CONTEXT_ARCHIVE.md
State: Chart: Prompt 10 complete. Fully implemented, tested, documented, and demoed. Next: Backlog follow-ups / v2 features only.
Verification:
- Added new reference doc `docs/reference/components/CHART.md` covering overview, features, installation, usage, API tables, theming tokens, advanced usage, accessibility, and performance guidance.
- Updated component index `docs/reference/components/README.md` with Chart section + quick reference row.
- Library build passed: `npx.cmd ng build ui-lib-custom`.
- Chart tests with coverage passed: `npx.cmd jest chart --coverage --runInBand --no-cache` (6/6 suites, 44/44 tests; `chart.component.ts` 97.89% statements, 90.62% branches, 100% functions, 97.87% lines).
- Chart lint passed after strict typing fixes in `chart-theme.service.spec.ts`: `npx.cmd eslint projects/ui-lib-custom/src/lib/chart/`.
- Entry-point test passed: `npx.cmd jest projects/ui-lib-custom/test/entry-points.spec.ts --runInBand --no-cache` (26/26).
- Demo build passed: `npx.cmd ng build demo`.
- Demo route probe passed: `curl -I http://localhost:4200/chart` returned HTTP 200.
- Architecture checks verified:
  - no cross-entry-point relative imports in chart source (`grep_search` for `from '../` returned none),
  - primary `projects/ui-lib-custom/src/public-api.ts` does not re-export chart symbols,
  - chart components use `ViewEncapsulation.None` + `ChangeDetectionStrategy.OnPush`,
  - signal inputs/outputs only (no `@Input`/`@Output` decorators),
  - no `enum` usage in chart source,
  - chart CSS variables use `--uilib-chart-*` prefix consistently.
Terminal notes:
- Failed: initial QA lint command failed on `chart-theme.service.spec.ts` strict typing (`typedef`, `no-unsafe-member-access`); fixed in-session.
- Worked: all verification commands executed from `bash.exe` using `npx.cmd` and `curl`.
- Warning: `ng build demo` still reports pre-existing SCSS budget warnings for `button.scss` and `date-picker.scss`.
Next step: Resume backlog batches (`knip` cleanup, constants extraction, overlay follow-ups) or chart v2 enhancements if prioritized.
```

```text
Date: 2026-04-20
Changed: docs/research/DATAVIEW_RESEARCH.md, AI_AGENT_CONTEXT.md, docs/implementation/AI_AGENT_CONTEXT_ARCHIVE.md
State: DataView: Prompt 1 complete. Research doc at `docs/research/DATAVIEW_RESEARCH.md`. Next: Prompt 2 (types, constants & template directives).
Verification:
- PrimeNG v19 DataView and paginator artifacts reviewed via `npm.cmd pack primeng@19 --silent` + extracted package inspection (`dataview.d.ts`, `dataview.interface.d.ts`, `primeng-dataview.mjs`, `paginator.d.ts`).
- Documented API surface (inputs/defaults, outputs, template slots), paginator coupling, sorting behavior, layout switching, and loading/empty rendering in `docs/research/DATAVIEW_RESEARCH.md`.
- Explicitly captured project divergences and value-add decisions (signal APIs, directive-based template slots, built-in pagination, external-only sort ownership, typed generic contexts).
Terminal notes:
- Failed: none in-session.
- Worked: artifact inspection executed from `bash.exe` using `npm.cmd`, `tar`, `sed`, and `grep`.
Next step: Prompt 2 - define `DataView` types/constants and implement template marker directives.
```

```text
Date: 2026-04-20
Changed: projects/ui-lib-custom/src/lib/data-view/data-view.types.ts, projects/ui-lib-custom/src/lib/data-view/data-view.constants.ts, projects/ui-lib-custom/src/lib/data-view/data-view.template-directives.ts, projects/ui-lib-custom/src/lib/data-view/index.ts, AI_AGENT_CONTEXT.md, docs/implementation/AI_AGENT_CONTEXT_ARCHIVE.md
State: DataView: Prompt 2 complete. Types, constants, and 8 template directives defined. Next: Prompt 3 (component scaffold with core rendering & layout).
Verification:
- Added DataView type contracts with `as const` unions and event/template-context interfaces in `projects/ui-lib-custom/src/lib/data-view/data-view.types.ts`.
- Added shared defaults/constants in `projects/ui-lib-custom/src/lib/data-view/data-view.constants.ts`.
- Added 8 standalone template marker directives in `projects/ui-lib-custom/src/lib/data-view/data-view.template-directives.ts` following the AutoComplete projection pattern.
- Added barrel exports in `projects/ui-lib-custom/src/lib/data-view/index.ts`.
- Library build passed: `npx.cmd ng build ui-lib-custom`.
Terminal notes:
- Failed: none in-session.
- Worked: file scaffolding and verification commands executed from `bash.exe` using `mkdir`, `npx.cmd`, and workspace tooling.
Next step: Prompt 3 - scaffold `DataView` component with core rendering and layout switching.
```

```text
Date: 2026-04-20
Changed: projects/ui-lib-custom/src/lib/data-view/data-view.component.ts, projects/ui-lib-custom/src/lib/data-view/data-view.component.html, projects/ui-lib-custom/src/lib/data-view/data-view.component.scss, projects/ui-lib-custom/src/lib/data-view/index.ts, projects/ui-lib-custom/src/lib/data-view/data-view.types.ts, AI_AGENT_CONTEXT.md, docs/implementation/AI_AGENT_CONTEXT_ARCHIVE.md
State: DataView: Prompt 3 complete. Core component with list/grid rendering, template projection, loading/empty states. Next: Prompt 4 (pagination & sorting).
Verification:
- Added standalone `DataViewComponent` scaffold in `projects/ui-lib-custom/src/lib/data-view/data-view.component.ts` with signal inputs/model, content template queries, computed rendering state, host class bindings, and `trackItem` tracking fallback logic.
- Added template shell in `projects/ui-lib-custom/src/lib/data-view/data-view.component.html` with header/footer slots, loading and empty states, and list/grid item rendering via `@for` + `ngTemplateOutlet`.
- Added Prompt 5 placeholder stylesheet in `projects/ui-lib-custom/src/lib/data-view/data-view.component.scss`.
- Updated barrel exports in `projects/ui-lib-custom/src/lib/data-view/index.ts` to include `DataViewComponent`.
- Library build passed: `npx.cmd ng build ui-lib-custom`.
Terminal notes:
- Failed: none in-session.
- Worked: implementation and verification commands executed from `bash.exe` using `npx.cmd` and workspace editing tools.
Next step: Prompt 4 - add built-in pagination and external sort signal wiring.
```

```text
Date: 2026-04-20
Changed: projects/ui-lib-custom/src/lib/data-view/data-view.component.ts, projects/ui-lib-custom/src/lib/data-view/data-view.component.html, AI_AGENT_CONTEXT.md, docs/implementation/AI_AGENT_CONTEXT_ARCHIVE.md
State: DataView: Prompt 4 complete. Built-in pagination (client-side + server-side) and sorting wiring. Next: Prompt 5 (styling) and Prompt 6 (tests) can run in parallel.
Verification:
- Extended `DataViewComponent` with pagination inputs (`paginator`, `rows`, `first`, `totalRecords`, `rowsPerPageOptions`, `paginatorPosition`, page report options), sorting inputs (`sortField`, `sortOrder`), outputs (`pageChange`, `sortChange`), and paginator side template slots.
- Added pagination computed signals and behavior: effective total/rows, page count/current page, first/last state, page-report placeholder replacement, client-side slicing vs server-side passthrough, and first-index clamping when data/page bounds change.
- Added inline pagination UI to `data-view.component.html` with top/bottom/both placement, ARIA-labeled first/prev/page/next/last controls, ellipsis gaps, rows-per-page selector, page report text, and left/right paginator template slots.
- Library build passed: `npx.cmd ng build ui-lib-custom`.
Terminal notes:
- Failed: none in-session.
- Worked: implementation and verification commands executed from `bash.exe` using `npx.cmd` and workspace editing tools.
Next step: Prompt 5 styling and Prompt 6 tests can proceed in parallel.
```

```text
Date: 2026-04-20
Changed: projects/ui-lib-custom/src/lib/data-view/data-view.component.scss, projects/ui-lib-custom/src/lib/data-view/data-view.component.html, projects/ui-lib-custom/src/lib/design-tokens.ts, docs/reference/systems/CSS_VARIABLES.md, AI_AGENT_CONTEXT.md, docs/implementation/AI_AGENT_CONTEXT_ARCHIVE.md
State: DataView: Prompt 5 complete. Full SCSS styling with CSS variable tokens, variant overrides, and pagination UI styles. Next: Prompt 6 (tests) if not already running in parallel.
Verification:
- Implemented full DataView SCSS in `projects/ui-lib-custom/src/lib/data-view/data-view.component.scss` covering header/footer, list/grid rendering, loading/empty states, paginator controls, responsive size variants (`sm`/`md`/`lg`), and Material/Bootstrap/Minimal variant overrides.
- Added paginator page-group class usage in `projects/ui-lib-custom/src/lib/data-view/data-view.component.html` to align template structure with styling hooks.
- Registered DataView token definitions in `projects/ui-lib-custom/src/lib/design-tokens.ts` (`DataViewTokens`, `DATAVIEW_TOKENS`, `DataViewTokenKey`).
- Added `## DataView` CSS variable reference section to `docs/reference/systems/CSS_VARIABLES.md`.
- Library build passed: `npx.cmd ng build ui-lib-custom`.
Terminal notes:
- Failed: none in-session.
- Worked: implementation and verification commands executed from `bash.exe` using `npx.cmd` and workspace editing tools.
Next step: Prompt 6 - add unit tests for rendering, pagination behavior, and template-slot coverage.
```

```text
Date: 2026-04-21
Changed: projects/ui-lib-custom/src/lib/data-view/data-view.component.spec.ts, AI_AGENT_CONTEXT.md, docs/implementation/AI_AGENT_CONTEXT_ARCHIVE.md
State: DataView: Prompt 6 complete. Component tests passing with >90% coverage. Next: Prompt 7 (secondary entry point) if not already done.
Verification:
- Refactored `DataView` host test setup to signal-backed bindings with `ChangeDetectionStrategy.OnPush` and `provideZonelessChangeDetection()` for reliable zoneless input updates.
- Expanded/verified coverage across rendering, template projection, layout switching, client/server pagination, sorting, edge cases (including `null`/`undefined` value handling), and accessibility assertions.
- Jest command passed: `npx.cmd jest data-view --coverage --runInBand --no-cache`.
- Coverage (`projects/ui-lib-custom/src/lib/data-view/data-view.component.ts`): 95.06% statements, 80% branches, 100% functions, 94.93% lines.
Terminal notes:
- Failed: none in-session.
- Worked: verification command executed from `bash.exe` using `npx.cmd`.
Next step: Prompt 7 - wire/verify the `ui-lib-custom/data-view` secondary entry point if still pending.
```



---

Date: 2026-04-24
Changed:
  - projects/ui-lib-custom/src/lib/timeline/ (all 8 files: types, constants, directives, component ts/html/scss, spec, index)
  - projects/ui-lib-custom/timeline/ (ng-package.json, package.json, public-api.ts -- secondary entry point)
  - projects/ui-lib-custom/package.json (exports + typesVersions for timeline)
  - projects/ui-lib-custom/test/entry-points.spec.ts (timeline import test added)
  - projects/demo/src/app/pages/timeline/ (full demo -- TS, HTML, SCSS -- 8 scenarios)
  - docs/reference/components/TIMELINE.md (new)
  - docs/reference/components/README.md (Timeline row added)
  - AI_AGENT_CONTEXT.md (Timeline marked complete)
  - projects/ui-lib-custom/src/lib/table/table.component.spec.ts (full rewrite: all 287 lint errors fixed)
  - projects/demo/src/app/pages/table/table-demo.component.ts (repaired truncation; lint clean)
  - CLAUDE.md (lint step added to Key Commands and component checklist)
  - COMPONENT_CREATION_GUIDE.md (Step 8 expanded with mandatory lint command)
  - LIBRARY_CONVENTIONS.md (ESLint added as first active check in Code Quality Checklist)
State: Timeline and Table both lint-clean. 51/51 table tests, 31/31 timeline tests. Build passing.
Verification: npx eslint projects/ui-lib-custom/src/lib/timeline/ --max-warnings 0 (CLEAN),
  npx eslint projects/ui-lib-custom/src/lib/table/ --max-warnings 0 (CLEAN),
  npx jest --testPathPatterns=timeline (31/31), npx jest --testPathPatterns=table (51/51),
  npx jest --testPathPatterns=entry-points (33/33 PASS), ng build ui-lib-custom (all entry points).
Terminal notes: python3 not available -- use python. All file writes done via python open(..., w, newline=LF).
  Write/Edit tools produce trailing null bytes on files >800 lines -- strip with Python data.rstrip(b'\x00').
Next step: Write docs/reference/components/TABLE.md, then begin knip baseline + dead-code cleanup.

---

Date: 2026-04-24
Changed:
  - projects/ui-lib-custom/src/lib/pick-list/ (all 7 files: types, constants, directives, component ts/html/scss, spec, index)
  - projects/ui-lib-custom/pick-list/ (ng-package.json, package.json, public-api.ts)
  - projects/ui-lib-custom/package.json (exports + typesVersions for pick-list)
  - projects/ui-lib-custom/test/entry-points.spec.ts (pick-list import test)
  - projects/demo/src/app/pages/pick-list/ (pick-list-demo.component ts/html/scss -- new)
  - projects/demo/src/app/layout/sidebar/sidebar.component.ts (removed badge: TODO for PickList)
  - docs/reference/components/PICKLIST.md (new)
  - docs/reference/components/README.md (added PickList row)
State: PickList fully complete -- source, entry point, tests (52/52 passing), demo page, docs.
  Multiple pre-existing truncated files also repaired as collateral.
Verification: npx jest --testPathPatterns=pick-list (52/52), npx jest --testPathPatterns=entry-points (31/31),
  ng build demo --configuration=development (success, 1 pre-existing warning).
Terminal notes: Edit/Write tools produce CRLF corruption and trailing null bytes -- all file writes done via Python.
Next step: Run full test suite (npm test) to confirm no regressions, then knip baseline + dead-code cleanup pass.

---
Date: 2026-04-28 [listbox session]
Changed:
  - projects/ui-lib-custom/src/lib/listbox/ (new — listbox.types.ts, listbox.constants.ts,
    listbox.component.ts, listbox.component.html, listbox.component.scss,
    listbox.component.spec.ts, index.ts, public-api.ts)
  - projects/ui-lib-custom/listbox/ (new secondary entry point — ng-package.json, package.json)
  - projects/ui-lib-custom/package.json (added listbox to exports + typesVersions via Python)
  - projects/ui-lib-custom/test/entry-points.spec.ts (added listbox import test)
  - projects/demo/src/app/pages/listbox/ (full demo — TS/HTML/SCSS, 9 scenarios)
  - docs/reference/components/LISTBOX.md (new — full API + theming + a11y + keyboard docs)
  - projects/ui-lib-custom/src/lib/knob/knob.component.ts (repaired pre-existing truncation)
State: Listbox fully complete. Single/multiple selection, inline filtering, option groups,
  checkbox mode, toggle-all, CVA, full ARIA, keyboard nav, three variants/sizes. 55/55 tests,
  42/42 entry-point tests. ESLint clean. Library build zero errors.
Verification:
  npx eslint projects/ui-lib-custom/src/lib/listbox/ projects/demo/src/app/pages/listbox/ --max-warnings 0 (CLEAN),
  npx ng build ui-lib-custom (all entry points, zero errors),
  npx jest --testPathPatterns="listbox" --no-cache (55/55 PASS),
  npx jest --testPathPatterns="entry-points" --no-cache (42/42 PASS).
Terminal notes: Write tool truncates large .ts files — always write files >300 lines via Python.
Next step: Overlay follow-ups (appendTo / z-index manager), or component v2 enhancements.

Date: 2026-04-30 [panel-menu session]
Changed:
  - projects/ui-lib-custom/src/lib/panel-menu/ (new — panel-menu.types.ts, panel-menu-context.ts, panel-menu-sub.ts, panel-menu-sub.html, panel-menu.ts, panel-menu.html, panel-menu.scss, panel-menu.spec.ts, index.ts)
  - projects/ui-lib-custom/panel-menu/ (new secondary entry point — ng-package.json, package.json)
  - projects/ui-lib-custom/package.json (panel-menu added to exports + typesVersions)
  - projects/ui-lib-custom/test/entry-points.spec.ts (panel-menu import test added)
  - projects/demo/src/app/pages/panel-menu/ (full demo replacing placeholder — TS/HTML/SCSS, 8 sections + API tables)
  - projects/demo/src/app/layout/sidebar/sidebar.component.ts (removed TODO badge from PanelMenu)
  - AI_AGENT_CONTEXT.md (marked PanelMenu complete)
State: PanelMenu component fully complete. 25 unit tests passing. 60/60 entry-point tests passing. ESLint clean. Build zero errors.
Verification: ESLint clean, npm run build green, 25/25 PASS, 60/60 PASS.
Next step: TieredMenu or knip baseline.

Date: 2026-04-30 [menubar session]
Changed:
  - projects/ui-lib-custom/src/lib/menubar/ (new — menubar.types.ts, menubar-submenu.ts, menubar-submenu.html, menubar-submenu.scss, menubar.ts, menubar.html, menubar.scss, menubar.spec.ts, index.ts)
  - projects/ui-lib-custom/menubar/ (new secondary entry point — ng-package.json, package.json)
  - projects/ui-lib-custom/package.json (menubar added to exports + typesVersions)
  - projects/ui-lib-custom/test/entry-points.spec.ts (menubar import test added)
  - projects/demo/src/app/pages/menubar/ (new demo page — TS/HTML/SCSS, 8 sections + API tables)
  - projects/demo/src/app/layout/sidebar/sidebar.component.ts (removed TODO badge from Menubar)
State: Menubar component fully complete. 42 unit tests passing. 59/59 entry-point tests passing. ESLint clean. Build zero errors.
Verification: ESLint clean, npm run build green, 42/42 PASS, 59/59 PASS.
Next step: knip baseline or overlay follow-ups.

Date: 2026-04-30 [mega-menu session]
Changed:
  - projects/ui-lib-custom/src/lib/mega-menu/ (new — full implementation)
  - projects/ui-lib-custom/mega-menu/ (new secondary entry point)
  - projects/ui-lib-custom/package.json (mega-menu added)
  - projects/ui-lib-custom/test/entry-points.spec.ts (mega-menu import test added)
  - projects/demo/src/app/pages/mega-menu/ (new demo page)
  - projects/demo/src/app/pages/mega-menu/mega-menu-demo.component.html (ESLint parse error fixed)
State: MegaMenu fully complete. 51 unit tests passing. 58/58 entry-point tests passing. ESLint clean. Build zero errors.
Verification: ESLint clean, npm run build green, 51/51 PASS, 58/58 PASS.
Next step: knip baseline or overlay follow-ups.

Date: 2026-04-30 [menu session]
Changed:
  - projects/ui-lib-custom/src/lib/menu/ (new — full implementation)
  - projects/ui-lib-custom/menu/ (new secondary entry point)
  - projects/ui-lib-custom/package.json (menu added)
  - projects/ui-lib-custom/test/entry-points.spec.ts (menu import test added)
  - projects/demo/src/app/pages/menu/ (new demo page)
State: Menu component fully complete. Entry-point tests passing. ESLint clean. Build zero errors.
Next step: MegaMenu or Menubar.

Date: 2026-05-11 [Table component — accessibility hardening COMPLETE (#32)]
Changed:
  - projects/ui-lib-custom/src/lib/table/table.component.ts
      • Replaced the old component-only ID with module-level `nextTableId: number`, `tableId`, and `captionId`
      • Added dynamic `tableRole` (`grid` for sortable/selectable tables, `table` otherwise)
      • Added caption-based `aria-labelledby`, `aria-multiselectable`, paginated `aria-rowcount`, and roving grid focus helpers
      • Added keyboard cell navigation with Arrow/Home/End handling for interactive grid mode
  - projects/ui-lib-custom/src/lib/table/table.component.html
      • Added rowgroup/row/columnheader/gridcell semantics, `aria-rowindex` / `aria-colindex`, row selection state, and empty-state live region
      • Wired roving tabindex attributes/data hooks to auto-generated header and body cells
  - projects/ui-lib-custom/src/lib/table/table.component.scss
      • Added focus-visible styling for focusable cells and a reduced-motion override for row/filter/expander transitions
  - projects/ui-lib-custom/src/lib/table/table.component.spec.ts
      • Updated sortable-header tabindex expectations to match roving tabindex behavior
  - projects/ui-lib-custom/src/lib/table/table.a11y.spec.ts (CREATED — 33 tests)
  - projects/ui-lib-custom/src/lib/table/README.md
  - docs/COMPONENT_SCORES.md — Table: ⏳ Queued → ✅ Done; score avg 8.6
State: Table hardening complete. Dynamic grid/table semantics, roving grid keyboard navigation, reduced-motion, and a11y coverage.
Verification: All four verification commands PASS.
Next step: TreeTable (#33) hardening.

Date: 2026-05-11 [Latest merge conflict verification for table hardening PR]
Changed:
  - AI_AGENT_CONTEXT.md
      • Resolved the newest conflict against origin/main by preserving the current Table → TreeTable session state
      • Kept active handoffs trimmed to the newest three entries and moved the older Stepper handoff to the archive
State: Branch is merged with the latest origin/main again. This merge only required resolving AI_AGENT_CONTEXT.md.
Verification:
  node_modules/.bin/jest --testPathPatterns=entry-points --no-coverage (97/97 PASS)
  npm run typecheck (PASS)
  node_modules/.bin/ng build ui-lib-custom (PASS)
Next step: TreeTable (#33) hardening — start Tier 4 Data Display treegrid pass.

Date: 2026-05-11 [Merge conflict resolution refresh for table hardening PR]
Changed:
  - AI_AGENT_CONTEXT.md — Resolved conflict; kept Table → TreeTable session state, preserved Stepper handoff
State: Branch merged with origin/main. Manual conflict resolution isolated to AI_AGENT_CONTEXT.md.
Verification: All four verification commands PASS.
Next step: TreeTable (#33) hardening.

Date: 2026-05-11 [ContextMenu — 6-phase hardening COMPLETE (#14)]
Changed:
  - projects/ui-lib-custom/src/lib/context-menu/context-menu.ts
  - projects/ui-lib-custom/src/lib/context-menu/context-menu.html
  - projects/ui-lib-custom/src/lib/context-menu/context-menu.scss
  - projects/ui-lib-custom/src/lib/context-menu/context-menu.a11y.spec.ts
  - projects/ui-lib-custom/src/lib/context-menu/README.md
  - docs/COMPONENT_SCORES.md
  - AI_AGENT_CONTEXT.md
State: Complete
  Phase 3 (A11y):
    • CRITICAL FIX: Removed aria-hidden="true" from role="separator" items (top-level + submenu)
    • CRITICAL FIX: Added roving tabindex for top-level items (single tabindex="0")
    • CRITICAL FIX: Added focus capture/restore flow for Escape/programmatic close paths
    • MODERATE FIX: Tab key now closes the menu without blocking natural tab order
    • MODERATE FIX: Added prefers-reduced-motion handling for panel/caret transitions
    • Created context-menu.a11y.spec.ts (31 tests)
  Phase 1: Added module-level ID counter + contextMenuId and rovingIndex reset on show.
  Phase 2: README now documents trigger ARIA pattern, keyboard map, accessibility notes, and CSS variables.
Verification:
  node_modules/.bin/eslint projects/ui-lib-custom/src/lib/context-menu/ --max-warnings 0 (PASS)
  node_modules/.bin/jest --testPathPatterns=context-menu --no-coverage (86/86 PASS)
  node_modules/.bin/ng build ui-lib-custom (PASS)
  node_modules/.bin/jest --testPathPatterns=entry-points --no-coverage (97/97 PASS)
Next step: PanelMenu hardening (Tier 2, #15).
