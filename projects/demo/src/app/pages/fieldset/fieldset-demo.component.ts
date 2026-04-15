import { ChangeDetectionStrategy, Component } from '@angular/core';

/**
 * Placeholder demo page for the upcoming Fieldset component.
 */
@Component({
  selector: 'app-fieldset-demo',
  standalone: true,
  template: `
    <section class="fieldset-demo" data-testid="fieldset-demo">
      <h1>Fieldset</h1>
      <p>Coming soon.</p>
    </section>
  `,
  styles: `
    .fieldset-demo {
      padding: 1.5rem;
    }

    .fieldset-demo h1 {
      margin: 0 0 0.5rem;
      font-size: 1.5rem;
      color: var(--uilib-page-fg);
    }

    .fieldset-demo p {
      margin: 0;
      color: var(--uilib-muted);
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FieldsetDemoComponent {}
