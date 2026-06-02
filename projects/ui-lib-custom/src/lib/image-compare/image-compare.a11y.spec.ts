import type { WritableSignal } from '@angular/core';
import {
  ChangeDetectionStrategy,
  Component,
  provideZonelessChangeDetection,
  signal,
} from '@angular/core';
import type { ComponentFixture } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';

import { checkA11y, SKIP_COLOR_CONTRAST_RULES } from '../../test/a11y-utils';
import { ImageCompareComponent } from './image-compare';
import type { ImageCompareVariant } from './image-compare.types';

// ─── Host component ───────────────────────────────────────────────────────────

@Component({
  standalone: true,
  imports: [ImageCompareComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ui-lib-image-compare
      [leftImage]="leftImage()"
      [leftAlt]="leftAlt()"
      [rightImage]="rightImage()"
      [rightAlt]="rightAlt()"
      [(value)]="value"
      [disabled]="disabled()"
      [ariaLabel]="ariaLabel()"
      [variant]="variant()"
    />
  `,
})
class ImageCompareA11yHostComponent {
  public value: number = 50;
  public readonly leftImage: WritableSignal<string> = signal<string>('before.jpg');
  public readonly leftAlt: WritableSignal<string> = signal<string>('Before treatment');
  public readonly rightImage: WritableSignal<string> = signal<string>('after.jpg');
  public readonly rightAlt: WritableSignal<string> = signal<string>('After treatment');
  public readonly disabled: WritableSignal<boolean> = signal<boolean>(false);
  public readonly ariaLabel: WritableSignal<string> = signal<string>('Image comparison slider');
  public readonly variant: WritableSignal<ImageCompareVariant> =
    signal<ImageCompareVariant>('material');
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

async function createFixture(
  initialValue: number = 50,
): Promise<ComponentFixture<ImageCompareA11yHostComponent>> {
  await TestBed.configureTestingModule({
    imports: [ImageCompareA11yHostComponent],
    providers: [provideZonelessChangeDetection()],
  }).compileComponents();

  const fixture: ComponentFixture<ImageCompareA11yHostComponent> = TestBed.createComponent(
    ImageCompareA11yHostComponent,
  );
  fixture.componentInstance.value = initialValue;
  document.body.appendChild(fixture.nativeElement);
  fixture.detectChanges();
  await fixture.whenStable();
  fixture.detectChanges();
  return fixture;
}

function getHandle(fixture: ComponentFixture<ImageCompareA11yHostComponent>): HTMLElement {
  const handle: HTMLElement | null = (fixture.nativeElement as HTMLElement).querySelector(
    '.uilib-image-compare__handle',
  );
  if (!handle) {
    throw new Error('Expected image-compare handle element');
  }
  return handle;
}

function getLeftImage(fixture: ComponentFixture<ImageCompareA11yHostComponent>): HTMLImageElement {
  const img: HTMLImageElement | null = (fixture.nativeElement as HTMLElement).querySelector(
    '.uilib-image-compare__img--left',
  );
  if (!img) {
    throw new Error('Expected left image element');
  }
  return img;
}

function getRightImage(fixture: ComponentFixture<ImageCompareA11yHostComponent>): HTMLImageElement {
  const img: HTMLImageElement | null = (fixture.nativeElement as HTMLElement).querySelector(
    '.uilib-image-compare__img--right',
  );
  if (!img) {
    throw new Error('Expected right image element');
  }
  return img;
}

function dispatchKey(element: HTMLElement, key: string): void {
  element.dispatchEvent(new KeyboardEvent('keydown', { key, bubbles: true }));
}

// ─── Tests ────────────────────────────────────────────────────────────────────

describe('ImageCompare Accessibility', (): void => {
  afterEach((): void => {
    const appended: HTMLElement | null = document.body.querySelector('div[ng-version]');
    if (appended) {
      document.body.removeChild(appended);
    }
  });

  // ── ARIA role ─────────────────────────────────────────────────────────────

  it('handle has role="slider"', async (): Promise<void> => {
    const fixture: ComponentFixture<ImageCompareA11yHostComponent> = await createFixture();
    expect(getHandle(fixture).getAttribute('role')).toBe('slider');
  });

  // ── ARIA value attributes ─────────────────────────────────────────────────

  it('aria-valuenow reflects the current value', async (): Promise<void> => {
    const fixture: ComponentFixture<ImageCompareA11yHostComponent> = await createFixture(42);
    expect(getHandle(fixture).getAttribute('aria-valuenow')).toBe('42');
  });

  it('aria-valuemin is 0', async (): Promise<void> => {
    const fixture: ComponentFixture<ImageCompareA11yHostComponent> = await createFixture();
    expect(getHandle(fixture).getAttribute('aria-valuemin')).toBe('0');
  });

  it('aria-valuemax is 100', async (): Promise<void> => {
    const fixture: ComponentFixture<ImageCompareA11yHostComponent> = await createFixture();
    expect(getHandle(fixture).getAttribute('aria-valuemax')).toBe('100');
  });

  it('aria-valuetext provides a human-readable string of the value', async (): Promise<void> => {
    const fixture: ComponentFixture<ImageCompareA11yHostComponent> = await createFixture(45);
    expect(getHandle(fixture).getAttribute('aria-valuetext')).toBe('45 percent');
  });

  it('aria-valuetext updates when value changes via keyboard', async (): Promise<void> => {
    const fixture: ComponentFixture<ImageCompareA11yHostComponent> = await createFixture(50);
    dispatchKey(getHandle(fixture), 'ArrowRight');
    fixture.detectChanges();
    expect(getHandle(fixture).getAttribute('aria-valuetext')).toBe('51 percent');
  });

  // ── ARIA label ────────────────────────────────────────────────────────────

  it('handle has the default aria-label', async (): Promise<void> => {
    const fixture: ComponentFixture<ImageCompareA11yHostComponent> = await createFixture();
    expect(getHandle(fixture).getAttribute('aria-label')).toBe('Image comparison slider');
  });

  it('handle uses a custom aria-label when provided', async (): Promise<void> => {
    const fixture: ComponentFixture<ImageCompareA11yHostComponent> = await createFixture();
    fixture.componentInstance.ariaLabel.set('Compare photo edits');
    fixture.detectChanges();
    expect(getHandle(fixture).getAttribute('aria-label')).toBe('Compare photo edits');
  });

  // ── Image alt text ────────────────────────────────────────────────────────

  it('left image has a non-empty alt attribute', async (): Promise<void> => {
    const fixture: ComponentFixture<ImageCompareA11yHostComponent> = await createFixture();
    expect(getLeftImage(fixture).getAttribute('alt')).toBe('Before treatment');
  });

  it('right image has a non-empty alt attribute', async (): Promise<void> => {
    const fixture: ComponentFixture<ImageCompareA11yHostComponent> = await createFixture();
    expect(getRightImage(fixture).getAttribute('alt')).toBe('After treatment');
  });

  // ── Divider is decorative ─────────────────────────────────────────────────

  it('divider line has aria-hidden="true"', async (): Promise<void> => {
    const fixture: ComponentFixture<ImageCompareA11yHostComponent> = await createFixture();
    const divider: HTMLElement | null = (fixture.nativeElement as HTMLElement).querySelector(
      '.uilib-image-compare__divider',
    );
    expect(divider?.getAttribute('aria-hidden')).toBe('true');
  });

  it('handle SVG icon has aria-hidden="true"', async (): Promise<void> => {
    const fixture: ComponentFixture<ImageCompareA11yHostComponent> = await createFixture();
    const svg: SVGElement | null = (fixture.nativeElement as HTMLElement).querySelector(
      '.uilib-image-compare__handle-icon',
    );
    expect(svg?.getAttribute('aria-hidden')).toBe('true');
  });

  // ── Disabled state ────────────────────────────────────────────────────────

  it('disabled state sets aria-disabled="true" on the handle', async (): Promise<void> => {
    const fixture: ComponentFixture<ImageCompareA11yHostComponent> = await createFixture();
    fixture.componentInstance.disabled.set(true);
    fixture.detectChanges();
    expect(getHandle(fixture).getAttribute('aria-disabled')).toBe('true');
  });

  it('disabled state prevents keyboard interaction', async (): Promise<void> => {
    const fixture: ComponentFixture<ImageCompareA11yHostComponent> = await createFixture(50);
    fixture.componentInstance.disabled.set(true);
    fixture.detectChanges();
    dispatchKey(getHandle(fixture), 'ArrowRight');
    fixture.detectChanges();
    expect(getHandle(fixture).getAttribute('aria-valuenow')).toBe('50');
  });

  // ── Keyboard navigation ───────────────────────────────────────────────────

  it('ArrowRight increments aria-valuenow by 1', async (): Promise<void> => {
    const fixture: ComponentFixture<ImageCompareA11yHostComponent> = await createFixture(50);
    dispatchKey(getHandle(fixture), 'ArrowRight');
    fixture.detectChanges();
    expect(getHandle(fixture).getAttribute('aria-valuenow')).toBe('51');
  });

  it('ArrowLeft decrements aria-valuenow by 1', async (): Promise<void> => {
    const fixture: ComponentFixture<ImageCompareA11yHostComponent> = await createFixture(50);
    dispatchKey(getHandle(fixture), 'ArrowLeft');
    fixture.detectChanges();
    expect(getHandle(fixture).getAttribute('aria-valuenow')).toBe('49');
  });

  it('Home key sets aria-valuenow to 0', async (): Promise<void> => {
    const fixture: ComponentFixture<ImageCompareA11yHostComponent> = await createFixture(50);
    dispatchKey(getHandle(fixture), 'Home');
    fixture.detectChanges();
    expect(getHandle(fixture).getAttribute('aria-valuenow')).toBe('0');
  });

  it('End key sets aria-valuenow to 100', async (): Promise<void> => {
    const fixture: ComponentFixture<ImageCompareA11yHostComponent> = await createFixture(50);
    dispatchKey(getHandle(fixture), 'End');
    fixture.detectChanges();
    expect(getHandle(fixture).getAttribute('aria-valuenow')).toBe('100');
  });

  // ── Unique instance ID ────────────────────────────────────────────────────

  it('host element has a unique id attribute', async (): Promise<void> => {
    const fixture: ComponentFixture<ImageCompareA11yHostComponent> = await createFixture();
    const host: HTMLElement | null = (fixture.nativeElement as HTMLElement).querySelector(
      'ui-lib-image-compare',
    );
    expect(host?.id).toMatch(/^ui-lib-image-compare-\d+$/);
  });

  // ── axe automated checks ──────────────────────────────────────────────────

  it('axe passes in default state', async (): Promise<void> => {
    const fixture: ComponentFixture<ImageCompareA11yHostComponent> = await createFixture();
    await checkA11y(fixture, { rules: SKIP_COLOR_CONTRAST_RULES });
  });

  it('axe passes at minimum value', async (): Promise<void> => {
    const fixture: ComponentFixture<ImageCompareA11yHostComponent> = await createFixture(0);
    await checkA11y(fixture, { rules: SKIP_COLOR_CONTRAST_RULES });
  });

  it('axe passes at maximum value', async (): Promise<void> => {
    const fixture: ComponentFixture<ImageCompareA11yHostComponent> = await createFixture(100);
    await checkA11y(fixture, { rules: SKIP_COLOR_CONTRAST_RULES });
  });

  it('axe passes when disabled', async (): Promise<void> => {
    const fixture: ComponentFixture<ImageCompareA11yHostComponent> = await createFixture();
    fixture.componentInstance.disabled.set(true);
    fixture.detectChanges();
    await checkA11y(fixture, { rules: SKIP_COLOR_CONTRAST_RULES });
  });
});
