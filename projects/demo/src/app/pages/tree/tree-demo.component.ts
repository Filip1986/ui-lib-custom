import { ChangeDetectionStrategy, Component } from '@angular/core';

/**
 * Placeholder demo page for the upcoming Tree component.
 */
@Component({
  selector: 'app-tree-demo',
  standalone: true,
  templateUrl: './tree-demo.component.html',
  styleUrl: './tree-demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TreeDemoComponent {}
