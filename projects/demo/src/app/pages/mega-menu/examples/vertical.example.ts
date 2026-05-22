import { Component } from '@angular/core';
import { MegaMenu } from 'ui-lib-custom/mega-menu';
import type { MegaMenuItem } from 'ui-lib-custom/mega-menu';

@Component({
  standalone: true,
  imports: [MegaMenu],
  templateUrl: './vertical.example.html',
})
export class MyComponent {
  readonly items: MegaMenuItem[] = [
    {
      label: 'Overview',
      items: [{ header: 'Dashboard', items: [{ label: 'Analytics', icon: 'pi pi-chart-bar' }] }],
    },
    {
      label: 'Settings',
      items: [{ items: [{ label: 'General', icon: 'pi pi-cog' }] }],
    },
  ];
}
