import {
  Component,
  ChangeDetectionStrategy,
  signal,
  ViewChild,
  computed,
  inject,
  effect,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import {
  UiLibInput,
  InputVariant,
  InputType,
  InputLabelFloat,
  ThemeConfigService,
  Card,
  Tabs,
  Tab,
  TabsValue,
} from 'ui-lib-custom';
import { Button } from 'ui-lib-custom';
import { DocPageLayoutComponent } from '@demo/shared/doc-page/doc-page-layout.component';
import { DocSection } from '@demo/shared/doc-page/doc-section.model';
import { DocDemoViewportComponent } from '@demo/shared/doc-page/doc-demo-viewport.component';
import { ThemeScopeDirective } from '@demo/shared/theme-scope.directive';
import { DocCodeSnippetComponent } from '@demo/shared/doc-page/doc-code-snippet.component';
import { CodePreviewComponent } from '../../shared/components/code-preview/code-preview.component';
import { VariantComparisonComponent } from '../../shared/components/variant-comparison/variant-comparison.component';

type TabKey =
  | 'playground'
  | 'variants'
  | 'api-reference'
  | 'usage'
  | 'performance'
  | 'accessibility';

type ViewportPreset = { key: string; label: string; width: number; height: number };

@Component({
  selector: 'app-inputs',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    UiLibInput,
    Button,
    Tabs,
    Tab,
    DocPageLayoutComponent,
    DocDemoViewportComponent,
    ThemeScopeDirective,
    Card,
    DocCodeSnippetComponent,
    CodePreviewComponent,
    VariantComparisonComponent,
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

  public readonly activeTab = signal<TabKey>('playground');

  public setTab(tab: TabKey): void {
    this.activeTab.set(tab);
  }

  public onTabChange(value: TabsValue | null): void {
    if (value === null) return;
    this.setTab(value as TabKey);
  }

  public readonly snippets = {
    usage: `import { UiLibInput } from 'ui-lib-custom';

@Component({
  standalone: true,
  imports: [UiLibInput],
  template: '<ui-lib-input label="Email" placeholder="you@example.com"></ui-lib-input>'
})
export class Example {}`,
  } as const;

  private readonly themeService = inject(ThemeConfigService);

  public readonly variant = signal<InputVariant>('material');
  public readonly inputType = signal<InputType>('text');
  public readonly labelFloat = signal<InputLabelFloat>('over');
  public readonly value = signal('');
  public readonly password = signal('');
  public readonly error = signal('');
  public readonly showCounter = signal(true);
  public readonly showClear = signal(true);
  public readonly showToggle = signal(true);
  public readonly required = signal(true);
  public readonly label = signal('Email');
  public readonly placeholder = signal('you@example.com');
  public readonly useGlobalVariant = signal(true);

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

  private readonly globalVars = computed(() => {
    const preset = this.themeService.preset();
    return this.themeService.getCssVars(preset);
  });

  public readonly appliedTheme = computed(() => this.globalVars());

  constructor() {
    effect(() => {
      if (!this.useGlobalVariant()) return;
      const v = this.themeService.preset().variant as InputVariant;
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
      const v = this.themeService.preset().variant as InputVariant;
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

  public readonly inputExample = `<ui-lib-input label="Email" placeholder="you@example.com" />`;
}
