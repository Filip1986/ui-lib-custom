import {
  ChangeDetectionStrategy,
  Component,
  provideZonelessChangeDetection,
  signal,
  type WritableSignal,
} from '@angular/core';
import { TestBed } from '@angular/core/testing';
import type { ComponentFixture } from '@angular/core/testing';
import { Accordion } from './accordion';
import { AccordionPanel } from './accordion-panel';
import { ThemeConfigService } from 'ui-lib-custom/theme';
import type { ThemeVariant, ThemePreset } from 'ui-lib-custom/theme';
import { checkA11y, SKIP_COLOR_CONTRAST_RULES } from '../../test/a11y-utils';

// ─── Shared mock theme ───────────────────────────────────────────────────────

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

// ─── DOM helpers ─────────────────────────────────────────────────────────────

function getButtons(fixture: ComponentFixture<unknown>): HTMLButtonElement[] {
  return Array.from(
    (fixture.nativeElement as HTMLElement).querySelectorAll<HTMLButtonElement>(
      '.ui-lib-accordion-panel__header',
    ),
  );
}

function getPanelRegions(fixture: ComponentFixture<unknown>): HTMLElement[] {
  return Array.from(
    (fixture.nativeElement as HTMLElement).querySelectorAll<HTMLElement>(
      '.ui-lib-accordion-panel__content',
    ),
  );
}

function dispatchKey(element: HTMLElement, key: string): void {
  element.dispatchEvent(new KeyboardEvent('keydown', { key, bubbles: true, cancelable: true }));
}

// ─── Host components ─────────────────────────────────────────────────────────

@Component({
  standalone: true,
  imports: [Accordion, AccordionPanel],
  template: `
    <ui-lib-accordion [expandMode]="expandMode()">
      <ui-lib-accordion-panel header="Panel 1" value="p1">
        <div>Content One</div>
      </ui-lib-accordion-panel>
      <ui-lib-accordion-panel header="Panel 2" value="p2" [disabled]="disableSecond()">
        <div>Content Two</div>
      </ui-lib-accordion-panel>
      <ui-lib-accordion-panel header="Panel 3" value="p3">
        <div>Content Three</div>
      </ui-lib-accordion-panel>
    </ui-lib-accordion>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class BasicHostComponent {
  public readonly expandMode: WritableSignal<'single' | 'multiple'> = signal<'single' | 'multiple'>(
    'single',
  );
  public readonly disableSecond: WritableSignal<boolean> = signal<boolean>(false);
}

@Component({
  standalone: true,
  imports: [Accordion, AccordionPanel],
  template: `
    <ui-lib-accordion>
      <ui-lib-accordion-panel header="A1">Content A1</ui-lib-accordion-panel>
      <ui-lib-accordion-panel header="A2">Content A2</ui-lib-accordion-panel>
    </ui-lib-accordion>
    <ui-lib-accordion>
      <ui-lib-accordion-panel header="B1">Content B1</ui-lib-accordion-panel>
      <ui-lib-accordion-panel header="B2">Content B2</ui-lib-accordion-panel>
    </ui-lib-accordion>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class TwoAccordionsHostComponent {}

// ─── Setup helpers ────────────────────────────────────────────────────────────

async function createBasicFixture(): Promise<ComponentFixture<BasicHostComponent>> {
  await TestBed.configureTestingModule({
    imports: [BasicHostComponent],
    providers: [
      provideZonelessChangeDetection(),
      { provide: ThemeConfigService, useValue: buildMockTheme() },
    ],
  }).compileComponents();

  const fixture: ComponentFixture<BasicHostComponent> = TestBed.createComponent(BasicHostComponent);
  document.body.appendChild(fixture.nativeElement);
  fixture.detectChanges();
  await fixture.whenStable();
  return fixture;
}

async function createTwoAccordionsFixture(): Promise<ComponentFixture<TwoAccordionsHostComponent>> {
  await TestBed.configureTestingModule({
    imports: [TwoAccordionsHostComponent],
    providers: [
      provideZonelessChangeDetection(),
      { provide: ThemeConfigService, useValue: buildMockTheme() },
    ],
  }).compileComponents();

  const fixture: ComponentFixture<TwoAccordionsHostComponent> = TestBed.createComponent(
    TwoAccordionsHostComponent,
  );
  document.body.appendChild(fixture.nativeElement);
  fixture.detectChanges();
  await fixture.whenStable();
  return fixture;
}

// ─── Tests ────────────────────────────────────────────────────────────────────

describe('Accordion Accessibility', (): void => {
  afterEach((): void => {
    const el: HTMLElement | null = document.body.querySelector('basic-host, two-accordions-host');
    if (el) {
      document.body.removeChild(el);
    }
    // Clean up any appended nativeElements
    const appended: NodeListOf<Element> = document.body.querySelectorAll(
      'ui-lib-accordion, .ui-lib-accordion-panel',
    );
    appended.forEach((node: Element): void => {
      if (node.parentElement === document.body) {
        document.body.removeChild(node);
      }
    });
  });

  // ── ARIA attribute structure ────────────────────────────────────────────────

  describe('ARIA attributes', (): void => {
    it('renders header buttons with aria-expanded="false" when all panels are collapsed', async (): Promise<void> => {
      const fixture: ComponentFixture<BasicHostComponent> = await createBasicFixture();
      const buttons: HTMLButtonElement[] = getButtons(fixture);
      expect(buttons.length).toBe(3);
      for (const button of buttons) {
        expect(button.getAttribute('aria-expanded')).toBe('false');
      }
    });

    it('updates aria-expanded to "true" on the toggled header button', async (): Promise<void> => {
      const fixture: ComponentFixture<BasicHostComponent> = await createBasicFixture();
      const buttons: HTMLButtonElement[] = getButtons(fixture);
      buttons[0]!.click();
      fixture.detectChanges();
      expect(buttons[0]!.getAttribute('aria-expanded')).toBe('true');
      expect(buttons[1]!.getAttribute('aria-expanded')).toBe('false');
    });

    it('links each header button id to the panel region aria-labelledby', async (): Promise<void> => {
      const fixture: ComponentFixture<BasicHostComponent> = await createBasicFixture();
      const buttons: HTMLButtonElement[] = getButtons(fixture);
      const regions: HTMLElement[] = getPanelRegions(fixture);
      expect(buttons.length).toBe(regions.length);
      for (let i: number = 0; i < buttons.length; i += 1) {
        const buttonId: string | null = buttons[i]!.getAttribute('id');
        expect(buttonId).toBeTruthy();
        expect(regions[i]!.getAttribute('aria-labelledby')).toBe(buttonId);
      }
    });

    it('links each header button aria-controls to the panel region id', async (): Promise<void> => {
      const fixture: ComponentFixture<BasicHostComponent> = await createBasicFixture();
      const buttons: HTMLButtonElement[] = getButtons(fixture);
      const regions: HTMLElement[] = getPanelRegions(fixture);
      for (let i: number = 0; i < buttons.length; i += 1) {
        const controls: string | null = buttons[i]!.getAttribute('aria-controls');
        expect(controls).toBeTruthy();
        expect(regions[i]!.getAttribute('id')).toBe(controls);
      }
    });

    it('sets role="region" on each panel content element', async (): Promise<void> => {
      const fixture: ComponentFixture<BasicHostComponent> = await createBasicFixture();
      const regions: HTMLElement[] = getPanelRegions(fixture);
      for (const region of regions) {
        expect(region.getAttribute('role')).toBe('region');
      }
    });
  });

  // ── Disabled state ─────────────────────────────────────────────────────────

  describe('Disabled state', (): void => {
    it('sets aria-disabled="true" on disabled header buttons', async (): Promise<void> => {
      const fixture: ComponentFixture<BasicHostComponent> = await createBasicFixture();
      fixture.componentInstance.disableSecond.set(true);
      fixture.detectChanges();
      const buttons: HTMLButtonElement[] = getButtons(fixture);
      expect(buttons[1]!.getAttribute('aria-disabled')).toBe('true');
    });

    it('does NOT set HTML disabled attribute on disabled header buttons', async (): Promise<void> => {
      const fixture: ComponentFixture<BasicHostComponent> = await createBasicFixture();
      fixture.componentInstance.disableSecond.set(true);
      fixture.detectChanges();
      const buttons: HTMLButtonElement[] = getButtons(fixture);
      expect(buttons[1]!.hasAttribute('disabled')).toBe(false);
    });

    it('keeps disabled header buttons in the tab sequence (no tabindex=-1)', async (): Promise<void> => {
      const fixture: ComponentFixture<BasicHostComponent> = await createBasicFixture();
      fixture.componentInstance.disableSecond.set(true);
      fixture.detectChanges();
      const buttons: HTMLButtonElement[] = getButtons(fixture);
      // tabindex attribute should not be -1; buttons are naturally focusable
      expect(buttons[1]!.getAttribute('tabindex')).not.toBe('-1');
    });

    it('does not toggle a disabled panel on Enter key', async (): Promise<void> => {
      const fixture: ComponentFixture<BasicHostComponent> = await createBasicFixture();
      fixture.componentInstance.disableSecond.set(true);
      fixture.detectChanges();
      const buttons: HTMLButtonElement[] = getButtons(fixture);
      dispatchKey(buttons[1]!, 'Enter');
      fixture.detectChanges();
      expect(buttons[1]!.getAttribute('aria-expanded')).toBe('false');
    });
  });

  // ── Unique IDs per accordion instance ────────────────────────────────────────

  describe('Unique IDs across accordion instances', (): void => {
    it('generates distinct IDs for buttons and panels in separate accordion instances', async (): Promise<void> => {
      const fixture: ComponentFixture<TwoAccordionsHostComponent> =
        await createTwoAccordionsFixture();
      const allButtons: HTMLButtonElement[] = getButtons(fixture);
      const allRegions: HTMLElement[] = getPanelRegions(fixture);

      const buttonIds: string[] = allButtons
        .map((b: HTMLButtonElement): string | null => b.getAttribute('id'))
        .filter((id: string | null): id is string => id !== null);
      const regionIds: string[] = allRegions
        .map((r: HTMLElement): string | null => r.getAttribute('id'))
        .filter((id: string | null): id is string => id !== null);

      // All IDs must be unique
      expect(new Set(buttonIds).size).toBe(buttonIds.length);
      expect(new Set(regionIds).size).toBe(regionIds.length);
    });

    it('uses accordion-scoped IDs (pattern: ui-lib-accordion-N-header-M)', async (): Promise<void> => {
      const fixture: ComponentFixture<TwoAccordionsHostComponent> =
        await createTwoAccordionsFixture();
      const allButtons: HTMLButtonElement[] = getButtons(fixture);
      for (const button of allButtons) {
        const id: string | null = button.getAttribute('id');
        expect(id).toMatch(/^ui-lib-accordion-\d+-header-\d+$/);
      }
    });
  });

  // ── Keyboard navigation ────────────────────────────────────────────────────

  describe('Keyboard interaction', (): void => {
    it('toggles a panel on Enter key', async (): Promise<void> => {
      const fixture: ComponentFixture<BasicHostComponent> = await createBasicFixture();
      const buttons: HTMLButtonElement[] = getButtons(fixture);
      dispatchKey(buttons[0]!, 'Enter');
      fixture.detectChanges();
      expect(buttons[0]!.getAttribute('aria-expanded')).toBe('true');
    });

    it('toggles a panel on Space key', async (): Promise<void> => {
      const fixture: ComponentFixture<BasicHostComponent> = await createBasicFixture();
      const buttons: HTMLButtonElement[] = getButtons(fixture);
      dispatchKey(buttons[2]!, ' ');
      fixture.detectChanges();
      expect(buttons[2]!.getAttribute('aria-expanded')).toBe('true');
    });

    it('moves focus to next panel on ArrowDown', async (): Promise<void> => {
      const fixture: ComponentFixture<BasicHostComponent> = await createBasicFixture();
      const buttons: HTMLButtonElement[] = getButtons(fixture);
      buttons[0]!.focus();
      dispatchKey(buttons[0]!, 'ArrowDown');
      expect(document.activeElement).toBe(buttons[1]!);
    });

    it('moves focus to previous panel on ArrowUp', async (): Promise<void> => {
      const fixture: ComponentFixture<BasicHostComponent> = await createBasicFixture();
      const buttons: HTMLButtonElement[] = getButtons(fixture);
      buttons[2]!.focus();
      dispatchKey(buttons[2]!, 'ArrowUp');
      expect(document.activeElement).toBe(buttons[1]!);
    });
  });

  // ── Single-mode aria consistency ────────────────────────────────────────────

  describe('Single expand mode aria consistency', (): void => {
    it('sets aria-expanded=false on the previously open panel when a new one opens', async (): Promise<void> => {
      const fixture: ComponentFixture<BasicHostComponent> = await createBasicFixture();
      fixture.componentInstance.expandMode.set('single');
      fixture.detectChanges();
      const buttons: HTMLButtonElement[] = getButtons(fixture);

      // Open panel 0
      buttons[0]!.click();
      fixture.detectChanges();
      expect(buttons[0]!.getAttribute('aria-expanded')).toBe('true');

      // Open panel 2 — panel 0 must collapse
      buttons[2]!.click();
      fixture.detectChanges();
      expect(buttons[0]!.getAttribute('aria-expanded')).toBe('false');
      expect(buttons[2]!.getAttribute('aria-expanded')).toBe('true');
    });
  });

  // ── axe-core checks ─────────────────────────────────────────────────────────

  describe('axe-core', (): void => {
    it('passes axe with all panels collapsed', async (): Promise<void> => {
      const fixture: ComponentFixture<BasicHostComponent> = await createBasicFixture();
      await checkA11y(fixture, { rules: SKIP_COLOR_CONTRAST_RULES });
    });

    it('passes axe with one panel expanded', async (): Promise<void> => {
      const fixture: ComponentFixture<BasicHostComponent> = await createBasicFixture();
      fixture.componentInstance.expandMode.set('multiple');
      fixture.detectChanges();
      const buttons: HTMLButtonElement[] = getButtons(fixture);
      buttons[0]!.click();
      fixture.detectChanges();
      await checkA11y(fixture, { rules: SKIP_COLOR_CONTRAST_RULES });
    });

    it('passes axe with multiple panels expanded', async (): Promise<void> => {
      const fixture: ComponentFixture<BasicHostComponent> = await createBasicFixture();
      fixture.componentInstance.expandMode.set('multiple');
      fixture.detectChanges();
      const buttons: HTMLButtonElement[] = getButtons(fixture);
      buttons[0]!.click();
      fixture.detectChanges();
      buttons[2]!.click();
      fixture.detectChanges();
      await checkA11y(fixture, { rules: SKIP_COLOR_CONTRAST_RULES });
    });
  });
});
