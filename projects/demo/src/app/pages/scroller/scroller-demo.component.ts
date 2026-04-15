import { ChangeDetectionStrategy, Component } from '@angular/core';

/**
 * Placeholder demo page for the upcoming Scroller component.
 */
@Component({
  selector: 'app-scroller-demo',
  standalone: true,
  template: `
    <section class="scroller-demo" data-testid="scroller-demo">
      <h1>Scroller</h1>
      <p>Coming soon.</p>
    </section>
  `,
  styles: `
    .scroller-demo {
      padding: 1.5rem;
    }

    .scroller-demo h1 {
      margin: 0 0 0.5rem;
      font-size: 1.5rem;
      color: var(--uilib-page-fg);
    }

    .scroller-demo p {
      margin: 0;
      color: var(--uilib-muted);
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScrollerDemoComponent {}
