import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, viewChild } from '@angular/core';
import type { Signal } from '@angular/core';
import {
  FormsModule,
  ReactiveFormsModule,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import type { DocSection } from '@demo/shared/doc-page/doc-section.model';
import { DocPageHeaderComponent } from '@demo/shared/doc-page/doc-page-header.component';
import { DocPageLayoutComponent } from '@demo/shared/doc-page/doc-page-layout.component';
import { DocTocComponent } from '@demo/shared/doc-page/doc-toc.component';
import { DocDemoViewportComponent } from '@demo/shared/doc-page/doc-demo-viewport.component';
import { Button } from 'ui-lib-custom/button';
import {
  UiLibCascadeSelect,
  CascadeSelectOptionDirective,
  CascadeSelectValueDirective,
  CascadeSelectHeaderDirective,
  CascadeSelectFooterDirective,
  CascadeSelectLoadingDirective,
  CascadeSelectDropdownIconDirective,
  CascadeSelectOptionGroupIconDirective,
} from 'ui-lib-custom/cascade-select';
import {
  CASCADE_SELECT_COUNTRIES,
  type CascadeCountry,
  type CascadeCity,
  type CascadeState,
} from './cascade-select-demo.data';
import { DocQualityBadgeComponent } from '@demo/shared/doc-page/doc-quality-badge.component';
import type { ComponentQualityAudit } from '@demo/shared/doc-page/doc-quality-badge.component';
import { DocCodeExampleComponent } from '@demo/shared/doc-page/doc-code-example.component';

import { Panel } from 'ui-lib-custom/panel';
import { DocApiReferenceComponent } from '@demo/shared/doc-page/doc-api-reference.component';
import type { ApiPropRow } from '@demo/shared/doc-page/doc-api-reference.component';
import {
  basicHtml,
  basicTs,
  templateHtml,
  templateTs,
  loadingHtml,
  loadingTs,
  clearHtml,
  clearTs,
  sizesHtml,
  sizesTs,
  filledHtml,
  filledTs,
  fluidHtml,
  fluidTs,
  statesHtml,
  statesTs,
  formsHtml,
  formsTs,
  reactiveHtml,
  reactiveTs,
  variantsHtml,
  variantsTs,
  clippingHtml,
  clippingTs,
} from './snippets.generated';

import { DocSectionComponent } from '../../shared/doc-page/doc-section.component';
type CascadeNode = CascadeCountry | CascadeState | CascadeCity;

/**
 * Demo page for CascadeSelect component usage patterns.
 */
@Component({
  selector: 'app-cascade-select-demo',
  standalone: true,
  imports: [
    Panel,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DocPageHeaderComponent,
    DocPageLayoutComponent,
    DocTocComponent,
    DocDemoViewportComponent,
    Button,
    UiLibCascadeSelect,
    CascadeSelectOptionDirective,
    CascadeSelectValueDirective,
    CascadeSelectHeaderDirective,
    CascadeSelectFooterDirective,
    CascadeSelectLoadingDirective,
    CascadeSelectDropdownIconDirective,
    CascadeSelectOptionGroupIconDirective,
    DocQualityBadgeComponent,
    DocCodeExampleComponent,
    DocApiReferenceComponent,
    DocSectionComponent,
  ],
  templateUrl: './cascade-select-demo.component.html',
  styleUrl: './cascade-select-demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CascadeSelectDemoComponent {
  public readonly basicHtml: string = basicHtml;
  public readonly basicTs: string = basicTs;
  public readonly templateHtml: string = templateHtml;
  public readonly templateTs: string = templateTs;
  public readonly loadingHtml: string = loadingHtml;
  public readonly loadingTs: string = loadingTs;
  public readonly clearHtml: string = clearHtml;
  public readonly clearTs: string = clearTs;
  public readonly sizesHtml: string = sizesHtml;
  public readonly sizesTs: string = sizesTs;
  public readonly filledHtml: string = filledHtml;
  public readonly filledTs: string = filledTs;
  public readonly fluidHtml: string = fluidHtml;
  public readonly fluidTs: string = fluidTs;
  public readonly statesHtml: string = statesHtml;
  public readonly statesTs: string = statesTs;
  public readonly formsHtml: string = formsHtml;
  public readonly formsTs: string = formsTs;
  public readonly reactiveHtml: string = reactiveHtml;
  public readonly reactiveTs: string = reactiveTs;
  public readonly variantsHtml: string = variantsHtml;
  public readonly variantsTs: string = variantsTs;
  public readonly clippingHtml: string = clippingHtml;
  public readonly clippingTs: string = clippingTs;

  public readonly qualityAudit: ComponentQualityAudit = {
    date: '2026-05-18',
    tier: 1,
    scores: {
      api: 8,
      a11y: 9,
      perf: 8,
      comp: 8,
      theme: 8,
      dx: 8,
      docs: 8,
      polish: 8,
      angular: 9,
      feel: 8,
    },
    competitiveParity: 'pending',
  };

  public readonly importCode: string =
    "import { UiLibCascadeSelect } from 'ui-lib-custom/cascade-select'";

  public readonly layout: Signal<DocPageLayoutComponent | undefined> =
    viewChild(DocPageLayoutComponent);

  public readonly sections: DocSection[] = [
    { id: 'basic', label: 'Basic' },
    { id: 'template', label: 'Template' },
    { id: 'loading', label: 'Loading' },
    { id: 'clear', label: 'Clear Icon' },
    { id: 'sizes', label: 'Sizes' },
    { id: 'filled', label: 'Filled' },
    { id: 'fluid', label: 'Fluid' },
    { id: 'states', label: 'States' },
    { id: 'forms', label: 'Forms' },
    { id: 'reactive-forms', label: 'Reactive Forms' },
    { id: 'variants', label: 'Variants' },
    { id: 'clipping', label: 'Clipping Container' },
  ];

  public scrollTo(id: string): void {
    this.layout()?.scrollToSection(id);
  }

  public readonly countries: CascadeCountry[] = CASCADE_SELECT_COUNTRIES;

  public basicCode: string | null = null;
  public templatedCode: string | null = null;
  public loadingCode: string | null = null;
  public clearableCode: string | null = 'SYD';

  public smallCode: string | null = null;
  public mediumCode: string | null = null;
  public largeCode: string | null = null;

  public filledCode: string | null = null;
  public fluidCode: string | null = null;

  public disabledCode: string | null = 'SYD';
  public invalidCode: string | null = null;

  public templateDrivenCode: string | null = null;

  public readonly reactiveForm: FormGroup = new FormGroup({
    city: new FormControl<string | null>(null, { validators: [Validators.required] }),
  });

  public readonly variantModels: Record<'material' | 'bootstrap' | 'minimal', string | null> = {
    material: null,
    bootstrap: null,
    minimal: null,
  };
  public clippingCode: string | null = null;

  public loading: boolean = true;

  public cityControl(): FormControl<string | null> {
    return this.reactiveForm.controls['city'] as FormControl<string | null>;
  }

  public toggleLoading(): void {
    this.loading = !this.loading;
  }

  public submitTemplateDriven(): void {
    // Submit action is only used to trigger touched/validation display in demo.
  }

  public submitReactive(): void {
    this.reactiveForm.markAllAsTouched();
  }

  public resolveNodeLabel(option: unknown): string {
    const node: CascadeNode = option as CascadeNode;
    if ('cname' in node) {
      return node.cname;
    }
    if ('name' in node) {
      return node.name;
    }
    return '';
  }

  public resolveNodeIcon(option: unknown): string {
    const node: Partial<CascadeNode> = option as Partial<CascadeNode>;
    return node.icon ?? 'pi pi-circle';
  }

  public readonly apiRows: readonly ApiPropRow[] = [
    {
      name: 'options',
      type: 'unknown[]',
      default: '[]',
      description: 'The hierarchical option array.',
    },
    {
      name: 'optionLabel',
      type: 'string',
      default: "'label'",
      description: 'Property name for the display label.',
    },
    {
      name: 'optionValue',
      type: 'string | undefined',
      default: 'undefined',
      description: 'Property name for the value.',
    },
    { name: 'placeholder', type: 'string', default: "'Select'", description: 'Placeholder text.' },
    {
      name: 'variant',
      type: "'material' | 'bootstrap' | 'minimal' | undefined",
      default: 'undefined',
      description: 'Design variant.',
    },
    { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Component size.' },
    { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables the component.' },
    {
      name: 'invalid',
      type: 'boolean',
      default: 'false',
      description: 'Marks the field as invalid.',
    },
    {
      name: 'loading',
      type: 'boolean',
      default: 'false',
      description: 'Shows a loading indicator.',
    },
    { name: 'showClear', type: 'boolean', default: 'false', description: 'Shows a clear button.' },
    {
      name: 'fluid',
      type: 'boolean',
      default: 'false',
      description: 'Makes the component full-width.',
    },
    { name: 'ariaLabel', type: 'string | null', default: 'null', description: 'ARIA label.' },
  ];
}
