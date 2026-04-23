import type {
  OrderListControlsPosition,
  OrderListFilterMatchMode,
  OrderListSize,
  OrderListVariant,
} from './order-list.types';

// ---------------------------------------------------------------------------
// Defaults
// ---------------------------------------------------------------------------

/**
 * Default input values for the OrderList component.
 * Public — re-exported from the barrel so consumers can reference them.
 */
export const ORDER_LIST_DEFAULTS: Readonly<{
  variant: OrderListVariant;
  size: OrderListSize;
  controlsPosition: OrderListControlsPosition;
  filterMatchMode: OrderListFilterMatchMode;
  metaKeySelection: boolean;
  dragDrop: boolean;
  stripedRows: boolean;
  filterPlaceholder: string;
}> = {
  variant: 'material',
  size: 'md',
  controlsPosition: 'left',
  filterMatchMode: 'contains',
  metaKeySelection: false,
  dragDrop: false,
  stripedRows: false,
  filterPlaceholder: 'Filter',
} as const;

// ---------------------------------------------------------------------------
// Class names (internal — not exported from index.ts)
// ---------------------------------------------------------------------------

/**
 * BEM class names used internally by the OrderList component.
 * Not exported from the public barrel.
 */
export const ORDER_LIST_CLASSNAMES: Readonly<{
  host: string;
  controls: string;
  listContainer: string;
  list: string;
  item: string;
  itemSelected: string;
  itemDisabled: string;
  itemDragging: string;
  filterInput: string;
  header: string;
  separator: string;
  empty: string;
}> = {
  host: 'uilib-order-list',
  controls: 'uilib-order-list__controls',
  listContainer: 'uilib-order-list__list-container',
  list: 'uilib-order-list__list',
  item: 'uilib-order-list__item',
  itemSelected: 'uilib-order-list__item--selected',
  itemDisabled: 'uilib-order-list__item--disabled',
  itemDragging: 'uilib-order-list__item--dragging',
  filterInput: 'uilib-order-list__filter-input',
  header: 'uilib-order-list__header',
  separator: 'uilib-order-list__separator',
  empty: 'uilib-order-list__empty',
} as const;

// ---------------------------------------------------------------------------
// ARIA label defaults (internal — not exported from index.ts)
// ---------------------------------------------------------------------------

/**
 * Default accessible labels for the reorder control buttons.
 * Not exported from the public barrel.
 */
export const ORDER_LIST_ARIA_LABELS: Readonly<{
  moveTop: string;
  moveUp: string;
  moveDown: string;
  moveBottom: string;
}> = {
  moveTop: 'Move to top',
  moveUp: 'Move up',
  moveDown: 'Move down',
  moveBottom: 'Move to bottom',
} as const;

// ---------------------------------------------------------------------------
// ID helpers (internal)
// ---------------------------------------------------------------------------

/**
 * Generates a stable, unique HTML id for an OrderList instance.
 * @param counter - A monotonically increasing integer supplied by the component.
 * @returns A string in the form `'ui-lib-order-list-{counter}'`.
 */
export function orderListId(counter: number): string {
  return `ui-lib-order-list-${counter}`;
}
