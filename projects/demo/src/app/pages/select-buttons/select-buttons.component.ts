import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  Button,
  Card,
  Grid,
  Icon,
  Inline,
  SelectButton,
  SelectButtonOption,
  SelectButtonSize,
  SelectButtonVariant,
  Stack,
} from 'ui-lib-custom';
import { DocPageLayoutComponent } from '@demo/shared/doc-page/doc-page-layout.component';
import { DocSection } from '@demo/shared/doc-page/doc-section.model';
import { CodePreviewComponent } from '../../shared/components/code-preview/code-preview.component';
import { VariantComparisonComponent } from '../../shared/components/variant-comparison/variant-comparison.component';

@Component({
  selector: 'app-select-buttons',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SelectButton,
    Icon,
    Button,
    Card,
    Stack,
    Inline,
    Grid,
    DocPageLayoutComponent,
    CodePreviewComponent,
    VariantComparisonComponent,
  ],
  templateUrl: './select-buttons.component.html',
  styleUrl: './select-buttons.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectButtonsComponent {
  readonly sections: DocSection[] = [
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

  readonly snippets: { usage: string } = {
    usage: `import { SelectButton } from 'ui-lib-custom';

@Component({
  standalone: true,
  imports: [SelectButton],
  template: \`<ui-lib-select-button [options]=\"options\" [(value)]=\"value\" />\`,
})
export class Example {
  options = [
    { label: 'One', value: 1 },
    { label: 'Two', value: 2 },
  ];
  value = 1;
}`,
  };

  readonly selectButtonExample = `<ui-lib-select-button [options]="basicOptions" [(value)]="basicValue" />`;

  // Basic
  basicOptions: SelectButtonOption[] = [
    { label: 'One-Way', value: 'one-way' },
    { label: 'Return', value: 'return' },
  ];
  basicValue: string = 'one-way';

  // Multiple
  multipleOptions: SelectButtonOption[] = [
    { label: 'Option 1', value: 1 },
    { label: 'Option 2', value: 2 },
    { label: 'Option 3', value: 3 },
  ];
  multipleValue: number[] = [1, 2];

  // With icons
  justifyOptions: SelectButtonOption[] = [
    { label: 'Left', icon: 'align-left', value: 'left' },
    { label: 'Center', icon: 'align-center', value: 'center' },
    { label: 'Right', icon: 'align-right', value: 'right' },
    { label: 'Justify', icon: 'align-justify', value: 'justify' },
  ];
  justifyValue: string = 'left';

  // Sizes
  sizeOptions: SelectButtonOption[] = [
    { label: 'Small', value: 'sm' },
    { label: 'Medium', value: 'md' },
    { label: 'Large', value: 'lg' },
  ];
  sizeValue: string = 'md';

  // Fluid
  fluidOptions: SelectButtonOption[] = [
    { label: 'Monthly', value: 'monthly' },
    { label: 'Yearly', value: 'yearly' },
  ];
  fluidValue: string = 'monthly';

  // Disabled
  disabledOptions: SelectButtonOption[] = [
    { label: 'Enabled', value: 'enabled' },
    { label: 'Disabled', value: 'disabled', disabled: true },
  ];
  disabledValue: string = 'enabled';

  // Invalid
  invalidOptions: SelectButtonOption[] = [
    { label: 'Option A', value: 'a' },
    { label: 'Option B', value: 'b' },
  ];
  invalidValue: string | null = null;
  invalidTouched: boolean = false;

  // Variants
  variantOptions: SelectButtonOption[] = [
    { label: 'Daily', value: 'daily' },
    { label: 'Weekly', value: 'weekly' },
    { label: 'Monthly', value: 'monthly' },
  ];
  materialValue: string = 'daily';
  bootstrapValue: string = 'daily';
  minimalValue: string = 'daily';

  // Forms
  form: FormGroup<{ selection: FormControl<string | null> }> = new FormGroup({
    selection: new FormControl<string | null>('opt1', {
      validators: [Validators.required],
      nonNullable: false,
    }),
  });
  templateValue: string | null = 'opt1';
  formOptions: SelectButtonOption[] = [
    { label: 'Opt 1', value: 'opt1' },
    { label: 'Opt 2', value: 'opt2' },
    { label: 'Opt 3', value: 'opt3' },
  ];

  sizes: SelectButtonSize[] = ['small', 'medium', 'large'];
  variants: SelectButtonVariant[] = ['material', 'bootstrap', 'minimal'];

  markInvalidTouched(): void {
    this.invalidTouched = true;
  }
}
