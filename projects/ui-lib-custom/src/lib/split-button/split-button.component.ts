import { DOCUMENT, NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
  ViewEncapsulation,
  computed,
  contentChild,
  inject,
  input,
  output,
  signal,
  TemplateRef,
  viewChild,
  type InputSignal,
  type OutputEmitterRef,
  type Signal,
  type WritableSignal,
} from '@angular/core';
import { Router } from '@angular/router';
import { KEYBOARD_KEYS } from 'ui-lib-custom/core';
import { Icon } from 'ui-lib-custom/icon';
import { ThemeConfigService } from 'ui-lib-custom/theme';
import { splitButtonId } from './split-button.constants';
import {
  SplitButtonContentDirective,
  SplitButtonDropdownIconDirective,
} from './split-button-templates.directive';
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

let splitButtonInstanceCounter: number = 0;

/**
 * SplitButton scaffold component with primary action and dropdown trigger controls.
 */
@Component({
  selector: 'ui-lib-split-button',
  standalone: true,
  imports: [Icon, NgTemplateOutlet],
  templateUrl: './split-button.component.html',
  styleUrl: './split-button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    '[class]': 'hostClasses()',
  },
})
export class SplitButtonComponent {
  private readonly themeConfig: ThemeConfigService = inject(ThemeConfigService);
  private readonly hostElement: ElementRef<HTMLElement> =
    inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly documentRef: Document = inject(DOCUMENT);
  private readonly router: Router | null = inject(Router, { optional: true });
  private readonly hostId: string = splitButtonId(splitButtonInstanceCounter++);

  public readonly label: InputSignal<string> = input<string>('');
  public readonly icon: InputSignal<string | null> = input<string | null>(null);
  public readonly iconPosition: InputSignal<'left' | 'right'> = input<'left' | 'right'>('left');
  public readonly model: InputSignal<readonly SplitButtonItem[]> = input<
    readonly SplitButtonItem[]
  >([]);
  public readonly severity: InputSignal<SplitButtonSeverity> =
    input<SplitButtonSeverity>('primary');
  public readonly variant: InputSignal<SplitButtonVariant | null> =
    input<SplitButtonVariant | null>(null);
  public readonly size: InputSignal<SplitButtonSize> = input<SplitButtonSize>('md');
  public readonly disabled: InputSignal<boolean> = input<boolean>(false);
  public readonly buttonDisabled: InputSignal<boolean> = input<boolean>(false);
  public readonly menuButtonDisabled: InputSignal<boolean> = input<boolean>(false);
  public readonly loading: InputSignal<boolean> = input<boolean>(false);
  public readonly loadingIcon: InputSignal<string> = input<string>('spinner');
  public readonly raised: InputSignal<boolean> = input<boolean>(false);
  public readonly rounded: InputSignal<boolean> = input<boolean>(false);
  public readonly text: InputSignal<boolean> = input<boolean>(false);
  public readonly outlined: InputSignal<boolean> = input<boolean>(false);
  public readonly dropdownIcon: InputSignal<string> = input<string>('chevron-down');
  public readonly buttonAriaLabel: InputSignal<string | null> = input<string | null>(null);
  public readonly menuButtonAriaLabel: InputSignal<string | null> = input<string | null>(null);
  public readonly tabindex: InputSignal<number> = input<number>(0);
  public readonly styleClass: InputSignal<string | null> = input<string | null>(null);

  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  public readonly onClick: OutputEmitterRef<SplitButtonClickEvent> =
    output<SplitButtonClickEvent>();
  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  public readonly onMenuShow: OutputEmitterRef<SplitButtonMenuShowEvent> =
    output<SplitButtonMenuShowEvent>();
  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  public readonly onMenuHide: OutputEmitterRef<SplitButtonMenuHideEvent> =
    output<SplitButtonMenuHideEvent>();
  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  public readonly onItemCommand: OutputEmitterRef<SplitButtonItemCommandEvent> =
    output<SplitButtonItemCommandEvent>();

  public readonly contentTemplate: Signal<TemplateRef<unknown> | undefined> = contentChild(
    SplitButtonContentDirective,
    { read: TemplateRef }
  );
  public readonly dropdownIconTemplate: Signal<TemplateRef<unknown> | undefined> = contentChild(
    SplitButtonDropdownIconDirective,
    { read: TemplateRef }
  );
  private readonly menuButtonRef: Signal<ElementRef<HTMLButtonElement> | undefined> =
    viewChild<ElementRef<HTMLButtonElement>>('menuBtn');

  public readonly isMenuOpen: WritableSignal<boolean> = signal<boolean>(false);
  public readonly focusedItemIndex: WritableSignal<number> = signal<number>(-1);

  public readonly visibleItems: Signal<readonly SplitButtonItem[]> = computed<
    readonly SplitButtonItem[]
  >((): readonly SplitButtonItem[] =>
    this.model().filter((item: SplitButtonItem): boolean => item.visible !== false)
  );

  public readonly resolvedVariant: Signal<SplitButtonVariant> = computed<SplitButtonVariant>(
    (): SplitButtonVariant => this.variant() ?? this.themeConfig.variant()
  );

  public readonly hostClasses: Signal<string> = computed<string>((): string => {
    const classes: string[] = [
      'ui-lib-split-button',
      `ui-lib-split-button--${this.resolvedVariant()}`,
      `ui-lib-split-button--${this.size()}`,
      `ui-lib-split-button--${this.severity()}`,
    ];

    if (this.raised()) {
      classes.push('ui-lib-split-button--raised');
    }
    if (this.rounded()) {
      classes.push('ui-lib-split-button--rounded');
    }
    if (this.text()) {
      classes.push('ui-lib-split-button--text');
    }
    if (this.outlined()) {
      classes.push('ui-lib-split-button--outlined');
    }
    if (this.disabled()) {
      classes.push('ui-lib-split-button--disabled');
    }
    if (this.loading()) {
      classes.push('ui-lib-split-button--loading');
    }

    const styleClass: string | null = this.styleClass();
    if (styleClass && styleClass.trim().length > 0) {
      classes.push(styleClass);
    }

    return classes.join(' ');
  });

  public readonly isMainButtonDisabled: Signal<boolean> = computed<boolean>(
    (): boolean => this.disabled() || this.buttonDisabled() || this.loading()
  );

  public readonly isMenuButtonDisabled: Signal<boolean> = computed<boolean>(
    (): boolean => this.disabled() || this.menuButtonDisabled()
  );

  public readonly menuId: Signal<string> = computed<string>((): string => `${this.hostId}-menu`);

  public itemId(index: number): string {
    return `${this.hostId}-item-${index}`;
  }

  public onMainButtonClick(event: MouseEvent): void {
    if (this.isMainButtonDisabled()) {
      return;
    }

    this.onClick.emit({ originalEvent: event });
  }

  public onMainButtonKeydown(event: KeyboardEvent): void {
    if (event.key === KEYBOARD_KEYS.Enter || event.key === KEYBOARD_KEYS.Space) {
      return;
    }
  }

  public onMenuButtonClick(event: MouseEvent): void {
    const host: HTMLElement = this.hostElement.nativeElement;
    if (!this.documentRef.contains(host)) {
      return;
    }

    if (this.isMenuButtonDisabled()) {
      return;
    }

    if (this.isMenuOpen()) {
      this.closeMenu(event);
      return;
    }

    this.openMenu(event);
  }

  public onMenuButtonKeydown(event: KeyboardEvent): void {
    switch (event.key) {
      case KEYBOARD_KEYS.Enter:
      case KEYBOARD_KEYS.Space:
        event.preventDefault();
        if (this.isMenuOpen()) {
          this.closeMenu(event);
          return;
        }
        this.openMenu(event, 'first');
        return;
      case KEYBOARD_KEYS.ArrowDown:
        event.preventDefault();
        if (!this.isMenuOpen()) {
          this.openMenu(event, 'first');
          return;
        }
        this.focusFirstMenuItem();
        return;
      case KEYBOARD_KEYS.ArrowUp:
        event.preventDefault();
        if (!this.isMenuOpen()) {
          this.openMenu(event, 'last');
          return;
        }
        this.focusLastMenuItem();
        return;
      case KEYBOARD_KEYS.Escape:
        if (!this.isMenuOpen()) {
          return;
        }
        event.preventDefault();
        this.closeMenu(event, { focusMenuButton: true });
        return;
      default:
        return;
    }
  }

  public openMenu(event: Event, focusTarget: 'first' | 'last' | 'none' = 'first'): void {
    if (this.isMenuOpen()) {
      return;
    }

    this.isMenuOpen.set(true);
    this.onMenuShow.emit({ originalEvent: event });

    if (focusTarget === 'first') {
      queueMicrotask((): void => this.focusFirstMenuItem());
      return;
    }

    if (focusTarget === 'last') {
      queueMicrotask((): void => this.focusLastMenuItem());
    }
  }

  public closeMenu(event: Event, options?: { focusMenuButton?: boolean }): void {
    if (!this.isMenuOpen()) {
      return;
    }

    this.isMenuOpen.set(false);
    this.focusedItemIndex.set(-1);
    this.onMenuHide.emit({ originalEvent: event });

    if (options?.focusMenuButton === true) {
      this.focusMenuButton();
    }
  }

  public onItemClick(event: MouseEvent, item: SplitButtonItem, index: number): void {
    if (item.disabled) {
      event.preventDefault();
      return;
    }

    if (item.separator) {
      return;
    }

    const commandEvent: SplitButtonItemCommandEvent = {
      originalEvent: event,
      item,
      index,
    };

    item.command?.(commandEvent);
    this.onItemCommand.emit(commandEvent);

    if (item.url) {
      event.preventDefault();
      window.open(item.url, item.target || '_self');
      this.closeMenu(event, { focusMenuButton: true });
      return;
    }

    if (item.routerLink !== undefined && this.router !== null) {
      event.preventDefault();
      this.navigateToRouterLink(item.routerLink);
      this.closeMenu(event, { focusMenuButton: true });
      return;
    }

    this.closeMenu(event, { focusMenuButton: true });
  }

  public onItemKeydown(event: KeyboardEvent, item: SplitButtonItem, index: number): void {
    switch (event.key) {
      case KEYBOARD_KEYS.Enter:
      case KEYBOARD_KEYS.Space:
        event.preventDefault();
        this.onItemClick(event as unknown as MouseEvent, item, index);
        return;
      case KEYBOARD_KEYS.Escape:
        event.preventDefault();
        this.closeMenu(event, { focusMenuButton: true });
        return;
      case KEYBOARD_KEYS.ArrowDown: {
        event.preventDefault();
        const nextIndex: number = this.getNextFocusableIndex(index, 1);
        if (nextIndex >= 0) {
          this.focusItem(nextIndex);
        }
        return;
      }
      case KEYBOARD_KEYS.ArrowUp: {
        event.preventDefault();
        const previousIndex: number = this.getNextFocusableIndex(index, -1);
        if (previousIndex >= 0) {
          this.focusItem(previousIndex);
        }
        return;
      }
      case KEYBOARD_KEYS.Home:
        event.preventDefault();
        this.focusFirstMenuItem();
        return;
      case KEYBOARD_KEYS.End:
        event.preventDefault();
        this.focusLastMenuItem();
        return;
      case KEYBOARD_KEYS.Tab:
        this.closeMenu(event);
        return;
      default:
        return;
    }
  }

  public focusItem(index: number): void {
    const items: readonly SplitButtonItem[] = this.visibleItems();
    if (index < 0 || index >= items.length) {
      this.focusedItemIndex.set(-1);
      return;
    }

    const item: SplitButtonItem | undefined = items[index];
    if (!item || item.separator || item.disabled) {
      this.focusedItemIndex.set(-1);
      return;
    }

    const menuItemElement: HTMLAnchorElement | null =
      this.hostElement.nativeElement.querySelector<HTMLAnchorElement>(
        `a[data-menu-item-index="${index}"]`
      );
    if (!menuItemElement) {
      return;
    }

    this.focusedItemIndex.set(index);
    menuItemElement.focus();
  }

  @HostListener('document:click', ['$event'])
  public onDocumentClick(event: MouseEvent): void {
    if (!this.isMenuOpen()) {
      return;
    }

    const targetNode: Node | null = event.target as Node | null;
    if (targetNode === null) {
      return;
    }

    if (this.hostElement.nativeElement.contains(targetNode)) {
      return;
    }

    this.closeMenu(event);
  }

  @HostListener('document:keydown', ['$event'])
  public onDocumentKeydown(event: KeyboardEvent): void {
    if (event.key !== KEYBOARD_KEYS.Escape) {
      return;
    }

    if (!this.isMenuOpen()) {
      return;
    }

    event.preventDefault();
    this.closeMenu(event, { focusMenuButton: true });
  }

  private focusFirstMenuItem(): void {
    const firstFocusableItemIndex: number = this.getFirstFocusableIndex();

    if (firstFocusableItemIndex < 0) {
      this.focusedItemIndex.set(-1);
      return;
    }

    this.focusItem(firstFocusableItemIndex);
  }

  private focusLastMenuItem(): void {
    const lastFocusableItemIndex: number = this.getLastFocusableIndex();

    if (lastFocusableItemIndex < 0) {
      this.focusedItemIndex.set(-1);
      return;
    }

    this.focusItem(lastFocusableItemIndex);
  }

  public getFirstFocusableIndex(): number {
    return this.visibleItems().findIndex(
      (item: SplitButtonItem): boolean => !item.separator && !item.disabled
    );
  }

  public getLastFocusableIndex(): number {
    const items: readonly SplitButtonItem[] = this.visibleItems();
    for (let index: number = items.length - 1; index >= 0; index -= 1) {
      const item: SplitButtonItem | undefined = items[index];
      if (item && !item.separator && !item.disabled) {
        return index;
      }
    }

    return -1;
  }

  public getNextFocusableIndex(currentIndex: number, direction: 1 | -1): number {
    const items: readonly SplitButtonItem[] = this.visibleItems();
    if (items.length === 0) {
      return -1;
    }

    const startIndex: number =
      currentIndex >= 0 && currentIndex < items.length
        ? currentIndex
        : direction === 1
          ? this.getFirstFocusableIndex()
          : this.getLastFocusableIndex();

    if (startIndex < 0) {
      return -1;
    }

    for (let offset: number = 1; offset <= items.length; offset += 1) {
      const candidateIndex: number =
        (startIndex + direction * offset + items.length) % items.length;
      const item: SplitButtonItem | undefined = items[candidateIndex];
      if (item && !item.separator && !item.disabled) {
        return candidateIndex;
      }
    }

    return -1;
  }

  private focusMenuButton(): void {
    queueMicrotask((): void => {
      this.menuButtonRef()?.nativeElement.focus();
    });
  }

  private navigateToRouterLink(routerLink: string | unknown[]): void {
    if (this.router === null) {
      return;
    }

    if (typeof routerLink === 'string') {
      void this.router.navigateByUrl(routerLink);
      return;
    }

    void this.router.navigate(routerLink);
  }
}
