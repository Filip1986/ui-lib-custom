import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JsonPipe } from '@angular/common';
import { Rating } from 'ui-lib-custom/rating';
import type { RatingChangeEvent } from 'ui-lib-custom/rating';

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
  // ── Basic ──────────────────────────────────────────────────────────────────
  public basicRating: number | null = null;
  public lastEvent: RatingChangeEvent | null = null;

  // ── Pre-selected ───────────────────────────────────────────────────────────
  public preselectedRating: number | null = 3;

  // ── No cancel ─────────────────────────────────────────────────────────────
  public noCancelRating: number | null = 2;

  // ── Readonly ───────────────────────────────────────────────────────────────
  public readonlyRating: number | null = 4;

  // ── Disabled ───────────────────────────────────────────────────────────────
  public disabledRating: number | null = 2;

  // ── Star count ────────────────────────────────────────────────────────────
  public tenStarRating: number | null = 7;

  // ── Reactive form ─────────────────────────────────────────────────────────
  public readonly reviewForm: FormGroup = new FormGroup({
    quality: new FormControl<number | null>(null),
    support: new FormControl<number | null>(3),
  });

  public onRatingChange(event: RatingChangeEvent): void {
    this.lastEvent = event;
  }
}
