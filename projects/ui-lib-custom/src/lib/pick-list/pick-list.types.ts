/**
 * Theme variant for the PickList component.
 */
export type PickListVariant = 'material' | 'bootstrap' | 'minimal';

/**
 * Size token for the PickList component.
 */
export type PickListSize = 'sm' | 'md' | 'lg';

/**
 * Strategy used when filtering list items.
 * - `'contains'`   — item field contains the query string (case-insensitive).
 * - `'startsWith'` — item field starts with the query string (case-insensitive).
 * - `'endsWith'`   — item field ends with the query string (case-insensitive).
 * - `'equals'`     — item field exactly matches the query string (case-insensitive).
 */
export type PickListFilterMatchMode = 'contains' | 'startsWith' | 'endsWith' | 'equals';

// ---------------------------------------------------------------------------
// Event payload interfaces
// ---------------------------------------------------------------------------

/**
 * Emitted when selected source items are moved to the target list.
 */
export interface PickListMoveToTargetEvent {
  /** The items transferred to the target list. */
  items: unknown[];
}

/**
 * Emitted when selected target items are moved to the source list.
 */
export interface PickListMoveToSourceEvent {
  /** The items transferred to the source list. */
  items: unknown[];
}

/**
 * Emitted when all source items are moved to the target list.
 */
export interface PickListMoveAllToTargetEvent {
  /** The items transferred to the target list. */
  items: unknown[];
}

/**
 * Emitted when all target items are moved to the source list.
 */
export interface PickListMoveAllToSourceEvent {
  /** The items transferred to the source list. */
  items: unknown[];
}

/**
 * Emitted when the selection changes in either list.
 */
export interface PickListSelectionChangeEvent {
  /** The browser event that triggered the change, if any. */
  originalEvent?: Event;
  /** The new selection array. */
  value: unknown[];
}

/**
 * Emitted when a filter query changes.
 */
export interface PickListFilterEvent {
  /** The current filter query string. */
  query: string;
  /** The items that match the current filter. */
  filteredItems: unknown[];
}

/**
 * Emitted after a reorder operation within the source or target list.
 */
export interface PickListReorderEvent {
  /** Which list was reordered. */
  list: 'source' | 'target';
  /** The full array of items after reordering. */
  items: unknown[];
  /** Index of the moved item(s) before the operation. */
  previousIndex: number;
  /** Index of the moved item(s) after the operation. */
  currentIndex: number;
}

// ---------------------------------------------------------------------------
// Template context interfaces
// ---------------------------------------------------------------------------

/**
 * Context object passed to the item template (`[uiPickListItem]`).
 * @template T - the type of the individual list item.
 */
export interface PickListItemContext<T = unknown> {
  /** The item data for the current row. */
  $implicit: T;
  /** Zero-based index of the item within the visible list. */
  index: number;
  /** Whether this item is currently selected. */
  selected: boolean;
}

/**
 * Context object passed to the empty-state template (`[uiPickListEmpty]`).
 */
export interface PickListEmptyContext {
  /**
   * `true`  — the list is empty because the active filter matched no items.
   * `false` — the list is genuinely empty (no items provided at all).
   */
  filter: boolean;
}
