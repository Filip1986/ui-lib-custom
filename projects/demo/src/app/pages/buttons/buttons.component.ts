import { Component, ChangeDetectionStrategy, signal, computed, inject, effect, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  Button, ButtonAppearance, ButtonColor, ButtonSize, ButtonVariant,
  Card, IconButton, IconPosition, ThemeConfigService
} from 'ui-lib-custom';
import { DocPageLayoutComponent } from '@demo/shared/doc-page/doc-page-layout.component';
import { DocSection } from '@demo/shared/doc-page/doc-section.model';
import { DocDemoViewportComponent } from '@demo/shared/doc-page/doc-demo-viewport.component';
import { ThemeScopeDirective } from '@demo/shared/theme-scope.directive';
import { DocControlGroupComponent } from '@demo/shared/doc-page/doc-control-group.component';
import { FormsModule } from '@angular/forms';
import { DocCodeSnippetComponent } from '@demo/shared/doc-page/doc-code-snippet.component';

@Component({
  selector: 'app-buttons',
  imports: [CommonModule, Button, IconButton, DocPageLayoutComponent, DocControlGroupComponent, DocDemoViewportComponent, ThemeScopeDirective, Card, FormsModule, DocCodeSnippetComponent],
  templateUrl: './buttons.component.html',
  styleUrl: './buttons.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonsComponent {
  readonly sections: DocSection[] = [
    { id: 'playground', label: 'Playground' },
    { id: 'api-reference', label: 'API Reference' },
    { id: 'usage', label: 'Usage' },
    { id: 'performance', label: 'Performance Features' },
  ];

  activeTab = signal<'playground' | 'api-reference' | 'usage' | 'performance'>('playground');

  setTab(tab: 'playground' | 'api-reference' | 'usage' | 'performance') {
    this.activeTab.set(tab);
  }

  readonly snippets = {
    usage: `import { Button } from 'ui-lib-custom';

@Component({
  standalone: true,
  imports: [Button],
  template: '<ui-lib-button color="primary">Click me</ui-lib-button>'
})
export class Example {}`,
  } as const;

  private readonly themeService = inject(ThemeConfigService);

  variant = signal<ButtonVariant>('material');
  appearance = signal<ButtonAppearance>('solid');
  size = signal<ButtonSize>('medium');
  color = signal<ButtonColor>('primary');
  disabled = signal(false);
  loading = signal(false);
  fullWidth = signal(false);
  iconPosition = signal<IconPosition>('left');
  label = signal('Click me');

  useGlobalVariant = signal(true);
  useLocalTheme = signal(false);
  localPrimary = signal('');
  localSurface = signal('');

  readonly variants: ButtonVariant[] = ['material', 'bootstrap', 'minimal'];
  readonly appearances: ButtonAppearance[] = ['solid', 'outline', 'ghost'];
  readonly sizes: ButtonSize[] = ['small', 'medium', 'large'];
  readonly colors: ButtonColor[] = ['primary', 'secondary', 'success', 'danger', 'warning'];
  readonly iconPositions: IconPosition[] = ['left', 'right'];
  readonly demoIcon = signal('search');

  private readonly globalVars = computed(() => {
    const preset = this.themeService.preset();
    return this.themeService.getCssVars(preset);
  });
  private readonly localVars = computed(() => {
    const vars: Record<string, string> = {};
    if (this.localPrimary().trim()) {
      vars['--uilib-button-primary-bg'] = this.localPrimary().trim();
      vars['--uilib-button-primary-bg-hover'] = this.localPrimary().trim();
      vars['--uilib-button-primary-bg-active'] = this.localPrimary().trim();
    }
    if (this.localSurface().trim()) {
      vars['--uilib-card-bg'] = this.localSurface().trim();
      vars['--uilib-surface'] = this.localSurface().trim();
    }
    return vars;
  });

  readonly appliedTheme = computed(() => {
    const base = this.globalVars();
    if (!this.useLocalTheme()) return base;
    return { ...base, ...this.localVars() };
  });

  constructor() {
    effect(() => {
      if (!this.useGlobalVariant()) return;
      const v = this.themeService.preset().variant as ButtonVariant;
      this.variant.set(v);
    });
  }

  resetLocalTheme() {
    this.localPrimary.set('');
    this.localSurface.set('');
  }

  selectVariant(v: ButtonVariant) {
    this.useGlobalVariant.set(false);
    this.variant.set(v);
  }

  setFollowThemeVariant(on: boolean) {
    this.useGlobalVariant.set(on);
    if (on) {
      const v = this.themeService.preset().variant as ButtonVariant;
      this.variant.set(v);
    }
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
