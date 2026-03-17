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
