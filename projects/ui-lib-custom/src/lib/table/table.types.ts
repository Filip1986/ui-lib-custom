/**
 * Theme variant for the Table component.
 */
export type TableVariant = 'material' | 'bootstrap' | 'minimal';

/**
 * Size token for the Table component.
 */
export type TableSize = 'sm' | 'md' | 'lg';

/**
 * Sort order for a column.
 * - `1`  — ascending
 * - `-1` — descending
 * - `0`  — unsorted
 */
export type TableSortOrder = 1 | -1 | 0;

/**
 * Row selection mode.
 * - `'single'`   — only one row can be selected at a time.
 * - `'multiple'` — multiple rows can be selected via Ctrl/Shift + click.
 * - `'checkbox'` — rows are selected via a checkbox column.
 * - `null`       — selection is disabled.
 */
export type TableSelectionMode = 'single' | 'multiple' | 'checkbox' | null;

/**
 * Column filter match mode.
 */
export type TableFilterMatchMode = 'contains' | 'startsWith' | 'endsWith' | 'equals';

// ---------------------------------------------------------------------------
// Sort meta
// ---------------------------------------------------------------------------

/**
 * Sort configuration for a single column, used in multi-sort mode.
 */
export interface TableSortMeta {
  /** The field (or sortField) on which to sort. */
  field: string;
  /** Sort direction. */
  order: TableSortOrder;
}

// ---------------------------------------------------------------------------
// Event payload interfaces
// ---------------------------------------------------------------------------

/**
 * Emitted when the active sort changes.
 */
export interface TableSortEvent {
  /** The field name being sorted. */
  field: string;
  /** The resulting sort order. */
  order: TableSortOrder;
  /** The full multi-sort stack (when multiSortMode is enabled). */
  multiSortMeta: TableSortMeta[];
}

/**
 * Emitted when a column or global filter changes.
 */
export interface TableFilterEvent {
  /**
   * The column field being filtered. `null` for the global filter.
   */
  field: string | null;
  /** The current filter value. */
  value: string;
  /** The data rows that passed all active filters. */
  filteredValue: unknown[];
}

/**
 * Emitted when a row is selected.
 */
export interface TableRowSelectEvent {
  /** The originating DOM event. */
  originalEvent: Event;
  /** The row data that was selected. */
  data: unknown;
  /** Index of the row in the current page's visible data. */
  index: number;
}

/**
 * Emitted when a row is deselected.
 */
export interface TableRowUnselectEvent {
  /** The originating DOM event. */
  originalEvent: Event;
  /** The row data that was deselected. */
  data: unknown;
  /** Index of the row in the current page's visible data. */
  index: number;
}

/**
 * Emitted when a row is expanded.
 */
export interface TableRowExpandEvent {
  /** The originating DOM event. */
  originalEvent: Event;
  /** The row data that was expanded. */
  data: unknown;
  /** Index of the row. */
  index: number;
}

/**
 * Emitted when a row is collapsed.
 */
export interface TableRowCollapseEvent {
  /** The originating DOM event. */
  originalEvent: Event;
  /** The row data that was collapsed. */
  data: unknown;
  /** Index of the row. */
  index: number;
}

/**
 * Emitted when the page changes (when using the built-in paginator).
 */
export interface TablePageEvent {
  /** Zero-based index of the first record on the new page. */
  first: number;
  /** Number of rows per page. */
  rows: number;
  /** Zero-based page index. */
  page: number;
  /** Total number of pages. */
  pageCount: number;
}

// ---------------------------------------------------------------------------
// Template context interfaces
// ---------------------------------------------------------------------------

/**
 * Context injected into the `[uiTableBody]` row template.
 * @template T - The type of a single data row.
 */
export interface TableRowContext<T = unknown> {
  /** The row data object. */
  $implicit: T;
  /** Row index within the currently visible page. */
  index: number;
  /** Whether this row is currently expanded. */
  expanded: boolean;
  /** Whether this row is currently selected. */
  selected: boolean;
}

/**
 * Context injected into the `[uiTableExpansion]` template.
 * @template T - The type of a single data row.
 */
export interface TableExpansionContext<T = unknown> {
  /** The row data object. */
  $implicit: T;
  /** Row index within the currently visible page. */
  index: number;
}

/**
 * Context injected into the `[uiTableColumnBody]` cell template.
 * @template T - The type of a single data row.
 */
export interface TableCellContext<T = unknown> {
  /** The row data object. */
  $implicit: T;
  /** Row index within the currently visible page. */
  index: number;
}

/**
 * Context injected into the `[uiTableEmpty]` template.
 */
export interface TableEmptyContext {
  /**
   * `true` when the table is empty because the active filter matched no rows;
   * `false` when the value array itself is empty.
   */
  filtered: boolean;
}
