import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Badge } from './badge';
import { Component } from '@angular/core';

@Component({
  standalone: true,
  imports: [Badge],
  template: `
    <uilib-badge
      [variant]="variant"
      [color]="color"
      [size]="size"
      [pill]="pill"
      [dot]="dot">
      {{ content }}
    </uilib-badge>
  `,
})
class TestHostComponent {
  variant: any = 'solid';
  color: any = 'primary';
  size: any = 'md';
  pill = false;
  dot = false;
  content = 'Badge';
}

describe('Badge', () => {
  let component: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;
  let badgeElement: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    badgeElement = fixture.nativeElement.querySelector('uilib-badge');
  });

  it('should create', () => {
    expect(badgeElement).toBeTruthy();
  });

  it('should render as inline-flex', () => {
    expect(badgeElement.style.display).toBe('inline-flex');
  });

  it('should render solid variant by default', () => {
    expect(badgeElement.style.backgroundColor).toBeTruthy();
    expect(badgeElement.style.border).toBe('none');
  });

  it('should render outline variant', () => {
    component.variant = 'outline';
    fixture.detectChanges();
    expect(badgeElement.style.backgroundColor).toBe('transparent');
    expect(badgeElement.style.border).toContain('1px solid');
  });

  it('should render subtle variant', () => {
    component.variant = 'subtle';
    fixture.detectChanges();
    expect(badgeElement.style.backgroundColor).toBeTruthy();
    expect(badgeElement.style.backgroundColor).not.toBe('transparent');
  });

  it('should apply different colors', () => {
    const colors = ['primary', 'success', 'danger', 'warning', 'info'];
    colors.forEach(color => {
      component.color = color as any;
      fixture.detectChanges();
      expect(badgeElement.style.backgroundColor).toBeTruthy();
    });
  });

  it('should apply different sizes', () => {
    const initialFontSize = badgeElement.style.fontSize;

    component.size = 'sm';
    fixture.detectChanges();
    const smallFontSize = badgeElement.style.fontSize;

    component.size = 'lg';
    fixture.detectChanges();
    const largeFontSize = badgeElement.style.fontSize;

    expect(smallFontSize).toBeTruthy();
    expect(largeFontSize).toBeTruthy();
  });

  it('should render as pill when pill is true', () => {
    component.pill = true;
    fixture.detectChanges();
    expect(badgeElement.style.borderRadius).toBe('9999px');
  });

  it('should render as dot when dot is true', () => {
    component.dot = true;
    component.content = '';
    fixture.detectChanges();
    expect(badgeElement.style.borderRadius).toBe('9999px');
    expect(badgeElement.style.minWidth).toBeTruthy();
  });

  it('should project content', () => {
    expect(badgeElement.textContent?.trim()).toBe('Badge');
  });

  it('should apply white text color for solid variant', () => {
    component.variant = 'solid';
    fixture.detectChanges();
    expect(badgeElement.style.color).toContain('rgb(255, 255, 255)');
  });

  it('should apply colored text for outline variant', () => {
    component.variant = 'outline';
    fixture.detectChanges();
    expect(badgeElement.style.color).toBeTruthy();
    expect(badgeElement.style.color).not.toContain('rgb(255, 255, 255)');
  });
});
