import { Component } from '@angular/core';
import { Menu } from 'ui-lib-custom/menu';
import { Button } from 'ui-lib-custom/button';
import type { MenuItem } from 'ui-lib-custom/menu';

@Component({
  standalone: true,
  imports: [Menu, Button],
  templateUrl: './popup.example.html',
})
export class MyComponent {
  readonly items: MenuItem[] = [
    { label: 'View Details', icon: 'pi pi-eye' },
    { label: 'Edit', icon: 'pi pi-pencil' },
    { separator: true },
    { label: 'Move to Trash', icon: 'pi pi-trash' },
  ];
}
