// Public types
export type {
  TableCellContext,
  TableEmptyContext,
  TableExpansionContext,
  TableFilterEvent,
  TableFilterMatchMode,
  TablePageEvent,
  TableRowCollapseEvent,
  TableRowContext,
  TableRowExpandEvent,
  TableRowSelectEvent,
  TableRowUnselectEvent,
  TableSelectionMode,
  TableSize,
  TableSortEvent,
  TableSortMeta,
  TableSortOrder,
  TableVariant,
} from './table.types';

// Public constants
export { TABLE_CLASSES, TABLE_DEFAULTS } from './table.constants';

// Components
export { TableComponent } from './table.component';
export { TableColumnComponent } from './table-column.component';

// Template directives
export {
  TableBodyDirective,
  TableCaptionDirective,
  TableColumnBodyDirective,
  TableColumnFilterDirective,
  TableColumnFooterDirective,
  TableColumnHeaderDirective,
  TableEmptyDirective,
  TableExpansionDirective,
  TableFooterDirective,
  TableHeaderDirective,
} from './table-templates.directive';
