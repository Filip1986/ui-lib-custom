/** Design-system variant for the context menu component. */
export type ContextMenuVariant = 'material' | 'bootstrap' | 'minimal';

/** Size token for the context menu component. */
export type ContextMenuSize = 'sm' | 'md' | 'lg';

/** A single item in the context menu. */
export interface ContextMenuItem {
  /** Display label for the item. */
  label?: string;
  /** Icon class / semantic icon name rendered before the label. */
  icon?: string;
  /** When true, the item cannot be interacted with. */
  disabled?: boolean;
  /** When true, renders a visual separator line instead of an item. */
  separator?: boolean;
  /**
   * When explicitly set to false, hides the item from the rendered list.
   * Defaults to visible (undefined is treated as true).
   */
  visible?: boolean;
  /** Extra CSS class added to the item element. */
  styleClass?: string;
  /** Nested items rendered as a submenu (one level of nesting supported). */
  items?: ContextMenuItem[];
  /** Callback invoked when the item is activated (clicked or via keyboard). */
  command?: (event: ContextMenuItemCommandEvent) => void;
}

/** Payload emitted by the `itemClick` output and passed to `command` callbacks. */
export interface ContextMenuItemCommandEvent {
  /** The activated menu item. */
  item: ContextMenuItem;
  /** The originating DOM event (mouse click or keyboard event). */
  originalEvent: MouseEvent | KeyboardEvent;
}
