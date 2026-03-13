import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import type { WritableSignal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SidebarMenu } from 'ui-lib-custom';
import type { SidebarMenuItem, SidebarVariant } from 'ui-lib-custom';
import { Tabs, Tab } from 'ui-lib-custom/tabs';
import type { TabsValue } from 'ui-lib-custom/tabs';
import { Card } from 'ui-lib-custom/card';
import { DocPageLayoutComponent } from '@demo/shared/doc-page/doc-page-layout.component';
import type { DocSection } from '@demo/shared/doc-page/doc-section.model';
import { DocDemoViewportComponent } from '@demo/shared/doc-page/doc-demo-viewport.component';
import { DocCodeSnippetComponent } from '@demo/shared/doc-page/doc-code-snippet.component';

type TabKey = 'playground' | 'api-reference' | 'usage';

/**
 * Demo page for sidebar menu component usage.
 */
@Component({
  selector: 'app-sidebar-menu-demo',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    Tabs,
    Tab,
    Card,
    SidebarMenu,
    DocPageLayoutComponent,
    DocDemoViewportComponent,
    DocCodeSnippetComponent,
  ],
  templateUrl: './sidebar-menu.component.html',
  styleUrl: './sidebar-menu.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarMenuDemoComponent {
  public readonly sections: DocSection[] = [
    { id: 'playground', label: 'Playground' },
    { id: 'api-reference', label: 'API Reference' },
    { id: 'usage', label: 'Usage' },
  ];

  public readonly activeTab: WritableSignal<TabKey> = signal<TabKey>('playground');

  public setTab(tab: TabKey): void {
    this.activeTab.set(tab);
  }

  public onTabChange(value: TabsValue | null): void {
    if (value === null) return;
    this.setTab(value as TabKey);
  }

  public readonly variant: WritableSignal<SidebarVariant> = signal<SidebarVariant>('classic');
  public readonly collapsed: WritableSignal<boolean> = signal<boolean>(false);
  public readonly collapsible: WritableSignal<boolean> = signal<boolean>(false);

  public readonly variants: SidebarVariant[] = ['classic', 'compact', 'modern'];

  public readonly snippets: { readonly usage: string } = {
    usage: `<ui-lib-sidebar-menu
  variant="classic"
  [items]="items"
  [collapsed]="false"
  [collapsible]="false">
  <div sidebar-brand>Brand</div>
  <div sidebar-footer>Footer</div>
</ui-lib-sidebar-menu>`,
  } as const;

  public readonly items: SidebarMenuItem[] = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: 'pi pi-home',
      active: true,
    },
    {
      id: 'projects',
      label: 'Projects',
      icon: 'pi pi-briefcase',
      children: [
        { id: 'all-projects', label: 'All Projects', icon: 'pi pi-list' },
        { id: 'favorites', label: 'Favorites', icon: 'pi pi-star', badge: '3' },
      ],
    },
    {
      id: 'teams',
      label: 'Teams',
      icon: 'pi pi-users',
      children: [
        { id: 'eng', label: 'Engineering', icon: 'pi pi-code' },
        { id: 'design', label: 'Design', icon: 'pi pi-palette' },
      ],
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: 'pi pi-cog',
      badge: '!',
    },
  ];

  public setVariant(v: SidebarVariant): void {
    this.variant.set(v);
  }
}
