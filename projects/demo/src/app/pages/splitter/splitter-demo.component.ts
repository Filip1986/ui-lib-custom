import { ChangeDetectionStrategy, Component } from '@angular/core';

/**
 * Placeholder demo page for the upcoming Splitter component.
 */
@Component({
  selector: 'app-splitter-demo',
  standalone: true,
  templateUrl: './splitter-demo.component.html',
  styleUrl: './splitter-demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SplitterDemoComponent {}
