import { Component, signal } from '@angular/core';
import type { WritableSignal } from '@angular/core';
import { Tabs, Tab } from 'ui-lib-custom/tabs';
import type { TabsValue } from 'ui-lib-custom/tabs';

@Component({
  standalone: true,
  imports: [Tabs, Tab],
  templateUrl: './tab-menu.example.html',
})
export class MyComponent {
  readonly activeRoute: WritableSignal<string> = signal('/overview');

  onNavigate(value: TabsValue | null): void {
    if (typeof value === 'string') {
      this.activeRoute.set(value);
    }
  }
}
