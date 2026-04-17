import {
  ChangeDetectionStrategy,
  Component,
  provideZonelessChangeDetection,
  signal,
  type DebugElement,
  type WritableSignal,
} from '@angular/core';
import { By } from '@angular/platform-browser';
import { TestBed } from '@angular/core/testing';
import type { ComponentFixture } from '@angular/core/testing';
import { KEYBOARD_KEYS } from 'ui-lib-custom/core';
import { SpeedDialComponent } from './speed-dial.component';
import type {
  SpeedDialClickEvent,
  SpeedDialDirection,
  SpeedDialHideEvent,
  SpeedDialItem,
  SpeedDialItemCommandEvent,
  SpeedDialShowEvent,
  SpeedDialSize,
  SpeedDialType,
  SpeedDialVariant,
  SpeedDialVisibleChangeEvent,
} from './speed-dial.types';

@Component({
  standalone: true,
  imports: [SpeedDialComponent],
  template: `
    <div class="outside-target">outside</div>
    <ui-lib-speed-dial
      [model]="model()"
      [type]="type()"
      [direction]="direction()"
      [radius]="radius()"
      [transitionDelay]="transitionDelay()"
      [mask]="mask()"
      [disabled]="disabled()"
      [hideOnClickOutside]="hideOnClickOutside()"
      [variant]="variant()"
      [size]="size()"
      [styleClass]="styleClass()"
      [buttonAriaLabel]="buttonAriaLabel()"
      [ariaLabel]="ariaLabel()"
      [(visible)]="visible"
      (onShow)="onShowEvent($event)"
      (onHide)="onHideEvent($event)"
      (onVisibleChange)="onVisibleChangeEvent($event)"
      (onClick)="onClickEvent($event)"
      (onItemCommand)="onItemCommandEvent($event)"
    />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class SpeedDialHostComponent {
  public readonly model: WritableSignal<readonly SpeedDialItem[]> = signal<
    readonly SpeedDialItem[]
  >([]);
  public readonly type: WritableSignal<SpeedDialType> = signal<SpeedDialType>('linear');
  public readonly direction: WritableSignal<SpeedDialDirection> = signal<SpeedDialDirection>('up');
  public readonly radius: WritableSignal<number> = signal<number>(0);
  public readonly transitionDelay: WritableSignal<number> = signal<number>(30);
  public readonly mask: WritableSignal<boolean> = signal<boolean>(false);
  public readonly disabled: WritableSignal<boolean> = signal<boolean>(false);
  public readonly hideOnClickOutside: WritableSignal<boolean> = signal<boolean>(true);
  public readonly variant: WritableSignal<SpeedDialVariant | null> =
    signal<SpeedDialVariant | null>('material');
  public readonly size: WritableSignal<SpeedDialSize> = signal<SpeedDialSize>('md');
  public readonly styleClass: WritableSignal<string | null> = signal<string | null>(null);
  public readonly buttonAriaLabel: WritableSignal<string | null> = signal<string | null>(null);
  public readonly ariaLabel: WritableSignal<string | null> = signal<string | null>(null);

  public visible: boolean = false;

  public readonly orderLog: string[] = [];
  public readonly showEvents: SpeedDialShowEvent[] = [];
  public readonly hideEvents: SpeedDialHideEvent[] = [];
  public readonly visibleChangeEvents: SpeedDialVisibleChangeEvent[] = [];
  public readonly clickEvents: SpeedDialClickEvent[] = [];
  public readonly itemCommandEvents: SpeedDialItemCommandEvent[] = [];

  public onShowEvent(event: SpeedDialShowEvent): void {
    this.orderLog.push('show');
    this.showEvents.push(event);
  }

  public onHideEvent(event: SpeedDialHideEvent): void {
    this.orderLog.push('hide');
    this.hideEvents.push(event);
  }

  public onVisibleChangeEvent(event: SpeedDialVisibleChangeEvent): void {
    this.orderLog.push(`visible:${String(event.visible)}`);
    this.visibleChangeEvents.push(event);
  }

  public onClickEvent(event: SpeedDialClickEvent): void {
    this.orderLog.push(`click:${String(event.visible)}`);
    this.clickEvents.push(event);
  }

  public onItemCommandEvent(event: SpeedDialItemCommandEvent): void {
    this.itemCommandEvents.push(event);
  }
}

describe('SpeedDialComponent', (): void => {
  let consoleWarnSpy: jest.SpiedFunction<typeof console.warn>;

  beforeEach(async (): Promise<void> => {
    consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation((): void => undefined);
    await TestBed.configureTestingModule({
      imports: [SpeedDialHostComponent],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();
  });

  afterEach((): void => {
    consoleWarnSpy.mockRestore();
  });

  function createHost(
    initial?: Partial<SpeedDialHostComponent>
  ): ComponentFixture<SpeedDialHostComponent> {
    const fixture: ComponentFixture<SpeedDialHostComponent> =
      TestBed.createComponent(SpeedDialHostComponent);
    if (initial) {
      Object.assign(fixture.componentInstance, initial);
    }
    fixture.detectChanges();
    return fixture;
  }

  async function detectAndFlush<T>(fixture: ComponentFixture<T>): Promise<void> {
    fixture.detectChanges();
    await Promise.resolve();
    fixture.detectChanges();
  }

  function getSpeedDialDebugElement(
    fixture: ComponentFixture<SpeedDialHostComponent>
  ): DebugElement {
    return fixture.debugElement.query(By.directive(SpeedDialComponent));
  }

  function getSpeedDialInstance(
    fixture: ComponentFixture<SpeedDialHostComponent>
  ): SpeedDialComponent {
    return getSpeedDialDebugElement(fixture).componentInstance as SpeedDialComponent;
  }

  function getHostElement(fixture: ComponentFixture<SpeedDialHostComponent>): HTMLElement {
    const hostElement: HTMLElement | null = (fixture.nativeElement as HTMLElement).querySelector(
      'ui-lib-speed-dial'
    );
    if (!hostElement) {
      throw new Error('Expected SpeedDial host element to exist.');
    }
    return hostElement;
  }

  function getTriggerButton(fixture: ComponentFixture<SpeedDialHostComponent>): HTMLButtonElement {
    const trigger: HTMLButtonElement | null = (fixture.nativeElement as HTMLElement).querySelector(
      '.ui-lib-speed-dial__button'
    );
    if (!trigger) {
      throw new Error('Expected trigger button to exist.');
    }
    return trigger;
  }

  function getListElement(fixture: ComponentFixture<SpeedDialHostComponent>): HTMLUListElement {
    const list: HTMLUListElement | null = (fixture.nativeElement as HTMLElement).querySelector(
      '.ui-lib-speed-dial__list'
    );
    if (!list) {
      throw new Error('Expected list element to exist.');
    }
    return list;
  }

  function getActionButtons(
    fixture: ComponentFixture<SpeedDialHostComponent>
  ): HTMLButtonElement[] {
    return Array.from(
      (fixture.nativeElement as HTMLElement).querySelectorAll('.ui-lib-speed-dial__action')
    ) as HTMLButtonElement[];
  }

  function getActionButton(
    fixture: ComponentFixture<SpeedDialHostComponent>,
    index: number
  ): HTMLButtonElement {
    const action: HTMLButtonElement | undefined = getActionButtons(fixture)[index];
    if (!action) {
      throw new Error(`Expected action button at index ${String(index)} to exist.`);
    }
    return action;
  }

  function getMaskElement(fixture: ComponentFixture<SpeedDialHostComponent>): HTMLElement | null {
    return (fixture.nativeElement as HTMLElement).querySelector('.ui-lib-speed-dial__mask');
  }

  function dispatchKeydown(element: HTMLElement, key: string): KeyboardEvent {
    const event: KeyboardEvent = new KeyboardEvent('keydown', {
      key,
      bubbles: true,
      cancelable: true,
    });
    element.dispatchEvent(event);
    return event;
  }

  function createTestItems(commandSpy?: jest.Mock): readonly SpeedDialItem[] {
    const addItem: SpeedDialItem = {
      label: 'Add',
      icon: 'plus',
      tooltip: 'Add item',
      ...(commandSpy ? { command: commandSpy } : {}),
    };

    return [
      addItem,
      {
        label: 'Edit',
        icon: 'pencil',
      },
    ];
  }

  it('renders trigger and hidden list by default', (): void => {
    const fixture: ComponentFixture<SpeedDialHostComponent> = createHost();

    const trigger: HTMLButtonElement = getTriggerButton(fixture);
    const list: HTMLUListElement = getListElement(fixture);

    expect(trigger).toBeTruthy();
    expect(list.hidden).toBe(true);
    expect(trigger.getAttribute('aria-expanded')).toBe('false');
  });

  it('renders items and sets aria-expanded true when visible is true', async (): Promise<void> => {
    const fixture: ComponentFixture<SpeedDialHostComponent> = createHost();
    fixture.componentInstance.model.set(createTestItems());
    fixture.componentInstance.visible = true;
    await detectAndFlush(fixture);

    expect(getActionButtons(fixture).length).toBe(2);
    expect(getTriggerButton(fixture).getAttribute('aria-expanded')).toBe('true');
  });

  it('applies each variant host class', async (): Promise<void> => {
    const fixture: ComponentFixture<SpeedDialHostComponent> = createHost();
    const host: SpeedDialHostComponent = fixture.componentInstance;
    const variants: SpeedDialVariant[] = ['material', 'bootstrap', 'minimal'];

    for (const variant of variants) {
      host.variant.set(variant);
      await detectAndFlush(fixture);

      const hostElement: HTMLElement = getHostElement(fixture);
      expect(hostElement.className).toContain(`ui-lib-speed-dial--${variant}`);
    }
  });

  it('applies each size host class', async (): Promise<void> => {
    const fixture: ComponentFixture<SpeedDialHostComponent> = createHost();
    const host: SpeedDialHostComponent = fixture.componentInstance;
    const sizes: SpeedDialSize[] = ['sm', 'md', 'lg'];

    for (const size of sizes) {
      host.size.set(size);
      await detectAndFlush(fixture);

      const hostElement: HTMLElement = getHostElement(fixture);
      expect(hostElement.className).toContain(`ui-lib-speed-dial--${size}`);
    }
  });

  it('applies each type host class', async (): Promise<void> => {
    const fixture: ComponentFixture<SpeedDialHostComponent> = createHost();
    const host: SpeedDialHostComponent = fixture.componentInstance;
    const types: SpeedDialType[] = ['linear', 'circle', 'semi-circle', 'quarter-circle'];

    for (const type of types) {
      host.type.set(type);
      await detectAndFlush(fixture);

      const hostElement: HTMLElement = getHostElement(fixture);
      expect(hostElement.className).toContain(`ui-lib-speed-dial--${type}`);
    }
  });

  it('applies direction class for linear and custom styleClass', async (): Promise<void> => {
    const fixture: ComponentFixture<SpeedDialHostComponent> = createHost();
    const host: SpeedDialHostComponent = fixture.componentInstance;

    host.type.set('linear');
    host.direction.set('left');
    host.styleClass.set('custom-speed-dial');
    await detectAndFlush(fixture);

    const hostElement: HTMLElement = getHostElement(fixture);
    expect(hostElement.className).toContain('ui-lib-speed-dial--dir-left');
    expect(hostElement.className).toContain('custom-speed-dial');
  });

  it('filters out items where visible is false', async (): Promise<void> => {
    const fixture: ComponentFixture<SpeedDialHostComponent> = createHost();
    fixture.componentInstance.model.set([
      { label: 'Shown', icon: 'plus' },
      { label: 'Hidden', icon: 'times', visible: false },
    ]);
    fixture.componentInstance.visible = true;
    await detectAndFlush(fixture);

    expect(getActionButtons(fixture).length).toBe(1);
  });

  it('renders tooltip as title and blocks disabled item command', async (): Promise<void> => {
    const commandSpy: jest.Mock = jest.fn();
    const fixture: ComponentFixture<SpeedDialHostComponent> = createHost();
    fixture.componentInstance.model.set([
      { label: 'Disabled', disabled: true, tooltip: 'Blocked', command: commandSpy },
    ]);
    fixture.componentInstance.visible = true;
    await detectAndFlush(fixture);

    const firstAction: HTMLButtonElement = getActionButtons(fixture)[0] as HTMLButtonElement;
    expect(firstAction.getAttribute('title')).toBe('Blocked');
    expect(firstAction.getAttribute('aria-disabled')).toBe('true');

    firstAction.click();
    await detectAndFlush(fixture);

    expect(commandSpy).not.toHaveBeenCalled();
    expect(fixture.componentInstance.itemCommandEvents).toHaveLength(0);
  });

  it('invokes item command, emits onItemCommand, and closes after click', async (): Promise<void> => {
    const commandSpy: jest.Mock = jest.fn();
    const fixture: ComponentFixture<SpeedDialHostComponent> = createHost();
    fixture.componentInstance.model.set(createTestItems(commandSpy));
    fixture.componentInstance.visible = true;
    await detectAndFlush(fixture);

    const firstAction: HTMLButtonElement = getActionButtons(fixture)[0] as HTMLButtonElement;
    firstAction.click();
    await detectAndFlush(fixture);

    expect(commandSpy).toHaveBeenCalledTimes(1);
    expect(fixture.componentInstance.itemCommandEvents).toHaveLength(1);
    expect(fixture.componentInstance.visible).toBe(false);

    const payload: SpeedDialItemCommandEvent = fixture.componentInstance
      .itemCommandEvents[0] as SpeedDialItemCommandEvent;
    expect(payload.index).toBe(0);
    expect(payload.item.label).toBe('Add');
  });

  it('toggles visibility on trigger click and emits open/close order', async (): Promise<void> => {
    const fixture: ComponentFixture<SpeedDialHostComponent> = createHost();

    const trigger: HTMLButtonElement = getTriggerButton(fixture);
    trigger.click();
    await detectAndFlush(fixture);

    expect(fixture.componentInstance.visible).toBe(true);
    expect(fixture.componentInstance.orderLog).toEqual(['click:true', 'visible:true', 'show']);

    fixture.componentInstance.orderLog.length = 0;
    trigger.click();
    await detectAndFlush(fixture);

    expect(fixture.componentInstance.visible).toBe(false);
    expect(fixture.componentInstance.orderLog).toEqual(['click:false', 'visible:false', 'hide']);
  });

  it('does not open when disabled is true', async (): Promise<void> => {
    const fixture: ComponentFixture<SpeedDialHostComponent> = createHost();
    fixture.componentInstance.disabled.set(true);
    await detectAndFlush(fixture);

    getTriggerButton(fixture).click();
    await detectAndFlush(fixture);

    expect(fixture.componentInstance.visible).toBe(false);
    expect(fixture.componentInstance.clickEvents).toHaveLength(0);
  });

  it('renders mask only when mask=true and visible=true, and mask click closes', async (): Promise<void> => {
    const fixture: ComponentFixture<SpeedDialHostComponent> = createHost();
    fixture.componentInstance.mask.set(true);
    fixture.componentInstance.visible = true;
    await detectAndFlush(fixture);

    const mask: HTMLElement | null = getMaskElement(fixture);
    expect(mask).toBeTruthy();

    (mask as HTMLElement).click();
    await detectAndFlush(fixture);

    expect(fixture.componentInstance.visible).toBe(false);
  });

  it('does not render mask when mask=false', async (): Promise<void> => {
    const fixture: ComponentFixture<SpeedDialHostComponent> = createHost();
    fixture.componentInstance.mask.set(false);
    fixture.componentInstance.visible = true;
    await detectAndFlush(fixture);

    expect(getMaskElement(fixture)).toBeNull();
  });

  it('closes on outside document click when open', async (): Promise<void> => {
    const fixture: ComponentFixture<SpeedDialHostComponent> = createHost();
    fixture.componentInstance.visible = true;
    await detectAndFlush(fixture);

    const instance: SpeedDialComponent = getSpeedDialInstance(fixture);
    instance.onDocumentClick({ target: document.body } as unknown as MouseEvent);
    await detectAndFlush(fixture);

    expect(instance.visible()).toBe(false);
  });

  it('does not close on outside click when hideOnClickOutside=false', async (): Promise<void> => {
    const fixture: ComponentFixture<SpeedDialHostComponent> = createHost();
    fixture.componentInstance.hideOnClickOutside.set(false);
    fixture.componentInstance.visible = true;
    await detectAndFlush(fixture);

    const instance: SpeedDialComponent = getSpeedDialInstance(fixture);
    instance.onDocumentClick({ target: document.body } as unknown as MouseEvent);
    await detectAndFlush(fixture);

    expect(fixture.componentInstance.visible).toBe(true);
  });

  it('trigger keyboard Enter and Space toggle visibility', async (): Promise<void> => {
    const fixture: ComponentFixture<SpeedDialHostComponent> = createHost();
    const trigger: HTMLButtonElement = getTriggerButton(fixture);

    dispatchKeydown(trigger, KEYBOARD_KEYS.Enter);
    await detectAndFlush(fixture);
    expect(fixture.componentInstance.visible).toBe(true);

    dispatchKeydown(trigger, KEYBOARD_KEYS.Space);
    await detectAndFlush(fixture);
    expect(fixture.componentInstance.visible).toBe(false);
  });

  it('trigger keyboard Escape closes when open', async (): Promise<void> => {
    const fixture: ComponentFixture<SpeedDialHostComponent> = createHost();
    fixture.componentInstance.visible = true;
    await detectAndFlush(fixture);

    const instance: SpeedDialComponent = getSpeedDialInstance(fixture);
    const event: KeyboardEvent = new KeyboardEvent('keydown', {
      key: KEYBOARD_KEYS.Escape,
      bubbles: true,
      cancelable: true,
    });
    instance.onDocumentEscape(event);
    await detectAndFlush(fixture);

    expect(instance.visible()).toBe(false);
  });

  it('onDocumentEscape ignores non-keyboard events and ignores escape when already closed', async (): Promise<void> => {
    const fixture: ComponentFixture<SpeedDialHostComponent> = createHost();
    const instance: SpeedDialComponent = getSpeedDialInstance(fixture);

    fixture.componentInstance.visible = true;
    await detectAndFlush(fixture);
    instance.onDocumentEscape(new Event('keydown'));
    await detectAndFlush(fixture);
    expect(fixture.componentInstance.visible).toBe(true);

    fixture.componentInstance.visible = false;
    await detectAndFlush(fixture);
    instance.onDocumentEscape(new KeyboardEvent('keydown', { key: KEYBOARD_KEYS.Escape }));
    await detectAndFlush(fixture);
    expect(fixture.componentInstance.visible).toBe(false);
  });

  it('applies computed layout transforms to action items', async (): Promise<void> => {
    const fixture: ComponentFixture<SpeedDialHostComponent> = createHost();
    fixture.componentInstance.type.set('circle');
    fixture.componentInstance.direction.set('up');
    fixture.componentInstance.model.set(createTestItems());
    fixture.componentInstance.visible = true;
    await detectAndFlush(fixture);

    const actions: HTMLButtonElement[] = getActionButtons(fixture);
    expect(actions).toHaveLength(2);
    expect((actions[0] as HTMLButtonElement).style.transform).toContain('translate');
    expect((actions[1] as HTMLButtonElement).style.transform).toContain('translate');
  });

  it('applies transition delay per item index', async (): Promise<void> => {
    const fixture: ComponentFixture<SpeedDialHostComponent> = createHost();
    fixture.componentInstance.transitionDelay.set(45);
    fixture.componentInstance.model.set(createTestItems());
    fixture.componentInstance.visible = true;
    await detectAndFlush(fixture);

    expect(getActionButton(fixture, 0).style.transitionDelay).toBe('0ms');
    expect(getActionButton(fixture, 1).style.transitionDelay).toBe('45ms');
  });

  it('trigger ArrowDown opens and focuses first item', async (): Promise<void> => {
    const fixture: ComponentFixture<SpeedDialHostComponent> = createHost();
    fixture.componentInstance.direction.set('down');
    fixture.componentInstance.model.set(createTestItems());
    await detectAndFlush(fixture);

    dispatchKeydown(getTriggerButton(fixture), KEYBOARD_KEYS.ArrowDown);
    await detectAndFlush(fixture);

    const actions: HTMLButtonElement[] = getActionButtons(fixture);
    expect(fixture.componentInstance.visible).toBe(true);
    expect(document.activeElement).toBe(actions[0]);
  });

  it('trigger Arrow keys respect direction when opening', async (): Promise<void> => {
    const fixture: ComponentFixture<SpeedDialHostComponent> = createHost();
    fixture.componentInstance.model.set(createTestItems());
    await detectAndFlush(fixture);

    fixture.componentInstance.direction.set('up');
    await detectAndFlush(fixture);
    const blockedEvent: KeyboardEvent = dispatchKeydown(
      getTriggerButton(fixture),
      KEYBOARD_KEYS.ArrowDown
    );
    await detectAndFlush(fixture);
    expect(blockedEvent.defaultPrevented).toBe(false);
    expect(fixture.componentInstance.visible).toBe(false);

    fixture.componentInstance.direction.set('left');
    await detectAndFlush(fixture);
    dispatchKeydown(getTriggerButton(fixture), KEYBOARD_KEYS.ArrowLeft);
    await detectAndFlush(fixture);
    expect(fixture.componentInstance.visible).toBe(true);
    expect(document.activeElement).toBe(getActionButtons(fixture)[0]);
  });

  it('trigger Arrow keys move focus when already open', async (): Promise<void> => {
    const fixture: ComponentFixture<SpeedDialHostComponent> = createHost();
    fixture.componentInstance.direction.set('down');
    fixture.componentInstance.model.set(createTestItems());
    fixture.componentInstance.visible = true;
    await detectAndFlush(fixture);

    const trigger: HTMLButtonElement = getTriggerButton(fixture);
    dispatchKeydown(trigger, KEYBOARD_KEYS.ArrowDown);
    await detectAndFlush(fixture);
    const actions: HTMLButtonElement[] = getActionButtons(fixture);
    expect(document.activeElement).toBe(actions[1]);

    dispatchKeydown(trigger, KEYBOARD_KEYS.ArrowDown);
    await detectAndFlush(fixture);
    expect(document.activeElement).toBe(actions[0]);
  });

  it('item ArrowDown/ArrowUp move focus and wrap', async (): Promise<void> => {
    const fixture: ComponentFixture<SpeedDialHostComponent> = createHost();
    fixture.componentInstance.direction.set('down');
    fixture.componentInstance.model.set(createTestItems());
    fixture.componentInstance.visible = true;
    await detectAndFlush(fixture);

    const actions: HTMLButtonElement[] = getActionButtons(fixture);
    (actions[0] as HTMLButtonElement).focus();
    dispatchKeydown(actions[0] as HTMLButtonElement, KEYBOARD_KEYS.ArrowDown);
    await detectAndFlush(fixture);
    expect(document.activeElement).toBe(actions[1]);

    dispatchKeydown(actions[1] as HTMLButtonElement, KEYBOARD_KEYS.ArrowDown);
    await detectAndFlush(fixture);
    expect(document.activeElement).toBe(actions[0]);

    dispatchKeydown(actions[0] as HTMLButtonElement, KEYBOARD_KEYS.ArrowUp);
    await detectAndFlush(fixture);
    expect(document.activeElement).toBe(actions[1]);
  });

  it('item Home and End jump to first and last', async (): Promise<void> => {
    const fixture: ComponentFixture<SpeedDialHostComponent> = createHost();
    fixture.componentInstance.direction.set('down');
    fixture.componentInstance.model.set(createTestItems());
    fixture.componentInstance.visible = true;
    await detectAndFlush(fixture);

    const actions: HTMLButtonElement[] = getActionButtons(fixture);
    (actions[0] as HTMLButtonElement).focus();

    dispatchKeydown(actions[0] as HTMLButtonElement, KEYBOARD_KEYS.End);
    await detectAndFlush(fixture);
    expect(document.activeElement).toBe(actions[1]);

    dispatchKeydown(actions[1] as HTMLButtonElement, KEYBOARD_KEYS.Home);
    await detectAndFlush(fixture);
    expect(document.activeElement).toBe(actions[0]);
  });

  it('item ignores arrow keys that are not valid for current axis', async (): Promise<void> => {
    const fixture: ComponentFixture<SpeedDialHostComponent> = createHost();
    fixture.componentInstance.direction.set('down');
    fixture.componentInstance.model.set(createTestItems());
    fixture.componentInstance.visible = true;
    await detectAndFlush(fixture);

    const firstAction: HTMLButtonElement = getActionButton(fixture, 0);
    firstAction.focus();
    const event: KeyboardEvent = dispatchKeydown(firstAction, KEYBOARD_KEYS.ArrowRight);
    await detectAndFlush(fixture);

    expect(document.activeElement).toBe(firstAction);
    expect(event.defaultPrevented).toBe(false);
  });

  it('item Enter and Space invoke command', async (): Promise<void> => {
    const commandSpy: jest.Mock = jest.fn();
    const fixture: ComponentFixture<SpeedDialHostComponent> = createHost();
    fixture.componentInstance.model.set(createTestItems(commandSpy));
    fixture.componentInstance.visible = true;
    await detectAndFlush(fixture);

    const firstAction: HTMLButtonElement = getActionButtons(fixture)[0] as HTMLButtonElement;
    dispatchKeydown(firstAction, KEYBOARD_KEYS.Enter);
    await detectAndFlush(fixture);

    fixture.componentInstance.visible = true;
    await detectAndFlush(fixture);

    dispatchKeydown(getActionButtons(fixture)[0] as HTMLButtonElement, KEYBOARD_KEYS.Space);
    await detectAndFlush(fixture);

    expect(commandSpy).toHaveBeenCalledTimes(2);
  });

  it('item Escape closes and returns focus to trigger', async (): Promise<void> => {
    const fixture: ComponentFixture<SpeedDialHostComponent> = createHost();
    fixture.componentInstance.model.set(createTestItems());
    fixture.componentInstance.visible = true;
    await detectAndFlush(fixture);

    const trigger: HTMLButtonElement = getTriggerButton(fixture);
    const firstAction: HTMLButtonElement = getActionButtons(fixture)[0] as HTMLButtonElement;
    firstAction.focus();

    dispatchKeydown(firstAction, KEYBOARD_KEYS.Escape);
    await detectAndFlush(fixture);

    expect(fixture.componentInstance.visible).toBe(false);
    expect(document.activeElement).toBe(trigger);
  });

  it('item Tab closes and does not prevent default', async (): Promise<void> => {
    const fixture: ComponentFixture<SpeedDialHostComponent> = createHost();
    fixture.componentInstance.model.set(createTestItems());
    fixture.componentInstance.visible = true;
    await detectAndFlush(fixture);

    const firstAction: HTMLButtonElement = getActionButtons(fixture)[0] as HTMLButtonElement;
    const tabEvent: KeyboardEvent = dispatchKeydown(firstAction, KEYBOARD_KEYS.Tab);
    await detectAndFlush(fixture);

    expect(fixture.componentInstance.visible).toBe(false);
    expect(tabEvent.defaultPrevented).toBe(false);
  });

  it('trigger Tab closes and does not prevent default', async (): Promise<void> => {
    const fixture: ComponentFixture<SpeedDialHostComponent> = createHost();
    fixture.componentInstance.model.set(createTestItems());
    fixture.componentInstance.visible = true;
    await detectAndFlush(fixture);

    const tabEvent: KeyboardEvent = dispatchKeydown(getTriggerButton(fixture), KEYBOARD_KEYS.Tab);
    await detectAndFlush(fixture);

    expect(fixture.componentInstance.visible).toBe(false);
    expect(tabEvent.defaultPrevented).toBe(false);
  });

  it('unhandled keydown leaves trigger and item state unchanged', async (): Promise<void> => {
    const fixture: ComponentFixture<SpeedDialHostComponent> = createHost();
    fixture.componentInstance.model.set(createTestItems());
    fixture.componentInstance.visible = true;
    await detectAndFlush(fixture);

    const triggerEvent: KeyboardEvent = dispatchKeydown(getTriggerButton(fixture), 'a');
    await detectAndFlush(fixture);
    expect(triggerEvent.defaultPrevented).toBe(false);
    expect(fixture.componentInstance.visible).toBe(true);

    const firstAction: HTMLButtonElement = getActionButton(fixture, 0);
    const itemEvent: KeyboardEvent = dispatchKeydown(firstAction, 'a');
    await detectAndFlush(fixture);
    expect(itemEvent.defaultPrevented).toBe(false);
    expect(fixture.componentInstance.visible).toBe(true);
  });

  it('button aria label prefers buttonAriaLabel over ariaLabel', async (): Promise<void> => {
    const fixture: ComponentFixture<SpeedDialHostComponent> = createHost();
    fixture.componentInstance.ariaLabel.set('Fallback');
    await detectAndFlush(fixture);
    expect(getTriggerButton(fixture).getAttribute('aria-label')).toBe('Fallback');

    fixture.componentInstance.buttonAriaLabel.set('Primary');
    await detectAndFlush(fixture);
    expect(getTriggerButton(fixture).getAttribute('aria-label')).toBe('Primary');
  });

  it('returns focus to trigger when hidden while focus is in menu list', async (): Promise<void> => {
    const fixture: ComponentFixture<SpeedDialHostComponent> = createHost();
    fixture.componentInstance.model.set(createTestItems());
    fixture.componentInstance.visible = true;
    await detectAndFlush(fixture);

    const instance: SpeedDialComponent = getSpeedDialInstance(fixture);
    const firstAction: HTMLButtonElement = getActionButton(fixture, 0);
    firstAction.focus();
    instance.hide(new Event('hide-from-test'));
    await detectAndFlush(fixture);
    await Promise.resolve();

    expect(document.activeElement).toBe(getTriggerButton(fixture));
  });

  it('covers guard paths for show/hide/toggle/onItemClick/onDocumentClick/focusItem', async (): Promise<void> => {
    const fixture: ComponentFixture<SpeedDialHostComponent> = createHost();
    const instance: SpeedDialComponent = getSpeedDialInstance(fixture);

    fixture.componentInstance.disabled.set(true);
    await detectAndFlush(fixture);
    instance.toggle(new MouseEvent('click'));
    instance.show(new Event('show-while-disabled'));
    await detectAndFlush(fixture);
    expect(fixture.componentInstance.visible).toBe(false);

    fixture.componentInstance.disabled.set(false);
    fixture.componentInstance.visible = true;
    await detectAndFlush(fixture);
    instance.show(new Event('show-while-visible'));
    await detectAndFlush(fixture);
    expect(fixture.componentInstance.visible).toBe(true);

    fixture.componentInstance.visible = false;
    await detectAndFlush(fixture);
    instance.hide(new Event('hide-while-hidden'));
    await detectAndFlush(fixture);
    expect(fixture.componentInstance.visible).toBe(false);

    const preventDefaultSpy: jest.Mock<void, []> = jest.fn<void, []>();
    instance.onItemClick(
      { preventDefault: preventDefaultSpy } as unknown as MouseEvent,
      { label: 'Disabled item', disabled: true },
      0
    );
    expect(preventDefaultSpy).toHaveBeenCalledTimes(1);

    fixture.componentInstance.visible = true;
    await detectAndFlush(fixture);
    instance.onDocumentClick({ target: null } as unknown as MouseEvent);
    await detectAndFlush(fixture);
    expect(fixture.componentInstance.visible).toBe(true);

    fixture.componentInstance.model.set([{ label: 'Disabled', disabled: true }]);
    await detectAndFlush(fixture);
    instance.focusItem(-1);
    instance.focusItem(2);
    instance.focusItem(0);
    expect(instance.focusedItemIndex()).toBe(-1);
  });

  it('covers direction-specific deltas for right, left, up, and unknown directions', async (): Promise<void> => {
    const fixture: ComponentFixture<SpeedDialHostComponent> = createHost();
    fixture.componentInstance.model.set(createTestItems());
    fixture.componentInstance.visible = true;
    await detectAndFlush(fixture);

    fixture.componentInstance.direction.set('right');
    await detectAndFlush(fixture);
    let actions: HTMLButtonElement[] = getActionButtons(fixture);
    getActionButton(fixture, 0).focus();
    dispatchKeydown(getActionButton(fixture, 0), KEYBOARD_KEYS.ArrowRight);
    await detectAndFlush(fixture);
    expect(document.activeElement).toBe(actions[1]);
    dispatchKeydown(getActionButton(fixture, 1), KEYBOARD_KEYS.ArrowLeft);
    await detectAndFlush(fixture);
    expect(document.activeElement).toBe(actions[0]);

    fixture.componentInstance.direction.set('left');
    await detectAndFlush(fixture);
    actions = getActionButtons(fixture);
    getActionButton(fixture, 0).focus();
    dispatchKeydown(getActionButton(fixture, 0), KEYBOARD_KEYS.ArrowLeft);
    await detectAndFlush(fixture);
    expect(document.activeElement).toBe(actions[1]);
    dispatchKeydown(getActionButton(fixture, 1), KEYBOARD_KEYS.ArrowRight);
    await detectAndFlush(fixture);
    expect(document.activeElement).toBe(actions[0]);

    fixture.componentInstance.direction.set('up');
    await detectAndFlush(fixture);
    actions = getActionButtons(fixture);
    getActionButton(fixture, 0).focus();
    dispatchKeydown(getActionButton(fixture, 0), KEYBOARD_KEYS.ArrowUp);
    await detectAndFlush(fixture);
    expect(document.activeElement).toBe(actions[1]);
    dispatchKeydown(getActionButton(fixture, 1), KEYBOARD_KEYS.ArrowDown);
    await detectAndFlush(fixture);
    expect(document.activeElement).toBe(actions[0]);

    const instance: SpeedDialComponent = getSpeedDialInstance(fixture);
    fixture.componentInstance.direction.set('diagonal' as unknown as SpeedDialDirection);
    await detectAndFlush(fixture);
    instance.focusedItemIndex.set(0);
    dispatchKeydown(getTriggerButton(fixture), KEYBOARD_KEYS.ArrowRight);
    await detectAndFlush(fixture);
    expect(instance.focusedItemIndex()).toBe(1);
    dispatchKeydown(getTriggerButton(fixture), KEYBOARD_KEYS.ArrowLeft);
    await detectAndFlush(fixture);
    expect(instance.focusedItemIndex()).toBe(0);
  });

  it('trigger/list/items expose expected ARIA attributes', async (): Promise<void> => {
    const fixture: ComponentFixture<SpeedDialHostComponent> = createHost();
    fixture.componentInstance.model.set([{ label: 'First' }, { label: 'Second', disabled: true }]);
    fixture.componentInstance.visible = true;
    await detectAndFlush(fixture);

    const instance: SpeedDialComponent = getSpeedDialInstance(fixture);
    const trigger: HTMLButtonElement = getTriggerButton(fixture);
    const list: HTMLUListElement = getListElement(fixture);
    const actions: HTMLButtonElement[] = getActionButtons(fixture);

    expect(trigger.getAttribute('aria-haspopup')).toBe('true');
    expect(trigger.getAttribute('aria-expanded')).toBe('true');
    expect(trigger.getAttribute('aria-controls')).toBe(instance.listId);

    expect(list.getAttribute('id')).toBe(instance.listId);
    expect(list.getAttribute('role')).toBe('menu');

    expect((actions[0] as HTMLButtonElement).getAttribute('role')).toBe('menuitem');
    expect((actions[1] as HTMLButtonElement).getAttribute('role')).toBe('menuitem');
    expect((actions[1] as HTMLButtonElement).getAttribute('aria-disabled')).toBe('true');
  });
});
