import { ChangeDetectionStrategy, Component } from '@angular/core';

/**
 * Placeholder demo page for the upcoming Textarea component.
 */
@Component({
  selector: 'app-textarea-demo',
  standalone: true,
  template: `
    <section class="textarea-demo" data-testid="textarea-demo">
      <h1>Textarea</h1>
      <p>Coming soon.</p>
    </section>
  `,
  styles: `
    .textarea-demo {
      padding: 1.5rem;
    }

    .textarea-demo h1 {
      margin: 0 0 0.5rem;
      font-size: 1.5rem;
      color: var(--uilib-page-fg);
    }

    .textarea-demo p {
      margin: 0;
      color: var(--uilib-muted);
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextareaDemoComponent {}
