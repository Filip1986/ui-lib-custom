import { ChangeDetectionStrategy, Component } from '@angular/core';

/**
 * Placeholder demo page for the upcoming Paginator component.
 */
@Component({
  selector: 'app-paginator-demo',
  standalone: true,
  template: `
    <section class="paginator-demo" data-testid="paginator-demo">
      <h1>Paginator</h1>
      <p>Coming soon.</p>
    </section>
  `,
  styles: `
    .paginator-demo {
      padding: 1.5rem;
    }

    .paginator-demo h1 {
      margin: 0 0 0.5rem;
      font-size: 1.5rem;
      color: var(--uilib-page-fg);
    }

    .paginator-demo p {
      margin: 0;
      color: var(--uilib-muted);
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaginatorDemoComponent {}
