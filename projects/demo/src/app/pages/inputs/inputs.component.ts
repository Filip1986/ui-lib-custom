import {
  Component,
  ChangeDetectionStrategy,
  signal,
  ViewChild,
  computed,
  inject,
  effect,
} from '@angular/core';
import type { Signal, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import type { NgForm } from '@angular/forms';
import { UiLibInput, ThemeConfigService, Card, Tabs, Tab } from 'ui-lib-custom';
import type { InputVariant, InputType, InputLabelFloat, TabsValue } from 'ui-lib-custom';
import { Button } from 'ui-lib-custom';
import { DocPageLayoutComponent } from '@demo/shared/doc-page/doc-page-layout.component';
import type { DocSection } from '@demo/shared/doc-page/doc-section.model';
import { DocDemoViewportComponent } from '@demo/shared/doc-page/doc-demo-viewport.component';
import { ThemeScopeDirective } from '@demo/shared/theme-scope.directive';
import { DocCodeSnippetComponent } from '@demo/shared/doc-page/doc-code-snippet.component';
import { CodePreviewComponent } from '../../shared/components/code-preview/code-preview.component';
import { VariantComparisonComponent } from '../../shared/components/variant-comparison/variant-comparison.component';
import { InputBasicExampleComponent } from '@demo/examples/input-basic-example.component';

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
    CommonModule,
    UiLibInput,
    Button,
    Card,
    Tabs,
    Tab,
    DocPageLayoutComponent,
    DocCodeSnippetComponent,
    DocDemoViewportComponent,
    ThemeScopeDirective,
    FormsModule,
    CodePreviewComponent,
    VariantComparisonComponent,
    InputBasicExampleComponent,
  ],
  templateUrl: './inputs.component.html',
  styleUrl: './inputs.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputsComponent {
  public readonly sections: DocSection[] = [
    { id: 'playground', label: 'Playground' },
    { id: 'variants', label: 'Variants' },
    { id: 'api-reference', label: 'API Reference' },
    { id: 'usage', label: 'Usage' },
    { id: 'performance', label: 'Performance Features' },
    { id: 'accessibility', label: 'Accessibility' },
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
