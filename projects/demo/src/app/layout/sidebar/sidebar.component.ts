import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import type { WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Icon } from 'ui-lib-custom/icon';

export interface NavItem {
  label: string;
  icon?: string;
  badge?: string;
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
  imports: [CommonModule, RouterModule, Icon],
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
      expanded: false,
      items: [
        {
          label: 'Home',
          icon: 'pi pi-circle',
          route: '/home',
        },
        {
          label: 'Project Starter',
          icon: 'pi pi-circle',
          route: '/project-starter',
        },
      ],
    },
    {
      label: 'Layout',
      icon: 'pi pi-th-large',
      expanded: false,
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
          label: 'Login Forms',
          icon: 'pi pi-sign-in',
          route: '/login',
          group: 'Blocks',
        },
        {
          label: 'Button',
          icon: 'pi pi-circle',
          route: '/buttons',
          group: 'Button',
        },
        {
          label: 'SpeedDial',
          icon: 'pi pi-circle',
          route: '/speed-dial',
          group: 'Button',
          badge: 'TODO',
        },
        {
          label: 'SplitButton',
          icon: 'pi pi-circle',
          route: '/split-button',
          group: 'Button',
          badge: 'TODO',
        },
        {
          label: 'DataView',
          icon: 'pi pi-circle',
          route: '/data-view',
          group: 'Data',
          badge: 'TODO',
        },
        {
          label: 'OrderList',
          icon: 'pi pi-circle',
          route: '/order-list',
          group: 'Data',
          badge: 'TODO',
        },
        {
          label: 'OrganizationChart',
          icon: 'pi pi-circle',
          route: '/organization-chart',
          group: 'Data',
          badge: 'TODO',
        },
        {
          label: 'Paginator',
          icon: 'pi pi-circle',
          route: '/paginator',
          group: 'Data',
          badge: 'TODO',
        },
        {
          label: 'PickList',
          icon: 'pi pi-circle',
          route: '/pick-list',
          group: 'Data',
          badge: 'TODO',
        },
        {
          label: 'Scroller',
          icon: 'pi pi-circle',
          route: '/scroller',
          group: 'Data',
          badge: 'TODO',
        },
        {
          label: 'Table',
          icon: 'pi pi-circle',
          route: '/table',
          group: 'Data',
          badge: 'TODO',
        },
        {
          label: 'Timeline',
          icon: 'pi pi-circle',
          route: '/timeline',
          group: 'Data',
          badge: 'TODO',
        },
        {
          label: 'Tree',
          icon: 'pi pi-circle',
          route: '/tree',
          group: 'Data',
          badge: 'TODO',
        },
        {
          label: 'TreeTable',
          icon: 'pi pi-circle',
          route: '/tree-table',
          group: 'Data',
          badge: 'TODO',
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
          label: 'InputText',
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
          label: 'InputOtp',
          icon: 'pi pi-circle',
          route: '/input-otp',
          group: 'Form',
          badge: 'TODO',
        },
        {
          label: 'KeyFilter',
          icon: 'pi pi-circle',
          route: '/key-filter',
          group: 'Form',
          badge: 'TODO',
        },
        {
          label: 'Knob',
          icon: 'pi pi-circle',
          route: '/knob',
          group: 'Form',
          badge: 'TODO',
        },
        {
          label: 'Listbox',
          icon: 'pi pi-circle',
          route: '/listbox',
          group: 'Form',
          badge: 'TODO',
        },
        {
          label: 'Password',
          icon: 'pi pi-circle',
          route: '/password',
          group: 'Form',
          badge: 'TODO',
        },
        {
          label: 'RadioButton',
          icon: 'pi pi-circle',
          route: '/radio-button',
          group: 'Form',
          badge: 'TODO',
        },
        {
          label: 'Rating',
          icon: 'pi pi-circle',
          route: '/rating',
          group: 'Form',
          badge: 'TODO',
        },
        {
          label: 'Select',
          icon: 'pi pi-circle',
          route: '/select',
          group: 'Form',
        },
        {
          label: 'SelectButton',
          icon: 'pi pi-circle',
          route: '/select-buttons',
          group: 'Form',
        },
        {
          label: 'Icons',
          icon: 'pi pi-circle',
          route: '/icons',
          group: 'Icon',
        },
        {
          label: 'Slider',
          icon: 'pi pi-circle',
          route: '/slider',
          group: 'Form',
          badge: 'TODO',
        },
        {
          label: 'Textarea',
          icon: 'pi pi-circle',
          route: '/textarea',
          group: 'Form',
          badge: 'TODO',
        },
        {
          label: 'ToggleButton',
          icon: 'pi pi-circle',
          route: '/toggle-button',
          group: 'Form',
          badge: 'TODO',
        },
        {
          label: 'ToggleSwitch',
          icon: 'pi pi-circle',
          route: '/toggle-switch',
          group: 'Form',
          badge: 'TODO',
        },
        {
          label: 'TreeSelect',
          icon: 'pi pi-circle',
          route: '/tree-select',
          group: 'Form',
          badge: 'TODO',
        },
        {
          label: 'Gallery',
          icon: 'pi pi-images',
          route: '/gallery',
          group: 'Media',
        },
        {
          label: 'Sidebar Menu',
          icon: 'pi pi-circle',
          route: '/sidebar-menu',
          group: 'Menu',
        },
        {
          label: 'Badge',
          icon: 'pi pi-circle',
          route: '/badges',
          group: 'Misc',
        },
        {
          label: 'Shadows',
          icon: 'pi pi-circle',
          route: '/shadows',
          group: 'Misc',
        },
        {
          label: 'ConfirmDialog',
          icon: 'pi pi-circle',
          route: '/confirm-dialog',
          group: 'Overlay',
          badge: 'TODO',
        },
        {
          label: 'ConfirmPopup',
          icon: 'pi pi-circle',
          route: '/confirm-popup',
          group: 'Overlay',
          badge: 'TODO',
        },
        {
          label: 'Dialog',
          icon: 'pi pi-circle',
          route: '/dialog',
          group: 'Overlay',
        },
        {
          label: 'Drawer',
          icon: 'pi pi-circle',
          route: '/drawer',
          group: 'Overlay',
          badge: 'TODO',
        },
        {
          label: 'DynamicDialog',
          icon: 'pi pi-circle',
          route: '/dynamic-dialog',
          group: 'Overlay',
          badge: 'TODO',
        },
        {
          label: 'Popover',
          icon: 'pi pi-circle',
          route: '/popover',
          group: 'Overlay',
          badge: 'TODO',
        },
        {
          label: 'Tooltip',
          icon: 'pi pi-circle',
          route: '/tooltip',
          group: 'Overlay',
          badge: 'TODO',
        },
        {
          label: 'Accordion',
          icon: 'pi pi-circle',
          route: '/accordion',
          group: 'Panel',
        },
        {
          label: 'Card',
          icon: 'pi pi-id-card',
          route: '/cards',
          group: 'Panel',
        },
        {
          label: 'Divider',
          icon: 'pi pi-circle',
          route: '/divider',
          group: 'Panel',
          badge: 'TODO',
        },
        {
          label: 'Fieldset',
          icon: 'pi pi-circle',
          route: '/fieldset',
          group: 'Panel',
          badge: 'TODO',
        },
        {
          label: 'Panel',
          icon: 'pi pi-circle',
          route: '/panel',
          group: 'Panel',
          badge: 'TODO',
        },
        {
          label: 'ScrollPanel',
          icon: 'pi pi-circle',
          route: '/scroll-panel',
          group: 'Panel',
          badge: 'TODO',
        },
        {
          label: 'Splitter',
          icon: 'pi pi-circle',
          route: '/splitter',
          group: 'Panel',
          badge: 'TODO',
        },
        {
          label: 'Stepper',
          icon: 'pi pi-circle',
          route: '/stepper',
          group: 'Panel',
          badge: 'TODO',
        },
        {
          label: 'Tabs',
          icon: 'pi pi-circle',
          route: '/tabs',
          group: 'Panel',
        },
        {
          label: 'Toolbar',
          icon: 'pi pi-circle',
          route: '/toolbar',
          group: 'Panel',
          badge: 'TODO',
        },
      ]),
    },
    {
      label: 'Theme',
      icon: 'pi pi-palette',
      expanded: false,
      items: [
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
      ],
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
    const groupedItemsByName: Map<string, NavItem[]> = new Map<string, NavItem[]>();
    const ungroupedItems: NavItem[] = [];

    items.forEach((item: NavItem): void => {
      if (item.group) {
        const currentGroupItems: NavItem[] = groupedItemsByName.get(item.group) ?? [];
        currentGroupItems.push(item);
        groupedItemsByName.set(item.group, currentGroupItems);
        return;
      }

      ungroupedItems.push(item);
    });

    const sortedGroupNames: string[] = Array.from(groupedItemsByName.keys()).sort(
      (left: string, right: string): number => this.compareLabels(left, right)
    );

    const sortedGroupedItems: NavItem[] = sortedGroupNames.flatMap(
      (groupName: string): NavItem[] => {
        const groupItems: NavItem[] = [...(groupedItemsByName.get(groupName) ?? [])].sort(
          (left: NavItem, right: NavItem): number => this.compareLabels(left.label, right.label)
        );

        return [{ label: groupName, isGroupLabel: true }, ...groupItems];
      }
    );

    const sortedUngroupedItems: NavItem[] = [...ungroupedItems].sort(
      (left: NavItem, right: NavItem): number => this.compareLabels(left.label, right.label)
    );

    return [...sortedGroupedItems, ...sortedUngroupedItems];
  }

  private compareLabels(left: string, right: string): number {
    return left.localeCompare(right, undefined, { sensitivity: 'base' });
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
