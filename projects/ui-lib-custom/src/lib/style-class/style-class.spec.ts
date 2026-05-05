import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import type { WritableSignal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import type { ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import type { DebugElement } from '@angular/core';
import { provideZonelessChangeDetection } from '@angular/core';
import { StyleClass } from './style-class';

// ---------------------------------------------------------------------------
// Test host components
// ---------------------------------------------------------------------------

@Component({
  selector: 'app-sc-toggle-host',
  standalone: true,
  imports: [StyleClass],
  template: `
    <button [uiLibStyleClass]="'@next'" [toggleClass]="toggleClassSignal()">Toggle</button>
    <div id="target">Content</div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class ScToggleHostComponent {
  public readonly toggleClassSignal: WritableSignal<string> = signal<string>('is-open');
}

@Component({
  selector: 'app-sc-transition-host',
  standalone: true,
  imports: [StyleClass],
  template: `
    <button
      [uiLibStyleClass]="'@next'"
      [enterFromClass]="enterFromSignal()"
      [enterActiveClass]="enterActiveSignal()"
      [enterToClass]="enterToSignal()"
      [enterDoneClass]="enterDoneSignal()"
      [leaveFromClass]="leaveFromSignal()"
      [leaveActiveClass]="leaveActiveSignal()"
      [leaveToClass]="leaveToSignal()"
      [leaveDoneClass]="leaveDoneSignal()"
      [hideOnOutsideClick]="hideOnOutsideClickSignal()"
    >
      Toggle
    </button>
    <div id="target">Content</div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class ScTransitionHostComponent {
  public readonly enterFromSignal: WritableSignal<string> = signal<string>('');
  public readonly enterActiveSignal: WritableSignal<string> = signal<string>('');
  public readonly enterToSignal: WritableSignal<string> = signal<string>('');
  public readonly enterDoneSignal: WritableSignal<string> = signal<string>('');
  public readonly leaveFromSignal: WritableSignal<string> = signal<string>('');
  public readonly leaveActiveSignal: WritableSignal<string> = signal<string>('');
  public readonly leaveToSignal: WritableSignal<string> = signal<string>('');
  public readonly leaveDoneSignal: WritableSignal<string> = signal<string>('');
  public readonly hideOnOutsideClickSignal: WritableSignal<boolean> = signal<boolean>(false);
}

@Component({
  selector: 'app-sc-parent-host',
  standalone: true,
  imports: [StyleClass],
  template: `
    <div id="parent">
      <button [uiLibStyleClass]="'@parent'" [toggleClass]="'is-open'">Toggle</button>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class ScParentHostComponent {}

@Component({
  selector: 'app-sc-prev-host',
  standalone: true,
  imports: [StyleClass],
  template: `
    <div id="prev">Prev</div>
    <button [uiLibStyleClass]="'@prev'" [toggleClass]="'is-open'">Toggle</button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class ScPrevHostComponent {}

@Component({
  selector: 'app-sc-outside-host',
  standalone: true,
  imports: [StyleClass],
  template: `
    <button [uiLibStyleClass]="'@next'" [toggleClass]="'is-open'" [hideOnOutsideClick]="true">
      Toggle
    </button>
    <div id="target">Content</div>
    <div id="outside">Outside</div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class ScOutsideHostComponent {}

// ---------------------------------------------------------------------------
// Setup helpers
// ---------------------------------------------------------------------------

function setupToggleHost(): {
  fixture: ComponentFixture<ScToggleHostComponent>;
  host: ScToggleHostComponent;
  button: HTMLElement;
  target: HTMLElement;
} {
  TestBed.configureTestingModule({
    imports: [ScToggleHostComponent],
    providers: [provideZonelessChangeDetection()],
  });
  const fixture: ComponentFixture<ScToggleHostComponent> =
    TestBed.createComponent(ScToggleHostComponent);
  fixture.detectChanges();
  const button: HTMLElement = fixture.debugElement.query(By.css('button'))
    .nativeElement as HTMLElement;
  const target: HTMLElement = fixture.debugElement.query(By.css('#target'))
    .nativeElement as HTMLElement;
  return { fixture, host: fixture.componentInstance, button, target };
}

function setupTransitionHost(): {
  fixture: ComponentFixture<ScTransitionHostComponent>;
  host: ScTransitionHostComponent;
  button: HTMLElement;
  target: HTMLElement;
  directive: StyleClass;
} {
  TestBed.configureTestingModule({
    imports: [ScTransitionHostComponent],
    providers: [provideZonelessChangeDetection()],
  });
  const fixture: ComponentFixture<ScTransitionHostComponent> =
    TestBed.createComponent(ScTransitionHostComponent);
  fixture.detectChanges();
  const button: HTMLElement = fixture.debugElement.query(By.css('button'))
    .nativeElement as HTMLElement;
  const target: HTMLElement = fixture.debugElement.query(By.css('#target'))
    .nativeElement as HTMLElement;
  const de: DebugElement = fixture.debugElement.query(By.directive(StyleClass));
  const directive: StyleClass = de.injector.get(StyleClass);
  return { fixture, host: fixture.componentInstance, button, target, directive };
}

// ---------------------------------------------------------------------------
// Tests — toggle mode
// ---------------------------------------------------------------------------

describe('StyleClass (toggle mode)', (): void => {
  afterEach((): void => {
    TestBed.resetTestingModule();
  });

  it('should create', (): void => {
    const { fixture } = setupToggleHost();
    const de: DebugElement = fixture.debugElement.query(By.directive(StyleClass));
    expect(de).not.toBeNull();
  });

  it('should add the host class ui-lib-style-class', (): void => {
    const { button } = setupToggleHost();
    expect(button.classList.contains('ui-lib-style-class')).toBe(true);
  });

  it('should add toggleClass to target on first click', (): void => {
    const { button, target } = setupToggleHost();
    button.click();
    expect(target.classList.contains('is-open')).toBe(true);
  });

  it('should remove toggleClass from target on second click', (): void => {
    const { button, target } = setupToggleHost();
    button.click();
    button.click();
    expect(target.classList.contains('is-open')).toBe(false);
  });

  it('should toggle class multiple times', (): void => {
    const { button, target } = setupToggleHost();
    button.click();
    expect(target.classList.contains('is-open')).toBe(true);
    button.click();
    expect(target.classList.contains('is-open')).toBe(false);
    button.click();
    expect(target.classList.contains('is-open')).toBe(true);
  });

  it('should resolve @prev sibling', (): void => {
    TestBed.configureTestingModule({
      imports: [ScPrevHostComponent],
      providers: [provideZonelessChangeDetection()],
    });
    const fixture: ComponentFixture<ScPrevHostComponent> =
      TestBed.createComponent(ScPrevHostComponent);
    fixture.detectChanges();
    const button: HTMLElement = fixture.debugElement.query(By.css('button'))
      .nativeElement as HTMLElement;
    const prevDiv: HTMLElement = fixture.debugElement.query(By.css('#prev'))
      .nativeElement as HTMLElement;
    button.click();
    expect(prevDiv.classList.contains('is-open')).toBe(true);
  });

  it('should resolve @parent', (): void => {
    TestBed.configureTestingModule({
      imports: [ScParentHostComponent],
      providers: [provideZonelessChangeDetection()],
    });
    const fixture: ComponentFixture<ScParentHostComponent> =
      TestBed.createComponent(ScParentHostComponent);
    fixture.detectChanges();
    const button: HTMLElement = fixture.debugElement.query(By.css('button'))
      .nativeElement as HTMLElement;
    const parent: HTMLElement = fixture.debugElement.query(By.css('#parent'))
      .nativeElement as HTMLElement;
    button.click();
    expect(parent.classList.contains('is-open')).toBe(true);
  });
});

// ---------------------------------------------------------------------------
// Tests — transition mode
// ---------------------------------------------------------------------------

describe('StyleClass (transition mode)', (): void => {
  beforeEach((): void => {
    jest.useFakeTimers();
  });

  afterEach((): void => {
    jest.useRealTimers();
    TestBed.resetTestingModule();
  });

  it('should resolve target for directive', (): void => {
    const { directive, target } = setupTransitionHost();
    const resolved: HTMLElement | null = directive.resolveTarget();
    expect(resolved).toBe(target);
  });

  it('should add enterFromClass synchronously on click', (): void => {
    const { fixture, host, button, target } = setupTransitionHost();
    host.enterFromSignal.set('enter-from');
    host.enterActiveSignal.set('enter-active');
    fixture.detectChanges();

    button.click();

    // enterFromClass applied synchronously before rAF fires
    expect(target.classList.contains('enter-from')).toBe(true);
  });

  it('should swap enterFrom→enterActive after rAF', (): void => {
    const { fixture, host, button, target } = setupTransitionHost();
    host.enterFromSignal.set('enter-from');
    host.enterActiveSignal.set('enter-active');
    fixture.detectChanges();

    button.click();
    // Advance past rAF (16 ms) but not past 500 ms timeout
    jest.advanceTimersByTime(20);

    expect(target.classList.contains('enter-from')).toBe(false);
    expect(target.classList.contains('enter-active')).toBe(true);
  });

  it('should apply enterDoneClass after timeout fallback', (): void => {
    const { fixture, host, button, target } = setupTransitionHost();
    host.enterActiveSignal.set('enter-active');
    host.enterDoneSignal.set('is-visible');
    fixture.detectChanges();

    button.click();
    jest.advanceTimersByTime(600); // rAF + 500 ms timeout

    expect(target.classList.contains('is-visible')).toBe(true);
    expect(target.classList.contains('enter-active')).toBe(false);
  });

  it('should apply enterDoneClass when transitionend fires before timeout', (): void => {
    const { fixture, host, button, target } = setupTransitionHost();
    host.enterActiveSignal.set('enter-active');
    host.enterToSignal.set('enter-to');
    host.enterDoneSignal.set('is-visible');
    fixture.detectChanges();

    button.click();
    jest.advanceTimersByTime(20); // past rAF, not past 500 ms
    target.dispatchEvent(new Event('transitionend'));

    expect(target.classList.contains('is-visible')).toBe(true);
    expect(target.classList.contains('enter-active')).toBe(false);
    expect(target.classList.contains('enter-to')).toBe(false);
  });

  it('should apply enterDoneClass when animationend fires before timeout', (): void => {
    const { fixture, host, button, target } = setupTransitionHost();
    host.enterActiveSignal.set('fade-in');
    host.enterDoneSignal.set('visible');
    fixture.detectChanges();

    button.click();
    jest.advanceTimersByTime(20);
    target.dispatchEvent(new Event('animationend'));

    expect(target.classList.contains('visible')).toBe(true);
    expect(target.classList.contains('fade-in')).toBe(false);
  });

  it('should apply leaveDoneClass after leave (timeout fallback)', (): void => {
    const { fixture, host, button, target } = setupTransitionHost();
    host.enterDoneSignal.set('is-visible');
    host.leaveActiveSignal.set('leave-active');
    host.leaveToSignal.set('leave-to');
    host.leaveDoneSignal.set('hidden');
    fixture.detectChanges();

    // Enter
    button.click();
    jest.advanceTimersByTime(600);

    // Leave
    button.click();
    jest.advanceTimersByTime(600);

    expect(target.classList.contains('hidden')).toBe(true);
    expect(target.classList.contains('leave-active')).toBe(false);
    expect(target.classList.contains('leave-to')).toBe(false);
  });

  it('should add leaveFromClass on leave click and remove after rAF', (): void => {
    const { fixture, host, button, target } = setupTransitionHost();
    host.enterDoneSignal.set('is-visible');
    host.leaveFromSignal.set('leave-from');
    host.leaveActiveSignal.set('leave-active');
    fixture.detectChanges();

    // Complete enter via timeout
    button.click();
    jest.advanceTimersByTime(600);

    // Leave — synchronous leaveFromClass
    button.click();
    expect(target.classList.contains('leave-from')).toBe(true);

    // After rAF, leaveFrom removed, leaveActive added
    jest.advanceTimersByTime(20);
    expect(target.classList.contains('leave-from')).toBe(false);
    expect(target.classList.contains('leave-active')).toBe(true);
  });
});

// ---------------------------------------------------------------------------
// Tests — hideOnOutsideClick
// ---------------------------------------------------------------------------

describe('StyleClass (hideOnOutsideClick)', (): void => {
  afterEach((): void => {
    TestBed.resetTestingModule();
  });

  it('should hide on outside click in toggle mode', (): void => {
    TestBed.configureTestingModule({
      imports: [ScOutsideHostComponent],
      providers: [provideZonelessChangeDetection()],
    });

    const fixture: ComponentFixture<ScOutsideHostComponent> =
      TestBed.createComponent(ScOutsideHostComponent);
    fixture.detectChanges();

    const button: HTMLElement = fixture.debugElement.query(By.css('button'))
      .nativeElement as HTMLElement;
    const target: HTMLElement = fixture.debugElement.query(By.css('#target'))
      .nativeElement as HTMLElement;
    const outside: HTMLElement = fixture.debugElement.query(By.css('#outside'))
      .nativeElement as HTMLElement;

    // Open
    button.click();
    expect(target.classList.contains('is-open')).toBe(true);

    // Click outside — dispatch capture-phase click on document
    const outsideClick: MouseEvent = new MouseEvent('click', { bubbles: true, cancelable: true });
    Object.defineProperty(outsideClick, 'target', { value: outside });
    document.dispatchEvent(outsideClick);

    expect(target.classList.contains('is-open')).toBe(false);
  });
});
