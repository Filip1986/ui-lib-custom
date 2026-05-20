/* eslint-disable */
// AUTO-GENERATED — run `node scripts/generate-snippets.mjs` to regenerate.
// Do not edit manually.

export const cardExampleHtml = `<ui-lib-card>
  <div card-header>Card Title</div>
  Card content
  <div card-footer>Actions</div>
</ui-lib-card>`;

export const cardExampleTs = `import { Component } from '@angular/core';
import { Card } from 'ui-lib-custom/card';

@Component({
  standalone: true,
  imports: [Card],
  templateUrl: './card-example.example.html',
})
export class MyComponent {}`;

export const usageHtml = `<ui-lib-card [showHeader]="true">
  <div card-header>Title</div>
  Body content
</ui-lib-card>`;

export const usageTs = `import { Component } from '@angular/core';
import { Card } from 'ui-lib-custom/card';

@Component({
  standalone: true,
  imports: [Card],
  templateUrl: './usage.example.html',
})
export class MyComponent {}`;
