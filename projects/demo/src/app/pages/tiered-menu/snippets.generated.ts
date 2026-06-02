/* eslint-disable */
// AUTO-GENERATED — run `node scripts/generate-snippets.mjs` to regenerate.
// Do not edit manually.

export const basicHtml = `<ui-lib-tiered-menu [model]="items" (itemClick)="onItemClick($event)" />`;

export const basicTs = `import { Component } from '@angular/core';
import { TieredMenu } from 'ui-lib-custom/tiered-menu';
import type { TieredMenuItem, TieredMenuItemCommandEvent } from 'ui-lib-custom/tiered-menu';

@Component({
  standalone: true,
  imports: [TieredMenu],
  templateUrl: './basic.example.html',
})
export class MyComponent {
  readonly items: TieredMenuItem[] = [
    { label: 'New File', icon: 'pi pi-file' },
    { label: 'Open', icon: 'pi pi-folder-open' },
    { separator: true },
    { label: 'Save', icon: 'pi pi-save' },
  ];

  onItemClick(event: TieredMenuItemCommandEvent): void {
    console.log('Clicked:', event.item.label);
  }
}`;

export const importTs = `import { TieredMenu } from 'ui-lib-custom/tiered-menu';
import type { TieredMenuItem } from 'ui-lib-custom/tiered-menu';`;

export const itemStatesTs = `items: TieredMenuItem[] = [
  { label: 'Enabled',  icon: 'pi pi-check' },
  { label: 'Disabled', icon: 'pi pi-ban',  disabled: true },
  { label: 'Hidden',   visible: false },
  { separator: true },
  {
    label: 'With Command',
    command: (event) => console.log('clicked', event.item.label),
  },
];`;

export const nestedTs = `items: TieredMenuItem[] = [
  {
    label: 'File', icon: 'pi pi-file',
    items: [
      { label: 'New',  icon: 'pi pi-plus' },
      {
        label: 'Export', icon: 'pi pi-download',
        items: [
          { label: 'PDF',   icon: 'pi pi-file-pdf' },
          { label: 'CSV',   icon: 'pi pi-table' },
        ],
      },
    ],
  },
];`;

export const popupHtml = `<!-- trigger button wires aria-haspopup, aria-expanded, aria-controls -->
<ui-lib-button
  [attr.aria-controls]="popupMenu.menuId"
  [attr.aria-expanded]="popupMenu.isVisible()"
  [attr.aria-haspopup]="'menu'"
  (click)="popupMenu.toggle($event)"
>
  Open Menu ▾
</ui-lib-button>
<ui-lib-tiered-menu #popupMenu [model]="items" [popup]="true" />`;

export const popupTs = `import { Component } from '@angular/core';
import { TieredMenu } from 'ui-lib-custom/tiered-menu';
import { Button } from 'ui-lib-custom/button';
import type { TieredMenuItem } from 'ui-lib-custom/tiered-menu';

@Component({
  standalone: true,
  imports: [TieredMenu, Button],
  templateUrl: './popup.example.html',
})
export class MyComponent {
  readonly items: TieredMenuItem[] = [
    { label: 'Profile', icon: 'pi pi-user' },
    { label: 'Settings', icon: 'pi pi-cog' },
    { separator: true },
    { label: 'Logout', icon: 'pi pi-sign-out' },
  ];
}`;

export const sizesHtml = `<ui-lib-tiered-menu size="sm" [model]="items" />
<ui-lib-tiered-menu size="md" [model]="items" />
<ui-lib-tiered-menu size="lg" [model]="items" />`;

export const sizesTs = `import { Component } from '@angular/core';
import { TieredMenu } from 'ui-lib-custom/tiered-menu';
import type { TieredMenuItem } from 'ui-lib-custom/tiered-menu';

@Component({
  standalone: true,
  imports: [TieredMenu],
  templateUrl: './sizes.example.html',
})
export class MyComponent {
  readonly items: TieredMenuItem[] = [
    { label: 'Item One', icon: 'pi pi-circle' },
    { label: 'Item Two', icon: 'pi pi-circle' },
    { label: 'Item Three', icon: 'pi pi-circle' },
  ];
}`;

export const urlItemsTs = `items: TieredMenuItem[] = [
  { label: 'GitHub',        url: 'https://github.com',  target: '_blank' },
  { label: 'Documentation', url: 'https://angular.dev', target: '_blank' },
  { separator: true },
  { label: 'No URL item' },
];`;

export const variantsHtml = `<ui-lib-tiered-menu variant="material" [model]="items" />
<ui-lib-tiered-menu variant="bootstrap" [model]="items" />
<ui-lib-tiered-menu variant="minimal" [model]="items" />`;

export const variantsTs = `import { Component } from '@angular/core';
import { TieredMenu } from 'ui-lib-custom/tiered-menu';
import type { TieredMenuItem } from 'ui-lib-custom/tiered-menu';

@Component({
  standalone: true,
  imports: [TieredMenu],
  templateUrl: './variants.example.html',
})
export class MyComponent {
  readonly items: TieredMenuItem[] = [
    { label: 'Dashboard', icon: 'pi pi-home' },
    { label: 'Reports', icon: 'pi pi-chart-line' },
    { separator: true },
    { label: 'Settings', icon: 'pi pi-cog' },
  ];
}`;
