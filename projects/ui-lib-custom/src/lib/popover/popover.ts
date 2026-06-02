import { DOCUMENT } from '@angular/common';
import type {
  InputSignal,
  ModelSignal,
  OnDestroy,
  OutputEmitterRef,
  Signal,
  WritableSignal,
} from '@angular/core';
import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  ElementRef,
  inject,
  Injector,
  input,
  model,
  output,
  signal,
  ViewEncapsulation,
} from '@angular/core';

import { FocusTrap, KEYBOARD_KEYS } from 'ui-lib-custom/core';
import { UiLibI18nService } from 'ui-lib-custom/i18n';
import { ThemeConfigService } from 'ui-lib-custom/theme';

import type { PopoverPlacement, PopoverVariant } from './popover.types';

// Module-level fallback counter for environments without crypto.randomUUID().
let nextPopoverId: number = 0;

/**
 * Popover — a lightweight floating panel anchored to a trigger element.
 *
 * Accepts arbitrary content via `<ng-content>`. Controlled programmatically via
 * the `show()`, `hide()`, and `toggle()` methods (call them from a template ref
 * or `viewChild`), or declaratively via the `[(visible)]` model binding.
 *
 * @example
 * <!-- Template-ref usage -->
 * <button #triggerBtn (click)="op.toggle(triggerBtn)">Info</button>
 * <ui-lib-popover #op header="Details">
 *   <p>Popover body content goes here.</p>
 * </ui-lib-popover>
 */
@Component({
  selector: 'ui-lib-popover',
  standalone: true,
  templateUrl: './popover.html',
  styleUrl: './popover.scss',
  host: {
    '[class]': 'hostClasses()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class Popover implements OnDestroy {
  private readonly themeConfig: ThemeConfigService = inject(ThemeConfigService);
  protected readonly i18n: UiLibI18nService = inject(UiLibI18nService);
  private readonly injector: Injector = inject(Injector);
  private readonly elementRef: ElementRef<HTMLElement> =
    inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly document: Document = inject(DOCUMENT);

  private focusTrap: FocusTrap | null = null;
  private lastVisible: boolean = false;
  private previousFocusEl: HTMLElement | null = null;

  /** Stable unique ID for the panel element. Consumers can use this for aria-controls. */
  public readonly panelId: string = this.generateId();

  /** ID for the title element — used by aria-labelledby when a header is rendered. */
  public readonly titleId: string = `${this.panelId}-title`;

  private readonly targetElement: WritableSignal<HTMLElement | null> = signal<HTMLElement | null>(
    null,
  );

  /** Computed top position (px) for the popup panel. */
  public readonly panelTop: WritableSignal<number> = signal<number>(-9999);
  /** Computed left position (px) for the popup panel. */
  public readonly panelLeft: WritableSignal<number> = signal<number>(-9999);
  /** Horizontal arrow offset (px) relative to the panel's left edge. */
  public readonly arrowLeftOffset: WritableSignal<number> = signal<number>(16);
  /** Whether the panel is placed above or below the target element. */
  public readonly placement: WritableSignal<PopoverPlacement> = signal<PopoverPlacement>('below');
  /** True once position has been computed and the panel should be visible. */
  public readonly positionReady: WritableSignal<boolean> = signal<boolean>(false);

  // ---- Inputs ----

  /** Two-way visibility binding. Use `[(visible)]` for declarative control. */
  public readonly visible: ModelSignal<boolean> = model<boolean>(false);

  /** Optional header text displayed at the top of the panel. */
  public readonly header: InputSignal<string | null> = input<string | null>(null);

  /** When true, a close button (×) is rendered in the header area. */
  public readonly showCloseButton: InputSignal<boolean> = input<boolean>(false);

  /** When true (default), clicking outside the panel closes the popover. */
  public readonly dismissable: InputSignal<boolean> = input<boolean>(true);

  /** When true (default), pressing Escape closes the popover. */
  public readonly closeOnEscape: InputSignal<boolean> = input<boolean>(true);

  /** Design variant override; inherits from ThemeConfigService when not set. */
  public readonly variant: InputSignal<PopoverVariant | null> = input<PopoverVariant | null>(null);

  /** Additional CSS classes applied to the host element. */
  public readonly styleClass: InputSignal<string | null> = input<string | null>(null);

  // ---- Outputs ----

  /** Emitted after the popover becomes visible. */
  public readonly shown: OutputEmitterRef<void> = output<void>();

  /** Emitted after the popover is hidden. */
  public readonly hidden: OutputEmitterRef<void> = output<void>();

  // ---- Computed ----

  /** Effective variant — falls back to ThemeConfigService. */
  public readonly effectiveVariant: Signal<PopoverVariant> = computed<PopoverVariant>(
    (): PopoverVariant => this.variant() ?? this.themeConfig.variant(),
  );

  /** Host CSS classes. */
  public readonly hostClasses: Signal<string> = computed<string>((): string => {
    const classes: string[] = ['ui-lib-popover'];

    if (this.visible()) {
      classes.push('ui-lib-popover--open');
    }

    const extra: string | null = this.styleClass();
    if (extra) {
      classes.push(extra);
    }

    return classes.join(' ');
  });

  /** Panel CSS classes combining variant, placement, and visibility state. */
  public readonly panelClasses: Signal<string> = computed<string>((): string => {
    const classes: string[] = [
      'ui-lib-popover__panel',
      `ui-lib-popover--variant-${this.effectiveVariant()}`,
      `ui-lib-popover__panel--placement-${this.placement()}`,
    ];

    if (this.positionReady()) {
      classes.push('ui-lib-popover__panel--visible');
    }

    return classes.join(' ');
  });

  constructor() {
    this.lastVisible = this.visible();

    effect((): void => {
      const isVisible: boolean = this.visible();
      if (isVisible === this.lastVisible) {
        return;
      }
      this.lastVisible = isVisible;

      if (isVisible) {
        this.positionReady.set(false);
        afterNextRender(
          (): void => {
            if (this.visible()) {
              this.computeAndSetPosition();
              this.positionReady.set(true);
              this.activateFocusTrap();
              this.shown.emit();
            }
          },
          { injector: this.injector },
        );
      } else {
        this.positionReady.set(false);
        this.deactivateFocusTrap();
        // Restore focus to the element that had focus before the popover opened.
        this.previousFocusEl?.focus();
        this.previousFocusEl = null;
        this.hidden.emit();
      }
    });
  }

  public ngOnDestroy(): void {
    this.deactivateFocusTrap();
    this.previousFocusEl = null;
  }

  /** Toggle visibility: show if hidden, hide if visible. */
  public toggle(target: HTMLElement): void {
    if (this.visible()) {
      this.hide();
    } else {
      this.show(target);
    }
  }

  /** Show the popover anchored to the given target element. */
  public show(target: HTMLElement): void {
    // Capture focus before the popover takes it over.
    // Prefer document.activeElement (keyboard-triggered show), fall back to target
    // (mouse-triggered show where activeElement may still be body).
    const active: HTMLElement | null = this.document.activeElement as HTMLElement | null;
    this.previousFocusEl = active && active !== this.document.body ? active : target;
    this.targetElement.set(target);
    this.visible.set(true);
  }

  /** Hide the popover. */
  public hide(): void {
    this.visible.set(false);
    this.targetElement.set(null);
  }

  /** Handle click on the transparent overlay — dismisses the popover when dismissable. */
  public onOverlayClick(): void {
    if (this.dismissable()) {
      this.hide();
    }
  }

  /** Handle keydown on the panel — closes on Escape when closeOnEscape is true. */
  public onPanelKeydown(event: KeyboardEvent): void {
    if (event.key === KEYBOARD_KEYS.Escape && this.closeOnEscape()) {
      event.preventDefault();
      event.stopPropagation();
      this.hide();
    }
  }

  private generateId(): string {
    if (
      typeof globalThis.crypto !== 'undefined' &&
      typeof globalThis.crypto.randomUUID === 'function'
    ) {
      return `ui-lib-popover-${globalThis.crypto.randomUUID()}`;
    }
    nextPopoverId += 1;
    return `ui-lib-popover-${nextPopoverId}`;
  }

  private computeAndSetPosition(): void {
    const target: HTMLElement | null = this.targetElement();
    if (!target) {
      return;
    }

    const panel: HTMLElement | null =
      this.elementRef.nativeElement.querySelector<HTMLElement>('.ui-lib-popover__panel');
    if (!panel) {
      return;
    }

    const targetRect: DOMRect = target.getBoundingClientRect();
    const panelRect: DOMRect = panel.getBoundingClientRect();
    const viewportWidth: number = window.innerWidth;
    const viewportHeight: number = window.innerHeight;
    const gap: number = 10;

    const spaceAbove: number = targetRect.top;
    const spaceBelow: number = viewportHeight - targetRect.bottom;
    const fitsAbove: boolean = spaceAbove >= panelRect.height + gap;
    const fitsBelow: boolean = spaceBelow >= panelRect.height + gap;

    // Prefer below; fall back to above only when below won't fit
    const showAbove: boolean = !fitsBelow && fitsAbove;

    let top: number;
    if (showAbove) {
      top = targetRect.top - panelRect.height - gap;
      this.placement.set('above');
    } else {
      top = targetRect.bottom + gap;
      this.placement.set('below');
    }

    // Center popup on target, clamped to viewport padding.
    const targetCenter: number = targetRect.left + targetRect.width / 2;
    let left: number = targetCenter - panelRect.width / 2;
    const viewportPadding: number = 8;
    left = Math.max(
      viewportPadding,
      Math.min(left, viewportWidth - panelRect.width - viewportPadding),
    );

    // Arrow points at target center, offset relative to panel left.
    const rawArrowLeft: number = targetCenter - left;
    const arrowHalfWidth: number = 8;
    const clampedArrowLeft: number = Math.max(
      arrowHalfWidth + 4,
      Math.min(rawArrowLeft, panelRect.width - arrowHalfWidth - 4),
    );

    this.panelTop.set(top);
    this.panelLeft.set(left);
    this.arrowLeftOffset.set(clampedArrowLeft);
  }

  private activateFocusTrap(): void {
    const panel: HTMLElement | null =
      this.elementRef.nativeElement.querySelector<HTMLElement>('.ui-lib-popover__panel');
    if (!panel) {
      return;
    }
    this.deactivateFocusTrap();
    this.focusTrap = new FocusTrap(panel);
    this.focusTrap.activate();
  }

  private deactivateFocusTrap(): void {
    this.focusTrap?.deactivate();
    this.focusTrap = null;
  }
}
