import {
  ChangeDetectionStrategy,
  Component,
  signal,
  viewChild,
  type WritableSignal,
} from '@angular/core';
import type { Signal } from '@angular/core';
import type { DocSection } from '@demo/shared/doc-page/doc-section.model';
import { DocPageLayoutComponent } from '@demo/shared/doc-page/doc-page-layout.component';
import { DocPageHeaderComponent } from '@demo/shared/doc-page/doc-page-header.component';
import { DocTocComponent } from '@demo/shared/doc-page/doc-toc.component';
import { DocQualityBadgeComponent } from '@demo/shared/doc-page/doc-quality-badge.component';
import type { ComponentQualityAudit } from '@demo/shared/doc-page/doc-quality-badge.component';
import { DocCodeExampleComponent } from '@demo/shared/doc-page/doc-code-example.component';
import { DocSectionComponent } from '../../shared/doc-page/doc-section.component';
import { OrganizationChart, OrgChartNodeTemplateDirective } from 'ui-lib-custom/organization-chart';
import { Panel } from 'ui-lib-custom/panel';
import type {
  OrganizationChartNode,
  OrganizationChartNodeSelectEvent,
  OrganizationChartNodeExpandEvent,
} from 'ui-lib-custom/organization-chart';
import {
  basicHtml,
  basicTs,
  collapsibleHtml,
  collapsibleTs,
  singleSelectionHtml,
  singleSelectionTs,
  multipleSelectionHtml,
  multipleSelectionTs,
  customTemplateHtml,
  customTemplateTs,
  bootstrapHtml,
  bootstrapTs,
  minimalHtml,
  minimalTs,
} from './snippets.generated';
import { DocCssVarsTableComponent } from '../../shared/doc-page/doc-css-vars-table.component';
import type { CssVarRow } from '../../shared/doc-page/doc-css-vars-table.component';

// ─── Shared tree data ────────────────────────────────────────────────────────

function makeCompanyTree(expanded: boolean = true): OrganizationChartNode[] {
  return [
    {
      key: 'ceo',
      label: 'CEO',
      expanded,
      children: [
        {
          key: 'cto',
          label: 'CTO',
          expanded,
          children: [
            { key: 'dev1', label: 'Frontend Lead' },
            { key: 'dev2', label: 'Backend Lead' },
          ],
        },
        {
          key: 'cmo',
          label: 'CMO',
          expanded,
          children: [{ key: 'mkt1', label: 'Growth Manager' }],
        },
        {
          key: 'cfo',
          label: 'CFO',
          expanded,
          children: [],
        },
      ],
    },
  ];
}

// ─── Code snippets ────────────────────────────────────────────────────────────

// ─── Component ────────────────────────────────────────────────────────────────

/** Demo page for the OrganizationChart component, showcasing all variants and features. */
@Component({
  selector: 'app-organization-chart-demo',
  standalone: true,
  imports: [
    Panel,
    DocPageLayoutComponent,
    DocPageHeaderComponent,
    OrganizationChart,
    OrgChartNodeTemplateDirective,
    DocTocComponent,
    DocQualityBadgeComponent,
    DocCodeExampleComponent,
    DocSectionComponent,
    DocCssVarsTableComponent,
  ],
  templateUrl: './organization-chart-demo.component.html',
  styleUrl: './organization-chart-demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrganizationChartDemoComponent {
  public readonly basicHtml: string = basicHtml;
  public readonly basicTs: string = basicTs;
  public readonly collapsibleHtml: string = collapsibleHtml;
  public readonly collapsibleTs: string = collapsibleTs;
  public readonly singleSelectionHtml: string = singleSelectionHtml;
  public readonly singleSelectionTs: string = singleSelectionTs;
  public readonly multipleSelectionHtml: string = multipleSelectionHtml;
  public readonly multipleSelectionTs: string = multipleSelectionTs;
  public readonly customTemplateHtml: string = customTemplateHtml;
  public readonly customTemplateTs: string = customTemplateTs;
  public readonly bootstrapHtml: string = bootstrapHtml;
  public readonly bootstrapTs: string = bootstrapTs;
  public readonly minimalHtml: string = minimalHtml;
  public readonly minimalTs: string = minimalTs;

  public readonly qualityAudit: ComponentQualityAudit = {
    date: '2026-05-18',
    tier: 1,
    scores: {
      api: 8,
      a11y: 9,
      perf: 8,
      comp: 8,
      theme: 8,
      dx: 8,
      docs: 9,
      polish: 8,
      angular: 9,
      feel: 8,
    },
    competitiveParity: 'pending',
  };

  public readonly layout: Signal<DocPageLayoutComponent | undefined> =
    viewChild(DocPageLayoutComponent);

  public scrollTo(id: string): void {
    this.layout()?.scrollToSection(id);
  }

  public readonly importCode: string =
    "import { OrganizationChart } from 'ui-lib-custom/organization-chart'";

  // ─── Navigation sections ───────────────────────────────────────────────────
  public readonly sections: DocSection[] = [
    { id: 'basic', label: 'Basic' },
    { id: 'collapsible', label: 'Collapsible' },
    { id: 'single-selection', label: 'Single Selection' },
    { id: 'multiple-selection', label: 'Multiple Selection' },
    { id: 'custom-template', label: 'Custom Template' },
    { id: 'bootstrap', label: 'Bootstrap Variant' },
    { id: 'minimal', label: 'Minimal Variant' },
    { id: 'css-vars', label: 'CSS Custom Properties' },
    { id: 'accessibility', label: 'Accessibility' },
  ];

  // ─── Tree data (each demo section gets its own independent copy) ───────────
  public readonly basicNodes: WritableSignal<OrganizationChartNode[]> = signal(makeCompanyTree());

  public readonly collapsibleNodes: WritableSignal<OrganizationChartNode[]> =
    signal(makeCompanyTree());

  public readonly singleNodes: WritableSignal<OrganizationChartNode[]> = signal(makeCompanyTree());

  public readonly multipleNodes: WritableSignal<OrganizationChartNode[]> =
    signal(makeCompanyTree());

  public readonly customTemplateNodes: WritableSignal<OrganizationChartNode[]> = signal([
    {
      key: 'ceo',
      label: 'Alice Chen',
      data: { role: 'Chief Executive Officer', dept: 'Executive' },
      expanded: true,
      children: [
        {
          key: 'cto',
          label: 'Bob Martins',
          data: { role: 'Chief Technology Officer', dept: 'Engineering' },
          expanded: true,
          children: [
            {
              key: 'dev1',
              label: 'Clara Osei',
              data: { role: 'Frontend Lead', dept: 'Engineering' },
            },
            {
              key: 'dev2',
              label: 'Diego Ramos',
              data: { role: 'Backend Lead', dept: 'Engineering' },
            },
          ],
        },
        {
          key: 'cmo',
          label: 'Eva Kowalski',
          data: { role: 'Chief Marketing Officer', dept: 'Marketing' },
          expanded: true,
          children: [
            {
              key: 'mkt1',
              label: 'Felix Huang',
              data: { role: 'Growth Manager', dept: 'Marketing' },
            },
          ],
        },
      ],
    },
  ]);

  public readonly bootstrapNodes: WritableSignal<OrganizationChartNode[]> =
    signal(makeCompanyTree());

  public readonly minimalNodes: WritableSignal<OrganizationChartNode[]> = signal(makeCompanyTree());

  // ─── Selection state ───────────────────────────────────────────────────────
  public readonly singleSelection: WritableSignal<OrganizationChartNode | null> = signal(null);

  public readonly multipleSelection: WritableSignal<OrganizationChartNode[]> = signal([]);

  // ─── Event log ────────────────────────────────────────────────────────────
  public readonly eventLog: WritableSignal<string[]> = signal([]);

  // ─── Helpers ──────────────────────────────────────────────────────────────

  public initials(label: string | undefined): string {
    if (!label) return '?';
    return label
      .split(' ')
      .map((word: string): string => word[0] ?? '')
      .slice(0, 2)
      .join('')
      .toUpperCase();
  }

  public onNodeSelect(event: OrganizationChartNodeSelectEvent): void {
    this.appendLog(`Selected: ${event.node.label ?? event.node.key}`);
  }

  public onNodeUnselect(event: OrganizationChartNodeSelectEvent): void {
    this.appendLog(`Unselected: ${event.node.label ?? event.node.key}`);
  }

  public onNodeExpand(event: OrganizationChartNodeExpandEvent): void {
    this.appendLog(`Expanded: ${event.node.label ?? event.node.key}`);
  }

  public onNodeCollapse(event: OrganizationChartNodeExpandEvent): void {
    this.appendLog(`Collapsed: ${event.node.label ?? event.node.key}`);
  }

  public formatSelection(value: OrganizationChartNode | OrganizationChartNode[] | null): string {
    if (!value) return 'None';
    if (Array.isArray(value)) {
      return value.length === 0
        ? 'None'
        : value.map((node: OrganizationChartNode): string => node.label ?? node.key).join(', ');
    }
    return value.label ?? value.key;
  }

  private appendLog(message: string): void {
    this.eventLog.update((log: string[]): string[] => [message, ...log].slice(0, 10));
  }
  public readonly cssVarRows: CssVarRow[] = [
    {
      variable: '--uilib-org-chart-connector-color',
      description: 'Uilib Org Chart Connector text colour.',
    },
    {
      variable: '--uilib-org-chart-connector-width',
      description: 'Uilib Org Chart Connector width.',
    },
    {
      variable: '--uilib-org-chart-connector-height',
      description: 'Uilib Org Chart Connector height.',
    },
    {
      variable: '--uilib-org-chart-connector-radius',
      description: 'Uilib Org Chart Connector border radius.',
    },
    { variable: '--uilib-org-chart-gap', description: 'Uilib Org Chart gap.' },
    {
      variable: '--uilib-org-chart-node-bg',
      description: 'Uilib Org Chart Node background colour.',
    },
    {
      variable: '--uilib-org-chart-node-border',
      description: 'Uilib Org Chart Node border shorthand.',
    },
    {
      variable: '--uilib-org-chart-node-border-radius',
      description: 'Uilib Org Chart Node Border border radius.',
    },
    { variable: '--uilib-org-chart-node-padding', description: 'Uilib Org Chart Node padding.' },
    {
      variable: '--uilib-org-chart-node-min-width',
      description: 'Uilib Org Chart Node Min width.',
    },
    { variable: '--uilib-org-chart-node-color', description: 'Uilib Org Chart Node text colour.' },
    {
      variable: '--uilib-org-chart-node-hover-bg',
      description: 'Uilib Org Chart Node Hover background colour.',
    },
    {
      variable: '--uilib-org-chart-node-selected-bg',
      description: 'Uilib Org Chart Node Selected background colour.',
    },
    {
      variable: '--uilib-org-chart-node-selected-border',
      description: 'Uilib Org Chart Node Selected border shorthand.',
    },
    {
      variable: '--uilib-org-chart-node-selected-color',
      description: 'Uilib Org Chart Node Selected text colour.',
    },
    { variable: '--uilib-org-chart-toggle-size', description: 'Uilib Org Chart Toggle size.' },
    {
      variable: '--uilib-org-chart-toggle-bg',
      description: 'Uilib Org Chart Toggle background colour.',
    },
    {
      variable: '--uilib-org-chart-toggle-border',
      description: 'Uilib Org Chart Toggle border shorthand.',
    },
    {
      variable: '--uilib-org-chart-toggle-color',
      description: 'Uilib Org Chart Toggle text colour.',
    },
    {
      variable: '--uilib-org-chart-toggle-radius',
      description: 'Uilib Org Chart Toggle border radius.',
    },
  ];
}
