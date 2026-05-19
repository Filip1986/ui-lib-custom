import {
  Component,
  ChangeDetectionStrategy,
  ViewChild,
  signal,
  viewChild,
  computed,
  inject,
  effect,
} from '@angular/core';
import type { Signal, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import type { NgForm } from '@angular/forms';
import { UiLibInput } from 'ui-lib-custom/input';
import { CodeSnippet } from 'ui-lib-custom/code-snippet';
import type { InputVariant, InputType, InputLabelFloat } from 'ui-lib-custom/input';
import { ThemeConfigService } from 'ui-lib-custom/theme';
import { Tabs, Tab } from 'ui-lib-custom/tabs';
import type { TabsValue } from 'ui-lib-custom/tabs';
import { Button } from 'ui-lib-custom/button';
import { DocPageLayoutComponent } from '@demo/shared/doc-page/doc-page-layout.component';
import { DocPageHeaderComponent } from '@demo/shared/doc-page/doc-page-header.component';
import { DocTocComponent } from '@demo/shared/doc-page/doc-toc.component';
import type { DocSection } from '@demo/shared/doc-page/doc-section.model';
import { DocQualityBadgeComponent } from '@demo/shared/doc-page/doc-quality-badge.component';
import type { ComponentQualityAudit } from '@demo/shared/doc-page/doc-quality-badge.component';
import { DocApiReferenceComponent } from '@demo/shared/doc-page/doc-api-reference.component';
import type { ApiPropRow } from '@demo/shared/doc-page/doc-api-reference.component';
import { DocDemoViewportComponent } from '@demo/shared/doc-page/doc-demo-viewport.component';
import { ThemeScopeDirective } from '@demo/shared/theme-scope.directive';
import { VariantComparisonComponent } from '../../shared/components/variant-comparison/variant-comparison.component';
import { InputBasicExampleComponent } from '@demo/examples/input-basic-example.component';

import { Panel } from 'ui-lib-custom/panel';
type TabKey =
  | 'playground'
  | 'variants'
  | 'api-reference'
  | 'usage'
  | 'performance'
  | 'accessibility';

type ViewportPreset = { key: string; label: string; width: number; height: number };

/**
 * Demo page for input variants and states.
 */
@Component({
  selector: 'app-inputs',
  standalone: true,
  imports: [
    Panel,
    CommonModule,
    UiLibInput,
    Button,
    CodeSnippet,
    Tabs,
    Tab,
    DocPageLayoutComponent,
    DocPageHeaderComponent,
    DocTocComponent,
    DocDemoViewportComponent,
    ThemeScopeDirective,
    FormsModule,
    VariantComparisonComponent,
    InputBasicExampleComponent,
    DocQualityBadgeComponent,
    DocApiReferenceComponent,
  ],
  templateUrl: './inputs.component.html',
  styleUrl: './inputs.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputsComponent {
  public readonly qualityAudit: ComponentQualityAudit = {
    date: '2026-05-18',
    tier: 1,
    scores: {
      api: 9,
      a11y: 9,
      perf: 9,
      comp: 8,
      theme: 8,
      dx: 9,
      docs: 9,
      polish: 9,
      angular: 9,
      feel: 9,
    },
    competitiveParity: 'pending',
  };

  public readonly importCode: string = "import { UiLibInput } from 'ui-lib-custom/input'";

  public readonly layout: Signal<DocPageLayoutComponent | undefined> =
    viewChild(DocPageLayoutComponent);

  public readonly sections: DocSection[] = [
    { id: 'playground', label: 'Playground' },
    { id: 'variants', label: 'Variants' },
    { id: 'api-reference', label: 'API Reference' },
    { id: 'usage', label: 'Usage' },
    { id: 'performance', label: 'Performance Features' },
    { id: 'accessibility', label: 'Accessibility' },
    { id: 'api', label: 'API Reference' },
  ];

  public scrollTo(id: string): void {
    this.layout()?.scrollToSection(id);
  }

  public readonly apiRows: ApiPropRow[] = [
    { name: 'label', type: 'string', default: "''", description: 'Floating or static label text.' },
    {
      name: 'type',
      type: "'text' | 'password' | 'email' | 'number' | 'tel' | 'url' | 'search'",
      default: "'text'",
      description: 'Native input type.',
    },
    {
      name: 'variant',
      type: "'material' | 'bootstrap' | 'minimal' | null",
      default: 'null',
      description: 'Design variant.',
    },
    { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Input size.' },
    {
      name: 'labelFloat',
      type: "'over' | 'in' | 'on'",
      default: "'over'",
      description: 'Float label animation style.',
    },
    { name: 'placeholder', type: 'string', default: "''", description: 'Placeholder text.' },
    {
      name: 'error',
      type: 'string | null',
      default: 'null',
      description: 'Validation error message displayed below the input.',
    },
    {
      name: 'hint',
      type: 'string | null',
      default: 'null',
      description: 'Helper text displayed below the input.',
    },
    {
      name: 'invalid',
      type: 'boolean',
      default: 'false',
      description: 'Marks the input as invalid.',
    },
    { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables the input.' },
    {
      name: 'readonly',
      type: 'boolean',
      default: 'false',
      description: 'Makes the input read-only.',
    },
    {
      name: 'required',
      type: 'boolean',
      default: 'false',
      description: 'Marks the input as required.',
    },
    {
      name: 'showCounter',
      type: 'boolean',
      default: 'false',
      description: 'Shows a character counter.',
    },
    {
      name: 'maxLength',
      type: 'number | null',
      default: 'null',
      description: 'Maximum character length.',
    },
    { name: 'showClear', type: 'boolean', default: 'false', description: 'Shows a clear button.' },
    { name: 'ariaLabel', type: 'string | null', default: 'null', description: 'Accessible label.' },
    {
      name: 'id',
      type: 'string | null',
      default: 'null',
      description: 'Id applied to the inner input.',
    },
    {
      name: 'name',
      type: 'string | null',
      default: 'null',
      description: 'Name attribute for form submission.',
    },
  ];

  public readonly activeTab: WritableSignal<TabKey> = signal<TabKey>('playground');

  public setTab(tab: TabKey): void {
    this.activeTab.set(tab);
  }

  public onTabChange(value: TabsValue | null): void {
    if (value === null) return;
    this.setTab(value as TabKey);
  }

  public readonly snippets: { readonly usage: string } = {
    usage: `import { UiLibInput } from 'ui-lib-custom';

@Component({
  standalone: true,
  imports: [UiLibInput],
  template: '<ui-lib-input label="Email" placeholder="you@example.com"></ui-lib-input>'
})
export class Example {}`,
  } as const;

  private readonly themeService: ThemeConfigService = inject(ThemeConfigService);

  public readonly variant: WritableSignal<InputVariant> = signal<InputVariant>('material');
  public readonly inputType: WritableSignal<InputType> = signal<InputType>('text');
  public readonly labelFloat: WritableSignal<InputLabelFloat> = signal<InputLabelFloat>('over');
  public readonly value: WritableSignal<string> = signal<string>('');
  public readonly password: WritableSignal<string> = signal<string>('');
  public readonly error: WritableSignal<string> = signal<string>('');
  public readonly showCounter: WritableSignal<boolean> = signal<boolean>(true);
  public readonly showClear: WritableSignal<boolean> = signal<boolean>(true);
  public readonly showToggle: WritableSignal<boolean> = signal<boolean>(true);
  public readonly required: WritableSignal<boolean> = signal<boolean>(true);
  public readonly label: WritableSignal<string> = signal<string>('Email');
  public readonly placeholder: WritableSignal<string> = signal<string>('you@example.com');
  public readonly useGlobalVariant: WritableSignal<boolean> = signal<boolean>(true);

  private readonly globalVars: Signal<Record<string, string>> = computed<Record<string, string>>(
    (): Record<string, string> => {
      const preset: ReturnType<ThemeConfigService['preset']> = this.themeService.preset();
      return this.themeService.getCssVars(preset);
    }
  );

  public readonly appliedTheme: Signal<Record<string, string>> = computed<Record<string, string>>(
    (): Record<string, string> => this.globalVars()
  );

  constructor() {
    effect((): void => {
      if (!this.useGlobalVariant()) return;
      const v: InputVariant = this.themeService.preset().variant as InputVariant;
      this.variant.set(v);
    });
  }

  public onSubmit(form: NgForm): void {
    if (!this.value().trim()) {
      this.error.set('Required field');
      return;
    }
    this.error.set('');
    alert(`Submitted value: ${this.value()}`);
    form.resetForm();
    this.value.set('');
    this.password.set('');
  }

  public setVariant(v: InputVariant): void {
    this.useGlobalVariant.set(false);
    this.variant.set(v);
  }

  public setFollowThemeVariant(on: boolean): void {
    this.useGlobalVariant.set(on);
    if (on) {
      const v: InputVariant = this.themeService.preset().variant as InputVariant;
      this.variant.set(v);
    }
  }

  public setType(t: InputType): void {
    this.inputType.set(t);
  }

  public setLabelFloat(mode: InputLabelFloat): void {
    this.labelFloat.set(mode);
  }

  @ViewChild(DocDemoViewportComponent) public viewport?: DocDemoViewportComponent;

  public get viewportPresets(): ViewportPreset[] {
    return this.viewport?.presets() ?? [];
  }

  public viewportDisplayWidth(): number {
    return this.viewport?.displayWidth() ?? 0;
  }

  public viewportDisplayHeight(): number {
    return this.viewport?.displayHeight() ?? 0;
  }

  public viewportCustomWidth(): number {
    return this.viewport?.customWidth() ?? 0;
  }

  public setViewportCustomWidth(value: number): void {
    this.viewport?.setCustomWidth(value);
  }

  public setViewportPreset(preset: ViewportPreset): void {
    this.viewport?.setPreset(preset);
  }

  public applyViewportCustom(): void {
    this.viewport?.setCustom();
  }

  public rotateViewport(): void {
    this.viewport?.rotate();
  }

  public setViewportDensity(value: 'default' | 'comfortable' | 'compact'): void {
    this.viewport?.setDensity(value);
  }

  public readonly variants: InputVariant[] = ['material', 'bootstrap', 'minimal'];
  public readonly types: InputType[] = [
    'text',
    'email',
    'password',
    'number',
    'search',
    'tel',
    'url',
  ];
  public readonly labelFloats: InputLabelFloat[] = ['over', 'in', 'on'];

  public readonly inputExample: string = `<ui-lib-input label="Email" placeholder="you@example.com" />`;
}
