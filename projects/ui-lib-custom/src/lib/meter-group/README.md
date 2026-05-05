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

## Accessibility

- The meter container carries `role="group"` with `aria-label="Meter group"`.
- Each segment carries `role="meter"` with `aria-valuenow`, `aria-valuemin`, `aria-valuemax`, and `aria-label` (label + value).
- The legend is a `<ul>` with `aria-label="Legend"`.
