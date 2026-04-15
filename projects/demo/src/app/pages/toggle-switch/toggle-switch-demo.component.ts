import { ChangeDetectionStrategy, Component } from '@angular/core';

/**
 * Placeholder demo page for the upcoming ToggleSwitch component.
 */
@Component({
  selector: 'app-toggle-switch-demo',
  standalone: true,
  template: `
    <section class="toggle-switch-demo" data-testid="toggle-switch-demo">
      <h1>ToggleSwitch</h1>
      <p>Coming soon.</p>
    </section>
  `,
  styles: `
    .toggle-switch-demo {
      padding: 1.5rem;
    }

    .toggle-switch-demo h1 {
      margin: 0 0 0.5rem;
      font-size: 1.5rem;
      color: var(--uilib-page-fg);
    }

    .toggle-switch-demo p {
      margin: 0;
      color: var(--uilib-muted);
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToggleSwitchDemoComponent {}
