import {
  ChangeDetectionStrategy,
  Component,
  provideZonelessChangeDetection,
  signal,
  type Type,
  type WritableSignal,
} from '@angular/core';
import { TestBed } from '@angular/core/testing';
import type { ComponentFixture } from '@angular/core/testing';
import { Badge } from './badge';
import type { BadgeColor, BadgeSize, BadgeVariant } from './badge';
import { checkA11y, SKIP_COLOR_CONTRAST_RULES } from '../../test/a11y-utils';

@Component({
  standalone: true,
  imports: [Badge],
  template: `
    <ui-lib-badge
      [dot]="dot()"
      [decorative]="decorative()"
      [label]="label()"
      [color]="color()"
      [size]="size()"
      [variant]="variant()"
    >
      {{ value() }}
    </ui-lib-badge>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class BadgeA11yHostComponent {
  public readonly value: WritableSignal<string> = signal<string>('7');
  public readonly dot: WritableSignal<boolean> = signal<boolean>(false);
  public readonly decorative: WritableSignal<boolean> = signal<boolean>(false);
  public readonly label: WritableSignal<string | null> = signal<string | null>(null);
  public readonly color: WritableSignal<BadgeColor> = signal<BadgeColor>('primary');
  public readonly size: WritableSignal<BadgeSize> = signal<BadgeSize>('md');
  public readonly variant: WritableSignal<BadgeVariant | null> = signal<BadgeVariant | null>(null);
}

@Component({
  standalone: true,
  imports: [Badge],
  template: `
    <ui-lib-badge>8</ui-lib-badge>
    <ui-lib-badge color="success">9</ui-lib-badge>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class BadgeA11yMultipleHostComponent {}

describe('Badge Accessibility', (): void => {
  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({
      imports: [BadgeA11yHostComponent, BadgeA11yMultipleHostComponent],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();
  });

  async function createFixture<T>(component: Type<T>): Promise<ComponentFixture<T>> {
    const fixture: ComponentFixture<T> = TestBed.createComponent(component);
    document.body.appendChild(fixture.nativeElement);
    fixture.detectChanges();
    await fixture.whenStable();
    return fixture;
  }

  function getBadgeElement(fixture: ComponentFixture<unknown>): HTMLElement {
    return (fixture.nativeElement as HTMLElement).querySelector('ui-lib-badge') as HTMLElement;
  }

  function removeFixture(fixture: ComponentFixture<unknown>): void {
    (fixture.nativeElement as HTMLElement).remove();
    fixture.destroy();
  }

  it('renders the badge host element', async (): Promise<void> => {
    const fixture: ComponentFixture<BadgeA11yHostComponent> =
      await createFixture(BadgeA11yHostComponent);
    expect(getBadgeElement(fixture)).toBeTruthy();
    removeFixture(fixture);
  });

  it('does not set a live role for non-dot badges', async (): Promise<void> => {
    const fixture: ComponentFixture<BadgeA11yHostComponent> =
      await createFixture(BadgeA11yHostComponent);
    const badgeElement: HTMLElement = getBadgeElement(fixture);
    expect(badgeElement.getAttribute('role')).toBeNull();
    expect(badgeElement.getAttribute('aria-live')).toBeNull();
    removeFixture(fixture);
  });

  it('sets status live-region attributes for informative dot badges', async (): Promise<void> => {
    const fixture: ComponentFixture<BadgeA11yHostComponent> =
      await createFixture(BadgeA11yHostComponent);
    fixture.componentInstance.dot.set(true);
    fixture.componentInstance.color.set('success');
    fixture.detectChanges();

    const badgeElement: HTMLElement = getBadgeElement(fixture);
    expect(badgeElement.getAttribute('role')).toBe('status');
    expect(badgeElement.getAttribute('aria-live')).toBe('polite');
    expect(badgeElement.getAttribute('aria-atomic')).toBe('true');
    removeFixture(fixture);
  });

  it('falls back to i18n status-indicator label for unlabelled dot badges', async (): Promise<void> => {
    const fixture: ComponentFixture<BadgeA11yHostComponent> =
      await createFixture(BadgeA11yHostComponent);
    fixture.componentInstance.dot.set(true);
    fixture.componentInstance.color.set('warning');
    fixture.detectChanges();

    expect(getBadgeElement(fixture).getAttribute('aria-label')).toBe('Status indicator');
    removeFixture(fixture);
  });

  it('passes through explicit aria-label for informational badges', async (): Promise<void> => {
    const fixture: ComponentFixture<BadgeA11yHostComponent> =
      await createFixture(BadgeA11yHostComponent);
    fixture.componentInstance.label.set('Unread notifications');
    fixture.detectChanges();

    expect(getBadgeElement(fixture).getAttribute('aria-label')).toBe('Unread notifications');
    removeFixture(fixture);
  });

  it('marks decorative badges as aria-hidden', async (): Promise<void> => {
    const fixture: ComponentFixture<BadgeA11yHostComponent> =
      await createFixture(BadgeA11yHostComponent);
    fixture.componentInstance.dot.set(true);
    fixture.componentInstance.decorative.set(true);
    fixture.componentInstance.label.set('Hidden from assistive tech');
    fixture.detectChanges();

    const badgeElement: HTMLElement = getBadgeElement(fixture);
    expect(badgeElement.getAttribute('aria-hidden')).toBe('true');
    expect(badgeElement.getAttribute('role')).toBeNull();
    expect(badgeElement.getAttribute('aria-label')).toBeNull();
    removeFixture(fixture);
  });

  it('exposes projected badge value to assistive technologies for informational badges', async (): Promise<void> => {
    const fixture: ComponentFixture<BadgeA11yHostComponent> =
      await createFixture(BadgeA11yHostComponent);
    fixture.componentInstance.value.set('12');
    fixture.componentInstance.decorative.set(false);
    fixture.detectChanges();

    const badgeElement: HTMLElement = getBadgeElement(fixture);
    expect((badgeElement.textContent as string).trim()).toBe('12');
    expect(badgeElement.getAttribute('aria-hidden')).toBeNull();
    removeFixture(fixture);
  });

  it('assigns unique ids to each badge instance', async (): Promise<void> => {
    const fixture: ComponentFixture<BadgeA11yMultipleHostComponent> = await createFixture(
      BadgeA11yMultipleHostComponent,
    );
    const badgeElements: HTMLElement[] = Array.from(
      (fixture.nativeElement as HTMLElement).querySelectorAll('ui-lib-badge'),
    );
    expect(badgeElements.length).toBe(2);
    const ids: string[] = badgeElements
      .map((badgeElement: HTMLElement): string => badgeElement.id)
      .filter((id: string): boolean => id.length > 0);
    expect(ids.length).toBe(2);
    expect(new Set(ids).size).toBe(2);
    removeFixture(fixture);
  });

  it('is not keyboard-focusable by default', async (): Promise<void> => {
    const fixture: ComponentFixture<BadgeA11yHostComponent> =
      await createFixture(BadgeA11yHostComponent);
    const badgeElement: HTMLElement = getBadgeElement(fixture);
    expect(badgeElement.tabIndex).toBe(-1);
    removeFixture(fixture);
  });

  it('has no axe violations in default state', async (): Promise<void> => {
    const fixture: ComponentFixture<BadgeA11yHostComponent> =
      await createFixture(BadgeA11yHostComponent);
    await checkA11y(fixture, { rules: SKIP_COLOR_CONTRAST_RULES });
    removeFixture(fixture);
  });

  it('has no axe violations in informative dot status state', async (): Promise<void> => {
    const fixture: ComponentFixture<BadgeA11yHostComponent> =
      await createFixture(BadgeA11yHostComponent);
    fixture.componentInstance.dot.set(true);
    fixture.componentInstance.label.set('System online');
    fixture.detectChanges();

    await checkA11y(fixture, { rules: SKIP_COLOR_CONTRAST_RULES });
    removeFixture(fixture);
  });

  it('has no axe violations in decorative state', async (): Promise<void> => {
    const fixture: ComponentFixture<BadgeA11yHostComponent> =
      await createFixture(BadgeA11yHostComponent);
    fixture.componentInstance.decorative.set(true);
    fixture.componentInstance.dot.set(true);
    fixture.detectChanges();

    await checkA11y(fixture, { rules: SKIP_COLOR_CONTRAST_RULES });
    removeFixture(fixture);
  });
});
