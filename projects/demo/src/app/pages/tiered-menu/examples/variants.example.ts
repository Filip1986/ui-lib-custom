import { Component } from '@angular/core';
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
}
