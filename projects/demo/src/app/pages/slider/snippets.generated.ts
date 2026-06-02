/* eslint-disable */
// AUTO-GENERATED — run `node scripts/generate-snippets.mjs` to regenerate.
// Do not edit manually.

export const animateHtml = `<ui-lib-slider [animate]="true" [(ngModel)]="value" />`;

export const animateTs = `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Slider } from 'ui-lib-custom/slider';

@Component({
  standalone: true,
  imports: [FormsModule, Slider],
  templateUrl: './animate.example.html',
})
export class MyComponent {
  value: number = 30;
}`;

export const basicHtml = `<ui-lib-slider [(ngModel)]="value" />`;

export const basicTs = `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Slider } from 'ui-lib-custom/slider';

@Component({
  standalone: true,
  imports: [FormsModule, Slider],
  templateUrl: './basic.example.html',
})
export class MyComponent {
  value: number = 40;
}`;

export const disabledHtml = `<ui-lib-slider [disabled]="true" [(ngModel)]="value" />`;

export const disabledTs = `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Slider } from 'ui-lib-custom/slider';

@Component({
  standalone: true,
  imports: [FormsModule, Slider],
  templateUrl: './disabled.example.html',
})
export class MyComponent {
  value: number = 55;
}`;

export const minmaxHtml = `<ui-lib-slider [max]="50" [min]="-50" [step]="10" [(ngModel)]="value" />`;

export const minmaxTs = `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Slider } from 'ui-lib-custom/slider';

@Component({
  standalone: true,
  imports: [FormsModule, Slider],
  templateUrl: './minmax.example.html',
})
export class MyComponent {
  value: number = -10;
}`;

export const rangeHtml = `<ui-lib-slider [range]="true" [(ngModel)]="rangeValue" />`;

export const rangeTs = `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Slider } from 'ui-lib-custom/slider';

@Component({
  standalone: true,
  imports: [FormsModule, Slider],
  templateUrl: './range.example.html',
})
export class MyComponent {
  rangeValue: [number, number] = [20, 75];
}`;

export const reactiveHtml = `<form [formGroup]="form">
  <ui-lib-slider formControlName="volume" />
  <ui-lib-slider formControlName="brightness" />
</form>`;

export const reactiveTs = `import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Slider } from 'ui-lib-custom/slider';

@Component({
  standalone: true,
  imports: [ReactiveFormsModule, Slider],
  templateUrl: './reactive.example.html',
})
export class MyComponent {
  readonly form: FormGroup = new FormGroup({
    volume: new FormControl<number>(60),
    brightness: new FormControl<number>(40),
  });
}`;

export const readonlyHtml = `<ui-lib-slider [readonly]="true" [(ngModel)]="value" />`;

export const readonlyTs = `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Slider } from 'ui-lib-custom/slider';

@Component({
  standalone: true,
  imports: [FormsModule, Slider],
  templateUrl: './readonly.example.html',
})
export class MyComponent {
  value: number = 35;
}`;

export const sizesHtml = `<ui-lib-slider size="sm" [(ngModel)]="value" />
<ui-lib-slider size="md" [(ngModel)]="value" />
<ui-lib-slider size="lg" [(ngModel)]="value" />`;

export const sizesTs = `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Slider } from 'ui-lib-custom/slider';

@Component({
  standalone: true,
  imports: [FormsModule, Slider],
  templateUrl: './sizes.example.html',
})
export class MyComponent {
  value: number = 50;
}`;

export const stepHtml = `<!-- Snaps to 0, 25, 50, 75, 100 -->
<ui-lib-slider [step]="25" [(ngModel)]="value" />`;

export const stepTs = `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Slider } from 'ui-lib-custom/slider';

@Component({
  standalone: true,
  imports: [FormsModule, Slider],
  templateUrl: './step.example.html',
})
export class MyComponent {
  value: number = 0;
}`;

export const verticalHtml = `<ui-lib-slider orientation="vertical" [(ngModel)]="value" />`;

export const verticalTs = `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Slider } from 'ui-lib-custom/slider';

@Component({
  standalone: true,
  imports: [FormsModule, Slider],
  templateUrl: './vertical.example.html',
})
export class MyComponent {
  value: number = 60;
}`;
