import { ChangeDetectionStrategy, Component } from '@angular/core';

/**
 * Placeholder demo page for the upcoming Stepper component.
 */
@Component({
  selector: 'app-stepper-demo',
  standalone: true,
  template: `
    <section class="stepper-demo" data-testid="stepper-demo">
      <h1>Stepper</h1>
      <p>Coming soon.</p>
    </section>
  `,
  styles: `
    .stepper-demo {
      padding: 1.5rem;
    }

    .stepper-demo h1 {
      margin: 0 0 0.5rem;
      font-size: 1.5rem;
      color: var(--uilib-page-fg);
    }

    .stepper-demo p {
      margin: 0;
      color: var(--uilib-muted);
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StepperDemoComponent {}
