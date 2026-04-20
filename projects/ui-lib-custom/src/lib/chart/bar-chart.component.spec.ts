import {
  ChangeDetectionStrategy,
  Component,
  provideZonelessChangeDetection,
  signal,
  type WritableSignal,
} from '@angular/core';
import type { ComponentFixture } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BarChartComponent } from './bar-chart.component';
import { ChartComponent } from './chart.component';
import type { ChartData, ChartOptions } from './chart.types';

jest.mock('chart.js', (): { Chart: jest.Mock } => ({
  Chart: jest.fn(),
}));

type ChartConstructorConfig = {
  type: string;
  data: unknown;
  options: unknown;
  plugins: unknown[];
};

type MockChartInstance = {
  data: unknown;
  options: unknown;
  config: { plugins: unknown[] };
  update: jest.Mock<void, []>;
  destroy: jest.Mock<void, []>;
  resize: jest.Mock<void, []>;
};

@Component({
  standalone: true,
  imports: [BarChartComponent],
  template: `
    <ui-lib-bar-chart [data]="data()" [options]="options()" [ariaLabel]="'Bar chart host'" />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class BarChartHostComponent {
  public readonly data: WritableSignal<ChartData<'bar'> | null> = signal<ChartData<'bar'> | null>(
    null
  );
  public readonly options: WritableSignal<ChartOptions<'bar'> | null> =
    signal<ChartOptions<'bar'> | null>(null);
}

function refreshFixture<T>(fixture: ComponentFixture<T>): void {
  fixture.changeDetectorRef.markForCheck();
  fixture.detectChanges();
}

function createBarData(values: readonly number[]): ChartData<'bar'> {
  return {
    labels: values.map((_: number, index: number): string => `L${index}`),
    datasets: [{ label: 'Bars', data: [...values] }],
  } as ChartData<'bar'>;
}

describe('BarChartComponent', (): void => {
  let fixture: ComponentFixture<BarChartHostComponent>;
  let host: BarChartHostComponent;
  let wrapper: BarChartComponent;
  let innerChart: ChartComponent;
  let chartConstructorMock: jest.Mock;
  let chartConfigs: ChartConstructorConfig[];
  let chartInstances: MockChartInstance[];

  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({
      imports: [BarChartHostComponent],
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

    fixture = TestBed.createComponent(BarChartHostComponent);
    host = fixture.componentInstance;
    refreshFixture(fixture);

    wrapper = fixture.debugElement.query(By.directive(BarChartComponent))
      .componentInstance as BarChartComponent;
    innerChart = fixture.debugElement.query(By.directive(ChartComponent))
      .componentInstance as ChartComponent;
  });

  afterEach((): void => {
    jest.restoreAllMocks();
  });

  it('renders with type "bar" hardcoded in inner chart config', (): void => {
    host.data.set(createBarData([1, 2, 3]));
    refreshFixture(fixture);

    expect(chartConfigs[0]?.type).toBe('bar');
  });

  it('passes through data input to inner ChartComponent', (): void => {
    const data: ChartData<'bar'> = createBarData([4, 5]);
    host.data.set(data);
    refreshFixture(fixture);

    expect(innerChart.data()).toBe(data);
  });

  it('passes through options input to inner ChartComponent', (): void => {
    const options: ChartOptions<'bar'> = { responsive: false } as ChartOptions<'bar'>;
    host.data.set(createBarData([6]));
    host.options.set(options);
    refreshFixture(fixture);

    expect(innerChart.options()).toBe(options);
  });

  it('delegates getChartInstance to inner ChartComponent', (): void => {
    host.data.set(createBarData([7]));
    refreshFixture(fixture);

    expect(wrapper.getChartInstance()).toBe(innerChart.getChartInstance());
  });

  it('delegates refresh to inner ChartComponent', (): void => {
    host.data.set(createBarData([8]));
    refreshFixture(fixture);

    const constructorCallsBeforeRefresh: number = chartConstructorMock.mock.calls.length;
    const firstInstance: MockChartInstance = chartInstances[0] as MockChartInstance;
    wrapper.refresh();
    refreshFixture(fixture);

    expect(firstInstance.destroy).toHaveBeenCalledTimes(1);
    expect(chartConstructorMock.mock.calls.length).toBe(constructorCallsBeforeRefresh + 1);
  });
});
