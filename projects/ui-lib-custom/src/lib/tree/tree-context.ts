import { InjectionToken } from '@angular/core';
import type { TemplateRef } from '@angular/core';
import type { TreeNode, TreeSelectionMode } from './tree.types';

/**
 * Interface that TreeNodeComponent consumes from its ancestor Tree.
 * Injected via the TREE_CONTEXT token.
 */
export interface TreeContext {
  /** Returns the current selection mode. */
  selectionMode(): TreeSelectionMode;
  /** Returns `true` when the given node is in the current selection. */
  isNodeSelected(node: TreeNode): boolean;
  /** Returns `true` when the node is partially selected (checkbox mode only). */
  isNodePartiallySelected(node: TreeNode): boolean;
  /** Returns `true` when the node's subtree should be rendered. */
  isNodeExpanded(node: TreeNode): boolean;
  /** Returns `true` when the node matches the active filter (or filter is empty). */
  isNodeFiltered(node: TreeNode): boolean;
  /** Handles a click on the node's label area. */
  handleNodeClick(event: Event, node: TreeNode): void;
  /** Handles the expand/collapse toggle button click. */
  handleNodeToggle(event: MouseEvent, node: TreeNode): void;
  /** Handles checkbox interaction in checkbox selection mode. */
  handleCheckboxToggle(event: Event, node: TreeNode): void;
  /** Returns the template registered for the node's type, or `null`. */
  getTemplateForNode(node: TreeNode): TemplateRef<{ $implicit: TreeNode }> | null;
}

/** DI token for TreeContext. Provided by the Tree component. */
export const TREE_CONTEXT: InjectionToken<TreeContext> = new InjectionToken<TreeContext>(
  'TreeContext'
);
