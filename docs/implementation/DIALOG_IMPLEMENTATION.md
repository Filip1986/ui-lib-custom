# Dialog Implementation

## Status

This document describes the current shipped implementation of `ui-lib-dialog`.

- Component source: `projects/ui-lib-custom/src/lib/dialog/dialog.component.ts`
- Template: `projects/ui-lib-custom/src/lib/dialog/dialog.component.html`
- Styles: `projects/ui-lib-custom/src/lib/dialog/dialog.component.scss`
- Animations: `projects/ui-lib-custom/src/lib/dialog/dialog-animations.ts`
- Constants/types: `projects/ui-lib-custom/src/lib/dialog/dialog.constants.ts`, `projects/ui-lib-custom/src/lib/dialog/dialog.types.ts`

For earlier exploration and API planning, see:

- `docs/architecture/DIALOG_RESEARCH.md`
- `docs/architecture/DIALOG_TOKENS.md`
- `docs/architecture/DIALOG_API_DESIGN.md`

## Architecture Overview

`DialogComponent` is a standalone, host-driven overlay component.

### Internal structure

- Host classes and state are computed in `dialog.component.ts` (`hostClasses`, `panelClasses`, `panelStyles`).
- Template has three major regions in `dialog.component.html`:
  1. conditional backdrop (`@if (visible() && modal())`)
  2. conditional render gate (`@if (visible())`)
  3. `headless` branch vs built-in panel branch
- Built-in panel branch contains:
  - header region (`ui-lib-dialog-header`) with projected header slot and fallback `header()` text
  - actions region (maximize/close buttons)
  - content region (default projection)
  - footer region (`[uiLibDialogFooter]` projection)

### Signal and lifecycle flow

Key public signals:

- `visible` (model)
- `modal`, `closable`, `closeOnEscape`, `dismissableMask`, `draggable`, `maximizable`, `blockScroll`, `position`, `breakpoints`, `variant`, `ariaLabelledBy`, `headless`

Key computed signals:

- `hostClasses`, `panelClasses`, `panelStyles`
- `positionClass`, `resolvedVariant`
- `hasHeaderContent`, `titleId`, `labelledById`
- `dialogMotion`, `backdropMotion`

Constructor effects handle:

- open/close transitions (`applyScrollLock`, `releaseScrollLock`, breakpoint listener setup/cleanup, drag reset, focus trap lifecycle)
- position change drag reset
- responsive width evaluation on visibility changes
- modal focus trap activation via `afterNextRender`

### Animation integration path

- Motion is CSS-driven using host-level custom properties (`--uilib-dialog-enter-*`, `--uilib-dialog-backdrop-enter-*`).
- `dialogMotion` and `backdropMotion` compute variant-aware timing values that are bound on the host.
- `show` and `hide` outputs emit from visibility state transitions (microtask), not animation callback events.

## Overlay Strategy

### Current strategy (v1): inline rendering

The dialog renders in-place in consumer template (no portal/append target).

Why this was chosen:

- simpler SSR-safe behavior with fewer global DOM dependencies
- lower infrastructure overhead for first overlay component
- easier debugging and predictable ownership boundaries for host layout
- aligns with current library pattern (standalone component + token-driven CSS)

### When this may change

A future v2 `appendTo`/portal strategy is expected when stronger overlay infrastructure is introduced (service-driven overlays, stacking manager, cross-container clipping avoidance).

Likely trigger conditions:

- dialogs used inside clipped/overflow hidden containers
- service-managed overlays that must mount outside feature component trees
- strict stacking coordination across multiple overlay types

## Focus Trap

### Integration details

- Utility lives in `projects/ui-lib-custom/src/lib/core/a11y/focus-trap.ts`.
- `DialogComponent` owns a private `focusTrap: FocusTrap | null`.
- Trap activation path:
  - constructor effect watches `visible() && modal()`
  - calls `afterNextRender(...)`
  - `activateFocusTrap()` uses panel element when available, otherwise host element
- Trap deactivation path:
  - visibility close branch
  - modal turned off
  - component destroy (`ngOnDestroy`)

### Edge cases handled

From `FocusTrap` behavior and dialog integration:

- no focusable descendants -> focus container (temporary `tabindex=-1`)
- tab wraps last -> first
- shift+tab wraps first -> last
- previous focus restored on deactivate
- trap is re-created to avoid stale listener state on re-open

### Reuse guidance for future overlays

For `Toast`, `Dropdown`, `Tooltip`, and future overlays:

- reuse `FocusTrap` directly from `ui-lib-custom/core`
- activate only for truly modal interaction contexts
- always pair activation with deterministic cleanup in close + destroy paths
- pass the most specific interactive container element (not broad document regions)

## Scroll Lock

### Implementation details

- Lock methods are private in `DialogComponent`: `applyScrollLock()` and `releaseScrollLock()`.
- Lock applies only when all are true:
  - browser platform
  - `modal()`
  - `blockScroll()`
- Stores previous `document.body.style.overflow` in signal `previousBodyOverflow`.
- On release, restores previous value and clears stored signal.

### SSR considerations

- platform check uses `isPlatformBrowser` with `PLATFORM_ID`.
- when not browser, scroll lock methods no-op.
- avoids server-side direct DOM mutation.

### Notes for future shared overlay infrastructure

Current lock is component-local. If multiple overlays with independent lifecycles become common, migrate to a shared reference-counted scroll lock service.

## Drag Implementation

### Pointer model

- Drag starts in `onHeaderPointerDown`.
- Guard conditions:
  - browser only
  - `draggable()` must be true
  - not maximized
  - primary pointer button only
  - ignore pointerdown from header action controls
- Captures drag start values:
  - pointer coordinates
  - current offsets
  - panel rect metrics

### Movement model

- Movement listeners are bound on `window` for `pointermove`, `pointerup`, `pointercancel`.
- `onDocumentPointerMove` computes desired position and clamps inside viewport bounds.
- Visual movement is transform-based via `dragOffset` signal -> `panelStyles().transform`.

### Cleanup

- On pointer up/cancel: `stopDragging()` clears active pointer and listeners.
- On close/destroy/position reset: drag state and offset reset.
- Maximizing also stops active drag.

## Breakpoint System

### Input contract

- `breakpoints: Record<string, string>`
- Keys are max-width values (for example `960px`), values are target dialog widths.

### Runtime behavior

- Listeners are attached only when visible and in browser.
- Uses `window.matchMedia('(max-width: X)')`.
- `evaluateResponsiveWidth()` sorts breakpoints by numeric pixel value descending.
- First matching breakpoint wins.

### Evaluation order and fallback

- Sort order: largest max-width to smallest.
- Browser + visible: first media match applies.
- No matches: width reset to `null`.
- SSR/non-browser/not visible fallback: picks largest configured breakpoint width (`getLargestBreakpointWidth`) or `null` when empty.

### Cleanup

- Listener teardown managed by `cleanupBreakpointListeners()`.
- Called on close and destroy.

## Animation Integration

### Wiring

- CSS keyframes in `dialog.component.scss` handle panel/backdrop enter transitions.
- `DialogComponent` computes motion variables through:
  - `dialogMotion`
  - `backdropMotion`
- Host style bindings pass those values into CSS custom properties.

### Variant-specific behavior

Dialog panel params:

- `material`: scale + slight translate start, 200ms
- `bootstrap`: no scale/translate start, 200ms
- `minimal`: no scale/translate start, 100ms

Backdrop params:

- `minimal`: 100ms
- others: 150ms

### prefers-reduced-motion handling

- CSS media query (`@media (prefers-reduced-motion: reduce)`) sets dialog/backdrop durations to `0ms`.
- No runtime JS listener is required for reduced-motion behavior.

## Known Limitations (Deferred to v2)

Deferred features:

- `appendTo` / portal mounting strategy
- resizable dialogs
- `DialogService` for dynamic/service-driven dialogs
- explicit RTL behavior tuning APIs
- centralized z-index stacking manager (public/runtime policy)
- keep-in-viewport policy for advanced drag/resize scenarios

Current practical caveat:

- Modal `afterNextRender` focus-trap activation has test-environment edge behavior in Jest/jsdom; this does not change public API but affects how modal paths are asserted in specs.

## Future Considerations

Dialog established reusable overlay patterns that should be shared for future components:

- focus containment and focus restoration lifecycle
- scroll lock orchestration with SSR guards
- viewport-safe pointer drag lifecycle with deterministic cleanup
- token-first overlay styling and variant layering
- responsive `matchMedia` evaluation utility pattern
- reduced-motion-aware animation parameterization

Recommended shared infra direction:

1. promote scroll lock and breakpoint handling into reusable overlay utilities/services
2. introduce a shared layering manager (`backdrop`, `modal`, `popover`, `tooltip` tiers)
3. keep `FocusTrap` in `core/a11y` as the base trap primitive
4. standardize overlay open/close lifecycle hooks (show/hide timing contracts)

## File Index for Maintainers

- Dialog component: `projects/ui-lib-custom/src/lib/dialog/dialog.component.ts`
- Dialog template: `projects/ui-lib-custom/src/lib/dialog/dialog.component.html`
- Dialog styles: `projects/ui-lib-custom/src/lib/dialog/dialog.component.scss`
- Animation definitions: `projects/ui-lib-custom/src/lib/dialog/dialog-animations.ts`
- Defaults and class mapping: `projects/ui-lib-custom/src/lib/dialog/dialog.constants.ts`
- Public types: `projects/ui-lib-custom/src/lib/dialog/dialog.types.ts`
- Unit tests: `projects/ui-lib-custom/src/lib/dialog/dialog.component.spec.ts`
- Accessibility tests: `projects/ui-lib-custom/src/lib/dialog/dialog.a11y.spec.ts`
- Focus trap utility: `projects/ui-lib-custom/src/lib/core/a11y/focus-trap.ts`
- Focus trap tests: `projects/ui-lib-custom/src/lib/core/a11y/focus-trap.spec.ts`

