import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  computed,
  inject,
  input,
} from '@angular/core';
import type { InputSignal, Signal, TemplateRef } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { ORGANIZATION_CHART_CONTEXT } from './organization-chart-context';
import type { OrganizationChartContext } from './organization-chart-context';
import type { OrganizationChartNode } from './organization-chart.types';

/**
 * Internal recursive node component for `OrganizationChart`.
 * Renders a single node cell plus its children, self-referencing
 * to achieve arbitrary tree depth.
 *
 * @internal Do not use directly. Import `OrganizationChart` instead.
 */
@Component({
  selector: 'ui-lib-organization-chart-node',
  standalone: true,
  imports: [NgTemplateOutlet, OrganizationChartNodeComponent],
  templateUrl: './organization-chart-node.html',
  styleUrl: './organization-chart-node.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'uilib-org-chart-node-wrapper',
  },
})
export class OrganizationChartNodeComponent {
  /** The node data to render. */
  public readonly node: InputSignal<OrganizationChartNode> =
    input.required<OrganizationChartNode>();

  /**
   * Depth level from the root (0 = root nodes).
   * Used to set tabindex="0" on the first root-level node only.
   */
  public readonly nodeIndex: InputSignal<number> = input<number>(0);

  /** Injected parent context providing shared state and callbacks. */
  protected readonly ctx: OrganizationChartContext = inject(ORGANIZATION_CHART_CONTEXT);

  /** Whether this node has at least one child. */
  protected readonly hasChildren: Signal<boolean> = computed<boolean>(
    (): boolean => (this.node().children?.length ?? 0) > 0
  );

  /** Whether this node's subtree is currently visible. */
  protected readonly isExpanded: Signal<boolean> = computed<boolean>((): boolean =>
    this.ctx.isNodeExpanded(this.node())
  );

  /** Whether this node is currently selected. */
  protected readonly isSelected: Signal<boolean> = computed<boolean>((): boolean =>
    this.ctx.isNodeSelected(this.node())
  );

  /** Whether this node participates in selection interactions. */
  protected readonly isSelectable: Signal<boolean> = computed<boolean>(
    (): boolean => Boolean(this.ctx.selectionMode()) && this.node().selectable !== false
  );

  /** tabindex: 0 for root nodes, -1 for all descendants. */
  protected readonly tabIndex: Signal<number> = computed<number>((): number =>
    this.nodeIndex() === 0 ? 0 : -1
  );

  /** The TemplateRef registered for this node's type, or null. */
  protected readonly resolvedTemplate: Signal<TemplateRef<{
    $implicit: OrganizationChartNode;
  }> | null> = computed<TemplateRef<{ $implicit: OrganizationChartNode }> | null>(
    (): TemplateRef<{ $implicit: OrganizationChartNode }> | null =>
      this.ctx.getTemplateForNode(this.node())
  );

  /** Template context passed to NgTemplateOutlet. */
  protected readonly nodeContext: Signal<{ $implicit: OrganizationChartNode }> = computed<{
    $implicit: OrganizationChartNode;
  }>((): { $implicit: OrganizationChartNode } => ({ $implicit: this.node() }));

  /** Handles click on the node cell for selection. */
  protected onNodeClick(event: MouseEvent): void {
    this.ctx.handleNodeClick(event, this.node());
  }

  /** Handles Enter/Space keyboard events on the node cell. */
  protected onNodeKeydown(event: Event): void {
    event.preventDefault();
    this.ctx.handleNodeClick(event as MouseEvent, this.node());
  }

  /** Handles click on the expand/collapse toggle button. */
  protected onToggleClick(event: MouseEvent): void {
    event.stopPropagation();
    this.ctx.handleNodeToggle(event, this.node());
  }

  /** Handles Enter/Space keyboard events on the toggle button. */
  protected onToggleKeydown(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    this.ctx.handleNodeToggle(event as MouseEvent, this.node());
  }
}
