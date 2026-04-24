import {
  ChangeDetectionStrategy,
  Component,
  computed,
  contentChild,
  contentChildren,
  inject,
  input,
  model,
  output,
  signal,
  TemplateRef,
  ViewEncapsulation,
} from '@angular/core';
import type {
  InputSignal,
  ModelSignal,
  OutputEmitterRef,
  Signal,
  WritableSignal,
} from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import type {
  TableCellContext,
  TableEmptyContext,
  TableExpansionContext,
  TableFilterEvent,
  TableFilterMatchMode,
  TablePageEvent,
  TableRowCollapseEvent,
  TableRowContext,
  TableRowExpandEvent,
  TableRowSelectEvent,
  TableRowUnselectEvent,
  TableSelectionMode,
  TableSize,
  TableSortEvent,
  TableSortMeta,
  TableSortOrder,
  TableVariant,
} from './table.types';
import { TABLE_DEFAULTS } from './table.constants';
import { TableColumnComponent } from './table-column.component';
import {
  TableBodyDirective,
  TableCaptionDirective,
  TableEmptyDirective,
  TableExpansionDirective,
  TableFooterDirective,
  TableHeaderDirective,
} from './table-templates.directive';
import { ThemeConfigService } from 'ui-lib-custom/theme';
import { PaginatorComponent } from 'ui-lib-custom/paginator';
import type { PaginatorPageEvent } from 'ui-lib-custom/paginator';

/** Monotonic counter for unique element IDs. */
let tableIdCounter: number = 0;

/**
 * Table component — displays tabular data with sorting, filtering, selection,
 * pagination, and row expansion.
 *
 * @example
 * ```html
 * <ui-lib-table [value]="products" dataKey="id" selectionMode="checkbox" [(selection)]="selected">
 *   <ui-lib-table-column field="name"  header="Name"  [sortable]="true" />
 *   <ui-lib-table-column field="price" header="Price" [sortable]="true" />
 * </ui-lib-table>
 * ```
 */
@Component({
  selector: 'ui-lib-table',
  standalone: true,
  imports: [NgTemplateOutlet, PaginatorComponent],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    '[class]': 'hostClasses()',
  },
})
export class TableComponent {
  // ---------------------------------------------------------------------------
  // DI
  // ---------------------------------------------------------------------------

  private readonly themeConfig: ThemeConfigService = inject(ThemeConfigService);

  // ---------------------------------------------------------------------------
  // Data inputs
  // ---------------------------------------------------------------------------

  /** The array of row objects to display. */
  public readonly value: InputSignal<unknown[]> = input<unknown[]>([]);

  /**
   * Dot-notation property key that uniquely identifies each row.
   * Required for row expansion, selection equality, and `@for` tracking.
   */
  public readonly dataKey: InputSignal<string | null> = input<string | null>(null);

  // ---------------------------------------------------------------------------
  // Sorting
  // ---------------------------------------------------------------------------

  /**
   * The field currently used for sorting (single-sort mode).
   * Use `[(sortField)]` for two-way binding.
   */
  public readonly sortField: ModelSignal<string | null> = model<string | null>(null);

  /**
   * The current sort order in single-sort mode.
   * Use `[(sortOrder)]` for two-way binding.
   */
  public readonly sortOrder: ModelSignal<TableSortOrder> = model<TableSortOrder>(
    TABLE_DEFAULTS.SORT_ORDER
  );

  /**
   * When `true`, Ctrl+click on a sortable header adds it to the multi-sort stack
   * instead of replacing the active sort.
   */
  public readonly multiSortMode: InputSignal<boolean> = input<boolean>(false);

  /**
   * Current multi-sort stack.
   * Use `[(multiSortMeta)]` for two-way binding.
   */
  public readonly multiSortMeta: ModelSignal<TableSortMeta[]> = model<TableSortMeta[]>([]);

  // ---------------------------------------------------------------------------
  // Filtering
  // ---------------------------------------------------------------------------

  /**
   * Global filter string applied across all columns simultaneously.
   * Use `[(globalFilter)]` for two-way binding.
   */
  public readonly globalFilter: ModelSignal<string> = model<string>('');

  /**
   * Comma-separated list of column fields to include in the global filter.
   * When `null`, all column fields are searched.
   */
  public readonly globalFilterFields: InputSignal<string[] | null> = input<string[] | null>(null);

  /** Match strategy used for global and per-column text filters. */
  public readonly filterMatchMode: InputSignal<TableFilterMatchMode> =
    input<TableFilterMatchMode>('contains');

  /** BCP 47 locale used for locale-sensitive string comparisons during filtering. */
  public readonly filterLocale: InputSignal<string | undefined> = input<string | undefined>(
    undefined
  );

  /** Placeholder displayed inside the global filter input. */
  public readonly globalFilterPlaceholder: InputSignal<string> = input<string>(
    TABLE_DEFAULTS.GLOBAL_FILTER_PLACEHOLDER
  );

  // ---------------------------------------------------------------------------
  // Selection
  // ---------------------------------------------------------------------------

  /**
   * Row selection mode.
   * - `'single'`   — single row selection on click.
   * - `'multiple'` — multi-row selection via Ctrl/Shift + click.
   * - `'checkbox'` — a leading checkbox column handles selection.
   * - `null`       — selection is disabled.
   */
  public readonly selectionMode: InputSignal<TableSelectionMode> = input<TableSelectionMode>(null);

  /**
   * The currently selected row(s).
   * In `'single'` mode this is a single row object or `null`.
   * In `'multiple'` / `'checkbox'` mode this is an array of row objects.
   * Use `[(selection)]` for two-way binding.
   */
  public readonly selection: ModelSignal<unknown> = model<unknown>(null);

  /**
   * When `true`, Ctrl/Meta must be held to toggle multi-row selection.
   * Only relevant in `'multiple'` mode.
   */
  public readonly metaKeySelection: InputSignal<boolean> = input<boolean>(false);

  // ---------------------------------------------------------------------------
  // Row expansion
  // ---------------------------------------------------------------------------

  /**
   * Set of row-key values (resolved via `dataKey`) that are currently expanded.
   * Use `[(expandedRowKeys)]` for two-way binding.
   */
  public readonly expandedRowKeys: ModelSignal<Set<unknown>> = model<Set<unknown>>(new Set());

  // ---------------------------------------------------------------------------
  // Pagination
  // ---------------------------------------------------------------------------

  /** When `true`, renders the built-in paginator below the table. */
  public readonly paginator: InputSignal<boolean> = input<boolean>(false);

  /** Number of rows displayed per page. Use `[(rows)]` for two-way binding. */
  public readonly rows: ModelSignal<number> = model<number>(TABLE_DEFAULTS.ROWS_PER_PAGE);

  /** Zero-based offset of the first visible row. Use `[(first)]` for two-way binding. */
  public readonly first: ModelSignal<number> = model<number>(0);

  /** Options for the rows-per-page selector in the paginator. */
  public readonly rowsPerPageOptions: InputSignal<number[]> = input<number[]>(
    TABLE_DEFAULTS.ROWS_PER_PAGE_OPTIONS
  );

  /** Template string for the current-page report. Supports `{currentPage}` and `{totalPages}`. */
  public readonly currentPageReportTemplate: InputSignal<string> = input<string>(
    '{currentPage} of {totalPages}'
  );

  // ---------------------------------------------------------------------------
  // Layout / appearance
  // ---------------------------------------------------------------------------

  /**
   * Theme variant override. When `null`, the variant is inherited from `ThemeConfigService`.
   */
  public readonly variant: InputSignal<TableVariant | null> = input<TableVariant | null>(null);

  /** Component size token. */
  public readonly size: InputSignal<TableSize> = input<TableSize>('md');

  /** When `true`, alternating rows are rendered with a background tint. */
  public readonly stripedRows: InputSignal<boolean> = input<boolean>(false);

  /** When `true`, the pointer cursor and a hover highlight are shown on rows. */
  public readonly rowHover: InputSignal<boolean> = input<boolean>(false);

  /** When `true`, grid lines are drawn between all cells. */
  public readonly showGridlines: InputSignal<boolean> = input<boolean>(false);

  /** When `true`, the table renders inside a scrollable wrapper. */
  public readonly scrollable: InputSignal<boolean> = input<boolean>(false);

  /**
   * CSS height of the scrollable body viewport, e.g. `'400px'` or `'60vh'`.
   * Only relevant when `scrollable` is `true`.
   */
  public readonly scrollHeight: InputSignal<string | null> = input<string | null>(null);

  /** When `true`, the entire component is non-interactive. */
  public readonly disabled: InputSignal<boolean> = input<boolean>(false);

  /** Message shown in the empty state when no `[uiTableEmpty]` template is provided. */
  public readonly emptyMessage: InputSignal<string> = input<string>(TABLE_DEFAULTS.EMPTY_MESSAGE);

  /** Caption text rendered above the table when no `[uiTableCaption]` template is provided. */
  public readonly caption: InputSignal<string | null> = input<string | null>(null);

  /** Accessible label for the table element. */
  public readonly ariaLabel: InputSignal<string | null> = input<string | null>(null);

  /** Additional CSS class(es) applied to the host element. */
  public readonly styleClass: InputSignal<string | null> = input<string | null>(null);

  // ---------------------------------------------------------------------------
  // Outputs
  // ---------------------------------------------------------------------------

  /** Emitted when the sort order changes. */
  public readonly sorted: OutputEmitterRef<TableSortEvent> = output<TableSortEvent>();

  /** Emitted when a filter value changes. */
  public readonly filtered: OutputEmitterRef<TableFilterEvent> = output<TableFilterEvent>();

  /** Emitted when a row is selected. */
  public readonly rowSelected: OutputEmitterRef<TableRowSelectEvent> =
    output<TableRowSelectEvent>();

  /** Emitted when a row is deselected. */
  public readonly rowUnselected: OutputEmitterRef<TableRowUnselectEvent> =
    output<TableRowUnselectEvent>();

  /** Emitted when a row is expanded. */
  public readonly rowExpanded: OutputEmitterRef<TableRowExpandEvent> =
    output<TableRowExpandEvent>();

  /** Emitted when a row is collapsed. */
  public readonly rowCollapsed: OutputEmitterRef<TableRowCollapseEvent> =
    output<TableRowCollapseEvent>();

  /** Emitted when the page or rows-per-page changes. */
  public readonly pageChanged: OutputEmitterRef<TablePageEvent> = output<TablePageEvent>();

  // ---------------------------------------------------------------------------
  // Column + template queries
  // ---------------------------------------------------------------------------

  /** Column definitions declared as `<ui-lib-table-column>` children. */
  public readonly columns: Signal<readonly TableColumnComponent[]> =
    contentChildren(TableColumnComponent);

  /** Optional caption slot template. */
  public readonly captionTemplate: Signal<TemplateRef<unknown> | undefined> = contentChild(
    TableCaptionDirective,
    { read: TemplateRef }
  );

  /** Optional custom header template (replaces auto-generated headers). */
  public readonly headerTemplate: Signal<TemplateRef<unknown> | undefined> = contentChild(
    TableHeaderDirective,
    { read: TemplateRef }
  );

  /** Optional custom body template (replaces auto-generated rows). */
  public readonly bodyTemplate: Signal<TemplateRef<unknown> | undefined> = contentChild(
    TableBodyDirective,
    { read: TemplateRef }
  );

  /** Optional custom footer template (replaces auto-generated footers). */
  public readonly footerTemplate: Signal<TemplateRef<unknown> | undefined> = contentChild(
    TableFooterDirective,
    { read: TemplateRef }
  );

  /** Optional empty-state template. */
  public readonly emptyTemplate: Signal<TemplateRef<unknown> | undefined> = contentChild(
    TableEmptyDirective,
    { read: TemplateRef }
  );

  /** Optional row-expansion template. */
  public readonly expansionTemplate: Signal<TemplateRef<unknown> | undefined> = contentChild(
    TableExpansionDirective,
    { read: TemplateRef }
  );

  // ---------------------------------------------------------------------------
  // Internal state
  // ---------------------------------------------------------------------------

  /** Unique ID prefix for this instance. */
  public readonly componentId: string = `ui-lib-table-${++tableIdCounter}`;

  /** Per-column filter values, keyed by column field. */
  public readonly columnFilters: WritableSignal<Map<string, string>> = signal<Map<string, string>>(
    new Map()
  );

  /** Index of the last-clicked row for Shift-click range selection. */
  private lastClickedRowIndex: number = -1;

  // ---------------------------------------------------------------------------
  // Computed view state
  // ---------------------------------------------------------------------------

  /** Resolved theme variant (falls back to ThemeConfigService). */
  public readonly resolvedVariant: Signal<TableVariant> = computed<TableVariant>(
    (): TableVariant => this.variant() ?? this.themeConfig.variant()
  );

  /** CSS class string applied to the host element. */
  public readonly hostClasses: Signal<string> = computed<string>((): string => {
    const classes: string[] = [
      'ui-lib-table',
      `ui-lib-table--${this.resolvedVariant()}`,
      `ui-lib-table--${this.size()}`,
    ];
    if (this.stripedRows()) classes.push('ui-lib-table--striped');
    if (this.rowHover()) classes.push('ui-lib-table--hover');
    if (this.showGridlines()) classes.push('ui-lib-table--gridlines');
    if (this.scrollable()) classes.push('ui-lib-table--scrollable');
    if (this.disabled()) classes.push('ui-lib-table--disabled');
    if (this.selectionMode()) classes.push(`ui-lib-table--selection-${this.selectionMode()}`);
    const extra: string | null = this.styleClass();
    if (extra) classes.push(extra);
    return classes.join(' ');
  });

  /**
   * Whether any column has a footer defined (non-empty footer text or footer template).
   * Determines whether the `<tfoot>` section is rendered.
   */
  public readonly hasFooter: Signal<boolean> = computed<boolean>((): boolean => {
    if (this.footerTemplate()) return true;
    return this.columns().some(
      (column: TableColumnComponent): boolean =>
        column.footer() !== '' || column.footerTemplate() !== undefined
    );
  });

  /**
   * Whether any column has a filterable flag set (determines whether the filter row is rendered).
   */
  public readonly hasColumnFilters: Signal<boolean> = computed<boolean>((): boolean =>
    this.columns().some((column: TableColumnComponent): boolean => column.filterable())
  );

  /** Data after applying global filter and per-column filters (before pagination). */
  public readonly filteredValue: Signal<unknown[]> = computed<unknown[]>((): unknown[] => {
    let rows: unknown[] = this.value();
    const globalQuery: string = this.globalFilter().trim();
    if (globalQuery !== '') {
      rows = rows.filter((row: unknown): boolean => this.matchesGlobalFilter(row, globalQuery));
    }
    const columnFilters: Map<string, string> = this.columnFilters();
    if (columnFilters.size > 0) {
      rows = rows.filter((row: unknown): boolean => this.matchesColumnFilters(row, columnFilters));
    }
    return rows;
  });

  /** Data after filtering AND sorting. */
  public readonly processedValue: Signal<unknown[]> = computed<unknown[]>((): unknown[] => {
    const rows: unknown[] = this.filteredValue();
    const field: string | null = this.sortField();
    const order: TableSortOrder = this.sortOrder();
    if (this.multiSortMode() && this.multiSortMeta().length > 0) {
      return this.sortMultiple(rows, this.multiSortMeta());
    }
    if (field && order !== 0) {
      return this.sortSingle(rows, field, order);
    }
    return rows;
  });

  /** Total number of rows after filtering (used by the paginator). */
  public readonly totalRecords: Signal<number> = computed<number>(
    (): number => this.processedValue().length
  );

  /** Rows visible on the current page. */
  public readonly displayedRows: Signal<unknown[]> = computed<unknown[]>((): unknown[] => {
    if (!this.paginator()) return this.processedValue();
    const start: number = this.first();
    return this.processedValue().slice(start, start + this.rows());
  });

  /** Empty-state context passed to the `[uiTableEmpty]` template. */
  public readonly emptyContext: Signal<TableEmptyContext> = computed<TableEmptyContext>(
    (): TableEmptyContext => ({
      filtered: this.value().length > 0 && this.filteredValue().length === 0,
    })
  );

  /** `true` when a "select all" checkbox should appear checked. */
  public readonly allRowsSelected: Signal<boolean> = computed<boolean>((): boolean => {
    const mode: TableSelectionMode = this.selectionMode();
    if (mode !== 'checkbox' && mode !== 'multiple') return false;
    const displayed: unknown[] = this.displayedRows();
    if (displayed.length === 0) return false;
    return displayed.every((row: unknown): boolean => this.isRowSelected(row));
  });

  /** `true` when at least one but not all displayed rows are selected. */
  public readonly someRowsSelected: Signal<boolean> = computed<boolean>((): boolean => {
    if (this.allRowsSelected()) return false;
    const sel: unknown = this.selection();
    const selArray: unknown[] = Array.isArray(sel) ? sel : [];
    return selArray.length > 0;
  });

  // ---------------------------------------------------------------------------
  // Public helpers (called from template)
  // ---------------------------------------------------------------------------

  /**
   * Reads a dot-notation property path from a row object and returns a display string.
   */
  public resolveField(row: unknown, field: string): string {
    if (!field) return '';
    const resolved: unknown = field
      .split('.')
      .reduce((current: unknown, segment: string): unknown => {
        if (current !== null && current !== undefined && typeof current === 'object') {
          return (current as Record<string, unknown>)[segment];
        }
        return undefined;
      }, row);
    if (resolved === null || resolved === undefined) return '';
    return String(resolved);
  }

  /**
   * `@for` tracking function — uses `dataKey` when set, otherwise row identity.
   */
  public trackRow(_index: number, row: unknown): unknown {
    const key: string | null = this.dataKey();
    return key ? this.resolveFieldRaw(row, key) : row;
  }

  /**
   * Returns `true` when `row` is currently selected.
   */
  public isRowSelected(row: unknown): boolean {
    const mode: TableSelectionMode = this.selectionMode();
    if (!mode) return false;
    const sel: unknown = this.selection();
    if (mode === 'single') {
      return this.rowsAreEqual(row, sel);
    }
    const selArray: unknown[] = Array.isArray(sel) ? sel : [];
    return selArray.some((selectedRow: unknown): boolean => this.rowsAreEqual(row, selectedRow));
  }

  /**
   * Returns `true` when the row identified by `row` is currently expanded.
   */
  public isRowExpanded(row: unknown): boolean {
    const key: string | null = this.dataKey();
    if (!key) return false;
    const rowKey: unknown = this.resolveFieldRaw(row, key);
    return this.expandedRowKeys().has(rowKey);
  }

  /**
   * Builds the context object for a body row template.
   */
  public rowContext(row: unknown, index: number): TableRowContext {
    return {
      $implicit: row,
      index,
      expanded: this.isRowExpanded(row),
      selected: this.isRowSelected(row),
    };
  }

  /**
   * Builds the context object for a cell template.
   */
  public cellContext(row: unknown, index: number): TableCellContext {
    return { $implicit: row, index };
  }

  /**
   * Builds the context object for an expansion template.
   */
  public expansionContext(row: unknown, index: number): TableExpansionContext {
    return { $implicit: row, index };
  }

  /**
   * Returns the current sort icon CSS class for a given column field.
   */
  public sortIconClass(field: string): string {
    if (this.multiSortMode()) {
      const meta: TableSortMeta | undefined = this.multiSortMeta().find(
        (m: TableSortMeta): boolean => m.field === field
      );
      if (!meta) return 'pi pi-sort-alt';
      return meta.order === 1 ? 'pi pi-sort-amount-up-alt' : 'pi pi-sort-amount-down-alt';
    }
    if (this.sortField() !== field) return 'pi pi-sort-alt';
    return this.sortOrder() === 1 ? 'pi pi-sort-amount-up-alt' : 'pi pi-sort-amount-down-alt';
  }

  /**
   * Returns the `aria-sort` attribute value for a column header.
   */
  public ariaSortValue(field: string): 'ascending' | 'descending' | 'none' {
    if (this.sortField() !== field) return 'none';
    if (this.sortOrder() === 1) return 'ascending';
    if (this.sortOrder() === -1) return 'descending';
    return 'none';
  }

  /**
   * Returns the multi-sort rank (1-based) for a column, or `null` when not sorted.
   */
  public multiSortRank(field: string): number | null {
    if (!this.multiSortMode()) return null;
    const index: number = this.multiSortMeta().findIndex(
      (meta: TableSortMeta): boolean => meta.field === field
    );
    return index === -1 ? null : index + 1;
  }

  // ---------------------------------------------------------------------------
  // Sort actions
  // ---------------------------------------------------------------------------

  /**
   * Handles a click on a sortable column header.
   */
  public onSortClick(event: MouseEvent, column: TableColumnComponent): void {
    if (!column.sortable() || this.disabled()) return;
    event.preventDefault();
    const field: string = column.sortField() ?? column.field();
    if (this.multiSortMode() && (event.ctrlKey || event.metaKey)) {
      this.applyMultiSort(field);
    } else {
      this.applySingleSort(field);
    }
  }

  private applySingleSort(field: string): void {
    let newOrder: TableSortOrder;
    if (this.sortField() === field) {
      newOrder = this.sortOrder() === 1 ? -1 : this.sortOrder() === -1 ? 0 : 1;
    } else {
      newOrder = 1;
    }
    this.sortField.set(newOrder === 0 ? null : field);
    this.sortOrder.set(newOrder);
    this.multiSortMeta.set([]);
    this.sorted.emit({ field, order: newOrder, multiSortMeta: [] });
  }

  private applyMultiSort(field: string): void {
    const existing: TableSortMeta[] = [...this.multiSortMeta()];
    const index: number = existing.findIndex(
      (meta: TableSortMeta): boolean => meta.field === field
    );
    if (index === -1) {
      existing.push({ field, order: 1 });
    } else {
      const currentEntry: TableSortMeta | undefined = existing[index];
      if (currentEntry && currentEntry.order === 1) {
        existing[index] = { field, order: -1 };
      } else {
        existing.splice(index, 1);
      }
    }
    this.multiSortMeta.set(existing);
    this.sortField.set(null);
    this.sortOrder.set(0);
    this.sorted.emit({ field, order: 0, multiSortMeta: existing });
  }

  // ---------------------------------------------------------------------------
  // Filter actions
  // ---------------------------------------------------------------------------

  /**
   * Handles input on the global filter field.
   */
  public onGlobalFilterInput(event: Event): void {
    const inputElement: HTMLInputElement = event.target as HTMLInputElement;
    this.globalFilter.set(inputElement.value);
    this.first.set(0);
    this.filtered.emit({
      field: null,
      value: inputElement.value,
      filteredValue: this.filteredValue(),
    });
  }

  /**
   * Handles input on a per-column filter field.
   */
  public onColumnFilterInput(event: Event, column: TableColumnComponent): void {
    const inputElement: HTMLInputElement = event.target as HTMLInputElement;
    const field: string = column.filterField() ?? column.field();
    const updatedFilters: Map<string, string> = new Map(this.columnFilters());
    if (inputElement.value === '') {
      updatedFilters.delete(field);
    } else {
      updatedFilters.set(field, inputElement.value);
    }
    this.columnFilters.set(updatedFilters);
    this.first.set(0);
    this.filtered.emit({ field, value: inputElement.value, filteredValue: this.filteredValue() });
  }

  // ---------------------------------------------------------------------------
  // Selection actions
  // ---------------------------------------------------------------------------

  /**
   * Handles a click on a data row (selection toggle).
   */
  public onRowClick(event: MouseEvent | KeyboardEvent, row: unknown, index: number): void {
    const mode: TableSelectionMode = this.selectionMode();
    if (!mode || mode === 'checkbox' || this.disabled()) return;
    if (mode === 'single') {
      this.toggleSingleSelection(event, row, index);
    } else {
      this.toggleMultipleSelection(event, row, index);
    }
    this.lastClickedRowIndex = index;
  }

  /**
   * Handles a checkbox change on a data row.
   */
  public onRowCheckboxChange(event: Event, row: unknown, index: number): void {
    if (this.selectionMode() !== 'checkbox' || this.disabled()) return;
    const checkboxElement: HTMLInputElement = event.target as HTMLInputElement;
    const selected: boolean = checkboxElement.checked;
    const currentSelection: unknown[] = Array.isArray(this.selection())
      ? [...(this.selection() as unknown[])]
      : [];
    if (selected) {
      if (!currentSelection.some((r: unknown): boolean => this.rowsAreEqual(r, row))) {
        currentSelection.push(row);
      }
      this.selection.set(currentSelection);
      this.rowSelected.emit({ originalEvent: event, data: row, index });
    } else {
      const newSelection: unknown[] = currentSelection.filter(
        (r: unknown): boolean => !this.rowsAreEqual(r, row)
      );
      this.selection.set(newSelection);
      this.rowUnselected.emit({ originalEvent: event, data: row, index });
    }
  }

  /**
   * Handles the "select all" checkbox in the column header.
   */
  public onHeaderCheckboxChange(event: Event): void {
    if (this.selectionMode() !== 'checkbox' || this.disabled()) return;
    const checkboxElement: HTMLInputElement = event.target as HTMLInputElement;
    if (checkboxElement.checked) {
      this.selection.set([...this.displayedRows()]);
    } else {
      this.selection.set([]);
    }
  }

  // ---------------------------------------------------------------------------
  // Row expansion
  // ---------------------------------------------------------------------------

  /**
   * Toggles the expanded state of a row.
   */
  public onExpansionToggle(event: Event, row: unknown, index: number): void {
    event.stopPropagation();
    const key: string | null = this.dataKey();
    if (!key) return;
    const rowKey: unknown = this.resolveFieldRaw(row, key);
    const keys: Set<unknown> = new Set(this.expandedRowKeys());
    if (keys.has(rowKey)) {
      keys.delete(rowKey);
      this.expandedRowKeys.set(keys);
      this.rowCollapsed.emit({ originalEvent: event, data: row, index });
    } else {
      keys.add(rowKey);
      this.expandedRowKeys.set(keys);
      this.rowExpanded.emit({ originalEvent: event, data: row, index });
    }
  }

  // ---------------------------------------------------------------------------
  // Paginator
  // ---------------------------------------------------------------------------

  /**
   * Handles page-change events from the embedded `<ui-lib-paginator>`.
   */
  public onPageChange(event: PaginatorPageEvent): void {
    const pageEvent: PaginatorPageEvent = event as PaginatorPageEvent;
    this.first.set(pageEvent.first);
    this.rows.set(pageEvent.rows);
    this.pageChanged.emit({
      first: pageEvent.first,
      rows: pageEvent.rows,
      page: pageEvent.page,
      pageCount: pageEvent.pageCount,
    });
  }

  // ---------------------------------------------------------------------------
  // Private: filtering
  // ---------------------------------------------------------------------------

  private matchesGlobalFilter(row: unknown, query: string): boolean {
    const normalizedQuery: string = query.trim().toLocaleLowerCase(this.filterLocale());
    const fields: string[] | null = this.globalFilterFields();
    const searchFields: string[] =
      fields ?? this.columns().map((column: TableColumnComponent): string => column.field());
    return searchFields.some((field: string): boolean => {
      const cellValue: string = this.resolveField(row, field).toLocaleLowerCase(
        this.filterLocale()
      );
      return this.matchesString(cellValue, normalizedQuery);
    });
  }

  private matchesColumnFilters(row: unknown, filters: Map<string, string>): boolean {
    for (const [field, query] of filters) {
      const cellValue: string = this.resolveField(row, field).toLocaleLowerCase(
        this.filterLocale()
      );
      const normalizedQuery: string = query.trim().toLocaleLowerCase(this.filterLocale());
      if (!this.matchesString(cellValue, normalizedQuery)) return false;
    }
    return true;
  }

  private matchesString(value: string, query: string): boolean {
    switch (this.filterMatchMode()) {
      case 'startsWith':
        return value.startsWith(query);
      case 'endsWith':
        return value.endsWith(query);
      case 'equals':
        return value === query;
      case 'contains':
      default:
        return value.includes(query);
    }
  }

  // ---------------------------------------------------------------------------
  // Private: sorting
  // ---------------------------------------------------------------------------

  private sortSingle(rows: unknown[], field: string, order: TableSortOrder): unknown[] {
    return [...rows].sort((a: unknown, b: unknown): number => {
      const aValue: string = this.resolveField(a, field);
      const bValue: string = this.resolveField(b, field);
      return this.compareValues(aValue, bValue) * order;
    });
  }

  private sortMultiple(rows: unknown[], meta: TableSortMeta[]): unknown[] {
    return [...rows].sort((a: unknown, b: unknown): number => {
      for (const { field, order } of meta) {
        const aValue: string = this.resolveField(a, field);
        const bValue: string = this.resolveField(b, field);
        const result: number = this.compareValues(aValue, bValue) * order;
        if (result !== 0) return result;
      }
      return 0;
    });
  }

  private compareValues(a: string, b: string): number {
    const aNum: number = parseFloat(a);
    const bNum: number = parseFloat(b);
    if (!isNaN(aNum) && !isNaN(bNum)) {
      return aNum < bNum ? -1 : aNum > bNum ? 1 : 0;
    }
    return a.localeCompare(b, undefined, { sensitivity: 'base' });
  }

  // ---------------------------------------------------------------------------
  // Private: selection helpers
  // ---------------------------------------------------------------------------

  private toggleSingleSelection(
    event: MouseEvent | KeyboardEvent,
    row: unknown,
    index: number
  ): void {
    if (this.isRowSelected(row)) {
      this.selection.set(null);
      this.rowUnselected.emit({ originalEvent: event, data: row, index });
    } else {
      this.selection.set(row);
      this.rowSelected.emit({ originalEvent: event, data: row, index });
    }
  }

  private toggleMultipleSelection(
    event: MouseEvent | KeyboardEvent,
    row: unknown,
    index: number
  ): void {
    const currentSelection: unknown[] = Array.isArray(this.selection())
      ? [...(this.selection() as unknown[])]
      : [];

    if (event.shiftKey && this.lastClickedRowIndex !== -1) {
      this.applyShiftSelection(event, row, index, currentSelection);
      return;
    }

    const withMeta: boolean = this.metaKeySelection() && (event.ctrlKey || event.metaKey);
    if (this.isRowSelected(row)) {
      if (!this.metaKeySelection() || withMeta) {
        const newSelection: unknown[] = currentSelection.filter(
          (r: unknown): boolean => !this.rowsAreEqual(r, row)
        );
        this.selection.set(newSelection);
        this.rowUnselected.emit({ originalEvent: event, data: row, index });
      }
    } else {
      if (!this.metaKeySelection() || withMeta) {
        currentSelection.push(row);
        this.selection.set(currentSelection);
        this.rowSelected.emit({ originalEvent: event, data: row, index });
      } else {
        this.selection.set([row]);
        this.rowSelected.emit({ originalEvent: event, data: row, index });
      }
    }
  }

  private applyShiftSelection(
    event: MouseEvent | KeyboardEvent,
    row: unknown,
    index: number,
    currentSelection: unknown[]
  ): void {
    const displayed: unknown[] = this.displayedRows();
    const start: number = Math.min(this.lastClickedRowIndex, index);
    const end: number = Math.max(this.lastClickedRowIndex, index);
    const rangeRows: unknown[] = displayed.slice(start, end + 1);
    const merged: unknown[] = [...currentSelection];
    for (const rangeRow of rangeRows) {
      if (!merged.some((r: unknown): boolean => this.rowsAreEqual(r, rangeRow))) {
        merged.push(rangeRow);
      }
    }
    this.selection.set(merged);
    this.rowSelected.emit({ originalEvent: event, data: row, index });
  }

  private rowsAreEqual(a: unknown, b: unknown): boolean {
    const key: string | null = this.dataKey();
    if (key) {
      return this.resolveFieldRaw(a, key) === this.resolveFieldRaw(b, key);
    }
    return a === b;
  }

  // ---------------------------------------------------------------------------
  // Private: field resolution
  // ---------------------------------------------------------------------------

  private resolveFieldRaw(row: unknown, field: string): unknown {
    return field.split('.').reduce((current: unknown, segment: string): unknown => {
      if (current !== null && current !== undefined && typeof current === 'object') {
        return (current as Record<string, unknown>)[segment];
      }
      return undefined;
    }, row);
  }
}
