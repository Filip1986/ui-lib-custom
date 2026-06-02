/* eslint-disable */
// AUTO-GENERATED — run `node scripts/generate-snippets.mjs` to regenerate.
// Do not edit manually.

export const basicHtml = `<ui-lib-image-compare
  leftAlt="Before"
  leftImage="https://picsum.photos/seed/before/800/400"
  rightAlt="After"
  rightImage="https://picsum.photos/seed/after/800/400"
/>`;

export const basicTs = `import { Component } from '@angular/core';
import { ImageCompare } from 'ui-lib-custom/image-compare';

@Component({
  standalone: true,
  imports: [ImageCompare],
  templateUrl: './basic.example.html',
})
export class MyComponent {}`;

export const customLabelHtml = `<ui-lib-image-compare ariaLabel="Compare photo filters" leftImage="..." rightImage="..." />`;

export const customLabelTs = `import { Component } from '@angular/core';
import { ImageCompare } from 'ui-lib-custom/image-compare';

@Component({
  standalone: true,
  imports: [ImageCompare],
  templateUrl: './custom-label.example.html',
})
export class MyComponent {}`;

export const disabledHtml = `<ui-lib-image-compare leftImage="..." rightImage="..." [disabled]="true" />`;

export const disabledTs = `import { Component } from '@angular/core';
import { ImageCompare } from 'ui-lib-custom/image-compare';

@Component({
  standalone: true,
  imports: [ImageCompare],
  templateUrl: './disabled.example.html',
})
export class MyComponent {}`;

export const sizesHtml = `<ui-lib-image-compare leftImage="..." rightImage="..." size="sm" />
<ui-lib-image-compare leftImage="..." rightImage="..." size="md" />
<ui-lib-image-compare leftImage="..." rightImage="..." size="lg" />`;

export const sizesTs = `import { Component } from '@angular/core';
import { ImageCompare } from 'ui-lib-custom/image-compare';

@Component({
  standalone: true,
  imports: [ImageCompare],
  templateUrl: './sizes.example.html',
})
export class MyComponent {}`;

export const twoWayBindingHtml = `<ui-lib-image-compare
  leftAlt="Before"
  leftImage="https://picsum.photos/seed/before/800/400"
  rightAlt="After"
  rightImage="https://picsum.photos/seed/after/800/400"
  [(value)]="position"
/>
<p>Position: {{ position() }}%</p>`;

export const twoWayBindingTs = `import { Component, signal } from '@angular/core';
import type { WritableSignal } from '@angular/core';
import { ImageCompare } from 'ui-lib-custom/image-compare';

@Component({
  standalone: true,
  imports: [ImageCompare],
  templateUrl: './two-way-binding.example.html',
})
export class MyComponent {
  public readonly position: WritableSignal<number> = signal<number>(50);
}`;

export const variantsHtml = `<ui-lib-image-compare leftImage="..." rightImage="..." variant="material" />
<ui-lib-image-compare leftImage="..." rightImage="..." variant="bootstrap" />
<ui-lib-image-compare leftImage="..." rightImage="..." variant="minimal" />`;

export const variantsTs = `import { Component } from '@angular/core';
import { ImageCompare } from 'ui-lib-custom/image-compare';

@Component({
  standalone: true,
  imports: [ImageCompare],
  templateUrl: './variants.example.html',
})
export class MyComponent {}`;
