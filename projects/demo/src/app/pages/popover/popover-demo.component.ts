import { ChangeDetectionStrategy, Component } from '@angular/core';

/**
 * Placeholder demo page for the upcoming Popover component.
 */
@Component({
  selector: 'app-popover-demo',
  standalone: true,
  template: `
    <section class="popover-demo" data-testid="popover-demo">
      <h1>Popover</h1>
      <p>Coming soon.</p>
    </section>
  `,
  styles: `
    .popover-demo {
      padding: 1.5rem;
    }

    .popover-demo h1 {
      margin: 0 0 0.5rem;
      font-size: 1.5rem;
      color: var(--uilib-page-fg);
    }

    .popover-demo p {
      margin: 0;
      color: var(--uilib-muted);
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PopoverDemoComponent {}
