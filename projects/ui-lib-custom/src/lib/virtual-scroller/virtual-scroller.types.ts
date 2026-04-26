/** Scroll orientation of the VirtualScroller. */
export type VirtualScrollerOrientation = 'vertical' | 'horizontal' | 'both';

/** Direction to scroll an item into view. */
export type VirtualScrollerToType = 'to-start' | 'to-end';

/**
 * Positional metadata passed to item and loader templates.
 * @group Interfaces
 */
export interface VirtualScrollerItemOptions {
  /** Absolute index in the full items array. */
  index: number;
  /** Total number of items. */
  count: number;
  /** Whether this is the first item. */
  first: boolean;
  /** Whether this is the last item. */
  last: boolean;
  /** Whether the index is even. */
  even: boolean;
  /** Whether the index is odd. */
  odd: boolean;
}

/**
 * Options passed to loader template instances.
 * @group Interfaces
 */
export interface VirtualScrollerLoaderOptions extends VirtualScrollerItemOptions {
  /** Number of columns in the viewport (only set for 'both' orientation). */
  numCols?: number;
}

/**
 * Full context object passed to the custom content template.
 * @group Interfaces
 */
export interface VirtualScrollerContentOptions {
  /** Currently loaded items (the visible slice). */
  items: unknown[];
  /** Row items — same as items for vertical orientation. */
  rows: unknown[];
  /** Column items for 'horizontal' or 'both' orientations. */
  columns: unknown[] | null | undefined;
  /** Whether the scroller is in a loading state. */
  loading: boolean;
  /** Item size input value. */
  itemSize: number | [number, number];
  /** Spacer element style (sets virtual total height/width). */
  spacerStyle: Record<string, string>;
  /** Content element style (CSS transform for positioning). */
  contentStyle: Record<string, string>;
  /** Whether the orientation is vertical. */
  vertical: boolean;
  /** Whether the orientation is horizontal. */
  horizontal: boolean;
  /** Whether the orientation is both. */
  both: boolean;
  /** Returns positional metadata for a rendered item index. */
  getItemOptions: (index: number) => VirtualScrollerItemOptions;
  /** Returns loader metadata for a rendered loader index. */
  getLoaderOptions: (index: number, extra?: { numCols?: number }) => VirtualScrollerLoaderOptions;
}

/**
 * Event fired when the visible range changes in lazy mode.
 * @group Events
 */
export interface VirtualScrollerLazyLoadEvent {
  /** First index to load (inclusive). */
  first: number;
  /** Last index to load (exclusive). */
  last: number;
}

/**
 * Event fired when the first/last rendered indices change.
 * @group Events
 */
export interface VirtualScrollerScrollIndexChangeEvent {
  /** New first rendered index. */
  first: number | { rows: number; cols: number };
  /** New last rendered index. */
  last: number | { rows: number; cols: number };
}

/**
 * Event fired on every scroll.
 * @group Events
 */
export interface VirtualScrollerScrollEvent {
  /** The underlying browser scroll event. */
  originalEvent: Event;
}
