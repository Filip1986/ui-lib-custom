import { ChangeDetectionStrategy, Component } from '@angular/core';

/**
 * Placeholder demo page for the upcoming Ripple component.
 */
@Component({
  selector: 'app-ripple-demo',
  standalone: true,
  templateUrl: './ripple-demo.component.html',
  styleUrl: './ripple-demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RippleDemoComponent {}
