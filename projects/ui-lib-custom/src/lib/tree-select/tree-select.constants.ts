/** Prefix used for generated component IDs. */
export const TREE_SELECT_ID_PREFIX: string = 'ui-lib-tree-select';

/** Default placeholder text. */
export const TREE_SELECT_DEFAULTS: {
  readonly placeholder: string;
  readonly emptyMessage: string;
  readonly filterPlaceholder: string;
} = {
  placeholder: 'Select a node...',
  emptyMessage: 'No results found',
  filterPlaceholder: 'Search...',
} as const;
