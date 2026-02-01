import { ThemeVariant } from '../theming/theme-preset.interface';

// Icon size tokens aligned with design-tokens.ts
export type IconSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

// Icon library identifiers
export type IconLibrary = 'material' | 'bootstrap' | 'lucide' | 'heroicons' | 'tabler';

// Variant to default icon library mapping
export type VariantIconMapping = {
  material: IconLibrary;
  bootstrap: IconLibrary;
  minimal: IconLibrary;
};

// Icon configuration
export interface IconConfig {
  defaultLibrary: IconLibrary;
  defaultSize: IconSize;
  variantMapping: VariantIconMapping;
}

// Size to pixel/rem mapping (align with design tokens)
export const ICON_SIZES: Record<IconSize, string> = {
  xs: '0.75rem',   // 12px
  sm: '1rem',      // 16px
  md: '1.25rem',   // 20px
  lg: '1.5rem',    // 24px
  xl: '2rem',      // 32px
  '2xl': '2.5rem', // 40px
};

export const ICON_LIBRARY_PREFIX: Record<IconLibrary, string> = {
  material: 'matOutlined',
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

export type ComponentVariant = ThemeVariant;
