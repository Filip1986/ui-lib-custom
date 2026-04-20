import {
  ChangeDetectionStrategy,
  Component,
  provideZonelessChangeDetection,
  signal,
  type WritableSignal,
} from '@angular/core';
import type { ComponentFixture } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';
import { LineChartComponent } from './line-chart.component';
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
  imports: [LineChartComponent],
  template: '<ui-lib-line-chart [data]="data()" />',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class LineChartHostComponent {
  public readonly data: WritableSignal<ChartData<'line'> | null> = signal<ChartData<'line'> | null>(
    null
  );
}

function refreshFixture<T>(fixture: ComponentFixture<T>): void {
  fixture.changeDetectorRef.markForCheck();
  fixture.detectChanges();
}

function createLineData(): ChartData<'line'> {
  return {
    labels: ['A', 'B'],
    datasets: [{ label: 'Line', data: [1, 2] }],
  } as ChartData<'line'>;
}

describe('LineChartComponent', (): void => {
  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({
      imports: [LineChartHostComponent],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();
  });

  afterEach((): void => {
    jest.restoreAllMocks();
  });

  it('renders host component', (): void => {
    const fixture: ComponentFixture<LineChartHostComponent> =
      TestBed.createComponent(LineChartHostComponent);
    refreshFixture(fixture);

    const hostElement: HTMLElement = fixture.nativeElement as HTMLElement;
    expect(hostElement.querySelector('ui-lib-line-chart')).not.toBeNull();
  });

  it('creates chart with hardcoded type "line"', (): void => {
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

    const fixture: ComponentFixture<LineChartHostComponent> =
      TestBed.createComponent(LineChartHostComponent);
    fixture.componentInstance.data.set(createLineData());
    refreshFixture(fixture);

    expect(chartConfigs[0]?.type).toBe('line');
  });
});
