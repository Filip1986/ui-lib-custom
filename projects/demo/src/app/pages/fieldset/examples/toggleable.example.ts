import { Component, signal } from '@angular/core';
import type { WritableSignal } from '@angular/core';
import { Fieldset } from 'ui-lib-custom/fieldset';

@Component({
  standalone: true,
  imports: [Fieldset],
  templateUrl: './toggleable.example.html',
})
export class MyComponent {
  public readonly isCollapsed: WritableSignal<boolean> = signal<boolean>(false);
}
