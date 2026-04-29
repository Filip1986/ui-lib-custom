/** Design-system variant for the breadcrumb component. */
export type BreadcrumbVariant = 'material' | 'bootstrap' | 'minimal';

/** Size token for the breadcrumb component. */
export type BreadcrumbSize = 'sm' | 'md' | 'lg';

/** A single item in the breadcrumb trail. */
export interface BreadcrumbItem {
  /** Display label for the item. */
  label?: string;
  /** External URL for anchor href-based navigation. */
  url?: string;
  /** Angular RouterLink value for in-app navigation. */
  routerLink?: string | string[];
  /**
   * Icon class / semantic icon name to render before the label.
   * Rendered as a plain `<span>` with this class applied.
   */
  icon?: string;
  /** Link target attribute (e.g. `_blank`). Only used when `url` is set. */
  target?: string;
  /** When true, the item is non-interactive and visually muted. */
  disabled?: boolean;
  /** Extra CSS class added to the item's root element. */
  styleClass?: string;
  /** Callback invoked when the item is clicked or activated via keyboard. */
  command?: (event: BreadcrumbItemClickEvent) => void;
}

/** Payload emitted by the `itemClick` output. */
export interface BreadcrumbItemClickEvent {
  /** The item that was activated. */
  item: BreadcrumbItem;
  /** The originating DOM event (mouse click or keyboard event). */
  originalEvent: MouseEvent | KeyboardEvent;
}
