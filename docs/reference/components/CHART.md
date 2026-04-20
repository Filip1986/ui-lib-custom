# Chart

Canvas-based data visualization powered by Chart.js with strongly typed Angular wrappers, theme-token bridging, and signal-driven reactive updates.

---

## Overview

`Chart` in `ui-lib-custom` provides a generic `<ui-lib-chart>` plus typed convenience wrappers:
- `<ui-lib-bar-chart>`
- `<ui-lib-line-chart>`
- `<ui-lib-pie-chart>`
- `<ui-lib-doughnut-chart>`

The implementation integrates Chart.js v4 while keeping the Angular API strongly typed (`ChartType`, `ChartData<TType>`, `ChartOptions<TType>`) and aligned with library conventions (standalone + OnPush + signal inputs/outputs).

---

## Features

- CSS variable theming bridge (`ChartThemeService`) maps `--uilib-chart-*` tokens into Chart.js options
- Typed convenience components for common chart types
- Generic chart wrapper for advanced types (`radar`, `polarArea`, `bubble`, `scatter`, mixed datasets)
- Reactive signal-based updates with incremental `chart.update()` when type is unchanged
- Tree-shakable Chart.js registration via `provideChartDefaults()` or custom registration
- Responsive by default (`responsive=true`, `maintainAspectRatio=true`)

---

## Installation

Chart.js is a peer dependency of the library.

```bash
npm install chart.js
```

---

## Usage

### Import from secondary entry point

```ts
import {
  ChartComponent,
  BarChartComponent,
  LineChartComponent,
  PieChartComponent,
  DoughnutChartComponent,
  provideChartDefaults,
} from 'ui-lib-custom/chart';
```

### Register Chart.js defaults

Use `provideChartDefaults()` during app setup (or one-time initialization path).

```ts
import { provideChartDefaults } from 'ui-lib-custom/chart';

provideChartDefaults();
```

### Basic wrapper example

```html
<ui-lib-bar-chart [data]="revenueData" [ariaLabel]="'Monthly revenue'" />
```

### Generic component example

```html
<ui-lib-chart
  type="radar"
  [data]="capabilityData"
  [ariaLabel]="'Platform capability radar chart'"
/>
```

---

## API Reference

### `ChartComponent` Inputs

| Input | Type | Default | Description |
|---|---|---:|---|
| `type` | `ChartType` | required | Chart.js chart type for current instance. |
| `data` | `ChartData<ChartType> \| null` | `null` | Dataset payload forwarded to Chart.js. |
| `options` | `ChartOptions<ChartType> \| null` | `null` | Consumer options merged over theme/base defaults. |
| `plugins` | `Plugin<ChartType>[]` | `[]` | Per-instance Chart.js plugins. |
| `size` | `ChartSize` (`'sm' \| 'md' \| 'lg'`) | `'md'` | Wrapper size token. |
| `responsive` | `boolean` | `true` | Enables responsive canvas behavior. |
| `maintainAspectRatio` | `boolean` | `true` | Preserves chart aspect ratio under responsive layout. |
| `ariaLabel` | `string` | `'Chart'` | Accessible label applied to canvas (`role="img"`). |
| `height` | `string \| null` | `null` | Optional host height override. |
| `width` | `string \| null` | `null` | Optional host width override. |

### `ChartComponent` Outputs

| Output | Payload | Description |
|---|---|---|
| `chartReady` | `Chart<ChartType>` | Emits once the Chart.js instance is created. |
| `chartClick` | `ChartClickEvent` | Emits when Chart.js click interaction resolves active elements. |
| `chartHover` | `ChartClickEvent` | Emits when Chart.js hover interaction resolves active elements. |

### `ChartComponent` Public Methods

| Method | Return Type | Description |
|---|---|---|
| `getChartInstance()` | `Chart<ChartType> \| null` | Returns the underlying Chart.js instance. |
| `refresh()` | `void` | Recreates the chart instance using latest inputs. |

### Convenience Components

`BarChartComponent`, `LineChartComponent`, `PieChartComponent`, and `DoughnutChartComponent`:
- forward the same wrapper inputs (`data`, `options`, `plugins`, `size`, `responsive`, `maintainAspectRatio`, `ariaLabel`, `height`, `width`)
- expose the same interaction outputs (`chartReady`, `chartClick`, `chartHover`)
- provide `getChartInstance()` and `refresh()` helper methods

### `ChartThemeService`

| Method | Signature | Description |
|---|---|---|
| `readThemeTokens` | `(element: Element) => ChartThemeTokens` | Reads and normalizes `--uilib-chart-*` CSS variables from computed styles. |
| `buildChartOptions` | `(tokens: ChartThemeTokens) => Partial<ChartOptions<ChartType>>` | Builds theme-derived Chart.js options for scales, legend, tooltip, and element defaults. |
| `buildColorPalette` | `(tokens: ChartThemeTokens, datasetCount: number) => string[]` | Produces dataset colors from theme palette with safe cycling/fallback. |

### `provideChartDefaults()`

| Function | Return Type | Description |
|---|---|---|
| `provideChartDefaults()` | `void` | Registers common Chart.js controllers/elements/scales/plugins for convenience setups. |

### Types

| Type | Description |
|---|---|
| `ChartType` | Supported chart union: `'bar' \| 'line' \| 'pie' \| 'doughnut' \| 'radar' \| 'polarArea' \| 'bubble' \| 'scatter'`. |
| `ChartSize` | Wrapper size union: `'sm' \| 'md' \| 'lg'`. |
| `ChartClickEvent` | Interaction payload with native `MouseEvent`, active elements, and chart instance. |
| `ChartThemeTokens` | Normalized theme token object consumed by `ChartThemeService`. |

---

## Theming

### CSS Variables

| Variable | Purpose |
|---|---|
| `--uilib-chart-min-height-sm` | Small wrapper minimum height |
| `--uilib-chart-min-height-md` | Medium wrapper minimum height |
| `--uilib-chart-min-height-lg` | Large wrapper minimum height |
| `--uilib-chart-min-height` | Active wrapper minimum height |
| `--uilib-chart-font-family` | Base chart font family |
| `--uilib-chart-font-size` | Base chart font size |
| `--uilib-chart-font-color` | Base text/tick color |
| `--uilib-chart-grid-color` | Grid line color |
| `--uilib-chart-border-color` | Axis/element border color |
| `--uilib-chart-background-color` | Element fill background default |
| `--uilib-chart-tooltip-background` | Tooltip background color |
| `--uilib-chart-tooltip-font-color` | Tooltip text color |
| `--uilib-chart-legend-font-color` | Legend text color |
| `--uilib-chart-color-1` | Palette color 1 |
| `--uilib-chart-color-2` | Palette color 2 |
| `--uilib-chart-color-3` | Palette color 3 |
| `--uilib-chart-color-4` | Palette color 4 |
| `--uilib-chart-color-5` | Palette color 5 |
| `--uilib-chart-color-6` | Palette color 6 |
| `--uilib-chart-color-7` | Palette color 7 |
| `--uilib-chart-color-8` | Palette color 8 |

### Theme override example

```scss
.custom-report-surface {
  --uilib-chart-font-color: #0f172a;
  --uilib-chart-grid-color: rgba(15, 23, 42, 0.14);
  --uilib-chart-border-color: rgba(15, 23, 42, 0.22);
  --uilib-chart-color-1: #2563eb;
  --uilib-chart-color-2: #10b981;
  --uilib-chart-color-3: #f59e0b;
}
```

### Variant notes

- **Material**: maps to Material-like neutral + semantic palette tokens
- **Bootstrap**: maps to Bootstrap body/border/semantic tokens
- **Minimal**: uses subdued monochrome palette derived from page foreground

---

## Advanced Usage

### Custom tree-shakable registration

For tighter bundle control, register only the Chart.js pieces you use.

```ts
import {
  BarController,
  BarElement,
  CategoryScale,
  Chart,
  Legend,
  LinearScale,
  Tooltip,
} from 'chart.js';

Chart.register(BarController, BarElement, CategoryScale, LinearScale, Tooltip, Legend);
```

### Access the Chart.js instance

```ts
const instance = chartComponent.getChartInstance();
instance?.update();
```

### Mixed chart types

Use generic `<ui-lib-chart type="bar">` and set per-dataset `type` values in data.

### Dynamic data updates

When chart type stays the same, updates flow through `chart.update()` (no full reinit).

### Plugin integration

Pass plugin instances with `[plugins]="[...]"` and plugin-specific options in `options.plugins`.

---

## Accessibility

- Canvas is rendered with `role="img"`
- Use `ariaLabel` to provide meaningful context for non-visual users
- Canvas charts have inherent accessibility limitations
- For critical data, provide a synchronized tabular/text alternative alongside charts

---

## Performance

- Chart.js uses canvas rendering, which is efficient for larger datasets
- Signal-driven updates avoid unnecessary Angular/template churn
- Data/options updates on same type use `chart.update()` instead of full recreation where possible


