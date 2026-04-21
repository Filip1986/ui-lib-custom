/** Supported layout modes for DataView rendering. */
export const DATA_VIEW_LAYOUTS: Readonly<{
  List: 'list';
  Grid: 'grid';
}> = {
  List: 'list',
  Grid: 'grid',
} as const;

/** DataView layout mode union. */
export type DataViewLayout = (typeof DATA_VIEW_LAYOUTS)[keyof typeof DATA_VIEW_LAYOUTS];

/** Supported size variants for DataView controls and density. */
export const DATA_VIEW_SIZES: Readonly<{
  Small: 'sm';
  Medium: 'md';
  Large: 'lg';
}> = {
  Small: 'sm',
  Medium: 'md',
  Large: 'lg',
} as const;

/** DataView size union. */
export type DataViewSize = (typeof DATA_VIEW_SIZES)[keyof typeof DATA_VIEW_SIZES];

/** Supported sort order values for DataView external sorting contracts. */
export const DATA_VIEW_SORT_ORDERS: Readonly<{
  Ascending: 1;
  Descending: -1;
}> = {
  Ascending: 1,
  Descending: -1,
} as const;

/** DataView sort order value. */
export type DataViewSortOrder = 1 | -1;

/** Pagination change payload for DataView page navigation. */
export interface DataViewPageEvent {
  readonly first: number;
  readonly rows: number;
  readonly page: number;
  readonly pageCount: number;
}

/** Sorting change payload for DataView external sorting flow. */
export interface DataViewSortEvent {
  readonly sortField: string;
  readonly sortOrder: DataViewSortOrder;
}

/** Layout change payload for DataView list/grid mode switching. */
export interface DataViewLayoutChangeEvent {
  readonly layout: DataViewLayout;
}

/** Template context shape for a list item in DataView. */
export interface DataViewListItemContext<T> {
  readonly $implicit: T;
  readonly index: number;
  readonly first: boolean;
  readonly last: boolean;
  readonly even: boolean;
  readonly odd: boolean;
}

/** Template context shape for a grid item in DataView. */
export interface DataViewGridItemContext<T> {
  readonly $implicit: T;
  readonly index: number;
  readonly first: boolean;
  readonly last: boolean;
  readonly even: boolean;
  readonly odd: boolean;
}
