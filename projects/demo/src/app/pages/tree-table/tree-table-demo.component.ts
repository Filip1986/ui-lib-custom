import { ChangeDetectionStrategy, Component } from '@angular/core';

/**
 * Placeholder demo page for the upcoming TreeTable component.
 */
@Component({
  selector: 'app-tree-table-demo',
  standalone: true,
  template: `
    <section class="tree-table-demo" data-testid="tree-table-demo">
      <h1>TreeTable</h1>
      <p>Coming soon.</p>
    </section>
  `,
  styles: `
    .tree-table-demo {
      padding: 1.5rem;
    }

    .tree-table-demo h1 {
      margin: 0 0 0.5rem;
      font-size: 1.5rem;
      color: var(--uilib-page-fg);
    }

    .tree-table-demo p {
      margin: 0;
      color: var(--uilib-muted);
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TreeTableDemoComponent {}
