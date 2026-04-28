import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import type { DocSection } from '@demo/shared/doc-page/doc-section.model';
import { CodePreviewComponent } from '@demo/shared/components/code-preview/code-preview.component';
import { DocDemoViewportComponent } from '@demo/shared/doc-page/doc-demo-viewport.component';
import { DocPageLayoutComponent } from '@demo/shared/doc-page/doc-page-layout.component';
import { Card } from 'ui-lib-custom/card';
import { KnobComponent } from 'ui-lib-custom/knob';

type KnobDemoSnippetKey =
  | 'basic'
  | 'sizes'
  | 'step'
  | 'minmax'
  | 'template'
  | 'colors'
  | 'disabled'
  | 'readonly'
  | 'reactive';

/**
 * Demo page for the Knob component — circular dial for numeric input.
 */
@Component({
  selector: 'app-knob-demo',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    DocPageLayoutComponent,
    DocDemoViewportComponent,
    CodePreviewComponent,
    Card,
    KnobComponent,
  ],
  templateUrl: './knob-demo.component.html',
  styleUrl: './knob-demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KnobDemoComponent {
  public readonly sections: DocSection[] = [
    { id: 'basic', label: 'Basic' },
    { id: 'sizes', label: 'Sizes' },
    { id: 'step', label: 'Step' },
    { id: 'minmax', label: 'Min / Max' },
    { id: 'template', label: 'Value Template' },
    { id: 'colors', label: 'Custom Colors' },
    { id: 'disabled', label: 'Disabled' },
    { id: 'readonly', label: 'Read-only' },
    { id: 'reactive', label: 'Reactive Forms' },
  ];

  public basicValue: number = 40;
  public stepValue: number = 0;
  public minmaxValue: number = -20;
  public templateValue: number = 60;
  public colorsValue: number = 75;
  public disabledValue: number = 55;
  public readonlyValue: number = 30;

  public readonly reactiveForm: FormGroup = new FormGroup({
    brightness: new FormControl<number>(70),
    contrast: new FormControl<number>(50),
  });

  private readonly snippets: Record<KnobDemoSnippetKey, string> = {
    basic: '<uilib-knob [(ngModel)]="value" />',

    sizes:
      '<!-- Small -->\n<uilib-knob size="sm" [(ngModel)]="value" />\n\n<!-- Medium (default) -->\n<uilib-knob size="md" [(ngModel)]="value" />\n\n<!-- Large -->\n<uilib-knob size="lg" [(ngModel)]="value" />',

    step: '<!-- Snaps to 0, 25, 50, 75, 100 -->\n<uilib-knob [step]="25" [(ngModel)]="value" />',

    minmax:
      '<!-- -50 to +50, step 10 -->\n<uilib-knob [min]="-50" [max]="50" [step]="10" [(ngModel)]="value" />',

    template:
      '<uilib-knob valueTemplate="{value}\u00b0" [(ngModel)]="value" />\n\n<uilib-knob valueTemplate="{value}%" [(ngModel)]="value" />',

    colors: '<uilib-knob valueColor="#f59e0b" textColor="#b45309" [(ngModel)]="value" />',

    disabled: '<uilib-knob [disabled]="true" [(ngModel)]="value" />',

    readonly: '<uilib-knob [readonly]="true" [(ngModel)]="value" />',

    reactive:
      '<form [formGroup]="form">\n  <uilib-knob formControlName="brightness" />\n  <uilib-knob formControlName="contrast" />\n</form>',
  };

  public snippet(key: KnobDemoSnippetKey): string {
    return this.snippets[key];
  }

  public get brightnessControl(): FormControl<number> {
    return this.reactiveForm.get('brightness') as FormControl<number>;
  }

  public get contrastControl(): FormControl<number> {
    return this.reactiveForm.get('contrast') as FormControl<number>;
  }
}
