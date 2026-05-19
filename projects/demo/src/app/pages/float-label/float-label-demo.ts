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
import { DocPageLayoutComponent } from '@demo/shared/doc-page/doc-page-layout.component';
import { DocTocComponent } from '@demo/shared/doc-page/doc-toc.component';
import { DocDemoViewportComponent } from '@demo/shared/doc-page/doc-demo-viewport.component';
import { DocPageHeaderComponent } from '@demo/shared/doc-page/doc-page-header.component';
import { DocQualityBadgeComponent } from '@demo/shared/doc-page/doc-quality-badge.component';
import type { ComponentQualityAudit } from '@demo/shared/doc-page/doc-quality-badge.component';
import { DocCodeExampleComponent } from '@demo/shared/doc-page/doc-code-example.component';
import { UiLibInput } from 'ui-lib-custom/input';
import { Button } from 'ui-lib-custom/button';
import { UiLibSelect } from 'ui-lib-custom/select';
import { FloatLabelComponent } from 'ui-lib-custom/float-label';
import { CodeSnippet } from 'ui-lib-custom/code-snippet';

import { Panel } from 'ui-lib-custom/panel';
interface DemoOption {
  label: string;
  value: string;
}

type FloatLabelDemoSnippetKey =
  | 'basic'
  | 'variants'
  | 'select'
  | 'textarea'
  | 'invalid'
  | 'reactive';

/**
 * Demo page for FloatLabel variants and form integration.
 */
@Component({
  selector: 'app-float-label-demo',
  standalone: true,
  imports: [
    Panel,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DocPageLayoutComponent,
    DocTocComponent,
    DocDemoViewportComponent,
    UiLibInput,
    UiLibSelect,
    FloatLabelComponent,
    CodeSnippet,
    Button,
    DocPageHeaderComponent,
    DocQualityBadgeComponent,
    DocCodeExampleComponent,
  ],
  templateUrl: './float-label-demo.html',
  styleUrl: './float-label-demo.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FloatLabelDemoComponent {
  public readonly qualityAudit: ComponentQualityAudit = {
    date: '2026-05-18',
    tier: 1,
    scores: {
      api: 9,
      a11y: 9,
      perf: 10,
      comp: 8,
      theme: 8,
      dx: 9,
      docs: 9,
      polish: 8,
      angular: 9,
      feel: 8,
    },
    competitiveParity: 'pending',
  };

  public readonly importCode: string =
    "import { FloatLabelComponent } from 'ui-lib-custom/float-label'";

  public readonly layout: Signal<DocPageLayoutComponent | undefined> =
    viewChild(DocPageLayoutComponent);

  public readonly sections: DocSection[] = [
    { id: 'basic', label: 'Basic' },
    { id: 'variants', label: 'Variants' },
    { id: 'with-select', label: 'With Select' },
    { id: 'with-textarea', label: 'With Textarea' },
    { id: 'invalid', label: 'Invalid' },
    { id: 'reactive', label: 'Reactive Forms' },
  ];

  public scrollTo(id: string): void {
    this.layout()?.scrollToSection(id);
  }

  public readonly snippets: Record<FloatLabelDemoSnippetKey, string> = {
    basic: `<uilib-float-label>
  <ui-lib-input placeholder=" " [(ngModel)]="basicValue" [label]="''" />
  <label>Username</label>
</uilib-float-label>`,
    variants: `<uilib-float-label variant="over">
  <input placeholder=" " [(ngModel)]="variantValues.over" />
  <label>Over</label>
</uilib-float-label>
<uilib-float-label variant="in">
  <input placeholder=" " [(ngModel)]="variantValues.in" />
  <label>In</label>
</uilib-float-label>
<uilib-float-label variant="on">
  <input placeholder=" " [(ngModel)]="variantValues.on" />
  <label>On</label>
</uilib-float-label>`,
    select: `<uilib-float-label>
  <ui-lib-select [(ngModel)]="selectedCity" [options]="cityOptions" />
  <label>City</label>
</uilib-float-label>`,
    textarea: `<uilib-float-label>
  <textarea placeholder=" " [(ngModel)]="notes"></textarea>
  <label>Notes</label>
</uilib-float-label>`,
    invalid: `<form [formGroup]="invalidForm">
  <uilib-float-label variant="over">
    <input placeholder=" " formControlName="over" />
    <label>Required (over)</label>
  </uilib-float-label>
  <uilib-float-label variant="in">
    <input placeholder=" " formControlName="in" />
    <label>Required (in)</label>
  </uilib-float-label>
  <uilib-float-label variant="on">
    <input placeholder=" " formControlName="on" />
    <label>Required (on)</label>
  </uilib-float-label>
</form>`,
    reactive: `<form [formGroup]="reactiveForm" (ngSubmit)="submitReactive()">
  <uilib-float-label>
    <input placeholder=" " formControlName="firstName" />
    <label>First name</label>
  </uilib-float-label>
  <uilib-float-label>
    <ui-lib-select [options]="cityOptions" formControlName="city" />
    <label>City</label>
  </uilib-float-label>
  <uilib-float-label variant="in">
    <textarea placeholder=" " formControlName="bio"></textarea>
    <label>Bio</label>
  </uilib-float-label>
</form>`,
  };

  public basicValue: string = '';
  public readonly variantValues: { over: string; in: string; on: string } = {
    over: '',
    in: '',
    on: '',
  };

  public readonly cityOptions: DemoOption[] = [
    { label: 'Amsterdam', value: 'amsterdam' },
    { label: 'Berlin', value: 'berlin' },
    { label: 'Lisbon', value: 'lisbon' },
  ];
  public selectedCity: string | null = null;
  public notes: string = '';

  public readonly invalidForm: FormGroup<{
    over: FormControl<string>;
    in: FormControl<string>;
    on: FormControl<string>;
  }> = new FormGroup<{
    over: FormControl<string>;
    in: FormControl<string>;
    on: FormControl<string>;
  }>({
    over: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    in: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    on: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
  });

  public readonly reactiveForm: FormGroup<{
    firstName: FormControl<string>;
    city: FormControl<string | null>;
    bio: FormControl<string>;
  }> = new FormGroup<{
    firstName: FormControl<string>;
    city: FormControl<string | null>;
    bio: FormControl<string>;
  }>({
    firstName: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    city: new FormControl<string | null>(null, { validators: [Validators.required] }),
    bio: new FormControl<string>('', { nonNullable: true }),
  });

  public submittedReactiveValue: { firstName: string; city: string | null; bio: string } | null =
    null;

  public readonly snippetsTs: Record<FloatLabelDemoSnippetKey, string> = {
    basic: `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FloatLabelComponent } from 'ui-lib-custom/float-label';
import { UiLibInput } from 'ui-lib-custom/input';

@Component({
  standalone: true,
  imports: [FormsModule, FloatLabelComponent, UiLibInput],
  templateUrl: './my.component.html',
})
export class MyComponent {
  public basicValue: string = '';
}`,
    variants: `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FloatLabelComponent } from 'ui-lib-custom/float-label';

@Component({
  standalone: true,
  imports: [FormsModule, FloatLabelComponent],
  templateUrl: './my.component.html',
})
export class MyComponent {
  public readonly variantValues: { over: string; in: string; on: string } = {
    over: '',
    in: '',
    on: '',
  };
}`,
    select: `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FloatLabelComponent } from 'ui-lib-custom/float-label';
import { UiLibSelect } from 'ui-lib-custom/select';

@Component({
  standalone: true,
  imports: [FormsModule, FloatLabelComponent, UiLibSelect],
  templateUrl: './my.component.html',
})
export class MyComponent {
  public selectedCity: string | null = null;
  public readonly cityOptions = [
    { label: 'Amsterdam', value: 'amsterdam' },
    { label: 'Berlin', value: 'berlin' },
    { label: 'Lisbon', value: 'lisbon' },
  ];
}`,
    textarea: `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FloatLabelComponent } from 'ui-lib-custom/float-label';

@Component({
  standalone: true,
  imports: [FormsModule, FloatLabelComponent],
  templateUrl: './my.component.html',
})
export class MyComponent {
  public notes: string = '';
}`,
    invalid: `import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { FloatLabelComponent } from 'ui-lib-custom/float-label';

@Component({
  standalone: true,
  imports: [ReactiveFormsModule, FloatLabelComponent],
  templateUrl: './my.component.html',
})
export class MyComponent {
  public readonly invalidForm = new FormGroup({
    over: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    in: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    on: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
  });
}`,
    reactive: `import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { FloatLabelComponent } from 'ui-lib-custom/float-label';
import { UiLibSelect } from 'ui-lib-custom/select';

@Component({
  standalone: true,
  imports: [ReactiveFormsModule, FloatLabelComponent, UiLibSelect],
  templateUrl: './my.component.html',
})
export class MyComponent {
  public readonly reactiveForm = new FormGroup({
    firstName: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    city: new FormControl<string | null>(null, { validators: [Validators.required] }),
    bio: new FormControl('', { nonNullable: true }),
  });
}`,
  };

  public snippet(key: FloatLabelDemoSnippetKey): string {
    return this.snippets[key];
  }

  public snippetTs(key: FloatLabelDemoSnippetKey): string {
    return this.snippetsTs[key];
  }

  public markInvalidAsDirty(): void {
    this.invalidForm.markAllAsTouched();
    this.invalidForm.markAsDirty();
    this.invalidForm.controls.over.markAsDirty();
    this.invalidForm.controls.in.markAsDirty();
    this.invalidForm.controls.on.markAsDirty();
  }

  public submitReactive(): void {
    this.reactiveForm.markAllAsTouched();
    if (this.reactiveForm.invalid) {
      this.submittedReactiveValue = null;
      return;
    }

    this.submittedReactiveValue = {
      firstName: this.reactiveForm.controls.firstName.value,
      city: this.reactiveForm.controls.city.value,
      bio: this.reactiveForm.controls.bio.value,
    };
  }
}
