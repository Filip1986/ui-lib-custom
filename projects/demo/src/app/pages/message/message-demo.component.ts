import { ChangeDetectionStrategy, Component, signal, viewChild } from '@angular/core';
import type { Signal, WritableSignal } from '@angular/core';
import { Message } from 'ui-lib-custom/message';
import type { MessageSeverity, MessageVariant, MessageSize } from 'ui-lib-custom/message';
import { Button } from 'ui-lib-custom/button';
import { DocPageLayoutComponent } from '../../shared/doc-page/doc-page-layout.component';
import { DocPageHeaderComponent } from '@demo/shared/doc-page/doc-page-header.component';
import { DocTocComponent } from '../../shared/doc-page/doc-toc.component';
import type { DocSection } from '../../shared/doc-page/doc-section.model';
import { DocQualityBadgeComponent } from '@demo/shared/doc-page/doc-quality-badge.component';
import type { ComponentQualityAudit } from '@demo/shared/doc-page/doc-quality-badge.component';
import { DocApiReferenceComponent } from '@demo/shared/doc-page/doc-api-reference.component';
import type { ApiPropRow } from '@demo/shared/doc-page/doc-api-reference.component';

import { DocSectionComponent } from '../../shared/doc-page/doc-section.component';
/**
 * Demo page for the Message component.
 */
@Component({
  selector: 'app-message-demo',
  standalone: true,
  imports: [
    Message,
    Button,
    DocPageLayoutComponent,
    DocPageHeaderComponent,
    DocTocComponent,
    DocQualityBadgeComponent,
    DocApiReferenceComponent,
    DocSectionComponent,
  ],
  templateUrl: './message-demo.component.html',
  styleUrl: './message-demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MessageDemoComponent {
  public readonly qualityAudit: ComponentQualityAudit = {
    date: '2026-05-18',
    tier: 1,
    scores: {
      api: 9,
      a11y: 9,
      perf: 8,
      comp: 8,
      theme: 9,
      dx: 9,
      docs: 9,
      polish: 8,
      angular: 9,
      feel: 8,
    },
    competitiveParity: 'pending',
  };

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

  public readonly apiRows: ApiPropRow[] = [
    {
      name: 'severity',
      type: "'info' | 'success' | 'warn' | 'error' | 'secondary' | 'contrast'",
      default: "'info'",
      description: 'Severity level that controls the icon and colour.',
    },
    {
      name: 'text',
      type: 'string',
      default: "''",
      description: 'Message text. Use content projection for rich markup.',
    },
    {
      name: 'detail',
      type: 'string | null',
      default: 'null',
      description: 'Secondary detail text rendered below the main message.',
    },
    {
      name: 'icon',
      type: 'string | null',
      default: 'null',
      description: 'Custom severity icon override.',
    },
    { name: 'closable', type: 'boolean', default: 'false', description: 'Shows a close button.' },
    {
      name: 'life',
      type: 'number',
      default: '0',
      description: 'Auto-dismiss delay in milliseconds. 0 disables auto-dismiss.',
    },
    {
      name: 'sticky',
      type: 'boolean',
      default: 'false',
      description: 'Keeps the message visible even if life is set.',
    },
    {
      name: 'variant',
      type: "'material' | 'bootstrap' | 'minimal' | null",
      default: 'null',
      description: 'Design variant.',
    },
    { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Message size.' },
  ];

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

  public readonly apiInputRows: readonly ApiPropRow[] = [
    {
      name: 'severity',
      type: "'success' | 'info' | 'warn' | 'error' | 'secondary' | 'contrast'",
      default: "'info'",
      description: 'Controls the colour palette and default icon.',
    },
    {
      name: 'variant',
      type: "'material' | 'bootstrap' | 'minimal' | null",
      default: 'null',
      description: 'Design variant. When null, inherits the ThemeConfigService variant.',
    },
    {
      name: 'size',
      type: "'sm' | 'md' | 'lg'",
      default: "'md'",
      description: 'Size of the message.',
    },
    {
      name: 'text',
      type: 'string | null',
      default: 'null',
      description: 'Optional text content. Can be combined with content projection.',
    },
    {
      name: 'icon',
      type: 'string | null',
      default: 'null',
      description: 'Custom icon name to override the severity-driven icon.',
    },
    {
      name: 'closable',
      type: 'boolean',
      default: 'false',
      description: 'Shows a close button when true.',
    },
    {
      name: 'styleClass',
      type: 'string | null',
      default: 'null',
      description: 'Additional CSS class(es) appended to the host element.',
    },
  ];

  public readonly apiOutputRows: readonly ApiPropRow[] = [
    {
      name: 'close',
      type: 'OutputEmitterRef<void>',
      description: 'Emitted when the close button is clicked.',
    },
  ];
}
