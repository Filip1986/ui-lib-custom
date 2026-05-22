import { Component } from '@angular/core';
import { Menu } from 'ui-lib-custom/menu';
import type { MenuItem, MenuItemCommandEvent } from 'ui-lib-custom/menu';

@Component({
  standalone: true,
  imports: [Menu],
  templateUrl: './basic.example.html',
})
export class MyComponent {
  readonly items: MenuItem[] = [
    { label: 'Profile', icon: 'pi pi-user' },
    { label: 'Messages', icon: 'pi pi-envelope' },
    { label: 'Settings', icon: 'pi pi-cog' },
  ];

  onItemClick(event: MenuItemCommandEvent): void {
    console.log('Clicked:', event.item.label);
  }
}
