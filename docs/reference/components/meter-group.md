# Meter Group

**Selector:** `ui-lib-meter-group`
**Entry point:** `import { MeterGroup } from 'ui-lib-custom/meter-group'`

---

## Overview

MeterGroup — segmented progress/meter bar component.Renders multiple coloured segments proportional to their values against aconfigurable min/max range.  An optional legend lists each segment's label,colour, and value.  Supports horizontal and vertical orientations and threedesign variants (material / bootstrap / minimal).@example<ui-lib-meter-group  [values]="[    { label: 'Apps', value: 16, color: '#34d399' },    { label: 'Messages', value: 8, color: '#818cf8' }  ]"/>

## API

### Inputs

| Name         | Type                       | Default         | Description                                                            |
| ------------ | -------------------------- | --------------- | ---------------------------------------------------------------------- |
| `ariaLabel`  | `string`                   | `'Meter group'` | /** Accessible label for the meter container group. */                 |
| `max`        | `number`                   | `100`           | /** Maximum value of the range (default `100`). */                     |
| `min`        | `number`                   | `0`             | /** Minimum value of the range (default `0`). */                       |
| `showLabels` | `boolean`                  | `true`          | /** Whether to render the legend. */                                   |
| `size`       | `MeterGroupSize`           | `'md'`          | /** Component size token. */                                           |
| `styleClass` | `string | null`            | `null`          | /** Additional CSS classes to attach to the host element. */           |
| `values`     | `MeterItem[]`              | `[]`            | /** Array of meter segments to render. */                              |
| `variant`    | `MeterGroupVariant | null` | `null`          | /** Visual variant — inherits from ThemeConfigService when not set. */ |

### Outputs

_none_

## Content Projection

_none_

## Theming

| CSS Variable                               | Default                               |
| ------------------------------------------ | ------------------------------------- |
| `--uilib-meter-group-bg`                   | `var(--uilib-surface-200, #e5e7eb)`   |
| `--uilib-meter-group-border-radius`        | `var(--uilib-radius-full, 9999px)`    |
| `--uilib-meter-group-height`               | `1rem`                                |
| `--uilib-meter-group-height-lg`            | `1.375rem`                            |
| `--uilib-meter-group-height-sm`            | `0.625rem`                            |
| `--uilib-meter-group-height-vertical`      | `12rem`                               |
| `--uilib-meter-group-label-color`          | `var(--uilib-color-text, #374151)`    |
| `--uilib-meter-group-label-font-size`      | `0.875rem`                            |
| `--uilib-meter-group-label-gap`            | `0.75rem`                             |
| `--uilib-meter-group-label-item-gap`       | `0.375rem`                            |
| `--uilib-meter-group-label-value-color`    | `var(--uilib-surface-500, #6b7280)`   |
| `--uilib-meter-group-segment-gap`          | `2px`                                 |
| `--uilib-meter-group-swatch-border-radius` | `var(--uilib-radius-sm, 0.25rem)`     |
| `--uilib-meter-group-swatch-fg`            | `var(--uilib-color-neutral-50, #fff)` |
| `--uilib-meter-group-swatch-size`          | `0.75rem`                             |
| `--uilib-meter-group-transition`           | `width 0.4s ease, height 0.4s ease`   |
| `--uilib-meter-group-width-vertical`       | `1rem`                                |
| `--uilib-meter-group-width-vertical-lg`    | `1.375rem`                            |
| `--uilib-meter-group-width-vertical-sm`    | `0.625rem`                            |

## Accessibility

**APG pattern:** <!-- TODO: add WAI-ARIA APG pattern URL or "decorative" -->

### Keyboard Interactions

| Test description                                                 |
| ---------------------------------------------------------------- |
| should announce the initial total value                          |
| should announce totals using clamped segment values              |
| should apply aria-label to the meter container                   |
| should apply variant class when variant is set                   |
| should expose aria-valuenow/min/max on each segment              |
| should expose descriptive aria-label text on each segment        |
| should expose role=                                              |
| should keep the group container non-focusable                    |
| should pass axe checks in default state                          |
| should pass axe checks in vertical state with hidden labels      |
| should render non-focusable segments for keyboard users          |
| should render the legend with aria-label when labels are visible |
| should set aria-label on each segment                            |
| should set aria-valuenow/min/max on each segment                 |
| should set custom aria-label on meter group container            |
| should set role=                                                 |
| should update announced total when values change                 |

## Usage Examples

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

## Related

- [Competitive benchmark](../COMPETITIVE_BENCHMARKS.md#meter-group)
- [Design tokens](../systems/DESIGN_TOKENS.md)
- [Co-located README](../../../projects/ui-lib-custom/src/lib/meter-group/README.md)

