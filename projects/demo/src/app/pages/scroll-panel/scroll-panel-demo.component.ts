import { ChangeDetectionStrategy, Component } from '@angular/core';

/**
 * Placeholder demo page for the upcoming ScrollPanel component.
 */
@Component({
  selector: 'app-scroll-panel-demo',
  standalone: true,
  template: `
    <section class="scroll-panel-demo" data-testid="scroll-panel-demo">
      <h1>ScrollPanel</h1>
      <p>Coming soon.</p>
    </section>
  `,
  styles: `
    .scroll-panel-demo {
      padding: 1.5rem;
    }

    .scroll-panel-demo h1 {
      margin: 0 0 0.5rem;
      font-size: 1.5rem;
      color: var(--uilib-page-fg);
    }

    .scroll-panel-demo p {
      margin: 0;
      color: var(--uilib-muted);
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScrollPanelDemoComponent {}
