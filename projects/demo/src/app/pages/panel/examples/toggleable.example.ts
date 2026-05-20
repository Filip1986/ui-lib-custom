import { Component, signal } from '@angular/core';
import { Panel } from 'ui-lib-custom/panel';
import type { PanelToggleEvent } from 'ui-lib-custom/panel';

@Component({
  standalone: true,
  imports: [Panel],
  templateUrl: './toggleable.example.html',
})
export class MyComponent {
  public readonly isCollapsed = signal<boolean>(false);

  public handleToggle(event: PanelToggleEvent): void {
    console.log('Toggled:', event.collapsed);
  }
}
