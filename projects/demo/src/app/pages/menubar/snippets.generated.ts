/* eslint-disable */
// AUTO-GENERATED — run `node scripts/generate-snippets.mjs` to regenerate.
// Do not edit manually.

export const basicHtml = `<ui-lib-menubar [model]="basicModel" />`;

export const basicTs = `import { Component } from '@angular/core';
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
}`;

export const startEndHtml = `<ui-lib-menubar [model]="items">
  <span menubarStart>MyApp</span>
  <button menubarEnd>Sign In</button>
</ui-lib-menubar>`;

export const startEndTs = `import { Component } from '@angular/core';
import { Menubar } from 'ui-lib-custom/menubar';
import type { MenubarItem } from 'ui-lib-custom/menubar';

@Component({
  standalone: true,
  imports: [Menubar],
  templateUrl: './start-end.example.html',
})
export class MyComponent {
  readonly items: MenubarItem[] = [
    { label: 'Home' },
    { label: 'About' },
  ];
}`;
