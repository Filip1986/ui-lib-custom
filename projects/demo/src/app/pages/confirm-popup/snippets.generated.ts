/* eslint-disable */
// AUTO-GENERATED — run `node scripts/generate-snippets.mjs` to regenerate.
// Do not edit manually.

export const declarativeUsageHtml = `<ui-lib-confirm-popup
  acceptLabel="Yes, proceed"
  key="declarative"
  message="Proceed with this action?"
  rejectLabel="Cancel"
  [(visible)]="visible"
  (accepted)="onAccepted()"
  (rejected)="onRejected()"
/>`;

export const declarativeUsageTs = `import { Component, signal } from '@angular/core';
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
}`;
