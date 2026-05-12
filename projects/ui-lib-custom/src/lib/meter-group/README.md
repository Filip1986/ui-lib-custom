# MeterGroup

Segmented progress/meter bar that visualises multiple values as proportional coloured segments.

## Package path

```ts
import { MeterGroup } from 'ui-lib-custom/meter-group';
import type { MeterItem } from 'ui-lib-custom/meter-group';
```

## Selector

`ui-lib-meter-group`

## Inputs

| Input | Type | Default | Description |
|---|---|---|---|
| `values` | `MeterItem[]` | `[]` | Array of meter segments |
| `min` | `number` | `0` | Minimum value of the range |
| `max` | `number` | `100` | Maximum value of the range |
| `orientation` | `'horizontal' \| 'vertical'` | `'horizontal'` | Bar direction |
| `showLabels` | `boolean` | `true` | Show/hide the legend |
| `labelPosition` | `'start' \| 'end'` | `'end'` | Legend placement (`'start'` = above/left, `'end'` = below/right) |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Size token |
| `variant` | `'material' \| 'bootstrap' \| 'minimal' \| null` | `null` | Visual variant (falls back to ThemeConfigService) |
| `styleClass` | `string \| null` | `null` | Extra CSS classes on the host |
| `ariaLabel` | `string` | `'Meter group'` | Accessible label for the meter container group |

## MeterItem interface

```ts
interface MeterItem {
  label: string;     // Segment label shown in the legend
  value: number;     // Numeric value (measured against min/max)
  color: string;     // CSS colour string (hex, rgb, hsl, named…)
  icon?: string;     // Optional PrimeIcons class for the legend swatch
}
```

## Outputs

None.

## Content projection

None — all configuration is via inputs.

## Usage example

```html
<ui-lib-meter-group
  [values]="storageItems"
  [max]="100"
  labelPosition="end"
/>
```

```ts
storageItems: MeterItem[] = [
  { label: 'Apps',     value: 16, color: '#34d399' },
  { label: 'Messages', value: 8,  color: '#818cf8' },
  { label: 'Media',    value: 24, color: '#fb923c' },
  { label: 'System',   value: 10, color: '#f87171' },
];
```

## CSS custom properties

| Property | Description |
|---|---|
| `--uilib-meter-group-height` | Bar height (horizontal) |
| `--uilib-meter-group-height-sm` | Bar height for `size="sm"` |
| `--uilib-meter-group-height-lg` | Bar height for `size="lg"` |
| `--uilib-meter-group-width-vertical` | Bar width (vertical orientation) |
| `--uilib-meter-group-height-vertical` | Bar height (vertical orientation) |
| `--uilib-meter-group-border-radius` | Bar and segment corner radius |
| `--uilib-meter-group-bg` | Background track colour |
| `--uilib-meter-group-segment-gap` | Gap between segments |
| `--uilib-meter-group-label-font-size` | Legend font size |
| `--uilib-meter-group-label-color` | Legend label text colour |
| `--uilib-meter-group-label-value-color` | Legend value text colour |
| `--uilib-meter-group-swatch-size` | Legend colour swatch size |
| `--uilib-meter-group-swatch-border-radius` | Legend swatch border radius |
| `--uilib-meter-group-transition` | Segment transition shorthand |

## ARIA attributes

| Element | Attribute | Description |
|---|---|---|
| `.ui-lib-meter-group__meters` | `role="group"` | Groups all meter segments as one semantic meter group |
| `.ui-lib-meter-group__meters` | `aria-label` | Uses `ariaLabel` input (`'Meter group'` default) |
| `.ui-lib-meter-group__meter` | `role="meter"` | Announces each segment as a meter |
| `.ui-lib-meter-group__meter` | `aria-valuenow` | Segment value clamped to `min`/`max` |
| `.ui-lib-meter-group__meter` | `aria-valuemin` | Lower bound from `min` |
| `.ui-lib-meter-group__meter` | `aria-valuemax` | Upper bound from `max` |
| `.ui-lib-meter-group__meter` | `aria-label` | Human-readable segment text (`"<label>: <value> of <max>"`) |
| `.ui-lib-meter-group__sr-total` | `aria-live="polite"` | Announces computed total changes |
| `.ui-lib-meter-group__sr-total` | `aria-atomic="true"` | Reads total message as a complete phrase |

## Keyboard interaction

MeterGroup is informational (non-interactive). It does not add tabbable/focusable controls.

| Key | Behaviour |
|---|---|
| `Tab` / `Shift+Tab` | Skips meter segments and legend items |
| Arrow keys / Enter / Space | No component-specific keyboard handling |

## Accessibility

- Meter segments expose full meter semantics with value range and descriptive labels.
- Decorative legend swatches/icons are `aria-hidden="true"` so screen readers announce only useful text.
- A hidden live region announces segment total updates (for dynamic data changes).
- Segment transitions are disabled for users with `prefers-reduced-motion: reduce`.
