import {
  ChangeDetectionStrategy,
  Component,
  effect,
  input,
  inject,
  ViewEncapsulation,
  type InputSignal,
} from '@angular/core';
import { LiveAnnouncerService } from 'ui-lib-custom/a11y';

let formFieldId: number = 0;

/**
 * Wrapper component that handles error announcements for any form control
 */
@Component({
  selector: 'ui-lib-form-field',
  standalone: true,
  templateUrl: './form-field.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class FormField {
  private readonly liveAnnouncer: LiveAnnouncerService = inject(LiveAnnouncerService);

  public readonly error: InputSignal<string | null> = input<string | null>(null);
  public readonly hint: InputSignal<string | null> = input<string | null>(null);

  private readonly uniqueId: string = `form-field-${++formFieldId}`;
  public readonly errorId: string = `${this.uniqueId}-error`;
  public readonly hintId: string = `${this.uniqueId}-hint`;

  private previousError: string | null = null;

  constructor() {
    effect((): void => {
      const currentError: string | null = this.error();

      if (currentError && currentError !== this.previousError) {
        void this.liveAnnouncer.announceError(currentError);
      }

      this.previousError = currentError;
    });
  }

  /**
   * Get the ID for aria-describedby
   */
  public get describedById(): string | null {
    if (this.error()) return this.errorId;
    if (this.hint()) return this.hintId;
    return null;
  }
}
