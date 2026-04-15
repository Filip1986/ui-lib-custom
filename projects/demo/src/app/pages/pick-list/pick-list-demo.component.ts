import { ChangeDetectionStrategy, Component } from '@angular/core';

/**
 * Placeholder demo page for the upcoming PickList component.
 */
@Component({
  selector: 'app-pick-list-demo',
  standalone: true,
  template: `
    <section class="pick-list-demo" data-testid="pick-list-demo">
      <h1>PickList</h1>
      <p>Coming soon.</p>
    </section>
  `,
  styles: `
    .pick-list-demo {
      padding: 1.5rem;
    }

    .pick-list-demo h1 {
      margin: 0 0 0.5rem;
      font-size: 1.5rem;
      color: var(--uilib-page-fg);
    }

    .pick-list-demo p {
      margin: 0;
      color: var(--uilib-muted);
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PickListDemoComponent {}
