import type { TableSortOrder } from './table.types';

/**
 * Default values for the Table component.
 */
export const TABLE_DEFAULTS: {
  readonly ROWS_PER_PAGE: number;
  readonly SORT_ORDER: TableSortOrder;
  readonly ROWS_PER_PAGE_OPTIONS: number[];
  readonly GLOBAL_FILTER_PLACEHOLDER: string;
  readonly EMPTY_MESSAGE: string;
} = {
  ROWS_PER_PAGE: 10,
  SORT_ORDER: 0,
  ROWS_PER_PAGE_OPTIONS: [5, 10, 25, 50],
  GLOBAL_FILTER_PLACEHOLDER: 'Search...',
  EMPTY_MESSAGE: 'No records found.',
} as const;

/**
 * CSS class names used internally by the Table component.
 */
export const TABLE_CLASSES: {
  readonly ROOT: string;
  readonly SORT_ASCENDING: string;
  readonly SORT_DESCENDING: string;
  readonly SELECTED: string;
  readonly EXPANDED: string;
  readonly STRIPED: string;
  readonly HOVER: string;
  readonly GRIDLINES: string;
  readonly SCROLLABLE: string;
} = {
  ROOT: 'ui-lib-table',
  SORT_ASCENDING: 'ui-lib-table--sort-asc',
  SORT_DESCENDING: 'ui-lib-table--sort-desc',
  SELECTED: 'ui-lib-table__row--selected',
  EXPANDED: 'ui-lib-table__row--expanded',
  STRIPED: 'ui-lib-table--striped',
  HOVER: 'ui-lib-table--hover',
  GRIDLINES: 'ui-lib-table--gridlines',
  SCROLLABLE: 'ui-lib-table--scrollable',
} as const;
