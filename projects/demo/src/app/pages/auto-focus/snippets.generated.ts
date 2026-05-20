/* eslint-disable */
// AUTO-GENERATED — run `node scripts/generate-snippets.mjs` to regenerate.
// Do not edit manually.

export const basicUsageHtml = `<input uiLibAutoFocus />`;

export const basicUsageTs = `import { Component } from '@angular/core';
import { AutoFocus } from 'ui-lib-custom/auto-focus';

@Component({
  standalone: true,
  imports: [AutoFocus],
  templateUrl: './basic-usage.example.html',
})
export class MyComponent {}`;

export const conditionalHtml = `@if (show()) {
  <input uiLibAutoFocus />
}`;

export const conditionalTs = `import { Component, signal } from '@angular/core';
import { AutoFocus } from 'ui-lib-custom/auto-focus';

@Component({
  standalone: true,
  imports: [AutoFocus],
  templateUrl: './conditional.example.html',
})
export class MyComponent {
  public readonly show = signal<boolean>(false);
}`;

export const disabledHtml = `<input uiLibAutoFocus [disabled]="!isEnabled" />`;

export const disabledTs = `import { Component, signal } from '@angular/core';
import { AutoFocus } from 'ui-lib-custom/auto-focus';

@Component({
  standalone: true,
  imports: [AutoFocus],
  templateUrl: './disabled.example.html',
})
export class MyComponent {
  public readonly isEnabled = signal<boolean>(true);
}`;
