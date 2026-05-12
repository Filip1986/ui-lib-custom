import { ChangeDetectionStrategy, Component, signal, viewChild } from '@angular/core';
import type { Signal, WritableSignal } from '@angular/core';
import { TieredMenu } from 'ui-lib-custom/tiered-menu';
import { Button } from 'ui-lib-custom/button';
import type {
  TieredMenuItem,
  TieredMenuItemCommandEvent,
  TieredMenuVariant,
  TieredMenuSize,
} from 'ui-lib-custom/tiered-menu';
import { DocPageLayoutComponent } from '../../shared/doc-page/doc-page-layout.component';
import { DocTocComponent } from '../../shared/doc-page/doc-toc.component';
import { DocCodeSnippetComponent } from '../../shared/doc-page/doc-code-snippet.component';
import type { DocSection } from '../../shared/doc-page/doc-section.model';

/**
 * Demo page for the TieredMenu component.
 */
@Component({
  selector: 'app-tiered-menu-demo',
  standalone: true,
  imports: [TieredMenu, Button, DocPageLayoutComponent, DocTocComponent, DocCodeSnippetComponent],
  templateUrl: './tiered-menu-demo.component.html',
  styleUrl: './tiered-menu-demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TieredMenuDemoComponent {
  public readonly layout: Signal<DocPageLayoutComponent | undefined> =
    viewChild(DocPageLayoutComponent);

  public readonly sections: DocSection[] = [
    { id: 'overview', label: 'Overview' },
    { id: 'basic', label: 'Basic (Inline)' },
    { id: 'nested', label: 'Nested Submenus' },
    { id: 'popup', label: 'Popup Mode' },
    { id: 'variants', label: 'Variants' },
    { id: 'sizes', label: 'Sizes' },
    { id: 'item-states', label: 'Item States' },
    { id: 'url-items', label: 'URL Items' },
    {
      id: 'api',
      label: 'API',
      children: [
        { id: 'api-inputs', label: 'Inputs' },
        { id: 'api-outputs', label: 'Outputs' },
        { id: 'api-methods', label: 'Methods' },
        { id: 'api-item', label: 'TieredMenuItem' },
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
    readonly nested: string;
    readonly popup: string;
    readonly variants: string;
    readonly sizes: string;
    readonly itemStates: string;
    readonly urlItems: string;
  } = {
    import: `import { TieredMenu } from 'ui-lib-custom/tiered-menu';
import type { TieredMenuItem } from 'ui-lib-custom/tiered-menu';`,
    basic: `<ui-lib-tiered-menu [model]="items" (itemClick)="onItemClick($event)" />`,
    nested: `items: TieredMenuItem[] = [
  {
    label: 'File', icon: 'pi pi-file',
    items: [
      { label: 'New',  icon: 'pi pi-plus' },
      {
        label: 'Export', icon: 'pi pi-download',
        items: [
          { label: 'PDF',   icon: 'pi pi-file-pdf' },
          { label: 'CSV',   icon: 'pi pi-table' },
        ],
      },
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
  Open Menu ▾
</ui-lib-button>
<ui-lib-tiered-menu #popupMenu [model]="items" [popup]="true" />`,
    variants: `<ui-lib-tiered-menu [model]="items" variant="material"  />
<ui-lib-tiered-menu [model]="items" variant="bootstrap" />
<ui-lib-tiered-menu [model]="items" variant="minimal"   />`,
    sizes: `<ui-lib-tiered-menu [model]="items" size="sm" />
<ui-lib-tiered-menu [model]="items" size="md" />
<ui-lib-tiered-menu [model]="items" size="lg" />`,
    itemStates: `items: TieredMenuItem[] = [
  { label: 'Enabled',  icon: 'pi pi-check' },
  { label: 'Disabled', icon: 'pi pi-ban',  disabled: true },
  { label: 'Hidden',   visible: false },
  { separator: true },
  {
    label: 'With Command',
    command: (event) => console.log('clicked', event.item.label),
  },
];`,
    urlItems: `items: TieredMenuItem[] = [
  { label: 'GitHub',        url: 'https://github.com',  target: '_blank' },
  { label: 'Documentation', url: 'https://angular.dev', target: '_blank' },
  { separator: true },
  { label: 'No URL item' },
];`,
  } as const;

  public readonly variant: WritableSignal<TieredMenuVariant> =
    signal<TieredMenuVariant>('material');
  public readonly size: WritableSignal<TieredMenuSize> = signal<TieredMenuSize>('md');
  public readonly lastEvent: WritableSignal<string> = signal<string>('');

  public readonly basicItems: TieredMenuItem[] = [
    { label: 'New File', icon: 'pi pi-file' },
    { label: 'Open', icon: 'pi pi-folder-open' },
    { separator: true },
    { label: 'Save', icon: 'pi pi-save' },
    { label: 'Save As', icon: 'pi pi-copy' },
    { separator: true },
    { label: 'Exit', icon: 'pi pi-times' },
  ];

  public readonly nestedItems: TieredMenuItem[] = [
    {
      label: 'File',
      icon: 'pi pi-file',
      items: [
        { label: 'New', icon: 'pi pi-plus' },
        { label: 'Open', icon: 'pi pi-folder-open' },
        {
          label: 'Export',
          icon: 'pi pi-download',
          items: [
            { label: 'PDF', icon: 'pi pi-file-pdf' },
            { label: 'CSV', icon: 'pi pi-table' },
            { label: 'Excel', icon: 'pi pi-file-excel' },
          ],
        },
      ],
    },
    {
      label: 'Edit',
      icon: 'pi pi-pencil',
      items: [
        { label: 'Cut', icon: 'pi pi-times' },
        { label: 'Copy', icon: 'pi pi-copy' },
        { label: 'Paste', icon: 'pi pi-clone' },
        { separator: true },
        { label: 'Select All' },
      ],
    },
    {
      label: 'View',
      icon: 'pi pi-eye',
      items: [{ label: 'Zoom In' }, { label: 'Zoom Out' }, { label: 'Reset Zoom' }],
    },
    { separator: true },
    { label: 'Quit', icon: 'pi pi-power-off' },
  ];

  public readonly stateItems: TieredMenuItem[] = [
    { label: 'Enabled', icon: 'pi pi-check' },
    { label: 'Disabled', icon: 'pi pi-ban', disabled: true },
    { label: 'Hidden', visible: false },
    { separator: true },
    {
      label: 'With Command',
      command: (event: TieredMenuItemCommandEvent): void => {
        this.onItemClick(event);
      },
    },
  ];

  public readonly urlItems: TieredMenuItem[] = [
    { label: 'GitHub', url: 'https://github.com', target: '_blank' },
    { label: 'Documentation', url: 'https://angular.dev', target: '_blank' },
    { separator: true },
    { label: 'No URL item' },
  ];

  public readonly popupItems: TieredMenuItem[] = [
    { label: 'Profile', icon: 'pi pi-user' },
    { label: 'Settings', icon: 'pi pi-cog' },
    { separator: true },
    {
      label: 'Share',
      icon: 'pi pi-share-alt',
      items: [
        { label: 'Email' },
        { label: 'Copy Link' },
        { label: 'Social Media', items: [{ label: 'Twitter' }, { label: 'LinkedIn' }] },
      ],
    },
    { separator: true },
    { label: 'Logout', icon: 'pi pi-sign-out' },
  ];

  public onItemClick(event: TieredMenuItemCommandEvent): void {
    this.lastEvent.set(`Clicked: ${event.item.label ?? '(no label)'}`);
  }

  public setVariant(value: TieredMenuVariant): void {
    this.variant.set(value);
  }

  public setSize(value: TieredMenuSize): void {
    this.size.set(value);
  }

  public scrollTo(id: string): void {
    this.layout()?.scrollToSection(id);
  }
}
