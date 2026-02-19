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

type TabKey = 'playground' | 'api-reference' | 'usage' | 'accessibility';
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
  ],
  templateUrl: './tabs.component.html',
  styleUrl: './tabs.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabsDemoComponent {
  readonly sections: DocSection[] = [
    { id: 'playground', label: 'Playground' },
    { id: 'api-reference', label: 'API Reference' },
    { id: 'usage', label: 'Usage' },
    { id: 'accessibility', label: 'Accessibility' },
  ];

  activeTab = signal<TabKey>('playground');
  setTab(tab: TabKey): void {
    this.activeTab.set(tab);
  }
  onTabChange(value: TabsValue | null): void {
    if (value === null) return;
    this.setTab(value as TabKey);
  }

  private readonly themeService = inject(ThemeConfigService);

  readonly variants: TabsVariant[] = ['material', 'bootstrap', 'minimal'];
  readonly sizes: TabsSize[] = ['small', 'medium', 'large'];
  readonly orientations: TabsOrientation[] = ['horizontal', 'vertical'];
  readonly aligns: TabsAlignment[] = ['start', 'center', 'end', 'stretch'];
  readonly lazyModes: TabsLazyMode[] = [false, 'unmount', 'keep-alive'];

  variant = signal<TabsVariant>('material');
  size = signal<TabsSize>('medium');
  orientation = signal<TabsOrientation>('horizontal');
  align = signal<TabsAlignment>('start');
  closable = signal<boolean>(false);
  lazy = signal<TabsLazyMode>(false);
  disabledAll = signal<boolean>(false);
  scrollable = signal<boolean>(false);
  menuMode = signal<boolean>(false);
  perTabLazy = signal<PerTabLazyOption>('inherit');
  readonly perTabLazyOptions: SelectOption[] = [
    { label: 'Inherit', value: 'inherit' },
    { label: 'Off', value: false },
    { label: 'Unmount', value: 'unmount' },
    { label: 'Keep alive', value: 'keep-alive' },
  ];

  playgroundTabs = signal<DemoTab[]>([
    { value: 'overview', label: 'Overview', content: 'High-level summary of the selected topic.' },
    { value: 'details', label: 'Details', content: 'Deeper dive content for the tab selection.' },
    {
      value: 'disabled',
      label: 'Disabled',
      content: 'This tab is disabled to demonstrate state.',
      disabled: true,
    },
  ]);

  iconTabs: DemoTab[] = [
    { value: 'home', label: 'Home', icon: 'home', content: 'Home overview content.' },
    { value: 'activity', label: 'Activity', icon: 'activity', content: 'Recent activity feed.' },
    {
      value: 'settings',
      label: 'Settings',
      icon: 'settings',
      content: 'User preferences and settings.',
    },
  ];

  iconTextTabs: DemoTab[] = [
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

  verticalTabs: DemoTab[] = [
    { value: 'analytics', label: 'Analytics', content: 'KPI overview dashboard.' },
    { value: 'reports', label: 'Reports', content: 'Saved and scheduled reports.' },
    { value: 'integrations', label: 'Integrations', content: 'Connected services and APIs.' },
  ];

  closableTabs = signal<DemoTab[]>([
    { value: 'alpha', label: 'Alpha', closable: true, content: 'Alpha content' },
    { value: 'beta', label: 'Beta', closable: true, content: 'Beta content' },
    { value: 'gamma', label: 'Gamma', closable: true, content: 'Gamma content' },
  ]);

  lazyTabs: DemoTab[] = [
    { value: 'summary', label: 'Summary', content: 'Summary content rendered lazily.' },
    { value: 'logs', label: 'Logs', content: 'Log stream loaded on demand.' },
    { value: 'history', label: 'History', content: 'Historical data loaded lazily.' },
  ];

  scrollTabs: DemoTab[] = Array.from({ length: 50 }, (_: unknown, index: number): DemoTab => {
    const label: string = `Tab ${index + 1}`;
    return {
      value: `tab-${index + 1}`,
      label,
      content: `${label} content`,
    };
  });

  navTabs: NavTabItem[] = [
    { value: '/overview', label: 'Overview', icon: 'home' },
    { value: '/billing', label: 'Billing', icon: 'activity' },
    { value: '/usage', label: 'Usage', icon: 'bookmark' },
    { value: '/settings', label: 'Settings', icon: 'settings' },
  ];
  navActive = signal<string>('/overview');

  controlledTabs: DemoTab[] = [
    { value: 'first', label: 'First', content: 'Controlled tab one.' },
    { value: 'second', label: 'Second', content: 'Controlled tab two.' },
    { value: 'third', label: 'Third', content: 'Controlled tab three.' },
  ];

  controlledIndex = signal<number>(0);
  controlledSelection = computed<number>(() => this.controlledIndex());

  readonly playgroundTabsResolved = computed<DemoTab[]>(() =>
    this.scrollable() ? this.scrollTabs : this.playgroundTabs()
  );

  readonly playgroundScrollBehavior = computed<TabsScrollBehavior>(() =>
    this.scrollable() ? 'arrows' : 'auto'
  );

  readonly playgroundMode = computed<TabsMode>(() => (this.menuMode() ? 'navigation' : 'default'));

  readonly playgroundPerTabLazy = computed<TabsLazyMode | undefined>(() => {
    const selection: PerTabLazyOption = this.perTabLazy();
    return selection === 'inherit' ? undefined : selection;
  });

  track = (_: number, item: unknown): TabsValue | number =>
    item && typeof item === 'object' && 'value' in (item as { value?: unknown })
      ? ((item as { value: TabsValue }).value ?? _)
      : _;

  readonly snippets = {
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

  readonly appliedTheme = computed(() => this.themeService.getCssVars(this.themeService.preset()));

  @ViewChild(DocDemoViewportComponent) viewport?: DocDemoViewportComponent;

  constructor() {
    effect(() => {
      const variant = this.themeService.preset().variant as TabsVariant;
      this.variant.set(variant);
    });
  }

  setVariant(variant: TabsVariant): void {
    this.variant.set(variant);
  }

  setSize(size: TabsSize): void {
    this.size.set(size);
  }

  setOrientation(orientation: TabsOrientation): void {
    this.orientation.set(orientation);
  }

  setAlign(align: TabsAlignment): void {
    this.align.set(align);
  }

  setLazy(mode: TabsLazyMode): void {
    this.lazy.set(mode);
  }

  setScrollable(enabled: boolean): void {
    this.scrollable.set(enabled);
  }

  setMenuMode(enabled: boolean): void {
    this.menuMode.set(enabled);
  }

  setPerTabLazy(selection: PerTabLazyOption): void {
    this.perTabLazy.set(selection);
  }

  toggleClosable(on: boolean): void {
    this.closable.set(on);
  }

  toggleDisabled(on: boolean): void {
    this.disabledAll.set(on);
  }

  onCloseTab(payload: { value: TabsValue | null; index: number }): void {
    this.closableTabs.update((tabs) => tabs.filter((tab) => tab.value !== payload.value));
  }

  resetClosableTabs(): void {
    this.closableTabs.set([
      { value: 'alpha', label: 'Alpha', closable: true, content: 'Alpha content' },
      { value: 'beta', label: 'Beta', closable: true, content: 'Beta content' },
      { value: 'gamma', label: 'Gamma', closable: true, content: 'Gamma content' },
    ]);
  }

  onControlledChange(payload: { value: TabsValue | null; index: number }): void {
    this.controlledIndex.set(payload.index);
  }

  onNavigate(value: TabsValue | null): void {
    if (typeof value === 'string') {
      this.navActive.set(value);
    }
  }

  selectControlled(index: number): void {
    this.controlledIndex.set(index);
  }

  readonly tabsExample = `<ui-lib-tabs>
  <ui-lib-tab label="Home">Home content</ui-lib-tab>
  <ui-lib-tab label="Profile">Profile content</ui-lib-tab>
</ui-lib-tabs>`;
}
