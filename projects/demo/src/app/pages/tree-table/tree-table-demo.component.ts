import { ChangeDetectionStrategy, Component } from '@angular/core';

/**
 * Placeholder demo page for the upcoming TreeTable component.
 */
@Component({
  selector: 'app-tree-table-demo',
  standalone: true,
  templateUrl: './tree-table-demo.component.html',
  styleUrl: './tree-table-demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TreeTableDemoComponent {}
