/* eslint-disable */
// AUTO-GENERATED — run `node scripts/generate-snippets.mjs` to regenerate.
// Do not edit manually.

export const usageSnippetHtml = `
<ui-lib-container size="lg" inset="lg">
  <ui-lib-stack spacing="lg">
    <ui-lib-grid [columns]="3" spacing="md">
      <div class="card">Card 1</div>
      <div class="card">Card 2</div>
      <div class="card">Card 3</div>
    </ui-lib-grid>
  </ui-lib-stack>
</ui-lib-container>`;

export const usageSnippetTs = `import { Component } from '@angular/core';
import { Container, Grid, Stack } from 'ui-lib-custom/layout';

@Component({
  standalone: true,
  imports: [Container, Grid, Stack],
  templateUrl: './usage-snippet.example.html',
})
export class MyComponent {}`;
