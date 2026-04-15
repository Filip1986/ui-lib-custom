import { ChangeDetectionStrategy, Component } from '@angular/core';

/**
 * Placeholder demo page for the upcoming OrderList component.
 */
@Component({
  selector: 'app-order-list-demo',
  standalone: true,
  template: `
    <section class="order-list-demo" data-testid="order-list-demo">
      <h1>OrderList</h1>
      <p>Coming soon.</p>
    </section>
  `,
  styles: `
    .order-list-demo {
      padding: 1.5rem;
    }

    .order-list-demo h1 {
      margin: 0 0 0.5rem;
      font-size: 1.5rem;
      color: var(--uilib-page-fg);
    }

    .order-list-demo p {
      margin: 0;
      color: var(--uilib-muted);
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderListDemoComponent {}
