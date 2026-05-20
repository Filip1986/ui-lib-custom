import { Component, signal } from '@angular/core';
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
}
