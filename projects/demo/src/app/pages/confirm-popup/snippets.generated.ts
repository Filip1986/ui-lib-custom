/* eslint-disable */
// AUTO-GENERATED — run `node scripts/generate-snippets.mjs` to regenerate.
// Do not edit manually.

export const declarativeUsageHtml = `<ui-lib-confirm-popup
  key="declarative"
  [(visible)]="visible"
  message="Proceed with this action?"
  acceptLabel="Yes, proceed"
  rejectLabel="Cancel"
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

  onAccepted(): void { /* handle accept */ }
  onRejected(): void { /* handle reject */ }
}`;
