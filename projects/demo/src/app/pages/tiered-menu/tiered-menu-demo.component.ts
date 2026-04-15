import { ChangeDetectionStrategy, Component } from '@angular/core';

/**
 * Placeholder demo page for the upcoming TieredMenu component.
 */
@Component({
  selector: 'app-tiered-menu-demo',
  standalone: true,
  templateUrl: './tiered-menu-demo.component.html',
  styleUrl: './tiered-menu-demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TieredMenuDemoComponent {}
