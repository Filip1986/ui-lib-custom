import type { ChartOptions, ChartThemeTokens, ChartType } from './chart.types';

const DEFAULT_COLOR_PALETTE: readonly [
  '#42A5F5',
  '#66BB6A',
  '#FFA726',
  '#EF5350',
  '#AB47BC',
  '#26C6DA',
  '#D4E157',
  '#8D6E63',
] = ['#42A5F5', '#66BB6A', '#FFA726', '#EF5350', '#AB47BC', '#26C6DA', '#D4E157', '#8D6E63'];

const CHART_THEME_DEFAULTS: Readonly<ChartThemeTokens> = {
  fontFamily: 'inherit',
  fontSize: 12,
  fontColor: '#333333',
  gridColor: 'rgba(0, 0, 0, 0.1)',
  borderColor: 'rgba(0, 0, 0, 0.1)',
  backgroundColor: 'transparent',
  tooltipBackground: 'rgba(0, 0, 0, 0.8)',
  tooltipFontColor: '#ffffff',
  legendFontColor: '#666666',
  colorPalette: DEFAULT_COLOR_PALETTE,
} as const;

const COLOR_TOKEN_NAMES: readonly string[] = [
  '--uilib-chart-color-1',
  '--uilib-chart-color-2',
  '--uilib-chart-color-3',
  '--uilib-chart-color-4',
  '--uilib-chart-color-5',
  '--uilib-chart-color-6',
  '--uilib-chart-color-7',
  '--uilib-chart-color-8',
] as const;

/**
 * Pure theme bridge that maps `--uilib-chart-*` CSS variables to Chart.js options.
 *
 * This class intentionally has zero Angular dependencies.
 */
export class ChartThemeService {
  /** Reads theme token values from computed style and applies safe fallbacks. */
  public readThemeTokens(element: Element): ChartThemeTokens {
    const styleDeclaration: CSSStyleDeclaration = getComputedStyle(element);

    return {
      fontFamily: this.readStringToken(
        styleDeclaration,
        '--uilib-chart-font-family',
        CHART_THEME_DEFAULTS.fontFamily
      ),
      fontSize: this.readNumberToken(
        styleDeclaration,
        '--uilib-chart-font-size',
        CHART_THEME_DEFAULTS.fontSize
      ),
      fontColor: this.readStringToken(
        styleDeclaration,
        '--uilib-chart-font-color',
        CHART_THEME_DEFAULTS.fontColor
      ),
      gridColor: this.readStringToken(
        styleDeclaration,
        '--uilib-chart-grid-color',
        CHART_THEME_DEFAULTS.gridColor
      ),
      borderColor: this.readStringToken(
        styleDeclaration,
        '--uilib-chart-border-color',
        CHART_THEME_DEFAULTS.borderColor
      ),
      backgroundColor: this.readStringToken(
        styleDeclaration,
        '--uilib-chart-background-color',
        CHART_THEME_DEFAULTS.backgroundColor
      ),
      tooltipBackground: this.readStringToken(
        styleDeclaration,
        '--uilib-chart-tooltip-background',
        CHART_THEME_DEFAULTS.tooltipBackground
      ),
      tooltipFontColor: this.readStringToken(
        styleDeclaration,
        '--uilib-chart-tooltip-font-color',
        CHART_THEME_DEFAULTS.tooltipFontColor
      ),
      legendFontColor: this.readStringToken(
        styleDeclaration,
        '--uilib-chart-legend-font-color',
        CHART_THEME_DEFAULTS.legendFontColor
      ),
      colorPalette: this.readColorPalette(styleDeclaration),
    };
  }

  /** Builds partial Chart.js options using normalized theme tokens. */
  public buildChartOptions(tokens: ChartThemeTokens): Partial<ChartOptions<ChartType>> {
    return {
      color: tokens.fontColor,
      font: {
        family: tokens.fontFamily,
        size: tokens.fontSize,
      },
      plugins: {
        legend: {
          labels: {
            color: tokens.legendFontColor,
            font: {
              family: tokens.fontFamily,
              size: tokens.fontSize,
            },
          },
        },
        tooltip: {
          backgroundColor: tokens.tooltipBackground,
          titleColor: tokens.tooltipFontColor,
          bodyColor: tokens.tooltipFontColor,
          footerColor: tokens.tooltipFontColor,
          borderColor: tokens.borderColor,
        },
      },
      scales: {
        x: {
          ticks: {
            color: tokens.fontColor,
          },
          grid: {
            color: tokens.gridColor,
          },
          border: {
            color: tokens.borderColor,
          },
        },
        y: {
          ticks: {
            color: tokens.fontColor,
          },
          grid: {
            color: tokens.gridColor,
          },
          border: {
            color: tokens.borderColor,
          },
        },
      },
      elements: {
        line: {
          borderColor: tokens.borderColor,
        },
        bar: {
          borderColor: tokens.borderColor,
        },
        arc: {
          borderColor: tokens.borderColor,
        },
        point: {
          borderColor: tokens.borderColor,
        },
      },
    };
  }

  /** Returns a dataset color array and cycles source colors when needed. */
  public buildColorPalette(tokens: ChartThemeTokens, datasetCount: number): string[] {
    if (datasetCount <= 0) {
      return [];
    }

    const sourcePalette: readonly string[] =
      tokens.colorPalette.length > 0 ? tokens.colorPalette : CHART_THEME_DEFAULTS.colorPalette;

    const colors: string[] = [];
    for (let index: number = 0; index < datasetCount; index += 1) {
      const color: string = sourcePalette[index % sourcePalette.length] ?? DEFAULT_COLOR_PALETTE[0];
      colors.push(color);
    }

    return colors;
  }

  private readColorPalette(styleDeclaration: CSSStyleDeclaration): readonly string[] {
    const resolvedPalette: string[] = COLOR_TOKEN_NAMES.map(
      (tokenName: string, index: number): string => {
        const fallbackColor: string =
          CHART_THEME_DEFAULTS.colorPalette[index] ?? DEFAULT_COLOR_PALETTE[0];
        return this.readStringToken(styleDeclaration, tokenName, fallbackColor);
      }
    );

    return resolvedPalette.length > 0 ? resolvedPalette : CHART_THEME_DEFAULTS.colorPalette;
  }

  private readStringToken(
    styleDeclaration: CSSStyleDeclaration,
    tokenName: string,
    fallback: string
  ): string {
    const value: string = styleDeclaration.getPropertyValue(tokenName).trim();
    return value.length > 0 ? value : fallback;
  }

  private readNumberToken(
    styleDeclaration: CSSStyleDeclaration,
    tokenName: string,
    fallback: number
  ): number {
    const rawValue: string = styleDeclaration.getPropertyValue(tokenName).trim();
    if (rawValue.length === 0) {
      return fallback;
    }

    const normalizedValue: string = rawValue.endsWith('px') ? rawValue.slice(0, -2) : rawValue;
    const parsedValue: number = Number.parseFloat(normalizedValue);
    return Number.isFinite(parsedValue) ? parsedValue : fallback;
  }
}
