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

export const SPACING_ALIASES = {
  xs: SPACING_TOKENS[1],   // 4px
  sm: SPACING_TOKENS[2],   // 8px
  md: SPACING_TOKENS[4],   // 16px (base)
  lg: SPACING_TOKENS[6],   // 24px
  xl: SPACING_TOKENS[8],   // 32px
  '2xl': SPACING_TOKENS[12], // 48px
} as const;

export type SpacingAlias = keyof typeof SPACING_ALIASES;
export type SpacingKey = SpacingToken | SpacingAlias;

export const INSET_TOKENS = {
  xs: SPACING_TOKENS[1],  // 4px
  sm: SPACING_TOKENS[2],  // 8px
  md: SPACING_TOKENS[4],  // 16px
  lg: SPACING_TOKENS[6],  // 24px
  xl: SPACING_TOKENS[8],  // 32px
} as const;

export type InsetToken = keyof typeof INSET_TOKENS;

export const SQUISH_TOKENS = {
  xs: `${SPACING_TOKENS[1]} ${SPACING_TOKENS[2]}`,  // 4px 8px
  sm: `${SPACING_TOKENS[2]} ${SPACING_TOKENS[4]}`,  // 8px 16px
  md: `${SPACING_TOKENS[4]} ${SPACING_TOKENS[8]}`,  // 16px 32px
  lg: `${SPACING_TOKENS[6]} ${SPACING_TOKENS[12] ?? '3rem'}`,  // 24px 48px
  xl: `${SPACING_TOKENS[8]} ${SPACING_TOKENS[16] ?? '4rem'}`,  // 32px 64px
} as const;

export type SquishToken = keyof typeof SQUISH_TOKENS;

export const STRETCH_TOKENS = {
  xs: `${SPACING_TOKENS[2]} ${SPACING_TOKENS[1]}`,  // 8px 4px
  sm: `${SPACING_TOKENS[4]} ${SPACING_TOKENS[2]}`,  // 16px 8px
  md: `${SPACING_TOKENS[8]} ${SPACING_TOKENS[4]}`,  // 32px 16px
  lg: `${SPACING_TOKENS[12] ?? '3rem'} ${SPACING_TOKENS[6]}`,  // 48px 24px
  xl: `${SPACING_TOKENS[16] ?? '4rem'} ${SPACING_TOKENS[8]}`,  // 64px 32px
} as const;

export type StretchToken = keyof typeof STRETCH_TOKENS;

export const STACK_TOKENS = {
  xs: SPACING_TOKENS[1],  // 4px
  sm: SPACING_TOKENS[2],  // 8px
  md: SPACING_TOKENS[4],  // 16px
  lg: SPACING_TOKENS[6],  // 24px
  xl: SPACING_TOKENS[8],  // 32px
} as const;

export type StackToken = keyof typeof STACK_TOKENS;

export const INLINE_TOKENS = {
  xs: SPACING_TOKENS[1],  // 4px
  sm: SPACING_TOKENS[2],  // 8px
  md: SPACING_TOKENS[4],  // 16px
  lg: SPACING_TOKENS[6],  // 24px
  xl: SPACING_TOKENS[8],  // 32px
} as const;

export type InlineToken = keyof typeof INLINE_TOKENS;

export type SpacingPatternToken =
  | InsetToken
  | SquishToken
  | StretchToken
  | StackToken
  | InlineToken;

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

// Exposed CSS custom properties for typography categories
export const FONT_FAMILY_VARS = {
  heading: '--uilib-font-heading',
  body: '--uilib-font-body',
  ui: '--uilib-font-ui',
  monospace: '--uilib-font-mono',
} as const;

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
 * Box shadow tokens
 */
const SHADOW_VALUES = [
  'rgba(149, 157, 165, 0.2) 0px 8px 24px',
  'rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px',
  'rgba(0, 0, 0, 0.35) 0px 5px 15px',
  'rgba(0, 0, 0, 0.16) 0px 1px 4px',
  'rgba(0, 0, 0, 0.24) 0px 3px 8px',
  'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
  'rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px',
  'rgba(0, 0, 0, 0.1) 0px 4px 12px',
  'rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px',
  'rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px',
  'rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset',
  'rgba(255, 255, 255, 0.1) 0px 1px 1px 0px inset, rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px',
  'rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px',
  'rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px',
  'rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px',
  'rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px',
  'rgb(38, 57, 77) 0px 20px 30px -10px',
  'rgba(6, 24, 44, 0.4) 0px 0px 0px 2px, rgba(6, 24, 44, 0.65) 0px 4px 6px -1px, rgba(255, 255, 255, 0.08) 0px 1px 0px inset',
  'rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px',
  'rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px',
  'rgba(50, 50, 93, 0.25) 0px 30px 60px -12px, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px',
  'rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset',
  'rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px',
  'rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px',
  'rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px',
  'rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px',
  'rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px',
  'rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px',
  'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px',
  'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px',
  'rgba(0, 0, 0, 0.05) 0px 0px 0px 1px',
  'rgba(0, 0, 0, 0.05) 0px 1px 2px 0px',
  'rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px',
  'rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px',
  'rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
  'rgba(0, 0, 0, 0.1) 0px 20px 25px -5px, rgba(0, 0, 0, 0.04) 0px 10px 10px -5px',
  'rgba(0, 0, 0, 0.25) 0px 25px 50px -12px',
  'rgba(0, 0, 0, 0.06) 0px 2px 4px 0px inset',
  'rgba(0, 0, 0, 0.1) 0px 0px 5px 0px, rgba(0, 0, 0, 0.1) 0px 0px 1px 0px',
  'rgba(0, 0, 0, 0.07) 0px 1px 2px, rgba(0, 0, 0, 0.07) 0px 2px 4px, rgba(0, 0, 0, 0.07) 0px 4px 8px, rgba(0, 0, 0, 0.07) 0px 8px 16px, rgba(0, 0, 0, 0.07) 0px 16px 32px, rgba(0, 0, 0, 0.07) 0px 32px 64px',
  'rgba(0, 0, 0, 0.09) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px',
  'rgba(0, 0, 0, 0.2) 0px 18px 50px -10px',
  'rgba(0, 0, 0, 0.1) 0px 10px 50px',
  'rgba(0, 0, 0, 0.04) 0px 3px 5px',
  'rgba(240, 46, 170, 0.4) -5px 5px, rgba(240, 46, 170, 0.3) -10px 10px, rgba(240, 46, 170, 0.2) -15px 15px, rgba(240, 46, 170, 0.1) -20px 20px, rgba(240, 46, 170, 0.05) -25px 25px',
  'rgba(240, 46, 170, 0.4) 0px 5px, rgba(240, 46, 170, 0.3) 0px 10px, rgba(240, 46, 170, 0.2) 0px 15px, rgba(240, 46, 170, 0.1) 0px 20px, rgba(240, 46, 170, 0.05) 0px 25px',
  'rgba(240, 46, 170, 0.4) 5px 5px, rgba(240, 46, 170, 0.3) 10px 10px, rgba(240, 46, 170, 0.2) 15px 15px, rgba(240, 46, 170, 0.1) 20px 20px, rgba(240, 46, 170, 0.05) 25px 25px',
  'rgba(0, 0, 0, 0.07) 0px 1px 1px, rgba(0, 0, 0, 0.07) 0px 2px 2px, rgba(0, 0, 0, 0.07) 0px 4px 4px, rgba(0, 0, 0, 0.07) 0px 8px 8px, rgba(0, 0, 0, 0.07) 0px 16px 16px',
  'rgba(67, 71, 85, 0.27) 0px 0px 0.25em, rgba(90, 125, 188, 0.05) 0px 0.25em 1em',
  'rgba(0, 0, 0, 0.1) 0px 1px 2px 0px',
  'rgba(27, 31, 35, 0.04) 0px 1px 0px, rgba(255, 255, 255, 0.25) 0px 1px 0px inset',
  'rgba(3, 102, 214, 0.3) 0px 0px 0px 3px',
  'rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px',
  'rgba(0, 0, 0, 0.2) 0px 12px 28px 0px, rgba(0, 0, 0, 0.1) 0px 2px 4px 0px, rgba(255, 255, 255, 0.05) 0px 0px 0px 1px inset',
  'rgba(0, 0, 0, 0.15) 0px 5px 15px 0px',
  'rgba(33, 35, 38, 0.1) 0px 10px 10px -10px',
  'blue 0px 0px 0px 2px inset, rgb(255, 255, 255) 10px -10px 0px -3px, rgb(31, 193, 27) 10px -10px, rgb(255, 255, 255) 20px -20px 0px -3px, rgb(255, 217, 19) 20px -20px, rgb(255, 255, 255) 30px -30px 0px -3px, rgb(255, 156, 85) 30px -30px, rgb(255, 255, 255) 40px -40px 0px -3px, rgb(255, 85, 85) 40px -40px',
  'rgb(85, 91, 255) 0px 0px 0px 3px, rgb(31, 193, 27) 0px 0px 0px 6px, rgb(255, 217, 19) 0px 0px 0px 9px, rgb(255, 156, 85) 0px 0px 0px 12px, rgb(255, 85, 85) 0px 0px 0px 15px',
  'rgb(204, 219, 232) 3px 3px 6px 0px inset, rgba(255, 255, 255, 0.5) -3px -3px 6px 1px inset',
  'rgba(136, 165, 191, 0.48) 6px 2px 16px 0px, rgba(255, 255, 255, 0.8) -6px -2px 16px 0px',
  'rgba(17, 17, 26, 0.1) 0px 1px 0px',
  'rgba(17, 17, 26, 0.05) 0px 1px 0px, rgba(17, 17, 26, 0.1) 0px 0px 8px',
  'rgba(17, 17, 26, 0.1) 0px 0px 16px',
  'rgba(17, 17, 26, 0.05) 0px 4px 16px, rgba(17, 17, 26, 0.05) 0px 8px 32px',
  'rgba(17, 17, 26, 0.1) 0px 4px 16px, rgba(17, 17, 26, 0.05) 0px 8px 32px',
  'rgba(17, 17, 26, 0.1) 0px 1px 0px, rgba(17, 17, 26, 0.1) 0px 8px 24px, rgba(17, 17, 26, 0.1) 0px 16px 48px',
  'rgba(17, 17, 26, 0.1) 0px 4px 16px, rgba(17, 17, 26, 0.1) 0px 8px 24px, rgba(17, 17, 26, 0.1) 0px 16px 56px',
  'rgba(17, 17, 26, 0.1) 0px 8px 24px, rgba(17, 17, 26, 0.1) 0px 16px 56px, rgba(17, 17, 26, 0.1) 0px 24px 80px',
  'rgba(50, 50, 105, 0.15) 0px 2px 5px 0px, rgba(0, 0, 0, 0.05) 0px 1px 1px 0px',
  'rgba(0, 0, 0, 0.15) 0px 15px 25px, rgba(0, 0, 0, 0.05) 0px 5px 10px',
  'rgba(0, 0, 0, 0.15) 2.4px 2.4px 3.2px',
  'rgba(0, 0, 0, 0.15) 0px 3px 3px 0px',
  'rgba(0, 0, 0, 0.08) 0px 4px 12px',
  'rgba(0, 0, 0, 0.15) 0px 2px 8px',
  'rgba(0, 0, 0, 0.18) 0px 2px 4px',
  'rgba(0, 0, 0, 0.1) -4px 9px 25px -6px',
  'rgba(0, 0, 0, 0.2) 0px 60px 40px -7px',
  'rgba(0, 0, 0, 0.4) 0px 30px 90px',
  'rgba(0, 0, 0, 0.2) 0px 20px 30px',
  'rgba(255, 255, 255, 0.2) 0px 0px 0px 1px inset, rgba(0, 0, 0, 0.9) 0px 0px 0px 1px',
  'rgba(0, 0, 0, 0.25) 0px 0.0625em 0.0625em, rgba(0, 0, 0, 0.25) 0px 0.125em 0.5em, rgba(255, 255, 255, 0.1) 0px 0px 0px 1px inset',
  'rgba(0, 0, 0, 0.09) 0px 3px 12px',
  'rgba(0, 0, 0, 0.45) 0px 25px 20px -20px',
  'rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset',
  'rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgb(209, 213, 219) 0px 0px 0px 1px inset',
  'rgba(0, 0, 0, 0.35) 0px -50px 36px -28px inset',
  'rgba(9, 30, 66, 0.25) 0px 1px 1px, rgba(9, 30, 66, 0.13) 0px 0px 1px 1px',
  'rgba(9, 30, 66, 0.25) 0px 4px 8px -2px, rgba(9, 30, 66, 0.08) 0px 0px 0px 1px',
  'rgba(14, 63, 126, 0.04) 0px 0px 0px 1px, rgba(42, 51, 69, 0.04) 0px 1px 1px -0.5px, rgba(42, 51, 70, 0.04) 0px 3px 3px -1.5px, rgba(42, 51, 70, 0.04) 0px 6px 6px -3px, rgba(14, 63, 126, 0.04) 0px 12px 12px -6px, rgba(14, 63, 126, 0.04) 0px 24px 24px -12px',
  'rgba(14, 63, 126, 0.06) 0px 0px 0px 1px, rgba(42, 51, 70, 0.03) 0px 1px 1px -0.5px, rgba(42, 51, 70, 0.04) 0px 2px 2px -1px, rgba(42, 51, 70, 0.04) 0px 3px 3px -1.5px, rgba(42, 51, 70, 0.03) 0px 5px 5px -2.5px, rgba(42, 51, 70, 0.03) 0px 10px 10px -5px, rgba(42, 51, 70, 0.03) 0px 24px 24px -8px',
  '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
  '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)',
  '0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)',
  '0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)',
  '0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22)',
  '0 1.6px 3.6px 0 rgb(0 0 0 / 13%), 0 0.3px 0.9px 0 rgb(0 0 0 / 11%)',
  '0 3.2px 7.2px 0 rgb(0 0 0 / 13%), 0 0.6px 1.8px 0 rgb(0 0 0 / 11%)',
  '0 6.4px 14.4px 0 rgb(0 0 0 / 13%), 0 1.2px 3.6px 0 rgb(0 0 0 / 11%)',
  '0 25.6px 57.6px 0 rgb(0 0 0 / 22%), 0 4.8px 14.4px 0 rgb(0 0 0 / 18%)',
  'rgba(0, 0, 0, 0.075) 0px 2px 4px 0px',
  'rgba(0, 0, 0, 0.15) 0px 8px 16px 0px',
  'rgba(0, 0, 0, 0.176) 0px 16px 48px 0px',
  'rgba(27, 31, 35, 0.04) 0px 1px 0px 0px',
  'rgba(149, 157, 165, 0.15) 0px 3px 6px 0px',
  'rgba(149, 157, 165, 0.2) 0px 8px 24px 0px',
  'rgba(149, 157, 165, 0.3) 0px 12px 48px 0px',
  'rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 1px 2px 0px',
  'rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px',
  'rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px',
  'rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
  'rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0.1) 0px 20px 25px -5px, rgba(0, 0, 0, 0.04) 0px 10px 10px -5px',
  'rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0.25) 0px 25px 50px -12px',
  'rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0.06) 0px 2px 4px 0px inset',
  '-10px -8px 0px rgb(167 243 208)',
  '10px -8px 0px rgb(253 230 138)',
  '10px 8px 0px rgb(191 219 254)',
  '-10px 8px 0px rgb(196 181 253)',
  '15px 51px 45px -35px rgba(0, 0, 0, 0.2)',
  '7px 7px 15px #bbcfda, -4px -4px 13px #fff, inset 4px 4px 8px rgba(209, 217, 230, 0.2), inset -8px -8px 8px rgba(255, 255, 255, 0.2)',
  '0px 4px 6px 0px rgba(50,50,93,0.11), 0px 1px 3px 0px rgba(0,0,0,0.08)',
  '0px 13px 27px -5px rgba(50,50,93,0.25), 0px 8px 16px -8px rgba(0,0,0,0.3), 0px -6px 16px -6px rgba(0,0,0,0.025)',
  '0px 1px 0px 0px rgba(9,30,66,.25)',
  '3px 4px 0px 0px #4e57ef',
  '6px 2px 16px 0px rgba(136, 165, 191, 0.48), -6px -2px 16px 0px rgba(255, 255, 255, 0.8)',
  '3px 3px 6px 0px #CCDBE8 inset, -3px -3px 6px 1px rgba(255,255,255,0.5) inset',
  '0 3px 1px -2px rgb(0 0 0 / 16%), 0 2px 2px 0 rgb(0 0 0 / 11%), 0 1px 5px 0 rgb(0 0 0 / 10%)',
  '0 2px 4px -1px rgb(0 0 0 / 16%), 0 4px 5px 0 rgb(0 0 0 / 11%), 0 1px 10px 0 rgb(0 0 0 / 10%)',
  '0 5px 5px -3px rgb(0 0 0 / 16%), 0 8px 10px 1px rgb(0 0 0 / 11%), 0 3px 14px 2px rgb(0 0 0 / 10%)',
  '0 8px 10px -5px rgb(0 0 0 / 16%), 0 16px 24px 2px rgb(0 0 0 / 11%), 0 6px 30px 5px rgb(0 0 0 / 10%)',
] as const;

type ShadowKeyName = `shadow-${number}`;
const NUMERIC_SHADOWS = SHADOW_VALUES.reduce((acc, value, idx) => {
  acc[`shadow-${idx + 1}` as ShadowKeyName] = value;
  return acc;
}, {} as Record<ShadowKeyName, string>);

export const SHADOWS = {
  none: 'none',
  ...NUMERIC_SHADOWS,
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

