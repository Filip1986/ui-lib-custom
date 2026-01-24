import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

export interface NavItem {
  label: string;
  icon?: string;
  route?: string;
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
      route: '/',
    },
    {
      label: 'Layout',
      icon: 'pi pi-th-large',
      expanded: true,
      items: [
        {
          label: 'Layout Primitives',
          icon: 'pi pi-circle',
          route: '/layouts'
        }
      ]
    },
    {
      label: 'Components',
      icon: 'pi pi-box',
      expanded: true,
      items: [
        {
          label: 'Badge',
          icon: 'pi pi-circle',
          route: '/badges'
        },
        {
          label: 'Button',
          icon: 'pi pi-circle',
          route: '/buttons'
        },
        {
          label: 'Card',
          icon: 'pi pi-id-card',
          route: '/cards'
        },
        {
          label: 'Login Forms',
          icon: 'pi pi-sign-in',
          route: '/login'
        },
        {
          label: 'Input',
          icon: 'pi pi-circle',
          route: '/inputs'
        }
      ]
    },
    {
      label: 'Theming',
      icon: 'pi pi-palette',
      route: '/themes'
    },
    {
      label: 'Form',
      icon: 'pi pi-check-square',
      expanded: false,
      items: [
        {
          label: 'Input Text',
          icon: 'pi pi-circle',
          route: '/input-text'
        },
        {
          label: 'Checkbox',
          icon: 'pi pi-circle',
          route: '/checkbox'
        }
      ]
    }
  ]);

  toggleSection(item: NavItem) {
    this.menuItems.update(items =>
      items.map(it =>
        it === item
          ? { ...it, expanded: !it.expanded }
          : it.items?.includes(item)
            ? { ...it, items: it.items?.map(sub => sub === item ? { ...sub, expanded: !sub.expanded } : sub) }
            : it
      )
    );
  }
}
