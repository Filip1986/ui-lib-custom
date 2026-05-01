import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import type { WritableSignal } from '@angular/core';
import { Message } from 'ui-lib-custom/message';
import type { MessageSeverity, MessageVariant, MessageSize } from 'ui-lib-custom/message';

/**
 * Demo page for the Message component.
 */
@Component({
  selector: 'app-message-demo',
  standalone: true,
  imports: [Message],
  templateUrl: './message-demo.component.html',
  styleUrl: './message-demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MessageDemoComponent {
  public readonly severities: MessageSeverity[] = [
    'success',
    'info',
    'warn',
    'error',
    'secondary',
    'contrast',
  ];

  public readonly variants: MessageVariant[] = ['material', 'bootstrap', 'minimal'];

  public readonly sizes: MessageSize[] = ['sm', 'md', 'lg'];

  // Playground signals
  public readonly playgroundSeverity: WritableSignal<MessageSeverity> =
    signal<MessageSeverity>('info');
  public readonly playgroundVariant: WritableSignal<MessageVariant> =
    signal<MessageVariant>('bootstrap');
  public readonly playgroundSize: WritableSignal<MessageSize> = signal<MessageSize>('md');
  public readonly playgroundText: WritableSignal<string> = signal<string>(
    'This is a sample message. Adjust the controls above to explore.'
  );
  public readonly playgroundClosable: WritableSignal<boolean> = signal<boolean>(false);
  public readonly playgroundClosed: WritableSignal<boolean> = signal<boolean>(false);

  public onPlaygroundClose(): void {
    this.playgroundClosed.set(true);
  }

  public resetPlayground(): void {
    this.playgroundClosed.set(false);
  }

  // Closable demo signals
  public readonly closedSeverities: WritableSignal<Set<MessageSeverity>> = signal<
    Set<MessageSeverity>
  >(new Set());

  public dismissSeverity(severity: MessageSeverity): void {
    this.closedSeverities.update(
      (current: Set<MessageSeverity>): Set<MessageSeverity> => new Set([...current, severity])
    );
  }

  public resetClosable(): void {
    this.closedSeverities.set(new Set());
  }

  public isSeverityClosed(severity: MessageSeverity): boolean {
    return this.closedSeverities().has(severity);
  }
}
