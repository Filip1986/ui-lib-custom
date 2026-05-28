// ---------------------------------------------------------------------------
// Variant / Size / Sort
// ---------------------------------------------------------------------------

/** Theme variant for the DataGrid component. */
export type DataGridVariant = 'material' | 'bootstrap' | 'minimal';

/** Size token for the DataGrid component. */
export type DataGridSize = 'sm' | 'md' | 'lg';

/**
 * Sort order for a column.
 * - `1`  — ascending
 * - `-1` — descending
 * - `0`  — unsorted
 */
export type DataGridSortOrder = 1 | -1 | 0;

/**
 * Row selection mode.
 * - `'single'`   — one row at a time; click to select.
 * - `'multiple'` — Ctrl/Shift + click for multi-selection.
 * - `'checkbox'` — leading checkbox column drives selection.
 * - `null`       — selection is disabled.
 */
export type DataGridSelectionMode = 'single' | 'multiple' | 'checkbox' | null;

/**
 * Column filter match mode.
 */
export type DataGridFilterMatchMode = 'contains' | 'startsWith' | 'endsWith' | 'equals';

/**
 * Column resize mode.
 * - `'fit'`    — resizing a column shrinks the adjacent column.
 * - `'expand'` — resizing a column expands/shrinks the total table width.
 */
export type DataGridResizeMode = 'fit' | 'expand';

/**
 * Cell edit mode.
 * - `'cell'` — individual cells are editable; click to activate.
 * - `'row'`  — entire row enters edit mode on a trigger.
 * - `null`   — editing is disabled.
 */
export type DataGridEditMode = 'cell' | 'row' | null;

/**
 * Column pin side for sticky columns.
 * - `'start'` — column is frozen to the inline-start edge.
 * - `'end'`   — column is frozen to the inline-end edge.
 * - `false`   — column scrolls normally.
 */
export type DataGridFrozen = 'start' | 'end' | false;

// ---------------------------------------------------------------------------
// Sort meta
// ---------------------------------------------------------------------------

/** Sort configuration for one column (used in multi-sort mode). */
export interface DataGridSortMeta {
  /** The field (or sortField) being sorted. */
  field: string;
  /** Sort direction. */
  order: DataGridSortOrder;
}

// ---------------------------------------------------------------------------
// Lazy load
// ---------------------------------------------------------------------------

/**
 * Event emitted when `lazy` is `true` and the grid needs new data.
 * The consumer fetches the data and updates `[value]` and `[totalRecords]`.
 */
export interface DataGridLazyLoadEvent {
  /** Zero-based offset of the first requested row. */
  first: number;
  /** Number of rows requested. */
  rows: number;
  /** Field currently sorted (single sort mode). */
  sortField: string | null;
  /** Current sort order (single sort mode). */
  sortOrder: DataGridSortOrder;
  /** Full multi-sort stack. */
  multiSortMeta: DataGridSortMeta[];
  /** Global filter value. */
  globalFilter: string;
  /** Per-column filter map: field → value. */
  filters: Record<string, string>;
}

// ---------------------------------------------------------------------------
// Event payloads
// ---------------------------------------------------------------------------

/** Emitted when the active sort changes. */
export interface DataGridSortEvent {
  /** The field name being sorted. */
  field: string;
  /** The resulting sort order. */
  order: DataGridSortOrder;
  /** The full multi-sort stack when multiSortMode is enabled. */
  multiSortMeta: DataGridSortMeta[];
}

/** Emitted when a column or global filter changes. */
export interface DataGridFilterEvent {
  /** The column field being filtered (`null` for the global filter). */
  field: string | null;
  /** The current filter value. */
  value: string;
  /** Data rows that passed all active filters (client-side mode only). */
  filteredValue: unknown[];
}

/** Emitted when a row is selected. */
export interface DataGridRowSelectEvent {
  /** The originating DOM event. */
  originalEvent: Event;
  /** The row data that was selected. */
  data: unknown;
  /** Row index within the currently visible data. */
  index: number;
}

/** Emitted when a row is deselected. */
export interface DataGridRowUnselectEvent {
  /** The originating DOM event. */
  originalEvent: Event;
  /** The row data that was deselected. */
  data: unknown;
  /** Row index within the currently visible data. */
  index: number;
}

/** Emitted when a cell edit begins. */
export interface DataGridCellEditInitEvent {
  /** The originating DOM event. */
  originalEvent: Event;
  /** Row data. */
  data: unknown;
  /** Row index. */
  index: number;
  /** Column field. */
  field: string;
}

/** Emitted when a cell edit is committed (Enter / Tab / blur). */
export interface DataGridCellEditCompleteEvent {
  /** The originating DOM event. */
  originalEvent: Event;
  /** Row data (with new value applied). */
  data: unknown;
  /** New value for the cell. */
  newValue: unknown;
  /** Previous value for the cell. */
  oldValue: unknown;
  /** Row index. */
  index: number;
  /** Column field. */
  field: string;
}

/** Emitted when a cell edit is cancelled (Escape). */
export interface DataGridCellEditCancelEvent {
  /** The originating DOM event. */
  originalEvent: Event;
  /** Row data. */
  data: unknown;
  /** Row index. */
  index: number;
  /** Column field. */
  field: string;
}

/** Emitted when the page or rows-per-page changes. */
export interface DataGridPageEvent {
  /** Zero-based index of the first record on the new page. */
  first: number;
  /** Number of rows per page. */
  rows: number;
  /** Zero-based page index. */
  page: number;
  /** Total number of pages. */
  pageCount: number;
}

/** Emitted when column widths change after a resize drag. */
export interface DataGridColumnResizeEvent {
  /** The column field that was resized. */
  field: string;
  /** The new column width in pixels. */
  width: number;
  /** The delta (positive = wider) in pixels. */
  delta: number;
}

// ---------------------------------------------------------------------------
// Template contexts
// ---------------------------------------------------------------------------

/**
 * Context provided to custom body cell templates.
 * @template T - The row data type.
 */
export interface DataGridCellContext<T = unknown> {
  /** The row data object. */
  $implicit: T;
  /** Row index in the currently visible data. */
  index: number;
  /** Whether this row is currently selected. */
  selected: boolean;
  /** Whether this cell is in edit mode. */
  editing: boolean;
}

/**
 * Context provided to custom cell editor templates.
 * @template T - The row data type.
 */
export interface DataGridEditorContext<T = unknown> {
  /** The row data object (mutable reference). */
  $implicit: T;
  /** Row index. */
  index: number;
  /** Column field. */
  field: string;
}

/**
 * Context provided to custom row templates.
 * @template T - The row data type.
 */
export interface DataGridRowContext<T = unknown> {
  /** The row data object. */
  $implicit: T;
  /** Row index in the currently visible data. */
  index: number;
  /** Whether this row is currently selected. */
  selected: boolean;
}

/** Context provided to the empty-state template. */
export interface DataGridEmptyContext {
  /** `true` when the empty state is due to filtering with no results. */
  filtered: boolean;
}
