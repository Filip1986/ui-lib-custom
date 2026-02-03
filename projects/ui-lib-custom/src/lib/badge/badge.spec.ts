import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { Badge, BadgeVariant, BadgeColor, BadgeSize } from './badge';
import { Component } from '@angular/core';

@Component({
  standalone: true,
  imports: [Badge],
  template: `
    <ui-lib-badge
      [variant]="variant"
      [color]="color"
      [size]="size"
      [pill]="pill"
      [dot]="dot"
      [label]="label"
    >
      {{ content }}
    </ui-lib-badge>
  `,
})
class TestHostComponent {
  variant: BadgeVariant = 'solid';
  color: BadgeColor = 'primary';
  size: BadgeSize = 'md';
  pill = false;
  dot = false;
  label: string | null = null;
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
    Object.assign(fixture.componentInstance, initial);
    fixture.detectChanges();
    const badgeElement: HTMLElement = fixture.nativeElement.querySelector('ui-lib-badge');
    const styles = getComputedStyle(badgeElement);
    return { fixture, badgeElement, styles };
  }

  it('should create', () => {
    const { badgeElement } = bootstrap();
    expect(badgeElement).toBeTruthy();
  });

  it('applies classes from inputs', () => {
    const { badgeElement } = bootstrap({
      variant: 'outline',
      color: 'danger',
      size: 'lg',
      pill: true,
    });
    expect(badgeElement.className).toContain('badge');
    expect(badgeElement.className).toContain('badge-variant-outline');
    expect(badgeElement.className).toContain('badge-color-danger');
    expect(badgeElement.className).toContain('badge-size-lg');
    expect(badgeElement.className).toContain('badge-pill');
  });

  it('uses solid variant styles by default', () => {
    const { styles } = bootstrap();
    expect(styles.backgroundColor).not.toBe('');
    expect(styles.borderWidth).toBe('0px');
  });

  it('uses outline variant styles', () => {
    const { styles } = bootstrap({ variant: 'outline' });
    expect(styles.borderWidth).toBe('1px');
    expect(styles.backgroundColor).toBe('rgba(0, 0, 0, 0)');
  });

  it('uses subtle variant styles', () => {
    const { styles } = bootstrap({ variant: 'subtle' });
    expect(styles.backgroundColor).not.toBe('rgba(0, 0, 0, 0)');
  });

  it('adjusts radius for pill and dot', () => {
    const pill = bootstrap({ pill: true }).styles;
    expect(pill.borderRadius).toBe('9999px');

    const dot = bootstrap({ dot: true, size: 'sm' }).styles;
    expect(dot.width).not.toBe('auto');
    expect(dot.fontSize).toBe('0px');
  });

  it('projects content', () => {
    const { badgeElement } = bootstrap({ content: 'Projected' });
    expect(badgeElement.textContent?.trim()).toBe('Projected');
  });

  it('sets aria attributes for dot badges', () => {
    const { badgeElement } = bootstrap({ dot: true, label: 'online' });
    expect(badgeElement.getAttribute('role')).toBe('status');
    expect(badgeElement.getAttribute('aria-label')).toBe('online');
  });
});
