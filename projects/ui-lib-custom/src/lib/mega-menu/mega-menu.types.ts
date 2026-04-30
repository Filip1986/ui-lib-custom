/** Design-system variant for the mega-menu component. */
export type MegaMenuVariant = 'material' | 'bootstrap' | 'minimal';

/** Size token for the mega-menu component. */
export type MegaMenuSize = 'sm' | 'md' | 'lg';

/** Orientation of the top-level navigation bar. */
export type MegaMenuOrientation = 'horizontal' | 'vertical';

/** Payload emitted by the `itemClick` output and passed to `command` callbacks. */
export interface MegaMenuCommandEvent {
  /** The activated sub-item. */
  item: MegaMenuSubItem;
  /** The originating DOM event (mouse click or keyboard event). */
  originalEvent: MouseEvent | KeyboardEvent;
}

/**
 * A leaf item within a mega-menu panel column.
 * These appear inside the expanded mega panel, grouped into columns.
 */
export interface MegaMenuSubItem {
  /** Display label for the item. */
  label?: string;
  /** Icon name passed to `<ui-lib-icon>` or a CSS icon class. */
  icon?: string;
  /** When true, the item cannot be interacted with. */
  disabled?: boolean;
  /**
   * When explicitly set to `false`, hides the item.
   * Defaults to visible (`undefined` is treated as `true`).
   */
  visible?: boolean;
  /** When true, renders a visual separator line instead of an item. */
  separator?: boolean;
  /** Extra CSS class added to the item element. */
  styleClass?: string;
  /** When set, the item renders as an `<a>` tag linking to this URL. */
  url?: string;
  /** `target` attribute for `url`-based items (e.g. `'_blank'`). */
  target?: string;
  /** Callback invoked when the item is activated (clicked or via keyboard). */
  command?: (event: MegaMenuCommandEvent) => void;
}

/**
 * A column within a mega-menu panel.
 * Each column may have an optional header label followed by a list of sub-items.
 */
export interface MegaMenuSubColumn {
  /** Optional column header label rendered above the column's items. */
  header?: string;
  /** Items displayed in this column. */
  items: MegaMenuSubItem[];
}

/**
 * A top-level navigation item in the mega menu.
 * Items without `items` are rendered as simple links/buttons.
 * Items with `items` open a mega panel showing one or more columns of sub-items.
 */
export interface MegaMenuItem {
  /** Display label for the top-level item. */
  label?: string;
  /** Icon name passed to `<ui-lib-icon>` or a CSS icon class. */
  icon?: string;
  /** When true, the item cannot be interacted with. */
  disabled?: boolean;
  /**
   * When explicitly set to `false`, hides the item.
   * Defaults to visible (`undefined` is treated as `true`).
   */
  visible?: boolean;
  /** Extra CSS class added to the root item element. */
  styleClass?: string;
  /** When set and `items` is absent, renders the item as an `<a>` linking to this URL. */
  url?: string;
  /** `target` attribute for `url`-based top-level items (e.g. `'_blank'`). */
  target?: string;
  /** Callback invoked when a simple top-level item is activated. */
  command?: (event: MegaMenuCommandEvent) => void;
  /**
   * Array of columns to display inside the expanded mega panel.
   * When present, activating the item opens a panel instead of navigating.
   */
  items?: MegaMenuSubColumn[];
}
