import { Component } from '@angular/core';
import { PanelMenu } from 'ui-lib-custom/panel-menu';
import type { PanelMenuItem } from 'ui-lib-custom/panel-menu';

@Component({
  standalone: true,
  imports: [PanelMenu],
  templateUrl: './basic.example.html',
})
export class MyComponent {
  readonly items: PanelMenuItem[] = [
    {
      label: 'Account',
      icon: 'pi pi-user',
      items: [
        { label: 'Profile', icon: 'pi pi-id-card' },
        { label: 'Security', icon: 'pi pi-lock' },
      ],
    },
    {
      label: 'Support',
      icon: 'pi pi-question-circle',
      items: [{ label: 'Documentation', icon: 'pi pi-book' }],
    },
  ];
}
