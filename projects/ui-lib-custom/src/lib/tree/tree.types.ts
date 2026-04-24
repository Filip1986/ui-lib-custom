/**
 * Represents a single node in the Tree component.
 */
export interface TreeNode {
  /** Unique identifier for the node. Used for selection and tracking. */
  key: string;
  /** Display label rendered inside the node row. */
  label?: string;
  /** Arbitrary consumer data attached to the node. */
  data?: unknown;
  /**
   * Template type selector. Maps to a registered `uiTreeNode` template
   * directive with a matching `type` input. Falls back to `'default'`.
   */
  type?: string;
  /** CSS class for the node icon when collapsed (or always, if no expandedIcon). */
  icon?: string;
  /** CSS class for the icon when the node is expanded. Overrides `icon`. */
  expandedIcon?: string;
  /** CSS class for the icon when the node is collapsed. Overrides `icon`. */
  collapsedIcon?: string;
  /**
   * Controls subtree visibility. `true` = expanded, `false` = collapsed.
   * Defaults to expanded when `undefined`.
   */
  expanded?: boolean;
  /**
   * When `true`, the node is treated as a leaf — no expand/collapse toggle is shown.
   * Defaults to `false` when `undefined`.
   */
  leaf?: boolean;
  /**
   * When `false`, the node cannot be selected regardless of `selectionMode`.
   * Defaults to `true` when `undefined`.
   */
  selectable?: boolean;
  /** Extra CSS class applied to the node row element. */
  styleClass?: string;
  /** Child nodes rendered beneath this node. */
  children?: TreeNode[];
  /**
   * Internal flag: set to `true` when some but not all children are selected
   * in `checkbox` selection mode. Managed automatically by the Tree component.
   */
  partialSelected?: boolean;
}

/** Controls how nodes respond to click/checkbox interactions. */
export type TreeSelectionMode = 'single' | 'multiple' | 'checkbox' | null;

/** Design variant applied to the tree. */
export type TreeVariant = 'material' | 'bootstrap' | 'minimal';

/** Size applied to tree node rows. */
export type TreeSize = 'sm' | 'md' | 'lg';

/** Filter matching strategy. */
export type TreeFilterMode = 'lenient' | 'strict';

/** Emitted when a node is selected or unselected. */
export interface TreeNodeSelectEvent {
  /** The original browser event. */
  originalEvent: Event;
  /** The node that was selected or unselected. */
  node: TreeNode;
}

/** Emitted when a node's subtree is expanded. */
export interface TreeNodeExpandEvent {
  /** The original browser mouse event. */
  originalEvent: MouseEvent;
  /** The node whose subtree was expanded. */
  node: TreeNode;
}

/** Emitted when a node's subtree is collapsed. */
export interface TreeNodeCollapseEvent {
  /** The original browser mouse event. */
  originalEvent: MouseEvent;
  /** The node whose subtree was collapsed. */
  node: TreeNode;
}
