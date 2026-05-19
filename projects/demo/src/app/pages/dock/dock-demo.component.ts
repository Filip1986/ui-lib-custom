import { ChangeDetectionStrategy, Component, signal, viewChild } from '@angular/core';
import type { Signal, WritableSignal } from '@angular/core';
import { CodeSnippet } from 'ui-lib-custom/code-snippet';
import { Dock } from 'ui-lib-custom/dock';
import { Button } from 'ui-lib-custom/button';
import type {
  DockItem,
  DockItemCommandEvent,
  DockPosition,
  DockSize,
  DockVariant,
} from 'ui-lib-custom/dock';
import { DocPageHeaderComponent } from '@demo/shared/doc-page/doc-page-header.component';
import { DocPageLayoutComponent } from '../../shared/doc-page/doc-page-layout.component';
import { DocTocComponent } from '../../shared/doc-page/doc-toc.component';
import type { DocSection } from '../../shared/doc-page/doc-section.model';
import { DocQualityBadgeComponent } from '@demo/shared/doc-page/doc-quality-badge.component';
import type { ComponentQualityAudit } from '@demo/shared/doc-page/doc-quality-badge.component';
import { DocKeyboardNavComponent } from '@demo/shared/doc-page/doc-keyboard-nav.component';
import type { KeyboardNavRow } from '@demo/shared/doc-page/doc-keyboard-nav.component';
import { DocApiReferenceComponent } from '@demo/shared/doc-page/doc-api-reference.component';
import type { ApiPropRow } from '@demo/shared/doc-page/doc-api-reference.component';

/**
 * Demo page for the Dock component.
 */
@Component({
  selector: 'app-dock-demo',
  standalone: true,
  imports: [
    CodeSnippet,
    Dock,
    Button,
    DocPageHeaderComponent,
    DocPageLayoutComponent,
    DocTocComponent,
    DocQualityBadgeComponent,
    DocKeyboardNavComponent,
    DocApiReferenceComponent,
  ],
  templateUrl: './dock-demo.component.html',
  styleUrl: './dock-demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DockDemoComponent {
  public readonly importCode: string = "import { Dock } from 'ui-lib-custom/dock'";

  public readonly qualityAudit: ComponentQualityAudit = {
    date: '2026-05-18',
    tier: 1,
    scores: {
      api: 9,
      a11y: 9,
      perf: 9,
      comp: 9,
      theme: 9,
      dx: 9,
      docs: 9,
      polish: 9,
      angular: 9,
      feel: 9,
    },
    competitiveParity: 'pending',
  };
  public readonly snippetBasic: string = `{} osItems: DockItem[] = [\n  { label: 'Finder', icon: 'pi pi-folder', command: handler },\n  { label: 'Terminal', icon: 'pi pi-code', command: handler },\n  // ...\n];\n\n<ui-lib-dock [items]="osItems" position="bottom" variant="material" />`;
  public readonly snippetVariants: string = `<ui-lib-dock [items]="items" variant="material" />\n<ui-lib-dock [items]="items" variant="bootstrap" />\n<ui-lib-dock [items]="items" variant="minimal" />`;
  public readonly snippetSizes: string = `<ui-lib-dock [items]="items" size="sm" />\n<ui-lib-dock [items]="items" size="md" />\n<ui-lib-dock [items]="items" size="lg" />`;
  public readonly snippetPositions: string = `<ui-lib-dock [items]="items" position="bottom" />\n<ui-lib-dock [items]="items" position="top" />\n<ui-lib-dock [items]="items" position="left" />\n<ui-lib-dock [items]="items" position="right" />`;
  public readonly snippetNoMagnification: string = `<ui-lib-dock [items]="items" [magnification]="false" />`;
  public readonly snippetDisabledItems: string = `const items: DockItem[] = [\n  { label: 'Home', icon: 'pi pi-home', command: handler },\n  { label: 'Search', icon: 'pi pi-search', disabled: true },\n  // ...\n];`;
  public readonly snippetLinkItems: string = `// Anchor with external URL\n{ label: 'Anthropic', icon: 'pi pi-external-link', url: 'https://anthropic.com', target: '_blank' }\n\n// Angular RouterLink\n{ label: 'Home', icon: 'pi pi-home', routerLink: '/' }\n\n// Button with command\n{ label: 'Settings', icon: 'pi pi-cog', command: handler }`;
  public readonly layout: Signal<DocPageLayoutComponent | undefined> =
    viewChild(DocPageLayoutComponent);

  public readonly sections: DocSection[] = [
    { id: 'overview', label: 'Overview' },
    { id: 'basic', label: 'Basic' },
    { id: 'variants', label: 'Variants' },
    { id: 'sizes', label: 'Sizes' },
    { id: 'positions', label: 'Positions' },
    { id: 'no-magnification', label: 'No Magnification' },
    { id: 'disabled-items', label: 'Disabled Items' },
    { id: 'link-items', label: 'Link Items' },
    { id: 'playground', label: 'Interactive Playground' },
    { id: 'api', label: 'API' },
    { id: 'keyboard-navigation', label: 'Keyboard Navigation' },
  ];

  public scrollTo(id: string): void {
    this.layout()?.scrollToSection(id);
  }

  public readonly apiRows: ApiPropRow[] = [
    { name: 'model', type: 'DockItem[]', default: '[]', description: 'Array of dock items.' },
    {
      name: 'position',
      type: "'bottom' | 'top' | 'left' | 'right'",
      default: "'bottom'",
      description: 'Position of the dock on screen.',
    },
    {
      name: 'magnification',
      type: 'boolean',
      default: 'true',
      description: 'Enables zoom magnification on hover.',
    },
    {
      name: 'magnificationScale',
      type: 'number',
      default: '1.5',
      description: 'Scale multiplier applied to hovered items.',
    },
    {
      name: 'variant',
      type: "'material' | 'bootstrap' | 'minimal' | null",
      default: 'null',
      description: 'Design variant.',
    },
    {
      name: 'ariaLabel',
      type: 'string',
      default: "'Dock'",
      description: 'Accessible label for the dock navigation.',
    },
  ];

  // ── Controls ──────────────────────────────────────────────────────────────

  public readonly variant: WritableSignal<DockVariant> = signal<DockVariant>('material');
  public readonly size: WritableSignal<DockSize> = signal<DockSize>('md');
  public readonly position: WritableSignal<DockPosition> = signal<DockPosition>('bottom');
  public readonly magnification: WritableSignal<boolean> = signal<boolean>(true);
  public readonly magnificationLevel: WritableSignal<number> = signal<number>(1.5);
  public readonly lastEvent: WritableSignal<string> = signal<string>('');

  // ── Available options ──────────────────────────────────────────────────────

  public readonly variants: DockVariant[] = ['material', 'bootstrap', 'minimal'];
  public readonly sizes: DockSize[] = ['sm', 'md', 'lg'];
  public readonly positions: DockPosition[] = ['bottom', 'top', 'left', 'right'];

  // ── Sample item sets ──────────────────────────────────────────────────────

  /** OS-style dock items used in most demos. */
  public readonly osItems: DockItem[] = [
    {
      label: 'Finder',
      icon: 'bootstrapList',
      command: (event: DockItemCommandEvent): void => {
        this.lastEvent.set(`Clicked: ${event.item.label ?? ''}`);
      },
    },
    {
      label: 'Terminal',
      icon: 'bootstrapPencil',
      command: (event: DockItemCommandEvent): void => {
        this.lastEvent.set(`Clicked: ${event.item.label ?? ''}`);
      },
    },
    {
      label: 'Browser',
      icon: 'bootstrapShare',
      command: (event: DockItemCommandEvent): void => {
        this.lastEvent.set(`Clicked: ${event.item.label ?? ''}`);
      },
    },
    {
      label: 'Mail',
      icon: 'bootstrapEnvelope',
      command: (event: DockItemCommandEvent): void => {
        this.lastEvent.set(`Clicked: ${event.item.label ?? ''}`);
      },
    },
    {
      label: 'Music',
      icon: 'bootstrapStar',
      command: (event: DockItemCommandEvent): void => {
        this.lastEvent.set(`Clicked: ${event.item.label ?? ''}`);
      },
    },
    {
      label: 'Photos',
      icon: 'bootstrapHeart',
      command: (event: DockItemCommandEvent): void => {
        this.lastEvent.set(`Clicked: ${event.item.label ?? ''}`);
      },
    },
    {
      label: 'Settings',
      icon: 'bootstrapGear',
      command: (event: DockItemCommandEvent): void => {
        this.lastEvent.set(`Clicked: ${event.item.label ?? ''}`);
      },
    },
    {
      label: 'Trash',
      icon: 'bootstrapTrash',
      command: (event: DockItemCommandEvent): void => {
        this.lastEvent.set(`Clicked: ${event.item.label ?? ''}`);
      },
    },
  ];

  /** Items with some disabled entries. */
  public readonly itemsWithDisabled: DockItem[] = [
    {
      label: 'Home',
      icon: 'bootstrapHouse',
      command: (event: DockItemCommandEvent): void => {
        this.lastEvent.set(`Clicked: ${event.item.label ?? ''}`);
      },
    },
    {
      label: 'Search (unavailable)',
      icon: 'bootstrapSearch',
      disabled: true,
    },
    {
      label: 'Star',
      icon: 'bootstrapStar',
      command: (event: DockItemCommandEvent): void => {
        this.lastEvent.set(`Clicked: ${event.item.label ?? ''}`);
      },
    },
    {
      label: 'Bell (unavailable)',
      icon: 'bootstrapBell',
      disabled: true,
    },
    {
      label: 'User',
      icon: 'bootstrapPerson',
      command: (event: DockItemCommandEvent): void => {
        this.lastEvent.set(`Clicked: ${event.item.label ?? ''}`);
      },
    },
  ];

  /** External anchor items (url / routerLink). */
  public readonly linkItems: DockItem[] = [
    {
      label: 'Anthropic',
      icon: 'bootstrapArrowRight',
      url: 'https://anthropic.com',
      target: '_blank',
    },
    {
      label: 'Angular',
      icon: 'bootstrapPencil',
      url: 'https://angular.dev',
      target: '_blank',
    },
    {
      label: 'Home',
      icon: 'bootstrapHouse',
      routerLink: '/',
    },
  ];

  // ── Event handler for playground ──────────────────────────────────────────

  /** Handles itemClick from the interactive playground dock. */
  public onItemClick(event: DockItemCommandEvent): void {
    this.lastEvent.set(`Clicked: ${event.item.label ?? '(no label)'}`);
  }

  /** Sets the active variant. */
  public setVariant(variant: DockVariant): void {
    this.variant.set(variant);
  }

  /** Sets the active size. */
  public setSize(size: DockSize): void {
    this.size.set(size);
  }

  /** Sets the active position. */
  public setPosition(position: DockPosition): void {
    this.position.set(position);
  }

  public readonly keyboardRows: KeyboardNavRow[] = [
    { key: '← / →', suffix: 'horizontal dock', action: 'Move focus between dock items.' },
    { key: '↑ / ↓', suffix: 'vertical dock', action: 'Move focus between dock items.' },
    {
      key: 'Enter / Space',
      action: 'Activate the focused dock item (runs command or follows link).',
    },
    {
      key: 'Tab / Shift+Tab',
      action: 'Move focus into or out of the dock in the standard tab order.',
    },
  ];

  public readonly apiInputRows: readonly ApiPropRow[] = [
    {
      name: 'items',
      type: 'DockItem[]',
      default: '[]',
      description: 'Array of items to display in the dock.',
    },
    {
      name: 'position',
      type: "'bottom' | 'top' | 'left' | 'right'",
      default: "'bottom'",
      description: 'Edge of the container where the dock is anchored.',
    },
    {
      name: 'variant',
      type: "'material' | 'bootstrap' | 'minimal' | null",
      default: 'null',
      description: 'Design-system variant. Falls back to ThemeConfigService when null.',
    },
    {
      name: 'size',
      type: "'sm' | 'md' | 'lg'",
      default: "'md'",
      description: 'Controls item and icon dimensions via design tokens.',
    },
    {
      name: 'magnification',
      type: 'boolean',
      default: 'true',
      description: 'Whether the hover magnification effect is enabled.',
    },
    {
      name: 'magnificationLevel',
      type: 'number',
      default: '1.5',
      description:
        'Maximum scale factor applied to the directly hovered item. Values 1.2–2.5 work well.',
    },
    {
      name: 'styleClass',
      type: 'string | null',
      default: 'null',
      description: 'Extra CSS class appended to the host element.',
    },
  ];

  public readonly apiOutputRows: readonly ApiPropRow[] = [
    {
      name: 'itemClick',
      type: 'DockItemCommandEvent',
      description: 'Emitted when any enabled item is clicked or activated via keyboard.',
    },
  ];

  public readonly apiDockItemRows: readonly ApiPropRow[] = [
    {
      name: 'label',
      type: 'string',
      description: 'Accessible label and tooltip text shown on hover.',
    },
    {
      name: 'icon',
      type: 'string',
      description: "Icon class(es) applied to the icon element (e.g. 'pi pi-home').",
    },
    {
      name: 'disabled',
      type: 'boolean',
      description: 'When true, the item is non-interactive and styled as disabled.',
    },
    {
      name: 'visible',
      type: 'boolean',
      description: 'When explicitly false, the item is excluded from the rendered list.',
    },
    {
      name: 'command',
      type: '(event: DockItemCommandEvent) => void',
      description: 'Callback invoked when the item is activated. Renders as a button.',
    },
    { name: 'url', type: 'string', description: 'External URL. Renders as an <a href> element.' },
    {
      name: 'routerLink',
      type: 'string | string[]',
      description: 'Angular Router link. Renders as a [routerLink] anchor.',
    },
    { name: 'target', type: 'string', description: "Anchor target attribute (e.g. '_blank')." },
    {
      name: 'styleClass',
      type: 'string',
      description: 'Extra CSS class added to the item list element.',
    },
  ];
}
