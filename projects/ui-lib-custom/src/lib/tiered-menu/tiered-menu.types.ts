/** Design-system variant for the tiered-menu component. */
export type TieredMenuVariant = 'material' | 'bootstrap' | 'minimal';

/** Size token for the tiered-menu component. */
export type TieredMenuSize = 'sm' | 'md' | 'lg';

/** Payload emitted by the `itemClick` output and passed to `command` callbacks. */
export interface TieredMenuItemCommandEvent {
  /** The activated menu item. */
  item: TieredMenuItem;
  /** The originating DOM event (mouse click or keyboard event). */
  originalEvent: MouseEvent | KeyboardEvent;
}

/**
 * A single item in the tiered menu. Items with an `items` array have a
 * right-arrow indicator and open a nested sub-panel on hover/focus.
 */
export interface TieredMenuItem {
  /** Display label for the item. */
  label?: string;
  /** Icon name rendered before the label (ui-lib-icon compatible name). */
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
  /** Nested items rendered in a flyout sub-panel opening to the right. */
  items?: TieredMenuItem[];
  /** Callback invoked when the item is activated (clicked or via keyboard). */
  command?: (event: TieredMenuItemCommandEvent) => void;
  /** When set, the item renders as an `<a>` linking to this URL. */
  url?: string;
  /** `target` attribute for `url`-based items (e.g. `'_blank'`). */
  target?: string;
}
