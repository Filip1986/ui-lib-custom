import { ChangeDetectionStrategy, Component } from '@angular/core';

/**
 * Placeholder demo page for the upcoming ScrollPanel component.
 */
@Component({
  selector: 'app-scroll-panel-demo',
  standalone: true,
  templateUrl: './scroll-panel-demo.component.html',
  styleUrl: './scroll-panel-demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScrollPanelDemoComponent {}
