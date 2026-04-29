import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import type { WritableSignal } from '@angular/core';
import { Breadcrumb } from 'ui-lib-custom/breadcrumb';
import type { BreadcrumbItem, BreadcrumbItemClickEvent } from 'ui-lib-custom/breadcrumb';

/**
 * Demo page for the Breadcrumb component.
 */
@Component({
  selector: 'app-breadcrumb-demo',
  standalone: true,
  imports: [Breadcrumb],
  templateUrl: './breadcrumb-demo.component.html',
  styleUrl: './breadcrumb-demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BreadcrumbDemoComponent {
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

  public onItemClick(event: BreadcrumbItemClickEvent): void {
    this.logEvent(`itemClick: ${event.item.label ?? 'unknown'}`);
  }

  private logEvent(message: string): void {
    this.eventLog.update((log: string[]): string[] => [message, ...log].slice(0, 5));
  }
}
