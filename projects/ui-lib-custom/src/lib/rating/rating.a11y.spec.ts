import {
  ChangeDetectionStrategy,
  Component,
  provideZonelessChangeDetection,
  signal,
  type DebugElement,
  type WritableSignal,
} from '@angular/core';
import type { ComponentFixture } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';
import { ThemeConfigService } from 'ui-lib-custom/theme';
import type { ThemePreset, ThemeVariant } from 'ui-lib-custom/theme';
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
      [readonly]="readonly()"
      [disabled]="disabled()"
      [cancel]="cancel()"
      [ariaLabel]="ariaLabel()"
      [ariaLabelledby]="ariaLabelledby()"
    />
  `,
})
class RatingA11yHostComponent {
  public readonly stars: WritableSignal<number> = signal<number>(5);
  public readonly readonly: WritableSignal<boolean> = signal<boolean>(false);
  public readonly disabled: WritableSignal<boolean> = signal<boolean>(false);
  public readonly cancel: WritableSignal<boolean> = signal<boolean>(true);
  public readonly ariaLabel: WritableSignal<string | null> = signal<string | null>(
    'Product rating'
  );
  public readonly ariaLabelledby: WritableSignal<string | null> = signal<string | null>(null);
}

// ── Shared test helpers ───────────────────────────────────────────────────────

function buildMockTheme(): {
  variant: WritableSignal<ThemeVariant>;
  setVariant: (value: ThemeVariant) => void;
  getPreset: () => ThemePreset;
  preset: () => ThemePreset;
} {
  const variant: WritableSignal<ThemeVariant> = signal<ThemeVariant>('material');
  const buildPreset: () => ThemePreset = (): ThemePreset => ({
    id: 'test-preset',
    name: 'Test Preset',
    variant: 'material',
    shape: 'rounded',
    density: 'default',
    darkMode: 'light',
    colors: {
      primary: '#000000',
      secondary: '#000000',
      success: '#000000',
      danger: '#000000',
      warning: '#000000',
      info: '#000000',
      surface: '#000000',
      background: '#000000',
    },
    fonts: { heading: 'Inter', body: 'Inter', mono: 'monospace' },
    icons: {
      defaultLibrary: 'lucide',
      defaultSize: 'md',
      sizes: {
        xs: '0.75rem',
        sm: '0.875rem',
        md: '1rem',
        lg: '1.125rem',
        xl: '1.25rem',
        '2xl': '1.5rem',
      },
    },
    createdAt: 0,
    updatedAt: 0,
  });
  return {
    variant,
    setVariant: (value: ThemeVariant): void => variant.set(value),
    getPreset: (): ThemePreset => buildPreset(),
    preset: (): ThemePreset => buildPreset(),
  };
}

interface RatingA11yFixtureOptions {
  readonly?: boolean;
  disabled?: boolean;
  cancel?: boolean;
  ariaLabel?: string | null;
  ariaLabelledby?: string | null;
}

async function createFixture(
  options: RatingA11yFixtureOptions = {}
): Promise<ComponentFixture<RatingA11yHostComponent>> {
  await TestBed.configureTestingModule({
    imports: [RatingA11yHostComponent],
    providers: [
      provideZonelessChangeDetection(),
      { provide: ThemeConfigService, useValue: buildMockTheme() },
    ],
  }).compileComponents();

  const fixture: ComponentFixture<RatingA11yHostComponent> =
    TestBed.createComponent(RatingA11yHostComponent);
  if (options.readonly !== undefined) {
    fixture.componentInstance.readonly.set(options.readonly);
  }
  if (options.disabled !== undefined) {
    fixture.componentInstance.disabled.set(options.disabled);
  }
  if (options.cancel !== undefined) {
    fixture.componentInstance.cancel.set(options.cancel);
  }
  if (options.ariaLabel !== undefined) {
    fixture.componentInstance.ariaLabel.set(options.ariaLabel);
  }
  if (options.ariaLabelledby !== undefined) {
    fixture.componentInstance.ariaLabelledby.set(options.ariaLabelledby);
  }
  document.body.appendChild(fixture.nativeElement);
  fixture.detectChanges();
  await fixture.whenStable();
  fixture.detectChanges();
  return fixture;
}

function getRatingHost(fixture: ComponentFixture<RatingA11yHostComponent>): HTMLElement {
  const element: HTMLElement | null = (fixture.nativeElement as HTMLElement).querySelector(
    'ui-lib-rating'
  );
  if (!element) {
    throw new Error('Expected ui-lib-rating host element to exist');
  }
  return element;
}

function getRatingInstance(fixture: ComponentFixture<RatingA11yHostComponent>): Rating {
  const debugElement: DebugElement = fixture.debugElement.query(
    (debugEl: DebugElement): boolean => debugEl.componentInstance instanceof Rating
  );
  return debugElement.componentInstance as Rating;
}

function setRatingValue(
  fixture: ComponentFixture<RatingA11yHostComponent>,
  value: number | null
): void {
  getRatingInstance(fixture).writeValue(value);
  fixture.detectChanges();
}

function getInteractiveStars(fixture: ComponentFixture<RatingA11yHostComponent>): HTMLElement[] {
  return Array.from(
    (fixture.nativeElement as HTMLElement).querySelectorAll<HTMLElement>(
      '.ui-lib-rating__star[role="radio"]'
    )
  );
}

function getDecorativeStars(fixture: ComponentFixture<RatingA11yHostComponent>): HTMLElement[] {
  return Array.from(
    (fixture.nativeElement as HTMLElement).querySelectorAll<HTMLElement>(
      '.ui-lib-rating__star[aria-hidden="true"]'
    )
  );
}

function dispatchKey(element: HTMLElement, key: string): void {
  element.dispatchEvent(new KeyboardEvent('keydown', { key, bubbles: true }));
}

// ── Accessibility tests ───────────────────────────────────────────────────────

describe('Rating Accessibility', (): void => {
  afterEach((): void => {
    jest.restoreAllMocks();
    TestBed.resetTestingModule();
  });

  // ── 1. Interactive mode — radiogroup pattern ────────────────────────────────

  describe('Interactive mode (Pattern A: radiogroup)', (): void => {
    it('host has role="radiogroup"', async (): Promise<void> => {
      const fixture: ComponentFixture<RatingA11yHostComponent> = await createFixture();
      expect(getRatingHost(fixture).getAttribute('role')).toBe('radiogroup');
    });

    it('host aria-label reflects the consumer-supplied ariaLabel', async (): Promise<void> => {
      const fixture: ComponentFixture<RatingA11yHostComponent> = await createFixture();
      expect(getRatingHost(fixture).getAttribute('aria-label')).toBe('Product rating');
    });

    it('host prefers aria-labelledby over aria-label when both inputs are available', async (): Promise<void> => {
      const fixture: ComponentFixture<RatingA11yHostComponent> = await createFixture({
        ariaLabel: 'Fallback rating',
        ariaLabelledby: 'rating-heading',
      });
      const host: HTMLElement = getRatingHost(fixture);
      expect(host.getAttribute('aria-labelledby')).toBe('rating-heading');
      expect(host.hasAttribute('aria-label')).toBe(false);
    });

    it('each star has role="radio"', async (): Promise<void> => {
      const fixture: ComponentFixture<RatingA11yHostComponent> = await createFixture();
      const stars: HTMLElement[] = getInteractiveStars(fixture);
      expect(stars.length).toBe(5);
      for (const star of stars) {
        expect(star.getAttribute('role')).toBe('radio');
      }
    });

    it('all stars have aria-checked="false" when no value is selected', async (): Promise<void> => {
      const fixture: ComponentFixture<RatingA11yHostComponent> = await createFixture();
      setRatingValue(fixture, null);

      for (const star of getInteractiveStars(fixture)) {
        expect(star.getAttribute('aria-checked')).toBe('false');
      }
    });

    it('selected star has aria-checked="true"; others have "false"', async (): Promise<void> => {
      const fixture: ComponentFixture<RatingA11yHostComponent> = await createFixture();
      setRatingValue(fixture, 3);

      const stars: HTMLElement[] = getInteractiveStars(fixture);
      expect(stars[2]?.getAttribute('aria-checked')).toBe('true');
      expect(stars[0]?.getAttribute('aria-checked')).toBe('false');
      expect(stars[4]?.getAttribute('aria-checked')).toBe('false');
    });

    it('each star aria-label includes the star number and maximum', async (): Promise<void> => {
      const fixture: ComponentFixture<RatingA11yHostComponent> = await createFixture();
      const stars: HTMLElement[] = getInteractiveStars(fixture);
      expect(stars[0]?.getAttribute('aria-label')).toBe('1 star out of 5');
      expect(stars[1]?.getAttribute('aria-label')).toBe('2 stars out of 5');
      expect(stars[4]?.getAttribute('aria-label')).toBe('5 stars out of 5');
    });

    it('star icons are aria-hidden', async (): Promise<void> => {
      const fixture: ComponentFixture<RatingA11yHostComponent> = await createFixture();
      const iconElements: NodeListOf<HTMLElement> = (
        fixture.nativeElement as HTMLElement
      ).querySelectorAll<HTMLElement>('.ui-lib-rating__star-icon');
      for (const iconElement of iconElements) {
        expect(iconElement.getAttribute('aria-hidden')).toBe('true');
      }
    });
  });

  // ── 2. Roving tabindex ──────────────────────────────────────────────────────

  describe('Roving tabindex', (): void => {
    it('first star has tabindex=0 when no value is selected', async (): Promise<void> => {
      const fixture: ComponentFixture<RatingA11yHostComponent> = await createFixture();
      setRatingValue(fixture, null);

      const stars: HTMLElement[] = getInteractiveStars(fixture);
      expect(stars[0]?.getAttribute('tabindex')).toBe('0');
      expect(stars[1]?.getAttribute('tabindex')).toBe('-1');
      expect(stars[4]?.getAttribute('tabindex')).toBe('-1');
    });

    it('selected star has tabindex=0; others have tabindex=-1', async (): Promise<void> => {
      const fixture: ComponentFixture<RatingA11yHostComponent> = await createFixture();
      setRatingValue(fixture, 3);

      const stars: HTMLElement[] = getInteractiveStars(fixture);
      expect(stars[0]?.getAttribute('tabindex')).toBe('-1');
      expect(stars[2]?.getAttribute('tabindex')).toBe('0');
      expect(stars[4]?.getAttribute('tabindex')).toBe('-1');
    });
  });

  // ── 3. Keyboard navigation ──────────────────────────────────────────────────

  describe('Keyboard navigation', (): void => {
    it('ArrowRight increments the value by one', async (): Promise<void> => {
      const fixture: ComponentFixture<RatingA11yHostComponent> = await createFixture();
      setRatingValue(fixture, 2);

      dispatchKey(getRatingHost(fixture), 'ArrowRight');
      fixture.detectChanges();

      expect(getRatingInstance(fixture).value()).toBe(3);
    });

    it('ArrowUp increments the value by one', async (): Promise<void> => {
      const fixture: ComponentFixture<RatingA11yHostComponent> = await createFixture();
      setRatingValue(fixture, 2);

      dispatchKey(getRatingHost(fixture), 'ArrowUp');
      fixture.detectChanges();

      expect(getRatingInstance(fixture).value()).toBe(3);
    });

    it('ArrowLeft decrements the value by one', async (): Promise<void> => {
      const fixture: ComponentFixture<RatingA11yHostComponent> = await createFixture();
      setRatingValue(fixture, 4);

      dispatchKey(getRatingHost(fixture), 'ArrowLeft');
      fixture.detectChanges();

      expect(getRatingInstance(fixture).value()).toBe(3);
    });

    it('ArrowDown decrements the value by one', async (): Promise<void> => {
      const fixture: ComponentFixture<RatingA11yHostComponent> = await createFixture();
      setRatingValue(fixture, 4);

      dispatchKey(getRatingHost(fixture), 'ArrowDown');
      fixture.detectChanges();

      expect(getRatingInstance(fixture).value()).toBe(3);
    });

    it('ArrowRight clamps at maximum stars count', async (): Promise<void> => {
      const fixture: ComponentFixture<RatingA11yHostComponent> = await createFixture();
      setRatingValue(fixture, 5);

      dispatchKey(getRatingHost(fixture), 'ArrowRight');
      fixture.detectChanges();

      expect(getRatingInstance(fixture).value()).toBe(5);
    });

    it('ArrowLeft clamps at minimum value (1)', async (): Promise<void> => {
      const fixture: ComponentFixture<RatingA11yHostComponent> = await createFixture();
      setRatingValue(fixture, 1);

      dispatchKey(getRatingHost(fixture), 'ArrowLeft');
      fixture.detectChanges();

      expect(getRatingInstance(fixture).value()).toBe(1);
    });

    it('Delete clears the rating when cancel is enabled', async (): Promise<void> => {
      const fixture: ComponentFixture<RatingA11yHostComponent> = await createFixture({
        cancel: true,
      });
      setRatingValue(fixture, 4);

      dispatchKey(getRatingHost(fixture), 'Delete');
      fixture.detectChanges();

      expect(getRatingInstance(fixture).value()).toBeNull();
    });
  });

  // ── 4. Read-only mode ───────────────────────────────────────────────────────

  describe('Read-only mode (role="img")', (): void => {
    it('host has role="img" when readonly=true', async (): Promise<void> => {
      const fixture: ComponentFixture<RatingA11yHostComponent> = await createFixture();
      fixture.componentInstance.readonly.set(true);
      fixture.detectChanges();

      expect(getRatingHost(fixture).getAttribute('role')).toBe('img');
    });

    it('host aria-label describes the rating value in read-only mode', async (): Promise<void> => {
      const fixture: ComponentFixture<RatingA11yHostComponent> = await createFixture();
      setRatingValue(fixture, 3);
      fixture.componentInstance.readonly.set(true);
      fixture.detectChanges();

      expect(getRatingHost(fixture).getAttribute('aria-label')).toBe('Rating: 3 out of 5 stars');
    });

    it('host aria-label uses 0 when value is null in read-only mode', async (): Promise<void> => {
      const fixture: ComponentFixture<RatingA11yHostComponent> = await createFixture();
      setRatingValue(fixture, null);
      fixture.componentInstance.readonly.set(true);
      fixture.detectChanges();

      expect(getRatingHost(fixture).getAttribute('aria-label')).toBe('Rating: 0 out of 5 stars');
    });

    it('no interactive star elements are rendered in read-only mode', async (): Promise<void> => {
      const fixture: ComponentFixture<RatingA11yHostComponent> = await createFixture();
      fixture.componentInstance.readonly.set(true);
      fixture.detectChanges();

      expect(getInteractiveStars(fixture).length).toBe(0);
    });

    it('all decorative stars carry aria-hidden="true" in read-only mode', async (): Promise<void> => {
      const fixture: ComponentFixture<RatingA11yHostComponent> = await createFixture();
      fixture.componentInstance.readonly.set(true);
      fixture.detectChanges();

      const stars: HTMLElement[] = getDecorativeStars(fixture);
      expect(stars.length).toBe(5);
      for (const star of stars) {
        expect(star.getAttribute('aria-hidden')).toBe('true');
      }
    });

    it('cancel button is not rendered in read-only mode', async (): Promise<void> => {
      const fixture: ComponentFixture<RatingA11yHostComponent> = await createFixture();
      fixture.componentInstance.readonly.set(true);
      fixture.detectChanges();

      const cancelButton: HTMLElement | null = (fixture.nativeElement as HTMLElement).querySelector(
        '.ui-lib-rating__cancel'
      );
      expect(cancelButton).toBeNull();
    });

    it('warns in dev mode when neither ariaLabel nor ariaLabelledby is provided', async (): Promise<void> => {
      const warnSpy: jest.SpiedFunction<typeof console.warn> = jest
        .spyOn(console, 'warn')
        .mockImplementation((): void => {});

      await createFixture({
        ariaLabel: null,
        ariaLabelledby: null,
      });

      expect(warnSpy).toHaveBeenCalledWith(
        '[ui-lib-rating] Missing accessible name. Provide ariaLabel or ariaLabelledby when no visible label is present.'
      );
    });

    it('does not warn when ariaLabelledby provides the accessible name', async (): Promise<void> => {
      const warnSpy: jest.SpiedFunction<typeof console.warn> = jest
        .spyOn(console, 'warn')
        .mockImplementation((): void => {});

      await createFixture({
        ariaLabel: null,
        ariaLabelledby: 'rating-heading',
      });

      expect(warnSpy).not.toHaveBeenCalled();
    });
  });

  // ── 5. axe-core scans ───────────────────────────────────────────────────────

  describe('axe-core', (): void => {
    it('passes axe in default interactive state (no value selected)', async (): Promise<void> => {
      const fixture: ComponentFixture<RatingA11yHostComponent> = await createFixture();
      await checkA11y(fixture, { rules: SKIP_COLOR_CONTRAST_RULES });
    });

    it('passes axe with a value selected', async (): Promise<void> => {
      const fixture: ComponentFixture<RatingA11yHostComponent> = await createFixture();
      setRatingValue(fixture, 3);
      await checkA11y(fixture, { rules: SKIP_COLOR_CONTRAST_RULES });
    });

    it('passes axe in read-only mode', async (): Promise<void> => {
      const fixture: ComponentFixture<RatingA11yHostComponent> = await createFixture();
      setRatingValue(fixture, 4);
      fixture.componentInstance.readonly.set(true);
      fixture.detectChanges();
      await checkA11y(fixture, { rules: SKIP_COLOR_CONTRAST_RULES });
    });

    it('passes axe in disabled state', async (): Promise<void> => {
      const fixture: ComponentFixture<RatingA11yHostComponent> = await createFixture();
      fixture.componentInstance.disabled.set(true);
      fixture.detectChanges();
      await checkA11y(fixture, { rules: SKIP_COLOR_CONTRAST_RULES });
    });
  });
});
