import {
  ChangeDetectionStrategy,
  Component,
  provideZonelessChangeDetection,
  signal,
} from '@angular/core';
import type { DebugElement, WritableSignal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import type { ComponentFixture } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { ThemeConfigService } from 'ui-lib-custom/theme';
import type { ThemePreset, ThemeVariant } from 'ui-lib-custom/theme';
import { DatePickerComponent } from './date-picker';
import { createDate } from './date-utils';
import { checkA11y, SKIP_COLOR_CONTRAST_RULES } from '../../test/a11y-utils';

// ── Shared mock theme ─────────────────────────────────────────────────────────

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

// ── Host components ───────────────────────────────────────────────────────────

@Component({
  standalone: true,
  imports: [FormsModule, DatePickerComponent],
  template: `
    <label [attr.for]="'dp-test-' + id">Birth date</label>
    <ui-lib-date-picker
      [inputId]="'dp-test-' + id"
      appendTo="self"
      [ngModelOptions]="{ standalone: true }"
      [(ngModel)]="value"
    />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class PopupHostComponent {
  public readonly id: string = '1';
  public value: Date | null = null;
}

@Component({
  standalone: true,
  imports: [FormsModule, DatePickerComponent],
  template: `
    <ui-lib-date-picker
      [inline]="true"
      appendTo="self"
      [ngModelOptions]="{ standalone: true }"
      [(ngModel)]="value"
    />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class InlineHostComponent {
  public value: Date | null = null;
}

@Component({
  standalone: true,
  imports: [FormsModule, DatePickerComponent],
  template: `
    <ui-lib-date-picker
      [inline]="true"
      appendTo="self"
      [ngModelOptions]="{ standalone: true }"
      [(ngModel)]="value"
      [minDate]="minDate"
      [maxDate]="maxDate"
    />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class InlineWithConstraintsHostComponent {
  public value: Date | null = null;
  public minDate: Date = createDate(2025, 0, 5);
  public maxDate: Date = createDate(2025, 11, 20);
}

@Component({
  standalone: true,
  imports: [FormsModule, DatePickerComponent],
  template: `
    <ui-lib-date-picker
      inputId="dp-a11y-two-1"
      appendTo="self"
      [ngModelOptions]="{ standalone: true }"
      [(ngModel)]="value1"
    />
    <ui-lib-date-picker
      inputId="dp-a11y-two-2"
      appendTo="self"
      [ngModelOptions]="{ standalone: true }"
      [(ngModel)]="value2"
    />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class TwoPickersHostComponent {
  public value1: Date | null = null;
  public value2: Date | null = null;
}

// ── Setup helpers ─────────────────────────────────────────────────────────────

async function createPopupFixture(): Promise<ComponentFixture<PopupHostComponent>> {
  await TestBed.configureTestingModule({
    imports: [PopupHostComponent],
    providers: [
      provideZonelessChangeDetection(),
      { provide: ThemeConfigService, useValue: buildMockTheme() },
    ],
  }).compileComponents();

  const fixture: ComponentFixture<PopupHostComponent> = TestBed.createComponent(PopupHostComponent);
  document.body.appendChild(fixture.nativeElement);
  fixture.detectChanges();
  await fixture.whenStable();
  return fixture;
}

async function createInlineFixture(): Promise<ComponentFixture<InlineHostComponent>> {
  await TestBed.configureTestingModule({
    imports: [InlineHostComponent],
    providers: [
      provideZonelessChangeDetection(),
      { provide: ThemeConfigService, useValue: buildMockTheme() },
    ],
  }).compileComponents();

  const fixture: ComponentFixture<InlineHostComponent> =
    TestBed.createComponent(InlineHostComponent);
  document.body.appendChild(fixture.nativeElement);
  fixture.detectChanges();
  await fixture.whenStable();
  return fixture;
}

async function createInlineWithConstraintsFixture(): Promise<
  ComponentFixture<InlineWithConstraintsHostComponent>
> {
  await TestBed.configureTestingModule({
    imports: [InlineWithConstraintsHostComponent],
    providers: [
      provideZonelessChangeDetection(),
      { provide: ThemeConfigService, useValue: buildMockTheme() },
    ],
  }).compileComponents();

  const fixture: ComponentFixture<InlineWithConstraintsHostComponent> = TestBed.createComponent(
    InlineWithConstraintsHostComponent,
  );
  document.body.appendChild(fixture.nativeElement);
  fixture.detectChanges();
  await fixture.whenStable();
  return fixture;
}

async function createTwoPickersFixture(): Promise<ComponentFixture<TwoPickersHostComponent>> {
  await TestBed.configureTestingModule({
    imports: [TwoPickersHostComponent],
    providers: [
      provideZonelessChangeDetection(),
      { provide: ThemeConfigService, useValue: buildMockTheme() },
    ],
  }).compileComponents();

  const fixture: ComponentFixture<TwoPickersHostComponent> =
    TestBed.createComponent(TwoPickersHostComponent);
  document.body.appendChild(fixture.nativeElement);
  fixture.detectChanges();
  await fixture.whenStable();
  return fixture;
}

function openPopup(fixture: ComponentFixture<PopupHostComponent>): void {
  const picker: DatePickerComponent = getPickerComponent(fixture);
  picker.showOverlay();
  fixture.detectChanges();
}

function getPickerFromFixture<T>(fixture: ComponentFixture<T>): DatePickerComponent {
  const debugEls: DebugElement[] = fixture.debugElement.queryAll(By.directive(DatePickerComponent));
  const debugEl: DebugElement | undefined = debugEls[0];
  if (!debugEl) throw new Error('Expected DatePickerComponent in fixture');
  const componentInstance: unknown = debugEl.componentInstance;
  if (!(componentInstance instanceof DatePickerComponent)) {
    throw new Error('Expected queried instance to be DatePickerComponent.');
  }
  return componentInstance;
}

function getPickerComponent(fixture: ComponentFixture<PopupHostComponent>): DatePickerComponent {
  return getPickerFromFixture(fixture);
}

function getPanel(root: HTMLElement): HTMLElement {
  const panel: HTMLElement | null = root.querySelector('.ui-lib-datepicker__panel');
  if (!panel) throw new Error('Expected panel to exist in DOM');
  return panel;
}

function getInput(root: HTMLElement): HTMLInputElement {
  const input: HTMLInputElement | null = root.querySelector('.ui-lib-datepicker__input');
  if (!input) throw new Error('Expected combobox input to exist in DOM');
  return input;
}

function getGrid(root: HTMLElement): HTMLElement {
  const grid: HTMLElement | null = root.querySelector('[role="grid"]');
  if (!grid) throw new Error('Expected role="grid" element to exist in DOM');
  return grid;
}

function getColumnHeaders(root: HTMLElement): HTMLElement[] {
  return Array.from(root.querySelectorAll('[role="columnheader"]'));
}

function getGridCells(root: HTMLElement): HTMLElement[] {
  return Array.from(root.querySelectorAll('[role="gridcell"]'));
}

function getDateButtonSelector(date: Date): string {
  return `button[data-date-key='${date.getFullYear()}-${date.getMonth()}-${date.getDate()}']`;
}

const MONTH_NAMES: readonly string[] = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const FULL_DAY_NAMES: readonly string[] = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

// ── Tests ─────────────────────────────────────────────────────────────────────

describe('DatePicker Accessibility', (): void => {
  afterEach((): void => {
    const appended: NodeListOf<Element> = document.body.querySelectorAll(
      'ui-lib-date-picker, [data-testid]',
    );
    appended.forEach((node: Element): void => {
      if (node.parentElement === document.body) {
        document.body.removeChild(node);
      }
    });
    // Also clean up host component elements
    const hostEls: NodeListOf<Element> = document.body.querySelectorAll(
      'ng-component, div[ng-version]',
    );
    hostEls.forEach((node: Element): void => {
      if (node.parentElement === document.body) {
        document.body.removeChild(node);
      }
    });
  });

  // ── 1. Trigger input ARIA (popup mode) ──────────────────────────────────────

  describe('trigger input ARIA (popup mode)', (): void => {
    it('has role="combobox" on the input', async (): Promise<void> => {
      const fixture: ComponentFixture<PopupHostComponent> = await createPopupFixture();
      const root: HTMLElement = fixture.nativeElement as HTMLElement;
      const input: HTMLInputElement = getInput(root);
      expect(input.getAttribute('role')).toBe('combobox');
    });

    it('has aria-haspopup="dialog" on the input', async (): Promise<void> => {
      const fixture: ComponentFixture<PopupHostComponent> = await createPopupFixture();
      const root: HTMLElement = fixture.nativeElement as HTMLElement;
      const input: HTMLInputElement = getInput(root);
      expect(input.getAttribute('aria-haspopup')).toBe('dialog');
    });

    it('has aria-expanded="false" when panel is closed', async (): Promise<void> => {
      const fixture: ComponentFixture<PopupHostComponent> = await createPopupFixture();
      const root: HTMLElement = fixture.nativeElement as HTMLElement;
      const input: HTMLInputElement = getInput(root);
      expect(input.getAttribute('aria-expanded')).toBe('false');
    });

    it('has aria-expanded="true" when panel is open', async (): Promise<void> => {
      const fixture: ComponentFixture<PopupHostComponent> = await createPopupFixture();
      const root: HTMLElement = fixture.nativeElement as HTMLElement;
      openPopup(fixture);
      const input: HTMLInputElement = getInput(root);
      expect(input.getAttribute('aria-expanded')).toBe('true');
    });

    it('sets aria-controls to the panel id when open', async (): Promise<void> => {
      const fixture: ComponentFixture<PopupHostComponent> = await createPopupFixture();
      const root: HTMLElement = fixture.nativeElement as HTMLElement;
      openPopup(fixture);
      const input: HTMLInputElement = getInput(root);
      const panel: HTMLElement = getPanel(root);
      const controlsId: string | null = input.getAttribute('aria-controls');
      expect(controlsId).toBeTruthy();
      expect(panel.id).toBe(controlsId);
    });

    it('has no aria-controls when panel is closed', async (): Promise<void> => {
      const fixture: ComponentFixture<PopupHostComponent> = await createPopupFixture();
      const root: HTMLElement = fixture.nativeElement as HTMLElement;
      const input: HTMLInputElement = getInput(root);
      expect(input.getAttribute('aria-controls')).toBeNull();
    });

    it('is associated with its label via for/id', async (): Promise<void> => {
      const fixture: ComponentFixture<PopupHostComponent> = await createPopupFixture();
      const root: HTMLElement = fixture.nativeElement as HTMLElement;
      const label: HTMLLabelElement | null = root.querySelector('label');
      const input: HTMLInputElement = getInput(root);
      expect(label).toBeTruthy();
      expect(label!.getAttribute('for')).toBe(input.id);
      expect(input.id).toBeTruthy();
    });
  });

  // ── 2. Dialog panel ARIA ──────────────────────────────────────────────────

  describe('dialog panel ARIA', (): void => {
    it('has role="dialog" on the panel', async (): Promise<void> => {
      const fixture: ComponentFixture<PopupHostComponent> = await createPopupFixture();
      const root: HTMLElement = fixture.nativeElement as HTMLElement;
      openPopup(fixture);
      const panel: HTMLElement = getPanel(root);
      expect(panel.getAttribute('role')).toBe('dialog');
    });

    it('has aria-modal="true" on the popup panel', async (): Promise<void> => {
      const fixture: ComponentFixture<PopupHostComponent> = await createPopupFixture();
      const root: HTMLElement = fixture.nativeElement as HTMLElement;
      openPopup(fixture);
      const panel: HTMLElement = getPanel(root);
      expect(panel.getAttribute('aria-modal')).toBe('true');
    });

    it('has aria-modal="false" on inline panel', async (): Promise<void> => {
      const fixture: ComponentFixture<InlineHostComponent> = await createInlineFixture();
      const root: HTMLElement = fixture.nativeElement as HTMLElement;
      const panel: HTMLElement = getPanel(root);
      expect(panel.getAttribute('aria-modal')).toBe('false');
    });

    it('has an accessible name on the panel', async (): Promise<void> => {
      const fixture: ComponentFixture<PopupHostComponent> = await createPopupFixture();
      const root: HTMLElement = fixture.nativeElement as HTMLElement;
      openPopup(fixture);
      const panel: HTMLElement = getPanel(root);
      const ariaLabel: string | null = panel.getAttribute('aria-label');
      const ariaLabelledBy: string | null = panel.getAttribute('aria-labelledby');
      // At least one naming mechanism must be present
      expect(ariaLabel || ariaLabelledBy).toBeTruthy();
    });

    it('has a live region inside the panel for month change announcements', async (): Promise<void> => {
      const fixture: ComponentFixture<InlineHostComponent> = await createInlineFixture();
      const root: HTMLElement = fixture.nativeElement as HTMLElement;
      const liveRegion: HTMLElement | null = root.querySelector('[aria-live="polite"]');
      expect(liveRegion).toBeTruthy();
      expect(liveRegion!.getAttribute('aria-atomic')).toBe('true');
    });

    it('live region contains the current month and year label', async (): Promise<void> => {
      const fixture: ComponentFixture<InlineHostComponent> = await createInlineFixture();
      const root: HTMLElement = fixture.nativeElement as HTMLElement;
      const liveRegion: HTMLElement | null = root.querySelector('[aria-live="polite"]');
      expect(liveRegion).toBeTruthy();
      // Should contain something like "January 2025" (month + year text)
      expect(liveRegion!.textContent!.trim().length).toBeGreaterThan(0);
    });
  });

  // ── 3. Navigation buttons ─────────────────────────────────────────────────

  describe('navigation button ARIA', (): void => {
    it('prev-month button has an aria-label containing the word "Previous"', async (): Promise<void> => {
      const fixture: ComponentFixture<InlineHostComponent> = await createInlineFixture();
      const root: HTMLElement = fixture.nativeElement as HTMLElement;
      const prevBtn: HTMLButtonElement | null = root.querySelector(
        '.ui-lib-datepicker__prev-button',
      );
      expect(prevBtn).toBeTruthy();
      const label: string | null = prevBtn!.getAttribute('aria-label');
      expect(label).toBeTruthy();
      expect(label!.toLowerCase()).toContain('previous');
    });

    it('prev-month button aria-label includes a month name', async (): Promise<void> => {
      const fixture: ComponentFixture<InlineHostComponent> = await createInlineFixture();
      const root: HTMLElement = fixture.nativeElement as HTMLElement;
      const prevBtn: HTMLButtonElement | null = root.querySelector(
        '.ui-lib-datepicker__prev-button',
      );
      const label: string = prevBtn!.getAttribute('aria-label') ?? '';
      const hasMonthName: boolean = MONTH_NAMES.some((name: string): boolean =>
        label.includes(name),
      );
      expect(hasMonthName).toBe(true);
    });

    it('next-month button has an aria-label containing the word "Next"', async (): Promise<void> => {
      const fixture: ComponentFixture<InlineHostComponent> = await createInlineFixture();
      const root: HTMLElement = fixture.nativeElement as HTMLElement;
      const nextBtn: HTMLButtonElement | null = root.querySelector(
        '.ui-lib-datepicker__next-button',
      );
      expect(nextBtn).toBeTruthy();
      const label: string | null = nextBtn!.getAttribute('aria-label');
      expect(label).toBeTruthy();
      expect(label!.toLowerCase()).toContain('next');
    });

    it('next-month button aria-label includes a month name', async (): Promise<void> => {
      const fixture: ComponentFixture<InlineHostComponent> = await createInlineFixture();
      const root: HTMLElement = fixture.nativeElement as HTMLElement;
      const nextBtn: HTMLButtonElement | null = root.querySelector(
        '.ui-lib-datepicker__next-button',
      );
      const label: string = nextBtn!.getAttribute('aria-label') ?? '';
      const hasMonthName: boolean = MONTH_NAMES.some((name: string): boolean =>
        label.includes(name),
      );
      expect(hasMonthName).toBe(true);
    });

    it('prev and next button labels change after month navigation', async (): Promise<void> => {
      const fixture: ComponentFixture<InlineHostComponent> = await createInlineFixture();
      const root: HTMLElement = fixture.nativeElement as HTMLElement;
      const prevBtn: HTMLButtonElement | null = root.querySelector(
        '.ui-lib-datepicker__prev-button',
      );
      const nextBtn: HTMLButtonElement | null = root.querySelector(
        '.ui-lib-datepicker__next-button',
      );
      const prevLabelBefore: string = prevBtn!.getAttribute('aria-label') ?? '';
      const nextLabelBefore: string = nextBtn!.getAttribute('aria-label') ?? '';
      nextBtn!.click();
      fixture.detectChanges();
      const prevLabelAfter: string = prevBtn!.getAttribute('aria-label') ?? '';
      const nextLabelAfter: string = nextBtn!.getAttribute('aria-label') ?? '';
      expect(prevLabelAfter).not.toBe(prevLabelBefore);
      expect(nextLabelAfter).not.toBe(nextLabelBefore);
    });
  });

  // ── 4. Calendar grid ──────────────────────────────────────────────────────

  describe('calendar grid ARIA', (): void => {
    it('has role="grid" on the calendar table', async (): Promise<void> => {
      const fixture: ComponentFixture<InlineHostComponent> = await createInlineFixture();
      const root: HTMLElement = fixture.nativeElement as HTMLElement;
      const grid: HTMLElement = getGrid(root);
      expect(grid).toBeTruthy();
    });

    it('grid has an aria-label describing the current month', async (): Promise<void> => {
      const fixture: ComponentFixture<InlineHostComponent> = await createInlineFixture();
      const root: HTMLElement = fixture.nativeElement as HTMLElement;
      const grid: HTMLElement = getGrid(root);
      const label: string | null = grid.getAttribute('aria-label');
      expect(label).toBeTruthy();
      expect(label!.length).toBeGreaterThan(0);
    });

    it('has role="row" on table rows', async (): Promise<void> => {
      const fixture: ComponentFixture<InlineHostComponent> = await createInlineFixture();
      const root: HTMLElement = fixture.nativeElement as HTMLElement;
      const rows: NodeListOf<Element> = root.querySelectorAll('[role="grid"] [role="row"]');
      expect(rows.length).toBeGreaterThan(0);
    });

    it('has role="columnheader" on weekday header cells', async (): Promise<void> => {
      const fixture: ComponentFixture<InlineHostComponent> = await createInlineFixture();
      const root: HTMLElement = fixture.nativeElement as HTMLElement;
      const headers: HTMLElement[] = getColumnHeaders(root);
      expect(headers.length).toBe(7);
    });

    it('each columnheader has an abbr attribute with the full day name', async (): Promise<void> => {
      const fixture: ComponentFixture<InlineHostComponent> = await createInlineFixture();
      const root: HTMLElement = fixture.nativeElement as HTMLElement;
      const headers: HTMLElement[] = getColumnHeaders(root);
      for (const header of headers) {
        const abbr: string | null = header.getAttribute('abbr');
        expect(abbr).toBeTruthy();
        expect(FULL_DAY_NAMES).toContain(abbr);
      }
    });

    it('each columnheader has an aria-label with the full day name', async (): Promise<void> => {
      const fixture: ComponentFixture<InlineHostComponent> = await createInlineFixture();
      const root: HTMLElement = fixture.nativeElement as HTMLElement;
      const headers: HTMLElement[] = getColumnHeaders(root);
      for (const header of headers) {
        const ariaLabel: string | null = header.getAttribute('aria-label');
        expect(ariaLabel).toBeTruthy();
        expect(FULL_DAY_NAMES).toContain(ariaLabel);
      }
    });

    it('has role="gridcell" on day cells', async (): Promise<void> => {
      const fixture: ComponentFixture<InlineHostComponent> = await createInlineFixture();
      const root: HTMLElement = fixture.nativeElement as HTMLElement;
      const cells: HTMLElement[] = getGridCells(root);
      expect(cells.length).toBeGreaterThan(0);
    });

    it('each gridcell has aria-selected attribute', async (): Promise<void> => {
      const fixture: ComponentFixture<InlineHostComponent> = await createInlineFixture();
      const root: HTMLElement = fixture.nativeElement as HTMLElement;
      const cells: HTMLElement[] = getGridCells(root);
      for (const cell of cells) {
        expect(cell.hasAttribute('aria-selected')).toBe(true);
      }
    });

    it('selected date cell has aria-selected="true"', async (): Promise<void> => {
      const fixture: ComponentFixture<InlineHostComponent> = await createInlineFixture();
      const selectedDate: Date = createDate(new Date().getFullYear(), new Date().getMonth(), 15);
      const picker: DatePickerComponent = getPickerFromFixture(fixture);
      picker.writeValue(selectedDate);
      fixture.detectChanges();
      const root: HTMLElement = fixture.nativeElement as HTMLElement;
      const cells: HTMLElement[] = getGridCells(root);
      const selectedCells: HTMLElement[] = cells.filter(
        (c: HTMLElement): boolean => c.getAttribute('aria-selected') === 'true',
      );
      expect(selectedCells.length).toBeGreaterThan(0);
    });

    it('disabled date cells have aria-disabled="true"', async (): Promise<void> => {
      const fixture: ComponentFixture<InlineWithConstraintsHostComponent> =
        await createInlineWithConstraintsFixture();
      fixture.componentInstance.value = null;
      fixture.detectChanges();
      const root: HTMLElement = fixture.nativeElement as HTMLElement;
      const cells: HTMLElement[] = getGridCells(root);
      const disabledCells: HTMLElement[] = cells.filter(
        (c: HTMLElement): boolean => c.getAttribute('aria-disabled') === 'true',
      );
      // With a min/max date constraint at least some cells should be disabled
      expect(disabledCells.length).toBeGreaterThan(0);
    });

    it('each day button inside gridcell has an aria-label', async (): Promise<void> => {
      const fixture: ComponentFixture<InlineHostComponent> = await createInlineFixture();
      const root: HTMLElement = fixture.nativeElement as HTMLElement;
      const dayButtons: NodeListOf<HTMLButtonElement> = root.querySelectorAll(
        '[role="gridcell"] button',
      );
      for (const btn of Array.from(dayButtons)) {
        expect(btn.hasAttribute('aria-label')).toBe(true);
      }
    });

    it('the focused day button has tabindex="0" and others have tabindex="-1"', async (): Promise<void> => {
      const fixture: ComponentFixture<InlineHostComponent> = await createInlineFixture();
      const root: HTMLElement = fixture.nativeElement as HTMLElement;
      const dayButtons: HTMLButtonElement[] = Array.from(
        root.querySelectorAll<HTMLButtonElement>('[role="gridcell"] button:not([disabled])'),
      );
      const focusedButtons: HTMLButtonElement[] = dayButtons.filter(
        (b: HTMLButtonElement): boolean => b.getAttribute('tabindex') === '0',
      );
      expect(focusedButtons.length).toBe(1);
    });

    it('day aria-label includes "today" for today\'s date', async (): Promise<void> => {
      const fixture: ComponentFixture<InlineHostComponent> = await createInlineFixture();
      const root: HTMLElement = fixture.nativeElement as HTMLElement;
      const today: Date = new Date();
      // Navigate to today's month if needed
      const picker: HTMLElement | null = root.querySelector('ui-lib-date-picker');
      expect(picker).toBeTruthy();
      const todayBtn: HTMLButtonElement | null = root.querySelector<HTMLButtonElement>(
        getDateButtonSelector(today),
      );
      if (todayBtn) {
        const label: string | null = todayBtn.getAttribute('aria-label');
        expect(label).toBeTruthy();
        expect(label!.toLowerCase()).toContain('today');
      }
    });

    it('day aria-label includes "selected" for the selected date', async (): Promise<void> => {
      const fixture: ComponentFixture<InlineHostComponent> = await createInlineFixture();
      const selectedDate: Date = createDate(new Date().getFullYear(), new Date().getMonth(), 10);
      const picker: DatePickerComponent = getPickerFromFixture(fixture);
      picker.writeValue(selectedDate);
      fixture.detectChanges();
      const root: HTMLElement = fixture.nativeElement as HTMLElement;
      const selectedBtn: HTMLButtonElement | null = root.querySelector<HTMLButtonElement>(
        getDateButtonSelector(selectedDate),
      );
      expect(selectedBtn).toBeTruthy();
      const label: string | null = selectedBtn!.getAttribute('aria-label');
      expect(label).toBeTruthy();
      expect(label!.toLowerCase()).toContain('selected');
    });
  });

  // ── 5. Unique IDs ─────────────────────────────────────────────────────────

  describe('unique IDs across multiple instances', (): void => {
    it('generates distinct panel IDs for two separate pickers', async (): Promise<void> => {
      const fixture: ComponentFixture<TwoPickersHostComponent> = await createTwoPickersFixture();
      const root: HTMLElement = fixture.nativeElement as HTMLElement;
      // Panels are not visible in popup mode; open them
      const pickers: NodeListOf<HTMLElement> = root.querySelectorAll('ui-lib-date-picker');
      expect(pickers.length).toBe(2);
      const inputs: NodeListOf<HTMLInputElement> = root.querySelectorAll(
        '.ui-lib-datepicker__input',
      );
      expect(inputs.length).toBe(2);
      // IDs of the inputs should be distinct
      const id1: string | null = inputs[0]!.id;
      const id2: string | null = inputs[1]!.id;
      expect(id1).toBeTruthy();
      expect(id2).toBeTruthy();
      expect(id1).not.toBe(id2);
    });
  });

  // ── 6. Keyboard interactions ──────────────────────────────────────────────

  describe('keyboard interaction', (): void => {
    it('ArrowDown on input opens the calendar', async (): Promise<void> => {
      const fixture: ComponentFixture<PopupHostComponent> = await createPopupFixture();
      const root: HTMLElement = fixture.nativeElement as HTMLElement;
      const input: HTMLInputElement = getInput(root);
      input.dispatchEvent(
        new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true, cancelable: true }),
      );
      fixture.detectChanges();
      expect(root.querySelector('.ui-lib-datepicker__panel')).toBeTruthy();
    });

    it('Escape on panel closes the calendar', async (): Promise<void> => {
      const fixture: ComponentFixture<PopupHostComponent> = await createPopupFixture();
      const root: HTMLElement = fixture.nativeElement as HTMLElement;
      openPopup(fixture);
      const panel: HTMLElement = getPanel(root);
      panel.dispatchEvent(
        new KeyboardEvent('keydown', { key: 'Escape', bubbles: true, cancelable: true }),
      );
      fixture.detectChanges();
      expect(root.querySelector('.ui-lib-datepicker__panel')).toBeNull();
    });

    it('ArrowRight moves day focus to the next day', async (): Promise<void> => {
      const fixture: ComponentFixture<InlineHostComponent> = await createInlineFixture();
      const root: HTMLElement = fixture.nativeElement as HTMLElement;
      const focusedBtn: HTMLButtonElement | null = root.querySelector<HTMLButtonElement>(
        '[role="gridcell"] button[tabindex="0"]',
      );
      expect(focusedBtn).toBeTruthy();
      const dateKey: string | null = focusedBtn!.getAttribute('data-date-key');
      expect(dateKey).toBeTruthy();
      focusedBtn!.dispatchEvent(
        new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true, cancelable: true }),
      );
      fixture.detectChanges();
      // A new button should have tabindex=0 now
      const newFocusedBtn: HTMLButtonElement | null = root.querySelector<HTMLButtonElement>(
        '[role="gridcell"] button[tabindex="0"]',
      );
      expect(newFocusedBtn).toBeTruthy();
      expect(newFocusedBtn!.getAttribute('data-date-key')).not.toBe(dateKey);
    });

    it('Enter key selects the focused date', async (): Promise<void> => {
      const fixture: ComponentFixture<InlineHostComponent> = await createInlineFixture();
      const root: HTMLElement = fixture.nativeElement as HTMLElement;
      const focusedBtn: HTMLButtonElement | null = root.querySelector<HTMLButtonElement>(
        '[role="gridcell"] button[tabindex="0"]:not([disabled])',
      );
      expect(focusedBtn).toBeTruthy();
      focusedBtn!.dispatchEvent(
        new KeyboardEvent('keydown', { key: 'Enter', bubbles: true, cancelable: true }),
      );
      fixture.detectChanges();
      // After selection, a cell should have aria-selected=true
      const cells: HTMLElement[] = getGridCells(root);
      const selectedCell: HTMLElement | undefined = cells.find(
        (c: HTMLElement): boolean => c.getAttribute('aria-selected') === 'true',
      );
      expect(selectedCell).toBeTruthy();
    });

    it('Space key selects the focused date', async (): Promise<void> => {
      const fixture: ComponentFixture<InlineHostComponent> = await createInlineFixture();
      const root: HTMLElement = fixture.nativeElement as HTMLElement;
      const focusedBtn: HTMLButtonElement | null = root.querySelector<HTMLButtonElement>(
        '[role="gridcell"] button[tabindex="0"]:not([disabled])',
      );
      expect(focusedBtn).toBeTruthy();
      focusedBtn!.dispatchEvent(
        new KeyboardEvent('keydown', { key: ' ', bubbles: true, cancelable: true }),
      );
      fixture.detectChanges();
      const cells: HTMLElement[] = getGridCells(root);
      const selectedCell: HTMLElement | undefined = cells.find(
        (c: HTMLElement): boolean => c.getAttribute('aria-selected') === 'true',
      );
      expect(selectedCell).toBeTruthy();
    });

    it('PageDown navigates to next month', async (): Promise<void> => {
      const fixture: ComponentFixture<InlineHostComponent> = await createInlineFixture();
      const root: HTMLElement = fixture.nativeElement as HTMLElement;
      const grid: HTMLElement = getGrid(root);
      const labelBefore: string | null = grid.getAttribute('aria-label');
      const focusedBtn: HTMLButtonElement | null = root.querySelector<HTMLButtonElement>(
        '[role="gridcell"] button[tabindex="0"]:not([disabled])',
      );
      expect(focusedBtn).toBeTruthy();
      focusedBtn!.dispatchEvent(
        new KeyboardEvent('keydown', { key: 'PageDown', bubbles: true, cancelable: true }),
      );
      fixture.detectChanges();
      const labelAfter: string | null = grid.getAttribute('aria-label');
      expect(labelAfter).not.toBe(labelBefore);
    });

    it('PageUp navigates to previous month', async (): Promise<void> => {
      const fixture: ComponentFixture<InlineHostComponent> = await createInlineFixture();
      const root: HTMLElement = fixture.nativeElement as HTMLElement;
      const grid: HTMLElement = getGrid(root);
      const labelBefore: string | null = grid.getAttribute('aria-label');
      const focusedBtn: HTMLButtonElement | null = root.querySelector<HTMLButtonElement>(
        '[role="gridcell"] button[tabindex="0"]:not([disabled])',
      );
      expect(focusedBtn).toBeTruthy();
      focusedBtn!.dispatchEvent(
        new KeyboardEvent('keydown', { key: 'PageUp', bubbles: true, cancelable: true }),
      );
      fixture.detectChanges();
      const labelAfter: string | null = grid.getAttribute('aria-label');
      expect(labelAfter).not.toBe(labelBefore);
    });
  });

  // ── 7. Focus management ────────────────────────────────────────────────────

  describe('focus management', (): void => {
    it('opens with a focused date cell (tabindex=0) visible', async (): Promise<void> => {
      const fixture: ComponentFixture<PopupHostComponent> = await createPopupFixture();
      const root: HTMLElement = fixture.nativeElement as HTMLElement;
      openPopup(fixture);
      await fixture.whenStable();
      fixture.detectChanges();
      const focusedBtn: HTMLButtonElement | null = root.querySelector<HTMLButtonElement>(
        '[role="gridcell"] button[tabindex="0"]',
      );
      expect(focusedBtn).toBeTruthy();
    });

    it('moves focus to selected date when panel opens with a value', async (): Promise<void> => {
      const fixture: ComponentFixture<PopupHostComponent> = await createPopupFixture();
      const selectedDate: Date = createDate(new Date().getFullYear(), new Date().getMonth(), 15);
      const picker: DatePickerComponent = getPickerComponent(fixture);
      picker.writeValue(selectedDate);
      fixture.detectChanges();
      openPopup(fixture);
      await fixture.whenStable();
      fixture.detectChanges();
      const root: HTMLElement = fixture.nativeElement as HTMLElement;
      const focusedBtn: HTMLButtonElement | null = root.querySelector<HTMLButtonElement>(
        getDateButtonSelector(selectedDate),
      );
      expect(focusedBtn).toBeTruthy();
      expect(focusedBtn!.getAttribute('tabindex')).toBe('0');
    });
  });

  // ── 8. axe-core ──────────────────────────────────────────────────────────

  describe('axe-core', (): void => {
    it('passes axe in popup mode (closed state)', async (): Promise<void> => {
      const fixture: ComponentFixture<PopupHostComponent> = await createPopupFixture();
      await checkA11y(fixture, { rules: SKIP_COLOR_CONTRAST_RULES });
    });

    it('passes axe in popup mode (open state)', async (): Promise<void> => {
      const fixture: ComponentFixture<PopupHostComponent> = await createPopupFixture();
      openPopup(fixture);
      fixture.detectChanges();
      await checkA11y(fixture, { rules: SKIP_COLOR_CONTRAST_RULES });
    });

    it('passes axe in inline mode', async (): Promise<void> => {
      const fixture: ComponentFixture<InlineHostComponent> = await createInlineFixture();
      await checkA11y(fixture, { rules: SKIP_COLOR_CONTRAST_RULES });
    });

    it('passes axe with a selected date', async (): Promise<void> => {
      const fixture: ComponentFixture<InlineHostComponent> = await createInlineFixture();
      const picker: DatePickerComponent = getPickerFromFixture(fixture);
      picker.writeValue(createDate(new Date().getFullYear(), new Date().getMonth(), 10));
      fixture.detectChanges();
      await checkA11y(fixture, { rules: SKIP_COLOR_CONTRAST_RULES });
    });

    it('passes axe with disabled dates (min/max constraints)', async (): Promise<void> => {
      const fixture: ComponentFixture<InlineWithConstraintsHostComponent> =
        await createInlineWithConstraintsFixture();
      await checkA11y(fixture, { rules: SKIP_COLOR_CONTRAST_RULES });
    });
  });
});
