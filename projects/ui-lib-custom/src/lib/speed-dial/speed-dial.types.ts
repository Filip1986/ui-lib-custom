import type { SemanticIcon } from 'ui-lib-custom/icon';

export type SpeedDialType = 'linear' | 'circle' | 'semi-circle' | 'quarter-circle';

/**
 * Direction constraints by layout type:
 * - `linear`: `up`, `down`, `left`, `right`
 * - `circle`: direction is ignored by layout math
 * - `semi-circle`: `up`, `down`, `left`, `right`
 * - `quarter-circle`: `up-left`, `up-right`, `down-left`, `down-right`
 */
export type SpeedDialDirection =
  | 'up'
  | 'down'
  | 'left'
  | 'right'
  | 'up-left'
  | 'up-right'
  | 'down-left'
  | 'down-right';

export type SpeedDialVariant = 'material' | 'bootstrap' | 'minimal';

export type SpeedDialSize = 'sm' | 'md' | 'lg';

export interface SpeedDialShowEvent {
  originalEvent: Event;
}

export interface SpeedDialHideEvent {
  originalEvent: Event;
}

export interface SpeedDialVisibleChangeEvent {
  originalEvent: Event;
  visible: boolean;
}

export interface SpeedDialItemCommandEvent {
  originalEvent: Event;
  item: SpeedDialItem;
  index: number;
}

export interface SpeedDialClickEvent {
  originalEvent: MouseEvent;
  visible: boolean;
}

export interface SpeedDialItem {
  label?: string;
  icon?: SemanticIcon | string;
  command?: (event: SpeedDialItemCommandEvent) => void;
  disabled?: boolean;
  tooltip?: string;
  url?: string;
  target?: string;
  routerLink?: string | unknown[];
  styleClass?: string;
  visible?: boolean;
  [key: string]: unknown;
}
