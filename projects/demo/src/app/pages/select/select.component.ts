import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal, computed, inject, effect } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UiLibSelect, SelectOption, SelectVariant, ThemeConfigService, Button } from 'ui-lib-custom';
import { DocPageLayoutComponent } from '@demo/shared/doc-page/doc-page-layout.component';
import { DocSection } from '@demo/shared/doc-page/doc-section.model';
import { DocDemoViewportComponent } from '@demo/shared/doc-page/doc-demo-viewport.component';
import { ThemeScopeDirective } from '@demo/shared/theme-scope.directive';
import { DocControlGroupComponent } from '@demo/shared/doc-page/doc-control-group.component';

@Component({
  selector: 'app-select',
  standalone: true,
  imports: [CommonModule, FormsModule, UiLibSelect, Button, DocPageLayoutComponent, DocControlGroupComponent, DocDemoViewportComponent, ThemeScopeDirective],
  templateUrl: './select.component.html',
  styleUrl: './select.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectComponent {
  readonly sections: DocSection[] = [
    { id: 'playground', label: 'Playground' },
  ];

  private readonly themeService = inject(ThemeConfigService);

  variant = signal<SelectVariant>('material');
  searchable = signal(true);
  multiple = signal(false);
  disabled = signal(false);
  loading = signal(false);
  placeholder = signal('Choose an option');
  value = signal<unknown | unknown[] | null>(null);
  useGlobalVariant = signal(true);

  variants: SelectVariant[] = ['material', 'bootstrap', 'minimal'];

  options: SelectOption[] = [
    { label: 'Alpha', value: 'alpha', group: 'Group A' },
    { label: 'Beta', value: 'beta', group: 'Group A' },
    { label: 'Gamma', value: 'gamma', group: 'Group A' },
    { label: 'Delta', value: 'delta', group: 'Group B' },
    { label: 'Epsilon', value: 'epsilon', group: 'Group B' },
    { label: 'Zeta', value: 'zeta', group: 'Group B', disabled: true },
    { label: 'Unassigned', value: 'ungrouped' },
  ];

  private readonly globalVars = computed(() => {
    const preset = this.themeService.preset();
    return this.themeService.getCssVars(preset);
  });

  readonly appliedTheme = computed(() => this.globalVars());

  constructor() {
    effect(() => {
      if (!this.useGlobalVariant()) return;
      const v = this.themeService.preset().variant as SelectVariant;
      this.variant.set(v);
    });
  }

  setVariant(v: SelectVariant) {
    this.useGlobalVariant.set(false);
    this.variant.set(v);
  }

  setFollowThemeVariant(on: boolean) {
    this.useGlobalVariant.set(on);
    if (on) {
      const v = this.themeService.preset().variant as SelectVariant;
      this.variant.set(v);
    }
  }

  toggleMultiple(ev: boolean) {
    this.multiple.set(ev);
    this.value.set(ev ? [] : null);
  }

  toggleSearchable(ev: boolean) {
    this.searchable.set(ev);
  }

  toggleDisabled(ev: boolean) {
    this.disabled.set(ev);
  }

  toggleLoading(ev: boolean) {
    this.loading.set(ev);
  }

  onClear() {
    this.value.set(this.multiple() ? [] : null);
  }
}
