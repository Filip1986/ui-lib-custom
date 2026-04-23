import type { Signal, TemplateRef } from '@angular/core';
import { InjectionToken } from '@angular/core';
import type {
  OrganizationChartNode,
  OrganizationChartSelectionMode,
} from './organization-chart.types';

/**
 * Interface implemented by `OrganizationChart` and consumed by
 * `OrganizationChartNodeComponent` via DI to avoid threading inputs
 * through every level of the recursive tree.
 */
export interface OrganizationChartContext {
  /** Current selection mode. */
  selectionMode: Signal<OrganizationChartSelectionMode>;
  /** Whether nodes with children show an expand/collapse toggle. */
  collapsible: Signal<boolean>;
  /**
   * Returns the registered `TemplateRef` for the given node's `type`,
   * or the `'default'` template, or `null` if none is registered.
   */
  getTemplateForNode: (
    node: OrganizationChartNode
  ) => TemplateRef<{ $implicit: OrganizationChartNode }> | null;
  /** Handles a node cell click: updates selection and emits outputs. */
  handleNodeClick: (event: MouseEvent, node: OrganizationChartNode) => void;
  /** Handles the expand/collapse toggle button: mutates `node.expanded` and emits outputs. */
  handleNodeToggle: (event: MouseEvent, node: OrganizationChartNode) => void;
  /** Returns `true` when the given node is part of the current selection. */
  isNodeSelected: (node: OrganizationChartNode) => boolean;
  /**
   * Returns `true` when the node's subtree should be visible.
   * Reads the internal reactive tick so template bindings re-evaluate
   * after `handleNodeToggle` mutates `node.expanded`.
   */
  isNodeExpanded: (node: OrganizationChartNode) => boolean;
}

/** DI token used to inject the parent `OrganizationChart` into descendant node components. */
export const ORGANIZATION_CHART_CONTEXT: InjectionToken<OrganizationChartContext> =
  new InjectionToken<OrganizationChartContext>('OrganizationChartContext');
