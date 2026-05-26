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
    date: '2026-05-26',
    tier: 1,
    scores: {
      api: 9,
      a11y: 9,
      perf: 8,
      comp: 8,
      theme: 9,
      dx: 9,
      docs: 9,
      polish: 9,
      angular: 9,
      feel: 9,
    },
    competitiveParity: 'pending',
    apgPattern: {
      name: 'Dialog (Modal)',
      url: 'https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/',
    },
  };

  public readonly apiRows: readonly ApiPropRow[] = [
    {
      name: 'value',
      type: 'string | RgbColor | HsbColor | null',
      default: 'null',
      description:
        'Bound color value. Accepts a hex string, RgbColor, or HsbColor depending on format. Bind via [(ngModel)] or reactive forms.',
    },
    {
      name: 'format',
      type: "'hex' | 'rgb' | 'hsb'",
      default: "'hex'",
      description:
        "Output format for emitted values. 'hex' → 6-char string; 'rgb' → RgbColor; 'hsb' → HsbColor.",
    },
    {
      name: 'inline',
      type: 'boolean',
      default: 'false',
      description: 'Renders the picker inline at its DOM position instead of as a floating popup.',
    },
    {
      name: 'variant',
      type: "'material' | 'bootstrap' | 'minimal' | null",
      default: 'null',
      description: 'Design variant override. Falls back to ThemeConfigService.variant() when null.',
    },
    {
      name: 'disabled',
      type: 'boolean',
      default: 'false',
      description: 'Disables all interaction and drag handling.',
    },
    {
      name: 'inputId',
      type: 'string',
      default: "''",
      description: 'Custom id for the hidden input element. Auto-generated when empty.',
    },
    {
      name: 'tabindex',
      type: 'number',
      default: '0',
      description: 'tabindex of the trigger swatch button.',
    },
    {
      name: 'appendTo',
      type: "'body' | string | HTMLElement | undefined",
      default: "'body'",
      description:
        "Where to mount the floating popup panel. Accepts 'body', a CSS selector, or an HTMLElement.",
    },
  ];
  public readonly keyboardRows: KeyboardNavRow[] = [
    {
      key: 'Tab / Shift+Tab',
      action: 'Cycles focus: trigger swatch → panel → hue slider → Hex / H / S / B text inputs.',
    },
    {
      key: 'Enter / Space',
      action: '(Trigger) Opens the popup panel. (Panel) Confirms current color and closes.',
    },
    {
      key: 'Escape',
      action: 'Closes the popup panel and returns focus to the trigger button.',
    },
    {
      key: '↑ / ↓ (hue slider)',
      action: 'Increases / decreases hue by 1° (+Shift for 10° jumps).',
    },
    {
      key: '← / → (hue slider)',
      action: 'Same as ↑ / ↓ on the hue slider.',
    },
    {
      key: '← / → (color canvas)',
      action: 'Increases / decreases saturation (+Shift for 10 steps).',
    },
    {
      key: '↑ / ↓ (color canvas)',
      action: 'Increases / decreases brightness (+Shift for 10 steps).',
    },
  ];

  public readonly ariaRows: readonly AriaRow[] = [
    {
      element: 'Trigger button',
      attribute: 'aria-label',
      value: '"Color: #RRGGBB, click to open picker"',
      notes: 'Announces current color value and purpose. Updated live as the color changes.',
    },
    {
      element: 'Trigger button',
      attribute: 'aria-haspopup',
      value: '"dialog"',
      notes: 'Signals that activation opens a dialog panel.',
    },
    {
      element: 'Trigger button',
      attribute: 'aria-expanded',
      value: '"true" | "false"',
      notes: 'Reflects whether the color panel is open.',
    },
    {
      element: 'Trigger button',
      attribute: 'aria-controls',
      value: 'panel id',
      notes: 'Links the trigger to the panel element when the panel is open.',
    },
    {
      element: 'Panel',
      attribute: 'role',
      value: '"dialog"',
      notes: 'Popup panel is announced as a dialog.',
    },
    {
      element: 'Panel',
      attribute: 'aria-label',
      value: '"Color picker"',
      notes: 'Names the dialog for screen readers.',
    },
    {
      element: 'Panel',
      attribute: 'aria-modal',
      value: '"false"',
      notes: 'Panel does not trap focus.',
    },
    {
      element: 'Hue slider',
      attribute: 'role',
      value: '"slider"',
      notes: 'The hue strip is an accessible range slider.',
    },
    {
      element: 'Hue slider',
      attribute: 'aria-label',
      value: '"Hue"',
      notes: 'Names the slider for screen readers.',
    },
    {
      element: 'Hue slider',
      attribute: 'aria-valuenow',
      value: '0 – 359',
      notes: 'Live-updated as the hue changes.',
    },
    {
      element: 'Hue slider',
      attribute: 'aria-valuetext',
      value: '"N degrees"',
      notes: 'Human-readable hue value description.',
    },
    {
      element: 'Color canvas',
      attribute: 'aria-hidden',
      value: '"true"',
      notes:
        'Canvas is hidden from assistive technology. Screen-reader users navigate color via the Hex / H / S / B text inputs.',
    },
    {
      element: 'Hex / H / S / B inputs',
      attribute: '<label for>',
      value: 'linked id',
      notes:
        'Each text input has a visible, properly associated <code>&lt;label&gt;</code> element.',
    },
  ];

  public readonly cssVarRows: CssVarRow[] = [
    {
      variable: '--uilib-colorpicker-trigger-width',
      description: 'Width of the color swatch trigger button. Default: 2rem.',
    },
    {
      variable: '--uilib-colorpicker-trigger-height',
      description: 'Height of the color swatch trigger button. Default: 2rem.',
    },
    {
      variable: '--uilib-colorpicker-trigger-border-radius',
      description: 'Border radius of the trigger swatch.',
    },
    {
      variable: '--uilib-colorpicker-trigger-border-color',
      description: 'Border color of the trigger swatch.',
    },
    {
      variable: '--uilib-colorpicker-panel-width',
      description: 'Width of the color picker panel. Default: 196px.',
    },
    {
      variable: '--uilib-colorpicker-panel-padding',
      description: 'Inner padding of the color picker panel.',
    },
    {
      variable: '--uilib-colorpicker-panel-bg',
      description: 'Background color of the panel.',
    },
    {
      variable: '--uilib-colorpicker-panel-border-color',
      description: 'Border color of the panel.',
    },
    {
      variable: '--uilib-colorpicker-panel-border-radius',
      description: 'Corner radius of the panel.',
    },
    {
      variable: '--uilib-colorpicker-panel-shadow',
      description: 'Box shadow of the panel.',
    },
    {
      variable: '--uilib-colorpicker-panel-z-index',
      description: 'z-index of the floating panel.',
    },
    {
      variable: '--uilib-colorpicker-hue-slider-width',
      description: 'Width of the hue strip.',
    },
    {
      variable: '--uilib-colorpicker-hue-slider-height',
      description: 'Height of the hue strip.',
    },
    {
      variable: '--uilib-colorpicker-selector-size',
      description: 'Diameter of the crosshair selector dot on the color canvas.',
    },
    {
      variable: '--uilib-colorpicker-transition-duration',
      description:
        'Duration of trigger and panel transitions. Defaults to --uilib-transition-duration-fast.',
    },
    {
      variable: '--uilib-colorpicker-focus-ring-color',
      description:
        'Color of the keyboard focus ring on the trigger, panel, hue slider, and text inputs.',
    },
    {
      variable: '--uilib-colorpicker-focus-ring-width',
      description:
        'Width of the keyboard focus ring. Defaults to 3px; Bootstrap variant overrides to 4px.',
    },
    {
      variable: '--uilib-colorpicker-label-font-size',
      description: 'Font size for the Hex / H / S / B input labels and inputs.',
    },
  ];
}
