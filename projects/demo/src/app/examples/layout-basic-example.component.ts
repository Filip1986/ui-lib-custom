import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Stack } from 'ui-lib-custom/layout';
import { Card } from 'ui-lib-custom/card';

/**
 * Basic layout example.
 */
@Component({
  selector: 'app-layout-basic-example',
  standalone: true,
  imports: [Stack, Card],
  template: `
    <ui-lib-stack [gap]="3">
      <ui-lib-card>Card A</ui-lib-card>
      <ui-lib-card>Card B</ui-lib-card>
    </ui-lib-stack>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutBasicExampleComponent {}
