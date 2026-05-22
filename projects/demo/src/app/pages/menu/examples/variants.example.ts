import { Component } from '@angular/core';
import { Menu } from 'ui-lib-custom/menu';
import type { MenuItem } from 'ui-lib-custom/menu';

@Component({
  standalone: true,
  imports: [Menu],
  templateUrl: './variants.example.html',
})
export class MyComponent {
  readonly items: MenuItem[] = [
    { label: 'Dashboard', icon: 'pi pi-home' },
    { label: 'Reports', icon: 'pi pi-chart-line' },
    { separator: true },
    { label: 'Settings', icon: 'pi pi-cog' },
  ];
}
