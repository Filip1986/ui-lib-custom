import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import type { WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

export interface NavItem {
  label: string;
  icon?: string;
  route?: string;
  fragment?: string;
  items?: NavItem[];
  group?: string;
  expanded?: boolean;
  isGroupLabel?: boolean;
}

/**
 * Demo sidebar navigation for page links.
 */
@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarComponent {
  public readonly isContentScrolled: WritableSignal<boolean> = signal<boolean>(false);
  public readonly menuItems: WritableSignal<NavItem[]> = signal<NavItem[]>([
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
      items: this.buildGroupedSubmenuItems([
        {
          label: 'Gallery',
          icon: 'pi pi-images',
          route: '/gallery',
        },
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
        {
          label: 'Dialog',
          icon: 'pi pi-circle',
          route: '/dialog',
        },
        {
          label: 'Autocomplete',
          icon: 'pi pi-circle',
          route: '/autocomplete',
          group: 'Form',
        },
        {
          label: 'CascadeSelect',
          icon: 'pi pi-circle',
          route: '/cascade-select',
          group: 'Form',
        },
        {
          label: 'Checkbox',
          icon: 'pi pi-circle',
          route: '/checkbox',
          group: 'Form',
        },
        {
          label: 'ColorPicker',
          icon: 'pi pi-circle',
          route: '/color-picker',
          group: 'Form',
        },
        {
          label: 'DatePicker',
          icon: 'pi pi-circle',
          route: '/date-picker',
          group: 'Form',
        },
        {
          label: 'Editor',
          icon: 'pi pi-circle',
          route: '/editor',
          group: 'Form',
        },
        {
          label: 'FloatLabel',
          icon: 'pi pi-circle',
          route: '/float-label',
          group: 'Form',
        },
        {
          label: 'IconField',
          icon: 'pi pi-circle',
          route: '/icon-field',
          group: 'Form',
        },
        {
          label: 'Input Text',
          icon: 'pi pi-circle',
          route: '/input-text',
          group: 'Form',
        },
        {
          label: 'InputGroup',
          icon: 'pi pi-circle',
          route: '/input-group',
          group: 'Form',
        },
        {
          label: 'InputMask',
          icon: 'pi pi-circle',
          route: '/input-mask',
          group: 'Form',
        },
        {
          label: 'InputNumber',
          icon: 'pi pi-circle',
          route: '/input-number',
          group: 'Form',
        },
        {
          label: 'Select',
          icon: 'pi pi-circle',
          route: '/select',
          group: 'Form',
        },
        {
          label: 'Select Buttons',
          icon: 'pi pi-circle',
          route: '/select-buttons',
          group: 'Form',
        },
      ]),
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
      label: 'Scoped Theming',
      icon: 'pi pi-sitemap',
      route: '/scoped-theming',
    },
    {
      label: 'Accessibility',
      icon: 'pi pi-universal-access',
      route: '/accessibility',
    },
  ]);

  public onSidebarScroll(event: Event): void {
    const scrollElement: HTMLElement | null = event.target as HTMLElement | null;
    this.isContentScrolled.set((scrollElement?.scrollTop ?? 0) > 0);
  }

  private buildGroupedSubmenuItems(items: NavItem[]): NavItem[] {
    const groupedItems: NavItem[] = [];
    let currentGroup: string | null = null;

    items.forEach((item: NavItem): void => {
      if (item.group && item.group !== currentGroup) {
        groupedItems.push({ label: item.group, isGroupLabel: true });
        currentGroup = item.group;
      }

      if (!item.group) {
        currentGroup = null;
      }

      groupedItems.push(item);
    });

    return groupedItems;
  }

  public toggleSection(item: NavItem): void {
    this.menuItems.update((items: NavItem[]): NavItem[] =>
      items.map((it: NavItem): NavItem => {
        if (it === item) {
          return { ...it, expanded: !it.expanded };
        }
        if (it.items && it.items.includes(item)) {
          return {
            ...it,
            items: it.items.map(
              (sub: NavItem): NavItem => (sub === item ? { ...sub, expanded: !sub.expanded } : sub)
            ),
          };
        }
        return it;
      })
    );
  }
}
