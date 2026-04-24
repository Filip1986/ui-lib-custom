// Public types
export type {
  TableVariant,
  TableSize,
  TableSortOrder,
  TableSelectionMode,
  TableFilterMatchMode,
  TableSortMeta,
  TableSortEvent,
  TableFilterEvent,
  TableRowSelectEvent,
  TableRowUnselectEvent,
  TableRowExpandEvent,
  TableRowCollapseEvent,
  TablePageEvent,
  TableRowContext,
  TableExpansionContext,
  TableCellContext,
  TableEmptyContext,
} from './table.types';

// Public constants
export { TABLE_DEFAULTS, TABLE_CLASSES } from './table.constants';

// Components
export { TableComponent } from './table.component';
export { TableColumnComponent } from './table-column.component';

// Template directives
export {
  TableCaptionDirective,
  TableHeaderDirective,
  TableBodyDirective,
  TableFooterDirective,
  TableEmptyDirective,
  TableExpansionDirective,
  TableColumnHeaderDirective,
  TableColumnBodyDirective,
  TableColumnFooterDirective,
  TableColumnFilterDirective,
} from './table-templates.directive';
