export type ToggleButtonVariant = 'material' | 'bootstrap' | 'minimal';
export type ToggleButtonSize = 'sm' | 'md' | 'lg';
export type ToggleButtonIconPos = 'left' | 'right';

/** Event emitted when the toggle state changes. */
export interface ToggleButtonChangeEvent {
  /** The original DOM event. */
  originalEvent: Event;
  /** The new checked (on) state of the toggle. */
  checked: boolean;
}
