import { Component, signal } from '@angular/core';
import type { WritableSignal } from '@angular/core';
import { ScrollPanel } from 'ui-lib-custom/scroll-panel';
import type { ScrollPanelVariant } from 'ui-lib-custom/scroll-panel';

@Component({
  standalone: true,
  imports: [ScrollPanel],
  templateUrl: './interactive.example.html',
})
export class MyComponent {
  public readonly activeVariant: WritableSignal<ScrollPanelVariant> =
    signal<ScrollPanelVariant>('material');
}
