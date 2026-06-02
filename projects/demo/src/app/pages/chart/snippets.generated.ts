/* eslint-disable */
// AUTO-GENERATED — run `node scripts/generate-snippets.mjs` to regenerate.
// Do not edit manually.

export const basicBarTsTs = `import { Component } from '@angular/core';
import { BarChartComponent, provideChartDefaults } from 'ui-lib-custom/chart';
import type { ChartData } from 'ui-lib-custom/chart';

@Component({
  standalone: true,
  imports: [BarChartComponent],
  templateUrl: './basic-bar-ts.example.html',
})
export class MyComponent {
  constructor() {
    provideChartDefaults();
  }
  public readonly monthlyRevenueData: ChartData<'bar'> = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [{ label: 'Monthly Revenue (k$)', data: [82, 96, 104, 118, 126, 139] }],
  };
}`;

export const basicBarHtml = `<ui-lib-bar-chart [data]="monthlyRevenueData" />`;

export const basicLineTsTs = `import { Component } from '@angular/core';
import { LineChartComponent, provideChartDefaults } from 'ui-lib-custom/chart';
import type { ChartData } from 'ui-lib-custom/chart';

@Component({
  standalone: true,
  imports: [LineChartComponent],
  templateUrl: './basic-line-ts.example.html',
})
export class MyComponent {
  constructor() {
    provideChartDefaults();
  }
  public readonly userGrowthData: ChartData<'line'> = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6'],
    datasets: [{ label: 'Active Users (k)', data: [12, 14, 17, 19, 24, 28], tension: 0.35 }],
  };
}`;

export const basicLineHtml = `<ui-lib-line-chart [data]="userGrowthData" />`;

export const bubbleTsTs = `import { Component } from '@angular/core';
import { ChartComponent, provideChartDefaults } from 'ui-lib-custom/chart';
import type { ChartData } from 'ui-lib-custom/chart';

@Component({
  standalone: true,
  imports: [ChartComponent],
  templateUrl: './bubble-ts.example.html',
})
export class MyComponent {
  constructor() {
    provideChartDefaults();
  }
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
}`;

export const bubbleHtml = `<ui-lib-chart type="bubble" [data]="bubbleSegmentData" />`;

export const clickEventsTsTs = `import { Component } from '@angular/core';
import { BarChartComponent, provideChartDefaults } from 'ui-lib-custom/chart';
import type { ChartData, ChartClickEvent } from 'ui-lib-custom/chart';

@Component({
  standalone: true,
  imports: [BarChartComponent],
  templateUrl: './click-events-ts.example.html',
})
export class MyComponent {
  constructor() {
    provideChartDefaults();
  }
  public readonly clickableRevenueData: ChartData<'bar'> = {
    labels: ['API', 'Web', 'Partner', 'Mobile'],
    datasets: [{ label: 'Revenue by Channel (k$)', data: [58, 79, 43, 64] }],
  };
  public onChartClick(event: ChartClickEvent): void {
    console.log('Clicked element index:', event.activeElements[0]?.index);
  }
}`;

export const clickEventsHtml = `<ui-lib-bar-chart [data]="clickableRevenueData" (chartClick)="onChartClick($event)" />`;

export const customDimensionsTsTs = `import { Component } from '@angular/core';
import { LineChartComponent, provideChartDefaults } from 'ui-lib-custom/chart';
import type { ChartData } from 'ui-lib-custom/chart';

@Component({
  standalone: true,
  imports: [LineChartComponent],
  templateUrl: './custom-dimensions-ts.example.html',
})
export class MyComponent {
  constructor() {
    provideChartDefaults();
  }
  public readonly customDimensionData: ChartData<'line'> = {
    labels: ['Sprint 1', 'Sprint 2', 'Sprint 3', 'Sprint 4'],
    datasets: [{ label: 'Completed Stories', data: [21, 24, 27, 30], tension: 0.25 }],
  };
}`;

export const customDimensionsHtml = `<ui-lib-line-chart height="320px" width="640px" [data]="customDimensionData" />`;

export const customOptionsTsTs = `import { Component } from '@angular/core';
import { DoughnutChartComponent, provideChartDefaults } from 'ui-lib-custom/chart';
import type { ChartData, ChartOptions } from 'ui-lib-custom/chart';
import type { TooltipItem } from 'chart.js';

@Component({
  standalone: true,
  imports: [DoughnutChartComponent],
  templateUrl: './custom-options-ts.example.html',
})
export class MyComponent {
  constructor() {
    provideChartDefaults();
  }
  public readonly customOptionsData: ChartData<'doughnut'> = {
    labels: ['Onboarding', 'Expansion', 'Renewal'],
    datasets: [{ label: 'Pipeline Mix', data: [29, 46, 25] }],
  };
  public readonly customLegendOptions: ChartOptions<'doughnut'> = {
    plugins: {
      legend: { position: 'bottom' },
      tooltip: {
        callbacks: {
          label: (context: TooltipItem<'doughnut'>): string =>
            \`\${context.label}: \${String(context.parsed)} deals\`,
        },
      },
    },
  };
}`;

export const customOptionsHtml = `<ui-lib-doughnut-chart [data]="customOptionsData" [options]="customLegendOptions" />`;

export const doughnutTsTs = `import { Component } from '@angular/core';
import { DoughnutChartComponent, provideChartDefaults } from 'ui-lib-custom/chart';
import type { ChartData } from 'ui-lib-custom/chart';

@Component({
  standalone: true,
  imports: [DoughnutChartComponent],
  templateUrl: './doughnut-ts.example.html',
})
export class MyComponent {
  constructor() {
    provideChartDefaults();
  }
  public readonly channelMixData: ChartData<'doughnut'> = {
    labels: ['Direct', 'Partners', 'Marketplace', 'Inside Sales'],
    datasets: [{ label: 'Acquisition Channel Mix', data: [31, 27, 22, 20] }],
  };
}`;

export const doughnutHtml = `<ui-lib-doughnut-chart [data]="channelMixData" />`;

export const dynamicUpdateTsTs = `import { Component } from '@angular/core';
import { BarChartComponent, provideChartDefaults } from 'ui-lib-custom/chart';
import type { ChartData } from 'ui-lib-custom/chart';
import { Button } from 'ui-lib-custom/button';
import { Inline } from 'ui-lib-custom/layout';

@Component({
  standalone: true,
  imports: [BarChartComponent, Button, Inline],
  templateUrl: './dynamic-update-ts.example.html',
})
export class MyComponent {
  constructor() {
    provideChartDefaults();
  }
  public dynamicRevenueData: ChartData<'bar'> = {
    labels: ['Product A', 'Product B', 'Product C'],
    datasets: [{ label: 'Live Revenue (k$)', data: [44, 57, 39] }],
  };
  public randomizeRevenueData(): void {
    this.dynamicRevenueData = {
      labels: this.dynamicRevenueData.labels,
      datasets: [
        {
          label: 'Live Revenue (k$)',
          data: [Math.random() * 100, Math.random() * 100, Math.random() * 100],
        },
      ],
    };
  }
}`;

export const dynamicUpdateHtml = `<ui-lib-inline align="center" [gap]="2">
  <ui-lib-button (click)="randomizeRevenueData()">Randomize</ui-lib-button>
</ui-lib-inline>
<ui-lib-bar-chart [data]="dynamicRevenueData" />`;

export const lineAreaTsTs = `import { Component } from '@angular/core';
import { LineChartComponent, provideChartDefaults } from 'ui-lib-custom/chart';
import type { ChartData } from 'ui-lib-custom/chart';

@Component({
  standalone: true,
  imports: [LineChartComponent],
  templateUrl: './line-area-ts.example.html',
})
export class MyComponent {
  constructor() {
    provideChartDefaults();
  }
  public readonly trafficAreaData: ChartData<'line'> = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      { label: 'Site Sessions (k)', data: [8, 9, 11, 10, 13, 15, 14], fill: true, tension: 0.3 },
    ],
  };
}`;

export const lineAreaHtml = `<ui-lib-line-chart [data]="trafficAreaData" />`;

export const mixedTsTs = `import { Component } from '@angular/core';
import { ChartComponent, provideChartDefaults } from 'ui-lib-custom/chart';
import type { ChartData, ChartOptions } from 'ui-lib-custom/chart';

@Component({
  standalone: true,
  imports: [ChartComponent],
  templateUrl: './mixed-ts.example.html',
})
export class MyComponent {
  constructor() {
    provideChartDefaults();
  }
  public readonly mixedKpiData: ChartData<'bar'> = {
    labels: ['Jan', 'Feb', 'Mar'],
    datasets: [
      { label: 'Revenue (k$)', data: [90, 99, 109] },
      {
        type: 'line',
        label: 'Conversion Rate (%)',
        data: [2.8, 3.0, 3.2],
        yAxisID: 'y1',
        tension: 0.3,
      },
    ],
  } as ChartData<'bar'>;
  public readonly mixedChartOptions: ChartOptions<'bar'> = {
    scales: { y1: { position: 'right', grid: { drawOnChartArea: false } } },
  } as ChartOptions<'bar'>;
}`;

export const mixedHtml = `<ui-lib-chart type="bar" [data]="mixedKpiData" [options]="mixedChartOptions" />`;

export const multiDatasetBarTsTs = `import { Component } from '@angular/core';
import { BarChartComponent, provideChartDefaults } from 'ui-lib-custom/chart';
import type { ChartData } from 'ui-lib-custom/chart';

@Component({
  standalone: true,
  imports: [BarChartComponent],
  templateUrl: './multi-dataset-bar-ts.example.html',
})
export class MyComponent {
  constructor() {
    provideChartDefaults();
  }
  public readonly regionalRevenueData: ChartData<'bar'> = {
    labels: ['Q1', 'Q2', 'Q3', 'Q4'],
    datasets: [
      { label: 'Enterprise', data: [120, 132, 144, 158] },
      { label: 'Mid-Market', data: [86, 94, 101, 112] },
      { label: 'SMB', data: [52, 57, 64, 72] },
    ],
  };
}`;

export const multiDatasetBarHtml = `<ui-lib-bar-chart [data]="regionalRevenueData" />`;

export const pieTsTs = `import { Component } from '@angular/core';
import { PieChartComponent, provideChartDefaults } from 'ui-lib-custom/chart';
import type { ChartData } from 'ui-lib-custom/chart';

@Component({
  standalone: true,
  imports: [PieChartComponent],
  templateUrl: './pie-ts.example.html',
})
export class MyComponent {
  constructor() {
    provideChartDefaults();
  }
  public readonly marketShareData: ChartData<'pie'> = {
    labels: ['North America', 'Europe', 'APAC', 'LATAM'],
    datasets: [{ label: 'Market Share', data: [37, 28, 24, 11] }],
  };
}`;

export const pieHtml = `<ui-lib-pie-chart [data]="marketShareData" />`;

export const polarAreaTsTs = `import { Component } from '@angular/core';
import { ChartComponent, provideChartDefaults } from 'ui-lib-custom/chart';
import type { ChartData } from 'ui-lib-custom/chart';

@Component({
  standalone: true,
  imports: [ChartComponent],
  templateUrl: './polar-area-ts.example.html',
})
export class MyComponent {
  constructor() {
    provideChartDefaults();
  }
  public readonly polarPriorityData: ChartData<'polarArea'> = {
    labels: ['Performance', 'Localization', 'A11y', 'Analytics', 'Automation'],
    datasets: [{ label: 'Roadmap Priority', data: [14, 10, 12, 8, 9] }],
  };
}`;

export const polarAreaHtml = `<ui-lib-chart type="polarArea" [data]="polarPriorityData" />`;

export const radarTsTs = `import { Component } from '@angular/core';
import { ChartComponent, provideChartDefaults } from 'ui-lib-custom/chart';
import type { ChartData } from 'ui-lib-custom/chart';

@Component({
  standalone: true,
  imports: [ChartComponent],
  templateUrl: './radar-ts.example.html',
})
export class MyComponent {
  constructor() {
    provideChartDefaults();
  }
  public readonly radarCapabilityData: ChartData<'radar'> = {
    labels: ['Reliability', 'Security', 'Scalability', 'Usability', 'Support', 'Speed'],
    datasets: [{ label: 'Platform Capability', data: [85, 88, 90, 79, 84, 87] }],
  };
}`;

export const radarHtml = `<ui-lib-chart type="radar" [data]="radarCapabilityData" />`;

export const scatterTsTs = `import { Component } from '@angular/core';
import { ChartComponent, provideChartDefaults } from 'ui-lib-custom/chart';
import type { ChartData } from 'ui-lib-custom/chart';

@Component({
  standalone: true,
  imports: [ChartComponent],
  templateUrl: './scatter-ts.example.html',
})
export class MyComponent {
  constructor() {
    provideChartDefaults();
  }
  public readonly scatterConversionData: ChartData<'scatter'> = {
    datasets: [
      {
        label: 'Paid Campaigns',
        data: [
          { x: 1.2, y: 2.1 },
          { x: 1.8, y: 2.7 },
        ],
      },
    ],
  };
}`;

export const scatterHtml = `<ui-lib-chart type="scatter" [data]="scatterConversionData" />`;

export const sizesTsTs = `import { Component } from '@angular/core';
import { BarChartComponent, provideChartDefaults } from 'ui-lib-custom/chart';
import type { ChartData } from 'ui-lib-custom/chart';
import { Grid } from 'ui-lib-custom/layout';

@Component({
  standalone: true,
  imports: [BarChartComponent, Grid],
  templateUrl: './sizes-ts.example.html',
})
export class MyComponent {
  constructor() {
    provideChartDefaults();
  }
  public readonly sizePreviewData: ChartData<'bar'> = {
    labels: ['Jan', 'Feb', 'Mar'],
    datasets: [{ label: 'Preview', data: [5, 7, 9] }],
  };
}`;

export const sizesHtml = `<ui-lib-grid spacing="md" [columns]="3">
  <ui-lib-bar-chart size="sm" [data]="sizePreviewData" />
  <ui-lib-bar-chart size="md" [data]="sizePreviewData" />
  <ui-lib-bar-chart size="lg" [data]="sizePreviewData" />
</ui-lib-grid>`;

export const stackedBarTsTs = `import { Component } from '@angular/core';
import { BarChartComponent, provideChartDefaults } from 'ui-lib-custom/chart';
import type { ChartData, ChartOptions } from 'ui-lib-custom/chart';

@Component({
  standalone: true,
  imports: [BarChartComponent],
  templateUrl: './stacked-bar-ts.example.html',
})
export class MyComponent {
  constructor() {
    provideChartDefaults();
  }
  public readonly stackedCostData: ChartData<'bar'> = {
    labels: ['Q1', 'Q2', 'Q3', 'Q4'],
    datasets: [
      { label: 'Infrastructure', data: [32, 34, 36, 38] },
      { label: 'Operations', data: [24, 25, 27, 29] },
    ],
  };
  public readonly stackedBarOptions: ChartOptions<'bar'> = {
    scales: { x: { stacked: true }, y: { stacked: true } },
  };
}`;

export const stackedBarHtml = `<ui-lib-bar-chart [data]="stackedCostData" [options]="stackedBarOptions" />`;

export const themeIntegrationTsTs = `import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LineChartComponent, provideChartDefaults } from 'ui-lib-custom/chart';
import type { ChartData } from 'ui-lib-custom/chart';
import { Button } from 'ui-lib-custom/button';
import { Inline } from 'ui-lib-custom/layout';

@Component({
  standalone: true,
  imports: [LineChartComponent, Button, Inline, CommonModule],
  templateUrl: './theme-integration-ts.example.html',
})
export class MyComponent {
  constructor() {
    provideChartDefaults();
  }
  public selectedProfile: 'material' | 'bootstrap' | 'minimal' = 'material';
  public readonly themeBridgeData: ChartData<'line'> = {
    labels: ['Q1', 'Q2', 'Q3', 'Q4'],
    datasets: [{ label: 'Satisfaction Score', data: [72, 76, 81, 85], tension: 0.35 }],
  };
  public setThemeProfile(
    profile: 'material' | 'bootstrap' | 'minimal',
    chart: { refresh(): void }
  ): void {
    this.selectedProfile = profile;
    chart.refresh();
  }
  public themeCssVariables(): Record<string, string> {
    return {};
  }
}`;

export const themeIntegrationHtml = `<ui-lib-inline [gap]="2">
  <ui-lib-button (click)="setThemeProfile('material', themeChart)">Material</ui-lib-button>
  <ui-lib-button (click)="setThemeProfile('bootstrap', themeChart)">Bootstrap</ui-lib-button>
  <ui-lib-button (click)="setThemeProfile('minimal', themeChart)">Minimal</ui-lib-button>
</ui-lib-inline>
<div [ngStyle]="themeCssVariables()">
  <ui-lib-line-chart #themeChart [data]="themeBridgeData" />
</div>`;
