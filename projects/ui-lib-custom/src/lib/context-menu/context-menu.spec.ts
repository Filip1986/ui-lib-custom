import {
  ChangeDetectionStrategy,
  Component,
  signal,
  type DebugElement,
  type WritableSignal,
} from '@angular/core';
import { TestBed, type ComponentFixture } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { ContextMenu, CONTEXT_MENU_DEFAULT_ARIA_LABEL } from './context-menu';
import type {
  ContextMenuItem,
  ContextMenuItemCommandEvent,
  ContextMenuSize,
  ContextMenuVariant,
} from './context-menu.types';

// ── Helpers ────────────────────────────────────────────────────────────────────

function getHost(fixture: ComponentFixture<unknown>): HTMLElement {
  return (fixture.nativeElement as HTMLElement).querySelector('ui-lib-context-menu') as HTMLElement;
}

function getInstance(fixture: ComponentFixture<unknown>): ContextMenu {
  return fixture.debugElement.query(
    (debugEl: DebugElement): boolean => debugEl.componentInstance instanceof ContextMenu
  ).componentInstance as ContextMenu;
}

function getPanel(fixture: ComponentFixture<unknown>): HTMLElement | null {
  return (fixture.nativeElement as HTMLElement).querySelector('.ui-lib-context-menu__panel');
}

function getMenuLinks(fixture: ComponentFixture<unknown>): HTMLElement[] {
  return Array.from(
    (fixture.nativeElement as HTMLElement).querySelectorAll<HTMLElement>(
      '.ui-lib-context-menu__panel > .ui-lib-context-menu__list > .ui-lib-context-menu__item > .ui-lib-context-menu__link'
    )
  );
}

function makeFakeMouseEvent(x: number = 100, y: number = 100): MouseEvent {
  return new MouseEvent('contextmenu', { clientX: x, clientY: y, bubbles: true });
}

// ── Host component ─────────────────────────────────────────────────────────────

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [ContextMenu],
  template: `
    <ui-lib-context-menu
      [model]="model()"
      [global]="false"
      [variant]="variant()"
      [size]="size()"
      [styleClass]="styleClass()"
      [ariaLabel]="ariaLabel()"
      (itemClick)="handleItemClick($event)"
      (menuShow)="handleShow()"
      (menuHide)="handleHide()"
    />
  `,
})
class HostComponent {
  public readonly model: WritableSignal<ContextMenuItem[]> = signal<ContextMenuItem[]>([
    { label: 'Cut', icon: 'pi pi-times' },
    { label: 'Copy', icon: 'pi pi-copy' },
    { separator: true },
    { label: 'Paste', icon: 'pi pi-clipboard' },
  ]);
  public readonly variant: WritableSignal<ContextMenuVariant> =
    signal<ContextMenuVariant>('material');
  public readonly size: WritableSignal<ContextMenuSize> = signal<ContextMenuSize>('md');
  public readonly styleClass: WritableSignal<string | null> = signal<string | null>(null);
  public readonly ariaLabel: WritableSignal<string> = signal<string>(
    CONTEXT_MENU_DEFAULT_ARIA_LABEL
  );

  public readonly lastClickEvent: WritableSignal<ContextMenuItemCommandEvent | null> =
    signal<ContextMenuItemCommandEvent | null>(null);
  public readonly showCount: WritableSignal<number> = signal<number>(0);
  public readonly hideCount: WritableSignal<number> = signal<number>(0);

  public handleItemClick(event: ContextMenuItemCommandEvent): void {
    this.lastClickEvent.set(event);
  }
  public handleShow(): void {
    this.showCount.update((count: number): number => count + 1);
  }
  public handleHide(): void {
    this.hideCount.update((count: number): number => count + 1);
  }
}

// ── Tests ──────────────────────────────────────────────────────────────────────

describe('ContextMenu', (): void => {
  // ── Creation ──────────────────────────────────────────────────────────────────

  describe('Creation', (): void => {
    it('should create the component', async (): Promise<void> => {
      await TestBed.configureTestingModule({
        imports: [HostComponent],
        providers: [provideZonelessChangeDetection()],
      }).compileComponents();

      const fixture: ComponentFixture<HostComponent> = TestBed.createComponent(HostComponent);
      fixture.detectChanges();

      expect(getHost(fixture)).toBeTruthy();
    });

    it('should NOT render the panel initially', async (): Promise<void> => {
      await TestBed.configureTestingModule({
        imports: [HostComponent],
        providers: [provideZonelessChangeDetection()],
      }).compileComponents();

      const fixture: ComponentFixture<HostComponent> = TestBed.createComponent(HostComponent);
      fixture.detectChanges();

      expect(getPanel(fixture)).toBeNull();
    });

    it('should apply base class to host', async (): Promise<void> => {
      await TestBed.configureTestingModule({
        imports: [HostComponent],
        providers: [provideZonelessChangeDetection()],
      }).compileComponents();

      const fixture: ComponentFixture<HostComponent> = TestBed.createComponent(HostComponent);
      fixture.detectChanges();

      expect(getHost(fixture).classList).toContain('ui-lib-context-menu');
    });
  });

  // ── show / hide / toggle ──────────────────────────────────────────────────────

  describe('show / hide / toggle', (): void => {
    let fixture: ComponentFixture<HostComponent>;
    let host: HostComponent;
    let instance: ContextMenu;

    beforeEach(async (): Promise<void> => {
      await TestBed.configureTestingModule({
        imports: [HostComponent],
        providers: [provideZonelessChangeDetection()],
      }).compileComponents();

      fixture = TestBed.createComponent(HostComponent);
      host = fixture.componentInstance;
      instance = getInstance(fixture);
      fixture.detectChanges();
    });

    it('should set isVisible to true on show()', (): void => {
      const event: MouseEvent = makeFakeMouseEvent(200, 300);
      instance.show(event);
      fixture.detectChanges();

      expect(instance.isVisible()).toBe(true);
    });

    it('should render the panel after show()', (): void => {
      const event: MouseEvent = makeFakeMouseEvent();
      instance.show(event);
      fixture.detectChanges();

      expect(getPanel(fixture)).toBeTruthy();
    });

    it('should set menuX and menuY to event clientX/clientY', (): void => {
      const event: MouseEvent = makeFakeMouseEvent(250, 150);
      instance.show(event);

      expect(instance.menuX()).toBe(250);
      expect(instance.menuY()).toBe(150);
    });

    it('should emit menuShow on show()', (): void => {
      const event: MouseEvent = makeFakeMouseEvent();
      instance.show(event);

      expect(host.showCount()).toBe(1);
    });

    it('should set isVisible to false on hide()', (): void => {
      instance.show(makeFakeMouseEvent());
      instance.hide();
      fixture.detectChanges();

      expect(instance.isVisible()).toBe(false);
    });

    it('should remove the panel after hide()', (): void => {
      instance.show(makeFakeMouseEvent());
      fixture.detectChanges();
      instance.hide();
      fixture.detectChanges();

      expect(getPanel(fixture)).toBeNull();
    });

    it('should emit menuHide on hide()', (): void => {
      instance.show(makeFakeMouseEvent());
      instance.hide();

      expect(host.hideCount()).toBe(1);
    });

    it('should NOT emit menuHide when already hidden', (): void => {
      instance.hide();

      expect(host.hideCount()).toBe(0);
    });

    it('toggle() should show when hidden', (): void => {
      instance.toggle(makeFakeMouseEvent());

      expect(instance.isVisible()).toBe(true);
    });

    it('toggle() should hide when visible', (): void => {
      instance.show(makeFakeMouseEvent());
      instance.toggle(makeFakeMouseEvent());

      expect(instance.isVisible()).toBe(false);
    });

    it('show() should reset activeSubmenuIndex', (): void => {
      instance.activeSubmenuIndex.set(1);
      instance.show(makeFakeMouseEvent());

      expect(instance.activeSubmenuIndex()).toBeNull();
    });
  });

  // ── visibleItems ─────────────────────────────────────────────────────────────

  describe('visibleItems()', (): void => {
    let fixture: ComponentFixture<HostComponent>;
    let host: HostComponent;
    let instance: ContextMenu;

    beforeEach(async (): Promise<void> => {
      await TestBed.configureTestingModule({
        imports: [HostComponent],
        providers: [provideZonelessChangeDetection()],
      }).compileComponents();

      fixture = TestBed.createComponent(HostComponent);
      host = fixture.componentInstance;
      instance = getInstance(fixture);
      fixture.detectChanges();
    });

    it('should include all items by default', (): void => {
      host.model.set([{ label: 'A' }, { label: 'B' }, { label: 'C' }]);
      fixture.detectChanges();

      expect(instance.visibleItems().length).toBe(3);
    });

    it('should exclude items with visible === false', (): void => {
      host.model.set([{ label: 'A' }, { label: 'B', visible: false }, { label: 'C' }]);
      fixture.detectChanges();

      expect(instance.visibleItems().length).toBe(2);
    });

    it('should include items with visible === true', (): void => {
      host.model.set([{ label: 'A', visible: true }, { label: 'B' }]);
      fixture.detectChanges();

      expect(instance.visibleItems().length).toBe(2);
    });
  });

  // ── getVisibleSubItems ────────────────────────────────────────────────────────

  describe('getVisibleSubItems()', (): void => {
    let fixture: ComponentFixture<HostComponent>;
    let instance: ContextMenu;

    beforeEach(async (): Promise<void> => {
      await TestBed.configureTestingModule({
        imports: [HostComponent],
        providers: [provideZonelessChangeDetection()],
      }).compileComponents();

      fixture = TestBed.createComponent(HostComponent);
      instance = getInstance(fixture);
      fixture.detectChanges();
    });

    it('should return empty array when item has no children', (): void => {
      expect(instance.getVisibleSubItems({ label: 'A' })).toEqual([]);
    });

    it('should return visible sub-items', (): void => {
      const item: ContextMenuItem = {
        label: 'Parent',
        items: [{ label: 'Sub1' }, { label: 'Sub2', visible: false }, { label: 'Sub3' }],
      };
      expect(instance.getVisibleSubItems(item).length).toBe(2);
    });
  });

  // ── onItemActivate ────────────────────────────────────────────────────────────

  describe('onItemActivate()', (): void => {
    let fixture: ComponentFixture<HostComponent>;
    let host: HostComponent;
    let instance: ContextMenu;

    beforeEach(async (): Promise<void> => {
      await TestBed.configureTestingModule({
        imports: [HostComponent],
        providers: [provideZonelessChangeDetection()],
      }).compileComponents();

      fixture = TestBed.createComponent(HostComponent);
      host = fixture.componentInstance;
      instance = getInstance(fixture);
      fixture.detectChanges();
    });

    it('should emit itemClick for a normal item', (): void => {
      const emitSpy: jest.SpiedFunction<typeof instance.itemClick.emit> = jest.spyOn(
        instance.itemClick,
        'emit'
      );
      const item: ContextMenuItem = { label: 'Cut' };
      const fakeEvent: MouseEvent = new MouseEvent('click');

      instance.show(fakeEvent);
      instance.onItemActivate(fakeEvent, item, 0);

      expect(emitSpy).toHaveBeenCalledWith({ item, originalEvent: fakeEvent });
    });

    it('should call item.command when activated', (): void => {
      const commandSpy: jest.Mock = jest.fn();
      const item: ContextMenuItem = { label: 'Action', command: commandSpy };
      const fakeEvent: MouseEvent = new MouseEvent('click');

      instance.show(fakeEvent);
      instance.onItemActivate(fakeEvent, item, 0);

      expect(commandSpy).toHaveBeenCalledWith({ item, originalEvent: fakeEvent });
    });

    it('should hide the menu after activating a leaf item', (): void => {
      const item: ContextMenuItem = { label: 'Cut' };
      instance.show(makeFakeMouseEvent());
      instance.onItemActivate(new MouseEvent('click'), item, 0);

      expect(instance.isVisible()).toBe(false);
    });

    it('should NOT emit itemClick for disabled items', (): void => {
      const emitSpy: jest.SpiedFunction<typeof instance.itemClick.emit> = jest.spyOn(
        instance.itemClick,
        'emit'
      );
      const item: ContextMenuItem = { label: 'Disabled', disabled: true };

      instance.show(makeFakeMouseEvent());
      instance.onItemActivate(new MouseEvent('click'), item, 0);

      expect(emitSpy).not.toHaveBeenCalled();
    });

    it('should NOT emit itemClick for separator items', (): void => {
      const emitSpy: jest.SpiedFunction<typeof instance.itemClick.emit> = jest.spyOn(
        instance.itemClick,
        'emit'
      );
      const item: ContextMenuItem = { separator: true };

      instance.show(makeFakeMouseEvent());
      instance.onItemActivate(new MouseEvent('click'), item, 0);

      expect(emitSpy).not.toHaveBeenCalled();
    });

    it('should open submenu for items with children', (): void => {
      const item: ContextMenuItem = { label: 'More', items: [{ label: 'Sub' }] };

      instance.show(makeFakeMouseEvent());
      instance.onItemActivate(new MouseEvent('click'), item, 2);

      expect(instance.activeSubmenuIndex()).toBe(2);
      expect(instance.isVisible()).toBe(true);
    });

    it('should toggle submenu off when clicked a second time', (): void => {
      const item: ContextMenuItem = { label: 'More', items: [{ label: 'Sub' }] };

      instance.show(makeFakeMouseEvent());
      instance.onItemActivate(new MouseEvent('click'), item, 2);
      instance.onItemActivate(new MouseEvent('click'), item, 2);

      expect(instance.activeSubmenuIndex()).toBeNull();
    });

    it('output (itemClick) is received by host', (): void => {
      const item: ContextMenuItem = { label: 'Copy' };
      const fakeEvent: MouseEvent = new MouseEvent('click');

      instance.show(fakeEvent);
      instance.onItemActivate(fakeEvent, item, 1);

      expect(host.lastClickEvent()?.item.label).toBe('Copy');
    });
  });

  // ── onSubItemActivate ─────────────────────────────────────────────────────────

  describe('onSubItemActivate()', (): void => {
    let fixture: ComponentFixture<HostComponent>;
    let instance: ContextMenu;

    beforeEach(async (): Promise<void> => {
      await TestBed.configureTestingModule({
        imports: [HostComponent],
        providers: [provideZonelessChangeDetection()],
      }).compileComponents();

      fixture = TestBed.createComponent(HostComponent);
      instance = getInstance(fixture);
      fixture.detectChanges();
    });

    it('should emit itemClick for a normal subitem', (): void => {
      const emitSpy: jest.SpiedFunction<typeof instance.itemClick.emit> = jest.spyOn(
        instance.itemClick,
        'emit'
      );
      const subItem: ContextMenuItem = { label: 'Sub Action' };
      const fakeEvent: MouseEvent = new MouseEvent('click');

      instance.show(fakeEvent);
      instance.onSubItemActivate(fakeEvent, subItem);

      expect(emitSpy).toHaveBeenCalledWith({ item: subItem, originalEvent: fakeEvent });
    });

    it('should call subItem.command', (): void => {
      const commandSpy: jest.Mock = jest.fn();
      const subItem: ContextMenuItem = { label: 'Sub', command: commandSpy };
      const fakeEvent: MouseEvent = new MouseEvent('click');

      instance.show(fakeEvent);
      instance.onSubItemActivate(fakeEvent, subItem);

      expect(commandSpy).toHaveBeenCalled();
    });

    it('should hide the menu after activating a subitem', (): void => {
      instance.show(makeFakeMouseEvent());
      instance.onSubItemActivate(new MouseEvent('click'), { label: 'Sub' });

      expect(instance.isVisible()).toBe(false);
    });

    it('should NOT emit for disabled subitems', (): void => {
      const emitSpy: jest.SpiedFunction<typeof instance.itemClick.emit> = jest.spyOn(
        instance.itemClick,
        'emit'
      );
      instance.show(makeFakeMouseEvent());
      instance.onSubItemActivate(new MouseEvent('click'), { label: 'Sub', disabled: true });

      expect(emitSpy).not.toHaveBeenCalled();
    });
  });

  // ── onItemMouseEnter ──────────────────────────────────────────────────────────

  describe('onItemMouseEnter()', (): void => {
    let fixture: ComponentFixture<HostComponent>;
    let instance: ContextMenu;

    beforeEach(async (): Promise<void> => {
      await TestBed.configureTestingModule({
        imports: [HostComponent],
        providers: [provideZonelessChangeDetection()],
      }).compileComponents();

      fixture = TestBed.createComponent(HostComponent);
      instance = getInstance(fixture);
      fixture.detectChanges();
    });

    it('should set activeSubmenuIndex for items with children', (): void => {
      const item: ContextMenuItem = { label: 'More', items: [{ label: 'Sub' }] };
      instance.onItemMouseEnter(item, 3);

      expect(instance.activeSubmenuIndex()).toBe(3);
    });

    it('should clear activeSubmenuIndex for items without children', (): void => {
      instance.activeSubmenuIndex.set(2);
      instance.onItemMouseEnter({ label: 'Leaf' }, 0);

      expect(instance.activeSubmenuIndex()).toBeNull();
    });

    it('should NOT set activeSubmenuIndex for disabled items with children', (): void => {
      instance.activeSubmenuIndex.set(null);
      const item: ContextMenuItem = { label: 'More', items: [{ label: 'Sub' }], disabled: true };
      instance.onItemMouseEnter(item, 2);

      expect(instance.activeSubmenuIndex()).toBeNull();
    });
  });

  // ── onItemKeyDown ─────────────────────────────────────────────────────────────

  describe('onItemKeyDown()', (): void => {
    let fixture: ComponentFixture<HostComponent>;
    let host: HostComponent;
    let instance: ContextMenu;

    beforeEach(async (): Promise<void> => {
      await TestBed.configureTestingModule({
        imports: [HostComponent],
        providers: [provideZonelessChangeDetection()],
      }).compileComponents();

      fixture = TestBed.createComponent(HostComponent);
      host = fixture.componentInstance;
      instance = getInstance(fixture);
      fixture.detectChanges();
    });

    it('should activate item on Enter key', (): void => {
      const emitSpy: jest.SpiedFunction<typeof instance.itemClick.emit> = jest.spyOn(
        instance.itemClick,
        'emit'
      );
      const item: ContextMenuItem = { label: 'Cut' };
      const event: KeyboardEvent = new KeyboardEvent('keydown', { key: 'Enter' });

      instance.show(makeFakeMouseEvent());
      instance.onItemKeyDown(event, item, 0);

      expect(emitSpy).toHaveBeenCalled();
    });

    it('should activate item on Space key', (): void => {
      const emitSpy: jest.SpiedFunction<typeof instance.itemClick.emit> = jest.spyOn(
        instance.itemClick,
        'emit'
      );
      const item: ContextMenuItem = { label: 'Cut' };
      const event: KeyboardEvent = new KeyboardEvent('keydown', { key: ' ' });

      instance.show(makeFakeMouseEvent());
      instance.onItemKeyDown(event, item, 0);

      expect(emitSpy).toHaveBeenCalled();
    });

    it('should hide on Escape key', (): void => {
      instance.show(makeFakeMouseEvent());
      instance.onItemKeyDown(new KeyboardEvent('keydown', { key: 'Escape' }), { label: 'A' }, 0);

      expect(instance.isVisible()).toBe(false);
    });

    it('should open submenu on ArrowRight for items with children', (): void => {
      const item: ContextMenuItem = { label: 'More', items: [{ label: 'Sub' }] };

      instance.show(makeFakeMouseEvent());
      instance.onItemKeyDown(new KeyboardEvent('keydown', { key: 'ArrowRight' }), item, 1);

      expect(instance.activeSubmenuIndex()).toBe(1);
    });

    it('should close submenu on ArrowLeft', (): void => {
      instance.activeSubmenuIndex.set(2);
      instance.show(makeFakeMouseEvent());
      instance.onItemKeyDown(new KeyboardEvent('keydown', { key: 'ArrowLeft' }), { label: 'X' }, 2);

      expect(instance.activeSubmenuIndex()).toBeNull();
    });

    it('should not emit for unrelated keys', (): void => {
      const emitSpy: jest.SpiedFunction<typeof instance.itemClick.emit> = jest.spyOn(
        instance.itemClick,
        'emit'
      );
      instance.show(makeFakeMouseEvent());
      instance.onItemKeyDown(new KeyboardEvent('keydown', { key: 'Tab' }), { label: 'A' }, 0);

      expect(emitSpy).not.toHaveBeenCalled();

      void host; // suppress unused variable warning
    });
  });

  // ── Panel rendering ───────────────────────────────────────────────────────────

  describe('Panel rendering', (): void => {
    let fixture: ComponentFixture<HostComponent>;
    let host: HostComponent;
    let instance: ContextMenu;

    beforeEach(async (): Promise<void> => {
      await TestBed.configureTestingModule({
        imports: [HostComponent],
        providers: [provideZonelessChangeDetection()],
      }).compileComponents();

      fixture = TestBed.createComponent(HostComponent);
      host = fixture.componentInstance;
      instance = getInstance(fixture);
      fixture.detectChanges();
    });

    it('should render panel with role="menu"', (): void => {
      instance.show(makeFakeMouseEvent());
      fixture.detectChanges();

      expect(getPanel(fixture)?.getAttribute('role')).toBe('menu');
    });

    it('should render all visible items', (): void => {
      host.model.set([{ label: 'A' }, { label: 'B' }, { label: 'C' }]);
      instance.show(makeFakeMouseEvent());
      fixture.detectChanges();

      expect(getMenuLinks(fixture).length).toBe(3);
    });

    it('should render separators with role="separator"', (): void => {
      host.model.set([{ label: 'A' }, { separator: true }, { label: 'B' }]);
      instance.show(makeFakeMouseEvent());
      fixture.detectChanges();

      const separators: NodeListOf<Element> = (
        fixture.nativeElement as HTMLElement
      ).querySelectorAll('[role="separator"]');
      expect(separators.length).toBe(1);
    });

    it('should not render items with visible === false', (): void => {
      host.model.set([{ label: 'A' }, { label: 'B', visible: false }, { label: 'C' }]);
      instance.show(makeFakeMouseEvent());
      fixture.detectChanges();

      expect(getMenuLinks(fixture).length).toBe(2);
    });

    it('should set aria-disabled on disabled items', (): void => {
      host.model.set([{ label: 'Disabled', disabled: true }]);
      instance.show(makeFakeMouseEvent());
      fixture.detectChanges();

      const link: HTMLElement | null = (fixture.nativeElement as HTMLElement).querySelector(
        '.ui-lib-context-menu__link[aria-disabled="true"]'
      );
      expect(link).toBeTruthy();
    });

    it('should set aria-haspopup="menu" on items with children', (): void => {
      host.model.set([{ label: 'More', items: [{ label: 'Sub' }] }]);
      instance.show(makeFakeMouseEvent());
      fixture.detectChanges();

      const link: HTMLElement | null = (fixture.nativeElement as HTMLElement).querySelector(
        '.ui-lib-context-menu__link[aria-haspopup="menu"]'
      );
      expect(link).toBeTruthy();
    });

    it('should set panel aria-label from ariaLabel input', (): void => {
      host.ariaLabel.set('My Menu');
      instance.show(makeFakeMouseEvent());
      fixture.detectChanges();

      expect(getPanel(fixture)?.getAttribute('aria-label')).toBe('My Menu');
    });
  });

  // ── Variant classes ───────────────────────────────────────────────────────────

  describe('Variant classes', (): void => {
    let fixture: ComponentFixture<HostComponent>;
    let host: HostComponent;

    beforeEach(async (): Promise<void> => {
      await TestBed.configureTestingModule({
        imports: [HostComponent],
        providers: [provideZonelessChangeDetection()],
      }).compileComponents();

      fixture = TestBed.createComponent(HostComponent);
      host = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should apply variant-material class', (): void => {
      host.variant.set('material');
      fixture.detectChanges();
      expect(getHost(fixture).classList).toContain('ui-lib-context-menu--variant-material');
    });

    it('should apply variant-bootstrap class', (): void => {
      host.variant.set('bootstrap');
      fixture.detectChanges();
      expect(getHost(fixture).classList).toContain('ui-lib-context-menu--variant-bootstrap');
    });

    it('should apply variant-minimal class', (): void => {
      host.variant.set('minimal');
      fixture.detectChanges();
      expect(getHost(fixture).classList).toContain('ui-lib-context-menu--variant-minimal');
    });
  });

  // ── Size classes ──────────────────────────────────────────────────────────────

  describe('Size classes', (): void => {
    let fixture: ComponentFixture<HostComponent>;
    let host: HostComponent;

    beforeEach(async (): Promise<void> => {
      await TestBed.configureTestingModule({
        imports: [HostComponent],
        providers: [provideZonelessChangeDetection()],
      }).compileComponents();

      fixture = TestBed.createComponent(HostComponent);
      host = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should apply size-sm class', (): void => {
      host.size.set('sm');
      fixture.detectChanges();
      expect(getHost(fixture).classList).toContain('ui-lib-context-menu--size-sm');
    });

    it('should apply size-md class', (): void => {
      host.size.set('md');
      fixture.detectChanges();
      expect(getHost(fixture).classList).toContain('ui-lib-context-menu--size-md');
    });

    it('should apply size-lg class', (): void => {
      host.size.set('lg');
      fixture.detectChanges();
      expect(getHost(fixture).classList).toContain('ui-lib-context-menu--size-lg');
    });
  });

  // ── styleClass ────────────────────────────────────────────────────────────────

  describe('styleClass', (): void => {
    let fixture: ComponentFixture<HostComponent>;
    let host: HostComponent;

    beforeEach(async (): Promise<void> => {
      await TestBed.configureTestingModule({
        imports: [HostComponent],
        providers: [provideZonelessChangeDetection()],
      }).compileComponents();

      fixture = TestBed.createComponent(HostComponent);
      host = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should append styleClass to host classes', (): void => {
      host.styleClass.set('my-custom-class');
      fixture.detectChanges();
      expect(getHost(fixture).classList).toContain('my-custom-class');
    });
  });

  // ── CONTEXT_MENU_DEFAULT_ARIA_LABEL constant ──────────────────────────────────

  describe('CONTEXT_MENU_DEFAULT_ARIA_LABEL', (): void => {
    it('should be a non-empty string', (): void => {
      expect(typeof CONTEXT_MENU_DEFAULT_ARIA_LABEL).toBe('string');
      expect(CONTEXT_MENU_DEFAULT_ARIA_LABEL.length).toBeGreaterThan(0);
    });
  });
});
