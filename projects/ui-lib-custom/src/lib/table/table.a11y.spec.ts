import {
  ChangeDetectionStrategy,
  Component,
  provideZonelessChangeDetection,
  signal,
  type Type,
  type WritableSignal,
} from '@angular/core';
import type { ComponentFixture } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { checkA11y, SKIP_COLOR_CONTRAST_RULES } from '../../test/a11y-utils';
import { TableColumnComponent } from './table-column.component';
import { TableComponent } from './table.component';
import { TableExpansionDirective } from './table-templates.directive';

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
}

const PRODUCTS: Product[] = [
  { id: 1, name: 'Laptop', category: 'Electronics', price: 999 },
  { id: 2, name: 'Desk', category: 'Furniture', price: 299 },
  { id: 3, name: 'Keyboard', category: 'Electronics', price: 79 },
];

@Component({
  standalone: true,
  imports: [TableComponent, TableColumnComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ui-lib-table [value]="rows" dataKey="id" caption="Products inventory">
      <ui-lib-table-column field="name" header="Name" [sortable]="true" />
      <ui-lib-table-column field="category" header="Category" [sortable]="true" />
      <ui-lib-table-column field="price" header="Price" [sortable]="true" />
    </ui-lib-table>
  `,
})
class InteractiveHostComponent {
  public readonly rows: Product[] = PRODUCTS;
}

@Component({
  standalone: true,
  imports: [TableComponent, TableColumnComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ui-lib-table [value]="rows" dataKey="id" ariaLabel="Inventory table">
      <ui-lib-table-column field="name" header="Name" />
      <ui-lib-table-column field="category" header="Category" />
    </ui-lib-table>
  `,
})
class StaticHostComponent {
  public readonly rows: Product[] = PRODUCTS;
}

@Component({
  standalone: true,
  imports: [TableComponent, TableColumnComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ui-lib-table
      [value]="rows"
      dataKey="id"
      selectionMode="multiple"
      [(selection)]="selection"
      caption="Selectable products"
    >
      <ui-lib-table-column field="name" header="Name" [sortable]="true" />
      <ui-lib-table-column field="category" header="Category" />
    </ui-lib-table>
  `,
})
class MultipleSelectionHostComponent {
  public readonly rows: Product[] = PRODUCTS;
  public selection: Product[] = [];
}

@Component({
  standalone: true,
  imports: [TableComponent, TableColumnComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ui-lib-table
      [value]="rows"
      dataKey="id"
      selectionMode="single"
      [(selection)]="selection"
      caption="Single selection products"
    >
      <ui-lib-table-column field="name" header="Name" [sortable]="true" />
      <ui-lib-table-column field="category" header="Category" />
    </ui-lib-table>
  `,
})
class SingleSelectionHostComponent {
  public readonly rows: Product[] = PRODUCTS;
  public selection: Product | null = null;
}

@Component({
  standalone: true,
  imports: [TableComponent, TableColumnComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ui-lib-table [value]="rows" dataKey="id" [disabled]="true" caption="Disabled products">
      <ui-lib-table-column field="name" header="Name" [sortable]="true" />
      <ui-lib-table-column field="category" header="Category" />
    </ui-lib-table>
  `,
})
class DisabledHostComponent {
  public readonly rows: Product[] = PRODUCTS;
}

@Component({
  standalone: true,
  imports: [TableComponent, TableColumnComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ui-lib-table
      [value]="rows"
      dataKey="id"
      [paginator]="true"
      [(rows)]="pageSize"
      caption="Paged products"
    >
      <ui-lib-table-column field="name" header="Name" [sortable]="true" />
      <ui-lib-table-column field="category" header="Category" />
    </ui-lib-table>
  `,
})
class PaginatedHostComponent {
  public readonly rows: Product[] = [
    ...PRODUCTS,
    { id: 4, name: 'Chair', category: 'Furniture', price: 199 },
  ];
  public readonly pageSize: WritableSignal<number> = signal<number>(2);
}

@Component({
  standalone: true,
  imports: [TableComponent, TableColumnComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ui-lib-table
      [value]="rows"
      dataKey="id"
      selectionMode="checkbox"
      [(selection)]="selection"
      caption="Checkbox products"
    >
      <ui-lib-table-column field="name" header="Name" />
      <ui-lib-table-column field="category" header="Category" />
    </ui-lib-table>
  `,
})
class CheckboxSelectionHostComponent {
  public readonly rows: Product[] = PRODUCTS;
  public selection: Product[] = [];
}

@Component({
  standalone: true,
  imports: [TableComponent, TableColumnComponent, TableExpansionDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ui-lib-table [value]="rows" dataKey="id" caption="Expandable products">
      <ui-lib-table-column field="name" header="Name" />
      <ui-lib-table-column field="category" header="Category" />

      <ng-template uiTableExpansion let-row let-index="index">
        <div class="expanded-row-content">Expanded {{ row.name }} {{ index }}</div>
      </ng-template>
    </ui-lib-table>
  `,
})
class ExpandableHostComponent {
  public readonly rows: Product[] = PRODUCTS;
}

@Component({
  standalone: true,
  imports: [TableComponent, TableColumnComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ui-lib-table [value]="[]" caption="Empty products">
      <ui-lib-table-column field="name" header="Name" [sortable]="true" />
    </ui-lib-table>
  `,
})
class EmptyHostComponent {}

@Component({
  standalone: true,
  imports: [TableComponent, TableColumnComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ui-lib-table [value]="rows" caption="First table">
      <ui-lib-table-column field="name" header="Name" />
    </ui-lib-table>
    <ui-lib-table [value]="rows" caption="Second table">
      <ui-lib-table-column field="name" header="Name" />
    </ui-lib-table>
  `,
})
class MultiInstanceHostComponent {
  public readonly rows: Product[] = PRODUCTS;
}

async function createFixture<T>(component: Type<T>): Promise<ComponentFixture<T>> {
  await TestBed.configureTestingModule({
    imports: [component],
    providers: [provideZonelessChangeDetection()],
  }).compileComponents();

  const fixture: ComponentFixture<T> = TestBed.createComponent(component);
  fixture.detectChanges();
  await fixture.whenStable();
  fixture.detectChanges();
  return fixture;
}

function root<T>(fixture: ComponentFixture<T>): HTMLElement {
  return fixture.nativeElement as HTMLElement;
}

function tableElement<T>(fixture: ComponentFixture<T>): HTMLTableElement {
  return root(fixture).querySelector('table') as HTMLTableElement;
}

function headerCells<T>(fixture: ComponentFixture<T>): HTMLElement[] {
  return Array.from(root(fixture).querySelectorAll('thead th[role="columnheader"]'));
}

function bodyRows<T>(fixture: ComponentFixture<T>): HTMLElement[] {
  return Array.from(root(fixture).querySelectorAll('tbody tr.ui-lib-table__row'));
}

function gridCells<T>(fixture: ComponentFixture<T>): HTMLElement[] {
  return Array.from(root(fixture).querySelectorAll('tbody td[role="gridcell"]'));
}

function cellAt<T>(fixture: ComponentFixture<T>, row: number, column: number): HTMLElement {
  return root(fixture).querySelector(
    `[data-grid-row="${row}"][data-grid-col="${column}"]`
  ) as HTMLElement;
}

function pressKey(
  target: HTMLElement,
  key: string,
  eventInit: Partial<KeyboardEventInit> = {}
): KeyboardEvent {
  const event: KeyboardEvent = new KeyboardEvent('keydown', {
    key,
    bubbles: true,
    cancelable: true,
    ...eventInit,
  });
  target.dispatchEvent(event);
  return event;
}

function sortAnnouncementRegion<T>(fixture: ComponentFixture<T>): HTMLElement {
  return root(fixture).querySelectorAll('.ui-lib-table__sr-only')[0] as HTMLElement;
}

function paginationAnnouncementRegion<T>(fixture: ComponentFixture<T>): HTMLElement {
  return root(fixture).querySelectorAll('.ui-lib-table__sr-only')[1] as HTMLElement;
}

describe('TableComponent accessibility', (): void => {
  describe('Table ARIA structure', (): void => {
    it('uses role="grid" for interactive tables', async (): Promise<void> => {
      const fixture: ComponentFixture<InteractiveHostComponent> =
        await createFixture(InteractiveHostComponent);

      expect(tableElement(fixture).getAttribute('role')).toBe('grid');
    });

    it('uses role="table" for non-interactive tables', async (): Promise<void> => {
      const fixture: ComponentFixture<StaticHostComponent> =
        await createFixture(StaticHostComponent);

      expect(tableElement(fixture).getAttribute('role')).toBe('table');
    });

    it('marks thead and tbody as rowgroups', async (): Promise<void> => {
      const fixture: ComponentFixture<InteractiveHostComponent> =
        await createFixture(InteractiveHostComponent);
      const thead: HTMLElement = root(fixture).querySelector('thead') as HTMLElement;
      const tbody: HTMLElement = root(fixture).querySelector('tbody') as HTMLElement;

      expect(thead.getAttribute('role')).toBe('rowgroup');
      expect(tbody.getAttribute('role')).toBe('rowgroup');
    });

    it('marks header and body rows with role="row"', async (): Promise<void> => {
      const fixture: ComponentFixture<InteractiveHostComponent> =
        await createFixture(InteractiveHostComponent);
      const rows: HTMLElement[] = Array.from(root(fixture).querySelectorAll('thead tr, tbody tr'));

      rows.forEach((row: HTMLElement): void => {
        expect(row.getAttribute('role')).toBe('row');
      });
    });

    it('marks header cells as columnheaders', async (): Promise<void> => {
      const fixture: ComponentFixture<InteractiveHostComponent> =
        await createFixture(InteractiveHostComponent);

      expect(headerCells(fixture).length).toBe(3);
    });

    it('uses gridcell roles for interactive body cells', async (): Promise<void> => {
      const fixture: ComponentFixture<InteractiveHostComponent> =
        await createFixture(InteractiveHostComponent);

      expect(gridCells(fixture).length).toBeGreaterThan(0);
    });

    it('uses cell roles for presentational table cells', async (): Promise<void> => {
      const fixture: ComponentFixture<StaticHostComponent> =
        await createFixture(StaticHostComponent);
      const cells: HTMLElement[] = Array.from(
        root(fixture).querySelectorAll('tbody td[role="cell"]')
      );

      expect(cells.length).toBeGreaterThan(0);
    });
  });

  describe('Accessible name', (): void => {
    it('uses aria-label when provided', async (): Promise<void> => {
      const fixture: ComponentFixture<StaticHostComponent> =
        await createFixture(StaticHostComponent);

      expect(tableElement(fixture).getAttribute('aria-label')).toBe('Inventory table');
      expect(tableElement(fixture).getAttribute('aria-labelledby')).toBeNull();
    });

    it('uses aria-labelledby when caption text is provided', async (): Promise<void> => {
      const fixture: ComponentFixture<InteractiveHostComponent> =
        await createFixture(InteractiveHostComponent);
      const caption: HTMLElement = root(fixture).querySelector(
        '.ui-lib-table__caption'
      ) as HTMLElement;

      expect(caption.id).toBeTruthy();
      expect(tableElement(fixture).getAttribute('aria-labelledby')).toBe(caption.id);
    });

    it('assigns a stable table id to the rendered table element', async (): Promise<void> => {
      const fixture: ComponentFixture<InteractiveHostComponent> =
        await createFixture(InteractiveHostComponent);
      const component: TableComponent = fixture.debugElement.query(By.directive(TableComponent))
        .componentInstance as TableComponent;

      expect(tableElement(fixture).id).toBe(component.tableId);
      expect(component.captionId).toBe(`${component.tableId}-caption`);
    });

    it('gives multiple instances unique table and caption ids', async (): Promise<void> => {
      const fixture: ComponentFixture<MultiInstanceHostComponent> = await createFixture(
        MultiInstanceHostComponent
      );
      const components: TableComponent[] = fixture.debugElement
        .queryAll(By.directive(TableComponent))
        .map(
          (debugElement: { componentInstance: unknown }): TableComponent =>
            debugElement.componentInstance as TableComponent
        );
      const firstComponent: TableComponent = components[0]!;
      const secondComponent: TableComponent = components[1]!;

      expect(firstComponent.tableId).not.toBe(secondComponent.tableId);
      expect(firstComponent.captionId).not.toBe(secondComponent.captionId);
    });
  });

  describe('Sortable column headers', (): void => {
    it('sets aria-sort="none" on unsorted sortable columns', async (): Promise<void> => {
      const fixture: ComponentFixture<InteractiveHostComponent> =
        await createFixture(InteractiveHostComponent);

      headerCells(fixture).forEach((header: HTMLElement): void => {
        expect(header.getAttribute('aria-sort')).toBe('none');
      });
    });

    it('updates only the active column to aria-sort="ascending"', async (): Promise<void> => {
      const fixture: ComponentFixture<InteractiveHostComponent> =
        await createFixture(InteractiveHostComponent);
      const headers: HTMLElement[] = headerCells(fixture);

      headers[1]?.click();
      fixture.detectChanges();

      expect(headers[0]?.getAttribute('aria-sort')).toBe('none');
      expect(headers[1]?.getAttribute('aria-sort')).toBe('ascending');
      expect(headers[2]?.getAttribute('aria-sort')).toBe('none');
    });

    it('updates only the active column to aria-sort="descending" on second click', async (): Promise<void> => {
      const fixture: ComponentFixture<InteractiveHostComponent> =
        await createFixture(InteractiveHostComponent);
      const headers: HTMLElement[] = headerCells(fixture);

      headers[0]?.click();
      headers[0]?.click();
      fixture.detectChanges();

      expect(headers[0]?.getAttribute('aria-sort')).toBe('descending');
      expect(headers[1]?.getAttribute('aria-sort')).toBe('none');
      expect(headers[2]?.getAttribute('aria-sort')).toBe('none');
    });

    it('exposes an accessible sort action label on sortable headers', async (): Promise<void> => {
      const fixture: ComponentFixture<InteractiveHostComponent> =
        await createFixture(InteractiveHostComponent);

      expect(headerCells(fixture)[0]?.getAttribute('aria-label')).toBe('Sort by Name ascending');
    });

    it('announces sort changes in a polite live region', async (): Promise<void> => {
      const fixture: ComponentFixture<InteractiveHostComponent> =
        await createFixture(InteractiveHostComponent);

      headerCells(fixture)[1]?.click();
      fixture.detectChanges();

      expect(sortAnnouncementRegion(fixture).getAttribute('aria-live')).toBe('polite');
      expect(sortAnnouncementRegion(fixture).textContent.trim()).toBe(
        'Table sorted by Category, ascending.'
      );
    });
  });

  describe('Row selection', (): void => {
    it('sets aria-selected on selectable rows', async (): Promise<void> => {
      const fixture: ComponentFixture<MultipleSelectionHostComponent> = await createFixture(
        MultipleSelectionHostComponent
      );
      const rows: HTMLElement[] = bodyRows(fixture);

      rows[0]?.click();
      fixture.detectChanges();

      expect(rows[0]?.getAttribute('aria-selected')).toBe('true');
      expect(rows[1]?.getAttribute('aria-selected')).toBe('false');
    });

    it('omits aria-selected on non-selectable rows', async (): Promise<void> => {
      const fixture: ComponentFixture<InteractiveHostComponent> =
        await createFixture(InteractiveHostComponent);

      bodyRows(fixture).forEach((row: HTMLElement): void => {
        expect(row.getAttribute('aria-selected')).toBeNull();
      });
    });

    it('sets aria-multiselectable="true" for multiple selection mode', async (): Promise<void> => {
      const fixture: ComponentFixture<MultipleSelectionHostComponent> = await createFixture(
        MultipleSelectionHostComponent
      );

      expect(tableElement(fixture).getAttribute('aria-multiselectable')).toBe('true');
    });

    it('sets aria-multiselectable="false" for single selection mode', async (): Promise<void> => {
      const fixture: ComponentFixture<SingleSelectionHostComponent> = await createFixture(
        SingleSelectionHostComponent
      );

      expect(tableElement(fixture).getAttribute('aria-multiselectable')).toBe('false');
    });
  });

  describe('Expandable rows', (): void => {
    it('wires expansion toggles to their controlled row IDs', async (): Promise<void> => {
      const fixture: ComponentFixture<ExpandableHostComponent> =
        await createFixture(ExpandableHostComponent);
      const component: TableComponent = fixture.debugElement.query(By.directive(TableComponent))
        .componentInstance as TableComponent;
      const toggleButton: HTMLButtonElement = root(fixture).querySelector(
        '.ui-lib-table__expander-btn'
      ) as HTMLButtonElement;

      expect(toggleButton.getAttribute('aria-expanded')).toBe('false');
      expect(toggleButton.getAttribute('aria-controls')).toBe(component.getExpandedRowId(0));
    });

    it('applies the generated expansion row ID when a row is expanded', async (): Promise<void> => {
      const fixture: ComponentFixture<ExpandableHostComponent> =
        await createFixture(ExpandableHostComponent);
      const component: TableComponent = fixture.debugElement.query(By.directive(TableComponent))
        .componentInstance as TableComponent;
      const toggleButton: HTMLButtonElement = root(fixture).querySelector(
        '.ui-lib-table__expander-btn'
      ) as HTMLButtonElement;

      toggleButton.click();
      fixture.detectChanges();

      const expandedRow: HTMLElement = root(fixture).querySelector(
        '.ui-lib-table__expansion-row'
      ) as HTMLElement;
      expect(toggleButton.getAttribute('aria-expanded')).toBe('true');
      expect(expandedRow.id).toBe(component.getExpandedRowId(0));
    });

    it('activates the expansion toggle with Enter from the focused grid cell', async (): Promise<void> => {
      const fixture: ComponentFixture<ExpandableHostComponent> =
        await createFixture(ExpandableHostComponent);
      document.body.appendChild(fixture.nativeElement);
      const expanderCell: HTMLElement = cellAt(fixture, 1, 0);

      expanderCell.focus();
      pressKey(expanderCell, 'Enter');
      fixture.detectChanges();

      expect(root(fixture).querySelector('.ui-lib-table__expansion-row')).toBeTruthy();
    });
  });

  describe('Keyboard navigation', (): void => {
    it('uses a single roving tabindex in grid mode', async (): Promise<void> => {
      const fixture: ComponentFixture<InteractiveHostComponent> =
        await createFixture(InteractiveHostComponent);
      const tabbableCells: HTMLElement[] = Array.from(
        root(fixture).querySelectorAll('[data-grid-row][data-grid-col][tabindex="0"]')
      );
      const activeCell: HTMLElement = tabbableCells[0]!;

      expect(tabbableCells).toHaveLength(1);
      expect(activeCell.textContent.trim()).toContain('Name');
    });

    it('ArrowRight moves focus to the next header cell', async (): Promise<void> => {
      const fixture: ComponentFixture<InteractiveHostComponent> =
        await createFixture(InteractiveHostComponent);
      document.body.appendChild(fixture.nativeElement);
      const firstHeader: HTMLElement = cellAt(fixture, 0, 0);

      firstHeader.focus();
      pressKey(firstHeader, 'ArrowRight');
      fixture.detectChanges();

      expect(document.activeElement).toBe(cellAt(fixture, 0, 1));
    });

    it('ArrowDown moves focus to the first body row in the same column', async (): Promise<void> => {
      const fixture: ComponentFixture<InteractiveHostComponent> =
        await createFixture(InteractiveHostComponent);
      document.body.appendChild(fixture.nativeElement);
      const firstHeader: HTMLElement = cellAt(fixture, 0, 0);

      firstHeader.focus();
      pressKey(firstHeader, 'ArrowDown');
      fixture.detectChanges();

      expect(document.activeElement).toBe(cellAt(fixture, 1, 0));
    });

    it('ArrowUp returns focus from the first body row to the header row', async (): Promise<void> => {
      const fixture: ComponentFixture<InteractiveHostComponent> =
        await createFixture(InteractiveHostComponent);
      document.body.appendChild(fixture.nativeElement);
      const firstBodyCell: HTMLElement = cellAt(fixture, 1, 0);

      firstBodyCell.focus();
      pressKey(firstBodyCell, 'ArrowUp');
      fixture.detectChanges();

      expect(document.activeElement).toBe(cellAt(fixture, 0, 0));
    });

    it('Home and End move focus to the row edges', async (): Promise<void> => {
      const fixture: ComponentFixture<InteractiveHostComponent> =
        await createFixture(InteractiveHostComponent);
      document.body.appendChild(fixture.nativeElement);
      const middleHeader: HTMLElement = cellAt(fixture, 0, 1);

      middleHeader.focus();
      pressKey(middleHeader, 'End');
      fixture.detectChanges();
      expect(document.activeElement).toBe(cellAt(fixture, 0, 2));

      pressKey(document.activeElement as HTMLElement, 'Home');
      fixture.detectChanges();
      expect(document.activeElement).toBe(cellAt(fixture, 0, 0));
    });

    it('Ctrl+End moves focus to the last grid cell', async (): Promise<void> => {
      const fixture: ComponentFixture<InteractiveHostComponent> =
        await createFixture(InteractiveHostComponent);
      document.body.appendChild(fixture.nativeElement);
      const firstHeader: HTMLElement = cellAt(fixture, 0, 0);

      firstHeader.focus();
      pressKey(firstHeader, 'End', { ctrlKey: true });
      fixture.detectChanges();

      expect(document.activeElement).toBe(cellAt(fixture, 3, 2));
    });

    it('Ctrl+Home moves focus to the first grid cell', async (): Promise<void> => {
      const fixture: ComponentFixture<InteractiveHostComponent> =
        await createFixture(InteractiveHostComponent);
      document.body.appendChild(fixture.nativeElement);
      const lastBodyCell: HTMLElement = cellAt(fixture, 3, 2);

      lastBodyCell.focus();
      pressKey(lastBodyCell, 'Home', { ctrlKey: true });
      fixture.detectChanges();

      expect(document.activeElement).toBe(cellAt(fixture, 0, 0));
    });

    it('does not trap Tab key navigation inside the grid', async (): Promise<void> => {
      const fixture: ComponentFixture<InteractiveHostComponent> =
        await createFixture(InteractiveHostComponent);
      const firstHeader: HTMLElement = cellAt(fixture, 0, 0);
      const event: KeyboardEvent = pressKey(firstHeader, 'Tab');

      expect(event.defaultPrevented).toBe(false);
    });

    it('Enter on a focused body cell selects the row in single-selection mode', async (): Promise<void> => {
      const fixture: ComponentFixture<SingleSelectionHostComponent> = await createFixture(
        SingleSelectionHostComponent
      );
      document.body.appendChild(fixture.nativeElement);
      const firstBodyCell: HTMLElement = cellAt(fixture, 1, 0);

      firstBodyCell.focus();
      pressKey(firstBodyCell, 'Enter');
      fixture.detectChanges();

      expect(bodyRows(fixture)[0]?.getAttribute('aria-selected')).toBe('true');
    });

    it('removes embedded checkbox controls from the tab order in grid mode', async (): Promise<void> => {
      const fixture: ComponentFixture<CheckboxSelectionHostComponent> = await createFixture(
        CheckboxSelectionHostComponent
      );
      const headerCheckbox: HTMLInputElement = root(fixture).querySelector(
        'thead .ui-lib-table__checkbox'
      ) as HTMLInputElement;
      const rowCheckbox: HTMLInputElement = root(fixture).querySelector(
        'tbody .ui-lib-table__checkbox'
      ) as HTMLInputElement;

      expect(headerCheckbox.getAttribute('tabindex')).toBe('-1');
      expect(rowCheckbox.getAttribute('tabindex')).toBe('-1');
    });
  });

  describe('Disabled rows / cells and pagination', (): void => {
    it('marks the grid, headers, and cells as aria-disabled when disabled', async (): Promise<void> => {
      const fixture: ComponentFixture<DisabledHostComponent> =
        await createFixture(DisabledHostComponent);
      const firstHeader: HTMLElement = headerCells(fixture)[0] as HTMLElement;
      const firstCell: HTMLElement = gridCells(fixture)[0] as HTMLElement;

      expect(tableElement(fixture).getAttribute('aria-disabled')).toBe('true');
      expect(firstHeader.getAttribute('aria-disabled')).toBe('true');
      expect(firstCell.getAttribute('aria-disabled')).toBe('true');
    });

    it('announces paginated row counts and row indexes', async (): Promise<void> => {
      const fixture: ComponentFixture<PaginatedHostComponent> =
        await createFixture(PaginatedHostComponent);
      const rows: HTMLElement[] = bodyRows(fixture);

      expect(tableElement(fixture).getAttribute('aria-rowcount')).toBe('5');
      expect(rows[0]?.getAttribute('aria-rowindex')).toBe('2');
      expect(rows[1]?.getAttribute('aria-rowindex')).toBe('3');
    });

    it('announces pagination state through a polite live region', async (): Promise<void> => {
      const fixture: ComponentFixture<PaginatedHostComponent> =
        await createFixture(PaginatedHostComponent);

      expect(paginationAnnouncementRegion(fixture).getAttribute('aria-live')).toBe('polite');
      expect(paginationAnnouncementRegion(fixture).textContent.trim()).toBe('Page 1 of 2');
    });

    it('updates the pagination live region when the page changes', async (): Promise<void> => {
      const fixture: ComponentFixture<PaginatedHostComponent> =
        await createFixture(PaginatedHostComponent);
      const pageButtons: NodeListOf<HTMLButtonElement> =
        root(fixture).querySelectorAll<HTMLButtonElement>('.uilib-paginator-page');

      pageButtons[1]?.click();
      fixture.detectChanges();

      expect(paginationAnnouncementRegion(fixture).textContent.trim()).toBe('Page 2 of 2');
    });
  });

  describe('Empty state announcement', (): void => {
    it('announces the empty state with role="status"', async (): Promise<void> => {
      const fixture: ComponentFixture<EmptyHostComponent> = await createFixture(EmptyHostComponent);
      const status: HTMLElement = root(fixture).querySelector('[role="status"]') as HTMLElement;

      expect(status).toBeTruthy();
      expect(status.textContent.trim()).toBe('No records found.');
    });

    it('uses a polite live region for the empty state', async (): Promise<void> => {
      const fixture: ComponentFixture<EmptyHostComponent> = await createFixture(EmptyHostComponent);
      const status: HTMLElement = root(fixture).querySelector('[role="status"]') as HTMLElement;

      expect(status.getAttribute('aria-live')).toBe('polite');
    });
  });

  describe('axe-core', (): void => {
    it('passes axe for a populated interactive table', async (): Promise<void> => {
      const fixture: ComponentFixture<InteractiveHostComponent> =
        await createFixture(InteractiveHostComponent);

      await checkA11y(fixture, { rules: SKIP_COLOR_CONTRAST_RULES });
    });

    it('passes axe for a sorted table', async (): Promise<void> => {
      const fixture: ComponentFixture<InteractiveHostComponent> =
        await createFixture(InteractiveHostComponent);

      headerCells(fixture)[0]?.click();
      fixture.detectChanges();

      await checkA11y(fixture, { rules: SKIP_COLOR_CONTRAST_RULES });
    });

    it('passes axe for selected rows', async (): Promise<void> => {
      const fixture: ComponentFixture<MultipleSelectionHostComponent> = await createFixture(
        MultipleSelectionHostComponent
      );

      bodyRows(fixture)[0]?.click();
      fixture.detectChanges();

      await checkA11y(fixture, { rules: SKIP_COLOR_CONTRAST_RULES });
    });

    it('passes axe for expanded rows', async (): Promise<void> => {
      const fixture: ComponentFixture<ExpandableHostComponent> =
        await createFixture(ExpandableHostComponent);
      const toggleButton: HTMLButtonElement = root(fixture).querySelector(
        '.ui-lib-table__expander-btn'
      ) as HTMLButtonElement;

      toggleButton.click();
      fixture.detectChanges();

      await checkA11y(fixture, { rules: SKIP_COLOR_CONTRAST_RULES });
    });

    it('passes axe for the empty state', async (): Promise<void> => {
      const fixture: ComponentFixture<EmptyHostComponent> = await createFixture(EmptyHostComponent);

      await checkA11y(fixture, { rules: SKIP_COLOR_CONTRAST_RULES });
    });
  });
});
