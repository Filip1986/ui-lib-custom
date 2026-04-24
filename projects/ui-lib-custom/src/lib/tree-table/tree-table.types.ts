/**
 * A single node in the TreeTable component.
 */
export interface TreeTableNode {
  /** Unique identifier. Required for tracking, selection, and expansion state. */
  key: string;
  /**
   * Column data keyed by field name.
   * Each entry maps a `field` string to its display value.
   */
  data?: Record<string, unknown>;
  /** Child nodes rendered as an indented sub-table beneath this row. */
  children?: TreeTableNode[];
  /**
   * Expansion state. `true` = expanded (children visible), `false` = collapsed.
   * Defaults to expanded when `undefined`.
   */
  expanded?: boolean;
  /**
   * When `true`, the node is treated as a leaf: no expand/collapse toggle is shown.
   */
  leaf?: boolean;
  /**
   * When `false`, the node row cannot be selected regardless of `selectionMode`.
   * Defaults to `true` when `undefined`.
   */
  selectable?: boolean;
  /** Extra CSS class applied to the row `<tr>` element. */
  styleClass?: string;
  /**
   * Internal flag: set to `true` when some but not all children are selected
   * in `checkbox` selection mode. Managed automatically by the TreeTable.
   */
  partialSelected?: boolean;
}

/** Design variant applied to the TreeTable. */
export type TreeTableVariant = 'material' | 'bootstrap' | 'minimal';

/** Size token controlling row padding, font size, and toggle dimensions. */
export type TreeTableSize = 'sm' | 'md' | 'lg';

/**
 * Row selection mode.
 * - `'single'`   — one row at a time; click toggles selection.
 * - `'multiple'` — multiple rows via click.
 * - `'checkbox'` — rows selected via a leading checkbox column, with cascade.
 * - `null`       — selection disabled.
 */
export type TreeTableSelectionMode = 'single' | 'multiple' | 'checkbox' | null;

/**
 * Column sort direction.
 * - `1`  — ascending
 * - `-1` — descending
 * - `0`  — unsorted
 */
export type TreeTableSortOrder = 1 | -1 | 0;

// ---------------------------------------------------------------------------
// Event payloads
// ---------------------------------------------------------------------------

/** Emitted when a node row is expanded. */
export interface TreeTableNodeExpandEvent {
  /** The originating DOM event. */
  originalEvent: Event;
  /** The node whose children became visible. */
  node: TreeTableNode;
}

/** Emitted when a node row is collapsed. */
export interface TreeTableNodeCollapseEvent {
  /** The originating DOM event. */
  originalEvent: Event;
  /** The node whose children were hidden. */
  node: TreeTableNode;
}

/** Emitted when a node row is selected or unselected. */
export interface TreeTableNodeSelectEvent {
  /** The originating DOM event. */
  originalEvent: Event;
  /** The node that was selected or unselected. */
  node: TreeTableNode;
}

/** Emitted when the active sort column or direction changes. */
export interface TreeTableSortEvent {
  /** The field being sorted. */
  field: string;
  /** The resulting sort order. */
  order: TreeTableSortOrder;
}

// ---------------------------------------------------------------------------
// Internal rendering
// ---------------------------------------------------------------------------

/**
 * A flattened representation of a visible tree row used for `@for` rendering.
 * Computed from the tree data based on current expansion state.
 */
export interface TreeTableFlatNode {
  /** The source node. */
  node: TreeTableNode;
  /** Zero-based nesting depth used for indentation. */
  depth: number;
}
