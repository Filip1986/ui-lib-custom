/**
 * Theme variant for the Listbox component.
 */
export type ListboxVariant = 'material' | 'bootstrap' | 'minimal';

/**
 * Size token for the Listbox component.
 */
export type ListboxSize = 'sm' | 'md' | 'lg';

/**
 * Strategy used when filtering list options.
 * - `'contains'`   — option label contains the query string (case-insensitive).
 * - `'startsWith'` — option label starts with the query string (case-insensitive).
 * - `'endsWith'`   — option label ends with the query string (case-insensitive).
 * - `'equals'`     — option label exactly matches the query string (case-insensitive).
 */
export type ListboxFilterMatchMode = 'contains' | 'startsWith' | 'endsWith' | 'equals';

// ---------------------------------------------------------------------------
// Option structures
// ---------------------------------------------------------------------------

/**
 * A flat option object rendered as a single list item.
 */
export interface ListboxOption {
  /** Display label for the option. */
  label: string;
  /** Value emitted when this option is selected. */
  value: unknown;
  /** When true, the option cannot be selected. */
  disabled?: boolean;
  /** Arbitrary extra data for custom item templates. */
  [key: string]: unknown;
}

/**
 * A group wrapper used when `group` is enabled.
 * The children array uses the field referenced by `optionGroupChildren`.
 */
export interface ListboxOptionGroup {
  /** Display label for the group header. */
  [key: string]: unknown;
}

// ---------------------------------------------------------------------------
// Internal flattened item used by the rendering engine
// ---------------------------------------------------------------------------

/**
 * A group-header row inserted into the flat rendering list.
 */
export interface ListboxGroupHeader {
  /** Discriminant — always `'group'`. */
  type: 'group';
  /** The display label for this group. */
  label: string;
}

/**
 * An option row in the flat rendering list.
 */
export interface ListboxOptionRow {
  /** Discriminant — always `'option'`. */
  type: 'option';
  /** Display label. */
  label: string;
  /** Value for this option. */
  value: unknown;
  /** Whether this option is disabled. */
  disabled: boolean;
  /** Zero-based index among non-group rows (used for keyboard navigation). */
  optionIndex: number;
}

/**
 * Union type for items in the flat rendering list.
 */
export type ListboxFlatItem = ListboxGroupHeader | ListboxOptionRow;

// ---------------------------------------------------------------------------
// Event payload interfaces
// ---------------------------------------------------------------------------

/**
 * Emitted when the selected value(s) change.
 */
export interface ListboxChangeEvent {
  /** The browser event that triggered the change. */
  originalEvent: Event;
  /** The new value — single value or array depending on `multiple`. */
  value: unknown;
}

/**
 * Emitted when the filter query changes.
 */
export interface ListboxFilterEvent {
  /** The browser input event. */
  originalEvent: Event;
  /** The current filter query string. */
  filter: string;
}

// ---------------------------------------------------------------------------
// Template context interfaces
// ---------------------------------------------------------------------------

/**
 * Context passed to the custom item template.
 */
export interface ListboxItemContext {
  /** The rendered option row (includes label, value, disabled, optionIndex). */
  $implicit: ListboxOptionRow;
  /** Whether this option is currently selected. */
  selected: boolean;
}

/**
 * Context passed to the group header template.
 */
export interface ListboxGroupContext {
  /** The raw group object. */
  $implicit: unknown;
  /** The resolved group label. */
  label: string;
}
