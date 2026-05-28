import {
  ChangeDetectionStrategy,
  Component,
  Directive,
  contentChild,
  input,
  TemplateRef,
  ViewEncapsulation,
} from '@angular/core';
import type { InputSignal, Signal } from '@angular/core';
import type { DataGridFrozen } from './data-grid.types';

// ---------------------------------------------------------------------------
// Column-level template directives
// ---------------------------------------------------------------------------

/** Marks a template as the custom header cell for a `<ui-lib-data-grid-column>`. */
@Directive({ selector: '[uiDataGridColumnHeader]', standalone: true })
export class DataGridColumnHeaderDirective {}

/** Marks a template as the custom body cell for a `<ui-lib-data-grid-column>`. */
@Directive({ selector: '[uiDataGridColumnBody]', standalone: true })
export class DataGridColumnBodyDirective {}

/** Marks a template as the inline cell editor for a `<ui-lib-data-grid-column>`. */
@Directive({ selector: '[uiDataGridColumnEditor]', standalone: true })
export class DataGridColumnEditorDirective {}

/** Marks a template as the custom footer cell for a `<ui-lib-data-grid-column>`. */
@Directive({ selector: '[uiDataGridColumnFooter]', standalone: true })
export class DataGridColumnFooterDirective {}

/** Marks a template as the column filter widget for a `<ui-lib-data-grid-column>`. */
@Directive({ selector: '[uiDataGridColumnFilter]', standalone: true })
export class DataGridColumnFilterDirective {}

// ---------------------------------------------------------------------------
// Column definition component
// ---------------------------------------------------------------------------

/**
 * Declarative column definition for `<ui-lib-data-grid>`.
 *
 * This render-less component supplies column metadata and optional cell
 * templates to the parent grid via `contentChildren`.
 *
 * @example
 * ```html
 * <ui-lib-data-grid [value]="rows" dataKey="id">
 *   <ui-lib-data-grid-column field="name"  header="Name"  [sortable]="true" width="200px" />
 *   <ui-lib-data-grid-column field="email" header="Email" [filterable]="true" />
 *   <ui-lib-data-grid-column field="role"  header="Role"  frozen="end">
 *     <ng-template uiDataGridColumnBody let-row>
 *       <ui-lib-tag [value]="row.role" />
 *     </ng-template>
 *   </ui-lib-data-grid-column>
 * </ui-lib-data-grid>
 * ```
 */
@Component({
  selector: 'ui-lib-data-grid-column',
  standalone: true,
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class DataGridColumnComponent {
  // ---------------------------------------------------------------------------
  // Data / identification
  // ---------------------------------------------------------------------------

  /** Dot-notation property path used to read cell values from a row object. */
  public readonly field: InputSignal<string> = input<string>('');

  /** Text rendered in the column header when no `[uiDataGridColumnHeader]` template is provided. */
  public readonly header: InputSignal<string> = input<string>('');

  /** Text rendered in the column footer when no `[uiDataGridColumnFooter]` template is provided. */
  public readonly footer: InputSignal<string> = input<string>('');

  // ---------------------------------------------------------------------------
  // Sort / filter
  // ---------------------------------------------------------------------------

  /** When `true`, clicking the column header cycles through sort orders. */
  public readonly sortable: InputSignal<boolean> = input<boolean>(false);

  /**
   * Alternative field used for sorting when it differs from `field`.
   * Falls back to `field` when `null`.
   */
  public readonly sortField: InputSignal<string | null> = input<string | null>(null);

  /** When `true`, a per-column filter input is rendered below the header. */
  public readonly filterable: InputSignal<boolean> = input<boolean>(false);

  /**
   * Alternative field used for filtering when it differs from `field`.
   * Falls back to `field` when `null`.
   */
  public readonly filterField: InputSignal<string | null> = input<string | null>(null);

  /** Placeholder for the column filter input. */
  public readonly filterPlaceholder: InputSignal<string> = input<string>('');

  // ---------------------------------------------------------------------------
  // Layout / pinning / resizing
  // ---------------------------------------------------------------------------

  /**
   * Explicit column width, e.g. `'200px'` or `'15%'`.
   * When `null`, the column takes its natural table-layout width.
   */
  public readonly width: InputSignal<string | null> = input<string | null>(null);

  /**
   * Minimum column width enforced during resize, e.g. `'80px'`.
   * When `null`, the global `DATA_GRID_DEFAULTS.MIN_COLUMN_WIDTH` applies.
   */
  public readonly minWidth: InputSignal<string | null> = input<string | null>(null);

  /**
   * Pin this column to the start or end edge of the scrollable viewport.
   * - `'start'` — sticky to the inline-start edge.
   * - `'end'`   — sticky to the inline-end edge.
   * - `false`   — column scrolls with the content (default).
   */
  public readonly frozen: InputSignal<DataGridFrozen> = input<DataGridFrozen>(false);

  /**
   * When `true`, the user can resize this column by dragging its header edge.
   * Inherits from the grid-level `resizableColumns` when `null`.
   */
  public readonly resizable: InputSignal<boolean | null> = input<boolean | null>(null);

  // ---------------------------------------------------------------------------
  // Cell editing
  // ---------------------------------------------------------------------------

  /**
   * When `true`, this column's cells are editable (requires `editMode` on the grid).
   * If a `[uiDataGridColumnEditor]` template is present, it is used as the cell editor;
   * otherwise a plain text input is rendered.
   */
  public readonly editable: InputSignal<boolean> = input<boolean>(false);

  // ---------------------------------------------------------------------------
  // Appearance
  // ---------------------------------------------------------------------------

  /** Additional CSS class(es) applied to every `<td>` and `<th>` in this column. */
  public readonly styleClass: InputSignal<string | null> = input<string | null>(null);

  // ---------------------------------------------------------------------------
  // Internal / special columns
  // ---------------------------------------------------------------------------

  /**
   * Marks this as the built-in checkbox / radio selection column.
   * Set programmatically by the parent grid — do not use this in templates.
   */
  public readonly isSelectionColumn: InputSignal<boolean> = input<boolean>(false);

  // ---------------------------------------------------------------------------
  // Template queries
  // ---------------------------------------------------------------------------

  /** Custom column header template. Context: none. */
  public readonly headerTemplate: Signal<TemplateRef<unknown> | undefined> = contentChild(
    DataGridColumnHeaderDirective,
    { read: TemplateRef },
  );

  /** Custom body cell template. Context: `DataGridCellContext<T>`. */
  public readonly bodyTemplate: Signal<TemplateRef<unknown> | undefined> = contentChild(
    DataGridColumnBodyDirective,
    { read: TemplateRef },
  );

  /** Inline cell editor template. Context: `DataGridEditorContext<T>`. */
  public readonly editorTemplate: Signal<TemplateRef<unknown> | undefined> = contentChild(
    DataGridColumnEditorDirective,
    { read: TemplateRef },
  );

  /** Custom column footer template. Context: none. */
  public readonly footerTemplate: Signal<TemplateRef<unknown> | undefined> = contentChild(
    DataGridColumnFooterDirective,
    { read: TemplateRef },
  );

  /** Custom column filter template. Context: none. */
  public readonly filterTemplate: Signal<TemplateRef<unknown> | undefined> = contentChild(
    DataGridColumnFilterDirective,
    { read: TemplateRef },
  );
}
