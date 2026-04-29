import type {
  TreeNode,
  TreeNodeCollapseEvent,
  TreeNodeExpandEvent,
  TreeNodeSelectEvent,
} from 'ui-lib-custom/tree';

export type { TreeNode, TreeNodeSelectEvent, TreeNodeExpandEvent, TreeNodeCollapseEvent };

/** Design variant applied to the TreeSelect component. */
export type TreeSelectVariant = 'material' | 'bootstrap' | 'minimal';

/** Size applied to the TreeSelect trigger and panel. */
export type TreeSelectSize = 'sm' | 'md' | 'lg';

/** Controls how nodes respond to click/checkbox interactions inside the panel. */
export type TreeSelectSelectionMode = 'single' | 'multiple' | 'checkbox';

/** Emitted when the selection changes. */
export interface TreeSelectChangeEvent {
  /** The original browser event if triggered by user interaction, or null. */
  originalEvent: Event | null;
  /** The new selection value (node or array of nodes). */
  value: TreeNode | TreeNode[] | null;
}

/** Emitted when the panel becomes visible. */
export interface TreeSelectShowEvent {
  /** The original browser event. */
  originalEvent: Event;
}

/** Emitted when the panel becomes hidden. */
export interface TreeSelectHideEvent {
  /** The original browser event or null for programmatic close. */
  originalEvent: Event | null;
}
