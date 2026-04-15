import { ChangeDetectionStrategy, Component } from '@angular/core';

/**
 * Placeholder demo page for the upcoming Splitter component.
 */
@Component({
  selector: 'app-splitter-demo',
  standalone: true,
  template: `
    <section class="splitter-demo" data-testid="splitter-demo">
      <h1>Splitter</h1>
      <p>Coming soon.</p>
    </section>
  `,
  styles: `
    .splitter-demo {
      padding: 1.5rem;
    }

    .splitter-demo h1 {
      margin: 0 0 0.5rem;
      font-size: 1.5rem;
      color: var(--uilib-page-fg);
    }

    .splitter-demo p {
      margin: 0;
      color: var(--uilib-muted);
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SplitterDemoComponent {}
