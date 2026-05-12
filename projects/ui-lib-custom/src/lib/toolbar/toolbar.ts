import {
  type AfterRenderRef,
  afterRenderEffect,
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  ElementRef,
  inject,
  input,
  ViewEncapsulation,
  type InputSignal,
  type Signal,
} from '@angular/core';
import { KEYBOARD_KEYS } from 'ui-lib-custom/core';
import { ThemeConfigService } from 'ui-lib-custom/theme';
import type { ToolbarVariant, ToolbarSize } from './toolbar.types';

export type { ToolbarVariant, ToolbarSize } from './toolbar.types';

const TOOLBAR_ITEM_SELECTOR: string = [
  'button:not([disabled])',
  '[href]',
  'input:not([disabled]):not([type="hidden"])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[role="button"]:not([aria-disabled="true"])',
  '[role="checkbox"]:not([aria-disabled="true"])',
  '[role="radio"]:not([aria-disabled="true"])',
  '[role="switch"]:not([aria-disabled="true"])',
  '[role="tab"]:not([aria-disabled="true"])',
  '[tabindex]',
  '[contenteditable="true"]',
].join(', ');

let nextToolbarId: number = 0;

/**
 * Toolbar — a horizontal container with start, center, and end content projection slots.
 *
 * Use the `uiToolbarStart`, `uiToolbarCenter`, and `uiToolbarEnd` attribute selectors
 * to project content into the corresponding slot.
 *
 * @example
 * <!-- Basic toolbar -->
 * <ui-lib-toolbar>
 *   <div uiToolbarStart>
 *     <button>Home</button>
 *   </div>
 *   <div uiToolbarCenter>
 *     <span>My App</span>
 *   </div>
 *   <div uiToolbarEnd>
 *     <button>Settings</button>
 *   </div>
 * </ui-lib-toolbar>
 *
 * <!-- Material variant, large size -->
 * <ui-lib-toolbar variant="material" size="lg">
 *   <div uiToolbarStart><button>Back</button></div>
 * </ui-lib-toolbar>
 */
@Component({
  selector: 'ui-lib-toolbar',
  standalone: true,
  templateUrl: './toolbar.html',
  styleUrl: './toolbar.scss',
  host: {
    '[class]': 'hostClasses()',
    '[attr.id]': 'toolbarId',
    role: 'toolbar',
    '[attr.aria-label]': 'resolvedAriaLabel()',
    'aria-orientation': 'horizontal',
    '(focusin)': 'onFocusIn($event)',
    '(keydown)': 'onKeydown($event)',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class Toolbar {
  public readonly toolbarId: string = `ui-lib-toolbar-${++nextToolbarId}`;

  private readonly destroyRef: DestroyRef = inject(DestroyRef);
  private readonly elementRef: ElementRef<HTMLElement> = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly themeConfig: ThemeConfigService = inject(ThemeConfigService);
  private readonly syncToolbarItemsEffect: AfterRenderRef = afterRenderEffect((): void => {
    this.syncToolbarItems();
  });
  private activeItemIndex: number = 0;
  private readonly mutationObserver: MutationObserver | null =
    typeof MutationObserver === 'undefined'
      ? null
      : new MutationObserver((): void => this.syncToolbarItems());

  /** Visual variant — inherits from ThemeConfigService when not set. */
  public readonly variant: InputSignal<ToolbarVariant | null> = input<ToolbarVariant | null>(null);

  /** Size modifier for the toolbar. Defaults to `'md'`. */
  public readonly size: InputSignal<ToolbarSize> = input<ToolbarSize>('md');

  /** Accessible label for the toolbar (recommended when multiple toolbars are on one page). */
  public readonly ariaLabel: InputSignal<string | null> = input<string | null>(null);

  /** Additional CSS classes to attach to the host element. */
  public readonly styleClass: InputSignal<string | null> = input<string | null>(null);

  /** Resolved variant — direct input wins, then falls back to global ThemeConfigService. */
  private readonly effectiveVariant: Signal<ToolbarVariant> = computed<ToolbarVariant>(
    (): ToolbarVariant => this.variant() ?? this.themeConfig.variant()
  );
  public readonly resolvedAriaLabel: Signal<string> = computed<string>((): string => {
    const customAriaLabel: string | null = this.ariaLabel()?.trim() ?? null;
    return customAriaLabel && customAriaLabel.length > 0 ? customAriaLabel : 'Toolbar';
  });

  /** Computed CSS classes applied to the host element. */
  public readonly hostClasses: Signal<string> = computed<string>((): string => {
    const classes: string[] = [
      'ui-lib-toolbar',
      `ui-lib-toolbar--${this.size()}`,
      `ui-lib-toolbar--variant-${this.effectiveVariant()}`,
    ];
    const extra: string | null = this.styleClass();
    if (extra) {
      classes.push(extra);
    }
    return classes.join(' ');
  });

  constructor() {
    this.mutationObserver?.observe(this.elementRef.nativeElement, {
      subtree: true,
      childList: true,
      attributes: true,
      attributeFilter: ['disabled', 'hidden', 'aria-hidden', 'aria-disabled', 'tabindex'],
    });
    this.destroyRef.onDestroy((): void => {
      this.mutationObserver?.disconnect();
    });
  }

  public onFocusIn(event: FocusEvent): void {
    const targetElement: EventTarget | null = event.target;
    if (!(targetElement instanceof HTMLElement)) {
      return;
    }

    const toolbarItems: HTMLElement[] = this.getToolbarItems();
    const focusedIndex: number = toolbarItems.indexOf(targetElement);
    if (focusedIndex === -1) {
      return;
    }

    this.activeItemIndex = focusedIndex;
    this.applyRovingTabIndex(toolbarItems, focusedIndex);
  }

  public onKeydown(event: KeyboardEvent): void {
    const targetElement: EventTarget | null = event.target;
    if (!(targetElement instanceof HTMLElement) || this.shouldIgnoreNavigation(targetElement)) {
      return;
    }

    const toolbarItems: HTMLElement[] = this.getToolbarItems();
    const currentIndex: number = toolbarItems.indexOf(targetElement);
    if (currentIndex === -1) {
      return;
    }

    if (event.key === KEYBOARD_KEYS.Home) {
      event.preventDefault();
      this.focusItemAtIndex(toolbarItems, 0);
      return;
    }

    if (event.key === KEYBOARD_KEYS.End) {
      event.preventDefault();
      this.focusItemAtIndex(toolbarItems, toolbarItems.length - 1);
      return;
    }

    if (event.key === KEYBOARD_KEYS.ArrowRight || event.key === KEYBOARD_KEYS.ArrowDown) {
      event.preventDefault();
      this.focusItemAtIndex(toolbarItems, this.getWrappedIndex(toolbarItems, currentIndex, 1));
      return;
    }

    if (event.key === KEYBOARD_KEYS.ArrowLeft || event.key === KEYBOARD_KEYS.ArrowUp) {
      event.preventDefault();
      this.focusItemAtIndex(toolbarItems, this.getWrappedIndex(toolbarItems, currentIndex, -1));
    }
  }

  private syncToolbarItems(): void {
    const toolbarItems: HTMLElement[] = this.getToolbarItems();
    this.clearDetachedToolbarItemMarkers(toolbarItems);
    if (toolbarItems.length === 0) {
      this.activeItemIndex = 0;
      return;
    }

    const activeElement: Element | null = this.elementRef.nativeElement.ownerDocument.activeElement;
    const focusedIndex: number = activeElement instanceof HTMLElement ? toolbarItems.indexOf(activeElement) : -1;
    const normalizedActiveIndex: number = this.normalizeActiveIndex(
      toolbarItems,
      focusedIndex !== -1 ? focusedIndex : this.activeItemIndex
    );
    this.activeItemIndex = normalizedActiveIndex;
    this.applyRovingTabIndex(toolbarItems, normalizedActiveIndex);
  }

  private getToolbarItems(): HTMLElement[] {
    return Array.from(
      this.elementRef.nativeElement.querySelectorAll<HTMLElement>(TOOLBAR_ITEM_SELECTOR)
    ).filter((element: HTMLElement): boolean => this.isToolbarItem(element));
  }

  private isToolbarItem(element: HTMLElement): boolean {
    if (element === this.elementRef.nativeElement) {
      return false;
    }

    if (element.closest('[hidden], [aria-hidden="true"]') !== null) {
      return false;
    }

    if (
      element.hasAttribute('disabled') ||
      element.getAttribute('aria-disabled') === 'true' ||
      element.closest('fieldset[disabled]') !== null
    ) {
      return false;
    }

    if (element.getAttribute('data-ui-lib-toolbar-item') === 'true') {
      return true;
    }

    if (element.hasAttribute('tabindex')) {
      return element.getAttribute('tabindex') !== '-1';
    }

    return element.tabIndex >= 0;
  }

  private shouldIgnoreNavigation(element: HTMLElement): boolean {
    if (element instanceof HTMLTextAreaElement || element instanceof HTMLSelectElement) {
      return true;
    }

    if (element instanceof HTMLInputElement) {
      return !['button', 'checkbox', 'radio', 'range', 'reset', 'submit'].includes(element.type);
    }

    return element.isContentEditable;
  }

  private normalizeActiveIndex(toolbarItems: HTMLElement[], preferredIndex: number): number {
    if (toolbarItems.length === 0) {
      return 0;
    }

    if (preferredIndex >= 0 && preferredIndex < toolbarItems.length) {
      return preferredIndex;
    }

    return 0;
  }

  private applyRovingTabIndex(toolbarItems: HTMLElement[], activeIndex: number): void {
    toolbarItems.forEach((item: HTMLElement, index: number): void => {
      item.setAttribute('data-ui-lib-toolbar-item', 'true');
      item.tabIndex = index === activeIndex ? 0 : -1;
    });
  }

  private clearDetachedToolbarItemMarkers(toolbarItems: HTMLElement[]): void {
    const activeToolbarItems: Set<HTMLElement> = new Set(toolbarItems);
    this.elementRef.nativeElement
      .querySelectorAll<HTMLElement>('[data-ui-lib-toolbar-item]')
      .forEach((item: HTMLElement): void => {
        if (!activeToolbarItems.has(item)) {
          item.removeAttribute('data-ui-lib-toolbar-item');
        }
      });
  }

  private focusItemAtIndex(toolbarItems: HTMLElement[], index: number): void {
    const normalizedIndex: number = this.normalizeActiveIndex(toolbarItems, index);
    const targetItem: HTMLElement | undefined = toolbarItems[normalizedIndex];
    if (!targetItem) {
      return;
    }

    this.activeItemIndex = normalizedIndex;
    this.applyRovingTabIndex(toolbarItems, normalizedIndex);
    targetItem.focus();
  }

  private getWrappedIndex(toolbarItems: HTMLElement[], currentIndex: number, step: 1 | -1): number {
    if (toolbarItems.length === 0) {
      return 0;
    }

    return (currentIndex + step + toolbarItems.length) % toolbarItems.length;
  }
}
