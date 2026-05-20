import { Component, computed, signal } from '@angular/core';
import type { Signal, WritableSignal } from '@angular/core';
import { Tabs, Tab } from 'ui-lib-custom/tabs';
import type { TabsValue } from 'ui-lib-custom/tabs';

@Component({
  standalone: true,
  imports: [Tabs, Tab],
  templateUrl: './controlled.example.html',
})
export class MyComponent {
  readonly index: WritableSignal<number> = signal(0);
  readonly selectedIndex: Signal<number> = computed(() => this.index());

  onIndexChange(event: { value: TabsValue | null; index: number }): void {
    this.index.set(event.index);
  }
}
