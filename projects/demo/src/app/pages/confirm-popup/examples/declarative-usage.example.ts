import { Component, signal } from '@angular/core';
import { ConfirmPopup } from 'ui-lib-custom/confirm-popup';

@Component({
  standalone: true,
  imports: [ConfirmPopup],
  templateUrl: './declarative-usage.example.html',
})
export class MyComponent {
  readonly visible = signal(false);

  onAccepted(): void {
    /* handle accept */
  }
  onRejected(): void {
    /* handle reject */
  }
}
