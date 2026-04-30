import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
  Injector,
  signal,
} from '@angular/core';
import type { WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { filter } from 'rxjs/operators';
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
  private readonly router: Router = inject(Router);
  private readonly elementRef: ElementRef<HTMLElement> =
    inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly injector: Injector = inject(Injector);

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
      expanded: false,
      items: this.buildGroupedSubmenuItems([
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
        },
        {
          label: 'SplitButton',
          icon: 'pi pi-circle',
          route: '/split-button',
          group: 'Button',
        },
        {
          label: 'Chart',
          icon: 'pi pi-circle',
          route: '/chart',
          group: 'Chart',
        },
        {
          label: 'DataView',
          icon: 'pi pi-circle',
          route: '/data-view',
          group: 'Data',
        },
        {
          label: 'OrderList',
          icon: 'pi pi-circle',
          route: '/order-list',
          group: 'Data',
        },
        {
          label: 'OrganizationChart',
          icon: 'pi pi-circle',
          route: '/organization-chart',
          group: 'Data',
        },
        {
          label: 'Paginator',
          icon: 'pi pi-circle',
          route: '/paginator',
          group: 'Data',
        },
        {
          label: 'PickList',
          icon: 'pi pi-circle',
          route: '/pick-list',
          group: 'Data',
        },
        {
          label: 'Scroller',
          icon: 'pi pi-circle',
          route: '/scroller',
          group: 'Data',
        },
        {
          label: 'Table',
          icon: 'pi pi-circle',
          route: '/table',
          group: 'Data',
        },
        {
          label: 'Timeline',
          icon: 'pi pi-circle',
          route: '/timeline',
          group: 'Data',
        },
        {
          label: 'Tree',
          icon: 'pi pi-circle',
          route: '/tree',
          group: 'Data',
        },
        {
          label: 'TreeTable',
          icon: 'pi pi-circle',
          route: '/tree-table',
          group: 'Data',
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
        },
        {
          label: 'KeyFilter',
          icon: 'pi pi-circle',
          route: '/key-filter',
          group: 'Form',
        },
        {
          label: 'Knob',
          icon: 'pi pi-circle',
          route: '/knob',
          group: 'Form',
        },
        {
          label: 'Listbox',
          icon: 'pi pi-circle',
          route: '/listbox',
          group: 'Form',
        },
        {
          label: 'Password',
          icon: 'pi pi-circle',
          route: '/password',
          group: 'Form',
        },
        {
          label: 'RadioButton',
          icon: 'pi pi-circle',
          route: '/radio-button',
          group: 'Form',
        },
        {
          label: 'Rating',
          icon: 'pi pi-circle',
          route: '/rating',
          group: 'Form',
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
        },
        {
          label: 'Textarea',
          icon: 'pi pi-circle',
          route: '/textarea',
          group: 'Form',
        },
        {
          label: 'ToggleButton',
          icon: 'pi pi-circle',
          route: '/toggle-button',
          group: 'Form',
        },
        {
          label: 'ToggleSwitch',
          icon: 'pi pi-circle',
          route: '/toggle-switch',
          group: 'Form',
        },
        {
          label: 'TreeSelect',
          icon: 'pi pi-circle',
          route: '/tree-select',
          group: 'Form',
        },
        {
          label: 'Galleria',
          icon: 'pi pi-images',
          route: '/gallery',
          group: 'Media',
        },
        {
          label: 'Carousel',
          icon: 'pi pi-circle',
          route: '/carousel',
          group: 'Media',
        },
        {
          label: 'Image',
          icon: 'pi pi-circle',
          route: '/image',
          group: 'Media',
        },
        {
          label: 'ImageCompare',
          icon: 'pi pi-circle',
          route: '/image-compare',
          group: 'Media',
        },
        {
          label: 'Sidebar Menu',
          icon: 'pi pi-circle',
          route: '/sidebar-menu',
          group: 'Menu',
        },
        {
          label: 'Breadcrumb',
          icon: 'pi pi-circle',
          route: '/breadcrumb',
          group: 'Menu',
        },
        {
          label: 'ContextMenu',
          icon: 'pi pi-circle',
          route: '/context-menu',
          group: 'Menu',
        },
        {
          label: 'Dock',
          icon: 'pi pi-circle',
          route: '/dock',
          group: 'Menu',
        },
        {
          label: 'Menu',
          icon: 'pi pi-circle',
          route: '/menu',
          group: 'Menu',
        },
        {
          label: 'Message',
          icon: 'pi pi-circle',
          route: '/message',
          group: 'Messages',
          badge: 'TODO',
        },
        {
          label: 'Menubar',
          icon: 'pi pi-circle',
          route: '/menubar',
          group: 'Menu',
        },
        {
          label: 'MegaMenu',
          icon: 'pi pi-circle',
          route: '/mega-menu',
          group: 'Menu',
        },
        {
          label: 'PanelMenu',
          icon: 'pi pi-circle',
          route: '/panel-menu',
          group: 'Menu',
          badge: 'TODO',
        },
        {
          label: 'TieredMenu',
          icon: 'pi pi-circle',
          route: '/tiered-menu',
          group: 'Menu',
          badge: 'TODO',
        },
        {
          label: 'Toast',
          icon: 'pi pi-circle',
          route: '/toast',
          group: 'Messages',
          badge: 'TODO',
        },
        {
          label: 'AnimatedOnScroll',
          icon: 'pi pi-circle',
          route: '/animated-on-scroll',
          group: 'Misc',
          badge: 'TODO',
        },
        {
          label: 'AutoFocus',
          icon: 'pi pi-circle',
          route: '/auto-focus',
          group: 'Misc',
          badge: 'TODO',
        },
        {
          label: 'Avatar',
          icon: 'pi pi-circle',
          route: '/avatar',
          group: 'Misc',
          badge: 'TODO',
        },
        {
          label: 'Badge',
          icon: 'pi pi-circle',
          route: '/badges',
          group: 'Misc',
        },
        {
          label: 'Bind',
          icon: 'pi pi-circle',
          route: '/bind',
          group: 'Misc',
          badge: 'TODO',
        },
        {
          label: 'BlockUI',
          icon: 'pi pi-circle',
          route: '/block-ui',
          group: 'Misc',
          badge: 'TODO',
        },
        {
          label: 'Bottom Sheet',
          icon: 'pi pi-circle',
          route: '/bottom-sheet',
          group: 'Overlay',
          badge: 'TODO',
        },
        {
          label: 'Chip',
          icon: 'pi pi-circle',
          route: '/chip',
          group: 'Misc',
          badge: 'TODO',
        },
        {
          label: 'ClassNames',
          icon: 'pi pi-circle',
          route: '/class-names',
          group: 'Misc',
          badge: 'TODO',
        },
        {
          label: 'FocusTrap',
          icon: 'pi pi-circle',
          route: '/focus-trap',
          group: 'Misc',
          badge: 'TODO',
        },
        {
          label: 'Fluid',
          icon: 'pi pi-circle',
          route: '/fluid',
          group: 'Misc',
          badge: 'TODO',
        },
        {
          label: 'Inplace',
          icon: 'pi pi-circle',
          route: '/inplace',
          group: 'Misc',
          badge: 'TODO',
        },
        {
          label: 'MeterGroup',
          icon: 'pi pi-circle',
          route: '/meter-group',
          group: 'Misc',
          badge: 'TODO',
        },
        {
          label: 'ProgressBar',
          icon: 'pi pi-circle',
          route: '/progress-bar',
          group: 'Misc',
          badge: 'TODO',
        },
        {
          label: 'ProgressSpinner',
          icon: 'pi pi-circle',
          route: '/progress-spinner',
          group: 'Misc',
          badge: 'TODO',
        },
        {
          label: 'Ripple',
          icon: 'pi pi-circle',
          route: '/ripple',
          group: 'Misc',
          badge: 'TODO',
        },
        {
          label: 'ScrollTop',
          icon: 'pi pi-circle',
          route: '/scroll-top',
          group: 'Misc',
          badge: 'TODO',
        },
        {
          label: 'Skeleton',
          icon: 'pi pi-circle',
          route: '/skeleton',
          group: 'Misc',
          badge: 'TODO',
        },
        {
          label: 'Shadows',
          icon: 'pi pi-circle',
          route: '/shadows',
          group: 'Misc',
        },
        {
          label: 'StyleClass',
          icon: 'pi pi-circle',
          route: '/style-class',
          group: 'Misc',
          badge: 'TODO',
        },
        {
          label: 'Tag',
          icon: 'pi pi-circle',
          route: '/tag',
          group: 'Misc',
          badge: 'TODO',
        },
        {
          label: 'Terminal',
          icon: 'pi pi-circle',
          route: '/terminal',
          group: 'Misc',
          badge: 'TODO',
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
          label: 'Upload',
          icon: 'pi pi-circle',
          route: '/upload',
          group: 'File',
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
      label: 'UI Blocks',
      icon: 'pi pi-clone',
      expanded: false,
      items: this.buildGroupedSubmenuItems([
        {
          label: 'Login Forms',
          icon: 'pi pi-sign-in',
          route: '/login',
          group: 'Authentication',
        },
      ]),
    },
    {
      label: 'Templates',
      icon: 'pi pi-copy',
      expanded: false,
      items: [
        {
          label: 'Starter Template',
          icon: 'pi pi-circle',
          route: '/templates/starter-template',
          badge: 'TODO',
        },
      ],
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
      expanded: false,
      items: [
        {
          label: 'Overview',
          icon: 'pi pi-circle',
          route: '/accessibility',
        },
      ],
    },
  ]);

  public onSidebarScroll(event: Event): void {
    const scrollElement: HTMLElement | null = event.target as HTMLElement | null;
    this.isContentScrolled.set((scrollElement?.scrollTop ?? 0) > 0);
  }

  constructor() {
    // Expand the section that contains the active route on initial load (including page refresh).
    this.expandActiveSection(this.router.url);
    this.scrollToActiveItem();

    // Re-expand on every subsequent navigation so the correct section stays open.
    this.router.events
      .pipe(
        filter((event: object): event is NavigationEnd => event instanceof NavigationEnd),
        takeUntilDestroyed()
      )
      .subscribe((event: NavigationEnd): void => {
        this.expandActiveSection(event.urlAfterRedirects);
        this.scrollToActiveItem();
      });
  }

  /**
   * Expand any top-level menu section whose sub-items contain a route matching
   * the given URL path. Already-expanded sections are left untouched.
   */
  private expandActiveSection(url: string): void {
    // Strip query-string and fragment so plain route comparison works.
    const urlPath: string = (url.split('?')[0] ?? '').split('#')[0] ?? '';

    this.menuItems.update((items: NavItem[]): NavItem[] =>
      items.map((item: NavItem): NavItem => {
        if (!item.items) {
          return item;
        }

        const hasActiveChild: boolean = item.items.some(
          (sub: NavItem): boolean => Boolean(sub.route) && sub.route === urlPath
        );

        if (hasActiveChild && !item.expanded) {
          return { ...item, expanded: true };
        }

        return item;
      })
    );
  }

  /**
   * After the next render (so the DOM reflects the newly-expanded section),
   * scroll the sidebar content container so the active link is fully in view.
   */
  private scrollToActiveItem(): void {
    afterNextRender(
      (): void => {
        const sidebarContent: HTMLElement | null =
          this.elementRef.nativeElement.querySelector<HTMLElement>('.sidebar-content');
        const activeLink: HTMLElement | null =
          this.elementRef.nativeElement.querySelector<HTMLElement>('.nav-link.active');

        if (!sidebarContent || !activeLink) {
          return;
        }

        // Compute the active link's top/bottom relative to the scroll container.
        const containerRect: DOMRect = sidebarContent.getBoundingClientRect();
        const linkRect: DOMRect = activeLink.getBoundingClientRect();

        const linkRelativeTop: number = linkRect.top - containerRect.top + sidebarContent.scrollTop;
        const linkRelativeBottom: number = linkRelativeTop + linkRect.height;

        const visibleTop: number = sidebarContent.scrollTop;
        const visibleBottom: number = visibleTop + sidebarContent.clientHeight;

        const padding: number = 8;

        if (linkRelativeTop < visibleTop) {
          // Link is above the visible area — scroll up to reveal it.
          sidebarContent.scrollTop = linkRelativeTop - padding;
        } else if (linkRelativeBottom > visibleBottom) {
          // Link is below the visible area — scroll down to reveal it.
          sidebarContent.scrollTop = linkRelativeBottom - sidebarContent.clientHeight + padding;
        }
      },
      { injector: this.injector }
    );
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
