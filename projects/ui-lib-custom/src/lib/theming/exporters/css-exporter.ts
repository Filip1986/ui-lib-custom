import type { ThemePreset } from '../theme-preset.interface';
import { BORDER_RADIUS, SHADOWS, SHAPE_TOKENS } from 'ui-lib-custom/tokens';

export interface CssExportOptions {
  includeComments?: boolean;
  selector?: string;
  includeReset?: boolean;
}

export function exportThemeAsCss(preset: ThemePreset, options: CssExportOptions = {}): string {
  const { includeComments = true, selector = ':root', includeReset = false } = options;

  const lines: string[] = [];

  if (includeComments) {
    lines.push(`/* Theme: ${preset.name} */`);
    lines.push(`/* Variant: ${preset.variant} */`);
    lines.push(`/* Generated: ${new Date().toISOString()} */`);
    lines.push('');
  }

  if (includeReset) {
    lines.push('/* Reset */');
    lines.push(`${selector} {`);
    lines.push('  color-scheme: light dark;');
    lines.push('}');
    lines.push('');
  }

  lines.push(`${selector} {`);

  lines.push('  /* Colors */');
  Object.entries(preset.colors).forEach(([key, value]: [string, string]): void => {
    lines.push(`  --uilib-${kebabCase(key)}: ${value};`);
  });

  lines.push('');
  lines.push('  /* Shape */');
  lines.push(`  --uilib-border-radius: ${mapShapeRadius(preset.shape)};`);

  lines.push('');
  lines.push('  /* Typography */');
  lines.push(`  --uilib-font-family: ${preset.fonts.body};`);
  lines.push(`  --uilib-font-size-base: ${preset.typography?.baseFontSize ?? '16px'};`);

  if (preset.shadow) {
    lines.push('');
    lines.push('  /* Shadows */');
    lines.push(`  --uilib-shadow: ${mapShadow(preset.shadow)};`);
  }

  lines.push('}');

  return lines.join('\n');
}

function mapBorderRadius(value: string): string {
  if (value in BORDER_RADIUS) {
    return BORDER_RADIUS[value as keyof typeof BORDER_RADIUS];
  }

  const fallback: Record<string, string> = {
    '0': '0',
    sm: '0.125rem',
    md: '0.375rem',
    lg: '0.5rem',
    xl: '0.75rem',
  };

  return fallback[value] ?? value;
}

function mapShadow(value: string): string {
  if (value in SHADOWS) {
    return SHADOWS[value as keyof typeof SHADOWS] ?? 'none';
  }

  const fallback: Record<string, string> = {
    none: 'none',
    sm: '0 1px 2px rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px rgba(0, 0, 0, 0.1)',
    lg: '0 10px 15px rgba(0, 0, 0, 0.1)',
  };

  return fallback[value] ?? value;
}

function mapShapeRadius(value: string): string {
  const shapeKey: keyof typeof SHAPE_TOKENS = value as keyof typeof SHAPE_TOKENS;
  if (shapeKey in SHAPE_TOKENS) {
    return SHAPE_TOKENS[shapeKey];
  }
  return mapBorderRadius(value);
}

function kebabCase(value: string): string {
  return value.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
}
