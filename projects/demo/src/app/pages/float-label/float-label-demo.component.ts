import { CommonModule } from '@angular/common';
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
import { FloatLabelComponent } from 'ui-lib-custom/float-label';
import { UiLibInput } from 'ui-lib-custom/input';
import { Panel } from 'ui-lib-custom/panel';
import { UiLibSelect } from 'ui-lib-custom/select';

import type { ApiPropRow } from '@demo/shared/doc-page/doc-api-reference.component';
import { DocApiReferenceComponent } from '@demo/shared/doc-page/doc-api-reference.component';
import type { AriaRow } from '@demo/shared/doc-page/doc-aria-table.component';
import { DocAriaTableComponent } from '@demo/shared/doc-page/doc-aria-table.component';
import { DocCodeExampleComponent } from '@demo/shared/doc-page/doc-code-example.component';
import type { CssVarRow } from '@demo/shared/doc-page/doc-css-vars-table.component';
import { DocCssVarsTableComponent } from '@demo/shared/doc-page/doc-css-vars-table.component';
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
  basicHtml,
  basicTs,
  invalidHtml,
  invalidTs,
  reactiveHtml,
  reactiveTs,
  selectHtml,
  selectTs,
  textareaHtml,
  textareaTs,
  variantsHtml,
  variantsTs,
} from './snippets.generated';
interface DemoOption {
  label: string;
  value: string;
}

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
    UiLibInput,
    UiLibSelect,
    FloatLabelComponent,
    Button,
    DocPageHeaderComponent,
    DocQualityBadgeComponent,
    DocCodeExampleComponent,
    DocApiReferenceComponent,
    DocSectionComponent,
    DocAriaTableComponent,
    DocKeyboardNavComponent,
    DocCssVarsTableComponent,
  ],
  templateUrl: './float-label-demo.html',
  styleUrl: './float-label-demo.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FloatLabelDemoComponent {
  public readonly basicHtml: string = basicHtml;
  public readonly basicTs: string = basicTs;
  public readonly variantsHtml: string = variantsHtml;
  public readonly variantsTs: string = variantsTs;
  public readonly selectHtml: string = selectHtml;
  public readonly selectTs: string = selectTs;
  public readonly textareaHtml: string = textareaHtml;
  public readonly textareaTs: string = textareaTs;
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
    { id: 'api', label: 'API Reference' },
    { id: 'css-vars', label: 'CSS Custom Properties' },
    { id: 'accessibility', label: 'Accessibility' },
  ];

  public readonly cssVarRows: CssVarRow[] = [
    { variable: '--uilib-float-label-color', description: 'Label text colour in resting state.' },
    { variable: '--uilib-float-label-font-size', description: 'Label font size in resting state.' },
    { variable: '--uilib-float-label-font-weight', description: 'Label font weight.' },
    {
      variable: '--uilib-float-label-position-x',
      description: 'Horizontal offset of the label from the input edge.',
    },
    {
      variable: '--uilib-float-label-position-y',
      description: 'Vertical offset of the label in resting state.',
    },
    {
      variable: '--uilib-float-label-active-font-size',
      description: 'Label font size when floating (active).',
    },
    {
      variable: '--uilib-float-label-active-font-weight',
      description: 'Label font weight when floating (active).',
    },
    { variable: '--uilib-float-label-active-color', description: 'Label colour when floating.' },
    {
      variable: '--uilib-float-label-focus-color',
      description: 'Label colour when the wrapped input is focused.',
    },
    {
      variable: '--uilib-float-label-invalid-color',
      description: 'Label colour when the wrapped input is invalid.',
    },
    {
      variable: '--uilib-float-label-over-active-top',
      description: 'Top offset for the "over" variant when active.',
    },
    {
      variable: '--uilib-float-label-in-active-top',
      description: 'Top offset for the "in" variant when active.',
    },
    {
      variable: '--uilib-float-label-in-input-padding-top',
      description: 'Extra top padding added to the input in "in" variant.',
    },
    {
      variable: '--uilib-float-label-in-input-padding-bottom',
      description: 'Extra bottom padding added to the input in "in" variant.',
    },
    {
      variable: '--uilib-float-label-on-border-radius',
      description: 'Border radius used by the "on" variant label chip.',
    },
    {
      variable: '--uilib-float-label-on-active-background',
      description: 'Background of the "on" variant label chip.',
    },
    {
      variable: '--uilib-float-label-on-active-padding',
      description: 'Padding of the "on" variant label chip.',
    },
    {
      variable: '--uilib-float-label-transition',
      description: 'Transition shorthand. Respects <code>prefers-reduced-motion: reduce</code>.',
    },
  ];

  public scrollTo(id: string): void {
    this.layout()?.scrollToSection(id);
  }

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

  public readonly apiRows: readonly ApiPropRow[] = [
    {
      name: 'variant',
      type: "'over' | 'in' | 'on'",
      default: "'over'",
      description: 'Controls the label animation style.',
    },
  ];

  public readonly ariaRows: readonly AriaRow[] = [
    {
      element: 'Label element',
      attribute: 'for',
      value: '—',
      notes:
        'The <code>&lt;label&gt;</code> is always present in the DOM (only its CSS position changes), and it is associated with the input via <code>for</code>/<code>id</code>. Screen readers read it correctly at all times.',
    },
    {
      element: 'Label element',
      attribute: '(no aria-hidden)',
      value: '—',
      notes:
        'The label is never hidden from assistive technologies — the float animation is purely CSS.',
    },
    {
      element: 'Input (invalid)',
      attribute: 'aria-invalid="true"',
      value: '—',
      notes: 'Applied by the wrapped input component when the field is in an invalid state.',
    },
  ];

  public readonly keyboardRows: KeyboardNavRow[] = [
    { key: 'Tab', action: 'Moves focus into the wrapped input.' },
    { key: 'Shift + Tab', action: 'Moves focus away from the wrapped input.' },
  ];
}
