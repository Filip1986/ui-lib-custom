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
import { UiLibTextarea } from 'ui-lib-custom/textarea';
import type { TextareaChangeEvent } from 'ui-lib-custom/textarea';
import { DocQualityBadgeComponent } from '@demo/shared/doc-page/doc-quality-badge.component';
import type { ComponentQualityAudit } from '@demo/shared/doc-page/doc-quality-badge.component';
import { DocCodeExampleComponent } from '@demo/shared/doc-page/doc-code-example.component';

import { Panel } from 'ui-lib-custom/panel';
import { DocApiReferenceComponent } from '@demo/shared/doc-page/doc-api-reference.component';
import type { ApiPropRow } from '@demo/shared/doc-page/doc-api-reference.component';
import {
  basicHtml,
  basicTs,
  autoResizeHtml,
  autoResizeTs,
  counterHtml,
  counterTs,
  maxLengthHtml,
  maxLengthTs,
  sizesHtml,
  sizesTs,
  variantsHtml,
  variantsTs,
  disabledHtml,
  disabledTs,
  readonlyHtml,
  readonlyTs,
  invalidHtml,
  invalidTs,
  reactiveHtml,
  reactiveTs,
} from './snippets.generated';

import { DocSectionComponent } from '../../shared/doc-page/doc-section.component';
/**
 * Demo page for the Textarea component — all features, states, and form integration.
 */
@Component({
  selector: 'app-textarea-demo',
  standalone: true,
  imports: [
    Panel,
    FormsModule,
    ReactiveFormsModule,
    DocPageHeaderComponent,
    DocPageLayoutComponent,
    DocDemoViewportComponent,
    Button,
    UiLibTextarea,
    DocTocComponent,
    DocQualityBadgeComponent,
    DocCodeExampleComponent,
    DocApiReferenceComponent,
    DocSectionComponent,
  ],
  templateUrl: './textarea-demo.component.html',
  styleUrl: './textarea-demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextareaDemoComponent {
  public readonly basicHtml: string = basicHtml;
  public readonly basicTs: string = basicTs;
  public readonly autoResizeHtml: string = autoResizeHtml;
  public readonly autoResizeTs: string = autoResizeTs;
  public readonly counterHtml: string = counterHtml;
  public readonly counterTs: string = counterTs;
  public readonly maxLengthHtml: string = maxLengthHtml;
  public readonly maxLengthTs: string = maxLengthTs;
  public readonly sizesHtml: string = sizesHtml;
  public readonly sizesTs: string = sizesTs;
  public readonly variantsHtml: string = variantsHtml;
  public readonly variantsTs: string = variantsTs;
  public readonly disabledHtml: string = disabledHtml;
  public readonly disabledTs: string = disabledTs;
  public readonly readonlyHtml: string = readonlyHtml;
  public readonly readonlyTs: string = readonlyTs;
  public readonly invalidHtml: string = invalidHtml;
  public readonly invalidTs: string = invalidTs;
  public readonly reactiveHtml: string = reactiveHtml;
  public readonly reactiveTs: string = reactiveTs;

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
  ];

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

  public readonly apiRows: readonly ApiPropRow[] = [
    {
      name: 'variant',
      type: "'material' | 'bootstrap' | 'minimal' | null",
      default: 'null',
      description: 'Design variant.',
    },
    { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Component size.' },
    {
      name: 'label',
      type: 'string',
      default: "''",
      description: 'Label text rendered above the textarea.',
    },
    { name: 'placeholder', type: 'string', default: "''", description: 'Placeholder text.' },
    { name: 'rows', type: 'number', default: '3', description: 'Initial visible row count.' },
    {
      name: 'autoResize',
      type: 'boolean',
      default: 'false',
      description: 'Grows the textarea to fit its content.',
    },
    { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables the textarea.' },
    {
      name: 'readonly',
      type: 'boolean',
      default: 'false',
      description: 'Makes the textarea read-only.',
    },
    {
      name: 'invalid',
      type: 'boolean',
      default: 'false',
      description: 'Marks the field as invalid.',
    },
  ];
}
