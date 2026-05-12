import { ChangeDetectionStrategy, Component, signal, viewChild } from '@angular/core';
import type { Signal, WritableSignal } from '@angular/core';
import { Menu } from 'ui-lib-custom/menu';
import { Button } from 'ui-lib-custom/button';
import type { MenuItem, MenuItemCommandEvent, MenuVariant, MenuSize } from 'ui-lib-custom/menu';
import { DocPageLayoutComponent } from '../../shared/doc-page/doc-page-layout.component';
import { DocTocComponent } from '../../shared/doc-page/doc-toc.component';
import { DocCodeSnippetComponent } from '../../shared/doc-page/doc-code-snippet.component';
import type { DocSection } from '../../shared/doc-page/doc-section.model';

/**
 * Demo page for the Menu component.
 */
@Component({
  selector: 'app-menu-demo',
  standalone: true,
  imports: [Menu, Button, DocPageLayoutComponent, DocTocComponent, DocCodeSnippetComponent],
  templateUrl: './menu-demo.component.html',
  styleUrl: './menu-demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuDemoComponent {
  public readonly layout: Signal<DocPageLayoutComponent | undefined> =
    viewChild(DocPageLayoutComponent);

  public readonly sections: DocSection[] = [
    { id: 'overview', label: 'Overview' },
    { id: 'basic', label: 'Basic (Inline)' },
    { id: 'separator', label: 'With Separator' },
    { id: 'disabled', label: 'Disabled Items' },
    { id: 'grouped', label: 'Grouped Items' },
    { id: 'popup', label: 'Popup Mode' },
    { id: 'popup-grouped', label: 'Popup with Groups' },
    { id: 'commands', label: 'Commands & Events' },
    { id: 'url-items', label: 'URL Items' },
    { id: 'variants', label: 'Variants' },
    { id: 'sizes', label: 'Sizes' },
    {
      id: 'api',
      label: 'API',
      children: [
        { id: 'api-inputs', label: 'Inputs' },
        { id: 'api-outputs', label: 'Outputs' },
        { id: 'api-methods', label: 'Methods' },
        { id: 'api-item', label: 'MenuItem' },
      ],
    },
    {
      id: 'accessibility',
      label: 'Accessibility',
      children: [
        { id: 'a11y-aria', label: 'ARIA Attributes' },
        { id: 'a11y-keyboard', label: 'Keyboard' },
      ],
    },
  ];

  public readonly snippets: {
    readonly import: string;
    readonly basic: string;
    readonly separator: string;
    readonly grouped: string;
    readonly popup: string;
    readonly commands: string;
    readonly urlItems: string;
    readonly variants: string;
    readonly sizes: string;
  } = {
    import: `import { Menu } from 'ui-lib-custom/menu';
import type { MenuItem } from 'ui-lib-custom/menu';`,
    basic: `<ui-lib-menu [model]="items" (itemClick)="onItemClick($event)" />`,
    separator: `items: MenuItem[] = [
  { label: 'New File', icon: 'pi pi-file' },
  { label: 'Open',     icon: 'pi pi-folder-open' },
  { separator: true },
  { label: 'Save',     icon: 'pi pi-save' },
  { label: 'Exit',     icon: 'pi pi-times' },
];`,
    grouped: `items: MenuItem[] = [
  {
    label: 'Account',
    items: [
      { label: 'Profile',       icon: 'pi pi-user' },
      { label: 'Security',      icon: 'pi pi-lock' },
      { label: 'Notifications', icon: 'pi pi-bell' },
    ],
  },
  {
    label: 'Workspace',
    items: [
      { label: 'Projects',  icon: 'pi pi-briefcase' },
      { label: 'Billing',   icon: 'pi pi-credit-card' },
    ],
  },
];`,
    popup: `<!-- trigger button wires aria-haspopup, aria-expanded, aria-controls -->
<ui-lib-button
  [attr.aria-haspopup]="'menu'"
  [attr.aria-expanded]="popupMenu.isVisible()"
  [attr.aria-controls]="popupMenu.menuId"
  (click)="popupMenu.toggle($event)"
>
  Options
</ui-lib-button>
<ui-lib-menu #popupMenu [model]="items" [popup]="true" />`,
    commands: `items: MenuItem[] = [
  {
    label: 'Download',
    icon: 'pi pi-download',
    command: (event) => console.log('clicked', event.item.label),
  },
];

// Or via the itemClick output:
onItemClick(event: MenuItemCommandEvent): void {
  console.log(event.item.label);
}`,
    urlItems: `items: MenuItem[] = [
  { label: 'Documentation', url: 'https://angular.dev', target: '_blank' },
  { label: 'GitHub',        url: 'https://github.com', target: '_blank' },
  { separator: true },
  { label: 'Command item',  icon: 'pi pi-star' },
];`,
    variants: `<ui-lib-menu [model]="items" variant="material"  />
<ui-lib-menu [model]="items" variant="bootstrap" />
<ui-lib-menu [model]="items" variant="minimal"   />`,
    sizes: `<ui-lib-menu [model]="items" size="sm" />
<ui-lib-menu [model]="items" size="md" />
<ui-lib-menu [model]="items" size="lg" />`,
  } as const;

  public readonly variant: WritableSignal<MenuVariant> = signal<MenuVariant>('material');
  public readonly size: WritableSignal<MenuSize> = signal<MenuSize>('md');
  public readonly eventLog: WritableSignal<string[]> = signal<string[]>([]);

  public readonly basicItems: MenuItem[] = [
    { label: 'Profile', icon: 'pi pi-user' },
    { label: 'Messages', icon: 'pi pi-envelope' },
    { label: 'Settings', icon: 'pi pi-cog' },
  ];

  public readonly separatorItems: MenuItem[] = [
    { label: 'New File', icon: 'pi pi-file' },
    { label: 'Open', icon: 'pi pi-folder-open' },
    { separator: true },
    { label: 'Save', icon: 'pi pi-save' },
    { label: 'Save As', icon: 'pi pi-copy' },
    { separator: true },
    { label: 'Exit', icon: 'pi pi-times' },
  ];

  public readonly disabledItems: MenuItem[] = [
    { label: 'Undo', icon: 'pi pi-replay' },
    { label: 'Redo', icon: 'pi pi-refresh', disabled: true },
    { separator: true },
    { label: 'Cut', icon: 'pi pi-times' },
    { label: 'Copy', icon: 'pi pi-copy' },
    { label: 'Paste', icon: 'pi pi-clipboard', disabled: true },
  ];

  public readonly groupedItems: MenuItem[] = [
    {
      label: 'Account',
      items: [
        { label: 'Profile', icon: 'pi pi-user' },
        { label: 'Security', icon: 'pi pi-lock' },
        { label: 'Notifications', icon: 'pi pi-bell' },
      ],
    },
    {
      label: 'Workspace',
      items: [
        { label: 'Projects', icon: 'pi pi-briefcase' },
        { label: 'Analytics', icon: 'pi pi-chart-bar' },
        { label: 'Billing', icon: 'pi pi-credit-card' },
      ],
    },
    {
      label: 'Support',
      items: [
        { label: 'Documentation', icon: 'pi pi-book' },
        { label: 'Help Center', icon: 'pi pi-question-circle' },
      ],
    },
  ];

  public readonly popupItems: MenuItem[] = [
    { label: 'View Details', icon: 'pi pi-eye' },
    { label: 'Edit', icon: 'pi pi-pencil' },
    { separator: true },
    { label: 'Duplicate', icon: 'pi pi-copy' },
    { label: 'Move to Trash', icon: 'pi pi-trash' },
  ];

  public readonly popupGroupedItems: MenuItem[] = [
    {
      label: 'File',
      items: [
        { label: 'New', icon: 'pi pi-file' },
        { label: 'Open', icon: 'pi pi-folder-open' },
        { label: 'Export', icon: 'pi pi-download' },
      ],
    },
    {
      label: 'Edit',
      items: [
        { label: 'Cut', icon: 'pi pi-times' },
        { label: 'Copy', icon: 'pi pi-copy' },
        { label: 'Paste', icon: 'pi pi-clipboard', disabled: true },
      ],
    },
  ];

  public readonly commandItems: MenuItem[] = [
    {
      label: 'Download',
      icon: 'pi pi-download',
      command: (event: MenuItemCommandEvent): void => {
        this.logEvent(`Command fired: ${event.item.label ?? ''}`);
      },
    },
    {
      label: 'Share',
      icon: 'pi pi-share-alt',
      command: (event: MenuItemCommandEvent): void => {
        this.logEvent(`Command fired: ${event.item.label ?? ''}`);
      },
    },
    { separator: true },
    {
      label: 'Delete',
      icon: 'pi pi-trash',
      command: (event: MenuItemCommandEvent): void => {
        this.logEvent(`Command fired: ${event.item.label ?? ''}`);
      },
    },
  ];

  public readonly urlItems: MenuItem[] = [
    { label: 'Documentation', icon: 'pi pi-book', url: 'https://angular.dev', target: '_blank' },
    {
      label: 'GitHub',
      icon: 'pi pi-github',
      url: 'https://github.com/angular/angular',
      target: '_blank',
    },
    { separator: true },
    { label: 'Command item', icon: 'pi pi-star' },
  ];

  public readonly variantItems: MenuItem[] = [
    { label: 'Dashboard', icon: 'pi pi-home' },
    { label: 'Reports', icon: 'pi pi-chart-line' },
    { separator: true },
    { label: 'Settings', icon: 'pi pi-cog' },
  ];

  public readonly sizeItems: MenuItem[] = [
    { label: 'Item One', icon: 'pi pi-circle' },
    { label: 'Item Two', icon: 'pi pi-circle' },
    { label: 'Item Three', icon: 'pi pi-circle' },
  ];

  public onItemClick(event: MenuItemCommandEvent): void {
    this.logEvent(`itemClick output: "${event.item.label ?? ''}"`);
  }

  public setVariant(value: MenuVariant): void {
    this.variant.set(value);
  }

  public setSize(value: MenuSize): void {
    this.size.set(value);
  }

  public scrollTo(id: string): void {
    this.layout()?.scrollToSection(id);
  }

  private logEvent(message: string): void {
    this.eventLog.update((log: string[]): string[] => [message, ...log].slice(0, 5));
  }
}
