import { ChangeDetectionStrategy, Component } from '@angular/core';

/**
 * Placeholder demo page for the upcoming Password component.
 */
@Component({
  selector: 'app-password-demo',
  standalone: true,
  template: `
    <section class="password-demo" data-testid="password-demo">
      <h1>Password</h1>
      <p>Coming soon.</p>
    </section>
  `,
  styles: `
    .password-demo {
      padding: 1.5rem;
    }

    .password-demo h1 {
      margin: 0 0 0.5rem;
      font-size: 1.5rem;
      color: var(--uilib-page-fg);
    }

    .password-demo p {
      margin: 0;
      color: var(--uilib-muted);
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PasswordDemoComponent {}
