import { ChangeDetectionStrategy, Component, signal, viewChild } from '@angular/core';
import type { Signal, WritableSignal } from '@angular/core';
import { CodeSnippet } from 'ui-lib-custom/code-snippet';
import { Message } from 'ui-lib-custom/message';
import type { MessageSeverity, MessageVariant, MessageSize } from 'ui-lib-custom/message';
import { Button } from 'ui-lib-custom/button';
import { DocPageLayoutComponent } from '../../shared/doc-page/doc-page-layout.component';
import { DocPageHeaderComponent } from '@demo/shared/doc-page/doc-page-header.component';
import { DocTocComponent } from '../../shared/doc-page/doc-toc.component';
import type { DocSection } from '../../shared/doc-page/doc-section.model';

/**
 * Demo page for the Message component.
 */
@Component({
  selector: 'app-message-demo',
  standalone: true,
  imports: [
    CodeSnippet,
    Message,
    Button,
    DocPageLayoutComponent,
    DocPageHeaderComponent,
    DocTocComponent,
  ],
  templateUrl: './message-demo.component.html',
  styleUrl: './message-demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MessageDemoComponent {
  public readonly importCode: string = "import { Message } from 'ui-lib-custom/message'";
  public readonly layout: Signal<DocPageLayoutComponent | undefined> =
    viewChild(DocPageLayoutComponent);

  public readonly sections: DocSection[] = [
    { id: 'overview', label: 'Overview' },
    { id: 'playground', label: 'Playground' },
    { id: 'severities', label: 'Severities' },
    { id: 'variants', label: 'Variants' },
    { id: 'sizes', label: 'Sizes' },
    { id: 'closable', label: 'Closable' },
    { id: 'content-projection', label: 'Content Projection' },
    { id: 'api', label: 'API Reference' },
  ];

  public scrollTo(id: string): void {
    this.layout()?.scrollToSection(id);
  }

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
