import type { ThemePreset } from '../theme-preset.interface';
import { exportThemeAsCss } from './css-exporter';
import type { CssExportOptions } from './css-exporter';
import { exportThemeAsScss } from './scss-exporter';
import type { ScssExportOptions } from './scss-exporter';
import { exportThemeAsFigmaTokens, exportThemeAsFigmaJson } from './figma-exporter';
import type { FigmaTokenSet } from './figma-exporter';

// ---------------------------------------------------------------------------
// Shared minimal preset for tests
// ---------------------------------------------------------------------------

const MINIMAL_PRESET: ThemePreset = {
  id: 'test-preset',
  name: 'TestTheme',
  variant: 'material',
  shape: 'rounded',
  density: 'default',
  darkMode: 'light',
  createdAt: 0,
  updatedAt: 0,
  colors: {
    primary: '#1976d2',
    secondary: '#616161',
    success: '#388e3c',
    danger: '#d32f2f',
    warning: '#f57c00',
    info: '#0288d1',
    background: '#ffffff',
    surface: '#ffffff',
  },
  fonts: {
    heading: 'Inter, sans-serif',
    body: 'Inter, sans-serif',
    mono: 'monospace',
  },
};

const PRESET_WITH_SHADOW: ThemePreset = {
  ...MINIMAL_PRESET,
  shadow: 'md',
};

const PRESET_WITH_SHARP_SHAPE: ThemePreset = {
  ...MINIMAL_PRESET,
  shape: 'sharp',
};

const PRESET_WITH_SOFT_SHAPE: ThemePreset = {
  ...MINIMAL_PRESET,
  shape: 'soft',
};

const PRESET_WITH_TYPOGRAPHY: ThemePreset = {
  ...MINIMAL_PRESET,
  typography: {
    fontFamily: 'Inter, sans-serif',
    fontHeading: 'Inter, sans-serif',
    fontBody: 'Inter, sans-serif',
    fontUI: 'Inter, sans-serif',
    fontMonospace: 'monospace',
    baseFontSize: '14px',
  },
};

// ===========================================================================
// CSS Exporter
// ===========================================================================

describe('exportThemeAsCss', (): void => {
  describe('basic output', (): void => {
    it('returns a non-empty string', (): void => {
      const output: string = exportThemeAsCss(MINIMAL_PRESET);
      expect(output.length).toBeGreaterThan(0);
    });

    it('opens with the :root selector by default', (): void => {
      const output: string = exportThemeAsCss(MINIMAL_PRESET);
      expect(output).toContain(':root {');
    });

    it('includes CSS custom properties for each color', (): void => {
      const output: string = exportThemeAsCss(MINIMAL_PRESET);
      expect(output).toContain('--uilib-primary: #1976d2;');
      expect(output).toContain('--uilib-secondary: #616161;');
    });

    it('includes border-radius from shape tokens', (): void => {
      const output: string = exportThemeAsCss(PRESET_WITH_SHARP_SHAPE);
      // shape 'sharp' maps to 0px
      expect(output).toContain('--uilib-border-radius: 0px;');
    });

    it('uses soft shape token when shape is soft', (): void => {
      const output: string = exportThemeAsCss(PRESET_WITH_SOFT_SHAPE);
      expect(output).toContain('--uilib-border-radius: 12px;');
    });

    it('includes font-family from preset fonts.body', (): void => {
      const output: string = exportThemeAsCss(MINIMAL_PRESET);
      expect(output).toContain('--uilib-font-family: Inter, sans-serif;');
    });

    it('uses default baseFontSize of 16px when typography is absent', (): void => {
      const output: string = exportThemeAsCss(MINIMAL_PRESET);
      expect(output).toContain('--uilib-font-size-base: 16px;');
    });

    it('uses typography.baseFontSize when present', (): void => {
      const output: string = exportThemeAsCss(PRESET_WITH_TYPOGRAPHY);
      expect(output).toContain('--uilib-font-size-base: 14px;');
    });

    it('closes with a closing brace', (): void => {
      const output: string = exportThemeAsCss(MINIMAL_PRESET);
      expect(output.trim().endsWith('}')).toBe(true);
    });
  });

  describe('options: includeComments', (): void => {
    it('includes comments by default', (): void => {
      const output: string = exportThemeAsCss(MINIMAL_PRESET);
      expect(output).toContain('/* Theme: TestTheme */');
      expect(output).toContain('/* Variant: material */');
    });

    it('omits header comments when includeComments is false', (): void => {
      const output: string = exportThemeAsCss(MINIMAL_PRESET, { includeComments: false });
      expect(output).not.toContain('/* Theme:');
      expect(output).not.toContain('/* Variant:');
      expect(output).not.toContain('/* Generated:');
    });
  });

  describe('options: selector', (): void => {
    it('uses custom selector when provided', (): void => {
      const options: CssExportOptions = { selector: '.my-theme', includeComments: false };
      const output: string = exportThemeAsCss(MINIMAL_PRESET, options);
      expect(output).toContain('.my-theme {');
      expect(output).not.toContain(':root {');
    });
  });

  describe('options: includeReset', (): void => {
    it('does not include reset block by default', (): void => {
      const output: string = exportThemeAsCss(MINIMAL_PRESET);
      expect(output).not.toContain('color-scheme: light dark;');
    });

    it('includes reset block when includeReset is true', (): void => {
      const output: string = exportThemeAsCss(MINIMAL_PRESET, { includeReset: true });
      expect(output).toContain('color-scheme: light dark;');
    });
  });

  describe('shadow support', (): void => {
    it('includes shadow variable when preset.shadow is set', (): void => {
      const output: string = exportThemeAsCss(PRESET_WITH_SHADOW);
      expect(output).toContain('--uilib-shadow:');
    });

    it('omits shadow variable when preset.shadow is absent', (): void => {
      const output: string = exportThemeAsCss(MINIMAL_PRESET);
      expect(output).not.toContain('--uilib-shadow:');
    });

    it('maps known shadow token "md"', (): void => {
      const output: string = exportThemeAsCss(PRESET_WITH_SHADOW, { includeComments: false });
      // Should resolve 'md' to a concrete value
      expect(output).toContain('--uilib-shadow:');
    });

    it('passes through unknown shadow value verbatim', (): void => {
      const customPreset: ThemePreset = { ...MINIMAL_PRESET, shadow: '5px 5px 10px red' };
      const output: string = exportThemeAsCss(customPreset, { includeComments: false });
      expect(output).toContain('--uilib-shadow: 5px 5px 10px red;');
    });
  });

  describe('camelCase color keys are kebab-cased', (): void => {
    it('converts camelCase color key to kebab-case CSS var', (): void => {
      const preset: ThemePreset = {
        ...MINIMAL_PRESET,
        colors: { ...MINIMAL_PRESET.colors, surfaceAlt: '#f0f0f0' },
      };
      const output: string = exportThemeAsCss(preset, { includeComments: false });
      expect(output).toContain('--uilib-surface-alt: #f0f0f0;');
    });
  });
});

// ===========================================================================
// SCSS Exporter
// ===========================================================================

describe('exportThemeAsScss', (): void => {
  describe('variables output format (default)', (): void => {
    it('returns a non-empty string', (): void => {
      const output: string = exportThemeAsScss(MINIMAL_PRESET);
      expect(output.length).toBeGreaterThan(0);
    });

    it('includes SCSS color variables for each color', (): void => {
      const output: string = exportThemeAsScss(MINIMAL_PRESET);
      expect(output).toContain('$uilib-primary: #1976d2;');
    });

    it('includes border-radius variable', (): void => {
      const output: string = exportThemeAsScss(MINIMAL_PRESET);
      expect(output).toContain('$uilib-border-radius:');
    });

    it('includes font-family variable', (): void => {
      const output: string = exportThemeAsScss(MINIMAL_PRESET);
      expect(output).toContain('$uilib-font-family: Inter, sans-serif;');
    });

    it('uses default baseFontSize of 16px when absent', (): void => {
      const output: string = exportThemeAsScss(MINIMAL_PRESET);
      expect(output).toContain('$uilib-font-size-base: 16px;');
    });

    it('uses typography.baseFontSize when present', (): void => {
      const output: string = exportThemeAsScss(PRESET_WITH_TYPOGRAPHY);
      expect(output).toContain('$uilib-font-size-base: 14px;');
    });

    it('includes a :root block with CSS custom properties', (): void => {
      const output: string = exportThemeAsScss(MINIMAL_PRESET);
      expect(output).toContain(':root {');
      expect(output).toContain('--uilib-');
    });

    it('includes shadow variable when preset.shadow is set', (): void => {
      const output: string = exportThemeAsScss(PRESET_WITH_SHADOW);
      expect(output).toContain('$uilib-shadow:');
    });

    it('omits shadow variable when preset.shadow is absent', (): void => {
      const output: string = exportThemeAsScss(MINIMAL_PRESET);
      expect(output).not.toContain('$uilib-shadow:');
    });
  });

  describe('options: includeComments', (): void => {
    it('includes comments by default', (): void => {
      const output: string = exportThemeAsScss(MINIMAL_PRESET);
      expect(output).toContain('// Theme: TestTheme');
    });

    it('omits header comments when includeComments is false', (): void => {
      const output: string = exportThemeAsScss(MINIMAL_PRESET, { includeComments: false });
      expect(output).not.toContain('// Theme:');
      expect(output).not.toContain('// Variant:');
      expect(output).not.toContain('// Generated:');
    });
  });

  describe('options: variablePrefix', (): void => {
    it('uses custom variable prefix', (): void => {
      const options: ScssExportOptions = { variablePrefix: 'myapp', includeComments: false };
      const output: string = exportThemeAsScss(MINIMAL_PRESET, options);
      expect(output).toContain('$myapp-primary: #1976d2;');
    });
  });

  describe('options: outputFormat = map', (): void => {
    it('outputs a SCSS map instead of variables', (): void => {
      const output: string = exportThemeAsScss(MINIMAL_PRESET, { outputFormat: 'map' });
      expect(output).toContain('$uilib-theme: (');
      expect(output).toContain("'name': 'TestTheme'");
      expect(output).toContain("'variant': 'material'");
      expect(output).toContain("'colors': (");
      expect(output.trim().endsWith(');')).toBe(true);
    });

    it('includes border-radius in map output', (): void => {
      const output: string = exportThemeAsScss(MINIMAL_PRESET, { outputFormat: 'map' });
      expect(output).toContain("'border-radius':");
    });

    it('does not include :root block in map output', (): void => {
      const output: string = exportThemeAsScss(MINIMAL_PRESET, { outputFormat: 'map' });
      expect(output).not.toContain(':root {');
    });
  });

  describe('shape token mapping', (): void => {
    it('maps sharp shape to 0px', (): void => {
      const output: string = exportThemeAsScss(PRESET_WITH_SHARP_SHAPE, {
        includeComments: false,
      });
      expect(output).toContain('$uilib-border-radius: 0px;');
    });

    it('passes through unknown shape value verbatim', (): void => {
      const preset: ThemePreset = { ...MINIMAL_PRESET, shape: 'unknown-shape' as never };
      const output: string = exportThemeAsScss(preset, { includeComments: false });
      expect(output).toContain('$uilib-border-radius: unknown-shape;');
    });
  });
});

// ===========================================================================
// Figma Exporter
// ===========================================================================

describe('exportThemeAsFigmaTokens', (): void => {
  let tokens: FigmaTokenSet;

  beforeEach((): void => {
    tokens = exportThemeAsFigmaTokens(MINIMAL_PRESET);
  });

  it('returns a non-null object', (): void => {
    expect(tokens).toBeTruthy();
    expect(typeof tokens).toBe('object');
  });

  it('has a color section', (): void => {
    expect(tokens['color']).toBeDefined();
  });

  it('has a borderRadius section', (): void => {
    expect(tokens['borderRadius']).toBeDefined();
  });

  it('has a fontFamily section', (): void => {
    expect(tokens['fontFamily']).toBeDefined();
  });

  it('has a spacing section', (): void => {
    expect(tokens['spacing']).toBeDefined();
  });

  it('has a shadow section', (): void => {
    expect(tokens['shadow']).toBeDefined();
  });

  it('color.primary token value matches preset primary color', (): void => {
    const colorSection: FigmaTokenSet = tokens['color'] as FigmaTokenSet;
    const primary: { value: string; type: string } = colorSection['primary'] as {
      value: string;
      type: string;
    };
    expect(primary.value).toBe('#1976d2');
    expect(primary.type).toBe('color');
  });

  it('color.secondary token value matches preset', (): void => {
    const colorSection: FigmaTokenSet = tokens['color'] as FigmaTokenSet;
    const secondary: { value: string; type: string } = colorSection['secondary'] as {
      value: string;
      type: string;
    };
    expect(secondary.value).toBe('#616161');
  });

  it('fontFamily.base uses preset fonts.body', (): void => {
    const fontSection: FigmaTokenSet = tokens['fontFamily'] as FigmaTokenSet;
    const base: { value: string; type: string } = fontSection['base'] as {
      value: string;
      type: string;
    };
    expect(base.value).toBe('Inter, sans-serif');
    expect(base.type).toBe('fontFamily');
  });

  it('fontFamily.heading falls back to fonts.body when fonts.heading equals fonts.body', (): void => {
    const fontSection: FigmaTokenSet = tokens['fontFamily'] as FigmaTokenSet;
    const heading: { value: string; type: string } = fontSection['heading'] as {
      value: string;
      type: string;
    };
    expect(heading.value).toBe('Inter, sans-serif');
  });

  it('borderRadius.default maps rounded shape to 6px', (): void => {
    const brSection: FigmaTokenSet = tokens['borderRadius'] as FigmaTokenSet;
    const def: { value: string; type: string } = brSection['default'] as {
      value: string;
      type: string;
    };
    expect(def.value).toBe('6px');
    expect(def.type).toBe('borderRadius');
  });

  it('borderRadius.default uses mapBorderRadiusToPixels for unknown shape', (): void => {
    const unknownPreset: ThemePreset = { ...MINIMAL_PRESET, shape: 'sm' as never };
    const unknownTokens: FigmaTokenSet = exportThemeAsFigmaTokens(unknownPreset);
    const brSection: FigmaTokenSet = unknownTokens['borderRadius'] as FigmaTokenSet;
    const def: { value: string; type: string } = brSection['default'] as {
      value: string;
      type: string;
    };
    expect(def.value).toBe('2px');
  });

  it('background.default falls back to #ffffff when colors.background is absent', (): void => {
    const noBackground: ThemePreset = {
      ...MINIMAL_PRESET,
      colors: { ...MINIMAL_PRESET.colors, background: undefined as unknown as string },
    };
    const noBackgroundTokens: FigmaTokenSet = exportThemeAsFigmaTokens(noBackground);
    const colorSection: FigmaTokenSet = noBackgroundTokens['color'] as FigmaTokenSet;
    const bgSection: FigmaTokenSet = colorSection['background'] as FigmaTokenSet;
    const def: { value: string } = bgSection['default'] as { value: string };
    expect(def.value).toBe('#ffffff');
  });
});

describe('exportThemeAsFigmaJson', (): void => {
  it('returns valid JSON string', (): void => {
    const json: string = exportThemeAsFigmaJson(MINIMAL_PRESET);
    expect((): unknown => JSON.parse(json)).not.toThrow();
  });

  it('parsed JSON contains color section', (): void => {
    const json: string = exportThemeAsFigmaJson(MINIMAL_PRESET);
    const parsed: Record<string, unknown> = JSON.parse(json) as Record<string, unknown>;
    expect(parsed['color']).toBeDefined();
  });

  it('is pretty-printed with 2-space indent', (): void => {
    const json: string = exportThemeAsFigmaJson(MINIMAL_PRESET);
    expect(json).toContain('  "color"');
  });
});
