import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JsonPipe } from '@angular/common';
import { Rating } from 'ui-lib-custom/rating';
import type { RatingChangeEvent, RatingRateEvent } from 'ui-lib-custom/rating';

/**
 * Demo page for the Rating component.
 */
@Component({
  selector: 'app-rating-demo',
  standalone: true,
  imports: [Rating, FormsModule, ReactiveFormsModule, JsonPipe],
  templateUrl: './rating-demo.component.html',
  styleUrl: './rating-demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RatingDemoComponent {
  // ── Basic ──────────────────────────────────────────────
  public basicRating: number | null = null;
  public lastEvent: RatingChangeEvent | null = null;

  // ── Pre-selected ──────────────────────────────────────────
  public preselectedRating: number | null = 3;

  // ── No cancel ─────────────────────────────────────────────
  public noCancelRating: number | null = 2;

  // ── Readonly ───────────────────────────────────────────────
  public readonlyRating: number | null = 4;

  // ── Disabled ───────────────────────────────────────────────
  public disabledRating: number | null = 2;

  // ── Star count ────────────────────────────────────────────
  public tenStarRating: number | null = 7;

  // ── Events (rate / cleared / focus / blur) ────────────────────
  public eventsRating: number | null = null;
  public eventLog: string[] = [];

  // ── Custom icon templates ─────────────────────────────
  public customTemplateRating: number | null = 3;

  // ── Inline styles ──────────────────────────────────────
  public styledRating: number | null = 3;
  public readonly iconOnStyle: Record<string, string> = { color: '#e91e63', fontSize: '2rem' };
  public readonly iconOffStyle: Record<string, string> = { color: '#f8bbd0', fontSize: '2rem' };

  // ── Reactive form ─────────────────────────────────────
  public readonly reviewForm: FormGroup = new FormGroup({
    quality: new FormControl<number | null>(null),
    support: new FormControl<number | null>(3),
  });

  public onRatingChange(event: RatingChangeEvent): void {
    this.lastEvent = event;
  }

  public onRateEvent(event: RatingRateEvent): void {
    this.eventLog = [`rate: value=${event.value}`, ...this.eventLog].slice(0, 5);
  }

  public onCancelEvent(): void {
    this.eventLog = ['cleared: rating cleared', ...this.eventLog].slice(0, 5);
  }

  public onFocusEvent(): void {
    this.eventLog = ['focus: star focused', ...this.eventLog].slice(0, 5);
  }

  public onBlurEvent(): void {
    this.eventLog = ['blur: star blurred', ...this.eventLog].slice(0, 5);
  }
}
