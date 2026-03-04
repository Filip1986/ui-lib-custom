import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  signal,
  computed,
  inject,
  effect,
  ViewChild,
} from '@angular/core';
import type { Signal, WritableSignal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UiLibSelect, ThemeConfigService, Button, Card, Tabs, Tab } from 'ui-lib-custom';
import type { SelectOption, SelectVariant, TabsValue } from 'ui-lib-custom';
import { DocPageLayoutComponent } from '@demo/shared/doc-page/doc-page-layout.component';
import type { DocSection } from '@demo/shared/doc-page/doc-section.model';
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

/**
 * Demo page for select component usage.
 */
@Component({
  selector: 'app-select',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    UiLibSelect,
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
  templateUrl: './select.component.html',
  styleUrl: './select.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectComponent {
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
    usage: `import { UiLibSelect } from 'ui-lib-custom';

@Component({
  standalone: true,
  imports: [UiLibSelect],
  template: '<ui-lib-select [options]="[{ label: \'One\', value: 1 }]" label="Choose"></ui-lib-select>'
})
export class Example {}`,
  } as const;

  public readonly selectExample: string = `<ui-lib-select label="Choose" [options]="options"></ui-lib-select>`;

  private readonly themeService: ThemeConfigService = inject(ThemeConfigService);

  public readonly variant: WritableSignal<SelectVariant> = signal<SelectVariant>('material');
  public readonly searchable: WritableSignal<boolean> = signal<boolean>(true);
  public readonly multiple: WritableSignal<boolean> = signal<boolean>(false);
  public readonly disabled: WritableSignal<boolean> = signal<boolean>(false);
  public readonly loading: WritableSignal<boolean> = signal<boolean>(false);
  public readonly placeholder: WritableSignal<string> = signal<string>('Choose an option');
  public readonly value: WritableSignal<SelectOption['value'] | SelectOption['value'][] | null> =
    signal<SelectOption['value'] | SelectOption['value'][] | null>(null);
  public readonly useGlobalVariant: WritableSignal<boolean> = signal<boolean>(true);

  public readonly variants: SelectVariant[] = ['material', 'bootstrap', 'minimal'];

  public readonly options: SelectOption[] = [
    { label: 'Alpha', value: 'alpha', group: 'Group A' },
    { label: 'Beta', value: 'beta', group: 'Group A' },
    { label: 'Gamma', value: 'gamma', group: 'Group A' },
    { label: 'Delta', value: 'delta', group: 'Group B' },
    { label: 'Epsilon', value: 'epsilon', group: 'Group B' },
    { label: 'Zeta', value: 'zeta', group: 'Group B', disabled: true },
    { label: 'Unassigned', value: 'ungrouped' },
  ];

  private readonly globalVars: Signal<Record<string, string>> = computed<Record<string, string>>(
    (): Record<string, string> => {
      const preset: ReturnType<ThemeConfigService['preset']> = this.themeService.preset();
      return this.themeService.getCssVars(preset);
    }
  );

  public readonly appliedTheme: Signal<Record<string, string>> = computed<Record<string, string>>(
    (): Record<string, string> => this.globalVars()
  );

  @ViewChild(DocDemoViewportComponent) public viewport?: DocDemoViewportComponent;

  constructor() {
    effect((): void => {
      if (!this.useGlobalVariant()) return;
      const v: SelectVariant = this.themeService.preset().variant as SelectVariant;
      this.variant.set(v);
    });
  }

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

  public setVariant(v: SelectVariant): void {
    this.useGlobalVariant.set(false);
    this.variant.set(v);
  }

  public setFollowThemeVariant(on: boolean): void {
    this.useGlobalVariant.set(on);
    if (on) {
      const v: SelectVariant = this.themeService.preset().variant as SelectVariant;
      this.variant.set(v);
    }
  }

  public toggleMultiple(ev: boolean): void {
    this.multiple.set(ev);
    this.value.set(ev ? [] : null);
  }

  public toggleSearchable(ev: boolean): void {
    this.searchable.set(ev);
  }

  public toggleDisabled(ev: boolean): void {
    this.disabled.set(ev);
  }

  public toggleLoading(ev: boolean): void {
    this.loading.set(ev);
  }

  public onClear(): void {
    this.value.set(this.multiple() ? [] : null);
  }
}
