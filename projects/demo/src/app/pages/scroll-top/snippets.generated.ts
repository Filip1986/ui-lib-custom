/* eslint-disable */
// AUTO-GENERATED — run `node scripts/generate-snippets.mjs` to regenerate.
// Do not edit manually.

export const parentTargetHtml = `<div style="height: 300px; overflow-y: auto; position: relative;">
  <ui-lib-scroll-top target="parent" [threshold]="100" />
  <!-- scrollable content -->
</div>`;

export const parentTargetTs = `import { Component } from '@angular/core';
import { ScrollTop } from 'ui-lib-custom/scroll-top';

@Component({
  standalone: true,
  imports: [ScrollTop],
  templateUrl: './parent-target.example.html',
})
export class MyComponent {}`;

export const thresholdHtml = `<ui-lib-scroll-top [threshold]="200" />`;

export const thresholdTs = `import { Component } from '@angular/core';
import { ScrollTop } from 'ui-lib-custom/scroll-top';

@Component({
  standalone: true,
  imports: [ScrollTop],
  templateUrl: './threshold.example.html',
})
export class MyComponent {}`;
