/** Supported layout orientations for the Timeline component. */
export const TIMELINE_LAYOUTS: Readonly<{
  Vertical: 'vertical';
  Horizontal: 'horizontal';
}> = {
  Vertical: 'vertical',
  Horizontal: 'horizontal',
} as const;
/** Timeline layout union. */
export type TimelineLayout = (typeof TIMELINE_LAYOUTS)[keyof typeof TIMELINE_LAYOUTS];
/** Supported alignment modes for Timeline events. */
export const TIMELINE_ALIGNS: Readonly<{
  Left: 'left';
  Right: 'right';
  Alternate: 'alternate';
  Top: 'top';
  Bottom: 'bottom';
}> = {
  Left: 'left',
  Right: 'right',
  Alternate: 'alternate',
  Top: 'top',
  Bottom: 'bottom',
} as const;
/** Timeline alignment union. */
export type TimelineAlign = (typeof TIMELINE_ALIGNS)[keyof typeof TIMELINE_ALIGNS];
/** Supported visual variants for the Timeline component. */
export const TIMELINE_VARIANTS: Readonly<{
  Material: 'material';
  Bootstrap: 'bootstrap';
  Minimal: 'minimal';
}> = {
  Material: 'material',
  Bootstrap: 'bootstrap',
  Minimal: 'minimal',
} as const;
/** Timeline variant union. */
export type TimelineVariant = (typeof TIMELINE_VARIANTS)[keyof typeof TIMELINE_VARIANTS];
/** Supported density sizes for the Timeline component. */
export const TIMELINE_SIZES: Readonly<{
  Small: 'sm';
  Medium: 'md';
  Large: 'lg';
}> = {
  Small: 'sm',
  Medium: 'md',
  Large: 'lg',
} as const;
/** Timeline size union. */
export type TimelineSize = (typeof TIMELINE_SIZES)[keyof typeof TIMELINE_SIZES];
/** Template context injected into each Timeline item template. */
export interface TimelineItemContext<T> {
  readonly $implicit: T;
  readonly index: number;
  readonly first: boolean;
  readonly last: boolean;
  readonly even: boolean;
  readonly odd: boolean;
}
