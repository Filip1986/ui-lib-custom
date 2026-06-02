import {
  ChangeDetectionStrategy,
  Component,
  provideZonelessChangeDetection,
  signal,
  type WritableSignal,
} from '@angular/core';
import { TestBed } from '@angular/core/testing';
import type { ComponentFixture } from '@angular/core/testing';
import { Panel } from './panel';
import { ThemeConfigService } from 'ui-lib-custom/theme';
import type { ThemeVariant, ThemePreset } from 'ui-lib-custom/theme';
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
  imports: [Panel],
  template: `
    <ui-lib-panel header="User Details">
      <p>Panel body content.</p>
    </ui-lib-panel>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class BasicPanelHost {}

@Component({
  standalone: true,
  imports: [Panel],
  template: `
    <ui-lib-panel header="Settings" [toggleable]="true">
      <p>Toggleable panel body.</p>
    </ui-lib-panel>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class ToggleablePanelHost {}

@Component({
  standalone: true,
  imports: [Panel],
  template: `
    <ui-lib-panel header="Settings" [toggleable]="true" [collapsed]="true">
      <p>This is hidden.</p>
    </ui-lib-panel>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class CollapsedPanelHost {}

@Component({
  standalone: true,
  imports: [Panel],
  template: `
    <ui-lib-panel header="Panel" [toggleable]="true" [(collapsed)]="collapsed">
      <p>Interactive panel body.</p>
    </ui-lib-panel>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class InteractivePanelHost {
  public readonly collapsed: WritableSignal<boolean> = signal<boolean>(false);
}

@Component({
  standalone: true,
  imports: [Panel],
  template: `
    <ui-lib-panel header="Material Panel" variant="material" [toggleable]="true">
      <p>Body</p>
    </ui-lib-panel>
    <ui-lib-panel header="Bootstrap Panel" variant="bootstrap" [toggleable]="true">
      <p>Body</p>
    </ui-lib-panel>
    <ui-lib-panel header="Minimal Panel" variant="minimal" [toggleable]="true">
      <p>Body</p>
    </ui-lib-panel>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class MultiVariantHost {}

@Component({
  standalone: true,
  imports: [Panel],
  template: `
    <ui-lib-panel header="Panel One">
      <p>Body one</p>
    </ui-lib-panel>
    <ui-lib-panel header="Panel Two">
      <p>Body two</p>
    </ui-lib-panel>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class TwoPanelsHost {}

@Component({
  standalone: true,
  imports: [Panel],
  template: `
    <ui-lib-panel [toggleable]="true">
      <span panelHeader>Custom <strong>Header</strong></span>
      <p>Body content.</p>
    </ui-lib-panel>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class CustomHeaderHost {}

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

function getPanel(fixture: ComponentFixture<unknown>): HTMLElement {
  return (fixture.nativeElement as HTMLElement).querySelector('ui-lib-panel') as HTMLElement;
}

function getHeader(fixture: ComponentFixture<unknown>): HTMLElement {
  return (fixture.nativeElement as HTMLElement).querySelector(
    '.ui-lib-panel__header',
  ) as HTMLElement;
}

function getToggleButton(fixture: ComponentFixture<unknown>): HTMLElement | null {
  return (fixture.nativeElement as HTMLElement).querySelector('.ui-lib-panel__toggle-button');
}

function getContentWrapper(fixture: ComponentFixture<unknown>): HTMLElement {
  return (fixture.nativeElement as HTMLElement).querySelector(
    '.ui-lib-panel__content-wrapper',
  ) as HTMLElement;
}

// ─── Tests ────────────────────────────────────────────────────────────────────

describe('Panel Accessibility', (): void => {
  afterEach((): void => {
    createdFixtures.forEach((f: ComponentFixture<unknown>): void => f.destroy());
    createdFixtures.length = 0;
  });

  // ─── axe-core automated checks ───────────────────────────────────────────

  describe('axe-core', (): void => {
    it('basic panel: no axe violations', async (): Promise<void> => {
      const fixture: ComponentFixture<BasicPanelHost> = await setup(BasicPanelHost);
      await checkA11y(fixture, { rules: SKIP_COLOR_CONTRAST_RULES });
    });

    it('toggleable expanded panel: no axe violations', async (): Promise<void> => {
      const fixture: ComponentFixture<ToggleablePanelHost> = await setup(ToggleablePanelHost);
      await checkA11y(fixture, { rules: SKIP_COLOR_CONTRAST_RULES });
    });

    it('toggleable collapsed panel: no axe violations', async (): Promise<void> => {
      const fixture: ComponentFixture<CollapsedPanelHost> = await setup(CollapsedPanelHost);
      await checkA11y(fixture, { rules: SKIP_COLOR_CONTRAST_RULES });
    });

    it('all three variants: no axe violations', async (): Promise<void> => {
      const fixture: ComponentFixture<MultiVariantHost> = await setup(MultiVariantHost);
      await checkA11y(fixture, { rules: SKIP_COLOR_CONTRAST_RULES });
    });
  });

  // ─── ARIA structure ───────────────────────────────────────────────────────

  describe('ARIA structure', (): void => {
    it('host has role="region"', async (): Promise<void> => {
      const fixture: ComponentFixture<BasicPanelHost> = await setup(BasicPanelHost);
      expect(getPanel(fixture).getAttribute('role')).toBe('region');
    });

    it('host has aria-labelledby pointing to the header element id', async (): Promise<void> => {
      const fixture: ComponentFixture<BasicPanelHost> = await setup(BasicPanelHost);
      const panel: HTMLElement = getPanel(fixture);
      const header: HTMLElement = getHeader(fixture);
      const labelledBy: string | null = panel.getAttribute('aria-labelledby');
      expect(labelledBy).toBeTruthy();
      expect(labelledBy).toBe(header.getAttribute('id'));
    });

    it('header id matches expected format', async (): Promise<void> => {
      const fixture: ComponentFixture<BasicPanelHost> = await setup(BasicPanelHost);
      const headerId: string | null = getHeader(fixture).getAttribute('id');
      expect(headerId).toMatch(/^ui-lib-panel-\d+-header$/);
    });

    it('multiple instances have unique header IDs', async (): Promise<void> => {
      const fixture: ComponentFixture<TwoPanelsHost> = await setup(TwoPanelsHost);
      const headers: HTMLElement[] = Array.from(
        (fixture.nativeElement as HTMLElement).querySelectorAll<HTMLElement>(
          '.ui-lib-panel__header',
        ),
      );
      expect(headers.length).toBe(2);
      const id1: string | null = headers[0]?.getAttribute('id') ?? null;
      const id2: string | null = headers[1]?.getAttribute('id') ?? null;
      expect(id1).toBeTruthy();
      expect(id2).toBeTruthy();
      expect(id1).not.toBe(id2);
    });

    it('content wrapper id matches expected format', async (): Promise<void> => {
      const fixture: ComponentFixture<BasicPanelHost> = await setup(BasicPanelHost);
      const contentId: string | null = getContentWrapper(fixture).getAttribute('id');
      expect(contentId).toMatch(/^ui-lib-panel-\d+-content$/);
    });
  });

  // ─── Toggle button ARIA ───────────────────────────────────────────────────

  describe('toggle button ARIA', (): void => {
    it('toggle button is absent when not toggleable', async (): Promise<void> => {
      const fixture: ComponentFixture<BasicPanelHost> = await setup(BasicPanelHost);
      expect(getToggleButton(fixture)).toBeNull();
    });

    it('toggle button has aria-expanded="true" when expanded', async (): Promise<void> => {
      const fixture: ComponentFixture<ToggleablePanelHost> = await setup(ToggleablePanelHost);
      expect(getToggleButton(fixture)?.getAttribute('aria-expanded')).toBe('true');
    });

    it('toggle button has aria-expanded="false" when collapsed', async (): Promise<void> => {
      const fixture: ComponentFixture<CollapsedPanelHost> = await setup(CollapsedPanelHost);
      expect(getToggleButton(fixture)?.getAttribute('aria-expanded')).toBe('false');
    });

    it('toggle button has aria-controls pointing to content wrapper id', async (): Promise<void> => {
      const fixture: ComponentFixture<ToggleablePanelHost> = await setup(ToggleablePanelHost);
      const controls: string | null =
        getToggleButton(fixture)?.getAttribute('aria-controls') ?? null;
      const contentId: string | null = getContentWrapper(fixture).getAttribute('id');
      expect(controls).toBeTruthy();
      expect(controls).toBe(contentId);
    });

    it('toggle button has an accessible label', async (): Promise<void> => {
      const fixture: ComponentFixture<ToggleablePanelHost> = await setup(ToggleablePanelHost);
      const btn: HTMLElement | null = getToggleButton(fixture);
      const ariaLabel: string | null = btn?.getAttribute('aria-label') ?? null;
      const textLabel: string = (btn?.textContent ?? '').trim();
      const label: string = ariaLabel ?? textLabel;
      expect(label.length).toBeGreaterThan(0);
    });

    it('toggle icon has aria-hidden="true" (decorative)', async (): Promise<void> => {
      const fixture: ComponentFixture<ToggleablePanelHost> = await setup(ToggleablePanelHost);
      const icon: Element | null = (fixture.nativeElement as HTMLElement).querySelector(
        '.ui-lib-panel__toggle-icon',
      );
      expect(icon?.getAttribute('aria-hidden')).toBe('true');
    });
  });

  // ─── Content visibility ARIA ──────────────────────────────────────────────

  describe('content visibility ARIA', (): void => {
    it('content wrapper has aria-hidden="true" when collapsed', async (): Promise<void> => {
      const fixture: ComponentFixture<CollapsedPanelHost> = await setup(CollapsedPanelHost);
      expect(getContentWrapper(fixture).getAttribute('aria-hidden')).toBe('true');
    });

    it('content wrapper has no aria-hidden when expanded', async (): Promise<void> => {
      const fixture: ComponentFixture<ToggleablePanelHost> = await setup(ToggleablePanelHost);
      expect(getContentWrapper(fixture).getAttribute('aria-hidden')).toBeNull();
    });

    it('content wrapper has no aria-hidden on non-toggleable panel', async (): Promise<void> => {
      const fixture: ComponentFixture<BasicPanelHost> = await setup(BasicPanelHost);
      expect(getContentWrapper(fixture).getAttribute('aria-hidden')).toBeNull();
    });
  });

  // ─── Keyboard interaction ─────────────────────────────────────────────────

  describe('keyboard interaction', (): void => {
    it('Enter key on toggle button collapses the panel', async (): Promise<void> => {
      const fixture: ComponentFixture<InteractivePanelHost> = await setup(InteractivePanelHost);
      const host: InteractivePanelHost = fixture.componentInstance;
      const btn: HTMLElement = getToggleButton(fixture) as HTMLElement;

      btn.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
      fixture.detectChanges();
      await fixture.whenStable();

      expect(host.collapsed()).toBe(true);
    });

    it('Space key on toggle button collapses the panel', async (): Promise<void> => {
      const fixture: ComponentFixture<InteractivePanelHost> = await setup(InteractivePanelHost);
      const host: InteractivePanelHost = fixture.componentInstance;
      const btn: HTMLElement = getToggleButton(fixture) as HTMLElement;

      btn.dispatchEvent(new KeyboardEvent('keydown', { key: ' ', bubbles: true }));
      fixture.detectChanges();
      await fixture.whenStable();

      expect(host.collapsed()).toBe(true);
    });

    it('toggle button can expand a collapsed panel via Enter key', async (): Promise<void> => {
      const fixture: ComponentFixture<InteractivePanelHost> = await setup(InteractivePanelHost);
      const host: InteractivePanelHost = fixture.componentInstance;

      // First collapse via click
      (getToggleButton(fixture) as HTMLButtonElement).click();
      fixture.detectChanges();
      await fixture.whenStable();
      expect(host.collapsed()).toBe(true);

      // Now expand via Enter
      (getToggleButton(fixture) as HTMLElement).dispatchEvent(
        new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }),
      );
      fixture.detectChanges();
      await fixture.whenStable();

      expect(host.collapsed()).toBe(false);
    });
  });

  // ─── Content projection ───────────────────────────────────────────────────

  describe('content projection', (): void => {
    it('custom header content is rendered inside the header element', async (): Promise<void> => {
      const fixture: ComponentFixture<CustomHeaderHost> = await setup(CustomHeaderHost);
      const header: HTMLElement = getHeader(fixture);
      expect(header.textContent!.trim().length).toBeGreaterThan(0);
    });

    it('panel with custom header still has toggle button with aria-expanded', async (): Promise<void> => {
      const fixture: ComponentFixture<CustomHeaderHost> = await setup(CustomHeaderHost);
      const btn: HTMLElement | null = getToggleButton(fixture);
      expect(btn).toBeTruthy();
      expect(btn?.getAttribute('aria-expanded')).toBe('true');
    });
  });
});
