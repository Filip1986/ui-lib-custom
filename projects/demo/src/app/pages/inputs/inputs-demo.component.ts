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
import { DocCodeExampleComponent } from '@demo/shared/doc-page/doc-code-example.component';
import { DocDemoViewportComponent } from '@demo/shared/doc-page/doc-demo-viewport.component';
import { ThemeScopeDirective } from '@demo/shared/theme-scope.directive';
import { VariantComparisonComponent } from '@demo/shared/components/variant-comparison/variant-comparison.component';
import { InputBasicExampleComponent } from '@demo/examples/input-basic-example.component';

import { Panel } from 'ui-lib-custom/panel';
import { DocApiReferenceComponent } from '@demo/shared/doc-page/doc-api-reference.component';
import type { ApiPropRow } from '@demo/shared/doc-page/doc-api-reference.component';
import { inputExampleHtml, inputExampleTs, usageHtml, usageTs } from './snippets.generated';
import { DocSectionComponent } from '@demo/shared/doc-page/doc-section.component';
import { DocCssVarsTableComponent } from '@demo/shared/doc-page/doc-css-vars-table.component';
import type { CssVarRow } from '@demo/shared/doc-page/doc-css-vars-table.component';
import { DocKeyboardNavComponent } from '@demo/shared/doc-page/doc-keyboard-nav.component';
import type { KeyboardNavRow } from '@demo/shared/doc-page/doc-keyboard-nav.component';
import { DocAriaTableComponent } from '@demo/shared/doc-page/doc-aria-table.component';
import type { AriaRow } from '@demo/shared/doc-page/doc-aria-table.component';
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
  selector: 'app-inputs-demo',
  standalone: true,
  imports: [
    Panel,
    CommonModule,
    UiLibInput,
    Button,
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
    DocCodeExampleComponent,
    DocApiReferenceComponent,
    DocSectionComponent,

    DocCssVarsTableComponent,
    DocKeyboardNavComponent,
    DocAriaTableComponent,
  ],
  templateUrl: './inputs-demo.component.html',
  styleUrl: './inputs-demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputsDemoComponent {
  public readonly inputExampleHtml: string = inputExampleHtml;
  public readonly inputExampleTs: string = inputExampleTs;
  public readonly usageHtml: string = usageHtml;
  public readonly usageTs: string = usageTs;

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
  ];

  public scrollTo(id: string): void {
    this.layout()?.scrollToSection(id);
  }

  public readonly activeTab: WritableSignal<TabKey> = signal<TabKey>('playground');

  public setTab(tab: TabKey): void {
    this.activeTab.set(tab);
  }

  public onTabChange(value: TabsValue | null): void {
    if (value === null) return;
    this.setTab(value as TabKey);
  }

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

  public readonly apiRows: readonly ApiPropRow[] = [
    {
      name: 'label',
      type: 'string',
      default: "''",
      description: 'Visible label rendered above or inside the input.',
    },
    {
      name: 'variant',
      type: "'material' | 'bootstrap' | 'minimal' | null",
      default: 'null',
      description: 'Design variant.',
    },
    { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Input size.' },
    { name: 'type', type: 'string', default: "'text'", description: 'HTML input type.' },
    { name: 'placeholder', type: 'string', default: "''", description: 'Placeholder text.' },
    {
      name: 'error',
      type: 'string | null',
      default: 'null',
      description: 'Error message below the field.',
    },
    {
      name: 'hint',
      type: 'string | null',
      default: 'null',
      description: 'Hint text below the field.',
    },
    {
      name: 'invalid',
      type: 'boolean',
      default: 'false',
      description: 'Marks the field as invalid.',
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
      description: 'Marks the field as required.',
    },
    {
      name: 'showClear',
      type: 'boolean',
      default: 'false',
      description: 'Shows a clear icon button.',
    },
  ];
  public readonly keyboardRows: KeyboardNavRow[] = [
    { key: 'Tab', action: 'Moves focus to the input.' },
    { key: 'Shift+Tab', action: 'Moves focus away from the input.' },
    { key: 'Type', action: 'Updates the input value.' },
    { key: 'Enter', suffix: 'on toggle password button', action: 'Toggles password visibility.' },
    { key: 'Enter', suffix: 'on clear button', action: 'Clears the input value.' },
  ];

  public readonly ariaRows: readonly AriaRow[] = [
    {
      element: 'Native input',
      attribute: 'aria-invalid',
      value: '"true"',
      notes:
        'Applied when <code>[invalid]="true"</code> or an <code>[error]</code> message is provided.',
    },
    {
      element: 'Native input',
      attribute: 'aria-required',
      value: '"true"',
      notes: 'Applied when <code>[required]="true"</code>.',
    },
    {
      element: 'Native input',
      attribute: 'aria-disabled',
      value: '"true"',
      notes: 'Applied when <code>[disabled]="true"</code>.',
    },
    {
      element: 'Native input',
      attribute: 'aria-readonly',
      value: '"true"',
      notes: 'Applied when <code>[readonly]="true"</code>.',
    },
    {
      element: 'Native input',
      attribute: 'aria-describedby',
      value: 'hint/error element IDs',
      notes: 'Links the input to the <code>hint</code> and/or <code>error</code> message elements.',
    },
    {
      element: 'Error message',
      attribute: 'aria-live="polite"',
      value: '—',
      notes: 'Error messages are announced to screen readers as they appear.',
    },
  ];

  public readonly cssVarRows: CssVarRow[] = [
    { variable: '--uilib-input-padding-y-base', description: 'Padding Y Base.' },
    { variable: '--uilib-input-padding-x-base', description: 'Padding X Base.' },
    { variable: '--uilib-input-padding-y', description: 'Vertical padding.' },
    { variable: '--uilib-input-padding-x', description: 'Horizontal padding.' },
    { variable: '--uilib-input-min-height', description: 'Minimum height.' },
    { variable: '--uilib-input-bg', description: 'Background colour.' },
    { variable: '--uilib-input-border', description: 'Border shorthand.' },
    { variable: '--uilib-input-border-hover', description: 'Border shorthand (hover).' },
    { variable: '--uilib-input-border-focus', description: 'Border shorthand (focus).' },
    { variable: '--uilib-input-placeholder', description: 'Placeholder.' },
    { variable: '--uilib-input-label-bg', description: 'Label background colour.' },
    { variable: '--uilib-input-text', description: 'Text.' },
    { variable: '--uilib-input-transition-duration', description: 'Transition Duration.' },
  ];
}
