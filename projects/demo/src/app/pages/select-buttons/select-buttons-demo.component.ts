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
import { SelectButton } from 'ui-lib-custom/select-button';
import type {
  SelectButtonOption,
  SelectButtonSize,
  SelectButtonVariant,
} from 'ui-lib-custom/select-button';
import { Button } from 'ui-lib-custom/button';
import { Grid, Inline, Stack } from 'ui-lib-custom/layout';
import { Icon } from 'ui-lib-custom/icon';
import { DocPageHeaderComponent } from '@demo/shared/doc-page/doc-page-header.component';
import { DocPageLayoutComponent } from '@demo/shared/doc-page/doc-page-layout.component';
import type { DocSection } from '@demo/shared/doc-page/doc-section.model';
import { DocSectionComponent } from '@demo/shared/doc-page/doc-section.component';
import { DocTocComponent } from '@demo/shared/doc-page/doc-toc.component';
import { VariantComparisonComponent } from '@demo/shared/components/variant-comparison/variant-comparison.component';
import { SelectButtonBasicExampleComponent } from '@demo/examples/select-button-basic-example.component';
import { DocQualityBadgeComponent } from '@demo/shared/doc-page/doc-quality-badge.component';
import type { ComponentQualityAudit } from '@demo/shared/doc-page/doc-quality-badge.component';
import { DocCodeExampleComponent } from '@demo/shared/doc-page/doc-code-example.component';

import { Panel } from 'ui-lib-custom/panel';
import { selectButtonExampleHtml, selectButtonExampleTs } from './snippets.generated';
import { DocCssVarsTableComponent } from '@demo/shared/doc-page/doc-css-vars-table.component';
import type { CssVarRow } from '@demo/shared/doc-page/doc-css-vars-table.component';
import { DocApiReferenceComponent } from '@demo/shared/doc-page/doc-api-reference.component';
import type { ApiPropRow } from '@demo/shared/doc-page/doc-api-reference.component';
import { DocAriaTableComponent } from '@demo/shared/doc-page/doc-aria-table.component';
import type { AriaRow } from '@demo/shared/doc-page/doc-aria-table.component';
/**
 * Demo page for select button variants.
 */
@Component({
  selector: 'app-select-buttons-demo',
  standalone: true,
  imports: [
    Panel,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SelectButton,
    Icon,
    Button,
    Stack,
    Inline,
    Grid,
    DocPageHeaderComponent,
    DocPageLayoutComponent,
    DocTocComponent,
    VariantComparisonComponent,
    SelectButtonBasicExampleComponent,
    DocQualityBadgeComponent,
    DocCodeExampleComponent,
    DocSectionComponent,
    DocAriaTableComponent,
    DocCssVarsTableComponent,
    DocApiReferenceComponent,
  ],
  templateUrl: './select-buttons-demo.component.html',
  styleUrl: './select-buttons-demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectButtonsDemoComponent {
  public readonly selectButtonExampleHtml: string = selectButtonExampleHtml;
  public readonly selectButtonExampleTs: string = selectButtonExampleTs;

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

  public readonly importCode: string = "import { SelectButton } from 'ui-lib-custom/select-button'";

  public readonly sections: DocSection[] = [
    { id: 'basic', label: 'Basic' },
    { id: 'multiple', label: 'Multiple' },
    { id: 'custom-template', label: 'Custom Template' },
    { id: 'sizes', label: 'Sizes' },
    { id: 'fluid', label: 'Fluid' },
    { id: 'disabled', label: 'Disabled' },
    { id: 'invalid', label: 'Invalid' },
    { id: 'variants', label: 'Variants' },
    { id: 'forms', label: 'Forms' },
    { id: 'css-vars', label: 'CSS Custom Properties' },
    { id: 'api', label: 'API Reference' },
    { id: 'accessibility', label: 'Accessibility' },
  ];

  // Basic
  public readonly basicOptions: SelectButtonOption[] = [
    { label: 'One-Way', value: 'one-way' },
    { label: 'Return', value: 'return' },
  ];
  public basicValue: string = 'one-way';

  // Multiple
  public readonly multipleOptions: SelectButtonOption[] = [
    { label: 'Option 1', value: 1 },
    { label: 'Option 2', value: 2 },
    { label: 'Option 3', value: 3 },
  ];
  public multipleValue: number[] = [1, 2];

  // With icons
  public readonly justifyOptions: SelectButtonOption[] = [
    { label: 'Left', icon: 'align-left', value: 'left' },
    { label: 'Center', icon: 'align-center', value: 'center' },
    { label: 'Right', icon: 'align-right', value: 'right' },
    { label: 'Justify', icon: 'align-justify', value: 'justify' },
  ];
  public justifyValue: string = 'left';

  // Sizes
  public readonly sizeOptions: SelectButtonOption[] = [
    { label: 'Small', value: 'sm' },
    { label: 'Medium', value: 'md' },
    { label: 'Large', value: 'lg' },
  ];
  public sizeValue: string = 'md';

  // Fluid
  public readonly fluidOptions: SelectButtonOption[] = [
    { label: 'Monthly', value: 'monthly' },
    { label: 'Yearly', value: 'yearly' },
  ];
  public fluidValue: string = 'monthly';

  // Disabled
  public readonly disabledOptions: SelectButtonOption[] = [
    { label: 'Enabled', value: 'enabled' },
    { label: 'Disabled', value: 'disabled', disabled: true },
  ];
  public disabledValue: string = 'enabled';

  // Invalid
  public readonly invalidOptions: SelectButtonOption[] = [
    { label: 'Option A', value: 'a' },
    { label: 'Option B', value: 'b' },
  ];
  public invalidValue: string | null = null;
  public invalidTouched: boolean = false;

  // Variants
  public readonly variantOptions: SelectButtonOption[] = [
    { label: 'Daily', value: 'daily' },
    { label: 'Weekly', value: 'weekly' },
    { label: 'Monthly', value: 'monthly' },
  ];
  public materialValue: string = 'daily';
  public bootstrapValue: string = 'daily';
  public minimalValue: string = 'daily';

  // Forms
  public readonly form: FormGroup<{ selection: FormControl<string | null> }> = new FormGroup({
    selection: new FormControl<string | null>('opt1', {
      validators: [Validators.required],
      nonNullable: false,
    }),
  });
  public templateValue: string | null = 'opt1';
  public readonly formOptions: SelectButtonOption[] = [
    { label: 'Opt 1', value: 'opt1' },
    { label: 'Opt 2', value: 'opt2' },
    { label: 'Opt 3', value: 'opt3' },
  ];

  public readonly sizes: SelectButtonSize[] = ['sm', 'md', 'lg'];
  public readonly variants: SelectButtonVariant[] = ['material', 'bootstrap', 'minimal'];

  public markInvalidTouched(): void {
    this.invalidTouched = true;
  }

  public readonly ariaRows: readonly AriaRow[] = [
    {
      element: 'Button group',
      attribute: 'role',
      value: '"group"',
      notes: 'The container is announced as a group of related buttons.',
    },
    {
      element: 'Button group',
      attribute: 'aria-label',
      value: 'string',
      notes: 'Set via <code>[ariaLabel]</code> to name the group for screen readers.',
    },
    {
      element: 'Option button',
      attribute: 'aria-pressed',
      value: '"true" | "false"',
      notes: 'Reflects whether the option is currently selected.',
    },
    {
      element: 'Disabled button',
      attribute: 'aria-disabled',
      value: '"true"',
      notes: 'Marks non-interactive options.',
    },
  ];

  public readonly apiInputRows: readonly ApiPropRow[] = [
    {
      name: 'options',
      type: 'SelectButtonOption[]',
      default: '[]',
      description: 'Options to render.',
    },
    {
      name: 'value',
      type: 'any | any[] | null',
      default: 'null',
      description: 'Selected value(s).',
    },
    { name: 'multiple', type: 'boolean', default: 'false', description: 'Enable multi-select.' },
    {
      name: 'variant',
      type: "'material' | 'bootstrap' | 'minimal'",
      default: "'material'",
      description: 'Visual variant.',
    },
    { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Size preset.' },
    { name: 'disabled', type: 'boolean', default: 'false', description: 'Disable interaction.' },
    { name: 'invalid', type: 'boolean', default: 'false', description: 'Invalid state.' },
  ];

  public readonly apiOutputRows: readonly ApiPropRow[] = [
    {
      name: 'onChange',
      type: 'SelectButtonChangeEvent',
      description: 'Emits when selection changes.',
    },
  ];

  public readonly cssVarRows: CssVarRow[] = [
    { variable: '--uilib-select-button-gap-resolved', description: 'Gap Resolved.' },
    {
      variable: '--uilib-select-button-border-radius-resolved',
      description: 'Border Radius Resolved.',
    },
    { variable: '--uilib-select-button-bg-resolved', description: 'Bg Resolved.' },
    { variable: '--uilib-select-button-border-resolved', description: 'Border Resolved.' },
    {
      variable: '--uilib-select-button-selected-bg-resolved',
      description: 'Selected Bg Resolved.',
    },
    {
      variable: '--uilib-select-button-selected-fg-resolved',
      description: 'Selected Fg Resolved.',
    },
    { variable: '--uilib-select-button-hover-bg-resolved', description: 'Hover Bg Resolved.' },
    { variable: '--uilib-select-button-shadow-resolved', description: 'Shadow Resolved.' },
    {
      variable: '--uilib-select-button-disabled-opacity-resolved',
      description: 'Disabled Opacity Resolved.',
    },
    {
      variable: '--uilib-select-button-invalid-border-resolved',
      description: 'Invalid Border Resolved.',
    },
    { variable: '--uilib-select-button-padding-y-base', description: 'Padding Y Base.' },
    { variable: '--uilib-select-button-padding-x-base', description: 'Padding X Base.' },
    { variable: '--uilib-select-button-padding-resolved', description: 'Padding Resolved.' },
    { variable: '--uilib-select-button-font-size-resolved', description: 'Font Size Resolved.' },
    { variable: '--uilib-select-button-min-height-resolved', description: 'Min Height Resolved.' },
    { variable: '--uilib-button-padding', description: 'Uilib Button padding.' },
    { variable: '--uilib-button-font-size', description: 'Uilib Button Font size.' },
    { variable: '--uilib-button-bg', description: 'Uilib Button background colour.' },
    { variable: '--uilib-button-border', description: 'Uilib Button border shorthand.' },
    { variable: '--uilib-button-fg', description: 'Uilib Button Fg.' },
    { variable: '--uilib-button-bg-hover', description: 'Uilib Button background colour (hover).' },
    { variable: '--uilib-select-button-material-bg', description: 'Material background colour.' },
    {
      variable: '--uilib-select-button-material-hover-bg',
      description: 'Material Hover background colour.',
    },
    {
      variable: '--uilib-select-button-material-border',
      description: 'Material border shorthand.',
    },
    {
      variable: '--uilib-select-button-material-selected-bg',
      description: 'Material Selected background colour.',
    },
    {
      variable: '--uilib-select-button-material-selected-fg',
      description: 'Material Selected Fg.',
    },
    { variable: '--uilib-select-button-bootstrap-bg', description: 'Bootstrap background colour.' },
    {
      variable: '--uilib-select-button-bootstrap-hover-bg',
      description: 'Bootstrap Hover background colour.',
    },
    {
      variable: '--uilib-select-button-bootstrap-border',
      description: 'Bootstrap border shorthand.',
    },
    {
      variable: '--uilib-select-button-bootstrap-selected-bg',
      description: 'Bootstrap Selected background colour.',
    },
    {
      variable: '--uilib-select-button-bootstrap-selected-fg',
      description: 'Bootstrap Selected Fg.',
    },
    { variable: '--uilib-select-button-minimal-bg', description: 'Minimal background colour.' },
    {
      variable: '--uilib-select-button-minimal-hover-bg',
      description: 'Minimal Hover background colour.',
    },
    { variable: '--uilib-select-button-minimal-border', description: 'Minimal border shorthand.' },
    {
      variable: '--uilib-select-button-minimal-selected-bg',
      description: 'Minimal Selected background colour.',
    },
    { variable: '--uilib-select-button-minimal-selected-fg', description: 'Minimal Selected Fg.' },
    { variable: '--uilib-select-button-fg', description: 'Fg.' },
    { variable: '--uilib-select-button-invalid-border', description: 'Invalid border shorthand.' },
  ];
}
