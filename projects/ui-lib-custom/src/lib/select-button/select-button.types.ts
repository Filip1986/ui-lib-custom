export interface SelectButtonOption {
  label?: string;
  value?: unknown;
  disabled?: boolean;
  icon?: string;
  [key: string]: unknown;
}

export interface SelectButtonChangeEvent {
  originalEvent: Event;
  value: unknown | unknown[];
}

export type SelectButtonVariant = 'material' | 'bootstrap' | 'minimal';
export type SelectButtonSize = 'sm' | 'md' | 'lg' | 'small' | 'medium' | 'large';

export interface SelectButtonItemContext {
  $implicit: SelectButtonOption;
}
