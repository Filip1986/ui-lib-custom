import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Badge } from 'ui-lib-custom/badge';

/**
 *
 */
@Component({
  selector: 'app-badge-basic-example',
  standalone: true,
  imports: [Badge],
  template: '<ui-lib-badge color="success" variant="solid">Active</ui-lib-badge>',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BadgeBasicExampleComponent {}
