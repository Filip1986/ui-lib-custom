import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UiLibInput } from 'ui-lib-custom/input';

/**
 *
 */
@Component({
  selector: 'app-input-basic-example',
  standalone: true,
  imports: [UiLibInput],
  template: '<ui-lib-input label="Email" placeholder="you@example.com" />',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputBasicExampleComponent {}
