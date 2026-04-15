import { ChangeDetectionStrategy, Component } from '@angular/core';

/**
 * Placeholder demo page for the upcoming ToggleButton component.
 */
@Component({
  selector: 'app-toggle-button-demo',
  standalone: true,
  template: `
    <section class="toggle-button-demo" data-testid="toggle-button-demo">
      <h1>ToggleButton</h1>
      <p>Coming soon.</p>
    </section>
  `,
  styles: `
    .toggle-button-demo {
      padding: 1.5rem;
    }

    .toggle-button-demo h1 {
      margin: 0 0 0.5rem;
      font-size: 1.5rem;
      color: var(--uilib-page-fg);
    }

    .toggle-button-demo p {
      margin: 0;
      color: var(--uilib-muted);
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToggleButtonDemoComponent {}
