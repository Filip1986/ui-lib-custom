/** Design-system variant for the radio button. */
export type RadioButtonVariant = 'material' | 'bootstrap' | 'minimal';

/** Size token for the radio button. */
export type RadioButtonSize = 'sm' | 'md' | 'lg';

/** Visual appearance of the radio button box. */
export type RadioButtonAppearance = 'outlined' | 'filled';

/** Payload emitted by the `change` output. */
export interface RadioButtonChangeEvent {
  /** The value bound to this radio button. */
  value: unknown;
  /** The original DOM event that triggered the selection. */
  originalEvent: Event;
}
