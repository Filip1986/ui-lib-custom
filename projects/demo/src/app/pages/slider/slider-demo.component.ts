import { ChangeDetectionStrategy, Component, viewChild } from '@angular/core';
import type { Signal } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import type { DocSection } from '@demo/shared/doc-page/doc-section.model';
import { DocCodeExampleComponent } from '@demo/shared/doc-page/doc-code-example.component';
import { DocDemoViewportComponent } from '@demo/shared/doc-page/doc-demo-viewport.component';
import { DocPageHeaderComponent } from '@demo/shared/doc-page/doc-page-header.component';
import { DocPageLayoutComponent } from '@demo/shared/doc-page/doc-page-layout.component';
import { DocTocComponent } from '@demo/shared/doc-page/doc-toc.component';
import { Slider } from 'ui-lib-custom/slider';
import { DocQualityBadgeComponent } from '@demo/shared/doc-page/doc-quality-badge.component';
import type { ComponentQualityAudit } from '@demo/shared/doc-page/doc-quality-badge.component';
import { DocKeyboardNavComponent } from '@demo/shared/doc-page/doc-keyboard-nav.component';
import type { KeyboardNavRow } from '@demo/shared/doc-page/doc-keyboard-nav.component';

import { Panel } from 'ui-lib-custom/panel';
import { DocApiReferenceComponent } from '@demo/shared/doc-page/doc-api-reference.component';
import type { ApiPropRow } from '@demo/shared/doc-page/doc-api-reference.component';
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
    Panel,
    FormsModule,
    ReactiveFormsModule,
    DocPageHeaderComponent,
    DocPageLayoutComponent,
    DocDemoViewportComponent,
    Slider,
    DocTocComponent,
    DocQualityBadgeComponent,
    DocKeyboardNavComponent,
    DocCodeExampleComponent,
    DocApiReferenceComponent,
  ],
  templateUrl: './slider-demo.component.html',
  styleUrl: './slider-demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SliderDemoComponent {
  public readonly layout: Signal<DocPageLayoutComponent | undefined> =
    viewChild(DocPageLayoutComponent);

  public scrollTo(id: string): void {
    this.layout()?.scrollToSection(id);
  }

  public readonly importCode: string = "import { Slider } from 'ui-lib-custom/slider'";
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
    { id: 'keyboard-navigation', label: 'Keyboard Navigation' },
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

  private readonly snippetsTs: Record<SliderDemoSnippetKey, string> = {
    basic: `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Slider } from 'ui-lib-custom/slider';

@Component({
  standalone: true,
  imports: [FormsModule, Slider],
  templateUrl: './my.component.html',
})
export class MyComponent {
  value: number = 40;
}`,
    range: `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Slider } from 'ui-lib-custom/slider';

@Component({
  standalone: true,
  imports: [FormsModule, Slider],
  templateUrl: './my.component.html',
})
export class MyComponent {
  rangeValue: [number, number] = [20, 75];
}`,
    step: `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Slider } from 'ui-lib-custom/slider';

@Component({
  standalone: true,
  imports: [FormsModule, Slider],
  templateUrl: './my.component.html',
})
export class MyComponent {
  value: number = 0;
}`,
    minmax: `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Slider } from 'ui-lib-custom/slider';

@Component({
  standalone: true,
  imports: [FormsModule, Slider],
  templateUrl: './my.component.html',
})
export class MyComponent {
  value: number = -10;
}`,
    vertical: `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Slider } from 'ui-lib-custom/slider';

@Component({
  standalone: true,
  imports: [FormsModule, Slider],
  templateUrl: './my.component.html',
})
export class MyComponent {
  value: number = 60;
}`,
    sizes: `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Slider } from 'ui-lib-custom/slider';

@Component({
  standalone: true,
  imports: [FormsModule, Slider],
  templateUrl: './my.component.html',
})
export class MyComponent {
  value: number = 50;
}`,
    animate: `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Slider } from 'ui-lib-custom/slider';

@Component({
  standalone: true,
  imports: [FormsModule, Slider],
  templateUrl: './my.component.html',
})
export class MyComponent {
  value: number = 30;
}`,
    disabled: `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Slider } from 'ui-lib-custom/slider';

@Component({
  standalone: true,
  imports: [FormsModule, Slider],
  templateUrl: './my.component.html',
})
export class MyComponent {
  value: number = 55;
}`,
    readonly: `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Slider } from 'ui-lib-custom/slider';

@Component({
  standalone: true,
  imports: [FormsModule, Slider],
  templateUrl: './my.component.html',
})
export class MyComponent {
  value: number = 35;
}`,
    reactive: `import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Slider } from 'ui-lib-custom/slider';

@Component({
  standalone: true,
  imports: [ReactiveFormsModule, Slider],
  templateUrl: './my.component.html',
})
export class MyComponent {
  readonly form: FormGroup = new FormGroup({
    volume: new FormControl<number>(60),
    brightness: new FormControl<number>(40),
  });
}`,
  };

  public snippetTs(key: SliderDemoSnippetKey): string {
    return this.snippetsTs[key];
  }

  public get volumeControl(): FormControl<number> {
    return this.reactiveForm.get('volume') as FormControl<number>;
  }

  public get brightnessControl(): FormControl<number> {
    return this.reactiveForm.get('brightness') as FormControl<number>;
  }
  public readonly qualityAudit: ComponentQualityAudit = {
    date: '2026-05-18',
    tier: 1,
    scores: {
      api: 9,
      a11y: 9,
      perf: 9,
      comp: 9,
      theme: 9,
      dx: 9,
      docs: 9,
      polish: 8,
      angular: 9,
      feel: 8,
    },
    competitiveParity: 'pending',
    apgPattern: { name: 'Slider', url: 'https://www.w3.org/WAI/ARIA/apg/patterns/slider/' },
  };

  public readonly keyboardRows: KeyboardNavRow[] = [
    {
      key: '← / ↓',
      action: 'Decrease the value by one step.',
    },
    {
      key: '→ / ↑',
      action: 'Increase the value by one step.',
    },
    {
      key: 'Home',
      action: 'Set the value to the minimum.',
    },
    {
      key: 'End',
      action: 'Set the value to the maximum.',
    },
    {
      key: 'Page Down',
      action: 'Decrease the value by a larger step (10× step or 10% of range).',
    },
    {
      key: 'Page Up',
      action: 'Increase the value by a larger step (10× step or 10% of range).',
    },
  ];

  public readonly apiRows: readonly ApiPropRow[] = [
    { name: 'min', type: 'number', default: '0', description: 'Minimum value.' },
    { name: 'max', type: 'number', default: '100', description: 'Maximum value.' },
    { name: 'step', type: 'number', default: '1', description: 'Value increment.' },
    { name: 'range', type: 'boolean', default: 'false', description: 'Enables range selection.' },
    {
      name: 'orientation',
      type: "'horizontal' | 'vertical'",
      default: "'horizontal'",
      description: 'Slider orientation.',
    },
    { name: 'animate', type: 'boolean', default: 'false', description: 'Animates thumb movement.' },
    { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables the slider.' },
    {
      name: 'ariaLabel',
      type: 'string | null',
      default: 'null',
      description: 'ARIA label for the slider thumb.',
    },
    {
      name: 'variant',
      type: "'material' | 'bootstrap' | 'minimal' | null",
      default: 'null',
      description: 'Design variant.',
    },
    { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Slider size.' },
  ];
}
