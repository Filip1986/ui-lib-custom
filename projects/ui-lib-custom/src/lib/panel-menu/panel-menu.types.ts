/** Design-system variant for the panel-menu component. */
export type PanelMenuVariant = 'material' | 'bootstrap' | 'minimal';

/** Size token for the panel-menu component. */
export type PanelMenuSize = 'sm' | 'md' | 'lg';

/** Payload emitted by the `itemClick` output and passed to `command` callbacks. */
export interface PanelMenuCommandEvent {
  /** The activated menu item. */
  item: PanelMenuItem;
  /** The originating DOM event (mouse click or keyboard activation). */
  originalEvent: MouseEvent | KeyboardEvent;
}

/** Payload emitted when a root panel is expanded or collapsed. */
export interface PanelMenuPanelToggleEvent {
  /** The toggled root item. */
  item: PanelMenuItem;
  /** Whether the panel is now expanded (`true`) or collapsed (`false`). */
  expanded: boolean;
  /** The path key of the toggled item (e.g. `"0"`, `"1"`). */
  key: string;
}

/**
 * A single item in the PanelMenu. Items with an `items` array act as
 * expandable group headers. Items without `items` are leaf nodes
 * (clickable actions / navigation links).
 */
export interface PanelMenuItem {
  /** Display label. */
  label?: string;
  /** Icon class or semantic icon name rendered before the label. */
  icon?: string;
  /**
   * When `true`, this root panel starts expanded on the first render.
   * Only applies to root-level items.
   */
  expanded?: boolean;
  /** When `true`, the item cannot be interacted with. */
  disabled?: boolean;
  /** When `true`, renders a visual separator line instead of an item. */
  separator?: boolean;
  /**
   * When explicitly `false`, hides the item from the rendered list.
   * Defaults to visible (`undefined` treated as `true`).
   */
  visible?: boolean;
  /** Extra CSS class added to the item element. */
  styleClass?: string;
  /** Child items — when present the item becomes a collapsible group header. */
  items?: PanelMenuItem[];
  /** Callback invoked when a leaf item is activated (click or keyboard). */
  command?: (event: PanelMenuCommandEvent) => void;
  /** When set, the leaf item renders as an `<a>` linking to this URL. */
  url?: string;
  /** `target` attribute for `url`-based items (e.g. `'_blank'`). */
  target?: string;
}
