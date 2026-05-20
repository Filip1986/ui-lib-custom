import { Component } from '@angular/core';
import { Menu } from 'ui-lib-custom/menu';
import type { MenuItem } from 'ui-lib-custom/menu';

@Component({
  standalone: true,
  imports: [Menu],
  templateUrl: './sizes.example.html',
})
export class MyComponent {
  readonly items: MenuItem[] = [
    { label: 'Item One', icon: 'pi pi-circle' },
    { label: 'Item Two', icon: 'pi pi-circle' },
    { label: 'Item Three', icon: 'pi pi-circle' },
  ];
}
