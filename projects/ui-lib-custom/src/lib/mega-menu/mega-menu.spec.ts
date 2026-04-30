import {
  ChangeDetectionStrategy,
  Component,
  signal,
  type DebugElement,
  type WritableSignal,
} from '@angular/core';
import { TestBed, type ComponentFixture } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { MegaMenu, MEGA_MENU_DEFAULT_ARIA_LABEL } from './mega-menu';
import type {
  MegaMenuCommandEvent,
  MegaMenuItem,
  MegaMenuOrientation,
  MegaMenuSize,
  MegaMenuVariant,
} from './mega-menu.types';

// ── Helpers ────────────────────────────────────────────────────────────────────

function getHost(fixture: ComponentFixture<unknown>): HTMLElement {
  return (fixture.nativeElement as HTMLElement).querySelector('ui-lib-mega-menu') as HTMLElement;
}

function getInstance(fixture: ComponentFixture<unknown>): MegaMenu {
  return fixture.debugElement.query(
    (debugEl: DebugElement): boolean => debugEl.componentInstance instanceof MegaMenu
  ).componentInstance as MegaMenu;
}

function getRootLinks(fixture: ComponentFixture<unknown>): HTMLElement[] {
  return Array.from(
    (fixture.nativeElement as HTMLElement).querySelectorAll<HTMLElement>(
      '.ui-lib-mega-menu__root-link'
    )
  );
}

function getPanel(fixture: ComponentFixture<unknown>): HTMLElement | null {
  return (fixture.nativeElement as HTMLElement).querySelector('.ui-lib-mega-menu__panel');
}

function getSubLinks(fixture: ComponentFixture<unknown>): HTMLElement[] {
  return Array.from(
    (fixture.nativeElement as HTMLElement).querySelectorAll<HTMLElement>(
      '.ui-lib-mega-menu__sub-link'
    )
  );
}

function makeFakeClickEvent(): MouseEvent {
  return new MouseEvent('click', { bubbles: true });
}

// ── Fixtures ───────────────────────────────────────────────────────────────────

const SAMPLE_MODEL: MegaMenuItem[] = [
  {
    label: 'Products',
    icon: 'pi pi-box',
    items: [
      {
        header: 'Software',
        items: [
          { label: 'Editor', icon: 'pi pi-pencil' },
          { label: 'Dashboard', icon: 'pi pi-chart-bar' },
          { label: 'Analytics', disabled: true },
        ],
      },
      {
        header: 'Hardware',
        items: [
          { label: 'Server', icon: 'pi pi-server' },
          { separator: true },
          { label: 'Storage', icon: 'pi pi-database' },
        ],
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
  {
    label: 'Contact',
    url: 'https://example.com/contact',
  },
  {
    label: 'Hidden',
    visible: false,
  },
];

// ── Host component ─────────────────────────────────────────────────────────────

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [MegaMenu],
  template: `
    <ui-lib-mega-menu
      [model]="model()"
      [orientation]="orientation()"
      [variant]="variant()"
      [size]="size()"
      [styleClass]="styleClass()"
      [ariaLabel]="ariaLabel()"
      (itemClick)="handleItemClick($event)"
    />
  `,
})
class HostComponent {
  public readonly model: WritableSignal<MegaMenuItem[]> = signal<MegaMenuItem[]>(SAMPLE_MODEL);
  public readonly orientation: WritableSignal<MegaMenuOrientation> =
    signal<MegaMenuOrientation>('horizontal');
  public readonly variant: WritableSignal<MegaMenuVariant> = signal<MegaMenuVariant>('material');
  public readonly size: WritableSignal<MegaMenuSize> = signal<MegaMenuSize>('md');
  public readonly styleClass: WritableSignal<string | null> = signal<string | null>(null);
  public readonly ariaLabel: WritableSignal<string> = signal<string>(MEGA_MENU_DEFAULT_ARIA_LABEL);

  public lastClickedItem: MegaMenuCommandEvent | null = null;

  public handleItemClick(event: MegaMenuCommandEvent): void {
    this.lastClickedItem = event;
  }
}

// ── Setup ──────────────────────────────────────────────────────────────────────

function createFixture(): ComponentFixture<HostComponent> {
  TestBed.configureTestingModule({
    imports: [HostComponent],
    providers: [provideZonelessChangeDetection()],
  });
  const fixture: ComponentFixture<HostComponent> = TestBed.createComponent(HostComponent);
  fixture.detectChanges();
  return fixture;
}

// ── Tests ──────────────────────────────────────────────────────────────────────

describe('MegaMenu', (): void => {
  // ── Rendering ────────────────────────────────────────────────────────────

  describe('rendering', (): void => {
    it('should create the component', (): void => {
      const fixture: ComponentFixture<HostComponent> = createFixture();
      const host: HTMLElement = getHost(fixture);
      expect(host).toBeTruthy();
    });

    it('should apply base host class', (): void => {
      const fixture: ComponentFixture<HostComponent> = createFixture();
      const host: HTMLElement = getHost(fixture);
      expect(host.className).toContain('ui-lib-mega-menu');
    });

    it('should render a <nav> element with aria-label', (): void => {
      const fixture: ComponentFixture<HostComponent> = createFixture();
      const nav: HTMLElement | null = (
        fixture.nativeElement as HTMLElement
      ).querySelector<HTMLElement>('nav');
      expect(nav).toBeTruthy();
      expect(nav?.getAttribute('aria-label')).toBe(MEGA_MENU_DEFAULT_ARIA_LABEL);
    });

    it('should render visible top-level items only (hidden item excluded)', (): void => {
      const fixture: ComponentFixture<HostComponent> = createFixture();
      const links: HTMLElement[] = getRootLinks(fixture);
      // SAMPLE_MODEL has 4 items, 1 is visible: false → 3 rendered
      expect(links.length).toBe(3);
    });

    it('should render the root item label', (): void => {
      const fixture: ComponentFixture<HostComponent> = createFixture();
      const links: HTMLElement[] = getRootLinks(fixture);
      const firstLabel: HTMLElement | null =
        links[0]?.querySelector<HTMLElement>('.ui-lib-mega-menu__root-label') ?? null;
      expect(firstLabel ? firstLabel.textContent.trim() : null).toBe('Products');
    });

    it('should render a caret for items with sub-panels', (): void => {
      const fixture: ComponentFixture<HostComponent> = createFixture();
      const links: HTMLElement[] = getRootLinks(fixture);
      const firstCaret: HTMLElement | null =
        links[0]?.querySelector<HTMLElement>('.ui-lib-mega-menu__root-caret') ?? null;
      expect(firstCaret).toBeTruthy();
    });

    it('should NOT render a caret for simple link items', (): void => {
      const fixture: ComponentFixture<HostComponent> = createFixture();
      const links: HTMLElement[] = getRootLinks(fixture);
      const contactLink: HTMLElement | undefined = links[2];
      const caret: HTMLElement | null =
        contactLink?.querySelector<HTMLElement>('.ui-lib-mega-menu__root-caret') ?? null;
      expect(caret).toBeNull();
    });

    it('should not render any panel initially', (): void => {
      const fixture: ComponentFixture<HostComponent> = createFixture();
      const panel: HTMLElement | null = getPanel(fixture);
      expect(panel).toBeNull();
    });
  });

  // ── Host classes ─────────────────────────────────────────────────────────

  describe('host classes', (): void => {
    it('should apply variant class', (): void => {
      const fixture: ComponentFixture<HostComponent> = createFixture();
      const host: HTMLElement = getHost(fixture);
      expect(host.className).toContain('ui-lib-mega-menu--variant-material');
    });

    it('should apply size class', (): void => {
      const fixture: ComponentFixture<HostComponent> = createFixture();
      const host: HTMLElement = getHost(fixture);
      expect(host.className).toContain('ui-lib-mega-menu--size-md');
    });

    it('should apply orientation class', (): void => {
      const fixture: ComponentFixture<HostComponent> = createFixture();
      const host: HTMLElement = getHost(fixture);
      expect(host.className).toContain('ui-lib-mega-menu--horizontal');
    });

    it('should apply vertical orientation class', (): void => {
      const fixture: ComponentFixture<HostComponent> = createFixture();
      fixture.componentInstance.orientation.set('vertical');
      fixture.detectChanges();
      const host: HTMLElement = getHost(fixture);
      expect(host.className).toContain('ui-lib-mega-menu--vertical');
    });

    it('should apply styleClass to host', (): void => {
      const fixture: ComponentFixture<HostComponent> = createFixture();
      fixture.componentInstance.styleClass.set('my-custom-menu');
      fixture.detectChanges();
      const host: HTMLElement = getHost(fixture);
      expect(host.className).toContain('my-custom-menu');
    });

    it('should apply bootstrap variant class', (): void => {
      const fixture: ComponentFixture<HostComponent> = createFixture();
      fixture.componentInstance.variant.set('bootstrap');
      fixture.detectChanges();
      const host: HTMLElement = getHost(fixture);
      expect(host.className).toContain('ui-lib-mega-menu--variant-bootstrap');
    });

    it('should apply minimal variant class', (): void => {
      const fixture: ComponentFixture<HostComponent> = createFixture();
      fixture.componentInstance.variant.set('minimal');
      fixture.detectChanges();
      const host: HTMLElement = getHost(fixture);
      expect(host.className).toContain('ui-lib-mega-menu--variant-minimal');
    });

    it('should apply sm size class', (): void => {
      const fixture: ComponentFixture<HostComponent> = createFixture();
      fixture.componentInstance.size.set('sm');
      fixture.detectChanges();
      const host: HTMLElement = getHost(fixture);
      expect(host.className).toContain('ui-lib-mega-menu--size-sm');
    });

    it('should apply lg size class', (): void => {
      const fixture: ComponentFixture<HostComponent> = createFixture();
      fixture.componentInstance.size.set('lg');
      fixture.detectChanges();
      const host: HTMLElement = getHost(fixture);
      expect(host.className).toContain('ui-lib-mega-menu--size-lg');
    });
  });

  // ── Panel open/close ──────────────────────────────────────────────────────

  describe('panel open/close', (): void => {
    it('should open the panel when a top-level item with items is clicked', (): void => {
      const fixture: ComponentFixture<HostComponent> = createFixture();
      const links: HTMLElement[] = getRootLinks(fixture);
      links[0]?.dispatchEvent(makeFakeClickEvent());
      fixture.detectChanges();
      const panel: HTMLElement | null = getPanel(fixture);
      expect(panel).toBeTruthy();
    });

    it('should close the panel when the same item is clicked again', (): void => {
      const fixture: ComponentFixture<HostComponent> = createFixture();
      const links: HTMLElement[] = getRootLinks(fixture);
      links[0]?.dispatchEvent(makeFakeClickEvent());
      fixture.detectChanges();
      links[0]?.dispatchEvent(makeFakeClickEvent());
      fixture.detectChanges();
      const panel: HTMLElement | null = getPanel(fixture);
      expect(panel).toBeNull();
    });

    it('should switch to a different top-level item panel', (): void => {
      const fixture: ComponentFixture<HostComponent> = createFixture();
      const links: HTMLElement[] = getRootLinks(fixture);
      links[0]?.dispatchEvent(makeFakeClickEvent());
      fixture.detectChanges();
      links[1]?.dispatchEvent(makeFakeClickEvent());
      fixture.detectChanges();
      const instance: MegaMenu = getInstance(fixture);
      expect(instance.activeIndex()).toBe(1);
    });

    it('should render sub-items inside the open panel', (): void => {
      const fixture: ComponentFixture<HostComponent> = createFixture();
      const links: HTMLElement[] = getRootLinks(fixture);
      links[0]?.dispatchEvent(makeFakeClickEvent());
      fixture.detectChanges();
      const subLinks: HTMLElement[] = getSubLinks(fixture);
      expect(subLinks.length).toBeGreaterThan(0);
    });

    it('should render column headers inside the panel', (): void => {
      const fixture: ComponentFixture<HostComponent> = createFixture();
      const links: HTMLElement[] = getRootLinks(fixture);
      links[0]?.dispatchEvent(makeFakeClickEvent());
      fixture.detectChanges();
      const headers: NodeListOf<HTMLElement> = (
        fixture.nativeElement as HTMLElement
      ).querySelectorAll<HTMLElement>('.ui-lib-mega-menu__column-header');
      expect(headers.length).toBe(2);
      expect((headers[0] as HTMLElement).textContent.trim()).toBe('Software');
      expect((headers[1] as HTMLElement).textContent.trim()).toBe('Hardware');
    });

    it('should mark the active root item', (): void => {
      const fixture: ComponentFixture<HostComponent> = createFixture();
      const links: HTMLElement[] = getRootLinks(fixture);
      links[0]?.dispatchEvent(makeFakeClickEvent());
      fixture.detectChanges();
      const rootItem: HTMLElement | null =
        links[0]?.closest<HTMLElement>('.ui-lib-mega-menu__root-item') ?? null;
      expect(rootItem?.classList.contains('ui-lib-mega-menu__root-item--active')).toBe(true);
    });
  });

  // ── Sub-item interaction ──────────────────────────────────────────────────

  describe('sub-item interaction', (): void => {
    it('should emit itemClick when a sub-item is activated', (): void => {
      const fixture: ComponentFixture<HostComponent> = createFixture();
      const host: HostComponent = fixture.componentInstance;
      const links: HTMLElement[] = getRootLinks(fixture);
      links[0]?.dispatchEvent(makeFakeClickEvent());
      fixture.detectChanges();

      const subLinks: HTMLElement[] = getSubLinks(fixture);
      subLinks[0]?.dispatchEvent(makeFakeClickEvent());
      fixture.detectChanges();

      expect(host.lastClickedItem).not.toBeNull();
      expect(host.lastClickedItem?.item.label).toBe('Editor');
    });

    it('should close the panel after a sub-item is clicked', (): void => {
      const fixture: ComponentFixture<HostComponent> = createFixture();
      const links: HTMLElement[] = getRootLinks(fixture);
      links[0]?.dispatchEvent(makeFakeClickEvent());
      fixture.detectChanges();

      const subLinks: HTMLElement[] = getSubLinks(fixture);
      subLinks[0]?.dispatchEvent(makeFakeClickEvent());
      fixture.detectChanges();

      expect(getPanel(fixture)).toBeNull();
    });

    it('should not emit itemClick for disabled sub-items', (): void => {
      const fixture: ComponentFixture<HostComponent> = createFixture();
      const host: HostComponent = fixture.componentInstance;
      const links: HTMLElement[] = getRootLinks(fixture);
      links[0]?.dispatchEvent(makeFakeClickEvent());
      fixture.detectChanges();

      const disabledLinks: NodeListOf<HTMLElement> = (
        fixture.nativeElement as HTMLElement
      ).querySelectorAll<HTMLElement>('.ui-lib-mega-menu__sub-link[aria-disabled="true"]');
      disabledLinks[0]?.dispatchEvent(makeFakeClickEvent());
      fixture.detectChanges();

      expect(host.lastClickedItem).toBeNull();
    });

    it('should invoke command callback when a sub-item with command is activated', (): void => {
      const fixture: ComponentFixture<HostComponent> = createFixture();
      let commandFired: boolean = false;
      const model: MegaMenuItem[] = [
        {
          label: 'Actions',
          items: [
            {
              items: [
                {
                  label: 'Action Item',
                  command: (): void => {
                    commandFired = true;
                  },
                },
              ],
            },
          ],
        },
      ];
      fixture.componentInstance.model.set(model);
      fixture.detectChanges();

      const links: HTMLElement[] = getRootLinks(fixture);
      links[0]?.dispatchEvent(makeFakeClickEvent());
      fixture.detectChanges();

      const subLinks: HTMLElement[] = getSubLinks(fixture);
      subLinks[0]?.dispatchEvent(makeFakeClickEvent());
      fixture.detectChanges();

      expect(commandFired).toBe(true);
    });
  });

  // ── ARIA / accessibility ──────────────────────────────────────────────────

  describe('accessibility', (): void => {
    it('should have role="menubar" on the root list', (): void => {
      const fixture: ComponentFixture<HostComponent> = createFixture();
      const rootList: HTMLElement | null = (
        fixture.nativeElement as HTMLElement
      ).querySelector<HTMLElement>('.ui-lib-mega-menu__root-list');
      expect(rootList?.getAttribute('role')).toBe('menubar');
    });

    it('should have role="menuitem" on top-level links', (): void => {
      const fixture: ComponentFixture<HostComponent> = createFixture();
      const links: HTMLElement[] = getRootLinks(fixture);
      expect(links[0]?.getAttribute('role')).toBe('menuitem');
    });

    it('should set aria-haspopup on top-level items that have a panel', (): void => {
      const fixture: ComponentFixture<HostComponent> = createFixture();
      const links: HTMLElement[] = getRootLinks(fixture);
      expect(links[0]?.getAttribute('aria-haspopup')).toBe('true');
    });

    it('should set aria-expanded="false" on closed panel items', (): void => {
      const fixture: ComponentFixture<HostComponent> = createFixture();
      const links: HTMLElement[] = getRootLinks(fixture);
      expect(links[0]?.getAttribute('aria-expanded')).toBe('false');
    });

    it('should set aria-expanded="true" on open panel item', (): void => {
      const fixture: ComponentFixture<HostComponent> = createFixture();
      const links: HTMLElement[] = getRootLinks(fixture);
      links[0]?.dispatchEvent(makeFakeClickEvent());
      fixture.detectChanges();
      expect(links[0]?.getAttribute('aria-expanded')).toBe('true');
    });

    it('should not set aria-haspopup on simple items without a panel', (): void => {
      const fixture: ComponentFixture<HostComponent> = createFixture();
      const links: HTMLElement[] = getRootLinks(fixture);
      // "Contact" (index 2) has no items
      expect(links[2]?.getAttribute('aria-haspopup')).toBeNull();
    });

    it('should set aria-disabled="true" on disabled sub-items', (): void => {
      const fixture: ComponentFixture<HostComponent> = createFixture();
      const links: HTMLElement[] = getRootLinks(fixture);
      links[0]?.dispatchEvent(makeFakeClickEvent());
      fixture.detectChanges();
      const disabledLinks: NodeListOf<HTMLElement> = (
        fixture.nativeElement as HTMLElement
      ).querySelectorAll<HTMLElement>('.ui-lib-mega-menu__sub-link[aria-disabled="true"]');
      expect(disabledLinks.length).toBeGreaterThan(0);
    });

    it('should set role="menu" on column lists', (): void => {
      const fixture: ComponentFixture<HostComponent> = createFixture();
      const links: HTMLElement[] = getRootLinks(fixture);
      links[0]?.dispatchEvent(makeFakeClickEvent());
      fixture.detectChanges();
      const columnList: HTMLElement | null = (
        fixture.nativeElement as HTMLElement
      ).querySelector<HTMLElement>('.ui-lib-mega-menu__column-list');
      expect(columnList?.getAttribute('role')).toBe('menu');
    });

    it('should use custom ariaLabel on the nav element', (): void => {
      const fixture: ComponentFixture<HostComponent> = createFixture();
      fixture.componentInstance.ariaLabel.set('Primary Navigation');
      fixture.detectChanges();
      const nav: HTMLElement | null = (
        fixture.nativeElement as HTMLElement
      ).querySelector<HTMLElement>('nav');
      expect(nav?.getAttribute('aria-label')).toBe('Primary Navigation');
    });
  });

  // ── Keyboard navigation ───────────────────────────────────────────────────

  describe('keyboard navigation', (): void => {
    it('should open the panel on Enter key', (): void => {
      const fixture: ComponentFixture<HostComponent> = createFixture();
      const links: HTMLElement[] = getRootLinks(fixture);
      links[0]?.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
      fixture.detectChanges();
      expect(getPanel(fixture)).toBeTruthy();
    });

    it('should open the panel on Space key', (): void => {
      const fixture: ComponentFixture<HostComponent> = createFixture();
      const links: HTMLElement[] = getRootLinks(fixture);
      links[0]?.dispatchEvent(new KeyboardEvent('keydown', { key: ' ', bubbles: true }));
      fixture.detectChanges();
      expect(getPanel(fixture)).toBeTruthy();
    });

    it('should close the panel on Escape key pressed on root item', (): void => {
      const fixture: ComponentFixture<HostComponent> = createFixture();
      const links: HTMLElement[] = getRootLinks(fixture);
      links[0]?.dispatchEvent(makeFakeClickEvent());
      fixture.detectChanges();
      links[0]?.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
      fixture.detectChanges();
      expect(getPanel(fixture)).toBeNull();
    });

    it('should close the panel on Escape key pressed on a sub-item', (): void => {
      const fixture: ComponentFixture<HostComponent> = createFixture();
      const links: HTMLElement[] = getRootLinks(fixture);
      links[0]?.dispatchEvent(makeFakeClickEvent());
      fixture.detectChanges();

      const subLinks: HTMLElement[] = getSubLinks(fixture);
      subLinks[0]?.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
      fixture.detectChanges();

      expect(getPanel(fixture)).toBeNull();
    });

    it('should activate a sub-item on Enter key', (): void => {
      const fixture: ComponentFixture<HostComponent> = createFixture();
      const host: HostComponent = fixture.componentInstance;
      const links: HTMLElement[] = getRootLinks(fixture);
      links[0]?.dispatchEvent(makeFakeClickEvent());
      fixture.detectChanges();

      const subLinks: HTMLElement[] = getSubLinks(fixture);
      subLinks[0]?.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
      fixture.detectChanges();

      expect(host.lastClickedItem).not.toBeNull();
    });
  });

  // ── isPanelOpen helper ────────────────────────────────────────────────────

  describe('isPanelOpen()', (): void => {
    it('should return false for all items initially', (): void => {
      const fixture: ComponentFixture<HostComponent> = createFixture();
      const instance: MegaMenu = getInstance(fixture);
      expect(instance.isPanelOpen(0)).toBe(false);
      expect(instance.isPanelOpen(1)).toBe(false);
    });

    it('should return true for the opened item index', (): void => {
      const fixture: ComponentFixture<HostComponent> = createFixture();
      const links: HTMLElement[] = getRootLinks(fixture);
      links[0]?.dispatchEvent(makeFakeClickEvent());
      fixture.detectChanges();
      const instance: MegaMenu = getInstance(fixture);
      expect(instance.isPanelOpen(0)).toBe(true);
      expect(instance.isPanelOpen(1)).toBe(false);
    });
  });

  // ── getVisibleColumnItems helper ──────────────────────────────────────────

  describe('getVisibleColumnItems()', (): void => {
    it('should filter out items with visible: false', (): void => {
      const fixture: ComponentFixture<HostComponent> = createFixture();
      const instance: MegaMenu = getInstance(fixture);
      const column: Parameters<typeof instance.getVisibleColumnItems>[0] = {
        items: [
          { label: 'Visible Item' },
          { label: 'Hidden Item', visible: false },
          { label: 'Another Visible' },
        ],
      };
      const result: ReturnType<typeof instance.getVisibleColumnItems> =
        instance.getVisibleColumnItems(column);
      expect(result.length).toBe(2);
      expect(result[0]?.label).toBe('Visible Item');
      expect(result[1]?.label).toBe('Another Visible');
    });

    it('should return all items when none are hidden', (): void => {
      const fixture: ComponentFixture<HostComponent> = createFixture();
      const instance: MegaMenu = getInstance(fixture);
      const column: Parameters<typeof instance.getVisibleColumnItems>[0] = {
        items: [{ label: 'A' }, { label: 'B' }, { label: 'C' }],
      };
      const result: ReturnType<typeof instance.getVisibleColumnItems> =
        instance.getVisibleColumnItems(column);
      expect(result.length).toBe(3);
    });
  });

  // ── visibleItems computed ─────────────────────────────────────────────────

  describe('visibleItems()', (): void => {
    it('should exclude top-level items with visible: false', (): void => {
      const fixture: ComponentFixture<HostComponent> = createFixture();
      const instance: MegaMenu = getInstance(fixture);
      // SAMPLE_MODEL has 4 items, 1 is visible: false
      expect(instance.visibleItems().length).toBe(3);
    });
  });

  // ── Separator ─────────────────────────────────────────────────────────────

  describe('separator', (): void => {
    it('should render separator elements inside the panel', (): void => {
      const fixture: ComponentFixture<HostComponent> = createFixture();
      const links: HTMLElement[] = getRootLinks(fixture);
      links[0]?.dispatchEvent(makeFakeClickEvent());
      fixture.detectChanges();
      const separators: NodeListOf<HTMLElement> = (
        fixture.nativeElement as HTMLElement
      ).querySelectorAll<HTMLElement>('.ui-lib-mega-menu__sub-separator');
      expect(separators.length).toBe(1);
    });
  });

  // ── Model update ──────────────────────────────────────────────────────────

  describe('model update', (): void => {
    it('should re-render when model signal changes', (): void => {
      const fixture: ComponentFixture<HostComponent> = createFixture();
      fixture.componentInstance.model.set([{ label: 'New Item' }]);
      fixture.detectChanges();
      const links: HTMLElement[] = getRootLinks(fixture);
      expect(links.length).toBe(1);
      const labelEl: HTMLElement | null = (links[0] as HTMLElement).querySelector<HTMLElement>(
        '.ui-lib-mega-menu__root-label'
      );
      expect((labelEl?.textContent ?? '').trim()).toBe('New Item');
    });
  });

  // ── Orientation ───────────────────────────────────────────────────────────

  describe('orientation', (): void => {
    it('should render in horizontal mode by default', (): void => {
      const fixture: ComponentFixture<HostComponent> = createFixture();
      const host: HTMLElement = getHost(fixture);
      expect(host.className).toContain('ui-lib-mega-menu--horizontal');
    });

    it('should switch to vertical orientation', (): void => {
      const fixture: ComponentFixture<HostComponent> = createFixture();
      fixture.componentInstance.orientation.set('vertical');
      fixture.detectChanges();
      const host: HTMLElement = getHost(fixture);
      expect(host.className).toContain('ui-lib-mega-menu--vertical');
    });
  });

  // ── MEGA_MENU_DEFAULT_ARIA_LABEL export ───────────────────────────────────

  describe('MEGA_MENU_DEFAULT_ARIA_LABEL', (): void => {
    it('should be a non-empty string', (): void => {
      expect(typeof MEGA_MENU_DEFAULT_ARIA_LABEL).toBe('string');
      expect(MEGA_MENU_DEFAULT_ARIA_LABEL.length).toBeGreaterThan(0);
    });
  });
});
