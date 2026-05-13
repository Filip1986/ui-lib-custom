// Temporarily inline types to avoid circular dependency
// ThemeVariant is exported from ui-lib-custom/theme, not re-exported here

type ThemeVariant = 'material' | 'bootstrap' | 'minimal';

export type IconSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
export type IconLibrary = 'material' | 'bootstrap' | 'lucide' | 'heroicons' | 'tabler';

export const ICON_SIZES: Record<IconSize, string> = {
  xs: '0.75em',
  sm: '0.875em',
  md: '1em',
  lg: '1.25em',
  xl: '1.5em',
  '2xl': '2em',
};

export type VariantIconMapping = {
  material: IconLibrary;
  bootstrap: IconLibrary;
  minimal: IconLibrary;
};

export interface IconConfig {
  defaultLibrary: IconLibrary;
  defaultSize: IconSize;
  variantMapping: VariantIconMapping;
}

export const ICON_LIBRARY_PREFIX: Record<IconLibrary, string> = {
  material: '',
  bootstrap: 'bootstrap',
  lucide: 'lucide',
  heroicons: 'hero',
  tabler: 'tabler',
};

export const DEFAULT_ICON_CONFIG: IconConfig = {
  defaultLibrary: 'lucide',
  defaultSize: 'md',
  variantMapping: {
    material: 'material',
    bootstrap: 'bootstrap',
    minimal: 'lucide',
  },
};

// Internal alias for use within icon module
export type ComponentVariant = ThemeVariant;
