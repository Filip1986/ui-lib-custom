import {
  ChangeDetectionStrategy,
  Component,
  contentChild,
  input,
  TemplateRef,
  ViewEncapsulation,
} from '@angular/core';
import {
  TableColumnBodyDirective,
  TableColumnFilterDirective,
  TableColumnFooterDirective,
  TableColumnHeaderDirective,
} from './table-templates.directive';
import type { InputSignal, Signal } from '@angular/core';

/**
 * Defines a single column within a `<ui-lib-table>`.
 *
 * Place column-level cell templates as direct children using the
 * `[uiTableColumnHeader]`, `[uiTableColumnBody]`, `[uiTableColumnFooter]`,
 * and `[uiTableColumnFilter]` directives.
 *
 * @example
 * ```html
 * <ui-lib-table [value]="rows">
 *   <ui-lib-table-column field="name" header="Name" [sortable]="true">
 *     <ng-template uiTableColumnBody let-row>{{ row.name }}</ng-template>
 *   </ui-lib-table-column>
 * </ui-lib-table>
 * ```
 */
@Component({
  selector: 'ui-lib-table-column',
  standalone: true,
  template: '<ng-content />',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class TableColumnComponent {
  // ---------------------------------------------------------------------------
  // Data
  // ---------------------------------------------------------------------------

  /**
   * Dot-notation property path used to read cell values from a row object.
   * Example: `'address.city'`.
   */
  public readonly field: InputSignal<string> = input<string>('');

  /** Text rendered in the column header when no `[uiTableColumnHeader]` template is provided. */
  public readonly header: InputSignal<string> = input<string>('');

  /** Text rendered in the column footer when no `[uiTableColumnFooter]` template is provided. */
  public readonly footer: InputSignal<string> = input<string>('');

  // ---------------------------------------------------------------------------
  // Behaviour
  // ---------------------------------------------------------------------------

  /** When `true`, clicking the column header cycles through sort orders. */
  public readonly sortable: InputSignal<boolean> = input<boolean>(false);

  /**
   * Alternative field used for sorting when it differs from `field`.
   * Falls back to `field` when `null`.
   */
  public readonly sortField: InputSignal<string | null> = input<string | null>(null);

  /** When `true`, a per-column filter input is shown below the header. */
  public readonly filterable: InputSignal<boolean> = input<boolean>(false);

  /**
   * Alternative field used for filtering when it differs from `field`.
   * Falls back to `field` when `null`.
   */
  public readonly filterField: InputSignal<string | null> = input<string | null>(null);

  /** Placeholder text for the column filter input. */
  public readonly filterPlaceholder: InputSignal<string> = input<string>('Search...');

  // ---------------------------------------------------------------------------
  // Layout
  // ---------------------------------------------------------------------------

  /**
   * Explicit column width, e.g. `'200px'` or `'20%'`.
   * When `null`, the column takes natural table-layout width.
   */
  public readonly width: InputSignal<string | null> = input<string | null>(null);

  /** When `true`, the column is frozen (sticky) on the left side of a scrollable table. */
  public readonly frozen: InputSignal<boolean> = input<boolean>(false);

  /** Additional CSS class(es) applied to every `<td>` and `<th>` in this column. */
  public readonly styleClass: InputSignal<string | null> = input<string | null>(null);

  /**
   * When `true`, the column spans only the checkbox / expansion indicator area.
   * Set internally by the host; do not configure manually.
   */
  public readonly isSelectionColumn: InputSignal<boolean> = input<boolean>(false);

  /** When `true`, this column is a row-expansion toggle column. */
  public readonly isExpansionColumn: InputSignal<boolean> = input<boolean>(false);

  // ---------------------------------------------------------------------------
  // Template queries
  // ---------------------------------------------------------------------------

  /** Custom header cell template. Context: none. */
  public readonly headerTemplate: Signal<TemplateRef<unknown> | undefined> = contentChild(
    TableColumnHeaderDirective,
    { read: TemplateRef }
  );

  /** Custom body cell template. Context: `TableCellContext<T>`. */
  public readonly bodyTemplate: Signal<TemplateRef<unknown> | undefined> = contentChild(
    TableColumnBodyDirective,
    { read: TemplateRef }
  );

  /** Custom footer cell template. Context: none. */
  public readonly footerTemplate: Signal<TemplateRef<unknown> | undefined> = contentChild(
    TableColumnFooterDirective,
    { read: TemplateRef }
  );

  /** Custom filter template. Context: none. */
  public readonly filterTemplate: Signal<TemplateRef<unknown> | undefined> = contentChild(
    TableColumnFilterDirective,
    { read: TemplateRef }
  );
}
