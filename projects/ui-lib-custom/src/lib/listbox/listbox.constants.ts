/**
 * Default values for the Listbox component.
 */
export const LISTBOX_DEFAULTS: Readonly<{
  ScrollHeight: '200px';
  OptionLabel: 'label';
  OptionValue: 'value';
  OptionDisabled: 'disabled';
  OptionGroupLabel: 'label';
  OptionGroupChildren: 'items';
  FilterMatchMode: 'contains';
  EmptyMessage: 'No items found.';
  EmptyFilterMessage: 'No results match your filter.';
  FilterPlaceholder: 'Search...';
}> = {
  /** Default scroll height for the options list. */
  ScrollHeight: '200px',
  /** Default option label field name. */
  OptionLabel: 'label',
  /** Default option value field name. */
  OptionValue: 'value',
  /** Default option disabled field name. */
  OptionDisabled: 'disabled',
  /** Default option group label field name. */
  OptionGroupLabel: 'label',
  /** Default option group children field name. */
  OptionGroupChildren: 'items',
  /** Default filter match mode. */
  FilterMatchMode: 'contains',
  /** Default empty message. */
  EmptyMessage: 'No items found.',
  /** Default empty filter message. */
  EmptyFilterMessage: 'No results match your filter.',
  /** Default filter placeholder. */
  FilterPlaceholder: 'Search...',
} as const;

/** ARIA role for the list container. */
export const LISTBOX_ROLE: 'listbox' = 'listbox' as const;

/** ARIA role for individual options. */
export const LISTBOX_OPTION_ROLE: 'option' = 'option' as const;

/** ARIA role for group headers. */
export const LISTBOX_GROUP_ROLE: 'group' = 'group' as const;

/** Separator used to compose unique option element IDs. */
export const LISTBOX_OPTION_ID_SEPARATOR: '-option-' = '-option-' as const;
