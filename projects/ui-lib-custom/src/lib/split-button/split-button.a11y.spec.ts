import {
  ChangeDetectionStrategy,
  Component,
  provideZonelessChangeDetection,
  signal,
  type Type,
  type WritableSignal,
} from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { provideIcons } from '@ng-icons/core';
import { lucidePencil, lucideTrash } from '@ng-icons/lucide';

import { provideUiLibIcons } from 'ui-lib-custom/icon';

import { checkA11y, SKIP_COLOR_CONTRAST_RULES } from '../../test/a11y-utils';
import { SplitButtonComponent } from './split-button.component';
import type { SplitButtonItem, SplitButtonVariant } from './split-button.types';

const SPLIT_BUTTON_AXE_RULES: Record<string, { enabled: boolean }> = {
  ...SKIP_COLOR_CONTRAST_RULES,
  'aria-required-children': { enabled: false },
};

@Component({
  standalone: true,
  imports: [SplitButtonComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ui-lib-split-button
      [label]="label()"
      [icon]="icon()"
      [model]="model()"
      [loading]="loading()"
      [variant]="variant()"
      [buttonAriaLabel]="buttonAriaLabel()"
      [menuButtonAriaLabel]="menuButtonAriaLabel()"
    />
  `,
})
class SplitButtonA11yHostComponent {
  public readonly label: WritableSignal<string> = signal<string>('Save');
  public readonly icon: WritableSignal<string | null> = signal<string | null>('pencil');
  public readonly loading: WritableSignal<boolean> = signal<boolean>(false);
  public readonly variant: WritableSignal<SplitButtonVariant | null> =
    signal<SplitButtonVariant | null>('material');
  public readonly buttonAriaLabel: WritableSignal<string | null> = signal<string | null>(null);
  public readonly menuButtonAriaLabel: WritableSignal<string | null> = signal<string | null>(
    'More save actions',
  );
  public readonly model: WritableSignal<readonly SplitButtonItem[]> = signal<
    readonly SplitButtonItem[]
  >([
    { label: 'Edit', icon: 'pencil' },
    { label: 'Delete', icon: 'trash', disabled: true },
    { separator: true },
    { label: 'Archive', icon: 'trash' },
  ]);
}

@Component({
  standalone: true,
  imports: [SplitButtonComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ui-lib-split-button label="Primary" [model]="primaryModel()" />
    <ui-lib-split-button label="Secondary" [model]="secondaryModel()" />
  `,
})
class SplitButtonMultiA11yHostComponent {
  public readonly primaryModel: WritableSignal<readonly SplitButtonItem[]> = signal<
    readonly SplitButtonItem[]
  >([{ label: 'Open' }]);
  public readonly secondaryModel: WritableSignal<readonly SplitButtonItem[]> = signal<
    readonly SplitButtonItem[]
  >([{ label: 'Close' }]);
}

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

function mainButton(fixture: ComponentFixture<unknown>): HTMLButtonElement {
  const element: HTMLButtonElement | null = queryEl<HTMLButtonElement>(
    fixture,
    '.ui-lib-split-button__default-button',
  );
  if (!element) {
    throw new Error('Expected split button main button to exist.');
  }
  return element;
}

function menuButton(fixture: ComponentFixture<unknown>): HTMLButtonElement {
  const element: HTMLButtonElement | null = queryEl<HTMLButtonElement>(
    fixture,
    '.ui-lib-split-button__menu-button',
  );
  if (!element) {
    throw new Error('Expected split button menu button to exist.');
  }
  return element;
}

function menuPanel(fixture: ComponentFixture<unknown>): HTMLUListElement | null {
  return queryEl<HTMLUListElement>(fixture, '.ui-lib-split-button__menu');
}

function menuItems(fixture: ComponentFixture<unknown>): HTMLAnchorElement[] {
  return queryAllEl<HTMLAnchorElement>(fixture, '.ui-lib-split-button__menu-item');
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

async function detectChangesAndWait(fixture: ComponentFixture<unknown>): Promise<void> {
  fixture.detectChanges();
  await fixture.whenStable();
  fixture.detectChanges();
  await fixture.whenStable();
}

async function createFixture(): Promise<ComponentFixture<SplitButtonA11yHostComponent>>;
async function createFixture(
  hostComponent: typeof SplitButtonMultiA11yHostComponent,
): Promise<ComponentFixture<SplitButtonMultiA11yHostComponent>>;
async function createFixture<T>(
  hostComponent: Type<T> = SplitButtonA11yHostComponent as Type<T>,
): Promise<ComponentFixture<T>> {
  await TestBed.configureTestingModule({
    imports: [hostComponent],
    providers: [
      provideZonelessChangeDetection(),
      provideUiLibIcons(),
      provideIcons({ pencil: lucidePencil, trash: lucideTrash }),
    ],
  }).compileComponents();

  const fixture: ComponentFixture<T> = TestBed.createComponent(hostComponent);
  document.body.appendChild(fixture.nativeElement);
  await detectChangesAndWait(fixture);
  return fixture;
}

async function openMenuByClick(fixture: ComponentFixture<unknown>): Promise<void> {
  menuButton(fixture).click();
  await detectChangesAndWait(fixture);
}

async function openMenuByKey(fixture: ComponentFixture<unknown>, key: string): Promise<void> {
  dispatchKey(menuButton(fixture), key);
  await detectChangesAndWait(fixture);
}

describe('SplitButton Accessibility', (): void => {
  let fixture:
    | ComponentFixture<SplitButtonA11yHostComponent>
    | ComponentFixture<SplitButtonMultiA11yHostComponent>
    | undefined;

  afterEach((): void => {
    if (fixture) {
      (fixture.nativeElement as HTMLElement).remove();
      fixture.destroy();
    }
    fixture = undefined;
  });

  describe('ARIA structure', (): void => {
    it('main button uses the visible label as its accessible name by default', async (): Promise<void> => {
      fixture = await createFixture();
      expect(mainButton(fixture).getAttribute('aria-label')).toBe('Save');
    });

    it('main button uses buttonAriaLabel when provided', async (): Promise<void> => {
      fixture = await createFixture();
      fixture.componentInstance.buttonAriaLabel.set('Save document');
      await detectChangesAndWait(fixture);
      expect(mainButton(fixture).getAttribute('aria-label')).toBe('Save document');
    });

    it('icon-only main button falls back to a generic accessible label', async (): Promise<void> => {
      fixture = await createFixture();
      fixture.componentInstance.label.set('');
      await detectChangesAndWait(fixture);
      expect(mainButton(fixture).getAttribute('aria-label')).toBe('Action');
    });

    it('menu trigger exposes collapsed menu-button semantics when closed', async (): Promise<void> => {
      fixture = await createFixture();
      expect(menuButton(fixture).getAttribute('aria-haspopup')).toBe('menu');
      expect(menuButton(fixture).getAttribute('aria-expanded')).toBe('false');
      expect(menuButton(fixture).getAttribute('aria-controls')).toBeNull();
    });

    it('menu trigger exposes expanded state and controls when open', async (): Promise<void> => {
      fixture = await createFixture();
      await openMenuByClick(fixture);
      expect(menuButton(fixture).getAttribute('aria-expanded')).toBe('true');
      expect(menuButton(fixture).getAttribute('aria-controls')).toBe(menuPanel(fixture)?.id);
    });

    it('menu panel uses role menu and inherits the trigger label', async (): Promise<void> => {
      fixture = await createFixture();
      await openMenuByClick(fixture);
      expect(menuPanel(fixture)?.getAttribute('role')).toBe('menu');
      expect(menuPanel(fixture)?.getAttribute('aria-label')).toBe('More save actions');
    });

    it('menu items and separators expose the expected roles and disabled state', async (): Promise<void> => {
      fixture = await createFixture();
      await openMenuByClick(fixture);

      const items: HTMLAnchorElement[] = menuItems(fixture);
      expect(items).toHaveLength(3);
      expect(items[0]?.getAttribute('role')).toBe('menuitem');
      expect(items[1]?.getAttribute('aria-disabled')).toBe('true');
      expect(
        queryEl<HTMLElement>(fixture, '.ui-lib-split-button__separator')?.getAttribute('role'),
      ).toBe('separator');
    });

    it('decorative icons are hidden from assistive technology', async (): Promise<void> => {
      fixture = await createFixture();
      await openMenuByClick(fixture);
      const icons: HTMLElement[] = queryAllEl<HTMLElement>(fixture, 'ui-lib-icon');
      expect(icons.length).toBeGreaterThan(0);
      for (const icon of icons) {
        expect(icon.getAttribute('aria-hidden')).toBe('true');
      }
    });

    it('split button instances generate unique host and menu ids', async (): Promise<void> => {
      fixture = await createFixture(SplitButtonMultiA11yHostComponent);
      const splitButtons: ReturnType<typeof fixture.debugElement.queryAll> =
        fixture.debugElement.queryAll(By.directive(SplitButtonComponent));
      const firstInstance: SplitButtonComponent = splitButtons[0]
        ?.componentInstance as SplitButtonComponent;
      const secondInstance: SplitButtonComponent = splitButtons[1]
        ?.componentInstance as SplitButtonComponent;

      expect(firstInstance.instanceId).toMatch(/^ui-lib-split-button-/);
      expect(secondInstance.instanceId).toMatch(/^ui-lib-split-button-/);
      expect(firstInstance.instanceId).not.toBe(secondInstance.instanceId);
      expect(firstInstance.menuId()).not.toBe(secondInstance.menuId());
    });
  });

  describe('keyboard interaction', (): void => {
    it('Enter on the menu button opens the menu and focuses the first enabled item', async (): Promise<void> => {
      fixture = await createFixture();
      await openMenuByKey(fixture, 'Enter');
      expect(menuPanel(fixture)).toBeTruthy();
      expect(document.activeElement).toBe(menuItems(fixture)[0]);
    });

    it('ArrowUp on the menu button opens the menu and focuses the last enabled item', async (): Promise<void> => {
      fixture = await createFixture();
      await openMenuByKey(fixture, 'ArrowUp');
      const items: HTMLAnchorElement[] = menuItems(fixture);
      expect(document.activeElement).toBe(items[items.length - 1]);
    });

    it('ArrowDown skips disabled items and separators', async (): Promise<void> => {
      fixture = await createFixture();
      fixture.componentInstance.model.set([
        { label: 'First' },
        { label: 'Disabled', disabled: true },
        { separator: true },
        { label: 'Last' },
      ]);
      await openMenuByClick(fixture);

      const items: HTMLAnchorElement[] = menuItems(fixture);
      items[0]?.focus();
      dispatchKey(items[0] as HTMLAnchorElement, 'ArrowDown');
      await detectChangesAndWait(fixture);

      expect(document.activeElement).toBe(items[2]);
    });

    it('ArrowUp wraps from the first enabled item to the last enabled item', async (): Promise<void> => {
      fixture = await createFixture();
      fixture.componentInstance.model.set([{ label: 'First' }, { label: 'Second' }]);
      await openMenuByClick(fixture);

      const items: HTMLAnchorElement[] = menuItems(fixture);
      items[0]?.focus();
      dispatchKey(items[0] as HTMLAnchorElement, 'ArrowUp');
      await detectChangesAndWait(fixture);

      expect(document.activeElement).toBe(items[1]);
    });

    it('Home focuses the first enabled menu item', async (): Promise<void> => {
      fixture = await createFixture();
      fixture.componentInstance.model.set([
        { label: 'First' },
        { label: 'Second' },
        { label: 'Third' },
      ]);
      await openMenuByClick(fixture);

      const items: HTMLAnchorElement[] = menuItems(fixture);
      items[1]?.focus();
      dispatchKey(items[1] as HTMLAnchorElement, 'Home');
      await detectChangesAndWait(fixture);

      expect(document.activeElement).toBe(items[0]);
    });

    it('End focuses the last enabled menu item', async (): Promise<void> => {
      fixture = await createFixture();
      fixture.componentInstance.model.set([
        { label: 'First' },
        { label: 'Second' },
        { label: 'Third' },
      ]);
      await openMenuByClick(fixture);

      const items: HTMLAnchorElement[] = menuItems(fixture);
      items[0]?.focus();
      dispatchKey(items[0] as HTMLAnchorElement, 'End');
      await detectChangesAndWait(fixture);

      expect(document.activeElement).toBe(items[2]);
    });

    it('Escape on a menu item closes the menu and restores focus to the menu button', async (): Promise<void> => {
      fixture = await createFixture();
      await openMenuByClick(fixture);

      const firstItem: HTMLAnchorElement = menuItems(fixture)[0] as HTMLAnchorElement;
      firstItem.focus();
      dispatchKey(firstItem, 'Escape');
      await detectChangesAndWait(fixture);

      expect(menuPanel(fixture)).toBeNull();
      expect(document.activeElement).toBe(menuButton(fixture));
    });

    it('document Escape closes the menu and restores focus to the menu button', async (): Promise<void> => {
      fixture = await createFixture();
      await openMenuByClick(fixture);

      document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
      await detectChangesAndWait(fixture);

      expect(menuPanel(fixture)).toBeNull();
      expect(document.activeElement).toBe(menuButton(fixture));
    });

    it('Enter activates a menu item command and closes the menu', async (): Promise<void> => {
      fixture = await createFixture();
      const commandSpy: jest.Mock<void, []> = jest.fn<void, []>();
      fixture.componentInstance.model.set([
        { label: 'Run', command: (): void => commandSpy() },
        { label: 'Other' },
      ]);
      await openMenuByClick(fixture);

      const firstItem: HTMLAnchorElement = menuItems(fixture)[0] as HTMLAnchorElement;
      dispatchKey(firstItem, 'Enter');
      await detectChangesAndWait(fixture);

      expect(commandSpy).toHaveBeenCalledTimes(1);
      expect(menuPanel(fixture)).toBeNull();
      expect(document.activeElement).toBe(menuButton(fixture));
    });
  });

  describe('axe-core', (): void => {
    it('has no detectable violations in the default closed state', async (): Promise<void> => {
      fixture = await createFixture();
      await checkA11y(fixture, { rules: SPLIT_BUTTON_AXE_RULES });
    });

    it('has no detectable violations with the menu open', async (): Promise<void> => {
      fixture = await createFixture();
      await openMenuByClick(fixture);
      await checkA11y(fixture, { rules: SPLIT_BUTTON_AXE_RULES });
    });

    it('has no detectable violations for the bootstrap variant', async (): Promise<void> => {
      fixture = await createFixture();
      fixture.componentInstance.variant.set('bootstrap');
      await openMenuByClick(fixture);
      await checkA11y(fixture, { rules: SPLIT_BUTTON_AXE_RULES });
    });

    it('has no detectable violations for the minimal variant', async (): Promise<void> => {
      fixture = await createFixture();
      fixture.componentInstance.variant.set('minimal');
      await openMenuByClick(fixture);
      await checkA11y(fixture, { rules: SPLIT_BUTTON_AXE_RULES });
    });
  });
});
