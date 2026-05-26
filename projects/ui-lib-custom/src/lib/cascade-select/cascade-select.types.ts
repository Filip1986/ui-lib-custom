export type CascadeSelectVariant = 'material' | 'bootstrap' | 'minimal';
export type CascadeSelectSize = 'sm' | 'md' | 'lg';

export interface CascadeSelectChangeEvent {
  originalEvent: Event;
  value: unknown;
}

export interface CascadeSelectShowEvent {
  originalEvent: Event;
}

export interface CascadeSelectHideEvent {
  originalEvent: Event;
}

export interface CascadeSelectGroupChangeEvent {
  originalEvent: Event;
  level: number;
  value: unknown;
}

/** Template context for the `[uiCascadeSelectOption]` item-row template. */
export interface CascadeSelectOptionContext {
  /** The option object for this row. */
  $implicit: unknown;
}

/** Template context for the `[uiCascadeSelectValue]` selected-value display template. */
export interface CascadeSelectValueContext {
  /** The selected option object. */
  $implicit: unknown;
}

/** Template context for the `[uiCascadeSelectOptionGroupIcon]` sub-menu chevron template. */
export interface CascadeSelectOptionGroupIconContext {
  /** The group option object for this chevron. */
  $implicit: unknown;
}
