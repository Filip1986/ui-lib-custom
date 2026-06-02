import { NgClass, NgStyle, NgTemplateOutlet } from '@angular/common';
import type {
  AfterViewInit,
  InputSignal,
  ModelSignal,
  OnInit,
  OutputEmitterRef,
  Signal,
  WritableSignal,
} from '@angular/core';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  contentChildren,
  DestroyRef,
  ElementRef,
  inject,
  input,
  model,
  output,
  signal,
  TemplateRef,
  viewChild,
  ViewEncapsulation,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { fromEvent } from 'rxjs';

import { UiLibI18nService } from 'ui-lib-custom/i18n';
import type { PaginatorPageEvent } from 'ui-lib-custom/paginator';
import { PaginatorComponent } from 'ui-lib-custom/paginator';
import { ThemeConfigService } from 'ui-lib-custom/theme';

import { DATA_GRID_DEFAULTS } from './data-grid.constants';
import type {
  DataGridCellContext,
  DataGridCellEditCancelEvent,
  DataGridCellEditCompleteEvent,
  DataGridCellEditInitEvent,
  DataGridColumnResizeEvent,
  DataGridEditMode,
  DataGridEditorContext,
  DataGridEmptyContext,
  DataGridFilterEvent,
  DataGridFilterMatchMode,
  DataGridLazyLoadEvent,
  DataGridPageEvent,
  DataGridResizeMode,
  DataGridRowContext,
  DataGridRowSelectEvent,
  DataGridRowUnselectEvent,
  DataGridSelectionMode,
  DataGridSize,
  DataGridSortEvent,
  DataGridSortMeta,
  DataGridSortOrder,
  DataGridVariant,
} from './data-grid.types';
import { DataGridColumnComponent } from './data-grid-column.component';

/** Monotonic id counter. */
let nextDataGridId: number = 0;

/**
 * DataGrid component — high-performance grid with virtual scroll, column
 * pinning, column resizing, inline cell editing, and server-side lazy loading.
 *
 * @example
 * ```html
 * <ui-lib-data-grid [value]="rows" dataKey="id" [virtualScroll]="true" scrollHeight="480px">
 *   <ui-lib-data-grid-column field="name"  header="Name"  [sortable]="true" frozen="start" />
 *   <ui-lib-data-grid-column field="email" header="Email" [filterable]="true" />
 *   <ui-lib-data-grid-column field="role"  header="Role"  frozen="end" />
 * </ui-lib-data-grid>
 * ```
 */
@Component({
  selector: 'ui-lib-data-grid',
  standalone: true,
  imports: [NgClass, NgStyle, NgTemplateOutlet, PaginatorComponent],
  templateUrl: './data-grid.component.html',
  styleUrl: './data-grid.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    '[class]': 'hostClasses()',
    '[attr.id]': 'gridId()',
  },
})
export class DataGridComponent implements OnInit, AfterViewInit {
  // ---------------------------------------------------------------------------
  // DI
  // ---------------------------------------------------------------------------

  private readonly themeConfig: ThemeConfigService = inject(ThemeConfigService);
  protected readonly i18n: UiLibI18nService = inject(UiLibI18nService);
  private readonly hostElement: ElementRef<HTMLElement> =
    inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly destroyRef: DestroyRef = inject(DestroyRef);

  // ---------------------------------------------------------------------------
  // Data inputs
  // ---------------------------------------------------------------------------

  /** Array of row objects to display. */
  public readonly value: InputSignal<unknown[]> = input<unknown[]>([]);

  /**
   * Total number of records for server-side pagination.
   * Only required when `lazy` is `true`.
   */
  public readonly totalRecords: InputSignal<number> = input<number>(0);

  /**
   * Dot-notation property key that uniquely identifies each row.
   * Required for selection equality and `@for` tracking.
   */
  public readonly dataKey: InputSignal<string | null> = input<string | null>(null);

  // ---------------------------------------------------------------------------
  // Sorting
  // ---------------------------------------------------------------------------

  /** Field currently used for sorting. Use `[(sortField)]` for two-way binding. */
  public readonly sortField: ModelSignal<string | null> = model<string | null>(null);

  /** Current sort order. Use `[(sortOrder)]` for two-way binding. */
  public readonly sortOrder: ModelSignal<DataGridSortOrder> = model<DataGridSortOrder>(
    DATA_GRID_DEFAULTS.SORT_ORDER,
  );

  /** When `true`, Ctrl+click adds a column to the multi-sort stack. */
  public readonly multiSortMode: InputSignal<boolean> = input<boolean>(false);

  /** Current multi-sort stack. Use `[(multiSortMeta)]` for two-way binding. */
  public readonly multiSortMeta: ModelSignal<DataGridSortMeta[]> = model<DataGridSortMeta[]>([]);

  // ---------------------------------------------------------------------------
  // Filtering
  // ---------------------------------------------------------------------------

  /** Global filter string applied across all columns. Use `[(globalFilter)]` for two-way binding. */
  public readonly globalFilter: ModelSignal<string> = model<string>('');

  /** Specific column fields to include in the global filter. When `null`, all fields are searched. */
  public readonly globalFilterFields: InputSignal<string[] | null> = input<string[] | null>(null);

  /** Match strategy for text filters. */
  public readonly filterMatchMode: InputSignal<DataGridFilterMatchMode> =
    input<DataGridFilterMatchMode>(DATA_GRID_DEFAULTS.FILTER_MATCH_MODE);

  /** BCP 47 locale for locale-sensitive string comparisons. */
  public readonly filterLocale: InputSignal<string | undefined> = input<string | undefined>(
    undefined,
  );

  // ---------------------------------------------------------------------------
  // Selection
  // ---------------------------------------------------------------------------

  /** Row selection mode. */
  public readonly selectionMode: InputSignal<DataGridSelectionMode> = input<DataGridSelectionMode>(
    DATA_GRID_DEFAULTS.SELECTION_MODE,
  );

  /** Currently selected row(s). Use `[(selection)]` for two-way binding. */
  public readonly selection: ModelSignal<unknown> = model<unknown>(null);

  /** When `true`, Ctrl/Meta must be held to toggle multi-row selection. */
  public readonly metaKeySelection: InputSignal<boolean> = input<boolean>(false);

  // ---------------------------------------------------------------------------
  // Pagination
  // ---------------------------------------------------------------------------

  /** When `true`, renders the built-in paginator below the grid. */
  public readonly paginator: InputSignal<boolean> = input<boolean>(false);

  /** Number of rows displayed per page. Use `[(rows)]` for two-way binding. */
  public readonly rows: ModelSignal<number> = model<number>(DATA_GRID_DEFAULTS.ROWS_PER_PAGE);

  /** Zero-based offset of the first visible row. Use `[(first)]` for two-way binding. */
  public readonly first: ModelSignal<number> = model<number>(0);

  /** Options for the rows-per-page selector. */
  public readonly rowsPerPageOptions: InputSignal<number[]> = input<number[]>([
    ...DATA_GRID_DEFAULTS.ROWS_PER_PAGE_OPTIONS,
  ]);

  // ---------------------------------------------------------------------------
  // Virtual scroll
  // ---------------------------------------------------------------------------

  /** When `true`, only visible rows are rendered (requires a fixed `scrollHeight`). */
  public readonly virtualScroll: InputSignal<boolean> = input<boolean>(false);

  /**
   * Fixed row height in pixels used for virtual scroll calculations.
   * All data rows must have this exact height when `virtualScroll` is `true`.
   */
  public readonly rowHeight: InputSignal<number> = input<number>(DATA_GRID_DEFAULTS.ROW_HEIGHT);

  // ---------------------------------------------------------------------------
  // Lazy / server-side
  // ---------------------------------------------------------------------------

  /**
   * When `true`, the grid operates in server-side mode.
   * The `lazyLoad` output fires whenever sort, filter, or pagination changes —
   * the consumer must update `[value]` and `[totalRecords]` accordingly.
   */
  public readonly lazy: InputSignal<boolean> = input<boolean>(false);

  // ---------------------------------------------------------------------------
  // Column features
  // ---------------------------------------------------------------------------

  /** When `true`, all columns are resizable via drag unless overridden per column. */
  public readonly resizableColumns: InputSignal<boolean> = input<boolean>(false);

  /** Resize mode applied when `resizableColumns` is `true`. */
  public readonly columnResizeMode: InputSignal<DataGridResizeMode> = input<DataGridResizeMode>(
    DATA_GRID_DEFAULTS.RESIZE_MODE,
  );

  /** When `true`, columns can be reordered by dragging their headers. */
  public readonly reorderableColumns: InputSignal<boolean> = input<boolean>(false);

  // ---------------------------------------------------------------------------
  // Cell editing
  // ---------------------------------------------------------------------------

  /** Cell edit mode. When `null`, editing is disabled. */
  public readonly editMode: InputSignal<DataGridEditMode> = input<DataGridEditMode>(
    DATA_GRID_DEFAULTS.EDIT_MODE,
  );

  // ---------------------------------------------------------------------------
  // Appearance
  // ---------------------------------------------------------------------------

  /** Explicit CSS height for the scrollable body viewport, e.g. `'400px'`. */
  public readonly scrollHeight: InputSignal<string | null> = input<string | null>(null);

  /** Design variant override; inherits from `ThemeConfigService` when `null`. */
  public readonly variant: InputSignal<DataGridVariant | null> = input<DataGridVariant | null>(
    null,
  );

  /** Component size token. */
  public readonly size: InputSignal<DataGridSize> = input<DataGridSize>(DATA_GRID_DEFAULTS.SIZE);

  /** When `true`, alternating rows receive a background tint. */
  public readonly stripedRows: InputSignal<boolean> = input<boolean>(false);

  /** When `true`, the pointer cursor and hover highlight are shown on rows. */
  public readonly rowHover: InputSignal<boolean> = input<boolean>(false);

  /** When `true`, grid lines are drawn between all cells. */
  public readonly showGridlines: InputSignal<boolean> = input<boolean>(false);

  /** When `true`, the header row is always visible during vertical scroll. */
  public readonly stickyHeader: InputSignal<boolean> = input<boolean>(true);

  /** Message shown in the empty state when no `[uiDataGridEmpty]` template is provided. */
  public readonly emptyMessage: InputSignal<string> = input<string>(
    DATA_GRID_DEFAULTS.EMPTY_MESSAGE,
  );

  /** Caption text rendered above the grid. */
  public readonly caption: InputSignal<string | null> = input<string | null>(null);

  /** Accessible label for the grid element. */
  public readonly ariaLabel: InputSignal<string | null> = input<string | null>(null);

  /** Additional CSS class(es) applied to the host element. */
  public readonly styleClass: InputSignal<string | null> = input<string | null>(null);

  // ---------------------------------------------------------------------------
  // ID
  // ---------------------------------------------------------------------------

  /** Optional explicit id override for the grid container. */
  public readonly id: InputSignal<string | null> = input<string | null>(null);

  // ---------------------------------------------------------------------------
  // Outputs
  // ---------------------------------------------------------------------------

  /** Emitted when the sort order changes. */
  public readonly sorted: OutputEmitterRef<DataGridSortEvent> = output<DataGridSortEvent>();

  /** Emitted when a column or global filter changes. */
  public readonly filtered: OutputEmitterRef<DataGridFilterEvent> = output<DataGridFilterEvent>();

  /** Emitted when a row is selected. */
  public readonly rowSelected: OutputEmitterRef<DataGridRowSelectEvent> =
    output<DataGridRowSelectEvent>();

  /** Emitted when a row is deselected. */
  public readonly rowUnselected: OutputEmitterRef<DataGridRowUnselectEvent> =
    output<DataGridRowUnselectEvent>();

  /** Emitted when the page or rows-per-page changes. */
  public readonly paged: OutputEmitterRef<DataGridPageEvent> = output<DataGridPageEvent>();

  /** Emitted in lazy mode when sort, filter, or pagination changes. */
  public readonly lazyLoad: OutputEmitterRef<DataGridLazyLoadEvent> =
    output<DataGridLazyLoadEvent>();

  /** Emitted when a cell edit is initiated. */
  public readonly cellEditInit: OutputEmitterRef<DataGridCellEditInitEvent> =
    output<DataGridCellEditInitEvent>();

  /** Emitted when a cell edit is committed. */
  public readonly cellEditComplete: OutputEmitterRef<DataGridCellEditCompleteEvent> =
    output<DataGridCellEditCompleteEvent>();

  /** Emitted when a cell edit is cancelled. */
  public readonly cellEditCancel: OutputEmitterRef<DataGridCellEditCancelEvent> =
    output<DataGridCellEditCancelEvent>();

  /** Emitted when a column is resized. */
  public readonly columnResize: OutputEmitterRef<DataGridColumnResizeEvent> =
    output<DataGridColumnResizeEvent>();

  // ---------------------------------------------------------------------------
  // Content children
  // ---------------------------------------------------------------------------

  /** All column definitions provided as direct children. */
  protected readonly columns: Signal<readonly DataGridColumnComponent[]> =
    contentChildren(DataGridColumnComponent);

  // ---------------------------------------------------------------------------
  // View children
  // ---------------------------------------------------------------------------

  /** The scrollable body viewport element. */
  private readonly bodyViewport: Signal<ElementRef<HTMLElement> | undefined> =
    viewChild<ElementRef<HTMLElement>>('bodyViewport');

  // ---------------------------------------------------------------------------
  // Internal state
  // ---------------------------------------------------------------------------

  private readonly generatedGridId: string = `ui-lib-data-grid-${nextDataGridId++}`;

  /** Per-column filter values: field → current filter string. */
  protected readonly columnFilters: WritableSignal<Record<string, string>> = signal<
    Record<string, string>
  >({});

  /** Key/index of the cell currently being edited: `field:rowIndex` or `null`. */
  protected readonly editingCell: WritableSignal<string | null> = signal<string | null>(null);

  /** Snapshot of the value before editing started (for Escape revert). */
  private editingCellOriginalValue: unknown = undefined;

  /** Current scroll position of the viewport (for virtual scroll). */
  protected readonly scrollTop: WritableSignal<number> = signal<number>(0);

  /** Pixel widths for each column, keyed by field. */
  private readonly columnWidths: WritableSignal<Record<string, number>> = signal<
    Record<string, number>
  >({});

  // ---------------------------------------------------------------------------
  // Computed: resolved ID and variant
  // ---------------------------------------------------------------------------

  protected readonly gridId: Signal<string> = computed<string>(
    (): string => this.id() ?? this.generatedGridId,
  );

  protected readonly effectiveVariant: Signal<DataGridVariant> = computed<DataGridVariant>(
    (): DataGridVariant => this.variant() ?? this.themeConfig.variant(),
  );

  // ---------------------------------------------------------------------------
  // Computed: data pipeline
  // ---------------------------------------------------------------------------

  /**
   * Effective data source: when `lazy` is `true` the consumer owns filtering/sorting/paging,
   * so we render `value` as-is. In client mode we apply filters → sort → paginate.
   */
  protected readonly processedRows: Signal<unknown[]> = computed<unknown[]>((): unknown[] => {
    if (this.lazy()) {
      return this.value();
    }

    let rows: unknown[] = this.value();

    // 1. Column filters
    const colFilters: Record<string, string> = this.columnFilters();
    const matchMode: DataGridFilterMatchMode = this.filterMatchMode();
    const locale: string | undefined = this.filterLocale();

    for (const [field, filterValue] of Object.entries(colFilters)) {
      if (filterValue === '') continue;
      const lowerFilter: string = filterValue.toLowerCase();
      rows = rows.filter((row: unknown): boolean => {
        const cellValue: string = String(this.getFieldValue(row, field) ?? '').toLowerCase();
        return this.matchesFilter(cellValue, lowerFilter, matchMode, locale);
      });
    }

    // 2. Global filter
    const global: string = this.globalFilter();
    if (global !== '') {
      const lowerGlobal: string = global.toLowerCase();
      const fields: string[] =
        this.globalFilterFields() ??
        this.columns()
          .map((col: DataGridColumnComponent): string => col.field())
          .filter((f: string): boolean => f !== '');
      rows = rows.filter((row: unknown): boolean =>
        fields.some((field: string): boolean => {
          const cellValue: string = String(this.getFieldValue(row, field) ?? '').toLowerCase();
          return this.matchesFilter(cellValue, lowerGlobal, matchMode, locale);
        }),
      );
    }

    // 3. Sort
    const sortField: string | null = this.sortField();
    const sortOrder: DataGridSortOrder = this.sortOrder();
    if (!this.multiSortMode() && sortField !== null && sortOrder !== 0) {
      rows = [...rows].sort((a: unknown, b: unknown): number => {
        const aVal: unknown = this.getFieldValue(a, sortField);
        const bVal: unknown = this.getFieldValue(b, sortField);
        return this.compareValues(aVal, bVal) * sortOrder;
      });
    } else if (this.multiSortMode() && this.multiSortMeta().length > 0) {
      rows = [...rows].sort((a: unknown, b: unknown): number => {
        for (const meta of this.multiSortMeta()) {
          const aVal: unknown = this.getFieldValue(a, meta.field);
          const bVal: unknown = this.getFieldValue(b, meta.field);
          const cmp: number = this.compareValues(aVal, bVal) * meta.order;
          if (cmp !== 0) return cmp;
        }
        return 0;
      });
    }

    return rows;
  });

  /** Total count used for pagination: server-supplied or filtered-client count. */
  protected readonly effectiveTotalRecords: Signal<number> = computed<number>((): number =>
    this.lazy() ? this.totalRecords() : this.processedRows().length,
  );

  /** Rows visible on the current page (after pagination). */
  protected readonly pageRows: Signal<unknown[]> = computed<unknown[]>((): unknown[] => {
    if (!this.paginator()) return this.processedRows();
    const start: number = this.first();
    return this.processedRows().slice(start, start + this.rows());
  });

  /** Total number of pages. */
  protected readonly pageCount: Signal<number> = computed<number>((): number => {
    const total: number = this.effectiveTotalRecords();
    const perPage: number = this.rows();
    return perPage > 0 ? Math.ceil(total / perPage) : 0;
  });

  // ---------------------------------------------------------------------------
  // Computed: virtual scroll
  // ---------------------------------------------------------------------------

  /**
   * First row index to render in virtual scroll mode.
   * Includes a buffer above the visible viewport.
   */
  protected readonly virtualStart: Signal<number> = computed<number>((): number => {
    if (!this.virtualScroll()) return 0;
    const raw: number = Math.floor(this.scrollTop() / this.rowHeight());
    return Math.max(0, raw - DATA_GRID_DEFAULTS.VIRTUAL_SCROLL_BUFFER);
  });

  /**
   * Last row index (exclusive) to render in virtual scroll mode.
   * Includes a buffer below the visible viewport.
   */
  protected readonly virtualEnd: Signal<number> = computed<number>((): number => {
    if (!this.virtualScroll()) return this.pageRows().length;
    const viewportHeight: number = this.resolveScrollHeight();
    const visibleCount: number = Math.ceil(viewportHeight / this.rowHeight());
    const raw: number = Math.floor(this.scrollTop() / this.rowHeight()) + visibleCount;
    return Math.min(this.pageRows().length, raw + DATA_GRID_DEFAULTS.VIRTUAL_SCROLL_BUFFER);
  });

  /** Rows that should actually be in the DOM in virtual scroll mode. */
  protected readonly virtualRows: Signal<unknown[]> = computed<unknown[]>((): unknown[] => {
    if (!this.virtualScroll()) return this.pageRows();
    return this.pageRows().slice(this.virtualStart(), this.virtualEnd());
  });

  /** Pixel offset (padding-block-start) applied to the virtual rows container. */
  protected readonly virtualOffsetTop: Signal<number> = computed<number>(
    (): number => this.virtualStart() * this.rowHeight(),
  );

  /** Total height of all page rows — the spacer height for correct scrollbar sizing. */
  protected readonly virtualTotalHeight: Signal<number> = computed<number>(
    (): number => this.pageRows().length * this.rowHeight(),
  );

  // ---------------------------------------------------------------------------
  // Computed: column layout
  // ---------------------------------------------------------------------------

  /** Columns frozen to the start edge, in declaration order. */
  protected readonly frozenStartColumns: Signal<readonly DataGridColumnComponent[]> = computed<
    readonly DataGridColumnComponent[]
  >((): readonly DataGridColumnComponent[] =>
    this.columns().filter((col: DataGridColumnComponent): boolean => col.frozen() === 'start'),
  );

  /** Columns frozen to the end edge, in declaration order. */
  protected readonly frozenEndColumns: Signal<readonly DataGridColumnComponent[]> = computed<
    readonly DataGridColumnComponent[]
  >((): readonly DataGridColumnComponent[] =>
    this.columns().filter((col: DataGridColumnComponent): boolean => col.frozen() === 'end'),
  );

  /** Scrollable (non-frozen) columns. */
  protected readonly scrollableColumns: Signal<readonly DataGridColumnComponent[]> = computed<
    readonly DataGridColumnComponent[]
  >((): readonly DataGridColumnComponent[] =>
    this.columns().filter((col: DataGridColumnComponent): boolean => col.frozen() === false),
  );

  /** `true` when any column has a footer. */
  protected readonly hasFooter: Signal<boolean> = computed<boolean>((): boolean =>
    this.columns().some(
      (col: DataGridColumnComponent): boolean =>
        col.footer() !== '' || col.footerTemplate() !== undefined,
    ),
  );

  /** `true` when any column has a filter. */
  protected readonly hasColumnFilters: Signal<boolean> = computed<boolean>((): boolean =>
    this.columns().some((col: DataGridColumnComponent): boolean => col.filterable()),
  );

  /** `true` when no rows pass the current filter/data criteria. */
  protected readonly isEmpty: Signal<boolean> = computed<boolean>(
    (): boolean => this.pageRows().length === 0,
  );

  // ---------------------------------------------------------------------------
  // Computed: host classes
  // ---------------------------------------------------------------------------

  protected readonly hostClasses: Signal<string> = computed<string>((): string => {
    const parts: string[] = [
      'ui-lib-data-grid',
      `ui-lib-data-grid--variant-${this.effectiveVariant()}`,
      `ui-lib-data-grid--size-${this.size()}`,
    ];

    if (this.stripedRows()) parts.push('ui-lib-data-grid--striped');
    if (this.rowHover()) parts.push('ui-lib-data-grid--row-hover');
    if (this.showGridlines()) parts.push('ui-lib-data-grid--gridlines');
    if (this.stickyHeader()) parts.push('ui-lib-data-grid--sticky-header');
    if (this.resizableColumns()) parts.push('ui-lib-data-grid--resizable');
    if (this.virtualScroll()) parts.push('ui-lib-data-grid--virtual-scroll');
    if (this.scrollHeight() !== null) parts.push('ui-lib-data-grid--scrollable');
    if (this.frozenStartColumns().length > 0 || this.frozenEndColumns().length > 0) {
      parts.push('ui-lib-data-grid--has-frozen');
    }

    const extra: string | null = this.styleClass();
    if (extra !== null) parts.push(extra);

    return parts.join(' ');
  });

  // ---------------------------------------------------------------------------
  // Lifecycle
  // ---------------------------------------------------------------------------

  public ngOnInit(): void {
    this.setupScrollListener();
  }

  private setupScrollListener(): void {
    const viewport: ElementRef<HTMLElement> | undefined = this.bodyViewport();
    if (!viewport || !this.virtualScroll()) return;

    fromEvent<Event>(viewport.nativeElement, 'scroll')
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((event: Event): void => {
        const target: HTMLElement = event.target as HTMLElement;
        this.scrollTop.set(target.scrollTop);
      });
  }

  // ---------------------------------------------------------------------------
  // Template helpers — public for template access
  // ---------------------------------------------------------------------------

  /** Resolve a dot-notation field path against a row object. */
  protected getFieldValue(row: unknown, field: string): unknown {
    if (row === null || row === undefined || field === '') return undefined;
    return field.split('.').reduce((obj: unknown, key: string): unknown => {
      if (obj === null || obj === undefined) return undefined;
      return (obj as Record<string, unknown>)[key];
    }, row);
  }

  /** Read the display value for a cell, falling back to `getFieldValue`. */
  protected getCellValue(row: unknown, field: string): string {
    const value: unknown = this.getFieldValue(row, field);
    return value === null || value === undefined ? '' : String(value);
  }

  /** Return the unique key value for a row (for `@for` tracking). */
  protected getRowKey(row: unknown, index: number): unknown {
    const key: string | null = this.dataKey();
    if (key === null) return index;
    return this.getFieldValue(row, key) ?? index;
  }

  /** Whether a given row is currently selected. */
  protected isRowSelected(row: unknown): boolean {
    const mode: DataGridSelectionMode = this.selectionMode();
    if (mode === null) return false;
    const sel: unknown = this.selection();
    if (mode === 'single') return this.rowsEqual(row, sel);
    if (Array.isArray(sel)) return sel.some((s: unknown): boolean => this.rowsEqual(row, s));
    return false;
  }

  /** Whether all visible rows are selected (for the header checkbox). */
  protected areAllRowsSelected(): boolean {
    const rows: unknown[] = this.pageRows();
    if (rows.length === 0) return false;
    return rows.every((row: unknown): boolean => this.isRowSelected(row));
  }

  /** Whether the column is currently resizable (grid-level or column-level). */
  protected isColumnResizable(col: DataGridColumnComponent): boolean {
    const colResizable: boolean | null = col.resizable();
    return colResizable === null ? this.resizableColumns() : colResizable;
  }

  /** Inline style for the scrollable body viewport. */
  protected get bodyStyle(): Record<string, string> {
    const height: string | null = this.scrollHeight();
    return height !== null ? { 'max-block-size': height, 'overflow-y': 'auto' } : {};
  }

  /** Context passed to body cell templates. */
  protected cellContext(row: unknown, index: number, field: string): DataGridCellContext {
    return {
      $implicit: row,
      index,
      selected: this.isRowSelected(row),
      editing: this.editingCell() === `${field}:${index}`,
    };
  }

  /** Context passed to editor cell templates. */
  protected editorContext(row: unknown, index: number, field: string): DataGridEditorContext {
    return { $implicit: row, index, field };
  }

  /** Context passed to body row templates. */
  protected rowContext(row: unknown, index: number): DataGridRowContext {
    return { $implicit: row, index, selected: this.isRowSelected(row) };
  }

  /** Context passed to the empty-state template. */
  protected emptyContext(): DataGridEmptyContext {
    const hasFilter: boolean =
      this.globalFilter() !== '' ||
      Object.values(this.columnFilters()).some((v: string): boolean => v !== '');
    return { filtered: hasFilter };
  }

  /** Sticky inline-start offset for a start-frozen column. */
  protected frozenStartOffset(col: DataGridColumnComponent): string {
    const frozenCols: readonly DataGridColumnComponent[] = this.frozenStartColumns();
    const idx: number = frozenCols.indexOf(col);
    if (idx <= 0) return '0';
    const offset: number = frozenCols
      .slice(0, idx)
      .reduce((sum: number, c: DataGridColumnComponent): number => {
        return sum + this.resolveColumnWidth(c);
      }, 0);
    return `${offset}px`;
  }

  /** Sticky inline-end offset for an end-frozen column. */
  protected frozenEndOffset(col: DataGridColumnComponent): string {
    const frozenCols: readonly DataGridColumnComponent[] = this.frozenEndColumns();
    const idx: number = frozenCols.indexOf(col);
    if (idx <= 0) return '0';
    const offset: number = frozenCols
      .slice(idx + 1)
      .reduce((sum: number, c: DataGridColumnComponent): number => {
        return sum + this.resolveColumnWidth(c);
      }, 0);
    return `${offset}px`;
  }

  /** Inline style for a column header/cell. */
  protected columnStyle(col: DataGridColumnComponent): Record<string, string> {
    const styles: Record<string, string> = {};
    const width: string | null = col.width();
    const resolved: number | undefined = this.columnWidths()[col.field()];

    if (resolved !== undefined) {
      styles['width'] = `${resolved}px`;
      styles['min-width'] = `${resolved}px`;
      styles['max-width'] = `${resolved}px`;
    } else if (width !== null) {
      styles['width'] = width;
      styles['min-width'] = width;
    }

    const minWidth: string | null = col.minWidth();
    if (minWidth !== null && resolved === undefined) {
      styles['min-width'] = minWidth;
    }

    const frozen: ReturnType<typeof col.frozen> = col.frozen();
    if (frozen === 'start') {
      styles['position'] = 'sticky';
      styles['inset-inline-start'] = this.frozenStartOffset(col);
      styles['z-index'] = '2';
    } else if (frozen === 'end') {
      styles['position'] = 'sticky';
      styles['inset-inline-end'] = this.frozenEndOffset(col);
      styles['z-index'] = '2';
    }

    return styles;
  }

  // ---------------------------------------------------------------------------
  // Sort
  // ---------------------------------------------------------------------------

  /** Sort icon name for a given column. */
  protected sortIconFor(field: string): 'sort' | 'sort-asc' | 'sort-desc' {
    if (this.multiSortMode()) {
      const meta: DataGridSortMeta | undefined = this.multiSortMeta().find(
        (m: DataGridSortMeta): boolean => m.field === field,
      );
      if (meta === undefined) return 'sort';
      return meta.order === 1 ? 'sort-asc' : 'sort-desc';
    }
    if (this.sortField() !== field) return 'sort';
    return this.sortOrder() === 1 ? 'sort-asc' : 'sort-desc';
  }

  /** Sort priority label for a column in multi-sort mode. */
  protected sortPriorityFor(field: string): number | null {
    if (!this.multiSortMode()) return null;
    const idx: number = this.multiSortMeta().findIndex(
      (m: DataGridSortMeta): boolean => m.field === field,
    );
    return idx >= 0 ? idx + 1 : null;
  }

  protected onHeaderClick(event: MouseEvent, col: DataGridColumnComponent): void {
    if (!col.sortable()) return;

    const field: string = col.sortField() ?? col.field();

    if (this.multiSortMode()) {
      this.applyMultiSort(field, event.ctrlKey || event.metaKey);
    } else {
      this.applySingleSort(field);
    }

    const sortEvent: DataGridSortEvent = {
      field,
      order: this.sortOrder(),
      multiSortMeta: this.multiSortMeta(),
    };
    this.sorted.emit(sortEvent);

    if (this.lazy()) {
      this.emitLazyLoad();
    }
  }

  private applySingleSort(field: string): void {
    if (this.sortField() !== field) {
      this.sortField.set(field);
      this.sortOrder.set(1);
    } else {
      const next: DataGridSortOrder = this.sortOrder() === 1 ? -1 : this.sortOrder() === -1 ? 0 : 1;
      this.sortOrder.set(next);
      if (next === 0) this.sortField.set(null);
    }
  }

  private applyMultiSort(field: string, addToStack: boolean): void {
    if (!addToStack) {
      this.applySingleSort(field);
      this.multiSortMeta.set([]);
      return;
    }

    const existing: DataGridSortMeta[] = [...this.multiSortMeta()];
    const idx: number = existing.findIndex((m: DataGridSortMeta): boolean => m.field === field);

    if (idx === -1) {
      existing.push({ field, order: 1 });
    } else if (existing[idx]?.order === 1) {
      existing[idx] = { field, order: -1 };
    } else {
      existing.splice(idx, 1);
    }

    this.multiSortMeta.set(existing);
  }

  // ---------------------------------------------------------------------------
  // Filtering
  // ---------------------------------------------------------------------------

  protected onColumnFilterInput(field: string, value: string): void {
    this.columnFilters.update(
      (current: Record<string, string>): Record<string, string> => ({ ...current, [field]: value }),
    );
    this.first.set(0);

    const filteredValue: unknown[] = this.processedRows();
    const filterEvent: DataGridFilterEvent = { field, value, filteredValue };
    this.filtered.emit(filterEvent);

    if (this.lazy()) {
      this.emitLazyLoad();
    }
  }

  protected onGlobalFilterInput(value: string): void {
    this.globalFilter.set(value);
    this.first.set(0);

    const filteredValue: unknown[] = this.processedRows();
    this.filtered.emit({ field: null, value, filteredValue });

    if (this.lazy()) {
      this.emitLazyLoad();
    }
  }

  // ---------------------------------------------------------------------------
  // Selection
  // ---------------------------------------------------------------------------

  protected onRowClick(event: MouseEvent, row: unknown, index: number): void {
    const mode: DataGridSelectionMode = this.selectionMode();
    if (mode === null || mode === 'checkbox') return;

    if (mode === 'single') {
      if (this.isRowSelected(row)) {
        this.selection.set(null);
        this.rowUnselected.emit({ originalEvent: event, data: row, index });
      } else {
        this.selection.set(row);
        this.rowSelected.emit({ originalEvent: event, data: row, index });
      }
      return;
    }

    // multiple mode
    const useMetaKey: boolean = this.metaKeySelection();
    const current: unknown[] = Array.isArray(this.selection())
      ? (this.selection() as unknown[])
      : [];

    if (event.shiftKey && current.length > 0) {
      const rows: unknown[] = this.pageRows();
      const lastIndex: number = rows.findIndex((r: unknown): boolean =>
        this.rowsEqual(r, current[current.length - 1]),
      );
      const [from, to] = lastIndex < index ? [lastIndex, index] : [index, lastIndex];
      const range: unknown[] = rows.slice(from, to + 1);
      const merged: unknown[] = [...current];
      range.forEach((r: unknown): void => {
        if (!merged.some((s: unknown): boolean => this.rowsEqual(s, r))) merged.push(r);
      });
      this.selection.set(merged);
    } else if (event.ctrlKey || event.metaKey || !useMetaKey) {
      if (this.isRowSelected(row)) {
        const next: unknown[] = current.filter((s: unknown): boolean => !this.rowsEqual(s, row));
        this.selection.set(next);
        this.rowUnselected.emit({ originalEvent: event, data: row, index });
      } else {
        this.selection.set([...current, row]);
        this.rowSelected.emit({ originalEvent: event, data: row, index });
      }
    } else {
      this.selection.set([row]);
      this.rowSelected.emit({ originalEvent: event, data: row, index });
    }
  }

  protected onCheckboxChange(event: Event, row: unknown, index: number): void {
    const checked: boolean = (event.target as HTMLInputElement).checked;
    const current: unknown[] = Array.isArray(this.selection())
      ? (this.selection() as unknown[])
      : [];

    if (checked) {
      this.selection.set([...current, row]);
      this.rowSelected.emit({ originalEvent: event, data: row, index });
    } else {
      this.selection.set(current.filter((s: unknown): boolean => !this.rowsEqual(s, row)));
      this.rowUnselected.emit({ originalEvent: event, data: row, index });
    }
  }

  protected onSelectAllChange(event: Event): void {
    const checked: boolean = (event.target as HTMLInputElement).checked;
    if (checked) {
      this.selection.set([...this.pageRows()]);
    } else {
      this.selection.set([]);
    }
  }

  // ---------------------------------------------------------------------------
  // Cell editing
  // ---------------------------------------------------------------------------

  protected onCellClick(
    event: MouseEvent,
    row: unknown,
    index: number,
    col: DataGridColumnComponent,
  ): void {
    if (this.editMode() !== 'cell' || !col.editable()) return;

    const key: string = `${col.field()}:${index}`;
    if (this.editingCell() === key) return;

    // Commit any in-flight edit
    this.commitCurrentEdit(event);

    this.editingCellOriginalValue = this.getFieldValue(row, col.field());
    this.editingCell.set(key);
    this.cellEditInit.emit({
      originalEvent: event,
      data: row,
      index,
      field: col.field(),
    });
  }

  protected onCellEditorKeydown(
    event: KeyboardEvent,
    row: unknown,
    index: number,
    col: DataGridColumnComponent,
  ): void {
    if (event.key === 'Escape') {
      // Revert
      if (col.field() !== '' && this.editingCellOriginalValue !== undefined) {
        (row as Record<string, unknown>)[col.field()] = this.editingCellOriginalValue;
      }
      this.editingCell.set(null);
      this.cellEditCancel.emit({ originalEvent: event, data: row, index, field: col.field() });
      event.preventDefault();
    } else if (event.key === 'Enter' || event.key === 'Tab') {
      this.commitCurrentEdit(event);
      event.preventDefault();
    }
  }

  private commitCurrentEdit(event: Event): void {
    const key: string | null = this.editingCell();
    if (key === null) return;

    const [field, indexStr] = key.split(':');
    const index: number = Number(indexStr);
    const rows: unknown[] = this.pageRows();
    const row: unknown = rows[index];

    if (row !== undefined) {
      const newValue: unknown = this.getFieldValue(row, field ?? '');
      this.cellEditComplete.emit({
        originalEvent: event,
        data: row,
        newValue,
        oldValue: this.editingCellOriginalValue,
        index,
        field: field ?? '',
      });
    }

    this.editingCell.set(null);
    this.editingCellOriginalValue = undefined;
  }

  // ---------------------------------------------------------------------------
  // Column resizing
  // ---------------------------------------------------------------------------

  private resizingColumn: DataGridColumnComponent | null = null;
  private resizeStartX: number = 0;
  private resizeStartWidth: number = 0;

  protected onResizeHandleMousedown(event: MouseEvent, col: DataGridColumnComponent): void {
    if (!this.isColumnResizable(col)) return;
    event.preventDefault();
    event.stopPropagation();

    this.resizingColumn = col;
    this.resizeStartX = event.clientX;
    this.resizeStartWidth = this.resolveColumnWidth(col);

    fromEvent<MouseEvent>(document, 'mousemove')
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((moveEvent: MouseEvent): void => this.onResizeMousemove(moveEvent));

    fromEvent<MouseEvent>(document, 'mouseup')
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((upEvent: MouseEvent): void => this.onResizeMouseup(upEvent));
  }

  private onResizeMousemove(event: MouseEvent): void {
    if (this.resizingColumn === null) return;
    const delta: number = event.clientX - this.resizeStartX;
    const minPx: number = this.resolveMinColumnWidth(this.resizingColumn);
    const newWidth: number = Math.max(minPx, this.resizeStartWidth + delta);

    this.columnWidths.update(
      (current: Record<string, number>): Record<string, number> => ({
        ...current,
        [this.resizingColumn!.field()]: newWidth,
      }),
    );
  }

  private onResizeMouseup(event: MouseEvent): void {
    if (this.resizingColumn !== null) {
      const delta: number = event.clientX - this.resizeStartX;
      this.columnResize.emit({
        field: this.resizingColumn.field(),
        width: this.columnWidths()[this.resizingColumn.field()] ?? this.resizeStartWidth,
        delta,
      });
    }
    this.resizingColumn = null;
    this.resizeStartX = 0;
    this.resizeStartWidth = 0;
  }

  // ---------------------------------------------------------------------------
  // Pagination
  // ---------------------------------------------------------------------------

  protected onPageChange(event: PaginatorPageEvent): void {
    this.first.set(event.first);
    this.rows.set(event.rows);

    this.paged.emit({
      first: event.first,
      rows: event.rows,
      page: event.page,
      pageCount: this.pageCount(),
    });

    if (this.lazy()) {
      this.emitLazyLoad();
    }
  }

  // ---------------------------------------------------------------------------
  // Lazy load
  // ---------------------------------------------------------------------------

  private emitLazyLoad(): void {
    this.lazyLoad.emit({
      first: this.first(),
      rows: this.rows(),
      sortField: this.sortField(),
      sortOrder: this.sortOrder(),
      multiSortMeta: this.multiSortMeta(),
      globalFilter: this.globalFilter(),
      filters: this.columnFilters(),
    });
  }

  // ---------------------------------------------------------------------------
  // Keyboard navigation (WAI-ARIA grid pattern)
  // ---------------------------------------------------------------------------

  protected onGridKeydown(event: KeyboardEvent): void {
    const target: HTMLElement = event.target as HTMLElement;
    const role: string | null = target.getAttribute('role');

    if (role !== 'gridcell' && role !== 'columnheader') return;

    const row: HTMLElement | null = target.closest('[role="row"]');
    if (row === null) return;

    switch (event.key) {
      case 'ArrowRight':
        this.moveFocus(target, 'next');
        event.preventDefault();
        break;
      case 'ArrowLeft':
        this.moveFocus(target, 'prev');
        event.preventDefault();
        break;
      case 'ArrowDown':
        this.moveFocusVertical(target, row, 'next');
        event.preventDefault();
        break;
      case 'ArrowUp':
        this.moveFocusVertical(target, row, 'prev');
        event.preventDefault();
        break;
      case 'Home':
        this.focusFirstInRow(row);
        event.preventDefault();
        break;
      case 'End':
        this.focusLastInRow(row);
        event.preventDefault();
        break;
    }
  }

  private moveFocus(cell: HTMLElement, direction: 'next' | 'prev'): void {
    const sibling: Element | null =
      direction === 'next' ? cell.nextElementSibling : cell.previousElementSibling;
    if (sibling instanceof HTMLElement) {
      sibling.focus();
    }
  }

  private moveFocusVertical(cell: HTMLElement, row: HTMLElement, direction: 'next' | 'prev'): void {
    const cellIndex: number = Array.from(row.children).indexOf(cell);
    const targetRow: Element | null =
      direction === 'next' ? row.nextElementSibling : row.previousElementSibling;
    if (targetRow instanceof HTMLElement) {
      const targetCell: HTMLElement | undefined = Array.from(
        targetRow.querySelectorAll<HTMLElement>('[role="gridcell"],[role="columnheader"]'),
      )[cellIndex];
      targetCell?.focus();
    }
  }

  private focusFirstInRow(row: HTMLElement): void {
    const first: HTMLElement | null = row.querySelector<HTMLElement>(
      '[role="gridcell"],[role="columnheader"]',
    );
    first?.focus();
  }

  private focusLastInRow(row: HTMLElement): void {
    const cells: NodeListOf<HTMLElement> = row.querySelectorAll<HTMLElement>(
      '[role="gridcell"],[role="columnheader"]',
    );
    cells[cells.length - 1]?.focus();
  }

  // ---------------------------------------------------------------------------
  // Virtual scroll: post-render setup
  // ---------------------------------------------------------------------------

  /** Called after content is checked — registers scroll listener once the viewport is in the DOM. */
  public ngAfterViewInit(): void {
    this.setupScrollListener();
    // Emit initial lazy load event so consumer can fetch the first page
    if (this.lazy()) {
      this.emitLazyLoad();
    }
  }

  // ---------------------------------------------------------------------------
  // Private helpers
  // ---------------------------------------------------------------------------

  private matchesFilter(
    value: string,
    filter: string,
    mode: DataGridFilterMatchMode,
    _locale: string | undefined,
  ): boolean {
    switch (mode) {
      case 'startsWith':
        return value.startsWith(filter);
      case 'endsWith':
        return value.endsWith(filter);
      case 'equals':
        return value === filter;
      case 'contains':
      default:
        return value.includes(filter);
    }
  }

  private compareValues(a: unknown, b: unknown): number {
    if (a === null || a === undefined) return -1;
    if (b === null || b === undefined) return 1;
    if (typeof a === 'string' && typeof b === 'string') return a.localeCompare(b);
    if (typeof a === 'number' && typeof b === 'number') return a - b;
    return String(a).localeCompare(String(b));
  }

  private rowsEqual(a: unknown, b: unknown): boolean {
    const key: string | null = this.dataKey();
    if (key === null) return a === b;
    return this.getFieldValue(a, key) === this.getFieldValue(b, key);
  }

  private resolveColumnWidth(col: DataGridColumnComponent): number {
    const explicit: number | undefined = this.columnWidths()[col.field()];
    if (explicit !== undefined) return explicit;
    const widthStr: string | null = col.width();
    if (widthStr !== null && widthStr.endsWith('px')) {
      return parseInt(widthStr, 10);
    }
    return 150; // Default column width
  }

  private resolveMinColumnWidth(col: DataGridColumnComponent): number {
    const minStr: string | null = col.minWidth();
    if (minStr !== null && minStr.endsWith('px')) return parseInt(minStr, 10);
    return DATA_GRID_DEFAULTS.MIN_COLUMN_WIDTH;
  }

  private resolveScrollHeight(): number {
    const height: string | null = this.scrollHeight();
    if (height === null) return 400;
    if (height.endsWith('px')) return parseInt(height, 10);
    if (height.endsWith('vh')) return (parseFloat(height) / 100) * window.innerHeight;
    return 400;
  }

  /** Expose TemplateRef type for template access. */
  protected readonly templateRefType: typeof TemplateRef = TemplateRef;
}
