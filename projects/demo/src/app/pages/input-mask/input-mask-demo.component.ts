import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, viewChild } from '@angular/core';
import type { Signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import type { DocSection } from '@demo/shared/doc-page/doc-section.model';
import { DocDemoViewportComponent } from '@demo/shared/doc-page/doc-demo-viewport.component';
import { DocPageHeaderComponent } from '@demo/shared/doc-page/doc-page-header.component';
import { DocPageLayoutComponent } from '@demo/shared/doc-page/doc-page-layout.component';
import { DocTocComponent } from '@demo/shared/doc-page/doc-toc.component';
import { Button } from 'ui-lib-custom/button';
import { FloatLabelComponent } from 'ui-lib-custom/float-label';
import { InputMaskComponent } from 'ui-lib-custom/input-mask';
import { DocQualityBadgeComponent } from '@demo/shared/doc-page/doc-quality-badge.component';
import type { ComponentQualityAudit } from '@demo/shared/doc-page/doc-quality-badge.component';
import { DocCodeExampleComponent } from '@demo/shared/doc-page/doc-code-example.component';

import { Panel } from 'ui-lib-custom/panel';
import { DocApiReferenceComponent } from '@demo/shared/doc-page/doc-api-reference.component';
import type { ApiPropRow } from '@demo/shared/doc-page/doc-api-reference.component';
interface InputMaskSizeItem {
  readonly label: string;
  readonly size: 'sm' | 'md' | 'lg';
  value: string | null;
}

type InputMaskDemoSnippetKey =
  | 'basic'
  | 'basicTs'
  | 'formats'
  | 'formatsTs'
  | 'optional'
  | 'optionalTs'
  | 'slotChars'
  | 'slotCharsTs'
  | 'unmask'
  | 'unmaskTs'
  | 'filled'
  | 'filledTs'
  | 'floatLabel'
  | 'floatLabelTs'
  | 'iftaLabel'
  | 'iftaLabelTs'
  | 'sizes'
  | 'sizesTs'
  | 'fluid'
  | 'fluidTs'
  | 'disabled'
  | 'disabledTs'
  | 'invalid'
  | 'invalidTs'
  | 'reactive'
  | 'reactiveTs';

/**
 * Demo page for InputMask behavior, appearance states, and form integration.
 */
@Component({
  selector: 'app-input-mask-demo',
  standalone: true,
  imports: [
    Panel,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DocPageLayoutComponent,
    DocTocComponent,
    DocDemoViewportComponent,
    Button,
    FloatLabelComponent,
    InputMaskComponent,
    DocPageHeaderComponent,
    DocQualityBadgeComponent,
    DocCodeExampleComponent,
    DocApiReferenceComponent,
  ],
  templateUrl: './input-mask-demo.component.html',
  styleUrl: './input-mask-demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputMaskDemoComponent {
  public readonly qualityAudit: ComponentQualityAudit = {
    date: '2026-05-18',
    tier: 1,
    scores: {
      api: 9,
      a11y: 9,
      perf: 9,
      comp: 8,
      theme: 9,
      dx: 9,
      docs: 9,
      polish: 8,
      angular: 9,
      feel: 8,
    },
    competitiveParity: 'pending',
  };

  public readonly importCode: string =
    "import { InputMaskComponent } from 'ui-lib-custom/input-mask'";

  public readonly layout: Signal<DocPageLayoutComponent | undefined> =
    viewChild(DocPageLayoutComponent);

  public readonly sections: DocSection[] = [
    { id: 'basic', label: 'Basic' },
    { id: 'mask-formats', label: 'Mask Formats' },
    { id: 'optional', label: 'Optional' },
    { id: 'slot-character', label: 'Slot Character' },
    { id: 'unmask', label: 'Unmask' },
    { id: 'filled', label: 'Filled' },
    { id: 'float-label', label: 'Float Label' },
    { id: 'ifta-label', label: 'Ifta Label' },
    { id: 'sizes', label: 'Sizes' },
    { id: 'fluid', label: 'Fluid' },
    { id: 'disabled', label: 'Disabled' },
    { id: 'invalid', label: 'Invalid' },
    { id: 'reactive-forms', label: 'Reactive Forms' },
  ];

  public scrollTo(id: string): void {
    this.layout()?.scrollToSection(id);
  }

  public readonly snippets: Record<InputMaskDemoSnippetKey, string> = {
    basic: `<uilib-input-mask
  mask="(999) 999-9999"
  [ngModelOptions]="{ standalone: true }"
  [(ngModel)]="basicValue"
/>
<p>Value: {{ basicValue ?? 'null' }}</p>`,
    basicTs: `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputMaskComponent } from 'ui-lib-custom/input-mask';

@Component({
  standalone: true,
  imports: [InputMaskComponent, FormsModule],
  templateUrl: './my.component.html',
})
export class MyComponent {
  basicValue: string | null = null;
}`,
    formats: `<uilib-input-mask mask="(999) 999-9999" [(ngModel)]="formatValues.phone" [ngModelOptions]="{ standalone: true }" />
<uilib-input-mask mask="99/99/9999" [(ngModel)]="formatValues.date" [ngModelOptions]="{ standalone: true }" />
<uilib-input-mask mask="999-99-9999" [(ngModel)]="formatValues.ssn" [ngModelOptions]="{ standalone: true }" />
<uilib-input-mask mask="a*-999-a999" [(ngModel)]="formatValues.serial" [ngModelOptions]="{ standalone: true }" />`,
    formatsTs: `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputMaskComponent } from 'ui-lib-custom/input-mask';

@Component({
  standalone: true,
  imports: [InputMaskComponent, FormsModule],
  templateUrl: './my.component.html',
})
export class MyComponent {
  formatValues = { phone: null, date: null, ssn: null, serial: null };
}`,
    optional: `<uilib-input-mask
  mask="(999) 999-9999? x99999"
  [autoClear]="optionalAutoClear"
  [(ngModel)]="optionalValue"
  [ngModelOptions]="{ standalone: true }"
/>`,
    optionalTs: `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputMaskComponent } from 'ui-lib-custom/input-mask';

@Component({
  standalone: true,
  imports: [InputMaskComponent, FormsModule],
  templateUrl: './my.component.html',
})
export class MyComponent {
  optionalAutoClear = true;
  optionalValue: string | null = null;
}`,
    slotChars: `<uilib-input-mask mask="999-999" slotChar="_" [keepBuffer]="true" [(ngModel)]="slotValues.underscore" [ngModelOptions]="{ standalone: true }" />
<uilib-input-mask mask="999-999" slotChar="#" [keepBuffer]="true" [(ngModel)]="slotValues.hash" [ngModelOptions]="{ standalone: true }" />
<uilib-input-mask mask="999-999" slotChar="*" [keepBuffer]="true" [(ngModel)]="slotValues.star" [ngModelOptions]="{ standalone: true }" />`,
    slotCharsTs: `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputMaskComponent } from 'ui-lib-custom/input-mask';

@Component({
  standalone: true,
  imports: [InputMaskComponent, FormsModule],
  templateUrl: './my.component.html',
})
export class MyComponent {
  slotValues = { underscore: null, hash: null, star: null };
}`,
    unmask: `<uilib-input-mask mask="(999) 999-9999" [(ngModel)]="maskedModel" [ngModelOptions]="{ standalone: true }" />
<uilib-input-mask mask="(999) 999-9999" [unmask]="true" [(ngModel)]="unmaskedModel" [ngModelOptions]="{ standalone: true }" />`,
    unmaskTs: `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputMaskComponent } from 'ui-lib-custom/input-mask';

@Component({
  standalone: true,
  imports: [InputMaskComponent, FormsModule],
  templateUrl: './my.component.html',
})
export class MyComponent {
  maskedModel: string | null = null;
  unmaskedModel: string | null = null;
}`,
    filled: `<uilib-input-mask
  mask="(999) 999-9999"
  [filled]="true"
  [(ngModel)]="filledValue"
  [ngModelOptions]="{ standalone: true }"
/>`,
    filledTs: `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputMaskComponent } from 'ui-lib-custom/input-mask';

@Component({
  standalone: true,
  imports: [InputMaskComponent, FormsModule],
  templateUrl: './my.component.html',
})
export class MyComponent {
  filledValue: string | null = '5551234567';
}`,
    floatLabel: `<uilib-float-label>
  <uilib-input-mask
    mask="(999) 999-9999"
    [(ngModel)]="floatValue"
    [ngModelOptions]="{ standalone: true }"
  />
  <label>Phone</label>
</uilib-float-label>`,
    floatLabelTs: `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputMaskComponent } from 'ui-lib-custom/input-mask';
import { FloatLabelComponent } from 'ui-lib-custom/float-label';

@Component({
  standalone: true,
  imports: [InputMaskComponent, FloatLabelComponent, FormsModule],
  templateUrl: './my.component.html',
})
export class MyComponent {
  floatValue: string | null = null;
}`,
    iftaLabel: `<uilib-float-label variant="in">
  <uilib-input-mask
    mask="(999) 999-9999"
    [(ngModel)]="iftaValue"
    [ngModelOptions]="{ standalone: true }"
  />
  <label>Phone</label>
</uilib-float-label>`,
    iftaLabelTs: `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputMaskComponent } from 'ui-lib-custom/input-mask';
import { FloatLabelComponent } from 'ui-lib-custom/float-label';

@Component({
  standalone: true,
  imports: [InputMaskComponent, FloatLabelComponent, FormsModule],
  templateUrl: './my.component.html',
})
export class MyComponent {
  iftaValue: string | null = null;
}`,
    sizes: `<uilib-input-mask mask="(999) 999-9999" size="sm" [(ngModel)]="sizeValues.sm" [ngModelOptions]="{ standalone: true }" />
<uilib-input-mask mask="(999) 999-9999" size="md" [(ngModel)]="sizeValues.md" [ngModelOptions]="{ standalone: true }" />
<uilib-input-mask mask="(999) 999-9999" size="lg" [(ngModel)]="sizeValues.lg" [ngModelOptions]="{ standalone: true }" />`,
    sizesTs: `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputMaskComponent } from 'ui-lib-custom/input-mask';

@Component({
  standalone: true,
  imports: [InputMaskComponent, FormsModule],
  templateUrl: './my.component.html',
})
export class MyComponent {
  sizeValues = { sm: null, md: null, lg: null };
}`,
    fluid: `<uilib-input-mask
  mask="(999) 999-9999"
  [fluid]="true"
  [(ngModel)]="fluidValue"
  [ngModelOptions]="{ standalone: true }"
/>`,
    fluidTs: `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputMaskComponent } from 'ui-lib-custom/input-mask';

@Component({
  standalone: true,
  imports: [InputMaskComponent, FormsModule],
  templateUrl: './my.component.html',
})
export class MyComponent {
  fluidValue: string | null = null;
}`,
    disabled: `<uilib-input-mask
  mask="(999) 999-9999"
  [disabled]="true"
  [(ngModel)]="disabledValue"
  [ngModelOptions]="{ standalone: true }"
/>`,
    disabledTs: `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputMaskComponent } from 'ui-lib-custom/input-mask';

@Component({
  standalone: true,
  imports: [InputMaskComponent, FormsModule],
  templateUrl: './my.component.html',
})
export class MyComponent {
  disabledValue: string | null = '5551234567';
}`,
    invalid: `<uilib-input-mask
  mask="(999) 999-9999"
  [invalid]="true"
  [(ngModel)]="invalidValue"
  [ngModelOptions]="{ standalone: true }"
/>`,
    invalidTs: `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputMaskComponent } from 'ui-lib-custom/input-mask';

@Component({
  standalone: true,
  imports: [InputMaskComponent, FormsModule],
  templateUrl: './my.component.html',
})
export class MyComponent {
  invalidValue: string | null = '12';
}`,
    reactive: `<form [formGroup]="reactiveForm" (ngSubmit)="submitReactive()">
  <uilib-input-mask
    mask="(999) 999-9999"
    formControlName="phone"
    [invalid]="reactiveForm.controls.phone.invalid && reactiveForm.controls.phone.touched"
  />
  <ui-lib-button type="submit" color="primary">Submit</ui-lib-button>
</form>`,
    reactiveTs: `import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputMaskComponent } from 'ui-lib-custom/input-mask';
import { Button } from 'ui-lib-custom/button';

@Component({
  standalone: true,
  imports: [InputMaskComponent, Button, ReactiveFormsModule],
  templateUrl: './my.component.html',
})
export class MyComponent {
  reactiveForm = new FormGroup({
    phone: new FormControl<string | null>(null, { validators: [Validators.required] }),
  });

  submitReactive(): void {
    this.reactiveForm.markAllAsTouched();
  }
}`,
  };

  public basicValue: string | null = null;

  public readonly formatValues: {
    phone: string | null;
    date: string | null;
    ssn: string | null;
    serial: string | null;
  } = {
    phone: null,
    date: null,
    ssn: null,
    serial: null,
  };

  public optionalAutoClear: boolean = true;
  public optionalValue: string | null = null;

  public readonly slotValues: {
    underscore: string | null;
    hash: string | null;
    star: string | null;
  } = {
    underscore: null,
    hash: null,
    star: null,
  };

  public maskedModel: string | null = null;
  public unmaskedModel: string | null = null;

  public filledValue: string | null = '5551234567';
  public floatValue: string | null = null;
  public iftaValue: string | null = null;

  public readonly sizeItems: InputMaskSizeItem[] = [
    { label: 'Small', size: 'sm', value: null },
    { label: 'Medium', size: 'md', value: null },
    { label: 'Large', size: 'lg', value: null },
  ];

  public readonly sizeValues: { sm: string | null; md: string | null; lg: string | null } = {
    sm: null,
    md: null,
    lg: null,
  };

  public fluidValue: string | null = null;
  public disabledValue: string | null = '5551234567';
  public invalidValue: string | null = '12';

  public readonly reactiveForm: FormGroup<{ phone: FormControl<string | null> }> = new FormGroup<{
    phone: FormControl<string | null>;
  }>({
    phone: new FormControl<string | null>(null, { validators: [Validators.required] }),
  });

  public reactiveSubmittedValue: string | null = null;

  public snippet(key: InputMaskDemoSnippetKey): string {
    return this.snippets[key];
  }

  public submitReactive(): void {
    this.reactiveForm.markAllAsTouched();
    this.reactiveSubmittedValue = this.reactiveForm.controls.phone.value;
  }

  public formatValue(value: string | null): string {
    return value ?? 'null';
  }

  public readonly apiRows: readonly ApiPropRow[] = [
    {
      name: 'mask',
      type: 'string',
      default: "''",
      description: "Mask pattern, e.g. '(999) 999-9999'.",
    },
    {
      name: 'slotChar',
      type: 'string',
      default: "'_'",
      description: 'Character shown for empty mask slots.',
    },
    {
      name: 'autoClear',
      type: 'boolean',
      default: 'true',
      description: 'Clears the field when incomplete on blur.',
    },
    {
      name: 'unmask',
      type: 'boolean',
      default: 'false',
      description: 'Emits the raw unmasked value.',
    },
    { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Input size.' },
    { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables the input.' },
    {
      name: 'readonly',
      type: 'boolean',
      default: 'false',
      description: 'Makes the input read-only.',
    },
    {
      name: 'invalid',
      type: 'boolean',
      default: 'false',
      description: 'Marks the field as invalid.',
    },
    {
      name: 'ariaLabel',
      type: 'string | null',
      default: 'null',
      description: 'ARIA label for the input.',
    },
    {
      name: 'maskHint',
      type: 'string | null',
      default: 'null',
      description: 'Accessible hint for the expected format.',
    },
    {
      name: 'errorMessage',
      type: 'string | null',
      default: 'null',
      description: 'Error message in an aria-live region.',
    },
  ];
}
