import { ChangeDetectionStrategy, Component } from '@angular/core';

/**
 * Placeholder demo page for the upcoming Tooltip component.
 */
@Component({
  selector: 'app-tooltip-demo',
  standalone: true,
  template: `
    <section class="tooltip-demo" data-testid="tooltip-demo">
      <h1>Tooltip</h1>
      <p>Coming soon.</p>
    </section>
  `,
  styles: `
    .tooltip-demo {
      padding: 1.5rem;
    }

    .tooltip-demo h1 {
      margin: 0 0 0.5rem;
      font-size: 1.5rem;
      color: var(--uilib-page-fg);
    }

    .tooltip-demo p {
      margin: 0;
      color: var(--uilib-muted);
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TooltipDemoComponent {}
