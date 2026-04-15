import { ChangeDetectionStrategy, Component } from '@angular/core';

/**
 * Placeholder demo page for the upcoming SpeedDial component.
 */
@Component({
  selector: 'app-speed-dial-demo',
  standalone: true,
  templateUrl: './speed-dial-demo.component.html',
  styleUrl: './speed-dial-demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpeedDialDemoComponent {}
