import {
  ChangeDetectionStrategy,
  Component,
  provideZonelessChangeDetection,
  signal,
  type WritableSignal,
} from '@angular/core';
import { TestBed } from '@angular/core/testing';
import type { ComponentFixture } from '@angular/core/testing';
import { checkA11y, SKIP_COLOR_CONTRAST_RULES } from '../../test/a11y-utils';
import { Terminal } from './terminal';
import { TerminalService } from './terminal.service';
import type { TerminalVariant } from './terminal.types';

// ─── Typed query helpers ──────────────────────────────────────────────────────

function queryEl<T extends HTMLElement>(
  fixture: ComponentFixture<unknown>,
  selector: string
): T | null {
  return (fixture.nativeElement as HTMLElement).querySelector<T>(selector);
}

function queryAllEl<T extends HTMLElement>(
  fixture: ComponentFixture<unknown>,
  selector: string
): NodeListOf<T> {
  return (fixture.nativeElement as HTMLElement).querySelectorAll<T>(selector);
}

// ─── Host component ───────────────────────────────────────────────────────────

@Component({
  standalone: true,
  imports: [Terminal],
  template: `
    <ui-lib-terminal
      [welcomeMessage]="welcomeMessage()"
      [prompt]="prompt()"
      [variant]="variant()"
    />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class TerminalA11yHostComponent {
  public readonly welcomeMessage: WritableSignal<string> = signal<string>('');
  public readonly prompt: WritableSignal<string> = signal<string>('$');
  public readonly variant: WritableSignal<TerminalVariant | null> = signal<TerminalVariant | null>(
    null
  );
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

async function createFixture(): Promise<ComponentFixture<TerminalA11yHostComponent>> {
  await TestBed.configureTestingModule({
    imports: [TerminalA11yHostComponent],
    providers: [provideZonelessChangeDetection(), TerminalService],
  }).compileComponents();
  const fixture: ComponentFixture<TerminalA11yHostComponent> =
    TestBed.createComponent(TerminalA11yHostComponent);
  document.body.appendChild(fixture.nativeElement);
  fixture.detectChanges();
  await fixture.whenStable();
  return fixture;
}

// ─── Tests ────────────────────────────────────────────────────────────────────

describe('Terminal a11y', (): void => {
  afterEach((): void => {
    document.body.innerHTML = '';
    TestBed.resetTestingModule();
  });

  // ─── ARIA structure ─────────────────────────────────────────────────────────

  it('host should have role="region"', async (): Promise<void> => {
    const fixture: ComponentFixture<TerminalA11yHostComponent> = await createFixture();
    const host: HTMLElement | null = queryEl(fixture, 'ui-lib-terminal');
    expect(host?.getAttribute('role')).toBe('region');
  });

  it('host should have aria-label="Terminal"', async (): Promise<void> => {
    const fixture: ComponentFixture<TerminalA11yHostComponent> = await createFixture();
    const host: HTMLElement | null = queryEl(fixture, 'ui-lib-terminal');
    expect(host?.getAttribute('aria-label')).toBe('Terminal');
  });

  it('output area should have role="log"', async (): Promise<void> => {
    const fixture: ComponentFixture<TerminalA11yHostComponent> = await createFixture();
    const output: HTMLElement | null = queryEl(fixture, '.ui-lib-terminal__output');
    expect(output).not.toBeNull();
    expect(output?.getAttribute('role')).toBe('log');
  });

  it('output area should have aria-label="Terminal output"', async (): Promise<void> => {
    const fixture: ComponentFixture<TerminalA11yHostComponent> = await createFixture();
    const output: HTMLElement | null = queryEl(fixture, '.ui-lib-terminal__output');
    expect(output?.getAttribute('aria-label')).toBe('Terminal output');
  });

  it('command input should have a descriptive aria-label', async (): Promise<void> => {
    const fixture: ComponentFixture<TerminalA11yHostComponent> = await createFixture();
    const input: HTMLInputElement | null = queryEl<HTMLInputElement>(
      fixture,
      '.ui-lib-terminal__input'
    );
    const label: string = input?.getAttribute('aria-label') ?? '';
    expect(label.length).toBeGreaterThan(0);
  });

  it('all prompt spans should have aria-hidden="true"', async (): Promise<void> => {
    const fixture: ComponentFixture<TerminalA11yHostComponent> = await createFixture();
    const prompts: NodeListOf<HTMLElement> = queryAllEl(fixture, '.ui-lib-terminal__prompt');
    expect(prompts.length).toBeGreaterThan(0);
    prompts.forEach((prompt: HTMLElement): void => {
      expect(prompt.getAttribute('aria-hidden')).toBe('true');
    });
  });

  it('host should have a unique instance id', async (): Promise<void> => {
    const fixture: ComponentFixture<TerminalA11yHostComponent> = await createFixture();
    const host: HTMLElement | null = queryEl(fixture, 'ui-lib-terminal');
    expect(host?.id).toMatch(/^ui-lib-terminal-\d+$/);
  });

  it('output div should have a unique id derived from the instance id', async (): Promise<void> => {
    const fixture: ComponentFixture<TerminalA11yHostComponent> = await createFixture();
    const host: HTMLElement | null = queryEl(fixture, 'ui-lib-terminal');
    const output: HTMLElement | null = queryEl(fixture, '.ui-lib-terminal__output');
    expect(output?.id).toBe(`${host?.id ?? ''}-output`);
  });

  it('two instances should receive distinct IDs', async (): Promise<void> => {
    await TestBed.configureTestingModule({
      imports: [TerminalA11yHostComponent],
      providers: [provideZonelessChangeDetection(), TerminalService],
    }).compileComponents();

    const fixture1: ComponentFixture<TerminalA11yHostComponent> =
      TestBed.createComponent(TerminalA11yHostComponent);
    const fixture2: ComponentFixture<TerminalA11yHostComponent> =
      TestBed.createComponent(TerminalA11yHostComponent);

    document.body.appendChild(fixture1.nativeElement);
    document.body.appendChild(fixture2.nativeElement);
    fixture1.detectChanges();
    fixture2.detectChanges();

    const host1: HTMLElement | null = queryEl(fixture1, 'ui-lib-terminal');
    const host2: HTMLElement | null = queryEl(fixture2, 'ui-lib-terminal');

    expect(host1?.id).toBeTruthy();
    expect(host2?.id).toBeTruthy();
    expect(host1?.id).not.toBe(host2?.id);
  });

  // ─── Keyboard interaction ────────────────────────────────────────────────────

  it('pressing Enter submits the current command to history', async (): Promise<void> => {
    const fixture: ComponentFixture<TerminalA11yHostComponent> = await createFixture();
    const service: TerminalService = TestBed.inject(TerminalService);
    const input: HTMLInputElement | null = queryEl<HTMLInputElement>(
      fixture,
      '.ui-lib-terminal__input'
    );

    if (input) {
      input.value = 'help';
      input.dispatchEvent(new Event('input'));
      fixture.detectChanges();
      input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
      fixture.detectChanges();
      await fixture.whenStable();
    }

    expect(service.history().length).toBe(1);
    expect(service.history()[0]?.command).toBe('help');
  });

  it('pressing Enter on empty input does not add to history', async (): Promise<void> => {
    const fixture: ComponentFixture<TerminalA11yHostComponent> = await createFixture();
    const service: TerminalService = TestBed.inject(TerminalService);
    const input: HTMLInputElement | null = queryEl<HTMLInputElement>(
      fixture,
      '.ui-lib-terminal__input'
    );

    if (input) {
      input.value = '   ';
      input.dispatchEvent(new Event('input'));
      fixture.detectChanges();
      input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
      fixture.detectChanges();
      await fixture.whenStable();
    }

    expect(service.history().length).toBe(0);
  });

  it('ArrowUp restores the previous command from history', async (): Promise<void> => {
    const fixture: ComponentFixture<TerminalA11yHostComponent> = await createFixture();
    const input: HTMLInputElement | null = queryEl<HTMLInputElement>(
      fixture,
      '.ui-lib-terminal__input'
    );

    if (!input) {
      fail('input element not found');
      return;
    }

    input.value = 'ls';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
    fixture.detectChanges();
    await fixture.whenStable();

    input.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp' }));
    fixture.detectChanges();
    await fixture.whenStable();

    expect(input.value).toBe('ls');
  });

  it('ArrowDown after ArrowUp clears the input', async (): Promise<void> => {
    const fixture: ComponentFixture<TerminalA11yHostComponent> = await createFixture();
    const input: HTMLInputElement | null = queryEl<HTMLInputElement>(
      fixture,
      '.ui-lib-terminal__input'
    );

    if (!input) {
      fail('input element not found');
      return;
    }

    input.value = 'ls';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
    fixture.detectChanges();

    input.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp' }));
    fixture.detectChanges();
    input.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
    fixture.detectChanges();
    await fixture.whenStable();

    expect(input.value).toBe('');
  });

  // ─── axe-core automated checks ──────────────────────────────────────────────

  it('should pass axe check with no welcome message', async (): Promise<void> => {
    const fixture: ComponentFixture<TerminalA11yHostComponent> = await createFixture();
    await checkA11y(fixture, { rules: SKIP_COLOR_CONTRAST_RULES });
  });

  it('should pass axe check with a welcome message', async (): Promise<void> => {
    const fixture: ComponentFixture<TerminalA11yHostComponent> = await createFixture();
    fixture.componentInstance.welcomeMessage.set('Welcome to the terminal!');
    await checkA11y(fixture, { rules: SKIP_COLOR_CONTRAST_RULES });
  });

  it('should pass axe check with command/response history', async (): Promise<void> => {
    const fixture: ComponentFixture<TerminalA11yHostComponent> = await createFixture();
    const service: TerminalService = TestBed.inject(TerminalService);
    service.submitCommand('help');
    service.sendResponse('Available commands: help, date');
    fixture.detectChanges();
    await fixture.whenStable();
    await checkA11y(fixture, { rules: SKIP_COLOR_CONTRAST_RULES });
  });

  it('should pass axe check with bootstrap variant', async (): Promise<void> => {
    const fixture: ComponentFixture<TerminalA11yHostComponent> = await createFixture();
    fixture.componentInstance.variant.set('bootstrap');
    fixture.detectChanges();
    await fixture.whenStable();
    await checkA11y(fixture, { rules: SKIP_COLOR_CONTRAST_RULES });
  });

  it('should pass axe check with minimal variant', async (): Promise<void> => {
    const fixture: ComponentFixture<TerminalA11yHostComponent> = await createFixture();
    fixture.componentInstance.variant.set('minimal');
    fixture.detectChanges();
    await fixture.whenStable();
    await checkA11y(fixture, { rules: SKIP_COLOR_CONTRAST_RULES });
  });
});
