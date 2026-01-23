import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
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
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();
  });

  function bootstrap(initial?: Partial<TestHostComponent>) {
    const fixture: ComponentFixture<TestHostComponent> = TestBed.createComponent(TestHostComponent);
    const component = fixture.componentInstance;
    Object.assign(component, initial);
    fixture.detectChanges();
    const badgeElement: HTMLElement = fixture.nativeElement.querySelector('uilib-badge');
    return { fixture, component, badgeElement };
  }

  it('should create', () => {
    const { badgeElement } = bootstrap();
    expect(badgeElement).toBeTruthy();
  });

  it('should render as inline-flex', () => {
    const { badgeElement } = bootstrap();
    expect(badgeElement.style.display).toBe('inline-flex');
  });

  it('should render solid variant by default', () => {
    const { badgeElement } = bootstrap();
    expect(badgeElement.style.backgroundColor).toBeTruthy();
    expect(badgeElement.style.border).toBe('none');
  });

  it('should render outline variant', () => {
    const { badgeElement } = bootstrap({ variant: 'outline' });
    expect(badgeElement.style.backgroundColor).toBe('transparent');
    expect(badgeElement.style.border).toContain('1px solid');
  });

  it('should render subtle variant', () => {
    const { badgeElement } = bootstrap({ variant: 'subtle' });
    expect(badgeElement.style.backgroundColor).toBeTruthy();
    expect(badgeElement.style.backgroundColor).not.toBe('transparent');
  });

  it('should apply different colors', () => {
    const colors = ['primary', 'success', 'danger', 'warning', 'info'];
    colors.forEach(color => {
      const { badgeElement } = bootstrap({ color: color as any });
      expect(badgeElement.style.backgroundColor).toBeTruthy();
    });
  });

  it('should apply different sizes', () => {
    const { badgeElement: small } = bootstrap({ size: 'sm' });
    const { badgeElement: large } = bootstrap({ size: 'lg' });

    expect(small.style.fontSize).toBeTruthy();
    expect(large.style.fontSize).toBeTruthy();
  });

  it('should render as pill when pill is true', () => {
    const { badgeElement } = bootstrap({ pill: true });
    expect(badgeElement.style.borderRadius).toBe('9999px');
  });

  it('should render as dot when dot is true', () => {
    const { badgeElement } = bootstrap({ dot: true, content: '' });
    expect(badgeElement.style.borderRadius).toBe('9999px');
    expect(badgeElement.style.minWidth).toBeTruthy();
  });

  it('should project content', () => {
    const { badgeElement } = bootstrap();
    expect(badgeElement.textContent?.trim()).toBe('Badge');
  });

  it('should apply white text color for solid variant', () => {
    const { badgeElement } = bootstrap({ variant: 'solid' });
    expect(badgeElement.style.color).toContain('rgb(255, 255, 255)');
  });

  it('should apply colored text for outline variant', () => {
    const { badgeElement } = bootstrap({ variant: 'outline' });
    expect(badgeElement.style.color).toBeTruthy();
    expect(badgeElement.style.color).not.toContain('rgb(255, 255, 255)');
  });
});
