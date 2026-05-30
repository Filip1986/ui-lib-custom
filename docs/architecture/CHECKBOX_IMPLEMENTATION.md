# Checkbox Implementation Notes

## Architecture

- Standalone Angular component using `ChangeDetectionStrategy.OnPush` and `ViewEncapsulation.None`.
- Signal-based API (`input()`, `model()`, `output()`) with explicit typing for all public members.
- ControlValueAccessor implementation supports two value modes:
  - binary mode (scalar values via `trueValue` / `falseValue`)
  - group mode (array membership via `value`)
- Mode detection is computed and Prime-style:
  - binary when `binary === true` or `value === null`
  - group when `binary === false` and `value` is non-null
- Accessibility semantics are owned by a hidden native input in `checkbox.html`; visual box is presentation-only.

## Template Strategy

- Hidden native `<input type="checkbox">` carries semantic and form attributes:
  - `id`, `name`, `required`, `readonly`, `disabled`, `tabindex`
  - `aria-label`, `aria-labelledby`, `aria-describedby`, `aria-checked`
  - `value` (stringified from group value or binary trueValue)
- Visible custom box (`.ui-lib-checkbox__box`) and icons are decorative (`role="presentation"`, `aria-hidden="true"`).
- Label/description IDs are generated per instance to keep ARIA references stable.

## State and Value Flow

### Binary mode

- `writeValue` sets visual `checked` when incoming model equals `trueValue`.
- Toggle emits `trueValue` when checked and `falseValue` when unchecked.
- Null/undefined are treated as unchecked unless equal to `trueValue`.

### Group mode

- `writeValue` normalizes non-array values (`null`, `undefined`, scalar) to `[]`.
- Visual `checked` is derived from `value` membership in the normalized array.
- Toggle adds/removes `value` in a cloned array and emits the updated array.

## Styling Strategy

- Base classes are computed into one host class string:
  - `ui-lib-checkbox--variant-*`
  - `ui-lib-checkbox--size-*`
  - `ui-lib-checkbox--checked`
  - `ui-lib-checkbox--indeterminate`
  - `ui-lib-checkbox--disabled`
  - `checkbox--filled` (appearance)
- `appearance` is orthogonal to `variant`; both combine for all 3 x 2 visual combinations.
- Styling is CSS-variable driven with `--uilib-checkbox-*` tokens, including filled appearance vars:
  - `--uilib-checkbox-filled-bg`
  - `--uilib-checkbox-filled-border-color`

## Accessibility Implementation

- Screen reader interaction is through the native input, not the host wrapper.
- Focus ring is rendered on the visible box using `:focus-within` so hidden input focus is visible.
- `onFocus` and `onBlur` outputs are emitted from native input focus/blur events.
- `readonly` prevents mutation but still allows focus and semantic exposure.

## Performance

- OnPush + signal computations minimize recalculations.
- No RxJS subscriptions or manual `ChangeDetectorRef` usage.
- DOM remains small: one host, one hidden input, one visual box, optional text content.

## Testing Coverage

`projects/ui-lib-custom/src/lib/checkbox/checkbox.spec.ts` covers:

- binary and group-mode CVA behavior
- null/undefined safety for model writes
- `trueValue` / `falseValue` custom payloads
- hidden-native-input ARIA and label association
- readonly/disabled behavior
- focus/blur/change outputs
- appearance class combinations across variants
- template-driven and reactive form integration

## Known Tradeoffs

- Group membership comparison uses strict identity (`===`); object values require stable references.
- `checked` model remains boolean visual state; scalar/array form values are emitted through CVA and `onChange`.

## Future Enhancements

- Add custom icon template slot parity (not only class-based `checkboxIcon`).
- Consider comparator support for group mode object values.
- Add maintainer benchmark notes after full library perf baselining.

