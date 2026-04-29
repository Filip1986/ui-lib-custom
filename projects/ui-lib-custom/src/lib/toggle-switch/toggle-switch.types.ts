export type ToggleSwitchVariant = 'material' | 'bootstrap' | 'minimal';
export type ToggleSwitchSize = 'sm' | 'md' | 'lg';

export interface ToggleSwitchChangeEvent {
  checked: boolean;
  originalEvent: Event;
}
