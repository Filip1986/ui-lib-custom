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

type TabKey = 'playground' | 'api-reference' | 'usage' | 'performance';

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
  ],
  templateUrl: './inputs.component.html',
  styleUrl: './inputs.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputsComponent {
  readonly sections: DocSection[] = [
    { id: 'playground', label: 'Playground' },
    { id: 'api-reference', label: 'API Reference' },
    { id: 'usage', label: 'Usage' },
    { id: 'performance', label: 'Performance Features' },
  ];

  activeTab = signal<TabKey>('playground');

  setTab(tab: TabKey) {
    this.activeTab.set(tab);
  }

  onTabChange(value: TabsValue | null) {
    if (value === null) return;
    this.setTab(value as TabKey);
  }

  readonly snippets = {
    usage: `import { UiLibInput } from 'ui-lib-custom';

@Component({
  standalone: true,
  imports: [UiLibInput],
  template: '<ui-lib-input label="Email" placeholder="you@example.com"></ui-lib-input>'
})
export class Example {}`,
  } as const;

  private readonly themeService = inject(ThemeConfigService);

  variant = signal<InputVariant>('material');
  inputType = signal<InputType>('text');
  labelFloat = signal<InputLabelFloat>('over');
  value = signal('');
  password = signal('');
  error = signal('');
  showCounter = signal(true);
  showClear = signal(true);
  showToggle = signal(true);
  required = signal(true);
  label = signal('Email');
  placeholder = signal('you@example.com');
  useGlobalVariant = signal(true);

  variants: InputVariant[] = ['material', 'bootstrap', 'minimal'];
  types: InputType[] = ['text', 'email', 'password', 'number', 'search', 'tel', 'url'];
  labelFloats: InputLabelFloat[] = ['over', 'in', 'on'];

  private readonly globalVars = computed(() => {
    const preset = this.themeService.preset();
    return this.themeService.getCssVars(preset);
  });

  readonly appliedTheme = computed(() => this.globalVars());

  constructor() {
    effect(() => {
      if (!this.useGlobalVariant()) return;
      const v = this.themeService.preset().variant as InputVariant;
      this.variant.set(v);
    });
  }

  onSubmit(form: NgForm) {
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

  setVariant(v: InputVariant) {
    this.useGlobalVariant.set(false);
    this.variant.set(v);
  }

  setFollowThemeVariant(on: boolean) {
    this.useGlobalVariant.set(on);
    if (on) {
      const v = this.themeService.preset().variant as InputVariant;
      this.variant.set(v);
    }
  }

  setType(t: InputType) {
    this.inputType.set(t);
  }

  setLabelFloat(mode: InputLabelFloat) {
    this.labelFloat.set(mode);
  }

  @ViewChild(DocDemoViewportComponent) viewport?: DocDemoViewportComponent;

  get viewportPresets() {
    return this.viewport?.presets() ?? [];
  }

  viewportDisplayWidth() {
    return this.viewport?.displayWidth() ?? 0;
  }

  viewportDisplayHeight() {
    return this.viewport?.displayHeight() ?? 0;
  }

  viewportCustomWidth() {
    return this.viewport?.customWidth() ?? 0;
  }

  setViewportCustomWidth(value: number) {
    this.viewport?.setCustomWidth(value);
  }

  setViewportPreset(preset: { key: string; label: string; width: number; height: number }) {
    this.viewport?.setPreset(preset);
  }

  applyViewportCustom() {
    this.viewport?.setCustom();
  }

  rotateViewport() {
    this.viewport?.rotate();
  }

  setViewportDensity(value: 'default' | 'comfortable' | 'compact') {
    this.viewport?.setDensity(value);
  }
}
