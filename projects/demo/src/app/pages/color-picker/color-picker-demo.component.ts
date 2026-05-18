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
import { Card } from 'ui-lib-custom/card';
import { Button } from 'ui-lib-custom/button';
import { ColorPicker } from 'ui-lib-custom';
import { CodeSnippet } from 'ui-lib-custom/code-snippet';
import type { ColorPickerValue, HsbColor, RgbColor } from 'ui-lib-custom';

type DemoSnippetKey =
  | 'basic'
  | 'inline'
  | 'formats'
  | 'templateDriven'
  | 'reactive'
  | 'disabled'
  | 'variants'
  | 'clipping';

/**
 * Demo page for ColorPicker component usage and forms integration.
 */
@Component({
  selector: 'app-color-picker-demo',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DocPageHeaderComponent,
    DocPageLayoutComponent,
    DocTocComponent,
    DocDemoViewportComponent,
    Card,
    Button,
    CodeSnippet,
    ColorPicker,
  ],
  templateUrl: './color-picker-demo.component.html',
  styleUrl: './color-picker-demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ColorPickerDemoComponent {
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
  ];

  public scrollTo(id: string): void {
    this.layout()?.scrollToSection(id);
  }

  public readonly snippets: Record<DemoSnippetKey, string> = {
    basic: `<ui-lib-color-picker [(ngModel)]="basicHex" format="hex" />
<p>Selected HEX #{{ basicHex }}</p>`,
    inline: `<ui-lib-color-picker [inline]="true" [(ngModel)]="inlineHex" format="hex" />`,
    formats: `<ui-lib-color-picker [(ngModel)]="hexValue" format="hex" />
<ui-lib-color-picker [(ngModel)]="rgbValue" format="rgb" />
<ui-lib-color-picker [(ngModel)]="hsbValue" format="hsb" />`,
    templateDriven: `<form #f="ngForm" (ngSubmit)="submitTemplateDriven()">
  <ui-lib-color-picker name="templateColor" [(ngModel)]="templateDrivenValue" format="hex" />
  <ui-lib-button type="submit" color="primary">Submit</ui-lib-button>
</form>`,
    reactive: `<form [formGroup]="reactiveForm" (ngSubmit)="submitReactive()">
  <ui-lib-color-picker formControlName="color" format="hex" />
  <ui-lib-button type="submit" color="primary">Submit</ui-lib-button>
</form>`,
    disabled: `<ui-lib-color-picker [disabled]="true" [(ngModel)]="disabledValue" format="hex" />`,
    variants: `<ui-lib-color-picker variant="material" [(ngModel)]="variantValues.material" />
<ui-lib-color-picker variant="bootstrap" [(ngModel)]="variantValues.bootstrap" />
<ui-lib-color-picker variant="minimal" [(ngModel)]="variantValues.minimal" />`,
    clipping: `<div class="clipping-card">
  <ui-lib-color-picker [(ngModel)]="clippingValue" format="hex" />
</div>`,
  };

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

  public snippet(key: DemoSnippetKey): string {
    return this.snippets[key];
  }

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
}
