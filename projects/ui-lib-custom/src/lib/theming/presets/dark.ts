import type { ThemePreset } from '../theme-preset.interface';

/**
 * Theme preset: dark.
 */
export const darkPreset: ThemePreset = {
  id: 'preset-dark',
  name: 'dark',
  description: 'Default dark preset',
  variant: 'material',
  shape: 'rounded',
  density: 'default',
  darkMode: 'dark',
  colorScheme: 'dark',
  colors: {
    primary: '#90caf9',
    secondary: '#ce93d8',
    success: '#81c784',
    danger: '#f44336',
    warning: '#ffb74d',
    info: '#4fc3f7',
    background: '#121212',
    surface: '#1e1e1e',
    surfaceAlt: '#232323',
    text: 'rgba(255, 255, 255, 0.87)',
    textSecondary: 'rgba(255, 255, 255, 0.60)',
    border: 'rgba(255, 255, 255, 0.12)',
  },
  fonts: {
    heading: "'Inter', 'Segoe UI', sans-serif",
    body: "'Inter', 'Segoe UI', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
  typography: {
    fontFamily: "'Inter', 'Segoe UI', sans-serif",
    fontHeading: "'Inter', 'Segoe UI', sans-serif",
    fontBody: "'Inter', 'Segoe UI', sans-serif",
    fontUI: "'Inter', 'Segoe UI', sans-serif",
    fontMonospace:
      "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
    baseFontSize: '16px',
    headingWeight: 600,
    bodyWeight: 400,
  },
  shadow: 'shadow-3',
  cardShadow: 'shadow-3',
  buttonShadow: 'shadow-1',
  icons: {
    defaultLibrary: 'material',
    defaultSize: 'md',
    sizes: {
      xs: '0.75rem',
      sm: '1rem',
      md: '1.25rem',
      lg: '1.5rem',
      xl: '2rem',
      '2xl': '2.5rem',
    },
  },
  createdAt: 1700000000000,
  updatedAt: 1700000000000,
};
