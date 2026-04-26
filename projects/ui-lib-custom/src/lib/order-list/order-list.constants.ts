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
