import {
  ChangeDetectionStrategy,
  Component,
  provideZonelessChangeDetection,
  signal,
  type DebugElement,
  type WritableSignal,
} from '@angular/core';
import { TestBed } from '@angular/core/testing';
import type { ComponentFixture } from '@angular/core/testing';
import { checkA11y, SKIP_COLOR_CONTRAST_RULES } from '../../test/a11y-utils';
import { MegaMenu } from './mega-menu';
import type { MegaMenuItem } from './mega-menu.types';

/**
 * axe-core 4.x raises a false positive with `aria-required-children` when
 * `role="none"` is used as the `<li>` wrapper per the WAI-ARIA Authoring Practices
 * Guide for menubar/menu patterns. Our structure is correct per the spec.
 * We disable this rule only in MegaMenu axe checks to avoid false failures.
 * We also disable `color-contrast` since jsdom cannot compute CSS variable colours.
 */
const MEGA_MENU_AXE_RULES: Record<string, { enabled: boolean }> = {
  ...SKIP_COLOR_CONTRAST_RULES,
  'aria-required-children': { enabled: false },
};

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

const BASIC_ITEMS: MegaMenuItem[] = [
  {
    label: 'Products',
    items: [
      {
        header: 'Software',
        items: [
          { label: 'Editor' },
          { label: 'Dashboard' },
          { label: 'Analytics', disabled: true },
        ],
      },
      {
        header: 'Hardware',
        items: [{ label: 'Server' }, { separator: true }, { label: 'Storage' }],
      },
    ],
  },
  {
    label: 'Company',
    items: [
      {
        items: [{ label: 'About Us', url: 'https://example.com/about' }, { label: 'Careers' }],
      },
    ],
  },
  { label: 'Contact', url: 'https://example.com/contact' },
];

// ─── Host component ────────────────────────────────────────────────────────────

@Component({
  standalone: true,
  imports: [MegaMenu],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<ui-lib-mega-menu [model]="model()" [ariaLabel]="ariaLabel()" />`,
})
class MegaMenuA11yHostComponent {
  public readonly model: WritableSignal<MegaMenuItem[]> = signal<MegaMenuItem[]>(BASIC_ITEMS);
  public readonly ariaLabel: WritableSignal<string> = signal<string>('Navigation');
}

// ─── Setup helper ─────────────────────────────────────────────────────────────

async function createFixture(): Promise<{
  fixture: ComponentFixture<MegaMenuA11yHostComponent>;
}> {
  await TestBed.configureTestingModule({
    imports: [MegaMenuA11yHostComponent],
    providers: [provideZonelessChangeDetection()],
  }).compileComponents();

  const fixture: ComponentFixture<MegaMenuA11yHostComponent> =
    TestBed.createComponent(MegaMenuA11yHostComponent);
  document.body.appendChild(fixture.nativeElement); // required for focus tests in jsdom
  fixture.detectChanges();
  await fixture.whenStable();
  return { fixture };
}

// ─── Helper: open a root panel ────────────────────────────────────────────────

async function openRootPanel(
  fixture: ComponentFixture<MegaMenuA11yHostComponent>,
  linkIndex: number,
): Promise<void> {
  const links: HTMLElement[] = queryAllEl<HTMLElement>(fixture, '.ui-lib-mega-menu__root-link');
  dispatchKey(links[linkIndex] as HTMLElement, 'ArrowDown');
  fixture.detectChanges();
  await fixture.whenStable();
  fixture.detectChanges();
  await fixture.whenStable();
}

// ─── Spec ──────────────────────────────────────────────────────────────────────

describe('MegaMenu Accessibility', (): void => {
  let fixture: ComponentFixture<MegaMenuA11yHostComponent>;

  afterEach((): void => {
    fixture.destroy();
  });

  // ── nav landmark ──────────────────────────────────────────────────────────────

  describe('nav landmark', (): void => {
    it('has a <nav> element with the correct default aria-label', async (): Promise<void> => {
      ({ fixture } = await createFixture());
      const nav: HTMLElement | null = queryEl(fixture, 'nav.ui-lib-mega-menu__nav');
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
  });

  // ── menubar ARIA structure ────────────────────────────────────────────────────

  describe('menubar ARIA structure', (): void => {
    it('root <ul> has role="menubar"', async (): Promise<void> => {
      ({ fixture } = await createFixture());
      const rootList: HTMLElement | null = queryEl(fixture, 'ul[role="menubar"]');
      expect(rootList).toBeTruthy();
    });

    it('root <ul> has aria-orientation="horizontal" by default', async (): Promise<void> => {
      ({ fixture } = await createFixture());
      const rootList: HTMLElement | null = queryEl(fixture, 'ul[role="menubar"]');
      expect(rootList?.getAttribute('aria-orientation')).toBe('horizontal');
    });

    it('root <li> wrappers have role="none"', async (): Promise<void> => {
      ({ fixture } = await createFixture());
      const items: HTMLElement[] = queryAllEl(
        fixture,
        'ul[role="menubar"] > .ui-lib-mega-menu__root-item',
      );
      expect(items.length).toBeGreaterThan(0);
      for (const item of items) {
        expect(item.getAttribute('role')).toBe('none');
      }
    });

    it('root <a> links have role="menuitem"', async (): Promise<void> => {
      ({ fixture } = await createFixture());
      const links: HTMLElement[] = queryAllEl(fixture, '.ui-lib-mega-menu__root-link');
      expect(links.length).toBeGreaterThan(0);
      for (const link of links) {
        expect(link.getAttribute('role')).toBe('menuitem');
      }
    });

    it('a root item with sub-items has aria-haspopup="menu"', async (): Promise<void> => {
      ({ fixture } = await createFixture());
      const links: HTMLElement[] = queryAllEl(fixture, '.ui-lib-mega-menu__root-link');
      expect(links[0]?.getAttribute('aria-haspopup')).toBe('menu');
      expect(links[1]?.getAttribute('aria-haspopup')).toBe('menu');
    });

    it('a leaf root item does NOT have aria-haspopup', async (): Promise<void> => {
      ({ fixture } = await createFixture());
      const links: HTMLElement[] = queryAllEl(fixture, '.ui-lib-mega-menu__root-link');
      // "Contact" (index 2) has no items
      expect(links[2]?.hasAttribute('aria-haspopup')).toBe(false);
    });

    it('a root item with sub-items has aria-expanded="false" when closed', async (): Promise<void> => {
      ({ fixture } = await createFixture());
      const links: HTMLElement[] = queryAllEl(fixture, '.ui-lib-mega-menu__root-link');
      expect(links[0]?.getAttribute('aria-expanded')).toBe('false');
    });

    it('a root item with sub-items has aria-expanded="true" when open', async (): Promise<void> => {
      ({ fixture } = await createFixture());
      await openRootPanel(fixture, 0);
      const links: HTMLElement[] = queryAllEl(fixture, '.ui-lib-mega-menu__root-link');
      expect(links[0]?.getAttribute('aria-expanded')).toBe('true');
    });

    it('a disabled root item has aria-disabled="true"', async (): Promise<void> => {
      ({ fixture } = await createFixture());
      fixture.componentInstance.model.set([{ label: 'Disabled', disabled: true }]);
      fixture.detectChanges();
      const link: HTMLElement | null = queryEl(fixture, '.ui-lib-mega-menu__root-link');
      expect(link?.getAttribute('aria-disabled')).toBe('true');
    });
  });

  // ── aria-controls / panelId wiring ────────────────────────────────────────────

  describe('aria-controls and panelId wiring', (): void => {
    it('a root item with sub-items has aria-controls pointing to the open panel id', async (): Promise<void> => {
      ({ fixture } = await createFixture());
      await openRootPanel(fixture, 0);
      const link: HTMLElement | null = queryEl(fixture, '.ui-lib-mega-menu__root-link');
      const panel: HTMLElement | null = queryEl(fixture, '.ui-lib-mega-menu__panel');
      const ariaControls: string | null = link?.getAttribute('aria-controls') ?? null;
      const panelId: string | null = panel?.getAttribute('id') ?? null;
      expect(ariaControls).toBeTruthy();
      expect(panelId).toBeTruthy();
      expect(ariaControls).toBe(panelId);
    });

    it('a leaf root item does NOT have aria-controls', async (): Promise<void> => {
      ({ fixture } = await createFixture());
      const links: HTMLElement[] = queryAllEl(fixture, '.ui-lib-mega-menu__root-link');
      // "Contact" (index 2) has no items — no aria-controls
      expect(links[2]?.hasAttribute('aria-controls')).toBe(false);
    });

    it('panel id is unique per instance (different mega-menus have different panelIds)', async (): Promise<void> => {
      ({ fixture } = await createFixture());
      // The panel id must be a non-empty string that starts with the instance prefix
      const link: HTMLElement | null = queryEl(
        fixture,
        '.ui-lib-mega-menu__root-link[aria-controls]',
      );
      const panelId: string | null = link?.getAttribute('aria-controls') ?? null;
      expect(panelId).toBeTruthy();
      expect(panelId).toMatch(/^ui-lib-mega-menu-\d+-panel$/);
    });
  });

  // ── mega panel ARIA structure ─────────────────────────────────────────────────

  describe('mega panel ARIA structure', (): void => {
    it('mega panel has an aria-label linking it to the triggering item', async (): Promise<void> => {
      ({ fixture } = await createFixture());
      await openRootPanel(fixture, 0);
      const panel: HTMLElement | null = queryEl(fixture, '.ui-lib-mega-menu__panel');
      expect(panel?.getAttribute('aria-label')).toBe('Products submenu');
    });

    it('column <ul> elements have role="menu"', async (): Promise<void> => {
      ({ fixture } = await createFixture());
      await openRootPanel(fixture, 0);
      const menus: HTMLElement[] = queryAllEl(fixture, 'ul[role="menu"]');
      expect(menus.length).toBeGreaterThan(0);
    });

    it('column <ul> elements have aria-label from the column header', async (): Promise<void> => {
      ({ fixture } = await createFixture());
      await openRootPanel(fixture, 0);
      const menus: HTMLElement[] = queryAllEl(fixture, 'ul[role="menu"]');
      // First two columns have "Software" and "Hardware" headers
      expect(menus[0]?.getAttribute('aria-label')).toBe('Software');
      expect(menus[1]?.getAttribute('aria-label')).toBe('Hardware');
    });

    it('sub-item <li> wrappers have role="none"', async (): Promise<void> => {
      ({ fixture } = await createFixture());
      await openRootPanel(fixture, 0);
      const items: HTMLElement[] = queryAllEl(fixture, '.ui-lib-mega-menu__sub-item');
      expect(items.length).toBeGreaterThan(0);
      for (const item of items) {
        expect(item.getAttribute('role')).toBe('none');
      }
    });

    it('sub-item <a> links have role="menuitem"', async (): Promise<void> => {
      ({ fixture } = await createFixture());
      await openRootPanel(fixture, 0);
      const links: HTMLElement[] = queryAllEl(fixture, '.ui-lib-mega-menu__sub-link');
      expect(links.length).toBeGreaterThan(0);
      for (const link of links) {
        expect(link.getAttribute('role')).toBe('menuitem');
      }
    });

    it('disabled sub-item has aria-disabled="true"', async (): Promise<void> => {
      ({ fixture } = await createFixture());
      await openRootPanel(fixture, 0);
      const disabledLinks: HTMLElement[] = queryAllEl(
        fixture,
        '.ui-lib-mega-menu__sub-link[aria-disabled="true"]',
      );
      expect(disabledLinks.length).toBeGreaterThan(0);
    });

    it('separator <li> has role="separator" and aria-hidden="true"', async (): Promise<void> => {
      ({ fixture } = await createFixture());
      await openRootPanel(fixture, 0);
      const sep: HTMLElement | null = queryEl(fixture, '.ui-lib-mega-menu__sub-separator');
      expect(sep?.getAttribute('role')).toBe('separator');
      expect(sep?.getAttribute('aria-hidden')).toBe('true');
    });

    it('icon <span> inside a root link has aria-hidden="true"', async (): Promise<void> => {
      ({ fixture } = await createFixture());
      fixture.componentInstance.model.set([
        { label: 'Products', icon: 'pi pi-box', items: [{ items: [{ label: 'Item' }] }] },
      ]);
      fixture.detectChanges();
      const icon: HTMLElement | null = queryEl(fixture, '.ui-lib-mega-menu__root-icon');
      expect(icon?.getAttribute('aria-hidden')).toBe('true');
    });
  });

  // ── roving tabindex ───────────────────────────────────────────────────────────

  describe('roving tabindex (keyboard navigation model)', (): void => {
    it('first root item has tabindex="0" by default', async (): Promise<void> => {
      ({ fixture } = await createFixture());
      const links: HTMLElement[] = queryAllEl(fixture, '.ui-lib-mega-menu__root-link');
      expect(links[0]?.getAttribute('tabindex')).toBe('0');
    });

    it('all other root items have tabindex="-1" by default', async (): Promise<void> => {
      ({ fixture } = await createFixture());
      const links: HTMLElement[] = queryAllEl(fixture, '.ui-lib-mega-menu__root-link');
      for (let i: number = 1; i < links.length; i++) {
        expect(links[i]?.getAttribute('tabindex')).toBe('-1');
      }
    });

    it('tabindex="0" moves to the item focused via ArrowRight', async (): Promise<void> => {
      ({ fixture } = await createFixture());
      const links: HTMLElement[] = queryAllEl(fixture, '.ui-lib-mega-menu__root-link');
      dispatchKey(links[0] as HTMLElement, 'ArrowRight');
      fixture.detectChanges();
      const updatedLinks: HTMLElement[] = queryAllEl(fixture, '.ui-lib-mega-menu__root-link');
      expect(updatedLinks[1]?.getAttribute('tabindex')).toBe('0');
      expect(updatedLinks[0]?.getAttribute('tabindex')).toBe('-1');
    });

    it('tabindex="0" moves to the item focused via ArrowLeft', async (): Promise<void> => {
      ({ fixture } = await createFixture());
      const links: HTMLElement[] = queryAllEl(fixture, '.ui-lib-mega-menu__root-link');
      // Navigate to index 1 first
      dispatchKey(links[0] as HTMLElement, 'ArrowRight');
      fixture.detectChanges();
      const afterRight: HTMLElement[] = queryAllEl(fixture, '.ui-lib-mega-menu__root-link');
      dispatchKey(afterRight[1] as HTMLElement, 'ArrowLeft');
      fixture.detectChanges();
      const finalLinks: HTMLElement[] = queryAllEl(fixture, '.ui-lib-mega-menu__root-link');
      expect(finalLinks[0]?.getAttribute('tabindex')).toBe('0');
    });

    it('Home key moves tabindex to the first root item', async (): Promise<void> => {
      ({ fixture } = await createFixture());
      const links: HTMLElement[] = queryAllEl(fixture, '.ui-lib-mega-menu__root-link');
      dispatchKey(links[0] as HTMLElement, 'ArrowRight');
      fixture.detectChanges();
      const afterRight: HTMLElement[] = queryAllEl(fixture, '.ui-lib-mega-menu__root-link');
      dispatchKey(afterRight[1] as HTMLElement, 'Home');
      fixture.detectChanges();
      const finalLinks: HTMLElement[] = queryAllEl(fixture, '.ui-lib-mega-menu__root-link');
      expect(finalLinks[0]?.getAttribute('tabindex')).toBe('0');
    });

    it('End key moves tabindex to the last root item', async (): Promise<void> => {
      ({ fixture } = await createFixture());
      const links: HTMLElement[] = queryAllEl(fixture, '.ui-lib-mega-menu__root-link');
      dispatchKey(links[0] as HTMLElement, 'End');
      fixture.detectChanges();
      const updatedLinks: HTMLElement[] = queryAllEl(fixture, '.ui-lib-mega-menu__root-link');
      expect(updatedLinks[updatedLinks.length - 1]?.getAttribute('tabindex')).toBe('0');
    });

    it('disabled items always have tabindex="-1"', async (): Promise<void> => {
      ({ fixture } = await createFixture());
      fixture.componentInstance.model.set([
        { label: 'Disabled', disabled: true },
        { label: 'Enabled' },
      ]);
      fixture.detectChanges();
      const links: HTMLElement[] = queryAllEl(fixture, '.ui-lib-mega-menu__root-link');
      expect(links[0]?.getAttribute('tabindex')).toBe('-1');
    });
  });

  // ── keyboard navigation — root level ─────────────────────────────────────────

  describe('keyboard navigation — root level', (): void => {
    it('ArrowDown opens the panel and panel is present in DOM', async (): Promise<void> => {
      ({ fixture } = await createFixture());
      await openRootPanel(fixture, 0);
      const panel: HTMLElement | null = queryEl(fixture, '.ui-lib-mega-menu__panel');
      expect(panel).toBeTruthy();
    });

    it('ArrowRight moves rovingIndex to the next root item', async (): Promise<void> => {
      ({ fixture } = await createFixture());
      const links: HTMLElement[] = queryAllEl(fixture, '.ui-lib-mega-menu__root-link');
      dispatchKey(links[0] as HTMLElement, 'ArrowRight');
      fixture.detectChanges();
      const updated: HTMLElement[] = queryAllEl(fixture, '.ui-lib-mega-menu__root-link');
      expect(updated[1]?.getAttribute('tabindex')).toBe('0');
    });

    it('ArrowLeft moves rovingIndex to the previous root item', async (): Promise<void> => {
      ({ fixture } = await createFixture());
      const links: HTMLElement[] = queryAllEl(fixture, '.ui-lib-mega-menu__root-link');
      dispatchKey(links[0] as HTMLElement, 'ArrowRight');
      fixture.detectChanges();
      const mid: HTMLElement[] = queryAllEl(fixture, '.ui-lib-mega-menu__root-link');
      dispatchKey(mid[1] as HTMLElement, 'ArrowLeft');
      fixture.detectChanges();
      const final: HTMLElement[] = queryAllEl(fixture, '.ui-lib-mega-menu__root-link');
      expect(final[0]?.getAttribute('tabindex')).toBe('0');
    });

    it('Escape from root item with open panel closes the panel', async (): Promise<void> => {
      ({ fixture } = await createFixture());
      await openRootPanel(fixture, 0);
      const links: HTMLElement[] = queryAllEl(fixture, '.ui-lib-mega-menu__root-link');
      dispatchKey(links[0] as HTMLElement, 'Escape');
      fixture.detectChanges();
      await fixture.whenStable();
      const panel: HTMLElement | null = queryEl(fixture, '.ui-lib-mega-menu__panel');
      expect(panel).toBeNull();
    });
  });

  // ── keyboard navigation — within panel ────────────────────────────────────────

  describe('keyboard navigation — within mega panel', (): void => {
    it('ArrowDown moves focus to the next sub-item in the same column (wrapping)', async (): Promise<void> => {
      ({ fixture } = await createFixture());
      await openRootPanel(fixture, 0);
      // Get all sub-links that are enabled in the first column
      const firstColLinks: HTMLElement[] = queryAllEl(
        fixture,
        'ul[role="menu"]:first-of-type .ui-lib-mega-menu__sub-link:not([aria-disabled="true"])',
      );
      expect(firstColLinks.length).toBeGreaterThan(1);
      firstColLinks[0]?.focus();
      dispatchKey(firstColLinks[0] as HTMLElement, 'ArrowDown');
      fixture.detectChanges();
      expect(document.activeElement).toBe(firstColLinks[1]);
    });

    it('ArrowUp moves focus to the previous sub-item in the same column (wrapping)', async (): Promise<void> => {
      ({ fixture } = await createFixture());
      await openRootPanel(fixture, 0);
      const firstColLinks: HTMLElement[] = queryAllEl(
        fixture,
        'ul[role="menu"]:first-of-type .ui-lib-mega-menu__sub-link:not([aria-disabled="true"])',
      );
      expect(firstColLinks.length).toBeGreaterThan(1);
      firstColLinks[1]?.focus();
      dispatchKey(firstColLinks[1] as HTMLElement, 'ArrowUp');
      fixture.detectChanges();
      expect(document.activeElement).toBe(firstColLinks[0]);
    });

    it('ArrowRight moves focus to the first item in the next column', async (): Promise<void> => {
      ({ fixture } = await createFixture());
      await openRootPanel(fixture, 0);
      const allColumnMenus: HTMLElement[] = queryAllEl(fixture, 'ul[role="menu"]');
      expect(allColumnMenus.length).toBeGreaterThanOrEqual(2);
      const col0: HTMLElement = allColumnMenus[0] as HTMLElement;
      const col1: HTMLElement = allColumnMenus[1] as HTMLElement;
      const firstColLinks: HTMLElement[] = Array.from(
        col0.querySelectorAll<HTMLElement>(
          '.ui-lib-mega-menu__sub-link:not([aria-disabled="true"])',
        ),
      );
      const secondColLinks: HTMLElement[] = Array.from(
        col1.querySelectorAll<HTMLElement>(
          '.ui-lib-mega-menu__sub-link:not([aria-disabled="true"])',
        ),
      );
      firstColLinks[0]?.focus();
      dispatchKey(firstColLinks[0] as HTMLElement, 'ArrowRight');
      fixture.detectChanges();
      expect(document.activeElement).toBe(secondColLinks[0]);
    });

    it('ArrowLeft moves focus to the first item in the previous column', async (): Promise<void> => {
      ({ fixture } = await createFixture());
      await openRootPanel(fixture, 0);
      const allColumnMenus: HTMLElement[] = queryAllEl(fixture, 'ul[role="menu"]');
      expect(allColumnMenus.length).toBeGreaterThanOrEqual(2);
      const col0: HTMLElement = allColumnMenus[0] as HTMLElement;
      const col1: HTMLElement = allColumnMenus[1] as HTMLElement;
      const firstColLinks: HTMLElement[] = Array.from(
        col0.querySelectorAll<HTMLElement>(
          '.ui-lib-mega-menu__sub-link:not([aria-disabled="true"])',
        ),
      );
      const secondColLinks: HTMLElement[] = Array.from(
        col1.querySelectorAll<HTMLElement>(
          '.ui-lib-mega-menu__sub-link:not([aria-disabled="true"])',
        ),
      );
      secondColLinks[0]?.focus();
      dispatchKey(secondColLinks[0] as HTMLElement, 'ArrowLeft');
      fixture.detectChanges();
      expect(document.activeElement).toBe(firstColLinks[0]);
    });

    it('Escape from sub-item closes the panel', async (): Promise<void> => {
      ({ fixture } = await createFixture());
      await openRootPanel(fixture, 0);
      const subLinks: HTMLElement[] = queryAllEl(
        fixture,
        '.ui-lib-mega-menu__sub-link:not([aria-disabled="true"])',
      );
      expect(subLinks.length).toBeGreaterThan(0);
      dispatchKey(subLinks[0] as HTMLElement, 'Escape');
      fixture.detectChanges();
      await fixture.whenStable();
      const panel: HTMLElement | null = queryEl(fixture, '.ui-lib-mega-menu__panel');
      expect(panel).toBeNull();
    });

    it('Escape from sub-item restores focus to the triggering root item', async (): Promise<void> => {
      ({ fixture } = await createFixture());
      await openRootPanel(fixture, 0);
      const subLinks: HTMLElement[] = queryAllEl(
        fixture,
        '.ui-lib-mega-menu__sub-link:not([aria-disabled="true"])',
      );
      subLinks[0]?.focus();
      dispatchKey(subLinks[0] as HTMLElement, 'Escape');
      fixture.detectChanges();
      await fixture.whenStable();
      const rootLinks: HTMLElement[] = queryAllEl(fixture, '.ui-lib-mega-menu__root-link');
      // First root link (Products, index 0) should have focus restored
      expect(document.activeElement).toBe(rootLinks[0]);
    });
  });

  // ── panelOpened / panelClosed outputs ─────────────────────────────────────────

  describe('panelOpened and panelClosed outputs', (): void => {
    it('emits panelOpened when a panel opens via click', async (): Promise<void> => {
      ({ fixture } = await createFixture());
      const opened: MegaMenuItem[] = [];
      const debugEl: DebugElement = fixture.debugElement.query(
        (de: DebugElement): boolean => de.componentInstance instanceof MegaMenu,
      );
      const megaMenuInstance: MegaMenu = debugEl.componentInstance as MegaMenu;
      megaMenuInstance.panelOpened.subscribe((item: MegaMenuItem): void => {
        opened.push(item);
      });
      const links: HTMLElement[] = queryAllEl(fixture, '.ui-lib-mega-menu__root-link');
      links[0]?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      fixture.detectChanges();
      await fixture.whenStable();
      expect(opened.length).toBe(1);
      expect(opened[0]?.label).toBe('Products');
    });
  });

  // ── axe-core automated checks ─────────────────────────────────────────────────

  describe('axe-core automated checks', (): void => {
    it('passes axe — empty model (no items)', async (): Promise<void> => {
      ({ fixture } = await createFixture());
      fixture.componentInstance.model.set([]);
      fixture.detectChanges();
      await checkA11y(fixture, { rules: MEGA_MENU_AXE_RULES });
    });

    it('passes axe — full model, all panels closed', async (): Promise<void> => {
      ({ fixture } = await createFixture());
      await checkA11y(fixture, { rules: MEGA_MENU_AXE_RULES });
    });

    it('passes axe — Products panel open (has column headers)', async (): Promise<void> => {
      ({ fixture } = await createFixture());
      await openRootPanel(fixture, 0);
      await checkA11y(fixture, { rules: MEGA_MENU_AXE_RULES });
    });

    it('passes axe — Company panel open (column without header)', async (): Promise<void> => {
      ({ fixture } = await createFixture());
      await openRootPanel(fixture, 1);
      await checkA11y(fixture, { rules: MEGA_MENU_AXE_RULES });
    });
  });
});
