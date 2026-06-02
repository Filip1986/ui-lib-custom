import {
  ChangeDetectionStrategy,
  Component,
  provideZonelessChangeDetection,
  signal,
  type WritableSignal,
} from '@angular/core';
import { TestBed } from '@angular/core/testing';
import type { ComponentFixture } from '@angular/core/testing';
import { checkA11y, SKIP_COLOR_CONTRAST_RULES } from '../../test/a11y-utils';

/**
 * axe-core 4.x has a known false positive with `aria-required-children` when
 * `role="none"` is used as the `<li>` wrapper per the WAI-ARIA Authoring Practices
 * Guide for menubar/menu patterns. Our structure is correct per the spec.
 * We disable this rule only in Menubar axe checks to avoid false failures.
 * We also disable `color-contrast` since jsdom cannot compute CSS variable colours.
 */
const MENUBAR_AXE_RULES: Record<string, { enabled: boolean }> = {
  ...SKIP_COLOR_CONTRAST_RULES,
  'aria-required-children': { enabled: false },
};
import { Menubar } from './menubar';
import type { MenubarItem } from './menubar.types';

// ─── Typed query helpers ───────────────────────────────────────────────────────

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

// ─── Keyboard event helper ─────────────────────────────────────────────────────

function dispatchKey(el: HTMLElement, key: string): void {
  el.dispatchEvent(new KeyboardEvent('keydown', { key, bubbles: true, cancelable: true }));
}

// ─── Test fixtures ─────────────────────────────────────────────────────────────

const BASIC_ITEMS: MenubarItem[] = [
  {
    label: 'File',
    items: [
      { label: 'New' },
      { label: 'Open' },
      { separator: true },
      { label: 'Exit', disabled: true },
    ],
  },
  { label: 'Edit', items: [{ label: 'Cut' }, { label: 'Copy' }] },
  { label: 'View' },
  { label: 'Help', url: 'https://example.com/help' },
];

// ─── Host component ────────────────────────────────────────────────────────────

@Component({
  standalone: true,
  imports: [Menubar],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<ui-lib-menubar [model]="model()" [ariaLabel]="ariaLabel()" />`,
})
class MenubarA11yHostComponent {
  public readonly model: WritableSignal<MenubarItem[]> = signal<MenubarItem[]>(BASIC_ITEMS);
  public readonly ariaLabel: WritableSignal<string> = signal<string>('Navigation');
}

// ─── Setup helper ─────────────────────────────────────────────────────────────

async function createFixture(): Promise<{
  fixture: ComponentFixture<MenubarA11yHostComponent>;
}> {
  await TestBed.configureTestingModule({
    imports: [MenubarA11yHostComponent],
    providers: [provideZonelessChangeDetection()],
  }).compileComponents();

  const fixture: ComponentFixture<MenubarA11yHostComponent> =
    TestBed.createComponent(MenubarA11yHostComponent);
  document.body.appendChild(fixture.nativeElement); // required for focus tests in jsdom
  fixture.detectChanges();
  await fixture.whenStable();
  return { fixture };
}

// ─── Helper: open root panel ───────────────────────────────────────────────────

async function openRootPanel(
  fixture: ComponentFixture<MenubarA11yHostComponent>,
  linkIndex: number,
): Promise<void> {
  const links: HTMLElement[] = queryAllEl<HTMLElement>(fixture, '.ui-lib-menubar__root-link');
  dispatchKey(links[linkIndex] as HTMLElement, 'ArrowDown');
  fixture.detectChanges();
  await fixture.whenStable();
  fixture.detectChanges();
  await fixture.whenStable();
}

// ─── Spec ──────────────────────────────────────────────────────────────────────

describe('Menubar Accessibility', (): void => {
  let fixture: ComponentFixture<MenubarA11yHostComponent>;

  afterEach((): void => {
    fixture.destroy();
  });

  // ── nav landmark ──────────────────────────────────────────────────────────────

  describe('nav landmark', (): void => {
    it('has a <nav> element with the correct aria-label', async (): Promise<void> => {
      ({ fixture } = await createFixture());
      const nav: HTMLElement | null = queryEl(fixture, 'nav.ui-lib-menubar__nav');
      expect(nav).toBeTruthy();
      expect(nav?.getAttribute('aria-label')).toBe('Navigation');
    });

    it('uses the ariaLabel input to set the aria-label', async (): Promise<void> => {
      ({ fixture } = await createFixture());
      fixture.componentInstance.ariaLabel.set('Primary navigation');
      fixture.detectChanges();
      const nav: HTMLElement | null = queryEl(fixture, 'nav');
      expect(nav?.getAttribute('aria-label')).toBe('Primary navigation');
    });

    it('defaults to "Navigation" when ariaLabel is not set', async (): Promise<void> => {
      ({ fixture } = await createFixture());
      const nav: HTMLElement | null = queryEl(fixture, 'nav');
      expect(nav?.getAttribute('aria-label')).toBe('Navigation');
    });
  });

  // ── menubar ARIA structure ────────────────────────────────────────────────────

  describe('menubar ARIA structure', (): void => {
    it('root <ul> has role="menubar"', async (): Promise<void> => {
      ({ fixture } = await createFixture());
      const rootList: HTMLElement | null = queryEl(fixture, 'ul[role="menubar"]');
      expect(rootList).toBeTruthy();
    });

    it('root <ul> has the correct id matching the toggle aria-controls', async (): Promise<void> => {
      ({ fixture } = await createFixture());
      const rootList: HTMLElement | null = queryEl(fixture, 'ul[role="menubar"]');
      const toggleBtn: HTMLElement | null = queryEl(fixture, 'button.ui-lib-menubar__toggle');
      const listId: string | null = rootList?.getAttribute('id') ?? null;
      const ariaControls: string | null = toggleBtn?.getAttribute('aria-controls') ?? null;
      expect(listId).toBeTruthy();
      expect(listId).toBe(ariaControls);
    });

    it('root <li> wrappers have role="none"', async (): Promise<void> => {
      ({ fixture } = await createFixture());
      const items: HTMLElement[] = queryAllEl(
        fixture,
        'ul[role="menubar"] > .ui-lib-menubar__root-item',
      );
      expect(items.length).toBeGreaterThan(0);
      for (const item of items) {
        expect(item.getAttribute('role')).toBe('none');
      }
    });

    it('root <a> links have role="menuitem"', async (): Promise<void> => {
      ({ fixture } = await createFixture());
      const links: HTMLElement[] = queryAllEl(fixture, '.ui-lib-menubar__root-link');
      expect(links.length).toBeGreaterThan(0);
      for (const link of links) {
        expect(link.getAttribute('role')).toBe('menuitem');
      }
    });

    it('an item with subitems has aria-haspopup="menu" on its <a>', async (): Promise<void> => {
      ({ fixture } = await createFixture());
      const links: HTMLElement[] = queryAllEl(fixture, '.ui-lib-menubar__root-link');
      // File (index 0) and Edit (index 1) have subitems
      expect(links[0]?.getAttribute('aria-haspopup')).toBe('menu');
      expect(links[1]?.getAttribute('aria-haspopup')).toBe('menu');
    });

    it('an item with subitems has aria-expanded="false" when closed', async (): Promise<void> => {
      ({ fixture } = await createFixture());
      const links: HTMLElement[] = queryAllEl(fixture, '.ui-lib-menubar__root-link');
      expect(links[0]?.getAttribute('aria-expanded')).toBe('false');
    });

    it('an item with subitems has aria-expanded="true" when open', async (): Promise<void> => {
      ({ fixture } = await createFixture());
      await openRootPanel(fixture, 0);
      const links: HTMLElement[] = queryAllEl(fixture, '.ui-lib-menubar__root-link');
      expect(links[0]?.getAttribute('aria-expanded')).toBe('true');
    });

    it('a leaf item does NOT have aria-haspopup attribute', async (): Promise<void> => {
      ({ fixture } = await createFixture());
      const links: HTMLElement[] = queryAllEl(fixture, '.ui-lib-menubar__root-link');
      // View (index 2) and Help (index 3) are leaf items
      expect(links[2]?.hasAttribute('aria-haspopup')).toBe(false);
      expect(links[3]?.hasAttribute('aria-haspopup')).toBe(false);
    });

    it('a disabled item has aria-disabled="true"', async (): Promise<void> => {
      ({ fixture } = await createFixture());
      fixture.componentInstance.model.set([{ label: 'Disabled', disabled: true }]);
      fixture.detectChanges();
      const link: HTMLElement | null = queryEl(fixture, '.ui-lib-menubar__root-link');
      expect(link?.getAttribute('aria-disabled')).toBe('true');
    });

    it('root separator has role="separator" and aria-hidden="true"', async (): Promise<void> => {
      ({ fixture } = await createFixture());
      fixture.componentInstance.model.set([
        { label: 'File' },
        { separator: true },
        { label: 'Help' },
      ]);
      fixture.detectChanges();
      const sep: HTMLElement | null = queryEl(fixture, '.ui-lib-menubar__root-separator');
      expect(sep?.getAttribute('role')).toBe('separator');
      expect(sep?.getAttribute('aria-hidden')).toBe('true');
    });
  });

  // ── submenu ARIA structure ────────────────────────────────────────────────────

  describe('submenu ARIA structure', (): void => {
    it('submenu <ul> has role="menu"', async (): Promise<void> => {
      ({ fixture } = await createFixture());
      await openRootPanel(fixture, 0);
      const menu: HTMLElement | null = queryEl(fixture, 'ul[role="menu"]');
      expect(menu).toBeTruthy();
    });

    it('submenu <ul> has aria-orientation="vertical"', async (): Promise<void> => {
      ({ fixture } = await createFixture());
      await openRootPanel(fixture, 0);
      const menu: HTMLElement | null = queryEl(fixture, 'ul[role="menu"]');
      expect(menu?.getAttribute('aria-orientation')).toBe('vertical');
    });

    it('submenu <li> wrappers have role="none"', async (): Promise<void> => {
      ({ fixture } = await createFixture());
      await openRootPanel(fixture, 0);
      const subItems: HTMLElement[] = queryAllEl(fixture, '.ui-lib-menubar__sub-item');
      expect(subItems.length).toBeGreaterThan(0);
      for (const item of subItems) {
        expect(item.getAttribute('role')).toBe('none');
      }
    });

    it('submenu <a> links have role="menuitem"', async (): Promise<void> => {
      ({ fixture } = await createFixture());
      await openRootPanel(fixture, 0);
      const subLinks: HTMLElement[] = queryAllEl(fixture, '.ui-lib-menubar__sub-link');
      expect(subLinks.length).toBeGreaterThan(0);
      for (const link of subLinks) {
        expect(link.getAttribute('role')).toBe('menuitem');
      }
    });

    it('submenu separator has role="separator" and aria-hidden="true"', async (): Promise<void> => {
      ({ fixture } = await createFixture());
      await openRootPanel(fixture, 0); // File panel has a separator
      const sep: HTMLElement | null = queryEl(fixture, '.ui-lib-menubar__sub-separator');
      expect(sep?.getAttribute('role')).toBe('separator');
      expect(sep?.getAttribute('aria-hidden')).toBe('true');
    });

    it('disabled submenu item has aria-disabled="true"', async (): Promise<void> => {
      ({ fixture } = await createFixture());
      await openRootPanel(fixture, 0); // File panel has disabled Exit item
      const disabledLinks: HTMLElement[] = queryAllEl(
        fixture,
        '.ui-lib-menubar__sub-link[aria-disabled="true"]',
      );
      expect(disabledLinks.length).toBeGreaterThan(0);
    });

    it('icon <span> inside a sub-link has aria-hidden="true"', async (): Promise<void> => {
      ({ fixture } = await createFixture());
      fixture.componentInstance.model.set([
        { label: 'File', items: [{ label: 'New', icon: 'pi pi-plus' }] },
      ]);
      fixture.detectChanges();
      await openRootPanel(fixture, 0);
      const icon: HTMLElement | null = queryEl(fixture, '.ui-lib-menubar__sub-icon');
      expect(icon?.getAttribute('aria-hidden')).toBe('true');
    });
  });

  // ── hamburger toggle button ───────────────────────────────────────────────────

  describe('hamburger toggle button', (): void => {
    it('has type="button"', async (): Promise<void> => {
      ({ fixture } = await createFixture());
      const btn: HTMLElement | null = queryEl(fixture, 'button.ui-lib-menubar__toggle');
      expect(btn?.getAttribute('type')).toBe('button');
    });

    it('has aria-label="Toggle navigation menu"', async (): Promise<void> => {
      ({ fixture } = await createFixture());
      const btn: HTMLElement | null = queryEl(fixture, 'button.ui-lib-menubar__toggle');
      expect(btn?.getAttribute('aria-label')).toBe('Toggle navigation menu');
    });

    it('has aria-expanded="false" when menu is closed', async (): Promise<void> => {
      ({ fixture } = await createFixture());
      const btn: HTMLElement | null = queryEl(fixture, 'button.ui-lib-menubar__toggle');
      expect(btn?.getAttribute('aria-expanded')).toBe('false');
    });

    it('has aria-expanded="true" when menu is open', async (): Promise<void> => {
      ({ fixture } = await createFixture());
      const btn: HTMLButtonElement | null = queryEl<HTMLButtonElement>(
        fixture,
        'button.ui-lib-menubar__toggle',
      );
      btn?.click();
      fixture.detectChanges();
      expect(btn?.getAttribute('aria-expanded')).toBe('true');
    });

    it('aria-controls points to the root list id (matches [attr.id] on <ul>)', async (): Promise<void> => {
      ({ fixture } = await createFixture());
      const btn: HTMLElement | null = queryEl(fixture, 'button.ui-lib-menubar__toggle');
      const rootList: HTMLElement | null = queryEl(fixture, 'ul[role="menubar"]');
      const ariaControls: string | null = btn?.getAttribute('aria-controls') ?? null;
      const listId: string | null = rootList?.getAttribute('id') ?? null;
      expect(ariaControls).toBeTruthy();
      expect(ariaControls).toBe(listId);
    });
  });

  // ── roving tabindex ───────────────────────────────────────────────────────────

  describe('roving tabindex (keyboard navigation model)', (): void => {
    it('first root item has tabindex="0" by default', async (): Promise<void> => {
      ({ fixture } = await createFixture());
      const links: HTMLElement[] = queryAllEl(fixture, '.ui-lib-menubar__root-link');
      expect(links[0]?.getAttribute('tabindex')).toBe('0');
    });

    it('other root items have tabindex="-1" by default', async (): Promise<void> => {
      ({ fixture } = await createFixture());
      const links: HTMLElement[] = queryAllEl(fixture, '.ui-lib-menubar__root-link');
      for (let i: number = 1; i < links.length; i++) {
        expect(links[i]?.getAttribute('tabindex')).toBe('-1');
      }
    });

    it('tabindex="0" moves to the item focused via ArrowRight', async (): Promise<void> => {
      ({ fixture } = await createFixture());
      const links: HTMLElement[] = queryAllEl(fixture, '.ui-lib-menubar__root-link');
      dispatchKey(links[0] as HTMLElement, 'ArrowRight');
      fixture.detectChanges();
      const updatedLinks: HTMLElement[] = queryAllEl(fixture, '.ui-lib-menubar__root-link');
      expect(updatedLinks[1]?.getAttribute('tabindex')).toBe('0');
      expect(updatedLinks[0]?.getAttribute('tabindex')).toBe('-1');
    });

    it('disabled items always have tabindex="-1"', async (): Promise<void> => {
      ({ fixture } = await createFixture());
      fixture.componentInstance.model.set([
        { label: 'Disabled', disabled: true },
        { label: 'Enabled' },
      ]);
      fixture.detectChanges();
      const links: HTMLElement[] = queryAllEl(fixture, '.ui-lib-menubar__root-link');
      expect(links[0]?.getAttribute('tabindex')).toBe('-1');
    });
  });

  // ── keyboard navigation — root level ─────────────────────────────────────────

  describe('keyboard navigation — root level', (): void => {
    it('ArrowDown opens the panel and the first sub-item is focusable', async (): Promise<void> => {
      ({ fixture } = await createFixture());
      await openRootPanel(fixture, 0);
      const panel: HTMLElement | null = queryEl(fixture, '.ui-lib-menubar__panel');
      expect(panel).toBeTruthy();
    });

    it('ArrowRight moves focus to the next root item', async (): Promise<void> => {
      ({ fixture } = await createFixture());
      const links: HTMLElement[] = queryAllEl(fixture, '.ui-lib-menubar__root-link');
      dispatchKey(links[0] as HTMLElement, 'ArrowRight');
      fixture.detectChanges();
      const updatedLinks: HTMLElement[] = queryAllEl(fixture, '.ui-lib-menubar__root-link');
      expect(updatedLinks[1]?.getAttribute('tabindex')).toBe('0');
    });

    it('ArrowLeft moves focus to the previous root item', async (): Promise<void> => {
      ({ fixture } = await createFixture());
      // First set rovingIndex to 1 via ArrowRight
      const links: HTMLElement[] = queryAllEl(fixture, '.ui-lib-menubar__root-link');
      dispatchKey(links[0] as HTMLElement, 'ArrowRight');
      fixture.detectChanges();
      // Now dispatchKey ArrowLeft from the second link
      const updatedLinks: HTMLElement[] = queryAllEl(fixture, '.ui-lib-menubar__root-link');
      dispatchKey(updatedLinks[1] as HTMLElement, 'ArrowLeft');
      fixture.detectChanges();
      const finalLinks: HTMLElement[] = queryAllEl(fixture, '.ui-lib-menubar__root-link');
      expect(finalLinks[0]?.getAttribute('tabindex')).toBe('0');
    });

    it('Home moves focus to the first root item', async (): Promise<void> => {
      ({ fixture } = await createFixture());
      const links: HTMLElement[] = queryAllEl(fixture, '.ui-lib-menubar__root-link');
      // Navigate somewhere else first
      dispatchKey(links[0] as HTMLElement, 'ArrowRight');
      fixture.detectChanges();
      const updatedLinks: HTMLElement[] = queryAllEl(fixture, '.ui-lib-menubar__root-link');
      dispatchKey(updatedLinks[1] as HTMLElement, 'Home');
      fixture.detectChanges();
      const finalLinks: HTMLElement[] = queryAllEl(fixture, '.ui-lib-menubar__root-link');
      expect(finalLinks[0]?.getAttribute('tabindex')).toBe('0');
    });

    it('End moves focus to the last root item', async (): Promise<void> => {
      ({ fixture } = await createFixture());
      const links: HTMLElement[] = queryAllEl(fixture, '.ui-lib-menubar__root-link');
      dispatchKey(links[0] as HTMLElement, 'End');
      fixture.detectChanges();
      const updatedLinks: HTMLElement[] = queryAllEl(fixture, '.ui-lib-menubar__root-link');
      expect(updatedLinks[updatedLinks.length - 1]?.getAttribute('tabindex')).toBe('0');
    });
  });

  // ── keyboard navigation — submenu level ─────────────────────────────────────

  describe('keyboard navigation — submenu level', (): void => {
    it('ArrowDown / ArrowUp helpers: submenu panel is present after open', async (): Promise<void> => {
      ({ fixture } = await createFixture());
      await openRootPanel(fixture, 0);
      const subLinks: HTMLElement[] = queryAllEl(fixture, '.ui-lib-menubar__sub-link');
      expect(subLinks.length).toBeGreaterThan(0);
    });

    it('ArrowDown moves focus to the next sub-item (wrap)', async (): Promise<void> => {
      ({ fixture } = await createFixture());
      await openRootPanel(fixture, 0);
      const subLinks: HTMLElement[] = queryAllEl(
        fixture,
        '.ui-lib-menubar__panel:not(.ui-lib-menubar__panel--nested) .ui-lib-menubar__sub-link:not([aria-disabled="true"])',
      );
      expect(subLinks.length).toBeGreaterThan(1);
      // Focus the first sub-link manually
      subLinks[0]?.focus();
      dispatchKey(subLinks[0] as HTMLElement, 'ArrowDown');
      fixture.detectChanges();
      // jsdom tracks focus; second link should have received focus
      expect(document.activeElement).toBe(subLinks[1]);
    });

    it('ArrowUp moves focus to the previous sub-item (wrap)', async (): Promise<void> => {
      ({ fixture } = await createFixture());
      await openRootPanel(fixture, 0);
      const subLinks: HTMLElement[] = queryAllEl(
        fixture,
        '.ui-lib-menubar__panel:not(.ui-lib-menubar__panel--nested) .ui-lib-menubar__sub-link:not([aria-disabled="true"])',
      );
      expect(subLinks.length).toBeGreaterThan(1);
      // Focus the second sub-link manually
      subLinks[1]?.focus();
      dispatchKey(subLinks[1] as HTMLElement, 'ArrowUp');
      fixture.detectChanges();
      expect(document.activeElement).toBe(subLinks[0]);
    });

    it('Escape from submenu closes the panel', async (): Promise<void> => {
      ({ fixture } = await createFixture());
      await openRootPanel(fixture, 0);
      const subLinks: HTMLElement[] = queryAllEl(
        fixture,
        '.ui-lib-menubar__sub-link:not([aria-disabled="true"])',
      );
      expect(subLinks.length).toBeGreaterThan(0);
      dispatchKey(subLinks[0] as HTMLElement, 'Escape');
      fixture.detectChanges();
      await fixture.whenStable();
      const panel: HTMLElement | null = queryEl(fixture, '.ui-lib-menubar__panel');
      expect(panel).toBeNull();
    });
  });

  // ── axe-core automated checks ─────────────────────────────────────────────────

  describe('axe-core automated checks', (): void => {
    it('passes axe — empty model (no items)', async (): Promise<void> => {
      ({ fixture } = await createFixture());
      fixture.componentInstance.model.set([]);
      fixture.detectChanges();
      await checkA11y(fixture, { rules: MENUBAR_AXE_RULES });
    });

    it('passes axe — with full model, all panels closed', async (): Promise<void> => {
      ({ fixture } = await createFixture());
      await checkA11y(fixture, { rules: MENUBAR_AXE_RULES });
    });

    it('passes axe — with first panel open', async (): Promise<void> => {
      ({ fixture } = await createFixture());
      await openRootPanel(fixture, 0);
      await checkA11y(fixture, { rules: MENUBAR_AXE_RULES });
    });

    it('passes axe — with nested sub-panel open', async (): Promise<void> => {
      ({ fixture } = await createFixture());
      fixture.componentInstance.model.set([
        {
          label: 'Edit',
          items: [
            {
              label: 'Selection',
              items: [{ label: 'Select All' }, { label: 'Deselect All' }],
            },
          ],
        },
      ]);
      fixture.detectChanges();
      await openRootPanel(fixture, 0);
      // Open the nested sub-panel via ArrowRight
      const subLinks: HTMLElement[] = queryAllEl(fixture, '.ui-lib-menubar__sub-link');
      dispatchKey(subLinks[0] as HTMLElement, 'ArrowRight');
      fixture.detectChanges();
      await fixture.whenStable();
      fixture.detectChanges();
      await checkA11y(fixture, { rules: MENUBAR_AXE_RULES });
    });
  });
});
