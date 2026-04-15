import { ChangeDetectionStrategy, Component } from '@angular/core';

/**
 * Placeholder demo page for the upcoming Drawer component.
 */
@Component({
  selector: 'app-drawer-demo',
  standalone: true,
  template: `
    <section class="drawer-demo" data-testid="drawer-demo">
      <h1>Drawer</h1>
      <p>Coming soon.</p>
    </section>
  `,
  styles: `
    .drawer-demo {
      padding: 1.5rem;
    }

    .drawer-demo h1 {
      margin: 0 0 0.5rem;
      font-size: 1.5rem;
      color: var(--uilib-page-fg);
    }

    .drawer-demo p {
      margin: 0;
      color: var(--uilib-muted);
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DrawerDemoComponent {}
