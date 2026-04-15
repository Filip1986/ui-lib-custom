import { ChangeDetectionStrategy, Component } from '@angular/core';

/**
 * Placeholder demo page for the upcoming Divider component.
 */
@Component({
  selector: 'app-divider-demo',
  standalone: true,
  template: `
    <section class="divider-demo" data-testid="divider-demo">
      <h1>Divider</h1>
      <p>Coming soon.</p>
    </section>
  `,
  styles: `
    .divider-demo {
      padding: 1.5rem;
    }

    .divider-demo h1 {
      margin: 0 0 0.5rem;
      font-size: 1.5rem;
      color: var(--uilib-page-fg);
    }

    .divider-demo p {
      margin: 0;
      color: var(--uilib-muted);
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DividerDemoComponent {}
