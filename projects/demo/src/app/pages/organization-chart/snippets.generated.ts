/* eslint-disable */
// AUTO-GENERATED — run `node scripts/generate-snippets.mjs` to regenerate.
// Do not edit manually.

export const basicHtml = `<ui-lib-organization-chart [value]="nodes" />`;

export const basicTs = `import { Component, signal } from '@angular/core';
import { OrganizationChart } from 'ui-lib-custom/organization-chart';
import type { OrganizationChartNode } from 'ui-lib-custom/organization-chart';

@Component({
  standalone: true,
  imports: [OrganizationChart],
  templateUrl: './basic.example.html',
})
export class MyComponent {
  public readonly nodes = signal<OrganizationChartNode[]>([
    { key: 'ceo', label: 'CEO', expanded: true, children: [
      { key: 'cto', label: 'CTO' },
    ] },
  ]);
}`;

export const bootstrapHtml = `<ui-lib-organization-chart variant="bootstrap" [collapsible]="true" [value]="nodes" />`;

export const bootstrapTs = `import { Component, signal } from '@angular/core';
import { OrganizationChart } from 'ui-lib-custom/organization-chart';
import type { OrganizationChartNode } from 'ui-lib-custom/organization-chart';

@Component({
  standalone: true,
  imports: [OrganizationChart],
  templateUrl: './bootstrap.example.html',
})
export class MyComponent {
  public readonly nodes = signal<OrganizationChartNode[]>([
    { key: 'ceo', label: 'CEO', expanded: true, children: [
      { key: 'cto', label: 'CTO' },
    ] },
  ]);
}`;

export const collapsibleHtml = `<ui-lib-organization-chart [collapsible]="true" [value]="nodes" />`;

export const collapsibleTs = `import { Component, signal } from '@angular/core';
import { OrganizationChart } from 'ui-lib-custom/organization-chart';
import type {
  OrganizationChartNode,
  OrganizationChartNodeExpandEvent,
} from 'ui-lib-custom/organization-chart';

@Component({
  standalone: true,
  imports: [OrganizationChart],
  templateUrl: './collapsible.example.html',
})
export class MyComponent {
  public readonly nodes = signal<OrganizationChartNode[]>([
    { key: 'ceo', label: 'CEO', expanded: true, children: [
      { key: 'cto', label: 'CTO' },
    ] },
  ]);

  public onNodeExpand(event: OrganizationChartNodeExpandEvent): void {
    console.log('Expanded:', event.node.label);
  }

  public onNodeCollapse(event: OrganizationChartNodeExpandEvent): void {
    console.log('Collapsed:', event.node.label);
  }
}`;

export const customTemplateHtml = `<ui-lib-organization-chart [value]="nodes">
  <ng-template let-node uiOrgChartNode>
    <div class="custom-node">
      <span class="custom-node__avatar">{{ initials(node.label) }}</span>
      <strong class="custom-node__name">{{ node.label }}</strong>
      <span class="custom-node__role">{{ node.data?.role }}</span>
    </div>
  </ng-template>
</ui-lib-organization-chart>`;

export const customTemplateTs = `import { Component, signal } from '@angular/core';
import { OrganizationChart, OrgChartNodeTemplateDirective } from 'ui-lib-custom/organization-chart';
import type { OrganizationChartNode } from 'ui-lib-custom/organization-chart';

@Component({
  standalone: true,
  imports: [OrganizationChart, OrgChartNodeTemplateDirective],
  templateUrl: './custom-template.example.html',
})
export class MyComponent {
  public readonly nodes = signal<OrganizationChartNode[]>([
    {
      key: 'ceo',
      label: 'Alice Chen',
      data: { role: 'Chief Executive Officer' },
      expanded: true,
      children: [],
    },
  ]);

  public initials(label: string | undefined): string {
    if (!label) return '?';
    return label.split(' ').map((w: string): string => w[0] ?? '').slice(0, 2).join('').toUpperCase();
  }
}`;

export const minimalHtml = `<ui-lib-organization-chart variant="minimal" [collapsible]="true" [value]="nodes" />`;

export const minimalTs = `import { Component, signal } from '@angular/core';
import { OrganizationChart } from 'ui-lib-custom/organization-chart';
import type { OrganizationChartNode } from 'ui-lib-custom/organization-chart';

@Component({
  standalone: true,
  imports: [OrganizationChart],
  templateUrl: './minimal.example.html',
})
export class MyComponent {
  public readonly nodes = signal<OrganizationChartNode[]>([
    { key: 'ceo', label: 'CEO', expanded: true, children: [
      { key: 'cto', label: 'CTO' },
    ] },
  ]);
}`;

export const multipleSelectionHtml = `<ui-lib-organization-chart selectionMode="multiple" [value]="nodes" [(selection)]="selection" />`;

export const multipleSelectionTs = `import { Component, signal } from '@angular/core';
import { OrganizationChart } from 'ui-lib-custom/organization-chart';
import type { OrganizationChartNode } from 'ui-lib-custom/organization-chart';

@Component({
  standalone: true,
  imports: [OrganizationChart],
  templateUrl: './multiple-selection.example.html',
})
export class MyComponent {
  public readonly nodes = signal<OrganizationChartNode[]>([
    { key: 'ceo', label: 'CEO', expanded: true, children: [
      { key: 'cto', label: 'CTO' },
    ] },
  ]);
  public readonly selection = signal<OrganizationChartNode[]>([]);
}`;

export const singleSelectionHtml = `<ui-lib-organization-chart selectionMode="single" [value]="nodes" [(selection)]="selection" />`;

export const singleSelectionTs = `import { Component, signal } from '@angular/core';
import { OrganizationChart } from 'ui-lib-custom/organization-chart';
import type { OrganizationChartNode } from 'ui-lib-custom/organization-chart';

@Component({
  standalone: true,
  imports: [OrganizationChart],
  templateUrl: './single-selection.example.html',
})
export class MyComponent {
  public readonly nodes = signal<OrganizationChartNode[]>([
    { key: 'ceo', label: 'CEO', expanded: true, children: [
      { key: 'cto', label: 'CTO' },
    ] },
  ]);
  public readonly selection = signal<OrganizationChartNode | null>(null);
}`;
