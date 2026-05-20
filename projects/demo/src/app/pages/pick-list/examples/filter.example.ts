import { Component, signal } from '@angular/core';
import type { WritableSignal } from '@angular/core';
import { PickListComponent } from 'ui-lib-custom/pick-list';

interface Country {
  code: string;
  name: string;
}

@Component({
  standalone: true,
  imports: [PickListComponent],
  templateUrl: './filter.example.html',
})
export class MyComponent {
  public readonly source: WritableSignal<Country[]> = signal([
    { code: 'DE', name: 'Germany' },
    { code: 'FR', name: 'France' },
  ]);
  public readonly target: WritableSignal<Country[]> = signal([]);
}
