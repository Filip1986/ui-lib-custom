import {
  ChangeDetectionStrategy,
  Component,
  ViewChild,
  computed,
  effect,
  inject,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  Tabs,
  Tab,
  TabLabel,
  TabContent,
  TabsAlignment,
  TabsLazyMode,
  TabsOrientation,
  TabsSize,
  TabsValue,
  TabsVariant,
  TabsScrollBehavior,
  TabsMode,
  Card,
  Button,
  Icon,
  ThemeConfigService,
  UiLibSelect,
  SelectOption,
  Checkbox,
} from 'ui-lib-custom';
import { DocPageLayoutComponent } from '@demo/shared/doc-page/doc-page-layout.component';
import { DocSection } from '@demo/shared/doc-page/doc-section.model';
import { DocDemoViewportComponent } from '@demo/shared/doc-page/doc-demo-viewport.component';
import { ThemeScopeDirective } from '@demo/shared/theme-scope.directive';
import { DocCodeSnippetComponent } from '@demo/shared/doc-page/doc-code-snippet.component';
import { CodePreviewComponent } from '../../shared/components/code-preview/code-preview.component';
import { VariantComparisonComponent } from '../../shared/components/variant-comparison/variant-comparison.component';

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

@Component({
  selector: 'app-tabs-demo',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    Tabs,
    Tab,
    TabLabel,
    TabContent,
    Card,
    Button,
    Icon,
    UiLibSelect,
    Checkbox,
    DocPageLayoutComponent,
    DocDemoViewportComponent,
    ThemeScopeDirective,
    DocCodeSnippetComponent,
    CodePreviewComponent,
    VariantComparisonComponent,
  ],
  templateUrl: './tabs.component.html',
  styleUrl: './tabs.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabsDemoComponent {
  public readonly sections: DocSection[] = [
    { id: 'playground', label: 'Playground' },
    { id: 'variants', label: 'Variants' },
    { id: 'api-reference', label: 'API Reference' },
    { id: 'usage', label: 'Usage' },
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

  private readonly themeService = inject(ThemeConfigService);

  public readonly variants: TabsVariant[] = ['material', 'bootstrap', 'minimal'];
  public readonly sizes: TabsSize[] = ['small', 'medium', 'large'];
  public readonly orientations: TabsOrientation[] = ['horizontal', 'vertical'];
  public readonly aligns: TabsAlignment[] = ['start', 'center', 'end', 'stretch'];
  public readonly lazyModes: TabsLazyMode[] = [false, 'unmount', 'keep-alive'];

  public readonly variant = signal<TabsVariant>('material');
  public readonly size = signal<TabsSize>('medium');
  public readonly orientation = signal<TabsOrientation>('horizontal');
  public readonly align = signal<TabsAlignment>('start');
  public readonly closable = signal<boolean>(false);
  public readonly lazy = signal<TabsLazyMode>(false);
  public readonly disabledAll = signal<boolean>(false);
  public readonly scrollable = signal<boolean>(false);
  public readonly menuMode = signal<boolean>(false);
  public readonly perTabLazy = signal<PerTabLazyOption>('inherit');
  public readonly perTabLazyOptions: SelectOption[] = [
    { label: 'Inherit', value: 'inherit' },
    { label: 'Off', value: false },
    { label: 'Unmount', value: 'unmount' },
    { label: 'Keep alive', value: 'keep-alive' },
  ];

  public readonly playgroundTabs = signal<DemoTab[]>([
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

  public readonly closableTabs = signal<DemoTab[]>([
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
  public readonly navActive = signal<string>('/overview');

  public readonly controlledTabs: DemoTab[] = [
    { value: 'first', label: 'First', content: 'Controlled tab one.' },
    { value: 'second', label: 'Second', content: 'Controlled tab two.' },
    { value: 'third', label: 'Third', content: 'Controlled tab three.' },
  ];

  public readonly controlledIndex = signal<number>(0);
  public readonly controlledSelection = computed<number>(() => this.controlledIndex());

  public readonly playgroundTabsResolved = computed<DemoTab[]>(() =>
    this.scrollable() ? this.scrollTabs : this.playgroundTabs()
  );

  public readonly playgroundScrollBehavior = computed<TabsScrollBehavior>(() =>
    this.scrollable() ? 'arrows' : 'auto'
  );

  public readonly playgroundMode = computed<TabsMode>(() =>
    this.menuMode() ? 'navigation' : 'default'
  );

  public readonly playgroundPerTabLazy = computed<TabsLazyMode | undefined>(() => {
    const selection: PerTabLazyOption = this.perTabLazy();
    return selection === 'inherit' ? undefined : selection;
  });

  public readonly track = (_: number, item: unknown): TabsValue | number =>
    item && typeof item === 'object' && 'value' in (item as { value?: unknown })
      ? (item as { value: TabsValue }).value
      : _;

  public readonly snippets = {
    basic: `<ui-lib-tabs>
  <ui-lib-tab label="Home">Home content</ui-lib-tab>
  <ui-lib-tab label="Profile">Profile content</ui-lib-tab>
</ui-lib-tabs>`,
    icons: `<ui-lib-tabs variant="material">
  <ui-lib-tab>
    <ng-template uiLibTabLabel><ui-lib-icon name="home" /> Home</ng-template>
    Home content
  </ui-lib-tab>
  <ui-lib-tab>
    <ng-template uiLibTabLabel><ui-lib-icon name="settings" /> Settings</ng-template>
    Settings content
  </ui-lib-tab>
</ui-lib-tabs>`,
    vertical: `<ui-lib-tabs orientation="vertical">
  <ui-lib-tab label="Overview">Overview</ui-lib-tab>
  <ui-lib-tab label="Billing">Billing</ui-lib-tab>
  <ui-lib-tab label="Integrations">Integrations</ui-lib-tab>
</ui-lib-tabs>`,
    closable: `<ui-lib-tabs [closable]="true" (tabClose)="onClose($event)">
  <ui-lib-tab value="alpha" label="Alpha">Alpha</ui-lib-tab>
  <ui-lib-tab value="beta" label="Beta">Beta</ui-lib-tab>
</ui-lib-tabs>`,
    controlled: `<ui-lib-tabs [selectedIndex]="index" (selectedIndexChange)="index = $event">
  <ui-lib-tab label="One">One</ui-lib-tab>
  <ui-lib-tab label="Two">Two</ui-lib-tab>
</ui-lib-tabs>`,
    scrollable: `<ui-lib-tabs scrollBehavior="arrows">
  <ui-lib-tab label="Overview">Overview</ui-lib-tab>
  <ui-lib-tab label="Billing">Billing</ui-lib-tab>
  <ui-lib-tab label="Usage">Usage</ui-lib-tab>
  <ui-lib-tab label="Security">Security</ui-lib-tab>
</ui-lib-tabs>`,
    tabMenu: `<ui-lib-tabs mode="navigation" (navigate)="onNavigate($event.value)">
  <ui-lib-tab value="/overview" label="Overview" />
  <ui-lib-tab value="/billing" label="Billing" />
  <ui-lib-tab value="/usage" label="Usage" />
</ui-lib-tabs>`,
    perTabLazy: `<ui-lib-tabs>
  <ui-lib-tab label="Eager">Always rendered</ui-lib-tab>
  <ui-lib-tab label="Lazy" lazy="unmount">
    <ng-template uiLibTabContent>
      <heavy-component />
    </ng-template>
  </ui-lib-tab>
</ui-lib-tabs>`,
  } as const;

  public readonly appliedTheme = computed(() =>
    this.themeService.getCssVars(this.themeService.preset())
  );

  @ViewChild(DocDemoViewportComponent) public viewport?: DocDemoViewportComponent;

  constructor() {
    effect(() => {
      const variant = this.themeService.preset().variant as TabsVariant;
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
    this.closableTabs.update((tabs) => tabs.filter((tab) => tab.value !== payload.value));
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

  public readonly tabsExample = `<ui-lib-tabs>
  <ui-lib-tab label="Home">Home content</ui-lib-tab>
  <ui-lib-tab label="Profile">Profile content</ui-lib-tab>
</ui-lib-tabs>`;
}
