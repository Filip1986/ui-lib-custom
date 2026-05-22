import { Component, signal } from '@angular/core';
import { AutoFocus } from 'ui-lib-custom/auto-focus';

@Component({
  standalone: true,
  imports: [AutoFocus],
  templateUrl: './disabled.example.html',
})
export class MyComponent {
  public readonly isEnabled = signal<boolean>(true);
}
