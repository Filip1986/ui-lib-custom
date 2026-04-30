/** Design-system variant for the menubar component. */
export type MenubarVariant = 'material' | 'bootstrap' | 'minimal';

/** Size token for the menubar component. */
export type MenubarSize = 'sm' | 'md' | 'lg';

/** Payload emitted by the `itemClick` output and passed to `command` callbacks. */
export interface MenubarCommandEvent {
  /** The activated menu item. */
  item: MenubarItem;
  /** The originating DOM event (mouse click or keyboard event). */
  originalEvent: MouseEvent | KeyboardEvent;
}

/**
 * A single item in the menubar model.
 * Items with an `items` array render as a trigger that opens a submenu panel.
 * Items without `items` are leaf nodes that can navigate or invoke a command.
 */
export interface MenubarItem {
  /** Display label for the item. */
  label?: string;
  /** Icon class or semantic name passed to `<ui-lib-icon>`. */
  icon?: string;
  /** When true, the item cannot be interacted with. */
  disabled?: boolean;
  /**
   * When explicitly set to `false`, hides the item from the rendered list.
   * Defaults to visible (`undefined` is treated as `true`).
   */
  visible?: boolean;
  /** When true, renders a horizontal separator line instead of an item. */
  separator?: boolean;
  /** Extra CSS class added to the item element. */
  styleClass?: string;
  /** When set on a leaf item, the item renders as `<a href>`. */
  url?: string;
  /** `target` attribute for `url`-based items (e.g. `'_blank'`). */
  target?: string;
  /**
   * Nested items — presence causes this item to open a sub-panel.
   * Supports arbitrary nesting depth.
   */
  items?: MenubarItem[];
  /** Callback invoked when a leaf item is activated (clicked or via keyboard). */
  command?: (event: MenubarCommandEvent) => void;
}
