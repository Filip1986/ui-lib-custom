import { Component } from '@angular/core';
import { Menubar } from 'ui-lib-custom/menubar';
import type { MenubarItem } from 'ui-lib-custom/menubar';

@Component({
  standalone: true,
  imports: [Menubar],
  templateUrl: './start-end.example.html',
})
export class MyComponent {
  readonly items: MenubarItem[] = [{ label: 'Home' }, { label: 'About' }];
}
