import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Card, CardVariant, CardElevation } from './card';

@Component({
  standalone: true,
  imports: [Card],
  template: `
    <uilib-card
      [variant]="variant"
      [elevation]="elevation"
      [bordered]="bordered"
      [hoverable]="hoverable"
    >
      <div card-header>Header</div>
      Body
      <div card-footer>Footer</div>
    </uilib-card>
  `,
})
class CardHost {
  variant: CardVariant = 'material';
  elevation: CardElevation = 'medium';
  bordered = true;
  hoverable = false;
}

describe('Card', () => {
  let fixture: ComponentFixture<CardHost>;
  let host: CardHost;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardHost]
    }).compileComponents();

    fixture = TestBed.createComponent(CardHost);
    host = fixture.componentInstance;
    fixture.detectChanges();
  });

  const getCard = (): HTMLElement => fixture.nativeElement.querySelector('.card');

  it('should create', () => {
    expect(getCard()).toBeTruthy();
  });

  it('applies variant, elevation, and bordered classes', () => {
    host.variant = 'bootstrap';
    host.elevation = 'high';
    host.hoverable = true;
    fixture.detectChanges();

    const card = getCard();
    expect(card.className).toContain('card-bootstrap');
    expect(card.className).toContain('card-elevation-high');
    expect(card.className).toContain('card-bordered');
    expect(card.className).toContain('card-hoverable');
  });

  it('projects header and footer slots', () => {
    const header = fixture.nativeElement.querySelector('.card-header');
    const footer = fixture.nativeElement.querySelector('.card-footer');

    expect(header?.textContent?.trim()).toBe('Header');
    expect(footer?.textContent?.trim()).toBe('Footer');
  });
});
