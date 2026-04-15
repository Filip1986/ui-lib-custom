import { ChangeDetectionStrategy, Component } from '@angular/core';

/**
 * Placeholder demo page for the upcoming ConfirmPopup component.
 */
@Component({
  selector: 'app-confirm-popup-demo',
  standalone: true,
  template: `
    <section class="confirm-popup-demo" data-testid="confirm-popup-demo">
      <h1>ConfirmPopup</h1>
      <p>Coming soon.</p>
    </section>
  `,
  styles: `
    .confirm-popup-demo {
      padding: 1.5rem;
    }

    .confirm-popup-demo h1 {
      margin: 0 0 0.5rem;
      font-size: 1.5rem;
      color: var(--uilib-page-fg);
    }

    .confirm-popup-demo p {
      margin: 0;
      color: var(--uilib-muted);
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfirmPopupDemoComponent {}
