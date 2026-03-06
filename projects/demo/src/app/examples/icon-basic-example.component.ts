import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Icon } from 'ui-lib-custom/icon';

/**
 *
 */
@Component({
  selector: 'app-icon-basic-example',
  standalone: true,
  imports: [Icon],
  template: '<ui-lib-icon name="search" size="lg" variant="material" />',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconBasicExampleComponent {}
