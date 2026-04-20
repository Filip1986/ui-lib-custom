import type {
  ActiveElement,
  Chart as ChartJsInstance,
  ChartData as ChartJsData,
  ChartOptions as ChartJsOptions,
} from 'chart.js';

/** Supported chart type constants for `ui-lib-custom` chart APIs. */
export const CHART_TYPES: Readonly<{
  Bar: 'bar';
  Line: 'line';
  Pie: 'pie';
  Doughnut: 'doughnut';
  Radar: 'radar';
  PolarArea: 'polarArea';
  Bubble: 'bubble';
  Scatter: 'scatter';
}> = {
  Bar: 'bar',
  Line: 'line',
  Pie: 'pie',
  Doughnut: 'doughnut',
  Radar: 'radar',
  PolarArea: 'polarArea',
  Bubble: 'bubble',
  Scatter: 'scatter',
} as const;

/** Union of chart type values supported by `ui-lib-custom`. */
export type ChartType = (typeof CHART_TYPES)[keyof typeof CHART_TYPES];

/** Size token constants for chart wrapper presentation. */
export const CHART_SIZES: Readonly<{
  Small: 'sm';
  Medium: 'md';
  Large: 'lg';
}> = {
  Small: 'sm',
  Medium: 'md',
  Large: 'lg',
} as const;

/** Union of chart size values supported by `ui-lib-custom`. */
export type ChartSize = (typeof CHART_SIZES)[keyof typeof CHART_SIZES];

/** Typed alias around Chart.js `ChartData` for consumer convenience. */
export type ChartData<TType extends ChartType = ChartType> = ChartJsData<TType>;

/** Typed alias around Chart.js `ChartOptions` for consumer convenience. */
export type ChartOptions<TType extends ChartType = ChartType> = ChartJsOptions<TType>;

/** Typed alias around Chart.js runtime chart instance. */
export type ChartInstance<TType extends ChartType = ChartType> = ChartJsInstance<TType>;

/** Click event payload emitted by chart components. */
export interface ChartClickEvent {
  readonly event: MouseEvent;
  readonly activeElements: ActiveElement[];
  readonly chart: ChartInstance;
}

/** Normalized theme tokens consumed by `ChartThemeService`. */
export interface ChartThemeTokens {
  readonly fontFamily: string;
  readonly fontSize: number;
  readonly fontColor: string;
  readonly gridColor: string;
  readonly borderColor: string;
  readonly backgroundColor: string;
  readonly tooltipBackground: string;
  readonly tooltipFontColor: string;
  readonly legendFontColor: string;
  readonly colorPalette: readonly string[];
}
