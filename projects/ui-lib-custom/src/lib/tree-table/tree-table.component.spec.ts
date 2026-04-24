import {
  ChangeDetectionStrategy,
  Component,
  provideZonelessChangeDetection,
  signal,
} from '@angular/core';
import type { WritableSignal } from '@angular/core';
import type { ComponentFixture } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';
import { TreeTableComponent } from './tree-table.component';
import { TreeTableColumnComponent } from './tree-table-column.component';
import type { TreeTableNode, TreeTableSelectionMode, TreeTableVariant } from './tree-table.types';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function queryEl<T extends HTMLElement>(fixture: ComponentFixture<unknown>, selector: string): T {
  return (fixture.nativeElement as HTMLElement).querySelector<T>(selector) as T;
}

function queryAllEl<T extends HTMLElement>(
  fixture: ComponentFixture<unknown>,
  selector: string
): T[] {
  return Array.from((fixture.nativeElement as HTMLElement).querySelectorAll<T>(selector));
}

// ---------------------------------------------------------------------------
// Sample data factory — fresh clone per test suite
// ---------------------------------------------------------------------------

function buildNodes(): TreeTableNode[] {
  return [
    {
      key: '1',
      data: { name: 'Documents', size: '100 KB', type: 'Folder' },
      expanded: true,
      children: [
        {
          key: '1-1',
          data: { name: 'Invoice.pdf', size: '20 KB', type: 'PDF' },
          leaf: true,
        },
        {
          key: '1-2',
          data: { name: 'Resume.docx', size: '30 KB', type: 'Word' },
          leaf: true,
        },
      ],
    },
    {
      key: '2',
      data: { name: 'Pictures', size: '2 MB', type: 'Folder' },
      expanded: false,
      children: [
        {
          key: '2-1',
          data: { name: 'vacation.jpg', size: '1 MB', type: 'Image' },
          leaf: true,
        },
      ],
    },
  ];
}

// ---------------------------------------------------------------------------
// Minimal host (no selection)
// ---------------------------------------------------------------------------

@Component({
  standalone: true,
  imports: [TreeTableComponent, TreeTableColumnComponent],
  template: `
    <ui-lib-tree-table [value]="nodes">
      <ui-lib-tree-table-column field="name" header="Name" [expander]="true" />
      <ui-lib-tree-table-column field="size" header="Size" />
      <ui-lib-tree-table-column field="type" header="Type" />
    </ui-lib-tree-table>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class BasicHostComponent {
  public nodes: TreeTableNode[] = buildNodes();
}

// ---------------------------------------------------------------------------
// Configurable host
// ---------------------------------------------------------------------------

@Component({
  standalone: true,
  imports: [TreeTableComponent, TreeTableColumnComponent],
  template: `
    <ui-lib-tree-table
      [value]="nodes"
      [variant]="variant()"
      [size]="size()"
      [selectionMode]="selectionMode()"
      [(selection)]="selection"
      [globalFilter]="true"
    >
      <ui-lib-tree-table-column field="name" header="Name" [expander]="true" [sortable]="true" />
      <ui-lib-tree-table-column field="size" header="Size" [sortable]="true" />
      <ui-lib-tree-table-column field="type" header="Type" />
    </ui-lib-tree-table>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class ConfigurableHostComponent {
  public nodes: TreeTableNode[] = buildNodes();
  public variant: WritableSignal<TreeTableVariant> = signal<TreeTableVariant>('material');
  public size: WritableSignal<'sm' | 'md' | 'lg'> = signal<'sm' | 'md' | 'lg'>('md');
  public selectionMode: WritableSignal<TreeTableSelectionMode> =
    signal<TreeTableSelectionMode>(null);
  public selection: TreeTableNode | TreeTableNode[] | null = null;
}

// ---------------------------------------------------------------------------
// Suites
// ---------------------------------------------------------------------------

describe('TreeTableComponent', (): void => {
  // ─── Basic rendering ───────────────────────────────────────────────────────

  describe('Basic rendering', (): void => {
    let fixture: ComponentFixture<BasicHostComponent>;

    beforeEach(async (): Promise<void> => {
      await TestBed.configureTestingModule({
        imports: [BasicHostComponent],
        providers: [provideZonelessChangeDetection()],
      }).compileComponents();

      fixture = TestBed.createComponent(BasicHostComponent);
      fixture.detectChanges();
    });

    it('should create', (): void => {
      expect(fixture.componentInstance).toBeTruthy();
    });

    it('should render column headers', (): void => {
      const headers: HTMLElement[] = queryAllEl<HTMLElement>(fixture, '.uilib-tree-table-th');
      expect(headers.length).toBe(3);
      expect(headers[0].textContent.trim()).toContain('Name');
      expect(headers[1].textContent.trim()).toContain('Size');
      expect(headers[2].textContent.trim()).toContain('Type');
    });

    it('should render root + expanded children only', (): void => {
      const rows: HTMLElement[] = queryAllEl<HTMLElement>(fixture, '.uilib-tree-table-row');
      // Documents (expanded) + 2 children + Pictures (collapsed) = 4
      expect(rows.length).toBe(4);
    });

    it('should render cell values from node.data', (): void => {
      const cells: HTMLElement[] = queryAllEl<HTMLElement>(
        fixture,
        '.uilib-tree-table-row:first-child .uilib-tree-table-td'
      );
      const text: string = cells
        .map((cell: HTMLElement): string => cell.textContent.trim())
        .join(' ');
      expect(text).toContain('Documents');
    });

    it('should render toggle buttons for branch nodes', (): void => {
      const toggles: HTMLElement[] = queryAllEl<HTMLElement>(fixture, '.uilib-tree-table-toggle');
      expect(toggles.length).toBe(2);
    });

    it('should render leaf spacers for visible leaf nodes', (): void => {
      const spacers: HTMLElement[] = queryAllEl<HTMLElement>(
        fixture,
        '.uilib-tree-table-leaf-spacer'
      );
      expect(spacers.length).toBe(2);
    });

    it('should apply host class ui-lib-tree-table', (): void => {
      const host: HTMLElement = (fixture.nativeElement as HTMLElement).querySelector<HTMLElement>(
        'ui-lib-tree-table'
      ) as HTMLElement;
      expect(host.classList.contains('ui-lib-tree-table')).toBe(true);
    });
  });

  // ─── Expand / collapse ────────────────────────────────────────────────────

  describe('Expand and collapse', (): void => {
    let fixture: ComponentFixture<ConfigurableHostComponent>;
    let host: ConfigurableHostComponent;

    beforeEach(async (): Promise<void> => {
      await TestBed.configureTestingModule({
        imports: [ConfigurableHostComponent],
        providers: [provideZonelessChangeDetection()],
      }).compileComponents();

      fixture = TestBed.createComponent(ConfigurableHostComponent);
      host = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should collapse an expanded node', (): void => {
      const rowsBefore: number = queryAllEl<HTMLElement>(fixture, '.uilib-tree-table-row').length;
      const firstToggle: HTMLElement = queryEl<HTMLElement>(fixture, '.uilib-tree-table-toggle');
      firstToggle.click();
      fixture.detectChanges();
      const rowsAfter: number = queryAllEl<HTMLElement>(fixture, '.uilib-tree-table-row').length;
      expect(rowsAfter).toBeLessThan(rowsBefore);
    });

    it('should expand a collapsed node', (): void => {
      const rowsBefore: number = queryAllEl<HTMLElement>(fixture, '.uilib-tree-table-row').length;
      const toggles: HTMLElement[] = queryAllEl<HTMLElement>(fixture, '.uilib-tree-table-toggle');
      (toggles[1] as HTMLElement).click();
      fixture.detectChanges();
      const rowsAfter: number = queryAllEl<HTMLElement>(fixture, '.uilib-tree-table-row').length;
      expect(rowsAfter).toBeGreaterThan(rowsBefore);
    });

    it('should mark expanded toggle with --expanded class', (): void => {
      const firstToggle: HTMLElement = queryEl<HTMLElement>(fixture, '.uilib-tree-table-toggle');
      expect(firstToggle.classList.contains('uilib-tree-table-toggle--expanded')).toBe(true);
    });

    it('should mutate node.expanded on toggle', (): void => {
      const documentsNode: TreeTableNode = host.nodes[0] as TreeTableNode;
      expect(documentsNode.expanded).toBe(true);
      queryEl<HTMLElement>(fixture, '.uilib-tree-table-toggle').click();
      fixture.detectChanges();
      expect(documentsNode.expanded).toBe(false);
    });
  });

  // ─── Variants and sizes ───────────────────────────────────────────────────

  describe('Variants and sizes', (): void => {
    let fixture: ComponentFixture<ConfigurableHostComponent>;
    let host: ConfigurableHostComponent;

    beforeEach(async (): Promise<void> => {
      await TestBed.configureTestingModule({
        imports: [ConfigurableHostComponent],
        providers: [provideZonelessChangeDetection()],
      }).compileComponents();

      fixture = TestBed.createComponent(ConfigurableHostComponent);
      host = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should apply material variant class', (): void => {
      host.variant.set('material');
      fixture.detectChanges();
      const el: HTMLElement = queryEl<HTMLElement>(fixture, 'ui-lib-tree-table');
      expect(el.classList.contains('ui-lib-tree-table--variant-material')).toBe(true);
    });

    it('should apply bootstrap variant class', (): void => {
      host.variant.set('bootstrap');
      fixture.detectChanges();
      const el: HTMLElement = queryEl<HTMLElement>(fixture, 'ui-lib-tree-table');
      expect(el.classList.contains('ui-lib-tree-table--variant-bootstrap')).toBe(true);
    });

    it('should apply minimal variant class', (): void => {
      host.variant.set('minimal');
      fixture.detectChanges();
      const el: HTMLElement = queryEl<HTMLElement>(fixture, 'ui-lib-tree-table');
      expect(el.classList.contains('ui-lib-tree-table--variant-minimal')).toBe(true);
    });

    it('should apply sm size class', (): void => {
      host.size.set('sm');
      fixture.detectChanges();
      const el: HTMLElement = queryEl<HTMLElement>(fixture, 'ui-lib-tree-table');
      expect(el.classList.contains('ui-lib-tree-table--size-sm')).toBe(true);
    });

    it('should apply lg size class', (): void => {
      host.size.set('lg');
      fixture.detectChanges();
      const el: HTMLElement = queryEl<HTMLElement>(fixture, 'ui-lib-tree-table');
      expect(el.classList.contains('ui-lib-tree-table--size-lg')).toBe(true);
    });
  });

  // ─── Single selection ─────────────────────────────────────────────────────

  describe('Single selection', (): void => {
    let fixture: ComponentFixture<ConfigurableHostComponent>;
    let host: ConfigurableHostComponent;

    beforeEach(async (): Promise<void> => {
      await TestBed.configureTestingModule({
        imports: [ConfigurableHostComponent],
        providers: [provideZonelessChangeDetection()],
      }).compileComponents();

      fixture = TestBed.createComponent(ConfigurableHostComponent);
      host = fixture.componentInstance;
      host.selectionMode.set('single');
      fixture.detectChanges();
    });

    it('should select a row on click', (): void => {
      const firstRow: HTMLElement = queryEl<HTMLElement>(fixture, '.uilib-tree-table-row');
      firstRow.click();
      fixture.detectChanges();
      expect(firstRow.classList.contains('uilib-tree-table-row--selected')).toBe(true);
    });

    it('should deselect on second click', (): void => {
      const firstRow: HTMLElement = queryEl<HTMLElement>(fixture, '.uilib-tree-table-row');
      firstRow.click();
      fixture.detectChanges();
      firstRow.click();
      fixture.detectChanges();
      expect(firstRow.classList.contains('uilib-tree-table-row--selected')).toBe(false);
    });

    it('should only allow one selected row', (): void => {
      const rows: HTMLElement[] = queryAllEl<HTMLElement>(fixture, '.uilib-tree-table-row');
      (rows[0] as HTMLElement).click();
      fixture.detectChanges();
      (rows[1] as HTMLElement).click();
      fixture.detectChanges();
      expect(queryAllEl<HTMLElement>(fixture, '.uilib-tree-table-row--selected').length).toBe(1);
    });
  });

  // ─── Multiple selection ───────────────────────────────────────────────────

  describe('Multiple selection', (): void => {
    let fixture: ComponentFixture<ConfigurableHostComponent>;
    let host: ConfigurableHostComponent;

    beforeEach(async (): Promise<void> => {
      await TestBed.configureTestingModule({
        imports: [ConfigurableHostComponent],
        providers: [provideZonelessChangeDetection()],
      }).compileComponents();

      fixture = TestBed.createComponent(ConfigurableHostComponent);
      host = fixture.componentInstance;
      host.selectionMode.set('multiple');
      fixture.detectChanges();
    });

    it('should allow multiple selected rows', (): void => {
      const rows: HTMLElement[] = queryAllEl<HTMLElement>(fixture, '.uilib-tree-table-row');
      (rows[0] as HTMLElement).click();
      fixture.detectChanges();
      (rows[1] as HTMLElement).click();
      fixture.detectChanges();
      expect(queryAllEl<HTMLElement>(fixture, '.uilib-tree-table-row--selected').length).toBe(2);
    });

    it('should deselect on second click', (): void => {
      const firstRow: HTMLElement = queryEl<HTMLElement>(fixture, '.uilib-tree-table-row');
      firstRow.click();
      fixture.detectChanges();
      firstRow.click();
      fixture.detectChanges();
      expect(firstRow.classList.contains('uilib-tree-table-row--selected')).toBe(false);
    });
  });

  // ─── Checkbox selection ───────────────────────────────────────────────────

  describe('Checkbox selection', (): void => {
    let fixture: ComponentFixture<ConfigurableHostComponent>;
    let host: ConfigurableHostComponent;

    beforeEach(async (): Promise<void> => {
      await TestBed.configureTestingModule({
        imports: [ConfigurableHostComponent],
        providers: [provideZonelessChangeDetection()],
      }).compileComponents();

      fixture = TestBed.createComponent(ConfigurableHostComponent);
      host = fixture.componentInstance;
      host.selectionMode.set('checkbox');
      fixture.detectChanges();
    });

    it('should render a header checkbox', (): void => {
      expect(
        queryEl<HTMLElement>(fixture, '.uilib-tree-table-th-selection .uilib-tree-table-checkbox')
      ).toBeTruthy();
    });

    it('should render row checkboxes', (): void => {
      const boxes: HTMLElement[] = queryAllEl<HTMLElement>(
        fixture,
        '.uilib-tree-table-td-selection .uilib-tree-table-checkbox'
      );
      expect(boxes.length).toBeGreaterThan(0);
    });

    it('should check a row checkbox on click', (): void => {
      const checkbox: HTMLElement = queryEl<HTMLElement>(
        fixture,
        '.uilib-tree-table-td-selection .uilib-tree-table-checkbox'
      );
      checkbox.click();
      fixture.detectChanges();
      expect(checkbox.classList.contains('uilib-tree-table-checkbox--checked')).toBe(true);
    });

    it('should cascade selection to children', (): void => {
      const checkboxes: HTMLElement[] = queryAllEl<HTMLElement>(
        fixture,
        '.uilib-tree-table-td-selection .uilib-tree-table-checkbox'
      );
      (checkboxes[0] as HTMLElement).click();
      fixture.detectChanges();

      const component: TreeTableComponent = fixture.debugElement.children[0]
        .componentInstance as TreeTableComponent;
      const selected: TreeTableNode[] = component.selection() as TreeTableNode[];
      expect(selected.length).toBeGreaterThanOrEqual(1);
    });

    it('should select all via header checkbox', (): void => {
      const headerCheckbox: HTMLElement = queryEl<HTMLElement>(
        fixture,
        '.uilib-tree-table-th-selection .uilib-tree-table-checkbox'
      );
      headerCheckbox.click();
      fixture.detectChanges();

      const component: TreeTableComponent = fixture.debugElement.children[0]
        .componentInstance as TreeTableComponent;
      expect(component.isAllSelected()).toBe(true);
    });
  });

  // ─── Sorting ──────────────────────────────────────────────────────────────

  describe('Sorting', (): void => {
    let fixture: ComponentFixture<ConfigurableHostComponent>;

    beforeEach(async (): Promise<void> => {
      await TestBed.configureTestingModule({
        imports: [ConfigurableHostComponent],
        providers: [provideZonelessChangeDetection()],
      }).compileComponents();

      fixture = TestBed.createComponent(ConfigurableHostComponent);
      fixture.detectChanges();
    });

    it('should render sort icons on sortable columns', (): void => {
      const icons: HTMLElement[] = queryAllEl<HTMLElement>(fixture, '.uilib-tree-table-sort-icon');
      expect(icons.length).toBe(2);
    });

    it('should mark header as sorted after click', (): void => {
      const header: HTMLElement = queryEl<HTMLElement>(fixture, '.uilib-tree-table-th-sortable');
      header.click();
      fixture.detectChanges();
      expect(header.classList.contains('uilib-tree-table-th-sorted')).toBe(true);
    });

    it('should cycle sort order none → asc → desc → none', (): void => {
      const component: TreeTableComponent = fixture.debugElement.children[0]
        .componentInstance as TreeTableComponent;
      const header: HTMLElement = queryEl<HTMLElement>(fixture, '.uilib-tree-table-th-sortable');

      header.click();
      fixture.detectChanges();
      expect(component.sortOrder()).toBe(1);

      header.click();
      fixture.detectChanges();
      expect(component.sortOrder()).toBe(-1);

      header.click();
      fixture.detectChanges();
      expect(component.sortOrder()).toBe(0);
    });
  });

  // ─── Global filter ────────────────────────────────────────────────────────

  describe('Global filter', (): void => {
    let fixture: ComponentFixture<ConfigurableHostComponent>;

    beforeEach(async (): Promise<void> => {
      await TestBed.configureTestingModule({
        imports: [ConfigurableHostComponent],
        providers: [provideZonelessChangeDetection()],
      }).compileComponents();

      fixture = TestBed.createComponent(ConfigurableHostComponent);
      fixture.detectChanges();
    });

    it('should render the filter input', (): void => {
      expect(queryEl<HTMLElement>(fixture, '.uilib-tree-table-filter-input')).toBeTruthy();
    });

    it('should reduce visible rows when filtering', (): void => {
      const before: number = queryAllEl<HTMLElement>(fixture, '.uilib-tree-table-row').length;
      const input: HTMLInputElement = queryEl<HTMLInputElement>(
        fixture,
        '.uilib-tree-table-filter-input'
      );
      input.value = 'PDF';
      input.dispatchEvent(new Event('input'));
      fixture.detectChanges();
      expect(queryAllEl<HTMLElement>(fixture, '.uilib-tree-table-row').length).toBeLessThan(before);
    });

    it('should show empty message when no rows match', (): void => {
      const input: HTMLInputElement = queryEl<HTMLInputElement>(
        fixture,
        '.uilib-tree-table-filter-input'
      );
      input.value = 'xyzzy_no_match_at_all';
      input.dispatchEvent(new Event('input'));
      fixture.detectChanges();
      expect(queryEl<HTMLElement>(fixture, '.uilib-tree-table-empty-message')).toBeTruthy();
    });
  });

  // ─── getCellValue ─────────────────────────────────────────────────────────

  describe('getCellValue', (): void => {
    let component: TreeTableComponent;

    beforeEach(async (): Promise<void> => {
      await TestBed.configureTestingModule({
        imports: [BasicHostComponent],
        providers: [provideZonelessChangeDetection()],
      }).compileComponents();

      const fixture: ComponentFixture<BasicHostComponent> =
        TestBed.createComponent(BasicHostComponent);
      fixture.detectChanges();
      component = fixture.debugElement.children[0].componentInstance as TreeTableComponent;
    });

    it('should return field value', (): void => {
      const node: TreeTableNode = { key: 'x', data: { name: 'Test.pdf' } };
      expect(component.getCellValue(node, 'name')).toBe('Test.pdf');
    });

    it('should return empty string for missing field', (): void => {
      const node: TreeTableNode = { key: 'x', data: { name: 'Test.pdf' } };
      expect(component.getCellValue(node, 'missing')).toBe('');
    });

    it('should return empty string when data is undefined', (): void => {
      const node: TreeTableNode = { key: 'x' };
      expect(component.getCellValue(node, 'name')).toBe('');
    });

    it('should resolve dot-notation paths', (): void => {
      const node: TreeTableNode = { key: 'x', data: { address: { city: 'Berlin' } } };
      expect(component.getCellValue(node, 'address.city')).toBe('Berlin');
    });
  });

  // ─── Accessibility ────────────────────────────────────────────────────────

  describe('Accessibility', (): void => {
    let fixture: ComponentFixture<BasicHostComponent>;

    beforeEach(async (): Promise<void> => {
      await TestBed.configureTestingModule({
        imports: [BasicHostComponent],
        providers: [provideZonelessChangeDetection()],
      }).compileComponents();

      fixture = TestBed.createComponent(BasicHostComponent);
      fixture.detectChanges();
    });

    it('should have role="treegrid" on the table', (): void => {
      expect(queryEl<HTMLElement>(fixture, '.uilib-tree-table-table').getAttribute('role')).toBe(
        'treegrid'
      );
    });

    it('should have role="row" on body rows', (): void => {
      const rows: HTMLElement[] = queryAllEl<HTMLElement>(fixture, '.uilib-tree-table-row');
      for (const row of rows) {
        expect(row.getAttribute('role')).toBe('row');
      }
    });

    it('should have aria-level on each row', (): void => {
      const rows: HTMLElement[] = queryAllEl<HTMLElement>(fixture, '.uilib-tree-table-row');
      for (const row of rows) {
        const level: string | null = row.getAttribute('aria-level');
        expect(level).not.toBeNull();
        expect(Number(level)).toBeGreaterThanOrEqual(1);
      }
    });

    it('should have aria-expanded on branch rows', (): void => {
      const rows: HTMLElement[] = queryAllEl<HTMLElement>(fixture, '.uilib-tree-table-row');
      const branchRows: HTMLElement[] = rows.filter(
        (row: HTMLElement): boolean => row.getAttribute('aria-expanded') !== null
      );
      expect(branchRows.length).toBeGreaterThan(0);
    });

    it('should have scope="col" on header cells', (): void => {
      const headers: HTMLElement[] = queryAllEl<HTMLElement>(fixture, '.uilib-tree-table-th');
      for (const header of headers) {
        expect(header.getAttribute('scope')).toBe('col');
      }
    });
  });
});
