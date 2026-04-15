import { ChangeDetectionStrategy, Component } from '@angular/core';

/**
 * Placeholder demo page for the upcoming Stepper component.
 */
@Component({
  selector: 'app-stepper-demo',
  standalone: true,
  templateUrl: './stepper-demo.component.html',
  styleUrl: './stepper-demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StepperDemoComponent {}
