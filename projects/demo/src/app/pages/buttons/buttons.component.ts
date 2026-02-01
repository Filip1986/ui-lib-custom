import { Component, ChangeDetectionStrategy, signal, computed, inject, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Button, ButtonAppearance, ButtonColor, ButtonSize, ButtonVariant, IconButton, IconPosition, ThemeConfigService } from 'ui-lib-custom';
import { DocPageLayoutComponent } from '@demo/shared/doc-page/doc-page-layout.component';
import { DocSection } from '@demo/shared/doc-page/doc-section.model';
import { DocDemoViewportComponent } from '@demo/shared/doc-page/doc-demo-viewport.component';
import { ThemeScopeDirective } from '@demo/shared/theme-scope.directive';
import { DocControlGroupComponent } from '@demo/shared/doc-page/doc-control-group.component';

@Component({
  selector: 'app-buttons',
  imports: [CommonModule, Button, IconButton, DocPageLayoutComponent, DocControlGroupComponent, DocDemoViewportComponent, ThemeScopeDirective],
  templateUrl: './buttons.component.html',
  styleUrl: './buttons.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonsComponent {
  readonly sections: DocSection[] = [
    { id: 'playground', label: 'Playground' },
    { id: 'properties', label: 'Properties' },
  ];

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
}
