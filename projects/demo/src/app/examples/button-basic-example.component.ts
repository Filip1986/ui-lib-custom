import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Button } from 'ui-lib-custom/button';

/**
 * Basic button example.
 */
@Component({
  selector: 'app-button-basic-example',
  standalone: true,
  imports: [Button],
  template: '<ui-lib-button color="primary">Primary Button</ui-lib-button>',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonBasicExampleComponent {}
