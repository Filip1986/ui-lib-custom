import { ChangeDetectionStrategy, Component } from '@angular/core';

/**
 * Placeholder demo page for the upcoming KeyFilter component.
 */
@Component({
  selector: 'app-key-filter-demo',
  standalone: true,
  templateUrl: './key-filter-demo.component.html',
  styleUrl: './key-filter-demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KeyFilterDemoComponent {}
