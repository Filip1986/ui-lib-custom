import { Component, signal } from '@angular/core';
import { AutoFocus } from 'ui-lib-custom/auto-focus';

@Component({
  standalone: true,
  imports: [AutoFocus],
  templateUrl: './conditional.example.html',
})
export class MyComponent {
  public readonly show = signal<boolean>(false);
}
