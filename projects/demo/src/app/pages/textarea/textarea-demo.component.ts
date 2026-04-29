import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import type { DocSection } from '@demo/shared/doc-page/doc-section.model';
import { CodePreviewComponent } from '@demo/shared/components/code-preview/code-preview.component';
import { DocDemoViewportComponent } from '@demo/shared/doc-page/doc-demo-viewport.component';
import { DocPageLayoutComponent } from '@demo/shared/doc-page/doc-page-layout.component';
import { Button } from 'ui-lib-custom/button';
import { Card } from 'ui-lib-custom/card';
import { UiLibTextarea } from 'ui-lib-custom/textarea';
import type { TextareaChangeEvent } from 'ui-lib-custom/textarea';

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
    FormsModule,
    ReactiveFormsModule,
    DocPageLayoutComponent,
    DocDemoViewportComponent,
    CodePreviewComponent,
    Card,
    Button,
    UiLibTextarea,
  ],
  templateUrl: './textarea-demo.component.html',
  styleUrl: './textarea-demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextareaDemoComponent {
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
