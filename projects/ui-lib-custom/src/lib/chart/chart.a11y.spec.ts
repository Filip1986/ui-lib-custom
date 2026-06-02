import {
  ChangeDetectionStrategy,
  Component,
  provideZonelessChangeDetection,
  signal,
  type WritableSignal,
} from '@angular/core';
import type { ComponentFixture } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';
import { checkA11y, SKIP_COLOR_CONTRAST_RULES } from '../../test/a11y-utils';
import type { ChartData, ChartType } from './chart.types';

jest.mock('chart.js', (): { Chart: jest.Mock } => ({
  Chart: jest.fn().mockImplementation(
    (): {
      data: unknown;
      options: unknown;
      config: { plugins: unknown[] };
      update: jest.Mock;
      destroy: jest.Mock;
    } => ({
      data: {},
      options: {},
      config: { plugins: [] },
      update: jest.fn(),
      destroy: jest.fn(),
    }),
  ),
}));

type ChartComponentCtor = new (...args: never[]) => object;
const chartComponentModule: { ChartComponent: ChartComponentCtor } = jest.requireActual(
  './chart.component',
) as { ChartComponent: ChartComponentCtor };
const ChartComponent: ChartComponentCtor = chartComponentModule.ChartComponent;

function createBarData(label: string, points: readonly number[]): ChartData<'bar'> {
  return {
    labels: points.map((_: number, index: number): string => `P${index}`),
    datasets: [{ label, data: [...points] }],
  };
}

function createMultiDatasetData(): ChartData<'bar'> {
  return {
    labels: ['Jan', 'Feb', 'Mar'],
    datasets: [
      { label: 'Revenue', data: [100, 200, 150] },
      { label: 'Expenses', data: [80, 120, 90] },
    ],
  };
}

function getCellText(cell: Element): string {
  return (cell as HTMLElement).textContent.trim();
}

// ── Host components ──────────────────────────────────────────────────────────

@Component({
  standalone: true,
  imports: [ChartComponent],
  template: `
    <ui-lib-chart
      [type]="type()"
      [data]="data()"
      [ariaLabel]="ariaLabel()"
      [showDataTable]="showDataTable()"
    />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class DefaultHostComponent {
  public readonly type: WritableSignal<ChartType> = signal<ChartType>('bar');
  public readonly data: WritableSignal<ChartData<ChartType> | null> =
    signal<ChartData<ChartType> | null>(null);
  public readonly ariaLabel: WritableSignal<string> = signal<string>('Sales chart');
  public readonly showDataTable: WritableSignal<boolean> = signal<boolean>(true);
}

async function createFixture(
  host: typeof DefaultHostComponent,
): Promise<ComponentFixture<DefaultHostComponent>> {
  await TestBed.configureTestingModule({
    imports: [host],
    providers: [provideZonelessChangeDetection()],
  }).compileComponents();

  const fixture: ComponentFixture<DefaultHostComponent> = TestBed.createComponent(host);
  document.body.appendChild(fixture.nativeElement as HTMLElement);
  fixture.detectChanges();
  await fixture.whenStable();
  return fixture;
}

// ── 1. ARIA structure ────────────────────────────────────────────────────────

describe('Chart Accessibility', (): void => {
  afterEach((): void => {
    jest.restoreAllMocks();
    TestBed.resetTestingModule();
    document.querySelectorAll('app-default-host-component').forEach((el: Element): void => {
      el.remove();
    });
  });

  describe('ARIA structure', (): void => {
    it('canvas has role="img"', async (): Promise<void> => {
      const fixture: ComponentFixture<DefaultHostComponent> =
        await createFixture(DefaultHostComponent);
      const hostEl: HTMLElement = fixture.nativeElement as HTMLElement;
      const canvas: Element | null = hostEl.querySelector('ui-lib-chart canvas');
      expect(canvas?.getAttribute('role')).toBe('img');
    });

    it('canvas has default aria-label "Sales chart"', async (): Promise<void> => {
      const fixture: ComponentFixture<DefaultHostComponent> =
        await createFixture(DefaultHostComponent);
      const hostEl: HTMLElement = fixture.nativeElement as HTMLElement;
      const canvas: Element | null = hostEl.querySelector('ui-lib-chart canvas');
      expect(canvas?.getAttribute('aria-label')).toBe('Sales chart');
    });

    it('canvas aria-label updates when ariaLabel input changes', async (): Promise<void> => {
      const fixture: ComponentFixture<DefaultHostComponent> =
        await createFixture(DefaultHostComponent);

      fixture.componentInstance.ariaLabel.set('Monthly Revenue');
      fixture.detectChanges();
      await fixture.whenStable();

      const hostEl: HTMLElement = fixture.nativeElement as HTMLElement;
      const canvas: Element | null = hostEl.querySelector('ui-lib-chart canvas');
      expect(canvas?.getAttribute('aria-label')).toBe('Monthly Revenue');
    });

    it('canvas has aria-describedby when showDataTable is true and data is present', async (): Promise<void> => {
      const fixture: ComponentFixture<DefaultHostComponent> =
        await createFixture(DefaultHostComponent);
      fixture.componentInstance.data.set(createBarData('Series', [1, 2, 3]));
      fixture.detectChanges();
      await fixture.whenStable();

      const hostEl: HTMLElement = fixture.nativeElement as HTMLElement;
      const canvas: Element | null = hostEl.querySelector('ui-lib-chart canvas');
      expect(canvas?.getAttribute('aria-describedby')).toBeTruthy();
    });

    it('canvas has no aria-describedby when showDataTable is false', async (): Promise<void> => {
      const fixture: ComponentFixture<DefaultHostComponent> =
        await createFixture(DefaultHostComponent);
      fixture.componentInstance.showDataTable.set(false);
      fixture.componentInstance.data.set(createBarData('Series', [1, 2, 3]));
      fixture.detectChanges();
      await fixture.whenStable();

      const hostEl: HTMLElement = fixture.nativeElement as HTMLElement;
      const canvas: Element | null = hostEl.querySelector('ui-lib-chart canvas');
      expect(canvas?.getAttribute('aria-describedby')).toBeNull();
    });
  });

  // ── 2. Visually-hidden data table ─────────────────────────────────────────

  describe('visually-hidden data table', (): void => {
    it('renders a data table when data is provided', async (): Promise<void> => {
      const fixture: ComponentFixture<DefaultHostComponent> =
        await createFixture(DefaultHostComponent);
      fixture.componentInstance.data.set(createBarData('Series A', [10, 20, 30]));
      fixture.detectChanges();
      await fixture.whenStable();

      const hostEl: HTMLElement = fixture.nativeElement as HTMLElement;
      const table: Element | null = hostEl.querySelector('ui-lib-chart table');
      expect(table).not.toBeNull();
    });

    it('does not render a data table when data is null', async (): Promise<void> => {
      const fixture: ComponentFixture<DefaultHostComponent> =
        await createFixture(DefaultHostComponent);
      const hostEl: HTMLElement = fixture.nativeElement as HTMLElement;
      const table: Element | null = hostEl.querySelector('ui-lib-chart table');
      expect(table).toBeNull();
    });

    it('does not render a data table when showDataTable is false', async (): Promise<void> => {
      const fixture: ComponentFixture<DefaultHostComponent> =
        await createFixture(DefaultHostComponent);
      fixture.componentInstance.showDataTable.set(false);
      fixture.componentInstance.data.set(createBarData('Series A', [10, 20, 30]));
      fixture.detectChanges();
      await fixture.whenStable();

      const hostEl: HTMLElement = fixture.nativeElement as HTMLElement;
      const table: Element | null = hostEl.querySelector('ui-lib-chart table');
      expect(table).toBeNull();
    });

    it('data table caption matches ariaLabel', async (): Promise<void> => {
      const fixture: ComponentFixture<DefaultHostComponent> =
        await createFixture(DefaultHostComponent);
      fixture.componentInstance.ariaLabel.set('Quarterly Revenue');
      fixture.componentInstance.data.set(createBarData('Revenue', [100, 200]));
      fixture.detectChanges();
      await fixture.whenStable();

      const hostEl: HTMLElement = fixture.nativeElement as HTMLElement;
      const caption: Element | null = hostEl.querySelector('ui-lib-chart table caption');
      expect((caption?.textContent ?? '').trim()).toBe('Quarterly Revenue');
    });

    it('data table has column headers derived from labels', async (): Promise<void> => {
      const fixture: ComponentFixture<DefaultHostComponent> =
        await createFixture(DefaultHostComponent);
      fixture.componentInstance.data.set(createBarData('Revenue', [100, 200, 300]));
      fixture.detectChanges();
      await fixture.whenStable();

      const hostEl: HTMLElement = fixture.nativeElement as HTMLElement;
      const headerCells: NodeListOf<Element> = hostEl.querySelectorAll('ui-lib-chart thead th');
      const headerTexts: string[] = Array.from(headerCells).map(getCellText);
      expect(headerTexts).toContain('Dataset');
      expect(headerTexts).toContain('P0');
      expect(headerTexts).toContain('P1');
      expect(headerTexts).toContain('P2');
    });

    it('data table row header contains dataset label', async (): Promise<void> => {
      const fixture: ComponentFixture<DefaultHostComponent> =
        await createFixture(DefaultHostComponent);
      fixture.componentInstance.data.set(createBarData('My Dataset', [50, 75]));
      fixture.detectChanges();
      await fixture.whenStable();

      const hostEl: HTMLElement = fixture.nativeElement as HTMLElement;
      const rowHeader: Element | null = hostEl.querySelector('ui-lib-chart tbody tr th');
      expect((rowHeader?.textContent ?? '').trim()).toBe('My Dataset');
    });

    it('data table cells contain correct values', async (): Promise<void> => {
      const fixture: ComponentFixture<DefaultHostComponent> =
        await createFixture(DefaultHostComponent);
      fixture.componentInstance.data.set(createBarData('Revenue', [42, 84, 21]));
      fixture.detectChanges();
      await fixture.whenStable();

      const hostEl: HTMLElement = fixture.nativeElement as HTMLElement;
      const dataCells: NodeListOf<Element> = hostEl.querySelectorAll('ui-lib-chart tbody td');
      const values: string[] = Array.from(dataCells).map(getCellText);
      expect(values).toEqual(['42', '84', '21']);
    });

    it('data table renders multiple datasets as separate rows', async (): Promise<void> => {
      const fixture: ComponentFixture<DefaultHostComponent> =
        await createFixture(DefaultHostComponent);
      fixture.componentInstance.data.set(createMultiDatasetData() as ChartData<ChartType>);
      fixture.detectChanges();
      await fixture.whenStable();

      const hostEl: HTMLElement = fixture.nativeElement as HTMLElement;
      const bodyRows: NodeListOf<Element> = hostEl.querySelectorAll('ui-lib-chart tbody tr');
      expect(bodyRows.length).toBe(2);
    });

    it('aria-describedby on canvas points to the table id', async (): Promise<void> => {
      const fixture: ComponentFixture<DefaultHostComponent> =
        await createFixture(DefaultHostComponent);
      fixture.componentInstance.data.set(createBarData('Revenue', [1, 2]));
      fixture.detectChanges();
      await fixture.whenStable();

      const hostEl: HTMLElement = fixture.nativeElement as HTMLElement;
      const canvas: Element | null = hostEl.querySelector('ui-lib-chart canvas');
      const table: Element | null = hostEl.querySelector('ui-lib-chart table');
      expect(canvas?.getAttribute('aria-describedby')).toBe(table?.getAttribute('id'));
    });

    it('each chart instance gets a unique table id', async (): Promise<void> => {
      await TestBed.configureTestingModule({
        imports: [DefaultHostComponent],
        providers: [provideZonelessChangeDetection()],
      }).compileComponents();

      const fixture1: ComponentFixture<DefaultHostComponent> =
        TestBed.createComponent(DefaultHostComponent);
      const fixture2: ComponentFixture<DefaultHostComponent> =
        TestBed.createComponent(DefaultHostComponent);

      document.body.appendChild(fixture1.nativeElement as HTMLElement);
      document.body.appendChild(fixture2.nativeElement as HTMLElement);

      fixture1.componentInstance.data.set(createBarData('A', [1]));
      fixture2.componentInstance.data.set(createBarData('B', [2]));
      fixture1.detectChanges();
      fixture2.detectChanges();
      await fixture1.whenStable();
      await fixture2.whenStable();

      const host1: HTMLElement = fixture1.nativeElement as HTMLElement;
      const host2: HTMLElement = fixture2.nativeElement as HTMLElement;
      const table1: Element | null = host1.querySelector('ui-lib-chart table');
      const table2: Element | null = host2.querySelector('ui-lib-chart table');
      expect(table1?.getAttribute('id')).not.toBeNull();
      expect(table2?.getAttribute('id')).not.toBeNull();
      expect(table1?.getAttribute('id')).not.toBe(table2?.getAttribute('id'));
    });
  });

  // ── 3. Reduced motion ─────────────────────────────────────────────────────

  describe('prefers-reduced-motion', (): void => {
    it('sets animation: false in Chart.js options when reduced motion is preferred', async (): Promise<void> => {
      const originalMatchMedia: typeof window.matchMedia = window.matchMedia;
      window.matchMedia = jest.fn().mockImplementation((query: string): MediaQueryList => {
        return {
          matches: query === '(prefers-reduced-motion: reduce)',
          media: query,
          onchange: null,
          addEventListener: jest.fn(),
          removeEventListener: jest.fn(),
          addListener: jest.fn(),
          removeListener: jest.fn(),
          dispatchEvent: jest.fn().mockReturnValue(false),
        } as MediaQueryList;
      });

      const chartModuleMock: { Chart: jest.Mock } = jest.requireMock('chart.js') as {
        Chart: jest.Mock;
      };
      const chartCtor: jest.Mock = chartModuleMock.Chart;
      chartCtor.mockClear();

      const fixture: ComponentFixture<DefaultHostComponent> =
        await createFixture(DefaultHostComponent);
      fixture.componentInstance.data.set(createBarData('Revenue', [1, 2]));
      fixture.detectChanges();
      await fixture.whenStable();

      const callArgs: unknown[] = chartCtor.mock.calls[0] as unknown[];
      const config: { options?: { animation?: unknown } } | undefined = callArgs[1] as
        | { options?: { animation?: unknown } }
        | undefined;
      expect(config?.options?.animation).toBe(false);

      window.matchMedia = originalMatchMedia;
    });

    it('does not disable animation when reduced motion is not preferred', async (): Promise<void> => {
      const chartModuleMock: { Chart: jest.Mock } = jest.requireMock('chart.js') as {
        Chart: jest.Mock;
      };
      const chartCtor: jest.Mock = chartModuleMock.Chart;
      chartCtor.mockClear();

      const fixture: ComponentFixture<DefaultHostComponent> =
        await createFixture(DefaultHostComponent);
      fixture.componentInstance.data.set(createBarData('Revenue', [1, 2]));
      fixture.detectChanges();
      await fixture.whenStable();

      const callArgs: unknown[] = chartCtor.mock.calls[0] as unknown[];
      const config: { options?: { animation?: unknown } } | undefined = callArgs[1] as
        | { options?: { animation?: unknown } }
        | undefined;
      expect(config?.options?.animation).toBeUndefined();
    });
  });

  // ── 4. axe-core automated checks ─────────────────────────────────────────

  describe('axe-core automated checks', (): void => {
    it('passes axe with no chart data', async (): Promise<void> => {
      const fixture: ComponentFixture<DefaultHostComponent> =
        await createFixture(DefaultHostComponent);
      await checkA11y(fixture, { rules: SKIP_COLOR_CONTRAST_RULES });
    });

    it('passes axe with chart data and visible table', async (): Promise<void> => {
      const fixture: ComponentFixture<DefaultHostComponent> =
        await createFixture(DefaultHostComponent);
      fixture.componentInstance.data.set(createBarData('Revenue', [10, 20, 30]));
      fixture.detectChanges();
      await fixture.whenStable();

      await checkA11y(fixture, { rules: SKIP_COLOR_CONTRAST_RULES });
    });

    it('passes axe with multi-dataset data', async (): Promise<void> => {
      const fixture: ComponentFixture<DefaultHostComponent> =
        await createFixture(DefaultHostComponent);
      fixture.componentInstance.data.set(createMultiDatasetData() as ChartData<ChartType>);
      fixture.detectChanges();
      await fixture.whenStable();

      await checkA11y(fixture, { rules: SKIP_COLOR_CONTRAST_RULES });
    });

    it('passes axe with showDataTable disabled', async (): Promise<void> => {
      const fixture: ComponentFixture<DefaultHostComponent> =
        await createFixture(DefaultHostComponent);
      fixture.componentInstance.showDataTable.set(false);
      fixture.componentInstance.data.set(createBarData('Revenue', [10, 20, 30]));
      fixture.detectChanges();
      await fixture.whenStable();

      await checkA11y(fixture, { rules: SKIP_COLOR_CONTRAST_RULES });
    });
  });
});
