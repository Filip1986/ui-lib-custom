import {
  ChangeDetectionStrategy,
  Component,
  provideZonelessChangeDetection,
  signal,
  viewChild,
  type Signal,
  type WritableSignal,
} from '@angular/core';
import { TestBed, type ComponentFixture } from '@angular/core/testing';
import { TieredMenu, TIERED_MENU_DEFAULT_ARIA_LABEL } from './tiered-menu';
import type { TieredMenuItem, TieredMenuItemCommandEvent } from './tiered-menu.types';

// ── Helper ────────────────────────────────────────────────────────────────────

function queryEl<T extends HTMLElement>(
  fixture: ComponentFixture<unknown>,
  selector: string
): T | null {
  return (fixture.nativeElement as HTMLElement).querySelector<T>(selector);
}

function queryAllEls<T extends HTMLElement>(
  fixture: ComponentFixture<unknown>,
  selector: string
): T[] {
  return Array.from((fixture.nativeElement as HTMLElement).querySelectorAll<T>(selector));
}

// ── Shared items ──────────────────────────────────────────────────────────────

const SIMPLE_ITEMS: TieredMenuItem[] = [
  { label: 'New', icon: 'pi pi-plus' },
  { label: 'Open', icon: 'pi pi-folder-open' },
  { separator: true },
  { label: 'Save', icon: 'pi pi-save' },
  { label: 'Disabled', disabled: true },
];

const NESTED_ITEMS: TieredMenuItem[] = [
  {
    label: 'File',
    items: [
      { label: 'New' },
      { label: 'Open' },
      {
        label: 'Export',
        items: [{ label: 'PDF' }, { label: 'CSV' }],
      },
    ],
  },
  { label: 'Edit' },
];

// ── Inline host ───────────────────────────────────────────────────────────────

@Component({
  selector: 'app-inline-host',
  standalone: true,
  imports: [TieredMenu],
  template: `
    <ui-lib-tiered-menu #menu [model]="items()" [variant]="variant()" [size]="size()" />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class InlineHostComponent {
  public readonly items: WritableSignal<TieredMenuItem[]> = signal<TieredMenuItem[]>(SIMPLE_ITEMS);
  public readonly variant: WritableSignal<'material' | 'bootstrap' | 'minimal'> = signal<
    'material' | 'bootstrap' | 'minimal'
  >('material');
  public readonly size: WritableSignal<'sm' | 'md' | 'lg'> = signal<'sm' | 'md' | 'lg'>('md');
  public readonly menu: Signal<TieredMenu | undefined> = viewChild<TieredMenu>('menu');
}

// ── Popup host ────────────────────────────────────────────────────────────────

@Component({
  selector: 'app-popup-host',
  standalone: true,
  imports: [TieredMenu],
  template: `
    <button id="trigger" (click)="menu().toggle($event)">Open</button>
    <ui-lib-tiered-menu #menu [model]="items()" [popup]="true" />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class PopupHostComponent {
  public readonly items: WritableSignal<TieredMenuItem[]> = signal<TieredMenuItem[]>(SIMPLE_ITEMS);
  public readonly menu: Signal<TieredMenu | undefined> = viewChild<TieredMenu>('menu');
}

// ── Command host ──────────────────────────────────────────────────────────────

@Component({
  selector: 'app-cmd-host',
  standalone: true,
  imports: [TieredMenu],
  template: ` <ui-lib-tiered-menu [model]="items()" (itemClick)="onItemClick($event)" /> `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class CommandHostComponent {
  public lastEvent: TieredMenuItemCommandEvent | null = null;
  public readonly items: WritableSignal<TieredMenuItem[]> = signal<TieredMenuItem[]>([
    {
      label: 'Action',
      command: (event: TieredMenuItemCommandEvent): void => {
        this.lastEvent = event;
      },
    },
  ]);

  public onItemClick(event: TieredMenuItemCommandEvent): void {
    this.lastEvent = event;
  }
}

// ── Tests ─────────────────────────────────────────────────────────────────────

describe('TieredMenu', (): void => {
  // ── Inline mode ─────────────────────────────────────────────────────────────

  describe('inline mode', (): void => {
    let fixture: ComponentFixture<InlineHostComponent>;
    let host: InlineHostComponent;

    beforeEach(async (): Promise<void> => {
      await TestBed.configureTestingModule({
        imports: [InlineHostComponent],
        providers: [provideZonelessChangeDetection()],
      }).compileComponents();
      fixture = TestBed.createComponent(InlineHostComponent);
      host = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('creates the component', (): void => {
      expect(host.menu()).toBeTruthy();
    });

    it('renders the panel immediately in inline mode', (): void => {
      const panel: HTMLElement | null = queryEl(fixture, '.ui-lib-tiered-menu__panel');
      expect(panel).not.toBeNull();
    });

    it('renders the correct number of visible items', (): void => {
      const links: HTMLElement[] = queryAllEls(fixture, '.ui-lib-tiered-menu__link');
      // 4 non-separator items (New, Open, Save, Disabled)
      expect(links.length).toBe(4);
    });

    it('renders a separator element', (): void => {
      const separator: HTMLElement | null = queryEl(fixture, '.ui-lib-tiered-menu__separator');
      expect(separator).not.toBeNull();
    });

    it('marks disabled items with aria-disabled', (): void => {
      const disabledLink: HTMLElement | null = queryEl(
        fixture,
        '.ui-lib-tiered-menu__item--disabled .ui-lib-tiered-menu__link'
      );
      expect(disabledLink?.getAttribute('aria-disabled')).toBe('true');
    });

    it('applies variant class to host', (): void => {
      const hostEl: HTMLElement = fixture.nativeElement as HTMLElement;
      const tieredMenu: HTMLElement | null = hostEl.querySelector('ui-lib-tiered-menu');
      expect(tieredMenu?.className).toContain('ui-lib-tiered-menu--variant-material');
    });

    it('applies size class to host', (): void => {
      const hostEl: HTMLElement = fixture.nativeElement as HTMLElement;
      const tieredMenu: HTMLElement | null = hostEl.querySelector('ui-lib-tiered-menu');
      expect(tieredMenu?.className).toContain('ui-lib-tiered-menu--size-md');
    });

    it('changes variant class when variant input changes', (): void => {
      host.variant.set('bootstrap');
      fixture.detectChanges();
      const hostEl: HTMLElement = fixture.nativeElement as HTMLElement;
      const tieredMenu: HTMLElement | null = hostEl.querySelector('ui-lib-tiered-menu');
      expect(tieredMenu?.className).toContain('ui-lib-tiered-menu--variant-bootstrap');
    });

    it('changes size class when size input changes', (): void => {
      host.size.set('lg');
      fixture.detectChanges();
      const hostEl: HTMLElement = fixture.nativeElement as HTMLElement;
      const tieredMenu: HTMLElement | null = hostEl.querySelector('ui-lib-tiered-menu');
      expect(tieredMenu?.className).toContain('ui-lib-tiered-menu--size-lg');
    });

    it('hides items with visible=false', (): void => {
      host.items.set([{ label: 'Visible' }, { label: 'Hidden', visible: false }]);
      fixture.detectChanges();
      const links: HTMLElement[] = queryAllEls(fixture, '.ui-lib-tiered-menu__link');
      expect(links.length).toBe(1);
    });

    it('renders icons when provided', (): void => {
      const icon: HTMLElement | null = queryEl(fixture, '.ui-lib-tiered-menu__item-icon');
      expect(icon).not.toBeNull();
    });
  });

  // ── Popup mode ──────────────────────────────────────────────────────────────

  describe('popup mode', (): void => {
    let fixture: ComponentFixture<PopupHostComponent>;
    let host: PopupHostComponent;

    beforeEach(async (): Promise<void> => {
      await TestBed.configureTestingModule({
        imports: [PopupHostComponent],
        providers: [provideZonelessChangeDetection()],
      }).compileComponents();
      fixture = TestBed.createComponent(PopupHostComponent);
      host = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('does not render panel when hidden', (): void => {
      const panel: HTMLElement | null = queryEl(fixture, '.ui-lib-tiered-menu__panel');
      expect(panel).toBeNull();
    });

    it('renders panel after show() is called', (): void => {
      const trigger: HTMLElement = queryEl<HTMLElement>(fixture, '#trigger') as HTMLElement;
      const mockEvent: MouseEvent = new MouseEvent('click', { bubbles: true });
      Object.defineProperty(mockEvent, 'currentTarget', { value: trigger, configurable: true });
      host.menu()?.show(mockEvent);
      fixture.detectChanges();
      const panel: HTMLElement | null = queryEl(fixture, '.ui-lib-tiered-menu__panel');
      expect(panel).not.toBeNull();
    });

    it('hides panel after hide() is called', (): void => {
      const trigger: HTMLElement = queryEl<HTMLElement>(fixture, '#trigger') as HTMLElement;
      const mockEvent: MouseEvent = new MouseEvent('click', { bubbles: true });
      Object.defineProperty(mockEvent, 'currentTarget', { value: trigger, configurable: true });
      host.menu()?.show(mockEvent);
      fixture.detectChanges();
      host.menu()?.hide();
      fixture.detectChanges();
      const panel: HTMLElement | null = queryEl(fixture, '.ui-lib-tiered-menu__panel');
      expect(panel).toBeNull();
    });

    it('toggle() shows then hides', (): void => {
      const trigger: HTMLElement = queryEl<HTMLElement>(fixture, '#trigger') as HTMLElement;
      const mockEvent: MouseEvent = new MouseEvent('click', { bubbles: true });
      Object.defineProperty(mockEvent, 'currentTarget', { value: trigger, configurable: true });

      host.menu()?.toggle(mockEvent);
      fixture.detectChanges();
      expect(queryEl(fixture, '.ui-lib-tiered-menu__panel')).not.toBeNull();

      host.menu()?.toggle(mockEvent);
      fixture.detectChanges();
      expect(queryEl(fixture, '.ui-lib-tiered-menu__panel')).toBeNull();
    });

    it('emits menuShow when panel opens', (): void => {
      const menuComp: TieredMenu = host.menu() as TieredMenu;
      const showSpy: jest.Mock = jest.fn();
      menuComp.menuShow.subscribe(showSpy);

      const trigger: HTMLElement = queryEl<HTMLElement>(fixture, '#trigger') as HTMLElement;
      const mockEvent: MouseEvent = new MouseEvent('click', { bubbles: true });
      Object.defineProperty(mockEvent, 'currentTarget', { value: trigger, configurable: true });
      menuComp.show(mockEvent);
      fixture.detectChanges();

      expect(showSpy).toHaveBeenCalledTimes(1);
    });

    it('emits menuHide when panel closes', (): void => {
      const menuComp: TieredMenu = host.menu() as TieredMenu;
      const hideSpy: jest.Mock = jest.fn();
      menuComp.menuHide.subscribe(hideSpy);

      const trigger: HTMLElement = queryEl<HTMLElement>(fixture, '#trigger') as HTMLElement;
      const mockEvent: MouseEvent = new MouseEvent('click', { bubbles: true });
      Object.defineProperty(mockEvent, 'currentTarget', { value: trigger, configurable: true });
      menuComp.show(mockEvent);
      fixture.detectChanges();
      menuComp.hide();
      fixture.detectChanges();

      expect(hideSpy).toHaveBeenCalledTimes(1);
    });

    it('applies popup CSS class to host', (): void => {
      const hostEl: HTMLElement = fixture.nativeElement as HTMLElement;
      const tieredMenu: HTMLElement | null = hostEl.querySelector('ui-lib-tiered-menu');
      expect(tieredMenu?.className).toContain('ui-lib-tiered-menu--popup');
    });
  });

  // ── Nested items ─────────────────────────────────────────────────────────────

  describe('nested items', (): void => {
    let fixture: ComponentFixture<InlineHostComponent>;
    let host: InlineHostComponent;

    beforeEach(async (): Promise<void> => {
      await TestBed.configureTestingModule({
        imports: [InlineHostComponent],
        providers: [provideZonelessChangeDetection()],
      }).compileComponents();
      fixture = TestBed.createComponent(InlineHostComponent);
      host = fixture.componentInstance;
      host.items.set(NESTED_ITEMS);
      fixture.detectChanges();
    });

    it('renders submenu arrow for items with children', (): void => {
      const arrow: HTMLElement | null = queryEl(fixture, '.ui-lib-tiered-menu__submenu-icon');
      expect(arrow).not.toBeNull();
    });

    it('sets aria-haspopup on items with children', (): void => {
      const linkWithSubmenu: HTMLElement | null = queryEl(
        fixture,
        '.ui-lib-tiered-menu__item--has-submenu .ui-lib-tiered-menu__link'
      );
      expect(linkWithSubmenu?.getAttribute('aria-haspopup')).toBe('menu');
    });

    it('sets aria-expanded=false on collapsed submenu parent', (): void => {
      const linkWithSubmenu: HTMLElement | null = queryEl(
        fixture,
        '.ui-lib-tiered-menu__item--has-submenu .ui-lib-tiered-menu__link'
      );
      expect(linkWithSubmenu?.getAttribute('aria-expanded')).toBe('false');
    });

    it('opens a flyout when hovering a parent item', (): void => {
      const parentItem: HTMLElement | null = queryEl(
        fixture,
        '.ui-lib-tiered-menu__item--has-submenu'
      );
      parentItem?.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
      fixture.detectChanges();
      const submenuWrapper: HTMLElement | null = queryEl(
        fixture,
        '.ui-lib-tiered-menu__submenu-wrapper'
      );
      expect(submenuWrapper).not.toBeNull();
    });
  });

  // ── itemClick output ─────────────────────────────────────────────────────────

  describe('itemClick output', (): void => {
    let fixture: ComponentFixture<CommandHostComponent>;
    let host: CommandHostComponent;

    beforeEach(async (): Promise<void> => {
      await TestBed.configureTestingModule({
        imports: [CommandHostComponent],
        providers: [provideZonelessChangeDetection()],
      }).compileComponents();
      fixture = TestBed.createComponent(CommandHostComponent);
      host = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('emits itemClick when leaf item is clicked', (): void => {
      const link: HTMLElement | null = queryEl(fixture, '.ui-lib-tiered-menu__link');
      link?.click();
      fixture.detectChanges();
      expect(host.lastEvent).not.toBeNull();
      expect(host.lastEvent?.item.label).toBe('Action');
    });

    it('invokes item command callback when clicked', (): void => {
      const link: HTMLElement | null = queryEl(fixture, '.ui-lib-tiered-menu__link');
      link?.click();
      fixture.detectChanges();
      expect(host.lastEvent?.item.label).toBe('Action');
    });
  });

  // ── Constants ─────────────────────────────────────────────────────────────────

  describe('constants', (): void => {
    it('exports TIERED_MENU_DEFAULT_ARIA_LABEL', (): void => {
      expect(TIERED_MENU_DEFAULT_ARIA_LABEL).toBe('Menu');
    });
  });
});
