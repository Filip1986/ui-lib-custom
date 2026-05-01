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
import type { MessageSeverity, MessageVariant, MessageSize } from './message.types';

export type { MessageSeverity, MessageVariant, MessageSize } from './message.types';

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
 * @example
 * <ui-lib-message severity="success" text="Operation completed successfully." />
 * <ui-lib-message severity="warn" [closable]="true" (close)="onClose()">
 *   Unsaved changes will be lost.
 * </ui-lib-message>
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
    role: 'status',
    '[attr.aria-live]': '"polite"',
  },
})
export class Message {
  private readonly themeConfig: ThemeConfigService = inject(ThemeConfigService);

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

  /** Additional CSS class(es) to attach to the host element. */
  public readonly styleClass: InputSignal<string | null> = input<string | null>(null);

  /** Emitted when the close button is activated. */
  public readonly close: OutputEmitterRef<void> = output<void>();

  /** Resolved variant — falls back to the global ThemeConfigService variant. */
  public readonly effectiveVariant: Signal<MessageVariant> = computed<MessageVariant>(
    (): MessageVariant => this.variant() ?? this.themeConfig.variant()
  );

  /** Resolved icon name — custom icon wins, else severity default. */
  public readonly resolvedIcon: Signal<StatusIcon | string> = computed<StatusIcon | string>(
    (): StatusIcon | string => this.icon() ?? SEVERITY_ICON_MAP[this.severity()]
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
