import { Component } from '@angular/core';
import { signal } from '@angular/core';
import type { WritableSignal } from '@angular/core';
import { Tabs, Tab } from 'ui-lib-custom/tabs';
import type { TabsValue } from 'ui-lib-custom/tabs';

@Component({
  standalone: true,
  imports: [Tabs, Tab],
  templateUrl: './closable.example.html',
})
export class MyComponent {
  readonly tabs: WritableSignal<{ value: string; label: string }[]> = signal([
    { value: 'alpha', label: 'Alpha' },
    { value: 'beta', label: 'Beta' },
  ]);

  onClose(event: { value: TabsValue | null; index: number }): void {
    this.tabs.update((tabs) => tabs.filter((t) => t.value !== event.value));
  }
}
