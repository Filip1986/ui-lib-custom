import { Component } from '@angular/core';
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
      items: [{ header: 'Pages', items: [{ label: 'Home' }, { label: 'About' }] }],
    },
  ];

  onItemClick(event: MegaMenuCommandEvent): void {
    console.log('Clicked:', event.item.label);
  }
}
