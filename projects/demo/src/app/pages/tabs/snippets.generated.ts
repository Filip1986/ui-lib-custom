/* eslint-disable */
// AUTO-GENERATED — run `node scripts/generate-snippets.mjs` to regenerate.
// Do not edit manually.

export const basicHtml = `<ui-lib-tabs>
  <ui-lib-tab label="Home">Home content</ui-lib-tab>
  <ui-lib-tab label="Profile">Profile content</ui-lib-tab>
</ui-lib-tabs>`;

export const basicTs = `import { Component } from '@angular/core';
import { Tabs, Tab } from 'ui-lib-custom/tabs';

@Component({
  standalone: true,
  imports: [Tabs, Tab],
  templateUrl: './basic.example.html',
})
export class MyComponent {}`;

export const closableHtml = `<ui-lib-tabs [closable]="true" (tabClose)="onClose($event)">
  <ui-lib-tab value="alpha" label="Alpha">Alpha</ui-lib-tab>
  <ui-lib-tab value="beta" label="Beta">Beta</ui-lib-tab>
</ui-lib-tabs>`;

export const closableTs = `import { Component } from '@angular/core';
import { signal } from '@angular/core';
import type { WritableSignal } from '@angular/core';
import { Tabs, Tab } from 'ui-lib-custom/tabs';
import type { TabsValue } from 'ui-lib-custom/tabs';

@Component({
  standalone: true,
  imports: [Tabs, Tab],
  templateUrl: './closable.example.html',
})
export class MyComponent {
  readonly tabs: WritableSignal<{ value: string; label: string }[]> = signal([
    { value: 'alpha', label: 'Alpha' },
    { value: 'beta', label: 'Beta' },
  ]);

  onClose(event: { value: TabsValue | null; index: number }): void {
    this.tabs.update(tabs => tabs.filter(t => t.value !== event.value));
  }
}`;

export const controlledHtml = `<ui-lib-tabs [selectedIndex]="index" (selectedIndexChange)="index = $event">
  <ui-lib-tab label="One">One</ui-lib-tab>
  <ui-lib-tab label="Two">Two</ui-lib-tab>
</ui-lib-tabs>`;

export const controlledTs = `import { Component, computed, signal } from '@angular/core';
import type { Signal, WritableSignal } from '@angular/core';
import { Tabs, Tab } from 'ui-lib-custom/tabs';
import type { TabsValue } from 'ui-lib-custom/tabs';

@Component({
  standalone: true,
  imports: [Tabs, Tab],
  templateUrl: './controlled.example.html',
})
export class MyComponent {
  readonly index: WritableSignal<number> = signal(0);
  readonly selectedIndex: Signal<number> = computed(() => this.index());

  onIndexChange(event: { value: TabsValue | null; index: number }): void {
    this.index.set(event.index);
  }
}`;

export const iconsHtml = `<ui-lib-tabs variant="material">
  <ui-lib-tab>
    <ng-template uiLibTabLabel><ui-lib-icon name="home" /> Home</ng-template>
    Home content
  </ui-lib-tab>
  <ui-lib-tab>
    <ng-template uiLibTabLabel><ui-lib-icon name="settings" /> Settings</ng-template>
    Settings content
  </ui-lib-tab>
</ui-lib-tabs>`;

export const iconsTs = `import { Component } from '@angular/core';
import { Tabs, Tab, TabLabel } from 'ui-lib-custom/tabs';
import { Icon } from 'ui-lib-custom/icon';

@Component({
  standalone: true,
  imports: [Tabs, Tab, TabLabel, Icon],
  templateUrl: './icons.example.html',
})
export class MyComponent {}`;

export const perTabLazyHtml = `<ui-lib-tabs>
  <ui-lib-tab label="Eager">Always rendered</ui-lib-tab>
  <ui-lib-tab label="Lazy" lazy="unmount">
    <ng-template uiLibTabContent>
      <heavy-component />
    </ng-template>
  </ui-lib-tab>
</ui-lib-tabs>`;

export const perTabLazyTs = `import { Component } from '@angular/core';
import { Tabs, Tab, TabContent } from 'ui-lib-custom/tabs';

@Component({
  standalone: true,
  imports: [Tabs, Tab, TabContent],
  templateUrl: './per-tab-lazy.example.html',
})
export class MyComponent {}`;

export const scrollableHtml = `<ui-lib-tabs scrollBehavior="arrows">
  <ui-lib-tab label="Overview">Overview</ui-lib-tab>
  <ui-lib-tab label="Billing">Billing</ui-lib-tab>
  <ui-lib-tab label="Usage">Usage</ui-lib-tab>
  <ui-lib-tab label="Security">Security</ui-lib-tab>
</ui-lib-tabs>`;

export const scrollableTs = `import { Component } from '@angular/core';
import { Tabs, Tab } from 'ui-lib-custom/tabs';

@Component({
  standalone: true,
  imports: [Tabs, Tab],
  templateUrl: './scrollable.example.html',
})
export class MyComponent {}`;

export const tabMenuHtml = `<ui-lib-tabs mode="navigation" (navigate)="onNavigate($event.value)">
  <ui-lib-tab value="/overview" label="Overview" />
  <ui-lib-tab value="/billing" label="Billing" />
  <ui-lib-tab value="/usage" label="Usage" />
</ui-lib-tabs>`;

export const tabMenuTs = `import { Component, signal } from '@angular/core';
import type { WritableSignal } from '@angular/core';
import { Tabs, Tab } from 'ui-lib-custom/tabs';
import type { TabsValue } from 'ui-lib-custom/tabs';

@Component({
  standalone: true,
  imports: [Tabs, Tab],
  templateUrl: './tab-menu.example.html',
})
export class MyComponent {
  readonly activeRoute: WritableSignal<string> = signal('/overview');

  onNavigate(value: TabsValue | null): void {
    if (typeof value === 'string') {
      this.activeRoute.set(value);
    }
  }
}`;

export const tabsExampleHtml = `<ui-lib-tabs>
  <ui-lib-tab label="Home">Home content</ui-lib-tab>
  <ui-lib-tab label="Profile">Profile content</ui-lib-tab>
</ui-lib-tabs>`;

export const tabsExampleTs = `import { Component } from '@angular/core';
import { Tabs, Tab } from 'ui-lib-custom/tabs';

@Component({
  standalone: true,
  imports: [Tabs, Tab],
  templateUrl: './tabs-example.example.html',
})
export class MyComponent {}`;

export const verticalHtml = `<ui-lib-tabs orientation="vertical">
  <ui-lib-tab label="Overview">Overview</ui-lib-tab>
  <ui-lib-tab label="Billing">Billing</ui-lib-tab>
  <ui-lib-tab label="Integrations">Integrations</ui-lib-tab>
</ui-lib-tabs>`;

export const verticalTs = `import { Component } from '@angular/core';
import { Tabs, Tab } from 'ui-lib-custom/tabs';

@Component({
  standalone: true,
  imports: [Tabs, Tab],
  templateUrl: './vertical.example.html',
})
export class MyComponent {}`;
