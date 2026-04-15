import { ChangeDetectionStrategy, Component } from '@angular/core';

/**
 * Placeholder demo page for the upcoming ConfirmDialog component.
 */
@Component({
  selector: 'app-confirm-dialog-demo',
  standalone: true,
  template: `
    <section class="confirm-dialog-demo" data-testid="confirm-dialog-demo">
      <h1>ConfirmDialog</h1>
      <p>Coming soon.</p>
    </section>
  `,
  styles: `
    .confirm-dialog-demo {
      padding: 1.5rem;
    }

    .confirm-dialog-demo h1 {
      margin: 0 0 0.5rem;
      font-size: 1.5rem;
      color: var(--uilib-page-fg);
    }

    .confirm-dialog-demo p {
      margin: 0;
      color: var(--uilib-muted);
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfirmDialogDemoComponent {}
