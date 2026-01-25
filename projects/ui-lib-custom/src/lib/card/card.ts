import {
  Component, ChangeDetectionStrategy, input, computed
} from '@angular/core';
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
export class Card {
  variant = input<CardVariant>('material');
  elevation = input<CardElevation>('medium');
  bordered = input<boolean>(false);
  hoverable = input<boolean>(false);
  showHeader = input<boolean | null>(null);
  showFooter = input<boolean | null>(null);
  shadow = input<string | null>(null);

  headerVisible = computed(() => this.showHeader() !== false);
  footerVisible = computed(() => this.showFooter() !== false);

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
