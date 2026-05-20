/* eslint-disable */
// AUTO-GENERATED — run `node scripts/generate-snippets.mjs` to regenerate.
// Do not edit manually.

export const basicHtml = `<ui-lib-panel-menu [model]="items" />`;

export const basicTs = `import { Component } from '@angular/core';
import { PanelMenu } from 'ui-lib-custom/panel-menu';
import type { PanelMenuItem } from 'ui-lib-custom/panel-menu';

@Component({
  standalone: true,
  imports: [PanelMenu],
  templateUrl: './basic.example.html',
})
export class MyComponent {
  readonly items: PanelMenuItem[] = [
    {
      label: 'Account',
      icon: 'pi pi-user',
      items: [
        { label: 'Profile', icon: 'pi pi-id-card' },
        { label: 'Security', icon: 'pi pi-lock' },
      ],
    },
    {
      label: 'Support',
      icon: 'pi pi-question-circle',
      items: [{ label: 'Documentation', icon: 'pi pi-book' }],
    },
  ];
}`;

export const eventsHtml = `<ui-lib-panel-menu
  [model]="items"
  (itemClick)="onItemClick($event)"
  (panelToggle)="onPanelToggle($event)"
/>`;

export const eventsTs = `import { Component } from '@angular/core';
import { PanelMenu } from 'ui-lib-custom/panel-menu';
import type { PanelMenuItem, PanelMenuCommandEvent, PanelMenuPanelToggleEvent } from 'ui-lib-custom/panel-menu';

@Component({
  standalone: true,
  imports: [PanelMenu],
  templateUrl: './events.example.html',
})
export class MyComponent {
  readonly items: PanelMenuItem[] = [
    {
      label: 'Actions',
      icon: 'pi pi-bolt',
      expanded: true,
      items: [
        { label: 'Download', icon: 'pi pi-download' },
        { label: 'Share', icon: 'pi pi-share-alt' },
      ],
    },
  ];

  onItemClick(event: PanelMenuCommandEvent): void {
    console.log('Item clicked:', event.item.label);
  }

  onPanelToggle(event: PanelMenuPanelToggleEvent): void {
    console.log('Panel toggled:', event.item.label, event.expanded);
  }
}`;

export const expandedTs = `items: PanelMenuItem[] = [
  { label: 'File', expanded: true, items: [...] },
  { label: 'Edit', items: [...] },
];`;

export const importTs = `import { PanelMenu } from 'ui-lib-custom/panel-menu';
import type { PanelMenuItem } from 'ui-lib-custom/panel-menu';`;

export const multipleHtml = `<ui-lib-panel-menu [model]="items" [multiple]="true" />`;

export const multipleTs = `import { Component } from '@angular/core';
import { PanelMenu } from 'ui-lib-custom/panel-menu';
import type { PanelMenuItem } from 'ui-lib-custom/panel-menu';

@Component({
  standalone: true,
  imports: [PanelMenu],
  templateUrl: './multiple.example.html',
})
export class MyComponent {
  readonly items: PanelMenuItem[] = [
    {
      label: 'Frontend',
      icon: 'pi pi-desktop',
      items: [{ label: 'Angular' }, { label: 'React' }],
    },
    {
      label: 'Backend',
      icon: 'pi pi-server',
      items: [{ label: 'Node.js' }, { label: 'Python' }],
    },
  ];
}`;

export const urlItemsTs = `{ label: 'Angular Docs', url: 'https://angular.dev', target: '_blank' }`;
