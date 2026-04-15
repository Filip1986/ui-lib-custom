import { ChangeDetectionStrategy, Component } from '@angular/core';

/**
 * Placeholder demo page for the upcoming Panel component.
 */
@Component({
  selector: 'app-panel-demo',
  standalone: true,
  templateUrl: './panel-demo.component.html',
  styleUrl: './panel-demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PanelDemoComponent {}
