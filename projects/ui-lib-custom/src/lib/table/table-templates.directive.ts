import { Directive } from '@angular/core';

// ---------------------------------------------------------------------------
// Table-level slot directives
// ---------------------------------------------------------------------------

/**
 * Marks an `<ng-template>` as the caption/toolbar slot rendered above the table.
 *
 * @example
 * ```html
 * <ng-template uiTableCaption>
 *   <h3>My Data</h3>
 * </ng-template>
 * ```
 */
@Directive({ selector: '[uiTableCaption]', standalone: true })
export class TableCaptionDirective {}

/**
 * Marks an `<ng-template>` as a fully custom header row.
 * When present, auto-generated column headers are replaced entirely.
 *
 * Context: none.
 */
@Directive({ selector: '[uiTableHeader]', standalone: true })
export class TableHeaderDirective {}

/**
 * Marks an `<ng-template>` as a fully custom body (all rows).
 * When present, auto-generated rows are replaced entirely.
 *
 * Context: none (the template is responsible for iterating `value`).
 */
@Directive({ selector: '[uiTableBody]', standalone: true })
export class TableBodyDirective {}

/**
 * Marks an `<ng-template>` as a fully custom footer row.
 * When present, auto-generated column footers are replaced entirely.
 *
 * Context: none.
 */
@Directive({ selector: '[uiTableFooter]', standalone: true })
export class TableFooterDirective {}

/**
 * Marks an `<ng-template>` as the empty-state slot, shown when there are no
 * rows to display (either the value is empty or all rows are filtered out).
 *
 * Context: `TableEmptyContext` — `{ filtered: boolean }`.
 */
@Directive({ selector: '[uiTableEmpty]', standalone: true })
export class TableEmptyDirective {}

/**
 * Marks an `<ng-template>` as the row-expansion slot.
 * Rendered inside a full-width `<tr>` below the expanded row.
 *
 * Context: `TableExpansionContext<T>` — `{ $implicit: T; index: number }`.
 */
@Directive({ selector: '[uiTableExpansion]', standalone: true })
export class TableExpansionDirective {}

// ---------------------------------------------------------------------------
// Column-level cell template directives
// (placed inside <ui-lib-table-column> elements)
// ---------------------------------------------------------------------------

/**
 * Marks an `<ng-template>` as the custom header cell for a column.
 * Place inside `<ui-lib-table-column>`.
 *
 * Context: none.
 */
@Directive({ selector: '[uiTableColumnHeader]', standalone: true })
export class TableColumnHeaderDirective {}

/**
 * Marks an `<ng-template>` as the custom body cell for a column.
 * Place inside `<ui-lib-table-column>`.
 *
 * Context: `TableCellContext<T>` — `{ $implicit: T; index: number }`.
 */
@Directive({ selector: '[uiTableColumnBody]', standalone: true })
export class TableColumnBodyDirective {}

/**
 * Marks an `<ng-template>` as the custom footer cell for a column.
 * Place inside `<ui-lib-table-column>`.
 *
 * Context: none.
 */
@Directive({ selector: '[uiTableColumnFooter]', standalone: true })
export class TableColumnFooterDirective {}

/**
 * Marks an `<ng-template>` as the custom filter widget for a column.
 * Place inside `<ui-lib-table-column>`.
 *
 * Context: none.
 */
@Directive({ selector: '[uiTableColumnFilter]', standalone: true })
export class TableColumnFilterDirective {}
