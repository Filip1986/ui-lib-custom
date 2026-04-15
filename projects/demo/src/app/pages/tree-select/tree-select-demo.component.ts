import { ChangeDetectionStrategy, Component } from '@angular/core';

/**
 * Placeholder demo page for the upcoming TreeSelect component.
 */
@Component({
  selector: 'app-tree-select-demo',
  standalone: true,
  template: `
    <section class="tree-select-demo" data-testid="tree-select-demo">
      <h1>TreeSelect</h1>
      <p>Coming soon.</p>
    </section>
  `,
  styles: `
    .tree-select-demo {
      padding: 1.5rem;
    }

    .tree-select-demo h1 {
      margin: 0 0 0.5rem;
      font-size: 1.5rem;
      color: var(--uilib-page-fg);
    }

    .tree-select-demo p {
      margin: 0;
      color: var(--uilib-muted);
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TreeSelectDemoComponent {}
