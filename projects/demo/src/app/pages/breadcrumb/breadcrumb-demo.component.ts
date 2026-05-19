import { ChangeDetectionStrategy, Component, signal, viewChild } from '@angular/core';
import type { Signal, WritableSignal } from '@angular/core';
import { Breadcrumb } from 'ui-lib-custom/breadcrumb';
import type { BreadcrumbItem, BreadcrumbItemClickEvent } from 'ui-lib-custom/breadcrumb';
import { DocPageHeaderComponent } from '../../shared/doc-page/doc-page-header.component';
import { DocPageLayoutComponent } from '../../shared/doc-page/doc-page-layout.component';
import { DocTocComponent } from '../../shared/doc-page/doc-toc.component';
import type { DocSection } from '../../shared/doc-page/doc-section.model';
import { DocQualityBadgeComponent } from '@demo/shared/doc-page/doc-quality-badge.component';
import type { ComponentQualityAudit } from '@demo/shared/doc-page/doc-quality-badge.component';
import { DocApiReferenceComponent } from '@demo/shared/doc-page/doc-api-reference.component';
import type { ApiPropRow } from '@demo/shared/doc-page/doc-api-reference.component';

/**
 * Demo page for the Breadcrumb component.
 */
@Component({
  selector: 'app-breadcrumb-demo',
  standalone: true,
  imports: [
    Breadcrumb,
    DocPageHeaderComponent,
    DocPageLayoutComponent,
    DocTocComponent,
    DocQualityBadgeComponent,
    DocApiReferenceComponent,
  ],
  templateUrl: './breadcrumb-demo.component.html',
  styleUrl: './breadcrumb-demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BreadcrumbDemoComponent {
  public readonly importCode: string = "import { Breadcrumb } from 'ui-lib-custom/breadcrumb'";

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
  public readonly layout: Signal<DocPageLayoutComponent | undefined> =
    viewChild(DocPageLayoutComponent);

  public readonly sections: DocSection[] = [
    { id: 'overview', label: 'Overview' },
    { id: 'basic', label: 'Basic' },
    { id: 'with-home', label: 'With Home' },
    { id: 'router-link', label: 'RouterLink' },
    { id: 'custom-separator', label: 'Custom Separator' },
    { id: 'variants', label: 'Variants' },
    { id: 'sizes', label: 'Sizes' },
    { id: 'command-callback', label: 'Command Callback' },
    { id: 'disabled-item', label: 'Disabled Item' },
    { id: 'long-breadcrumb', label: 'Long Breadcrumb' },
    { id: 'api', label: 'API' },
  ];

  // ── Basic ──────────────────────────────────────────────────────────────────

  public readonly basicItems: BreadcrumbItem[] = [
    { label: 'Electronics', url: '#' },
    { label: 'Computers', url: '#' },
    { label: 'Laptops' },
  ];

  // ── With Home ─────────────────────────────────────────────────────────────

  public readonly homeItem: BreadcrumbItem = { label: 'Home', icon: 'pi pi-home', url: '#' };

  public readonly homeItems: BreadcrumbItem[] = [
    { label: 'Electronics', url: '#' },
    { label: 'Accessories', url: '#' },
    { label: 'Keyboard' },
  ];

  // ── RouterLink ────────────────────────────────────────────────────────────

  public readonly routerItems: BreadcrumbItem[] = [
    { label: 'Library', routerLink: '/home' },
    { label: 'Components', routerLink: '/buttons' },
    { label: 'Breadcrumb' },
  ];

  // ── Custom Separator ──────────────────────────────────────────────────────

  public readonly separatorItems: BreadcrumbItem[] = [
    { label: 'Settings', url: '#' },
    { label: 'Profile', url: '#' },
    { label: 'Edit' },
  ];

  // ── Variants ──────────────────────────────────────────────────────────────

  public readonly variantItems: BreadcrumbItem[] = [
    { label: 'Section', url: '#' },
    { label: 'Subsection', url: '#' },
    { label: 'Current Page' },
  ];

  // ── Sizes ─────────────────────────────────────────────────────────────────

  public readonly sizeItems: BreadcrumbItem[] = [
    { label: 'Home', url: '#' },
    { label: 'Category', url: '#' },
    { label: 'Item' },
  ];

  // ── Command ───────────────────────────────────────────────────────────────

  public readonly eventLog: WritableSignal<string[]> = signal<string[]>([]);

  public readonly commandItems: BreadcrumbItem[] = [
    {
      label: 'Home',
      command: (event: BreadcrumbItemClickEvent): void => {
        this.logEvent(`Navigated to: ${event.item.label ?? 'unknown'}`);
      },
    },
    {
      label: 'Products',
      command: (event: BreadcrumbItemClickEvent): void => {
        this.logEvent(`Navigated to: ${event.item.label ?? 'unknown'}`);
      },
    },
    { label: 'Detail' },
  ];

  // ── Disabled ──────────────────────────────────────────────────────────────

  public readonly disabledItems: BreadcrumbItem[] = [
    { label: 'Home', url: '#' },
    { label: 'Restricted Section', url: '#', disabled: true },
    { label: 'Current' },
  ];

  // ── Long path ────────────────────────────────────────────────────────────

  public readonly longItems: BreadcrumbItem[] = [
    { label: 'Home', url: '#' },
    { label: 'Level 1', url: '#' },
    { label: 'Level 2', url: '#' },
    { label: 'Level 3', url: '#' },
    { label: 'Level 4', url: '#' },
    { label: 'Current Deep Page' },
  ];

  // ── Event handler ─────────────────────────────────────────────────────────

  public scrollTo(id: string): void {
    this.layout()?.scrollToSection(id);
  }

  public readonly apiRows: ApiPropRow[] = [
    { name: 'model', type: 'MenuItem[]', default: '[]', description: 'Array of breadcrumb items.' },
    {
      name: 'home',
      type: 'MenuItem | null',
      default: 'null',
      description: 'Home item placed at the start of the breadcrumb.',
    },
    {
      name: 'variant',
      type: "'material' | 'bootstrap' | 'minimal' | null",
      default: 'null',
      description: 'Design variant.',
    },
    { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Breadcrumb size.' },
    {
      name: 'styleClass',
      type: 'string | null',
      default: 'null',
      description: 'Additional CSS class.',
    },
    {
      name: 'ariaLabel',
      type: 'string',
      default: "'Breadcrumb'",
      description: 'Accessible label for the nav landmark.',
    },
  ];

  public readonly apiInputRows: readonly ApiPropRow[] = [
    {
      name: 'items',
      type: 'BreadcrumbItem[]',
      default: '[]',
      description: 'The navigation items to display.',
    },
    {
      name: 'home',
      type: 'BreadcrumbItem | null',
      default: 'null',
      description: 'Optional home item prepended before items.',
    },
    {
      name: 'variant',
      type: "'material' | 'bootstrap' | 'minimal' | null",
      default: 'null',
      description: 'Design-system variant; falls back to ThemeConfigService when null.',
    },
    {
      name: 'size',
      type: "'sm' | 'md' | 'lg'",
      default: "'md'",
      description: 'Size token controlling font size and spacing.',
    },
    {
      name: 'styleClass',
      type: 'string | null',
      default: 'null',
      description: 'Extra CSS class appended to host.',
    },
    {
      name: 'ariaLabel',
      type: 'string',
      default: "'Breadcrumb'",
      description: 'Accessible label for the <nav> landmark.',
    },
  ];

  public readonly apiOutputRows: readonly ApiPropRow[] = [
    {
      name: 'itemClick',
      type: 'BreadcrumbItemClickEvent',
      description: 'Emitted when any breadcrumb item is clicked or activated via keyboard.',
    },
  ];

  public readonly apiBreadcrumbItemRows: readonly ApiPropRow[] = [
    { name: 'label', type: 'string?', description: 'Display text for the item.' },
    { name: 'url', type: 'string?', description: 'External href URL.' },
    {
      name: 'routerLink',
      type: 'string | string[]',
      description: 'Angular RouterLink for in-app navigation.',
    },
    { name: 'icon', type: 'string?', description: 'Icon class name rendered before the label.' },
    { name: 'target', type: 'string?', description: 'Anchor target (e.g. _blank).' },
    { name: 'disabled', type: 'boolean?', description: 'When true, the item is non-interactive.' },
    { name: 'styleClass', type: 'string?', description: 'Extra CSS class on the item.' },
    {
      name: 'command',
      type: '(event: BreadcrumbItemClickEvent) => void',
      description: 'Callback invoked when the item is activated.',
    },
  ];

  public onItemClick(event: BreadcrumbItemClickEvent): void {
    this.logEvent(`itemClick: ${event.item.label ?? 'unknown'}`);
  }

  private logEvent(message: string): void {
    this.eventLog.update((log: string[]): string[] => [message, ...log].slice(0, 5));
  }
}
