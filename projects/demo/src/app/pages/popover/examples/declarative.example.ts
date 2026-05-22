import { Component, signal } from '@angular/core';
import { Popover } from 'ui-lib-custom/popover';

@Component({
  standalone: true,
  imports: [Popover],
  templateUrl: './declarative.example.html',
})
export class MyComponent {
  readonly isOpen = signal(false);
}
