import { ChangeDetectionStrategy, Component } from '@angular/core';

/**
 * Placeholder demo page for the upcoming PanelMenu component.
 */
@Component({
  selector: 'app-panel-menu-demo',
  standalone: true,
  templateUrl: './panel-menu-demo.component.html',
  styleUrl: './panel-menu-demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PanelMenuDemoComponent {}
