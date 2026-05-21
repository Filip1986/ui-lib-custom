import {
  ChangeDetectionStrategy,
  Component,
  ViewChild,
  computed,
  effect,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import type { Signal, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tabs, Tab, TabLabel, TabContent } from 'ui-lib-custom/tabs';
import type {
  TabsAlignment,
  TabsLazyMode,
  TabsOrientation,
  TabsSize,
  TabsValue,
  TabsVariant,
  TabsScrollBehavior,
  TabsMode,
} from 'ui-lib-custom/tabs';
import { Button } from 'ui-lib-custom/button';
import { Icon } from 'ui-lib-custom/icon';
import { UiLibSelect } from 'ui-lib-custom/select';
import type { SelectOption } from 'ui-lib-custom/select';
import { Checkbox } from 'ui-lib-custom/checkbox';
import { ThemeConfigService } from 'ui-lib-custom/theme';
import { DocPageHeaderComponent } from '@demo/shared/doc-page/doc-page-header.component';
import { DocPageLayoutComponent } from '@demo/shared/doc-page/doc-page-layout.component';
import type { DocSection } from '@demo/shared/doc-page/doc-section.model';
import { DocQualityBadgeComponent } from '@demo/shared/doc-page/doc-quality-badge.component';
import type { ComponentQualityAudit } from '@demo/shared/doc-page/doc-quality-badge.component';
import { DocKeyboardNavComponent } from '@demo/shared/doc-page/doc-keyboard-nav.component';
import type { KeyboardNavRow } from '@demo/shared/doc-page/doc-keyboard-nav.component';
import { DocDemoViewportComponent } from '@demo/shared/doc-page/doc-demo-viewport.component';
import { DocTocComponent } from '@demo/shared/doc-page/doc-toc.component';
import { ThemeScopeDirective } from '@demo/shared/theme-scope.directive';
import { VariantComparisonComponent } from '../../shared/components/variant-comparison/variant-comparison.component';
import { TabsBasicExampleComponent } from '@demo/examples/tabs-basic-example.component';
import { DocCodeExampleComponent } from '@demo/shared/doc-page/doc-code-example.component';

import { Panel } from 'ui-lib-custom/panel';
import { DocApiReferenceComponent } from '@demo/shared/doc-page/doc-api-reference.component';
import type { ApiPropRow } from '@demo/shared/doc-page/doc-api-reference.component';
import {
  tabsExampleHtml,
  tabsExampleTs,
  basicHtml,
  basicTs,
  iconsHtml,
  iconsTs,
  verticalHtml,
  verticalTs,
  closableHtml,
  closableTs,
  controlledHtml,
  controlledTs,
  scrollableHtml,
  scrollableTs,
  tabMenuHtml,
  tabMenuTs,
  perTabLazyHtml,
  perTabLazyTs,
} from './snippets.generated';
import { DocSectionComponent } from '../../shared/doc-page/doc-section.component';
import { DocCssVarsTableComponent } from '../../shared/doc-page/doc-css-vars-table.component';
import type { CssVarRow } from '../../shared/doc-page/doc-css-vars-table.component';
interface DemoTab {
  value: TabsValue;
  label: string;
  icon?: string;
  disabled?: boolean;
  closable?: boolean;
  content: string;
}

interface NavTabItem {
  value: string;
  label: string;
  icon: string;
}

type TabKey = 'playground' | 'variants' | 'api-reference' | 'usage' | 'accessibility';
type PerTabLazyOption = TabsLazyMode | 'inherit';

/**
 * Demo page for tabs component usage.
 */
@Component({
  selector: 'app-tabs-demo',
  standalone: true,
  imports: [
    Panel,
    DocPageHeaderComponent,
    CommonModule,
    FormsModule,
    Tabs,
    Tab,
    TabLabel,
    TabContent,
    Button,
    Icon,
    UiLibSelect,
    Checkbox,
    DocPageLayoutComponent,
    DocDemoViewportComponent,
    DocTocComponent,
    ThemeScopeDirective,
    VariantComparisonComponent,
    TabsBasicExampleComponent,
    DocQualityBadgeComponent,
    DocKeyboardNavComponent,
    DocCodeExampleComponent,
    DocApiReferenceComponent,
    DocSectionComponent,

    DocCssVarsTableComponent,
  ],
  templateUrl: './tabs.component.html',
  styleUrl: './tabs.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabsComponent {
  public readonly tabsExampleHtml: string = tabsExampleHtml;
  public readonly tabsExampleTs: string = tabsExampleTs;
  public readonly basicHtml: string = basicHtml;
  public readonly basicTs: string = basicTs;
  public readonly iconsHtml: string = iconsHtml;
  public readonly iconsTs: string = iconsTs;
  public readonly verticalHtml: string = verticalHtml;
  public readonly verticalTs: string = verticalTs;
  public readonly closableHtml: string = closableHtml;
  public readonly closableTs: string = closableTs;
  public readonly controlledHtml: string = controlledHtml;
  public readonly controlledTs: string = controlledTs;
  public readonly scrollableHtml: string = scrollableHtml;
  public readonly scrollableTs: string = scrollableTs;
  public readonly tabMenuHtml: string = tabMenuHtml;
  public readonly tabMenuTs: string = tabMenuTs;
  public readonly perTabLazyHtml: string = perTabLazyHtml;
  public readonly perTabLazyTs: string = perTabLazyTs;

  public readonly layout: Signal<DocPageLayoutComponent | undefined> =
    viewChild(DocPageLayoutComponent);

  public readonly qualityAudit: ComponentQualityAudit = {
    date: '2026-05-18',
    tier: 1,
    scores: {
      api: 9,
      a11y: 9,
      perf: 9,
      comp: 9,
      theme: 9,
      dx: 9,
      docs: 9,
      polish: 9,
      angular: 9,
      feel: 9,
    },
    apgPattern: { name: 'Tabs', url: 'https://www.w3.org/WAI/ARIA/apg/patterns/tabs/' },
    competitiveParity: 'pending',
  };

  public scrollTo(id: string): void {
    this.layout()?.scrollToSection(id);
  }

  public readonly importCode: string =
    "import { Tabs, Tab, TabLabel, TabContent } from 'ui-lib-custom/tabs'";
  public readonly sections: DocSection[] = [
    { id: 'playground', label: 'Playground' },
    { id: 'variants', label: 'Variants' },
    { id: 'api-reference', label: 'API Reference' },
    { id: 'usage', label: 'Usage' },
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

  public readonly variants: TabsVariant[] = ['material', 'bootstrap', 'minimal'];
  public readonly sizes: TabsSize[] = ['small', 'medium', 'large'];
  public readonly orientations: TabsOrientation[] = ['horizontal', 'vertical'];
  public readonly aligns: TabsAlignment[] = ['start', 'center', 'end', 'stretch'];
  public readonly lazyModes: TabsLazyMode[] = [false, 'unmount', 'keep-alive'];

  public readonly variant: WritableSignal<TabsVariant> = signal<TabsVariant>('material');
  public readonly size: WritableSignal<TabsSize> = signal<TabsSize>('medium');
  public readonly orientation: WritableSignal<TabsOrientation> =
    signal<TabsOrientation>('horizontal');
  public readonly align: WritableSignal<TabsAlignment> = signal<TabsAlignment>('start');
  public readonly closable: WritableSignal<boolean> = signal<boolean>(false);
  public readonly lazy: WritableSignal<TabsLazyMode> = signal<TabsLazyMode>(false);
  public readonly disabledAll: WritableSignal<boolean> = signal<boolean>(false);
  public readonly scrollable: WritableSignal<boolean> = signal<boolean>(false);
  public readonly menuMode: WritableSignal<boolean> = signal<boolean>(false);
  public readonly perTabLazy: WritableSignal<PerTabLazyOption> =
    signal<PerTabLazyOption>('inherit');
  public readonly perTabLazyOptions: SelectOption[] = [
    { label: 'Inherit', value: 'inherit' },
    { label: 'Off', value: false },
    { label: 'Unmount', value: 'unmount' },
    { label: 'Keep alive', value: 'keep-alive' },
  ];

  public readonly playgroundTabs: WritableSignal<DemoTab[]> = signal<DemoTab[]>([
    { value: 'overview', label: 'Overview', content: 'High-level summary of the selected topic.' },
    { value: 'details', label: 'Details', content: 'Deeper dive content for the tab selection.' },
    {
      value: 'disabled',
      label: 'Disabled',
      content: 'This tab is disabled to demonstrate state.',
      disabled: true,
    },
  ]);

  public readonly iconTabs: DemoTab[] = [
    { value: 'home', label: 'Home', icon: 'home', content: 'Home overview content.' },
    { value: 'activity', label: 'Activity', icon: 'activity', content: 'Recent activity feed.' },
    {
      value: 'settings',
      label: 'Settings',
      icon: 'settings',
      content: 'User preferences and settings.',
    },
  ];

  public readonly iconTextTabs: DemoTab[] = [
    { value: 'profile', label: 'Profile', icon: 'user', content: 'User profile content.' },
    {
      value: 'notifications',
      label: 'Notifications',
      icon: 'bell',
      content: 'Notification center content.',
    },
    {
      value: 'billing',
      label: 'Billing',
      icon: 'credit-card',
      content: 'Billing and invoices content.',
    },
  ];

  public readonly verticalTabs: DemoTab[] = [
    { value: 'analytics', label: 'Analytics', content: 'KPI overview dashboard.' },
    { value: 'reports', label: 'Reports', content: 'Saved and scheduled reports.' },
    { value: 'integrations', label: 'Integrations', content: 'Connected services and APIs.' },
  ];

  public readonly closableTabs: WritableSignal<DemoTab[]> = signal<DemoTab[]>([
    { value: 'alpha', label: 'Alpha', closable: true, content: 'Alpha content' },
    { value: 'beta', label: 'Beta', closable: true, content: 'Beta content' },
    { value: 'gamma', label: 'Gamma', closable: true, content: 'Gamma content' },
  ]);

  public readonly lazyTabs: DemoTab[] = [
    { value: 'summary', label: 'Summary', content: 'Summary content rendered lazily.' },
    { value: 'logs', label: 'Logs', content: 'Log stream loaded on demand.' },
    { value: 'history', label: 'History', content: 'Historical data loaded lazily.' },
  ];

  public readonly scrollTabs: DemoTab[] = Array.from(
    { length: 50 },
    (_: unknown, index: number): DemoTab => {
      const label: string = `Tab ${index + 1}`;
      return {
        value: `tab-${index + 1}`,
        label,
        content: `${label} content`,
      };
    }
  );

  public readonly navTabs: NavTabItem[] = [
    { value: '/overview', label: 'Overview', icon: 'home' },
    { value: '/billing', label: 'Billing', icon: 'activity' },
    { value: '/usage', label: 'Usage', icon: 'bookmark' },
    { value: '/settings', label: 'Settings', icon: 'settings' },
  ];
  public readonly navActive: WritableSignal<string> = signal<string>('/overview');

  public readonly controlledTabs: DemoTab[] = [
    { value: 'first', label: 'First', content: 'Controlled tab one.' },
    { value: 'second', label: 'Second', content: 'Controlled tab two.' },
    { value: 'third', label: 'Third', content: 'Controlled tab three.' },
  ];

  public readonly controlledIndex: WritableSignal<number> = signal<number>(0);
  public readonly controlledSelection: Signal<number> = computed<number>((): number =>
    this.controlledIndex()
  );

  public readonly playgroundTabsResolved: Signal<DemoTab[]> = computed<DemoTab[]>((): DemoTab[] =>
    this.scrollable() ? this.scrollTabs : this.playgroundTabs()
  );

  public readonly playgroundScrollBehavior: Signal<TabsScrollBehavior> =
    computed<TabsScrollBehavior>((): TabsScrollBehavior => (this.scrollable() ? 'arrows' : 'auto'));

  public readonly playgroundMode: Signal<TabsMode> = computed<TabsMode>(
    (): TabsMode => (this.menuMode() ? 'navigation' : 'default')
  );

  public readonly playgroundPerTabLazy: Signal<TabsLazyMode | undefined> = computed<
    TabsLazyMode | undefined
  >((): TabsLazyMode | undefined => {
    const selection: PerTabLazyOption = this.perTabLazy();
    return selection === 'inherit' ? undefined : selection;
  });

  public readonly track: (index: number, item: unknown) => TabsValue | number = (
    index: number,
    item: unknown
  ): TabsValue | number =>
    item && typeof item === 'object' && 'value' in (item as { value?: unknown })
      ? (item as { value: TabsValue }).value
      : index;

  public readonly appliedTheme: Signal<Record<string, string>> = computed<Record<string, string>>(
    (): Record<string, string> => this.themeService.getCssVars(this.themeService.preset())
  );

  @ViewChild(DocDemoViewportComponent) public viewport?: DocDemoViewportComponent;

  constructor() {
    effect((): void => {
      const variant: TabsVariant = this.themeService.preset().variant as TabsVariant;
      this.variant.set(variant);
    });
  }

  public setVariant(variant: TabsVariant): void {
    this.variant.set(variant);
  }

  public setSize(size: TabsSize): void {
    this.size.set(size);
  }

  public setOrientation(orientation: TabsOrientation): void {
    this.orientation.set(orientation);
  }

  public setAlign(align: TabsAlignment): void {
    this.align.set(align);
  }

  public setLazy(mode: TabsLazyMode): void {
    this.lazy.set(mode);
  }

  public setScrollable(enabled: boolean): void {
    this.scrollable.set(enabled);
  }

  public setMenuMode(enabled: boolean): void {
    this.menuMode.set(enabled);
  }

  public setPerTabLazy(selection: PerTabLazyOption): void {
    this.perTabLazy.set(selection);
  }

  public toggleClosable(on: boolean): void {
    this.closable.set(on);
  }

  public toggleDisabled(on: boolean): void {
    this.disabledAll.set(on);
  }

  public onCloseTab(payload: { value: TabsValue | null; index: number }): void {
    this.closableTabs.update((tabs: DemoTab[]): DemoTab[] =>
      tabs.filter((tab: DemoTab): boolean => tab.value !== payload.value)
    );
  }

  public resetClosableTabs(): void {
    this.closableTabs.set([
      { value: 'alpha', label: 'Alpha', closable: true, content: 'Alpha content' },
      { value: 'beta', label: 'Beta', closable: true, content: 'Beta content' },
      { value: 'gamma', label: 'Gamma', closable: true, content: 'Gamma content' },
    ]);
  }

  public onControlledChange(payload: { value: TabsValue | null; index: number }): void {
    this.controlledIndex.set(payload.index);
  }

  public onNavigate(value: TabsValue | null): void {
    if (typeof value === 'string') {
      this.navActive.set(value);
    }
  }

  public selectControlled(index: number): void {
    this.controlledIndex.set(index);
  }

  public readonly keyboardRows: KeyboardNavRow[] = [
    {
      key: '← / →',
      action: 'Move focus between tab headers. Activates the focused tab automatically.',
    },
    { key: 'Home / End', action: 'Move focus to the first or last tab header.' },
    { key: 'Tab', action: 'Move focus from the tab list into the active panel content.' },
    { key: 'Shift+Tab', action: 'Return focus from panel content to the tab list.' },
  ];

  public readonly apiRows: readonly ApiPropRow[] = [
    {
      name: 'variant',
      type: "'material' | 'bootstrap' | 'minimal' | null",
      default: 'null',
      description: 'Design variant.',
    },
    { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Tab strip size.' },
    {
      name: 'orientation',
      type: "'horizontal' | 'vertical'",
      default: "'horizontal'",
      description: 'Orientation of the tab list.',
    },
    {
      name: 'activation',
      type: "'auto' | 'manual'",
      default: "'auto'",
      description: 'Tab activation mode.',
    },
    {
      name: 'ariaLabel',
      type: 'string | null',
      default: 'null',
      description: 'ARIA label for the tab list.',
    },
    {
      name: 'defaultValue',
      type: 'string | number | null',
      default: 'null',
      description: 'Initially selected tab value.',
    },
    {
      name: 'selectedValue',
      type: 'string | number | null',
      default: 'null',
      description: 'Controlled selected tab value.',
    },
    {
      name: 'closable',
      type: 'boolean',
      default: 'false',
      description: 'Shows a close button on each tab.',
    },
    { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables all tabs.' },
  ];
  public readonly cssVarRows: CssVarRow[] = [
    { variable: '--uilib-tabs-bg-resolved', description: 'Bg Resolved.' },
    { variable: '--uilib-tabs-border-resolved', description: 'Border Resolved.' },
    { variable: '--uilib-tabs-border-width-resolved', description: 'Border Width Resolved.' },
    { variable: '--uilib-tabs-border-style-resolved', description: 'Border Style Resolved.' },
    { variable: '--uilib-tabs-radius-resolved', description: 'Radius Resolved.' },
    { variable: '--uilib-tabs-gap-resolved', description: 'Gap Resolved.' },
    { variable: '--uilib-tabs-padding-base', description: 'Padding Base.' },
    { variable: '--uilib-tabs-padding-resolved', description: 'Padding Resolved.' },
    { variable: '--uilib-tab-padding-x-base', description: 'Uilib Tab Padding X Base.' },
    { variable: '--uilib-tab-padding-x-resolved', description: 'Uilib Tab Padding X Resolved.' },
    { variable: '--uilib-tab-padding-y-base', description: 'Uilib Tab Padding Y Base.' },
    { variable: '--uilib-tab-padding-y-resolved', description: 'Uilib Tab Padding Y Resolved.' },
    { variable: '--uilib-tab-gap-resolved', description: 'Uilib Tab Gap Resolved.' },
    { variable: '--uilib-tab-font-size-resolved', description: 'Uilib Tab Font Size Resolved.' },
    {
      variable: '--uilib-tab-font-weight-resolved',
      description: 'Uilib Tab Font Weight Resolved.',
    },
    { variable: '--uilib-tabs-color-resolved', description: 'Color Resolved.' },
    { variable: '--uilib-tabs-color-active-resolved', description: 'Color Active Resolved.' },
    { variable: '--uilib-tabs-color-disabled-resolved', description: 'Color Disabled Resolved.' },
    { variable: '--uilib-tab-bg-resolved', description: 'Uilib Tab Bg Resolved.' },
    { variable: '--uilib-tab-bg-hover-resolved', description: 'Uilib Tab Bg Hover Resolved.' },
    { variable: '--uilib-tab-bg-active-resolved', description: 'Uilib Tab Bg Active Resolved.' },
    { variable: '--uilib-tab-border-resolved', description: 'Uilib Tab Border Resolved.' },
    {
      variable: '--uilib-tab-border-active-resolved',
      description: 'Uilib Tab Border Active Resolved.',
    },
    { variable: '--uilib-tab-radius-resolved', description: 'Uilib Tab Radius Resolved.' },
    { variable: '--uilib-tabs-indicator-color-resolved', description: 'Indicator Color Resolved.' },
    {
      variable: '--uilib-tabs-indicator-height-resolved',
      description: 'Indicator Height Resolved.',
    },
    {
      variable: '--uilib-tabs-indicator-radius-resolved',
      description: 'Indicator Radius Resolved.',
    },
    {
      variable: '--uilib-tabs-indicator-offset-resolved',
      description: 'Indicator Offset Resolved.',
    },
    { variable: '--uilib-tabs-transition-resolved', description: 'Transition Resolved.' },
    { variable: '--uilib-tabs-nav-button-size-resolved', description: 'Nav Button Size Resolved.' },
    { variable: '--uilib-tabs-nav-button-bg-resolved', description: 'Nav Button Bg Resolved.' },
    {
      variable: '--uilib-tabs-nav-button-color-resolved',
      description: 'Nav Button Color Resolved.',
    },
    {
      variable: '--uilib-tabs-nav-button-border-resolved',
      description: 'Nav Button Border Resolved.',
    },
    {
      variable: '--uilib-tabs-nav-button-radius-resolved',
      description: 'Nav Button Radius Resolved.',
    },
    {
      variable: '--uilib-tabs-nav-button-shadow-resolved',
      description: 'Nav Button Shadow Resolved.',
    },
    {
      variable: '--uilib-tabs-nav-button-hover-bg-resolved',
      description: 'Nav Button Hover Bg Resolved.',
    },
    {
      variable: '--uilib-tabs-nav-button-active-bg-resolved',
      description: 'Nav Button Active Bg Resolved.',
    },
    {
      variable: '--uilib-tabs-nav-button-disabled-opacity-resolved',
      description: 'Nav Button Disabled Opacity Resolved.',
    },
    { variable: '--uilib-tabs-nav-button-gap-resolved', description: 'Nav Button Gap Resolved.' },
    { variable: '--uilib-tabs-bg', description: 'Background colour.' },
    { variable: '--uilib-tabs-border', description: 'Border shorthand.' },
    { variable: '--uilib-tabs-indicator-color', description: 'Active indicator colour.' },
    { variable: '--uilib-tabs-color', description: 'Text colour.' },
    { variable: '--uilib-tabs-color-active', description: 'Text colour (active).' },
    { variable: '--uilib-tabs-color-disabled', description: 'Text colour (disabled).' },
    { variable: '--uilib-tab-bg-hover', description: 'Uilib Tab background colour (hover).' },
    { variable: '--uilib-tab-bg-active', description: 'Uilib Tab background colour (active).' },
    { variable: '--uilib-tabs-transition', description: 'Transition.' },
  ];
}
