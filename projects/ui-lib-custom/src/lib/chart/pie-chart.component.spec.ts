import {
  ChangeDetectionStrategy,
  Component,
  provideZonelessChangeDetection,
  signal,
  type WritableSignal,
} from '@angular/core';
import type { ComponentFixture } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';
import { PieChartComponent } from './pie-chart.component';
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
  imports: [PieChartComponent],
  template: '<ui-lib-pie-chart [data]="data()" />',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class PieChartHostComponent {
  public readonly data: WritableSignal<ChartData<'pie'> | null> = signal<ChartData<'pie'> | null>(
    null
  );
}

function refreshFixture<T>(fixture: ComponentFixture<T>): void {
  fixture.changeDetectorRef.markForCheck();
  fixture.detectChanges();
}

function createPieData(): ChartData<'pie'> {
  return {
    labels: ['A', 'B'],
    datasets: [{ label: 'Pie', data: [10, 20] }],
  } as ChartData<'pie'>;
}

describe('PieChartComponent', (): void => {
  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({
      imports: [PieChartHostComponent],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();
  });

  afterEach((): void => {
    jest.restoreAllMocks();
  });

  it('renders host component', (): void => {
    const fixture: ComponentFixture<PieChartHostComponent> =
      TestBed.createComponent(PieChartHostComponent);
    refreshFixture(fixture);

    const hostElement: HTMLElement = fixture.nativeElement as HTMLElement;
    expect(hostElement.querySelector('ui-lib-pie-chart')).not.toBeNull();
  });

  it('creates chart with hardcoded type "pie"', (): void => {
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

    const fixture: ComponentFixture<PieChartHostComponent> =
      TestBed.createComponent(PieChartHostComponent);
    fixture.componentInstance.data.set(createPieData());
    refreshFixture(fixture);

    expect(chartConfigs[0]?.type).toBe('pie');
  });
});
