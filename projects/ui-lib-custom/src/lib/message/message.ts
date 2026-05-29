import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  output,
  ViewEncapsulation,
  type InputSignal,
  type OutputEmitterRef,
  type Signal,
} from '@angular/core';
import { Icon } from 'ui-lib-custom/icon';
import type { StatusIcon } from 'ui-lib-custom/icon';
import { ThemeConfigService } from 'ui-lib-custom/theme';
import { UiLibI18nService } from 'ui-lib-custom/i18n';
import type { MessageSeverity, MessageVariant, MessageSize } from './message.types';

export type { MessageSeverity, MessageVariant, MessageSize } from './message.types';

/** Module-level counter for unique message IDs (SSR-safe: runs per module load). */
let nextMessageId: number = 0;

/** Maps MessageSeverity to the closest StatusIcon semantic name. */
const SEVERITY_ICON_MAP: Record<MessageSeverity, StatusIcon> = {
  success: 'success',
  info: 'info',
  warn: 'warning',
  error: 'error',
  secondary: 'info',
  contrast: 'info',
} as const;

/**
 * Message component — inline severity-based status message with optional close action.
 *
 * Supports six severity levels (success, info, warn, error, secondary, contrast),
 * three design variants (material, bootstrap, minimal), and three sizes (sm, md, lg).
 * Content can be supplied via the `text` input or via content projection.
 *
 * The component exposes a stable `id` (via `messageId` input or auto-generated) so
 * parent form controls can wire up `aria-describedby` for inline validation messages.
 *
 * @example
 * <ui-lib-message severity="success" text="Operation completed successfully." />
 * <ui-lib-message severity="warn" [closable]="true" (close)="onClose()">
 *   Unsaved changes will be lost.
 * </ui-lib-message>
 * <!-- inline form validation -->
 * <input [attr.aria-describedby]="msgId" aria-invalid="true" />
 * <ui-lib-message [messageId]="msgId" severity="error" text="Field is required." />
 */
@Component({
  selector: 'ui-lib-message',
  standalone: true,
  imports: [Icon],
  templateUrl: './message.html',
  styleUrl: './message.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'ui-lib-message',
    '[class]': 'hostClasses()',
    '[attr.id]': 'resolvedId()',
    '[attr.role]': 'liveRole()',
    '[attr.aria-live]': 'ariaLive()',
    'aria-atomic': 'true',
  },
})
export class Message {
  private readonly themeConfig: ThemeConfigService = inject(ThemeConfigService);
  protected readonly i18n: UiLibI18nService = inject(UiLibI18nService);

  /** Severity level — controls the colour palette and default icon. */
  public readonly severity: InputSignal<MessageSeverity> = input<MessageSeverity>('info');

  /**
   * Design variant. When omitted, falls back to the global ThemeConfigService variant.
   */
  public readonly variant: InputSignal<MessageVariant | null> = input<MessageVariant | null>(null);

  /** Size of the message. */
  public readonly size: InputSignal<MessageSize> = input<MessageSize>('md');

  /** Optional text content. Can be combined with content projection or used standalone. */
  public readonly text: InputSignal<string | null> = input<string | null>(null);

  /**
   * Custom icon name to override the default severity icon.
   * Accepts any semantic icon name from the icon library.
   */
  public readonly icon: InputSignal<string | null> = input<string | null>(null);

  /** When true, a close button is rendered. */
  public readonly closable: InputSignal<boolean> = input<boolean>(false);

  /** Accessible label for the close button. Falls back to the i18n `message.close` key. */
  public readonly closeAriaLabel: InputSignal<string | null> = input<string | null>(null);

  /** Additional CSS class(es) to attach to the host element. */
  public readonly styleClass: InputSignal<string | null> = input<string | null>(null);

  /**
   * Optional explicit `id` for the host element.
   * When omitted an auto-generated `ui-lib-message-{n}` id is used.
   * Consumers should bind this to the same value they pass to `aria-describedby`
   * on the associated form control.
   */
  public readonly messageId: InputSignal<string | null> = input<string | null>(null);

  /** Per-instance fallback ID, generated exactly once at construction. */
  private readonly _instanceId: string = `ui-lib-message-${nextMessageId++}`;

  /** Emitted when the close button is activated. */
  public readonly close: OutputEmitterRef<void> = output<void>();

  /** Stable host `id` — consumer-provided or auto-generated. */
  public readonly resolvedId: Signal<string> = computed<string>(
    (): string => this.messageId() ?? this._instanceId,
  );

  /**
   * Live-region role:
   * - `"alert"` (assertive) for `error` and `warn` severities
   * - `"status"` (polite) for all other severities
   */
  public readonly liveRole: Signal<'alert' | 'status'> = computed<'alert' | 'status'>(
    (): 'alert' | 'status' =>
      this.severity() === 'error' || this.severity() === 'warn' ? 'alert' : 'status',
  );

  /** Matching `aria-live` politeness level derived from `liveRole`. */
  public readonly ariaLive: Signal<'assertive' | 'polite'> = computed<'assertive' | 'polite'>(
    (): 'assertive' | 'polite' => (this.liveRole() === 'alert' ? 'assertive' : 'polite'),
  );

  /** Resolved variant — falls back to the global ThemeConfigService variant. */
  public readonly effectiveVariant: Signal<MessageVariant> = computed<MessageVariant>(
    (): MessageVariant => this.variant() ?? this.themeConfig.variant(),
  );

  /** Resolved icon name — custom icon wins, else severity default. */
  public readonly resolvedIcon: Signal<StatusIcon | string> = computed<StatusIcon | string>(
    (): StatusIcon | string => this.icon() ?? SEVERITY_ICON_MAP[this.severity()],
  );

  /** Resolved close button aria-label — consumer input wins, falls back to i18n key. */
  public readonly resolvedCloseAriaLabel: Signal<string> = computed<string>(
    (): string => this.closeAriaLabel() ?? this.i18n.translate('message.close'),
  );

  /** Computed CSS classes applied to the host element. */
  public readonly hostClasses: Signal<string> = computed<string>((): string => {
    const classes: string[] = [
      `ui-lib-message--${this.severity()}`,
      `ui-lib-message--${this.effectiveVariant()}`,
      `ui-lib-message--${this.size()}`,
    ];
    const extra: string | null = this.styleClass();
    if (extra) {
      classes.push(extra);
    }
    return classes.join(' ');
  });

  /** Handles close button click. */
  public onClose(): void {
    this.close.emit();
  }
}
