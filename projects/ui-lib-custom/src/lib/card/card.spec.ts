import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { Card, CardVariant, CardElevation } from './card';

@Component({
  standalone: true,
  imports: [Card],
  template: `
    <ui-lib-card
      [variant]="variant"
      [elevation]="elevation"
      [bordered]="bordered"
      [hoverable]="hoverable"
    >
      <div card-header>Header</div>
      Body
      <div card-footer>Footer</div>
    </ui-lib-card>
  `,
})
class CardHost {
  variant: CardVariant = 'material';
  elevation: CardElevation = 'medium';
  bordered = true;
  hoverable = false;
}

describe('Card', () => {
  async function bootstrap(initial?: Partial<CardHost>) {
    await TestBed.configureTestingModule({ imports: [CardHost] }).compileComponents();
    const fixture: ComponentFixture<CardHost> = TestBed.createComponent(CardHost);
    Object.assign(fixture.componentInstance, initial);
    fixture.detectChanges();
    return fixture;
  }

  const getCard = (fixture: ComponentFixture<CardHost>): HTMLElement => fixture.nativeElement.querySelector('.card');

  it('should create', async () => {
    const fixture = await bootstrap();
    expect(getCard(fixture)).toBeTruthy();
  });

  it('applies variant, elevation, and bordered classes', async () => {
    const fixture = await bootstrap({ variant: 'bootstrap', elevation: 'high', hoverable: true });
    const card = getCard(fixture);
    expect(card.className).toContain('card-bootstrap');
    expect(card.className).toContain('card-elevation-high');
    expect(card.className).toContain('card-bordered');
    expect(card.className).toContain('card-hoverable');
  });

  it('projects header and footer slots', async () => {
    const fixture = await bootstrap();
    if (fixture.whenRenderingDone) {
      await fixture.whenRenderingDone();
    }
    await fixture.whenStable();
    fixture.detectChanges();

    const text = fixture.nativeElement.textContent || '';
    expect(text).toContain('Header');
    expect(text).toContain('Footer');
  });
});
