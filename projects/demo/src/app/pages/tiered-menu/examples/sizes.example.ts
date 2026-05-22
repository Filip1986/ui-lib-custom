import { Component } from '@angular/core';
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
}
