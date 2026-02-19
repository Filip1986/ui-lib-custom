/**
 * Shared types used across multiple entry points.
 * Placed in core to avoid circular dependencies between icon and theme.
 */

// Theme variant identifiers
export type ThemeVariant = 'material' | 'bootstrap' | 'minimal';

// Icon size tokens
export type IconSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

// Icon library identifiers
export type IconLibrary = 'material' | 'bootstrap' | 'lucide' | 'heroicons' | 'tabler';

// Size to pixel/rem mapping
export const ICON_SIZES: Record<IconSize, string> = {
  xs: '0.75rem',
  sm: '1rem',
  md: '1.25rem',
  lg: '1.5rem',
  xl: '2rem',
  '2xl': '2.5rem',
};
