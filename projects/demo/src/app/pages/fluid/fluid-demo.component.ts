import { ChangeDetectionStrategy, Component } from '@angular/core';

/**
 * Placeholder demo page for the upcoming Fluid component.
 */
@Component({
  selector: 'app-fluid-demo',
  standalone: true,
  templateUrl: './fluid-demo.component.html',
  styleUrl: './fluid-demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FluidDemoComponent {}
