import { Directive, inject, input } from '@angular/core';
import { TemplateRef } from '@angular/core';
import type { InputSignal } from '@angular/core';
import type { TreeNode } from './tree.types';

/**
 * Content template directive for custom node rendering in the Tree.
 * Register one or more templates keyed by `uiTreeNodeType` to override
 * specific node types; use the unkeyed form (or `uiTreeNodeType="default"`)
 * as a catch-all.
 *
 * @example
 * ```html
 * <ui-lib-tree [value]="nodes">
 *   <ng-template uiTreeNode let-node>
 *     <strong>{{ node.label }}</strong>
 *   </ng-template>
 *
 *   <ng-template uiTreeNode uiTreeNodeType="folder" let-node>
 *     <i class="pi pi-folder"></i> {{ node.label }}
 *   </ng-template>
 * </ui-lib-tree>
 * ```
 */
@Directive({
  selector: '[uiTreeNode]',
  standalone: true,
})
export class TreeNodeTemplateDirective {
  /**
   * Template type key. Matched against `TreeNode.type`.
   * Defaults to `'default'`.
   */
  public readonly type: InputSignal<string> = input<string>('default', {
    alias: 'uiTreeNodeType',
  });

  /** The injected template reference. */
  public readonly templateRef: TemplateRef<{ $implicit: TreeNode }> =
    inject<TemplateRef<{ $implicit: TreeNode }>>(TemplateRef);
}
