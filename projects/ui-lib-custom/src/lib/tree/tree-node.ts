import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  inject,
  input,
} from '@angular/core';
import type { InputSignal } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { TREE_CONTEXT } from './tree-context';
import type { TreeContext } from './tree-context';
import type { TreeNode } from './tree.types';

/**
 * Internal recursive component that renders a single tree node and its children.
 * Consumes TreeContext via dependency injection from the ancestor Tree component.
 * Not part of the public API — import Tree and TreeNodeTemplateDirective instead.
 */
@Component({
  selector: 'ui-lib-tree-node',
  standalone: true,
  // Self-referential import enables recursive rendering of child nodes.
  imports: [NgTemplateOutlet, TreeNodeComponent],
  templateUrl: './tree-node.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'ui-lib-tree-node',
  },
})
export class TreeNodeComponent {
  /** TreeContext provided by the parent Tree component. */
  protected readonly treeContext: TreeContext = inject(TREE_CONTEXT);

  /** The node data to render. */
  public readonly node: InputSignal<TreeNode> = input.required<TreeNode>();

  /** Nesting depth used for left-padding indentation. */
  public readonly depth: InputSignal<number> = input<number>(0);

  /** Returns `true` when the node has visible children to expand. */
  protected hasChildren(): boolean {
    const currentNode: TreeNode = this.node();
    return !currentNode.leaf && Boolean(currentNode.children?.length);
  }

  /** Returns the icon CSS class to display based on expanded state. */
  protected resolveNodeIcon(): string {
    const currentNode: TreeNode = this.node();
    if (this.hasChildren() && this.treeContext.isNodeExpanded(currentNode)) {
      return currentNode.expandedIcon ?? currentNode.icon ?? '';
    }
    return currentNode.collapsedIcon ?? currentNode.icon ?? '';
  }
}
