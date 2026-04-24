/** Default configuration values for the PickList component. */
export const PICK_LIST_DEFAULTS: {
  readonly size: 'sm' | 'md' | 'lg';
  readonly filterMatchMode: 'contains' | 'startsWith' | 'endsWith' | 'equals';
  readonly sourceFilterPlaceholder: string;
  readonly targetFilterPlaceholder: string;
} = {
  size: 'md',
  filterMatchMode: 'contains',
  sourceFilterPlaceholder: 'Filter',
  targetFilterPlaceholder: 'Filter',
} as const;
