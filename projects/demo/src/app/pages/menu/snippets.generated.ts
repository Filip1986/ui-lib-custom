/* eslint-disable */
// AUTO-GENERATED — run `node scripts/generate-snippets.mjs` to regenerate.
// Do not edit manually.

export const basicHtml = `<ui-lib-menu [model]="items" (itemClick)="onItemClick($event)" />`;

export const basicTs = `import { Component } from '@angular/core';
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
}`;

export const commandsTs = `items: MenuItem[] = [
  {
    label: 'Download',
    icon: 'pi pi-download',
    command: (event) => console.log('clicked', event.item.label),
  },
];

// Or via the itemClick output:
onItemClick(event: MenuItemCommandEvent): void {
  console.log(event.item.label);
}`;

export const groupedTs = `items: MenuItem[] = [
  {
    label: 'Account',
    items: [
      { label: 'Profile',       icon: 'pi pi-user' },
      { label: 'Security',      icon: 'pi pi-lock' },
      { label: 'Notifications', icon: 'pi pi-bell' },
    ],
  },
  {
    label: 'Workspace',
    items: [
      { label: 'Projects',  icon: 'pi pi-briefcase' },
      { label: 'Billing',   icon: 'pi pi-credit-card' },
    ],
  },
];`;

export const importTs = `import { Menu } from 'ui-lib-custom/menu';
import type { MenuItem } from 'ui-lib-custom/menu';`;

export const popupHtml = `<!-- trigger button wires aria-haspopup, aria-expanded, aria-controls -->
<ui-lib-button
  [attr.aria-controls]="popupMenu.menuId"
  [attr.aria-expanded]="popupMenu.isVisible()"
  [attr.aria-haspopup]="'menu'"
  (click)="popupMenu.toggle($event)"
>
  Options
</ui-lib-button>
<ui-lib-menu #popupMenu [model]="items" [popup]="true" />`;

export const popupTs = `import { Component } from '@angular/core';
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
}`;

export const separatorTs = `items: MenuItem[] = [
  { label: 'New File', icon: 'pi pi-file' },
  { label: 'Open',     icon: 'pi pi-folder-open' },
  { separator: true },
  { label: 'Save',     icon: 'pi pi-save' },
  { label: 'Exit',     icon: 'pi pi-times' },
];`;

export const sizesHtml = `<ui-lib-menu size="sm" [model]="items" />
<ui-lib-menu size="md" [model]="items" />
<ui-lib-menu size="lg" [model]="items" />`;

export const sizesTs = `import { Component } from '@angular/core';
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
}`;

export const urlItemsTs = `items: MenuItem[] = [
  { label: 'Documentation', url: 'https://angular.dev', target: '_blank' },
  { label: 'GitHub',        url: 'https://github.com', target: '_blank' },
  { separator: true },
  { label: 'Command item',  icon: 'pi pi-star' },
];`;

export const variantsHtml = `<ui-lib-menu variant="material" [model]="items" />
<ui-lib-menu variant="bootstrap" [model]="items" />
<ui-lib-menu variant="minimal" [model]="items" />`;

export const variantsTs = `import { Component } from '@angular/core';
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
}`;
