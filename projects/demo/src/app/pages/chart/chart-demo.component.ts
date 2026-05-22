import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, viewChild } from '@angular/core';
import type { Signal } from '@angular/core';
import type { DocSection } from '@demo/shared/doc-page/doc-section.model';
import { DocPageHeaderComponent } from '@demo/shared/doc-page/doc-page-header.component';
import { DocPageLayoutComponent } from '@demo/shared/doc-page/doc-page-layout.component';
import { DocTocComponent } from '@demo/shared/doc-page/doc-toc.component';
import { DocQualityBadgeComponent } from '@demo/shared/doc-page/doc-quality-badge.component';
import type { ComponentQualityAudit } from '@demo/shared/doc-page/doc-quality-badge.component';
import { Button } from 'ui-lib-custom/button';
import {
  BarChartComponent,
  ChartComponent,
  DoughnutChartComponent,
  LineChartComponent,
  PieChartComponent,
  provideChartDefaults,
} from 'ui-lib-custom/chart';
import type { ChartClickEvent, ChartData, ChartOptions } from 'ui-lib-custom/chart';
import type { TooltipItem } from 'chart.js';
import { Grid, Inline, Stack } from 'ui-lib-custom/layout';

import { Panel } from 'ui-lib-custom/panel';
import { DocCodeExampleComponent } from '@demo/shared/doc-page/doc-code-example.component';
import { DocApiReferenceComponent } from '@demo/shared/doc-page/doc-api-reference.component';
import type { ApiPropRow } from '@demo/shared/doc-page/doc-api-reference.component';
import {
  basicBarHtml,
  basicBarTsTs,
  basicLineHtml,
  basicLineTsTs,
  pieHtml,
  pieTsTs,
  doughnutHtml,
  doughnutTsTs,
  radarHtml,
  radarTsTs,
  polarAreaHtml,
  polarAreaTsTs,
  bubbleHtml,
  bubbleTsTs,
  scatterHtml,
  scatterTsTs,
  multiDatasetBarHtml,
  multiDatasetBarTsTs,
  stackedBarHtml,
  stackedBarTsTs,
  lineAreaHtml,
  lineAreaTsTs,
  mixedHtml,
  mixedTsTs,
  sizesHtml,
  sizesTsTs,
  customDimensionsHtml,
  customDimensionsTsTs,
  dynamicUpdateHtml,
  dynamicUpdateTsTs,
  themeIntegrationHtml,
  themeIntegrationTsTs,
  clickEventsHtml,
  clickEventsTsTs,
  customOptionsHtml,
  customOptionsTsTs,
} from './snippets.generated';

import { DocSectionComponent } from '@demo/shared/doc-page/doc-section.component';
import { DocCssVarsTableComponent } from '@demo/shared/doc-page/doc-css-vars-table.component';
import type { CssVarRow } from '@demo/shared/doc-page/doc-css-vars-table.component';
import { DocKeyboardNavComponent } from '@demo/shared/doc-page/doc-keyboard-nav.component';
import type { KeyboardNavRow } from '@demo/shared/doc-page/doc-keyboard-nav.component';
import { DocAriaTableComponent } from '@demo/shared/doc-page/doc-aria-table.component';
import type { AriaRow } from '@demo/shared/doc-page/doc-aria-table.component';
type ChartThemeProfileKey = 'material' | 'bootstrap' | 'minimal';

type RefreshableChart = {
  refresh(): void;
};

type ThemeCssVariables = {
  '--uilib-chart-font-color': string;
  '--uilib-chart-grid-color': string;
  '--uilib-chart-border-color': string;
  '--uilib-chart-tooltip-background': string;
  '--uilib-chart-tooltip-font-color': string;
  '--uilib-chart-legend-font-color': string;
  '--uilib-chart-color-1': string;
  '--uilib-chart-color-2': string;
  '--uilib-chart-color-3': string;
  '--uilib-chart-color-4': string;
};

/**
 * Demo page for Chart wrappers, generic chart types, theming bridge, and interaction patterns.
 */
@Component({
  selector: 'app-chart-demo',
  standalone: true,
  imports: [
    Panel,
    CommonModule,
    DocPageHeaderComponent,
    DocPageLayoutComponent,
    DocTocComponent,
    Button,
    Stack,
    Inline,
    Grid,
    ChartComponent,
    BarChartComponent,
    LineChartComponent,
    PieChartComponent,
    DoughnutChartComponent,
    DocQualityBadgeComponent,
    DocCodeExampleComponent,
    DocApiReferenceComponent,
    DocSectionComponent,

    DocCssVarsTableComponent,
    DocKeyboardNavComponent,
    DocAriaTableComponent,
  ],
  templateUrl: './chart-demo.component.html',
  styleUrl: './chart-demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChartDemoComponent {
  public readonly basicBarHtml: string = basicBarHtml;
  public readonly basicBarTsTs: string = basicBarTsTs;
  public readonly basicLineHtml: string = basicLineHtml;
  public readonly basicLineTsTs: string = basicLineTsTs;
  public readonly pieHtml: string = pieHtml;
  public readonly pieTsTs: string = pieTsTs;
  public readonly doughnutHtml: string = doughnutHtml;
  public readonly doughnutTsTs: string = doughnutTsTs;
  public readonly radarHtml: string = radarHtml;
  public readonly radarTsTs: string = radarTsTs;
  public readonly polarAreaHtml: string = polarAreaHtml;
  public readonly polarAreaTsTs: string = polarAreaTsTs;
  public readonly bubbleHtml: string = bubbleHtml;
  public readonly bubbleTsTs: string = bubbleTsTs;
  public readonly scatterHtml: string = scatterHtml;
  public readonly scatterTsTs: string = scatterTsTs;
  public readonly multiDatasetBarHtml: string = multiDatasetBarHtml;
  public readonly multiDatasetBarTsTs: string = multiDatasetBarTsTs;
  public readonly stackedBarHtml: string = stackedBarHtml;
  public readonly stackedBarTsTs: string = stackedBarTsTs;
  public readonly lineAreaHtml: string = lineAreaHtml;
  public readonly lineAreaTsTs: string = lineAreaTsTs;
  public readonly mixedHtml: string = mixedHtml;
  public readonly mixedTsTs: string = mixedTsTs;
  public readonly sizesHtml: string = sizesHtml;
  public readonly sizesTsTs: string = sizesTsTs;
  public readonly customDimensionsHtml: string = customDimensionsHtml;
  public readonly customDimensionsTsTs: string = customDimensionsTsTs;
  public readonly dynamicUpdateHtml: string = dynamicUpdateHtml;
  public readonly dynamicUpdateTsTs: string = dynamicUpdateTsTs;
  public readonly themeIntegrationHtml: string = themeIntegrationHtml;
  public readonly themeIntegrationTsTs: string = themeIntegrationTsTs;
  public readonly clickEventsHtml: string = clickEventsHtml;
  public readonly clickEventsTsTs: string = clickEventsTsTs;
  public readonly customOptionsHtml: string = customOptionsHtml;
  public readonly customOptionsTsTs: string = customOptionsTsTs;

  public readonly qualityAudit: ComponentQualityAudit = {
    date: '2026-05-18',
    tier: 1,
    scores: {
      api: 9,
      a11y: 9,
      perf: 9,
      comp: 8,
      theme: 9,
      dx: 9,
      docs: 9,
      polish: 9,
      angular: 9,
      feel: 9,
    },
    competitiveParity: 'pending',
  };

  public readonly importCode: string =
    "import { ChartComponent, BarChartComponent, LineChartComponent } from 'ui-lib-custom/chart'";

  private static defaultsProvided: boolean = false;

  public readonly layout: Signal<DocPageLayoutComponent | undefined> =
    viewChild(DocPageLayoutComponent);

  public readonly sections: DocSection[] = [
    { id: 'basic-bar', label: 'Basic Bar Chart' },
    { id: 'basic-line', label: 'Basic Line Chart' },
    { id: 'pie-chart', label: 'Pie Chart' },
    { id: 'doughnut-chart', label: 'Doughnut Chart' },
    { id: 'generic-radar', label: 'Generic Radar' },
    { id: 'generic-polar-area', label: 'Generic Polar Area' },
    { id: 'generic-bubble', label: 'Generic Bubble' },
    { id: 'generic-scatter', label: 'Generic Scatter' },
    { id: 'multi-dataset-bar', label: 'Multi-Dataset Bar' },
    { id: 'stacked-bar', label: 'Stacked Bar' },
    { id: 'line-area-fill', label: 'Line Area Fill' },
    { id: 'mixed-chart', label: 'Mixed Chart' },
    { id: 'sizes', label: 'Sizes' },
    { id: 'custom-dimensions', label: 'Custom Dimensions' },
    { id: 'dynamic-data-update', label: 'Dynamic Data Update' },
    { id: 'theme-integration', label: 'Theme Integration' },
    { id: 'click-events', label: 'Click Events' },
    { id: 'custom-options', label: 'Custom Options' },
    { id: 'api', label: 'API Reference' },
    { id: 'accessibility', label: 'Accessibility' },
    { id: 'css-vars', label: 'CSS Custom Properties' },
  ];

  public scrollTo(id: string): void {
    this.layout()?.scrollToSection(id);
  }

  public readonly monthlyRevenueData: ChartData<'bar'> = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [{ label: 'Monthly Revenue (k$)', data: [82, 96, 104, 118, 126, 139] }],
  };

  public readonly userGrowthData: ChartData<'line'> = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6'],
    datasets: [{ label: 'Active Users (k)', data: [12, 14, 17, 19, 24, 28], tension: 0.35 }],
  };

  public readonly marketShareData: ChartData<'pie'> = {
    labels: ['North America', 'Europe', 'APAC', 'LATAM'],
    datasets: [{ label: 'Market Share', data: [37, 28, 24, 11] }],
  };

  public readonly channelMixData: ChartData<'doughnut'> = {
    labels: ['Direct', 'Partners', 'Marketplace', 'Inside Sales'],
    datasets: [{ label: 'Acquisition Channel Mix', data: [31, 27, 22, 20] }],
  };

  public readonly radarCapabilityData: ChartData<'radar'> = {
    labels: ['Reliability', 'Security', 'Scalability', 'Usability', 'Support', 'Speed'],
    datasets: [{ label: 'Platform Capability', data: [85, 88, 90, 79, 84, 87] }],
  };

  public readonly polarPriorityData: ChartData<'polarArea'> = {
    labels: ['Performance', 'Localization', 'A11y', 'Analytics', 'Automation'],
    datasets: [{ label: 'Roadmap Priority', data: [14, 10, 12, 8, 9] }],
  };

  public readonly bubbleSegmentData: ChartData<'bubble'> = {
    datasets: [
      {
        label: 'Enterprise',
        data: [
          { x: 18, y: 42, r: 14 },
          { x: 25, y: 57, r: 18 },
        ],
      },
      {
        label: 'SMB',
        data: [
          { x: 12, y: 34, r: 10 },
          { x: 20, y: 39, r: 11 },
        ],
      },
    ],
  };

  public readonly scatterConversionData: ChartData<'scatter'> = {
    datasets: [
      {
        label: 'Paid Campaigns',
        data: [
          { x: 1.2, y: 2.1 },
          { x: 1.8, y: 2.7 },
          { x: 2.4, y: 3.2 },
          { x: 3.1, y: 3.8 },
        ],
      },
    ],
  };

  public readonly regionalRevenueData: ChartData<'bar'> = {
    labels: ['Q1', 'Q2', 'Q3', 'Q4'],
    datasets: [
      { label: 'Enterprise', data: [120, 132, 144, 158] },
      { label: 'Mid-Market', data: [86, 94, 101, 112] },
      { label: 'SMB', data: [52, 57, 64, 72] },
    ],
  };

  public readonly stackedCostData: ChartData<'bar'> = {
    labels: ['Q1', 'Q2', 'Q3', 'Q4'],
    datasets: [
      { label: 'Infrastructure', data: [32, 34, 36, 38] },
      { label: 'Operations', data: [24, 25, 27, 29] },
      { label: 'Support', data: [14, 15, 16, 17] },
    ],
  };

  public readonly stackedBarOptions: ChartOptions<'bar'> = {
    scales: {
      x: { stacked: true },
      y: { stacked: true },
    },
  };

  public readonly trafficAreaData: ChartData<'line'> = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Site Sessions (k)',
        data: [8, 9, 11, 10, 13, 15, 14],
        fill: true,
        tension: 0.3,
      },
    ],
  };

  public readonly mixedKpiData: ChartData<'bar'> = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      { label: 'Revenue (k$)', data: [90, 99, 109, 121, 134, 146] },
      {
        type: 'line',
        label: 'Conversion Rate (%)',
        data: [2.8, 3.0, 3.2, 3.1, 3.4, 3.6],
        yAxisID: 'y1',
        tension: 0.3,
      },
    ],
  } as ChartData<'bar'>;

  public readonly mixedChartOptions: ChartOptions<'bar'> = {
    scales: {
      y: {
        title: { display: true, text: 'Revenue (k$)' },
      },
      y1: {
        position: 'right',
        grid: { drawOnChartArea: false },
        title: { display: true, text: 'Conversion (%)' },
      },
    },
  } as ChartOptions<'bar'>;

  public readonly sizePreviewData: ChartData<'bar'> = {
    labels: ['Jan', 'Feb', 'Mar'],
    datasets: [{ label: 'Preview', data: [5, 7, 9] }],
  };

  public readonly customDimensionData: ChartData<'line'> = {
    labels: ['Sprint 1', 'Sprint 2', 'Sprint 3', 'Sprint 4'],
    datasets: [{ label: 'Completed Stories', data: [21, 24, 27, 30], tension: 0.25 }],
  };

  public dynamicRevenueData: ChartData<'bar'> = {
    labels: ['Product A', 'Product B', 'Product C', 'Product D', 'Product E'],
    datasets: [{ label: 'Live Revenue (k$)', data: [44, 57, 39, 63, 52] }],
  };

  public readonly themeBridgeData: ChartData<'line'> = {
    labels: ['Q1', 'Q2', 'Q3', 'Q4'],
    datasets: [{ label: 'Satisfaction Score', data: [72, 76, 81, 85], tension: 0.35 }],
  };

  public selectedThemeProfile: ChartThemeProfileKey = 'material';

  public readonly clickableRevenueData: ChartData<'bar'> = {
    labels: ['API', 'Web', 'Partner', 'Mobile'],
    datasets: [{ label: 'Revenue by Channel (k$)', data: [58, 79, 43, 64] }],
  };

  public selectedPointLabel: string = 'Click a chart segment to inspect selection details.';

  public readonly customOptionsData: ChartData<'doughnut'> = {
    labels: ['Onboarding', 'Expansion', 'Renewal'],
    datasets: [{ label: 'Pipeline Mix', data: [29, 46, 25] }],
  };

  public readonly customLegendOptions: ChartOptions<'doughnut'> = {
    plugins: {
      legend: { position: 'bottom' },
      tooltip: {
        callbacks: {
          label: (context: TooltipItem<'doughnut'>): string => {
            const value: number = Number(context.parsed);
            return `${context.label}: ${String(value)} deals`;
          },
        },
      },
    },
  };

  constructor() {
    if (!ChartDemoComponent.defaultsProvided) {
      provideChartDefaults();
      ChartDemoComponent.defaultsProvided = true;
    }
  }

  public randomizeRevenueData(): void {
    const labels: string[] = (this.dynamicRevenueData.labels as string[] | undefined) ?? [
      'Product A',
      'Product B',
      'Product C',
    ];
    const nextDataPoints: number[] = labels.map((): number => this.randomBetween(30, 95));

    this.dynamicRevenueData = {
      labels,
      datasets: [{ label: 'Live Revenue (k$)', data: nextDataPoints }],
    };
  }

  public setThemeProfile(profile: ChartThemeProfileKey, chart: RefreshableChart): void {
    this.selectedThemeProfile = profile;
    chart.refresh();
  }

  public themeCssVariables(): ThemeCssVariables {
    const profileVariables: Record<ChartThemeProfileKey, ThemeCssVariables> = {
      material: {
        '--uilib-chart-font-color': '#1f2937',
        '--uilib-chart-grid-color': 'rgba(31, 41, 55, 0.12)',
        '--uilib-chart-border-color': 'rgba(31, 41, 55, 0.2)',
        '--uilib-chart-tooltip-background': 'rgba(17, 24, 39, 0.92)',
        '--uilib-chart-tooltip-font-color': '#f9fafb',
        '--uilib-chart-legend-font-color': '#374151',
        '--uilib-chart-color-1': '#3b82f6',
        '--uilib-chart-color-2': '#10b981',
        '--uilib-chart-color-3': '#f59e0b',
        '--uilib-chart-color-4': '#ef4444',
      },
      bootstrap: {
        '--uilib-chart-font-color': '#0f172a',
        '--uilib-chart-grid-color': 'rgba(15, 23, 42, 0.15)',
        '--uilib-chart-border-color': 'rgba(15, 23, 42, 0.22)',
        '--uilib-chart-tooltip-background': 'rgba(2, 6, 23, 0.9)',
        '--uilib-chart-tooltip-font-color': '#f8fafc',
        '--uilib-chart-legend-font-color': '#1e293b',
        '--uilib-chart-color-1': '#0d6efd',
        '--uilib-chart-color-2': '#20c997',
        '--uilib-chart-color-3': '#fd7e14',
        '--uilib-chart-color-4': '#dc3545',
      },
      minimal: {
        '--uilib-chart-font-color': '#111827',
        '--uilib-chart-grid-color': 'rgba(17, 24, 39, 0.08)',
        '--uilib-chart-border-color': 'rgba(17, 24, 39, 0.15)',
        '--uilib-chart-tooltip-background': 'rgba(17, 24, 39, 0.85)',
        '--uilib-chart-tooltip-font-color': '#f3f4f6',
        '--uilib-chart-legend-font-color': '#111827',
        '--uilib-chart-color-1': '#111827',
        '--uilib-chart-color-2': '#4b5563',
        '--uilib-chart-color-3': '#6b7280',
        '--uilib-chart-color-4': '#9ca3af',
      },
    };

    return profileVariables[this.selectedThemeProfile];
  }

  public onChartClick(event: ChartClickEvent): void {
    const firstActiveElement: ChartClickEvent['activeElements'][number] | undefined =
      event.activeElements[0];
    const datasetIndex: number = firstActiveElement?.datasetIndex ?? -1;
    const pointIndex: number = firstActiveElement?.index ?? -1;

    if (datasetIndex < 0 || pointIndex < 0) {
      this.selectedPointLabel = 'Selection was empty.';
      return;
    }

    const labels: readonly unknown[] = event.chart.data.labels ?? [];
    const labelText: string = String(labels[pointIndex] ?? `Index ${String(pointIndex)}`);
    this.selectedPointLabel = `Dataset ${String(datasetIndex + 1)}, point ${String(pointIndex + 1)}: ${labelText}`;
  }

  private randomBetween(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  public readonly apiRows: readonly ApiPropRow[] = [
    {
      name: 'data',
      type: "ChartData<'bar'> | null",
      default: 'null',
      description: 'Chart.js data configuration.',
    },
    {
      name: 'options',
      type: "ChartOptions<'bar'> | null",
      default: 'null',
      description: 'Chart.js options object.',
    },
    {
      name: 'plugins',
      type: 'Plugin[]',
      default: '[]',
      description: 'Additional Chart.js plugins.',
    },
    {
      name: 'size',
      type: "'sm' | 'md' | 'lg'",
      default: "'md'",
      description: 'Predefined size preset.',
    },
    {
      name: 'responsive',
      type: 'boolean',
      default: 'true',
      description: 'Enables responsive resizing.',
    },
    {
      name: 'maintainAspectRatio',
      type: 'boolean',
      default: 'true',
      description: 'Keeps the configured aspect ratio.',
    },
    {
      name: 'ariaLabel',
      type: 'string',
      default: "'Chart'",
      description: 'Accessible label for the canvas element.',
    },
    { name: 'height', type: 'string | null', default: 'null', description: 'Explicit height.' },
    { name: 'width', type: 'string | null', default: 'null', description: 'Explicit width.' },
  ];
  public readonly keyboardRows: KeyboardNavRow[] = [
    {
      key: 'Tab',
      action:
        'Moves focus into and out of the chart host in natural document order. The canvas itself is not keyboard-interactive.',
    },
  ];

  public readonly ariaRows: readonly AriaRow[] = [
    {
      element: 'canvas',
      attribute: 'role="img"',
      value: '—',
      notes: 'Exposes the canvas as an image to assistive technology.',
    },
    {
      element: 'canvas',
      attribute: 'aria-label',
      value: 'ariaLabel input (default: "Chart")',
      notes: 'Describes the chart content to screen readers. Always provide a meaningful label.',
    },
    {
      element: 'canvas',
      attribute: 'aria-describedby',
      value: 'data table element ID',
      notes:
        'Present when <code>[showDataTable]="true"</code>. Points to the visually-hidden data table.',
    },
    {
      element: 'Data table',
      attribute: 'id',
      value: 'ui-lib-chart-table-{n}',
      notes: 'Auto-generated unique ID per instance, referenced by <code>aria-describedby</code>.',
    },
  ];

  public readonly cssVarRows: CssVarRow[] = [
    { variable: '--uilib-chart-min-height-sm', description: 'Minimum height — sm.' },
    { variable: '--uilib-chart-min-height-md', description: 'Minimum height — md.' },
    { variable: '--uilib-chart-min-height-lg', description: 'Minimum height — lg.' },
    { variable: '--uilib-chart-min-height', description: 'Minimum height.' },
    { variable: '--uilib-chart-font-family', description: 'Font family.' },
    { variable: '--uilib-chart-font-size', description: 'Font size.' },
    { variable: '--uilib-chart-font-color', description: 'Font text colour.' },
    { variable: '--uilib-chart-grid-color', description: 'Grid text colour.' },
    { variable: '--uilib-chart-border-color', description: 'Border colour.' },
    { variable: '--uilib-chart-background-color', description: 'Background text colour.' },
    { variable: '--uilib-chart-tooltip-background', description: 'Tooltip Background.' },
    { variable: '--uilib-chart-tooltip-font-color', description: 'Tooltip Font text colour.' },
    { variable: '--uilib-chart-legend-font-color', description: 'Legend Font text colour.' },
    { variable: '--uilib-chart-color-1', description: 'Color 1.' },
    { variable: '--uilib-chart-color-2', description: 'Color 2.' },
    { variable: '--uilib-chart-color-3', description: 'Color 3.' },
    { variable: '--uilib-chart-color-4', description: 'Color 4.' },
    { variable: '--uilib-chart-color-5', description: 'Color 5.' },
    { variable: '--uilib-chart-color-6', description: 'Color 6.' },
    { variable: '--uilib-chart-color-7', description: 'Color 7.' },
    { variable: '--uilib-chart-color-8', description: 'Color 8.' },
  ];
}
