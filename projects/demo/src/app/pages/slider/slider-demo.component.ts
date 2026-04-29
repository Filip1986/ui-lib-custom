import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import type { DocSection } from '@demo/shared/doc-page/doc-section.model';
import { CodePreviewComponent } from '@demo/shared/components/code-preview/code-preview.component';
import { DocDemoViewportComponent } from '@demo/shared/doc-page/doc-demo-viewport.component';
import { DocPageLayoutComponent } from '@demo/shared/doc-page/doc-page-layout.component';
import { Card } from 'ui-lib-custom/card';
import { Slider } from 'ui-lib-custom/slider';

type SliderDemoSnippetKey =
  | 'basic'
  | 'range'
  | 'step'
  | 'minmax'
  | 'vertical'
  | 'sizes'
  | 'animate'
  | 'disabled'
  | 'readonly'
  | 'reactive';

/**
 * Demo page for the Slider component — linear track control for numeric values.
 */
@Component({
  selector: 'app-slider-demo',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    DocPageLayoutComponent,
    DocDemoViewportComponent,
    CodePreviewComponent,
    Card,
    Slider,
  ],
  templateUrl: './slider-demo.component.html',
  styleUrl: './slider-demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SliderDemoComponent {
  public readonly sections: DocSection[] = [
    { id: 'basic', label: 'Basic' },
    { id: 'range', label: 'Range' },
    { id: 'step', label: 'Step' },
    { id: 'minmax', label: 'Min / Max' },
    { id: 'vertical', label: 'Vertical' },
    { id: 'sizes', label: 'Sizes' },
    { id: 'animate', label: 'Animated' },
    { id: 'disabled', label: 'Disabled' },
    { id: 'readonly', label: 'Read-only' },
    { id: 'reactive', label: 'Reactive Forms' },
  ];

  public basicValue: number = 40;
  public rangeValue: [number, number] = [20, 75];
  public stepValue: number = 0;
  public minmaxValue: number = -10;
  public verticalValue: number = 60;
  public sizesValue: number = 50;
  public animateValue: number = 30;
  public disabledValue: number = 55;
  public readonlyValue: number = 35;

  public readonly reactiveForm: FormGroup = new FormGroup({
    volume: new FormControl<number>(60),
    brightness: new FormControl<number>(40),
  });

  private readonly snippets: Record<SliderDemoSnippetKey, string> = {
    basic: '<ui-lib-slider [(ngModel)]="value" />',

    range: '<ui-lib-slider [range]="true" [(ngModel)]="rangeValue" />',

    step: '<!-- Snaps to 0, 25, 50, 75, 100 -->\n<ui-lib-slider [step]="25" [(ngModel)]="value" />',

    minmax: '<ui-lib-slider [min]="-50" [max]="50" [step]="10" [(ngModel)]="value" />',

    vertical: '<ui-lib-slider orientation="vertical" [(ngModel)]="value" />',

    sizes:
      '<ui-lib-slider size="sm" [(ngModel)]="value" />\n<ui-lib-slider size="md" [(ngModel)]="value" />\n<ui-lib-slider size="lg" [(ngModel)]="value" />',

    animate: '<ui-lib-slider [animate]="true" [(ngModel)]="value" />',

    disabled: '<ui-lib-slider [disabled]="true" [(ngModel)]="value" />',

    readonly: '<ui-lib-slider [readonly]="true" [(ngModel)]="value" />',

    reactive:
      '<form [formGroup]="form">\n  <ui-lib-slider formControlName="volume" />\n  <ui-lib-slider formControlName="brightness" />\n</form>',
  };

  public snippet(key: SliderDemoSnippetKey): string {
    return this.snippets[key];
  }

  public get volumeControl(): FormControl<number> {
    return this.reactiveForm.get('volume') as FormControl<number>;
  }

  public get brightnessControl(): FormControl<number> {
    return this.reactiveForm.get('brightness') as FormControl<number>;
  }
}
