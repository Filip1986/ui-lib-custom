import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  provideZonelessChangeDetection,
  signal,
} from '@angular/core';
import type { WritableSignal, DebugElement } from '@angular/core';
import type { ComponentFixture } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Terminal } from './terminal';
import { TerminalService } from './terminal.service';
import type { TerminalCommand, TerminalVariant } from './terminal.types';

// ---- Test host -------------------------------------------------------

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
class TestHostComponent {
  public readonly welcomeMessage: WritableSignal<string> = signal<string>('');
  public readonly prompt: WritableSignal<string> = signal<string>('$');
  public readonly variant: WritableSignal<TerminalVariant | null> = signal<TerminalVariant | null>(
    null
  );
}

// ---- Auto-responding host -------------------------------------------

@Component({
  standalone: true,
  imports: [Terminal],
  template: `<ui-lib-terminal welcomeMessage="Welcome" prompt=">" />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class AutoRespondHostComponent {
  private readonly terminalService: TerminalService = inject(TerminalService);

  constructor() {
    effect((): void => {
      const command: TerminalCommand | null = this.terminalService.command();
      if (command !== null) {
        this.terminalService.sendResponse(`echo: ${command.text}`);
      }
    });
  }
}

// ---- Helpers ---------------------------------------------------------

function setup(): {
  fixture: ComponentFixture<TestHostComponent>;
  host: TestHostComponent;
  service: TerminalService;
} {
  TestBed.configureTestingModule({
    imports: [TestHostComponent],
    providers: [provideZonelessChangeDetection(), TerminalService],
  });
  const fixture: ComponentFixture<TestHostComponent> = TestBed.createComponent(TestHostComponent);
  fixture.detectChanges();
  return {
    fixture,
    host: fixture.componentInstance,
    service: TestBed.inject(TerminalService),
  };
}

function setupAutoRespond(): {
  fixture: ComponentFixture<AutoRespondHostComponent>;
  service: TerminalService;
} {
  TestBed.configureTestingModule({
    imports: [AutoRespondHostComponent],
    providers: [provideZonelessChangeDetection(), TerminalService],
  });
  const fixture: ComponentFixture<AutoRespondHostComponent> =
    TestBed.createComponent(AutoRespondHostComponent);
  fixture.detectChanges();
  return { fixture, service: TestBed.inject(TerminalService) };
}

describe('Terminal', (): void => {
  afterEach((): void => {
    TestBed.resetTestingModule();
  });

  it('should create', (): void => {
    const { fixture } = setup();
    const terminal: HTMLElement = fixture.debugElement.query(By.css('ui-lib-terminal'))
      .nativeElement as HTMLElement;
    expect(terminal).toBeTruthy();
  });

  it('should apply base class on host', (): void => {
    const { fixture } = setup();
    const terminal: HTMLElement = fixture.debugElement.query(By.css('ui-lib-terminal'))
      .nativeElement as HTMLElement;
    expect(terminal.className).toContain('ui-lib-terminal');
  });

  it('should apply variant class', async (): Promise<void> => {
    const { fixture, host } = setup();
    host.variant.set('bootstrap');
    fixture.detectChanges();
    await fixture.whenStable();
    const terminal: HTMLElement = fixture.debugElement.query(By.css('ui-lib-terminal'))
      .nativeElement as HTMLElement;
    expect(terminal.className).toContain('ui-lib-terminal--bootstrap');
  });

  it('should apply role="region" on host', (): void => {
    const { fixture } = setup();
    const terminal: HTMLElement = fixture.debugElement.query(By.css('ui-lib-terminal'))
      .nativeElement as HTMLElement;
    expect(terminal.getAttribute('role')).toBe('region');
  });

  it('should render welcome message when provided', async (): Promise<void> => {
    const { fixture, host } = setup();
    host.welcomeMessage.set('Welcome to the terminal!');
    fixture.detectChanges();
    await fixture.whenStable();
    const welcome: HTMLElement = fixture.debugElement.query(By.css('.ui-lib-terminal__welcome'))
      .nativeElement as HTMLElement;
    expect(welcome.textContent!.trim()).toBe('Welcome to the terminal!');
  });

  it('should not render welcome message when empty', (): void => {
    const { fixture } = setup();
    const welcome: DebugElement | null = fixture.debugElement.query(
      By.css('.ui-lib-terminal__welcome')
    );
    expect(welcome).toBeNull();
  });

  it('should render prompt text', async (): Promise<void> => {
    const { fixture, host } = setup();
    host.prompt.set('>');
    fixture.detectChanges();
    await fixture.whenStable();
    const promptSpan: HTMLElement = fixture.debugElement.query(By.css('.ui-lib-terminal__prompt'))
      .nativeElement as HTMLElement;
    expect(promptSpan.textContent).toContain('>');
  });

  it('should render the input field', (): void => {
    const { fixture } = setup();
    const input: HTMLInputElement = fixture.debugElement.query(By.css('.ui-lib-terminal__input'))
      .nativeElement as HTMLInputElement;
    expect(input).toBeTruthy();
    expect(input.tagName.toLowerCase()).toBe('input');
  });

  it('should add command to history when Enter is pressed', async (): Promise<void> => {
    const { fixture, service } = setup();
    const input: HTMLInputElement = fixture.debugElement.query(By.css('.ui-lib-terminal__input'))
      .nativeElement as HTMLInputElement;
    input.value = 'hello';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
    fixture.detectChanges();
    await fixture.whenStable();
    expect(service.history().length).toBe(1);
    expect(service.history()[0]!.command).toBe('hello');
  });

  it('should clear input after command submission', async (): Promise<void> => {
    const { fixture } = setup();
    const input: HTMLInputElement = fixture.debugElement.query(By.css('.ui-lib-terminal__input'))
      .nativeElement as HTMLInputElement;
    input.value = 'test';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
    fixture.detectChanges();
    await fixture.whenStable();
    expect(input.value).toBe('');
  });

  it('should not submit empty or whitespace-only commands', async (): Promise<void> => {
    const { fixture, service } = setup();
    const input: HTMLInputElement = fixture.debugElement.query(By.css('.ui-lib-terminal__input'))
      .nativeElement as HTMLInputElement;
    input.value = '   ';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
    fixture.detectChanges();
    await fixture.whenStable();
    expect(service.history().length).toBe(0);
  });

  it('should display command in history', async (): Promise<void> => {
    const { fixture, service } = setup();
    service.submitCommand('whoami');
    fixture.detectChanges();
    await fixture.whenStable();
    const commandText: HTMLElement = fixture.debugElement.query(
      By.css('.ui-lib-terminal__command-text')
    ).nativeElement as HTMLElement;
    expect(commandText.textContent!.trim()).toBe('whoami');
  });

  it('should display response after sendResponse is called', async (): Promise<void> => {
    const { fixture, service } = setup();
    service.submitCommand('whoami');
    service.sendResponse('admin');
    fixture.detectChanges();
    await fixture.whenStable();
    const response: HTMLElement = fixture.debugElement.query(By.css('.ui-lib-terminal__response'))
      .nativeElement as HTMLElement;
    expect(response.textContent!.trim()).toBe('admin');
  });

  it('should not show response element while response is null', async (): Promise<void> => {
    const { fixture, service } = setup();
    service.submitCommand('date');
    fixture.detectChanges();
    await fixture.whenStable();
    const response: DebugElement | null = fixture.debugElement.query(
      By.css('.ui-lib-terminal__response')
    );
    expect(response).toBeNull();
  });

  it('should clear history when TerminalService.clear() is called', async (): Promise<void> => {
    const { fixture, service } = setup();
    service.submitCommand('cmd1');
    service.sendResponse('res1');
    fixture.detectChanges();
    service.clear();
    fixture.detectChanges();
    await fixture.whenStable();
    expect(service.history().length).toBe(0);
  });

  it('should emit command via service command signal', (): void => {
    const { service } = setup();
    service.submitCommand('ping');
    const command: ReturnType<TerminalService['command']> = service.command();
    expect(command).not.toBeNull();
    expect(command?.text).toBe('ping');
  });

  it('should increment command id for repeated commands', (): void => {
    const { service } = setup();
    service.submitCommand('ls');
    const firstId: number = service.command()!.id;
    service.submitCommand('ls');
    const secondId: number = service.command()!.id;
    expect(secondId).toBeGreaterThan(firstId);
  });

  it('should auto-respond via effect when using AutoRespondHostComponent', async (): Promise<void> => {
    const { fixture, service } = setupAutoRespond();
    service.submitCommand('hello');
    fixture.detectChanges();
    await fixture.whenStable();
    expect(service.history()[0]!.response).toBe('echo: hello');
  });
});

describe('TerminalService', (): void => {
  beforeEach((): void => {
    TestBed.configureTestingModule({
      providers: [provideZonelessChangeDetection(), TerminalService],
    });
  });

  afterEach((): void => {
    TestBed.resetTestingModule();
  });

  it('should start with empty history', (): void => {
    const service: TerminalService = TestBed.inject(TerminalService);
    expect(service.history().length).toBe(0);
  });

  it('should add a history item with null response on submitCommand', (): void => {
    const service: TerminalService = TestBed.inject(TerminalService);
    service.submitCommand('ls');
    expect(service.history().length).toBe(1);
    expect(service.history()[0]!.command).toBe('ls');
    expect(service.history()[0]!.response).toBeNull();
  });

  it('should update the last pending item on sendResponse', (): void => {
    const service: TerminalService = TestBed.inject(TerminalService);
    service.submitCommand('ls');
    service.sendResponse('file1.txt');
    expect(service.history()[0]!.response).toBe('file1.txt');
  });

  it('should only update the latest pending command on sendResponse', (): void => {
    const service: TerminalService = TestBed.inject(TerminalService);
    service.submitCommand('cmd1');
    service.sendResponse('res1');
    service.submitCommand('cmd2');
    service.sendResponse('res2');
    expect(service.history()[0]!.response).toBe('res1');
    expect(service.history()[1]!.response).toBe('res2');
  });

  it('should clear history and command on clear()', (): void => {
    const service: TerminalService = TestBed.inject(TerminalService);
    service.submitCommand('test');
    service.clear();
    expect(service.history().length).toBe(0);
    expect(service.command()).toBeNull();
  });
});
