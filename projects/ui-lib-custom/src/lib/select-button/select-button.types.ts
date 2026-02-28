export type SelectButtonValueObject = Record<string, string | number | boolean | null>;
export type SelectButtonValue = string | number | boolean | null | SelectButtonValueObject;

export interface SelectButtonOption {
  label?: string;
  value?: SelectButtonValue;
  disabled?: boolean;
  icon?: string;
  [key: string]: SelectButtonValue | undefined;
}

export interface SelectButtonChangeEvent {
  originalEvent: Event;
  value: SelectButtonValue | SelectButtonValue[];
}

// Deprecated alias for legacy event naming.
export type SelectButtonSelectionChangeEvent = SelectButtonChangeEvent;

export type SelectButtonVariant = 'material' | 'bootstrap' | 'minimal';
export type SelectButtonSize = 'sm' | 'md' | 'lg' | 'small' | 'medium' | 'large';

export interface SelectButtonItemContext {
  $implicit: SelectButtonOption;
}
