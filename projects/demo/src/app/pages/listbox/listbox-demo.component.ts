import { ChangeDetectionStrategy, Component } from '@angular/core';

/**
 * Placeholder demo page for the upcoming Listbox component.
 */
@Component({
  selector: 'app-listbox-demo',
  standalone: true,
  template: `
    <section class="listbox-demo" data-testid="listbox-demo">
      <h1>Listbox</h1>
      <p>Coming soon.</p>
    </section>
  `,
  styles: `
    .listbox-demo {
      padding: 1.5rem;
    }

    .listbox-demo h1 {
      margin: 0 0 0.5rem;
      font-size: 1.5rem;
      color: var(--uilib-page-fg);
    }

    .listbox-demo p {
      margin: 0;
      color: var(--uilib-muted);
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListboxDemoComponent {}
