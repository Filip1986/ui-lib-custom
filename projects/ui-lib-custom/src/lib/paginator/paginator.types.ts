/** Event emitted when the active page changes. */
export interface PaginatorPageEvent {
  /** Zero-based index of the current page. */
  page: number;
  /** Zero-based index of the first record on the current page. */
  first: number;
  /** Number of records per page. */
  rows: number;
  /** Total number of pages. */
  pageCount: number;
}

/** Visual design variant applied to the paginator. */
export type PaginatorVariant = 'material' | 'bootstrap' | 'minimal';

/** Size token controlling the paginator's dimensions. */
export type PaginatorSize = 'sm' | 'md' | 'lg';
