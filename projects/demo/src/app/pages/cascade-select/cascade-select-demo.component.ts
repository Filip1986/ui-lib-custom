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
import {
  CascadeSelectDropdownIconDirective,
  CascadeSelectFooterDirective,
  CascadeSelectHeaderDirective,
  CascadeSelectLoadingDirective,
  CascadeSelectOptionDirective,
  CascadeSelectOptionGroupIconDirective,
  CascadeSelectValueDirective,
  UiLibCascadeSelect,
} from 'ui-lib-custom/cascade-select';
import { Panel } from 'ui-lib-custom/panel';

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
  CASCADE_SELECT_COUNTRIES,
  type CascadeCity,
  type CascadeCountry,
  type CascadeState,
} from './cascade-select-demo.data';
import {
  basicHtml,
  basicTs,
  clearHtml,
  clearTs,
  clippingHtml,
  clippingTs,
  filledHtml,
  filledTs,
  fluidHtml,
  fluidTs,
  formsHtml,
  formsTs,
  loadingHtml,
  loadingTs,
  reactiveHtml,
  reactiveTs,
  sizesHtml,
  sizesTs,
  statesHtml,
  statesTs,
  templateHtml,
  templateTs,
  variantsHtml,
  variantsTs,
} from './snippets.generated';
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

    DocCssVarsTableComponent,
    DocKeyboardNavComponent,
    DocAriaTableComponent,
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
    date: '2026-05-26',
    tier: 1,
    scores: {
      api: 9,
      a11y: 9,
      perf: 8,
      comp: 9,
      theme: 9,
      dx: 9,
      docs: 9,
      polish: 9,
      angular: 9,
      feel: 9,
    },
    competitiveParity: 'pending',
    apgPattern: { name: 'Combobox', url: 'https://www.w3.org/WAI/ARIA/apg/patterns/combobox/' },
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
    { id: 'api', label: 'API Reference' },
    { id: 'accessibility', label: 'Accessibility' },
    { id: 'css-vars', label: 'CSS Custom Properties' },
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
  public readonly keyboardRows: KeyboardNavRow[] = [
    { key: 'Tab', action: 'Moves focus to the trigger button.' },
    { key: 'Shift+Tab', action: 'Moves focus away from the component.' },
    { key: 'Enter / Space', action: 'Opens the panel or selects the focused option.' },
    { key: '↓', action: 'Moves focus to the next option in the current level.' },
    { key: '↑', action: 'Moves focus to the previous option in the current level.' },
    { key: '→', action: 'Opens the sub-panel for the focused group option.' },
    { key: '←', action: 'Closes the current sub-panel and returns focus to the parent.' },
    { key: 'Escape', action: 'Closes all panels.' },
  ];

  public readonly ariaRows: readonly AriaRow[] = [
    {
      element: 'Host (combobox)',
      attribute: 'role="combobox"',
      value: '—',
      notes: 'Identifies the host element as a combobox to assistive technologies.',
    },
    {
      element: 'Host (combobox)',
      attribute: 'aria-expanded',
      value: '"true" | "false"',
      notes: 'Reflects whether the dropdown panel is open.',
    },
    {
      element: 'Host (combobox)',
      attribute: 'aria-haspopup',
      value: '"listbox"',
      notes: 'Signals that the combobox controls a listbox popup.',
    },
    {
      element: 'Host (combobox)',
      attribute: 'aria-controls',
      value: 'listbox element ID',
      notes: 'Links the combobox to its primary listbox column.',
    },
    {
      element: 'Host (combobox)',
      attribute: 'aria-activedescendant',
      value: 'focused option ID',
      notes: 'Tracks the keyboard-focused option across all visible levels.',
    },
    {
      element: 'Host (combobox)',
      attribute: 'aria-invalid',
      value: '"true"',
      notes: 'Applied when <code>[invalid]="true"</code>.',
    },
    {
      element: 'Host (combobox)',
      attribute: 'aria-disabled',
      value: '"true"',
      notes: 'Applied when <code>[disabled]="true"</code> or <code>[loading]="true"</code>.',
    },
    {
      element: 'Level column',
      attribute: 'role="listbox"',
      value: '—',
      notes: 'Each visible level column is a listbox. The first level is the primary one.',
    },
    {
      element: 'Level column',
      attribute: 'aria-label',
      value: 'parent label or placeholder',
      notes:
        'Identifies the level by the parent option label; falls back to placeholder for level 0.',
    },
    {
      element: 'Option item',
      attribute: 'role="option"',
      value: '—',
      notes: 'Each row in a level column is an option.',
    },
    {
      element: 'Option item',
      attribute: 'aria-selected',
      value: '"true" | "false"',
      notes: 'Indicates the currently selected leaf option.',
    },
    {
      element: 'Group option',
      attribute: 'aria-haspopup',
      value: '"listbox"',
      notes: 'Applied to options that have a child level column.',
    },
    {
      element: 'Group option',
      attribute: 'aria-expanded',
      value: '"true" | "false"',
      notes: 'Reflects whether the child level column is currently visible.',
    },
  ];

  public readonly cssVarRows: CssVarRow[] = [
    { variable: '--uilib-cascade-select-focus-ring-color', description: 'Focus ring colour.' },
    { variable: '--uilib-cascade-select-focus-ring-width', description: 'Focus ring width.' },
    { variable: '--uilib-cascade-select-bg', description: 'Background colour.' },
    { variable: '--uilib-cascade-select-border', description: 'Border shorthand.' },
    { variable: '--uilib-cascade-select-border-focus', description: 'Border shorthand (focus).' },
    { variable: '--uilib-cascade-select-radius', description: 'Border radius.' },
    { variable: '--uilib-cascade-select-text', description: 'Text.' },
    { variable: '--uilib-cascade-select-placeholder', description: 'Placeholder.' },
    { variable: '--uilib-cascade-select-padding-y-base', description: 'Padding Y Base.' },
    { variable: '--uilib-cascade-select-padding-x-base', description: 'Padding X Base.' },
    { variable: '--uilib-cascade-select-padding-y', description: 'Vertical padding.' },
    { variable: '--uilib-cascade-select-padding-x', description: 'Horizontal padding.' },
    { variable: '--uilib-cascade-select-min-height', description: 'Minimum height.' },
    { variable: '--uilib-cascade-select-panel-bg', description: 'Panel background colour.' },
    { variable: '--uilib-cascade-select-panel-border', description: 'Panel border shorthand.' },
    { variable: '--uilib-cascade-select-panel-shadow', description: 'Panel box shadow.' },
    { variable: '--uilib-cascade-select-panel-min-width', description: 'Panel Min width.' },
    { variable: '--uilib-cascade-select-panel-max-height', description: 'Panel Max height.' },
    { variable: '--uilib-cascade-select-panel-z-index', description: 'Panel z-index.' },
    { variable: '--uilib-cascade-select-option-padding', description: 'Option padding.' },
    {
      variable: '--uilib-cascade-select-option-hover-bg',
      description: 'Option Hover background colour.',
    },
    {
      variable: '--uilib-cascade-select-option-selected-bg',
      description: 'Option Selected background colour.',
    },
    {
      variable: '--uilib-cascade-select-option-disabled-opacity',
      description: 'Option Disabled opacity.',
    },
    { variable: '--uilib-cascade-select-submenu-icon-size', description: 'Submenu Icon size.' },
    { variable: '--uilib-cascade-select-submenu-gap', description: 'Submenu gap.' },
    { variable: '--uilib-cascade-select-transition', description: 'Transition.' },
    {
      variable: '--uilib-cascade-select-panel-animation-duration',
      description: 'Panel Animation Duration.',
    },
    {
      variable: '--uilib-cascade-select-level-animation-duration',
      description: 'Level Animation Duration.',
    },
    { variable: '--uilib-cascade-select-loading-size', description: 'Loading size.' },
  ];
}
