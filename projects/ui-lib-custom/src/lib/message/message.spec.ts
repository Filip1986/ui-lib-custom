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
} from '@ng-icons/bootstrap-icons';
import { provideIcons } from '@ng-icons/core';
import { Message } from './message';
import type { MessageSeverity, MessageVariant, MessageSize } from './message';

// Typed query helpers

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

// Test host

const TEST_TEMPLATE: string =
  '<ui-lib-message' +
  ' [severity]="severity()"' +
  ' [variant]="variant()"' +
  ' [size]="size()"' +
  ' [text]="text()"' +
  ' [icon]="icon()"' +
  ' [closable]="closable()"' +
  ' [styleClass]="styleClass()"' +
  ' (close)="closed = true"' +
  ' />';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [Message],
  template: TEST_TEMPLATE,
})
class TestHostComponent {
  public readonly severity: WritableSignal<MessageSeverity> = signal<MessageSeverity>('info');
  public readonly variant: WritableSignal<MessageVariant | null> = signal<MessageVariant | null>(
    null
  );
  public readonly size: WritableSignal<MessageSize> = signal<MessageSize>('md');
  public readonly text: WritableSignal<string | null> = signal<string | null>(null);
  public readonly icon: WritableSignal<string | null> = signal<string | null>(null);
  public readonly closable: WritableSignal<boolean> = signal<boolean>(false);
  public readonly styleClass: WritableSignal<string | null> = signal<string | null>(null);
  public closed: boolean = false;
}

// Bootstrap helper

interface TestSetup {
  fixture: ComponentFixture<TestHostComponent>;
  host: TestHostComponent;
  messageElement: HTMLElement;
}

interface BootstrapOptions {
  severity?: MessageSeverity;
  variant?: MessageVariant | null;
  size?: MessageSize;
  text?: string | null;
  icon?: string | null;
  closable?: boolean;
  styleClass?: string | null;
}

function bootstrap(initial: BootstrapOptions = {}): TestSetup {
  const fixture: ComponentFixture<TestHostComponent> = TestBed.createComponent(TestHostComponent);
  const host: TestHostComponent = fixture.componentInstance;
  if (initial.severity !== undefined) host.severity.set(initial.severity);
  if (initial.variant !== undefined) host.variant.set(initial.variant);
  if (initial.size !== undefined) host.size.set(initial.size);
  if (initial.text !== undefined) host.text.set(initial.text);
  if (initial.icon !== undefined) host.icon.set(initial.icon);
  if (initial.closable !== undefined) host.closable.set(initial.closable);
  if (initial.styleClass !== undefined) host.styleClass.set(initial.styleClass);
  fixture.detectChanges();
  const messageElement: HTMLElement = requireElement<HTMLElement>(fixture, 'ui-lib-message');
  return { fixture, host, messageElement };
}

describe('Message', (): void => {
  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent],
      providers: [
        provideZonelessChangeDetection(),
        provideIcons({
          bootstrapInfoCircle,
          bootstrapCheckCircle,
          bootstrapExclamationOctagon,
          bootstrapExclamationTriangle,
        }),
      ],
    }).compileComponents();
  });

  it('should create', (): void => {
    const { messageElement } = bootstrap();
    expect(messageElement).toBeTruthy();
  });

  it('has role="status" on the host element', (): void => {
    const { messageElement } = bootstrap();
    expect(messageElement.getAttribute('role')).toBe('status');
  });

  it('has aria-live="polite" on the host element', (): void => {
    const { messageElement } = bootstrap();
    expect(messageElement.getAttribute('aria-live')).toBe('polite');
  });

  it('always carries the base ui-lib-message class', (): void => {
    const { messageElement } = bootstrap();
    expect(messageElement.classList).toContain('ui-lib-message');
  });

  const severities: MessageSeverity[] = [
    'success',
    'info',
    'warn',
    'error',
    'secondary',
    'contrast',
  ];
  for (const severity of severities) {
    it('applies severity class for ' + severity, (): void => {
      const { messageElement } = bootstrap({ severity });
      expect(messageElement.classList).toContain('ui-lib-message--' + severity);
    });
  }

  const variants: MessageVariant[] = ['material', 'bootstrap', 'minimal'];
  for (const variant of variants) {
    it('applies variant class for ' + variant, (): void => {
      const { messageElement } = bootstrap({ variant });
      expect(messageElement.classList).toContain('ui-lib-message--' + variant);
    });
  }

  const sizes: MessageSize[] = ['sm', 'md', 'lg'];
  for (const size of sizes) {
    it('applies size class for ' + size, (): void => {
      const { messageElement } = bootstrap({ size });
      expect(messageElement.classList).toContain('ui-lib-message--' + size);
    });
  }

  it('renders a ui-lib-icon element', (): void => {
    const { fixture } = bootstrap();
    const icon: HTMLElement | null = queryElement<HTMLElement>(
      fixture,
      'ui-lib-icon.ui-lib-message__icon'
    );
    expect(icon).toBeTruthy();
  });

  it('renders text from the text input', (): void => {
    const { messageElement } = bootstrap({ text: 'Hello world' });
    expect(messageElement.textContent).toContain('Hello world');
  });

  it('renders nothing extra when text is null', (): void => {
    const { messageElement } = bootstrap({ text: null });
    const content: HTMLElement = messageElement.querySelector(
      '.ui-lib-message__content'
    ) as HTMLElement;
    expect(content.textContent).toBe('');
  });

  it('does not render a close button when closable is false', (): void => {
    const { fixture } = bootstrap({ closable: false });
    const closeButton: HTMLElement | null = queryElement<HTMLElement>(
      fixture,
      '.ui-lib-message__close'
    );
    expect(closeButton).toBeNull();
  });

  it('renders a close button when closable is true', (): void => {
    const { fixture } = bootstrap({ closable: true });
    const closeButton: HTMLElement | null = queryElement<HTMLElement>(
      fixture,
      '.ui-lib-message__close'
    );
    expect(closeButton).toBeTruthy();
  });

  it('close button has accessible label', (): void => {
    const { fixture } = bootstrap({ closable: true });
    const closeButton: HTMLElement = requireElement<HTMLElement>(fixture, '.ui-lib-message__close');
    expect(closeButton.getAttribute('aria-label')).toBe('Close message');
  });

  it('emits close output when close button is clicked', (): void => {
    const { fixture, host } = bootstrap({ closable: true });
    const closeButton: HTMLElement = requireElement<HTMLElement>(fixture, '.ui-lib-message__close');
    closeButton.click();
    fixture.detectChanges();
    expect(host.closed).toBe(true);
  });

  it('updates severity class when severity signal changes', (): void => {
    const { fixture, host, messageElement } = bootstrap({ severity: 'info' });
    expect(messageElement.classList).toContain('ui-lib-message--info');
    host.severity.set('error');
    fixture.detectChanges();
    expect(messageElement.classList).toContain('ui-lib-message--error');
    expect(messageElement.classList).not.toContain('ui-lib-message--info');
  });

  it('shows close button when closable signal changes to true', (): void => {
    const { fixture, host } = bootstrap({ closable: false });
    expect(queryElement<HTMLElement>(fixture, '.ui-lib-message__close')).toBeNull();
    host.closable.set(true);
    fixture.detectChanges();
    expect(queryElement<HTMLElement>(fixture, '.ui-lib-message__close')).toBeTruthy();
  });

  it('appends a custom styleClass to the host element', (): void => {
    const { messageElement } = bootstrap({ styleClass: 'my-custom-class' });
    expect(messageElement.classList).toContain('my-custom-class');
  });
});
