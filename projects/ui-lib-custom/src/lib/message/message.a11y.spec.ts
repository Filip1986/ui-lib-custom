import {
  ChangeDetectionStrategy,
  Component,
  provideZonelessChangeDetection,
  signal,
  type WritableSignal,
} from '@angular/core';
import { TestBed, type ComponentFixture } from '@angular/core/testing';
import { checkA11y, SKIP_COLOR_CONTRAST_RULES } from '../../test/a11y-utils';
import { provideUiLibIcons } from '../icon/icon.providers';
import { Message } from './message';
import type { MessageSeverity, MessageVariant } from './message.types';

// ─── Host component ────────────────────────────────────────────────────────────

@Component({
  standalone: true,
  imports: [Message],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div role="region" aria-label="Message examples">
      <ui-lib-message
        [severity]="severity()"
        [variant]="variant()"
        [closable]="closable()"
        [messageId]="messageId()"
        text="Sample message text"
      />
    </div>
  `,
})
class MessageA11yHostComponent {
  public readonly severity: WritableSignal<MessageSeverity> = signal<MessageSeverity>('info');
  public readonly variant: WritableSignal<MessageVariant | null> = signal<MessageVariant | null>(
    null
  );
  public readonly closable: WritableSignal<boolean> = signal<boolean>(false);
  public readonly messageId: WritableSignal<string | null> = signal<string | null>(null);
}

// ─── Setup helper ─────────────────────────────────────────────────────────────

async function setup(
  overrides: Partial<{
    severity: MessageSeverity;
    variant: MessageVariant | null;
    closable: boolean;
    messageId: string | null;
  }> = {}
): Promise<ComponentFixture<MessageA11yHostComponent>> {
  await TestBed.configureTestingModule({
    imports: [MessageA11yHostComponent],
    providers: [provideZonelessChangeDetection(), ...provideUiLibIcons()],
  }).compileComponents();

  const fixture: ComponentFixture<MessageA11yHostComponent> =
    TestBed.createComponent(MessageA11yHostComponent);
  if (overrides.severity !== undefined) fixture.componentInstance.severity.set(overrides.severity);
  if (overrides.variant !== undefined) fixture.componentInstance.variant.set(overrides.variant);
  if (overrides.closable !== undefined) fixture.componentInstance.closable.set(overrides.closable);
  if (overrides.messageId !== undefined)
    fixture.componentInstance.messageId.set(overrides.messageId);

  document.body.appendChild(fixture.nativeElement);
  fixture.detectChanges();
  await fixture.whenStable();
  return fixture;
}

function getMessageElement(fixture: ComponentFixture<unknown>): HTMLElement {
  return (fixture.nativeElement as HTMLElement).querySelector('ui-lib-message') as HTMLElement;
}

// ─── Tests ────────────────────────────────────────────────────────────────────

describe('Message Accessibility', (): void => {
  afterEach((): void => {
    document.body.innerHTML = '';
  });

  // ─── Live region roles ───────────────────────────────────────────────────────

  describe('live region roles', (): void => {
    it('uses role="alert" for error severity', async (): Promise<void> => {
      const fixture: ComponentFixture<MessageA11yHostComponent> = await setup({
        severity: 'error',
      });
      expect(getMessageElement(fixture).getAttribute('role')).toBe('alert');
    });

    it('uses role="alert" for warn severity', async (): Promise<void> => {
      const fixture: ComponentFixture<MessageA11yHostComponent> = await setup({ severity: 'warn' });
      expect(getMessageElement(fixture).getAttribute('role')).toBe('alert');
    });

    it('uses role="status" for success severity', async (): Promise<void> => {
      const fixture: ComponentFixture<MessageA11yHostComponent> = await setup({
        severity: 'success',
      });
      expect(getMessageElement(fixture).getAttribute('role')).toBe('status');
    });

    it('uses role="status" for info severity', async (): Promise<void> => {
      const fixture: ComponentFixture<MessageA11yHostComponent> = await setup({ severity: 'info' });
      expect(getMessageElement(fixture).getAttribute('role')).toBe('status');
    });

    it('uses role="status" for secondary severity', async (): Promise<void> => {
      const fixture: ComponentFixture<MessageA11yHostComponent> = await setup({
        severity: 'secondary',
      });
      expect(getMessageElement(fixture).getAttribute('role')).toBe('status');
    });

    it('uses role="status" for contrast severity', async (): Promise<void> => {
      const fixture: ComponentFixture<MessageA11yHostComponent> = await setup({
        severity: 'contrast',
      });
      expect(getMessageElement(fixture).getAttribute('role')).toBe('status');
    });
  });

  // ─── aria-live ───────────────────────────────────────────────────────────────

  describe('aria-live', (): void => {
    it('sets aria-live="assertive" for error severity', async (): Promise<void> => {
      const fixture: ComponentFixture<MessageA11yHostComponent> = await setup({
        severity: 'error',
      });
      expect(getMessageElement(fixture).getAttribute('aria-live')).toBe('assertive');
    });

    it('sets aria-live="polite" for success severity', async (): Promise<void> => {
      const fixture: ComponentFixture<MessageA11yHostComponent> = await setup({
        severity: 'success',
      });
      expect(getMessageElement(fixture).getAttribute('aria-live')).toBe('polite');
    });
  });

  // ─── aria-atomic ─────────────────────────────────────────────────────────────

  it('sets aria-atomic="true"', async (): Promise<void> => {
    const fixture: ComponentFixture<MessageA11yHostComponent> = await setup();
    expect(getMessageElement(fixture).getAttribute('aria-atomic')).toBe('true');
  });

  // ─── Stable ID for aria-describedby ──────────────────────────────────────────

  describe('stable id for aria-describedby', (): void => {
    it('has an auto-generated id matching ui-lib-message-{n}', async (): Promise<void> => {
      const fixture: ComponentFixture<MessageA11yHostComponent> = await setup();
      expect(getMessageElement(fixture).id).toMatch(/^ui-lib-message-\d+$/);
    });

    it('uses the consumer-supplied messageId as the host id', async (): Promise<void> => {
      const fixture: ComponentFixture<MessageA11yHostComponent> = await setup({
        messageId: 'email-error',
      });
      expect(getMessageElement(fixture).id).toBe('email-error');
    });
  });

  // ─── Icon accessibility ──────────────────────────────────────────────────────

  it('severity icon is decorative (aria-hidden="true")', async (): Promise<void> => {
    const fixture: ComponentFixture<MessageA11yHostComponent> = await setup();
    const iconEl: HTMLElement | null = (fixture.nativeElement as HTMLElement).querySelector(
      '.ui-lib-message__icon'
    );
    expect(iconEl?.getAttribute('aria-hidden')).toBe('true');
  });

  it('close icon is decorative when closable', async (): Promise<void> => {
    const fixture: ComponentFixture<MessageA11yHostComponent> = await setup({ closable: true });
    const closeIconEl: HTMLElement | null = (fixture.nativeElement as HTMLElement).querySelector(
      '.ui-lib-message__close ui-lib-icon'
    );
    expect(closeIconEl?.getAttribute('aria-hidden')).toBe('true');
  });

  // ─── axe-core automated checks ───────────────────────────────────────────────

  describe('axe-core automated checks', (): void => {
    it('passes axe for success severity', async (): Promise<void> => {
      const fixture: ComponentFixture<MessageA11yHostComponent> = await setup({
        severity: 'success',
      });
      await checkA11y(fixture, { rules: SKIP_COLOR_CONTRAST_RULES });
    });

    it('passes axe for info severity', async (): Promise<void> => {
      const fixture: ComponentFixture<MessageA11yHostComponent> = await setup({ severity: 'info' });
      await checkA11y(fixture, { rules: SKIP_COLOR_CONTRAST_RULES });
    });

    it('passes axe for warn severity', async (): Promise<void> => {
      const fixture: ComponentFixture<MessageA11yHostComponent> = await setup({ severity: 'warn' });
      await checkA11y(fixture, { rules: SKIP_COLOR_CONTRAST_RULES });
    });

    it('passes axe for error severity', async (): Promise<void> => {
      const fixture: ComponentFixture<MessageA11yHostComponent> = await setup({
        severity: 'error',
      });
      await checkA11y(fixture, { rules: SKIP_COLOR_CONTRAST_RULES });
    });

    it('passes axe with closable button', async (): Promise<void> => {
      const fixture: ComponentFixture<MessageA11yHostComponent> = await setup({
        severity: 'info',
        closable: true,
      });
      await checkA11y(fixture, { rules: SKIP_COLOR_CONTRAST_RULES });
    });
  });
});
