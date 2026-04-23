import { Directive } from '@angular/core';

/** Marks the item row template for the OrderList component. */
@Directive({ selector: '[uiOrderListItem]', standalone: true })
export class OrderListItemDirective {}

/** Marks the header template for the OrderList component. */
@Directive({ selector: '[uiOrderListHeader]', standalone: true })
export class OrderListHeaderDirective {}

/** Marks the empty-state template for the OrderList component. */
@Directive({ selector: '[uiOrderListEmpty]', standalone: true })
export class OrderListEmptyDirective {}

/** Marks the custom filter template for the OrderList component. */
@Directive({ selector: '[uiOrderListFilter]', standalone: true })
export class OrderListFilterDirective {}
