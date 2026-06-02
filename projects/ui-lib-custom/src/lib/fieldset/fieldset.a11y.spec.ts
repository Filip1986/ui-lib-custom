import {
  ChangeDetectionStrategy,
  Component,
  provideZonelessChangeDetection,
  signal,
  type WritableSignal,
} from '@angular/core';
import type { ComponentFixture } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';

import type { ThemePreset, ThemeVariant } from 'ui-lib-custom/theme';
import { ThemeConfigService } from 'ui-lib-custom/theme';

import { checkA11y, SKIP_COLOR_CONTRAST_RULES } from '../../test/a11y-utils';
import { Fieldset } from './fieldset';

// ─── Mock theme ───────────────────────────────────────────────────────────────

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

// ─── Host components ──────────────────────────────────────────────────────────

@Component({
  standalone: true,
  imports: [Fieldset],
  template: `
    <ui-lib-fieldset legend="Personal Information">
      <p>Name, address, contact details.</p>
    </ui-lib-fieldset>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class BasicFieldsetHost {}

@Component({
  standalone: true,
  imports: [Fieldset],
  template: `
    <ui-lib-fieldset legend="Advanced Options" [toggleable]="true">
      <p>Toggleable fieldset body.</p>
    </ui-lib-fieldset>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class ToggleableFieldsetHost {}

@Component({
  standalone: true,
  imports: [Fieldset],
  template: `
    <ui-lib-fieldset legend="Hidden Section" [toggleable]="true" [collapsed]="true">
      <p>This is hidden by default.</p>
    </ui-lib-fieldset>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class CollapsedFieldsetHost {}

@Component({
  standalone: true,
  imports: [Fieldset],
  template: `
    <ui-lib-fieldset legend="Interactive" [toggleable]="true" [(collapsed)]="collapsed">
      <p>Interactive fieldset body.</p>
    </ui-lib-fieldset>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class InteractiveFieldsetHost {
  public readonly collapsed: WritableSignal<boolean> = signal<boolean>(false);
}

@Component({
  standalone: true,
  imports: [Fieldset],
  template: `
    <ui-lib-fieldset legend="Material" variant="material" [toggleable]="true">
      <p>Body</p>
    </ui-lib-fieldset>
    <ui-lib-fieldset legend="Bootstrap" variant="bootstrap" [toggleable]="true">
      <p>Body</p>
    </ui-lib-fieldset>
    <ui-lib-fieldset legend="Minimal" variant="minimal" [toggleable]="true">
      <p>Body</p>
    </ui-lib-fieldset>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class MultiVariantHost {}

@Component({
  standalone: true,
  imports: [Fieldset],
  template: `
    <ui-lib-fieldset legend="First Fieldset">
      <p>Body one</p>
    </ui-lib-fieldset>
    <ui-lib-fieldset legend="Second Fieldset">
      <p>Body two</p>
    </ui-lib-fieldset>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class TwoFieldsetsHost {}

@Component({
  standalone: true,
  imports: [Fieldset],
  template: `
    <ui-lib-fieldset [toggleable]="true">
      <span fieldsetLegend>Custom <strong>Legend</strong></span>
      <p>Body content.</p>
    </ui-lib-fieldset>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class CustomLegendHost {}

// ─── Helpers ──────────────────────────────────────────────────────────────────

const createdFixtures: ComponentFixture<unknown>[] = [];

async function setup<T>(componentType: new () => T): Promise<ComponentFixture<T>> {
  await TestBed.configureTestingModule({
    imports: [componentType],
    providers: [
      provideZonelessChangeDetection(),
      { provide: ThemeConfigService, useValue: buildMockTheme() },
    ],
  }).compileComponents();
  const fixture: ComponentFixture<T> = TestBed.createComponent(componentType);
  document.body.appendChild(fixture.nativeElement);
  fixture.detectChanges();
  await fixture.whenStable();
  createdFixtures.push(fixture as ComponentFixture<unknown>);
  return fixture;
}

function getFieldset(fixture: ComponentFixture<unknown>): HTMLElement {
  return (fixture.nativeElement as HTMLElement).querySelector('ui-lib-fieldset') as HTMLElement;
}

function getLegend(fixture: ComponentFixture<unknown>): HTMLElement {
  return (fixture.nativeElement as HTMLElement).querySelector(
    '.ui-lib-fieldset__legend',
  ) as HTMLElement;
}

function getContentWrapper(fixture: ComponentFixture<unknown>): HTMLElement {
  return (fixture.nativeElement as HTMLElement).querySelector(
    '.ui-lib-fieldset__content-wrapper',
  ) as HTMLElement;
}

// ─── Tests ────────────────────────────────────────────────────────────────────

describe('Fieldset Accessibility', (): void => {
  afterEach((): void => {
    createdFixtures.forEach((f: ComponentFixture<unknown>): void => f.destroy());
    createdFixtures.length = 0;
  });

  // ─── axe-core automated checks ───────────────────────────────────────────

  describe('axe-core', (): void => {
    it('basic fieldset: no axe violations', async (): Promise<void> => {
      const fixture: ComponentFixture<BasicFieldsetHost> = await setup(BasicFieldsetHost);
      await checkA11y(fixture, { rules: SKIP_COLOR_CONTRAST_RULES });
    });

    it('toggleable expanded fieldset: no axe violations', async (): Promise<void> => {
      const fixture: ComponentFixture<ToggleableFieldsetHost> = await setup(ToggleableFieldsetHost);
      await checkA11y(fixture, { rules: SKIP_COLOR_CONTRAST_RULES });
    });

    it('toggleable collapsed fieldset: no axe violations', async (): Promise<void> => {
      const fixture: ComponentFixture<CollapsedFieldsetHost> = await setup(CollapsedFieldsetHost);
      await checkA11y(fixture, { rules: SKIP_COLOR_CONTRAST_RULES });
    });

    it('all three variants: no axe violations', async (): Promise<void> => {
      const fixture: ComponentFixture<MultiVariantHost> = await setup(MultiVariantHost);
      await checkA11y(fixture, { rules: SKIP_COLOR_CONTRAST_RULES });
    });
  });

  // ─── ARIA structure ───────────────────────────────────────────────────────

  describe('ARIA structure', (): void => {
    it('host has role="group"', async (): Promise<void> => {
      const fixture: ComponentFixture<BasicFieldsetHost> = await setup(BasicFieldsetHost);
      expect(getFieldset(fixture).getAttribute('role')).toBe('group');
    });

    it('host has aria-labelledby pointing to the legend element id', async (): Promise<void> => {
      const fixture: ComponentFixture<BasicFieldsetHost> = await setup(BasicFieldsetHost);
      const fieldset: HTMLElement = getFieldset(fixture);
      const legend: HTMLElement = getLegend(fixture);
      const labelledBy: string | null = fieldset.getAttribute('aria-labelledby');
      expect(labelledBy).toBeTruthy();
      expect(labelledBy).toBe(legend.getAttribute('id'));
    });

    it('legend id matches expected format', async (): Promise<void> => {
      const fixture: ComponentFixture<BasicFieldsetHost> = await setup(BasicFieldsetHost);
      const legendId: string | null = getLegend(fixture).getAttribute('id');
      expect(legendId).toMatch(/^ui-lib-fieldset-\d+-legend$/);
    });

    it('multiple instances have unique legend IDs', async (): Promise<void> => {
      const fixture: ComponentFixture<TwoFieldsetsHost> = await setup(TwoFieldsetsHost);
      const legends: HTMLElement[] = Array.from(
        (fixture.nativeElement as HTMLElement).querySelectorAll<HTMLElement>(
          '.ui-lib-fieldset__legend',
        ),
      );
      expect(legends.length).toBe(2);
      const id1: string | null = legends[0]?.getAttribute('id') ?? null;
      const id2: string | null = legends[1]?.getAttribute('id') ?? null;
      expect(id1).toBeTruthy();
      expect(id2).toBeTruthy();
      expect(id1).not.toBe(id2);
    });

    it('content wrapper id matches expected format', async (): Promise<void> => {
      const fixture: ComponentFixture<BasicFieldsetHost> = await setup(BasicFieldsetHost);
      const contentId: string | null = getContentWrapper(fixture).getAttribute('id');
      expect(contentId).toMatch(/^ui-lib-fieldset-\d+-content$/);
    });

    it('toggle icon has aria-hidden="true" (decorative)', async (): Promise<void> => {
      const fixture: ComponentFixture<ToggleableFieldsetHost> = await setup(ToggleableFieldsetHost);
      const icon: Element | null = (fixture.nativeElement as HTMLElement).querySelector(
        '.ui-lib-fieldset__toggle-icon',
      );
      expect(icon?.getAttribute('aria-hidden')).toBe('true');
    });
  });

  // ─── Legend toggle element ARIA ───────────────────────────────────────────

  describe('legend toggle ARIA', (): void => {
    it('legend has no role when fieldset is not toggleable', async (): Promise<void> => {
      const fixture: ComponentFixture<BasicFieldsetHost> = await setup(BasicFieldsetHost);
      expect(getLegend(fixture).getAttribute('role')).toBeNull();
    });

    it('legend has role="button" when toggleable', async (): Promise<void> => {
      const fixture: ComponentFixture<ToggleableFieldsetHost> = await setup(ToggleableFieldsetHost);
      expect(getLegend(fixture).getAttribute('role')).toBe('button');
    });

    it('legend has aria-expanded="true" when expanded', async (): Promise<void> => {
      const fixture: ComponentFixture<ToggleableFieldsetHost> = await setup(ToggleableFieldsetHost);
      expect(getLegend(fixture).getAttribute('aria-expanded')).toBe('true');
    });

    it('legend has aria-expanded="false" when collapsed', async (): Promise<void> => {
      const fixture: ComponentFixture<CollapsedFieldsetHost> = await setup(CollapsedFieldsetHost);
      expect(getLegend(fixture).getAttribute('aria-expanded')).toBe('false');
    });

    it('legend has aria-controls pointing to content wrapper id', async (): Promise<void> => {
      const fixture: ComponentFixture<ToggleableFieldsetHost> = await setup(ToggleableFieldsetHost);
      const controls: string | null = getLegend(fixture).getAttribute('aria-controls');
      const contentId: string | null = getContentWrapper(fixture).getAttribute('id');
      expect(controls).toBeTruthy();
      expect(controls).toBe(contentId);
    });
  });

  // ─── Content visibility ARIA ──────────────────────────────────────────────

  describe('content visibility ARIA', (): void => {
    it('content wrapper has aria-hidden="true" when collapsed', async (): Promise<void> => {
      const fixture: ComponentFixture<CollapsedFieldsetHost> = await setup(CollapsedFieldsetHost);
      expect(getContentWrapper(fixture).getAttribute('aria-hidden')).toBe('true');
    });

    it('content wrapper has no aria-hidden when expanded', async (): Promise<void> => {
      const fixture: ComponentFixture<ToggleableFieldsetHost> = await setup(ToggleableFieldsetHost);
      expect(getContentWrapper(fixture).getAttribute('aria-hidden')).toBeNull();
    });

    it('content wrapper has no aria-hidden on non-toggleable fieldset', async (): Promise<void> => {
      const fixture: ComponentFixture<BasicFieldsetHost> = await setup(BasicFieldsetHost);
      expect(getContentWrapper(fixture).getAttribute('aria-hidden')).toBeNull();
    });
  });

  // ─── Keyboard interaction ─────────────────────────────────────────────────

  describe('keyboard interaction', (): void => {
    it('Enter key on legend collapses the fieldset', async (): Promise<void> => {
      const fixture: ComponentFixture<InteractiveFieldsetHost> =
        await setup(InteractiveFieldsetHost);
      const host: InteractiveFieldsetHost = fixture.componentInstance;
      const legend: HTMLElement = getLegend(fixture);

      legend.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
      fixture.detectChanges();
      await fixture.whenStable();

      expect(host.collapsed()).toBe(true);
    });

    it('Space key on legend collapses the fieldset', async (): Promise<void> => {
      const fixture: ComponentFixture<InteractiveFieldsetHost> =
        await setup(InteractiveFieldsetHost);
      const host: InteractiveFieldsetHost = fixture.componentInstance;
      const legend: HTMLElement = getLegend(fixture);

      legend.dispatchEvent(new KeyboardEvent('keydown', { key: ' ', bubbles: true }));
      fixture.detectChanges();
      await fixture.whenStable();

      expect(host.collapsed()).toBe(true);
    });

    it('legend can expand a collapsed fieldset via Enter key', async (): Promise<void> => {
      const fixture: ComponentFixture<InteractiveFieldsetHost> =
        await setup(InteractiveFieldsetHost);
      const host: InteractiveFieldsetHost = fixture.componentInstance;
      const legend: HTMLElement = getLegend(fixture);

      // Collapse first via click
      legend.click();
      fixture.detectChanges();
      await fixture.whenStable();
      expect(host.collapsed()).toBe(true);

      // Now expand via Enter
      legend.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
      fixture.detectChanges();
      await fixture.whenStable();

      expect(host.collapsed()).toBe(false);
    });
  });

  // ─── Content projection ───────────────────────────────────────────────────

  describe('content projection', (): void => {
    it('custom legend content is rendered inside the legend element', async (): Promise<void> => {
      const fixture: ComponentFixture<CustomLegendHost> = await setup(CustomLegendHost);
      const legend: HTMLElement = getLegend(fixture);
      expect(legend.textContent!.trim().length).toBeGreaterThan(0);
    });

    it('fieldset with custom legend still has aria-expanded on legend', async (): Promise<void> => {
      const fixture: ComponentFixture<CustomLegendHost> = await setup(CustomLegendHost);
      const legend: HTMLElement = getLegend(fixture);
      expect(legend.getAttribute('aria-expanded')).toBe('true');
    });
  });
});
