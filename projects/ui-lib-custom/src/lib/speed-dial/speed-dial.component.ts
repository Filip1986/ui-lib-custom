import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
  TemplateRef,
  ViewEncapsulation,
  computed,
  contentChild,
  effect,
  inject,
  input,
  model,
  output,
  signal,
  viewChild,
  viewChildren,
  type InputSignal,
  type ModelSignal,
  type OutputEmitterRef,
  type Signal,
  type WritableSignal,
} from '@angular/core';
import { DOCUMENT, NgTemplateOutlet } from '@angular/common';
import { Icon } from 'ui-lib-custom/icon';
import { KEYBOARD_KEYS } from 'ui-lib-custom/core';
import { ThemeConfigService } from 'ui-lib-custom/theme';
import {
  SpeedDialButtonDirective,
  SpeedDialIconDirective,
  SpeedDialItemDirective,
} from './speed-dial-templates.directive';
import { computeSpeedDialLayout } from './speed-dial-layout';
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

/**
 * SpeedDial scaffold component with public API signals and projection slots.
 */
@Component({
  selector: 'ui-lib-speed-dial',
  standalone: true,
  imports: [Icon, NgTemplateOutlet],
  templateUrl: './speed-dial.component.html',
  styleUrl: './speed-dial.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    '[class]': 'hostClasses()',
  },
})
export class SpeedDialComponent {
  private static nextId: number = 0;

  private readonly themeConfig: ThemeConfigService = inject(ThemeConfigService);
  private readonly documentRef: Document = inject(DOCUMENT);
  private readonly hostElement: ElementRef<HTMLElement> =
    inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly hostId: string = `ui-lib-speed-dial-${++SpeedDialComponent.nextId}`;
  private lastVisibleValue: boolean = false;

  public readonly model: InputSignal<readonly SpeedDialItem[]> = input<readonly SpeedDialItem[]>(
    []
  );
  public readonly type: InputSignal<SpeedDialType> = input<SpeedDialType>('linear');
  public readonly direction: InputSignal<SpeedDialDirection> = input<SpeedDialDirection>('up');
  public readonly radius: InputSignal<number> = input<number>(0);
  public readonly transitionDelay: InputSignal<number> = input<number>(30);
  public readonly mask: InputSignal<boolean> = input<boolean>(false);
  public readonly disabled: InputSignal<boolean> = input<boolean>(false);
  public readonly hideOnClickOutside: InputSignal<boolean> = input<boolean>(true);
  public readonly rotateAnimation: InputSignal<boolean> = input<boolean>(true);
  public readonly showIcon: InputSignal<string> = input<string>('plus');
  public readonly hideIcon: InputSignal<string | null> = input<string | null>(null);
  public readonly buttonAriaLabel: InputSignal<string | null> = input<string | null>(null);
  public readonly ariaLabel: InputSignal<string | null> = input<string | null>(null);
  public readonly ariaLabelledBy: InputSignal<string | null> = input<string | null>(null);
  public readonly tabindex: InputSignal<number> = input<number>(0);
  public readonly variant: InputSignal<SpeedDialVariant | null> = input<SpeedDialVariant | null>(
    null
  );
  public readonly size: InputSignal<SpeedDialSize> = input<SpeedDialSize>('md');
  public readonly styleClass: InputSignal<string | null> = input<string | null>(null);

  public readonly visible: ModelSignal<boolean> = model<boolean>(false);

  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  public readonly onShow: OutputEmitterRef<SpeedDialShowEvent> = output<SpeedDialShowEvent>();
  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  public readonly onHide: OutputEmitterRef<SpeedDialHideEvent> = output<SpeedDialHideEvent>();
  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  public readonly onVisibleChange: OutputEmitterRef<SpeedDialVisibleChangeEvent> =
    output<SpeedDialVisibleChangeEvent>();
  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  public readonly onClick: OutputEmitterRef<SpeedDialClickEvent> = output<SpeedDialClickEvent>();
  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  public readonly onFocus: OutputEmitterRef<FocusEvent> = output<FocusEvent>();
  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  public readonly onBlur: OutputEmitterRef<FocusEvent> = output<FocusEvent>();
  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  public readonly onItemCommand: OutputEmitterRef<SpeedDialItemCommandEvent> =
    output<SpeedDialItemCommandEvent>();

  public readonly listId: string = `${this.hostId}-list`;
  public readonly focusedItemIndex: WritableSignal<number> = signal<number>(-1);

  public readonly itemTemplate: Signal<TemplateRef<unknown> | undefined> = contentChild(
    SpeedDialItemDirective,
    { read: TemplateRef }
  );
  public readonly buttonTemplate: Signal<TemplateRef<unknown> | undefined> = contentChild(
    SpeedDialButtonDirective,
    { read: TemplateRef }
  );
  public readonly iconTemplate: Signal<TemplateRef<unknown> | undefined> = contentChild(
    SpeedDialIconDirective,
    { read: TemplateRef }
  );

  private readonly itemActionElements: Signal<readonly ElementRef<HTMLElement>[]> =
    viewChildren<ElementRef<HTMLElement>>('itemAction');
  private readonly triggerButton: Signal<ElementRef<HTMLButtonElement> | undefined> =
    viewChild<ElementRef<HTMLButtonElement>>('triggerBtn');
  private readonly listElement: Signal<ElementRef<HTMLElement> | undefined> =
    viewChild<ElementRef<HTMLElement>>('listElement');

  constructor() {
    this.lastVisibleValue = this.visible();
    effect((): void => {
      const isVisible: boolean = this.visible();
      if (this.lastVisibleValue && !isVisible && this.wasFocusInsideList()) {
        queueMicrotask((): void => {
          this.triggerButton()?.nativeElement.focus();
        });
      }
      this.lastVisibleValue = isVisible;
    });
  }

  public readonly resolvedVariant: Signal<SpeedDialVariant> = computed<SpeedDialVariant>(
    (): SpeedDialVariant => this.variant() ?? this.themeConfig.variant()
  );

  public readonly visibleItems: Signal<readonly SpeedDialItem[]> = computed<
    readonly SpeedDialItem[]
  >((): readonly SpeedDialItem[] =>
    this.model().filter((item: SpeedDialItem): boolean => item.visible !== false)
  );

  public readonly itemTransform: Signal<readonly string[]> = computed<readonly string[]>(
    (): readonly string[] =>
      computeSpeedDialLayout({
        type: this.type(),
        direction: this.direction(),
        radius: this.radius(),
        count: this.visibleItems().length,
      }).map((position: { readonly transform: string }): string => position.transform)
  );

  public readonly itemTransitionDelay: Signal<readonly string[]> = computed<readonly string[]>(
    (): readonly string[] =>
      this.visibleItems().map(
        (_item: SpeedDialItem, index: number): string => `${index * this.transitionDelay()}ms`
      )
  );

  public readonly hostClasses: Signal<string> = computed<string>((): string => {
    const classes: string[] = [
      'ui-lib-speed-dial',
      `ui-lib-speed-dial--${this.resolvedVariant()}`,
      `ui-lib-speed-dial--${this.size()}`,
      `ui-lib-speed-dial--${this.type()}`,
    ];

    if (this.type() === 'linear' && this.isLinearDirection(this.direction())) {
      classes.push(`ui-lib-speed-dial--dir-${this.direction()}`);
    }
    if (this.visible()) {
      classes.push('ui-lib-speed-dial--open');
    }
    if (this.disabled()) {
      classes.push('ui-lib-speed-dial--disabled');
    }
    if (this.mask()) {
      classes.push('ui-lib-speed-dial--mask');
    }
    if (this.rotateAnimation() && !this.hideIcon()) {
      classes.push('ui-lib-speed-dial--rotate');
    }

    const customClass: string | null = this.styleClass();
    if (customClass) {
      classes.push(customClass);
    }

    return classes.join(' ');
  });

  public toggle(event: MouseEvent): void {
    if (this.disabled()) {
      return;
    }

    const nextVisible: boolean = !this.visible();
    this.visible.set(nextVisible);
    if (nextVisible) {
      this.focusedItemIndex.set(-1);
    } else {
      this.focusedItemIndex.set(-1);
    }

    this.onClick.emit({ originalEvent: event, visible: nextVisible });
    this.onVisibleChange.emit({ originalEvent: event, visible: nextVisible });
    if (nextVisible) {
      this.onShow.emit({ originalEvent: event });
      return;
    }
    this.onHide.emit({ originalEvent: event });
  }

  public show(event: Event): void {
    if (this.disabled() || this.visible()) {
      return;
    }

    this.visible.set(true);
    this.focusedItemIndex.set(-1);
    this.onVisibleChange.emit({ originalEvent: event, visible: true });
    this.onShow.emit({ originalEvent: event });
  }

  public hide(event: Event): void {
    if (!this.visible()) {
      return;
    }

    this.visible.set(false);
    this.focusedItemIndex.set(-1);
    this.onVisibleChange.emit({ originalEvent: event, visible: false });
    this.onHide.emit({ originalEvent: event });
  }

  public onItemClick(event: MouseEvent, item: SpeedDialItem, index: number): void {
    if (item.disabled === true) {
      event.preventDefault();
      return;
    }

    item.command?.({ originalEvent: event, item, index });
    this.onItemCommand.emit({ originalEvent: event, item, index });
    this.hide(event);
  }

  public onMaskClick(event: MouseEvent): void {
    this.hide(event);
  }

  @HostListener('document:click', ['$event'])
  public onDocumentClick(event: MouseEvent): void {
    if (this.disabled() || !this.visible() || !this.hideOnClickOutside()) {
      return;
    }

    const target: EventTarget | null = event.target;
    if (!(target instanceof Node)) {
      return;
    }

    if (this.hostElement.nativeElement.contains(target)) {
      return;
    }

    this.hide(event);
  }

  @HostListener('document:keydown.escape', ['$event'])
  public onDocumentEscape(event: Event): void {
    if (!(event instanceof KeyboardEvent)) {
      return;
    }

    if (this.disabled() || !this.visible()) {
      return;
    }

    event.preventDefault();
    event.stopPropagation();
    this.hide(event);
  }

  public itemId(index: number): string {
    return `${this.hostId}-item-${index}`;
  }

  public onButtonKeydown(event: KeyboardEvent): void {
    switch (event.key) {
      case KEYBOARD_KEYS.Enter:
      case KEYBOARD_KEYS.Space:
        event.preventDefault();
        this.toggle(event as unknown as MouseEvent);
        return;
      case KEYBOARD_KEYS.Escape:
        if (this.visible()) {
          event.preventDefault();
          this.hide(event);
        }
        return;
      case KEYBOARD_KEYS.ArrowDown:
      case KEYBOARD_KEYS.ArrowUp:
      case KEYBOARD_KEYS.ArrowLeft:
      case KEYBOARD_KEYS.ArrowRight:
        if (!this.visible()) {
          if (!this.canOpenFromArrowKey(event.key)) {
            return;
          }
          event.preventDefault();
          this.show(event);
          this.focusFirstItem();
          return;
        }
        event.preventDefault();
        this.moveFocusByArrow(event.key);
        return;
      case KEYBOARD_KEYS.Tab:
        this.hide(event);
        return;
      default:
        return;
    }
  }

  public onItemKeydown(event: KeyboardEvent, item: SpeedDialItem, index: number): void {
    switch (event.key) {
      case KEYBOARD_KEYS.Enter:
      case KEYBOARD_KEYS.Space:
        event.preventDefault();
        this.onItemClick(event as unknown as MouseEvent, item, index);
        return;
      case KEYBOARD_KEYS.Escape:
        event.preventDefault();
        this.hide(event);
        this.focusTrigger();
        return;
      case KEYBOARD_KEYS.ArrowDown:
      case KEYBOARD_KEYS.ArrowUp:
      case KEYBOARD_KEYS.ArrowLeft:
      case KEYBOARD_KEYS.ArrowRight:
        if (!this.isNavigationKeyForCurrentDirection(event.key)) {
          return;
        }
        event.preventDefault();
        this.moveFocusByArrow(event.key);
        return;
      case KEYBOARD_KEYS.Home:
        event.preventDefault();
        this.focusFirstItem();
        return;
      case KEYBOARD_KEYS.End:
        event.preventDefault();
        this.focusLastItem();
        return;
      case KEYBOARD_KEYS.Tab:
        this.hide(event);
        return;
      default:
        return;
    }
  }

  public focusItem(index: number): void {
    const items: readonly SpeedDialItem[] = this.visibleItems();
    if (index < 0 || index >= items.length) {
      return;
    }

    const focusedItem: SpeedDialItem | undefined = items[index];
    if (!focusedItem || focusedItem.disabled === true) {
      return;
    }

    this.focusedItemIndex.set(index);
    const elementRef: ElementRef<HTMLElement> | undefined = this.itemActionElements()[index];
    elementRef?.nativeElement.focus();
  }

  public triggerAriaLabel(): string | null {
    return this.buttonAriaLabel() ?? this.ariaLabel();
  }

  private isLinearDirection(direction: SpeedDialDirection): boolean {
    return (
      direction === 'up' || direction === 'down' || direction === 'left' || direction === 'right'
    );
  }

  private isNavigationKeyForCurrentDirection(key: string): boolean {
    const direction: SpeedDialDirection = this.direction();
    if (direction === 'left' || direction === 'right') {
      return key === KEYBOARD_KEYS.ArrowLeft || key === KEYBOARD_KEYS.ArrowRight;
    }
    return key === KEYBOARD_KEYS.ArrowUp || key === KEYBOARD_KEYS.ArrowDown;
  }

  private canOpenFromArrowKey(key: string): boolean {
    const direction: SpeedDialDirection = this.direction();
    if (direction === 'right') {
      return key === KEYBOARD_KEYS.ArrowDown || key === KEYBOARD_KEYS.ArrowRight;
    }
    if (direction === 'down') {
      return key === KEYBOARD_KEYS.ArrowDown || key === KEYBOARD_KEYS.ArrowRight;
    }
    if (direction === 'left') {
      return key === KEYBOARD_KEYS.ArrowUp || key === KEYBOARD_KEYS.ArrowLeft;
    }
    if (direction === 'up') {
      return key === KEYBOARD_KEYS.ArrowUp || key === KEYBOARD_KEYS.ArrowLeft;
    }
    return key === KEYBOARD_KEYS.ArrowDown || key === KEYBOARD_KEYS.ArrowRight;
  }

  private moveFocusByArrow(key: string): void {
    const delta: number | null = this.deltaFromKey(key);
    if (delta === null) {
      return;
    }

    const items: readonly SpeedDialItem[] = this.visibleItems();
    if (items.length === 0) {
      return;
    }

    const currentIndex: number =
      this.focusedItemIndex() >= 0 ? this.focusedItemIndex() : this.firstEnabledIndex();
    if (currentIndex < 0) {
      return;
    }

    let nextIndex: number = currentIndex;
    let scanned: number = 0;
    while (scanned < items.length) {
      nextIndex = (nextIndex + delta + items.length) % items.length;
      const nextItem: SpeedDialItem | undefined = items[nextIndex];
      if (nextItem && nextItem.disabled !== true) {
        this.focusItem(nextIndex);
        return;
      }
      scanned += 1;
    }
  }

  private deltaFromKey(key: string): number | null {
    const direction: SpeedDialDirection = this.direction();
    if (direction === 'right') {
      if (key === KEYBOARD_KEYS.ArrowRight) {
        return 1;
      }
      if (key === KEYBOARD_KEYS.ArrowLeft) {
        return -1;
      }
      return null;
    }
    if (direction === 'left') {
      if (key === KEYBOARD_KEYS.ArrowLeft) {
        return 1;
      }
      if (key === KEYBOARD_KEYS.ArrowRight) {
        return -1;
      }
      return null;
    }
    if (direction === 'up') {
      if (key === KEYBOARD_KEYS.ArrowUp) {
        return 1;
      }
      if (key === KEYBOARD_KEYS.ArrowDown) {
        return -1;
      }
      return null;
    }
    if (direction === 'down') {
      if (key === KEYBOARD_KEYS.ArrowDown) {
        return 1;
      }
      if (key === KEYBOARD_KEYS.ArrowUp) {
        return -1;
      }
      return null;
    }
    if (key === KEYBOARD_KEYS.ArrowDown || key === KEYBOARD_KEYS.ArrowRight) {
      return 1;
    }
    if (key === KEYBOARD_KEYS.ArrowUp || key === KEYBOARD_KEYS.ArrowLeft) {
      return -1;
    }
    return null;
  }

  private firstEnabledIndex(): number {
    return this.visibleItems().findIndex((item: SpeedDialItem): boolean => item.disabled !== true);
  }

  private lastEnabledIndex(): number {
    const items: readonly SpeedDialItem[] = this.visibleItems();
    for (let index: number = items.length - 1; index >= 0; index -= 1) {
      const item: SpeedDialItem | undefined = items[index];
      if (item && item.disabled !== true) {
        return index;
      }
    }
    return -1;
  }

  private focusFirstItem(): void {
    const index: number = this.firstEnabledIndex();
    if (index < 0) {
      return;
    }

    queueMicrotask((): void => {
      this.focusItem(index);
    });
  }

  private focusLastItem(): void {
    const index: number = this.lastEnabledIndex();
    if (index < 0) {
      return;
    }
    this.focusItem(index);
  }

  private focusTrigger(): void {
    const trigger: HTMLButtonElement | null = this.hostElement.nativeElement.querySelector(
      '.ui-lib-speed-dial__button'
    );
    trigger?.focus();
  }

  private wasFocusInsideList(): boolean {
    const list: HTMLElement | undefined = this.listElement()?.nativeElement;
    const activeElement: Element | null = this.documentRef.activeElement;
    if (!list || !activeElement) {
      return false;
    }

    return list.contains(activeElement);
  }
}
