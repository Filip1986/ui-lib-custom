import type { WritableSignal } from '@angular/core';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { provideZonelessChangeDetection } from '@angular/core';
import type { ComponentFixture } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';

import { checkA11y, SKIP_COLOR_CONTRAST_RULES } from '../../test/a11y-utils';
import { ProgressBar } from './progress-bar';
import type { ProgressBarMode } from './progress-bar.types';

// ─── Host components ──────────────────────────────────────────────────────────

@Component({
  standalone: true,
  imports: [ProgressBar],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<ui-lib-progress-bar [value]="50" ariaLabel="File upload progress" />`,
})
class DeterminateHostComponent {}

@Component({
  standalone: true,
  imports: [ProgressBar],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<ui-lib-progress-bar mode="indeterminate" />`,
})
class IndeterminateHostComponent {}

@Component({
  standalone: true,
  imports: [ProgressBar],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<ui-lib-progress-bar [value]="100" ariaLabel="File upload progress" />`,
})
class CompleteHostComponent {}

@Component({
  standalone: true,
  imports: [ProgressBar],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ui-lib-progress-bar
      [value]="value()"
      [mode]="mode()"
      [ariaLabel]="ariaLabel()"
      [ariaLabelledBy]="ariaLabelledBy()"
      [ariaValueText]="ariaValueText()"
      [completionLabel]="completionLabel()"
    />
  `,
})
class ConfigurableHostComponent {
  public readonly value: WritableSignal<number> = signal<number>(50);
  public readonly mode: WritableSignal<ProgressBarMode> = signal<ProgressBarMode>('determinate');
  public readonly ariaLabel: WritableSignal<string | null> = signal<string | null>(null);
  public readonly ariaLabelledBy: WritableSignal<string | null> = signal<string | null>(null);
  public readonly ariaValueText: WritableSignal<string | null> = signal<string | null>(null);
  public readonly completionLabel: WritableSignal<string | null> = signal<string | null>(null);
}

// ─── Setup helpers ────────────────────────────────────────────────────────────

async function createDeterminateFixture(): Promise<ComponentFixture<DeterminateHostComponent>> {
  await TestBed.configureTestingModule({
    imports: [DeterminateHostComponent],
    providers: [provideZonelessChangeDetection()],
  }).compileComponents();
  const fixture: ComponentFixture<DeterminateHostComponent> =
    TestBed.createComponent(DeterminateHostComponent);
  document.body.appendChild(fixture.nativeElement);
  fixture.detectChanges();
  await fixture.whenStable();
  return fixture;
}

async function createIndeterminateFixture(): Promise<ComponentFixture<IndeterminateHostComponent>> {
  await TestBed.configureTestingModule({
    imports: [IndeterminateHostComponent],
    providers: [provideZonelessChangeDetection()],
  }).compileComponents();
  const fixture: ComponentFixture<IndeterminateHostComponent> = TestBed.createComponent(
    IndeterminateHostComponent,
  );
  document.body.appendChild(fixture.nativeElement);
  fixture.detectChanges();
  await fixture.whenStable();
  return fixture;
}

async function createCompleteFixture(): Promise<ComponentFixture<CompleteHostComponent>> {
  await TestBed.configureTestingModule({
    imports: [CompleteHostComponent],
    providers: [provideZonelessChangeDetection()],
  }).compileComponents();
  const fixture: ComponentFixture<CompleteHostComponent> =
    TestBed.createComponent(CompleteHostComponent);
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

function getBar(fixture: ComponentFixture<unknown>): HTMLElement {
  return (fixture.nativeElement as HTMLElement).querySelector('ui-lib-progress-bar') as HTMLElement;
}

// ─── Tests ────────────────────────────────────────────────────────────────────

describe('ProgressBar Accessibility', (): void => {
  afterEach((): void => {
    TestBed.resetTestingModule();
  });

  // ─── Core ARIA structure ──────────────────────────────────────────────────

  describe('ARIA structure', (): void => {
    it('host element has role="progressbar"', async (): Promise<void> => {
      const fixture: ComponentFixture<DeterminateHostComponent> = await createDeterminateFixture();
      expect(getBar(fixture).getAttribute('role')).toBe('progressbar');
    });

    it('aria-valuemin is "0"', async (): Promise<void> => {
      const fixture: ComponentFixture<DeterminateHostComponent> = await createDeterminateFixture();
      expect(getBar(fixture).getAttribute('aria-valuemin')).toBe('0');
    });

    it('aria-valuemax is "100"', async (): Promise<void> => {
      const fixture: ComponentFixture<DeterminateHostComponent> = await createDeterminateFixture();
      expect(getBar(fixture).getAttribute('aria-valuemax')).toBe('100');
    });

    it('aria-valuenow reflects current value in determinate mode', async (): Promise<void> => {
      const fixture: ComponentFixture<DeterminateHostComponent> = await createDeterminateFixture();
      expect(getBar(fixture).getAttribute('aria-valuenow')).toBe('50');
    });

    it('aria-valuenow is absent (not "0") in indeterminate mode', async (): Promise<void> => {
      const fixture: ComponentFixture<IndeterminateHostComponent> =
        await createIndeterminateFixture();
      expect(getBar(fixture).getAttribute('aria-valuenow')).toBeNull();
    });
  });

  // ─── aria-valuetext ───────────────────────────────────────────────────────

  describe('aria-valuetext', (): void => {
    it('shows percentage in determinate mode by default', async (): Promise<void> => {
      const fixture: ComponentFixture<DeterminateHostComponent> = await createDeterminateFixture();
      expect(getBar(fixture).getAttribute('aria-valuetext')).toBe('50%');
    });

    it('shows "Loading…" in indeterminate mode by default', async (): Promise<void> => {
      const fixture: ComponentFixture<IndeterminateHostComponent> =
        await createIndeterminateFixture();
      expect(getBar(fixture).getAttribute('aria-valuetext')).toBe('Loading\u2026');
    });

    it('reflects a custom ariaValueText input', async (): Promise<void> => {
      const fixture: ComponentFixture<ConfigurableHostComponent> =
        await createConfigurableFixture();
      fixture.componentInstance.ariaValueText.set('75 Prozent');
      fixture.detectChanges();
      expect(getBar(fixture).getAttribute('aria-valuetext')).toBe('75 Prozent');
    });

    it('updates aria-valuetext reactively when value changes', async (): Promise<void> => {
      const fixture: ComponentFixture<ConfigurableHostComponent> =
        await createConfigurableFixture();
      fixture.componentInstance.value.set(80);
      fixture.detectChanges();
      expect(getBar(fixture).getAttribute('aria-valuetext')).toBe('80%');
    });
  });

  // ─── aria-label / aria-labelledby ────────────────────────────────────────

  describe('aria-label and aria-labelledby', (): void => {
    it('aria-label defaults to "Loading" in indeterminate mode', async (): Promise<void> => {
      const fixture: ComponentFixture<IndeterminateHostComponent> =
        await createIndeterminateFixture();
      expect(getBar(fixture).getAttribute('aria-label')).toBe('Loading');
    });

    it('aria-label defaults to "Progress" in determinate mode (progressbar must be named)', async (): Promise<void> => {
      // Configurable host defaults to determinate mode with no ariaLabel/ariaLabelledBy.
      const fixture: ComponentFixture<ConfigurableHostComponent> =
        await createConfigurableFixture();
      expect(getBar(fixture).getAttribute('aria-label')).toBe('Progress');
    });

    it('determinate default yields to an external aria-labelledby', async (): Promise<void> => {
      const fixture: ComponentFixture<ConfigurableHostComponent> =
        await createConfigurableFixture();
      fixture.componentInstance.ariaLabelledBy.set('progress-heading');
      fixture.detectChanges();
      await fixture.whenStable();
      expect(getBar(fixture).getAttribute('aria-label')).toBeNull();
      expect(getBar(fixture).getAttribute('aria-labelledby')).toBe('progress-heading');
    });

    it('aria-label reflects ariaLabel input', async (): Promise<void> => {
      const fixture: ComponentFixture<ConfigurableHostComponent> =
        await createConfigurableFixture();
      fixture.componentInstance.ariaLabel.set('Uploading file');
      fixture.detectChanges();
      expect(getBar(fixture).getAttribute('aria-label')).toBe('Uploading file');
    });

    it('ariaLabel input overrides the indeterminate default', async (): Promise<void> => {
      const fixture: ComponentFixture<ConfigurableHostComponent> =
        await createConfigurableFixture();
      fixture.componentInstance.mode.set('indeterminate');
      fixture.componentInstance.ariaLabel.set('Saving changes');
      fixture.detectChanges();
      expect(getBar(fixture).getAttribute('aria-label')).toBe('Saving changes');
    });

    it('aria-labelledby reflects ariaLabelledBy input', async (): Promise<void> => {
      const fixture: ComponentFixture<ConfigurableHostComponent> =
        await createConfigurableFixture();
      fixture.componentInstance.ariaLabelledBy.set('progress-heading');
      fixture.detectChanges();
      expect(getBar(fixture).getAttribute('aria-labelledby')).toBe('progress-heading');
    });

    it('aria-labelledby is absent when not set', async (): Promise<void> => {
      const fixture: ComponentFixture<DeterminateHostComponent> = await createDeterminateFixture();
      expect(getBar(fixture).getAttribute('aria-labelledby')).toBeNull();
    });
  });

  // ─── Completion live region ───────────────────────────────────────────────

  describe('completion live region', (): void => {
    it('live region is present when value reaches 100', async (): Promise<void> => {
      const fixture: ComponentFixture<CompleteHostComponent> = await createCompleteFixture();
      const liveRegion: Element | null = (fixture.nativeElement as HTMLElement).querySelector(
        '[aria-live="polite"]',
      );
      expect(liveRegion).not.toBeNull();
    });

    it('live region is absent when value is below 100', async (): Promise<void> => {
      const fixture: ComponentFixture<DeterminateHostComponent> = await createDeterminateFixture();
      const liveRegion: Element | null = (fixture.nativeElement as HTMLElement).querySelector(
        '[aria-live="polite"]',
      );
      expect(liveRegion).toBeNull();
    });

    it('live region announces "Complete" by default', async (): Promise<void> => {
      const fixture: ComponentFixture<CompleteHostComponent> = await createCompleteFixture();
      const liveRegion: Element = (fixture.nativeElement as HTMLElement).querySelector(
        '[aria-live="polite"]',
      ) as Element;
      expect(liveRegion.textContent!.trim()).toBe('Complete');
    });

    it('live region announces custom completionLabel', async (): Promise<void> => {
      const fixture: ComponentFixture<ConfigurableHostComponent> =
        await createConfigurableFixture();
      fixture.componentInstance.value.set(100);
      fixture.componentInstance.completionLabel.set('Upload fertig');
      fixture.detectChanges();
      const liveRegion: Element = (fixture.nativeElement as HTMLElement).querySelector(
        '[aria-live="polite"]',
      ) as Element;
      expect(liveRegion.textContent!.trim()).toBe('Upload fertig');
    });

    it('live region has aria-atomic="true"', async (): Promise<void> => {
      const fixture: ComponentFixture<CompleteHostComponent> = await createCompleteFixture();
      const liveRegion: Element = (fixture.nativeElement as HTMLElement).querySelector(
        '[aria-live="polite"]',
      ) as Element;
      expect(liveRegion.getAttribute('aria-atomic')).toBe('true');
    });
  });

  // ─── axe-core automated checks ────────────────────────────────────────────

  describe('axe-core automated checks', (): void => {
    it('passes axe — determinate state', async (): Promise<void> => {
      const fixture: ComponentFixture<DeterminateHostComponent> = await createDeterminateFixture();
      await checkA11y(fixture, { rules: SKIP_COLOR_CONTRAST_RULES });
    });

    it('passes axe — indeterminate state', async (): Promise<void> => {
      const fixture: ComponentFixture<IndeterminateHostComponent> =
        await createIndeterminateFixture();
      await checkA11y(fixture, { rules: SKIP_COLOR_CONTRAST_RULES });
    });

    it('passes axe — complete state (value=100)', async (): Promise<void> => {
      const fixture: ComponentFixture<CompleteHostComponent> = await createCompleteFixture();
      await checkA11y(fixture, { rules: SKIP_COLOR_CONTRAST_RULES });
    });

    it('passes axe — with custom ariaLabel', async (): Promise<void> => {
      const fixture: ComponentFixture<ConfigurableHostComponent> =
        await createConfigurableFixture();
      fixture.componentInstance.ariaLabel.set('File upload progress');
      fixture.detectChanges();
      await checkA11y(fixture, { rules: SKIP_COLOR_CONTRAST_RULES });
    });
  });
});
