import { ChangeDetectionStrategy, Component } from '@angular/core';

/**
 * Placeholder demo page for the upcoming RadioButton component.
 */
@Component({
  selector: 'app-radio-button-demo',
  standalone: true,
  templateUrl: './radio-button-demo.component.html',
  styleUrl: './radio-button-demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RadioButtonDemoComponent {}
