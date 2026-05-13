import {
  computed,
  ChangeDetectionStrategy,
  Component,
  effect,
  ElementRef,
  InjectionToken,
  input,
  inject,
  Renderer2,
  signal,
  ViewEncapsulation,
  type Signal,
  type InputSignal,
  type WritableSignal,
} from '@angular/core';
import { LiveAnnouncerService } from 'ui-lib-custom/a11y';

let formFieldId: number = 0;

export interface FormFieldContext {
  readonly inputId: Signal<string>;
  readonly labelId: Signal<string>;
  readonly hintId: Signal<string>;
  readonly errorId: Signal<string>;
  readonly required: Signal<boolean>;
  readonly invalid: Signal<boolean>;
  readonly disabled: Signal<boolean>;
  readonly describedBy: Signal<string | null>;
}

export const FORM_FIELD_CONTEXT: InjectionToken<FormFieldContext> =
  new InjectionToken<FormFieldContext>('FORM_FIELD_CONTEXT');

/**
 * Wrapper component that handles error announcements for any form control
 */
@Component({
  selector: 'ui-lib-form-field',
  standalone: true,
  templateUrl: './form-field.html',
  styleUrl: './form-field.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: FORM_FIELD_CONTEXT,
      useExisting: FormField,
    },
  ],
})
export class FormField implements FormFieldContext {
  private readonly liveAnnouncer: LiveAnnouncerService = inject(LiveAnnouncerService);
  private readonly hostElementRef: ElementRef = inject(ElementRef);
  private readonly renderer: Renderer2 = inject(Renderer2);

  public readonly label: InputSignal<string | null> = input<string | null>(null);
  public readonly inputIdOverride: InputSignal<string | null> = input<string | null>(null, {
    alias: 'inputId',
  });
  public readonly required: InputSignal<boolean> = input<boolean>(false);
  public readonly invalidOverride: InputSignal<boolean> = input<boolean>(false, {
    alias: 'invalid',
  });
  public readonly disabled: InputSignal<boolean> = input<boolean>(false);
  public readonly error: InputSignal<string | null> = input<string | null>(null);
  public readonly hint: InputSignal<string | null> = input<string | null>(null);

  private readonly uniqueId: string = `form-field-${++formFieldId}`;
  private readonly generatedInputId: string = `${this.uniqueId}-input`;
  private readonly projectedControlElement: WritableSignal<
    HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement | null
  > = signal<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement | null>(null);
  public readonly inputId: Signal<string> = computed<string>(
    (): string => this.inputIdOverride() ?? this.generatedInputId
  );
  public readonly labelId: Signal<string> = computed<string>(
    (): string => `${this.uniqueId}-label`
  );
  public readonly errorId: Signal<string> = computed<string>(
    (): string => `${this.uniqueId}-error`
  );
  public readonly hintId: Signal<string> = computed<string>((): string => `${this.uniqueId}-hint`);
  public readonly invalid: Signal<boolean> = computed<boolean>(
    (): boolean => this.invalidOverride() || Boolean(this.error())
  );
  public readonly describedBy: Signal<string | null> = computed<string | null>(
    (): string | null => {
      const ids: string[] = [];
      if (this.hint()) {
        ids.push(this.hintId());
      }
      if (this.invalid() && this.error()) {
        ids.push(this.errorId());
      }

      return ids.length > 0 ? ids.join(' ') : null;
    }
  );
  public readonly showError: Signal<boolean> = computed<boolean>(
    (): boolean => this.invalid() && Boolean(this.error())
  );
  public readonly showHint: Signal<boolean> = computed<boolean>((): boolean =>
    Boolean(this.hint())
  );

  private previousError: string | null = null;

  constructor() {
    effect((): void => {
      const projectedControl: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement | null =
        this.resolveProjectedControl();

      if (projectedControl) {
        this.projectedControlElement.set(projectedControl);
      }
    });

    effect((): void => {
      const currentError: string | null = this.error();

      if (currentError && currentError !== this.previousError) {
        void this.liveAnnouncer.announceError(currentError);
      }

      this.previousError = currentError;
    });

    effect((): void => {
      const projectedControl: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement | null =
        this.projectedControlElement();
      if (!projectedControl) {
        return;
      }

      this.renderer.setAttribute(projectedControl, 'id', this.inputId());
      this.setOptionalAttribute(
        projectedControl,
        'aria-labelledby',
        this.label() ? this.labelId() : null
      );
      this.setOptionalAttribute(projectedControl, 'aria-describedby', this.describedBy());
      this.setOptionalAttribute(projectedControl, 'aria-invalid', this.invalid() ? 'true' : null);
      this.setOptionalAttribute(projectedControl, 'aria-required', this.required() ? 'true' : null);
      this.setOptionalAttribute(projectedControl, 'aria-disabled', this.disabled() ? 'true' : null);
      this.renderer.setProperty(projectedControl, 'required', this.required());

      if (this.disabled()) {
        this.renderer.setProperty(projectedControl, 'disabled', true);
      } else {
        this.renderer.setProperty(projectedControl, 'disabled', false);
        this.renderer.removeAttribute(projectedControl, 'disabled');
      }
    });
  }

  /**
   * Get the ID for aria-describedby
   */
  public get describedById(): string | null {
    return this.describedBy();
  }

  private resolveProjectedControl():
    | HTMLInputElement
    | HTMLSelectElement
    | HTMLTextAreaElement
    | null {
    return (this.hostElementRef.nativeElement as HTMLElement).querySelector(
      'input, select, textarea'
    );
  }

  private setOptionalAttribute(
    element: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement,
    attributeName: string,
    value: string | null
  ): void {
    if (value) {
      this.renderer.setAttribute(element, attributeName, value);
      return;
    }

    this.renderer.removeAttribute(element, attributeName);
  }
}
