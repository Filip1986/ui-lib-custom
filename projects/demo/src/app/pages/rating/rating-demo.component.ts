import { ChangeDetectionStrategy, Component } from '@angular/core';

/**
 * Placeholder demo page for the upcoming Rating component.
 */
@Component({
  selector: 'app-rating-demo',
  standalone: true,
  template: `
    <section class="rating-demo" data-testid="rating-demo">
      <h1>Rating</h1>
      <p>Coming soon.</p>
    </section>
  `,
  styles: `
    .rating-demo {
      padding: 1.5rem;
    }

    .rating-demo h1 {
      margin: 0 0 0.5rem;
      font-size: 1.5rem;
      color: var(--uilib-page-fg);
    }

    .rating-demo p {
      margin: 0;
      color: var(--uilib-muted);
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RatingDemoComponent {}
