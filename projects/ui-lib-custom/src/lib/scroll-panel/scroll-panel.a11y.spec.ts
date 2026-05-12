import { ChangeDetectionStrategy, Component, provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import type { ComponentFixture } from '@angular/core/testing';
import { ScrollPanel } from './scroll-panel';
import { ThemeConfigService } from 'ui-lib-custom/theme';
import type { ThemeVariant, ThemePreset } from 'ui-lib-custom/theme';
import { signal, type WritableSignal } from '@angular/core';
import { checkA11y, SKIP_COLOR_CONTRAST_RULES } from '../../test/a11y-utils';

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
  imports: [ScrollPanel],
  template: `
    <ui-lib-scroll-panel ariaLabel="Product details" style="height: 200px;">
      <p>Scrollable content</p>
    </ui-lib-scroll-panel>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class LabelledScrollPanelHost {}

@Component({
  standalone: true,
  imports: [ScrollPanel],
  template: `
    <ui-lib-scroll-panel style="height: 200px;">
      <p>Content without label</p>
    </ui-lib-scroll-panel>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class UnlabelledScrollPanelHost {}

@Component({
  standalone: true,
  imports: [ScrollPanel],
  template: `
    <ui-lib-scroll-panel [ariaLabel]="label()" style="height: 200px;">
      <p>Dynamic label content</p>
    </ui-lib-scroll-panel>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class DynamicLabelHost {
  public readonly label: WritableSignal<string | null> = signal<string | null>('Initial label');
}

@Component({
  standalone: true,
  imports: [ScrollPanel],
  template: `
    <ui-lib-scroll-panel variant="material" ariaLabel="Material region" style="height: 200px;">
      <p>Material content</p>
    </ui-lib-scroll-panel>
    <ui-lib-scroll-panel variant="bootstrap" ariaLabel="Bootstrap region" style="height: 200px;">
      <p>Bootstrap content</p>
    </ui-lib-scroll-panel>
    <ui-lib-scroll-panel variant="minimal" ariaLabel="Minimal region" style="height: 200px;">
      <p>Minimal content</p>
    </ui-lib-scroll-panel>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class MultiVariantHost {}

@Component({
  standalone: true,
  imports: [ScrollPanel],
  template: `
    <ui-lib-scroll-panel ariaLabel="Panel One" style="height: 200px;">
      <p>First panel</p>
    </ui-lib-scroll-panel>
    <ui-lib-scroll-panel ariaLabel="Panel Two" style="height: 200px;">
      <p>Second panel</p>
    </ui-lib-scroll-panel>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class TwoPanelsHost {}

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

function getContent(fixture: ComponentFixture<unknown>): HTMLElement {
  return (fixture.nativeElement as HTMLElement).querySelector(
    '.ui-lib-scroll-panel__content'
  ) as HTMLElement;
}

// ─── Tests ────────────────────────────────────────────────────────────────────

describe('ScrollPanel Accessibility', (): void => {
  afterEach((): void => {
    createdFixtures.forEach((f: ComponentFixture<unknown>): void => f.destroy());
    createdFixtures.length = 0;
  });

  // ─── axe-core automated checks ───────────────────────────────────────────

  describe('axe-core', (): void => {
    it('labelled panel: no axe violations', async (): Promise<void> => {
      const fixture: ComponentFixture<LabelledScrollPanelHost> =
        await setup(LabelledScrollPanelHost);
      await checkA11y(fixture, { rules: SKIP_COLOR_CONTRAST_RULES });
    });

    it('unlabelled panel: no axe violations', async (): Promise<void> => {
      const fixture: ComponentFixture<UnlabelledScrollPanelHost> =
        await setup(UnlabelledScrollPanelHost);
      await checkA11y(fixture, { rules: SKIP_COLOR_CONTRAST_RULES });
    });

    it('all three variants: no axe violations', async (): Promise<void> => {
      const fixture: ComponentFixture<MultiVariantHost> = await setup(MultiVariantHost);
      await checkA11y(fixture, { rules: SKIP_COLOR_CONTRAST_RULES });
    });
  });

  // ─── ARIA structure ───────────────────────────────────────────────────────

  describe('ARIA structure', (): void => {
    it('content wrapper has role="region"', async (): Promise<void> => {
      const fixture: ComponentFixture<LabelledScrollPanelHost> =
        await setup(LabelledScrollPanelHost);
      expect(getContent(fixture).getAttribute('role')).toBe('region');
    });

    it('content wrapper has tabindex="0"', async (): Promise<void> => {
      const fixture: ComponentFixture<LabelledScrollPanelHost> =
        await setup(LabelledScrollPanelHost);
      expect(getContent(fixture).getAttribute('tabindex')).toBe('0');
    });

    it('content wrapper has aria-label when ariaLabel input is provided', async (): Promise<void> => {
      const fixture: ComponentFixture<LabelledScrollPanelHost> =
        await setup(LabelledScrollPanelHost);
      expect(getContent(fixture).getAttribute('aria-label')).toBe('Product details');
    });

    it('content wrapper has no aria-label when ariaLabel input is omitted', async (): Promise<void> => {
      const fixture: ComponentFixture<UnlabelledScrollPanelHost> =
        await setup(UnlabelledScrollPanelHost);
      expect(getContent(fixture).getAttribute('aria-label')).toBeNull();
    });

    it('content wrapper id matches expected format', async (): Promise<void> => {
      const fixture: ComponentFixture<LabelledScrollPanelHost> =
        await setup(LabelledScrollPanelHost);
      const contentId: string | null = getContent(fixture).getAttribute('id');
      expect(contentId).toMatch(/^ui-lib-scroll-panel-\d+-content$/);
    });

    it('multiple instances have unique content IDs', async (): Promise<void> => {
      const fixture: ComponentFixture<TwoPanelsHost> = await setup(TwoPanelsHost);
      const wrappers: HTMLElement[] = Array.from(
        (fixture.nativeElement as HTMLElement).querySelectorAll<HTMLElement>(
          '.ui-lib-scroll-panel__content'
        )
      );
      expect(wrappers.length).toBe(2);
      const id1: string | null = wrappers[0]?.getAttribute('id') ?? null;
      const id2: string | null = wrappers[1]?.getAttribute('id') ?? null;
      expect(id1).toBeTruthy();
      expect(id2).toBeTruthy();
      expect(id1).not.toBe(id2);
    });
  });

  // ─── Dynamic label ────────────────────────────────────────────────────────

  describe('dynamic ariaLabel', (): void => {
    it('aria-label updates when ariaLabel signal changes', async (): Promise<void> => {
      const fixture: ComponentFixture<DynamicLabelHost> = await setup(DynamicLabelHost);
      expect(getContent(fixture).getAttribute('aria-label')).toBe('Initial label');

      fixture.componentInstance.label.set('Updated label');
      fixture.detectChanges();
      await fixture.whenStable();

      expect(getContent(fixture).getAttribute('aria-label')).toBe('Updated label');
    });

    it('aria-label is removed when ariaLabel signal is set to null', async (): Promise<void> => {
      const fixture: ComponentFixture<DynamicLabelHost> = await setup(DynamicLabelHost);
      fixture.componentInstance.label.set(null);
      fixture.detectChanges();
      await fixture.whenStable();

      expect(getContent(fixture).getAttribute('aria-label')).toBeNull();
    });
  });

  // ─── Keyboard interaction ─────────────────────────────────────────────────

  describe('keyboard interaction', (): void => {
    it('content wrapper can receive focus', async (): Promise<void> => {
      const fixture: ComponentFixture<LabelledScrollPanelHost> =
        await setup(LabelledScrollPanelHost);
      const content: HTMLElement = getContent(fixture);
      content.focus();
      expect(document.activeElement).toBe(content);
    });

    it('ArrowDown keydown event is dispatched without error', async (): Promise<void> => {
      const fixture: ComponentFixture<LabelledScrollPanelHost> =
        await setup(LabelledScrollPanelHost);
      const content: HTMLElement = getContent(fixture);
      content.focus();
      expect((): void => {
        content.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
        fixture.detectChanges();
      }).not.toThrow();
    });

    it('PageDown keydown event is dispatched without error', async (): Promise<void> => {
      const fixture: ComponentFixture<LabelledScrollPanelHost> =
        await setup(LabelledScrollPanelHost);
      const content: HTMLElement = getContent(fixture);
      content.focus();
      expect((): void => {
        content.dispatchEvent(new KeyboardEvent('keydown', { key: 'PageDown', bubbles: true }));
        fixture.detectChanges();
      }).not.toThrow();
    });
  });

  // ─── Multi-variant ────────────────────────────────────────────────────────

  describe('multi-variant ARIA', (): void => {
    it('all three variants expose role="region" on content wrapper', async (): Promise<void> => {
      const fixture: ComponentFixture<MultiVariantHost> = await setup(MultiVariantHost);
      const wrappers: HTMLElement[] = Array.from(
        (fixture.nativeElement as HTMLElement).querySelectorAll<HTMLElement>(
          '.ui-lib-scroll-panel__content'
        )
      );
      expect(wrappers.length).toBe(3);
      wrappers.forEach((w: HTMLElement): void => {
        expect(w.getAttribute('role')).toBe('region');
        expect(w.getAttribute('tabindex')).toBe('0');
      });
    });
  });
});
