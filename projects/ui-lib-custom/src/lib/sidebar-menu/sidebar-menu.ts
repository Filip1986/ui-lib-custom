import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import type { InputSignal, WritableSignal, Signal } from '@angular/core';

export interface SidebarMenuItem {
  id: string;
  label: string;
  icon?: string;
  active?: boolean;
  children?: SidebarMenuItem[];
  disabled?: boolean;
  badge?: string;
  url?: string;
}

export type SidebarVariant = 'classic' | 'compact' | 'modern';

/**
 * Sidebar navigation menu with collapsible groups and variants.
 */
@Component({
  selector: 'ui-lib-sidebar-menu',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar-menu.html',
  styleUrl: './sidebar-menu.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class SidebarMenu {
  public readonly variant: InputSignal<SidebarVariant> = input<SidebarVariant>('classic');
  public readonly items: InputSignal<SidebarMenuItem[]> = input<SidebarMenuItem[]>([]);
  public readonly collapsed: InputSignal<boolean> = input<boolean>(false);
  public readonly collapsible: InputSignal<boolean> = input<boolean>(false);

  private readonly internalCollapsed: WritableSignal<boolean> = signal<boolean>(false);

  private readonly expandedIds: WritableSignal<Set<string>> = signal<Set<string>>(new Set());

  public readonly hostClasses: Signal<string> = computed<string>((): string => {
    const classes: string[] = ['ui-sidebar', `ui-sidebar-${this.variant()}`];
    if (this.isCollapsed()) classes.push('ui-sidebar-collapsed');
    return classes.join(' ');
  });

  public readonly isCollapsed: Signal<boolean> = computed<boolean>(
    (): boolean => this.collapsed() || this.internalCollapsed()
  );

  public toggleCollapse(): void {
    if (!this.collapsible()) return;
    this.internalCollapsed.update((v: boolean): boolean => !v);
  }

  public isExpanded(id: string): boolean {
    return this.expandedIds().has(id);
  }

  public toggleItem(id: string, hasChildren: boolean): void {
    if (!hasChildren || this.isCollapsed()) return;
    const next: Set<string> = new Set(this.expandedIds());
    if (next.has(id)) {
      next.delete(id);
    } else {
      next.add(id);
    }
    this.expandedIds.set(next);
  }
}
