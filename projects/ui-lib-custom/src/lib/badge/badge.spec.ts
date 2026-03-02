import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { Badge, BadgeVariant, BadgeColor, BadgeSize } from './badge';
import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
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
  public variant: BadgeVariant = 'solid';
  public color: BadgeColor = 'primary';
  public size: BadgeSize = 'md';
  public pill = false;
  public dot = false;
  public label: string | null = null;
  public content = 'Badge';
}

describe('Badge', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();
  });

  function bootstrap(initial?: Partial<TestHostComponent>): {
    fixture: ComponentFixture<TestHostComponent>;
    badgeElement: HTMLElement;
    styles: CSSStyleDeclaration;
  } {
    const fixture: ComponentFixture<TestHostComponent> = TestBed.createComponent(TestHostComponent);
    Object.assign(fixture.componentInstance, initial);
    fixture.detectChanges();
    const badgeElement: HTMLElement = (fixture.nativeElement as HTMLElement).querySelector(
      'ui-lib-badge'
    ) as HTMLElement;
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
    const shapeBase: string = getComputedStyle(document.documentElement)
      .getPropertyValue('--uilib-shape-base')
      .trim();
    const expectedRadius: string = shapeBase || '6px';

    const pill = bootstrap({ pill: true }).styles;
    expect(pill.borderRadius).toBe(expectedRadius);

    const dot = bootstrap({ dot: true, size: 'sm' }).styles;
    expect(dot.borderRadius).toBe(expectedRadius);
    expect(dot.width).not.toBe('auto');
    expect(dot.fontSize).toBe('0px');
  });

  it('projects content', () => {
    const { badgeElement } = bootstrap({ content: 'Projected' });
    const text = badgeElement.textContent;
    expect(text).toBeTruthy();
    expect((text as string).trim()).toBe('Projected');
  });

  it('sets aria attributes for dot badges', () => {
    const { badgeElement } = bootstrap({ dot: true, label: 'online' });
    expect(badgeElement.getAttribute('role')).toBe('status');
    expect(badgeElement.getAttribute('aria-label')).toBe('online');
  });

  it('applies each color class', () => {
    const colors: BadgeColor[] = [
      'primary',
      'secondary',
      'success',
      'danger',
      'warning',
      'info',
      'neutral',
    ];

    colors.forEach((color: BadgeColor): void => {
      const { badgeElement } = bootstrap({ color });
      expect(badgeElement.className).toContain(`badge-color-${color}`);
    });
  });

  it('applies each size class', () => {
    const sizes: BadgeSize[] = ['sm', 'md', 'lg'];

    sizes.forEach((size: BadgeSize): void => {
      const { badgeElement } = bootstrap({ size });
      expect(badgeElement.className).toContain(`badge-size-${size}`);
    });
  });

  it('renders dot mode without text content', () => {
    const { badgeElement, styles } = bootstrap({ dot: true, label: 'status' });
    expect(badgeElement.className).toContain('badge-dot');
    expect(styles.fontSize).toBe('0px');
  });

  it('applies dark theme variables', () => {
    const root: HTMLElement = document.documentElement;
    root.setAttribute('data-theme', 'light');
    const scope: HTMLDivElement = document.createElement('div');
    document.body.appendChild(scope);
    scope.setAttribute('data-theme', 'light');
    const light: string = getComputedStyle(scope).getPropertyValue('--uilib-badge-bg').trim();

    scope.setAttribute('data-theme', 'dark');
    const dark: string = getComputedStyle(scope).getPropertyValue('--uilib-badge-bg').trim();

    expect(dark).not.toBe(light);
    scope.remove();
    root.removeAttribute('data-theme');
  });
});
