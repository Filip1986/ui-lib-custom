import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import type { WritableSignal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import type { ComponentFixture } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { checkA11y, SKIP_COLOR_CONTRAST_RULES } from '../../test/a11y-utils';
import { ProgressSpinner } from './progress-spinner';
import type { ProgressSpinnerSize } from './progress-spinner.types';

// ─── Host components ──────────────────────────────────────────────────────────

@Component({
  standalone: true,
  imports: [ProgressSpinner],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<ui-lib-progress-spinner />`,
})
class DefaultHostComponent {}

@Component({
  standalone: true,
  imports: [ProgressSpinner],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: ` <ui-lib-progress-spinner [ariaLabel]="ariaLabel()" [size]="size()" /> `,
})
class ConfigurableHostComponent {
  public readonly ariaLabel: WritableSignal<string> = signal<string>('Loading...');
  public readonly size: WritableSignal<ProgressSpinnerSize> = signal<ProgressSpinnerSize>('md');
}

@Component({
  standalone: true,
  imports: [ProgressSpinner],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ui-lib-progress-spinner />
    <ui-lib-progress-spinner />
  `,
})
class TwoSpinnersHostComponent {}

// ─── Setup helpers ────────────────────────────────────────────────────────────

async function createDefaultFixture(): Promise<ComponentFixture<DefaultHostComponent>> {
  await TestBed.configureTestingModule({
    imports: [DefaultHostComponent],
    providers: [provideZonelessChangeDetection()],
  }).compileComponents();
  const fixture: ComponentFixture<DefaultHostComponent> =
    TestBed.createComponent(DefaultHostComponent);
  document.body.appendChild(fixture.nativeElement);
  fixture.detectChanges();
  await fixture.whenStable();
  return fixture;
}

async function createConfigurableFixture(): Promise<ComponentFixture<ConfigurableHostComponent>> {
  await TestBed.configureTestingModule({
    imports: [ConfigurableHostComponent],
    providers: [provideZonelessChangeDetection()],
  }).compileComponents();
  const fixture: ComponentFixture<ConfigurableHostComponent> =
    TestBed.createComponent(ConfigurableHostComponent);
  document.body.appendChild(fixture.nativeElement);
  fixture.detectChanges();
  await fixture.whenStable();
  return fixture;
}

async function createTwoSpinnersFixture(): Promise<ComponentFixture<TwoSpinnersHostComponent>> {
  await TestBed.configureTestingModule({
    imports: [TwoSpinnersHostComponent],
    providers: [provideZonelessChangeDetection()],
  }).compileComponents();
  const fixture: ComponentFixture<TwoSpinnersHostComponent> =
    TestBed.createComponent(TwoSpinnersHostComponent);
  document.body.appendChild(fixture.nativeElement);
  fixture.detectChanges();
  await fixture.whenStable();
  return fixture;
}

function getSpinner(fixture: ComponentFixture<unknown>): HTMLElement {
  return (fixture.nativeElement as HTMLElement).querySelector(
    'ui-lib-progress-spinner'
  ) as HTMLElement;
}

function getAllSpinners(fixture: ComponentFixture<unknown>): NodeListOf<HTMLElement> {
  return (fixture.nativeElement as HTMLElement).querySelectorAll('ui-lib-progress-spinner');
}

function getSvg(fixture: ComponentFixture<unknown>): SVGElement {
  return (fixture.nativeElement as HTMLElement).querySelector('svg') as SVGElement;
}

// ─── Tests ────────────────────────────────────────────────────────────────────

describe('ProgressSpinner Accessibility', (): void => {
  afterEach((): void => {
    // Clean up any spinner elements appended to body
    document.body
      .querySelectorAll('[id^="uilib-progress-spinner"]')
      .forEach((el: Element): void => {
        el.parentElement?.removeChild(el);
      });
    // Also remove host wrappers (divs without ids)
    TestBed.resetTestingModule();
  });

  // ─── ARIA structure ─────────────────────────────────────────────────────────

  describe('ARIA structure', (): void => {
    it('host element has role="status"', async (): Promise<void> => {
      const fixture: ComponentFixture<DefaultHostComponent> = await createDefaultFixture();
      const spinner: HTMLElement = getSpinner(fixture);
      expect(spinner.getAttribute('role')).toBe('status');
    });

    it('host element has aria-label defaulting to "Loading..."', async (): Promise<void> => {
      const fixture: ComponentFixture<DefaultHostComponent> = await createDefaultFixture();
      const spinner: HTMLElement = getSpinner(fixture);
      expect(spinner.getAttribute('aria-label')).toBe('Loading...');
    });

    it('host element has aria-busy="true"', async (): Promise<void> => {
      const fixture: ComponentFixture<DefaultHostComponent> = await createDefaultFixture();
      const spinner: HTMLElement = getSpinner(fixture);
      expect(spinner.getAttribute('aria-busy')).toBe('true');
    });

    it('SVG has aria-hidden="true" to hide internals from screen readers', async (): Promise<void> => {
      const fixture: ComponentFixture<DefaultHostComponent> = await createDefaultFixture();
      const svg: SVGElement = getSvg(fixture);
      expect(svg.getAttribute('aria-hidden')).toBe('true');
    });

    it('SVG has focusable="false" to prevent focus in IE/Edge', async (): Promise<void> => {
      const fixture: ComponentFixture<DefaultHostComponent> = await createDefaultFixture();
      const svg: SVGElement = getSvg(fixture);
      expect(svg.getAttribute('focusable')).toBe('false');
    });

    it('host element has a unique id attribute', async (): Promise<void> => {
      const fixture: ComponentFixture<DefaultHostComponent> = await createDefaultFixture();
      const spinner: HTMLElement = getSpinner(fixture);
      const idAttr: string | null = spinner.getAttribute('id');
      expect(idAttr).toBeTruthy();
      expect(idAttr).toMatch(/^uilib-progress-spinner-\d+$/);
    });
  });

  // ─── ariaLabel input ────────────────────────────────────────────────────────

  describe('ariaLabel input', (): void => {
    it('reflects a custom ariaLabel', async (): Promise<void> => {
      const fixture: ComponentFixture<ConfigurableHostComponent> =
        await createConfigurableFixture();
      fixture.componentInstance.ariaLabel.set('Fetching results');
      fixture.detectChanges();
      const spinner: HTMLElement = getSpinner(fixture);
      expect(spinner.getAttribute('aria-label')).toBe('Fetching results');
    });

    it('updates aria-label reactively when ariaLabel signal changes', async (): Promise<void> => {
      const fixture: ComponentFixture<ConfigurableHostComponent> =
        await createConfigurableFixture();
      fixture.componentInstance.ariaLabel.set('Please wait');
      fixture.detectChanges();
      expect(getSpinner(fixture).getAttribute('aria-label')).toBe('Please wait');

      fixture.componentInstance.ariaLabel.set('Almost done');
      fixture.detectChanges();
      expect(getSpinner(fixture).getAttribute('aria-label')).toBe('Almost done');
    });
  });

  // ─── Unique IDs ─────────────────────────────────────────────────────────────

  describe('unique instance IDs', (): void => {
    it('two spinner instances on the same page have different ids', async (): Promise<void> => {
      const fixture: ComponentFixture<TwoSpinnersHostComponent> = await createTwoSpinnersFixture();
      const spinners: NodeListOf<HTMLElement> = getAllSpinners(fixture);
      expect(spinners.length).toBe(2);
      const id1: string | null = spinners[0]!.getAttribute('id');
      const id2: string | null = spinners[1]!.getAttribute('id');
      expect(id1).toBeTruthy();
      expect(id2).toBeTruthy();
      expect(id1).not.toBe(id2);
    });
  });

  // ─── Visual states ───────────────────────────────────────────────────────────

  describe('visual states', (): void => {
    it('applies correct size class for sm', async (): Promise<void> => {
      const fixture: ComponentFixture<ConfigurableHostComponent> =
        await createConfigurableFixture();
      fixture.componentInstance.size.set('sm');
      fixture.detectChanges();
      expect(getSpinner(fixture).classList).toContain('ui-lib-progress-spinner--size-sm');
    });

    it('applies correct size class for lg', async (): Promise<void> => {
      const fixture: ComponentFixture<ConfigurableHostComponent> =
        await createConfigurableFixture();
      fixture.componentInstance.size.set('lg');
      fixture.detectChanges();
      expect(getSpinner(fixture).classList).toContain('ui-lib-progress-spinner--size-lg');
    });
  });

  // ─── axe-core automated checks ──────────────────────────────────────────────

  describe('axe-core automated checks', (): void => {
    it('passes axe — default state', async (): Promise<void> => {
      const fixture: ComponentFixture<DefaultHostComponent> = await createDefaultFixture();
      await checkA11y(fixture, { rules: SKIP_COLOR_CONTRAST_RULES });
    });

    it('passes axe — custom ariaLabel', async (): Promise<void> => {
      const fixture: ComponentFixture<ConfigurableHostComponent> =
        await createConfigurableFixture();
      fixture.componentInstance.ariaLabel.set('Saving your changes');
      fixture.detectChanges();
      await checkA11y(fixture, { rules: SKIP_COLOR_CONTRAST_RULES });
    });

    it('passes axe — size="sm"', async (): Promise<void> => {
      const fixture: ComponentFixture<ConfigurableHostComponent> =
        await createConfigurableFixture();
      fixture.componentInstance.size.set('sm');
      fixture.detectChanges();
      await checkA11y(fixture, { rules: SKIP_COLOR_CONTRAST_RULES });
    });

    it('passes axe — size="lg"', async (): Promise<void> => {
      const fixture: ComponentFixture<ConfigurableHostComponent> =
        await createConfigurableFixture();
      fixture.componentInstance.size.set('lg');
      fixture.detectChanges();
      await checkA11y(fixture, { rules: SKIP_COLOR_CONTRAST_RULES });
    });

    it('passes axe — two spinners on the same page have unique ids', async (): Promise<void> => {
      const fixture: ComponentFixture<TwoSpinnersHostComponent> = await createTwoSpinnersFixture();
      await checkA11y(fixture, { rules: SKIP_COLOR_CONTRAST_RULES });
    });
  });
});
