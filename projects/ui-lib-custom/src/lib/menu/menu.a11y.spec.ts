import {
  ChangeDetectionStrategy,
  Component,
  provideZonelessChangeDetection,
  signal,
  type WritableSignal,
} from '@angular/core';
import { TestBed, type ComponentFixture } from '@angular/core/testing';
import type { DebugElement } from '@angular/core';
import { checkA11y, SKIP_COLOR_CONTRAST_RULES } from '../../test/a11y-utils';
import { Menu } from './menu';
import type { MenuItem } from './menu.types';

/**
 * axe-core has a known false positive with `aria-required-children` when a
 * `role="menu"` contains a presentational `<ul>` wrapper. Our structure matches
 * the WAI-ARIA Authoring Practices pattern, so we disable that rule here only.
 * We also disable color-contrast because jsdom cannot compute CSS variable
 * colours accurately enough for meaningful contrast assertions.
 */
const MENU_AXE_RULES: Record<string, { enabled: boolean }> = {
  ...SKIP_COLOR_CONTRAST_RULES,
  'aria-required-children': { enabled: false },
};

const STATIC_ITEMS: MenuItem[] = [
  { label: 'Profile', icon: 'pi pi-user' },
  { label: 'Settings', icon: 'pi pi-cog' },
  { separator: true },
  { label: 'Logout', icon: 'pi pi-sign-out' },
];

const GROUPED_ITEMS: MenuItem[] = [
  {
    label: 'Account',
    items: [
      { label: 'Profile' },
      { label: 'Security' },
      { separator: true },
      { label: 'Sign out' },
    ],
  },
  {
    label: 'System',
    items: [{ label: 'Settings' }, { label: 'Logs', disabled: true }],
  },
];

function queryEl<T extends HTMLElement>(
  fixture: ComponentFixture<unknown>,
  selector: string
): T | null {
  return (fixture.nativeElement as HTMLElement).querySelector<T>(selector);
}

function queryAllEl<T extends HTMLElement>(
  fixture: ComponentFixture<unknown>,
  selector: string
): T[] {
  return Array.from((fixture.nativeElement as HTMLElement).querySelectorAll<T>(selector));
}

function getMenuInstance(fixture: ComponentFixture<unknown>): Menu {
  return fixture.debugElement.query(
    (debugElement: DebugElement): boolean => debugElement.componentInstance instanceof Menu
  ).componentInstance as Menu;
}

function dispatchKey(target: HTMLElement, key: string): KeyboardEvent {
  const event: KeyboardEvent = new KeyboardEvent('keydown', {
    key,
    bubbles: true,
    cancelable: true,
  });
  target.dispatchEvent(event);
  return event;
}

function makeMouseEvent(trigger?: HTMLElement): MouseEvent {
  const event: MouseEvent = new MouseEvent('click', {
    bubbles: true,
    cancelable: true,
    clientX: 120,
    clientY: 160,
  });
  if (trigger) {
    Object.defineProperty(event, 'currentTarget', { value: trigger });
  }
  return event;
}

@Component({
  standalone: true,
  imports: [Menu],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <button type="button" class="menu-trigger">Toggle Menu</button>
    <ui-lib-menu [model]="model()" [popup]="popup()" [ariaLabel]="ariaLabel()" />
  `,
})
class MenuA11yHostComponent {
  public readonly model: WritableSignal<MenuItem[]> = signal<MenuItem[]>(STATIC_ITEMS);
  public readonly popup: WritableSignal<boolean> = signal<boolean>(false);
  public readonly ariaLabel: WritableSignal<string> = signal<string>('Actions');
}

async function createFixture(): Promise<{
  fixture: ComponentFixture<MenuA11yHostComponent>;
}> {
  await TestBed.configureTestingModule({
    imports: [MenuA11yHostComponent],
    providers: [provideZonelessChangeDetection()],
  }).compileComponents();

  const fixture: ComponentFixture<MenuA11yHostComponent> =
    TestBed.createComponent(MenuA11yHostComponent);
  document.body.appendChild(fixture.nativeElement);
  fixture.detectChanges();
  await fixture.whenStable();
  return { fixture };
}

async function openPopup(fixture: ComponentFixture<MenuA11yHostComponent>): Promise<void> {
  const trigger: HTMLElement | null = queryEl<HTMLElement>(fixture, '.menu-trigger');
  if (!trigger) {
    throw new Error('Expected popup trigger to exist');
  }
  getMenuInstance(fixture).show(makeMouseEvent(trigger));
  fixture.detectChanges();
  await fixture.whenStable();
  fixture.detectChanges();
  await fixture.whenStable();
}

describe('Menu Accessibility', (): void => {
  let fixture: ComponentFixture<MenuA11yHostComponent> | undefined;

  afterEach((): void => {
    fixture?.destroy();
  });

  describe('static menu ARIA structure', (): void => {
    it('panel has role="menu"', async (): Promise<void> => {
      ({ fixture } = await createFixture());
      const panel: HTMLElement | null = queryEl(fixture, '.ui-lib-menu__panel');
      expect(panel?.getAttribute('role')).toBe('menu');
    });

    it('panel uses the ariaLabel input', async (): Promise<void> => {
      ({ fixture } = await createFixture());
      const panel: HTMLElement | null = queryEl(fixture, '.ui-lib-menu__panel');
      expect(panel?.getAttribute('aria-label')).toBe('Actions');
    });

    it('panel has a unique generated id', async (): Promise<void> => {
      ({ fixture } = await createFixture());
      const panel: HTMLElement | null = queryEl(fixture, '.ui-lib-menu__panel');
      expect(panel?.getAttribute('id')).toMatch(/^uilib-menu-/);
    });

    it('root list uses role="presentation"', async (): Promise<void> => {
      ({ fixture } = await createFixture());
      const list: HTMLElement | null = queryEl(fixture, '.ui-lib-menu__list');
      expect(list?.getAttribute('role')).toBe('presentation');
    });

    it('item wrappers use role="none"', async (): Promise<void> => {
      ({ fixture } = await createFixture());
      const items: HTMLElement[] = queryAllEl(fixture, '.ui-lib-menu__item');
      expect(items.length).toBeGreaterThan(0);
      for (const item of items) {
        expect(item.getAttribute('role')).toBe('none');
      }
    });

    it('links use role="menuitem"', async (): Promise<void> => {
      ({ fixture } = await createFixture());
      const links: HTMLElement[] = queryAllEl(fixture, '.ui-lib-menu__link');
      expect(links.length).toBeGreaterThan(0);
      for (const link of links) {
        expect(link.getAttribute('role')).toBe('menuitem');
      }
    });
  });

  describe('grouped menu ARIA structure', (): void => {
    it('group lists use role="group"', async (): Promise<void> => {
      ({ fixture } = await createFixture());
      fixture.componentInstance.model.set(GROUPED_ITEMS);
      fixture.detectChanges();
      const groups: HTMLElement[] = queryAllEl(fixture, '.ui-lib-menu__group-list');
      expect(groups.length).toBe(2);
      for (const group of groups) {
        expect(group.getAttribute('role')).toBe('group');
      }
    });

    it('group lists use their label as aria-label', async (): Promise<void> => {
      ({ fixture } = await createFixture());
      fixture.componentInstance.model.set(GROUPED_ITEMS);
      fixture.detectChanges();
      const groups: HTMLElement[] = queryAllEl(fixture, '.ui-lib-menu__group-list');
      expect(groups[0]?.getAttribute('aria-label')).toBe('Account');
      expect(groups[1]?.getAttribute('aria-label')).toBe('System');
    });

    it('group labels are aria-hidden', async (): Promise<void> => {
      ({ fixture } = await createFixture());
      fixture.componentInstance.model.set(GROUPED_ITEMS);
      fixture.detectChanges();
      const labels: HTMLElement[] = queryAllEl(fixture, '.ui-lib-menu__group-label');
      expect(labels.length).toBe(2);
      for (const label of labels) {
        expect(label.getAttribute('aria-hidden')).toBe('true');
      }
    });

    it('group item wrappers use role="none"', async (): Promise<void> => {
      ({ fixture } = await createFixture());
      fixture.componentInstance.model.set(GROUPED_ITEMS);
      fixture.detectChanges();
      const items: HTMLElement[] = queryAllEl(
        fixture,
        '.ui-lib-menu__group-list .ui-lib-menu__item'
      );
      expect(items.length).toBeGreaterThan(0);
      for (const item of items) {
        expect(item.getAttribute('role')).toBe('none');
      }
    });

    it('group links use role="menuitem"', async (): Promise<void> => {
      ({ fixture } = await createFixture());
      fixture.componentInstance.model.set(GROUPED_ITEMS);
      fixture.detectChanges();
      const links: HTMLElement[] = queryAllEl(
        fixture,
        '.ui-lib-menu__group-list .ui-lib-menu__link'
      );
      expect(links.length).toBeGreaterThan(0);
      for (const link of links) {
        expect(link.getAttribute('role')).toBe('menuitem');
      }
    });
  });

  describe('separator semantics', (): void => {
    it('top-level separators use role="separator"', async (): Promise<void> => {
      ({ fixture } = await createFixture());
      const separator: HTMLElement | null = queryEl(fixture, '.ui-lib-menu__separator');
      expect(separator?.getAttribute('role')).toBe('separator');
    });

    it('top-level separators do not use aria-hidden', async (): Promise<void> => {
      ({ fixture } = await createFixture());
      const separator: HTMLElement | null = queryEl(fixture, '.ui-lib-menu__separator');
      expect(separator?.hasAttribute('aria-hidden')).toBe(false);
    });

    it('group separators use role="separator"', async (): Promise<void> => {
      ({ fixture } = await createFixture());
      fixture.componentInstance.model.set(GROUPED_ITEMS);
      fixture.detectChanges();
      const separator: HTMLElement | null = queryEl(
        fixture,
        '.ui-lib-menu__group-list .ui-lib-menu__separator'
      );
      expect(separator?.getAttribute('role')).toBe('separator');
    });

    it('group separators do not use aria-hidden', async (): Promise<void> => {
      ({ fixture } = await createFixture());
      fixture.componentInstance.model.set(GROUPED_ITEMS);
      fixture.detectChanges();
      const separator: HTMLElement | null = queryEl(
        fixture,
        '.ui-lib-menu__group-list .ui-lib-menu__separator'
      );
      expect(separator?.hasAttribute('aria-hidden')).toBe(false);
    });
  });

  describe('roving tabindex', (): void => {
    it('first enabled item has tabindex="0" by default', async (): Promise<void> => {
      ({ fixture } = await createFixture());
      const links: HTMLElement[] = queryAllEl(fixture, '.ui-lib-menu__link');
      expect(links[0]?.getAttribute('tabindex')).toBe('0');
    });

    it('subsequent enabled items have tabindex="-1" by default', async (): Promise<void> => {
      ({ fixture } = await createFixture());
      const links: HTMLElement[] = queryAllEl(fixture, '.ui-lib-menu__link');
      expect(links[1]?.getAttribute('tabindex')).toBe('-1');
      expect(links[2]?.getAttribute('tabindex')).toBe('-1');
    });

    it('disabled items always have tabindex="-1"', async (): Promise<void> => {
      ({ fixture } = await createFixture());
      fixture.componentInstance.model.set([
        { label: 'Enabled' },
        { label: 'Disabled', disabled: true },
      ]);
      fixture.detectChanges();
      const links: HTMLElement[] = queryAllEl(fixture, '.ui-lib-menu__link');
      expect(links[1]?.getAttribute('tabindex')).toBe('-1');
    });

    it('roving tabindex updates when focus moves to another item', async (): Promise<void> => {
      ({ fixture } = await createFixture());
      const links: HTMLElement[] = queryAllEl(fixture, '.ui-lib-menu__link');
      links[1]?.focus();
      fixture.detectChanges();
      expect(links[0]?.getAttribute('tabindex')).toBe('-1');
      expect(links[1]?.getAttribute('tabindex')).toBe('0');
    });

    it('grouped menus apply the tab stop to the first focusable child item', async (): Promise<void> => {
      ({ fixture } = await createFixture());
      fixture.componentInstance.model.set(GROUPED_ITEMS);
      fixture.detectChanges();
      const links: HTMLElement[] = queryAllEl(fixture, '.ui-lib-menu__link');
      expect(links[0]?.getAttribute('tabindex')).toBe('0');
      expect(links[1]?.getAttribute('tabindex')).toBe('-1');
    });
  });

  describe('arrow key navigation', (): void => {
    it('ArrowDown moves focus to the next item', async (): Promise<void> => {
      ({ fixture } = await createFixture());
      const links: HTMLElement[] = queryAllEl(fixture, '.ui-lib-menu__link');
      links[0]?.focus();
      dispatchKey(links[0] as HTMLElement, 'ArrowDown');
      fixture.detectChanges();
      expect(document.activeElement).toBe(links[1]);
    });

    it('ArrowUp wraps from the first item to the last item', async (): Promise<void> => {
      ({ fixture } = await createFixture());
      const links: HTMLElement[] = queryAllEl(fixture, '.ui-lib-menu__link');
      links[0]?.focus();
      dispatchKey(links[0] as HTMLElement, 'ArrowUp');
      fixture.detectChanges();
      expect(document.activeElement).toBe(links[2]);
    });

    it('ArrowDown wraps from the last item to the first item', async (): Promise<void> => {
      ({ fixture } = await createFixture());
      const links: HTMLElement[] = queryAllEl(fixture, '.ui-lib-menu__link');
      links[2]?.focus();
      dispatchKey(links[2] as HTMLElement, 'ArrowDown');
      fixture.detectChanges();
      expect(document.activeElement).toBe(links[0]);
    });

    it('Home moves focus to the first item', async (): Promise<void> => {
      ({ fixture } = await createFixture());
      const links: HTMLElement[] = queryAllEl(fixture, '.ui-lib-menu__link');
      links[2]?.focus();
      dispatchKey(links[2] as HTMLElement, 'Home');
      fixture.detectChanges();
      expect(document.activeElement).toBe(links[0]);
    });

    it('End moves focus to the last item', async (): Promise<void> => {
      ({ fixture } = await createFixture());
      const links: HTMLElement[] = queryAllEl(fixture, '.ui-lib-menu__link');
      links[0]?.focus();
      dispatchKey(links[0] as HTMLElement, 'End');
      fixture.detectChanges();
      expect(document.activeElement).toBe(links[2]);
    });
  });

  describe('activation keys', (): void => {
    it('Enter activates a static item', async (): Promise<void> => {
      ({ fixture } = await createFixture());
      const itemClickSpy: jest.SpyInstance = jest.spyOn(getMenuInstance(fixture).itemClick, 'emit');
      const link: HTMLElement | null = queryEl(fixture, '.ui-lib-menu__link');
      dispatchKey(link as HTMLElement, 'Enter');
      fixture.detectChanges();
      expect(itemClickSpy).toHaveBeenCalledTimes(1);
    });

    it('Space activates a static item', async (): Promise<void> => {
      ({ fixture } = await createFixture());
      const itemClickSpy: jest.SpyInstance = jest.spyOn(getMenuInstance(fixture).itemClick, 'emit');
      const link: HTMLElement | null = queryEl(fixture, '.ui-lib-menu__link');
      dispatchKey(link as HTMLElement, ' ');
      fixture.detectChanges();
      expect(itemClickSpy).toHaveBeenCalledTimes(1);
    });

    it('Enter activates a popup item and closes the popup', async (): Promise<void> => {
      ({ fixture } = await createFixture());
      fixture.componentInstance.popup.set(true);
      fixture.detectChanges();
      await openPopup(fixture);
      const link: HTMLElement | null = queryEl(fixture, '.ui-lib-menu__link');
      dispatchKey(link as HTMLElement, 'Enter');
      fixture.detectChanges();
      expect(getMenuInstance(fixture).isVisible()).toBe(false);
    });

    it('Space activates a popup item and closes the popup', async (): Promise<void> => {
      ({ fixture } = await createFixture());
      fixture.componentInstance.popup.set(true);
      fixture.detectChanges();
      await openPopup(fixture);
      const link: HTMLElement | null = queryEl(fixture, '.ui-lib-menu__link');
      dispatchKey(link as HTMLElement, ' ');
      fixture.detectChanges();
      expect(getMenuInstance(fixture).isVisible()).toBe(false);
    });
  });

  describe('Tab key popup behavior', (): void => {
    it('Tab closes the popup menu', async (): Promise<void> => {
      ({ fixture } = await createFixture());
      fixture.componentInstance.popup.set(true);
      fixture.detectChanges();
      await openPopup(fixture);
      const link: HTMLElement | null = queryEl(fixture, '.ui-lib-menu__link');
      dispatchKey(link as HTMLElement, 'Tab');
      fixture.detectChanges();
      expect(getMenuInstance(fixture).isVisible()).toBe(false);
    });

    it('Tab does not prevent default so focus can continue naturally', async (): Promise<void> => {
      ({ fixture } = await createFixture());
      fixture.componentInstance.popup.set(true);
      fixture.detectChanges();
      await openPopup(fixture);
      const link: HTMLElement | null = queryEl(fixture, '.ui-lib-menu__link');
      const event: KeyboardEvent = dispatchKey(link as HTMLElement, 'Tab');
      fixture.detectChanges();
      expect(event.defaultPrevented).toBe(false);
    });

    it('Tab does nothing in static mode', async (): Promise<void> => {
      ({ fixture } = await createFixture());
      const link: HTMLElement | null = queryEl(fixture, '.ui-lib-menu__link');
      const event: KeyboardEvent = dispatchKey(link as HTMLElement, 'Tab');
      fixture.detectChanges();
      expect(getMenuInstance(fixture).isVisible()).toBe(false);
      expect(event.defaultPrevented).toBe(false);
    });
  });

  describe('popup focus management', (): void => {
    it('opening the popup focuses the first menu item', async (): Promise<void> => {
      ({ fixture } = await createFixture());
      fixture.componentInstance.popup.set(true);
      fixture.detectChanges();
      await openPopup(fixture);
      const links: HTMLElement[] = queryAllEl(fixture, '.ui-lib-menu__link');
      expect(document.activeElement).toBe(links[0]);
    });

    it('Escape on an item closes the popup and restores focus to the trigger', async (): Promise<void> => {
      ({ fixture } = await createFixture());
      fixture.componentInstance.popup.set(true);
      fixture.detectChanges();
      const trigger: HTMLElement | null = queryEl<HTMLElement>(fixture, '.menu-trigger');
      trigger?.focus();
      await openPopup(fixture);
      const link: HTMLElement | null = queryEl(fixture, '.ui-lib-menu__link');
      dispatchKey(link as HTMLElement, 'Escape');
      fixture.detectChanges();
      expect(getMenuInstance(fixture).isVisible()).toBe(false);
      expect(document.activeElement).toBe(trigger);
    });

    it('global Escape closes the popup and restores focus to the trigger', async (): Promise<void> => {
      ({ fixture } = await createFixture());
      fixture.componentInstance.popup.set(true);
      fixture.detectChanges();
      const trigger: HTMLElement | null = queryEl<HTMLElement>(fixture, '.menu-trigger');
      trigger?.focus();
      await openPopup(fixture);
      document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
      fixture.detectChanges();
      expect(getMenuInstance(fixture).isVisible()).toBe(false);
      expect(document.activeElement).toBe(trigger);
    });

    it('clicking outside closes the popup without restoring focus to the trigger', async (): Promise<void> => {
      ({ fixture } = await createFixture());
      fixture.componentInstance.popup.set(true);
      fixture.detectChanges();
      const trigger: HTMLElement | null = queryEl<HTMLElement>(fixture, '.menu-trigger');
      trigger?.focus();
      await openPopup(fixture);
      const outsideButton: HTMLButtonElement = document.createElement('button');
      outsideButton.type = 'button';
      try {
        document.body.appendChild(outsideButton);
        outsideButton.focus();
        document.dispatchEvent(new MouseEvent('click', { bubbles: true }));
        fixture.detectChanges();
        expect(getMenuInstance(fixture).isVisible()).toBe(false);
        expect(document.activeElement).toBe(outsideButton);
      } finally {
        outsideButton.remove();
      }
    });

    it('activating an item closes the popup without restoring trigger focus', async (): Promise<void> => {
      ({ fixture } = await createFixture());
      fixture.componentInstance.popup.set(true);
      fixture.detectChanges();
      const trigger: HTMLElement | null = queryEl<HTMLElement>(fixture, '.menu-trigger');
      trigger?.focus();
      await openPopup(fixture);
      const link: HTMLElement | null = queryEl(fixture, '.ui-lib-menu__link');
      link?.click();
      fixture.detectChanges();
      expect(getMenuInstance(fixture).isVisible()).toBe(false);
      expect(document.activeElement).not.toBe(trigger);
    });
  });

  describe('disabled items', (): void => {
    it('disabled items expose aria-disabled="true"', async (): Promise<void> => {
      ({ fixture } = await createFixture());
      fixture.componentInstance.model.set([
        { label: 'Enabled' },
        { label: 'Disabled', disabled: true },
      ]);
      fixture.detectChanges();
      const disabledLink: HTMLElement | null = queryEl(
        fixture,
        '.ui-lib-menu__link[aria-disabled="true"]'
      );
      expect(disabledLink).toBeTruthy();
    });

    it('disabled items are skipped by keyboard navigation', async (): Promise<void> => {
      ({ fixture } = await createFixture());
      fixture.componentInstance.model.set([
        { label: 'First' },
        { label: 'Disabled', disabled: true },
        { label: 'Third' },
      ]);
      fixture.detectChanges();
      const links: HTMLElement[] = queryAllEl(fixture, '.ui-lib-menu__link');
      links[0]?.focus();
      dispatchKey(links[0] as HTMLElement, 'ArrowDown');
      fixture.detectChanges();
      expect(document.activeElement).toBe(links[2]);
    });

    it('disabled items are omitted from the flat focusable list', async (): Promise<void> => {
      ({ fixture } = await createFixture());
      fixture.componentInstance.model.set([
        { label: 'First' },
        { label: 'Disabled', disabled: true },
        { label: 'Third' },
      ]);
      fixture.detectChanges();
      expect(getMenuInstance(fixture).flatFocusableItems().length).toBe(2);
    });

    it('disabled items do not emit activation events', async (): Promise<void> => {
      ({ fixture } = await createFixture());
      fixture.componentInstance.model.set([{ label: 'Disabled', disabled: true }]);
      fixture.detectChanges();
      const itemClickSpy: jest.SpyInstance = jest.spyOn(getMenuInstance(fixture).itemClick, 'emit');
      const link: HTMLElement | null = queryEl(fixture, '.ui-lib-menu__link');
      link?.click();
      fixture.detectChanges();
      expect(itemClickSpy).not.toHaveBeenCalled();
    });
  });

  describe('axe-core', (): void => {
    it('passes axe in static mode', async (): Promise<void> => {
      ({ fixture } = await createFixture());
      await checkA11y(fixture, { rules: MENU_AXE_RULES });
    });

    it('passes axe with grouped items', async (): Promise<void> => {
      ({ fixture } = await createFixture());
      fixture.componentInstance.model.set(GROUPED_ITEMS);
      fixture.detectChanges();
      await checkA11y(fixture, { rules: MENU_AXE_RULES });
    });

    it('passes axe in popup mode while open', async (): Promise<void> => {
      ({ fixture } = await createFixture());
      fixture.componentInstance.popup.set(true);
      fixture.detectChanges();
      await openPopup(fixture);
      await checkA11y(fixture, { rules: MENU_AXE_RULES });
    });

    it('passes axe in popup mode with grouped items', async (): Promise<void> => {
      ({ fixture } = await createFixture());
      fixture.componentInstance.model.set(GROUPED_ITEMS);
      fixture.componentInstance.popup.set(true);
      fixture.detectChanges();
      await openPopup(fixture);
      await checkA11y(fixture, { rules: MENU_AXE_RULES });
    });
  });
});
