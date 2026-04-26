import { Directive } from '@angular/core';

/** Marks the item row template for VirtualScroller. */
@Directive({ selector: '[uiScrollerItem]', standalone: true })
export class ScrollerItemDirective {}

/**
 * Marks the full content override template for VirtualScroller.
 * When provided, replaces the built-in item rendering loop entirely.
 */
@Directive({ selector: '[uiScrollerContent]', standalone: true })
export class ScrollerContentDirective {}

/** Marks the loading-state item template for VirtualScroller. */
@Directive({ selector: '[uiScrollerLoader]', standalone: true })
export class ScrollerLoaderDirective {}

/** Marks the loading icon template for VirtualScroller. */
@Directive({ selector: '[uiScrollerLoaderIcon]', standalone: true })
export class ScrollerLoaderIconDirective {}
