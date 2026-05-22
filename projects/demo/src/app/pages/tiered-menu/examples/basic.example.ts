import { Component } from '@angular/core';
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
}
