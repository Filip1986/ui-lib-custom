import { ChangeDetectionStrategy, Component } from '@angular/core';

/**
 * Placeholder demo page for the upcoming TreeSelect component.
 */
@Component({
  selector: 'app-tree-select-demo',
  standalone: true,
  templateUrl: './tree-select-demo.component.html',
  styleUrl: './tree-select-demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TreeSelectDemoComponent {}
