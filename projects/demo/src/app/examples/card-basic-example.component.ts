import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Card } from 'ui-lib-custom/card';

/**
 *
 */
@Component({
  selector: 'app-card-basic-example',
  standalone: true,
  imports: [Card],
  template: `
    <ui-lib-card>
      <div card-header>Card Title</div>
      Card content
      <div card-footer>Actions</div>
    </ui-lib-card>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardBasicExampleComponent {}
