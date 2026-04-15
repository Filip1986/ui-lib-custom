import { ChangeDetectionStrategy, Component } from '@angular/core';

/**
 * Placeholder demo page for the upcoming Panel component.
 */
@Component({
  selector: 'app-panel-demo',
  standalone: true,
  template: `
    <section class="panel-demo" data-testid="panel-demo">
      <h1>Panel</h1>
      <p>Coming soon.</p>
    </section>
  `,
  styles: `
    .panel-demo {
      padding: 1.5rem;
    }

    .panel-demo h1 {
      margin: 0 0 0.5rem;
      font-size: 1.5rem;
      color: var(--uilib-page-fg);
    }

    .panel-demo p {
      margin: 0;
      color: var(--uilib-muted);
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PanelDemoComponent {}
