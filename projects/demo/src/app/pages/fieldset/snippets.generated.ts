/* eslint-disable */
// AUTO-GENERATED — run `node scripts/generate-snippets.mjs` to regenerate.
// Do not edit manually.

export const basicHtml = `<ui-lib-fieldset legend="Personal Information">
  <!-- content -->
</ui-lib-fieldset>`;

export const basicTs = `import { Component } from '@angular/core';
import { Fieldset } from 'ui-lib-custom/fieldset';

@Component({
  standalone: true,
  imports: [Fieldset],
  templateUrl: './basic.example.html',
})
export class MyComponent {}`;

export const customLegendHtml = `<ui-lib-fieldset [toggleable]="true">
  <span fieldsetLegend>
    <i class="pi pi-user"></i> User <strong>Profile</strong>
  </span>
  <p>Body content</p>
</ui-lib-fieldset>`;

export const customLegendTs = `import { Component } from '@angular/core';
import { Fieldset } from 'ui-lib-custom/fieldset';

@Component({
  standalone: true,
  imports: [Fieldset],
  templateUrl: './custom-legend.example.html',
})
export class MyComponent {}`;

export const preCollapsedHtml = `<ui-lib-fieldset
  legend="Hidden by Default"
  [toggleable]="true"
  [collapsed]="true"
>
  <p>Revealed on click</p>
</ui-lib-fieldset>`;

export const preCollapsedTs = `import { Component } from '@angular/core';
import { Fieldset } from 'ui-lib-custom/fieldset';

@Component({
  standalone: true,
  imports: [Fieldset],
  templateUrl: './pre-collapsed.example.html',
})
export class MyComponent {}`;

export const toggleableHtml = `<ui-lib-fieldset
  legend="Advanced Options"
  [toggleable]="true"
  [(collapsed)]="isCollapsed"
>
  <!-- content -->
</ui-lib-fieldset>`;

export const toggleableTs = `import { Component, signal } from '@angular/core';
import type { WritableSignal } from '@angular/core';
import { Fieldset } from 'ui-lib-custom/fieldset';

@Component({
  standalone: true,
  imports: [Fieldset],
  templateUrl: './toggleable.example.html',
})
export class MyComponent {
  public readonly isCollapsed: WritableSignal<boolean> = signal<boolean>(false);
}`;

export const variantsHtml = `<ui-lib-fieldset variant="material" legend="Material" />
<ui-lib-fieldset variant="bootstrap" legend="Bootstrap" />
<ui-lib-fieldset variant="minimal" legend="Minimal" />`;

export const variantsTs = `import { Component } from '@angular/core';
import { Fieldset } from 'ui-lib-custom/fieldset';

@Component({
  standalone: true,
  imports: [Fieldset],
  templateUrl: './variants.example.html',
})
export class MyComponent {}`;
