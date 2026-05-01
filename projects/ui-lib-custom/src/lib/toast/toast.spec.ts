import { TestBed } from '@angular/core/testing';
import type { ComponentFixture } from '@angular/core/testing';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import type { WritableSignal } from '@angular/core';
import { provideZonelessChangeDetection } from '@angular/core';
import {
  bootstrapInfoCircle,
  bootstrapCheckCircle,
  bootstrapExclamationOctagon,
  bootstrapExclamationTriangle,
  bootstrapX,
} from '@ng-icons/bootstrap-icons';
import { provideIcons } from '@ng-icons/core';
import { Toast } from './toast';
import { ToastService } from './toast.service';
import type { ToastMessage, ToastPosition, ToastVariant } from './toast.types';

// ─── Typed query helpers ───────────────────────────────────────────────────────

function queryElement<T extends HTMLElement>(
  fixture: ComponentFixture<unknown>,
  selector: string
): T | null {
  return (fixture.nativeElement as HTMLElement).querySelector<T>(selector);
}

function requireElement<T extends HTMLElement>(
  fixture: ComponentFixture<unknown>,
  selector: string
): T {
  const element: T | null = queryElement<T>(fixture, selector);
  if (!element) throw new Error('Element not found: ' + selector);
  return element;
}

function queryAllElements<T extends HTMLElement>(
  fixture: ComponentFixture<unknown>,
  selector: string
): T[] {
  return Array.from((fixture.nativeElement as HTMLElement).querySelectorAll<T>(selector));
}

// ─── Test host component ───────────────────────────────────────────────────────

const TEST_TEMPLATE: string =
  '<ui-lib-toast' +
  ' [position]="position()"' +
  ' [life]="life()"' +
  ' [variant]="variant()"' +
  ' [key]="toastKey()"' +
  ' [styleClass]="styleClass()"' +
  ' />';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [Toast],
  template: TEST_TEMPLATE,
})
class TestHostComponent {
  public readonly position: WritableSignal<ToastPosition> = signal<ToastPosition>('top-right');
  public readonly life: WritableSignal<number> = signal<number>(3000);
  public readonly variant: WritableSignal<ToastVariant | null> = signal<ToastVariant | null>(null);
  public readonly toastKey: WritableSignal<string | null> = signal<string | null>(null);
  public readonly styleClass: WritableSignal<string | null> = signal<string | null>(null);
}

// ─── Setup helper ─────────────────────────────────────────────────────────────

interface TestSetup {
  fixture: ComponentFixture<TestHostComponent>;
  host: TestHostComponent;
  toastService: ToastService;
}

async function setup(
  options: {
    position?: ToastPosition;
    life?: number;
    variant?: ToastVariant | null;
    toastKey?: string | null;
    styleClass?: string | null;
  } = {}
): Promise<TestSetup> {
  await TestBed.configureTestingModule({
    imports: [TestHostComponent],
    providers: [
      provideZonelessChangeDetection(),
      provideIcons({
        bootstrapInfoCircle,
        bootstrapCheckCircle,
        bootstrapExclamationOctagon,
        bootstrapExclamationTriangle,
        bootstrapX,
      }),
    ],
  }).compileComponents();

  const fixture: ComponentFixture<TestHostComponent> = TestBed.createComponent(TestHostComponent);
  const host: TestHostComponent = fixture.componentInstance;
  const toastService: ToastService = TestBed.inject(ToastService);

  if (options.position !== undefined) host.position.set(options.position);
  if (options.life !== undefined) host.life.set(options.life);
  if (options.variant !== undefined) host.variant.set(options.variant);
  if (options.toastKey !== undefined) host.toastKey.set(options.toastKey);
  if (options.styleClass !== undefined) host.styleClass.set(options.styleClass);

  fixture.detectChanges();
  await fixture.whenStable();

  return { fixture, host, toastService };
}

// ─── Tests ────────────────────────────────────────────────────────────────────

describe('Toast', (): void => {
  afterEach((): void => {
    TestBed.inject(ToastService).clear();
  });

  // ─── Rendering ──────────────────────────────────────────────────────────────

  it('should create the component', async (): Promise<void> => {
    const { fixture }: TestSetup = await setup();
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render no items when the queue is empty', async (): Promise<void> => {
    const { fixture }: TestSetup = await setup();
    const items: HTMLElement[] = queryAllElements(fixture, '.ui-lib-toast__item');
    expect(items.length).toBe(0);
  });

  it('should render a toast item when a message is added', async (): Promise<void> => {
    const { fixture, toastService }: TestSetup = await setup();
    toastService.add({ severity: 'success', summary: 'Done' });
    fixture.detectChanges();
    await fixture.whenStable();
    const items: HTMLElement[] = queryAllElements(fixture, '.ui-lib-toast__item');
    expect(items.length).toBe(1);
  });

  it('should render multiple toast items', async (): Promise<void> => {
    const { fixture, toastService }: TestSetup = await setup();
    toastService.add({ severity: 'success', summary: 'First' });
    toastService.add({ severity: 'error', summary: 'Second' });
    toastService.add({ severity: 'info', summary: 'Third' });
    fixture.detectChanges();
    await fixture.whenStable();
    const items: HTMLElement[] = queryAllElements(fixture, '.ui-lib-toast__item');
    expect(items.length).toBe(3);
  });

  it('should display the summary text', async (): Promise<void> => {
    const { fixture, toastService }: TestSetup = await setup();
    toastService.add({ summary: 'Hello world' });
    fixture.detectChanges();
    await fixture.whenStable();
    const summary: HTMLElement = requireElement(fixture, '.ui-lib-toast__summary');
    expect(summary.textContent.trim()).toBe('Hello world');
  });

  it('should display the detail text', async (): Promise<void> => {
    const { fixture, toastService }: TestSetup = await setup();
    toastService.add({ detail: 'More detail here' });
    fixture.detectChanges();
    await fixture.whenStable();
    const detail: HTMLElement = requireElement(fixture, '.ui-lib-toast__detail');
    expect(detail.textContent.trim()).toBe('More detail here');
  });

  it('should not render summary element when summary is absent', async (): Promise<void> => {
    const { fixture, toastService }: TestSetup = await setup();
    toastService.add({ detail: 'Detail only' });
    fixture.detectChanges();
    await fixture.whenStable();
    const summary: HTMLElement | null = queryElement(fixture, '.ui-lib-toast__summary');
    expect(summary).toBeNull();
  });

  // ─── Severity classes ────────────────────────────────────────────────────────

  it('should apply success severity class', async (): Promise<void> => {
    const { fixture, toastService }: TestSetup = await setup();
    toastService.add({ severity: 'success', summary: 'OK' });
    fixture.detectChanges();
    await fixture.whenStable();
    const item: HTMLElement | null = queryElement(fixture, '.ui-lib-toast__item');
    expect(item?.classList.contains('ui-lib-toast__item--success')).toBe(true);
  });

  it('should apply info severity class', async (): Promise<void> => {
    const { fixture, toastService }: TestSetup = await setup();
    toastService.add({ severity: 'info', summary: 'FYI' });
    fixture.detectChanges();
    await fixture.whenStable();
    const item: HTMLElement | null = queryElement(fixture, '.ui-lib-toast__item');
    expect(item?.classList.contains('ui-lib-toast__item--info')).toBe(true);
  });

  it('should apply warn severity class', async (): Promise<void> => {
    const { fixture, toastService }: TestSetup = await setup();
    toastService.add({ severity: 'warn', summary: 'Warning' });
    fixture.detectChanges();
    await fixture.whenStable();
    const item: HTMLElement | null = queryElement(fixture, '.ui-lib-toast__item');
    expect(item?.classList.contains('ui-lib-toast__item--warn')).toBe(true);
  });

  it('should apply error severity class', async (): Promise<void> => {
    const { fixture, toastService }: TestSetup = await setup();
    toastService.add({ severity: 'error', summary: 'Oops' });
    fixture.detectChanges();
    await fixture.whenStable();
    const item: HTMLElement | null = queryElement(fixture, '.ui-lib-toast__item');
    expect(item?.classList.contains('ui-lib-toast__item--error')).toBe(true);
  });

  // ─── Position host classes ────────────────────────────────────────────────────

  it('should apply top-right position class by default', async (): Promise<void> => {
    const { fixture }: TestSetup = await setup();
    const host: HTMLElement = (fixture.nativeElement as HTMLElement).querySelector(
      'ui-lib-toast'
    ) as HTMLElement;
    expect(host.classList.contains('ui-lib-toast--top-right')).toBe(true);
  });

  it('should apply the position class matching the input', async (): Promise<void> => {
    const { fixture, host }: TestSetup = await setup({ position: 'bottom-left' });
    const toastHost: HTMLElement = (fixture.nativeElement as HTMLElement).querySelector(
      'ui-lib-toast'
    ) as HTMLElement;
    expect(toastHost.classList.contains('ui-lib-toast--bottom-left')).toBe(true);

    host.position.set('top-center');
    fixture.detectChanges();
    await fixture.whenStable();
    expect(toastHost.classList.contains('ui-lib-toast--top-center')).toBe(true);
  });

  // ─── Variant host classes ─────────────────────────────────────────────────────

  it('should apply the variant class when variant is set', async (): Promise<void> => {
    const { fixture }: TestSetup = await setup({ variant: 'bootstrap' });
    const toastHost: HTMLElement = (fixture.nativeElement as HTMLElement).querySelector(
      'ui-lib-toast'
    ) as HTMLElement;
    expect(toastHost.classList.contains('ui-lib-toast--bootstrap')).toBe(true);
  });

  it('should apply a custom styleClass to the host', async (): Promise<void> => {
    const { fixture }: TestSetup = await setup({ styleClass: 'my-custom-toast' });
    const toastHost: HTMLElement = (fixture.nativeElement as HTMLElement).querySelector(
      'ui-lib-toast'
    ) as HTMLElement;
    expect(toastHost.classList.contains('my-custom-toast')).toBe(true);
  });

  // ─── Close button ─────────────────────────────────────────────────────────────

  it('should render a close button by default', async (): Promise<void> => {
    const { fixture, toastService }: TestSetup = await setup();
    toastService.add({ summary: 'Test' });
    fixture.detectChanges();
    await fixture.whenStable();
    const closeButton: HTMLElement | null = queryElement(fixture, '.ui-lib-toast__close');
    expect(closeButton).not.toBeNull();
  });

  it('should hide the close button when closable is false', async (): Promise<void> => {
    const { fixture, toastService }: TestSetup = await setup();
    toastService.add({ summary: 'Test', closable: false });
    fixture.detectChanges();
    await fixture.whenStable();
    const closeButton: HTMLElement | null = queryElement(fixture, '.ui-lib-toast__close');
    expect(closeButton).toBeNull();
  });

  it('should dismiss the toast when the close button is clicked', async (): Promise<void> => {
    const { fixture, toastService }: TestSetup = await setup();
    toastService.add({ severity: 'info', summary: 'Dismiss me', sticky: true });
    fixture.detectChanges();
    await fixture.whenStable();

    let items: HTMLElement[] = queryAllElements(fixture, '.ui-lib-toast__item');
    expect(items.length).toBe(1);

    const closeButton: HTMLButtonElement = requireElement<HTMLButtonElement>(
      fixture,
      '.ui-lib-toast__close'
    );
    closeButton.click();
    fixture.detectChanges();
    await fixture.whenStable();

    items = queryAllElements(fixture, '.ui-lib-toast__item');
    expect(items[0]?.classList.contains('ui-lib-toast__item--closing')).toBe(true);
  });

  // ─── Key filtering ────────────────────────────────────────────────────────────

  it('should only show messages matching the key input', async (): Promise<void> => {
    const { fixture, toastService }: TestSetup = await setup({ toastKey: 'main' });
    toastService.add({ key: 'main', summary: 'For main' });
    toastService.add({ key: 'secondary', summary: 'For secondary' });
    toastService.add({ summary: 'No key' });
    fixture.detectChanges();
    await fixture.whenStable();

    const items: HTMLElement[] = queryAllElements(fixture, '.ui-lib-toast__item');
    expect(items.length).toBe(1);
    const summary: HTMLElement = requireElement(fixture, '.ui-lib-toast__summary');
    expect(summary.textContent.trim()).toBe('For main');
  });

  it('should show all messages when key is null', async (): Promise<void> => {
    const { fixture, toastService }: TestSetup = await setup();
    toastService.add({ key: 'a', summary: 'A' });
    toastService.add({ key: 'b', summary: 'B' });
    toastService.add({ summary: 'C' });
    fixture.detectChanges();
    await fixture.whenStable();

    const items: HTMLElement[] = queryAllElements(fixture, '.ui-lib-toast__item');
    expect(items.length).toBe(3);
  });

  // ─── Sticky messages ──────────────────────────────────────────────────────────

  it('should not auto-dismiss sticky messages', async (): Promise<void> => {
    const { fixture, toastService }: TestSetup = await setup({ life: 100 });

    toastService.add({ severity: 'info', summary: 'Sticky', sticky: true });
    fixture.detectChanges();
    await fixture.whenStable();

    // Sticky message must remain visible — only cleared via explicit clear()
    let items: HTMLElement[] = queryAllElements(fixture, '.ui-lib-toast__item');
    expect(items.length).toBe(1);

    toastService.clear();
    fixture.detectChanges();
    await fixture.whenStable();

    items = queryAllElements(fixture, '.ui-lib-toast__item');
    expect(items.length).toBe(0);
  });

  // ─── ToastService ─────────────────────────────────────────────────────────────

  it('should clear all messages via the service', async (): Promise<void> => {
    const { fixture, toastService }: TestSetup = await setup();
    toastService.add({ summary: 'A' });
    toastService.add({ summary: 'B' });
    fixture.detectChanges();
    await fixture.whenStable();

    toastService.clear();
    fixture.detectChanges();
    await fixture.whenStable();

    const items: HTMLElement[] = queryAllElements(fixture, '.ui-lib-toast__item');
    expect(items.length).toBe(0);
  });

  it('should clear only messages matching a key via the service', async (): Promise<void> => {
    const { fixture, toastService }: TestSetup = await setup();
    toastService.add({ key: 'x', summary: 'X' });
    toastService.add({ key: 'y', summary: 'Y' });
    fixture.detectChanges();
    await fixture.whenStable();

    toastService.clear('x');
    fixture.detectChanges();
    await fixture.whenStable();

    const items: HTMLElement[] = queryAllElements(fixture, '.ui-lib-toast__item');
    expect(items.length).toBe(1);
    const summary: HTMLElement = requireElement(fixture, '.ui-lib-toast__summary');
    expect(summary.textContent.trim()).toBe('Y');
  });

  it('should auto-generate an id when none is provided', (): void => {
    const toastService: ToastService = TestBed.inject(ToastService);
    toastService.add({ summary: 'Auto id' });
    const messages: ToastMessage[] = toastService.messages();
    const firstMessage: ToastMessage = messages[0] as ToastMessage;
    expect(firstMessage.id).toBeTruthy();
    expect(typeof firstMessage.id).toBe('string');
    toastService.clear();
  });

  it('should default closable to true when not specified', (): void => {
    const toastService: ToastService = TestBed.inject(ToastService);
    toastService.add({ summary: 'Defaults' });
    const message: ToastMessage = toastService.messages()[0] as ToastMessage;
    expect(message.closable).toBe(true);
    toastService.clear();
  });

  it('should remove a message by id via the service', (): void => {
    const toastService: ToastService = TestBed.inject(ToastService);
    toastService.add({ id: 'known-id', summary: 'Remove me' });
    expect(toastService.messages().length).toBe(1);
    toastService.remove('known-id');
    expect(toastService.messages().length).toBe(0);
  });

  // ─── ARIA ─────────────────────────────────────────────────────────────────────

  it('should have role="region" on the host', async (): Promise<void> => {
    const { fixture }: TestSetup = await setup();
    const toastHost: HTMLElement = (fixture.nativeElement as HTMLElement).querySelector(
      'ui-lib-toast'
    ) as HTMLElement;
    expect(toastHost.getAttribute('role')).toBe('region');
    expect(toastHost.getAttribute('aria-label')).toBe('Notifications');
  });

  it('should set role="alert" on each toast item', async (): Promise<void> => {
    const { fixture, toastService }: TestSetup = await setup();
    toastService.add({ summary: 'Alert role test' });
    fixture.detectChanges();
    await fixture.whenStable();

    const item: HTMLElement | null = queryElement(fixture, '.ui-lib-toast__item');
    expect(item?.getAttribute('role')).toBe('alert');
  });

  it('should set aria-live="assertive" for error severity', async (): Promise<void> => {
    const { fixture, toastService }: TestSetup = await setup();
    toastService.add({ severity: 'error', summary: 'Critical' });
    fixture.detectChanges();
    await fixture.whenStable();

    const item: HTMLElement | null = queryElement(fixture, '.ui-lib-toast__item');
    expect(item?.getAttribute('aria-live')).toBe('assertive');
  });

  it('should set aria-live="polite" for non-error severity', async (): Promise<void> => {
    const { fixture, toastService }: TestSetup = await setup();
    toastService.add({ severity: 'success', summary: 'Polite' });
    fixture.detectChanges();
    await fixture.whenStable();

    const item: HTMLElement | null = queryElement(fixture, '.ui-lib-toast__item');
    expect(item?.getAttribute('aria-live')).toBe('polite');
  });

  it('should have an accessible label on the close button', async (): Promise<void> => {
    const { fixture, toastService }: TestSetup = await setup();
    toastService.add({ summary: 'Aria test' });
    fixture.detectChanges();
    await fixture.whenStable();

    const closeButton: HTMLElement | null = queryElement(fixture, '.ui-lib-toast__close');
    expect(closeButton?.getAttribute('aria-label')).toBe('Dismiss notification');
  });
});
