# Chart

**Selector:** `ui-lib-chart`
**Entry point:** `import { Chart } from 'ui-lib-custom/chart'`

---

## Overview

Generic Chart.js wrapper component with theme-aware reactive updates.

## API

### Inputs

| Name                  | Type                     | Default | Description                                                                                 |
| --------------------- | ------------------------ | ------- | ------------------------------------------------------------------------------------------- | -------------------------------------------------------------- |
| `ariaLabel`           | `string`                 | `''`    | ARIA label applied to the rendered canvas. Falls back to locale 'chart.label' when empty.   |
| `data`                | `ChartData<ChartType>    | null`   | `null`                                                                                      | Data passed directly to Chart.js.                              |
| `height`              | `string                  | null`   | `null`                                                                                      | Optional host height override.                                 |
| `maintainAspectRatio` | `boolean`                | `true`  | Keeps chart aspect ratio when responsive sizing is enabled.                                 |
| `options`             | `ChartOptions<ChartType> | null`   | `null`                                                                                      | Consumer chart options merged on top of theme-derived options. |
| `plugins`             | `Plugin<ChartType>[]`    | `[]`    | Inline Chart.js plugins for this chart instance.                                            |
| `responsive`          | `boolean`                | `true`  | Enables responsive chart layout behavior.                                                   |
| `showDataTable`       | `boolean`                | `true`  | When true, renders a visually-hidden data table as an accessible alternative to the canvas. |
| `size`                | `ChartSize`              | `'md'`  | Wrapper size token.                                                                         |
| `width`               | `string                  | null`   | `null`                                                                                      | Optional host width override.                                  |

### Outputs

| Name         | Type               | Description                                              |
| ------------ | ------------------ | -------------------------------------------------------- |
| `chartClick` | `ChartClickEvent`  | Emits when a chart data element is clicked.              |
| `chartHover` | `ChartClickEvent`  | Emits when a chart data element is hovered.              |
| `chartReady` | `Chart<ChartType>` | Emits after the underlying Chart.js instance is created. |

## Content Projection

_none_

## Theming

| CSS Variable                       | Default                                               |
| ---------------------------------- | ----------------------------------------------------- |
| `--uilib-chart-background-color`   | `transparent`                                         |
| `--uilib-chart-border-color`       | `var(--uilib-border-color, rgba(0, 0, 0, 0.1))`       |
| `--uilib-chart-color-1`            | `var(--uilib-color-primary-500, #4285f4)`             |
| `--uilib-chart-color-2`            | `var(--uilib-color-danger-500, #ea4335)`              |
| `--uilib-chart-color-3`            | `var(--uilib-color-warning-500, #fbbc04)`             |
| `--uilib-chart-color-4`            | `var(--uilib-color-success-500, #34a853)`             |
| `--uilib-chart-color-5`            | `var(--uilib-chart-accent-1, #ff6d01)`                |
| `--uilib-chart-color-6`            | `var(--uilib-chart-accent-2, #46bdc6)`                |
| `--uilib-chart-color-7`            | `var(--uilib-chart-accent-3, #7baaf7)`                |
| `--uilib-chart-color-8`            | `var(--uilib-chart-accent-4, #f07b72)`                |
| `--uilib-chart-font-color`         | `var(--uilib-text-color, #333333)`                    |
| `--uilib-chart-font-family`        | `var(--uilib-font-family, inherit)`                   |
| `--uilib-chart-font-size`          | `12`                                                  |
| `--uilib-chart-grid-color`         | `var(--uilib-border-color, rgba(0, 0, 0, 0.1))`       |
| `--uilib-chart-legend-font-color`  | `var(--uilib-text-color-secondary, #666666)`          |
| `--uilib-chart-min-height`         | `var(--uilib-chart-min-height-md)`                    |
| `--uilib-chart-min-height-lg`      | `400px`                                               |
| `--uilib-chart-min-height-md`      | `300px`                                               |
| `--uilib-chart-min-height-sm`      | `200px`                                               |
| `--uilib-chart-tooltip-background` | `var(--uilib-overlay-tooltip-bg, rgba(0, 0, 0, 0.8))` |
| `--uilib-chart-tooltip-font-color` | `var(--uilib-overlay-tooltip-fg, #ffffff)`            |

## Accessibility

**APG pattern:** No dedicated APG pattern

### Keyboard Interactions

| Test description                                                           |
| -------------------------------------------------------------------------- |
| aria-describedby on canvas points to the table id                          |
| canvas aria-label updates when ariaLabel input changes                     |
| canvas has aria-describedby when showDataTable is true and data is present |
| canvas has default aria-label                                              |
| canvas has no aria-describedby when showDataTable is false                 |
| canvas has role=                                                           |
| data table caption matches ariaLabel                                       |
| data table cells contain correct values                                    |
| data table has column headers derived from labels                          |
| data table renders multiple datasets as separate rows                      |
| data table row header contains dataset label                               |
| does not render a data table when data is null                             |
| does not render a data table when showDataTable is false                   |
| each chart instance gets a unique table id                                 |
| passes axe with chart data and visible table                               |
| passes axe with multi-dataset data                                         |
| passes axe with no chart data                                              |
| passes axe with showDataTable disabled                                     |
| renders a data table when data is provided                                 |
| sets aria-label on the canvas                                              |

## Usage Examples

```html
<!-- minimal bar chart -->
<ui-lib-chart type="bar" [data]="chartData" ariaLabel="Revenue by month" />

<!-- line chart with custom height and click handler -->
<ui-lib-chart
  type="line"
  [data]="lineData"
  [options]="lineOptions"
  height="300px"
  ariaLabel="User growth over the past year"
  (chartClick)="onDataPointClick($event)"
/>

<!-- chart without the built-in data table (when you supply your own accessible alternative) -->
<ui-lib-chart
  type="doughnut"
  [data]="pieData"
  [showDataTable]="false"
  ariaLabel="Market share breakdown"
/>
```

## Related

- [Competitive benchmark](../COMPETITIVE_BENCHMARKS.md#chart)
- [Demo page](/components/chart)
- [Design tokens](../systems/DESIGN_TOKENS.md)
- [Co-located README](../../../projects/ui-lib-custom/src/lib/chart/README.md)
