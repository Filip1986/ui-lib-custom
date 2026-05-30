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
| `change` | `KnobChangeEvent` | Emitted whenever the value changes due to user interaction. |
| `focus` | `FocusEvent` | Emitted when the knob receives focus. |
| `blur` | `FocusEvent` | Emitted when the knob loses focus. |

## Usage

```html
<!-- basic usage with two-way binding -->
<uilib-knob [(value)]="volume" [min]="0" [max]="100" />

<!-- percentage display with ngModel -->
<uilib-knob [(ngModel)]="brightness" [max]="100" valueTemplate="{value}%" />
```

## Accessibility

- The host element uses `role="slider"` with `aria-valuemin`, `aria-valuemax`, `aria-valuenow`, and `aria-valuetext`.
- `aria-valuetext` is derived from `valueTemplate` (for example `'{value}%'` announces as percent).
- The internal SVG is decorative only (`aria-hidden="true"` and `focusable="false"`).
- The visible value label is not a live region (to avoid duplicate announcements).

### Keyboard support

| Key | Behavior |
|---|---|
| `ArrowRight` / `ArrowUp` | Increase by `step` |
| `ArrowLeft` / `ArrowDown` | Decrease by `step` |
| `PageUp` | Increase by `step * 10` |
| `PageDown` | Decrease by `step * 10` |
| `Home` | Set to `min` |
| `End` | Set to `max` |

## CSS Custom Properties

All visual aspects of the knob are exposed as CSS custom properties, set on the `uilib-knob` host element. Override them per-instance via `[style]` or globally via your own `uilib-knob { ... }` rule.

| Token | Default | Description |
|---|---|---|
| `--uilib-knob-track-color` | `#e0e0e0` | Background arc colour |
| `--uilib-knob-range-color` | `#6366f1` | Value arc colour |
| `--uilib-knob-text-color` | `#1f2937` | Centre label colour |
| `--uilib-knob-text-size` | `1.25rem` | Centre label font size |
| `--uilib-knob-text-weight` | `600` | Centre label font weight |
| `--uilib-knob-size-sm` | `80px` | Diameter in `sm` size |
| `--uilib-knob-size-md` | `120px` | Diameter in `md` size |
| `--uilib-knob-size-lg` | `160px` | Diameter in `lg` size |
| `--uilib-knob-focus-ring-color` | `rgba(99,102,241,0.35)` | Focus ring colour |
| `--uilib-knob-focus-ring-width` | `3px` | Focus ring thickness |
| `--uilib-knob-focus-ring-offset` | `2px` | Gap between knob and focus ring |
| `--uilib-knob-disabled-opacity` | `0.5` | Opacity when `disabled` |
| `--uilib-knob-transition-duration` | `var(--uilib-transition-duration-fast, 0.15s)` | Mount animation + arc transition duration |

In addition, the `valueColor` and `textColor` inputs write to `--uilib-knob-range-color-override` and `--uilib-knob-text-color-override` respectively, which take precedence over the base tokens.

### Theming examples

```css
/* Larger, teal-themed knob for a media player */
uilib-knob.player-volume {
  --uilib-knob-range-color: #14b8a6;
  --uilib-knob-size-md: 160px;
  --uilib-knob-text-size: 1.5rem;
}

/* Minimal dark knob */
uilib-knob.dark-knob {
  --uilib-knob-track-color: #374151;
  --uilib-knob-range-color: #e5e7eb;
  --uilib-knob-text-color: #f9fafb;
}
```
