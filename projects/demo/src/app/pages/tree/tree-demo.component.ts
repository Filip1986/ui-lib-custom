import { ChangeDetectionStrategy, Component } from '@angular/core';

/**
 * Placeholder demo page for the upcoming Tree component.
 */
@Component({
  selector: 'app-tree-demo',
  standalone: true,
  template: `
    <section class="tree-demo" data-testid="tree-demo">
      <h1>Tree</h1>
      <p>Coming soon.</p>
    </section>
  `,
  styles: `
    .tree-demo {
      padding: 1.5rem;
    }

    .tree-demo h1 {
      margin: 0 0 0.5rem;
      font-size: 1.5rem;
      color: var(--uilib-page-fg);
    }

    .tree-demo p {
      margin: 0;
      color: var(--uilib-muted);
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TreeDemoComponent {}
