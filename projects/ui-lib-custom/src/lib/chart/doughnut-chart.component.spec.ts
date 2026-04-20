import {
  ChangeDetectionStrategy,
  Component,
  provideZonelessChangeDetection,
  signal,
  type WritableSignal,
} from '@angular/core';
import type { ComponentFixture } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';
import { DoughnutChartComponent } from './doughnut-chart.component';
import type { ChartData } from './chart.types';

jest.mock('chart.js', (): { Chart: jest.Mock } => ({
  Chart: jest.fn(),
}));

type ChartConstructorConfig = {
  type: string;
  data: unknown;
};

@Component({
  standalone: true,
  imports: [DoughnutChartComponent],
  template: '<ui-lib-doughnut-chart [data]="data()" />',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class DoughnutChartHostComponent {
  public readonly data: WritableSignal<ChartData<'doughnut'> | null> =
    signal<ChartData<'doughnut'> | null>(null);
}

function refreshFixture<T>(fixture: ComponentFixture<T>): void {
  fixture.changeDetectorRef.markForCheck();
  fixture.detectChanges();
}

function createDoughnutData(): ChartData<'doughnut'> {
  return {
    labels: ['A', 'B'],
    datasets: [{ label: 'Doughnut', data: [30, 70] }],
  } as ChartData<'doughnut'>;
}

describe('DoughnutChartComponent', (): void => {
  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({
      imports: [DoughnutChartHostComponent],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();
  });

  afterEach((): void => {
    jest.restoreAllMocks();
  });

  it('renders host component', (): void => {
    const fixture: ComponentFixture<DoughnutChartHostComponent> = TestBed.createComponent(
      DoughnutChartHostComponent
    );
    refreshFixture(fixture);

    const hostElement: HTMLElement = fixture.nativeElement as HTMLElement;
    expect(hostElement.querySelector('ui-lib-doughnut-chart')).not.toBeNull();
  });

  it('creates chart with hardcoded type "doughnut"', (): void => {
    const chartModuleMock: { Chart: jest.Mock } = jest.requireMock('chart.js') as {
      Chart: jest.Mock;
    };
    const chartConstructorMock: jest.Mock = chartModuleMock.Chart;
    chartConstructorMock.mockReset();
    const chartConfigs: ChartConstructorConfig[] = [];

    chartConstructorMock.mockImplementation(
      (_canvas: HTMLCanvasElement, config: ChartConstructorConfig): unknown => {
        chartConfigs.push(config);
        return {
          data: config.data,
          options: {},
          config: { plugins: [] },
          update: jest.fn<void, []>(),
          destroy: jest.fn<void, []>(),
          resize: jest.fn<void, []>(),
        };
      }
    );

    const fixture: ComponentFixture<DoughnutChartHostComponent> = TestBed.createComponent(
      DoughnutChartHostComponent
    );
    fixture.componentInstance.data.set(createDoughnutData());
    refreshFixture(fixture);

    expect(chartConfigs[0]?.type).toBe('doughnut');
  });
});
