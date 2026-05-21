import { ChangeDetectionStrategy, Component, signal, viewChild } from '@angular/core';
import type { Signal, WritableSignal } from '@angular/core';
import { Popover } from 'ui-lib-custom/popover';
import type { PopoverVariant } from 'ui-lib-custom/popover';
import { Button } from 'ui-lib-custom/button';
import { DocPageHeaderComponent } from '../../shared/doc-page/doc-page-header.component';
import { DocPageLayoutComponent } from '../../shared/doc-page/doc-page-layout.component';
import { DocTocComponent } from '../../shared/doc-page/doc-toc.component';
import type { DocSection } from '../../shared/doc-page/doc-section.model';
import { DocQualityBadgeComponent } from '@demo/shared/doc-page/doc-quality-badge.component';
import type { ComponentQualityAudit } from '@demo/shared/doc-page/doc-quality-badge.component';
import { DocKeyboardNavComponent } from '@demo/shared/doc-page/doc-keyboard-nav.component';
import type { KeyboardNavRow } from '@demo/shared/doc-page/doc-keyboard-nav.component';
import { DocCodeExampleComponent } from '../../shared/doc-page/doc-code-example.component';
import { DocApiReferenceComponent } from '@demo/shared/doc-page/doc-api-reference.component';
import type { ApiPropRow } from '@demo/shared/doc-page/doc-api-reference.component';
import {
  basicHtml,
  basicTs,
  headerCloseHtml,
  headerCloseTs,
  declarativeHtml,
  declarativeTs,
} from './snippets.generated';

import { DocSectionComponent } from '../../shared/doc-page/doc-section.component';
import { DocCssVarsTableComponent } from '../../shared/doc-page/doc-css-vars-table.component';
import type { CssVarRow } from '../../shared/doc-page/doc-css-vars-table.component';
/**
 * Demo page for the Popover component.
 */
@Component({
  selector: 'app-popover-demo',
  standalone: true,
  imports: [
    Popover,
    Button,
    DocPageHeaderComponent,
    DocPageLayoutComponent,
    DocTocComponent,
    DocQualityBadgeComponent,
    DocKeyboardNavComponent,
    DocCodeExampleComponent,
    DocApiReferenceComponent,
    DocSectionComponent,

    DocCssVarsTableComponent,
  ],
  templateUrl: './popover-demo.component.html',
  styleUrl: './popover-demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PopoverDemoComponent {
  public readonly basicHtml: string = basicHtml;
  public readonly basicTs: string = basicTs;
  public readonly headerCloseHtml: string = headerCloseHtml;
  public readonly headerCloseTs: string = headerCloseTs;
  public readonly declarativeHtml: string = declarativeHtml;
  public readonly declarativeTs: string = declarativeTs;

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
    { id: 'css-vars', label: 'CSS Custom Properties' },
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

  public readonly apiInputRows: readonly ApiPropRow[] = [
    {
      name: 'header',
      type: 'string | null',
      default: 'null',
      description: 'Optional header text inside the popover.',
    },
    {
      name: 'showCloseButton',
      type: 'boolean',
      default: 'false',
      description: 'Renders a close button in the header.',
    },
    {
      name: 'dismissable',
      type: 'boolean',
      default: 'true',
      description: 'Closes the popover when clicking outside.',
    },
    {
      name: 'closeOnEscape',
      type: 'boolean',
      default: 'true',
      description: 'Closes the popover when pressing Escape.',
    },
    {
      name: 'variant',
      type: "'material' | 'bootstrap' | 'minimal' | null",
      default: 'null',
      description: 'Design variant.',
    },
  ];
  public readonly apiOutputRows: readonly ApiPropRow[] = [
    {
      name: '(shown)',
      type: 'OutputEmitterRef<void>',
      description: 'Emitted after the popover becomes visible.',
    },
    {
      name: '(hidden)',
      type: 'OutputEmitterRef<void>',
      description: 'Emitted after the popover is fully hidden.',
    },
  ];
  public readonly apiMethodRows: readonly ApiPropRow[] = [
    {
      name: 'toggle(event)',
      type: 'void',
      description: 'Toggles the popover visibility relative to the event target.',
    },
    {
      name: 'show(event)',
      type: 'void',
      description: 'Shows the popover anchored to the event target element.',
    },
    { name: 'hide()', type: 'void', description: 'Hides the popover.' },
  ];
  public readonly cssVarRows: CssVarRow[] = [
    { variable: '--uilib-popover-bg', description: 'Background colour.' },
    { variable: '--uilib-popover-border-radius', description: 'Border radius.' },
    { variable: '--uilib-popover-shadow', description: 'Box shadow.' },
    { variable: '--uilib-popover-border', description: 'Border shorthand.' },
    { variable: '--uilib-popover-z-index', description: 'Z-index.' },
    { variable: '--uilib-popover-min-width', description: 'Minimum width.' },
    { variable: '--uilib-popover-max-width', description: 'Maximum width.' },
    { variable: '--uilib-popover-header-padding', description: 'Header padding.' },
    { variable: '--uilib-popover-header-border-bottom', description: 'Header Border Bottom.' },
    { variable: '--uilib-popover-header-font-size', description: 'Header font size.' },
    { variable: '--uilib-popover-header-font-weight', description: 'Header font weight.' },
    { variable: '--uilib-popover-content-padding', description: 'Content area padding.' },
    { variable: '--uilib-popover-close-btn-size', description: 'Close Btn size.' },
    { variable: '--uilib-popover-close-btn-color', description: 'Close Btn text colour.' },
    {
      variable: '--uilib-popover-close-btn-hover-bg',
      description: 'Close Btn Hover background colour.',
    },
    { variable: '--uilib-popover-enter-duration', description: 'Enter animation duration.' },
    { variable: '--uilib-popover-enter-easing', description: 'Enter animation easing.' },
    { variable: '--uilib-popover-arrow-size', description: 'Arrow size.' },
  ];
}
