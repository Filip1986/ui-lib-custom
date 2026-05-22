import { Component } from '@angular/core';
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
}
