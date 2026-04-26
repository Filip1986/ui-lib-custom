/** Default configuration values for the TreeTable component. */
export const TREE_TABLE_DEFAULTS: {
  readonly SORT_ORDER: 0;
  readonly SIZE: 'md';
  readonly VARIANT: 'material';
  readonly INDENT_REM: 1.5;
} = {
  /** Initial sort order — unsorted. */
  SORT_ORDER: 0,
  /** Default size. */
  SIZE: 'md',
  /** Default variant fallback (used only when ThemeConfigService provides nothing). */
  VARIANT: 'material',
  /** Indent size per depth level in rem. */
  INDENT_REM: 1.5,
} as const;
