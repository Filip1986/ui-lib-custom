import { ChangeDetectionStrategy, Component } from '@angular/core';

/**
 * Placeholder demo page for the upcoming Bottom Sheet component.
 */
@Component({
  selector: 'app-bottom-sheet-demo',
  standalone: true,
  templateUrl: './bottom-sheet-demo.component.html',
  styleUrl: './bottom-sheet-demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BottomSheetDemoComponent {}
