import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Icon } from 'ui-lib-custom/icon';

/**
 * Basic icon example.
 */
@Component({
  selector: 'app-icon-basic-example',
  standalone: true,
  imports: [Icon],
  template: '<ui-lib-icon name="search" size="lg" variant="material" />',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconBasicExampleComponent {}
