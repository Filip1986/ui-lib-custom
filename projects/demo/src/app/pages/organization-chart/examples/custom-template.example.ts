import { Component, signal } from '@angular/core';
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
}
