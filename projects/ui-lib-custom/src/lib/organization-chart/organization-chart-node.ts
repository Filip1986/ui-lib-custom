import { NgTemplateOutlet } from '@angular/common';
import type { InputSignal, Signal, TemplateRef } from '@angular/core';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  ViewEncapsulation,
} from '@angular/core';

import { UiLibI18nService } from 'ui-lib-custom/i18n';

import type { OrganizationChartNode } from './organization-chart.types';
import type { OrganizationChartContext } from './organization-chart-context';
import { ORGANIZATION_CHART_CONTEXT } from './organization-chart-context';

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
  protected readonly i18n: UiLibI18nService = inject(UiLibI18nService);

  /** The node data to render. */
  public readonly node: InputSignal<OrganizationChartNode> =
    input.required<OrganizationChartNode>();

  /** Depth level from the root (0 = root nodes). */
  public readonly depth: InputSignal<number> = input<number>(0);

  /** Total number of siblings at this level (`aria-setsize`). */
  public readonly setsize: InputSignal<number> = input<number>(1);

  /** 1-based node position in its sibling group (`aria-posinset`). */
  public readonly posinset: InputSignal<number> = input<number>(1);

  /** Injected parent context providing shared state and callbacks. */
  protected readonly ctx: OrganizationChartContext = inject(ORGANIZATION_CHART_CONTEXT);

  /** Whether this node has at least one child. */
  protected readonly hasChildren: Signal<boolean> = computed<boolean>(
    (): boolean => (this.node().children?.length ?? 0) > 0,
  );

  /** Whether this node's subtree is currently visible. */
  protected readonly isExpanded: Signal<boolean> = computed<boolean>((): boolean =>
    this.ctx.isNodeExpanded(this.node()),
  );

  /** Whether this node is currently selected. */
  protected readonly isSelected: Signal<boolean> = computed<boolean>((): boolean =>
    this.ctx.isNodeSelected(this.node()),
  );

  /** Whether this node participates in selection interactions. */
  protected readonly isSelectable: Signal<boolean> = computed<boolean>(
    (): boolean => Boolean(this.ctx.selectionMode()) && this.node().selectable !== false,
  );

  /** tabindex: 0 for first root node, -1 for all others. */
  protected readonly tabIndex: Signal<number> = computed<number>((): number =>
    this.depth() === 0 && this.posinset() === 1 ? 0 : -1,
  );

  /** The TemplateRef registered for this node's type, or null. */
  protected readonly resolvedTemplate: Signal<TemplateRef<{
    $implicit: OrganizationChartNode;
  }> | null> = computed<TemplateRef<{ $implicit: OrganizationChartNode }> | null>(
    (): TemplateRef<{ $implicit: OrganizationChartNode }> | null =>
      this.ctx.getTemplateForNode(this.node()),
  );

  /** Template context passed to NgTemplateOutlet. */
  protected readonly nodeContext: Signal<{ $implicit: OrganizationChartNode }> = computed<{
    $implicit: OrganizationChartNode;
  }>((): { $implicit: OrganizationChartNode } => ({ $implicit: this.node() }));

  /** Handles click or keyboard activation (Enter / Space) on the node cell. */
  protected onNodeClick(event: MouseEvent): void {
    this.ctx.handleNodeClick(event, this.node());
  }

  /**
   * Handles Enter / Space keydown on the node cell.
   * Stops propagation so the parent tree keydown handler does not double-fire `.click()`.
   */
  protected onNodeKeydown(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    // Cast is intentional: the event is stored as `originalEvent` in outputs only.
    this.ctx.handleNodeClick(event as unknown as MouseEvent, this.node());
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
