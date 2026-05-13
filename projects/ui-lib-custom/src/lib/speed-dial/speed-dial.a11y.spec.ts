import {
  ChangeDetectionStrategy,
  Component,
  provideZonelessChangeDetection,
  signal,
  type DebugElement,
  type WritableSignal,
} from '@angular/core';
import { TestBed, type ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { checkA11y, SKIP_COLOR_CONTRAST_RULES } from '../../test/a11y-utils';
import { SpeedDialComponent } from './speed-dial.component';
import type { SpeedDialDirection, SpeedDialItem, SpeedDialVariant } from './speed-dial.types';

const SPEED_DIAL_AXE_RULES: Record<string, { enabled: boolean }> = {
  ...SKIP_COLOR_CONTRAST_RULES,
};

const DEFAULT_ITEMS: readonly SpeedDialItem[] = [
  { label: 'Add', icon: 'plus' },
  { label: 'Edit', icon: 'pencil' },
  { label: 'Delete', icon: 'trash' },
];

@Component({
  standalone: true,
  imports: [SpeedDialComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ui-lib-speed-dial
      [model]="model()"
      [variant]="variant()"
      [direction]="direction()"
      [buttonAriaLabel]="buttonAriaLabel()"
      [(visible)]="open"
    />
  `,
})
class SpeedDialA11yHostComponent {
  public readonly model: WritableSignal<readonly SpeedDialItem[]> =
    signal<readonly SpeedDialItem[]>(DEFAULT_ITEMS);
  public readonly variant: WritableSignal<SpeedDialVariant | null> =
    signal<SpeedDialVariant | null>('material');
  public readonly direction: WritableSignal<SpeedDialDirection> = signal<SpeedDialDirection>('up');
  public readonly buttonAriaLabel: WritableSignal<string | null> = signal<string | null>(
    'Open speed dial'
  );
  public open: boolean = false;
}

@Component({
  standalone: true,
  imports: [SpeedDialComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ui-lib-speed-dial [model]="firstModel()" [buttonAriaLabel]="'First dial'" />
    <ui-lib-speed-dial [model]="secondModel()" [buttonAriaLabel]="'Second dial'" />
  `,
})
class SpeedDialMultiA11yHostComponent {
  public readonly firstModel: WritableSignal<readonly SpeedDialItem[]> = signal<
    readonly SpeedDialItem[]
  >([{ label: 'Add', icon: 'plus' }]);
  public readonly secondModel: WritableSignal<readonly SpeedDialItem[]> = signal<
    readonly SpeedDialItem[]
  >([{ label: 'Edit', icon: 'pencil' }]);
}

function queryEl<T extends HTMLElement>(
  fixture: ComponentFixture<unknown>,
  selector: string
): T | null {
  return (fixture.nativeElement as HTMLElement).querySelector<T>(selector);
}

function queryAllEl<T extends HTMLElement>(
  fixture: ComponentFixture<unknown>,
  selector: string
): T[] {
  return Array.from((fixture.nativeElement as HTMLElement).querySelectorAll<T>(selector));
}

function triggerButton(fixture: ComponentFixture<unknown>): HTMLButtonElement {
  const el: HTMLButtonElement | null = queryEl<HTMLButtonElement>(
    fixture,
    '.ui-lib-speed-dial__button'
  );
  if (!el) {
    throw new Error('Expected trigger button to exist.');
  }
  return el;
}

function actionList(fixture: ComponentFixture<unknown>): HTMLUListElement | null {
  return queryEl<HTMLUListElement>(fixture, '.ui-lib-speed-dial__list');
}

function actionButtons(fixture: ComponentFixture<unknown>): HTMLButtonElement[] {
  return queryAllEl<HTMLButtonElement>(fixture, '.ui-lib-speed-dial__action');
}

function dispatchKey(target: HTMLElement, key: string): void {
  target.dispatchEvent(new KeyboardEvent('keydown', { key, bubbles: true, cancelable: true }));
}

async function detectAndWait(fixture: ComponentFixture<unknown>): Promise<void> {
  fixture.detectChanges();
  await fixture.whenStable();
  fixture.detectChanges();
  await fixture.whenStable();
}

async function createFixture(): Promise<ComponentFixture<SpeedDialA11yHostComponent>> {
  const consoleWarnSpy: jest.SpyInstance = jest
    .spyOn(console, 'warn')
    .mockImplementation((): void => undefined);

  await TestBed.configureTestingModule({
    imports: [SpeedDialA11yHostComponent],
    providers: [provideZonelessChangeDetection()],
  }).compileComponents();

  const fixture: ComponentFixture<SpeedDialA11yHostComponent> = TestBed.createComponent(
    SpeedDialA11yHostComponent
  );
  document.body.appendChild(fixture.nativeElement);
  await detectAndWait(fixture);

  consoleWarnSpy.mockRestore();
  return fixture;
}

async function createMultiFixture(): Promise<ComponentFixture<SpeedDialMultiA11yHostComponent>> {
  const consoleWarnSpy: jest.SpyInstance = jest
    .spyOn(console, 'warn')
    .mockImplementation((): void => undefined);

  await TestBed.configureTestingModule({
    imports: [SpeedDialMultiA11yHostComponent],
    providers: [provideZonelessChangeDetection()],
  }).compileComponents();

  const fixture: ComponentFixture<SpeedDialMultiA11yHostComponent> = TestBed.createComponent(
    SpeedDialMultiA11yHostComponent
  );
  document.body.appendChild(fixture.nativeElement);
  await detectAndWait(fixture);

  consoleWarnSpy.mockRestore();
  return fixture;
}

async function openByClick(fixture: ComponentFixture<unknown>): Promise<void> {
  triggerButton(fixture).click();
  await detectAndWait(fixture);
}

describe('SpeedDial Accessibility', (): void => {
  let fixture:
    | ComponentFixture<SpeedDialA11yHostComponent>
    | ComponentFixture<SpeedDialMultiA11yHostComponent>
    | undefined;

  afterEach((): void => {
    if (fixture) {
      (fixture.nativeElement as HTMLElement).remove();
      fixture.destroy();
    }
    fixture = undefined;
  });

  describe('ARIA structure', (): void => {
    it('trigger has aria-expanded="false" when closed', async (): Promise<void> => {
      fixture = await createFixture();
      expect(triggerButton(fixture).getAttribute('aria-expanded')).toBe('false');
    });

    it('trigger has aria-expanded="true" when open', async (): Promise<void> => {
      fixture = await createFixture();
      await openByClick(fixture);
      expect(triggerButton(fixture).getAttribute('aria-expanded')).toBe('true');
    });

    it('trigger has aria-haspopup="true"', async (): Promise<void> => {
      fixture = await createFixture();
      expect(triggerButton(fixture).getAttribute('aria-haspopup')).toBe('true');
    });

    it('trigger has aria-controls pointing to the action list id', async (): Promise<void> => {
      fixture = await createFixture();
      await openByClick(fixture);
      const instance: SpeedDialComponent = fixture.debugElement.query(
        By.directive(SpeedDialComponent)
      ).componentInstance as SpeedDialComponent;
      expect(triggerButton(fixture).getAttribute('aria-controls')).toBe(instance.listId);
      expect(actionList(fixture)?.getAttribute('id')).toBe(instance.listId);
    });

    it('action list has role="menu"', async (): Promise<void> => {
      fixture = await createFixture();
      expect(actionList(fixture)?.getAttribute('role')).toBe('menu');
    });

    it('action list is hidden from assistive technology when closed', async (): Promise<void> => {
      fixture = await createFixture();
      expect(actionList(fixture)?.getAttribute('aria-hidden')).toBe('true');
    });

    it('action list is visible to assistive technology when open', async (): Promise<void> => {
      fixture = await createFixture();
      await openByClick(fixture);
      // aria-hidden becomes "false" (not removed) when the list is shown
      expect(actionList(fixture)?.getAttribute('aria-hidden')).toBe('false');
    });

    it('each action button has role="menuitem"', async (): Promise<void> => {
      fixture = await createFixture();
      await openByClick(fixture);
      const buttons: HTMLButtonElement[] = actionButtons(fixture);
      expect(buttons.length).toBe(3);
      for (const button of buttons) {
        expect(button.getAttribute('role')).toBe('menuitem');
      }
    });

    it('each action button has an aria-label sourced from item.label', async (): Promise<void> => {
      fixture = await createFixture();
      await openByClick(fixture);
      const buttons: HTMLButtonElement[] = actionButtons(fixture);
      expect(buttons[0]?.getAttribute('aria-label')).toBe('Add');
      expect(buttons[1]?.getAttribute('aria-label')).toBe('Edit');
      expect(buttons[2]?.getAttribute('aria-label')).toBe('Delete');
    });

    it('<li> wrappers have role="none" to remove list semantics', async (): Promise<void> => {
      fixture = await createFixture();
      await openByClick(fixture);
      const listItems: HTMLLIElement[] = queryAllEl<HTMLLIElement>(fixture, 'li');
      expect(listItems.length).toBe(3);
      for (const li of listItems) {
        expect(li.getAttribute('role')).toBe('none');
      }
    });

    it('disabled action item gets aria-disabled="true"', async (): Promise<void> => {
      fixture = await createFixture();
      fixture.componentInstance.model.set([
        { label: 'Add', icon: 'plus' },
        { label: 'Edit', icon: 'pencil', disabled: true },
      ]);
      await openByClick(fixture);
      const buttons: HTMLButtonElement[] = actionButtons(fixture);
      expect(buttons[0]?.getAttribute('aria-disabled')).toBeNull();
      expect(buttons[1]?.getAttribute('aria-disabled')).toBe('true');
    });

    it('multiple instances generate unique list IDs', async (): Promise<void> => {
      fixture = await createMultiFixture();
      const instances: SpeedDialComponent[] = fixture.debugElement
        .queryAll(By.directive(SpeedDialComponent))
        .map(
          (debugEl: DebugElement): SpeedDialComponent =>
            debugEl.componentInstance as SpeedDialComponent
        );
      expect(instances.length).toBe(2);
      expect(instances[0]?.listId).not.toBe(instances[1]?.listId);
    });
  });

  describe('keyboard interaction', (): void => {
    it('ArrowDown on trigger opens the menu and focuses the first action', async (): Promise<void> => {
      fixture = await createFixture();
      // direction='down': ArrowDown opens the menu
      fixture.componentInstance.direction.set('down');
      await detectAndWait(fixture);
      dispatchKey(triggerButton(fixture), 'ArrowDown');
      await detectAndWait(fixture);
      const buttons: HTMLButtonElement[] = actionButtons(fixture);
      expect(document.activeElement).toBe(buttons[0]);
    });

    it('ArrowUp on trigger opens the menu and focuses the first action', async (): Promise<void> => {
      fixture = await createFixture();
      // direction='up': ArrowUp opens the menu
      dispatchKey(triggerButton(fixture), 'ArrowUp');
      await detectAndWait(fixture);
      const buttons: HTMLButtonElement[] = actionButtons(fixture);
      expect(document.activeElement).toBe(buttons[0]);
    });

    it('ArrowDown on an action moves focus to the next action (direction=down)', async (): Promise<void> => {
      fixture = await createFixture();
      fixture.componentInstance.direction.set('down');
      await openByClick(fixture);
      const instance: SpeedDialComponent = fixture.debugElement.query(
        By.directive(SpeedDialComponent)
      ).componentInstance as SpeedDialComponent;
      const buttons: HTMLButtonElement[] = actionButtons(fixture);
      // Use focusItem so both DOM focus and the focusedItemIndex signal are in sync
      instance.focusItem(0);
      dispatchKey(buttons[0] as HTMLButtonElement, 'ArrowDown');
      await detectAndWait(fixture);
      expect(document.activeElement).toBe(buttons[1]);
    });

    it('ArrowUp on an action moves focus to the previous action (direction=down)', async (): Promise<void> => {
      fixture = await createFixture();
      fixture.componentInstance.direction.set('down');
      await openByClick(fixture);
      const instance: SpeedDialComponent = fixture.debugElement.query(
        By.directive(SpeedDialComponent)
      ).componentInstance as SpeedDialComponent;
      const buttons: HTMLButtonElement[] = actionButtons(fixture);
      // Use focusItem so both DOM focus and the focusedItemIndex signal are in sync
      instance.focusItem(1);
      dispatchKey(buttons[1] as HTMLButtonElement, 'ArrowUp');
      await detectAndWait(fixture);
      expect(document.activeElement).toBe(buttons[0]);
    });

    it('Escape on an action closes the menu and restores focus to the trigger', async (): Promise<void> => {
      fixture = await createFixture();
      await openByClick(fixture);
      const buttons: HTMLButtonElement[] = actionButtons(fixture);
      buttons[0]?.focus();
      dispatchKey(buttons[0] as HTMLButtonElement, 'Escape');
      await detectAndWait(fixture);
      expect(triggerButton(fixture).getAttribute('aria-expanded')).toBe('false');
      expect(document.activeElement).toBe(triggerButton(fixture));
    });

    it('document Escape closes the menu and restores focus to the trigger', async (): Promise<void> => {
      fixture = await createFixture();
      await openByClick(fixture);
      const buttons: HTMLButtonElement[] = actionButtons(fixture);
      buttons[0]?.focus();
      document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
      await detectAndWait(fixture);
      expect(triggerButton(fixture).getAttribute('aria-expanded')).toBe('false');
      expect(document.activeElement).toBe(triggerButton(fixture));
    });
  });

  describe('axe-core', (): void => {
    it('has no detectable violations in the default closed state', async (): Promise<void> => {
      fixture = await createFixture();
      await checkA11y(fixture, { rules: SPEED_DIAL_AXE_RULES });
    });

    it('has no detectable violations with the menu open', async (): Promise<void> => {
      fixture = await createFixture();
      await openByClick(fixture);
      await checkA11y(fixture, { rules: SPEED_DIAL_AXE_RULES });
    });

    it('has no detectable violations for the bootstrap variant', async (): Promise<void> => {
      fixture = await createFixture();
      fixture.componentInstance.variant.set('bootstrap');
      await openByClick(fixture);
      await checkA11y(fixture, { rules: SPEED_DIAL_AXE_RULES });
    });

    it('has no detectable violations for the minimal variant', async (): Promise<void> => {
      fixture = await createFixture();
      fixture.componentInstance.variant.set('minimal');
      await openByClick(fixture);
      await checkA11y(fixture, { rules: SPEED_DIAL_AXE_RULES });
    });
  });
});
