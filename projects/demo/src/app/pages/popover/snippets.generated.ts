/* eslint-disable */
// AUTO-GENERATED — run `node scripts/generate-snippets.mjs` to regenerate.
// Do not edit manually.

export const basicHtml = `<button #trigger (click)="op.toggle(trigger)">Toggle</button>

<ui-lib-popover #op>
  <p>Popover body content.</p>
</ui-lib-popover>`;

export const basicTs = `import { Component } from '@angular/core';
import { Popover } from 'ui-lib-custom/popover';

@Component({
  standalone: true,
  imports: [Popover],
  templateUrl: './basic.example.html',
})
export class MyComponent {}`;

export const declarativeHtml = `<ui-lib-popover [(visible)]="isOpen">...</ui-lib-popover>`;

export const declarativeTs = `import { Component, signal } from '@angular/core';
import { Popover } from 'ui-lib-custom/popover';

@Component({
  standalone: true,
  imports: [Popover],
  templateUrl: './declarative.example.html',
})
export class MyComponent {
  readonly isOpen = signal(false);
}`;

export const headerCloseHtml = `<ui-lib-popover #op header="User Details" [showCloseButton]="true">
  <!-- content -->
</ui-lib-popover>`;

export const headerCloseTs = `import { Component } from '@angular/core';
import { Popover } from 'ui-lib-custom/popover';

@Component({
  standalone: true,
  imports: [Popover],
  templateUrl: './header-close.example.html',
})
export class MyComponent {}`;
