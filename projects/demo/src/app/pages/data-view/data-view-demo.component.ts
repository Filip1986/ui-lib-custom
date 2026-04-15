import { ChangeDetectionStrategy, Component } from '@angular/core';

/**
 * Placeholder demo page for the upcoming DataView component.
 */
@Component({
  selector: 'app-data-view-demo',
  standalone: true,
  templateUrl: './data-view-demo.component.html',
  styleUrl: './data-view-demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DataViewDemoComponent {}
