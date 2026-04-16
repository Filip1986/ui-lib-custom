import { ChangeDetectionStrategy, Component } from '@angular/core';

/**
 * Placeholder demo page for the upcoming Chip component.
 */
@Component({
  selector: 'app-chip-demo',
  standalone: true,
  templateUrl: './chip-demo.component.html',
  styleUrl: './chip-demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChipDemoComponent {}
