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
import { DocPageHeaderComponent } from '@demo/shared/doc-page/doc-page-header.component';
import { DocQualityBadgeComponent } from '@demo/shared/doc-page/doc-quality-badge.component';
import type { ComponentQualityAudit } from '@demo/shared/doc-page/doc-quality-badge.component';
import { DocCodeExampleComponent } from '@demo/shared/doc-page/doc-code-example.component';
import { UiLibInput } from 'ui-lib-custom/input';
import { Button } from 'ui-lib-custom/button';
import { UiLibSelect } from 'ui-lib-custom/select';
import { FloatLabelComponent } from 'ui-lib-custom/float-label';

import { Panel } from 'ui-lib-custom/panel';
import { DocApiReferenceComponent } from '@demo/shared/doc-page/doc-api-reference.component';
import type { ApiPropRow } from '@demo/shared/doc-page/doc-api-reference.component';
import {
  basicHtml,
  basicTs,
  variantsHtml,
  variantsTs,
  selectHtml,
  selectTs,
  textareaHtml,
  textareaTs,
  invalidHtml,
  invalidTs,
  reactiveHtml,
  reactiveTs,
} from './snippets.generated';
import { DocSectionComponent } from '@demo/shared/doc-page/doc-section.component';
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
}
