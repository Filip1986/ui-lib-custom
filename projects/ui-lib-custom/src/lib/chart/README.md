# Chart

**Selector:** `ui-lib-chart`
**Package:** `ui-lib-custom/chart`
**Content projection:** no — none

> `type` must match the Chart.js chart type registered at bootstrap; changing `type` at runtime destroys and recreates the Chart.js instance. Dataset `backgroundColor` is auto-assigned from the theme palette only when the dataset omits the property.

## Inputs

| Name | Type | Default | Notes |
|------|------|---------|-------|
| `type` | `ChartType` | required | Chart.js chart type (e.g. `'bar'`, `'line'`, `'pie'`). Required. |
| `data` | `ChartData<ChartType> \| null` | `null` | Chart.js data object. |
| `options` | `ChartOptions<ChartType> \| null` | `null` | Consumer options merged on top of theme-derived defaults. |
| `plugins` | `Plugin<ChartType>[]` | `[]` | Inline Chart.js plugins for this instance. |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Host size token. |
| `responsive` | `boolean` | `true` | Enables Chart.js responsive sizing. |
| `maintainAspectRatio` | `boolean` | `true` | Preserves aspect ratio when responsive. |
| `ariaLabel` | `string` | `'Chart'` | ARIA label on the rendered canvas. |
| `height` | `string \| null` | `null` | CSS height override applied to the host element. |
| `width` | `string \| null` | `null` | CSS width override applied to the host element. |

## Outputs

| Name | Payload | Notes |
|------|---------|-------|
| `chartClick` | `ChartClickEvent` | Emitted when a data element is clicked. Only fires when active elements are present. |
| `chartHover` | `ChartClickEvent` | Emitted when a data element is hovered. Only fires when active elements are present. |
| `chartReady` | `Chart<ChartType>` | Emitted after the Chart.js instance is created. Use for advanced imperative access. |

## Usage

```html
<!-- minimal bar chart -->
<ui-lib-chart type="bar" [data]="chartData" />

<!-- line chart with custom height and click handler -->
<ui-lib-chart
  type="line"
  [data]="lineData"
  [options]="lineOptions"
  height="300px"
  (chartClick)="onDataPointClick($event)"
/>
```
