import { Component, signal } from '@angular/core';
import type { WritableSignal } from '@angular/core';
import {
  PickListComponent,
  PickListItemDirective,
  PickListSourceHeaderDirective,
  PickListTargetHeaderDirective,
  PickListEmptyDirective,
} from 'ui-lib-custom/pick-list';

interface Country {
  code: string;
  name: string;
  region: string;
}

@Component({
  standalone: true,
  imports: [
    PickListComponent,
    PickListItemDirective,
    PickListSourceHeaderDirective,
    PickListTargetHeaderDirective,
    PickListEmptyDirective,
  ],
  templateUrl: './templates.example.html',
})
export class MyComponent {
  public readonly source: WritableSignal<Country[]> = signal([
    { code: 'DE', name: 'Germany', region: 'Europe' },
    { code: 'FR', name: 'France', region: 'Europe' },
  ]);
  public readonly target: WritableSignal<Country[]> = signal([
    { code: 'US', name: 'United States', region: 'Americas' },
  ]);
}
