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
import { Breadcrumb, BREADCRUMB_DEFAULT_ARIA_LABEL } from './breadcrumb';
import type {
  BreadcrumbItem,
  BreadcrumbItemClickEvent,
  BreadcrumbSize,
  BreadcrumbVariant,
} from './breadcrumb.types';

// ── Helpers ───────────────────────────────────────────────────────────────────

function getHost(fixture: ComponentFixture<unknown>): HTMLElement {
  return (fixture.nativeElement as HTMLElement).querySelector('ui-lib-breadcrumb') as HTMLElement;
}

function getItems(fixture: ComponentFixture<unknown>): HTMLElement[] {
  return Array.from(
    (fixture.nativeElement as HTMLElement).querySelectorAll<HTMLElement>('.ui-lib-breadcrumb__item')
  );
}

function getSeparators(fixture: ComponentFixture<unknown>): HTMLElement[] {
  return Array.from(
    (fixture.nativeElement as HTMLElement).querySelectorAll<HTMLElement>(
      '.ui-lib-breadcrumb__separator'
    )
  );
}

function getInstance(fixture: ComponentFixture<unknown>): Breadcrumb {
  return fixture.debugElement.query(
    (debugEl: DebugElement): boolean => debugEl.componentInstance instanceof Breadcrumb
  ).componentInstance as Breadcrumb;
}

// ── Host component ────────────────────────────────────────────────────────────

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [Breadcrumb],
  template: `
    <ui-lib-breadcrumb
      [items]="items()"
      [home]="home()"
      [variant]="variant()"
      [size]="size()"
      [styleClass]="styleClass()"
      [ariaLabel]="ariaLabel()"
      (itemClick)="handleItemClick($event)"
    />
  `,
})
class HostComponent {
  public readonly items: WritableSignal<BreadcrumbItem[]> = signal<BreadcrumbItem[]>([
    { label: 'Section', url: '/section' },
    { label: 'Page' },
  ]);
  public readonly home: WritableSignal<BreadcrumbItem | null> = signal<BreadcrumbItem | null>(null);
  public readonly variant: WritableSignal<BreadcrumbVariant> =
    signal<BreadcrumbVariant>('material');
  public readonly size: WritableSignal<BreadcrumbSize> = signal<BreadcrumbSize>('md');
  public readonly styleClass: WritableSignal<string | null> = signal<string | null>(null);
  public readonly ariaLabel: WritableSignal<string> = signal<string>(BREADCRUMB_DEFAULT_ARIA_LABEL);

  public readonly lastClickEvent: WritableSignal<BreadcrumbItemClickEvent | null> =
    signal<BreadcrumbItemClickEvent | null>(null);

  public handleItemClick(event: BreadcrumbItemClickEvent): void {
    this.lastClickEvent.set(event);
  }
}

// ── Host component with separator template ────────────────────────────────────

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [Breadcrumb],
  template: `
    <ui-lib-breadcrumb [items]="[{ label: 'A', url: '/a' }, { label: 'B' }]">
      <ng-template #separator>›</ng-template>
    </ui-lib-breadcrumb>
  `,
})
class HostWithSeparatorComponent {}

// ── Tests ─────────────────────────────────────────────────────────────────────

describe('Breadcrumb', (): void => {
  // ── Creation ────────────────────────────────────────────────────────────────

  describe('Creation', (): void => {
    it('should create the component', async (): Promise<void> => {
      await TestBed.configureTestingModule({
        imports: [HostComponent],
        providers: [provideZonelessChangeDetection(), provideRouter([])],
      }).compileComponents();

      const fixture: ComponentFixture<HostComponent> = TestBed.createComponent(HostComponent);
      fixture.detectChanges();

      expect(getHost(fixture)).toBeTruthy();
    });

    it('should have role="navigation" on the host', async (): Promise<void> => {
      await TestBed.configureTestingModule({
        imports: [HostComponent],
        providers: [provideZonelessChangeDetection(), provideRouter([])],
      }).compileComponents();

      const fixture: ComponentFixture<HostComponent> = TestBed.createComponent(HostComponent);
      fixture.detectChanges();

      expect(getHost(fixture).getAttribute('role')).toBe('navigation');
    });

    it('should have aria-label equal to default', async (): Promise<void> => {
      await TestBed.configureTestingModule({
        imports: [HostComponent],
        providers: [provideZonelessChangeDetection(), provideRouter([])],
      }).compileComponents();

      const fixture: ComponentFixture<HostComponent> = TestBed.createComponent(HostComponent);
      fixture.detectChanges();

      expect(getHost(fixture).getAttribute('aria-label')).toBe(BREADCRUMB_DEFAULT_ARIA_LABEL);
    });
  });

  // ── Items rendering ─────────────────────────────────────────────────────────

  describe('Items rendering', (): void => {
    let fixture: ComponentFixture<HostComponent>;
    let host: HostComponent;

    beforeEach(async (): Promise<void> => {
      await TestBed.configureTestingModule({
        imports: [HostComponent],
        providers: [provideZonelessChangeDetection(), provideRouter([])],
      }).compileComponents();

      fixture = TestBed.createComponent(HostComponent);
      host = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should render <li> for each item', (): void => {
      expect(getItems(fixture).length).toBe(2);
    });

    it('should render home item first when provided', (): void => {
      host.home.set({ label: 'Home', url: '/' });
      fixture.detectChanges();

      const items: HTMLElement[] = getItems(fixture);
      expect(items.length).toBe(3);
    });

    it('should prepend home before items', (): void => {
      host.home.set({ label: 'Home', url: '/' });
      fixture.detectChanges();

      const firstLink: HTMLElement | null = (fixture.nativeElement as HTMLElement).querySelector(
        '.ui-lib-breadcrumb__item:first-child .ui-lib-breadcrumb__link'
      );
      expect((firstLink?.textContent ?? '').trim()).toBe('Home');
    });
  });

  // ── Link rendering ─────────────────────────────────────────────────────────

  describe('Link rendering', (): void => {
    let fixture: ComponentFixture<HostComponent>;
    let host: HostComponent;

    beforeEach(async (): Promise<void> => {
      await TestBed.configureTestingModule({
        imports: [HostComponent],
        providers: [provideZonelessChangeDetection(), provideRouter([])],
      }).compileComponents();

      fixture = TestBed.createComponent(HostComponent);
      host = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should render <a> for clickable items with url', (): void => {
      const link: HTMLElement | null = (fixture.nativeElement as HTMLElement).querySelector(
        '.ui-lib-breadcrumb__item:first-child a'
      );
      expect(link).toBeTruthy();
    });

    it('should render <button> for command-only items', (): void => {
      const commandSpy: jest.Mock = jest.fn();
      host.items.set([{ label: 'Action', command: commandSpy }, { label: 'Current' }]);
      fixture.detectChanges();

      const button: HTMLElement | null = (fixture.nativeElement as HTMLElement).querySelector(
        '.ui-lib-breadcrumb__item:first-child button'
      );
      expect(button).toBeTruthy();
    });

    it('should render <a> with href for url items', (): void => {
      const link: HTMLAnchorElement | null = (
        fixture.nativeElement as HTMLElement
      ).querySelector<HTMLAnchorElement>('.ui-lib-breadcrumb__item:first-child a');
      expect(link?.href).toContain('/section');
    });
  });

  // ── Active / current item ───────────────────────────────────────────────────

  describe('Active/current item', (): void => {
    let fixture: ComponentFixture<HostComponent>;

    beforeEach(async (): Promise<void> => {
      await TestBed.configureTestingModule({
        imports: [HostComponent],
        providers: [provideZonelessChangeDetection(), provideRouter([])],
      }).compileComponents();

      fixture = TestBed.createComponent(HostComponent);
      fixture.detectChanges();
    });

    it('should render <span> (not <a>) for the last item', (): void => {
      const lastItem: HTMLElement = getItems(fixture)[getItems(fixture).length - 1] as HTMLElement;
      const anchor: HTMLAnchorElement | null = lastItem.querySelector<HTMLAnchorElement>('a');
      const current: HTMLElement | null = lastItem.querySelector<HTMLElement>(
        '.ui-lib-breadcrumb__current'
      );

      expect(anchor).toBeNull();
      expect(current).toBeTruthy();
    });

    it('should add aria-current="page" to the last item', (): void => {
      const lastItem: HTMLElement = getItems(fixture)[getItems(fixture).length - 1] as HTMLElement;
      const current: HTMLElement | null = lastItem.querySelector<HTMLElement>(
        '.ui-lib-breadcrumb__current'
      );

      expect(current?.getAttribute('aria-current')).toBe('page');
    });

    it('should NOT add aria-current to non-last items', (): void => {
      const firstLink: HTMLElement | null = (fixture.nativeElement as HTMLElement).querySelector(
        '.ui-lib-breadcrumb__item:first-child .ui-lib-breadcrumb__current'
      );
      // First item is rendered as a link (<a>), not a current span, so querySelector returns null
      expect(firstLink).toBeNull();
    });
  });

  // ── Disabled items ──────────────────────────────────────────────────────────

  describe('Disabled items', (): void => {
    let fixture: ComponentFixture<HostComponent>;
    let host: HostComponent;

    beforeEach(async (): Promise<void> => {
      await TestBed.configureTestingModule({
        imports: [HostComponent],
        providers: [provideZonelessChangeDetection(), provideRouter([])],
      }).compileComponents();

      fixture = TestBed.createComponent(HostComponent);
      host = fixture.componentInstance;
      host.items.set([{ label: 'Disabled', url: '/x', disabled: true }, { label: 'Page' }]);
      fixture.detectChanges();
    });

    it('should render disabled item as <span> with aria-disabled', (): void => {
      const disabledSpan: HTMLElement | null = (fixture.nativeElement as HTMLElement).querySelector(
        '[aria-disabled="true"]'
      );
      expect(disabledSpan).toBeTruthy();
    });

    it('should not emit itemClick for disabled items', (): void => {
      const instance: Breadcrumb = getInstance(fixture);
      const emitSpy: jest.SpiedFunction<typeof instance.itemClick.emit> = jest.spyOn(
        instance.itemClick,
        'emit'
      );
      const disabledItem: BreadcrumbItem = { label: 'Disabled', disabled: true };
      const fakeEvent: MouseEvent = new MouseEvent('click');
      instance.onItemClick(fakeEvent, disabledItem);

      expect(emitSpy).not.toHaveBeenCalled();
    });
  });

  // ── Separators ──────────────────────────────────────────────────────────────

  describe('Separators', (): void => {
    let fixture: ComponentFixture<HostComponent>;
    let host: HostComponent;

    beforeEach(async (): Promise<void> => {
      await TestBed.configureTestingModule({
        imports: [HostComponent],
        providers: [provideZonelessChangeDetection(), provideRouter([])],
      }).compileComponents();

      fixture = TestBed.createComponent(HostComponent);
      host = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should render n-1 separators for n items', (): void => {
      host.items.set([{ label: 'A', url: '/a' }, { label: 'B', url: '/b' }, { label: 'C' }]);
      fixture.detectChanges();

      expect(getSeparators(fixture).length).toBe(2);
    });

    it('should render no separator after the last item', (): void => {
      const items: HTMLElement[] = getItems(fixture);
      const lastItem: HTMLElement = items[items.length - 1] as HTMLElement;
      const sep: HTMLElement | null = lastItem.querySelector<HTMLElement>(
        '.ui-lib-breadcrumb__separator'
      );

      expect(sep).toBeNull();
    });
  });

  // ── Custom separator template ────────────────────────────────────────────────

  describe('Custom separator template', (): void => {
    it('should render custom separator when template is projected', async (): Promise<void> => {
      await TestBed.configureTestingModule({
        imports: [HostWithSeparatorComponent],
        providers: [provideZonelessChangeDetection(), provideRouter([])],
      }).compileComponents();

      const fixture: ComponentFixture<HostWithSeparatorComponent> = TestBed.createComponent(
        HostWithSeparatorComponent
      );
      fixture.detectChanges();

      const separators: HTMLElement[] = Array.from(
        (fixture.nativeElement as HTMLElement).querySelectorAll<HTMLElement>(
          '.ui-lib-breadcrumb__separator'
        )
      );
      const firstSeparator: HTMLElement = separators[0] as HTMLElement;
      expect(separators.length).toBeGreaterThan(0);
      expect((firstSeparator.textContent as string).trim()).toBe('›');
    });
  });

  // ── Variant classes ─────────────────────────────────────────────────────────

  describe('Variant classes', (): void => {
    let fixture: ComponentFixture<HostComponent>;
    let host: HostComponent;

    beforeEach(async (): Promise<void> => {
      await TestBed.configureTestingModule({
        imports: [HostComponent],
        providers: [provideZonelessChangeDetection(), provideRouter([])],
      }).compileComponents();

      fixture = TestBed.createComponent(HostComponent);
      host = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should apply variant-material class', (): void => {
      host.variant.set('material');
      fixture.detectChanges();
      expect(getHost(fixture).classList).toContain('ui-lib-breadcrumb--variant-material');
    });

    it('should apply variant-bootstrap class', (): void => {
      host.variant.set('bootstrap');
      fixture.detectChanges();
      expect(getHost(fixture).classList).toContain('ui-lib-breadcrumb--variant-bootstrap');
    });

    it('should apply variant-minimal class', (): void => {
      host.variant.set('minimal');
      fixture.detectChanges();
      expect(getHost(fixture).classList).toContain('ui-lib-breadcrumb--variant-minimal');
    });
  });

  // ── Size classes ─────────────────────────────────────────────────────────────

  describe('Size classes', (): void => {
    let fixture: ComponentFixture<HostComponent>;
    let host: HostComponent;

    beforeEach(async (): Promise<void> => {
      await TestBed.configureTestingModule({
        imports: [HostComponent],
        providers: [provideZonelessChangeDetection(), provideRouter([])],
      }).compileComponents();

      fixture = TestBed.createComponent(HostComponent);
      host = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should apply size-sm class', (): void => {
      host.size.set('sm');
      fixture.detectChanges();
      expect(getHost(fixture).classList).toContain('ui-lib-breadcrumb--size-sm');
    });

    it('should apply size-md class', (): void => {
      host.size.set('md');
      fixture.detectChanges();
      expect(getHost(fixture).classList).toContain('ui-lib-breadcrumb--size-md');
    });

    it('should apply size-lg class', (): void => {
      host.size.set('lg');
      fixture.detectChanges();
      expect(getHost(fixture).classList).toContain('ui-lib-breadcrumb--size-lg');
    });
  });

  // ── Events ──────────────────────────────────────────────────────────────────

  describe('Events', (): void => {
    let fixture: ComponentFixture<HostComponent>;
    let _host: HostComponent;

    beforeEach(async (): Promise<void> => {
      await TestBed.configureTestingModule({
        imports: [HostComponent],
        providers: [provideZonelessChangeDetection(), provideRouter([])],
      }).compileComponents();

      fixture = TestBed.createComponent(HostComponent);
      _host = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should emit itemClick when a link is clicked', (): void => {
      const instance: Breadcrumb = getInstance(fixture);
      const emitSpy: jest.SpiedFunction<typeof instance.itemClick.emit> = jest.spyOn(
        instance.itemClick,
        'emit'
      );
      const item: BreadcrumbItem = { label: 'Section', url: '/section' };
      const fakeEvent: MouseEvent = new MouseEvent('click');
      instance.onItemClick(fakeEvent, item);

      expect(emitSpy).toHaveBeenCalledWith({
        item,
        originalEvent: fakeEvent,
      });
    });

    it('should call item.command when the item has one', (): void => {
      const commandSpy: jest.Mock = jest.fn();
      const item: BreadcrumbItem = { label: 'Action', command: commandSpy };
      const instance: Breadcrumb = getInstance(fixture);
      const fakeEvent: MouseEvent = new MouseEvent('click');
      instance.onItemClick(fakeEvent, item);

      expect(commandSpy).toHaveBeenCalledWith({ item, originalEvent: fakeEvent });
    });

    it('should NOT emit itemClick for disabled items', (): void => {
      const instance: Breadcrumb = getInstance(fixture);
      const emitSpy: jest.SpiedFunction<typeof instance.itemClick.emit> = jest.spyOn(
        instance.itemClick,
        'emit'
      );
      const item: BreadcrumbItem = { label: 'Disabled', url: '/x', disabled: true };
      const fakeEvent: MouseEvent = new MouseEvent('click');
      instance.onItemClick(fakeEvent, item);

      expect(emitSpy).not.toHaveBeenCalled();
    });
  });

  // ── Keyboard ─────────────────────────────────────────────────────────────────

  describe('Keyboard', (): void => {
    let fixture: ComponentFixture<HostComponent>;

    beforeEach(async (): Promise<void> => {
      await TestBed.configureTestingModule({
        imports: [HostComponent],
        providers: [provideZonelessChangeDetection(), provideRouter([])],
      }).compileComponents();

      fixture = TestBed.createComponent(HostComponent);
      fixture.detectChanges();
    });

    it('should emit itemClick on Enter key', (): void => {
      const instance: Breadcrumb = getInstance(fixture);
      const emitSpy: jest.SpiedFunction<typeof instance.itemClick.emit> = jest.spyOn(
        instance.itemClick,
        'emit'
      );
      const commandSpy: jest.Mock = jest.fn();
      const item: BreadcrumbItem = { label: 'Action', command: commandSpy };
      const event: KeyboardEvent = new KeyboardEvent('keydown', { key: 'Enter' });
      instance.onItemKeyDown(event, item);

      expect(emitSpy).toHaveBeenCalledWith({ item, originalEvent: event });
    });

    it('should emit itemClick on Space key', (): void => {
      const instance: Breadcrumb = getInstance(fixture);
      const emitSpy: jest.SpiedFunction<typeof instance.itemClick.emit> = jest.spyOn(
        instance.itemClick,
        'emit'
      );
      const commandSpy: jest.Mock = jest.fn();
      const item: BreadcrumbItem = { label: 'Action', command: commandSpy };
      const event: KeyboardEvent = new KeyboardEvent('keydown', { key: ' ' });
      instance.onItemKeyDown(event, item);

      expect(emitSpy).toHaveBeenCalledWith({ item, originalEvent: event });
    });

    it('should NOT emit for other keys', (): void => {
      const instance: Breadcrumb = getInstance(fixture);
      const emitSpy: jest.SpiedFunction<typeof instance.itemClick.emit> = jest.spyOn(
        instance.itemClick,
        'emit'
      );
      const commandSpy: jest.Mock = jest.fn();
      const item: BreadcrumbItem = { label: 'Action', command: commandSpy };
      const event: KeyboardEvent = new KeyboardEvent('keydown', { key: 'Tab' });
      instance.onItemKeyDown(event, item);

      expect(emitSpy).not.toHaveBeenCalled();
    });
  });

  // ── ARIA ─────────────────────────────────────────────────────────────────────

  describe('ARIA', (): void => {
    let fixture: ComponentFixture<HostComponent>;
    let host: HostComponent;

    beforeEach(async (): Promise<void> => {
      await TestBed.configureTestingModule({
        imports: [HostComponent],
        providers: [provideZonelessChangeDetection(), provideRouter([])],
      }).compileComponents();

      fixture = TestBed.createComponent(HostComponent);
      host = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should update aria-label when ariaLabel input changes', (): void => {
      host.ariaLabel.set('Custom Nav');
      fixture.detectChanges();

      expect(getHost(fixture).getAttribute('aria-label')).toBe('Custom Nav');
    });

    it('should NOT add aria-current to home item', (): void => {
      host.home.set({ label: 'Home', url: '/' });
      fixture.detectChanges();

      const firstItem: HTMLElement = getItems(fixture)[0] as HTMLElement;
      const current: HTMLElement | null =
        firstItem.querySelector<HTMLElement>('[aria-current="page"]');
      expect(current).toBeNull();
    });
  });

  // ── styleClass ───────────────────────────────────────────────────────────────

  describe('styleClass', (): void => {
    let fixture: ComponentFixture<HostComponent>;
    let host: HostComponent;

    beforeEach(async (): Promise<void> => {
      await TestBed.configureTestingModule({
        imports: [HostComponent],
        providers: [provideZonelessChangeDetection(), provideRouter([])],
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

  // ── isClickable ───────────────────────────────────────────────────────────────

  describe('isClickable()', (): void => {
    let fixture: ComponentFixture<HostComponent>;

    beforeEach(async (): Promise<void> => {
      await TestBed.configureTestingModule({
        imports: [HostComponent],
        providers: [provideZonelessChangeDetection(), provideRouter([])],
      }).compileComponents();

      fixture = TestBed.createComponent(HostComponent);
      fixture.detectChanges();
    });

    it('should return true for items with url', (): void => {
      expect(getInstance(fixture).isClickable({ url: '/test' })).toBe(true);
    });

    it('should return true for items with routerLink', (): void => {
      expect(getInstance(fixture).isClickable({ routerLink: '/test' })).toBe(true);
    });

    it('should return true for items with command', (): void => {
      const commandSpy: jest.Mock = jest.fn();
      expect(getInstance(fixture).isClickable({ command: commandSpy })).toBe(true);
    });

    it('should return false for disabled items', (): void => {
      expect(getInstance(fixture).isClickable({ url: '/test', disabled: true })).toBe(false);
    });

    it('should return false for items with no navigation target', (): void => {
      expect(getInstance(fixture).isClickable({ label: 'Static' })).toBe(false);
    });
  });
});
