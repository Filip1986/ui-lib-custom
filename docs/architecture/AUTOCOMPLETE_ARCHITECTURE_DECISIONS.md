# AutoComplete Architecture Decisions

## Goal

Define implementation decisions for `ui-lib-autocomplete` that align with existing `ui-lib-custom` patterns (`Select`, `Input`, signals, CVA, ARIA-first interaction) while supporting PrimeNG-inspired autocomplete features.

## Key Constraints

- Angular standalone component with `ChangeDetectionStrategy.OnPush` and `ViewEncapsulation.None`.
- Signal `input()`/`output()` APIs with explicit types.
- Works with both template-driven and reactive forms.
- Preserves accessibility parity with combobox/listbox ARIA expectations.
- Uses CSS custom properties for all visual behavior.

## Decision Summary

| Topic | Decision |
| --- | --- |
| CVA model | Single mode writes scalar (`unknown \| null`); multiple mode writes array (`unknown[]`). |
| Panel positioning | Default panel mounts to `document.body` via `appendTo='body'` and uses fixed-position anchoring to the control; `appendTo='self'` keeps host mounting. |
| Debounce | Signal + timer-based debounce for `completeMethod` emissions (no RxJS hard dependency in v1). |
| Keyboard nav | Reuse Select navigation semantics (`activeDescendant`, enabled-option traversal, Home/End). |
| Chips | Token list rendered before input in multiple mode, removable via button and keyboard delete flow. |
| Virtual scroll | Prefer CDK virtual scrolling when enabled; fallback to standard list when disabled. |
| Force selection | Validate/normalize on blur and panel close boundaries, not on every keypress. |

## ControlValueAccessor Strategy

### Decision

- Internal state stores a normalized array for selection bookkeeping.
- Externally, CVA contract maps by mode:
  - `multiple=false`: emit first value or `null`
  - `multiple=true`: emit value array (`unknown[]`)

### Rationale

- Matches existing `Select` semantics and Angular forms expectations.
- Simplifies shared selection operations (add/remove/contains).
- Avoids exposing mode-specific internals to consumers.

## Panel Positioning Approach

### Decision

- Default to body-mounted overlay panel (`appendTo='body'`) anchored to the control bounds.
- Support `appendTo='self'`, CSS selector, and `HTMLElement` targets; unresolved selectors fall back to host mounting.

### Rationale

- Prevents clipping inside containers with `overflow: hidden` while preserving API flexibility.
- Keeps behavior aligned with PrimeNG-style overlay expectations for autocomplete.
- Still leaves a clear extraction path into shared `ui-lib-custom/core` overlay utilities.

### Deferred

- Viewport collision handling and full z-index manager can be centralized later.

## Debounce Strategy

### Decision

- Use signal-driven query state with cancellable `setTimeout` debounce before firing `completeMethod`.
- Enforce `minLength` gate before emitting.

### Rationale

- Aligns with current codebase style (signals over RxJS streams in components).
- Avoids extra complexity/dependency surfaces for initial release.
- Straightforward to unit test with fake timers.

## Keyboard Navigation Reuse

### Decision

- Lift behavior patterns from `Select`:
  - active option index tracking
  - disabled option skipping
  - `aria-activedescendant` id mapping
  - Arrow/Home/End/Escape/Enter handling

### Rationale

- Proven, already tested behavior in current library.
- Consistent UX across select-like controls.
- Reduces regressions by reusing known interaction models.

## Multiple Mode Chip Rendering and Removal

### Decision

- Multiple mode renders selected values as removable chip tokens.
- Chip remove action emits `onUnselect` and updates CVA model.
- When `unique=true`, duplicate adds are ignored.
- `addOnBlur`/`addOnTab`/`separator` convert pending input text into tokens where enabled.

### Rationale

- Covers PrimeNG-inspired token UX while preserving form model predictability.
- Keeps token interactions explicit through events and clear state transitions.

## Virtual Scroll Approach

### Decision

- Use Angular CDK virtual scroll only when `virtualScroll=true` and `virtualScrollItemSize > 0`.
- Use normal option list otherwise.

### Rationale

- CDK implementation is robust and accessible when configured correctly.
- Conditional opt-in avoids complexity for small datasets.
- Preserves simple rendering path by default.

### Risks

- Requires careful template branching for grouped options and custom templates.
- Needs dedicated a11y verification for active option visibility/announcements.

## Force Selection Validation Timing

### Decision

- Validate on blur and when closing panel:
  - If input text does not map to suggestion and `forceSelection=true`, reset to last valid model value.
  - Apply `autoClear` behavior after valid selection as configured.

### Rationale

- Prevents disruptive typing experience.
- Keeps user feedback consistent with combobox norms.
- Avoids accidental model churn during composition or intermediate typing.

## Accessibility Contract Decisions

- Host uses combobox semantics and reflects expanded/controls/active descendant attributes.
- Input sets `aria-autocomplete="list"` and maps invalid/disabled/read-only states.
- Listbox/options roles are preserved in both default and custom template flows.
- Keyboard and focus behavior follows WAI-ARIA combobox guidance.

## Testing Implications

- Unit tests should cover:
  - CVA writes/reads in both modes
  - debounce + `minLength` emission timing
  - force-selection blur normalization
  - keyboard navigation and active descendant updates
  - chip add/remove edge cases (`unique`, separator, add-on-tab/blur)
- A11y tests should cover:
  - role/state attributes, keyboard-only interaction, and announceable state changes.

## Open Decisions (Post-P0)

- Whether to centralize overlay positioning/z-index management now that `appendTo` body behavior is in place.
- Grouped options + virtual scroll coexistence strategy (flattened model vs grouped viewport sections).
- Whether to add optional loading icon template parity (`loadingIconTemplate`) in same release as `loaderTemplate`.
