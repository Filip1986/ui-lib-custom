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
import { InputOtpComponent } from './input-otp.component';

@Component({
  selector: 'test-host',
  standalone: true,
  imports: [InputOtpComponent],
  template: `
    <span id="otp-heading">Verification code</span>
    <ui-lib-input-otp
      [length]="length()"
      [ariaLabel]="ariaLabel()"
      [ariaLabelledBy]="ariaLabelledBy()"
      [invalid]="invalid()"
      [integerOnly]="integerOnly()"
      [pasteAnnouncement]="pasteAnnouncement()"
    >
      <span inputOtpError>Code is invalid</span>
    </ui-lib-input-otp>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class InputOtpA11yHostComponent {
  public readonly length: WritableSignal<number> = signal<number>(4);
  public readonly ariaLabel: WritableSignal<string | null> = signal<string | null>(
    'One-time passcode',
  );
  public readonly ariaLabelledBy: WritableSignal<string | null> = signal<string | null>(null);
  public readonly invalid: WritableSignal<boolean> = signal<boolean>(false);
  public readonly integerOnly: WritableSignal<boolean> = signal<boolean>(false);
  public readonly pasteAnnouncement: WritableSignal<string> = signal<string>('Code entered.');
}

describe('InputOtp Accessibility', (): void => {
  let fixture: ComponentFixture<InputOtpA11yHostComponent>;

  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({
      imports: [InputOtpA11yHostComponent],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    fixture = TestBed.createComponent(InputOtpA11yHostComponent);
    document.body.appendChild(fixture.nativeElement);
    fixture.detectChanges();
    await fixture.whenStable();
  });

  afterEach((): void => {
    const parent: HTMLElement | null = (fixture.nativeElement as HTMLElement).parentElement;
    if (parent) {
      parent.removeChild(fixture.nativeElement as HTMLElement);
    }
  });

  function hostElement(): HTMLElement {
    return fixture.nativeElement as HTMLElement;
  }

  function otpElement(): HTMLElement {
    return hostElement().querySelector('ui-lib-input-otp') as HTMLElement;
  }

  function cells(): HTMLInputElement[] {
    return Array.from(
      otpElement().querySelectorAll<HTMLInputElement>('input.ui-lib-input-otp-cell'),
    );
  }

  function liveRegion(): HTMLElement {
    return otpElement().querySelector('.ui-lib-input-otp-sr-only') as HTMLElement;
  }

  function dispatchInput(index: number, value: string): void {
    const cell: HTMLInputElement = cells()[index] as HTMLInputElement;
    cell.focus();
    cell.value = value;
    cell.dispatchEvent(new InputEvent('input', { bubbles: true, inputType: 'insertText' }));
    fixture.detectChanges();
  }

  function dispatchBackspace(index: number): void {
    const cell: HTMLInputElement = cells()[index] as HTMLInputElement;
    cell.focus();
    cell.value = '';
    cell.dispatchEvent(new KeyboardEvent('keydown', { bubbles: true, key: 'Backspace' }));
    fixture.detectChanges();
  }

  function dispatchPaste(text: string): void {
    const pasteEvent: Event = new Event('paste', { bubbles: true });
    Object.defineProperty(pasteEvent, 'clipboardData', {
      value: { getData: (): string => text },
      configurable: true,
    });
    cells()[0]?.dispatchEvent(pasteEvent as ClipboardEvent);
    fixture.detectChanges();
  }

  it('host uses role="group"', (): void => {
    expect(otpElement().getAttribute('role')).toBe('group');
  });

  it('host has default aria-label', (): void => {
    expect(otpElement().getAttribute('aria-label')).toBe('One-time passcode');
  });

  it('host uses aria-labelledby and clears aria-label when configured', (): void => {
    fixture.componentInstance.ariaLabelledBy.set('otp-heading');
    fixture.detectChanges();
    expect(otpElement().getAttribute('aria-labelledby')).toBe('otp-heading');
    expect(otpElement().getAttribute('aria-label')).toBeNull();
  });

  it('each cell has position-aware aria-label', (): void => {
    expect(cells()[0]?.getAttribute('aria-label')).toBe('Digit 1 of 4');
    expect(cells()[3]?.getAttribute('aria-label')).toBe('Digit 4 of 4');
  });

  it('does not set aria-invalid by default', (): void => {
    cells().forEach((cell: HTMLInputElement): void => {
      expect(cell.getAttribute('aria-invalid')).toBeNull();
    });
  });

  it('focus advances to next cell on valid input', (): void => {
    dispatchInput(0, '1');
    expect(document.activeElement).toBe(cells()[1]);
  });

  it('focus retreats to previous cell on Backspace from empty cell', (): void => {
    dispatchInput(0, '1');
    dispatchInput(1, '2');
    dispatchBackspace(2);
    expect(document.activeElement).toBe(cells()[1]);
  });

  it('marks each cell aria-invalid when invalid is true', (): void => {
    fixture.componentInstance.invalid.set(true);
    fixture.detectChanges();
    cells().forEach((cell: HTMLInputElement): void => {
      expect(cell.getAttribute('aria-invalid')).toBe('true');
    });
  });

  it('renders error content with role="alert" and wires aria-describedby', (): void => {
    fixture.componentInstance.invalid.set(true);
    fixture.detectChanges();
    const errorElement: HTMLElement = otpElement().querySelector(
      '.ui-lib-input-otp-error',
    ) as HTMLElement;
    expect(errorElement.getAttribute('role')).toBe('alert');
    expect(otpElement().getAttribute('aria-describedby')).toBe(errorElement.id);
  });

  it('removes aria-describedby when invalid state is cleared', (): void => {
    fixture.componentInstance.invalid.set(true);
    fixture.detectChanges();
    fixture.componentInstance.invalid.set(false);
    fixture.detectChanges();
    expect(otpElement().getAttribute('aria-describedby')).toBeNull();
  });

  it('paste fills all cells and focuses the last filled cell', async (): Promise<void> => {
    dispatchPaste('1234');
    await fixture.whenStable();
    const renderedCells: HTMLInputElement[] = cells();
    expect(renderedCells.map((cell: HTMLInputElement): string => cell.value).join('')).toBe('1234');
    expect(document.activeElement).toBe(renderedCells[3]);
  });

  it('paste updates polite live region announcement', async (): Promise<void> => {
    dispatchPaste('1234');
    await Promise.resolve();
    fixture.detectChanges();
    expect(liveRegion().getAttribute('aria-live')).toBe('polite');
    expect(liveRegion().getAttribute('aria-atomic')).toBe('true');
    expect(liveRegion().textContent.trim()).toBe('Code entered.');
  });

  it('uses configured paste announcement text', async (): Promise<void> => {
    fixture.componentInstance.pasteAnnouncement.set('Verification code pasted');
    fixture.detectChanges();
    dispatchPaste('1234');
    await Promise.resolve();
    fixture.detectChanges();
    expect(liveRegion().textContent.trim()).toBe('Verification code pasted');
  });

  it('filters non-digits when integerOnly is enabled and pasting', (): void => {
    fixture.componentInstance.integerOnly.set(true);
    fixture.detectChanges();
    dispatchPaste('a1b2');
    const renderedCells: HTMLInputElement[] = cells();
    expect(renderedCells.length).toBe(4);
    expect(renderedCells[0]!.value).toBe('1');
    expect(renderedCells[1]!.value).toBe('2');
    expect(renderedCells[2]!.value).toBe('');
    expect(renderedCells[3]!.value).toBe('');
  });

  it('supports custom group aria-label input', (): void => {
    fixture.componentInstance.ariaLabel.set('Security code');
    fixture.detectChanges();
    expect(otpElement().getAttribute('aria-label')).toBe('Security code');
  });

  it('passes axe in default state', async (): Promise<void> => {
    await checkA11y(fixture, { rules: SKIP_COLOR_CONTRAST_RULES });
  });

  it('passes axe in invalid state', async (): Promise<void> => {
    fixture.componentInstance.invalid.set(true);
    fixture.detectChanges();
    await checkA11y(fixture, { rules: SKIP_COLOR_CONTRAST_RULES });
  });

  it('passes axe in filled state', async (): Promise<void> => {
    dispatchPaste('1234');
    await Promise.resolve();
    fixture.detectChanges();
    await checkA11y(fixture, { rules: SKIP_COLOR_CONTRAST_RULES });
  });
});
