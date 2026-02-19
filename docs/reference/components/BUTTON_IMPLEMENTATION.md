# Button Implementation Notes

## Architecture
- Single native `<button>` element; no wrapper nodes (see `button.html`).
- Signal-based inputs (`input()`) with `computed()` selectors for derived state (severity, appearance, icon-only, classes).
- Class strategy: a single `buttonClasses()` string applied via `[ngClass]`.
- Shadow overrides are exposed through inline CSS vars (`[style.--uilib-button-shadow]`, `--uilib-button-shadow-hover`).
- No explicit view encapsulation override; uses Angular default encapsulation behavior.

## Styling Strategy
- SCSS sets token-backed defaults on `:host`, then layers `.btn` modifiers and variant blocks.
- CSS variables drive background, border, text, and shadow for all states.
- Variant-specific sections adjust radii, border widths, gradients, and shadows.
- State handling is CSS-driven:
  - `:hover` -> `--uilib-button-bg-hover`, `--uilib-button-fg-hover`
  - `:active` -> `--uilib-button-bg-active`
  - `:focus-visible` -> outline + `--uilib-button-focus-ring`
  - `.btn-disabled` -> opacity and pointer-events

## Performance
- `ChangeDetectionStrategy.OnPush` with signal inputs.
- `computed()` memoizes class strings and derived values (severity, appearance, icon size).
- Minimal DOM: only optional icons and badge elements are conditionally rendered.
- No subscriptions or manual change detection.

## Performance Characteristics

### Bundle Impact
- Component size: X KB (gzipped).
- Dependencies: `ui-lib-icon`, `ui-lib-badge`.

### Runtime
- Change detection: OnPush.
- Signals: inputs + computed class/derived state.
- DOM nodes: 1 button + optional icons/badge.

### Benchmarks
- Initial render: X ms.
- Re-render on input change: X ms.

## Accessibility Implementation
- ARIA attributes bound on the native button:
  - `aria-disabled` for disabled/loading
  - `aria-busy` for loading
  - optional `role`, `tabindex`, `aria-pressed`, `aria-checked`
- Native keyboard behavior (Enter/Space activation) retained.
- Focus ring uses `:focus-visible` and configurable CSS vars.
- Icon-only buttons require `aria-label` from consumers.

## Variant Differences

| Aspect | Material | Bootstrap | Minimal |
| --- | --- | --- | --- |
| Border radius | `--uilib-radius-md` | `--uilib-radius-sm` | `0` (or `full` when rounded) |
| Shadow | token-driven | slightly stronger (shadow-sm/md) | none (unless raised) |
| Hover effect | token-driven | gradient overlay on raised | subtle color-mix bg |

## Extension Points
- Override CSS vars on `:root` or component host to create custom themes.
- Create custom variants by adding a new `.btn-{variant}` block and mapping tokens.
- Compose with `ui-lib-icon` and `ui-lib-badge` for richer UI patterns.

## Testing
- Spec coverage in `projects/ui-lib-custom/src/lib/button/button.spec.ts`.
- Key scenarios:
  - Class application for variant/size/severity/appearance.
  - Disabled/loading ARIA state and disabled behavior.
  - Spinner icon rendering when loading.
  - Modifier classes (raised/rounded/text/link).
  - Badge rendering and severity normalization.
  - Accessibility overrides (role, tabindex, aria-pressed/checked).
- Run tests:
  - `npm test`

## Known Limitations
- No dedicated output events; relies on native button click handling.
- Icon-only mode depends on consumer-provided `aria-label`.
- Appearance overrides (`text`, `outlined`, `link`) are mutually exclusive by convention, not enforced.

## Future Enhancements
- Add explicit `ariaLabel` input for icon-only buttons.
- Provide an explicit loading label for screen readers.
- Optional `loadingPosition` for spinner placement.
- Expand button group docs/examples in component reference.
