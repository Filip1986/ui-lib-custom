import { ChangeDetectionStrategy, Component } from '@angular/core';

/**
 * Placeholder demo page for the upcoming Toolbar component.
 */
@Component({
  selector: 'app-toolbar-demo',
  standalone: true,
  template: `
    <section class="toolbar-demo" data-testid="toolbar-demo">
      <h1>Toolbar</h1>
      <p>Coming soon.</p>
    </section>
  `,
  styles: `
    .toolbar-demo {
      padding: 1.5rem;
    }

    .toolbar-demo h1 {
      margin: 0 0 0.5rem;
      font-size: 1.5rem;
      color: var(--uilib-page-fg);
    }

    .toolbar-demo p {
      margin: 0;
      color: var(--uilib-muted);
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToolbarDemoComponent {}
