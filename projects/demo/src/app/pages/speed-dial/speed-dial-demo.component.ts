import { ChangeDetectionStrategy, Component } from '@angular/core';

/**
 * Placeholder demo page for the upcoming SpeedDial component.
 */
@Component({
  selector: 'app-speed-dial-demo',
  standalone: true,
  template: `
    <section class="speed-dial-demo" data-testid="speed-dial-demo">
      <h1>SpeedDial</h1>
      <p>Coming soon.</p>
    </section>
  `,
  styles: `
    .speed-dial-demo {
      padding: 1.5rem;
    }

    .speed-dial-demo h1 {
      margin: 0 0 0.5rem;
      font-size: 1.5rem;
      color: var(--uilib-page-fg);
    }

    .speed-dial-demo p {
      margin: 0;
      color: var(--uilib-muted);
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpeedDialDemoComponent {}
