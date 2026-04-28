/** Design-system variant for the rating component. */
export type RatingVariant = 'material' | 'bootstrap' | 'minimal';

/** Size token for the rating component. */
export type RatingSize = 'sm' | 'md' | 'lg';

/** Payload emitted by the `change` output whenever the value changes (including clears). */
export interface RatingChangeEvent {
  /** The new rating value; null when the rating was cleared via the cancel button. */
  value: number | null;
  /** The original DOM event that triggered the change. */
  originalEvent: Event;
}

/** Payload emitted by the `rate` output when a star is explicitly selected (not when cleared). */
export interface RatingRateEvent {
  /** The new rating value (always a positive integer). */
  value: number;
  /** The original DOM event that triggered the selection. */
  originalEvent: Event;
}

/**
 * Payload emitted by the `onRate` output when a star is selected.
 * Unlike {@link RatingChangeEvent}, the value here is always non-null.
 */
export interface RatingRateEvent {
  /** The selected star value (always ≥ 1). */
  value: number;
  /** The original DOM event that triggered the change. */
  originalEvent: Event;
}
