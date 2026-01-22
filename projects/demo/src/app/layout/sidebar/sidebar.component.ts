import { Component } from '@angular/core';
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
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  menuItems: NavItem[] = [
    {
      label: 'Getting Started',
      icon: 'pi pi-home',
      route: '/',
    },
    {
      label: 'Components',
      icon: 'pi pi-th-large',
      expanded: true,
      items: [
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
        }
      ]
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
  ];

  toggleSection(item: NavItem) {
    item.expanded = !item.expanded;
  }
}
