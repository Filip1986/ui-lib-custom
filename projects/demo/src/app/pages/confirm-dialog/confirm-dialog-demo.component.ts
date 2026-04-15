import { ChangeDetectionStrategy, Component } from '@angular/core';

/**
 * Placeholder demo page for the upcoming ConfirmDialog component.
 */
@Component({
  selector: 'app-confirm-dialog-demo',
  standalone: true,
  templateUrl: './confirm-dialog-demo.component.html',
  styleUrl: './confirm-dialog-demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfirmDialogDemoComponent {}
