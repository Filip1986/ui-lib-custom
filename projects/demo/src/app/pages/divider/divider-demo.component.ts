import { ChangeDetectionStrategy, Component } from '@angular/core';

/**
 * Placeholder demo page for the upcoming Divider component.
 */
@Component({
  selector: 'app-divider-demo',
  standalone: true,
  templateUrl: './divider-demo.component.html',
  styleUrl: './divider-demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DividerDemoComponent {}
