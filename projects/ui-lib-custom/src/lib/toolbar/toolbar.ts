import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  inject,
  input,
  ViewEncapsulation,
  type InputSignal,
  type Signal,
} from '@angular/core';
import { ThemeConfigService } from 'ui-lib-custom/theme';
import type { ToolbarVariant, ToolbarSize } from './toolbar.types';

export type { ToolbarVariant, ToolbarSize } from './toolbar.types';

let nextToolbarId: number = 0;

/**
 * CSS selector for naturally interactive elements within a toolbar.
 * Used to build the roving-tabindex item list.
 */
const TOOLBAR_ITEM_SELECTOR: string = [
  'button:not([disabled])',
  'a[href]',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
].join(', ');

/**
 * Toolbar — a horizontal container with start, center, and end content projection slots.
 *
 * Use the `uiToolbarStart`, `uiToolbarCenter`, and `uiToolbarEnd` attribute selectors
 * to project content into the corresponding slot.
 *
 * Keyboard interaction follows the WAI-ARIA Toolbar Pattern:
 * - `ArrowRight` / `ArrowDown` — focus next item
 * - `ArrowLeft` / `ArrowUp` — focus previous item
 * - `Home` — focus first item
 * - `End` — focus last item
 * - `Tab` — exit the toolbar
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
    role: 'toolbar',
    '[attr.aria-label]': 'ariaLabel()',
    '[id]': 'toolbarId',
    '(keydown)': 'onKeydown($event)',
    '(focusin)': 'onFocusin($event)',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class Toolbar {
  private readonly themeConfig: ThemeConfigService = inject(ThemeConfigService);
  private readonly elementRef: ElementRef<HTMLElement> = inject(
    ElementRef,
  ) as ElementRef<HTMLElement>;

  /** Unique DOM id for this toolbar instance. */
  public readonly toolbarId: string = `ui-lib-toolbar-${nextToolbarId++}`;

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
    (): ToolbarVariant => this.variant() ?? this.themeConfig.variant(),
  );

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
    afterNextRender((): void => {
      this.initRovingTabindex();
    });
  }

  /**
   * Initialise roving tabindex: first item gets `tabindex="0"`, all others get `tabindex="-1"`.
   * Called once after the first render so that projected content is available.
   */
  private initRovingTabindex(): void {
    const items: HTMLElement[] = this.getToolbarItems();
    items.forEach((item: HTMLElement, index: number): void => {
      item.setAttribute('tabindex', index === 0 ? '0' : '-1');
    });
  }

  /**
   * Handle keyboard navigation within the toolbar following the WAI-ARIA Toolbar Pattern.
   * Arrow keys move focus between items; Home/End jump to boundaries.
   * Tab is left to the browser so it naturally exits the toolbar.
   */
  public onKeydown(event: KeyboardEvent): void {
    const items: HTMLElement[] = this.getToolbarItems();
    if (items.length === 0) {
      return;
    }

    const currentIndex: number = items.indexOf(document.activeElement as HTMLElement);

    // If no toolbar item currently has focus, only Home/End make sense; skip arrow navigation.
    if (currentIndex === -1 && event.key !== 'Home' && event.key !== 'End') {
      return;
    }

    switch (event.key) {
      case 'ArrowRight':
      case 'ArrowDown': {
        event.preventDefault();
        const nextIndex: number = currentIndex < items.length - 1 ? currentIndex + 1 : 0;
        this.moveFocus(items, nextIndex);
        break;
      }
      case 'ArrowLeft':
      case 'ArrowUp': {
        event.preventDefault();
        const prevIndex: number = currentIndex > 0 ? currentIndex - 1 : items.length - 1;
        this.moveFocus(items, prevIndex);
        break;
      }
      case 'Home': {
        event.preventDefault();
        this.moveFocus(items, 0);
        break;
      }
      case 'End': {
        event.preventDefault();
        this.moveFocus(items, items.length - 1);
        break;
      }
    }
  }

  /**
   * Keep the roving tabindex in sync when focus moves into the toolbar via mouse click
   * or programmatic `focus()`.
   */
  public onFocusin(event: FocusEvent): void {
    const items: HTMLElement[] = this.getToolbarItems();
    const focusedIndex: number = items.indexOf(event.target as HTMLElement);
    if (focusedIndex >= 0) {
      items.forEach((item: HTMLElement, index: number): void => {
        item.setAttribute('tabindex', index === focusedIndex ? '0' : '-1');
      });
    }
  }

  /** Returns all naturally interactive items within the toolbar. */
  private getToolbarItems(): HTMLElement[] {
    return Array.from(
      this.elementRef.nativeElement.querySelectorAll<HTMLElement>(TOOLBAR_ITEM_SELECTOR),
    );
  }

  /** Update roving tabindex and move browser focus to the item at the given index. */
  private moveFocus(items: HTMLElement[], index: number): void {
    items.forEach((item: HTMLElement, i: number): void => {
      item.setAttribute('tabindex', i === index ? '0' : '-1');
    });
    items[index]?.focus();
  }
}
