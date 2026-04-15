import { ChangeDetectionStrategy, Component } from '@angular/core';

/**
 * Placeholder demo page for the upcoming Timeline component.
 */
@Component({
  selector: 'app-timeline-demo',
  standalone: true,
  template: `
    <section class="timeline-demo" data-testid="timeline-demo">
      <h1>Timeline</h1>
      <p>Coming soon.</p>
    </section>
  `,
  styles: `
    .timeline-demo {
      padding: 1.5rem;
    }

    .timeline-demo h1 {
      margin: 0 0 0.5rem;
      font-size: 1.5rem;
      color: var(--uilib-page-fg);
    }

    .timeline-demo p {
      margin: 0;
      color: var(--uilib-muted);
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimelineDemoComponent {}
