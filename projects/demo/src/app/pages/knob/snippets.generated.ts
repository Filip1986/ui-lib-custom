/* eslint-disable */
// AUTO-GENERATED — run `node scripts/generate-snippets.mjs` to regenerate.
// Do not edit manually.

export const basicHtml = `<ui-lib-knob [(ngModel)]="value" />`;

export const basicTs = `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { KnobComponent } from 'ui-lib-custom/knob';

@Component({
  standalone: true,
  imports: [FormsModule, KnobComponent],
  templateUrl: './basic.example.html',
})
export class MyComponent {
  value: number = 40;
}`;

export const colorsHtml = `<ui-lib-knob textColor="#b45309" valueColor="#f59e0b" [(ngModel)]="value" />`;

export const colorsTs = `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { KnobComponent } from 'ui-lib-custom/knob';

@Component({
  standalone: true,
  imports: [FormsModule, KnobComponent],
  templateUrl: './colors.example.html',
})
export class MyComponent {
  value: number = 75;
}`;

export const disabledHtml = `<ui-lib-knob [disabled]="true" [(ngModel)]="value" />`;

export const disabledTs = `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { KnobComponent } from 'ui-lib-custom/knob';

@Component({
  standalone: true,
  imports: [FormsModule, KnobComponent],
  templateUrl: './disabled.example.html',
})
export class MyComponent {
  value: number = 55;
}`;

export const minmaxHtml = `<!-- -50 to +50, step 10 -->
<ui-lib-knob [max]="50" [min]="-50" [step]="10" [(ngModel)]="value" />`;

export const minmaxTs = `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { KnobComponent } from 'ui-lib-custom/knob';

@Component({
  standalone: true,
  imports: [FormsModule, KnobComponent],
  templateUrl: './minmax.example.html',
})
export class MyComponent {
  value: number = -20;
}`;

export const reactiveHtml = `<form [formGroup]="form">
  <ui-lib-knob formControlName="brightness" />
  <ui-lib-knob formControlName="contrast" />
</form>`;

export const reactiveTs = `import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { KnobComponent } from 'ui-lib-custom/knob';

@Component({
  standalone: true,
  imports: [ReactiveFormsModule, KnobComponent],
  templateUrl: './reactive.example.html',
})
export class MyComponent {
  readonly form: FormGroup = new FormGroup({
    brightness: new FormControl<number>(70),
    contrast: new FormControl<number>(50),
  });
}`;

export const readonlyHtml = `<ui-lib-knob [readonly]="true" [(ngModel)]="value" />`;

export const readonlyTs = `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { KnobComponent } from 'ui-lib-custom/knob';

@Component({
  standalone: true,
  imports: [FormsModule, KnobComponent],
  templateUrl: './readonly.example.html',
})
export class MyComponent {
  value: number = 30;
}`;

export const sizesHtml = `<!-- Small -->
<ui-lib-knob size="sm" [(ngModel)]="value" />

<!-- Medium (default) -->
<ui-lib-knob size="md" [(ngModel)]="value" />

<!-- Large -->
<ui-lib-knob size="lg" [(ngModel)]="value" />`;

export const sizesTs = `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { KnobComponent } from 'ui-lib-custom/knob';

@Component({
  standalone: true,
  imports: [FormsModule, KnobComponent],
  templateUrl: './sizes.example.html',
})
export class MyComponent {
  value: number = 40;
}`;

export const stepHtml = `<!-- Snaps to 0, 25, 50, 75, 100 -->
<ui-lib-knob [step]="25" [(ngModel)]="value" />`;

export const stepTs = `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { KnobComponent } from 'ui-lib-custom/knob';

@Component({
  standalone: true,
  imports: [FormsModule, KnobComponent],
  templateUrl: './step.example.html',
})
export class MyComponent {
  value: number = 0;
}`;

export const templateHtml = `<ui-lib-knob valueTemplate="{value}\\u00b0" [(ngModel)]="value" />

<ui-lib-knob valueTemplate="{value}%" [(ngModel)]="value" />`;

export const templateTs = `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { KnobComponent } from 'ui-lib-custom/knob';

@Component({
  standalone: true,
  imports: [FormsModule, KnobComponent],
  templateUrl: './template.example.html',
})
export class MyComponent {
  value: number = 60;
}`;
