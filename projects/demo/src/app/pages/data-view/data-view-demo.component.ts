import { ChangeDetectionStrategy, Component } from '@angular/core';

/**
 * Placeholder demo page for the upcoming DataView component.
 */
@Component({
  selector: 'app-data-view-demo',
  standalone: true,
  template: `
    <section class="data-view-demo" data-testid="data-view-demo">
      <h1>DataView</h1>
      <p>Coming soon.</p>
    </section>
  `,
  styles: `
    .data-view-demo {
      padding: 1.5rem;
    }

    .data-view-demo h1 {
      margin: 0 0 0.5rem;
      font-size: 1.5rem;
      color: var(--uilib-page-fg);
    }

    .data-view-demo p {
      margin: 0;
      color: var(--uilib-muted);
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DataViewDemoComponent {}
