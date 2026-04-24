import { ChangeDetectionStrategy, Component, signal, type WritableSignal } from '@angular/core';
import type { DocSection } from '@demo/shared/doc-page/doc-section.model';
import { DocPageLayoutComponent } from '@demo/shared/doc-page/doc-page-layout.component';
import { CodePreviewComponent } from '../../shared/components/code-preview/code-preview.component';
import { Card } from 'ui-lib-custom/card';
import { OrganizationChart, OrgChartNodeTemplateDirective } from 'ui-lib-custom/organization-chart';
import type {
  OrganizationChartNode,
  OrganizationChartNodeSelectEvent,
  OrganizationChartNodeExpandEvent,
} from 'ui-lib-custom/organization-chart';

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

const SNIPPETS: Record<string, string> = {
  basic: `<ui-lib-organization-chart [value]="nodes" />`,

  collapsible: `<ui-lib-organization-chart
  [value]="nodes"
  [collapsible]="true"
/>`,

  singleSelection: `<ui-lib-organization-chart
  [value]="nodes"
  selectionMode="single"
  [(selection)]="selection"
/>`,

  multipleSelection: `<ui-lib-organization-chart
  [value]="nodes"
  selectionMode="multiple"
  [(selection)]="selection"
/>`,

  customTemplate: `<ui-lib-organization-chart [value]="nodes">
  <ng-template uiOrgChartNode let-node>
    <div class="custom-node">
      <span class="custom-node__avatar">{{ initials(node.label) }}</span>
      <strong class="custom-node__name">{{ node.label }}</strong>
      <span class="custom-node__role">{{ node.data?.role }}</span>
    </div>
  </ng-template>
</ui-lib-organization-chart>`,

  bootstrap: `<ui-lib-organization-chart
  [value]="nodes"
  variant="bootstrap"
  [collapsible]="true"
/>`,

  minimal: `<ui-lib-organization-chart
  [value]="nodes"
  variant="minimal"
  [collapsible]="true"
/>`,
};

// ─── Component ────────────────────────────────────────────────────────────────

/** Demo page for the OrganizationChart component, showcasing all variants and features. */
@Component({
  selector: 'app-organization-chart-demo',
  standalone: true,
  imports: [
    DocPageLayoutComponent,
    CodePreviewComponent,
    Card,
    OrganizationChart,
    OrgChartNodeTemplateDirective,
  ],
  templateUrl: './organization-chart-demo.component.html',
  styleUrl: './organization-chart-demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrganizationChartDemoComponent {
  // ─── Navigation sections ───────────────────────────────────────────────────
  public readonly sections: DocSection[] = [
    { id: 'basic', label: 'Basic' },
    { id: 'collapsible', label: 'Collapsible' },
    { id: 'single-selection', label: 'Single Selection' },
    { id: 'multiple-selection', label: 'Multiple Selection' },
    { id: 'custom-template', label: 'Custom Template' },
    { id: 'bootstrap', label: 'Bootstrap Variant' },
    { id: 'minimal', label: 'Minimal Variant' },
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
  public snippet(key: string): string {
    return SNIPPETS[key] ?? '';
  }

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
}
