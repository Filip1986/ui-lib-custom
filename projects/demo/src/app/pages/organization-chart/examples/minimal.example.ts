import { Component, signal } from '@angular/core';
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
}
