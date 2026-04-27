import {
  ChangeDetectionStrategy,
  Component,
  provideZonelessChangeDetection,
  signal,
} from '@angular/core';
import type { WritableSignal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import type { ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { SidebarMenu } from './sidebar-menu';
import type { SidebarMenuItem, SidebarVariant } from './sidebar-menu.types';

// ---------------------------------------------------------------------------
// Test data
// ---------------------------------------------------------------------------

const FLAT_ITEMS: SidebarMenuItem[] = [
  { id: 'home', label: 'Home', icon: 'home' },
  { id: 'settings', label: 'Settings', icon: 'settings' },
];

const NESTED_ITEMS: SidebarMenuItem[] = [
  {
    id: 'parent',
    label: 'Parent',
    children: [
      { id: 'child-1', label: 'Child 1' },
      { id: 'child-2', label: 'Child 2' },
    ],
  },
  { id: 'solo', label: 'Solo' },
];

// ---------------------------------------------------------------------------
// Host component
// ---------------------------------------------------------------------------

@Component({
  standalone: true,
  imports: [SidebarMenu],
  template: `
    <ui-lib-sidebar-menu
      [items]="items()"
      [variant]="variant()"
      [collapsed]="collapsed()"
      [collapsible]="collapsible()"
    />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class SidebarMenuHostComponent {
  public readonly items: WritableSignal<SidebarMenuItem[]> = signal<SidebarMenuItem[]>([
    ...FLAT_ITEMS,
  ]);
  public readonly variant: WritableSignal<SidebarVariant> = signal<SidebarVariant>('classic');
  public readonly collapsed: WritableSignal<boolean> = signal<boolean>(false);
  public readonly collapsible: WritableSignal<boolean> = signal<boolean>(false);
}

// ---------------------------------------------------------------------------
// Setup helper
// ---------------------------------------------------------------------------

function setup(
  overrides: Partial<{
    items: SidebarMenuItem[];
    variant: SidebarVariant;
    collapsed: boolean;
    collapsible: boolean;
  }> = {}
): {
  fixture: ComponentFixture<SidebarMenuHostComponent>;
  host: SidebarMenuHostComponent;
  component: SidebarMenu;
} {
  TestBed.configureTestingModule({
    imports: [SidebarMenuHostComponent],
    providers: [provideZonelessChangeDetection()],
  });

  const fixture: ComponentFixture<SidebarMenuHostComponent> =
    TestBed.createComponent(SidebarMenuHostComponent);
  const host: SidebarMenuHostComponent = fixture.componentInstance;

  if (overrides.items !== undefined) host.items.set(overrides.items);
  if (overrides.variant !== undefined) host.variant.set(overrides.variant);
  if (overrides.collapsed !== undefined) host.collapsed.set(overrides.collapsed);
  if (overrides.collapsible !== undefined) host.collapsible.set(overrides.collapsible);

  fixture.detectChanges();

  const component: SidebarMenu = fixture.debugElement.query(By.directive(SidebarMenu))
    .componentInstance as SidebarMenu;

  return { fixture, host, component };
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe('SidebarMenu', (): void => {
  describe('creation', (): void => {
    it('creates successfully', (): void => {
      const { component } = setup();
      expect(component).toBeTruthy();
    });
  });

  describe('host classes', (): void => {
    it('contains base ui-sidebar class', (): void => {
      const { component } = setup();
      expect(component.hostClasses()).toContain('ui-sidebar');
    });

    (['classic', 'compact', 'modern'] as SidebarVariant[]).forEach(
      (variant: SidebarVariant): void => {
        it(`applies ui-sidebar-${variant} class for variant "${variant}"`, (): void => {
          const { component } = setup({ variant });
          expect(component.hostClasses()).toContain(`ui-sidebar-${variant}`);
        });
      }
    );

    it('adds ui-sidebar-collapsed class when collapsed is true', (): void => {
      const { component } = setup({ collapsed: true });
      expect(component.hostClasses()).toContain('ui-sidebar-collapsed');
    });

    it('does not add ui-sidebar-collapsed class when collapsed is false', (): void => {
      const { component } = setup({ collapsed: false });
      expect(component.hostClasses()).not.toContain('ui-sidebar-collapsed');
    });
  });

  describe('isCollapsed', (): void => {
    it('returns false when neither input collapsed nor internal collapsed', (): void => {
      const { component } = setup({ collapsed: false, collapsible: true });
      expect(component.isCollapsed()).toBe(false);
    });

    it('returns true when collapsed input is true', (): void => {
      const { component } = setup({ collapsed: true });
      expect(component.isCollapsed()).toBe(true);
    });
  });

  describe('toggleCollapse', (): void => {
    it('does nothing when collapsible is false', (): void => {
      const { component } = setup({ collapsible: false });
      component.toggleCollapse();
      expect(component.isCollapsed()).toBe(false);
    });

    it('toggles internal collapsed state when collapsible is true', (): void => {
      const { component } = setup({ collapsible: true });
      expect(component.isCollapsed()).toBe(false);
      component.toggleCollapse();
      expect(component.isCollapsed()).toBe(true);
    });

    it('toggles back to false on second call', (): void => {
      const { component } = setup({ collapsible: true });
      component.toggleCollapse();
      component.toggleCollapse();
      expect(component.isCollapsed()).toBe(false);
    });
  });

  describe('isExpanded / toggleItem', (): void => {
    it('item is not expanded initially', (): void => {
      const { component } = setup({ items: NESTED_ITEMS });
      expect(component.isExpanded('parent')).toBe(false);
    });

    it('expands item with children on toggleItem', (): void => {
      const { component } = setup({ items: NESTED_ITEMS });
      component.toggleItem('parent', true);
      expect(component.isExpanded('parent')).toBe(true);
    });

    it('collapses already-expanded item on second toggleItem call', (): void => {
      const { component } = setup({ items: NESTED_ITEMS });
      component.toggleItem('parent', true);
      component.toggleItem('parent', true);
      expect(component.isExpanded('parent')).toBe(false);
    });

    it('does not expand item without children', (): void => {
      const { component } = setup({ items: NESTED_ITEMS });
      component.toggleItem('solo', false);
      expect(component.isExpanded('solo')).toBe(false);
    });

    it('does not expand when sidebar is collapsed', (): void => {
      const { component } = setup({ items: NESTED_ITEMS, collapsed: true });
      component.toggleItem('parent', true);
      expect(component.isExpanded('parent')).toBe(false);
    });
  });

  describe('dynamic updates', (): void => {
    it('reflects updated variant in hostClasses', (): void => {
      const { fixture, host, component } = setup({ variant: 'classic' });
      host.variant.set('modern');
      fixture.detectChanges();
      expect(component.hostClasses()).toContain('ui-sidebar-modern');
    });

    it('reflects inputCollapsed change', (): void => {
      const { fixture, host, component } = setup({ collapsed: false });
      host.collapsed.set(true);
      fixture.detectChanges();
      expect(component.isCollapsed()).toBe(true);
    });
  });
});
