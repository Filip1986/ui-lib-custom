import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarVariant,
  Tabs,
  Tab,
  TabsValue,
  Card,
} from 'ui-lib-custom';
import { DocPageLayoutComponent } from '@demo/shared/doc-page/doc-page-layout.component';
import { DocSection } from '@demo/shared/doc-page/doc-section.model';
import { DocDemoViewportComponent } from '@demo/shared/doc-page/doc-demo-viewport.component';
import { DocCodeSnippetComponent } from '@demo/shared/doc-page/doc-code-snippet.component';

type TabKey = 'playground' | 'api-reference' | 'usage';

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
  readonly sections: DocSection[] = [
    { id: 'playground', label: 'Playground' },
    { id: 'api-reference', label: 'API Reference' },
    { id: 'usage', label: 'Usage' },
  ];

  activeTab = signal<TabKey>('playground');

  setTab(tab: TabKey) {
    this.activeTab.set(tab);
  }

  onTabChange(value: TabsValue | null) {
    if (value === null) return;
    this.setTab(value as TabKey);
  }

  variant = signal<SidebarVariant>('classic');
  collapsed = signal(false);
  collapsible = signal(true);

  variants: SidebarVariant[] = ['classic', 'compact', 'modern'];

  readonly snippets = {
    usage: `<ui-lib-sidebar-menu
  variant="classic"
  [items]="items"
  [collapsed]="false"
  [collapsible]="true">
  <div sidebar-brand>Brand</div>
  <div sidebar-footer>Footer</div>
</ui-lib-sidebar-menu>`,
  } as const;

  items: SidebarMenuItem[] = [
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

  setVariant(v: SidebarVariant): void {
    this.variant.set(v);
  }
}
