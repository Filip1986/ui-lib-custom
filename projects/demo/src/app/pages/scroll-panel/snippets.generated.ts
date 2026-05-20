/* eslint-disable */
// AUTO-GENERATED — run `node scripts/generate-snippets.mjs` to regenerate.
// Do not edit manually.

export const basicUsageHtml = `<ui-lib-scroll-panel style="height: 200px;">
  <p>Long content...</p>
  <p>More content...</p>
</ui-lib-scroll-panel>`;

export const basicUsageTs = `import { Component } from '@angular/core';
import { ScrollPanel } from 'ui-lib-custom/scroll-panel';

@Component({
  standalone: true,
  imports: [ScrollPanel],
  templateUrl: './basic-usage.example.html',
})
export class MyComponent {}`;

export const horizontalHtml = `<ui-lib-scroll-panel style="height: 160px; width: 100%;">
  <div style="display: flex; gap: 1rem; width: max-content;">
    <!-- wide content -->
  </div>
</ui-lib-scroll-panel>`;

export const horizontalTs = `import { Component } from '@angular/core';
import { ScrollPanel } from 'ui-lib-custom/scroll-panel';

@Component({
  standalone: true,
  imports: [ScrollPanel],
  templateUrl: './horizontal.example.html',
})
export class MyComponent {}`;

export const interactiveHtml = `<ui-lib-scroll-panel [variant]="activeVariant()" style="height: 200px;">
  <!-- content -->
</ui-lib-scroll-panel>`;

export const interactiveTs = `import { Component, signal } from '@angular/core';
import type { WritableSignal } from '@angular/core';
import { ScrollPanel } from 'ui-lib-custom/scroll-panel';
import type { ScrollPanelVariant } from 'ui-lib-custom/scroll-panel';

@Component({
  standalone: true,
  imports: [ScrollPanel],
  templateUrl: './interactive.example.html',
})
export class MyComponent {
  public readonly activeVariant: WritableSignal<ScrollPanelVariant> =
    signal<ScrollPanelVariant>('material');
}`;

export const variantsHtml = `<ui-lib-scroll-panel [variant]="'material'" style="height: 200px;">...</ui-lib-scroll-panel>
<ui-lib-scroll-panel [variant]="'bootstrap'" style="height: 200px;">...</ui-lib-scroll-panel>
<ui-lib-scroll-panel [variant]="'minimal'" style="height: 200px;">...</ui-lib-scroll-panel>`;

export const variantsTs = `import { Component } from '@angular/core';
import { ScrollPanel } from 'ui-lib-custom/scroll-panel';

@Component({
  standalone: true,
  imports: [ScrollPanel],
  templateUrl: './variants.example.html',
})
export class MyComponent {}`;
