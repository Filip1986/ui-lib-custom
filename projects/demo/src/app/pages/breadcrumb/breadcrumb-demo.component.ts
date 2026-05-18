import { ChangeDetectionStrategy, Component, signal, viewChild } from '@angular/core';
import type { Signal, WritableSignal } from '@angular/core';
import { CodeSnippet } from 'ui-lib-custom/code-snippet';
import { Breadcrumb } from 'ui-lib-custom/breadcrumb';
import type { BreadcrumbItem, BreadcrumbItemClickEvent } from 'ui-lib-custom/breadcrumb';
import { DocPageHeaderComponent } from '../../shared/doc-page/doc-page-header.component';
import { DocPageLayoutComponent } from '../../shared/doc-page/doc-page-layout.component';
import { DocTocComponent } from '../../shared/doc-page/doc-toc.component';
import type { DocSection } from '../../shared/doc-page/doc-section.model';

/**
 * Demo page for the Breadcrumb component.
 */
@Component({
  selector: 'app-breadcrumb-demo',
  standalone: true,
  imports: [
    CodeSnippet,
    Breadcrumb,
    DocPageHeaderComponent,
    DocPageLayoutComponent,
    DocTocComponent,
  ],
  templateUrl: './breadcrumb-demo.component.html',
  styleUrl: './breadcrumb-demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BreadcrumbDemoComponent {
  public readonly importCode: string = "import { Breadcrumb } from 'ui-lib-custom/breadcrumb'";
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

  public onItemClick(event: BreadcrumbItemClickEvent): void {
    this.logEvent(`itemClick: ${event.item.label ?? 'unknown'}`);
  }

  private logEvent(message: string): void {
    this.eventLog.update((log: string[]): string[] => [message, ...log].slice(0, 5));
  }
}
