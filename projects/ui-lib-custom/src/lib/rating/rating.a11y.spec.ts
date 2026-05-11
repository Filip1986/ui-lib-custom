import {
  ChangeDetectionStrategy,
  Component,
  provideZonelessChangeDetection,
  signal,
} from '@angular/core';
import type { WritableSignal } from '@angular/core';
import type { ComponentFixture } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';
import { checkA11y, SKIP_COLOR_CONTRAST_RULES } from '../../test/a11y-utils';
import { Rating } from './rating';

// ── Host component ────────────────────────────────────────────────────────────

@Component({
  standalone: true,
  imports: [Rating],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ui-lib-rating
      [stars]="stars()"
      [cancel]="cancel()"
      [disabled]="disabled()"
      [readonly]="readonly()"
      [ariaLabel]="ariaLabel()"
      [(value)]="value"
    />
  `,
})
class RatingA11yHostComponent {
  public readonly value: WritableSignal<number | null> = signal<number | null>(null);
  public readonly stars: WritableSignal<number> = signal<number>(5);
  public readonly cancel: WritableSignal<boolean> = signal<boolean>(true);
  public readonly disabled: WritableSignal<boolean> = signal<boolean>(false);
  public readonly readonly: WritableSignal<boolean> = signal<boolean>(false);
  public readonly ariaLabel: WritableSignal<string> = signal<string>('Rate this item');
}

// ── Helpers ───────────────────────────────────────────────────────────────────

async function createFixture(): Promise<ComponentFixture<RatingA11yHostComponent>> {
  await TestBed.configureTestingModule({
    imports: [RatingA11yHostComponent],
    providers: [provideZonelessChangeDetection()],
  }).compileComponents();
  const fixture: ComponentFixture<RatingA11yHostComponent> =
    TestBed.createComponent(RatingA11yHostComponent);
  document.body.appendChild(fixture.nativeElement);
  fixture.detectChanges();
  await fixture.whenStable();
  fixture.detectChanges();
  return fixture;
}

function getHost(fixture: ComponentFixture<RatingA11yHostComponent>): HTMLElement {
  const host: HTMLElement | null = (fixture.nativeElement as HTMLElement).querySelector(
    'ui-lib-rating'
  );
  if (!host) {
    throw new Error('Expected ui-lib-rating host element');
  }
  return host;
}

function getStars(fixture: ComponentFixture<RatingA11yHostComponent>): HTMLElement[] {
  return Array.from(
    (fixture.nativeElement as HTMLElement).querySelectorAll<HTMLElement>('.ui-lib-rating__star')
  );
}

function getCancelButton(fixture: ComponentFixture<RatingA11yHostComponent>): HTMLElement | null {
  return (fixture.nativeElement as HTMLElement).querySelector('.ui-lib-rating__cancel');
}

function dispatchKey(element: HTMLElement, key: string): void {
  element.dispatchEvent(new KeyboardEvent('keydown', { key, bubbles: true }));
}

// ── Tests ─────────────────────────────────────────────────────────────────────

describe('Rating Accessibility', (): void => {
  afterEach((): void => {
    const el: HTMLElement | null = document.body.querySelector(
      '[data-testid="rating-a11y-fixture"]'
    );
    if (el) {
      el.remove();
    }
  });

  // ── 1. Interactive mode — Pattern A: radiogroup ───────────────────────────

  describe('interactive mode (Pattern A: radiogroup)', (): void => {
    it('host has role="radiogroup"', async (): Promise<void> => {
      const fixture: ComponentFixture<RatingA11yHostComponent> = await createFixture();
      expect(getHost(fixture).getAttribute('role')).toBe('radiogroup');
    });

    it('host aria-label reflects ariaLabel input', async (): Promise<void> => {
      const fixture: ComponentFixture<RatingA11yHostComponent> = await createFixture();
      expect(getHost(fixture).getAttribute('aria-label')).toBe('Rate this item');
    });

    it('each star has role="radio"', async (): Promise<void> => {
      const fixture: ComponentFixture<RatingA11yHostComponent> = await createFixture();
      const stars: HTMLElement[] = getStars(fixture);
      expect(stars.length).toBe(5);
      stars.forEach((star: HTMLElement): void => {
        expect(star.getAttribute('role')).toBe('radio');
      });
    });

    it('each star has aria-checked="false" when no value is selected', async (): Promise<void> => {
      const fixture: ComponentFixture<RatingA11yHostComponent> = await createFixture();
      getStars(fixture).forEach((star: HTMLElement): void => {
        expect(star.getAttribute('aria-checked')).toBe('false');
      });
    });

    it('selected star has aria-checked="true"; others have aria-checked="false"', async (): Promise<void> => {
      const fixture: ComponentFixture<RatingA11yHostComponent> = await createFixture();
      fixture.componentInstance.value.set(3);
      fixture.detectChanges();
      const stars: HTMLElement[] = getStars(fixture);
      expect(stars[2]!.getAttribute('aria-checked')).toBe('true');
      expect(stars[0]!.getAttribute('aria-checked')).toBe('false');
      expect(stars[4]!.getAttribute('aria-checked')).toBe('false');
    });

    it('each star has aria-label with "N of M" format', async (): Promise<void> => {
      const fixture: ComponentFixture<RatingA11yHostComponent> = await createFixture();
      const stars: HTMLElement[] = getStars(fixture);
      expect(stars[0]!.getAttribute('aria-label')).toBe('1 of 5');
      expect(stars[2]!.getAttribute('aria-label')).toBe('3 of 5');
      expect(stars[4]!.getAttribute('aria-label')).toBe('5 of 5');
    });

    it('each star has aria-posinset and aria-setsize', async (): Promise<void> => {
      const fixture: ComponentFixture<RatingA11yHostComponent> = await createFixture();
      const stars: HTMLElement[] = getStars(fixture);
      stars.forEach((star: HTMLElement, index: number): void => {
        expect(star.getAttribute('aria-posinset')).toBe(String(index + 1));
        expect(star.getAttribute('aria-setsize')).toBe('5');
      });
    });

    it('first star has tabindex="0" when no value is selected', async (): Promise<void> => {
      const fixture: ComponentFixture<RatingA11yHostComponent> = await createFixture();
      const stars: HTMLElement[] = getStars(fixture);
      expect(stars[0]!.getAttribute('tabindex')).toBe('0');
      expect(stars[1]!.getAttribute('tabindex')).toBe('-1');
    });

    it('selected star has tabindex="0"; all other stars have tabindex="-1"', async (): Promise<void> => {
      const fixture: ComponentFixture<RatingA11yHostComponent> = await createFixture();
      fixture.componentInstance.value.set(3);
      fixture.detectChanges();
      const stars: HTMLElement[] = getStars(fixture);
      expect(stars[2]!.getAttribute('tabindex')).toBe('0');
      expect(stars[0]!.getAttribute('tabindex')).toBe('-1');
      expect(stars[4]!.getAttribute('tabindex')).toBe('-1');
    });

    it('ArrowRight selects next star', async (): Promise<void> => {
      const fixture: ComponentFixture<RatingA11yHostComponent> = await createFixture();
      fixture.componentInstance.value.set(2);
      fixture.detectChanges();
      dispatchKey(getHost(fixture), 'ArrowRight');
      fixture.detectChanges();
      expect(fixture.componentInstance.value()).toBe(3);
    });

    it('ArrowLeft selects previous star', async (): Promise<void> => {
      const fixture: ComponentFixture<RatingA11yHostComponent> = await createFixture();
      fixture.componentInstance.value.set(3);
      fixture.detectChanges();
      dispatchKey(getHost(fixture), 'ArrowLeft');
      fixture.detectChanges();
      expect(fixture.componentInstance.value()).toBe(2);
    });

    it('ArrowUp selects next star (same as ArrowRight)', async (): Promise<void> => {
      const fixture: ComponentFixture<RatingA11yHostComponent> = await createFixture();
      fixture.componentInstance.value.set(2);
      fixture.detectChanges();
      dispatchKey(getHost(fixture), 'ArrowUp');
      fixture.detectChanges();
      expect(fixture.componentInstance.value()).toBe(3);
    });

    it('ArrowDown selects previous star (same as ArrowLeft)', async (): Promise<void> => {
      const fixture: ComponentFixture<RatingA11yHostComponent> = await createFixture();
      fixture.componentInstance.value.set(3);
      fixture.detectChanges();
      dispatchKey(getHost(fixture), 'ArrowDown');
      fixture.detectChanges();
      expect(fixture.componentInstance.value()).toBe(2);
    });

    it('ArrowRight from unselected state selects the first star', async (): Promise<void> => {
      const fixture: ComponentFixture<RatingA11yHostComponent> = await createFixture();
      dispatchKey(getHost(fixture), 'ArrowRight');
      fixture.detectChanges();
      expect(fixture.componentInstance.value()).toBe(1);
    });
  });

  // ── 2. Read-only mode ─────────────────────────────────────────────────────

  describe('read-only mode', (): void => {
    it('host has role="img" when readonly is true', async (): Promise<void> => {
      const fixture: ComponentFixture<RatingA11yHostComponent> = await createFixture();
      fixture.componentInstance.readonly.set(true);
      fixture.detectChanges();
      expect(getHost(fixture).getAttribute('role')).toBe('img');
    });

    it('host aria-label is "Rating: N out of M stars" in read-only mode', async (): Promise<void> => {
      const fixture: ComponentFixture<RatingA11yHostComponent> = await createFixture();
      fixture.componentInstance.readonly.set(true);
      fixture.componentInstance.value.set(4);
      fixture.detectChanges();
      expect(getHost(fixture).getAttribute('aria-label')).toBe('Rating: 4 out of 5 stars');
    });

    it('host aria-label shows 0 when no value is set in read-only mode', async (): Promise<void> => {
      const fixture: ComponentFixture<RatingA11yHostComponent> = await createFixture();
      fixture.componentInstance.readonly.set(true);
      fixture.detectChanges();
      expect(getHost(fixture).getAttribute('aria-label')).toBe('Rating: 0 out of 5 stars');
    });

    it('stars are aria-hidden in read-only mode', async (): Promise<void> => {
      const fixture: ComponentFixture<RatingA11yHostComponent> = await createFixture();
      fixture.componentInstance.readonly.set(true);
      fixture.detectChanges();
      getStars(fixture).forEach((star: HTMLElement): void => {
        expect(star.getAttribute('aria-hidden')).toBe('true');
      });
    });

    it('stars do not have role="radio" in read-only mode', async (): Promise<void> => {
      const fixture: ComponentFixture<RatingA11yHostComponent> = await createFixture();
      fixture.componentInstance.readonly.set(true);
      fixture.detectChanges();
      getStars(fixture).forEach((star: HTMLElement): void => {
        expect(star.getAttribute('role')).toBeNull();
      });
    });

    it('cancel button is not rendered in read-only mode', async (): Promise<void> => {
      const fixture: ComponentFixture<RatingA11yHostComponent> = await createFixture();
      fixture.componentInstance.readonly.set(true);
      fixture.detectChanges();
      expect(getCancelButton(fixture)).toBeNull();
    });

    it('keyboard input is ignored in read-only mode', async (): Promise<void> => {
      const fixture: ComponentFixture<RatingA11yHostComponent> = await createFixture();
      fixture.componentInstance.readonly.set(true);
      fixture.componentInstance.value.set(2);
      fixture.detectChanges();
      dispatchKey(getHost(fixture), 'ArrowRight');
      fixture.detectChanges();
      expect(fixture.componentInstance.value()).toBe(2);
    });
  });

  // ── 3. Disabled state ─────────────────────────────────────────────────────

  describe('disabled state', (): void => {
    it('host has aria-disabled="true" when disabled', async (): Promise<void> => {
      const fixture: ComponentFixture<RatingA11yHostComponent> = await createFixture();
      fixture.componentInstance.disabled.set(true);
      fixture.detectChanges();
      expect(getHost(fixture).getAttribute('aria-disabled')).toBe('true');
    });

    it('all stars have tabindex="-1" when disabled', async (): Promise<void> => {
      const fixture: ComponentFixture<RatingA11yHostComponent> = await createFixture();
      fixture.componentInstance.disabled.set(true);
      fixture.detectChanges();
      getStars(fixture).forEach((star: HTMLElement): void => {
        expect(star.getAttribute('tabindex')).toBe('-1');
      });
    });

    it('host does not have aria-disabled when in read-only mode', async (): Promise<void> => {
      const fixture: ComponentFixture<RatingA11yHostComponent> = await createFixture();
      fixture.componentInstance.readonly.set(true);
      fixture.componentInstance.disabled.set(true);
      fixture.detectChanges();
      expect(getHost(fixture).getAttribute('aria-disabled')).toBeNull();
    });
  });

  // ── 4. axe-core automated checks ─────────────────────────────────────────

  describe('axe-core automated checks', (): void => {
    it('passes axe in default state (no value)', async (): Promise<void> => {
      const fixture: ComponentFixture<RatingA11yHostComponent> = await createFixture();
      await checkA11y(fixture, { rules: SKIP_COLOR_CONTRAST_RULES });
    });

    it('passes axe with a value selected', async (): Promise<void> => {
      const fixture: ComponentFixture<RatingA11yHostComponent> = await createFixture();
      fixture.componentInstance.value.set(3);
      fixture.detectChanges();
      await checkA11y(fixture, { rules: SKIP_COLOR_CONTRAST_RULES });
    });

    it('passes axe in disabled state', async (): Promise<void> => {
      const fixture: ComponentFixture<RatingA11yHostComponent> = await createFixture();
      fixture.componentInstance.disabled.set(true);
      fixture.detectChanges();
      await checkA11y(fixture, { rules: SKIP_COLOR_CONTRAST_RULES });
    });

    it('passes axe in read-only state with a value', async (): Promise<void> => {
      const fixture: ComponentFixture<RatingA11yHostComponent> = await createFixture();
      fixture.componentInstance.readonly.set(true);
      fixture.componentInstance.value.set(3);
      fixture.detectChanges();
      await checkA11y(fixture, { rules: SKIP_COLOR_CONTRAST_RULES });
    });

    it('passes axe in read-only state with no value', async (): Promise<void> => {
      const fixture: ComponentFixture<RatingA11yHostComponent> = await createFixture();
      fixture.componentInstance.readonly.set(true);
      fixture.detectChanges();
      await checkA11y(fixture, { rules: SKIP_COLOR_CONTRAST_RULES });
    });
  });
});
