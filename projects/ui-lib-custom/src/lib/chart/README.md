# Chart

**Selector:** `ui-lib-chart`
**Package:** `ui-lib-custom/chart`
**Content projection:** no — none

> `type` must match the Chart.js chart type registered at bootstrap; changing `type` at runtime destroys and recreates the Chart.js instance. Dataset `backgroundColor` is auto-assigned from the theme palette only when the dataset omits the property.

## Inputs

| Name                  | Type                              | Default   | Notes                                                                                         |
| --------------------- | --------------------------------- | --------- | --------------------------------------------------------------------------------------------- |
| `type`                | `ChartType`                       | required  | Chart.js chart type (e.g. `'bar'`, `'line'`, `'pie'`). Required.                              |
| `data`                | `ChartData<ChartType> \| null`    | `null`    | Chart.js data object.                                                                         |
| `options`             | `ChartOptions<ChartType> \| null` | `null`    | Consumer options merged on top of theme-derived defaults.                                     |
| `plugins`             | `Plugin<ChartType>[]`             | `[]`      | Inline Chart.js plugins for this instance.                                                    |
| `size`                | `'sm' \| 'md' \| 'lg'`            | `'md'`    | Host size token.                                                                              |
| `responsive`          | `boolean`                         | `true`    | Enables Chart.js responsive sizing.                                                           |
| `maintainAspectRatio` | `boolean`                         | `true`    | Preserves aspect ratio when responsive.                                                       |
| `ariaLabel`           | `string`                          | `'Chart'` | ARIA label on the rendered canvas and as the accessible data table caption.                   |
| `showDataTable`       | `boolean`                         | `true`    | When `true`, renders a visually-hidden `<table>` mirroring the chart data for screen readers. |
| `height`              | `string \| null`                  | `null`    | CSS height override applied to the host element.                                              |
| `width`               | `string \| null`                  | `null`    | CSS width override applied to the host element.                                               |

## Outputs

| Name         | Payload            | Notes                                                                                |
| ------------ | ------------------ | ------------------------------------------------------------------------------------ |
| `chartClick` | `ChartClickEvent`  | Emitted when a data element is clicked. Only fires when active elements are present. |
| `chartHover` | `ChartClickEvent`  | Emitted when a data element is hovered. Only fires when active elements are present. |
| `chartReady` | `Chart<ChartType>` | Emitted after the Chart.js instance is created. Use for advanced imperative access.  |

## ARIA

| Attribute          | Element             | Value                        | Notes                                                                             |
| ------------------ | ------------------- | ---------------------------- | --------------------------------------------------------------------------------- |
| `role`             | `<canvas>`          | `"img"`                      | Exposes the canvas as an image to assistive technology.                           |
| `aria-label`       | `<canvas>`          | bound from `ariaLabel` input | Describes the chart content to screen readers.                                    |
| `aria-describedby` | `<canvas>`          | unique table element ID      | Present when `showDataTable` is `true`. Points to the visually-hidden data table. |
| `id`               | `<table>`           | `ui-lib-chart-table-{n}`     | Auto-generated unique ID, referenced by `aria-describedby` on the canvas.         |
| `scope="col"`      | `<th>` in `<thead>` | —                            | Column header cells use `scope="col"` for correct table semantics.                |
| `scope="row"`      | `<th>` in `<tbody>` | —                            | Row header cells (dataset labels) use `scope="row"`.                              |

## Keyboard Interaction

Chart.js canvas is not keyboard-interactive by default. The accessible data table is visually hidden and provides a screen-reader-friendly alternative to the visual canvas. Keyboard navigation follows the browser's natural tab order; no custom key handlers are needed.

| Key   | Behaviour                                                       |
| ----- | --------------------------------------------------------------- |
| `Tab` | Moves focus in/out of the chart host in natural document order. |

## CSS Custom Properties

| Property                                          | Default                                            | Notes                                         |
| ------------------------------------------------- | -------------------------------------------------- | --------------------------------------------- |
| `--uilib-chart-min-height-sm`                     | `200px`                                            | Minimum height for size `sm`.                 |
| `--uilib-chart-min-height-md`                     | `300px`                                            | Minimum height for size `md`.                 |
| `--uilib-chart-min-height-lg`                     | `400px`                                            | Minimum height for size `lg`.                 |
| `--uilib-chart-font-family`                       | `var(--uilib-font-family, inherit)`                | Font family used for labels and tooltips.     |
| `--uilib-chart-font-size`                         | `12`                                               | Font size (unitless, passed to Chart.js).     |
| `--uilib-chart-font-color`                        | `var(--uilib-text-color, #333333)`                 | Tick and label text colour.                   |
| `--uilib-chart-grid-color`                        | `var(--uilib-border-color, rgba(0,0,0,0.1))`       | Grid line colour.                             |
| `--uilib-chart-border-color`                      | `var(--uilib-border-color, rgba(0,0,0,0.1))`       | Dataset border colour.                        |
| `--uilib-chart-background-color`                  | `transparent`                                      | Chart background.                             |
| `--uilib-chart-tooltip-background`                | `var(--uilib-overlay-tooltip-bg, rgba(0,0,0,0.8))` | Tooltip background.                           |
| `--uilib-chart-tooltip-font-color`                | `var(--uilib-overlay-tooltip-fg, #ffffff)`         | Tooltip text colour.                          |
| `--uilib-chart-legend-font-color`                 | `var(--uilib-text-color-secondary, #666666)`       | Legend label colour.                          |
| `--uilib-chart-color-1` … `--uilib-chart-color-8` | theme palette                                      | Dataset colour palette, automatically cycled. |

## Accessibility

- The `<canvas>` is rendered with `role="img"` and an `aria-label` that describes the chart.
- By default, a **visually-hidden data table** (`showDataTable="true"`) mirrors all chart labels and dataset values as a proper HTML `<table>`. This table is referenced via `aria-describedby` on the canvas, giving screen readers full access to the underlying data.
- Each chart instance receives a **unique auto-generated ID** for its data table (`ui-lib-chart-table-0`, `ui-lib-chart-table-1`, …), preventing ID collisions when multiple charts appear on the same page.
- When the user agent or system has `prefers-reduced-motion: reduce` set, all Chart.js animations are automatically disabled via `animation: false` in the resolved options.
- For critical business data, always provide a meaningful `ariaLabel` (e.g., `"Monthly revenue by channel, Q1 2024"`) rather than the default `"Chart"`.
- Set `showDataTable="false"` only when you provide an equivalent accessible alternative through other means (e.g., a visible data table below the chart).

## Usage

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

## Convenience wrappers

| Selector                | Type fixed to |
| ----------------------- | ------------- |
| `ui-lib-bar-chart`      | `'bar'`       |
| `ui-lib-line-chart`     | `'line'`      |
| `ui-lib-pie-chart`      | `'pie'`       |
| `ui-lib-doughnut-chart` | `'doughnut'`  |
