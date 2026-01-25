import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SidebarMenu, SidebarMenuItem, SidebarVariant } from '../../../../../ui-lib-custom/src/lib/sidebar-menu/sidebar-menu';

@Component({
  selector: 'app-sidebar-menu-demo',
  standalone: true,
  imports: [CommonModule, FormsModule, SidebarMenu],
  templateUrl: './sidebar-menu.component.html',
  styleUrl: './sidebar-menu.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarMenuDemoComponent {
  variant = signal<SidebarVariant>('classic');
  collapsed = signal(false);
  collapsible = signal(true);

  variants: SidebarVariant[] = ['classic', 'compact', 'modern'];

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
