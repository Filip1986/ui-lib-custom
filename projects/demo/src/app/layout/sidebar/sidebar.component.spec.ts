import { provideZonelessChangeDetection } from '@angular/core';
import type { ComponentFixture } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { beforeEach, describe, expect, it } from '@jest/globals';
import type { NavItem } from './sidebar.component';
import { SidebarComponent } from './sidebar.component';

function compareLabels(left: string, right: string): number {
  return left.localeCompare(right, undefined, { sensitivity: 'base' });
}

describe('SidebarComponent ordering', (): void => {
  let fixture: ComponentFixture<SidebarComponent>;
  let component: SidebarComponent;

  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({
      imports: [SidebarComponent],
      providers: [provideZonelessChangeDetection(), provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(SidebarComponent);
    component = fixture.componentInstance;
  });

  function getComponentsItems(): NavItem[] {
    const componentsMenu: NavItem | undefined = component
      .menuItems()
      .find((item: NavItem): boolean => item.label === 'Components');

    expect(componentsMenu).toBeTruthy();
    expect(componentsMenu?.items).toBeTruthy();

    return componentsMenu?.items ?? [];
  }

  function getTopLevelMenu(label: string): NavItem | undefined {
    return component.menuItems().find((item: NavItem): boolean => item.label === label);
  }

  it('keeps group labels alphabetically ordered', (): void => {
    const items: NavItem[] = getComponentsItems();
    const actualGroupLabels: string[] = items
      .filter((item: NavItem): boolean => item.isGroupLabel === true)
      .map((item: NavItem): string => item.label);

    const expectedGroupLabels: string[] = [...actualGroupLabels].sort(
      (left: string, right: string): number => compareLabels(left, right)
    );

    expect(actualGroupLabels).toEqual(expectedGroupLabels);
  });

  it('keeps items alphabetically ordered inside each group', (): void => {
    const items: NavItem[] = getComponentsItems();
    const itemsByGroup: Map<string, string[]> = new Map<string, string[]>();

    let activeGroup: string | null = null;

    items.forEach((item: NavItem): void => {
      if (item.isGroupLabel) {
        activeGroup = item.label;
        itemsByGroup.set(activeGroup, []);
        return;
      }

      if (activeGroup && item.group === activeGroup) {
        const labels: string[] = itemsByGroup.get(activeGroup) ?? [];
        labels.push(item.label);
        itemsByGroup.set(activeGroup, labels);
        return;
      }

      activeGroup = null;
    });

    itemsByGroup.forEach((labels: string[], group: string): void => {
      const expected: string[] = [...labels].sort((left: string, right: string): number =>
        compareLabels(left, right)
      );
      expect(labels).toEqual(expected);
      expect(labels.length).toBeGreaterThan(0);
      expect(group.length).toBeGreaterThan(0);
    });
  });

  it('keeps trailing ungrouped items alphabetically ordered when present', (): void => {
    const items: NavItem[] = getComponentsItems();
    const firstUngroupedIndex: number = items.findIndex(
      (item: NavItem): boolean => item.isGroupLabel !== true && !item.group
    );

    if (firstUngroupedIndex < 0) {
      expect(
        items.every((item: NavItem): boolean => item.isGroupLabel === true || Boolean(item.group))
      ).toBe(true);
      return;
    }

    const trailingUngroupedItems: NavItem[] = items.slice(firstUngroupedIndex);
    const trailingUngroupedLabels: string[] = trailingUngroupedItems.map(
      (item: NavItem): string => item.label
    );
    const expectedTrailingLabels: string[] = [...trailingUngroupedLabels].sort(
      (left: string, right: string): number => compareLabels(left, right)
    );

    expect(
      trailingUngroupedItems.every(
        (item: NavItem): boolean => item.isGroupLabel !== true && !item.group
      )
    ).toBe(true);
    expect(trailingUngroupedLabels).toEqual(expectedTrailingLabels);
  });

  it('contains the expected Menu group placeholders', (): void => {
    const items: NavItem[] = getComponentsItems();
    const menuGroupStart: number = items.findIndex(
      (item: NavItem): boolean => item.isGroupLabel === true && item.label === 'Menu'
    );

    expect(menuGroupStart).toBeGreaterThan(-1);

    const menuLabels: string[] = [];

    for (let index: number = menuGroupStart + 1; index < items.length; index += 1) {
      const item: NavItem | undefined = items[index];
      if (!item) {
        break;
      }

      if (item.isGroupLabel) {
        break;
      }

      if (item.group === 'Menu') {
        menuLabels.push(item.label);
      }
    }

    expect(menuLabels).toEqual([
      'Breadcrumb',
      'ContextMenu',
      'Dock',
      'MegaMenu',
      'Menu',
      'Menubar',
      'PanelMenu',
      'Sidebar Menu',
      'TieredMenu',
    ]);
  });

  it('keeps Login Forms out of Components grouping', (): void => {
    const items: NavItem[] = getComponentsItems();
    const labels: string[] = items.map((item: NavItem): string => item.label);

    expect(labels).not.toContain('Blocks');
    expect(labels).not.toContain('Login Forms');
  });

  it('adds UI Blocks as a collapsed top-level section with Authentication group', (): void => {
    const uiBlocksMenu: NavItem | undefined = getTopLevelMenu('UI Blocks');

    expect(uiBlocksMenu).toBeTruthy();
    expect(uiBlocksMenu?.expanded).toBe(false);
    expect(uiBlocksMenu?.items).toEqual([
      {
        label: 'Authentication',
        isGroupLabel: true,
      },
      {
        label: 'Login Forms',
        icon: 'pi pi-sign-in',
        route: '/login',
        group: 'Authentication',
      },
    ]);
  });

  it('adds Templates as a collapsed top-level section', (): void => {
    const templatesMenu: NavItem | undefined = getTopLevelMenu('Templates');

    expect(templatesMenu).toBeTruthy();
    expect(templatesMenu?.expanded).toBe(false);
    expect(templatesMenu?.items).toEqual([
      {
        label: 'Starter Template',
        icon: 'pi pi-circle',
        route: '/templates/starter-template',
        badge: 'TODO',
      },
    ]);
  });
});
