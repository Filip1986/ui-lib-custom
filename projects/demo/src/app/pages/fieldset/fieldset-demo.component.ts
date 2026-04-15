import { ChangeDetectionStrategy, Component } from '@angular/core';

/**
 * Placeholder demo page for the upcoming Fieldset component.
 */
@Component({
  selector: 'app-fieldset-demo',
  standalone: true,
  templateUrl: './fieldset-demo.component.html',
  styleUrl: './fieldset-demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FieldsetDemoComponent {}
