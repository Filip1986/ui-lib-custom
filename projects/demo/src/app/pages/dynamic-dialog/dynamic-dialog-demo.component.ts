import { ChangeDetectionStrategy, Component } from '@angular/core';

/**
 * Placeholder demo page for the upcoming DynamicDialog component.
 */
@Component({
  selector: 'app-dynamic-dialog-demo',
  standalone: true,
  templateUrl: './dynamic-dialog-demo.component.html',
  styleUrl: './dynamic-dialog-demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DynamicDialogDemoComponent {}
