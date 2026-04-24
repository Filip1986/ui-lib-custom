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

// ─── Internal CSS class constants ────────────────────────────────────────────

/** CSS class applied to the TreeTable host element. */
export const TREE_TABLE_HOST_CLASS: 'ui-lib-tree-table' = 'ui-lib-tree-table' as const;

/** CSS class prefix for variant modifier. */
export const TREE_TABLE_VARIANT_PREFIX: 'ui-lib-tree-table--variant-' =
  'ui-lib-tree-table--variant-' as const;

/** CSS class prefix for size modifier. */
export const TREE_TABLE_SIZE_PREFIX: 'ui-lib-tree-table--size-' =
  'ui-lib-tree-table--size-' as const;
