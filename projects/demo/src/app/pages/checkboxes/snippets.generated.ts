/* eslint-disable */
// AUTO-GENERATED — run `node scripts/generate-snippets.mjs` to regenerate.
// Do not edit manually.

export const checkboxExampleHtml = `<ui-lib-checkbox label="Receive updates" [(checked)]="checkedPrimary" />`;

export const checkboxExampleTs = `import { Component } from '@angular/core';
import { Checkbox } from 'ui-lib-custom/checkbox';

@Component({
  standalone: true,
  imports: [Checkbox],
  templateUrl: './checkbox-example.example.html',
})
export class MyComponent {
  public checkedPrimary: boolean = false;
}`;

export const usageHtml = `<ui-lib-checkbox
  appearance="filled"
  description="Keep devices aligned"
  label="Sync data"
  size="md"
  variant="material"
  [binary]="true"
  [falseValue]="'DISABLED'"
  [trueValue]="'ENABLED'"
  [(ngModel)]="syncStatus"
/>`;

export const usageTs = `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Checkbox } from 'ui-lib-custom/checkbox';

@Component({
  standalone: true,
  imports: [Checkbox, FormsModule],
  templateUrl: './usage.example.html',
})
export class MyComponent {
  public syncStatus: string = 'DISABLED';
}`;
