import { ChangeDetectionStrategy, Component } from '@angular/core';

/**
 * Placeholder demo page for the upcoming Knob component.
 */
@Component({
  selector: 'app-knob-demo',
  standalone: true,
  templateUrl: './knob-demo.component.html',
  styleUrl: './knob-demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KnobDemoComponent {}
