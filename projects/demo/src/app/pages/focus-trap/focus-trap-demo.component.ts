import { ChangeDetectionStrategy, Component } from '@angular/core';

/**
 * Placeholder demo page for the upcoming FocusTrap component.
 */
@Component({
  selector: 'app-focus-trap-demo',
  standalone: true,
  templateUrl: './focus-trap-demo.component.html',
  styleUrl: './focus-trap-demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FocusTrapDemoComponent {}
