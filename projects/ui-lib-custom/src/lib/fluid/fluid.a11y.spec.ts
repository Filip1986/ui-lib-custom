import {
  ChangeDetectionStrategy,
  Component,
  provideZonelessChangeDetection,
  signal,
} from '@angular/core';
import type { WritableSignal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import type { ComponentFixture } from '@angular/core/testing';
import { checkA11y, SKIP_COLOR_CONTRAST_RULES } from '../../test/a11y-utils';
import { Fluid, FluidDirective } from './fluid';

// ── Host components ──────────────────────────────────────────────────────────

@Component({
  standalone: true,
  imports: [Fluid],
  template: `
    <ui-lib-fluid>
      <input type="text" aria-label="Name" />
    </ui-lib-fluid>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class FluidComponentA11yHost {}

@Component({
  standalone: true,
  imports: [FluidDirective],
  template: `
    <div uiLibFluid>
      <input type="text" aria-label="Email" />
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class FluidDirectiveA11yHost {}

@Component({
  standalone: true,
  imports: [FluidDirective],
  template: `<div [uiLibFluid]="isFluid()"><input type="text" aria-label="Search" /></div>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class FluidDirectiveDisabledA11yHost {
  public readonly isFluid: WritableSignal<boolean> = signal<boolean>(false);
}

@Component({
  standalone: true,
  imports: [Fluid],
  template: `
    <ui-lib-fluid>
      <ui-lib-fluid>
        <input type="text" aria-label="Nested input" />
      </ui-lib-fluid>
    </ui-lib-fluid>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class FluidNestedA11yHost {}

// ── Helpers ──────────────────────────────────────────────────────────────────

async function createFixture<T>(
  componentType: Parameters<typeof TestBed.createComponent>[0]
): Promise<ComponentFixture<T>> {
  await TestBed.configureTestingModule({
    imports: [componentType],
    providers: [provideZonelessChangeDetection()],
  }).compileComponents();
  const fixture: ComponentFixture<T> = TestBed.createComponent(
    componentType as Parameters<typeof TestBed.createComponent<T>>[0]
  );
  document.body.appendChild(fixture.nativeElement);
  fixture.detectChanges();
  await fixture.whenStable();
  return fixture;
}

// ── Tests ────────────────────────────────────────────────────────────────────

describe('Fluid (a11y)', (): void => {
  afterEach((): void => {
    TestBed.resetTestingModule();
    document.body.innerHTML = '';
  });

  // ── 1. axe-core baseline ─────────────────────────────────────────────────

  it('passes axe with Fluid component in default state', async (): Promise<void> => {
    const fixture: ComponentFixture<FluidComponentA11yHost> =
      await createFixture<FluidComponentA11yHost>(FluidComponentA11yHost);
    await checkA11y(fixture, { rules: SKIP_COLOR_CONTRAST_RULES });
  });

  it('passes axe with FluidDirective in default state', async (): Promise<void> => {
    const fixture: ComponentFixture<FluidDirectiveA11yHost> =
      await createFixture<FluidDirectiveA11yHost>(FluidDirectiveA11yHost);
    await checkA11y(fixture, { rules: SKIP_COLOR_CONTRAST_RULES });
  });

  it('passes axe with FluidDirective disabled (uiLibFluid=false)', async (): Promise<void> => {
    const fixture: ComponentFixture<FluidDirectiveDisabledA11yHost> =
      await createFixture<FluidDirectiveDisabledA11yHost>(FluidDirectiveDisabledA11yHost);
    await checkA11y(fixture, { rules: SKIP_COLOR_CONTRAST_RULES });
  });

  it('passes axe with nested Fluid containers', async (): Promise<void> => {
    const fixture: ComponentFixture<FluidNestedA11yHost> =
      await createFixture<FluidNestedA11yHost>(FluidNestedA11yHost);
    await checkA11y(fixture, { rules: SKIP_COLOR_CONTRAST_RULES });
  });

  // ── 2. CSS class applied — prerequisite for width:100% (WCAG 1.4.10) ────
  //
  // The ui-lib-fluid SCSS sets `width: 100%` and `display: block` via the
  // `.ui-lib-fluid` class. Confirming the class is present on the host
  // verifies that children will expand to fill available width and reflow
  // correctly at 400 % browser zoom without horizontal scrollbars.

  it('Fluid component host carries the ui-lib-fluid class', async (): Promise<void> => {
    const fixture: ComponentFixture<FluidComponentA11yHost> =
      await createFixture<FluidComponentA11yHost>(FluidComponentA11yHost);
    const root: HTMLElement = fixture.nativeElement as HTMLElement;
    const host: HTMLElement = root.querySelector('ui-lib-fluid') as HTMLElement;
    expect(host.classList.contains('ui-lib-fluid')).toBe(true);
  });

  it('FluidDirective host carries the ui-lib-fluid class', async (): Promise<void> => {
    const fixture: ComponentFixture<FluidDirectiveA11yHost> =
      await createFixture<FluidDirectiveA11yHost>(FluidDirectiveA11yHost);
    const root: HTMLElement = fixture.nativeElement as HTMLElement;
    const host: HTMLElement = root.querySelector('div') as HTMLElement;
    expect(host.classList.contains('ui-lib-fluid')).toBe(true);
  });

  // ── 3. No overflow clipping (WCAG 1.4.10 critical guard) ─────────────────
  //
  // `overflow: hidden` must not be applied inline — it would clip content
  // at 400 % zoom. The SCSS for `.ui-lib-fluid` has been reviewed and does not
  // set `overflow: hidden` or `overflow: clip`; these tests guard against
  // regressions that would add it as an inline style.

  it('Fluid component host has no inline overflow style (no content clipping)', async (): Promise<void> => {
    const fixture: ComponentFixture<FluidComponentA11yHost> =
      await createFixture<FluidComponentA11yHost>(FluidComponentA11yHost);
    const root: HTMLElement = fixture.nativeElement as HTMLElement;
    const host: HTMLElement = root.querySelector('ui-lib-fluid') as HTMLElement;
    expect(host.style.overflow).toBe('');
    expect(host.style.overflowX).toBe('');
    expect(host.style.overflowY).toBe('');
  });

  it('FluidDirective host has no inline overflow style (no content clipping)', async (): Promise<void> => {
    const fixture: ComponentFixture<FluidDirectiveA11yHost> =
      await createFixture<FluidDirectiveA11yHost>(FluidDirectiveA11yHost);
    const root: HTMLElement = fixture.nativeElement as HTMLElement;
    const host: HTMLElement = root.querySelector('div') as HTMLElement;
    expect(host.style.overflow).toBe('');
    expect(host.style.overflowX).toBe('');
    expect(host.style.overflowY).toBe('');
  });

  // ── 4. No ARIA side effects ───────────────────────────────────────────────
  //
  // Fluid is a pure layout helper. It must not add any ARIA attributes to
  // the host element that could mislead assistive technologies.

  it('Fluid component adds no role attribute to the host element', async (): Promise<void> => {
    const fixture: ComponentFixture<FluidComponentA11yHost> =
      await createFixture<FluidComponentA11yHost>(FluidComponentA11yHost);
    const root: HTMLElement = fixture.nativeElement as HTMLElement;
    const host: HTMLElement = root.querySelector('ui-lib-fluid') as HTMLElement;
    expect(host.getAttribute('role')).toBeNull();
    expect(host.getAttribute('aria-label')).toBeNull();
    expect(host.getAttribute('aria-labelledby')).toBeNull();
  });

  it('FluidDirective adds no role or aria-label to the host element', async (): Promise<void> => {
    const fixture: ComponentFixture<FluidDirectiveA11yHost> =
      await createFixture<FluidDirectiveA11yHost>(FluidDirectiveA11yHost);
    const root: HTMLElement = fixture.nativeElement as HTMLElement;
    const host: HTMLElement = root.querySelector('div') as HTMLElement;
    expect(host.getAttribute('role')).toBeNull();
    expect(host.getAttribute('aria-label')).toBeNull();
    expect(host.getAttribute('aria-labelledby')).toBeNull();
  });

  // ── 5. Projected content accessibility ───────────────────────────────────

  it('projected content inside Fluid component is reachable in the DOM', async (): Promise<void> => {
    const fixture: ComponentFixture<FluidComponentA11yHost> =
      await createFixture<FluidComponentA11yHost>(FluidComponentA11yHost);
    const root: HTMLElement = fixture.nativeElement as HTMLElement;
    const input: HTMLElement | null = root.querySelector('input');
    expect(input).not.toBeNull();
    expect((input as HTMLElement).getAttribute('aria-hidden')).toBeNull();
  });
});
