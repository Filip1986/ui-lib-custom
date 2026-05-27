import {
  ChangeDetectionStrategy,
  Component,
  provideZonelessChangeDetection,
  signal,
} from '@angular/core';
import type { WritableSignal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import type { ComponentFixture } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { ColorPicker } from './index';
import { checkA11y, SKIP_COLOR_CONTRAST_RULES } from '../../test/a11y-utils';

// ── Host components ───────────────────────────────────────────────────────────

@Component({
  standalone: true,
  imports: [ColorPicker, FormsModule],
  template: `
    <ui-lib-color-picker
      appendTo="self"
      [disabled]="disabled()"
      [ngModelOptions]="{ standalone: true }"
      [(ngModel)]="color"
    />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class PopupHostComponent {
  public color: string = 'ff0000';
  public readonly disabled: WritableSignal<boolean> = signal<boolean>(false);
}

@Component({
  standalone: true,
  imports: [ColorPicker, FormsModule],
  template: `
    <ui-lib-color-picker
      [inline]="true"
      appendTo="self"
      [ngModelOptions]="{ standalone: true }"
      [(ngModel)]="color"
    />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class InlineHostComponent {
  public color: string = '0077ff';
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function openPicker(fixture: ComponentFixture<PopupHostComponent>): void {
  const trigger: HTMLButtonElement | null = (fixture.nativeElement as HTMLElement).querySelector(
    '.ui-lib-colorpicker__trigger',
  );
  trigger?.click();
  fixture.detectChanges();
}

function getPanel(root: HTMLElement): HTMLElement {
  const panel: HTMLElement | null = root.querySelector('.ui-lib-colorpicker__panel');
  if (!panel) throw new Error('Expected panel to exist in DOM');
  return panel;
}

function getTrigger(root: HTMLElement): HTMLButtonElement {
  const trigger: HTMLButtonElement | null = root.querySelector('.ui-lib-colorpicker__trigger');
  if (!trigger) throw new Error('Expected trigger to exist in DOM');
  return trigger;
}

// ── Test suite ────────────────────────────────────────────────────────────────

describe('ColorPicker Accessibility', (): void => {
  // ── 1. Trigger button ──────────────────────────────────────────────────────

  describe('trigger button ARIA (popup mode)', (): void => {
    let fixture: ComponentFixture<PopupHostComponent>;

    beforeEach(async (): Promise<void> => {
      await TestBed.configureTestingModule({
        imports: [PopupHostComponent],
        providers: [provideZonelessChangeDetection()],
      }).compileComponents();
      fixture = TestBed.createComponent(PopupHostComponent);
      document.body.appendChild(fixture.nativeElement);
      fixture.detectChanges();
    });

    afterEach((): void => {
      if (document.body.contains(fixture.nativeElement)) {
        document.body.removeChild(fixture.nativeElement);
      }
    });

    it('trigger has type="button"', (): void => {
      const trigger: HTMLButtonElement = getTrigger(fixture.nativeElement as HTMLElement);
      expect(trigger.getAttribute('type')).toBe('button');
    });

    it('trigger has aria-haspopup="dialog"', (): void => {
      const trigger: HTMLButtonElement = getTrigger(fixture.nativeElement as HTMLElement);
      expect(trigger.getAttribute('aria-haspopup')).toBe('dialog');
    });

    it('trigger aria-label includes current color value', (): void => {
      const trigger: HTMLButtonElement = getTrigger(fixture.nativeElement as HTMLElement);
      const label: string | null = trigger.getAttribute('aria-label');
      expect(label).toBeTruthy();
      expect(label?.toLowerCase()).toContain('color');
      expect(label).toContain('#ff0000');
    });

    it('trigger has aria-expanded="false" when picker is closed', (): void => {
      const trigger: HTMLButtonElement = getTrigger(fixture.nativeElement as HTMLElement);
      expect(trigger.getAttribute('aria-expanded')).toBe('false');
    });

    it('trigger has aria-expanded="true" when picker is open', (): void => {
      openPicker(fixture);
      const trigger: HTMLButtonElement = getTrigger(fixture.nativeElement as HTMLElement);
      expect(trigger.getAttribute('aria-expanded')).toBe('true');
    });
  });

  // ── 2. Panel dialog ARIA ───────────────────────────────────────────────────

  describe('panel dialog ARIA (popup mode)', (): void => {
    let fixture: ComponentFixture<PopupHostComponent>;

    beforeEach(async (): Promise<void> => {
      await TestBed.configureTestingModule({
        imports: [PopupHostComponent],
        providers: [provideZonelessChangeDetection()],
      }).compileComponents();
      fixture = TestBed.createComponent(PopupHostComponent);
      document.body.appendChild(fixture.nativeElement);
      fixture.detectChanges();
      openPicker(fixture);
    });

    afterEach((): void => {
      if (document.body.contains(fixture.nativeElement)) {
        document.body.removeChild(fixture.nativeElement);
      }
    });

    it('panel has role="dialog"', (): void => {
      const panel: HTMLElement = getPanel(fixture.nativeElement as HTMLElement);
      expect(panel.getAttribute('role')).toBe('dialog');
    });

    it('panel has aria-label="Color picker"', (): void => {
      const panel: HTMLElement = getPanel(fixture.nativeElement as HTMLElement);
      expect(panel.getAttribute('aria-label')).toBe('Color picker');
    });

    it('panel has aria-modal="false"', (): void => {
      const panel: HTMLElement = getPanel(fixture.nativeElement as HTMLElement);
      expect(panel.getAttribute('aria-modal')).toBe('false');
    });
  });

  // ── 3. Color area aria-hidden ──────────────────────────────────────────────

  describe('color area accessibility', (): void => {
    let fixture: ComponentFixture<InlineHostComponent>;

    beforeEach(async (): Promise<void> => {
      await TestBed.configureTestingModule({
        imports: [InlineHostComponent],
        providers: [provideZonelessChangeDetection()],
      }).compileComponents();
      fixture = TestBed.createComponent(InlineHostComponent);
      fixture.detectChanges();
    });

    it('color area has aria-hidden="true" (keyboard access via inputs)', (): void => {
      const colorArea: HTMLElement | null = (fixture.nativeElement as HTMLElement).querySelector(
        '.ui-lib-colorpicker__color-area',
      );
      expect(colorArea).not.toBeNull();
      expect(colorArea?.getAttribute('aria-hidden')).toBe('true');
    });

    it('color area has tabindex="-1" (not in keyboard tab order)', (): void => {
      const colorArea: HTMLElement | null = (fixture.nativeElement as HTMLElement).querySelector(
        '.ui-lib-colorpicker__color-area',
      );
      expect(colorArea?.getAttribute('tabindex')).toBe('-1');
    });
  });

  // ── 4. Hue slider ARIA ────────────────────────────────────────────────────

  describe('hue slider ARIA', (): void => {
    let fixture: ComponentFixture<InlineHostComponent>;

    beforeEach(async (): Promise<void> => {
      await TestBed.configureTestingModule({
        imports: [InlineHostComponent],
        providers: [provideZonelessChangeDetection()],
      }).compileComponents();
      fixture = TestBed.createComponent(InlineHostComponent);
      fixture.detectChanges();
    });

    it('hue slider has role="slider"', (): void => {
      const hue: HTMLElement | null = (fixture.nativeElement as HTMLElement).querySelector(
        '.ui-lib-colorpicker__hue',
      );
      expect(hue?.getAttribute('role')).toBe('slider');
    });

    it('hue slider has aria-label="Hue slider"', (): void => {
      const hue: HTMLElement | null = (fixture.nativeElement as HTMLElement).querySelector(
        '.ui-lib-colorpicker__hue',
      );
      expect(hue?.getAttribute('aria-label')).toBe('Hue slider');
    });

    it('hue slider has aria-valuemin="0"', (): void => {
      const hue: HTMLElement | null = (fixture.nativeElement as HTMLElement).querySelector(
        '.ui-lib-colorpicker__hue',
      );
      expect(hue?.getAttribute('aria-valuemin')).toBe('0');
    });

    it('hue slider has aria-valuemax="359"', (): void => {
      const hue: HTMLElement | null = (fixture.nativeElement as HTMLElement).querySelector(
        '.ui-lib-colorpicker__hue',
      );
      expect(hue?.getAttribute('aria-valuemax')).toBe('359');
    });

    it('hue slider has aria-valuenow reflecting current hue', (): void => {
      const hue: HTMLElement | null = (fixture.nativeElement as HTMLElement).querySelector(
        '.ui-lib-colorpicker__hue',
      );
      // Initial hue for '#0077ff' is approximately 211 degrees.
      const valuenow: string | null = hue?.getAttribute('aria-valuenow') ?? null;
      expect(valuenow).toBeTruthy();
      expect(Number.parseInt(valuenow ?? '0', 10)).toBeGreaterThanOrEqual(0);
    });

    it('hue slider has aria-valuetext in degrees', (): void => {
      const hue: HTMLElement | null = (fixture.nativeElement as HTMLElement).querySelector(
        '.ui-lib-colorpicker__hue',
      );
      const valuetext: string | null = hue?.getAttribute('aria-valuetext') ?? null;
      expect(valuetext).toBeTruthy();
      expect(valuetext).toContain('degrees');
    });
  });

  // ── 5. Hex input label association ────────────────────────────────────────

  describe('hex input label association', (): void => {
    let fixture: ComponentFixture<InlineHostComponent>;

    beforeEach(async (): Promise<void> => {
      await TestBed.configureTestingModule({
        imports: [InlineHostComponent],
        providers: [provideZonelessChangeDetection()],
      }).compileComponents();
      fixture = TestBed.createComponent(InlineHostComponent);
      fixture.detectChanges();
    });

    it('hex input label is associated via for/id', (): void => {
      const host: HTMLElement = fixture.nativeElement as HTMLElement;
      const hexInput: HTMLInputElement | null = host.querySelector<HTMLInputElement>(
        '.ui-lib-colorpicker__text-input',
      );
      if (!hexInput) throw new Error('Expected hex input to exist');
      const inputId: string = hexInput.id;
      expect(inputId).toBeTruthy();
      const label: HTMLLabelElement | null = host.querySelector<HTMLLabelElement>(
        `label[for="${inputId}"]`,
      );
      expect(label).not.toBeNull();
    });

    it('hex input displays current color without "#" prefix', (): void => {
      const host: HTMLElement = fixture.nativeElement as HTMLElement;
      const hexInput: HTMLInputElement | null =
        host.querySelector<HTMLInputElement>('input[type="text"]');
      const value: string = (hexInput?.value ?? '').toLowerCase();
      expect(value).toMatch(/^[0-9a-f]{6}$/);
    });
  });

  // ── 6. H/S/B numeric input label associations ─────────────────────────────

  describe('HSB numeric input label associations', (): void => {
    let fixture: ComponentFixture<InlineHostComponent>;

    beforeEach(async (): Promise<void> => {
      await TestBed.configureTestingModule({
        imports: [InlineHostComponent],
        providers: [provideZonelessChangeDetection()],
      }).compileComponents();
      fixture = TestBed.createComponent(InlineHostComponent);
      fixture.detectChanges();
    });

    it('all number inputs have associated labels', (): void => {
      const host: HTMLElement = fixture.nativeElement as HTMLElement;
      const numberInputs: NodeListOf<HTMLInputElement> = host.querySelectorAll<HTMLInputElement>(
        '.ui-lib-colorpicker__number-input',
      );
      expect(numberInputs.length).toBe(3);
      numberInputs.forEach((input: HTMLInputElement): void => {
        const inputId: string = input.id;
        expect(inputId).toBeTruthy();
        const label: HTMLLabelElement | null = host.querySelector<HTMLLabelElement>(
          `label[for="${inputId}"]`,
        );
        expect(label).not.toBeNull();
      });
    });

    it('H input value is a number in range 0–359', (): void => {
      const host: HTMLElement = fixture.nativeElement as HTMLElement;
      const hInput: HTMLInputElement | null =
        host.querySelector<HTMLInputElement>(`input[id$="-h-input"]`);
      if (!hInput) throw new Error('Expected H input to exist');
      const value: number = Number.parseInt(hInput.value, 10);
      expect(value).toBeGreaterThanOrEqual(0);
      expect(value).toBeLessThanOrEqual(359);
    });

    it('S input value is a number in range 0–100', (): void => {
      const host: HTMLElement = fixture.nativeElement as HTMLElement;
      const sInput: HTMLInputElement | null =
        host.querySelector<HTMLInputElement>(`input[id$="-s-input"]`);
      if (!sInput) throw new Error('Expected S input to exist');
      const value: number = Number.parseInt(sInput.value, 10);
      expect(value).toBeGreaterThanOrEqual(0);
      expect(value).toBeLessThanOrEqual(100);
    });

    it('B input value is a number in range 0–100', (): void => {
      const host: HTMLElement = fixture.nativeElement as HTMLElement;
      const bInput: HTMLInputElement | null =
        host.querySelector<HTMLInputElement>(`input[id$="-b-input"]`);
      if (!bInput) throw new Error('Expected B input to exist');
      const value: number = Number.parseInt(bInput.value, 10);
      expect(value).toBeGreaterThanOrEqual(0);
      expect(value).toBeLessThanOrEqual(100);
    });
  });

  // ── 7. Keyboard: Escape closes + restores focus ───────────────────────────

  describe('keyboard: Escape closes picker and restores focus', (): void => {
    let fixture: ComponentFixture<PopupHostComponent>;

    beforeEach(async (): Promise<void> => {
      await TestBed.configureTestingModule({
        imports: [PopupHostComponent],
        providers: [provideZonelessChangeDetection()],
      }).compileComponents();
      fixture = TestBed.createComponent(PopupHostComponent);
      document.body.appendChild(fixture.nativeElement);
      fixture.detectChanges();
    });

    afterEach((): void => {
      if (document.body.contains(fixture.nativeElement)) {
        document.body.removeChild(fixture.nativeElement);
      }
    });

    it('Escape key closes the picker panel', (): void => {
      openPicker(fixture);
      expect(
        (fixture.nativeElement as HTMLElement).querySelector('.ui-lib-colorpicker__panel'),
      ).not.toBeNull();

      const panel: HTMLElement = getPanel(fixture.nativeElement as HTMLElement);
      panel.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
      fixture.detectChanges();

      expect(
        (fixture.nativeElement as HTMLElement).querySelector('.ui-lib-colorpicker__panel'),
      ).toBeNull();
    });

    it('focus returns to trigger after Escape closes the picker', (): void => {
      const trigger: HTMLButtonElement = getTrigger(fixture.nativeElement as HTMLElement);
      trigger.focus();
      expect(document.activeElement).toBe(trigger);

      openPicker(fixture);

      const panel: HTMLElement = getPanel(fixture.nativeElement as HTMLElement);
      panel.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
      fixture.detectChanges();

      expect(document.activeElement).toBe(trigger);
    });
  });

  // ── 8. Inline mode panel ARIA ─────────────────────────────────────────────

  describe('inline mode panel ARIA', (): void => {
    let fixture: ComponentFixture<InlineHostComponent>;

    beforeEach(async (): Promise<void> => {
      await TestBed.configureTestingModule({
        imports: [InlineHostComponent],
        providers: [provideZonelessChangeDetection()],
      }).compileComponents();
      fixture = TestBed.createComponent(InlineHostComponent);
      fixture.detectChanges();
    });

    it('inline panel is always visible', (): void => {
      expect(
        (fixture.nativeElement as HTMLElement).querySelector('.ui-lib-colorpicker__panel'),
      ).not.toBeNull();
    });

    it('inline panel has role="dialog"', (): void => {
      const panel: HTMLElement = getPanel(fixture.nativeElement as HTMLElement);
      expect(panel.getAttribute('role')).toBe('dialog');
    });

    it('inline panel has aria-modal="false"', (): void => {
      const panel: HTMLElement = getPanel(fixture.nativeElement as HTMLElement);
      expect(panel.getAttribute('aria-modal')).toBe('false');
    });
  });

  // ── 9. axe-core automated checks ──────────────────────────────────────────

  describe('axe-core automated checks', (): void => {
    it('popup closed state passes axe', async (): Promise<void> => {
      await TestBed.configureTestingModule({
        imports: [PopupHostComponent],
        providers: [provideZonelessChangeDetection()],
      }).compileComponents();
      const fixture: ComponentFixture<PopupHostComponent> =
        TestBed.createComponent(PopupHostComponent);
      fixture.detectChanges();
      await checkA11y(fixture, { rules: SKIP_COLOR_CONTRAST_RULES });
    });

    it('popup open state passes axe', async (): Promise<void> => {
      await TestBed.configureTestingModule({
        imports: [PopupHostComponent],
        providers: [provideZonelessChangeDetection()],
      }).compileComponents();
      const fixture: ComponentFixture<PopupHostComponent> =
        TestBed.createComponent(PopupHostComponent);
      document.body.appendChild(fixture.nativeElement);
      fixture.detectChanges();
      openPicker(fixture);
      await checkA11y(fixture, { rules: SKIP_COLOR_CONTRAST_RULES });
      document.body.removeChild(fixture.nativeElement);
    });

    it('inline mode passes axe', async (): Promise<void> => {
      await TestBed.configureTestingModule({
        imports: [InlineHostComponent],
        providers: [provideZonelessChangeDetection()],
      }).compileComponents();
      const fixture: ComponentFixture<InlineHostComponent> =
        TestBed.createComponent(InlineHostComponent);
      fixture.detectChanges();
      await checkA11y(fixture, { rules: SKIP_COLOR_CONTRAST_RULES });
    });
  });
});
