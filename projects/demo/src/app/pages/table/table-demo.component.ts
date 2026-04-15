import { ChangeDetectionStrategy, Component } from '@angular/core';

/**
 * Placeholder demo page for the upcoming Table component.
 */
@Component({
  selector: 'app-table-demo',
  standalone: true,
  templateUrl: './table-demo.component.html',
  styleUrl: './table-demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableDemoComponent {}
