import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  ViewEncapsulation,
  effect,
  inject,
  input,
  output,
  viewChild,
} from '@angular/core';
import type { EffectRef, InputSignal, OutputEmitterRef, Signal } from '@angular/core';
import { Chart, type ActiveElement, type ChartEvent, type Plugin } from 'chart.js';
import { ChartThemeService } from './chart-theme.service';
import type {
  ChartClickEvent,
  ChartData,
  ChartOptions,
  ChartSize,
  ChartThemeTokens,
  ChartType,
} from './chart.types';

/**
 * Generic Chart.js wrapper component with theme-aware reactive updates.
 */
@Component({
  selector: 'ui-lib-chart',
  standalone: true,
  templateUrl: './chart.component.html',
  styleUrl: './chart.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'ui-lib-chart',
    '[class.ui-lib-chart--sm]': "size() === 'sm'",
    '[class.ui-lib-chart--md]': "size() === 'md'",
    '[class.ui-lib-chart--lg]': "size() === 'lg'",
    '[style.height]': 'height()',
    '[style.width]': 'width()',
  },
})
export class ChartComponent {
  /** Required chart type for the current chart instance. */
  public readonly type: InputSignal<ChartType> = input.required<ChartType>();

  /** Data passed directly to Chart.js. */
  public readonly data: InputSignal<ChartData<ChartType> | null> =
    input<ChartData<ChartType> | null>(null);

  /** Consumer chart options merged on top of theme-derived options. */
  public readonly options: InputSignal<ChartOptions<ChartType> | null> =
    input<ChartOptions<ChartType> | null>(null);

  /** Inline Chart.js plugins for this chart instance. */
  public readonly plugins: InputSignal<Plugin<ChartType>[]> = input<Plugin<ChartType>[]>([]);

  /** Wrapper size token. */
  public readonly size: InputSignal<ChartSize> = input<ChartSize>('md');

  /** Enables responsive chart layout behavior. */
  public readonly responsive: InputSignal<boolean> = input<boolean>(true);

  /** Keeps chart aspect ratio when responsive sizing is enabled. */
  public readonly maintainAspectRatio: InputSignal<boolean> = input<boolean>(true);

  /** ARIA label applied to the rendered canvas. */
  public readonly ariaLabel: InputSignal<string> = input<string>('Chart');

  /** Optional host height override. */
  public readonly height: InputSignal<string | null> = input<string | null>(null);

  /** Optional host width override. */
  public readonly width: InputSignal<string | null> = input<string | null>(null);

  /** Emits when a chart data element is clicked. */
  public readonly chartClick: OutputEmitterRef<ChartClickEvent> = output<ChartClickEvent>();

  /** Emits when a chart data element is hovered. */
  public readonly chartHover: OutputEmitterRef<ChartClickEvent> = output<ChartClickEvent>();

  /** Emits after the underlying Chart.js instance is created. */
  public readonly chartReady: OutputEmitterRef<Chart<ChartType>> = output<Chart<ChartType>>();

  private readonly hostElementRef: ElementRef<HTMLElement> =
    inject<ElementRef<HTMLElement>>(ElementRef);

  private readonly destroyRef: DestroyRef = inject(DestroyRef);

  private readonly chartCanvas: Signal<ElementRef<HTMLCanvasElement> | undefined> =
    viewChild<ElementRef<HTMLCanvasElement>>('chartCanvas');

  private readonly chartThemeService: ChartThemeService;

  private readonly chartUpdateEffect: EffectRef;

  private chartInstance: Chart<ChartType> | null = null;

  private renderedType: ChartType | null = null;

  constructor() {
    this.chartThemeService = new ChartThemeService();

    this.chartUpdateEffect = effect((): void => {
      this.type();
      this.data();
      this.options();
      this.plugins();
      this.responsive();
      this.maintainAspectRatio();
      this.chartCanvas();
      this.updateChart();
    });

    this.destroyRef.onDestroy((): void => {
      this.chartUpdateEffect.destroy();
      this.destroyChart();
    });
  }

  /** Returns the current Chart.js instance for advanced integrations. */
  public getChartInstance(): Chart<ChartType> | null {
    return this.chartInstance;
  }

  /** Forces a full chart re-creation cycle. */
  public refresh(): void {
    this.destroyChart();
    this.updateChart();
  }

  private updateChart(): void {
    const canvasElementRef: ElementRef<HTMLCanvasElement> | undefined = this.chartCanvas();
    const chartData: ChartData<ChartType> | null = this.data();

    if (!canvasElementRef || !chartData) {
      return;
    }

    const themeTokens: ChartThemeTokens = this.chartThemeService.readThemeTokens(
      this.hostElementRef.nativeElement
    );
    const resolvedData: ChartData<ChartType> = this.resolveChartData(chartData, themeTokens);
    const mergedOptions: ChartOptions<ChartType> = this.resolveMergedOptions(themeTokens);

    const nextType: ChartType = this.type();
    if (!this.chartInstance) {
      this.createChart(canvasElementRef.nativeElement, nextType, resolvedData, mergedOptions);
      return;
    }

    if (this.renderedType !== nextType) {
      this.destroyChart();
      this.createChart(canvasElementRef.nativeElement, nextType, resolvedData, mergedOptions);
      return;
    }

    this.chartInstance.data = resolvedData;
    this.chartInstance.options = mergedOptions;
    this.chartInstance.config.plugins = this.plugins();
    this.chartInstance.update();
  }

  private createChart(
    canvasElement: HTMLCanvasElement,
    chartType: ChartType,
    chartData: ChartData<ChartType>,
    chartOptions: ChartOptions<ChartType>
  ): void {
    this.chartInstance = new Chart<ChartType>(canvasElement, {
      type: chartType,
      data: chartData,
      options: chartOptions,
      plugins: this.plugins(),
    });

    this.renderedType = chartType;
    this.chartReady.emit(this.chartInstance);
  }

  private resolveMergedOptions(themeTokens: ChartThemeTokens): ChartOptions<ChartType> {
    const themeOptions: Partial<ChartOptions<ChartType>> =
      this.chartThemeService.buildChartOptions(themeTokens);

    const baseOptions: Partial<ChartOptions<ChartType>> = {
      responsive: this.responsive(),
      maintainAspectRatio: this.maintainAspectRatio(),
      onClick: (
        event: ChartEvent,
        activeElements: ActiveElement[],
        chart: Chart<ChartType>
      ): void => {
        this.emitChartInteraction(this.chartClick, event, activeElements, chart);
      },
      onHover: (
        event: ChartEvent,
        activeElements: ActiveElement[],
        chart: Chart<ChartType>
      ): void => {
        this.emitChartInteraction(this.chartHover, event, activeElements, chart);
      },
    };

    const consumerOptions: Partial<ChartOptions<ChartType>> = this.options() ?? {};

    return this.mergeOptions(this.mergeOptions(themeOptions, baseOptions), consumerOptions);
  }

  private resolveChartData(
    chartData: ChartData<ChartType>,
    themeTokens: ChartThemeTokens
  ): ChartData<ChartType> {
    const datasetEntries: readonly unknown[] = chartData.datasets as readonly unknown[];
    if (datasetEntries.length === 0) {
      return chartData;
    }

    const palette: string[] = this.chartThemeService.buildColorPalette(
      themeTokens,
      datasetEntries.length
    );
    const firstPaletteColor: string = palette[0] ?? themeTokens.borderColor;

    const mappedDatasets: unknown[] = datasetEntries.map(
      (dataset: unknown, index: number): unknown => {
        if (!this.shouldApplyDatasetBackgroundColor(dataset)) {
          return dataset;
        }

        const datasetRecord: Record<string, unknown> = dataset as Record<string, unknown>;
        return {
          ...datasetRecord,
          backgroundColor: palette[index] ?? firstPaletteColor,
        };
      }
    );

    return {
      ...chartData,
      datasets: mappedDatasets as ChartData<ChartType>['datasets'],
    } as ChartData<ChartType>;
  }

  private shouldApplyDatasetBackgroundColor(dataset: unknown): boolean {
    if (!dataset || typeof dataset !== 'object') {
      return false;
    }

    const datasetRecord: Record<string, unknown> = dataset as Record<string, unknown>;
    return (
      datasetRecord['backgroundColor'] === undefined || datasetRecord['backgroundColor'] === null
    );
  }

  private emitChartInteraction(
    emitter: OutputEmitterRef<ChartClickEvent>,
    chartEvent: ChartEvent,
    activeElements: ActiveElement[],
    chart: Chart<ChartType>
  ): void {
    if (activeElements.length === 0) {
      return;
    }

    const nativeEvent: unknown = chartEvent.native;
    if (!(nativeEvent instanceof MouseEvent)) {
      return;
    }

    emitter.emit({
      event: nativeEvent,
      activeElements,
      chart,
    });
  }

  private mergeOptions(
    baseOptions: Partial<ChartOptions<ChartType>>,
    overrideOptions: Partial<ChartOptions<ChartType>>
  ): ChartOptions<ChartType> {
    const baseScales: Record<string, unknown> =
      (baseOptions.scales as Record<string, unknown> | undefined) ?? {};
    const overrideScales: Record<string, unknown> =
      (overrideOptions.scales as Record<string, unknown> | undefined) ?? {};

    const baseScaleX: Record<string, unknown> =
      (baseScales['x'] as Record<string, unknown> | undefined) ?? {};
    const overrideScaleX: Record<string, unknown> =
      (overrideScales['x'] as Record<string, unknown> | undefined) ?? {};

    const baseScaleY: Record<string, unknown> =
      (baseScales['y'] as Record<string, unknown> | undefined) ?? {};
    const overrideScaleY: Record<string, unknown> =
      (overrideScales['y'] as Record<string, unknown> | undefined) ?? {};

    const baseScaleXTicks: Record<string, unknown> =
      (baseScaleX['ticks'] as Record<string, unknown> | undefined) ?? {};
    const overrideScaleXTicks: Record<string, unknown> =
      (overrideScaleX['ticks'] as Record<string, unknown> | undefined) ?? {};
    const baseScaleXGrid: Record<string, unknown> =
      (baseScaleX['grid'] as Record<string, unknown> | undefined) ?? {};
    const overrideScaleXGrid: Record<string, unknown> =
      (overrideScaleX['grid'] as Record<string, unknown> | undefined) ?? {};
    const baseScaleXBorder: Record<string, unknown> =
      (baseScaleX['border'] as Record<string, unknown> | undefined) ?? {};
    const overrideScaleXBorder: Record<string, unknown> =
      (overrideScaleX['border'] as Record<string, unknown> | undefined) ?? {};

    const baseScaleYTicks: Record<string, unknown> =
      (baseScaleY['ticks'] as Record<string, unknown> | undefined) ?? {};
    const overrideScaleYTicks: Record<string, unknown> =
      (overrideScaleY['ticks'] as Record<string, unknown> | undefined) ?? {};
    const baseScaleYGrid: Record<string, unknown> =
      (baseScaleY['grid'] as Record<string, unknown> | undefined) ?? {};
    const overrideScaleYGrid: Record<string, unknown> =
      (overrideScaleY['grid'] as Record<string, unknown> | undefined) ?? {};
    const baseScaleYBorder: Record<string, unknown> =
      (baseScaleY['border'] as Record<string, unknown> | undefined) ?? {};
    const overrideScaleYBorder: Record<string, unknown> =
      (overrideScaleY['border'] as Record<string, unknown> | undefined) ?? {};

    return {
      ...baseOptions,
      ...overrideOptions,
      font: {
        ...(baseOptions.font ?? {}),
        ...(overrideOptions.font ?? {}),
      },
      plugins: {
        ...(baseOptions.plugins ?? {}),
        ...(overrideOptions.plugins ?? {}),
        legend: {
          ...(baseOptions.plugins?.legend ?? {}),
          ...(overrideOptions.plugins?.legend ?? {}),
          labels: {
            ...(baseOptions.plugins?.legend?.labels ?? {}),
            ...(overrideOptions.plugins?.legend?.labels ?? {}),
          },
        },
        tooltip: {
          ...(baseOptions.plugins?.tooltip ?? {}),
          ...(overrideOptions.plugins?.tooltip ?? {}),
        },
      },
      scales: {
        ...(baseOptions.scales ?? {}),
        ...(overrideOptions.scales ?? {}),
        x: {
          ...baseScaleX,
          ...overrideScaleX,
          ticks: {
            ...baseScaleXTicks,
            ...overrideScaleXTicks,
          },
          grid: {
            ...baseScaleXGrid,
            ...overrideScaleXGrid,
          },
          border: {
            ...baseScaleXBorder,
            ...overrideScaleXBorder,
          },
        },
        y: {
          ...baseScaleY,
          ...overrideScaleY,
          ticks: {
            ...baseScaleYTicks,
            ...overrideScaleYTicks,
          },
          grid: {
            ...baseScaleYGrid,
            ...overrideScaleYGrid,
          },
          border: {
            ...baseScaleYBorder,
            ...overrideScaleYBorder,
          },
        },
      },
      elements: {
        ...(baseOptions.elements ?? {}),
        ...(overrideOptions.elements ?? {}),
        line: {
          ...(baseOptions.elements?.line ?? {}),
          ...(overrideOptions.elements?.line ?? {}),
        },
        bar: {
          ...(baseOptions.elements?.bar ?? {}),
          ...(overrideOptions.elements?.bar ?? {}),
        },
        arc: {
          ...(baseOptions.elements?.arc ?? {}),
          ...(overrideOptions.elements?.arc ?? {}),
        },
        point: {
          ...(baseOptions.elements?.point ?? {}),
          ...(overrideOptions.elements?.point ?? {}),
        },
      },
    } as ChartOptions<ChartType>;
  }

  private destroyChart(): void {
    if (!this.chartInstance) {
      return;
    }

    this.chartInstance.destroy();
    this.chartInstance = null;
    this.renderedType = null;
  }
}
