import { ChangeDetectionStrategy, Component } from '@angular/core';

/**
 * Placeholder demo page for the upcoming ContextMenu component.
 */
@Component({
  selector: 'app-context-menu-demo',
  standalone: true,
  templateUrl: './context-menu-demo.component.html',
  styleUrl: './context-menu-demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContextMenuDemoComponent {}
