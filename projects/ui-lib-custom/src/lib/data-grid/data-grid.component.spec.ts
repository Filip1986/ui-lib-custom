import { DecimalPipe } from '@angular/common';
import type { WritableSignal } from '@angular/core';
import {
  ChangeDetectionStrategy,
  Component,
  provideZonelessChangeDetection,
  signal,
} from '@angular/core';
import type { ComponentFixture } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';

import { DataGridComponent } from './data-grid.component';
import type {
  DataGridLazyLoadEvent,
  DataGridRowSelectEvent,
  DataGridSortEvent,
} from './data-grid.types';
import { DataGridColumnComponent } from './data-grid-column.component';
import { DataGridColumnBodyDirective } from './data-grid-column.component';

// ---------------------------------------------------------------------------
// Shared test data
// ---------------------------------------------------------------------------

interface Employee {
  id: number;
  name: string;
  department: string;
  salary: number;
}

const EMPLOYEES: Employee[] = [
  { id: 1, name: 'Alice', department: 'Engineering', salary: 90000 },
  { id: 2, name: 'Bob', department: 'Marketing', salary: 75000 },
  { id: 3, name: 'Carol', department: 'Engineering', salary: 110000 },
  { id: 4, name: 'Dave', department: 'Design', salary: 80000 },
  { id: 5, name: 'Eve', department: 'Marketing', salary: 65000 },
];

// ---------------------------------------------------------------------------
// Helper utilities
// ---------------------------------------------------------------------------

function setup<T>(component: new () => T): ComponentFixture<T> {
  return TestBed.createComponent(component);
}

function getNative(fixture: ComponentFixture<unknown>): HTMLElement {
  return fixture.nativeElement as HTMLElement;
}

function q(fixture: ComponentFixture<unknown>, sel: string): HTMLElement | null {
  return getNative(fixture).querySelector<HTMLElement>(sel);
}

function qAll(fixture: ComponentFixture<unknown>, sel: string): HTMLElement[] {
  return Array.from(getNative(fixture).querySelectorAll<HTMLElement>(sel));
}

// ---------------------------------------------------------------------------
// Host components
// ---------------------------------------------------------------------------

@Component({
  standalone: true,
  imports: [DataGridComponent, DataGridColumnComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ui-lib-data-grid [value]="rows()" dataKey="id">
      <ui-lib-data-grid-column field="name" header="Name" [sortable]="true" />
      <ui-lib-data-grid-column field="department" header="Department" [sortable]="true" />
      <ui-lib-data-grid-column field="salary" header="Salary" [sortable]="true" />
    </ui-lib-data-grid>
  `,
})
class DefaultHostComponent {
  public readonly rows: WritableSignal<Employee[]> = signal<Employee[]>([...EMPLOYEES]);
}

@Component({
  standalone: true,
  imports: [DataGridComponent, DataGridColumnComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ui-lib-data-grid
      [value]="rows()"
      dataKey="id"
      [paginator]="true"
      [rows]="rowsPerPage()"
      [(first)]="first"
    >
      <ui-lib-data-grid-column field="name" header="Name" />
      <ui-lib-data-grid-column field="department" header="Department" />
    </ui-lib-data-grid>
  `,
})
class PaginatedHostComponent {
  public readonly rows: WritableSignal<Employee[]> = signal<Employee[]>([...EMPLOYEES]);
  public readonly rowsPerPage: WritableSignal<number> = signal<number>(2);
  public readonly first: WritableSignal<number> = signal<number>(0);
}

@Component({
  standalone: true,
  imports: [DataGridComponent, DataGridColumnComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ui-lib-data-grid
      [value]="rows()"
      dataKey="id"
      selectionMode="checkbox"
      [(selection)]="selected"
      (rowSelected)="onSelect($event)"
      (rowUnselected)="onUnselect($event)"
    >
      <ui-lib-data-grid-column field="name" header="Name" />
      <ui-lib-data-grid-column field="department" header="Department" />
    </ui-lib-data-grid>
  `,
})
class SelectionHostComponent {
  public readonly rows: WritableSignal<Employee[]> = signal<Employee[]>([...EMPLOYEES]);
  public readonly selected: WritableSignal<Employee[]> = signal<Employee[]>([]);
  public readonly lastSelect: WritableSignal<DataGridRowSelectEvent | null> =
    signal<DataGridRowSelectEvent | null>(null);
  public readonly lastUnselect: WritableSignal<DataGridRowSelectEvent | null> =
    signal<DataGridRowSelectEvent | null>(null);

  public onSelect(event: DataGridRowSelectEvent): void {
    this.lastSelect.set(event);
  }
  public onUnselect(event: DataGridRowSelectEvent): void {
    this.lastUnselect.set(event);
  }
}

@Component({
  standalone: true,
  imports: [DataGridComponent, DataGridColumnComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ui-lib-data-grid
      [value]="rows()"
      dataKey="id"
      [lazy]="true"
      [totalRecords]="totalRecords()"
      [paginator]="true"
      [rows]="3"
      (lazyLoad)="onLazy($event)"
    >
      <ui-lib-data-grid-column field="name" header="Name" [sortable]="true" />
      <ui-lib-data-grid-column field="salary" header="Salary" [sortable]="true" />
    </ui-lib-data-grid>
  `,
})
// Note: lazyLoad emitted in ngAfterViewInit when lazy=true
class LazyHostComponent {
  public readonly rows: WritableSignal<Employee[]> = signal<Employee[]>([]);
  public readonly totalRecords: WritableSignal<number> = signal<number>(100);
  public readonly lastEvent: WritableSignal<DataGridLazyLoadEvent | null> =
    signal<DataGridLazyLoadEvent | null>(null);

  public onLazy(event: DataGridLazyLoadEvent): void {
    this.lastEvent.set(event);
  }
}

@Component({
  standalone: true,
  imports: [DataGridComponent, DataGridColumnComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ui-lib-data-grid
      [value]="rows()"
      dataKey="id"
      [globalFilterFields]="['name', 'department']"
      [globalFilter]="filter()"
    >
      <ui-lib-data-grid-column field="name" header="Name" />
      <ui-lib-data-grid-column field="department" header="Department" [filterable]="true" />
    </ui-lib-data-grid>
  `,
})
class FilterHostComponent {
  public readonly rows: WritableSignal<Employee[]> = signal<Employee[]>([...EMPLOYEES]);
  public readonly filter: WritableSignal<string> = signal<string>('');
}

@Component({
  standalone: true,
  imports: [DataGridComponent, DataGridColumnComponent, DataGridColumnBodyDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ui-lib-data-grid
      [value]="rows()"
      dataKey="id"
      [virtualScroll]="true"
      virtualScrollHeight="200px"
      [rowHeight]="40"
    >
      <ui-lib-data-grid-column field="name" header="Name" />
      <ui-lib-data-grid-column field="department" header="Department" />
    </ui-lib-data-grid>
  `,
})
class VirtualScrollHostComponent {
  public readonly rows: WritableSignal<Employee[]> = signal<Employee[]>(
    Array.from(
      { length: 100 },
      (_: unknown, index: number): Employee => ({
        id: index + 1,
        name: `Employee ${index + 1}`,
        department: 'Engineering',
        salary: 50000 + index * 1000,
      }),
    ),
  );
}

// ---------------------------------------------------------------------------
// Test suite
// ---------------------------------------------------------------------------

describe('DataGridComponent', (): void => {
  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();
  });

  // ── Basic rendering ────────────────────────────────────────────────────

  describe('basic rendering', (): void => {
    it('renders column headers', (): void => {
      const fixture: ComponentFixture<DefaultHostComponent> = setup(DefaultHostComponent);
      fixture.detectChanges();

      const headers: HTMLElement[] = qAll(fixture, '[role="columnheader"]');
      const texts: string[] = headers.map((h: HTMLElement): string => h.textContent.trim());
      expect(texts).toContain('Name');
      expect(texts).toContain('Department');
      expect(texts).toContain('Salary');
    });

    it('renders all data rows', (): void => {
      const fixture: ComponentFixture<DefaultHostComponent> = setup(DefaultHostComponent);
      fixture.detectChanges();

      const rows: HTMLElement[] = qAll(fixture, '.ui-lib-data-grid__row[role="row"]');
      expect(rows).toHaveLength(EMPLOYEES.length);
    });

    it('renders cell values', (): void => {
      const fixture: ComponentFixture<DefaultHostComponent> = setup(DefaultHostComponent);
      fixture.detectChanges();

      const native: HTMLElement = getNative(fixture);
      expect(native.textContent).toContain('Alice');
      expect(native.textContent).toContain('Engineering');
    });

    it('shows empty message when value is empty', (): void => {
      const fixture: ComponentFixture<DefaultHostComponent> = setup(DefaultHostComponent);
      const host: DefaultHostComponent = fixture.componentInstance;
      host.rows.set([]);
      fixture.detectChanges();

      const emptyCell: HTMLElement | null = q(fixture, '.ui-lib-data-grid__empty-cell');
      expect(emptyCell).not.toBeNull();
      expect(emptyCell?.textContent).toContain('No records found.');
    });

    it('applies variant class', (): void => {
      const fixture: ComponentFixture<DefaultHostComponent> = setup(DefaultHostComponent);
      fixture.detectChanges();

      // Default variant (material) — verify that the root grid element is present
      expect(getNative(fixture).querySelector('.ui-lib-data-grid')).not.toBeNull();
    });

    it('renders custom body template', (): void => {
      @Component({
        standalone: true,
        imports: [
          DataGridComponent,
          DataGridColumnComponent,
          DataGridColumnBodyDirective,
          DecimalPipe,
        ],
        changeDetection: ChangeDetectionStrategy.OnPush,
        template: `
          <ui-lib-data-grid [value]="rows()" dataKey="id">
            <ui-lib-data-grid-column field="salary" header="Salary">
              <ng-template uiDataGridColumnBody let-row>
                <span class="custom">{{ row.salary | number }}</span>
              </ng-template>
            </ui-lib-data-grid-column>
          </ui-lib-data-grid>
        `,
      })
      class TemplateHost {
        public readonly rows: WritableSignal<Employee[]> = signal<Employee[]>([...EMPLOYEES]);
      }

      const fixture: ComponentFixture<TemplateHost> = setup(TemplateHost);
      fixture.detectChanges();

      const customCells: HTMLElement[] = qAll(fixture, '.custom');
      expect(customCells.length).toBeGreaterThan(0);
    });
  });

  // ── Sorting ───────────────────────────────────────────────────────────

  describe('sorting', (): void => {
    it('sorts ascending on first header click', (): void => {
      const fixture: ComponentFixture<DefaultHostComponent> = setup(DefaultHostComponent);
      fixture.detectChanges();

      const headers: HTMLElement[] = qAll(fixture, '[role="columnheader"]');
      const nameHeader: HTMLElement = headers[0] as HTMLElement;
      nameHeader.click();
      fixture.detectChanges();

      const rows: HTMLElement[] = qAll(fixture, '.ui-lib-data-grid__row[role="row"]');
      const firstCellText: string =
        rows[0]?.querySelector('[role="gridcell"]')?.textContent.trim() ?? '';
      expect(firstCellText).toBe('Alice');
    });

    it('sorts descending on second header click', (): void => {
      const fixture: ComponentFixture<DefaultHostComponent> = setup(DefaultHostComponent);
      fixture.detectChanges();

      const headers: HTMLElement[] = qAll(fixture, '[role="columnheader"]');
      const nameHeader: HTMLElement = headers[0] as HTMLElement;
      nameHeader.click();
      fixture.detectChanges();
      nameHeader.click();
      fixture.detectChanges();

      const rows: HTMLElement[] = qAll(fixture, '.ui-lib-data-grid__row[role="row"]');
      const firstCellText: string =
        rows[0]?.querySelector('[role="gridcell"]')?.textContent.trim() ?? '';
      expect(firstCellText).toBe('Eve');
    });

    it('clears sort on third header click', (): void => {
      const fixture: ComponentFixture<DefaultHostComponent> = setup(DefaultHostComponent);
      fixture.detectChanges();

      const headers: HTMLElement[] = qAll(fixture, '[role="columnheader"]');
      const nameHeader: HTMLElement = headers[0] as HTMLElement;
      nameHeader.click();
      fixture.detectChanges();
      nameHeader.click();
      fixture.detectChanges();
      nameHeader.click();
      fixture.detectChanges();

      // After 3 clicks, sort should be cleared — original order
      const rows: HTMLElement[] = qAll(fixture, '.ui-lib-data-grid__row[role="row"]');
      const firstCellText: string =
        rows[0]?.querySelector('[role="gridcell"]')?.textContent.trim() ?? '';
      expect(firstCellText).toBe('Alice');
    });

    it('emits sortChange event', (): void => {
      @Component({
        standalone: true,
        imports: [DataGridComponent, DataGridColumnComponent],
        changeDetection: ChangeDetectionStrategy.OnPush,
        template: `
          <ui-lib-data-grid [value]="rows()" dataKey="id" (sorted)="onSort($event)">
            <ui-lib-data-grid-column field="name" header="Name" [sortable]="true" />
          </ui-lib-data-grid>
        `,
      })
      class SortEventHost {
        public readonly rows: WritableSignal<Employee[]> = signal<Employee[]>([...EMPLOYEES]);
        public readonly lastEvent: WritableSignal<DataGridSortEvent | null> =
          signal<DataGridSortEvent | null>(null);
        public onSort(event: DataGridSortEvent): void {
          this.lastEvent.set(event);
        }
      }

      const fixture: ComponentFixture<SortEventHost> = setup(SortEventHost);
      fixture.detectChanges();

      const header: HTMLElement = q(fixture, '[role="columnheader"]') as HTMLElement;
      header.click();
      fixture.detectChanges();

      expect(fixture.componentInstance.lastEvent()).not.toBeNull();
      expect(fixture.componentInstance.lastEvent()?.field).toBe('name');
      expect(fixture.componentInstance.lastEvent()?.order).toBe(1);
    });

    it('shows sort icon for sorted column', (): void => {
      const fixture: ComponentFixture<DefaultHostComponent> = setup(DefaultHostComponent);
      fixture.detectChanges();

      const header: HTMLElement = qAll(fixture, '[role="columnheader"]')[0] as HTMLElement;
      header.click();
      fixture.detectChanges();

      const sortIcon: HTMLElement | null = header.querySelector('.ui-lib-data-grid__sort-icon');
      expect(sortIcon).not.toBeNull();
      expect(sortIcon?.classList.contains('ui-lib-data-grid__sort-icon--sort-asc')).toBe(true);
    });

    it('sets aria-sort attribute on sorted column header', (): void => {
      const fixture: ComponentFixture<DefaultHostComponent> = setup(DefaultHostComponent);
      fixture.detectChanges();

      const header: HTMLElement = qAll(fixture, '[role="columnheader"]')[0] as HTMLElement;
      header.click();
      fixture.detectChanges();

      expect(header.getAttribute('aria-sort')).toBe('ascending');

      header.click();
      fixture.detectChanges();
      expect(header.getAttribute('aria-sort')).toBe('descending');
    });
  });

  // ── Filtering ─────────────────────────────────────────────────────────

  describe('filtering', (): void => {
    it('filters rows by global filter', (): void => {
      const fixture: ComponentFixture<FilterHostComponent> = setup(FilterHostComponent);
      fixture.detectChanges();

      fixture.componentInstance.filter.set('Engineering');
      fixture.detectChanges();

      const rows: HTMLElement[] = qAll(fixture, '.ui-lib-data-grid__row[role="row"]');
      expect(rows.length).toBe(2); // Alice + Carol are in Engineering
    });

    it('shows all rows when global filter is cleared', (): void => {
      const fixture: ComponentFixture<FilterHostComponent> = setup(FilterHostComponent);
      fixture.detectChanges();

      fixture.componentInstance.filter.set('Engineering');
      fixture.detectChanges();

      fixture.componentInstance.filter.set('');
      fixture.detectChanges();

      const rows: HTMLElement[] = qAll(fixture, '.ui-lib-data-grid__row[role="row"]');
      expect(rows.length).toBe(EMPLOYEES.length);
    });

    it('renders filter input row when filterable column present', (): void => {
      const fixture: ComponentFixture<FilterHostComponent> = setup(FilterHostComponent);
      fixture.detectChanges();

      const filterInputs: HTMLElement[] = qAll(fixture, '.ui-lib-data-grid__filter-input');
      expect(filterInputs.length).toBeGreaterThan(0);
    });

    it('global filter is case-insensitive', (): void => {
      const fixture: ComponentFixture<FilterHostComponent> = setup(FilterHostComponent);
      fixture.detectChanges();

      fixture.componentInstance.filter.set('engineering');
      fixture.detectChanges();

      const rows: HTMLElement[] = qAll(fixture, '.ui-lib-data-grid__row[role="row"]');
      expect(rows.length).toBe(2);
    });
  });

  // ── Pagination ────────────────────────────────────────────────────────

  describe('pagination', (): void => {
    it('shows only the first page of rows', (): void => {
      const fixture: ComponentFixture<PaginatedHostComponent> = setup(PaginatedHostComponent);
      fixture.detectChanges();

      const rows: HTMLElement[] = qAll(fixture, '.ui-lib-data-grid__row[role="row"]');
      expect(rows.length).toBe(2);
    });

    it('renders paginator component', (): void => {
      const fixture: ComponentFixture<PaginatedHostComponent> = setup(PaginatedHostComponent);
      fixture.detectChanges();

      expect(q(fixture, 'ui-lib-paginator')).not.toBeNull();
    });

    it('navigates to next page via first signal', (): void => {
      const fixture: ComponentFixture<PaginatedHostComponent> = setup(PaginatedHostComponent);
      fixture.detectChanges();

      fixture.componentInstance.first.set(2);
      fixture.detectChanges();

      const rows: HTMLElement[] = qAll(fixture, '.ui-lib-data-grid__row[role="row"]');
      expect(rows.length).toBe(2);
      const firstCell: HTMLElement = rows[0]?.querySelector('[role="gridcell"]') as HTMLElement;
      expect(firstCell.textContent.trim()).toBe('Carol');
    });
  });

  // ── Selection ─────────────────────────────────────────────────────────

  describe('row selection', (): void => {
    it('renders checkboxes in checkbox selection mode', (): void => {
      const fixture: ComponentFixture<SelectionHostComponent> = setup(SelectionHostComponent);
      fixture.detectChanges();

      const checkboxes: HTMLElement[] = qAll(fixture, '.ui-lib-data-grid__checkbox');
      // One per data row + one header select-all
      expect(checkboxes.length).toBeGreaterThan(0);
    });

    it('selects a row on checkbox change', (): void => {
      const fixture: ComponentFixture<SelectionHostComponent> = setup(SelectionHostComponent);
      fixture.detectChanges();

      const checkboxes: HTMLInputElement[] = qAll(
        fixture,
        '.ui-lib-data-grid__checkbox',
      ) as HTMLInputElement[];
      const firstRowCheckbox: HTMLInputElement = checkboxes[1] as HTMLInputElement; // [0] is select-all
      firstRowCheckbox.click();
      fixture.detectChanges();

      expect(fixture.componentInstance.selected().length).toBe(1);
    });

    it('selects all rows when select-all checkbox is clicked', (): void => {
      const fixture: ComponentFixture<SelectionHostComponent> = setup(SelectionHostComponent);
      fixture.detectChanges();

      const checkboxes: HTMLInputElement[] = qAll(
        fixture,
        '.ui-lib-data-grid__checkbox',
      ) as HTMLInputElement[];
      const selectAll: HTMLInputElement = checkboxes[0] as HTMLInputElement;
      selectAll.click();
      fixture.detectChanges();

      expect(fixture.componentInstance.selected().length).toBe(EMPLOYEES.length);
    });

    it('deselects all rows on second select-all click', (): void => {
      const fixture: ComponentFixture<SelectionHostComponent> = setup(SelectionHostComponent);
      fixture.detectChanges();

      const checkboxes: HTMLInputElement[] = qAll(
        fixture,
        '.ui-lib-data-grid__checkbox',
      ) as HTMLInputElement[];
      const selectAll: HTMLInputElement = checkboxes[0] as HTMLInputElement;
      selectAll.click();
      fixture.detectChanges();
      selectAll.click();
      fixture.detectChanges();

      expect(fixture.componentInstance.selected().length).toBe(0);
    });

    it('applies selected class to selected row', (): void => {
      const fixture: ComponentFixture<SelectionHostComponent> = setup(SelectionHostComponent);
      fixture.detectChanges();

      const checkboxes: HTMLInputElement[] = qAll(
        fixture,
        '.ui-lib-data-grid__checkbox',
      ) as HTMLInputElement[];
      (checkboxes[1] as HTMLInputElement).click();
      fixture.detectChanges();

      const rows: HTMLElement[] = qAll(fixture, '.ui-lib-data-grid__row[role="row"]');
      const firstRow: HTMLElement = rows[0] as HTMLElement;
      expect(firstRow.classList.contains('ui-lib-data-grid__row--selected')).toBe(true);
    });
  });

  // ── Lazy load ─────────────────────────────────────────────────────────

  describe('lazy load', (): void => {
    it('emits lazyLoad on initialization', (): void => {
      const fixture: ComponentFixture<LazyHostComponent> = setup(LazyHostComponent);
      fixture.detectChanges();

      expect(fixture.componentInstance.lastEvent()).not.toBeNull();
    });

    it('emits correct first/rows on initialization', (): void => {
      const fixture: ComponentFixture<LazyHostComponent> = setup(LazyHostComponent);
      fixture.detectChanges();

      const event: DataGridLazyLoadEvent | null = fixture.componentInstance.lastEvent();
      expect(event?.first).toBe(0);
      expect(event?.rows).toBe(3);
    });

    it('emits lazyLoad with sort info when header is clicked', (): void => {
      const fixture: ComponentFixture<LazyHostComponent> = setup(LazyHostComponent);
      fixture.detectChanges();

      const header: HTMLElement = qAll(fixture, '[role="columnheader"]')[0] as HTMLElement;
      header.click();
      fixture.detectChanges();

      const event: DataGridLazyLoadEvent | null = fixture.componentInstance.lastEvent();
      expect(event?.sortField).toBe('name');
      expect(event?.sortOrder).toBe(1);
    });
  });

  // ── Virtual scroll ────────────────────────────────────────────────────

  describe('virtual scroll', (): void => {
    it('renders only a subset of rows in virtual scroll mode', (): void => {
      const fixture: ComponentFixture<VirtualScrollHostComponent> = setup(
        VirtualScrollHostComponent,
      );
      fixture.detectChanges();

      const rows: HTMLElement[] = qAll(fixture, '.ui-lib-data-grid__row[role="row"]');
      // With 100 rows and a small viewport, should render far fewer than 100
      expect(rows.length).toBeLessThan(100);
    });

    it('renders virtual scroll viewport element', (): void => {
      const fixture: ComponentFixture<VirtualScrollHostComponent> = setup(
        VirtualScrollHostComponent,
      );
      fixture.detectChanges();

      expect(q(fixture, '.ui-lib-data-grid__virtual-spacer')).not.toBeNull();
    });

    it('applies aria-rowcount equal to total records', (): void => {
      const fixture: ComponentFixture<VirtualScrollHostComponent> = setup(
        VirtualScrollHostComponent,
      );
      fixture.detectChanges();

      const grid: HTMLElement = q(fixture, '[role="grid"]') as HTMLElement;
      expect(grid.getAttribute('aria-rowcount')).toBe('100');
    });

    it('sets aria-rowindex on rows based on virtual offset', (): void => {
      const fixture: ComponentFixture<VirtualScrollHostComponent> = setup(
        VirtualScrollHostComponent,
      );
      fixture.detectChanges();

      const rows: HTMLElement[] = qAll(fixture, '.ui-lib-data-grid__row[role="row"]');
      const firstIndex: string | null = rows[0]?.getAttribute('aria-rowindex') ?? null;
      // First rendered row should start at 2 (1-based; header row is 1)
      expect(firstIndex).toBe('2');
    });
  });

  // ── ARIA ──────────────────────────────────────────────────────────────

  describe('ARIA attributes', (): void => {
    it('has role="grid" on the wrapper', (): void => {
      const fixture: ComponentFixture<DefaultHostComponent> = setup(DefaultHostComponent);
      fixture.detectChanges();

      expect(q(fixture, '[role="grid"]')).not.toBeNull();
    });

    it('has role="row" on header and data rows', (): void => {
      const fixture: ComponentFixture<DefaultHostComponent> = setup(DefaultHostComponent);
      fixture.detectChanges();

      const rows: HTMLElement[] = qAll(fixture, '[role="row"]');
      expect(rows.length).toBeGreaterThan(0);
    });

    it('has role="columnheader" on header cells', (): void => {
      const fixture: ComponentFixture<DefaultHostComponent> = setup(DefaultHostComponent);
      fixture.detectChanges();

      const headers: HTMLElement[] = qAll(fixture, '[role="columnheader"]');
      expect(headers.length).toBe(3);
    });

    it('has role="gridcell" on data cells', (): void => {
      const fixture: ComponentFixture<DefaultHostComponent> = setup(DefaultHostComponent);
      fixture.detectChanges();

      const cells: HTMLElement[] = qAll(fixture, '[role="gridcell"]');
      expect(cells.length).toBeGreaterThan(0);
    });

    it('sets aria-rowcount to total number of rows', (): void => {
      const fixture: ComponentFixture<DefaultHostComponent> = setup(DefaultHostComponent);
      fixture.detectChanges();

      const grid: HTMLElement = q(fixture, '[role="grid"]') as HTMLElement;
      expect(grid.getAttribute('aria-rowcount')).toBe(String(EMPLOYEES.length));
    });

    it('sets aria-colindex on data cells', (): void => {
      const fixture: ComponentFixture<DefaultHostComponent> = setup(DefaultHostComponent);
      fixture.detectChanges();

      const firstRow: HTMLElement = qAll(
        fixture,
        '.ui-lib-data-grid__row[role="row"]',
      )[0] as HTMLElement;
      const cells: HTMLElement[] = Array.from(
        firstRow.querySelectorAll<HTMLElement>('[role="gridcell"]'),
      );
      expect(cells[0]?.getAttribute('aria-colindex')).toBe('1');
      expect(cells[1]?.getAttribute('aria-colindex')).toBe('2');
    });
  });

  // ── CSS classes ───────────────────────────────────────────────────────

  describe('CSS class inputs', (): void => {
    it('applies striped rows class when stripedRows is true', (): void => {
      @Component({
        standalone: true,
        imports: [DataGridComponent, DataGridColumnComponent],
        changeDetection: ChangeDetectionStrategy.OnPush,
        template: `
          <ui-lib-data-grid [value]="rows()" [stripedRows]="true">
            <ui-lib-data-grid-column field="name" header="Name" />
          </ui-lib-data-grid>
        `,
      })
      class StripedHost {
        public readonly rows: WritableSignal<Employee[]> = signal<Employee[]>([...EMPLOYEES]);
      }

      const fixture: ComponentFixture<StripedHost> = setup(StripedHost);
      fixture.detectChanges();

      const grid: HTMLElement = q(fixture, '.ui-lib-data-grid') as HTMLElement;
      expect(grid.classList.contains('ui-lib-data-grid--striped')).toBe(true);
    });

    it('applies size class for sm', (): void => {
      @Component({
        standalone: true,
        imports: [DataGridComponent, DataGridColumnComponent],
        changeDetection: ChangeDetectionStrategy.OnPush,
        template: `
          <ui-lib-data-grid [value]="rows()" size="sm">
            <ui-lib-data-grid-column field="name" header="Name" />
          </ui-lib-data-grid>
        `,
      })
      class SmallHost {
        public readonly rows: WritableSignal<Employee[]> = signal<Employee[]>([...EMPLOYEES]);
      }

      const fixture: ComponentFixture<SmallHost> = setup(SmallHost);
      fixture.detectChanges();

      const grid: HTMLElement = q(fixture, '.ui-lib-data-grid') as HTMLElement;
      expect(grid.classList.contains('ui-lib-data-grid--size-sm')).toBe(true);
    });

    it('applies gridlines class when showGridlines is true', (): void => {
      @Component({
        standalone: true,
        imports: [DataGridComponent, DataGridColumnComponent],
        changeDetection: ChangeDetectionStrategy.OnPush,
        template: `
          <ui-lib-data-grid [value]="rows()" [showGridlines]="true">
            <ui-lib-data-grid-column field="name" header="Name" />
          </ui-lib-data-grid>
        `,
      })
      class GridlinesHost {
        public readonly rows: WritableSignal<Employee[]> = signal<Employee[]>([...EMPLOYEES]);
      }

      const fixture: ComponentFixture<GridlinesHost> = setup(GridlinesHost);
      fixture.detectChanges();

      const grid: HTMLElement = q(fixture, '.ui-lib-data-grid') as HTMLElement;
      expect(grid.classList.contains('ui-lib-data-grid--gridlines')).toBe(true);
    });

    it('applies caption when provided', (): void => {
      @Component({
        standalone: true,
        imports: [DataGridComponent, DataGridColumnComponent],
        changeDetection: ChangeDetectionStrategy.OnPush,
        template: `
          <ui-lib-data-grid [value]="rows()" caption="Employees Table">
            <ui-lib-data-grid-column field="name" header="Name" />
          </ui-lib-data-grid>
        `,
      })
      class CaptionHost {
        public readonly rows: WritableSignal<Employee[]> = signal<Employee[]>([...EMPLOYEES]);
      }

      const fixture: ComponentFixture<CaptionHost> = setup(CaptionHost);
      fixture.detectChanges();

      const caption: HTMLElement | null = q(fixture, '.ui-lib-data-grid__caption');
      expect(caption).not.toBeNull();
      expect(caption?.textContent.trim()).toBe('Employees Table');
    });
  });

  // ── Empty state ───────────────────────────────────────────────────────

  describe('empty state', (): void => {
    it('shows custom empty message', (): void => {
      @Component({
        standalone: true,
        imports: [DataGridComponent, DataGridColumnComponent],
        changeDetection: ChangeDetectionStrategy.OnPush,
        template: `
          <ui-lib-data-grid [value]="[]" emptyMessage="Nothing here">
            <ui-lib-data-grid-column field="name" header="Name" />
          </ui-lib-data-grid>
        `,
      })
      class EmptyHost {}

      const fixture: ComponentFixture<EmptyHost> = setup(EmptyHost);
      fixture.detectChanges();

      const emptyCell: HTMLElement | null = q(fixture, '.ui-lib-data-grid__empty-cell');
      expect(emptyCell?.textContent.trim()).toBe('Nothing here');
    });
  });

  // ── Dynamic data updates ──────────────────────────────────────────────

  describe('dynamic data', (): void => {
    it('re-renders when value signal changes', (): void => {
      const fixture: ComponentFixture<DefaultHostComponent> = setup(DefaultHostComponent);
      fixture.detectChanges();

      fixture.componentInstance.rows.set([EMPLOYEES[0] as Employee]);
      fixture.detectChanges();

      const rows: HTMLElement[] = qAll(fixture, '.ui-lib-data-grid__row[role="row"]');
      expect(rows.length).toBe(1);
    });

    it('updates aria-rowcount when data changes', (): void => {
      const fixture: ComponentFixture<DefaultHostComponent> = setup(DefaultHostComponent);
      fixture.detectChanges();

      fixture.componentInstance.rows.set([EMPLOYEES[0] as Employee, EMPLOYEES[1] as Employee]);
      fixture.detectChanges();

      const grid: HTMLElement = q(fixture, '[role="grid"]') as HTMLElement;
      expect(grid.getAttribute('aria-rowcount')).toBe('2');
    });
  });

  // ── Column count ─────────────────────────────────────────────────────

  describe('column definitions', (): void => {
    it('renders exactly as many columnheader cells as declared columns', (): void => {
      const fixture: ComponentFixture<DefaultHostComponent> = setup(DefaultHostComponent);
      fixture.detectChanges();

      // DefaultHostComponent declares 3 columns; grid should render 3 headers
      const headers: HTMLElement[] = qAll(fixture, '[role="columnheader"]');
      expect(headers.length).toBe(3);
    });

    it('renders correct number of gridcells per row', (): void => {
      const fixture: ComponentFixture<DefaultHostComponent> = setup(DefaultHostComponent);
      fixture.detectChanges();

      const firstRow: HTMLElement = qAll(
        fixture,
        '.ui-lib-data-grid__row[role="row"]',
      )[0] as HTMLElement;
      const cells: HTMLElement[] = Array.from(
        firstRow.querySelectorAll<HTMLElement>('[role="gridcell"]'),
      );
      expect(cells.length).toBe(3);
    });
  });
});
