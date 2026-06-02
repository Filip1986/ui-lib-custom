/* eslint-disable */
// AUTO-GENERATED — run `node scripts/generate-snippets.mjs` to regenerate.
// Do not edit manually.

export const autoResizeHtml = `<ui-lib-textarea
  label="Notes"
  [autoResize]="true"
  [ngModelOptions]="{ standalone: true }"
  [rows]="3"
  [(ngModel)]="autoResizeValue"
/>`;

export const autoResizeTs = `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UiLibTextarea } from 'ui-lib-custom/textarea';

@Component({
  standalone: true,
  imports: [UiLibTextarea, FormsModule],
  templateUrl: './auto-resize.example.html',
})
export class MyComponent {
  public autoResizeValue: string = '';
}`;

export const basicHtml = `<ui-lib-textarea
  label="Description"
  placeholder="Enter a description..."
  [ngModelOptions]="{ standalone: true }"
  [(ngModel)]="basicValue"
/>`;

export const basicTs = `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UiLibTextarea } from 'ui-lib-custom/textarea';

@Component({
  standalone: true,
  imports: [UiLibTextarea, FormsModule],
  templateUrl: './basic.example.html',
})
export class MyComponent {
  public basicValue: string = '';
}`;

export const counterHtml = `<ui-lib-textarea
  label="Bio"
  [ngModelOptions]="{ standalone: true }"
  [showCounter]="true"
  [(ngModel)]="counterValue"
/>`;

export const counterTs = `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UiLibTextarea } from 'ui-lib-custom/textarea';

@Component({
  standalone: true,
  imports: [UiLibTextarea, FormsModule],
  templateUrl: './counter.example.html',
})
export class MyComponent {
  public counterValue: string = '';
}`;

export const disabledHtml = `<ui-lib-textarea
  label="Comments"
  [disabled]="true"
  [ngModelOptions]="{ standalone: true }"
  [(ngModel)]="disabledValue"
/>`;

export const disabledTs = `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UiLibTextarea } from 'ui-lib-custom/textarea';

@Component({
  standalone: true,
  imports: [UiLibTextarea, FormsModule],
  templateUrl: './disabled.example.html',
})
export class MyComponent {
  public disabledValue: string = 'This field cannot be edited.';
}`;

export const invalidHtml = `<ui-lib-textarea
  error="This field is required"
  label="Address"
  [ngModelOptions]="{ standalone: true }"
  [required]="true"
  [(ngModel)]="invalidValue"
/>`;

export const invalidTs = `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UiLibTextarea } from 'ui-lib-custom/textarea';

@Component({
  standalone: true,
  imports: [UiLibTextarea, FormsModule],
  templateUrl: './invalid.example.html',
})
export class MyComponent {
  public invalidValue: string = '';
}`;

export const maxLengthHtml = `<ui-lib-textarea
  label="Tweet"
  [maxLength]="280"
  [ngModelOptions]="{ standalone: true }"
  [showCounter]="true"
  [(ngModel)]="maxLengthValue"
/>`;

export const maxLengthTs = `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UiLibTextarea } from 'ui-lib-custom/textarea';

@Component({
  standalone: true,
  imports: [UiLibTextarea, FormsModule],
  templateUrl: './max-length.example.html',
})
export class MyComponent {
  public maxLengthValue: string = '';
}`;

export const reactiveHtml = `<ui-lib-textarea
  formControlName="feedback"
  label="Feedback"
  [maxLength]="500"
  [required]="true"
  [showCounter]="true"
/>`;

export const reactiveTs = `import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UiLibTextarea } from 'ui-lib-custom/textarea';

@Component({
  standalone: true,
  imports: [UiLibTextarea, ReactiveFormsModule],
  templateUrl: './reactive.example.html',
})
export class MyComponent {
  public readonly form = new FormGroup({
    feedback: new FormControl<string | null>(null, { validators: [Validators.required] }),
  });
}`;

export const readonlyHtml = `<ui-lib-textarea
  label="Terms"
  [ngModelOptions]="{ standalone: true }"
  [readonly]="true"
  [(ngModel)]="readonlyValue"
/>`;

export const readonlyTs = `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UiLibTextarea } from 'ui-lib-custom/textarea';

@Component({
  standalone: true,
  imports: [UiLibTextarea, FormsModule],
  templateUrl: './readonly.example.html',
})
export class MyComponent {
  public readonlyValue: string = 'You can read but not edit this content.';
}`;

export const sizesHtml = `<ui-lib-textarea
  label="Small"
  size="sm"
  [ngModelOptions]="{ standalone: true }"
  [(ngModel)]="sizeSm"
/>`;

export const sizesTs = `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UiLibTextarea } from 'ui-lib-custom/textarea';

@Component({
  standalone: true,
  imports: [UiLibTextarea, FormsModule],
  templateUrl: './sizes.example.html',
})
export class MyComponent {
  public sizeSm: string = '';
}`;

export const variantsHtml = `<ui-lib-textarea
  label="Material"
  variant="material"
  [ngModelOptions]="{ standalone: true }"
  [(ngModel)]="variantMaterial"
/>`;

export const variantsTs = `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UiLibTextarea } from 'ui-lib-custom/textarea';

@Component({
  standalone: true,
  imports: [UiLibTextarea, FormsModule],
  templateUrl: './variants.example.html',
})
export class MyComponent {
  public variantMaterial: string = '';
}`;
