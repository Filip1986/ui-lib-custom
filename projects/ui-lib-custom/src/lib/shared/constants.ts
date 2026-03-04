/**
 * Shared size literals used across multiple components.
 */
export const SHARED_SIZES: {
  readonly Sm: 'sm';
  readonly Md: 'md';
  readonly Lg: 'lg';
} = {
  Sm: 'sm',
  Md: 'md',
  Lg: 'lg',
} as const;

/**
 * Union type for shared sizes.
 */
export type SharedSize = (typeof SHARED_SIZES)[keyof typeof SHARED_SIZES];

/**
 * Shared theme variant constants and options for reuse across components, tests, and stories.
 */
export const SHARED_THEME_VARIANTS: {
  readonly Material: 'material';
  readonly Bootstrap: 'bootstrap';
  readonly Minimal: 'minimal';
} = {
  Material: 'material',
  Bootstrap: 'bootstrap',
  Minimal: 'minimal',
} as const;

/**
 * Union type for shared theme variants.
 */
export type SharedThemeVariant = (typeof SHARED_THEME_VARIANTS)[keyof typeof SHARED_THEME_VARIANTS];

/**
 * Shared default values used across multiple components.
 */
export const SHARED_DEFAULTS: {
  readonly Size: SharedSize;
  readonly Variant: SharedThemeVariant;
} = {
  Size: SHARED_SIZES.Md,
  Variant: SHARED_THEME_VARIANTS.Material,
} as const;

/**
 * Shared size options for stories and tests.
 */
export const SHARED_SIZE_OPTIONS: ReadonlyArray<SharedSize> = [
  SHARED_SIZES.Sm,
  SHARED_SIZES.Md,
  SHARED_SIZES.Lg,
] as const;

/**
 * Shared theme variant options for stories and tests.
 */
export const SHARED_VARIANT_OPTIONS: ReadonlyArray<SharedThemeVariant> = [
  SHARED_THEME_VARIANTS.Material,
  SHARED_THEME_VARIANTS.Bootstrap,
  SHARED_THEME_VARIANTS.Minimal,
] as const;

/**
 * Union type for shared defaults.
 */
export type SharedDefault = (typeof SHARED_DEFAULTS)[keyof typeof SHARED_DEFAULTS];
