/**
 * Design tokens for the UI library
 * These tokens ensure consistent spacing, sizing, colors, and typography across the library
 */

// ============================================================================
// SPACING TOKENS
// ============================================================================

export const SPACING_TOKENS = {
  0: '0',
  1: '0.25rem',  // 4px
  2: '0.5rem',   // 8px
  3: '0.75rem',  // 12px
  4: '1rem',     // 16px
  5: '1.25rem',  // 20px
  6: '1.5rem',   // 24px
  8: '2rem',     // 32px
  10: '2.5rem',  // 40px
  12: '3rem',    // 48px
  16: '4rem',    // 64px
  20: '5rem',    // 80px
} as const;

export type SpacingToken = keyof typeof SPACING_TOKENS;

// ============================================================================
// SIZING TOKENS
// ============================================================================

export const CONTAINER_MAX_WIDTHS = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
  full: '100%',
} as const;

export type ContainerSize = keyof typeof CONTAINER_MAX_WIDTHS;

export const GRID_COLUMNS = {
  1: 1,
  2: 2,
  3: 3,
  4: 4,
  5: 5,
  6: 6,
  8: 8,
  10: 10,
  12: 12,
} as const;

export type GridColumns = keyof typeof GRID_COLUMNS;

// ============================================================================
// COLOR TOKENS
// ============================================================================

/**
 * Primary color palette
 * Used for main brand colors and primary actions
 */
export const COLOR_PRIMARY = {
  50: '#e3f2fd',
  100: '#bbdefb',
  200: '#90caf9',
  300: '#64b5f6',
  400: '#42a5f5',
  500: '#2196f3',  // Base primary
  600: '#1e88e5',
  700: '#1976d2',  // Material primary
  800: '#1565c0',
  900: '#0d47a1',
} as const;

/**
 * Secondary/neutral color palette
 * Used for text, borders, and backgrounds
 */
export const COLOR_NEUTRAL = {
  50: '#fafafa',
  100: '#f5f5f5',
  200: '#eeeeee',
  300: '#e0e0e0',
  400: '#bdbdbd',
  500: '#9e9e9e',  // Base neutral
  600: '#757575',  // Material secondary
  700: '#616161',
  800: '#424242',
  900: '#212121',
  black: '#000000',
  white: '#ffffff',
} as const;

/**
 * Success color palette
 * Used for positive actions and success states
 */
export const COLOR_SUCCESS = {
  50: '#e8f5e9',
  100: '#c8e6c9',
  200: '#a5d6a7',
  300: '#81c784',
  400: '#66bb6a',
  500: '#4caf50',  // Base success
  600: '#43a047',
  700: '#388e3c',  // Material success
  800: '#2e7d32',
  900: '#1b5e20',
} as const;

/**
 * Danger/error color palette
 * Used for destructive actions and error states
 */
export const COLOR_DANGER = {
  50: '#ffebee',
  100: '#ffcdd2',
  200: '#ef9a9a',
  300: '#e57373',
  400: '#ef5350',
  500: '#f44336',  // Base danger
  600: '#e53935',
  700: '#d32f2f',  // Material danger
  800: '#c62828',
  900: '#b71c1c',
} as const;

/**
 * Warning color palette
 * Used for warning states and caution messages
 */
export const COLOR_WARNING = {
  50: '#fff3e0',
  100: '#ffe0b2',
  200: '#ffcc80',
  300: '#ffb74d',
  400: '#ffa726',
  500: '#ff9800',  // Base warning
  600: '#fb8c00',
  700: '#f57c00',  // Material warning
  800: '#ef6c00',
  900: '#e65100',
} as const;

/**
 * Info color palette
 * Used for informational messages
 */
export const COLOR_INFO = {
  50: '#e1f5fe',
  100: '#b3e5fc',
  200: '#81d4fa',
  300: '#4fc3f7',
  400: '#29b6f6',
  500: '#03a9f4',  // Base info
  600: '#039be5',
  700: '#0288d1',
  800: '#0277bd',
  900: '#01579b',
} as const;

/**
 * Semantic color mapping
 * Maps semantic color names to specific palette values
 */
export const SEMANTIC_COLORS = {
  primary: COLOR_PRIMARY[700],
  'primary-hover': COLOR_PRIMARY[800],
  'primary-light': COLOR_PRIMARY[500],
  'primary-dark': COLOR_PRIMARY[900],

  secondary: COLOR_NEUTRAL[600],
  'secondary-hover': COLOR_NEUTRAL[700],
  'secondary-light': COLOR_NEUTRAL[500],
  'secondary-dark': COLOR_NEUTRAL[800],

  success: COLOR_SUCCESS[700],
  'success-hover': COLOR_SUCCESS[800],
  'success-light': COLOR_SUCCESS[500],
  'success-dark': COLOR_SUCCESS[900],

  danger: COLOR_DANGER[700],
  'danger-hover': COLOR_DANGER[800],
  'danger-light': COLOR_DANGER[500],
  'danger-dark': COLOR_DANGER[900],

  warning: COLOR_WARNING[700],
  'warning-hover': COLOR_WARNING[800],
  'warning-light': COLOR_WARNING[500],
  'warning-dark': COLOR_WARNING[900],

  info: COLOR_INFO[700],
  'info-hover': COLOR_INFO[800],
  'info-light': COLOR_INFO[500],
  'info-dark': COLOR_INFO[900],

  text: COLOR_NEUTRAL[900],
  'text-secondary': COLOR_NEUTRAL[600],
  'text-disabled': COLOR_NEUTRAL[400],

  border: COLOR_NEUTRAL[300],
  'border-light': COLOR_NEUTRAL[200],
  'border-dark': COLOR_NEUTRAL[400],

  background: COLOR_NEUTRAL.white,
  'background-alt': COLOR_NEUTRAL[50],
  'background-dark': COLOR_NEUTRAL[900],
} as const;

export type SemanticColor = keyof typeof SEMANTIC_COLORS;

/**
 * Bootstrap-compatible color palette
 * Provides Bootstrap-style colors for compatibility
 */
export const BOOTSTRAP_COLORS = {
  primary: '#0d6efd',
  secondary: '#6c757d',
  success: '#198754',
  danger: '#dc3545',
  warning: '#ffc107',
  info: '#0dcaf0',
  light: '#f8f9fa',
  dark: '#212529',
} as const;

// ============================================================================
// TYPOGRAPHY TOKENS
// ============================================================================

/**
 * Font size tokens
 */
export const FONT_SIZES = {
  xs: '0.75rem',    // 12px
  sm: '0.875rem',   // 14px
  base: '1rem',     // 16px
  lg: '1.125rem',   // 18px
  xl: '1.25rem',    // 20px
  '2xl': '1.5rem',  // 24px
  '3xl': '1.875rem', // 30px
  '4xl': '2.25rem', // 36px
  '5xl': '3rem',    // 48px
} as const;

export type FontSize = keyof typeof FONT_SIZES;

/**
 * Font weight tokens
 */
export const FONT_WEIGHTS = {
  light: 300,
  normal: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
} as const;

export type FontWeight = keyof typeof FONT_WEIGHTS;

/**
 * Line height tokens
 */
export const LINE_HEIGHTS = {
  tight: 1.25,
  normal: 1.5,
  relaxed: 1.75,
  loose: 2,
} as const;

export type LineHeight = keyof typeof LINE_HEIGHTS;

// ============================================================================
// BORDER TOKENS
// ============================================================================

/**
 * Border radius tokens
 */
export const BORDER_RADIUS = {
  none: '0',
  sm: '0.125rem',   // 2px
  base: '0.25rem',  // 4px
  md: '0.375rem',   // 6px
  lg: '0.5rem',     // 8px
  xl: '0.75rem',    // 12px
  '2xl': '1rem',    // 16px
  full: '9999px',
} as const;

export type BorderRadius = keyof typeof BORDER_RADIUS;

/**
 * Border width tokens
 */
export const BORDER_WIDTH = {
  0: '0',
  1: '1px',
  2: '2px',
  4: '4px',
} as const;

export type BorderWidth = keyof typeof BORDER_WIDTH;

// ============================================================================
// SHADOW TOKENS
// ============================================================================

/**
 * Box shadow tokens for elevation
 */
export const SHADOWS = {
  none: 'none',
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  base: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
  inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
} as const;

export type Shadow = keyof typeof SHADOWS;

// ============================================================================
// TRANSITION TOKENS
// ============================================================================

/**
 * Transition duration tokens
 */
export const TRANSITION_DURATION = {
  fast: '150ms',
  base: '200ms',
  slow: '300ms',
  slower: '500ms',
} as const;

export type TransitionDuration = keyof typeof TRANSITION_DURATION;

/**
 * Transition timing function tokens
 */
export const TRANSITION_TIMING = {
  linear: 'linear',
  ease: 'ease',
  'ease-in': 'ease-in',
  'ease-out': 'ease-out',
  'ease-in-out': 'ease-in-out',
} as const;

export type TransitionTiming = keyof typeof TRANSITION_TIMING;

// ============================================================================
// Z-INDEX TOKENS
// ============================================================================

/**
 * Z-index tokens for stacking context
 */
export const Z_INDEX = {
  base: 0,
  dropdown: 1000,
  sticky: 1020,
  fixed: 1030,
  backdrop: 1040,
  modal: 1050,
  popover: 1060,
  tooltip: 1070,
} as const;

export type ZIndex = keyof typeof Z_INDEX;

