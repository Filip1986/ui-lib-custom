import { IconLibrary, IconSize } from '../icon/icon.types';

export type ThemeVariant = 'material' | 'bootstrap' | 'minimal';

export type ThemeShapeRadius = 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full' | string;

export interface ThemePresetColors {
  primary: string;
  secondary: string;
  success: string;
  danger: string;
  warning: string;
  info: string;
  background: string;
  surface: string;
  surfaceAlt: string;
  text: string;
  textSecondary: string;
  border: string;
}

export interface ThemePresetShape {
  borderRadius: ThemeShapeRadius;
  buttonRadius: ThemeShapeRadius;
  cardRadius: ThemeShapeRadius;
  inputRadius: ThemeShapeRadius;
}

export interface ThemePresetTypography {
  /** Backward compat: treated as alias for fontBody */
  fontFamily: string;
  fontHeading: string;
  fontBody: string;
  fontUI: string;
  fontMonospace: string;
  baseFontSize: string;
  headingWeight?: number; // default 600
  bodyWeight?: number; // default 400
}

export interface ThemeIconConfig {
  defaultLibrary: IconLibrary;
  defaultSize: IconSize;
  sizes: Record<IconSize, string>;
}

export interface ThemePreset {
  name: string;
  variant: ThemeVariant;
  colors: ThemePresetColors;
  shape: ThemePresetShape;
  typography: ThemePresetTypography;
  shadow?: string;
  cardShadow?: string;
  buttonShadow?: string;
  icons?: ThemeIconConfig;
}

export type ThemePresetOverrides = DeepPartial<ThemePreset>;

export type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};
