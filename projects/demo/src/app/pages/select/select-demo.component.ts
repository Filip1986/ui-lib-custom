import { CommonModule } from '@angular/common';
import type { Signal, WritableSignal } from '@angular/core';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  signal,
  ViewChild,
  viewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';

import { Button } from 'ui-lib-custom/button';
import { Panel } from 'ui-lib-custom/panel';
import type { SelectOption, SelectVariant } from 'ui-lib-custom/select';
import { UiLibSelect } from 'ui-lib-custom/select';
import type { TabsValue } from 'ui-lib-custom/tabs';
import { Tab, Tabs } from 'ui-lib-custom/tabs';
import { ThemeConfigService } from 'ui-lib-custom/theme';

import { SelectBasicExampleComponent } from '@demo/examples/select-basic-example.component';
import { VariantComparisonComponent } from '@demo/shared/components/variant-comparison/variant-comparison.component';
import type { ApiPropRow } from '@demo/shared/doc-page/doc-api-reference.component';
import { DocApiReferenceComponent } from '@demo/shared/doc-page/doc-api-reference.component';
import type { AriaRow } from '@demo/shared/doc-page/doc-aria-table.component';
import { DocAriaTableComponent } from '@demo/shared/doc-page/doc-aria-table.component';
import { DocCodeExampleComponent } from '@demo/shared/doc-page/doc-code-example.component';
import type { CssVarRow } from '@demo/shared/doc-page/doc-css-vars-table.component';
import { DocCssVarsTableComponent } from '@demo/shared/doc-page/doc-css-vars-table.component';
import { DocDemoViewportComponent } from '@demo/shared/doc-page/doc-demo-viewport.component';
import type { KeyboardNavRow } from '@demo/shared/doc-page/doc-keyboard-nav.component';
import { DocKeyboardNavComponent } from '@demo/shared/doc-page/doc-keyboard-nav.component';
import { DocPageHeaderComponent } from '@demo/shared/doc-page/doc-page-header.component';
import { DocPageLayoutComponent } from '@demo/shared/doc-page/doc-page-layout.component';
import type { ComponentQualityAudit } from '@demo/shared/doc-page/doc-quality-badge.component';
import { DocQualityBadgeComponent } from '@demo/shared/doc-page/doc-quality-badge.component';
import { DocSectionComponent } from '@demo/shared/doc-page/doc-section.component';
import type { DocSection } from '@demo/shared/doc-page/doc-section.model';
import { DocTocComponent } from '@demo/shared/doc-page/doc-toc.component';
import { ThemeScopeDirective } from '@demo/shared/theme-scope.directive';

import { selectExampleHtml, selectExampleTs, usageHtml, usageTs } from './snippets.generated';
type TabKey =
  | 'playground'
  | 'variants'
  | 'edge-cases'
  | 'api-reference'
  | 'usage'
  | 'performance'
  | 'accessibility';

type ViewportPreset = { key: string; label: string; width: number; height: number };

/**
 * Demo page for select component usage.
 */
@Component({
  selector: 'app-select-demo',
  standalone: true,
  imports: [
    Panel,
    CommonModule,
    FormsModule,
    UiLibSelect,
    Button,
    Tabs,
    Tab,
    DocPageHeaderComponent,
    DocPageLayoutComponent,
    DocDemoViewportComponent,
    ThemeScopeDirective,
    VariantComparisonComponent,
    SelectBasicExampleComponent,
    DocTocComponent,
    DocQualityBadgeComponent,
    DocKeyboardNavComponent,
    DocAriaTableComponent,
    DocCodeExampleComponent,
    DocApiReferenceComponent,
    DocSectionComponent,

    DocCssVarsTableComponent,
  ],
  templateUrl: './select-demo.component.html',
  styleUrl: './select-demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectDemoComponent {
  public readonly selectExampleHtml: string = selectExampleHtml;
  public readonly selectExampleTs: string = selectExampleTs;
  public readonly usageHtml: string = usageHtml;
  public readonly usageTs: string = usageTs;

  public readonly qualityAudit: ComponentQualityAudit = {
    date: '2026-05-25',
    tier: 1,
    scores: {
      api: 9,
      a11y: 9,
      perf: 9,
      comp: 10,
      theme: 9,
      dx: 9,
      docs: 9,
      polish: 9,
      angular: 9,
      feel: 9,
    },
    competitiveParity: 'pending',
    apgPattern: { name: 'Combobox', url: 'https://www.w3.org/WAI/ARIA/apg/patterns/combobox/' },
  };

  public readonly layout: Signal<DocPageLayoutComponent | undefined> =
    viewChild(DocPageLayoutComponent);

  public scrollTo(id: string): void {
    this.layout()?.scrollToSection(id);
  }

  public readonly importCode: string = "import { UiLibSelect } from 'ui-lib-custom/select'";

  public readonly sections: DocSection[] = [
    { id: 'playground', label: 'Playground' },
    { id: 'variants', label: 'Variants' },
    { id: 'edge-cases', label: 'Edge Cases' },
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

  public readonly emptyOptions: SelectOption[] = [];

  public readonly invalidValue: WritableSignal<string | null> = signal<string | null>(null);

  public readonly largeOptions: SelectOption[] = Array.from(
    { length: 150 },
    (_: unknown, index: number): SelectOption => ({
      label: `Option ${index + 1}`,
      value: `opt-${index + 1}`,
      group: `Group ${Math.floor(index / 30) + 1}`,
      disabled: index % 17 === 0,
    }),
  );

  private readonly globalVars: Signal<Record<string, string>> = computed<Record<string, string>>(
    (): Record<string, string> => {
      const preset: ReturnType<ThemeConfigService['preset']> = this.themeService.preset();
      return this.themeService.getCssVars(preset);
    },
  );

  public readonly appliedTheme: Signal<Record<string, string>> = computed<Record<string, string>>(
    (): Record<string, string> => this.globalVars(),
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

  public readonly ariaRows: readonly AriaRow[] = [
    {
      element: 'Select trigger',
      attribute: 'role',
      value: '"combobox"',
      notes: 'The trigger button uses the combobox role to indicate it opens a list.',
    },
    {
      element: 'Select trigger',
      attribute: 'aria-expanded',
      value: '"true" | "false"',
      notes: 'Reflects whether the dropdown list is open.',
    },
    {
      element: 'Select trigger',
      attribute: 'aria-haspopup',
      value: '"listbox"',
      notes: 'Signals that the trigger opens a listbox.',
    },
    {
      element: 'Select trigger',
      attribute: 'aria-activedescendant',
      value: 'option-id',
      notes: 'Points to the currently focused option in the list.',
    },
    {
      element: 'Dropdown list',
      attribute: 'role',
      value: '"listbox"',
      notes: 'The options panel uses the listbox role.',
    },
    { element: 'Option', attribute: 'role', value: '"option"', notes: 'Each item is an option.' },
    {
      element: 'Option',
      attribute: 'aria-selected',
      value: '"true" | "false"',
      notes: 'Reflects the selected state of each option.',
    },
  ];

  public readonly keyboardRows: KeyboardNavRow[] = [
    { key: 'Enter / Space / ↓', suffix: 'on trigger', action: 'Opens the dropdown panel.' },
    { key: '↓ / ↑', suffix: 'in panel', action: 'Move focus to the next or previous option.' },
    { key: 'Home / End', suffix: 'in panel', action: 'Jump to the first or last option.' },
    {
      key: 'Enter / Space',
      suffix: 'on option',
      action: 'Select the focused option and close the panel.',
    },
    { key: 'Escape', action: 'Close the panel without selecting and return focus to the trigger.' },
  ];

  public readonly apiRows: readonly ApiPropRow[] = [
    {
      name: 'options',
      type: 'SelectOption[]',
      default: '[]',
      description: 'Array of option objects.',
    },
    {
      name: 'variant',
      type: "'material' | 'bootstrap' | 'minimal' | null",
      default: 'null',
      description: 'Design variant.',
    },
    { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Select size.' },
    { name: 'multiple', type: 'boolean', default: 'false', description: 'Allows multi-selection.' },
    {
      name: 'searchable',
      type: 'boolean',
      default: 'false',
      description: 'Adds a search input inside the dropdown.',
    },
    {
      name: 'placeholder',
      type: 'string',
      default: "'Select...'",
      description: 'Placeholder text.',
    },
    { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables the select.' },
    {
      name: 'label',
      type: 'string',
      default: "''",
      description: 'Visible label rendered above the select.',
    },
    {
      name: 'invalid',
      type: 'boolean',
      default: 'false',
      description: 'Marks the field as invalid.',
    },
  ];
  public readonly cssVarRows: CssVarRow[] = [
    {
      variable: '--uilib-select-focus-ring-color',
      description: 'Focus ring colour (default: primary-500).',
    },
    {
      variable: '--uilib-select-focus-ring-width',
      description: 'Focus ring outline width (default: 2px).',
    },
    {
      variable: '--uilib-select-label-font-weight',
      description: 'Label font weight (default: 600).',
    },
    {
      variable: '--uilib-select-label-gap',
      description: 'Gap between label and control (default: 0.35rem).',
    },
    {
      variable: '--uilib-select-control-gap',
      description: 'Gap between value and actions area (default: 0.5rem).',
    },
    {
      variable: '--uilib-select-option-gap',
      description: 'Gap between option icon/check and label (default: 0.5rem).',
    },
    {
      variable: '--uilib-select-option-selected-font-weight',
      description: 'Font weight of selected option rows (default: 600).',
    },
    {
      variable: '--uilib-select-option-hover',
      description: 'Option row background on hover / keyboard focus.',
    },
    {
      variable: '--uilib-select-panel-max-height',
      description: 'Max height of the dropdown panel (default: 260px).',
    },
    { variable: '--uilib-select-panel-z-index', description: 'Z-index of the dropdown panel.' },
    {
      variable: '--uilib-select-padding-y-base',
      description: 'Base vertical padding (scaled by density).',
    },
    {
      variable: '--uilib-select-padding-x-base',
      description: 'Base horizontal padding (scaled by density).',
    },
    {
      variable: '--uilib-select-search-padding-y-base',
      description: 'Base vertical padding for search wrapper.',
    },
    {
      variable: '--uilib-select-search-padding-x-base',
      description: 'Base horizontal padding for search wrapper.',
    },
    {
      variable: '--uilib-select-option-padding-y-base',
      description: 'Base vertical padding for option rows.',
    },
    {
      variable: '--uilib-select-option-padding-x-base',
      description: 'Base horizontal padding for option rows.',
    },
    {
      variable: '--uilib-select-group-padding-y-base',
      description: 'Base vertical padding for group header.',
    },
    {
      variable: '--uilib-select-group-padding-x-base',
      description: 'Base horizontal padding for group header.',
    },
    {
      variable: '--uilib-select-empty-padding-base',
      description: 'Base padding for the empty-state message.',
    },
    { variable: '--uilib-select-bg', description: 'Control and search input background colour.' },
    { variable: '--uilib-select-border', description: 'Control border colour.' },
    { variable: '--uilib-select-dropdown-bg', description: 'Dropdown panel background colour.' },
    { variable: '--uilib-select-dropdown-shadow', description: 'Dropdown panel box shadow.' },
    {
      variable: '--uilib-select-option-selected',
      description: 'Background of a selected option row.',
    },
  ];
}
