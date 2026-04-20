import {
  ChangeDetectionStrategy,
  Component,
  type DebugElement,
  provideZonelessChangeDetection,
  signal,
  type WritableSignal,
} from '@angular/core';
import type { ComponentFixture } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import type { ChartComponent as ChartComponentType } from './chart.component';
import { ChartThemeService } from './chart-theme.service';
import type { ChartClickEvent, ChartData, ChartOptions, ChartType } from './chart.types';

jest.mock('chart.js', (): { Chart: jest.Mock } => ({
  Chart: jest.fn(),
}));

type ChartComponentCtor = new (...args: never[]) => ChartComponentType;
const chartComponentModule: { ChartComponent: ChartComponentCtor } = jest.requireActual(
  './chart.component'
) as { ChartComponent: ChartComponentCtor };
const ChartComponent: ChartComponentCtor = chartComponentModule.ChartComponent;

type ChartConstructorConfig = {
  type: ChartType;
  data: ChartData<ChartType>;
  options: ChartOptions<ChartType>;
  plugins: unknown[];
};

type MockChartInstance = {
  data: ChartData<ChartType>;
  options: ChartOptions<ChartType>;
  config: { plugins: unknown[] };
  update: jest.Mock<void, []>;
  destroy: jest.Mock<void, []>;
  resize: jest.Mock<void, []>;
};

type ChartPlugins = ReturnType<ChartComponentType['plugins']>;

@Component({
  standalone: true,
  imports: [ChartComponent],
  template: `
    <ui-lib-chart
      [type]="type()"
      [data]="data()"
      [options]="options()"
      [plugins]="plugins()"
      [size]="size()"
      [responsive]="responsive()"
      [maintainAspectRatio]="maintainAspectRatio()"
      [ariaLabel]="ariaLabel()"
      [height]="height()"
      [width]="width()"
      (chartReady)="onChartReady($event)"
      (chartClick)="onChartClick($event)"
      (chartHover)="onChartHover($event)"
    />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class ChartHostComponent {
  public readonly type: WritableSignal<ChartType> = signal<ChartType>('bar');
  public readonly data: WritableSignal<ChartData<ChartType> | null> =
    signal<ChartData<ChartType> | null>(null);
  public readonly options: WritableSignal<ChartOptions<ChartType> | null> =
    signal<ChartOptions<ChartType> | null>(null);
  public readonly plugins: WritableSignal<ChartPlugins> = signal<ChartPlugins>([]);
  public readonly size: WritableSignal<'sm' | 'md' | 'lg'> = signal<'sm' | 'md' | 'lg'>('md');
  public readonly responsive: WritableSignal<boolean> = signal<boolean>(true);
  public readonly maintainAspectRatio: WritableSignal<boolean> = signal<boolean>(true);
  public readonly ariaLabel: WritableSignal<string> = signal<string>('Chart');
  public readonly height: WritableSignal<string | null> = signal<string | null>(null);
  public readonly width: WritableSignal<string | null> = signal<string | null>(null);

  public readonly chartReadyEvents: unknown[] = [];
  public readonly chartClickEvents: ChartClickEvent[] = [];
  public readonly chartHoverEvents: ChartClickEvent[] = [];

  public onChartReady(chart: unknown): void {
    this.chartReadyEvents.push(chart);
  }

  public onChartClick(event: Event): void {
    this.chartClickEvents.push(event as unknown as ChartClickEvent);
  }

  public onChartHover(event: Event): void {
    this.chartHoverEvents.push(event as unknown as ChartClickEvent);
  }
}

function refreshFixture<T>(fixture: ComponentFixture<T>): void {
  fixture.changeDetectorRef.markForCheck();
  fixture.detectChanges();
}

function createBarData(label: string, points: readonly number[]): ChartData<ChartType> {
  return {
    labels: points.map((_: number, index: number): string => `P${index}`),
    datasets: [{ label, data: [...points] }],
  } as ChartData<ChartType>;
}

describe('ChartComponent', (): void => {
  let fixture: ComponentFixture<ChartHostComponent>;
  let host: ChartHostComponent;
  let chartComponent: ChartComponentType;
  let chartElement: HTMLElement;
  let chartConstructorMock: jest.Mock;
  let chartConfigs: ChartConstructorConfig[];
  let chartInstances: MockChartInstance[];

  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({
      imports: [ChartHostComponent],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    const chartModuleMock: { Chart: jest.Mock } = jest.requireMock('chart.js') as {
      Chart: jest.Mock;
    };
    chartConstructorMock = chartModuleMock.Chart;
    chartConstructorMock.mockReset();
    chartConfigs = [];
    chartInstances = [];

    chartConstructorMock.mockImplementation(
      (canvas: HTMLCanvasElement, config: ChartConstructorConfig): MockChartInstance => {
        void canvas;
        chartConfigs.push(config);

        const instance: MockChartInstance = {
          data: config.data,
          options: config.options,
          config: { plugins: config.plugins },
          update: jest.fn<void, []>(),
          destroy: jest.fn<void, []>(),
          resize: jest.fn<void, []>(),
        };
        chartInstances.push(instance);
        return instance;
      }
    );

    fixture = TestBed.createComponent(ChartHostComponent);
    host = fixture.componentInstance;
    refreshFixture(fixture);

    const chartDebugElement: DebugElement = fixture.debugElement.query(
      By.directive(ChartComponent)
    );
    chartComponent = chartDebugElement.componentInstance as ChartComponentType;
    const resolvedChartElement: HTMLElement | null = (
      fixture.nativeElement as HTMLElement
    ).querySelector('ui-lib-chart');
    if (!resolvedChartElement) {
      throw new Error('Expected ui-lib-chart host element.');
    }

    chartElement = resolvedChartElement;
  });

  afterEach((): void => {
    jest.restoreAllMocks();
  });

  it('renders a canvas element and host class', (): void => {
    const canvas: HTMLCanvasElement | null = chartElement.querySelector('canvas');

    expect(canvas).not.toBeNull();
    expect(chartElement.classList.contains('ui-lib-chart')).toBe(true);
  });

  it('applies size classes', (): void => {
    host.size.set('sm');
    refreshFixture(fixture);
    expect(chartElement.classList.contains('ui-lib-chart--sm')).toBe(true);

    host.size.set('md');
    refreshFixture(fixture);
    expect(chartElement.classList.contains('ui-lib-chart--md')).toBe(true);

    host.size.set('lg');
    refreshFixture(fixture);
    expect(chartElement.classList.contains('ui-lib-chart--lg')).toBe(true);
  });

  it('sets aria-label on the canvas', (): void => {
    host.ariaLabel.set('Revenue chart');
    refreshFixture(fixture);

    const canvas: HTMLCanvasElement = chartElement.querySelector('canvas') as HTMLCanvasElement;
    expect(canvas.getAttribute('aria-label')).toBe('Revenue chart');
  });

  it('applies custom height and width styles on host', (): void => {
    host.height.set('420px');
    host.width.set('640px');
    refreshFixture(fixture);

    expect(chartElement.style.height).toBe('420px');
    expect(chartElement.style.width).toBe('640px');
  });

  it('creates a Chart instance when data is provided', (): void => {
    host.data.set(createBarData('Series A', [1, 2, 3]));
    refreshFixture(fixture);

    expect(chartConstructorMock).toHaveBeenCalledTimes(1);
    expect(host.chartReadyEvents.length).toBe(1);
  });

  it('does not create a Chart instance when data is null', (): void => {
    expect(host.data()).toBeNull();
    expect(chartConstructorMock).not.toHaveBeenCalled();
  });

  it('destroys Chart instance on component destroy', (): void => {
    host.data.set(createBarData('Series A', [1]));
    refreshFixture(fixture);

    const firstInstance: MockChartInstance = chartInstances[0] as MockChartInstance;
    fixture.destroy();

    expect(firstInstance.destroy).toHaveBeenCalledTimes(1);
  });

  it('recreates Chart instance when type changes', (): void => {
    host.data.set(createBarData('Series A', [1, 2]));
    refreshFixture(fixture);

    const firstInstance: MockChartInstance = chartInstances[0] as MockChartInstance;

    host.type.set('line');
    host.data.set(createBarData('Series B', [3, 4]));
    refreshFixture(fixture);

    expect(firstInstance.destroy).toHaveBeenCalledTimes(1);
    expect(chartConstructorMock).toHaveBeenCalledTimes(2);
  });

  it('calls chart.update when data changes without type change', (): void => {
    host.data.set(createBarData('Series A', [1, 2]));
    refreshFixture(fixture);

    const firstInstance: MockChartInstance = chartInstances[0] as MockChartInstance;

    host.data.set(createBarData('Series A', [5, 6]));
    refreshFixture(fixture);

    expect(firstInstance.update).toHaveBeenCalledTimes(1);
    expect(chartConstructorMock).toHaveBeenCalledTimes(1);
  });

  it('calls chart.update when options change without type change', (): void => {
    host.data.set(createBarData('Series A', [1, 2]));
    refreshFixture(fixture);

    const firstInstance: MockChartInstance = chartInstances[0] as MockChartInstance;

    host.options.set({ responsive: false } as ChartOptions<ChartType>);
    refreshFixture(fixture);

    expect(firstInstance.update).toHaveBeenCalledTimes(1);
    expect(chartConstructorMock).toHaveBeenCalledTimes(1);
  });

  it('reads CSS tokens from the chart host before creating chart', (): void => {
    const readThemeTokensSpy: jest.SpiedFunction<
      typeof ChartThemeService.prototype.readThemeTokens
    > = jest.spyOn(ChartThemeService.prototype, 'readThemeTokens');

    host.data.set(createBarData('Series A', [1]));
    refreshFixture(fixture);

    expect(readThemeTokensSpy).toHaveBeenCalled();
    expect(readThemeTokensSpy.mock.calls[0]?.[0]).toBe(chartElement);
  });

  it('merges theme options as base and lets consumer options win', (): void => {
    jest.spyOn(ChartThemeService.prototype, 'readThemeTokens').mockReturnValue({
      fontFamily: 'ThemeFont',
      fontSize: 12,
      fontColor: '#111111',
      gridColor: '#222222',
      borderColor: '#333333',
      backgroundColor: '#444444',
      tooltipBackground: '#555555',
      tooltipFontColor: '#666666',
      legendFontColor: '#777777',
      colorPalette: ['#1', '#2', '#3', '#4', '#5', '#6', '#7', '#8'],
    });
    jest.spyOn(ChartThemeService.prototype, 'buildChartOptions').mockReturnValue({
      color: 'theme-color',
      plugins: {
        legend: {
          labels: {
            color: 'theme-legend',
          },
        },
      },
      scales: {
        x: {
          grid: {
            color: 'theme-grid',
          },
        },
      },
    } as Partial<ChartOptions<ChartType>>);

    host.options.set({
      color: 'consumer-color',
      plugins: {
        legend: {
          labels: {
            color: 'consumer-legend',
          },
        },
      },
    } as ChartOptions<ChartType>);
    host.data.set(createBarData('Series A', [1]));
    refreshFixture(fixture);

    const config: ChartConstructorConfig = chartConfigs[0] as ChartConstructorConfig;
    expect(config.options.color).toBe('consumer-color');
    expect(config.options.plugins?.legend?.labels?.color).toBe('consumer-legend');
    expect(config.options.scales?.['x']?.grid?.color).toBe('theme-grid');
  });

  it('applies theme palette background color only when dataset backgroundColor is missing', (): void => {
    jest
      .spyOn(ChartThemeService.prototype, 'buildColorPalette')
      .mockReturnValue(['#theme-1', '#theme-2']);

    host.data.set({
      labels: ['A'],
      datasets: [
        { label: 'Series A', data: [1] },
        { label: 'Series B', data: [2], backgroundColor: '#consumer' },
      ],
    } as ChartData<ChartType>);
    refreshFixture(fixture);

    const config: ChartConstructorConfig = chartConfigs[0] as ChartConstructorConfig;
    const datasets: unknown[] = config.data.datasets as unknown[];
    const firstDataset: Record<string, unknown> = datasets[0] as Record<string, unknown>;
    const secondDataset: Record<string, unknown> = datasets[1] as Record<string, unknown>;

    expect(firstDataset['backgroundColor']).toBe('#theme-1');
    expect(secondDataset['backgroundColor']).toBe('#consumer');
  });

  it('emits chartClick when Chart.js onClick callback is invoked with active elements', (): void => {
    host.data.set(createBarData('Series A', [1]));
    refreshFixture(fixture);

    const config: ChartConstructorConfig = chartConfigs[0] as ChartConstructorConfig;
    const clickHandler: (event: unknown, activeElements: unknown[], chart: unknown) => void = config
      .options.onClick as (event: unknown, activeElements: unknown[], chart: unknown) => void;

    clickHandler(
      { native: new MouseEvent('click') },
      [{ datasetIndex: 0, index: 0 }],
      chartInstances[0] as unknown
    );

    expect(host.chartClickEvents.length).toBe(1);
    expect(host.chartClickEvents[0]?.activeElements.length).toBe(1);
  });

  it('emits chartHover when Chart.js onHover callback is invoked with active elements', (): void => {
    host.data.set(createBarData('Series A', [1]));
    refreshFixture(fixture);

    const config: ChartConstructorConfig = chartConfigs[0] as ChartConstructorConfig;
    const hoverHandler: (event: unknown, activeElements: unknown[], chart: unknown) => void = config
      .options.onHover as (event: unknown, activeElements: unknown[], chart: unknown) => void;

    hoverHandler(
      { native: new MouseEvent('mousemove') },
      [{ datasetIndex: 0, index: 0 }],
      chartInstances[0] as unknown
    );

    expect(host.chartHoverEvents.length).toBe(1);
    expect(host.chartHoverEvents[0]?.event.type).toBe('mousemove');
  });

  it('getChartInstance returns null before initialization', (): void => {
    expect(chartComponent.getChartInstance()).toBeNull();
  });

  it('getChartInstance returns current chart instance after initialization', (): void => {
    host.data.set(createBarData('Series A', [7, 8]));
    refreshFixture(fixture);

    const chartInstance: unknown = chartComponent.getChartInstance();

    expect(chartInstance).toBe(chartInstances[0]);
  });

  it('refresh destroys and recreates the chart', (): void => {
    host.data.set(createBarData('Series A', [2, 4]));
    refreshFixture(fixture);

    const firstInstance: MockChartInstance = chartInstances[0] as MockChartInstance;

    chartComponent.refresh();
    refreshFixture(fixture);

    expect(firstInstance.destroy).toHaveBeenCalledTimes(1);
    expect(chartConstructorMock).toHaveBeenCalledTimes(2);
  });
});
