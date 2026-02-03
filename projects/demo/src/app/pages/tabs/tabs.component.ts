import { ChangeDetectionStrategy, Component, ViewChild, computed, effect, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Tabs, Tab, TabLabel, TabsAlignment, TabsLazyMode, TabsOrientation, TabsSize, TabsValue, TabsVariant, Card, Button, Icon, ThemeConfigService } from 'ui-lib-custom';
import { DocPageLayoutComponent } from '@demo/shared/doc-page/doc-page-layout.component';
import { DocSection } from '@demo/shared/doc-page/doc-section.model';
import { DocControlGroupComponent } from '@demo/shared/doc-page/doc-control-group.component';
import { DocDemoViewportComponent } from '@demo/shared/doc-page/doc-demo-viewport.component';
import { ThemeScopeDirective } from '@demo/shared/theme-scope.directive';
import { DocCodeSnippetComponent } from '@demo/shared/doc-page/doc-code-snippet.component';

interface DemoTab {
  value: TabsValue;
  label: string;
  icon?: string;
  disabled?: boolean;
  closable?: boolean;
  content: string;
}

type TabKey = 'playground' | 'api-reference' | 'usage' | 'accessibility';

@Component({
  selector: 'app-tabs-demo',
  standalone: true,
  imports: [CommonModule, Tabs, Tab, TabLabel, Card, Button, Icon, DocPageLayoutComponent, DocControlGroupComponent, DocDemoViewportComponent, ThemeScopeDirective, DocCodeSnippetComponent, TabLabel, Icon],
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
  setTab(tab: TabKey) {
    this.activeTab.set(tab);
  }
  onTabChange(value: TabsValue | null) {
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

  playgroundTabs = signal<DemoTab[]>([
    { value: 'overview', label: 'Overview', content: 'High-level summary of the selected topic.' },
    { value: 'details', label: 'Details', content: 'Deeper dive content for the tab selection.' },
    { value: 'disabled', label: 'Disabled', content: 'This tab is disabled to demonstrate state.', disabled: true },
  ]);

  iconTabs: DemoTab[] = [
    { value: 'home', label: 'Home', icon: 'home', content: 'Home overview content.' },
    { value: 'activity', label: 'Activity', icon: 'activity', content: 'Recent activity feed.' },
    { value: 'settings', label: 'Settings', icon: 'settings', content: 'User preferences and settings.' },
  ];

  iconTextTabs: DemoTab[] = [
    { value: 'profile', label: 'Profile', icon: 'user', content: 'User profile content.' },
    { value: 'notifications', label: 'Notifications', icon: 'bell', content: 'Notification center content.' },
    { value: 'billing', label: 'Billing', icon: 'credit-card', content: 'Billing and invoices content.' },
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

  controlledTabs: DemoTab[] = [
    { value: 'first', label: 'First', content: 'Controlled tab one.' },
    { value: 'second', label: 'Second', content: 'Controlled tab two.' },
    { value: 'third', label: 'Third', content: 'Controlled tab three.' },
  ];

  controlledIndex = signal(0);
  controlledSelection = computed(() => this.controlledIndex());

  track = (_: number, item: any) => (item && typeof item === 'object' && 'value' in item ? (item as any).value : item ?? _);

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
</ui-lib-tabs>`
  } as const;

  readonly appliedTheme = computed(() => this.themeService.getCssVars(this.themeService.preset()));

  @ViewChild(DocDemoViewportComponent) viewport?: DocDemoViewportComponent;

  constructor() {
    effect(() => {
      const variant = this.themeService.preset().variant as TabsVariant;
      this.variant.set(variant);
    });
  }

  setVariant(variant: TabsVariant) {
    this.variant.set(variant);
  }

  setSize(size: TabsSize) {
    this.size.set(size);
  }

  setOrientation(orientation: TabsOrientation) {
    this.orientation.set(orientation);
  }

  setAlign(align: TabsAlignment) {
    this.align.set(align);
  }

  setLazy(mode: TabsLazyMode) {
    this.lazy.set(mode);
  }

  toggleClosable(on: boolean) {
    this.closable.set(on);
  }

  toggleDisabled(on: boolean) {
    this.disabledAll.set(on);
  }

  onCloseTab(payload: { value: TabsValue | null; index: number }) {
    this.closableTabs.update(tabs => tabs.filter(tab => tab.value !== payload.value));
  }

  resetClosableTabs() {
    this.closableTabs.set([
      { value: 'alpha', label: 'Alpha', closable: true, content: 'Alpha content' },
      { value: 'beta', label: 'Beta', closable: true, content: 'Beta content' },
      { value: 'gamma', label: 'Gamma', closable: true, content: 'Gamma content' },
    ]);
  }

  onControlledChange(payload: { value: TabsValue | null; index: number }) {
    this.controlledIndex.set(payload.index);
  }

  selectControlled(index: number) {
    this.controlledIndex.set(index);
  }
}
