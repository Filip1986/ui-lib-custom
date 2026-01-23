import { Component, Input, ContentChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';

export type CardVariant = 'material' | 'bootstrap' | 'minimal';
export type CardElevation = 'none' | 'low' | 'medium' | 'high';

@Component({
  selector: 'uilib-card',
  imports: [CommonModule],
  templateUrl: './card.html',
  styleUrl: './card.scss',
})
export class Card {
  @Input() variant: CardVariant = 'material';
  @Input() elevation: CardElevation = 'medium';
  @Input() bordered: boolean = false;
  @Input() hoverable: boolean = false;

  @ContentChild('[card-header]') header?: ElementRef;
  @ContentChild('[card-footer]') footer?: ElementRef;

  get hasHeader(): boolean {
    return !!this.header;
  }

  get hasFooter(): boolean {
    return !!this.footer;
  }

  get cardClasses(): string {
    return `card card-${this.variant} card-elevation-${this.elevation} ${this.bordered ? 'card-bordered' : ''} ${this.hoverable ? 'card-hoverable' : ''}`;
  }
}
