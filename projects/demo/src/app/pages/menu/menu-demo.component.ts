import { ChangeDetectionStrategy, Component } from '@angular/core';

/**
 * Placeholder demo page for the upcoming Menu component.
 */
@Component({
  selector: 'app-menu-demo',
  standalone: true,
  templateUrl: './menu-demo.component.html',
  styleUrl: './menu-demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuDemoComponent {}
