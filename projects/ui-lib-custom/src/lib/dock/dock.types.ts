/** Design-system variant for the dock component. */
export type DockVariant = 'material' | 'bootstrap' | 'minimal';

/** Size token for the dock component. */
export type DockSize = 'sm' | 'md' | 'lg';

/** Position of the dock relative to its container. */
export type DockPosition = 'bottom' | 'top' | 'left' | 'right';

/** A single item displayed in the dock. */
export interface DockItem {
  /** Accessible label and tooltip text for the item. */
  label?: string;
  /** Icon class(es) rendered as the item visual (e.g. 'pi pi-home'). */
  icon?: string;
  /** When true, the item cannot be interacted with. */
  disabled?: boolean;
  /**
   * When explicitly set to false, hides the item from the rendered list.
   * Defaults to visible (undefined is treated as true).
   */
  visible?: boolean;
  /** Extra CSS class added to the item element. */
  styleClass?: string;
  /** Angular Router link for the item. */
  routerLink?: string | string[];
  /** External URL for anchor items. */
  url?: string;
  /** Anchor target attribute (e.g. '_blank'). */
  target?: string;
  /** Callback invoked when the item is activated (clicked or via keyboard). */
  command?: (event: DockItemCommandEvent) => void;
}

/** Payload emitted by the `itemClick` output and passed to `command` callbacks. */
export interface DockItemCommandEvent {
  /** The activated dock item. */
  item: DockItem;
  /** The originating DOM event. */
  originalEvent: MouseEvent | KeyboardEvent;
}
