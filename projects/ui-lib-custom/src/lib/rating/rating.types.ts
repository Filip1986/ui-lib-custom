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
