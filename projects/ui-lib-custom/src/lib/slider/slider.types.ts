/** Public design variant options for the Slider component. */
export type SliderVariant = 'material' | 'bootstrap' | 'minimal';

/** Public size options for the Slider component. */
export type SliderSize = 'sm' | 'md' | 'lg';

/** Orientation of the slider track. */
export type SliderOrientation = 'horizontal' | 'vertical';

/** Payload emitted whenever the slider value changes due to user interaction. */
export interface SliderChangeEvent {
  /** The updated value — a single number in single mode, a tuple in range mode. */
  value: number | [number, number];
  /** The originating DOM event. */
  originalEvent: Event;
}

/** Payload emitted when the user finishes a drag interaction. */
export interface SliderSlideEndEvent {
  /** The final value after the drag — single number or range tuple. */
  value: number | [number, number];
  /** The originating pointerup event. */
  originalEvent: Event;
}

/** Default values shared by the Slider component API. */
export const SLIDER_DEFAULTS: Readonly<{
  min: 0;
  max: 100;
  step: 1;
  size: 'md';
  orientation: 'horizontal';
  disabled: false;
  readonly: false;
  animate: false;
  range: false;
  tabindex: 0;
}> = {
  min: 0,
  max: 100,
  step: 1,
  size: 'md',
  orientation: 'horizontal',
  disabled: false,
  readonly: false,
  animate: false,
  range: false,
  tabindex: 0,
} as const;
