import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  contentChild,
  input,
} from '@angular/core';
import type { InputSignal, Signal } from '@angular/core';
import { TemplateRef } from '@angular/core';
import {
  TreeTableColumnBodyDirective,
  TreeTableColumnFooterDirective,
  TreeTableColumnHeaderDirective,
} from './tree-table-templates.directive';

/**
 * Defines a single column within a `<ui-lib-tree-table>`.
 *
 * Place cell templates as direct children using the
 * `[uiTreeTableColumnHeader]`, `[uiTreeTableColumnBody]`, and
 * `[uiTreeTableColumnFooter]` directives.
 *
 * @example
 * ```html
 * <ui-lib-tree-table [value]="nodes">
 *   <ui-lib-tree-table-column field="name" header="Name" [expander]="true" [sortable]="true">
 *     <ng-template uiTreeTableColumnBody let-node>
 *       <strong>{{ node.data?.name }}</strong>
 *     </ng-template>
 *   </ui-lib-tree-table-column>
 * </ui-lib-tree-table>
 * ```
 */
@Component({
  selector: 'ui-lib-tree-table-column',
  standalone: true,
  template: '<ng-content />',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class TreeTableColumnComponent {
  // ─── Data ──────────────────────────────────────────────────────────────────

  /**
   * Dot-notation property key used to read values from `TreeTableNode.data`.
   * Example: `'name'` reads `node.data?.name`.
   */
  public readonly field: InputSignal<string> = input<string>('');

  /** Text rendered in the column header when no `[uiTreeTableColumnHeader]` template is provided. */
  public readonly header: InputSignal<string> = input<string>('');

  /** Text rendered in the column footer when no `[uiTreeTableColumnFooter]` template is provided. */
  public readonly footer: InputSignal<string> = input<string>('');

  // ─── Behaviour ─────────────────────────────────────────────────────────────

  /**
   * When `true`, clicking the column header cycles sort order:
   * unsorted → ascending → descending → unsorted.
   */
  public readonly sortable: InputSignal<boolean> = input<boolean>(false);

  /**
   * When `true`, this column renders the expand/collapse toggle button and
   * depth-based indentation. Only one column should be marked as the expander.
   * If no column is marked, the first column acts as the expander.
   */
  public readonly expander: InputSignal<boolean> = input<boolean>(false);

  // ─── Layout ────────────────────────────────────────────────────────────────

  /**
   * Explicit column width, e.g. `'200px'` or `'30%'`.
   * When `null`, the column uses natural table-layout width.
   */
  public readonly width: InputSignal<string | null> = input<string | null>(null);

  /** When `true`, the column is frozen (sticky) on the left side of a scrollable table. */
  public readonly frozen: InputSignal<boolean> = input<boolean>(false);

  /** Additional CSS class(es) applied to every `<td>` and `<th>` in this column. */
  public readonly styleClass: InputSignal<string | null> = input<string | null>(null);

  // ─── Template queries ───────────────────────────────────────────────────────

  /** Custom header cell template. */
  public readonly headerTemplate: Signal<TemplateRef<unknown> | undefined> = contentChild(
    TreeTableColumnHeaderDirective,
    { read: TemplateRef }
  );

  /** Custom body cell template. Context: `{ $implicit: TreeTableNode, rowData: Record<string, unknown> }`. */
  public readonly bodyTemplate: Signal<TemplateRef<unknown> | undefined> = contentChild(
    TreeTableColumnBodyDirective,
    { read: TemplateRef }
  );

  /** Custom footer cell template. */
  public readonly footerTemplate: Signal<TemplateRef<unknown> | undefined> = contentChild(
    TreeTableColumnFooterDirective,
    { read: TemplateRef }
  );
}
