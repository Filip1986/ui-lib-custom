import type { ThemePreset } from '../theme-preset.interface';
import { SHAPE_TOKENS } from 'ui-lib-custom/tokens';

export interface ScssExportOptions {
  includeComments?: boolean;
  variablePrefix?: string;
  outputFormat?: 'variables' | 'map';
}

export function exportThemeAsScss(preset: ThemePreset, options: ScssExportOptions = {}): string {
  const { includeComments = true, variablePrefix = 'uilib', outputFormat = 'variables' } = options;

  const lines: string[] = [];

  if (includeComments) {
    lines.push(`// Theme: ${preset.name}`);
    lines.push(`// Variant: ${preset.variant}`);
    lines.push(`// Generated: ${new Date().toISOString()}`);
    lines.push('');
  }

  if (outputFormat === 'variables') {
    lines.push('// Colors');
    Object.entries(preset.colors).forEach(([key, value]) => {
      lines.push(`$${variablePrefix}-${kebabCase(key)}: ${value};`);
    });

    lines.push('');
    lines.push('// Shape');
    lines.push(`$${variablePrefix}-border-radius: ${mapShapeRadius(preset.shape)};`);

    lines.push('');
    lines.push('// Typography');
    lines.push(`$${variablePrefix}-font-family: ${preset.fonts.body};`);
    lines.push(`$${variablePrefix}-font-size-base: ${preset.typography?.baseFontSize ?? '16px'};`);

    if (preset.shadow) {
      lines.push('');
      lines.push('// Shadows');
      lines.push(`$${variablePrefix}-shadow: ${preset.shadow};`);
    }

    lines.push('');
    lines.push('// CSS Custom Properties (for :root)');
    lines.push(':root {');
    Object.entries(preset.colors).forEach(([key]) => {
      const name = kebabCase(key);
      lines.push(`  --${variablePrefix}-${name}: #{$${variablePrefix}-${name}};`);
    });
    lines.push('}');
  } else {
    lines.push(`$${variablePrefix}-theme: (`);
    lines.push(`  'name': '${preset.name}',`);
    lines.push(`  'variant': '${preset.variant}',`);
    lines.push(`  'colors': (`);
    Object.entries(preset.colors).forEach(([key, value], index, entries) => {
      const comma = index < entries.length - 1 ? ',' : '';
      lines.push(`    '${kebabCase(key)}': ${value}${comma}`);
    });
    lines.push(`  ),`);
    lines.push(`  'border-radius': ${mapShapeRadius(preset.shape)}`);
    lines.push(');');
  }

  return lines.join('\n');
}

function mapShapeRadius(value: string): string {
  const shapeKey = value as keyof typeof SHAPE_TOKENS;
  if (shapeKey in SHAPE_TOKENS) {
    return SHAPE_TOKENS[shapeKey];
  }
  return value;
}

function kebabCase(value: string): string {
  return value.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
}
