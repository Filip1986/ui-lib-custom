/**
 * Represents a single node in the organization chart tree.
 */
export interface OrganizationChartNode {
  /** Unique identifier for the node. Used for selection and tracking. */
  key: string;
  /** Display label rendered inside the node cell. */
  label?: string;
  /**
   * Template type selector. Maps to a registered `uiOrgChartNode` template
   * directive with a matching `type` input. Falls back to `'default'`.
   */
  type?: string;
  /** Arbitrary consumer data attached to the node. */
  data?: unknown;
  /**
   * Controls subtree visibility. `true` = expanded, `false` = collapsed.
   * Defaults to expanded when `undefined`.
   */
  expanded?: boolean;
  /**
   * When `false`, the node cannot be selected regardless of `selectionMode`.
   * Defaults to `true` when `undefined`.
   */
  selectable?: boolean;
  /** Extra CSS class applied to the node cell element. */
  styleClass?: string;
  /** Child nodes rendered beneath this node. */
  children?: OrganizationChartNode[];
}

/** Controls how nodes respond to click interactions. */
export type OrganizationChartSelectionMode = 'single' | 'multiple' | null;

/** Design variant applied to the chart. */
export type OrganizationChartVariant = 'material' | 'bootstrap' | 'minimal';

/** Emitted when a node is selected or unselected. */
export interface OrganizationChartNodeSelectEvent {
  /** The original browser mouse event. */
  originalEvent: MouseEvent;
  /** The node that was selected or unselected. */
  node: OrganizationChartNode;
}

/** Emitted when a node subtree is expanded or collapsed. */
export interface OrganizationChartNodeExpandEvent {
  /** The original browser mouse event. */
  originalEvent: MouseEvent;
  /** The node whose subtree was toggled. */
  node: OrganizationChartNode;
}
