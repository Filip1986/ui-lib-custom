import { ChangeDetectionStrategy, Component, effect, input, inject } from '@angular/core';
import { LiveAnnouncerService } from 'ui-lib-custom/a11y';

let formFieldId = 0;

/**
 * Wrapper component that handles error announcements for any form control
 */
@Component({
  selector: 'ui-lib-form-field',
  standalone: true,
  template: `
    <div class="ui-form-field" [class.ui-form-field--error]="error()">
      <ng-content></ng-content>

      @if (error()) {
        <div [id]="errorId" class="ui-form-field-error" role="alert" aria-live="assertive">
          {{ error() }}
        </div>
      }

      @if (hint() && !error()) {
        <div [id]="hintId" class="ui-form-field-hint">
          {{ hint() }}
        </div>
      }
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormField {
  private readonly liveAnnouncer = inject(LiveAnnouncerService);

  error = input<string | null>(null);
  hint = input<string | null>(null);

  private readonly uniqueId: string = `form-field-${++formFieldId}`;
  readonly errorId: string = `${this.uniqueId}-error`;
  readonly hintId: string = `${this.uniqueId}-hint`;

  private previousError: string | null = null;

  constructor() {
    effect((): void => {
      const currentError: string | null = this.error();

      if (currentError && currentError !== this.previousError) {
        this.liveAnnouncer.announceError(currentError);
      }

      this.previousError = currentError;
    });
  }

  /**
   * Get the ID for aria-describedby
   */
  get describedById(): string | null {
    if (this.error()) return this.errorId;
    if (this.hint()) return this.hintId;
    return null;
  }
}
