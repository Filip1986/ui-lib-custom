/* eslint-disable */
// AUTO-GENERATED — run `node scripts/generate-snippets.mjs` to regenerate.
// Do not edit manually.

export const allowEmptyHtml = `<!-- Cannot uncheck once checked -->
<ui-lib-toggle-button [allowEmpty]="false" onLabel="Confirmed" offLabel="Confirm" />`;

export const allowEmptyTs = `import { Component } from '@angular/core';
import { ToggleButton } from 'ui-lib-custom/toggle-button';

@Component({
  standalone: true,
  imports: [ToggleButton],
  templateUrl: './allow-empty.example.html',
})
export class MyComponent {}`;

export const basicHtml = `<ui-lib-toggle-button [(checked)]="isActive" />`;

export const basicTs = `import { Component, signal } from '@angular/core';
import { ToggleButton } from 'ui-lib-custom/toggle-button';

@Component({
  standalone: true,
  imports: [ToggleButton],
  templateUrl: './basic.example.html',
})
export class MyComponent {
  public readonly isActive = signal<boolean>(false);
}`;

export const disabledHtml = `<ui-lib-toggle-button [disabled]="true" onLabel="On" offLabel="Off" />`;

export const disabledTs = `import { Component } from '@angular/core';
import { ToggleButton } from 'ui-lib-custom/toggle-button';

@Component({
  standalone: true,
  imports: [ToggleButton],
  templateUrl: './disabled.example.html',
})
export class MyComponent {}`;

export const iconsHtml = `<ui-lib-toggle-button
  onLabel="Muted"
  offLabel="Sound"
  onIcon="volumeOff"
  offIcon="volumeHigh"
  [(checked)]="muted"
/>`;

export const iconsTs = `import { Component, signal } from '@angular/core';
import { ToggleButton } from 'ui-lib-custom/toggle-button';

@Component({
  standalone: true,
  imports: [ToggleButton],
  templateUrl: './icons.example.html',
})
export class MyComponent {
  public readonly muted = signal<boolean>(false);
}`;

export const labelsHtml = `<ui-lib-toggle-button
  onLabel="Active"
  offLabel="Inactive"
  [(checked)]="status"
/>`;

export const labelsTs = `import { Component, signal } from '@angular/core';
import { ToggleButton } from 'ui-lib-custom/toggle-button';

@Component({
  standalone: true,
  imports: [ToggleButton],
  templateUrl: './labels.example.html',
})
export class MyComponent {
  public readonly status = signal<boolean>(false);
}`;

export const ngModelHtml = `<ui-lib-toggle-button [(ngModel)]="notificationsEnabled" />`;

export const ngModelTs = `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToggleButton } from 'ui-lib-custom/toggle-button';

@Component({
  standalone: true,
  imports: [ToggleButton, FormsModule],
  templateUrl: './ng-model.example.html',
})
export class MyComponent {
  public notificationsEnabled: boolean = false;
}`;

export const reactiveHtml = `<!-- Reactive Forms -->
<form [formGroup]="form">
  <ui-lib-toggle-button formControlName="notifications" />
  <ui-lib-toggle-button formControlName="darkMode" />
</form>`;

export const reactiveTs = `import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ToggleButton } from 'ui-lib-custom/toggle-button';

@Component({
  standalone: true,
  imports: [ToggleButton, ReactiveFormsModule],
  templateUrl: './reactive.example.html',
})
export class MyComponent {
  public readonly form = new FormGroup({
    notifications: new FormControl<boolean>(false),
    darkMode: new FormControl<boolean>(true),
  });
}`;

export const sizesHtml = `<!-- Small -->
<ui-lib-toggle-button size="sm" onLabel="On" offLabel="Off" />

<!-- Medium (default) -->
<ui-lib-toggle-button size="md" onLabel="On" offLabel="Off" />

<!-- Large -->
<ui-lib-toggle-button size="lg" onLabel="On" offLabel="Off" />`;

export const sizesTs = `import { Component } from '@angular/core';
import { ToggleButton } from 'ui-lib-custom/toggle-button';

@Component({
  standalone: true,
  imports: [ToggleButton],
  templateUrl: './sizes.example.html',
})
export class MyComponent {}`;

export const variantsHtml = `<!-- Material -->
<ui-lib-toggle-button variant="material" />

<!-- Bootstrap -->
<ui-lib-toggle-button variant="bootstrap" />

<!-- Minimal -->
<ui-lib-toggle-button variant="minimal" />`;

export const variantsTs = `import { Component } from '@angular/core';
import { ToggleButton } from 'ui-lib-custom/toggle-button';

@Component({
  standalone: true,
  imports: [ToggleButton],
  templateUrl: './variants.example.html',
})
export class MyComponent {}`;
