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
  fontFamily: string;
  baseFontSize: string;
}

export interface ThemePreset {
  name: string;
  variant: ThemeVariant;
  colors: ThemePresetColors;
  shape: ThemePresetShape;
  typography: ThemePresetTypography;
}

export type ThemePresetOverrides = DeepPartial<ThemePreset>;

export type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};
