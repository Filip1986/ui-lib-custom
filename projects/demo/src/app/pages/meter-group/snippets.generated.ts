/* eslint-disable */
// AUTO-GENERATED — run `node scripts/generate-snippets.mjs` to regenerate.
// Do not edit manually.

export const basicHtml = `<ui-lib-meter-group [values]="storageItems" />`;

export const basicTs = `import { Component } from '@angular/core';
import { MeterGroup } from 'ui-lib-custom/meter-group';
import type { MeterItem } from 'ui-lib-custom/meter-group';

@Component({
  standalone: true,
  imports: [MeterGroup],
  templateUrl: './basic.example.html',
})
export class MyComponent {
  public readonly storageItems: MeterItem[] = [
    { label: 'Apps', value: 16, color: '#34d399' },
    { label: 'Messages', value: 8, color: '#818cf8' },
    { label: 'Media', value: 24, color: '#fb923c' },
    { label: 'System', value: 10, color: '#f87171' },
  ];
}`;

export const labelPositionHtml = `<!-- legend above the bar -->
<ui-lib-meter-group labelPosition="start" [values]="items" />

<!-- legend below the bar (default) -->
<ui-lib-meter-group labelPosition="end" [values]="items" />`;

export const labelPositionTs = `import { Component } from '@angular/core';
import { MeterGroup } from 'ui-lib-custom/meter-group';
import type { MeterItem } from 'ui-lib-custom/meter-group';

@Component({
  standalone: true,
  imports: [MeterGroup],
  templateUrl: './label-position.example.html',
})
export class MyComponent {
  public readonly items: MeterItem[] = [
    { label: 'Documents', value: 38, color: '#0ea5e9' },
    { label: 'Videos', value: 21, color: '#d946ef' },
    { label: 'Photos', value: 17, color: '#f59e0b' },
    { label: 'Other', value: 12, color: '#6b7280' },
  ];
}`;

export const noLegendHtml = `<ui-lib-meter-group [showLabels]="false" [values]="items" />`;

export const sizesHtml = `<ui-lib-meter-group size="sm" [showLabels]="false" [values]="items" />
<ui-lib-meter-group size="md" [showLabels]="false" [values]="items" />
<ui-lib-meter-group size="lg" [showLabels]="false" [values]="items" />`;

export const sizesTs = `import { Component } from '@angular/core';
import { MeterGroup } from 'ui-lib-custom/meter-group';
import type { MeterItem } from 'ui-lib-custom/meter-group';

@Component({
  standalone: true,
  imports: [MeterGroup],
  templateUrl: './sizes.example.html',
})
export class MyComponent {
  public readonly items: MeterItem[] = [
    { label: 'Used', value: 45, color: '#6366f1' },
    { label: 'Cached', value: 25, color: '#a5b4fc' },
    { label: 'Free', value: 30, color: '#e0e7ff' },
  ];
}`;

export const variantsHtml = `<ui-lib-meter-group variant="material" [showLabels]="false" [values]="items" />
<ui-lib-meter-group variant="bootstrap" [showLabels]="false" [values]="items" />
<ui-lib-meter-group variant="minimal" [showLabels]="false" [values]="items" />`;

export const verticalHtml = `<ui-lib-meter-group labelPosition="end" orientation="vertical" [values]="cpuItems" />`;
