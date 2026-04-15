import { ChangeDetectionStrategy, Component } from '@angular/core';

/**
 * Placeholder demo page for the upcoming SplitButton component.
 */
@Component({
  selector: 'app-split-button-demo',
  standalone: true,
  template: `
    <section class="split-button-demo" data-testid="split-button-demo">
      <h1>SplitButton</h1>
      <p>Coming soon.</p>
    </section>
  `,
  styles: `
    .split-button-demo {
      padding: 1.5rem;
    }

    .split-button-demo h1 {
      margin: 0 0 0.5rem;
      font-size: 1.5rem;
      color: var(--uilib-page-fg);
    }

    .split-button-demo p {
      margin: 0;
      color: var(--uilib-muted);
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SplitButtonDemoComponent {}
