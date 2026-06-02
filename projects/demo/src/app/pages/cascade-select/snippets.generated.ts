/* eslint-disable */
// AUTO-GENERATED — run `node scripts/generate-snippets.mjs` to regenerate.
// Do not edit manually.

export const basicHtml = `<ui-lib-cascade-select
  optionGroupLabel="name"
  optionLabel="cname"
  optionValue="code"
  placeholder="Select city"
  [optionGroupChildren]="['states', 'cities']"
  [options]="countries"
  [(ngModel)]="cityCode"
/>`;

export const basicTs = `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UiLibCascadeSelect } from 'ui-lib-custom/cascade-select';

@Component({
  standalone: true,
  imports: [FormsModule, UiLibCascadeSelect],
  templateUrl: './basic.example.html',
})
export class MyComponent {
  public cityCode: string | null = null;
  public countries = [
    /* your country data */
  ];
}`;

export const clearHtml = `<ui-lib-cascade-select
  optionGroupLabel="name"
  optionLabel="cname"
  optionValue="code"
  [optionGroupChildren]="['states', 'cities']"
  [options]="countries"
  [showClear]="true"
  [(ngModel)]="clearableCode"
/>`;

export const clearTs = `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UiLibCascadeSelect } from 'ui-lib-custom/cascade-select';

@Component({
  standalone: true,
  imports: [FormsModule, UiLibCascadeSelect],
  templateUrl: './clear.example.html',
})
export class MyComponent {
  public clearableCode: string | null = 'SYD';
  public countries = [
    /* your country data */
  ];
}`;

export const clippingHtml = `<div class="clipping-card">
  <ui-lib-cascade-select
    optionGroupLabel="name"
    optionLabel="cname"
    optionValue="code"
    placeholder="Open inside clipped card"
    [optionGroupChildren]="['states', 'cities']"
    [options]="countries"
    [(ngModel)]="clippingCode"
  />
</div>`;

export const clippingTs = `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UiLibCascadeSelect } from 'ui-lib-custom/cascade-select';

@Component({
  standalone: true,
  imports: [FormsModule, UiLibCascadeSelect],
  templateUrl: './clipping.example.html',
})
export class MyComponent {
  public clippingCode: string | null = null;
  public countries = [
    /* your country data */
  ];
}`;

export const filledHtml = `<ui-lib-cascade-select [filled]="true" />`;

export const filledTs = `import { Component } from '@angular/core';
import { UiLibCascadeSelect } from 'ui-lib-custom/cascade-select';

@Component({
  standalone: true,
  imports: [UiLibCascadeSelect],
  templateUrl: './filled.example.html',
})
export class MyComponent {}`;

export const fluidHtml = `<ui-lib-cascade-select [fluid]="true" />`;

export const fluidTs = `import { Component } from '@angular/core';
import { UiLibCascadeSelect } from 'ui-lib-custom/cascade-select';

@Component({
  standalone: true,
  imports: [UiLibCascadeSelect],
  templateUrl: './fluid.example.html',
})
export class MyComponent {}`;

export const formsHtml = `<form #f="ngForm">
  <ui-lib-cascade-select
    #cityModel="ngModel"
    name="city"
    optionGroupLabel="name"
    optionLabel="cname"
    optionValue="code"
    required
    [invalid]="cityModel.invalid && cityModel.touched"
    [optionGroupChildren]="['states', 'cities']"
    [options]="countries"
    [(ngModel)]="templateDrivenCode"
  />
</form>`;

export const formsTs = `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UiLibCascadeSelect } from 'ui-lib-custom/cascade-select';

@Component({
  standalone: true,
  imports: [FormsModule, UiLibCascadeSelect],
  templateUrl: './forms.example.html',
})
export class MyComponent {
  public templateDrivenCode: string | null = null;
  public countries = [
    /* your country data */
  ];
}`;

export const loadingHtml = `<ui-lib-cascade-select
  optionGroupLabel="name"
  optionLabel="cname"
  optionValue="code"
  [loading]="loading"
  [optionGroupChildren]="['states', 'cities']"
  [options]="countries"
  [(ngModel)]="loadingCode"
/>`;

export const loadingTs = `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UiLibCascadeSelect } from 'ui-lib-custom/cascade-select';

@Component({
  standalone: true,
  imports: [FormsModule, UiLibCascadeSelect],
  templateUrl: './loading.example.html',
})
export class MyComponent {
  public loadingCode: string | null = null;
  public loading: boolean = true;
  public countries = [
    /* your country data */
  ];
}`;

export const reactiveHtml = `<form [formGroup]="reactiveForm">
  <ui-lib-cascade-select
    formControlName="city"
    optionGroupLabel="name"
    optionLabel="cname"
    optionValue="code"
    [invalid]="cityControl().invalid && cityControl().touched"
    [optionGroupChildren]="['states', 'cities']"
    [options]="countries"
  />
</form>`;

export const reactiveTs = `import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UiLibCascadeSelect } from 'ui-lib-custom/cascade-select';

@Component({
  standalone: true,
  imports: [ReactiveFormsModule, UiLibCascadeSelect],
  templateUrl: './reactive.example.html',
})
export class MyComponent {
  public readonly reactiveForm = new FormGroup({
    city: new FormControl<string | null>(null, { validators: [Validators.required] }),
  });

  public cityControl(): FormControl<string | null> {
    return this.reactiveForm.controls['city'] as FormControl<string | null>;
  }

  public countries = [
    /* your country data */
  ];
}`;

export const sizesHtml = `<ui-lib-cascade-select size="sm" />
<ui-lib-cascade-select size="md" />
<ui-lib-cascade-select size="lg" />`;

export const sizesTs = `import { Component } from '@angular/core';
import { UiLibCascadeSelect } from 'ui-lib-custom/cascade-select';

@Component({
  standalone: true,
  imports: [UiLibCascadeSelect],
  templateUrl: './sizes.example.html',
})
export class MyComponent {}`;

export const statesHtml = `<ui-lib-cascade-select [disabled]="true" />
<ui-lib-cascade-select [invalid]="true" />`;

export const statesTs = `import { Component } from '@angular/core';
import { UiLibCascadeSelect } from 'ui-lib-custom/cascade-select';

@Component({
  standalone: true,
  imports: [UiLibCascadeSelect],
  templateUrl: './states.example.html',
})
export class MyComponent {}`;

export const templateHtml = `<ui-lib-cascade-select
  optionGroupLabel="name"
  optionLabel="cname"
  optionValue="code"
  [optionGroupChildren]="['states', 'cities']"
  [options]="countries"
  [(ngModel)]="templatedCode"
>
  <ng-template let-option uiCascadeSelectOption>
    <i [class]="resolveNodeIcon(option)"></i>
    <span>{{ resolveNodeLabel(option) }}</span>
  </ng-template>
</ui-lib-cascade-select>`;

export const templateTs = `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UiLibCascadeSelect, CascadeSelectOptionDirective } from 'ui-lib-custom/cascade-select';

@Component({
  standalone: true,
  imports: [FormsModule, UiLibCascadeSelect, CascadeSelectOptionDirective],
  templateUrl: './template.example.html',
})
export class MyComponent {
  public templatedCode: string | null = null;
  public countries = [
    /* your country data */
  ];

  public resolveNodeLabel(option: unknown): string {
    const node = option as { cname?: string; name?: string };
    return node.cname ?? node.name ?? '';
  }

  public resolveNodeIcon(option: unknown): string {
    const node = option as { icon?: string };
    return node.icon ?? 'pi pi-circle';
  }
}`;

export const variantsHtml = `<ui-lib-cascade-select variant="material" />
<ui-lib-cascade-select variant="bootstrap" />
<ui-lib-cascade-select variant="minimal" />`;

export const variantsTs = `import { Component } from '@angular/core';
import { UiLibCascadeSelect } from 'ui-lib-custom/cascade-select';

@Component({
  standalone: true,
  imports: [UiLibCascadeSelect],
  templateUrl: './variants.example.html',
})
export class MyComponent {}`;
