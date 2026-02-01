import {
  Component, ChangeDetectionStrategy, input, computed, output, ViewEncapsulation
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Icon } from '../icon/icon';
import { SemanticIcon } from '../icon/icon.semantics';

export type CardVariant = 'material' | 'bootstrap' | 'minimal';
export type CardElevation = 'none' | 'low' | 'medium' | 'high';

@Component({
  selector: 'ui-lib-card',
  standalone: true,
  imports: [CommonModule, Icon],
  templateUrl: './card.html',
  styleUrl: './card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class Card {
  variant = input<CardVariant>('material');
  elevation = input<CardElevation>('medium');
  bordered = input<boolean>(false);
  hoverable = input<boolean>(false);
  showHeader = input<boolean | null>(null);
  showFooter = input<boolean | null>(null);
  shadow = input<string | null>(null);
  headerBg = input<string | null>(null);
  footerBg = input<string | null>(null);
  headerIcon = input<SemanticIcon | string | null>(null);
  closable = input<boolean>(false);
  subtitle = input<string | null>(null);

  closed = output<void>();

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

  onClose() {
    this.closed.emit();
  }
}
