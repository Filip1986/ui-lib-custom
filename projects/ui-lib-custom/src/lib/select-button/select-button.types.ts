export interface SelectButtonOption {
  label?: string;
  value?: any;
  disabled?: boolean;
  icon?: string;
  [key: string]: any;
}

export interface SelectButtonChangeEvent {
  originalEvent: Event;
  value: any | any[];
}

export interface SelectButtonItemContext {
  $implicit: SelectButtonOption;
}

export type SelectButtonVariant = 'material' | 'bootstrap' | 'minimal';
export type SelectButtonSize = 'small' | 'medium' | 'large';
