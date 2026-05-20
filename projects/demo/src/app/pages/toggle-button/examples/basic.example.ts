import { Component, signal } from '@angular/core';
import { ToggleButton } from 'ui-lib-custom/toggle-button';

@Component({
  standalone: true,
  imports: [ToggleButton],
  templateUrl: './basic.example.html',
})
export class MyComponent {
  public readonly isActive = signal<boolean>(false);
}
