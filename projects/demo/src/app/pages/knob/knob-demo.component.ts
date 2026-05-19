import { ChangeDetectionStrategy, Component, viewChild } from '@angular/core';
import type { Signal } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import type { DocSection } from '@demo/shared/doc-page/doc-section.model';
import { DocCodeExampleComponent } from '@demo/shared/doc-page/doc-code-example.component';
import { DocDemoViewportComponent } from '@demo/shared/doc-page/doc-demo-viewport.component';
import { DocPageHeaderComponent } from '@demo/shared/doc-page/doc-page-header.component';
import { DocPageLayoutComponent } from '@demo/shared/doc-page/doc-page-layout.component';
import { DocTocComponent } from '@demo/shared/doc-page/doc-toc.component';
import { KnobComponent } from 'ui-lib-custom/knob';
import { DocQualityBadgeComponent } from '@demo/shared/doc-page/doc-quality-badge.component';
import type { ComponentQualityAudit } from '@demo/shared/doc-page/doc-quality-badge.component';

import { Panel } from 'ui-lib-custom/panel';
import { DocApiReferenceComponent } from '@demo/shared/doc-page/doc-api-reference.component';
import type { ApiPropRow } from '@demo/shared/doc-page/doc-api-reference.component';
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
    Panel,
    FormsModule,
    ReactiveFormsModule,
    DocPageLayoutComponent,
    DocDemoViewportComponent,
    KnobComponent,
    DocTocComponent,
    DocPageHeaderComponent,
    DocQualityBadgeComponent,
    DocCodeExampleComponent,
    DocApiReferenceComponent,
  ],
  templateUrl: './knob-demo.component.html',
  styleUrl: './knob-demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KnobDemoComponent {
  public readonly layout: Signal<DocPageLayoutComponent | undefined> =
    viewChild(DocPageLayoutComponent);

  public scrollTo(id: string): void {
    this.layout()?.scrollToSection(id);
  }

  public readonly importCode: string = "import { KnobComponent } from 'ui-lib-custom/knob'";

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

  private readonly snippetsTs: Record<KnobDemoSnippetKey, string> = {
    basic: `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { KnobComponent } from 'ui-lib-custom/knob';

@Component({
  standalone: true,
  imports: [FormsModule, KnobComponent],
  templateUrl: './my.component.html',
})
export class MyComponent {
  value: number = 40;
}`,
    sizes: `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { KnobComponent } from 'ui-lib-custom/knob';

@Component({
  standalone: true,
  imports: [FormsModule, KnobComponent],
  templateUrl: './my.component.html',
})
export class MyComponent {
  value: number = 40;
}`,
    step: `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { KnobComponent } from 'ui-lib-custom/knob';

@Component({
  standalone: true,
  imports: [FormsModule, KnobComponent],
  templateUrl: './my.component.html',
})
export class MyComponent {
  value: number = 0;
}`,
    minmax: `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { KnobComponent } from 'ui-lib-custom/knob';

@Component({
  standalone: true,
  imports: [FormsModule, KnobComponent],
  templateUrl: './my.component.html',
})
export class MyComponent {
  value: number = -20;
}`,
    template: `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { KnobComponent } from 'ui-lib-custom/knob';

@Component({
  standalone: true,
  imports: [FormsModule, KnobComponent],
  templateUrl: './my.component.html',
})
export class MyComponent {
  value: number = 60;
}`,
    colors: `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { KnobComponent } from 'ui-lib-custom/knob';

@Component({
  standalone: true,
  imports: [FormsModule, KnobComponent],
  templateUrl: './my.component.html',
})
export class MyComponent {
  value: number = 75;
}`,
    disabled: `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { KnobComponent } from 'ui-lib-custom/knob';

@Component({
  standalone: true,
  imports: [FormsModule, KnobComponent],
  templateUrl: './my.component.html',
})
export class MyComponent {
  value: number = 55;
}`,
    readonly: `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { KnobComponent } from 'ui-lib-custom/knob';

@Component({
  standalone: true,
  imports: [FormsModule, KnobComponent],
  templateUrl: './my.component.html',
})
export class MyComponent {
  value: number = 30;
}`,
    reactive: `import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { KnobComponent } from 'ui-lib-custom/knob';

@Component({
  standalone: true,
  imports: [ReactiveFormsModule, KnobComponent],
  templateUrl: './my.component.html',
})
export class MyComponent {
  readonly form: FormGroup = new FormGroup({
    brightness: new FormControl<number>(70),
    contrast: new FormControl<number>(50),
  });
}`,
  };

  public snippetTs(key: KnobDemoSnippetKey): string {
    return this.snippetsTs[key];
  }

  public get brightnessControl(): FormControl<number> {
    return this.reactiveForm.get('brightness') as FormControl<number>;
  }

  public get contrastControl(): FormControl<number> {
    return this.reactiveForm.get('contrast') as FormControl<number>;
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
    apgPattern: { name: 'Slider', url: 'https://www.w3.org/WAI/ARIA/apg/patterns/slider/' },
  };

  public readonly apiRows: readonly ApiPropRow[] = [
    { name: 'min', type: 'number', default: '0', description: 'Minimum value.' },
    { name: 'max', type: 'number', default: '100', description: 'Maximum value.' },
    { name: 'step', type: 'number', default: '1', description: 'Value increment per key press.' },
    { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Preset size.' },
    {
      name: 'variant',
      type: "'material' | 'bootstrap' | 'minimal' | null",
      default: 'null',
      description: 'Design variant.',
    },
    {
      name: 'strokeWidth',
      type: 'number',
      default: '14',
      description: 'Arc stroke width in SVG units.',
    },
    {
      name: 'showValue',
      type: 'boolean',
      default: 'true',
      description: 'Renders the current value inside the knob.',
    },
    { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables the knob.' },
    {
      name: 'readonly',
      type: 'boolean',
      default: 'false',
      description: 'Makes the knob read-only.',
    },
    {
      name: 'ariaLabel',
      type: 'string | undefined',
      default: 'undefined',
      description: 'ARIA label for the knob.',
    },
  ];
}
