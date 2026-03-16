export type AutoCompleteVariant = 'material' | 'bootstrap' | 'minimal';
export type AutoCompleteSize = 'small' | 'medium' | 'large';
export type AutoCompleteDropdownMode = 'blank' | 'current';

export interface AutoCompleteCompleteEvent {
  originalEvent: Event;
  query: string;
}

export interface AutoCompleteSelectEvent {
  originalEvent: Event;
  value: unknown;
}

export interface AutoCompleteUnselectEvent {
  originalEvent: Event;
  value: unknown;
}

export interface AutoCompleteDropdownClickEvent {
  originalEvent: Event;
  query: string;
}

export interface AutoCompleteOptionGroup {
  label: string;
  value?: unknown;
  items: unknown[];
}
