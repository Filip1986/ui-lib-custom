import {
  ChangeDetectionStrategy,
  Component,
  signal,
  type DebugElement,
  type WritableSignal,
} from '@angular/core';
import { TestBed, type ComponentFixture } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideZonelessChangeDetection } from '@angular/core';
import { provideIcons } from '@ng-icons/core';
import { lucideAlertCircle } from '@ng-icons/lucide';
import { Dock, DOCK_DEFAULT_MAGNIFICATION_LEVEL, DOCK_MAGNIFICATION_SPREAD } from './dock';
import type {
  DockItem,
  DockItemCommandEvent,
  DockPosition,
  DockSize,
  DockVariant,
} from './dock.types';

// ── Helpers ───────────────────────────────────────────────────────────────────

function getHost(fixture: ComponentFixture<unknown>): HTMLElement {
  return (fixture.nativeElement as HTMLElement).querySelector('ui-lib-dock') as HTMLElement;
}

function getListItems(fixture: ComponentFixture<unknown>): HTMLElement[] {
  return Array.from(
    (fixture.nativeElement as HTMLElement).querySelectorAll<HTMLElement>('.ui-lib-dock__item')
  );
}

function getTooltips(fixture: ComponentFixture<unknown>): HTMLElement[] {
  return Array.from(
    (fixture.nativeElement as HTMLElement).querySelectorAll<HTMLElement>('.ui-lib-dock__tooltip')
  );
}

function getDockInstance(fixture: ComponentFixture<unknown>): Dock {
  return fixture.debugElement.query(
    (debugEl: DebugElement): boolean => debugEl.componentInstance instanceof Dock
  ).componentInstance as Dock;
}

// ── Sample items ──────────────────────────────────────────────────────────────

const SAMPLE_ITEMS: DockItem[] = [
  {
    label: 'Home',
    icon: 'lucideAlertCircle',
    command: jest.fn() as (event: DockItemCommandEvent) => void,
  },
  {
    label: 'Search',
    icon: 'lucideAlertCircle',
    command: jest.fn() as (event: DockItemCommandEvent) => void,
  },
  {
    label: 'Settings',
    icon: 'lucideAlertCircle',
    command: jest.fn() as (event: DockItemCommandEvent) => void,
  },
];

// ── Shared test providers ─────────────────────────────────────────────────────

function dockTestProviders(): unknown[] {
  return [provideZonelessChangeDetection(), provideRouter([]), provideIcons({ lucideAlertCircle })];
}

// ── Host component ────────────────────────────────────────────────────────────

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [Dock],
  template: `
    <ui-lib-dock
      [items]="items()"
      [position]="position()"
      [variant]="variant()"
      [size]="size()"
      [magnification]="magnification()"
      [magnificationLevel]="magnificationLevel()"
      [styleClass]="styleClass()"
      (itemClick)="handleItemClick($event)"
    />
  `,
})
class HostComponent {
  public readonly items: WritableSignal<DockItem[]> = signal<DockItem[]>([...SAMPLE_ITEMS]);
  public readonly position: WritableSignal<DockPosition> = signal<DockPosition>('bottom');
  public readonly variant: WritableSignal<DockVariant> = signal<DockVariant>('material');
  public readonly size: WritableSignal<DockSize> = signal<DockSize>('md');
  public readonly magnification: WritableSignal<boolean> = signal<boolean>(true);
  public readonly magnificationLevel: WritableSignal<number> = signal<number>(
    DOCK_DEFAULT_MAGNIFICATION_LEVEL
  );
  public readonly styleClass: WritableSignal<string | null> = signal<string | null>(null);

  public readonly lastClickEvent: WritableSignal<DockItemCommandEvent | null> =
    signal<DockItemCommandEvent | null>(null);

  public handleItemClick(event: DockItemCommandEvent): void {
    this.lastClickEvent.set(event);
  }
}

// ── Tests ─────────────────────────────────────────────────────────────────────

describe('Dock', (): void => {
  // ── Creation ────────────────────────────────────────────────────────────────

  describe('creation', (): void => {
    it('should create the component', async (): Promise<void> => {
      await TestBed.configureTestingModule({
        imports: [HostComponent],
        providers: dockTestProviders(),
      }).compileComponents();

      const fixture: ComponentFixture<HostComponent> = TestBed.createComponent(HostComponent);
      fixture.detectChanges();

      const instance: Dock = getDockInstance(fixture);
      expect(instance).toBeTruthy();
    });

    it('should render a nav container', async (): Promise<void> => {
      await TestBed.configureTestingModule({
        imports: [HostComponent],
        providers: dockTestProviders(),
      }).compileComponents();

      const fixture: ComponentFixture<HostComponent> = TestBed.createComponent(HostComponent);
      fixture.detectChanges();

      const nav: HTMLElement | null = (
        fixture.nativeElement as HTMLElement
      ).querySelector<HTMLElement>('nav.ui-lib-dock__container');
      expect(nav).not.toBeNull();
    });
  });

  // ── Constants ────────────────────────────────────────────────────────────────

  describe('constants', (): void => {
    it('should export DOCK_DEFAULT_MAGNIFICATION_LEVEL', (): void => {
      expect(DOCK_DEFAULT_MAGNIFICATION_LEVEL).toBeGreaterThan(1);
    });

    it('should export DOCK_MAGNIFICATION_SPREAD', (): void => {
      expect(DOCK_MAGNIFICATION_SPREAD).toBeGreaterThan(0);
    });
  });

  // ── Host classes ──────────────────────────────────────────────────────────────

  describe('hostClasses', (): void => {
    let fixture: ComponentFixture<HostComponent>;
    let host: HostComponent;

    beforeEach(async (): Promise<void> => {
      await TestBed.configureTestingModule({
        imports: [HostComponent],
        providers: dockTestProviders(),
      }).compileComponents();

      fixture = TestBed.createComponent(HostComponent);
      host = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should apply base class', (): void => {
      const el: HTMLElement = getHost(fixture);
      expect(el.classList.contains('ui-lib-dock')).toBe(true);
    });

    it('should apply variant class', (): void => {
      const el: HTMLElement = getHost(fixture);
      expect(el.classList.contains('ui-lib-dock--variant-material')).toBe(true);
    });

    it('should apply size class', (): void => {
      const el: HTMLElement = getHost(fixture);
      expect(el.classList.contains('ui-lib-dock--size-md')).toBe(true);
    });

    it('should apply position class', (): void => {
      const el: HTMLElement = getHost(fixture);
      expect(el.classList.contains('ui-lib-dock--position-bottom')).toBe(true);
    });

    it('should update variant class when variant changes', (): void => {
      host.variant.set('bootstrap');
      fixture.detectChanges();

      const el: HTMLElement = getHost(fixture);
      expect(el.classList.contains('ui-lib-dock--variant-bootstrap')).toBe(true);
      expect(el.classList.contains('ui-lib-dock--variant-material')).toBe(false);
    });

    it('should update size class when size changes', (): void => {
      host.size.set('lg');
      fixture.detectChanges();

      const el: HTMLElement = getHost(fixture);
      expect(el.classList.contains('ui-lib-dock--size-lg')).toBe(true);
    });

    it('should update position class when position changes', (): void => {
      host.position.set('top');
      fixture.detectChanges();

      const el: HTMLElement = getHost(fixture);
      expect(el.classList.contains('ui-lib-dock--position-top')).toBe(true);
    });

    it('should apply no-magnification class when magnification is false', (): void => {
      host.magnification.set(false);
      fixture.detectChanges();

      const el: HTMLElement = getHost(fixture);
      expect(el.classList.contains('ui-lib-dock--no-magnification')).toBe(true);
    });

    it('should apply optional styleClass', (): void => {
      host.styleClass.set('my-custom-class');
      fixture.detectChanges();

      const el: HTMLElement = getHost(fixture);
      expect(el.classList.contains('my-custom-class')).toBe(true);
    });
  });

  // ── Items rendering ───────────────────────────────────────────────────────────

  describe('items rendering', (): void => {
    let fixture: ComponentFixture<HostComponent>;
    let host: HostComponent;

    beforeEach(async (): Promise<void> => {
      await TestBed.configureTestingModule({
        imports: [HostComponent],
        providers: dockTestProviders(),
      }).compileComponents();

      fixture = TestBed.createComponent(HostComponent);
      host = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should render all visible items', (): void => {
      const items: HTMLElement[] = getListItems(fixture);
      expect(items.length).toBe(SAMPLE_ITEMS.length);
    });

    it('should hide items with visible set to false', (): void => {
      host.items.set([
        {
          label: 'Home',
          icon: 'lucideAlertCircle',
          command: jest.fn() as (event: DockItemCommandEvent) => void,
        },
        { label: 'Hidden', icon: 'lucideAlertCircle', visible: false },
        {
          label: 'Settings',
          icon: 'lucideAlertCircle',
          command: jest.fn() as (event: DockItemCommandEvent) => void,
        },
      ]);
      fixture.detectChanges();

      const items: HTMLElement[] = getListItems(fixture);
      expect(items.length).toBe(2);
    });

    it('should render tooltips for items with labels', (): void => {
      const tooltips: HTMLElement[] = getTooltips(fixture);
      expect(tooltips.length).toBe(SAMPLE_ITEMS.length);
    });

    it('should display correct tooltip text', (): void => {
      const tooltips: HTMLElement[] = getTooltips(fixture);
      expect((tooltips[0]!.textContent as string).trim()).toBe('Home');
    });

    it('should not render tooltip for item without label', (): void => {
      host.items.set([
        { icon: 'lucideAlertCircle', command: jest.fn() as (event: DockItemCommandEvent) => void },
      ]);
      fixture.detectChanges();

      const tooltips: HTMLElement[] = getTooltips(fixture);
      expect(tooltips.length).toBe(0);
    });

    it('should render icons for items with icon property', (): void => {
      const icons: NodeListOf<Element> = (fixture.nativeElement as HTMLElement).querySelectorAll(
        '.ui-lib-dock__item-icon'
      );
      expect(icons.length).toBe(SAMPLE_ITEMS.length);
    });
  });

  // ── isClickable ────────────────────────────────────────────────────────────────

  describe('isClickable', (): void => {
    let fixture: ComponentFixture<HostComponent>;

    beforeEach(async (): Promise<void> => {
      await TestBed.configureTestingModule({
        imports: [HostComponent],
        providers: dockTestProviders(),
      }).compileComponents();

      fixture = TestBed.createComponent(HostComponent);
      fixture.detectChanges();
    });

    it('should return true for item with command', (): void => {
      const instance: Dock = getDockInstance(fixture);
      const item: DockItem = {
        label: 'X',
        command: jest.fn() as (event: DockItemCommandEvent) => void,
      };
      expect(instance.isClickable(item)).toBe(true);
    });

    it('should return true for item with url', (): void => {
      const instance: Dock = getDockInstance(fixture);
      const item: DockItem = { label: 'X', url: 'https://example.com' };
      expect(instance.isClickable(item)).toBe(true);
    });

    it('should return true for item with routerLink', (): void => {
      const instance: Dock = getDockInstance(fixture);
      const item: DockItem = { label: 'X', routerLink: '/home' };
      expect(instance.isClickable(item)).toBe(true);
    });

    it('should return false for disabled item', (): void => {
      const instance: Dock = getDockInstance(fixture);
      const item: DockItem = {
        label: 'X',
        command: jest.fn() as (event: DockItemCommandEvent) => void,
        disabled: true,
      };
      expect(instance.isClickable(item)).toBe(false);
    });

    it('should return false for item with no interaction', (): void => {
      const instance: Dock = getDockInstance(fixture);
      const item: DockItem = { label: 'X', icon: 'pi pi-home' };
      expect(instance.isClickable(item)).toBe(false);
    });
  });

  // ── itemScale ──────────────────────────────────────────────────────────────────

  describe('itemScale', (): void => {
    let fixture: ComponentFixture<HostComponent>;
    let instance: Dock;
    let host: HostComponent;

    beforeEach(async (): Promise<void> => {
      await TestBed.configureTestingModule({
        imports: [HostComponent],
        providers: dockTestProviders(),
      }).compileComponents();

      fixture = TestBed.createComponent(HostComponent);
      host = fixture.componentInstance;
      fixture.detectChanges();
      instance = getDockInstance(fixture);
    });

    it('should return empty string when magnification is disabled', (): void => {
      host.magnification.set(false);
      fixture.detectChanges();

      expect(instance.itemScale(0)).toBe('');
    });

    it('should return empty string when no item is hovered', (): void => {
      instance.hoveredIndex.set(-1);
      expect(instance.itemScale(0)).toBe('');
    });

    it('should return full scale for the directly hovered item', (): void => {
      instance.hoveredIndex.set(1);
      const scale: string = instance.itemScale(1);
      const expected: string = `scale(${DOCK_DEFAULT_MAGNIFICATION_LEVEL.toFixed(3)})`;
      expect(scale).toBe(expected);
    });

    it('should return reduced scale for adjacent items', (): void => {
      instance.hoveredIndex.set(2);
      const adjacentScale: string = instance.itemScale(1);
      expect(adjacentScale).not.toBe('');

      // Adjacent item should have a scale value less than the magnification level
      const scaleValue: number = parseFloat(adjacentScale.replace('scale(', '').replace(')', ''));
      expect(scaleValue).toBeGreaterThan(1);
      expect(scaleValue).toBeLessThan(DOCK_DEFAULT_MAGNIFICATION_LEVEL);
    });

    it('should return empty string for items beyond spread distance', (): void => {
      instance.hoveredIndex.set(0);
      // Items beyond DOCK_MAGNIFICATION_SPREAD distance get no scale
      const farIndex: number = DOCK_MAGNIFICATION_SPREAD + 1;
      expect(instance.itemScale(farIndex)).toBe('');
    });
  });

  // ── Hover state ────────────────────────────────────────────────────────────────

  describe('hover state', (): void => {
    let fixture: ComponentFixture<HostComponent>;
    let instance: Dock;

    beforeEach(async (): Promise<void> => {
      await TestBed.configureTestingModule({
        imports: [HostComponent],
        providers: dockTestProviders(),
      }).compileComponents();

      fixture = TestBed.createComponent(HostComponent);
      fixture.detectChanges();
      instance = getDockInstance(fixture);
    });

    it('should set hoveredIndex on mouseenter', (): void => {
      instance.onItemMouseEnter(1);
      expect(instance.hoveredIndex()).toBe(1);
    });

    it('should reset hoveredIndex to -1 on mouseleave', (): void => {
      instance.onItemMouseEnter(1);
      instance.onItemMouseLeave();
      expect(instance.hoveredIndex()).toBe(-1);
    });
  });

  // ── Click events ───────────────────────────────────────────────────────────────

  describe('click events', (): void => {
    let fixture: ComponentFixture<HostComponent>;
    let host: HostComponent;

    beforeEach(async (): Promise<void> => {
      await TestBed.configureTestingModule({
        imports: [HostComponent],
        providers: dockTestProviders(),
      }).compileComponents();

      fixture = TestBed.createComponent(HostComponent);
      host = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should emit itemClick when a command item is clicked', (): void => {
      const instance: Dock = getDockInstance(fixture);
      const mockItem: DockItem = {
        label: 'Home',
        command: jest.fn() as (event: DockItemCommandEvent) => void,
      };
      const mockEvent: MouseEvent = new MouseEvent('click');

      instance.onItemClick(mockEvent, mockItem);

      expect(host.lastClickEvent()).not.toBeNull();
      expect(host.lastClickEvent()?.item).toBe(mockItem);
    });

    it('should invoke item command callback on click', (): void => {
      const commandMock: jest.Mock = jest.fn();
      const instance: Dock = getDockInstance(fixture);
      const mockItem: DockItem = { label: 'Home', command: commandMock };
      const mockEvent: MouseEvent = new MouseEvent('click');

      instance.onItemClick(mockEvent, mockItem);

      expect(commandMock).toHaveBeenCalledWith({ item: mockItem, originalEvent: mockEvent });
    });

    it('should not emit itemClick when a disabled item is clicked', (): void => {
      const instance: Dock = getDockInstance(fixture);
      const mockItem: DockItem = {
        label: 'Home',
        disabled: true,
        command: jest.fn() as (event: DockItemCommandEvent) => void,
      };
      const mockEvent: MouseEvent = new MouseEvent('click');

      instance.onItemClick(mockEvent, mockItem);

      expect(host.lastClickEvent()).toBeNull();
    });
  });

  // ── Keyboard navigation ────────────────────────────────────────────────────────

  describe('keyboard navigation', (): void => {
    let fixture: ComponentFixture<HostComponent>;
    let host: HostComponent;
    let instance: Dock;

    beforeEach(async (): Promise<void> => {
      await TestBed.configureTestingModule({
        imports: [HostComponent],
        providers: dockTestProviders(),
      }).compileComponents();

      fixture = TestBed.createComponent(HostComponent);
      host = fixture.componentInstance;
      fixture.detectChanges();
      instance = getDockInstance(fixture);
    });

    it('should emit itemClick on Enter key', (): void => {
      const mockItem: DockItem = {
        label: 'Home',
        command: jest.fn() as (event: DockItemCommandEvent) => void,
      };
      const keyEvent: KeyboardEvent = new KeyboardEvent('keydown', { key: 'Enter' });

      instance.onItemKeyDown(keyEvent, mockItem);

      expect(host.lastClickEvent()).not.toBeNull();
    });

    it('should emit itemClick on Space key', (): void => {
      const mockItem: DockItem = {
        label: 'Home',
        command: jest.fn() as (event: DockItemCommandEvent) => void,
      };
      const keyEvent: KeyboardEvent = new KeyboardEvent('keydown', { key: ' ' });

      instance.onItemKeyDown(keyEvent, mockItem);

      expect(host.lastClickEvent()).not.toBeNull();
    });

    it('should not emit itemClick on other keys', (): void => {
      const mockItem: DockItem = {
        label: 'Home',
        command: jest.fn() as (event: DockItemCommandEvent) => void,
      };
      const keyEvent: KeyboardEvent = new KeyboardEvent('keydown', { key: 'Escape' });

      instance.onItemKeyDown(keyEvent, mockItem);

      expect(host.lastClickEvent()).toBeNull();
    });

    it('should not emit itemClick on Enter when item is disabled', (): void => {
      const mockItem: DockItem = {
        label: 'Home',
        command: jest.fn() as (event: DockItemCommandEvent) => void,
        disabled: true,
      };
      const keyEvent: KeyboardEvent = new KeyboardEvent('keydown', { key: 'Enter' });

      instance.onItemKeyDown(keyEvent, mockItem);

      expect(host.lastClickEvent()).toBeNull();
    });
  });

  // ── Disabled items ─────────────────────────────────────────────────────────────

  describe('disabled items', (): void => {
    let fixture: ComponentFixture<HostComponent>;
    let host: HostComponent;

    beforeEach(async (): Promise<void> => {
      await TestBed.configureTestingModule({
        imports: [HostComponent],
        providers: dockTestProviders(),
      }).compileComponents();

      fixture = TestBed.createComponent(HostComponent);
      host = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should apply disabled class to disabled items', (): void => {
      host.items.set([{ label: 'Home', icon: 'lucideAlertCircle', disabled: true }]);
      fixture.detectChanges();

      const items: HTMLElement[] = getListItems(fixture);
      expect(items[0]!.classList.contains('ui-lib-dock__item--disabled')).toBe(true);
    });
  });

  // ── Position variants ──────────────────────────────────────────────────────────

  describe('position variants', (): void => {
    let fixture: ComponentFixture<HostComponent>;
    let host: HostComponent;

    beforeEach(async (): Promise<void> => {
      await TestBed.configureTestingModule({
        imports: [HostComponent],
        providers: dockTestProviders(),
      }).compileComponents();

      fixture = TestBed.createComponent(HostComponent);
      host = fixture.componentInstance;
      fixture.detectChanges();
    });

    const positions: DockPosition[] = ['bottom', 'top', 'left', 'right'];

    positions.forEach((position: DockPosition): void => {
      it(`should apply class for position: ${position}`, (): void => {
        host.position.set(position);
        fixture.detectChanges();

        const el: HTMLElement = getHost(fixture);
        expect(el.classList.contains(`ui-lib-dock--position-${position}`)).toBe(true);
      });
    });
  });

  // ── visibleItems signal ────────────────────────────────────────────────────────

  describe('visibleItems', (): void => {
    let fixture: ComponentFixture<HostComponent>;
    let host: HostComponent;
    let instance: Dock;

    beforeEach(async (): Promise<void> => {
      await TestBed.configureTestingModule({
        imports: [HostComponent],
        providers: dockTestProviders(),
      }).compileComponents();

      fixture = TestBed.createComponent(HostComponent);
      host = fixture.componentInstance;
      fixture.detectChanges();
      instance = getDockInstance(fixture);
    });

    it('should include items where visible is undefined', (): void => {
      host.items.set([{ label: 'Home' }, { label: 'Search' }]);
      fixture.detectChanges();

      expect(instance.visibleItems().length).toBe(2);
    });

    it('should exclude items where visible is false', (): void => {
      host.items.set([{ label: 'Home', visible: false }, { label: 'Search' }]);
      fixture.detectChanges();

      expect(instance.visibleItems().length).toBe(1);
    });
  });
});
