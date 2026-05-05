# Knob

**Selector:** `uilib-knob`
**Package:** `ui-lib-custom/knob`
**Content projection:** no — none

> The selector is `uilib-knob` (no hyphen between "ui" and "lib"), which differs from the `ui-lib-*` convention used by other components. Implements `ControlValueAccessor` — use with `ngModel` or reactive forms. Drag sensitivity is fixed at 150px of vertical movement covering the full range.

## Inputs

| Name | Type | Default | Notes |
|------|------|---------|-------|
| `value` | `number` | `0` | Current value. Two-way bindable via `[(value)]` or `ngModel`. |
| `min` | `number` | `0` | Minimum allowed value. |
| `max` | `number` | `100` | Maximum allowed value. |
| `step` | `number` | `1` | Increment/decrement step for keyboard and drag snapping. |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Component size token. |
| `variant` | `'material' \| 'bootstrap' \| 'minimal' \| null` | `null` | Falls back to global `ThemeConfigService` variant when null. |
| `strokeWidth` | `number` | `14` | SVG arc stroke width in user-unit coordinates. |
| `showValue` | `boolean` | `true` | Renders the numeric label inside the dial. |
| `valueTemplate` | `string \| null` | `null` | Format string; use `{value}` as placeholder (e.g. `'{value}%'`). |
| `valueColor` | `string \| null` | `null` | Inline CSS color override for the value arc. |
| `textColor` | `string \| null` | `null` | Inline CSS color override for the center label. |
| `disabled` | `boolean` | `false` | Disables interaction. |
| `readonly` | `boolean` | `false` | Focusable but value does not change. |
| `ariaLabel` | `string \| undefined` | `undefined` | Accessible label for the dial SVG element. |
| `tabindex` | `number` | `0` | Tab index for keyboard focus. |
| `inputId` | `string` | auto | Unique id forwarded to the SVG element. |

## Outputs

| Name | Payload | Notes |
|------|---------|-------|
| `onChange` | `KnobChangeEvent` | Emitted whenever the value changes due to user interaction. |
| `onFocus` | `FocusEvent` | Emitted when the knob receives focus. |
| `onBlur` | `FocusEvent` | Emitted when the knob loses focus. |

## Usage

```html
<!-- basic usage with two-way binding -->
<uilib-knob [(value)]="volume" [min]="0" [max]="100" />

<!-- percentage display with ngModel -->
<uilib-knob [(ngModel)]="brightness" [max]="100" valueTemplate="{value}%" />
```
