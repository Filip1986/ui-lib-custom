import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Tabs, Tab } from 'ui-lib-custom/tabs';

/**
 * Basic tabs example.
 */
@Component({
  selector: 'app-tabs-basic-example',
  standalone: true,
  imports: [Tabs, Tab],
  template: `
    <ui-lib-tabs>
      <ui-lib-tab label="Home">Home content</ui-lib-tab>
      <ui-lib-tab label="Profile">Profile content</ui-lib-tab>
    </ui-lib-tabs>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabsBasicExampleComponent {}
