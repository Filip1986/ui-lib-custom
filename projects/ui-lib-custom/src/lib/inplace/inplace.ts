import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  inject,
  Injector,
  input,
  type InputSignal,
  model,
  type ModelSignal,
  output,
  type OutputEmitterRef,
  type Signal,
  ViewEncapsulation,
} from '@angular/core';

import { UiLibI18nService } from 'ui-lib-custom/i18n';
import { ThemeConfigService } from 'ui-lib-custom/theme';

import type { InplaceVariant } from './inplace.types';

export type { InplaceVariant } from './inplace.types';

/** Auto-incrementing counter to generate a unique DOM id per Inplace instance. */
let nextInplaceId: number = 0;

/** CSS selector matching all standard focusable interactive elements. */
const FOCUSABLE_SELECTOR: string =
  'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

/**
 * Inplace — inline editing component that toggles between a display and content slot.
 *
 * The display trigger is a native `<button>` with `aria-expanded` and `aria-controls`
 * so screen readers announce the toggle state correctly.  On activation, focus moves
 * to the first focusable element inside the content slot; on deactivation it returns
 * to the display button.  Pressing Escape while the content is active also deactivates.
 *
 * Supports three design variants (material / bootstrap / minimal) and falls back to
 * the global ThemeConfigService.
 *
 * @example
 * <ui-lib-inplace>
 *   <span inplaceDisplay>Click to edit</span>
 *   <input inplaceContent type="text" />
 * </ui-lib-inplace>
 */
@Component({
  selector: 'ui-lib-inplace',
  standalone: true,
  templateUrl: './inplace.html',
  styleUrl: './inplace.scss',
  host: {
    '[class]': 'hostClasses()',
    '[id]': 'instanceId',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class Inplace {
  private readonly themeConfig: ThemeConfigService = inject(ThemeConfigService);
  private readonly i18n: UiLibI18nService = inject(UiLibI18nService);
  private readonly elementRef: ElementRef<HTMLElement> = inject(
    ElementRef,
  ) as ElementRef<HTMLElement>;
  private readonly injector: Injector = inject(Injector);

  /** Auto-generated unique ID for this component instance. */
  public readonly instanceId: string = `ui-lib-inplace-${(nextInplaceId += 1)}`;

  /** ID of the display button element. */
  public readonly displayId: string = `${this.instanceId}-display`;

  /** ID of the content wrapper element (used for `aria-controls` on the display button). */
  public readonly contentId: string = `${this.instanceId}-content`;

  /** Whether the inplace editor is currently active (two-way bindable). */
  public readonly active: ModelSignal<boolean> = model<boolean>(false);

  /** When true, no interaction is allowed and the display slot appears disabled. */
  public readonly disabled: InputSignal<boolean> = input<boolean>(false);

  /** When true, a close button is rendered inside the content slot to deactivate. */
  public readonly closable: InputSignal<boolean> = input<boolean>(false);

  /** Icon class for the close button (e.g. "pi pi-times"). */
  public readonly closeIcon: InputSignal<string> = input<string>('pi pi-times');

  /** Accessible label for the display button. Falls back to locale 'inplace.display' when empty. */
  public readonly displayLabel: InputSignal<string> = input<string>('');

  /** Accessible label for the close button. Falls back to locale 'inplace.close' when empty. */
  public readonly closeLabel: InputSignal<string> = input<string>('');

  /** Visual variant — inherits from ThemeConfigService when not set. */
  public readonly variant: InputSignal<InplaceVariant | null> = input<InplaceVariant | null>(null);

  /** Additional CSS classes to attach to the host element. */
  public readonly styleClass: InputSignal<string | null> = input<string | null>(null);

  /** Emitted when the inplace editor transitions to the active (editing) state. */
  public readonly activated: OutputEmitterRef<void> = output<void>();

  /** Emitted when the inplace editor transitions back to the display (inactive) state. */
  public readonly deactivated: OutputEmitterRef<void> = output<void>();

  /** Resolved variant — direct input wins, then falls back to global ThemeConfigService. */
  private readonly effectiveVariant: Signal<InplaceVariant> = computed<InplaceVariant>(
    (): InplaceVariant => this.variant() ?? this.themeConfig.variant(),
  );

  /** Resolved display button aria-label — uses input when non-empty, otherwise i18n. */
  public readonly effectiveDisplayLabel: Signal<string> = computed<string>(
    (): string => this.displayLabel() || this.i18n.translate('inplace.display'),
  );

  /** Resolved close button aria-label — uses input when non-empty, otherwise i18n. */
  public readonly effectiveCloseLabel: Signal<string> = computed<string>(
    (): string => this.closeLabel() || this.i18n.translate('inplace.close'),
  );

  /** Computed CSS classes applied to the host element. */
  public readonly hostClasses: Signal<string> = computed<string>((): string => {
    const classes: string[] = [
      'ui-lib-inplace',
      `ui-lib-inplace--variant-${this.effectiveVariant()}`,
    ];
    if (this.active()) {
      classes.push('ui-lib-inplace--active');
    }
    if (this.disabled()) {
      classes.push('ui-lib-inplace--disabled');
    }
    const extra: string | null = this.styleClass();
    if (extra) {
      classes.push(extra);
    }
    return classes.join(' ');
  });

  /** Handles click on the display button (guard is a safety belt; native disabled prevents events). */
  public onDisplayClick(): void {
    if (!this.disabled()) {
      this.activate();
    }
  }

  /** Handles keydown on the display button — Enter or Space activate the editor. */
  public onDisplayKeydown(event: KeyboardEvent): void {
    if (!this.disabled() && (event.key === 'Enter' || event.key === ' ')) {
      event.preventDefault();
      this.activate();
    }
  }

  /** Handles keydown inside the content area — Escape deactivates the editor. */
  public onContentKeydown(event: KeyboardEvent): void {
    if (event.key === 'Escape') {
      event.stopPropagation();
      this.deactivate();
    }
  }

  /**
   * Switches to the active (editing) state, emits `activated`, and moves
   * keyboard focus to the first focusable element inside the content slot.
   */
  public activate(): void {
    this.active.set(true);
    this.activated.emit();
    afterNextRender(
      (): void => {
        const contentEl: HTMLElement | null =
          this.elementRef.nativeElement.querySelector<HTMLElement>('.ui-lib-inplace__content');
        const focusable: HTMLElement | null | undefined =
          contentEl?.querySelector<HTMLElement>(FOCUSABLE_SELECTOR);
        focusable?.focus();
      },
      { injector: this.injector },
    );
  }

  /**
   * Switches back to the display (inactive) state, emits `deactivated`, and
   * restores keyboard focus to the display button.
   */
  public deactivate(): void {
    this.active.set(false);
    this.deactivated.emit();
    afterNextRender(
      (): void => {
        const displayBtn: HTMLElement | null =
          this.elementRef.nativeElement.querySelector<HTMLElement>('.ui-lib-inplace__display');
        displayBtn?.focus();
      },
      { injector: this.injector },
    );
  }
}
