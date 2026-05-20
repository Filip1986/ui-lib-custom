/* eslint-disable */
// AUTO-GENERATED — run `node scripts/generate-snippets.mjs` to regenerate.
// Do not edit manually.

export const basicHorizontalHtml = `<ui-lib-mega-menu [model]="items" />`;

export const basicHorizontalTs = `import { Component } from '@angular/core';
import { MegaMenu } from 'ui-lib-custom/mega-menu';
import type { MegaMenuItem } from 'ui-lib-custom/mega-menu';

@Component({
  standalone: true,
  imports: [MegaMenu],
  templateUrl: './basic-horizontal.example.html',
})
export class MyComponent {
  readonly items: MegaMenuItem[] = [
    {
      label: 'Products',
      items: [
        {
          header: 'Design Tools',
          items: [
            { label: 'Figma Plugin', icon: 'pi pi-palette' },
            { label: 'CLI Toolkit', icon: 'pi pi-terminal' },
          ],
        },
      ],
    },
    { label: 'Docs', url: 'https://example.com/docs', target: '_blank' },
  ];
}`;

export const itemClickHtml = `<ui-lib-mega-menu [model]="items" (itemClick)="onItemClick($event)" />`;

export const itemClickTs = `import { Component } from '@angular/core';
import { MegaMenu } from 'ui-lib-custom/mega-menu';
import type { MegaMenuItem, MegaMenuCommandEvent } from 'ui-lib-custom/mega-menu';

@Component({
  standalone: true,
  imports: [MegaMenu],
  templateUrl: './item-click.example.html',
})
export class MyComponent {
  readonly items: MegaMenuItem[] = [
    {
      label: 'Navigate',
      items: [
        { header: 'Pages', items: [{ label: 'Home' }, { label: 'About' }] },
      ],
    },
  ];

  onItemClick(event: MegaMenuCommandEvent): void {
    console.log('Clicked:', event.item.label);
  }
}`;

export const verticalHtml = `<ui-lib-mega-menu [model]="items" orientation="vertical" />`;

export const verticalTs = `import { Component } from '@angular/core';
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
}`;
