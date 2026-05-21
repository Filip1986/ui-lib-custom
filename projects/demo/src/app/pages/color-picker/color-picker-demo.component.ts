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
import { DocPageHeaderComponent } from '@demo/shared/doc-page/doc-page-header.component';
import { DocPageLayoutComponent } from '@demo/shared/doc-page/doc-page-layout.component';
import { DocTocComponent } from '@demo/shared/doc-page/doc-toc.component';
import { DocDemoViewportComponent } from '@demo/shared/doc-page/doc-demo-viewport.component';
import { Button } from 'ui-lib-custom/button';
import { ColorPicker } from 'ui-lib-custom';
import type { ColorPickerValue, HsbColor, RgbColor } from 'ui-lib-custom';
import { DocQualityBadgeComponent } from '@demo/shared/doc-page/doc-quality-badge.component';
import type { ComponentQualityAudit } from '@demo/shared/doc-page/doc-quality-badge.component';
import { DocCodeExampleComponent } from '@demo/shared/doc-page/doc-code-example.component';

import { Panel } from 'ui-lib-custom/panel';
import { DocApiReferenceComponent } from '@demo/shared/doc-page/doc-api-reference.component';
import type { ApiPropRow } from '@demo/shared/doc-page/doc-api-reference.component';
import {
  basicHtml,
  basicTs,
  inlineHtml,
  inlineTs,
  formatsHtml,
  formatsTs,
  templateDrivenHtml,
  templateDrivenTs,
  reactiveHtml,
  reactiveTs,
  disabledHtml,
  disabledTs,
  variantsHtml,
  variantsTs,
  clippingHtml,
  clippingTs,
} from './snippets.generated';

import { DocSectionComponent } from '@demo/shared/doc-page/doc-section.component';
import { DocCssVarsTableComponent } from '@demo/shared/doc-page/doc-css-vars-table.component';
import type { CssVarRow } from '@demo/shared/doc-page/doc-css-vars-table.component';
import { DocKeyboardNavComponent } from '@demo/shared/doc-page/doc-keyboard-nav.component';
import type { KeyboardNavRow } from '@demo/shared/doc-page/doc-keyboard-nav.component';
import { DocAriaTableComponent } from '@demo/shared/doc-page/doc-aria-table.component';
import type { AriaRow } from '@demo/shared/doc-page/doc-aria-table.component';
/**
 * Demo page for ColorPicker component usage and forms integration.
 */
@Component({
  selector: 'app-color-picker-demo',
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
    ColorPicker,
    DocQualityBadgeComponent,
    DocCodeExampleComponent,
    DocApiReferenceComponent,
    DocSectionComponent,

    DocCssVarsTableComponent,
    DocKeyboardNavComponent,
    DocAriaTableComponent,
  ],
  templateUrl: './color-picker-demo.component.html',
  styleUrl: './color-picker-demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ColorPickerDemoComponent {
  public readonly basicHtml: string = basicHtml;
  public readonly basicTs: string = basicTs;
  public readonly inlineHtml: string = inlineHtml;
  public readonly inlineTs: string = inlineTs;
  public readonly formatsHtml: string = formatsHtml;
  public readonly formatsTs: string = formatsTs;
  public readonly templateDrivenHtml: string = templateDrivenHtml;
  public readonly templateDrivenTs: string = templateDrivenTs;
  public readonly reactiveHtml: string = reactiveHtml;
  public readonly reactiveTs: string = reactiveTs;
  public readonly disabledHtml: string = disabledHtml;
  public readonly disabledTs: string = disabledTs;
  public readonly variantsHtml: string = variantsHtml;
  public readonly variantsTs: string = variantsTs;
  public readonly clippingHtml: string = clippingHtml;
  public readonly clippingTs: string = clippingTs;

  public readonly importCode: string = "import { ColorPicker } from 'ui-lib-custom'";

  public readonly layout: Signal<DocPageLayoutComponent | undefined> =
    viewChild(DocPageLayoutComponent);

  public readonly sections: DocSection[] = [
    { id: 'basic', label: 'Basic' },
    { id: 'inline', label: 'Inline' },
    { id: 'formats', label: 'Formats' },
    { id: 'template-driven', label: 'Template-Driven Form' },
    { id: 'reactive', label: 'Reactive Form' },
    { id: 'disabled', label: 'Disabled' },
    { id: 'variants', label: 'Variants' },
    { id: 'clipping', label: 'Clipping Container' },
    { id: 'api', label: 'API Reference' },
    { id: 'accessibility', label: 'Accessibility' },
    { id: 'css-vars', label: 'CSS Custom Properties' },
  ];

  public scrollTo(id: string): void {
    this.layout()?.scrollToSection(id);
  }

  public basicHex: string = '6466f1';
  public inlineHex: string = '3b82f6';

  public hexValue: string = '6466f1';
  public rgbValue: RgbColor = { r: 100, g: 102, b: 241 };
  public hsbValue: HsbColor = { h: 239, s: 59, b: 95 };

  public templateDrivenValue: string = '22c55e';
  public templateDrivenSubmittedValue: ColorPickerValue | null = null;

  public readonly reactiveForm: FormGroup<{ color: FormControl<string | null> }> = new FormGroup({
    color: new FormControl<string | null>('0ea5e9', {
      validators: [Validators.required],
      nonNullable: false,
    }),
  });
  public reactiveSubmittedValue: ColorPickerValue | null = null;

  public disabledValue: string = 'ef4444';

  public readonly variantValues: {
    material: string;
    bootstrap: string;
    minimal: string;
  } = {
    material: 'a855f7',
    bootstrap: 'f97316',
    minimal: '14b8a6',
  };
  public clippingValue: string = '6366f1';

  public submitTemplateDriven(): void {
    this.templateDrivenSubmittedValue = this.templateDrivenValue;
  }

  public submitReactive(): void {
    this.reactiveForm.markAllAsTouched();
    this.reactiveSubmittedValue = this.reactiveForm.controls.color.value;
  }

  public displayHexValue(value: string | null): string {
    if (!value) {
      return 'n/a';
    }
    return `#${value}`;
  }

  public displaySubmittedValue(value: ColorPickerValue | null): string {
    if (typeof value === 'string' || value === null) {
      return this.displayHexValue(value);
    }

    if ('r' in value) {
      return this.displayRgbValue(value as RgbColor);
    }

    return this.displayHsbValue(value as HsbColor);
  }

  public displayRgbValue(value: RgbColor): string {
    return `RGB r:${value.r} g:${value.g} b:${value.b}`;
  }

  public displayHsbValue(value: HsbColor): string {
    return `HSB h:${value.h} s:${value.s} b:${value.b}`;
  }
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

  public readonly apiRows: readonly ApiPropRow[] = [
    {
      name: 'format',
      type: "'hex' | 'rgb' | 'hsb'",
      default: "'hex'",
      description: 'Color output format.',
    },
    {
      name: 'inline',
      type: 'boolean',
      default: 'false',
      description: 'Renders the picker inline instead of as a dropdown.',
    },
    {
      name: 'variant',
      type: "'material' | 'bootstrap' | 'minimal' | null",
      default: 'null',
      description: 'Design variant.',
    },
    {
      name: 'disabled',
      type: 'boolean',
      default: 'false',
      description: 'Disables the color picker.',
    },
    { name: 'inputId', type: 'string', default: "''", description: 'Id of the trigger element.' },
    { name: 'tabindex', type: 'number', default: '0', description: 'Tab order index.' },
  ];
  public readonly keyboardRows: KeyboardNavRow[] = [
    { key: 'Tab', action: 'Moves focus to the color swatch trigger button.' },
    { key: 'Shift+Tab', action: 'Moves focus away from the color picker.' },
    { key: 'Enter / Space', action: 'Opens or closes the color panel.' },
    { key: '↑ / ↓', action: 'Adjusts the saturation/brightness in the color canvas.' },
    { key: '← / →', action: 'Adjusts the hue on the hue slider.' },
    { key: 'Escape', action: 'Closes the color panel.' },
  ];

  public readonly ariaRows: readonly AriaRow[] = [
    {
      element: 'Trigger button',
      attribute: 'aria-label',
      value: '"Choose color"',
      notes: 'Announces the purpose of the swatch trigger to screen readers.',
    },
    {
      element: 'Trigger button',
      attribute: 'aria-expanded',
      value: '"true" | "false"',
      notes: 'Reflects whether the color panel is open.',
    },
    {
      element: 'Trigger button',
      attribute: 'aria-disabled',
      value: '"true"',
      notes: 'Applied when <code>[disabled]="true"</code>.',
    },
    {
      element: 'Color canvas',
      attribute: 'role="slider"',
      value: '—',
      notes: 'The 2-D canvas is exposed as a slider for saturation/brightness control.',
    },
    {
      element: 'Color canvas',
      attribute: 'aria-label',
      value: '"Saturation and Brightness"',
      notes: 'Describes the purpose of the canvas interaction.',
    },
    {
      element: 'Hue slider',
      attribute: 'role="slider"',
      value: '—',
      notes: 'The hue bar is exposed as a slider.',
    },
    {
      element: 'Hue slider',
      attribute: 'aria-label',
      value: '"Hue"',
      notes: 'Identifies the hue slider to screen readers.',
    },
    {
      element: 'Hue slider',
      attribute: 'aria-valuenow',
      value: 'current hue (0–360)',
      notes: 'Updated live as the hue changes.',
    },
  ];

  public readonly cssVarRows: CssVarRow[] = [
    {
      variable: '--uilib-colorpicker-trigger-width',
      description: 'Uilib Colorpicker Trigger width.',
    },
    {
      variable: '--uilib-colorpicker-trigger-height',
      description: 'Uilib Colorpicker Trigger height.',
    },
    {
      variable: '--uilib-colorpicker-trigger-border-radius',
      description: 'Uilib Colorpicker Trigger Border border radius.',
    },
    {
      variable: '--uilib-colorpicker-trigger-border-color',
      description: 'Uilib Colorpicker Trigger Border text colour.',
    },
    { variable: '--uilib-colorpicker-panel-width', description: 'Uilib Colorpicker Panel width.' },
    {
      variable: '--uilib-colorpicker-panel-padding',
      description: 'Uilib Colorpicker Panel padding.',
    },
    {
      variable: '--uilib-colorpicker-panel-bg',
      description: 'Uilib Colorpicker Panel background colour.',
    },
    {
      variable: '--uilib-colorpicker-panel-border-color',
      description: 'Uilib Colorpicker Panel Border text colour.',
    },
    {
      variable: '--uilib-colorpicker-panel-border-radius',
      description: 'Uilib Colorpicker Panel Border border radius.',
    },
    {
      variable: '--uilib-colorpicker-panel-shadow',
      description: 'Uilib Colorpicker Panel box shadow.',
    },
    {
      variable: '--uilib-colorpicker-panel-z-index',
      description: 'Uilib Colorpicker Panel z-index.',
    },
    {
      variable: '--uilib-colorpicker-hue-slider-width',
      description: 'Uilib Colorpicker Hue Slider width.',
    },
    {
      variable: '--uilib-colorpicker-hue-slider-height',
      description: 'Uilib Colorpicker Hue Slider height.',
    },
    {
      variable: '--uilib-colorpicker-selector-size',
      description: 'Uilib Colorpicker Selector size.',
    },
    {
      variable: '--uilib-colorpicker-transition-duration',
      description: 'Uilib Colorpicker Transition Duration.',
    },
  ];
}
