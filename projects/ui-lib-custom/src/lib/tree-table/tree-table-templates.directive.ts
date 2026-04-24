import { Directive } from '@angular/core';

/**
 * Marks an `<ng-template>` as the custom header cell for a `<ui-lib-tree-table-column>`.
 *
 * @example
 * ```html
 * <ui-lib-tree-table-column field="name" header="Name">
 *   <ng-template uiTreeTableColumnHeader>
 *     <strong>Name</strong>
 *   </ng-template>
 * </ui-lib-tree-table-column>
 * ```
 */
@Directive({
  selector: '[uiTreeTableColumnHeader]',
  standalone: true,
})
export class TreeTableColumnHeaderDirective {}

/**
 * Marks an `<ng-template>` as the custom body cell for a `<ui-lib-tree-table-column>`.
 * Template context: `{ $implicit: TreeTableNode, rowData: Record<string, unknown> }`.
 *
 * @example
 * ```html
 * <ui-lib-tree-table-column field="size">
 *   <ng-template uiTreeTableColumnBody let-node>
 *     {{ node.data?.size | fileSize }}
 *   </ng-template>
 * </ui-lib-tree-table-column>
 * ```
 */
@Directive({
  selector: '[uiTreeTableColumnBody]',
  standalone: true,
})
export class TreeTableColumnBodyDirective {}

/**
 * Marks an `<ng-template>` as the custom footer cell for a `<ui-lib-tree-table-column>`.
 *
 * @example
 * ```html
 * <ui-lib-tree-table-column field="size">
 *   <ng-template uiTreeTableColumnFooter>Total: 1.2 GB</ng-template>
 * </ui-lib-tree-table-column>
 * ```
 */
@Directive({
  selector: '[uiTreeTableColumnFooter]',
  standalone: true,
})
export class TreeTableColumnFooterDirective {}
