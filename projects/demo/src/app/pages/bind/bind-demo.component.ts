import { ChangeDetectionStrategy, Component } from '@angular/core';

/**
 * Placeholder demo page for the upcoming Bind component.
 */
@Component({
  selector: 'app-bind-demo',
  standalone: true,
  templateUrl: './bind-demo.component.html',
  styleUrl: './bind-demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BindDemoComponent {}
