import type { IconLibrary, IconSize } from '../icon';

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

export interface ThemePresetSelectButtonSize {
  padding?: string;
  fontSize?: string;
  minHeight?: string;
}

export interface ThemePresetSelectButtonVariantState {
  bg?: string;
  selectedBg?: string;
  selectedFg?: string;
  hoverBg?: string;
  border?: string;
  shadow?: string;
}

export interface ThemePresetSelectButton {
  gap?: string;
  disabledOpacity?: string;
  invalidBorder?: string;
  borderRadius?: {
    material?: string;
    bootstrap?: string;
    minimal?: string;
  };
  sizes?: {
    small?: ThemePresetSelectButtonSize;
    medium?: ThemePresetSelectButtonSize;
    large?: ThemePresetSelectButtonSize;
  };
  material?: ThemePresetSelectButtonVariantState;
  bootstrap?: ThemePresetSelectButtonVariantState;
  minimal?: ThemePresetSelectButtonVariantState;
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
  selectButton?: ThemePresetSelectButton;
}

export type ThemePresetOverrides = DeepPartial<ThemePreset>;

export type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};
