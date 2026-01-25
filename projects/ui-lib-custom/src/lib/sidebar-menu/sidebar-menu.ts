import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, input, signal } from '@angular/core';

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

@Component({
  selector: 'ui-lib-sidebar-menu',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar-menu.html',
  styleUrl: './sidebar-menu.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarMenu {
  variant = input<SidebarVariant>('classic');
  items = input<SidebarMenuItem[]>([]);
  collapsed = input<boolean>(false);
  collapsible = input<boolean>(true);

  private readonly internalCollapsed = signal(false);

  private readonly expandedIds = signal<Set<string>>(new Set());

  readonly hostClasses = computed(() => {
    const classes = ['ui-sidebar', `ui-sidebar-${this.variant()}`];
    if (this.isCollapsed()) classes.push('ui-sidebar-collapsed');
    return classes.join(' ');
  });

  readonly isCollapsed = computed(() => this.collapsed() || this.internalCollapsed());

  toggleCollapse(): void {
    if (!this.collapsible()) return;
    this.internalCollapsed.update(v => !v);
  }

  isExpanded(id: string): boolean {
    return this.expandedIds().has(id);
  }

  toggleItem(id: string, hasChildren: boolean): void {
    if (!hasChildren || this.isCollapsed()) return;
    const next = new Set(this.expandedIds());
    if (next.has(id)) {
      next.delete(id);
    } else {
      next.add(id);
    }
    this.expandedIds.set(next);
  }
}
