import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

export interface NavItem {
  label: string;
  icon?: string;
  route?: string;
  fragment?: string;
  items?: NavItem[];
  expanded?: boolean;
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarComponent {
  menuItems = signal<NavItem[]>([
    {
      label: 'Getting Started',
      icon: 'pi pi-home',
      route: '/home',
    },
    {
      label: 'Layout',
      icon: 'pi pi-th-large',
      expanded: true,
      items: [
        { label: 'Semantic Spacing', icon: 'pi pi-circle', route: '/layouts/semantic-spacing' },
        { label: 'Stack', icon: 'pi pi-circle', route: '/layouts/stack' },
        { label: 'Inline', icon: 'pi pi-circle', route: '/layouts/inline' },
        { label: 'Grid', icon: 'pi pi-circle', route: '/layouts/grid' },
        { label: 'Container', icon: 'pi pi-circle', route: '/layouts/container' },
        { label: 'Composition', icon: 'pi pi-circle', route: '/layouts/composition' },
        { label: 'Design Tokens', icon: 'pi pi-circle', route: '/layouts/design-tokens' },
        { label: 'Themed Layouts', icon: 'pi pi-circle', route: '/layouts/themed-layouts' },
        { label: 'Examples', icon: 'pi pi-circle', route: '/layouts/examples' },
      ],
    },
    {
      label: 'Components',
      icon: 'pi pi-box',
      expanded: true,
      items: [
        {
          label: 'Badge',
          icon: 'pi pi-circle',
          route: '/badges',
        },
        {
          label: 'Button',
          icon: 'pi pi-circle',
          route: '/buttons',
        },
        {
          label: 'Card',
          icon: 'pi pi-id-card',
          route: '/cards',
        },
        {
          label: 'Shadows',
          icon: 'pi pi-circle',
          route: '/shadows',
        },
        {
          label: 'Tabs',
          icon: 'pi pi-circle',
          route: '/tabs',
        },
        {
          label: 'Login Forms',
          icon: 'pi pi-sign-in',
          route: '/login',
        },
        {
          label: 'Sidebar Menu',
          icon: 'pi pi-circle',
          route: '/sidebar-menu',
        },
        {
          label: 'Project Starter',
          icon: 'pi pi-circle',
          route: '/project-starter',
        },
        {
          label: 'Icons',
          icon: 'pi pi-circle',
          route: '/icons',
        },
        {
          label: 'Accordion',
          icon: 'pi pi-circle',
          route: '/accordion',
        },
      ],
    },
    {
      label: 'Theming',
      icon: 'pi pi-palette',
      route: '/themes',
    },
    {
      label: 'Dark Mode',
      icon: 'pi pi-moon',
      route: '/dark-mode',
    },
    {
      label: 'Form',
      icon: 'pi pi-check-square',
      expanded: false,
      items: [
        {
          label: 'Input Text',
          icon: 'pi pi-circle',
          route: '/input-text',
        },
        {
          label: 'Select',
          icon: 'pi pi-circle',
          route: '/select',
        },
        {
          label: 'Checkbox',
          icon: 'pi pi-circle',
          route: '/checkbox',
        },
        {
          label: 'Select Buttons',
          icon: 'pi pi-circle',
          route: '/select-buttons',
        },
      ],
    },
  ]);

  toggleSection(item: NavItem) {
    this.menuItems.update((items) =>
      items.map((it) =>
        it === item
          ? { ...it, expanded: !it.expanded }
          : it.items?.includes(item)
            ? {
                ...it,
                items: it.items?.map((sub) =>
                  sub === item ? { ...sub, expanded: !sub.expanded } : sub
                ),
              }
            : it
      )
    );
  }
}
