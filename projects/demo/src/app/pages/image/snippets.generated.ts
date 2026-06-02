/* eslint-disable */
// AUTO-GENERATED — run `node scripts/generate-snippets.mjs` to regenerate.
// Do not edit manually.

export const basicHtml = `<ui-lib-image alt="A scenic landscape" src="https://picsum.photos/seed/demo/400/300" />`;

export const basicTs = `import { Component } from '@angular/core';
import { Image } from 'ui-lib-custom/image';

@Component({
  standalone: true,
  imports: [Image],
  templateUrl: './basic.example.html',
})
export class MyComponent {}`;

export const customErrorHtml = `<ui-lib-image alt="Broken image" src="https://invalid-url/broken.jpg">
  <ng-template #imageError>
    <div class="my-error">
      <span>⚠️ Could not load image</span>
    </div>
  </ng-template>
</ui-lib-image>`;

export const customErrorTs = `import { Component } from '@angular/core';
import { Image } from 'ui-lib-custom/image';

@Component({
  standalone: true,
  imports: [Image],
  templateUrl: './custom-error.example.html',
})
export class MyComponent {}`;

export const customIndicatorHtml = `<ui-lib-image
  alt="Custom indicator demo"
  src="https://picsum.photos/seed/custom/400/300"
  [preview]="true"
>
  <ng-template #imageIndicator>
    <span style="font-size: 1.5rem">🔍</span>
  </ng-template>
</ui-lib-image>`;

export const customIndicatorTs = `import { Component } from '@angular/core';
import { Image } from 'ui-lib-custom/image';

@Component({
  standalone: true,
  imports: [Image],
  templateUrl: './custom-indicator.example.html',
})
export class MyComponent {}`;

export const dimensionsHtml = `<ui-lib-image
  alt="Wide image"
  height="100"
  src="https://picsum.photos/seed/wide/800/200"
  width="400"
/>`;

export const dimensionsTs = `import { Component } from '@angular/core';
import { Image } from 'ui-lib-custom/image';

@Component({
  standalone: true,
  imports: [Image],
  templateUrl: './dimensions.example.html',
})
export class MyComponent {}`;

export const errorFallbackHtml = `<ui-lib-image
  alt="Image with fallback"
  errorSrc="https://picsum.photos/seed/fallback/400/300"
  src="https://invalid-url/broken.jpg"
/>`;

export const errorFallbackTs = `import { Component } from '@angular/core';
import { Image } from 'ui-lib-custom/image';

@Component({
  standalone: true,
  imports: [Image],
  templateUrl: './error-fallback.example.html',
})
export class MyComponent {}`;

export const previewHtml = `<ui-lib-image
  alt="Click to preview"
  src="https://picsum.photos/seed/preview/400/300"
  [preview]="true"
/>`;

export const previewTs = `import { Component } from '@angular/core';
import { Image } from 'ui-lib-custom/image';

@Component({
  standalone: true,
  imports: [Image],
  templateUrl: './preview.example.html',
})
export class MyComponent {}`;

export const sizesHtml = `<ui-lib-image alt="Small" size="sm" src="..." [preview]="true" />
<ui-lib-image alt="Medium" size="md" src="..." [preview]="true" />
<ui-lib-image alt="Large" size="lg" src="..." [preview]="true" />`;

export const sizesTs = `import { Component } from '@angular/core';
import { Image } from 'ui-lib-custom/image';

@Component({
  standalone: true,
  imports: [Image],
  templateUrl: './sizes.example.html',
})
export class MyComponent {}`;

export const twoWayBindingHtml = `<ui-lib-image
  alt="Two-way binding demo"
  src="https://picsum.photos/seed/binding/400/300"
  [preview]="true"
  [(previewVisible)]="previewVisible"
/>
<p>Preview open: {{ previewVisible() }}</p>`;

export const twoWayBindingTs = `import { Component, signal } from '@angular/core';
import type { WritableSignal } from '@angular/core';
import { Image } from 'ui-lib-custom/image';

@Component({
  standalone: true,
  imports: [Image],
  templateUrl: './two-way-binding.example.html',
})
export class MyComponent {
  public readonly previewVisible: WritableSignal<boolean> = signal<boolean>(false);
}`;

export const variantsHtml = `<ui-lib-image alt="Material" src="..." variant="material" [preview]="true" />
<ui-lib-image alt="Bootstrap" src="..." variant="bootstrap" [preview]="true" />
<ui-lib-image alt="Minimal" src="..." variant="minimal" [preview]="true" />`;

export const variantsTs = `import { Component } from '@angular/core';
import { Image } from 'ui-lib-custom/image';

@Component({
  standalone: true,
  imports: [Image],
  templateUrl: './variants.example.html',
})
export class MyComponent {}`;
