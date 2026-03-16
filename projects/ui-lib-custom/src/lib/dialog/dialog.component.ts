import { DOCUMENT, isPlatformBrowser, CommonModule, NgStyle } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  PLATFORM_ID,
  ViewChild,
  ViewEncapsulation,
  afterNextRender,
  computed,
  contentChildren,
  effect,
  inject,
  input,
  model,
  output,
  signal,
  type InputSignal,
  type ModelSignal,
  type OnDestroy,
  type OutputEmitterRef,
  type Signal,
  type WritableSignal,
} from '@angular/core';
import { FocusTrap, KEYBOARD_KEYS } from 'ui-lib-custom/core';
import { ThemeConfigService } from 'ui-lib-custom/theme';
import { DIALOG_DEFAULTS, DIALOG_POSITION_CLASS_MAP } from './dialog.constants';
import type { DialogPosition, DialogVariant } from './dialog.types';
import type { BackdropAnimationParams, DialogAnimationParams } from './dialog-animations';

/**
 * Dialog component with modal/backdrop and responsive behavior.
 */
@Component({
  selector: 'ui-lib-dialog',
  standalone: true,
  imports: [CommonModule, NgStyle],
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': 'hostClasses()',
    '[attr.data-visible]': 'visible() ? true : null',
    '[style.--uilib-dialog-enter-duration]': 'dialogMotion().enterDuration',
    '[style.--uilib-dialog-enter-easing]': 'dialogMotion().easing',
    '[style.--uilib-dialog-enter-start-scale]': 'dialogMotion().startScale',
    '[style.--uilib-dialog-enter-start-translate-y]': 'dialogMotion().startTranslateY',
    '[style.--uilib-dialog-backdrop-enter-duration]': 'backdropMotion().enterDuration',
    '[style.--uilib-dialog-backdrop-enter-easing]': 'backdropMotion().easing',
  },
})
export class DialogComponent implements OnDestroy {
  private static nextId: number = 0;

  private readonly platformId: object = inject(PLATFORM_ID);
  private readonly hostElement: ElementRef<HTMLElement> = inject(
    ElementRef
  ) as ElementRef<HTMLElement>;
  private readonly document: Document = inject(DOCUMENT);
  private readonly themeConfig: ThemeConfigService = inject(ThemeConfigService);
  private readonly isBrowser: boolean = isPlatformBrowser(this.platformId);

  private readonly projectedElements: Signal<readonly ElementRef<HTMLElement>[]> = contentChildren<
    ElementRef<HTMLElement>
  >(ElementRef, { descendants: true });

  private readonly generatedId: string = this.createDialogId();
  private readonly generatedTitleId: string = `${this.generatedId}-title`;

  private readonly maximizedState: WritableSignal<boolean> = signal<boolean>(false);
  private readonly dragOffset: WritableSignal<{ x: number; y: number }> = signal<{
    x: number;
    y: number;
  }>({
    x: 0,
    y: 0,
  });
  private readonly draggingState: WritableSignal<boolean> = signal<boolean>(false);
  private readonly responsiveWidth: WritableSignal<string | null> = signal<string | null>(null);
  private readonly previousBodyOverflow: WritableSignal<string | null> = signal<string | null>(
    null
  );

  private mediaQueryCleanupFns: Array<() => void> = [];
  private dragCleanupFns: Array<() => void> = [];
  private activePointerId: number | null = null;
  private dragStartPointerX: number = 0;
  private dragStartPointerY: number = 0;
  private dragStartOffsetX: number = 0;
  private dragStartOffsetY: number = 0;
  private dragStartLeft: number = 0;
  private dragStartTop: number = 0;
  private dragPanelWidth: number = 0;
  private dragPanelHeight: number = 0;
  private lastVisible: boolean = false;
  private focusTrap: FocusTrap | null = null;

  @ViewChild('panelElement')
  public panelElement?: ElementRef<HTMLElement>;

  /** Controls dialog visibility. Supports two-way binding with [(visible)]. */
  public readonly visible: ModelSignal<boolean> = model<boolean>(DIALOG_DEFAULTS.Visible);

  /** Optional header text fallback when no projected header is supplied. */
  public readonly header: InputSignal<string> = input<string>(DIALOG_DEFAULTS.Header);

  /** Enables modal mode and backdrop rendering. */
  public readonly modal: InputSignal<boolean> = input<boolean>(DIALOG_DEFAULTS.Modal);

  /** Controls whether the close button is shown. */
  public readonly closable: InputSignal<boolean> = input<boolean>(DIALOG_DEFAULTS.Closable);

  /** Enables closing the dialog with Escape key. */
  public readonly closeOnEscape: InputSignal<boolean> = input<boolean>(
    DIALOG_DEFAULTS.CloseOnEscape
  );

  /** Enables closing the dialog by clicking the modal backdrop. */
  public readonly dismissableMask: InputSignal<boolean> = input<boolean>(
    DIALOG_DEFAULTS.DismissableMask
  );

  /** Enables dialog dragging (placeholder for v1 core behavior). */
  public readonly draggable: InputSignal<boolean> = input<boolean>(DIALOG_DEFAULTS.Draggable);

  /** Enables maximize/minimize controls. */
  public readonly maximizable: InputSignal<boolean> = input<boolean>(DIALOG_DEFAULTS.Maximizable);

  /** Enables body scroll lock while a modal dialog is visible. */
  public readonly blockScroll: InputSignal<boolean> = input<boolean>(DIALOG_DEFAULTS.BlockScroll);

  /** Dialog viewport placement. */
  public readonly position: InputSignal<DialogPosition> = input<DialogPosition>(
    DIALOG_DEFAULTS.Position
  );

  /** Responsive max-width -> width map, e.g. { '960px': '75vw', '640px': '90vw' }. */
  public readonly breakpoints: InputSignal<Record<string, string>> = input<Record<string, string>>({
    ...DIALOG_DEFAULTS.Breakpoints,
  });

  /** Optional component variant override. */
  public readonly variant: InputSignal<DialogVariant | undefined> = input<
    DialogVariant | undefined
  >(undefined);

  /** Optional aria-labelledby override. */
  public readonly ariaLabelledBy: InputSignal<string | undefined> = input<string | undefined>(
    undefined
  );

  /** Enables headless rendering mode. */
  public readonly headless: InputSignal<boolean> = input<boolean>(DIALOG_DEFAULTS.Headless);

  /** Emitted after the dialog is shown. */
  public readonly show: OutputEmitterRef<void> = output<void>();

  /** Emitted after the dialog is hidden. */
  public readonly hide: OutputEmitterRef<void> = output<void>();

  /** Emitted when maximize state changes. */
  public readonly maximize: OutputEmitterRef<{ maximized: boolean }> = output<{
    maximized: boolean;
  }>();

  /** Whether projected header content exists. */
  public readonly hasHeaderContent: Signal<boolean> = computed<boolean>((): boolean =>
    this.projectedElements().some((elementRef: ElementRef<HTMLElement>): boolean =>
      elementRef.nativeElement.hasAttribute('uiLibDialogHeader')
    )
  );

  /** Stable title id used for aria-labelledby fallback. */
  public readonly titleId: Signal<string> = computed<string>((): string => this.generatedTitleId);

  /** Effective aria-labelledby value. */
  public readonly labelledById: Signal<string | null> = computed<string | null>(
    (): string | null => {
      const explicitLabelId: string | undefined = this.ariaLabelledBy();
      if (explicitLabelId) {
        return explicitLabelId;
      }

      if (this.hasHeaderContent() || this.header().trim().length > 0) {
        return this.generatedTitleId;
      }

      return null;
    }
  );

  /** Whether the dialog is currently maximized. */
  public readonly maximized: Signal<boolean> = computed<boolean>((): boolean =>
    this.maximizedState()
  );

  /** Whether the dialog header is currently being dragged. */
  public readonly isDragging: Signal<boolean> = computed<boolean>((): boolean =>
    this.draggingState()
  );

  /** Resolved variant value used for host/panel class computation. */
  public readonly resolvedVariant: Signal<DialogVariant> = computed<DialogVariant>(
    (): DialogVariant => this.variant() ?? this.themeConfig.variant()
  );

  /** Position class resolved from position input. */
  public readonly positionClass: Signal<string> = computed<string>(
    (): string => DIALOG_POSITION_CLASS_MAP[this.position()]
  );

  /** Host class list for overlay container behavior. */
  public readonly hostClasses: Signal<string> = computed<string>((): string => {
    const classes: string[] = ['ui-lib-dialog', this.positionClass()];

    if (this.visible()) {
      classes.push('ui-lib-dialog--visible');
    }
    if (this.modal()) {
      classes.push('ui-lib-dialog--modal');
    }
    if (this.headless()) {
      classes.push('ui-lib-dialog--headless');
    }

    return classes.join(' ');
  });

  /** Panel class list for dialog shell styles. */
  public readonly panelClasses: Signal<string> = computed<string>((): string => {
    const classes: string[] = [
      'ui-lib-dialog-panel',
      `ui-lib-dialog--variant-${this.resolvedVariant()}`,
    ];

    if (this.maximized()) {
      classes.push('ui-lib-dialog-panel--maximized');
    }
    if (this.draggable()) {
      classes.push('ui-lib-dialog-panel--draggable');
    }
    if (this.isDragging()) {
      classes.push('ui-lib-dialog-panel--dragging');
    }

    return classes.join(' ');
  });

  /** Dynamic panel styles (responsive width, dragging, and maximize behavior). */
  public readonly panelStyles: Signal<Record<string, string | null>> = computed<
    Record<string, string | null>
  >((): Record<string, string | null> => {
    const offset: { x: number; y: number } = this.dragOffset();
    const styles: Record<string, string | null> = {
      width: this.responsiveWidth(),
      transform: `translate(${offset.x}px, ${offset.y}px)`,
    };

    if (this.maximized()) {
      styles['width'] = '100vw';
      styles['height'] = '100vh';
      styles['top'] = '0';
      styles['left'] = '0';
      styles['maxWidth'] = 'none';
      styles['maxHeight'] = 'none';
      styles['margin'] = '0';
      styles['position'] = 'fixed';
      styles['transform'] = 'none';
      styles['borderRadius'] = '0';
    }

    return styles;
  });

  /** Panel motion variables resolved per variant for CSS-driven animations. */
  public readonly dialogMotion: Signal<DialogAnimationParams> = computed<DialogAnimationParams>(
    (): DialogAnimationParams => {
      if (this.resolvedVariant() === 'bootstrap') {
        return {
          enterDuration: '200ms',
          easing: 'ease-out',
          startScale: '1',
          startTranslateY: '0px',
        };
      }

      if (this.resolvedVariant() === 'minimal') {
        return {
          enterDuration: '100ms',
          easing: 'ease-out',
          startScale: '1',
          startTranslateY: '0px',
        };
      }

      return {
        enterDuration: '200ms',
        easing: 'ease-out',
        startScale: '0.9',
        startTranslateY: '-8px',
      };
    }
  );

  /** Backdrop motion variables resolved per variant for CSS-driven animations. */
  public readonly backdropMotion: Signal<BackdropAnimationParams> =
    computed<BackdropAnimationParams>((): BackdropAnimationParams => {
      if (this.resolvedVariant() === 'minimal') {
        return {
          enterDuration: '100ms',
          easing: 'ease-out',
        };
      }

      return {
        enterDuration: '150ms',
        easing: 'ease-out',
      };
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
        this.applyScrollLock();
        this.setupBreakpointListeners();
        queueMicrotask((): void => this.show.emit());
      } else {
        this.releaseScrollLock();
        this.cleanupBreakpointListeners();
        this.deactivateFocusTrap();
        this.stopDragging();
        this.resetDragOffset();
        this.responsiveWidth.set(null);
        queueMicrotask((): void => this.hide.emit());
      }
    });

    effect((): void => {
      this.position();
      if (!this.maximized()) {
        this.stopDragging();
        this.resetDragOffset();
      }
    });

    effect((): void => {
      if (!this.visible()) {
        this.responsiveWidth.set(null);
        return;
      }

      this.evaluateResponsiveWidth();
    });

    effect((): void => {
      const shouldTrapFocus: boolean = this.visible() && this.modal();
      if (!shouldTrapFocus) {
        this.deactivateFocusTrap();
        return;
      }

      afterNextRender((): void => {
        if (this.visible() && this.modal()) {
          this.activateFocusTrap();
        }
      });
    });
  }

  public ngOnDestroy(): void {
    this.releaseScrollLock();
    this.cleanupBreakpointListeners();
    this.deactivateFocusTrap();
    this.stopDragging();
  }

  /** Handles pointer drag start from the dialog header. */
  public onHeaderPointerDown(event: PointerEvent): void {
    if (!this.isBrowser || !this.draggable() || this.maximized()) {
      return;
    }

    if (event.button !== 0) {
      return;
    }

    const target: HTMLElement | null = event.target instanceof HTMLElement ? event.target : null;
    if (target?.closest('.ui-lib-dialog-header-actions')) {
      return;
    }

    const panel: HTMLElement | undefined = this.panelElement?.nativeElement;
    if (!panel) {
      return;
    }

    const rect: DOMRect = panel.getBoundingClientRect();
    this.activePointerId = event.pointerId;
    this.dragStartPointerX = event.clientX;
    this.dragStartPointerY = event.clientY;
    this.dragStartOffsetX = this.dragOffset().x;
    this.dragStartOffsetY = this.dragOffset().y;
    this.dragStartLeft = rect.left;
    this.dragStartTop = rect.top;
    this.dragPanelWidth = rect.width;
    this.dragPanelHeight = rect.height;
    this.draggingState.set(true);

    this.bindDragListeners();
    event.preventDefault();
  }

  /** Handles backdrop click close behavior. */
  public onBackdropClick(): void {
    if (this.dismissableMask()) {
      this.close();
    }
  }

  /** Handles Escape close behavior on the panel keydown event. */
  public onPanelKeydown(event: KeyboardEvent): void {
    if (event.key === KEYBOARD_KEYS.Escape && this.closeOnEscape()) {
      event.preventDefault();
      event.stopPropagation();
      this.close();
    }
  }

  /** Closes the dialog. */
  public close(): void {
    this.visible.set(false);
  }

  /** Toggles maximize mode and emits maximize state. */
  public toggleMaximize(): void {
    if (!this.maximizable()) {
      return;
    }

    const nextMaximized: boolean = !this.maximizedState();
    this.maximizedState.set(nextMaximized);
    if (nextMaximized) {
      this.stopDragging();
    }
    this.maximize.emit({ maximized: nextMaximized });
  }

  /** Activates the reusable focus trap for the current dialog container. */
  private activateFocusTrap(): void {
    if (!this.isBrowser) {
      return;
    }

    const container: HTMLElement =
      this.panelElement?.nativeElement ?? this.hostElement.nativeElement;

    this.deactivateFocusTrap();
    this.focusTrap = new FocusTrap(container);
    this.focusTrap.activate();
  }

  /** Deactivates the reusable focus trap if active. */
  private deactivateFocusTrap(): void {
    this.focusTrap?.deactivate();
    this.focusTrap = null;
  }

  private applyScrollLock(): void {
    if (!this.isBrowser || !this.modal() || !this.blockScroll()) {
      return;
    }

    const body: HTMLElement = this.document.body;
    this.previousBodyOverflow.set(body.style.overflow);
    body.style.overflow = 'hidden';
  }

  private releaseScrollLock(): void {
    if (!this.isBrowser || !this.modal() || !this.blockScroll()) {
      return;
    }

    const body: HTMLElement = this.document.body;
    body.style.overflow = this.previousBodyOverflow() ?? '';
    this.previousBodyOverflow.set(null);
  }

  private setupBreakpointListeners(): void {
    this.cleanupBreakpointListeners();

    if (!this.isBrowser || !this.visible()) {
      return;
    }

    const windowRef: Window | null = this.document.defaultView;
    if (!windowRef || typeof windowRef.matchMedia !== 'function') {
      return;
    }

    const breakpoints: Record<string, string> = this.breakpoints();
    Object.keys(breakpoints).forEach((maxWidth: string): void => {
      const mediaQueryList: MediaQueryList = windowRef.matchMedia(`(max-width: ${maxWidth})`);
      const handler: () => void = (): void => this.evaluateResponsiveWidth();

      if (typeof mediaQueryList.addEventListener === 'function') {
        mediaQueryList.addEventListener('change', handler);
        this.mediaQueryCleanupFns.push((): void =>
          mediaQueryList.removeEventListener('change', handler)
        );
      } else {
        mediaQueryList.addListener(handler);
        this.mediaQueryCleanupFns.push((): void => mediaQueryList.removeListener(handler));
      }
    });

    this.evaluateResponsiveWidth();
  }

  private cleanupBreakpointListeners(): void {
    this.mediaQueryCleanupFns.forEach((cleanup: () => void): void => cleanup());
    this.mediaQueryCleanupFns = [];
  }

  private evaluateResponsiveWidth(): void {
    const breakpointEntries: Array<[string, string]> = Object.entries(this.breakpoints()) as Array<
      [string, string]
    >;

    if (breakpointEntries.length === 0) {
      this.responsiveWidth.set(null);
      return;
    }

    if (!this.isBrowser || !this.visible()) {
      this.responsiveWidth.set(this.getLargestBreakpointWidth(breakpointEntries));
      return;
    }

    const windowRef: Window | null = this.document.defaultView;
    if (!windowRef || typeof windowRef.matchMedia !== 'function') {
      this.responsiveWidth.set(this.getLargestBreakpointWidth(breakpointEntries));
      return;
    }

    // Descending max-width order, first match wins.
    const sortedBreakpoints: Array<[string, string]> = breakpointEntries.sort(
      (firstEntry: [string, string], secondEntry: [string, string]): number =>
        this.parsePx(secondEntry[0]) - this.parsePx(firstEntry[0])
    );

    for (const [maxWidth, width] of sortedBreakpoints) {
      if (windowRef.matchMedia(`(max-width: ${maxWidth})`).matches) {
        this.responsiveWidth.set(width);
        return;
      }
    }

    this.responsiveWidth.set(null);
  }

  private getLargestBreakpointWidth(breakpointEntries: Array<[string, string]>): string | null {
    if (breakpointEntries.length === 0) {
      return null;
    }

    const sortedBreakpoints: Array<[string, string]> = breakpointEntries.sort(
      (firstEntry: [string, string], secondEntry: [string, string]): number =>
        this.parsePx(secondEntry[0]) - this.parsePx(firstEntry[0])
    );

    return sortedBreakpoints[0]?.[1] ?? null;
  }

  private bindDragListeners(): void {
    this.cleanupDragListeners();

    const windowRef: Window | null = this.document.defaultView;
    if (!windowRef) {
      return;
    }

    const moveHandler: (event: PointerEvent) => void = (event: PointerEvent): void => {
      this.onDocumentPointerMove(event);
    };
    const upHandler: (event: PointerEvent) => void = (event: PointerEvent): void => {
      this.onDocumentPointerUp(event);
    };

    windowRef.addEventListener('pointermove', moveHandler);
    windowRef.addEventListener('pointerup', upHandler);
    windowRef.addEventListener('pointercancel', upHandler);

    this.dragCleanupFns.push((): void => windowRef.removeEventListener('pointermove', moveHandler));
    this.dragCleanupFns.push((): void => windowRef.removeEventListener('pointerup', upHandler));
    this.dragCleanupFns.push((): void => windowRef.removeEventListener('pointercancel', upHandler));
  }

  private onDocumentPointerMove(event: PointerEvent): void {
    if (
      this.activePointerId === null ||
      event.pointerId !== this.activePointerId ||
      this.maximized()
    ) {
      return;
    }

    const viewportWidth: number = this.document.defaultView?.innerWidth ?? 0;
    const viewportHeight: number = this.document.defaultView?.innerHeight ?? 0;

    const deltaX: number = event.clientX - this.dragStartPointerX;
    const deltaY: number = event.clientY - this.dragStartPointerY;

    const desiredLeft: number = this.dragStartLeft + deltaX;
    const desiredTop: number = this.dragStartTop + deltaY;

    const clampedLeft: number = Math.min(
      Math.max(0, desiredLeft),
      Math.max(0, viewportWidth - this.dragPanelWidth)
    );
    const clampedTop: number = Math.min(
      Math.max(0, desiredTop),
      Math.max(0, viewportHeight - this.dragPanelHeight)
    );

    const nextOffsetX: number = this.dragStartOffsetX + (clampedLeft - this.dragStartLeft);
    const nextOffsetY: number = this.dragStartOffsetY + (clampedTop - this.dragStartTop);

    this.dragOffset.set({ x: nextOffsetX, y: nextOffsetY });
    event.preventDefault();
  }

  private onDocumentPointerUp(event: PointerEvent): void {
    if (this.activePointerId !== null && event.pointerId === this.activePointerId) {
      this.stopDragging();
    }
  }

  private stopDragging(): void {
    this.activePointerId = null;
    this.draggingState.set(false);
    this.cleanupDragListeners();
  }

  private cleanupDragListeners(): void {
    this.dragCleanupFns.forEach((cleanup: () => void): void => cleanup());
    this.dragCleanupFns = [];
  }

  private resetDragOffset(): void {
    this.dragOffset.set({ x: 0, y: 0 });
  }

  private parsePx(value: string): number {
    const parsed: number = Number.parseFloat(value);
    return Number.isNaN(parsed) ? Number.POSITIVE_INFINITY : parsed;
  }

  private createDialogId(): string {
    if (
      typeof globalThis.crypto !== 'undefined' &&
      typeof globalThis.crypto.randomUUID === 'function'
    ) {
      return `ui-lib-dialog-${globalThis.crypto.randomUUID()}`;
    }

    DialogComponent.nextId += 1;
    return `ui-lib-dialog-${DialogComponent.nextId}`;
  }
}
