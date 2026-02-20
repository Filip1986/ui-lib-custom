import type { ThemePreset } from '../theme-preset.interface';

/**
 * Figma Tokens format (compatible with Figma Tokens plugin)
 * https://docs.tokens.studio/
 */

export interface FigmaTokenSet {
  [key: string]: FigmaToken | FigmaTokenSet;
}

export interface FigmaToken {
  value: string | number;
  type: 'color' | 'dimension' | 'fontFamily' | 'fontWeight' | 'shadow' | 'borderRadius';
  description?: string;
}

export function exportThemeAsFigmaTokens(preset: ThemePreset): FigmaTokenSet {
  const tokens: FigmaTokenSet = {
    color: {
      primary: {
        value: preset.colors.primary,
        type: 'color',
        description: 'Primary brand color',
      },
      secondary: {
        value: preset.colors.secondary,
        type: 'color',
        description: 'Secondary brand color',
      },
      success: {
        value: preset.colors.success,
        type: 'color',
      },
      danger: {
        value: preset.colors.danger,
        type: 'color',
      },
      warning: {
        value: preset.colors.warning,
        type: 'color',
      },
      info: {
        value: preset.colors.info,
        type: 'color',
      },
      background: {
        default: {
          value: preset.colors.background || '#ffffff',
          type: 'color',
        },
        surface: {
          value: preset.colors.surface || '#ffffff',
          type: 'color',
        },
      },
      text: {
        primary: {
          value: preset.colors.text || '#212121',
          type: 'color',
        },
        secondary: {
          value: preset.colors.textSecondary || '#757575',
          type: 'color',
        },
      },
      border: {
        default: {
          value: preset.colors.border || '#e0e0e0',
          type: 'color',
        },
      },
    },
    borderRadius: {
      none: { value: '0', type: 'borderRadius' },
      sm: { value: '2px', type: 'borderRadius' },
      md: { value: '4px', type: 'borderRadius' },
      lg: { value: '8px', type: 'borderRadius' },
      xl: { value: '12px', type: 'borderRadius' },
      full: { value: '9999px', type: 'borderRadius' },
      default: {
        value: mapBorderRadiusToPixels(preset.shape.borderRadius),
        type: 'borderRadius',
      },
    },
    fontFamily: {
      base: {
        value: preset.typography?.fontFamily || 'Inter, sans-serif',
        type: 'fontFamily',
      },
      heading: {
        value:
          preset.typography?.fontHeading || preset.typography?.fontFamily || 'Inter, sans-serif',
        type: 'fontFamily',
      },
      mono: {
        value: preset.typography?.fontMonospace || 'Fira Code, monospace',
        type: 'fontFamily',
      },
    },
    spacing: {
      0: { value: '0', type: 'dimension' },
      1: { value: '4px', type: 'dimension' },
      2: { value: '8px', type: 'dimension' },
      3: { value: '12px', type: 'dimension' },
      4: { value: '16px', type: 'dimension' },
      5: { value: '20px', type: 'dimension' },
      6: { value: '24px', type: 'dimension' },
      8: { value: '32px', type: 'dimension' },
      10: { value: '40px', type: 'dimension' },
      12: { value: '48px', type: 'dimension' },
    },
    shadow: {
      none: { value: 'none', type: 'shadow' },
      sm: { value: '0 1px 2px 0 rgba(0, 0, 0, 0.05)', type: 'shadow' },
      md: { value: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', type: 'shadow' },
      lg: { value: '0 10px 15px -3px rgba(0, 0, 0, 0.1)', type: 'shadow' },
    },
  };

  return tokens;
}

export function exportThemeAsFigmaJson(preset: ThemePreset): string {
  const tokens = exportThemeAsFigmaTokens(preset);
  return JSON.stringify(tokens, null, 2);
}

function mapBorderRadiusToPixels(value: string): string {
  const map: Record<string, string> = {
    '0': '0',
    sm: '2px',
    md: '4px',
    lg: '8px',
    xl: '12px',
  };
  return map[value] || value;
}
