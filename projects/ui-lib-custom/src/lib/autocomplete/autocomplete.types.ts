export type AutoCompleteVariant = 'material' | 'bootstrap' | 'minimal';
export type AutoCompleteSize = 'sm' | 'md' | 'lg';
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

/** Template context for the `*uilib-autocompleteItem` item-row template. */
export interface AutoCompleteItemContext {
  /** The suggestion object for this option row. */
  $implicit: unknown;
}

/** Template context for the `*uilib-autocompleteSelectedItem` chip template (multiple mode). */
export interface AutoCompleteSelectedItemContext {
  /** The selected value for this chip. */
  $implicit: unknown;
}

/** Template context for the `*uilib-autocompleteGroup` group-header template. */
export interface AutoCompleteGroupContext {
  /** The group data object for this header. */
  $implicit: unknown;
}
