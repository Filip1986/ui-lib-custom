import { ChangeDetectionStrategy, Component } from '@angular/core';

/**
 * Placeholder demo page for the upcoming Table component.
 */
@Component({
  selector: 'app-table-demo',
  standalone: true,
  template: `
    <section class="table-demo" data-testid="table-demo">
      <h1>Table</h1>
      <p>Coming soon.</p>
    </section>
  `,
  styles: `
    .table-demo {
      padding: 1.5rem;
    }

    .table-demo h1 {
      margin: 0 0 0.5rem;
      font-size: 1.5rem;
      color: var(--uilib-page-fg);
    }

    .table-demo p {
      margin: 0;
      color: var(--uilib-muted);
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableDemoComponent {}
