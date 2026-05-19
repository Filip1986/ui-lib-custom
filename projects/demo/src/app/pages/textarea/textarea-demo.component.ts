import { ChangeDetectionStrategy, Component, viewChild } from '@angular/core';
import type { Signal } from '@angular/core';
import { CodeSnippet } from 'ui-lib-custom/code-snippet';
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
import { UiLibTextarea } from 'ui-lib-custom/textarea';
import type { TextareaChangeEvent } from 'ui-lib-custom/textarea';
import { DocQualityBadgeComponent } from '@demo/shared/doc-page/doc-quality-badge.component';
import type { ComponentQualityAudit } from '@demo/shared/doc-page/doc-quality-badge.component';
import { DocApiReferenceComponent } from '@demo/shared/doc-page/doc-api-reference.component';
import type { ApiPropRow } from '@demo/shared/doc-page/doc-api-reference.component';

import { Panel } from 'ui-lib-custom/panel';
type TextareaDemoSnippetKey =
  | 'basic'
  | 'autoResize'
  | 'counter'
  | 'maxLength'
  | 'sizes'
  | 'variants'
  | 'disabled'
  | 'readonly'
  | 'invalid'
  | 'reactive';

/**
 * Demo page for the Textarea component — all features, states, and form integration.
 */
@Component({
  selector: 'app-textarea-demo',
  standalone: true,
  imports: [
    Panel,
    CodeSnippet,
    FormsModule,
    ReactiveFormsModule,
    DocPageHeaderComponent,
    DocPageLayoutComponent,
    DocDemoViewportComponent,
    Button,
    UiLibTextarea,
    DocTocComponent,
    DocQualityBadgeComponent,
    DocApiReferenceComponent,
  ],
  templateUrl: './textarea-demo.component.html',
  styleUrl: './textarea-demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextareaDemoComponent {
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

  public readonly layout: Signal<DocPageLayoutComponent | undefined> =
    viewChild(DocPageLayoutComponent);

  public scrollTo(id: string): void {
    this.layout()?.scrollToSection(id);
  }

  public readonly apiRows: ApiPropRow[] = [
    { name: 'label', type: 'string', default: "''", description: 'Label text.' },
    { name: 'placeholder', type: 'string', default: "''", description: 'Placeholder text.' },
    {
      name: 'variant',
      type: "'material' | 'bootstrap' | 'minimal' | null",
      default: 'null',
      description: 'Design variant.',
    },
    { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Textarea size.' },
    { name: 'rows', type: 'number', default: '3', description: 'Initial number of visible rows.' },
    {
      name: 'maxRows',
      type: 'number | null',
      default: 'null',
      description: 'Maximum rows for auto-resize mode.',
    },
    {
      name: 'resize',
      type: "'none' | 'vertical' | 'horizontal' | 'both'",
      default: "'vertical'",
      description: 'Manual resize handle direction.',
    },
    {
      name: 'autoResize',
      type: 'boolean',
      default: 'false',
      description: 'Grows with content up to maxRows.',
    },
    { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables the textarea.' },
    {
      name: 'readonly',
      type: 'boolean',
      default: 'false',
      description: 'Makes the textarea read-only.',
    },
    {
      name: 'required',
      type: 'boolean',
      default: 'false',
      description: 'Marks the textarea as required.',
    },
    {
      name: 'invalid',
      type: 'boolean',
      default: 'false',
      description: 'Marks the textarea as invalid.',
    },
    {
      name: 'showCounter',
      type: 'boolean',
      default: 'false',
      description: 'Shows a character counter.',
    },
    {
      name: 'maxLength',
      type: 'number | null',
      default: 'null',
      description: 'Maximum character length.',
    },
    {
      name: 'error',
      type: 'string | null',
      default: 'null',
      description: 'Validation error message.',
    },
    { name: 'hint', type: 'string | null', default: 'null', description: 'Helper hint message.' },
    { name: 'ariaLabel', type: 'string | null', default: 'null', description: 'Accessible label.' },
  ];

  public readonly importCode: string = "import { UiLibTextarea } from 'ui-lib-custom/textarea'";
  public readonly sections: DocSection[] = [
    { id: 'basic', label: 'Basic' },
    { id: 'auto-resize', label: 'Auto Resize' },
    { id: 'counter', label: 'Counter' },
    { id: 'max-length', label: 'Max Length' },
    { id: 'sizes', label: 'Sizes' },
    { id: 'variants', label: 'Variants' },
    { id: 'disabled', label: 'Disabled' },
    { id: 'readonly', label: 'Read-only' },
    { id: 'invalid', label: 'Invalid' },
    { id: 'reactive-forms', label: 'Reactive Forms' },
    { id: 'api', label: 'API Reference' },
  ];

  public readonly snippets: Record<TextareaDemoSnippetKey, string> = {
    basic:
      '<ui-lib-textarea label="Description" placeholder="Enter a description..." [(ngModel)]="basicValue" [ngModelOptions]="{ standalone: true }" />',
    autoResize:
      '<ui-lib-textarea label="Notes" [autoResize]="true" [rows]="3" [(ngModel)]="autoResizeValue" [ngModelOptions]="{ standalone: true }" />',
    counter:
      '<ui-lib-textarea label="Bio" [showCounter]="true" [(ngModel)]="counterValue" [ngModelOptions]="{ standalone: true }" />',
    maxLength:
      '<ui-lib-textarea label="Tweet" [showCounter]="true" [maxLength]="280" [(ngModel)]="maxLengthValue" [ngModelOptions]="{ standalone: true }" />',
    sizes:
      '<ui-lib-textarea label="Small" size="sm" [(ngModel)]="sizeSm" [ngModelOptions]="{ standalone: true }" />',
    variants:
      '<ui-lib-textarea label="Material" variant="material" [(ngModel)]="variantMaterial" [ngModelOptions]="{ standalone: true }" />',
    disabled:
      '<ui-lib-textarea label="Comments" [disabled]="true" [(ngModel)]="disabledValue" [ngModelOptions]="{ standalone: true }" />',
    readonly:
      '<ui-lib-textarea label="Terms" [readonly]="true" [(ngModel)]="readonlyValue" [ngModelOptions]="{ standalone: true }" />',
    invalid:
      '<ui-lib-textarea label="Address" error="This field is required" [required]="true" [(ngModel)]="invalidValue" [ngModelOptions]="{ standalone: true }" />',
    reactive:
      '<ui-lib-textarea label="Feedback" [showCounter]="true" [maxLength]="500" [required]="true" formControlName="feedback" />',
  };

  // Basic
  public basicValue: string = '';

  // Auto resize
  public autoResizeValue: string = '';

  // Counter
  public counterValue: string = '';

  // Max length
  public maxLengthValue: string = '';

  // Sizes
  public sizeSm: string = '';
  public sizeMd: string = '';
  public sizeLg: string = '';

  // Variants
  public variantMaterial: string = '';
  public variantBootstrap: string = '';
  public variantMinimal: string = '';

  // Disabled
  public disabledValue: string = 'This field cannot be edited.';

  // Readonly
  public readonlyValue: string = 'You can read but not edit this content.';

  // Invalid
  public invalidValue: string = '';

  // Event log
  public readonly eventLog: string[] = [];

  // Reactive form
  public readonly form: FormGroup<{ feedback: FormControl<string | null> }> = new FormGroup<{
    feedback: FormControl<string | null>;
  }>({
    feedback: new FormControl<string | null>(null, { validators: [Validators.required] }),
  });

  public reactiveSubmittedValue: string | null = null;

  public snippet(key: TextareaDemoSnippetKey): string {
    return this.snippets[key];
  }

  public onInputEvent(event: TextareaChangeEvent): void {
    this.eventLog.unshift(event.value.slice(0, 40));
    if (this.eventLog.length > 5) {
      this.eventLog.pop();
    }
  }

  public submitForm(): void {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      this.reactiveSubmittedValue = this.form.controls.feedback.value;
    }
  }
}
