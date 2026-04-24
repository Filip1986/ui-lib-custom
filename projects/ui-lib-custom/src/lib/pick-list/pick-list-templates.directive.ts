import { Directive } from '@angular/core';

/** Marks the item row template shared by both source and target lists. */
@Directive({ selector: '[uiPickListItem]', standalone: true })
export class PickListItemDirective {}

/** Marks the custom header template for the source list. */
@Directive({ selector: '[uiPickListSourceHeader]', standalone: true })
export class PickListSourceHeaderDirective {}

/** Marks the custom header template for the target list. */
@Directive({ selector: '[uiPickListTargetHeader]', standalone: true })
export class PickListTargetHeaderDirective {}

/** Marks the custom empty-state template shared by both lists. */
@Directive({ selector: '[uiPickListEmpty]', standalone: true })
export class PickListEmptyDirective {}
