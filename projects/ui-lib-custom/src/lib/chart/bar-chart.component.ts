import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  input,
  output,
  viewChild,
} from '@angular/core';
import type { InputSignal, OutputEmitterRef, Signal } from '@angular/core';
import type { Chart, Plugin } from 'chart.js';
import { ChartComponent } from './chart.component';
import type { ChartClickEvent, ChartData, ChartOptions, ChartSize } from './chart.types';

/** Typed convenience wrapper for a bar chart. */
@Component({
  selector: 'ui-lib-bar-chart',
  standalone: true,
  imports: [ChartComponent],
  templateUrl: './bar-chart.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'ui-lib-bar-chart',
  },
})
export class BarChartComponent {
  /** Data for a Chart.js bar chart. */
  public readonly data: InputSignal<ChartData<'bar'> | null> = input<ChartData<'bar'> | null>(null);

  /** Options for a Chart.js bar chart. */
  public readonly options: InputSignal<ChartOptions<'bar'> | null> =
    input<ChartOptions<'bar'> | null>(null);

  /** Inline plugins forwarded to the generic chart wrapper. */
  public readonly plugins: InputSignal<Plugin[]> = input<Plugin[]>([]);

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

  /** Emits when a bar chart data element is clicked. */
  public readonly chartClick: OutputEmitterRef<ChartClickEvent> = output<ChartClickEvent>();

  /** Emits when a bar chart data element is hovered. */
  public readonly chartHover: OutputEmitterRef<ChartClickEvent> = output<ChartClickEvent>();

  /** Emits when the underlying Chart.js instance is created. */
  public readonly chartReady: OutputEmitterRef<Chart> = output<Chart>();

  private readonly chartComponent: Signal<ChartComponent | undefined> = viewChild(ChartComponent);

  /** Returns the current Chart.js instance. */
  public getChartInstance(): Chart<'bar'> | null {
    const chartComponent: ChartComponent | undefined = this.chartComponent();
    const chartInstance: Chart | null = chartComponent?.getChartInstance() ?? null;
    return chartInstance as Chart<'bar'> | null;
  }

  /** Forces a full chart re-creation cycle. */
  public refresh(): void {
    this.chartComponent()?.refresh();
  }
}
