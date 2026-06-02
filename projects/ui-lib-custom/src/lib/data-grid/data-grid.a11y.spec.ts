import type { WritableSignal } from '@angular/core';
import {
  ChangeDetectionStrategy,
  Component,
  provideZonelessChangeDetection,
  signal,
} from '@angular/core';
import type { ComponentFixture } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';

import { checkA11y, SKIP_COLOR_CONTRAST_RULES } from '../../test/a11y-utils';
import { DataGridComponent } from './data-grid.component';
import { DataGridColumnComponent } from './data-grid-column.component';

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
];

// ---------------------------------------------------------------------------
// Host components
// ---------------------------------------------------------------------------

@Component({
  standalone: true,
  imports: [DataGridComponent, DataGridColumnComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ui-lib-data-grid [value]="rows()" dataKey="id" ariaLabel="Employees">
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
      ariaLabel="Employee selection"
      selectionMode="checkbox"
      [(selection)]="selected"
    >
      <ui-lib-data-grid-column field="name" header="Name" />
      <ui-lib-data-grid-column field="department" header="Department" />
    </ui-lib-data-grid>
  `,
})
class CheckboxSelectionHostComponent {
  public readonly rows: WritableSignal<Employee[]> = signal<Employee[]>([...EMPLOYEES]);
  public readonly selected: WritableSignal<Employee[]> = signal<Employee[]>([]);
}

@Component({
  standalone: true,
  imports: [DataGridComponent, DataGridColumnComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ui-lib-data-grid [value]="[]" dataKey="id" ariaLabel="Empty grid">
      <ui-lib-data-grid-column field="name" header="Name" />
    </ui-lib-data-grid>
  `,
})
class EmptyHostComponent {}

@Component({
  standalone: true,
  imports: [DataGridComponent, DataGridColumnComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ui-lib-data-grid [value]="rows" dataKey="id">
      <ui-lib-data-grid-column field="name" header="Name" />
    </ui-lib-data-grid>
  `,
})
class NoSortHostComponent {
  public readonly rows: Employee[] = [...EMPLOYEES];
}

@Component({
  standalone: true,
  imports: [DataGridComponent, DataGridColumnComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ui-lib-data-grid [value]="rows()" dataKey="id" selectionMode="single" [(selection)]="selected">
      <ui-lib-data-grid-column field="name" header="Name" />
    </ui-lib-data-grid>
  `,
})
class SingleSelectionHostComponent {
  public readonly rows: WritableSignal<Employee[]> = signal<Employee[]>([...EMPLOYEES]);
  public readonly selected: WritableSignal<Employee | null> = signal<Employee | null>(null);
}

@Component({
  standalone: true,
  imports: [DataGridComponent, DataGridColumnComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ui-lib-data-grid
      [value]="rows()"
      dataKey="id"
      ariaLabel="Filterable grid"
      [globalFilter]="filter()"
      [globalFilterFields]="['name', 'department']"
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
  imports: [DataGridComponent, DataGridColumnComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ui-lib-data-grid
      [value]="rows()"
      dataKey="id"
      ariaLabel="Paginated employees"
      [paginator]="true"
      [rows]="2"
    >
      <ui-lib-data-grid-column field="name" header="Name" />
      <ui-lib-data-grid-column field="department" header="Department" />
    </ui-lib-data-grid>
  `,
})
class PaginatedHostComponent {
  public readonly rows: WritableSignal<Employee[]> = signal<Employee[]>([...EMPLOYEES]);
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function q(fixture: ComponentFixture<unknown>, sel: string): HTMLElement | null {
  return (fixture.nativeElement as HTMLElement).querySelector<HTMLElement>(sel);
}

function qAll(fixture: ComponentFixture<unknown>, sel: string): HTMLElement[] {
  return Array.from((fixture.nativeElement as HTMLElement).querySelectorAll<HTMLElement>(sel));
}

async function setup<T>(component: new () => T): Promise<ComponentFixture<T>> {
  await TestBed.configureTestingModule({
    providers: [provideZonelessChangeDetection()],
  }).compileComponents();
  const fixture: ComponentFixture<T> = TestBed.createComponent(component);
  fixture.detectChanges();
  await fixture.whenStable();
  return fixture;
}

function dispatchKey(element: HTMLElement, key: string, options: KeyboardEventInit = {}): void {
  element.dispatchEvent(
    new KeyboardEvent('keydown', { key, bubbles: true, cancelable: true, ...options }),
  );
}

// ---------------------------------------------------------------------------
// WAI-ARIA roles
// ---------------------------------------------------------------------------

describe('DataGrid — WAI-ARIA roles', (): void => {
  let fixture: ComponentFixture<DefaultHostComponent>;

  beforeEach(async (): Promise<void> => {
    fixture = await setup(DefaultHostComponent);
  });

  it('wrapper has role="grid"', (): void => {
    expect(q(fixture, '[role="grid"]')).not.toBeNull();
  });

  it('header row has role="row"', (): void => {
    const rows: HTMLElement[] = qAll(fixture, '[role="row"]');
    expect(rows.length).toBeGreaterThan(0);
  });

  it('header cells have role="columnheader"', (): void => {
    const headers: HTMLElement[] = qAll(fixture, '[role="columnheader"]');
    expect(headers.length).toBe(3);
  });

  it('body cells have role="gridcell"', (): void => {
    const cells: HTMLElement[] = qAll(fixture, '[role="gridcell"]');
    expect(cells.length).toBeGreaterThan(0);
  });

  it('grid has aria-label', (): void => {
    const grid: HTMLElement = q(fixture, '[role="grid"]') as HTMLElement;
    expect(grid.getAttribute('aria-label')).toBe('Employees');
  });
});

// ---------------------------------------------------------------------------
// aria-rowcount / aria-rowindex / aria-colindex
// ---------------------------------------------------------------------------

describe('DataGrid — row and column index ARIA attributes', (): void => {
  let fixture: ComponentFixture<DefaultHostComponent>;

  beforeEach(async (): Promise<void> => {
    fixture = await setup(DefaultHostComponent);
  });

  it('grid has aria-rowcount equal to total rows', (): void => {
    const grid: HTMLElement = q(fixture, '[role="grid"]') as HTMLElement;
    expect(grid.getAttribute('aria-rowcount')).toBe(String(EMPLOYEES.length));
  });

  it('first data row has aria-rowindex="2" (header is row 1)', (): void => {
    const rows: HTMLElement[] = qAll(fixture, '.ui-lib-data-grid__row[role="row"]');
    expect(rows[0]?.getAttribute('aria-rowindex')).toBe('2');
  });

  it('last data row has aria-rowindex equal to row count + 1', (): void => {
    const rows: HTMLElement[] = qAll(fixture, '.ui-lib-data-grid__row[role="row"]');
    const last: HTMLElement = rows[rows.length - 1] as HTMLElement;
    expect(last.getAttribute('aria-rowindex')).toBe(String(EMPLOYEES.length + 1));
  });

  it('cells in first row have aria-colindex starting at 1', (): void => {
    const firstRow: HTMLElement = qAll(
      fixture,
      '.ui-lib-data-grid__row[role="row"]',
    )[0] as HTMLElement;
    const cells: HTMLElement[] = Array.from(
      firstRow.querySelectorAll<HTMLElement>('[role="gridcell"]'),
    );
    expect(cells[0]?.getAttribute('aria-colindex')).toBe('1');
    expect(cells[1]?.getAttribute('aria-colindex')).toBe('2');
    expect(cells[2]?.getAttribute('aria-colindex')).toBe('3');
  });

  it('aria-rowcount updates when data changes', async (): Promise<void> => {
    fixture.componentInstance.rows.set(EMPLOYEES.slice(0, 2));
    fixture.detectChanges();
    await fixture.whenStable();

    const grid: HTMLElement = q(fixture, '[role="grid"]') as HTMLElement;
    expect(grid.getAttribute('aria-rowcount')).toBe('2');
  });
});

// ---------------------------------------------------------------------------
// aria-sort
// ---------------------------------------------------------------------------

describe('DataGrid — aria-sort', (): void => {
  let fixture: ComponentFixture<DefaultHostComponent>;

  beforeEach(async (): Promise<void> => {
    fixture = await setup(DefaultHostComponent);
  });

  it('unsorted sortable header has aria-sort="none"', (): void => {
    const header: HTMLElement = qAll(fixture, '[role="columnheader"]')[0] as HTMLElement;
    expect(header.getAttribute('aria-sort')).toBe('none');
  });

  it('header has aria-sort="ascending" after one click', (): void => {
    const header: HTMLElement = qAll(fixture, '[role="columnheader"]')[0] as HTMLElement;
    header.click();
    fixture.detectChanges();

    expect(header.getAttribute('aria-sort')).toBe('ascending');
  });

  it('header has aria-sort="descending" after two clicks', (): void => {
    const header: HTMLElement = qAll(fixture, '[role="columnheader"]')[0] as HTMLElement;
    header.click();
    fixture.detectChanges();
    header.click();
    fixture.detectChanges();

    expect(header.getAttribute('aria-sort')).toBe('descending');
  });

  it('header has aria-sort="none" after three clicks (sort cleared)', (): void => {
    const header: HTMLElement = qAll(fixture, '[role="columnheader"]')[0] as HTMLElement;
    header.click();
    fixture.detectChanges();
    header.click();
    fixture.detectChanges();
    header.click();
    fixture.detectChanges();

    expect(header.getAttribute('aria-sort')).toBe('none');
  });
});

describe('DataGrid — aria-sort absent on non-sortable columns', (): void => {
  let fixture: ComponentFixture<NoSortHostComponent>;

  beforeEach(async (): Promise<void> => {
    fixture = await setup(NoSortHostComponent);
  });

  it('non-sortable column header has no aria-sort attribute', (): void => {
    const header: HTMLElement = q(fixture, '[role="columnheader"]') as HTMLElement;
    expect(header.getAttribute('aria-sort')).toBeNull();
  });
});

// ---------------------------------------------------------------------------
// Keyboard: Enter / Space on sortable headers
// ---------------------------------------------------------------------------

describe('DataGrid — keyboard sort activation', (): void => {
  let fixture: ComponentFixture<DefaultHostComponent>;

  beforeEach(async (): Promise<void> => {
    fixture = await setup(DefaultHostComponent);
  });

  it('Enter on a sortable header sorts ascending', (): void => {
    const header: HTMLElement = qAll(fixture, '[role="columnheader"]')[0] as HTMLElement;
    dispatchKey(header, 'Enter');
    fixture.detectChanges();

    expect(header.getAttribute('aria-sort')).toBe('ascending');
  });

  it('Space on a sortable header sorts ascending', (): void => {
    const header: HTMLElement = qAll(fixture, '[role="columnheader"]')[0] as HTMLElement;
    dispatchKey(header, ' ');
    fixture.detectChanges();

    expect(header.getAttribute('aria-sort')).toBe('ascending');
  });

  it('Enter twice on a sortable header sorts descending', (): void => {
    const header: HTMLElement = qAll(fixture, '[role="columnheader"]')[0] as HTMLElement;
    dispatchKey(header, 'Enter');
    fixture.detectChanges();
    dispatchKey(header, 'Enter');
    fixture.detectChanges();

    expect(header.getAttribute('aria-sort')).toBe('descending');
  });
});

// ---------------------------------------------------------------------------
// Keyboard: row selection
// ---------------------------------------------------------------------------

describe('DataGrid — keyboard row selection', (): void => {
  let fixture: ComponentFixture<SingleSelectionHostComponent>;

  beforeEach(async (): Promise<void> => {
    fixture = await setup(SingleSelectionHostComponent);
  });

  it('Enter on a row with selectionMode="single" selects it', (): void => {
    const rows: HTMLElement[] = Array.from(
      (fixture.nativeElement as HTMLElement).querySelectorAll<HTMLElement>(
        '.ui-lib-data-grid__row[role="row"]',
      ),
    );
    dispatchKey(rows[0] as HTMLElement, 'Enter');
    fixture.detectChanges();

    expect(fixture.componentInstance.selected()).not.toBeNull();
  });
});

// ---------------------------------------------------------------------------
// Checkbox selection ARIA
// ---------------------------------------------------------------------------

describe('DataGrid — checkbox selection ARIA', (): void => {
  let fixture: ComponentFixture<CheckboxSelectionHostComponent>;

  beforeEach(async (): Promise<void> => {
    fixture = await setup(CheckboxSelectionHostComponent);
  });

  it('select-all checkbox has aria-label', (): void => {
    const checkboxes: HTMLInputElement[] = qAll(
      fixture,
      '.ui-lib-data-grid__checkbox',
    ) as HTMLInputElement[];
    const selectAll: HTMLInputElement = checkboxes[0] as HTMLInputElement;
    expect(selectAll.getAttribute('aria-label')).toBeTruthy();
  });

  it('row checkboxes have aria-label', (): void => {
    const checkboxes: HTMLInputElement[] = qAll(
      fixture,
      '.ui-lib-data-grid__checkbox',
    ) as HTMLInputElement[];
    // Skip index 0 (select-all); check the first row checkbox
    const rowCheckbox: HTMLInputElement = checkboxes[1] as HTMLInputElement;
    expect(rowCheckbox.getAttribute('aria-label')).toBeTruthy();
  });

  it('select-all checkbox reflects checked state when all rows are selected', (): void => {
    const checkboxes: HTMLInputElement[] = qAll(
      fixture,
      '.ui-lib-data-grid__checkbox',
    ) as HTMLInputElement[];
    const selectAll: HTMLInputElement = checkboxes[0] as HTMLInputElement;
    selectAll.click();
    fixture.detectChanges();

    expect(selectAll.checked).toBe(true);
    expect(fixture.componentInstance.selected().length).toBe(EMPLOYEES.length);
  });

  it('selecting all then deselecting updates aria state', (): void => {
    const checkboxes: HTMLInputElement[] = qAll(
      fixture,
      '.ui-lib-data-grid__checkbox',
    ) as HTMLInputElement[];
    const selectAll: HTMLInputElement = checkboxes[0] as HTMLInputElement;
    selectAll.click();
    fixture.detectChanges();
    selectAll.click();
    fixture.detectChanges();

    expect(selectAll.checked).toBe(false);
    expect(fixture.componentInstance.selected().length).toBe(0);
  });
});

// ---------------------------------------------------------------------------
// Filter input ARIA
// ---------------------------------------------------------------------------

describe('DataGrid — filter input ARIA', (): void => {
  let fixture: ComponentFixture<FilterHostComponent>;

  beforeEach(async (): Promise<void> => {
    fixture = await setup(FilterHostComponent);
  });

  it('column filter input has aria-label', (): void => {
    const filterInputs: HTMLInputElement[] = qAll(
      fixture,
      '.ui-lib-data-grid__filter-input',
    ) as HTMLInputElement[];
    expect(filterInputs.length).toBeGreaterThan(0);
    const firstInput: HTMLInputElement = filterInputs[0] as HTMLInputElement;
    expect(firstInput.getAttribute('aria-label')).toBeTruthy();
  });

  it('filtered rows update aria-rowcount', async (): Promise<void> => {
    fixture.componentInstance.filter.set('Engineering');
    fixture.detectChanges();
    await fixture.whenStable();

    const grid: HTMLElement = q(fixture, '[role="grid"]') as HTMLElement;
    // aria-rowcount should reflect the filtered count (2 Engineering rows)
    expect(grid.getAttribute('aria-rowcount')).toBe('2');
  });
});

// ---------------------------------------------------------------------------
// Empty state
// ---------------------------------------------------------------------------

describe('DataGrid — empty state ARIA', (): void => {
  let fixture: ComponentFixture<EmptyHostComponent>;

  beforeEach(async (): Promise<void> => {
    fixture = await setup(EmptyHostComponent);
  });

  it('empty cell is present when no rows', (): void => {
    expect(q(fixture, '.ui-lib-data-grid__empty-cell')).not.toBeNull();
  });

  it('empty row has role="row"', (): void => {
    // The empty state is rendered as a row; aria structure should be intact
    const emptyRow: HTMLElement | null = q(fixture, '.ui-lib-data-grid__empty-row[role="row"]');
    expect(emptyRow).not.toBeNull();
  });
});

// ---------------------------------------------------------------------------
// Paginator integration
// ---------------------------------------------------------------------------

describe('DataGrid — paginator ARIA integration', (): void => {
  let fixture: ComponentFixture<PaginatedHostComponent>;

  beforeEach(async (): Promise<void> => {
    fixture = await setup(PaginatedHostComponent);
  });

  it('renders the paginator component', (): void => {
    expect(q(fixture, 'ui-lib-paginator')).not.toBeNull();
  });

  it('grid aria-rowcount matches totalRecords in client-side mode', (): void => {
    // Client-side: totalRecords = full dataset length
    const grid: HTMLElement = q(fixture, '[role="grid"]') as HTMLElement;
    expect(grid.getAttribute('aria-rowcount')).toBe(String(EMPLOYEES.length));
  });
});

// ---------------------------------------------------------------------------
// axe automated accessibility audit
// ---------------------------------------------------------------------------

describe('DataGrid — axe audit', (): void => {
  it('passes axe on default state', async (): Promise<void> => {
    const fixture: ComponentFixture<DefaultHostComponent> = await setup(DefaultHostComponent);
    await checkA11y(fixture, { rules: SKIP_COLOR_CONTRAST_RULES });
  });

  it('passes axe with checkbox selection', async (): Promise<void> => {
    const fixture: ComponentFixture<CheckboxSelectionHostComponent> = await setup(
      CheckboxSelectionHostComponent,
    );
    await checkA11y(fixture, { rules: SKIP_COLOR_CONTRAST_RULES });
  });

  it('passes axe in empty state', async (): Promise<void> => {
    const fixture: ComponentFixture<EmptyHostComponent> = await setup(EmptyHostComponent);
    await checkA11y(fixture, { rules: SKIP_COLOR_CONTRAST_RULES });
  });

  it('passes axe after sorting', async (): Promise<void> => {
    const fixture: ComponentFixture<DefaultHostComponent> = await setup(DefaultHostComponent);
    const header: HTMLElement = Array.from(
      (fixture.nativeElement as HTMLElement).querySelectorAll<HTMLElement>('[role="columnheader"]'),
    )[0] as HTMLElement;
    header.click();
    fixture.detectChanges();
    await fixture.whenStable();
    await checkA11y(fixture, { rules: SKIP_COLOR_CONTRAST_RULES });
  });

  it('passes axe with paginator', async (): Promise<void> => {
    const fixture: ComponentFixture<PaginatedHostComponent> = await setup(PaginatedHostComponent);
    await checkA11y(fixture, { rules: SKIP_COLOR_CONTRAST_RULES });
  });

  it('passes axe with filter inputs visible', async (): Promise<void> => {
    const fixture: ComponentFixture<FilterHostComponent> = await setup(FilterHostComponent);
    await checkA11y(fixture, { rules: SKIP_COLOR_CONTRAST_RULES });
  });
});
