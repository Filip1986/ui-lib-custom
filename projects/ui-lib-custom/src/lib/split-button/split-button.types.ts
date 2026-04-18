export type SplitButtonVariant = 'material' | 'bootstrap' | 'minimal';

export type SplitButtonSize = 'sm' | 'md' | 'lg';

export type SplitButtonSeverity =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'info'
  | 'warning'
  | 'help'
  | 'danger'
  | 'contrast';

export interface SplitButtonClickEvent {
  originalEvent: MouseEvent;
}

export interface SplitButtonMenuShowEvent {
  originalEvent: Event;
}

export interface SplitButtonMenuHideEvent {
  originalEvent: Event;
}

export interface SplitButtonItem {
  label?: string;
  icon?: string;
  command?: (event: SplitButtonItemCommandEvent) => void;
  disabled?: boolean;
  separator?: boolean;
  tooltip?: string;
  url?: string;
  target?: string;
  routerLink?: string | unknown[];
  styleClass?: string;
  visible?: boolean;
  [key: string]: unknown;
}

export interface SplitButtonItemCommandEvent {
  originalEvent: Event;
  item: SplitButtonItem;
  index: number;
}
