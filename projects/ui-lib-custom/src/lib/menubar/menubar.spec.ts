import {
  ChangeDetectionStrategy,
  Component,
  provideZonelessChangeDetection,
  signal,
  type DebugElement,
  type WritableSignal,
} from '@angular/core';
import { TestBed, type ComponentFixture } from '@angular/core/testing';
import { Menubar, MENUBAR_DEFAULT_ARIA_LABEL } from './menubar';
import type { MenubarCommandEvent, MenubarItem } from './menubar.types';

// ── Helpers ────────────────────────────────────────────────────────────────────

function getRoot(fixture: ComponentFixture<unknown>): HTMLElement {
  return (fixture.nativeElement as HTMLElement).querySelector('ui-lib-menubar') as HTMLElement;
}

function getInstance(fixture: ComponentFixture<unknown>): Menubar {
  return fixture.debugElement.query(
    (debugEl: DebugElement): boolean => debugEl.componentInstance instanceof Menubar
  ).componentInstance as Menubar;
}

function getRootLinks(fixture: ComponentFixture<unknown>): HTMLElement[] {
  return Array.from(
    (fixture.nativeElement as HTMLElement).querySelectorAll<HTMLElement>(
      '.ui-lib-menubar__root-link'
    )
  );
}

function getRootItems(fixture: ComponentFixture<unknown>): HTMLElement[] {
  return Array.from(
    (fixture.nativeElement as HTMLElement).querySelectorAll<HTMLElement>(
      'ul[role="menubar"] > .ui-lib-menubar__root-item'
    )
  );
}

function getPanel(fixture: ComponentFixture<unknown>): HTMLElement | null {
  return (fixture.nativeElement as HTMLElement).querySelector<HTMLElement>(
    '.ui-lib-menubar__panel'
  );
}

function getSubLinks(fixture: ComponentFixture<unknown>): HTMLElement[] {
  return Array.from(
    (fixture.nativeElement as HTMLElement).querySelectorAll<HTMLElement>(
      '.ui-lib-menubar__sub-link'
    )
  );
}

function getToggleButton(fixture: ComponentFixture<unknown>): HTMLElement {
  return (fixture.nativeElement as HTMLElement).querySelector<HTMLElement>(
    'button.ui-lib-menubar__toggle'
  ) as HTMLElement;
}

// ── Fixtures ───────────────────────────────────────────────────────────────────

const BASIC_ITEMS: MenubarItem[] = [
  { label: 'File', items: [{ label: 'New' }, { label: 'Open' }, { label: 'Save' }] },
  { label: 'Edit', items: [{ label: 'Cut' }, { label: 'Copy' }, { label: 'Paste' }] },
  { label: 'View' },
  { label: 'Help', url: 'https://example.com/help', target: '_blank' },
];

@Component({
  selector: 'app-menubar-host',
  standalone: true,
  imports: [Menubar],
  template: `
    <ui-lib-menubar
      [model]="model()"
      [variant]="variant()"
      [size]="size()"
      [styleClass]="styleClass()"
      [ariaLabel]="ariaLabel()"
      (itemClick)="onItemClick($event)"
    />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class MenubarHostComponent {
  public readonly model: WritableSignal<MenubarItem[]> = signal<MenubarItem[]>(BASIC_ITEMS);
  public readonly variant: WritableSignal<'material' | 'bootstrap' | 'minimal'> = signal<
    'material' | 'bootstrap' | 'minimal'
  >('material');
  public readonly size: WritableSignal<'sm' | 'md' | 'lg'> = signal<'sm' | 'md' | 'lg'>('md');
  public readonly styleClass: WritableSignal<string | null> = signal<string | null>(null);
  public readonly ariaLabel: WritableSignal<string> = signal<string>(MENUBAR_DEFAULT_ARIA_LABEL);
  public lastEvent: MenubarCommandEvent | null = null;

  public onItemClick(event: MenubarCommandEvent): void {
    this.lastEvent = event;
  }
}

// ── Test suite ─────────────────────────────────────────────────────────────────

describe('Menubar', (): void => {
  let fixture: ComponentFixture<MenubarHostComponent>;
  let host: MenubarHostComponent;

  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({
      imports: [MenubarHostComponent],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    fixture = TestBed.createComponent(MenubarHostComponent);
    host = fixture.componentInstance;
    fixture.detectChanges();
  });

  // ── Rendering ────────────────────────────────────────────────────────────────

  it('should create the component', (): void => {
    const hostEl: HTMLElement = getRoot(fixture);
    expect(hostEl).toBeTruthy();
  });

  it('should render a nav element with aria-label', (): void => {
    const nav: HTMLElement | null = (
      fixture.nativeElement as HTMLElement
    ).querySelector<HTMLElement>('nav.ui-lib-menubar__nav');
    expect(nav).toBeTruthy();
    expect(nav?.getAttribute('aria-label')).toBe(MENUBAR_DEFAULT_ARIA_LABEL);
  });

  it('should apply custom ariaLabel', (): void => {
    host.ariaLabel.set('Site navigation');
    fixture.detectChanges();
    const nav: HTMLElement | null = (
      fixture.nativeElement as HTMLElement
    ).querySelector<HTMLElement>('nav');
    expect(nav?.getAttribute('aria-label')).toBe('Site navigation');
  });

  it('should render a root list with role="menubar"', (): void => {
    const rootList: HTMLElement | null = (
      fixture.nativeElement as HTMLElement
    ).querySelector<HTMLElement>('ul[role="menubar"]');
    expect(rootList).toBeTruthy();
  });

  it('should render the correct number of root items', (): void => {
    expect(getRootItems(fixture).length).toBe(4);
  });

  it('should render root item labels', (): void => {
    const labels: HTMLElement[] = Array.from(
      (fixture.nativeElement as HTMLElement).querySelectorAll<HTMLElement>(
        '.ui-lib-menubar__root-label'
      )
    );
    const texts: string[] = labels.map((el: HTMLElement): string => (el.textContent || '').trim());
    expect(texts).toContain('File');
    expect(texts).toContain('Edit');
    expect(texts).toContain('View');
    expect(texts).toContain('Help');
  });

  it('should render a caret on items with sub-items', (): void => {
    const carets: HTMLElement[] = Array.from(
      (fixture.nativeElement as HTMLElement).querySelectorAll<HTMLElement>(
        '.ui-lib-menubar__root-caret'
      )
    );
    // File and Edit have items; View and Help do not
    expect(carets.length).toBe(2);
  });

  it('should render a url item as an <a href>', (): void => {
    const helpLink: HTMLElement | null = (
      fixture.nativeElement as HTMLElement
    ).querySelector<HTMLElement>('a.ui-lib-menubar__root-link[href="https://example.com/help"]');
    expect(helpLink).toBeTruthy();
    expect(helpLink?.getAttribute('target')).toBe('_blank');
  });

  // ── Host classes ─────────────────────────────────────────────────────────────

  it('should apply variant class to the host', (): void => {
    const hostEl: HTMLElement = getRoot(fixture);
    expect(hostEl.classList).toContain('ui-lib-menubar--variant-material');
  });

  it('should apply size class to the host', (): void => {
    const hostEl: HTMLElement = getRoot(fixture);
    expect(hostEl.classList).toContain('ui-lib-menubar--size-md');
  });

  it('should update variant class when variant input changes', (): void => {
    host.variant.set('bootstrap');
    fixture.detectChanges();
    const hostEl: HTMLElement = getRoot(fixture);
    expect(hostEl.classList).toContain('ui-lib-menubar--variant-bootstrap');
    expect(hostEl.classList).not.toContain('ui-lib-menubar--variant-material');
  });

  it('should update size class when size input changes', (): void => {
    host.size.set('lg');
    fixture.detectChanges();
    const hostEl: HTMLElement = getRoot(fixture);
    expect(hostEl.classList).toContain('ui-lib-menubar--size-lg');
  });

  it('should apply extra styleClass to the host', (): void => {
    host.styleClass.set('my-custom-bar');
    fixture.detectChanges();
    const hostEl: HTMLElement = getRoot(fixture);
    expect(hostEl.classList).toContain('my-custom-bar');
  });

  // ── Panel open/close ──────────────────────────────────────────────────────────

  it('should open dropdown panel on root item click', (): void => {
    const fileLink: HTMLElement = getRootLinks(fixture)[0] as HTMLElement;
    fileLink.click();
    fixture.detectChanges();
    expect(getPanel(fixture)).toBeTruthy();
  });

  it('should close panel when same root item is clicked again', (): void => {
    const fileLink: HTMLElement = getRootLinks(fixture)[0] as HTMLElement;
    fileLink.click();
    fixture.detectChanges();
    fileLink.click();
    fixture.detectChanges();
    expect(getPanel(fixture)).toBeNull();
  });

  it('should add active class to open root item', (): void => {
    const fileLink: HTMLElement = getRootLinks(fixture)[0] as HTMLElement;
    fileLink.click();
    fixture.detectChanges();
    const activeItem: HTMLElement | null = (
      fixture.nativeElement as HTMLElement
    ).querySelector<HTMLElement>('.ui-lib-menubar__root-item--active');
    expect(activeItem).toBeTruthy();
  });

  it('should render submenu items inside the panel', (): void => {
    const fileLink: HTMLElement = getRootLinks(fixture)[0] as HTMLElement;
    fileLink.click();
    fixture.detectChanges();
    expect(getSubLinks(fixture).length).toBeGreaterThan(0);
  });

  it('should close panel on global Escape keydown', (): void => {
    const fileLink: HTMLElement = getRootLinks(fixture)[0] as HTMLElement;
    fileLink.click();
    fixture.detectChanges();
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    fixture.detectChanges();
    expect(getPanel(fixture)).toBeNull();
  });

  it('should open panels sequentially — only one panel open at a time', (): void => {
    const fileLink: HTMLElement = getRootLinks(fixture)[0] as HTMLElement;
    const editLink: HTMLElement = getRootLinks(fixture)[1] as HTMLElement;
    fileLink.click();
    fixture.detectChanges();
    editLink.click();
    fixture.detectChanges();
    const panels: HTMLElement[] = Array.from(
      (fixture.nativeElement as HTMLElement).querySelectorAll<HTMLElement>('.ui-lib-menubar__panel')
    );
    expect(panels.length).toBe(1);
  });

  it('should expose activeIndex on the component instance', (): void => {
    const instance: Menubar = getInstance(fixture);
    expect(instance.activeIndex()).toBe(-1);
    const fileLink: HTMLElement = getRootLinks(fixture)[0] as HTMLElement;
    fileLink.click();
    fixture.detectChanges();
    expect(instance.activeIndex()).toBe(0);
  });

  // ── itemClick output ──────────────────────────────────────────────────────────

  it('should emit itemClick when a sub-item is activated', (): void => {
    const fileLink: HTMLElement = getRootLinks(fixture)[0] as HTMLElement;
    fileLink.click();
    fixture.detectChanges();
    const firstSubLink: HTMLElement = getSubLinks(fixture)[0] as HTMLElement;
    firstSubLink.click();
    fixture.detectChanges();
    expect(host.lastEvent?.item.label).toBe('New');
  });

  it('should close the panel after sub-item click', (): void => {
    const fileLink: HTMLElement = getRootLinks(fixture)[0] as HTMLElement;
    fileLink.click();
    fixture.detectChanges();
    const firstSubLink: HTMLElement = getSubLinks(fixture)[0] as HTMLElement;
    firstSubLink.click();
    fixture.detectChanges();
    expect(getPanel(fixture)).toBeNull();
  });

  // ── Disabled items ────────────────────────────────────────────────────────────

  it('should add disabled class to disabled root items', (): void => {
    host.model.set([{ label: 'Disabled', disabled: true }]);
    fixture.detectChanges();
    const disabledItem: HTMLElement | null = (
      fixture.nativeElement as HTMLElement
    ).querySelector<HTMLElement>('.ui-lib-menubar__root-item--disabled');
    expect(disabledItem).toBeTruthy();
  });

  it('should not open panel on click of disabled root item', (): void => {
    host.model.set([{ label: 'Disabled', disabled: true, items: [{ label: 'Child' }] }]);
    fixture.detectChanges();
    getRootLinks(fixture)[0]?.click();
    fixture.detectChanges();
    expect(getPanel(fixture)).toBeNull();
  });

  it('should not render hidden items', (): void => {
    host.model.set([{ label: 'Visible' }, { label: 'Hidden', visible: false }]);
    fixture.detectChanges();
    expect(getRootItems(fixture).length).toBe(1);
  });

  it('should set aria-disabled on disabled root link', (): void => {
    host.model.set([{ label: 'Disabled', disabled: true }]);
    fixture.detectChanges();
    const link: HTMLElement | null = (
      fixture.nativeElement as HTMLElement
    ).querySelector<HTMLElement>('a.ui-lib-menubar__root-link');
    expect(link?.getAttribute('aria-disabled')).toBe('true');
  });

  // ── Root item command ─────────────────────────────────────────────────────────

  it('should invoke command callback on leaf root item click', (): void => {
    const commandSpy: jest.Mock = jest.fn();
    host.model.set([{ label: 'Action', command: commandSpy }]);
    fixture.detectChanges();
    getRootLinks(fixture)[0]?.click();
    expect(commandSpy).toHaveBeenCalledTimes(1);
  });

  // ── Mobile toggle ─────────────────────────────────────────────────────────────

  it('should render a mobile toggle button', (): void => {
    const toggle: HTMLElement = getToggleButton(fixture);
    expect(toggle).toBeTruthy();
  });

  it('should have aria-expanded="false" on toggle button initially', (): void => {
    const toggle: HTMLElement = getToggleButton(fixture);
    expect(toggle.getAttribute('aria-expanded')).toBe('false');
  });

  it('should toggle mobile menu on button click', (): void => {
    const toggle: HTMLElement = getToggleButton(fixture);
    toggle.click();
    fixture.detectChanges();
    expect(toggle.getAttribute('aria-expanded')).toBe('true');
    const rootList: HTMLElement | null = (
      fixture.nativeElement as HTMLElement
    ).querySelector<HTMLElement>('ul[role="menubar"]');
    expect(rootList?.classList).toContain('ui-lib-menubar__root-list--open');
  });

  it('should close panel when mobile menu is toggled off', (): void => {
    const instance: Menubar = getInstance(fixture);
    instance.activeIndex.set(0);
    fixture.detectChanges();
    const toggle: HTMLElement = getToggleButton(fixture);
    toggle.click(); // open
    fixture.detectChanges();
    toggle.click(); // close
    fixture.detectChanges();
    expect(instance.mobileMenuOpen()).toBe(false);
    expect(instance.activeIndex()).toBe(-1);
  });

  // ── MENUBAR_DEFAULT_ARIA_LABEL export ─────────────────────────────────────────

  it('should export MENUBAR_DEFAULT_ARIA_LABEL constant', (): void => {
    expect(MENUBAR_DEFAULT_ARIA_LABEL).toBe('Navigation');
  });

  // ── Keyboard navigation ───────────────────────────────────────────────────────

  it('should open panel on ArrowDown keydown on a root item with sub-items', (): void => {
    const fileLink: HTMLElement = getRootLinks(fixture)[0] as HTMLElement;
    fileLink.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
    fixture.detectChanges();
    expect(getPanel(fixture)).toBeTruthy();
  });

  it('should open panel on Enter keydown on a root item with sub-items', (): void => {
    const fileLink: HTMLElement = getRootLinks(fixture)[0] as HTMLElement;
    fileLink.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
    fixture.detectChanges();
    expect(getPanel(fixture)).toBeTruthy();
  });

  it('should close panel on Escape keydown at root level', (): void => {
    const fileLink: HTMLElement = getRootLinks(fixture)[0] as HTMLElement;
    fileLink.click();
    fixture.detectChanges();
    fileLink.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
    fixture.detectChanges();
    expect(getPanel(fixture)).toBeNull();
  });

  it('should invoke leaf root item command on Space keydown', (): void => {
    const commandSpy: jest.Mock = jest.fn();
    host.model.set([{ label: 'Action', command: commandSpy }]);
    fixture.detectChanges();
    const link: HTMLElement = getRootLinks(fixture)[0] as HTMLElement;
    link.dispatchEvent(new KeyboardEvent('keydown', { key: ' ', bubbles: true }));
    expect(commandSpy).toHaveBeenCalledTimes(1);
  });

  // ── Separators ────────────────────────────────────────────────────────────────

  it('should render root separators', (): void => {
    host.model.set([{ label: 'File' }, { separator: true }, { label: 'Help' }]);
    fixture.detectChanges();
    const separator: HTMLElement | null = (
      fixture.nativeElement as HTMLElement
    ).querySelector<HTMLElement>('.ui-lib-menubar__root-separator[role="separator"]');
    expect(separator).toBeTruthy();
  });

  it('should render sub-item separators inside the panel', (): void => {
    host.model.set([
      {
        label: 'File',
        items: [{ label: 'New' }, { separator: true }, { label: 'Open' }],
      },
    ]);
    fixture.detectChanges();
    getRootLinks(fixture)[0]?.click();
    fixture.detectChanges();
    const subSeparator: HTMLElement | null = (
      fixture.nativeElement as HTMLElement
    ).querySelector<HTMLElement>('.ui-lib-menubar__sub-separator[role="separator"]');
    expect(subSeparator).toBeTruthy();
  });

  // ── Nested sub-items ──────────────────────────────────────────────────────────

  it('should render a sub-caret for sub-items that have children', (): void => {
    host.model.set([
      {
        label: 'Edit',
        items: [
          {
            label: 'Selection',
            items: [{ label: 'Select All' }, { label: 'Deselect' }],
          },
        ],
      },
    ]);
    fixture.detectChanges();
    getRootLinks(fixture)[0]?.click();
    fixture.detectChanges();
    const subCaret: HTMLElement | null = (
      fixture.nativeElement as HTMLElement
    ).querySelector<HTMLElement>('.ui-lib-menubar__sub-caret');
    expect(subCaret).toBeTruthy();
  });

  it('should set aria-haspopup="menu" on root items with sub-items', (): void => {
    const fileLink: HTMLElement = getRootLinks(fixture)[0] as HTMLElement;
    expect(fileLink.getAttribute('aria-haspopup')).toBe('menu');
  });

  it('should set aria-expanded on open root items', (): void => {
    const fileLink: HTMLElement = getRootLinks(fixture)[0] as HTMLElement;
    expect(fileLink.getAttribute('aria-expanded')).toBe('false');
    fileLink.click();
    fixture.detectChanges();
    expect(fileLink.getAttribute('aria-expanded')).toBe('true');
  });

  // ── Model update ──────────────────────────────────────────────────────────────

  it('should re-render when model changes', (): void => {
    host.model.set([{ label: 'New Item' }]);
    fixture.detectChanges();
    const labels: HTMLElement[] = Array.from(
      (fixture.nativeElement as HTMLElement).querySelectorAll<HTMLElement>(
        '.ui-lib-menubar__root-label'
      )
    );
    expect(((labels[0] as HTMLElement).textContent || '').trim()).toBe('New Item');
  });
});
