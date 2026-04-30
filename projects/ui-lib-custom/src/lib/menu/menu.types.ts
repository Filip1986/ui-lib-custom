/** Design-system variant for the menu component. */
export type MenuVariant = 'material' | 'bootstrap' | 'minimal';

/** Size token for the menu component. */
export type MenuSize = 'sm' | 'md' | 'lg';

/** Payload emitted by the `itemClick` output and passed to `command` callbacks. */
export interface MenuItemCommandEvent {
  /** The activated menu item. */
  item: MenuItem;
  /** The originating DOM event (mouse click or keyboard event). */
  originalEvent: MouseEvent | KeyboardEvent;
}

/**
 * A single item in the menu. Top-level items with an `items` array act as
 * labelled group headers — their children are rendered as the group members.
 * Top-level items without `items` are rendered as direct menu entries.
 */
export interface MenuItem {
  /** Display label for the item or group header. */
  label?: string;
  /** Icon class or semantic icon name rendered before the label. */
  icon?: string;
  /** When true, the item cannot be interacted with. */
  disabled?: boolean;
  /** When true, renders a visual separator line instead of an item. */
  separator?: boolean;
  /**
   * When explicitly set to `false`, hides the item from the rendered list.
   * Defaults to visible (`undefined` is treated as `true`).
   */
  visible?: boolean;
  /** Extra CSS class added to the item element. */
  styleClass?: string;
  /**
   * Child items. When present on a top-level item, that item becomes a group
   * header and its children are listed beneath a divider label.
   */
  items?: MenuItem[];
  /** Callback invoked when the item is activated (clicked or via keyboard). */
  command?: (event: MenuItemCommandEvent) => void;
  /** When set, the item renders as an `<a>` linking to this URL. */
  url?: string;
  /** `target` attribute for `url`-based items (e.g. `'_blank'`). */
  target?: string;
}
