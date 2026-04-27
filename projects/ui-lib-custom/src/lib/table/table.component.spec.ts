import {
  ChangeDetectionStrategy,
  Component,
  provideZonelessChangeDetection,
  signal,
} from '@angular/core';
import type { DebugElement, WritableSignal } from '@angular/core';
import type { ComponentFixture } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { TableComponent } from './table.component';
import { TableColumnComponent } from './table-column.component';
import {
  TableCaptionDirective,
  TableColumnBodyDirective,
  TableEmptyDirective,
  TableExpansionDirective,
} from './table-templates.directive';
import type { TableSortMeta } from './table.types';

// ---------------------------------------------------------------------------
// Shared test data
// ---------------------------------------------------------------------------

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
  { id: 4, name: 'Chair', category: 'Furniture', price: 199 },
  { id: 5, name: 'Monitor', category: 'Electronics', price: 449 },
];

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function detectChanges(fixture: ComponentFixture<unknown>): void {
  fixture.detectChanges();
}

function getNativeEl(fixture: ComponentFixture<unknown>): HTMLElement {
  return fixture.nativeElement as HTMLElement;
}

function queryOne(fixture: ComponentFixture<unknown>, selector: string): HTMLElement | null {
  return getNativeEl(fixture).querySelector<HTMLElement>(selector);
}

function queryAll(fixture: ComponentFixture<unknown>, selector: string): NodeListOf<HTMLElement> {
  return getNativeEl(fixture).querySelectorAll<HTMLElement>(selector);
}

// ---------------------------------------------------------------------------
// Default host — basic table with columns
// ---------------------------------------------------------------------------

@Component({
  standalone: true,
  imports: [TableComponent, TableColumnComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ui-lib-table [value]="rows()" dataKey="id">
      <ui-lib-table-column field="name" header="Name" [sortable]="true" />
      <ui-lib-table-column field="category" header="Category" [sortable]="true" />
      <ui-lib-table-column field="price" header="Price" [sortable]="true" />
    </ui-lib-table>
  `,
})
class DefaultHostComponent {
  public readonly rows: WritableSignal<Product[]> = signal<Product[]>([...PRODUCTS]);
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe('TableComponent', (): void => {
  // -------------------------------------------------------------------------
  // Rendering
  // -------------------------------------------------------------------------

  describe('Rendering', (): void => {
    let fixture: ComponentFixture<DefaultHostComponent>;

    beforeEach(async (): Promise<void> => {
      await TestBed.configureTestingModule({
        imports: [DefaultHostComponent],
        providers: [provideZonelessChangeDetection()],
      }).compileComponents();
      fixture = TestBed.createComponent(DefaultHostComponent);
      detectChanges(fixture);
    });

    it('should create the table component', (): void => {
      const tableDebug: DebugElement = fixture.debugElement.query(By.directive(TableComponent));
      expect(tableDebug).not.toBeNull();
    });

    it('should render a <table> element', (): void => {
      const table: HTMLElement | null = queryOne(fixture, 'table');
      expect(table).not.toBeNull();
    });

    it('should render the correct number of column headers', (): void => {
      const headers: NodeListOf<HTMLElement> = queryAll(
        fixture,
        '.ui-lib-table__th:not(.ui-lib-table__th--expander):not(.ui-lib-table__th--checkbox)'
      );
      expect(headers.length).toBe(3);
    });

    it('should render the correct header labels', (): void => {
      const headers: NodeListOf<HTMLElement> = queryAll(fixture, '.ui-lib-table__th-label');
      const labels: string[] = Array.from(headers).map((header: HTMLElement): string =>
        header.textContent.trim()
      );
      expect(labels).toContain('Name');
      expect(labels).toContain('Category');
      expect(labels).toContain('Price');
    });

    it('should render one row per data item', (): void => {
      const rows: NodeListOf<HTMLElement> = queryAll(fixture, '.ui-lib-table__row');
      expect(rows.length).toBe(PRODUCTS.length);
    });

    it('should render cell values using the column field', (): void => {
      const firstRowCells: NodeListOf<HTMLElement> = queryAll(
        fixture,
        '.ui-lib-table__row:first-child .ui-lib-table__td'
      );
      const cellTexts: string[] = Array.from(firstRowCells).map((cell: HTMLElement): string =>
        cell.textContent.trim()
      );
      expect(cellTexts).toContain('Laptop');
    });

    it('should apply host class ui-lib-table', (): void => {
      const host: HTMLElement | null = queryOne(fixture, 'ui-lib-table');
      expect(host?.classList.contains('ui-lib-table')).toBe(true);
    });

    it('should apply variant class', (): void => {
      const host: HTMLElement | null = queryOne(fixture, 'ui-lib-table');
      const hasVariant: boolean =
        (host?.classList.contains('ui-lib-table--material') ?? false) ||
        (host?.classList.contains('ui-lib-table--bootstrap') ?? false) ||
        (host?.classList.contains('ui-lib-table--minimal') ?? false);
      expect(hasVariant).toBe(true);
    });

    it('should apply size class ui-lib-table--md by default', (): void => {
      const host: HTMLElement | null = queryOne(fixture, 'ui-lib-table');
      expect(host?.classList.contains('ui-lib-table--md')).toBe(true);
    });
  });

  // -------------------------------------------------------------------------
  // Striped / gridlines / hover
  // -------------------------------------------------------------------------

  describe('Visual flags', (): void => {
    it('should apply striped class when stripedRows is true', async (): Promise<void> => {
      @Component({
        standalone: true,
        imports: [TableComponent, TableColumnComponent],
        changeDetection: ChangeDetectionStrategy.OnPush,
        template: `<ui-lib-table [value]="rows" [stripedRows]="true">
          <ui-lib-table-column field="name" header="Name" />
        </ui-lib-table>`,
      })
      class StripedHost {
        public readonly rows: Product[] = PRODUCTS;
      }

      await TestBed.configureTestingModule({
        imports: [StripedHost],
        providers: [provideZonelessChangeDetection()],
      }).compileComponents();
      const fixture: ComponentFixture<StripedHost> = TestBed.createComponent(StripedHost);
      detectChanges(fixture);
      const host: HTMLElement | null = queryOne(fixture, 'ui-lib-table');
      expect(host?.classList.contains('ui-lib-table--striped')).toBe(true);
    });

    it('should apply gridlines class when showGridlines is true', async (): Promise<void> => {
      @Component({
        standalone: true,
        imports: [TableComponent, TableColumnComponent],
        changeDetection: ChangeDetectionStrategy.OnPush,
        template: `<ui-lib-table [value]="rows" [showGridlines]="true">
          <ui-lib-table-column field="name" header="Name" />
        </ui-lib-table>`,
      })
      class GridHost {
        public readonly rows: Product[] = PRODUCTS;
      }

      await TestBed.configureTestingModule({
        imports: [GridHost],
        providers: [provideZonelessChangeDetection()],
      }).compileComponents();
      const fixture: ComponentFixture<GridHost> = TestBed.createComponent(GridHost);
      detectChanges(fixture);
      const host: HTMLElement | null = queryOne(fixture, 'ui-lib-table');
      expect(host?.classList.contains('ui-lib-table--gridlines')).toBe(true);
    });
  });

  // -------------------------------------------------------------------------
  // Empty state
  // -------------------------------------------------------------------------

  describe('Empty state', (): void => {
    it('should render the empty message when value is empty', async (): Promise<void> => {
      @Component({
        standalone: true,
        imports: [TableComponent, TableColumnComponent],
        changeDetection: ChangeDetectionStrategy.OnPush,
        template: `<ui-lib-table [value]="[]" emptyMessage="Nothing here">
          <ui-lib-table-column field="name" header="Name" />
        </ui-lib-table>`,
      })
      class EmptyHost {}

      await TestBed.configureTestingModule({
        imports: [EmptyHost],
        providers: [provideZonelessChangeDetection()],
      }).compileComponents();
      const fixture: ComponentFixture<EmptyHost> = TestBed.createComponent(EmptyHost);
      detectChanges(fixture);
      const msg: HTMLElement | null = queryOne(fixture, '.ui-lib-table__empty-message');
      expect(msg).not.toBeNull();
      expect(msg?.textContent.trim()).toBe('Nothing here');
    });

    it('should render custom [uiTableEmpty] template', async (): Promise<void> => {
      @Component({
        standalone: true,
        imports: [TableComponent, TableColumnComponent, TableEmptyDirective],
        changeDetection: ChangeDetectionStrategy.OnPush,
        template: `<ui-lib-table [value]="[]">
          <ui-lib-table-column field="name" header="Name" />
          <ng-template uiTableEmpty>
            <span class="custom-empty">Custom empty</span>
          </ng-template>
        </ui-lib-table>`,
      })
      class CustomEmptyHost {}

      await TestBed.configureTestingModule({
        imports: [CustomEmptyHost],
        providers: [provideZonelessChangeDetection()],
      }).compileComponents();
      const fixture: ComponentFixture<CustomEmptyHost> = TestBed.createComponent(CustomEmptyHost);
      detectChanges(fixture);
      const custom: HTMLElement | null = queryOne(fixture, '.custom-empty');
      expect(custom).not.toBeNull();
      expect(custom?.textContent.trim()).toBe('Custom empty');
    });
  });

  // -------------------------------------------------------------------------
  // Sorting
  // -------------------------------------------------------------------------

  describe('Sorting', (): void => {
    let fixture: ComponentFixture<DefaultHostComponent>;
    let component: TableComponent;

    beforeEach(async (): Promise<void> => {
      await TestBed.configureTestingModule({
        imports: [DefaultHostComponent],
        providers: [provideZonelessChangeDetection()],
      }).compileComponents();
      fixture = TestBed.createComponent(DefaultHostComponent);
      detectChanges(fixture);
      component = fixture.debugElement.query(By.directive(TableComponent))
        .componentInstance as TableComponent;
    });

    it('should render sort icons on sortable columns', (): void => {
      const sortIcons: NodeListOf<HTMLElement> = queryAll(fixture, '.ui-lib-table__sort-icon');
      expect(sortIcons.length).toBe(3);
    });

    it('should sort ascending on first header click', (): void => {
      const nameHeader: HTMLElement = queryAll(fixture, '.ui-lib-table__th--sortable')[0]!;
      nameHeader.click();
      detectChanges(fixture);
      expect(component.sortField()).toBe('name');
      expect(component.sortOrder()).toBe(1);
    });

    it('should sort descending on second click of same column', (): void => {
      const nameHeader: HTMLElement = queryAll(fixture, '.ui-lib-table__th--sortable')[0]!;
      nameHeader.click();
      detectChanges(fixture);
      nameHeader.click();
      detectChanges(fixture);
      expect(component.sortOrder()).toBe(-1);
    });

    it('should clear sort on third click of same column', (): void => {
      const nameHeader: HTMLElement = queryAll(fixture, '.ui-lib-table__th--sortable')[0]!;
      nameHeader.click();
      nameHeader.click();
      nameHeader.click();
      detectChanges(fixture);
      expect(component.sortOrder()).toBe(0);
      expect(component.sortField()).toBeNull();
    });

    it('should emit a sort event on click', (): void => {
      const emitted: unknown[] = [];
      component.sorted.subscribe((event: unknown): void => {
        emitted.push(event);
      });
      const nameHeader: HTMLElement = queryAll(fixture, '.ui-lib-table__th--sortable')[0]!;
      nameHeader.click();
      detectChanges(fixture);
      expect(emitted.length).toBe(1);
    });

    it('should display rows in sorted order (ascending by name)', (): void => {
      component.sortField.set('name');
      component.sortOrder.set(1);
      detectChanges(fixture);
      const cells: NodeListOf<HTMLElement> = queryAll(
        fixture,
        '.ui-lib-table__row:first-child .ui-lib-table__td'
      );
      expect(cells[0]?.textContent.trim()).toBe('Chair');
    });

    it('should display rows in sorted order (descending by price)', (): void => {
      component.sortField.set('price');
      component.sortOrder.set(-1);
      detectChanges(fixture);
      const cells: NodeListOf<HTMLElement> = queryAll(
        fixture,
        '.ui-lib-table__row:first-child .ui-lib-table__td'
      );
      expect(cells[0]?.textContent.trim()).toBe('Laptop');
    });
  });

  // -------------------------------------------------------------------------
  // Global filter
  // -------------------------------------------------------------------------

  describe('Global filter', (): void => {
    let fixture: ComponentFixture<DefaultHostComponent>;
    let component: TableComponent;

    beforeEach(async (): Promise<void> => {
      await TestBed.configureTestingModule({
        imports: [DefaultHostComponent],
        providers: [provideZonelessChangeDetection()],
      }).compileComponents();
      fixture = TestBed.createComponent(DefaultHostComponent);
      detectChanges(fixture);
      component = fixture.debugElement.query(By.directive(TableComponent))
        .componentInstance as TableComponent;
    });

    it('should filter rows matching the global filter', (): void => {
      component.globalFilter.set('Electronics');
      detectChanges(fixture);
      const rows: NodeListOf<HTMLElement> = queryAll(fixture, '.ui-lib-table__row');
      expect(rows.length).toBe(3);
    });

    it('should show empty state when global filter matches nothing', (): void => {
      component.globalFilter.set('zzznomatch');
      detectChanges(fixture);
      const emptyRow: HTMLElement | null = queryOne(fixture, '.ui-lib-table__empty-row');
      expect(emptyRow).not.toBeNull();
    });

    it('should restore all rows when global filter is cleared', (): void => {
      component.globalFilter.set('Electronics');
      detectChanges(fixture);
      component.globalFilter.set('');
      detectChanges(fixture);
      const rows: NodeListOf<HTMLElement> = queryAll(fixture, '.ui-lib-table__row');
      expect(rows.length).toBe(PRODUCTS.length);
    });
  });

  // -------------------------------------------------------------------------
  // Selection — single
  // -------------------------------------------------------------------------

  describe('Single selection', (): void => {
    @Component({
      standalone: true,
      imports: [TableComponent, TableColumnComponent],
      changeDetection: ChangeDetectionStrategy.OnPush,
      template: `
        <ui-lib-table [value]="rows" dataKey="id" selectionMode="single" [(selection)]="sel">
          <ui-lib-table-column field="name" header="Name" />
        </ui-lib-table>
      `,
    })
    class SingleSelectionHost {
      public readonly rows: Product[] = PRODUCTS;
      public sel: unknown = null;
    }

    let fixture: ComponentFixture<SingleSelectionHost>;
    let component: TableComponent;

    beforeEach(async (): Promise<void> => {
      await TestBed.configureTestingModule({
        imports: [SingleSelectionHost],
        providers: [provideZonelessChangeDetection()],
      }).compileComponents();
      fixture = TestBed.createComponent(SingleSelectionHost);
      detectChanges(fixture);
      component = fixture.debugElement.query(By.directive(TableComponent))
        .componentInstance as TableComponent;
    });

    it('should select a row on click', (): void => {
      const firstRow: HTMLElement | null = queryOne(fixture, '.ui-lib-table__row');
      firstRow?.click();
      detectChanges(fixture);
      expect(component.selection()).not.toBeNull();
    });

    it('should apply selected class to clicked row', (): void => {
      const firstRow: HTMLElement | null = queryOne(fixture, '.ui-lib-table__row');
      firstRow?.click();
      detectChanges(fixture);
      expect(firstRow?.classList.contains('ui-lib-table__row--selected')).toBe(true);
    });

    it('should deselect on second click of same row', (): void => {
      const firstRow: HTMLElement | null = queryOne(fixture, '.ui-lib-table__row');
      firstRow?.click();
      detectChanges(fixture);
      firstRow?.click();
      detectChanges(fixture);
      expect(component.selection()).toBeNull();
    });

    it('should emit rowSelected event', (): void => {
      const emitted: unknown[] = [];
      component.rowSelected.subscribe((event: unknown): void => {
        emitted.push(event);
      });
      const firstRow: HTMLElement | null = queryOne(fixture, '.ui-lib-table__row');
      firstRow?.click();
      detectChanges(fixture);
      expect(emitted.length).toBe(1);
    });
  });

  // -------------------------------------------------------------------------
  // Selection — checkbox
  // -------------------------------------------------------------------------

  describe('Checkbox selection', (): void => {
    @Component({
      standalone: true,
      imports: [TableComponent, TableColumnComponent],
      changeDetection: ChangeDetectionStrategy.OnPush,
      template: `
        <ui-lib-table [value]="rows" dataKey="id" selectionMode="checkbox" [(selection)]="sel">
          <ui-lib-table-column field="name" header="Name" />
        </ui-lib-table>
      `,
    })
    class CheckboxSelectionHost {
      public readonly rows: Product[] = PRODUCTS;
      public sel: unknown[] = [];
    }

    let fixture: ComponentFixture<CheckboxSelectionHost>;
    let component: TableComponent;

    beforeEach(async (): Promise<void> => {
      await TestBed.configureTestingModule({
        imports: [CheckboxSelectionHost],
        providers: [provideZonelessChangeDetection()],
      }).compileComponents();
      fixture = TestBed.createComponent(CheckboxSelectionHost);
      detectChanges(fixture);
      component = fixture.debugElement.query(By.directive(TableComponent))
        .componentInstance as TableComponent;
    });

    it('should render a checkbox in the header', (): void => {
      const headerCheckbox: HTMLElement | null = queryOne(
        fixture,
        '.ui-lib-table__th--checkbox .ui-lib-table__checkbox'
      );
      expect(headerCheckbox).not.toBeNull();
    });

    it('should render a checkbox in each row', (): void => {
      const rowCheckboxes: NodeListOf<HTMLElement> = queryAll(
        fixture,
        '.ui-lib-table__td--checkbox .ui-lib-table__checkbox'
      );
      expect(rowCheckboxes.length).toBe(PRODUCTS.length);
    });

    it('should select a row when its checkbox is checked', (): void => {
      const firstCheckbox: HTMLInputElement | null = getNativeEl(
        fixture
      ).querySelector<HTMLInputElement>('.ui-lib-table__td--checkbox .ui-lib-table__checkbox');
      if (firstCheckbox) {
        firstCheckbox.checked = true;
        firstCheckbox.dispatchEvent(new Event('change'));
      }
      detectChanges(fixture);
      const sel: unknown[] = component.selection() as unknown[];
      expect(sel.length).toBe(1);
    });
  });

  // -------------------------------------------------------------------------
  // Row expansion
  // -------------------------------------------------------------------------

  describe('Row expansion', (): void => {
    @Component({
      standalone: true,
      imports: [TableComponent, TableColumnComponent, TableExpansionDirective],
      changeDetection: ChangeDetectionStrategy.OnPush,
      template: `
        <ui-lib-table [value]="rows" dataKey="id">
          <ui-lib-table-column field="name" header="Name" />
          <ng-template uiTableExpansion let-row>
            <div class="expansion-content">Details: {{ row.category }}</div>
          </ng-template>
        </ui-lib-table>
      `,
    })
    class ExpansionHost {
      public readonly rows: Product[] = PRODUCTS;
    }

    let fixture: ComponentFixture<ExpansionHost>;
    let component: TableComponent;

    beforeEach(async (): Promise<void> => {
      await TestBed.configureTestingModule({
        imports: [ExpansionHost],
        providers: [provideZonelessChangeDetection()],
      }).compileComponents();
      fixture = TestBed.createComponent(ExpansionHost);
      detectChanges(fixture);
      component = fixture.debugElement.query(By.directive(TableComponent))
        .componentInstance as TableComponent;
    });

    it('should render an expansion toggle button per row', (): void => {
      const toggles: NodeListOf<HTMLElement> = queryAll(fixture, '.ui-lib-table__expander-btn');
      expect(toggles.length).toBe(PRODUCTS.length);
    });

    it('should expand a row when toggle is clicked', (): void => {
      const toggle: HTMLElement | null = queryOne(fixture, '.ui-lib-table__expander-btn');
      toggle?.click();
      detectChanges(fixture);
      const expansion: HTMLElement | null = queryOne(fixture, '.expansion-content');
      expect(expansion).not.toBeNull();
    });

    it('should collapse a row on second toggle click', (): void => {
      const toggle: HTMLElement | null = queryOne(fixture, '.ui-lib-table__expander-btn');
      toggle?.click();
      detectChanges(fixture);
      toggle?.click();
      detectChanges(fixture);
      const expansion: HTMLElement | null = queryOne(fixture, '.expansion-content');
      expect(expansion).toBeNull();
    });

    it('should emit rowExpanded event', (): void => {
      const emitted: unknown[] = [];
      component.rowExpanded.subscribe((event: unknown): void => {
        emitted.push(event);
      });
      const toggle: HTMLElement | null = queryOne(fixture, '.ui-lib-table__expander-btn');
      toggle?.click();
      detectChanges(fixture);
      expect(emitted.length).toBe(1);
    });
  });

  // -------------------------------------------------------------------------
  // Pagination
  // -------------------------------------------------------------------------

  describe('Pagination', (): void => {
    @Component({
      standalone: true,
      imports: [TableComponent, TableColumnComponent],
      changeDetection: ChangeDetectionStrategy.OnPush,
      template: `
        <ui-lib-table [value]="rows" [paginator]="true" [rows]="2" [first]="0">
          <ui-lib-table-column field="name" header="Name" />
        </ui-lib-table>
      `,
    })
    class PaginatedHost {
      public readonly rows: Product[] = PRODUCTS;
    }

    let fixture: ComponentFixture<PaginatedHost>;
    let component: TableComponent;

    beforeEach(async (): Promise<void> => {
      await TestBed.configureTestingModule({
        imports: [PaginatedHost],
        providers: [provideZonelessChangeDetection()],
      }).compileComponents();
      fixture = TestBed.createComponent(PaginatedHost);
      detectChanges(fixture);
      component = fixture.debugElement.query(By.directive(TableComponent))
        .componentInstance as TableComponent;
    });

    it('should render only the first page of rows', (): void => {
      const rows: NodeListOf<HTMLElement> = queryAll(fixture, '.ui-lib-table__row');
      expect(rows.length).toBe(2);
    });

    it('should render the paginator component', (): void => {
      const paginator: HTMLElement | null = queryOne(fixture, 'ui-lib-paginator');
      expect(paginator).not.toBeNull();
    });

    it('should show correct total records in paginator', (): void => {
      expect(component.totalRecords()).toBe(PRODUCTS.length);
    });
  });

  // -------------------------------------------------------------------------
  // Custom column body template
  // -------------------------------------------------------------------------

  describe('Custom cell templates', (): void => {
    @Component({
      standalone: true,
      imports: [TableComponent, TableColumnComponent, TableColumnBodyDirective],
      changeDetection: ChangeDetectionStrategy.OnPush,
      template: `
        <ui-lib-table [value]="rows">
          <ui-lib-table-column field="name" header="Name">
            <ng-template uiTableColumnBody let-row>
              <strong class="custom-cell">{{ row.name }}</strong>
            </ng-template>
          </ui-lib-table-column>
        </ui-lib-table>
      `,
    })
    class CustomCellHost {
      public readonly rows: Product[] = PRODUCTS;
    }

    it('should render the custom body template for cells', async (): Promise<void> => {
      await TestBed.configureTestingModule({
        imports: [CustomCellHost],
        providers: [provideZonelessChangeDetection()],
      }).compileComponents();
      const fixture: ComponentFixture<CustomCellHost> = TestBed.createComponent(CustomCellHost);
      detectChanges(fixture);
      const customCells: NodeListOf<HTMLElement> = queryAll(fixture, '.custom-cell');
      expect(customCells.length).toBe(PRODUCTS.length);
    });
  });

  // -------------------------------------------------------------------------
  // Caption
  // -------------------------------------------------------------------------

  describe('Caption', (): void => {
    it('should render string caption', async (): Promise<void> => {
      @Component({
        standalone: true,
        imports: [TableComponent, TableColumnComponent],
        changeDetection: ChangeDetectionStrategy.OnPush,
        template: `<ui-lib-table [value]="[]" caption="My Table">
          <ui-lib-table-column field="name" header="Name" />
        </ui-lib-table>`,
      })
      class CaptionHost {}

      await TestBed.configureTestingModule({
        imports: [CaptionHost],
        providers: [provideZonelessChangeDetection()],
      }).compileComponents();
      const fixture: ComponentFixture<CaptionHost> = TestBed.createComponent(CaptionHost);
      detectChanges(fixture);
      const caption: HTMLElement | null = queryOne(fixture, '.ui-lib-table__caption');
      expect(caption).not.toBeNull();
      expect(caption?.textContent.trim()).toBe('My Table');
    });

    it('should render custom [uiTableCaption] template', async (): Promise<void> => {
      @Component({
        standalone: true,
        imports: [TableComponent, TableColumnComponent, TableCaptionDirective],
        changeDetection: ChangeDetectionStrategy.OnPush,
        template: `<ui-lib-table [value]="[]">
          <ui-lib-table-column field="name" header="Name" />
          <ng-template uiTableCaption>
            <h2 class="my-caption">Custom Caption</h2>
          </ng-template>
        </ui-lib-table>`,
      })
      class CustomCaptionHost {}

      await TestBed.configureTestingModule({
        imports: [CustomCaptionHost],
        providers: [provideZonelessChangeDetection()],
      }).compileComponents();
      const fixture: ComponentFixture<CustomCaptionHost> =
        TestBed.createComponent(CustomCaptionHost);
      detectChanges(fixture);
      const caption: HTMLElement | null = queryOne(fixture, '.my-caption');
      expect(caption).not.toBeNull();
    });
  });

  // -------------------------------------------------------------------------
  // resolveField helper
  // -------------------------------------------------------------------------

  describe('resolveField()', (): void => {
    let fixture: ComponentFixture<DefaultHostComponent>;
    let component: TableComponent;

    beforeEach(async (): Promise<void> => {
      await TestBed.configureTestingModule({
        imports: [DefaultHostComponent],
        providers: [provideZonelessChangeDetection()],
      }).compileComponents();
      fixture = TestBed.createComponent(DefaultHostComponent);
      detectChanges(fixture);
      component = fixture.debugElement.query(By.directive(TableComponent))
        .componentInstance as TableComponent;
    });

    it('should resolve a top-level property', (): void => {
      const result: string = component.resolveField({ name: 'Test' }, 'name');
      expect(result).toBe('Test');
    });

    it('should resolve a nested property via dot notation', (): void => {
      const result: string = component.resolveField(
        { address: { city: 'London' } },
        'address.city'
      );
      expect(result).toBe('London');
    });

    it('should return empty string for undefined path', (): void => {
      const result: string = component.resolveField({}, 'missing.path');
      expect(result).toBe('');
    });

    it('should return empty string for null value', (): void => {
      const result: string = component.resolveField({ name: null }, 'name');
      expect(result).toBe('');
    });
  });

  // -------------------------------------------------------------------------
  // Multi-sort meta
  // -------------------------------------------------------------------------

  describe('multiSortRank()', (): void => {
    @Component({
      standalone: true,
      imports: [TableComponent, TableColumnComponent],
      changeDetection: ChangeDetectionStrategy.OnPush,
      template: `
        <ui-lib-table [value]="rows" [multiSortMode]="true">
          <ui-lib-table-column field="name" header="Name" [sortable]="true" />
          <ui-lib-table-column field="category" header="Category" [sortable]="true" />
        </ui-lib-table>
      `,
    })
    class MultiSortHost {
      public readonly rows: Product[] = PRODUCTS;
    }

    it('should return null when field is not in multi-sort stack', async (): Promise<void> => {
      await TestBed.configureTestingModule({
        imports: [MultiSortHost],
        providers: [provideZonelessChangeDetection()],
      }).compileComponents();
      const fixture: ComponentFixture<MultiSortHost> = TestBed.createComponent(MultiSortHost);
      detectChanges(fixture);
      const comp: TableComponent = fixture.debugElement.query(By.directive(TableComponent))
        .componentInstance as TableComponent;
      expect(comp.multiSortRank('name')).toBeNull();
    });

    it('should return 1 for the first field in multi-sort stack', async (): Promise<void> => {
      await TestBed.configureTestingModule({
        imports: [MultiSortHost],
        providers: [provideZonelessChangeDetection()],
      }).compileComponents();
      const fixture: ComponentFixture<MultiSortHost> = TestBed.createComponent(MultiSortHost);
      detectChanges(fixture);
      const comp: TableComponent = fixture.debugElement.query(By.directive(TableComponent))
        .componentInstance as TableComponent;
      const meta: TableSortMeta[] = [
        { field: 'name', order: 1 },
        { field: 'category', order: -1 },
      ];
      comp.multiSortMeta.set(meta);
      detectChanges(fixture);
      expect(comp.multiSortRank('name')).toBe(1);
      expect(comp.multiSortRank('category')).toBe(2);
    });
  });

  // -------------------------------------------------------------------------
  // isRowSelected helper
  // -------------------------------------------------------------------------

  describe('isRowSelected()', (): void => {
    let fixture: ComponentFixture<DefaultHostComponent>;
    let component: TableComponent;

    beforeEach(async (): Promise<void> => {
      await TestBed.configureTestingModule({
        imports: [DefaultHostComponent],
        providers: [provideZonelessChangeDetection()],
      }).compileComponents();
      fixture = TestBed.createComponent(DefaultHostComponent);
      detectChanges(fixture);
      component = fixture.debugElement.query(By.directive(TableComponent))
        .componentInstance as TableComponent;
    });

    it('should return false when selectionMode is null', (): void => {
      expect(component.isRowSelected(PRODUCTS[0])).toBe(false);
    });
  });

  // -------------------------------------------------------------------------
  // Accessibility
  // -------------------------------------------------------------------------

  describe('Accessibility', (): void => {
    let fixture: ComponentFixture<DefaultHostComponent>;

    beforeEach(async (): Promise<void> => {
      await TestBed.configureTestingModule({
        imports: [DefaultHostComponent],
        providers: [provideZonelessChangeDetection()],
      }).compileComponents();
      fixture = TestBed.createComponent(DefaultHostComponent);
      detectChanges(fixture);
    });

    it('should have role="grid" on the table element', (): void => {
      const table: HTMLElement | null = queryOne(fixture, 'table');
      expect(table?.getAttribute('role')).toBe('grid');
    });

    it('should have scope="col" on column header cells', (): void => {
      const headers: NodeListOf<HTMLElement> = queryAll(
        fixture,
        '.ui-lib-table__th:not(.ui-lib-table__th--expander)'
      );
      headers.forEach((header: HTMLElement): void => {
        expect(header.getAttribute('scope')).toBe('col');
      });
    });

    it('should have aria-sort on sortable column headers', (): void => {
      const sortableHeaders: NodeListOf<HTMLElement> = queryAll(
        fixture,
        '.ui-lib-table__th--sortable'
      );
      sortableHeaders.forEach((header: HTMLElement): void => {
        expect(header.hasAttribute('aria-sort')).toBe(true);
      });
    });

    it('should have tabindex=0 on sortable headers', (): void => {
      const sortableHeaders: NodeListOf<HTMLElement> = queryAll(
        fixture,
        '.ui-lib-table__th--sortable'
      );
      sortableHeaders.forEach((header: HTMLElement): void => {
        expect(header.getAttribute('tabindex')).toBe('0');
      });
    });
  });
});
