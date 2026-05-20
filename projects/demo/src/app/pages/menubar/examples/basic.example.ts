import { Component } from '@angular/core';
import { Menubar } from 'ui-lib-custom/menubar';
import type { MenubarItem } from 'ui-lib-custom/menubar';

@Component({
  standalone: true,
  imports: [Menubar],
  templateUrl: './basic.example.html',
})
export class MyComponent {
  readonly basicModel: MenubarItem[] = [
    {
      label: 'File',
      items: [
        { label: 'New', icon: 'pi pi-file' },
        { label: 'Open', icon: 'pi pi-folder-open' },
        { separator: true },
        { label: 'Save', icon: 'pi pi-save' },
      ],
    },
    { label: 'Edit', items: [{ label: 'Undo' }, { label: 'Redo' }] },
    { label: 'Help', items: [{ label: 'About' }] },
  ];
}
