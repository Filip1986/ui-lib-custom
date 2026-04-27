import {
  ChangeDetectionStrategy,
  Component,
  provideZonelessChangeDetection,
  signal,
  type WritableSignal,
  type DebugElement,
} from '@angular/core';
import { By } from '@angular/platform-browser';
import { provideRouter, Router } from '@angular/router';
import { TestBed } from '@angular/core/testing';
import type { ComponentFixture } from '@angular/core/testing';
import { provideIcons } from '@ng-icons/core';
import { lucidePencil, lucideTrash } from '@ng-icons/lucide';
import { provideUiLibIcons } from 'ui-lib-custom/icon';
import { SplitButtonComponent } from './split-button.component';
import type {
  SplitButtonClickEvent,
  SplitButtonItem,
  SplitButtonItemCommandEvent,
  SplitButtonMenuHideEvent,
  SplitButtonMenuShowEvent,
  SplitButtonSeverity,
  SplitButtonSize,
  SplitButtonVariant,
} from './split-button.types';

@Component({
  standalone: true,
  imports: [SplitButtonComponent],
  template: `
    <ui-lib-split-button
      [label]="label()"
      [icon]="icon()"
      [iconPosition]="iconPosition()"
      [model]="model()"
      [severity]="severity()"
      [variant]="variant()"
      [size]="size()"
      [disabled]="disabled()"
      [buttonDisabled]="buttonDisabled()"
      [menuButtonDisabled]="menuButtonDisabled()"
      [loading]="loading()"
      [loadingIcon]="loadingIcon()"
      [raised]="raised()"
      [rounded]="rounded()"
      [text]="text()"
      [outlined]="outlined()"
      [dropdownIcon]="dropdownIcon()"
      [buttonAriaLabel]="buttonAriaLabel()"
      [menuButtonAriaLabel]="menuButtonAriaLabel()"
      [tabindex]="tabindex()"
      [styleClass]="styleClass()"
      (onClick)="handleClick($event)"
      (onMenuShow)="handleMenuShow($event)"
      (onMenuHide)="handleMenuHide($event)"
      (onItemCommand)="handleItemCommand($event)"
    />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class SplitButtonHostComponent {
  public label: WritableSignal<string> = signal<string>('Primary Action');
  public icon: WritableSignal<string | null> = signal<string | null>(null);
  public iconPosition: WritableSignal<'left' | 'right'> = signal<'left' | 'right'>('left');
  public model: WritableSignal<readonly SplitButtonItem[]> = signal<readonly SplitButtonItem[]>([
    { label: 'Edit', icon: 'pencil' },
    { label: 'Delete', icon: 'trash' },
  ]);
  public severity: WritableSignal<SplitButtonSeverity> = signal<SplitButtonSeverity>('primary');
  public variant: WritableSignal<SplitButtonVariant | null> = signal<SplitButtonVariant | null>(
    'material'
  );
  public size: WritableSignal<SplitButtonSize> = signal<SplitButtonSize>('md');
  public disabled: WritableSignal<boolean> = signal<boolean>(false);
  public buttonDisabled: WritableSignal<boolean> = signal<boolean>(false);
  public menuButtonDisabled: WritableSignal<boolean> = signal<boolean>(false);
  public loading: WritableSignal<boolean> = signal<boolean>(false);
  public loadingIcon: WritableSignal<string> = signal<string>('spinner');
  public raised: WritableSignal<boolean> = signal<boolean>(false);
  public rounded: WritableSignal<boolean> = signal<boolean>(false);
  public text: WritableSignal<boolean> = signal<boolean>(false);
  public outlined: WritableSignal<boolean> = signal<boolean>(false);
  public dropdownIcon: WritableSignal<string> = signal<string>('chevron-down');
  public buttonAriaLabel: WritableSignal<string | null> = signal<string | null>(null);
  public menuButtonAriaLabel: WritableSignal<string | null> = signal<string | null>(null);
  public tabindex: WritableSignal<number> = signal<number>(0);
  public styleClass: WritableSignal<string | null> = signal<string | null>(null);

  public clickEvents: SplitButtonClickEvent[] = [];
  public menuShowEvents: SplitButtonMenuShowEvent[] = [];
  public menuHideEvents: SplitButtonMenuHideEvent[] = [];
  public itemCommandEvents: SplitButtonItemCommandEvent[] = [];

  public handleClick(event: SplitButtonClickEvent): void {
    this.clickEvents.push(event);
  }

  public handleMenuShow(event: SplitButtonMenuShowEvent): void {
    this.menuShowEvents.push(event);
  }

  public handleMenuHide(event: SplitButtonMenuHideEvent): void {
    this.menuHideEvents.push(event);
  }

  public handleItemCommand(event: SplitButtonItemCommandEvent): void {
    this.itemCommandEvents.push(event);
  }
}

describe('SplitButtonComponent', (): void => {
  let fixture: ComponentFixture<SplitButtonHostComponent>;
  let host: SplitButtonHostComponent;

  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({
      imports: [SplitButtonHostComponent],
      providers: [
        provideZonelessChangeDetection(),
        provideRouter([]),
        provideUiLibIcons(),
        provideIcons({ pencil: lucidePencil, trash: lucideTrash }),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SplitButtonHostComponent);
    host = fixture.componentInstance;
    fixture.detectChanges();
  });

  async function detectAndFlush(): Promise<void> {
    fixture.detectChanges();
    await Promise.resolve();
    fixture.detectChanges();
  }

  function setSplitInput<T>(name: string, value: T): void {
    const signalRecord: Record<string, WritableSignal<T>> = host as unknown as Record<
      string,
      WritableSignal<T>
    >;
    const targetSignal: WritableSignal<T> | undefined = signalRecord[name];
    if (!targetSignal) {
      throw new Error(`Missing signal input: ${name}`);
    }
    targetSignal.set(value);
    fixture.detectChanges();
  }

  function splitDebugElement(): DebugElement {
    return fixture.debugElement.query(By.directive(SplitButtonComponent));
  }

  function splitHostElement(): HTMLElement {
    const element: HTMLElement | null = (fixture.nativeElement as HTMLElement).querySelector(
      'ui-lib-split-button'
    );
    if (!element) {
      throw new Error('Expected split button host element.');
    }
    return element;
  }

  function componentInstance(): SplitButtonComponent {
    const debugElement: unknown = splitDebugElement();
    const typedDebugElement: { componentInstance: SplitButtonComponent } = debugElement as {
      componentInstance: SplitButtonComponent;
    };
    return typedDebugElement.componentInstance;
  }

  function mainButton(): HTMLButtonElement {
    const element: HTMLButtonElement | null = splitHostElement().querySelector(
      '.ui-lib-split-button__default-button'
    );
    if (!element) {
      throw new Error('Expected main split button.');
    }
    return element;
  }

  function menuButton(): HTMLButtonElement {
    const element: HTMLButtonElement | null = splitHostElement().querySelector(
      '.ui-lib-split-button__menu-button'
    );
    if (!element) {
      throw new Error('Expected menu split button.');
    }
    return element;
  }

  function menuPanel(): HTMLUListElement | null {
    return splitHostElement().querySelector('.ui-lib-split-button__menu');
  }

  function menuItems(): HTMLAnchorElement[] {
    return Array.from(splitHostElement().querySelectorAll('.ui-lib-split-button__menu-item'));
  }

  function keydown(target: EventTarget, key: string): void {
    target.dispatchEvent(new KeyboardEvent('keydown', { key, bubbles: true, cancelable: true }));
  }

  async function openMenuByClick(): Promise<void> {
    menuButton().click();
    await detectAndFlush();
  }

  describe('Rendering', (): void => {
    it('renders default state with two buttons and hidden menu', (): void => {
      expect(mainButton()).toBeTruthy();
      expect(menuButton()).toBeTruthy();
      expect(menuPanel()).toBeNull();
    });

    it('renders label in main button', (): void => {
      setSplitInput('label', 'Save');
      expect(mainButton().textContent).toContain('Save');
    });

    it('renders icon in main button', (): void => {
      setSplitInput('icon', 'check');
      const iconEl: HTMLElement | null = splitHostElement().querySelector(
        '.ui-lib-split-button__icon--start'
      );
      expect(iconEl).toBeTruthy();
    });

    it('applies variant classes', (): void => {
      const variants: readonly SplitButtonVariant[] = ['material', 'bootstrap', 'minimal'];
      for (const variant of variants) {
        setSplitInput('variant', variant);
        expect(
          splitHostElement().classList.contains(`ui-lib-split-button--${variant}`)
        ).toBeTruthy();
      }
    });

    it('applies size classes', (): void => {
      const sizes: readonly SplitButtonSize[] = ['sm', 'md', 'lg'];
      for (const size of sizes) {
        setSplitInput('size', size);
        expect(splitHostElement().classList.contains(`ui-lib-split-button--${size}`)).toBeTruthy();
      }
    });

    it('applies severity classes', (): void => {
      const severities: readonly SplitButtonSeverity[] = [
        'primary',
        'secondary',
        'success',
        'info',
        'warning',
        'help',
        'danger',
        'contrast',
      ];

      for (const severity of severities) {
        setSplitInput('severity', severity);
        expect(
          splitHostElement().classList.contains(`ui-lib-split-button--${severity}`)
        ).toBeTruthy();
      }
    });

    it('applies modifier classes', (): void => {
      setSplitInput('raised', true);
      setSplitInput('rounded', true);
      setSplitInput('text', true);
      setSplitInput('outlined', true);

      const classes: DOMTokenList = splitHostElement().classList;
      expect(classes.contains('ui-lib-split-button--raised')).toBeTruthy();
      expect(classes.contains('ui-lib-split-button--rounded')).toBeTruthy();
      expect(classes.contains('ui-lib-split-button--text')).toBeTruthy();
      expect(classes.contains('ui-lib-split-button--outlined')).toBeTruthy();
    });
  });

  describe('Main button', (): void => {
    it('click emits onClick', (): void => {
      mainButton().click();
      fixture.detectChanges();
      expect(host.clickEvents).toHaveLength(1);
    });

    it('disabled prevents onClick emit', (): void => {
      setSplitInput('disabled', true);
      expect(mainButton().disabled).toBeTruthy();

      const beforeCount: number = host.clickEvents.length;
      componentInstance().onMainButtonClick(new MouseEvent('click'));
      expect(host.clickEvents).toHaveLength(beforeCount);
    });

    it('buttonDisabled prevents onClick but menu button still works', async (): Promise<void> => {
      setSplitInput('buttonDisabled', true);
      expect(mainButton().disabled).toBeTruthy();
      expect(menuButton().disabled).toBeFalsy();

      const beforeCount: number = host.clickEvents.length;
      componentInstance().onMainButtonClick(new MouseEvent('click'));
      expect(host.clickEvents).toHaveLength(beforeCount);

      await openMenuByClick();
      expect(host.menuShowEvents).toHaveLength(1);
    });

    it('loading disables main button and shows loading icon', (): void => {
      setSplitInput('loading', true);
      expect(mainButton().disabled).toBeTruthy();
      const loadingIcon: HTMLElement | null = splitHostElement().querySelector(
        '.ui-lib-split-button__loading-icon'
      );
      expect(loadingIcon).toBeTruthy();
    });
  });

  describe('Menu button', (): void => {
    it('click toggles menu and emits show/hide', async (): Promise<void> => {
      await openMenuByClick();
      expect(menuPanel()).toBeTruthy();
      expect(host.menuShowEvents).toHaveLength(1);

      await openMenuByClick();
      expect(menuPanel()).toBeNull();
      expect(host.menuHideEvents).toHaveLength(1);
    });

    it('menuButtonDisabled prevents toggle', async (): Promise<void> => {
      setSplitInput('menuButtonDisabled', true);
      expect(menuButton().disabled).toBeTruthy();

      componentInstance().onMenuButtonClick(new MouseEvent('click'));
      await detectAndFlush();
      expect(menuPanel()).toBeNull();
      expect(host.menuShowEvents).toHaveLength(0);
    });

    it('disabled disables both buttons', (): void => {
      setSplitInput('disabled', true);
      expect(mainButton().disabled).toBeTruthy();
      expect(menuButton().disabled).toBeTruthy();
    });
  });

  describe('Model and items', (): void => {
    it('filters out items with visible false', async (): Promise<void> => {
      setSplitInput('model', [
        { label: 'Visible A' },
        { label: 'Hidden', visible: false },
        { label: 'Visible B' },
      ] as readonly SplitButtonItem[]);
      await openMenuByClick();

      const labels: string[] = menuItems().map((item: HTMLAnchorElement): string =>
        item.textContent.trim()
      );
      expect(labels).toEqual(['Visible A', 'Visible B']);
    });

    it('disabled item has aria-disabled and does not fire command', async (): Promise<void> => {
      const commandSpy: jest.Mock<void, [SplitButtonItemCommandEvent]> = jest.fn<
        void,
        [SplitButtonItemCommandEvent]
      >();
      setSplitInput('model', [{ label: 'Locked', disabled: true, command: commandSpy }]);
      await openMenuByClick();

      const item: HTMLAnchorElement = menuItems()[0] as HTMLAnchorElement;
      expect(item.getAttribute('aria-disabled')).toBe('true');

      item.click();
      await detectAndFlush();
      expect(commandSpy).not.toHaveBeenCalled();
      expect(host.itemCommandEvents).toHaveLength(0);
    });

    it('renders separator items', async (): Promise<void> => {
      setSplitInput('model', [{ label: 'A' }, { separator: true }, { label: 'B' }]);
      await openMenuByClick();

      const separators: Element[] = Array.from(
        splitHostElement().querySelectorAll('[role="separator"]')
      );
      expect(separators.length).toBeGreaterThan(0);
    });

    it('item click calls command, emits onItemCommand, and closes menu', async (): Promise<void> => {
      const commandSpy: jest.Mock<void, [SplitButtonItemCommandEvent]> = jest.fn<
        void,
        [SplitButtonItemCommandEvent]
      >();
      setSplitInput('model', [{ label: 'Run', command: commandSpy }]);
      await openMenuByClick();

      menuItems()[0]?.click();
      await detectAndFlush();

      expect(commandSpy).toHaveBeenCalledTimes(1);
      expect(host.itemCommandEvents).toHaveLength(1);
      expect(menuPanel()).toBeNull();
    });

    it('maps tooltip to title attribute', async (): Promise<void> => {
      setSplitInput('model', [{ label: 'Info', tooltip: 'Helpful text' }]);
      await openMenuByClick();

      const item: HTMLAnchorElement = menuItems()[0] as HTMLAnchorElement;
      expect(item.getAttribute('title')).toBe('Helpful text');
    });

    it('url item calls window.open', async (): Promise<void> => {
      const openSpy: jest.SpyInstance = jest
        .spyOn(window, 'open')
        .mockImplementation((): Window | null => null);
      setSplitInput('model', [
        { label: 'Docs', url: 'https://example.com/docs', target: '_blank' },
      ]);
      await openMenuByClick();

      menuItems()[0]?.click();
      await detectAndFlush();

      expect(openSpy).toHaveBeenCalledWith('https://example.com/docs', '_blank');
      openSpy.mockRestore();
    });

    it('routerLink string uses navigateByUrl', async (): Promise<void> => {
      const router: Router = TestBed.inject(Router);
      const navigateByUrlSpy: jest.SpyInstance = jest
        .spyOn(router, 'navigateByUrl')
        .mockResolvedValue(true as never);

      setSplitInput('model', [{ label: 'Route', routerLink: '/settings' }]);
      await openMenuByClick();

      menuItems()[0]?.click();
      await detectAndFlush();

      expect(navigateByUrlSpy).toHaveBeenCalledWith('/settings');
    });

    it('routerLink array uses navigate', async (): Promise<void> => {
      const router: Router = TestBed.inject(Router);
      const navigateSpy: jest.SpyInstance = jest
        .spyOn(router, 'navigate')
        .mockResolvedValue(true as never);

      setSplitInput('model', [{ label: 'Nested route', routerLink: ['admin', 'users'] }]);
      await openMenuByClick();

      menuItems()[0]?.click();
      await detectAndFlush();

      expect(navigateSpy).toHaveBeenCalledWith(['admin', 'users']);
    });
  });

  describe('Outside click', (): void => {
    it('closes open menu on outside click', async (): Promise<void> => {
      await openMenuByClick();
      expect(menuPanel()).toBeTruthy();

      document.body.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      await detectAndFlush();
      expect(menuPanel()).toBeNull();
    });
  });

  describe('Keyboard - menu button', (): void => {
    it('Enter and Space toggle menu', async (): Promise<void> => {
      keydown(menuButton(), 'Enter');
      await detectAndFlush();
      expect(menuPanel()).toBeTruthy();

      keydown(menuButton(), ' ');
      await detectAndFlush();
      expect(menuPanel()).toBeNull();
    });

    it('ArrowDown opens and focuses first non-disabled item', async (): Promise<void> => {
      setSplitInput('model', [
        { label: 'Disabled', disabled: true },
        { separator: true },
        { label: 'First focusable' },
        { label: 'Second' },
      ] as readonly SplitButtonItem[]);

      keydown(menuButton(), 'ArrowDown');
      await detectAndFlush();

      const items: HTMLAnchorElement[] = menuItems();
      expect(menuPanel()).toBeTruthy();
      expect(document.activeElement).toBe(items[1]);
    });

    it('ArrowUp opens and focuses last non-disabled item', async (): Promise<void> => {
      setSplitInput('model', [{ label: 'First' }, { label: 'Last' }] as readonly SplitButtonItem[]);
      keydown(menuButton(), 'ArrowUp');
      await detectAndFlush();

      const items: HTMLAnchorElement[] = menuItems();
      expect(document.activeElement).toBe(items[items.length - 1]);
    });

    it('Escape closes menu', async (): Promise<void> => {
      await openMenuByClick();
      keydown(menuButton(), 'Escape');
      await detectAndFlush();
      expect(menuPanel()).toBeNull();
    });
  });

  describe('Keyboard - menu items', (): void => {
    it('ArrowDown and ArrowUp support roving focus with wrap', async (): Promise<void> => {
      setSplitInput('model', [{ label: 'First' }, { label: 'Second' }, { label: 'Third' }]);
      await openMenuByClick();

      const items: HTMLAnchorElement[] = menuItems();
      items[2]?.focus();
      keydown(items[2] as HTMLAnchorElement, 'ArrowDown');
      await detectAndFlush();
      expect(document.activeElement).toBe(items[0]);

      keydown(items[0] as HTMLAnchorElement, 'ArrowUp');
      await detectAndFlush();
      expect(document.activeElement).toBe(items[2]);
    });

    it('Home and End jump to first and last item', async (): Promise<void> => {
      setSplitInput('model', [{ label: 'First' }, { label: 'Second' }, { label: 'Third' }]);
      await openMenuByClick();

      const items: HTMLAnchorElement[] = menuItems();
      keydown(items[1] as HTMLAnchorElement, 'Home');
      await detectAndFlush();
      expect(document.activeElement).toBe(items[0]);

      keydown(items[0] as HTMLAnchorElement, 'End');
      await detectAndFlush();
      expect(document.activeElement).toBe(items[2]);
    });

    it('Enter and Space activate item and close menu', async (): Promise<void> => {
      const commandSpy: jest.Mock<void, [SplitButtonItemCommandEvent]> = jest.fn<
        void,
        [SplitButtonItemCommandEvent]
      >();
      setSplitInput('model', [{ label: 'Run', command: commandSpy }] as readonly SplitButtonItem[]);
      await openMenuByClick();

      const firstOpenItem: HTMLAnchorElement = menuItems()[0] as HTMLAnchorElement;
      keydown(firstOpenItem, 'Enter');
      await detectAndFlush();
      expect(commandSpy).toHaveBeenCalledTimes(1);
      expect(menuPanel()).toBeNull();

      await openMenuByClick();
      const secondOpenItem: HTMLAnchorElement = menuItems()[0] as HTMLAnchorElement;
      keydown(secondOpenItem, ' ');
      await detectAndFlush();
      expect(commandSpy).toHaveBeenCalledTimes(2);
      expect(menuPanel()).toBeNull();
    });

    it('Escape closes menu and returns focus to menu button', async (): Promise<void> => {
      await openMenuByClick();
      const item: HTMLAnchorElement = menuItems()[0] as HTMLAnchorElement;
      item.focus();

      keydown(item, 'Escape');
      await detectAndFlush();

      expect(menuPanel()).toBeNull();
      expect(document.activeElement).toBe(menuButton());
    });

    it('Tab closes menu without preventDefault', async (): Promise<void> => {
      await openMenuByClick();
      const item: HTMLAnchorElement = menuItems()[0] as HTMLAnchorElement;
      const tabEvent: KeyboardEvent = new KeyboardEvent('keydown', {
        key: 'Tab',
        bubbles: true,
        cancelable: true,
      });
      const preventedSpy: jest.SpyInstance<void, []> = jest.spyOn(tabEvent, 'preventDefault');

      item.dispatchEvent(tabEvent);
      await detectAndFlush();

      expect(menuPanel()).toBeNull();
      expect(preventedSpy).not.toHaveBeenCalled();
    });
  });

  describe('Focus return', (): void => {
    it('document Escape closes and returns focus to menu button', async (): Promise<void> => {
      await openMenuByClick();
      menuItems()[0]?.focus();

      document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
      await detectAndFlush();

      expect(menuPanel()).toBeNull();
      expect(document.activeElement).toBe(menuButton());
    });
  });

  describe('ARIA', (): void => {
    it('menu button exposes aria-haspopup, aria-expanded, and aria-controls', async (): Promise<void> => {
      expect(menuButton().getAttribute('aria-haspopup')).toBe('menu');
      expect(menuButton().getAttribute('aria-expanded')).toBe('false');
      expect(menuButton().getAttribute('aria-controls')).toBeNull();

      await openMenuByClick();
      expect(menuButton().getAttribute('aria-expanded')).toBe('true');
      expect(menuButton().getAttribute('aria-controls')).toBeTruthy();
    });

    it('menu list/items/separators expose expected roles', async (): Promise<void> => {
      setSplitInput('model', [
        { label: 'One' },
        { label: 'Two', disabled: true },
        { separator: true },
      ]);
      await openMenuByClick();

      expect(menuPanel()?.getAttribute('role')).toBe('menu');
      expect(menuItems()[0]?.getAttribute('role')).toBe('menuitem');
      expect(menuItems()[1]?.getAttribute('aria-disabled')).toBe('true');
      const separator: Element | null = splitHostElement().querySelector(
        '.ui-lib-split-button__separator'
      );
      expect(separator?.getAttribute('role')).toBe('separator');
    });
  });

  describe('Independent disabled states', (): void => {
    it('buttonDisabled only disables main button', (): void => {
      setSplitInput('buttonDisabled', true);
      setSplitInput('menuButtonDisabled', false);
      setSplitInput('disabled', false);
      expect(mainButton().disabled).toBeTruthy();
      expect(menuButton().disabled).toBeFalsy();
    });

    it('menuButtonDisabled only disables menu button', (): void => {
      setSplitInput('buttonDisabled', false);
      setSplitInput('menuButtonDisabled', true);
      setSplitInput('disabled', false);
      expect(mainButton().disabled).toBeFalsy();
      expect(menuButton().disabled).toBeTruthy();
    });

    it('disabled disables both buttons', (): void => {
      setSplitInput('buttonDisabled', false);
      setSplitInput('menuButtonDisabled', false);
      setSplitInput('disabled', true);
      expect(mainButton().disabled).toBeTruthy();
      expect(menuButton().disabled).toBeTruthy();
    });
  });

  describe('Coverage guards', (): void => {
    it('appends non-empty styleClass to host classes', (): void => {
      setSplitInput('styleClass', 'custom-class-token');
      expect(splitHostElement().classList.contains('custom-class-token')).toBeTruthy();
    });

    it('handles main button keydown Enter/Space no-op paths', (): void => {
      const component: SplitButtonComponent = componentInstance();
      component.onMainButtonKeydown(new KeyboardEvent('keydown', { key: 'Enter' }));
      component.onMainButtonKeydown(new KeyboardEvent('keydown', { key: ' ' }));
      expect(host.clickEvents).toHaveLength(0);
    });

    it('handles menu button keydown branches for open-state arrows, default key, and escape while closed', async (): Promise<void> => {
      setSplitInput('model', [{ label: 'A' }, { label: 'B' }]);
      await openMenuByClick();

      keydown(menuButton(), 'ArrowDown');
      await detectAndFlush();
      keydown(menuButton(), 'ArrowUp');
      await detectAndFlush();
      keydown(menuButton(), 'Unrecognized');
      await detectAndFlush();

      await openMenuByClick();
      keydown(menuButton(), 'Escape');
      await detectAndFlush();
      expect(menuPanel()).toBeNull();
    });

    it('returns early when opening already open menu and closing already closed menu', async (): Promise<void> => {
      const component: SplitButtonComponent = componentInstance();
      await openMenuByClick();
      component.openMenu(new Event('click'));
      expect(menuPanel()).toBeTruthy();

      await openMenuByClick();
      component.closeMenu(new Event('click'));
      expect(menuPanel()).toBeNull();
    });

    it('handles separator and unknown keyboard branch in onItem handlers', async (): Promise<void> => {
      setSplitInput('model', [{ separator: true }, { label: 'Action' }]);
      const component: SplitButtonComponent = componentInstance();
      const separatorItem: SplitButtonItem = { separator: true };
      component.onItemClick(new MouseEvent('click'), separatorItem, 0);

      await openMenuByClick();
      const actionableItem: SplitButtonItem = { label: 'Action' };
      component.onItemKeydown(new KeyboardEvent('keydown', { key: 'Unknown' }), actionableItem, 0);
      expect(menuPanel()).toBeTruthy();
    });

    it('handles focusItem guard branches for non-focusable and missing DOM item', (): void => {
      setSplitInput('model', [{ label: 'Disabled', disabled: true }, { label: 'Focusable' }]);
      const component: SplitButtonComponent = componentInstance();

      component.focusItem(0);
      expect(component.focusedItemIndex()).toBe(-1);

      component.focusItem(1);
      expect(component.focusedItemIndex()).toBe(-1);
    });

    it('handles document click branch when target is null', (): void => {
      const component: SplitButtonComponent = componentInstance();
      component.isMenuOpen.set(true);
      component.onDocumentClick({ target: null } as unknown as MouseEvent);
      expect(component.isMenuOpen()).toBeTruthy();
    });

    it('returns -1 for focus helpers when no focusable items exist', (): void => {
      setSplitInput('model', [{ separator: true }, { label: 'Disabled', disabled: true }]);
      const component: SplitButtonComponent = componentInstance();

      expect(component.getFirstFocusableIndex()).toBe(-1);
      expect(component.getLastFocusableIndex()).toBe(-1);
      expect(component.getNextFocusableIndex(-1, 1)).toBe(-1);
    });

    it('returns -1 from getNextFocusableIndex when menu has zero items', (): void => {
      setSplitInput('model', []);
      const component: SplitButtonComponent = componentInstance();
      expect(component.getNextFocusableIndex(0, 1)).toBe(-1);
    });

    it('resets focusedItemIndex for invalid focus target', (): void => {
      setSplitInput('model', [{ label: 'One' }]);
      const component: SplitButtonComponent = componentInstance();

      component.focusItem(99);
      expect(component.focusedItemIndex()).toBe(-1);
    });

    it('returns early when menu button click occurs outside of document containment', async (): Promise<void> => {
      const component: SplitButtonComponent = componentInstance();
      const containsSpy: jest.SpyInstance<boolean, [Node | null]> = jest
        .spyOn(document, 'contains')
        .mockReturnValue(false);

      component.onMenuButtonClick(new MouseEvent('click'));
      await detectAndFlush();

      expect(menuPanel()).toBeNull();
      expect(host.menuShowEvents).toHaveLength(0);
      containsSpy.mockRestore();
    });

    it('handles menu button keydown Escape when menu is already closed', (): void => {
      const component: SplitButtonComponent = componentInstance();
      const event: KeyboardEvent = new KeyboardEvent('keydown', {
        key: 'Escape',
        bubbles: true,
        cancelable: true,
      });
      const preventDefaultSpy: jest.SpyInstance<void, []> = jest.spyOn(event, 'preventDefault');

      component.onMenuButtonKeydown(event);

      expect(menuPanel()).toBeNull();
      expect(preventDefaultSpy).not.toHaveBeenCalled();
    });

    it('handles document keydown non-escape and escape-while-closed guard branches', (): void => {
      const component: SplitButtonComponent = componentInstance();

      component.onDocumentKeydown(new KeyboardEvent('keydown', { key: 'Enter' }));
      component.onDocumentKeydown(new KeyboardEvent('keydown', { key: 'Escape' }));

      expect(menuPanel()).toBeNull();
    });

    it('keeps menu open for document click targets inside host', async (): Promise<void> => {
      await openMenuByClick();
      const insideTarget: Node = menuButton();
      componentInstance().onDocumentClick({ target: insideTarget } as unknown as MouseEvent);
      expect(menuPanel()).toBeTruthy();
    });

    it('focusItem returns early when item is focusable but not currently rendered in DOM', (): void => {
      setSplitInput('model', [{ label: 'Visible only when open' }]);
      const component: SplitButtonComponent = componentInstance();

      component.focusItem(0);

      expect(component.focusedItemIndex()).toBe(-1);
    });

    it('returns -1 from getNextFocusableIndex after full scan when no candidates are focusable', (): void => {
      setSplitInput('model', [
        { label: 'Disabled A', disabled: true },
        { separator: true },
        { label: 'Disabled B', disabled: true },
      ]);
      const component: SplitButtonComponent = componentInstance();

      expect(component.getNextFocusableIndex(0, 1)).toBe(-1);
      expect(component.getNextFocusableIndex(2, -1)).toBe(-1);
    });

    it('openMenu with focusTarget none opens without focusing items', async (): Promise<void> => {
      setSplitInput('model', [{ label: 'A' }, { label: 'B' }]);
      const component: SplitButtonComponent = componentInstance();

      component.openMenu(new Event('click'), 'none');
      await detectAndFlush();

      expect(menuPanel()).toBeTruthy();
      expect(component.focusedItemIndex()).toBe(-1);
    });

    it('ignores separator item clicks without closing when menu is open', async (): Promise<void> => {
      setSplitInput('model', [{ separator: true }, { label: 'Action' }]);
      await openMenuByClick();
      const separatorItem: SplitButtonItem = { separator: true };

      componentInstance().onItemClick(new MouseEvent('click'), separatorItem, 0);

      expect(menuPanel()).toBeTruthy();
    });
  });
});
