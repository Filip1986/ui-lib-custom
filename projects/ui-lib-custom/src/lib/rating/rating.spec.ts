import {
  ChangeDetectionStrategy,
  Component,
  signal,
  type WritableSignal,
  type DebugElement,
} from '@angular/core';
import { TestBed } from '@angular/core/testing';
import type { ComponentFixture } from '@angular/core/testing';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { provideZonelessChangeDetection } from '@angular/core';
import { Rating } from './rating';
import { SHARED_SIZE_OPTIONS, SHARED_VARIANT_OPTIONS } from 'ui-lib-custom/core';
import type { RatingChangeEvent, RatingSize, RatingVariant } from './rating';

// ── Helpers ───────────────────────────────────────────────────────────────────

function getHost(fixture: ComponentFixture<unknown>): HTMLElement {
  return (fixture.nativeElement as HTMLElement).querySelector('ui-lib-rating') as HTMLElement;
}

function getStars(fixture: ComponentFixture<unknown>): HTMLElement[] {
  return Array.from(
    (fixture.nativeElement as HTMLElement).querySelectorAll<HTMLElement>('.ui-lib-rating__star')
  );
}

function getCancelButton(fixture: ComponentFixture<unknown>): HTMLElement | null {
  return (fixture.nativeElement as HTMLElement).querySelector<HTMLElement>(
    '.ui-lib-rating__cancel'
  );
}

function getRatingInstance(fixture: ComponentFixture<unknown>): Rating {
  return fixture.debugElement.query(
    (debugEl: DebugElement): boolean => debugEl.componentInstance instanceof Rating
  ).componentInstance as Rating;
}

// ── Host component ────────────────────────────────────────────────────────────

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [Rating],
  template: `
    <ui-lib-rating
      [stars]="stars()"
      [cancel]="cancel()"
      [disabled]="disabled()"
      [readonly]="readonly()"
      [ariaLabel]="ariaLabel()"
      [variant]="variant()"
      [size]="size()"
      [(value)]="ratingValue"
      (change)="handleChange($event)"
    />
  `,
})
class HostComponent {
  public readonly stars: WritableSignal<number> = signal<number>(5);
  public readonly cancel: WritableSignal<boolean> = signal<boolean>(true);
  public readonly disabled: WritableSignal<boolean> = signal<boolean>(false);
  public readonly readonly: WritableSignal<boolean> = signal<boolean>(false);
  public readonly ariaLabel: WritableSignal<string> = signal<string>('Rating');
  public readonly variant: WritableSignal<RatingVariant> = signal<RatingVariant>('material');
  public readonly size: WritableSignal<RatingSize> = signal<RatingSize>('md');

  public ratingValue: number | null = null;
  public readonly lastChange: WritableSignal<RatingChangeEvent | null> =
    signal<RatingChangeEvent | null>(null);

  public handleChange(event: RatingChangeEvent): void {
    this.lastChange.set(event);
  }
}

// ── Tests ─────────────────────────────────────────────────────────────────────

describe('Rating', (): void => {
  let fixture: ComponentFixture<HostComponent>;
  let host: HostComponent;

  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({
      imports: [HostComponent],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    fixture = TestBed.createComponent(HostComponent);
    host = fixture.componentInstance;
    fixture.detectChanges();
  });

  // ── Creation ────────────────────────────────────────────────────────────

  it('creates the component', (): void => {
    expect(host).toBeTruthy();
    expect(getHost(fixture).classList.contains('ui-lib-rating')).toBe(true);
  });

  it('renders the correct number of stars', (): void => {
    expect(getStars(fixture).length).toBe(5);
  });

  it('renders a different star count when stars input changes', (): void => {
    host.stars.set(3);
    fixture.detectChanges();
    expect(getStars(fixture).length).toBe(3);
  });

  it('applies default variant and size classes', (): void => {
    const el: HTMLElement = getHost(fixture);
    expect(el.classList.contains('ui-lib-rating--variant-material')).toBe(true);
    expect(el.classList.contains('ui-lib-rating--size-md')).toBe(true);
  });

  it('has role=radiogroup on the host', (): void => {
    expect(getHost(fixture).getAttribute('role')).toBe('radiogroup');
  });

  // ── Cancel button ────────────────────────────────────────────────────────

  it('renders a cancel button by default', (): void => {
    expect(getCancelButton(fixture)).toBeTruthy();
  });

  it('hides the cancel button when cancel=false', (): void => {
    host.cancel.set(false);
    fixture.detectChanges();
    expect(getCancelButton(fixture)).toBeNull();
  });

  // ── Checked state ────────────────────────────────────────────────────────

  it('no star is active when value is null', (): void => {
    for (const star of getStars(fixture)) {
      expect(star.classList.contains('ui-lib-rating__star--on')).toBe(false);
    }
  });

  it('fills stars up to and including the current value', (): void => {
    const rating: Rating = getRatingInstance(fixture);
    rating.writeValue(3);
    fixture.detectChanges();

    const stars: HTMLElement[] = getStars(fixture);
    expect(stars[0]?.classList.contains('ui-lib-rating__star--on')).toBe(true);
    expect(stars[1]?.classList.contains('ui-lib-rating__star--on')).toBe(true);
    expect(stars[2]?.classList.contains('ui-lib-rating__star--on')).toBe(true);
    expect(stars[3]?.classList.contains('ui-lib-rating__star--on')).toBe(false);
    expect(stars[4]?.classList.contains('ui-lib-rating__star--on')).toBe(false);
  });

  it('only the selected star has aria-checked=true', (): void => {
    const rating: Rating = getRatingInstance(fixture);
    rating.writeValue(3);
    fixture.detectChanges();

    const stars: HTMLElement[] = getStars(fixture);
    expect(stars[2]?.getAttribute('aria-checked')).toBe('true');
    expect(stars[0]?.getAttribute('aria-checked')).toBe('false');
    expect(stars[4]?.getAttribute('aria-checked')).toBe('false');
  });

  // ── Click interaction ────────────────────────────────────────────────────

  it('sets value when a star is clicked', (): void => {
    const stars: HTMLElement[] = getStars(fixture);
    stars[2]?.click();
    fixture.detectChanges();

    expect(host.ratingValue).toBe(3);
  });

  it('emits change with the correct value when a star is clicked', (): void => {
    getStars(fixture)[4]?.click();
    fixture.detectChanges();

    expect(host.lastChange()?.value).toBe(5);
    expect(host.lastChange()?.originalEvent).toBeInstanceOf(MouseEvent);
  });

  it('clears the value when the cancel button is clicked', (): void => {
    const rating: Rating = getRatingInstance(fixture);
    rating.writeValue(4);
    fixture.detectChanges();

    getCancelButton(fixture)?.click();
    fixture.detectChanges();

    expect(host.ratingValue).toBeNull();
  });

  it('emits change with null value when cancel is clicked', (): void => {
    const rating: Rating = getRatingInstance(fixture);
    rating.writeValue(2);
    fixture.detectChanges();

    getCancelButton(fixture)?.click();
    fixture.detectChanges();

    expect(host.lastChange()?.value).toBeNull();
  });

  // ── Hover preview ────────────────────────────────────────────────────────

  it('fills stars up to the hovered position on mouseenter', (): void => {
    const rating: Rating = getRatingInstance(fixture);
    rating.onStarHover(3);
    fixture.detectChanges();

    const stars: HTMLElement[] = getStars(fixture);
    expect(stars[0]?.classList.contains('ui-lib-rating__star--on')).toBe(true);
    expect(stars[2]?.classList.contains('ui-lib-rating__star--on')).toBe(true);
    expect(stars[3]?.classList.contains('ui-lib-rating__star--on')).toBe(false);
  });

  it('reverts to committed value after mouseleave', (): void => {
    const rating: Rating = getRatingInstance(fixture);
    rating.writeValue(1);
    fixture.detectChanges();

    rating.onStarHover(5);
    fixture.detectChanges();
    expect(getStars(fixture)[4]?.classList.contains('ui-lib-rating__star--on')).toBe(true);

    rating.onStarLeave();
    fixture.detectChanges();
    expect(getStars(fixture)[4]?.classList.contains('ui-lib-rating__star--on')).toBe(false);
    expect(getStars(fixture)[0]?.classList.contains('ui-lib-rating__star--on')).toBe(true);
  });

  // ── Disabled ─────────────────────────────────────────────────────────────

  it('adds disabled class when disabled', (): void => {
    host.disabled.set(true);
    fixture.detectChanges();
    expect(getHost(fixture).classList.contains('ui-lib-rating--disabled')).toBe(true);
  });

  it('does not emit change when disabled and star is clicked', (): void => {
    host.disabled.set(true);
    fixture.detectChanges();

    // pointer-events: none prevents real clicks, invoke handler directly
    const rating: Rating = getRatingInstance(fixture);
    const event: MouseEvent = new MouseEvent('click');
    rating.onStarClick(3, event);
    fixture.detectChanges();

    expect(host.lastChange()).toBeNull();
  });

  it('accepts setDisabledState from a parent form control', (): void => {
    getRatingInstance(fixture).setDisabledState(true);
    fixture.detectChanges();
    expect(getHost(fixture).classList.contains('ui-lib-rating--disabled')).toBe(true);
  });

  // ── Readonly ──────────────────────────────────────────────────────────────

  it('adds readonly class when readonly', (): void => {
    host.readonly.set(true);
    fixture.detectChanges();
    expect(getHost(fixture).classList.contains('ui-lib-rating--readonly')).toBe(true);
  });

  it('does not emit change when readonly and star is clicked', (): void => {
    host.readonly.set(true);
    fixture.detectChanges();

    const rating: Rating = getRatingInstance(fixture);
    rating.onStarClick(2, new MouseEvent('click'));
    fixture.detectChanges();

    expect(host.lastChange()).toBeNull();
  });

  // ── Variant ───────────────────────────────────────────────────────────────

  it('applies each variant class', (): void => {
    const variants: RatingVariant[] = [...SHARED_VARIANT_OPTIONS];
    for (const variant of variants) {
      host.variant.set(variant);
      fixture.detectChanges();
      expect(getHost(fixture).classList.contains(`ui-lib-rating--variant-${variant}`)).toBe(true);
    }
  });

  // ── Size ──────────────────────────────────────────────────────────────────

  it('applies each size class', (): void => {
    const sizes: RatingSize[] = [...SHARED_SIZE_OPTIONS];
    for (const size of sizes) {
      host.size.set(size);
      fixture.detectChanges();
      expect(getHost(fixture).classList.contains(`ui-lib-rating--size-${size}`)).toBe(true);
    }
  });

  // ── ARIA ──────────────────────────────────────────────────────────────────

  it('sets aria-label on the host', (): void => {
    host.ariaLabel.set('Product rating');
    fixture.detectChanges();
    expect(getHost(fixture).getAttribute('aria-label')).toBe('Product rating');
  });

  it('each star has role=radio', (): void => {
    for (const star of getStars(fixture)) {
      expect(star.getAttribute('role')).toBe('radio');
    }
  });

  it('each star has aria-posinset and aria-setsize', (): void => {
    const stars: HTMLElement[] = getStars(fixture);
    stars.forEach((star: HTMLElement, index: number): void => {
      expect(star.getAttribute('aria-posinset')).toBe(String(index + 1));
      expect(star.getAttribute('aria-setsize')).toBe('5');
    });
  });

  it('getStarAriaLabel returns "N of M" format', (): void => {
    const rating: Rating = getRatingInstance(fixture);
    expect(rating.getStarAriaLabel(3)).toBe('3 of 5');
  });

  // ── Keyboard navigation ───────────────────────────────────────────────────

  it('ArrowRight increases rating by one', (): void => {
    const rating: Rating = getRatingInstance(fixture);
    rating.writeValue(2);
    fixture.detectChanges();

    const event: KeyboardEvent = new KeyboardEvent('keydown', { key: 'ArrowRight' });
    rating.onKeyDown(event);
    fixture.detectChanges();

    expect(host.ratingValue).toBe(3);
  });

  it('ArrowLeft decreases rating by one', (): void => {
    const rating: Rating = getRatingInstance(fixture);
    rating.writeValue(4);
    fixture.detectChanges();

    const event: KeyboardEvent = new KeyboardEvent('keydown', { key: 'ArrowLeft' });
    rating.onKeyDown(event);
    fixture.detectChanges();

    expect(host.ratingValue).toBe(3);
  });

  it('ArrowRight does not exceed stars count', (): void => {
    const rating: Rating = getRatingInstance(fixture);
    rating.writeValue(5);
    fixture.detectChanges();

    rating.onKeyDown(new KeyboardEvent('keydown', { key: 'ArrowRight' }));
    fixture.detectChanges();

    expect(host.ratingValue).toBe(5);
  });

  it('ArrowLeft does not go below 1', (): void => {
    const rating: Rating = getRatingInstance(fixture);
    rating.writeValue(1);
    fixture.detectChanges();

    rating.onKeyDown(new KeyboardEvent('keydown', { key: 'ArrowLeft' }));
    fixture.detectChanges();

    expect(host.ratingValue).toBe(1);
  });

  it('Delete clears the rating', (): void => {
    const rating: Rating = getRatingInstance(fixture);
    rating.writeValue(3);
    fixture.detectChanges();

    rating.onKeyDown(new KeyboardEvent('keydown', { key: 'Delete' }));
    fixture.detectChanges();

    expect(host.ratingValue).toBeNull();
  });

  it('digit key sets rating to that value', (): void => {
    const rating: Rating = getRatingInstance(fixture);
    rating.onKeyDown(new KeyboardEvent('keydown', { key: '4' }));
    fixture.detectChanges();

    expect(host.ratingValue).toBe(4);
  });

  it('digit key out of range does nothing', (): void => {
    const rating: Rating = getRatingInstance(fixture);
    rating.onKeyDown(new KeyboardEvent('keydown', { key: '9' }));
    fixture.detectChanges();

    expect(host.ratingValue).toBeNull();
  });

  // ── CVA writeValue ────────────────────────────────────────────────────────

  it('writeValue updates the displayed rating', (): void => {
    getRatingInstance(fixture).writeValue(4);
    fixture.detectChanges();

    const stars: HTMLElement[] = getStars(fixture);
    let filledCount: number = 0;
    for (const star of stars) {
      if (star.classList.contains('ui-lib-rating__star--on')) {
        filledCount++;
      }
    }

    expect(filledCount).toBe(4);
  });

  it('writeValue(null) clears all stars', (): void => {
    getRatingInstance(fixture).writeValue(3);
    fixture.detectChanges();
    getRatingInstance(fixture).writeValue(null);
    fixture.detectChanges();

    for (const star of getStars(fixture)) {
      expect(star.classList.contains('ui-lib-rating__star--on')).toBe(false);
    }
  });
});

// ── ngModel integration ───────────────────────────────────────────────────────

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [Rating, FormsModule],
  template: `<ui-lib-rating [(ngModel)]="rating" />`,
})
class NgModelHostComponent {
  public rating: number | null = null;
}

describe('Rating — ngModel', (): void => {
  let fixture: ComponentFixture<NgModelHostComponent>;
  let host: NgModelHostComponent;

  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({
      imports: [NgModelHostComponent],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    fixture = TestBed.createComponent(NgModelHostComponent);
    host = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('binds rating model to component value', async (): Promise<void> => {
    host.rating = 3;
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();

    const stars: HTMLElement[] = Array.from(
      (fixture.nativeElement as HTMLElement).querySelectorAll<HTMLElement>('.ui-lib-rating__star')
    );

    let filledCount: number = 0;
    for (const star of stars) {
      if (star.classList.contains('ui-lib-rating__star--on')) {
        filledCount++;
      }
    }

    expect(filledCount).toBe(3);
  });

  it('updates model when a star is clicked', (): void => {
    const stars: HTMLElement[] = Array.from(
      (fixture.nativeElement as HTMLElement).querySelectorAll<HTMLElement>('.ui-lib-rating__star')
    );

    stars[1]?.click();
    fixture.detectChanges();

    expect(host.rating).toBe(2);
  });
});

// ── Reactive forms integration ─────────────────────────────────────────────────

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [Rating, ReactiveFormsModule],
  template: `
    <form [formGroup]="form">
      <ui-lib-rating formControlName="score" />
    </form>
  `,
})
class ReactiveHostComponent {
  public readonly form: FormGroup = new FormGroup({
    score: new FormControl<number | null>(null),
  });
}

describe('Rating — reactive forms', (): void => {
  let fixture: ComponentFixture<ReactiveHostComponent>;
  let host: ReactiveHostComponent;

  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({
      imports: [ReactiveHostComponent],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    fixture = TestBed.createComponent(ReactiveHostComponent);
    host = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('updates the form control value when a star is clicked', (): void => {
    const stars: HTMLElement[] = Array.from(
      (fixture.nativeElement as HTMLElement).querySelectorAll<HTMLElement>('.ui-lib-rating__star')
    );

    stars[4]?.click();
    fixture.detectChanges();

    expect(host.form.get('score')?.value).toBe(5);
  });

  it('disables the rating when the form control is disabled', (): void => {
    host.form.get('score')?.disable();
    fixture.detectChanges();

    const ratingEl: HTMLElement = (fixture.nativeElement as HTMLElement).querySelector<HTMLElement>(
      'ui-lib-rating'
    ) as HTMLElement;

    expect(ratingEl.classList.contains('ui-lib-rating--disabled')).toBe(true);
  });
});
