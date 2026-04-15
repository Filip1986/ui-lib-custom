import { ChangeDetectionStrategy, Component } from '@angular/core';

/**
 * Placeholder demo page for the upcoming RadioButton component.
 */
@Component({
  selector: 'app-radio-button-demo',
  standalone: true,
  template: `
    <section class="radio-button-demo" data-testid="radio-button-demo">
      <h1>RadioButton</h1>
      <p>Coming soon.</p>
    </section>
  `,
  styles: `
    .radio-button-demo {
      padding: 1.5rem;
    }

    .radio-button-demo h1 {
      margin: 0 0 0.5rem;
      font-size: 1.5rem;
      color: var(--uilib-page-fg);
    }

    .radio-button-demo p {
      margin: 0;
      color: var(--uilib-muted);
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RadioButtonDemoComponent {}
