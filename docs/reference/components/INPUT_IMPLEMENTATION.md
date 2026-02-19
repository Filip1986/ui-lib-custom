# Input Implementation Notes

## Architecture
- Single host wrapper `.ui-input` containing label, field, and meta sections.
- Signal-based inputs with computed host classes and derived states (floating, disabled, described-by).
- Implements `ControlValueAccessor` for Angular forms integration.
- `ViewEncapsulation.None` ensures CSS variables cascade into projected prefix/suffix slots.

## Floating Label Implementation
- `labelFloat` controls layout:
  - `over`: label rendered above the field.
  - `in`/`on`: label rendered inside `.ui-input-control-wrapper` and moves based on focus/value.
- Floating state is computed from `focused` or non-empty `value`.
- CSS transforms and scale set in `.ui-input-floating-active` blocks.

## Validation State Styling
- Error state activates when `error` input is non-empty.
- `.ui-input-error` class applies border color and error text color.
- `aria-invalid` and `aria-describedby` bind to the error element.

## Focus Management
- Input focus tracked via `focused` signal.
- `focusInput()` redirects clicks on the field container to the input unless a button was clicked.
- `:focus-within` adds focus border and focus ring shadow.

## Placeholder Behavior
- Placeholder is displayed only when `labelFloat="over"` to prevent label overlap.
- Floating label uses `labelFloat="in"` or `labelFloat="on"` with empty placeholder.

## Form Control Integration
- Implements `writeValue`, `registerOnChange`, and `registerOnTouched`.
- Input events update `value` and emit change callbacks.
- `setDisabledState` ties form control disablement into the component.

## Accessibility Implementation
- `aria-required` and `aria-invalid` set based on inputs.
- Error text referenced by `aria-describedby`.
- Clear and password-toggle buttons include `aria-label`.

## Testing
- No dedicated spec file exists for input yet; validation relies on integration testing and demo coverage.
- Add unit tests for floating label modes, error state bindings, and CVA behavior.

## Known Limitations
- No explicit output events; consumers should use forms bindings.
- Prefix/suffix slots are visual only; no built-in interaction handling.

## Future Enhancements
- Add an input spec covering CVA and floating label modes.
- Add size variants for compact/comfortable padding presets.
- Add explicit `ariaLabel` input for icon-only contexts.

## Performance Characteristics

### Bundle Impact
- Component size: X KB (gzipped).
- Dependencies: Angular Forms (CVA).

### Runtime
- Change detection: OnPush.
- Signals: inputs + computed floating/disabled state.
- DOM nodes: label + input + helper elements.

### Benchmarks
- Initial render: X ms.
- Re-render on input change: X ms.
