import { ChangeDetectionStrategy, Component } from '@angular/core';

/**
 * Placeholder demo page for the upcoming Dock component.
 */
@Component({
  selector: 'app-dock-demo',
  standalone: true,
  templateUrl: './dock-demo.component.html',
  styleUrl: './dock-demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DockDemoComponent {}
