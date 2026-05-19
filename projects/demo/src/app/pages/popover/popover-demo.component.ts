import { ChangeDetectionStrategy, Component, signal, viewChild } from '@angular/core';
import type { Signal, WritableSignal } from '@angular/core';
import { Popover } from 'ui-lib-custom/popover';
import type { PopoverVariant } from 'ui-lib-custom/popover';
import { Button } from 'ui-lib-custom/button';
import { CodeSnippet } from 'ui-lib-custom/code-snippet';
import { DocPageHeaderComponent } from '../../shared/doc-page/doc-page-header.component';
import { DocPageLayoutComponent } from '../../shared/doc-page/doc-page-layout.component';
import { DocTocComponent } from '../../shared/doc-page/doc-toc.component';
import type { DocSection } from '../../shared/doc-page/doc-section.model';
import { DocQualityBadgeComponent } from '@demo/shared/doc-page/doc-quality-badge.component';
import type { ComponentQualityAudit } from '@demo/shared/doc-page/doc-quality-badge.component';
import { DocKeyboardNavComponent } from '@demo/shared/doc-page/doc-keyboard-nav.component';
import type { KeyboardNavRow } from '@demo/shared/doc-page/doc-keyboard-nav.component';
import { DocApiReferenceComponent } from '@demo/shared/doc-page/doc-api-reference.component';
import type { ApiPropRow } from '@demo/shared/doc-page/doc-api-reference.component';

/**
 * Demo page for the Popover component.
 */
@Component({
  selector: 'app-popover-demo',
  standalone: true,
  imports: [
    CodeSnippet,
    Popover,
    Button,
    DocPageHeaderComponent,
    DocPageLayoutComponent,
    DocTocComponent,
    DocQualityBadgeComponent,
    DocKeyboardNavComponent,
    DocApiReferenceComponent,
  ],
  templateUrl: './popover-demo.component.html',
  styleUrl: './popover-demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PopoverDemoComponent {
  public readonly importCode: string = "import { Popover } from 'ui-lib-custom/popover'";

  public readonly qualityAudit: ComponentQualityAudit = {
    date: '2026-05-18',
    tier: 1,
    scores: {
      api: 9,
      a11y: 9,
      perf: 9,
      comp: 9,
      theme: 9,
      dx: 9,
      docs: 9,
      polish: 9,
      angular: 9,
      feel: 9,
    },
    competitiveParity: 'pending',
  };
  public readonly snippetBasic: string = `<button #trigger (click)="op.toggle(trigger)">Toggle</button>\n\n<ui-lib-popover #op>\n  <p>Popover body content.</p>\n</ui-lib-popover>`;
  public readonly snippetHeaderClose: string = `<ui-lib-popover #op header="User Details" [showCloseButton]="true">\n  <!-- content -->\n</ui-lib-popover>`;
  public readonly snippetDeclarative: string = `<ui-lib-popover [(visible)]="isOpen">...</ui-lib-popover>`;
  public readonly layout: Signal<DocPageLayoutComponent | undefined> =
    viewChild(DocPageLayoutComponent);

  public readonly sections: DocSection[] = [
    { id: 'overview', label: 'Overview' },
    { id: 'basic', label: 'Basic' },
    { id: 'header-close-button', label: 'Header & Close Button' },
    { id: 'rich-content', label: 'Rich Content' },
    { id: 'variants', label: 'Variants' },
    { id: 'non-dismissable', label: 'Non-dismissable' },
    { id: 'events', label: 'Events' },
    { id: 'declarative', label: 'Declarative' },
    { id: 'api', label: 'API' },
    { id: 'keyboard-navigation', label: 'Keyboard Navigation' },
  ];

  public readonly variants: PopoverVariant[] = ['material', 'bootstrap', 'minimal'];

  public readonly lastEvent: WritableSignal<string> = signal<string>('—');
  public readonly declarativeVisible: WritableSignal<boolean> = signal<boolean>(false);
  public readonly selectedVariant: WritableSignal<PopoverVariant> =
    signal<PopoverVariant>('material');

  public scrollTo(id: string): void {
    this.layout()?.scrollToSection(id);
  }

  public readonly apiRows: ApiPropRow[] = [
    {
      name: 'dismissable',
      type: 'boolean',
      default: 'true',
      description: 'Closes the popover when clicking outside.',
    },
    {
      name: 'showCloseIcon',
      type: 'boolean',
      default: 'false',
      description: 'Shows a close icon button inside the popover.',
    },
    { name: 'baseZIndex', type: 'number', default: '0', description: 'Base CSS z-index.' },
    {
      name: 'autoZIndex',
      type: 'boolean',
      default: 'true',
      description: 'Automatically manages z-index layering.',
    },
    {
      name: 'appendTo',
      type: "'body' | string | HTMLElement",
      default: "'body'",
      description: 'Portal target element.',
    },
    {
      name: 'focusOnShow',
      type: 'boolean',
      default: 'true',
      description: 'Moves focus to the popover content when shown.',
    },
    {
      name: 'ariaLabel',
      type: 'string | null',
      default: 'null',
      description: 'Accessible label for the popover region.',
    },
    {
      name: 'ariaLabelledBy',
      type: 'string | null',
      default: 'null',
      description: 'Id of an external label element.',
    },
  ];

  public onShown(): void {
    this.lastEvent.set('shown');
  }

  public onHidden(): void {
    this.lastEvent.set('hidden');
  }

  public readonly keyboardRows: KeyboardNavRow[] = [
    {
      key: 'Escape',
      action: 'Closes the popover and returns focus to the trigger element.',
    },
    {
      key: 'Tab / Shift+Tab',
      action: 'Cycles focus through focusable elements inside the popover panel.',
    },
    {
      key: 'Enter / Space',
      target: 'Close button',
      action: 'Closes the popover (when a close button is rendered).',
    },
  ];

  public readonly apiInputRows: ApiPropRow[] = [
    {
      name: 'visible',
      type: 'boolean',
      default: 'false',
      description: 'Two-way visibility binding via [(visible)].',
    },
    {
      name: 'header',
      type: 'string | null',
      default: 'null',
      description: 'Optional header text shown at the top of the panel.',
    },
    {
      name: 'showCloseButton',
      type: 'boolean',
      default: 'false',
      description: 'Renders a close (×) button in the header area.',
    },
    {
      name: 'dismissable',
      type: 'boolean',
      default: 'true',
      description: 'Clicking outside the panel closes the popover.',
    },
    {
      name: 'closeOnEscape',
      type: 'boolean',
      default: 'true',
      description: 'Pressing Escape closes the popover.',
    },
    {
      name: 'variant',
      type: "'material' | 'bootstrap' | 'minimal' | null",
      default: 'null',
      description: 'Design variant; inherits from the global theme when null.',
    },
    {
      name: 'styleClass',
      type: 'string | null',
      default: 'null',
      description: 'Extra CSS classes on the host element.',
    },
  ];

  public readonly apiOutputRows: ApiPropRow[] = [
    { name: 'shown', type: 'void', description: 'Emitted after the popover becomes visible.' },
    { name: 'hidden', type: 'void', description: 'Emitted after the popover is hidden.' },
  ];

  public readonly apiMethodRows: ApiPropRow[] = [
    {
      name: 'show',
      type: '(target: HTMLElement) => void',
      description: 'Show the popover anchored to target.',
    },
    { name: 'hide', type: '() => void', description: 'Hide the popover.' },
    {
      name: 'toggle',
      type: '(target: HTMLElement) => void',
      description: 'Show if hidden, hide if visible.',
    },
  ];
}
