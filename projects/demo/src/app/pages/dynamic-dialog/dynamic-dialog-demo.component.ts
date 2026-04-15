import { ChangeDetectionStrategy, Component } from '@angular/core';

/**
 * Placeholder demo page for the upcoming DynamicDialog component.
 */
@Component({
  selector: 'app-dynamic-dialog-demo',
  standalone: true,
  template: `
    <section class="dynamic-dialog-demo" data-testid="dynamic-dialog-demo">
      <h1>DynamicDialog</h1>
      <p>Coming soon.</p>
    </section>
  `,
  styles: `
    .dynamic-dialog-demo {
      padding: 1.5rem;
    }

    .dynamic-dialog-demo h1 {
      margin: 0 0 0.5rem;
      font-size: 1.5rem;
      color: var(--uilib-page-fg);
    }

    .dynamic-dialog-demo p {
      margin: 0;
      color: var(--uilib-muted);
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DynamicDialogDemoComponent {}
