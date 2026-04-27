/** Structural variant — maps to the design system (Material, Bootstrap, Minimal). */
export type CarouselVariant = 'material' | 'bootstrap' | 'minimal';

/** Size token for the component. */
export type CarouselSize = 'sm' | 'md' | 'lg';

/** Layout orientation for the carousel. */
export type CarouselOrientation = 'horizontal' | 'vertical';

/**
 * Responsive breakpoint configuration.
 * Applied when the viewport width matches the breakpoint.
 */
export interface CarouselResponsiveOption {
  /** CSS max-width breakpoint string, e.g. `'768px'`. */
  breakpoint: string;
  /** Number of items visible at this breakpoint. */
  numVisible: number;
  /** Number of items scrolled at this breakpoint. */
  numScroll: number;
}

/** Emitted after the page changes (via navigation, indicator click, or autoplay). */
export interface CarouselPageEvent {
  /** Zero-based index of the new active page. */
  page: number;
}
