import { ChangeDetectionStrategy, Component } from '@angular/core';

/**
 * Placeholder demo page for the upcoming AutoFocus component.
 */
@Component({
  selector: 'app-auto-focus-demo',
  standalone: true,
  templateUrl: './auto-focus-demo.component.html',
  styleUrl: './auto-focus-demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AutoFocusDemoComponent {}
