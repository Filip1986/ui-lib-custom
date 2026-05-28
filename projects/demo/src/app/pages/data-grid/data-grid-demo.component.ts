import { ChangeDetectionStrategy, Component, computed, signal, viewChild } from '@angular/core';
import type { Signal, WritableSignal } from '@angular/core';
import {
  DataGridComponent,
  DataGridColumnComponent,
  DataGridColumnBodyDirective,
} from 'ui-lib-custom/data-grid';
import type {
  DataGridSortEvent,
  DataGridVariant,
  DataGridSelectionMode,
  DataGridEditMode,
  DataGridLazyLoadEvent,
} from 'ui-lib-custom/data-grid';
import { DocPageHeaderComponent } from '@demo/shared/doc-page/doc-page-header.component';
import { DocPageLayoutComponent } from '@demo/shared/doc-page/doc-page-layout.component';
import { DocTocComponent } from '@demo/shared/doc-page/doc-toc.component';
import type { DocSection } from '@demo/shared/doc-page/doc-section.model';
import { DocQualityBadgeComponent } from '@demo/shared/doc-page/doc-quality-badge.component';
import type { ComponentQualityAudit } from '@demo/shared/doc-page/doc-quality-badge.component';
import { DocApiReferenceComponent } from '@demo/shared/doc-page/doc-api-reference.component';
import type { ApiPropRow } from '@demo/shared/doc-page/doc-api-reference.component';
import { DocSectionComponent } from '@demo/shared/doc-page/doc-section.component';
import { DocCssVarsTableComponent } from '@demo/shared/doc-page/doc-css-vars-table.component';
import type { CssVarRow } from '@demo/shared/doc-page/doc-css-vars-table.component';
import { DocKeyboardNavComponent } from '@demo/shared/doc-page/doc-keyboard-nav.component';
import type { KeyboardNavRow } from '@demo/shared/doc-page/doc-keyboard-nav.component';
import { DocAriaTableComponent } from '@demo/shared/doc-page/doc-aria-table.component';
import type { AriaRow } from '@demo/shared/doc-page/doc-aria-table.component';

interface Employee {
  id: number;
  name: string;
  department: string;
  role: string;
  salary: number;
  joinDate: string;
  status: 'active' | 'on-leave' | 'inactive';
  location: string;
}

/** Demo component showcasing the DataGridComponent. */
@Component({
  selector: 'app-data-grid-demo',
  standalone: true,
  imports: [
    DataGridComponent,
    DataGridColumnComponent,
    DataGridColumnBodyDirective,
    DocPageHeaderComponent,
    DocPageLayoutComponent,
    DocTocComponent,
    DocQualityBadgeComponent,
    DocApiReferenceComponent,
    DocSectionComponent,
    DocCssVarsTableComponent,
    DocKeyboardNavComponent,
    DocAriaTableComponent,
  ],
  templateUrl: './data-grid-demo.component.html',
  styleUrl: './data-grid-demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DataGridDemoComponent {
  public readonly importCode: string =
    "import { DataGridComponent, DataGridColumnComponent } from 'ui-lib-custom/data-grid'";

  public readonly qualityAudit: ComponentQualityAudit = {
    date: '2026-05-28',
    tier: 1,
    scores: {
      api: 9,
      a11y: 9,
      perf: 9,
      comp: 9,
      theme: 9,
      dx: 9,
      docs: 8,
      polish: 9,
      angular: 9,
      feel: 9,
    },
    apgPattern: { name: 'Grid', url: 'https://www.w3.org/WAI/ARIA/apg/patterns/grid/' },
    competitiveParity: 'pass',
  };

  public readonly layout: Signal<DocPageLayoutComponent | undefined> =
    viewChild(DocPageLayoutComponent);

  public readonly sections: DocSection[] = [
    { id: 'overview', label: 'Overview' },
    { id: 'interactive-demo', label: 'Interactive Demo' },
    { id: 'virtual-scroll', label: 'Virtual Scroll' },
    { id: 'frozen-columns', label: 'Frozen Columns' },
    { id: 'cell-editing', label: 'Cell Editing' },
    { id: 'lazy-load', label: 'Lazy Load (Server-Side)' },
    { id: 'accessibility', label: 'Accessibility' },
    { id: 'css-vars', label: 'CSS Custom Properties' },
    { id: 'api', label: 'API Reference' },
  ];

  public scrollTo(id: string): void {
    this.layout()?.scrollToSection(id);
  }

  // ── Interactive demo config ─────────────────────────────────────────────

  public readonly activeVariant: WritableSignal<DataGridVariant> =
    signal<DataGridVariant>('material');
  public readonly selectionMode: WritableSignal<DataGridSelectionMode> =
    signal<DataGridSelectionMode>('checkbox');
  public readonly editMode: WritableSignal<DataGridEditMode> = signal<DataGridEditMode>(null);
  public readonly stripedRows: WritableSignal<boolean> = signal<boolean>(false);
  public readonly showGridlines: WritableSignal<boolean> = signal<boolean>(false);
  public readonly rowHover: WritableSignal<boolean> = signal<boolean>(true);
  public readonly paginatorEnabled: WritableSignal<boolean> = signal<boolean>(true);
  public readonly selectedRows: WritableSignal<unknown[]> = signal<unknown[]>([]);
  public readonly lastSortEvent: WritableSignal<string> = signal<string>('—');

  public readonly variants: DataGridVariant[] = ['material', 'bootstrap', 'minimal'];
  public readonly selectionModes: Array<{ label: string; value: DataGridSelectionMode }> = [
    { label: 'None', value: null },
    { label: 'Single', value: 'single' },
    { label: 'Multiple', value: 'multiple' },
    { label: 'Checkbox', value: 'checkbox' },
  ];
  public readonly editModes: Array<{ label: string; value: DataGridEditMode }> = [
    { label: 'Off', value: null },
    { label: 'Cell', value: 'cell' },
    { label: 'Row', value: 'row' },
  ];

  public onSortChange(event: DataGridSortEvent): void {
    this.lastSortEvent.set(
      event.order !== 0 ? `${event.field} ${event.order === 1 ? 'ASC' : 'DESC'}` : 'cleared',
    );
  }

  // ── Lazy load demo ───────────────────────────────────────────────────────

  public readonly lazyRows: WritableSignal<Employee[]> = signal<Employee[]>([]);
  public readonly lazyTotal: WritableSignal<number> = signal<number>(0);
  public readonly lazyLoading: WritableSignal<boolean> = signal<boolean>(false);

  public onLazyLoad(event: DataGridLazyLoadEvent): void {
    this.lazyLoading.set(true);
    // Simulate server-side delay
    setTimeout((): void => {
      const allRows: Employee[] = this.generateEmployees(500);
      // Apply sort
      let sorted: Employee[] = [...allRows];
      if (event.sortField) {
        const field: string = event.sortField;
        const order: number = event.sortOrder !== 0 ? event.sortOrder : 1;
        sorted = sorted.sort((a: Employee, b: Employee): number => {
          const aVal: string | number = (a as unknown as Record<string, unknown>)[field] as
            | string
            | number;
          const bVal: string | number = (b as unknown as Record<string, unknown>)[field] as
            | string
            | number;
          return aVal < bVal ? -order : aVal > bVal ? order : 0;
        });
      }
      // Apply pagination
      const start: number = event.first;
      const end: number = start + event.rows;
      this.lazyRows.set(sorted.slice(start, end));
      this.lazyTotal.set(sorted.length);
      this.lazyLoading.set(false);
    }, 300);
  }

  // ── Data ────────────────────────────────────────────────────────────────

  private readonly _allEmployees: Employee[] = this.generateEmployees(12);

  public readonly employees: WritableSignal<Employee[]> = signal<Employee[]>(this._allEmployees);

  /** Large dataset for virtual-scroll demo. */
  public readonly largeDataset: Employee[] = this.generateEmployees(2000);

  public readonly selectedCount: Signal<string> = computed<string>(
    (): string => `${this.selectedRows().length} selected`,
  );

  public formatSalary(salary: number): string {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(salary);
  }

  public statusClass(status: Employee['status']): string {
    switch (status) {
      case 'active':
        return 'badge badge--success';
      case 'on-leave':
        return 'badge badge--warning';
      case 'inactive':
        return 'badge badge--neutral';
    }
  }

  public statusLabel(status: Employee['status']): string {
    switch (status) {
      case 'active':
        return 'Active';
      case 'on-leave':
        return 'On Leave';
      case 'inactive':
        return 'Inactive';
    }
  }

  private generateEmployees(count: number): Employee[] {
    const names: string[] = [
      'Alice Johnson',
      'Bob Martinez',
      'Carol Williams',
      'David Lee',
      'Emma Davis',
      'Frank Chen',
      'Grace Kim',
      'Henry Brown',
      'Isabelle Taylor',
      'James Wilson',
      'Karen Moore',
      'Liam Anderson',
    ];
    const departments: string[] = ['Engineering', 'Product', 'Design', 'Marketing', 'Sales', 'HR'];
    const roles: string[] = ['Manager', 'Senior', 'Mid-level', 'Junior', 'Lead'];
    const locations: string[] = ['New York', 'San Francisco', 'London', 'Berlin', 'Tokyo'];
    const statuses: Employee['status'][] = ['active', 'active', 'active', 'on-leave', 'inactive'];

    return Array.from({ length: count }, (_: unknown, index: number): Employee => {
      const nameIndex: number = index % names.length;
      return {
        id: index + 1,
        name:
          count > names.length
            ? `${names[nameIndex] ?? 'User'} ${Math.floor(index / names.length) + 1}`
            : (names[nameIndex] ?? 'User'),
        department: departments[index % departments.length] ?? 'Engineering',
        role: roles[index % roles.length] ?? 'Mid-level',
        salary: 60000 + (index % 10) * 8000 + Math.floor(index / 10) * 1000,
        joinDate: `202${index % 5}-${String((index % 12) + 1).padStart(2, '0')}-01`,
        status: statuses[index % statuses.length] ?? 'active',
        location: locations[index % locations.length] ?? 'New York',
      };
    });
  }

  // ── Documentation ────────────────────────────────────────────────────────

  public readonly apiRows: ApiPropRow[] = [
    { name: 'value', type: 'unknown[]', default: '[]', description: 'The data array to display.' },
    {
      name: 'dataKey',
      type: 'string | null',
      default: 'null',
      description: 'Property path for unique row identity (used for selection and tracking).',
    },
    {
      name: 'variant',
      type: "'material' | 'bootstrap' | 'minimal'",
      default: "'material'",
      description: 'Design variant token set.',
    },
    {
      name: 'size',
      type: "'sm' | 'md' | 'lg'",
      default: "'md'",
      description: 'Row and cell size density.',
    },
    {
      name: 'selectionMode',
      type: "'single' | 'multiple' | 'checkbox' | 'radio' | null",
      default: 'null',
      description: 'Row selection behaviour.',
    },
    {
      name: 'editMode',
      type: "'cell' | 'row' | null",
      default: 'null',
      description: 'Cell or row editing mode.',
    },
    {
      name: 'paginator',
      type: 'boolean',
      default: 'false',
      description: 'Enables built-in pagination.',
    },
    {
      name: 'rows',
      type: 'number',
      default: '25',
      description: 'Rows per page when paginator is on.',
    },
    {
      name: 'lazy',
      type: 'boolean',
      default: 'false',
      description: 'Delegates sort/filter/page to the consumer via lazyLoad event.',
    },
    {
      name: 'totalRecords',
      type: 'number',
      default: '0',
      description: 'Total server-side record count (required when lazy=true).',
    },
    {
      name: 'virtualScroll',
      type: 'boolean',
      default: 'false',
      description: 'Enables windowed rendering for large datasets.',
    },
    {
      name: 'virtualScrollHeight',
      type: 'string',
      default: "'400px'",
      description: 'Scroll viewport height when virtualScroll is on.',
    },
    {
      name: 'rowHeight',
      type: 'number',
      default: '48',
      description: 'Fixed row height in px (required for correct virtual scroll calculations).',
    },
    {
      name: 'resizableColumns',
      type: 'boolean',
      default: 'false',
      description: 'Allows all columns to be resized by dragging header edges.',
    },
    {
      name: 'multiSortMode',
      type: 'boolean',
      default: 'false',
      description: 'Ctrl+click adds columns to the sort order.',
    },
    {
      name: 'stripedRows',
      type: 'boolean',
      default: 'false',
      description: 'Alternate row shading.',
    },
    {
      name: 'showGridlines',
      type: 'boolean',
      default: 'false',
      description: 'Shows vertical column dividers.',
    },
    {
      name: 'rowHover',
      type: 'boolean',
      default: 'false',
      description: 'Highlights rows on hover.',
    },
    {
      name: 'stickyHeader',
      type: 'boolean',
      default: 'true',
      description: 'Keeps the header row fixed while scrolling.',
    },
  ];

  public readonly keyboardRows: KeyboardNavRow[] = [
    {
      key: 'Arrow keys',
      target: 'any cell',
      action: 'Move focus to the adjacent cell (Up/Down/Left/Right).',
    },
    { key: 'Home', target: 'any cell', action: 'Move focus to the first cell in the row.' },
    { key: 'End', target: 'any cell', action: 'Move focus to the last cell in the row.' },
    {
      key: 'Enter / Space',
      target: 'sortable column header',
      action: 'Toggle sort: ascending → descending → none.',
    },
    {
      key: 'Enter / Space',
      target: 'data row',
      action: 'Toggle row selection (when selectionMode is active).',
    },
    {
      key: 'Enter',
      target: 'editable cell',
      action: 'Open inline cell editor (when editMode="cell").',
    },
    { key: 'Enter', target: 'open editor', action: 'Commit the edited value.' },
    { key: 'Escape', target: 'open editor', action: 'Revert and close the editor.' },
    { key: 'Tab', target: 'open editor', action: 'Commit and move to the next editable cell.' },
  ];

  public readonly ariaRows: readonly AriaRow[] = [
    {
      element: 'Grid wrapper',
      attribute: 'role="grid"',
      value: '—',
      notes: 'Top-level grid landmark for assistive technologies.',
    },
    {
      element: 'Grid wrapper',
      attribute: 'aria-rowcount',
      value: 'total record count',
      notes: 'Tells screen readers the total row count (important for virtual scroll).',
    },
    {
      element: 'Column header',
      attribute: 'role="columnheader"',
      value: '—',
      notes: 'Identifies header cells within the grid.',
    },
    {
      element: 'Column header',
      attribute: 'aria-sort',
      value: '"ascending" | "descending" | "none"',
      notes: 'Reflects the current sort direction on sortable columns.',
    },
    {
      element: 'Data row',
      attribute: 'role="row"',
      value: '—',
      notes: 'Each data row is announced as a grid row.',
    },
    {
      element: 'Data row',
      attribute: 'aria-rowindex',
      value: 'row position (1-based)',
      notes:
        'Provides the absolute row position even in virtual-scroll mode where only a subset of rows is in the DOM.',
    },
    {
      element: 'Data row',
      attribute: 'aria-selected',
      value: '"true" | "false"',
      notes: 'Present when selectionMode is active.',
    },
    {
      element: 'Data cell',
      attribute: 'role="gridcell"',
      value: '—',
      notes: 'Each data cell is a gridcell within its row.',
    },
    {
      element: 'Data cell',
      attribute: 'aria-colindex',
      value: 'column position (1-based)',
      notes: 'Absolute column index including frozen columns.',
    },
  ];

  public readonly cssVarRows: CssVarRow[] = [
    { variable: '--uilib-data-grid-border-color', description: 'Outer border colour.' },
    { variable: '--uilib-data-grid-border-radius', description: 'Outer border radius.' },
    { variable: '--uilib-data-grid-border-width', description: 'Outer border width.' },
    { variable: '--uilib-data-grid-header-bg', description: 'Header background colour.' },
    { variable: '--uilib-data-grid-header-color', description: 'Header text colour.' },
    { variable: '--uilib-data-grid-header-font-weight', description: 'Header font weight.' },
    { variable: '--uilib-data-grid-header-padding-inline', description: 'Header inline padding.' },
    { variable: '--uilib-data-grid-header-padding-block', description: 'Header block padding.' },
    {
      variable: '--uilib-data-grid-header-sort-icon-color',
      description: 'Sort icon colour (inactive).',
    },
    {
      variable: '--uilib-data-grid-header-sort-icon-active-color',
      description: 'Sort icon colour (active).',
    },
    { variable: '--uilib-data-grid-cell-bg', description: 'Cell background colour.' },
    { variable: '--uilib-data-grid-cell-color', description: 'Cell text colour.' },
    { variable: '--uilib-data-grid-cell-padding-inline', description: 'Cell inline padding.' },
    { variable: '--uilib-data-grid-cell-padding-block', description: 'Cell block padding.' },
    { variable: '--uilib-data-grid-cell-border-color', description: 'Row divider colour.' },
    { variable: '--uilib-data-grid-row-hover-bg', description: 'Row hover background.' },
    { variable: '--uilib-data-grid-row-selected-bg', description: 'Selected row background.' },
    { variable: '--uilib-data-grid-row-stripe-bg', description: 'Striped row alternate colour.' },
    {
      variable: '--uilib-data-grid-frozen-shadow-start',
      description: 'Shadow on frozen-start column edge.',
    },
    {
      variable: '--uilib-data-grid-frozen-shadow-end',
      description: 'Shadow on frozen-end column edge.',
    },
    {
      variable: '--uilib-data-grid-resize-handle-color',
      description: 'Resize handle default colour.',
    },
    {
      variable: '--uilib-data-grid-resize-handle-hover-color',
      description: 'Resize handle hover colour.',
    },
    { variable: '--uilib-data-grid-sort-badge-bg', description: 'Multi-sort badge background.' },
    {
      variable: '--uilib-data-grid-sort-badge-color',
      description: 'Multi-sort badge text colour.',
    },
    { variable: '--uilib-data-grid-filter-bg', description: 'Filter input background.' },
    { variable: '--uilib-data-grid-filter-border-color', description: 'Filter input border.' },
    { variable: '--uilib-data-grid-focus-ring', description: 'Cell focus ring style.' },
    { variable: '--uilib-data-grid-font-size', description: 'Base font size (size-sensitive).' },
    { variable: '--uilib-data-grid-row-height', description: 'Row height (size-sensitive).' },
  ];
}
