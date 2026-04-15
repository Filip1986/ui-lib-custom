import { ChangeDetectionStrategy, Component } from '@angular/core';

/**
 * Placeholder demo page for the upcoming Drawer component.
 */
@Component({
  selector: 'app-drawer-demo',
  standalone: true,
  templateUrl: './drawer-demo.component.html',
  styleUrl: './drawer-demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DrawerDemoComponent {}
