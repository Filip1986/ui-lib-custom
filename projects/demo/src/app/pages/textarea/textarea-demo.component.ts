import type { Signal } from '@angular/core';
import { ChangeDetectionStrategy, Component, viewChild } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { Button } from 'ui-lib-custom/button';
import { Panel } from 'ui-lib-custom/panel';
import type { TextareaChangeEvent } from 'ui-lib-custom/textarea';
import { UiLibTextarea } from 'ui-lib-custom/textarea';

import type { ApiPropRow } from '@demo/shared/doc-page/doc-api-reference.component';
import { DocApiReferenceComponent } from '@demo/shared/doc-page/doc-api-reference.component';
import type { AriaRow } from '@demo/shared/doc-page/doc-aria-table.component';
import { DocAriaTableComponent } from '@demo/shared/doc-page/doc-aria-table.component';
import { DocCodeExampleComponent } from '@demo/shared/doc-page/doc-code-example.component';
import type { CssVarRow } from '@demo/shared/doc-page/doc-css-vars-table.component';
import { DocCssVarsTableComponent } from '@demo/shared/doc-page/doc-css-vars-table.component';
import { DocDemoViewportComponent } from '@demo/shared/doc-page/doc-demo-viewport.component';
import type { KeyboardNavRow } from '@demo/shared/doc-page/doc-keyboard-nav.component';
import { DocKeyboardNavComponent } from '@demo/shared/doc-page/doc-keyboard-nav.component';
import { DocPageHeaderComponent } from '@demo/shared/doc-page/doc-page-header.component';
import { DocPageLayoutComponent } from '@demo/shared/doc-page/doc-page-layout.component';
import type { ComponentQualityAudit } from '@demo/shared/doc-page/doc-quality-badge.component';
import { DocQualityBadgeComponent } from '@demo/shared/doc-page/doc-quality-badge.component';
import { DocSectionComponent } from '@demo/shared/doc-page/doc-section.component';
import type { DocSection } from '@demo/shared/doc-page/doc-section.model';
import { DocTocComponent } from '@demo/shared/doc-page/doc-toc.component';

import {
  autoResizeHtml,
  autoResizeTs,
  basicHtml,
  basicTs,
  counterHtml,
  counterTs,
  disabledHtml,
  disabledTs,
  invalidHtml,
  invalidTs,
  maxLengthHtml,
  maxLengthTs,
  reactiveHtml,
  reactiveTs,
  readonlyHtml,
  readonlyTs,
  sizesHtml,
  sizesTs,
  variantsHtml,
  variantsTs,
} from './snippets.generated';
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

    DocCssVarsTableComponent,
    DocKeyboardNavComponent,
    DocAriaTableComponent,
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
    { id: 'api', label: 'API Reference' },
    { id: 'accessibility', label: 'Accessibility' },
    { id: 'css-vars', label: 'CSS Custom Properties' },
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
  public readonly keyboardRows: KeyboardNavRow[] = [
    { key: 'Tab', action: 'Moves focus to the textarea.' },
    { key: 'Shift+Tab', action: 'Moves focus away from the textarea.' },
    { key: 'Type', action: 'Updates the textarea value.' },
  ];

  public readonly ariaRows: readonly AriaRow[] = [
    {
      element: 'Native textarea',
      attribute: 'aria-invalid',
      value: '"true"',
      notes:
        'Applied when <code>[invalid]="true"</code> or an <code>[error]</code> message is provided.',
    },
    {
      element: 'Native textarea',
      attribute: 'aria-required',
      value: '"true"',
      notes: 'Applied when <code>[required]="true"</code>.',
    },
    {
      element: 'Native textarea',
      attribute: 'aria-disabled',
      value: '"true"',
      notes: 'Applied when <code>[disabled]="true"</code>.',
    },
    {
      element: 'Native textarea',
      attribute: 'aria-readonly',
      value: '"true"',
      notes: 'Applied when <code>[readonly]="true"</code>.',
    },
    {
      element: 'Native textarea',
      attribute: 'aria-describedby',
      value: 'hint/error element IDs',
      notes: 'Links the textarea to <code>hint</code> and/or <code>error</code> message elements.',
    },
    {
      element: 'Error message',
      attribute: 'role="alert"',
      value: '—',
      notes: 'Error messages are immediately announced to screen readers.',
    },
  ];

  public readonly cssVarRows: CssVarRow[] = [
    { variable: '--uilib-textarea-bg', description: 'Background colour.' },
    { variable: '--uilib-textarea-border', description: 'Border shorthand.' },
    { variable: '--uilib-textarea-border-focus', description: 'Border shorthand (focus).' },
    { variable: '--uilib-textarea-border-error', description: 'Border shorthand (error).' },
    { variable: '--uilib-textarea-text', description: 'Text.' },
    { variable: '--uilib-textarea-placeholder', description: 'Placeholder.' },
    { variable: '--uilib-textarea-label-color', description: 'Label colour.' },
    { variable: '--uilib-textarea-required-color', description: 'Required text colour.' },
    { variable: '--uilib-textarea-error-color', description: 'Error text colour.' },
    { variable: '--uilib-textarea-hint-color', description: 'Hint text colour.' },
    { variable: '--uilib-textarea-counter-color', description: 'Counter text colour.' },
    { variable: '--uilib-textarea-resize-color', description: 'Resize text colour.' },
    { variable: '--uilib-textarea-radius', description: 'Border radius.' },
    { variable: '--uilib-textarea-disabled-opacity', description: 'Disabled opacity.' },
    { variable: '--uilib-textarea-padding-x', description: 'Horizontal padding.' },
    { variable: '--uilib-textarea-padding-y', description: 'Vertical padding.' },
    { variable: '--uilib-textarea-font-size', description: 'Font size.' },
  ];
}
