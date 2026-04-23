/**
 * Theme variant for the OrderList component.
 */
export type OrderListVariant = 'material' | 'bootstrap' | 'minimal';

/**
 * Size token for the OrderList component.
 */
export type OrderListSize = 'sm' | 'md' | 'lg';

/**
 * Position of the reorder control buttons relative to the list.
 * - `'left'`  — buttons appear in a vertical column to the left of the list.
 * - `'top'`   — buttons appear in a horizontal row above the list.
 */
export type OrderListControlsPosition = 'left' | 'top';

/**
 * Strategy used when filtering list items.
 * - `'contains'`   — item field contains the query string (case-insensitive).
 * - `'startsWith'` — item field starts with the query string (case-insensitive).
 * - `'endsWith'`   — item field ends with the query string (case-insensitive).
 * - `'equals'`     — item field exactly matches the query string (case-insensitive).
 */
export type OrderListFilterMatchMode = 'contains' | 'startsWith' | 'endsWith' | 'equals';

// ---------------------------------------------------------------------------
// Event payload interfaces
// ---------------------------------------------------------------------------

/**
 * Emitted after any reorder operation (button-triggered or drag-and-drop).
 * Contains the full reordered items list plus the source and target indices.
 */
export interface OrderListReorderEvent {
  /** The full array of items after reordering. */
  items: unknown[];
  /** Index in the original list from which the moved item(s) originated. */
  previousIndex: number;
  /** Index in the resulting list where the moved item(s) landed. */
  currentIndex: number;
}

/**
 * Emitted when the selection array changes.
 */
export interface OrderListSelectionChangeEvent {
  /** The browser event that triggered the selection change. */
  originalEvent: Event;
  /** The new selection array after the change. */
  value: unknown[];
}

/**
 * Emitted whenever the filter query changes.
 */
export interface OrderListFilterEvent {
  /** The browser input event that triggered the filter update. */
  originalEvent: Event;
  /** The current filter query string. */
  query: string;
  /** The items that match the current filter. */
  filteredItems: unknown[];
}

/**
 * Emitted specifically after a drag-and-drop reorder.
 * Allows consumers to distinguish DnD reorders from button-triggered reorders.
 */
export interface OrderListDragDropEvent {
  /** Index in the original list from which the item was dragged. */
  previousIndex: number;
  /** Index in the resulting list where the item was dropped. */
  currentIndex: number;
  /** The full array of items after the drag-and-drop operation. */
  items: unknown[];
}

// ---------------------------------------------------------------------------
// Template context interfaces
// ---------------------------------------------------------------------------

/**
 * Context object passed to the item template (`[uiOrderListItem]`).
 * @template T — the type of the individual list item.
 */
export interface OrderListItemContext<T = unknown> {
  /** The item data for the current row. */
  $implicit: T;
  /** Zero-based index of the item within the visible list. */
  index: number;
  /** Whether this item is currently selected. */
  selected: boolean;
}

/**
 * Context object passed to the empty-state template (`[uiOrderListEmpty]`).
 */
export interface OrderListEmptyContext {
  /**
   * `true`  — the list is empty because the active filter matched no items.
   * `false` — the list is genuinely empty (no items provided at all).
   */
  filter: boolean;
}
