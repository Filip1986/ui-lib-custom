import { ChangeDetectionStrategy, Component } from '@angular/core';

/**
 * Placeholder demo page for the upcoming Inplace component.
 */
@Component({
  selector: 'app-inplace-demo',
  standalone: true,
  templateUrl: './inplace-demo.component.html',
  styleUrl: './inplace-demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InplaceDemoComponent {}
