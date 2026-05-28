import type {
  DataGridEditMode,
  DataGridFilterMatchMode,
  DataGridResizeMode,
  DataGridSelectionMode,
  DataGridSize,
  DataGridSortOrder,
} from './data-grid.types';

/** Default values for DataGrid inputs. */
export const DATA_GRID_DEFAULTS: {
  readonly ROWS_PER_PAGE: number;
  readonly ROWS_PER_PAGE_OPTIONS: readonly number[];
  readonly SORT_ORDER: DataGridSortOrder;
  readonly FILTER_MATCH_MODE: DataGridFilterMatchMode;
  readonly SIZE: DataGridSize;
  readonly SELECTION_MODE: DataGridSelectionMode;
  readonly EDIT_MODE: DataGridEditMode;
  readonly ROW_HEIGHT: number;
  readonly VIRTUAL_SCROLL_BUFFER: number;
  readonly RESIZE_MODE: DataGridResizeMode;
  readonly EMPTY_MESSAGE: string;
  readonly MIN_COLUMN_WIDTH: number;
} = {
  /** Rows per page when paginator is enabled. */
  ROWS_PER_PAGE: 25,
  /** Options for the rows-per-page selector. */
  ROWS_PER_PAGE_OPTIONS: [10, 25, 50, 100],
  /** Default sort order (unsorted). */
  SORT_ORDER: 0 as DataGridSortOrder,
  /** Default filter match mode. */
  FILTER_MATCH_MODE: 'contains' as DataGridFilterMatchMode,
  /** Default component size. */
  SIZE: 'md' as DataGridSize,
  /** Default selection mode (none). */
  SELECTION_MODE: null as DataGridSelectionMode,
  /** Default edit mode (none). */
  EDIT_MODE: null as DataGridEditMode,
  /** Default row height in pixels (used for virtual scroll calculations). */
  ROW_HEIGHT: 48,
  /** Number of extra rows rendered above and below the visible viewport (virtual scroll). */
  VIRTUAL_SCROLL_BUFFER: 5,
  /** Default column resize mode. */
  RESIZE_MODE: 'expand' as DataGridResizeMode,
  /** Message shown when no rows are available. */
  EMPTY_MESSAGE: 'No records found.',
  /** Minimum column width enforced during column resize (px). */
  MIN_COLUMN_WIDTH: 50,
} as const;

/** CSS class prefix for all data-grid elements. */
export const DATA_GRID_CLASS: string = 'ui-lib-data-grid' as const;
