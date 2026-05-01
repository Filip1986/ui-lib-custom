import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  computed,
  effect,
  inject,
  input,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import type { InputSignal, Signal, WritableSignal } from '@angular/core';
import { Icon } from 'ui-lib-custom/icon';
import type { StatusIcon } from 'ui-lib-custom/icon';
import { ThemeConfigService } from 'ui-lib-custom/theme';
import { ToastService } from './toast.service';
import type { ToastMessage, ToastPosition, ToastSeverity, ToastVariant } from './toast.types';

export type { ToastMessage, ToastPosition, ToastSeverity, ToastVariant } from './toast.types';
export { ToastService } from './toast.service';

/** Maps ToastSeverity to the closest StatusIcon semantic name. */
const SEVERITY_ICON_MAP: Record<ToastSeverity, StatusIcon> = {
  success: 'success',
  info: 'info',
  warn: 'warning',
  error: 'error',
} as const;

/** Duration of the exit animation in milliseconds — must match the CSS transition. */
const ANIMATION_DURATION_MS: number = 300;

/**
 * Toast component — fixed-position notification overlay driven by ToastService.
 *
 * Place one instance in your app shell template (outside the router outlet).
 * Call ToastService.add() from anywhere in the app to display a notification.
 *
 * @example
 * // app.component.html
 * <router-outlet />
 * <ui-lib-toast position="top-right" />
 *
 * // any.component.ts
 * private readonly toastService = inject(ToastService);
 * this.toastService.add({ severity: 'success', summary: 'Done', detail: 'Changes saved.' });
 */
@Component({
  selector: 'ui-lib-toast',
  standalone: true,
  imports: [Icon],
  templateUrl: './toast.html',
  styleUrl: './toast.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'ui-lib-toast',
    '[class]': 'hostClasses()',
    role: 'region',
    '[attr.aria-label]': '"Notifications"',
    'aria-live': 'polite',
    'aria-atomic': 'false',
  },
})
export class Toast {
  private readonly toastService: ToastService = inject(ToastService);
  private readonly themeConfig: ThemeConfigService = inject(ThemeConfigService);
  private readonly destroyRef: DestroyRef = inject(DestroyRef);

  /** Screen position of the toast container. */
  public readonly position: InputSignal<ToastPosition> = input<ToastPosition>('top-right');

  /**
   * Default auto-dismiss duration in milliseconds.
   * Individual messages can override this via their own `life` property.
   */
  public readonly life: InputSignal<number> = input<number>(3000);

  /**
   * Design variant. When null, falls back to the global ThemeConfigService variant.
   */
  public readonly variant: InputSignal<ToastVariant | null> = input<ToastVariant | null>(null);

  /**
   * Container key — when set, only messages with a matching `key` are displayed.
   * Use multiple Toast containers with different keys for different screen regions.
   */
  public readonly key: InputSignal<string | null> = input<string | null>(null);

  /** Additional CSS class(es) to attach to the host element. */
  public readonly styleClass: InputSignal<string | null> = input<string | null>(null);

  /** IDs of messages currently playing the CSS exit animation. */
  private readonly closingIds: WritableSignal<Set<string>> = signal<Set<string>>(new Set<string>());

  /** Active auto-dismiss timer handles keyed by message ID. */
  private readonly timers: Map<string, ReturnType<typeof setTimeout>> = new Map<
    string,
    ReturnType<typeof setTimeout>
  >();

  /** Resolved design variant — falls back to ThemeConfigService global variant. */
  public readonly effectiveVariant: Signal<ToastVariant> = computed<ToastVariant>(
    (): ToastVariant => this.variant() ?? this.themeConfig.variant()
  );

  /** Toast messages to display — filtered by key when the key input is set. */
  public readonly visibleMessages: Signal<ToastMessage[]> = computed<ToastMessage[]>(
    (): ToastMessage[] => {
      const filterKey: string | null = this.key();
      const allMessages: ToastMessage[] = this.toastService.messages();
      return filterKey !== null
        ? allMessages.filter((message: ToastMessage): boolean => message.key === filterKey)
        : allMessages;
    }
  );

  /** Computed CSS classes applied to the host element. */
  public readonly hostClasses: Signal<string> = computed<string>((): string => {
    const classes: string[] = [
      `ui-lib-toast--${this.position()}`,
      `ui-lib-toast--${this.effectiveVariant()}`,
    ];
    const extra: string | null = this.styleClass();
    if (extra) {
      classes.push(extra);
    }
    return classes.join(' ');
  });

  constructor() {
    // Manage auto-dismiss timers reactively whenever the visible message list changes.
    effect((): void => {
      const messages: ToastMessage[] = this.visibleMessages();
      const activeIds: Set<string> = new Set<string>(
        messages.map((message: ToastMessage): string => message.id ?? '')
      );

      // Cancel timers for messages that are no longer in the queue.
      for (const [id, timer] of this.timers.entries()) {
        if (!activeIds.has(id)) {
          clearTimeout(timer);
          this.timers.delete(id);
        }
      }

      // Start auto-dismiss timers for newly added non-sticky messages.
      for (const message of messages) {
        if (!message.sticky && message.id && !this.timers.has(message.id)) {
          const duration: number = message.life ?? this.life();
          const timer: ReturnType<typeof setTimeout> = setTimeout((): void => {
            this.dismiss(message.id ?? '');
          }, duration);
          this.timers.set(message.id, timer);
        }
      }
    });

    // Clean up all pending timers when the component is destroyed.
    this.destroyRef.onDestroy((): void => {
      for (const timer of this.timers.values()) {
        clearTimeout(timer);
      }
      this.timers.clear();
    });
  }

  /**
   * Returns the resolved icon name for the given message.
   * Prefer the message's custom icon; fall back to the severity default.
   */
  public resolvedIcon(message: ToastMessage): StatusIcon | string {
    if (message.icon) {
      return message.icon;
    }
    const severity: ToastSeverity = message.severity ?? 'info';
    return SEVERITY_ICON_MAP[severity];
  }

  /** Returns true when the given message ID is currently playing its exit animation. */
  public isClosing(messageId: string): boolean {
    return this.closingIds().has(messageId);
  }

  /**
   * Returns the CSS class string for an individual toast item.
   * Includes severity, closing-state, and any custom styleClass.
   */
  public itemClass(message: ToastMessage): string {
    const severity: string = message.severity ?? 'info';
    const classes: string[] = [`ui-lib-toast__item--${severity}`];
    if (this.isClosing(message.id ?? '')) {
      classes.push('ui-lib-toast__item--closing');
    }
    if (message.styleClass) {
      classes.push(message.styleClass);
    }
    return classes.join(' ');
  }

  /**
   * Dismiss a toast: cancel its auto-dismiss timer, play the exit animation,
   * then remove it from the service after the animation completes.
   */
  public dismiss(messageId: string): void {
    // Cancel the scheduled auto-dismiss timer if still pending.
    const timer: ReturnType<typeof setTimeout> | undefined = this.timers.get(messageId);
    if (timer !== undefined) {
      clearTimeout(timer);
      this.timers.delete(messageId);
    }

    // Apply the exit animation class.
    this.closingIds.update(
      (current: Set<string>): Set<string> => new Set<string>([...current, messageId])
    );

    // After the animation finishes, remove the message from the service.
    setTimeout((): void => {
      this.toastService.remove(messageId);
      this.closingIds.update((current: Set<string>): Set<string> => {
        const next: Set<string> = new Set<string>(current);
        next.delete(messageId);
        return next;
      });
    }, ANIMATION_DURATION_MS);
  }
}
