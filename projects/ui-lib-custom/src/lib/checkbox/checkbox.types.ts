export type CheckboxVariant = 'material' | 'bootstrap' | 'minimal';
export type CheckboxSize = 'sm' | 'md' | 'lg';
export type CheckboxAppearance = 'outlined' | 'filled';

export interface CheckboxChangeEvent {
  checked: boolean | unknown[];
  originalEvent: Event;
}
