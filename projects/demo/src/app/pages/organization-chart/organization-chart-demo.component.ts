import { ChangeDetectionStrategy, Component } from '@angular/core';

/**
 * Placeholder demo page for the upcoming OrganizationChart component.
 */
@Component({
  selector: 'app-organization-chart-demo',
  standalone: true,
  template: `
    <section class="organization-chart-demo" data-testid="organization-chart-demo">
      <h1>OrganizationChart</h1>
      <p>Coming soon.</p>
    </section>
  `,
  styles: `
    .organization-chart-demo {
      padding: 1.5rem;
    }

    .organization-chart-demo h1 {
      margin: 0 0 0.5rem;
      font-size: 1.5rem;
      color: var(--uilib-page-fg);
    }

    .organization-chart-demo p {
      margin: 0;
      color: var(--uilib-muted);
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrganizationChartDemoComponent {}
