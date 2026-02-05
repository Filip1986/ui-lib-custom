/**
 * Shared accordion types for public consumption.
 */

/**
 * Visual style of the accordion component.
 */
export type AccordionVariant = 'material' | 'bootstrap' | 'minimal';

/**
 * Size scale for accordion spacing and typography.
 */
export type AccordionSize = 'sm' | 'md' | 'lg';

/**
 * Expansion mode that controls how many panels may be open at once.
 */
export type AccordionExpandMode = 'single' | 'multiple';

/**
 * State snapshot for a single accordion panel.
 */
export interface AccordionPanelState {
  /** Identifier for the panel, typically a string or numeric value. */
  id: string | number;
  /** Whether the panel is currently expanded. */
  expanded: boolean;
  /** Whether the panel is disabled. */
  disabled: boolean;
}

/**
 * Event payload emitted when a panel expansion state changes.
 */
export interface AccordionChangeEvent {
  /** Identifier of the panel that toggled. */
  panelId: string | number;
  /** New expansion state of the panel. */
  expanded: boolean;
  /** Zero-based index of the panel within the accordion. */
  index: number;
}
