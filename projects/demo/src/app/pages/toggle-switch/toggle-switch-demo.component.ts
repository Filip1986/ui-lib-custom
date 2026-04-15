import { ChangeDetectionStrategy, Component } from '@angular/core';

/**
 * Placeholder demo page for the upcoming ToggleSwitch component.
 */
@Component({
  selector: 'app-toggle-switch-demo',
  standalone: true,
  templateUrl: './toggle-switch-demo.component.html',
  styleUrl: './toggle-switch-demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToggleSwitchDemoComponent {}
