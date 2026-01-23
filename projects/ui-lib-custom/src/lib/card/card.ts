import { Component, ChangeDetectionStrategy, input, ContentChild, ElementRef, computed, AfterContentInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';

export type CardVariant = 'material' | 'bootstrap' | 'minimal';
export type CardElevation = 'none' | 'low' | 'medium' | 'high';

@Component({
  selector: 'ui-lib-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card.html',
  styleUrl: './card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Card implements AfterContentInit {
  variant = input<CardVariant>('material');
  elevation = input<CardElevation>('medium');
  bordered = input<boolean>(false);
  hoverable = input<boolean>(false);

  @ContentChild('[card-header]', { static: true }) header?: ElementRef;
  @ContentChild('[card-footer]', { static: true }) footer?: ElementRef;

  constructor(private cdr: ChangeDetectorRef) {}

  ngAfterContentInit(): void {
    this.cdr.markForCheck();
  }

  get hasHeader(): boolean { return !!this.header; }
  get hasFooter(): boolean { return !!this.footer; }

  cardClasses = computed(() => {
    const classes = [
      'card',
      `card-${this.variant()}`,
      `card-elevation-${this.elevation()}`,
    ];

    if (this.bordered()) {
      classes.push('card-bordered');
    }

    if (this.hoverable()) {
      classes.push('card-hoverable');
    }

    return classes.join(' ');
  });
}
