import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  FormsModule,
  ReactiveFormsModule,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import type { DocSection } from '@demo/shared/doc-page/doc-section.model';
import { DocPageLayoutComponent } from '@demo/shared/doc-page/doc-page-layout.component';
import { DocDemoViewportComponent } from '@demo/shared/doc-page/doc-demo-viewport.component';
import { CodePreviewComponent } from '@demo/shared/components/code-preview/code-preview.component';
import { Card } from 'ui-lib-custom/card';
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

type CascadeSelectDemoSnippetKey =
  | 'basic'
  | 'template'
  | 'loading'
  | 'clear'
  | 'sizes'
  | 'filled'
  | 'fluid'
  | 'states'
  | 'forms'
  | 'reactive'
  | 'variants'
  | 'clipping';

type CascadeNode = CascadeCountry | CascadeState | CascadeCity;

/**
 * Demo page for CascadeSelect component usage patterns.
 */
@Component({
  selector: 'app-cascade-select-demo',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DocPageLayoutComponent,
    DocDemoViewportComponent,
    CodePreviewComponent,
    Card,
    Button,
    UiLibCascadeSelect,
    CascadeSelectOptionDirective,
    CascadeSelectValueDirective,
    CascadeSelectHeaderDirective,
    CascadeSelectFooterDirective,
    CascadeSelectLoadingDirective,
    CascadeSelectDropdownIconDirective,
    CascadeSelectOptionGroupIconDirective,
  ],
  templateUrl: './cascade-select-demo.component.html',
  styleUrl: './cascade-select-demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CascadeSelectDemoComponent {
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

  public readonly snippets: Record<CascadeSelectDemoSnippetKey, string> = {
    basic: `<ui-lib-cascade-select
  [(ngModel)]="cityCode"
  [options]="countries"
  optionGroupLabel="name"
  [optionGroupChildren]="['states', 'cities']"
  optionLabel="cname"
  optionValue="code"
  placeholder="Select city"
/>`,
    template: `<ui-lib-cascade-select
  [(ngModel)]="templatedCode"
  [options]="countries"
  optionGroupLabel="name"
  [optionGroupChildren]="['states', 'cities']"
  optionLabel="cname"
  optionValue="code"
>
  <ng-template uiCascadeSelectOption let-option>
    <i [class]="resolveNodeIcon(option)"></i>
    <span>{{ resolveNodeLabel(option) }}</span>
  </ng-template>
</ui-lib-cascade-select>`,
    loading: `<ui-lib-cascade-select
  [(ngModel)]="loadingCode"
  [options]="countries"
  [loading]="loading"
  optionGroupLabel="name"
  [optionGroupChildren]="['states', 'cities']"
  optionLabel="cname"
  optionValue="code"
/>`,
    clear: `<ui-lib-cascade-select
  [(ngModel)]="clearableCode"
  [options]="countries"
  [showClear]="true"
  optionGroupLabel="name"
  [optionGroupChildren]="['states', 'cities']"
  optionLabel="cname"
  optionValue="code"
/>`,
    sizes: `<ui-lib-cascade-select size="sm" />
<ui-lib-cascade-select size="md" />
<ui-lib-cascade-select size="lg" />`,
    filled: `<ui-lib-cascade-select [filled]="true" />`,
    fluid: `<ui-lib-cascade-select [fluid]="true" />`,
    states: `<ui-lib-cascade-select [disabled]="true" />
<ui-lib-cascade-select [invalid]="true" />`,
    forms: `<form #f="ngForm">
  <ui-lib-cascade-select
    name="city"
    required
    [(ngModel)]="templateDrivenCode"
    #cityModel="ngModel"
    [invalid]="cityModel.invalid && cityModel.touched"
    [options]="countries"
    optionGroupLabel="name"
    [optionGroupChildren]="['states', 'cities']"
    optionLabel="cname"
    optionValue="code"
  />
</form>`,
    reactive: `<form [formGroup]="reactiveForm">
  <ui-lib-cascade-select
    formControlName="city"
    [invalid]="cityControl().invalid && cityControl().touched"
    [options]="countries"
    optionGroupLabel="name"
    [optionGroupChildren]="['states', 'cities']"
    optionLabel="cname"
    optionValue="code"
  />
</form>`,
    variants: `<ui-lib-cascade-select variant="material" />
<ui-lib-cascade-select variant="bootstrap" />
<ui-lib-cascade-select variant="minimal" />`,
    clipping: `<div class="clipping-card">
  <ui-lib-cascade-select
    [(ngModel)]="clippingCode"
    [options]="countries"
    optionGroupLabel="name"
    [optionGroupChildren]="['states', 'cities']"
    optionLabel="cname"
    optionValue="code"
    placeholder="Open inside clipped card"
  />
</div>`,
  };

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

  public snippet(key: CascadeSelectDemoSnippetKey): string {
    return this.snippets[key];
  }

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
}
