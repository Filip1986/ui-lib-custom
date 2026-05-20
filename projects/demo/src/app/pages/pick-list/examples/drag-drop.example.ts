import { Component, signal } from '@angular/core';
import type { WritableSignal } from '@angular/core';
import { PickListComponent } from 'ui-lib-custom/pick-list';
import type { PickListMoveToTargetEvent, PickListMoveToSourceEvent } from 'ui-lib-custom/pick-list';

interface Country {
  code: string;
  name: string;
}

@Component({
  standalone: true,
  imports: [PickListComponent],
  templateUrl: './drag-drop.example.html',
})
export class MyComponent {
  public readonly source: WritableSignal<Country[]> = signal([
    { code: 'DE', name: 'Germany' },
    { code: 'FR', name: 'France' },
  ]);
  public readonly target: WritableSignal<Country[]> = signal([]);

  public onMoveToTarget(event: PickListMoveToTargetEvent): void {
    console.log('Moved to target', event.items);
  }

  public onMoveToSource(event: PickListMoveToSourceEvent): void {
    console.log('Returned to source', event.items);
  }
}
