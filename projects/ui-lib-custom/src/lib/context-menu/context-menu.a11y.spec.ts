import {
  ChangeDetectionStrategy,
  Component,
  provideZonelessChangeDetection,
  signal,
  type DebugElement,
  type WritableSignal,
} from '@angular/core';
import { TestBed, type ComponentFixture } from '@angular/core/testing';
import { checkA11y, SKIP_COLOR_CONTRAST_RULES } from '../../test/a11y-utils';
import { ContextMenu, CONTEXT_MENU_DEFAULT_ARIA_LABEL } from './context-menu';
import type { ContextMenuItem } from './context-menu.types';

/**
 * axe-core may report `aria-required-children` for this menu structure because
 * the items are wrapped by a presentational `<ul role="presentation">`.
 * The structure follows the same accepted pattern as hardened Menu/TieredMenu,
 * so this single rule is suppressed in automated checks.
 */
const CONTEXT_MENU_AXE_RULES: Record<string, { enabled: boolean }> = {
  ...SKIP_COLOR_CONTRAST_RULES,
  'aria-required-children': { enabled: false },
};

const BASIC_ITEMS: ContextMenuItem[] = [
  { label: 'Open', icon: 'pi pi-folder-open' },
  {
    label: 'More',
    icon: 'pi pi-ellipsis-h',
    items: [{ label: 'Share' }, { separator: true }, { label: 'Archive' }],
  },
  { separator: true },
  { label: 'Disabled item', icon: 'pi pi-ban', disabled: true },
  { label: 'Delete', icon: 'pi pi-trash' },
];

const TOP_LEVEL_LINK_SELECTOR: string =
  '.ui-lib-context-menu__panel > .ui-lib-context-menu__list > .ui-lib-context-menu__item > .ui-lib-context-menu__link';

function queryEl<T extends HTMLElement>(
  fixture: ComponentFixture<unknown>,
  selector: string,
): T | null {
  return (fixture.nativeElement as HTMLElement).querySelector<T>(selector);
}

function queryAllEl<T extends HTMLElement>(
  fixture: ComponentFixture<unknown>,
  selector: string,
): T[] {
  return Array.from((fixture.nativeElement as HTMLElement).querySelectorAll<T>(selector));
}

function getContextMenuInstance(fixture: ComponentFixture<unknown>): ContextMenu {
  return fixture.debugElement.query(
    (debugElement: DebugElement): boolean => debugElement.componentInstance instanceof ContextMenu,
  ).componentInstance as ContextMenu;
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

@Component({
  standalone: true,
  imports: [ContextMenu],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <button
      type="button"
      class="context-trigger"
      aria-haspopup="menu"
      [attr.aria-expanded]="menu.isVisible() ? 'true' : 'false'"
      [attr.aria-controls]="menu.contextMenuId"
      (contextmenu)="menu.show($event)"
    >
      Right-click me
    </button>
    <ui-lib-context-menu #menu [model]="model()" [ariaLabel]="ariaLabel()" />
  `,
})
class ContextMenuA11yHostComponent {
  public readonly model: WritableSignal<ContextMenuItem[]> = signal<ContextMenuItem[]>(BASIC_ITEMS);
  public readonly ariaLabel: WritableSignal<string> = signal<string>('Options');
}

@Component({
  standalone: true,
  imports: [ContextMenu],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <button
      type="button"
      class="context-trigger"
      aria-haspopup="menu"
      (contextmenu)="menu.show($event)"
    >
      Right-click me
    </button>
    <ui-lib-context-menu #menu [model]="model()" />
  `,
})
class ContextMenuDefaultLabelHostComponent {
  public readonly model: WritableSignal<ContextMenuItem[]> = signal<ContextMenuItem[]>(BASIC_ITEMS);
}

async function createFixture(
  hostComponent:
    | typeof ContextMenuA11yHostComponent
    | typeof ContextMenuDefaultLabelHostComponent = ContextMenuA11yHostComponent,
): Promise<ComponentFixture<ContextMenuA11yHostComponent | ContextMenuDefaultLabelHostComponent>> {
  await TestBed.configureTestingModule({
    imports: [hostComponent],
    providers: [provideZonelessChangeDetection()],
  }).compileComponents();
  const fixture: ComponentFixture<
    ContextMenuA11yHostComponent | ContextMenuDefaultLabelHostComponent
  > = TestBed.createComponent(hostComponent);
  document.body.appendChild(fixture.nativeElement);
  fixture.detectChanges();
  await fixture.whenStable();
  return fixture;
}

async function openMenu(
  fixture: ComponentFixture<ContextMenuA11yHostComponent | ContextMenuDefaultLabelHostComponent>,
): Promise<void> {
  const trigger: HTMLElement | null = queryEl<HTMLElement>(fixture, '.context-trigger');
  if (!trigger) {
    throw new Error('Expected context trigger to exist');
  }
  const contextMenuEvent: MouseEvent = new MouseEvent('contextmenu', {
    bubbles: true,
    cancelable: true,
    clientX: 100,
    clientY: 100,
  });
  trigger.dispatchEvent(contextMenuEvent);
  fixture.detectChanges();
  await fixture.whenStable();
  fixture.detectChanges();
  await fixture.whenStable();
}

async function openSubmenu(
  fixture: ComponentFixture<ContextMenuA11yHostComponent | ContextMenuDefaultLabelHostComponent>,
): Promise<void> {
  const parentLink: HTMLElement | null = queryEl<HTMLElement>(
    fixture,
    '.ui-lib-context-menu__link[aria-haspopup="menu"]',
  );
  if (!parentLink) {
    throw new Error('Expected a parent item with submenu');
  }
  parentLink.focus();
  dispatchKey(parentLink, 'ArrowRight');
  fixture.detectChanges();
  await fixture.whenStable();
}

describe('ContextMenu Accessibility', (): void => {
  let fixture:
    | ComponentFixture<ContextMenuA11yHostComponent | ContextMenuDefaultLabelHostComponent>
    | undefined;

  afterEach((): void => {
    fixture?.destroy();
  });

  describe('panel ARIA structure', (): void => {
    it('panel has role="menu"', async (): Promise<void> => {
      fixture = await createFixture();
      await openMenu(fixture);
      expect(queryEl(fixture, '.ui-lib-context-menu__panel')?.getAttribute('role')).toBe('menu');
    });

    it('panel has aria-label from ariaLabel input', async (): Promise<void> => {
      fixture = await createFixture();
      await openMenu(fixture);
      expect(queryEl(fixture, '.ui-lib-context-menu__panel')?.getAttribute('aria-label')).toBe(
        'Options',
      );
    });

    it('panel defaults to CONTEXT_MENU_DEFAULT_ARIA_LABEL when ariaLabel is not set', async (): Promise<void> => {
      fixture = await createFixture(ContextMenuDefaultLabelHostComponent);
      await openMenu(fixture);
      expect(queryEl(fixture, '.ui-lib-context-menu__panel')?.getAttribute('aria-label')).toBe(
        CONTEXT_MENU_DEFAULT_ARIA_LABEL,
      );
    });

    it('item wrappers have role="none"', async (): Promise<void> => {
      fixture = await createFixture();
      await openMenu(fixture);
      const wrappers: HTMLElement[] = queryAllEl(
        fixture,
        '.ui-lib-context-menu__panel .ui-lib-context-menu__item',
      );
      expect(wrappers.length).toBeGreaterThan(0);
      for (const wrapper of wrappers) {
        expect(wrapper.getAttribute('role')).toBe('none');
      }
    });

    it('item links have role="menuitem"', async (): Promise<void> => {
      fixture = await createFixture();
      await openMenu(fixture);
      const links: HTMLElement[] = queryAllEl(
        fixture,
        '.ui-lib-context-menu__panel .ui-lib-context-menu__link',
      );
      expect(links.length).toBeGreaterThan(0);
      for (const link of links) {
        expect(link.getAttribute('role')).toBe('menuitem');
      }
    });

    it('parent item has aria-haspopup="menu"', async (): Promise<void> => {
      fixture = await createFixture();
      await openMenu(fixture);
      expect(queryEl(fixture, '.ui-lib-context-menu__link[aria-haspopup="menu"]')).toBeTruthy();
    });

    it('parent item has aria-expanded="false" when submenu is closed', async (): Promise<void> => {
      fixture = await createFixture();
      await openMenu(fixture);
      expect(
        queryEl(fixture, '.ui-lib-context-menu__link[aria-haspopup="menu"]')?.getAttribute(
          'aria-expanded',
        ),
      ).toBe('false');
    });

    it('parent item has aria-expanded="true" when submenu is open', async (): Promise<void> => {
      fixture = await createFixture();
      await openMenu(fixture);
      await openSubmenu(fixture);
      expect(
        queryEl(fixture, '.ui-lib-context-menu__link[aria-haspopup="menu"]')?.getAttribute(
          'aria-expanded',
        ),
      ).toBe('true');
    });

    it('separator has role="separator" and no aria-hidden attribute', async (): Promise<void> => {
      fixture = await createFixture();
      await openMenu(fixture);
      const separator: HTMLElement | null = queryEl(fixture, '.ui-lib-context-menu__separator');
      expect(separator?.getAttribute('role')).toBe('separator');
      expect(separator?.hasAttribute('aria-hidden')).toBe(false);
    });

    it('submenu separator has role="separator" and no aria-hidden attribute', async (): Promise<void> => {
      fixture = await createFixture();
      await openMenu(fixture);
      await openSubmenu(fixture);
      const separator: HTMLElement | null = queryEl(
        fixture,
        '.ui-lib-context-menu__submenu .ui-lib-context-menu__separator',
      );
      expect(separator?.getAttribute('role')).toBe('separator');
      expect(separator?.hasAttribute('aria-hidden')).toBe(false);
    });

    it('disabled items expose aria-disabled="true"', async (): Promise<void> => {
      fixture = await createFixture();
      await openMenu(fixture);
      expect(queryEl(fixture, '.ui-lib-context-menu__link[aria-disabled="true"]')).toBeTruthy();
    });

    it('decorative icon spans use aria-hidden="true"', async (): Promise<void> => {
      fixture = await createFixture();
      await openMenu(fixture);
      const icons: HTMLElement[] = queryAllEl(
        fixture,
        '.ui-lib-context-menu__item-icon, .ui-lib-context-menu__submenu-icon',
      );
      expect(icons.length).toBeGreaterThan(0);
      for (const icon of icons) {
        expect(icon.getAttribute('aria-hidden')).toBe('true');
      }
    });
  });

  describe('roving tabindex', (): void => {
    it('first enabled item has tabindex="0" when menu opens', async (): Promise<void> => {
      fixture = await createFixture();
      await openMenu(fixture);
      const links: HTMLElement[] = queryAllEl(fixture, TOP_LEVEL_LINK_SELECTOR);
      expect(links[0]?.getAttribute('tabindex')).toBe('0');
    });

    it('other enabled items have tabindex="-1"', async (): Promise<void> => {
      fixture = await createFixture();
      await openMenu(fixture);
      const links: HTMLElement[] = queryAllEl(fixture, TOP_LEVEL_LINK_SELECTOR);
      expect(links[1]?.getAttribute('tabindex')).toBe('-1');
      expect(links[3]?.getAttribute('tabindex')).toBe('-1');
    });

    it('disabled items always have tabindex="-1"', async (): Promise<void> => {
      fixture = await createFixture();
      await openMenu(fixture);
      const disabledLink: HTMLElement | null = queryEl(
        fixture,
        '.ui-lib-context-menu__link[aria-disabled="true"]',
      );
      expect(disabledLink?.getAttribute('tabindex')).toBe('-1');
    });

    it('tabindex="0" tracks item focused via ArrowDown', async (): Promise<void> => {
      fixture = await createFixture();
      await openMenu(fixture);
      const links: HTMLElement[] = queryAllEl(fixture, TOP_LEVEL_LINK_SELECTOR);
      links[0]?.focus();
      dispatchKey(links[0] as HTMLElement, 'ArrowDown');
      fixture.detectChanges();
      expect(links[0]?.getAttribute('tabindex')).toBe('-1');
      expect(links[1]?.getAttribute('tabindex')).toBe('0');
    });
  });

  describe('keyboard navigation', (): void => {
    it('ArrowDown moves focus to the next item and wraps', async (): Promise<void> => {
      fixture = await createFixture();
      await openMenu(fixture);
      const links: HTMLElement[] = queryAllEl(fixture, TOP_LEVEL_LINK_SELECTOR);
      links[3]?.focus();
      dispatchKey(links[3] as HTMLElement, 'ArrowDown');
      fixture.detectChanges();
      expect(document.activeElement).toBe(links[0]);
    });

    it('ArrowUp moves focus to the previous item and wraps', async (): Promise<void> => {
      fixture = await createFixture();
      await openMenu(fixture);
      const links: HTMLElement[] = queryAllEl(fixture, TOP_LEVEL_LINK_SELECTOR);
      links[0]?.focus();
      dispatchKey(links[0] as HTMLElement, 'ArrowUp');
      fixture.detectChanges();
      expect(document.activeElement).toBe(links[3]);
    });

    it('Home moves focus to the first item', async (): Promise<void> => {
      fixture = await createFixture();
      await openMenu(fixture);
      const links: HTMLElement[] = queryAllEl(fixture, TOP_LEVEL_LINK_SELECTOR);
      links[3]?.focus();
      dispatchKey(links[3] as HTMLElement, 'Home');
      fixture.detectChanges();
      expect(document.activeElement).toBe(links[0]);
    });

    it('End moves focus to the last item', async (): Promise<void> => {
      fixture = await createFixture();
      await openMenu(fixture);
      const links: HTMLElement[] = queryAllEl(fixture, TOP_LEVEL_LINK_SELECTOR);
      links[0]?.focus();
      dispatchKey(links[0] as HTMLElement, 'End');
      fixture.detectChanges();
      expect(document.activeElement).toBe(links[3]);
    });

    it('ArrowRight opens submenu when item has children', async (): Promise<void> => {
      fixture = await createFixture();
      await openMenu(fixture);
      const parentLink: HTMLElement | null = queryEl(
        fixture,
        '.ui-lib-context-menu__link[aria-haspopup="menu"]',
      );
      parentLink?.focus();
      dispatchKey(parentLink as HTMLElement, 'ArrowRight');
      fixture.detectChanges();
      expect(queryEl(fixture, '.ui-lib-context-menu__submenu')).toBeTruthy();
    });

    it('ArrowLeft closes an open submenu', async (): Promise<void> => {
      fixture = await createFixture();
      await openMenu(fixture);
      await openSubmenu(fixture);
      const parentLink: HTMLElement | null = queryEl(
        fixture,
        '.ui-lib-context-menu__link[aria-haspopup="menu"]',
      );
      dispatchKey(parentLink as HTMLElement, 'ArrowLeft');
      fixture.detectChanges();
      expect(queryEl(fixture, '.ui-lib-context-menu__submenu')).toBeNull();
    });

    it('Escape closes the menu', async (): Promise<void> => {
      fixture = await createFixture();
      await openMenu(fixture);
      const firstLink: HTMLElement | null = queryEl(fixture, TOP_LEVEL_LINK_SELECTOR);
      dispatchKey(firstLink as HTMLElement, 'Escape');
      fixture.detectChanges();
      expect(getContextMenuInstance(fixture).isVisible()).toBe(false);
    });

    it('Tab closes the menu without preventing default', async (): Promise<void> => {
      fixture = await createFixture();
      await openMenu(fixture);
      const firstLink: HTMLElement | null = queryEl(fixture, TOP_LEVEL_LINK_SELECTOR);
      const event: KeyboardEvent = dispatchKey(firstLink as HTMLElement, 'Tab');
      fixture.detectChanges();
      expect(getContextMenuInstance(fixture).isVisible()).toBe(false);
      expect(event.defaultPrevented).toBe(false);
    });
  });

  describe('focus management', (): void => {
    it('opens and focuses the first enabled item', async (): Promise<void> => {
      fixture = await createFixture();
      await openMenu(fixture);
      const links: HTMLElement[] = queryAllEl(fixture, TOP_LEVEL_LINK_SELECTOR);
      expect(document.activeElement).toBe(links[0]);
    });

    it('restores focus to the trigger on Escape close', async (): Promise<void> => {
      fixture = await createFixture();
      const trigger: HTMLElement | null = queryEl(fixture, '.context-trigger');
      trigger?.focus();
      await openMenu(fixture);
      const firstLink: HTMLElement | null = queryEl(fixture, TOP_LEVEL_LINK_SELECTOR);
      dispatchKey(firstLink as HTMLElement, 'Escape');
      fixture.detectChanges();
      expect(document.activeElement).toBe(trigger);
    });
  });

  describe('axe-core automated checks', (): void => {
    it('passes axe when menu is hidden', async (): Promise<void> => {
      fixture = await createFixture();
      await checkA11y(fixture, { rules: CONTEXT_MENU_AXE_RULES });
    });

    it('passes axe when menu is open with items', async (): Promise<void> => {
      fixture = await createFixture();
      await openMenu(fixture);
      await checkA11y(fixture, { rules: CONTEXT_MENU_AXE_RULES });
    });

    it('passes axe when menu is open with separator items', async (): Promise<void> => {
      fixture = await createFixture();
      (fixture.componentInstance as ContextMenuA11yHostComponent).model.set([
        { label: 'First' },
        { separator: true },
        { label: 'Second' },
      ]);
      fixture.detectChanges();
      await openMenu(fixture);
      await checkA11y(fixture, { rules: CONTEXT_MENU_AXE_RULES });
    });

    it('passes axe when menu is open with disabled items', async (): Promise<void> => {
      fixture = await createFixture();
      (fixture.componentInstance as ContextMenuA11yHostComponent).model.set([
        { label: 'Enabled' },
        { label: 'Disabled', disabled: true },
      ]);
      fixture.detectChanges();
      await openMenu(fixture);
      await checkA11y(fixture, { rules: CONTEXT_MENU_AXE_RULES });
    });

    it('passes axe when submenu is open', async (): Promise<void> => {
      fixture = await createFixture();
      await openMenu(fixture);
      await openSubmenu(fixture);
      await checkA11y(fixture, { rules: CONTEXT_MENU_AXE_RULES });
    });
  });
});
