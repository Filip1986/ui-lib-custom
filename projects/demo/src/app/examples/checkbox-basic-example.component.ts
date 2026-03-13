import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Checkbox } from 'ui-lib-custom/checkbox';

/**
 * Basic checkbox example.
 */
@Component({
  selector: 'app-checkbox-basic-example',
  standalone: true,
  imports: [Checkbox],
  template: '<ui-lib-checkbox label="Receive updates" />',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckboxBasicExampleComponent {}
