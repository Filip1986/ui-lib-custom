import { ChangeDetectionStrategy, Component } from '@angular/core';

/**
 * Placeholder demo page for the upcoming MegaMenu component.
 */
@Component({
  selector: 'app-mega-menu-demo',
  standalone: true,
  templateUrl: './mega-menu-demo.component.html',
  styleUrl: './mega-menu-demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MegaMenuDemoComponent {}
