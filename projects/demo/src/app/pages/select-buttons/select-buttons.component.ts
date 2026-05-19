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
import { DocTocComponent } from '@demo/shared/doc-page/doc-toc.component';
import { VariantComparisonComponent } from '../../shared/components/variant-comparison/variant-comparison.component';
import { SelectButtonBasicExampleComponent } from '@demo/examples/select-button-basic-example.component';
import { DocQualityBadgeComponent } from '@demo/shared/doc-page/doc-quality-badge.component';
import type { ComponentQualityAudit } from '@demo/shared/doc-page/doc-quality-badge.component';
import { DocCodeExampleComponent } from '@demo/shared/doc-page/doc-code-example.component';

import { Panel } from 'ui-lib-custom/panel';
/**
 * Demo page for select button variants.
 */
@Component({
  selector: 'app-select-buttons',
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
  ],
  templateUrl: './select-buttons.component.html',
  styleUrl: './select-buttons.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectButtonsComponent {
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
    { id: 'api', label: 'API Reference' },
    { id: 'accessibility', label: 'Accessibility' },
  ];

  public readonly snippets: { usage: string; usageTs: string; selectButtonExampleTs: string } = {
    usage: `import { SelectButton } from 'ui-lib-custom';

@Component({
  standalone: true,
  imports: [SelectButton],
  template: \`<ui-lib-select-button [options]="options" [(value)]="value" />\`,
})
export class Example {
  options = [
    { label: 'One', value: 1 },
    { label: 'Two', value: 2 },
  ];
  value = 1;
}`,
    usageTs: `import { Component } from '@angular/core';
import { SelectButton } from 'ui-lib-custom/select-button';
import type { SelectButtonOption } from 'ui-lib-custom/select-button';

@Component({
  standalone: true,
  imports: [SelectButton],
  templateUrl: './my.component.html',
})
export class MyComponent {
  readonly options: SelectButtonOption[] = [
    { label: 'One', value: 1 },
    { label: 'Two', value: 2 },
  ];
  value: number = 1;
}`,
    selectButtonExampleTs: `import { Component } from '@angular/core';
import { SelectButton } from 'ui-lib-custom/select-button';
import type { SelectButtonOption } from 'ui-lib-custom/select-button';

@Component({
  standalone: true,
  imports: [SelectButton],
  templateUrl: './my.component.html',
})
export class MyComponent {
  readonly basicOptions: SelectButtonOption[] = [
    { label: 'One-Way', value: 'one-way' },
    { label: 'Return', value: 'return' },
  ];
  basicValue: string = 'one-way';
}`,
  };

  public readonly selectButtonExample: string = `<ui-lib-select-button [options]="basicOptions" [(value)]="basicValue" />`;

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
}
