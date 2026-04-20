import type { ChartOptions, ChartThemeTokens, ChartType } from './chart.types';
import { ChartThemeService } from './chart-theme.service';

type CssMap = Record<string, string>;

const DEFAULT_TOKENS: Readonly<ChartThemeTokens> = {
  fontFamily: 'inherit',
  fontSize: 12,
  fontColor: '#333333',
  gridColor: 'rgba(0, 0, 0, 0.1)',
  borderColor: 'rgba(0, 0, 0, 0.1)',
  backgroundColor: 'transparent',
  tooltipBackground: 'rgba(0, 0, 0, 0.8)',
  tooltipFontColor: '#ffffff',
  legendFontColor: '#666666',
  colorPalette: [
    '#42A5F5',
    '#66BB6A',
    '#FFA726',
    '#EF5350',
    '#AB47BC',
    '#26C6DA',
    '#D4E157',
    '#8D6E63',
  ],
};

describe('ChartThemeService', (): void => {
  let service: ChartThemeService;

  beforeEach((): void => {
    service = new ChartThemeService();
  });

  afterEach((): void => {
    jest.restoreAllMocks();
  });

  describe('readThemeTokens()', (): void => {
    it('returns defaults when no CSS variables are set', (): void => {
      mockComputedStyle({});

      const tokens: ChartThemeTokens = service.readThemeTokens(document.createElement('div'));

      expect(tokens).toEqual(DEFAULT_TOKENS);
    });

    it('reads each individual CSS variable when set', (): void => {
      const cssVariables: CssMap = {
        '--uilib-chart-font-family': 'Inter, sans-serif',
        '--uilib-chart-font-size': '14px',
        '--uilib-chart-font-color': '#111111',
        '--uilib-chart-grid-color': 'rgba(1, 2, 3, 0.2)',
        '--uilib-chart-border-color': '#123456',
        '--uilib-chart-background-color': '#fafafa',
        '--uilib-chart-tooltip-background': '#000000',
        '--uilib-chart-tooltip-font-color': '#fefefe',
        '--uilib-chart-legend-font-color': '#777777',
        '--uilib-chart-color-1': '#111111',
        '--uilib-chart-color-2': '#222222',
        '--uilib-chart-color-3': '#333333',
        '--uilib-chart-color-4': '#444444',
        '--uilib-chart-color-5': '#555555',
        '--uilib-chart-color-6': '#666666',
        '--uilib-chart-color-7': '#777777',
        '--uilib-chart-color-8': '#888888',
      };
      mockComputedStyle(cssVariables);

      const tokens: ChartThemeTokens = service.readThemeTokens(document.createElement('div'));

      expect(tokens).toEqual({
        fontFamily: 'Inter, sans-serif',
        fontSize: 14,
        fontColor: '#111111',
        gridColor: 'rgba(1, 2, 3, 0.2)',
        borderColor: '#123456',
        backgroundColor: '#fafafa',
        tooltipBackground: '#000000',
        tooltipFontColor: '#fefefe',
        legendFontColor: '#777777',
        colorPalette: [
          '#111111',
          '#222222',
          '#333333',
          '#444444',
          '#555555',
          '#666666',
          '#777777',
          '#888888',
        ],
      });
    });

    it('parses --uilib-chart-font-size as a number', (): void => {
      mockComputedStyle({ '--uilib-chart-font-size': '18' });

      const tokens: ChartThemeTokens = service.readThemeTokens(document.createElement('div'));

      expect(tokens.fontSize).toBe(18);
      expect(typeof tokens.fontSize).toBe('number');
    });

    it('reads all 8 color palette variables', (): void => {
      mockComputedStyle({
        '--uilib-chart-color-1': '#010101',
        '--uilib-chart-color-2': '#020202',
        '--uilib-chart-color-3': '#030303',
        '--uilib-chart-color-4': '#040404',
        '--uilib-chart-color-5': '#050505',
        '--uilib-chart-color-6': '#060606',
        '--uilib-chart-color-7': '#070707',
        '--uilib-chart-color-8': '#080808',
      });

      const tokens: ChartThemeTokens = service.readThemeTokens(document.createElement('div'));

      expect(tokens.colorPalette).toEqual([
        '#010101',
        '#020202',
        '#030303',
        '#040404',
        '#050505',
        '#060606',
        '#070707',
        '#080808',
      ]);
    });

    it('falls back per variable when some CSS variables are missing', (): void => {
      mockComputedStyle({
        '--uilib-chart-font-family': 'Public Sans',
        '--uilib-chart-font-size': '16px',
        '--uilib-chart-color-1': '#111111',
        '--uilib-chart-color-4': '#444444',
      });

      const tokens: ChartThemeTokens = service.readThemeTokens(document.createElement('div'));

      expect(tokens.fontFamily).toBe('Public Sans');
      expect(tokens.fontSize).toBe(16);
      expect(tokens.fontColor).toBe(DEFAULT_TOKENS.fontColor);
      expect(tokens.tooltipBackground).toBe(DEFAULT_TOKENS.tooltipBackground);
      expect(tokens.colorPalette).toEqual([
        '#111111',
        DEFAULT_TOKENS.colorPalette[1],
        DEFAULT_TOKENS.colorPalette[2],
        '#444444',
        DEFAULT_TOKENS.colorPalette[4],
        DEFAULT_TOKENS.colorPalette[5],
        DEFAULT_TOKENS.colorPalette[6],
        DEFAULT_TOKENS.colorPalette[7],
      ]);
    });

    it('handles whitespace values by trimming before parsing', (): void => {
      mockComputedStyle({
        '--uilib-chart-font-family': '   Inter, sans-serif   ',
        '--uilib-chart-font-size': '   20px   ',
        '--uilib-chart-font-color': '   #101010   ',
      });

      const tokens: ChartThemeTokens = service.readThemeTokens(document.createElement('div'));

      expect(tokens.fontFamily).toBe('Inter, sans-serif');
      expect(tokens.fontSize).toBe(20);
      expect(tokens.fontColor).toBe('#101010');
    });

    it('falls back to default font size when provided value is invalid', (): void => {
      mockComputedStyle({ '--uilib-chart-font-size': 'not-a-number' });

      const tokens: ChartThemeTokens = service.readThemeTokens(document.createElement('div'));

      expect(tokens.fontSize).toBe(DEFAULT_TOKENS.fontSize);
    });
  });

  describe('buildChartOptions()', (): void => {
    const tokens: ChartThemeTokens = {
      fontFamily: 'Inter',
      fontSize: 16,
      fontColor: '#1a1a1a',
      gridColor: '#2a2a2a',
      borderColor: '#3a3a3a',
      backgroundColor: '#4a4a4a',
      tooltipBackground: '#5a5a5a',
      tooltipFontColor: '#6a6a6a',
      legendFontColor: '#7a7a7a',
      colorPalette: ['#ffffff'],
    };

    it('maps font tokens to root font paths', (): void => {
      const options: Partial<ChartOptions<ChartType>> = service.buildChartOptions(tokens);

      expect(options.font?.family).toBe(tokens.fontFamily);
      expect(options.font?.size).toBe(tokens.fontSize);
      expect(options.color).toBe(tokens.fontColor);
    });

    it('maps grid and border tokens to scale configuration', (): void => {
      const options: Partial<ChartOptions<ChartType>> = service.buildChartOptions(tokens);
      const scaleX: { grid?: { color?: unknown }; border?: { color?: unknown } } | undefined =
        options.scales?.['x'] as
          | { grid?: { color?: unknown }; border?: { color?: unknown } }
          | undefined;
      const scaleY: { grid?: { color?: unknown }; border?: { color?: unknown } } | undefined =
        options.scales?.['y'] as
          | { grid?: { color?: unknown }; border?: { color?: unknown } }
          | undefined;

      expect(scaleX?.grid?.color).toBe(tokens.gridColor);
      expect(scaleX?.border?.color).toBe(tokens.borderColor);
      expect(scaleY?.grid?.color).toBe(tokens.gridColor);
      expect(scaleY?.border?.color).toBe(tokens.borderColor);
    });

    it('maps tooltip and legend tokens to plugin configuration', (): void => {
      const options: Partial<ChartOptions<ChartType>> = service.buildChartOptions(tokens);

      expect(options.plugins?.tooltip?.backgroundColor).toBe(tokens.tooltipBackground);
      expect(options.plugins?.tooltip?.titleColor).toBe(tokens.tooltipFontColor);
      expect(options.plugins?.tooltip?.bodyColor).toBe(tokens.tooltipFontColor);
      expect(options.plugins?.legend?.labels?.color).toBe(tokens.legendFontColor);
    });

    it('produces a valid partial options object with required nested paths', (): void => {
      const options: Partial<ChartOptions<ChartType>> = service.buildChartOptions(tokens);
      const scaleX: { grid?: { color?: unknown } } | undefined = options.scales?.['x'] as
        | { grid?: { color?: unknown } }
        | undefined;

      expect(options.font).toBeDefined();
      expect(options.plugins).toBeDefined();
      expect(options.plugins?.legend).toBeDefined();
      expect(options.plugins?.legend?.labels).toBeDefined();
      expect(options.plugins?.tooltip).toBeDefined();
      expect(options.scales).toBeDefined();
      expect(options.scales?.['x']).toBeDefined();
      expect(options.scales?.['y']).toBeDefined();
      expect(options.elements).toBeDefined();
      expect(options.elements?.line).toBeDefined();
      expect(options.elements?.bar).toBeDefined();
      expect(options.elements?.arc).toBeDefined();
      expect(options.elements?.point).toBeDefined();
      expect(options.plugins?.tooltip?.backgroundColor).not.toBeUndefined();
      expect(scaleX?.grid?.color).not.toBeUndefined();
      expect(options.plugins?.legend?.labels?.font).not.toBeUndefined();
      expect(options.elements?.line?.backgroundColor).not.toBeUndefined();
    });
  });

  describe('buildColorPalette()', (): void => {
    it('returns exact palette when dataset count equals palette length', (): void => {
      const tokens: ChartThemeTokens = createTokens(['#a', '#b', '#c', '#d']);

      const palette: string[] = service.buildColorPalette(tokens, 4);

      expect(palette).toEqual(['#a', '#b', '#c', '#d']);
    });

    it('returns subset when dataset count is less than palette length', (): void => {
      const tokens: ChartThemeTokens = createTokens(['#a', '#b', '#c', '#d']);

      const palette: string[] = service.buildColorPalette(tokens, 2);

      expect(palette).toEqual(['#a', '#b']);
    });

    it('cycles colors when dataset count exceeds palette length', (): void => {
      const tokens: ChartThemeTokens = createTokens(['#a', '#b', '#c']);

      const palette: string[] = service.buildColorPalette(tokens, 8);

      expect(palette).toEqual(['#a', '#b', '#c', '#a', '#b', '#c', '#a', '#b']);
    });

    it('returns empty array when dataset count is 0', (): void => {
      const tokens: ChartThemeTokens = createTokens(['#a', '#b']);

      const palette: string[] = service.buildColorPalette(tokens, 0);

      expect(palette).toEqual([]);
    });

    it('handles single-color palette by repeating the same value', (): void => {
      const tokens: ChartThemeTokens = createTokens(['#solo']);

      const palette: string[] = service.buildColorPalette(tokens, 5);

      expect(palette).toEqual(['#solo', '#solo', '#solo', '#solo', '#solo']);
    });
  });
});

function createTokens(palette: readonly string[]): ChartThemeTokens {
  return {
    ...DEFAULT_TOKENS,
    colorPalette: palette,
  };
}

function mockComputedStyle(values: CssMap): void {
  jest
    .spyOn(globalThis, 'getComputedStyle')
    .mockImplementation(
      ((): CSSStyleDeclaration => createMockStyleDeclaration(values)) as typeof getComputedStyle
    );
}

function createMockStyleDeclaration(values: CssMap): CSSStyleDeclaration {
  return {
    getPropertyValue(propertyName: string): string {
      return values[propertyName] ?? '';
    },
  } as CSSStyleDeclaration;
}
